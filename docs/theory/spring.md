---
render_with_liquid: false
---

# Spring Framework

## Rövid összefoglaló

A Spring Framework egy átfogó Java alkalmazásfejlesztési keretrendszer, amely az Inversion of Control (IoC) és Dependency Injection (DI) elvekre épül. A Spring Boot autokonfigurációval egyszerűsíti a setup folyamatot és production-ready alkalmazások gyors fejlesztését teszi lehetővé. Fő előnyei közé tartozik a moduláris architektúra, az extenzív ökoszisztéma és a vállalati szintű szolgáltatások támogatása. Buktatói a tanulási görbe és a "magic" autokonfiguráció, amely megnehezítheti a hibakeresést.

<!-- Reading Progress Bar -->
<div id="read-progress"></div>

<!-- Tag Filter -->
<div class="tag-filter-container">
  <h3>🏷️ Szűrés témakörök szerint</h3>
  <div class="tag-filter-chips">
    <button class="filter-chip active" data-filter="all">Mind</button>
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

## Fogalmak

### Bean {#bean}

<div class="concept-section mental-model">

📋 **Fogalom meghatározása**  
*A Bean egy Spring IoC (Inversion of Control) konténer által kezelt objektum. A konténer létrehozza (instantiation), konfigurálja (wiring), és az életciklusát menedzseli (initialization, destruction). Bean-ek @Component, @Service, @Repository, @Controller annotációkkal vagy XML/Java konfigurációval definiálhatók. Scope-ok: singleton (default), prototype, request, session, application.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Lifecycle management**: Spring automatikusan kezeli a Bean létrehozását és megsemmisítését
- **Dependency injection**: automatikus függőség feloldás constructor/setter injection-nal
- **Singleton scope**: default esetben egy instance per application context
- **Configuration flexibility**: annotáció vagy Java config alapú Bean definíció

</div>

<div class="runnable-model">

**Runnable mental model**
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
*Figyeld meg: a Spring automatikusan felismeri a `@Component` annotált osztályokat és Bean-ekként regisztrálja őket az alkalmazás indításakor.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- *"Bean mindig singleton"* → Default igen, de lehet prototype, request, session scope is
- *"@Component és @Bean ugyanaz"* → @Component class-level, @Bean method-level configuration
- *"Spring minden objektumot Bean-né tesz"* → Csak a regisztrált és felismert objektumok

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) Mi a különbség @Component és @Bean között?
<details><summary>Válasz mutatása</summary>
@Component class-level, automatic scanning. @Bean method-level, manual configuration.
</details>

2) Milyen Bean scope-ok léteznek?
<details><summary>Válasz mutatása</summary>
singleton (default), prototype, request, session, globalSession.
</details>

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Bean lifecycle hooks (@PostConstruct, @PreDestroy) és használatuk
- Circular dependency problémák és megoldási módok
- Bean scope-ok közötti különbségek és use case-ek

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`IoC Container` · `Dependency Injection` · `Application Context` · `Bean Lifecycle` · `Scope Management`

</div>

### @Component {#component}

<div class="concept-section mental-model">

📋 **Fogalom meghatározása**  
*A @Component egy Spring stereotype annotáció, amely jelzi, hogy az osztály Spring-managed component. A component scanning (@ComponentScan) automatikusan detektálja és regisztrálja bean-ként az ApplicationContext-ben. Generic stereotype, specifikusabb változatai: @Service, @Repository, @Controller. Meta-annotációként használható custom stereotype-ok létrehozására.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Automatic registration**: component scanning automatikusan felismeri és regisztrálja
- **Stereotype annotation**: meta-annotáció, amiből specializáltabb annotációk származnak
- **Dependency injection**: más Bean-ek automatikusan injektálhatók
- **Testability**: könnyen mockolható és unit tesztelhető

</div>

<div class="runnable-model">

**Runnable mental model**
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
*Figyeld meg: a `@Component` egy meta-annotáció, amiből specializáltabb annotációk származnak (`@Service`, `@Repository`, `@Controller`).*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- *"@Component csak általános osztályokhoz"* → Bárhol használható, de specializált annotációk érthetőbbek
- *"Component scanning lassítja az alkalmazást"* → Modern Spring Boot gyors scanning-et biztosít
- *"@Component nélkül nem lehet Bean"* → @Configuration-ban @Bean method-dal is lehet

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) Milyen specializált annotációk származnak @Component-ből?
<details><summary>Válasz mutatása</summary>
@Service, @Repository, @Controller, @RestController.
</details>

2) Hogyan nevezed el a Bean-t @Component-tel?
<details><summary>Válasz mutatása</summary>
@Component("myBeanName") vagy default: osztálynév kicsi kezdőbetűvel.
</details>

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Component scanning működése és @ComponentScan konfiguráció
- Stereotype annotations közötti különbségek
- Bean naming conventions és conflict resolution

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Component Scanning` · `Stereotype Annotations` · `Bean Registration` · `Auto-wiring` · `Spring Context`

</div>

### @Service {#service}

<div class="concept-section mental-model">

📋 **Fogalom meghatározása**  
*A @Service egy specializált @Component annotáció, amely a service layer osztályokat jelöli. Szemantikailag jelzi, hogy az osztály üzleti logikát tartalmaz, de jelenleg funkcionálisan megegyezik a @Component-tel. Best practice szerint service rétegben használandó, ahol üzleti műveletek, tranzakció kezelés és több repository koordinálása történik.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Business logic encapsulation**: üzleti szabályok központi helyen kezelése
- **Transaction management**: @Transactional annotáció támogatása AOP proxy-val
- **Semantic clarity**: világos jelzés, hogy ez service layer komponens
- **Testing support**: könnyű unit testing mock dependencies-ekkel

</div>

<div class="runnable-model">

**Runnable mental model**
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
*Figyeld meg: a `@Service` szemantikus információt ad az osztályról és Spring AOP proxy-t is engedélyezhet (pl. `@Transactional` működéséhez).*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- *"@Service csak üzleti logikához"* → Bármilyen service layer komponenshez használható
- *"@Service különbözik @Component-től"* → Funkcionálisan ugyanaz, de szemantikailag különböző
- *"Service osztályban nem lehet @Repository injektálni"* → Minden Bean injektálható

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) Mikor használj @Service vs @Component?
<details><summary>Válasz mutatása</summary>
@Service: business logic layer, semantically clear. @Component: generic bean.
</details>

2) Miért jó a @Transactional @Service osztályokban?
<details><summary>Válasz mutatása</summary>
AOP proxy támogatás, transaction boundary natural service method level.
</details>

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Service layer design patterns és best practices
- @Transactional propagation és isolation szintek
- Service composition és dependency management

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Business Logic` · `Transaction Management` · `Service Layer` · `AOP Proxy` · `Dependency Injection`

</div>

### @Repository {#repository}

<div class="concept-section mental-model">

📋 **Fogalom meghatározása**  
*A @Repository egy specializált @Component annotáció adathozzáférési réteg (DAO - Data Access Object) osztályokhoz. Automatikus exception translation-t biztosít: platform-specifikus adatbázis exception-öket (SQLException) Spring DataAccessException hierarchiává alakítja. Jelzi, hogy az osztály adatpersistence műveleteket végez (CRUD, query execution).*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Exception translation**: database specifikus exception-ök konvertálása Spring DataAccessException-ökké
- **Data access abstraction**: tiszta adathozzáférési interface biztosítása
- **Semantic clarity**: explicit jelzés data access layer komponensről
- **Integration support**: Spring Data JPA és egyéb data access technológiák támogatása

</div>

<div class="runnable-model">

**Runnable mental model**
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
*Figyeld meg: a `@Repository` automatikusan átkonvertálja az adatbázis specifikus exception-öket Spring DataAccessException-ökké.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- *"@Repository csak JdbcTemplate-tel működik"* → JPA, MongoDB, Redis stb. repositories-kel is
- *"Exception translation automatikus"* → Csak @Repository annotációval ellátott bean-eknél
- *"Repository mindig interface kell legyen"* → Lehet konkrét osztály is

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) Mi az exception translation előnye?
<details><summary>Válasz mutatása</summary>
Database-agnostic exception handling, Spring DataAccessException hierarchy.
</details>

