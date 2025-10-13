---
title: "Unit Testing – TDD Basics"
difficulty: intermediate
goals: 
  - "JUnit 5"
  - "Mockito"
  - "TDD cycle"
  - "Test coverage"
estimatedMinutes: 40
starter:
  "stackblitz": "",
  "codesandbox": "",
  "dbfiddle": ""
}
---

# Unit Testing – TDD Basics

## Task Description

Implement a `BankAccount` class using Test-Driven Development (TDD) methodology. The goal is to master the TDD cycle (Red-Green-Refactor) and modern testing techniques.

## BankAccount Requirements

1. **Basic Functions**
   - Create account with owner name and initial balance
   - Deposit money (deposit)
   - Withdraw money (withdraw)
   - Query balance
   - Maintain transaction history

2. **Business Rules**
   - Cannot have negative initial balance
   - Withdraw cannot be more than current balance
   - Transaction history max 10 items (FIFO)
   - Must emit a TransactionEvent after every operation

## TDD Steps

### 1. RED - First failing test

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

### 2. GREEN - Minimal implementation

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

### 3. Add more tests

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

### 4. Using mock objects

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

## Task Details

### 1. Test class structure
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

### 2. Parameterized tests
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

## Classes to Implement

### BankAccount.java
```java
public class BankAccount {
    // Implementation according to tests
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

## Checklist

- [ ] Followed TDD cycle (Red-Green-Refactor)
- [ ] All requirements covered with tests
- [ ] Used mock objects for external dependencies
- [ ] Applied parameterized tests where meaningful
- [ ] Test coverage minimum 90%
- [ ] Tests have readable names
- [ ] Followed Arrange-Act-Assert structure
- [ ] Edge cases are also tested
- [ ] Used custom assertions where useful

## Testing Best Practices

1. **FIRST principles**: Fast, Independent, Repeatable, Self-validating, Timely
2. **AAA pattern**: Arrange-Act-Assert for every test
3. **One assertion per test**: One test checks one thing
4. **Descriptive names**: Test name describes what and why it tests
5. **Test the behavior, not implementation**: Test at API level

## Next Steps

- Integration tests with @SpringBootTest
- Contract testing with Pact
- Performance testing with JMH
- Mutation testing with PIT