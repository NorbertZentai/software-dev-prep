# Software Architecture

## Brief Summary

Software architecture defines the structural and organizational principles of systems that ensure long-term maintainability, scalability, and reliability. Modern architectures are microservice-based, use layered architecture, port-adapter patterns, and bounded context concepts. Idempotency and asynchronous messaging are fundamental principles, complemented by caching and resiliency mechanisms (retry, circuit breaker). Observability is crucial for debugging. Main pitfalls: overengineering, chatty services, and monolithic database usage.

## Concepts

### Monolith {#monolith}

<div class="concept-section definition">

📋 **Concept Definition**  
**Single deployment unit** containing all application functionality: UI, business logic, data access in one codebase. **Characteristics**: shared database, tight coupling, single process, unified deployment. **Advantages**: simpler development/testing initially, no distributed system complexity, easier debugging, transactions straightforward. **Disadvantages**: scaling entire app (not specific components), technology stack lock-in, large team coordination overhead, longer deployment cycles. Modern evolution: modular monolith (internal module boundaries, potential future microservices extraction).

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Simple start**: one application, one database, one deployment
- **Development speed**: initial development is fast, all code in one place
- **Testing simplicity**: integration and E2E tests are easier
- **Scaling limitations**: entire application must be scaled, not just bottleneck parts

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Monolithic application structure - everything in one place
@SpringBootApplication
public class MonolithicECommerceApplication {
    // All components in one application
    
    @RestController
    class OrderController {
        @GetMapping("/orders")
        public List<Order> getOrders() { /* orders logic */ }
    }
    
    @RestController  
    class ProductController {
        @GetMapping("/products")
        public List<Product> getProducts() { /* products logic */ }
    }
    
    @RestController
    class UserController {
        @GetMapping("/users")
        public List<User> getUsers() { /* users logic */ }
    }
    
    // Shared database for all functions
    @Repository
    class DatabaseRepository {
        // orders, products, users tables in same DB
        // One transaction handles everything
    }
}

// Example deployment
// 1. Build single JAR: mvn package
// 2. Deploy one file: java -jar ecommerce-app.jar
// 3. Scale entire app: run multiple instances behind load balancer

// Configuration for different environments
@Configuration
@Profile("production")
class ProductionConfig {
    @Bean
    public DataSource dataSource() {
        // Single database for entire application
        return DataSourceBuilder.create()
            .url("jdbc:postgresql://prod-db:5432/ecommerce")
            .username("app_user")
            .password("secure_password")
            .build();
    }
}

// Monolithic transaction example
@Service
@Transactional
class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private InventoryRepository inventoryRepository;
    
    public Order createOrder(CreateOrderRequest request) {
        // All operations in single transaction
        User user = userRepository.findById(request.getUserId());
        Product product = productRepository.findById(request.getProductId());
        
        // Check inventory
        if (inventoryRepository.getStock(product.getId()) < request.getQuantity()) {
            throw new InsufficientStockException();
        }
        
        // Create order
        Order order = new Order(user, product, request.getQuantity());
        orderRepository.save(order);
        
        // Update inventory
        inventoryRepository.decreaseStock(product.getId(), request.getQuantity());
        
        // Send notification (all in same app)
        notificationService.sendOrderConfirmation(user.getEmail(), order);
        
        return order;
    }
}
```
*Notice: everything is in one application, with shared database and deployment unit.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths / misconceptions</strong></summary>

<div>

- "Monolith is always bad" → Perfect choice for small teams and simple applications
- "Microservices are always better" → Comes with complexity and infrastructure overhead
- "Can't go from monolith to microservices" → Can be gradually migrated using Strangler Fig pattern

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>📚 <strong>5-minute micro-learning</strong></summary>

<div>

**Monolith advantages:**
- Simple deployment (one JAR/WAR file)
- Easy ACID transaction handling
- Performance - no network overhead
- Simpler debugging
- Lower DevOps costs

**Monolith disadvantages:**
- Scaling limitations
- Technology lock-in
- Development team conflicts
- Single point of failure
- Longer CI/CD pipelines

**When to use monolith:**
- Small development teams (< 10 people)
- Simple business domains
- Rapid prototyping
- Limited infrastructure budget
- Strong consistency requirements

**Migration strategies:**
- Strangler Fig: gradually replace parts
- Database decomposition: separate data first
- Extract services: pull out bounded contexts
- API Gateway: create service facade

</div>
</details>

</div>

<div class="concept-section interview">

<details>
<summary>💼 <strong>Interview questions</strong></summary>

<div>

**Q: When would you choose a monolith over microservices?**
> Small teams, simple domains, strong consistency needs, limited infrastructure. Start simple and evolve.

**Q: How do you scale a monolithic application?**
> Horizontal scaling with load balancers, read replicas for database, caching layers, CDN for static content.

**Q: What are the challenges of migrating from monolith to microservices?**
> Data consistency, transaction boundaries, service communication, deployment complexity, team organization.

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Microservices` · `Database Design` · `Deployment Strategies` · `Team Organization` · `System Boundaries`

</div>

### Microservices {#microservices}

<div class="concept-section definition">

📋 **Concept Definition**  
**Distributed system architecture** decomposing application into loosely coupled, independently deployable services. Each service: owns its data (database per service pattern), has bounded context (Domain-Driven Design), communicates via APIs (REST, gRPC, message queues). **Key patterns**: API Gateway (single entry point), Service Discovery (dynamic service location), Circuit Breaker (fault tolerance), Saga Pattern (distributed transactions). **Trade-offs**: increased complexity (distributed debugging, network latency), eventual consistency, DevOps overhead. Modern tools: Kubernetes orchestration, service mesh (Istio, Linkerd).

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Independent scaling**: scale only what needs scaling
- **Technology diversity**: choose best tool for each service
- **Team autonomy**: teams can work independently
- **Fault isolation**: failure in one service doesn't crash everything

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// USER SERVICE - manages user data
@SpringBootApplication
public class UserServiceApplication {
    
    @RestController
    class UserController {
        @GetMapping("/users/{id}")
        public User getUser(@PathVariable Long id) {
            return userService.findById(id);
        }
        
        @PostMapping("/users")
        public User createUser(@RequestBody CreateUserRequest request) {
            return userService.create(request);
        }
    }
    
    @Entity
    class User {
        private Long id;
        private String email;
        private String name;
        // User service owns this data
    }
}

// ORDER SERVICE - manages orders
@SpringBootApplication  
public class OrderServiceApplication {
    
    @RestController
    class OrderController {
        @PostMapping("/orders")
        public Order createOrder(@RequestBody CreateOrderRequest request) {
            // Call other services via HTTP or messaging
            User user = userServiceClient.getUser(request.getUserId());
            Product product = productServiceClient.getProduct(request.getProductId());
            
            return orderService.createOrder(user, product, request.getQuantity());
        }
    }
    
    // Service-to-service communication
    @Component
    class UserServiceClient {
        @Autowired
        private RestTemplate restTemplate;
        
        public User getUser(Long userId) {
            return restTemplate.getForObject(
                "http://user-service/users/" + userId, User.class);
        }
    }
}

// PRODUCT SERVICE - manages product catalog
@SpringBootApplication
public class ProductServiceApplication {
    
    @RestController
    class ProductController {
        @GetMapping("/products/{id}")
        public Product getProduct(@PathVariable Long id) {
            return productService.findById(id);
        }
    }
    
    // Each service has its own database
    @Configuration
    class DatabaseConfig {
        @Bean
        public DataSource dataSource() {
            return DataSourceBuilder.create()
                .url("jdbc:postgresql://product-db:5432/products")
                .build();
        }
    }
}

// API GATEWAY - single entry point
@EnableZuulProxy
@SpringBootApplication
public class ApiGatewayApplication {
    
    // Route configuration
    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("user-service", r -> r.path("/api/users/**")
                .uri("http://user-service"))
            .route("order-service", r -> r.path("/api/orders/**")
                .uri("http://order-service"))
            .route("product-service", r -> r.path("/api/products/**")
                .uri("http://product-service"))
            .build();
    }
}

// DOCKER COMPOSE - service orchestration
version: '3.8'
services:
  user-service:
    image: user-service:latest
    ports:
      - "8081:8080"
    environment:
      - DATABASE_URL=postgresql://user-db:5432/users
    depends_on:
      - user-db
      
  order-service:
    image: order-service:latest
    ports:
      - "8082:8080"
    environment:
      - USER_SERVICE_URL=http://user-service:8080
      - PRODUCT_SERVICE_URL=http://product-service:8080
      
  product-service:
    image: product-service:latest
    ports:
      - "8083:8080"
    depends_on:
      - product-db
      
  api-gateway:
    image: api-gateway:latest
    ports:
      - "8080:8080"
    depends_on:
      - user-service
      - order-service
      - product-service

  user-db:
    image: postgres:13
    environment:
      POSTGRES_DB: users
      
  product-db:
    image: postgres:13
    environment:
      POSTGRES_DB: products

// KUBERNETES DEPLOYMENT
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-service
        image: user-service:latest
        ports:
        - containerPort: 8080
        env:
        - name: DATABASE_URL
          value: postgresql://user-db:5432/users
---
apiVersion: v1
kind: Service
metadata:
  name: user-service
spec:
  selector:
    app: user-service
  ports:
  - port: 80
    targetPort: 8080
  type: ClusterIP
```
*Notice: each service has its own database, deployment, and scaling characteristics.*

</div>

<div class="concept-section pitfalls">

<details>
<summary>⚠️ <strong>Common pitfalls</strong></summary>

<div>

- **Distributed monolith**: Services too tightly coupled
- **Chatty communication**: Too many service-to-service calls
- **Data consistency issues**: ACID across services is complex
- **Operational complexity**: More moving parts to monitor

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Service Discovery` · `API Gateway` · `Circuit Breaker` · `Event-Driven Architecture` · `Container Orchestration`

</div>

### Layered Architecture {#layered-architecture}

<div class="concept-section definition">

📋 **Concept Definition**  
**Hierarchical organization** separating application into horizontal layers with strict dependencies: Presentation Layer (UI, controllers, DTOs), Business/Service Layer (domain logic, orchestration), Data Access Layer (repositories, ORM), Database Layer (persistence). **Rules**: upper layers depend on lower layers only, no circular dependencies, communication through interfaces. **Variants**: 3-tier (presentation, business, data), N-tier (additional layers like caching, integration), Hexagonal/Ports & Adapters (domain center, adapters periphery). Spring typical structure: @Controller → @Service → @Repository.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Separation of concerns**: each layer has specific responsibility
- **Maintainability**: changes in one layer don't affect others
- **Testability**: layers can be tested in isolation
- **Team organization**: different teams can work on different layers

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// PRESENTATION LAYER - handles HTTP requests
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService; // Only talks to service layer
    
    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody CreateUserRequest request) {
        try {
            User user = userService.createUser(request.getName(), request.getEmail());
            UserDto dto = UserMapper.toDto(user);
            return ResponseEntity.ok(dto);
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long id) {
        Optional<User> user = userService.findById(id);
        return user.map(u -> ResponseEntity.ok(UserMapper.toDto(u)))
                  .orElse(ResponseEntity.notFound().build());
    }
}

