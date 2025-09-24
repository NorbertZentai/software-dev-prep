---
title: "Circuit Breaker és Resilience Patterns"
difficulty: advanced
goals: ["Hystrix/Resilience4j", "Bulkhead Pattern", "Timeout & Retry", "Rate Limiting", "Health Monitoring"]
estimatedMinutes: 50
starter: {
  "stackblitz": "https://stackblitz.com/edit/resilience-patterns?file=README.md",
  "codesandbox": "https://codesandbox.io/s/circuit-breaker-demo",
  "dbfiddle": ""
}
---

# Circuit Breaker és Resilience Patterns

## Feladat leírása

Implementálj egy átfogó resilience stratégiát mikroszolgáltatás architektúrában, amely tartalmazza a Circuit Breaker, Bulkhead, Retry, Timeout, Rate Limiting és Health Check pattern-eket. A rendszer képes legyen graceful degradation-re és self-healing mechanizmusokra.

## Resilience Architecture áttekintés

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Client    │    │   Mobile App    │    │   Admin Panel   │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          │ Rate Limited         │ Rate Limited         │ Rate Limited
          ▼                      ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Load Balancer                               │
│                (Circuit Breaker Enabled)                       │
└─────────┬───────────────────┬───────────────────┬───────────────┘
          │                   │                   │
          ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  API Gateway    │ │  API Gateway    │ │  API Gateway    │
│   Instance 1    │ │   Instance 2    │ │   Instance 3    │
│  (Bulkhead)     │ │  (Bulkhead)     │ │  (Bulkhead)     │
└─────────┬───────┘ └─────────┬───────┘ └─────────┬───────┘
          │                   │                   │
          │ Circuit Breaker   │ Circuit Breaker   │ Circuit Breaker
          │ + Timeout         │ + Timeout         │ + Timeout
          │ + Retry           │ + Retry           │ + Retry
          ▼                   ▼                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                Service Mesh (Istio/Linkerd)                    │
│           ┌─────────────┬─────────────┬─────────────┐           │
│           │   Thread    │   Thread    │   Thread    │           │
│           │   Pool 1    │   Pool 2    │   Pool 3    │           │
│           │ (User API)  │ (Order API) │ (Payment)   │           │
│           └─────────────┴─────────────┴─────────────┘           │
└─────────┬───────────────────┬───────────────────┬───────────────┘
          │                   │                   │
          ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  User Service   │ │ Order Service   │ │ Payment Service │
│ (Resilient)     │ │ (Resilient)     │ │ (Resilient)     │
│                 │ │                 │ │                 │
│ ┌─────────────┐ │ │ ┌─────────────┐ │ │ ┌─────────────┐ │
│ │Circuit      │ │ │ │Circuit      │ │ │ │Circuit      │ │
│ │Breaker      │ │ │ │Breaker      │ │ │ │Breaker      │ │
│ └─────────────┘ │ │ └─────────────┘ │ │ └─────────────┘ │
│ ┌─────────────┐ │ │ ┌─────────────┐ │ │ ┌─────────────┐ │
│ │Rate Limiter │ │ │ │Rate Limiter │ │ │ │Rate Limiter │ │
│ └─────────────┘ │ │ └─────────────┘ │ │ └─────────────┘ │
│ ┌─────────────┐ │ │ ┌─────────────┐ │ │ ┌─────────────┐ │
│ │Health Check │ │ │ │Health Check │ │ │ │Health Check │ │
│ └─────────────┘ │ │ └─────────────┘ │ │ └─────────────┘ │
└─────────┬───────┘ └─────────┬───────┘ └─────────┬───────┘
          │                   │                   │
          ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  User Database  │ │ Order Database  │ │Payment Provider │
│  (Resilient)    │ │  (Resilient)    │ │  (External)     │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

## Feladat 1: Resilience4j Circuit Breaker

### Circuit Breaker Configuration

