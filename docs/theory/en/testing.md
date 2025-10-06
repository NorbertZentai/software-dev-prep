# Software Testing

## Brief Summary

Software testing is a critical process for ensuring application quality. Based on the testing pyramid, you need the most unit tests, fewer integration tests, and the fewest E2E tests. In the Java ecosystem, JUnit 5 and Mockito are fundamental tools, while Spring Boot provides built-in testing support. Main pitfalls include fragile tests, overuse of mocks, and "happy path only" approaches.

## Concepts

### Unit Test {#unit-test}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*A unit test is like a medical lab test: it examines a specific function in isolation, eliminating external factors.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Fast feedback**: runs in seconds, immediately signals errors
- **Isolated debugging**: you know exactly which component is faulty
- **Refactoring safety**: confidently change code, tests catch regressions
- **Documentation**: test code shows expected component behavior

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// BASIC UNIT TEST with JUnit 5
@Test
@DisplayName("Should add two positive numbers correctly")
void shouldAddTwoPositiveNumbers() {
    // Given (Arrange) - Prepare test data
    Calculator calculator = new Calculator();
    int a = 5, b = 3;

    // When (Act) - Call the method under test
    int result = calculator.add(a, b);

    // Then (Assert) - Verify the result
    assertEquals(8, result);
    assertTrue(result > 0);
}

// TESTING EXCEPTIONS
@Test
@DisplayName("Should throw exception when dividing by zero")
void shouldThrowExceptionWhenDividingByZero() {
    Calculator calculator = new Calculator();
    
    ArithmeticException exception = assertThrows(
        ArithmeticException.class,
        () -> calculator.divide(10, 0)
    );
    
    assertEquals("Cannot divide by zero", exception.getMessage());
}

// PARAMETERIZED TESTS
@ParameterizedTest
@DisplayName("Should correctly validate even numbers")
@ValueSource(ints = {2, 4, 6, 8, 10, 100})
void shouldReturnTrueForEvenNumbers(int number) {
    assertTrue(NumberValidator.isEven(number));
}

@ParameterizedTest
@DisplayName("Should handle various calculation scenarios")
@CsvSource({
    "1, 2, 3",      // a + b = expected
    "5, 7, 12",
    "-1, 1, 0",
    "0, 0, 0"
})
void shouldAddNumbersCorrectly(int a, int b, int expected) {
    Calculator calculator = new Calculator();
    assertEquals(expected, calculator.add(a, b));
}

// TESTING COLLECTIONS
@Test
@DisplayName("Should filter active users correctly")
void shouldFilterActiveUsers() {
    // Given
    List<User> users = Arrays.asList(
        new User("Alice", UserStatus.ACTIVE),
        new User("Bob", UserStatus.INACTIVE),
        new User("Charlie", UserStatus.ACTIVE)
    );
    
    UserService service = new UserService();
    
    // When
    List<User> activeUsers = service.getActiveUsers(users);
    
    // Then
    assertThat(activeUsers)
        .hasSize(2)
        .extracting(User::getName)
        .containsExactly("Alice", "Charlie");
}

// TESTING BEHAVIOR AND STATE
@Test
@DisplayName("Should update user last login time")
void shouldUpdateUserLastLoginTime() {
    // Given
    User user = new User("John");
    LocalDateTime beforeLogin = LocalDateTime.now().minusMinutes(1);
    
    // When
    user.updateLastLogin();
    
    // Then
    assertThat(user.getLastLogin())
        .isAfter(beforeLogin)
        .isBeforeOrEqualTo(LocalDateTime.now());
}

// TESTING WITH TIMEOUTS
@Test
@Timeout(value = 2, unit = TimeUnit.SECONDS)
@DisplayName("Should complete calculation within timeout")
void shouldCompleteCalculationWithinTimeout() {
    Calculator calculator = new Calculator();
    
    // This should complete quickly
    int result = calculator.complexCalculation(1000);
    
    assertTrue(result > 0);
}

// NESTED TESTS for organization
@Nested
@DisplayName("When user is valid")
class WhenUserIsValid {
    
    private User validUser;
    
    @BeforeEach
    void setUp() {
        validUser = new User("John", "john@test.com");
    }
    
    @Test
    @DisplayName("Should save user successfully")
    void shouldSaveUserSuccessfully() {
        UserService service = new UserService();
        User savedUser = service.save(validUser);
        assertNotNull(savedUser.getId());
    }
    
    @Test
    @DisplayName("Should send welcome email")
    void shouldSendWelcomeEmail() {
        UserService service = new UserService();
        service.save(validUser);
        // Verify email was sent
    }
}

// TESTING PRIVATE METHODS (through public API)
public class OrderService {
    
    public OrderResult processOrder(Order order) {
        // This public method calls private methods
        if (isValidOrder(order)) {          // private method
            return calculateTotal(order);    // private method
        }
        return OrderResult.invalid();
    }
    
    private boolean isValidOrder(Order order) { /* implementation */ }
    private OrderResult calculateTotal(Order order) { /* implementation */ }
}

@Test
@DisplayName("Should process valid order correctly")
void shouldProcessValidOrderCorrectly() {
    // Test private methods through public API
    OrderService service = new OrderService();
    Order validOrder = new Order("item1", 2, new BigDecimal("10.00"));
    
    OrderResult result = service.processOrder(validOrder);
    
    assertEquals(OrderStatus.PROCESSED, result.getStatus());
    assertEquals(new BigDecimal("20.00"), result.getTotal());
}
```
*Notice: AAA pattern (Arrange-Act-Assert) clearly separates test phases.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths / misconceptions</strong></summary>

<div>

- "Unit tests can be slow" → Should be fast (< 100ms), otherwise not a unit test
- "Must test private methods" → Private methods should be tested through public API
- "100% unit test coverage is enough" → Coverage doesn't mean quality, just code coverage

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>📚 <strong>5-minute micro-learning</strong></summary>

<div>

**1. Named test methods**
```java
// ❌ Bad
@Test void test1() { }

// ✅ Good
@Test void shouldReturnTrueWhenUserIsActive() { }
```

**2. Test organization**
```java
@DisplayName("User Service Tests")
class UserServiceTest {
    
    @Nested
    @DisplayName("When creating user")
    class WhenCreatingUser {
        // Tests for user creation
    }
    
    @Nested
    @DisplayName("When updating user")
    class WhenUpdatingUser {
        // Tests for user updates
    }
}
```

**3. Assertion styles**
```java
// JUnit assertions
assertEquals(expected, actual);
assertTrue(condition);
assertThrows(Exception.class, () -> code);

// AssertJ assertions (more readable)
assertThat(users)
    .hasSize(3)
    .extracting(User::getName)
    .containsExactly("Alice", "Bob", "Charlie");
```

**4. Test data builders**
```java
public class UserTestDataBuilder {
    private String name = "Default Name";
    private String email = "default@test.com";
    
    public UserTestDataBuilder withName(String name) {
        this.name = name;
        return this;
    }
    
    public UserTestDataBuilder withEmail(String email) {
        this.email = email;
        return this;
    }
    
    public User build() {
        return new User(name, email);
    }
}

// Usage in tests
@Test
void shouldCreateUserWithCustomData() {
    User user = new UserTestDataBuilder()
        .withName("John")
        .withEmail("john@test.com")
        .build();
    
    assertThat(user.getName()).isEqualTo("John");
}
```

</div>
</details>

</div>

<div class="concept-section interview">

<details>
<summary>💼 <strong>Interview questions</strong></summary>

<div>

**Q: What makes a good unit test?**
> Fast execution, isolated (no external dependencies), deterministic (same result every time), readable, and tests one specific behavior.

**Q: How do you test private methods?**
> Test them indirectly through public methods. If you need to test a private method directly, it might be a design smell indicating the method should be public or extracted to a separate class.

**Q: What's the difference between testing state vs behavior?**
> State testing verifies the object's state after an operation. Behavior testing verifies interactions with dependencies (using mocks).

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Mocking` · `TDD` · `Test Pyramid` · `Continuous Integration` · `Code Quality`

