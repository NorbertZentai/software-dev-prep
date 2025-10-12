ít# Software Architecture

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

### MVC (Model-View-Controller) {#mvc}

<div class="concept-section definition">

📋 **Concept Definition**  
**Architectural pattern** separating application into three interconnected components: **Model** (business data and logic, independent of UI), **View** (UI presentation, displays Model data), **Controller** (handles user input, updates Model, selects View). **Flow**: User interacts with View → Controller processes input → Controller updates Model → Model notifies View → View refreshes. **Variants**: **MVC Web** (Spring MVC: Controller returns View name, Model passed via ModelAndView), **REST API** (Controller returns JSON, no View). **Benefits**: separation of concerns, multiple Views for one Model, testable business logic. **Used in**: Spring MVC, Ruby on Rails, ASP.NET MVC, Django.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Separation of concerns**: UI, logic, and data are independent
- **Testability**: Model and Controller can be tested without View
- **Multiple views**: Same Model can be displayed in different ways
- **Team collaboration**: Frontend and backend teams can work independently
- **Industry standard**: Used in most web frameworks

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// MODEL - Business data and logic
@Entity
public class User {
    @Id
    @GeneratedValue
    private Long id;
    
    private String name;
    private String email;
    private LocalDateTime createdAt;
    
    // Business logic
    public void activate() {
        if (this.email == null || !this.email.contains("@")) {
            throw new IllegalStateException("Invalid email");
        }
        this.active = true;
    }
    
    public boolean isEligibleForPremium() {
        return this.createdAt.isBefore(LocalDateTime.now().minusMonths(6));
    }
    
    // Getters, setters, constructors
}

// Additional Model - Service layer
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public User createUser(String name, String email) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setCreatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }
    
    public User getUserById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException(id));
    }
}

// CONTROLLER - Handles user requests, updates Model, returns View
@Controller  // Note: @Controller, not @RestController
@RequestMapping("/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    // Display list of users
    @GetMapping
    public String listUsers(Model model) {
        // Get data from Model (Service)
        List<User> users = userService.getAllUsers();
        
        // Add data to View Model
        model.addAttribute("users", users);
        model.addAttribute("totalCount", users.size());
        
        // Return View name (users.html)
        return "users";
    }
    
    // Show create user form
    @GetMapping("/new")
    public String showCreateForm(Model model) {
        model.addAttribute("user", new User());
        return "user-form";
    }
    
    // Handle form submission
    @PostMapping
    public String createUser(@ModelAttribute User user, 
                           RedirectAttributes redirectAttributes) {
        try {
            User savedUser = userService.createUser(user.getName(), user.getEmail());
            
            // Add flash message
            redirectAttributes.addFlashAttribute("message", 
                "User created successfully!");
            
            // Redirect to list (PRG pattern: Post-Redirect-Get)
            return "redirect:/users";
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", e.getMessage());
            return "redirect:/users/new";
        }
    }
    
    // Show user details
    @GetMapping("/{id}")
    public String showUser(@PathVariable Long id, Model model) {
        User user = userService.getUserById(id);
        model.addAttribute("user", user);
        return "user-detail";
    }
    
    // Show edit form
    @GetMapping("/{id}/edit")
    public String showEditForm(@PathVariable Long id, Model model) {
        User user = userService.getUserById(id);
        model.addAttribute("user", user);
        return "user-edit";
    }
    
    // Handle edit submission
    @PostMapping("/{id}")
    public String updateUser(@PathVariable Long id, 
                           @ModelAttribute User user,
                           RedirectAttributes redirectAttributes) {
        userService.updateUser(id, user);
        redirectAttributes.addFlashAttribute("message", "User updated!");
        return "redirect:/users/" + id;
    }
}

// VIEW - Thymeleaf template (users.html)
/*
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Users</title>
</head>
<body>
    <h1>User List</h1>
    
    <!-- Display message from Controller -->
    <div th:if="${message}" class="success" th:text="${message}"></div>
    
    <p>Total users: <span th:text="${totalCount}"></span></p>
    
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <!-- Loop through users from Model -->
            <tr th:each="user : ${users}">
                <td th:text="${user.id}"></td>
                <td th:text="${user.name}"></td>
                <td th:text="${user.email}"></td>
                <td>
                    <a th:href="@{/users/{id}(id=${user.id})}">View</a>
                    <a th:href="@{/users/{id}/edit(id=${user.id})}">Edit</a>
                </td>
            </tr>
        </tbody>
    </table>
    
    <a href="/users/new">Create New User</a>
</body>
</html>
*/

// REST API variant (no View, returns JSON)
@RestController  // @RestController = @Controller + @ResponseBody
@RequestMapping("/api/users")
public class UserRestController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public List<User> getUsers() {
        return userService.getAllUsers();  // Returns JSON
    }
    
    @PostMapping
    public User createUser(@RequestBody CreateUserRequest request) {
        return userService.createUser(request.getName(), request.getEmail());
    }
    
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }
}

// FLOW DIAGRAM:
/*
User Action (Click "View Users")
        ↓
    Browser sends GET /users
        ↓
    Controller receives request
        ↓
    Controller calls userService.getAllUsers()
        ↓
    Model (Service) fetches data from database
        ↓
    Model returns List<User>
        ↓
    Controller adds data to Model object
        ↓
    Controller returns "users" view name
        ↓
    Spring resolves view (users.html)
        ↓
    View (Thymeleaf) renders HTML with data
        ↓
    Browser displays rendered page
*/
```
*Notice: MVC separates concerns cleanly - Model handles data/logic, View handles presentation, Controller coordinates between them.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths / misconceptions</strong></summary>

<div>

- "Model is just a database entity" → Model includes business logic and service layer
- "Controller should contain business logic" → Controller only coordinates, logic belongs in Model/Service
- "MVC is only for web applications" → Also used in desktop apps (Swing, JavaFX), mobile
- "View can directly update Model" → Controller should mediate all interactions

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Can't explain the difference between @Controller and @RestController
- Don't know Model includes Service layer, not just entities
- Think Controller should contain business validation logic
- Don't understand PRG pattern (Post-Redirect-Get) to prevent double submission

</div>
</details>

</div>

<div class="concept-section interview-questions">

<details>
<summary>💼 <strong>Interview questions</strong></summary>

<div>

**Q: What's the difference between @Controller and @RestController in Spring?**
A: @Controller returns view names (HTML pages), @RestController = @Controller + @ResponseBody (returns JSON/XML data directly).

**Q: Where should business logic go in MVC?**
A: In the Model layer (Service classes), not in Controller. Controller only handles HTTP concerns and delegates to Service.

**Q: How does data flow in MVC?**
A: User → Controller → Model (fetch/update data) → Controller adds to View Model → View renders → User sees result.

**Q: What's the PRG pattern and why use it?**
A: Post-Redirect-Get prevents form resubmission on browser refresh. After POST, redirect to GET endpoint to display result.

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`MVVM` · `MVP` · `Spring MVC` · `Layered Architecture` · `Separation of Concerns` · `Thymeleaf`

</div>

### MVVM (Model-View-ViewModel) {#mvvm}

<div class="concept-section definition">

📋 **Concept Definition**  
**Architectural pattern** evolved from MVC for modern UI frameworks with data binding. **Model** (business data/logic), **View** (UI declarative markup), **ViewModel** (View's abstraction, exposes data and commands via properties, handles View logic). **Key difference from MVC**: **Data binding** (View automatically updates when ViewModel changes, two-way binding possible). **Flow**: View binds to ViewModel → User interacts → ViewModel updates → View auto-refreshes. **Benefits**: no direct View manipulation, testable ViewModel, reusable across platforms. **Used in**: Angular, Vue.js, WPF, Xamarin, Knockout.js, React (with state management).

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Data binding**: Automatic UI updates without manual DOM manipulation
- **Testability**: ViewModel is pure logic, no UI dependencies
- **Declarative UI**: View describes "what" to show, not "how"
- **Modern frontend**: Foundation for Angular, Vue, React patterns
- **Cross-platform**: Share ViewModel logic across web, mobile, desktop

</div>

<div class="runnable-model">

**Runnable mental model**
```typescript
// MODEL - Business entities and API layer
interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
}

class UserService {
    async getAllUsers(): Promise<User[]> {
        const response = await fetch('/api/users');
        return response.json();
    }
    
    async createUser(name: string, email: string): Promise<User> {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        });
        return response.json();
    }
    
    async deleteUser(id: number): Promise<void> {
        await fetch(`/api/users/${id}`, { method: 'DELETE' });
    }
}

// VIEWMODEL - Manages View state and logic (Angular example)
@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html'
})
export class UserListViewModel {
    // Observable properties for data binding
    users: User[] = [];
    loading: boolean = false;
    errorMessage: string = '';
    searchTerm: string = '';
    
    // Computed properties (derived from other properties)
    get filteredUsers(): User[] {
        return this.users.filter(user => 
            user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }
    
    get activeUserCount(): number {
        return this.users.filter(u => u.isActive).length;
    }
    
    constructor(private userService: UserService) {
        this.loadUsers();
    }
    
    // Commands (methods bound to View actions)
    async loadUsers(): Promise<void> {
        this.loading = true;
        this.errorMessage = '';
        
        try {
            this.users = await this.userService.getAllUsers();
        } catch (error) {
            this.errorMessage = 'Failed to load users';
        } finally {
            this.loading = false;
        }
    }
    
    async deleteUser(userId: number): Promise<void> {
        if (!confirm('Delete this user?')) return;
        
        try {
            await this.userService.deleteUser(userId);
            this.users = this.users.filter(u => u.id !== userId);
        } catch (error) {
            this.errorMessage = 'Failed to delete user';
        }
    }
    
    onSearchTermChange(term: string): void {
        this.searchTerm = term;
        // filteredUsers automatically updates due to getter
    }
}

// VIEW - Declarative template with data binding (Angular)
/*
<!-- user-list.component.html -->
<div class="user-list-container">
    <h1>User Management</h1>
    
    <!-- Bind to ViewModel property: searchTerm -->
    <input 
        type="text" 
        placeholder="Search users..."
        [(ngModel)]="searchTerm"
        (ngModelChange)="onSearchTermChange($event)"
    />
    
    <!-- Bind to computed property: activeUserCount -->
    <p>Active users: {{ activeUserCount }}</p>
    
    <!-- Conditional rendering: loading -->
    <div *ngIf="loading" class="spinner">Loading...</div>
    
    <!-- Conditional rendering: errorMessage -->
    <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
    
    <!-- List rendering: filteredUsers -->
    <table *ngIf="!loading">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <!-- Loop with data binding -->
            <tr *ngFor="let user of filteredUsers">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>
                    <span [class.active]="user.isActive">
                        {{ user.isActive ? 'Active' : 'Inactive' }}
                    </span>
                </td>
                <td>
                    <!-- Event binding: call ViewModel command -->
                    <button (click)="deleteUser(user.id)">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
*/

// React equivalent (hooks create ViewModel-like pattern)
import React, { useState, useEffect, useMemo } from 'react';

function UserListView() {
    // State (ViewModel properties)
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    
    // Computed value (ViewModel getter)
    const filteredUsers = useMemo(() => 
        users.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        ), [users, searchTerm]
    );
    
    const activeUserCount = useMemo(() => 
        users.filter(u => u.isActive).length, 
        [users]
    );
    
    // Effects (ViewModel initialization)
    useEffect(() => {
        loadUsers();
    }, []);
    