```java
@Configuration
@RequiredArgsConstructor
public class ResilienceConfiguration {

    @Bean
    public CircuitBreakerConfig defaultCircuitBreakerConfig() {
        return CircuitBreakerConfig.custom()
                .failureRateThreshold(50)                    // 50% failure rate threshold
                .waitDurationInOpenState(Duration.ofSeconds(30))  // Wait 30s in open state
                .slidingWindowSize(10)                       // Consider last 10 calls
                .minimumNumberOfCalls(5)                     // Min 5 calls before calculation
                .permittedNumberOfCallsInHalfOpenState(3)    // 3 calls allowed in half-open
                .slowCallRateThreshold(50)                   // 50% slow call threshold
                .slowCallDurationThreshold(Duration.ofSeconds(2)) // Calls > 2s are slow
                .recordExceptions(
                        IOException.class,
                        TimeoutException.class,
                        ConnectException.class
                )
                .ignoreExceptions(
                        IllegalArgumentException.class,
                        ValidationException.class
                )
                .build();
    }

    @Bean
    public CircuitBreakerRegistry circuitBreakerRegistry() {
        CircuitBreakerRegistry registry = CircuitBreakerRegistry.of(defaultCircuitBreakerConfig());

        // Custom config for external payment service
        CircuitBreakerConfig paymentServiceConfig = CircuitBreakerConfig.custom()
                .failureRateThreshold(30)                    // More sensitive for payments
                .waitDurationInOpenState(Duration.ofSeconds(60))  // Longer wait for payments
                .slidingWindowSize(20)
                .minimumNumberOfCalls(10)
                .build();

        registry.circuitBreaker("paymentService", paymentServiceConfig);

        // Custom config for database operations
        CircuitBreakerConfig databaseConfig = CircuitBreakerConfig.custom()
                .failureRateThreshold(70)                    // More tolerant for DB
                .waitDurationInOpenState(Duration.ofSeconds(15))
                .slidingWindowSize(15)
                .minimumNumberOfCalls(5)
                .build();

        registry.circuitBreaker("database", databaseConfig);

        return registry;
    }

    @Bean
    public RetryConfig defaultRetryConfig() {
        return RetryConfig.custom()
                .maxAttempts(3)
                .waitDuration(Duration.ofMillis(1000))
                .exponentialBackoffMultiplier(2.0)
                .retryOnExceptions(
                        IOException.class,
                        SocketTimeoutException.class,
                        ConnectException.class
                )
                .ignoreExceptions(
                        IllegalArgumentException.class,
                        ValidationException.class
                )
                .build();
    }

    @Bean
    public TimeLimiterConfig defaultTimeLimiterConfig() {
        return TimeLimiterConfig.custom()
                .timeoutDuration(Duration.ofSeconds(3))
                .cancelRunningFuture(true)
                .build();
    }

    @Bean
    public BulkheadConfig defaultBulkheadConfig() {
        return BulkheadConfig.custom()
                .maxConcurrentCalls(25)
                .maxWaitDuration(Duration.ofMillis(100))
                .build();
    }

    @Bean
    public RateLimiterConfig defaultRateLimiterConfig() {
        return RateLimiterConfig.custom()
                .limitRefreshPeriod(Duration.ofSeconds(1))
                .limitForPeriod(100)
                .timeoutDuration(Duration.ofMillis(500))
                .build();
    }
}
```

### Circuit Breaker Service

