---
title: "REST vs gRPC Microservice Communication"
difficulty: intermediate
goals: 
  - "REST API design"
  - "gRPC proto definitions"
  - "Performance comparison"
  - "Service mesh integration"
  - "API versioning"
estimatedMinutes: 40
starter:
  "stackblitz": "https://stackblitz.com/edit/rest-grpc-comparison?file=README.md",
  "codesandbox": "https://codesandbox.io/s/microservices-communication",
  "dbfiddle": ""
}
---

# REST vs gRPC Microservice Communication

## Task Description

Design and implement a microservice architecture where different services communicate via REST API and gRPC. Compare performance, development complexity, and operational aspects.

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Client    │    │   Mobile App    │    │   Admin Panel   │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          │ HTTP/REST            │ HTTP/REST            │ HTTP/REST
          ▼                      ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API Gateway                                  │
│               (Kong / Envoy Proxy)                             │
└─────────┬───────────────────┬───────────────────┬───────────────┘
          │ HTTP/REST         │ gRPC              │ HTTP/REST
          ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  User Service   │ │  Order Service  │ │ Payment Service │
│   (REST API)    │ │    (gRPC)      │ │   (REST API)    │
└─────────┬───────┘ └─────────┬───────┘ └─────────┬───────┘
          │                   │                   │
          │ gRPC              │ gRPC              │ HTTP/REST
          ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ Notification    │ │  Inventory      │ │    Audit        │
│   Service       │ │   Service       │ │   Service       │
│    (gRPC)       │ │    (gRPC)       │ │  (REST API)     │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

## Task 1: REST API Microservice

### User Service Implementation

```java
// UserService - REST API
@RestController
@RequestMapping("/api/v1/users")
@Slf4j
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserEventPublisher eventPublisher;

    @GetMapping("/{id}")
    @Operation(summary = "Get user by ID", description = "Retrieve user information by user ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User found"),
        @ApiResponse(responseCode = "404", description = "User not found"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<UserResponse> getUser(
            @PathVariable @Valid @Min(1) Long id,
            HttpServletRequest request) {

        log.info("Getting user with ID: {} from IP: {}", id, request.getRemoteAddr());

        User user = userService.findById(id);
        UserResponse response = UserMapper.toResponse(user);

        // Add HATEOAS links
        response.add(linkTo(methodOn(UserController.class).getUser(id, request)).withSelfRel());
        response.add(linkTo(methodOn(UserController.class).getUserOrders(id)).withRel("orders"));

        return ResponseEntity.ok()
                .cacheControl(CacheControl.maxAge(Duration.ofMinutes(5)))
                .eTag(String.valueOf(user.getVersion()))
                .body(response);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<UserResponse> createUser(
            @Valid @RequestBody CreateUserRequest request,
            HttpServletRequest httpRequest) {

        log.info("Creating user with email: {} from IP: {}",
                request.getEmail(), httpRequest.getRemoteAddr());

        User user = userService.createUser(request);
        UserResponse response = UserMapper.toResponse(user);

        // Publish domain event
        eventPublisher.publishUserCreated(user);

        URI location = linkTo(methodOn(UserController.class)
                .getUser(user.getId(), httpRequest)).toUri();

        return ResponseEntity.created(location)
                .body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest request,
            @RequestHeader("If-Match") String ifMatch) {

        // Optimistic locking with ETag
        User existingUser = userService.findById(id);
        if (!String.valueOf(existingUser.getVersion()).equals(ifMatch)) {
            throw new OptimisticLockException("User has been modified by another request");
        }

        User updatedUser = userService.updateUser(id, request);
        UserResponse response = UserMapper.toResponse(updatedUser);

        eventPublisher.publishUserUpdated(updatedUser);

        return ResponseEntity.ok()
                .eTag(String.valueOf(updatedUser.getVersion()))
                .body(response);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        eventPublisher.publishUserDeleted(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/orders")
    public ResponseEntity<Page<OrderSummary>> getUserOrders(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {

        Pageable pageable = PageRequest.of(page, size,
                Sort.Direction.fromString(sortDir), sortBy);

        Page<OrderSummary> orders = userService.getUserOrders(id, pageable);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<UserResponse>> searchUsers(
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) UserStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        UserSearchCriteria criteria = UserSearchCriteria.builder()
                .email(email)
                .name(name)
                .status(status)
                .build();

        Pageable pageable = PageRequest.of(page, size);
        Page<User> users = userService.searchUsers(criteria, pageable);
        Page<UserResponse> response = users.map(UserMapper::toResponse);

        return ResponseEntity.ok(response);
    }
}

// REST Client for external communication
@Component
@Slf4j
@RequiredArgsConstructor
public class PaymentServiceRestClient implements PaymentServiceClient {

    private final RestTemplate restTemplate;

    @Value("${services.payment.base-url}")
    private String paymentServiceUrl;

    @Override
    @Retryable(value = {RestClientException.class}, maxAttempts = 3)
    public PaymentResponse processPayment(PaymentRequest request) {
        String url = paymentServiceUrl + "/api/v1/payments";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-Request-ID", UUID.randomUUID().toString());
        headers.set("X-Service-Name", "user-service");

        HttpEntity<PaymentRequest> entity = new HttpEntity<>(request, headers);

        try {
            ResponseEntity<PaymentResponse> response = restTemplate.exchange(
                    url, HttpMethod.POST, entity, PaymentResponse.class);

            log.info("Payment processed successfully: {}", response.getBody());
            return response.getBody();

        } catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.BAD_REQUEST) {
                throw new PaymentValidationException("Invalid payment request", e);
            }
            throw new PaymentServiceException("Payment service error", e);
        } catch (HttpServerErrorException e) {
            throw new PaymentServiceException("Payment service unavailable", e);
        }
    }

    @Override
    public PaymentStatus getPaymentStatus(String paymentId) {
        String url = paymentServiceUrl + "/api/v1/payments/{paymentId}/status";

        try {
            ResponseEntity<PaymentStatusResponse> response = restTemplate.getForEntity(
                    url, PaymentStatusResponse.class, paymentId);
            return response.getBody().getStatus();
        } catch (HttpClientErrorException.NotFound e) {
            return PaymentStatus.NOT_FOUND;
        }
    }
}
```

