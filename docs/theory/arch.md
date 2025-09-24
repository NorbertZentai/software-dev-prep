# Szoftver Architektúra

## Bevezetés

A szoftver architektúra egy rendszer alapvető szervezési elveit és szerkezetét határozza meg. Jó architektúra nélkül még a legjobb kód is káosszá válhat idővel.

## SOLID Alapelvek

### 1. Single Responsibility Principle (SRP)
Egy osztálynak csak egy felelőssége legyen.

```java
// Rossz példa - több felelősség
class User {
    private String name;
    private String email;
    
    // User management
    public void save() {
        // Database save logic
    }
    
    // Email functionality  
    public void sendEmail(String message) {
        // Email sending logic
    }
    
    // Validation
    public boolean isValid() {
        // Validation logic
    }
}

// Jó példa - szétválasztott felelősségek
class User {
    private String name;
    private String email;
    
    // getters/setters
}

class UserRepository {
    public void save(User user) {
        // Database save logic
    }
}

class EmailService {
    public void sendEmail(User user, String message) {
        // Email sending logic
    }
}

class UserValidator {
    public boolean isValid(User user) {
        // Validation logic
    }
}
```

### 2. Open/Closed Principle (OCP)
Az osztályok legyenek nyitottak a bővítésre, de zártak a módosításra.

```java
// Jó példa - Strategy pattern használata
interface DiscountStrategy {
    double calculateDiscount(double amount);
}

class RegularCustomerDiscount implements DiscountStrategy {
    public double calculateDiscount(double amount) {
        return amount * 0.05; // 5% kedvezmény
    }
}

class PremiumCustomerDiscount implements DiscountStrategy {
    public double calculateDiscount(double amount) {
        return amount * 0.1; // 10% kedvezmény
    }
}

class PriceCalculator {
    private DiscountStrategy discountStrategy;
    
    public PriceCalculator(DiscountStrategy strategy) {
        this.discountStrategy = strategy;
    }
    
    public double calculatePrice(double basePrice) {
        double discount = discountStrategy.calculateDiscount(basePrice);
        return basePrice - discount;
    }
}
```

### 3. Liskov Substitution Principle (LSP)
Az alosztályok helyettesíthetők legyenek a szülő osztályukkal.

```java
abstract class Bird {
    abstract void eat();
}

class Sparrow extends Bird {
    void eat() { /* sparrow eating */ }
    void fly() { /* sparrow flying */ }
}

class Penguin extends Bird {
    void eat() { /* penguin eating */ }
    // Pingvin nem tud repülni - helyes LSP
}

// Jobb megoldás
interface Flyable {
    void fly();
}

class Sparrow extends Bird implements Flyable {
    void eat() { /* eating */ }
    void fly() { /* flying */ }
}

class Penguin extends Bird {
    void eat() { /* eating */ }
    // Nem implementálja a Flyable-t
}
```

### 4. Interface Segregation Principle (ISP)
Ne függjünk olyan interfészektől, amelyeket nem használunk.

```java
// Rossz példa - "fat interface"
interface Worker {
    void work();
    void eat();
    void sleep();
}

// Jó példa - szeparált interfészek
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
    public void work() { /* work */ }
    public void eat() { /* eat */ }
    public void sleep() { /* sleep */ }
}

class Robot implements Workable {
    public void work() { /* work */ }
    // Robot nem eszik és nem alszik
}
```

### 5. Dependency Inversion Principle (DIP)
Függjünk az absztrakcióktól, ne a konkrét implementációktól.

```java
// Rossz példa - konkrét függőség
class EmailNotification {
    public void send(String message) {
        // Email küldés
    }
}

class OrderService {
    private EmailNotification notification; // Konkrét függőség
    
    public void processOrder(Order order) {
        // order processing
        notification.send("Order processed");
    }
}

// Jó példa - absztrakciótól függés
interface NotificationService {
    void send(String message);
}

class EmailNotification implements NotificationService {
    public void send(String message) {
        // Email küldés
    }
}

class SMSNotification implements NotificationService {
    public void send(String message) {
        // SMS küldés
    }
}

class OrderService {
    private NotificationService notification; // Absztrakció
    
    public OrderService(NotificationService notification) {
        this.notification = notification;
    }
    
    public void processOrder(Order order) {
        // order processing
        notification.send("Order processed");
    }
}
```

