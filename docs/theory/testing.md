# Tesztelés

## Rövid összefoglaló

A szoftvertesztelés kritikus folyamat az alkalmazások minőségének biztosításához. A tesztelési piramis alapján unit tesztekből kell a legtöbb, integration tesztekből kevesebb, E2E tesztekből pedig a legkevesebb. A Java ökoszisztémában a JUnit 5 és Mockito az alapvető eszközök, Spring Boot pedig beépített tesztelési támogatást nyújt. Fő buktatók a fragile tesztek, túl sok mock használata és a "happy path only" megközelítés.

<!-- Reading Progress Bar -->
<div id="read-progress"></div>

<!-- Tag Filter -->
<div class="tag-filter-container">
  <h3>🏷️ Szűrés témakörök szerint</h3>
  <div class="tag-filter-chips">
    <button class="filter-chip active" data-filter="all">Mind</button>
    <button class="filter-chip" data-filter="junior">Junior</button>
    <button class="filter-chip" data-filter="medior">Medior</button>
    <button class="filter-chip" data-filter="unit">Unit Testing</button>
    <button class="filter-chip" data-filter="integration">Integration</button>
    <button class="filter-chip" data-filter="mocking">Mocking</button>
    <button class="filter-chip" data-filter="spring">Spring Testing</button>
    <button class="filter-chip" data-filter="tdd">TDD</button>
    <button class="filter-chip" data-filter="performance">Performance</button>
  </div>
</div>

## Fogalmak

### Unit Test {#unit-test}

<div class="concept-section mental-model" data-filter="unit junior">

🧭 **Így gondolj rá**  
*A Unit teszt olyan, mint egy orvosi laborvizsgálat: egy konkrét funkciót izoláltan vizsgál, külső tényezők kiküszöbölésével.*

</div>

<div class="concept-section why-important" data-filter="unit junior">

💡 **Miért számít?**
- **Gyors feedback**: másodpercek alatt lefut, azonnal jelzi a hibát
- **Izolált hibakeresés**: pontosan tudod, melyik komponens hibás
- **Refactoring biztonság**: bátran változtathatsz a kódot, mert a tesztek elkapják a regressziót
- **Dokumentáció**: a teszt kód mutatja a komponens elvárt viselkedését

</div>

<div class="runnable-model" data-filter="unit junior">

**Runnable mental model**
```java
@Test
@DisplayName("Should add two positive numbers correctly")
void shouldAddTwoPositiveNumbers() {
    // Given (Arrange) - Tesztadat előkészítése
    Calculator calculator = new Calculator();
    int a = 5, b = 3;

    // When (Act) - A tesztelt metódus meghívása
    int result = calculator.add(a, b);

    // Then (Assert) - Eredmény ellenőrzése
    assertEquals(8, result);
    assertTrue(result > 0);
}
```
*Figyeld meg: AAA pattern (Arrange-Act-Assert) tisztán elkülöníti a teszt fázisait.*

</div>

<div class="concept-section myths" data-filter="unit">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Unit teszt lehet lassú is." → Valójában gyors kell legyen (< 100ms), különben nem unit teszt
- „Privát metódusokat is kell unit tesztelni." → Privát metódusok a public API-n keresztül tesztelendők
- „100% unit teszt coverage elég." → Coverage nem jelent minőséget, csak kód lefedettséget

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="unit">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**1. Named test methods**
```java
// ❌ Rossz
@Test void test1() { }

// ✅ Jó
@Test void shouldReturnTrueWhenUserIsActive() { }
```

**2. One assertion per logical concept**
```java
// ❌ Túl sok assertion
@Test void shouldCreateUser() {
    User user = service.create("John", "john@test.com");
    assertEquals("John", user.getName());
    assertEquals("john@test.com", user.getEmail());
    assertNotNull(user.getId());
    assertTrue(user.isActive()); // Ez külön tesztbe tartozna
}

// ✅ Fókuszált assertion
@Test void shouldCreateActiveUserByDefault() {
    User user = service.create("John", "john@test.com");
    assertTrue(user.isActive());
}
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="unit">

<details>
<summary>💼 <strong>Interjú buktatók</strong></summary>

<div>

- **"Írj unit tesztet ehhez a metódushoz"** → Ne felejtsd el a boundary case-eket (null, empty, invalid values)
- **"Hogyan tesztelnél exception-t?"** → `assertThrows()` használata és message ellenőrzése
- **"Mi a különbség unit és integration teszt között?"** → Unit = izolált komponens, Integration = komponensek együttműködése

</div>

</details>

</div>

### Integration Test {#integration-test}

<div class="concept-section mental-model" data-filter="integration medior">

🧭 **Így gondolj rá**  
*Az Integration teszt olyan, mint egy összeszerelési vonal tesztelése: nem az egyes alkatrészeket, hanem azok együttműködését vizsgálja.*

</div>

<div class="concept-section why-important" data-filter="integration medior">

💡 **Miért számít?**
- **Valós környezet**: adatbázissal, network hívásokkal, fájlrendszerrel dolgozik
- **Interface validation**: komponensek közötti kommunikáció helyes működése
- **Configuration testing**: Spring kontexts, dependency injection validálása
- **End-to-end workflow**: teljes üzleti folyamatok tesztelése

</div>

<div class="runnable-model" data-filter="integration spring">

**Runnable mental model**
```java
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Sql("/test-data.sql") // Test adatok betöltése
class UserServiceIntegrationTest {

    @Autowired
    private UserService userService;

    @Test
    @Transactional
    @Rollback
    void shouldCreateUserWithProfile() {
        // Given - valós Spring context és adatbázis
        CreateUserRequest request = new CreateUserRequest("John", "john@example.com");

        // When - teljes service stack hívása
        User createdUser = userService.createUser(request);

        // Then - adatbázisban is ellenőrzés
        assertNotNull(createdUser.getId());
        Optional<User> savedUser = userRepository.findById(createdUser.getId());
        assertTrue(savedUser.isPresent());
    }
}
```
*Figyeld meg: @SpringBootTest teljes alkalmazás kontextust tölt be, valós adatbázist használ.*

</div>

<div class="concept-section myths" data-filter="integration">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Integration teszt mindig lassú." → TestContainers-kel és jó setup-pal megfelelően gyors lehet
- „Minden dependency-t mock-olni kell." → Integration tesztben a valós komponenseket használjuk
- „@SpringBootTest mindig teljes kontextust tölt." → @WebMvcTest, @DataJpaTest slice-ok gyorsabbak

</div>

</details>

</div>

### JUnit 5 {#junit-5}

<div class="concept-section mental-model" data-filter="unit junior">

🧭 **Így gondolj rá**  
*A JUnit 5 olyan, mint egy modern tesztelési laboratorium: annotációkkal jelöld ki mit és hogyan tesztelj, az execution engine pedig automatikusan lefuttatja.*

</div>

<div class="concept-section why-important" data-filter="unit junior">

💡 **Miért számít?**
- **Moduláris architektúra**: JUnit Platform + Jupiter + Vintage részekre bontható
- **Modern Java támogatás**: lambda expressions, stream API, Java 8+ features
- **Gazdag annotációk**: @ParameterizedTest, @RepeatedTest, @Timeout, @Nested
- **Extensibility**: custom extensions írhatók a tesztelési workflow bővítésére

</div>

<div class="runnable-model" data-filter="unit junior">

**Runnable mental model**
```java
@DisplayName("String utilities test")
class StringUtilsTest {

    @ParameterizedTest
    @ValueSource(strings = {"racecar", "radar", "level"})
    @DisplayName("Should identify palindromes")
    void shouldIdentifyPalindromes(String candidate) {
        assertTrue(StringUtils.isPalindrome(candidate));
    }

    @Test
    @Timeout(value = 2, unit = TimeUnit.SECONDS)
    void shouldFinishWithinTimeout() {
        StringUtils.processLargeText("large text");
    }

    @RepeatedTest(5)
    void shouldRepeatTest() {
        assertTrue(Math.random() >= 0);
    }
}
```
*Figyeld meg: @ParameterizedTest különböző inputokkal futtatja ugyanazt a tesztet.*

</div>

<div class="concept-section micro-learning" data-filter="unit">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**JUnit 5 lifecycle annotációk:**
```java
@BeforeAll    // Egyszer fut az összes teszt előtt (static)
@BeforeEach   // Minden teszt előtt fut
@Test         // Teszt metódus
@AfterEach    // Minden teszt után fut  
@AfterAll     // Egyszer fut az összes teszt után (static)
```

**Assertion patterns:**
```java
// Grouped assertions - mind fut, még ha némelyik fail is
assertAll("user properties",
    () -> assertEquals("John", user.getFirstName()),
    () -> assertEquals("Doe", user.getLastName()),
    () -> assertTrue(user.getAge() >= 18)
);
```

</div>

</details>

</div>

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

<div class="concept-section mental-model" data-filter="mocking medior">

🧭 **Így gondolj rá**  
*A Mockito olyan, mint egy színészi ügynökség: "dublőröket" (mock objektumokat) biztosít a valós függőségek helyett, akik pontosan azt teszik, amit mondasz nekik.*

</div>

<div class="concept-section why-important" data-filter="mocking medior">

💡 **Miért számít?**
- **Dependency isolation**: külső függőségek kikapcsolása unit tesztekben
- **Behavior verification**: ellenőrizheted hogy mely metódusok hívódtak meg
- **Controlled responses**: pontosan meghatározhatod mit adjanak vissza a mock-ok
- **Fast execution**: nincs várás adatbázisra, API hívásokra, fájl IO-ra

</div>

<div class="runnable-model" data-filter="mocking medior">

**Runnable mental model**
```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;   // Mock függőség

    @InjectMocks
    private UserService userService;         // Test alatt álló osztály

    @Test
    void shouldCreateUserAndSendWelcomeEmail() {
        // Given - mock viselkedés definiálása
        User savedUser = new User(1L, "John", "john@example.com");
        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        // When - valós metódus hívás
        User result = userService.createUser(request);

        // Then - viselkedés ellenőrzése
        verify(userRepository).save(any(User.class));
        assertEquals(savedUser, result);
    }
}
```
*Figyeld meg: `when().thenReturn()` a mock viselkedés, `verify()` a hívás ellenőrzése.*

</div>

<div class="concept-section myths" data-filter="mocking">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Minden függőséget mock-olni kell." → Csak a külső/lassú függőségeket, belső logikát nem
- „@Mock és new Mock() ugyanaz." → @Mock annotáció egyszerűbb és tisztább kód
- „Mock-olt objektumok valós viselkedést mutatnak." → Default null-t adnak vissza, explicit stubbing kell

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="mocking">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Mock vs Spy különbség:**
```java
// Mock - teljesen fake objektum
@Mock 
UserService mockService;

// Spy - valós objektum, de metódusok override-olhatók
@Spy
UserService spyService = new UserService();

when(spyService.findUser(1L)).thenReturn(mockUser); // Override egy metódus
```

**Argument Captors használata:**
```java
@Captor
ArgumentCaptor<User> userCaptor;

// Test
userService.createUser(request);
verify(userRepository).save(userCaptor.capture());

User capturedUser = userCaptor.getValue();
assertEquals("John", capturedUser.getName());
```

</div>

</details>

</div>

### Testcontainers {#testcontainers}

<div class="concept-section mental-model" data-filter="integration medior">

🧭 **Így gondolj rá**  
*A Testcontainers olyan, mint egy mágikus labor: valós adatbázisokat és szolgáltatásokat idéz elő Docker containerekben a tesztek futtatására.*

</div>

<div class="concept-section why-important" data-filter="integration medior">

💡 **Miért számít?**
- **Valós környezet**: valódi PostgreSQL, MySQL, Redis, Kafka fut a tesztekben
- **Isolation**: minden teszt friss container-t kap, nincs state sharing
- **CI/CD friendly**: Docker-el futó örnyezetekben zökkenőmentesen működik
- **No mocking needed**: valós adatbázis operációk, nincs mock adatbázis

</div>

<div class="runnable-model" data-filter="integration">

**Runnable mental model**
```java
@SpringBootTest
@Testcontainers
class DatabaseIntegrationTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:13")
            .withDatabaseName("testdb")
            .withUsername("testuser")
            .withPassword("testpass");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Test
    void shouldPersistUserToRealDatabase() {
        // Valós PostgreSQL adatbázissal dolgozik!
        User saved = userRepository.save(new User("Real User", "real@test.com"));
        assertTrue(saved.getId() > 0);
    }
}
```
*Figyeld meg: @Container automatikusan indítja és leállítja a Docker container-t.*

</div>

<div class="concept-section micro-learning" data-filter="integration">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Több container együttes használata:**
```java
@Container
static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:13");

@Container  
static GenericContainer<?> redis = new GenericContainer<>("redis:6-alpine")
        .withExposedPorts(6379);

// Két valós szolgáltatás egyszerre!
```

**Network kommunikáció tesztelése:**
```java
@Container
static Network network = Network.newNetwork();

@Container
static GenericContainer<?> app1 = new GenericContainer<>("myapp:latest")
        .withNetwork(network)
        .withNetworkAliases("app1");
```

</div>

</details>

</div>

### @WebMvcTest / @DataJpaTest {#webmvctest-datajpatest}

<div class="concept-section mental-model" data-filter="spring medior">

🧭 **Így gondolj rá**  
*A slice tesztek olyan, mint egy sebészeti beavatkozás: csak a szükséges részt "nyitják fel" az alkalmazásból, nem az egészet.*

</div>

<div class="concept-section why-important" data-filter="spring medior">

💡 **Miért számít?**
- **Gyors futtatás**: csak a szükséges Spring komponenseket tölti be
- **Izolált tesztelés**: egy réteg (web, data, security) tesztelése
- **Mock integráció**: @MockBean automatikusan mock-olja a függőségeket
- **Realistárius setup**: valós Spring context, de csak a releváns résszel

</div>

<div class="runnable-model" data-filter="spring">

**Runnable mental model**
```java
// Web layer testing - csak a controller réteg
@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;  // HTTP kérések szimulálása

    @MockBean
    private UserService userService;  // Service réteg mock-olva

    @Test
    void shouldReturnUserWhenFound() throws Exception {
        // Given
        User user = new User(1L, "John", "john@example.com");
        when(userService.findById(1L)).thenReturn(user);

        // When & Then - HTTP kérés és válasz tesztelése
        mockMvc.perform(get("/api/users/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpected(status().isOk())
                .andExpect(jsonPath("$.name").value("John"));
    }
}

// Data layer testing - csak a repository réteg
@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;  // Test adatok kezelése

    @Autowired
    private UserRepository userRepository;

    @Test
    void shouldFindByEmail() {
        // Given - test adat készítése
        User user = new User("Test", "test@example.com");
        entityManager.persistAndFlush(user);

        // When - repository metódus hívása
        Optional<User> found = userRepository.findByEmail("test@example.com");

        // Then
        assertTrue(found.isPresent());
    }
}
```
*Figyeld meg: @WebMvcTest csak web layer, @DataJpaTest csak JPA layer betöltése.*

</div>

<div class="concept-section micro-learning" data-filter="spring">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Spring Boot test slice-ok:**
```java
@WebMvcTest        // Web layer (Controller, @RestController)
@DataJpaTest       // JPA repositories
@JsonTest          // JSON serialization/deserialization  
@WebFluxTest       // Reactive web layer
@DataRedisTest     // Redis repositories
@JdbcTest          // JDBC operations
```

**MockMvc tippek:**
```java
// POST kérés JSON tartalommal
mockMvc.perform(post("/api/users")
    .contentType(MediaType.APPLICATION_JSON)
    .content("{\"name\":\"John\"}"))
    .andExpect(status().isCreated());
