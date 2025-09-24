# Szoftver Tesztelés

## Bevezetés a tesztelésbe

A szoftver tesztelés egy kritikus folyamat, amely biztosítja, hogy az alkalmazásunk a várt módon működjön és megfeleljen a követelményeknek.

## Tesztelési piramis

```
    E2E Tests
   /         \
  /           \
Integration Tests
/             \
Unit Tests
```

### 1. Unit tesztek
- Egy-egy komponens (osztály, metódus) izolált tesztelése
- Gyorsak, könnyen karbantarthatók
- A tesztelési piramis alapja

### 2. Integrációs tesztek
- Több komponens együttműködésének tesztelése
- Adatbázis, külső szolgáltatások bevonása

### 3. E2E (End-to-End) tesztek
- Teljes felhasználói folyamatok tesztelése
- Lassabbak, de a valós használathoz közel állnak

## JUnit alapok

### Egyszerű unit teszt

```java
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.AfterEach;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {
    
    private Calculator calculator;
    
    @BeforeEach
    void setUp() {
        calculator = new Calculator();
    }
    
    @Test
    void testAddition() {
        // Given - Arrange
        int a = 5;
        int b = 3;
        
        // When - Act
        int result = calculator.add(a, b);
        
        // Then - Assert
        assertEquals(8, result);
    }
    
    @Test
    void testDivisionByZero() {
        // Assert that exception is thrown
        assertThrows(ArithmeticException.class, () -> {
            calculator.divide(10, 0);
        });
    }
    
    @AfterEach
    void tearDown() {
        calculator = null;
    }
}
```

### JUnit 5 annotációk

```java
@Test // Teszt metódus jelölése
@BeforeEach // Minden teszt előtt lefut
@AfterEach // Minden teszt után lefut
@BeforeAll // Osztály szinten egyszer, az összes teszt előtt
@AfterAll // Osztály szinten egyszer, az összes teszt után
@DisplayName("Emberi nyelven leírt teszt név")
@Disabled("Ideiglenesen kikapcsolt teszt")
@RepeatedTest(5) // Teszt 5-ször lefut
@ParameterizedTest // Parametrikus teszt
```

### Assertion methods

```java
// Alapvető assertek
assertEquals(expected, actual);
assertNotEquals(unexpected, actual);
assertTrue(condition);
assertFalse(condition);
assertNull(object);
assertNotNull(object);

// Tömb/kollekció assertek
assertArrayEquals(expectedArray, actualArray);
assertIterableEquals(expected, actual);

// Exception assertek
assertThrows(ExceptionType.class, () -> {
    // kód ami kivételt dob
});

// Összetett assertek
assertAll("person",
    () -> assertEquals("John", person.getFirstName()),
    () -> assertEquals("Doe", person.getLastName())
);
```

## Mockito - Mock objektumok

### Mock objektum létrehozása

```java
import org.mockito.Mock;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import static org.mockito.Mockito.*;

class UserServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @InjectMocks
    private UserService userService;
    
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    
    @Test
    void testFindUserById() {
        // Given
        Long userId = 1L;
        User expectedUser = new User("John", "john@example.com");
        when(userRepository.findById(userId)).thenReturn(expectedUser);
        
        // When
        User actualUser = userService.findById(userId);
        
        // Then
        assertEquals(expectedUser, actualUser);
        verify(userRepository).findById(userId);
    }
}
```

### Mockito stubbing

```java
// Visszatérési érték megadása
when(mock.someMethod()).thenReturn(value);
when(mock.someMethod("param")).thenReturn(value);

// Exception dobása
when(mock.someMethod()).thenThrow(new RuntimeException());

// Void metódusokhoz
doNothing().when(mock).voidMethod();
doThrow(new RuntimeException()).when(mock).voidMethod();

// Argumentum matcherek
when(mock.process(any(String.class))).thenReturn(result);
when(mock.process(anyString())).thenReturn(result);
when(mock.process(eq("specific"))).thenReturn(result);
```

### Verification

```java
// Metódus hívás ellenőrzése
verify(mock).someMethod();
verify(mock, times(2)).someMethod();
verify(mock, never()).someMethod();
verify(mock, atLeastOnce()).someMethod();

// Argumentumok ellenőrzése
verify(mock).process(eq("expected"));
verify(mock).process(argThat(s -> s.length() > 5));
```

## TDD - Test Driven Development

### Red-Green-Refactor ciklus

1. **Red**: Írj egy failing tesztet
2. **Green**: Írd meg a minimális kódot, ami átmegy a teszten
3. **Refactor**: Javítsd a kód minőségét

### TDD példa