// SERVICE LAYER - business logic
@Service
@Transactional
public class UserService {
    
    @Autowired
    private UserRepository userRepository; // Only talks to repository layer
    
    public User createUser(String name, String email) {
        // Business validation
        if (name == null || name.trim().isEmpty()) {
            throw new InvalidUserDataException("Name cannot be empty");
        }
        
        if (!isValidEmail(email)) {
            throw new InvalidUserDataException("Invalid email format");
        }
        
        // Business rule: check for duplicates
        if (userRepository.existsByEmail(email)) {
            throw new UserAlreadyExistsException(email);
        }
        
        // Create domain object
        User user = new User(name, email);
        
        // Delegate to repository layer
        return userRepository.save(user);
    }
    
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
    
    private boolean isValidEmail(String email) {
        return email != null && email.contains("@") && email.contains(".");
    }
}

// REPOSITORY LAYER - data access
@Repository
public class UserRepository {
    
    @Autowired
    private JpaRepository<UserEntity, Long> jpaRepository; // Only talks to data layer
    
    public User save(User user) {
        UserEntity entity = UserMapper.toEntity(user);
        UserEntity savedEntity = jpaRepository.save(entity);
        return UserMapper.toDomain(savedEntity);
    }
    
    public boolean existsByEmail(String email) {
        return jpaRepository.existsByEmail(email);
    }
    
    public Optional<User> findById(Long id) {
        return jpaRepository.findById(id)
            .map(UserMapper::toDomain);
    }
}

// DATA LAYER - database entities
@Entity
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    // getters, setters, constructors
}

// JPA Repository Interface
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    boolean existsByEmail(String email);
    Optional<UserEntity> findByEmail(String email);
}

// CONFIGURATION LAYER - wiring everything together
@Configuration
@EnableJpaRepositories
public class ApplicationConfig {
    
    @Bean
    public DataSource dataSource() {
        return DataSourceBuilder.create()
            .url("jdbc:h2:mem:testdb")
            .username("sa")
            .password("")
            .build();
    }
}
```
*Notice: Each layer only depends on the layer directly below it, creating clean separation of responsibilities.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths / misconceptions</strong></summary>

<div>

- "Layers must be physical tiers" → Layers are logical, can be in same deployment
- "More layers = better architecture" → Too many layers create unnecessary complexity
- "Database layer should handle business logic" → Keep business rules in service layer

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Dependency Injection` · `Domain Modeling` · `Testing Strategies` · `Clean Architecture` · `Separation of Concerns`

</div>

### Port-Adapter (Hexagonal) {#port-adapter-hexagonal}

<div class="concept-section definition">

📋 **Concept Definition**  
**Ports and Adapters pattern** (Alistair Cockburn) isolating business logic from external dependencies. **Core concept**: domain center (business rules, entities, use cases), surrounded by ports (interfaces defining interactions), adapters (implementations for specific technologies). **Inbound ports**: API controllers, CLI, message consumers driving application. **Outbound ports**: database repositories, external APIs, message publishers. **Benefits**: technology-agnostic core, easy mocking for tests, plug-and-play adapters. Similar patterns: Clean Architecture (Uncle Bob), Onion Architecture.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Technology independence**: core logic independent of database, UI
- **Testability**: easy unit and integration tests
- **Flexibility**: external systems can be swapped without changing core logic
- **Clean architecture**: business logic at center, infrastructure at edges

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// DOMAIN CORE - Ports (Interfaces)
public interface UserRepository {
    User save(User user);
    Optional<User> findById(Long id);
    Optional<User> findByEmail(String email);
}

public interface NotificationService {
    void sendNotification(String message, String recipient);
}

public interface PaymentGateway {
    PaymentResult processPayment(PaymentRequest request);
}

// DOMAIN SERVICE (Core Logic) - only knows about ports
@Service
public class UserService {
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    
    // Dependency injection - only depends on interfaces
    public UserService(UserRepository userRepository, 
                      NotificationService notificationService) {
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }
    
    public User createUser(String name, String email) {
        // Core business logic
        if (userRepository.findByEmail(email).isPresent()) {
            throw new UserAlreadyExistsException(email);
        }
        
        // Business rules
        if (name.length() < 2) {
            throw new InvalidNameException("Name too short");
        }
        
        User user = new User(name, email);
        User savedUser = userRepository.save(user);
        
        // Business rule: send welcome notification
        notificationService.sendNotification(
            "Welcome to our platform!", email);
        
        return savedUser;
    }
    
    public User upgradeUserToPremium(Long userId, PaymentRequest payment) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new UserNotFoundException(userId));
        
        // Business logic: process payment first
        PaymentResult result = paymentGateway.processPayment(payment);
        if (!result.isSuccessful()) {
            throw new PaymentFailedException(result.getErrorMessage());
        }
        
        // Business rule: upgrade user
        user.upgradeToPremium();
        User upgradedUser = userRepository.save(user);
        
        // Business rule: send confirmation
        notificationService.sendNotification(
            "Welcome to Premium!", user.getEmail());
        
        return upgradedUser;
    }
}

// ADAPTERS - Infrastructure Implementations

// Database Adapter (Secondary/Driven)
@Repository
public class JpaUserRepository implements UserRepository {
    private final JpaUserRepositoryInterface jpaRepo;
    
    public JpaUserRepository(JpaUserRepositoryInterface jpaRepo) {
        this.jpaRepo = jpaRepo;
    }
    
    @Override
    public User save(User user) {
        UserEntity entity = UserMapper.toEntity(user);
        UserEntity savedEntity = jpaRepo.save(entity);
        return UserMapper.toDomain(savedEntity);
    }
    
    @Override
    public Optional<User> findByEmail(String email) {
        return jpaRepo.findByEmail(email)
            .map(UserMapper::toDomain);
    }
}

// Email Adapter (Secondary/Driven)
@Component
public class SmtpNotificationService implements NotificationService {
    private final JavaMailSender mailSender;
    
    @Override
    public void sendNotification(String message, String recipient) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipient);
        email.setSubject("Platform Notification");
        email.setText(message);
        mailSender.send(email);
    }
}

// Alternative SMS Adapter
@Profile("sms")
@Component
public class SmsNotificationService implements NotificationService {
    private final SmsClient smsClient;
    
    @Override
    public void sendNotification(String message, String recipient) {
        // Convert email to phone number logic
        String phoneNumber = convertEmailToPhone(recipient);
        smsClient.sendSms(phoneNumber, message);
    }
}

// Payment Gateway Adapter (Secondary/Driven)
@Component
public class StripePaymentGateway implements PaymentGateway {
    private final StripeApiClient stripeClient;
    
    @Override
    public PaymentResult processPayment(PaymentRequest request) {
        try {
            StripeChargeRequest stripeRequest = StripeMapper.toStripeRequest(request);
            StripeChargeResponse response = stripeClient.charge(stripeRequest);
            return PaymentResult.success(response.getChargeId());
        } catch (StripeException e) {
            return PaymentResult.failure(e.getMessage());
        }
    }
}

// REST Controller Adapter (Primary/Driving)
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody CreateUserRequest request) {
        try {
            User user = userService.createUser(request.getName(), request.getEmail());
            return ResponseEntity.ok(UserMapper.toDto(user));
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.badRequest().body(
                new ErrorDto("USER_EXISTS", e.getMessage()));
        }
    }
    
    @PostMapping("/{id}/upgrade")
    public ResponseEntity<UserDto> upgradeToPremium(
            @PathVariable Long id, 
            @RequestBody PaymentRequest payment) {
        try {
            User user = userService.upgradeUserToPremium(id, payment);
            return ResponseEntity.ok(UserMapper.toDto(user));
        } catch (PaymentFailedException e) {
            return ResponseEntity.badRequest().body(
                new ErrorDto("PAYMENT_FAILED", e.getMessage()));
        }
    }
}

// Message Queue Adapter (Primary/Driving)
@Component
public class UserEventHandler {
    private final UserService userService;
    
    @RabbitListener(queues = "user.registration.queue")
    public void handleUserRegistration(UserRegistrationEvent event) {
        userService.createUser(event.getName(), event.getEmail());
    }
}
```
*Notice: UserService only knows about interfaces, concrete implementations are independent.*

</div>

<div class="concept-section micro-learning">

<details>
<summary>📚 <strong>5-minute micro-learning</strong></summary>

<div>

**Hexagonal Architecture layers:**
```
Domain Core (Business Logic):
- Entities, Value Objects
- Domain Services  
- Business Rules
- Ports (Interfaces)

Application Layer:
- Use Cases
- Application Services
- Command/Query Handlers

Infrastructure (Adapters):
- Database implementations
- External API clients
- Message queue handlers
- Web controllers
```

**Testing strategy:**
```java
// Unit test - mock adapters
@Test
void shouldCreateUserWithNotification() {
    // Given
    UserRepository mockRepo = mock(UserRepository.class);
    NotificationService mockNotification = mock(NotificationService.class);
    UserService service = new UserService(mockRepo, mockNotification);
    
    // When
    service.createUser("John", "john@test.com");
    
    // Then - business logic verification
    verify(mockRepo).save(any(User.class));
    verify(mockNotification).sendNotification("Welcome!", "john@test.com");
}

// Integration test - real adapters
@SpringBootTest
@Testcontainers
class UserServiceIntegrationTest {
    @Container
    static PostgreSQLContainer postgres = new PostgreSQLContainer("postgres:13");
    
    @Test
    void shouldCreateUserWithRealDatabase() {
        // Test with real database adapter
        User user = userService.createUser("John", "john@test.com");
        assertThat(user.getId()).isNotNull();
    }
}
```

**Benefits:**
- Easy to swap implementations (database, notifications)
- Core business logic is pure and testable
- External changes don't affect business rules
- Clear boundaries between layers

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Clean Architecture` · `Dependency Inversion` · `Domain Driven Design` · `Testing Pyramid` · `Adapter Pattern`

</div>

### Event-Driven Architecture {#event-driven-architecture}

<div class="concept-section definition">

📋 **Concept Definition**  
**Asynchronous communication pattern** where services produce/consume events via message broker. **Components**: Event Producers (publish events), Event Broker/Bus (Kafka, RabbitMQ, AWS SNS/SQS), Event Consumers (subscribe and react). **Event types**: Domain Events (business facts: OrderPlaced), Integration Events (cross-service), Command Events (action requests). **Patterns**: Event Sourcing (store events as source of truth), CQRS (separate read/write models), Saga Pattern (distributed transactions via events). **Guarantees**: at-least-once, at-most-once, exactly-once delivery semantics.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Loose coupling**: services don't need to know about each other
- **Scalability**: events can be processed asynchronously
- **Resilience**: if one service is down, events wait in queue
- **Auditability**: event log provides complete system history

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// EVENT DEFINITION
public class OrderCreatedEvent {
    private final String orderId;
    private final String userId;
    private final List<OrderItem> items;
    private final BigDecimal totalAmount;
    private final Instant timestamp;
    
