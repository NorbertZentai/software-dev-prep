# ☕ Java OOP Alapok - Gyakorlatok

## 1. feladat: Bankszámla osztály

### Feladat leírása
Készítsd el egy `BankAccount` (bankszámla) osztályt a következő specifikáció szerint:

### Követelmények:
- **Attribútumok:** 
  - `accountNumber` (számla szám) - String
  - `ownerName` (tulajdonos neve) - String  
  - `balance` (egyenleg) - double
  - `accountType` (számla típus) - enum (CHECKING, SAVINGS)

- **Konstruktor:**
  - Paraméterekkel: számla szám, tulajdonos neve, kezdő egyenleg, számla típus
  - Kezdő egyenleg nem lehet negatív

- **Metódusok:**
  - `deposit(double amount)` - befizetés
  - `withdraw(double amount)` - kifizetes (nem mehet mínuszba)  
  - `getBalance()` - egyenleg lekérdezése
  - `toString()` - számlainformációk szöveges megjelenítése

### Megoldás váz:
```java
public enum AccountType {
    CHECKING, SAVINGS
}

public class BankAccount {
    private String accountNumber;
    private String ownerName;
    private double balance;
    private AccountType accountType;
    
    // Konstruktor
    public BankAccount(String accountNumber, String ownerName, 
                      double initialBalance, AccountType accountType) {
        if (initialBalance < 0) {
            throw new IllegalArgumentException("A kezdő egyenleg nem lehet negatív!");
        }
        // TODO: implementáld a konstruktort
    }
    
    // TODO: implementáld a metódusokat
    
    public void deposit(double amount) {
        // TODO: ellenőrizd hogy az amount pozitív
        // TODO: add hozzá az egyenleghez
    }
    
    public boolean withdraw(double amount) {
        // TODO: ellenőrizd hogy az amount pozitív
        // TODO: ellenőrizd hogy van-e elég fedezet
        // TODO: vonj le az egyenlegből
        // TODO: visszatérés: sikeres volt-e a művelet
    }
    
    // TODO: további metódusok
}
```

### Test esetek:
```java
public class BankAccountTest {
    public static void main(String[] args) {
        // Test 1: Számla létrehozása
        BankAccount account = new BankAccount("12345", "Kiss János", 1000.0, AccountType.CHECKING);
        
        // Test 2: Befizetés
        account.deposit(500.0);
        System.out.println("Befizetés után: " + account.getBalance()); // 1500.0
        
        // Test 3: Sikeres kifizetés  
        boolean success = account.withdraw(200.0);
        System.out.println("Kifizetés sikeres: " + success); // true
        System.out.println("Egyenleg: " + account.getBalance()); // 1300.0
        
        // Test 4: Sikertelen kifizetés (nincs fedezet)
        success = account.withdraw(2000.0);
        System.out.println("Nagy kifizetés sikeres: " + success); // false
        System.out.println("Egyenleg: " + account.getBalance()); // 1300.0 (változatlan)
        
        // Test 5: toString tesztelése
        System.out.println(account.toString());
    }
}
```

---

## 2. feladat: Könyvtár rendszer

### Feladat leírása
Készítsd el egy egyszerű könyvtár kezelő rendszert!

### Osztályok:
1. **Book** (könyv)
   - `isbn` - String
   - `title` - String  
   - `author` - String
   - `isAvailable` - boolean

2. **Library** (könyvtár)
   - `books` - List<Book>
   - `addBook(Book book)` - könyv hozzáadása
   - `findBookByIsbn(String isbn)` - könyv keresése ISBN szerint
   - `borrowBook(String isbn)` - könyv kölcsönzése
   - `returnBook(String isbn)` - könyv visszahozása
   - `getAvailableBooks()` - elérhető könyvek listája

### Megoldás váz:
```java
import java.util.*;

public class Book {
    private String isbn;
    private String title;
    private String author;
    private boolean isAvailable;
    
    // TODO: konstruktor és metódusok
}

public class Library {
    private List<Book> books;
    
    public Library() {
        this.books = new ArrayList<>();
    }
    
    // TODO: implementáld a metódusokat
}
```

### Test esetek:
```java
public class LibraryTest {
    public static void main(String[] args) {
        Library library = new Library();
        
        // Könyvek hozzáadása
        library.addBook(new Book("978-0134685991", "Effective Java", "Joshua Bloch"));
        library.addBook(new Book("978-0596009205", "Head First Design Patterns", "Freeman"));
        
        // Könyv keresése és kölcsönzése
        Book book = library.findBookByIsbn("978-0134685991");
        if (book != null) {
            System.out.println("Megtalált könyv: " + book.getTitle());
            
            boolean borrowed = library.borrowBook("978-0134685991");
            System.out.println("Kölcsönzés sikeres: " + borrowed);
        }
        
        // Elérhető könyvek listázása
        List<Book> availableBooks = library.getAvailableBooks();
        System.out.println("Elérhető könyvek száma: " + availableBooks.size());
    }
}
```

---

## 3. feladat: Alkalmazott hierarchia

### Feladat leírása
Készíts egy alkalmazott hierarchiát öröklődés használatával!

### Osztály hierarchia:
- **Employee** (abstract)
  - `name`, `id`, `baseSalary`
  - `abstract double calculateSalary()`
  - `getEmployeeInfo()` method

