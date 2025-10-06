# Spring Framework

## Brief Summary

The Spring Framework is a comprehensive Java application development framework built on the principles of Inversion of Control (IoC) and Dependency Injection (DI). Spring Boot simplifies the setup process with auto-configuration and enables rapid development of production-ready applications. Its main advantages include modular architecture, extensive ecosystem, and support for enterprise-level services. Drawbacks include the learning curve and "magic" auto-configuration, which can make debugging more difficult.

<!-- Reading Progress Bar -->
<div id="read-progress"></div>

<!-- Tag Filter -->
<div class="tag-filter-container">
  <h3>🏷️ Filter by topics</h3>
  <div class="tag-filter-chips">
    <button class="filter-chip active" data-filter="all">All</button>
    <button class="filter-chip" data-filter="junior">Junior</button>
    <button class="filter-chip" data-filter="medior">Medior</button>
    <button class="filter-chip" data-filter="core">Core Spring</button>
    <button class="filter-chip" data-filter="web">Web & REST</button>
    <button class="filter-chip" data-filter="data">Data & DB</button>
    <button class="filter-chip" data-filter="security">Security</button>
    <button class="filter-chip" data-filter="reactive">Reactive</button>
    <button class="filter-chip" data-filter="testing">Testing</button>
    <button class="filter-chip" data-filter="performance">Performance</button>
  </div>
</div>

## Concepts

### Bean {#bean}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*A Bean is like a "factory product": the Spring IoC container is the factory that creates, configures, and manages its lifecycle.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Lifecycle management**: Spring automatically handles Bean creation and destruction
- **Dependency injection**: automatic dependency resolution with constructor/setter injection
- **Singleton scope**: by default, one instance per application context
- **Configuration flexibility**: annotation or Java config-based Bean definition

</div>

<div class="runnable-model">

**Runnable mental model**
```java
@Component
public class UserService {
    private final UserRepository userRepository;

    // Constructor injection (recommended)
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findUser(Long id) {
        return userRepository.findById(id);
    }
}

// Or in @Configuration class:
@Configuration
public class AppConfig {
    @Bean
    public UserService userService(UserRepository userRepository) {
        return new UserService(userRepository);
    }
}
```
*Notice: Spring automatically recognizes classes annotated with `@Component` and registers them as Beans when the application starts.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths / misconceptions</strong></summary>

<div>

- *"Bean is always singleton"* → Default yes, but can be prototype, request, session scope too
- *"@Component and @Bean are the same"* → @Component is class-level, @Bean is method-level configuration
- *"Spring makes every object a Bean"* → Only registered and recognized objects

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Micro-learning prompts</strong></summary>

<div>

1) What's the difference between @Component and @Bean?
<details><summary>Show answer</summary>
@Component is used on classes for auto-detection. @Bean is used on methods in @Configuration classes for manual Bean definition.
</details>

2) When would you use prototype scope?
<details><summary>Show answer</summary>
When you need a new instance every time the Bean is requested, like stateful objects or objects with request-specific data.
</details>

3) What happens if you have circular dependencies?
<details><summary>Show answer</summary>
Spring can resolve circular dependencies with setter injection, but constructor injection will cause a BeanCurrentlyInCreationException.
</details>

</div>
</details>

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Performance corner</strong></summary>

<div>

- **Bean creation cost**: Singleton Beans are created once, prototype Beans on every request
- **Proxy overhead**: AOP and @Transactional create proxies that add minor overhead
- **Lazy initialization**: Use @Lazy to defer Bean creation until first use

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Where you fail in interviews</strong></summary>

<div>

- Not knowing Bean scopes (singleton, prototype, request, session)
- Can't explain Bean lifecycle callbacks (@PostConstruct, @PreDestroy)
- Confusion between IoC container and application context

</div>
</details>

</div>