    public OrderCreatedEvent(String orderId, String userId, 
                           List<OrderItem> items, BigDecimal totalAmount) {
        this.orderId = orderId;
        this.userId = userId;
        this.items = items;
        this.totalAmount = totalAmount;
        this.timestamp = Instant.now();
    }
    // getters...
}

// EVENT PUBLISHER - Order Service
@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private ApplicationEventPublisher eventPublisher;
    
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    @Transactional
    public Order createOrder(CreateOrderRequest request) {
        // 1. Business logic - create order
        Order order = new Order(request.getUserId(), request.getItems());
        Order savedOrder = orderRepository.save(order);
        
        // 2. Publish domain event (local, transactional)
        OrderCreatedEvent event = new OrderCreatedEvent(
            savedOrder.getId(),
            savedOrder.getUserId(),
            savedOrder.getItems(),
            savedOrder.getTotalAmount()
        );
        
        // Local event publishing (same transaction)
        eventPublisher.publishEvent(event);
        
        // 3. Publish integration event (external systems)
        rabbitTemplate.convertAndSend(
            "order.exchange", 
            "order.created", 
            event
        );
        
        return savedOrder;
    }
}

// EVENT CONSUMER - Inventory Service
@Component
public class InventoryEventHandler {
    
    @Autowired
    private InventoryService inventoryService;
    
    @RabbitListener(queues = "inventory.order.queue")
    @Transactional
    public void handleOrderCreated(OrderCreatedEvent event) {
        log.info("Processing order {} for inventory", event.getOrderId());
        
        try {
            // Reserve stock for all items
            for (OrderItem item : event.getItems()) {
                inventoryService.reserveStock(
                    item.getProductId(), 
                    item.getQuantity()
                );
            }
            
            // Publish success event
            StockReservedEvent stockEvent = new StockReservedEvent(
                event.getOrderId(), 
                event.getItems()
            );
            
            rabbitTemplate.convertAndSend(
                "inventory.exchange",
                "stock.reserved",
                stockEvent
            );
            
        } catch (InsufficientStockException e) {
            // Publish failure event
            StockReservationFailedEvent failureEvent = 
                new StockReservationFailedEvent(
                    event.getOrderId(), 
                    e.getMessage()
                );
            
            rabbitTemplate.convertAndSend(
                "inventory.exchange",
                "stock.reservation.failed",
                failureEvent
            );
        }
    }
}

// EVENT CONSUMER - Notification Service
@Component
public class NotificationEventHandler {
    
    @Autowired
    private EmailService emailService;
    
    @Autowired
    private UserService userService;
    
    @RabbitListener(queues = "notification.order.queue")
    public void handleOrderCreated(OrderCreatedEvent event) {
        log.info("Sending notification for order {}", event.getOrderId());
        
        // Get user details
        User user = userService.findById(event.getUserId());
        
        // Send confirmation email
        emailService.sendOrderConfirmation(
            user.getEmail(),
            event.getOrderId(),
            event.getItems(),
            event.getTotalAmount()
        );
    }
    
    @RabbitListener(queues = "notification.inventory.queue")
    public void handleStockReservationFailed(StockReservationFailedEvent event) {
        // Notify user about stock issues
        User user = getUserByOrderId(event.getOrderId());
        emailService.sendStockUnavailableNotification(
            user.getEmail(),
            event.getOrderId(),
            event.getReason()
        );
    }
}

// EVENT CONSUMER - Payment Service
@Component
public class PaymentEventHandler {
    
    @Autowired
    private PaymentService paymentService;
    
    @RabbitListener(queues = "payment.inventory.queue")
    public void handleStockReserved(StockReservedEvent event) {
        log.info("Processing payment for order {}", event.getOrderId());
        
        try {
            // Process payment now that stock is reserved
            PaymentResult result = paymentService.processPayment(
                event.getOrderId()
            );
            
            if (result.isSuccessful()) {
                PaymentProcessedEvent paymentEvent = 
                    new PaymentProcessedEvent(
                        event.getOrderId(),
                        result.getTransactionId(),
                        result.getAmount()
                    );
                
                rabbitTemplate.convertAndSend(
                    "payment.exchange",
                    "payment.processed",
                    paymentEvent
                );
            }
            
        } catch (PaymentException e) {
            // Publish payment failure - will trigger stock release
            PaymentFailedEvent failureEvent = 
                new PaymentFailedEvent(event.getOrderId(), e.getMessage());
            
            rabbitTemplate.convertAndSend(
                "payment.exchange",
                "payment.failed",
                failureEvent
            );
        }
    }
}

// CONFIGURATION - RabbitMQ Setup
@Configuration
@EnableRabbit
public class RabbitConfig {
    
    // Order exchange and queues
    @Bean
    public TopicExchange orderExchange() {
        return new TopicExchange("order.exchange");
    }
    
    @Bean
    public Queue inventoryOrderQueue() {
        return QueueBuilder.durable("inventory.order.queue").build();
    }
    
    @Bean
    public Queue notificationOrderQueue() {
        return QueueBuilder.durable("notification.order.queue").build();
    }
    
    @Bean
    public Binding inventoryOrderBinding() {
        return BindingBuilder
            .bind(inventoryOrderQueue())
            .to(orderExchange())
            .with("order.created");
    }
    
    @Bean
    public Binding notificationOrderBinding() {
        return BindingBuilder
            .bind(notificationOrderQueue())
            .to(orderExchange())
            .with("order.created");
    }
    
    // Error handling
    @Bean
    public RabbitListenerErrorHandler rabbitErrorHandler() {
        return new RabbitListenerErrorHandler() {
            @Override
            public Object handleError(Message amqpMessage, 
                                    org.springframework.messaging.Message<?> message,
                                    ListenerExecutionFailedException exception) {
                log.error("Error processing message: {}", exception.getMessage());
                
                // Send to dead letter queue for manual investigation
                return null;
            }
        };
    }
}

// EVENT SOURCING EXAMPLE
@Entity
public class EventStore {
    @Id
    private String eventId;
    private String aggregateId;
    private String eventType;
    private String eventData;
    private Instant timestamp;
    private Long version;
    
    // Event sourcing: rebuild state from events
    public static Order rebuildOrderFromEvents(List<EventStore> events) {
        Order order = null;
        
        for (EventStore event : events) {
            switch (event.getEventType()) {
                case "OrderCreated":
                    OrderCreatedEvent created = deserialize(event.getEventData());
                    order = new Order(created);
                    break;
                case "PaymentProcessed":
                    PaymentProcessedEvent payment = deserialize(event.getEventData());
                    order.markAsPaid(payment.getTransactionId());
                    break;
                case "OrderShipped":
                    OrderShippedEvent shipped = deserialize(event.getEventData());
                    order.markAsShipped(shipped.getTrackingNumber());
                    break;
            }
        }
        
        return order;
    }
}

// SAGA PATTERN - Distributed Transaction
@Component
public class OrderProcessingSaga {
    
    @SagaOrchestrationStart
    public void processOrder(OrderCreatedEvent event) {
        // Step 1: Reserve inventory
        sagaManager.callAsync(InventoryService.class)
            .reserveStock(event.getOrderId(), event.getItems())
            .compensatedBy(InventoryService.class)
            .releaseStock(event.getOrderId());
    }
    
    @SagaOrchestrationContinue
    public void handleStockReserved(StockReservedEvent event) {
        // Step 2: Process payment
        sagaManager.callAsync(PaymentService.class)
            .processPayment(event.getOrderId())
            .compensatedBy(PaymentService.class)
            .refundPayment(event.getOrderId());
    }
    
    @SagaOrchestrationContinue  
    public void handlePaymentProcessed(PaymentProcessedEvent event) {
        // Step 3: Ship order
        sagaManager.callAsync(ShippingService.class)
            .shipOrder(event.getOrderId());
    }
}
```
*Notice: Services communicate through events, not direct calls, creating loose coupling and better resilience.*

</div>

<div class="concept-section pitfalls">

<details>
<summary>⚠️ <strong>Common pitfalls</strong></summary>

<div>

- **Event versioning**: Old consumers can't handle new event formats
- **Duplicate processing**: Events might be delivered multiple times
- **Ordering issues**: Events might arrive out of order
- **Debugging complexity**: Hard to trace flows across services

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Message Queues` · `SAGA Pattern` · `Event Sourcing` · `CQRS` · `Distributed Systems` · `Eventual Consistency`

</div>

### Idempotency {#idempotency}

<div class="concept-section definition">

📋 **Concept Definition**  
**Property ensuring repeated identical requests produce same result** without additional side effects. **Implementation strategies**: Idempotency Key (unique request identifier, stored with result), Natural Idempotency (GET, PUT by design), Database Constraints (unique indexes prevent duplicates), Token-based (consume-once tokens). **HTTP methods**: GET, PUT, DELETE naturally idempotent; POST not idempotent (requires idempotency key). **Distributed systems**: critical for retry mechanisms, message delivery guarantees. Modern APIs: Stripe, PayPal mandate idempotency keys for payment operations. Window: typically 24h key validity.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Reliable operations**: safe to retry failed requests
- **Distributed systems**: handles network failures gracefully
- **User experience**: prevents duplicate charges, orders
- **System consistency**: same input always produces same result

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// IDEMPOTENT PAYMENT SERVICE
@RestController
public class PaymentController {
    
    @Autowired
    private PaymentService paymentService;
    
    @PostMapping("/payments")
    public ResponseEntity<PaymentResponse> processPayment(
            @RequestBody PaymentRequest request,
            @RequestHeader("Idempotency-Key") String idempotencyKey) {
        
        // Check if payment already processed
        Optional<Payment> existingPayment = 
            paymentService.findByIdempotencyKey(idempotencyKey);
        
        if (existingPayment.isPresent()) {
            // Return previous result - idempotent behavior
            return ResponseEntity.ok(
                PaymentResponse.fromPayment(existingPayment.get())
            );
        }
        
        // Process new payment
        Payment payment = paymentService.processPayment(request, idempotencyKey);
        return ResponseEntity.ok(PaymentResponse.fromPayment(payment));
    }
}

@Service
public class PaymentService {
    
    @Autowired
    private PaymentRepository paymentRepository;
    
    @Transactional
    public Payment processPayment(PaymentRequest request, String idempotencyKey) {
        // Double-check with database lock
        Optional<Payment> existing = paymentRepository
            .findByIdempotencyKeyForUpdate(idempotencyKey);
        
        if (existing.isPresent()) {
            return existing.get(); // Already processed
        }
        
        // Validate payment request
        validatePaymentRequest(request);
        
        // Process with external payment gateway
        PaymentGatewayResponse response = paymentGateway.charge(
            request.getAmount(),
            request.getCreditCard()
        );
        
        // Store result with idempotency key
        Payment payment = new Payment(
            request.getAmount(),
            request.getCurrency(),
            response.getTransactionId(),
            idempotencyKey,
            PaymentStatus.COMPLETED
        );
        
        return paymentRepository.save(payment);
    }
}