```

</div>

</details>

</div>

### Test Pyramid {#test-pyramid}

<div class="concept-section mental-model" data-filter="junior">

🧭 **Így gondolj rá**  
*A Test Pyramid olyan, mint egy étkezési piramis: alul sok, egyszerű, gyors unit teszt (mint a gabonafélék), középen kevesebb integration teszt, tetején kevés E2E teszt (mint az édességek - kis mennyiségben fogyasztandó).*

</div>

<div class="concept-section why-important" data-filter="junior">

💡 **Miért számít?**
- **Gyors feedback**: unit tesztek másodpercek alatt futnak
- **Költséghatékonyság**: unit tesztek olcsók írni és karbantartani
- **Hibakeresés egyszerűsége**: unit teszt hiba pontosan lokalizálható
- **Stabil CI/CD**: kevesebb flaky teszt, megbízható pipeline

</div>

<div class="runnable-model" data-filter="junior">

**Runnable mental model**
```java
// 70-80% Unit Tests - Gyors, izolált, sok
@ExtendWith(MockitoExtension.class)
class CalculatorTest {
    @Test
    void shouldAddTwoNumbers() {
        Calculator calc = new Calculator();
        assertEquals(5, calc.add(2, 3));
    }
}

// 20-25% Integration Tests - Közepes, komponensek együtt
@SpringBootTest
class UserServiceIntegrationTest {
    @Test
    void shouldCreateUserWithProfile() {
        // Valós Spring context, adatbázis
    }
}