    // Commands (ViewModel methods)
    const loadUsers = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await userService.getAllUsers();
            setUsers(data);
        } catch (err) {
            setError('Failed to load users');
        } finally {
            setLoading(false);
        }
    };
    
    const deleteUser = async (userId: number) => {
        if (!window.confirm('Delete this user?')) return;
        
        try {
            await userService.deleteUser(userId);
            setUsers(users.filter(u => u.id !== userId));
        } catch (err) {
            setError('Failed to delete user');
        }
    };
    
    // View (JSX with binding)
    return (
        <div className="user-list-container">
            <h1>User Management</h1>
            
            <input 
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            
            <p>Active users: {activeUserCount}</p>
            
            {loading && <div className="spinner">Loading...</div>}
            {error && <div className="error">{error}</div>}
            
            {!loading && (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={user.isActive ? 'active' : ''}>
                                        {user.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td>
                                    <button onClick={() => deleteUser(user.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

// FLOW DIAGRAM:
/*
User types in search box
        ↓
    View captures input event
        ↓
    Two-way binding updates ViewModel.searchTerm
        ↓
    ViewModel.filteredUsers getter recomputes
        ↓
    Data binding automatically updates View
        ↓
    User sees filtered results (no manual DOM update!)

User clicks "Delete" button
        ↓
    View triggers ViewModel.deleteUser(id)
        ↓
    ViewModel calls Model (UserService.deleteUser)
        ↓
    ViewModel updates users array
        ↓
    Data binding auto-updates View to remove row
*/
```
*Notice: MVVM's data binding eliminates manual DOM manipulation - ViewModel changes automatically reflect in View.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths / misconceptions</strong></summary>

<div>

- "MVVM is just MVC with different names" → MVVM has automatic data binding, MVC doesn't
- "ViewModel is same as Controller" → ViewModel is data-focused abstraction, Controller handles routing
- "Need a framework for MVVM" → Pattern exists independent of framework, but frameworks make it easier
- "Two-way binding is always better" → Can cause performance issues and unpredictable state changes

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Can't explain the difference between MVC and MVVM
- Don't understand data binding mechanism (how View auto-updates)
- Think ViewModel should manipulate DOM directly (it shouldn't!)
- Don't know when to use computed properties vs methods

</div>
</details>

</div>

<div class="concept-section interview-questions">

<details>
<summary>💼 <strong>Interview questions</strong></summary>

<div>

**Q: What's the main difference between MVC and MVVM?**
A: MVVM has automatic data binding between View and ViewModel. In MVC, Controller manually updates View. MVVM's ViewModel is a View abstraction, MVC's Controller handles request routing.

**Q: What is data binding in MVVM?**
A: Automatic synchronization between View and ViewModel. One-way: ViewModel changes update View. Two-way: View changes (user input) update ViewModel, which updates View.

**Q: Why is ViewModel more testable than Controller?**
A: ViewModel has no UI dependencies - it's pure logic with properties and methods. Can test without rendering View. Controller often has HTTP/framework dependencies.

**Q: When would you use MVVM over MVC?**
A: MVVM for modern frontend with complex UI state (Angular, React, Vue). MVC for server-side rendering or simpler request-response patterns (Spring MVC).

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`MVC` · `Data Binding` · `Angular` · `React` · `Vue.js` · `Observable Pattern` · `Reactive Programming`

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

### Bounded Context {#bounded-context}

<div class="concept-section definition">

📋 **Concept Definition**  
**Bounded Context** is a core Domain-Driven Design (DDD) concept that defines an **explicit boundary** within which a particular **domain model** is defined and applicable. Within a bounded context, all terms, definitions, and rules are **consistent and unambiguous**. The same concept (e.g., "User", "Order") can have **different meanings** in different bounded contexts, each tailored to its specific business purpose. This allows **large systems to be decomposed** into manageable parts where each context has its own **ubiquitous language** - a common vocabulary shared between developers and domain experts.

**Key characteristics:**
- **Clear boundaries**: Explicit separation between contexts (microservices, modules)
- **Different models**: Same entity can have different representations
- **Context-specific language**: Each context uses terms meaningful for its domain
- **Independent evolution**: Contexts can evolve separately
- **Integration patterns**: Context Map defines relationships (Shared Kernel, Customer-Supplier, Conformist, Anti-Corruption Layer)

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Reduces complexity**: Large domains broken into comprehensible pieces
- **Team autonomy**: Teams own their bounded contexts independently
- **Prevents model pollution**: Different contexts don't contaminate each other
- **Clear communication**: Ubiquitous language prevents misunderstandings
- **Microservices design**: Natural mapping to service boundaries

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// E-COMMERCE SYSTEM - MULTIPLE BOUNDED CONTEXTS

// ===== USER MANAGEMENT CONTEXT =====
// Focus: Authentication, authorization, profile management
package com.ecommerce.user;

@Entity
@Table(name = "users")
public class User {
    @Id
    private Long id;
    
    private String username;
    private String email;
    private String passwordHash;
    private UserStatus status; // ACTIVE, SUSPENDED, DELETED
    private LocalDateTime registeredAt;
    private Set<Role> roles; // CUSTOMER, ADMIN, SUPPORT
    
    // User management specific behavior
    public void suspend(String reason) {
        this.status = UserStatus.SUSPENDED;
        // Audit log, send notification, etc.
    }
    
    public boolean hasPermission(Permission permission) {
        return roles.stream()
            .anyMatch(role -> role.hasPermission(permission));
    }
}

// ===== ORDER MANAGEMENT CONTEXT =====
// Focus: Order processing, shipping, fulfillment
package com.ecommerce.order;

@Entity
@Table(name = "order_customers")
public class User {
    @Id
    private Long userId; // References User Management Context
    
    // Only order-relevant data
    private String shippingAddress;
    private String billingAddress;
    private PaymentMethod preferredPayment;
    private CustomerType customerType; // RETAIL, WHOLESALE
    private ShippingPreference shippingPreference; // STANDARD, EXPRESS
    
    // Order-specific behavior
    public ShippingCost calculateShippingCost(Order order) {
        if (customerType == CustomerType.WHOLESALE) {
            return ShippingCost.FREE;
        }
        return shippingCalculator.calculate(
            order.getWeight(), 
            shippingPreference
        );
    }
}

// ===== INVENTORY CONTEXT =====
// Focus: Stock management, warehouse operations
package com.ecommerce.inventory;

@Entity
@Table(name = "inventory_users")
public class User {
    @Id
    private Long userId;
    
    // Inventory-relevant data
    private UserType type; // RETAIL, WHOLESALE, PARTNER
    private DiscountLevel discountLevel; // STANDARD, SILVER, GOLD, PLATINUM
    private String warehouseLocation; // For pickup orders
    
    // Inventory-specific behavior
    public boolean canAccessWholesaleStock() {
        return type == UserType.WHOLESALE || type == UserType.PARTNER;
    }
    
    public BigDecimal applyDiscount(BigDecimal price) {
        return price.multiply(discountLevel.getMultiplier());
    }
}

// ===== MARKETING CONTEXT =====
// Focus: Campaigns, recommendations, analytics
package com.ecommerce.marketing;

@Document(collection = "customer_profiles")
public class User {
    @Id
    private String userId;
    
    // Marketing-relevant data
    private List<String> interests;
    private PurchaseHistory purchaseHistory;
    private List<String> viewedProducts;
    private MarketingPreferences preferences;
    private CustomerSegment segment; // HIGH_VALUE, DORMANT, NEW
    
    // Marketing-specific behavior
    public List<Product> getRecommendations() {
        return recommendationEngine.generate(
            interests, 
            purchaseHistory, 
            segment
        );
    }
    
    public boolean shouldReceiveCampaign(Campaign campaign) {
        return preferences.allowsEmails() 
            && campaign.targetsSegment(segment);
    }
}

// ===== CONTEXT INTEGRATION - ANTI-CORRUPTION LAYER =====
// Order Context needs User data but doesn't want to depend on User Context internals

package com.ecommerce.order.integration;

// Interface defining what Order Context needs from User Context
public interface UserServiceAdapter {
    OrderUser getUserForOrder(Long userId);
    boolean isUserActive(Long userId);
}

// Implementation translating User Context API to Order Context model
@Service
public class UserServiceAdapterImpl implements UserServiceAdapter {
    @Autowired
    private RestTemplate restTemplate;
    
    @Override
    public OrderUser getUserForOrder(Long userId) {
        // Call User Context API
        UserManagementDTO userDto = restTemplate.getForObject(
            "http://user-service/api/users/" + userId,
            UserManagementDTO.class
        );
        
        // Translate to Order Context model (Anti-Corruption Layer)
        return OrderUser.builder()
            .userId(userDto.getId())
            .shippingAddress(userDto.getDefaultAddress())
            .billingAddress(userDto.getBillingAddress())
            .preferredPayment(translatePaymentMethod(userDto.getPaymentInfo()))
            .customerType(determineCustomerType(userDto))
            .build();
    }
    
    @Override
    public boolean isUserActive(Long userId) {
        UserManagementDTO user = restTemplate.getForObject(
            "http://user-service/api/users/" + userId + "/status",
            UserManagementDTO.class
        );
        return "ACTIVE".equals(user.getStatus());
    }
    
    // Translation logic protects Order Context from User Context changes
    private PaymentMethod translatePaymentMethod(PaymentInfo paymentInfo) {
        // Map User Context payment info to Order Context payment method
        return switch (paymentInfo.getType()) {
            case "CREDIT_CARD" -> PaymentMethod.CARD;
            case "PAYPAL" -> PaymentMethod.PAYPAL;
            case "BANK_TRANSFER" -> PaymentMethod.WIRE;
            default -> PaymentMethod.DEFAULT;
        };
    }
    
    private CustomerType determineCustomerType(UserManagementDTO user) {
        // Business logic: users with 10+ orders = wholesale
        if (user.getTotalOrders() >= 10) {
            return CustomerType.WHOLESALE;
        }
        return CustomerType.RETAIL;
    }
}
```

**Context Map - Relationships between Bounded Contexts:**
```
User Management Context (Upstream)
    |
    | Conformist relationship
    | (Order Context adapts to User Context API)
    v
Order Management Context (Downstream)
    |
    | Customer-Supplier
    | (Inventory provides stock info to Orders)
    v
Inventory Context (Upstream)

Marketing Context
    |
    | Anti-Corruption Layer
    | (Marketing translates events from other contexts)
    v
All Contexts (Event Bus)
```

</div>

<div class="concept-section pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

**❌ Wrong answer:**
> "Bounded Context is just another name for microservice."

**✅ Correct answer:**
> "Bounded Context is a DDD concept defining where a domain model is valid. While one microservice often implements one bounded context, they're not the same: a monolith can have multiple bounded contexts as modules, and sometimes a bounded context might span multiple services. The key is the **conceptual boundary**, not the deployment unit."

**❌ Wrong answer:**
> "We should share the User entity across all services using a shared library."

**✅ Correct answer:**
> "Sharing entities violates bounded context principles. Each context should have its own model of 'User' tailored to its needs. Use an Anti-Corruption Layer or Published Language to integrate contexts without coupling their internal models. Shared libraries create tight coupling and prevent independent evolution."

**❌ Wrong answer:**
> "Different contexts should directly call each other's databases for efficiency."

**✅ Correct answer:**
> "Direct database access violates bounded context encapsulation. Contexts should integrate through well-defined APIs (REST, GraphQL) or events (message queues). This preserves independence, allows for access control, and enables each context to evolve its schema independently."

</div>

</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Domain-Driven Design (DDD)` · `Microservices` · `Ubiquitous Language` · `Context Map` · `Anti-Corruption Layer` · `Aggregates` · `Event Storming`

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

### Asynchronous Messaging {#asynchronous-messaging}

<div class="concept-section definition">

📋 **Concept Definition**  
**Asynchronous Messaging** is a communication pattern where **components exchange messages** without waiting for immediate responses, enabling **loose coupling** and **temporal decoupling** between services. Messages are typically sent through **message brokers** (RabbitMQ, Kafka, AWS SQS) or **event buses**, allowing the sender to continue processing while the receiver handles the message at its own pace. This pattern is fundamental for **event-driven architectures**, **microservices communication**, and **scalable distributed systems**.

**Key characteristics:**
- **Non-blocking**: Sender doesn't wait for receiver
- **Loose coupling**: Services don't need to know each other's location
- **Temporal decoupling**: Sender and receiver don't need to be online simultaneously
- **Resilience**: Messages persist in queues if receiver is down
- **Scalability**: Easy to add consumers to handle load

**Message patterns:**
- **Point-to-Point** (Queue): One message → one consumer
- **Publish-Subscribe** (Topic/Exchange): One message → multiple subscribers
- **Request-Reply**: Async request with correlation ID for response
- **Event Streaming**: Continuous flow of events (Kafka, Event Sourcing)

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Decouples services**: Order service doesn't block on email sending
- **Handles failures**: Messages redelivered if consumer crashes
- **Scales independently**: Add more consumers without changing producers
- **Enables complex workflows**: Saga patterns, choreography
- **Real-world adoption**: Netflix, Uber, LinkedIn use Kafka extensively

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// ===== EVENT PUBLISHER - ORDER SERVICE =====
@Service
public class OrderService {
    
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    @Autowired
    private OrderRepository orderRepository;
    
    public Order createOrder(CreateOrderRequest request) {
        // 1. Save order to database
        Order order = new Order(request);
        order.setStatus(OrderStatus.PENDING);
        Order savedOrder = orderRepository.save(order);
        
        // 2. Publish async event - FIRE AND FORGET
        OrderCreatedEvent event = OrderCreatedEvent.builder()
            .orderId(savedOrder.getId())
            .userId(savedOrder.getUserId())
            .items(savedOrder.getItems())
            .totalAmount(savedOrder.getTotalAmount())
            .timestamp(Instant.now())
            .build();
        
        rabbitTemplate.convertAndSend(
            "order.exchange",      // Exchange name
            "order.created",       // Routing key
            event                  // Message payload
        );
        
        // 3. Return immediately - don't wait for consumers
        return savedOrder;
    }
}

// ===== EVENT CONSUMER #1 - INVENTORY SERVICE =====
@Component
public class InventoryEventHandler {
    
    @Autowired
    private InventoryService inventoryService;
    
    @Autowired
    private EventPublisher eventPublisher;
    
    // Listen to order.created events
    @RabbitListener(queues = "inventory.order.queue")
    public void handleOrderCreated(OrderCreatedEvent event) {
        try {
            log.info("Inventory: Processing order {}", event.getOrderId());
            
            // Reserve stock for all items
            for (OrderItem item : event.getItems()) {
                inventoryService.reserveStock(
                    item.getProductId(), 
                    item.getQuantity()
                );
            }
            
            // Publish success event for next step
            eventPublisher.publishStockReserved(
                event.getOrderId(), 
                event.getItems()
            );
            
            log.info("Inventory: Stock reserved for order {}", event.getOrderId());
            
        } catch (InsufficientStockException e) {
            // Publish failure event
            eventPublisher.publishStockReservationFailed(
                event.getOrderId(), 
                e.getMessage()
            );
            
            log.error("Inventory: Failed to reserve stock for order {}", 
                event.getOrderId());
        }
    }
}

// ===== EVENT CONSUMER #2 - NOTIFICATION SERVICE =====
@Component
public class NotificationEventHandler {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private EmailService emailService;
    
    // Listen to order.created events
    @RabbitListener(queues = "notification.order.queue")
    public void handleOrderCreated(OrderCreatedEvent event) {
        log.info("Notification: Sending email for order {}", event.getOrderId());
        
        // Get user details
        User user = userService.findById(event.getUserId());
        
        // Send confirmation email asynchronously
        emailService.sendOrderConfirmation(
            user.getEmail(),
            event.getOrderId(),
            event.getItems(),
            event.getTotalAmount()
        );
        
        log.info("Notification: Email sent for order {}", event.getOrderId());
    }
    
    // Listen to stock.reserved events
    @RabbitListener(queues = "notification.stock.queue")
    public void handleStockReserved(StockReservedEvent event) {
        User user = userService.findByOrderId(event.getOrderId());
        emailService.sendStockReservedNotification(
            user.getEmail(),
            event.getOrderId()
        );
    }
}

// ===== EVENT CONSUMER #3 - ANALYTICS SERVICE =====
@Component
public class AnalyticsEventHandler {
    
    @Autowired
    private AnalyticsRepository analyticsRepository;
    
    @RabbitListener(queues = "analytics.order.queue")
    public void handleOrderCreated(OrderCreatedEvent event) {
        // Track order metrics for analytics
        OrderMetrics metrics = OrderMetrics.builder()
            .orderId(event.getOrderId())
            .userId(event.getUserId())
            .totalAmount(event.getTotalAmount())
            .itemCount(event.getItems().size())
            .timestamp(event.getTimestamp())
            .build();
        
        analyticsRepository.save(metrics);
        
        log.info("Analytics: Recorded metrics for order {}", event.getOrderId());
    }
}

// ===== RABBITMQ CONFIGURATION =====
@Configuration
public class RabbitMQConfig {
    
    // Declare exchange
    @Bean
    public TopicExchange orderExchange() {
        return new TopicExchange("order.exchange");
    }
    
    // Declare queues for each service
    @Bean
    public Queue inventoryQueue() {
        return new Queue("inventory.order.queue", true); // durable
    }
    
    @Bean
    public Queue notificationQueue() {
        return new Queue("notification.order.queue", true);
    }
    
    @Bean
    public Queue analyticsQueue() {
        return new Queue("analytics.order.queue", true);
    }
    
    // Bind queues to exchange with routing key
    @Bean
    public Binding inventoryBinding() {
        return BindingBuilder
            .bind(inventoryQueue())
            .to(orderExchange())
            .with("order.created");
    }
    
    @Bean
    public Binding notificationBinding() {
        return BindingBuilder
            .bind(notificationQueue())
            .to(orderExchange())
            .with("order.created");
    }
    
    @Bean
    public Binding analyticsBinding() {
        return BindingBuilder
            .bind(analyticsQueue())
            .to(orderExchange())
            .with("order.created");
    }
    
    // JSON message converter
    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}

// ===== MESSAGE FLOW =====
/*
1. User creates order via OrderService
   → Order saved to database (PENDING status)
   → OrderCreatedEvent published to order.exchange

2. RabbitMQ routes event to 3 queues:
   ├─ inventory.order.queue → InventoryService
   ├─ notification.order.queue → NotificationService
   └─ analytics.order.queue → AnalyticsService

3. Each service processes event independently:
   ├─ InventoryService: Reserves stock → publishes StockReservedEvent
   ├─ NotificationService: Sends email confirmation
   └─ AnalyticsService: Records order metrics

4. If InventoryService fails:
   → Message requeued (retry with exponential backoff)
   → Other services unaffected (fault isolation)
   → Eventually publishes StockReservationFailedEvent

Benefits:
✅ OrderService returns immediately (no blocking)
✅ Services scale independently (add consumers)
✅ Failure in email doesn't block inventory
✅ Easy to add new consumers (e.g., FraudDetectionService)
✅ Replay events for debugging or new features
*/
```

**Comparison: Synchronous vs Asynchronous**
```java
// ❌ SYNCHRONOUS - BLOCKING (Bad for scalability)
@Service
public class OrderServiceSync {
    public Order createOrder(CreateOrderRequest request) {
        Order order = orderRepository.save(new Order(request));
        
        // BLOCKING CALLS - Order service waits for each
        inventoryService.reserveStock(order.getItems());     // 200ms
        emailService.sendConfirmation(order.getUserId());    // 500ms  
        analyticsService.trackOrder(order.getId());          // 100ms
        
        // Total time: 800ms + network overhead
        // If email service is down → entire request fails
        return order;
    }
}

// ✅ ASYNCHRONOUS - NON-BLOCKING (Good for scalability)
@Service
public class OrderServiceAsync {
    public Order createOrder(CreateOrderRequest request) {
        Order order = orderRepository.save(new Order(request));
        
        // FIRE AND FORGET - Return immediately
        eventPublisher.publish(new OrderCreatedEvent(order));
        
        // Total time: ~50ms (database write only)
        // Services process event in parallel
        // Failures handled independently
        return order;
    }
}
```

</div>

<div class="concept-section pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

**❌ Wrong answer:**
> "Asynchronous messaging makes the system faster because it's non-blocking."

**✅ Correct answer:**
> "Async messaging improves **perceived performance** and **decoupling**, but doesn't make individual operations faster. The total work is the same; we've just moved it off the critical path. Benefits are **scalability** (parallel processing), **resilience** (failure isolation), and **responsiveness** (quick response to users). However, it introduces **eventual consistency** and **complexity** in error handling."

**❌ Wrong answer:**
> "We should always use async messaging because it's more modern."

**✅ Correct answer:**
> "Async messaging has trade-offs. Use it when you need **decoupling**, **scalability**, or **resilience**. Stick with synchronous calls when you need **immediate consistency**, **simple error handling**, or **direct responses**. For example, authentication should be synchronous (need immediate result), but sending welcome emails can be async."

**❌ Wrong answer:**
> "Messages in the queue are guaranteed to be processed exactly once."

**✅ Correct answer:**
> "Message delivery guarantees depend on the broker and configuration:
- **At-most-once**: Fire and forget (fast but may lose messages)
- **At-least-once**: Guaranteed delivery but may duplicate (most common)
- **Exactly-once**: Ideal but hard/expensive to achieve

For **at-least-once**, consumers must be **idempotent** to handle duplicates safely. Use message deduplication (idempotency keys, database unique constraints) if needed."

</div>

</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Message Queues (RabbitMQ, Kafka)` · `Event-Driven Architecture` · `Saga Pattern` · `Event Sourcing` · `CQRS` · `Idempotency` · `Eventual Consistency`

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

### Message Queues (RabbitMQ, Kafka, Delivery Guarantees) {#message-queues}

<div class="concept-section definition">

📋 **Concept Definition**  
**Message Queue** is an **asynchronous communication pattern** where **producers** send messages to a **queue**, and **consumers** process them later, enabling **decoupling** (producer doesn't wait for consumer response). **Key principles**: Asynchronous Processing (producer non-blocking), Decoupling (producer/consumer don't know each other), Load Leveling (queue buffers burst traffic), Scalability (horizontal consumer scaling), Reliability (persistence, acknowledgment).

**Queue vs Topic (Pub/Sub)**:
```
Queue (Point-to-Point):
- 1 message → 1 consumer (compete for message)
- Example: Order processing (only 1 consumer processes)
- Load balancing: N consumers, each processes subset

Topic (Publish/Subscribe):
- 1 message → N consumers (broadcast)
- Example: Order created → Email + Analytics + Inventory services
- Each consumer gets copy of message
```

**RabbitMQ vs Kafka**:
```
RabbitMQ (Message Broker):
- Traditional queue (AMQP protocol)
- Message deleted after consumption (acknowledged)
- Push model (broker pushes to consumer)
- Low latency (< 1ms)
- Use case: Request/Reply, RPC, Task distribution

Kafka (Event Log):
- Distributed commit log (append-only)
- Messages retained (configurable retention)
- Pull model (consumer pulls from broker)
- High throughput (millions of msg/s)
- Use case: Event streaming, Analytics, Log aggregation
```

**Delivery Guarantees**:
```
At-Most-Once (fire and forget):
- Producer sends → No acknowledgment
- Message might be lost (no retry)
- Fastest, no durability
- Use case: Metrics, logs (loss acceptable)

At-Least-Once (acknowledged):
- Producer sends → Consumer acknowledges after processing
- Message might be duplicated (retry if ack timeout)
- Most common (balance performance + reliability)
- Use case: Order processing (idempotent handlers)

Exactly-Once (transactional):
- Producer sends → Consumer processes + acks in transaction
- No duplicates, no loss (strongest guarantee)
- Slowest (transactional overhead)
- Use case: Financial transactions (no duplicates allowed)
```

**Dead Letter Queue (DLQ)**:
```
Problem: Message processing fails repeatedly (poison message)
Solution: After N retries → Move to DLQ (manual inspection)

Example:
- Order message has invalid format
- Consumer retries 3 times → All fail
- → Move to DLQ (admin investigates)
```

</div>

<div class="concept-section why-important">

💡 **Why it matters?**

**1. Asynchronous processing (response time improvement)**
```javascript
// Synchronous (slow):
POST /orders
  1. Validate order (10ms)
  2. Process payment (500ms) ← Blocks
  3. Update inventory (200ms) ← Blocks
  4. Send email (300ms) ← Blocks
  5. Update analytics (100ms) ← Blocks
  Total: 1,110ms response time

// Asynchronous with queue (fast):
POST /orders
  1. Validate order (10ms)
  2. Save to DB (20ms)
  3. Publish OrderCreated event to queue (5ms)
  Total: 35ms response time (31x faster!)
  
  Background workers:
  - Payment worker processes payment (500ms)
  - Inventory worker updates stock (200ms)
  - Email worker sends confirmation (300ms)
  - Analytics worker updates stats (100ms)
  → User doesn't wait for these!
```

**2. Load leveling (burst traffic handling)**
```
Without queue:
- Black Friday traffic spike: 10,000 orders/second
- Server capacity: 1,000 orders/second
- → 9,000 requests fail (timeout, 503 errors)

With queue:
- 10,000 orders → Queue (accepts all)
- Consumers process at 1,000/second (steady rate)
- → All orders processed (might take 10 seconds, but no failures)
- → Queue acts as buffer
```

**3. Decoupling services (microservices architecture)**
```
Monolith tight coupling:
OrderService.createOrder() {
    paymentService.process();      // Direct call (coupling)
    inventoryService.reserve();    // Direct call (coupling)
    emailService.send();           // Direct call (coupling)
}
→ If EmailService down → Order creation fails!

Microservices with queue (loose coupling):
OrderService.createOrder() {
    queue.publish("order.created", order);  // Fire and forget
}

PaymentService listens to "order.created" → Processes payment
InventoryService listens to "order.created" → Reserves items
EmailService listens to "order.created" → Sends email

→ If EmailService down → Order still created!
→ Services independent (deploy separately)
```

**4. Industry adoption (Kafka at scale)**
```
LinkedIn (Kafka creators):
- 7 trillion messages/day
- 4.5 petabytes/day
- 4,000+ Kafka clusters

Netflix:
- 700 billion events/day via Kafka
- Real-time recommendations (user viewing data)
- Stream processing with Kafka Streams

Uber:
- 1 trillion messages/day via Kafka
- Real-time pricing (surge calculation)
- Driver location updates (every 4 seconds)
```

</div>

<div class="runnable-model">

**Runnable mental model**

**1. RabbitMQ Producer + Consumer (At-Least-Once)**
```java
// Add dependency: spring-boot-starter-amqp

// RabbitMQ Configuration
@Configuration
public class RabbitMQConfig {
    public static final String ORDER_QUEUE = "orders";
    public static final String ORDER_EXCHANGE = "order-exchange";
    public static final String ORDER_ROUTING_KEY = "order.created";
    
    @Bean
    public Queue orderQueue() {
        return new Queue(ORDER_QUEUE, true);  // durable = true (survives restart)
    }
    
    @Bean
    public TopicExchange orderExchange() {
        return new TopicExchange(ORDER_EXCHANGE);
    }
    
    @Bean
    public Binding binding() {
        return BindingBuilder.bind(orderQueue())
            .to(orderExchange())
            .with(ORDER_ROUTING_KEY);
    }
}

// Producer (Order Service)
@Service
public class OrderService {
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    public void createOrder(CreateOrderRequest request) {
        // 1. Save order to DB
        Order order = orderRepository.save(new Order(request));
        
        // 2. Publish event to queue (asynchronous)
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.ORDER_EXCHANGE,
            RabbitMQConfig.ORDER_ROUTING_KEY,
            order
        );
        
        System.out.println("Order created: " + order.getId());
        // User gets response immediately (no waiting for email/payment)
    }
}

// Consumer (Email Service)
@Service
public class EmailConsumer {
    @RabbitListener(queues = RabbitMQConfig.ORDER_QUEUE)
    public void handleOrderCreated(Order order) {
        System.out.println("Processing order: " + order.getId());
        
        // Send email (might take 300ms)
        emailService.sendOrderConfirmation(order);
        
        // If exception thrown → RabbitMQ requeues message (retry)
        // If success → Message acknowledged and deleted
    }
}

// Manual acknowledgment (more control)
@Service
public class PaymentConsumer {
    @RabbitListener(queues = "payments", ackMode = "MANUAL")
    public void processPayment(Order order, Channel channel, 
                               @Header(AmqpHeaders.DELIVERY_TAG) long tag) {
        try {
            paymentService.charge(order);
            
            // Acknowledge success (message deleted)
            channel.basicAck(tag, false);
            
        } catch (PaymentException e) {
            // Payment failed (e.g., insufficient funds)
            // → Send to DLQ (no retry)
            channel.basicNack(tag, false, false);  // requeue = false
            
        } catch (Exception e) {
            // Transient error (e.g., network timeout)
            // → Requeue for retry
            channel.basicNack(tag, false, true);  // requeue = true
        }
    }
}
```

**2. Kafka Producer + Consumer (Event Log)**
```java
// Add dependency: spring-kafka

// Kafka Configuration
@Configuration
public class KafkaConfig {
    @Bean
    public ProducerFactory<String, Order> producerFactory() {
        Map<String, Object> config = new HashMap<>();
        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        config.put(ProducerConfig.ACKS_CONFIG, "all");  // Wait for all replicas (durability)
        return new DefaultKafkaProducerFactory<>(config);
    }
    
    @Bean
    public KafkaTemplate<String, Order> kafkaTemplate() {
        return new KafkaTemplate<>(producerFactory());
    }
}

// Producer (Order Service)
@Service
public class OrderService {
    @Autowired
    private KafkaTemplate<String, Order> kafkaTemplate;
    
    public void createOrder(CreateOrderRequest request) {
        Order order = orderRepository.save(new Order(request));
        
        // Publish to Kafka topic (key = orderId for partitioning)
        kafkaTemplate.send("order-events", order.getId().toString(), order)
            .addCallback(
                result -> System.out.println("Sent to partition " + result.getRecordMetadata().partition()),
                ex -> System.err.println("Send failed: " + ex.getMessage())
            );
    }
}

// Consumer (Payment Service)
@Service
public class PaymentConsumer {
    @KafkaListener(topics = "order-events", groupId = "payment-group")
    public void handleOrderEvent(ConsumerRecord<String, Order> record,
                                 Acknowledgment acknowledgment) {
        Order order = record.value();
        System.out.println("Received order from partition " + record.partition() 
                         + " offset " + record.offset());
        
        try {
            paymentService.processPayment(order);
            
            // Manual commit (only after successful processing)
            acknowledgment.acknowledge();
            
        } catch (Exception e) {
            // Don't acknowledge → Kafka will redeliver
            System.err.println("Payment failed, will retry: " + e.getMessage());
        }
    }
}

// Multiple consumers (scaling)
// Consumer 1: processes partition 0
// Consumer 2: processes partition 1
// Consumer 3: processes partition 2
// → Parallel processing (load balanced by Kafka)
```

**3. Dead Letter Queue (DLQ) Pattern**
```java
// RabbitMQ DLQ Configuration
@Configuration
public class DLQConfig {
    @Bean
    public Queue orderQueue() {
        return QueueBuilder.durable("orders")
            .withArgument("x-dead-letter-exchange", "dlq-exchange")
            .withArgument("x-dead-letter-routing-key", "dlq-orders")
            .build();
    }
    
    @Bean
    public Queue dlqQueue() {
        return new Queue("dlq-orders", true);
    }
    
    @Bean
    public DirectExchange dlqExchange() {
        return new DirectExchange("dlq-exchange");
    }
    
    @Bean
    public Binding dlqBinding() {
        return BindingBuilder.bind(dlqQueue())
            .to(dlqExchange())
            .with("dlq-orders");
    }
}

// Consumer with retry + DLQ
@Service
public class OrderConsumer {
    private static final int MAX_RETRIES = 3;
    
    @RabbitListener(queues = "orders")
    public void processOrder(Order order, 
                             @Header("x-retry-count") Integer retryCount,
                             Channel channel,
                             @Header(AmqpHeaders.DELIVERY_TAG) long tag) {
        retryCount = (retryCount == null) ? 0 : retryCount;
        
        try {
            orderService.process(order);
            channel.basicAck(tag, false);  // Success
            
        } catch (Exception e) {
            if (retryCount >= MAX_RETRIES) {
                // Max retries reached → Send to DLQ
                System.err.println("Max retries reached, sending to DLQ: " + order.getId());
                channel.basicNack(tag, false, false);  // Don't requeue (goes to DLQ)
            } else {
                // Retry
                System.err.println("Retry " + (retryCount + 1) + " for order: " + order.getId());
                channel.basicNack(tag, false, true);  // Requeue
            }
        }
    }
}

// DLQ Consumer (manual inspection)
@Service
public class DLQConsumer {
    @RabbitListener(queues = "dlq-orders")
    public void handleDLQ(Order order) {
        // Log for manual inspection
        System.err.println("DLQ message: " + order.getId());
        
        // Send alert to ops team
        alertService.sendAlert("Order processing failed: " + order.getId());
        
        // Optionally: Store in DB for later retry
        dlqRepository.save(new DLQMessage(order, Instant.now()));
    }
}
```

**4. Kafka Partitioning (Ordering & Scaling)**
```java
// Order Service: Use orderId as key (same order always same partition)
@Service
public class OrderService {
    public void publishOrderEvent(OrderEvent event) {
        String key = event.getOrderId().toString();  // Partition by orderId
        
        kafkaTemplate.send("order-events", key, event);
        
        // Events for order 123:
        // - OrderCreated (partition 0, offset 100)
        // - PaymentProcessed (partition 0, offset 101)
        // - OrderShipped (partition 0, offset 102)
        // → Processed in order by consumer of partition 0
    }
}

// Consumer: Single-threaded per partition (ordered processing)
@KafkaListener(topics = "order-events", concurrency = "3")  // 3 consumers, 3 partitions
public void handleOrderEvent(OrderEvent event) {
    // Consumer 1 processes partition 0 sequentially
    // Consumer 2 processes partition 1 sequentially
    // Consumer 3 processes partition 2 sequentially
    // → Ordering preserved per partition
}
```

**5. Idempotent Message Handler**
```java
// Problem: At-Least-Once delivery → Duplicates possible
// Solution: Deduplication table

@Transactional
@RabbitListener(queues = "payments")
public void processPayment(PaymentRequest request) {
    String messageId = request.getMessageId();  // Unique ID
    
    // Check if already processed
    if (paymentRepository.existsByMessageId(messageId)) {
        System.out.println("Duplicate message, skipping: " + messageId);
        return;  // Idempotent (no-op)
    }
    
    // Process payment (only if not already processed)
    Payment payment = new Payment();
    payment.setMessageId(messageId);
    payment.setAmount(request.getAmount());
    paymentRepository.save(payment);
    
    account.balance -= request.getAmount();
    accountRepository.save(account);
}
```

**Decision Tree: RabbitMQ vs Kafka**
```javascript
// Choose based on requirements
if (throughput === 'high' || retention === 'persistent') {
    return "Kafka - High throughput (millions msg/s), event streaming";
}

if (latency === 'critical' && throughput === 'low') {
    return "RabbitMQ - Low latency (< 1ms), traditional queue";
}

if (pattern === 'streaming' || useCase === 'analytics') {
    return "Kafka - Event streaming, log aggregation, replay";
}

if (pattern === 'queue' || useCase === 'task-distribution') {
    return "RabbitMQ - Point-to-point queue, RPC patterns";
}
```

</div>

<div class="concept-section pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

**❌ Wrong answer:**
> "Message queue = synchronous communication where producer waits for consumer."

**✅ Correct answer:**
> "Message queue is **asynchronous** - producer publishes message and returns immediately (fire and forget). Consumer processes message later in background. Producer doesn't wait for consumer response. This enables **decoupling** and **non-blocking** operations."

**❌ Wrong answer:**
> "At-Least-Once delivery guarantees no duplicates."

**✅ Correct answer:**
> "At-Least-Once means messages are **delivered at least once**, possibly **multiple times** (duplicates possible due to network timeouts, retries). Consumers must be **idempotent** - processing same message N times produces same result. Use deduplication tables or natural idempotency (UPDATE vs INSERT)."

**❌ Wrong answer:**
> "Kafka is just faster RabbitMQ - use Kafka for everything."

**✅ Correct answer:**
> "Kafka and RabbitMQ serve different purposes:
- **RabbitMQ**: Message broker, messages deleted after consumption, low latency (< 1ms), use for task distribution, RPC
- **Kafka**: Event log, messages retained (replay possible), high throughput (millions msg/s), use for event streaming, analytics
Choose based on use case, not just performance."

**❌ Wrong answer:**
> "Kafka guarantees global FIFO ordering across all messages."

**✅ Correct answer:**
> "Kafka guarantees ordering **per partition**, not globally. Messages with same key go to same partition → ordered processing. Different partitions process in parallel → no global ordering. For global ordering, use single partition (but limits throughput to 1 consumer)."

**❌ Wrong answer:**
> "Send every failed message to Dead Letter Queue."

**✅ Correct answer:**
> "DLQ is for **permanent failures** (poison messages - invalid format, business logic errors). **Transient failures** (network timeout, DB pool exhausted) should be **retried** with exponential backoff. Only send to DLQ after max retries exhausted."

</div>

</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Asynchronous Messaging` · `Event-Driven Architecture` · `Microservices` · `Pub/Sub Pattern` · `Event Sourcing` · `CQRS` · `Distributed Systems` · `Idempotency`

</div>

### API Gateway {#api-gateway}

<div class="concept-section definition">

📋 **Concept Definition**  
**API Gateway** is a **single entry point** for clients in microservices architectures, acting as an intermediary layer between clients and backend services. **Core functions**: routing (forwards requests to appropriate services), authentication/authorization, rate limiting, load balancing, protocol translation (REST ↔ gRPC), request/response transformation, caching, and monitoring. Implements **cross-cutting concerns** centrally, avoiding duplication across services. **Common implementations**: Kong, AWS API Gateway, Azure API Management, Spring Cloud Gateway, Zuul. **Pattern**: Backend for Frontend (BFF) - separate gateways per client type (mobile, web, IoT).

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Single entry point**: Unified interface for clients, hides internal complexity
- **Cross-cutting concerns**: Authentication, rate limiting, logging in one place
- **Service evolution**: Backend changes don't affect clients (abstraction layer)
- **Protocol translation**: Different protocols between client and services
- **Security**: Centralized security policy enforcement

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// SPRING CLOUD GATEWAY - API GATEWAY IMPLEMENTATION

@Configuration
public class GatewayConfig {
    
    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
            // User Service routing
            .route("user-service", r -> r.path("/api/users/**")
                .filters(f -> f
                    .stripPrefix(1) // Remove /api from path
                    .addRequestHeader("X-Gateway", "true")
                    .circuitBreaker(config -> config
                        .setName("user-service-cb")
                        .setFallbackUri("forward:/fallback/users"))
                    .retry(config -> config
                        .setRetries(3)
                        .setBackoff(Duration.ofSeconds(1), Duration.ofSeconds(5), 2, false))
                )
                .uri("lb://user-service")) // Load balanced via service discovery
            
            // Product Service routing with rate limiting
            .route("product-service", r -> r.path("/api/products/**")
                .filters(f -> f
                    .stripPrefix(1)
                    .requestRateLimiter(config -> config
                        .setRateLimiter(redisRateLimiter())
                        .setKeyResolver(new IpKeyResolver())) // Rate limit by IP
                )
                .uri("lb://product-service"))
            
            // Order Service routing with authentication
            .route("order-service", r -> r.path("/api/orders/**")
                .filters(f -> f
                    .stripPrefix(1)
                    .filter(new JwtAuthenticationFilter()))
                .uri("lb://order-service"))
            
            // Payment Service routing with timeout
            .route("payment-service", r -> r.path("/api/payments/**")
                .filters(f -> f
                    .stripPrefix(1)
                    .filter(new TimeLimiterFilter(Duration.ofSeconds(5))))
                .uri("lb://payment-service"))
            .build();
    }
    
    @Bean
    public RedisRateLimiter redisRateLimiter() {
        return new RedisRateLimiter(10, 20); // 10 requests/sec, burst 20
    }
}

// Custom JWT Authentication Filter
@Component
public class JwtAuthenticationFilter implements GatewayFilter {
    
    @Autowired
    private JwtService jwtService;
    
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        
        // Extract JWT token from Authorization header
        String authHeader = request.getHeaders().getFirst("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
        
        String token = authHeader.substring(7);
        
        // Validate JWT token
        if (!jwtService.validateToken(token)) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
        
        // Extract user info and add to request headers
        String userId = jwtService.extractUserId(token);
        String roles = jwtService.extractRoles(token);
        
        ServerHttpRequest modifiedRequest = request.mutate()
            .header("X-User-Id", userId)
            .header("X-User-Roles", roles)
            .build();
        
        return chain.filter(exchange.mutate().request(modifiedRequest).build());
    }
}

// Fallback Controller (Circuit Breaker fallback)
@RestController
public class FallbackController {
    
    @RequestMapping("/fallback/users")
    public ResponseEntity<Map<String, String>> userFallback() {
        Map<String, String> response = Map.of(
            "message", "User service is temporarily unavailable",
            "status", "fallback",
            "timestamp", Instant.now().toString()
        );
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(response);
    }
    
    @RequestMapping("/fallback/products")
    public ResponseEntity<List<Product>> productFallback() {
        // Return cached products or empty list
        List<Product> cachedProducts = cacheService.getCachedProducts();
        return ResponseEntity.ok(cachedProducts);
    }
}

// Custom IP-based Key Resolver for Rate Limiting
public class IpKeyResolver implements KeyResolver {
    @Override
    public Mono<String> resolve(ServerWebExchange exchange) {
        return Mono.just(
            exchange.getRequest()
                .getRemoteAddress()
                .getAddress()
                .getHostAddress()
        );
    }
}

// Backend for Frontend (BFF) Pattern
@Configuration
public class BffGatewayConfig {
    
    // Mobile Gateway - optimized for mobile apps
    @Bean
    public RouteLocator mobileGateway(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("mobile-products", r -> r.path("/mobile/products/**")
                .filters(f -> f
                    .stripPrefix(1)
                    .modifyResponseBody(String.class, String.class, 
                        (exchange, body) -> Mono.just(optimizeForMobile(body))))
                .uri("lb://product-service"))
            .build();
    }
    
    // Web Gateway - optimized for web apps
    @Bean
    public RouteLocator webGateway(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("web-products", r -> r.path("/web/products/**")
                .filters(f -> f
                    .stripPrefix(1)
                    .addResponseHeader("Cache-Control", "public, max-age=3600"))
                .uri("lb://product-service"))
            .build();
    }
}

// Application.yml configuration
/*
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/api/users/**
          filters:
            - StripPrefix=1
            - name: CircuitBreaker
              args:
                name: userServiceCB
                fallbackUri: forward:/fallback/users
        
        - id: product-service
          uri: lb://product-service
          predicates:
            - Path=/api/products/**
          filters:
            - StripPrefix=1
            - name: RequestRateLimiter
              args:
                redis-rate-limiter.replenishRate: 10
                redis-rate-limiter.burstCapacity: 20
      
      globalcors:
        corsConfigurations:
          '[/**]':
            allowedOrigins: "https://example.com"
            allowedMethods:
              - GET
              - POST
              - PUT
              - DELETE
            allowedHeaders: "*"
            allowCredentials: true
*/
```

</div>

<div class="concept-section pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

**❌ Wrong answer:**
> "API Gateway will become a bottleneck in the system."

**✅ Correct answer:**
> "API Gateway is horizontally scalable - deploy multiple instances behind a load balancer. Use caching for frequently accessed data, implement proper connection pooling, and ensure stateless design. Modern gateways (Kong, Spring Cloud Gateway) handle millions of requests per second. The key is proper configuration and resource allocation."

**❌ Wrong answer:**
> "Put all business logic in the API Gateway for convenience."

**✅ Correct answer:**
> "API Gateway should handle **cross-cutting concerns only** (authentication, rate limiting, routing, logging). Business logic belongs in microservices. Violating this creates a monolithic gateway that defeats the purpose of microservices architecture and creates coupling."

**❌ Wrong answer:**
> "API Gateway is a single point of failure, so it's risky."

**✅ Correct answer:**
> "While API Gateway is a critical component, it's not a single point of failure if properly architected: deploy multiple instances with load balancer, implement circuit breakers for downstream services, use fallback responses, and ensure the gateway itself is stateless and can restart quickly."

</div>

</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Microservices` · `Service Discovery` · `Circuit Breaker` · `Load Balancing` · `Rate Limiting` · `Authentication` · `Observability` · `Backend for Frontend (BFF)`

</div>

### Service Discovery {#service-discovery}

<div class="concept-section definition">

📋 **Concept Definition**  
**Service Discovery** is a mechanism in microservices environments that **automatically detects and registers** network-available service instance addresses and ports. **Core components**: Service Registry (central catalog where services register themselves - Eureka, Consul, etcd), Service Discovery Client (queries registry and selects appropriate instance). Supports **dynamic IP addressing**, **auto-scaling**, and **health checking** - only healthy instances appear in registry. **Patterns**: Client-side discovery (client queries registry directly - Netflix Eureka), Server-side discovery (load balancer queries registry - AWS ELB), Service Mesh (infrastructure layer handles - Istio).

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Dynamic environment**: Service instances come and go (scaling, deployment)
- **No hardcoded URLs**: IP addresses and ports change dynamically
- **Health checking**: Only healthy instances are available
- **Load distribution**: Automatic load balancing across available instances
- **Zero-downtime deployment**: Old instances gradually replaced by new ones

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// EUREKA SERVICE DISCOVERY - COMPLETE EXAMPLE

// 1. EUREKA SERVER (Service Registry)
@SpringBootApplication
@EnableEurekaServer
public class ServiceRegistryApplication {
    public static void main(String[] args) {
        SpringApplication.run(ServiceRegistryApplication.class, args);
    }
}

// application.yml - Eureka Server
/*
server:
  port: 8761

eureka:
  client:
    register-with-eureka: false  # Server doesn't register itself
    fetch-registry: false
  server:
    enable-self-preservation: false  # Disable for development
*/

// 2. SERVICE REGISTRATION (User Service)
@SpringBootApplication
@EnableEurekaClient  // Or @EnableDiscoveryClient for generic
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}

// application.yml - User Service
/*
spring:
  application:
    name: user-service  # Service name in registry

server:
  port: 8081  # Can be random with ${random.int[8000,9000]}

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
    register-with-eureka: true
    fetch-registry: true
  instance:
    prefer-ip-address: true
    lease-renewal-interval-in-seconds: 10  # Heartbeat interval
    lease-expiration-duration-in-seconds: 30  # Expiration time
    instance-id: ${spring.application.name}:${random.value}
    health-check-url-path: /actuator/health
*/

// 3. SERVICE DISCOVERY CLIENT (Order Service)
@Service
public class OrderService {
    
    @Autowired
    private DiscoveryClient discoveryClient;
    
    @Autowired
    private LoadBalancerClient loadBalancer;
    
    @Autowired
    @LoadBalanced  // Enable client-side load balancing
    private RestTemplate restTemplate;
    
    // Manual discovery (low-level)
    public User getUserManual(Long userId) {
        // Get all instances of user-service
        List<ServiceInstance> instances = 
            discoveryClient.getInstances("user-service");
        
        if (instances.isEmpty()) {
            throw new ServiceUnavailableException("User service not available");
        }
        
        // Pick an instance (manual load balancing)
        ServiceInstance instance = instances.get(0);
        String url = instance.getUri().toString() + "/users/" + userId;
        
        return restTemplate.getForObject(url, User.class);
    }
    
    // LoadBalancer Client (automatic load balancing)
    public User getUserWithLoadBalancer(Long userId) {
        // LoadBalancer chooses best instance
        ServiceInstance instance = loadBalancer.choose("user-service");
        
        if (instance == null) {
            throw new ServiceUnavailableException("User service not available");
        }
        
        String url = instance.getUri().toString() + "/users/" + userId;
        return restTemplate.getForObject(url, User.class);
    }
    
    // Simplest: @LoadBalanced RestTemplate (recommended)
    public User getUserSimple(Long userId) {
        // Eureka automatically resolves "user-service" to actual instance
        // Ribbon automatically load balances across available instances
        return restTemplate.getForObject(
            "http://user-service/users/" + userId, 
            User.class
        );
    }
    
    // List all registered services
    public List<String> getAllServices() {
        return discoveryClient.getServices();
    }
    
    // Get service metadata
    public List<ServiceInstance> getServiceInstances(String serviceName) {
        return discoveryClient.getInstances(serviceName);
    }
}

// Configuration for @LoadBalanced RestTemplate
@Configuration
public class RestTemplateConfig {
    
    @Bean
    @LoadBalanced  // Enable Ribbon client-side load balancing
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}

// 4. HEALTH CHECK IMPLEMENTATION
@Component
public class UserServiceHealthIndicator implements HealthIndicator {
    
    @Autowired
    private DataSource dataSource;
    
    @Override
    public Health health() {
        try {
            // Check database connection
            Connection connection = dataSource.getConnection();
            boolean isValid = connection.isValid(1);
            connection.close();
            
            if (isValid) {
                return Health.up()
                    .withDetail("database", "connected")
                    .withDetail("service", "user-service")
                    .withDetail("timestamp", Instant.now())
                    .build();
            } else {
                return Health.down()
                    .withDetail("database", "connection invalid")
                    .build();
            }
        } catch (Exception e) {
            return Health.down()
                .withDetail("database", "disconnected")
                .withDetail("error", e.getMessage())
                .build();
        }
    }
}

// 5. LOAD BALANCING CONFIGURATION
@Configuration
public class LoadBalancerConfig {
    
    // Custom load balancing rule (default is Round Robin)
    @Bean
    public IRule ribbonRule() {
        return new WeightedResponseTimeRule(); // Faster instances get more traffic
        // Other options:
        // - new RoundRobinRule() - default
        // - new RandomRule() - random selection
        // - new BestAvailableRule() - least concurrent requests
        // - new AvailabilityFilteringRule() - filter out failing instances
    }
}

// application.yml - Load Balancer Configuration
/*
user-service:
  ribbon:
    NFLoadBalancerRuleClassName: com.netflix.loadbalancer.WeightedResponseTimeRule
    ConnectTimeout: 3000
    ReadTimeout: 3000
    MaxAutoRetries: 1
    MaxAutoRetriesNextServer: 2
    OkToRetryOnAllOperations: false
*/

// 6. SERVICE MESH ALTERNATIVE (Kubernetes)
/*
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

---
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
        livenessProbe:
          httpGet:
            path: /actuator/health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /actuator/health
            port: 8080
          initialDelaySeconds: 10
          periodSeconds: 5

# DNS: user-service.namespace.svc.cluster.local
# Kubernetes handles service discovery automatically
*/
```

</div>

<div class="concept-section pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

**❌ Wrong answer:**
> "Service Discovery is only needed in Kubernetes environments."

**✅ Correct answer:**
> "Service Discovery is beneficial in **any dynamic environment** where instances come and go - Docker Swarm, cloud environments (AWS ECS, Azure), traditional VMs with auto-scaling. Kubernetes has built-in service discovery, but other environments benefit from Eureka, Consul, or etcd."

**❌ Wrong answer:**
> "DNS is sufficient for service discovery, no need for Eureka/Consul."

**✅ Correct answer:**
> "DNS has limitations: doesn't support real-time health checking (TTL caching), no load balancing metadata (response times, zones), slow updates (DNS cache), no fine-grained control. Service registries like Eureka provide **real-time health checks**, **client-side load balancing**, and **instant updates** when instances change."

**❌ Wrong answer:**
> "Service Registry is a single point of failure."

**✅ Correct answer:**
> "Service Registries run in **cluster mode with replication** (Eureka with peers, Consul with Raft consensus). Clients **cache registry data locally**, so temporary registry unavailability doesn't prevent communication. Eureka's **self-preservation mode** prevents mass deregistration during network partitions."

**❌ Wrong answer:**
> "Client-side discovery is always better than server-side."

**✅ Correct answer:**
> "Trade-offs exist:
- **Client-side** (Eureka): Clients have full control, lower latency, but clients must implement discovery logic
- **Server-side** (AWS ELB + ECS): Simpler clients, centralized logic, but adds load balancer layer
- **Service Mesh** (Istio): Transparent to services, advanced features, but complex infrastructure
Choose based on infrastructure, team expertise, and requirements."

</div>

</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Microservices` · `Load Balancing` · `Health Checking` · `API Gateway` · `Circuit Breaker` · `Service Mesh` · `Dynamic Configuration` · `Zero-Downtime Deployment`

</div>

### Circuit Breaker Pattern {#circuit-breaker-pattern}

<div class="concept-section definition">

📋 **Concept Definition**  
**Circuit Breaker** is a fault tolerance design pattern preventing **cascading failures** in distributed systems by monitoring downstream service calls and automatically **breaking the circuit** when failure rate exceeds threshold. **Three states**: Closed (normal operation), Open (calls blocked, fast-fail), Half-Open (testing recovery with limited requests). Protects system from **resource exhaustion** (thread pool depletion, connection timeout) and provides **faster failure response** instead of waiting for timeouts. **Implementation**: Resilience4j, Hystrix (deprecated), Spring Cloud Circuit Breaker. **Metrics**: failure rate, slow call rate, call volume.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Cascading failure prevention**: One service failure doesn't crash entire system
- **Fast failure**: Quick error response instead of waiting for timeouts
- **System recovery**: Automatic recovery when downstream service heals
- **Resource protection**: Prevents thread pool and connection exhaustion
- **Graceful degradation**: Fallback responses maintain partial functionality

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// CIRCUIT BREAKER WITH RESILIENCE4J

// 1. ADD DEPENDENCY
/*
<dependency>
    <groupId>io.github.resilience4j</groupId>
    <artifactId>resilience4j-spring-boot2</artifactId>
    <version>2.0.2</version>
</dependency>
*/

// 2. APPLICATION.YML CONFIGURATION
/*
resilience4j:
  circuitbreaker:
    instances:
      payment-service:
        sliding-window-size: 10  # Track last 10 calls
        failure-rate-threshold: 50  # Open if 50% fail
        slow-call-rate-threshold: 50  # Open if 50% slow
        slow-call-duration-threshold: 2s  # > 2s = slow
        wait-duration-in-open-state: 30s  # Wait 30s before Half-Open
        permitted-number-of-calls-in-half-open-state: 3  # 3 test calls
        minimum-number-of-calls: 5  # Min 5 calls before calculation
        automatic-transition-from-open-to-half-open-enabled: true
        record-exceptions:
          - java.io.IOException
          - java.util.concurrent.TimeoutException
        ignore-exceptions:
          - com.example.BusinessException
  
  retry:
    instances:
      payment-service:
        max-attempts: 3
        wait-duration: 1s
        exponential-backoff-multiplier: 2
        enable-exponential-backoff: true
  
  timelimiter:
    instances:
      payment-service:
        timeout-duration: 5s
*/

// 3. SERVICE WITH CIRCUIT BREAKER
@Service
public class PaymentService {
    
    @Autowired
    private RestTemplate restTemplate;
    
    @Autowired
    private PaymentQueueService queueService;
    
    @Autowired
    private CircuitBreakerRegistry circuitBreakerRegistry;
    
    // Annotation-based Circuit Breaker
    @CircuitBreaker(name = "payment-service", fallbackMethod = "fallbackPayment")
    @Retry(name = "payment-service")  // Retry before circuit breaker
    @TimeLimiter(name = "payment-service")  // Timeout protection
    public CompletableFuture<PaymentResult> processPayment(PaymentRequest request) {
        return CompletableFuture.supplyAsync(() -> {
            // Call external payment gateway
            return externalPaymentGateway.charge(
                request.getCardNumber(),
                request.getAmount()
            );
        });
    }
    
    // Fallback method - same signature + Throwable parameter
    public CompletableFuture<PaymentResult> fallbackPayment(
            PaymentRequest request, 
            Throwable t) {
        
        log.warn("Payment fallback triggered: {}", t.getMessage());
        
        // Fallback strategy 1: Return cached response
        if (t instanceof CallNotPermittedException) {
            log.info("Circuit breaker OPEN, queuing payment for later");
            
            // Queue payment for async processing
            queueService.addToRetryQueue(request);
            
            PaymentResult result = new PaymentResult();
            result.setStatus(PaymentStatus.PENDING);
            result.setMessage("Payment queued for processing");
            result.setTransactionId("PENDING-" + UUID.randomUUID());
            
            return CompletableFuture.completedFuture(result);
        }
        
        // Fallback strategy 2: Return degraded response
        if (t instanceof TimeoutException) {
            log.warn("Payment timeout, returning degraded response");
            
            PaymentResult result = new PaymentResult();
            result.setStatus(PaymentStatus.TIMEOUT);
            result.setMessage("Payment processing, check status later");
            
            return CompletableFuture.completedFuture(result);
        }
        
        // Fallback strategy 3: Rethrow business exceptions
        if (t.getCause() instanceof BusinessException) {
            throw (BusinessException) t.getCause();
        }
        
        // Default fallback
        throw new PaymentException("Payment service unavailable", t);
    }
    
    // Programmatic Circuit Breaker usage
    public PaymentResult processPaymentProgrammatic(PaymentRequest request) {
        CircuitBreaker circuitBreaker = 
            circuitBreakerRegistry.circuitBreaker("payment-service");
        
        // Decorate supplier with circuit breaker
        Supplier<PaymentResult> decoratedSupplier = CircuitBreaker
            .decorateSupplier(circuitBreaker, () -> {
                return externalPaymentGateway.charge(
                    request.getCardNumber(),
                    request.getAmount()
                );
            });
        
        try {
            return decoratedSupplier.get();
        } catch (CallNotPermittedException e) {
            // Circuit is OPEN - provide fallback
            log.warn("Circuit breaker OPEN for payment service");
            return createFallbackResponse(request);
        }
    }
    
    // Manual circuit control
    public void forceOpenCircuit(String serviceName) {
        CircuitBreaker circuitBreaker = 
            circuitBreakerRegistry.circuitBreaker(serviceName);
        circuitBreaker.transitionToOpenState();
        log.info("Circuit breaker {} forced to OPEN", serviceName);
    }
    
    public void resetCircuit(String serviceName) {
        CircuitBreaker circuitBreaker = 
            circuitBreakerRegistry.circuitBreaker(serviceName);
        circuitBreaker.reset();
        log.info("Circuit breaker {} reset to CLOSED", serviceName);
    }
}

// 4. CIRCUIT BREAKER EVENT LISTENER
@Component
public class CircuitBreakerEventListener {
    
    @Autowired
    private CircuitBreakerRegistry circuitBreakerRegistry;
    
    @Autowired
    private AlertService alertService;
    
    @PostConstruct
    public void registerEventListeners() {
        circuitBreakerRegistry.circuitBreaker("payment-service")
            .getEventPublisher()
            .onStateTransition(event -> {
                log.info("Circuit breaker state transition: {} -> {}",
                    event.getStateTransition().getFromState(),
                    event.getStateTransition().getToState());
                
                // Send alert on state change
                if (event.getStateTransition().getToState() == CircuitBreaker.State.OPEN) {
                    alertService.sendAlert(
                        "Circuit breaker OPEN for payment-service",
                        AlertLevel.CRITICAL
                    );
                }
                
                if (event.getStateTransition().getToState() == CircuitBreaker.State.CLOSED) {
                    alertService.sendAlert(
                        "Circuit breaker CLOSED for payment-service - service recovered",
                        AlertLevel.INFO
                    );
                }
            })
            .onCallNotPermitted(event -> {
                log.warn("Call not permitted (circuit OPEN): {}", event);
                metrics.incrementCounter("circuit_breaker.calls_rejected");
            })
            .onFailureRateExceeded(event -> {
                log.error("Failure rate exceeded: {}%", event.getFailureRate());
                alertService.sendAlert(
                    String.format("Payment service failure rate: %.2f%%", event.getFailureRate()),
                    AlertLevel.WARNING
                );
            })
            .onSlowCallRateExceeded(event -> {
                log.warn("Slow call rate exceeded: {}%", event.getSlowCallRate());
            })
            .onSuccess(event -> {
                log.debug("Circuit breaker call succeeded: duration {}ms", 
                    event.getElapsedDuration().toMillis());
            })
            .onError(event -> {
                log.error("Circuit breaker call failed: {}", 
                    event.getThrowable().getMessage());
            });
    }
}

// 5. HEALTH CHECK ENDPOINT
@RestController
@RequestMapping("/actuator/circuit-breaker")
public class CircuitBreakerHealthController {
    
    @Autowired
    private CircuitBreakerRegistry circuitBreakerRegistry;
    
    @GetMapping("/{name}")
    public ResponseEntity<Map<String, Object>> getCircuitBreakerStatus(
            @PathVariable String name) {
        
        CircuitBreaker circuitBreaker = circuitBreakerRegistry.circuitBreaker(name);
        CircuitBreaker.Metrics metrics = circuitBreaker.getMetrics();
        
        Map<String, Object> status = new LinkedHashMap<>();
        status.put("name", name);
        status.put("state", circuitBreaker.getState().toString());
        status.put("failureRate", String.format("%.2f%%", metrics.getFailureRate()));
        status.put("slowCallRate", String.format("%.2f%%", metrics.getSlowCallRate()));
        status.put("numberOfBufferedCalls", metrics.getNumberOfBufferedCalls());
        status.put("numberOfFailedCalls", metrics.getNumberOfFailedCalls());
        status.put("numberOfSuccessfulCalls", metrics.getNumberOfSuccessfulCalls());
        status.put("numberOfSlowCalls", metrics.getNumberOfSlowCalls());
        status.put("numberOfNotPermittedCalls", metrics.getNumberOfNotPermittedCalls());
        
        HttpStatus httpStatus = circuitBreaker.getState() == CircuitBreaker.State.OPEN
            ? HttpStatus.SERVICE_UNAVAILABLE
            : HttpStatus.OK;
        
        return ResponseEntity.status(httpStatus).body(status);
    }
    
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllCircuitBreakers() {
        Map<String, Object> allStatus = new LinkedHashMap<>();
        
        circuitBreakerRegistry.getAllCircuitBreakers().forEach(cb -> {
            Map<String, Object> cbStatus = new LinkedHashMap<>();
            cbStatus.put("state", cb.getState().toString());
            cbStatus.put("failureRate", String.format("%.2f%%", cb.getMetrics().getFailureRate()));
            allStatus.put(cb.getName(), cbStatus);
        });
        
        return ResponseEntity.ok(allStatus);
    }
    
    @PostMapping("/{name}/force-open")
    public ResponseEntity<String> forceOpen(@PathVariable String name) {
        circuitBreakerRegistry.circuitBreaker(name).transitionToOpenState();
        return ResponseEntity.ok("Circuit breaker " + name + " forced to OPEN");
    }
    
    @PostMapping("/{name}/reset")
    public ResponseEntity<String> reset(@PathVariable String name) {
        circuitBreakerRegistry.circuitBreaker(name).reset();
        return ResponseEntity.ok("Circuit breaker " + name + " reset to CLOSED");
    }
}

// 6. CIRCUIT BREAKER STATE MACHINE
/*
CLOSED (Normal operation):
- All calls pass through
- Track success/failure metrics
- If failure rate > threshold → Transition to OPEN

OPEN (Circuit broken):
- All calls immediately rejected (CallNotPermittedException)
- Fast-fail, no call to downstream service
- After wait duration → Transition to HALF_OPEN

HALF_OPEN (Testing recovery):
- Allow limited number of test calls
- If test calls succeed → Transition to CLOSED (recovered)
- If test calls fail → Transition back to OPEN (still broken)

State transitions:
CLOSED --[failure rate > threshold]--> OPEN
OPEN --[wait duration elapsed]--> HALF_OPEN
HALF_OPEN --[test calls succeed]--> CLOSED
HALF_OPEN --[test calls fail]--> OPEN
*/
```

</div>

<div class="concept-section pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

**❌ Wrong answer:**
> "Circuit Breaker is just retry logic with a timeout."

**✅ Correct answer:**
> "Circuit Breaker is **more sophisticated** than retry. Retry attempts same call multiple times (3-5 attempts). Circuit Breaker **tracks failure patterns** over time (sliding window) and **prevents calls** when failure rate exceeds threshold, protecting the system from resource exhaustion. It also provides **automatic recovery** by testing service health periodically."

**❌ Wrong answer:**
> "Always use Circuit Breaker for all external service calls."

**✅ Correct answer:**
> "Use Circuit Breaker when:
- Downstream service prone to failures
- High latency/timeout issues
- Cascading failure risk
- Need graceful degradation

Don't use for:
- Fast, reliable internal services (overhead not worth it)
- One-time background jobs (not real-time)
- Services where fallback isn't meaningful

Trade-off: Added complexity vs protection. Evaluate based on failure probability and impact."

**❌ Wrong answer:**
> "When circuit is OPEN, keep retrying to check if service recovered."

**✅ Correct answer:**
> "When circuit is OPEN, calls are **immediately rejected** without hitting downstream service (fast-fail). This gives the service time to recover. Circuit Breaker **automatically transitions** to HALF_OPEN after configured wait duration to test recovery with limited calls. Manual retries during OPEN state defeat the purpose and prolong recovery."

**❌ Wrong answer:**
> "Circuit Breaker solves all resilience problems."

**✅ Correct answer:**
> "Circuit Breaker is **one pattern** in resilience toolkit. Combine with:
- **Retry**: Transient failures (network blip)
- **Timeout**: Prevent hanging calls
- **Bulkhead**: Isolate thread pools
- **Rate Limiter**: Protect from overload
- **Fallback**: Degraded functionality

Use patterns together for comprehensive resilience. Example: Retry → Circuit Breaker → Fallback."

</div>

</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Resilience Patterns` · `Microservices` · `API Gateway` · `Service Discovery` · `Fault Tolerance` · `Retry Pattern` · `Bulkhead Pattern` · `Chaos Engineering`

</div>

### Load Balancing {#load-balancing-detailed}

<div class="concept-section definition">

📋 **Concept Definition**  
**Load Balancer** is a **traffic distribution** system that routes incoming requests across multiple server instances to achieve **high availability**, **horizontal scaling**, and **optimal resource utilization**. Acting as a **single entry point**, it employs **intelligent routing algorithms** and **health checks** to ensure requests reach healthy, available servers. Load balancers operate at **Layer 4 (TCP/UDP)** or **Layer 7 (HTTP/HTTPS)** of the OSI model.

**Core principles:**
- **High Availability**: Automatic failover when servers crash (99.99% uptime)
- **Horizontal Scaling**: Add/remove servers dynamically without downtime
- **Health Checks**: Continuous monitoring of backend server health
- **Session Affinity**: Sticky sessions for stateful applications
- **SSL Termination**: Offload encryption/decryption from backend servers

**Load Balancer Types:**

**Layer 4 (Transport Layer)**:
- Routes based on **IP address + port** only
- **Fast** (no HTTP parsing, ~microseconds)
- No application-level awareness
- Examples: AWS Network Load Balancer (NLB), HAProxy in TCP mode
- Use case: High-throughput, low-latency requirements

**Layer 7 (Application Layer)**:
- Routes based on **HTTP headers, path, cookies, query parameters**
- **Slower** (HTTP parsing overhead, ~milliseconds)
- Advanced routing: path-based (`/api` vs `/static`), host-based, cookie-based
- Examples: AWS Application Load Balancer (ALB), NGINX, HAProxy in HTTP mode
- Use case: Microservices routing, content-based routing

**Load Balancing Algorithms:**

1. **Round-robin** (sequential distribution)
   - Requests distributed evenly: Server 1 → 2 → 3 → 1...
   - Pros: Simple, fair distribution
   - Cons: Ignores server capacity/load (treats all servers equally)
   - Use case: Homogeneous servers with similar specs

2. **Weighted Round-robin** (capacity-aware)
   - Servers assigned weight (capacity): weight 2 gets 2x traffic vs weight 1
   - Pros: Handles heterogeneous servers (different CPU/RAM)
   - Cons: Manual weight configuration needed
   - Use case: Mixed server specs (8-core vs 16-core instances)

3. **Least Connections** (connection-based)
   - Route to server with **fewest active connections**
   - Pros: Better for long-lived connections (WebSocket, streaming)
   - Cons: Connection count ≠ actual load (lightweight vs heavyweight requests)
   - Use case: Real-time applications, chat systems

4. **Least Response Time** (latency-based)
   - Route to server with **lowest response time + fewest connections**
   - Pros: Optimal user experience (fastest server selected)
   - Cons: Complex implementation (latency tracking overhead)
   - Use case: Performance-critical applications

5. **IP Hash / Sticky Sessions** (session affinity)
   - Client IP hashed → deterministically routes to same server
   - Pros: Session persistence without cookies
   - Cons: Uneven distribution if IPs clustered (corporate proxies)
   - Use case: Stateful applications (in-memory sessions)

6. **Random** (probabilistic)
   - Select random server for each request
   - Pros: Simple, statistically fair over time
   - Cons: No optimization
   - Use case: Stateless services with uniform load

</div>

<div class="concept-section why-important">

💡 **Why it matters?**

**1. High availability (99.99% uptime = 52 minutes downtime/year)**
```
Without load balancer (single server):
- Server crashes → 503 Service Unavailable
- Downtime: 10 minutes (until restart)
- Lost revenue: $10,000/minute × 10 = $100,000

With load balancer (3 servers):
- Server 1 crashes → Health check fails (3 consecutive failures)
- Load balancer stops routing to Server 1
- Traffic auto-routed to Server 2 + 3
- Zero downtime for users!

Uptime calculations:
- 1 server: 99% uptime (3.65 days/year downtime)
- 2 servers with LB: 99.99% uptime (52 minutes/year)
- 3 servers with LB: 99.999% uptime (5 minutes/year - "five nines")
```

**2. Horizontal scaling (unlimited capacity growth)**
```
Vertical scaling (scale up):
- Upgrade single server: 8 cores → 64 cores
- Limits: Hardware ceiling (expensive, ~$50k for 256-core server)
- Downtime: Required for hardware swap
- Single point of failure remains

Horizontal scaling (scale out with LB):
- Add cheap servers: 10 × $1k servers = $10k (vs $50k single server)
- No limits: 10 → 100 → 1000 servers
- No downtime: Live server addition
- Fault tolerance: Redundancy built-in

Real-world example (Black Friday):
- Normal: 1000 req/s → 2 servers (500 req/s each)
- Spike: 10,000 req/s → Auto-scale to 20 servers (500 req/s each)
- After spike: Scale down to 2 servers (save costs)
```

**3. Industry adoption at massive scale**
```
Netflix:
- AWS Elastic Load Balancer (ELB)
- 1 billion+ requests/day across 100k+ servers
- Auto-scaling: Add/remove instances every minute

Google:
- Global Load Balancing with Anycast
- 1 million+ requests/second
- Latency: <10ms to nearest datacenter

Amazon.com:
- Application Load Balancer (ALB)
- Path-based routing: /api → API servers, /images → CDN
- WebSocket support for real-time features

Facebook:
- Custom load balancer: Katran (XDP-based)
- 40 billion+ requests/day
- Sub-millisecond latency (100-200μs)
```

**4. SSL termination performance boost**
```
Without SSL termination:
- Each backend server decrypts HTTPS (CPU-intensive)
- 10 servers × 10ms SSL handshake = 100ms overhead per server
- Wasted CPU: ~30% on encryption/decryption

With SSL termination at LB:
- Load balancer handles HTTPS once
- Backend servers use plain HTTP (fast)
- CPU saved: 30% → used for business logic
- Simplified certificate management (1 place vs 10 servers)
```

</div>

<div class="runnable-model">

**Runnable mental model**

```java
// ===== NGINX LOAD BALANCER CONFIGURATION =====

// nginx.conf - Round-robin load balancing
upstream backend {
    server 192.168.1.101:8080;  // Server 1
    server 192.168.1.102:8080;  // Server 2
    server 192.168.1.103:8080;  // Server 3
}

server {
    listen 80;
    server_name example.com;
    
    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

// Weighted Round-robin (heterogeneous servers)
upstream backend_weighted {
    server 192.168.1.101:8080 weight=3;  // Powerful server (3x traffic)
    server 192.168.1.102:8080 weight=2;  // Medium server (2x traffic)
    server 192.168.1.103:8080 weight=1;  // Weak server (1x traffic)
}

// Least Connections algorithm
upstream backend_least_conn {
    least_conn;  // Route to server with fewest active connections
    server 192.168.1.101:8080;
    server 192.168.1.102:8080;
    server 192.168.1.103:8080;
}

// IP Hash (sticky sessions)
upstream backend_sticky {
    ip_hash;  // Same client IP → same server
    server 192.168.1.101:8080;
    server 192.168.1.102:8080;
    server 192.168.1.103:8080;
}

// Health checks (active probing)
upstream backend_health {
    server 192.168.1.101:8080 max_fails=3 fail_timeout=30s;
    server 192.168.1.102:8080 max_fails=3 fail_timeout=30s;
    server 192.168.1.103:8080 max_fails=3 fail_timeout=30s;
    
    // If 3 consecutive failures within 30s → mark server down
    // Retry after 30s to check if recovered
}

// SSL Termination
server {
    listen 443 ssl;
    server_name example.com;
    
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    
    location / {
        proxy_pass http://backend;  // Plain HTTP to backend
        proxy_set_header X-Forwarded-Proto https;
    }
}

// Path-based routing (microservices)
server {
    listen 80;
    server_name api.example.com;
    
    location /users {
        proxy_pass http://user-service;
    }
    
    location /orders {
        proxy_pass http://order-service;
    }
    
    location /products {
        proxy_pass http://product-service;
    }
}

upstream user-service {
    server 192.168.1.101:8081;
    server 192.168.1.102:8081;
}

upstream order-service {
    server 192.168.1.101:8082;
    server 192.168.1.102:8082;
}

upstream product-service {
    server 192.168.1.101:8083;
    server 192.168.1.102:8083;
}
```

```java
// ===== SPRING CLOUD LOAD BALANCER (CLIENT-SIDE) =====

// Add dependency: spring-cloud-starter-loadbalancer

// Service configuration
@Configuration
public class LoadBalancerConfig {
    
    @Bean
    public ServiceInstanceListSupplier serviceInstanceListSupplier(
            ConfigurableApplicationContext context) {
        return ServiceInstanceListSupplier.builder()
            .withDiscoveryClient()  // Use Eureka/Consul for service discovery
            .withHealthChecks()     // Health-aware load balancing
            .build(context);
    }
}

// RestTemplate with load balancing
@Configuration
public class RestTemplateConfig {
    
    @Bean
    @LoadBalanced  // Enable client-side load balancing
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}

// Client using load-balanced RestTemplate
@Service
public class OrderService {
    
    @Autowired
    @LoadBalanced
    private RestTemplate restTemplate;
    
    public User getUser(Long userId) {
        // "user-service" resolved via service discovery + load balanced
        return restTemplate.getForObject(
            "http://user-service/users/" + userId,
            User.class
        );
        
        // Round-robin across user-service instances:
        // Request 1 → user-service instance 1 (192.168.1.101:8080)
        // Request 2 → user-service instance 2 (192.168.1.102:8080)
        // Request 3 → user-service instance 3 (192.168.1.103:8080)
        // Request 4 → user-service instance 1 (cycle repeats)
    }
}

// Custom load balancer algorithm
@Configuration
public class CustomLoadBalancerConfig {
    
    @Bean
    public ReactorLoadBalancer<ServiceInstance> randomLoadBalancer(
            Environment environment,
            LoadBalancerClientFactory loadBalancerClientFactory) {
        
        String name = environment.getProperty(LoadBalancerClientFactory.PROPERTY_NAME);
        
        return new RandomLoadBalancer(
            loadBalancerClientFactory.getLazyProvider(name, ServiceInstanceListSupplier.class),
            name
        );
    }
}

// Custom weighted load balancer
public class WeightedLoadBalancer implements ReactorServiceInstanceLoadBalancer {
    
    private final ObjectProvider<ServiceInstanceListSupplier> serviceInstanceListSupplier;
    
    @Override
    public Mono<Response<ServiceInstance>> choose(Request request) {
        return serviceInstanceListSupplier.getIfAvailable()
            .get()
            .next()
            .map(instances -> {
                if (instances.isEmpty()) {
                    return new EmptyResponse();
                }
                
                // Calculate total weight
                int totalWeight = instances.stream()
                    .mapToInt(this::getWeight)
                    .sum();
                
                // Select instance based on weight
                int random = ThreadLocalRandom.current().nextInt(totalWeight);
                int cumulative = 0;
                
                for (ServiceInstance instance : instances) {
                    cumulative += getWeight(instance);
                    if (random < cumulative) {
                        return new DefaultResponse(instance);
                    }
                }
                
                return new DefaultResponse(instances.get(0));
            });
    }
    
    private int getWeight(ServiceInstance instance) {
        // Get weight from instance metadata (set in service registration)
        Map<String, String> metadata = instance.getMetadata();
        return Integer.parseInt(metadata.getOrDefault("weight", "1"));
    }
}
```

```java
// ===== SPRING CLOUD GATEWAY (API GATEWAY WITH LB) =====

// application.yml
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://user-service  // Load-balanced route
          predicates:
            - Path=/users/**
          filters:
            - name: CircuitBreaker
              args:
                name: userServiceCB
                fallbackUri: forward:/fallback
        
        - id: order-service
          uri: lb://order-service
          predicates:
            - Path=/orders/**
          filters:
            - name: Retry
              args:
                retries: 3
                statuses: BAD_GATEWAY,SERVICE_UNAVAILABLE
                backoff:
                  firstBackoff: 100ms
                  maxBackoff: 500ms
                  factor: 2

// Load balancer configuration
@Configuration
public class GatewayLoadBalancerConfig {
    
    @Bean
    @LoadBalanced
    public WebClient.Builder loadBalancedWebClientBuilder() {
        return WebClient.builder();
    }
}
```

```javascript
// ===== HEALTH CHECK IMPLEMENTATION (NODE.JS) =====

// Backend server - Health endpoint
const express = require('express');
const app = express();

let healthy = true;

app.get('/health', (req, res) => {
    if (healthy) {
        res.status(200).json({ status: 'UP', timestamp: Date.now() });
    } else {
        res.status(503).json({ status: 'DOWN', timestamp: Date.now() });
    }
});

app.get('/api/data', (req, res) => {
    // Business logic
    res.json({ data: 'Hello World' });
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, marking unhealthy');
    healthy = false;  // Stop accepting new traffic
    
    setTimeout(() => {
        console.log('Shutting down server');
        server.close(() => {
            process.exit(0);
        });
    }, 5000);  // Wait 5s for load balancer to detect unhealthy status
});

const server = app.listen(8080);
```

**Load Balancer Decision Tree:**
```javascript
function selectLoadBalancingStrategy(requirements) {
    if (requirements.stateful && requirements.sessionPersistence) {
        return "IP Hash / Sticky Sessions (session affinity required)";
    }
    
    if (requirements.longLivedConnections) {
        return "Least Connections (WebSocket, streaming)";
    }
    
    if (requirements.heterogeneousServers) {
        return "Weighted Round-robin (mixed server specs)";
    }
    
    if (requirements.performanceCritical) {
        return "Least Response Time (optimal latency)";
    }
    
    return "Round-robin (default, simple, fair distribution)";
}

// Examples
console.log(selectLoadBalancingStrategy({ 
    stateful: true, 
    sessionPersistence: true 
}));
// "IP Hash / Sticky Sessions"

console.log(selectLoadBalancingStrategy({ 
    longLivedConnections: true 
}));
// "Least Connections"
```

</div>

<div class="concept-section pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

**❌ Wrong answer:**
> "Load balancer just distributes traffic evenly across servers."

**✅ Correct answer:**
> "Load balancers distribute traffic using **algorithms** (round-robin, least connections, etc.) and **health checks** to ensure only healthy servers receive traffic. They also provide **SSL termination**, **session affinity**, and **Layer 4 vs Layer 7 routing** capabilities. Beyond simple distribution, they enable **high availability** (automatic failover) and **horizontal scaling** (dynamic server addition/removal)."

**❌ Wrong answer:**
> "Sticky sessions are always better for performance."

**✅ Correct answer:**
> "Sticky sessions are **necessary for stateful applications** (in-memory sessions) but have trade-offs:
- Pros: Session persistence, no session replication needed
- Cons: Uneven load distribution, server failure loses sessions, scaling complexity

Better approach: **Stateless services with external session storage** (Redis, database) allowing any server to handle any request. Use sticky sessions only when external storage isn't feasible."

**❌ Wrong answer:**
> "Health checks should ping servers every second for accuracy."

**✅ Correct answer:**
> "Frequent health checks add overhead. **Balance accuracy vs overhead**:
- Interval: 5-10 seconds (not 1 second)
- Consecutive failures: 2-3 before marking unhealthy (avoid false positives)
- Timeout: 2-3 seconds (not 30 seconds)
- Endpoint: Lightweight `/health` (not heavy `/api/data`)

Too frequent → network/CPU overhead. Too infrequent → slow failure detection."

**❌ Wrong answer:**
> "Layer 7 load balancer is always better than Layer 4."

**✅ Correct answer:**
> "Layer 7 (HTTP) provides **advanced routing** (path-based, host-based) but is **slower** (HTTP parsing). Layer 4 (TCP) is **faster** but only routes by IP/port.

Use Layer 4 when:
- High throughput / low latency critical
- Simple routing (all traffic to same backend pool)
- Non-HTTP protocols (MySQL, Redis)

Use Layer 7 when:
- Microservices routing (`/users` vs `/orders`)
- Content-based routing (headers, cookies)
- WebSocket support needed

Many systems use **both**: Layer 4 for initial routing, Layer 7 for microservices."

</div>

</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`High Availability` · `Horizontal Scaling` · `Health Checks` · `Session Affinity` · `SSL Termination` · `API Gateway` · `Service Discovery` · `Auto-scaling`

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

### CQRS (Command Query Responsibility Segregation) {#cqrs}

<div class="concept-section definition">

📋 **Concept Definition**  
**CQRS** is an architectural pattern that **separates read and write operations** into distinct models. The **Command model** handles state changes (create, update, delete) with normalized schemas and business rules, while the **Query model** is optimized for reads with denormalized views and fast queries. This enables **independent scaling** of reads and writes, different database technologies for each side, and simplified business logic. Often combined with **Event Sourcing** and **Eventual Consistency**. Read models are synchronized through **domain events** published by the command side.

**Key benefits:**
- **Performance optimization**: Separate optimization for reads vs writes
- **Scalability**: Independent scaling (10 read replicas, 2 write instances)
- **Flexibility**: Different data models (SQL for writes, NoSQL for reads)
- **Complexity management**: Simplified models for specific use cases

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **High-scale systems**: Read-heavy workloads benefit from specialized read models
- **Complex business logic**: Write side focuses on domain rules, read side on queries
- **Different access patterns**: Reporting vs transactional workloads
- **Microservices**: Natural fit for event-driven architectures

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// ===== COMMAND SIDE (Write Model) =====
// Normalized schema, ACID transactions, business rules

@Entity
@Table(name = "orders")
public class Order {
    @Id
    private Long id;
    private Long customerId;
    private OrderStatus status;
    private BigDecimal totalAmount;
    private LocalDateTime createdAt;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items = new ArrayList<>();
    
    // Business logic
    public void addItem(Long productId, int quantity, BigDecimal unitPrice) {
        OrderItem item = new OrderItem(this, productId, quantity, unitPrice);
        items.add(item);
        recalculateTotal();
    }
    
    public void confirm() {
        if (status != OrderStatus.PENDING) {
            throw new IllegalStateException("Only pending orders can be confirmed");
        }
        this.status = OrderStatus.CONFIRMED;
        // Publish domain event
        DomainEvents.publish(new OrderConfirmedEvent(this.id, this.customerId, this.totalAmount));
    }
}

// Command Handler - processes write operations
@Service
public class OrderCommandHandler {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private EventPublisher eventPublisher;
    
    @Transactional
    public void handle(CreateOrderCommand command) {
        // Business validation
        validateOrderCommand(command);
        
        // Create aggregate
        Order order = new Order();
        order.setCustomerId(command.getCustomerId());
        order.setStatus(OrderStatus.PENDING);
        
        for (OrderLineRequest item : command.getItems()) {
            order.addItem(item.getProductId(), item.getQuantity(), item.getUnitPrice());
        }
        
        Order savedOrder = orderRepository.save(order);
        
        // Publish domain event for read model synchronization
        eventPublisher.publish(new OrderCreatedEvent(
            savedOrder.getId(),
            savedOrder.getCustomerId(),
            savedOrder.getTotalAmount(),
            savedOrder.getItems()
        ));
    }
    
    @Transactional
    public void handle(ConfirmOrderCommand command) {
        Order order = orderRepository.findById(command.getOrderId())
            .orElseThrow(() -> new OrderNotFoundException(command.getOrderId()));
            
        order.confirm(); // Publishes OrderConfirmedEvent
        orderRepository.save(order);
    }
}

// ===== QUERY SIDE (Read Model) =====
// Denormalized, optimized for fast reads

@Document(collection = "order_summaries")
public class OrderSummary {
    @Id
    private String id;
    private Long orderId;
    private String customerName;
    private String customerEmail;
    private String status;
    private BigDecimal totalAmount;
    private LocalDateTime orderDate;
    private int itemCount;
    private List<OrderItemSummary> items;
    
    @Data
    public static class OrderItemSummary {
        private String productName;
        private String productCategory;
        private int quantity;
        private BigDecimal unitPrice;
        private String productImageUrl;
    }
}

// Query Handler - handles read operations
@Service
public class OrderQueryHandler {
    
    @Autowired
    private OrderSummaryRepository orderSummaryRepository;
    
    public OrderSummary getOrderSummary(Long orderId) {
        return orderSummaryRepository.findByOrderId(orderId)
            .orElseThrow(() -> new OrderNotFoundException(orderId));
    }
    
    public Page<OrderSummary> getCustomerOrders(Long customerId, Pageable pageable) {
        return orderSummaryRepository.findByCustomerIdOrderByOrderDateDesc(
            customerId, pageable);
    }
    
    public List<OrderSummary> getRecentOrders(int limit) {
        return orderSummaryRepository.findTop(limit, 
            Sort.by(Sort.Direction.DESC, "orderDate"));
    }
}

// Event Handler - synchronizes read model
@Component
public class OrderProjectionHandler {
    
    @Autowired
    private OrderSummaryRepository orderSummaryRepository;
    
    @Autowired
    private CustomerService customerService;
    
    @Autowired
    private ProductService productService;
    
    @EventListener
    @Async
    public void handle(OrderCreatedEvent event) {
        // Build denormalized read model
        Customer customer = customerService.getCustomer(event.getCustomerId());
        
        List<OrderItemSummary> itemSummaries = event.getItems().stream()
            .map(item -> {
                Product product = productService.getProduct(item.getProductId());
                OrderItemSummary summary = new OrderItemSummary();
                summary.setProductName(product.getName());
                summary.setProductCategory(product.getCategory());
                summary.setQuantity(item.getQuantity());
                summary.setUnitPrice(item.getUnitPrice());
                summary.setProductImageUrl(product.getImageUrl());
                return summary;
            })
            .collect(Collectors.toList());
        
        OrderSummary summary = new OrderSummary();
        summary.setOrderId(event.getOrderId());
        summary.setCustomerName(customer.getName());
        summary.setCustomerEmail(customer.getEmail());
        summary.setStatus("PENDING");
        summary.setTotalAmount(event.getTotalAmount());
        summary.setOrderDate(event.getCreatedAt());
        summary.setItemCount(event.getItems().size());
        summary.setItems(itemSummaries);
        
        orderSummaryRepository.save(summary);
    }
    
    @EventListener
    @Async
    public void handle(OrderConfirmedEvent event) {
        OrderSummary summary = orderSummaryRepository.findByOrderId(event.getOrderId())
            .orElseThrow(() -> new OrderNotFoundException(event.getOrderId()));
            
        summary.setStatus("CONFIRMED");
        orderSummaryRepository.save(summary);
    }
}
```

**Architecture comparison:**
```
Traditional (Shared Model):
┌─────────────────┐
│  Controllers    │
├─────────────────┤
│  Services       │
├─────────────────┤
│  Domain Model   │◄─── Same model for read & write
├─────────────────┤
│  Database       │
└─────────────────┘

CQRS (Separated Models):
┌──────────────┐          ┌──────────────┐
│  Commands    │          │   Queries    │
├──────────────┤          ├──────────────┤
│ Write Model  │          │  Read Model  │
│ (Normalized) │          │(Denormalized)│
├──────────────┤          ├──────────────┤
│  Write DB    │─Events──►│   Read DB    │
│ (PostgreSQL) │          │  (MongoDB)   │
└──────────────┘          └──────────────┘
```

</div>

<div class="concept-section pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

**❌ Wrong answer:**
> "CQRS always means using two separate databases."

**✅ Correct answer:**
> "CQRS can be implemented at different levels: **Level 1** uses separate read/write DTOs with same DB, **Level 2** uses different databases (SQL for writes, NoSQL for reads), **Level 3** adds Event Sourcing. The complexity should match your needs - simple apps can benefit from Level 1 without separate databases."

**❌ Wrong answer:**
> "CQRS guarantees immediate consistency between read and write models."

**✅ Correct answer:**
> "CQRS typically uses **eventual consistency** - the read model is synchronized asynchronously via events. This is acceptable for most use cases (e.g., displaying order status can be 100ms behind). For scenarios requiring strong consistency, stick with traditional architectures or use synchronous projections."

**❌ Wrong answer:**
> "Use CQRS for every application because it's more scalable."

**✅ Correct answer:**
> "CQRS adds complexity and should be used when you have: **different optimization needs** for reads/writes, **high read-to-write ratio**, **complex reporting requirements**, or **event-driven architecture**. For simple CRUD apps, traditional architecture is simpler and sufficient."

</div>

</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Event Sourcing` · `Event-Driven Architecture` · `Eventual Consistency` · `Domain-Driven Design` · `Microservices` · `Database per Service`

</div>

### Event Sourcing {#event-sourcing}

<div class="concept-section definition">

📋 **Concept Definition**  
**Event Sourcing** is a data storage pattern where **application state is stored as a sequence of immutable events** rather than current state. Every state change triggers a **domain event** saved to an **event store** with timestamp. Current state is reconstructed by **replaying events**. Provides **complete audit trail**, **temporal queries** (state at any point in time), **event replay** for debugging or new features, and natural integration with **CQRS** and **event-driven architectures**. Trade-off: increased complexity vs. powerful audit and analytics capabilities.

**Core concepts:**
- **Event Store**: Append-only log of all events
- **Aggregate**: Entity whose state is derived from events
- **Snapshots**: Periodic state capture for performance
- **Event Replay**: Reconstruct state by replaying events
- **Projections**: Read models built from event stream

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Complete audit trail**: Every change tracked forever
- **Time travel**: Reconstruct past state at any point
- **Debugging**: Reproduce bugs by replaying events
- **Business insights**: Analyze event stream for patterns
- **Compliance**: Financial/medical systems requiring full history

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Domain Events - immutable records of state changes
public abstract class DomainEvent {
    private final String eventId;
    private final LocalDateTime occurredAt;
    private final Long aggregateId;
    private final Long version;
    
    public DomainEvent(Long aggregateId, Long version) {
        this.eventId = UUID.randomUUID().toString();
        this.occurredAt = LocalDateTime.now();
        this.aggregateId = aggregateId;
        this.version = version;
    }
}

public class AccountCreatedEvent extends DomainEvent {
    private final String accountNumber;
    private final String ownerName;
    private final BigDecimal initialBalance;
}

public class MoneyDepositedEvent extends DomainEvent {
    private final BigDecimal amount;
    private final String description;
}

public class MoneyWithdrawnEvent extends DomainEvent {
    private final BigDecimal amount;
    private final String description;
}

// Aggregate Root - reconstructed from events
public class BankAccount {
    private Long id;
    private String accountNumber;
    private String ownerName;
    private BigDecimal balance;
    private Long version;
    
    private final List<DomainEvent> uncommittedEvents = new ArrayList<>();
    
    // Factory method - new aggregate
    public static BankAccount createAccount(String accountNumber, String ownerName, 
                                          BigDecimal initialBalance) {
        BankAccount account = new BankAccount();
        account.applyEvent(new AccountCreatedEvent(
            null, 0L, accountNumber, ownerName, initialBalance));
        return account;
    }
    
    // Business methods - generate events
    public void deposit(BigDecimal amount, String description) {
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
        applyEvent(new MoneyDepositedEvent(id, version + 1, amount, description));
    }
    
    public void withdraw(BigDecimal amount, String description) {
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
        if (balance.compareTo(amount) < 0) {
            throw new InsufficientBalanceException("Insufficient balance");
        }
        applyEvent(new MoneyWithdrawnEvent(id, version + 1, amount, description));
    }
    
    // Event application - state changes
    private void applyEvent(DomainEvent event) {
        if (event instanceof AccountCreatedEvent) {
            apply((AccountCreatedEvent) event);
        } else if (event instanceof MoneyDepositedEvent) {
            apply((MoneyDepositedEvent) event);
        } else if (event instanceof MoneyWithdrawnEvent) {
            apply((MoneyWithdrawnEvent) event);
        }
        this.version = event.getVersion();
        this.uncommittedEvents.add(event);
    }
    
    private void apply(AccountCreatedEvent event) {
        this.id = event.getAggregateId();
        this.accountNumber = event.getAccountNumber();
        this.ownerName = event.getOwnerName();
        this.balance = event.getInitialBalance();
    }
    
    private void apply(MoneyDepositedEvent event) {
        this.balance = this.balance.add(event.getAmount());
    }
    
    private void apply(MoneyWithdrawnEvent event) {
        this.balance = this.balance.subtract(event.getAmount());
    }
    
    // Reconstruction from history
    public static BankAccount fromEvents(Long id, List<DomainEvent> events) {
        BankAccount account = new BankAccount();
        account.id = id;
        
        for (DomainEvent event : events) {
            account.applyEvent(event);
        }
        
        account.uncommittedEvents.clear(); // Already persisted
        return account;
    }
}

// Event Store - persistence
@Service
public class EventStore {
    
    @Autowired
    private EventRepository eventRepository;
    
    @Transactional
    public void saveEvents(Long aggregateId, List<DomainEvent> events, Long expectedVersion) {
        // Optimistic locking
        Long currentVersion = getCurrentVersion(aggregateId);
        if (!Objects.equals(currentVersion, expectedVersion)) {
            throw new ConcurrencyException("Aggregate modified by another transaction");
        }
        
        // Save events
        for (DomainEvent event : events) {
            EventEntity entity = new EventEntity();
            entity.setEventId(event.getEventId());
            entity.setAggregateId(aggregateId);
            entity.setEventType(event.getClass().getSimpleName());
            entity.setEventData(serializeEvent(event));
            entity.setVersion(event.getVersion());
            entity.setOccurredAt(event.getOccurredAt());
            
            eventRepository.save(entity);
        }
    }
    
    public List<DomainEvent> getEvents(Long aggregateId) {
        List<EventEntity> entities = eventRepository
            .findByAggregateIdOrderByVersion(aggregateId);
        return entities.stream()
            .map(this::deserializeEvent)
            .collect(Collectors.toList());
    }
}

// Snapshots for performance
@Service
public class SnapshotService {
    
    public void createSnapshot(BankAccount account) {
        AccountSnapshot snapshot = new AccountSnapshot();
        snapshot.setAggregateId(account.getId());
        snapshot.setVersion(account.getVersion());
        snapshot.setAccountNumber(account.getAccountNumber());
        snapshot.setBalance(account.getBalance());
        snapshot.setCreatedAt(LocalDateTime.now());
        
        snapshotRepository.save(snapshot);
    }
    
    public BankAccount loadFromSnapshot(Long aggregateId) {
        // Load latest snapshot
        AccountSnapshot snapshot = snapshotRepository
            .findLatestByAggregateId(aggregateId);
            
        if (snapshot == null) {
            return null;
        }
        
        // Reconstruct from snapshot
        BankAccount account = BankAccount.fromSnapshot(snapshot);
        
        // Apply events after snapshot
        List<DomainEvent> recentEvents = eventStore
            .getEventsAfterVersion(aggregateId, snapshot.getVersion());
            
        for (DomainEvent event : recentEvents) {
            account.apply(event);
        }
        
        return account;
    }
}
```

**Event sourcing flow:**
```
1. Command received: withdraw($100)
2. Load aggregate from events (or snapshot + recent events)
3. Execute business logic: account.withdraw($100)
4. Generate event: MoneyWithdrawnEvent(amount=$100)
5. Persist event to event store
6. Update projections asynchronously
7. Return response to client
```

</div>

<div class="concept-section pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

**❌ Wrong answer:**
> "Event Sourcing means you can never delete data, even for GDPR compliance."

**✅ Correct answer:**
> "GDPR-compliant Event Sourcing uses **encryption**: personal data is encrypted with user-specific keys. When a user requests deletion, delete the encryption key - the events remain but are cryptographically unreadable. Alternatively, use **pseudonymization** or **event rewriting** (complex but possible)."

**❌ Wrong answer:**
> "Event Sourcing is always slower than traditional CRUD because you have to replay all events."

**✅ Correct answer:**
> "Event Sourcing with **snapshots** is actually fast: store periodic snapshots (e.g., every 100 events), then replay only recent events. For a 1000-event aggregate with snapshots every 100 events, you replay max 100 events. Plus, writes are append-only (faster than updates), and reads use optimized projections."

**❌ Wrong answer:**
> "Event Sourcing solves all data problems."

**✅ Correct answer:**
> "Event Sourcing adds complexity: event schema evolution, snapshot strategies, eventual consistency, increased storage, and more complex queries. Use it when you need: **audit trail**, **temporal queries**, **event replay**, or **complex domain logic**. For simple CRUD, stick with traditional approaches."

</div>

</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`CQRS` · `Domain-Driven Design` · `Event-Driven Architecture` · `Eventual Consistency` · `Audit Trail` · `Time Travel Debugging`

</div>

### Saga Pattern {#saga-pattern}

<div class="concept-section definition">

📋 **Concept Definition**  
**Saga Pattern** manages **distributed transactions** across microservices by breaking them into a sequence of **local transactions** with **compensating actions** for rollback. Two implementations: **Orchestration** (central coordinator manages workflow) and **Choreography** (services react to events independently). Provides **eventual consistency** in distributed systems where traditional ACID transactions are impractical. Each step publishes events; failures trigger compensation in reverse order.

**Key concepts:**
- **Local transaction**: Each service's atomic operation
- **Compensating transaction**: Undo/rollback operation
- **Saga coordinator**: Manages orchestrated sagas
- **Saga state**: Tracks progress and handles failures

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Distributed transactions**: Coordinate operations across multiple services
- **Data consistency**: Eventual consistency in microservices
- **Failure handling**: Automatic rollback via compensations
- **Long-running processes**: Handle workflows spanning hours or days

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Saga Events
public class OrderSagaStartedEvent {
    private String sagaId;
    private CreateOrderRequest orderRequest;
}

public class InventoryReservedEvent {
    private String sagaId;
    private Long orderId;
    private List<ReservedItem> items;
}

public class PaymentProcessedEvent {
    private String sagaId;
    private Long orderId;
    private String transactionId;
}

// Orchestration Pattern - Central coordinator
@Component
public class OrderSagaOrchestrator {
    
    @EventListener
    public void handle(OrderSagaStartedEvent event) {
        String sagaId = event.getSagaId();
        
        // Step 1: Reserve inventory
        try {
            inventoryService.reserveItems(event.getOrderRequest().getItems());
            publishEvent(new InventoryReservedEvent(sagaId, items));
        } catch (Exception e) {
            publishEvent(new InventoryReservationFailedEvent(sagaId, e.getMessage()));
        }
    }
    
    @EventListener
    public void handle(InventoryReservedEvent event) {
        // Step 2: Process payment
        try {
            String txId = paymentService.processPayment(amount);
            publishEvent(new PaymentProcessedEvent(event.getSagaId(), txId));
        } catch (Exception e) {
            // Compensate: Release inventory
            inventoryService.releaseReservation(event.getItems());
            publishEvent(new PaymentFailedEvent(event.getSagaId()));
        }
    }
    
    @EventListener
    public void handle(PaymentProcessedEvent event) {
        // Step 3: Complete order
        orderService.confirmOrder(event.getOrderId());
        publishEvent(new OrderSagaCompletedEvent(event.getSagaId()));
    }
}

// Choreography Pattern - Decentralized
@Service
public class InventoryService {
    
    @EventListener
    public void handle(OrderCreatedEvent event) {
        try {
            reserveItems(event.getItems());
            eventPublisher.publish(new InventoryReservedEvent(event.getOrderId()));
        } catch (Exception e) {
            eventPublisher.publish(new InventoryReservationFailedEvent(event.getOrderId()));
        }
    }
    
    @EventListener
    public void handle(OrderCancelledEvent event) {
        // Compensation
        releaseReservation(event.getOrderId());
    }
}

@Service
public class PaymentService {
    
    @EventListener
    public void handle(InventoryReservedEvent event) {
        try {
            String txId = processPayment(event.getAmount());
            eventPublisher.publish(new PaymentProcessedEvent(event.getOrderId(), txId));
        } catch (Exception e) {
            eventPublisher.publish(new PaymentFailedEvent(event.getOrderId()));
        }
    }
    
    @EventListener
    public void handle(OrderCancelledEvent event) {
        // Compensation
        if (event.getTransactionId() != null) {
            refundPayment(event.getTransactionId());
        }
    }
}
```

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Distributed Transactions` · `Event-Driven Architecture` · `Compensating Transactions` · `Eventual Consistency` · `Microservices` · `State Machines`

</div>

### Domain-Driven Design (DDD) {#domain-driven-design}

<div class="concept-section definition">

📋 **Concept Definition**  
**Domain-Driven Design** is a software development approach focusing on complex business logic (**domain**). Core building blocks: **Entities** (identity-based), **Value Objects** (immutable, value-based), **Aggregates** (consistency boundaries), **Repositories** (persistence abstraction), **Domain Services** (business logic spanning aggregates), **Domain Events** (something happened). Key concepts: **Ubiquitous Language** (shared vocabulary), **Bounded Context** (explicit boundaries), **Context Map** (relationships between contexts).

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Complex domains**: Manage business complexity effectively
- **Ubiquitous language**: Shared understanding between business and tech
- **Bounded contexts**: Clear service boundaries in microservices
- **Rich domain models**: Business logic encapsulated in objects

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Value Object - immutable, behavior-rich
@Value
public class Money {
    BigDecimal amount;
    Currency currency;
    
    public Money add(Money other) {
        if (!this.currency.equals(other.currency)) {
            throw new CurrencyMismatchException();
        }
        return new Money(this.amount.add(other.amount), this.currency);
    }
}

// Entity - identity matters
@Entity
public class Customer {
    @Id
    private CustomerId id;
    private String name;
    private Email email;
    
    public void changeEmail(Email newEmail) {
        if (this.status == CustomerStatus.INACTIVE) {
            throw new InactiveCustomerException();
        }
        this.email = newEmail;
        DomainEvents.publish(new CustomerEmailChangedEvent(this.id, newEmail));
    }
}

// Aggregate Root - consistency boundary
@Entity
public class Order {
    @Id
    private OrderId id;
    private CustomerId customerId;
    @OneToMany(cascade = CascadeType.ALL)
    private List<OrderLine> orderLines = new ArrayList<>();
    
    // Factory method
    public static Order createOrder(CustomerId customerId, List<OrderLineRequest> requests) {
        Order order = new Order();
        order.id = OrderId.generate();
        order.customerId = customerId;
        
        for (OrderLineRequest request : requests) {
            order.addOrderLine(request);
        }
        
        return order;
    }
    
    // Business invariant
    public void confirm() {
        if (status != OrderStatus.PENDING) {
            throw new OrderStateException("Can only confirm pending orders");
        }
        if (orderLines.isEmpty()) {
            throw new EmptyOrderException();
        }
        this.status = OrderStatus.CONFIRMED;
    }
}

// Domain Service - logic spanning aggregates
@Service
public class OrderingService {
    
    public Order placeOrder(CustomerId customerId, List<OrderLineRequest> requests) {
        Customer customer = customerRepository.findById(customerId)
            .orElseThrow(() -> new CustomerNotFoundException());
            
        Money totalAmount = calculateTotal(requests);
        if (!customer.canPlaceOrder(totalAmount)) {
            throw new OrderNotAllowedException();
        }
        
        return Order.createOrder(customerId, requests);
    }
}
```

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Bounded Context` · `Ubiquitous Language` · `Aggregates` · `Value Objects` · `Domain Events` · `CQRS` · `Event Sourcing`

</div>

### Serverless Architecture {#serverless-architecture}

<div class="concept-section definition">

📋 **Concept Definition**  
**Serverless** is a cloud computing model where the provider manages infrastructure automatically. Developers deploy **functions** (FaaS - Function as a Service) that run on-demand, scale automatically from 0 to millions, and charge only for actual execution time. Key platforms: **AWS Lambda**, **Azure Functions**, **Google Cloud Functions**. Characteristics: **event-driven**, **stateless**, **auto-scaling**, **pay-per-use**. Ideal for: API backends, data processing, scheduled tasks, event handlers.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Cost efficiency**: Pay only for actual execution (no idle servers)
- **Auto-scaling**: Automatic scaling from 0 to millions of requests
- **Reduced ops**: No server management, patching, or provisioning
- **Event-driven**: Natural fit for event-driven architectures

</div>

<div class="runnable-model">

**Runnable mental model**
```javascript
// AWS Lambda - User Registration
exports.handler = async (event) => {
    const userData = JSON.parse(event.body);
    
    try {
        // Validate
        if (!userData.email || !userData.name) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Email and name required' })
            };
        }
        
        // Save to DynamoDB
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        await dynamodb.put({
            TableName: 'Users',
            Item: {
                id: generateUUID(),
                email: userData.email,
                name: userData.name,
                createdAt: new Date().toISOString()
            }
        }).promise();
        
        // Publish event to SNS
        const sns = new AWS.SNS();
        await sns.publish({
            TopicArn: process.env.USER_REGISTERED_TOPIC,
            Message: JSON.stringify(userData)
        }).promise();
        
        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'User registered' })
        };
        
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal error' })
        };
    }
};