// DATABASE SCHEMA for idempotency
@Entity
@Table(name = "payments")
public class Payment {
    @Id
    private String id;
    
    @Column(name = "idempotency_key", unique = true, nullable = false)
    private String idempotencyKey;
    
    private BigDecimal amount;
    private String currency;
    private String transactionId;
    
    @Enumerated(EnumType.STRING)
    private PaymentStatus status;
    
    @CreationTimestamp
    private Instant createdAt;
}

-- Database constraint for idempotency
CREATE UNIQUE INDEX idx_payments_idempotency 
ON payments(idempotency_key);

// IDEMPOTENT ORDER CREATION
@Service
public class OrderService {
    
    @Transactional
    public Order createOrder(CreateOrderRequest request, String idempotencyKey) {
        // Check for existing order
        Optional<Order> existingOrder = 
            orderRepository.findByIdempotencyKey(idempotencyKey);
        
        if (existingOrder.isPresent()) {
            return existingOrder.get();
        }
        
        // Create new order
        Order order = new Order(
            request.getUserId(),
            request.getItems(),
            idempotencyKey
        );
        
        Order savedOrder = orderRepository.save(order);
        
        // Publish event (also idempotent)
        eventPublisher.publishEvent(
            new OrderCreatedEvent(savedOrder.getId(), idempotencyKey)
        );
        
        return savedOrder;
    }
}

// HTTP METHODS and idempotency
/**
 * GET     - ✅ Idempotent (no side effects)
 * PUT     - ✅ Idempotent (replace entire resource)
 * DELETE  - ✅ Idempotent (same end state)
 * POST    - ❌ Generally not idempotent
 * PATCH   - ❌ Generally not idempotent
 */

// Making POST idempotent
@PostMapping("/users")
public ResponseEntity<User> createUser(
        @RequestBody CreateUserRequest request,
        @RequestHeader("Idempotency-Key") String idempotencyKey) {
    
    User user = userService.createUser(request, idempotencyKey);
    
    if (user.getCreatedAt().isBefore(Instant.now().minusSeconds(1))) {
        // User was created previously - return existing
        return ResponseEntity.ok(user);
    } else {
        // User was just created
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
}

// IDEMPOTENCY with MESSAGE QUEUES
@Component
public class IdempotentMessageProcessor {
    
    @Autowired
    private ProcessedMessageRepository processedMessageRepo;
    
    @RabbitListener(queues = "order.processing.queue")
    public void processOrderMessage(OrderMessage message) {
        String messageId = message.getMessageId();
        
        // Check if already processed
        if (processedMessageRepo.existsByMessageId(messageId)) {
            log.info("Message {} already processed, skipping", messageId);
            return;
        }
        
        try {
            // Process the message
            processOrder(message.getOrderId());
            
            // Mark as processed
            processedMessageRepo.save(
                new ProcessedMessage(messageId, Instant.now())
            );
            
        } catch (Exception e) {
            // Don't mark as processed if failed
            log.error("Failed to process message {}", messageId, e);
            throw e;
        }
    }
}

// CLEANUP of old idempotency records
@Component
@Scheduled(fixedRate = 3600000) // Every hour
public class IdempotencyCleanupJob {
    
    @Autowired
    private PaymentRepository paymentRepository;
    
    public void cleanupOldIdempotencyRecords() {
        // Remove idempotency records older than 24 hours
        Instant cutoff = Instant.now().minus(24, ChronoUnit.HOURS);
        
        int deleted = paymentRepository.deleteByCreatedAtBefore(cutoff);
        log.info("Cleaned up {} old idempotency records", deleted);
    }
}

// CLIENT-SIDE idempotency key generation
@Component
public class IdempotencyKeyGenerator {
    
    public static String generateKey() {
        return UUID.randomUUID().toString();
    }
    
    public static String generateKey(String userId, String operation) {
        // Deterministic key for specific user operation
        return DigestUtils.sha256Hex(userId + ":" + operation + ":" + 
            LocalDate.now().toString());
    }
}

// Usage in client
public class PaymentClient {
    
    public PaymentResponse makePayment(PaymentRequest request) {
        String idempotencyKey = IdempotencyKeyGenerator.generateKey();
        
        return restTemplate.exchange(
            "/payments",
            HttpMethod.POST,
            new HttpEntity<>(request, 
                Map.of("Idempotency-Key", idempotencyKey)),
            PaymentResponse.class
        ).getBody();
    }
}
```
*Notice: Idempotency requires unique keys and careful state management to ensure same results for repeated operations.*

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>Idempotency best practices</strong></summary>

<div>

- **Use UUIDs**: for idempotency keys to avoid collisions
- **Set TTL**: clean up old idempotency records periodically  
- **Database constraints**: use unique indexes to prevent duplicates
- **Return 409 Conflict**: for race conditions during processing
- **Client responsibility**: client should generate and manage keys

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Distributed Systems` · `Retry Mechanisms` · `API Design` · `Database Constraints` · `System Reliability`

</div>

### Caching {#caching}

<div class="concept-section definition">

📋 **Concept Definition**  
**Temporary data storage layer** reducing expensive operations (database queries, API calls, computations). **Cache levels**: Client-side (browser cache, LocalStorage), CDN (CloudFlare, Akamai for static assets), Application (Redis, Memcached in-memory), Database (query cache, materialized views). **Strategies**: Cache-Aside (lazy loading), Write-Through (update cache on write), Write-Behind (async write), Read-Through (cache loads on miss). **Eviction policies**: LRU (Least Recently Used), LFU (Least Frequently Used), TTL (Time To Live). **Patterns**: Cache warming, cache stampede prevention, distributed caching.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Performance**: dramatically reduces response times
- **Scalability**: reduces load on databases and external services
- **Cost efficiency**: fewer expensive operations
- **User experience**: faster page loads and interactions

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// BASIC CACHING with Spring
@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private RedisTemplate<String, Product> redisTemplate;
    
    // Manual cache management
    public Product getProductById(Long id) {
        // 1. Try cache first
        String cacheKey = "product:" + id;
        Product cachedProduct = redisTemplate.opsForValue().get(cacheKey);
        
        if (cachedProduct != null) {
            log.info("Cache HIT for product {}", id);
            return cachedProduct;
        }
        
        // 2. Cache miss - fetch from database
        log.info("Cache MISS for product {}", id);
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new ProductNotFoundException(id));
        
        // 3. Store in cache with TTL (1 hour)
        redisTemplate.opsForValue().set(
            cacheKey, 
            product, 
            Duration.ofHours(1)
        );
        
        return product;
    }
    
    // Spring Cache annotations approach
    @Cacheable(value = "products", key = "#id")
    public Product getProductByIdCached(Long id) {
        log.info("Fetching product {} from database", id);
        return productRepository.findById(id)
            .orElseThrow(() -> new ProductNotFoundException(id));
    }
    
    @CacheEvict(value = "products", key = "#product.id")
    public Product updateProduct(Product product) {
        log.info("Updating and evicting cache for product {}", product.getId());
        return productRepository.save(product);
    }
    
    @CacheEvict(value = "products", allEntries = true)
    public void clearAllProductCache() {
        log.info("Clearing entire product cache");
    }
    
    // Cache multiple products
    @Cacheable(value = "product-lists", key = "#category + '_' + #page + '_' + #size")
    public List<Product> getProductsByCategory(String category, int page, int size) {
        return productRepository.findByCategory(category, 
            PageRequest.of(page, size)).getContent();
    }
}

// MULTI-LEVEL CACHING
@Service
public class MultiLevelCacheService {
    
    // L1 Cache - In-memory (fastest)
    private final Map<String, Object> l1Cache = new ConcurrentHashMap<>();
    
    // L2 Cache - Redis (fast)
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    
    // L3 Cache - Database (slowest)
    @Autowired
    private DatabaseService databaseService;
    
    public Product getProduct(Long id) {
        String key = "product:" + id;
        
        // L1 Cache check
        Product product = (Product) l1Cache.get(key);
        if (product != null) {
            log.info("L1 Cache HIT for {}", key);
            return product;
        }
        
        // L2 Cache check
        product = (Product) redisTemplate.opsForValue().get(key);
        if (product != null) {
            log.info("L2 Cache HIT for {}", key);
            // Populate L1 cache
            l1Cache.put(key, product);
            return product;
        }
        
        // L3 - Database
        log.info("Cache MISS - fetching from database for {}", key);
        product = databaseService.getProduct(id);
        
        // Populate all cache levels
        redisTemplate.opsForValue().set(key, product, Duration.ofHours(1));
        l1Cache.put(key, product);
        
        return product;
    }
}

// CACHE PATTERNS

// 1. CACHE-ASIDE (Lazy Loading)
@Service
public class CacheAsideService {
    
    public User getUser(Long id) {
        // Application manages cache
        User user = cache.get("user:" + id);
        if (user == null) {
            user = database.getUser(id);
            cache.put("user:" + id, user, Duration.ofMinutes(30));
        }
        return user;
    }
    
    public void updateUser(User user) {
        database.updateUser(user);
        cache.evict("user:" + user.getId()); // Invalidate cache
    }
}

// 2. WRITE-THROUGH
@Service
public class WriteThroughService {
    
    public void updateUser(User user) {
        // Write to database first
        database.updateUser(user);
        // Then update cache
        cache.put("user:" + user.getId(), user);
    }
}

// 3. WRITE-BEHIND (Write-Back)
@Service
public class WriteBehindService {
    
    private final Queue<User> writeQueue = new ConcurrentLinkedQueue<>();
    
    public void updateUser(User user) {
        // Update cache immediately
        cache.put("user:" + user.getId(), user);
        // Queue for background database write
        writeQueue.offer(user);
    }
    
    @Scheduled(fixedDelay = 5000)
    public void flushToDatabase() {
        User user;
        while ((user = writeQueue.poll()) != null) {
            database.updateUser(user);
        }
    }
}

// CACHE CONFIGURATION
@Configuration
@EnableCaching
public class CacheConfig {
    
    @Bean
    public CacheManager cacheManager() {
        RedisCacheManager.Builder builder = RedisCacheManager
            .RedisCacheManagerBuilder
            .fromConnectionFactory(redisConnectionFactory())
            .cacheDefaults(cacheConfiguration());
        
        return builder.build();
    }
    
    private RedisCacheConfiguration cacheConfiguration() {
        return RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofHours(1))
            .disableCachingNullValues()
            .serializeKeysWith(RedisSerializationContext.SerializationPair
                .fromSerializer(new StringRedisSerializer()))
            .serializeValuesWith(RedisSerializationContext.SerializationPair
                .fromSerializer(new GenericJackson2JsonRedisSerializer()));
    }
    
    // Multiple cache configurations
    @Bean
    public CacheManager multipleCacheManager() {
        Map<String, RedisCacheConfiguration> cacheConfigurations = Map.of(
            "products", RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofHours(2)),
            "users", RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(30)),
            "sessions", RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(15))
        );
        
        return RedisCacheManager.builder(redisConnectionFactory())
            .withInitialCacheConfigurations(cacheConfigurations)
            .build();
    }
}