## Design Patterns

### Creational Patterns

#### Singleton
```java
public class DatabaseConnection {
    private static DatabaseConnection instance;
    private Connection connection;
    
    private DatabaseConnection() {
        // Private constructor
        this.connection = DriverManager.getConnection("...");
    }
    
    public static synchronized DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }
    
    public Connection getConnection() {
        return connection;
    }
}

// Thread-safe variant
public class ThreadSafeSingleton {
    private static volatile ThreadSafeSingleton instance;
    
    private ThreadSafeSingleton() {}
    
    public static ThreadSafeSingleton getInstance() {
        if (instance == null) {
            synchronized (ThreadSafeSingleton.class) {
                if (instance == null) {
                    instance = new ThreadSafeSingleton();
                }
            }
        }
        return instance;
    }
}
```

#### Factory Pattern
```java
interface Animal {
    void makeSound();
}

class Dog implements Animal {
    public void makeSound() {
        System.out.println("Woof!");
    }
}

class Cat implements Animal {
    public void makeSound() {
        System.out.println("Meow!");
    }
}

class AnimalFactory {
    public static Animal createAnimal(String type) {
        switch (type.toLowerCase()) {
            case "dog":
                return new Dog();
            case "cat":
                return new Cat();
            default:
                throw new IllegalArgumentException("Unknown animal type: " + type);
        }
    }
}

// Használat
Animal dog = AnimalFactory.createAnimal("dog");
dog.makeSound(); // "Woof!"
```

#### Builder Pattern
```java
public class User {
    private String name;
    private String email;
    private int age;
    private String address;
    
    private User(Builder builder) {
        this.name = builder.name;
        this.email = builder.email;
        this.age = builder.age;
        this.address = builder.address;
    }
    
    public static class Builder {
        private String name;
        private String email;
        private int age;
        private String address;
        
        public Builder(String name, String email) {
            this.name = name;
            this.email = email;
        }
        
        public Builder age(int age) {
            this.age = age;
            return this;
        }
        
        public Builder address(String address) {
            this.address = address;
            return this;
        }
        
        public User build() {
            return new User(this);
        }
    }
}

// Használat
User user = new User.Builder("John Doe", "john@example.com")
    .age(25)
    .address("123 Main St")
    .build();
```

### Structural Patterns

#### Adapter Pattern
```java
// Külső könyvtár, amit nem módosíthatunk
class LegacyPrinter {
    public void printOldFormat(String text) {
        System.out.println("Legacy: " + text);
    }
}

// Új interfész, amit használni szeretnénk
interface ModernPrinter {
    void print(String text);
}

// Adapter
class PrinterAdapter implements ModernPrinter {
    private LegacyPrinter legacyPrinter;
    
    public PrinterAdapter(LegacyPrinter legacyPrinter) {
        this.legacyPrinter = legacyPrinter;
    }
    
    @Override
    public void print(String text) {
        legacyPrinter.printOldFormat(text);
    }
}
```

#### Decorator Pattern
```java
interface Coffee {
    String getDescription();
    double getCost();
}

class SimpleCoffee implements Coffee {
    public String getDescription() {
        return "Simple coffee";
    }
    
    public double getCost() {
        return 2.0;
    }
}

abstract class CoffeeDecorator implements Coffee {
    protected Coffee coffee;
    
    public CoffeeDecorator(Coffee coffee) {
        this.coffee = coffee;
    }
}

class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee coffee) {
        super(coffee);
    }
    
    public String getDescription() {
        return coffee.getDescription() + ", milk";
    }
    
    public double getCost() {
        return coffee.getCost() + 0.5;
    }
}

class SugarDecorator extends CoffeeDecorator {
    public SugarDecorator(Coffee coffee) {
        super(coffee);
    }
    
    public String getDescription() {
        return coffee.getDescription() + ", sugar";
    }
    
    public double getCost() {
        return coffee.getCost() + 0.2;
    }
}

// Használat
Coffee coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
System.out.println(coffee.getDescription() + " costs " + coffee.getCost());
```

### Behavioral Patterns

