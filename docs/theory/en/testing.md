# Software Testing

## Brief Summary

Software testing is a critical process for ensuring application quality. Based on the testing pyramid, you need the most unit tests, fewer integration tests, and the fewest E2E tests. In the Java ecosystem, JUnit 5 and Mockito are fundamental tools, while Spring Boot provides built-in testing support. Main pitfalls include fragile tests, overuse of mocks, and "happy path only" approaches.

## Concepts

### Unit Test {#unit-test}

<div class="concept-section definition">

📋 **Concept Definition**  
**Testing individual components in isolation** without external dependencies. **Scope**: single method/class, mocked dependencies. **Framework**: JUnit 5 (@Test, @BeforeEach, @AfterEach, assertions), TestNG. **Assertions**: assertEquals, assertTrue, assertThrows, assertTimeout. **AAA pattern**: Arrange (setup), Act (execute), Assert (verify). **Coverage**: aim for high coverage of business logic, not boilerplate. **Characteristics**: fast (<1s per test), deterministic, independent (no shared state). **Mocking frameworks**: Mockito (when/thenReturn, verify), EasyMock. **Test doubles**: mock (behavior verification), stub (state verification), fake (simple implementation). **Best practices**: one assertion concept per test, descriptive names (should_when_given), avoid logic in tests.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Testing multiple components together** with real dependencies (database, message queue, external services). **Scope**: multiple layers (service + repository + database), API endpoints, workflows. **Spring Boot**: @SpringBootTest (full context), @DataJpaTest (JPA slice), @WebMvcTest (controller layer), TestRestTemplate, MockMvc. **Database**: H2 in-memory for speed, Testcontainers for real databases (Postgres, MySQL in Docker). **Transaction rollback**: @Transactional on tests auto-rolls back after each test. **External services**: WireMock for HTTP stubbing, embedded Kafka. **Test containers**: Docker-based dependencies for CI/CD. **Trade-offs**: slower than unit tests, more complex setup. **Best practices**: test critical paths, realistic data, clean state between tests.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Creating controlled substitutes for dependencies** in tests. **Mockito API**: mock() creates mock, when().thenReturn() stubs behavior, verify() checks interactions, @Mock/@InjectMocks annotations. **Stubbing**: when(service.method(anyString())).thenReturn(result), thenThrow for exceptions. **Argument matchers**: any(), eq(), argThat(). **Verification**: verify(mock).method(), times(n), never(), atLeastOnce(). **Spies**: partial mocks (real object with some methods stubbed). **Behavior vs State**: mocks verify behavior (interactions), stubs provide state (return values). **Over-mocking pitfall**: mocking everything makes tests brittle and less valuable. **Best practices**: mock external dependencies, use real objects for domain logic, prefer fakes over mocks when simple.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Development methodology: write test before code.** **Red-Green-Refactor cycle**: 1) Red (write failing test), 2) Green (minimal code to pass), 3) Refactor (improve code quality, tests still pass). **Benefits**: forces testable design, prevents over-engineering (YAGNI), high coverage by default. **Test naming**: should_returnTrue_when_inputIsValid. **Baby steps**: small increments, frequent commits. **Triangulation**: add test cases to generalize solution. **Challenges**: requires discipline, upfront time investment, learning curve. **vs Test-After**: TDD tests drive design, test-after tests verify design. **BDD** (Behavior-Driven Development): extends TDD with Given-When-Then format, focuses on behavior. **Frameworks**: JUnit, AssertJ for fluent assertions, Cucumber for BDD.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Evaluating system behavior under load conditions.** **Types**: **Load testing** (expected traffic), **Stress testing** (beyond capacity to find breaking point), **Spike testing** (sudden traffic surge), **Soak testing** (sustained load over time, detect memory leaks). **Metrics**: throughput (requests/sec), latency (p50, p95, p99 percentiles), error rate, resource utilization (CPU, memory). **Tools**: **JMeter** (GUI/CLI, distributed testing), **Gatling** (Scala DSL, HTML reports), **k6** (JavaScript, cloud integration), **Locust** (Python). **Profiling**: JProfiler, YourKit, VisualVM for bottleneck identification. **APM**: New Relic, Datadog for production monitoring. **Best practices**: test production-like environment, realistic scenarios, monitor database/external services.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Principles for effective, maintainable tests.** **FIRST**: Fast (milliseconds), Independent (no order dependency), Repeatable (deterministic, no flaky tests), Self-validating (pass/fail clear), Timely (written with or before code). **Naming**: descriptive (should_throwException_when_inputIsNull), test behavior not implementation. **Arrange-Act-Assert**: clear test structure, single responsibility. **Test Data Builders**: fluent APIs for complex object creation. **Avoid**: logic in tests (loops, conditionals), sleeps (use awaitility), hardcoded values (constants), testing private methods. **Coverage**: aim for high business logic coverage, not 100% (diminishing returns). **Flaky tests**: disable temporarily, fix root cause (timing issues, shared state, external dependencies). **Test pyramid**: many unit, some integration, few E2E.

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

---

## Advanced Testing Strategies

### Integration Testing {#integration-testing}
<!-- tags: integration, testing, spring-boot, database, medior -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Integration testing validates the interaction between different components, modules, or services. In Spring Boot applications, this includes testing **database interactions** with `@DataJpaTest`, **web layer integration** with `@WebMvcTest`, and **full application context** with `@SpringBootTest`. Integration tests ensure components work together correctly, catching issues that unit tests miss.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Real environment**: tests actual component interactions
- **Configuration validation**: ensures correct Spring configuration
- **Database integration**: validates queries and transactions
- **API contract testing**: ensures controllers work with services

</div>

<div class="runnable-model" data-filter="integration spring-boot">

**Runnable mental model**
```java
// 1. DATABASE INTEGRATION TESTING

@DataJpaTest
@TestPropertySource(properties = {
    "spring.jpa.hibernate.ddl-auto=create-drop",
    "spring.datasource.url=jdbc:h2:mem:testdb"
})
class UserRepositoryIntegrationTest {
    
    @Autowired
    private TestEntityManager entityManager;
    
    @Autowired
    private UserRepository userRepository;
    
    @Test
    void shouldFindUsersByEmailDomain() {
        // Given
        User user1 = new User("john", "john@company.com");
        User user2 = new User("jane", "jane@company.com");
        User user3 = new User("bob", "bob@other.com");
        
        entityManager.persistAndFlush(user1);
        entityManager.persistAndFlush(user2);
        entityManager.persistAndFlush(user3);
        
        // When
        List<User> companyUsers = userRepository.findByEmailContaining("@company.com");
        
        // Then
        assertThat(companyUsers).hasSize(2);
        assertThat(companyUsers).extracting(User::getUsername)
                                .containsExactlyInAnyOrder("john", "jane");
    }
    
    @Test
    void shouldHandleTransactionalOperations() {
        // Given
        User user = new User("test", "test@example.com");
        
        // When
        User savedUser = userRepository.save(user);
        
        // Then
        assertThat(savedUser.getId()).isNotNull();
        assertThat(userRepository.findById(savedUser.getId())).isPresent();
    }
    
    @Test
    @Sql("/test-data.sql") // Load test data from SQL file
    void shouldQueryWithCustomSql() {
        // When
        List<User> activeUsers = userRepository.findActiveUsers();
        
        // Then
        assertThat(activeUsers).isNotEmpty();
        assertThat(activeUsers).allMatch(User::isActive);
    }
}

// 2. WEB LAYER INTEGRATION TESTING

@WebMvcTest(UserController.class)
class UserControllerIntegrationTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private UserService userService;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Test
    void shouldCreateUserSuccessfully() throws Exception {
        // Given
        CreateUserRequest request = new CreateUserRequest("john", "john@example.com");
        User expectedUser = new User("john", "john@example.com");
        expectedUser.setId(1L);
        
        when(userService.createUser(any(CreateUserRequest.class)))
            .thenReturn(expectedUser);
        
        // When & Then
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.username").value("john"))
                .andExpect(jsonPath("$.email").value("john@example.com"));
        
        verify(userService).createUser(argThat(req -> 
            req.getUsername().equals("john") && 
            req.getEmail().equals("john@example.com")
        ));
    }
    
    @Test
    void shouldValidateRequestBody() throws Exception {
        // Given
        CreateUserRequest invalidRequest = new CreateUserRequest("", "invalid-email");
        
        // When & Then
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors").isArray())
                .andExpect(jsonPath("$.errors[*].field").value(hasItems("username", "email")));
    }
    
    @Test
    void shouldHandleServiceExceptions() throws Exception {
        // Given
        CreateUserRequest request = new CreateUserRequest("john", "john@example.com");
        when(userService.createUser(any()))
            .thenThrow(new UserAlreadyExistsException("Username already exists"));
        
        // When & Then
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.message").value("Username already exists"));
    }
}

// 3. FULL APPLICATION INTEGRATION TESTING

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = {
    "spring.datasource.url=jdbc:h2:mem:integrationtest",
    "spring.jpa.hibernate.ddl-auto=create-drop"
})
class UserApplicationIntegrationTest {
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Autowired
    private UserRepository userRepository;
    
    @LocalServerPort
    private int port;
    
    @Test
    void shouldCreateAndRetrieveUserEndToEnd() {
        // Given
        CreateUserRequest request = new CreateUserRequest("integration", "integration@test.com");
        String createUrl = "http://localhost:" + port + "/api/users";
        
        // When - Create user
        ResponseEntity<User> createResponse = restTemplate.postForEntity(
            createUrl, request, User.class);
        
        // Then - Verify creation
        assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        User createdUser = createResponse.getBody();
        assertThat(createdUser.getId()).isNotNull();
        
        // When - Retrieve user
        String getUrl = "http://localhost:" + port + "/api/users/" + createdUser.getId();
        ResponseEntity<User> getResponse = restTemplate.getForEntity(getUrl, User.class);
        
        // Then - Verify retrieval
        assertThat(getResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        User retrievedUser = getResponse.getBody();
        assertThat(retrievedUser.getUsername()).isEqualTo("integration");
        assertThat(retrievedUser.getEmail()).isEqualTo("integration@test.com");
        
        // Verify database state
        Optional<User> dbUser = userRepository.findById(createdUser.getId());
        assertThat(dbUser).isPresent();
    }
    
    @Test
    @Transactional
    @Rollback
    void shouldHandleComplexBusinessWorkflow() {
        // Given - Setup initial state
        User user = userRepository.save(new User("workflow", "workflow@test.com"));
        String baseUrl = "http://localhost:" + port + "/api/users/" + user.getId();
        
        // When - Update user
        UpdateUserRequest updateRequest = new UpdateUserRequest("new-email@test.com");
        restTemplate.put(baseUrl, updateRequest);
        
        // Then - Verify update
        ResponseEntity<User> response = restTemplate.getForEntity(baseUrl, User.class);
        assertThat(response.getBody().getEmail()).isEqualTo("new-email@test.com");
        
        // When - Delete user
        restTemplate.delete(baseUrl);
        
        // Then - Verify deletion
        ResponseEntity<User> deletedResponse = restTemplate.getForEntity(baseUrl, User.class);
        assertThat(deletedResponse.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }
}

// 4. SLICE TESTING WITH MULTIPLE LAYERS

@SpringBootTest
@TestPropertySource(properties = "spring.datasource.url=jdbc:h2:mem:slicetest")
class UserServiceIntegrationTest {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private UserRepository userRepository;
    
    @MockBean
    private EmailService emailService; // Mock external dependency
    
    @Test
    void shouldCreateUserWithEmailNotification() {
        // Given
        CreateUserRequest request = new CreateUserRequest("service", "service@test.com");
        
        // When
        User createdUser = userService.createUser(request);
        
        // Then
        assertThat(createdUser.getId()).isNotNull();
        assertThat(createdUser.getUsername()).isEqualTo("service");
        
        // Verify database interaction
        Optional<User> savedUser = userRepository.findById(createdUser.getId());
        assertThat(savedUser).isPresent();
        
        // Verify email service interaction
        verify(emailService).sendWelcomeEmail(eq("service@test.com"));
    }
    
    @Test
    void shouldThrowExceptionForDuplicateUsername() {
        // Given
        userRepository.save(new User("duplicate", "first@test.com"));
        CreateUserRequest request = new CreateUserRequest("duplicate", "second@test.com");
        
        // When & Then
        assertThatThrownBy(() -> userService.createUser(request))
            .isInstanceOf(UserAlreadyExistsException.class)
            .hasMessage("Username 'duplicate' already exists");
        
        // Verify no email sent for failed creation
        verifyNoInteractions(emailService);
    }
}

// 5. CONTRACT TESTING WITH EXTERNAL SERVICES

@SpringBootTest
class ExternalServiceIntegrationTest {
    
    @Autowired
    private PaymentService paymentService;
    
    @RegisterExtension
    static WireMockExtension wireMock = WireMockExtension.newInstance()
        .options(wireMockConfig().port(8089))
        .build();
    
    @Test
    void shouldIntegrateWithPaymentGateway() {
        // Given - Mock external payment service
        wireMock.stubFor(post(urlEqualTo("/api/payments"))
            .withRequestBody(containing("amount"))
            .willReturn(aResponse()
                .withStatus(200)
                .withHeader("Content-Type", "application/json")
                .withBody("{\"transactionId\": \"12345\", \"status\": \"SUCCESS\"}")));
        
        // When
        PaymentRequest request = new PaymentRequest(100.0, "USD", "4111111111111111");
        PaymentResponse response = paymentService.processPayment(request);
        
        // Then
        assertThat(response.getTransactionId()).isEqualTo("12345");
        assertThat(response.getStatus()).isEqualTo(PaymentStatus.SUCCESS);
        
        // Verify external service was called correctly
        wireMock.verify(postRequestedFor(urlEqualTo("/api/payments"))
            .withRequestBody(containing("\"amount\":100.0")));
    }
}
```
*Notice: Integration tests are slower but catch real-world issues. Balance them with unit tests for comprehensive coverage.*