// CACHE WARMING
@Component
public class CacheWarmupService {
    
    @Autowired
    private ProductService productService;
    
    @EventListener(ApplicationReadyEvent.class)
    public void warmupCache() {
        log.info("Starting cache warmup...");
        
        // Preload popular products
        List<Long> popularProductIds = getPopularProductIds();
        for (Long productId : popularProductIds) {
            productService.getProductByIdCached(productId);
        }
        
        log.info("Cache warmup completed for {} products", popularProductIds.size());
    }
    
    @Scheduled(cron = "0 0 2 * * ?") // Daily at 2 AM
    public void dailyCacheRefresh() {
        log.info("Starting daily cache refresh...");
        
        // Refresh cache with latest data
        productService.clearAllProductCache();
        warmupCache();
    }
}

// CACHE MONITORING
@Component
public class CacheMetrics {
    
    @Autowired
    private CacheManager cacheManager;
    
    @Scheduled(fixedRate = 60000) // Every minute
    public void logCacheStats() {
        for (String cacheName : cacheManager.getCacheNames()) {
            Cache cache = cacheManager.getCache(cacheName);
            if (cache instanceof RedisCache) {
                // Log cache statistics
                log.info("Cache {}: {} items", cacheName, getCacheSize(cache));
            }
        }
    }
    
    @EventListener
    public void handleCacheEvent(CacheEvictEvent event) {
        log.info("Cache eviction: {} - Key: {}", 
            event.getCacheName(), event.getKey());
    }
}

// DISTRIBUTED CACHE INVALIDATION
@Component
public class CacheInvalidationService {
    
    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    
    // Publish cache invalidation event
    public void invalidateProductCache(Long productId) {
        String message = "product:" + productId;
        redisTemplate.convertAndSend("cache-invalidation", message);
    }
    
    // Listen for cache invalidation events
    @RedisListener(topic = "cache-invalidation")
    public void handleCacheInvalidation(String message) {
        log.info("Received cache invalidation for: {}", message);
        
        // Remove from local cache
        Cache cache = cacheManager.getCache("products");
        if (cache != null) {
            cache.evict(message);
        }
    }
}

// HTTP CACHING
@RestController
public class ProductController {
    
    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        Product product = productService.getProduct(id);
        
        return ResponseEntity.ok()
            .cacheControl(CacheControl.maxAge(Duration.ofHours(1)))
            .eTag(String.valueOf(product.getVersion()))
            .body(product);
    }
    
    @GetMapping("/products/{id}/with-etag")
    public ResponseEntity<Product> getProductWithETag(
            @PathVariable Long id,
            HttpServletRequest request) {
        
        Product product = productService.getProduct(id);
        String etag = String.valueOf(product.getVersion());
        
        // Check if client has current version
        String clientETag = request.getHeader("If-None-Match");
        if (etag.equals(clientETag)) {
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
        }
        
        return ResponseEntity.ok()
            .eTag(etag)
            .body(product);
    }
}
```
*Notice: Caching significantly reduces database load and improves response times, but requires careful invalidation strategies.*

</div>

<div class="concept-section pitfalls">

<details>
<summary>⚠️ <strong>Caching pitfalls</strong></summary>

<div>

- **Cache invalidation**: Hardest problem in computer science
- **Stale data**: Serving outdated information to users
- **Cache stampede**: Multiple requests fetch same data simultaneously
- **Memory leaks**: Cache growing indefinitely without proper TTL

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Performance Optimization` · `Scalability` · `Database Design` · `Memory Management` · `CDN`

</div>

### Resiliency (Fault Tolerance) {#resiliency}

<div class="concept-section definition">

📋 **Concept Definition**  
**System's ability to handle and recover from failures** maintaining acceptable service levels. **Key patterns**: Circuit Breaker (prevent cascading failures, open/closed/half-open states), Retry with Backoff (exponential backoff, jitter), Bulkhead (isolate resources, prevent resource exhaustion), Timeout (fail fast), Fallback (degraded functionality). **Resilience4j library** (Java): CircuitBreaker, RateLimiter, Retry, TimeLimiter, Bulkhead modules. **Chaos Engineering**: intentionally inject failures (Netflix Chaos Monkey) to test resilience. **Metrics**: MTBF (Mean Time Between Failures), MTTR (Mean Time To Recovery).

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **System availability**: keep running despite failures
- **Graceful degradation**: partial functionality instead of total failure
- **Recovery capability**: automatic healing from transient issues
- **User experience**: minimal impact during problems

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// RETRY PATTERN with exponential backoff
@Service
public class ExternalApiService {
    
    private final RestTemplate restTemplate;
    private final RetryTemplate retryTemplate;
    
    public ExternalApiService() {
        this.retryTemplate = RetryTemplate.builder()
            .maxAttempts(3)
            .exponentialBackoff(1000, 2, 10000)
            .retryOn(RestClientException.class)
            .build();
    }
    
    @Retryable(
        value = {Exception.class}, 
        maxAttempts = 3, 
        backoff = @Backoff(delay = 1000, multiplier = 2)
    )
    public ApiResponse callExternalService(String request) {
        log.info("Calling external service with request: {}", request);
        
        try {
            return restTemplate.postForObject(
                "/external-api", 
                request, 
                ApiResponse.class
            );
        } catch (Exception e) {
            log.warn("External service call failed: {}", e.getMessage());
            throw e; // Will trigger retry
        }
    }
    
    @Recover
    public ApiResponse recoverFromFailure(Exception ex, String request) {
        log.error("All retry attempts failed for request: {}", request, ex);
        
        // Return fallback response
        return new ApiResponse(
            "Service temporarily unavailable", 
            "FALLBACK"
        );
    }
    
    // Manual retry with custom logic
    public ApiResponse callWithCustomRetry(String request) {
        return retryTemplate.execute(context -> {
            log.info("Attempt {} for request: {}", 
                context.getRetryCount() + 1, request);
            
            return restTemplate.postForObject(
                "/external-api", 
                request, 
                ApiResponse.class
            );
        }, context -> {
            // Recovery callback
            log.error("All {} attempts failed", context.getRetryCount());
            return new ApiResponse("Service unavailable", "ERROR");
        });
    }
}

// CIRCUIT BREAKER PATTERN
@Component
public class CircuitBreakerService {
    
    private final CircuitBreaker circuitBreaker;
    private final ExternalApiClient externalApiClient;
    
    public CircuitBreakerService(ExternalApiClient externalApiClient) {
        this.externalApiClient = externalApiClient;
        
        // Configure circuit breaker
        this.circuitBreaker = CircuitBreaker.ofDefaults("externalService");
        
        // Configure thresholds
        circuitBreaker.getCircuitBreakerConfig()
            .failureRateThreshold(50)        // 50% failure rate
            .waitDurationInOpenState(Duration.ofSeconds(30))  // Wait 30s before retry
            .slidingWindowSize(10)           // Consider last 10 calls
            .minimumNumberOfCalls(5);        // Need at least 5 calls
        
        // Event listeners
        circuitBreaker.getEventPublisher()
            .onStateTransition(event -> 
                log.info("Circuit breaker state transition: {} -> {}", 
                    event.getStateTransition().getFromState(),
                    event.getStateTransition().getToState()));
        
        circuitBreaker.getEventPublisher()
            .onCallNotPermitted(event ->
                log.warn("Circuit breaker call not permitted"));
    }
    
    public String callServiceWithCircuitBreaker() {
        return circuitBreaker.executeSupplier(() -> {
            log.info("Calling external service through circuit breaker");
            return externalApiClient.getData();
        });
    }
    
    // With fallback
    public String callServiceWithFallback() {
        try {
            return circuitBreaker.executeSupplier(() -> 
                externalApiClient.getData()
            );
        } catch (CallNotPermittedException e) {
            log.warn("Circuit breaker open, using fallback");
            return getFallbackData();
        } catch (Exception e) {
            log.error("Service call failed", e);
            return getFallbackData();
        }
    }
    
    private String getFallbackData() {
        return "Cached or default data";
    }
}

// BULKHEAD PATTERN - Resource Isolation
@Configuration
public class ExecutorConfig {
    
    // Separate thread pools for different services
    @Bean("userServiceExecutor")
    public Executor userServiceExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(10);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("user-service-");
        executor.setRejectedExecutionHandler(
            new ThreadPoolExecutor.CallerRunsPolicy()
        );
        executor.initialize();
        return executor;
    }
    
    @Bean("orderServiceExecutor") 
    public Executor orderServiceExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);
        executor.setMaxPoolSize(20);
        executor.setQueueCapacity(200);
        executor.setThreadNamePrefix("order-service-");
        executor.initialize();
        return executor;
    }
    
    @Bean("paymentServiceExecutor")
    public Executor paymentServiceExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(3);
        executor.setMaxPoolSize(5);
        executor.setQueueCapacity(50);
        executor.setThreadNamePrefix("payment-service-");
        executor.initialize();
        return executor;
    }
}

@Service
public class BulkheadService {
    
    @Async("userServiceExecutor")
    public CompletableFuture<User> getUserAsync(Long id) {
        // User operations isolated in their own thread pool
        return CompletableFuture.completedFuture(userService.getUser(id));
    }
    
    @Async("orderServiceExecutor")
    public CompletableFuture<Order> processOrderAsync(OrderRequest request) {
        // Order operations won't be blocked by user service issues
        return CompletableFuture.completedFuture(orderService.createOrder(request));
    }
}

// TIMEOUT PATTERN
@Service
public class TimeoutService {
    
    private final RestTemplate restTemplate;
    
    public TimeoutService() {
        // Configure timeouts
        HttpComponentsClientHttpRequestFactory factory = 
            new HttpComponentsClientHttpRequestFactory();
        factory.setConnectTimeout(5000);      // 5 seconds connection timeout
        factory.setReadTimeout(10000);        // 10 seconds read timeout
        
        this.restTemplate = new RestTemplate(factory);
    }
    
    @Async
    public CompletableFuture<String> callWithTimeout(String url) {
        try {
            // This will timeout if service doesn't respond within configured time
            String response = restTemplate.getForObject(url, String.class);
            return CompletableFuture.completedFuture(response);
        } catch (Exception e) {
            log.error("Service call timed out or failed", e);
            throw new ServiceUnavailableException("External service timeout");
        }
    }
    
