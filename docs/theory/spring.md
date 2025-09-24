# Spring Framework

## Rövid összefoglaló

A Spring Framework egy átfogó Java-alapú enterprise alkalmazásfejlesztési keretrendszer, amelynek középpontjában a Dependency Injection (DI) és az Aspect-Oriented Programming (AOP) áll. A Spring Boot révén egyszerűsíti a konfigurációt és gyors fejlesztést tesz lehetővé. Modern mikroszolgáltatás architektúrák alapja, REST API-k, adatbázis-kezelés és biztonság terén nyújt komplex megoldásokat. Fő buktatók: túl sok "Spring mágia", memória footprint és a tanulási görbe meredeksége.

## Fogalmak

- **Dependency Injection (DI)** – Objektum függőségek külső forrásból történő bepréselése, nem objektum saját maga hozza létre.
- **Inversion of Control (IoC)** – A vezérlés megfordítása: container irányítja az objektum életciklust, nem az alkalmazás.
- **ApplicationContext** – Spring container, amely kezeli a bean-eket és DI-t biztosítja.
- **Bean** – Spring által menedzselt objektum, amelynek életciklusát a container vezérli.
- **@Component, @Service, @Repository** – Stereotip annotációk bean-ek regisztrálására.
- **@Autowired** – Automatikus dependency injection annotáció, típus alapján köti össze.
- **Spring Boot** – Convention-over-configuration megközelítés, gyors indulás auto-konfigurációval.
- **Spring MVC** – Model-View-Controller pattern implementáció web alkalmazásokhoz.
- **@RestController** – REST API végpontokat definiáló osztály annotáció.
- **Spring Data JPA** – Repository pattern implementáció JPA-val, query metódusok generálása.
- **@Transactional** – Adatbázis tranzakció kezelése deklaratív módon.
- **Spring Security** – Átfogó biztonság: autentikáció, autorizáció, CSRF védelem.

## Interjúkérdések

- **Mi a Dependency Injection és miért hasznos?** — *Objektum függőségeket külső forrásból adjuk meg, loose coupling, könnyebb tesztelés és karbantartás.*

- **Mi a különbség @Component, @Service és @Repository között?** — *Szemantikai különbség, @Component generikus, @Service business logic, @Repository adathozzáférés (plus exception translation).*

- **Hogyan működik a @Autowired?** — *Típus alapján keres bean-t a Spring context-ben, konstruktor/setter/field injection lehetséges.*

- **Mi a Spring Boot auto-configuration?** — *Classpath alapján automatikusan konfigurál bean-eket, @EnableAutoConfiguration révén, felülbírálható.*

- **Mik a Spring bean scope-ok?** — *singleton (default), prototype, request, session, application - meghatározzák az objektum létrehozási stratégiát.*

- **Mi a @Transactional működése?** — *Proxy-based AOP, method szintű tranzakció kezelés, rollback csak runtime exception-re (default).*

- **Hogyan kezeli a Spring a circular dependency-t?** — *Setter injection esetén proxy-kkal megoldja, konstruktor injection esetén BeanCurrentlyInCreationException.*

- **Mi a különbség @RequestMapping és @GetMapping között?** — *@RequestMapping általános (minden HTTP method), @GetMapping csak GET kérésekre.*

- **Hogyan működik a Spring Security authentication?** — *Filter chain, AuthenticationManager, UserDetailsService, SecurityContext tárolás.*

- **Mi a Spring Data JPA repository interface varázslat?** — *Method name parsing (findByFirstName), query generálás runtime-ban proxy segítségével.*

- **Mik a Spring Boot Starter-ek?** — *Pre-configured dependency csomagok, pl. spring-boot-starter-web tartalmazza Tomcat-et, Spring MVC-t.*

- **Hogyan kezeled a environment-specific konfigurációt?** — *application.properties/yml, @Profile annotation, Spring Boot külső konfigurációs hierarchia.*

## Példák

### Példa 1 – Alapvető Dependency Injection

```java
@Service
public class UserService {
    
    private final UserRepository userRepository;
    private final EmailService emailService;
    
    // Constructor injection (recommended)
    public UserService(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }
    
    @Transactional
    public User createUser(CreateUserRequest request) {
        User user = new User(request.getEmail(), request.getName());
        User savedUser = userRepository.save(user);
        
        // Send welcome email
        emailService.sendWelcomeEmail(savedUser.getEmail());
        
        return savedUser;
    }
}

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByEmailContaining(String emailPart);
    
    @Query("SELECT u FROM User u WHERE u.active = true AND u.createdAt > :since")
    List<User> findActiveUsersSince(@Param("since") LocalDateTime since);
}

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    private final UserService userService;
    
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody CreateUserRequest request) {
        User user = userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userService.findById(id)
            .map(user -> ResponseEntity.ok(user))
            .orElse(ResponseEntity.notFound().build());
    }
}
```

### Példa 2 – Gyakori hiba: Circular Dependency

```java
// HIBÁS - Circular dependency constructor injection-nel
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

// MEGOLDÁS 1: Setter injection használata
@Service
public class OrderService {
    private PaymentService paymentService;
    
    @Autowired
    public void setPaymentService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
}

// MEGOLDÁS 2: @Lazy annotation
@Service
public class OrderService {
    private final PaymentService paymentService;
    
    public OrderService(@Lazy PaymentService paymentService) {
        this.paymentService = paymentService;
    }
}

// MEGOLDÁS 3: Refactor - közös service kiemelése
@Service
public class BusinessLogicService {
    // Common logic here
}
```

## Gyakorlati feladat (mini)

1. Hozz létre Spring Boot alkalmazást `@SpringBootApplication`-nel
2. Implementálj `Product` entitást JPA-val és H2 adatbázist
3. Írj `ProductRepository` interface-t Spring Data JPA-val
4. Készíts `ProductController` REST API-t CRUD műveletekhez
5. Adj hozzá validációt `@Valid` és Bean Validation annotációkkal

*Kapcsolódó gyakorlati feladat: [Spring REST API](/exercises/java/02-spring-rest)*

## Kapcsolódó témák

- [Java Alapok](/theory/java) - OOP alapok és Collections
- [Tesztelés](/theory/testing) - Spring Test és @MockBean
- [SQL & Adatbázis](/theory/sql) - JPA mapping és query optimalizálás

## További olvasmányok

- [Spring Framework Documentation](https://spring.io/projects/spring-framework) - Hivatalos dokumentáció
- [Spring Boot Reference Guide](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/) - Boot specifikus guide
- [Baeldung Spring Tutorials](https://www.baeldung.com/spring-tutorial) - Gyakorlati példák
- [Spring in Action](https://www.manning.com/books/spring-in-action-sixth-edition) - Craig Walls könyve
- [Spring Security Reference](https://spring.io/projects/spring-security) - Biztonsági aspektusok