// Event-driven - Welcome email
exports.sendWelcomeEmail = async (event) => {
    for (const record of event.Records) {
        const message = JSON.parse(record.Sns.Message);
        
        const ses = new AWS.SES();
        await ses.sendEmail({
            Source: 'noreply@example.com',
            Destination: { ToAddresses: [message.email] },
            Message: {
                Subject: { Data: 'Welcome!' },
                Body: {
                    Html: { Data: `<h1>Welcome ${message.name}!</h1>` }
                }
            }
        }).promise();
    }
};
```

**Serverless.yml configuration:**
```yaml
service: user-management

provider:
  name: aws
  runtime: nodejs14.x

functions:
  registerUser:
    handler: handlers/register.handler
    events:
      - http:
          path: /users
          method: post
          cors: true

  sendWelcomeEmail:
    handler: handlers/email.sendWelcomeEmail
    events:
      - sns:
          arn: !Ref UserRegisteredTopic

resources:
  Resources:
    UsersTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: Users
        AttributeDefinitions:
          - AttributeName: id
            AttributeType: S
        KeySchema:
          - AttributeName: id
            KeyType: HASH
```

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Function as a Service (FaaS)` · `Event-Driven Architecture` · `Cloud Computing` · `Auto-Scaling` · `Pay-Per-Use` · `AWS Lambda` · `Azure Functions`

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

