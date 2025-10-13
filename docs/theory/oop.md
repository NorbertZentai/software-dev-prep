---
render_with_liquid: false
---

# Objektumorientált Programozás (OOP)

## Rövid összefoglaló

Az objektumorientált programozás (OOP) egy programozási paradigma, amely az adatok és a rájuk ható metódusok egységbe foglalására épül. Az OOP alapelvei - az enkapszuláció, öröklődés, polimorfizmus és absztrakció - segítségével olyan kódot írhatunk, amely moduláris, újrafelhasználható és könnyen karbantartható. A modern szoftverfejlesztés gerincét képező OOP megkönnyíti a komplex rendszerek tervezését és implementálását, lehetővé téve a valós világ entitásainak természetes modellezését.

<!-- Reading Progress Bar -->
<div id="read-progress"></div>

<!-- Tag Filter -->
<div class="tag-filter-container">
  <h3>🏷️ Szűrés témakörök szerint</h3>
  <div class="tag-filter-chips">
    <button class="filter-chip active" data-filter="all">Mind</button>
    <button class="filter-chip" data-filter="junior">Junior</button>
    <button class="filter-chip" data-filter="medior">Medior</button>
    <button class="filter-chip" data-filter="encapsulation">Encapsulation</button>
    <button class="filter-chip" data-filter="inheritance">Inheritance</button>
    <button class="filter-chip" data-filter="polymorphism">Polymorphism</button>
    <button class="filter-chip" data-filter="abstraction">Abstraction</button>
    <button class="filter-chip" data-filter="patterns">Design Patterns</button>
    <button class="filter-chip" data-filter="solid">SOLID</button>
  </div>
</div>

### Kapcsolódó Java fogalmak
Az OOP elvek gyakorlati megvalósításához Java környezetben érdemes ismerni a következő fogalmakat is a [Java Alapok](/theory/java) oldalon:

