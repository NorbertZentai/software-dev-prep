# Szoftver Architektúra

## Rövid összefoglaló

A szoftver architektúra a rendszerek szerkezeti és szervezési elveit határozza meg, amelyek hosszú távon biztosítják a fenntarthatóságot, skálázhatóságot és megbízhatóságot. Modern architektúrák mikroszolgáltatás alapúak, használnak rétegezett felépítést (layered architecture), port-adapter mintákat és bounded context koncepciókat. Az idempotencia és aszinkron üzenetkezelés alapvető elvek, amelyeket cache-eléssel és resiliency mechanizmusokkal (retry, circuit breaker) egészítünk ki. Megfigyelhetőség (observability) kulcsfontosságú a hibakereséshez. Fő buktatók: overengineering, chatty services és monolitikus adatbázis-használat.

## Fogalmak

### Monolit
Egyetlen deployolható egység, amely minden üzleti logikát, adatkezelést és interfészt tartalmaz. Egyszerűbb fejlesztés, de nehezebb skálázni és karbantartani.

**Példa:**
```java
// Monolitikus alkalmazás struktúra
@SpringBootApplication
public class MonolithicECommerceApplication {
    // Minden komponens egy alkalmazásban
    
    @RestController
    class OrderController {
        @GetMapping("/orders")
        public List<Order> getOrders() { /* ... */ }
    }
    
    @RestController
    class ProductController {
        @GetMapping("/products")
        public List<Product> getProducts() { /* ... */ }
    }
    
    @RestController
    class UserController {
        @GetMapping("/users")
        public List<User> getUsers() { /* ... */ }
    }
    
    // Közös adatbázis minden funkcióhoz
    @Repository
    class DatabaseRepository {
        // orders, products, users táblák ugyanabban a DB-ben
    }
}
```

Magyarázat: Minden funkció egy alkalmazásban van, közös adatbázissal és deployment egységgel.

### Mikroszolgáltatások (Microservices) {#mikroszolgaltatasok-microservices}
Kisebb, független komponensek, amelyek egy-egy üzleti képességet valósítanak meg. Saját adatbázis, független deploy, technológiai diverzitás.

**Példa:**
```java
// User Service - független alkalmazás
@SpringBootApplication
public class UserServiceApplication {
    @RestController
    class UserController {
        @GetMapping("/users/{id}")
        public User getUser(@PathVariable Long id) {
            return userService.findById(id);
        }
    }
}

// Order Service - külön alkalmazás
@SpringBootApplication
public class OrderServiceApplication {
    @RestController
    class OrderController {
        @PostMapping("/orders")
        public Order createOrder(@RequestBody CreateOrderRequest request) {
            // HTTP hívás a User Service-hez
            User user = restTemplate.getForObject(
                "http://user-service/users/" + request.getUserId(), 
                User.class
            );
            return orderService.createOrder(request, user);
        }
    }
}

// Product Service - szintén külön
@SpringBootApplication
public class ProductServiceApplication {
    // Saját adatbázis, független fejlesztés és deploy
}
```

Magyarázat: Minden szolgáltatás külön fut, saját adatbázissal és API-val kommunikálnak egymással.

### Rétegek (Layered Architecture) {#retegek-layered-architecture}
Logikai rétegek: prezentáció, üzleti logika, adatkezelés. Segíti a separation of concerns elvét.

**Példa:**
```java
// Presentation Layer
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        UserDTO user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }
    
    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody CreateUserRequest request) {
        UserDTO createdUser = userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }
}

// Business Logic Layer
@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final EmailService emailService;
    
    public UserDTO createUser(CreateUserRequest request) {
        // Business logic validation
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new UserAlreadyExistsException();
        }
        
        User user = new User(request.getName(), request.getEmail());
        User savedUser = userRepository.save(user);
        
        // Business logic - send welcome email
        emailService.sendWelcomeEmail(savedUser.getEmail());
        
        return UserMapper.toDTO(savedUser);
    }
}

// Data Access Layer
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
}
```

Magyarázat: Minden réteg csak az alatta lévő rétegre támaszkodik, tiszta elválasztás a felelősségek között.