## SOLID Principles in Detail

### SRP – Single Responsibility Principle

A class should have only one reason to change.

**❌ Wrong approach - Multiple responsibilities:**
```java
// BAD - Multiple responsibilities in one class
class User {
    private String name;
    private String email;
    
    public void save() { /* database operation */ }
    public void sendEmail(String msg) { /* email sending */ }
    public boolean validate() { /* validation */ }
}
```

**✅ Correct approach - Separated responsibilities:**
```java
// GOOD - Single responsibility per class
class User {
    private String name;
    private String email;
    // Only data holder
}

class UserRepository {
    public void save(User user) { /* database operation */ }
}

class EmailService {
    public void sendEmail(User user, String msg) { /* email sending */ }
}

class UserValidator {
    public boolean validate(User user) { /* validation */ }
}
```

### OCP – Open/Closed Principle

Software entities should be open for extension, but closed for modification.

```java
// Strategy pattern for extensibility
interface DiscountStrategy {
    double calculateDiscount(double amount);
}

class RegularDiscount implements DiscountStrategy {
    public double calculateDiscount(double amount) { 
        return amount * 0.05; 
    }
}

class PremiumDiscount implements DiscountStrategy {
    public double calculateDiscount(double amount) { 
        return amount * 0.1; 
    }
}

class PriceCalculator {
    private DiscountStrategy strategy;
    
    public PriceCalculator(DiscountStrategy strategy) { 
        this.strategy = strategy; 
    }
    
    public double calculate(double base) { 
        return base - strategy.calculateDiscount(base); 
    }
}

// Add new discount types without modifying existing code
class VIPDiscount implements DiscountStrategy {
    public double calculateDiscount(double amount) { 
        return amount * 0.2; 
    }
}
```