2) @Repository vs Spring Data JPA interface?
<details><summary>Válasz mutatása</summary>
@Repository: custom implementation. Spring Data: automatic implementation.
</details>

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Repository pattern implementation és Spring Data integrálás
- Exception translation mechanizmus működése
- Custom repository implementation vs generated queries

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Data Access Layer` · `Exception Translation` · `Spring Data` · `JdbcTemplate` · `Repository Pattern`

</div>

### @Configuration {#configuration}

<div class="concept-section mental-model">

📋 **Fogalom meghatározása**  
*A @Configuration egy Spring annotáció, amely jelzi, hogy az osztály bean definíciók forrása. A @Bean annotált metódusok bean-eket szolgáltatnak az ApplicationContext-nek. Java-alapú konfigurációt tesz lehetővé XML helyett, type-safe és refactoring-friendly. A CGLIB proxy biztosítja, hogy a @Bean metódusok hívásai singleton szemantikát kövessenek.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Type-safe configuration**: Java kód alapú konfiguráció compile-time ellenőrzéssel
- **Programmatic control**: dinamikus Bean létrehozás conditionalökkel és logikával
- **XML replacement**: modern alternatíva XML konfigurációhoz
- **IDE support**: auto-completion, refactoring, debugging támogatás

</div>

<div class="runnable-model">

**Runnable mental model**
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
*Figyeld meg: a `@Configuration` osztályok helyettesítik az XML konfigurációt és programmatikus Bean regisztrációt tesznek lehetővé.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- *"@Configuration osztályok mindig proxy-k"* → @Configuration(proxyBeanMethods=false) kikapcsolhatja
- *"@Bean method-okat bárhol lehet használni"* → Csak @Configuration vagy @Component osztályokban
- *"XML konfiguráció jobb mint Java config"* → Java config type-safe és IDE-friendly

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) @Configuration vs @Component a Bean definition-höz?
<details><summary>Válasz mutatása</summary>
@Configuration: bean definition központ, proxy support. @Component: lightweight.
</details>

2) Mikor használj @Primary annotációt?
<details><summary>Válasz mutatása</summary>
Multiple beans of same type esetén default választás megadására.
</details>

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- CGLIB proxy requirements és @Configuration működése
- Bean lifecycle és dependency injection order
- @Import és @ComponentScan közötti különbségek

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Java Config` · `Bean Definition` · `CGLIB Proxy` · `Type Safety` · `Conditional Configuration`

</div>

### @ConfigurationProperties {#configurationproperties}

<div class="concept-section mental-model">

📋 **Fogalom meghatározása**  
*A @ConfigurationProperties Spring Boot annotáció, amely külső konfigurációs értékeket (application.yml/properties) típusbiztos Java objektumokká konvertál. Prefix alapján hierarchikus property mapping-et biztosít, supports JSR-303 validation, relaxed binding (kebab-case, camelCase), és IDE autocomplete-et. Constructor binding-gel immutable configuration object-eket is támogat. @EnableConfigurationProperties aktiválja.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Type safety**: compile-time type checking konfigurációs értékekhez
- **Structured configuration**: hierarchikus property mapping nested objektumokkal
- **Validation support**: JSR-303 validation annotations használata
- **IDE integration**: auto-completion és documentation generation

</div>

<div class="runnable-model">

**Runnable mental model**
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
*Figyeld meg: a `@ConfigurationProperties` type-safe konfigurációt biztosít és automatikus validációt is támogat.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- *"@ConfigurationProperties csak @Component-tel működik"* → @EnableConfigurationProperties is használható
- *"Setter method-ok kötelezőek"* → Constructor binding is lehetséges immutable objektumokhoz
- *"Csak simple types támogatottak"* → Nested objects, Collections, Maps is működnek

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) @ConfigurationProperties vs @Value használat?
<details><summary>Válasz mutatása</summary>
@ConfigurationProperties: structured config, type safety. @Value: single properties.
</details>

2) Hogyan validáld a configuration properties-t?
<details><summary>Válasz mutatása</summary>
JSR-303 annotations (@NotNull, @Min, @Max) + @Validated annotation.
</details>

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Property binding mechanism és relaxed binding rules
- Constructor vs setter injection configuration properties-ben
- Configuration metadata generation és IDE support

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`External Configuration` · `Type Safety` · `Property Binding` · `Configuration Validation` · `Spring Boot`

</div>

### @Autowired {#autowired}

<div class="concept-section mental-model">

📋 **Fogalom meghatározása**  
*A @Autowired egy Spring annotáció automatikus dependency injection-höz. Használható constructor-on (recommended), setter-en, vagy field-en. A Spring típus alapján feloldja a függőséget az ApplicationContext-ből. @Qualifier specificikus bean-t, @Primary default bean-t jelöl. Required=false opcionálissá teszi. Constructor injection előnyösebb: immutable, testable.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Dependency injection**: automatikus függőség feloldás és injektálás
- **Flexibility**: constructor, field, vagy setter injection támogatása
- **Type matching**: type-based autowiring byType strategy-vel
- **Optional dependencies**: @Autowired(required=false) optional injection-höz

</div>

<div class="runnable-model">

**Runnable mental model**
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
*Figyeld meg: constructor injection biztosítja a kötelező függőségeket és immutable objektumokat tesz lehetővé, ezért ez az ajánlott gyakorlat.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- *"@Autowired mindig kell constructor injection-höz"* → Spring 4.3+ óta implicit constructor injection
- *"Field injection gyorsabb"* → Constructor injection ugyanolyan gyors és biztonságosabb
- *"@Autowired mindig található bean-t"* → NoSuchBeanDefinitionException ha nincs megfelelő bean

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) Miért jobb constructor injection field injection-nél?
<details><summary>Válasz mutatása</summary>
Immutable objects, better testability, explicit dependencies, fail-fast.
</details>

2) Hogyan oldod fel az ambiguous bean injection-t?
<details><summary>Válasz mutatása</summary>
@Qualifier, @Primary, vagy type-specific injection.
</details>

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Dependency injection típusok közötti különbségek és trade-off-ok
- Circular dependency detection és megoldási módok
- @Qualifier és @Primary használat multiple beans esetén

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Dependency Injection` · `Constructor Injection` · `IoC Container` · `Bean Wiring` · `Type Resolution`

</div>

### @RestController {#restcontroller}

<div class="concept-section mental-model">

📋 **Fogalom meghatározása**  
*A @RestController egy Spring MVC annotáció, amely kombinálja a @Controller és @ResponseBody-t. Minden metódus visszatérési értéke automatikusan serializálódik (JSON/XML) a HTTP response body-ba HttpMessageConverter-rel. RESTful web service-ek endpoint-jainak definiálására szolgál, @RequestMapping metódusokkal (@GetMapping, @PostMapping, stb.).*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **REST API development**: egyszerűsített JSON/XML API endpoint létrehozás
- **Automatic serialization**: ResponseEntity és @ResponseBody automatikus JSON konverzió
- **HTTP method mapping**: @GetMapping, @PostMapping, stb. clean URL mapping
- **Exception handling**: @ExceptionHandler és @ControllerAdvice integrált hibakezelés

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
*Figyeld meg: a `@RestController` automatikusan JSON/XML formátumban serialize-álja a válaszokat és kezeli a HTTP kéréseket.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- *"@RestController-ben kell @ResponseBody"* → @RestController automatikusan tartalmazza
- *"ResponseEntity mindig kötelező"* → Direct object return is működik
- *"@Controller és @RestController ugyanaz"* → @RestController JSON API-hoz, @Controller view-rendering-hez

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) @Controller vs @RestController különbség?
<details><summary>Válasz mutatása</summary>
@Controller: view rendering. @RestController: JSON/XML API, includes @ResponseBody.
</details>

2) Mikor használj ResponseEntity vs direct return?
<details><summary>Válasz mutatása</summary>
ResponseEntity: HTTP status control needed. Direct return: simple cases.
</details>

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- HTTP status codes és RESTful API design principles
- Content negotiation és message converters működése
- Exception handling strategies global vs local level

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`REST API` · `HTTP Methods` · `JSON Serialization` · `Exception Handling` · `Content Negotiation`

</div>

### Profilok {#profilok}

<div class="concept-section mental-model">

📋 **Fogalom meghatározása**  
*A Profilok (Profiles) Spring környezet-specifikus konfiguráció és bean activation mechanizmus. @Profile annotációval bean-ek vagy configuration class-ok aktiválhatók adott környezetben (dev, test, prod). spring.profiles.active property-vel vagy környezeti változóval állítható. Több profil kombinálható. Profile-specific configuration file-ok: application-{profile}.yml. Conditional bean loading és feature toggling lehetővé tétele.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Environment separation**: különböző környezetek (dev, test, prod) eltérő konfigurációja
- **Conditional bean loading**: környezetfüggő Bean regisztráció és aktiválás
- **Configuration management**: egy codebase, több deployment konfiguráció
- **Feature toggling**: fejlesztés közbeni feature-ök ki/bekapcsolása

</div>

<div class="runnable-model">

**Runnable mental model**
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
*Figyeld meg: a profilok lehetővé teszik különböző környezetek (fejlesztői, teszt, éles) specifikus konfigurációját anélkül, hogy a kódot módosítani kellene.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- *"Profile-ok csak Spring Boot-ban működnek"* → Core Spring is támogatja
- *"Egyszerre csak egy profile lehet aktív"* → Több profile is kombinálható
- *"@Profile csak class level-en használható"* → Method level @Bean-eknél is működik

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) Hogyan aktiválsz több profile-t egyszerre?
<details><summary>Válasz mutatása</summary>
spring.profiles.active=dev,mysql vagy programmatically: SpringApplication.setAdditionalProfiles().
</details>

2) Mi a különbség @Profile("dev") és @Profile("!dev") között?
<details><summary>Válasz mutatása</summary>
@Profile("dev"): csak dev profile-ban aktív. @Profile("!dev"): minden profile-ban, kivéve dev.
</details>

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Profile precedence és override mechanizmus működése
- Environment variables vs application.properties priority
- Profile-specific configuration file naming conventions

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Environment Configuration` · `Conditional Beans` · `Feature Toggling` · `Deployment Strategies` · `Configuration Management`