```java
@Service
@Slf4j
@RequiredArgsConstructor
public class ResilientPaymentService implements PaymentService {

    private final PaymentServiceClient paymentClient;
    private final CircuitBreakerRegistry circuitBreakerRegistry;
    private final RetryRegistry retryRegistry;
    private final TimeLimiterRegistry timeLimiterRegistry;
    private final BulkheadRegistry bulkheadRegistry;
    private final MeterRegistry meterRegistry;
    private final PaymentFallbackService fallbackService;

    private final CircuitBreaker circuitBreaker;
    private final Retry retry;
    private final TimeLimiter timeLimiter;
    private final Bulkhead bulkhead;

    @PostConstruct
    public void initResilience() {
        // Get circuit breaker for payment service
        this.circuitBreaker = circuitBreakerRegistry.circuitBreaker("paymentService");
        this.retry = retryRegistry.retry("paymentService");
        this.timeLimiter = timeLimiterRegistry.timeLimiter("paymentService");
        this.bulkhead = bulkheadRegistry.bulkhead("paymentService");

        // Add event listeners
        circuitBreaker.getEventPublisher()
                .onStateTransition(this::onStateTransition)
                .onCallNotPermitted(this::onCallNotPermitted)
                .onFailureRateExceeded(this::onFailureRateExceeded);

        retry.getEventPublisher()
                .onRetry(this::onRetry);
    }

    @Override
    public CompletableFuture<PaymentResponse> processPayment(PaymentRequest request) {
        // Compose all resilience patterns
        Supplier<CompletableFuture<PaymentResponse>> decoratedSupplier =
                Decorators.ofSupplier(() -> paymentClient.processPaymentAsync(request))
                        .withCircuitBreaker(circuitBreaker)
                        .withRetry(retry)
                        .withTimeLimiter(timeLimiter)
                        .withBulkhead(bulkhead)
                        .withFallback(Arrays.asList(
                                PaymentServiceException.class,
                                CircuitBreakerOpenException.class,
                                BulkheadFullException.class
                        ), this::handlePaymentFallback)
                        .decorate();

        return decoratedSupplier.get()
                .thenApply(response -> {
                    recordSuccessMetrics(request);
                    return response;
                })
                .exceptionally(throwable -> {
                    recordErrorMetrics(request, throwable);
                    throw new CompletionException(throwable);
                });
    }

    @Override
    public PaymentResponse processPaymentSync(PaymentRequest request) {
        // Synchronous version with resilience patterns
        Supplier<PaymentResponse> decoratedSupplier =
                Decorators.ofSupplier(() -> paymentClient.processPayment(request))
                        .withCircuitBreaker(circuitBreaker)
                        .withRetry(retry)
                        .withBulkhead(bulkhead)
                        .withFallback(Arrays.asList(
                                PaymentServiceException.class,
                                CircuitBreakerOpenException.class
                        ), this::handlePaymentFallbackSync)
                        .decorate();

        try {
            PaymentResponse response = decoratedSupplier.get();
            recordSuccessMetrics(request);
            return response;
        } catch (Exception e) {
            recordErrorMetrics(request, e);
            throw e;
        }
    }

    private CompletableFuture<PaymentResponse> handlePaymentFallback(PaymentRequest request, Exception ex) {
        log.warn("Payment service fallback triggered for request: {} - {}",
                request.getPaymentId(), ex.getMessage());

        recordFallbackMetrics(request, ex);

        // Try alternative payment methods or defer payment
        if (ex instanceof CircuitBreakerOpenException) {
            return fallbackService.deferPayment(request);
        } else if (ex instanceof BulkheadFullException) {
            return fallbackService.queuePayment(request);
        } else {
            return fallbackService.processWithAlternativeProvider(request);
        }
    }

    private PaymentResponse handlePaymentFallbackSync(PaymentRequest request, Exception ex) {
        return handlePaymentFallback(request, ex).join();
    }

    @Override
    public PaymentStatus getPaymentStatus(String paymentId) {
        Supplier<PaymentStatus> decoratedSupplier =
                Decorators.ofSupplier(() -> paymentClient.getPaymentStatus(paymentId))
                        .withCircuitBreaker(circuitBreaker)
                        .withRetry(retry)
                        .withFallback(Exception.class, (ex) -> PaymentStatus.UNKNOWN)
                        .decorate();

        return decoratedSupplier.get();
    }

    // Event handlers
    private void onStateTransition(CircuitBreaker.StateTransition stateTransition) {
        log.info("Circuit breaker state transition: {} -> {}",
                stateTransition.getFromState(), stateTransition.getToState());

        meterRegistry.counter("circuit_breaker.state_transition",
                Tags.of(
                        Tag.of("service", "paymentService"),
                        Tag.of("from_state", stateTransition.getFromState().name()),
                        Tag.of("to_state", stateTransition.getToState().name())
                )).increment();

        // Send alerts for critical state changes
        if (stateTransition.getToState() == CircuitBreaker.State.OPEN) {
            alertService.sendCriticalAlert("Payment service circuit breaker opened!",
                    "Payment processing is degraded");
        }
    }

    private void onCallNotPermitted(CircuitBreaker.CallNotPermittedEvent event) {
        log.warn("Circuit breaker call not permitted for payment service");

        meterRegistry.counter("circuit_breaker.call_not_permitted",
                Tags.of(Tag.of("service", "paymentService"))).increment();
    }

    private void onFailureRateExceeded(CircuitBreaker.FailureRateExceededEvent event) {
        log.error("Payment service failure rate exceeded: {}%",
                event.getFailureRate());

        meterRegistry.gauge("circuit_breaker.failure_rate",
                Tags.of(Tag.of("service", "paymentService")), event.getFailureRate());
    }

    private void onRetry(Retry.RetryEvent event) {
        log.info("Payment service retry attempt #{}: {}",
                event.getNumberOfRetryAttempts(), event.getLastThrowable().getMessage());

        meterRegistry.counter("retry.attempts",
                Tags.of(Tag.of("service", "paymentService"))).increment();
    }

    // Metrics recording
    private void recordSuccessMetrics(PaymentRequest request) {
        meterRegistry.counter("payment.requests.success",
                Tags.of(
                        Tag.of("payment_method", request.getPaymentMethod()),
                        Tag.of("currency", request.getCurrency())
                )).increment();
    }

    private void recordErrorMetrics(PaymentRequest request, Throwable error) {
        meterRegistry.counter("payment.requests.error",
                Tags.of(
                        Tag.of("payment_method", request.getPaymentMethod()),
                        Tag.of("error_type", error.getClass().getSimpleName())
                )).increment();
    }

    private void recordFallbackMetrics(PaymentRequest request, Exception error) {
        meterRegistry.counter("payment.fallback.triggered",
                Tags.of(
                        Tag.of("fallback_reason", error.getClass().getSimpleName())
                )).increment();
    }
}
```

## Feladat 2: Bulkhead Pattern Implementation

### Thread Pool Isolation