<div class="tags">
<span class="tag">spring</span>
<span class="tag">bean</span>
<span class="tag">junior</span>
<span class="tag">core</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Dependency Injection` · `Constructor Injection` · `Bean Resolution` · `IoC Container`

</div>

### @RestController {#restcontroller}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*@RestController is like an "API endpoint factory": it combines @Controller and @ResponseBody annotations for RESTful web services.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **REST API development**: simplified JSON/XML API endpoint creation
- **Automatic serialization**: ResponseEntity and @ResponseBody automatic JSON conversion
- **HTTP method mapping**: @GetMapping, @PostMapping, etc. for clean URL mapping
- **Exception handling**: @ExceptionHandler and @ControllerAdvice integrated error handling

</div>

<div class="runnable-model">

**Runnable mental model**
```java
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.findUserById(id);
        return user.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody CreateUserRequest request) {
        User created = userService.createUser(request);
        URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(created.getId())
            .toUri();
        
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, 
                                          @Valid @RequestBody UpdateUserRequest request) {
        Optional<User> updated = userService.updateUser(id, request);
        return updated.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        boolean deleted = userService.deleteUser(id);
        return deleted ? ResponseEntity.noContent().build() 
                      : ResponseEntity.notFound().build();
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidation(ValidationException e) {
        ErrorResponse error = new ErrorResponse("VALIDATION_ERROR", e.getMessage());
        return ResponseEntity.badRequest().body(error);
    }
}
```
*Notice: @RestController automatically serializes responses to JSON/XML format and handles HTTP requests.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths / misconceptions</strong></summary>

<div>

- "@ResponseBody is needed in @RestController" → @RestController automatically includes it
- "ResponseEntity is always required" → Direct object return also works
- "@Controller and @RestController are the same" → @RestController for JSON APIs, @Controller for view rendering

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Micro-learning prompts</strong></summary>

<div>

1) What's the difference between @Controller and @RestController?
<details><summary>Show answer</summary>
@RestController = @Controller + @ResponseBody. Automatically serializes return values to JSON/XML.
</details>

2) When to use ResponseEntity vs direct object return?
<details><summary>Show answer</summary>
Use ResponseEntity when you need to control HTTP status codes and headers. Direct return for simple cases.
</details>

3) How does @Valid work with @RequestBody?
<details><summary>Show answer</summary>
@Valid triggers bean validation on the request body. Throws MethodArgumentNotValidException if validation fails.
</details>

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Where you fail in interviews</strong></summary>

<div>

- Can't explain REST principles (idempotency, statelessness)
- Don't understand HTTP status codes properly
- Can't handle validation errors gracefully

</div>
</details>

</div>

<div class="tags">
<span class="tag">spring</span>
<span class="tag">rest-controller</span>
<span class="tag">web-api</span>
<span class="tag">junior</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`HTTP Methods` · `JSON Serialization` · `Request Mapping` · `Exception Handling` · `Response Entity`

</div>

## Advanced Topics

### Spring IoC Container {#ioc-container}

</div>

### @Component {#component}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*@Component is like a "registration form": it tells Spring "please manage this class as a Bean in your container".*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Auto-detection**: Spring automatically finds and registers @Component classes
- **Stereotype annotation**: base annotation for other stereotypes like @Service, @Repository
- **Component scanning**: works with @ComponentScan to discover Beans
- **Dependency injection**: enables automatic wiring of dependencies

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Basic component
@Component
public class EmailService {
    public void sendEmail(String to, String message) {
        System.out.println("Sending email to: " + to);
    }
}

// With explicit Bean name
@Component("userProcessor")
public class UserProcessingService {
    private final EmailService emailService;
    
    public UserProcessingService(EmailService emailService) {
        this.emailService = emailService;
    }
    
    public void processUser(User user) {
        // Process user...
        emailService.sendEmail(user.getEmail(), "Welcome!");
    }
}

// Enable component scanning
@Configuration
@ComponentScan(basePackages = "com.example.services")
public class AppConfig {
    // Spring will automatically find all @Component classes in the package
}
```
*Notice: Spring creates a Bean named "userProcessor" instead of the default "userProcessingService".*

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>Component best practices</strong></summary>

<div>

- **Use specific stereotypes**: Prefer @Service, @Repository over generic @Component
- **Single responsibility**: Each component should have one clear purpose
- **Constructor injection**: Use constructor injection for required dependencies
- **Meaningful names**: Use explicit names for components when needed

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Where you fail in interviews</strong></summary>

<div>

- Not knowing the difference between @Component and other stereotypes
- Can't explain component scanning mechanism
- Don't understand Bean naming conventions

</div>
</details>

</div>

<div class="tags">
<span class="tag">spring</span>
<span class="tag">component</span>
<span class="tag">junior</span>
<span class="tag">core</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`@Component` · `Dependency Injection` · `Component Scanning` · `Spring Boot Auto-configuration`

</div>

### @Autowired {#autowired}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*@Autowired is like an "automatic wiring service": it automatically connects dependencies, but constructor injection is the best choice.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Dependency injection**: automatic dependency resolution and injection
- **Flexibility**: supports constructor, field, or setter injection
- **Type matching**: type-based autowiring with byType strategy
- **Optional dependencies**: @Autowired(required=false) for optional injection

</div>

<div class="runnable-model">

**Runnable mental model**
```java
@Service
public class OrderService {
    private final PaymentService paymentService;
    private final EmailService emailService;
    private final InventoryService inventoryService;

    // Constructor injection (RECOMMENDED)
    public OrderService(PaymentService paymentService, 
                       EmailService emailService, 
                       InventoryService inventoryService) {
        this.paymentService = paymentService;
        this.emailService = emailService;
        this.inventoryService = inventoryService;
    }

    /* ALTERNATIVES TO AVOID:
    
    // Field injection (avoid - hard to test)
    @Autowired
    private PaymentService paymentService;
    
    // Setter injection (rarely used)
    @Autowired
    public void setPaymentService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
    */

    public Order processOrder(OrderRequest request) {
        // Check inventory
        if (!inventoryService.isAvailable(request.getProductId(), request.getQuantity())) {
            throw new OutOfStockException("Product out of stock");
        }

        // Process payment
        Payment payment = paymentService.processPayment(request.getPaymentInfo());
        
        // Create order
        Order order = new Order(request, payment);
        
        // Send confirmation email
        emailService.sendOrderConfirmation(order);
        
        return order;
    }
}
```
*Notice: constructor injection ensures required dependencies and enables immutable objects, making it the recommended practice.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths / misconceptions</strong></summary>

<div>

- "@Autowired is always required for constructor injection" → Spring 4.3+ has implicit constructor injection
- "Field injection is faster" → Constructor injection is equally fast and safer
- "@Autowired always finds a bean" → NoSuchBeanDefinitionException if no suitable bean exists

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Micro-learning prompts</strong></summary>

<div>

1) Why is constructor injection better than field injection?
<details><summary>Show answer</summary>
Immutable objects, better testability, explicit dependencies, fail-fast.
</details>

2) What happens if Spring can't find a bean to autowire?
<details><summary>Show answer</summary>
NoSuchBeanDefinitionException is thrown at startup unless required=false.
</details>

