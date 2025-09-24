# Tesztelés

## Rövid összefoglaló

A szoftvertesztelés a kód minőségének és helyességének biztosítására szolgáló folyamat. Unit testek az egyes komponenseket, integration testek az együttműködést, end-to-end testek pedig a teljes alkalmazás működését ellenőrzik. A Test-Driven Development (TDD) és Behavior-Driven Development (BDD) módszertan fejlesztési minőséget javítja. JUnit 5, Mockito és AssertJ a Java ökoszisztéma fő tesztelési eszközei. Fő buktatók: túl sok mock használat, brittle testek és alacsony test coverage valós minőség helyett.

## Fogalmak

- **Unit Test** – Egyedi komponens (osztály/metódus) elszigetelt tesztelése mock függőségekkel.
- **Integration Test** – Több komponens együttes működésének tesztelése valós környezetben.
- **End-to-End Test** – Teljes alkalmazás tesztelése felhasználói perspektívából.
- **Test-Driven Development (TDD)** – Red-Green-Refactor ciklus: teszt → implementáció → refactor.
- **Mock Object** – Valós függőség helyettesítő objektum, amely ellenőrizhető interakciókat biztosít.
- **Stub** – Előre meghatározott válaszokkal rendelkező helyettesítő objektum.
- **Spy** – Valós objektum burkolója, amely lehetővé teszi a viselkedés felülírását és megfigyelését.
- **Test Double** – Gyűjtőnév mock, stub, spy és dummy objektumokra.
- **Assertion** – Elvárás ellenőrzés, amely true/false eredményt ad.
- **Test Fixture** – Teszt végrehajtásához szükséges előfeltételek és adatok.
- **Test Coverage** – Kód lefedettség mérőszáma, százalékban kifejezve.
- **Flaky Test** – Nem determinisztikus teszt, amely véletlenszerűen fail-elhet.

## Interjúkérdések

- **Mi a különbség unit, integration és E2E testek között?** — *Unit - elszigetelt komponens, Integration - komponensek együttműködése, E2E - teljes alkalmazás felhasználói szemszögből.*

- **Mikor használsz mock-ot és mikor stub-ot?** — *Mock - interakciók ellenőrzése (verify), Stub - előre definiált válaszok visszaadása.*

- **Mi a Test-Driven Development (TDD)?** — *Red (failing test) → Green (minimal implementation) → Refactor (clean code) ciklus.*

- **Hogyan írnál jó unit tesztet?** — *FIRST elvek: Fast, Independent, Repeatable, Self-validating, Timely. AAA pattern: Arrange, Act, Assert.*

- **Mik a test pyramid rétegei?** — *Alul sok unit teszt, közép integrációs teszt, tetején kevés E2E teszt.*

- **Mit jelent a test coverage és miért nem elég?** — *Kód lefedettség százaléka, de nem garantálja a helyes működést vagy hibakezelést.*

- **Hogyan kezeled a flaky testeket?** — *Root cause analysis, determinisztikus adatok, időfüggőségek kiküszöbölése, retry mechanizmus.*

- **Mi az @MockBean és @SpyBean különbsége Spring-ben?** — *@MockBean teljes mock, @SpyBean valós objektum wrappelése selective stubbing-gal.*

- **Hogyan teszteled az exception handling-et?** — *assertThrows() használata JUnit 5-ben, specifikus exception típus és üzenet ellenőrzése.*

- **Mit jelent a "given-when-then" pattern?** — *BDD stílusú teszt struktúra: Given (előfeltételek), When (akció), Then (elvárások).*

- **Hogyan tesztelsz aszinkron kódot?** — *CompletableFuture.get() timeout-tal, Awaitility library, vagy TestScheduler mock idővel.*

- **Mik a test doubles típusai?** — *Dummy, Fake, Stub, Mock, Spy - mindegyiknek más célja és használati területe.*

## Példák

### Példa 1 – JUnit 5 Unit Test AAA pattern-nel

