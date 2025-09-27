# Spring Framework

## Rövid összefoglaló

A Spring Framework egy átfogó Java alkalmazásfejlesztési keretrendszer, amely az Inversion of Control (IoC) és Dependency Injection (DI) elvekre épül. A Spring Boot autokonfigurációval egyszerűsíti a setup folyamatot és production-ready alkalmazások gyors fejlesztését teszi lehetővé. Fő előnyei közé tartozik a moduláris architektúra, az extenzív ökoszisztéma és a vállalati szintű szolgáltatások támogatása. Buktatói a tanulási görbe és a "magic" autokonfiguráció, amely megnehezítheti a hibakeresést.

## Fogalmak

### Bean {#bean}
A Spring kontainerben kezelt objektumok. A Spring IoC kontainer hozza létre, konfigurálja és kezeli ezeket az objektumokat.

**Példa:**
```java
@Component
public class UserService {
    private final UserRepository userRepository;

    // Constructor injection (ajánlott)
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findUser(Long id) {
        return userRepository.findById(id);
    }
}

// Vagy @Configuration osztályban:
@Configuration
public class AppConfig {
    @Bean
    public UserService userService(UserRepository userRepository) {
        return new UserService(userRepository);
    }
}
```

Magyarázat: A Spring automatikusan felismeri a `@Component` annotált osztályokat és Bean-ekként regisztrálja őket az alkalmazás indításakor.

### @Component {#component}
Általános annotáció egy osztály Bean-ként való megjelöléséhez. A Spring automatikusan regisztrálja az alkalmazás kontextusában.

**Példa:**
```java
@Component
public class EmailService {
    public void sendEmail(String recipient, String message) {
        System.out.println("Sending email to: " + recipient);
        System.out.println("Message: " + message);
    }
}

// Használat más Bean-ben
@Component
public class UserController {
    private final EmailService emailService;

    public UserController(EmailService emailService) {
        this.emailService = emailService;
    }
}
```

Magyarázat: A `@Component` egy meta-annotáció, amiből specializáltabb annotációk származnak (`@Service`, `@Repository`, `@Controller`).

### @Service {#service}
Szolgáltatási réteg Bean-jeit jelölő annotáció. Üzleti logikát tartalmazó osztályokhoz használatos.

**Példa:**
```java
@Service
public class BankAccountService {
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    public BankAccountService(AccountRepository accountRepository, 
                              TransactionRepository transactionRepository) {
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
    }

    @Transactional
    public void transfer(Long fromAccountId, Long toAccountId, BigDecimal amount) {
        Account fromAccount = accountRepository.findById(fromAccountId)
            .orElseThrow(() -> new AccountNotFoundException("Account not found"));
        Account toAccount = accountRepository.findById(toAccountId)
            .orElseThrow(() -> new AccountNotFoundException("Account not found"));

        if (fromAccount.getBalance().compareTo(amount) < 0) {
            throw new InsufficientFundsException("Insufficient funds");
        }

        fromAccount.withdraw(amount);
        toAccount.deposit(amount);

        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);

        // Transaction log
        Transaction transaction = new Transaction(fromAccountId, toAccountId, amount);
        transactionRepository.save(transaction);
    }
}
```

Magyarázat: A `@Service` szemantikus információt ad az osztályról és Spring AOP proxy-t is engedélyezhet (pl. `@Transactional` működéséhez).

### @Repository {#repository}
Adathozzáférési réteg Bean-jeit jelölő annotáció. Exception translation szolgáltatást is biztosít.

**Példa:**
```java
@Repository
public class UserRepository {
    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public User findById(Long id) {
        String sql = "SELECT id, name, email FROM users WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, this::mapRowToUser, id);
    }

    public List<User> findAll() {
        String sql = "SELECT id, name, email FROM users";
        return jdbcTemplate.query(sql, this::mapRowToUser);
    }

    public void save(User user) {
        String sql = "INSERT INTO users (name, email) VALUES (?, ?)";
        jdbcTemplate.update(sql, user.getName(), user.getEmail());
    }

    private User mapRowToUser(ResultSet rs, int rowNum) throws SQLException {
        return new User(
            rs.getLong("id"),
            rs.getString("name"),
            rs.getString("email")
        );
    }
}
```