</div>

### RestTemplate / WebClient {#resttemplate-webclient}

<div class="concept-section mental-model">

📋 **Fogalom meghatározása**  
*RestTemplate szinkron HTTP kliens Spring-ben (maintenance mode óta 2020), WebClient reaktív, non-blocking HTTP kliens (ajánlott új projektekhez). RestTemplate: blokkoló I/O, thread-per-request model. WebClient: Project Reactor alapú, reactive streams, backpressure support, high concurrency. Mindkettő támogatja message converters-t (JSON, XML), error handling-et, és interceptor-okat. WebClient használható blocking módon is .block()-kal.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **External API integration**: REST API-k hívása más szolgáltatásokból
- **HTTP client abstraction**: egyszerűsített HTTP request/response kezelés
- **Error handling**: robust exception handling és retry mechanizmus
- **Performance**: WebClient non-blocking I/O nagyobb throughput-hoz

</div>

<div class="runnable-model">

**Runnable mental model**
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
*Figyeld meg: RestTemplate blokkoló, egyszerű használatú. WebClient non-blocking, reactive programozáshoz ajánlott új projektekhez.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- *"RestTemplate deprecated"* → Maintenance mode-ban, de még használható
- *"WebClient mindig jobb"* → Egyszerű sync use case-ekhez RestTemplate is megfelelő
- *"WebClient csak reactive app-ekben használható"* → Block() method-dal sync módon is használható

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) Mikor válaszd RestTemplate helyett WebClient-et?
<details><summary>Válasz mutatása</summary>
High concurrency, reactive stack, non-blocking I/O, modern Spring apps.
</details>

2) Hogyan kezeld a timeout-okat WebClient-ben?
<details><summary>Válasz mutatása</summary>
.timeout(Duration) method vagy HttpClient level configuration.
</details>

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Blocking vs non-blocking I/O performance karakterisztikák
- Error handling strategies external API calls-ban
- Circuit breaker pattern implementáció REST clients-ben

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`HTTP Client` · `External API` · `Reactive Programming` · `Non-blocking I/O` · `Circuit Breaker`

</div>

### Validation {#validation}

<div class="concept-section mental-model">

📋 **Fogalom meghatározása**  
*A Validation Spring-ben JSR-303/380 (Bean Validation) specifikáció implementációja, amely declarative constraint annotation-ökkel (@NotNull, @Size, @Email, @Valid, stb.) automatikus input validációt biztosít. @Valid trigger-eli validation-t controller method parameter-eken, MethodArgumentNotValidException thrown invalid data esetén. Custom validator ConstraintValidator interface-szel. Validation groups-al conditional validation.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Input validation**: automatikus adatvalidáció REST endpoint-okban és service rétegben
- **Annotation-driven**: declarative validation rules közvetlenül a data model-ben
- **Error handling**: strukturált validation error response-ok
- **Custom validation**: saját validation logic implementálása

</div>

<div class="runnable-model">

**Runnable mental model**
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
*Figyeld meg: a Spring automatikusan validálja a `@Valid` annotált objektumokat és `MethodArgumentNotValidException`-t dob hibás adatok esetén.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- *"@Valid csak @RequestBody-nál működik"* → @PathVariable, @RequestParam, method parameters-nél is
- *"Validation csak controller layer-ben"* → Service method-okra is alkalmazható @Validated-del
- *"Custom validation bonyolult"* → ConstraintValidator interface egyszerű implementálás

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) @Valid vs @Validated különbség?
<details><summary>Válasz mutatása</summary>
@Valid: JSR-303 standard, nested validation. @Validated: Spring extension, group validation.
</details>