### Port–Adapter (Hexagonal) {#port-adapter-hexagonal}
Az alkalmazás magját (core) adapterek kapcsolják össze külső rendszerekkel (pl. adatbázis, API, UI).

**Példa:**
```java
// Domain Core - Port (Interface)
public interface UserRepository {
    User save(User user);
    Optional<User> findById(Long id);
}

public interface NotificationService {
    void sendNotification(String message, String recipient);
}

// Domain Service (Core Logic)
@Service
public class UserService {
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    
    // Csak port interfészektől függ
    public UserService(UserRepository userRepository, NotificationService notificationService) {
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }
    
    public User createUser(String name, String email) {
        User user = new User(name, email);
        User savedUser = userRepository.save(user);
        notificationService.sendNotification("Welcome!", email);
        return savedUser;
    }
}

// Adapter - Database Implementation
@Repository
public class JpaUserRepository implements UserRepository {
    private final JpaUserRepositoryInterface jpaRepo;
    
    @Override
    public User save(User user) {
        UserEntity entity = UserMapper.toEntity(user);
        UserEntity savedEntity = jpaRepo.save(entity);
        return UserMapper.toDomain(savedEntity);
    }
}

// Adapter - Email Implementation  
@Component
public class EmailNotificationService implements NotificationService {
    @Override
    public void sendNotification(String message, String recipient) {
        // SMTP email sending logic
        emailClient.sendEmail(recipient, message);
    }
}
```

Magyarázat: A core üzleti logika független a külső technológiáktól, adaptereken keresztül kapcsolódik hozzájuk.

### Bounded Context {#bounded-context}
Domain Driven Design (DDD) fogalom: egy adott üzleti terület logikailag elkülönített része.

**Példa:**
```java
// User Management Context
package com.ecommerce.user;
public class User {
    private Long id;
    private String name;
    private String email;
    private UserStatus status;
}

// Order Management Context - másik User fogalom
package com.ecommerce.order;
public class User {
    private Long userId;
    private String shippingAddress;
    private PaymentMethod preferredPayment;
    // Itt csak a rendeléshez szükséges adatok
}

// Inventory Context - megint más User reprezentáció
package com.ecommerce.inventory;
public class User {
    private Long userId;
    private UserType type; // retail, wholesale
    private DiscountLevel discountLevel;
}
```

Magyarázat: Minden bounded context-ben a User fogalma más jelentéssel bír, a kontextusnak megfelelően.

### Idempotencia {#idempotencia}
Ugyanaz a művelet többszöri végrehajtása nem változtatja meg az eredményt (pl. HTTP PUT).

**Példa:**
```java
@RestController
public class PaymentController {
    
    // Idempotent operation - ugyanazzal az idempotency key-vel
    @PostMapping("/payments")
    public ResponseEntity<Payment> processPayment(
            @RequestBody PaymentRequest request,
            @RequestHeader("Idempotency-Key") String idempotencyKey) {
        
        // Ellenőrizzük, hogy már feldolgoztuk-e ezt a key-t
        Optional<Payment> existingPayment = paymentService.findByIdempotencyKey(idempotencyKey);
        if (existingPayment.isPresent()) {
            // Ugyanazt az eredményt adjuk vissza, nem duplikálunk
            return ResponseEntity.ok(existingPayment.get());
        }
        
        // Első alkalommal dolgozzuk fel
        Payment payment = paymentService.processPayment(request, idempotencyKey);
        return ResponseEntity.status(HttpStatus.CREATED).body(payment);
    }
    
    // PUT operations are naturally idempotent
    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        // Többszöri hívás ugyanazt az eredményt adja
        User updatedUser = userService.updateUser(id, user);
        return ResponseEntity.ok(updatedUser);
    }
}
```

Magyarázat: Idempotent műveletek biztonságosan újra végrehajthatók hálózati hibák vagy timeout esetén.

### Aszinkron üzenetkezelés {#aszinkron-uzenetkezeles}
Komponensek közötti kommunikáció események, üzenetsorok (RabbitMQ, Kafka) segítségével.