    // Manual timeout with CompletableFuture
    public String callWithManualTimeout(String url, Duration timeout) {
        try {
            CompletableFuture<String> future = CompletableFuture.supplyAsync(() ->
                restTemplate.getForObject(url, String.class)
            );
            
            return future.get(timeout.toMillis(), TimeUnit.MILLISECONDS);
            
        } catch (TimeoutException e) {
            log.error("Service call timed out after {}", timeout);
            throw new ServiceTimeoutException("Operation timed out");
        } catch (Exception e) {
            log.error("Service call failed", e);
            throw new ServiceException("Service call failed");
        }
    }
}

// HEALTH CHECKS and SERVICE DISCOVERY
@Component
public class HealthCheckService {
    
    @Autowired
    private List<ExternalService> externalServices;
    
    @Scheduled(fixedRate = 30000) // Every 30 seconds
    public void performHealthChecks() {
        for (ExternalService service : externalServices) {
            try {
                boolean healthy = service.healthCheck();
                if (!healthy) {
                    log.warn("Service {} is unhealthy", service.getName());
                    // Mark service as down in service registry
                    serviceRegistry.markAsDown(service.getName());
                }
            } catch (Exception e) {
                log.error("Health check failed for {}", service.getName(), e);
                serviceRegistry.markAsDown(service.getName());
            }
        }
    }
}

// GRACEFUL DEGRADATION
@Service
public class ProductRecommendationService {
    
    @Autowired
    private MLService mlService;
    
    @Autowired
    private CacheService cacheService;
    
    public List<Product> getRecommendations(Long userId) {
        try {
            // Try ML-based recommendations first
            return mlService.getPersonalizedRecommendations(userId);
            
        } catch (Exception e) {
            log.warn("ML service unavailable, falling back to popular products", e);
            
            try {
                // Fallback to cached popular products
                return cacheService.getPopularProducts();
                
            } catch (Exception cacheError) {
                log.error("Cache also unavailable, using static fallback", cacheError);
                
                // Last resort: static recommendations
                return getStaticRecommendations();
            }
        }
    }
    
    private List<Product> getStaticRecommendations() {
        // Return hardcoded safe recommendations
        return Arrays.asList(
            new Product(1L, "Featured Product 1"),
            new Product(2L, "Featured Product 2")
        );
    }
}

// COMPREHENSIVE RESILIENCE SERVICE
@Service
public class ResilientOrderService {
    
    private final CircuitBreaker inventoryCircuitBreaker;
    private final CircuitBreaker paymentCircuitBreaker;
    private final RetryTemplate retryTemplate;
    
    public ResilientOrderService() {
        // Configure circuit breakers for different services
        this.inventoryCircuitBreaker = CircuitBreaker.ofDefaults("inventory");
        this.paymentCircuitBreaker = CircuitBreaker.ofDefaults("payment");
        
        this.retryTemplate = RetryTemplate.builder()
            .maxAttempts(3)
            .exponentialBackoff(1000, 2, 10000)
            .build();
    }
    
    public Order createOrderWithResilience(CreateOrderRequest request) {
        try {
            // Step 1: Check inventory with circuit breaker
            boolean stockAvailable = inventoryCircuitBreaker.executeSupplier(() ->
                inventoryService.checkStock(request.getItems())
            );
            
            if (!stockAvailable) {
                throw new InsufficientStockException("Not enough stock");
            }
            
            // Step 2: Process payment with retry and circuit breaker
            PaymentResult paymentResult = retryTemplate.execute(context -> 
                paymentCircuitBreaker.executeSupplier(() ->
                    paymentService.processPayment(request.getPayment())
                )
            );
            
            if (!paymentResult.isSuccessful()) {
                throw new PaymentFailedException("Payment processing failed");
            }
            
            // Step 3: Create order
            Order order = new Order(request);
            return orderRepository.save(order);
            
        } catch (Exception e) {
            log.error("Order creation failed", e);
            
            // Compensating actions
            if (inventoryWasReserved) {
                inventoryService.releaseReservation(request.getItems());
            }
            
            throw new OrderCreationException("Unable to create order", e);
        }
    }
}
```
*Notice: Resiliency patterns work together to create robust systems that gracefully handle failures.*

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>Resiliency best practices</strong></summary>

<div>

- **Fail fast**: Don't wait for timeouts, detect failures quickly
- **Circuit breaker thresholds**: Tune based on actual service behavior
- **Graceful degradation**: Provide reduced functionality instead of total failure
- **Monitoring**: Track failure rates, response times, circuit breaker states
- **Testing**: Regularly test failure scenarios (chaos engineering)

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Distributed Systems` · `Monitoring` · `Load Balancing` · `Service Discovery` · `Chaos Engineering`

</div>

### Observability {#observability}

<div class="concept-section definition">

📋 **Concept Definition**  
**Three pillars of system visibility**: Logs (discrete events, structured JSON logs, correlation IDs), Metrics (numerical measurements, time-series data, Prometheus/Grafana), Traces (request journey across services, OpenTelemetry, Jaeger/Zipkin). **Key concepts**: Distributed Tracing (span, trace context propagation), APM (Application Performance Monitoring), SLI/SLO/SLA (Service Level Indicators/Objectives/Agreements). **Tools stack**: ELK/EFK (Elasticsearch, Logstash/Fluentd, Kibana), Prometheus + Grafana, Jaeger/Tempo. **Modern approach**: OpenTelemetry standard (vendor-neutral instrumentation).

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Problem detection**: find issues before users do
- **Root cause analysis**: quickly identify why systems fail
- **Performance optimization**: understand bottlenecks and patterns
- **System understanding**: know how complex distributed systems behave

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// LOGGING - Structured and contextual
@RestController
public class OrderController {
    
    private static final Logger log = LoggerFactory.getLogger(OrderController.class);
    