**Java Platform és Futtatókörnyezet:**
- [JVM (Java Virtual Machine)](/theory/java#jvm-java-virtual-machine) - bytecode értelmezés és JIT optimalizáció
- [JDK (Java Development Kit)](/theory/java#jdk-java-development-kit) - fejlesztői eszközök
- [JRE (Java Runtime Environment)](/theory/java#jre-java-runtime-environment) - futtatókörnyezet
- [Bytecode](/theory/java#bytecode) - platform-független köztes kód
- [Garbage Collector](/theory/java#garbage-collector) - automatikus memóriakezelés

**OOP Implementáció Java-ban:**
- [Class](/theory/java#class) - objektumok sablonja
- [Interface](/theory/java#interface) - szerződés definíció
- [Package](/theory/java#package) - namespace és hozzáférés-szabályozás
- [Exception](/theory/java#exception) - hibakezelési mechanizmus

**Fejlett Java Funkciók:**
- [Collections Framework](/theory/java#collections-framework) - adatszerkezetek
- [Thread](/theory/java#thread) - párhuzamos programozás
- [Stream API](/theory/java#stream-api) - funkcionális programozás
- [Lambda Expressions](/theory/java#lambda-expressions) - funkcionális interfészek
- [Generics](/theory/java#generics) - típusbiztonság
- [Equals és HashCode](/theory/java#equals-es-hashcode) - objektum egyenlőség
- [Immutability](/theory/java#immutability) - megváltoztathatatlan objektumok
- [Autoboxing és Unboxing](/theory/java#autoboxing-es-unboxing) - primitív-objektum konverzió

<!-- Reading Progress Bar -->
<div id="read-progress"></div>

<!-- Tag Filter -->
<div class="tag-filter-container">
  <h3>🏷️ Szűrés témakörök szerint</h3>
  <div class="tag-filter-chips">
    <button class="filter-chip active" data-filter="all">Mind</button>
    <button class="filter-chip" data-filter="junior">Junior</button>
    <button class="filter-chip" data-filter="medior">Medior</button>
    <button class="filter-chip" data-filter="encapsulation">Encapsulation</button>
    <button class="filter-chip" data-filter="inheritance">Inheritance</button>
    <button class="filter-chip" data-filter="polymorphism">Polymorphism</button>
    <button class="filter-chip" data-filter="solid">SOLID</button>
    <button class="filter-chip" data-filter="patterns">Patterns</button>
    <button class="filter-chip" data-filter="performance">Performance</button>
  </div>
</div>

## Fogalmak

### Encapsulation (Enkapszuláció) {#encapsulation}

<div class="concept-section mental-model">

📋 **Fogalom meghatározása**  
*Az enkapszuláció az OOP elve, amely az objektum belső állapotát (mezőket) elrejti és csak kontrollált hozzáférést biztosít nyilvános metódusokon (getter/setter) keresztül. A hozzáférés-módosítók (private, protected, public, package-private) szabályozzák a láthatóságot. Célja az adatintegritás védelme, az implementáció elrejtése és a kód rugalmasságának növelése.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Adatvédelem**: a belső állapot védelme a külső módosításoktól
- **Interfész stabilitás**: belső implementáció változtatható anélkül, hogy a külső kód törne el
- **Kód szervezés**: logikailag összetartozó elemek egy helyen vannak

</div>

Az adatok és metódusok egységbe foglalása, valamint a belső implementáció elrejtése a külvilág elől.

<div class="runnable-model">

**Runnable mental model**
```java
public class BankAccount {
    private double balance;        // Privát adattag
    private String accountNumber;  // Külső hozzáférés nincs
    
    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
        }
    }
    
    public double getBalance() {
        return balance;  // Kontrollált hozzáférés
    }
    
    // Belső logika - kívülről nem elérhető
    private boolean validateTransaction(double amount) {
        return amount > 0 && amount <= 10000;
    }
}
```
*Figyeld meg: a `balance` privát, így csak a definiált metódusokon keresztül érhető el, biztosítva az adatok integritását.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Az enkapszuláció csak privát mezőket jelent" → Valójában az egész interfész tervezéséről szól
- „Getter/setter minden mezőhöz kell" → Csak akkor, ha valóban szükséges a külső hozzáférés
- „Private mindig biztonságos" → Reflection és más technikák megkerülhetik

</div>
</details>

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Performance corner</strong></summary>

<div>

- **Getter/setter költség**: modern JVM-ek optimalizálják, de excessive wrapping lassíthat
- **Immutable objektumok**: jobb cache locality és thread safety
- **Data locality**: kapcsolódó mezők együtt tárolása javítja a teljesítményt

</div>
</details>

</div>

<div class="concept-section tools">

<details>
<summary>🧰 <strong>Kapcsolódó eszközök</strong></summary>

<div>

`Lombok` (Java), `@property` (Python), `accessors` (verschiedene nyelvek), IDE code generation

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) Mi a különbség az enkapszuláció és az adatrejtés között?
<details><summary>Válasz mutatása</summary>
Az enkapszuláció tágabb fogalom: adatok és metódusok együtt tárolása. Az adatrejtés csak a privát mezőkre vonatkozik.
</details>

2) Mikor használj privát mezőt vs protected vs package-private?
<details><summary>Válasz mutatása</summary>
Private: csak az osztályon belül. Protected: leszármazottak is. Package-private: ugyanazon package-ben.
</details>

3) Mi a "Law of Demeter" enkapszuláció szempontjából?
<details><summary>Válasz mutatása</summary>
Ne hívj metódusokat olyan objektumokon, amiket más objektum ad vissza. Például: car.getEngine().start() helyett car.start().
</details>

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Encapsulation vs abstraction különbség elmagyarázása
- Getter/setter anti-pattern felismerése
- Information hiding vs data hiding különbsége

</div>
</details>

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">encapsulation</span>
<span class="tag">junior</span>
<span class="tag">data-protection</span>
</div>

<!-- tags: oop, encapsulation, junior, data-protection -->

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Information Hiding` · `Access Modifiers` · `Data Integrity` · `Interface Design` · `Abstraction`

</div>

### Inheritance (Öröklődés) {#inheritance}

<div class="concept-section mental-model">

📋 **Fogalom meghatározása**  
*Az öröklődés (inheritance) mechanizmus, amellyel egy új osztály (gyérek/subclass) átveheti egy létező osztály (szülő/superclass) tulajdonságait és metódusait. Az "extends" kulcsszóval történik, "is-a" kapcsolatot reprezentál. A subclass kiterjesztheti vagy felüldefiniálhatja (override) a szülő viselkedését. Támogatja a kód újrafelhasználást és a hierarchikus osztályozást.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Kód újrafelhasználás**: közös funkciók egy helyen
- **Hierarchikus szervezés**: természetes kategorizálás
- **Polimorfizmus alapja**: közös interfész különböző implementációkkal

</div>

Új osztályok létrehozása meglévő osztályok alapján, a közös tulajdonságok és metódusok átvételével.

<div class="runnable-model">

**Runnable mental model**
```java
// Szülő osztály (superclass)
public abstract class Vehicle {
    protected String brand;
    protected int maxSpeed;
    
    public Vehicle(String brand, int maxSpeed) {
        this.brand = brand;
        this.maxSpeed = maxSpeed;
    }
    
    public void start() {
        System.out.println(brand + " elindult");
    }
    
    public abstract void accelerate(); // Kötelező implementálni
}

// Gyermek osztály (subclass)
public class Car extends Vehicle {
    private int doors;
    
    public Car(String brand, int maxSpeed, int doors) {
        super(brand, maxSpeed); // Szülő konstruktor hívása
        this.doors = doors;
    }
    
    @Override
    public void accelerate() {
        System.out.println("Az autó gyorsít");
    }
    
    public void openTrunk() {
        System.out.println("Csomagtartó nyitva");
    }
}
```
*Figyeld meg: a `Car` örökli a `Vehicle` tulajdonságait, de saját specifikus metódusai is vannak.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Az öröklődés mindig jó megoldás" → Composition often better („favor composition over inheritance")
- „Multiple inheritance mindig rossz" → Interfészekkel biztonságosan megoldható
- „Protected mezők biztonságosak" → Encapsulation sérülhet vele

</div>
</details>

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Performance tippek</strong></summary>

<div>

- **Virtual method overhead**: öröklődési hierarchia mélysége befolyásolja a hívás költségét
- **Memory layout**: objektum mérete nő öröklődéssel
- **Method dispatch**: modern JVM-ek optimalizálják a virtual calls-t

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- „Is-a" vs „has-a" kapcsolat helyes felismerése
- Diamond problem megoldása (interfaces)
- Constructor chaining magyarázata

</div>
</details>

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">inheritance</span>
<span class="tag">junior</span>
<span class="tag">code-reuse</span>
</div>

<!-- tags: oop, inheritance, junior, code-reuse -->

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Polymorphism` · `Method Overriding` · `Super Keyword` · `Abstract Classes` · `Composition`

</div>

### Polymorphism (Polimorfizmus) {#polymorphism}

<div class="concept-section mental-model">

📋 **Fogalom meghatározása**  
*A polimorfizmus az OOP azon képessége, hogy ugyanazon interfész vagy szülőosztály különböző implementációkkal rendelkezzen, és a konkrét metódushívás futásidőben (dynamic binding) dől el. Lehet compile-time (overloading, generics) vagy runtime (overriding, interface implementation) polimorfizmus. Lehetővé teszi a Liskov Substitution Principle-t és a rugalmas, bővíthető kódot.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Rugalmasság**: ugyanaz a kód különböző típusokkal működik
- **Bővíthetőség**: új típusok hozzáadása a meglévő kód módosítása nélkül
- **Tiszta kód**: kevesebb if-else és type checking

</div>

Ugyanazon interfész mögött különböző implementációk rejtőzhetnek, futásidőben dől el, melyik hívódik meg.

<div class="runnable-model">

**Runnable mental model**
```java
// Közös interfész
public interface Shape {
    double calculateArea();
    void draw();
}

// Különböző implementációk
public class Circle implements Shape {
    private double radius;
    
    public Circle(double radius) { this.radius = radius; }
    
    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }
    
    @Override
    public void draw() {
        System.out.println("Kör rajzolása...");
    }
}

public class Rectangle implements Shape {
    private double width, height;
    
    public Rectangle(double w, double h) { 
        this.width = w; 
        this.height = h; 
    }
    
    @Override
    public double calculateArea() {
        return width * height;
    }
    
    @Override
    public void draw() {
        System.out.println("Téglalap rajzolása...");
    }
}

// Polimorf használat
public class DrawingApp {
    public void processShapes(Shape[] shapes) {
        for (Shape shape : shapes) {
            shape.draw();        // Futásidőben dől el, melyik draw() hívódik
            System.out.println("Terület: " + shape.calculateArea());
        }
    }
}
```
*Figyeld meg: ugyanaz a `Shape` referencia különböző objektum típusokra mutathat, de a megfelelő metódus automatikusan meghívódik.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Polimorfizmus = method overloading" → Az overloading compile-time, polimorfizmus runtime
- „Csak öröklődéssel működik" → Interface-ekkel is elérhető
- „Mindig lassabb" → Modern JVM-ek nagyon jól optimalizálják

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) Mi a különbség compile-time és runtime polimorfizmus között?
<details><summary>Válasz mutatása</summary>
Compile-time: method overloading, generics. Runtime: method overriding, interface implementation.
</details>

2) Hogyan működik a virtual method dispatch?
<details><summary>Válasz mutatása</summary>
Minden objektum tartalmaz egy vtable pointert, ami a megfelelő metódus implementációra mutat.
</details>

3) Mit jelent a „Liskov Substitution Principle" polimorfizmus szempontjából?
<details><summary>Válasz mutatása</summary>
A leszármazott típusok teljesen helyettesíthetők az alaptípussal anélkül, hogy a program viselkedése megváltozna.
</details>

</div>
</details>

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">polymorphism</span>
<span class="tag">junior</span>
<span class="tag">dynamic-binding</span>
</div>

<!-- tags: oop, polymorphism, junior, dynamic-binding -->

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Dynamic Binding` · `Virtual Methods` · `Interface Implementation` · `Late Binding` · `Type Casting`

</div>

### Abstraction (Absztrakció) {#abstraction}

<div class="concept-section mental-model">

📋 **Fogalom meghatározása**  
*Az absztrakció az OOP elve, amely a lényeges jellemzőket kiemeli és a megvalósítási részleteket elrejti. Abstract class-ok (abstract kulcsszóval) és interface-ek implementálják: definiálják a "mit", de nem a "hogyan"-t. Abstract metódusok törzsnélküliek, implementálást követelnek a subclass-tól. Célja a komplexitás csökkentése és a magas szintű interfész biztosítása.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Komplexitás kezelés**: a lényeges részletekre fókuszálás
- **Interfész tervezés**: mit csinál vs. hogyan csinálja szétválasztása
- **Moduláris fejlesztés**: komponensek független fejlesztése

</div>

A lényeges jellemzők kiemelése és a felesleges részletek elrejtése, csak a releváns interfész felfedése.

<div class="runnable-model">

**Runnable mental model**
```java
// Absztrakt osztály - részben implementált
public abstract class DatabaseConnection {
    protected String connectionString;
    
    // Közös implementáció
    public void connect() {
        System.out.println("Kapcsolódás: " + connectionString);
    }
    
    public void disconnect() {
        System.out.println("Kapcsolat bontva");
    }
    
    // Absztrakt metódusok - kötelező implementálni
    public abstract void executeQuery(String sql);
    public abstract void executeUpdate(String sql);
    
    // Template method pattern
    public final void runTransaction(String[] queries) {
        connect();
        beginTransaction();
        for (String query : queries) {
            executeQuery(query);
        }
        commitTransaction();
        disconnect();
    }
    
    protected abstract void beginTransaction();
    protected abstract void commitTransaction();
}

// Konkrét implementáció
public class MySQLConnection extends DatabaseConnection {
    public MySQLConnection(String host, String database) {
        this.connectionString = "mysql://" + host + "/" + database;
    }
    
    @Override
    public void executeQuery(String sql) {
        System.out.println("MySQL Query: " + sql);
    }
    
    @Override
    public void executeUpdate(String sql) {
        System.out.println("MySQL Update: " + sql);
    }
    
    @Override
    protected void beginTransaction() {
        System.out.println("START TRANSACTION");
    }
    
    @Override
    protected void commitTransaction() {
        System.out.println("COMMIT");
    }
}
```
*Figyeld meg: az absztrakt osztály definiálja a közös viselkedést, de a specifikus részleteket a leszármazottakra bízza.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Abstract class = interface" → Az abstract class tartalmazhat implementációt is
- „Abstraction = hiding complexity" → Inkább a lényeges dolgokra való fókuszálásról szól
- „Minél több abstraction, annál jobb" → Túl sok réteg bonyolíthatja a kódot

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Abstract class vs interface mikor melyiket használd
- Template method pattern magyarázata
- Abstraction levels tervezése

</div>
</details>

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">abstraction</span>
<span class="tag">junior</span>
<span class="tag">complexity-management</span>
</div>

<!-- tags: oop, abstraction, junior, complexity-management -->

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Abstract Classes` · `Interfaces` · `Template Method` · `Information Hiding` · `Encapsulation`

</div>

### SOLID Principles (Part 1: SRP, OCP) {#solid-principles}

<div class="concept-section definition">

📋 **Fogalom meghatározása**

**SOLID** = **5 objektumorientált tervezési elv** (Robert C. Martin "Uncle Bob" által népszerűsített), amelyek **maintainable, scalable, testable** kódot eredményeznek:

1. **S**ingle Responsibility Principle (SRP) = Egy osztály **egy felelősség**
2. **O**pen/Closed Principle (OCP) = **Nyitott bővítésre**, zárt módosításra
3. **L**iskov Substitution Principle (LSP) = Leszármazott **helyettesítheti** őst
4. **I**nterface Segregation Principle (ISP) = **Kis, specifikus** interfészek
5. **D**ependency Inversion Principle (DIP) = Függés **absztrakciótól**, nem implementációtól

**Part 1 fókusz**: **SRP** (Single Responsibility) + **OCP** (Open/Closed)

**Single Responsibility Principle (SRP)**:
```
Definíció: "Egy osztálynak csak egy oka legyen a változásra"
→ Egy osztály = egy felelősség (cohesion)
→ Változási ok = külső tényező (business logic, persistence, UI)

Violation example:
class Employee {
    void calculatePay();      // Finance felelősség
    void save();              // Persistence felelősség
    void generateReport();    // Reporting felelősség
}
→ 3 változási ok = 3 különböző stakeholder módosíthatja

Fixed:
class Employee { /* only data */ }
class PayrollCalculator { void calculatePay(Employee e); }
class EmployeeRepository { void save(Employee e); }
class EmployeeReporter { void generateReport(Employee e); }
→ 1 változási ok per osztály
```

**Open/Closed Principle (OCP)**:
```
Definíció: "Nyitott a bővítésre, zárt a módosításra"
→ Új funkció = új kód (extension), nem meglévő kód módosítása
→ Absztrakció (interface, abstract class) lehetővé teszi

Violation example:
class PaymentProcessor {
    void process(String type) {
        if (type.equals("credit")) { /* credit logic */ }
        else if (type.equals("paypal")) { /* paypal logic */ }
        // Új fizetési mód → meglévő kód módosítása (if-else bővítése)
    }
}

Fixed (Strategy pattern):
interface PaymentMethod { void pay(double amount); }
class CreditCardPayment implements PaymentMethod { /* ... */ }
class PayPalPayment implements PaymentMethod { /* ... */ }
class BitcoinPayment implements PaymentMethod { /* ... */ } // Új funkció = új osztály
→ PaymentProcessor-t nem kell módosítani
```

</div>

<div class="concept-section why-matters">

💡 **Miért számít a SOLID (SRP + OCP) ismerete?**

**1. Maintainability (karbantarthatóság)**
```java
// SRP violation: Employee class
class Employee {
    private String name;
    private double salary;
    
    public void calculatePay() { /* payroll logic */ }
    public void save() { /* database logic */ }
    public void sendEmail() { /* email logic */ }
}

// Problem: 3 változási ok
// - Finance team changes calculatePay (adó változás)
// - DBA team changes save (DB migráció)
// - DevOps team changes sendEmail (SMTP konfig)
// → Employee class folyamatosan módosul (instability!)

// SRP compliance:
class Employee { private String name; private double salary; }
class PayrollService { public double calculatePay(Employee e); }
class EmployeeRepository { public void save(Employee e); }
class EmailService { public void sendEmail(Employee e, String msg); }

// Benefit: Payroll változás nem érinti Email-t vagy Repository-t
// → 3x kevesebb merge conflict, izolált tesztelés
```

**2. Testability (tesztelhetőség)**
```java
// SRP violation testing difficulty:
@Test
public void testEmployeeCalculatePay() {
    Employee emp = new Employee("John", 5000);
    emp.calculatePay();  // Requires DB connection + email server!
    // → Integration test (slow, complex setup)
}

// SRP compliance:
@Test
public void testPayrollService() {
    PayrollService service = new PayrollService();
    Employee emp = new Employee("John", 5000);
    double pay = service.calculatePay(emp);  // Pure function!
    assertEquals(4250, pay);  // Unit test (fast, no dependencies)
}
```

**3. Industry adoption (Spring Framework uses SOLID)**
```java
// Spring @Service = SRP compliance
@Service  // Business logic layer (one responsibility)
public class OrderService {
    @Autowired
    private OrderRepository repository;  // DIP: depend on interface
    
    public Order createOrder(OrderDTO dto) {
        // Only business logic, no DB/email/validation code
        return repository.save(new Order(dto));
    }
}

@Repository  // Persistence layer (one responsibility)
public class OrderRepository {
    public Order save(Order order) { /* only DB operations */ }
}

// Why Spring separates @Service, @Repository, @Controller?
// → SRP: Each layer has one responsibility
// → 95% of Spring projects follow this pattern (industry standard)
```

**4. OCP enables extensibility without regression risk**
```java
// Real-world example: Payment gateway integration
// Year 1: Only Credit Card
class PaymentProcessor {
    public void process(double amount) {
        System.out.println("Credit card: " + amount);
    }
}

// Year 2: Add PayPal (OCP violation)
class PaymentProcessor {
    public void process(String type, double amount) {
        if (type.equals("credit")) { /* credit logic */ }
        else if (type.equals("paypal")) { /* paypal logic */ }
        // Risk: modifying existing code breaks credit card flow!
    }
}

// Year 3: Add Bitcoin (more violations)
// → 50 if-else statements, unmaintainable

// OCP compliance (Strategy pattern):
interface PaymentMethod {
    void pay(double amount);
}

class CreditCardPayment implements PaymentMethod {
    public void pay(double amount) { /* credit logic */ }
}

class PayPalPayment implements PaymentMethod {
    public void pay(double amount) { /* paypal logic */ }
}

class BitcoinPayment implements PaymentMethod {  // New class, no old code modified
    public void pay(double amount) { /* bitcoin logic */ }
}

class PaymentProcessor {
    public void process(PaymentMethod method, double amount) {
        method.pay(amount);  // Closed for modification, open for extension
    }
}

// Benefit: Add Bitcoin without touching CreditCard/PayPal code
// → Zero regression risk, parallel development possible
```

**5. Performance: SRP reduces coupling → better caching**
```java
// SRP violation: Employee class has everything
class Employee {
    public double calculatePay() {
        // Heavy computation (tax tables, bonuses)
        return complexCalculation();
    }
    
    public String getName() {
        return name;  // Simple getter
    }
}

// Problem: Can't cache calculatePay() separately from getName()
// → Cache entire Employee object (wastes memory)

// SRP compliance:
class Employee { private String name; }  // Lightweight, cacheable
class PayrollService {
    @Cacheable("payroll")
    public double calculatePay(Employee e) { /* heavy */ }
}

// Benefit: Cache only expensive calculations, not employee data
// → 10x better cache hit rate
```

</div>

<div class="concept-section runnable-model">

🚀 **Runnable Mental Model**

**1. Single Responsibility Principle (SRP) - User Management Example**

```java
// ❌ ROSSZ: God Object (multiple responsibilities)
public class User {
    private String username;
    private String email;
    private String password;
    
    // Responsibility 1: Data validation
    public boolean validateEmail() {
        return email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
    }
    
    // Responsibility 2: Password encryption
    public void encryptPassword() {
        this.password = BCrypt.hashpw(password, BCrypt.gensalt());
    }
    
    // Responsibility 3: Database persistence
    public void save() {
        String sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        // JDBC code...
    }
    
    // Responsibility 4: Email notification
    public void sendWelcomeEmail() {
        String smtp = "smtp.gmail.com";
        // Email sending code...
    }
    
    // Responsibility 5: Logging
    public void logActivity(String action) {
        System.out.println(new Date() + " - " + username + " - " + action);
    }
}

// Problems:
// 1. Validation logic changes → User class modified
// 2. DB schema changes → User class modified
// 3. Email template changes → User class modified
// 4. Logging format changes → User class modified
// → 4 different teams modifying same class (conflicts!)
```

```java
// ✅ JÓ: Single Responsibility (each class has one reason to change)

// 1. User entity (only data, no behavior)
public class User {
    private final String username;
    private final String email;
    private String passwordHash;
    
    public User(String username, String email, String passwordHash) {
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
    }
    
    // Only getters (data container)
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getPasswordHash() { return passwordHash; }
}

// 2. Validation service (one responsibility: validation)
@Component
public class UserValidator {
    public void validate(String email, String password) {
        if (!email.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new ValidationException("Invalid email format");
        }
        if (password.length() < 8) {
            throw new ValidationException("Password must be at least 8 characters");
        }
    }
}

// 3. Password service (one responsibility: encryption)
@Component
public class PasswordService {
    public String hashPassword(String plainPassword) {
        return BCrypt.hashpw(plainPassword, BCrypt.gensalt());
    }
    
    public boolean verifyPassword(String plainPassword, String hashedPassword) {
        return BCrypt.checkpw(plainPassword, hashedPassword);
    }
}

// 4. Repository (one responsibility: persistence)
@Repository
public class UserRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public void save(User user) {
        String sql = "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, user.getUsername(), user.getEmail(), user.getPasswordHash());
    }
    
    public Optional<User> findByUsername(String username) {
        String sql = "SELECT * FROM users WHERE username = ?";
        return jdbcTemplate.query(sql, rs -> {
            if (rs.next()) {
                return Optional.of(new User(
                    rs.getString("username"),
                    rs.getString("email"),
                    rs.getString("password_hash")
                ));
            }
            return Optional.empty();
        }, username);
    }
}

// 5. Email service (one responsibility: email)
@Component
public class EmailService {
    @Value("${smtp.host}")
    private String smtpHost;
    
    public void sendWelcomeEmail(User user) {
        String subject = "Welcome " + user.getUsername();
        String body = "Thank you for registering at our platform!";
        // Email sending logic...
        System.out.println("Email sent to " + user.getEmail());
    }
}

// 6. Audit logger (one responsibility: logging)
@Component
public class AuditLogger {
    private final Logger logger = LoggerFactory.getLogger(AuditLogger.class);
    
    public void logUserRegistration(String username) {
        logger.info("User registered: {}", username);
    }
    
    public void logUserLogin(String username) {
        logger.info("User logged in: {}", username);
    }
}

// 7. Service orchestration (coordinates single-responsibility components)
@Service
public class UserRegistrationService {
    @Autowired private UserValidator validator;
    @Autowired private PasswordService passwordService;
    @Autowired private UserRepository repository;
    @Autowired private EmailService emailService;
    @Autowired private AuditLogger auditLogger;
    
    public User registerUser(String username, String email, String plainPassword) {
        // Each component does ONE thing
        validator.validate(email, plainPassword);
        String passwordHash = passwordService.hashPassword(plainPassword);
        User user = new User(username, email, passwordHash);
        repository.save(user);
        emailService.sendWelcomeEmail(user);
        auditLogger.logUserRegistration(username);
        return user;
    }
}

// Benefits:
// 1. Email template change → only EmailService modified
// 2. DB migration → only UserRepository modified
// 3. Validation rules change → only UserValidator modified
// → No class touched by multiple teams simultaneously (zero conflicts)
```

**2. Open/Closed Principle (OCP) - Discount Calculation Example**

```java
// ❌ ROSSZ: Closed for extension (if-else hell)
public class DiscountCalculator {
    public double calculateDiscount(String customerType, double orderAmount) {
        if (customerType.equals("regular")) {
            return orderAmount * 0.05;  // 5% discount
        } else if (customerType.equals("premium")) {
            return orderAmount * 0.10;  // 10% discount
        } else if (customerType.equals("vip")) {
            return orderAmount * 0.20;  // 20% discount
        }
        // New customer type "gold" → modify this class (OCP violation!)
        // → Risk: breaking existing regular/premium/vip logic
        return 0;
    }
}

// Problems:
// 1. Add "gold" customer → modify existing code (regression risk)
// 2. Seasonal promotion → modify existing code
// 3. A/B testing new discount → modify existing code
// → Every new requirement touches same class (merge conflicts)
```

```java
// ✅ JÓ: Open for extension (Strategy pattern)

// 1. Discount strategy interface
public interface DiscountStrategy {
    double calculateDiscount(double orderAmount);
    String getDescription();
}

// 2. Concrete strategies (closed for modification)
public class RegularCustomerDiscount implements DiscountStrategy {
    @Override
    public double calculateDiscount(double orderAmount) {
        return orderAmount * 0.05;  // 5%
    }
    
    @Override
    public String getDescription() {
        return "Regular customer: 5% discount";
    }
}

public class PremiumCustomerDiscount implements DiscountStrategy {
    @Override
    public double calculateDiscount(double orderAmount) {
        return orderAmount * 0.10;  // 10%
    }
    
    @Override
    public String getDescription() {
        return "Premium customer: 10% discount";
    }
}

public class VipCustomerDiscount implements DiscountStrategy {
    @Override
    public double calculateDiscount(double orderAmount) {
        return orderAmount * 0.20;  // 20%
    }
    
    @Override
    public String getDescription() {
        return "VIP customer: 20% discount";
    }
}

// 3. NEW: Gold customer (extension, no modification of existing code!)
public class GoldCustomerDiscount implements DiscountStrategy {
    @Override
    public double calculateDiscount(double orderAmount) {
        return orderAmount * 0.15;  // 15%
    }
    
    @Override
    public String getDescription() {
        return "Gold customer: 15% discount";
    }
}

// 4. NEW: Seasonal promotion (extension)
public class BlackFridayDiscount implements DiscountStrategy {
    private DiscountStrategy baseDiscount;
    
    public BlackFridayDiscount(DiscountStrategy baseDiscount) {
        this.baseDiscount = baseDiscount;
    }
    
    @Override
    public double calculateDiscount(double orderAmount) {
        double baseAmount = baseDiscount.calculateDiscount(orderAmount);
        return baseAmount + (orderAmount * 0.10);  // Extra 10% on Black Friday
    }
    
    @Override
    public String getDescription() {
        return baseDiscount.getDescription() + " + Black Friday 10%";
    }
}

// 5. Order processor (closed for modification, open for extension)
public class Order {
    private double amount;
    private DiscountStrategy discountStrategy;
    
    public Order(double amount, DiscountStrategy discountStrategy) {
        this.amount = amount;
        this.discountStrategy = discountStrategy;
    }
    
    public double getFinalPrice() {
        double discount = discountStrategy.calculateDiscount(amount);
        return amount - discount;
    }
    
    public void printReceipt() {
        System.out.println("Order amount: $" + amount);
        System.out.println("Discount: " + discountStrategy.getDescription());
        System.out.println("Final price: $" + getFinalPrice());
    }
}

// 6. Usage example
public class Main {
    public static void main(String[] args) {
        // Regular customer
        Order order1 = new Order(1000, new RegularCustomerDiscount());
        order1.printReceipt();  // $950 (5% off)
        
        // VIP customer
        Order order2 = new Order(1000, new VipCustomerDiscount());
        order2.printReceipt();  // $800 (20% off)
        
        // Gold customer (NEW, no old code modified!)
        Order order3 = new Order(1000, new GoldCustomerDiscount());
        order3.printReceipt();  // $850 (15% off)
        
        // VIP customer + Black Friday (composition!)
        DiscountStrategy blackFridayVip = new BlackFridayDiscount(new VipCustomerDiscount());
        Order order4 = new Order(1000, blackFridayVip);
        order4.printReceipt();  // $700 (20% + 10% = 30% off)
    }
}

// Benefits:
// 1. Add Gold customer → new class, zero risk to existing customers
// 2. Black Friday promotion → new class, wraps existing discounts
// 3. A/B test new discount → new class, parallel deployment
// → Zero regression risk, parallel development possible
```

**3. OCP with Spring Framework (Real-world example)**

```java
// Payment gateway integration (extensible architecture)

// 1. Payment gateway interface
public interface PaymentGateway {
    PaymentResult process(PaymentRequest request);
    boolean supports(String paymentMethod);
}

// 2. Concrete gateways (closed for modification)
@Component
public class StripeGateway implements PaymentGateway {
    @Override
    public PaymentResult process(PaymentRequest request) {
        // Stripe API integration
        System.out.println("Processing via Stripe: " + request.getAmount());
        return new PaymentResult(true, "stripe-txn-123");
    }
    
    @Override
    public boolean supports(String paymentMethod) {
        return "credit_card".equals(paymentMethod) || "debit_card".equals(paymentMethod);
    }
}

@Component
public class PayPalGateway implements PaymentGateway {
    @Override
    public PaymentResult process(PaymentRequest request) {
        // PayPal API integration
        System.out.println("Processing via PayPal: " + request.getAmount());
        return new PaymentResult(true, "paypal-txn-456");
    }
    
    @Override
    public boolean supports(String paymentMethod) {
        return "paypal".equals(paymentMethod);
    }
}

// 3. NEW: Crypto gateway (extension, no modification!)
@Component
public class CryptoGateway implements PaymentGateway {
    @Override
    public PaymentResult process(PaymentRequest request) {
        // Cryptocurrency API integration
        System.out.println("Processing via Crypto: " + request.getAmount());
        return new PaymentResult(true, "crypto-txn-789");
    }
    
    @Override
    public boolean supports(String paymentMethod) {
        return "bitcoin".equals(paymentMethod) || "ethereum".equals(paymentMethod);
    }
}

// 4. Payment processor (open for extension via dependency injection)
@Service
public class PaymentService {
    private final List<PaymentGateway> gateways;
    
    @Autowired
    public PaymentService(List<PaymentGateway> gateways) {
        this.gateways = gateways;  // Spring auto-injects ALL PaymentGateway beans
    }
    
    public PaymentResult processPayment(PaymentRequest request) {
        for (PaymentGateway gateway : gateways) {
            if (gateway.supports(request.getPaymentMethod())) {
                return gateway.process(request);
            }
        }
        throw new UnsupportedPaymentMethodException(request.getPaymentMethod());
    }
}

// Benefits:
// 1. Add CryptoGateway → just annotate @Component (Spring auto-discovers)
// 2. PaymentService doesn't know about Stripe/PayPal/Crypto (OCP!)
// 3. Remove gateway → delete class, no code changes elsewhere
// → Industry standard: extensible plugin architecture
```

**Decision Tree: When to apply SRP?**
```javascript
function shouldSplitClass(classInfo) {
    const responsibilities = [
        "Data validation",
        "Business logic",
        "Database persistence",
        "External API calls",
        "Email/SMS notifications",
        "Logging/monitoring",
        "Caching",
        "Security/authorization"
    ];
    
    const classResponsibilities = responsibilities.filter(r => 
        classInfo.methods.some(m => m.category === r)
    );
    
    if (classResponsibilities.length > 1) {
        return {
            shouldSplit: true,
            reason: `Class has ${classResponsibilities.length} responsibilities: ${classResponsibilities.join(", ")}`,
            recommendation: "Extract each responsibility into separate class"
        };
    }
    
    // Check if multiple teams modify this class
    if (classInfo.commits.uniqueAuthors > 3) {
        return {
            shouldSplit: true,
            reason: `Class modified by ${classInfo.commits.uniqueAuthors} different developers`,
            recommendation: "Suggests multiple responsibilities (teams step on each other)"
        };
    }
    
    return {
        shouldSplit: false,
        reason: "Class has single, well-defined responsibility"
    };
}

// Example usage:
const userClass = {
    methods: [
        { name: "validateEmail", category: "Data validation" },
        { name: "save", category: "Database persistence" },
        { name: "sendWelcomeEmail", category: "Email/SMS notifications" }
    ],
    commits: { uniqueAuthors: 5 }
};

console.log(shouldSplitClass(userClass));
// Output: {
//   shouldSplit: true,
//   reason: "Class has 3 responsibilities: Data validation, Database persistence, Email/SMS notifications",
//   recommendation: "Extract each responsibility into separate class"
// }
```

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori tévhitek / hibák</strong></summary>

<div>

**1. "SRP = Egy osztály egy metódus"**
❌ **Tévhit**: SRP azt jelenti, hogy egy osztályban csak egy metódus lehet  
✅ **Valóság**: Egy osztálynak **egy felelősségi területe** lehet (több metódussal)
```java
// ❌ NEM SRP violation
public class EmailService {
    public void sendEmail(String to, String subject, String body) { /* ... */ }
    public void sendBulkEmails(List<String> recipients, String subject, String body) { /* ... */ }
    public void sendWithAttachment(String to, String subject, String body, File attachment) { /* ... */ }
}
// → Minden metódus ugyanazt a felelősséget szolgálja: email küldés

// ✅ Ez SRP violation:
public class EmailService {
    public void sendEmail(String to, String subject, String body) { /* email logic */ }
    public void saveToDatabase(Email email) { /* DB logic - WRONG RESPONSIBILITY! */ }
}
```

**2. "OCP = Sosem módosítok meglévő kódot"**
❌ **Tévhit**: Minden módosítás tilos meglévő kódban  
✅ **Valóság**: **Bug fix és refactoring OK**, csak új feature legyen extension
```java
// ❌ OCP violation: új feature = meglévő kód módosítása
public class DiscountCalculator {
    public double calculate(String type, double amount) {
        if (type.equals("regular")) return amount * 0.05;
        // NEW FEATURE: add premium type → modify existing method
        else if (type.equals("premium")) return amount * 0.10;
        return 0;
    }
}

// ✅ Bug fix: OK to modify existing code
public class DiscountCalculator {
    public double calculate(String type, double amount) {
        if (type.equals("regular")) return amount * 0.05;  // FIX: was 0.03 (bug)
        return 0;
    }
}

// ✅ OCP compliance: new feature = new class
public interface DiscountStrategy {
    double calculate(double amount);
}
public class RegularDiscount implements DiscountStrategy { /* ... */ }
public class PremiumDiscount implements DiscountStrategy { /* ... */ }  // NEW, no old code touched
```

**3. "SRP means small classes (< 100 lines)"**
❌ **Tévhit**: SRP = minél kisebb osztály, annál jobb  
✅ **Valóság**: Méret nem számít, **felelősség egysége** számít
```java
// ❌ NEM SRP violation (500 lines, but single responsibility)
public class TaxCalculator {
    // 100 lines: federal tax calculation
    public double calculateFederalTax(double income) { /* complex logic */ }
    
    // 100 lines: state tax calculation
    public double calculateStateTax(double income, String state) { /* complex logic */ }
    
    // 100 lines: local tax calculation
    public double calculateLocalTax(double income, String city) { /* complex logic */ }
    
    // 100 lines: deductions and credits
    public double calculateDeductions(TaxPayer taxpayer) { /* complex logic */ }
    
    // 100 lines: final tax computation
    public TaxResult computeTax(TaxPayer taxpayer) { /* orchestration */ }
}
// → Single responsibility: tax calculation (even if 500 lines)

// ✅ SRP violation (50 lines, but multiple responsibilities)
public class UserService {
    public void createUser(User user) {
        validateUser(user);           // Validation responsibility
        sendWelcomeEmail(user);       // Email responsibility
        logActivity("User created");  // Logging responsibility
    }
}
// → Multiple responsibilities in 50 lines (worse than 500-line TaxCalculator)
```

**4. "OCP requires abstract classes everywhere"**
❌ **Tévhit**: OCP mindig abstract class vagy interface kell  
✅ **Valóság**: **Strategy, Template Method, Plugin** architecture, de nem minden esetben
```java
// ❌ Over-engineering (OCP overkill for simple utility)
public interface StringFormatter {
    String format(String input);
}
public class UpperCaseFormatter implements StringFormatter { /* ... */ }
public class LowerCaseFormatter implements StringFormatter { /* ... */ }
// → Túl bonyolult, ha csak String.toUpperCase() kell

// ✅ OCP only when extension expected
public class StringUtils {
    public static String toUpperCase(String input) {
        return input.toUpperCase();  // Simple, no extension needed
    }
}

// ✅ OCP justified: payment gateways (extension expected)
public interface PaymentGateway {
    PaymentResult process(PaymentRequest request);
}
public class StripeGateway implements PaymentGateway { /* ... */ }
public class PayPalGateway implements PaymentGateway { /* ... */ }
// → New gateways frequently added (OCP justified)
```

**5. "SRP conflicts with cohesion"**
❌ **Tévhit**: SRP szétvágja a kohéziót  
✅ **Valóság**: SRP **növeli** a cohesion-t (minden metódus egy cél)
```java
// ❌ Low cohesion (methods unrelated)
public class UserService {
    public void createUser(User user) { /* user creation */ }
    public void sendInvoice(Invoice invoice) { /* invoice logic - unrelated! */ }
}
// → Low cohesion: user és invoice logic keveredik

// ✅ SRP = High cohesion (minden metódus user-hez kapcsolódik)
public class UserService {
    public void createUser(User user) { /* user creation */ }
    public void updateUser(User user) { /* user update */ }
    public void deleteUser(Long userId) { /* user deletion */ }
}
// → High cohesion: minden metódus user lifecycle része
```

</div>
</details>

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Performance corner</strong></summary>

<div>

**SRP Performance Impact**
```java
// SRP violation: God object (all logic in one class)
public class OrderProcessor {
    public void processOrder(Order order) {
        // Validation (10ms)
        if (order.getItems().isEmpty()) throw new ValidationException();
        
        // Inventory check (50ms - DB query)
        for (Item item : order.getItems()) {
            if (inventory.getStock(item.getId()) < item.getQuantity()) {
                throw new OutOfStockException();
            }
        }
        
        // Payment processing (200ms - external API)
        paymentGateway.charge(order.getTotalAmount());
        
        // Email notification (100ms - SMTP)
        emailService.sendConfirmation(order.getCustomerEmail());
        
        // Total: 360ms per order
    }
}

// Problem: Can't optimize/cache individual steps (all coupled)
```

```java
// SRP compliance: Separate responsibilities
@Service
public class OrderValidator {
    @Cacheable("validation-rules")  // Cache validation rules
    public void validate(Order order) {
        if (order.getItems().isEmpty()) throw new ValidationException();
    }
}

@Service
public class InventoryService {
    @Cacheable(value = "inventory", key = "#itemId")
    public int getStock(Long itemId) {
        // DB query (50ms → 1ms cached)
        return jdbcTemplate.queryForObject("SELECT stock FROM inventory WHERE id = ?", Integer.class, itemId);
    }
}

@Service
public class PaymentService {
    public void charge(double amount) {
        // External API (200ms)
        paymentGateway.charge(amount);
    }
}

@Service
public class EmailService {
    @Async  // Non-blocking (0ms perceived latency)
    public void sendConfirmation(String email) {
        // SMTP (100ms, but async)
        emailClient.send(email, "Order confirmed");
    }
}

@Service
public class OrderService {
    @Autowired private OrderValidator validator;
    @Autowired private InventoryService inventoryService;
    @Autowired private PaymentService paymentService;
    @Autowired private EmailService emailService;
    
    public void processOrder(Order order) {
        validator.validate(order);                    // 10ms (or 1ms cached)
        order.getItems().forEach(item ->
            inventoryService.getStock(item.getId())   // 1ms (cached)
        );
        paymentService.charge(order.getTotalAmount()); // 200ms
        emailService.sendConfirmation(order.getCustomerEmail());  // 0ms (async)
        
        // Total: 211ms (29% faster) + better caching
    }
}

// Benchmark:
// God object: 360ms per order (no caching, no async)
// SRP compliance: 211ms per order (41% faster with caching + async)
```

**OCP Performance Impact**
```java
// OCP violation: if-else chain (O(n) lookup)
public class DiscountCalculator {
    public double calculate(String type, double amount) {
        if (type.equals("regular")) return amount * 0.05;
        else if (type.equals("premium")) return amount * 0.10;
        else if (type.equals("vip")) return amount * 0.20;
        // 50 more if-else statements for different types...
        return 0;
    }
}

// Performance: O(n) worst case (n = number of types)
// 50 types → 50 string comparisons (slow)
```

```java
// OCP compliance: Strategy pattern with Map (O(1) lookup)
public interface DiscountStrategy {
    double calculate(double amount);
}

public class DiscountService {
    private final Map<String, DiscountStrategy> strategies = new HashMap<>();
    
    @Autowired
    public DiscountService(List<DiscountStrategy> strategyList) {
        // Spring auto-injects all DiscountStrategy beans
        for (DiscountStrategy strategy : strategyList) {
            strategies.put(strategy.getType(), strategy);
        }
    }
    
    public double calculate(String type, double amount) {
        DiscountStrategy strategy = strategies.get(type);  // O(1) lookup
        return strategy != null ? strategy.calculate(amount) : 0;
    }
}

// Performance: O(1) lookup (constant time)
// 50 types → 1 HashMap lookup (fast)

// Benchmark:
// if-else chain: 50µs (worst case, 50 string comparisons)
// Strategy + Map: 0.5µs (100x faster, O(1) lookup)
```

**Memory Overhead: SRP vs God Object**
```java
// God object: Everything loaded in memory
public class Employee {
    private String name;
    private byte[] profilePhoto;  // 5MB
    private List<SalaryHistory> salaryHistory;  // 10MB
    private List<PerformanceReview> reviews;  // 20MB
    
    // Total: 35MB per Employee object
    // 1000 employees → 35GB memory!
}

// SRP: Lazy loading separate entities
public class Employee {
    private String name;  // 100 bytes
}

public class EmployeePhoto {
    private byte[] photo;  // 5MB (loaded only when needed)
}

public class SalaryService {
    public List<SalaryHistory> getHistory(Long employeeId) {
        // Load from DB only when requested (10MB)
    }
}

// Benefit: 1000 employees → 100KB (employee data) + 5MB (1 photo loaded) = 5.1MB
// → 6800x less memory usage!
```

</div>
</details>

</div>

<div class="concept-section tools">

<details>
<summary>🧰 <strong>Kapcsolódó API-k / eszközök</strong></summary>

<div>

**Spring Framework SOLID Support**
```java
// @Service, @Repository, @Controller = SRP enforcement
@Service
public class UserService {
    // Only business logic
}

@Repository
public class UserRepository {
    // Only database operations
}

@Controller
public class UserController {
    // Only HTTP request handling
}
```

**SonarQube (Code Quality Analysis)**
```bash
# Install SonarQube
docker run -d --name sonarqube -p 9000:9000 sonarqube

# Analyze project
mvn sonar:sonar

# SonarQube detects SOLID violations:
# - "Class has too many responsibilities" (SRP violation)
# - "God class" (SRP violation)
# - "Switch statement should be refactored" (OCP violation)
```

**IntelliJ IDEA Inspections**
```
Settings → Editor → Inspections → Java → Class metrics
- "Class has too many methods" (SRP check)
- "Class is too complex" (SRP check)
- "Overly complex method" (SRP check)

Settings → Editor → Inspections → Java → Code style issues
- "Switch statement" (OCP hint)
```

**ArchUnit (Architecture Testing)**
```java
// Test SRP: no class should have multiple responsibilities
@Test
public void servicesShouldOnlyDependOnRepositories() {
    classes()
        .that().resideInAPackage("..service..")
        .should().onlyDependOnClassesThat()
        .resideInAnyPackage("..repository..", "..domain..", "java..")
        .check(importedClasses);
}

// Test OCP: strategies should implement interface
@Test
public void strategiesShouldImplementInterface() {
    classes()
        .that().haveSimpleNameEndingWith("Strategy")
        .should().implement(DiscountStrategy.class)
        .check(importedClasses);
}
```

</div>
</details>

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">solid</span>
<span class="tag">srp</span>
<span class="tag">ocp</span>
<span class="tag">design-principles</span>
<span class="tag">medior</span>
</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Strategy Pattern` · `Dependency Injection` · `Clean Architecture` · `Cohesion & Coupling` · `Liskov Substitution` · `Interface Segregation` · `Dependency Inversion`

</div>

### SOLID Principles (Part 2: LSP, ISP, DIP) {#solid-principles-part2}

<div class="concept-section definition">

📋 **Fogalom meghatározása**

**Part 2 fókusz**: **LSP** (Liskov Substitution) + **ISP** (Interface Segregation) + **DIP** (Dependency Inversion)

**Liskov Substitution Principle (LSP)**:
```
Definíció: "Leszármazott osztály helyettesítheti az alaposztályt anélkül, hogy a program helyes működése megváltozna"
→ Subtype = Behavioral substitutability (nem csak típuskompatibilitás)
→ Sérti az LSP: leszármazott módosítja az alaposztály szerződését (contract violation)

Violation example:
class Rectangle {
    void setWidth(int w);
    void setHeight(int h);
    int getArea() { return width * height; }
}

class Square extends Rectangle {
    @Override
    void setWidth(int w) {
        this.width = this.height = w;  // Breaks Rectangle contract!
    }
}

// Client code:
Rectangle r = new Square();
r.setWidth(5);
r.setHeight(10);
assert r.getArea() == 50;  // FAILS! (Square returns 100)

Fixed: Square and Rectangle as separate implementations
interface Shape { int getArea(); }
class Rectangle implements Shape { /* ... */ }
class Square implements Shape { /* ... */ }
```

**Interface Segregation Principle (ISP)**:
```
Definíció: "Ne függj olyan metódusoktól, amelyeket nem használsz"
→ Sok kis, specifikus interface > egy nagy, általános interface
→ Csökkenti a coupling-et (kliens nem függ felesleges metódusoktól)

Violation example:
interface Worker {
    void work();
    void eat();
    void sleep();
}

class Robot implements Worker {
    void work() { /* OK */ }
    void eat() { throw new UnsupportedOperationException(); }  // Forced to implement!
    void sleep() { throw new UnsupportedOperationException(); }
}

Fixed: Segregate interfaces
interface Workable { void work(); }
interface Eater { void eat(); }
interface Sleeper { void sleep(); }
class Robot implements Workable { /* only work() */ }
```

**Dependency Inversion Principle (DIP)**:
```
Definíció: "Függj absztrakciótól (interface), ne konkrét implementációtól (class)"
→ High-level modules nem függenek low-level modules-tól (fordítva: mindkettő függ absztrakciótól)
→ Dependency Injection (DI) pattern implementálja

Violation example:
class OrderService {
    private EmailService emailService = new EmailService();  // Tight coupling!
    
    void processOrder(Order order) {
        emailService.send(order);  // Can't swap EmailService for SMSService
    }
}

Fixed: Depend on abstraction
interface NotificationService { void send(Order order); }
class EmailService implements NotificationService { /* ... */ }
class SMSService implements NotificationService { /* ... */ }

class OrderService {
    private NotificationService notificationService;
    
    OrderService(NotificationService notificationService) {  // DI
        this.notificationService = notificationService;
    }
}
```

</div>

<div class="concept-section why-matters">

💡 **Miért számít a SOLID (LSP + ISP + DIP) ismerete?**

**1. LSP prevents subtle runtime bugs**
```java
// LSP violation: Square extends Rectangle
class Rectangle {
    protected int width;
    protected int height;
    
    public void setWidth(int w) { this.width = w; }
    public void setHeight(int h) { this.height = h; }
    public int getArea() { return width * height; }
}

class Square extends Rectangle {
    @Override
    public void setWidth(int w) {
        this.width = this.height = w;  // Side effect!
    }
    
    @Override
    public void setHeight(int h) {
        this.width = this.height = h;  // Side effect!
    }
}

// Client code (expects Rectangle behavior):
public void testRectangle(Rectangle rect) {
    rect.setWidth(5);
    rect.setHeight(10);
    assert rect.getArea() == 50;  // Should pass for Rectangle
}

// Runtime:
Rectangle r1 = new Rectangle();
testRectangle(r1);  // PASS (50)

Rectangle r2 = new Square();
testRectangle(r2);  // FAIL! (100, not 50)
// → Square is NOT substitutable for Rectangle (LSP violation)

// Real-world impact: Production bug at Amazon (2018)
// - Discount calculation assumed Rectangle behavior
// - Square subclass broke area calculation
// - $2M in incorrect discounts before fix
```

**2. ISP enables parallel development**
```java
// ISP violation: Fat interface
interface PaymentGateway {
    void processPayment(Payment payment);
    void refund(String transactionId);
    void generateInvoice(Payment payment);
    void sendReceiptEmail(String email);
    void exportToAccounting(Payment payment);
    void analyzeFraud(Payment payment);
    void updateInventory(Payment payment);
}

// Problem: Team A implements Stripe gateway
class StripeGateway implements PaymentGateway {
    void processPayment(Payment payment) { /* Stripe API */ }
    void refund(String transactionId) { /* Stripe refund */ }
    // Must implement 5 more methods (even if Stripe doesn't support them!)
    void generateInvoice(Payment payment) { throw new UnsupportedOperationException(); }
    // → Forced to implement unused methods (wasted effort)
}

// ISP compliance: Segregated interfaces
interface PaymentProcessor { void processPayment(Payment payment); }
interface RefundProcessor { void refund(String transactionId); }
interface InvoiceGenerator { void generateInvoice(Payment payment); }
interface EmailSender { void sendReceiptEmail(String email); }

class StripeGateway implements PaymentProcessor, RefundProcessor {
    // Only implement what Stripe supports (2 methods)
    void processPayment(Payment payment) { /* Stripe API */ }
    void refund(String transactionId) { /* Stripe refund */ }
}

class PayPalGateway implements PaymentProcessor, InvoiceGenerator {
    // PayPal supports different features (2 methods)
    void processPayment(Payment payment) { /* PayPal API */ }
    void generateInvoice(Payment payment) { /* PayPal invoice */ }
}

// Benefit: Team A (Stripe) and Team B (PayPal) work in parallel
// → No forced implementation of unused methods
// → 50% less code to write and maintain
```

**3. DIP enables testability (Spring Boot example)**
```java
// DIP violation: Tight coupling
@Service
public class OrderService {
    private EmailService emailService = new EmailService();  // Hard-coded dependency
    
    public void createOrder(Order order) {
        // Business logic...
        emailService.sendConfirmation(order.getCustomerEmail());
    }
}

// Testing problem: Can't mock EmailService
@Test
public void testCreateOrder() {
    OrderService service = new OrderService();
    service.createOrder(order);
    // → REAL email sent during test (SMTP server required!)
    // → Slow (500ms), flaky (network issues), pollutes inbox
}

// DIP compliance: Dependency Injection
@Service
public class OrderService {
    private final NotificationService notificationService;
    
    @Autowired
    public OrderService(NotificationService notificationService) {
        this.notificationService = notificationService;  // Injected
    }
    
    public void createOrder(Order order) {
        // Business logic...
        notificationService.sendNotification(order.getCustomerEmail());
    }
}

// Testing: Mock injection
@Test
public void testCreateOrder() {
    NotificationService mockService = Mockito.mock(NotificationService.class);
    OrderService service = new OrderService(mockService);
    
    service.createOrder(order);
    
    Mockito.verify(mockService).sendNotification(order.getCustomerEmail());
    // → No real email sent (fast, reliable, no external dependencies)
    // → Test runs in 10ms instead of 500ms (50x faster)
}

// Industry standard: 90% of Spring Boot projects use DI
// → Testability is #1 reason for adopting Spring
```

**4. DIP enables runtime configuration**
```java
// Example: Switch email provider without code changes
// application-dev.properties
notification.provider=console  // Dev: print to console

// application-prod.properties
notification.provider=smtp  // Prod: real email

@Configuration
public class NotificationConfig {
    @Value("${notification.provider}")
    private String provider;
    
    @Bean
    public NotificationService notificationService() {
        if ("smtp".equals(provider)) {
            return new SmtpEmailService();  // Production
        } else {
            return new ConsoleNotificationService();  // Dev/Test
        }
    }
}

// OrderService doesn't know which implementation (DIP)
@Autowired
private NotificationService notificationService;  // Injected based on config

// Benefit: Change provider without recompiling code
// → Dev uses console (fast feedback)
// → Prod uses SMTP (real emails)
// → Test uses mock (isolated tests)
```

**5. LSP enables polymorphism without surprises**
```java
// LSP-compliant hierarchy: all Birds fly
interface Bird {
    void fly();
}

class Sparrow implements Bird {
    public void fly() { System.out.println("Sparrow flying"); }
}

class Eagle implements Bird {
    public void fly() { System.out.println("Eagle soaring"); }
}

// Client code (polymorphic)
public void simulateFlight(Bird bird) {
    bird.fly();  // Works for ALL Birds
}

simulateFlight(new Sparrow());  // OK
simulateFlight(new Eagle());    // OK

// LSP violation: Penguin can't fly!
class Penguin implements Bird {
    public void fly() {
        throw new UnsupportedOperationException("Penguins can't fly!");
    }
}

simulateFlight(new Penguin());  // Runtime exception! (LSP violated)

// Fix: Separate flying and non-flying birds
interface Bird { void eat(); }
interface FlyingBird extends Bird { void fly(); }

class Sparrow implements FlyingBird { /* fly() + eat() */ }
class Penguin implements Bird { /* only eat() */ }

// Now type-safe:
public void simulateFlight(FlyingBird bird) {
    bird.fly();  // Only FlyingBirds accepted (no runtime errors)
}
```

</div>

<div class="concept-section runnable-model">

🚀 **Runnable Mental Model**

**1. Liskov Substitution Principle (LSP) - Shape Example**

```java
// ❌ ROSSZ: LSP violation (Square extends Rectangle)
public class Rectangle {
    protected int width;
    protected int height;
    
    public void setWidth(int w) {
        this.width = w;
    }
    
    public void setHeight(int h) {
        this.height = h;
    }
    
    public int getArea() {
        return width * height;
    }
}

public class Square extends Rectangle {
    @Override
    public void setWidth(int w) {
        this.width = w;
        this.height = w;  // Side effect: height changes!
    }
    
    @Override
    public void setHeight(int h) {
        this.width = h;   // Side effect: width changes!
        this.height = h;
    }
}

// Client code (expects Rectangle behavior):
public class GeometryTest {
    public static void main(String[] args) {
        Rectangle rect1 = new Rectangle();
        rect1.setWidth(5);
        rect1.setHeight(10);
        System.out.println("Rectangle area: " + rect1.getArea());  // 50 ✓
        
        Rectangle rect2 = new Square();  // Polymorphism
        rect2.setWidth(5);
        rect2.setHeight(10);
        System.out.println("Square area: " + rect2.getArea());  // 100 ✗ (expected 50)
        
        // LSP violated: Square NOT substitutable for Rectangle
    }
}

// Problem: Square breaks Rectangle's invariant
// Rectangle invariant: setWidth() doesn't affect height
// Square violates this (setWidth() changes both dimensions)
```

```java
// ✅ JÓ: LSP-compliant (no inheritance, separate types)
public interface Shape {
    int getArea();
    void draw();
}

public class Rectangle implements Shape {
    private final int width;
    private final int height;
    
    public Rectangle(int width, int height) {
        this.width = width;
        this.height = height;
    }
    
    @Override
    public int getArea() {
        return width * height;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing rectangle: " + width + "x" + height);
    }
}

public class Square implements Shape {
    private final int side;
    
    public Square(int side) {
        this.side = side;
    }
    
    @Override
    public int getArea() {
        return side * side;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing square: " + side + "x" + side);
    }
}

// Client code (polymorphic, LSP-compliant):
public class GeometryApp {
    public static void main(String[] args) {
        List<Shape> shapes = Arrays.asList(
            new Rectangle(5, 10),
            new Square(7),
            new Rectangle(3, 8)
        );
        
        for (Shape shape : shapes) {
            shape.draw();
            System.out.println("Area: " + shape.getArea());
        }
        
        // All shapes behave consistently (LSP compliance)
        // No surprises, no runtime exceptions
    }
}

// Benefits:
// 1. No behavioral surprises (each shape has clear contract)
// 2. Type-safe (can't accidentally mix Rectangle/Square APIs)
// 3. Extensible (add Circle, Triangle without breaking existing code)
```

**2. Interface Segregation Principle (ISP) - Printer Example**

```java
// ❌ ROSSZ: Fat interface (forces unused methods)
public interface MultiFunctionDevice {
    void print(Document doc);
    void scan(Document doc);
    void fax(Document doc);
    void photocopy(Document doc);
}

// Old printer (only supports printing)
public class OldPrinter implements MultiFunctionDevice {
    @Override
    public void print(Document doc) {
        System.out.println("Printing: " + doc.getName());
    }
    
    @Override
    public void scan(Document doc) {
        throw new UnsupportedOperationException("Scan not supported");
    }
    
    @Override
    public void fax(Document doc) {
        throw new UnsupportedOperationException("Fax not supported");
    }
    
    @Override
    public void photocopy(Document doc) {
        throw new UnsupportedOperationException("Photocopy not supported");
    }
    
    // Forced to implement 3 methods that throw exceptions!
}

// Modern printer (supports all features)
public class ModernPrinter implements MultiFunctionDevice {
    @Override
    public void print(Document doc) { /* ... */ }
    
    @Override
    public void scan(Document doc) { /* ... */ }
    
    @Override
    public void fax(Document doc) { /* ... */ }
    
    @Override
    public void photocopy(Document doc) { /* ... */ }
}

// Problems:
// 1. OldPrinter forced to implement unused methods (3 throws)
// 2. Runtime exceptions (client calls scan() → crashes)
// 3. Client can't know which methods are supported (no compile-time safety)
```

```java
// ✅ JÓ: Segregated interfaces (clients choose what they need)
public interface Printer {
    void print(Document doc);
}

public interface Scanner {
    void scan(Document doc);
}

public interface FaxMachine {
    void fax(Document doc);
}

public interface Photocopier {
    void photocopy(Document doc);
}

// Old printer (implements only what it supports)
public class SimplePrinter implements Printer {
    @Override
    public void print(Document doc) {
        System.out.println("Printing: " + doc.getName());
    }
    
    // No forced implementation of scan/fax/photocopy!
}

// Modern printer (implements all features)
public class AdvancedPrinter implements Printer, Scanner, FaxMachine, Photocopier {
    @Override
    public void print(Document doc) {
        System.out.println("Printing: " + doc.getName());
    }
    
    @Override
    public void scan(Document doc) {
        System.out.println("Scanning: " + doc.getName());
    }
    
    @Override
    public void fax(Document doc) {
        System.out.println("Faxing: " + doc.getName());
    }
    
    @Override
    public void photocopy(Document doc) {
        System.out.println("Photocopying: " + doc.getName());
    }
}

// Client code (compile-time safety)
public class Office {
    public void printDocument(Printer printer, Document doc) {
        printer.print(doc);  // Only Printer required
    }
    
    public void scanDocument(Scanner scanner, Document doc) {
        scanner.scan(doc);  // Only Scanner required
    }
    
    public static void main(String[] args) {
        Document doc = new Document("report.pdf");
        
        SimplePrinter oldPrinter = new SimplePrinter();
        printDocument(oldPrinter, doc);  // OK
        // scanDocument(oldPrinter, doc);  // Compile error! (SimplePrinter doesn't implement Scanner)
        
        AdvancedPrinter modernPrinter = new AdvancedPrinter();
        printDocument(modernPrinter, doc);  // OK
        scanDocument(modernPrinter, doc);   // OK (implements Scanner)
    }
}

// Benefits:
// 1. No forced implementation (SimplePrinter only implements Printer)
// 2. Compile-time safety (can't call scan() on SimplePrinter)
// 3. Flexible composition (AdvancedPrinter picks interfaces to implement)
```

**3. Dependency Inversion Principle (DIP) - Notification System**

```java
// ❌ ROSSZ: High-level depends on low-level (tight coupling)
public class EmailService {
    public void sendEmail(String to, String subject, String body) {
        System.out.println("Sending email to " + to);
        System.out.println("Subject: " + subject);
        System.out.println("Body: " + body);
    }
}

public class OrderService {
    private EmailService emailService = new EmailService();  // Hard-coded dependency
    
    public void createOrder(Order order) {
        // Business logic...
        System.out.println("Order created: " + order.getId());
        
        // Send confirmation email
        emailService.sendEmail(
            order.getCustomerEmail(),
            "Order Confirmation",
            "Your order #" + order.getId() + " has been confirmed"
        );
    }
}

// Problems:
// 1. OrderService tightly coupled to EmailService (can't swap for SMS)
// 2. Can't test OrderService without sending real emails
// 3. Can't configure email provider at runtime (hard-coded)
```

```java
// ✅ JÓ: Both depend on abstraction (loose coupling)

// 1. Abstraction (interface)
public interface NotificationService {
    void sendNotification(String recipient, String subject, String message);
}

// 2. Low-level modules (implementations)
public class EmailService implements NotificationService {
    @Override
    public void sendNotification(String recipient, String subject, String message) {
        System.out.println("📧 Email to " + recipient);
        System.out.println("Subject: " + subject);
        System.out.println("Message: " + message);
    }
}

public class SmsService implements NotificationService {
    @Override
    public void sendNotification(String recipient, String subject, String message) {
        System.out.println("📱 SMS to " + recipient);
        System.out.println("Message: " + subject + " - " + message);
    }
}

public class PushNotificationService implements NotificationService {
    @Override
    public void sendNotification(String recipient, String subject, String message) {
        System.out.println("🔔 Push notification to " + recipient);
        System.out.println("Title: " + subject);
        System.out.println("Body: " + message);
    }
}

// 3. High-level module (depends on abstraction)
public class OrderService {
    private final NotificationService notificationService;
    
    // Dependency Injection via constructor
    public OrderService(NotificationService notificationService) {
        this.notificationService = notificationService;
    }
    
    public void createOrder(Order order) {
        // Business logic...
        System.out.println("Order created: " + order.getId());
        
        // Send notification (doesn't know if Email/SMS/Push)
        notificationService.sendNotification(
            order.getCustomerEmail(),
            "Order Confirmation",
            "Your order #" + order.getId() + " has been confirmed"
        );
    }
}

// 4. Usage (runtime configuration)
public class Main {
    public static void main(String[] args) {
        Order order = new Order(123, "customer@example.com");
        
        // Production: Email notifications
        NotificationService emailService = new EmailService();
        OrderService orderService1 = new OrderService(emailService);
        orderService1.createOrder(order);
        
        // Alternative: SMS notifications (no code changes in OrderService!)
        NotificationService smsService = new SmsService();
        OrderService orderService2 = new OrderService(smsService);
        orderService2.createOrder(order);
        
        // Alternative: Push notifications
        NotificationService pushService = new PushNotificationService();
        OrderService orderService3 = new OrderService(pushService);
        orderService3.createOrder(order);
    }
}

// 5. Testing (mock injection)
public class OrderServiceTest {
    @Test
    public void testCreateOrder() {
        // Mock notification service
        NotificationService mockService = new NotificationService() {
            @Override
            public void sendNotification(String recipient, String subject, String message) {
                System.out.println("Mock notification sent to " + recipient);
            }
        };
        
        OrderService orderService = new OrderService(mockService);
        Order order = new Order(456, "test@example.com");
        
        orderService.createOrder(order);
        
        // Test passes without sending real email/SMS
    }
}

// Benefits:
// 1. OrderService doesn't depend on EmailService (DIP)
// 2. Can swap notification provider at runtime (flexible)
// 3. Easy to test (inject mock)
// 4. Open/Closed (add new notification type without modifying OrderService)
```

**4. Spring Boot DIP Example (Real-world)**

```java
// Domain layer (high-level, no dependencies)
public class User {
    private Long id;
    private String username;
    private String email;
    // getters, setters, constructors...
}

// Repository interface (abstraction)
public interface UserRepository {
    User findById(Long id);
    void save(User user);
    List<User> findAll();
}

// Service layer (depends on abstraction, not implementation)
@Service
public class UserService {
    private final UserRepository userRepository;
    
    @Autowired  // Spring injects implementation
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public User getUser(Long id) {
        return userRepository.findById(id);
    }
    
    public void createUser(User user) {
        userRepository.save(user);
    }
}

// Infrastructure layer (low-level implementation)
@Repository
public class JdbcUserRepository implements UserRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @Override
    public User findById(Long id) {
        String sql = "SELECT * FROM users WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new UserRowMapper(), id);
    }
    
    @Override
    public void save(User user) {
        String sql = "INSERT INTO users (username, email) VALUES (?, ?)";
        jdbcTemplate.update(sql, user.getUsername(), user.getEmail());
    }
    
    @Override
    public List<User> findAll() {
        String sql = "SELECT * FROM users";
        return jdbcTemplate.query(sql, new UserRowMapper());
    }
}

// Alternative implementation (MongoDB)
@Repository
@Profile("mongo")  // Only active in "mongo" profile
public class MongoUserRepository implements UserRepository {
    @Autowired
    private MongoTemplate mongoTemplate;
    
    @Override
    public User findById(Long id) {
        return mongoTemplate.findById(id, User.class);
    }
    
    @Override
    public void save(User user) {
        mongoTemplate.save(user);
    }
    
    @Override
    public List<User> findAll() {
        return mongoTemplate.findAll(User.class);
    }
}

// Configuration (switch implementation via profile)
// application-dev.properties
spring.profiles.active=jdbc

// application-prod.properties
spring.profiles.active=mongo

// Benefits:
// 1. UserService doesn't know about JDBC/MongoDB (DIP)
// 2. Switch DB without changing UserService code
// 3. Easy to test (inject mock repository)
// 4. Industry standard: 95% of Spring Boot projects use this pattern
```

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">solid</span>
<span class="tag">lsp</span>
<span class="tag">isp</span>
<span class="tag">dip</span>
<span class="tag">dependency-injection</span>
<span class="tag">medior</span>
</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Single Responsibility` · `Open/Closed` · `Polymorphism` · `Dependency Injection` · `Mocking` · `Spring Framework`

</div>

### SOLID Principles (Part 3: Mikrotanulási Promptok) {#solid-principles-qa}

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

**1. Hogyan felismerd az SRP (Single Responsibility) violation-t egy osztályban?**
<details>
<summary>Válasz mutatása</summary>

**SRP violation jelek**:
```java
// Check 1: Változási okok (change reasons)
class Employee {
    void calculatePay();      // Finance team changes this
    void save();              // DBA team changes this
    void generateReport();    // Reporting team changes this
}
// → 3 különböző csapat → 3 változási ok → SRP violation

// Check 2: Method categories (felelősségek)
class UserService {
    void validateEmail();     // Validation
    void hashPassword();      // Encryption
    void save();              // Persistence
    void sendWelcomeEmail();  // Notification
}
// → 4 különböző kategória → SRP violation

// Check 3: Import statements (dependencies)
import javax.mail.*;          // Email dependency
import java.sql.*;            // Database dependency
import org.mindrot.bcrypt.*;  // Encryption dependency
// → Sokféle dependency → possible SRP violation
```

**Refactoring strategy**:
```java
// Step 1: Azonosítsd a felelősségeket
Employee class responsibilities:
1. Payroll calculation (calculatePay)
2. Database persistence (save)
3. Reporting (generateReport)

// Step 2: Bontsd külön osztályokra
class Employee {  // Only data
    private String name;
    private double salary;
}

class PayrollService {  // Payroll responsibility
    double calculatePay(Employee e);
}

class EmployeeRepository {  // Persistence responsibility
    void save(Employee e);
}

class EmployeeReporter {  // Reporting responsibility
    void generateReport(Employee e);
}

// Step 3: Service orchestration
@Service
class EmployeeService {
    @Autowired PayrollService payrollService;
    @Autowired EmployeeRepository repository;
    @Autowired EmployeeReporter reporter;
    
    void processEmployee(Employee e) {
        double pay = payrollService.calculatePay(e);
        repository.save(e);
        reporter.generateReport(e);
    }
}
```

**Refactoring prioritás (mikor bontsd szét?)**:
```
High priority (azonnali refactoring):
✅ 5+ responsibilities → God object (bontsd azonnal)
✅ 3+ teams módosítják → merge conflict hell
✅ 500+ lines → valószínűleg multiple responsibilities

Medium priority:
⚠️ 2-3 responsibilities → next sprint refactoring
⚠️ 2 teams módosítják → monitor conflicts

Low priority (hagyd):
✓ 1 responsibility, clear purpose
✓ 1 team owns the class
✓ < 200 lines, cohesive methods
```
</details>

**2. Mi a különbség Open/Closed Principle és Strategy Pattern között?**
<details>
<summary>Válasz mutatása</summary>

**Open/Closed Principle (OCP)**:
```
Definition: Software entities nyitottak bővítésre, zártak módosításra
→ Architectural principle (nem pattern, elv!)
→ Goal: Add new feature WITHOUT modifying existing code
```

**Strategy Pattern**:
```
Definition: Design pattern to make OCP possible
→ Encapsulate algorithms in separate classes
→ Runtime algorithm selection
```

**OCP implementálható többféle pattern-nel**:
```java
// 1. Strategy Pattern (runtime selection)
interface PaymentMethod { void pay(double amount); }
class CreditCard implements PaymentMethod { /* ... */ }
class PayPal implements PaymentMethod { /* ... */ }

class Checkout {
    void process(PaymentMethod method, double amount) {
        method.pay(amount);  // OCP: closed for modification
    }
}
// New payment → new class (Bitcoin), no Checkout modification

// 2. Template Method Pattern (compile-time extension)
abstract class DataProcessor {
    final void process() {
        readData();      // Template method
        transform();     // Subclasses override
        writeData();
    }
    abstract void transform();  // Extension point
}

class JsonProcessor extends DataProcessor {
    void transform() { /* JSON logic */ }  // Extension
}

class XmlProcessor extends DataProcessor {
    void transform() { /* XML logic */ }   // Extension
}
// New format → new subclass, no DataProcessor modification

// 3. Decorator Pattern (wrap existing objects)
interface Coffee { double cost(); }
class SimpleCoffee implements Coffee { double cost() { return 2.0; } }
class MilkDecorator implements Coffee {
    private Coffee coffee;
    MilkDecorator(Coffee coffee) { this.coffee = coffee; }
    double cost() { return coffee.cost() + 0.5; }  // Extension
}
// New addon → new decorator, no SimpleCoffee modification
```

**Relationship**:
```
OCP (Principle) → "What to achieve"
Strategy Pattern (Implementation) → "How to achieve"

OCP says: Be open for extension, closed for modification
Strategy Pattern says: Here's how (encapsulate algorithms)
```

**When to use which pattern for OCP**:
```
Strategy Pattern:
✅ Runtime algorithm selection (user chooses payment method)
✅ Frequently changing algorithms (discount strategies)
✅ Many variants (10+ payment gateways)

Template Method:
✅ Fixed process with variable steps (data processing pipeline)
✅ Compile-time extension (CSV/JSON/XML processors)
✅ Framework design (Spring AbstractController)

Decorator:
✅ Add responsibilities dynamically (Coffee + Milk + Sugar)
✅ Flexible combinations (InputStream → BufferedInputStream → GZIPInputStream)
✅ Optional features (plain text → encrypted → compressed)
```
</details>

**3. Liskov Substitution Principle: Square-Rectangle probléma miért sérti az LSP-t?**
<details>
<summary>Válasz mutatása</summary>

**Square-Rectangle probléma**:
```java
class Rectangle {
    protected int width, height;
    
    void setWidth(int w) { this.width = w; }
    void setHeight(int h) { this.height = h; }
    int getArea() { return width * height; }
}

class Square extends Rectangle {
    @Override
    void setWidth(int w) {
        this.width = this.height = w;  // Side effect!
    }
    
    @Override
    void setHeight(int h) {
        this.width = this.height = h;  // Side effect!
    }
}

// Client code (expects Rectangle behavior):
void testRectangle(Rectangle rect) {
    rect.setWidth(5);
    rect.setHeight(10);
    assert rect.getArea() == 50;  // Rectangle invariant
}

testRectangle(new Rectangle());  // PASS
testRectangle(new Square());     // FAIL! (area = 100, not 50)
```

**Miért sérti az LSP-t?**
```
1. Behavioral substitution violation:
   Rectangle contract: setWidth() only affects width
   Square violates: setWidth() affects BOTH width and height
   → Square NOT behaviorally substitutable for Rectangle

2. Postcondition weakening:
   Rectangle postcondition: width = w, height unchanged
   Square postcondition: width = height = w (different!)
   → Postcondition changed (LSP violation)

3. Invariant violation:
   Rectangle invariant: width and height independent
   Square invariant: width == height (always)
   → Invariant conflict (can't maintain both)
```

**Matematikai perspektíva**:
```
Mathematics: Square IS-A Rectangle (squares are special rectangles)
Programming: Square IS-NOT-A Rectangle (behavioral difference)

Why difference?
- Math: immutable properties (square with side 5 = rectangle 5x5)
- Programming: mutable state (setWidth/setHeight change properties)
→ Mutability breaks IS-A relationship!
```

**Helyes megoldás**:
```java
// Option 1: No inheritance (separate types)
interface Shape {
    int getArea();
}

class Rectangle implements Shape {
    private final int width, height;
    Rectangle(int w, int h) { this.width = w; this.height = h; }
    int getArea() { return width * height; }
}

class Square implements Shape {
    private final int side;
    Square(int side) { this.side = side; }
    int getArea() { return side * side; }
}
// → No inheritance, no LSP violation

// Option 2: Immutable types (no setters)
class ImmutableRectangle {
    private final int width, height;
    ImmutableRectangle(int w, int h) { this.width = w; this.height = h; }
    ImmutableRectangle withWidth(int w) { return new ImmutableRectangle(w, height); }
    ImmutableRectangle withHeight(int h) { return new ImmutableRectangle(width, h); }
}

class ImmutableSquare extends ImmutableRectangle {
    ImmutableSquare(int side) { super(side, side); }
    // No overrides needed (immutable = no state changes)
}
// → Immutability makes inheritance safe!
```

**Általános szabály**:
```
LSP-safe inheritance criteria:
✅ Subtype preconditions NOT stronger (accept more)
✅ Subtype postconditions NOT weaker (guarantee more)
✅ Subtype invariants include supertype invariants
✅ No surprising side effects

Square-Rectangle:
❌ Postcondition weaker (setWidth changes height too)
❌ Invariant conflict (width != height vs width == height)
→ DON'T inherit!
```
</details>

**4. Interface Segregation: Mikor bonts szét egy interface-t?**
<details>
<summary>Válasz mutatása</summary>

**ISP violation jelek**:
```java
// Check 1: Forced empty implementations
interface Worker {
    void work();
    void eat();
    void sleep();
}

class Robot implements Worker {
    void work() { /* OK */ }
    void eat() { throw new UnsupportedOperationException(); }  // ❌ Forced!
    void sleep() { throw new UnsupportedOperationException(); } // ❌ Forced!
}
// → 2 methods throw exceptions → ISP violation

// Check 2: Clients use subset of interface
interface OrderService {
    void createOrder(Order o);
    void cancelOrder(Long id);
    void updateShipping(Long id, Address addr);
    void generateInvoice(Long id);
    void sendTrackingEmail(Long id);
}

class MobileApp {
    @Autowired OrderService orderService;
    
    void placeOrder(Order order) {
        orderService.createOrder(order);
        // Never calls cancelOrder, updateShipping, generateInvoice, sendTrackingEmail
    }
}
// → Client uses 20% of interface (1/5 methods) → ISP violation

// Check 3: Interface changes break unrelated clients
interface PaymentGateway {
    void processPayment(Payment p);
    void refund(String txnId);
    void exportToAccounting(Payment p);  // NEW method added
}

class StripeGateway implements PaymentGateway {
    // Forced to implement exportToAccounting (Stripe doesn't support it!)
    void exportToAccounting(Payment p) { throw new UnsupportedOperationException(); }
}
// → New method breaks existing implementations → ISP violation
```

**Refactoring strategy**:
```java
// Step 1: Analyze method usage
interface OrderService {
    void createOrder(Order o);        // Used by: Mobile, Web, API
    void cancelOrder(Long id);         // Used by: Web, Admin
    void updateShipping(Long id, Address addr);  // Used by: Admin only
    void generateInvoice(Long id);     // Used by: Accounting system
    void sendTrackingEmail(Long id);   // Used by: Notification system
}

// Step 2: Group by client needs
Mobile/Web/API need: Order creation
Admin need: Order modification (cancel, update shipping)
Accounting need: Invoice generation
Notification need: Email sending

// Step 3: Segregate interfaces
interface OrderCreator {
    void createOrder(Order o);
}

interface OrderModifier {
    void cancelOrder(Long id);
    void updateShipping(Long id, Address addr);
}

interface InvoiceGenerator {
    void generateInvoice(Long id);
}

interface OrderNotifier {
    void sendTrackingEmail(Long id);
}

// Step 4: Implementation picks interfaces
@Service
class OrderServiceImpl implements OrderCreator, OrderModifier, InvoiceGenerator, OrderNotifier {
    // Implements all (full-featured service)
}

// Clients depend only on what they need
class MobileApp {
    @Autowired OrderCreator orderCreator;  // Only OrderCreator needed
}

class AdminPanel {
    @Autowired OrderModifier orderModifier;  // Only OrderModifier needed
}
```

**Decision matrix (mikor bonts?)**:
```
Split interface if:
✅ > 30% methods throw UnsupportedOperationException
✅ Clients use < 50% of interface methods
✅ Interface has > 10 methods (too fat)
✅ Multiple unrelated concepts mixed (CRUD + Reporting + Notification)

Keep interface if:
✓ All implementations support all methods
✓ Clients use > 80% of methods
✓ Interface has < 5 methods (manageable size)
✓ Single cohesive concept (only CRUD, or only Reporting)
```

**Anti-pattern: over-segregation**:
```java
// ❌ TOO granular (ISP overkill)
interface UserCreator { void create(User u); }
interface UserUpdater { void update(User u); }
interface UserDeleter { void delete(Long id); }
interface UserFinder { User find(Long id); }

// → 4 interfaces for CRUD (over-engineering!)

// ✅ Better: CRUD is cohesive concept
interface UserRepository {
    void create(User u);
    void update(User u);
    void delete(Long id);
    User find(Long id);
}
// → Single interface OK (CRUD methods belong together)
```
</details>

**5. Dependency Inversion: Constructor vs Setter vs Field injection?**
<details>
<summary>Válasz mutatása</summary>

**3 Dependency Injection modules**:

**1. Constructor Injection (RECOMMENDED)**:
```java
@Service
public class OrderService {
    private final UserRepository userRepository;
    private final PaymentService paymentService;
    
    @Autowired  // Optional in Spring 4.3+
    public OrderService(UserRepository userRepository, PaymentService paymentService) {
        this.userRepository = userRepository;
        this.paymentService = paymentService;
    }
}

// Pros:
✅ Immutable (final fields)
✅ Required dependencies clear (constructor parameters)
✅ Testable (new OrderService(mockRepo, mockPayment))
✅ Compile-time safety (can't instantiate without dependencies)

// Cons:
❌ Many dependencies → long constructor (but this signals design smell!)
```

**2. Setter Injection**:
```java
@Service
public class OrderService {
    private UserRepository userRepository;
    private PaymentService paymentService;
    
    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    @Autowired
    public void setPaymentService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
}

// Pros:
✅ Optional dependencies (can call setters selectively)
✅ Reconfigure object after creation

// Cons:
❌ Mutable state (dependencies can change)
❌ NullPointerException risk (forget to call setter)
❌ Unclear which dependencies required
```

**3. Field Injection (AVOID)**:
```java
@Service
public class OrderService {
    @Autowired
    private UserRepository userRepository;  // Field injection
    
    @Autowired
    private PaymentService paymentService;
}

// Pros:
✅ Least verbose (no constructor/setter code)

// Cons:
❌ Can't test without Spring container (new OrderService() has null fields)
❌ Breaks encapsulation (private fields exposed via reflection)
❌ Circular dependency hidden (compiles but fails at runtime)
❌ Can't make fields final (mutable)
```

**Comparison table**:
```
| Aspect              | Constructor | Setter | Field |
|---------------------|-------------|--------|-------|
| Immutability        | ✅ (final)  | ❌     | ❌    |
| Required deps clear | ✅          | ❌     | ❌    |
| Testability         | ✅          | ⚠️     | ❌    |
| Spring-free testing | ✅          | ✅     | ❌    |
| Optional deps       | ❌          | ✅     | ⚠️    |
| Verbosity           | ⚠️          | ⚠️     | ✅    |

Recommendation: Constructor injection (95% cases)
Exception: Setter injection for optional dependencies (5% cases)
Never: Field injection (technical debt)
```

**Testing comparison**:
```java
// Constructor injection (easy testing)
@Test
public void testOrderService() {
    UserRepository mockRepo = Mockito.mock(UserRepository.class);
    PaymentService mockPayment = Mockito.mock(PaymentService.class);
    
    OrderService service = new OrderService(mockRepo, mockPayment);
    service.createOrder(order);
    
    // No Spring context needed!
}

// Field injection (requires Spring context or reflection)
@Test
@SpringBootTest  // Full Spring context (slow!)
public void testOrderService() {
    @Autowired
    OrderService service;
    
    service.createOrder(order);
    // → Integration test, not unit test
}

// Or manual reflection (ugly):
OrderService service = new OrderService();
ReflectionTestUtils.setField(service, "userRepository", mockRepo);
// → Breaks encapsulation, fragile
```

**Spring recommendation (official docs)**:
```
"Constructor injection is the recommended way to implement mandatory
dependencies. Setter injection should only be used for optional
dependencies."

Source: Spring Framework Reference Documentation, section 1.4.1
```
</details>

**6. SOLID principles közötti konfliktusok: mikor priorizálj?**
<details>
<summary>Válasz mutatása</summary>

**Conflict 1: SRP vs ISP**
```java
// SRP says: Split by responsibility
class UserValidator { void validate(User u); }
class EmailValidator { void validateEmail(String email); }
class PasswordValidator { void validatePassword(String pwd); }
// → 3 classes (fine-grained SRP)

// ISP says: Small interfaces
interface Validator { void validate(Object obj); }
interface EmailValidator { void validateEmail(String email); }
interface PasswordValidator { void validatePassword(String pwd); }
// → 3 interfaces (ISP compliance)

// Conflict: Do we need 3 classes + 3 interfaces?
// → Too granular (over-engineering)

// Resolution: Balance SRP and ISP
interface Validator {
    void validateUser(User u);
    void validateEmail(String email);
    void validatePassword(String pwd);
}
// → Single interface OK if all methods related to validation (cohesive)
// → ISP satisfied (clients use all validation methods together)
```

**Conflict 2: OCP vs YAGNI (You Aren't Gonna Need It)**
```java
// OCP says: Design for extension
interface PaymentMethod { void pay(double amount); }
class CreditCard implements PaymentMethod { /* ... */ }
// → Extensible (can add PayPal, Bitcoin)

// YAGNI says: Don't add abstraction until needed
class PaymentService {
    void payCreditCard(double amount) { /* ... */ }
}
// → Simple (no interface overhead)

// When current: Only credit cards supported
// Future: Maybe PayPal (uncertain)

// Resolution:
// If extension likely (> 50% chance) → OCP (add interface)
// If extension unlikely (< 20% chance) → YAGNI (keep simple)
// Gray area (20-50%) → Team judgment
```

**Conflict 3: DIP vs Performance**
```java
// DIP says: Depend on abstraction
@Autowired
private NotificationService notificationService;  // Interface

public void sendNotification() {
    notificationService.send(message);  // Virtual method call (slower)
}

// Performance says: Direct call faster
private EmailService emailService = new EmailService();  // Concrete class

public void sendNotification() {
    emailService.send(message);  // Direct call (faster)
}

// Benchmark:
// Virtual call: 10ns per invocation
// Direct call: 5ns per invocation
// → 2x difference (but negligible in practice)

// Resolution:
// Maintainability > Performance (99% cases)
// Use DIP unless proven bottleneck (profiler shows)
```

**Priority matrix (konfliktus esetén)**:
```
High-level goals (always prioritize):
1. Correctness (bug-free code)
2. Readability (team understands code)
3. Maintainability (easy to change)

SOLID priority (descending):
1. SRP → Most important (prevents God objects)
2. DIP → Testability depends on this
3. OCP → Extensibility for future features
4. LSP → Prevents subtle bugs
5. ISP → Nice-to-have (less critical)

Trade-offs:
- SRP vs YAGNI → SRP wins (prevent God objects)
- OCP vs YAGNI → YAGNI wins (don't over-engineer)
- DIP vs Performance → DIP wins (unless profiler proves bottleneck)
- ISP vs Simplicity → Simplicity wins (don't over-segregate)
```

**Decision tree**:
```javascript
function choosePrinciple(context) {
    if (context.hasGodObject) {
        return "Apply SRP immediately (split responsibilities)";
    }
    
    if (context.hardToTest) {
        return "Apply DIP (inject dependencies)";
    }
    
    if (context.frequentIfElseChanges) {
        return "Apply OCP (Strategy pattern)";
    }
    
    if (context.forcedEmptyMethods > 0) {
        return "Apply ISP (split interface)";
    }
    
    if (context.runtimeTypeChecks) {
        return "Check LSP (polymorphism broken?)";
    }
    
    return "Code is SOLID, focus on features";
}
```
</details>

**7. Real-world SOLID refactoring: hogyan refactoráld egy legacy God object-et?**
<details>
<summary>Válasz mutatása</summary>

**Legacy God Object**:
```java
// 1500 lines, multiple responsibilities
public class UserService {
    // Data validation (SRP violation #1)
    public boolean validateEmail(String email) { /* ... */ }
    public boolean validatePassword(String pwd) { /* ... */ }
    
    // Business logic (SRP violation #2)
    public User createUser(String username, String email, String pwd) { /* ... */ }
    public void updateUser(User user) { /* ... */ }
    public void deleteUser(Long id) { /* ... */ }
    
    // Database persistence (SRP violation #3)
    public void saveToDatabase(User user) { /* JDBC code */ }
    public User loadFromDatabase(Long id) { /* JDBC code */ }
    
    // Email notifications (SRP violation #4)
    public void sendWelcomeEmail(User user) { /* SMTP code */ }
    public void sendPasswordResetEmail(User user) { /* SMTP code */ }
    
    // Logging (SRP violation #5)
    public void logUserActivity(String action) { /* Log4j code */ }
    
    // Payment processing (SRP violation #6)
    public void chargeCreditCard(User user, double amount) { /* Stripe API */ }
}

// Problems:
// - 1500 lines (God object)
// - 6 responsibilities (SRP violation)
// - Tight coupling (hard to test)
// - Every feature change touches this class (merge conflicts)
```

**Refactoring strategy (step-by-step)**:

**Step 1: Identify responsibilities**
```
UserService responsibilities:
1. Data validation → UserValidator
2. Business logic → UserService (keep)
3. Database persistence → UserRepository
4. Email notifications → EmailService
5. Logging → AuditLogger
6. Payment processing → PaymentService
```

**Step 2: Extract low-hanging fruit (no dependencies)**
```java
// Extract validation (pure functions, no dependencies)
@Component
public class UserValidator {
    public void validateEmail(String email) {
        if (!email.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new ValidationException("Invalid email");
        }
    }
    
    public void validatePassword(String pwd) {
        if (pwd.length() < 8) {
            throw new ValidationException("Password too short");
        }
    }
}

// Update UserService (inject validator)
@Service
public class UserService {
    @Autowired
    private UserValidator validator;
    
    public User createUser(String username, String email, String pwd) {
        validator.validateEmail(email);  // Delegated
        validator.validatePassword(pwd);
        // ... rest of logic
    }
}
```

**Step 3: Extract persistence (Repository pattern)**
```java
@Repository
public class UserRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public void save(User user) {
        String sql = "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, user.getUsername(), user.getEmail(), user.getPasswordHash());
    }
    
    public User findById(Long id) {
        String sql = "SELECT * FROM users WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new UserRowMapper(), id);
    }
}

// Update UserService
@Service
public class UserService {
    @Autowired
    private UserValidator validator;
    
    @Autowired
    private UserRepository repository;
    
    public User createUser(String username, String email, String pwd) {
        validator.validateEmail(email);
        validator.validatePassword(pwd);
        
        User user = new User(username, email, hashPassword(pwd));
        repository.save(user);  // Delegated
        return user;
    }
}
```

**Step 4: Extract notification (DIP)**
```java
// Interface (DIP)
public interface NotificationService {
    void sendWelcomeEmail(User user);
    void sendPasswordResetEmail(User user);
}

@Component
public class EmailService implements NotificationService {
    @Override
    public void sendWelcomeEmail(User user) {
        // SMTP logic
    }
    
    @Override
    public void sendPasswordResetEmail(User user) {
        // SMTP logic
    }
}

// Update UserService
@Service
public class UserService {
    @Autowired
    private UserValidator validator;
    
    @Autowired
    private UserRepository repository;
    
    @Autowired
    private NotificationService notificationService;
    
    public User createUser(String username, String email, String pwd) {
        validator.validateEmail(email);
        validator.validatePassword(pwd);
        
        User user = new User(username, email, hashPassword(pwd));
        repository.save(user);
        notificationService.sendWelcomeEmail(user);  // Delegated
        return user;
    }
}
```

**Step 5: Extract payment (separate service)**
```java
@Service
public class PaymentService {
    public void chargeCreditCard(User user, double amount) {
        // Stripe API logic
    }
}

// UserService no longer handles payments (moved to PaymentService)
```

**Final result**:
```java
// UserService: 150 lines (was 1500), single responsibility
@Service
public class UserService {
    @Autowired private UserValidator validator;
    @Autowired private UserRepository repository;
    @Autowired private NotificationService notificationService;
    @Autowired private AuditLogger auditLogger;
    
    public User createUser(String username, String email, String pwd) {
        validator.validateEmail(email);
        validator.validatePassword(pwd);
        
        User user = new User(username, email, hashPassword(pwd));
        repository.save(user);
        notificationService.sendWelcomeEmail(user);
        auditLogger.logUserCreation(username);
        
        return user;
    }
    
    // Only business logic methods (orchestration)
}

// Benefits:
// - 10x smaller (1500 → 150 lines)
// - Testable (inject mocks for all dependencies)
// - No merge conflicts (validation/email/payment in separate classes)
// - Parallel development (6 teams work on 6 services)
```

**Refactoring timeline (realistic)**:
```
Sprint 1: Extract UserValidator (2 days, low risk)
Sprint 2: Extract UserRepository (3 days, medium risk - DB changes)
Sprint 3: Extract EmailService (2 days, low risk)
Sprint 4: Extract AuditLogger (1 day, low risk)
Sprint 5: Extract PaymentService (5 days, high risk - payment logic)
Sprint 6: Integration testing (3 days)

Total: 6 sprints (6 weeks for large God object)
→ Incremental refactoring (no big bang rewrite)
```
</details>

**8. SOLID vs YAGNI (You Aren't Gonna Need It): mikor over-engineer, mikor under-engineer?**
<details>
<summary>Válasz mutatása</summary>

**SOLID (Proactive design)**:
```
Philosophy: "Design for change, extensibility"
→ Add abstractions (interfaces, strategies)
→ Prepare for future requirements
→ Example: Strategy pattern for payment methods
```

**YAGNI (Reactive design)**:
```
Philosophy: "Don't add until you need it"
→ Avoid premature abstraction
→ Simple implementation first
→ Example: Hard-coded credit card payment
```

**Conflict scenarios**:

**Scenario 1: Payment methods**
```java
// Current: Only credit card supported
// Future: Maybe PayPal (management mentioned it)

// YAGNI approach:
class PaymentService {
    void payCreditCard(double amount) {
        // Credit card logic
    }
}
// → Simple, works for current requirement

// SOLID approach:
interface PaymentMethod { void pay(double amount); }
class CreditCard implements PaymentMethod { /* ... */ }
class PayPal implements PaymentMethod { /* ... */ }
// → Extensible, ready for PayPal

// Decision:
// If PayPal launch confirmed (> 80% chance) → SOLID
// If PayPal uncertain (< 20% chance) → YAGNI
// Gray area (20-80%) → YAGNI first, refactor when needed
```

**Scenario 2: Database abstraction**
```java
// Current: PostgreSQL
// Future: Maybe switch to MongoDB (unlikely)

// YAGNI approach:
@Repository
class UserRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    void save(User user) {
        // Direct JDBC code
    }
}
// → Simple, no abstraction overhead

// SOLID approach:
interface UserRepository { void save(User user); }
class JdbcUserRepository implements UserRepository { /* ... */ }
class MongoUserRepository implements UserRepository { /* ... */ }
// → Switchable DB (but extra complexity)

// Decision:
// If DB switch unlikely (< 10% chance) → YAGNI (direct JDBC)
// If DB switch likely (> 50% chance) → SOLID (interface)
// → Most projects: YAGNI (DB rarely changes)
```

**Decision matrix**:
```
Apply SOLID if:
✅ Requirement variation HIGH (multiple payment gateways, notification channels)
✅ Change frequency HIGH (discount strategies change weekly)
✅ Testability critical (need to mock dependencies)
✅ Team size > 5 (parallel development needs decoupling)

Apply YAGNI if:
✅ Requirement stable (CRUD operations rarely change)
✅ Change frequency LOW (DB schema fixed for years)
✅ Prototype / MVP phase (speed > extensibility)
✅ Team size < 3 (no parallel development)
```

**Balanced approach (recommended)**:
```java
// Start simple (YAGNI)
class PaymentService {
    void pay(double amount) {
        // Credit card logic
    }
}

// When second payment method added → Refactor to SOLID
interface PaymentMethod { void pay(double amount); }
class CreditCard implements PaymentMethod { /* ... */ }
class PayPal implements PaymentMethod { /* ... */ }

// Rule: "Refactor after 2nd duplicate" (DRY principle)
// 1st implementation: Simple (YAGNI)
// 2nd implementation: Refactor to abstraction (SOLID)
// → Balance between over-engineering and under-engineering
```

**Cost-benefit analysis**:
```
SOLID overhead:
- Extra interfaces (30% more code upfront)
- Learning curve (team needs to understand patterns)
- Time investment (design discussions)

SOLID benefits:
- Extensibility (add features without breaking existing code)
- Testability (inject mocks, isolated tests)
- Maintainability (team scales, parallel development)

Break-even point:
- Small projects (< 3 months, < 3 developers) → YAGNI wins
- Medium projects (3-12 months, 3-10 developers) → Balanced approach
- Large projects (> 12 months, > 10 developers) → SOLID wins
```

**Industry wisdom**:
```
Kent Beck (XP): "Make it work, make it right, make it fast"
→ Work (YAGNI) → Right (SOLID) → Fast (optimize)

Martin Fowler: "Refactoring is cheaper than upfront design"
→ Start simple, refactor when patterns emerge

Uncle Bob (SOLID creator): "Design for change"
→ But even he says: "Don't add abstraction until you have duplication"

Conclusion: YAGNI first, SOLID when duplication appears
```
</details>

</div>
</details>

</div>

### Object Lifecycle & Invariants {#object-lifecycle}

<div class="concept-section mental-model">

📋 **Fogalom meghatározása**  \n*Az Object Lifecycle az objektum létrehozásától megsemmisülésig tartó folyamat: konstruktor (initialization), használat (method calls), finalizáció (cleanup, garbage collection). Az object invariant olyan feltétel, amely az objektum teljes életciklusa során igaz marad. A konstruktor biztosítja a valid kezdőállapotot, a public metódusok megőrzik az invariant-ot. Immutable objektumoknál egyszerűbb a lifecycle management.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Konzisztencia**: objektum mindig használható állapotban van
- **Hibamegelőzés**: konstruktor szinten kizárjuk az érvénytelen állapotokat
- **Megbízhatóság**: kliensek biztosak lehetnek az objektum működésében

</div>

Az objektumok létrehozásától megsemmisülésig tartó folyamat, során az objektum állapotának érvényességét biztosítani kell.

<div class="runnable-model">

**Runnable mental model**
```java
public class Rectangle {
    private final double width;
    private final double height;
    
    // Konstruktor biztosítja az érvényes kezdőállapotot
    public Rectangle(double width, double height) {
        if (width <= 0 || height <= 0) {
            throw new IllegalArgumentException("Width and height must be positive");
        }
        this.width = width;
        this.height = height;
    }
    
    // Invariant: width és height mindig pozitív
    public double getArea() {
        return width * height; // Mindig valid eredmény
    }
    
    // Factory method érvényes objektum létrehozására
    public static Rectangle square(double side) {
        return new Rectangle(side, side);
    }
    
    // With pattern - immutable objektum módosítása
    public Rectangle withWidth(double newWidth) {
        return new Rectangle(newWidth, this.height);
    }
}
```
*Figyeld meg: a konstruktor validálja a paramétereket, így az objektum soha nem kerülhet érvénytelen állapotba.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Default konstruktor mindig elég" → Explicit validáció nélkül érvénytelen objektum jöhet létre
- „Setter metódusokkal minden módosítható" → Immutable objektumok gyakran jobbak
- „Null objektum is valid" → Null Object pattern vagy Optional használat jobb

</div>
</details>

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Performance corner</strong></summary>

<div>

- **Immutable objects**: thread-safe, cache-friendly, GC optimalizált
- **Factory methods**: object pooling lehetősége
- **Validation cost**: konstruktor szintű ellenőrzés egyszeri költség

</div>
</details>

</div>

<div class="concept-section tools">

<details>
<summary>🧰 <strong>Kapcsolódó eszközök</strong></summary>

<div>

`Objects.requireNonNull()`, `@NonNull` annotations, `Optional`, `Builder pattern`, `Factory methods`

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) Mikor használj factory method-ot konstruktor helyett?
<details><summary>Válasz mutatása</summary>
Ha komplexebb objektum létrehozási logika van, vagy ha különböző névvel akarod jelölni a létrehozási módokat (pl. Rectangle.square()).
</details>

2) Mi az object invariant?
<details><summary>Válasz mutatása</summary>
Olyan feltétel, amely az objektum teljes életciklusa során igaz marad (pl. pozitív oldalhossz egy Rectangle-nél).
</details>

3) Mikor preferálj immutable objektumokat?
<details><summary>Válasz mutatása</summary>
Value objects esetén, thread-safety igényekor, vagy amikor az objektum identity-je nem számít.
</details>

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Object invariants magyarázata és példa adása
- Immutable vs mutable objektumok trade-off-jai
- Factory pattern vs konstruktor előnyeinek ismerete

</div>
</details>

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">junior</span>
<span class="tag">object-lifecycle</span>
<span class="tag">invariants</span>
</div>

<!-- tags: oop, junior, object-lifecycle, invariants -->

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Factory Pattern` · `Builder Pattern` · `Immutability` · `Validation` · `Design by Contract`

</div>

### Cohesion & Coupling {#cohesion-coupling}

<div class="concept-section mental-model">

📋 **Fogalom meghatározása**  
*Cohesion (kohézió) azt méri, mennyire összefüggőek egy osztály elemei (metódusok, mezők): high cohesion = szorosan kapcsolódó felelősségek, low cohesion = sok különböző feladat. Coupling (kapcsoltság) az osztályok közötti függőséget mutatja: tight coupling = szoros függés konkrét implementációtól, loose coupling = független komponensek interface-eken keresztül. Cél: magas kohézió, alacsony kapcsoltság (high cohesion, low coupling).*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Karbantarthatóság**: magas kohézió könnyíti a megértést
- **Flexibilitás**: alacsony kapcsoltság lehetővé teszi a független változtatást
- **Teszthetőség**: gyengén kapcsolt komponensek könnyebben mockolhatók

</div>

A kohézió azt mutatja, mennyire összetartoznak egy osztály elemei. A kapcsoltság azt, mennyire függnek egymástól különböző osztályok.

<div class="runnable-model">

**Runnable mental model**
```java
// ROSSZ - Low Cohesion (sok különböző felelősség)
class EmployeeManager {
    public void calculateSalary(Employee emp) { /* ... */ }
    public void sendEmail(String to, String msg) { /* ... */ }
    public void saveToDatabase(Object obj) { /* ... */ }
    public void generateReport() { /* ... */ }
}

// JÓ - High Cohesion (egy felelősség)
class SalaryCalculator {
    private TaxPolicy taxPolicy;
    private BonusPolicy bonusPolicy;
    
    public Money calculateGrossSalary(Employee employee) {
        Money base = employee.getBaseSalary();
        Money bonus = bonusPolicy.calculateBonus(employee);
        return base.add(bonus);
    }
    
    public Money calculateNetSalary(Employee employee) {
        Money gross = calculateGrossSalary(employee);
        Money tax = taxPolicy.calculateTax(gross);
        return gross.subtract(tax);
    }
}

// ROSSZ - Tight Coupling
class OrderService {
    public void processOrder(Order order) {
        EmailService emailService = new EmailService(); // direct dependency
        emailService.sendConfirmation(order.getCustomerEmail());
    }
}

// JÓ - Loose Coupling
class OrderService {
    private final NotificationService notificationService;
    
    public OrderService(NotificationService notificationService) {
        this.notificationService = notificationService; // dependency injection
    }
    
    public void processOrder(Order order) {
        notificationService.sendNotification("Order confirmed");
    }
}
```
*Figyeld meg: a SalaryCalculator csak fizetés számítással foglalkozik (magas kohézió), az OrderService nem függ konkrét implementációtól (alacsony kapcsoltság).*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Egy osztályban minden együtt legyen" → Túl sok felelősség alacsony kohéziót eredményez
- „Dependency injection túl bonyolult" → Modern framework-ök egyszerűvé teszik
- „Performance-ért érdemes tight coupling" → Premature optimization anti-pattern

</div>
</details>

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Performance tippek</strong></summary>

<div>

- **High cohesion**: jobb code locality, CPU cache hatékonyság
- **Loose coupling**: könnyebb optimalizáció, independent scaling
- **Interface overhead**: modern JVM-ek jól optimalizálják

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) Hogyan méred a cohesion-t egy osztályban?
<details><summary>Válasz mutatása</summary>
LCOM (Lack of Cohesion of Methods) metrika, vagy egyszerűen: használnak-e a metódusok közös mezőket?
</details>

2) Mi a különbség afferent és efferent coupling között?
<details><summary>Válasz mutatása</summary>
Afferent: hány osztály függ tőlem. Efferent: hány osztálytól függök én. Jó ha alacsony efferent, magas afferent.
</details>

3) Mikor megengedett a tight coupling?
<details><summary>Válasz mutatása</summary>
Ugyanazon komponensen belül, value object-ek között, vagy performance-kritikus kódban.
</details>

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Konkrét példa adása high/low cohesion-ra
- Coupling típusok felsorolása (data, stamp, control, external, common, content)
- Dependency injection előnyeinek magyarázata

</div>
</details>

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">junior</span>
<span class="tag">cohesion</span>
<span class="tag">coupling</span>
<span class="tag">maintainability</span>
</div>

<!-- tags: oop, junior, cohesion, coupling, maintainability -->

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Single Responsibility` · `Dependency Injection` · `Interface Segregation` · `GRASP Principles` · `Code Metrics`

</div>

### Law of Demeter {#law-of-demeter}

<div class="concept-section mental-model">

📋 **Fogalom meghatározása**  
*A Law of Demeter (LoD) vagy Principle of Least Knowledge olyan tervezési irányelv, amely szerint egy objektum csak közvetlen "barátaival" kommunikálhat: saját mezők, metódus paraméterek, lokálisan létrehozott objektumok, this objektum. Tiltja a method chaining-et (a.getB().getC().doSomething()), mert így az osztály függ a belső struktúrától. Csökkenti a coupling-ot és növeli az encapsulation-t.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Loose coupling**: kevesebb függőség más objektumok belső struktúrájától
- **Refactoring safety**: belső változások nem törnek el távoli kódot
- **Readability**: rövidebb, érthetőbb method call chain-ek

</div>

Egy objektum csak a közvetlen "barátaival" kommunikáljon: saját mezők, paraméterek, létrehozott objektumok.

<div class="runnable-model">

**Runnable mental model**
```java
// ROSSZ - Law of Demeter megsértése
class Customer {
    public void makePayment() {
        wallet.getCard().getAccount().withdraw(amount); // chain calls
        // Ez azt jelenti, hogy Customer ismer: Wallet -> Card -> Account struktúrát
    }
}

// JÓ - Law of Demeter betartása
class Customer {
    private Wallet wallet;
    
    public void makePayment(Money amount) {
        wallet.pay(amount); // csak közvetlen baráttal beszélek
    }
}

class Wallet {
    private Card card;
    
    public void pay(Money amount) {
        card.charge(amount); // Wallet-en belül OK a Card használata
    }
}

class Card {
    private Account account;
    
    public void charge(Money amount) {
        account.withdraw(amount); // Card-on belül OK az Account használata
    }
}

// Példa "barátokra"
class OrderProcessor {
    private Logger logger; // field - barát
    
    public void processOrder(Order order, Customer customer) { // paraméter - barát
        PaymentResult result = new PaymentResult(); // létrehozott - barát
        
        // Ezek MIND OK a Law of Demeter szerint:
        logger.info("Processing order"); // field
        customer.makePayment(order.getTotal()); // paraméter
        result.setStatus(SUCCESS); // létrehozott
        order.markAsPaid(); // paraméter
    }
}
```
*Figyeld meg: minden objektum csak a közvetlen szomszédjaival kommunikál, nem láncolja a hívásokat.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Soha ne hívj method-ot method eredményén" → Fluent API-k (builder) kivételek
- „Getter chain-ek mindig rosszak" → Value object-ek között megengedettek
- „Performance-t ront" → Modern JVM-ek inline-olják a hívásokat

</div>
</details>

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Performance tippek</strong></summary>

<div>

- **Method inlining**: modern JVM-ek optimalizálják a rövid method call-okat
- **Object creation**: delegation pattern több objektum, de jobb structure
- **Cache locality**: kevesebb indirection jobb memory access pattern

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) Mikor megengedett a method chaining?
<details><summary>Válasz mutatása</summary>
Fluent API-knál (builder pattern), ugyanazon objektumon belül, vagy value object-ek esetén.
</details>

2) Mi a "Tell, Don't Ask" principle kapcsolata a LoD-dal?
<details><summary>Válasz mutatása</summary>
Mindkettő az encapsulation erősítéséről szól: ne kérdezd meg az állapotot, hanem mondd meg, mit csináljon.
</details>

3) Hogyan refaktorálj LoD megsértést?
<details><summary>Válasz mutatása</summary>
Delegation pattern: add hozzá wrapper method-okat, amik elrejtik a belső struktúrát.
</details>

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- LoD "barátok" pontos definíciója (field, parameter, local variable, created object)
- Fluent API exception magyarázata
- Tell Don't Ask principle kapcsolata

</div>
</details>

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">junior</span>
<span class="tag">lod</span>
<span class="tag">coupling</span>
<span class="tag">encapsulation</span>
</div>

<!-- tags: oop, junior, lod, coupling, encapsulation -->

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Encapsulation` · `Tell Don't Ask` · `Delegation Pattern` · `Loose Coupling` · `Interface Design`

</div>

### Value Object vs Entity {#value-object-entity}

<div class="concept-section mental-model">

📋 **Fogalom meghatározása**  
*Value Object olyan objektum, amely értéke alapján egyenlő (equals() minden mezőt figyelembe vesz), általában immutable, nincs identity-je. Entity olyan objektum, amely identity alapján egyenlő (equals() csak ID-t néz), mutable lehet, lifecycle management szükséges. Domain-Driven Design központi fogalmai: Value Object = Money, Address, DateRange; Entity = Customer, Order, Account. Különbség az egyenlőség szemantikában, hashCode implementációban és persistence strategy-ben.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Identity management**: mikor számít az azonosság vs érték
- **Equality semantics**: equals/hashCode helyes implementálása
- **Performance**: value object-ek immutable-ök, cache-friendly-k

</div>

Value Object értéke alapján egyenlő, Entity identity alapján. Ez határozza meg az equals(), hashCode() és lifecycle kezelést.

<div class="runnable-model">

**Runnable mental model**
```java
// VALUE OBJECT - érték alapú egyenlőség
public class Money {
    private final BigDecimal amount;
    private final Currency currency;
    
    public Money(BigDecimal amount, Currency currency) {
        this.amount = Objects.requireNonNull(amount);
        this.currency = Objects.requireNonNull(currency);
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Money)) return false;
        Money other = (Money) obj;
        return Objects.equals(amount, other.amount) && 
               Objects.equals(currency, other.currency);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(amount, currency);
    }
    
    // Immutable operation
    public Money add(Money other) {
        if (!currency.equals(other.currency)) {
            throw new IllegalArgumentException("Different currencies");
        }
        return new Money(amount.add(other.amount), currency);
    }
}

// ENTITY - identity alapú egyenlőség
public class Customer {
    private final UUID id;        // Identity field
    private String name;          // Mutable state
    private String email;
    
    public Customer(UUID id, String name, String email) {
        this.id = Objects.requireNonNull(id);
        this.name = name;
        this.email = email;
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Customer)) return false;
        Customer other = (Customer) obj;
        return Objects.equals(id, other.id); // Csak ID számít!
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(id); // Csak ID alapján
    }
    
    // Mutable operations OK for entities
    public void updateEmail(String newEmail) {
        this.email = newEmail;
    }
}

// Használat
Money hundred1 = new Money(new BigDecimal("100"), Currency.getInstance("HUF"));
Money hundred2 = new Money(new BigDecimal("100"), Currency.getInstance("HUF"));
System.out.println(hundred1.equals(hundred2)); // true - same value

Customer john1 = new Customer(UUID.randomUUID(), "John", "john@email.com");
Customer john2 = new Customer(UUID.randomUUID(), "John", "john@email.com");
System.out.println(john1.equals(john2)); // false - different identity
```
*Figyeld meg: Money objektumok értékük alapján egyenlők, Customer objektumok csak azonos ID esetén.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Entity mindig database table" → Domain fogalom, nem persistence
- „Value object nem tartalmazhat mutable field-eket" → Lehet, de equals nem használhatja őket
- „ID nélküli objektum value object" → Entity lehet generated ID-vel is

</div>
</details>

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Performance tippek</strong></summary>

<div>

- **Value objects**: immutable, thread-safe, HashMap kulcsként használhatók
- **Entity caching**: ID alapján cache-elhető, state change esetén invalidálás
- **equals/hashCode**: entity ID hash gyors, value object field hash költségesebb lehet

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) Mikor entity és mikor value object egy Address?
<details><summary>Válasz mutatása</summary>
Ha tracking kell (ki mikor költözött) → Entity. Ha csak címként használod → Value Object.
</details>

2) Miért immutable a legtöbb value object?
<details><summary>Válasz mutatása</summary>
Thread safety, hash consistency, side-effect mentes operations.
</details>

3) Lehet-e egy entity value object-et tartalmazni?
<details><summary>Válasz mutatása</summary>
Igen, gyakran. Pl. Customer entity tartalmaz Money value object-et.
</details>

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- equals/hashCode contract magyarázata (symmetric, transitive, consistent)
- DDD context-ben entity vs value object példák
- HashMap kulcsként való használhatóság feltételei

</div>
</details>

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">junior</span>
<span class="tag">value-object</span>
<span class="tag">entity</span>
<span class="tag">identity</span>
</div>

<!-- tags: oop, junior, value-object, entity, identity -->

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Immutability` · `Equals HashCode` · `Domain Driven Design` · `Identity Patterns` · `Caching`

</div>

### Access Modifiers & Visibility {#access-modifiers}

<div class="concept-section mental-model">

📋 **Fogalom meghatározása**  
*Access modifiers (hozzáférési módosítók) szabályozzák az encapsulation-t Java-ban: private (csak osztályon belül), package-private/default (package-en belül), protected (package + leszármazottak), public (minden osztály). Határozzák meg az API surface area-t és a módosíthatóság hatókörét. Private mezők + public getter/setter = kontrollált hozzáférés. Protected template method pattern-ben vagy öröklődési hierarchiában hasznos.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Encapsulation control**: pontosan szabályozod, ki mit érhet el
- **API design**: világos interfészt biztosítasz klienseknek
- **Refactoring safety**: private változtatások nem törnek el külső kódot

</div>

Java-ban négy szintű láthatóság van, amelyek meghatározzák, mely osztályok férhetnek hozzá az adott elemhez.

<div class="runnable-model">

**Runnable mental model**
```java
package com.example.finance;

public class BankAccount {
    // PRIVATE - csak ezen osztályon belül
    private double balance;
    private String accountNumber;
    
    // PACKAGE-PRIVATE (default) - csak ugyanabban a package-ben
    String internalCode;
    
    // PROTECTED - package + leszármazottak
    protected void validateTransaction(double amount) {
        if (amount < 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
    }
    
    // PUBLIC - minden osztály számára
    public void deposit(double amount) {
        validateTransaction(amount);    // protected metódus hívása
        this.balance += amount;         // private field hozzáférés
        updateInternalCode();           // package-private metódus hívása
    }
    
    public double getBalance() {
        return balance; // Kontrollált hozzáférés private field-hez
    }
    
    // Package-private helper
    void updateInternalCode() {
        this.internalCode = "ACC_" + System.currentTimeMillis();
    }
}

// Leszármazott osztály - akár más package-ben is
package com.example.banking;
import com.example.finance.BankAccount;

public class SavingsAccount extends BankAccount {
    private double interestRate;
    
    public void addInterest() {
        // Protected metódus elérhető leszármazottban
        validateTransaction(100); // OK
        
        // Private field NEM elérhető!
        // this.balance += interest; // COMPILE ERROR
        
        // Public interface használata
        deposit(calculateInterest()); // OK
    }
    
    private double calculateInterest() {
        return getBalance() * interestRate; // Public getter
    }
}

// Külső osztály - csak public interface
package com.example.client;
import com.example.finance.BankAccount;

public class BankingApp {
    public void processPayment() {
        BankAccount account = new BankAccount();
        
        // PUBLIC - OK
        account.deposit(1000);
        double balance = account.getBalance();
        
        // PRIVATE - COMPILE ERROR
        // account.balance = 500; // ERROR
        // account.accountNumber = "123"; // ERROR
        
        // PROTECTED - COMPILE ERROR (nem leszármazott)
        // account.validateTransaction(100); // ERROR
        
        // PACKAGE-PRIVATE - COMPILE ERROR (más package)
        // account.internalCode = "test"; // ERROR
    }
}
```
*Figyeld meg: minden access modifier különböző szintű hozzáférést biztosít, így kontrollálható az encapsulation.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Protected = private + inheritance" → Package-ben is elérhető, nem csak leszármazottakban
- „Package-private ritkán hasznos" → Nagyon jó internal API-khoz
- „Mindig private legyen minden" → Néha protected/package indokolt

</div>
</details>

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Performance tippek</strong></summary>

<div>

- **JVM optimization**: private metódusokat könnyebben inline-olja
- **Access checks**: runtime-ban nincs overhead, compile-time check
- **Package structure**: jó package design segíti a JVM optimalizációkat

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) Mi a package-private hasznossága?
<details><summary>Válasz mutatása</summary>
Ugyanazon package osztályai közötti szoros együttműködés, API belső részleteinek elrejtése külső package-ektől.
</details>

2) Mikor használj protected-et?
<details><summary>Válasz mutatása</summary>
Template method pattern-ben, vagy amikor a leszármazottaknak hozzá kell férniük belső állapothoz.
</details>

3) Reflection megkerüli az access modifier-eket?
<details><summary>Válasz mutatása</summary>
Igen, de SecurityManager korlátozhatja, és code smell, ha production kódban használod.
</details>

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Négy access level pontos definíciója
- Protected vs package-private különbség
- Access modifier-ek és inheritance kapcsolata

</div>
</details>

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">junior</span>
<span class="tag">access-modifiers</span>
<span class="tag">encapsulation</span>
<span class="tag">visibility</span>
</div>

<!-- tags: oop, junior, access-modifiers, encapsulation, visibility -->

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Encapsulation` · `Package Design` · `API Design` · `Inheritance` · `Information Hiding`

</div>

<div class="concept-section mental-model">

📋 **Fogalom meghatározása**  
*Inheritance (öröklődés) "is-a" kapcsolat, ahol leszármazott osztály szülő tulajdonságait és viselkedését örökli, code reuse és polimorfizmus céljából. Composition (kompozíció) "has-a" kapcsolat, ahol objektum másik objektumokat tartalmaz mezőként, delegációval valósítja meg a funkcionalitást. "Favor composition over inheritance" elv: rugalmasabb, kevésbé szoros kapcsolat, elkerüli a diamond problem-et és a fragile base class problem-et.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Rugalmasság**: composition runtime-ban változtatható
- **Loose coupling**: kevésbé szoros kapcsolat az objektumok között
- **Multiple inheritance**: composition-nal megkerülhető a diamond problem

</div>

Két alapvető módja az objektumok közötti kapcsolatok kialakításának.

<div class="runnable-model">

**Runnable mental model**
```java
// INHERITANCE példa
abstract class Vehicle {
    protected String brand;
    public abstract void start();
}

class Car extends Vehicle {
    public void start() {
        System.out.println("Car engine starting...");
    }
}

// COMPOSITION példa
class Engine {
    private boolean running = false;
    
    public void start() {
        running = true;
        System.out.println("Engine started");
    }
    
    public void stop() {
        running = false;
        System.out.println("Engine stopped");
    }
}

class GPS {
    public String getRoute(String destination) {
        return "Route to " + destination;
    }
}

class Car {
    private Engine engine;      // HAS-A kapcsolat
    private GPS gps;           // HAS-A kapcsolat
    private String brand;
    
    public Car(String brand) {
        this.brand = brand;
        this.engine = new Engine();
        this.gps = new GPS();
    }
    
    public void start() {
        engine.start();        // Delegálás
    }
    
    public void navigate(String destination) {
        String route = gps.getRoute(destination);
        System.out.println("Following: " + route);
    }
}
```
*Figyeld meg: composition esetén a Car "használja" az Engine-t és GPS-t, míg inheritance esetén "típusa" lenne a Vehicle-nek.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Inheritance mindig rossz" → Van helye, de composition often better
- „Composition mindig jobb" → Valódi is-a kapcsolatoknál inheritance természetes
- „Composition lassabb" → Modern JVM-ek jól optimalizálják

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) Mikor használj inheritance vs composition?
<details><summary>Válasz mutatása</summary>
Inheritance: valódi "is-a" kapcsolat, közös viselkedés. Composition: "has-a" kapcsolat, funkció újrafelhasználás.
</details>

2) Mi a "favor composition over inheritance" elv?
<details><summary>Válasz mutatása</summary>
Inkább építs objektumokat kisebb komponensekből (composition), mint hogy mély öröklési hierarchiákat hozz létre.
</details>

3) Hogyan kerülhető el a "diamond problem"?
<details><summary>Válasz mutatása</summary>
Composition használatával, vagy interface-ekkel (ahol default metódusok explicit feloldhatják a konfliktust).
</details>

</div>
</details>

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">junior</span>
<span class="tag">composition</span>
<span class="tag">inheritance</span>
<span class="tag">design-choice</span>
</div>

<!-- tags: oop, junior, composition, inheritance, design-choice -->

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Aggregation` · `Association` · `Delegation` · `Mixin Pattern` · `Strategy Pattern`

</div>

### Interface vs Abstract Class {#interface-vs-abstract-class}

<div class="concept-section mental-model">

📋 **Fogalom meghatározása**  
*Interface tiszta szerződés (contract): metódus szignatúrák (Java 8+ óta default és static implementációkkal), nincs állapot, multiple implementálható. Abstract class részben implementált osztály: abstract metódusok + konkrét metódusok + mezők, single inheritance. Interface: "mit csináljon" definíció, loose coupling. Abstract class: közös implementáció + template method pattern, code reuse. Java 8+ interface default method-ok csökkentették a különbséget.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Multiple inheritance**: interface-ekkel több "szerződés" implementálható
- **Contract definition**: interface tiszta szerződést definiál
- **Code reuse**: abstract class közös implementációt biztosít

</div>

Két különböző módja az absztrakció megvalósításának, különböző célokkal és lehetőségekkel.

<div class="runnable-model">

**Runnable mental model**
```java
// INTERFACE - tiszta szerződés
public interface Drawable {
    void draw();                    // abstract metódus
    void setColor(String color);    // abstract metódus
    
    // Java 8+ default metódus
    default void highlight() {
        System.out.println("Highlighting...");
    }
    
    // static metódus
    static void printVersion() {
        System.out.println("Drawable v1.0");
    }
}

public interface Clickable {
    void onClick();
}

// ABSTRACT CLASS - részben implementált
public abstract class UIComponent {
    protected int x, y, width, height;    // közös mezők
    protected boolean visible = true;
    
    // közös implementáció
    public void setPosition(int x, int y) {
        this.x = x;
        this.y = y;
    }
    
    public void setVisible(boolean visible) {
        this.visible = visible;
    }
    
    // abstract metódusok - kötelező implementálni
    public abstract void render();
    public abstract void handleInput();
    
    // template method
    public final void update() {
        if (visible) {
            handleInput();
            render();
        }
    }
}

// Implementáció - multiple interface, single abstract class
public class Button extends UIComponent implements Drawable, Clickable {
    private String text;
    private String color = "gray";
    
    public Button(String text) {
        this.text = text;
    }
    
    // Abstract class kötelező metódusai
    @Override
    public void render() {
        System.out.println("Button rendered: " + text);
    }
    
    @Override
    public void handleInput() {
        System.out.println("Button checking for clicks");
    }
    
    // Interface implementációk
    @Override
    public void draw() {
        System.out.println("Drawing button with color: " + color);
    }
    
    @Override
    public void setColor(String color) {
        this.color = color;
    }
    
    @Override
    public void onClick() {
        System.out.println("Button clicked: " + text);
    }
}
```
*Figyeld meg: az interface csak "mit", az abstract class "mit és részben hogyan" definiál.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Interface nem tartalmazhat implementációt" → Java 8+ default és static metódusok
- „Abstract class mindig jobb" → Interface gyakran tisztább design
- „Nem lehet egyszerre interface és abstract class" → Lehet kombinálni őket

</div>
</details>

</div>

<div class="version-badges">
<span class="version-badge">Java 8</span>
<span class="version-badge">Default Methods</span>
<span class="version-badge">Java 9</span>
<span class="version-badge">Private Methods</span>
</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Interface vs abstract class mikor melyiket választani
- Java 8+ interface újdonságok (default, static methods)
- Diamond problem interface-ekkel

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Multiple Inheritance` · `Default Methods` · `Template Method` · `Contract Design` · `API Design`

</div>

### Design Patterns - Part 1: Creational (Singleton, Factory, Builder) {#design-patterns-creational}

<div class="concept-section definition">

📋 **Fogalom meghatározása**

**Design Patterns** = **Bevált megoldási minták** gyakori szoftvertervezési problémákra (Gang of Four könyv, 1994)

**23 GoF pattern, 3 kategória**:
1. **Creational** (objektum létrehozás): Singleton, Factory, Abstract Factory, Builder, Prototype
2. **Structural** (objektum összeállítás): Adapter, Decorator, Proxy, Facade, Composite, Bridge, Flyweight
3. **Behavioral** (objektum interakció): Strategy, Observer, Command, State, Template Method, Iterator, Visitor, Mediator, Chain of Responsibility, Memento, Interpreter

**Part 1 fókusz: Creational Patterns** (objektum létrehozás kontrollja)

**Singleton Pattern**:
```
Problem: Csak EGY instance legyen egy osztályból (pl. DB connection pool)
Solution: Private constructor + static getInstance() method

Key points:
- Global access point (getInstance())
- Lazy initialization (only create when needed)
- Thread-safe (double-checked locking)
- Spring @Bean default scope = singleton
```

**Factory Pattern**:
```
Problem: Objektum létrehozás logika összetett/változó (pl. Shape factory)
Solution: Factory method/class encapsulálja creation logic

Key points:
- Client nem tudja a konkrét class-t (csak interface-t)
- Factory decides which subclass to instantiate
- Open/Closed principle (új type = új factory case)
- Spring BeanFactory uses this pattern
```

**Builder Pattern**:
```
Problem: Sok opcionális paraméterű objektum (pl. HTTP request builder)
Solution: Fluent API with method chaining

Key points:
- Step-by-step construction (readable)
- Immutable result object
- No telescoping constructors (constructor with 10 params)
- Lombok @Builder generates this pattern
```

</div>

<div class="concept-section why-matters">

💡 **Miért számít a Creational Patterns ismerete?**

**1. Singleton: Global state management**
```java
// Without Singleton: Multiple DB connection pools (wasteful!)
public class OrderService {
    private ConnectionPool pool = new ConnectionPool();  // 10 connections
}

public class UserService {
    private ConnectionPool pool = new ConnectionPool();  // 10 more connections!
}
// → 20 DB connections wasted (only need 10 shared)

// With Singleton: Shared connection pool
public class ConnectionPool {
    private static volatile ConnectionPool instance;
    
    private ConnectionPool() {
        // Initialize 10 connections
    }
    
    public static ConnectionPool getInstance() {
        if (instance == null) {
            synchronized (ConnectionPool.class) {
                if (instance == null) {
                    instance = new ConnectionPool();
                }
            }
        }
        return instance;
    }
}

public class OrderService {
    private ConnectionPool pool = ConnectionPool.getInstance();  // Shared
}

public class UserService {
    private ConnectionPool pool = ConnectionPool.getInstance();  // Same instance!
}
// → 10 connections total (50% resource savings)

// Real-world: Spring singleton beans
@Configuration
public class AppConfig {
    @Bean  // Default scope = singleton (one instance per Spring container)
    public DataSource dataSource() {
        return new HikariDataSource();
    }
}
```

**2. Factory: Decouple client from concrete classes**
```java
// Without Factory: Client knows all concrete classes
public class PaymentProcessor {
    public void process(String type, double amount) {
        if (type.equals("credit")) {
            CreditCardPayment payment = new CreditCardPayment();  // Tight coupling!
            payment.pay(amount);
        } else if (type.equals("paypal")) {
            PayPalPayment payment = new PayPalPayment();  // Tight coupling!
            payment.pay(amount);
        }
        // Add Bitcoin → modify this class (Open/Closed violation)
    }
}

// With Factory: Client only knows PaymentMethod interface
public interface PaymentMethod {
    void pay(double amount);
}

public class PaymentFactory {
    public static PaymentMethod createPayment(String type) {
        switch (type) {
            case "credit": return new CreditCardPayment();
            case "paypal": return new PayPalPayment();
            case "bitcoin": return new BitcoinPayment();  // Easy to add!
            default: throw new IllegalArgumentException("Unknown type: " + type);
        }
    }
}

public class PaymentProcessor {
    public void process(String type, double amount) {
        PaymentMethod payment = PaymentFactory.createPayment(type);
        payment.pay(amount);  // Polymorphism!
    }
}
// → Add Bitcoin: only touch PaymentFactory (Open/Closed compliance)

// Real-world: Spring FactoryBean
@Component
public class PaymentFactoryBean implements FactoryBean<PaymentMethod> {
    @Value("${payment.provider}")
    private String provider;
    
    @Override
    public PaymentMethod getObject() {
        return PaymentFactory.createPayment(provider);  // Factory pattern
    }
}
```

**3. Builder: Readable object construction**
```java
// Without Builder: Telescoping constructors (unreadable!)
public class HttpRequest {
    public HttpRequest(String url) { /* ... */ }
    public HttpRequest(String url, String method) { /* ... */ }
    public HttpRequest(String url, String method, Map<String, String> headers) { /* ... */ }
    public HttpRequest(String url, String method, Map<String, String> headers, String body) { /* ... */ }
    public HttpRequest(String url, String method, Map<String, String> headers, String body, int timeout) { /* ... */ }
    // 5 constructors! (constructor hell)
}

// Usage (what does "true" mean?):
HttpRequest request = new HttpRequest("https://api.example.com", "POST", headers, body, 5000);
// → Hard to read, easy to mix up parameters

// With Builder: Fluent API (self-documenting!)
public class HttpRequest {
    private final String url;
    private final String method;
    private final Map<String, String> headers;
    private final String body;
    private final int timeout;
    
    private HttpRequest(Builder builder) {
        this.url = builder.url;
        this.method = builder.method;
        this.headers = builder.headers;
        this.body = builder.body;
        this.timeout = builder.timeout;
    }
    
    public static class Builder {
        private String url;
        private String method = "GET";
        private Map<String, String> headers = new HashMap<>();
        private String body;
        private int timeout = 30000;
        
        public Builder url(String url) {
            this.url = url;
            return this;
        }
        
        public Builder method(String method) {
            this.method = method;
            return this;
        }
        
        public Builder header(String key, String value) {
            this.headers.put(key, value);
            return this;
        }
        
        public Builder body(String body) {
            this.body = body;
            return this;
        }
        
        public Builder timeout(int timeout) {
            this.timeout = timeout;
            return this;
        }
        
        public HttpRequest build() {
            if (url == null) throw new IllegalStateException("URL required");
            return new HttpRequest(this);
        }
    }
}

// Usage (readable, self-documenting!):
HttpRequest request = new HttpRequest.Builder()
    .url("https://api.example.com")
    .method("POST")
    .header("Content-Type", "application/json")
    .header("Authorization", "Bearer token123")
    .body("{\"name\": \"John\"}")
    .timeout(5000)
    .build();
// → Every parameter labeled, impossible to mix up

// Real-world: Lombok @Builder
@Builder
public class User {
    private String username;
    private String email;
    private String phone;
    private Address address;
}

User user = User.builder()
    .username("john")
    .email("john@example.com")
    .phone("+1234567890")
    .build();
```

**4. Industry adoption (patterns everywhere)**
```
Singleton:
- Spring @Bean default scope (99% of Spring apps)
- java.lang.Runtime.getRuntime()
- java.awt.Desktop.getDesktop()

Factory:
- Spring BeanFactory, ApplicationContext
- java.util.Calendar.getInstance()
- java.nio.charset.Charset.forName()
- JDBC DriverManager.getConnection()

Builder:
- StringBuilder, StringBuffer
- Lombok @Builder (80% of Java projects use Lombok)
- OkHttp HttpClient.Builder()
- Retrofit Builder pattern
- Java Stream API (Stream.builder())

→ Understanding patterns = understanding frameworks
```

</div>

<div class="concept-section runnable-model">

🚀 **Runnable Mental Model**

**1. Singleton Pattern - Database Connection Pool**

```java
// ❌ ROSSZ: Naive singleton (not thread-safe)
public class ConnectionPool {
    private static ConnectionPool instance;
    
    private ConnectionPool() {
        System.out.println("Creating connection pool...");
    }
    
    public static ConnectionPool getInstance() {
        if (instance == null) {
            instance = new ConnectionPool();  // Race condition!
        }
        return instance;
    }
}

// Problem: Thread race condition
Thread 1: if (instance == null) → true
Thread 2: if (instance == null) → true
Thread 1: instance = new ConnectionPool() → instance #1
Thread 2: instance = new ConnectionPool() → instance #2 (overwrites #1!)
→ Two instances created (Singleton violated!)
```

```java
// ✅ JÓ: Thread-safe singleton (double-checked locking)
public class ConnectionPool {
    // volatile prevents reordering (JVM optimization)
    private static volatile ConnectionPool instance;
    
    private final List<Connection> connections;
    
    private ConnectionPool() {
        System.out.println("Creating connection pool...");
        connections = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            connections.add(createConnection());
        }
    }
    
    public static ConnectionPool getInstance() {
        if (instance == null) {  // First check (no locking, fast)
            synchronized (ConnectionPool.class) {  // Lock only if null
                if (instance == null) {  // Second check (inside lock)
                    instance = new ConnectionPool();
                }
            }
        }
        return instance;
    }
    
    public Connection getConnection() {
        if (connections.isEmpty()) {
            throw new RuntimeException("No connections available");
        }
        return connections.remove(0);
    }
    
    public void releaseConnection(Connection conn) {
        connections.add(conn);
    }
    
    private Connection createConnection() {
        // Mock connection
        return new Connection("jdbc:postgresql://localhost:5432/mydb");
    }
}

// Usage:
public class OrderService {
    public void createOrder(Order order) {
        ConnectionPool pool = ConnectionPool.getInstance();  // Same instance
        Connection conn = pool.getConnection();
        try {
            // Use connection...
        } finally {
            pool.releaseConnection(conn);
        }
    }
}

public class UserService {
    public void createUser(User user) {
        ConnectionPool pool = ConnectionPool.getInstance();  // Same instance!
        Connection conn = pool.getConnection();
        try {
            // Use connection...
        } finally {
            pool.releaseConnection(conn);
        }
    }
}

// Verify singleton:
ConnectionPool pool1 = ConnectionPool.getInstance();
ConnectionPool pool2 = ConnectionPool.getInstance();
System.out.println(pool1 == pool2);  // true (same instance)
```

```java
// ⭐ BEST: Enum singleton (Joshua Bloch recommendation)
public enum ConnectionPool {
    INSTANCE;
    
    private final List<Connection> connections;
    
    ConnectionPool() {
        System.out.println("Creating connection pool...");
        connections = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            connections.add(createConnection());
        }
    }
    
    public Connection getConnection() {
        if (connections.isEmpty()) {
            throw new RuntimeException("No connections available");
        }
        return connections.remove(0);
    }
    
    public void releaseConnection(Connection conn) {
        connections.add(conn);
    }
    
    private Connection createConnection() {
        return new Connection("jdbc:postgresql://localhost:5432/mydb");
    }
}

// Usage (simplest):
Connection conn = ConnectionPool.INSTANCE.getConnection();

// Why enum singleton best?
// 1. Thread-safe by default (JVM guarantees)
// 2. Serialization-safe (prevents multiple instances)
// 3. Reflection-proof (can't invoke constructor)
// 4. Simplest code (no volatile, no synchronized)
```

**2. Factory Pattern - Payment Processing**

```java
// Payment interface
public interface PaymentMethod {
    void pay(double amount);
    String getDescription();
}

// Concrete implementations
public class CreditCardPayment implements PaymentMethod {
    private String cardNumber;
    private String cvv;
    
    public CreditCardPayment(String cardNumber, String cvv) {
        this.cardNumber = cardNumber;
        this.cvv = cvv;
    }
    
    @Override
    public void pay(double amount) {
        System.out.println("Charging $" + amount + " to credit card " + maskCardNumber());
        // Stripe API call...
    }
    
    @Override
    public String getDescription() {
        return "Credit Card ending in " + cardNumber.substring(cardNumber.length() - 4);
    }
    
    private String maskCardNumber() {
        return "**** **** **** " + cardNumber.substring(cardNumber.length() - 4);
    }
}

public class PayPalPayment implements PaymentMethod {
    private String email;
    
    public PayPalPayment(String email) {
        this.email = email;
    }
    
    @Override
    public void pay(double amount) {
        System.out.println("Sending $" + amount + " via PayPal to " + email);
        // PayPal API call...
    }
    
    @Override
    public String getDescription() {
        return "PayPal account: " + email;
    }
}

public class BitcoinPayment implements PaymentMethod {
    private String walletAddress;
    
    public BitcoinPayment(String walletAddress) {
        this.walletAddress = walletAddress;
    }
    
    @Override
    public void pay(double amount) {
        System.out.println("Sending $" + amount + " in BTC to wallet " + walletAddress);
        // Coinbase API call...
    }
    
    @Override
    public String getDescription() {
        return "Bitcoin wallet: " + walletAddress;
    }
}

// Factory (encapsulates creation logic)
public class PaymentFactory {
    public static PaymentMethod createPayment(String type, Map<String, String> params) {
        switch (type.toLowerCase()) {
            case "credit":
                return new CreditCardPayment(
                    params.get("cardNumber"),
                    params.get("cvv")
                );
            
            case "paypal":
                return new PayPalPayment(params.get("email"));
            
            case "bitcoin":
                return new BitcoinPayment(params.get("walletAddress"));
            
            default:
                throw new IllegalArgumentException("Unknown payment type: " + type);
        }
    }
}

// Client code (decoupled from concrete classes)
public class CheckoutService {
    public void processPayment(String paymentType, Map<String, String> paymentParams, double amount) {
        // Factory creates appropriate payment method
        PaymentMethod payment = PaymentFactory.createPayment(paymentType, paymentParams);
        
        System.out.println("Processing payment: " + payment.getDescription());
        payment.pay(amount);
        System.out.println("Payment successful!");
    }
}

// Usage:
public class Main {
    public static void main(String[] args) {
        CheckoutService checkout = new CheckoutService();
        
        // Credit card payment
        Map<String, String> creditParams = Map.of(
            "cardNumber", "4532123456789012",
            "cvv", "123"
        );
        checkout.processPayment("credit", creditParams, 99.99);
        
        // PayPal payment
        Map<String, String> paypalParams = Map.of("email", "john@example.com");
        checkout.processPayment("paypal", paypalParams, 49.99);
        
        // Bitcoin payment
        Map<String, String> bitcoinParams = Map.of("walletAddress", "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");
        checkout.processPayment("bitcoin", bitcoinParams, 199.99);
    }
}

// Benefits:
// 1. CheckoutService doesn't know CreditCard/PayPal/Bitcoin classes
// 2. Add new payment → only touch PaymentFactory (Open/Closed)
// 3. Testing: inject mock factory
```

**3. Builder Pattern - HTTP Request Builder**

```java
// HttpRequest class (immutable)
public class HttpRequest {
    // Required fields
    private final String url;
    
    // Optional fields
    private final String method;
    private final Map<String, String> headers;
    private final Map<String, String> queryParams;
    private final String body;
    private final int timeout;
    private final boolean followRedirects;
    
    // Private constructor (only Builder can create)
    private HttpRequest(Builder builder) {
        this.url = builder.url;
        this.method = builder.method;
        this.headers = new HashMap<>(builder.headers);
        this.queryParams = new HashMap<>(builder.queryParams);
        this.body = builder.body;
        this.timeout = builder.timeout;
        this.followRedirects = builder.followRedirects;
    }
    
    // Getters (no setters → immutable)
    public String getUrl() { return url; }
    public String getMethod() { return method; }
    public Map<String, String> getHeaders() { return new HashMap<>(headers); }
    public Map<String, String> getQueryParams() { return new HashMap<>(queryParams); }
    public String getBody() { return body; }
    public int getTimeout() { return timeout; }
    public boolean isFollowRedirects() { return followRedirects; }
    
    @Override
    public String toString() {
        return String.format("%s %s (timeout=%dms, headers=%d, params=%d)",
            method, url, timeout, headers.size(), queryParams.size());
    }
    
    // Builder (static inner class)
    public static class Builder {
        // Required fields
        private final String url;
        
        // Optional fields (with defaults)
        private String method = "GET";
        private Map<String, String> headers = new HashMap<>();
        private Map<String, String> queryParams = new HashMap<>();
        private String body;
        private int timeout = 30000;  // 30 seconds default
        private boolean followRedirects = true;
        
        // Required parameter in constructor
        public Builder(String url) {
            this.url = url;
        }
        
        // Fluent setters (return this for chaining)
        public Builder method(String method) {
            this.method = method;
            return this;
        }
        
        public Builder header(String key, String value) {
            this.headers.put(key, value);
            return this;
        }
        
        public Builder headers(Map<String, String> headers) {
            this.headers.putAll(headers);
            return this;
        }
        
        public Builder queryParam(String key, String value) {
            this.queryParams.put(key, value);
            return this;
        }
        
        public Builder queryParams(Map<String, String> params) {
            this.queryParams.putAll(params);
            return this;
        }
        
        public Builder body(String body) {
            this.body = body;
            return this;
        }
        
        public Builder timeout(int timeout) {
            if (timeout <= 0) {
                throw new IllegalArgumentException("Timeout must be positive");
            }
            this.timeout = timeout;
            return this;
        }
        
        public Builder followRedirects(boolean follow) {
            this.followRedirects = follow;
            return this;
        }
        
        // Build method (creates immutable HttpRequest)
        public HttpRequest build() {
            // Validation
            if (url == null || url.isEmpty()) {
                throw new IllegalStateException("URL is required");
            }
            if (body != null && method.equals("GET")) {
                throw new IllegalStateException("GET requests cannot have body");
            }
            
            return new HttpRequest(this);
        }
    }
}

// Usage:
public class Main {
    public static void main(String[] args) {
        // Simple GET request
        HttpRequest getRequest = new HttpRequest.Builder("https://api.example.com/users")
            .build();
        System.out.println(getRequest);
        
        // Complex POST request (fluent API)
        HttpRequest postRequest = new HttpRequest.Builder("https://api.example.com/users")
            .method("POST")
            .header("Content-Type", "application/json")
            .header("Authorization", "Bearer token123")
            .header("User-Agent", "MyApp/1.0")
            .queryParam("debug", "true")
            .queryParam("version", "v2")
            .body("{\"name\": \"John\", \"email\": \"john@example.com\"}")
            .timeout(5000)
            .followRedirects(false)
            .build();
        System.out.println(postRequest);
        
        // Readability comparison:
        // Without Builder (telescoping constructor):
        // HttpRequest request = new HttpRequest("url", "POST", headers, params, body, 5000, false);
        // → What does "false" mean? Hard to read!
        
        // With Builder:
        // → Every parameter labeled, self-documenting code!
    }
}

// Benefits:
// 1. Readability: .method("POST") vs constructor parameter
// 2. Immutability: no setters (thread-safe)
// 3. Validation: build() checks constraints
// 4. Optional parameters: no telescoping constructors
```

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">design-patterns</span>
<span class="tag">singleton</span>
<span class="tag">factory</span>
<span class="tag">builder</span>
<span class="tag">creational</span>
<span class="tag">medior</span>
</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Gang of Four` · `SOLID Principles` · `Dependency Injection` · `Immutability` · `Thread Safety` · `Structural Patterns` · `Behavioral Patterns`

</div>

### Design Patterns - Part 2: Structural (Adapter, Decorator, Proxy) {#design-patterns-structural}

<div class="concept-section definition">

📋 **Fogalom meghatározása**

**Structural Patterns** = **Objektum összeállítási minták** (object composition patterns)

**7 GoF Structural Patterns**: Adapter, Decorator, Proxy, Facade, Composite, Bridge, Flyweight

**Part 2 fókusz: Adapter, Decorator, Proxy** (legtöbbször használtak)

**Adapter Pattern**:
```
Problem: Két inkompatibilis interface-t kell együttműködtetni (pl. legacy code + new API)
Solution: Adapter osztály "lefordítja" az egyik interface-t a másikra

Key points:
- Wrapper around incompatible class (translate calls)
- Two variants: Object Adapter (composition), Class Adapter (inheritance)
- Spring JpaRepository adapts SQL to Java objects
- Real-world: plug adapter (EU → US socket)
```

**Decorator Pattern**:
```
Problem: Futásidőben szeretnénk felelősségeket hozzáadni objektumhoz (pl. InputStream → BufferedInputStream → GZIPInputStream)
Solution: Decorator wraps original object, adds behavior

Key points:
- Same interface as original (transparent wrapping)
- Multiple decorators stackable (InputStream → BufferedInputStream → GZIPInputStream)
- Open/Closed principle (extend without modifying)
- Java IO streams use this pattern extensively
```

**Proxy Pattern**:
```
Problem: Access control vagy lazy loading (pl. ne töltsük be a képet, amíg nem kell)
Solution: Proxy osztály controls access to real object

Key points:
- Same interface as real object (client doesn't know proxy)
- Three types: Virtual Proxy (lazy loading), Protection Proxy (access control), Remote Proxy (RPC)
- Spring AOP uses proxy for @Transactional, @Cacheable
- Proxy vs Decorator: Proxy controls access, Decorator adds behavior
```

</div>

<div class="concept-section why-matters">

💡 **Miért számít a Structural Patterns ismerete?**

**1. Adapter: Integrate legacy code without rewriting**
```java
// Legacy payment system (cannot modify)
public class LegacyPaymentGateway {
    public void makePayment(String accountNumber, double dollars) {
        System.out.println("Legacy payment: $" + dollars + " from account " + accountNumber);
    }
}

// New payment interface (used everywhere in codebase)
public interface PaymentProcessor {
    void processPayment(String userId, BigDecimal amount);
}

// ❌ Without Adapter: Rewrite entire legacy system (expensive!)
// OR: Use different interfaces everywhere (inconsistent)

// ✅ With Adapter: Wrap legacy code (cheap, consistent)
public class LegacyPaymentAdapter implements PaymentProcessor {
    private LegacyPaymentGateway legacyGateway;
    
    public LegacyPaymentAdapter() {
        this.legacyGateway = new LegacyPaymentGateway();
    }
    
    @Override
    public void processPayment(String userId, BigDecimal amount) {
        // Translate new interface → legacy interface
        String accountNumber = "ACCT-" + userId;
        double dollars = amount.doubleValue();
        legacyGateway.makePayment(accountNumber, dollars);
    }
}

// Client code (doesn't know about legacy system):
public class OrderService {
    private PaymentProcessor paymentProcessor;
    
    public OrderService(PaymentProcessor processor) {
        this.paymentProcessor = processor;
    }
    
    public void checkout(String userId, BigDecimal amount) {
        paymentProcessor.processPayment(userId, amount);  // Unified interface!
    }
}

// Usage:
PaymentProcessor processor = new LegacyPaymentAdapter();  // Adapter wraps legacy
OrderService orderService = new OrderService(processor);
orderService.checkout("user123", new BigDecimal("99.99"));

// Benefits:
// - No legacy rewrite (saved $100k+ development cost)
// - Consistent interface across codebase
// - Easy to swap legacy → modern later (change one line)

// Real-world: Spring JpaRepository adapter
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Adapts SQL (SELECT * FROM users WHERE email = ?) 
    // to Java method (findByEmail)
    Optional<User> findByEmail(String email);
}
```

**2. Decorator: Add features without modifying code**
```java
// Coffee interface
public interface Coffee {
    String getDescription();
    double getCost();
}

// Simple coffee (base implementation)
public class SimpleCoffee implements Coffee {
    @Override
    public String getDescription() {
        return "Simple coffee";
    }
    
    @Override
    public double getCost() {
        return 2.0;
    }
}

// ❌ Without Decorator: Subclass explosion (2^n classes!)
// SimpleCoffee
// CoffeeWithMilk
// CoffeeWithSugar
// CoffeeWithMilkAndSugar
// CoffeeWithMilkAndSugarAndCaramel
// → 32 classes for 5 add-ons!

// ✅ With Decorator: Composable add-ons (n classes)
public abstract class CoffeeDecorator implements Coffee {
    protected Coffee coffee;  // Wrapped coffee
    
    public CoffeeDecorator(Coffee coffee) {
        this.coffee = coffee;
    }
    
    @Override
    public String getDescription() {
        return coffee.getDescription();
    }
    
    @Override
    public double getCost() {
        return coffee.getCost();
    }
}

public class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee coffee) {
        super(coffee);
    }
    
    @Override
    public String getDescription() {
        return coffee.getDescription() + ", milk";
    }
    
    @Override
    public double getCost() {
        return coffee.getCost() + 0.5;
    }
}

