# Tesztelés

## Rövid összefoglaló

A szoftvertesztelés kritikus folyamat az alkalmazások minőségének biztosításához. A tesztelési piramis alapján unit tesztekből kell a legtöbb, integration tesztekből kevesebb, E2E tesztekből pedig a legkevesebb. A Java ökoszisztémában a JUnit 5 és Mockito az alapvető eszközök, Spring Boot pedig beépített tesztelési támogatást nyújt. Fő buktatók a fragile tesztek, túl sok mock használata és a "happy path only" megközelítés.

## Fogalmak

### Unit Test {#unit-test}
Egyetlen komponens (osztály, metódus) izolált tesztelése külső függőségek nélkül.

**Példa:**
```java
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {
    private Calculator calculator;

    @BeforeEach
    void setUp() {
        calculator = new Calculator();
    }

    @Test
    @DisplayName("Should add two positive numbers correctly")
    void shouldAddTwoPositiveNumbers() {
        // Given (Arrange)
        int a = 5;
        int b = 3;

        // When (Act)
        int result = calculator.add(a, b);

        // Then (Assert)
        assertEquals(8, result);
        assertTrue(result > 0);
    }

    @Test
    void shouldThrowExceptionWhenDividingByZero() {
        // Given
        int dividend = 10;
        int divisor = 0;

        // When & Then
        ArithmeticException exception = assertThrows(
            ArithmeticException.class, 
            () -> calculator.divide(dividend, divisor)
        );
        
        assertEquals("Division by zero", exception.getMessage());
    }
}
```

Magyarázat: Unit tesztek gyorsak, megbízhatóak és könnyen karbantarthatók. Minden tesztnek egy konkrét viselkedést kell validálnia.

### Integration Test {#integration-test}
Több komponens együttműködésének tesztelése, gyakran valós adatbázissal vagy külső szolgáltatásokkal.

**Példa:**
```java
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Sql("/test-data.sql") // Test adatok betöltése
class UserServiceIntegrationTest {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Test
    @Transactional
    @Rollback
    void shouldCreateUserWithProfile() {
        // Given
        CreateUserRequest request = new CreateUserRequest("John Doe", "john@example.com");

        // When
        User createdUser = userService.createUser(request);

        // Then
        assertNotNull(createdUser.getId());
        assertEquals("John Doe", createdUser.getName());
        
        // Ellenőrizzük az adatbázisban is
        Optional<User> savedUser = userRepository.findById(createdUser.getId());
        assertTrue(savedUser.isPresent());
        assertEquals("john@example.com", savedUser.get().getEmail());
    }

    @Test
    void shouldSendEmailWhenUserRegisters() {
        // Given
        CreateUserRequest request = new CreateUserRequest("Jane Doe", "jane@example.com");

        // When
        userService.createUser(request);

        // Then
        // Ellenőrizzük, hogy email service hívódott-e
        // (ez integrációs tesztben a valós service-eken keresztül)
    }
}
```

Magyarázat: Integration tesztek lassabbak, de validálják a komponensek valós együttműködését és az infrastruktúra integrációt.

### JUnit 5 {#junit-5}
Modern Java tesztelési framework annotációkkal, assertion-ökkel és lifecycle management-tel.

**Példa:**
```java
import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.junit.jupiter.params.provider.CsvSource;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("String utilities test")
class StringUtilsTest {

    @BeforeAll
    static void initAll() {
        System.out.println("Running all StringUtils tests");
    }

    @BeforeEach
    void init() {
        System.out.println("Starting individual test");
    }

    @Test
    @DisplayName("Should check if string is palindrome")
    void shouldCheckPalindrome() {
        // Multiple assertions in one test
        assertAll("palindrome",
            () -> assertTrue(StringUtils.isPalindrome("racecar")),
            () -> assertTrue(StringUtils.isPalindrome("A man a plan a canal Panama")),
            () -> assertFalse(StringUtils.isPalindrome("hello"))
        );
    }

    @ParameterizedTest
    @ValueSource(strings = {"racecar", "radar", "level"})
    @DisplayName("Should identify palindromes")
    void shouldIdentifyPalindromes(String candidate) {
        assertTrue(StringUtils.isPalindrome(candidate));
    }

    @ParameterizedTest
    @CsvSource({
        "1, 1, 2",
        "2, 3, 5", 
        "-1, 1, 0",
        "0, 0, 0"
    })
    void shouldAddNumbers(int first, int second, int expectedResult) {
        Calculator calculator = new Calculator();
        assertEquals(expectedResult, calculator.add(first, second));
    }

    @Test
    @Timeout(value = 2, unit = TimeUnit.SECONDS)
    void shouldFinishWithinTimeout() {
        // Long running operation
        StringUtils.processLargeText("large text");
    }

    @RepeatedTest(5)
    void shouldRepeatTest() {
        // Test that should run multiple times
        assertTrue(Math.random() >= 0);
    }

    @AfterEach
    void tearDown() {
        System.out.println("Finished individual test");
    }

    @AfterAll
    static void tearDownAll() {
        System.out.println("Finished all StringUtils tests");
    }
}
```

