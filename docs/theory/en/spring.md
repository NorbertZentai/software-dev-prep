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

<div class="concept-section definition">

📋 **Concept Definition**  
**Object managed by Spring IoC container** with lifecycle control. **Definition**: @Component, @Service, @Repository, @Controller stereotypes, or @Bean methods in @Configuration classes. **Scopes**: **singleton** (default, one instance per container), **prototype** (new instance per request), **request/session/application** (web-specific). **Lifecycle callbacks**: @PostConstruct (after DI), @PreDestroy (before removal), InitializingBean/DisposableBean interfaces. **Name**: default lowercase class name, customize with @Component("name"). **Lazy initialization**: @Lazy delays creation until first use. **Conditional beans**: @ConditionalOnProperty, @ConditionalOnClass. **BeanFactory vs ApplicationContext**: ApplicationContext is superset with event handling, internationalization.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Combines @Controller + @ResponseBody** for RESTful web services. **Purpose**: all handler methods return data (JSON/XML) directly to HTTP response body, not view names. **HTTP mappings**: @GetMapping, @PostMapping, @PutMapping, @DeleteMapping, @PatchMapping. **Path variables**: @PathVariable for URL parameters, @RequestParam for query params, @RequestBody for JSON request. **Response**: ResponseEntity<T> for full control (status, headers, body), or direct object (200 OK default). **Exception handling**: @ExceptionHandler methods, @ControllerAdvice for global handling. **Content negotiation**: produces/consumes in mapping annotations. **HATEOAS**: add hypermedia links with Spring HATEOAS.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Generic stereotype** marking class as Spring-managed bean. **Component scanning**: @ComponentScan (or @SpringBootApplication) discovers @Component classes in specified packages. **Specializations**: @Service (business logic layer), @Repository (persistence layer, exception translation), @Controller/@RestController (web layer). **Auto-detection**: Spring creates bean instances and manages lifecycle. **Naming**: default bean name is uncapitalized class name, override with @Component("customName"). **vs @Bean**: @Component on class (classpath scanning), @Bean on method in @Configuration (manual creation). **Best practice**: use specialized stereotypes for clarity (@Service, @Repository), @Component for general utilities.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Automatic dependency injection** by type (byType). **Injection types**: **Constructor** (preferred, immutable, required dependencies), **Setter** (optional dependencies), **Field** (not recommended, hard to test). **Resolution**: matches bean type, @Primary for preference, @Qualifier for disambiguation. **Required**: @Autowired(required=false) for optional dependencies, or use Optional<T>. **Collections**: inject List<T>, Map<String, T> of all matching beans. **vs @Inject**: @Autowired is Spring-specific, @Inject is JSR-330 standard. **Constructor injection**: modern Spring doesn't require @Autowired on single constructor. **Best practices**: prefer constructor injection (testability, immutability), avoid field injection.

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

### Dependency Injection Types {#dependency-injection-types}

<div class="concept-section definition">

📋 **Concept Definition**  
**Three injection methods in Spring**: **Constructor injection** (preferred, immutable, required dependencies), **Setter injection** (optional dependencies, mutable), **Field injection** (not recommended, reflection-based). **Interface Injection**: NOT supported by Spring (pattern where classes implement injection interface). **Constructor injection**: parameters in constructor, enables immutability with final fields. **Setter injection**: @Autowired on setter methods, allows null values. **Field injection**: @Autowired directly on fields, hardest to test. **Best practices**: constructor for required, setter for optional, avoid field injection entirely in production code.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Testability**: constructor injection easiest to test without Spring
- **Immutability**: constructor injection enables final fields
- **Explicit dependencies**: constructor shows all required dependencies
- **Design clarity**: injection type communicates dependency necessity

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// CONSTRUCTOR INJECTION (RECOMMENDED)
@Service
public class UserService {
    private final UserRepository userRepository; // Can be final
    private final EmailService emailService;
    
    // Constructor injection - Spring 4.3+ doesn't require @Autowired
    public UserService(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }
    
    // Benefits:
    // ✅ Immutable (final fields)
    // ✅ Easy to test (just call constructor in tests)
    // ✅ Fail-fast (missing dependencies detected at startup)
    // ✅ Explicit contract (all dependencies visible)
}

// SETTER INJECTION (for optional dependencies)
@Service
public class ReportService {
    private ReportRepository reportRepository; // Required
    private NotificationService notificationService; // Optional
    
    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }
    
    @Autowired(required = false) // Optional dependency
    public void setNotificationService(NotificationService notificationService) {
        this.notificationService = notificationService;
    }
    
    public void generateReport() {
        // ...
        if (notificationService != null) {
            notificationService.notify("Report ready");
        }
    }
}

