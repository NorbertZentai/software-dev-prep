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

🧭 **Így gondolj rá**  
*Az enkapszuláció olyan, mint egy gyógyszerkapszula: a belső működés rejtve van, csak a szükséges interfész érhető el kívülről.*

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

🧭 **Így gondolj rá**  
*Az öröklődés olyan, mint a családi vonások: a gyerek örökli a szülő tulajdonságait, de saját egyedi jellemzői is vannak.*

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

🧭 **Így gondolj rá**  
*A polimorfizmus olyan, mint amikor azt mondod „vezess", de mindegy, hogy autót, motort vagy biciklit kapsz - mindegyik másképp, de mindegyik „vezet".*

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

🧭 **Így gondolj rá**  
*Az absztrakció olyan, mint egy autó vezetése: tudod, hogy a gázpedál gyorsít, de nem kell tudnod, hogyan működik belül a motor.*

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

### SOLID Principles {#solid-principles}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A SOLID olyan, mint az építészet öt alapszabálya: ha betartod őket, stabil, rugalmas épületet (szoftvert) kapsz.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Maintainability**: könnyen módosítható és bővíthető kód
- **Testability**: egyszerűbb unit testing
- **Loose coupling**: komponensek függetlenül fejleszthetők

</div>

Öt alapelv, amely segít tiszta, rugalmas és karbantartható objektumorientált kód írásában.

#### Single Responsibility Principle (SRP)

Egy osztálynak csak egy oka legyen a változásra.

<div class="runnable-model">

**Runnable mental model**
```java
// ROSSZ - több felelősség
class Employee {
    private String name;
    private double salary;
    
    public void save() { /* DB mentés */ }
    public void sendEmail() { /* Email küldés */ }
    public double calculateTax() { /* Adó számítás */ }
    public void printReport() { /* Jelentés nyomtatás */ }
}

// JÓ - szétválasztott felelősségek
class Employee {
    private String name;
    private double salary;
    // csak employee adatok
}

class EmployeeRepository {
    public void save(Employee emp) { /* DB mentés */ }
}

class EmailService {
    public void sendEmail(Employee emp, String message) { /* Email */ }
}

class TaxCalculator {
    public double calculateTax(Employee emp) { /* Adó számítás */ }
}
```
*Figyeld meg: minden osztály egyetlen, jól definiált felelősséggel rendelkezik.*

</div>

#### Open/Closed Principle (OCP)

Nyitott a bővítésre, zárt a módosításra.

<div class="runnable-model">

**Runnable mental model**
```java
// Extensible design
public abstract class PaymentProcessor {
    public abstract void processPayment(double amount);
}

public class CreditCardProcessor extends PaymentProcessor {
    @Override
    public void processPayment(double amount) {
        System.out.println("Bankkártyás fizetés: " + amount);
    }
}

public class PayPalProcessor extends PaymentProcessor {
    @Override
    public void processPayment(double amount) {
        System.out.println("PayPal fizetés: " + amount);
    }
}

// Új fizetési módot hozzáadhatok anélkül, hogy a meglévő kódot módosítanám
public class BitcoinProcessor extends PaymentProcessor {
    @Override
    public void processPayment(double amount) {
        System.out.println("Bitcoin fizetés: " + amount);
    }
}
```

</div>

#### Liskov Substitution Principle (LSP)

A leszármazott osztályok helyettesíthetők az alaposztállyal.

<div class="runnable-model">

**Runnable mental model**
```java
// ROSSZ - sérti az LSP-t
class Rectangle {
    protected int width, height;
    
    public void setWidth(int w) { this.width = w; }
    public void setHeight(int h) { this.height = h; }
    public int getArea() { return width * height; }
}

class Square extends Rectangle {
    @Override
    public void setWidth(int w) {
        this.width = this.height = w; // Megváltoztatja a viselkedést!
    }
}

// JÓ - LSP-compatible design
interface Shape {
    int calculateArea();
    void draw();
}

class Rectangle implements Shape {
    private int width, height;
    public Rectangle(int w, int h) { this.width = w; this.height = h; }
    public int calculateArea() { return width * height; }
    public void draw() { System.out.println("Rectangle drawn"); }
}

class Square implements Shape {
    private int side;
    public Square(int side) { this.side = side; }
    public int calculateArea() { return side * side; }
    public void draw() { System.out.println("Square drawn"); }
}
```