</div>

### Test-Driven Development (TDD) {#tdd-advanced}
<!-- tags: tdd, red-green-refactor, design, workflow -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Test-Driven Development (TDD) is a development methodology where tests are written before production code. The cycle follows **Red-Green-Refactor**: write a failing test (Red), write minimal code to pass (Green), then improve the design (Refactor). TDD drives design decisions, ensures high test coverage, and creates a safety net for changes.*

</div>

<div class="runnable-model" data-filter="tdd workflow design">

**Runnable mental model**
```java
// TDD EXAMPLE: Building a Calculator Service

// STEP 1: RED - Write failing test first
class CalculatorServiceTest {
    
    private CalculatorService calculator;
    
    @BeforeEach
    void setUp() {
        calculator = new CalculatorService();
    }
    
    @Test
    void shouldAddTwoNumbers() {
        // Given
        double a = 2.0;
        double b = 3.0;
        
        // When
        double result = calculator.add(a, b);
        
        // Then
        assertThat(result).isEqualTo(5.0);
    }
    // Test fails - CalculatorService doesn't exist yet!
}

// STEP 2: GREEN - Write minimal code to pass
class CalculatorService {
    public double add(double a, double b) {
        return a + b; // Simplest implementation that passes
    }
}

// STEP 3: REFACTOR - Improve design if needed
// Current implementation is simple and clean, no refactoring needed

// CYCLE CONTINUES - Add more functionality

@Test
void shouldSubtractTwoNumbers() {
    // Given
    double a = 5.0;
    double b = 3.0;
    
    // When
    double result = calculator.subtract(a, b);
    
    // Then
    assertThat(result).isEqualTo(2.0);
}
// Test fails - subtract method doesn't exist

// GREEN - Add subtract method
class CalculatorService {
    public double add(double a, double b) {
        return a + b;
    }
    
    public double subtract(double a, double b) {
        return a - b;
    }
}

// More complex TDD example - User Registration

@Test
void shouldRegisterNewUser() {
    // RED: Write the test we want to pass
    // Given
    String username = "john";
    String email = "john@example.com";
    String password = "securePassword123";
    
    // When
    User registeredUser = userRegistrationService.register(username, email, password);
    
    // Then
    assertThat(registeredUser.getUsername()).isEqualTo(username);
    assertThat(registeredUser.getEmail()).isEqualTo(email);
    assertThat(registeredUser.isActive()).isTrue();
    assertThat(registeredUser.getCreatedAt()).isNotNull();
}

// GREEN: Minimal implementation
class UserRegistrationService {
    public User register(String username, String email, String password) {
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setActive(true);
        user.setCreatedAt(LocalDateTime.now());
        return user;
    }
}

// RED: Add validation requirement
@Test
void shouldThrowExceptionForInvalidEmail() {
    // Given
    String username = "john";
    String invalidEmail = "not-an-email";
    String password = "securePassword123";
    
    // When & Then
    assertThatThrownBy(() -> 
        userRegistrationService.register(username, invalidEmail, password))
        .isInstanceOf(InvalidEmailException.class)
        .hasMessage("Invalid email format");
}

// GREEN: Add validation
class UserRegistrationService {
    public User register(String username, String email, String password) {
        if (!isValidEmail(email)) {
            throw new InvalidEmailException("Invalid email format");
        }
        
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setActive(true);
        user.setCreatedAt(LocalDateTime.now());
        return user;
    }
    
    private boolean isValidEmail(String email) {
        return email != null && email.contains("@");
    }
}

// RED: Add password requirements
@Test
void shouldThrowExceptionForWeakPassword() {
    // Given
    String username = "john";
    String email = "john@example.com";
    String weakPassword = "123";
    
    // When & Then
    assertThatThrownBy(() -> 
        userRegistrationService.register(username, email, weakPassword))
        .isInstanceOf(WeakPasswordException.class)
        .hasMessage("Password must be at least 8 characters");
}

// GREEN: Add password validation
class UserRegistrationService {
    public User register(String username, String email, String password) {
        if (!isValidEmail(email)) {
            throw new InvalidEmailException("Invalid email format");
        }
        
        if (!isStrongPassword(password)) {
            throw new WeakPasswordException("Password must be at least 8 characters");
        }
        
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setActive(true);
        user.setCreatedAt(LocalDateTime.now());
        return user;
    }
    
    private boolean isValidEmail(String email) {
        return email != null && email.contains("@");
    }
    
    private boolean isStrongPassword(String password) {
        return password != null && password.length() >= 8;
    }
}

// REFACTOR: Extract validation logic
class EmailValidator {
    public static boolean isValid(String email) {
        return email != null && email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
    }
}

class PasswordValidator {
    public static boolean isStrong(String password) {
        return password != null && 
               password.length() >= 8 && 
               password.matches(".*[A-Z].*") && 
               password.matches(".*[a-z].*") && 
               password.matches(".*\\d.*");
    }
}

class UserRegistrationService {
    public User register(String username, String email, String password) {
        if (!EmailValidator.isValid(email)) {
            throw new InvalidEmailException("Invalid email format");
        }
        
        if (!PasswordValidator.isStrong(password)) {
            throw new WeakPasswordException("Password must be at least 8 characters with uppercase, lowercase, and numbers");
        }
        
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setActive(true);
        user.setCreatedAt(LocalDateTime.now());
        return user;
    }
}

// TDD Benefits demonstrated:
// 1. Test coverage is automatic (100% by design)
// 2. Design emerges naturally from requirements
// 3. Refactoring is safe with comprehensive tests
// 4. Code is testable by design
// 5. Requirements are clearly documented in tests

// Advanced TDD: Outside-In approach
@Test
void shouldProcessUserRegistrationWorkflow() {
    // Start with high-level acceptance test
    // Given
    UserRegistrationRequest request = new UserRegistrationRequest(
        "john", "john@example.com", "SecurePass123"
    );
    
    // When
    UserRegistrationResponse response = userController.register(request);
    
    // Then
    assertThat(response.isSuccess()).isTrue();
    assertThat(response.getUserId()).isNotNull();
    assertThat(response.getMessage()).isEqualTo("User registered successfully");
}

// This drives the design of:
// - UserController
// - UserRegistrationRequest/Response DTOs
// - Service layer interactions
// - Repository layer requirements

// TDD with Mocks for dependencies
@Test
void shouldSendWelcomeEmailAfterRegistration() {
    // Given
    EmailService emailService = mock(EmailService.class);
    UserRepository userRepository = mock(UserRepository.class);
    UserRegistrationService service = new UserRegistrationService(userRepository, emailService);
    
    User savedUser = new User("john", "john@example.com");
    when(userRepository.save(any(User.class))).thenReturn(savedUser);
    
    // When
    service.register("john", "john@example.com", "SecurePass123");
    
    // Then
    verify(emailService).sendWelcomeEmail("john@example.com");
}
```
*Notice: TDD creates better design by forcing you to think about usage before implementation. Start with simplest test and gradually add complexity.*

</div>

### Performance Testing {#performance-testing}
<!-- tags: performance, load-testing, jmeter, benchmarking -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Performance testing validates system behavior under various load conditions. **Load testing** measures normal expected traffic, **Stress testing** pushes beyond normal capacity, **Spike testing** validates sudden traffic increases, and **Volume testing** checks large data processing. Tools include JMeter for HTTP testing, JMH for micro-benchmarks, and Gatling for high-performance scenarios.*