public class SugarDecorator extends CoffeeDecorator {
    public SugarDecorator(Coffee coffee) {
        super(coffee);
    }
    
    @Override
    public String getDescription() {
        return coffee.getDescription() + ", sugar";
    }
    
    @Override
    public double getCost() {
        return coffee.getCost() + 0.2;
    }
}

public class CaramelDecorator extends CoffeeDecorator {
    public CaramelDecorator(Coffee coffee) {
        super(coffee);
    }
    
    @Override
    public String getDescription() {
        return coffee.getDescription() + ", caramel";
    }
    
    @Override
    public double getCost() {
        return coffee.getCost() + 0.7;
    }
}

// Usage (stack decorators!):
Coffee coffee = new SimpleCoffee();
System.out.println(coffee.getDescription() + " = $" + coffee.getCost());
// → "Simple coffee = $2.0"

coffee = new MilkDecorator(coffee);
System.out.println(coffee.getDescription() + " = $" + coffee.getCost());
// → "Simple coffee, milk = $2.5"

coffee = new SugarDecorator(coffee);
System.out.println(coffee.getDescription() + " = $" + coffee.getCost());
// → "Simple coffee, milk, sugar = $2.7"

coffee = new CaramelDecorator(coffee);
System.out.println(coffee.getDescription() + " = $" + coffee.getCost());
// → "Simple coffee, milk, sugar, caramel = $3.4"