**Példa:**
```java
// Event Publisher
@Service
public class OrderService {
    
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    public Order createOrder(CreateOrderRequest request) {
        Order order = new Order(request);
        Order savedOrder = orderRepository.save(order);
        
        // Aszinkron esemény kibocsátás
        OrderCreatedEvent event = new OrderCreatedEvent(
            savedOrder.getId(), 
            savedOrder.getUserId(), 
            savedOrder.getItems()
        );
        
        rabbitTemplate.convertAndSend("order.exchange", "order.created", event);
        
        return savedOrder;
    }
}

// Event Consumer - Inventory Service
@Component
public class InventoryEventHandler {
    
    @RabbitListener(queues = "inventory.order.queue")
    public void handleOrderCreated(OrderCreatedEvent event) {
        // Készlet frissítése aszinkron módon
        for (OrderItem item : event.getItems()) {
            inventoryService.reserveStock(item.getProductId(), item.getQuantity());
        }
        
        // Ha sikeres, újabb eseményt küldünk
        stockReservedPublisher.publishStockReserved(event.getOrderId());
    }
}

// Event Consumer - Notification Service  
@Component
public class NotificationEventHandler {
    
    @RabbitListener(queues = "notification.order.queue")
    public void handleOrderCreated(OrderCreatedEvent event) {
        // Email küldése aszinkron módon
        User user = userService.findById(event.getUserId());
        emailService.sendOrderConfirmation(user.getEmail(), event.getOrderId());
    }
}
```

Magyarázat: Az Order Service nem blokkolódik a készlet és értesítés műveletek miatt, azok aszinkron futnak.

### Cache {#cache}
Gyakran használt adatok gyors elérése memóriából (pl. Redis, Memcached).

**Példa:**
```java
@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private RedisTemplate<String, Product> redisTemplate;
    
    public Product getProductById(Long id) {
        // 1. Próbáljuk cache-ből
        String cacheKey = "product:" + id;
        Product cachedProduct = redisTemplate.opsForValue().get(cacheKey);
        
        if (cachedProduct != null) {
            return cachedProduct; // Cache hit
        }
        
        // 2. Ha nincs cache-ben, adatbázisból
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new ProductNotFoundException(id));
        
        // 3. Cache-be mentjük (TTL: 1 óra)
        redisTemplate.opsForValue().set(cacheKey, product, Duration.ofHours(1));
        
        return product;
    }
    
    // Spring Cache Annotation approach
    @Cacheable(value = "products", key = "#id")
    public Product getProductByIdCached(Long id) {
        return productRepository.findById(id)
            .orElseThrow(() -> new ProductNotFoundException(id));
    }
    
    @CacheEvict(value = "products", key = "#product.id")
    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }
}
```

Magyarázat: Cache jelentősen csökkenti az adatbázis terhelést és javítja a response time-ot.

### Resiliency (Hibatűrés) {#resiliency-hibatures}
Hibatűrés: retry, circuit breaker, fallback mechanizmusok.

**Példa:**
```java
// Retry mechanizmus
@Service
public class ExternalApiService {
    
    @Retryable(value = {Exception.class}, maxAttempts = 3, backoff = @Backoff(delay = 1000))
    public ApiResponse callExternalService(String request) {
        // Hálózati hívás, ami sikertelen lehet
        return restTemplate.postForObject("/external-api", request, ApiResponse.class);
    }
    
    @Recover
    public ApiResponse recover(Exception ex, String request) {
        // Ha minden retry sikertelen, fallback válasz
        return new ApiResponse("Service temporarily unavailable");
    }
}

// Circuit Breaker pattern implementáció
@Component
public class CircuitBreakerService {
    
    private final CircuitBreaker circuitBreaker;
    
    public CircuitBreakerService() {
        this.circuitBreaker = CircuitBreaker.ofDefaults("externalService");
        circuitBreaker.getEventPublisher()
            .onStateTransition(event -> 
                log.info("Circuit breaker state transition: {}", event.getStateTransition()));
    }
    
    public String callServiceWithCircuitBreaker() {
        return circuitBreaker.executeSupplier(() -> {
            // Külső szolgáltatás hívása
            return externalApiClient.getData();
        });
    }
}

// Bulkhead pattern - resource isolation
@Configuration
public class ExecutorConfig {
    
    @Bean("userServiceExecutor")
    public Executor userServiceExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(10);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("user-service-");
        return executor;
    }
    
    @Bean("orderServiceExecutor") 
    public Executor orderServiceExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);
        executor.setMaxPoolSize(20);
        executor.setQueueCapacity(200);
        executor.setThreadNamePrefix("order-service-");
        return executor;
    }
}
```