</div>

### Integration Test {#integration-test}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Integration tests are like testing a car's engine with all parts connected: you verify that components work together correctly, not just individually.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Component interaction**: verifies that modules work together correctly
- **Configuration validation**: tests real database connections, external APIs
- **End-to-end workflows**: validates complete business processes
- **Production confidence**: closer to real-world scenarios

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// DATABASE INTEGRATION TEST with Spring Boot
@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
@Sql(scripts = "/test-data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(scripts = "/cleanup.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
class UserRepositoryIntegrationTest {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private TestEntityManager entityManager;
    
    @Test
    @DisplayName("Should save and retrieve user from database")
    void shouldSaveAndRetrieveUser() {
        // Given
        User user = new User("John Doe", "john@test.com");
        
        // When
        User savedUser = userRepository.save(user);
        entityManager.flush(); // Force database write
        entityManager.clear(); // Clear persistence context
        
        // Then
        Optional<User> retrievedUser = userRepository.findById(savedUser.getId());
        
        assertThat(retrievedUser)
            .isPresent()
            .get()
            .satisfies(u -> {
                assertThat(u.getName()).isEqualTo("John Doe");
                assertThat(u.getEmail()).isEqualTo("john@test.com");
                assertThat(u.getCreatedAt()).isNotNull();
            });
    }
    
    @Test
    @DisplayName("Should find users by email domain")
    void shouldFindUsersByEmailDomain() {
        // Given - test data loaded from test-data.sql
        
        // When
        List<User> companyUsers = userRepository.findByEmailDomain("company.com");
        
        // Then
        assertThat(companyUsers)
            .hasSize(2)
            .allSatisfy(user -> assertThat(user.getEmail()).contains("company.com"));
    }
}

// WEB LAYER INTEGRATION TEST
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserControllerIntegrationTest {
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Autowired
    private UserRepository userRepository;
    
    @LocalServerPort
    private int port;
    
    @Test
    @DisplayName("Should create user via REST API")
    void shouldCreateUserViaRestAPI() {
        // Given
        CreateUserRequest request = new CreateUserRequest("Jane Doe", "jane@test.com");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<CreateUserRequest> entity = new HttpEntity<>(request, headers);
        
        // When
        ResponseEntity<UserResponse> response = restTemplate.postForEntity(
            "/api/users", 
            entity, 
            UserResponse.class
        );
        
        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody())
            .isNotNull()
            .satisfies(user -> {
                assertThat(user.getName()).isEqualTo("Jane Doe");
                assertThat(user.getEmail()).isEqualTo("jane@test.com");
                assertThat(user.getId()).isNotNull();
            });
        
        // Verify in database
        Optional<User> savedUser = userRepository.findByEmail("jane@test.com");
        assertThat(savedUser).isPresent();
    }
    
    @Test
    @DisplayName("Should return validation error for invalid user")
    void shouldReturnValidationErrorForInvalidUser() {
        // Given
        CreateUserRequest invalidRequest = new CreateUserRequest("", "invalid-email");
        
        // When
        ResponseEntity<ErrorResponse> response = restTemplate.postForEntity(
            "/api/users",
            invalidRequest,
            ErrorResponse.class
        );
        
        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody().getErrors())
            .containsKeys("name", "email")
            .hasSize(2);
    }
}

// MESSAGE QUEUE INTEGRATION TEST
@SpringBootTest
@TestPropertySource(properties = {
    "spring.rabbitmq.host=localhost",
    "spring.rabbitmq.port=5672"
})
class OrderEventIntegrationTest {
    
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    @Autowired
    private OrderService orderService;
    
    @RabbitListener(queues = "test.order.queue")
    private List<OrderCreatedEvent> receivedEvents = new ArrayList<>();
    
    @Test
    @DisplayName("Should publish order event to message queue")
    void shouldPublishOrderEventToMessageQueue() throws InterruptedException {
        // Given
        CreateOrderRequest request = new CreateOrderRequest("user123", Arrays.asList(
            new OrderItem("product1", 2),
            new OrderItem("product2", 1)
        ));
        
        // When
        Order order = orderService.createOrder(request);
        
        // Then - wait for async message processing
        Thread.sleep(1000);
        
        assertThat(receivedEvents)
            .hasSize(1)
            .first()
            .satisfies(event -> {
                assertThat(event.getOrderId()).isEqualTo(order.getId());
                assertThat(event.getUserId()).isEqualTo("user123");
                assertThat(event.getItems()).hasSize(2);
            });
    }
}

// EXTERNAL API INTEGRATION TEST with WireMock
@SpringBootTest
@TestPropertySource(properties = "payment.api.url=http://localhost:8089")
class PaymentServiceIntegrationTest {
    
    @RegisterExtension
    static WireMockExtension wireMock = WireMockExtension.newInstance()
        .options(wireMockConfig().port(8089))
        .build();
    
    @Autowired
    private PaymentService paymentService;
    
    @Test
    @DisplayName("Should process payment via external API")
    void shouldProcessPaymentViaExternalAPI() {
        // Given - Mock external API response
        wireMock.stubFor(post(urlEqualTo("/api/payments"))
            .withRequestBody(containing("amount"))
            .willReturn(aResponse()
                .withStatus(200)
                .withHeader("Content-Type", "application/json")
                .withBody("""
                    {
                        "transactionId": "txn_123456",
                        "status": "COMPLETED",
                        "amount": 99.99
                    }
                    """)));
        
        PaymentRequest request = new PaymentRequest(
            new BigDecimal("99.99"), 
            "USD",
            "4111111111111111"
        );
        
        // When
        PaymentResult result = paymentService.processPayment(request);
        
        // Then
        assertThat(result.isSuccessful()).isTrue();
        assertThat(result.getTransactionId()).isEqualTo("txn_123456");
        assertThat(result.getAmount()).isEqualTo(new BigDecimal("99.99"));
        
        // Verify external API was called correctly
        wireMock.verify(postRequestedFor(urlEqualTo("/api/payments"))
            .withRequestBody(matchingJsonPath("$.amount", equalTo("99.99")))
            .withRequestBody(matchingJsonPath("$.currency", equalTo("USD"))));
    }
    
    @Test
    @DisplayName("Should handle payment API failure gracefully")
    void shouldHandlePaymentAPIFailureGracefully() {
        // Given - Mock API failure
        wireMock.stubFor(post(urlEqualTo("/api/payments"))
            .willReturn(aResponse()
                .withStatus(500)
                .withBody("Internal Server Error")));
        
        PaymentRequest request = new PaymentRequest(
            new BigDecimal("99.99"), 
            "USD",
            "4111111111111111"
        );
        
        // When & Then
        assertThatThrownBy(() -> paymentService.processPayment(request))
            .isInstanceOf(PaymentProcessingException.class)
            .hasMessageContaining("Payment API unavailable");
    }
}

// CONTAINER-BASED INTEGRATION TEST with Testcontainers
@SpringBootTest
@TestPropertySource(properties = {
    "spring.datasource.url=jdbc:tc:postgresql:13://localhost/testdb",
    "spring.jpa.hibernate.ddl-auto=create-drop"
})
class UserServiceContainerIntegrationTest {
    
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:13")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("test");
    
    @Container
    static RedisContainer redis = new RedisContainer("redis:6-alpine")
            .withExposedPorts(6379);
    
    @Autowired
    private UserService userService;
    
    @Test
    @DisplayName("Should cache user data in Redis")
    void shouldCacheUserDataInRedis() {
        // Given
        User user = new User("Cached User", "cached@test.com");
        User savedUser = userService.createUser(user);
        
        // When - First call should hit database
        User firstCall = userService.findById(savedUser.getId());
        
        // Then - Second call should hit cache
        User secondCall = userService.findById(savedUser.getId());
        
        assertThat(firstCall).isEqualTo(secondCall);
        // Verify cache hit through metrics or logs
    }
}