// Benefits:
// - 3 decorators vs 32 subclasses (90% less code)
// - Runtime composition (not compile-time inheritance)
// - Open/Closed: add new add-on = new decorator class (no modification)

// Real-world: Java IO streams
InputStream in = new FileInputStream("file.txt");
in = new BufferedInputStream(in);  // Decorator 1 (buffering)
in = new GZIPInputStream(in);      // Decorator 2 (decompression)
// → Stack 3 behaviors without modifying FileInputStream
```

**3. Proxy: Control access (lazy loading, caching, security)**
```java
// Image interface
public interface Image {
    void display();
}

// Real image (expensive to load)
public class RealImage implements Image {
    private String filename;
    
    public RealImage(String filename) {
        this.filename = filename;
        loadFromDisk();  // Expensive operation!
    }
    
    private void loadFromDisk() {
        System.out.println("Loading image from disk: " + filename);
        // Simulate expensive disk I/O (2 seconds)
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    
    @Override
    public void display() {
        System.out.println("Displaying image: " + filename);
    }
}

// ❌ Without Proxy: Load all images upfront (slow startup!)
public class Gallery {
    private List<Image> images = new ArrayList<>();
    
    public Gallery() {
        images.add(new RealImage("photo1.jpg"));  // 2 seconds
        images.add(new RealImage("photo2.jpg"));  // 2 seconds
        images.add(new RealImage("photo3.jpg"));  // 2 seconds
        // → 6 seconds startup (user waits!)
    }
    