</div>

<div class="runnable-model" data-filter="performance load-testing benchmarking">

**Runnable mental model**
```java
// 1. MICRO-BENCHMARKING WITH JMH (Java Microbenchmark Harness)

@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.NANOSECONDS)
@State(Scope.Benchmark)
@Fork(value = 2, jvmArgs = {"-Xms2G", "-Xmx2G"})
@Warmup(iterations = 3)
@Measurement(iterations = 5)
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
    public String stringConcatenationWithStringJoiner() {
        StringJoiner joiner = new StringJoiner("");
        for (int i = 0; i < ITERATIONS; i++) {
            joiner.add("item" + i);
        }
        return joiner.toString();
    }
    
    public static void main(String[] args) throws Exception {
        Options opt = new OptionsBuilder()
            .include(StringConcatenationBenchmark.class.getSimpleName())
            .build();
        
        new Runner(opt).run();
    }
}

// 2. SPRING BOOT PERFORMANCE TESTING

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(OrderAnnotation.class)
class UserControllerPerformanceTest {
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @LocalServerPort
    private int port;
    
    @Test
    @Order(1)
    void shouldHandleConcurrentUserCreation() throws InterruptedException {
        int numberOfThreads = 50;
        int requestsPerThread = 10;
        CountDownLatch latch = new CountDownLatch(numberOfThreads);
        List<Future<ResponseEntity<User>>> futures = new ArrayList<>();
        ExecutorService executor = Executors.newFixedThreadPool(numberOfThreads);
        
        long startTime = System.currentTimeMillis();
        
        // Submit concurrent requests
        for (int i = 0; i < numberOfThreads; i++) {
            final int threadId = i;
            Future<ResponseEntity<User>> future = executor.submit(() -> {
                try {
                    for (int j = 0; j < requestsPerThread; j++) {
                        CreateUserRequest request = new CreateUserRequest(
                            "user" + threadId + "_" + j,
                            "user" + threadId + "_" + j + "@test.com"
                        );
                        
                        ResponseEntity<User> response = restTemplate.postForEntity(
                            "http://localhost:" + port + "/api/users",
                            request,
                            User.class
                        );
                        
                        // Verify each request succeeds
                        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
                    }
                    return null;
                } finally {
                    latch.countDown();
                }
            });
            futures.add(future);
        }
        
        // Wait for all requests to complete
        boolean completed = latch.await(30, TimeUnit.SECONDS);
        assertThat(completed).isTrue();
        
        long endTime = System.currentTimeMillis();
        long totalTime = endTime - startTime;
        int totalRequests = numberOfThreads * requestsPerThread;
        
        // Performance assertions
        assertThat(totalTime).isLessThan(10000); // Less than 10 seconds
        double throughput = (double) totalRequests / (totalTime / 1000.0);
        assertThat(throughput).isGreaterThan(50); // At least 50 requests per second
        
        System.out.printf("Performance: %d requests in %d ms (%.2f req/sec)%n", 
                         totalRequests, totalTime, throughput);
        
        executor.shutdown();
    }
    
    @Test
    @Order(2)
    void shouldMaintainResponseTimeUnderLoad() {
        int numberOfRequests = 100;
        List<Long> responseTimes = new ArrayList<>();
        
        for (int i = 0; i < numberOfRequests; i++) {
            long startTime = System.nanoTime();
            
            ResponseEntity<String> response = restTemplate.getForEntity(
                "http://localhost:" + port + "/api/users/health",
                String.class
            );
            
            long endTime = System.nanoTime();
            long responseTime = (endTime - startTime) / 1_000_000; // Convert to milliseconds
            
            responseTimes.add(responseTime);
            
            assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        }
        
        // Calculate statistics
        double averageResponseTime = responseTimes.stream()
            .mapToLong(Long::longValue)
            .average()
            .orElse(0.0);
        
        long maxResponseTime = responseTimes.stream()
            .mapToLong(Long::longValue)
            .max()
            .orElse(0L);
        
        // Performance requirements
        assertThat(averageResponseTime).isLessThan(100.0); // Average < 100ms
        assertThat(maxResponseTime).isLessThan(500L); // Max < 500ms
        
        System.out.printf("Response times - Average: %.2fms, Max: %dms%n", 
                         averageResponseTime, maxResponseTime);
    }
}

// 3. DATABASE PERFORMANCE TESTING

@DataJpaTest
@TestPropertySource(properties = {
    "spring.jpa.show-sql=false",
    "logging.level.org.hibernate.SQL=ERROR"
})
class UserRepositoryPerformanceTest {
    
    @Autowired
    private TestEntityManager entityManager;
    
    @Autowired
    private UserRepository userRepository;
    
    @Test
    void shouldPerformBulkOperationsEfficiently() {
        int numberOfUsers = 1000;
        
        // Test bulk insert performance
        long insertStartTime = System.currentTimeMillis();
        
        List<User> users = new ArrayList<>();
        for (int i = 0; i < numberOfUsers; i++) {
            users.add(new User("user" + i, "user" + i + "@test.com"));
        }
        
        userRepository.saveAll(users);
        entityManager.flush();
        
        long insertEndTime = System.currentTimeMillis();
        long insertTime = insertEndTime - insertStartTime;
        
        // Test bulk query performance
        long queryStartTime = System.currentTimeMillis();
        
        List<User> foundUsers = userRepository.findAll();
        
        long queryEndTime = System.currentTimeMillis();
        long queryTime = queryEndTime - queryStartTime;
        
        // Performance assertions
        assertThat(insertTime).isLessThan(5000); // Insert < 5 seconds
        assertThat(queryTime).isLessThan(1000);  // Query < 1 second
        assertThat(foundUsers).hasSize(numberOfUsers);
        
        System.out.printf("Database performance - Insert: %dms, Query: %dms%n", 
                         insertTime, queryTime);
    }
    
    @Test
    void shouldOptimizeQueryPerformance() {
        // Setup test data
        for (int i = 0; i < 100; i++) {
            User user = new User("user" + i, "user" + i + "@domain" + (i % 10) + ".com");
            entityManager.persistAndFlush(user);
        }
        
        // Test different query approaches
        long startTime, endTime;
        
        // Approach 1: Individual queries (N+1 problem)
        startTime = System.nanoTime();
        List<User> users1 = userRepository.findAll();
        for (User user : users1) {
            // Simulating lazy loading
            String email = user.getEmail();
        }
        endTime = System.nanoTime();
        long individualQueryTime = (endTime - startTime) / 1_000_000;
        
        // Approach 2: Optimized query with fetch join
        startTime = System.nanoTime();
        List<User> users2 = userRepository.findAllWithDetails();
        endTime = System.nanoTime();
        long optimizedQueryTime = (endTime - startTime) / 1_000_000;
        
        // Optimized approach should be faster
        assertThat(optimizedQueryTime).isLessThan(individualQueryTime);
        
        System.out.printf("Query optimization - Individual: %dms, Optimized: %dms%n",
                         individualQueryTime, optimizedQueryTime);
    }
}

// 4. MEMORY PERFORMANCE TESTING

class MemoryPerformanceTest {
    
    @Test
    void shouldNotCauseMemoryLeaks() {
        MemoryMXBean memoryBean = ManagementFactory.getMemoryMXBean();
        
        // Baseline memory usage
        System.gc();
        long initialMemory = memoryBean.getHeapMemoryUsage().getUsed();
        
        // Perform memory-intensive operations
        List<String> data = new ArrayList<>();
        for (int i = 0; i < 10000; i++) {
            data.add("Data item " + i);
            
            // Process and remove items to avoid accumulation
            if (i % 1000 == 0) {
                data.clear();
                System.gc();
                Thread.yield(); // Allow GC to run
            }
        }
        
        // Force garbage collection
        data.clear();
        System.gc();
        Thread.sleep(100); // Wait for GC
        
        long finalMemory = memoryBean.getHeapMemoryUsage().getUsed();
        long memoryIncrease = finalMemory - initialMemory;
        
        // Memory should not increase significantly
        assertThat(memoryIncrease).isLessThan(10 * 1024 * 1024); // Less than 10MB increase
        
        System.out.printf("Memory usage - Initial: %d bytes, Final: %d bytes, Increase: %d bytes%n",
                         initialMemory, finalMemory, memoryIncrease);
    }
    
    @Test
    void shouldHandleLargeDataSetsEfficiently() {
        int dataSize = 100_000;
        Runtime runtime = Runtime.getRuntime();
        
        // Test with efficient data structure
        long startTime = System.nanoTime();
        long startMemory = runtime.totalMemory() - runtime.freeMemory();
        
        // Use efficient data structures
        TIntObjectHashMap<String> efficientMap = new TIntObjectHashMap<>();
        for (int i = 0; i < dataSize; i++) {
            efficientMap.put(i, "value" + i);
        }
        
        long endTime = System.nanoTime();
        long endMemory = runtime.totalMemory() - runtime.freeMemory();
        
        long processingTime = (endTime - startTime) / 1_000_000;
        long memoryUsed = endMemory - startMemory;
        
        // Performance expectations
        assertThat(processingTime).isLessThan(1000); // Less than 1 second
        assertThat(memoryUsed).isLessThan(50 * 1024 * 1024); // Less than 50MB
        
        System.out.printf("Large dataset performance - Time: %dms, Memory: %d bytes%n",
                         processingTime, memoryUsed);
        
        efficientMap.clear();
    }
}
```
*Notice: Performance testing should be automated and integrated into CI/CD pipelines to catch regressions early.*

</div>

---

### Advanced Testing Strategies {#advanced-testing-strategies}
<!-- tags: testing-strategies, test-architecture, enterprise-testing, test-automation -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Advanced testing strategies encompass comprehensive approaches to testing complex enterprise applications, including test architecture design, sophisticated automation frameworks, and specialized testing techniques**. **Test architecture patterns**: hexagonal testing, test doubles hierarchies, test data management strategies. **Property-based testing**: generating test cases automatically based on properties and invariants. **Contract testing**: verifying API contracts between services in microservices architectures. **Mutation testing**: evaluating test quality by introducing code mutations. **Chaos engineering**: testing system resilience through controlled failure injection. **Performance testing**: load testing, stress testing, capacity planning with realistic scenarios.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **System reliability**: ensure applications work correctly under various conditions
- **Continuous delivery**: enable safe and frequent deployments
- **Quality assurance**: maintain high code quality as systems grow in complexity
- **Risk mitigation**: identify and address potential failures before production

</div>

<div class="runnable-model" data-filter="advanced-testing">