### LSP – Liskov Substitution Principle

Subtypes must be substitutable for their base types.

```java
abstract class Bird { 
    abstract void eat(); 
}

class Sparrow extends Bird { 
    void eat() { /* ... */ } 
    void fly() { /* sparrows can fly */ }
}

class Penguin extends Bird { 
    void eat() { /* ... */ } 
    // Penguins can't fly - correct LSP (no fly method)
}

// Better approach with interface segregation
interface Flyable { 
    void fly(); 
}

class Sparrow extends Bird implements Flyable { 
    void fly() { /* implementation */ } 
}

class Penguin extends Bird { 
    // Not flyable - correct
}
```

### ISP – Interface Segregation Principle

Clients should not be forced to depend on interfaces they don't use.

```java
// ❌ BAD - "Fat interface"
interface Worker { 
    void work(); 
    void eat(); 
    void sleep(); 
}

// ✅ GOOD - Segregated interfaces
interface Workable { 
    void work(); 
}

interface Eatable { 
    void eat(); 
}

interface Sleepable { 
    void sleep(); 
}

class Human implements Workable, Eatable, Sleepable { 
    public void work() { /* ... */ }
    public void eat() { /* ... */ }
    public void sleep() { /* ... */ }
}

class Robot implements Workable { 
    public void work() { /* only work */ }
}
```