Magyarázat: A `@Repository` automatikusan átkonvertálja az adatbázis specifikus exception-öket Spring DataAccessException-ökké.

### @Configuration {#configuration}
Konfigurációs osztályokat jelöl, amelyek Bean definíciókat tartalmaznak. A Java-alapú konfiguráció része.

**Példa:**
```java
@Configuration
@EnableJpaRepositories
@PropertySource("classpath:application.properties")
public class DatabaseConfig {

    @Value("${db.url}")
    private String dbUrl;

    @Value("${db.username}")
    private String username;

    @Value("${db.password}")
    private String password;

    @Bean
    @Primary
    public DataSource dataSource() {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl(dbUrl);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        dataSource.setMaximumPoolSize(20);
        return dataSource;
    }

    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }

    @Bean
    @Profile("test")
    public DataSource testDataSource() {
        return new EmbeddedDatabaseBuilder()
            .setType(EmbeddedDatabaseType.H2)
            .addScript("schema.sql")
            .addScript("test-data.sql")
            .build();
    }
}
```

Magyarázat: A `@Configuration` osztályok helyettesítik az XML konfigurációt és programmatikus Bean regisztrációt tesznek lehetővé.

### @ConfigurationProperties {#configurationproperties}
Konfigurációs propertyket map-eli POJO objektumokra. Type-safe konfiguráció lehetővé teszi.

**Példa:**
```java
@ConfigurationProperties(prefix = "app.mail")
@Component
public class MailProperties {
    private String host;
    private int port;
    private String username;
    private String password;
    private boolean ssl;
    private int timeout = 5000;

    // Getters és setters
    public String getHost() { return host; }
    public void setHost(String host) { this.host = host; }

    public int getPort() { return port; }
    public void setPort(int port) { this.port = port; }

    // ... további getters és setters

    @Override
    public String toString() {
        return "MailProperties{" +
            "host='" + host + '\'' +
            ", port=" + port +
            ", ssl=" + ssl +
            ", timeout=" + timeout +
            '}';
    }
}

// application.yml-ben:
/*
app:
  mail:
    host: smtp.gmail.com
    port: 587
    username: myemail@gmail.com
    password: mypassword
    ssl: true
    timeout: 10000
*/

// Használat:
@Service
public class MailService {
    private final MailProperties mailProperties;

    public MailService(MailProperties mailProperties) {
        this.mailProperties = mailProperties;
    }

    public void sendEmail(String to, String message) {
        System.out.println("Connecting to " + mailProperties.getHost() + ":" + mailProperties.getPort());
        // Email küldési logika
    }
}
```

Magyarázat: A `@ConfigurationProperties` type-safe konfigurációt biztosít és automatikus validációt is támogat.

### @Autowired {#autowired}
Dependency injection annotáció. Constructor, field vagy setter injection-höz használható, de constructor injection ajánlott.

**Példa:**
```java
@Service
public class OrderService {
    private final PaymentService paymentService;
    private final EmailService emailService;
    private final InventoryService inventoryService;

    // Constructor injection (AJÁNLOTT)
    public OrderService(PaymentService paymentService, 
                       EmailService emailService, 
                       InventoryService inventoryService) {
        this.paymentService = paymentService;
        this.emailService = emailService;
        this.inventoryService = inventoryService;
    }

    /* KERÜLENDŐ ALTERNATÍVÁK:
    
    // Field injection (kerülendő - nehezen tesztelhető)
    @Autowired
    private PaymentService paymentService;
    
    // Setter injection (ritkán használt)
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

Magyarázat: Constructor injection biztosítja a kötelező függőségeket és immutable objektumokat tesz lehetővé, ezért ez az ajánlott gyakorlat.

### @RestController {#restcontroller}
REST API végpontokat definiál. Kombinálja a `@Controller` és `@ResponseBody` annotációkat.

**Példa:**
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

Magyarázat: A `@RestController` automatikusan JSON/XML formátumban serialize-álja a válaszokat és kezeli a HTTP kéréseket.

### Profilok {#profilok}
Környezetfüggő konfigurációk kezelését teszi lehetővé (dev, test, production).

**Példa:**
```java
// application.yml
/*
spring:
  profiles:
    active: dev
    
---
spring:
  profiles: dev
  datasource:
    url: jdbc:h2:mem:devdb
    username: sa
    password: 
  jpa:
    show-sql: true
    
---
spring:
  profiles: production
  datasource:
    url: jdbc:postgresql://prod-db:5432/myapp
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
  jpa:
    show-sql: false
*/