```java
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
        // Arrange
        CreateUserRequest request = new CreateUserRequest("john@example.com", "John Doe");
        User savedUser = new User(1L, "john@example.com", "John Doe");

        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        // Act
        User result = userService.createUser(request);

        // Assert
        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getEmail()).isEqualTo("john@example.com");
        assertThat(result.getName()).isEqualTo("John Doe");

        verify(userRepository).save(argThat(user ->
            user.getEmail().equals("john@example.com") &&
            user.getName().equals("John Doe")
        ));
        verify(emailService).sendWelcomeEmail("john@example.com");
    }

    @Test
    @DisplayName("Should throw exception when email already exists")
    void shouldThrowExceptionWhenEmailExists() {
        // Arrange
        CreateUserRequest request = new CreateUserRequest("existing@example.com", "Jane Doe");
        when(userRepository.save(any(User.class)))
            .thenThrow(new UserAlreadyExistsException("Email already exists"));

        // Act & Assert
        UserAlreadyExistsException exception = assertThrows(
            UserAlreadyExistsException.class,
            () -> userService.createUser(request)
        );

        assertThat(exception.getMessage()).contains("Email already exists");
        verify(emailService, never()).sendWelcomeEmail(anyString());
    }
}
```

### Példa 2 – Gyakori hiba: Túl sok mock, brittle test

```java
// HIBÁS - Túl sok mock, implementation details tesztelése
@Test
void badTest() {
    // Arrange - túl sok mock setup
    when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());
    when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
    when(userValidator.validate(any())).thenReturn(true);
    when(auditLogger.log(anyString())).thenReturn(true);
    when(cacheManager.evict(anyString())).thenReturn(true);

    User savedUser = new User(1L, "test@example.com", "Test User");
    when(userRepository.save(any())).thenReturn(savedUser);

    // Act
    userService.createUser(request);

    // Assert - túl sok implementation detail
    verify(userRepository).findByEmail("test@example.com");
    verify(passwordEncoder).encode("password123");
    verify(userValidator).validate(any());
    verify(auditLogger).log(contains("User created"));
    verify(cacheManager).evict("users");
    verify(userRepository).save(any());
}

// JAVÍTOTT - Behavior fokuszú, kevesebb mock
@Test
void goodTest() {
    // Arrange - csak lényeges mockek
    when(userRepository.save(any(User.class)))
        .thenReturn(new User(1L, "test@example.com", "Test User"));

    // Act
    User result = userService.createUser(
        new CreateUserRequest("test@example.com", "Test User", "password123")
    );

    // Assert - outcome focus
    assertThat(result.getId()).isNotNull();
    assertThat(result.getEmail()).isEqualTo("test@example.com");
    assertThat(result.getName()).isEqualTo("Test User");

    // Verify only critical interactions
    verify(userRepository).save(argThat(user ->
        user.getEmail().equals("test@example.com")));
}
```

## Gyakorlati feladat (mini)

1. Hozz létre `Calculator` osztályt alapvető műveletekkel (+, -, *, /)
2. Írj JUnit 5 testeket minden metódusra, pozitív és negatív esetekre
3. Implementálj `CalculatorService`-t `AuditLogger` dependency-vel
4. Mockold a `AuditLogger`-t és ellenőrizd az interakciókat
5. Használj `@ParameterizedTest`-et több bemeneti értékkel

*Kapcsolódó gyakorlati feladat: [Unit Testing JUnit 5](/exercises/java/03-testing)*

## Kapcsolódó témák

- [Java Alapok](/theory/java) - Exception handling és OOP alapok
- [Spring Framework](/theory/spring) - @MockBean és Spring Test context
- [Java Gyakorlatok](/exercises/java) - Praktikus testing példák

## További olvasmányok

- [JUnit 5 User Guide](https://junit.org/junit5/docs/current/user-guide/) - Hivatalos dokumentáció
- [Mockito Documentation](https://javadoc.io/doc/org.mockito/mockito-core/latest/org/mockito/Mockito.html) - Mock framework
- [AssertJ Fluent Assertions](https://assertj.github.io/doc/) - Readable assertions
- [Test-Driven Development by Kent Beck](https://www.oreilly.com/library/view/test-driven-development/0321146530/) - TDD alapjai
- [Growing Object-Oriented Software by Freeman & Pryce](http://www.growing-object-oriented-software.com/) - Advanced testing patterns