Magyarázat: JUnit 5 moduláris, extensible és támogatja a modern Java funkciókat, mint lambda-k és stream-ek.

### Assertions {#assertions}
Teszt eredmények validálására szolgáló metódusok. JUnit 5 gazdag assertion API-t nyújt.

**Példa:**
```java
class AssertionExamplesTest {

    @Test
    void basicAssertions() {
        // Alapvető egyenlőség
        assertEquals("expected", "actual");
        assertNotEquals("unexpected", "actual");
        
        // Null ellenőrzések
        assertNull(null);
        assertNotNull("not null");
        
        // Boolean ellenőrzések
        assertTrue(2 > 1);
        assertFalse(1 > 2);
        
        // Reference ellenőrzés
        String str1 = "test";
        String str2 = "test";
        assertSame(str1, str2); // ugyanaz az objektum reference
        
        // Tömb/kollekció ellenőrzések
        int[] expected = {1, 2, 3};
        int[] actual = {1, 2, 3};
        assertArrayEquals(expected, actual);
        
        List<String> expectedList = Arrays.asList("a", "b", "c");
        List<String> actualList = Arrays.asList("a", "b", "c");
        assertIterableEquals(expectedList, actualList);
    }

    @Test
    void exceptionAssertions() {
        // Exception ellenőrzések
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            throw new IllegalArgumentException("Invalid argument");
        });
        
        assertEquals("Invalid argument", exception.getMessage());
        
        // Timeout ellenőrzés
        assertTimeout(Duration.ofSeconds(2), () -> {
            // Some operation that should complete within 2 seconds
            Thread.sleep(1000);
        });
    }

    @Test
    void groupedAssertions() {
        User user = new User("John", "Doe", 30);
        
        // Grouped assertions - all execute, even if some fail
        assertAll("user properties",
            () -> assertEquals("John", user.getFirstName()),
            () -> assertEquals("Doe", user.getLastName()),
            () -> assertTrue(user.getAge() >= 18),
            () -> assertNotNull(user.getFullName())
        );
    }

    @Test
    void customMessages() {
        int actual = 5;
        
        // Static message
        assertEquals(10, actual, "Expected value should be 10");
        
        // Supplier message (lazy evaluation)
        assertEquals(10, actual, () -> "Expected 10 but was " + actual);
    }
}
```

Magyarázat: Assertion-ök világos hibaüzeneteket biztosítanak és támogatják a komplex validációs logikát.

### Test lifecycle {#test-lifecycle}
JUnit 5 annotációk a teszt életciklus kezeléséhez (setup, cleanup).