### REST API Configuration

```java
@Configuration
@EnableWebMvc
@EnableAsync
@RequiredArgsConstructor
public class RestApiConfiguration implements WebMvcConfigurer {

    @Bean
    public RestTemplate restTemplate() {
        RestTemplate template = new RestTemplate();

        // Configure timeout
        HttpComponentsClientHttpRequestFactory factory =
                new HttpComponentsClientHttpRequestFactory();
        factory.setConnectTimeout(5000);
        factory.setReadTimeout(10000);
        template.setRequestFactory(factory);

        // Add interceptors
        template.getInterceptors().add(new LoggingInterceptor());
        template.getInterceptors().add(new AuthenticationInterceptor());

        // Error handler
        template.setErrorHandler(new RestTemplateErrorHandler());

        return template;
    }

    @Bean
    public OpenAPI userServiceAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("User Service API")
                        .version("v1")
                        .description("RESTful API for user management")
                        .contact(new Contact()
                                .name("Development Team")
                                .email("dev@company.com")))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
                .components(new Components()
                        .addSecuritySchemes("bearerAuth",
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")));
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000", "https://app.company.com")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }

    @Override
    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
        configurer
                .favorParameter(false)
                .ignoreAcceptHeader(false)
                .defaultContentType(MediaType.APPLICATION_JSON)
                .mediaType("json", MediaType.APPLICATION_JSON)
                .mediaType("xml", MediaType.APPLICATION_XML);
    }
}
```

## Task 2: gRPC Microservice

### Protocol Buffer Definition