    @PostMapping("/orders")
    public ResponseEntity<Order> createOrder(@RequestBody CreateOrderRequest request) {
        String correlationId = UUID.randomUUID().toString();
        
        // Structured logging with correlation ID
        try (MDCCloseable mdcCloseable = MDC.putCloseable("correlationId", correlationId)) {
            log.info("Creating order for user {} with {} items", 
                request.getUserId(), request.getItems().size());
            
            Order order = orderService.createOrder(request);
            
            log.info("Order created successfully with ID {}", order.getId());
            return ResponseEntity.ok(order);
            
        } catch (InsufficientStockException e) {
            log.warn("Order creation failed due to insufficient stock for user {}", 
                request.getUserId(), e);
            return ResponseEntity.badRequest().build();
            
        } catch (Exception e) {
            log.error("Unexpected error creating order for user {}", 
                request.getUserId(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

// Service layer with detailed logging
@Service
public class OrderService {
    
    private static final Logger log = LoggerFactory.getLogger(OrderService.class);
    
    @Autowired
    private InventoryService inventoryService;
    
    @Autowired
    private PaymentService paymentService;
    
    public Order createOrder(CreateOrderRequest request) {
        String orderId = UUID.randomUUID().toString();
        
        log.info("Starting order creation process for order {}", orderId);
        
        // Step 1: Validate inventory
        Stopwatch inventoryCheck = Stopwatch.createStarted();
        try {
            boolean stockAvailable = inventoryService.checkStock(request.getItems());
            inventoryCheck.stop();
            
            log.info("Inventory check completed in {} ms for order {}", 
                inventoryCheck.elapsed(TimeUnit.MILLISECONDS), orderId);
            
            if (!stockAvailable) {
                log.warn("Insufficient stock for order {}", orderId);
                throw new InsufficientStockException("Not enough stock");
            }
        } catch (Exception e) {
            inventoryCheck.stop();
            log.error("Inventory check failed after {} ms for order {}", 
                inventoryCheck.elapsed(TimeUnit.MILLISECONDS), orderId, e);
            throw e;
        }
        
        // Step 2: Process payment
        Stopwatch paymentProcessing = Stopwatch.createStarted();
        try {
            PaymentResult paymentResult = paymentService.processPayment(request.getPayment());
            paymentProcessing.stop();
            
            log.info("Payment processed in {} ms for order {} with result {}", 
                paymentProcessing.elapsed(TimeUnit.MILLISECONDS), 
                orderId, 
                paymentResult.getStatus());
            
        } catch (Exception e) {
            paymentProcessing.stop();
            log.error("Payment failed after {} ms for order {}", 
                paymentProcessing.elapsed(TimeUnit.MILLISECONDS), orderId, e);
            throw e;
        }
        
        // Step 3: Save order
        Order order = new Order(orderId, request);
        Order savedOrder = orderRepository.save(order);
        
        log.info("Order {} saved successfully", orderId);
        return savedOrder;
    }
}

// METRICS - Application and business metrics
@Component
public class OrderMetrics {
    
    private final MeterRegistry meterRegistry;
    private final Counter ordersCreated;
    private final Counter ordersProcessed;
    private final Timer orderProcessingTime;
    private final Gauge activeOrders;
    
    public OrderMetrics(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
        
        // Counters for business metrics
        this.ordersCreated = Counter.builder("orders.created")
            .description("Total number of orders created")
            .tag("service", "order-service")
            .register(meterRegistry);
            
        this.ordersProcessed = Counter.builder("orders.processed")
            .description("Total number of orders processed")
            .register(meterRegistry);
        
        // Timer for performance metrics
        this.orderProcessingTime = Timer.builder("orders.processing.time")
            .description("Time taken to process an order")
            .register(meterRegistry);
            
        // Gauge for current state
        this.activeOrders = Gauge.builder("orders.active")
            .description("Number of currently active orders")
            .register(meterRegistry, this, OrderMetrics::getActiveOrderCount);
    }
    
    public void recordOrderCreated(String orderType) {
        ordersCreated.increment(Tags.of("type", orderType));
    }
    
    public void recordOrderProcessed(String status) {
        ordersProcessed.increment(Tags.of("status", status));
    }
    
    public Timer.Sample startOrderProcessingTimer() {
        return Timer.start(meterRegistry);
    }
    
    public void recordOrderProcessingTime(Timer.Sample sample, String result) {
        sample.stop(Timer.builder("orders.processing.time")
            .tag("result", result)
            .register(meterRegistry));
    }
    
    private Double getActiveOrderCount() {
        return (double) orderRepository.countByStatus(OrderStatus.ACTIVE);
    }
}

// DISTRIBUTED TRACING - Service correlation
@RestController
public class TracedOrderController {
    
    @Autowired
    private OrderService orderService;
    
    @PostMapping("/orders")
    @NewSpan("order-creation")
    public ResponseEntity<Order> createOrder(@RequestBody CreateOrderRequest request) {
        Span span = Span.current();
        
        // Add custom attributes to span
        span.setAttribute("user.id", request.getUserId().toString());
        span.setAttribute("items.count", request.getItems().size());
        span.setAttribute("order.total", request.getTotalAmount().toString());
        
        try {
            Order order = orderService.createOrder(request);
            
            // Add result attributes
            span.setAttribute("order.id", order.getId());
            span.setAttribute("order.status", order.getStatus().toString());
            span.setStatus(StatusCode.OK);
            
            return ResponseEntity.ok(order);
            
        } catch (Exception e) {
            // Record error in span
            span.recordException(e);
            span.setStatus(StatusCode.ERROR, e.getMessage());
            throw e;
        }
    }
}

@Service
public class TracedOrderService {
    
    @NewSpan("inventory-check")
    public boolean checkInventory(List<OrderItem> items) {
        Span span = Span.current();
        span.setAttribute("items.count", items.size());
        
        // Business logic with automatic tracing
        for (OrderItem item : items) {
            span.addEvent("checking-item", 
                Attributes.of(AttributeKey.stringKey("product.id"), 
                             item.getProductId().toString()));
        }
        
        return inventoryService.checkStock(items);
    }
    
    @NewSpan("payment-processing")
    public PaymentResult processPayment(PaymentRequest payment) {
        Span span = Span.current();
        span.setAttribute("payment.amount", payment.getAmount().toString());
        span.setAttribute("payment.currency", payment.getCurrency());
        
        return paymentService.processPayment(payment);
    }
}

// HEALTH CHECKS - System status monitoring
@Component
public class HealthIndicators {
    
    @Autowired
    private DataSource dataSource;
    
    @Autowired
    private RedisTemplate redisTemplate;
    
    // Database health check
    public Health databaseHealth() {
        try {
            Connection connection = dataSource.getConnection();
            boolean isValid = connection.isValid(1000); // 1 second timeout
            connection.close();
            
            if (isValid) {
                return Health.up()
                    .withDetail("database", "Available")
                    .withDetail("responseTime", "< 1000ms")
                    .build();
            } else {
                return Health.down()
                    .withDetail("database", "Connection invalid")
                    .build();
            }
        } catch (Exception e) {
            return Health.down()
                .withDetail("database", "Connection failed")
                .withDetail("error", e.getMessage())
                .build();
        }
    }
    
    // Redis health check
    public Health redisHealth() {
        try {
            String response = redisTemplate.getConnectionFactory()
                .getConnection()
                .ping();
            
            return Health.up()
                .withDetail("redis", "Available")
                .withDetail("ping", response)
                .build();
                
        } catch (Exception e) {
            return Health.down()
                .withDetail("redis", "Unavailable")
                .withDetail("error", e.getMessage())
                .build();
        }
    }
    
    // Custom business health check
    public Health orderProcessingHealth() {
        try {
            // Check if order processing is working
            long pendingOrders = orderRepository.countByStatus(OrderStatus.PENDING);
            long oldestPendingMinutes = getOldestPendingOrderMinutes();
            
            if (oldestPendingMinutes > 60) { // Orders pending > 1 hour
                return Health.down()
                    .withDetail("orderProcessing", "Degraded")
                    .withDetail("pendingOrders", pendingOrders)
                    .withDetail("oldestPendingMinutes", oldestPendingMinutes)
                    .build();
            } else {
                return Health.up()
                    .withDetail("orderProcessing", "Normal")
                    .withDetail("pendingOrders", pendingOrders)
                    .build();
            }
        } catch (Exception e) {
            return Health.down()
                .withDetail("orderProcessing", "Check failed")
                .withDetail("error", e.getMessage())
                .build();
        }
    }
}

// CONFIGURATION for observability stack
@Configuration
public class ObservabilityConfig {
    
    // Micrometer metrics configuration
    @Bean
    public MeterRegistry meterRegistry() {
        return new PrometheusMeterRegistry(PrometheusConfig.DEFAULT);
    }
    
    // Custom timer for method execution
    @Bean
    public TimedAspect timedAspect(MeterRegistry registry) {
        return new TimedAspect(registry);
    }
    
    // Logging configuration
    @Bean
    public Logger structuredLogger() {
        LoggerContext context = (LoggerContext) LoggerFactory.getILoggerFactory();
        
        // JSON encoder for structured logs
        JsonEncoder jsonEncoder = new JsonEncoder();
        jsonEncoder.setContext(context);
        jsonEncoder.start();
        
        ConsoleAppender<ILoggingEvent> appender = new ConsoleAppender<>();
        appender.setContext(context);
        appender.setEncoder(jsonEncoder);
        appender.start();
        
        ch.qos.logback.classic.Logger logger = context.getLogger(Logger.ROOT_LOGGER_NAME);
        logger.addAppender(appender);
        logger.setLevel(Level.INFO);
        
        return logger;
    }
    
    // Distributed tracing configuration
    @Bean
    public OpenTelemetry openTelemetry() {
        return OpenTelemetrySdk.builder()
            .setTracerProvider(
                SdkTracerProvider.builder()
                    .addSpanProcessor(BatchSpanProcessor.builder(
                        OtlpGrpcSpanExporter.builder()
                            .setEndpoint("http://jaeger:14250")
                            .build())
                        .build())
                    .setResource(Resource.getDefault()
                        .merge(Resource.builder()
                            .put(ResourceAttributes.SERVICE_NAME, "order-service")
                            .put(ResourceAttributes.SERVICE_VERSION, "1.0.0")
                            .build()))
                    .build())
            .build();
    }
}

// ALERTING - Proactive issue detection
@Component
public class AlertingService {
    
    @EventListener
    public void handleOrderFailure(OrderFailedEvent event) {
        // Send alert for failed orders
        Alert alert = Alert.builder()
            .severity(Severity.HIGH)
            .title("Order Processing Failure")
            .description("Order " + event.getOrderId() + " failed: " + event.getReason())
            .tags(Map.of(
                "service", "order-service",
                "type", "business-logic",
                "order_id", event.getOrderId()
            ))
            .build();
        
        alertManager.sendAlert(alert);
    }
    
    @Scheduled(fixedRate = 60000) // Every minute
    public void checkSystemHealth() {
        // Check error rate
        double errorRate = getErrorRateLastMinute();
        if (errorRate > 0.05) { // 5% error rate threshold
            Alert alert = Alert.builder()
                .severity(Severity.MEDIUM)
                .title("High Error Rate Detected")
                .description("Error rate: " + String.format("%.2f%%", errorRate * 100))
                .tags(Map.of("service", "order-service", "type", "error-rate"))
                .build();
            
            alertManager.sendAlert(alert);
        }
        
        // Check response time
        double avgResponseTime = getAverageResponseTimeLastMinute();
        if (avgResponseTime > 2000) { // 2 second threshold
            Alert alert = Alert.builder()
                .severity(Severity.LOW)
                .title("High Response Time")
                .description("Average response time: " + avgResponseTime + "ms")
                .tags(Map.of("service", "order-service", "type", "performance"))
                .build();
            
            alertManager.sendAlert(alert);
        }
    }
}

// DASHBOARDS - Visual monitoring
@RestController
public class MetricsController {
    
    @Autowired
    private MeterRegistry meterRegistry;
    
    @GetMapping("/metrics/summary")
    public ResponseEntity<Map<String, Object>> getMetricsSummary() {
        Map<String, Object> metrics = new HashMap<>();
        
        // Business metrics
        metrics.put("orders_created_total", 
            meterRegistry.counter("orders.created").count());
        metrics.put("orders_processed_total", 
            meterRegistry.counter("orders.processed").count());
        
        // Performance metrics
        Timer orderTimer = meterRegistry.timer("orders.processing.time");
        metrics.put("order_processing_avg_ms", orderTimer.mean(TimeUnit.MILLISECONDS));
        metrics.put("order_processing_max_ms", orderTimer.max(TimeUnit.MILLISECONDS));
        
        // System metrics
        metrics.put("jvm_memory_used", 
            meterRegistry.gauge("jvm.memory.used").value());
        metrics.put("active_threads", 
            meterRegistry.gauge("jvm.threads.live").value());
        
        return ResponseEntity.ok(metrics);
    }
}
```
*Notice: Observability combines logs, metrics, and traces to provide complete system visibility.*

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>Observability best practices</strong></summary>

<div>

- **Three pillars**: Logs (what happened), Metrics (how much/how fast), Traces (request flow)
- **Correlation IDs**: Track requests across service boundaries
- **Structured logging**: Use JSON format for better querying
- **SLIs/SLOs**: Define Service Level Indicators and Objectives
- **Alert fatigue**: Only alert on actionable issues

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Monitoring` · `Distributed Tracing` · `Alerting` · `Performance Analysis` · `Incident Response`

</div>

### Common Anti-patterns {#anti-patterns}

<div class="concept-section definition">

📋 **Concept Definition**  
**Common software design mistakes** that seem beneficial initially but cause long-term problems. **Major anti-patterns**: God Object (one class with too many responsibilities), Spaghetti Code (tangled dependencies), Golden Hammer (one solution for all problems), Premature Optimization (optimize before profiling), Big Ball of Mud (no clear architecture). **Distributed systems**: Distributed Monolith (microservices with tight coupling), Chatty Services (excessive inter-service calls), Shared Database (services sharing same DB). **Microservices-specific**: Nano-services (too granular), API Versioning Hell, Distributed Transaction across services.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Problem recognition**: identify issues before they become critical
- **System health**: avoid common mistakes that hurt maintainability
- **Technical debt**: prevent accumulation of problematic patterns
- **Team education**: learn from others' mistakes

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// ANTI-PATTERN: God Object/Class
// ❌ Bad - one class doing everything
public class OrderManager {
    // Database operations
    public void saveToDatabase(Order order) { /* ... */ }
    public Order loadFromDatabase(Long id) { /* ... */ }
    
    // Business logic
    public void validateOrder(Order order) { /* ... */ }
    public BigDecimal calculateTotal(Order order) { /* ... */ }
    public void applyDiscounts(Order order) { /* ... */ }
    
    // External integrations
    public void sendEmail(String email, String subject) { /* ... */ }
    public void callPaymentAPI(PaymentRequest request) { /* ... */ }
    public void updateInventory(List<OrderItem> items) { /* ... */ }
    
    // UI logic
    public String formatOrderDisplay(Order order) { /* ... */ }
    public void handleUserClick(ClickEvent event) { /* ... */ }
    
    // Logging and monitoring
    public void logOrderEvent(String event) { /* ... */ }
    public void sendMetrics(String metric, double value) { /* ... */ }
}

// ✅ Better - separated responsibilities
@Service
public class OrderService {
    @Autowired private OrderRepository orderRepository;
    @Autowired private OrderValidator orderValidator;
    @Autowired private PricingService pricingService;
    @Autowired private NotificationService notificationService;
    
    public Order createOrder(CreateOrderRequest request) {
        orderValidator.validate(request);
        Order order = new Order(request);
        BigDecimal total = pricingService.calculateTotal(order);
        order.setTotal(total);
        Order savedOrder = orderRepository.save(order);
        notificationService.sendOrderConfirmation(savedOrder);
        return savedOrder;
    }
}

// ANTI-PATTERN: Chatty Interfaces
// ❌ Bad - multiple round trips
public class ChattyOrderController {
    @GetMapping("/orders/{id}/details")
    public OrderDetailsDto getOrderDetails(@PathVariable Long id) {
        Order order = orderService.getOrder(id);
        User user = userService.getUser(order.getUserId());
        List<Product> products = new ArrayList<>();
        
        // N+1 query problem
        for (OrderItem item : order.getItems()) {
            Product product = productService.getProduct(item.getProductId());
            products.add(product);
        }
        
        Address address = addressService.getAddress(order.getAddressId());
        PaymentInfo payment = paymentService.getPaymentInfo(order.getPaymentId());
        
        return new OrderDetailsDto(order, user, products, address, payment);
    }
}

// ✅ Better - single call with all data
@GetMapping("/orders/{id}/details")
public OrderDetailsDto getOrderDetails(@PathVariable Long id) {
    return orderService.getOrderDetailsComplete(id); // One call, all data
}

// ANTI-PATTERN: Distributed Monolith
// ❌ Bad - tight coupling between services
@Service
public class DistributedMonolithOrderService {
    
    public Order createOrder(CreateOrderRequest request) {
        // Step 1: Synchronous call to user service
        User user = userServiceClient.getUser(request.getUserId());
        if (user == null) {
            throw new UserNotFoundException();
        }
        
        // Step 2: Synchronous call to inventory service
        InventoryCheckResult result = inventoryServiceClient.checkStock(request.getItems());
        if (!result.isAvailable()) {
            throw new InsufficientStockException();
        }
        
        // Step 3: Synchronous call to pricing service
        PricingResult pricing = pricingServiceClient.calculatePrice(request.getItems());
        
        // Step 4: Synchronous call to payment service
        PaymentResult payment = paymentServiceClient.processPayment(
            new PaymentRequest(pricing.getTotal(), user.getPaymentMethod()));
        
        // If any service is down, entire flow fails
        // All services must be deployed together
        // No independent scaling
        
        return new Order(request, pricing.getTotal());
    }
}

// ✅ Better - event-driven with compensation
@Service
public class EventDrivenOrderService {
    
    public Order createOrder(CreateOrderRequest request) {
        // Create order optimistically
        Order order = new Order(request);
        order.setStatus(OrderStatus.PENDING);
        Order savedOrder = orderRepository.save(order);
        
        // Publish event for async processing
        eventPublisher.publishEvent(new OrderCreatedEvent(savedOrder));
        
        return savedOrder; // Return immediately
    }
}

// ANTI-PATTERN: Leaky Abstractions
// ❌ Bad - implementation details leak through abstraction
public interface UserRepository {
    @Query("SELECT u FROM UserEntity u WHERE u.email = :email")
    Optional<User> findByEmail(@Param("email") String email);
    
    // Leaking JPA specifics
    @Modifying
    @Query("UPDATE UserEntity u SET u.lastLogin = :time WHERE u.id = :id")
    void updateLastLoginTime(@Param("id") Long id, @Param("time") LocalDateTime time);
}

// ✅ Better - clean abstraction
public interface UserRepository {
    Optional<User> findByEmail(String email);
    void updateLastLoginTime(Long userId, LocalDateTime time);
    List<User> findActiveUsers();
    void save(User user);
}

// ANTI-PATTERN: Magic Numbers and Strings
// ❌ Bad - magic values everywhere
public class MagicNumberService {
    public void processOrder(Order order) {
        if (order.getTotal().compareTo(new BigDecimal("100.00")) > 0) {
            applyDiscount(order, 0.1); // 10% discount
        }
        
        if (order.getItems().size() > 5) {
            setShippingMethod(order, "EXPRESS");
        }
        
        // Wait 3 seconds for external API
        Thread.sleep(3000);
    }
}

// ✅ Better - named constants
public class ConfigurableOrderService {
    private static final BigDecimal DISCOUNT_THRESHOLD = new BigDecimal("100.00");
    private static final double BULK_ORDER_DISCOUNT = 0.1;
    private static final int BULK_ORDER_ITEM_COUNT = 5;
    private static final String EXPRESS_SHIPPING = "EXPRESS";
    private static final Duration API_TIMEOUT = Duration.ofSeconds(3);
    
    public void processOrder(Order order) {
        if (order.getTotal().compareTo(DISCOUNT_THRESHOLD) > 0) {
            applyDiscount(order, BULK_ORDER_DISCOUNT);
        }
        
        if (order.getItems().size() > BULK_ORDER_ITEM_COUNT) {
            setShippingMethod(order, EXPRESS_SHIPPING);
        }
        
        callExternalApiWithTimeout(API_TIMEOUT);
    }
}

// ANTI-PATTERN: Reinventing the Wheel
// ❌ Bad - custom everything
public class CustomHashMap<K, V> {
    private Entry<K, V>[] buckets;
    private int size;
    
    // Hundreds of lines of custom hash map implementation
    // Bug-prone, not optimized, maintenance burden
}

public class CustomDateFormatter {
    public String formatDate(Date date) {
        // Custom date formatting logic
        // Ignoring locale, timezone, edge cases
    }
}

// ✅ Better - use proven libraries
public class ServiceUsingStandardLibraries {
    private final Map<String, User> userCache = new ConcurrentHashMap<>();
    private final DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;
    
    public String formatDate(LocalDate date) {
        return date.format(formatter);
    }
}

// ANTI-PATTERN: Premature Optimization
// ❌ Bad - optimizing before measuring
public class PrematurelyOptimizedService {
    
    // Complex object pooling for simple objects
    private final ObjectPool<StringBuilder> stringBuilderPool = 
        new GenericObjectPool<>(new StringBuilderFactory());
    
    public String buildUserName(User user) {
        StringBuilder sb = stringBuilderPool.borrowObject();
        try {
            // Simple string concatenation over-engineered
            sb.append(user.getFirstName());
            sb.append(" ");
            sb.append(user.getLastName());
            return sb.toString();
        } finally {
            stringBuilderPool.returnObject(sb);
        }
    }
    
    // Micro-optimizations that hurt readability
    public boolean isActive(User user) {
        return (user.getStatus() & 0x01) == 1; // Bit manipulation for simple boolean
    }
}

// ✅ Better - simple and clear first
public class SimpleService {
    public String buildUserName(User user) {
        return user.getFirstName() + " " + user.getLastName();
    }
    
    public boolean isActive(User user) {
        return user.getStatus() == UserStatus.ACTIVE;
    }
}
```
*Notice: Anti-patterns often start as quick fixes but create long-term maintenance problems.*

</div>

<div class="concept-section pitfalls">

<details>
<summary>⚠️ <strong>How to avoid anti-patterns</strong></summary>

<div>

- **Code reviews**: Catch problems early with peer review
- **Refactoring**: Regularly improve code structure
- **SOLID principles**: Follow good design principles
- **Metrics**: Measure before optimizing
- **Standards**: Use established patterns and libraries

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Code Quality` · `Technical Debt` · `Design Patterns` · `Refactoring` · `System Maintainability`

</div>

## Concepts

**Monolith**: Single deployable unit containing all application components. Simple to develop and deploy initially, but can become difficult to scale and maintain as it grows. All components share the same database and runtime.

**Microservices**: Architecture pattern where applications are composed of small, independent services that communicate over well-defined APIs. Each service owns its data and can be developed, deployed, and scaled independently.

**Layered Architecture**: Organizes code into horizontal layers (presentation, business, data) where each layer only communicates with adjacent layers. Provides clear separation of concerns and maintainable structure.

**Port-Adapter (Hexagonal)**: Architectural pattern that isolates core business logic from external concerns. Business logic communicates through ports (interfaces), with adapters providing concrete implementations for databases, APIs, and UI.

**Event-Driven Architecture**: System design where components communicate through events rather than direct calls. Enables loose coupling, scalability, and resilience through asynchronous message processing.

**Idempotency**: Property of operations that can be performed multiple times without changing the result beyond the initial application. Critical for reliable distributed systems and safe retry mechanisms.

**Caching**: Strategy for storing frequently accessed data in faster storage layers to improve performance and reduce load on primary data sources. Includes multiple levels from browser to database caching.

**Resiliency**: System's ability to handle and recover from failures gracefully. Implemented through patterns like retry, circuit breaker, bulkhead, and timeout to maintain availability during partial failures.

**Observability**: Practice of making systems' internal states observable through logs, metrics, and distributed traces. Essential for understanding system behavior, debugging issues, and maintaining performance.

**Anti-patterns**: Common design mistakes that appear beneficial initially but create problems over time. Examples include God objects, chatty interfaces, distributed monoliths, and premature optimization.

### Layered Architecture
- Organized into horizontal layers
- Each layer only communicates with adjacent layers
- Common layers: Presentation, Business, Data
- Clear separation of concerns

## Design Patterns

### Creational Patterns
- **Singleton**: Ensure single instance
- **Factory**: Create objects without specifying exact class
- **Builder**: Construct complex objects step by step

### Structural Patterns
- **Adapter**: Interface compatibility
- **Decorator**: Add behavior without altering structure
- **Facade**: Simplified interface to complex subsystem

### Behavioral Patterns
- **Observer**: Notify multiple objects of state changes
- **Strategy**: Encapsulate algorithms and make them interchangeable
- **Command**: Encapsulate requests as objects

## Scalability Patterns

### Horizontal vs Vertical Scaling
- **Horizontal**: Add more servers
- **Vertical**: Add more power to existing servers

### Load Balancing
- Distribute requests across multiple servers
- Round-robin, least connections, weighted
- Improves availability and performance

### Caching
- **Browser Cache**: Client-side caching
- **CDN**: Geographic distribution
- **Application Cache**: In-memory caching (Redis)
- **Database Cache**: Query result caching

### Database Patterns
- **Read Replicas**: Scale read operations
- **Sharding**: Partition data across databases
- **CQRS**: Separate read and write models
- **Event Sourcing**: Store events instead of current state

## Communication Patterns

### Synchronous Communication
- HTTP REST APIs
- gRPC for high-performance
- Direct service-to-service calls
- Simple but creates tight coupling

### Asynchronous Communication
- Message queues (RabbitMQ, Apache Kafka)
- Event-driven architecture
- Pub/sub patterns
- Better resilience and scalability

## Resilience Patterns

### Circuit Breaker
- Prevent cascade failures
- Fail fast when service is down
- Automatic recovery detection

### Retry Pattern
- Automatic retry with backoff
- Handle transient failures
- Set maximum retry limits

### Bulkhead Pattern
- Isolate resources
- Prevent resource exhaustion
- Contain failures

## Security Architecture

### Authentication vs Authorization
- **Authentication**: Who are you?
- **Authorization**: What can you do?

### Common Security Patterns
- OAuth 2.0 for authorization
- JWT tokens for stateless authentication
- API gateways for centralized security
- Zero-trust architecture

## Best Practices

1. **SOLID Principles**: Foundation for good design
2. **Loose Coupling**: Minimize dependencies
3. **High Cohesion**: Related functionality together
4. **Separation of Concerns**: Each component has single responsibility
5. **DRY (Don't Repeat Yourself)**: Avoid code duplication
6. **KISS (Keep It Simple, Stupid)**: Avoid unnecessary complexity
7. **YAGNI (You Aren't Gonna Need It)**: Don't over-engineer