Magyarázat: Resiliency minták biztosítják, hogy a rendszer működjön külső szolgáltatások hibái esetén is.

### Observability (Megfigyelhetőség) {#observability-megfigyelhetoseg}
Rendszer megfigyelhetősége: logging, metrics, tracing.

**Példa:**
```java
// Structured Logging
@RestController
public class UserController {
    
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        // Structured log with context
        logger.info("Getting user - userId: {}, timestamp: {}", 
            id, Instant.now());
        
        try {
            User user = userService.findById(id);
            logger.info("User found successfully - userId: {}, userName: {}", 
                id, user.getName());
            return ResponseEntity.ok(user);
        } catch (UserNotFoundException e) {
            logger.warn("User not found - userId: {}, error: {}", 
                id, e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
}

// Custom Metrics with Micrometer
@Service
public class OrderService {
    
    private final Counter orderCreatedCounter;
    private final Timer orderProcessingTimer;
    
    public OrderService(MeterRegistry meterRegistry) {
        this.orderCreatedCounter = Counter.builder("orders.created")
            .description("Number of orders created")
            .register(meterRegistry);
            
        this.orderProcessingTimer = Timer.builder("orders.processing.time")
            .description("Order processing time")
            .register(meterRegistry);
    }
    
    public Order createOrder(CreateOrderRequest request) {
        return orderProcessingTimer.recordCallable(() -> {
            Order order = processOrder(request);
            orderCreatedCounter.increment(
                Tags.of("status", order.getStatus().toString())
            );
            return order;
        });
    }
}

// Distributed Tracing with Sleuth
@Service
@Slf4j
public class PaymentService {
    
    @NewSpan("payment-processing")
    public PaymentResult processPayment(@SpanTag("amount") BigDecimal amount, 
                                       @SpanTag("userId") Long userId) {
        
        log.info("Processing payment for user {} amount {}", userId, amount);
        
        // Trace context automatically propagated to downstream calls
        BankResponse response = bankApiClient.chargeCard(amount);
        
        return new PaymentResult(response.getTransactionId(), response.getStatus());
    }
}
```

Magyarázat: Observability segít gyorsan azonosítani és diagnosztizálni a problémákat production-ben.

## Kódrészletek és minták

### SOLID Alapelvek

**SRP – Single Responsibility Principle**
```java
// HIBÁS - több felelősség egy osztályban
class User {
    private String name;
    private String email;
    
    public void save() { /* adatbázis művelet */ }
    public void sendEmail(String msg) { /* email küldés */ }
    public boolean validate() { /* validáció */ }
}

// HELYES - szétválasztott felelősségek
class User {
    private String name;
    private String email;
    // csak data holder
}

class UserRepository {
    public void save(User user) { /* adatbázis művelet */ }
}

class EmailService {
    public void sendEmail(User user, String msg) { /* email küldés */ }
}

class UserValidator {
    public boolean validate(User user) { /* validáció */ }
}
```

**OCP – Open/Closed Principle**
```java
interface DiscountStrategy {
    double calculateDiscount(double amount);
}

class RegularDiscount implements DiscountStrategy {
    public double calculateDiscount(double amount) { return amount * 0.05; }
}

class PremiumDiscount implements DiscountStrategy {
    public double calculateDiscount(double amount) { return amount * 0.1; }
}

class PriceCalculator {
    private DiscountStrategy strategy;
    public PriceCalculator(DiscountStrategy strategy) { this.strategy = strategy; }
    public double calculate(double base) { return base - strategy.calculateDiscount(base); }
}
```

**LSP – Liskov Substitution Principle**
```java
abstract class Bird { abstract void eat(); }

class Sparrow extends Bird { 
    void eat() { /* ... */ } 
    void fly() { /* ... */ }
}

class Penguin extends Bird { 
    void eat() { /* ... */ } 
    // Pingvin nem implementálja a repülést - helyes LSP
}

// Jobb megközelítés
interface Flyable { void fly(); }
class Sparrow extends Bird implements Flyable { /* ... */ }
class Penguin extends Bird { /* ... */ } // Nem flyable
```