// SLICE TESTS - Testing specific layers
@DataJpaTest
class UserRepositorySliceTest {
    
    @Autowired
    private TestEntityManager entityManager;
    
    @Autowired
    private UserRepository userRepository;
    
    @Test
    @DisplayName("Should find users by status")
    void shouldFindUsersByStatus() {
        // Given
        User activeUser = entityManager.persistAndFlush(
            new User("Active User", UserStatus.ACTIVE));
        User inactiveUser = entityManager.persistAndFlush(
            new User("Inactive User", UserStatus.INACTIVE));
        
        // When
        List<User> activeUsers = userRepository.findByStatus(UserStatus.ACTIVE);
        
        // Then
        assertThat(activeUsers)
            .hasSize(1)
            .containsExactly(activeUser);
    }
}

@WebMvcTest(UserController.class)
class UserControllerSliceTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private UserService userService;
    
    @Test
    @DisplayName("Should return user when found")
    void shouldReturnUserWhenFound() throws Exception {
        // Given
        User user = new User(1L, "John Doe", "john@test.com");
        when(userService.findById(1L)).thenReturn(user);
        
        // When & Then
        mockMvc.perform(get("/api/users/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("John Doe"))
            .andExpect(jsonPath("$.email").value("john@test.com"));
    }
}
```
*Notice: Integration tests verify that components work together correctly with real infrastructure.*

</div>

<div class="concept-section pitfalls">

<details>
<summary>⚠️ <strong>Integration test pitfalls</strong></summary>

<div>

- **Slow execution**: Use @DirtiesContext sparingly, prefer @Sql for data setup
- **Flaky tests**: Ensure proper cleanup and avoid shared state
- **Environment dependencies**: Use Testcontainers for consistent environments
- **Over-testing**: Don't duplicate unit test logic in integration tests

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Database Testing` · `API Testing` · `Testcontainers` · `Spring Boot Test` · `End-to-End Testing`

</div>

### Mocking {#mocking}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Mocking is like using a stunt double in movies: the double looks like the real actor but follows a script exactly, allowing you to control the scene perfectly.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Isolation**: test components without external dependencies
- **Control**: define exact behavior and responses
- **Speed**: avoid slow database or network calls
- **Reliability**: eliminate flaky external services

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// BASIC MOCKING with Mockito
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @Mock
    private EmailService emailService;
    
    @InjectMocks
    private UserService userService;
    
    @Test
    @DisplayName("Should create user and send welcome email")
    void shouldCreateUserAndSendWelcomeEmail() {
        // Given
        CreateUserRequest request = new CreateUserRequest("John", "john@test.com");
        User expectedUser = new User(1L, "John", "john@test.com");
        
        when(userRepository.save(any(User.class))).thenReturn(expectedUser);
        
        // When
        User actualUser = userService.createUser(request);
        
        // Then
        assertThat(actualUser).isEqualTo(expectedUser);
        
        // Verify interactions
        verify(userRepository).save(argThat(user -> 
            user.getName().equals("John") && 
            user.getEmail().equals("john@test.com")));
        
        verify(emailService).sendWelcomeEmail("john@test.com", "John");
        verifyNoMoreInteractions(emailService);
    }
    
    @Test
    @DisplayName("Should handle duplicate email gracefully")
    void shouldHandleDuplicateEmailGracefully() {
        // Given
        CreateUserRequest request = new CreateUserRequest("John", "john@test.com");
        
        when(userRepository.existsByEmail("john@test.com")).thenReturn(true);
        
        // When & Then
        assertThatThrownBy(() -> userService.createUser(request))
            .isInstanceOf(UserAlreadyExistsException.class)
            .hasMessage("User with email john@test.com already exists");
        
        // Verify no user was saved and no email sent
        verify(userRepository, never()).save(any(User.class));
        verify(emailService, never()).sendWelcomeEmail(anyString(), anyString());
    }
}

// ARGUMENT MATCHERS and CAPTORS
@Test
@DisplayName("Should process order with correct payment details")
void shouldProcessOrderWithCorrectPaymentDetails() {
    // Given
    Order order = new Order("user123", Arrays.asList(
        new OrderItem("product1", 2, new BigDecimal("10.00")),
        new OrderItem("product2", 1, new BigDecimal("20.00"))
    ));
    
    when(paymentService.processPayment(any(PaymentRequest.class)))
        .thenReturn(new PaymentResult("txn123", PaymentStatus.SUCCESS));
    
    ArgumentCaptor<PaymentRequest> paymentCaptor = 
        ArgumentCaptor.forClass(PaymentRequest.class);
    
    // When
    OrderResult result = orderService.processOrder(order);
    
    // Then
    verify(paymentService).processPayment(paymentCaptor.capture());
    
    PaymentRequest capturedPayment = paymentCaptor.getValue();
    assertThat(capturedPayment.getAmount()).isEqualTo(new BigDecimal("40.00"));
    assertThat(capturedPayment.getCurrency()).isEqualTo("USD");
    assertThat(capturedPayment.getOrderId()).isEqualTo(order.getId());
}

// STUBBING DIFFERENT SCENARIOS
@Test
@DisplayName("Should handle payment service failures")
void shouldHandlePaymentServiceFailures() {
    // Given
    Order order = new Order("user123", Collections.emptyList());
    
    // Stub different exceptions for different calls
    when(paymentService.processPayment(any()))
        .thenThrow(new PaymentTimeoutException("Payment service timeout"))
        .thenThrow(new PaymentDeclinedException("Card declined"))
        .thenReturn(new PaymentResult("txn123", PaymentStatus.SUCCESS));
    
    // When & Then - First call fails with timeout
    assertThatThrownBy(() -> orderService.processOrder(order))
        .isInstanceOf(PaymentTimeoutException.class);
    
    // Second call fails with decline
    assertThatThrownBy(() -> orderService.processOrder(order))
        .isInstanceOf(PaymentDeclinedException.class);
    
    // Third call succeeds
    OrderResult result = orderService.processOrder(order);
    assertThat(result.getStatus()).isEqualTo(OrderStatus.COMPLETED);
}

// SPYING on real objects
@Test
@DisplayName("Should calculate discount with business rules")
void shouldCalculateDiscountWithBusinessRules() {
    // Given - Use real object but spy on it
    PricingService realPricingService = new PricingService();
    PricingService spyPricingService = spy(realPricingService);
    
    Order order = new Order("user123", createOrderItems());
    
    // Stub only specific method
    doReturn(new BigDecimal("0.15")) // 15% discount
        .when(spyPricingService).getCustomerDiscount("user123");
    
    // When
    BigDecimal finalPrice = spyPricingService.calculateFinalPrice(order);
    
    // Then
    verify(spyPricingService).getCustomerDiscount("user123");
    verify(spyPricingService).calculateFinalPrice(order);
    
    // Real calculation happened, but with mocked discount
    assertThat(finalPrice).isEqualTo(new BigDecimal("85.00")); // 100 - 15% discount
}

// MOCKING STATIC METHODS (Mockito 3.4+)
@Test
@DisplayName("Should use current time for order timestamp")
void shouldUseCurrentTimeForOrderTimestamp() {
    LocalDateTime fixedTime = LocalDateTime.of(2023, 10, 15, 10, 30);
    
    try (MockedStatic<LocalDateTime> mockedLocalDateTime = mockStatic(LocalDateTime.class)) {
        // Given
        mockedLocalDateTime.when(LocalDateTime::now).thenReturn(fixedTime);
        
        // When
        Order order = orderService.createOrder(new CreateOrderRequest());
        
        // Then
        assertThat(order.getCreatedAt()).isEqualTo(fixedTime);
        mockedLocalDateTime.verify(LocalDateTime::now);
    }
}

