# Spring Framework

## Bevezetés

A Spring Framework egy átfogó programozási és konfigurációs modell modern Java-alapú vállalati alkalmazásokhoz. A framework fő célja a komplex vállalati alkalmazások fejlesztésének egyszerűsítése.

## Alapfogalmak

### Dependency Injection (DI)

A Dependency Injection a Spring keretrendszer alapkövét képezi. Lehetővé teszi, hogy az objektumok függőségeit a Spring konténer menedzselje.

```java
@Service
public class UserService {

    private final UserRepository userRepository;

    // Constructor injection (ajánlott)
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findById(Long id) {
        return userRepository.findById(id);
    }
}
```

### Inversion of Control (IoC)

Az IoC Container a Spring szíve, amely kezeli az objektumok életciklusát és függőségeit.

```java
@Configuration
public class AppConfig {

    @Bean
    public UserService userService(UserRepository userRepository) {
        return new UserService(userRepository);
    }

    @Bean
    public UserRepository userRepository() {
        return new JpaUserRepository();
    }
}
```

## Spring Boot

### Alapok

Spring Boot egy opinionated keretrendszer, amely minimalizálja a konfigurációt és gyors alkalmazásfejlesztést tesz lehetővé.

```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

### Auto-configuration

Spring Boot automatikusan konfigurálja az alkalmazást a classpath alapján.

```java
// application.properties
server.port=8080
spring.datasource.url=jdbc:h2:mem:testdb
spring.jpa.hibernate.ddl-auto=create-drop
```

## Spring MVC

### REST Controller

```java
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
    public ResponseEntity<User> createUser(@RequestBody @Valid UserDto userDto) {
        User user = userService.create(userDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody @Valid UserDto userDto) {
        User user = userService.update(id, userDto);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
```

### Request Mapping

```java
@RequestMapping(value = "/users", method = RequestMethod.GET)
public List<User> getUsers() {
    return userService.findAll();
}

// Rövidebb verzió
@GetMapping("/users")
public List<User> getUsers() {
    return userService.findAll();
}
```

## Spring Data JPA

### Repository interfészek

```java
public interface UserRepository extends JpaRepository<User, Long> {

    // Query methods
    List<User> findByLastName(String lastName);

    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.age > ?1")
    List<User> findUsersOlderThan(int age);

    @Query(value = "SELECT * FROM users WHERE email = ?1", nativeQuery = true)
    User findByEmailNative(String email);
}
```

### Entity osztályok

```java
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(unique = true)
    private String email;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> orders = new ArrayList<>();

    // Constructors, getters, setters
}
```

## Validáció

### Bean Validation

```java
public class UserDto {

    @NotBlank(message = "A keresztnév kötelező")
    @Size(min = 2, max = 50, message = "A keresztnév 2-50 karakter között kell legyen")
    private String firstName;

    @NotBlank(message = "A vezetéknév kötelező")
    private String lastName;

    @Email(message = "Érvényes email címet adj meg")
    @NotBlank(message = "Az email cím kötelező")
    private String email;

    @Min(value = 18, message = "Minimum 18 évesnek kell lenni")
    @Max(value = 120, message = "Maximum 120 éves lehet")
    private Integer age;

    // Getters and setters
}
```

### Custom Validator

```java
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = HungarianPhoneValidator.class)
public @interface HungarianPhone {
    String message() default "Érvénytelen magyar telefonszám";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

public class HungarianPhoneValidator implements ConstraintValidator<HungarianPhone, String> {