```java
@Configuration
@EnableAsync
public class BulkheadConfiguration {

    @Bean("userServiceExecutor")
    public Executor userServiceExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(10);
        executor.setQueueCapacity(25);
        executor.setThreadNamePrefix("UserService-");
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        executor.initialize();
        return new MonitoringTaskExecutor(executor, "userService");
    }

    @Bean("orderServiceExecutor")
    public Executor orderServiceExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);
        executor.setMaxPoolSize(20);
        executor.setQueueCapacity(50);
        executor.setThreadNamePrefix("OrderService-");
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.AbortPolicy());
        executor.initialize();
        return new MonitoringTaskExecutor(executor, "orderService");
    }

    @Bean("paymentServiceExecutor")
    public Executor paymentServiceExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(3);
        executor.setMaxPoolSize(6);
        executor.setQueueCapacity(10);
        executor.setThreadNamePrefix("PaymentService-");
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        executor.initialize();
        return new MonitoringTaskExecutor(executor, "paymentService");
    }

    @Bean("notificationServiceExecutor")
    public Executor notificationServiceExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(2);
        executor.setMaxPoolSize(4);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("NotificationService-");
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.DiscardOldestPolicy());
        executor.initialize();
        return new MonitoringTaskExecutor(executor, "notificationService");
    }
}

// Monitoring Task Executor Wrapper
public class MonitoringTaskExecutor implements TaskExecutor {

    private final TaskExecutor delegate;
    private final String poolName;
    private final MeterRegistry meterRegistry;

    public MonitoringTaskExecutor(TaskExecutor delegate, String poolName) {
        this.delegate = delegate;
        this.poolName = poolName;
        this.meterRegistry = Metrics.globalRegistry;

        // Register metrics if delegate is ThreadPoolTaskExecutor
        if (delegate instanceof ThreadPoolTaskExecutor) {
            ThreadPoolTaskExecutor tpte = (ThreadPoolTaskExecutor) delegate;
            ThreadPoolExecutor tpe = tpte.getThreadPoolExecutor();

            Gauge.builder("thread_pool.active_threads")
                    .tag("pool", poolName)
                    .register(meterRegistry, tpe, ThreadPoolExecutor::getActiveCount);

            Gauge.builder("thread_pool.pool_size")
                    .tag("pool", poolName)
                    .register(meterRegistry, tpe, ThreadPoolExecutor::getPoolSize);

            Gauge.builder("thread_pool.queue_size")
                    .tag("pool", poolName)
                    .register(meterRegistry, tpe, tpe -> tpe.getQueue().size());
        }
    }

    @Override
    public void execute(Runnable task) {
        Timer.Sample sample = Timer.start(meterRegistry);

        try {
            delegate.execute(() -> {
                try {
                    task.run();
                    meterRegistry.counter("thread_pool.tasks.success",
                            Tags.of(Tag.of("pool", poolName))).increment();
                } catch (Exception e) {
                    meterRegistry.counter("thread_pool.tasks.error",
                            Tags.of(Tag.of("pool", poolName))).increment();
                    throw e;
                } finally {
                    sample.stop(Timer.builder("thread_pool.task.duration")
                            .tag("pool", poolName)
                            .register(meterRegistry));
                }
            });
        } catch (RejectedExecutionException e) {
            meterRegistry.counter("thread_pool.tasks.rejected",
                    Tags.of(Tag.of("pool", poolName))).increment();
            throw e;
        }
    }
}

// Service with Bulkhead Isolation
@Service
@Slf4j
@RequiredArgsConstructor
public class BulkheadOrderService {

    private final OrderRepository orderRepository;
    private final PaymentService paymentService;
    private final NotificationService notificationService;
    private final UserService userService;

    @Async("orderServiceExecutor")
    public CompletableFuture<Order> createOrder(CreateOrderRequest request) {
        try {
            log.info("Processing order creation in isolated thread pool: {}",
                    Thread.currentThread().getName());

            // Create order in isolated thread pool
            Order order = new Order();
            order.setUserId(request.getUserId());
            order.setItems(request.getItems());
            order.setStatus(OrderStatus.PENDING);

            Order savedOrder = orderRepository.save(order);

            // Trigger other operations in their respective thread pools
            processPaymentAsync(savedOrder);
            sendNotificationAsync(savedOrder);

            return CompletableFuture.completedFuture(savedOrder);

        } catch (Exception e) {
            log.error("Failed to create order in bulkhead", e);
            return CompletableFuture.failedFuture(e);
        }
    }

    @Async("paymentServiceExecutor")
    public CompletableFuture<Void> processPaymentAsync(Order order) {
        try {
            log.info("Processing payment in isolated thread pool: {}",
                    Thread.currentThread().getName());

            PaymentRequest paymentRequest = PaymentRequest.builder()
                    .orderId(order.getId())
                    .userId(order.getUserId())
                    .amount(order.getTotalAmount())
                    .build();

            PaymentResponse response = paymentService.processPaymentSync(paymentRequest);

            if (response.isSuccess()) {
                order.setStatus(OrderStatus.PAID);
                orderRepository.save(order);
            }

            return CompletableFuture.completedFuture(null);

        } catch (Exception e) {
            log.error("Payment processing failed in bulkhead", e);
            return CompletableFuture.failedFuture(e);
        }
    }

    @Async("notificationServiceExecutor")
    public CompletableFuture<Void> sendNotificationAsync(Order order) {
        try {
            log.info("Sending notification in isolated thread pool: {}",
                    Thread.currentThread().getName());

            // Get user info in user service thread pool
            CompletableFuture<User> userFuture = getUserAsync(order.getUserId());

            userFuture.thenAccept(user -> {
                NotificationRequest notification = NotificationRequest.builder()
                        .userId(user.getId())
                        .email(user.getEmail())
                        .type(NotificationType.ORDER_CREATED)
                        .orderId(order.getId())
                        .build();

                notificationService.sendNotification(notification);
            });

            return CompletableFuture.completedFuture(null);

        } catch (Exception e) {
            log.error("Notification sending failed in bulkhead", e);
            return CompletableFuture.failedFuture(e);
        }
    }

    @Async("userServiceExecutor")
    public CompletableFuture<User> getUserAsync(String userId) {
        try {
            log.info("Getting user in isolated thread pool: {}",
                    Thread.currentThread().getName());

            User user = userService.findById(userId);
            return CompletableFuture.completedFuture(user);

        } catch (Exception e) {
            log.error("User retrieval failed in bulkhead", e);
            return CompletableFuture.failedFuture(e);
        }
    }
}
```

## Feladat 3: Rate Limiting Implementation

### Token Bucket Rate Limiter