2) Hogyan validálsz nested objektumokat?
<details><summary>Válasz mutatása</summary>
@Valid annotation nested objektum field-jén.
</details>

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Validation groups és conditional validation use cases
- Custom validator implementation patterns
- Performance implications large object validation-nél

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Data Validation` · `JSR-303` · `Bean Validation` · `Error Handling` · `Input Sanitization`

</div>

### Spring Data JPA {#spring-data-jpa}

<div class="concept-section mental-model">

📋 **Fogalom meghatározása**  
*A Spring Data JPA egy repository abstraction layer a JPA felett, amely automatikusan implementálja CRUD és query method-okat interface definíciók alapján. Method name parsing-el (findBy, countBy, deleteBy) generál query-ket, @Query annotációval custom JPQL/SQL, Pageable/Sort támogatással. JpaRepository extends CrudRepository és PagingAndSortingRepository. Query derivation mechanism és projection support.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Automatic implementation**: repository interface-ek automatikus implementációja
- **Query methods**: method név alapján automatikus query generálás
- **Custom queries**: @Query annotációval custom JPQL/SQL support
- **Pagination support**: built-in pagination és sorting funkciók

</div>

<div class="runnable-model">

**Runnable mental model**
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
*Figyeld meg: Spring Data JPA automatikusan generálja a repository implementációt a metódusnevek alapján, és támogatja a custom query-ket is.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- *"Spring Data JPA helyettesíti a JPA-t"* → Spring Data JPA a JPA-ra épül, nem helyettesíti
- *"Query methods mindig hatékonyak"* → Complex queries-nél custom @Query lehet jobb
- *"@Repository annotation szükséges interface-nél"* → Spring Data automatikusan regisztrálja

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) findBy vs getBy különbség Spring Data-ban?
<details><summary>Válasz mutatása</summary>
Nincs funkcionális különbség, mindkettő ugyanúgy működik.
</details>

2) Mikor használj @Query custom query-t?
<details><summary>Válasz mutatása</summary>
Complex joins, performance optimization, native SQL szükséges.
</details>

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Query method naming conventions és Spring Data működése
- N+1 problem és lazy loading JPA-ban
- Custom repository implementation módszerek

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`JPA` · `Repository Pattern` · `Query Generation` · `Database Access` · `ORM`

</div>

### Transaction (@Transactional) {#transactional}

<div class="concept-section mental-model">

📋 **Fogalom meghatározása**  
*A @Transactional Spring annotáció deklaratív tranzakciókezelésre, amely ACID tulajdonságokat biztosít AOP proxy-n keresztül. Configurable: propagation (REQUIRED, REQUIRES_NEW, NESTED), isolation level (READ_COMMITTED, REPEATABLE_READ), timeout, readOnly, rollbackFor. Default: rollback unchecked exception-öknél, commit checked exception-öknél. PlatformTransactionManager orchestrates transaction boundaries. Self-invocation nem működik proxy miatt.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **ACID compliance**: automatikus transaction boundary management
- **Declarative approach**: annotation-based transaction kezelés AOP-val
- **Rollback handling**: automatic rollback unchecked exception-öknél
- **Isolation levels**: configurable isolation és propagation szintek

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
*Figyeld meg: a `@Transactional` automatikus rollback-et biztosít unchecked exception-öknél és konfigurálható izolációs szinteket és timeout-ot támogat.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- *"@Transactional checked exception-öknél is rollback-el"* → Csak unchecked exceptions-nél default
- *"Transaction mindig új connection-t nyit"* → Propagation REQUIRED újrahasznosítja meglévőt
- *"@Transactional private method-oknál működik"* → Csak public method-oknál AOP proxy miatt

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) Mi a különbség REQUIRED vs REQUIRES_NEW propagation között?
<details><summary>Válasz mutatása</summary>
REQUIRED: join existing transaction. REQUIRES_NEW: always start new transaction.
</details>

2) Mikor használj readOnly=true annotációt?
<details><summary>Válasz mutatása</summary>
Query operations, optimization hint for database, flush mode optimization.
</details>

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Transaction propagation types és use case-ek
- Rollback rules és exception handling strategies
- Performance implications különböző isolation level-eknél

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`ACID Properties` · `AOP Proxy` · `Transaction Propagation` · `Isolation Levels` · `Database Management`

</div>

### Actuator {#actuator}

<div class="concept-section mental-model">

📋 **Fogalom meghatározása**  
*Az Actuator Spring Boot production-ready monitoring és management endpoint-okat biztosít: /health (application health check), /metrics (Micrometer metrics), /info (application információk), /env (environment properties), /loggers (dynamic log level change). Customizable health indicators HealthIndicator interface-szel. Prometheus, Grafana integration. Security-ével védendő sensitive endpoint-ok. Management port külön konfigurálható.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Production monitoring**: health checks, metrics, és application info endpoint-ok
- **Operational insights**: memory usage, thread dumps, environment properties
- **Management endpoints**: graceful shutdown, configuration refresh, logging level changes
- **Integration ready**: Prometheus, Grafana, és egyéb monitoring tools támogatás

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
*Figyeld meg: az Actuator production monitoring eszközöket biztosít, mint health check-ek, metrics, environment info.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- *"Actuator csak development-hez való"* → Production monitoring-hoz elengedhetetlen
- *"Minden endpoint nyitva kell legyen"* → Security szempontból csak szükséges endpoint-ok
- *"Actuator lassítja az alkalmazást"* → Minimális performance impact

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) Milyen beépített endpoint-ok érhetők el?
<details><summary>Válasz mutatása</summary>
/health, /metrics, /info, /env, /configprops, /mappings, /threaddump, /heapdump.
</details>

2) Hogyan készíts custom health indicator-t?
<details><summary>Válasz mutatása</summary>
HealthIndicator interface implementálása Health.up()/down() return-nel.
</details>

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Security implications Actuator endpoint exposure-nél
- Custom metrics implementation Micrometer-rel
- Production monitoring strategy és alerting setup

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Production Monitoring` · `Health Checks` · `Application Metrics` · `DevOps` · `Observability`

</div>

### Spring Security {#spring-security}

📋 **Fogalom meghatározása**  
**Comprehensive security framework** authentication/authorization-höz: **SecurityFilterChain** (request interceptors), **UserDetailsService** (user loading), **PasswordEncoder** (BCrypt/Argon2), **@PreAuthorize/@Secured** (method-level authorization). Architecture: filter chain (UsernamePasswordAuthenticationFilter, JwtAuthenticationFilter, OAuth2LoginAuthenticationFilter). Features: **JWT token validation**, **OAuth2** (client/resource server), **CSRF protection**, **session management**, **Remember-Me**. Access control: role-based (ROLE_ADMIN) és permission-based (@PreAuthorize("hasAuthority('DELETE')")). Integration: seamless Spring ecosystem (MVC, WebFlux).

💡 **Miért számít?**
- **Authentication**: felhasználói azonosítás különböző módszerekkel (form, JWT, OAuth2)
- **Authorization**: finomhangolt hozzáférés-vezérlés szerepkörök és jogosultságok alapján
- **Protection**: automatikus védelem CSRF, XSS, session fixation támadások ellen
- **Integration**: seamless integráció Spring ökoszisztémával