3) When would you use @Autowired(required=false)?
<details><summary>Show answer</summary>
For optional dependencies that may or may not be available in the context.
</details>

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Where you fail in interviews</strong></summary>

<div>

- Not understanding the difference between injection types
- Can't explain why constructor injection is preferred
- Don't know how Spring resolves bean conflicts

</div>
</details>

</div>

<div class="tags">
<span class="tag">spring</span>
<span class="tag">autowired</span>
<span class="tag">dependency-injection</span>
<span class="tag">junior</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Dependency Injection` · `Constructor Injection` · `Bean Resolution` · `IoC Container`

</div>

### @RestController {#restcontroller}

</div>

### @Service {#service}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*@Service is like a "business manager": it handles business logic and coordinates between different parts of the application.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Business logic layer**: clearly identifies service layer components
- **Transaction boundary**: often where @Transactional annotations are placed
- **Separation of concerns**: keeps business logic separate from controllers and repositories
- **Testability**: easier to unit test business logic in isolation

</div>

<div class="runnable-model">

**Runnable mental model**
```java
@Service
@Transactional
public class OrderService {
    private final OrderRepository orderRepository;
    private final PaymentService paymentService;
    private final EmailService emailService;
    
    public OrderService(OrderRepository orderRepository, 
                       PaymentService paymentService,
                       EmailService emailService) {
        this.orderRepository = orderRepository;
        this.paymentService = paymentService;
        this.emailService = emailService;
    }
    
    public Order processOrder(OrderRequest request) {
        // Validate order
        validateOrder(request);
        
        // Create order
        Order order = new Order(request);
        order = orderRepository.save(order);
        
        // Process payment
        PaymentResult payment = paymentService.processPayment(
            order.getTotalAmount(), request.getPaymentInfo()
        );
        
        if (payment.isSuccessful()) {
            order.setStatus(OrderStatus.CONFIRMED);
            emailService.sendOrderConfirmation(order);
        } else {
            order.setStatus(OrderStatus.PAYMENT_FAILED);
            throw new PaymentException("Payment failed: " + payment.getErrorMessage());
        }
        
        return orderRepository.save(order);
    }
    
    private void validateOrder(OrderRequest request) {
        if (request.getItems().isEmpty()) {
            throw new InvalidOrderException("Order must contain at least one item");
        }
    }
}
```
*Notice: The service orchestrates multiple components and handles business logic and transactions.*

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>Service layer best practices</strong></summary>

<div>

- **Business logic placement**: Keep business rules in service layer
- **Transaction boundaries**: Use @Transactional at service level
- **Input validation**: Validate business rules, not just data format
- **Exception handling**: Convert repository exceptions to business exceptions

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Where you fail in interviews</strong></summary>

<div>

- Can't explain the difference between @Service and @Component
- Don't understand transaction boundaries in service layer
- Mix controller logic with service logic

</div>
</details>

</div>

<div class="tags">
<span class="tag">spring</span>
<span class="tag">service</span>
<span class="tag">junior</span>
<span class="tag">business-logic</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`@Transactional` · `Business Logic` · `Service Layer` · `Transaction Management` · `Exception Handling`

</div>

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*DI is like having a personal assistant: instead of you finding and managing your dependencies, the framework provides them when needed.*

</div>

**Key benefits:**
- Reduces coupling between classes
- Makes testing easier with mock objects
- Promotes loose coupling and high cohesion
- Centralized configuration

```java
// Without DI - tight coupling
public class OrderService {
    private EmailService emailService = new EmailService(); // Hard dependency
    
    public void processOrder(Order order) {
        // Process order...
        emailService.sendConfirmation(order);
    }
}

// With DI - loose coupling
@Service
public class OrderService {
    private final EmailService emailService;
    
    // Constructor injection (recommended)
    public OrderService(EmailService emailService) {
        this.emailService = emailService;
    }
    
    public void processOrder(Order order) {
        // Process order...
        emailService.sendConfirmation(order);
    }
}
```

### Spring Boot {#spring-boot}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Spring Boot is like a smart home system: it automatically configures everything based on what it finds, with sensible defaults.*

</div>

**Key features:**
- Auto-configuration based on classpath
- Embedded web servers (Tomcat, Jetty)
- Production-ready features (health checks, metrics)
- Minimal configuration required

```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    private final UserService userService;
    
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.findById(id);
        return ResponseEntity.ok(user);
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody @Valid User user) {
        User savedUser = userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }
}
```

### Spring Data JPA {#spring-data-jpa}

**Repository pattern made simple:**

```java
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true)
    private String email;
    
    private String name;
    
    // Constructors, getters, setters...
}

// Repository interface - Spring generates implementation
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByNameContaining(String name);
    
    @Query("SELECT u FROM User u WHERE u.email = ?1 AND u.active = true")
    Optional<User> findActiveUserByEmail(String email);
}

@Service
public class UserService {
    private final UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public User findById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException("User not found: " + id));
    }
    
    public User save(User user) {
        return userRepository.save(user);
    }
}
```

## Common Annotations

### Core Annotations
- `@Component`: Generic stereotype for Spring-managed component
- `@Service`: Business logic layer
- `@Repository`: Data access layer
- `@Controller`: Web layer (returns views)
- `@RestController`: REST API layer (returns JSON/XML)

### Dependency Injection
- `@Autowired`: Inject dependencies (field, setter, constructor)
- `@Qualifier`: Specify which bean to inject when multiple candidates exist
- `@Value`: Inject values from properties files

### Configuration
- `@Configuration`: Java-based configuration
- `@Bean`: Define a bean in configuration
- `@ComponentScan`: Specify packages to scan for components

### Web Layer
- `@RequestMapping`: Map HTTP requests to methods
- `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`: HTTP method specific mappings
- `@PathVariable`: Extract values from URL path
- `@RequestParam`: Extract query parameters
- `@RequestBody`: Bind request body to object

## Configuration Examples

### Application Properties
```properties
# application.properties
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=user
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Logging
logging.level.com.example=DEBUG
logging.level.org.springframework.web=INFO
```

### Java Configuration
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .oauth2Login();
        return http.build();
    }
}
```