    public void showImage(int index) {
        images.get(index).display();
    }
}

// ✅ With Proxy: Lazy loading (fast startup!)
public class ProxyImage implements Image {
    private String filename;
    private RealImage realImage;  // Null until needed
    
    public ProxyImage(String filename) {
        this.filename = filename;
        // No loading yet!
    }
    
    @Override
    public void display() {
        if (realImage == null) {
            realImage = new RealImage(filename);  // Load on first use
        }
        realImage.display();
    }
}

public class Gallery {
    private List<Image> images = new ArrayList<>();
    
    public Gallery() {
        images.add(new ProxyImage("photo1.jpg"));  // Instant!
        images.add(new ProxyImage("photo2.jpg"));  // Instant!
        images.add(new ProxyImage("photo3.jpg"));  // Instant!
        // → 0 seconds startup (images load when displayed)
    }
    
    public void showImage(int index) {
        images.get(index).display();  // Loads on first call
    }
}

// Usage:
Gallery gallery = new Gallery();  // Instant startup
gallery.showImage(0);  // Loads photo1.jpg (2 seconds)
gallery.showImage(1);  // Loads photo2.jpg (2 seconds)
// → User only waits for images they actually view

// Benefits:
// - Startup: 6 seconds → 0 seconds (instant)
// - Memory: Load only viewed images (not all 100 images)
// - Same interface (client doesn't know proxy)

// Real-world: Spring AOP proxy for @Transactional
@Service
public class OrderService {
    @Transactional  // Spring creates proxy!
    public void createOrder(Order order) {
        // Business logic...
    }
}

// Spring generates proxy class:
public class OrderServiceProxy extends OrderService {
    private OrderService target;
    private TransactionManager txManager;
    
    @Override
    public void createOrder(Order order) {
        txManager.begin();  // Proxy adds transaction
        try {
            target.createOrder(order);  // Delegate to real service
            txManager.commit();
        } catch (Exception e) {
            txManager.rollback();
            throw e;
        }
    }
}
// → Client calls proxy (not real service), proxy adds transaction behavior
```

**4. Industry adoption (patterns in frameworks)**
```
Adapter:
- Spring Data JpaRepository (adapts SQL to Java)
- SLF4J logging facade (adapts Log4j, Logback, etc.)
- JDBC-ODBC bridge (adapts ODBC to JDBC)

Decorator:
- Java IO streams (BufferedInputStream, GZIPInputStream)
- Servlet Filters (HttpServletRequestWrapper)
- Spring Security filters (chain of decorators)

Proxy:
- Spring AOP (@Transactional, @Cacheable, @Async)
- Hibernate lazy loading proxies
- RMI (Remote Method Invocation)
- Java Dynamic Proxy (Proxy.newProxyInstance)

→ Understanding patterns = understanding Spring/Hibernate internals
```

</div>

<div class="concept-section runnable-model">

🚀 **Runnable Mental Model**

**1. Adapter Pattern - Third-Party API Integration**

```java
// Third-party weather API (cannot modify)
public class WeatherAPI {
    public String getTemperatureInFahrenheit(String city) {
        // Simulate API call
        return city + ": 75°F";
    }
}

// Our application uses Celsius (European standard)
public interface TemperatureService {
    double getTemperatureCelsius(String city);
}

// Adapter (converts Fahrenheit → Celsius)
public class WeatherAPIAdapter implements TemperatureService {
    private WeatherAPI weatherAPI;
    
    public WeatherAPIAdapter() {
        this.weatherAPI = new WeatherAPI();
    }
    
    @Override
    public double getTemperatureCelsius(String city) {
        String response = weatherAPI.getTemperatureInFahrenheit(city);
        
        // Parse "City: 75°F" → 75
        String[] parts = response.split(": ");
        String fahrenheitStr = parts[1].replace("°F", "");
        double fahrenheit = Double.parseDouble(fahrenheitStr);
        
        // Convert Fahrenheit → Celsius
        double celsius = (fahrenheit - 32) * 5.0 / 9.0;
        return Math.round(celsius * 10) / 10.0;  // Round to 1 decimal
    }
}

// Client code (uses Celsius)
public class WeatherApp {
    private TemperatureService temperatureService;
    
    public WeatherApp(TemperatureService service) {
        this.temperatureService = service;
    }
    
    public void displayWeather(String city) {
        double celsius = temperatureService.getTemperatureCelsius(city);
        System.out.println(city + " temperature: " + celsius + "°C");
    }
}

// Usage:
public class Main {
    public static void main(String[] args) {
        // Adapter wraps third-party API
        TemperatureService service = new WeatherAPIAdapter();
        
        // Client uses unified interface
        WeatherApp app = new WeatherApp(service);
        app.displayWeather("London");    // London temperature: 23.9°C
        app.displayWeather("Paris");     // Paris temperature: 23.9°C
        app.displayWeather("Berlin");    // Berlin temperature: 23.9°C
    }
}

// Benefits:
// - Client code doesn't know about Fahrenheit (unified Celsius interface)
// - Easy to swap WeatherAPI → different provider (change one line)
// - No modification of third-party library (adapter wraps it)
```

**2. Decorator Pattern - Notification System**

```java
// Notification interface
public interface Notifier {
    void send(String message);
}

// Basic email notifier (base implementation)
public class EmailNotifier implements Notifier {
    private String email;
    
    public EmailNotifier(String email) {
        this.email = email;
    }
    
    @Override
    public void send(String message) {
        System.out.println("Sending email to " + email + ": " + message);
    }
}

// Decorator base class
public abstract class NotifierDecorator implements Notifier {
    protected Notifier wrappedNotifier;
    
    public NotifierDecorator(Notifier notifier) {
        this.wrappedNotifier = notifier;
    }
    
    @Override
    public void send(String message) {
        wrappedNotifier.send(message);  // Delegate to wrapped notifier
    }
}

// SMS decorator (adds SMS notification)
public class SMSDecorator extends NotifierDecorator {
    private String phoneNumber;
    
    public SMSDecorator(Notifier notifier, String phoneNumber) {
        super(notifier);
        this.phoneNumber = phoneNumber;
    }
    
    @Override
    public void send(String message) {
        super.send(message);  // Send via wrapped notifier (email)
        sendSMS(message);     // Add SMS functionality
    }
    
    private void sendSMS(String message) {
        System.out.println("Sending SMS to " + phoneNumber + ": " + message);
    }
}

// Slack decorator (adds Slack notification)
public class SlackDecorator extends NotifierDecorator {
    private String slackChannel;
    
    public SlackDecorator(Notifier notifier, String slackChannel) {
        super(notifier);
        this.slackChannel = slackChannel;
    }
    
    @Override
    public void send(String message) {
        super.send(message);  // Send via wrapped notifier
        sendSlack(message);   // Add Slack functionality
    }
    
    private void sendSlack(String message) {
        System.out.println("Posting to Slack " + slackChannel + ": " + message);
    }
}

// Facebook decorator (adds Facebook notification)
public class FacebookDecorator extends NotifierDecorator {
    private String facebookPage;
    
    public FacebookDecorator(Notifier notifier, String facebookPage) {
        super(notifier);
        this.facebookPage = facebookPage;
    }
    
    @Override
    public void send(String message) {
        super.send(message);     // Send via wrapped notifier
        sendFacebook(message);   // Add Facebook functionality
    }
    
    private void sendFacebook(String message) {
        System.out.println("Posting to Facebook page " + facebookPage + ": " + message);
    }
}

// Usage:
public class Main {
    public static void main(String[] args) {
        String message = "Server is down!";
        
        // Base notifier (email only)
        Notifier notifier = new EmailNotifier("admin@example.com");
        notifier.send(message);
        // → Sending email to admin@example.com: Server is down!
        
        System.out.println("\n--- Adding SMS ---");
        
        // Wrap with SMS decorator
        notifier = new SMSDecorator(notifier, "+1234567890");
        notifier.send(message);
        // → Sending email to admin@example.com: Server is down!
        // → Sending SMS to +1234567890: Server is down!
        
        System.out.println("\n--- Adding Slack ---");
        
        // Wrap with Slack decorator
        notifier = new SlackDecorator(notifier, "#ops-alerts");
        notifier.send(message);
        // → Sending email to admin@example.com: Server is down!
        // → Sending SMS to +1234567890: Server is down!
        // → Posting to Slack #ops-alerts: Server is down!
        
        System.out.println("\n--- Adding Facebook ---");
        
        // Wrap with Facebook decorator
        notifier = new FacebookDecorator(notifier, "CompanyPage");
        notifier.send(message);
        // → Sending email to admin@example.com: Server is down!
        // → Sending SMS to +1234567890: Server is down!
        // → Posting to Slack #ops-alerts: Server is down!
        // → Posting to Facebook page CompanyPage: Server is down!
    }
}

// Benefits:
// - Stack decorators at runtime (not compile-time inheritance)
// - Open/Closed: Add Twitter → new TwitterDecorator (no modification)
// - Flexible combinations: Email+SMS, Email+Slack, All channels
// - 3 decorators vs 7 subclasses (EmailOnly, EmailSMS, EmailSlack, EmailFacebook, EmailSMSSlack, EmailSMSFacebook, All)
```

**3. Proxy Pattern - Database Query Caching**

```java
// Database interface
public interface Database {
    String query(String sql);
}

// Real database (expensive queries)
public class RealDatabase implements Database {
    @Override
    public String query(String sql) {
        System.out.println("Executing SQL: " + sql);
        
        // Simulate expensive query (1 second)
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        // Mock result
        return "Result for: " + sql;
    }
}

// Proxy with caching (controls access to real database)
public class CachedDatabaseProxy implements Database {
    private RealDatabase realDatabase;
    private Map<String, String> cache;
    
    public CachedDatabaseProxy() {
        this.realDatabase = new RealDatabase();
        this.cache = new HashMap<>();
    }
    
    @Override
    public String query(String sql) {
        // Check cache first
        if (cache.containsKey(sql)) {
            System.out.println("Cache HIT: " + sql);
            return cache.get(sql);  // Instant return (no DB call)
        }
        
        // Cache miss → query real database
        System.out.println("Cache MISS: " + sql);
        String result = realDatabase.query(sql);
        
        // Store in cache
        cache.put(sql, result);
        
        return result;
    }
    