```protobuf
// order_service.proto
syntax = "proto3";

package orderservice.v1;

import "google/protobuf/timestamp.proto";
import "google/protobuf/empty.proto";
import "validate/validate.proto";

option java_package = "com.company.orderservice.grpc";
option java_outer_classname = "OrderServiceProto";

service OrderService {
  rpc CreateOrder(CreateOrderRequest) returns (CreateOrderResponse);
  rpc GetOrder(GetOrderRequest) returns (GetOrderResponse);
  rpc UpdateOrderStatus(UpdateOrderStatusRequest) returns (UpdateOrderStatusResponse);
  rpc ListOrders(ListOrdersRequest) returns (ListOrdersResponse);
  rpc CancelOrder(CancelOrderRequest) returns (google.protobuf.Empty);
  rpc StreamOrderUpdates(StreamOrderUpdatesRequest) returns (stream OrderUpdate);
}

message Order {
  int64 id = 1;
  int64 user_id = 2 [(validate.rules).int64.gt = 0];
  OrderStatus status = 3;
  repeated OrderItem items = 4 [(validate.rules).repeated.min_items = 1];
  double total_amount = 5 [(validate.rules).double.gt = 0];
  string currency = 6 [(validate.rules).string.len = 3];
  google.protobuf.Timestamp created_at = 7;
  google.protobuf.Timestamp updated_at = 8;
  ShippingAddress shipping_address = 9;
  PaymentInfo payment_info = 10;
}

message OrderItem {
  int64 product_id = 1 [(validate.rules).int64.gt = 0];
  string product_name = 2 [(validate.rules).string.min_len = 1];
  int32 quantity = 3 [(validate.rules).int32.gt = 0];
  double unit_price = 4 [(validate.rules).double.gt = 0];
  double total_price = 5;
}

enum OrderStatus {
  ORDER_STATUS_UNSPECIFIED = 0;
  ORDER_STATUS_PENDING = 1;
  ORDER_STATUS_CONFIRMED = 2;
  ORDER_STATUS_PROCESSING = 3;
  ORDER_STATUS_SHIPPED = 4;
  ORDER_STATUS_DELIVERED = 5;
  ORDER_STATUS_CANCELLED = 6;
}

message CreateOrderRequest {
  int64 user_id = 1 [(validate.rules).int64.gt = 0];
  repeated OrderItem items = 2 [(validate.rules).repeated.min_items = 1];
  ShippingAddress shipping_address = 3;
  PaymentInfo payment_info = 4;
}

message CreateOrderResponse {
  Order order = 1;
}

message GetOrderRequest {
  int64 order_id = 1 [(validate.rules).int64.gt = 0];
}

message GetOrderResponse {
  Order order = 1;
}

message UpdateOrderStatusRequest {
  int64 order_id = 1 [(validate.rules).int64.gt = 0];
  OrderStatus new_status = 2 [(validate.rules).enum.defined_only = true];
  string reason = 3;
}

message UpdateOrderStatusResponse {
  Order order = 1;
}

message ListOrdersRequest {
  int64 user_id = 1;
  OrderStatus status_filter = 2;
  int32 page_size = 3 [(validate.rules).int32 = {gte: 1, lte: 100}];
  string page_token = 4;
}

message ListOrdersResponse {
  repeated Order orders = 1;
  string next_page_token = 2;
  int32 total_count = 3;
}

message CancelOrderRequest {
  int64 order_id = 1 [(validate.rules).int64.gt = 0];
  string reason = 2 [(validate.rules).string.min_len = 1];
}

message StreamOrderUpdatesRequest {
  int64 user_id = 1 [(validate.rules).int64.gt = 0];
}

message OrderUpdate {
  Order order = 1;
  OrderUpdateType update_type = 2;
}

enum OrderUpdateType {
  ORDER_UPDATE_TYPE_UNSPECIFIED = 0;
  ORDER_UPDATE_TYPE_CREATED = 1;
  ORDER_UPDATE_TYPE_STATUS_CHANGED = 2;
  ORDER_UPDATE_TYPE_CANCELLED = 3;
}

message ShippingAddress {
  string street_address = 1 [(validate.rules).string.min_len = 1];
  string city = 2 [(validate.rules).string.min_len = 1];
  string postal_code = 3 [(validate.rules).string.pattern = "^[0-9]{4,5}$"];
  string country = 4 [(validate.rules).string.len = 2];
}

message PaymentInfo {
  string payment_method_id = 1 [(validate.rules).string.min_len = 1];
  string payment_provider = 2;
  double amount = 3 [(validate.rules).double.gt = 0];
  string currency = 4 [(validate.rules).string.len = 3];
}
```

### gRPC Service Implementation