### DIP – Dependency Inversion Principle

High-level modules should not depend on low-level modules. Both should depend on abstractions.

```java
// Depend on abstraction, not concretion
interface NotificationService { 
    void send(String msg); 
}

class EmailNotification implements NotificationService {
    public void send(String msg) { /* email */ }
}

class SMSNotification implements NotificationService {
    public void send(String msg) { /* SMS */ }
}

class OrderService {
    private NotificationService notification; // Abstraction!
    
    public OrderService(NotificationService notification) {
        this.notification = notification;
    }
    
    public void processOrder(Order order) {
        notification.send("Order processed");
    }
}
```

## Common Design Patterns

### Creational Patterns

**Singleton**
```java
public class DatabaseConnection {
    private static volatile DatabaseConnection instance;
    private DatabaseConnection() {}
    
    public static DatabaseConnection getInstance() {
        if (instance == null) {
            synchronized (DatabaseConnection.class) {
                if (instance == null) {
                    instance = new DatabaseConnection();
                }
            }
        }
        return instance;
    }
}
```

**Factory**
```java
interface Animal { 
    void makeSound(); 
}

class Dog implements Animal { 
    public void makeSound() { System.out.println("Woof!"); } 
}

class Cat implements Animal { 
    public void makeSound() { System.out.println("Meow!"); } 
}

class AnimalFactory {
    public static Animal createAnimal(String type) {
        return switch (type) {
            case "dog" -> new Dog();
            case "cat" -> new Cat();
            default -> throw new IllegalArgumentException("Unknown: " + type);
        };
    }
}
```

**Builder**
```java
public class User {
    private String name, email;
    private int age;
    
    private User(Builder b) { 
        name = b.name; 
        email = b.email; 
        age = b.age; 
    }
    
    public static class Builder {
        private String name, email; 
        private int age;
        
        public Builder(String name, String email) { 
            this.name = name; 
            this.email = email; 
        }
        
        public Builder age(int age) { 
            this.age = age; 
            return this; 
        }
        
        public User build() { 
            return new User(this); 
        }
    }
}

// Usage
User user = new User.Builder("John", "john@example.com")
    .age(25)
    .build();
```

### Structural Patterns

**Adapter**
```java
// Legacy system
class LegacyPrinter { 
    public void printOld(String text) { 
        System.out.println(text); 
    } 
}

// Modern interface
interface ModernPrinter { 
    void print(String text); 
}

// Adapter bridges old and new
class PrinterAdapter implements ModernPrinter {
    private LegacyPrinter legacy;
    
    public PrinterAdapter(LegacyPrinter legacy) { 
        this.legacy = legacy; 
    }
    
    public void print(String text) { 
        legacy.printOld(text); 
    }
}
```

**Decorator**
```java
interface Coffee { 
    String getDescription(); 
    double getCost(); 
}

class SimpleCoffee implements Coffee {
    public String getDescription() { return "Simple"; }
    public double getCost() { return 2.0; }
}

abstract class CoffeeDecorator implements Coffee {
    protected Coffee coffee;
    public CoffeeDecorator(Coffee coffee) { this.coffee = coffee; }
}

class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee coffee) { super(coffee); }
    
    public String getDescription() { 
        return coffee.getDescription() + ", milk"; 
    }
    
    public double getCost() { 
        return coffee.getCost() + 0.5; 
    }
}

// Usage - dynamically add features
Coffee coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);
System.out.println(coffee.getDescription() + " costs " + coffee.getCost());
```

### Behavioral Patterns

**Observer**
```java
interface Observer { 
    void update(String msg); 
}

interface Subject { 
    void attach(Observer o); 
    void detach(Observer o); 
    void notifyObservers(String msg); 
}

class NewsAgency implements Subject {
    private List<Observer> observers = new ArrayList<>();
    
    public void attach(Observer o) { observers.add(o); }
    public void detach(Observer o) { observers.remove(o); }
    
    public void notifyObservers(String msg) { 
        for (Observer o : observers) o.update(msg); 
    }
    
    public void setNews(String news) { 
        notifyObservers(news); 
    }
}

class NewsChannel implements Observer {
    private String name;
    
    public NewsChannel(String name) { this.name = name; }
    
    public void update(String news) { 
        System.out.println(name + ": " + news); 
    }
}
```

**Strategy**
```java
interface SortingStrategy { 
    void sort(int[] arr); 
}

class BubbleSort implements SortingStrategy { 
    public void sort(int[] arr) { /* bubble sort */ } 
}

class QuickSort implements SortingStrategy { 
    public void sort(int[] arr) { /* quick sort */ } 
}

class SortingContext {
    private SortingStrategy strategy;
    
    public void setStrategy(SortingStrategy strategy) { 
        this.strategy = strategy; 
    }
    
    public void performSort(int[] arr) { 
        strategy.sort(arr); 
    }
}
```

## Architecture Patterns

### Repository Pattern

```java
// Domain layer interface
interface UserRepository { 
    void save(User u); 
    User findById(Long id); 
    List<User> findAll(); 
    void delete(Long id); 
}

// Infrastructure layer implementation
@Repository
class DatabaseUserRepository implements UserRepository {
    @Autowired 
    private EntityManager em;
    
    public void save(User u) { em.persist(u); }
    
    public User findById(Long id) { 
        return em.find(User.class, id); 
    }
    
    public List<User> findAll() { 
        return em.createQuery("FROM User", User.class).getResultList(); 
    }
    
    public void delete(Long id) { 
        em.remove(em.find(User.class, id)); 
    }
}

// Service layer - business logic
@Service
class UserService { 
    private UserRepository repo; 
    
    public UserService(UserRepository r) { repo = r; }
    
    @Transactional
    public void createUser(User user) {
        validateUser(user);
        repo.save(user);
        sendWelcomeEmail(user);
    }
}
```

## Common Anti-patterns in Detail

### Overengineering

**The problem:** Too much complexity for simple requirements.

**❌ Wrong approach - Overengineered simple CRUD:**
```java
// BAD - Too many patterns for a simple user operation
interface UserFactoryAbstractFactoryInterface {
    UserCreationStrategyInterface createUserCreationStrategy();
}

class UserFactoryAbstractFactory implements UserFactoryAbstractFactoryInterface {
    public UserCreationStrategyInterface createUserCreationStrategy() {
        return new ConcreteUserCreationStrategyFactoryBean()
            .createUserCreationStrategyImplementation();
    }
}

interface UserCreationStrategyInterface {
    User createUserUsingAdvancedFactoryPattern(UserCreationRequestDTO dto);
}

// 5 layers of abstraction for a CRUD operation...
```