**ISP – Interface Segregation Principle**
```java
// HIBÁS - "fat interface"
interface Worker { void work(); void eat(); void sleep(); }

// HELYES - szeparált interfészek
interface Workable { void work(); }
interface Eatable { void eat(); }
interface Sleepable { void sleep(); }

class Human implements Workable, Eatable, Sleepable { /* ... */ }
class Robot implements Workable { /* csak dolgozik */ }
```

**DIP – Dependency Inversion Principle**
```java
interface NotificationService { void send(String msg); }

class EmailNotification implements NotificationService {
    public void send(String msg) { /* email */ }
}

class SMSNotification implements NotificationService {
    public void send(String msg) { /* SMS */ }
}

class OrderService {
    private NotificationService notification; // absztrakció!
    
    public OrderService(NotificationService notification) {
        this.notification = notification;
    }
    
    public void processOrder(Order order) {
        notification.send("Order processed");
    }
}
```

### Design Patterns

**Singleton**
```java
public class DatabaseConnection {
    private static DatabaseConnection instance;
    private DatabaseConnection() {}
    
    public static synchronized DatabaseConnection getInstance() {
        if (instance == null) instance = new DatabaseConnection();
        return instance;
    }
}

// Thread-safe, lazy loading
public class ThreadSafeSingleton {
    private static volatile ThreadSafeSingleton instance;
    private ThreadSafeSingleton() {}
    
    public static ThreadSafeSingleton getInstance() {
        if (instance == null) {
            synchronized (ThreadSafeSingleton.class) {
                if (instance == null) instance = new ThreadSafeSingleton();
            }
        }
        return instance;
    }
}
```

**Factory**
```java
interface Animal { void makeSound(); }
class Dog implements Animal { public void makeSound() { System.out.println("Woof!"); } }
class Cat implements Animal { public void makeSound() { System.out.println("Meow!"); } }

class AnimalFactory {
    public static Animal createAnimal(String type) {
        switch (type) {
            case "dog": return new Dog();
            case "cat": return new Cat();
            default: throw new IllegalArgumentException("Unknown: " + type);
        }
    }
}

// Használat
Animal dog = AnimalFactory.createAnimal("dog");
dog.makeSound(); // "Woof!"
```

**Builder**
```java
public class User {
    private String name, email;
    private int age;
    
    private User(Builder b) { name = b.name; email = b.email; age = b.age; }
    
    public static class Builder {
        private String name, email; private int age;
        
        public Builder(String name, String email) { this.name = name; this.email = email; }
        public Builder age(int age) { this.age = age; return this; }
        public User build() { return new User(this); }
    }
}

// Használat
User user = new User.Builder("John", "john@example.com")
    .age(25)
    .build();
```

**Adapter**
```java
// Legacy rendszer
class LegacyPrinter { public void printOld(String text) { System.out.println(text); } }

// Modern interfész
interface ModernPrinter { void print(String text); }

// Adapter
class PrinterAdapter implements ModernPrinter {
    private LegacyPrinter legacy;
    public PrinterAdapter(LegacyPrinter legacy) { this.legacy = legacy; }
    public void print(String text) { legacy.printOld(text); }
}
```

**Decorator**
```java
interface Coffee { String getDescription(); double getCost(); }

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
    public String getDescription() { return coffee.getDescription() + ", milk"; }
    public double getCost() { return coffee.getCost() + 0.5; }
}

// Használat
Coffee coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);
System.out.println(coffee.getDescription() + " costs " + coffee.getCost());
```

**Observer**
```java
interface Observer { void update(String msg); }
interface Subject { void attach(Observer o); void detach(Observer o); void notifyObservers(String msg); }

class NewsAgency implements Subject {
    private List<Observer> observers = new ArrayList<>();
    public void attach(Observer o) { observers.add(o); }
    public void detach(Observer o) { observers.remove(o); }
    public void notifyObservers(String msg) { 
        for (Observer o : observers) o.update(msg); 
    }
    
    public void setNews(String news) { notifyObservers(news); }
}

class NewsChannel implements Observer {
    private String name;
    public NewsChannel(String name) { this.name = name; }
    public void update(String news) { System.out.println(name + ": " + news); }
}
```