</div>

#### Interface Segregation Principle (ISP)

Ne függj olyan metódusoktól, amelyeket nem használsz.

<div class="runnable-model">

**Runnable mental model**
```java
// ROSSZ - túl nagy interfész
interface Worker {
    void work();
    void eat();
    void sleep();
}

// JÓ - szegregált interfészek
interface Workable {
    void work();
}

interface Eater {
    void eat();
}

interface Sleeper {
    void sleep();
}

class Human implements Workable, Eater, Sleeper {
    public void work() { System.out.println("Human working"); }
    public void eat() { System.out.println("Human eating"); }
    public void sleep() { System.out.println("Human sleeping"); }
}

class Robot implements Workable {
    public void work() { System.out.println("Robot working"); }
    // Robot nem eszik és nem alszik
}
```

</div>

#### Dependency Inversion Principle (DIP)

Függj az absztrakciótól, ne a konkrét implementációtól.

<div class="runnable-model">

**Runnable mental model**
```java
// ROSSZ - közvetlen függőség
class OrderService {
    private EmailService emailService = new EmailService(); // tight coupling
    
    public void processOrder(Order order) {
        // order processing...
        emailService.sendConfirmation(order);
    }
}

// JÓ - dependency injection
interface NotificationService {
    void sendNotification(String message);
}

class EmailService implements NotificationService {
    public void sendNotification(String message) {
        System.out.println("Email sent: " + message);
    }
}

class SMSService implements NotificationService {
    public void sendNotification(String message) {
        System.out.println("SMS sent: " + message);
    }
}

class OrderService {
    private NotificationService notificationService;
    
    public OrderService(NotificationService notificationService) {
        this.notificationService = notificationService; // dependency injection
    }
    
    public void processOrder(Order order) {
        // order processing...
        notificationService.sendNotification("Order confirmed");
    }
}
```

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">solid</span>
<span class="tag">junior</span>
<span class="tag">design-principles</span>
</div>

<!-- tags: oop, solid, junior, design-principles -->

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Design Patterns` · `Dependency Injection` · `Clean Architecture` · `GRASP Principles` · `Code Quality`

</div>

### Object Lifecycle & Invariants {#object-lifecycle}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*Az objektum élete olyan, mint egy szerződés: létrehozáskor érvényes állapotban kell lennie, és minden műveletnél meg kell őrizni az érvényességét.*

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

🧭 **Így gondolj rá**  
*High Cohesion = családtagok együtt dolgoznak egy célért. Low Coupling = különböző családok függetlenül működnek.*

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

🧭 **Így gondolj rá**  
*Ne beszélj idegenekkel - csak a közvetlen szomszédaiddal kommunikálj, ne kérdezz rájuk a barátaikról.*

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

🧭 **Így gondolj rá**  
*Value Object = pénz (100 Ft ugyanaz, bárhol is van). Entity = ember (egyedi azonosítóval, még ha ugyanúgy néznek is ki).*

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

🧭 **Így gondolj rá**  
*Access modifier-ek olyan, mint a ház helyiségei: public=előszoba (mindenki), private=hálószoba (csak te), protected=családi szoba (család), package=szomszédok.*

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

🧭 **Így gondolj rá**  
*Inheritance = "is-a" (autó ÉS jármű), Composition = "has-a" (autó VAN motor).*

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

🧭 **Így gondolj rá**  
*Interface = szerződés ("mit csinálj"), Abstract Class = részben kész sablon ("hogyan csináld, de egyes részeket te döntsd el").*

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

### Common Design Patterns {#design-patterns}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A design pattern-ek olyan, mint az építészeti minták: bevált megoldások gyakori problémákra.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Bevált megoldások**: kipróbált és tesztelt megközelítések
- **Kommunikáció**: közös szókincs a fejlesztők között
- **Kód minőség**: strukturált, karbantartható kód

</div>

Gyakran előforduló tervezési problémákra kidolgozott általános megoldási sablonok.

#### Creational Patterns

**Singleton Pattern**
```java
public class DatabaseConnection {
    private static volatile DatabaseConnection instance;
    private static final Object lock = new Object();
    