**Példa:**
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
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/users/**").hasAnyRole("USER", "ADMIN")
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                .defaultSuccessUrl("/dashboard")
                .permitAll()
            )
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login?logout")
                .invalidateHttpSession(true)
            )
            .csrf(csrf -> csrf.disable()) // REST API esetén
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // JWT esetén
            );
        
        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            // Database lookup simulation
            User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            
            return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword()) // Already encoded
                .authorities(user.getRoles().stream()
                    .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getName()))
                    .collect(Collectors.toList()))
                .build();
        };
    }
}
```
*Figyeld meg: Spring Security automatikusan kezeli a session management-et, CSRF protection-t és password encoding-ot.*

🧯 **Gyakori tévhitek**
<details><summary>Megmutatás</summary>

- *"Spring Security túl bonyolult kis projektekhez"* → Modern konfigurációval 10-15 sor elegendő alapvédelemhez
- *"CSRF protection mindig szükséges"* → REST API-knál általában kikapcsolható, SPA-knál custom megoldás kell
- *"Roles és authorities ugyanaz"* → Role prefix-szel rendelkező authority (ROLE_ADMIN vs ADMIN)

</details>

🧰 **Kapcsolódó API-k**
`@PreAuthorize`, `@PostAuthorize`, `@Secured`, `@EnableGlobalMethodSecurity`, `SecurityContextHolder`

🎧 **Mikrotanulási promptok**
<details><summary>1) Mikor használj @PreAuthorize vs @Secured?</summary>
@PreAuthorize SpEL kifejezéseket támogat, komplexebb logikához. @Secured egyszerűbb, csak role-ok.
</details>
<details><summary>2) Mi a különbség authentication és authorization között?</summary>
Authentication: "Ki vagy?" (login). Authorization: "Mit csinálhatsz?" (permissions).
</details>

⚠️ **Hol buksz el interjún**
- SecurityFilterChain működési sorrendje és custom filter hozzáadása
- JWT token validáció és refresh token kezelés
- Method-level security vs URL-based security use case-ek

🗺️ **Kapcsolati térkép**  
`Authentication` · `Authorization` · `JWT` · `CSRF Protection` · `Password Encoding` · `Method Security`

### Spring AOP {#spring-aop}

📋 **Fogalom meghatározása**  
**Aspect-Oriented Programming** framework cross-cutting concerns-höz: **@Aspect** (advice container), **@Pointcut** (target selection expressions), **Advice types** (@Before, @After, @Around, @AfterReturning, @AfterThrowing). **JoinPoint** (execution metadata), **ProceedingJoinPoint** (proceed() method control). Proxy-based: **JDK dynamic proxy** (interface-based) vagy **CGLIB** (class-based). Use cases: **@Transactional** (transaction management), **@Cacheable** (caching), **@Async** (async execution), logging, security, auditing. Separation of concerns: business logic vs infrastructural code. Weaving: runtime proxy creation.

💡 **Miért számít?**
- **Separation of concerns**: üzleti logika és infrastrukturális kód szétválasztása
- **Code reuse**: közös funkciók (audit, transaction, caching) újrafelhasználása
- **Maintainability**: cross-cutting concerns központi helyen kezelhetők
- **Clean code**: business logic nem keveredik technical aspect-ekkel

**Példa:**
```java
@Aspect
@Component
public class AuditAspect {
    private static final Logger logger = LoggerFactory.getLogger(AuditAspect.class);

    // Pointcut expression - where to apply
    @Pointcut("@annotation(Auditable) || execution(* com.example.service.*.*(..))")
    public void auditableOperations() {}

    @Before("auditableOperations()")
    public void logMethodEntry(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        logger.info("Entering method: {} with arguments: {}", methodName, args);
    }

    @Around("auditableOperations()")
    public Object logExecutionTime(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        String methodName = proceedingJoinPoint.getSignature().getName();
        
        try {
            Object result = proceedingJoinPoint.proceed(); // Execute actual method
            long executionTime = System.currentTimeMillis() - startTime;
            logger.info("Method {} executed in {}ms", methodName, executionTime);
            return result;
        } catch (Exception e) {
            logger.error("Method {} failed after {}ms: {}", 
                methodName, System.currentTimeMillis() - startTime, e.getMessage());
            throw e;
        }
    }

    @AfterReturning(pointcut = "auditableOperations()", returning = "result")
    public void logMethodReturn(JoinPoint joinPoint, Object result) {
        logger.info("Method {} returned: {}", joinPoint.getSignature().getName(), result);
    }
}

// Usage with custom annotation
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Auditable {
    String value() default "";
}

@Service
public class UserService {
    @Auditable("User creation")
    public User createUser(String name, String email) {
        return new User(name, email);
    }
}
```
*Figyeld meg: AOP aspektusok "körbefonják" a metódusokat anélkül, hogy az eredeti kódot módosítanánk.*

🧯 **Gyakori tévhitek**
<details><summary>Megmutatás</summary>

- *"AOP lassítja az alkalmazást"* → Modern proxy-k minimális overhead-del rendelkeznek
- *"Csak @Transactional használ AOP-t"* → Caching, Security, Retry, stb. mind AOP-alapú
- *"AspectJ és Spring AOP ugyanaz"* → Spring AOP egyszerűbb, runtime proxy-k; AspectJ compile-time weaving

</details>

🚀 **Performance corner**
- Spring AOP proxy-overhead általában <1ms
- CGLIB proxy vs JDK dynamic proxy teljesítménykülönbség elhanyagolható
- Pointcut expression-ök optimalizálása nagyobb alkalmazásokban fontos

🧰 **Kapcsolódó API-k**
`@Before`, `@After`, `@AfterReturning`, `@AfterThrowing`, `@Pointcut`, `ProceedingJoinPoint`

🎧 **Mikrotanulási promptok**
<details><summary>1) Mikor használj @Around vs @Before + @After?</summary>
@Around teljes kontroll a metódus végrehajtás felett, exception handling, conditional execution.
</details>
<details><summary>2) Mi a JoinPoint vs ProceedingJoinPoint?</summary>
JoinPoint read-only info. ProceedingJoinPoint proceed() metódussal, csak @Around-ban.
</details>

⚠️ **Hol buksz el interjún**
- Pointcut expression syntax és performance implications
- Proxy típusok (JDK vs CGLIB) és limitációik
- Self-invocation problem és megoldási módjai

🗺️ **Kapcsolati térkép**  
`Cross-cutting Concerns` · `Proxy Pattern` · `Pointcuts` · `Weaving` · `Separation of Concerns`

### Caching {#caching}

📋 **Fogalom meghatározása**  
**Cache abstraction layer** provider-agnostic API-val: **@EnableCaching** (activation), **@Cacheable** (cache-or-execute), **@CachePut** (always execute + update cache), **@CacheEvict** (invalidation). **CacheManager** implementations: Redis, Caffeine, EhCache, Hazelcast. **Key generation**: default (method params) vagy custom KeyGenerator. **Conditional caching**: SpEL expressions (#result, #root, condition). **Cache hit**: method skipped, **miss**: executed + cached. **Eviction strategies**: TTL (time-to-live), LRU (least recently used), size-based limits. Performance: reduces DB/API calls, scales backend.

💡 **Miért számít?**
- **Performance**: drága műveletek (DB query, API call) eredményének tárolása
- **Scalability**: cache hit-ek csökkentik backend terhelést
- **Abstraction**: provider-független cache API (Redis, EhCache, Caffeine)
- **Declarative**: annotáció-alapú, minimális kód módosítás

**Példa:**
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
}

@Service
public class UserService {
    private final UserRepository userRepository;

    @Cacheable(value = "users", key = "#id")
    public User findById(Long id) {
        System.out.println("Fetching user from database: " + id);
        return userRepository.findById(id).orElse(null);
    }

    @Cacheable(value = "usersByEmail", key = "#email", condition = "#email.length() > 5")
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    @CacheEvict(value = "users", key = "#user.id")
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @CacheEvict(value = {"users", "usersByEmail"}, allEntries = true)
    public void clearAllCaches() {
        System.out.println("All user caches cleared");
    }

    @CachePut(value = "users", key = "#result.id")
    public User createUser(String name, String email) {
        User user = new User(name, email);
        return userRepository.save(user);
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
```
*Figyeld meg: cache annotációk automatikusan kezelik a cache hit/miss logikát és kulcs generálást.*

🧯 **Gyakori tévhitek**
<details><summary>Megmutatás</summary>

- *"Cache mindig gyorsítja az alkalmazást"* → Kis objektumok vagy gyors DB-k esetén overhead lehet
- *"@Cacheable mindig cache-el"* → Self-invocation (belső metódushívás) nem működik
- *"Redis mindig jobb mint in-memory cache"* → Local cache gyorsabb, de nem skálázható

</details>

🚀 **Performance corner**
- In-memory cache (Caffeine): ~1-10 nanosecond lookup
- Redis cache: ~0.1-1 millisecond network overhead
- Cache hit ratio monitoring fontos: 90%+ optimális

🧰 **Kapcsolódó API-k**
`@CachePut`, `@Caching`, `CacheManager`, `Cache`, `@CacheConfig`, `KeyGenerator`

🎧 **Mikrotanulási promptok**
<details><summary>1) @Cacheable vs @CachePut különbség?</summary>
@Cacheable: ha nincs cache-ben, végrehajtja és cache-eli. @CachePut: mindig végrehajtja és frissíti cache-t.
</details>
<details><summary>2) Mikor használj Redis vs local cache-t?</summary>
Redis: distributed environment, shared cache. Local: single instance, gyorsabb access.
</details>

⚠️ **Hol buksz el interjún**
- Cache eviction strategies (LRU, LFU, TTL) és trade-off-ok
- Distributed caching challenges (invalidation, consistency)
- Cache stampede problem és megoldási módok

🗺️ **Kapcsolati térkép**  
`Performance Optimization` · `In-Memory Storage` · `Distributed Systems` · `TTL` · `Cache Strategies`

### Event Handling {#event-handling}

📋 **Fogalom meghatározása**  
**Event-driven communication** ApplicationContext szinten: **ApplicationEventPublisher** (event publishing), **@EventListener** vagy **ApplicationListener** interface (consumption). **ApplicationEvent** (legacy base class) vagy **POJO events** (Spring 4.2+). **@Async** (asynchronous processing), **@TransactionalEventListener** (transaction phases: BEFORE_COMMIT, AFTER_COMMIT, AFTER_ROLLBACK, AFTER_COMPLETION). **@Order** (listener ordering), **conditional filtering** (SpEL). Benefits: **decoupling** (loose coupling), **extensibility** (add features without modifying existing code), **audit trail** (event logging). Observer pattern implementation.

💡 **Miért számít?**
- **Decoupling**: szolgáltatások között laza kapcsolat event-ek segítségével
- **Scalability**: asynchron feldolgozással nem blokkolunk fő folyamatokat
- **Extensibility**: új funkciók hozzáadása anélkül, hogy módosítanánk meglévő kódot
- **Audit trail**: automatikus eseménynapló és monitoring lehetőségek

**Példa:**
```java
// Custom event
public class UserRegisteredEvent extends ApplicationEvent {
    private final User user;
    private final LocalDateTime timestamp;

    public UserRegisteredEvent(Object source, User user) {
        super(source);
        this.user = user;
        this.timestamp = LocalDateTime.now();
    }

    public User getUser() { return user; }
    public LocalDateTime getTimestamp() { return timestamp; }
}

// Event publisher
@Service
public class UserService {
    private final ApplicationEventPublisher eventPublisher;
    private final UserRepository userRepository;

    public UserService(ApplicationEventPublisher eventPublisher, UserRepository userRepository) {
        this.eventPublisher = eventPublisher;
        this.userRepository = userRepository;
    }

    public User registerUser(String name, String email) {
        User user = new User(name, email);
        user = userRepository.save(user);
        
        // Publish event after successful registration
        eventPublisher.publishEvent(new UserRegisteredEvent(this, user));
        
        return user;
    }
}

// Event listeners
@Component
public class UserEventHandlers {

    @EventListener
    public void handleUserRegistered(UserRegisteredEvent event) {
        User user = event.getUser();
        System.out.println("User registered: " + user.getName() + " at " + event.getTimestamp());
    }

    @EventListener
    @Async // Asynchronous processing
    public void sendWelcomeEmail(UserRegisteredEvent event) {
        User user = event.getUser();
        try {
            Thread.sleep(2000); // Simulate email sending
            System.out.println("Welcome email sent to: " + user.getEmail());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    @EventListener
    @Conditional("#{event.user.email.endsWith('@company.com')}")
    public void addToCompanyGroup(UserRegisteredEvent event) {
        System.out.println("Adding company user to internal group: " + event.getUser().getName());
    }
}

// Async configuration
@Configuration
@EnableAsync
public class AsyncConfig {
    @Bean
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(10);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("async-event-");
        executor.initialize();
        return executor;
    }
}
```
*Figyeld meg: event-based architektúra automatikusan szétbontja a funkciókat és lehetővé teszi az aszinkron feldolgozást.*

🧯 **Gyakori tévhitek**
<details><summary>Megmutatás</summary>

- *"Event-ek mindig aszinkronok"* → Default szinkron, @Async kell az aszinkron feldolgozáshoz
- *"ApplicationEvent szükséges"* → Plain objektumok is használhatók event-ként Spring 4.2+
- *"Event listener hibája megállítja az egész folyamatot"* → Szinkron esetben igen, async-nál nem

</details>

🚀 **Performance corner**
- Synchronous events: same thread, <1ms overhead
- Asynchronous events: ThreadPoolTaskExecutor, 1-10ms scheduling
- Event ordering nem garantált async environment-ben

🧰 **Kapcsolódó API-k**
`@TransactionalEventListener`, `@Order`, `ApplicationListener`, `EventPublicationInterceptor`

🎧 **Mikrotanulási promptok**
<details><summary>1) @EventListener vs @TransactionalEventListener?</summary>
@TransactionalEventListener transaction lifecycle-hoz kötött (after commit, rollback).
</details>
<details><summary>2) Hogyan kezeld az event listener hibákat?</summary>
@Async + proper exception handling, dead letter queue pattern, retry mechanism.
</details>

⚠️ **Hol buksz el interjún**
- Event ordering és consistency guarantees distributed system-ben
- Transaction boundary és event publishing timing
- Event sourcing vs simple application events különbség

🗺️ **Kapcsolati térkép**  
`Decoupling` · `Asynchronous Processing` · `Observer Pattern` · `Domain Events` · `Event Sourcing`

### Spring WebFlux {#spring-webflux}

📋 **Fogalom meghatározása**  
**Reactive non-blocking web framework** Project Reactor-based: **Mono<T>** (0-1 element), **Flux<T>** (0-N elements), **backpressure** (flow control). **WebClient** (reactive HTTP client), **RouterFunction** (functional endpoints), **@RestController** (annotated endpoints). **Event loop threading** (Netty default, Undertow, Tomcat). **Reactive repositories**: R2DBC (relational), Reactive MongoDB. **Operators**: map, flatMap, filter, merge, zip. **Error handling**: onErrorReturn, onErrorResume, onErrorMap. Benefits: **resource efficiency** (high concurrency low threads), **non-blocking I/O**, **composable streams**. Alternative: Spring MVC (traditional blocking).

💡 **Miért számít?**
- **Non-blocking I/O**: egyetlen thread több ezer concurrent request kezelésére képes
- **Resource efficiency**: alacsony memory és thread használat magas terhelés alatt
- **Backpressure**: automatikus flow control túl gyors producers ellen
- **Functional style**: declarative programming és kompozíciós lehetőségek

**Példa:**
```java
@RestController
@RequestMapping("/api/reactive")
public class ReactiveUserController {
    private final ReactiveUserService userService;

    public ReactiveUserController(ReactiveUserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users/{id}")
    public Mono<ResponseEntity<User>> getUser(@PathVariable String id) {
        return userService.findById(id)
            .map(user -> ResponseEntity.ok(user))
            .defaultIfEmpty(ResponseEntity.notFound().build())
            .onErrorReturn(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }

    @GetMapping("/users")
    public Flux<User> getAllUsers() {
        return userService.findAll()
            .delayElements(Duration.ofMillis(100)) // Simulate processing delay
            .onBackpressureBuffer(1000);
    }

    @PostMapping("/users")
    public Mono<User> createUser(@RequestBody Mono<User> userMono) {
        return userMono
            .flatMap(user -> userService.validateUser(user)
                .then(userService.save(user)))
            .onErrorMap(ValidationException.class, 
                ex -> new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage()));
    }

    @GetMapping(value = "/users/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<User>> streamUsers() {
        return userService.findAll()
            .map(user -> ServerSentEvent.builder(user)
                .id(user.getId().toString())
                .event("user-data")
                .build())
            .delayElements(Duration.ofSeconds(1));
    }
}

@Service
public class ReactiveUserService {
    private final ReactiveUserRepository userRepository;
    private final WebClient webClient;

    public ReactiveUserService(ReactiveUserRepository userRepository, WebClient.Builder webClientBuilder) {
        this.userRepository = userRepository;
        this.webClient = webClientBuilder.baseUrl("https://api.external.com").build();
    }

    public Mono<User> findById(String id) {
        return userRepository.findById(id)
            .switchIfEmpty(Mono.error(new UserNotFoundException("User not found: " + id)));
    }

    public Flux<User> findAll() {
        return userRepository.findAll()
            .filter(user -> user.isActive())
            .take(100); // Limit results
    }

    public Mono<User> save(User user) {
        return userRepository.save(user)
            .flatMap(savedUser -> 
                // Async external API call
                webClient.post()
                    .uri("/notify")
                    .bodyValue(savedUser)
                    .retrieve()
                    .bodyToMono(String.class)
                    .then(Mono.just(savedUser))
            );
    }

    public Mono<Void> validateUser(User user) {
        return Mono.fromCallable(() -> {
            if (user.getEmail() == null || !user.getEmail().contains("@")) {
                throw new ValidationException("Invalid email");
            }
            return user;
        }).then();
    }
}
```
*Figyeld meg: reactive programming non-blocking operations chain-elésével minimális resource felhasználást és magas throughput-ot tesz lehetővé.*

🧯 **Gyakori tévhitek**
<details><summary>Megmutatás</summary>

- *"WebFlux mindig gyorsabb mint MVC"* → Kis alkalmazásoknál MVC egyszerűbb és elegendő
- *"Reactive = asynchronous"* → Reactive többet jelent: non-blocking, backpressure, composition
- *"Minden legacy kódot át kell írni"* → Fokozatos migráció lehetséges, hibrid megközelítés

</details>

🚀 **Performance corner**
- WebFlux: 1 thread per CPU core, 10000+ concurrent connections
- Spring MVC: 1 thread per request, ~200-1000 concurrent requests
- Memory használat: WebFlux ~10x kevesebb nagy concurrent load alatt

🧰 **Kapcsolódó API-k**
`Mono`, `Flux`, `WebClient`, `ServerRequest`, `ServerResponse`, `RouterFunction`

🎧 **Mikrotanulási promptok**
<details><summary>1) Mikor válaszd WebFlux-ot MVC helyett?</summary>
High concurrency, I/O-intensive operations, microservices communication, streaming data.
</details>
<details><summary>2) Mi a backpressure és miért fontos?</summary>
Consumer slower than producer case handling. Automatic flow control, buffer management.
</details>

⚠️ **Hol buksz el interjún**
- Mono vs Flux use cases és performance karakterisztikák
- Blocking operations WebFlux-ban (DB drivers, file I/O)
- Error handling strategies reactive streams-ben

🗺️ **Kapcsolati térkép**  
`Non-blocking I/O` · `Reactive Streams` · `Backpressure` · `Functional Programming` · `Asynchronous`

### Spring Boot Testing {#spring-boot-testing}

📋 **Fogalom meghatározása**  
**Test slice annotations** targeted component testing-hez: **@SpringBootTest** (full context), **@WebMvcTest** (MVC layer only), **@DataJpaTest** (JPA repositories + embedded DB), **@MockBean** (Spring bean mocking), **@SpyBean** (partial mocking). **MockMvc** (HTTP request simulation), **TestRestTemplate** (integration test HTTP client), **WebTestClient** (reactive testing). **Testcontainers** (Docker-based dependencies: PostgreSQL, Redis, Kafka). **@TestConfiguration** (custom test beans), **@DirtiesContext** (context cleanup). Benefits: faster tests (slice loading), realistic integration testing, production-like environment.

💡 **Miért számít?**
- **Test slicing**: csak a szükséges komponensek betöltése gyorsabb tesztekhez
- **Auto-configuration**: teszt környezet automatikus felkonfigurálása
- **Integration testing**: valós alkalmazás környezet teljes pipeline teszteléshez
- **Testcontainers**: dockerized dependencies izolált teszteléshez

**Példa:**
```java
// Unit test with MockMvc
@WebMvcTest(UserController.class)
class UserControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private UserService userService;
    
    @Test
    void shouldReturnUser() throws Exception {
        User user = new User("John", "john@example.com");
        when(userService.findById(1L)).thenReturn(user);
        
        mockMvc.perform(get("/api/users/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("John"))
            .andExpect(jsonPath("$.email").value("john@example.com"));
    }
    
    @Test
    void shouldCreateUser() throws Exception {
        User user = new User("Jane", "jane@example.com");
        when(userService.createUser(any(User.class))).thenReturn(user);
        
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"Jane\",\"email\":\"jane@example.com\"}"))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.name").value("Jane"));
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
        User user = new User("Test User", "test@example.com");
        entityManager.persistAndFlush(user);
        
        Optional<User> found = userRepository.findByEmail("test@example.com");
        
        assertThat(found).isPresent();
        assertThat(found.get().getName()).isEqualTo("Test User");
    }
}

// Integration test with Testcontainers
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
class UserIntegrationTest {
    
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:13")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("test");
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Autowired
    private UserRepository userRepository;
    
    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }
    
    @Test
    void shouldCreateAndRetrieveUser() {
        User user = new User("Integration Test", "integration@test.com");
        
        ResponseEntity<User> response = restTemplate.postForEntity("/api/users", user, User.class);
        
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody().getName()).isEqualTo("Integration Test");
        
        Long userId = response.getBody().getId();
        User savedUser = userRepository.findById(userId).orElse(null);
        assertThat(savedUser).isNotNull();
        assertThat(savedUser.getEmail()).isEqualTo("integration@test.com");
    }
}
```
*Figyeld meg: különböző teszt annotációk különböző application context slice-okat töltenek be, optimalizálva a teszt futási időt.*

🧯 **Gyakori tévhitek**
<details><summary>Megmutatás</summary>

- *"@SpringBootTest minden teszthez szükséges"* → Test slicing (@WebMvcTest, @DataJpaTest) gyakran elegendő
- *"Testcontainers lassú"* → Egyszer induló container sok teszthez újrahasználható
- *"Integration tesztek helyettesítik a unit teszteket"* → Mindkettő szükséges: gyors feedback + real environment

</details>

🚀 **Performance corner**
- @WebMvcTest: ~1-2 sec startup vs @SpringBootTest ~5-10 sec
- Testcontainers: container reuse 10x gyorsabb mint minden teszthez új container
- @MockBean clearing mellem tesztek: +500ms overhead teszt-enként

🧰 **Kapcsolódó API-k**
`@TestConfiguration`, `@TestPropertySource`, `@Sql`, `@Transactional`, `@Rollback`, `WireMock`

🎧 **Mikrotanulási promptok**
<details><summary>1) Mikor használj @MockBean vs @Mock?</summary>
@MockBean Spring context-ben replace bean-t. @Mock pure Mockito, Spring nélkül.
</details>
<details><summary>2) @DataJpaTest vs @JdbcTest különbség?</summary>
@DataJpaTest JPA repositories + TestEntityManager. @JdbcTest csak JdbcTemplate + basic DB.
</details>

⚠️ **Hol buksz el interjún**
- Test slicing strategies és performance trade-off-ok
- Testcontainers lifecycle management és resource optimization
- Mocking vs real dependencies döntési kritériumok

🗺️ **Kapcsolati térkép**  
`Test Automation` · `Integration Testing` · `Mocking` · `Test Containers` · `TDD` · `CI/CD`

### Custom Auto-Configuration {#custom-auto-configuration}

📋 **Fogalom meghatározása**  
**Spring Boot extensibility mechanism** custom starter-ek készítéséhez: **@Configuration** class **@Conditional** annotations-kel (@ConditionalOnClass, @ConditionalOnMissingBean, @ConditionalOnProperty, @ConditionalOnBean). **Registration**: META-INF/spring.factories (legacy) vagy META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports (Spring Boot 2.7+). **@EnableConfigurationProperties** (type-safe properties), **@AutoConfigureBefore/@AutoConfigureAfter** (ordering). **Convention over configuration**: sensible defaults. Use case: reusable library configuration, custom starter modules, framework extensions.

💡 **Miért számít?**
- **Convention over configuration**: sensible defaults automatikus beállítása
- **Conditional loading**: csak meglévő dependencies alapján aktiválódó konfigurációk
- **Starter creation**: reusable configuration packages saját library-khez
- **Extensibility**: Spring Boot ecosystem bővíthetősége custom komponensekkel

**Példa:**
```java
// Auto-configuration class
@Configuration
@ConditionalOnClass({DataSource.class, JdbcTemplate.class})
@ConditionalOnMissingBean(JdbcTemplate.class)
@EnableConfigurationProperties(DatabaseProperties.class)
public class DatabaseAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }

    @Bean
    @ConditionalOnProperty(name = "app.database.migration.enabled", havingValue = "true")
    public FlywayMigrationRunner migrationRunner(DataSource dataSource) {
        return new FlywayMigrationRunner(dataSource);
    }

    @Configuration
    @ConditionalOnClass(Redis.class)
    @ConditionalOnProperty(name = "app.cache.provider", havingValue = "redis")
    static class RedisCacheConfiguration {
        
        @Bean
        public RedisCacheManager redisCacheManager(RedisConnectionFactory connectionFactory) {
            return RedisCacheManager.builder(connectionFactory).build();
        }
    }
}

// Configuration properties
@ConfigurationProperties(prefix = "app.database")
public class DatabaseProperties {
    private Migration migration = new Migration();
    private Pool pool = new Pool();

    public static class Migration {
        private boolean enabled = false;
        private String location = "classpath:db/migration";
        
        // getters and setters
    }

    public static class Pool {
        private int maxSize = 10;
        private Duration maxWait = Duration.ofSeconds(30);
        
        // getters and setters
    }
}

// Custom condition
public class OnDatabaseVendorCondition implements Condition {
    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        String vendor = context.getEnvironment().getProperty("spring.datasource.vendor");
        String expectedVendor = (String) metadata.getAnnotationAttributes(
            ConditionalOnDatabaseVendor.class.getName()).get("value");
        
        return expectedVendor.equals(vendor);
    }
}

@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Conditional(OnDatabaseVendorCondition.class)
public @interface ConditionalOnDatabaseVendor {
    String value();
}

// Usage of custom condition
@Configuration
@ConditionalOnDatabaseVendor("postgresql")
public class PostgreSQLConfiguration {
    
    @Bean
    public PostgreSQLDialect postgreSQLDialect() {
        return new PostgreSQLDialect();
    }
}

// spring.factories file (src/main/resources/META-INF/spring.factories)
/*
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
com.example.autoconfigure.DatabaseAutoConfiguration,\
com.example.autoconfigure.CacheAutoConfiguration
*/