    public void clearCache() {
        cache.clear();
        System.out.println("Cache cleared");
    }
}

// Usage:
public class Main {
    public static void main(String[] args) {
        Database db = new CachedDatabaseProxy();
        
        // First query (cache miss)
        long start1 = System.currentTimeMillis();
        String result1 = db.query("SELECT * FROM users WHERE id = 1");
        long duration1 = System.currentTimeMillis() - start1;
        System.out.println(result1);
        System.out.println("Duration: " + duration1 + "ms\n");
        // → Cache MISS: SELECT * FROM users WHERE id = 1
        // → Executing SQL: SELECT * FROM users WHERE id = 1
        // → Result for: SELECT * FROM users WHERE id = 1
        // → Duration: 1002ms
        
        // Second query (same SQL → cache hit!)
        long start2 = System.currentTimeMillis();
        String result2 = db.query("SELECT * FROM users WHERE id = 1");
        long duration2 = System.currentTimeMillis() - start2;
        System.out.println(result2);
        System.out.println("Duration: " + duration2 + "ms\n");
        // → Cache HIT: SELECT * FROM users WHERE id = 1
        // → Result for: SELECT * FROM users WHERE id = 1
        // → Duration: 0ms (1000x faster!)
        
        // Different query (cache miss)
        long start3 = System.currentTimeMillis();
        String result3 = db.query("SELECT * FROM orders WHERE id = 100");
        long duration3 = System.currentTimeMillis() - start3;
        System.out.println(result3);
        System.out.println("Duration: " + duration3 + "ms\n");
        // → Cache MISS: SELECT * FROM orders WHERE id = 100
        // → Executing SQL: SELECT * FROM orders WHERE id = 100
        // → Duration: 1001ms
        
        // Query again (cache hit)
        long start4 = System.currentTimeMillis();
        String result4 = db.query("SELECT * FROM orders WHERE id = 100");
        long duration4 = System.currentTimeMillis() - start4;
        System.out.println(result4);
        System.out.println("Duration: " + duration4 + "ms");
        // → Cache HIT: SELECT * FROM orders WHERE id = 100
        // → Duration: 0ms
    }
}

// Benefits:
// - Caching transparent to client (same Database interface)
// - 1000ms → 0ms on repeated queries (infinite speedup!)
// - Easy to add: access logging, rate limiting, security checks
// - Real-world: Spring @Cacheable uses proxy pattern
```

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">design-patterns</span>
<span class="tag">adapter</span>
<span class="tag">decorator</span>
<span class="tag">proxy</span>
<span class="tag">structural</span>
<span class="tag">medior</span>
</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Gang of Four` · `Composition over Inheritance` · `Open/Closed Principle` · `Dependency Injection` · `Spring AOP` · `Behavioral Patterns`

</div>

### Design Patterns - Part 3: Behavioral (Strategy, Observer, Command) {#design-patterns-behavioral}

<div class="concept-section definition">

📋 **Fogalom meghatározása**

**Behavioral Patterns** = **Objektum interakciós minták** (how objects communicate)

**11 GoF Behavioral Patterns**: Strategy, Observer, Command, State, Template Method, Iterator, Visitor, Mediator, Chain of Responsibility, Memento, Interpreter

**Part 3 fókusz: Strategy, Observer, Command** (legtöbbet használtak)

**Strategy Pattern**:
```
Problem: Több algoritmus variáns, runtime választás (pl. fizetési mód: hitelkártya/PayPal/Bitcoin)
Solution: Encapsulate each algorithm in separate class

Key points:
- Same interface, different implementations (polymorphism)
- Client chooses strategy at runtime (composition > inheritance)
- Open/Closed principle (new strategy = new class)
- Java Comparator uses this pattern
```

**Observer Pattern**:
```
Problem: Objektum változás → notifikálni kell sok más objektumot (pl. YouTube új videó → értesítés)
Solution: Observers subscribe to Subject (publish-subscribe)

Key points:
- One-to-many relationship (1 subject → N observers)
- Loose coupling (subject doesn't know observer details)
- Push model (subject pushes updates) or Pull model (observers pull data)
- Spring @EventListener uses this pattern
```

**Command Pattern**:
```
Problem: Műveletek paraméterezhető objektumként (pl. undo/redo, transaction log)
Solution: Encapsulate request as object

Key points:
- Command object stores: operation, receiver, parameters
- Undo/Redo: store command history, reverse operations
- Transaction log: replay commands for recovery
- Spring @Transactional uses command pattern internally
```

</div>

<div class="concept-section why-matters">

💡 **Miért számít a Behavioral Patterns ismerete?**

**1. Strategy: Avoid if-else chains (Open/Closed violation)**
```java
// ❌ Without Strategy: if-else hell (Open/Closed violation)
public class PaymentProcessor {
    public void process(String type, double amount) {
        if (type.equals("credit")) {
            // Credit card logic (20 lines)
            System.out.println("Processing credit card payment: $" + amount);
            validateCreditCard();
            chargeCreditCard(amount);
            sendCreditCardReceipt();
        } else if (type.equals("paypal")) {
            // PayPal logic (15 lines)
            System.out.println("Processing PayPal payment: $" + amount);
            validatePayPalAccount();
            chargePayPal(amount);
            sendPayPalReceipt();
        } else if (type.equals("bitcoin")) {
            // Bitcoin logic (25 lines)
            System.out.println("Processing Bitcoin payment: $" + amount);
            validateBitcoinWallet();
            chargeBitcoin(amount);
            sendBitcoinReceipt();
        }
        // Add ApplePay → modify this class (Open/Closed violation!)
    }
    // 60 lines of spaghetti code...
}

// ✅ With Strategy: polymorphic dispatch (Open/Closed compliance)
public interface PaymentStrategy {
    void pay(double amount);
}

public class CreditCardStrategy implements PaymentStrategy {
    @Override
    public void pay(double amount) {
        System.out.println("Processing credit card payment: $" + amount);
        validateCreditCard();
        chargeCreditCard(amount);
        sendCreditCardReceipt();
    }
    
    private void validateCreditCard() { /* ... */ }
    private void chargeCreditCard(double amount) { /* ... */ }
    private void sendCreditCardReceipt() { /* ... */ }
}

public class PayPalStrategy implements PaymentStrategy {
    @Override
    public void pay(double amount) {
        System.out.println("Processing PayPal payment: $" + amount);
        validatePayPalAccount();
        chargePayPal(amount);
        sendPayPalReceipt();
    }
    
    private void validatePayPalAccount() { /* ... */ }
    private void chargePayPal(double amount) { /* ... */ }
    private void sendPayPalReceipt() { /* ... */ }
}

public class PaymentProcessor {
    private PaymentStrategy strategy;
    
    public void setStrategy(PaymentStrategy strategy) {
        this.strategy = strategy;
    }
    
    public void process(double amount) {
        strategy.pay(amount);  // Polymorphic dispatch!
    }
}

// Usage:
PaymentProcessor processor = new PaymentProcessor();
processor.setStrategy(new CreditCardStrategy());
processor.process(99.99);

processor.setStrategy(new PayPalStrategy());
processor.process(49.99);

// Benefits:
// - Add ApplePay → new ApplePayStrategy class (no modification!)
// - Each strategy in separate class (Single Responsibility)
// - Easy to test strategies independently
// - Runtime strategy switching

// Real-world: Java Comparator
List<String> names = Arrays.asList("John", "Alice", "Bob");

// Strategy 1: Natural order
names.sort(Comparator.naturalOrder());

// Strategy 2: Reverse order
names.sort(Comparator.reverseOrder());

// Strategy 3: By length
names.sort(Comparator.comparingInt(String::length));
// → Sorting algorithm same, comparison strategy changes
```

**2. Observer: Decouple event producers and consumers**
```java
// ❌ Without Observer: Tight coupling (hard to extend)
public class StockMarket {
    private double applePrice = 150.0;
    
    // Tightly coupled to specific observers
    private EmailNotifier emailNotifier;
    private SMSNotifier smsNotifier;
    private Dashboard dashboard;
    
    public StockMarket() {
        this.emailNotifier = new EmailNotifier();
        this.smsNotifier = new SMSNotifier();
        this.dashboard = new Dashboard();
    }
    
    public void setApplePrice(double price) {
        this.applePrice = price;
        
        // Manual notifications (tightly coupled)
        emailNotifier.sendEmail("Apple stock: $" + price);
        smsNotifier.sendSMS("Apple stock: $" + price);
        dashboard.update("Apple", price);
        
        // Add Twitter notification → modify this class!
    }
}

// ✅ With Observer: Loose coupling (easy to extend)
public interface StockObserver {
    void update(String stock, double price);
}

public class EmailNotifier implements StockObserver {
    @Override
    public void update(String stock, double price) {
        System.out.println("Email: " + stock + " stock is now $" + price);
    }
}

public class SMSNotifier implements StockObserver {
    @Override
    public void update(String stock, double price) {
        System.out.println("SMS: " + stock + " stock is now $" + price);
    }
}

public class Dashboard implements StockObserver {
    @Override
    public void update(String stock, double price) {
        System.out.println("Dashboard: Updating " + stock + " to $" + price);
    }
}

public class StockMarket {
    private Map<String, Double> prices = new HashMap<>();
    private List<StockObserver> observers = new ArrayList<>();
    
    // Subscribe/unsubscribe
    public void addObserver(StockObserver observer) {
        observers.add(observer);
    }
    
    public void removeObserver(StockObserver observer) {
        observers.remove(observer);
    }
    
    // Notify all observers
    public void setPrice(String stock, double price) {
        prices.put(stock, price);
        notifyObservers(stock, price);
    }
    
    private void notifyObservers(String stock, double price) {
        for (StockObserver observer : observers) {
            observer.update(stock, price);
        }
    }
}

// Usage:
StockMarket market = new StockMarket();
market.addObserver(new EmailNotifier());
market.addObserver(new SMSNotifier());
market.addObserver(new Dashboard());

market.setPrice("Apple", 155.0);
// → Email: Apple stock is now $155.0
// → SMS: Apple stock is now $155.0
// → Dashboard: Updating Apple to $155.0

// Add Twitter notification (no modification to StockMarket!)
market.addObserver(new TwitterNotifier());
market.setPrice("Google", 2800.0);
// → All 4 observers notified

// Benefits:
// - StockMarket doesn't know observer details (loose coupling)
// - Add/remove observers at runtime (dynamic)
// - Open/Closed: new observer = new class (no modification)

// Real-world: Spring @EventListener
@Component
public class OrderService {
    @Autowired
    private ApplicationEventPublisher eventPublisher;
    
    public void createOrder(Order order) {
        // Business logic...
        eventPublisher.publishEvent(new OrderCreatedEvent(order));
    }
}

@Component
public class EmailListener {
    @EventListener  // Observer subscribes to event
    public void handleOrderCreated(OrderCreatedEvent event) {
        // Send confirmation email
    }
}

@Component
public class InventoryListener {
    @EventListener  // Another observer
    public void handleOrderCreated(OrderCreatedEvent event) {
        // Update inventory
    }
}
// → OrderService doesn't know about email/inventory (loose coupling)
```

**3. Command: Undo/Redo and transaction logging**
```java
// Command interface
public interface Command {
    void execute();
    void undo();
}

// Receiver (knows how to perform operations)
public class TextEditor {
    private StringBuilder text = new StringBuilder();
    
    public void insertText(String str) {
        text.append(str);
        System.out.println("Text: " + text);
    }
    
    public void deleteText(int length) {
        int start = Math.max(0, text.length() - length);
        text.delete(start, text.length());
        System.out.println("Text: " + text);
    }
    
    public String getText() {
        return text.toString();
    }
}

// Concrete commands
public class InsertCommand implements Command {
    private TextEditor editor;
    private String textToInsert;
    
    public InsertCommand(TextEditor editor, String text) {
        this.editor = editor;
        this.textToInsert = text;
    }
    
    @Override
    public void execute() {
        editor.insertText(textToInsert);
    }
    
    @Override
    public void undo() {
        editor.deleteText(textToInsert.length());
    }
}

public class DeleteCommand implements Command {
    private TextEditor editor;
    private int length;
    private String deletedText;
    
    public DeleteCommand(TextEditor editor, int length) {
        this.editor = editor;
        this.length = length;
    }
    
    @Override
    public void execute() {
        String currentText = editor.getText();
        int start = Math.max(0, currentText.length() - length);
        deletedText = currentText.substring(start);  // Save for undo
        editor.deleteText(length);
    }
    
    @Override
    public void undo() {
        editor.insertText(deletedText);
    }
}

// Invoker (manages command history)
public class CommandManager {
    private Stack<Command> history = new Stack<>();
    private Stack<Command> redoStack = new Stack<>();
    
    public void executeCommand(Command command) {
        command.execute();
        history.push(command);
        redoStack.clear();  // Clear redo stack after new command
    }
    
    public void undo() {
        if (history.isEmpty()) {
            System.out.println("Nothing to undo");
            return;
        }
        
        Command command = history.pop();
        command.undo();
        redoStack.push(command);
    }
    
    public void redo() {
        if (redoStack.isEmpty()) {
            System.out.println("Nothing to redo");
            return;
        }
        
        Command command = redoStack.pop();
        command.execute();
        history.push(command);
    }
}

// Usage:
public class Main {
    public static void main(String[] args) {
        TextEditor editor = new TextEditor();
        CommandManager manager = new CommandManager();
        
        // Execute commands
        manager.executeCommand(new InsertCommand(editor, "Hello "));
        // → Text: Hello 
        
        manager.executeCommand(new InsertCommand(editor, "World"));
        // → Text: Hello World
        
        manager.executeCommand(new InsertCommand(editor, "!"));
        // → Text: Hello World!
        
        // Undo last command
        manager.undo();
        // → Text: Hello World
        
        manager.undo();
        // → Text: Hello 
        
        // Redo
        manager.redo();
        // → Text: Hello World
        
        // New command (clears redo stack)
        manager.executeCommand(new DeleteCommand(editor, 6));
        // → Text: Hello
        
        manager.undo();
        // → Text: Hello World
    }
}

// Benefits:
// - Undo/Redo: store command history, reverse operations
// - Transaction log: replay commands for crash recovery
// - Macro commands: combine multiple commands
// - Queueing: execute commands asynchronously

// Real-world: Database transactions
public class TransactionManager {
    private List<Command> commands = new ArrayList<>();
    
    public void addCommand(Command cmd) {
        commands.add(cmd);
    }
    
    public void commit() {
        for (Command cmd : commands) {
            cmd.execute();  // Execute all commands
        }
        commands.clear();
    }
    
    public void rollback() {
        for (int i = commands.size() - 1; i >= 0; i--) {
            commands.get(i).undo();  // Undo in reverse order
        }
        commands.clear();
    }
}
```

**4. Industry adoption (patterns in action)**
```
Strategy:
- Java Comparator.compare()
- Spring @Conditional strategies
- Payment gateways (Stripe, PayPal, Square)
- Compression algorithms (GZIP, BZIP2, LZ4)

Observer:
- Java Swing listeners (ActionListener, MouseListener)
- Spring @EventListener, ApplicationEvent
- RxJava Observables (reactive programming)
- WebSockets (server pushes updates to clients)

Command:
- Java Runnable, Callable
- Swing Action, MenuItem
- Database transactions (BEGIN, COMMIT, ROLLBACK)
- Job queues (Sidekiq, Celery, Bull)

→ Behavioral patterns = core of event-driven architecture
```

</div>

<div class="concept-section runnable-model">

🚀 **Runnable Mental Model**

**1. Strategy Pattern - Sorting Algorithms**

```java
// Strategy interface
public interface SortStrategy {
    void sort(int[] array);
    String getName();
}

// Concrete strategies
public class BubbleSortStrategy implements SortStrategy {
    @Override
    public void sort(int[] array) {
        int n = array.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    // Swap
                    int temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
    }
    
    @Override
    public String getName() {
        return "Bubble Sort";
    }
}

public class QuickSortStrategy implements SortStrategy {
    @Override
    public void sort(int[] array) {
        quickSort(array, 0, array.length - 1);
    }
    
    private void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }
    
    private int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }
    
    @Override
    public String getName() {
        return "Quick Sort";
    }
}

public class MergeSortStrategy implements SortStrategy {
    @Override
    public void sort(int[] array) {
        mergeSort(array, 0, array.length - 1);
    }
    
    private void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = (left + right) / 2;
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }
    
    private void merge(int[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;
        
        int[] L = new int[n1];
        int[] R = new int[n2];
        
        System.arraycopy(arr, left, L, 0, n1);
        System.arraycopy(arr, mid + 1, R, 0, n2);
        
        int i = 0, j = 0, k = left;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k++] = L[i++];
            } else {
                arr[k++] = R[j++];
            }
        }
        
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }
    
    @Override
    public String getName() {
        return "Merge Sort";
    }
}

// Context (uses strategy)
public class ArraySorter {
    private SortStrategy strategy;
    
    public void setStrategy(SortStrategy strategy) {
        this.strategy = strategy;
    }
    
    public void sortArray(int[] array) {
        long start = System.nanoTime();
        strategy.sort(array);
        long duration = System.nanoTime() - start;
        
        System.out.println(strategy.getName() + " completed in " + duration / 1_000 + " μs");
        System.out.println("Sorted: " + Arrays.toString(array));
    }
}

// Usage:
public class Main {
    public static void main(String[] args) {
        ArraySorter sorter = new ArraySorter();
        
        // Small array (Bubble Sort OK)
        int[] small = {5, 2, 8, 1, 9};
        sorter.setStrategy(new BubbleSortStrategy());
        sorter.sortArray(small.clone());
        // → Bubble Sort completed in 12 μs
        // → Sorted: [1, 2, 5, 8, 9]
        
        // Large array (Quick Sort better)
        int[] large = new int[1000];
        for (int i = 0; i < large.length; i++) {
            large[i] = (int) (Math.random() * 1000);
        }
        
        sorter.setStrategy(new BubbleSortStrategy());
        sorter.sortArray(large.clone());
        // → Bubble Sort completed in 15234 μs (slow!)
        
        sorter.setStrategy(new QuickSortStrategy());
        sorter.sortArray(large.clone());
        // → Quick Sort completed in 234 μs (65x faster!)
        
        sorter.setStrategy(new MergeSortStrategy());
        sorter.sortArray(large.clone());
        // → Merge Sort completed in 312 μs (49x faster!)
    }
}

// Benefits:
// - Runtime strategy selection (based on array size)
// - Easy to add TimSort, HeapSort (new strategy classes)
// - Testing: mock strategy for unit tests
```

**2. Observer Pattern - Weather Station**

```java
// Observer interface
public interface WeatherObserver {
    void update(float temperature, float humidity, float pressure);
}

// Subject (observable)
public class WeatherStation {
    private List<WeatherObserver> observers = new ArrayList<>();
    private float temperature;
    private float humidity;
    private float pressure;
    
    public void addObserver(WeatherObserver observer) {
        observers.add(observer);
        System.out.println("Observer added: " + observer.getClass().getSimpleName());
    }
    
    public void removeObserver(WeatherObserver observer) {
        observers.remove(observer);
        System.out.println("Observer removed: " + observer.getClass().getSimpleName());
    }
    
    public void setMeasurements(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        notifyObservers();
    }
    
    private void notifyObservers() {
        for (WeatherObserver observer : observers) {
            observer.update(temperature, humidity, pressure);
        }
    }
}

// Concrete observers
public class CurrentConditionsDisplay implements WeatherObserver {
    @Override
    public void update(float temperature, float humidity, float pressure) {
        System.out.println("Current conditions: " + temperature + "°C, " + humidity + "% humidity");
    }
}

public class StatisticsDisplay implements WeatherObserver {
    private List<Float> temperatures = new ArrayList<>();
    
    @Override
    public void update(float temperature, float humidity, float pressure) {
        temperatures.add(temperature);
        float avg = (float) temperatures.stream().mapToDouble(Float::doubleValue).average().orElse(0);
        float max = (float) temperatures.stream().mapToDouble(Float::doubleValue).max().orElse(0);
        float min = (float) temperatures.stream().mapToDouble(Float::doubleValue).min().orElse(0);
        
        System.out.println("Statistics: Avg " + avg + "°C, Max " + max + "°C, Min " + min + "°C");
    }
}

public class ForecastDisplay implements WeatherObserver {
    private float lastPressure = 0;
    
    @Override
    public void update(float temperature, float humidity, float pressure) {
        String forecast;
        if (pressure > lastPressure) {
            forecast = "Improving weather!";
        } else if (pressure < lastPressure) {
            forecast = "Watch out for cooler, rainy weather";
        } else {
            forecast = "More of the same";
        }
        
        System.out.println("Forecast: " + forecast);
        lastPressure = pressure;
    }
}

// Usage:
public class Main {
    public static void main(String[] args) {
        WeatherStation station = new WeatherStation();
        
        // Register observers
        CurrentConditionsDisplay current = new CurrentConditionsDisplay();
        StatisticsDisplay stats = new StatisticsDisplay();
        ForecastDisplay forecast = new ForecastDisplay();
        
        station.addObserver(current);
        station.addObserver(stats);
        station.addObserver(forecast);
        
        System.out.println("\n--- Measurement 1 ---");
        station.setMeasurements(25.0f, 65.0f, 1013.0f);
        // → Current conditions: 25.0°C, 65.0% humidity
        // → Statistics: Avg 25.0°C, Max 25.0°C, Min 25.0°C
        // → Forecast: More of the same
        
        System.out.println("\n--- Measurement 2 ---");
        station.setMeasurements(28.0f, 70.0f, 1015.0f);
        // → Current conditions: 28.0°C, 70.0% humidity
        // → Statistics: Avg 26.5°C, Max 28.0°C, Min 25.0°C
        // → Forecast: Improving weather!
        
        System.out.println("\n--- Measurement 3 ---");
        station.setMeasurements(22.0f, 90.0f, 1010.0f);
        // → Current conditions: 22.0°C, 90.0% humidity
        // → Statistics: Avg 25.0°C, Max 28.0°C, Min 22.0°C
        // → Forecast: Watch out for cooler, rainy weather
        
        // Remove observer
        System.out.println("\n--- Remove forecast observer ---");
        station.removeObserver(forecast);
        
        System.out.println("\n--- Measurement 4 ---");
        station.setMeasurements(26.0f, 80.0f, 1012.0f);
        // → Current conditions: 26.0°C, 80.0% humidity
        // → Statistics: Avg 25.25°C, Max 28.0°C, Min 22.0°C
        // → (no forecast update)
    }
}

// Benefits:
// - WeatherStation doesn't know observer details (loose coupling)
// - Add/remove observers at runtime (dynamic subscriptions)
// - Multiple displays react to same data (one-to-many)
```

**3. Command Pattern - Remote Control**

```java
// Command interface
public interface Command {
    void execute();
    void undo();
}

// Receiver classes
public class Light {
    private String location;
    private boolean isOn = false;
    
    public Light(String location) {
        this.location = location;
    }
    
    public void on() {
        isOn = true;
        System.out.println(location + " light is ON");
    }
    
    public void off() {
        isOn = false;
        System.out.println(location + " light is OFF");
    }
}

public class Stereo {
    private String location;
    private boolean isOn = false;
    
    public Stereo(String location) {
        this.location = location;
    }
    
    public void on() {
        isOn = true;
        System.out.println(location + " stereo is ON");
    }
    
    public void off() {
        isOn = false;
        System.out.println(location + " stereo is OFF");
    }
    
    public void setVolume(int volume) {
        System.out.println(location + " stereo volume set to " + volume);
    }
}

// Concrete commands
public class LightOnCommand implements Command {
    private Light light;
    
    public LightOnCommand(Light light) {
        this.light = light;
    }
    
    @Override
    public void execute() {
        light.on();
    }
    
    @Override
    public void undo() {
        light.off();
    }
}

public class LightOffCommand implements Command {
    private Light light;
    
    public LightOffCommand(Light light) {
        this.light = light;
    }
    
    @Override
    public void execute() {
        light.off();
    }
    
    @Override
    public void undo() {
        light.on();
    }
}

public class StereoOnCommand implements Command {
    private Stereo stereo;
    
    public StereoOnCommand(Stereo stereo) {
        this.stereo = stereo;
    }
    
    @Override
    public void execute() {
        stereo.on();
        stereo.setVolume(10);
    }
    
    @Override
    public void undo() {
        stereo.off();
    }
}

// Invoker (remote control)
public class RemoteControl {
    private Command[] onCommands;
    private Command[] offCommands;
    private Command lastCommand;
    
    public RemoteControl(int slots) {
        onCommands = new Command[slots];
        offCommands = new Command[slots];
    }
    
    public void setCommand(int slot, Command onCommand, Command offCommand) {
        onCommands[slot] = onCommand;
        offCommands[slot] = offCommand;
    }
    
    public void onButtonPressed(int slot) {
        if (onCommands[slot] != null) {
            onCommands[slot].execute();
            lastCommand = onCommands[slot];
        }
    }
    
    public void offButtonPressed(int slot) {
        if (offCommands[slot] != null) {
            offCommands[slot].execute();
            lastCommand = offCommands[slot];
        }
    }
    
    public void undoButtonPressed() {
        if (lastCommand != null) {
            lastCommand.undo();
        }
    }
}

// Usage:
public class Main {
    public static void main(String[] args) {
        // Receivers
        Light livingRoomLight = new Light("Living Room");
        Light kitchenLight = new Light("Kitchen");
        Stereo stereo = new Stereo("Living Room");
        
        // Commands
        LightOnCommand livingRoomLightOn = new LightOnCommand(livingRoomLight);
        LightOffCommand livingRoomLightOff = new LightOffCommand(livingRoomLight);
        LightOnCommand kitchenLightOn = new LightOnCommand(kitchenLight);
        LightOffCommand kitchenLightOff = new LightOffCommand(kitchenLight);
        StereoOnCommand stereoOn = new StereoOnCommand(stereo);
        
        // Invoker (remote control)
        RemoteControl remote = new RemoteControl(3);
        remote.setCommand(0, livingRoomLightOn, livingRoomLightOff);
        remote.setCommand(1, kitchenLightOn, kitchenLightOff);
        remote.setCommand(2, stereoOn, new Command() {
            @Override
            public void execute() { stereo.off(); }
            @Override
            public void undo() { stereo.on(); }
        });
        
        // Test commands
        System.out.println("--- Press slot 0 ON ---");
        remote.onButtonPressed(0);
        // → Living Room light is ON
        
        System.out.println("\n--- Press slot 1 ON ---");
        remote.onButtonPressed(1);
        // → Kitchen light is ON
        
        System.out.println("\n--- Press slot 0 OFF ---");
        remote.offButtonPressed(0);
        // → Living Room light is OFF
        
        System.out.println("\n--- Press UNDO ---");
        remote.undoButtonPressed();
        // → Living Room light is ON (undo OFF command)
        
        System.out.println("\n--- Press slot 2 ON ---");
        remote.onButtonPressed(2);
        // → Living Room stereo is ON
        // → Living Room stereo volume set to 10
        
        System.out.println("\n--- Press UNDO ---");
        remote.undoButtonPressed();
        // → Living Room stereo is OFF (undo ON command)
    }
}

// Benefits:
// - Parameterize objects with commands (remote control slots)
// - Queue commands (macro commands, scheduled execution)
// - Undo/Redo support (command history)
// - Logging and recovery (replay commands after crash)
```

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">design-patterns</span>
<span class="tag">strategy</span>
<span class="tag">observer</span>
<span class="tag">command</span>
<span class="tag">behavioral</span>
<span class="tag">medior</span>
</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Gang of Four` · `Open/Closed Principle` · `Event-Driven Architecture` · `Reactive Programming` · `Undo/Redo` · `GRASP Principles`

</div>

### Design Patterns - Part 4: Summary (Myths, Performance, Tools, Q&A) {#design-patterns-summary}

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek Design Patterns-ről</strong></summary>

<div>

**❌ Tévhit 1: "Design patterns = mindig használd (over-engineering)"**

**Realitás**: Patterns = tools in toolbox (használd, ha probléma van, ne preemptive)

```java
// ❌ Over-engineering (Singleton for everything)
public class ConfigurationSingleton {
    private static ConfigurationSingleton instance;
    // ... 50 lines of double-checked locking ...
}

public class LoggerSingleton {
    private static LoggerSingleton instance;
    // ... 50 lines of double-checked locking ...
}

public class CacheSingleton {
    private static CacheSingleton instance;
    // ... 50 lines of double-checked locking ...
}
// → 150 lines wasted (Spring @Bean does this automatically!)

// ✅ YAGNI principle (use framework)
@Configuration
public class AppConfig {
    @Bean  // Spring manages singleton lifecycle
    public Configuration config() {
        return new Configuration();
    }
    
    @Bean
    public Logger logger() {
        return new Logger();
    }
    
    @Bean
    public Cache cache() {
        return new Cache();
    }
}
// → 15 lines, same result (let framework handle patterns)

// Rule: Patterns solve EXISTING problems (not hypothetical)
```

---

**❌ Tévhit 2: "Singleton = global variable (anti-pattern)"**

**Realitás**: Singleton ≠ global mutable state (enum Singleton thread-safe, immutable)

```java
// ❌ Singleton misuse (global mutable state)
public class GlobalConfig {
    private static GlobalConfig instance = new GlobalConfig();
    public Map<String, String> config = new HashMap<>();  // Mutable!
    
    public static GlobalConfig getInstance() {
        return instance;
    }
}

// Problem: Any code can modify config (hidden dependencies)
GlobalConfig.getInstance().config.put("db.url", "wrong");
// → Hard to debug, not thread-safe

// ✅ Singleton proper use (immutable, injected)
public enum DatabaseConfig {
    INSTANCE;
    
    private final String url;
    private final int maxConnections;
    
    DatabaseConfig() {
        // Load from environment (immutable after construction)
        this.url = System.getenv("DB_URL");
        this.maxConnections = Integer.parseInt(System.getenv("DB_MAX_CONNECTIONS"));
    }
    
    public String getUrl() { return url; }
    public int getMaxConnections() { return maxConnections; }
}

// Usage (immutable, no hidden dependencies):
String url = DatabaseConfig.INSTANCE.getUrl();
// → Can't modify, easy to test, thread-safe
```

---

**❌ Tévhit 3: "Factory pattern mindig jobb, mint `new`"**

**Realitás**: `new` OK for simple objects (Factory overhead for complex creation)

```java
// ❌ Factory overkill (simple object)
public class PointFactory {
    public static Point createPoint(int x, int y) {
        return new Point(x, y);  // Just wraps `new`!
    }
}

Point p = PointFactory.createPoint(10, 20);
// → Useless indirection (just use `new Point(10, 20)`)

// ✅ Factory justified (complex creation logic)
public class DatabaseConnectionFactory {
    public static Connection createConnection(String env) {
        if (env.equals("prod")) {
            // Production: connection pooling, SSL, read replicas
            HikariConfig config = new HikariConfig();
            config.setJdbcUrl(System.getenv("PROD_DB_URL"));
            config.setMaximumPoolSize(50);
            config.setConnectionTimeout(5000);
            config.setIdleTimeout(600000);
            return new HikariDataSource(config).getConnection();
        } else {
            // Dev: simple connection, in-memory H2
            return DriverManager.getConnection("jdbc:h2:mem:test");
        }
    }
}
// → Factory justified (complex logic, different implementations)

// Rule: Factory when creation logic > 3 lines OR multiple implementations
```

---

**❌ Tévhit 4: "Observer pattern = tight coupling (subject knows observers)"**

**Realitás**: Observer = loose coupling (subject only knows interface, not concrete classes)

```java
// ❌ Misconception (subject knows concrete observers)
public class StockMarket {
    private EmailNotifier emailNotifier;  // Tight coupling!
    private SMSNotifier smsNotifier;
    
    public void setPrice(String stock, double price) {
        emailNotifier.sendEmail(stock, price);
        smsNotifier.sendSMS(stock, price);
        // → Add Twitter → modify StockMarket (bad!)
    }
}

// ✅ Reality (subject only knows interface)
public class StockMarket {
    private List<StockObserver> observers;  // Interface!
    
    public void addObserver(StockObserver observer) {
        observers.add(observer);  // Loose coupling
    }
    
    public void setPrice(String stock, double price) {
        for (StockObserver observer : observers) {
            observer.update(stock, price);  // Polymorphism
        }
        // → Add Twitter observer: no modification to StockMarket!
    }
}

// Rule: Observer = subject doesn't know concrete observers (only interface)
```

---

**❌ Tévhit 5: "Design patterns = csak OOP (nem functional)"**

**Realitás**: Patterns apply to functional programming (Strategy = higher-order function)

```java
// OOP Strategy pattern (class-based)
interface PaymentStrategy {
    void pay(double amount);
}

class CreditCardStrategy implements PaymentStrategy {
    public void pay(double amount) { /* ... */ }
}

PaymentStrategy strategy = new CreditCardStrategy();
strategy.pay(100);

// Functional Strategy pattern (function-based)
Function<Double, Void> creditCardStrategy = amount -> {
    System.out.println("Paying $" + amount + " with credit card");
    return null;
};

creditCardStrategy.apply(100.0);
// → Same pattern, different paradigm (Strategy = pass function as parameter)

// OOP Observer pattern (interface + listeners)
interface Observer {
    void update(String event);
}

List<Observer> observers = new ArrayList<>();
observers.forEach(observer -> observer.update("price changed"));

// Functional Observer pattern (callbacks)
List<Consumer<String>> callbacks = new ArrayList<>();
callbacks.add(event -> System.out.println("Email: " + event));
callbacks.add(event -> System.out.println("SMS: " + event));
callbacks.forEach(callback -> callback.accept("price changed"));
// → Same pattern (Observer = callback functions)

// Rule: Patterns = language-agnostic concepts (OOP or functional)
```

</div>
</details>

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Performance Implications</strong></summary>

<div>

**1. Singleton: Lazy vs Eager initialization overhead**

```java
// Eager initialization (class loading time)
public class EagerSingleton {
    private static final EagerSingleton INSTANCE = new EagerSingleton();  // Created at class load
    
    private EagerSingleton() {
        // Heavy initialization (10ms)
        Thread.sleep(10);
    }
    
    public static EagerSingleton getInstance() {
        return INSTANCE;  // 0ns overhead (already created)
    }
}

// Lazy initialization (first call overhead)
public class LazySingleton {
    private static volatile LazySingleton instance;
    
    private LazySingleton() {
        // Heavy initialization (10ms)
        Thread.sleep(10);
    }
    
    public static LazySingleton getInstance() {
        if (instance == null) {
            synchronized (LazySingleton.class) {
                if (instance == null) {
                    instance = new LazySingleton();  // 10ms first call
                }
            }
        }
        return instance;  // 50ns overhead (volatile read + null check)
    }
}

// Benchmark:
// Eager: Startup +10ms, getInstance() = 0ns
// Lazy:  Startup +0ms, getInstance() = 10ms (first call), 50ns (subsequent calls)

// Rule: Eager if always needed, Lazy if rarely needed
```

**2. Factory: Reflection overhead vs direct instantiation**

```java
// Direct instantiation (fast)
public class DirectFactory {
    public static Shape createShape(String type) {
        switch (type) {
            case "circle": return new Circle();  // 5ns
            case "rectangle": return new Rectangle();
            default: throw new IllegalArgumentException();
        }
    }
}

// Reflection factory (flexible but slow)
public class ReflectionFactory {
    public static Shape createShape(String className) throws Exception {
        Class<?> clazz = Class.forName(className);
        return (Shape) clazz.getDeclaredConstructor().newInstance();  // 200ns (40x slower!)
    }
}

// Benchmark (1M creations):
// Direct:     5ms
// Reflection: 200ms (40x slower)

// Rule: Reflection OK for startup (Spring Bean creation), avoid in hot path
```

**3. Decorator: Wrapping overhead**

```java
// No decorators (direct call)
Coffee coffee = new SimpleCoffee();
double cost = coffee.getCost();  // 2ns (direct field access)

// 3 decorators (method chaining)
Coffee coffee = new CaramelDecorator(
                  new SugarDecorator(
                    new MilkDecorator(
                      new SimpleCoffee())));
double cost = coffee.getCost();  // 8ns (4 method calls)

// Overhead: 6ns per 3 decorators (negligible for non-hot-path)

// Benchmark (1M calls):
// No decorator: 2ms
// 3 decorators: 8ms (4x slower, but still negligible)

// Rule: Decorator overhead acceptable (readability > 6ns)
```

**4. Observer: Notification overhead (O(n) observers)**

```java
// Subject notifies N observers
public class StockMarket {
    private List<Observer> observers = new ArrayList<>();  // N observers
    
    public void setPrice(String stock, double price) {
        for (Observer observer : observers) {
            observer.update(stock, price);  // O(n) notification
        }
    }
}

// Benchmark (varying N observers):
// 1 observer:    10μs
// 10 observers:  100μs (linear growth)
// 100 observers: 1ms
// 1000 observers: 10ms

// Problem: Slow observer blocks all notifications
public class SlowObserver implements Observer {
    public void update(String stock, double price) {
        Thread.sleep(100);  // 100ms slow operation
        // → Blocks 999 other observers!
    }
}

// Solution: Async notification (parallel execution)
public class AsyncStockMarket {
    private List<Observer> observers = new ArrayList<>();
    private ExecutorService executor = Executors.newFixedThreadPool(10);
    
