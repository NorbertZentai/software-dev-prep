---
title: "Unit Testing – TDD alapok"
difficulty: intermediate
goals: 
  - "JUnit 5"
  - "Mockito"
  - "TDD cycle"
  - "Test coverage"
estimatedMinutes: 40
starter:
    stackblitz: ""
    codesandbox: ""
    dbfiddle: ""
---

# Unit Testing – TDD Alapok

## Feladat leírása

Implementálj egy `BankAccount` osztályt Test-Driven Development (TDD) módszertannal. A feladat célja a TDD ciklus (Red-Green-Refactor) és a modern testing technikák elsajátítása.

## BankAccount követelmények

1. **Alap funkciók**
   - Account létrehozása tulajdonos névvel és kezdő egyenleggel
   - Pénz betétele (deposit)
   - Pénz kivétele (withdraw)
   - Egyenleg lekérdezése
   - Transaction history vezetése

2. **Üzleti szabályok**
   - Nem lehet negatív kezdő egyenleg
   - Withdraw nem lehet több, mint az aktuális egyenleg
   - Transaction history max 10 elem (FIFO)
   - Minden művelet után ki kell adni egy TransactionEvent-et

## TDD Lépések

### 1. RED - Első failing test

```java
@Test
@DisplayName("Should create account with initial balance")
void shouldCreateAccountWithInitialBalance() {
    // Given
    String owner = "John Doe";
    BigDecimal initialBalance = BigDecimal.valueOf(100.00);

    // When
    BankAccount account = new BankAccount(owner, initialBalance);

    // Then
    assertThat(account.getOwner()).isEqualTo(owner);
    assertThat(account.getBalance()).isEqualByComparingTo(initialBalance);
}
```

### 2. GREEN - Minimális implementáció

```java
public class BankAccount {
    private final String owner;
    private BigDecimal balance;

    public BankAccount(String owner, BigDecimal initialBalance) {
        this.owner = owner;
        this.balance = initialBalance;
    }

    public String getOwner() {
        return owner;
    }

    public BigDecimal getBalance() {
        return balance;
    }
}
```

### 3. További tesztek hozzáadása

```java
@Test
@DisplayName("Should throw exception when negative initial balance")
void shouldThrowExceptionWhenNegativeInitialBalance() {
    // Given
    BigDecimal negativeBalance = BigDecimal.valueOf(-10.00);

    // When & Then
    assertThatThrownBy(() -> new BankAccount("John", negativeBalance))
        .isInstanceOf(IllegalArgumentException.class)
        .hasMessage("Initial balance cannot be negative");
}

@Test
@DisplayName("Should deposit money successfully")
void shouldDepositMoneySuccessfully() {
    // Given
    BankAccount account = new BankAccount("John", BigDecimal.valueOf(100));
    BigDecimal depositAmount = BigDecimal.valueOf(50);

    // When
    account.deposit(depositAmount);

    // Then
    assertThat(account.getBalance())
        .isEqualByComparingTo(BigDecimal.valueOf(150));
}
```

### 4. Mock objektumok használata

```java
@ExtendWith(MockitoExtension.class)
class BankAccountTest {

    @Mock
    private EventPublisher eventPublisher;

    @InjectMocks
    private BankAccount account;

    @Test
    @DisplayName("Should publish event when deposit")
    void shouldPublishEventWhenDeposit() {
        // Given
        BankAccount account = new BankAccount("John", BigDecimal.ZERO, eventPublisher);
        BigDecimal amount = BigDecimal.valueOf(100);

        // When
        account.deposit(amount);

        // Then
        verify(eventPublisher).publish(
            argThat(event -> event instanceof DepositEvent &&
                    ((DepositEvent) event).getAmount().equals(amount))
        );
    }
}
```

## Feladat részletek

### 1. Test osztály felépítése
```java
@DisplayName("BankAccount Unit Tests")
class BankAccountTest {

    @BeforeEach
    void setUp() {
        // Common test setup
    }

    @Nested
    @DisplayName("Account Creation Tests")
    class AccountCreationTests {
        // Grouped tests for account creation
    }

    @Nested
    @DisplayName("Transaction Tests")
    class TransactionTests {
        // Grouped tests for deposits/withdrawals
    }
}
```

### 2. Parameterized tesztek
```java
@ParameterizedTest
@ValueSource(doubles = {-1.0, -100.0, -0.01})
@DisplayName("Should reject negative amounts")
void shouldRejectNegativeAmounts(double negativeAmount) {
    BankAccount account = new BankAccount("John", BigDecimal.valueOf(100));

    assertThatThrownBy(() -> account.withdraw(BigDecimal.valueOf(negativeAmount)))
        .isInstanceOf(IllegalArgumentException.class);
}
```

### 3. Custom assertions
```java
public static BankAccountAssert assertThat(BankAccount actual) {
    return new BankAccountAssert(actual);
}

public class BankAccountAssert extends AbstractAssert<BankAccountAssert, BankAccount> {

    public BankAccountAssert hasBalance(BigDecimal expectedBalance) {
        isNotNull();
        if (!actual.getBalance().equals(expectedBalance)) {
            failWithMessage("Expected balance <%s> but was <%s>",
                expectedBalance, actual.getBalance());
        }
        return this;
    }
}
```

## Implementálandó osztályok

### BankAccount.java
```java
public class BankAccount {
    // A teszteknek megfelelő implementáció
    // Transaction history
    // Event publishing
    // Validation logic
}
```

### TransactionEvent.java
```java
public abstract class TransactionEvent {
    private final String accountOwner;
    private final BigDecimal amount;
    private final LocalDateTime timestamp;

    // constructor, getters...
}

public class DepositEvent extends TransactionEvent { }
public class WithdrawalEvent extends TransactionEvent { }
```

## Ellenőrző lista

- [ ] TDD ciklust követted (Red-Green-Refactor)
- [ ] Minden követelmény le van fedve tesztekkel
- [ ] Mock objektumokat használtál külső függőségekhez
- [ ] Parameterized teszteket alkalmaztál ahol értelmes
- [ ] Test coverage minimum 90%
- [ ] Tesztek jól olvasható névvel rendelkeznek
- [ ] Arrange-Act-Assert struktúrát követted
- [ ] Edge case-eket is teszteled
- [ ] Custom assertion-öket használtál ahol hasznos

## Tesztelési best practices

1. **FIRST principles**: Fast, Independent, Repeatable, Self-validating, Timely
2. **AAA pattern**: Arrange-Act-Assert minden tesztnél
3. **One assertion per test**: Egy teszt egy dolgot ellenőriz
4. **Descriptive names**: A teszt név leírja mit és miért teszt
5. **Test the behavior, not implementation**: API szinten tesztelj

## Következő lépések

- Integration tesztek @SpringBootTest-tel
- Contract testing Pact-tel
- Performance testing JMH-val
- Mutation testing PIT-tel