**Példa:**
```java
@TestInstance(TestInstance.Lifecycle.PER_CLASS) // Egy instance minden teszthez
class DatabaseConnectionTest {
    
    private DatabaseConnection connection;
    private TestData testData;

    @BeforeAll
    void setUpDatabase() {
        // Expensive setup - egyszer fut az összes teszt előtt
        connection = DatabaseConnection.create("test-db");
        connection.migrate();
        System.out.println("Database initialized");
    }

    @BeforeEach
    void setUpTestData() {
        // Minden teszt előtt fresh data
        testData = new TestData();
        testData.loadBasicData(connection);
        System.out.println("Test data prepared");
    }

    @Test
    void shouldFindUserById() {
        // Test implementation
        User user = connection.findUser(testData.getUserId());
        assertNotNull(user);
    }

    @Test
    void shouldCreateNewUser() {
        // Another test
        User newUser = new User("Test User", "test@example.com");
        Long savedId = connection.saveUser(newUser);
        assertNotNull(savedId);
    }

    @AfterEach
    void cleanUpTestData() {
        // Minden teszt után cleanup
        testData.cleanup(connection);
        System.out.println("Test data cleaned up");
    }

    @AfterAll
    void tearDownDatabase() {
        // Expensive cleanup - egyszer fut az összes teszt után
        connection.close();
        System.out.println("Database connection closed");
    }
}

// Nested test example
@DisplayName("User service tests")
class UserServiceTest {

    @Nested
    @DisplayName("When user exists")
    class WhenUserExists {
        
        private User existingUser;
        
        @BeforeEach
        void setUp() {
            existingUser = new User("Existing User", "existing@example.com");
        }
        
        @Test
        @DisplayName("Should return user details")
        void shouldReturnUserDetails() {
            // Test with existing user
        }
        
        @Test
        @DisplayName("Should update user successfully")
        void shouldUpdateUser() {
            // Update test
        }
    }

    @Nested
    @DisplayName("When user does not exist")
    class WhenUserDoesNotExist {
        
        @Test
        @DisplayName("Should throw UserNotFoundException")
        void shouldThrowException() {
            // Test exception scenario
        }
    }
}
```

Magyarázat: A lifecycle annotációk biztosítják a megfelelő setup/cleanup sorrendet és támogatják a test szervezést nested osztályokkal.

### Mockito {#mockito}
Mock objektumok készítésére és viselkedésük stubbing-jára szolgáló library.

**Példa:**
```java
import org.mockito.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private UserService userService;

    @Captor
    private ArgumentCaptor<User> userCaptor;

    @Test
    void shouldCreateUserAndSendWelcomeEmail() {
        // Given
        CreateUserRequest request = new CreateUserRequest("John Doe", "john@example.com");
        User savedUser = new User(1L, "John Doe", "john@example.com");
        
        when(userRepository.save(any(User.class))).thenReturn(savedUser);
        doNothing().when(emailService).sendWelcomeEmail(anyString());

        // When
        User result = userService.createUser(request);

        // Then
        assertEquals(savedUser, result);
        
        // Verify interactions
        verify(userRepository).save(userCaptor.capture());
        verify(emailService).sendWelcomeEmail("john@example.com");
        
        // Check captured argument
        User capturedUser = userCaptor.getValue();
        assertEquals("John Doe", capturedUser.getName());
        assertEquals("john@example.com", capturedUser.getEmail());
    }

    @Test
    void shouldHandleUserNotFound() {
        // Given
        Long userId = 999L;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(UserNotFoundException.class, () -> {
            userService.findUserById(userId);
        });
        
        verify(userRepository).findById(userId);
        verifyNoInteractions(emailService);
    }

    @Test
    void shouldRetryOnDatabaseError() {
        // Given
        CreateUserRequest request = new CreateUserRequest("Jane", "jane@example.com");
        
        // First call fails, second succeeds
        when(userRepository.save(any(User.class)))
            .thenThrow(new DatabaseException("Connection failed"))
            .thenReturn(new User(2L, "Jane", "jane@example.com"));

        // When
        User result = userService.createUserWithRetry(request);

        // Then
        assertNotNull(result);
        verify(userRepository, times(2)).save(any(User.class));
    }

    @Test
    void shouldProcessUsersInBatches() {
        // Given
        List<User> users = Arrays.asList(
            new User("User1", "user1@example.com"),
            new User("User2", "user2@example.com"),
            new User("User3", "user3@example.com")
        );
        
        when(userRepository.findAllActiveUsers()).thenReturn(users);

        // When
        userService.processAllUsers();

        // Then
        verify(userRepository).findAllActiveUsers();
        verify(emailService, times(3)).sendEmail(anyString(), anyString());
        
        // Advanced verification with argument matcher
        verify(emailService).sendEmail(
            eq("user1@example.com"), 
            argThat(content -> content.contains("User1"))
        );
    }
}
```