**Strategy**
```java
interface SortingStrategy { void sort(int[] arr); }
class BubbleSort implements SortingStrategy { public void sort(int[] arr) { /* ... */ } }
class QuickSort implements SortingStrategy { public void sort(int[] arr) { /* ... */ } }

class SortingContext {
    private SortingStrategy strategy;
    public SortingContext(SortingStrategy strategy) { this.strategy = strategy; }
    public void setStrategy(SortingStrategy strategy) { this.strategy = strategy; }
    public void performSort(int[] arr) { strategy.sort(arr); }
}
```

### Architektúra minták

**MVC (Model-View-Controller)**
```java
// Model - adatok és üzleti logika
class User { 
    private String name; 
    private String email; 
    // getters/setters
}

// View - megjelenítés
class UserView { 
    public void displayUser(String n, String e) { 
        System.out.println(n + " " + e); 
    } 
}

// Controller - koordináció
class UserController {
    private User model; 
    private UserView view;
    
    public UserController(User m, UserView v) { model = m; view = v; }
    public void updateView() { view.displayUser(model.getName(), model.getEmail()); }
}
```

**Repository Pattern**
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
    @Autowired private EntityManager em;
    
    public void save(User u) { em.persist(u); }
    public User findById(Long id) { return em.find(User.class, id); }
    public List<User> findAll() { return em.createQuery("FROM User", User.class).getResultList(); }
    public void delete(Long id) { em.remove(em.find(User.class, id)); }
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

**CQRS (Command Query Responsibility Segregation)**
```java
// Command side - írási műveletek
@Component
class CreateUserCommand {
    private UserRepository userRepo;
    private EventPublisher eventPublisher;
    
    public void handle(CreateUserRequest request) {
        User user = new User(request.getName(), request.getEmail());
        userRepo.save(user);
        eventPublisher.publish(new UserCreatedEvent(user.getId()));
    }
}

// Query side - olvasási műveletek
@Component  
class UserQueryService {
    private UserReadModelRepository readRepo; // denormalizált adatok
    
    public UserSummary getUserSummary(Long userId) {
        return readRepo.findSummaryById(userId);
    }
    
    public List<UserListItem> searchUsers(String query) {
        return readRepo.searchByNameOrEmail(query);
    }
}

// Event Handler - szinkronizálja a read model-t
@EventListener
class UserProjectionHandler {
    public void handle(UserCreatedEvent event) {
        // Read model frissítése
        UserSummary summary = createUserSummary(event);
        readModelRepo.save(summary);
    }
}
```

## Gyakori hibák

### Overengineering
Túl komplex architektúra, felesleges absztrakciók, indokolatlan microservice darabolás.

**Hibás példa:**
```java
// Túl bonyolult egy egyszerű CRUD-hoz
interface UserFactoryAbstractFactoryInterface {
    UserCreationStrategyInterface createUserCreationStrategy();
}

class UserFactoryAbstractFactory implements UserFactoryAbstractFactoryInterface {
    public UserCreationStrategyInterface createUserCreationStrategy() {
        return new ConcreteUserCreationStrategyFactoryBean()
            .createUserCreationStrategyImplementation();
    }
}

// Egyszerűbb lenne:
@Service
class UserService {
    public User createUser(String name, String email) {
        return userRepository.save(new User(name, email));
    }
}
```

### Chatty Services
Túl sok, apró szolgáltatás közötti kommunikáció, ami lassítja a rendszert.