// Starter module structure
/*
my-spring-boot-starter/
├── pom.xml
├── src/main/java/
│   └── com/example/starter/
│       ├── MyStarterAutoConfiguration.java
│       └── MyStarterProperties.java
└── src/main/resources/
    └── META-INF/
        └── spring.factories
*/
```
*Figyeld meg: auto-configuration conditional annotations segítségével intelligensen dönt a komponensek betöltéséről a runtime environment alapján.*

🧯 **Gyakori tévhitek**
<details><summary>Megmutatás</summary>

- *"Auto-configuration mindig override-olható"* → @ConditionalOnMissingBean csak akkor, ha nincs felhasználói bean
- *"@ConditionalOnClass runtime-ban ellenőrzi a class-t"* → Compile-time classpath ellenőrzés
- *"Minden auto-configuration automatikusan betöltődik"* → spring.factories-ban kell regisztrálni

</details>

🚀 **Performance corner**
- Condition evaluation order: @ConditionalOnClass leggyorsabb
- Configuration class loading: lazy vs eager evaluation
- Startup time impact: sok condition ~100-500ms overhead

🧰 **Kapcsolódó API-k**
`@ConditionalOnProperty`, `@ConditionalOnBean`, `@ConditionalOnWebApplication`, `@AutoConfigureAfter`, `@AutoConfigureBefore`

🎧 **Mikrotanulási promptok**
<details><summary>1) @ConditionalOnClass vs @ConditionalOnBean?</summary>
@ConditionalOnClass: classpath-ban van-e class. @ConditionalOnBean: Spring context-ben van-e bean.
</details>
<details><summary>2) Hogyan debug-old az auto-configuration-t?</summary>
--debug flag, ConditionEvaluationReport, /actuator/conditions endpoint.
</details>

⚠️ **Hol buksz el interjún**
- Condition evaluation order és performance implications
- Starter module packaging és dependency management
- Configuration properties binding és validation

🗺️ **Kapcsolati térkép**  
`Convention over Configuration` · `Conditional Loading` · `Starter Modules` · `Library Design` · `Classpath Scanning`

### Micrometer & Metrics {#micrometer-metrics}

📋 **Fogalom meghatározása**  
**Vendor-neutral metrics facade** monitoring systems-hez (Prometheus, Grafana, Datadog, New Relic, CloudWatch): **MeterRegistry** (metrics registration), **Metric types**: Counter (monotonic), Gauge (current value), Timer (latency + throughput), DistributionSummary (value distribution). **@Timed/@Counted** (AOP-based auto-instrumentation), **custom metrics** (MeterRegistry API). **Dimensional metrics** (tags), **percentiles** (p50, p95, p99), **histogram buckets**. **Spring Boot Actuator** integration: /actuator/metrics, /actuator/prometheus. Use cases: performance monitoring, SLA tracking, business KPIs, alerting thresholds.

💡 **Miért számít?**
- **Observability**: alkalmazás belső állapotának monitorozása production-ben
- **Performance tuning**: hotspot-ok és bottleneck-ek azonosítása metrikák alapján
- **Alerting**: küszöbérték alapú riasztások automatikus incident detection-höz
- **Business metrics**: technical mellett business KPI-k mérése és tracking

**Példa:**
```java
@Configuration
public class MetricsConfig {