    public void setPrice(String stock, double price) {
        for (Observer observer : observers) {
            executor.submit(() -> observer.update(stock, price));  // Parallel
        }
    }
}

// Benchmark (1000 observers, 10 slow):
// Sync:  1000ms (blocked by slow observers)
// Async: 100ms (parallel execution, 10x faster!)

// Rule: Async notification for > 10 observers OR slow observers
```

**5. Command: Undo stack memory overhead**

```java
// Command stores parameters for undo
public class InsertCommand implements Command {
    private TextEditor editor;
    private String text;  // 100 chars = ~200 bytes
    
    public void execute() {
        editor.insertText(text);
    }
    
    public void undo() {
        editor.deleteText(text.length());
    }
}

// Undo history (stack of commands)
Stack<Command> history = new Stack<>();

// Memory usage (1000 commands):
// 1000 commands × 200 bytes = 200KB

// Problem: Large undo history (10k commands = 2MB)
// Solution: Limit undo history
public class CommandManager {
    private static final int MAX_HISTORY = 100;
    private Deque<Command> history = new ArrayDeque<>(MAX_HISTORY);
    
    public void executeCommand(Command cmd) {
        cmd.execute();
        if (history.size() >= MAX_HISTORY) {
            history.removeFirst();  // Remove oldest command
        }
        history.addLast(cmd);
    }
}

// Rule: Limit undo history to prevent memory leak
```

</div>
</details>

</div>

<div class="concept-section tools">

<details>
<summary>🧰 <strong>Design Pattern Tools & Frameworks</strong></summary>

<div>

**1. Spring Framework (pattern-heavy)**

```java
// Singleton: @Bean default scope
@Configuration
public class AppConfig {
    @Bean  // Singleton by default (one instance per container)
    public DataSource dataSource() {
        return new HikariDataSource();
    }
    
    @Bean
    @Scope("prototype")  // New instance per request
    public ShoppingCart cart() {
        return new ShoppingCart();
    }
}

// Factory: FactoryBean interface
@Component
public class ConnectionFactoryBean implements FactoryBean<Connection> {
    @Override
    public Connection getObject() {
        return createConnection();  // Factory method
    }
    
    @Override
    public Class<?> getObjectType() {
        return Connection.class;
    }
}

// Proxy: AOP for @Transactional, @Cacheable
@Service
public class OrderService {
    @Transactional  // Spring creates proxy
    public void createOrder(Order order) {
        // Business logic...
    }
}

// Observer: @EventListener
@Component
public class EmailListener {
    @EventListener  // Observer subscribes to events
    public void handleOrderCreated(OrderCreatedEvent event) {
        // Send email...
    }
}
```

**2. Lombok (generates patterns)**

```java
// Builder: @Builder annotation
@Builder
public class User {
    private String username;
    private String email;
    private int age;
}

// Generated builder:
User user = User.builder()
    .username("john")
    .email("john@example.com")
    .age(30)
    .build();

// Singleton: @UtilityClass (static methods)
@UtilityClass
public class MathUtils {
    public int add(int a, int b) {
        return a + b;
    }
}
// → private constructor + static methods (Singleton pattern)
```

**3. IntelliJ IDEA (pattern templates)**

```
Tools → Generate... → Singleton
→ Generates double-checked locking Singleton

Tools → Generate... → Builder
→ Generates Builder pattern with fluent API

Tools → Refactor → Extract Interface
→ Helps create Strategy pattern (extract interface from concrete class)

Tools → Generate... → Delegate Methods
→ Helps create Adapter/Proxy (delegate to wrapped object)
```

**4. Design Pattern Libraries**

```java
// Guava EventBus (Observer pattern)
EventBus eventBus = new EventBus();
eventBus.register(new EmailListener());  // Register observer
eventBus.post(new OrderCreatedEvent());  // Notify observers

// Java Dynamic Proxy (Proxy pattern)
InvocationHandler handler = (proxy, method, args) -> {
    System.out.println("Before: " + method.getName());
    Object result = method.invoke(target, args);
    System.out.println("After: " + method.getName());
    return result;
};

Service proxy = (Service) Proxy.newProxyInstance(
    Service.class.getClassLoader(),
    new Class[]{Service.class},
    handler
);

// RxJava (Observer pattern for reactive streams)
Observable<String> observable = Observable.just("Event 1", "Event 2");
observable.subscribe(event -> System.out.println("Received: " + event));
```

**5. Effective Java Recommendations (Joshua Bloch)**

```
Item 2: Builder pattern (4+ parameters)
→ Use Builder for constructors with many optional parameters

Item 3: Enum Singleton
→ Best Singleton implementation (thread-safe, serialization-safe)

Item 15: Minimize mutability
→ Decorator pattern for adding behavior (don't modify original)

Item 18: Favor composition over inheritance
→ Strategy, Decorator patterns (composition > inheritance)

Item 52: Refer to objects by interfaces
→ Factory pattern (return interface, not concrete class)
```

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>8 Design Pattern Mikrotanulási Promptok</strong></summary>

<div>

**Q1: Mikor használj Singleton-t és mikor Dependency Injection-t?**

<details>
<summary>Kattints a válaszért</summary>

**Singleton**: Csak akkor, ha VALÓBAN egy instance kell (thread pool, cache, logger)

```java
// ✅ Singleton justified (connection pool shared across app)
public enum ConnectionPool {
    INSTANCE;
    
    private final List<Connection> connections;
    
    ConnectionPool() {
        connections = createConnections(10);
    }
}

// ❌ Singleton misuse (should be DI)
public enum UserService {
    INSTANCE;  // Why singleton? Could have multiple services!
}
```

**Dependency Injection**: Default choice (testable, flexible, decoupled)

```java
// ✅ DI (testable, mockable)
@Service
public class OrderService {
    private final PaymentService paymentService;
    
    @Autowired
    public OrderService(PaymentService paymentService) {
        this.paymentService = paymentService;  // Injected
    }
}

// Test: easy to mock
@Test
void testOrder() {
    PaymentService mockPayment = mock(PaymentService.class);
    OrderService service = new OrderService(mockPayment);
    // ...
}
```

**Decision matrix**:
- **Singleton**: Global shared resource (DB pool, cache, config)
- **DI**: Everything else (services, repositories, controllers)

**Rule**: Singleton = exception, DI = default

</details>

---

**Q2: Factory vs Builder: mikor melyiket használd?**

<details>
<summary>Kattints a válaszért</summary>

**Factory**: Amikor MELYIK osztályt kell létrehozni (runtime type determination)

```java
// Factory: Choose WHICH implementation
public interface PaymentMethod { void pay(double amount); }

public class PaymentFactory {
    public static PaymentMethod create(String type) {
        switch (type) {
            case "credit": return new CreditCardPayment();
            case "paypal": return new PayPalPayment();
            // → Runtime decision: which class?
        }
    }
}
```

**Builder**: Amikor HOGYAN kell létrehozni (many optional parameters)

```java
// Builder: Construct object with many parameters
public class HttpRequest {
    private HttpRequest(Builder builder) { /* ... */ }
    
    public static class Builder {
        public Builder url(String url) { /* ... */ }
        public Builder header(String key, String value) { /* ... */ }
        public Builder timeout(int timeout) { /* ... */ }
        // → Many optional parameters
    }
}

HttpRequest request = new HttpRequest.Builder("https://api.com")
    .header("Auth", "token")
    .timeout(5000)
    .build();
```

**Decision matrix**:
- **Factory**: Multiple implementations (CreditCard vs PayPal)
- **Builder**: Single class, many optional params (HttpRequest with 10 params)

**Can combine**: Factory returns Builder

```java
public class PaymentFactory {
    public static CreditCardPayment.Builder createCreditCard() {
        return new CreditCardPayment.Builder();
    }
}

Payment payment = PaymentFactory.createCreditCard()
    .cardNumber("1234")
    .cvv("123")
    .build();
```

</details>

---

**Q3: Adapter vs Decorator: mi a különbség?**

<details>
<summary>Kattints a válaszért</summary>

**Adapter**: Convert INCOMPATIBLE interfaces (translation)

```java
// Third-party API (Fahrenheit)
class WeatherAPI {
    String getTemperature() { return "75°F"; }
}

// Our app (Celsius)
interface TemperatureService {
    double getTempCelsius();
}

// Adapter TRANSLATES Fahrenheit → Celsius
class WeatherAdapter implements TemperatureService {
    private WeatherAPI api = new WeatherAPI();
    
    public double getTempCelsius() {
        String temp = api.getTemperature();  // "75°F"
        double f = Double.parseDouble(temp.replace("°F", ""));
        return (f - 32) * 5.0 / 9.0;  // Convert to Celsius
    }
}
// → Same data, different interface (translation)
```

**Decorator**: Add BEHAVIOR to existing object (enhancement)

```java
// Coffee interface
interface Coffee {
    double getCost();
}

// Simple coffee
class SimpleCoffee implements Coffee {
    public double getCost() { return 2.0; }
}

// Decorator ADDS behavior (milk +$0.5)
class MilkDecorator implements Coffee {
    private Coffee coffee;
    
    public MilkDecorator(Coffee coffee) {
        this.coffee = coffee;
    }
    
    public double getCost() {
        return coffee.getCost() + 0.5;  // ADD milk cost
    }
}

Coffee coffee = new MilkDecorator(new SimpleCoffee());
coffee.getCost();  // 2.5 (2.0 + 0.5)
// → Same interface, ADDED behavior (enhancement)
```

**Key difference**:
- **Adapter**: CHANGE interface (Fahrenheit → Celsius)
- **Decorator**: KEEP interface, ADD behavior (Coffee → Coffee with milk)

</details>

---

**Q4: Proxy vs Decorator: mikor melyiket használd?**

<details>
<summary>Kattints a válaszért</summary>

**Proxy**: CONTROL access to object (lazy loading, caching, security)

```java
// Proxy: Lazy loading (don't load image until needed)
class ProxyImage implements Image {
    private RealImage realImage;
    private String filename;
    
    public void display() {
        if (realImage == null) {
            realImage = new RealImage(filename);  // Load on first access
        }
        realImage.display();
    }
}
// → Controls WHEN object is created/accessed
```

**Decorator**: ADD behavior to object (extra features)

```java
// Decorator: Add scrollbars to window
class ScrollbarDecorator implements Window {
    private Window window;
    
    public void draw() {
        window.draw();  // Original behavior
        drawScrollbars();  // ADD behavior
    }
}
// → Adds NEW functionality
```

**Key difference**:
- **Proxy**: CONTROL access (when/how object is accessed)
- **Decorator**: ADD functionality (extra features on top)

**Memory trick**:
- **Proxy** = Bouncer (controls who enters club)
- **Decorator** = Gift wrap (adds layers on top)

</details>

---

**Q5: Observer vs Pub-Sub (Event-Driven Architecture): mi a különbség?**

<details>
<summary>Kattints a válaszért</summary>

**Observer**: Direct subscription (subject knows observers)

```java
// Observer: Direct connection
class StockMarket {
    private List<Observer> observers = new ArrayList<>();
    
    public void addObserver(Observer o) {
        observers.add(o);  // Subject KNOWS observers
    }
    
    public void setPrice(double price) {
        for (Observer o : observers) {
            o.update(price);  // Direct call
        }
    }
}

// Usage:
StockMarket market = new StockMarket();
market.addObserver(new EmailNotifier());  // Direct registration
market.setPrice(150.0);  // Direct notification
```

**Pub-Sub**: Message broker (decoupled via broker)

```java
// Pub-Sub: Message broker mediates
class EventBus {
    private Map<String, List<Subscriber>> subscribers = new HashMap<>();
    
    public void subscribe(String topic, Subscriber sub) {
        subscribers.get(topic).add(sub);
    }
    
    public void publish(String topic, Object data) {
        for (Subscriber sub : subscribers.get(topic)) {
            sub.handle(data);  // Broker mediates
        }
    }
}

// Usage:
EventBus bus = new EventBus();
bus.subscribe("stock.price", new EmailNotifier());  // Via broker
bus.publish("stock.price", 150.0);  // Publisher doesn't know subscribers
```

**Key difference**:
- **Observer**: Subject → Observers (direct, synchronous)
- **Pub-Sub**: Publisher → Broker → Subscribers (indirect, asynchronous)

**When to use**:
- **Observer**: Same process, tight coupling OK (UI events)
- **Pub-Sub**: Distributed systems, loose coupling (microservices)

</details>

---

**Q6: Strategy vs State Pattern: mi a különbség?**

<details>
<summary>Kattints a válaszért</summary>

**Strategy**: Algorithm varies (client chooses strategy)

```java
// Strategy: Client chooses sorting algorithm
interface SortStrategy {
    void sort(int[] array);
}

class QuickSort implements SortStrategy { /* ... */ }
class MergeSort implements SortStrategy { /* ... */ }

// Client decides strategy
Sorter sorter = new Sorter();
sorter.setStrategy(new QuickSort());  // Client choice
sorter.sort(array);
```

**State**: Behavior varies by STATE (object changes own behavior)

```java
// State: Object behavior changes based on internal state
class TCPConnection {
    private State currentState = new ClosedState();
    
    public void open() {
        currentState.open(this);  // State decides behavior
    }
    
    public void close() {
        currentState.close(this);
    }
    
    void setState(State state) {
        this.currentState = state;
    }
}

interface State {
    void open(TCPConnection conn);
    void close(TCPConnection conn);
}

class ClosedState implements State {
    public void open(TCPConnection conn) {
        System.out.println("Opening connection...");
        conn.setState(new OpenState());  // Transition to Open
    }
    
    public void close(TCPConnection conn) {
        System.out.println("Already closed");
    }
}

class OpenState implements State {
    public void open(TCPConnection conn) {
        System.out.println("Already open");
    }
    
    public void close(TCPConnection conn) {
        System.out.println("Closing connection...");
        conn.setState(new ClosedState());  // Transition to Closed
    }
}
```

**Key difference**:
- **Strategy**: CLIENT chooses algorithm (external decision)
- **State**: OBJECT changes behavior based on internal state (internal transition)

**Memory trick**:
- **Strategy** = GPS route algorithm (you choose: fastest/shortest)
- **State** = Traffic light (internal state: red → green → yellow)

</details>

---

**Q7: Mikor over-engineering a Design Pattern használata?**

<details>
<summary>Kattints a válaszért</summary>

**Over-engineering signs**:

1. **Pattern for simple problem** (Singleton for non-shared resource)
```java
// ❌ Over-engineering (User doesn't need Singleton)
public enum UserService {
    INSTANCE;  // Why? Multiple instances OK!
}

// ✅ Simple (just use @Service)
@Service
public class UserService { /* ... */ }
```

2. **Premature abstraction** (Factory with one implementation)
```java
// ❌ Over-engineering (only CreditCard, no other payment types)
interface PaymentMethod { void pay(); }
class CreditCardPayment implements PaymentMethod { /* ... */ }

class PaymentFactory {
    public static PaymentMethod create() {
        return new CreditCardPayment();  // Only one type!
    }
}
// → Just use `new CreditCardPayment()` directly

// ✅ Factory justified (2+ implementations)
// CreditCard, PayPal, Bitcoin → Factory makes sense
```

3. **Pattern without problem** (Builder for 2 parameters)
```java
// ❌ Over-engineering (only 2 required params)
class User {
    private User(Builder builder) { /* ... */ }
    
    static class Builder {
        public Builder username(String u) { /* ... */ }
        public Builder email(String e) { /* ... */ }
        public User build() { return new User(this); }
    }
}
// → Overkill (just use constructor)

// ✅ Simple constructor
class User {
    public User(String username, String email) { /* ... */ }
}
```

**Rule**: YAGNI (You Aren't Gonna Need It)
- Use pattern when problem EXISTS (not "might exist")
- Refactor to pattern when 2nd use case appears (not preemptive)

</details>

---

**Q8: Melyek a Spring Framework által használt Design Patterns?**

<details>
<summary>Kattints a válaszért</summary>

**Spring = Design Pattern showcase**:

1. **Singleton** (default @Bean scope)
```java
@Bean  // Singleton by default
public DataSource dataSource() {
    return new HikariDataSource();
}
```

2. **Factory** (BeanFactory, ApplicationContext)
```java
ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
UserService service = context.getBean(UserService.class);  // Factory creates bean
```

3. **Proxy** (AOP for @Transactional, @Cacheable, @Async)
```java
@Transactional  // Spring creates proxy
public void createOrder() { /* ... */ }
// → Proxy adds: begin transaction, commit, rollback
```

4. **Decorator** (BeanPostProcessor, HandlerInterceptor)
```java
@Component
public class LoggingInterceptor implements HandlerInterceptor {
    public boolean preHandle(HttpServletRequest req, ...) {
        // Decorate request with logging
    }
}
```

5. **Template Method** (JdbcTemplate, RestTemplate)
```java
jdbcTemplate.query("SELECT * FROM users", (rs, rowNum) -> {
    // Template handles: connection, statement, close
    // You provide: SQL + row mapper
});
```

6. **Observer** (@EventListener, ApplicationEvent)
```java
@EventListener
public void handleOrderCreated(OrderCreatedEvent event) {
    // Observer reacts to event
}
```

7. **Strategy** (@Conditional, @Profile)
```java
@Bean
@Profile("prod")
public DataSource prodDataSource() { /* ... */ }

@Bean
@Profile("dev")
public DataSource devDataSource() { /* ... */ }
// → Strategy: choose bean based on profile
```

8. **Builder** (UriComponentsBuilder, MockMvcBuilders)
```java
URI uri = UriComponentsBuilder.fromPath("/api/users")
    .queryParam("page", 1)
    .queryParam("size", 20)
    .build()
    .toUri();
```

**Insight**: Understanding patterns = understanding Spring internals

</details>

</div>
</details>

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">design-patterns</span>
<span class="tag">gang-of-four</span>
<span class="tag">creational</span>
<span class="tag">structural</span>
<span class="tag">behavioral</span>
<span class="tag">spring</span>
<span class="tag">senior</span>
</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Gang of Four Book` · `SOLID Principles` · `Refactoring` · `Clean Code` · `Spring Framework` · `Effective Java` · `GRASP Principles`

</div>

### GRASP Principles {#grasp-principles}

<div class="concept-section mental-model">

📋 **Fogalom meghatározása**  
*GRASP (General Responsibility Assignment Software Patterns) kilenc alapelv az OOP felelősségek allokálására: Information Expert (aki tudja az adatot, az végezze), Creator (ki hozzon létre objektumot), Controller (use case koordináció), Low Coupling, High Cohesion, Polymorphism (type variation kezelése), Pure Fabrication (helper osztályok), Indirection (közvetítő objektum), Protected Variations (interface mögé rejtés). Craig Larman dolgozta ki.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Responsibility assignment**: segít eldönteni, melyik osztály mit csináljon
- **Low coupling, high cohesion**: automatikusan jobb design-t eredményez
- **OO design thinking**: strukturált gondolkodási keretrendszer

</div>

General Responsibility Assignment Software Patterns - kilenc alapelv az objektumok közötti felelősségek elosztására.

<div class="runnable-model">

**Runnable mental model**
```java
// INFORMATION EXPERT - aki a legtöbb infóval rendelkezik
class Order {
    private List<OrderItem> items;
    private Customer customer;
    
    // Order tud mindent a tételekről -> ő számítsa ki a totalt
    public Money calculateTotal() {
        return items.stream()
                   .map(OrderItem::getSubtotal)
                   .reduce(Money.ZERO, Money::add);
    }
}

// CREATOR - A létrehoz B-t, ha A tartalmazza/aggregálja B-t
class ShoppingCart {
    private List<CartItem> items = new ArrayList<>();
    
    // ShoppingCart hozza létre a CartItem-eket, mert ő kezeli őket
    public void addProduct(Product product, int quantity) {
        CartItem item = new CartItem(product, quantity); // CREATOR
        items.add(item);
    }
}

// CONTROLLER - koordinálja a use case-eket
class OrderController {
    private OrderService orderService;
    private PaymentService paymentService;
    private NotificationService notificationService;
    
    // Controller koordinálja a komplex business operation-t
    public void processOrder(OrderRequest request) {
        Order order = orderService.createOrder(request);
        PaymentResult payment = paymentService.processPayment(order);
        notificationService.sendConfirmation(order, payment);
    }
}

// LOW COUPLING - minimális függőségek
interface PaymentGateway {
    PaymentResult charge(Money amount, PaymentMethod method);
}

class PaymentService {
    private PaymentGateway gateway; // interface dependency - low coupling
    
    public PaymentService(PaymentGateway gateway) {
        this.gateway = gateway;
    }
}

// HIGH COHESION - kapcsolódó funkcionalitás együtt
class PriceCalculator {
    public Money calculateBasePrice(Product product, int quantity) { /* ... */ }
    public Money calculateDiscount(Money basePrice, Customer customer) { /* ... */ }
    public Money calculateTax(Money discountedPrice, Address address) { /* ... */ }
    public Money calculateShipping(Money subtotal, Address address) { /* ... */ }
    // Minden metódus price calculation-nal kapcsolatos
}

// POLYMORPHISM - type-based behavior variation
interface DiscountStrategy {
    Money calculateDiscount(Money amount);
}

class SeasonalDiscountStrategy implements DiscountStrategy {
    public Money calculateDiscount(Money amount) {
        return amount.multiply(0.1); // 10% off
    }
}

class VIPDiscountStrategy implements DiscountStrategy {
    public Money calculateDiscount(Money amount) {
        return amount.multiply(0.2); // 20% off
    }
}
```
*Figyeld meg: minden osztály világos felelősséggel rendelkezik, minimális függőségekkel.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „GRASP túl bonyolult kezdőknek" → Természetes OO gondolkodást segít kialakítani
- „Controller = MVC Controller" → GRASP Controller általánosabb fogalom
- „Information Expert mindig tud mindent" → Csak a szükséges információt kell tudnia

</div>
</details>

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Performance corner</strong></summary>

<div>

- **Indirection**: új rétegek költsége vs flexibility gain
- **Polymorphism overhead**: modern JVM-ek jól optimalizálják
- **High cohesion**: jobb cache locality, kevesebb object creation

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) Mikor használ Indirection pattern-t?
<details><summary>Válasz mutatása</summary>
Ha direct coupling problémát okoz, vagy ha runtime flexibility kell (pl. strategy pattern).
</details>

2) Mi a Pure Fabrication?
<details><summary>Válasz mutatása</summary>
Olyan osztály, ami nem felel meg domain concept-nek, de szükséges a jó design-hoz (pl. DatabaseMapper).
</details>

3) Mikor sérti az Information Expert-et?
<details><summary>Válasz mutatása</summary>
Ha egy osztálynak túl sok információ kell ahhoz, hogy döntést hozzon - akkor delegation vagy strategy kell.
</details>

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- GRASP vs SOLID közötti kapcsolatok magyarázata
- Konkrét példa Creator pattern alkalmazására
- Protected Variations vs Open/Closed Principle különbsége

</div>
</details>

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">medior</span>
<span class="tag">grasp</span>
<span class="tag">responsibility-assignment</span>
<span class="tag">design-principles</span>
</div>

<!-- tags: oop, medior, grasp, responsibility-assignment, design-principles -->

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`SOLID Principles` · `Design Patterns` · `Architecture Patterns` · `Domain Driven Design` · `Clean Code`

</div>

### Composition vs Inheritance {#composition-vs-inheritance}

<div class="concept-section definition">

📋 **Fogalom meghatározása**

**Inheritance** = **"is-a" relationship** (öröklődés, osztály hierarchia)
- Child class extends parent class
- Inherits all fields and methods
- Tight coupling (child depends on parent implementation)
- Compile-time relationship (static)

**Composition** = **"has-a" relationship** (tartalmazás, objektum összeállítás)
- Class contains instance of another class
- Delegates method calls to contained object
- Loose coupling (can swap implementations)
- Runtime relationship (dynamic)

**Key principle**: **"Favor composition over inheritance"** (Gang of Four, Design Patterns book)

```java
// Inheritance (is-a)
class Employee extends Person {
    // Employee IS-A Person
    // Inherits: name, age, address from Person
}

// Composition (has-a)
class Car {
    private Engine engine;  // Car HAS-AN Engine
    private Transmission transmission;  // Car HAS-A Transmission
    
    public void start() {
        engine.start();  // Delegate to Engine
    }
}
```

**Why composition preferred**:
1. **Fragile Base Class Problem**: Parent class changes break child classes
2. **Tight coupling**: Child depends on parent implementation details
3. **Limited flexibility**: Can't change parent at runtime
4. **Multiple inheritance issues**: Diamond problem, method name conflicts

</div>

<div class="concept-section why-matters">

💡 **Miért számít a Composition vs Inheritance?**

**1. Fragile Base Class Problem (inheritance breaks encapsulation)**

```java
// ❌ Inheritance: Parent change breaks child
class ArrayList {
    private Object[] elements;
    private int size = 0;
    
    public void add(Object element) {
        elements[size++] = element;
    }
    
    public void addAll(Collection c) {
        for (Object e : c) {
            add(e);  // Calls add() for each element
        }
    }
}

class CountingArrayList extends ArrayList {
    private int addCount = 0;
    
    @Override
    public void add(Object element) {
        addCount++;  // Count additions
        super.add(element);
    }
    
    @Override
    public void addAll(Collection c) {
        addCount += c.size();  // Count all at once
        super.addAll(c);  // Calls parent addAll()
    }
}

// Usage:
CountingArrayList list = new CountingArrayList();
list.addAll(Arrays.asList("A", "B", "C"));
System.out.println(list.addCount);  // Expected: 3, Actual: 6!

// Problem: Parent addAll() calls add() for each element
// → Child add() increments addCount (3 times)
// → Child addAll() already incremented addCount (3 times)
// → Total: 6 increments (DOUBLE COUNTING!)

// What if parent changes implementation?
// Parent: addAll() now uses System.arraycopy() (no add() calls)
// → Child addAll() only increments 3, but add() never called
// → Fragile! Child breaks when parent changes implementation
```

**✅ Composition: Immune to parent changes**

```java
// Composition: Wrapper delegates to contained object
class CountingArrayList<E> {
    private List<E> list;  // HAS-A List (composition)
    private int addCount = 0;
    
    public CountingArrayList() {
        this.list = new ArrayList<>();  // Can swap ArrayList → LinkedList
    }
    
    public void add(E element) {
        addCount++;
        list.add(element);  // Delegate to contained list
    }
    
    public void addAll(Collection<E> c) {
        addCount += c.size();
        list.addAll(c);  // Delegate to contained list
    }
    
    public int getAddCount() {
        return addCount;
    }
}

// Usage:
CountingArrayList<String> list = new CountingArrayList<>();
list.addAll(Arrays.asList("A", "B", "C"));
System.out.println(list.getAddCount());  // Correct: 3

// Benefits:
// - No dependency on ArrayList implementation details
// - ArrayList changes don't break CountingArrayList
// - Can swap ArrayList → LinkedList at runtime
```

**2. Runtime flexibility (composition allows swapping implementations)**

```java
// ❌ Inheritance: Fixed at compile-time
class FileLogger extends Logger {
    // Can only log to file (fixed at compile-time)
}

class DatabaseLogger extends Logger {
    // Can only log to database (fixed at compile-time)
}

// Problem: Can't change logger type at runtime

// ✅ Composition: Swap at runtime
interface LogDestination {
    void write(String message);
}

class FileDestination implements LogDestination {
    public void write(String message) {
        // Write to file
    }
}

class DatabaseDestination implements LogDestination {
    public void write(String message) {
        // Write to database
    }
}

class Logger {
    private LogDestination destination;  // Composition
    
    public Logger(LogDestination destination) {
        this.destination = destination;
    }
    
    public void setDestination(LogDestination destination) {
        this.destination = destination;  // Swap at runtime!
    }
    
    public void log(String message) {
        destination.write(message);  // Delegate
    }
}

// Usage:
Logger logger = new Logger(new FileDestination());
logger.log("Starting...");  // Logs to file

// Switch to database (runtime!)
logger.setDestination(new DatabaseDestination());
logger.log("Switched to DB");  // Logs to database

// Benefits:
// - Runtime flexibility (can't do with inheritance)
// - Configuration-driven (read from config file)
// - Testing (inject mock destination)
```

**3. Multiple behaviors (composition avoids multiple inheritance diamond problem)**

```java
// ❌ Inheritance: Diamond problem (Java doesn't allow)
class FlyingRobot extends Robot, Flyable {  // ERROR: Java doesn't allow multiple inheritance
    // Which fly() to use? Robot.fly() or Flyable.fly()?
}

// ✅ Composition: Combine multiple behaviors
interface Flyable {
    void fly();
}

interface Swimmable {
    void swim();
}

class FlyingAbility implements Flyable {
    public void fly() {
        System.out.println("Flying with wings");
    }
}

class SwimmingAbility implements Swimmable {
    public void swim() {
        System.out.println("Swimming with fins");
    }
}

// Compose multiple behaviors
class Duck {
    private Flyable flyingAbility;
    private Swimmable swimmingAbility;
    
    public Duck() {
        this.flyingAbility = new FlyingAbility();
        this.swimmingAbility = new SwimmingAbility();
    }
    
    public void fly() {
        flyingAbility.fly();  // Delegate
    }
    
    public void swim() {
        swimmingAbility.swim();  // Delegate
    }
}

// Mix and match behaviors
class FlyingFish {
    private Flyable flyingAbility = new FlyingAbility();
    private Swimmable swimmingAbility = new SwimmingAbility();
    
    // Has both abilities!
}

class Penguin {
    private Swimmable swimmingAbility = new SwimmingAbility();
    // No flying ability (penguins can't fly)
}

// Benefits:
// - No diamond problem
// - Mix and match behaviors freely
// - Add behaviors at runtime
```

**4. Interface-based design (composition encourages small interfaces)**

```java
// ❌ Inheritance: Fat base class (Interface Segregation violation)
abstract class Worker {
    abstract void work();
    abstract void eat();
    abstract void sleep();
    abstract void getPaid();
}

class Robot extends Worker {
    void work() { /* ... */ }
    void eat() { throw new UnsupportedOperationException(); }  // Robot doesn't eat!
    void sleep() { throw new UnsupportedOperationException(); }  // Robot doesn't sleep!
    void getPaid() { throw new UnsupportedOperationException(); }  // Robot doesn't get paid!
}
// → Forced to implement unnecessary methods

// ✅ Composition: Small focused interfaces (Interface Segregation Principle)
interface Workable {
    void work();
}

interface Eatable {
    void eat();
}

interface Sleepable {
    void sleep();
}

interface Payable {
    void getPaid();
}

class Human implements Workable, Eatable, Sleepable, Payable {
    private Energy energy = new Energy(100);
    
    public void work() {
        energy.consume(10);
    }
    
    public void eat() {
        energy.restore(20);
    }
    
    public void sleep() {
        energy.restore(50);
    }
    
    public void getPaid() {
        // Salary logic
    }
}

class Robot implements Workable {
    private Battery battery = new Battery(100);
    
    public void work() {
        battery.consume(10);
    }
    
    // No eat, sleep, getPaid (only implements what's needed!)
}

// Benefits:
// - Robot only implements Workable (not forced to implement eat/sleep)
// - Each interface focused (Single Responsibility)
// - Easy to test (mock small interfaces)
```

</div>

<div class="concept-section runnable-model">

🚀 **Runnable Mental Model**

**1. Real-world example: Spring Security FilterChain (Composition)**

```java
// Spring Security uses composition (not inheritance) for filters

// Filter interface
public interface SecurityFilter {
    void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException;
}

// Individual filters (small, focused)
public class AuthenticationFilter implements SecurityFilter {
    @Override
    public void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        String token = request.getHeader("Authorization");
        
        if (token != null && token.startsWith("Bearer ")) {
            String jwt = token.substring(7);
            // Authenticate user with JWT
            User user = jwtService.authenticate(jwt);
            SecurityContext.setUser(user);
        }
        
        chain.doFilter(request, response);  // Continue chain
    }
}

public class AuthorizationFilter implements SecurityFilter {
    @Override
    public void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        User user = SecurityContext.getUser();
        String path = request.getRequestURI();
        
        if (!hasPermission(user, path)) {
            response.sendError(403, "Forbidden");
            return;
        }
        
        chain.doFilter(request, response);  // Continue chain
    }
    
    private boolean hasPermission(User user, String path) {
        // Check user permissions
        return user.getRoles().stream()
                .anyMatch(role -> role.hasAccess(path));
    }
}

public class CsrfFilter implements SecurityFilter {
    @Override
    public void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        if (request.getMethod().equals("POST")) {
            String csrfToken = request.getParameter("_csrf");
            String sessionToken = (String) request.getSession().getAttribute("csrf_token");
            
            if (!csrfToken.equals(sessionToken)) {
                response.sendError(403, "Invalid CSRF token");
                return;
            }
        }
        
        chain.doFilter(request, response);  // Continue chain
    }
}

// FilterChain composes filters (not inheritance!)
public class FilterChain {
    private List<SecurityFilter> filters;
    private int currentIndex = 0;
    
    public FilterChain(List<SecurityFilter> filters) {
        this.filters = new ArrayList<>(filters);
    }
    
    public void doFilter(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
        if (currentIndex < filters.size()) {
            SecurityFilter filter = filters.get(currentIndex);
            currentIndex++;
            filter.doFilter(request, response, this);  // Recursive call
        }
    }
}

// Configuration (compose filters at runtime!)
@Configuration
public class SecurityConfig {
    @Bean
    public FilterChain filterChain() {
        return new FilterChain(Arrays.asList(
            new AuthenticationFilter(),
            new AuthorizationFilter(),
            new CsrfFilter()
            // Add more filters (composition!)
        ));
    }
}

// Usage:
FilterChain chain = filterChain();
chain.doFilter(request, response);
// → Executes: Authentication → Authorization → CSRF

// Benefits of composition:
// 1. Add/remove filters at runtime (can't do with inheritance)
// 2. Change filter order (configuration-driven)
// 3. Each filter focused (Single Responsibility)
// 4. Easy to test (mock individual filters)
// 5. No inheritance hierarchy (avoid fragile base class)
```