```java
// OrderServiceImpl.java
@GrpcService
@Slf4j
@RequiredArgsConstructor
public class OrderServiceImpl extends OrderServiceGrpc.OrderServiceImplBase {

    private final OrderService orderService;
    private final OrderMapper orderMapper;
    private final InventoryServiceClient inventoryClient;
    private final UserServiceClient userServiceClient;

    @Override
    public void createOrder(CreateOrderRequest request,
                           StreamObserver<CreateOrderResponse> responseObserver) {

        try {
            // Validate request
            validateCreateOrderRequest(request);

            // Check user exists
            UserInfo userInfo = userServiceClient.getUserInfo(request.getUserId());
            if (userInfo == null) {
                throw new StatusException(Status.NOT_FOUND
                        .withDescription("User not found: " + request.getUserId()));
            }

            // Check inventory
            for (OrderItem item : request.getItemsList()) {
                InventoryInfo inventory = inventoryClient.getInventoryInfo(item.getProductId());
                if (inventory.getAvailableQuantity() < item.getQuantity()) {
                    throw new StatusException(Status.FAILED_PRECONDITION
                            .withDescription("Insufficient inventory for product: " + item.getProductId()));
                }
            }

            // Create order
            Order order = orderService.createOrder(orderMapper.toDomain(request));
            Order savedOrder = orderService.save(order);

            // Reserve inventory
            for (OrderItem item : request.getItemsList()) {
                inventoryClient.reserveInventory(
                        ReserveInventoryRequest.newBuilder()
                                .setProductId(item.getProductId())
                                .setQuantity(item.getQuantity())
                                .setOrderId(savedOrder.getId())
                                .build());
            }

            CreateOrderResponse response = CreateOrderResponse.newBuilder()
                    .setOrder(orderMapper.toProto(savedOrder))
                    .build();

            responseObserver.onNext(response);
            responseObserver.onCompleted();

            log.info("Order created successfully: {}", savedOrder.getId());

        } catch (StatusException e) {
            responseObserver.onError(e);
        } catch (Exception e) {
            log.error("Error creating order", e);
            responseObserver.onError(Status.INTERNAL
                    .withDescription("Internal server error")
                    .withCause(e)
                    .asException());
        }
    }

    @Override
    public void getOrder(GetOrderRequest request,
                        StreamObserver<GetOrderResponse> responseObserver) {
        try {
            Order order = orderService.findById(request.getOrderId());
            if (order == null) {
                throw new StatusException(Status.NOT_FOUND
                        .withDescription("Order not found: " + request.getOrderId()));
            }

            GetOrderResponse response = GetOrderResponse.newBuilder()
                    .setOrder(orderMapper.toProto(order))
                    .build();

            responseObserver.onNext(response);
            responseObserver.onCompleted();

        } catch (StatusException e) {
            responseObserver.onError(e);
        } catch (Exception e) {
            log.error("Error getting order: {}", request.getOrderId(), e);
            responseObserver.onError(Status.INTERNAL
                    .withDescription("Internal server error")
                    .asException());
        }
    }

    @Override
    public void updateOrderStatus(UpdateOrderStatusRequest request,
                                 StreamObserver<UpdateOrderStatusResponse> responseObserver) {
        try {
            Order order = orderService.updateStatus(
                    request.getOrderId(),
                    orderMapper.toDomainStatus(request.getNewStatus()),
                    request.getReason());

            UpdateOrderStatusResponse response = UpdateOrderStatusResponse.newBuilder()
                    .setOrder(orderMapper.toProto(order))
                    .build();

            responseObserver.onNext(response);
            responseObserver.onCompleted();

            // Notify subscribers
            notifyOrderUpdate(order, OrderUpdateType.ORDER_UPDATE_TYPE_STATUS_CHANGED);

        } catch (OrderNotFoundException e) {
            responseObserver.onError(Status.NOT_FOUND
                    .withDescription("Order not found: " + request.getOrderId())
                    .asException());
        } catch (InvalidOrderStatusTransitionException e) {
            responseObserver.onError(Status.FAILED_PRECONDITION
                    .withDescription(e.getMessage())
                    .asException());
        } catch (Exception e) {
            log.error("Error updating order status", e);
            responseObserver.onError(Status.INTERNAL
                    .withDescription("Internal server error")
                    .asException());
        }
    }

    @Override
    public void listOrders(ListOrdersRequest request,
                          StreamObserver<ListOrdersResponse> responseObserver) {
        try {
            OrderSearchCriteria criteria = OrderSearchCriteria.builder()
                    .userId(request.getUserId() > 0 ? request.getUserId() : null)
                    .status(request.getStatusFilter() != OrderStatus.ORDER_STATUS_UNSPECIFIED
                            ? orderMapper.toDomainStatus(request.getStatusFilter()) : null)
                    .build();

            PageRequest pageRequest = PageRequest.of(
                    parsePageToken(request.getPageToken()),
                    request.getPageSize() > 0 ? request.getPageSize() : 20);

            Page<Order> orders = orderService.searchOrders(criteria, pageRequest);

            ListOrdersResponse.Builder responseBuilder = ListOrdersResponse.newBuilder();
            orders.getContent().forEach(order ->
                    responseBuilder.addOrders(orderMapper.toProto(order)));

            if (orders.hasNext()) {
                responseBuilder.setNextPageToken(
                        createPageToken(orders.getNumber() + 1));
            }
            responseBuilder.setTotalCount((int) orders.getTotalElements());

            responseObserver.onNext(responseBuilder.build());
            responseObserver.onCompleted();

        } catch (Exception e) {
            log.error("Error listing orders", e);
            responseObserver.onError(Status.INTERNAL
                    .withDescription("Internal server error")
                    .asException());
        }
    }

    @Override
    public void streamOrderUpdates(StreamOrderUpdatesRequest request,
                                  StreamObserver<OrderUpdate> responseObserver) {
        try {
            // Register stream observer for user's order updates
            orderUpdateStreamManager.addSubscriber(request.getUserId(), responseObserver);

            // Send existing orders as initial updates
            List<Order> userOrders = orderService.findByUserId(request.getUserId());
            for (Order order : userOrders) {
                OrderUpdate update = OrderUpdate.newBuilder()
                        .setOrder(orderMapper.toProto(order))
                        .setUpdateType(OrderUpdateType.ORDER_UPDATE_TYPE_CREATED)
                        .build();
                responseObserver.onNext(update);
            }

            log.info("Started streaming order updates for user: {}", request.getUserId());

        } catch (Exception e) {
            log.error("Error starting order stream for user: {}", request.getUserId(), e);
            responseObserver.onError(Status.INTERNAL
                    .withDescription("Internal server error")
                    .asException());
        }
    }

    private void validateCreateOrderRequest(CreateOrderRequest request) {
        if (request.getUserId() <= 0) {
            throw new StatusException(Status.INVALID_ARGUMENT
                    .withDescription("User ID must be positive"));
        }

        if (request.getItemsList().isEmpty()) {
            throw new StatusException(Status.INVALID_ARGUMENT
                    .withDescription("Order must contain at least one item"));
        }

        for (OrderItem item : request.getItemsList()) {
            if (item.getQuantity() <= 0) {
                throw new StatusException(Status.INVALID_ARGUMENT
                        .withDescription("Item quantity must be positive"));
            }
        }
    }

    private void notifyOrderUpdate(Order order, OrderUpdateType updateType) {
        OrderUpdate update = OrderUpdate.newBuilder()
                .setOrder(orderMapper.toProto(order))
                .setUpdateType(updateType)
                .build();

        orderUpdateStreamManager.notifySubscribers(order.getUserId(), update);
    }
}
```