    @Bean
    public TimedAspect timedAspect(MeterRegistry registry) {
        return new TimedAspect(registry);
    }

    @Bean
    public CountedAspect countedAspect(MeterRegistry registry) {
        return new CountedAspect(registry);
    }
}

@Service
public class OrderService {
    private final Counter orderCounter;
    private final Timer orderProcessingTimer;
    private final Gauge activeOrdersGauge;
    private final DistributionSummary orderValueSummary;
    
    private final AtomicInteger activeOrders = new AtomicInteger(0);
    private final OrderRepository orderRepository;

    public OrderService(MeterRegistry meterRegistry, OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
        
        // Counter - monotonic increasing
        this.orderCounter = Counter.builder("orders.created")
            .description("Total number of orders created")
            .tag("service", "order")
            .register(meterRegistry);
            
        // Timer - latency and rate
        this.orderProcessingTimer = Timer.builder("order.processing.time")
            .description("Order processing time")
            .register(meterRegistry);
            
        // Gauge - current value snapshot
        this.activeOrdersGauge = Gauge.builder("orders.active")
            .description("Currently active orders")
            .register(meterRegistry, activeOrders, AtomicInteger::get);
            
        // Distribution Summary - event distribution
        this.orderValueSummary = DistributionSummary.builder("order.value")
            .description("Order value distribution")
            .publishPercentiles(0.5, 0.95, 0.99)
            .register(meterRegistry);
    }