```java
@Component
@Slf4j
public class RateLimitingService {

    private final RateLimiterRegistry rateLimiterRegistry;
    private final RedisTemplate<String, String> redisTemplate;
    private final MeterRegistry meterRegistry;

    private static final String RATE_LIMIT_KEY_PREFIX = "rate_limit:";

    public RateLimitingService(RateLimiterRegistry rateLimiterRegistry,
                              RedisTemplate<String, String> redisTemplate,
                              MeterRegistry meterRegistry) {
        this.rateLimiterRegistry = rateLimiterRegistry;
        this.redisTemplate = redisTemplate;
        this.meterRegistry = meterRegistry;

        setupRateLimiters();
    }

    private void setupRateLimiters() {
        // API rate limiter - 100 requests per minute per user
        RateLimiterConfig apiConfig = RateLimiterConfig.custom()
                .limitRefreshPeriod(Duration.ofMinutes(1))
                .limitForPeriod(100)
                .timeoutDuration(Duration.ofMillis(100))
                .build();
        rateLimiterRegistry.rateLimiter("api", apiConfig);

        // Payment rate limiter - 10 payments per minute per user
        RateLimiterConfig paymentConfig = RateLimiterConfig.custom()
                .limitRefreshPeriod(Duration.ofMinutes(1))
                .limitForPeriod(10)
                .timeoutDuration(Duration.ofMillis(500))
                .build();
        rateLimiterRegistry.rateLimiter("payment", paymentConfig);

        // Order creation rate limiter - 20 orders per minute per user
        RateLimiterConfig orderConfig = RateLimiterConfig.custom()
                .limitRefreshPeriod(Duration.ofMinutes(1))
                .limitForPeriod(20)
                .timeoutDuration(Duration.ofMillis(200))
                .build();
        rateLimiterRegistry.rateLimiter("order", orderConfig);
    }

    public boolean isAllowed(String operation, String userId) {
        String rateLimiterName = operation.toLowerCase();
        RateLimiter rateLimiter = rateLimiterRegistry.rateLimiter(
                rateLimiterName + ":" + userId, rateLimiterName);

        boolean allowed = rateLimiter.acquirePermission();

        if (allowed) {
            meterRegistry.counter("rate_limiter.requests.allowed",
                    Tags.of(
                            Tag.of("operation", operation),
                            Tag.of("user", userId)
                    )).increment();
        } else {
            meterRegistry.counter("rate_limiter.requests.rejected",
                    Tags.of(
                            Tag.of("operation", operation),
                            Tag.of("user", userId)
                    )).increment();

            log.warn("Rate limit exceeded for operation: {} by user: {}", operation, userId);
        }

        return allowed;
    }

    public boolean isAllowedWithDistributedLimiter(String operation, String userId,
                                                  int limit, Duration window) {
        String key = RATE_LIMIT_KEY_PREFIX + operation + ":" + userId;

        try {
            // Sliding window log implementation
            long now = System.currentTimeMillis();
            long windowStart = now - window.toMillis();

            // Remove old entries
            redisTemplate.opsForZSet().removeRangeByScore(key, 0, windowStart);

            // Count current requests
            Long currentCount = redisTemplate.opsForZSet().count(key, windowStart, now);

            if (currentCount == null) {
                currentCount = 0L;
            }

            if (currentCount < limit) {
                // Add current request
                redisTemplate.opsForZSet().add(key, UUID.randomUUID().toString(), now);
                redisTemplate.expire(key, window);

                meterRegistry.counter("distributed_rate_limiter.requests.allowed",
                        Tags.of(
                                Tag.of("operation", operation),
                                Tag.of("user", userId)
                        )).increment();

                return true;
            } else {
                meterRegistry.counter("distributed_rate_limiter.requests.rejected",
                        Tags.of(
                                Tag.of("operation", operation),
                                Tag.of("user", userId)
                        )).increment();

                log.warn("Distributed rate limit exceeded for operation: {} by user: {}",
                        operation, userId);
                return false;
            }

        } catch (Exception e) {
            log.error("Error in distributed rate limiting", e);
            // Fail open - allow request if Redis is down
            return true;
        }
    }

    public RateLimiterStatus getRateLimiterStatus(String operation, String userId) {
        String rateLimiterName = operation.toLowerCase() + ":" + userId;
        RateLimiter rateLimiter = rateLimiterRegistry.rateLimiter(rateLimiterName);

        RateLimiter.Metrics metrics = rateLimiter.getMetrics();

        return RateLimiterStatus.builder()
                .availablePermissions(metrics.getAvailablePermissions())
                .numberOfWaitingThreads(metrics.getNumberOfWaitingThreads())
                .build();
    }
}

// Rate Limiting Interceptor
@Component
@Order(1)
@Slf4j
@RequiredArgsConstructor
public class RateLimitingInterceptor implements HandlerInterceptor {

    private final RateLimitingService rateLimitingService;
    private final UserContextService userContextService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
                           Object handler) throws Exception {

        String operation = extractOperation(request);
        String userId = userContextService.getCurrentUserId();

        if (userId == null) {
            // For anonymous users, use IP-based limiting
            userId = getClientIP(request);
        }

        boolean allowed = rateLimitingService.isAllowed(operation, userId);

        if (!allowed) {
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);

            RateLimitResponse rateLimitResponse = RateLimitResponse.builder()
                    .error("Rate limit exceeded")
                    .message("Too many requests. Please try again later.")
                    .retryAfter(60)
                    .build();

            ObjectMapper mapper = new ObjectMapper();
            response.getWriter().write(mapper.writeValueAsString(rateLimitResponse));

            return false;
        }

        // Add rate limit headers
        RateLimiterStatus status = rateLimitingService.getRateLimiterStatus(operation, userId);
        response.addHeader("X-RateLimit-Remaining", String.valueOf(status.getAvailablePermissions()));
        response.addHeader("X-RateLimit-Limit", "100");
        response.addHeader("X-RateLimit-Reset", String.valueOf(System.currentTimeMillis() + 60000));

        return true;
    }

    private String extractOperation(HttpServletRequest request) {
        String path = request.getRequestURI();
        String method = request.getMethod();

        if (path.contains("/api/v1/payments")) {
            return "PAYMENT";
        } else if (path.contains("/api/v1/orders")) {
            return "ORDER";
        } else {
            return "API";
        }
    }

    private String getClientIP(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }

        String xRealIP = request.getHeader("X-Real-IP");
        if (xRealIP != null && !xRealIP.isEmpty()) {
            return xRealIP;
        }

        return request.getRemoteAddr();
    }
}
```