**Runnable mental model**
```java
// === PROPERTY-BASED TESTING ===

import net.jqwik.api.*;
import net.jqwik.api.constraints.*;

public class PropertyBasedTestingDemo {
    
    // Traditional unit test - tests specific examples
    @Test
    void shouldReverseStringCorrectly() {
        assertEquals("cba", StringUtils.reverse("abc"));
        assertEquals("", StringUtils.reverse(""));
        assertEquals("a", StringUtils.reverse("a"));
    }
    
    // Property-based test - tests properties that should always hold
    @Property
    void reverseTwiceShouldReturnOriginal(@ForAll String input) {
        String reversed = StringUtils.reverse(input);
        String doubleReversed = StringUtils.reverse(reversed);
        
        // Property: reverse(reverse(x)) == x
        assertEquals(input, doubleReversed);
    }
    
    @Property
    void reverseShouldPreserveLength(@ForAll String input) {
        String reversed = StringUtils.reverse(input);
        
        // Property: length is preserved
        assertEquals(input.length(), reversed.length());
    }
    
    @Property
    void sortedListShouldBeOrderedCorrectly(@ForAll("integerLists") List<Integer> input) {
        List<Integer> sorted = new ArrayList<>(input);
        Collections.sort(sorted);
        
        // Property: sorted list should be in ascending order
        for (int i = 0; i < sorted.size() - 1; i++) {
            assertTrue(sorted.get(i) <= sorted.get(i + 1));
        }
        
        // Property: sorted list should contain same elements
        assertEquals(input.size(), sorted.size());
        assertTrue(sorted.containsAll(input));
    }
    
    @Provide
    Arbitrary<List<Integer>> integerLists() {
        return Arbitraries.integers().between(-1000, 1000).list().ofMaxSize(100);
    }
    
    // Testing mathematical properties
    @Property
    void additionShouldBeCommutative(@ForAll @IntRange(min = -1000, max = 1000) int a,
                                   @ForAll @IntRange(min = -1000, max = 1000) int b) {
        // Property: a + b == b + a
        assertEquals(a + b, b + a);
    }
    
    @Property
    void multiplicationShouldBeAssociative(@ForAll @IntRange(min = -100, max = 100) int a,
                                         @ForAll @IntRange(min = -100, max = 100) int b,
                                         @ForAll @IntRange(min = -100, max = 100) int c) {
        // Property: (a * b) * c == a * (b * c)
        assertEquals((a * b) * c, a * (b * c));
    }
}

// === CONTRACT TESTING ===

// Provider side - API service
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long id) {
        // Implementation
        return ResponseEntity.ok(userService.findById(id));
    }
    
    @PostMapping
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody CreateUserRequest request) {
        // Implementation
        return ResponseEntity.status(HttpStatus.CREATED)
                           .body(userService.create(request));
    }
}

// Provider contract test using Pact
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@PactVerificationTest
@Provider("user-service")
@PactBroker(url = "http://pact-broker:9292")
public class UserServiceContractTest {
    
    @TestTemplate
    @ExtendWith(PactVerificationInvocationContextProvider.class)
    void verifyPact(PactVerificationContext context) {
        context.verifyInteraction();
    }
    
    @BeforeEach
    void setupTestData(PactVerificationContext context) {
        // Setup test data based on provider state
        String providerState = context.getProviderState();
        
        switch (providerState) {
            case "user exists":
                userRepository.save(new User(1L, "John Doe", "john@example.com"));
                break;
            case "user does not exist":
                userRepository.deleteAll();
                break;
        }
    }
}

// Consumer side - client service
@Component
public class UserServiceClient {
    
    @Autowired
    private RestTemplate restTemplate;
    
    @Value("${user.service.url}")
    private String userServiceUrl;
    
    public UserDto getUser(Long id) {
        return restTemplate.getForObject(userServiceUrl + "/api/users/" + id, UserDto.class);
    }
    
    public UserDto createUser(CreateUserRequest request) {
        return restTemplate.postForObject(userServiceUrl + "/api/users", request, UserDto.class);
    }
}

// Consumer contract test
@ExtendWith(PactConsumerTestExt.class)
@PactTestFor(providerName = "user-service")
public class UserServiceClientContractTest {
    
    @MockBean
    private UserServiceClient userServiceClient;
    
    @Pact(consumer = "order-service")
    public RequestResponsePact getUserPact(PactDslWithProvider builder) {
        return builder
            .given("user exists")
            .uponReceiving("a request for user")
            .path("/api/users/1")
            .method("GET")
            .willRespondWith()
            .status(200)
            .headers(Map.of("Content-Type", "application/json"))
            .body(LambdaDsl.newJsonBody(body -> body
                .numberType("id", 1L)
                .stringType("name", "John Doe")
                .stringType("email", "john@example.com")
            ).build())
            .toPact();
    }
    
    @Test
    @PactTestFor(pactMethod = "getUserPact")
    void shouldGetUserSuccessfully(MockServer mockServer) {
        // Configure client to use mock server
        userServiceClient = new UserServiceClient();
        ReflectionTestUtils.setField(userServiceClient, "userServiceUrl", mockServer.getUrl());
        
        // Execute test
        UserDto user = userServiceClient.getUser(1L);
        
        // Verify
        assertNotNull(user);
        assertEquals(1L, user.getId());
        assertEquals("John Doe", user.getName());
        assertEquals("john@example.com", user.getEmail());
    }
}

// === MUTATION TESTING ===

// Original code under test
public class Calculator {
    public int add(int a, int b) {
        return a + b; // Mutation: could be changed to a - b, a * b, etc.
    }
    
    public int divide(int a, int b) {
        if (b == 0) { // Mutation: could be changed to b != 0, b > 0, etc.
            throw new IllegalArgumentException("Division by zero");
        }
        return a / b; // Mutation: could be changed to a % b, a + b, etc.
    }
    
    public boolean isPositive(int number) {
        return number > 0; // Mutation: could be changed to >=, <, !=, etc.
    }
}

// Tests that should kill mutations
public class CalculatorMutationTest {
    
    private Calculator calculator = new Calculator();
    
    @Test
    void shouldAddCorrectly() {
        // This test should kill a - b mutation
        assertEquals(8, calculator.add(5, 3));
        assertEquals(0, calculator.add(-2, 2));
        assertEquals(-5, calculator.add(-3, -2));
    }
    
    @Test
    void shouldDivideCorrectly() {
        // This test should kill various divide mutations
        assertEquals(2, calculator.divide(6, 3));
        assertEquals(-2, calculator.divide(-6, 3));
        assertEquals(0, calculator.divide(0, 5));
    }
    
    @Test
    void shouldThrowExceptionForZeroDivision() {
        // This test should kill b != 0 mutation
        assertThrows(IllegalArgumentException.class, () -> calculator.divide(5, 0));
    }
    
    @Test
    void shouldIdentifyPositiveNumbers() {
        // This test should kill >= mutation
        assertTrue(calculator.isPositive(1));
        assertFalse(calculator.isPositive(0)); // Critical: kills >= mutation
        assertFalse(calculator.isPositive(-1));
    }
}

// PIT mutation testing configuration (build.gradle)
/*
plugins {
    id 'info.solidsoft.pitest' version '1.7.4'
}

pitest {
    targetClasses = ['com.example.calculator.*']
    testSourceDirs = [file('src/test/java')]
    outputFormats = ['XML', 'HTML']
    timestampedReports = false
    mutationThreshold = 80 // Fail build if mutation coverage < 80%
}
*/

// === CHAOS ENGINEERING ===

@SpringBootTest
@TestPropertySource(properties = {
    "spring.datasource.url=jdbc:h2:mem:testdb",
    "chaos.monkey.enabled=true"
})
public class ChaosEngineeringTest {
    
    @Autowired
    private OrderService orderService;
    
    @Autowired
    private ChaosMonkey chaosMonkey;
    
    @Test
    void shouldHandleDatabaseFailuresGracefully() {
        // Configure chaos monkey to simulate database failures
        chaosMonkey.enableChaosForRepository();
        chaosMonkey.setLatencyAttackProperties(1000, 2000); // 1-2 second delays
        
        // Test system behavior under database stress
        List<CompletableFuture<OrderResult>> futures = new ArrayList<>();
        
        for (int i = 0; i < 100; i++) {
            futures.add(CompletableFuture.supplyAsync(() -> {
                try {
                    return orderService.createOrder(createTestOrder());
                } catch (Exception e) {
                    return OrderResult.failure(e.getMessage());
                }
            }));
        }
        
        // Collect results
        List<OrderResult> results = futures.stream()
            .map(CompletableFuture::join)
            .collect(Collectors.toList());
        
        // Verify resilience
        long successCount = results.stream().filter(OrderResult::isSuccess).count();
        long failureCount = results.stream().filter(r -> !r.isSuccess()).count();
        
        // System should handle failures gracefully
        assertTrue(successCount > 0, "System should handle some requests even under chaos");
        assertTrue(failureCount < 50, "System should not fail more than 50% of requests");
        
        // Verify circuit breaker behavior
        verify(circuitBreakerRegistry, atLeastOnce()).circuitBreaker("database");
    }
    
    @Test
    void shouldRecoverFromNetworkPartitions() {
        // Simulate network partitions
        chaosMonkey.enableNetworkLatency(5000); // 5 second delays
        
        // Test service discovery and recovery
        assertDoesNotThrow(() -> {
            orderService.processOrdersWithRetry(createTestOrders());
        });
        
        // Verify recovery mechanisms
        assertTrue(orderService.isHealthy(), "Service should recover after network issues");
    }
}

// === ARCHITECTURAL TESTING ===

public class ArchitectureTest {
    
    private JavaClasses importedClasses = ClassFileImporter()
        .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
        .importPackages("com.example");
    
    @Test
    void layersShouldBeRespected() {
        layeredArchitecture()
            .layer("Controller").definedBy("..controller..")
            .layer("Service").definedBy("..service..")
            .layer("Repository").definedBy("..repository..")
            
            .whereLayer("Controller").mayNotBeAccessedByAnyLayer()
            .whereLayer("Service").mayOnlyBeAccessedByLayers("Controller")
            .whereLayer("Repository").mayOnlyBeAccessedByLayers("Service")
            
            .check(importedClasses);
    }
    
    @Test
    void servicesShouldNotDependOnControllers() {
        noClasses()
            .that().resideInAPackage("..service..")
            .should().dependOnClassesThat().resideInAPackage("..controller..")
            .check(importedClasses);
    }
    
    @Test
    void repositoriesShouldBeInterfaces() {
        classes()
            .that().resideInAPackage("..repository..")
            .and().haveSimpleNameEndingWith("Repository")
            .should().beInterfaces()
            .check(importedClasses);
    }
    
    @Test
    void servicesShouldBeAnnotatedWithService() {
        classes()
            .that().resideInAPackage("..service..")
            .and().haveSimpleNameEndingWith("Service")
            .should().beAnnotatedWith(Service.class)
            .check(importedClasses);
    }
    
    @Test
    void noClassShouldUseFieldInjection() {
        noFields()
            .that().areAnnotatedWith(Autowired.class)
            .should().beDeclaredInClassesThat().resideInAPackage("com.example")
            .because("Field injection should be avoided in favor of constructor injection")
            .check(importedClasses);
    }
}

// === PERFORMANCE TESTING FRAMEWORK ===

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class PerformanceTestSuite {
    
    private PerformanceTestRunner testRunner;
    private MetricsCollector metricsCollector;
    
    @BeforeAll
    void setupPerformanceTests() {
        testRunner = new PerformanceTestRunner();
        metricsCollector = new MetricsCollector();
    }
    
    @Test
    @LoadTest(
        users = 100,
        rampUpTime = "30s",
        duration = "5m",
        thinkTime = "1s"
    )
    void shouldHandleConcurrentUserLoad() {
        LoadTestConfiguration config = LoadTestConfiguration.builder()
            .withUsers(100)
            .withRampUpTime(Duration.ofSeconds(30))
            .withDuration(Duration.ofMinutes(5))
            .withThinkTime(Duration.ofSeconds(1))
            .build();
        
        LoadTestResult result = testRunner.runLoadTest(config, () -> {
            // Simulate user behavior
            UserSession session = createUserSession();
            session.login();
            session.browseProducts();
            session.addToCart();
            session.checkout();
            session.logout();
        });
        
        // Performance assertions
        assertThat(result.getAverageResponseTime()).isLessThan(Duration.ofMillis(500));
        assertThat(result.get95thPercentileResponseTime()).isLessThan(Duration.ofSeconds(2));
        assertThat(result.getErrorRate()).isLessThan(1.0); // Less than 1% errors
        assertThat(result.getThroughput()).isGreaterThan(50); // More than 50 transactions/second
        
        // Resource utilization assertions
        SystemMetrics metrics = metricsCollector.collectMetrics();
        assertThat(metrics.getCpuUsage()).isLessThan(80.0); // Less than 80% CPU
        assertThat(metrics.getMemoryUsage()).isLessThan(85.0); // Less than 85% memory
    }
    
    @Test
    @StressTest(
        startUsers = 1,
        maxUsers = 1000,
        incrementStep = 50,
        incrementInterval = "30s"
    )
    void shouldFindSystemBreakingPoint() {
        StressTestResult result = testRunner.runStressTest(
            StressTestConfiguration.builder()
                .withStartUsers(1)
                .withMaxUsers(1000)
                .withIncrementStep(50)
                .withIncrementInterval(Duration.ofSeconds(30))
                .build(),
            this::simulateUserAction
        );
        
        // Document breaking point
        int breakingPoint = result.getBreakingPointUsers();
        Duration maxSustainableResponseTime = result.getMaxSustainableResponseTime();
        
        assertThat(breakingPoint).isGreaterThan(200); // Should handle at least 200 users
        
        System.out.printf("System breaking point: %d concurrent users%n", breakingPoint);
        System.out.printf("Max sustainable response time: %dms%n", 
                         maxSustainableResponseTime.toMillis());
    }
    
    @Test
    @SpikeTest(
        baselineUsers = 50,
        spikeUsers = 500,
        spikeDuration = "2m"
    )
    void shouldHandleTrafficSpikes() {
        SpikeTestResult result = testRunner.runSpikeTest(
            SpikeTestConfiguration.builder()
                .withBaselineUsers(50)
                .withSpikeUsers(500)
                .withSpikeDuration(Duration.ofMinutes(2))
                .build(),
            this::simulateUserAction
        );
        
        // Verify system recovers from spike
        assertThat(result.getRecoveryTime()).isLessThan(Duration.ofMinutes(1));
        assertThat(result.getErrorRateDuringSpike()).isLessThan(5.0); // Less than 5% errors during spike
        assertThat(result.getSystemStabilityAfterSpike()).isTrue();
    }
    
    @Test
    @VolumeTest(dataSize = "10GB", recordCount = 1_000_000)
    void shouldHandleLargeDataVolumes() {
        // Test with large dataset
        List<TestRecord> largeDataset = generateTestData(1_000_000);
        
        VolumeTestResult result = testRunner.runVolumeTest(() -> {
            dataService.processBatch(largeDataset);
        });
        
        assertThat(result.getProcessingTime()).isLessThan(Duration.ofMinutes(10));
        assertThat(result.getMemoryUsage()).isLessThan(2_000_000_000L); // Less than 2GB
        assertThat(result.getDataIntegrity()).isTrue(); // All data processed correctly
    }
    
    private void simulateUserAction() {
        // Simulate realistic user behavior with think time
        try {
            restTemplate.getForObject("/api/products", ProductList.class);
            Thread.sleep(1000);
            
            restTemplate.getForObject("/api/products/1", Product.class);
            Thread.sleep(500);
            
            restTemplate.postForObject("/api/cart/add", 
                new AddToCartRequest(1L, 1), CartResponse.class);
            Thread.sleep(2000);
            
        } catch (Exception e) {
            // Record errors for analysis
            metricsCollector.recordError(e);
        }
    }
}

// === TEST DATA MANAGEMENT ===

@Component
public class TestDataFactory {
    
    private static final Faker faker = new Faker();
    
    public User createTestUser() {
        return User.builder()
            .name(faker.name().fullName())
            .email(faker.internet().emailAddress())
            .age(faker.number().numberBetween(18, 80))
            .registrationDate(faker.date().past(365, TimeUnit.DAYS).toInstant().atZone(ZoneId.systemDefault()).toLocalDate())
            .build();
    }
    
    public Product createTestProduct() {
        return Product.builder()
            .name(faker.commerce().productName())
            .price(BigDecimal.valueOf(faker.number().randomDouble(2, 10, 1000)))
            .category(faker.commerce().department())
            .description(faker.lorem().paragraph())
            .inStock(faker.bool().bool())
            .build();
    }
    
    public Order createTestOrder(User user, List<Product> products) {
        return Order.builder()
            .userId(user.getId())
            .orderDate(LocalDateTime.now())
            .items(products.stream()
                .map(product -> OrderItem.builder()
                    .productId(product.getId())
                    .quantity(faker.number().numberBetween(1, 5))
                    .unitPrice(product.getPrice())
                    .build())
                .collect(Collectors.toList()))
            .status(OrderStatus.PENDING)
            .build();
    }
    
    @EventListener
    @Async
    public void handleTestDataCleanup(TestExecutionEvent event) {
        if (event.getType() == TestExecutionEvent.Type.FINISHED) {
            // Clean up test data after each test
            testDataCleanupService.cleanupTestData();
        }
    }
}

// Test database state management
@TestConfiguration
public class TestDatabaseConfig {
    
    @Bean
    @Primary
    public DataSource testDataSource() {
        return new EmbeddedDatabaseBuilder()
            .setType(EmbeddedDatabaseType.H2)
            .addScript("schema.sql")
            .addScript("test-data.sql")
            .build();
    }
    
    @Bean
    public TestDatabaseManager testDatabaseManager() {
        return new TestDatabaseManager();
    }
}

@Component
public class TestDatabaseManager {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public void saveSnapshot(String snapshotName) {
        // Save current database state
        jdbcTemplate.execute("CREATE ALIAS IF NOT EXISTS BACKUP_TO AS 'BACKUP TO ?'");
        jdbcTemplate.execute("CALL BACKUP_TO('backup/" + snapshotName + ".zip')");
    }
    
    public void restoreSnapshot(String snapshotName) {
        // Restore database to saved state
        jdbcTemplate.execute("DROP ALL OBJECTS");
        jdbcTemplate.execute("RESTORE FROM 'backup/" + snapshotName + ".zip'");
    }
    
    public void resetToCleanState() {
        // Reset database to initial clean state
        jdbcTemplate.execute("DELETE FROM orders");
        jdbcTemplate.execute("DELETE FROM products");
        jdbcTemplate.execute("DELETE FROM users");
        jdbcTemplate.execute("ALTER SEQUENCE user_seq RESTART WITH 1");
        jdbcTemplate.execute("ALTER SEQUENCE product_seq RESTART WITH 1");
        jdbcTemplate.execute("ALTER SEQUENCE order_seq RESTART WITH 1");
    }
}
```
*Notice: Advanced testing strategies require significant investment in tooling and infrastructure but provide comprehensive quality assurance for complex systems.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Testing implementation details**: Testing internal methods instead of public behavior
- **Over-mocking**: Using too many mocks, leading to tests that don't verify real interactions
- **Flaky tests**: Tests that randomly fail due to timing, dependencies, or environment issues
- **Poor test data management**: Using production data or not properly isolating test data
- **Inadequate performance testing**: Only testing happy path scenarios under ideal conditions
- **Ignoring test maintenance**: Letting test code quality degrade over time

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Enterprise applications**: comprehensive testing for mission-critical systems
- **Microservices architectures**: contract testing and service integration verification
- **High-performance systems**: load testing and capacity planning
- **Financial systems**: chaos engineering and resilience testing
- **DevOps pipelines**: automated testing throughout deployment pipeline

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"How do you test a microservices architecture?"** → Contract testing, integration strategies, service boundaries
2. **"Explain your approach to performance testing"** → Load testing strategies, metrics collection, bottleneck identification
3. **"How do you ensure test quality?"** → Mutation testing, code coverage analysis, test review processes
4. **"Design a testing strategy for a new feature"** → Test pyramid, risk assessment, automation approach
5. **"How do you handle flaky tests?"** → Root cause analysis, test isolation, environment management