// FIELD INJECTION (AVOID - for completeness only)
@Service
public class OrderService {
    @Autowired // NOT RECOMMENDED
    private PaymentService paymentService;
    
    // Problems:
    // ❌ Can't be final (not immutable)
    // ❌ Hard to test (needs Spring context)
    // ❌ Hidden dependencies (not in constructor signature)
    // ❌ Null pointer risk
}

// INTERFACE INJECTION - NOT SUPPORTED BY SPRING
// This is a pattern where classes implement an injection interface:
// public interface ServiceInjector {
//     void injectService(SomeService service);
// }
// Spring does NOT support this pattern!
```
*Notice: Constructor injection is preferred for its immutability, testability, and explicit dependency declaration.*

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Claiming Spring supports "Interface Injection" (it doesn't!)
- Not knowing when to use each injection type
- Can't explain why field injection is problematic
- Don't understand difference between required and optional dependencies

</div>
</details>

</div>

<div class="tags">
<span class="tag">spring</span>
<span class="tag">dependency-injection</span>
<span class="tag">medior</span>
<span class="tag">core</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Constructor Injection` · `Setter Injection` · `Field Injection` · `@Autowired` · `Testability` · `@Qualifier` · `@Primary` · `Circular Dependencies`

</div>

### Advanced Dependency Injection {#advanced-di}

<div class="concept-section definition">

📋 **Concept Definition**  
**Advanced DI concepts** for complex scenarios. **@Qualifier**: disambiguate when multiple beans of same type exist. **@Primary**: mark default bean when multiple candidates. **Circular dependencies**: A depends on B, B depends on A (constructor injection fails, setter injection works). **Injection points**: constructor, setter, field, method parameters. **Bean scopes**: singleton (default), prototype (new instance), request, session. **Lazy injection**: @Lazy delays bean creation until first use. **Optional dependencies**: @Autowired(required=false) or Optional<>. **Collection injection**: inject List/Map of all beans of type. **@Value**: inject properties from application.properties.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Flexibility**: handle complex dependency scenarios
- **Performance**: lazy loading, prototype scope
- **Configuration**: externalize values with @Value
- **Testing**: optional dependencies, qualifiers for test doubles

</div>

<div class="runnable-model">