**Hibás példa:**
```java
// Túl sok HTTP hívás egy művelethez
public class OrderService {
    public Order createOrder(CreateOrderRequest request) {
        // 1. User szolgáltatás hívása
        User user = userServiceClient.getUser(request.getUserId());
        
        // 2. Minden termékhez külön hívás
        List<Product> products = new ArrayList<>();
        for (Long productId : request.getProductIds()) {
            Product product = productServiceClient.getProduct(productId); // N+1 probléma
            products.add(product);
        }
        
        // 3. Inventory ellenőrzés minden termékhez
        for (Product product : products) {
            boolean available = inventoryServiceClient.checkAvailability(product.getId());
        }
        
        // 4. Pricing szolgáltatás hívása
        Price totalPrice = pricingServiceClient.calculatePrice(products);
        
        // 5. Payment szolgáltatás hívása
        PaymentResult payment = paymentServiceClient.processPayment(totalPrice);
        
        return new Order(user, products, payment);
    }
}

// Jobb megoldás - batch hívások
public class OrderService {
    public Order createOrder(CreateOrderRequest request) {
        // Batch product hívás
        List<Product> products = productServiceClient.getProducts(request.getProductIds());
        
        // Batch inventory ellenőrzés
        Map<Long, Boolean> availability = inventoryServiceClient.checkAvailabilityBatch(
            request.getProductIds());
            
        // Egy pricing hívás
        Price totalPrice = pricingServiceClient.calculateTotalPrice(request);
        
        return processOrder(request, products, totalPrice);
    }
}
```

### Monolitikus adatbázis
Minden komponens ugyanazt az adatbázist használja, ami skálázási és hibatűrési problémákat okoz.

**Hibás példa:**
```sql
-- Minden tábla egy adatbázisban
CREATE DATABASE ecommerce;

-- User Management táblái
CREATE TABLE users (id, name, email, password_hash);
CREATE TABLE user_profiles (user_id, address, phone);
CREATE TABLE user_preferences (user_id, theme, language);

-- Product Management táblái  
CREATE TABLE products (id, name, description, category_id);
CREATE TABLE categories (id, name, parent_id);
CREATE TABLE product_images (product_id, image_url);

-- Order Management táblái
CREATE TABLE orders (id, user_id, total_amount, status);
CREATE TABLE order_items (order_id, product_id, quantity, price);

-- Inventory Management táblái
CREATE TABLE inventory (product_id, quantity, reserved);
CREATE TABLE warehouse_locations (id, product_id, location);

-- Payment Management táblái
CREATE TABLE payments (id, order_id, amount, payment_method);
CREATE TABLE payment_transactions (payment_id, transaction_id, status);
```

**Jobb megoldás - Database per Service:**
```yaml
# User Service DB
user_service:
  database: user_db
  tables:
    - users (id, name, email, password_hash)
    - user_profiles (user_id, address, phone)

# Product Service DB  
product_service:
  database: product_db
  tables:
    - products (id, name, description, price)
    - categories (id, name)

# Order Service DB
order_service:
  database: order_db  
  tables:
    - orders (id, user_id, total_amount, status)
    - order_items (order_id, product_id, quantity)

# Inventory Service DB
inventory_service:
  database: inventory_db
  tables:
    - stock (product_id, quantity, reserved)
    - warehouses (id, location)
```

### Rossz rétegkeverés
Prezentációs logika keveredik az üzleti vagy adatkezelési réteggel.

**Hibás példa:**
```java
@RestController
public class UserController {
    
    @PostMapping("/users")
    public ResponseEntity<String> createUser(@RequestBody Map<String, String> request) {
        // HIBA: Üzleti logika a controller-ben
        String name = request.get("name");
        String email = request.get("email");
        
        // HIBA: Validáció a controller-ben
        if (name == null || name.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Name is required");
        }
        
        if (!email.contains("@")) {
            return ResponseEntity.badRequest().body("Invalid email format");
        }
        
        // HIBA: Közvetlen adatbázis hozzáférés a controller-ből
        try (Connection conn = DriverManager.getConnection("jdbc:...")) {
            PreparedStatement stmt = conn.prepareStatement(
                "INSERT INTO users (name, email) VALUES (?, ?)");
            stmt.setString(1, name);
            stmt.setString(2, email);
            stmt.executeUpdate();
        }
        
        // HIBA: HTML generálás a controller-ben
        return ResponseEntity.ok("<html><body>User " + name + " created!</body></html>");
    }
}

// Helyes megoldás - rétegek elválasztása
@RestController
public class UserController {
    private final UserService userService;
    
    @PostMapping("/users") 
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody CreateUserRequest request) {
        UserDTO user = userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
}
```

## Interjúkérdések