// MOCKING VOID METHODS
@Test
@DisplayName("Should log order creation events")
void shouldLogOrderCreationEvents() {
    // Given
    Order order = new Order("user123", Collections.emptyList());
    
    doNothing().when(auditService).logOrderCreated(any(Order.class));
    doThrow(new AuditException("Audit service down"))
        .when(auditService).logOrderCompleted(any(Order.class));
    
    // When & Then
    assertDoesNotThrow(() -> orderService.createOrder(order));
    
    verify(auditService).logOrderCreated(order);
    
    // Verify exception is handled gracefully
    assertThatThrownBy(() -> orderService.completeOrder(order))
        .isInstanceOf(AuditException.class);
}

// CUSTOM ANSWER for complex stubbing
@Test
@DisplayName("Should handle complex user lookup scenarios")
void shouldHandleComplexUserLookupScenarios() {
    // Given
    when(userRepository.findByEmail(anyString())).thenAnswer(invocation -> {
        String email = invocation.getArgument(0);
        
        if (email.contains("admin")) {
            return Optional.of(new User(email, UserRole.ADMIN));
        } else if (email.contains("banned")) {
            throw new UserBannedException("User is banned");
        } else if (email.endsWith("@test.com")) {
            return Optional.of(new User(email, UserRole.USER));
        } else {
            return Optional.empty();
        }
    });
    
    // When & Then
    Optional<User> adminUser = userService.findByEmail("admin@company.com");
    assertThat(adminUser).isPresent();
    assertThat(adminUser.get().getRole()).isEqualTo(UserRole.ADMIN);
    
    assertThatThrownBy(() -> userService.findByEmail("banned@company.com"))
        .isInstanceOf(UserBannedException.class);
    
    Optional<User> regularUser = userService.findByEmail("john@test.com");
    assertThat(regularUser).isPresent();
    assertThat(regularUser.get().getRole()).isEqualTo(UserRole.USER);
    
    Optional<User> notFound = userService.findByEmail("unknown@other.com");
    assertThat(notFound).isEmpty();
}

// TESTING ASYNCHRONOUS CODE
@Test
@DisplayName("Should handle async email sending")
void shouldHandleAsyncEmailSending() throws Exception {
    // Given
    CompletableFuture<Void> emailFuture = CompletableFuture.completedFuture(null);
    when(emailService.sendWelcomeEmailAsync(anyString(), anyString()))
        .thenReturn(emailFuture);
    
    // When
    CompletableFuture<User> userFuture = userService.createUserAsync(
        new CreateUserRequest("John", "john@test.com"));
    
    User user = userFuture.get(1, TimeUnit.SECONDS);
    
    // Then
    assertThat(user.getName()).isEqualTo("John");
    verify(emailService).sendWelcomeEmailAsync("john@test.com", "John");
}

// MOCK BEST PRACTICES
@Test
@DisplayName("Example of good mocking practices")
void exampleOfGoodMockingPractices() {
    // ✅ Mock external dependencies only
    @Mock ExternalPaymentService externalPaymentService;
    @Mock EmailService emailService;
    
    // ✅ Don't mock value objects or simple data structures
    Order order = new Order(); // Real object
    PaymentRequest request = new PaymentRequest(); // Real object
    
    // ✅ Use specific argument matchers
    when(externalPaymentService.charge(eq(request)))
        .thenReturn(new PaymentResult("success"));
    
    // ✅ Verify important interactions
    verify(emailService).sendReceipt(order.getUserEmail(), order.getId());
    
    // ✅ Use descriptive test names that explain the scenario
    // This test name clearly states what is being tested
}

// ANTI-PATTERNS to avoid
@Test
@DisplayName("Anti-patterns to avoid in mocking")
void antiPatternsToAvoid() {
    // ❌ Don't mock everything
    // @Mock String stringValue; // Don't mock primitives/value objects
    // @Mock List<String> list;  // Don't mock collections you control
    
    // ❌ Don't over-specify interactions
    // verify(userRepository, times(1)).save(any()); // times(1) is default
    
    // ❌ Don't use verifyZeroInteractions - it's deprecated
    // verifyZeroInteractions(emailService); // Use verifyNoInteractions instead
    verifyNoInteractions(emailService);
    
    // ❌ Don't mock the class under test
    // UserService mockUserService = mock(UserService.class); // Test real object
    
    // ❌ Don't create complex mock hierarchies
    // Mock only direct dependencies, not transitive ones
}
```
*Notice: Mock external dependencies, not value objects. Verify important interactions but don't over-specify.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Mocking myths / misconceptions</strong></summary>

<div>

- "Mock everything for faster tests" → Only mock external dependencies, use real objects for domain logic
- "More mocks = better isolation" → Too many mocks make tests brittle and hard to maintain
- "Mocks prove the code works" → Mocks only prove interactions, not correctness

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Unit Testing` · `Test Doubles` · `Dependency Injection` · `Test Isolation` · `Behavior Verification`

</div>

### Test-Driven Development (TDD) {#tdd}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*TDD is like drawing a blueprint before building a house: you define what you want (test), build the minimum to satisfy it (code), then improve the structure (refactor).*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Design driver**: tests guide better API design
- **Safety net**: immediate feedback when changes break functionality
- **Confidence**: high test coverage from the start
- **Documentation**: tests serve as living specification

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// TDD CYCLE: Red -> Green -> Refactor

// 1. RED PHASE - Write a failing test
@Test
@DisplayName("Should calculate total price with tax")
void shouldCalculateTotalPriceWithTax() {
    // This test will fail because Calculator doesn't exist yet
    Calculator calculator = new Calculator();
    BigDecimal price = new BigDecimal("100.00");
    BigDecimal taxRate = new BigDecimal("0.08"); // 8% tax
    
    BigDecimal total = calculator.calculateTotalWithTax(price, taxRate);
    
    assertThat(total).isEqualTo(new BigDecimal("108.00"));
}

// 2. GREEN PHASE - Write minimum code to pass
public class Calculator {
    public BigDecimal calculateTotalWithTax(BigDecimal price, BigDecimal taxRate) {
        // Minimal implementation to make test pass
        BigDecimal tax = price.multiply(taxRate);
        return price.add(tax);
    }
}

// 3. REFACTOR PHASE - Improve the code while keeping tests green
public class Calculator {
    
    public BigDecimal calculateTotalWithTax(BigDecimal price, BigDecimal taxRate) {
        validateInputs(price, taxRate);
        
        BigDecimal tax = calculateTax(price, taxRate);
        return price.add(tax);
    }
    
    private BigDecimal calculateTax(BigDecimal price, BigDecimal taxRate) {
        return price.multiply(taxRate).setScale(2, RoundingMode.HALF_UP);
    }
    
    private void validateInputs(BigDecimal price, BigDecimal taxRate) {
        if (price == null || price.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Price must be non-negative");
        }
        if (taxRate == null || taxRate.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Tax rate must be non-negative");
        }
    }
}

// COMPREHENSIVE TDD EXAMPLE: Building a User Registration System

// 1. RED - Test for user validation
@Test
@DisplayName("Should reject user with invalid email")
void shouldRejectUserWithInvalidEmail() {
    UserRegistrationService service = new UserRegistrationService();
    RegisterUserRequest request = new RegisterUserRequest("John", "invalid-email");
    
    assertThatThrownBy(() -> service.registerUser(request))
        .isInstanceOf(InvalidEmailException.class)
        .hasMessage("Email format is invalid");
}

// 2. GREEN - Minimal implementation
public class UserRegistrationService {
    public User registerUser(RegisterUserRequest request) {
        if (!isValidEmail(request.getEmail())) {
            throw new InvalidEmailException("Email format is invalid");
        }
        return new User(request.getName(), request.getEmail());
    }
    