@Configuration
public class ProfileConfig {

    @Bean
    @Profile("dev")
    public CommandLineRunner dataLoader(UserRepository userRepository) {
        return args -> {
            userRepository.save(new User("Dev User", "dev@example.com"));
            userRepository.save(new User("Test User", "test@example.com"));
            System.out.println("Development test data loaded");
        };
    }

    @Bean
    @Profile("production")
    public SecurityConfig productionSecurity() {
        return new SecurityConfig() {
            @Override
            public void configure(HttpSecurity http) throws Exception {
                http.requiresChannel().anyRequest().requiresSecure(); // HTTPS kötelező
            }
        };
    }

    @Component
    @Profile("!production") // minden profil, kivéve production
    public class DebugService {
        public void logDebugInfo(String message) {
            System.out.println("DEBUG: " + message);
        }
    }
}
```

Magyarázat: A profilok lehetővé teszik különböző környezetek (fejlesztői, teszt, éles) specifikus konfigurációját anélkül, hogy a kódot módosítani kellene.

### RestTemplate / WebClient {#resttemplate-webclient}
HTTP kliens API-k külső szolgáltatások hívásához. RestTemplate legacy, WebClient a modern reactive alternatíva.

**Példa:**
```java
@Service
public class ExternalApiService {
    private final RestTemplate restTemplate;
    private final WebClient webClient;

    public ExternalApiService(RestTemplateBuilder restTemplateBuilder, 
                             WebClient.Builder webClientBuilder) {
        this.restTemplate = restTemplateBuilder
            .setConnectTimeout(Duration.ofMillis(3000))
            .setReadTimeout(Duration.ofMillis(3000))
            .build();
            
        this.webClient = webClientBuilder
            .baseUrl("https://jsonplaceholder.typicode.com")
            .defaultHeader(HttpHeaders.USER_AGENT, "MyApp/1.0")
            .build();
    }

    // RestTemplate (synchronous)
    public User fetchUserRestTemplate(Long id) {
        String url = "https://jsonplaceholder.typicode.com/users/{id}";
        try {
            ResponseEntity<User> response = restTemplate.getForEntity(url, User.class, id);
            return response.getBody();
        } catch (RestClientException e) {
            throw new ExternalServiceException("Failed to fetch user", e);
        }
    }

    // WebClient (reactive)
    public Mono<User> fetchUserWebClient(Long id) {
        return webClient.get()
            .uri("/users/{id}", id)
            .retrieve()
            .onStatus(HttpStatus::is4xxClientError, 
                     response -> Mono.error(new UserNotFoundException("User not found")))
            .onStatus(HttpStatus::is5xxServerError, 
                     response -> Mono.error(new ExternalServiceException("Server error")))
            .bodyToMono(User.class)
            .timeout(Duration.ofSeconds(5))
            .retry(3);
    }
}
```

Magyarázat: RestTemplate blokkoló, egyszerű használatú. WebClient non-blocking, reactive programozáshoz ajánlott új projektekhez.

### Validation {#validation}
Bean validáció JSR-303/380 alapján. Automatikus validáció REST endpoint-okban és service rétegben.

**Példa:**
```java
// Entity/DTO validációval
public class CreateUserRequest {
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    @Min(value = 18, message = "Age must be at least 18")
    @Max(value = 120, message = "Age must be less than 120")
    private Integer age;

    // constructors, getters, setters
}

// Controller-ben validáció
@RestController
@RequestMapping("/api/users")
@Validated
public class UserController {

    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody CreateUserRequest request) {
        User user = userService.createUser(request);
        return ResponseEntity.ok(user);
    }
}