🗺️ **Connection map**  
`Observer Pattern` · `Asynchronous Processing` · `Decoupling` · `Event-Driven Architecture`

</div>

### Spring WebFlux {#spring-webflux}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*WebFlux is like an "asynchronous pipeline": Mono = one element, Flux = stream, reactive = non-blocking flow.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Non-blocking I/O**: single thread can handle thousands of concurrent requests
- **Resource efficiency**: low memory and thread usage under high load
- **Backpressure**: automatic flow control against fast producers
- **Functional style**: declarative programming and composition possibilities

</div>

<div class="runnable-model">

**Runnable mental model**
```java
@RestController
@RequestMapping("/api/reactive")
public class ReactiveUserController {
    private final ReactiveUserService userService;

    @GetMapping("/users/{id}")
    public Mono<ResponseEntity<User>> getUser(@PathVariable String id) {
        return userService.findById(id)
            .map(user -> ResponseEntity.ok(user))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @GetMapping("/users")
    public Flux<User> getAllUsers() {
        return userService.findAll()
            .delayElements(Duration.ofMillis(100))
            .onBackpressureBuffer(1000);
    }

    @PostMapping("/users")
    public Mono<User> createUser(@RequestBody Mono<User> userMono) {
        return userMono
            .flatMap(user -> userService.validateUser(user)
                .then(userService.save(user)));
    }
}

// Reactive repository
@Repository
public interface ReactiveUserRepository extends ReactiveCrudRepository<User, String> {
    Flux<User> findByLastName(String lastName);
    Mono<Boolean> existsByEmail(String email);
}
```

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Reactive Streams` · `Non-blocking I/O` · `Mono` · `Flux` · `WebClient` · `Backpressure`

</div>

### Spring Boot Testing {#spring-boot-testing}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Spring Boot Testing is like a "testing toolkit": @SpringBootTest = full app, @WebMvcTest = controllers only, @DataJpaTest = repositories only.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Test slices**: test specific layers without loading entire application
- **Auto-configuration**: automatically configure test environment
- **Mocking support**: easy integration with Mockito and TestContainers
- **Real integration**: test with actual Spring context and configurations

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Full integration test
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserServiceIntegrationTest {
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Test
    void shouldCreateUser() {
        CreateUserRequest request = new CreateUserRequest("John", "Doe", "john@example.com");
        
        ResponseEntity<User> response = restTemplate.postForEntity("/api/users", request, User.class);
        
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().getEmail()).isEqualTo("john@example.com");
    }
}

// Controller test
@WebMvcTest(UserController.class)
class UserControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private UserService userService;
    
    @Test
    void shouldReturnUser() throws Exception {
        User user = new User("John", "Doe", "john@example.com");
        when(userService.findById(1L)).thenReturn(user);
        
        mockMvc.perform(get("/api/users/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.email").value("john@example.com"));
    }
}

// Repository test
@DataJpaTest
class UserRepositoryTest {
    
    @Autowired
    private TestEntityManager entityManager;
    
    @Autowired
    private UserRepository userRepository;
    
    @Test
    void shouldFindByEmail() {
        User user = new User("John", "Doe", "john@example.com");
        entityManager.persistAndFlush(user);
        
        Optional<User> found = userRepository.findByEmail("john@example.com");
        
        assertThat(found).isPresent();
    }
}
```

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Test Slices` · `MockMvc` · `TestContainers` · `Integration Testing` · `Unit Testing`

</div>

## Best Practices

1. **Constructor injection over field injection**: More testable and immutable
2. **Use specific stereotype annotations**: `@Service`, `@Repository` instead of generic `@Component`
3. **Keep controllers thin**: Move business logic to service layer
4. **Use DTOs for API contracts**: Don't expose entities directly
5. **Handle exceptions properly**: Use `@ControllerAdvice` for global exception handling
6. **Validate input**: Use Bean Validation annotations
7. **Configure properly**: Use profiles for different environments

## Common Patterns

### Exception Handling
```java
@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFound(UserNotFoundException ex) {
        ErrorResponse error = new ErrorResponse("USER_NOT_FOUND", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidation(ValidationException ex) {
        ErrorResponse error = new ErrorResponse("VALIDATION_ERROR", ex.getMessage());
        return ResponseEntity.badRequest().body(error);
    }
}
```

### Profiles for Different Environments
```java
@Configuration
@Profile("development")
public class DevConfig {
    @Bean
    public DataSource dataSource() {
        return new EmbeddedDatabaseBuilder()
            .setType(EmbeddedDatabaseType.H2)
            .build();
    }
}

@Configuration
@Profile("production")
public class ProdConfig {
    @Bean
    public DataSource dataSource() {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl("jdbc:postgresql://prod-db:5432/myapp");
        return new HikariDataSource(config);
    }
}
```

## Advanced Topics

### Spring IoC Container {#ioc-container}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*IoC Container is like a "smart factory": it creates, configures, and manages object lifecycles, inverting the control from your code to the framework.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Dependency management**: automatically resolves and injects dependencies
- **Object lifecycle**: handles bean creation, initialization, and destruction
- **Configuration flexibility**: supports XML, annotations, and Java config
- **Singleton management**: ensures proper object scoping and lifecycle

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Bean lifecycle example
@Component
public class DatabaseService implements InitializingBean, DisposableBean {
    private DataSource dataSource;
    private Connection connection;
    
    // Constructor injection
    public DatabaseService(DataSource dataSource) {
        this.dataSource = dataSource;
        System.out.println("1. Constructor called");
    }
    
    // Post-construction initialization
    @PostConstruct
    public void init() {
        System.out.println("2. @PostConstruct called");
        this.connection = dataSource.getConnection();
    }
    
    // InitializingBean interface
    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("3. afterPropertiesSet called");
        // Additional initialization logic
    }
    
    // Bean is ready for use
    public void performDatabaseOperation() {
        System.out.println("4. Bean in use");
    }
    
    // Pre-destruction cleanup
    @PreDestroy
    public void cleanup() {
        System.out.println("5. @PreDestroy called");
        if (connection != null) {
            connection.close();
        }
    }
    
    // DisposableBean interface
    @Override
    public void destroy() throws Exception {
        System.out.println("6. destroy called");
    }
}
```

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Bean Lifecycle` · `Dependency Injection` · `Application Context` · `Bean Scopes` · `Configuration`

</div>

### Spring Data JPA {#spring-data-jpa}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Spring Data JPA is like a "smart database assistant": it generates repository implementations automatically based on method names and annotations.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Boilerplate reduction**: automatic repository implementations
- **Query generation**: method name-based query derivation
- **Custom queries**: @Query annotation for complex operations
- **Pagination and sorting**: built-in support for large datasets

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Entity definition
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String firstName;
    
    @Column(nullable = false)
    private String lastName;
    
    @Enumerated(EnumType.STRING)
    private UserStatus status;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    // Constructors, getters, setters...
}

// Repository interface - Spring generates implementation
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Method name-based queries (Spring generates SQL)
    List<User> findByEmail(String email);
    List<User> findByFirstNameAndLastName(String firstName, String lastName);
    List<User> findByStatusAndCreatedAtAfter(UserStatus status, LocalDateTime date);
    
    // Pagination and sorting
    Page<User> findByStatus(UserStatus status, Pageable pageable);
    
    // Custom queries with @Query
    @Query("SELECT u FROM User u WHERE u.email LIKE %:domain%")
    List<User> findByEmailDomain(@Param("domain") String domain);
    
    @Query(value = "SELECT * FROM users u WHERE u.created_at > :date", nativeQuery = true)
    List<User> findRecentUsers(@Param("date") LocalDateTime date);
    
    // Modifying queries
    @Modifying
    @Query("UPDATE User u SET u.status = :status WHERE u.id = :id")
    int updateUserStatus(@Param("id") Long id, @Param("status") UserStatus status);
}

// Service layer usage
@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public Page<User> getActiveUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return userRepository.findByStatus(UserStatus.ACTIVE, pageable);
    }
    
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email).stream().findFirst();
    }
}
```
*Notice: Spring Data JPA eliminates most boilerplate CRUD code and provides powerful query capabilities.*

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`JPA Entities` · `Repository Pattern` · `Query Methods` · `Pagination` · `Transactions`

</div>

### Spring Security {#spring-security}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Spring Security is like a "comprehensive security guard": it handles authentication, authorization, and protection against common security threats.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Authentication**: verify user identity (login, JWT, OAuth2)
- **Authorization**: control access to resources based on roles/permissions
- **Security protection**: CSRF, XSS, session management
- **Integration**: seamless integration with Spring applications

</div>

<div class="runnable-model">

**Runnable mental model**
```java
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
    
    private final UserDetailsService userDetailsService;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtRequestFilter jwtRequestFilter;
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/users").hasRole("USER")
                .requestMatchers(HttpMethod.POST, "/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
            .and()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
}

// JWT Token handling
@Component
public class JwtTokenUtil {
    private static final String SECRET = "mySecretKey";
    private static final int JWT_TOKEN_VALIDITY = 5 * 60 * 60; // 5 hours
    
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }
    
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }
    
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}

// Method-level security
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or #id == authentication.principal.id")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        // Only admins or the user themselves can access
        return ResponseEntity.ok(userService.findById(id));
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        // Only admins can create users
        return ResponseEntity.ok(userService.create(user));
    }
}
```
*Notice: Spring Security provides comprehensive security with minimal configuration and supports modern authentication methods.*

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Authentication` · `Authorization` · `JWT Tokens` · `OAuth2` · `Method Security` · `CSRF Protection`

</div>

### @Transactional {#transactional}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*@Transactional is like a "database safety net": automatic commit/rollback mechanism that ensures ACID properties.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **ACID compliance**: automatic transaction boundary management
- **Declarative approach**: annotation-based transaction handling with AOP
- **Rollback handling**: automatic rollback on unchecked exceptions
- **Isolation levels**: configurable isolation and propagation levels

</div>

<div class="runnable-model">

**Runnable mental model**
```java
@Service
@Transactional(readOnly = true) // Class-level default: read-only
public class BankingService {
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    // Write transaction - overrides class-level read-only
    @Transactional(
        isolation = Isolation.READ_COMMITTED,
        propagation = Propagation.REQUIRED,
        rollbackFor = {BankingException.class},
        timeout = 30
    )
    public void transferMoney(Long fromAccountId, Long toAccountId, BigDecimal amount) {
        // Validation
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }

        // Fetch accounts
        Account fromAccount = accountRepository.findById(fromAccountId)
            .orElseThrow(() -> new AccountNotFoundException("Source account not found"));
        
        Account toAccount = accountRepository.findById(toAccountId)
            .orElseThrow(() -> new AccountNotFoundException("Target account not found"));

        // Balance check
        if (fromAccount.getBalance().compareTo(amount) < 0) {
            throw new InsufficientFundsException("Insufficient balance");
        }

        // Execute transaction
        fromAccount.withdraw(amount);
        toAccount.deposit(amount);

        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);

        // Transaction log
        BankTransaction transaction = new BankTransaction(fromAccountId, toAccountId, amount);
        transactionRepository.save(transaction);
    }

    // Read-only method uses class-level default
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }
    
    // Nested transaction example
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void logAuditEvent(AuditEvent event) {
        // This always runs in a separate transaction
        auditRepository.save(event);
    }
}
```
*Notice: @Transactional provides automatic rollback on unchecked exceptions and supports configurable isolation levels and timeouts.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths / misconceptions</strong></summary>

<div>

- "@Transactional rolls back on checked exceptions too" → Only unchecked exceptions by default
- "Transaction always opens new connection" → Propagation REQUIRED reuses existing one
- "@Transactional works on private methods" → Only public methods due to AOP proxy

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Micro-learning prompts</strong></summary>

<div>

1) What's the difference between REQUIRED vs REQUIRES_NEW propagation?
<details><summary>Show answer</summary>
REQUIRED: join existing transaction. REQUIRES_NEW: always start new transaction.
</details>

2) When to use readOnly=true annotation?
<details><summary>Show answer</summary>
For methods that only read data. Optimizes performance and prevents accidental writes.
</details>

3) How does @Transactional handle rollback?
<details><summary>Show answer</summary>
Automatic rollback on RuntimeException and Error. Manual rollback configuration with rollbackFor.
</details>

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Database Transactions` · `ACID Properties` · `Rollback` · `Isolation Levels` · `AOP Proxies`