Magyarázat: Mockito lehetővé teszi az external függőségek izolálását és a viselkedésük kontrollálását unit tesztekben.

### Testcontainers {#testcontainers}
Valós adatbázisok és external szolgáltatások használata tesztekben Docker container-ekkel.

**Példa:**
```java
@SpringBootTest
@Testcontainers
class DatabaseIntegrationTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:13")
            .withDatabaseName("testdb")
            .withUsername("testuser")
            .withPassword("testpass")
            .withExposedPorts(5432);

    @Container
    static GenericContainer<?> redis = new GenericContainer<>("redis:6-alpine")
            .withExposedPorts(6379);

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
        
        registry.add("spring.redis.host", redis::getHost);
        registry.add("spring.redis.port", () -> redis.getMappedPort(6379));
    }

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Test
    @Sql("/test-schema.sql")
    void shouldPersistUserToDatabase() {
        // Given
        User user = new User("Integration Test User", "integration@example.com");

        // When
        User saved = userRepository.save(user);

        // Then
        assertNotNull(saved.getId());
        
        // Verify in database
        Optional<User> found = userRepository.findById(saved.getId());
        assertTrue(found.isPresent());
        assertEquals("Integration Test User", found.get().getName());
    }

    @Test
    void shouldCacheUserInRedis() {
        // Given
        String userId = "user:123";
        String userData = "{\"name\":\"Cached User\",\"email\":\"cached@example.com\"}";

        // When
        redisTemplate.opsForValue().set(userId, userData);

        // Then
        String cachedData = redisTemplate.opsForValue().get(userId);
        assertEquals(userData, cachedData);
    }

    @Test
    void shouldHandleDatabaseTransactions() {
        // Test complex database operations with real transactions
        Long initialCount = userRepository.count();

        try {
            // Transactional operation that should rollback
            userRepository.save(new User("User1", "user1@test.com"));
            userRepository.save(new User("User2", "user2@test.com"));
            
            // Simulate error
            throw new RuntimeException("Simulated error");
            
        } catch (RuntimeException e) {
            // Expected exception
        }

        // Verify rollback occurred
        assertEquals(initialCount, userRepository.count());
    }
}
```

Magyarázat: Testcontainers valós infrastruktúrát biztosít tesztekhez, megbízhatóbb és realisztikusabb teszteket lehetővé téve.

### @WebMvcTest / @DataJpaTest {#webmvctest-datajpatest}
Spring Boot slice tesztek specifikus alkalmazásrétegek tesztelésére.

**Példa:**
```java
// Web layer testing
@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    void shouldReturnUserWhenFound() throws Exception {
        // Given
        User user = new User(1L, "John Doe", "john@example.com");
        when(userService.findById(1L)).thenReturn(user);

        // When & Then
        mockMvc.perform(get("/api/users/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("John Doe"))
                .andExpect(jsonPath("$.email").value("john@example.com"));

        verify(userService).findById(1L);
    }

    @Test
    void shouldCreateUserWithValidRequest() throws Exception {
        // Given
        CreateUserRequest request = new CreateUserRequest("Jane Doe", "jane@example.com");
        User createdUser = new User(2L, "Jane Doe", "jane@example.com");
        
        when(userService.createUser(any(CreateUserRequest.class))).thenReturn(createdUser);

        // When & Then
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                        "name": "Jane Doe",
                        "email": "jane@example.com"
                    }
                    """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(2))
                .andExpect(jsonPath("$.name").value("Jane Doe"));
    }

    @Test
    void shouldReturnBadRequestForInvalidUser() throws Exception {
        // When & Then
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                        "name": "",
                        "email": "invalid-email"
                    }
                    """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors").isArray());

        verifyNoInteractions(userService);
    }
}

// Data layer testing
@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @Test
    void shouldFindByEmail() {
        // Given
        User user = new User("Test User", "test@example.com");
        entityManager.persistAndFlush(user);

        // When
        Optional<User> found = userRepository.findByEmail("test@example.com");

        // Then
        assertTrue(found.isPresent());
        assertEquals("Test User", found.get().getName());
    }

    @Test
    void shouldFindActiveUsersCreatedAfter() {
        // Given
        LocalDateTime cutoffDate = LocalDateTime.now().minusDays(7);
        
        User oldUser = new User("Old User", "old@example.com");
        oldUser.setCreatedAt(cutoffDate.minusDays(1));
        entityManager.persistAndFlush(oldUser);

        User newUser = new User("New User", "new@example.com");
        newUser.setCreatedAt(cutoffDate.plusDays(1));
        newUser.setActive(true);
        entityManager.persistAndFlush(newUser);

        // When
        List<User> recentActiveUsers = userRepository.findActiveUsersCreatedAfter(cutoffDate);

        // Then
        assertEquals(1, recentActiveUsers.size());
        assertEquals("New User", recentActiveUsers.get(0).getName());
    }

    @Test
    void shouldDeleteByEmail() {
        // Given
        User user = new User("To Delete", "delete@example.com");
        entityManager.persistAndFlush(user);

        // When
        userRepository.deleteByEmail("delete@example.com");
        entityManager.flush();

        // Then
        Optional<User> found = userRepository.findByEmail("delete@example.com");
        assertFalse(found.isPresent());
    }
}
```