```java
// 1. Red - failing teszt
@Test
void testFizzBuzz_ForNumber3_ReturnsFizz() {
    FizzBuzz fizzBuzz = new FizzBuzz();
    String result = fizzBuzz.convert(3);
    assertEquals("Fizz", result);
}

// 2. Green - minimális implementáció
public class FizzBuzz {
    public String convert(int number) {
        if (number % 3 == 0) return "Fizz";
        return String.valueOf(number);
    }
}

// 3. Refactor - több teszt hozzáadása és refaktor
```

## BDD - Behavior Driven Development

### Given-When-Then struktura

```java
@Test
void shouldCalculateDiscountForPremiumCustomer() {
    // Given - Arrange
    Customer customer = new Customer("Premium");
    Product product = new Product("Laptop", 1000);
    DiscountCalculator calculator = new DiscountCalculator();
    
    // When - Act
    double discount = calculator.calculateDiscount(customer, product);
    
    // Then - Assert
    assertEquals(100, discount); // 10% discount
}
```

## Integrációs tesztelés Spring Boot-tal

### @SpringBootTest

```java
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserServiceIntegrationTest {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Test
    void testCreateAndFindUser() {
        // Given
        User user = new User("John", "john@example.com");
        
        // When
        User createdUser = userService.save(user);
        User foundUser = userService.findById(createdUser.getId());
        
        // Then
        assertNotNull(foundUser);
        assertEquals("John", foundUser.getName());
    }
}
```

### @WebMvcTest

```java
@WebMvcTest(UserController.class)
class UserControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private UserService userService;
    
    @Test
    void testGetUser() throws Exception {
        // Given
        User user = new User("John", "john@example.com");
        when(userService.findById(1L)).thenReturn(user);
        
        // When & Then
        mockMvc.perform(get("/api/users/1"))
                .andExpected(status().isOk())
                .andExpected(jsonPath("$.name").value("John"))
                .andExpected(jsonPath("$.email").value("john@example.com"));
    }
}
```

## Test Containers

```java
@SpringBootTest
@Testcontainers
class DatabaseIntegrationTest {
    
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:13")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("test");
    
    @DynamicPropertySource
    static void setProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }
    
    @Test
    void testDatabaseOperations() {
        // Real database tests
    }
}
```

## Best Practices

### 1. Teszt struktúra
- **AAA Pattern**: Arrange-Act-Assert
- **Given-When-Then**: BDD stílus
- Egy teszt = egy assertion

### 2. Teszt nevek
```java
// Rossz
@Test void test1() { }

// Jó
@Test void shouldReturnErrorWhenUserNotFound() { }
@Test void shouldCalculateDiscountForPremiumCustomers() { }
```

### 3. Test Data Builders
```java
public class UserBuilder {
    private String name = "Default Name";
    private String email = "default@example.com";
    
    public UserBuilder withName(String name) {
        this.name = name;
        return this;
    }
    
    public UserBuilder withEmail(String email) {
        this.email = email;
        return this;
    }
    
    public User build() {
        return new User(name, email);
    }
}

// Használat
User user = new UserBuilder()
    .withName("John")
    .withEmail("john@example.com")
    .build();
```

### 4. Tesztek szervezése
```java
@Nested
@DisplayName("User validation tests")
class UserValidationTests {
    
    @Nested
    @DisplayName("When user is valid")
    class WhenUserIsValid {
        @Test void shouldAcceptUser() { }
    }
    
    @Nested
    @DisplayName("When user is invalid")
    class WhenUserIsInvalid {
        @Test void shouldRejectUser() { }
    }
}
```

## Tesztelési antipattern

### 1. Test Ice Cream Cone
- Túl sok E2E teszt, kevés unit teszt
- Megoldás: Kövesse a tesztelési piramist

### 2. Happy Path Only
- Csak a sikeres eseteket tesztelik
- Megoldás: Teszteljék a hibás eseteket is

### 3. Mystery Guest
- A teszt külső adatoktól függ
- Megoldás: Minden szükséges adatot a tesztben hozz létre

## Folyamatos integráció és tesztelés

### Maven/Gradle integráció
```xml
<!-- Maven -->
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>0.8.7</version>
</plugin>
```

### CI/CD pipeline
```yaml
# GitHub Actions
- name: Run tests
  run: ./mvnw test
- name: Generate test report
  run: ./mvnw jacoco:report
```

## Következő lépések

1. Gyakorold a JUnit és Mockito használatát
2. Próbáld ki a TDD megközelítést
3. Írj integrációs teszteket
4. Használj Test Containers-t
5. Állíts be code coverage mérést