### gRPC Client Configuration

```java
@Configuration
@EnableConfigurationProperties(GrpcClientProperties.class)
public class GrpcClientConfiguration {

    @Bean
    public InventoryServiceBlockingStub inventoryServiceStub(
            @Value("${grpc.client.inventory.host}") String host,
            @Value("${grpc.client.inventory.port}") int port) {

        ManagedChannel channel = NettyChannelBuilder.forAddress(host, port)
                .keepAliveTime(30, TimeUnit.SECONDS)
                .keepAliveTimeout(5, TimeUnit.SECONDS)
                .keepAliveWithoutCalls(true)
                .maxInboundMessageSize(4 * 1024 * 1024)
                .usePlaintext()
                .intercept(new ClientInterceptor[] {
                    new LoggingClientInterceptor(),
                    new AuthenticationClientInterceptor(),
                    new RetryInterceptor()
                })
                .build();

        return InventoryServiceGrpc.newBlockingStub(channel)
                .withDeadlineAfter(10, TimeUnit.SECONDS);
    }

    @Bean
    public UserServiceBlockingStub userServiceStub(
            @Value("${grpc.client.user.host}") String host,
            @Value("${grpc.client.user.port}") int port) {

        ManagedChannel channel = NettyChannelBuilder.forAddress(host, port)
                .keepAliveTime(30, TimeUnit.SECONDS)
                .usePlaintext()
                .build();

        return UserServiceGrpc.newBlockingStub(channel)
                .withDeadlineAfter(5, TimeUnit.SECONDS);
    }
}

// gRPC Interceptors
@Component
public class LoggingClientInterceptor implements ClientInterceptor {

    private static final Logger log = LoggerFactory.getLogger(LoggingClientInterceptor.class);

    @Override
    public <ReqT, RespT> ClientCall<ReqT, RespT> interceptCall(
            MethodDescriptor<ReqT, RespT> method,
            CallOptions callOptions,
            Channel next) {

        return new ForwardingClientCall.SimpleForwardingClientCall<ReqT, RespT>(
                next.newCall(method, callOptions)) {

            @Override
            public void start(Listener<RespT> responseListener, Metadata headers) {
                log.info("Starting gRPC call: {}", method.getFullMethodName());
                super.start(new ForwardingClientCallListener.SimpleForwardingClientCallListener<RespT>(responseListener) {
                    @Override
                    public void onClose(Status status, Metadata trailers) {
                        if (status.isOk()) {
                            log.info("gRPC call completed successfully: {}", method.getFullMethodName());
                        } else {
                            log.error("gRPC call failed: {} - {}", method.getFullMethodName(), status);
                        }
                        super.onClose(status, trailers);
                    }
                }, headers);
            }
        };
    }
}
```