</div>

### Validation {#validation}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Validation is like a "data quality checkpoint": ensures data meets business rules before processing.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Data integrity**: ensures valid data enters the system
- **User feedback**: provides clear error messages for invalid input
- **Security**: prevents malicious or malformed data
- **Business rules**: enforces domain-specific constraints

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// DTO with validation annotations
public class CreateUserRequest {
    @NotBlank(message = "First name is required")
    @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
    private String firstName;
    
    @NotBlank(message = "Last name is required")
    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
    private String lastName;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;
    
    @NotNull(message = "Age is required")
    @Min(value = 18, message = "Age must be at least 18")
    @Max(value = 120, message = "Age must be less than 120")
    private Integer age;
    
    @Pattern(regexp = "^[+]?[0-9]{10,15}$", message = "Phone number is invalid")
    private String phoneNumber;
    
    @Valid // Nested object validation
    private Address address;
    
    // Getters and setters...
}

// Controller with validation
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody CreateUserRequest request) {
        // If validation fails, MethodArgumentNotValidException is thrown
        User user = userService.createUser(request);
        return ResponseEntity.ok(user);
    }
    
    // Global exception handler for validation errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        ValidationErrorResponse errorResponse = new ValidationErrorResponse();
        errorResponse.setMessage("Validation failed");
        
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> 
            errors.put(error.getField(), error.getDefaultMessage())
        );
        
        errorResponse.setFieldErrors(errors);
        return ResponseEntity.badRequest().body(errorResponse);
    }
}