**Runnable mental model - Advanced DI**
```java
// ========== @QUALIFIER - Multiple Beans of Same Type ==========

interface NotificationService {
    void send(String message);
}

@Service("emailNotification")
class EmailNotificationService implements NotificationService {
    public void send(String message) {
        System.out.println("Sending email: " + message);
    }
}

@Service("smsNotification")
class SMSNotificationService implements NotificationService {
    public void send(String message) {
        System.out.println("Sending SMS: " + message);
    }
}

@Service
class NotificationManager {
    private final NotificationService emailService;
    private final NotificationService smsService;
    
    // Use @Qualifier to specify which bean to inject
    public NotificationManager(
            @Qualifier("emailNotification") NotificationService emailService,
            @Qualifier("smsNotification") NotificationService smsService) {
        this.emailService = emailService;
        this.smsService = smsService;
    }
    
    public void sendAll(String message) {
        emailService.send(message);
        smsService.send(message);
    }
}


// ========== @PRIMARY - Default Bean ==========

interface PaymentGateway {
    void processPayment(double amount);
}

@Service
@Primary  // This will be injected by default
class StripePaymentGateway implements PaymentGateway {
    public void processPayment(double amount) {
        System.out.println("Processing via Stripe: $" + amount);
    }
}

@Service
class PayPalPaymentGateway implements PaymentGateway {
    public void processPayment(double amount) {
        System.out.println("Processing via PayPal: $" + amount);
    }
}

@Service
class PaymentService {
    private final PaymentGateway gateway;
    
    // Injects StripePaymentGateway (marked as @Primary)
    public PaymentService(PaymentGateway gateway) {
        this.gateway = gateway;
    }
    
    // To use PayPal explicitly:
    // public PaymentService(@Qualifier("payPalPaymentGateway") PaymentGateway gateway)
}


// ========== CIRCULAR DEPENDENCIES ==========

// PROBLEM: Constructor injection fails with circular dependencies
@Service
class ServiceA {
    private final ServiceB serviceB;
    
    public ServiceA(ServiceB serviceB) {  // ❌ Circular dependency!
        this.serviceB = serviceB;
    }
}

@Service
class ServiceB {
    private final ServiceA serviceA;
    
    public ServiceB(ServiceA serviceA) {  // ❌ Circular dependency!
        this.serviceA = serviceA;
    }
}

// SOLUTION 1: Setter Injection (not recommended)
@Service
class ServiceA {
    private ServiceB serviceB;
    
    @Autowired
    public void setServiceB(ServiceB serviceB) {
        this.serviceB = serviceB;
    }
}

// SOLUTION 2: @Lazy (better)
@Service
class ServiceA {
    private final ServiceB serviceB;
    
    public ServiceA(@Lazy ServiceB serviceB) {  // Lazy proxy breaks cycle
        this.serviceB = serviceB;
    }
}

// SOLUTION 3: Refactor (best) - eliminate circular dependency


// ========== OPTIONAL DEPENDENCIES ==========

@Service
class ReportService {
    private final ReportRepository repository;
    private final NotificationService notificationService;  // Optional
    
    public ReportService(
            ReportRepository repository,
            @Autowired(required = false) NotificationService notificationService) {
        this.repository = repository;
        this.notificationService = notificationService;  // Can be null
    }
    
    public void generateReport() {
        // Generate report...
        
        // Only notify if service available
        if (notificationService != null) {
            notificationService.send("Report ready");
        }
    }
}

// Alternative: Optional<>
@Service
class ReportServiceV2 {
    private final ReportRepository repository;
    private final Optional<NotificationService> notificationService;
    
    public ReportServiceV2(
            ReportRepository repository,
            Optional<NotificationService> notificationService) {
        this.repository = repository;
        this.notificationService = notificationService;
    }
    
    public void generateReport() {
        // Generate report...
        
        notificationService.ifPresent(service -> 
            service.send("Report ready")
        );
    }
}


// ========== COLLECTION INJECTION ==========

interface DataExporter {
    void export(Data data);
}

@Service
class CSVExporter implements DataExporter {
    public void export(Data data) {
        System.out.println("Exporting to CSV");
    }
}

@Service
class JSONExporter implements DataExporter {
    public void export(Data data) {
        System.out.println("Exporting to JSON");
    }
}

@Service
class XMLExporter implements DataExporter {
    public void export(Data data) {
        System.out.println("Exporting to XML");
    }
}

@Service
class ExportService {
    private final List<DataExporter> exporters;
    
    // Spring injects ALL beans of type DataExporter
    public ExportService(List<DataExporter> exporters) {
        this.exporters = exporters;
        System.out.println("Registered " + exporters.size() + " exporters");
    }
    
    public void exportAll(Data data) {
        exporters.forEach(exporter -> exporter.export(data));
    }
}

// Map injection (bean name as key)
@Service
class ExportServiceV2 {
    private final Map<String, DataExporter> exporterMap;
    
    public ExportServiceV2(Map<String, DataExporter> exporterMap) {
        this.exporterMap = exporterMap;
    }
    
    public void export(Data data, String format) {
        DataExporter exporter = exporterMap.get(format + "Exporter");
        if (exporter != null) {
            exporter.export(data);
        } else {
            throw new IllegalArgumentException("Unknown format: " + format);
        }
    }
}


// ========== @VALUE - Property Injection ==========

// application.properties:
// app.name=MyApplication
// app.version=1.0.0
// app.maxUsers=100
// app.features=feature1,feature2,feature3

@Service
class ApplicationConfig {
    @Value("${app.name}")
    private String appName;
    
    @Value("${app.version}")
    private String version;
    
    @Value("${app.maxUsers:50}")  // Default value 50
    private int maxUsers;
    
    @Value("${app.features}")
    private List<String> features;  // Automatically splits by comma
    
    @Value("#{systemProperties['user.home']}")
    private String userHome;  // SpEL expression
    
    public void printConfig() {
        System.out.println("App: " + appName + " v" + version);
        System.out.println("Max users: " + maxUsers);
        System.out.println("Features: " + features);
        System.out.println("User home: " + userHome);
    }
}


// ========== METHOD INJECTION ==========

@Service
class UserService {
    
    // Inject via method parameter
    @Autowired
    public void init(UserRepository repository, @Value("${app.name}") String appName) {
        System.out.println("Initializing " + appName);
        // Use repository...
    }
}


// ========== LAZY INJECTION ==========

@Service
@Lazy  // Bean created only when first accessed
class ExpensiveService {
    public ExpensiveService() {
        System.out.println("ExpensiveService initialized");
        // Expensive initialization...
    }
}

@Service
class ClientService {
    private final ExpensiveService expensiveService;
    
    // ExpensiveService created only when clientService.use() called
    public ClientService(@Lazy ExpensiveService expensiveService) {
        this.expensiveService = expensiveService;
        System.out.println("ClientService initialized");
    }
    
    public void use() {
        expensiveService.doSomething();  // NOW ExpensiveService is created
    }
}


// ========== BEAN SCOPES ==========

// Singleton (default) - one instance per container
@Service
@Scope("singleton")
class SingletonService {
    private int counter = 0;
    
    public int increment() {
        return ++counter;  // Shared state across all calls
    }
}

// Prototype - new instance every time
@Service
@Scope("prototype")
class PrototypeService {
    private int counter = 0;
    
    public int increment() {
        return ++counter;  // Each instance has own counter
    }
}

@Service
class ScopeDemo {
    private final ApplicationContext context;
    
    public ScopeDemo(ApplicationContext context) {
        this.context = context;
    }
    
    public void demo() {
        // Singleton - same instance
        SingletonService s1 = context.getBean(SingletonService.class);
        SingletonService s2 = context.getBean(SingletonService.class);
        System.out.println(s1 == s2);  // true
        
        // Prototype - different instances
        PrototypeService p1 = context.getBean(PrototypeService.class);
        PrototypeService p2 = context.getBean(PrototypeService.class);
        System.out.println(p1 == p2);  // false
    }
}


// ========== CONDITIONAL BEANS ==========

@Service
@ConditionalOnProperty(name = "feature.email.enabled", havingValue = "true")
class EmailService {
    // Only created if property is true
}

@Service
@ConditionalOnMissingBean(EmailService.class)
class MockEmailService {
    // Created only if EmailService not present
}

@Service
@Profile("production")
class ProductionDataSource {
    // Only active in production profile
}

@Service
@Profile("dev")
class DevDataSource {
    // Only active in dev profile
}


// ========== DEPENDENCY LIFECYCLE ==========

@Service
class LifecycleService {
    
    @Autowired
    private UserRepository repository;
    
    // 1. Constructor called
    public LifecycleService() {
        System.out.println("1. Constructor");
    }
    
    // 2. Dependencies injected
    
    // 3. @PostConstruct called
    @PostConstruct
    public void init() {
        System.out.println("3. PostConstruct - dependencies ready");
        // Initialization logic here
    }
    
    // 4. Bean ready to use
    
    // 5. @PreDestroy called before shutdown
    @PreDestroy
    public void cleanup() {
        System.out.println("5. PreDestroy - cleaning up");
        // Cleanup logic here
    }
}
```
*Notice: Spring provides powerful DI features for complex scenarios. Master @Qualifier, @Primary, and collection injection for real-world applications.*

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Not knowing how to resolve multiple beans of same type
- Circular dependency with constructor injection
- Not understanding bean scopes (singleton vs prototype)
- Forgetting @Value with default values
- Not knowing @PostConstruct/@PreDestroy lifecycle

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`@Qualifier` · `@Primary` · `@Value` · `@Lazy` · `@Scope` · `@PostConstruct` · `@PreDestroy` · `Circular Dependencies`