    private boolean isValidEmail(String email) {
        return email.contains("@");
    }
}

// 3. RED - Add test for duplicate email check
@Test
@DisplayName("Should reject duplicate email")
void shouldRejectDuplicateEmail() {
    UserRegistrationService service = new UserRegistrationService(userRepository);
    RegisterUserRequest request = new RegisterUserRequest("John", "john@test.com");
    
    when(userRepository.existsByEmail("john@test.com")).thenReturn(true);
    
    assertThatThrownBy(() -> service.registerUser(request))
        .isInstanceOf(DuplicateEmailException.class)
        .hasMessage("Email already exists");
}

// 4. GREEN - Add duplicate check
public class UserRegistrationService {
    private final UserRepository userRepository;
    
    public UserRegistrationService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public User registerUser(RegisterUserRequest request) {
        if (!isValidEmail(request.getEmail())) {
            throw new InvalidEmailException("Email format is invalid");
        }
        
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateEmailException("Email already exists");
        }
        
        return new User(request.getName(), request.getEmail());
    }
    
    private boolean isValidEmail(String email) {
        return email.contains("@");
    }
}

// 5. RED - Add test for password hashing
@Test
@DisplayName("Should hash user password before saving")
void shouldHashUserPasswordBeforeSaving() {
    PasswordHasher passwordHasher = mock(PasswordHasher.class);
    UserRepository userRepository = mock(UserRepository.class);
    UserRegistrationService service = new UserRegistrationService(userRepository, passwordHasher);
    
    RegisterUserRequest request = new RegisterUserRequest("John", "john@test.com", "plainPassword");
    
    when(passwordHasher.hash("plainPassword")).thenReturn("hashedPassword");
    when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArgument(0));
    
    User user = service.registerUser(request);
    
    verify(passwordHasher).hash("plainPassword");
    assertThat(user.getPasswordHash()).isEqualTo("hashedPassword");
}

// 6. GREEN - Add password hashing
public class UserRegistrationService {
    private final UserRepository userRepository;
    private final PasswordHasher passwordHasher;
    
    public UserRegistrationService(UserRepository userRepository, PasswordHasher passwordHasher) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
    }
    
    public User registerUser(RegisterUserRequest request) {
        validateRequest(request);
        
        String hashedPassword = passwordHasher.hash(request.getPassword());
        User user = new User(request.getName(), request.getEmail(), hashedPassword);
        
        return userRepository.save(user);
    }
    
    private void validateRequest(RegisterUserRequest request) {
        if (!isValidEmail(request.getEmail())) {
            throw new InvalidEmailException("Email format is invalid");
        }
        
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateEmailException("Email already exists");
        }
    }
    
    private boolean isValidEmail(String email) {
        return email.contains("@") && email.contains(".");
    }
}

// TDD WITH OUTSIDE-IN APPROACH
// Start with acceptance test, then drill down to units

@Test
@DisplayName("User registration end-to-end flow")
void userRegistrationEndToEndFlow() {
    // Acceptance test - defines the whole feature
    given()
        .contentType(ContentType.JSON)
        .body("""
            {
                "name": "John Doe",
                "email": "john@example.com",
                "password": "SecurePass123"
            }
            """)
    .when()
        .post("/api/users/register")
    .then()
        .statusCode(201)
        .body("id", notNullValue())
        .body("name", equalTo("John Doe"))
        .body("email", equalTo("john@example.com"))
        .body("password", nullValue()); // Password should not be returned
}

// Then write controller test
@Test
@DisplayName("Should register user via REST endpoint")
void shouldRegisterUserViaRestEndpoint() {
    RegisterUserRequest request = new RegisterUserRequest("John", "john@test.com", "password");
    User expectedUser = new User(1L, "John", "john@test.com", "hashedPassword");
    
    when(userRegistrationService.registerUser(request)).thenReturn(expectedUser);
    
    mockMvc.perform(post("/api/users/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
        .andExpected(status().isCreated())
        .andExpected(jsonPath("$.name").value("John"))
        .andExpected(jsonPath("$.email").value("john@test.com"));
}

// Then write service tests (already shown above)
// Then write repository tests if needed

// TDD BEST PRACTICES EXAMPLE
public class StringCalculatorTest {
    
    private StringCalculator calculator;
    
    @BeforeEach
    void setUp() {
        calculator = new StringCalculator();
    }
    
    @Test
    @DisplayName("Should return 0 for empty string")
    void shouldReturn0ForEmptyString() {
        assertThat(calculator.add("")).isEqualTo(0);
    }
    
    @Test
    @DisplayName("Should return number for single number")
    void shouldReturnNumberForSingleNumber() {
        assertThat(calculator.add("5")).isEqualTo(5);
    }
    
    @Test
    @DisplayName("Should add two numbers separated by comma")
    void shouldAddTwoNumbersSeparatedByComma() {
        assertThat(calculator.add("1,2")).isEqualTo(3);
    }
    
    @Test
    @DisplayName("Should handle newlines as separators")
    void shouldHandleNewlinesAsSeparators() {
        assertThat(calculator.add("1\n2,3")).isEqualTo(6);
    }
    
    @Test
    @DisplayName("Should support custom delimiters")
    void shouldSupportCustomDelimiters() {
        assertThat(calculator.add("//;\n1;2")).isEqualTo(3);
    }
    
    @Test
    @DisplayName("Should throw exception for negative numbers")
    void shouldThrowExceptionForNegativeNumbers() {
        assertThatThrownBy(() -> calculator.add("1,-2,3"))
            .isInstanceOf(IllegalArgumentException.class)
            .hasMessage("Negatives not allowed: [-2]");
    }
}

// Implementation after TDD
public class StringCalculator {
    
    public int add(String numbers) {
        if (numbers.isEmpty()) return 0;
        
        String delimiter = ",|\n";
        String numbersToAdd = numbers;
        
        if (numbers.startsWith("//")) {
            int delimiterIndex = numbers.indexOf('\n');
            delimiter = Pattern.quote(numbers.substring(2, delimiterIndex));
            numbersToAdd = numbers.substring(delimiterIndex + 1);
        }
        
        String[] tokens = numbersToAdd.split(delimiter);
        List<Integer> negatives = new ArrayList<>();
        int sum = 0;
        
        for (String token : tokens) {
            int number = Integer.parseInt(token);
            if (number < 0) {
                negatives.add(number);
            } else {
                sum += number;
            }
        }
        
        if (!negatives.isEmpty()) {
            throw new IllegalArgumentException("Negatives not allowed: " + negatives);
        }
        
        return sum;
    }
}
```
*Notice: TDD drives design decisions and ensures comprehensive test coverage from the start.*

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>TDD best practices</strong></summary>

<div>

- **Baby steps**: Make the smallest possible changes to make tests pass
- **Refactor fearlessly**: Tests provide safety net for improvements
- **Test behavior, not implementation**: Focus on what, not how
- **One failing test at a time**: Don't write multiple failing tests
- **Clean test code**: Tests are first-class citizens, keep them maintainable

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Unit Testing` · `Design Patterns` · `Refactoring` · `Code Quality` · `Agile Development`

</div>

### Performance Testing {#performance-testing}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Performance testing is like stress-testing a bridge: you need to know how much traffic it can handle before it buckles, and how it behaves under different loads.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Scalability validation**: verify system can handle expected load
- **Bottleneck identification**: find performance problems before production
- **SLA compliance**: ensure response times meet requirements
- **Capacity planning**: understand resource needs for growth

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// MICROBENCHMARKING with JMH (Java Microbenchmark Harness)
@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.MICROSECONDS)
@State(Scope.Benchmark)
@Fork(1)
@Warmup(iterations = 5, time = 1, timeUnit = TimeUnit.SECONDS)
@Measurement(iterations = 10, time = 1, timeUnit = TimeUnit.SECONDS)
public class StringConcatenationBenchmark {
    
    private static final int ITERATIONS = 1000;
    
    @Benchmark
    public String stringConcatenationWithPlus() {
        String result = "";
        for (int i = 0; i < ITERATIONS; i++) {
            result += "item" + i;
        }
        return result;
    }
    
    @Benchmark
    public String stringConcatenationWithStringBuilder() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < ITERATIONS; i++) {
            sb.append("item").append(i);
        }
        return sb.toString();
    }
    
    @Benchmark
    public String stringConcatenationWithStringBuffer() {
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < ITERATIONS; i++) {
            sb.append("item").append(i);
        }
        return sb.toString();
    }
}