    @Override
    public boolean isValid(String phone, ConstraintValidatorContext context) {
        if (phone == null) return true;
        return phone.matches("^\\+36[1-9][0-9]{8}$");
    }
}
```

## Exception Handling

### Global Exception Handler

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFound(UserNotFoundException ex) {
        ErrorResponse error = new ErrorResponse("USER_NOT_FOUND", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
            errors.put(error.getField(), error.getDefaultMessage()));

        ErrorResponse error = new ErrorResponse("VALIDATION_ERROR", "Érvénytelen adatok", errors);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
}
```

## Security

### Spring Security alapbeállítás

```java
@EnableWebSecurity
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/users/**").hasRole("USER")
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt);

        return http.build();
    }
}
```

### JWT Authentication

```java
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest request) {
        // Authentication logic
        String token = jwtService.generateToken(user);
        return ResponseEntity.ok(new TokenResponse(token));
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refreshToken(@RequestBody RefreshTokenRequest request) {
        // Token refresh logic
        String newToken = jwtService.refreshToken(request.getRefreshToken());
        return ResponseEntity.ok(new TokenResponse(newToken));
    }
}
```

## Testing

### Unit Testing

```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void shouldFindUserById() {
        // Given
        Long userId = 1L;
        User expectedUser = new User("John", "Doe", "john@example.com");
        when(userRepository.findById(userId)).thenReturn(Optional.of(expectedUser));

        // When
        User actualUser = userService.findById(userId);

        // Then
        assertThat(actualUser).isEqualTo(expectedUser);
    }

    @Test
    void shouldThrowExceptionWhenUserNotFound() {
        // Given
        Long userId = 999L;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(UserNotFoundException.class, () -> userService.findById(userId));
    }
}
```

### Integration Testing

```java
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@TestPropertySource(locations = "classpath:application-test.properties")
class UserControllerIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void shouldCreateUser() {
        // Given
        UserDto userDto = new UserDto("John", "Doe", "john@example.com", 30);

        // When
        ResponseEntity<User> response = restTemplate.postForEntity("/api/users", userDto, User.class);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody().getEmail()).isEqualTo("john@example.com");
    }
}
```

## Configuration Properties

```java
@ConfigurationProperties(prefix = "app")
@Data
public class AppProperties {

    private String name;
    private String version;
    private Security security = new Security();

    @Data
    public static class Security {
        private String secretKey;
        private int tokenExpiration = 3600;
    }
}
```

```yaml
# application.yml
app:
  name: User Management System
  version: 1.0.0
  security:
    secret-key: ${JWT_SECRET:default-secret}
    token-expiration: 7200
```

## Profiles

```java
@Profile("dev")
@Configuration
public class DevConfig {

    @Bean
    public DataSource dataSource() {
        return new EmbeddedDatabaseBuilder()
            .setType(EmbeddedDatabaseType.H2)
            .build();
    }
}

@Profile("prod")
@Configuration
public class ProdConfig {

    @Bean
    public DataSource dataSource() {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl("jdbc:postgresql://localhost/mydb");
        return new HikariDataSource(config);
    }
}
```

## Actuator (Monitoring)

```java
@Component
public class CustomHealthIndicator implements HealthIndicator {

    @Override
    public Health health() {
        // Custom health check logic
        boolean isHealthy = checkExternalService();

        if (isHealthy) {
            return Health.up()
                .withDetail("service", "External API")
                .withDetail("status", "Available")
                .build();
        } else {
            return Health.down()
                .withDetail("service", "External API")
                .withDetail("error", "Service unavailable")
                .build();
        }
    }
}
```

## Best Practices

### 1. Dependency Injection
- Használj constructor injection-t
- Kerüld a field injection-t
- Használj final mezőket

### 2. Exception Handling
- Használj custom exception-öket
- Implementálj global exception handler-t
- Adj vissza értelmes hibaüzeneteket

### 3. Security
- Mindig validáld a bejövő adatokat
- Használj HTTPS-t production környezetben
- Implementálj proper authentication és authorization-t

### 4. Testing
- Írj unit és integration teszteket
- Használj test profiles-t
- Mock-old a külső függőségeket

## Következő lépések

- [Tesztelés](./testing.md)
- [Spring gyakorlatok](../exercises/java/)
- [Architektúra](./arch.md)

---

*Ez az anyag a Spring Framework alapjait és a Spring Boot használatát tárgyalja. További részletekért látogass el a gyakorlati fejezetekhez!*