// Custom validation annotation
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = UniqueEmailValidator.class)
@Documented
public @interface UniqueEmail {
    String message() default "Email already exists";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

// Custom validator implementation
@Component
public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {
    
    @Autowired
    private UserRepository userRepository;
    
    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        if (email == null) {
            return true; // Let @NotNull handle null values
        }
        return !userRepository.existsByEmail(email);
    }
}

// Service layer validation
@Service
@Validated // Enable method-level validation
public class UserService {
    
    public User updateUser(@Valid UpdateUserRequest request) {
        // Method parameter validation
        return userRepository.save(updatedUser);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(@NotNull @Min(1) Long userId) {
        // Simple parameter validation
        userRepository.deleteById(userId);
    }
}
```
*Notice: Spring validation provides comprehensive data validation at multiple layers with clear error handling.*

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Bean Validation` · `JSR-303` · `Hibernate Validator` · `Error Handling` · `Data Integrity`

</div>

### Spring Actuator {#actuator}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Actuator is like an "application dashboard": production-ready monitoring endpoints for real-time tracking of application health, performance, and configuration.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Production monitoring**: health checks, metrics, and application info endpoints
- **Operational insights**: memory usage, thread dumps, environment properties
- **Management endpoints**: graceful shutdown, configuration refresh, logging level changes
- **Integration ready**: Prometheus, Grafana, and other monitoring tools support

</div>

<div class="runnable-model">

**Runnable mental model**
```yaml
# application.yml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
      base-path: /actuator
  endpoint:
    health:
      show-details: when-authorized
  info:
    env:
      enabled: true
  metrics:
    export:
      prometheus:
        enabled: true
```

```java
// Custom health indicator
@Component
public class DatabaseHealthIndicator implements HealthIndicator {
    private final DataSource dataSource;

    public DatabaseHealthIndicator(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public Health health() {
        try (Connection connection = dataSource.getConnection()) {
            if (connection.isValid(1)) {
                return Health.up()
                    .withDetail("database", "Available")
                    .withDetail("validationQuery", "SELECT 1")
                    .withDetail("responseTime", "5ms")
                    .build();
            }
        } catch (SQLException e) {
            return Health.down()
                .withDetail("database", "Unavailable")
                .withException(e)
                .build();
        }
        return Health.down().withDetail("database", "Validation failed").build();
    }
}

// Available endpoints:
// GET /actuator/health - Application health status
// GET /actuator/info - Application information
// GET /actuator/metrics - Available metrics
// GET /actuator/env - Environment properties
// GET /actuator/beans - Spring beans information
```
*Notice: Actuator provides production monitoring tools like health checks, metrics, and environment info.*

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Health Checks` · `Metrics` · `Monitoring` · `Prometheus` · `Production Readiness`

</div>

### Spring AOP {#spring-aop}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Spring AOP is like "invisible assistants": they automatically handle cross-cutting concerns (logging, security, transactions) without cluttering your business logic.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Separation of concerns**: keeps business logic clean from cross-cutting concerns
- **Code reusability**: same aspect can be applied to multiple methods
- **Maintainability**: centralized handling of logging, security, caching
- **Non-invasive**: aspects are applied without modifying existing code

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Aspect definition
@Aspect
@Component
public class LoggingAspect {
    
    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);
    
    // Pointcut expression - defines where to apply advice
    @Pointcut("execution(* com.example.service.*.*(..))")
    public void serviceLayer() {}
    
    @Pointcut("@annotation(com.example.annotation.Loggable)")
    public void loggableMethod() {}
    
    // Before advice - executes before method
    @Before("serviceLayer() && loggableMethod()")
    public void logMethodEntry(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        String className = joinPoint.getTarget().getClass().getSimpleName();
        Object[] args = joinPoint.getArgs();
        
        logger.info("Entering method: {}.{}() with arguments: {}", 
                   className, methodName, Arrays.toString(args));
    }
    
    // Around advice - most powerful, can control method execution
    @Around("@annotation(com.example.annotation.Timed)")
    public Object measureExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        
        try {
            Object result = joinPoint.proceed(); // Execute the actual method
            long endTime = System.currentTimeMillis();
            
            logger.info("Method {} executed in {} ms", 
                       joinPoint.getSignature().getName(), 
                       (endTime - startTime));
            
            return result;
        } catch (Exception e) {
            logger.error("Method {} failed after {} ms", 
                        joinPoint.getSignature().getName(), 
                        (System.currentTimeMillis() - startTime));
            throw e;
        }
    }
}

// Service class using aspects
@Service
public class UserService {
    
    @Loggable
    @Timed
    public User createUser(CreateUserRequest request) {
        // Business logic here
        // Logging and timing will be handled by aspects
        return new User(request.getFirstName(), request.getLastName(), request.getEmail());
    }
}
```
*Notice: AOP allows you to apply cross-cutting concerns transparently without modifying business logic.*

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Cross-cutting Concerns` · `Proxy Pattern` · `Pointcuts` · `Advice Types` · `AspectJ`

</div>

### Caching {#caching}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Spring Caching is like a "memory notebook": @Cacheable = taking notes, @CacheEvict = erasing, cache provider = notebook type.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Performance**: store results of expensive operations (DB queries, API calls)
- **Scalability**: cache hits reduce backend load
- **Abstraction**: provider-independent cache API (Redis, EhCache, Caffeine)
- **Declarative**: annotation-based with minimal code changes

</div>

<div class="runnable-model">

**Runnable mental model**
```java
@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager();
        cacheManager.setCaffeine(Caffeine.newBuilder()
            .maximumSize(1000)
            .expireAfterWrite(Duration.ofMinutes(10))
            .recordStats());
        return cacheManager;
    }

    // Redis cache configuration (alternative)
    @Bean
    @Primary
    public CacheManager redisCacheManager(RedisConnectionFactory connectionFactory) {
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(10))
            .serializeKeysWith(RedisSerializationContext.SerializationPair
                .fromSerializer(new StringRedisSerializer()))
            .serializeValuesWith(RedisSerializationContext.SerializationPair
                .fromSerializer(new GenericJackson2JsonRedisSerializer()));
        
        return RedisCacheManager.builder(connectionFactory)
            .cacheDefaults(config)
            .build();
    }
}