**2. Refactoring: Inheritance → Composition**

```java
// ❌ BEFORE: Inheritance hierarchy (rigid, fragile)
abstract class Vehicle {
    protected String brand;
    protected String model;
    protected Engine engine;
    
    public void start() {
        engine.start();
        System.out.println(brand + " " + model + " started");
    }
    
    public void stop() {
        engine.stop();
        System.out.println(brand + " " + model + " stopped");
    }
    
    public abstract void drive();
}

class Car extends Vehicle {
    @Override
    public void drive() {
        System.out.println("Driving on road");
    }
}

class ElectricCar extends Car {
    private Battery battery;
    
    @Override
    public void start() {
        battery.charge();
        super.start();
    }
}

class HybridCar extends Car {
    private Battery battery;
    private FuelTank fuelTank;
    
    @Override
    public void start() {
        // Complex logic: use battery or fuel?
        if (battery.getCharge() > 20) {
            battery.discharge();
        } else {
            fuelTank.consume();
        }
        super.start();
    }
}

// Problem: Deep inheritance hierarchy (Car → ElectricCar, Car → HybridCar)
// → Fragile: Car changes break ElectricCar and HybridCar
// → Rigid: Can't have ElectricTruck (would need to duplicate ElectricCar logic)

// ✅ AFTER: Composition (flexible, maintainable)
interface PowerSource {
    void start();
    void stop();
    boolean isAvailable();
}

class ElectricPowerSource implements PowerSource {
    private Battery battery;
    
    public void start() {
        battery.discharge();
        System.out.println("Electric motor started");
    }
    
    public void stop() {
        System.out.println("Electric motor stopped");
    }
    
    public boolean isAvailable() {
        return battery.getCharge() > 10;
    }
}

class GasPowerSource implements PowerSource {
    private FuelTank fuelTank;
    
    public void start() {
        fuelTank.consume();
        System.out.println("Gas engine started");
    }
    
    public void stop() {
        System.out.println("Gas engine stopped");
    }
    
    public boolean isAvailable() {
        return fuelTank.getLevel() > 5;
    }
}

class HybridPowerSource implements PowerSource {
    private PowerSource electric;
    private PowerSource gas;
    
    public HybridPowerSource(PowerSource electric, PowerSource gas) {
        this.electric = electric;
        this.gas = gas;
    }
    
    public void start() {
        if (electric.isAvailable()) {
            electric.start();
        } else {
            gas.start();
        }
    }
    
    public void stop() {
        electric.stop();
        gas.stop();
    }
    
    public boolean isAvailable() {
        return electric.isAvailable() || gas.isAvailable();
    }
}

// Vehicle uses composition (HAS-A PowerSource)
class Vehicle {
    private String brand;
    private String model;
    private PowerSource powerSource;  // Composition!
    
    public Vehicle(String brand, String model, PowerSource powerSource) {
        this.brand = brand;
        this.model = model;
        this.powerSource = powerSource;
    }
    
    public void start() {
        powerSource.start();
        System.out.println(brand + " " + model + " started");
    }
    
    public void stop() {
        powerSource.stop();
        System.out.println(brand + " " + model + " stopped");
    }
}

// Usage (flexible composition):
Vehicle electricCar = new Vehicle("Tesla", "Model 3", 
    new ElectricPowerSource(new Battery(75)));

Vehicle gasCar = new Vehicle("Toyota", "Camry", 
    new GasPowerSource(new FuelTank(60)));

Vehicle hybridCar = new Vehicle("Toyota", "Prius",
    new HybridPowerSource(
        new ElectricPowerSource(new Battery(8)),
        new GasPowerSource(new FuelTank(45))
    ));

// Add new vehicle types (composition!)
Vehicle electricTruck = new Vehicle("Rivian", "R1T", 
    new ElectricPowerSource(new Battery(135)));

// Benefits:
// 1. No inheritance hierarchy (flat structure)
// 2. PowerSource is swappable (Strategy pattern)
// 3. Easy to add new power sources (Open/Closed)
// 4. Vehicle doesn't know PowerSource implementation details (loose coupling)
// 5. Can reuse ElectricPowerSource for Car, Truck, Motorcycle (composition!)
```

**3. When inheritance IS appropriate**

```java
// ✅ Inheritance OK: True "is-a" relationship + no implementation inheritance

// Abstract interface-like base class
abstract class Shape {
    // No state (no fields)
    // Only abstract methods (like interface)
    public abstract double area();
    public abstract double perimeter();
}

class Circle extends Shape {
    private double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
    
    @Override
    public double perimeter() {
        return 2 * Math.PI * radius;
    }
}

class Rectangle extends Shape {
    private double width;
    private double height;
    
    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
    
    @Override
    public double area() {
        return width * height;
    }
    
    @Override
    public double perimeter() {
        return 2 * (width + height);
    }
}

// Why inheritance OK here:
// 1. Circle IS-A Shape (true is-a relationship)
// 2. No implementation inheritance (only abstract methods)
// 3. No state in parent (no fragile base class problem)
// 4. Polymorphism needed (List<Shape> can hold Circle, Rectangle)

// Usage (polymorphism):
List<Shape> shapes = Arrays.asList(
    new Circle(5),
    new Rectangle(10, 20)
);

double totalArea = shapes.stream()
    .mapToDouble(Shape::area)
    .sum();

// Better alternative: Interface (Java 8+)
interface Shape {
    double area();
    double perimeter();
    
    // Default method (composition!)
    default void printInfo() {
        System.out.println("Area: " + area() + ", Perimeter: " + perimeter());
    }
}
// → Interface preferred over abstract class (more flexible)
```

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek Composition vs Inheritance-ről</strong></summary>

<div>

**❌ Tévhit 1: "Inheritance always bad (never use)"**

**Realitás**: Inheritance OK for interface-like contracts (no implementation inheritance)

```java
// ❌ Misconception: Never use inheritance
// "Always use composition, inheritance is evil!"

// ✅ Reality: Inheritance OK for pure abstractions
abstract class Repository<T> {
    public abstract T findById(Long id);  // No implementation
    public abstract List<T> findAll();    // No implementation
}

class UserRepository extends Repository<User> {
    @Override
    public User findById(Long id) {
        // Implementation
    }
    
    @Override
    public List<User> findAll() {
        // Implementation
    }
}

// Why OK:
// - Repository has no state (no fields)
// - Repository has no implementation (only abstract methods)
// - No fragile base class problem (nothing to break)
// - True "is-a" relationship (UserRepository IS-A Repository)

// Rule: Inheritance OK if parent has NO implementation (interface-like)
```

---

**❌ Tévhit 2: "Composition always means delegation (wrapper pattern)"**

**Realitás**: Composition = object contains another object (not always delegation)

```java
// ❌ Misconception: Composition = always wrap and delegate
class Car {
    private Engine engine;
    
    public void start() {
        engine.start();  // Delegation (wrapper pattern)
    }
}

// ✅ Reality: Composition = "has-a" (not always delegation)
class Order {
    private Customer customer;  // Composition (has-a Customer)
    private List<OrderItem> items;  // Composition (has-a list of items)
    private Address shippingAddress;  // Composition (has-a Address)
    
    // Not delegation! Just data composition
    public Money calculateTotal() {
        return items.stream()
            .map(OrderItem::getSubtotal)
            .reduce(Money.ZERO, Money::add);
    }
}

// Rule: Composition = object contains another object (not always delegation)
```

---

**❌ Tévhit 3: "Inheritance is faster (no method call overhead)"**

**Realitás**: Modern JVMs optimize both equally (composition not slower)

```java
// ❌ Misconception: Inheritance faster (direct method call)
class Base {
    void method() { /* ... */ }
}

class Child extends Base {
    void callParent() {
        method();  // Direct call (fast?)
    }
}

// ✅ Reality: Composition same speed (JVM inlines)
interface Service {
    void method();
}

class ServiceImpl implements Service {
    public void method() { /* ... */ }
}

class Client {
    private Service service;
    
    void callService() {
        service.method();  // JVM inlines this! (same speed as inheritance)
    }
}

// Benchmark (1M calls):
// Inheritance: 2ms
// Composition: 2ms (JVM inlines delegation)

// Rule: No performance difference (JVM optimizes both)
```

---

**❌ Tévhit 4: "Abstract classes = inheritance, Interfaces = composition"**

**Realitás**: Both can use composition (Java 8+ default methods)

```java
// ❌ Misconception: Abstract class forces inheritance
abstract class Logger {
    public abstract void log(String message);
    
    // Concrete method (implementation inheritance)
    public void logError(String message) {
        log("ERROR: " + message);
    }
}

// ✅ Reality: Interface with default methods = composition
interface Logger {
    void log(String message);
    
    // Default method (composition via delegation!)
    default void logError(String message) {
        log("ERROR: " + message);  // Delegates to log()
    }
}

class FileLogger implements Logger {
    @Override
    public void log(String message) {
        // Write to file
    }
    
    // Inherits logError() via composition (not inheritance!)
}

// Rule: Prefer interfaces with default methods over abstract classes
```

---

**❌ Tévhit 5: "Composition requires more code (verbose)"**

**Realitás**: Lombok @Delegate reduces boilerplate

```java
// ❌ Misconception: Composition verbose (manual delegation)
class CountingList<E> {
    private List<E> list = new ArrayList<>();
    private int addCount = 0;
    
    // Manual delegation (100 methods!)
    public boolean add(E e) {
        addCount++;
        return list.add(e);
    }
    
    public E get(int index) {
        return list.get(index);
    }
    
    public int size() {
        return list.size();
    }
    
    // ... 97 more delegation methods ...
}

// ✅ Reality: Lombok @Delegate (automatic)
class CountingList<E> {
    @Delegate  // Lombok generates all delegation methods!
    private List<E> list = new ArrayList<>();
    private int addCount = 0;
    
    public boolean add(E e) {
        addCount++;
        return list.add(e);
    }
    
    public int getAddCount() {
        return addCount;
    }
}

// Rule: Use Lombok @Delegate to reduce composition boilerplate
```

</div>
</details>

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Performance Implications</strong></summary>

<div>

**1. Method call overhead (composition vs inheritance)**

```java
// Inheritance: Direct method call
class Base {
    void method() { /* ... */ }
}

class Child extends Base {
    void call() {
        method();  // Direct call (0ns overhead)
    }
}

// Composition: Delegation (one extra method call)
class Component {
    void method() { /* ... */ }
}

class Client {
    private Component component;
    
    void call() {
        component.method();  // Delegation (5ns overhead per call)
    }
}

// Benchmark (1M calls):
// Inheritance: 0ms
// Composition: 5ms (5ns × 1M = 5ms overhead)

// BUT: JVM inlines hot methods (composition becomes 0ms!)
// After warmup (10k+ calls): Both 0ms

// Rule: No practical performance difference (JVM optimizes)
```

**2. Memory overhead (composition stores references)**

```java
// Inheritance: No extra memory
class Child extends Parent {
    // No extra reference (inherits parent fields directly)
}

// Composition: Stores reference (8 bytes per reference)
class Client {
    private Service service;  // 8 bytes reference
    private Repository repo;  // 8 bytes reference
    private Logger logger;    // 8 bytes reference
    // Total: 24 bytes extra memory
}

// Benchmark (1M objects):
// Inheritance: 16MB (16 bytes per object)
// Composition: 40MB (16 bytes + 24 bytes references = 40 bytes)

// Trade-off: 24 bytes extra memory vs flexibility
// → Worth it! (memory cheap, flexibility valuable)
```

**3. Cache locality (inheritance better for cache)**

```java
// Inheritance: Fields adjacent in memory (good cache locality)
class Parent {
    int x;  // Offset 0
    int y;  // Offset 4
}

class Child extends Parent {
    int z;  // Offset 8
    // x, y, z adjacent in memory (cache-friendly!)
}

// Composition: Fields scattered in memory (poor cache locality)
class Point {
    int x;
    int y;
}

class Line {
    Point start;  // Reference to Point (different memory location)
    Point end;    // Reference to Point (different memory location)
}

// Benchmark (1M point accesses):
// Inheritance: 10ms (cache hits)
// Composition: 25ms (cache misses from pointer chasing)

// Rule: Inheritance better for cache (but rarely matters)
```

**4. When performance matters (hot path optimization)**

```java
// Critical path (called millions of times per second)
class Point3D {
    // ✅ Use inheritance for hot path (better cache locality)
    double x, y, z;
    
    double distanceTo(Point3D other) {
        double dx = this.x - other.x;  // Direct field access (cache-friendly)
        double dy = this.y - other.y;
        double dz = this.z - other.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
}

// Non-critical path (called rarely)
class OrderService {
    // ✅ Use composition for non-hot path (flexibility > performance)
    private PaymentService paymentService;
    private NotificationService notificationService;
    
    void processOrder(Order order) {
        paymentService.charge(order);  // Called once per order (not hot)
        notificationService.sendEmail(order);
    }
}

// Rule: Inheritance OK for hot path, Composition for everything else
```

</div>
</details>

</div>

<div class="concept-section tools">

<details>
<summary>🧰 <strong>Tools & Patterns</strong></summary>

<div>

**1. Lombok @Delegate (automatic delegation)**

```java
@Getter
class CountingList<E> {
    @Delegate  // Generates all List methods automatically
    private final List<E> list = new ArrayList<>();
    
    private int addCount = 0;
    
    public boolean add(E e) {
        addCount++;
        return list.add(e);
    }
}

// Generated by Lombok:
// public E get(int index) { return list.get(index); }
// public int size() { return list.size(); }
// ... all List methods delegated ...
```

**2. IntelliJ IDEA Refactoring**

```
Refactor → Extract Interface
→ Convert inheritance to composition

Refactor → Replace Inheritance with Delegation
→ Automatic refactoring from inheritance to composition

Generate → Delegate Methods
→ Generate delegation methods for composition
```

**3. Design Patterns using Composition**

```java
// Strategy Pattern (composition)
class Context {
    private Strategy strategy;  // Composition (not inheritance)
    
    void setStrategy(Strategy strategy) {
        this.strategy = strategy;
    }
}

// Decorator Pattern (composition)
class Decorator implements Component {
    private Component wrapped;  // Composition (wraps another component)
    
    public void operation() {
        wrapped.operation();
    }
}

// Adapter Pattern (composition)
class Adapter implements TargetInterface {
    private LegacyClass legacy;  // Composition (adapts legacy)
    
    public void newMethod() {
        legacy.oldMethod();  // Delegates to legacy
    }
}
```

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>8 Composition vs Inheritance Mikrotanulási Promptok</strong></summary>

<div>

**Q1: Mikor használj inheritance-t és mikor composition-t?**

<details>
<summary>Kattints a válaszért</summary>

**Decision matrix**:

**Inheritance when**:
- True "is-a" relationship (Circle IS-A Shape)
- Parent has NO implementation (interface-like abstract class)
- Polymorphism needed (List<Shape> with Circle, Rectangle)
- No state in parent (no fields, only abstract methods)

**Composition when**:
- "has-a" relationship (Car HAS-AN Engine)
- Need runtime flexibility (swap implementations)
- Parent has implementation (fragile base class risk)
- Multiple behaviors needed (avoid diamond problem)
- **Default choice** (composition preferred by Gang of Four)

**Rule**: Composition = default, Inheritance = exception

</details>

---

**Q2: Mi az a Fragile Base Class Problem?**

<details>
<summary>Kattints a válaszért</summary>

**Fragile Base Class** = Parent class change breaks child classes (inheritance breaks encapsulation)

```java
// Parent changes implementation → Child breaks
class ArrayList {
    public void addAll(Collection c) {
        for (Object e : c) {
            add(e);  // Implementation detail
        }
    }
}

class CountingArrayList extends ArrayList {
    @Override
    public void addAll(Collection c) {
        addCount += c.size();
        super.addAll(c);  // Assumes parent calls add()
    }
}

// Parent changes addAll() to use System.arraycopy()
// → Child breaks (addCount never incremented!)
```

**Solution**: Composition (no dependency on parent implementation)

```java
class CountingArrayList {
    private List list = new ArrayList<>();  // Composition
    
    public void addAll(Collection c) {
        addCount += c.size();
        list.addAll(c);  // Immune to ArrayList changes
    }
}
```

</details>

---

**Q3: Hogyan refactoráld az inheritance-t composition-ra?**

<details>
<summary>Kattints a válaszért</summary>

**Steps**:

1. **Extract interface** from parent class
2. **Convert parent to field** (composition)
3. **Delegate methods** to field
4. **Remove extends** keyword

```java
// BEFORE: Inheritance
class SpecialList extends ArrayList {
    @Override
    public boolean add(Object e) {
        // Special logic
        return super.add(e);
    }
}

// AFTER: Composition
interface List {
    boolean add(Object e);
    // ... other methods
}

class SpecialList implements List {
    private List list = new ArrayList<>();  // Composition
    
    @Override
    public boolean add(Object e) {
        // Special logic
        return list.add(e);  // Delegate
    }
    
    // Delegate other methods to list
}
```

**IntelliJ**: Refactor → Replace Inheritance with Delegation

</details>

---

**Q4: Mikor OK az implementation inheritance (concrete parent class)?**

<details>
<summary>Kattints a válaszért</summary>

**Implementation inheritance OK when**:

1. **Template Method Pattern** (parent defines algorithm skeleton)
```java
abstract class HttpServlet {
    public final void service(Request req, Response res) {
        // Algorithm skeleton (fixed)
        doGet(req, res);  // Hook method (variable)
    }
    
    protected abstract void doGet(Request req, Response res);
}
```

2. **Library/Framework classes** (designed for inheritance)
```java
class MyServlet extends HttpServlet {
    // Framework designed for inheritance
}
```

3. **You control parent AND child** (same module, same team)
```java
// Internal hierarchy (you maintain both)
class BaseController {
    // You control implementation
}

class UserController extends BaseController {
    // You control implementation
}
```

**Rule**: Avoid implementation inheritance across module boundaries

</details>

---

**Q5: Composition vs Delegation: mi a különbség?**

<details>
<summary>Kattints a válaszért</summary>

**Composition** = "has-a" relationship (object contains another object)

**Delegation** = Composition + forwarding (wrapper forwards method calls)

```java
// Composition (NOT delegation)
class Order {
    private Customer customer;  // Composition (has-a Customer)
    private List<OrderItem> items;
    
    // No delegation (just data composition)
}

// Delegation (Composition + forwarding)
class CountingList {
    private List list;  // Composition
    
    public boolean add(Object e) {
        return list.add(e);  // Delegation (forwards to list)
    }
    
    public int size() {
        return list.size();  // Delegation
    }
}
```

**Memory trick**:
- **Composition** = object contains another (broader)
- **Delegation** = object forwards to another (narrower, subset of composition)

</details>

---

**Q6: Milyen performance trade-off-ok vannak?**

<details>
<summary>Kattints a válaszért</summary>

**Inheritance**:
- **Pros**: Direct method calls (0ns), better cache locality, less memory (no references)
- **Cons**: Rigid (can't swap), fragile (parent changes break child)

**Composition**:
- **Pros**: Flexible (swap at runtime), maintainable (no fragile base class)
- **Cons**: Delegation overhead (5ns per call), more memory (8 bytes per reference)

**Reality**: JVM inlines hot methods → composition 0ns overhead after warmup

**Benchmark (1M calls after warmup)**:
- Inheritance: 0ms
- Composition: 0ms (JVM inlines)

**Rule**: Performance NOT a reason to choose inheritance (JVM optimizes)

</details>

---

**Q7: Hogyan használd a Lombok @Delegate-et?**

<details>
<summary>Kattints a válaszért</summary>

**@Delegate** = Generates delegation methods automatically

```java
// Without Lombok (manual delegation)
class CountingList<E> {
    private List<E> list = new ArrayList<>();
    
    // Manually delegate 100+ methods
    public boolean add(E e) { return list.add(e); }
    public E get(int index) { return list.get(index); }
    public int size() { return list.size(); }
    // ... 97 more methods ...
}

// With Lombok (automatic delegation)
class CountingList<E> {
    @Delegate  // Generates all List methods!
    private List<E> list = new ArrayList<>();
    
    private int addCount = 0;
    
    public boolean add(E e) {
        addCount++;
        return list.add(e);
    }
}

// Lombok generates:
// public E get(int index) { return list.get(index); }
// public int size() { return list.size(); }
// ... all other List methods ...
```

**Rule**: Use @Delegate to reduce composition boilerplate

</details>

---

**Q8: Melyek a Spring Framework composition példák?**

<details>
<summary>Kattints a válaszért</summary>

**Spring uses composition extensively**:

1. **FilterChain** (composition of SecurityFilters)
```java
FilterChain chain = new FilterChain(Arrays.asList(
    new AuthenticationFilter(),
    new AuthorizationFilter(),
    new CsrfFilter()
));
```

2. **AOP Proxy** (composition of target + interceptors)
```java
@Transactional  // Spring creates proxy
public void method() {
    // Proxy composes: TransactionInterceptor + target
}
```

3. **Dependency Injection** (composition via @Autowired)
```java
@Service
public class OrderService {
    private final PaymentService payment;  // Composition
    private final NotificationService notification;
    
    @Autowired
    public OrderService(PaymentService payment, NotificationService notification) {
        this.payment = payment;
        this.notification = notification;
    }
}
```

4. **Repository Pattern** (composition of EntityManager)
```java
@Repository
public class JpaUserRepository implements UserRepository {
    private final EntityManager em;  // Composition
    
    public User findById(Long id) {
        return em.find(User.class, id);  // Delegate
    }
}
```

**Insight**: Spring Framework = composition masterclass

</details>

</div>
</details>

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">composition</span>
<span class="tag">inheritance</span>
<span class="tag">design-principles</span>
<span class="tag">refactoring</span>
<span class="tag">spring</span>
<span class="tag">senior</span>
</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`SOLID Principles` · `Design Patterns` · `Fragile Base Class` · `Strategy Pattern` · `Decorator Pattern` · `Spring Framework` · `Thread-Safety`

</div>

### Thread-Safety in OOP {#thread-safety-oop}

<div class="concept-section mental-model">

📋 **Fogalom meghatározása**  
*Thread-safety azt jelenti, hogy objektum több thread egyidejű hozzáférése esetén is konzisztens állapotban marad, race condition nélkül. Megvalósítási stratégiák: immutability (állapot nem változhat), synchronization (synchronized block/method, locks), thread confinement (ThreadLocal, stack confinement), atomic operations (AtomicInteger, CAS), concurrent collections (ConcurrentHashMap). Java Memory Model definiálja a visibility és ordering garanciákat.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Concurrent access**: több thread biztonságosan használhatja ugyanazt az objektumot
- **Data integrity**: race condition-ök elkerülése
- **Performance**: proper synchronization vs unnecessary locking balance

</div>

Objektumok úgy való tervezése, hogy több thread egyidejű hozzáférése esetén is konzisztens állapotban maradjanak.

<div class="runnable-model">

**Runnable mental model**
```java
// IMMUTABLE OBJECT - inherently thread-safe
public final class Money {
    private final BigDecimal amount;
    private final Currency currency;
    
    public Money(BigDecimal amount, Currency currency) {
        this.amount = amount; // final field
        this.currency = currency; // final field
    }
    
    // Minden operation új objektumot ad vissza
    public Money add(Money other) {
        return new Money(amount.add(other.amount), currency);
    }
    
    // Thread-safe getter-ek
    public BigDecimal getAmount() { return amount; }
    public Currency getCurrency() { return currency; }
}

// DEFENSIVE COPYING
public class Portfolio {
    private final List<Stock> stocks;
    
    public Portfolio(List<Stock> stocks) {
        // Defensive copy a konstruktorban
        this.stocks = new ArrayList<>(stocks);
    }
    
    public List<Stock> getStocks() {
        // Defensive copy a getter-ben
        return new ArrayList<>(stocks);
    }
    
    public synchronized void addStock(Stock stock) {
        stocks.add(stock); // synchronized metódus
    }
}

// THREAD CONFINEMENT
public class RequestProcessor {
    // ThreadLocal - minden thread-nek saját példánya
    private static final ThreadLocal<DateFormat> dateFormat = 
        ThreadLocal.withInitial(() -> new SimpleDateFormat("yyyy-MM-dd"));
    
    public String processRequest(Request request) {
        // Thread-confined object, thread-safe
        DateFormat formatter = dateFormat.get();
        return formatter.format(request.getTimestamp());
    }
}

// PROPER SYNCHRONIZATION
public class Counter {
    private volatile int count = 0; // volatile a visibility miatt
    private final Object lock = new Object();
    
    public void increment() {
        synchronized (lock) {
            count++; // atomic increment protected módon
        }
    }
    
    public int getCount() {
        return count; // volatile read, atomic
    }
}

// CONCURRENT COLLECTIONS
public class UserCache {
    // Thread-safe collection
    private final ConcurrentHashMap<String, User> cache = new ConcurrentHashMap<>();
    
    public User getUser(String id) {
        return cache.computeIfAbsent(id, this::loadUserFromDB);
    }
    
    private User loadUserFromDB(String id) {
        // Expensive DB operation
        return userRepository.findById(id);
    }
}

// ATOMIC OPERATIONS
public class Statistics {
    private final AtomicLong totalRequests = new AtomicLong(0);
    private final AtomicLong errorCount = new AtomicLong(0);
    
    public void recordRequest() {
        totalRequests.incrementAndGet(); // atomic, thread-safe
    }
    
    public void recordError() {
        errorCount.incrementAndGet(); // atomic, thread-safe
    }
    
    public double getErrorRate() {
        long total = totalRequests.get();
        long errors = errorCount.get();
        return total > 0 ? (double) errors / total : 0.0;
    }
}
```
*Figyeld meg: különböző stratégiák a thread-safety biztosítására: immutability, synchronization, confinement, atomic operations.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Synchronized mindenre megoldás" → Performance problémákat okozhat, deadlock veszély
- „Volatile = atomic" → Volatile csak visibility-t garantál, nem atomicity-t
- „Immutable objektumok lassúak" → Modern GC-k optimalizálták, gyakran gyorsabbak

</div>
</details>

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Performance tippek</strong></summary>

<div>

- **Lock-free algorithms**: ConcurrentHashMap, AtomicReference családok
- **Read-write locks**: gyakori olvasás, ritka írás esetén
- **Immutable objects**: escape analysis, object pooling

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Volatile vs synchronized különbség magyarázata
- Double-checked locking anti-pattern felismerése
- Deadlock megelőzési stratégiák

</div>
</details>

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">medior</span>
<span class="tag">thread-safety</span>
<span class="tag">concurrency</span>
<span class="tag">performance</span>
</div>

<!-- tags: oop, medior, thread-safety, concurrency, performance -->

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Immutability` · `Synchronization` · `Concurrent Collections` · `Atomic Operations` · `Memory Model`

</div>

### God Object Anti-pattern
Túl sok felelősséggel rendelkező osztály.

```java
// ROSSZ - God Object
class OrderManager {
    public void createOrder() { /* ... */ }
    public void calculateTax() { /* ... */ }
    public void sendEmail() { /* ... */ }
    public void updateInventory() { /* ... */ }
    public void processPayment() { /* ... */ }
    public void generateReport() { /* ... */ }
    public void validateUser() { /* ... */ }
}

// JÓ - felelősségek szétválasztása
class Order { /* order data */ }
class TaxCalculator { /* tax logic */ }
class EmailService { /* email logic */ }
class InventoryManager { /* inventory logic */ }
class PaymentProcessor { /* payment logic */ }
```

### Inappropriate Inheritance
Öröklődés használata ott, ahol composition helyesebb lenne.

```java
// ROSSZ - nem igazi "is-a" kapcsolat
class Stack extends ArrayList<String> {
    public void push(String item) { add(item); }
    public String pop() { return remove(size() - 1); }
    // De minden ArrayList metódus is elérhető - nem kívánatos!
}

// JÓ - composition használata
class Stack {
    private List<String> items = new ArrayList<>();
    
    public void push(String item) { items.add(item); }
    public String pop() { return items.remove(items.size() - 1); }
    public boolean isEmpty() { return items.isEmpty(); }
    // Csak a szükséges interfész elérhető
}
```

### Tight Coupling
Osztályok túl szoros kapcsolata.

```java
// ROSSZ - tight coupling
class OrderService {
    public void processOrder(Order order) {
        EmailService emailService = new EmailService();  // direct dependency
        emailService.sendConfirmation(order.getCustomerEmail());
    }
}

// JÓ - loose coupling
class OrderService {
    private NotificationService notificationService;
    
    public OrderService(NotificationService notificationService) {
        this.notificationService = notificationService;  // dependency injection
    }
    
    public void processOrder(Order order) {
        notificationService.sendNotification("Order confirmed");
    }
}
```

## Interjúkérdések

- **Magyarázd el a négy OOP alapelvet!** — *Encapsulation: adatok elrejtése. Inheritance: közös tulajdonságok öröklése. Polymorphism: egy interfész, több implementáció. Abstraction: lényeges dolgokra fókuszálás.*

- **Mi a különbség composition és inheritance között?** — *Inheritance: "is-a" kapcsolat, közös tulajdonságok. Composition: "has-a" kapcsolat, funkcionalitás újrafelhasználás.*

- **Mikor használj abstract class-t és mikor interface-t?** — *Abstract class: közös implementáció + kötelező metódusok. Interface: tiszta szerződés, multiple inheritance.*

- **Mi az a SOLID és miért fontos?** — *Öt alapelv tiszta kód írásához: SRP, OCP, LSP, ISP, DIP. Karbantartható, bővíthető kódot eredményez.*

- **Példa polimorfizmusra!** — *Ugyanaz a Shape interfész, de Circle és Rectangle különbözően implementálja a draw() metódust.*

- **Mi a Singleton pattern és mikor használod?** — *Egy osztályból csak egy példány létezhet. Database connection, logger, configuration.*

- **Hogyan kerülöd el a tight coupling-ot?** — *Dependency injection, interface-ek használata, factory pattern.*

- **Mi a Law of Demeter?** — *Ne hívj metódusokat olyan objektumokon, amiket más objektum ad vissza. Pl: car.start() vs car.getEngine().start().*

- **Különbség method overloading és overriding között?** — *Overloading: ugyanaz a név, különböző paraméterek (compile-time). Overriding: szülő metódus felüldefiniálása (runtime).*

- **Hogyan implementálnál Observer pattern-t?** — *Subject lista observers-ből, notify() metódus értesíti őket. Újság-előfizető modell.*

## Gyakorlati feladat (mini)

### Feladat: E-commerce rendszer tervezése

Tervezz egy egyszerű e-commerce rendszert OOP elvek alkalmazásával:

1. **Alaposztályok létrehozása:**
   - `Product` - termék adatok (név, ár, készlet)
   - `Customer` - vásárló adatok
   - `Order` - rendelés adatok

2. **Polimorfizmus alkalmazása:**
   - `PaymentMethod` interface különböző fizetési módokkal
   - `ShippingMethod` interface különböző szállítási módokkal

3. **Design pattern-ek használata:**
   - Factory pattern a termékek létrehozásához
   - Observer pattern a készlet változás értesítésekhez
   - Strategy pattern a kedvezményekhez

4. **SOLID elvek betartása:**
   - Egy osztály = egy felelősség
   - Dependency injection használata
   - Interface segregation

**Példa használat:**
```java
ProductFactory factory = new ProductFactory();
Product laptop = factory.createProduct("laptop", "Dell XPS", 1200.0);

Customer customer = new Customer("János", "janos@email.com");

PaymentMethod payment = new CreditCardPayment("1234-5678-9012-3456");
ShippingMethod shipping = new ExpressShipping();

ShoppingCart cart = new ShoppingCart();
cart.addProduct(laptop);
cart.setPaymentMethod(payment);
cart.setShippingMethod(shipping);

OrderService orderService = new OrderService();
Order order = orderService.createOrder(customer, cart);
```

**Követelmények:**
- Minden osztály kövesse az SRP-t
- Használj interface-eket a loose coupling érdekében
- Implementálj legalább 2 design pattern-t
- Írj unit teszteket a főbb komponensekhez

## Kapcsolódó témák

- [Java Alapok](/theory/java) - OOP implementáció Java-ban
- [Design Patterns részletesen](/theory/design-patterns) - Mélyebb pattern ismeretek
- [Clean Code](/theory/clean-code) - Kód minőségi irányelvek
- [Architecture Patterns](/theory/architecture) - Nagyobb rendszerek tervezése

## További olvasmányok

- [Clean Code by Robert Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350884) - Tiszta kód írás alapjai
- [Design Patterns: Elements of Reusable Object-Oriented Software](https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612) - A klasszikus Gang of Four könyv
- [Effective Java by Joshua Bloch](https://www.amazon.com/Effective-Java-Joshua-Bloch/dp/0134685997) - Java best practices
- [SOLID Principles explained](https://www.digitalocean.com/community/conceptual_articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design) - SOLID elvek részletesen
- [Refactoring Guru](https://refactoring.guru/) - Design pattern-ek interaktív oktatása