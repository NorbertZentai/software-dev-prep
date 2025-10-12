# ☕ Java OOP Basics - Exercises

## Exercise 1: Bank Account Class

### Task Description
Create a `BankAccount` class according to the following specification:

### Requirements:
- **Attributes:**
  - `accountNumber` (account number) - String
  - `ownerName` (owner name) - String
  - `balance` (balance) - double
  - `accountType` (account type) - enum (CHECKING, SAVINGS)

- **Constructor:**
  - With parameters: account number, owner name, initial balance, account type
  - Initial balance cannot be negative

- **Methods:**
  - `deposit(double amount)` - deposit
  - `withdraw(double amount)` - withdrawal (cannot go negative)
  - `getBalance()` - balance inquiry
  - `toString()` - textual display of account information

### Solution Template:
```java
public enum AccountType {
    CHECKING, SAVINGS
}

public class BankAccount {
    private String accountNumber;
    private String ownerName;
    private double balance;
    private AccountType accountType;

    // Constructor
    public BankAccount(String accountNumber, String ownerName,
                      double initialBalance, AccountType accountType) {
        if (initialBalance < 0) {
            throw new IllegalArgumentException("Initial balance cannot be negative!");
        }
        // TODO: implement the constructor
    }

    // TODO: implement the methods

    public void deposit(double amount) {
        // TODO: check that amount is positive
        // TODO: add to balance
    }

    public boolean withdraw(double amount) {
        // TODO: check that amount is positive
        // TODO: check if there are sufficient funds
        // TODO: deduct from balance
        // TODO: return: whether the operation was successful
    }

    // TODO: additional methods
}
```

### Test Cases:
```java
public class BankAccountTest {
    public static void main(String[] args) {
        // Test 1: Account creation
        BankAccount account = new BankAccount("12345", "John Doe", 1000.0, AccountType.CHECKING);

        // Test 2: Deposit
        account.deposit(500.0);
        System.out.println("After deposit: " + account.getBalance()); // 1500.0

        // Test 3: Successful withdrawal
        boolean success = account.withdraw(200.0);
        System.out.println("Withdrawal successful: " + success); // true
        System.out.println("Balance: " + account.getBalance()); // 1300.0

        // Test 4: Failed withdrawal (insufficient funds)
        success = account.withdraw(2000.0);
        System.out.println("Large withdrawal successful: " + success); // false
        System.out.println("Balance: " + account.getBalance()); // 1300.0 (unchanged)

        // Test 5: toString testing
        System.out.println(account.toString());
    }
}
```

---

## Exercise 2: Library System

### Task Description
Create a simple library management system!

### Classes:
1. **Book**
   - `isbn` - String
   - `title` - String
   - `author` - String
   - `isAvailable` - boolean

2. **Library**
   - `books` - List<Book>
   - `addBook(Book book)` - add book
   - `findBookByIsbn(String isbn)` - find book by ISBN
   - `borrowBook(String isbn)` - borrow book
   - `returnBook(String isbn)` - return book
   - `getAvailableBooks()` - list of available books

### Solution Template:
```java
import java.util.*;

public class Book {
    private String isbn;
    private String title;
    private String author;
    private boolean isAvailable;

    // TODO: constructor and methods
}

public class Library {
    private List<Book> books;

    public Library() {
        this.books = new ArrayList<>();
    }

    // TODO: implement the methods
}
```

### Test Cases:
```java
public class LibraryTest {
    public static void main(String[] args) {
        Library library = new Library();

        // Adding books
        library.addBook(new Book("978-0134685991", "Effective Java", "Joshua Bloch"));
        library.addBook(new Book("978-0596009205", "Head First Design Patterns", "Freeman"));

        // Finding and borrowing a book
        Book book = library.findBookByIsbn("978-0134685991");
        if (book != null) {
            System.out.println("Found book: " + book.getTitle());

            boolean borrowed = library.borrowBook("978-0134685991");
            System.out.println("Borrowing successful: " + borrowed);
        }

        // Listing available books
        List<Book> availableBooks = library.getAvailableBooks();
        System.out.println("Number of available books: " + availableBooks.size());
    }
}
```

---

## Exercise 3: Employee Hierarchy

### Task Description
Create an employee hierarchy using inheritance!

### Class Hierarchy:
- **Employee** (abstract)
  - `name`, `id`, `baseSalary`
  - `abstract double calculateSalary()`
  - `getEmployeeInfo()` method

- **FullTimeEmployee** extends Employee
  - `bonus` attribute
  - Salary calculation: base salary + bonus

- **PartTimeEmployee** extends Employee
  - `hoursWorked`, `hourlyRate` attributes
  - Salary calculation: hours * hourly rate

- **Manager** extends FullTimeEmployee
  - `teamSize` attribute
  - Extra bonus: team size * 1000