// LOAD TESTING with Spring Boot Test
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class LoadTestExample {
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Test
    @DisplayName("Should handle concurrent user creation requests")
    void shouldHandleConcurrentUserCreationRequests() throws InterruptedException {
        int numberOfThreads = 50;
        int requestsPerThread = 10;
        ExecutorService executor = Executors.newFixedThreadPool(numberOfThreads);
        CountDownLatch latch = new CountDownLatch(numberOfThreads);
        List<Future<ResponseEntity<UserResponse>>> futures = new ArrayList<>();
        
        // Track performance metrics
        List<Long> responseTimes = Collections.synchronizedList(new ArrayList<>());
        AtomicInteger successCount = new AtomicInteger(0);
        AtomicInteger errorCount = new AtomicInteger(0);
        
        for (int i = 0; i < numberOfThreads; i++) {
            final int threadId = i;
            
            Future<ResponseEntity<UserResponse>> future = executor.submit(() -> {
                try {
                    for (int j = 0; j < requestsPerThread; j++) {
                        long startTime = System.currentTimeMillis();
                        
                        CreateUserRequest request = new CreateUserRequest(
                            "User" + threadId + "_" + j,
                            "user" + threadId + "_" + j + "@test.com"
                        );
                        
                        ResponseEntity<UserResponse> response = restTemplate.postForEntity(
                            "/api/users", request, UserResponse.class);
                        
                        long responseTime = System.currentTimeMillis() - startTime;
                        responseTimes.add(responseTime);
                        
                        if (response.getStatusCode().is2xxSuccessful()) {
                            successCount.incrementAndGet();
                        } else {
                            errorCount.incrementAndGet();
                        }
                    }
                    return null;
                } finally {
                    latch.countDown();
                }
            });
            
            futures.add(future);
        }
        
        // Wait for all threads to complete
        latch.await(60, TimeUnit.SECONDS);
        executor.shutdown();
        
        // Analyze results
        int totalRequests = numberOfThreads * requestsPerThread;
        double successRate = (double) successCount.get() / totalRequests * 100;
        double averageResponseTime = responseTimes.stream()
            .mapToLong(Long::longValue)
            .average()
            .orElse(0.0);
        
        long maxResponseTime = responseTimes.stream()
            .mapToLong(Long::longValue)
            .max()
            .orElse(0L);
        
        // Assertions for performance requirements
        assertThat(successRate).isGreaterThanOrEqualTo(95.0); // 95% success rate
        assertThat(averageResponseTime).isLessThan(200.0); // < 200ms average
        assertThat(maxResponseTime).isLessThan(1000L); // < 1s max response time
        
        System.out.printf("Load Test Results:\n" +
            "Total Requests: %d\n" +
            "Success Rate: %.2f%%\n" +
            "Average Response Time: %.2f ms\n" +
            "Max Response Time: %d ms\n",
            totalRequests, successRate, averageResponseTime, maxResponseTime);
    }
}

// MEMORY LEAK TESTING
@Test
@DisplayName("Should not have memory leaks in user cache")
void shouldNotHaveMemoryLeaksInUserCache() {
    UserCacheService cacheService = new UserCacheService();
    MemoryMXBean memoryBean = ManagementFactory.getMemoryMXBean();
    
    // Initial memory usage
    long initialMemory = memoryBean.getHeapMemoryUsage().getUsed();
    
    // Create and cache many users
    for (int i = 0; i < 10000; i++) {
        User user = new User("User" + i, "user" + i + "@test.com");
        cacheService.cache(user);
    }
    
    // Clear cache
    cacheService.clearAll();
    
    // Force garbage collection
    System.gc();
    Thread.sleep(100); // Give GC time to work
    System.gc();
    
    long finalMemory = memoryBean.getHeapMemoryUsage().getUsed();
    long memoryIncrease = finalMemory - initialMemory;
    
    // Memory should not have increased significantly
    assertThat(memoryIncrease).isLessThan(1024 * 1024); // Less than 1MB increase
}

// DATABASE PERFORMANCE TESTING
@Test
@DisplayName("Should handle large dataset queries efficiently")
void shouldHandleLargeDatasetQueriesEfficiently() {
    // Setup: Insert large dataset
    List<User> users = IntStream.range(0, 10000)
        .mapToObj(i -> new User("User" + i, "user" + i + "@test.com"))
        .collect(Collectors.toList());
    
    userRepository.saveAll(users);
    
    // Test: Query performance
    long startTime = System.currentTimeMillis();
    
    Page<User> activePage = userRepository.findByStatus(
        UserStatus.ACTIVE, 
        PageRequest.of(0, 100)
    );
    
    long queryTime = System.currentTimeMillis() - startTime;
    
    // Assertions
    assertThat(queryTime).isLessThan(100L); // Query should complete in < 100ms
    assertThat(activePage.getContent()).hasSize(100);
    assertThat(activePage.getTotalElements()).isGreaterThan(0);
}

// STRESS TESTING - Testing beyond normal capacity
@Test
@DisplayName("Should gracefully degrade under extreme load")
@Timeout(value = 30, unit = TimeUnit.SECONDS)
void shouldGracefullyDegradeUnderExtremeLoad() throws InterruptedException {
    int extremeThreadCount = 200;
    ExecutorService executor = Executors.newFixedThreadPool(extremeThreadCount);
    AtomicInteger successCount = new AtomicInteger(0);
    AtomicInteger timeoutCount = new AtomicInteger(0);
    AtomicInteger errorCount = new AtomicInteger(0);
    
    CountDownLatch latch = new CountDownLatch(extremeThreadCount);
    
    for (int i = 0; i < extremeThreadCount; i++) {
        final int threadId = i;
        executor.submit(() -> {
            try {
                CreateUserRequest request = new CreateUserRequest(
                    "StressUser" + threadId,
                    "stress" + threadId + "@test.com"
                );
                
                ResponseEntity<UserResponse> response = restTemplate.postForEntity(
                    "/api/users", request, UserResponse.class);
                
                if (response.getStatusCode().is2xxSuccessful()) {
                    successCount.incrementAndGet();
                } else if (response.getStatusCode().value() == 503) {
                    // Service unavailable - graceful degradation
                    timeoutCount.incrementAndGet();
                } else {
                    errorCount.incrementAndGet();
                }
                
            } catch (Exception e) {
                errorCount.incrementAndGet();
            } finally {
                latch.countDown();
            }
        });
    }
    
    latch.await();
    executor.shutdown();
    
    // Under extreme load, system should either succeed or gracefully degrade
    int totalResponses = successCount.get() + timeoutCount.get() + errorCount.get();
    double responseRate = (double) totalResponses / extremeThreadCount * 100;
    
    // System should respond to most requests (either success or controlled degradation)
    assertThat(responseRate).isGreaterThan(80.0);
    
    // Hard errors should be minimal
    double errorRate = (double) errorCount.get() / extremeThreadCount * 100;
    assertThat(errorRate).isLessThan(10.0);
}

// CUSTOM PERFORMANCE ASSERTION
public class PerformanceAssertions {
    
    public static TimedAssertion assertThat(Runnable operation) {
        return new TimedAssertion(operation);
    }
    
    public static class TimedAssertion {
        private final Runnable operation;
        