// Globális exception handler validációhoz
@ControllerAdvice
public class ValidationExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationErrorResponse> handleValidation(
            MethodArgumentNotValidException e) {
        
        List<String> errors = e.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(error -> error.getField() + ": " + error.getDefaultMessage())
            .collect(Collectors.toList());

        ValidationErrorResponse response = new ValidationErrorResponse(
            "Validation failed", errors
        );
        
        return ResponseEntity.badRequest().body(response);
    }
}
```

Magyarázat: A Spring automatikusan validálja a `@Valid` annotált objektumokat és `MethodArgumentNotValidException`-t dob hibás adatok esetén.

### Spring Data JPA {#spring-data-jpa}
Automatikus repository implementáció JPA entitásokhoz. Query metódusok és custom query-k támogatása.

**Példa:**
```java
// Entity
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;

    // constructors, getters, setters
}

// Repository interface
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Query methods - Spring automatically implements
    Optional<User> findByEmail(String email);
    
    List<User> findByNameContaining(String name);
    
    boolean existsByEmail(String email);

    // Custom JPQL query
    @Query("SELECT u FROM User u WHERE u.name LIKE %:searchTerm% OR u.email LIKE %:searchTerm%")
    List<User> searchUsers(@Param("searchTerm") String searchTerm);

    // Pagination
    Page<User> findByNameContaining(String name, Pageable pageable);
}
```

Magyarázat: Spring Data JPA automatikusan generálja a repository implementációt a metódusnevek alapján, és támogatja a custom query-ket is.

### Transaction (@Transactional) {#transactional}
Deklarativ tranzakciókezelés. Metódus szinten vagy osztály szinten alkalmazható.

**Példa:**
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
        // Validáció
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }

        // Számlák lekérése
        Account fromAccount = accountRepository.findById(fromAccountId)
            .orElseThrow(() -> new AccountNotFoundException("Source account not found"));
        
        Account toAccount = accountRepository.findById(toAccountId)
            .orElseThrow(() -> new AccountNotFoundException("Target account not found"));

        // Egyenleg ellenőrzés
        if (fromAccount.getBalance().compareTo(amount) < 0) {
            throw new InsufficientFundsException("Insufficient balance");
        }

        // Tranzakció végrehajtása
        fromAccount.withdraw(amount);
        toAccount.deposit(amount);

        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);

        // Tranzakció log
        BankTransaction transaction = new BankTransaction(fromAccountId, toAccountId, amount);
        transactionRepository.save(transaction);
    }
}
```

Magyarázat: A `@Transactional` automatikus rollback-et biztosít unchecked exception-öknél és konfigurálható izolációs szinteket és timeout-ot támogat.

### Actuator {#actuator}
Production-ready funkciók monitoring, metrics és health check célokra. Beépített endpoint-okat biztosít.

**Példa:**
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
```

Magyarázat: Az Actuator production monitoring eszközöket biztosít, mint health check-ek, metrics, environment info.

## Gyakori hibák

### God Service Anti-pattern
Túl sok felelősség egy service osztályban. Nehezen tesztelhető és karbantartható.

**Hibás példa:**
```java
@Service
public class UserService {
    // Túl sok függőség - red flag
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PaymentService paymentService;
    private final AuditService auditService;
    private final FileService fileService;

    // Túl sok felelősség egy metódusban
    public void processUserRegistration(UserRegistrationRequest request) {
        // User validation
        // User creation
        // Email verification
        // File upload
        // Payment processing
        // Audit logging
        // Push notifications
    }
}
```

**Helyes megoldás:**
```java
// Feladatok szétbontása több service-re
@Service
public class UserRegistrationService {
    private final UserService userService;
    private final EmailVerificationService emailService;
    private final ApplicationEventPublisher eventPublisher;

    public void registerUser(UserRegistrationRequest request) {
        // Core user creation
        User user = userService.createUser(request);
        
        // Event-driven további folyamatok
        eventPublisher.publishEvent(new UserRegisteredEvent(user));
    }
}
```

### Circular Dependency
Constructor injection-nel circular dependency nem oldható meg egyszerűen.

**Hibás példa:**
```java
@Service
public class OrderService {
    private final PaymentService paymentService;
    