Magyarázat: A slice tesztek csak az alkalmazás egy specifikus rétegét töltik be, gyorsabb és fókuszáltabb teszteket biztosítva.

## Gyakori hibák

### Fragile tesztek
Tesztek, amelyek gyakran törnek el kisebb kódváltozások miatt.

**Hibás példa:**
```java
@Test
void testUserCreation() {
    User user = userService.createUser("John", "john@example.com");
    
    // HIBA: Konkrét ID-ra számít, ami változhat
    assertEquals(1L, user.getId());
    
    // HIBA: Konkrét időpontra számít
    assertEquals(LocalDateTime.now(), user.getCreatedAt());
    
    // HIBA: Implementáció részletekre számít
    assertTrue(user.toString().contains("User{id=1"));
}
```

**Helyes megoldás:**
```java
@Test
void shouldCreateUserWithRequiredFields() {
    User user = userService.createUser("John", "john@example.com");
    
    // Csak a lényegi dolgokat ellenőrizzük
    assertNotNull(user.getId());
    assertEquals("John", user.getName());
    assertEquals("john@example.com", user.getEmail());
    assertNotNull(user.getCreatedAt());
    assertTrue(user.getCreatedAt().isBefore(LocalDateTime.now().plusSeconds(1)));
}
```

### Túl sok Mock használata
Minden függőséget mock-ol, ami a teszteket érdektelenné teszi.

**Hibás példa:**
```java
@Test
void testComplexBusinessLogic() {
    // Minden mock-olva, nincs valós logika tesztelve
    when(repositoryA.findSomething()).thenReturn(dataA);
    when(repositoryB.findSomething()).thenReturn(dataB);
    when(serviceC.process(any())).thenReturn(result);
    when(validatorD.validate(any())).thenReturn(true);
    
    // A teszt semmit nem bizonyít a valós logikáról
    BusinessResult result = businessService.process(input);
    
    assertEquals(expectedResult, result);
}
```

**Helyes megoldás:**
```java
@Test
void shouldCalculateBusinessRuleCorrectly() {
    // Csak a külső függőségeket mock-oljuk
    when(externalRepository.findRate()).thenReturn(BigDecimal.valueOf(0.1));
    
    // A belső üzleti logika valósan fut
    BusinessResult result = businessService.calculateDiscount(customer, order);
    
    // Az üzleti logika eredményét ellenőrizzük
    assertEquals(expectedDiscount, result.getDiscount());
}
```

### Happy Path Only
Csak a sikeres forgatókönyveket tesztelik.

**Hibás példa:**
```java
@Test
void testUserRegistration() {
    // Csak valid input tesztelése
    User user = userService.register("valid@email.com", "ValidPassword123");
    assertNotNull(user);
}
```

**Helyes megoldás:**
```java
@Test
void shouldRegisterValidUser() {
    User user = userService.register("valid@email.com", "ValidPassword123");
    assertNotNull(user);
}

@Test
void shouldRejectInvalidEmail() {
    assertThrows(ValidationException.class, () -> {
        userService.register("invalid-email", "ValidPassword123");
    });
}

@Test
void shouldRejectWeakPassword() {
    assertThrows(ValidationException.class, () -> {
        userService.register("valid@email.com", "123");
    });
}

@Test
void shouldRejectDuplicateEmail() {
    userService.register("test@email.com", "Password123");
    
    assertThrows(DuplicateEmailException.class, () -> {
        userService.register("test@email.com", "AnotherPassword123");
    });
}
```