        public TimedAssertion(Runnable operation) {
            this.operation = operation;
        }
        
        public void completesWithin(long time, TimeUnit unit) {
            long startTime = System.nanoTime();
            
            operation.run();
            
            long duration = System.nanoTime() - startTime;
            long maxDurationNanos = unit.toNanos(time);
            
            if (duration > maxDurationNanos) {
                throw new AssertionError(
                    String.format("Operation took %d ns, but should complete within %d ns",
                        duration, maxDurationNanos));
            }
        }
    }
}

// Usage of custom performance assertion
@Test
@DisplayName("Should complete user lookup within performance budget")
void shouldCompleteUserLookupWithinPerformanceBudget() {
    User user = userRepository.save(new User("John", "john@test.com"));
    
    PerformanceAssertions.assertThat(() -> {
        userService.findById(user.getId());
    }).completesWithin(50, TimeUnit.MILLISECONDS);
}
```
*Notice: Performance testing validates that your system meets non-functional requirements under various load conditions.*

</div>

<div class="concept-section pitfalls">

<details>
<summary>⚠️ <strong>Performance testing pitfalls</strong></summary>

<div>

- **Unrealistic load patterns**: Use realistic user behavior, not just maximum throughput
- **Cold start bias**: Warm up the system before measuring performance
- **Measurement interference**: JVM optimizations can skew microbenchmark results
- **Environment differences**: Production and test environments should be similar

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Load Testing` · `Stress Testing` · `Profiling` · `System Monitoring` · `Capacity Planning`

</div>

### Test Best Practices {#test-best-practices}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Test best practices are like cooking guidelines: following them consistently ensures your tests are reliable, maintainable, and deliver the expected results every time.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Maintainability**: well-written tests are easier to update and debug
- **Reliability**: consistent practices reduce flaky tests
- **Team efficiency**: standardized approaches help team collaboration
- **Code quality**: good tests drive better production code design

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// TEST NAMING CONVENTIONS
public class TestNamingExamples {
    
    // ✅ Good naming - describes behavior
    @Test
    @DisplayName("Should throw InvalidEmailException when email format is invalid")
    void shouldThrowInvalidEmailExceptionWhenEmailFormatIsInvalid() {
        // Test implementation
    }
    
    // ✅ Good naming - describes specific scenario
    @Test
    @DisplayName("Should calculate 15% discount for premium customers with orders over $100")
    void shouldCalculate15PercentDiscountForPremiumCustomersWithOrdersOver100() {
        // Test implementation
    }
    
    // ❌ Bad naming - not descriptive
    @Test
    void testUser() {
        // What about user? What scenario?
    }
    
    // ❌ Bad naming - too vague
    @Test
    void calculateDiscount() {
        // What discount? What conditions?
    }
}

// TEST ORGANIZATION AND STRUCTURE
@DisplayName("User Service Tests")
class UserServiceTest {
    
    private UserService userService;
    private UserRepository mockUserRepository;
    private EmailService mockEmailService;
    
    @BeforeEach
    void setUp() {
        mockUserRepository = mock(UserRepository.class);
        mockEmailService = mock(EmailService.class);
        userService = new UserService(mockUserRepository, mockEmailService);
    }
    
    @Nested
    @DisplayName("When creating a new user")
    class WhenCreatingNewUser {
        
        @Test
        @DisplayName("Should save user with hashed password")
        void shouldSaveUserWithHashedPassword() {
            // Given
            CreateUserRequest request = new CreateUserRequest("John", "john@test.com", "password");
            User expectedUser = new User("John", "john@test.com", "hashed_password");
            
            when(mockUserRepository.save(any(User.class))).thenReturn(expectedUser);
            
            // When
            User actualUser = userService.createUser(request);
            
            // Then
            assertThat(actualUser.getPasswordHash()).isNotEqualTo("password");
            verify(mockUserRepository).save(argThat(user -> 
                !user.getPasswordHash().equals("password")));
        }
        
        @Test
        @DisplayName("Should send welcome email after successful creation")
        void shouldSendWelcomeEmailAfterSuccessfulCreation() {
            // Given
            CreateUserRequest request = new CreateUserRequest("John", "john@test.com", "password");
            User savedUser = new User(1L, "John", "john@test.com", "hashed_password");
            
            when(mockUserRepository.save(any(User.class))).thenReturn(savedUser);
            
            // When
            userService.createUser(request);
            
            // Then
            verify(mockEmailService).sendWelcomeEmail("john@test.com", "John");
        }
    }
    
    @Nested
    @DisplayName("When user already exists")
    class WhenUserAlreadyExists {
        
        @Test
        @DisplayName("Should throw DuplicateUserException for existing email")
        void shouldThrowDuplicateUserExceptionForExistingEmail() {
            // Given
            CreateUserRequest request = new CreateUserRequest("John", "existing@test.com", "password");
            when(mockUserRepository.existsByEmail("existing@test.com")).thenReturn(true);
            
            // When & Then
            assertThatThrownBy(() -> userService.createUser(request))
                .isInstanceOf(DuplicateUserException.class)
                .hasMessage("User with email existing@test.com already exists");
            
            verify(mockUserRepository, never()).save(any(User.class));
        }
    }
}

// TEST DATA BUILDERS for complex objects
public class UserTestDataBuilder {
    private String name = "Default Name";
    private String email = "default@test.com";
    private UserRole role = UserRole.USER;
    private UserStatus status = UserStatus.ACTIVE;
    private List<Order> orders = new ArrayList<>();
    
    public UserTestDataBuilder withName(String name) {
        this.name = name;
        return this;
    }
    
    public UserTestDataBuilder withEmail(String email) {
        this.email = email;
        return this;
    }
    
    public UserTestDataBuilder withRole(UserRole role) {
        this.role = role;
        return this;
    }
    
    public UserTestDataBuilder withStatus(UserStatus status) {
        this.status = status;
        return this;
    }
    
    public UserTestDataBuilder withOrders(Order... orders) {
        this.orders = Arrays.asList(orders);
        return this;
    }
    
    public UserTestDataBuilder inactive() {
        this.status = UserStatus.INACTIVE;
        return this;
    }
    
    public UserTestDataBuilder admin() {
        this.role = UserRole.ADMIN;
        return this;
    }
    
    public User build() {
        User user = new User(name, email, role, status);
        orders.forEach(user::addOrder);
        return user;
    }
}

// Usage in tests
@Test
@DisplayName("Should apply admin privileges for admin users")
void shouldApplyAdminPrivilegesForAdminUsers() {
    // Readable test data creation
    User adminUser = new UserTestDataBuilder()
        .withName("Admin User")
        .withEmail("admin@company.com")
        .admin()
        .build();
    
    boolean hasAdminAccess = userService.hasAdminAccess(adminUser);
    
    assertThat(hasAdminAccess).isTrue();
}

// PARAMETERIZED TESTS for multiple scenarios
@ParameterizedTest
@DisplayName("Should validate email formats correctly")
@ValueSource(strings = {"user@test.com", "user.name@test.com", "user+tag@test.co.uk"})
void shouldAcceptValidEmailFormats(String validEmail) {
    boolean isValid = EmailValidator.isValid(validEmail);
    assertThat(isValid).isTrue();
}

@ParameterizedTest
@DisplayName("Should reject invalid email formats")
@ValueSource(strings = {"invalid", "@test.com", "user@", "user@.com", ""})
void shouldRejectInvalidEmailFormats(String invalidEmail) {
    boolean isValid = EmailValidator.isValid(invalidEmail);
    assertThat(isValid).isFalse();
}