## Task 3: Performance Benchmark

### Load Testing Script

```java
@Component
public class CommunicationBenchmark {

    private final RestTemplate restTemplate;
    private final OrderServiceBlockingStub grpcClient;
    private final MeterRegistry meterRegistry;

    @EventListener(ApplicationReadyEvent.class)
    public void runBenchmarks() {
        runRestBenchmark();
        runGrpcBenchmark();
        compareResults();
    }

    public void runRestBenchmark() {
        Timer.Sample sample = Timer.start(meterRegistry);

        int requestCount = 1000;
        int threadCount = 10;
        ExecutorService executor = Executors.newFixedThreadPool(threadCount);
        CountDownLatch latch = new CountDownLatch(requestCount);

        long startTime = System.currentTimeMillis();

        for (int i = 0; i < requestCount; i++) {
            final int requestId = i;
            executor.submit(() -> {
                try {
                    // Create user via REST
                    CreateUserRequest userRequest = new CreateUserRequest();
                    userRequest.setEmail("user" + requestId + "@test.com");
                    userRequest.setName("User " + requestId);

                    ResponseEntity<UserResponse> response = restTemplate.postForEntity(
                            "/api/v1/users", userRequest, UserResponse.class);

                    if (response.getStatusCode().is2xxSuccessful()) {
                        meterRegistry.counter("rest.requests.success").increment();
                    } else {
                        meterRegistry.counter("rest.requests.error").increment();
                    }

                } catch (Exception e) {
                    meterRegistry.counter("rest.requests.error").increment();
                    log.error("REST request failed", e);
                } finally {
                    latch.countDown();
                }
            });
        }

        try {
            latch.await(60, TimeUnit.SECONDS);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        long endTime = System.currentTimeMillis();
        long duration = endTime - startTime;

        sample.stop(Timer.builder("rest.benchmark.duration").register(meterRegistry));

        log.info("REST Benchmark completed: {} requests in {} ms, {} req/sec",
                requestCount, duration, requestCount * 1000.0 / duration);

        executor.shutdown();
    }

    public void runGrpcBenchmark() {
        Timer.Sample sample = Timer.start(meterRegistry);

        int requestCount = 1000;
        int threadCount = 10;
        ExecutorService executor = Executors.newFixedThreadPool(threadCount);
        CountDownLatch latch = new CountDownLatch(requestCount);

        long startTime = System.currentTimeMillis();

        for (int i = 0; i < requestCount; i++) {
            final int requestId = i;
            executor.submit(() -> {
                try {
                    // Create order via gRPC
                    CreateOrderRequest orderRequest = CreateOrderRequest.newBuilder()
                            .setUserId(requestId % 100 + 1)
                            .addItems(OrderItem.newBuilder()
                                    .setProductId(1)
                                    .setProductName("Test Product")
                                    .setQuantity(1)
                                    .setUnitPrice(99.99)
                                    .setTotalPrice(99.99)
                                    .build())
                            .setShippingAddress(ShippingAddress.newBuilder()
                                    .setStreetAddress("Test Street 1")
                                    .setCity("Test City")
                                    .setPostalCode("12345")
                                    .setCountry("HU")
                                    .build())
                            .build();

                    CreateOrderResponse response = grpcClient.createOrder(orderRequest);

                    if (response.hasOrder()) {
                        meterRegistry.counter("grpc.requests.success").increment();
                    }

                } catch (Exception e) {
                    meterRegistry.counter("grpc.requests.error").increment();
                    log.error("gRPC request failed", e);
                } finally {
                    latch.countDown();
                }
            });
        }

        try {
            latch.await(60, TimeUnit.SECONDS);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        long endTime = System.currentTimeMillis();
        long duration = endTime - startTime;

        sample.stop(Timer.builder("grpc.benchmark.duration").register(meterRegistry));

        log.info("gRPC Benchmark completed: {} requests in {} ms, {} req/sec",
                requestCount, duration, requestCount * 1000.0 / duration);

        executor.shutdown();
    }

    private void compareResults() {
        // Compare metrics from MeterRegistry
        Timer restTimer = meterRegistry.find("rest.benchmark.duration").timer();
        Timer grpcTimer = meterRegistry.find("grpc.benchmark.duration").timer();

        if (restTimer != null && grpcTimer != null) {
            double restAvgTime = restTimer.mean(TimeUnit.MILLISECONDS);
            double grpcAvgTime = grpcTimer.mean(TimeUnit.MILLISECONDS);

            log.info("Performance Comparison:");
            log.info("REST Average Time: {:.2f} ms", restAvgTime);
            log.info("gRPC Average Time: {:.2f} ms", grpcAvgTime);
            log.info("gRPC is {:.2f}x faster than REST", restAvgTime / grpcAvgTime);
        }
    }
}
```