</div>

<div class="concept-section related-concepts">

🔗 **Related concepts**  
`Test-Driven Development` · `Continuous Integration` · `Quality Assurance` · `DevOps` · `Software Architecture`

</div>

<div class="tags">
  <span class="tag">testing-strategies</span>
  <span class="tag">test-architecture</span>
  <span class="tag">enterprise-testing</span>
  <span class="tag">test-automation</span>
  <span class="tag">performance-testing</span>
  <span class="tag">medior</span>
</div>

## Related Topics

- [Java Fundamentals](/theory/java) - Language-specific testing implementation
- [Spring Framework](/theory/spring) - Spring Boot testing features
- [OOP Principles](/theory/oop) - Testing object-oriented systems
- [Clean Code](/theory/clean-code) - Writing testable code

## Summary

Software testing is a critical discipline that ensures application quality, reliability, and maintainability. A comprehensive testing strategy encompasses multiple levels and types of testing, each serving specific purposes in the overall quality assurance process.

**Testing Fundamentals**: The testing pyramid guides test distribution with many unit tests, fewer integration tests, and minimal end-to-end tests. Unit tests provide fast feedback and enable confident refactoring, while integration tests verify component interactions and end-to-end tests validate complete user workflows.

**Advanced Testing Strategies**: Property-based testing validates code behavior across broad input ranges, contract testing ensures API compatibility in distributed systems, and mutation testing evaluates test suite quality. Chaos engineering builds resilience through controlled failure injection.