@Service
public class UserService {
    private final UserRepository userRepository;

    // Cache method result
    @Cacheable(value = "users", key = "#id")
    public User findById(Long id) {
        System.out.println("Fetching user from database: " + id);
        return userRepository.findById(id).orElse(null);
    }

    // Conditional caching
    @Cacheable(value = "usersByEmail", key = "#email", condition = "#email.length() > 5")
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    // Remove cache entry
    @CacheEvict(value = "users", key = "#user.id")
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    // Clear all cache entries
    @CacheEvict(value = {"users", "usersByEmail"}, allEntries = true)
    public void clearAllCaches() {
        System.out.println("All user caches cleared");
    }

    // Always execute method and update cache
    @CachePut(value = "users", key = "#result.id")
    public User createUser(String name, String email) {
        User user = new User(name, email);
        return userRepository.save(user);
    }
    
    // Complex cache key
    @Cacheable(value = "userSearch", key = "T(String).valueOf(#page).concat('-').concat(#size)")
    public Page<User> findUsers(int page, int size) {
        return userRepository.findAll(PageRequest.of(page, size));
    }
}

// Custom cache key generator
@Component
public class CustomKeyGenerator implements KeyGenerator {
    @Override
    public Object generate(Object target, Method method, Object... params) {
        return method.getName() + "_" + Arrays.deepHashCode(params);
    }
}