**✅ Correct approach - YAGNI (You Aren't Gonna Need It):**
```java
// GOOD - Simple, understandable solution
@Service
public class UserService {
    private final UserRepository userRepository;
    
    public User createUser(CreateUserRequest request) {
        // Input validation
        if (request.getEmail() == null || !isValidEmail(request.getEmail())) {
            throw new ValidationException("Invalid email");
        }
        
        // Business logic
        User user = new User(request.getName(), request.getEmail());
        return userRepository.save(user);
    }
}
```

**When to avoid overengineering:**
- MVP and proof of concept projects
- Small teams (< 5 people)
- Simple CRUD applications
- Tight deadlines
- Uncertain requirements

### Chatty Services

**The problem:** Too many small inter-service calls causing performance issues.

**❌ Wrong approach - N+1 problem in microservices:**
```java
// BAD - Too many HTTP calls for one operation
public class OrderService {
    public Order createOrder(CreateOrderRequest request) {
        // 1. Call user service
        User user = userServiceClient.getUser(request.getUserId());
        
        // 2. Call product service for each product (N+1 problem!)
        List<Product> products = new ArrayList<>();
        for (Long productId : request.getProductIds()) {
            Product product = productServiceClient.getProduct(productId);
            products.add(product);
        }
        
        // 3. Check inventory for each product separately
        for (Product product : products) {
            boolean available = inventoryServiceClient
                .checkAvailability(product.getId());
        }
        
        // 4. Call pricing service
        Price totalPrice = pricingServiceClient.calculatePrice(products);
        
        // 5. Call payment service
        PaymentResult payment = paymentServiceClient.processPayment(totalPrice);
        
        return new Order(user, products, payment);
        // 5 + N HTTP calls to create one order!
    }
}
```

**✅ Correct approach - Batch operations and aggregation:**
```java
// GOOD - Batch calls and async processing
public class OrderService {
    public Order createOrder(CreateOrderRequest request) {
        // Batch product call - single request
        List<Product> products = productServiceClient
            .getProductsBatch(request.getProductIds());
        
        // Batch inventory check
        Map<Long, Boolean> availability = inventoryServiceClient
            .checkAvailabilityBatch(request.getProductIds());
            
        // Async event-driven processing
        publishOrderCreatedEvent(new OrderCreatedEvent(request));
        
        // Single pricing call handles everything
        Price totalPrice = pricingServiceClient.calculateTotalPrice(request);
        
        return processOrder(request, products, totalPrice);
        // 3 HTTP calls instead of 5 + N
    }
}

// Event-driven async processing
@EventListener
public void handleOrderCreated(OrderCreatedEvent event) {
    // Payment processing asynchronously
    paymentService.processPaymentAsync(event.getOrderId());
    
    // Email notification asynchronously  
    notificationService.sendOrderConfirmationAsync(event);
}
```

**Performance impact:**
- With 1000 products: 1001 HTTP calls → 3 HTTP calls
- Network latency: 1001 * 50ms = 50 seconds → 150ms
- Significant reduction in database connection pool pressure

### Shared Database Anti-pattern

**The problem:** Multiple microservices sharing the same database.

**❌ Wrong approach - Microservices with shared database:**
```sql
-- BAD - All services use the same database
CREATE DATABASE ecommerce_shared;

-- User Service table
CREATE TABLE users (id, name, email, password_hash);

-- Order Service table  
CREATE TABLE orders (
    id, 
    user_id,  -- FOREIGN KEY users(id) - service coupling!
    total_amount, 
    status
);

-- Product Service table
CREATE TABLE products (id, name, description, price);

-- Order items table
CREATE TABLE order_items (
    order_id,    -- FK orders(id)
    product_id,  -- FK products(id) - cross-service FK!
    quantity, 
    price
);
```

```java
// PROBLEM - Services directly access other service tables
@Repository
public class OrderRepository {
    public Order getOrderWithUserDetails(Long orderId) {
        // BAD - Order service directly queries users table
        return jdbcTemplate.queryForObject("""
            SELECT o.*, u.name, u.email 
            FROM orders o 
            JOIN users u ON o.user_id = u.id 
            WHERE o.id = ?
            """, orderId);
    }
}
```

**✅ Correct approach - Database per service:**
```yaml
# Service-specific databases
user_service:
  database: user_db
  tables:
    - users (id, name, email, password_hash)
    - user_profiles (user_id, address, phone)

order_service:
  database: order_db  
  tables:
    - orders (id, user_id, total_amount, status)
    - order_items (order_id, product_id, quantity, price)
    # user_id and product_id are just reference IDs, not FKs!

product_service:
  database: product_db
  tables:
    - products (id, name, description, price)
    - categories (id, name)
```

```java
// GOOD - API calls instead of cross-service queries
@Service
public class OrderService {
    public OrderWithDetails getOrderWithUserDetails(Long orderId) {
        // 1. Query order from own database
        Order order = orderRepository.findById(orderId);
        
        // 2. Get user details via API call
        User user = userServiceClient.getUser(order.getUserId());
        
        // 3. Data aggregation in application layer
        return new OrderWithDetails(order, user);
    }
}
```

**Benefits of database isolation:**
- Service autonomy - independent deployment and scaling
- Technology diversity - per-service database choice
- Data ownership - clear responsibility boundaries
- Fault isolation - one database issue doesn't affect all services

### Poor Layer Separation

**The problem:** Presentation logic mixed with business or data layer.

**❌ Wrong approach:**
```java
@RestController
public class UserController {
    
    @PostMapping("/users")
    public ResponseEntity<String> createUser(@RequestBody Map<String, String> request) {
        // BAD: Business logic in controller
        String name = request.get("name");
        String email = request.get("email");
        
        // BAD: Validation in controller
        if (name == null || name.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Name is required");
        }
        
        if (!email.contains("@")) {
            return ResponseEntity.badRequest().body("Invalid email format");
        }
        
        // BAD: Direct database access from controller
        try (Connection conn = DriverManager.getConnection("jdbc:...")) {
            PreparedStatement stmt = conn.prepareStatement(
                "INSERT INTO users (name, email) VALUES (?, ?)");
            stmt.setString(1, name);
            stmt.setString(2, email);
            stmt.executeUpdate();
        }
        
        // BAD: HTML generation in controller
        return ResponseEntity.ok("<html><body>User " + name + " created!</body></html>");
    }
}
```

**✅ Correct approach - Proper layer separation:**
```java
// Controller - HTTP handling only
@RestController
public class UserController {
    private final UserService userService;
    
    @PostMapping("/users") 
    public ResponseEntity<UserDTO> createUser(
            @Valid @RequestBody CreateUserRequest request) {
        UserDTO user = userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
}

// Service - Business logic
@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserValidator userValidator;
    
    @Transactional
    public UserDTO createUser(CreateUserRequest request) {
        // Validation
        userValidator.validate(request);
        
        // Business logic
        User user = new User(request.getName(), request.getEmail());
        user = userRepository.save(user);
        
        return UserDTO.from(user);
    }
}

// Repository - Data access only
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
```

## Practical Example: E-commerce Architecture Design

**Business Requirements:**
```
Functional:
- User registration & authentication
- Product catalog browsing & search
- Shopping cart management  
- Order processing & payment
- Inventory management
- Email notifications
- Admin dashboard

Non-functional:
- 10,000 concurrent users
- 99.9% uptime  
- < 200ms response time
- Global availability
- PCI DSS compliance (payment)
```

**Architecture Design Tasks:**

**1. Service Decomposition:**
```
Identified Microservices:
- User Management Service
- Product Catalog Service
- Shopping Cart Service  
- Order Processing Service
- Payment Service
- Inventory Service
- Notification Service
- Search Service (Elasticsearch)

Bounded Contexts definition
Database per service strategy
```

**2. API Design:**
```http
# RESTful endpoints
POST /api/v1/users/register
GET  /api/v1/products?category=electronics&page=1
POST /api/v1/cart/items
POST /api/v1/orders  
PUT  /api/v1/orders/{id}/status

# Error handling & status codes
# API versioning strategy
# Authentication & authorization (OAuth 2.0 + JWT)
```

**3. Data Architecture:**
```sql
-- Service-specific schemas
user_service_db:
  - users, user_profiles, user_preferences

product_service_db:  
  - products, categories, product_images

order_service_db:
  - orders, order_items, order_status_history
  
inventory_service_db:
  - stock_levels, warehouses, reservations
```

**4. Communication Patterns:**
```
Synchronous:
- API Gateway → Services (HTTP/REST)
- User authentication flow
- Real-time inventory checks

Asynchronous (Kafka):
- Order Created → Inventory Update
- Payment Processed → Order Fulfillment  
- User Registered → Welcome Email

Event-driven architecture for loose coupling
```

**5. Resilience & Scalability:**
```
- Circuit breaker (Resilience4j)
- Retry with exponential backoff
- Rate limiting & throttling
- Caching strategy (Redis for sessions, product cache)
- Load balancing (NGINX) & auto-scaling (Kubernetes HPA)
- Database replication (read replicas) & sharding
```

**6. Deployment Architecture:**
```yaml
# Kubernetes deployment example
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
    spec:
      containers:
      - name: user-service
        image: ecommerce/user-service:v1.2.0
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi" 
            cpu: "500m"
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: url
```

**Evaluation Criteria:**
- 📊 Proper service boundaries with minimal coupling
- 🔄 Event-driven communication design
- 🛡️ Security & data privacy compliance
- 📈 Scalability & performance considerations
- 🔍 Observability & monitoring strategy (Prometheus, Grafana)
- 💰 Cost optimization & resource efficiency

### Advanced Microservices Patterns {#advanced-microservices}
<!-- tags: microservices, patterns, distributed, resilience, communication -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Advanced microservices patterns address complex distributed system challenges. **Saga Pattern** manages distributed transactions, **CQRS** separates command and query responsibilities, **Event Sourcing** stores state changes as events, **Strangler Fig** enables gradual migration, **Backend for Frontend (BFF)** tailors APIs for specific clients. **Circuit Breaker** prevents cascade failures, **Bulkhead** isolates resources, **Retry patterns** handle transient failures.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Distributed transactions**: Handle complex business processes across services
- **Data consistency**: Manage eventual consistency in distributed systems
- **Fault tolerance**: Build resilient systems that handle failures gracefully
- **Migration strategies**: Safely evolve monolithic systems to microservices

</div>

<div class="runnable-model" data-filter="advanced-microservices">

**Runnable mental model**
```javascript
// 1. SAGA PATTERN IMPLEMENTATION

class SagaOrchestrator {
  constructor() {
    this.sagaRegistry = new Map();
    this.compensationHandlers = new Map();
  }

  // Order Processing Saga
  async processOrderSaga(orderId, orderData) {
    const sagaId = `order-${orderId}`;
    const saga = new Saga(sagaId);
    
    try {
      // Step 1: Reserve inventory
      const inventoryResult = await saga.addStep(
        'reserveInventory',
        () => this.inventoryService.reserve(orderData.items),
        (result) => this.inventoryService.release(result.reservationId)
      );

      // Step 2: Process payment
      const paymentResult = await saga.addStep(
        'processPayment',
        () => this.paymentService.charge(orderData.payment, orderData.total),
        (result) => this.paymentService.refund(result.transactionId)
      );

      // Step 3: Create shipment
      const shipmentResult = await saga.addStep(
        'createShipment',
        () => this.shippingService.createShipment(orderData.shipping),
        (result) => this.shippingService.cancelShipment(result.shipmentId)
      );

      // Step 4: Update order status
      await saga.addStep(
        'updateOrder',
        () => this.orderService.confirm(orderId, {
          inventoryReservation: inventoryResult.reservationId,
          paymentTransaction: paymentResult.transactionId,
          shipment: shipmentResult.shipmentId
        }),
        () => this.orderService.cancel(orderId)
      );

      await saga.complete();
      return { success: true, orderId };

    } catch (error) {
      await saga.compensate();
      throw new Error(`Order processing failed: ${error.message}`);
    }
  }
}

class Saga {
  constructor(id) {
    this.id = id;
    this.steps = [];
    this.completedSteps = [];
    this.isCompleted = false;
  }

  async addStep(name, action, compensation) {
    try {
      const result = await action();
      this.completedSteps.push({ name, result, compensation });
      return result;
    } catch (error) {
      // Compensate all completed steps in reverse order
      await this.compensate();
      throw error;
    }
  }

  async compensate() {
    const reversedSteps = [...this.completedSteps].reverse();
    
    for (const step of reversedSteps) {
      try {
        await step.compensation(step.result);
        console.log(`Compensated step: ${step.name}`);
      } catch (error) {
        console.error(`Compensation failed for ${step.name}:`, error);
        // Log but continue with other compensations
      }
    }
  }

  async complete() {
    this.isCompleted = true;
    console.log(`Saga ${this.id} completed successfully`);
  }
}

// 2. CQRS (Command Query Responsibility Segregation)

class CommandHandler {
  constructor(eventStore, eventBus) {
    this.eventStore = eventStore;
    this.eventBus = eventBus;
  }

  async handleCreateUser(command) {
    const { userId, userData } = command;
    
    // Validate command
    if (!userData.email || !userData.name) {
      throw new Error('Invalid user data');
    }

    // Create domain event
    const event = {
      id: this.generateEventId(),
      aggregateId: userId,
      aggregateType: 'User',
      eventType: 'UserCreated',
      eventData: userData,
      timestamp: new Date().toISOString(),
      version: 1
    };

    // Store event
    await this.eventStore.appendEvent(event);
    
    // Publish event
    await this.eventBus.publish(event);
    
    return { userId, success: true };
  }

  async handleUpdateUser(command) {
    const { userId, updates, expectedVersion } = command;
    
    // Get current state
    const events = await this.eventStore.getEvents(userId);
    const currentVersion = events.length;
    
    if (expectedVersion !== currentVersion) {
      throw new Error('Concurrency conflict');
    }

    const event = {
      id: this.generateEventId(),
      aggregateId: userId,
      aggregateType: 'User',
      eventType: 'UserUpdated',
      eventData: updates,
      timestamp: new Date().toISOString(),
      version: currentVersion + 1
    };

    await this.eventStore.appendEvent(event);
    await this.eventBus.publish(event);
    
    return { userId, version: event.version, success: true };
  }

  generateEventId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

class QueryHandler {
  constructor(readDatabase) {
    this.readDatabase = readDatabase;
  }

  async getUserById(userId) {
    return await this.readDatabase.findOne('users', { id: userId });
  }

  async getUsersByEmail(email) {
    return await this.readDatabase.find('users', { email });
  }

  async getUsersWithPagination(page = 1, limit = 20, filters = {}) {
    const offset = (page - 1) * limit;
    
    const [users, total] = await Promise.all([
      this.readDatabase.find('users', filters, { offset, limit }),
      this.readDatabase.count('users', filters)
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}

// Event projection for read models
class UserProjection {
  constructor(readDatabase) {
    this.readDatabase = readDatabase;
  }

  async handleUserCreated(event) {
    const user = {
      id: event.aggregateId,
      ...event.eventData,
      createdAt: event.timestamp,
      updatedAt: event.timestamp,
      version: event.version
    };

    await this.readDatabase.insert('users', user);
  }

  async handleUserUpdated(event) {
    await this.readDatabase.update(
      'users',
      { id: event.aggregateId },
      {
        ...event.eventData,
        updatedAt: event.timestamp,
        version: event.version
      }
    );
  }

  async handleUserDeleted(event) {
    await this.readDatabase.delete('users', { id: event.aggregateId });
  }
}

// 3. EVENT SOURCING IMPLEMENTATION

class EventStore {
  constructor(database) {
    this.database = database;
  }

  async appendEvent(event) {
    // Ensure event ordering and atomicity
    const transaction = await this.database.beginTransaction();
    
    try {
      await transaction.insert('events', event);
      await transaction.commit();
      return event;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getEvents(aggregateId, fromVersion = 0) {
    return await this.database.find('events', {
      aggregateId,
      version: { $gt: fromVersion }
    }, {
      sort: { version: 1 }
    });
  }

  async getEventsStream(aggregateId) {
    return this.database.stream('events', {
      aggregateId
    }, {
      sort: { version: 1 }
    });
  }

  async createSnapshot(aggregateId, version, state) {
    const snapshot = {
      aggregateId,
      version,
      state,
      timestamp: new Date().toISOString()
    };

    await this.database.upsert('snapshots', 
      { aggregateId },
      snapshot
    );
  }

  async getLatestSnapshot(aggregateId) {
    return await this.database.findOne('snapshots', { aggregateId });
  }
}

class AggregateRoot {
  constructor(id) {
    this.id = id;
    this.version = 0;
    this.uncommittedEvents = [];
  }

  applyEvent(event) {
    // Apply event to aggregate state
    this.handleEvent(event);
    this.version = event.version;
  }

  addEvent(eventType, eventData) {
    const event = {
      id: this.generateEventId(),
      aggregateId: this.id,
      aggregateType: this.constructor.name,
      eventType,
      eventData,
      timestamp: new Date().toISOString(),
      version: this.version + 1
    };

    this.uncommittedEvents.push(event);
    this.applyEvent(event);
  }

  getUncommittedEvents() {
    return [...this.uncommittedEvents];
  }

  clearUncommittedEvents() {
    this.uncommittedEvents = [];
  }

  // Override in subclasses
  handleEvent(event) {
    const handler = this[`handle${event.eventType}`];
    if (handler) {
      handler.call(this, event);
    }
  }

  generateEventId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Domain aggregate example
class UserAggregate extends AggregateRoot {
  constructor(id) {
    super(id);
    this.name = null;
    this.email = null;
    this.isActive = false;
  }

  static async fromHistory(eventStore, id) {
    const user = new UserAggregate(id);
    
    // Try to load from snapshot first
    const snapshot = await eventStore.getLatestSnapshot(id);
    if (snapshot) {
      Object.assign(user, snapshot.state);
      user.version = snapshot.version;
    }

    // Load events after snapshot
    const events = await eventStore.getEvents(id, user.version);
    events.forEach(event => user.applyEvent(event));
    
    return user;
  }

  createUser(name, email) {
    if (this.version > 0) {
      throw new Error('User already exists');
    }

    this.addEvent('UserCreated', { name, email });
  }

  updateEmail(newEmail) {
    if (!this.isActive) {
      throw new Error('Cannot update inactive user');
    }

    this.addEvent('UserEmailUpdated', { email: newEmail });
  }

  deactivate() {
    if (!this.isActive) {
      throw new Error('User already inactive');
    }

    this.addEvent('UserDeactivated', {});
  }

  // Event handlers
  handleUserCreated(event) {
    this.name = event.eventData.name;
    this.email = event.eventData.email;
    this.isActive = true;
  }

  handleUserEmailUpdated(event) {
    this.email = event.eventData.email;
  }

  handleUserDeactivated(event) {
    this.isActive = false;
  }
}

// 4. BACKEND FOR FRONTEND (BFF) PATTERN

class MobileBFF {
  constructor(userService, orderService, productService) {
    this.userService = userService;
    this.orderService = orderService;
    this.productService = productService;
  }

  // Tailored endpoint for mobile dashboard
  async getMobileDashboard(userId) {
    const [userProfile, recentOrders, recommendations] = await Promise.all([
      this.getUserProfile(userId),
      this.getRecentOrders(userId, 5), // Mobile shows fewer items
      this.getRecommendations(userId, 3)
    ]);

    return {
      user: {
        name: userProfile.name,
        avatar: userProfile.avatarUrl,
        membershipLevel: userProfile.membership?.level
      },
      recentOrders: recentOrders.map(order => ({
        id: order.id,
        status: order.status,
        total: order.total,
        itemCount: order.items.length,
        estimatedDelivery: order.estimatedDelivery
      })),
      recommendations: recommendations.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.thumbnailUrl,
        rating: product.averageRating
      }))
    };
  }

  // Optimized for mobile constraints
  async getProductList(categoryId, page = 1) {
    const products = await this.productService.getByCategory(categoryId, {
      page,
      limit: 10, // Smaller page size for mobile
      fields: ['id', 'name', 'price', 'thumbnailUrl', 'averageRating']
    });

    return {
      products: products.items.map(product => ({
        ...product,
        formattedPrice: this.formatCurrency(product.price)
      })),
      hasMore: products.hasNextPage
    };
  }

  async getUserProfile(userId) {
    return await this.userService.getProfile(userId);
  }

  async getRecentOrders(userId, limit) {
    return await this.orderService.getByUser(userId, { limit });
  }

  async getRecommendations(userId, limit) {
    return await this.productService.getRecommendations(userId, { limit });
  }

  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
}

class WebBFF {
  constructor(userService, orderService, productService, analyticsService) {
    this.userService = userService;
    this.orderService = orderService;
    this.productService = productService;
    this.analyticsService = analyticsService;
  }

  // Rich dashboard for web interface
  async getWebDashboard(userId) {
    const [
      userProfile,
      orderHistory,
      recommendations,
      analytics,
      wishlist
    ] = await Promise.all([
      this.getUserProfile(userId),
      this.getOrderHistory(userId, 1, 20),
      this.getRecommendations(userId, 10),
      this.getUserAnalytics(userId),
      this.getWishlist(userId)
    ]);

    return {
      user: userProfile,
      orders: {
        recent: orderHistory.orders,
        statistics: {
          totalOrders: orderHistory.total,
          totalSpent: analytics.totalSpent,
          averageOrderValue: analytics.averageOrderValue
        }
      },
      recommendations,
      wishlist,
      analytics
    };
  }

  async getUserAnalytics(userId) {
    return await this.analyticsService.getUserMetrics(userId);
  }

  async getWishlist(userId) {
    return await this.userService.getWishlist(userId);
  }
}

// 5. STRANGLER FIG PATTERN

class StranglerFigProxy {
  constructor(legacyService, newService) {
    this.legacyService = legacyService;
    this.newService = newService;
    this.migrationConfig = new Map();
  }

  // Configure which routes go to new service
  configureRoute(pattern, useNewService, percentage = 100) {
    this.migrationConfig.set(pattern, {
      useNewService,
      percentage
    });
  }

  async handleRequest(request) {
    const route = this.getRoute(request.path);
    const config = this.migrationConfig.get(route);
    
    if (!config) {
      // Default to legacy service
      return await this.legacyService.handleRequest(request);
    }

    if (config.useNewService) {
      // Route to new service based on percentage
      if (Math.random() * 100 < config.percentage) {
        try {
          return await this.newService.handleRequest(request);
        } catch (error) {
          // Fallback to legacy on error
          console.warn('New service failed, falling back to legacy:', error);
          return await this.legacyService.handleRequest(request);
        }
      }
    }

    return await this.legacyService.handleRequest(request);
  }

  getRoute(path) {
    // Simple pattern matching
    for (const [pattern] of this.migrationConfig) {
      if (path.startsWith(pattern)) {
        return pattern;
      }
    }
    return null;
  }

  // Gradually increase traffic to new service
  async gradualMigration(route, steps = 10, intervalMs = 60000) {
    const stepSize = 100 / steps;
    
    for (let i = 1; i <= steps; i++) {
      const percentage = stepSize * i;
      this.configureRoute(route, true, percentage);
      
      console.log(`Migration step ${i}/${steps}: ${percentage}% traffic to new service`);
      
      if (i < steps) {
        await new Promise(resolve => setTimeout(resolve, intervalMs));
      }
    }
    
    console.log(`Migration complete for route: ${route}`);
  }
}

// 6. RESILIENCE PATTERNS

class CircuitBreaker {
  constructor(options = {}) {
    this.failureThreshold = options.failureThreshold || 5;
    this.recoveryTimeout = options.recoveryTimeout || 30000;
    this.monitoringPeriod = options.monitoringPeriod || 10000;
    
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.successCount = 0;
  }

  async execute(operation) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime >= this.recoveryTimeout) {
        this.state = 'HALF_OPEN';
        this.successCount = 0;
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failureCount = 0;
    
    if (this.state === 'HALF_OPEN') {
      this.successCount++;
      if (this.successCount >= 3) { // Require 3 successes to close
        this.state = 'CLOSED';
      }
    }
  }

  onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
    }
  }

  getState() {
    return this.state;
  }
}

class BulkheadPattern {
  constructor() {
    this.pools = new Map();
  }

  createPool(name, size) {
    this.pools.set(name, {
      semaphore: new Semaphore(size),
      activeRequests: 0,
      totalRequests: 0,
      failedRequests: 0
    });
  }

  async execute(poolName, operation) {
    const pool = this.pools.get(poolName);
    if (!pool) {
      throw new Error(`Pool ${poolName} not found`);
    }

    await pool.semaphore.acquire();
    pool.activeRequests++;
    pool.totalRequests++;

    try {
      const result = await operation();
      return result;
    } catch (error) {
      pool.failedRequests++;
      throw error;
    } finally {
      pool.activeRequests--;
      pool.semaphore.release();
    }
  }

  getPoolStats(poolName) {
    const pool = this.pools.get(poolName);
    if (!pool) return null;

    return {
      activeRequests: pool.activeRequests,
      totalRequests: pool.totalRequests,
      failedRequests: pool.failedRequests,
      successRate: (pool.totalRequests - pool.failedRequests) / pool.totalRequests
    };
  }
}

class Semaphore {
  constructor(permits) {
    this.permits = permits;
    this.waiting = [];
  }

  async acquire() {
    if (this.permits > 0) {
      this.permits--;
      return;
    }

    return new Promise(resolve => {
      this.waiting.push(resolve);
    });
  }

  release() {
    if (this.waiting.length > 0) {
      const resolve = this.waiting.shift();
      resolve();
    } else {
      this.permits++;
    }
  }
}

// Usage example
document.addEventListener('DOMContentLoaded', async () => {
  // CQRS setup
  const eventStore = new EventStore(database);
  const commandHandler = new CommandHandler(eventStore, eventBus);
  const queryHandler = new QueryHandler(readDatabase);

  // Circuit breaker for external service
  const paymentCircuitBreaker = new CircuitBreaker({
    failureThreshold: 3,
    recoveryTimeout: 60000
  });

  // Bulkhead for different service pools
  const bulkhead = new BulkheadPattern();
  bulkhead.createPool('payment', 5);
  bulkhead.createPool('inventory', 10);
  bulkhead.createPool('notification', 3);

  // Saga orchestrator
  const sagaOrchestrator = new SagaOrchestrator();

  // Example order processing
  try {
    const result = await sagaOrchestrator.processOrderSaga('order-123', {
      items: [{ productId: 'prod-1', quantity: 2 }],
      payment: { method: 'credit_card', token: 'card_token' },
      shipping: { address: '123 Main St', method: 'standard' },
      total: 99.99
    });
    
    console.log('Order processed successfully:', result);
  } catch (error) {
    console.error('Order processing failed:', error);
  }
});
```
*Notice: Advanced microservices patterns require careful consideration of complexity vs. benefits and should be introduced gradually as system needs evolve.*

</div>

### Event-Driven Architecture Patterns {#event-driven-patterns}
<!-- tags: events, messaging, async, decoupling, scalability -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Event-driven architecture uses events to trigger and communicate between decoupled services. **Event Streaming** with Apache Kafka provides durable, ordered message delivery, **Event Choreography** enables service coordination without central orchestration, **Event Notifications** inform of state changes, **Event-Carried State Transfer** includes full state in events. **Dead Letter Queues** handle failed messages, **Idempotency** ensures safe retry operations.*

</div>

<div class="runnable-model" data-filter="event-driven">

**Runnable mental model**
```javascript
// 1. EVENT-DRIVEN ORCHESTRATION

class EventDrivenOrchestrator {
  constructor(eventBus, eventStore) {
    this.eventBus = eventBus;
    this.eventStore = eventStore;
    this.workflows = new Map();
    this.setupEventHandlers();
  }

  setupEventHandlers() {
    this.eventBus.subscribe('OrderCreated', this.handleOrderCreated.bind(this));
    this.eventBus.subscribe('PaymentProcessed', this.handlePaymentProcessed.bind(this));
    this.eventBus.subscribe('InventoryReserved', this.handleInventoryReserved.bind(this));
    this.eventBus.subscribe('ShippingScheduled', this.handleShippingScheduled.bind(this));
  }

  async handleOrderCreated(event) {
    const { orderId, customerData, items, paymentInfo } = event.data;
    
    // Create workflow state
    const workflow = {
      orderId,
      status: 'PROCESSING',
      steps: {
        paymentProcessed: false,
        inventoryReserved: false,
        shippingScheduled: false
      },
      data: { customerData, items, paymentInfo },
      createdAt: new Date().toISOString()
    };
    
    this.workflows.set(orderId, workflow);

    // Trigger parallel processes
    await Promise.all([
      this.eventBus.publish({
        type: 'ProcessPayment',
        data: { orderId, paymentInfo, amount: event.data.total }
      }),
      this.eventBus.publish({
        type: 'ReserveInventory',
        data: { orderId, items }
      })
    ]);
  }

  async handlePaymentProcessed(event) {
    const { orderId, transactionId, status } = event.data;
    const workflow = this.workflows.get(orderId);
    
    if (!workflow) return;

    if (status === 'SUCCESS') {
      workflow.steps.paymentProcessed = true;
      workflow.data.transactionId = transactionId;
      await this.checkWorkflowCompletion(orderId);
    } else {
      await this.handleWorkflowFailure(orderId, 'Payment failed');
    }
  }

  async handleInventoryReserved(event) {
    const { orderId, reservationId, status } = event.data;
    const workflow = this.workflows.get(orderId);
    
    if (!workflow) return;

    if (status === 'SUCCESS') {
      workflow.steps.inventoryReserved = true;
      workflow.data.reservationId = reservationId;
      await this.checkWorkflowCompletion(orderId);
    } else {
      await this.handleWorkflowFailure(orderId, 'Inventory reservation failed');
    }
  }

  async handleShippingScheduled(event) {
    const { orderId, shipmentId } = event.data;
    const workflow = this.workflows.get(orderId);
    
    if (!workflow) return;

    workflow.steps.shippingScheduled = true;
    workflow.data.shipmentId = shipmentId;
    workflow.status = 'COMPLETED';

    await this.eventBus.publish({
      type: 'OrderCompleted',
      data: {
        orderId,
        transactionId: workflow.data.transactionId,
        reservationId: workflow.data.reservationId,
        shipmentId: workflow.data.shipmentId
      }
    });

    this.workflows.delete(orderId);
  }

  async checkWorkflowCompletion(orderId) {
    const workflow = this.workflows.get(orderId);
    
    if (workflow.steps.paymentProcessed && workflow.steps.inventoryReserved) {
      // Both prerequisites complete, schedule shipping
      await this.eventBus.publish({
        type: 'ScheduleShipping',
        data: {
          orderId,
          customerData: workflow.data.customerData,
          items: workflow.data.items
        }
      });
    }
  }

  async handleWorkflowFailure(orderId, reason) {
    const workflow = this.workflows.get(orderId);
    workflow.status = 'FAILED';
    workflow.failureReason = reason;

    await this.eventBus.publish({
      type: 'OrderFailed',
      data: { orderId, reason }
    });

    // Trigger compensations
    await this.compensateWorkflow(workflow);
    this.workflows.delete(orderId);
  }

  async compensateWorkflow(workflow) {
    const compensations = [];

    if (workflow.data.transactionId) {
      compensations.push(
        this.eventBus.publish({
          type: 'RefundPayment',
          data: { transactionId: workflow.data.transactionId }
        })
      );
    }

    if (workflow.data.reservationId) {
      compensations.push(
        this.eventBus.publish({
          type: 'ReleaseInventory',
          data: { reservationId: workflow.data.reservationId }
        })
      );
    }

    await Promise.all(compensations);
  }
}

// 2. EVENT CHOREOGRAPHY PATTERN

class EventChoreography {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.setupChoreography();
  }

  setupChoreography() {
    // User service choreography
    this.eventBus.subscribe('UserRegistered', async (event) => {
      // Multiple services react independently
      await Promise.all([
        this.sendWelcomeEmail(event.data),
        this.createUserProfile(event.data),
        this.setupDefaultPreferences(event.data)
      ]);
    });

    // Order choreography
    this.eventBus.subscribe('OrderPlaced', async (event) => {
      // Services coordinate through events
      const orchestrationEvents = [
        { type: 'ValidateOrder', data: event.data },
        { type: 'CheckInventory', data: event.data },
        { type: 'CalculateShipping', data: event.data }
      ];

      for (const evt of orchestrationEvents) {
        await this.eventBus.publish(evt);
      }
    });

    // Payment choreography
    this.eventBus.subscribe('PaymentCompleted', async (event) => {
      await this.eventBus.publish({
        type: 'OrderConfirmed',
        data: {
          orderId: event.data.orderId,
          paymentId: event.data.paymentId
        }
      });
    });
  }

  async sendWelcomeEmail(userData) {
    await this.eventBus.publish({
      type: 'SendEmail',
      data: {
        to: userData.email,
        template: 'welcome',
        variables: { name: userData.name }
      }
    });
  }

  async createUserProfile(userData) {
    await this.eventBus.publish({
      type: 'CreateProfile',
      data: {
        userId: userData.id,
        initialData: userData
      }
    });
  }

  async setupDefaultPreferences(userData) {
    await this.eventBus.publish({
      type: 'SetupPreferences',
      data: {
        userId: userData.id,
        preferences: {
          notifications: true,
          marketing: false,
          theme: 'light'
        }
      }
    });
  }
}

// 3. EVENT STREAMING WITH KAFKA-LIKE INTERFACE

class EventStream {
  constructor(brokers) {
    this.brokers = brokers;
    this.producers = new Map();
    this.consumers = new Map();
    this.topics = new Map();
  }

  async createTopic(name, partitions = 3, replicationFactor = 1) {
    this.topics.set(name, {
      partitions,
      replicationFactor,
      messages: Array(partitions).fill().map(() => [])
    });
  }

  async createProducer(clientId) {
    const producer = new StreamProducer(clientId, this);
    this.producers.set(clientId, producer);
    return producer;
  }

  async createConsumer(groupId, topics) {
    const consumer = new StreamConsumer(groupId, topics, this);
    this.consumers.set(groupId, consumer);
    return consumer;
  }

  getPartition(topic, key) {
    const topicConfig = this.topics.get(topic);
    if (!topicConfig) throw new Error(`Topic ${topic} not found`);
    
    if (key) {
      // Hash-based partitioning
      return this.hash(key) % topicConfig.partitions;
    }
    
    // Round-robin partitioning
    return Math.floor(Math.random() * topicConfig.partitions);
  }

  hash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }
}

class StreamProducer {
  constructor(clientId, stream) {
    this.clientId = clientId;
    this.stream = stream;
  }

  async send(topic, messages) {
    const topicConfig = this.stream.topics.get(topic);
    if (!topicConfig) throw new Error(`Topic ${topic} not found`);

    const results = [];
    
    for (const message of messages) {
      const partition = this.stream.getPartition(topic, message.key);
      const record = {
        id: this.generateMessageId(),
        key: message.key,
        value: message.value,
        headers: message.headers || {},
        timestamp: Date.now(),
        partition,
        offset: topicConfig.messages[partition].length
      };

      topicConfig.messages[partition].push(record);
      results.push({
        topic,
        partition,
        offset: record.offset
      });
    }

    return results;
  }

  generateMessageId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

class StreamConsumer {
  constructor(groupId, topics, stream) {
    this.groupId = groupId;
    this.topics = topics;
    this.stream = stream;
    this.offsets = new Map(); // topic:partition -> offset
    this.isConsuming = false;
  }

  async subscribe(handler) {
    this.handler = handler;
    this.isConsuming = true;
    this.consumeLoop();
  }

  async consumeLoop() {
    while (this.isConsuming) {
      try {
        const messages = await this.poll();
        
        for (const message of messages) {
          await this.handler(message);
          await this.commitOffset(message.topic, message.partition, message.offset);
        }
        
        // Small delay to prevent tight loop
        await this.delay(100);
      } catch (error) {
        console.error('Consumer error:', error);
        await this.delay(1000); // Back off on error
      }
    }
  }

  async poll(maxMessages = 10) {
    const messages = [];
    
    for (const topic of this.topics) {
      const topicConfig = this.stream.topics.get(topic);
      if (!topicConfig) continue;

      for (let partition = 0; partition < topicConfig.partitions; partition++) {
        const offsetKey = `${topic}:${partition}`;
        const currentOffset = this.offsets.get(offsetKey) || 0;
        const partitionMessages = topicConfig.messages[partition];
        
        const availableMessages = partitionMessages.slice(currentOffset, currentOffset + maxMessages);
        messages.push(...availableMessages);
        
        if (messages.length >= maxMessages) break;
      }
      
      if (messages.length >= maxMessages) break;
    }
    
    return messages;
  }

  async commitOffset(topic, partition, offset) {
    const offsetKey = `${topic}:${partition}`;
    this.offsets.set(offsetKey, offset + 1);
  }

  async close() {
    this.isConsuming = false;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// 4. DEAD LETTER QUEUE IMPLEMENTATION

class DeadLetterQueue {
  constructor(eventBus, storage) {
    this.eventBus = eventBus;
    this.storage = storage;
    this.maxRetries = 3;
    this.retryDelays = [1000, 5000, 15000]; // Exponential backoff
  }

  async handleFailedMessage(message, error, retryCount = 0) {
    const dlqMessage = {
      id: this.generateId(),
      originalMessage: message,
      error: {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      },
      retryCount,
      firstFailedAt: retryCount === 0 ? new Date().toISOString() : message.firstFailedAt,
      lastRetryAt: new Date().toISOString()
    };

    if (retryCount < this.maxRetries) {
      // Schedule retry
      await this.scheduleRetry(dlqMessage);
    } else {
      // Move to dead letter queue
      await this.storage.store('dead_letters', dlqMessage);
      
      // Notify administrators
      await this.eventBus.publish({
        type: 'MessageMovedToDLQ',
        data: {
          messageId: message.id,
          reason: error.message,
          retryCount
        }
      });
    }
  }

  async scheduleRetry(dlqMessage) {
    const delay = this.retryDelays[dlqMessage.retryCount] || this.retryDelays[this.retryDelays.length - 1];
    
    setTimeout(async () => {
      try {
        // Attempt to reprocess
        await this.eventBus.publish(dlqMessage.originalMessage);
      } catch (error) {
        await this.handleFailedMessage(
          dlqMessage.originalMessage,
          error,
          dlqMessage.retryCount + 1
        );
      }
    }, delay);
  }

  async reprocessDeadLetters(filter = {}) {
    const deadLetters = await this.storage.find('dead_letters', filter);
    
    for (const dlqMessage of deadLetters) {
      try {
        await this.eventBus.publish(dlqMessage.originalMessage);
        await this.storage.delete('dead_letters', dlqMessage.id);
      } catch (error) {
        console.error('Failed to reprocess dead letter:', error);
      }
    }
  }

  generateId() {
    return `dlq-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

// 5. IDEMPOTENCY HANDLER

class IdempotencyHandler {
  constructor(storage) {
    this.storage = storage;
    this.keyExpiration = 24 * 60 * 60 * 1000; // 24 hours
  }

  async ensureIdempotent(key, operation) {
    const existingResult = await this.storage.get(`idempotency:${key}`);
    
    if (existingResult) {
      // Return cached result
      return JSON.parse(existingResult.value);
    }

    try {
      const result = await operation();
      
      // Store result for future requests
      await this.storage.set(`idempotency:${key}`, JSON.stringify(result), {
        expiration: Date.now() + this.keyExpiration
      });
      
      return result;
    } catch (error) {
      // Don't cache errors, allow retry
      throw error;
    }
  }

  generateKey(request) {
    // Generate idempotency key from request
    const keyData = {
      method: request.method,
      path: request.path,
      body: request.body,
      userId: request.userId
    };
    
    return this.hash(JSON.stringify(keyData));
  }

  hash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(36);
  }
}