**Test Architecture**: Well-designed test architectures separate concerns, manage test data effectively, and provide reliable feedback loops. Architectural testing enforces design rules and prevents degradation over time.

**Performance Testing**: Load testing, stress testing, and volume testing ensure applications meet performance requirements under various conditions. Performance testing should be integrated into development workflows to catch regressions early.

**Quality Assurance**: Comprehensive testing strategies combine automated testing at multiple levels with manual exploratory testing. Test quality itself must be monitored through coverage analysis, mutation testing, and regular test suite maintenance.

**Best Practices**: Effective testing requires clear naming conventions, proper test isolation, realistic test data, and continuous improvement of test processes. Tests should be treated as first-class code with the same quality standards as production code.

Modern software development relies on automated testing to enable rapid delivery while maintaining quality. A mature testing strategy adapts to changing requirements, scales with system complexity, and provides confidence for continuous delivery practices.

---

### Test-Driven Development (TDD) {#test-driven-development}
<!-- tags: tdd, red-green-refactor, development-methodology -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Test-Driven Development (TDD) is a development methodology where tests are written before the production code, following the Red-Green-Refactor cycle**. **Red phase**: write a failing test that describes the desired functionality. **Green phase**: write the minimal code necessary to make the test pass. **Refactor phase**: improve the code quality while keeping tests green. **Outside-in TDD**: start with acceptance tests and work inward to unit tests. **Inside-out TDD**: start with unit tests and build up to integration tests. **Benefits**: better design, higher test coverage, faster feedback loops, living documentation.

</div>

<div class="runnable-model" data-filter="tdd">

**Runnable mental model**
```java
// === RED-GREEN-REFACTOR CYCLE ===

// RED: Write a failing test first
@Test
void shouldCalculateOrderTotal() {
    // Test doesn't compile yet - OrderCalculator doesn't exist
    OrderCalculator calculator = new OrderCalculator();
    Order order = new Order();
    order.addItem(new OrderItem("Product A", 10.00, 2));
    order.addItem(new OrderItem("Product B", 15.50, 1));
    
    BigDecimal total = calculator.calculateTotal(order);
    
    assertEquals(new BigDecimal("35.50"), total);
}

// GREEN: Write minimal code to make test pass
public class OrderCalculator {
    public BigDecimal calculateTotal(Order order) {
        return new BigDecimal("35.50"); // Hardcoded to make test pass
    }
}

// Add another test to force better implementation
@Test
void shouldCalculateDifferentOrderTotal() {
    OrderCalculator calculator = new OrderCalculator();
    Order order = new Order();
    order.addItem(new OrderItem("Product C", 5.00, 3));
    
    BigDecimal total = calculator.calculateTotal(order);
    
    assertEquals(new BigDecimal("15.00"), total);
}

// GREEN: Implement proper calculation
public class OrderCalculator {
    public BigDecimal calculateTotal(Order order) {
        return order.getItems().stream()
            .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}

// REFACTOR: Improve design
public class OrderCalculator {
    public BigDecimal calculateTotal(Order order) {
        return order.getItems().stream()
            .map(OrderItem::getSubtotal)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}

public class OrderItem {
    private String name;
    private BigDecimal price;
    private int quantity;
    
    // Constructor and getters...
    
    public BigDecimal getSubtotal() {
        return price.multiply(BigDecimal.valueOf(quantity));
    }
}

// === OUTSIDE-IN TDD EXAMPLE ===

// Start with acceptance test (outside)
@Test
@IntegrationTest
void shouldProcessOrderSuccessfully() {
    // Given: customer with valid payment method
    Customer customer = createCustomerWithValidPayment();
    Product product = createAvailableProduct();
    
    // When: customer places order
    OrderRequest request = OrderRequest.builder()
        .customerId(customer.getId())
        .items(List.of(new OrderItemRequest(product.getId(), 2)))
        .build();
    
    OrderResponse response = orderService.processOrder(request);
    
    // Then: order is processed successfully
    assertEquals(OrderStatus.CONFIRMED, response.getStatus());
    assertNotNull(response.getOrderId());
    assertTrue(response.getTotal().compareTo(BigDecimal.ZERO) > 0);
}

// Work inward - implement OrderService
@Test
void shouldValidateOrderRequest() {
    OrderService orderService = new OrderService();
    OrderRequest invalidRequest = new OrderRequest(); // Missing required fields
    
    assertThrows(ValidationException.class, () -> 
        orderService.processOrder(invalidRequest));
}

@Test
void shouldCalculateOrderTotal() {
    OrderService orderService = new OrderService(orderCalculator, inventoryService, paymentService);
    OrderRequest request = createValidOrderRequest();
    
    // Mock dependencies for unit test
    when(orderCalculator.calculateTotal(any())).thenReturn(new BigDecimal("50.00"));
    when(inventoryService.isAvailable(any(), anyInt())).thenReturn(true);
    when(paymentService.processPayment(any(), any())).thenReturn(PaymentResult.success());
    
    OrderResponse response = orderService.processOrder(request);
    
    assertEquals(new BigDecimal("50.00"), response.getTotal());
}

// === INSIDE-OUT TDD EXAMPLE ===

// Start with unit tests (inside)
@Test
void shouldCreateEmptyShoppingCart() {
    ShoppingCart cart = new ShoppingCart();
    
    assertTrue(cart.isEmpty());
    assertEquals(0, cart.getItemCount());
    assertEquals(BigDecimal.ZERO, cart.getTotal());
}

@Test
void shouldAddItemToCart() {
    ShoppingCart cart = new ShoppingCart();
    Product product = new Product("123", "Test Product", new BigDecimal("10.00"));
    
    cart.addItem(product, 2);
    
    assertFalse(cart.isEmpty());
    assertEquals(1, cart.getItemCount());
    assertEquals(new BigDecimal("20.00"), cart.getTotal());
}

// Build up to integration tests
@Test
void shouldPersistCartItems() {
    ShoppingCart cart = new ShoppingCart();
    Product product = createProduct();
    cart.addItem(product, 1);
    
    cartRepository.save(cart);
    ShoppingCart retrieved = cartRepository.findById(cart.getId());
    
    assertEquals(1, retrieved.getItemCount());
}

// === TDD WITH MOCKITO ===

public class UserServiceTDDTest {
    
    @Mock
    private UserRepository userRepository;
    
    @Mock
    private EmailService emailService;
    
    private UserService userService;
    
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userService = new UserService(userRepository, emailService);
    }
    
    @Test
    void shouldCreateNewUser() {
        // RED: Test fails - UserService.createUser doesn't exist
        CreateUserRequest request = new CreateUserRequest("john@example.com", "John Doe");
        
        when(userRepository.existsByEmail("john@example.com")).thenReturn(false);
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User user = invocation.getArgument(0);
            user.setId(1L);
            return user;
        });
        
        User result = userService.createUser(request);
        
        assertNotNull(result);
        assertEquals("john@example.com", result.getEmail());
        assertEquals("John Doe", result.getName());
        verify(emailService).sendWelcomeEmail(result);
    }
    
    @Test
    void shouldNotCreateUserWithDuplicateEmail() {
        CreateUserRequest request = new CreateUserRequest("existing@example.com", "Jane Doe");
        
        when(userRepository.existsByEmail("existing@example.com")).thenReturn(true);
        
        assertThrows(DuplicateEmailException.class, () -> 
            userService.createUser(request));
        
        verify(userRepository, never()).save(any());
        verify(emailService, never()).sendWelcomeEmail(any());
    }
}

// GREEN: Implement UserService to make tests pass
@Service
public class UserService {
    
    private final UserRepository userRepository;
    private final EmailService emailService;
    
    public UserService(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }
    
    public User createUser(CreateUserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateEmailException("Email already exists: " + request.getEmail());
        }
        
        User user = new User(request.getEmail(), request.getName());
        User savedUser = userRepository.save(user);
        
        emailService.sendWelcomeEmail(savedUser);
        
        return savedUser;
    }
}

// === TDD FOR ERROR HANDLING ===

@Test
void shouldHandleNetworkTimeouts() {
    // RED: Test for timeout handling
    PaymentGateway paymentGateway = new PaymentGateway();
    PaymentRequest request = new PaymentRequest("card123", new BigDecimal("100.00"));
    
    // Simulate network timeout
    when(httpClient.post(any(), any()))
        .thenThrow(new SocketTimeoutException("Request timeout"));
    
    PaymentResult result = paymentGateway.processPayment(request);
    
    assertEquals(PaymentStatus.FAILED, result.getStatus());
    assertEquals("TIMEOUT", result.getErrorCode());
    assertTrue(result.isRetryable());
}

// GREEN: Implement timeout handling
public class PaymentGateway {
    
    public PaymentResult processPayment(PaymentRequest request) {
        try {
            HttpResponse response = httpClient.post("/payments", request);
            return processResponse(response);
        } catch (SocketTimeoutException e) {
            return PaymentResult.builder()
                .status(PaymentStatus.FAILED)
                .errorCode("TIMEOUT")
                .retryable(true)
                .build();
        } catch (IOException e) {
            return PaymentResult.builder()
                .status(PaymentStatus.FAILED)
                .errorCode("NETWORK_ERROR")
                .retryable(true)
                .build();
        }
    }
}

// === TDD FOR COMPLEX BUSINESS LOGIC ===

@Test
void shouldCalculateDiscountForLoyalCustomer() {
    // RED: Complex discount logic
    DiscountCalculator calculator = new DiscountCalculator();
    Customer loyalCustomer = Customer.builder()
        .membershipLevel(MembershipLevel.GOLD)
        .yearsSinceMembership(3)
        .totalSpent(new BigDecimal("5000.00"))
        .build();
    
    Order order = Order.builder()
        .total(new BigDecimal("100.00"))
        .customer(loyalCustomer)
        .build();
    
    Discount discount = calculator.calculateDiscount(order);
    
    assertEquals(new BigDecimal("15.00"), discount.getAmount()); // 15% for gold member
    assertEquals(DiscountType.LOYALTY, discount.getType());
}

@Test
void shouldApplySeasonalDiscountForNewCustomer() {
    DiscountCalculator calculator = new DiscountCalculator();
    Customer newCustomer = Customer.builder()
        .membershipLevel(MembershipLevel.BRONZE)
        .yearsSinceMembership(0)
        .totalSpent(BigDecimal.ZERO)
        .build();
    
    Order order = Order.builder()
        .total(new BigDecimal("50.00"))
        .customer(newCustomer)
        .orderDate(LocalDate.of(2023, 12, 25)) // Christmas
        .build();
    
    Discount discount = calculator.calculateDiscount(order);
    
    assertEquals(new BigDecimal("5.00"), discount.getAmount()); // 10% seasonal discount
    assertEquals(DiscountType.SEASONAL, discount.getType());
}

// GREEN: Implement complex discount logic step by step
public class DiscountCalculator {
    
    public Discount calculateDiscount(Order order) {
        Customer customer = order.getCustomer();
        BigDecimal orderTotal = order.getTotal();
        
        // Loyalty discount takes precedence
        if (customer.getMembershipLevel() == MembershipLevel.GOLD) {
            BigDecimal discountAmount = orderTotal.multiply(new BigDecimal("0.15"));
            return new Discount(DiscountType.LOYALTY, discountAmount);
        }
        
        if (customer.getMembershipLevel() == MembershipLevel.SILVER) {
            BigDecimal discountAmount = orderTotal.multiply(new BigDecimal("0.10"));
            return new Discount(DiscountType.LOYALTY, discountAmount);
        }
        
        // Seasonal discount for non-loyal customers
        if (isHolidaySeason(order.getOrderDate())) {
            BigDecimal discountAmount = orderTotal.multiply(new BigDecimal("0.10"));
            return new Discount(DiscountType.SEASONAL, discountAmount);
        }
        
        return Discount.none();
    }
    
    private boolean isHolidaySeason(LocalDate orderDate) {
        int month = orderDate.getMonthValue();
        int day = orderDate.getDayOfMonth();
        
        // Christmas season
        if (month == 12 && day >= 20) return true;
        // New Year
        if (month == 1 && day <= 5) return true;
        
        return false;
    }
}

// REFACTOR: Extract strategy pattern
public interface DiscountStrategy {
    Discount calculateDiscount(Order order);
    boolean isApplicable(Order order);
}

@Component
public class LoyaltyDiscountStrategy implements DiscountStrategy {
    @Override
    public boolean isApplicable(Order order) {
        return order.getCustomer().getMembershipLevel() != MembershipLevel.BRONZE;
    }
    
    @Override
    public Discount calculateDiscount(Order order) {
        MembershipLevel level = order.getCustomer().getMembershipLevel();
        BigDecimal rate = level == MembershipLevel.GOLD ? new BigDecimal("0.15") : new BigDecimal("0.10");
        BigDecimal amount = order.getTotal().multiply(rate);
        return new Discount(DiscountType.LOYALTY, amount);
    }
}

@Component
public class SeasonalDiscountStrategy implements DiscountStrategy {
    @Override
    public boolean isApplicable(Order order) {
        return isHolidaySeason(order.getOrderDate());
    }
    
    @Override
    public Discount calculateDiscount(Order order) {
        BigDecimal amount = order.getTotal().multiply(new BigDecimal("0.10"));
        return new Discount(DiscountType.SEASONAL, amount);
    }
    
    private boolean isHolidaySeason(LocalDate orderDate) {
        // Implementation...
    }
}

@Service
public class DiscountCalculator {
    
    private final List<DiscountStrategy> strategies;
    
    public DiscountCalculator(List<DiscountStrategy> strategies) {
        this.strategies = strategies;
    }
    
    public Discount calculateDiscount(Order order) {
        return strategies.stream()
            .filter(strategy -> strategy.isApplicable(order))
            .findFirst()
            .map(strategy -> strategy.calculateDiscount(order))
            .orElse(Discount.none());
    }
}
```