## Task 4: API Gateway Integration

### Kong Configuration

```yaml
# kong.yml
_format_version: "3.0"

services:
  - name: user-service
    url: http://user-service:8080
    routes:
      - name: user-api
        paths:
          - /api/v1/users
        methods:
          - GET
          - POST
          - PUT
          - DELETE
        plugins:
          - name: rate-limiting
            config:
              minute: 100
              hour: 1000
          - name: cors
            config:
              origins:
                - http://localhost:3000
                - https://app.company.com
          - name: jwt
            config:
              secret_is_base64: false
              key_claim_name: iss
          - name: prometheus
            config:
              per_consumer: true

  - name: order-service-grpc
    url: grpc://order-service:9090
    protocol: grpc
    routes:
      - name: order-grpc-api
        protocols:
          - grpc
        hosts:
          - order-api.company.com
        plugins:
          - name: grpc-gateway
            config:
              proto:
                - /etc/kong/protos/order_service.proto
          - name: rate-limiting
            config:
              minute: 200
              hour: 2000
          - name: request-transformer
            config:
              add:
                headers:
                  - "X-Service-Version:v1"

  - name: payment-service
    url: http://payment-service:8080
    routes:
      - name: payment-api
        paths:
          - /api/v1/payments
        plugins:
          - name: oauth2
            config:
              scopes:
                - payment:write
                - payment:read
          - name: rate-limiting
            config:
              minute: 50
              hour: 500

plugins:
  - name: prometheus
    config:
      per_consumer: false
  - name: zipkin
    config:
      http_endpoint: http://jaeger:9411/api/v2/spans
      sample_ratio: 1.0
```

### Envoy Proxy Configuration

```yaml
# envoy.yaml
admin:
  access_log_path: /tmp/admin_access.log
  address:
    socket_address: { address: 0.0.0.0, port_value: 9901 }

static_resources:
  listeners:
  - name: listener_0
    address:
      socket_address: { address: 0.0.0.0, port_value: 8080 }
    filter_chains:
    - filters:
      - name: envoy.filters.network.http_connection_manager
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
          stat_prefix: ingress_http
          codec_type: AUTO
          route_config:
            name: local_route
            virtual_hosts:
            - name: local_service
              domains: ["*"]
              routes:
              - match:
                  prefix: "/api/v1/users"
                route:
                  cluster: user_service
                  timeout: 30s
              - match:
                  prefix: "/api/v1/payments"
                route:
                  cluster: payment_service
                  timeout: 15s
              - match:
                  prefix: "/grpc/orders"
                route:
                  cluster: order_service_grpc
                  timeout: 60s
          http_filters:
          - name: envoy.filters.http.cors
          - name: envoy.filters.http.jwt_authn
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.filters.http.jwt_authn.v3.JwtAuthentication
              providers:
                jwt_provider:
                  issuer: https://auth.company.com
                  audiences:
                  - company-api
                  remote_jwks:
                    http_uri:
                      uri: https://auth.company.com/.well-known/jwks.json
                      cluster: auth_service
              rules:
              - match:
                  prefix: /api/
                requires:
                  provider_name: jwt_provider
          - name: envoy.filters.http.rate_limit
          - name: envoy.filters.http.router

  clusters:
  - name: user_service
    connect_timeout: 5s
    type: LOGICAL_DNS
    dns_lookup_family: V4_ONLY
    lb_policy: ROUND_ROBIN
    load_assignment:
      cluster_name: user_service
      endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: user-service
                port_value: 8080
    health_checks:
    - timeout: 5s
      interval: 10s
      unhealthy_threshold: 2
      healthy_threshold: 2
      http_health_check:
        path: /actuator/health

  - name: order_service_grpc
    connect_timeout: 5s
    type: LOGICAL_DNS
    dns_lookup_family: V4_ONLY
    lb_policy: ROUND_ROBIN
    http2_protocol_options: {}
    load_assignment:
      cluster_name: order_service_grpc
      endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: order-service
                port_value: 9090
    health_checks:
    - timeout: 5s
      interval: 10s
      grpc_health_check:
        service_name: orderservice.v1.OrderService

  - name: payment_service
    connect_timeout: 5s
    type: LOGICAL_DNS
    dns_lookup_family: V4_ONLY
    lb_policy: ROUND_ROBIN
    load_assignment:
      cluster_name: payment_service
      endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: payment-service
                port_value: 8080
```