## Interjúkérdések

- **Mi a különbség unit és integration teszt között?** — *Unit teszt izolált komponenst, integration teszt komponensek együttműködését validálja.*

- **Hogyan mockolsz egy repository-t Mockito-val?** — *@Mock annotáció, when().thenReturn() stubbing, verify() ellenőrzés.*

- **Mi a tesztelési piramis és miért fontos?** — *Unit tesztekből sok, integration kevesebb, E2E legkevesebb - költség és sebesség miatt.*

- **Hogyan írnál tesztet egy async metódusra?** — *CompletableFuture.get(), @Async tesztelése, CountDownLatch vagy TestExecutor.*

- **Mi a TDD és mik az előnyei?** — *Red-Green-Refactor ciklus, jobb design, 100% coverage, dokumentáció.*

- **Hogyan kezeled a database state-et integration tesztekben?** — *@Transactional + @Rollback, @Sql scriptekkel, TestContainers.*

- **Mi a @WebMvcTest és mikor használod?** — *Csak web layer tesztelése, MockMvc-vel, gyorsabb mint @SpringBootTest.*

- **Hogyan tesztelnél error handling-et?** — *assertThrows(), verify exception message, state changes ellenőrzése.*

- **Mi a Test Double típusok?** — *Dummy, Fake, Stub, Spy, Mock - különböző célokra különböző típusok.*

- **Hogyan biztosítod a test isolation-t?** — *@DirtiesContext, @Transactional rollback, clean test data.*

- **Mi a flaky test és hogyan kerülöd el?** — *Nem determinisztikus tesztek, timing issues, external dependencies minimalizálása.*

- **Hogyan tesztelnél exception-öket throwing service-ben?** — *assertThrows(), verify rollback, state consistency ellenőrzés.*

## Gyakorlati feladat

Írj comprehensive teszt suite-ot egy `BookLibraryService` osztályhoz:

1. **Unit tesztek**: Üzleti logika tesztelése mockolt függőségekkel
2. **Integration tesztek**: Adatbázis műveletek @DataJpaTest-tel
3. **Web tesztek**: REST API @WebMvcTest-tel
4. **E2E tesztek**: Teljes workflow @SpringBootTest + TestContainers
5. **Performance tesztek**: @RepeatedTest és @Timeout
6. **Parameterized tesztek**: Boundary value testing
7. **Exception handling**: Hibás esetek teljes lefedése

Követelmények:
- TDD megközelítés használata
- 90%+ code coverage
- AAA/Given-When-Then pattern
- Proper assertion messages
- Test data builders

*Kapcsolódó gyakorlati feladat: [Testing Java alkalmazás](/exercises/java/03-testing)*

## Kapcsolódó témák

- [Java Alapok](/theory/java) - Exception handling és OOP principles
- [Spring Framework](/theory/spring) - @Transactional, dependency injection
- [SQL & Adatbázis](/theory/sql) - Adatbázis tesztelési stratégiák
- [CI/CD & DevOps](/theory/devops) - Automated testing pipelines

## További olvasmányok

- [JUnit 5 User Guide](https://junit.org/junit5/docs/current/user-guide/) - Hivatalos JUnit dokumentáció
- [Mockito Documentation](https://javadoc.io/doc/org.mockito/mockito-core/latest/org/mockito/Mockito.html) - Mockito API referencia
- [Spring Boot Testing](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-testing) - Spring tesztelési guide
- [Test Driven Development by Kent Beck](https://www.oreilly.com/library/view/test-driven-development/0321146530/) - TDD klasszikus könyv
- [Growing Object-Oriented Software, Guided by Tests](http://www.growing-object-oriented-software.com/) - Test-first design
- [TestContainers Documentation](https://www.testcontainers.org/) - Integration testing with real databases
- [Clean Code: Unit Tests](https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html) - Uncle Bob a clean testing-ről