</div>

---

### Test Automation Frameworks {#test-automation-frameworks}
<!-- tags: test-automation, junit, testng, cucumber, selenium -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Test automation frameworks provide structure and tools for creating, organizing, and executing automated tests**. **JUnit/TestNG**: unit testing frameworks with annotations, assertions, and test lifecycle management. **Cucumber/Gherkin**: behavior-driven development framework using natural language specifications. **Selenium**: web automation framework for end-to-end testing. **REST Assured**: API testing framework for RESTful services. **Test frameworks architecture**: test organization, reporting, parallel execution, data-driven testing capabilities.

</div>

<div class="runnable-model" data-filter="test-automation">

**Runnable mental model**
```java
// === JUNIT 5 ADVANCED FEATURES ===

@TestMethodOrder(OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class AdvancedJUnitTest {
    
    private TestDatabase testDatabase;
    
    @BeforeAll
    void setupDatabase() {
        testDatabase = new TestDatabase();
        testDatabase.initialize();
    }
    
    @BeforeEach
    void prepareTestData() {
        testDatabase.clearData();
        testDatabase.insertTestData();
    }
    
    @Test
    @Order(1)
    @DisplayName("Should create user with valid data")
    @Tag("integration")
    void shouldCreateUserWithValidData() {
        // Test implementation
    }
    
    @ParameterizedTest
    @ValueSource(strings = {"", " ", "invalid-email", "@domain.com"})
    @DisplayName("Should reject invalid email addresses")
    void shouldRejectInvalidEmails(String email) {
        assertThrows(ValidationException.class, () -> 
            userService.createUser(new CreateUserRequest(email, "Test User")));
    }
    
    @ParameterizedTest
    @CsvSource({
        "john@example.com, John Doe, true",
        "jane@company.org, Jane Smith, true", 
        "invalid@, Invalid User, false",
        ", Empty Email, false"
    })
    void shouldValidateUserCreation(String email, String name, boolean shouldSucceed) {
        if (shouldSucceed) {
            assertDoesNotThrow(() -> userService.createUser(new CreateUserRequest(email, name)));
        } else {
            assertThrows(ValidationException.class, () -> 
                userService.createUser(new CreateUserRequest(email, name)));
        }
    }
    
    @ParameterizedTest
    @CsvFileSource(resources = "/test-data/users.csv", numLinesToSkip = 1)
    void shouldProcessUsersFromCsvFile(String email, String name, int age, String department) {
        CreateUserRequest request = new CreateUserRequest(email, name, age, department);
        
        User result = userService.createUser(request);
        
        assertNotNull(result.getId());
        assertEquals(email, result.getEmail());
        assertEquals(name, result.getName());
    }
    
    @RepeatedTest(value = 10, name = "Retry {currentRepetition} of {totalRepetitions}")
    void shouldHandleConcurrentUserCreation() {
        // Test for race conditions
        CompletableFuture<User> future1 = CompletableFuture.supplyAsync(() -> 
            userService.createUser(new CreateUserRequest("test1@example.com", "User 1")));
        CompletableFuture<User> future2 = CompletableFuture.supplyAsync(() -> 
            userService.createUser(new CreateUserRequest("test2@example.com", "User 2")));
        
        assertDoesNotThrow(() -> CompletableFuture.allOf(future1, future2).join());
    }
    
    @Test
    @Timeout(value = 5, unit = TimeUnit.SECONDS)
    void shouldCompleteWithinTimeout() {
        // Test that should complete within 5 seconds
        userService.bulkCreateUsers(generateTestUsers(1000));
    }
    
    @Test
    @EnabledOnOs(OS.LINUX)
    @EnabledIf("isTestEnvironment")
    void shouldRunOnlyInTestEnvironment() {
        // Test that runs only on Linux in test environment
    }
    
    static boolean isTestEnvironment() {
        return "test".equals(System.getProperty("environment"));
    }
    
    @TestFactory
    Stream<DynamicTest> shouldValidateUserRoles() {
        return Stream.of(UserRole.ADMIN, UserRole.USER, UserRole.GUEST)
            .map(role -> DynamicTest.dynamicTest(
                "Testing role: " + role,
                () -> {
                    User user = createUserWithRole(role);
                    assertTrue(user.hasRole(role));
                    assertEquals(role.getPermissions(), user.getPermissions());
                }
            ));
    }
    
    @AfterEach
    void cleanupTestData() {
        testDatabase.clearData();
    }
    
    @AfterAll
    void shutdownDatabase() {
        testDatabase.shutdown();
    }
}

// === TESTNG FEATURES ===

@Test(groups = {"integration", "database"})
public class TestNGExampleTest {
    
    @DataProvider(name = "userTestData")
    public Object[][] provideUserTestData() {
        return new Object[][] {
            {"john@example.com", "John Doe", true},
            {"invalid-email", "Invalid User", false},
            {"jane@company.org", "Jane Smith", true}
        };
    }
    
    @Test(dataProvider = "userTestData")
    public void shouldValidateUserData(String email, String name, boolean expectedValid) {
        if (expectedValid) {
            assertDoesNotThrow(() -> userService.createUser(new CreateUserRequest(email, name)));
        } else {
            assertThrows(ValidationException.class, () -> 
                userService.createUser(new CreateUserRequest(email, name)));
        }
    }
    
    @Test(dependsOnMethods = {"shouldCreateUser"}, groups = {"user-operations"})
    public void shouldUpdateUser() {
        // This test depends on shouldCreateUser
    }
    
    @Test(threadPoolSize = 5, invocationCount = 10, timeOut = 10000)
    public void shouldHandleParallelExecution() {
        // Test with 5 threads, 10 invocations, 10 second timeout
        userService.performConcurrentOperation();
    }
    
    @Test(expectedExceptions = ValidationException.class)
    public void shouldThrowValidationException() {
        userService.createUser(new CreateUserRequest("", ""));
    }
}

// === CUCUMBER BDD TESTS ===

// Feature file: user_management.feature
/*
Feature: User Management
  As a system administrator
  I want to manage users
  So that I can control access to the system

  Background:
    Given the system is running
    And the database is clean

  Scenario: Create a new user
    Given I have valid user data
    When I create a new user
    Then the user should be created successfully
    And the user should receive a welcome email

  Scenario Outline: Validate user input
    Given I have user data with email "<email>" and name "<name>"
    When I attempt to create the user
    Then the result should be "<result>"

    Examples:
      | email           | name      | result  |
      | john@example.com| John Doe  | success |
      | invalid-email   | Jane Doe  | failure |
      | jane@company.org| Jane Smith| success |

  Scenario: User login
    Given a user exists with email "john@example.com"
    And the user has password "validPassword123"
    When the user attempts to login
    Then the login should be successful
    And the user session should be created
*/

// Step definitions
@Component
public class UserManagementSteps {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private TestDataManager testDataManager;
    
    private CreateUserRequest userRequest;
    private User createdUser;
    private Exception thrownException;
    
    @Given("the system is running")
    public void theSystemIsRunning() {
        // Verify system health
        assertTrue(userService.isHealthy());
    }
    
    @Given("the database is clean")
    public void theDatabaseIsClean() {
        testDataManager.clearAllData();
    }
    
    @Given("I have valid user data")
    public void iHaveValidUserData() {
        userRequest = new CreateUserRequest("john@example.com", "John Doe");
    }
    
    @Given("I have user data with email {string} and name {string}")
    public void iHaveUserDataWithEmailAndName(String email, String name) {
        userRequest = new CreateUserRequest(email, name);
    }
    
    @When("I create a new user")
    public void iCreateANewUser() {
        try {
            createdUser = userService.createUser(userRequest);
        } catch (Exception e) {
            thrownException = e;
        }
    }
    
    @When("I attempt to create the user")
    public void iAttemptToCreateTheUser() {
        try {
            createdUser = userService.createUser(userRequest);
        } catch (Exception e) {
            thrownException = e;
        }
    }
    
    @Then("the user should be created successfully")
    public void theUserShouldBeCreatedSuccessfully() {
        assertNotNull(createdUser);
        assertNotNull(createdUser.getId());
        assertEquals(userRequest.getEmail(), createdUser.getEmail());
    }
    
    @Then("the result should be {string}")
    public void theResultShouldBe(String expectedResult) {
        if ("success".equals(expectedResult)) {
            assertNotNull(createdUser);
            assertNull(thrownException);
        } else {
            assertNull(createdUser);
            assertNotNull(thrownException);
        }
    }
}

// === SELENIUM WEB AUTOMATION ===

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class WebAutomationTest {
    
    @LocalServerPort
    private int port;
    
    private WebDriver driver;
    private WebDriverWait wait;
    
    @BeforeEach
    void setUp() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        
        driver = new ChromeDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    @Test
    void shouldLoginSuccessfully() {
        // Navigate to login page
        driver.get("http://localhost:" + port + "/login");
        
        // Page Object Model
        LoginPage loginPage = new LoginPage(driver);
        loginPage.enterEmail("admin@example.com");
        loginPage.enterPassword("password123");
        loginPage.clickLoginButton();
        
        // Verify successful login
        DashboardPage dashboardPage = new DashboardPage(driver);
        wait.until(ExpectedConditions.visibilityOf(dashboardPage.getWelcomeMessage()));
        
        assertTrue(dashboardPage.isDisplayed());
        assertEquals("Welcome, Admin!", dashboardPage.getWelcomeText());
    }
    
    @Test
    void shouldCreateUserThroughUI() {
        // Login first
        loginAsAdmin();
        
        // Navigate to user management
        UserManagementPage userPage = navigateToUserManagement();
        
        // Create new user
        userPage.clickAddUserButton();
        userPage.fillUserForm("newuser@example.com", "New User", "USER");
        userPage.submitForm();
        
        // Verify user creation
        wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.className("success-message")));
        
        assertTrue(userPage.isUserDisplayed("newuser@example.com"));
    }
    
    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}

// Page Object Model classes
public class LoginPage {
    private final WebDriver driver;
    
    @FindBy(id = "email")
    private WebElement emailField;
    
    @FindBy(id = "password")
    private WebElement passwordField;
    
    @FindBy(id = "loginButton")
    private WebElement loginButton;
    
    public LoginPage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }
    
    public void enterEmail(String email) {
        emailField.clear();
        emailField.sendKeys(email);
    }
    
    public void enterPassword(String password) {
        passwordField.clear();
        passwordField.sendKeys(password);
    }
    
    public void clickLoginButton() {
        loginButton.click();
    }
}

// === REST ASSURED API TESTING ===

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class APIAutomationTest {
    
    @LocalServerPort
    private int port;
    
    @BeforeEach
    void setUp() {
        RestAssured.port = port;
        RestAssured.enableLoggingOfRequestAndResponseIfValidationFails();
    }
    
    @Test
    void shouldCreateUserViaAPI() {
        CreateUserRequest request = new CreateUserRequest("api@example.com", "API User");
        
        ValidatableResponse response = given()
            .contentType(ContentType.JSON)
            .body(request)
        .when()
            .post("/api/users")
        .then()
            .statusCode(201)
            .contentType(ContentType.JSON)
            .body("email", equalTo("api@example.com"))
            .body("name", equalTo("API User"))
            .body("id", notNullValue())
            .body("createdAt", notNullValue());
            
        // Extract created user ID for cleanup
        Long userId = response.extract().path("id");
        assertNotNull(userId);
    }
    
    @Test
    void shouldGetUserById() {
        // Create user first
        CreateUserRequest request = new CreateUserRequest("get@example.com", "Get User");
        
        Long userId = given()
            .contentType(ContentType.JSON)
            .body(request)
        .when()
            .post("/api/users")
        .then()
            .statusCode(201)
            .extract().path("id");
        
        // Get user by ID
        given()
        .when()
            .get("/api/users/{id}", userId)
        .then()
            .statusCode(200)
            .body("id", equalTo(userId.intValue()))
            .body("email", equalTo("get@example.com"))
            .body("name", equalTo("Get User"));
    }
    
    @Test
    void shouldReturn404ForNonExistentUser() {
        given()
        .when()
            .get("/api/users/{id}", 99999)
        .then()
            .statusCode(404)
            .body("error", equalTo("User not found"))
            .body("code", equalTo("USER_NOT_FOUND"));
    }
    
    @Test
    void shouldValidateUserInput() {
        CreateUserRequest invalidRequest = new CreateUserRequest("", ""); // Invalid data
        
        given()
            .contentType(ContentType.JSON)
            .body(invalidRequest)
        .when()
            .post("/api/users")
        .then()
            .statusCode(400)
            .body("errors", hasSize(greaterThan(0)))
            .body("errors[0].field", anyOf(equalTo("email"), equalTo("name")))
            .body("errors[0].message", notNullValue());
    }
    
    @Test
    void shouldAuthenticateUser() {
        // Login and get token
        String token = given()
            .contentType(ContentType.JSON)
            .body(new LoginRequest("admin@example.com", "password123"))
        .when()
            .post("/api/auth/login")
        .then()
            .statusCode(200)
            .extract().path("token");
        
        // Use token to access protected endpoint
        given()
            .header("Authorization", "Bearer " + token)
        .when()
            .get("/api/admin/users")
        .then()
            .statusCode(200)
            .body("$", hasSize(greaterThanOrEqualTo(0)));
    }
}

// === CUSTOM TEST FRAMEWORK ===

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface DatabaseTest {
    String[] scripts() default {};
    boolean rollback() default true;
}

@TestExecutionListeners({
    DependencyInjectionTestExecutionListener.class,
    DatabaseTestExecutionListener.class
})
public class DatabaseTestExecutionListener implements TestExecutionListener {
    
    @Override
    public void beforeTestMethod(TestContext testContext) throws Exception {
        Method testMethod = testContext.getTestMethod();
        DatabaseTest annotation = testMethod.getAnnotation(DatabaseTest.class);
        
        if (annotation != null) {
            JdbcTemplate jdbcTemplate = testContext.getApplicationContext()
                .getBean(JdbcTemplate.class);
            
            // Execute setup scripts
            for (String script : annotation.scripts()) {
                Resource resource = new ClassPathResource(script);
                ScriptUtils.executeSqlScript(jdbcTemplate.getDataSource().getConnection(), resource);
            }
        }
    }
    
    @Override
    public void afterTestMethod(TestContext testContext) throws Exception {
        Method testMethod = testContext.getTestMethod();
        DatabaseTest annotation = testMethod.getAnnotation(DatabaseTest.class);
        
        if (annotation != null && annotation.rollback()) {
            // Rollback changes
            testContext.getApplicationContext()
                .getBean(TransactionTemplate.class)
                .execute(status -> {
                    status.setRollbackOnly();
                    return null;
                });
        }
    }
}

// Usage of custom annotation
public class CustomFrameworkTest {
    
    @Test
    @DatabaseTest(scripts = {"users-test-data.sql", "orders-test-data.sql"})
    void shouldCalculateUserOrderStats() {
        // Test runs with preloaded test data
        UserStats stats = userService.calculateStats(1L);
        
        assertEquals(5, stats.getTotalOrders());
        assertEquals(new BigDecimal("150.00"), stats.getTotalSpent());
    }
}
```