    private DatabaseConnection() {
        // private constructor
    }
    
    public static DatabaseConnection getInstance() {
        if (instance == null) {
            synchronized (lock) {
                if (instance == null) {
                    instance = new DatabaseConnection();
                }
            }
        }
        return instance;
    }
}
```

**Factory Pattern**
```java
public interface Shape {
    void draw();
}

public class Circle implements Shape {
    public void draw() { System.out.println("Circle"); }
}

public class Rectangle implements Shape {
    public void draw() { System.out.println("Rectangle"); }
}

public class ShapeFactory {
    public static Shape createShape(String type) {
        switch (type.toLowerCase()) {
            case "circle": return new Circle();
            case "rectangle": return new Rectangle();
            default: throw new IllegalArgumentException("Unknown shape: " + type);
        }
    }
}
```

#### Behavioral Patterns

**Strategy Pattern**
```java
public interface PaymentStrategy {
    void pay(double amount);
}

public class CreditCardPayment implements PaymentStrategy {
    private String cardNumber;
    
    public CreditCardPayment(String cardNumber) {
        this.cardNumber = cardNumber;
    }
    
    public void pay(double amount) {
        System.out.println("Paid " + amount + " using credit card " + cardNumber);
    }
}

public class PayPalPayment implements PaymentStrategy {
    private String email;
    
    public PayPalPayment(String email) {
        this.email = email;
    }
    
    public void pay(double amount) {
        System.out.println("Paid " + amount + " using PayPal " + email);
    }
}

public class ShoppingCart {
    private PaymentStrategy paymentStrategy;
    
    public void setPaymentStrategy(PaymentStrategy strategy) {
        this.paymentStrategy = strategy;
    }
    
    public void checkout(double amount) {
        paymentStrategy.pay(amount);
    }
}
```

**Observer Pattern**
```java
public interface Observer {
    void update(String message);
}

public class NewsletterSubscriber implements Observer {
    private String name;
    
    public NewsletterSubscriber(String name) {
        this.name = name;
    }
    
    public void update(String message) {
        System.out.println(name + " received: " + message);
    }
}

public class NewsPublisher {
    private List<Observer> observers = new ArrayList<>();
    
    public void subscribe(Observer observer) {
        observers.add(observer);
    }
    
    public void unsubscribe(Observer observer) {
        observers.remove(observer);
    }
    
    public void publishNews(String news) {
        System.out.println("Publishing: " + news);
        for (Observer observer : observers) {
            observer.update(news);
        }
    }
}
```

<div class="concept-section tools">

<details>
<summary>🧰 <strong>Design Pattern kategóriák</strong></summary>

<div>

**Creational**: Singleton, Factory, Builder, Prototype, Abstract Factory  
**Structural**: Adapter, Decorator, Facade, Composite, Bridge  
**Behavioral**: Observer, Strategy, Command, State, Template Method

</div>
</details>

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">junior</span>
<span class="tag">patterns</span>
<span class="tag">design-patterns</span>
<span class="tag">best-practices</span>
</div>

<!-- tags: oop, junior, patterns, design-patterns, best-practices -->

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Gang of Four` · `SOLID Principles` · `Anti-patterns` · `Architecture Patterns` · `Framework Design`

</div>

### GRASP Principles {#grasp-principles}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*GRASP olyan, mint a jó házigazda szabályai: ki mit csináljon, hogy a parti (kód) zökkenőmentesen menjen.*

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

### Thread-Safety in OOP {#thread-safety-oop}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*Thread-safety olyan, mint a közös konyhában főzés: vagy mindenkinek külön eszköze van (immutable), vagy megbeszélik ki mikor használja (synchronization).*

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