// 5-10% E2E Tests - Lassú, teljes rendszer
@SpringBootTest(webEnvironment = RANDOM_PORT)
class UserRegistrationE2ETest {
    @Test
    void shouldCompleteUserRegistrationFlow() {
        // Teljes workflow böngészőn keresztül
    }
}
```
*Figyeld meg: minél magasabb szinten, annál kevesebb teszt.*

</div>

<div class="concept-section myths" data-filter="junior">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Minden rétegben ugyanannyi teszt kell." → Nem, unit tesztekből kell a legtöbb
- „E2E tesztek mindent lefednek, elég azokból sok." → E2E tesztek lassúak és törékenyebek
- „100% code coverage elég a unit teszt szinten." → Coverage nem jelent minőséget

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="junior">

<details>
<summary>💼 <strong>Interjú buktatók</strong></summary>

<div>

- **"Melyik teszt típusból kell a legtöbb?"** → Unit teszt (70-80%), gyorsaság és költség miatt
- **"Miért nem írunk csak E2E teszteket?"** → Lassúak, törékenyebbek, nehéz debuggolni
- **"Mi a test pyramid fordítottja?"** → Ice cream cone anti-pattern - sok E2E, kevés unit teszt

</div>

</details>

</div>

### Smoke Test / Sanity Test {#smoke-test}

<div class="concept-section mental-model" data-filter="junior">

🧭 **Így gondolj rá**  
*A Smoke test olyan, mint amikor bekapcsolod a villanyt egy új lakásban: nem teszteled minden kapcsolót, csak azt hogy alapvetően működik az áram.*

</div>

<div class="concept-section why-important" data-filter="junior">

💡 **Miért számít?**
- **Gyors validáció**: pár perc alatt kiderül hogy működik-e az alkalmazás
- **Deployment verification**: új verzió telepítés után első ellenőrzés
- **Critical path coverage**: a legfontosabb funkciók működésének ellenőrzése
- **Go/No-go döntés**: további tesztelés előtt alapszintű működés biztosítása

</div>

<div class="runnable-model" data-filter="junior">

**Runnable mental model**
```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Tag("smoke")
class ApplicationSmokeTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    @DisplayName("Application should start successfully")
    void shouldStartApplication() {
        // Alapvető: az alkalmazás elindul-e
        assertThat(restTemplate).isNotNull();
    }

    @Test
    @DisplayName("Health endpoint should be available")
    void shouldHaveHealthEndpoint() {
        ResponseEntity<String> response = restTemplate.getForEntity("/actuator/health", String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    @DisplayName("Database connection should work")
    void shouldConnectToDatabase() {
        ResponseEntity<String> response = restTemplate.getForEntity("/api/users/health", String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    @DisplayName("Critical API endpoints should respond")
    void shouldHaveCriticalEndpoints() {
        // GET /api/users - lista endpoint
        ResponseEntity<String> usersResponse = restTemplate.getForEntity("/api/users", String.class);
        assertThat(usersResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        
        // GET /api/products - másik kritikus endpoint
        ResponseEntity<String> productsResponse = restTemplate.getForEntity("/api/products", String.class);
        assertThat(productsResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
}
```
*Figyeld meg: @Tag("smoke") segít elkülöníteni a smoke teszteket.*

</div>

<div class="concept-section myths" data-filter="junior">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Smoke test és sanity test ugyanaz." → Smoke = alapműködés, Sanity = kisebb változtatás után
- „Smoke tesztben minden funkciónak működnie kell." → Csak a kritikus path-ok ellenőrzése
- „Smoke teszt helyettesíti a unit teszteket." → Nem, kiegészíti őket

</div>

</details>

</div>

### Regression Test {#regression-test}

<div class="concept-section mental-model" data-filter="junior">

🧭 **Így gondolj rá**  
*A Regression test olyan, mint a régi fényképek átnézése: ellenőrzöd, hogy a múltban működő dolgok még mindig rendben vannak-e.*

</div>

<div class="concept-section why-important" data-filter="junior">

💡 **Miért számít?**
- **Existing functionality protection**: meglévő funkciók védelme új változtatások ellen
- **Confidence in changes**: biztonságos refactoring és új feature fejlesztés
- **Quality assurance**: kód minőség fenntartása idővel
- **Customer satisfaction**: működő funkciók nem rontódnak el

</div>

<div class="runnable-model" data-filter="junior">

**Runnable mental model**
```java
@Tag("regression")
class UserServiceRegressionTest {

    @Test
    @DisplayName("REGRESSION: User creation should still work after email validation changes")
    void shouldCreateUserAfterEmailValidationUpdate() {
        // Teszt, ami korábban már működött
        // Most ellenőrizzük, hogy új email validáció nem törte el
        UserService userService = new UserService();
        
        User user = userService.createUser("test@example.com", "ValidPassword123");
        
        assertNotNull(user.getId());
        assertEquals("test@example.com", user.getEmail());
        assertTrue(user.isActive());
    }

    @Test
    @DisplayName("REGRESSION: Password encryption should remain backward compatible")
    void shouldDecryptOldPasswords() {
        // Ellenőrizzük, hogy régi jelszavak még dekriptálhatók
        String oldEncryptedPassword = "legacy-encrypted-format";
        
        boolean isValid = passwordService.validatePassword("originalPassword", oldEncryptedPassword);
        
        assertTrue(isValid, "Old password format should still be supported");
    }

    @Test
    @DisplayName("REGRESSION: API backwards compatibility")
    void shouldMaintainApiCompatibility() {
        // REST API endpoint változás után a régi formátum még működik
        ResponseEntity<User> response = restTemplate.getForEntity("/api/v1/users/1", User.class);
        
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getName()).isNotNull(); // Régi field még létezik
    }
}

// Automated regression test suite
@Suite
@SelectClasses({
    UserCreationRegressionTest.class,
    PaymentProcessingRegressionTest.class,
    ReportGenerationRegressionTest.class
})
@IncludeTags("regression")
class RegressionTestSuite {
    // Minden regression teszt egy helyen futtatható
}
```
*Figyeld meg: @Tag("regression") és @Suite használata a szervezéshez.*

</div>

<div class="concept-section interview-pitfalls" data-filter="junior">

<details>
<summary>💼 <strong>Interjú buktatók</strong></summary>

<div>

- **"Mikor futtatnád a regression teszteket?"** → Minden release előtt, kritikus bugfix után
- **"Mi a különbség regression és unit teszt között?"** → Regression = meglévő funkció védelem, Unit = új kod validáció
- **"Hogyan automatizálnád a regression tesztelést?"** → CI/CD pipeline-ba beépítve, nightly builds

</div>

</details>

</div>

### Parameterized Tests {#parameterized-tests}

<div class="concept-section mental-model" data-filter="junior">

🧭 **Így gondolj rá**  
*A Parameterized test olyan, mint egy keksz forma: egyszer megírod a tesztet, aztán különböző "tésztákkal" (paraméterekkel) futtatod le.*

</div>

<div class="concept-section why-important" data-filter="junior">

💡 **Miért számít?**
- **DRY principle**: ne ismételd a teszt logikát különböző input értékekkel
- **Edge case coverage**: könnyű sok boundary case-t lefedni
- **Readable test data**: CSV, argumentum listák tisztán olvashatók
- **Maintenance efficiency**: egy teszt logika, sok scenario

</div>

<div class="runnable-model" data-filter="junior">

**Runnable mental model**
```java
class ParameterizedTestExamples {

    @ParameterizedTest
    @ValueSource(strings = {"racecar", "radar", "level", "deified"})
    @DisplayName("Should identify palindromes")
    void shouldIdentifyPalindromes(String candidate) {
        assertTrue(StringUtils.isPalindrome(candidate));
    }

    @ParameterizedTest
    @ValueSource(ints = {2, 4, 6, 8, 10, 100})
    @DisplayName("Should identify even numbers")
    void shouldIdentifyEvenNumbers(int number) {
        assertTrue(MathUtils.isEven(number));
    }

    @ParameterizedTest
    @CsvSource({
        "test@example.com, true",
        "invalid-email, false", 
        "another@test.org, true",
        "@invalid.com, false"
    })
    @DisplayName("Should validate email formats")
    void shouldValidateEmails(String email, boolean expected) {
        assertEquals(expected, EmailValidator.isValid(email));
    }

    @ParameterizedTest
    @MethodSource("provideUserTestData") 
    @DisplayName("Should validate user creation with complex data")
    void shouldValidateUserCreation(String name, String email, int age, boolean expectedValid) {
        User user = new User(name, email, age);
        assertEquals(expectedValid, UserValidator.isValid(user));
    }

    // Method source a komplex test adatokhoz
    static Stream<Arguments> provideUserTestData() {
        return Stream.of(
            Arguments.of("John Doe", "john@example.com", 25, true),
            Arguments.of("", "john@example.com", 25, false),          // Empty name
            Arguments.of("John", "invalid-email", 25, false),         // Invalid email  
            Arguments.of("John", "john@example.com", 17, false),      // Under age
            Arguments.of("Jane", "jane@test.org", 30, true)
        );
    }

    @ParameterizedTest
    @CsvFileSource(resources = "/test-data/users.csv", numLinesToSkip = 1)
    @DisplayName("Should process users from CSV file")
    void shouldProcessUsersFromCsv(String name, String email, int age) {
        User user = userService.createUser(name, email, age);
        assertNotNull(user.getId());
    }
}
```
*Figyeld meg: @ValueSource, @CsvSource, @MethodSource különböző adatforrásokhoz.*

</div>

<div class="concept-section myths" data-filter="junior">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Minden tesztnek parameterizáltnak kell lennie." → Csak amikor több hasonló input van
- „@ValueSource mindent megold." → Komplex objektumokhoz @MethodSource kell
- „CSV fájl mindig jobb, mint @CsvSource." → Kis adatmennyiséghez inline jobb

</div>

</details>

</div>

### Assertions vs Assumptions {#assertions-vs-assumptions}

<div class="concept-section mental-model" data-filter="junior">

🧭 **Így gondolj rá**  
*Assertion olyan, mint egy szigorú tanár: "Ez MUSZÁJ így legyen!" Assumption olyan, mint egy óvatos ember: "HA ez igaz, akkor folytatjuk, különben abbahagyjuk."*

</div>

<div class="concept-section why-important" data-filter="junior">

💡 **Miért számít?**
- **Test abort vs fail**: assumption abort-álja a tesztet, assertion fail-eli
- **Conditional testing**: tesztek csak megfelelő környezetben futnak
- **Environment isolation**: fejlesztői gép vs CI/CD különbségek kezelése
- **Resource availability**: külső szolgáltatások elérhetőségének ellenőrzése

</div>

<div class="runnable-model" data-filter="junior">

**Runnable mental model**
```java
class AssertionsVsAssumptionsTest {

    @Test
    @DisplayName("Assertions - Test MUST meet these conditions")
    void demonstrateAssertions() {
        User user = userService.createUser("John", "john@example.com");
        
        // Ezeknek teljesülniük KELL - különben a teszt FAIL
        assertNotNull(user.getId(), "User ID must not be null");
        assertEquals("John", user.getName(), "Name must match");
        assertTrue(user.isActive(), "User must be active by default");
        
        // Ha bármilyen assertion fail-el, a teszt megáll és ERROR
    }

    @Test  
    @DisplayName("Assumptions - Test only IF conditions are met")
    void demonstrateAssumptions() {
        // Feltételezzük, hogy Docker fut - ha nem, teszt ABORT (nem FAIL)
        assumeTrue(isDockerRunning(), "Docker must be running for this test");
        
        // Feltételezzük, hogy nem Windows környezet
        assumeFalse(System.getProperty("os.name").contains("Windows"));
        
        // Feltételezzük, hogy test profil aktív
        assumingThat(isTestProfileActive(), () -> {
            // Ez a rész csak akkor fut, ha test profil aktív
            DatabaseService dbService = new DatabaseService();
            assertTrue(dbService.isTestDatabase());
        });
        
        // Assumptions után jönnek a normál assertions
        User user = userService.createUser("Test", "test@example.com");
        assertNotNull(user);
    }

    @Test
    @DisplayName("Real-world example: Database tests with assumptions")
    void shouldTestDatabaseOperationsWhenAvailable() {
        // Csak akkor futtatjuk, ha adatbázis elérhető
        assumeTrue(isDatabaseAvailable(), "Database must be available");
        assumeFalse(isProduction(), "Should not run in production");
        
        // Most biztonságos az adatbázis tesztelés
        User savedUser = userRepository.save(new User("DB Test", "dbtest@example.com"));
        
        // Ezek assertion-ök - MUST teljesülni
        assertNotNull(savedUser.getId());
        assertTrue(savedUser.getId() > 0);
    }

    private boolean isDockerRunning() {
        // Docker ellenőrzés logika
        return true; // Simplified
    }

    private boolean isDatabaseAvailable() {
        try {
            dataSource.getConnection().close();
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
```
*Figyeld meg: assumeTrue/assumeFalse vs assertTrue/assertFalse különbsége.*

</div>

<div class="concept-section interview-pitfalls" data-filter="junior">

<details>
<summary>💼 <strong>Interjú buktatók</strong></summary>

<div>

- **"Mi a különbség assertion és assumption között?"** → Assertion fail-eli a tesztet, assumption abort-álja
- **"Mikor használnál assumption-t?"** → Környezet-függő teszteknél (DB elérhető, Docker fut, stb.)
- **"Assumption fail teszt eredmény?"** → Nem, aborted/skipped státusz, nem failed

</div>

</details>

</div>

### Test Naming Conventions {#test-naming-conventions}

<div class="concept-section mental-model" data-filter="junior">

🧭 **Így gondolj rá**  
*A teszt elnevezés olyan, mint egy könyv címe: első ránézésre el kell mondania mit fogsz találni benne.*

</div>

<div class="concept-section why-important" data-filter="junior">

💡 **Miért számít?**
- **Self-documenting code**: a teszt neve elmondja mit validál
- **Failure diagnosis**: fail esetén azonnal látod mi ment el
- **Team communication**: más fejlesztők megértik mit teszt minden teszt
- **Test maintenance**: könnyebb átlátni és karbantartani a teszt suite-ot

</div>

<div class="runnable-model" data-filter="junior">

**Runnable mental model**
```java
class TestNamingConventionsExample {

    // ❌ ROSSZ példák
    @Test
    void test1() { } // Mit teszt? Fogalmunk sincs
    
    @Test  
    void testUser() { } // Túl általános
    
    @Test
    void userTest() { } // Semmitmondó

    // ✅ JÓ példák - Should/When/Given pattern
    @Test
    void shouldCreateUserWhenValidDataProvided() {
        // Clearly states: what should happen + when/condition
    }

    @Test
    void shouldThrowExceptionWhenEmailIsInvalid() {
        // Expected behavior + trigger condition
    }

    @Test  
    void shouldReturnEmptyListWhenNoUsersExist() {
        // Return value + condition
    }

    // ✅ JÓ példák - Given/When/Then pattern class nevekben
    @DisplayName("User Registration Service")
    class UserRegistrationServiceTest {
        
        @Nested
        @DisplayName("When valid user data is provided")
        class WhenValidUserDataIsProvided {
            
            @Test
            @DisplayName("Should create user successfully")
            void shouldCreateUserSuccessfully() { }
            
            @Test
            @DisplayName("Should send welcome email")  
            void shouldSendWelcomeEmail() { }
        }
        
        @Nested
        @DisplayName("When invalid email is provided")
        class WhenInvalidEmailIsProvided {
            
            @Test
            @DisplayName("Should throw ValidationException")
            void shouldThrowValidationException() { }
            
            @Test
            @DisplayName("Should not create user in database")
            void shouldNotCreateUserInDatabase() { }
        }
    }

    // ✅ Domain-specific naming
    @Test
    void shouldCalculateDiscountWhenCustomerIsVip() {
        // Business rule clearly stated
    }

    @Test
    void shouldDeclinePaymentWhenInsufficientFunds() {
        // Business scenario + trigger
    }

    // ✅ Edge case naming
    @Test
    void shouldHandleNullInputGracefully() { }
    
    @Test
    void shouldReturnEmptyResultWhenSearchTermIsEmpty() { }
    
    @Test
    void shouldTimeoutAfterThirtySecondsWhenServiceIsUnresponsive() { }

    // ✅ Integration test naming
    @Test
    void shouldPersistUserToMySQLDatabaseSuccessfully() {
        // Technology + action clearly specified
    }

    @Test
    void shouldSendEmailThroughSMTPServer() {
        // External service integration clearly named
    }
}

// ✅ Test class naming conventions
class UserServiceTest { }                    // Unit tests
class UserServiceIntegrationTest { }         // Integration tests  
class UserControllerWebMvcTest { }           // Web layer tests
class UserRegistrationE2ETest { }            // End-to-end tests
class UserDatabaseMigrationTest { }          // Database tests
class UserServiceRegressionTest { }          // Regression tests
```
*Figyeld meg: should + when/given pattern + @DisplayName kombináció.*

</div>

<div class="concept-section myths" data-filter="junior">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „A test metódus neve nem számít, van @DisplayName." → A kód olvashatósága is fontos
- „Hosszú nevek rosszak." → Inkább hosszú és explicit, mint rövid és homályos  
- „Minden teszt nevében legyen 'test' szó." → Nem szükséges, a kontextus egyértelmű

</div>

</details>

</div>

### CI/CD Integration {#cicd-integration}

<div class="concept-section mental-model" data-filter="medior">

🧭 **Így gondolj rá**  
*A CI/CD integration olyan, mint egy minőségbiztosítási szalag: minden kódváltozás automatikusan átmegy a tesztelési "állomásokon" mielőtt a termék kifut a gyárból.*

</div>

<div class="concept-section why-important" data-filter="medior">

💡 **Miért számít?**
- **Automated quality gates**: minden commit automatikusan tesztelt
- **Fast feedback**: fejlesztők perceken belül kapnak visszajelzést
- **Deployment confidence**: csak tesztelt kód kerül production-ba
- **Team productivity**: manuális tesztelési idő csökkentése

</div>

<div class="runnable-model" data-filter="medior">

**Runnable mental model**
```yaml
# GitHub Actions CI/CD pipeline
name: Test and Deploy
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_PASSWORD: testpass
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up JDK 17
      uses: actions/setup-java@v3
      with:
        java-version: '17'
        distribution: 'temurin'
    
    - name: Cache Maven dependencies
      uses: actions/cache@v3
      with:
        path: ~/.m2
        key: ${{ runner.os }}-m2-${{ hashFiles('**/pom.xml') }}
    
    - name: Run Unit Tests
      run: mvn test -Dspring.profiles.active=test
    
    - name: Run Integration Tests  
      run: mvn test -Dtest="*IntegrationTest" -Dspring.profiles.active=integration
      env:
        DATABASE_URL: postgresql://localhost:5432/testdb
    
    - name: Generate Test Report
      run: mvn jacoco:report
    
    - name: Upload Coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        file: ./target/site/jacoco/jacoco.xml
```

```xml
<!-- Maven Surefire Plugin configuration -->
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <version>3.0.0-M9</version>
    <configuration>
        <groups>unit</groups>
        <excludedGroups>integration,e2e</excludedGroups>
    </configuration>
</plugin>

<!-- Maven Failsafe Plugin for integration tests -->
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-failsafe-plugin</artifactId>
    <version>3.0.0-M9</version>
    <configuration>
        <groups>integration</groups>
    </configuration>
</plugin>
```

```java
// Test categories for CI/CD separation
@Tag("unit")
class UserServiceUnitTest { }

@Tag("integration")
@SpringBootTest
class UserServiceIntegrationTest { }

@Tag("e2e")
@SpringBootTest(webEnvironment = RANDOM_PORT)
class UserRegistrationE2ETest { }
```
*Figyeld meg: különböző test kategóriák különböző CI pipeline fázisokba.*

</div>

<div class="concept-section myths" data-filter="medior">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „CI-ben minden tesztnek futnia kell." → Unit tesztek mindig, integration/E2E szelektíven
- „Flaky teszt nem probléma CI-ben." → Flaky tesztek rombolják a CI pipeline megbízhatóságot
- „Test failure esetén is deployolhatunk." → Soha, failing tesztek blokkolják a deployment-et

</div>

</details>

</div>

### Code Coverage {#code-coverage}

<div class="concept-section mental-model" data-filter="medior">

🧭 **Így gondolj rá**  
*A Code coverage olyan, mint egy térképen a már bejárt útvonalak: megmutatja, hogy a kódod melyik részét "látogatták meg" a tesztek.*

</div>

<div class="concept-section why-important" data-filter="medior">

💡 **Miért számít?**
- **Test completeness**: látsz mely kódrészek nincsenek tesztelve
- **Quality metrics**: objektív mérőszám a teszt lefedettségről
- **Refactoring safety**: magasabb coverage biztonságosabb változtatásokat jelent
- **Team standards**: csapat szintű minőségi elvárások mérése

</div>

<div class="runnable-model" data-filter="medior">

**Runnable mental model**
```xml
<!-- JaCoCo Maven Plugin configuration -->
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>0.8.8</version>
    <executions>
        <execution>
            <goals>
                <goal>prepare-agent</goal>
            </goals>
        </execution>
        <execution>
            <id>report</id>
            <phase>test</phase>
            <goals>
                <goal>report</goal>
            </goals>
        </execution>
        <execution>
            <id>check</id>
            <goals>
                <goal>check</goal>
            </goals>
            <configuration>
                <rules>
                    <rule>
                        <element>BUNDLE</element>
                        <limits>
                            <limit>
                                <counter>LINE</counter>
                                <value>COVEREDRATIO</value>
                                <minimum>0.80</minimum> <!-- 80% minimum coverage -->
                            </limit>
                        </limits>
                    </rule>
                </rules>
            </configuration>
        </execution>
    </executions>
</plugin>
```

```java
// Tesztelt kód coverage elemzéshez
public class UserService {
    
    public User createUser(String name, String email) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty");
        }
        
        if (!EmailValidator.isValid(email)) {
            throw new IllegalArgumentException("Invalid email format");
        }
        
        User user = new User(name, email);
        return userRepository.save(user);
    }
    
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException("User not found"));
        
        if (user.hasActiveOrders()) {
            throw new IllegalStateException("Cannot delete user with active orders");
        }
        
        userRepository.delete(user); // Ez a sor lehet, hogy nincs lefedve!
    }
}

// Coverage-focused testing
class UserServiceCoverageTest {
    
    @Test
    void shouldCreateValidUser() {
        // Covers: happy path, valid name, valid email
        User user = userService.createUser("John", "john@example.com");
        assertNotNull(user);
    }
    
    @Test 
    void shouldRejectEmptyName() {
        // Covers: null name validation branch
        assertThrows(IllegalArgumentException.class, 
            () -> userService.createUser(null, "john@example.com"));
    }
    
    @Test
    void shouldRejectInvalidEmail() {
        // Covers: email validation branch
        assertThrows(IllegalArgumentException.class,
            () -> userService.createUser("John", "invalid-email"));
    }
    
    @Test
    void shouldDeleteUserWithoutOrders() {
        // Covers: successful deletion path
        User user = new User("John", "john@example.com");
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(user.hasActiveOrders()).thenReturn(false);
        
        userService.deleteUser(1L);
        
        verify(userRepository).delete(user); // Most már lefedtük!
    }
}
```
*Figyeld meg: minden if/else ág, exception path lefedése külön tesztekkel.*

</div>

<div class="concept-section myths" data-filter="medior">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „100% coverage = tökéletes tesztelés." → Coverage nem jelent minőséget, csak lefedettséget
- „Alacsony coverage mindig rossz." → Néha kritikus kódrészek 100%-os coverageje fontosabb
- „Privát metódusokat is coverage-ben mérni kell." → Privát metódusok public API-n keresztül lefedettek

</div>

</details>

</div>

### Test Suites {#test-suites}

<div class="concept-section mental-model" data-filter="medior">

🧭 **Így gondolj rá**  
*A Test Suite olyan, mint egy zenekar különböző zenekari csoportjai: a vonósok, fafúvósok és rézfúvósok külön-külön is játszhatnak, de együtt adják ki a teljes szimfóniát.*

</div>

<div class="concept-section why-important" data-filter="medior">

💡 **Miért számít?**
- **Test organization**: logikus csoportosítás funkcionális területek szerint
- **Selective execution**: csak releváns tesztek futtatása (smoke, regression, etc.)
- **CI/CD optimization**: különböző pipeline szakaszokban különböző suite-ok
- **Team workflow**: különböző fejlesztői szerepkörök eltérő teszt igényei

</div>

<div class="runnable-model" data-filter="medior">

**Runnable mental model**
```java
// JUnit 5 Suite annotations
@Suite
@SuiteDisplayName("User Management Test Suite")
@SelectClasses({
    UserServiceTest.class,
    UserControllerTest.class,
    UserRepositoryTest.class
})
class UserManagementTestSuite {
    // Egy funkcionális területhez tartozó összes teszt
}

@Suite
@SuiteDisplayName("Smoke Test Suite - Critical Path")
@IncludeTags("smoke")
class SmokeTestSuite {
    // Csak a @Tag("smoke") jelölt tesztek
}

@Suite
@SuiteDisplayName("Integration Test Suite")
@IncludeTags("integration")
@ExcludeTags("slow")
class IntegrationTestSuite {
    // Integration tesztek, de lassú tesztek nélkül
}

@Suite
@SuiteDisplayName("Regression Test Suite")
@SelectPackages("com.company.regression")
class RegressionTestSuite {
    // Teljes package alapú szűrés
}

// Tag-ek használata a szűréshez
@Tag("smoke")
@Tag("critical")
class LoginControllerTest {
    
    @Test
    @Tag("happy-path")
    void shouldLoginWithValidCredentials() { }
    
    @Test
    @Tag("security")
    void shouldRejectInvalidPassword() { }
}

@Tag("integration")
@Tag("database")
class UserRepositoryIntegrationTest {
    
    @Test
    @Tag("slow")
    void shouldHandleLargeDataset() {
        // Lassú teszt - csak manuálisan futtatva
    }
}
```

```xml
<!-- Different test suites for different purposes -->
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <configuration>
        <!-- Smoke tests profile -->
        <groups>smoke</groups>
    </configuration>
</plugin>

<!-- Integration tests with Failsafe -->
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-failsafe-plugin</artifactId>
    <configuration>
        <groups>integration</groups>
        <excludedGroups>slow</excludedGroups>
    </configuration>
</plugin>
```

```bash
# Command line test suite execution
mvn test -Dgroups="smoke"                    # Csak smoke tesztek
mvn test -Dgroups="integration"               # Csak integration tesztek  
mvn test -Dgroups="smoke,regression"          # Smoke ÉS regression
mvn test -DexcludedGroups="slow,external"     # Lassú és külső tesztek nélkül
```
*Figyeld meg: @Suite, @IncludeTags, @ExcludeTags rugalmas teszt szervezéshez.*

</div>

<div class="concept-section interview-pitfalls" data-filter="medior">

<details>
<summary>💼 <strong>Interjú buktatók</strong></summary>

<div>

- **"Hogyan szerveznéd a teszteket nagy projektben?"** → Funkcionális suite-ok + tag-alapú szűrés
- **"Melyik teszt suite-okat futtatnád CI-ben?"** → Smoke + unit mindig, integration szelektíven
- **"Mi a különbség suite és category között?"** → Suite = teszt gyűjtemény, category = teszt címke

</div>

</details>

</div>

### Fixture Management {#fixture-management}

<div class="concept-section mental-model" data-filter="medior">

🧭 **Így gondolj rá**  
*A Fixture management olyan, mint egy színház kulisszakészítő műhelye: minden előadás előtt előkészíti a díszletet, és utána takarít, hogy a következő előadás tiszta lappal indulhasson.*

</div>

<div class="concept-section why-important" data-filter="medior">

💡 **Miért számít?**
- **Test isolation**: minden teszt friss, ismert adatokkal indul
- **Repeatability**: ugyanazok az adatok, ugyanazok az eredmények
- **Maintenance efficiency**: központosított teszt adat kezelés
- **Performance optimization**: gyors setup és cleanup

</div>

<div class="runnable-model" data-filter="medior">

**Runnable mental model**
```java
// Test Data Builder Pattern
public class UserTestDataBuilder {
    private String name = "Default User";
    private String email = "default@example.com";
    private boolean active = true;
    private int age = 25;
    
    public static UserTestDataBuilder aUser() {
        return new UserTestDataBuilder();
    }
    
    public UserTestDataBuilder withName(String name) {
        this.name = name;
        return this;
    }
    
    public UserTestDataBuilder withEmail(String email) {
        this.email = email;
        return this;
    }
    
    public UserTestDataBuilder inactive() {
        this.active = false;
        return this;
    }
    
    public UserTestDataBuilder withAge(int age) {
        this.age = age;
        return this;
    }
    
    public User build() {
        User user = new User(name, email);
        user.setActive(active);
        user.setAge(age);
        return user;
    }
}

// Object Mother Pattern
public class UserMother {
    
    public static User validUser() {
        return new User("John Doe", "john@example.com");
    }
    
    public static User adminUser() {
        User user = validUser();
        user.setRole(Role.ADMIN);
        return user;
    }
    
    public static User inactiveUser() {
        User user = validUser();
        user.setActive(false);
        return user;
    }
    
    public static User underageUser() {
        User user = validUser();
        user.setAge(16);
        return user;
    }
}

// Usage in tests
@TestMethodOrder(OrderAnnotation.class)
class UserServiceFixtureTest {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private TestEntityManager entityManager;
    
    private User savedUser;
    
    @BeforeEach
    void setUp() {
        // Fresh fixture for each test
        savedUser = entityManager.persistAndFlush(
            UserTestDataBuilder.aUser()
                .withName("Test User")
                .withEmail("test@example.com")
                .build()
        );
    }
    
    @Test
    void shouldFindUserById() {
        Optional<User> found = userRepository.findById(savedUser.getId());
        assertTrue(found.isPresent());
        assertEquals("Test User", found.get().getName());
    }
    
    @Test  
    void shouldUpdateUserEmail() {
        savedUser.setEmail("updated@example.com");
        User updated = userRepository.save(savedUser);
        assertEquals("updated@example.com", updated.getEmail());
    }
    
    @AfterEach
    void tearDown() {
        // Automatic cleanup with @Transactional + @Rollback
        // Or manual cleanup if needed
        userRepository.deleteAll();
    }
}

// Database fixtures with Flyway
// src/test/resources/db/migration/V999__test_data.sql
```

```sql
-- Test data setup
INSERT INTO users (name, email, active, created_at) VALUES 
    ('John Doe', 'john@example.com', true, NOW()),
    ('Jane Smith', 'jane@example.com', true, NOW()),
    ('Admin User', 'admin@example.com', true, NOW());

INSERT INTO roles (user_id, role_name) VALUES 
    (3, 'ADMIN');
```

```java
// In-Memory Database configuration
@TestPropertySource(properties = {
    "spring.datasource.url=jdbc:h2:mem:testdb",
    "spring.jpa.hibernate.ddl-auto=create-drop",
    "spring.flyway.locations=classpath:db/migration,classpath:db/testdata"
})
@DataJpaTest
class InMemoryDatabaseTest {
    // Tesztek gyors in-memory H2 adatbázissal
}
```
*Figyeld meg: Builder pattern vs Object Mother pattern különböző használati esetekre.*

</div>

<div class="concept-section myths" data-filter="medior">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Fixture-ök megoszthatók tesztek között." → Každý teszt független fixture-rel legyen
- „Production adatok jók teszthez." → Soha ne használj éles adatokat tesztekben
- „@DirtiesContext mindig megoldja a problémát." → Lassú, inkább jó cleanup logika

</div>

</details>

</div>

### Property-based Testing {#property-based-testing}

<div class="concept-section mental-model" data-filter="medior">

🧭 **Így gondolj rá**  
*A Property-based testing olyan, mint egy matematikai tétel bizonyítása: nem konkrét példákat adunk meg, hanem tulajdonságokat definiálunk, és a teszt tool generál ezer random példát hogy megcáfolja őket.*

</div>

<div class="concept-section why-important" data-filter="medior">

💡 **Miért számít?**
- **Edge case discovery**: automatikusan talál olyan eseteket, amikre nem gondoltál
- **Property validation**: üzleti szabályok teljesülését validálja
- **Regression prevention**: ugyanazok a property-k mindig teljesülnek
- **Code confidence**: bizonyítás-szerű megközelítés a tesztelésben

</div>

<div class="runnable-model" data-filter="medior">

**Runnable mental model**
```xml
<!-- jqwik dependency for Property-based testing -->
<dependency>
    <groupId>net.jqwik</groupId>
    <artifactId>jqwik</artifactId>
    <version>1.7.4</version>
    <scope>test</scope>
</dependency>
```

```java
import net.jqwik.api.*;

class PropertyBasedTestingExamples {

    @Property
    @Report(Reporting.GENERATED)
    void shouldAlwaysReturnPositiveAbsoluteValue(@ForAll int number) {
        int absolute = Math.abs(number);
        
        // Property: abszolút érték mindig >= 0
        Assertions.assertTrue(absolute >= 0);
        
        // Property: abszolút érték pozitív számoknál ugyanaz
        if (number >= 0) {
            Assertions.assertEquals(number, absolute);
        }
    }

    @Property
    void shouldMaintainListSizeAfterSortung(@ForAll List<Integer> originalList) {
        List<Integer> sortedList = new ArrayList<>(originalList);
        Collections.sort(sortedList);
        
        // Property: rendezés után méret nem változik
        Assertions.assertEquals(originalList.size(), sortedList.size());
        
        // Property: rendezés után minden elem benne van
        Assertions.assertTrue(sortedList.containsAll(originalList));
    }

    @Property
    void shouldReverseStringCorrectly(@ForAll String original) {
        String reversed = new StringBuilder(original).reverse().toString();
        String doubleReversed = new StringBuilder(reversed).reverse().toString();
        
        // Property: dupla reverse visszaadja az eredetit
        Assertions.assertEquals(original, doubleReversed);
        
        // Property: hossz megmarad
        Assertions.assertEquals(original.length(), reversed.length());
    }

    @Property
    void shouldValidateEmailFormatProperty(
        @ForAll @Email String validEmail
    ) {
        // jqwik automatikusan generál valid email címeket
        boolean isValid = EmailValidator.isValid(validEmail);
        
        // Property: minden generált email valid kell legyen
        Assertions.assertTrue(isValid, "Generated email should be valid: " + validEmail);
    }

    @Property
    void userCreationShouldFollowBusinessRules(
        @ForAll @StringLength(min = 1, max = 50) String name,
        @ForAll @Email String email,
        @ForAll @IntRange(min = 18, max = 120) int age
    ) {
        User user = new User(name, email, age);
        
        // Property: név nem lehet null vagy üres
        Assertions.assertNotNull(user.getName());
        Assertions.assertFalse(user.getName().trim().isEmpty());
        
        // Property: email formátum valid
        Assertions.assertTrue(user.getEmail().contains("@"));
        
        // Property: életkor korlátok között
        Assertions.assertTrue(user.getAge() >= 18);
        Assertions.assertTrue(user.getAge() <= 120);
        
        // Property: új user mindig aktív
        Assertions.assertTrue(user.isActive());
    }

    @Property
    void shouldMaintainEncryptionRoundtrip(@ForAll String originalPassword) {
        Assume.that(!originalPassword.isEmpty()); // Feltétel
        
        String encrypted = PasswordService.encrypt(originalPassword);
        boolean isValid = PasswordService.validate(originalPassword, encrypted);
        
        // Property: titkosítás és validálás round-trip
        Assertions.assertTrue(isValid);
        
        // Property: titkosított form nem egyezik az eredetivel
        Assertions.assertNotEquals(originalPassword, encrypted);
    }

    // Custom generator komplex objektumokhoz
    @Provide
    Arbitrary<User> validUsers() {
        return Combinators.combine(
            Arbitraries.strings().alpha().ofMinLength(1).ofMaxLength(30),
            Arbitraries.emails(),
            Arbitraries.integers().between(18, 100)
        ).as(User::new);
    }

    @Property
    void shouldHandleComplexUserOperations(@ForAll("validUsers") User user) {
        UserService service = new UserService();
        
        // Property-k komplex objektumokkal
        User savedUser = service.save(user);
        Assertions.assertNotNull(savedUser.getId());
        Assertions.assertEquals(user.getName(), savedUser.getName());
    }
}
```
*Figyeld meg: @ForAll generálja a random adatokat, property-k mindig teljesülnek.*

</div>

<div class="concept-section interview-pitfalls" data-filter="medior">

<details>
<summary>💼 <strong>Interjú buktatók</strong></summary>

<div>

- **"Mi a különbség example-based és property-based testing között?"** → Example = konkrét esetek, Property = általános szabályok
- **"Mikor használnál property-based testing-et?"** → Matematikai függvények, üzleti szabályok, adatstruktúra invariánsok
- **"Hogyan debuggolnál property-based teszt hibát?"** → jqwik shrinking automatikusan megtalálja a legkisebb hibás esetet

</div>

</details>

</div>

### Mutation Testing {#mutation-testing}

<div class="concept-section mental-model" data-filter="medior">

🧭 **Így gondolj rá**  
*A Mutation testing olyan, mint egy víruslabor: szándékosan "megfertőzöd" a kódodat kis hibákkal, és nézed, hogy a tesztjeid elkapják-e ezeket a "vírusokat".*

</div>

<div class="concept-section why-important" data-filter="medior">

💡 **Miért számít?**
- **Test quality validation**: nem csak coverage, hanem teszt minőség mérése
- **Weak test detection**: megmutatja hogy mely tesztek nem elég szigorúak
- **False security elimination**: 100% coverage nem jelent jó teszteket
- **Refactoring confidence**: erős tesztek biztonságosabb kódváltoztatásokat jelentenek

</div>

<div class="runnable-model" data-filter="medior">

**Runnable mental model**
```xml
<!-- PIT (Pitest) Maven Plugin -->
<plugin>
    <groupId>org.pitest</groupId>
    <artifactId>pitest-maven</artifactId>
    <version>1.9.0</version>
    <configuration>
        <targetClasses>
            <param>com.company.service.*</param>
        </targetClasses>
        <targetTests>
            <param>com.company.service.*Test</param>
        </targetTests>
        <outputFormats>
            <outputFormat>HTML</outputFormat>
            <outputFormat>XML</outputFormat>
        </outputFormats>
        <mutationThreshold>80</mutationThreshold>
        <coverageThreshold>90</coverageThreshold>
    </configuration>
    <executions>
        <execution>
            <id>pit-report</id>
            <phase>test</phase>
            <goals>
                <goal>mutationCoverage</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

```java
// Példa kód, amit mutation testing-gel tesztelünk
public class DiscountCalculator {
    
    public double calculateDiscount(double price, boolean isVip, int quantity) {
        if (price <= 0) {  // Mutation: < helyett <=
            throw new IllegalArgumentException("Price must be positive");
        }
        
        double discount = 0.0;
        
        if (quantity >= 10) {  // Mutation: > helyett >=
            discount += 0.1;  // Mutation: 0.05 helyett 0.1
        }
        
        if (isVip) {  // Mutation: false helyett true
            discount += 0.15;  // Mutation: 0.2 helyett 0.15
        }
        
        return price * (1 - discount);  // Mutation: + helyett -
    }
}

// Gyenge teszt - nem elég specifikus
class WeakDiscountCalculatorTest {
    
    @Test
    void shouldCalculateDiscount() {
        DiscountCalculator calculator = new DiscountCalculator();
        
        // Ez a teszt túl általános - sok mutation-t nem fog elkapni
        double result = calculator.calculateDiscount(100.0, true, 15);
        
        assertTrue(result > 0);  // Túl általános assertion!
        assertTrue(result < 100);  // Ez is túl általános!
    }
}

// Erős teszt - specifikus várakozások
class StrongDiscountCalculatorTest {
    
    @Test
    void shouldCalculateExactDiscountForVipCustomerWithBulkOrder() {
        DiscountCalculator calculator = new DiscountCalculator();
        
        // VIP + 15 darab = 10% + 15% = 25% kedvezmény
        double result = calculator.calculateDiscount(100.0, true, 15);
        
        assertEquals(75.0, result, 0.01);  // Pontos eredmény!
    }
    
    @Test
    void shouldCalculateExactDiscountForRegularCustomerWithBulkOrder() {
        DiscountCalculator calculator = new DiscountCalculator();
        
        // Nem VIP + 15 darab = csak 10% kedvezmény
        double result = calculator.calculateDiscount(100.0, false, 15);
        
        assertEquals(90.0, result, 0.01);  // Pontos eredmény!
    }
    
    @Test
    void shouldCalculateExactDiscountForVipCustomerWithSmallOrder() {
        DiscountCalculator calculator = new DiscountCalculator();
        
        // VIP + 5 darab = csak 15% kedvezmény
        double result = calculator.calculateDiscount(100.0, true, 5);
        
        assertEquals(85.0, result, 0.01);  // Pontos eredmény!
    }
    
    @Test
    void shouldThrowExceptionForNegativePrice() {
        DiscountCalculator calculator = new DiscountCalculator();
        
        // Boundary testing pontosan
        assertThrows(IllegalArgumentException.class, () -> {
            calculator.calculateDiscount(-1.0, true, 10);
        });
    }
    
    @Test
    void shouldThrowExceptionForZeroPrice() {
        DiscountCalculator calculator = new DiscountCalculator();
        
        // Boundary case: nulla ár
        assertThrows(IllegalArgumentException.class, () -> {
            calculator.calculateDiscount(0.0, true, 10);
        });
    }
}

// Mutation testing eredmények értelmezése
/*
Mutation Score: 85% (17/20 mutants killed)

Survived mutants (gyenge tesztek):
1. Line 15: >= changed to > in quantity check
   → Nincs boundary test 10 darabra pontosan
   
2. Line 19: 0.15 changed to 0.2 in VIP discount
   → Nincs pontos assertion a VIP kedvezményre
   
3. Line 23: - changed to + in final calculation
   → Általános assertion (> 0) nem elég specifikus
*/
```

```bash
# PIT futtatása Maven-ből
mvn org.pitest:pitest-maven:mutationCoverage

# Report helye
target/pit-reports/[timestamp]/index.html
```
*Figyeld meg: mutation testing feltárja a teszt gyengeségeket, nem csak coverage-et mér.*

</div>

<div class="concept-section myths" data-filter="medior">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „100% mutation score az ideális." → 80-90% már nagyon jó, 100% gyakran nem praktikus
- „Mutation testing minden kódra alkalmazható." → Komplex business logic-ra a legjobb
- „Lassú, ezért nem használható CI-ben." → Szelektíven, kritikus modulokra érdemes

</div>

</details>

</div>

### JUnit 4 vs JUnit 5 {#junit4-vs-junit5}

<div class="concept-section mental-model" data-filter="junior">

🧭 **Így gondolj rá**  
*JUnit 4 vs 5 olyan, mint egy régi autó vs egy modern hibrid: mindkettő elvisz A-ból B-be, de az új modell sokkal több funkcióval, jobb üzemanyag-hatékonysággal és karbantarthatósággal rendelkezik.*

</div>

<div class="concept-section why-important" data-filter="junior">

💡 **Miért számít?**
- **Modern Java support**: Java 8+ funkciók (lambda, stream) teljes támogatása
- **Better organization**: @Nested, @DisplayName, @Tag annotációk
- **Improved assertions**: assertAll, assertThrows, assertTimeout
- **Flexible execution**: @ParameterizedTest, @RepeatedTest, @TestFactory

</div>

<div class="runnable-model" data-filter="junior">

**Runnable mental model**
```java
// JUnit 4 - régi megközelítés
public class UserServiceJUnit4Test {
    
    @Rule
    public ExpectedException expectedException = ExpectedException.none();
    
    @Before
    public void setUp() {
        // Setup minden teszt előtt
    }
    
    @Test
    public void shouldCreateUser() {
        // Basic test - egyszerű assertion
        User user = userService.createUser("John", "john@example.com");
        Assert.assertNotNull(user);
        Assert.assertEquals("John", user.getName());
    }
    
    @Test
    public void shouldThrowExceptionForInvalidEmail() {
        // Exception testing JUnit 4-ben körülményes
        expectedException.expect(ValidationException.class);
        expectedException.expectMessage("Invalid email");
        
        userService.createUser("John", "invalid-email");
    }
    
    @Test(timeout = 5000)
    public void shouldCompleteWithinTimeout() {
        // Timeout handling primitív
        userService.createUser("John", "john@example.com");
    }
}

// JUnit 5 - modern megközelítés
@DisplayName("User Service Tests")
class UserServiceJUnit5Test {
    
    @BeforeEach
    void setUp() {
        // Modern naming convention
    }
    
    @Test
    @DisplayName("Should create user with valid data")
    void shouldCreateUserWithValidData() {
        // Modern assertions
        User user = userService.createUser("John", "john@example.com");
        
        assertAll("user properties",
            () -> assertNotNull(user.getId()),
            () -> assertEquals("John", user.getName()),
            () -> assertEquals("john@example.com", user.getEmail()),
            () -> assertTrue(user.isActive())
        );
    }
    
    @Test
    @DisplayName("Should throw exception for invalid email")
    void shouldThrowExceptionForInvalidEmail() {
        // Exception testing elegáns
        ValidationException exception = assertThrows(ValidationException.class, () -> {
            userService.createUser("John", "invalid-email");
        });
        
        assertEquals("Invalid email", exception.getMessage());
    }
    
    @Test
    @Timeout(value = 5, unit = TimeUnit.SECONDS)
    @DisplayName("Should complete within timeout")
    void shouldCompleteWithinTimeout() {
        // Modern timeout handling
        userService.createUser("John", "john@example.com");
    }
    
    @ParameterizedTest
    @ValueSource(strings = {"", " ", "null"})
    @DisplayName("Should reject invalid names")
    void shouldRejectInvalidNames(String invalidName) {
        // Parameterized testing JUnit 5-ben egyszerű
        assertThrows(ValidationException.class, () -> {
            userService.createUser(invalidName, "john@example.com");
        });
    }
    
    @RepeatedTest(5)
    @DisplayName("Should handle concurrent user creation")
    void shouldHandleConcurrentUserCreation() {
        // Repeated tests for concurrency
        User user = userService.createUser("User" + Math.random(), "test@example.com");
        assertNotNull(user.getId());
    }
    
    @Nested
    @DisplayName("When user exists")
    class WhenUserExists {
        
        private User existingUser;
        
        @BeforeEach
        void createUser() {
            existingUser = userService.createUser("Existing", "existing@example.com");
        }
        
        @Test
        @DisplayName("Should update user email")
        void shouldUpdateUserEmail() {
            // Nested test organization
            userService.updateEmail(existingUser.getId(), "updated@example.com");
            
            User updated = userService.findById(existingUser.getId());
            assertEquals("updated@example.com", updated.getEmail());
        }
    }
}

// Migration guidelines
/*
JUnit 4 → JUnit 5 mapping:
- @Before → @BeforeEach
- @After → @AfterEach  
- @BeforeClass → @BeforeAll
- @AfterClass → @AfterAll
- @Ignore → @Disabled
- @Category → @Tag
- @RunWith → @ExtendWith
- @Rule/@ClassRule → Extension API
*/
```
*Figyeld meg: JUnit 5 sokkal expresszívebb és szervezettebb teszt struktúrát tesz lehetővé.*

</div>

<div class="concept-section interview-pitfalls" data-filter="junior">

<details>
<summary>💼 <strong>Interjú buktatók</strong></summary>

<div>

- **"Mi a fő különbség JUnit 4 és 5 között?"** → Moduláris architektúra, modern Java support, jobb assertions
- **"Miért váltanál JUnit 5-re?"** → @ParameterizedTest, @Nested, assertAll, @DisplayName
- **"Hogyan migrálnál JUnit 4-ről 5-re?"** → Függőség csere, annotation mapping, vintage engine átmeneti időszakra

</div>

</details>

</div>

### Test Lifecycle Hooks {#test-lifecycle-hooks}

<div class="concept-section mental-model" data-filter="junior">

🧭 **Így gondolj rá**  
*A Test lifecycle hooks olyan, mint egy étterem működése: felkészülés (setup), vendégkiszolgálás (teszt), takarítás (cleanup) - minden lépésnek megvan a maga helye és ideje.*

</div>

<div class="concept-section why-important" data-filter="junior">

💡 **Miért számít?**
- **Resource management**: adatbázis kapcsolatok, fájlok, network resources kezelése  
- **Test isolation**: minden teszt tiszta környezetben fut
- **Performance optimization**: drága resources újrafelhasználása
- **Reliable teardown**: cleanup garantált még exception esetén is

</div>

<div class="runnable-model" data-filter="junior">

**Runnable mental model**
```java
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@DisplayName("Complete Lifecycle Example")
class TestLifecycleHooksExample {
    
    private static DatabaseConnection globalConnection;
    private UserService userService;
    private User testUser;
    
    @BeforeAll
    static void setUpClass() {
        // Egyszer fut az ÖSSZES teszt előtt (static)
        // Drága operációk: DB kapcsolat, external services
        System.out.println("🚀 Setting up test class");
        globalConnection = DatabaseConnection.create("test-database");
        globalConnection.migrate();
    }
    
    @BeforeEach
    void setUp() {
        // MINDEN teszt előtt fut
        // Fresh state minden teszthez
        System.out.println("🔧 Setting up individual test");
        userService = new UserService(globalConnection);
        testUser = new User("Test User", "test@example.com");
        
        // Clean state biztosítása
        userService.deleteAllUsers();
    }
    
    @Test
    @DisplayName("Should create user successfully")
    void shouldCreateUser() {
        System.out.println("✅ Running test: create user");
        
        User savedUser = userService.save(testUser);
        assertNotNull(savedUser.getId());
        assertEquals(testUser.getName(), savedUser.getName());
    }
    
    @Test
    @DisplayName("Should find user by email")
    void shouldFindUserByEmail() {
        System.out.println("✅ Running test: find user");
        
        userService.save(testUser);
        Optional<User> found = userService.findByEmail(testUser.getEmail());
        assertTrue(found.isPresent());
    }
    
    @AfterEach
    void tearDown() {
        // MINDEN teszt után fut
        // Test-specific cleanup
        System.out.println("🧹 Cleaning up individual test");
        
        if (userService != null) {
            userService.deleteAllUsers();
        }
        
        // Reset test state
        testUser = null;
    }
    
    @AfterAll
    static void tearDownClass() {
        // Egyszer fut az ÖSSZES teszt után (static)
        // Expensive cleanup: connections, temporary files
        System.out.println("🛑 Tearing down test class");
        
        if (globalConnection != null) {
            globalConnection.close();
        }
    }
}

// Nested lifecycle example
@DisplayName("Nested Lifecycle Example")
class NestedLifecycleExample {
    
    private DatabaseService databaseService;
    
    @BeforeAll
    static void initializeDatabase() {
        System.out.println("🗄️ Initializing database for all tests");
    }
    
    @BeforeEach
    void setUp() {
        System.out.println("🔧 Outer setup");
        databaseService = new DatabaseService();
    }
    
    @Nested
    @DisplayName("When user exists")
    class WhenUserExists {
        
        private User existingUser;
        
        @BeforeEach
        void setUpNestedTest() {
            System.out.println("👤 Creating existing user for nested tests");
            existingUser = databaseService.createUser("Existing User", "existing@example.com");
        }
        
        @Test
        void shouldUpdateExistingUser() {
            System.out.println("✅ Testing user update");
            existingUser.setName("Updated Name");
            User updated = databaseService.update(existingUser);
            assertEquals("Updated Name", updated.getName());
        }
        
        @AfterEach
        void cleanUpNestedTest() {
            System.out.println("🧹 Cleaning nested test data");
            if (existingUser != null) {
                databaseService.delete(existingUser.getId());
            }
        }
    }
    
    @Nested
    @DisplayName("When no users exist")
    class WhenNoUsersExist {
        
        @BeforeEach
        void ensureNoUsers() {
            System.out.println("🗑️ Ensuring clean state - no users");
            databaseService.deleteAllUsers();
        }
        
        @Test
        void shouldReturnEmptyList() {
            System.out.println("✅ Testing empty user list");
            List<User> users = databaseService.findAllUsers();
            assertTrue(users.isEmpty());
        }
    }
    
    @AfterEach
    void tearDown() {
        System.out.println("🧹 Outer cleanup");
        databaseService.close();
    }
}

// Lifecycle execution order visualization:
/*
setUpClass()           // @BeforeAll - egyszer
  setUp()              // @BeforeEach - test1 előtt
    test1()            // Első teszt
  tearDown()           // @AfterEach - test1 után
  setUp()              // @BeforeEach - test2 előtt  
    test2()            // Második teszt
  tearDown()           // @AfterEach - test2 után
tearDownClass()        // @AfterAll - egyszer
*/
```
*Figyeld meg: @BeforeAll/@AfterAll egyszer, @BeforeEach/@AfterEach minden teszthez.*

</div>

<div class="concept-section myths" data-filter="junior">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „@BeforeAll metódus lehet nem-static." → Csak @TestInstance(PER_CLASS) esetén
- „@AfterEach mindig lefut." → Exception esetén is lefut, de @BeforeEach hibája esetén nem
- „Nested @BeforeEach felülírja az outer-t." → Mindkettő lefut, outer először

</div>

</details>

</div>

### Advanced Assertions API {#advanced-assertions-api}

<div class="concept-section mental-model" data-filter="junior">

🧭 **Így gondolj rá**  
*Az Advanced Assertions olyan, mint egy profi szakács késkészlete: az alapkés (assertEquals) jó, de ha speciális feladatod van, akkor speciális eszközök kellenek.*

</div>

<div class="concept-section why-important" data-filter="junior">

💡 **Miért számít?**
- **Better error messages**: pontosabb hibaüzenetek könnyebb debugging-ot jelentenek
- **Complex validations**: összetett objektumok, kollekciók, exceptions validálása
- **Test readability**: kifejező assertions könnyebben olvasható teszteket eredményeznek
- **Grouped assertions**: több ellenőrzés egyszerre, jobb teszt szervezés

</div>

<div class="runnable-model" data-filter="junior">

**Runnable mental model**
```java
class AdvancedAssertionsExample {
    
    @Test
    @DisplayName("Grouped assertions with assertAll")
    void shouldValidateUserWithGroupedAssertions() {
        User user = userService.createUser("John Doe", "john@example.com", 25);
        
        // assertAll: minden assertion lefut, még ha némelyik fail is
        assertAll("User validation",
            () -> assertNotNull(user.getId(), "User ID should not be null"),
            () -> assertEquals("John Doe", user.getName(), "Name should match"),
            () -> assertEquals("john@example.com", user.getEmail(), "Email should match"),
            () -> assertTrue(user.getAge() >= 18, "User should be adult"),
            () -> assertTrue(user.isActive(), "New user should be active")
        );
    }
    
    @Test
    @DisplayName("Exception assertions with detailed validation")
    void shouldValidateExceptionsInDetail() {
        UserService userService = new UserService();
        
        // Exception type és message egyszerre
        ValidationException exception = assertThrows(ValidationException.class, () -> {
            userService.createUser("", "invalid-email", -5);
        }, "Should throw ValidationException for invalid data");
        
        // Exception message részletes ellenőrzése
        String message = exception.getMessage();
        assertAll("Exception details",
            () -> assertTrue(message.contains("name"), "Should mention name validation"),
            () -> assertTrue(message.contains("email"), "Should mention email validation"),
            () -> assertTrue(message.contains("age"), "Should mention age validation")
        );
        
        // Exception cause ellenőrzése
        assertNotNull(exception.getCause(), "Should have underlying cause");
    }
    
    @Test
    @DisplayName("Timeout assertions with various approaches")
    void shouldHandleTimeoutAssertions() {
        // Timeout with result return
        String result = assertTimeout(Duration.ofSeconds(2), () -> {
            // Valamilyen művelet, ami max 2 másodpercig tarthat
            Thread.sleep(1000);
            return "Operation completed";
        });
        assertEquals("Operation completed", result);
        
        // Preemptive timeout - megszakítja a műveletet timeout esetén
        assertTimeoutPreemptively(Duration.ofMillis(500), () -> {
            // Ez gyorsan kell lefusson
            return userService.quickLookup("john@example.com");
        });
        
        // Timeout with custom message
        assertTimeout(Duration.ofSeconds(1), () -> {
            userService.fastOperation();
        }, "Fast operation should complete within 1 second");
    }
    
    @Test
    @DisplayName("Collection and array assertions")
    void shouldValidateCollectionsAndArrays() {
        List<User> users = userService.findAllActiveUsers();
        
        // Collection size és content
        assertAll("User collection validation",
            () -> assertFalse(users.isEmpty(), "Should have active users"),
            () -> assertTrue(users.size() >= 2, "Should have at least 2 users"),
            () -> assertTrue(users.stream().allMatch(User::isActive), "All users should be active")
        );
        
        // Array assertions
        String[] userNames = users.stream().map(User::getName).toArray(String[]::new);
        String[] expectedNames = {"John Doe", "Jane Smith", "Bob Johnson"};
        
        assertArrayEquals(expectedNames, userNames, "User names should match expected order");
        
        // Iterables comparison
        List<String> actualEmails = users.stream().map(User::getEmail).collect(Collectors.toList());
        List<String> expectedEmails = Arrays.asList("john@example.com", "jane@example.com");
        
        assertIterableEquals(expectedEmails, actualEmails.subList(0, 2), "First two emails should match");
    }
    
    @Test
    @DisplayName("Assumptions and conditional testing")
    void shouldUseAssumptions() {
        // Test csak akkor fut le, ha feltétel teljesül
        assumeTrue(isDatabaseAvailable(), "Database must be available for this test");
        assumeFalse(isProduction(), "Should not run in production environment");
        
        // Conditional execution with assumingThat
        assumingThat(isTestEnvironment(), () -> {
            // Ez a rész csak test környezetben fut
            User testUser = userService.createTestUser();
            assertNotNull(testUser);
            assertTrue(testUser.getName().startsWith("TEST_"));
        });
        
        // Main test logic - mindig lefut ha assumptions ok
        User user = userService.createUser("John", "john@example.com");
        assertNotNull(user);
    }
    
    @Test
    @DisplayName("Custom assertion messages with suppliers")
    void shouldUseCustomMessages() {
        User user = userService.findById(1L);
        
        // Static message
        assertNotNull(user, "User with ID 1 should exist");
        
        // Supplier message - lazy evaluation, only when assertion fails
        assertEquals("John Doe", user.getName(), () -> {
            return String.format("Expected user name 'John Doe' but was '%s'. User details: %s", 
                user.getName(), user.toString());
        });
        
        // Complex validation with detailed failure info
        assertTrue(user.getAge() >= 18, () -> {
            List<User> allUsers = userService.findAll();
            return String.format("User age %d is below 18. All users: %s", 
                user.getAge(), allUsers.stream().map(u -> u.getName() + ":" + u.getAge()).collect(Collectors.joining(", ")));
        });
    }
    
    private boolean isDatabaseAvailable() {
        // Database availability check
        return true;
    }
    
    private boolean isProduction() {
        return "production".equals(System.getProperty("env"));
    }
    
    private boolean isTestEnvironment() {
        return "test".equals(System.getProperty("env"));
    }
}
```
*Figyeld meg: assertAll, assertThrows, assertTimeout kombináció expresszív tesztekhez.*

</div>

<div class="concept-section micro-learning" data-filter="junior">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Assertion típusok összefoglalás:**
```java
// Basic equality
assertEquals(expected, actual);
assertNotEquals(unexpected, actual);

// Null checks  
assertNull(object);
assertNotNull(object);

// Boolean checks
assertTrue(condition);
assertFalse(condition);

// Object references
assertSame(expected, actual);      // Ugyanaz az objektum referencia
assertNotSame(unexpected, actual);

// Collections és arrays
assertArrayEquals(expectedArray, actualArray);
assertIterableEquals(expectedIterable, actualIterable);

// Exceptions
assertThrows(ExceptionType.class, executable);
assertDoesNotThrow(executable);

// Timeouts
assertTimeout(duration, executable);
assertTimeoutPreemptively(duration, executable);

// Grouped
assertAll(executables...);
```

</div>

</details>

</div>

### Tagging & Filtering {#tagging-filtering}

<div class="concept-section mental-model" data-filter="medior">

🧭 **Így gondolj rá**  
*A Tagging olyan, mint egy könyvtárban a címkék: "thriller", "sci-fi", "románc" - így gyorsan megtalálod azt a fajta könyvet, amit éppen szeretnél olvasni.*

</div>

<div class="concept-section why-important" data-filter="medior">

💡 **Miért számít?**
- **Selective execution**: csak releváns teszteket futtasd (pl. smoke, regression)
- **CI/CD optimization**: különböző pipeline fázisokban különböző teszt típusok
- **Environment-specific tests**: dev, staging, production környezetre specifikus tesztek
- **Team workflow**: különböző szerepkörök (dev, QA, DevOps) eltérő teszt igényei

</div>

<div class="runnable-model" data-filter="medior">

**Runnable mental model**
```java
// Basic tagging
@Tag("smoke")
@Tag("critical")
class LoginControllerTest {
    
    @Test
    @Tag("happy-path")
    @DisplayName("Should login with valid credentials")
    void shouldLoginSuccessfully() {
        // Critical path teszt
    }
    
    @Test
    @Tag("security")
    @Tag("slow")
    @DisplayName("Should handle brute force attacks")
    void shouldHandleBruteForceAttacks() {
        // Biztonsági teszt - lassú
    }
}

@Tag("integration")
@Tag("database")
class UserRepositoryIntegrationTest {
    
    @Test
    @Tag("crud")
    void shouldCreateUser() {
        // Database CRUD operations
    }
    
    @Test
    @Tag("performance")
    @Tag("slow")
    void shouldHandleLargeDatasets() {
        // Performance teszt - csak manuálisan
    }
}

@Tag("unit")
class UserServiceUnitTest {
    
    @Test
    @Tag("validation")
    void shouldValidateUserInput() {
        // Input validation unit teszt
    }
    
    @Test
    @Tag("business-logic")
    void shouldCalculateUserScore() {
        // Business logic teszt
    }
}

// Environment-specific tags
@Tag("local-only")
class LocalDevelopmentTest {
    // Csak fejlesztői gépen futó tesztek
}

@Tag("ci-safe")
class ContinuousIntegrationTest {
    // CI környezetben biztonságosan futtatható
}

@Tag("staging-required")
class StagingEnvironmentTest {
    // Staging környezetet igénylő tesztek
}

// Custom tag interfaces for better organization
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Tag("smoke")
@Test
public @interface SmokeTest {
}

@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Tag("integration")
@Tag("slow")
public @interface SlowIntegrationTest {
}

// Usage of custom tags
class UserServiceTaggedTest {
    
    @SmokeTest
    @DisplayName("Should create user - smoke test")
    void shouldCreateUserSmokeTest() {
        // Smoke teszt custom annotációval
    }
    
    @SlowIntegrationTest
    @DisplayName("Should handle concurrent user creation")
    void shouldHandleConcurrentCreation() {
        // Lassú integration teszt
    }
}

// Test suites with tag filtering
@Suite
@SuiteDisplayName("Smoke Test Suite")
@IncludeTags("smoke")
class SmokeTestSuite {
    // Csak smoke tag-gel jelölt tesztek
}

@Suite
@SuiteDisplayName("Fast Test Suite")  
@IncludeTags({"unit", "integration"})
@ExcludeTags({"slow", "external"})
class FastTestSuite {
    // Unit és integration, de slow és external nélkül
}

@Suite
@SuiteDisplayName("CI Test Suite")
@IncludeTags("ci-safe")
@ExcludeTags({"local-only", "manual"})
class CITestSuite {
    // CI környezetben futtatható tesztek
}
```

```xml
<!-- Maven configuration for tag-based execution -->
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <configuration>
        <!-- Smoke tests csak -->
        <groups>smoke</groups>
    </configuration>
</plugin>

<!-- Different profiles for different test types -->
<profiles>
    <profile>
        <id>smoke-tests</id>
        <properties>
            <groups>smoke</groups>
        </properties>
    </profile>
    
    <profile>
        <id>integration-tests</id>
        <properties>
            <groups>integration</groups>
            <excludedGroups>slow</excludedGroups>
        </properties>
    </profile>
    
    <profile>
        <id>all-tests</id>
        <properties>
            <groups>unit,integration,smoke</groups>
        </properties>
    </profile>
</profiles>
```

```bash
# Command line tag filtering
mvn test -Dgroups="smoke"                     # Csak smoke tesztek
mvn test -Dgroups="unit,integration"          # Unit ÉS integration tesztek
mvn test -DexcludedGroups="slow,external"     # Slow és external tesztek nélkül
mvn test -Dgroups="smoke" -DexcludedGroups="slow"  # Smoke igen, slow nem

# Profile-based execution
mvn test -P smoke-tests                       # Smoke profile
mvn test -P integration-tests                 # Integration profile
mvn test -P all-tests                         # Minden teszt
```
*Figyeld meg: @Tag annotációk és Maven profiles kombinációja rugalmas teszt futtatást tesz lehetővé.*

</div>

<div class="concept-section interview-pitfalls" data-filter="medior">

<details>
<summary>💼 <strong>Interjú buktatók</strong></summary>

<div>

- **"Hogyan szerveznéd a teszteket CI/CD pipeline-ban?"** → Tag-alapú szűrés: smoke → unit → integration → E2E
- **"Melyik teszteket futtatnád pull request-nél?"** → @Tag("fast") és @ExcludeTags("slow")
- **"Mi a custom tag annotation előnye?"** → Type safety, központi tag management, könnyebb refactoring

</div>

</details>

</div>

### Custom Extensions {#custom-extensions}

<div class="concept-section mental-model" data-filter="medior">

🧭 **Így gondolj rá**  
*A Custom Extension olyan, mint egy svájci bicska: alapból hasznos a teszt keretrendszer, de saját "szerszámokat" is készíthetsz a specifikus igényeidhez.*

</div>

<div class="concept-section why-important" data-filter="medior">

💡 **Miért számít?**
- **Reusable test logic**: gyakori setup/teardown logika újrafelhasználhatósága
- **Cross-cutting concerns**: logging, timing, resource management centralizálása
- **Custom test behavior**: saját test lifecycle, conditional execution, parameter injection
- **Team standards**: konzisztens teszt praktikák enforcement

</div>

<div class="runnable-model" data-filter="medior">

**Runnable mental model**
```java
// 1. Timing Extension - teszt futási idő mérése
public class TimingExtension implements BeforeEachCallback, AfterEachCallback {
    
    private static final Logger logger = LoggerFactory.getLogger(TimingExtension.class);
    private static final String START_TIME = "start_time";
    
    @Override
    public void beforeEach(ExtensionContext context) throws Exception {
        getStore(context).put(START_TIME, System.currentTimeMillis());
    }
    
    @Override
    public void afterEach(ExtensionContext context) throws Exception {
        ExtensionContext.Store store = getStore(context);
        long startTime = store.remove(START_TIME, long.class);
        long duration = System.currentTimeMillis() - startTime;
        
        logger.info("Test {} took {} ms", context.getDisplayName(), duration);
        
        // Warning ha teszt túl lassú
        if (duration > 5000) {
            logger.warn("Slow test detected: {} took {} ms", context.getDisplayName(), duration);
        }
    }
    
    private ExtensionContext.Store getStore(ExtensionContext context) {
        return context.getStore(ExtensionContext.Namespace.create(getClass(), context.getRequiredTestMethod()));
    }
}

// 2. Database Cleanup Extension
public class DatabaseCleanupExtension implements AfterEachCallback {
    
    @Override
    public void afterEach(ExtensionContext context) throws Exception {
        // Minden teszt után adatbázis takarítás
        TestDatabaseManager testDb = TestDatabaseManager.getInstance();
        testDb.cleanupTestData();
        testDb.resetSequences();
        
        System.out.println("🧹 Database cleaned after: " + context.getDisplayName());
    }
}

// 3. Conditional Execution Extension
public class EnvironmentExtension implements ExecutionCondition {
    
    @Override
    public ConditionEvaluationResult evaluateExecutionCondition(ExtensionContext context) {
        Optional<Environment> annotation = findAnnotation(context.getElement(), Environment.class);
        
        if (annotation.isPresent()) {
            String requiredEnv = annotation.get().value();
            String currentEnv = System.getProperty("test.environment", "dev");
            
            if (requiredEnv.equals(currentEnv)) {
                return ConditionEvaluationResult.enabled("Environment matches: " + currentEnv);
            } else {
                return ConditionEvaluationResult.disabled("Test requires " + requiredEnv + " but running on " + currentEnv);
            }
        }
        
        return ConditionEvaluationResult.enabled("No environment restriction");
    }
}

// Custom annotation az Environment extension-höz
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Environment {
    String value();
}

// 4. Parameter Injection Extension
public class TestUserExtension implements ParameterResolver {
    
    @Override
    public boolean supportsParameter(ParameterContext parameterContext, ExtensionContext extensionContext) {
        return parameterContext.getParameter().getType() == TestUser.class;
    }
    
    @Override
    public Object resolveParameter(ParameterContext parameterContext, ExtensionContext extensionContext) {
        TestUser annotation = parameterContext.findAnnotation(TestUser.class).orElse(null);
        
        if (annotation != null) {
            return new User(annotation.name(), annotation.email(), annotation.age());
        }
        
        // Default test user
        return new User("Default Test User", "default@test.com", 25);
    }
}

@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
public @interface TestUser {
    String name() default "Test User";
    String email() default "test@example.com";
    int age() default 25;
}

// 5. Composite Extension - több extension kombinálása
@ExtendWith({
    TimingExtension.class,
    DatabaseCleanupExtension.class,
    EnvironmentExtension.class,
    TestUserExtension.class
})
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface IntegrationTest {
}

// Usage examples
@ExtendWith(TimingExtension.class)
class TimedUserServiceTest {
    
    @Test
    void shouldCreateUserQuickly() {
        // Ez a teszt automatikusan mérve lesz
        User user = userService.createUser("John", "john@example.com");
        assertNotNull(user);
    }
}

@IntegrationTest  // Composite annotation
@Environment("staging")
class StagingIntegrationTest {
    
    @Test
    void shouldWorkInStagingEnvironment(@TestUser(name = "Staging User") User testUser) {
        // Automatikus timing, database cleanup, environment check, user injection
        User savedUser = userService.save(testUser);
        assertEquals("Staging User", savedUser.getName());
    }
}

// 6. Advanced: Configuration Extension
public class TestConfigurationExtension implements BeforeAllCallback {
    
    @Override
    public void beforeAll(ExtensionContext context) throws Exception {
        // Test-specific configuration setup
        Optional<TestConfiguration> annotation = findAnnotation(context.getTestClass(), TestConfiguration.class);
        
        if (annotation.isPresent()) {
            TestConfiguration config = annotation.get();
            
            // Database configuration
            System.setProperty("spring.datasource.url", config.databaseUrl());
            System.setProperty("spring.profiles.active", config.activeProfiles());
            
            // External service configuration
            if (config.mockExternalServices()) {
                MockServiceManager.enableMocks();
            }
            
            System.out.println("🔧 Test configuration applied: " + config.description());
        }
    }
}

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface TestConfiguration {
    String databaseUrl() default "jdbc:h2:mem:testdb";
    String activeProfiles() default "test";
    boolean mockExternalServices() default true;
    String description() default "Default test configuration";
}
```
*Figyeld meg: Extension API segítségével saját teszt infrastruktúra építhető.*

</div>

<div class="concept-section myths" data-filter="medior">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Extension csak haladó használatra való." → Egyszerű extensions (pl. timing) könnyen készíthetők
- „@ExtendWith helyettesíti a @BeforeEach/@AfterEach-t." → Kiegészíti, nem helyettesíti
- „Extension state-t tárolhat instance variable-ben." → Store API-t kell használni thread safety miatt

</div>

</details>

</div>

### @SpringBootTest {#springboottest}

<div class="concept-section mental-model" data-filter="medior">

🧭 **Így gondolj rá**  
*@SpringBootTest olyan, mint egy teljes színház előadása: felépíti a teljes díszletet (Spring context), minden szereplővel (beans), míg a slice tesztek csak egy jelenetet próbálnak.*

</div>

<div class="concept-section why-important" data-filter="medior">

💡 **Miért számít?**
- **Full application context**: teljes Spring boot alkalmazás tesztelése
- **Real environment simulation**: valós konfigurációk, profiles, properties
- **End-to-end testing**: teljes request-response ciklus HTTP servlet container-rel
- **Integration confidence**: komponensek valós együttműködésének validálása

</div>

<div class="runnable-model" data-filter="medior">

**Runnable mental model**
```java
// 1. Basic @SpringBootTest - teljes context
@SpringBootTest
class UserServiceIntegrationTest {
    
    @Autowired
    private UserService userService;  // Valós Spring bean injection
    
    @Autowired
    private UserRepository userRepository;
    
    @Test
    void shouldCreateUserWithFullContext() {
        // Teljes Spring alkalmazás fut, minden bean elérhető
        User user = userService.createUser("John", "john@example.com");
        
        assertNotNull(user.getId());
        assertTrue(userRepository.existsById(user.getId()));
    }
}

// 2. Web Environment Testing
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserControllerIntegrationTest {
    
    @Autowired
    private TestRestTemplate restTemplate;  // HTTP client teszteléshez
    
    @LocalServerPort
    private int port;
    
    @Test
    void shouldCreateUserViaHTTP() {
        // Valós HTTP kérés a futó serverre
        CreateUserRequest request = new CreateUserRequest("John", "john@example.com");
        
        ResponseEntity<User> response = restTemplate.postForEntity(
            "http://localhost:" + port + "/api/users", 
            request, 
            User.class
        );
        
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody().getId());
    }
    
    @Test
    void shouldReturnNotFoundForInvalidUser() {
        ResponseEntity<String> response = restTemplate.getForEntity(
            "http://localhost:" + port + "/api/users/999", 
            String.class
        );
        
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}

// 3. Mock Environment vs Real Server
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
class MockWebEnvironmentTest {
    
    @Autowired
    private MockMvc mockMvc;  // Mock servlet environment
    
    @Test
    void shouldTestWithMockMvc() throws Exception {
        // Mock servlet container, nincs valós HTTP
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"John\",\"email\":\"john@example.com\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("John"));
    }
}

// 4. Database Integration with TestContainers
@SpringBootTest
@Testcontainers
class DatabaseIntegrationTest {
    
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:13")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("test");
    
    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }
    
    @Autowired
    private UserRepository userRepository;
    
    @Test
    void shouldPersistUserToRealDatabase() {
        // Valós PostgreSQL adatbázis használata
        User user = new User("John", "john@example.com");
        User saved = userRepository.save(user);
        
        assertNotNull(saved.getId());
        assertTrue(userRepository.findById(saved.getId()).isPresent());
    }
}

// 5. Configuration and Profiles
@SpringBootTest(
    properties = {
        "spring.datasource.url=jdbc:h2:mem:testdb",
        "logging.level.com.company=DEBUG",
        "feature.new-user-flow=true"
    },
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
@ActiveProfiles({"test", "integration"})
class ConfigurationTest {
    
    @Value("${feature.new-user-flow}")
    private boolean newUserFlowEnabled;
    
    @Test
    void shouldUseTestConfiguration() {
        assertTrue(newUserFlowEnabled, "New user flow should be enabled in test");
    }
}

// 6. @MockBean vs @Autowired
@SpringBootTest
class MockBeanExampleTest {
    
    @MockBean
    private EmailService emailService;  // Mock bean helyettesíti a valós bean-t
    
    @Autowired
    private UserService userService;    // Valós bean, de mock email service-szel
    
    @Test
    void shouldMockExternalDependencies() {
        // Email service mock-olva, de User service valós
        when(emailService.sendWelcomeEmail(any())).thenReturn(true);
        
        User user = userService.createUser("John", "john@example.com");
        
        verify(emailService).sendWelcomeEmail(user.getEmail());
        assertNotNull(user.getId());
    }
}

// 7. Transaction and Rollback
@SpringBootTest
@Transactional
class TransactionalTest {
    
    @Autowired
    private UserRepository userRepository;
    
    @Test
    @Rollback  // Default behavior - teszt után rollback
    void shouldRollbackAfterTest() {
        User user = userRepository.save(new User("Temp", "temp@example.com"));
        assertNotNull(user.getId());
        
        // Teszt után automatikus rollback - nem marad az adatbázisban
    }
    
    @Test
    @Rollback(false)  // Commit a teszt után
    void shouldCommitAfterTest() {
        User user = userRepository.save(new User("Permanent", "permanent@example.com"));
        // Ez megmarad az adatbázisban
    }
}

// 8. Context Caching
@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
class ContextDirtyingTest {
    
    @Test
    void testThatModifiesContext() {
        // Ha ez a teszt módosítja a Spring context-et,
        // @DirtiesContext biztosítja hogy új context jöjjön létre
    }
}
```
*Figyeld meg: @SpringBootTest különböző módjai (MOCK, RANDOM_PORT, DEFINED_PORT, NONE).*

</div>

<div class="concept-section interview-pitfalls" data-filter="medior">

<details>
<summary>💼 <strong>Interjú buktatók</strong></summary>

<div>

- **"Mikor használnál @SpringBootTest vs @WebMvcTest?"** → @SpringBootTest teljes context, @WebMvcTest csak web layer
- **"Mi a különbség MOCK és RANDOM_PORT között?"** → MOCK = mock servlet, RANDOM_PORT = valós embedded server  
- **"Hogyan kezelnéd a lassú @SpringBootTest-eket?"** → Context caching, @DirtiesContext optimalizálás, slice testing

</div>

</details>

</div>

### MockMvc Deep Dive {#mockmvc-deep-dive}

<div class="concept-section mental-model" data-filter="medior">

🧭 **Így gondolj rá**  
*MockMvc olyan, mint egy színházi próba: a valós előadás (HTTP server) nélkül gyakorolhatod a darabot (API endpoint-okat), de mégis teljes díszlettel és jelmezekkel.*

</div>

<div class="concept-section why-important" data-filter="medior">

💡 **Miért számít?**
- **Fast web layer testing**: nincs valós HTTP server indítás
- **Full Spring MVC stack**: valós controller, filter, interceptor tesztelés
- **Request/Response validation**: HTTP headers, status codes, content validation
- **Security integration**: authentication, authorization tesztelés

</div>

<div class="runnable-model" data-filter="medior">

**Runnable mental model**
```java
@WebMvcTest(UserController.class)
class MockMvcDeepDiveTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private UserService userService;
    
    @Test
    @DisplayName("Should handle GET request with path variables")
    void shouldHandleGetRequestWithPathVariables() throws Exception {
        // Given
        User user = new User(1L, "John Doe", "john@example.com");
        when(userService.findById(1L)).thenReturn(user);
        
        // When & Then
        mockMvc.perform(get("/api/users/{id}", 1L)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())  // Console-ra kiírja a request/response-t
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("John Doe"))
                .andExpect(jsonPath("$.email").value("john@example.com"));
    }
    
    @Test
    @DisplayName("Should handle POST request with JSON body")
    void shouldHandlePostRequestWithJsonBody() throws Exception {
        // Given
        User newUser = new User(null, "Jane Smith", "jane@example.com");
        User savedUser = new User(2L, "Jane Smith", "jane@example.com");
        when(userService.createUser(any(User.class))).thenReturn(savedUser);
        
        // When & Then
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                        "name": "Jane Smith",
                        "email": "jane@example.com"
                    }
                    """))
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"))
                .andExpect(header().string("Location", containsString("/api/users/2")))
                .andExpect(jsonPath("$.id").value(2))
                .andExpect(jsonPath("$.name").value("Jane Smith"));
    }
    
    @Test
    @DisplayName("Should handle validation errors")
    void shouldHandleValidationErrors() throws Exception {
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                        "name": "",
                        "email": "invalid-email"
                    }
                    """))
                .andExpect(status().isBadRequest())
                .andExpected(jsonPath("$.errors").isArray())
                .andExpect(jsonPath("$.errors[*].field", hasItems("name", "email")))
                .andExpect(jsonPath("$.errors[*].message", hasItem(containsString("must not be blank"))));
    }
    
    @Test
    @DisplayName("Should handle query parameters and filters")
    void shouldHandleQueryParametersAndFilters() throws Exception {
        // Given
        List<User> users = Arrays.asList(
            new User(1L, "John", "john@example.com"),
            new User(2L, "Jane", "jane@example.com")
        );
        when(userService.findUsers("john", 0, 10)).thenReturn(users);
        
        // When & Then
        mockMvc.perform(get("/api/users")
                .param("search", "john")
                .param("page", "0")
                .param("size", "10")
                .param("sort", "name,asc"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.content", hasSize(2)))
                .andExpect(jsonPath("$.totalElements").value(2))
                .andExpect(jsonPath("$.pageable.pageNumber").value(0));
    }
    
    @Test
    @DisplayName("Should handle file upload")
    void shouldHandleFileUpload() throws Exception {
        MockMultipartFile file = new MockMultipartFile(
            "avatar",
            "avatar.jpg",
            MediaType.IMAGE_JPEG_VALUE,
            "fake image content".getBytes()
        );
        
        when(userService.updateAvatar(eq(1L), any(MultipartFile.class))).thenReturn(true);
        
        mockMvc.perform(multipart("/api/users/{id}/avatar", 1L)
                .file(file))
                .andExpect(status().isOk())
                .andExpect(content().string("Avatar updated successfully"));
    }
    
    @Test
    @DisplayName("Should handle custom headers and authentication")
    void shouldHandleCustomHeadersAndAuthentication() throws Exception {
        User user = new User(1L, "Admin User", "admin@example.com");
        when(userService.findById(1L)).thenReturn(user);
        
        mockMvc.perform(get("/api/users/{id}", 1L)
                .header("X-API-Version", "v1")
                .header("Authorization", "Bearer fake-jwt-token")
                .header("X-Request-ID", "12345"))
                .andExpect(status().isOk())
                .andExpect(header().exists("X-Response-Time"))
                .andExpect(jsonPath("$.name").value("Admin User"));
    }
    
    @Test
    @DisplayName("Should test error handling")
    void shouldTestErrorHandling() throws Exception {
        when(userService.findById(999L)).thenThrow(new UserNotFoundException("User not found"));
        
        mockMvc.perform(get("/api/users/{id}", 999L)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error").value("User not found"))
                .andExpect(jsonPath("$.timestamp").exists())
                .andExpect(jsonPath("$.path").value("/api/users/999"));
    }
    
    @Test
    @DisplayName("Should test CORS headers")
    void shouldTestCorsHeaders() throws Exception {
        mockMvc.perform(options("/api/users")
                .header("Origin", "http://localhost:3000")
                .header("Access-Control-Request-Method", "POST")
                .header("Access-Control-Request-Headers", "Content-Type"))
                .andExpect(status().isOk())
                .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:3000"))
                .andExpect(header().string("Access-Control-Allow-Methods", containsString("POST")))
                .andExpect(header().string("Access-Control-Allow-Headers", containsString("Content-Type")));
    }
    
    @Test
    @DisplayName("Should capture and validate response details")
    void shouldCaptureAndValidateResponseDetails() throws Exception {
        User user = new User(1L, "Test User", "test@example.com");
        when(userService.findById(1L)).thenReturn(user);
        
        MvcResult result = mockMvc.perform(get("/api/users/{id}", 1L))
                .andExpect(status().isOk())
                .andReturn();
        
        // Response content manual validation
        String responseContent = result.getResponse().getContentAsString();
        assertThat(responseContent).contains("Test User");
        
        // Response headers manual validation
        String contentType = result.getResponse().getHeader("Content-Type");
        assertThat(contentType).contains("application/json");
        
        // Convert to object for complex validation
        ObjectMapper mapper = new ObjectMapper();
        User responseUser = mapper.readValue(responseContent, User.class);
        assertThat(responseUser.getName()).isEqualTo("Test User");
    }
}

// Security testing with MockMvc
@WebMvcTest(SecureController.class)
@Import(SecurityConfig.class)
class MockMvcSecurityTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Should allow admin access")
    void shouldAllowAdminAccess() throws Exception {
        mockMvc.perform(get("/api/admin/users"))
                .andExpect(status().isOk());
    }
    
    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("Should deny user access to admin endpoint")
    void shouldDenyUserAccessToAdminEndpoint() throws Exception {
        mockMvc.perform(get("/api/admin/users"))
                .andExpect(status().isForbidden());
    }
    
    @Test
    @DisplayName("Should require authentication")
    void shouldRequireAuthentication() throws Exception {
        mockMvc.perform(get("/api/admin/users"))
                .andExpect(status().isUnauthorized());
    }
}
```
*Figyeld meg: MockMvc teljes HTTP request/response ciklus szimulációja teszt környezetben.*

</div>

<div class="concept-section micro-learning" data-filter="medior">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**MockMvc matcher összefoglaló:**
```java
// Status matchers
status().isOk()
status().isCreated() 
status().isBadRequest()
status().isNotFound()

// Content matchers
content().contentType(MediaType.APPLICATION_JSON)
content().string("expected string")
content().bytes(expectedBytes)

// JSON Path matchers
jsonPath("$.name").value("John")
jsonPath("$.users", hasSize(3))
jsonPath("$.users[0].email").exists()

// Header matchers
header().exists("Location")
header().string("Content-Type", "application/json")

// Request builders
get("/path").param("key", "value")
post("/path").content(json)
multipart("/path").file(mockFile)
```

</div>

</details>

</div>

### Embedded Databases {#embedded-databases}

<div class="concept-section mental-model" data-filter="medior">

🧭 **Így gondolj rá**  
*Az Embedded database olyan, mint egy tábláskámpa: gyorsan felállítod a teszteléshez, használod, majd összecsomagolod - nincs külső infrastruktúra függőség.*

</div>

<div class="concept-section why-important" data-filter="medior">

💡 **Miért számít?**
- **Fast test execution**: memóriában fut, nincs network I/O
- **Test isolation**: minden teszt friss adatbázist kap
- **No external dependencies**: nincs szükség külső adatbázis szerverre
- **CI/CD friendly**: reproducible, környezet-független tesztek

</div>

<div class="runnable-model" data-filter="medior">

**Runnable mental model**
```java
// H2 in-memory database configuration
@DataJpaTest
@TestPropertySource(properties = {
    "spring.datasource.url=jdbc:h2:mem:testdb;MODE=PostgreSQL;DATABASE_TO_LOWER=TRUE",
    "spring.datasource.driver-class-name=org.h2.Driver",
    "spring.jpa.hibernate.ddl-auto=create-drop",
    "spring.jpa.show-sql=true"
})
class H2EmbeddedDatabaseTest {
    
    @Autowired
    private TestEntityManager entityManager;
    
    @Autowired 
    private UserRepository userRepository;
    
    @Test
    void shouldPersistUserToH2Database() {
        // H2 adatbázis memóriában, gyors teszt
        User user = new User("John", "john@example.com");
        User saved = entityManager.persistAndFlush(user);
        
        assertNotNull(saved.getId());
        
        Optional<User> found = userRepository.findById(saved.getId());
        assertTrue(found.isPresent());
        assertEquals("John", found.get().getName());
    }
    
    @Test
    void shouldHandleComplexQueries() {
        // Complex SQL queries H2-ben
        entityManager.persistAndFlush(new User("John", "john@example.com"));
        entityManager.persistAndFlush(new User("Jane", "jane@example.com"));
        entityManager.persistAndFlush(new User("Bob", "bob@example.com"));
        
        List<User> usersWithJInName = userRepository.findByNameContaining("J");
        
        assertEquals(2, usersWithJInName.size());
        assertTrue(usersWithJInName.stream().allMatch(u -> u.getName().contains("J")));
    }
}

// HSQLDB configuration
@DataJpaTest
@TestPropertySource(properties = {
    "spring.datasource.url=jdbc:hsqldb:mem:testdb",
    "spring.datasource.driver-class-name=org.hsqldb.jdbc.JDBCDriver",
    "spring.jpa.database-platform=org.hibernate.dialect.HSQLDialect"
})
class HSQLDBEmbeddedTest {
    
    @Autowired
    private UserRepository userRepository;
    
    @Test
    void shouldWorkWithHSQLDB() {
        User user = userRepository.save(new User("Test", "test@example.com"));
        assertNotNull(user.getId());
    }
}

// Custom embedded database configuration
@TestConfiguration
public class EmbeddedDatabaseConfig {
    
    @Bean
    @Primary
    public DataSource embeddedDataSource() {
        return new EmbeddedDatabaseBuilder()
                .setType(EmbeddedDatabaseType.H2)
                .setName("testdb")
                .addScript("classpath:schema.sql")  // DDL scripts
                .addScript("classpath:test-data.sql")  // Test data
                .build();
    }
}

// SQL scripts for embedded database
```

```sql
-- schema.sql - DDL script
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    bio TEXT,
    avatar_url VARCHAR(500),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- test-data.sql - Test data insertion
INSERT INTO users (name, email, active) VALUES 
    ('Test User 1', 'test1@example.com', true),
    ('Test User 2', 'test2@example.com', true),
    ('Inactive User', 'inactive@example.com', false);

INSERT INTO user_profiles (user_id, bio) VALUES 
    (1, 'Test user 1 bio'),
    (2, 'Test user 2 bio');
```

```java
// Database versioning with Flyway + embedded DB
@SpringBootTest
@TestPropertySource(properties = {
    "spring.flyway.locations=classpath:db/migration,classpath:db/testdata",
    "spring.datasource.url=jdbc:h2:mem:testdb"
})
class FlywayEmbeddedDatabaseTest {
    
    @Autowired
    private Flyway flyway;
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @Test
    void shouldRunFlywayMigrations() {
        // Flyway migrations futnak az embedded DB-n
        MigrationInfo[] migrations = flyway.info().all();
        
        assertTrue(migrations.length > 0);
        assertEquals(MigrationState.SUCCESS, migrations[0].getState());
    }
    
    @Test
    void shouldHaveTestDataFromMigrations() {
        // Test data migrations eredménye
        Integer userCount = jdbcTemplate.queryForObject(
            "SELECT COUNT(*) FROM users", Integer.class);
        
        assertTrue(userCount > 0);
    }
}

// Performance comparison: Embedded vs TestContainers
@TestMethodOrder(OrderAnnotation.class)
class DatabasePerformanceComparisonTest {
    
    @Test
    @Order(1)
    @DisplayName("H2 embedded database performance")
    void testH2Performance() {
        long startTime = System.currentTimeMillis();
        
        // 1000 user létrehozása H2-ben
        for (int i = 0; i < 1000; i++) {
            userRepository.save(new User("User " + i, "user" + i + "@example.com"));
        }
        
        long duration = System.currentTimeMillis() - startTime;
        System.out.println("H2 embedded: " + duration + "ms");
        
        assertTrue(duration < 5000, "H2 should be fast");
    }
    
    // Comparison: TestContainers PostgreSQL-hez hasonlítva
    // H2: ~500ms, PostgreSQL TestContainer: ~3000ms
}

// Database state management
@DataJpaTest
class DatabaseStateManagementTest {
    
    @Autowired
    private TestEntityManager entityManager;
    
    @BeforeEach
    void setUpTestData() {
        // Fresh state minden teszthez
        User user1 = new User("Setup User 1", "setup1@example.com");
        User user2 = new User("Setup User 2", "setup2@example.com");
        
        entityManager.persist(user1);
        entityManager.persist(user2);
        entityManager.flush();
    }
    
    @Test
    @Transactional
    @Rollback  // Automatic rollback (default)
    void shouldRollbackChanges() {
        User newUser = new User("Temporary", "temp@example.com");
        entityManager.persist(newUser);
        
        // Változások nem maradnak meg teszt után
    }
    
    @Test  
    @Sql("/test-data/additional-users.sql")  // Additional SQL before test
    @Sql(scripts = "/cleanup.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    void shouldExecuteCustomSQL() {
        // Custom SQL scripts execution
        List<User> allUsers = userRepository.findAll();
        assertTrue(allUsers.size() > 2);  // Setup data + SQL script data
    }
}
```
*Figyeld meg: embedded adatbázisok gyorsak, de néha SQL dialect különbségek lehetnek.*

</div>

<div class="concept-section myths" data-filter="medior">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „H2 teljesen kompatibilis PostgreSQL-lel." → Sok esetben igen, de dialect különbségek lehetnek
- „Embedded DB mindig gyorsabb." → Memory footprint és GC pressure miatt nagy adatmennyiségnél nem
- „Test data megmarad tesztek között." → @Transactional + @Rollback automatikus cleanup

</div>

</details>

</div>

### Flaky Tests {#flaky-tests}

<div class="concept-section mental-model" data-filter="medior">

🧭 **Így gondolj rá**  
*A Flaky test olyan, mint egy rossz internetkapcsolat: néha működik, néha nem, és sosem tudod előre melyik lesz - ezáltal megbízhatatlan és frusztráló.*

</div>

<div class="concept-section why-important" data-filter="medior">

💡 **Miért számít?**
- **CI/CD reliability**: instabil tesztek rombolják a pipeline megbízhatóságát
- **Developer confidence**: fejlesztők elveszítik a bizalmat a teszt suite-ban
- **Time waste**: false positive hibák debug-olása időpocsékolás
- **Deployment risks**: valós hibák elfedése "ismert flaky tesztek" között

</div>

<div class="runnable-model" data-filter="medior">

**Runnable mental model**
```java
// ❌ FLAKY: Timing-based test
class FlakyTimingTest {
    
    @Test
    void shouldCompleteTaskWithinTime() {
        long startTime = System.currentTimeMillis();
        
        // Problémás: külső faktortól függ (CPU load, GC, etc.)
        taskService.executeTask();
        
        long duration = System.currentTimeMillis() - startTime;
        assertTrue(duration < 1000, "Task should complete within 1 second");
        // Flaky: sometimes fails due to system load
    }
}

// ✅ STABLE: Proper timeout handling
class StableTimingTest {
    
    @Test
    @Timeout(value = 5, unit = TimeUnit.SECONDS)
    void shouldCompleteTaskWithProperTimeout() {
        // JUnit timeout built-in mechanizmus
        CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
            taskService.executeTask();
        });
        
        // Proper timeout handling
        assertDoesNotThrow(() -> future.get(2, TimeUnit.SECONDS));
    }
}

// ❌ FLAKY: Thread synchronization issues
class FlakyAsyncTest {
    
    @Test
    void shouldHandleAsyncOperation() throws InterruptedException {
        AtomicBoolean completed = new AtomicBoolean(false);
        
        asyncService.executeAsync(() -> {
            // Async work
            completed.set(true);
        });
        
        // Problémás: fix delay, race condition
        Thread.sleep(1000);  // Flaky!
        assertTrue(completed.get());
    }
}

// ✅ STABLE: Proper async testing
class StableAsyncTest {
    
    @Test
    void shouldHandleAsyncOperationProperly() throws Exception {
        CountDownLatch latch = new CountDownLatch(1);
        AtomicBoolean completed = new AtomicBoolean(false);
        
        asyncService.executeAsync(() -> {
            completed.set(true);
            latch.countDown();  // Signal completion
        });
        
        // Proper synchronization
        assertTrue(latch.await(5, TimeUnit.SECONDS), "Async operation should complete");
        assertTrue(completed.get());
    }
}

// ❌ FLAKY: Random data without fixed seed
class FlakyRandomTest {
    
    @Test
    void shouldValidateRandomUserGeneration() {
        // Problémás: random seed, unpredictable results
        Random random = new Random();
        int userId = random.nextInt(1000);
        
        User user = userService.findById(userId);
        assertNotNull(user);  // Flaky: user might not exist
    }
}

// ✅ STABLE: Controlled randomness
class StableRandomTest {
    
    @Test
    void shouldValidateUserGenerationWithControlledRandomness() {
        // Fixed seed, predictable results
        Random random = new Random(12345L);
        int userId = random.nextInt(100) + 1;  // Range control
        
        // Ensure user exists
        User user = userService.findById(userId);
        if (user == null) {
            user = userService.createUser("Test User " + userId, "test" + userId + "@example.com");
        }
        assertNotNull(user);
    }
}

// ❌ FLAKY: External service dependency
class FlakyExternalServiceTest {
    
    @Test
    void shouldCallExternalAPI() {
        // Problémás: külső szolgáltatás elérhetetlensége
        String result = externalApiService.getData("http://external-api.com/data");
        assertEquals("expected-data", result);  // Flaky: network issues
    }
}

// ✅ STABLE: Mock external dependencies
class StableExternalServiceTest {
    
    @MockBean
    private ExternalApiService externalApiService;
    
    @Test
    void shouldCallExternalAPIWithMock() {
        // Mock external service
        when(externalApiService.getData(anyString())).thenReturn("expected-data");
        
        String result = externalApiService.getData("http://external-api.com/data");
        assertEquals("expected-data", result);  // Stable: controlled response
    }
}

// Flaky test detection and retry mechanism
@ExtendWith(RetryTestExtension.class)
class FlakyTestWithRetry {
    
    @Test
    @RetryOnFailure(maxAttempts = 3)
    void potentiallyFlakyTest() {
        // Teszt ami időnként fail-el
        // Automatically retry up to 3 times
        assertTrue(randomService.generateBoolean());
    }
}

// Custom retry extension
public class RetryTestExtension implements TestExecutionExceptionHandler {
    
    @Override
    public void handleTestExecutionException(ExtensionContext context, Throwable throwable) 
            throws Throwable {
        RetryOnFailure retry = context.getRequiredTestMethod().getAnnotation(RetryOnFailure.class);
        
        if (retry != null) {
            int attempts = getAttempts(context);
            if (attempts < retry.maxAttempts()) {
                setAttempts(context, attempts + 1);
                System.out.println("Retrying test attempt " + (attempts + 1));
                return; // Retry the test
            }
        }
        
        throw throwable; // Give up
    }
    
    private int getAttempts(ExtensionContext context) {
        return context.getStore(NAMESPACE).getOrDefault("attempts", Integer.class, 0);
    }
    
    private void setAttempts(ExtensionContext context, int attempts) {
        context.getStore(NAMESPACE).put("attempts", attempts);
    }
    
    private static final ExtensionContext.Namespace NAMESPACE = 
        ExtensionContext.Namespace.create(RetryTestExtension.class);
}

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RetryOnFailure {
    int maxAttempts() default 3;
}

// Flaky test patterns to avoid
class FlakyTestPatternsToAvoid {
    
    // ❌ Date/time dependent tests
    @Test
    void badDateTest() {
        User user = userService.createUser("John", "john@example.com");
        assertEquals(LocalDate.now(), user.getCreatedDate().toLocalDate());  // Flaky!
    }
    
    // ✅ Better approach
    @Test
    void goodDateTest() {
        LocalDateTime before = LocalDateTime.now();
        User user = userService.createUser("John", "john@example.com");
        LocalDateTime after = LocalDateTime.now();
        
        assertTrue(user.getCreatedDate().isAfter(before.minusSeconds(1)));
        assertTrue(user.getCreatedDate().isBefore(after.plusSeconds(1)));
    }
    
    // ❌ Order-dependent tests
    @Test
    @Order(1)
    void firstTest() {
        globalVariable = "value";  // Bad: state sharing
    }
    
    @Test
    @Order(2)  
    void secondTest() {
        assertEquals("value", globalVariable);  // Flaky: depends on first test
    }
    
    // ✅ Independent tests
    @Test
    void independentTest() {
        String localValue = setupRequiredState();
        assertEquals("expected", localValue);
    }
}

// Flaky test monitoring
@ExtendWith(FlakyTestMonitorExtension.class)
class MonitoredTest {
    
    @Test
    void potentiallyFlakyTest() {
        // Test implementation
        // Extension automatically tracks success/failure rates
    }
}

public class FlakyTestMonitorExtension implements TestWatcher {
    
    private static final Map<String, TestStats> testStats = new ConcurrentHashMap<>();
    
    @Override
    public void testSuccessful(ExtensionContext context) {
        recordTestResult(context, true);
    }
    
    @Override
    public void testFailed(ExtensionContext context, Throwable cause) {
        recordTestResult(context, false);
    }
    
    private void recordTestResult(ExtensionContext context, boolean success) {
        String testName = context.getDisplayName();
        testStats.computeIfAbsent(testName, k -> new TestStats()).record(success);
        
        TestStats stats = testStats.get(testName);
        if (stats.getFailureRate() > 0.1) {  // 10% failure rate threshold
            System.err.println("FLAKY TEST DETECTED: " + testName + 
                " - Failure rate: " + (stats.getFailureRate() * 100) + "%");
        }
    }
    
    private static class TestStats {
        private int totalRuns = 0;
        private int failures = 0;
        
        void record(boolean success) {
            totalRuns++;
            if (!success) failures++;
        }
        
        double getFailureRate() {
            return totalRuns > 0 ? (double) failures / totalRuns : 0;
        }
    }
}
```
*Figyeld meg: flaky tesztek jellemzői és stabilizálási technikák.*

</div>

<div class="concept-section interview-pitfalls" data-filter="medior">

<details>
<summary>💼 <strong>Interjú buktatók</strong></summary>

<div>

- **"Mit tennél egy flaky teszt-tel?"** → Reprodukálás, root cause analysis, stabilizálás vagy mock-olás
- **"Hogyan detektálnád a flaky teszteket?"** → CI/CD metrics, test retry patterns, failure rate monitoring
- **"Elfogadható-e retry mechanism flaky tesztekhez?"** → Rövid távon igen, de hosszú távon a teszt stabilizálása a cél

</div>

</details>

</div>

## Gyakori hibák és buktatók

<div class="concept-section myths" data-filter="junior medior">

### Fragile tesztek

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

**❌ Hibás példa - Törékeny teszt:**
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

**✅ Helyes megoldás - Robusztus teszt:**
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

</div>

</details>

### Túl sok Mock használata

<details>
<summary>⚠️ <strong>Anti-pattern felismerése</strong></summary>

<div>

**❌ Hibás - Minden mock-olva:**
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

**✅ Helyes - Csak külső függőségek mock-olása:**
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

</div>

</details>

### Happy Path Only syndrome

<details>
<summary>🛤️ <strong>Csak sikeres forgatókönyvek tesztelése</strong></summary>

<div>

**❌ Hibás - Csak valid input:**
```java
@Test
void testUserRegistration() {
    // Csak valid input tesztelése
    User user = userService.register("valid@email.com", "ValidPassword123");
    assertNotNull(user);
}
```

**✅ Helyes - Comprehensive testing:**
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

</div>

</details>

</div>

## Interjúkérdések és válaszok

<div class="concept-section interview-pitfalls" data-filter="junior medior">

<details>
<summary>💼 <strong>Gyakori interjúkérdések - Junior szint</strong></summary>

<div>

**Q: Mi a különbség unit és integration teszt között?**
> Unit teszt izolált komponenst validál mock függőségekkel, integration teszt komponensek együttműködését valós környezetben.

**Q: Hogyan mockolsz egy repository-t Mockito-val?**
> `@Mock` annotáció, `when().thenReturn()` stubbing, `verify()` ellenőrzés a metódus hívásokra.

**Q: Mi a tesztelési piramis és miért fontos?**
> Unit tesztekből sok (gyors, olcsó), integration kevesebb, E2E legkevesebb (lassú, drága) - költség és sebesség miatt.

**Q: Hogyan tesztelnél error handling-et?**
> `assertThrows()` exception típus és message ellenőrzésére, state changes validálására.

</div>

</details>

<details>
<summary>💼 <strong>Haladó interjúkérdések - Medior+ szint</strong></summary>

<div>

**Q: Hogyan írnál tesztet egy async metódusra?**
> `CompletableFuture.get()`, `@Async` tesztelése, `CountDownLatch` vagy `TestExecutor` használata.

**Q: Mi a TDD és mik az előnyei?**
> Red-Green-Refactor ciklus, jobb design, 100% coverage, élő dokumentáció.

**Q: Hogyan kezeled a database state-et integration tesztekben?**
> `@Transactional` + `@Rollback`, `@Sql` scriptekkel, TestContainers használata.

**Q: Mi a Test Double típusok?**
> Dummy, Fake, Stub, Spy, Mock - különböző célokra különböző típusok.

**Q: Mi a flaky test és hogyan kerülöd el?**
> Nem determinisztikus tesztek, timing issues, external dependencies minimalizálása.

**Q: Hogyan biztosítod a test isolation-t?**
> `@DirtiesContext`, `@Transactional` rollback, clean test data, container restart.

</div>

</details>

</div>

## Gyakorlati feladat

<div class="concept-section micro-learning" data-filter="junior medior">

<details>
<summary>🎯 <strong>Comprehensive Testing Challenge</strong></summary>

<div>

### BookLibraryService teljes teszt suite

**Feladat célja:** Írj átfogó teszt suite-ot egy `BookLibraryService` osztályhoz, amely demonstrálja az összes modern tesztelési technikát.

**Követelmények:**
```java
// 1. Unit tesztek - mockolt függőségekkel
@ExtendWith(MockitoExtension.class)
class BookLibraryServiceUnitTest {
    
    @Mock BookRepository bookRepository;
    @Mock EmailService emailService;
    @InjectMocks BookLibraryService service;
    
    // TODO: Üzleti logika tesztelése
}

// 2. Integration tesztek - valós adatbázissal
@DataJpaTest
class BookRepositoryIntegrationTest {
    // TODO: @TestContainers PostgreSQL
}

// 3. Web layer tesztek
@WebMvcTest(BookController.class)
class BookControllerTest {
    // TODO: MockMvc API endpoint testing
}

// 4. E2E tesztek
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class BookLibraryE2ETest {
    // TODO: Teljes workflow TestContainers-kel
}
```

**Tesztelendő funkciók:**
- ✅ Könyv kölcsönzés (borrowBook)
- ✅ Visszavétel (returnBook) 
- ✅ Késedelmi díj számítás (calculateFee)
- ✅ Email értesítések (sendReminder)
- ✅ Riport generálás (generateReport)

**Technikai kritériumok:**
- 🎯 TDD megközelítés (red-green-refactor)
- 📊 90%+ code coverage
- 🔄 AAA/Given-When-Then pattern
- 📝 Beszédes assertion üzenetek
- 🏗️ Test data builder pattern használata

</div>

</details>

</div>

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