</div>

*Notice: Test automation frameworks should be chosen based on project requirements, team expertise, and integration capabilities with existing development workflows.*

</div>

## Summary

Software testing is a critical discipline that ensures application quality, reliability, and maintainability. A comprehensive testing strategy encompasses multiple levels and types of testing, each serving specific purposes in the overall quality assurance process.

**Testing Fundamentals**: The testing pyramid guides test distribution with many unit tests, fewer integration tests, and minimal end-to-end tests. Unit tests provide fast feedback and enable confident refactoring, while integration tests verify component interactions and end-to-end tests validate complete user workflows.

**Advanced Testing Strategies**: Property-based testing validates code behavior across broad input ranges, contract testing ensures API compatibility in distributed systems, and mutation testing evaluates test suite quality. Chaos engineering builds resilience through controlled failure injection.

**Test-Driven Development**: TDD promotes better design through the Red-Green-Refactor cycle, ensuring code is testable and requirements are clearly understood. Both outside-in and inside-out approaches provide structured development methodologies.

**Test Automation**: Modern testing relies on sophisticated frameworks like JUnit 5, TestNG, Cucumber, and Selenium to automate test execution, reporting, and maintenance. Test automation enables continuous integration and delivery practices.

**Test Architecture**: Well-designed test architectures separate concerns, manage test data effectively, and provide reliable feedback loops. Architectural testing enforces design rules and prevents degradation over time.

**Performance Testing**: Load testing, stress testing, and volume testing ensure applications meet performance requirements under various conditions. Performance testing should be integrated into development workflows to catch regressions early.

**Quality Assurance**: Comprehensive testing strategies combine automated testing at multiple levels with manual exploratory testing. Test quality itself must be monitored through coverage analysis, mutation testing, and regular test suite maintenance.

**Best Practices**: Effective testing requires clear naming conventions, proper test isolation, realistic test data, and continuous improvement of test processes. Tests should be treated as first-class code with the same quality standards as production code.

Modern software development relies on automated testing to enable rapid delivery while maintaining quality. A mature testing strategy adapts to changing requirements, scales with system complexity, and provides confidence for continuous delivery practices.

## Further Reading

- "Test Driven Development: By Example" by Kent Beck
- "Growing Object-Oriented Software, Guided by Tests" by Steve Freeman
- "Unit Testing Principles, Practices, and Patterns" by Vladimir Khorikov
- "The Art of Unit Testing" by Roy Osherove
- "xUnit Test Patterns" by Gerard Meszaros