// Usage example
document.addEventListener('DOMContentLoaded', async () => {
  // Setup event streaming
  const eventStream = new EventStream(['localhost:9092']);
  await eventStream.createTopic('orders', 6, 2);
  await eventStream.createTopic('payments', 3, 2);
  
  const producer = await eventStream.createProducer('order-service');
  const consumer = await eventStream.createConsumer('payment-group', ['orders']);

  // Setup event-driven orchestration
  const eventBus = new EventBus();
  const orchestrator = new EventDrivenOrchestrator(eventBus, eventStore);
  
  // Setup choreography
  const choreography = new EventChoreography(eventBus);
  
  // Setup dead letter queue
  const dlq = new DeadLetterQueue(eventBus, storage);
  
  // Setup idempotency
  const idempotencyHandler = new IdempotencyHandler(storage);

  // Example: Process order with idempotency
  app.post('/orders', async (req, res) => {
    const idempotencyKey = req.headers['idempotency-key'] || 
                          idempotencyHandler.generateKey(req);
    
    try {
      const result = await idempotencyHandler.ensureIdempotent(
        idempotencyKey,
        async () => {
          const orderId = generateOrderId();
          
          await producer.send('orders', [{
            key: orderId,
            value: JSON.stringify({
              orderId,
              customerData: req.body.customer,
              items: req.body.items,
              total: req.body.total
            })
          }]);
          
          return { orderId, status: 'processing' };
        }
      );
      
      res.json(result);
    } catch (error) {
      await dlq.handleFailedMessage(req.body, error);
      res.status(500).json({ error: 'Order processing failed' });
    }
  });
});
```
*Notice: Event-driven architecture requires careful design of event schemas and handling of eventual consistency across services.*

</div>

### Advanced Enterprise Architecture Patterns {#enterprise-patterns}
<!-- tags: enterprise-architecture, ddd, hexagonal, clean-architecture, bounded-contexts -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Enterprise architecture patterns provide structured approaches for large-scale software systems. **Domain-Driven Design (DDD)** models complex business domains with ubiquitous language and bounded contexts, **Hexagonal Architecture** isolates business logic from external concerns, **Clean Architecture** enforces dependency inversion and separation of concerns, **Modular Monolith** provides microservice benefits within single deployable unit. **Enterprise Integration Patterns** handle complex system-to-system communication, **Event Sourcing** maintains complete audit trail of state changes.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Complexity management**: Structured approach to large system design
- **Team organization**: Clear boundaries for development teams
- **Business alignment**: Architecture reflects business domain structure
- **Evolution support**: Patterns facilitate system growth and change

</div>

<div class="runnable-model" data-filter="enterprise-patterns">

**Runnable mental model**
```typescript
// 1. DOMAIN-DRIVEN DESIGN IMPLEMENTATION

// Domain Layer - Core Business Logic
// domain/entities/Order.ts
export class Order {
  private constructor(
    private readonly _id: OrderId,
    private readonly _customerId: CustomerId,
    private _items: OrderItem[],
    private _status: OrderStatus,
    private readonly _createdAt: Date,
    private _updatedAt: Date
  ) {}

  static create(customerId: CustomerId, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new DomainError('Order must have at least one item');
    }

    const orderId = OrderId.generate();
    const now = new Date();

    return new Order(
      orderId,
      customerId,
      items,
      OrderStatus.PENDING,
      now,
      now
    );
  }

  static fromSnapshot(snapshot: OrderSnapshot): Order {
    return new Order(
      new OrderId(snapshot.id),
      new CustomerId(snapshot.customerId),
      snapshot.items.map(item => OrderItem.fromSnapshot(item)),
      OrderStatus.fromString(snapshot.status),
      new Date(snapshot.createdAt),
      new Date(snapshot.updatedAt)
    );
  }

  // Business Logic Methods
  addItem(item: OrderItem): void {
    if (this._status !== OrderStatus.PENDING) {
      throw new DomainError('Cannot add items to non-pending order');
    }

    this._items.push(item);
    this._updatedAt = new Date();
  }

  removeItem(itemId: ProductId): void {
    if (this._status !== OrderStatus.PENDING) {
      throw new DomainError('Cannot remove items from non-pending order');
    }

    this._items = this._items.filter(item => !item.productId.equals(itemId));
    this._updatedAt = new Date();
  }

  confirm(): DomainEvent[] {
    if (this._status !== OrderStatus.PENDING) {
      throw new DomainError('Can only confirm pending orders');
    }

    if (this._items.length === 0) {
      throw new DomainError('Cannot confirm empty order');
    }

    this._status = OrderStatus.CONFIRMED;
    this._updatedAt = new Date();

    return [
      new OrderConfirmedEvent(
        this._id,
        this._customerId,
        this.calculateTotal(),
        this._updatedAt
      )
    ];
  }

  cancel(reason: string): DomainEvent[] {
    if (this._status === OrderStatus.DELIVERED || this._status === OrderStatus.CANCELLED) {
      throw new DomainError(`Cannot cancel ${this._status.toString()} order`);
    }

    this._status = OrderStatus.CANCELLED;
    this._updatedAt = new Date();

    return [
      new OrderCancelledEvent(
        this._id,
        this._customerId,
        reason,
        this._updatedAt
      )
    ];
  }

  private calculateTotal(): Money {
    return this._items
      .map(item => item.getSubtotal())
      .reduce((total, subtotal) => total.add(subtotal), Money.zero());
  }

  // Getters
  get id(): OrderId { return this._id; }
  get customerId(): CustomerId { return this._customerId; }
  get items(): readonly OrderItem[] { return [...this._items]; }
  get status(): OrderStatus { return this._status; }
  get total(): Money { return this.calculateTotal(); }
  get createdAt(): Date { return this._createdAt; }
  get updatedAt(): Date { return this._updatedAt; }

  toSnapshot(): OrderSnapshot {
    return {
      id: this._id.value,
      customerId: this._customerId.value,
      items: this._items.map(item => item.toSnapshot()),
      status: this._status.toString(),
      createdAt: this._createdAt.toISOString(),
      updatedAt: this._updatedAt.toISOString()
    };
  }
}

// Value Objects
export class OrderId {
  constructor(public readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new DomainError('OrderId cannot be empty');
    }
  }

  static generate(): OrderId {
    return new OrderId(`order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  }

  equals(other: OrderId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}

export class Money {
  constructor(
    private readonly amount: number,
    private readonly currency: Currency
  ) {
    if (amount < 0) {
      throw new DomainError('Money amount cannot be negative');
    }
  }

  static zero(currency: Currency = Currency.USD): Money {
    return new Money(0, currency);
  }

  add(other: Money): Money {
    if (!this.currency.equals(other.currency)) {
      throw new DomainError('Cannot add money with different currencies');
    }
    return new Money(this.amount + other.amount, this.currency);
  }

  multiply(factor: number): Money {
    return new Money(this.amount * factor, this.currency);
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency.equals(other.currency);
  }

  getAmount(): number { return this.amount; }
  getCurrency(): Currency { return this.currency; }
}

// Domain Services
export class OrderDomainService {
  constructor(
    private readonly pricingService: PricingService,
    private readonly inventoryService: InventoryService
  ) {}

  async validateOrderCreation(customerId: CustomerId, items: OrderItem[]): Promise<ValidationResult> {
    const errors: string[] = [];

    // Check inventory availability
    for (const item of items) {
      const availability = await this.inventoryService.checkAvailability(
        item.productId,
        item.quantity
      );

      if (!availability.isAvailable) {
        errors.push(`Product ${item.productId.value} is not available in requested quantity`);
      }
    }

    // Validate pricing
    for (const item of items) {
      const currentPrice = await this.pricingService.getCurrentPrice(item.productId);
      
      if (!item.unitPrice.equals(currentPrice)) {
        errors.push(`Price for product ${item.productId.value} has changed`);
      }
    }

    return new ValidationResult(errors.length === 0, errors);
  }

  calculateShippingCost(order: Order, shippingAddress: Address): Money {
    // Complex shipping calculation logic
    const baseShipping = Money.zero(Currency.USD);
    const totalWeight = order.items.reduce(
      (weight, item) => weight + item.getWeight() * item.quantity,
      0
    );

    // Apply shipping rules based on weight, distance, etc.
    return baseShipping.add(new Money(totalWeight * 0.1, Currency.USD));
  }
}

// 2. HEXAGONAL ARCHITECTURE IMPLEMENTATION

// Application Layer - Use Cases
// application/usecases/CreateOrderUseCase.ts
export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly customerRepository: CustomerRepository,
    private readonly orderDomainService: OrderDomainService,
    private readonly eventBus: DomainEventBus,
    private readonly unitOfWork: UnitOfWork
  ) {}

  async execute(command: CreateOrderCommand): Promise<CreateOrderResult> {
    return await this.unitOfWork.execute(async () => {
      // Validate customer exists
      const customer = await this.customerRepository.findById(command.customerId);
      if (!customer) {
        throw new ApplicationError('Customer not found');
      }

      // Create order items
      const orderItems = command.items.map(itemData => 
        OrderItem.create(
          new ProductId(itemData.productId),
          itemData.quantity,
          new Money(itemData.unitPrice, Currency.USD)
        )
      );

      // Validate order creation
      const validation = await this.orderDomainService.validateOrderCreation(
        customer.id,
        orderItems
      );

      if (!validation.isValid) {
        throw new ApplicationError(`Order validation failed: ${validation.errors.join(', ')}`);
      }

      // Create order
      const order = Order.create(customer.id, orderItems);

      // Save order
      await this.orderRepository.save(order);

      // Publish domain events
      const events = [
        new OrderCreatedEvent(
          order.id,
          order.customerId,
          order.items.map(item => item.toSnapshot()),
          order.total,
          order.createdAt
        )
      ];

      await this.eventBus.publishAll(events);

      return new CreateOrderResult(
        order.id.value,
        order.status.toString(),
        order.total.getAmount()
      );
    });
  }
}

// Infrastructure Layer - Adapters
// infrastructure/persistence/PostgresOrderRepository.ts
export class PostgresOrderRepository implements OrderRepository {
  constructor(
    private readonly database: Database,
    private readonly mapper: OrderMapper
  ) {}

  async findById(orderId: OrderId): Promise<Order | null> {
    const query = `
      SELECT o.*, oi.* 
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.id = $1
    `;

    const result = await this.database.query(query, [orderId.value]);
    
    if (result.rows.length === 0) {
      return null;
    }

    return this.mapper.toDomain(result.rows);
  }

  async save(order: Order): Promise<void> {
    const snapshot = order.toSnapshot();
    
    await this.database.transaction(async (tx) => {
      // Upsert order
      await tx.query(`
        INSERT INTO orders (id, customer_id, status, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (id) DO UPDATE SET
          status = EXCLUDED.status,
          updated_at = EXCLUDED.updated_at
      `, [
        snapshot.id,
        snapshot.customerId,
        snapshot.status,
        snapshot.createdAt,
        snapshot.updatedAt
      ]);

      // Delete existing items
      await tx.query('DELETE FROM order_items WHERE order_id = $1', [snapshot.id]);

      // Insert current items
      for (const item of snapshot.items) {
        await tx.query(`
          INSERT INTO order_items (order_id, product_id, quantity, unit_price, currency)
          VALUES ($1, $2, $3, $4, $5)
        `, [
          snapshot.id,
          item.productId,
          item.quantity,
          item.unitPrice,
          item.currency
        ]);
      }
    });
  }

  async findByCustomerId(customerId: CustomerId): Promise<Order[]> {
    const query = `
      SELECT o.*, oi.* 
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.customer_id = $1
      ORDER BY o.created_at DESC
    `;

    const result = await this.database.query(query, [customerId.value]);
    return this.mapper.toDomainList(result.rows);
  }
}

// Port Definitions
export interface OrderRepository {
  findById(orderId: OrderId): Promise<Order | null>;
  save(order: Order): Promise<void>;
  findByCustomerId(customerId: CustomerId): Promise<Order[]>;
}

export interface DomainEventBus {
  publish(event: DomainEvent): Promise<void>;
  publishAll(events: DomainEvent[]): Promise<void>;
}

export interface UnitOfWork {
  execute<T>(operation: () => Promise<T>): Promise<T>;
}

// 3. CLEAN ARCHITECTURE LAYERS

// Entities Layer
export abstract class Entity<T> {
  protected constructor(protected readonly _id: T) {}

  get id(): T {
    return this._id;
  }

  equals(entity: Entity<T>): boolean {
    return entity._id === this._id;
  }
}

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: DomainEvent[] = [];

  protected addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
  }

  clearEvents(): void {
    this._domainEvents = [];
  }

  getUncommittedEvents(): DomainEvent[] {
    return [...this._domainEvents];
  }

  markEventsAsCommitted(): void {
    this._domainEvents = [];
  }
}

// Use Cases Layer
export abstract class UseCase<TRequest, TResponse> {
  abstract execute(request: TRequest): Promise<TResponse>;
}

export class GetOrderUseCase extends UseCase<GetOrderQuery, GetOrderResult> {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly authorizationService: AuthorizationService
  ) {
    super();
  }

  async execute(query: GetOrderQuery): Promise<GetOrderResult> {
    // Authorization check
    await this.authorizationService.ensureCanViewOrder(
      query.requesterId,
      new OrderId(query.orderId)
    );

    // Fetch order
    const order = await this.orderRepository.findById(new OrderId(query.orderId));
    
    if (!order) {
      throw new NotFoundError('Order not found');
    }

    // Map to response
    return new GetOrderResult(
      order.id.value,
      order.customerId.value,
      order.items.map(item => ({
        productId: item.productId.value,
        quantity: item.quantity,
        unitPrice: item.unitPrice.getAmount(),
        subtotal: item.getSubtotal().getAmount()
      })),
      order.status.toString(),
      order.total.getAmount(),
      order.createdAt,
      order.updatedAt
    );
  }
}

// Interface Adapters Layer
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getOrderUseCase: GetOrderUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase
  ) {}

  async createOrder(req: express.Request, res: express.Response): Promise<void> {
    try {
      const command = new CreateOrderCommand(
        req.user.id,
        req.body.customerId,
        req.body.items
      );

      const result = await this.createOrderUseCase.execute(command);

      res.status(201).json({
        success: true,
        data: result
      });
    } catch (error) {
      await this.handleError(error, res);
    }
  }

  async getOrder(req: express.Request, res: express.Response): Promise<void> {
    try {
      const query = new GetOrderQuery(
        req.user.id,
        req.params.orderId
      );

      const result = await this.getOrderUseCase.execute(query);

      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      await this.handleError(error, res);
    }
  }

  private async handleError(error: Error, res: express.Response): Promise<void> {
    if (error instanceof DomainError) {
      res.status(400).json({
        success: false,
        error: 'Domain Error',
        message: error.message
      });
    } else if (error instanceof NotFoundError) {
      res.status(404).json({
        success: false,
        error: 'Not Found',
        message: error.message
      });
    } else if (error instanceof ApplicationError) {
      res.status(422).json({
        success: false,
        error: 'Application Error',
        message: error.message
      });
    } else {
      console.error('Unexpected error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'An unexpected error occurred'
      });
    }
  }
}

// 4. MODULAR MONOLITH STRUCTURE

// Module Definition
export abstract class Module {
  abstract readonly name: string;
  abstract readonly dependencies: string[];

  abstract initialize(): Promise<void>;
  abstract start(): Promise<void>;
  abstract stop(): Promise<void>;
  abstract healthCheck(): Promise<HealthCheckResult>;
}

// Order Module
export class OrderModule extends Module {
  readonly name = 'orders';
  readonly dependencies = ['customers', 'inventory', 'payments'];

  private orderRepository: OrderRepository;
  private createOrderUseCase: CreateOrderUseCase;
  private eventBus: DomainEventBus;

  async initialize(): Promise<void> {
    // Initialize repositories
    this.orderRepository = new PostgresOrderRepository(
      container.get(Database),
      container.get(OrderMapper)
    );

    // Initialize use cases
    this.createOrderUseCase = new CreateOrderUseCase(
      this.orderRepository,
      container.get(CustomerRepository),
      container.get(OrderDomainService),
      container.get(DomainEventBus),
      container.get(UnitOfWork)
    );

    // Register event handlers
    this.eventBus = container.get(DomainEventBus);
    this.registerEventHandlers();
  }

  async start(): Promise<void> {
    console.log(`Starting ${this.name} module`);
    // Start module-specific services
  }

  async stop(): Promise<void> {
    console.log(`Stopping ${this.name} module`);
    // Cleanup resources
  }

  async healthCheck(): Promise<HealthCheckResult> {
    try {
      // Check database connectivity
      await this.orderRepository.findById(new OrderId('health-check'));
      
      return new HealthCheckResult(true, 'Order module is healthy');
    } catch (error) {
      return new HealthCheckResult(false, `Order module error: ${error.message}`);
    }
  }

  private registerEventHandlers(): void {
    this.eventBus.subscribe(CustomerCreatedEvent, this.handleCustomerCreated.bind(this));
    this.eventBus.subscribe(PaymentProcessedEvent, this.handlePaymentProcessed.bind(this));
  }

  private async handleCustomerCreated(event: CustomerCreatedEvent): Promise<void> {
    // Handle customer creation in order context
    console.log(`Customer ${event.customerId} created, updating order module state`);
  }

  private async handlePaymentProcessed(event: PaymentProcessedEvent): Promise<void> {
    // Handle payment processing
    const order = await this.orderRepository.findById(event.orderId);
    if (order) {
      const events = order.markAsPaid();
      await this.eventBus.publishAll(events);
    }
  }

  // Public API for other modules
  getOrderService(): OrderService {
    return new OrderService(this.createOrderUseCase, this.orderRepository);
  }
}

// Module Registry
export class ModuleRegistry {
  private modules: Map<string, Module> = new Map();
  private dependencyGraph: Map<string, string[]> = new Map();

  register(module: Module): void {
    this.modules.set(module.name, module);
    this.dependencyGraph.set(module.name, module.dependencies);
  }

  async initializeAll(): Promise<void> {
    const initOrder = this.getInitializationOrder();
    
    for (const moduleName of initOrder) {
      const module = this.modules.get(moduleName)!;
      console.log(`Initializing module: ${moduleName}`);
      await module.initialize();
    }
  }

  async startAll(): Promise<void> {
    const startOrder = this.getInitializationOrder();
    
    for (const moduleName of startOrder) {
      const module = this.modules.get(moduleName)!;
      await module.start();
    }
  }

  async stopAll(): Promise<void> {
    const stopOrder = this.getInitializationOrder().reverse();
    
    for (const moduleName of stopOrder) {
      const module = this.modules.get(moduleName)!;
      await module.stop();
    }
  }

  private getInitializationOrder(): string[] {
    // Topological sort of dependency graph
    const visited = new Set<string>();
    const temp = new Set<string>();
    const result: string[] = [];

    const visit = (node: string) => {
      if (temp.has(node)) {
        throw new Error(`Circular dependency detected involving module: ${node}`);
      }
      
      if (!visited.has(node)) {
        temp.add(node);
        
        const dependencies = this.dependencyGraph.get(node) || [];
        for (const dep of dependencies) {
          if (this.modules.has(dep)) {
            visit(dep);
          }
        }
        
        temp.delete(node);
        visited.add(node);
        result.push(node);
      }
    };

    for (const moduleName of this.modules.keys()) {
      visit(moduleName);
    }

    return result;
  }

  async healthCheck(): Promise<Map<string, HealthCheckResult>> {
    const results = new Map<string, HealthCheckResult>();
    
    for (const [name, module] of this.modules) {
      try {
        const result = await module.healthCheck();
        results.set(name, result);
      } catch (error) {
        results.set(name, new HealthCheckResult(false, error.message));
      }
    }

    return results;
  }
}

// Application Bootstrap
export class Application {
  private moduleRegistry: ModuleRegistry;

  constructor() {
    this.moduleRegistry = new ModuleRegistry();
    this.registerModules();
  }

  private registerModules(): void {
    this.moduleRegistry.register(new CustomerModule());
    this.moduleRegistry.register(new OrderModule());
    this.moduleRegistry.register(new InventoryModule());
    this.moduleRegistry.register(new PaymentModule());
    this.moduleRegistry.register(new ShippingModule());
  }

  async start(): Promise<void> {
    try {
      console.log('Starting modular monolith application');
      
      await this.moduleRegistry.initializeAll();
      await this.moduleRegistry.startAll();
      
      console.log('Application started successfully');
    } catch (error) {
      console.error('Failed to start application:', error);
      await this.stop();
      throw error;
    }
  }

  async stop(): Promise<void> {
    console.log('Stopping application');
    await this.moduleRegistry.stopAll();
    console.log('Application stopped');
  }

  async getHealthStatus(): Promise<Record<string, any>> {
    const moduleHealth = await this.moduleRegistry.healthCheck();
    
    const status = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      modules: {}
    };

    for (const [name, result] of moduleHealth) {
      status.modules[name] = {
        healthy: result.isHealthy,
        message: result.message
      };

      if (!result.isHealthy) {
        status.status = 'unhealthy';
      }
    }

    return status;
  }
}
```
*Notice: Enterprise architecture patterns provide structure and guidance but must be adapted to specific business requirements and constraints.*

</div>

## Best Practices

1. **SOLID Principles**: Foundation for good design
2. **Loose Coupling**: Minimize dependencies between components
3. **High Cohesion**: Keep related functionality together
4. **Separation of Concerns**: Each component has single responsibility
5. **DRY (Don't Repeat Yourself)**: Avoid code duplication
6. **KISS (Keep It Simple, Stupid)**: Avoid unnecessary complexity
7. **YAGNI (You Aren't Gonna Need It)**: Don't over-engineer solutions
8. **Event-First Design**: Design around business events and state changes
9. **Idempotency**: Ensure operations can be safely retried
10. **Graceful Degradation**: Handle failures without complete system breakdown
11. **Observability**: Comprehensive monitoring and tracing across distributed systems
12. **Data Consistency**: Choose appropriate consistency models for business requirements
13. **Domain Modeling**: Use ubiquitous language and bounded contexts from DDD
14. **Evolutionary Architecture**: Design for change and continuous evolution

## Summary

Software architecture provides the blueprint for building scalable, maintainable, and robust software systems. This comprehensive guide covers fundamental principles through advanced enterprise patterns.

**Architectural Foundations**: SOLID principles guide object-oriented design, design patterns provide proven solutions to common problems, architectural patterns like MVC and MVP organize application structure. Clean code practices ensure maintainability and readability.

**System Architecture**: Layered architecture separates concerns across application tiers, microservices enable independent service development and deployment, message-driven architecture provides loose coupling through asynchronous communication, event-driven patterns support reactive systems.

**Advanced Patterns**: CQRS separates read and write operations for optimal performance, Event Sourcing maintains complete audit trails, Saga pattern manages distributed transactions, Circuit Breaker prevents cascade failures, Bulkhead pattern isolates system resources.

**Enterprise Architecture**: Domain-Driven Design models complex business domains with bounded contexts and ubiquitous language, Hexagonal Architecture isolates business logic from external concerns, Clean Architecture enforces dependency inversion across layers, Modular Monolith provides microservice benefits within single deployable unit.

**Quality Attributes**: Performance optimization through caching, load balancing, and efficient algorithms, scalability through horizontal and vertical scaling strategies, security through defense in depth and secure coding practices, reliability through fault tolerance and disaster recovery.

**Modern Practices**: Event-driven architecture supports reactive and resilient systems, advanced microservices patterns including service mesh and API gateways, distributed system patterns for handling consistency and availability, monitoring and observability for system health tracking.

The architecture discipline encompasses both technical and business considerations, requiring balance between immediate needs and long-term evolution, team capabilities and system complexity, performance requirements and development velocity. Successful architecture evolves with changing requirements while maintaining core principles of modularity, separation of concerns, and sustainable development practices.