#### Observer Pattern
```java
import java.util.*;

interface Observer {
    void update(String message);
}

interface Subject {
    void attach(Observer observer);
    void detach(Observer observer);
    void notifyObservers(String message);
}

class NewsAgency implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private String news;
    
    public void attach(Observer observer) {
        observers.add(observer);
    }
    
    public void detach(Observer observer) {
        observers.remove(observer);
    }
    
    public void notifyObservers(String message) {
        for (Observer observer : observers) {
            observer.update(message);
        }
    }
    
    public void setNews(String news) {
        this.news = news;
        notifyObservers(news);
    }
}

class NewsChannel implements Observer {
    private String name;
    
    public NewsChannel(String name) {
        this.name = name;
    }
    
    @Override
    public void update(String news) {
        System.out.println(name + " received news: " + news);
    }
}
```

#### Strategy Pattern
```java
interface SortingStrategy {
    void sort(int[] array);
}

class BubbleSort implements SortingStrategy {
    public void sort(int[] array) {
        // Bubble sort implementation
        System.out.println("Sorting using bubble sort");
    }
}

class QuickSort implements SortingStrategy {
    public void sort(int[] array) {
        // Quick sort implementation
        System.out.println("Sorting using quick sort");
    }
}

class SortingContext {
    private SortingStrategy strategy;
    
    public SortingContext(SortingStrategy strategy) {
        this.strategy = strategy;
    }
    
    public void setStrategy(SortingStrategy strategy) {
        this.strategy = strategy;
    }
    
    public void performSort(int[] array) {
        strategy.sort(array);
    }
}
```

## Architektúrális minták

### MVC (Model-View-Controller)
```java
// Model
class User {
    private String name;
    private String email;
    
    // getters/setters
}

// View
class UserView {
    public void displayUser(String userName, String userEmail) {
        System.out.println("User: " + userName);
        System.out.println("Email: " + userEmail);
    }
}

// Controller
class UserController {
    private User model;
    private UserView view;
    
    public UserController(User model, UserView view) {
        this.model = model;
        this.view = view;
    }
    
    public void updateView() {
        view.displayUser(model.getName(), model.getEmail());
    }
}
```

### Repository Pattern
```java
interface UserRepository {
    void save(User user);
    User findById(Long id);
    List<User> findAll();
    void delete(Long id);
}

class DatabaseUserRepository implements UserRepository {
    public void save(User user) {
        // Database save logic
    }
    
    public User findById(Long id) {
        // Database query logic
        return new User();
    }
    
    public List<User> findAll() {
        // Database query logic
        return new ArrayList<>();
    }
    
    public void delete(Long id) {
        // Database delete logic
    }
}

class UserService {
    private UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public void createUser(User user) {
        // Business logic
        if (user.getEmail() != null && !user.getEmail().isEmpty()) {
            userRepository.save(user);
        }
    }
}
```

## Mikroszolgáltatás architektúra

### Alapelvek
1. **Single Responsibility**: Egy szolgáltatás = egy üzleti képesség
2. **Decentralized**: Független adatbázisok
3. **Failure Resilience**: Hibatűrő rendszer
4. **Technology Diversity**: Különböző technológiák használata

### Spring Boot mikroszolgáltatás példa
```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        try {
            User user = userService.findById(id);
            return ResponseEntity.ok(user);
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        User createdUser = userService.create(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }
}

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private NotificationService notificationService;
    
    public User create(User user) {
        User savedUser = userRepository.save(user);
        notificationService.sendWelcomeEmail(savedUser.getEmail());
        return savedUser;
    }
    
    public User findById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException("User not found: " + id));
    }
}
```

### Service Communication
```java
// Synchronous communication with RestTemplate
@Service
public class OrderService {
    
    @Autowired
    private RestTemplate restTemplate;
    
    public Order createOrder(Order order) {
        // Get user information from User Service
        User user = restTemplate.getForObject(
            "http://user-service/api/users/" + order.getUserId(), 
            User.class
        );
        
        if (user == null) {
            throw new UserNotFoundException("User not found");
        }
        
        // Create order
        return orderRepository.save(order);
    }
}

// Asynchronous communication with RabbitMQ
@Component
public class OrderEventPublisher {
    
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    public void publishOrderCreated(Order order) {
        OrderCreatedEvent event = new OrderCreatedEvent(order.getId(), order.getUserId());
        rabbitTemplate.convertAndSend("order.exchange", "order.created", event);
    }
}

@RabbitListener(queues = "inventory.queue")
public void handleOrderCreated(OrderCreatedEvent event) {
    // Update inventory
    inventoryService.reserveItems(event.getOrderId());
}
```