    @Timed(name = "order.creation", description = "Time taken to create order")
    @Counted(name = "order.attempts", description = "Order creation attempts")
    public Order createOrder(OrderRequest request) {
        Timer.Sample sample = Timer.start();
        activeOrders.incrementAndGet();
        
        try {
            // Simulate order processing
            Order order = processOrder(request);
            
            // Record successful order
            orderCounter.increment(
                Tags.of("status", "success", 
                       "payment.method", request.getPaymentMethod())
            );
            
            // Record order value
            orderValueSummary.record(order.getTotalAmount().doubleValue());
            
            return order;
            
        } catch (Exception e) {
            orderCounter.increment(Tags.of("status", "failed", "error", e.getClass().getSimpleName()));
            throw e;
        } finally {
            sample.stop(orderProcessingTimer);
            activeOrders.decrementAndGet();
        }
    }

    @EventListener
    public void onOrderStatusChanged(OrderStatusChangedEvent event) {
        Metrics.counter("order.status.changed",
            "from", event.getOldStatus().name(),
            "to", event.getNewStatus().name()
        ).increment();
    }

    // Custom metrics endpoint
    @GetMapping("/metrics/orders/summary")
    public Map<String, Object> getOrderMetrics() {
        return Map.of(
            "totalOrders", orderCounter.count(),
            "averageProcessingTime", orderProcessingTimer.mean(TimeUnit.MILLISECONDS),
            "activeOrders", activeOrders.get(),
            "orderValueP95", orderValueSummary.percentile(0.95)
        );
    }
    
    private Order processOrder(OrderRequest request) {
        // Business logic
        return new Order(request);
    }
}

// Custom meter binder
@Component
public class DatabaseMetrics implements MeterBinder {

    private final DataSource dataSource;

    public DatabaseMetrics(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void bindTo(MeterRegistry registry) {
        // Connection pool metrics
        if (dataSource instanceof HikariDataSource) {
            HikariDataSource hikari = (HikariDataSource) dataSource;
            
            Gauge.builder("db.connections.active")
                .register(registry, hikari.getHikariPoolMXBean(), 
                         pool -> pool.getActiveConnections());
                         
            Gauge.builder("db.connections.idle")
                .register(registry, hikari.getHikariPoolMXBean(), 
                         pool -> pool.getIdleConnections());
        }
        
        // Custom database health metric
        Gauge.builder("db.health")
            .register(registry, this, DatabaseMetrics::checkDatabaseHealth);
    }
    
    private double checkDatabaseHealth() {
        try (Connection connection = dataSource.getConnection()) {
            return connection.isValid(1) ? 1.0 : 0.0;
        } catch (SQLException e) {
            return 0.0;
        }
    }
}
```
*Figyeld meg: Micrometer vendor-neutral API-t biztosít különböző monitoring rendszerekhez (Prometheus, DataDog, New Relic).*

🧯 **Gyakori tévhitek**
<details><summary>Megmutatás</summary>

- *"Metrics drágák és lassítják az alkalmazást"* → Modern metrics library-k minimális overhead (~microseconds)
- *"Csak infrastructure metrics fontosak"* → Business metrics legalább olyan értékesek
- *"Micrometer csak Spring Boot-tal használható"* → Standalone Java alkalmazásokban is működik

</details>

🚀 **Performance corner**
- Metric collection overhead: <0.1% CPU impact típikusan
- Memory usage: ~10-50MB additional heap moderate metric számmal
- Cardinality explosion elkerülése: limitált tag értékek

🧰 **Kapcsolódó API-k**
`@Timed`, `@Counted`, `MeterRegistry`, `Gauge`, `DistributionSummary`, `LongTaskTimer`

🎧 **Mikrotanulási promptok**
<details><summary>1) Counter vs Gauge vs Timer használat?</summary>
Counter: growing values. Gauge: current state. Timer: duration + rate measurements.
</details>
<details><summary>2) Mi a cardinality explosion és hogyan kerüld el?</summary>
Túl sok unique tag kombináció. Limited tag values, avoid user IDs in tags.
</details>

⚠️ **Hol buksz el interjún**
- Metric types (Counter, Gauge, Timer, Distribution Summary) use cases
- Cardinality problems és memory impact
- Monitoring strategy design (RED vs USE methodology)

🗺️ **Kapcsolati térkép**  
`Observability` · `Performance Monitoring` · `Alerting` · `Grafana` · `Prometheus` · `APM`

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