// Programmatic cache access
@Service
public class CacheService {
    
    @Autowired
    private CacheManager cacheManager;
    
    public void manualCacheOperation() {
        Cache userCache = cacheManager.getCache("users");
        
        // Get from cache
        User user = userCache.get(1L, User.class);
        
        // Put into cache
        userCache.put(1L, new User("John", "john@example.com"));
        
        // Remove from cache
        userCache.evict(1L);
    }
}
```
*Notice: Cache annotations automatically handle cache hit/miss logic and key generation.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths</strong></summary>

<div>

- "Cache always speeds up the application" → For small objects or fast DBs, it can be overhead
- "@Cacheable always caches" → Self-invocation (internal method calls) doesn't work
- "Redis is always better than in-memory cache" → Local cache is faster but not scalable

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Performance` · `Redis` · `Caffeine` · `Cache Providers` · `Memory Management`

</div>

### Event Handling {#event-handling}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Spring Events are like a "notification system": publishers announce events, subscribers listen and react, all decoupled.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Decoupling**: components communicate without direct dependencies
- **Extensibility**: new features can subscribe to existing events
- **Asynchronous processing**: events can be processed async for better performance
- **Audit trails**: track application behavior through events

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Custom event
public class UserRegisteredEvent extends ApplicationEvent {
    private final User user;
    private final String registrationSource;
    
    public UserRegisteredEvent(Object source, User user, String registrationSource) {
        super(source);
        this.user = user;
        this.registrationSource = registrationSource;
    }
    
    // Getters...
}

// Event publisher
@Service
public class UserService {
    private final ApplicationEventPublisher eventPublisher;
    private final UserRepository userRepository;
    
    public UserService(ApplicationEventPublisher eventPublisher, 
                      UserRepository userRepository) {
        this.eventPublisher = eventPublisher;
        this.userRepository = userRepository;
    }
    
    public User registerUser(CreateUserRequest request) {
        // Create user
        User user = new User(request.getFirstName(), request.getLastName(), request.getEmail());
        User savedUser = userRepository.save(user);
        
        // Publish event
        UserRegisteredEvent event = new UserRegisteredEvent(this, savedUser, "web");
        eventPublisher.publishEvent(event);
        
        return savedUser;
    }
}

// Event listeners
@Component
public class EmailNotificationService {
    
    @EventListener
    public void handleUserRegistered(UserRegisteredEvent event) {
        User user = event.getUser();
        System.out.println("Sending welcome email to: " + user.getEmail());
        // Send email logic...
    }
    
    @EventListener
    @Conditional(UserRegisteredEvent.class)
    public void handlePremiumUserRegistered(UserRegisteredEvent event) {
        if (event.getUser().isPremium()) {
            System.out.println("Sending premium welcome package");
        }
    }
}

@Component
public class AuditService {
    
    @EventListener
    @Async // Process asynchronously
    public void auditUserRegistration(UserRegisteredEvent event) {
        AuditLog log = new AuditLog();
        log.setAction("USER_REGISTERED");
        log.setUserId(event.getUser().getId());
        log.setSource(event.getRegistrationSource());
        log.setTimestamp(Instant.now());
        
        // Save audit log
        auditRepository.save(log);
    }
}

// Generic event listener for all application events
@Component
public class GenericEventListener {
    
    @EventListener
    public void handleAnyApplicationEvent(ApplicationEvent event) {
        System.out.println("Event received: " + event.getClass().getSimpleName());
    }
    
    // Multiple events
    @EventListener({UserRegisteredEvent.class, UserDeletedEvent.class})
    public void handleUserEvents(ApplicationEvent event) {
        System.out.println("User-related event: " + event);
    }
}

// Conditional event processing
@Component
public class ConditionalEventProcessor {
    
    @EventListener(condition = "#event.user.age >= 18")
    public void handleAdultUserRegistration(UserRegisteredEvent event) {
        System.out.println("Adult user registered: " + event.getUser().getEmail());
    }
}

// Configuration for async events
@Configuration
@EnableAsync
public class AsyncConfig {
    
    @Bean
    public TaskExecutor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(2);
        executor.setMaxPoolSize(10);
        executor.setQueueCapacity(500);
        executor.setThreadNamePrefix("Event-");
        executor.initialize();
        return executor;
    }
}
```
*Notice: Spring Events provide loose coupling between components and support both synchronous and asynchronous processing.*

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Observer Pattern` · `Asynchronous Processing` · `Decoupling` · `Event-Driven Architecture`

</div>

1. **Use constructor injection**: Prefer constructor injection over field injection for better testability
2. **Component scanning**: Use @ComponentScan judiciously to avoid performance issues
3. **Profile-specific configuration**: Separate configurations for different environments
4. **Exception handling**: Use @ControllerAdvice for global exception handling
5. **Transaction boundaries**: Keep transactions as short as possible
6. **Validation**: Validate input at the controller layer with @Valid
7. **Security**: Always secure actuator endpoints in production
8. **Testing**: Use @SpringBootTest for integration tests, @WebMvcTest for controller tests

## Common Pitfalls

- **Circular dependencies**: Avoid circular bean dependencies through proper design
- **Transaction proxy issues**: @Transactional doesn't work on private methods or self-calls
- **Profile confusion**: Ensure correct profiles are active in each environment
- **Actuator security**: Don't expose sensitive endpoints without proper security
- **Lazy initialization issues**: Be careful with @Lazy and circular dependencies