</div>

### @RestController {#restcontroller}

</div>

### @Service {#service}

<div class="concept-section definition">

📋 **Concept Definition**  
**Stereotype for business logic layer** (specialization of @Component). **Purpose**: marks service layer classes, semantically distinguishes from @Repository/@Controller. **Transaction boundary**: typically where @Transactional is applied for transactional consistency. **Business logic**: encapsulates domain logic, orchestrates repositories, implements use cases. **Best practices**: stateless, single responsibility, delegates to repositories for persistence. **Testing**: easy to unit test with mocked dependencies. **Architecture**: part of layered architecture (Controller → Service → Repository). **AOP**: common target for aspects (logging, security, caching).

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Design pattern where dependencies are provided** by external container, not created by object. **Inversion of Control**: framework controls object creation and lifecycle, not application code. **Types**: **Constructor injection** (preferred, immutable, explicit), **Setter injection** (optional dependencies), **Field injection** (reflection-based, not recommended). **Benefits**: loose coupling, testability (mock dependencies), single responsibility. **Spring implementation**: @Autowired, constructor injection, @Bean methods. **vs Service Locator**: DI pushes dependencies, Service Locator pulls. **Best practices**: prefer constructor injection, avoid circular dependencies, use interfaces.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Opinionated framework** simplifying Spring application development with auto-configuration and embedded servers. **Auto-configuration**: automatically configures beans based on classpath (e.g., H2 datasource if H2 present). **Starter dependencies**: spring-boot-starter-web, spring-boot-starter-data-jpa (curated dependency sets). **Embedded servers**: Tomcat (default), Jetty, Undertow embedded, no WAR deployment needed. **Actuator**: production-ready endpoints (/health, /metrics, /info). **Configuration**: application.properties/yml with type-safe @ConfigurationProperties. **Externalized config**: profiles (dev, prod), environment variables, command-line args. **@SpringBootApplication**: combines @Configuration, @EnableAutoConfiguration, @ComponentScan. **DevTools**: auto-restart on code changes.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Reactive, non-blocking web framework** for high-concurrency scenarios. **Reactive types**: **Mono<T>** (0-1 element), **Flux<T>** (0-N elements), lazy evaluation. **Programming models**: annotated controllers (@RestController with Mono/Flux returns) or functional endpoints (RouterFunction). **Backpressure**: consumer controls data flow rate from producer. **Event loop**: Netty's event loop (default), few threads handle many connections. **WebClient**: non-blocking HTTP client (replaces RestTemplate). **vs Spring MVC**: WebFlux for I/O-bound apps with high concurrency, MVC for CPU-bound or traditional apps. **Operators**: map, flatMap, filter, zip, merge. **Testing**: StepVerifier for testing reactive streams.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Test slicing framework** for efficient Spring context testing. **Annotations**: **@SpringBootTest** (full application context, integration tests), **@WebMvcTest** (web layer only, MockMvc), **@DataJpaTest** (JPA repositories, embedded DB), **@RestClientTest** (REST clients). **Auto-configuration**: test-specific auto-config, H2 in-memory DB by default. **Mocking**: @MockBean (replaces bean with mock), @SpyBean (partial mock). **TestRestTemplate**: integration testing for REST APIs. **@TestPropertySource**: override properties for tests. **Testcontainers**: Docker-based real databases/services. **Transaction rollback**: @Transactional on tests auto-rolls back. **Best practices**: use test slices for speed, @SpringBootTest sparingly.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Core container managing bean lifecycle and dependencies.** **Implementations**: **BeanFactory** (basic, lazy initialization), **ApplicationContext** (superset: event propagation, internationalization, resource loading). **Bean definition**: XML, annotations (@Component), Java config (@Configuration + @Bean). **Dependency resolution**: constructor injection, setter injection, field injection via reflection. **Lifecycle**: instantiate → populate properties → BeanNameAware/BeanFactoryAware → @PostConstruct → InitializingBean → custom init → bean ready → @PreDestroy → DisposableBean → custom destroy. **Scopes**: singleton (default), prototype, request, session. **BeanPostProcessor**: modify beans during initialization (AOP proxies). **Circular dependencies**: constructor injection fails, setter injection resolves.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Repository abstraction** eliminating boilerplate JPA code. **Interfaces**: extend JpaRepository<Entity, ID> or CrudRepository for CRUD operations. **Query derivation**: method names generate queries (findByLastName, findByAgeGreaterThan). **@Query**: custom JPQL or native SQL for complex queries. **Paging/Sorting**: Pageable, Sort parameters, Page<T> return type. **@Modifying**: for UPDATE/DELETE queries with @Query. **Specifications**: dynamic queries with Criteria API. **Auditing**: @CreatedDate, @LastModifiedDate, @CreatedBy with @EnableJpaAuditing. **Projections**: DTOs, interface-based or class-based. **Entity graphs**: @EntityGraph for fetch strategies. **Best practices**: repository per aggregate root (DDD), avoid N+1 queries.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Comprehensive security framework** for authentication and authorization. **Authentication**: verify identity via UserDetailsService, AuthenticationProvider. **Authorization**: role-based (@PreAuthorize("hasRole('ADMIN')"), hasAuthority), URL-based (http.authorizeRequests()). **Mechanisms**: form login, HTTP Basic, OAuth2, JWT, SAML. **Password encoding**: BCryptPasswordEncoder, Argon2. **Security filters**: FilterChainProxy, UsernamePasswordAuthenticationFilter. **CSRF protection**: enabled by default, token-based. **CORS**: configure CrossOrigin or global CORS. **Method security**: @EnableGlobalMethodSecurity, @Secured, @PreAuthorize. **Session management**: stateless for REST APIs, session fixation protection. **JWT**: stateless authentication with JwtDecoder.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Declarative transaction management** via AOP proxies. **Propagation**: REQUIRED (default, join existing or create), REQUIRES_NEW (suspend current, create new), NESTED, MANDATORY, SUPPORTS. **Isolation**: READ_UNCOMMITTED, READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE. **Rollback**: automatic on unchecked exceptions (RuntimeException), manual with rollbackFor/noRollbackFor. **Proxy-based**: only works on public methods called externally (self-invocation bypasses proxy). **Read-only**: readOnly=true optimizes for read operations. **Timeout**: transaction timeout in seconds. **Transaction manager**: PlatformTransactionManager (JDBC: DataSourceTransactionManager, JPA: JpaTransactionManager). **Best practices**: service layer, not repository, keep transactions short.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Bean Validation (JSR-303/380)** for declarative validation. **Annotations**: @NotNull, @NotEmpty, @NotBlank (strings), @Size, @Min/@Max, @Email, @Pattern (regex), @Past/@Future (dates). **Validation trigger**: @Valid or @Validated on method parameters (controllers, service methods). **BindingResult**: captures validation errors in controllers. **Groups**: validate subset with validation groups. **Custom validators**: implement ConstraintValidator, create @Constraint annotation. **Hibernate Validator**: reference implementation with additional constraints. **Error messages**: message templates, i18n support. **Cascading**: @Valid on nested objects validates recursively. **Best practices**: validate at boundaries (controllers), immutable validated objects.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Production-ready endpoints** for monitoring and management. **Endpoints**: /actuator/health (liveness/readiness), /metrics (Micrometer metrics), /info (app info), /env (properties), /loggers (change log levels), /threaddump, /heapdump. **Exposure**: management.endpoints.web.exposure.include=* (all), or specific endpoints. **Health indicators**: database, disk space, custom indicators (HealthIndicator). **Metrics**: JVM memory, CPU, HTTP requests, custom metrics via MeterRegistry. **Prometheus**: /actuator/prometheus for scraping. **Security**: secure endpoints with Spring Security. **Custom endpoints**: @Endpoint, @ReadOperation, @WriteOperation. **Best practices**: expose minimally, secure properly, monitor critical metrics.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Cross-cutting concerns** implementation via dynamic proxies or bytecode weaving. **Aspect**: @Aspect class encapsulating cross-cutting behavior. **Advice types**: @Before (before method), @After (after method), @AfterReturning (after successful return), @AfterThrowing (on exception), @Around (full control). **Pointcut**: expression selecting join points (@Pointcut("execution(* com.example.service.*.*(..))")). **Join point**: execution point (method call). **Proxy types**: JDK dynamic proxy (interface-based), CGLIB (class-based). **Use cases**: logging, security, transaction management, caching. **AspectJ**: full AOP framework, Spring AOP uses subset. **Limitations**: only method-level, only beans.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Provider-agnostic cache abstraction** for transparent caching. **Annotations**: **@Cacheable** (cache method result), **@CachePut** (update cache), **@CacheEvict** (remove from cache, allEntries for full clear). **@Caching**: combine multiple cache operations. **Providers**: ConcurrentMapCacheManager (simple), EhCache, Caffeine (high-performance local), Redis (distributed). **Key generation**: SpEL expressions (#id, #user.name), custom KeyGenerator. **Conditional caching**: condition, unless attributes. **@EnableCaching**: enable cache support. **Cache managers**: multiple CacheManager beans. **TTL**: provider-specific (Redis: @Cacheable with TTL config). **Best practices**: cache expensive operations, set appropriate TTL, monitor hit rates.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Publish-subscribe pattern** for decoupled component communication. **Publishing**: ApplicationEventPublisher.publishEvent(event), or @EventListener method returning event. **Listening**: @EventListener methods consume events, parameter type determines event. **Event types**: extend ApplicationEvent (legacy) or any POJO (Spring 4.2+). **Async processing**: @Async on listener, requires @EnableAsync. **Order**: @Order annotation for listener execution order. **Conditional**: @EventListener(condition="#event.status == 'SUCCESS'"). **Transaction-bound**: @TransactionalEventListener (phases: AFTER_COMMIT, AFTER_ROLLBACK, AFTER_COMPLETION, BEFORE_COMMIT). **Use cases**: audit logging, notifications, workflow triggers. **Best practices**: immutable events, avoid heavy processing in sync listeners.

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