### Solution Template:
```java
abstract class Employee {
    protected String name;
    protected int id;
    protected double baseSalary;

    public Employee(String name, int id, double baseSalary) {
        // TODO: implement
    }

    public abstract double calculateSalary();

    public String getEmployeeInfo() {
        return String.format("ID: %d, Name: %s, Salary: %.2f",
                           id, name, calculateSalary());
    }

    // TODO: getters and setters
}

class FullTimeEmployee extends Employee {
    private double bonus;

    // TODO: constructor and calculateSalary implementation
}

class PartTimeEmployee extends Employee {
    private int hoursWorked;
    private double hourlyRate;

    // TODO: constructor and calculateSalary implementation
}

class Manager extends FullTimeEmployee {
    private int teamSize;

    // TODO: constructor and calculateSalary override
}
```

### Test Cases:
```java
public class EmployeeTest {
    public static void main(String[] args) {
        List<Employee> employees = new ArrayList<>();

        employees.add(new FullTimeEmployee("Anna Smith", 1, 500000, 50000));
        employees.add(new PartTimeEmployee("Peter Nagy", 2, 0, 120, 3000));
        employees.add(new Manager("Bela Szabo", 3, 800000, 100000, 5));

        // Demonstrating polymorphism
        for (Employee emp : employees) {
            System.out.println(emp.getEmployeeInfo());
        }

        // Calculating total salary
        double totalSalary = employees.stream()
                                    .mapToDouble(Employee::calculateSalary)
                                    .sum();
        System.out.println("Total salary: " + totalSalary);
    }
}
```

---

## Exercise 4: Generic Stack Implementation

### Task Description
Implement a generic Stack data structure!

### Requirements:
- Use generic type (`Stack<T>`)
- LIFO (Last In, First Out) behavior
- Methods: `push()`, `pop()`, `peek()`, `isEmpty()`, `size()`
- Custom exception: `EmptyStackException`

### Solution Template:
```java
import java.util.ArrayList;
import java.util.List;

class EmptyStackException extends RuntimeException {
    public EmptyStackException(String message) {
        super(message);
    }
}

public class Stack<T> {
    private List<T> elements;

    public Stack() {
        this.elements = new ArrayList<>();
    }

    public void push(T element) {
        // TODO: add element to top of stack
    }

    public T pop() throws EmptyStackException {
        // TODO: remove and return last element
        // TODO: throw exception if stack is empty
    }

    public T peek() throws EmptyStackException {
        // TODO: return last element without removing
    }

    public boolean isEmpty() {
        // TODO: check if stack is empty
    }

    public int size() {
        // TODO: number of elements
    }
}
```

### Test Cases:
```java
public class StackTest {
    public static void main(String[] args) {
        Stack<String> stringStack = new Stack<>();

        // Testing push
        stringStack.push("first");
        stringStack.push("second");
        stringStack.push("third");

        System.out.println("Size: " + stringStack.size()); // 3

        // Testing peek
        System.out.println("Top: " + stringStack.peek()); // "third"
        System.out.println("Size after peek: " + stringStack.size()); // 3

        // Testing pop
        System.out.println("Pop: " + stringStack.pop()); // "third"
        System.out.println("Pop: " + stringStack.pop()); // "second"
        System.out.println("Size: " + stringStack.size()); // 1

        // Testing integer stack
        Stack<Integer> intStack = new Stack<>();
        intStack.push(10);
        intStack.push(20);

        System.out.println("Int pop: " + intStack.pop()); // 20

        // Testing exception
        try {
            Stack<String> emptyStack = new Stack<>();
            emptyStack.pop(); // EmptyStackException
        } catch (EmptyStackException e) {
            System.out.println("Caught exception: " + e.getMessage());
        }
    }
}
```

---

## Summary and Next Steps

### What You Practiced:
- ✅ OOP principles (encapsulation, inheritance, polymorphism)
- ✅ Constructors and methods
- ✅ Exception handling
- ✅ Generics
- ✅ Collections (List, ArrayList)
- ✅ Abstract classes
- ✅ Enums

### Next Topics:
1. **Design Patterns** - Singleton, Factory, Observer
2. **Stream API** - functional programming in Java
3. **Concurrency** - Threads and synchronization
4. **I/O Operations** - file handling
5. **Unit Testing** - using JUnit

### Bonus Exercises:
- Extend the above solutions with error handling
- Implement equals() and hashCode() methods
- Create unit tests with JUnit
- Try design patterns (e.g., Builder pattern for BankAccount)

---

💡 **Tip:** Try to solve each exercise independently, and only look at the solution afterwards!

## Exercise 3: Polymorphism

Create a `VehicleManager` class that:
- Maintains a list of `Vehicle` objects
- Has method `startAllVehicles()` that calls `start()` on each vehicle
- Demonstrates runtime polymorphism

### Expected Output
```
Toyota Camry (2020) is starting with ignition
Harley Davidson Sportster (2019) is starting with kick
```

## Bonus Challenge

Implement a simple banking system with:
- Abstract class `Account` with abstract method `calculateInterest()`
- Concrete classes: `SavingsAccount`, `CheckingAccount`
- Class `Bank` that manages multiple accounts
- Demonstrate encapsulation by keeping account balances private