    public OrderService(PaymentService paymentService) {  // HIBA
        this.paymentService = paymentService;
    }
}

@Service 
public class PaymentService {
    private final OrderService orderService;
    
    public PaymentService(OrderService orderService) {  // HIBA
        this.orderService = orderService;
    }
}
```

**Helyes megoldás:**
```java
// Refactor - közös service kiemelése
@Service
public class BusinessLogicService {
    // Common logic here
}

@Service
public class OrderService {
    private final BusinessLogicService businessLogicService;
    // ...
}
```

## Interjúkérdések

- **Hogyan működik a Dependency Injection Spring-ben?** — *Spring IoC container kezeli a Bean-eket, constructor/setter/field injection, automatikus wiring.*

- **Mi a különbség @Component és @Bean között?** — *@Component class-level, automatikus scanning; @Bean method-level, manual configuration.*

- **Mik a Spring Boot starter-ek előnyei?** — *Előre konfigurált dependency-k, autokonfiguráció, convention over configuration.*

- **Hogyan működik a @Transactional?** — *AOP proxy, automatikus commit/rollback, propagáció és izolációs szintek.*

- **Mi a @Profile annotáció célja?** — *Környezetfüggő Bean regisztráció (dev/test/prod), conditional configuration.*

- **Hogyan kezelnéd a circular dependency-t?** — *Constructor injection helyett setter injection, @Lazy annotáció, refactoring.*

- **Hogyan implementálnál caching-et Spring-ben?** — *@EnableCaching, @Cacheable/@CacheEvict, cache provider (Redis/Hazelcast).*

- **Mi a Spring Data JPA query methods működése?** — *Method név parsing, automatic query generation, custom queries with @Query.*

- **Hogyan használnád a Spring Actuator-t production-ben?** — *Health checks, metrics, monitoring endpoints, security considerations.*

- **Mi a RestTemplate vs WebClient közötti különbség?** — *RestTemplate synchronous/blocking, WebClient asynchronous/reactive.*

- **Hogyan kezelnéd a validation-t REST API-ban?** — *@Valid, @Validated, JSR-303 annotációk, global exception handler.*

- **Mi a Spring Security authentication flow?** — *SecurityFilterChain, AuthenticationManager, UserDetailsService, JWT tokens.*

## Gyakorlati feladat

Hozz létre egy egyszerű könyvtári rendszert Spring Boot-tal:

1. `Book` entity (id, title, author, isbn, available)
2. `BookRepository` JPA repository query metódusokkal
3. `BookService` üzleti logikával (kölcsönzés/visszavétel)
4. `BookController` REST API-val (CRUD műveletek)
5. Validáció és error handling
6. Unit és integration tesztek
7. Application properties különböző profilokhoz
8. Actuator health check és custom metrics

*Kapcsolódó gyakorlati feladat: [Spring REST API](/exercises/java/02-spring-rest)*

## Kapcsolódó témák

- [Java Alapok](/theory/java) - OOP alapelvek és Java core funkciók
- [Tesztelés](/theory/testing) - Spring Test framework és MockMvc
- [SQL & Adatbázis](/theory/sql) - JPA és database integráció
- [Szoftver Architektúra](/theory/arch) - Microservices és Spring Cloud

## További olvasmányok

- [Spring Framework Documentation](https://docs.spring.io/spring-framework/docs/current/reference/html/) - Hivatalos dokumentáció
- [Spring Boot Reference Guide](https://docs.spring.io/spring-boot/docs/current/reference/html/) - Spring Boot dokumentáció
- [Baeldung Spring Tutorials](https://www.baeldung.com/spring-tutorial) - Részletes Spring tutorialok
- [Spring in Action](https://www.manning.com/books/spring-in-action-fifth-edition) - Craig Walls könyve
- [Pro Spring 5](https://www.apress.com/gp/book/9781484228074) - Részletes Spring referencia
- [Spring Security Reference](https://docs.spring.io/spring-security/site/docs/current/reference/html5/) - Security dokumentáció