- **FullTimeEmployee** extends Employee
  - `bonus` attribútum
  - Fizetés számítás: alapfizetés + bónusz

- **PartTimeEmployee** extends Employee  
  - `hoursWorked`, `hourlyRate` attribútumok
  - Fizetés számítás: órák * óradíj

- **Manager** extends FullTimeEmployee
  - `teamSize` attribútum
  - Extra bónusz: csapat méret * 1000

### Megoldás váz:
```java
abstract class Employee {
    protected String name;
    protected int id;
    protected double baseSalary;
    
    public Employee(String name, int id, double baseSalary) {
        // TODO: implementáld
    }
    
    public abstract double calculateSalary();
    
    public String getEmployeeInfo() {
        return String.format("ID: %d, Név: %s, Fizetés: %.2f", 
                           id, name, calculateSalary());
    }
    
    // TODO: getterek és setterek
}

class FullTimeEmployee extends Employee {
    private double bonus;
    
    // TODO: konstruktor és calculateSalary implementáció
}

class PartTimeEmployee extends Employee {
    private int hoursWorked;
    private double hourlyRate;
    
    // TODO: konstruktor és calculateSalary implementáció  
}

class Manager extends FullTimeEmployee {
    private int teamSize;
    
    // TODO: konstruktor és calculateSalary override
}
```

### Test esetek:
```java
public class EmployeeTest {
    public static void main(String[] args) {
        List<Employee> employees = new ArrayList<>();
        
        employees.add(new FullTimeEmployee("Kiss Anna", 1, 500000, 50000));
        employees.add(new PartTimeEmployee("Nagy Péter", 2, 0, 120, 3000));
        employees.add(new Manager("Szabó Béla", 3, 800000, 100000, 5));
        
        // Polimorfizmus demonstrálása
        for (Employee emp : employees) {
            System.out.println(emp.getEmployeeInfo());
        }
        
        // Összes fizetés kiszámítása
        double totalSalary = employees.stream()
                                    .mapToDouble(Employee::calculateSalary)
                                    .sum();
        System.out.println("Összes fizetés: " + totalSalary);
    }
}
```

---

## 4. feladat: Generikus Stack implementáció

### Feladat leírása
Implementálj egy generikus Stack (verem) adatstruktúrát!

### Követelmények:
- Generikus típus használata (`Stack<T>`)
- LIFO (Last In, First Out) működés
- Metódusok: `push()`, `pop()`, `peek()`, `isEmpty()`, `size()`
- Saját exception: `EmptyStackException`

### Megoldás váz:
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
        // TODO: elem hozzáadása a verem tetejére
    }
    
    public T pop() throws EmptyStackException {
        // TODO: utolsó elem eltávolítása és visszaadása
        // TODO: dobjon exception-t ha üres a verem
    }
    
    public T peek() throws EmptyStackException {
        // TODO: utolsó elem visszaadása eltávolítás nélkül
    }
    
    public boolean isEmpty() {
        // TODO: üres-e a verem
    }
    
    public int size() {
        // TODO: elemek száma
    }
}
```

### Test esetek:
```java
public class StackTest {
    public static void main(String[] args) {
        Stack<String> stringStack = new Stack<>();
        
        // Push tesztelése
        stringStack.push("első");
        stringStack.push("második");
        stringStack.push("harmadik");
        
        System.out.println("Méret: " + stringStack.size()); // 3
        
        // Peek tesztelése
        System.out.println("Teteje: " + stringStack.peek()); // "harmadik"
        System.out.println("Méret peek után: " + stringStack.size()); // 3
        
        // Pop tesztelése
        System.out.println("Pop: " + stringStack.pop()); // "harmadik"
        System.out.println("Pop: " + stringStack.pop()); // "második"
        System.out.println("Méret: " + stringStack.size()); // 1
        
        // Integer stack tesztelése
        Stack<Integer> intStack = new Stack<>();
        intStack.push(10);
        intStack.push(20);
        
        System.out.println("Int pop: " + intStack.pop()); // 20
        
        // Exception tesztelése
        try {
            Stack<String> emptyStack = new Stack<>();
            emptyStack.pop(); // EmptyStackException
        } catch (EmptyStackException e) {
            System.out.println("Elkapott exception: " + e.getMessage());
        }
    }
}
```

---

## Összefoglalás és következő lépések

### Mit gyakoroltál:
- ✅ OOP alapelvek (encapsuláció, öröklődés, polimorfizmus)
- ✅ Konstruktorok és metódusok
- ✅ Kivétel kezelés (exceptions)
- ✅ Generikusok (generics)
- ✅ Collections (List, ArrayList)
- ✅ Abstract osztályok
- ✅ Enum-ok

### Következő témák:
1. **Design Pattern-ok** - Singleton, Factory, Observer
2. **Stream API** - funkcionális programozás Java-ban
3. **Concurrency** - Thread-ek és szinkronizáció
4. **I/O műveletek** - fájlkezelés
5. **Unit tesztelés** - JUnit használata

### Plusz feladatok:
- Egészítsd ki a fenti megoldásokat hibakezeléssel
- Implementálj equals() és hashCode() metódusokat
- Készíts unit teszteket JUnit-tal
- Próbálkozz tervezési mintákkal (pl. Builder pattern a BankAccount-hoz)

---

💡 **Tipp:** Minden feladatot próbálj meg önállóan megoldani, és csak utána nézd meg a megoldást!