## Feladat 4: Health Monitoring és Self-Healing

### Custom Health Indicators

```java
@Component
public class PaymentServiceHealthIndicator implements HealthIndicator {

    private final PaymentServiceClient paymentClient;
    private final CircuitBreakerRegistry circuitBreakerRegistry;
    private final MeterRegistry meterRegistry;

    private static final Duration HEALTH_CHECK_TIMEOUT = Duration.ofSeconds(5);

    public PaymentServiceHealthIndicator(PaymentServiceClient paymentClient,
                                       CircuitBreakerRegistry circuitBreakerRegistry,
                                       MeterRegistry meterRegistry) {
        this.paymentClient = paymentClient;
        this.circuitBreakerRegistry = circuitBreakerRegistry;
        this.meterRegistry = meterRegistry;
    }

    @Override
    public Health health() {
        try {
            Timer.Sample sample = Timer.start(meterRegistry);

            // Check circuit breaker state
            CircuitBreaker circuitBreaker = circuitBreakerRegistry.circuitBreaker("paymentService");
            CircuitBreaker.State circuitState = circuitBreaker.getState();

            Health.Builder healthBuilder = new Health.Builder();

            if (circuitState == CircuitBreaker.State.OPEN) {
                return healthBuilder
                        .down()
                        .withDetail("circuit_breaker_state", circuitState.name())
                        .withDetail("reason", "Circuit breaker is open")
                        .build();
            }

            // Perform actual health check
            CompletableFuture<HealthCheckResponse> healthCheckFuture =
                    paymentClient.checkHealthAsync();

            HealthCheckResponse response = healthCheckFuture
                    .orTimeout(HEALTH_CHECK_TIMEOUT.toSeconds(), TimeUnit.SECONDS)
                    .join();

            sample.stop(Timer.builder("health_check.duration")
                    .tag("service", "payment")
                    .register(meterRegistry));

            if (response.isHealthy()) {
                return healthBuilder
                        .up()
                        .withDetail("circuit_breaker_state", circuitState.name())
                        .withDetail("response_time", response.getResponseTimeMs())
                        .withDetail("service_version", response.getVersion())
                        .withDetail("last_check", Instant.now().toString())
                        .build();
            } else {
                return healthBuilder
                        .down()
                        .withDetail("circuit_breaker_state", circuitState.name())
                        .withDetail("error", response.getError())
                        .withDetail("last_check", Instant.now().toString())
                        .build();
            }

        } catch (TimeoutException e) {
            meterRegistry.counter("health_check.timeout",
                    Tags.of(Tag.of("service", "payment"))).increment();

            return Health.down()
                    .withDetail("error", "Health check timeout")
                    .withDetail("timeout", HEALTH_CHECK_TIMEOUT.toString())
                    .build();

        } catch (Exception e) {
            meterRegistry.counter("health_check.error",
                    Tags.of(Tag.of("service", "payment"))).increment();

            return Health.down()
                    .withException(e)
                    .withDetail("last_check", Instant.now().toString())
                    .build();
        }
    }
}

@Component
public class DatabaseHealthIndicator implements HealthIndicator {

    private final DataSource dataSource;
    private final MeterRegistry meterRegistry;

    @Override
    public Health health() {
        try (Connection connection = dataSource.getConnection()) {
            Timer.Sample sample = Timer.start(meterRegistry);

            // Execute simple query to test database connectivity
            try (Statement statement = connection.createStatement()) {
                ResultSet resultSet = statement.executeQuery("SELECT 1");

                if (resultSet.next()) {
                    sample.stop(Timer.builder("health_check.duration")
                            .tag("service", "database")
                            .register(meterRegistry));

                    return Health.up()
                            .withDetail("database", connection.getMetaData().getDatabaseProductName())
                            .withDetail("version", connection.getMetaData().getDatabaseProductVersion())
                            .withDetail("connection_valid", connection.isValid(1))
                            .build();
                }
            }

            return Health.down()
                    .withDetail("reason", "Query execution failed")
                    .build();

        } catch (SQLException e) {
            meterRegistry.counter("health_check.error",
                    Tags.of(Tag.of("service", "database"))).increment();

            return Health.down()
                    .withException(e)
                    .build();
        }
    }
}

// Composite Health Indicator for overall system health
@Component
public class SystemHealthIndicator implements HealthIndicator {

    private final List<HealthIndicator> healthIndicators;
    private final MeterRegistry meterRegistry;

    public SystemHealthIndicator(List<HealthIndicator> healthIndicators,
                               MeterRegistry meterRegistry) {
        this.healthIndicators = healthIndicators;
        this.meterRegistry = meterRegistry;
    }

    @Override
    public Health health() {
        Map<String, Health> healths = new HashMap<>();
        Health.Builder systemHealthBuilder = new Health.Builder();

        int upServices = 0;
        int totalServices = 0;

        for (HealthIndicator indicator : healthIndicators) {
            String indicatorName = indicator.getClass().getSimpleName()
                    .replace("HealthIndicator", "").toLowerCase();

            try {
                Health health = indicator.health();
                healths.put(indicatorName, health);

                totalServices++;
                if (health.getStatus() == Status.UP) {
                    upServices++;
                }

            } catch (Exception e) {
                healths.put(indicatorName, Health.down().withException(e).build());
                totalServices++;
            }
        }

        // Calculate system health based on service health
        double healthPercentage = totalServices > 0 ? (double) upServices / totalServices : 0;

        meterRegistry.gauge("system.health.percentage", healthPercentage * 100);
        meterRegistry.gauge("system.services.up", upServices);
        meterRegistry.gauge("system.services.total", totalServices);

        Status systemStatus;
        if (healthPercentage >= 1.0) {
            systemStatus = Status.UP;
        } else if (healthPercentage >= 0.5) {
            systemStatus = new Status("DEGRADED");
        } else {
            systemStatus = Status.DOWN;
        }

        return systemHealthBuilder
                .status(systemStatus)
                .withDetail("services", healths)
                .withDetail("health_percentage", String.format("%.1f%%", healthPercentage * 100))
                .withDetail("services_up", upServices)
                .withDetail("services_total", totalServices)
                .withDetail("last_check", Instant.now().toString())
                .build();
    }
}
```