## REST API Design

### HTTP Methods és Status Codes
```java
@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    // GET /api/products - 200 OK
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.findAll();
        return ResponseEntity.ok(products);
    }
    
    // GET /api/products/{id} - 200 OK, 404 Not Found
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        return productService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    // POST /api/products - 201 Created, 400 Bad Request
    @PostMapping
    public ResponseEntity<Product> createProduct(@Valid @RequestBody Product product) {
        Product created = productService.create(product);
        URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(created.getId())
            .toUri();
        return ResponseEntity.created(location).body(created);
    }
    
    // PUT /api/products/{id} - 200 OK, 404 Not Found
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @Valid @RequestBody Product product) {
        return productService.update(id, product)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    // DELETE /api/products/{id} - 204 No Content, 404 Not Found
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (productService.delete(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
```

### API Versioning
```java
// URL versioning
@RequestMapping("/api/v1/users")
@RequestMapping("/api/v2/users")

// Header versioning
@RequestMapping(value = "/api/users", headers = "API-Version=1")

// Media type versioning
@RequestMapping(value = "/api/users", produces = "application/vnd.company.app-v1+json")
```

## Caching Strategies

### Spring Cache
```java
@Service
public class ProductService {
    
    @Cacheable(value = "products", key = "#id")
    public Product findById(Long id) {
        // Expensive database operation
        return productRepository.findById(id).orElse(null);
    }
    
    @CacheEvict(value = "products", key = "#product.id")
    public Product update(Product product) {
        return productRepository.save(product);
    }
    
    @CacheEvict(value = "products", allEntries = true)
    public void clearCache() {
        // Clear all cache entries
    }
}

// Redis configuration
@Configuration
@EnableCaching
public class CacheConfig {
    
    @Bean
    public CacheManager cacheManager(RedisConnectionFactory connectionFactory) {
        RedisCacheManager.Builder builder = RedisCacheManager
            .RedisCacheManagerBuilder
            .fromConnectionFactory(connectionFactory)
            .cacheDefaults(cacheConfiguration(Duration.ofMinutes(10)));
        return builder.build();
    }
}
```

## Security Architecture

### Authentication and Authorization
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/users").hasRole("ADMIN")
                .requestMatchers("/api/users/**").hasAnyRole("USER", "ADMIN")
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            );
        return http.build();
    }
}

@RestController
@PreAuthorize("hasRole('USER')")
public class SecureController {
    
    @GetMapping("/profile")
    @PreAuthorize("hasRole('USER') and #username == authentication.name")
    public UserProfile getProfile(@RequestParam String username) {
        return userService.getProfile(username);
    }
}
```

## Best Practices

### 1. Clean Architecture
- **Dependency Rule**: Belső rétegek ne függjenek külső rétegektől
- **Separation of Concerns**: Különítsük el a business logikát az infrastruktúrától
- **Testability**: Legyen könnyen tesztelhető

### 2. Database Design
```java
// JPA best practices
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> orders = new ArrayList<>();
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
```

### 3. Error Handling
```java
@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFound(UserNotFoundException ex) {
        ErrorResponse error = ErrorResponse.builder()
            .message(ex.getMessage())
            .code("USER_NOT_FOUND")
            .timestamp(LocalDateTime.now())
            .build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        
        ErrorResponse errorResponse = ErrorResponse.builder()
            .message("Validation failed")
            .code("VALIDATION_ERROR")
            .details(errors)
            .timestamp(LocalDateTime.now())
            .build();
            
        return ResponseEntity.badRequest().body(errorResponse);
    }
}
```

## Következő lépések

1. Gyakorold a SOLID alapelvek alkalmazását
2. Implementálj design pattern-eket valós projektekben
3. Tervezz és építs fel egy mikroszolgáltatás architektúrát
4. Tanulj cloud-native megoldásokat (Docker, Kubernetes)
5. Ismerkedj meg a Domain Driven Design (DDD) elvekkel