@ParameterizedTest
@DisplayName("Should calculate correct discounts for different user types")
@CsvSource({
    "REGULAR, 100.00, 0.00",    // Regular users get no discount
    "PREMIUM, 100.00, 10.00",   // Premium users get 10% discount
    "VIP, 100.00, 20.00"        // VIP users get 20% discount
})
void shouldCalculateCorrectDiscounts(UserType userType, BigDecimal orderAmount, BigDecimal expectedDiscount) {
    User user = new UserTestDataBuilder().withUserType(userType).build();
    Order order = new Order(orderAmount);
    
    BigDecimal actualDiscount = discountService.calculateDiscount(user, order);
    
    assertThat(actualDiscount).isEqualTo(expectedDiscount);
}

// CUSTOM ASSERTIONS for domain-specific validations
public class UserAssertions {
    
    public static UserAssert assertThat(User actual) {
        return new UserAssert(actual);
    }
    
    public static class UserAssert extends AbstractAssert<UserAssert, User> {
        
        public UserAssert(User actual) {
            super(actual, UserAssert.class);
        }
        
        public UserAssert hasValidEmail() {
            isNotNull();
            if (!actual.getEmail().contains("@")) {
                failWithMessage("Expected user to have valid email but was <%s>", actual.getEmail());
            }
            return this;
        }
        
        public UserAssert isActive() {
            isNotNull();
            if (actual.getStatus() != UserStatus.ACTIVE) {
                failWithMessage("Expected user to be active but was <%s>", actual.getStatus());
            }
            return this;
        }
        
        public UserAssert hasRole(UserRole expectedRole) {
            isNotNull();
            if (actual.getRole() != expectedRole) {
                failWithMessage("Expected user to have role <%s> but was <%s>", 
                    expectedRole, actual.getRole());
            }
            return this;
        }
        
        public UserAssert hasOrderCount(int expectedCount) {
            isNotNull();
            if (actual.getOrders().size() != expectedCount) {
                failWithMessage("Expected user to have <%d> orders but had <%d>", 
                    expectedCount, actual.getOrders().size());
            }
            return this;
        }
    }
}

// Usage of custom assertions
@Test
@DisplayName("Should create active user with valid email")
void shouldCreateActiveUserWithValidEmail() {
    User user = userService.createUser("John", "john@test.com");
    
    UserAssertions.assertThat(user)
        .hasValidEmail()
        .isActive()
        .hasRole(UserRole.USER)
        .hasOrderCount(0);
}

// TEST LIFECYCLE MANAGEMENT
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class DatabaseIntegrationTest {
    
    private static TestDatabase testDatabase;
    
    @BeforeAll
    static void setUpDatabase() {
        testDatabase = TestDatabase.start();
        testDatabase.migrate();
    }
    
    @AfterAll
    static void tearDownDatabase() {
        testDatabase.stop();
    }
    
    @BeforeEach
    void setUpTestData() {
        testDatabase.clearAllTables();
        testDatabase.insertTestData("users.sql");
    }
    
    @Test
    @DisplayName("Should find user by email")
    void shouldFindUserByEmail() {
        Optional<User> user = userRepository.findByEmail("test@example.com");
        assertThat(user).isPresent();
    }
}

// FLAKY TEST PREVENTION
@RepeatedTest(10) // Run test 10 times to catch flaky behavior
@DisplayName("Should handle concurrent access correctly")
void shouldHandleConcurrentAccessCorrectly() {
    // Test implementation that might be flaky
    CountDownLatch latch = new CountDownLatch(2);
    AtomicInteger counter = new AtomicInteger(0);
    
    // Use deterministic timing instead of Thread.sleep()
    CompletableFuture.allOf(
        CompletableFuture.runAsync(() -> {
            counter.incrementAndGet();
            latch.countDown();
        }),
        CompletableFuture.runAsync(() -> {
            counter.incrementAndGet();
            latch.countDown();
        })
    ).join();
    
    assertThat(counter.get()).isEqualTo(2);
}

// ERROR MESSAGE TESTING
@Test
@DisplayName("Should provide helpful error message for invalid user data")
void shouldProvideHelpfulErrorMessageForInvalidUserData() {
    CreateUserRequest invalidRequest = new CreateUserRequest("", "invalid-email");
    
    ValidationException exception = assertThrows(
        ValidationException.class,
        () -> userService.createUser(invalidRequest)
    );
    
    // Test specific error message content
    assertThat(exception.getMessage())
        .contains("Name cannot be empty")
        .contains("Email format is invalid");
    
    // Test error field mapping
    Map<String, String> fieldErrors = exception.getFieldErrors();
    assertThat(fieldErrors)
        .containsEntry("name", "Name cannot be empty")
        .containsEntry("email", "Email format is invalid");
}
```
*Notice: Consistent practices make tests more readable, maintainable, and reliable.*

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>Testing golden rules</strong></summary>

<div>

- **FIRST principles**: Fast, Independent, Repeatable, Self-validating, Timely
- **Test pyramid**: More unit tests, fewer integration tests, minimal E2E tests
- **Arrange-Act-Assert**: Clear test structure with distinct phases
- **One assertion per test**: Focus on testing one specific behavior
- **Meaningful names**: Test names should describe the scenario and expected outcome

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Code Quality` · `Team Practices` · `Continuous Integration` · `Documentation` · `Maintainability`

</div>

## Concepts

**Unit Test**: Tests individual components in isolation using mocks for external dependencies. Should be fast (< 100ms), deterministic, and follow the AAA pattern (Arrange-Act-Assert). Forms the foundation of the testing pyramid.

**Integration Test**: Verifies that different components work together correctly. Tests real database connections, external APIs, and end-to-end workflows. Provides confidence that modules integrate properly but runs slower than unit tests.

**Mocking**: Technique for replacing dependencies with controlled test doubles that simulate real behavior. Enables isolation of components under test and provides precise control over test scenarios and verification of interactions.

**Test-Driven Development (TDD)**: Development practice following Red-Green-Refactor cycle. Write failing test first (Red), implement minimal code to pass (Green), then improve code structure (Refactor). Drives better design and ensures comprehensive test coverage.

**Performance Testing**: Validates system behavior under various load conditions including load testing (expected traffic), stress testing (beyond capacity), and microbenchmarking (individual component performance). Essential for scalability and SLA compliance.

**Test Best Practices**: Guidelines for writing maintainable, reliable tests including meaningful naming conventions, proper test organization, test data builders for complex objects, and custom assertions for domain-specific validations. Follows FIRST principles: Fast, Independent, Repeatable, Self-validating, Timely.

### Mocking {#mocking}

Replace dependencies with controlled test doubles.

```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @InjectMocks
    private UserService userService;
    
    @Test
    void shouldReturnUserWhenFound() {
        // Given
        User expectedUser = new User(1L, "John", "john@example.com");
        when(userRepository.findById(1L)).thenReturn(Optional.of(expectedUser));
        
        // When
        User actualUser = userService.findById(1L);
        
        // Then
        assertEquals(expectedUser, actualUser);
        verify(userRepository).findById(1L);
    }
}
```

### Test-Driven Development (TDD) {#tdd}

1. **Red**: Write a failing test
2. **Green**: Write minimal code to pass
3. **Refactor**: Improve code while keeping tests green

```java
// 1. Red - Write failing test
@Test
public void shouldReturnTrueForEvenNumbers() {
    NumberValidator validator = new NumberValidator();
    assertTrue(validator.isEven(4));
}

// 2. Green - Minimal implementation
public class NumberValidator {
    public boolean isEven(int number) {
        return number % 2 == 0;
    }
}

// 3. Refactor - Improve if needed
```

## Best Practices

1. **Follow AAA pattern**: Arrange, Act, Assert
2. **Test one thing at a time**: Single responsibility per test
3. **Use descriptive test names**: `shouldReturnUserWhenValidIdProvided`
4. **Mock external dependencies**: Databases, web services, file systems
5. **Maintain test independence**: Tests shouldn't depend on each other
6. **Keep tests fast**: Unit tests should run in milliseconds
7. **Aim for high coverage**: But focus on quality over quantity