- **Mi a különbség monolit és mikroszolgáltatás között?** — *Monolit: egy deploy egység, minden funkcionalitás együtt. Microservice: független, kis szolgáltatások, saját adatbázissal.*

- **Hogyan oldanád meg a resiliency-t egy rendszerben?** — *Retry mechanizmus, circuit breaker, fallback válaszok, timeout beállítások, bulkhead pattern.*

- **Mi az idempotencia és miért fontos?** — *Többszöri végrehajtás nem változtatja az eredményt. API-k megbízhatósága, hálózati hibák kezelése miatt fontos.*

- **Mi a hexagonális architektúra lényege?** — *Core business logika portokon keresztül kommunikál külső rendszerekkel, adapterek biztosítják az implementációt.*

- **Mik a legfontosabb design pattern-ek?** — *Singleton, Factory, Builder, Adapter, Decorator, Observer, Strategy, Repository, MVC.*

- **Hogyan terveznél egy skálázható REST API-t?** — *Layered architektúra, cache réteg, async műveletek, rate limiting, API versioning, proper HTTP status codes.*

- **Mi a különbség chatty és chunky service között?** — *Chatty: sok kis hívás, lassú hálózat miatt. Chunky: kevesebb hívás nagyobb payloadokkal, hatékonyabb.*

- **Mik a SOLID elvek?** — *SRP, OCP, LSP, ISP, DIP - clean code és maintainable architektúra alapelvei.*

- **Mit jelent a separation of concerns?** — *Különböző felelősségek elkülönítése külön komponensekben, könnyebb fejlesztés és karbantartás.*

- **Hogyan implementálnál cache-t egy webalkalmazásban?** — *Redis/Memcached, application-level cache, HTTP cache headers, CDN, database query cache.*

- **Mi a különbség CQRS és hagyományos CRUD között?** — *CQRS: külön read/write modellek, skálázható. CRUD: egy modell minden művelethez.*

- **Hogyan biztosítanád az observability-t?** — *Structured logging, metrics (Prometheus), distributed tracing (Jaeger), health checks, alerting.*

## Gyakorlati feladat

Tervezd meg egy egyszerű webshop architektúráját:

**Követelmények:**
1. **Komponensek**: User, Product, Order, Inventory, Notification, Payment
2. **Rétegek**: API Gateway, Service Layer, Repository Layer, Database Layer  
3. **Kommunikáció**: REST API-k, aszinkron események (RabbitMQ/Kafka)
4. **Resiliency**: Retry mechanizmus, circuit breaker, fallback responses
5. **Cache**: Redis termékekhez és felhasználói session-höz
6. **Biztonság**: JWT auth, role-based access control
7. **Observability**: Logging, metrics, health checks

**Megvalósítandó:**
- API design (endpoints, HTTP methods, status codes)
- Database schema minden service-hez
- Event-driven kommunikáció tervezése
- Error handling stratégia
- Deployment architektúra (Docker containers)

*Kapcsolódó gyakorlati feladat: [REST vs gRPC](/exercises/arch/01-rest-vs-grpc)*

## Kapcsolódó témák

- [Java Alapok](/theory/java) – OOP elvek, design patterns alapjai
- [Spring Framework](/theory/spring) – Dependency Injection, REST API-k
- [Web Development](/theory/web) – HTTP, API design, CORS
- [Frontend](/theory/frontend) – SPA architektúra, komponens design
- [DevOps](/theory/devops) – CI/CD, containerization, monitoring
- [SQL & Adatbázis](/theory/sql) – relációs modellek, indexek, tranzakciók
- [Tesztelés](/theory/testing) – integrációs tesztek, contract testing

## További olvasmányok

- [Martin Fowler: Software Architecture](https://martinfowler.com/architecture/) – architektúra minták, best practices
- [12-Factor App](https://12factor.net/) – cloud-native alkalmazás elvek
- [Domain Driven Design Reference](https://domainlanguage.com/ddd/reference/) – DDD alapfogalmak és minták
- [Microservices.io](https://microservices.io/) – mikroszolgáltatás minták gyűjteménye
- [Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/) – integration és messaging minták
- [Building Microservices by Sam Newman](https://www.oreilly.com/library/view/building-microservices/9781491950340/) – gyakorlati mikroszolgáltatás fejlesztés