## Task 5: Monitoring and Telemetry

### Custom Metrics

```java
@Component
@RequiredArgsConstructor
public class CommunicationMetrics {

    private final MeterRegistry meterRegistry;

    private final Counter restRequestsTotal;
    private final Counter grpcRequestsTotal;
    private final Timer restRequestDuration;
    private final Timer grpcRequestDuration;
    private final Gauge activeConnections;

    @PostConstruct
    public void initMetrics() {
        restRequestsTotal = Counter.builder("rest_requests_total")
                .description("Total number of REST requests")
                .tag("protocol", "http")
                .register(meterRegistry);

        grpcRequestsTotal = Counter.builder("grpc_requests_total")
                .description("Total number of gRPC requests")
                .tag("protocol", "grpc")
                .register(meterRegistry);

        restRequestDuration = Timer.builder("rest_request_duration_seconds")
                .description("REST request duration")
                .tag("protocol", "http")
                .register(meterRegistry);

        grpcRequestDuration = Timer.builder("grpc_request_duration_seconds")
                .description("gRPC request duration")
                .tag("protocol", "grpc")
                .register(meterRegistry);

        activeConnections = Gauge.builder("active_connections")
                .description("Number of active connections")
                .register(meterRegistry, this, CommunicationMetrics::getActiveConnectionCount);
    }

    public void recordRestRequest(String method, String endpoint, String status, Duration duration) {
        restRequestsTotal.increment(
                Tags.of(
                        Tag.of("method", method),
                        Tag.of("endpoint", endpoint),
                        Tag.of("status", status)
                ));

        restRequestDuration.record(duration,
                Tags.of(
                        Tag.of("method", method),
                        Tag.of("endpoint", endpoint)
                ));
    }

    public void recordGrpcRequest(String method, String status, Duration duration) {
        grpcRequestsTotal.increment(
                Tags.of(
                        Tag.of("method", method),
                        Tag.of("status", status)
                ));

        grpcRequestDuration.record(duration,
                Tags.of(Tag.of("method", method)));
    }

    private double getActiveConnectionCount() {
        // Implementation to get actual connection count
        return 0.0;
    }
}

// Distributed Tracing
@Component
public class TracingConfiguration {

    @Bean
    public Sender sender() {
        return OkHttpSender.create("http://jaeger:14268/api/traces");
    }

    @Bean
    public AsyncReporter<Span> spanReporter() {
        return AsyncReporter.create(sender());
    }

    @Bean
    public Tracing tracing() {
        return Tracing.newBuilder()
                .localServiceName("microservice-platform")
                .spanReporter(spanReporter())
                .sampler(Sampler.create(1.0f))
                .build();
    }
}
```

## Checklist

- [ ] REST API OpenAPI documentation creation
- [ ] Protocol Buffers schema validation
- [ ] gRPC service health checks
- [ ] Load testing REST vs gRPC performance
- [ ] API Gateway routing configuration
- [ ] Service mesh integration (Istio/Linkerd)
- [ ] Distributed tracing Jaeger/Zipkin
- [ ] Circuit breaker pattern implementation
- [ ] Security: JWT authentication, OAuth2
- [ ] Error handling and retry mechanisms
- [ ] Versioning strategy for REST and gRPC
- [ ] Documentation and developer experience
- [ ] Production monitoring dashboards

## Next Steps

- GraphQL Federation implementation
- Event-driven architecture Message Queues
- Service Mesh advanced features (mTLS, Traffic Splitting)
- Multi-region deployment strategies
- Cost optimization analysis