### Self-Healing Mechanisms

```java
@Component
@Slf4j
@RequiredArgsConstructor
public class SelfHealingService {

    private final CircuitBreakerRegistry circuitBreakerRegistry;
    private final HealthEndpoint healthEndpoint;
    private final ServiceRegistry serviceRegistry;
    private final AlertService alertService;
    private final MeterRegistry meterRegistry;

    @Scheduled(fixedDelay = 30000) // Every 30 seconds
    public void performHealthChecks() {
        try {
            Health systemHealth = healthEndpoint.health();

            if (systemHealth.getStatus() == Status.DOWN) {
                log.warn("System health is DOWN, initiating self-healing procedures");
                initiateSelfHealing(systemHealth);
            } else if ("DEGRADED".equals(systemHealth.getStatus().getCode())) {
                log.warn("System health is DEGRADED, performing optimization");
                optimizeSystem(systemHealth);
            }

        } catch (Exception e) {
            log.error("Error during health check", e);
        }
    }

    @EventListener
    public void handleCircuitBreakerOpen(CircuitBreakerOnStateTransitionEvent event) {
        if (event.getStateTransition().getToState() == CircuitBreaker.State.OPEN) {
            String circuitBreakerName = event.getCircuitBreakerName();
            log.warn("Circuit breaker opened: {}", circuitBreakerName);

            meterRegistry.counter("self_healing.circuit_breaker_opened",
                    Tags.of(Tag.of("circuit_breaker", circuitBreakerName))).increment();

            // Attempt self-healing based on circuit breaker
            performCircuitBreakerSelfHealing(circuitBreakerName);
        }
    }

    private void initiateSelfHealing(Health systemHealth) {
        log.info("Initiating self-healing procedures");

        Map<String, Health> services = extractServiceHealth(systemHealth);

        for (Map.Entry<String, Health> entry : services.entrySet()) {
            String serviceName = entry.getKey();
            Health serviceHealth = entry.getValue();

            if (serviceHealth.getStatus() == Status.DOWN) {
                healService(serviceName, serviceHealth);
            }
        }
    }

    private void healService(String serviceName, Health serviceHealth) {
        log.info("Attempting to heal service: {}", serviceName);

        try {
            switch (serviceName.toLowerCase()) {
                case "database":
                    healDatabase(serviceHealth);
                    break;
                case "paymentservice":
                    healPaymentService(serviceHealth);
                    break;
                case "redis":
                    healRedis(serviceHealth);
                    break;
                default:
                    performGenericHealing(serviceName, serviceHealth);
            }

            meterRegistry.counter("self_healing.attempts",
                    Tags.of(Tag.of("service", serviceName))).increment();

        } catch (Exception e) {
            log.error("Failed to heal service: {}", serviceName, e);

            meterRegistry.counter("self_healing.failures",
                    Tags.of(Tag.of("service", serviceName))).increment();

            alertService.sendCriticalAlert(
                    "Self-healing failed for service: " + serviceName,
                    "Manual intervention required: " + e.getMessage()
            );
        }
    }

    private void healDatabase(Health serviceHealth) {
        log.info("Healing database connection issues");

        // Reset connection pool
        try {
            HikariDataSource dataSource = applicationContext.getBean(HikariDataSource.class);

            if (dataSource.isClosed()) {
                log.info("Database connection pool is closed, attempting restart");
                // This would require custom DataSource management
            } else {
                // Evict idle connections
                dataSource.getHikariPoolMXBean().softEvictConnections();
                log.info("Evicted idle database connections");
            }

        } catch (Exception e) {
            log.error("Failed to heal database", e);
            throw new SelfHealingException("Database healing failed", e);
        }
    }

    private void healPaymentService(Health serviceHealth) {
        log.info("Healing payment service");

        // Reset circuit breaker if it's been open too long
        CircuitBreaker paymentCircuitBreaker = circuitBreakerRegistry
                .circuitBreaker("paymentService");

        if (paymentCircuitBreaker.getState() == CircuitBreaker.State.OPEN) {
            // Force transition to half-open to test recovery
            paymentCircuitBreaker.transitionToHalfOpenState();
            log.info("Transitioned payment service circuit breaker to half-open");
        }

        // Clear any cached failures or error states
        // This would depend on your specific implementation
    }

    private void performCircuitBreakerSelfHealing(String circuitBreakerName) {
        log.info("Performing self-healing for circuit breaker: {}", circuitBreakerName);

        try {
            // Wait a bit before attempting healing
            Thread.sleep(5000);

            CircuitBreaker circuitBreaker = circuitBreakerRegistry.circuitBreaker(circuitBreakerName);

            // Attempt to probe the service health
            if (probeServiceHealth(circuitBreakerName)) {
                // Service seems healthy, transition to half-open
                circuitBreaker.transitionToHalfOpenState();
                log.info("Successfully transitioned {} to half-open state", circuitBreakerName);

                meterRegistry.counter("self_healing.circuit_breaker_recovered",
                        Tags.of(Tag.of("circuit_breaker", circuitBreakerName))).increment();
            } else {
                log.warn("Service {} still unhealthy, keeping circuit breaker open", circuitBreakerName);
            }

        } catch (Exception e) {
            log.error("Failed to perform circuit breaker self-healing for: {}", circuitBreakerName, e);
        }
    }

    private boolean probeServiceHealth(String serviceName) {
        try {
            switch (serviceName.toLowerCase()) {
                case "paymentservice":
                    // Perform lightweight health check
                    return performPaymentServiceHealthProbe();
                case "userservice":
                    return performUserServiceHealthProbe();
                default:
                    return false;
            }
        } catch (Exception e) {
            log.debug("Health probe failed for service: {}", serviceName, e);
            return false;
        }
    }

    private boolean performPaymentServiceHealthProbe() {
        // Implementation for payment service health probe
        // This should be a very lightweight check
        try {
            PaymentServiceClient client = applicationContext.getBean(PaymentServiceClient.class);
            CompletableFuture<HealthCheckResponse> future = client.checkHealthAsync();

            HealthCheckResponse response = future.get(2, TimeUnit.SECONDS);
            return response.isHealthy();

        } catch (Exception e) {
            return false;
        }
    }

    private void optimizeSystem(Health systemHealth) {
        log.info("Optimizing system performance");

        // Implement system optimization logic
        // - Clear caches if memory is low
        // - Adjust thread pool sizes
        // - Trigger garbage collection if needed
        // - Scale resources if using cloud deployment

        meterRegistry.counter("self_healing.optimization_attempts").increment();
    }

    @SuppressWarnings("unchecked")
    private Map<String, Health> extractServiceHealth(Health systemHealth) {
        Object details = systemHealth.getDetails().get("services");
        if (details instanceof Map) {
            return (Map<String, Health>) details;
        }
        return Collections.emptyMap();
    }
}

// Self-Healing Configuration
@Configuration
@EnableScheduling
public class SelfHealingConfiguration {

    @Bean
    @ConditionalOnProperty(name = "self-healing.enabled", havingValue = "true", matchIfMissing = true)
    public SelfHealingService selfHealingService(CircuitBreakerRegistry circuitBreakerRegistry,
                                               HealthEndpoint healthEndpoint,
                                               ServiceRegistry serviceRegistry,
                                               AlertService alertService,
                                               MeterRegistry meterRegistry) {
        return new SelfHealingService(circuitBreakerRegistry, healthEndpoint,
                                    serviceRegistry, alertService, meterRegistry);
    }

    @EventListener
    @Async
    public void handleApplicationFailedEvent(ApplicationFailedEvent event) {
        // Attempt to restart application or notify operations team
        log.error("Application failed to start", event.getException());

        AlertService alertService = event.getApplicationContext().getBean(AlertService.class);
        alertService.sendCriticalAlert("Application Failed",
                "Application failed to start: " + event.getException().getMessage());
    }
}
```

## Ellenőrző lista

- [ ] Circuit Breaker konfigurálása különböző service-ekhez
- [ ] Bulkhead pattern thread pool isolation
- [ ] Rate Limiting felhasználói és IP szinten
- [ ] Timeout és Retry mechanizmusok
- [ ] Health Check endpoint-ok minden service-hez
- [ ] Dead Letter Queue error handling
- [ ] Graceful Degradation fallback methods
- [ ] Self-Healing automatikus recovery
- [ ] Monitoring és alerting resilience events
- [ ] Load testing resilience patterns
- [ ] Documentation operational runbooks
- [ ] Chaos Engineering testing failure scenarios

## Következő lépések

- Service Mesh integration (Istio/Linkerd)
- Distributed Rate Limiting Redis-based
- Advanced Self-Healing Machine Learning
- Multi-region Disaster Recovery
- Performance optimization tuning
