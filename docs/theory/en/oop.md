# Object-Oriented Programming (OOP)

## Brief Summary

Object-Oriented Programming (OOP) is a programming paradigm based on encapsulating data and methods that operate on that data into unified units. The fundamental principles of OOP - encapsulation, inheritance, polymorphism, and abstraction - enable us to write code that is modular, reusable, and easily maintainable. As the backbone of modern software development, OOP facilitates the design and implementation of complex systems by allowing natural modeling of real-world entities.

<!-- Reading Progress Bar -->
<div id="read-progress"></div>

<!-- Tag Filter -->
<div class="tag-filter-container">
  <h3>🏷️ Filter by topics</h3>
  <div class="tag-filter-chips">
    <button class="filter-chip active" data-filter="all">All</button>
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

### Related Java Concepts
To implement OOP principles in practice within a Java environment, it's worth understanding the following concepts from the [Java Fundamentals](/theory/java) page:

**Java Platform and Runtime Environment:**
- [JVM (Java Virtual Machine)](/theory/java#jvm-java-virtual-machine) - bytecode interpretation and JIT optimization
- [JDK (Java Development Kit)](/theory/java#jdk-java-development-kit) - development tools
- [JRE (Java Runtime Environment)](/theory/java#jre-java-runtime-environment) - runtime environment
- [Bytecode](/theory/java#bytecode) - platform-independent intermediate code
- [Garbage Collector](/theory/java#garbage-collector) - automatic memory management

**OOP Implementation in Java:**
- [Class](/theory/java#class) - object template
- [Interface](/theory/java#interface) - contract definition
- [Package](/theory/java#package) - namespace and access control
- [Exception](/theory/java#exception) - error handling mechanism

**Advanced Java Features:**
- [Collections Framework](/theory/java#collections-framework) - data structures
- [Thread](/theory/java#thread) - concurrent programming
- [Stream API](/theory/java#stream-api) - functional programming
- [Lambda Expressions](/theory/java#lambda-expressions) - functional interfaces
- [Generics](/theory/java#generics) - type safety
- [Equals and HashCode](/theory/java#equals-es-hashcode) - object equality
- [Immutability](/theory/java#immutability) - immutable objects
- [Autoboxing and Unboxing](/theory/java#autoboxing-es-unboxing) - primitive-object conversion

## Concepts

### Encapsulation {#encapsulation}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Encapsulation is like a medicine capsule: the internal workings are hidden, only the necessary interface is accessible from the outside.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Data protection**: protecting internal state from external modifications
- **Interface stability**: internal implementation can be changed without breaking external code
- **Code organization**: logically related elements are kept together

</div>

The bundling of data and methods together, as well as hiding the internal implementation from the outside world.

<div class="runnable-model">

**Runnable mental model**
```java
public class BankAccount {
    private double balance;        // Private data member
    private String accountNumber;  // No external access
    
    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
        }
    }
    
    public double getBalance() {
        return balance;  // Controlled access
    }
    
    // Internal logic - not accessible from outside
    private boolean validateTransaction(double amount) {
        return amount > 0 && amount <= 10000;
    }
}
```
*Notice: `balance` is private, so it can only be accessed through defined methods, ensuring data integrity.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths / misconceptions</strong></summary>

<div>

- "Encapsulation only means private fields" → Actually, it's about the entire interface design
- "Getter/setter needed for every field" → Only when external access is truly necessary
- "Private is always secure" → Reflection and other techniques can bypass it

</div>
</details>

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Performance corner</strong></summary>

<div>

- **Getter/setter cost**: modern JVMs optimize these, but excessive wrapping can slow things down
- **Immutable objects**: better cache locality and thread safety
- **Data locality**: storing related fields together improves performance

</div>
</details>

</div>

<div class="concept-section tools">

<details>
<summary>🧰 <strong>Related tools</strong></summary>

<div>

`Lombok` (Java), `@property` (Python), `accessors` (various languages), IDE code generation

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Micro-learning prompts</strong></summary>

<div>

1) What's the difference between encapsulation and data hiding?
<details><summary>Show answer</summary>
Encapsulation is a broader concept: storing data and methods together. Data hiding only refers to private fields.
</details>

2) When to use private field vs protected vs package-private?
<details><summary>Show answer</summary>
Private: only within the class. Protected: subclasses too. Package-private: within the same package.
</details>

3) What is the "Law of Demeter" from an encapsulation perspective?
<details><summary>Show answer</summary>
Don't call methods on objects returned by other objects. E.g., car.start() instead of car.getEngine().start().
</details>

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Where you fail in interviews</strong></summary>

<div>

- Explaining the difference between encapsulation vs abstraction
- Recognizing getter/setter anti-pattern
- Difference between information hiding vs data hiding

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

🗺️ **Connection map**  
`Information Hiding` · `Access Modifiers` · `Data Integrity` · `Interface Design` · `Abstraction`

</div>

### Inheritance {#inheritance}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Inheritance is like family traits: children inherit characteristics from parents but also have their own unique features.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Code reuse**: common functionality in one place
- **Hierarchical organization**: natural categorization
- **Foundation for polymorphism**: common interface with different implementations

</div>

Creating new classes based on existing classes, inheriting common properties and methods.

<div class="runnable-model">

**Runnable mental model**
```java
// Parent class (superclass)
public abstract class Vehicle {
    protected String brand;
    protected int maxSpeed;
    
    public Vehicle(String brand, int maxSpeed) {
        this.brand = brand;
        this.maxSpeed = maxSpeed;
    }
    
    public void start() {
        System.out.println(brand + " started");
    }
    
    public abstract void accelerate(); // Must be implemented
}

// Child class (subclass)
public class Car extends Vehicle {
    private int doors;
    
    public Car(String brand, int maxSpeed, int doors) {
        super(brand, maxSpeed);  // Call parent constructor
        this.doors = doors;
    }
    
    @Override
    public void accelerate() {
        System.out.println("Car accelerating with engine");
    }
    
    // New method specific to Car
    public void openTrunk() {
        System.out.println("Trunk opened");
    }
}

// Usage
Car myCar = new Car("Toyota", 180, 4);
myCar.start();      // Inherited method
myCar.accelerate(); // Overridden method
myCar.openTrunk();  // Car-specific method
```
*Notice: `Car` inherits `start()` from `Vehicle`, overrides `accelerate()`, and adds its own `openTrunk()` method.*

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>Inheritance best practices</strong></summary>

<div>

- **Favor composition over inheritance**: Use "has-a" when possible instead of "is-a"
- **Liskov Substitution Principle**: subclasses must be substitutable for their base classes
- **Don't break encapsulation**: avoid exposing parent's internal state
- **Design for inheritance or prohibit it**: make classes either clearly extendable or final

</div>
</details>

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths / misconceptions</strong></summary>

<div>

- "Deep inheritance hierarchies are good" → Usually leads to complexity and tight coupling
- "Protected is safer than public" → Protected breaks encapsulation too
- "Multiple inheritance is always bad" → Java interfaces provide safe multiple inheritance

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Where you fail in interviews</strong></summary>

<div>

- Not understanding method resolution order
- Confusing overriding vs overloading
- Can't explain when NOT to use inheritance

</div>
</details>

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">inheritance</span>
<span class="tag">junior</span>
<span class="tag">code-reuse</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Polymorphism` · `Method Overriding` · `Super Keyword` · `Abstract Classes` · `Composition`

</div>

### Polymorphism {#polymorphism}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Polymorphism is like a universal remote: the same button (interface) can control different devices (implementations).*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Same interface, different implementations**: flexibility in code design
- **Runtime method resolution**: behavior determined at execution time
- **Extensibility**: new types can be added without changing existing code

</div>

The ability for objects of different types to be treated as instances of the same type through a common interface.

<div class="runnable-model">

**Runnable mental model**
```java
// Common interface
interface Shape {
    double calculateArea();
    void draw();
}

// Different implementations
class Circle implements Shape {
    private double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing a circle");
    }
}

class Rectangle implements Shape {
    private double width, height;
    
    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
    
    @Override
    public double calculateArea() {
        return width * height;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing a rectangle");
    }
}

// Polymorphic usage
Shape[] shapes = {
    new Circle(5),
    new Rectangle(4, 6),
    new Circle(3)
};

for (Shape shape : shapes) {
    shape.draw();                    // Different implementations called
    System.out.println("Area: " + shape.calculateArea());
}
```
*Notice: Same `shape.draw()` call invokes different implementations based on the actual object type.*

</div>

<div class="concept-section types">

<details>
<summary>🔍 <strong>Types of polymorphism</strong></summary>

<div>

- **Compile-time (Static)**: Method overloading, operator overloading
- **Runtime (Dynamic)**: Method overriding, interface implementation
- **Parametric**: Generics/templates for type-safe collections

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Where you fail in interviews</strong></summary>

<div>

- Can't explain dynamic binding vs static binding
- Confusing overloading vs overriding
- Not understanding late binding performance implications

</div>
</details>

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">polymorphism</span>
<span class="tag">medior</span>
<span class="tag">dynamic-binding</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Method Overriding` · `Interfaces` · `Dynamic Binding` · `Late Binding` · `Virtual Methods`

</div>

### Abstraction {#abstraction}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Abstraction is like using a smartphone: you use apps without knowing the complex hardware and software underneath.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Hide complexity**: show only essential features
- **Focus on what, not how**: interface over implementation
- **Reduce cognitive load**: simpler mental models
- **Change isolation**: implementation changes don't affect clients

</div>

Hiding complex implementation details while showing only essential features of objects.

<div class="runnable-model">

**Runnable mental model**
```java
// Abstract base class
abstract class DatabaseConnection {
    protected String connectionString;
    
    public DatabaseConnection(String connectionString) {
        this.connectionString = connectionString;
    }
    
    // Template method - defines the process
    public final void executeQuery(String sql) {
        connect();
        query(sql);
        disconnect();
    }
    
    // Abstract methods - must be implemented by subclasses
    protected abstract void connect();
    protected abstract void query(String sql);
    protected abstract void disconnect();
    
    // Concrete method - common functionality
    protected void log(String message) {
        System.out.println("[LOG] " + message);
    }
}

// Concrete implementation
class MySQLConnection extends DatabaseConnection {
    public MySQLConnection(String connectionString) {
        super(connectionString);
    }
    
    @Override
    protected void connect() {
        log("Connecting to MySQL database");
        // MySQL-specific connection logic
    }
    
    @Override
    protected void query(String sql) {
        log("Executing MySQL query: " + sql);
        // MySQL-specific query execution
    }
    
    @Override
    protected void disconnect() {
        log("Disconnecting from MySQL");
        // MySQL-specific disconnection logic
    }
}

// Usage - client doesn't need to know MySQL specifics
DatabaseConnection db = new MySQLConnection("mysql://localhost:3306/mydb");
db.executeQuery("SELECT * FROM users");  // Abstract interface
```
*Notice: Client code uses `executeQuery()` without knowing MySQL-specific implementation details.*

</div>

<div class="concept-section tools">

<details>
<summary>🧰 <strong>Abstraction tools</strong></summary>

<div>

- **Abstract classes**: partial implementation with abstract methods
- **Interfaces**: pure contracts without implementation
- **Template Method pattern**: algorithm skeleton with customizable steps
- **Strategy pattern**: interchangeable algorithms

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Where you fail in interviews</strong></summary>

<div>

- Can't distinguish abstraction from encapsulation
- Don't understand abstract class vs interface differences
- Can't explain when to use abstraction

</div>
</details>

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">abstraction</span>
<span class="tag">medior</span>
<span class="tag">design-patterns</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Abstract Classes` · `Interfaces` · `Template Method` · `Information Hiding` · `API Design`

</div>

## SOLID Principles

</div>

### Polymorphism {#polymorphism}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Polymorphism is like a universal remote: the same button (interface) can control different devices (implementations).*

</div>

**Key points:**
- Same interface, different implementations
- Runtime method resolution
- Method overloading and overriding
- Enables flexible and extensible code

```java
interface Shape {
    double calculateArea();
}

class Circle implements Shape {
    private double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }
}

class Rectangle implements Shape {
    private double width, height;
    
    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
    
    @Override
    public double calculateArea() {
        return width * height;
    }
}

// Polymorphic usage
Shape[] shapes = {new Circle(5), new Rectangle(4, 6)};
for (Shape shape : shapes) {
    System.out.println(shape.calculateArea()); // Different implementations called
}
```

### Abstraction {#abstraction}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Abstraction is like using a smartphone: you use apps without knowing the complex hardware and software underneath.*

</div>

**Key points:**
- Hide complex implementation details
- Show only essential features
- Abstract classes and interfaces
- Focus on what an object does, not how

```java
abstract class Vehicle {
    protected String brand;
    
    public Vehicle(String brand) {
        this.brand = brand;
    }
    
    // Abstract method - must be implemented by subclasses
    public abstract void start();
    
    // Concrete method - can be used by subclasses
    public void stop() {
        System.out.println(brand + " is stopping");
    }
}

class Car extends Vehicle {
    public Car(String brand) {
        super(brand);
    }
    
    @Override
    public void start() {
        System.out.println(brand + " car is starting with ignition");
    }
}
```

## SOLID Principles {#solid-principles}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*SOLID is like the five fundamental rules of architecture: if you follow them, you get a stable, flexible building (software).*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Maintainability**: easily modifiable and extensible code
- **Testability**: simpler unit testing
- **Loose coupling**: components can be developed independently

</div>

Five fundamental principles that help write clean, flexible, and maintainable object-oriented code.

### Single Responsibility Principle (SRP)

A class should have only one reason to change.

<div class="runnable-model">

**Runnable mental model**
```java
// BAD - multiple responsibilities
class Employee {
    private String name;
    private double salary;
    
    public void save() { /* DB saving */ }
    public void sendEmail() { /* Email sending */ }
    public double calculateTax() { /* Tax calculation */ }
    public void printReport() { /* Report printing */ }
}

// GOOD - separated responsibilities
class Employee {
    private String name;
    private double salary;
    // only employee data
}

class EmployeeRepository {
    public void save(Employee emp) { /* DB saving */ }
}

class EmailService {
    public void sendEmail(Employee emp, String message) { /* Email */ }
}

class TaxCalculator {
    public double calculateTax(Employee emp) { /* Tax calculation */ }
}
```
*Notice: each class has a single, well-defined responsibility.*

</div>

### Open/Closed Principle (OCP)

Open for extension, closed for modification.

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
        System.out.println("Credit card payment: " + amount);
    }
}

public class PayPalProcessor extends PaymentProcessor {
    @Override
    public void processPayment(double amount) {
        System.out.println("PayPal payment: " + amount);
    }
}

// I can add new payment methods without modifying existing code
public class BitcoinProcessor extends PaymentProcessor {
    @Override
    public void processPayment(double amount) {
        System.out.println("Bitcoin payment: " + amount);
    }
}
```

</div>

### Liskov Substitution Principle (LSP)

Derived classes must be substitutable for their base classes.

<div class="runnable-model">

**Runnable mental model**
```java
// BAD - violates LSP
class Rectangle {
    protected int width, height;
    
    public void setWidth(int w) { this.width = w; }
    public void setHeight(int h) { this.height = h; }
    public int getArea() { return width * height; }
}

class Square extends Rectangle {
    @Override
    public void setWidth(int w) {
        this.width = this.height = w; // Changes behavior!
    }
}

// GOOD - LSP-compatible design
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

### Interface Segregation Principle (ISP)

Don't depend on methods you don't use.

<div class="runnable-model">

**Runnable mental model**
```java
// BAD - interface too fat
interface Worker {
    void work();
    void eat();
    void sleep();
}

// GOOD - segregated interfaces
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
    // Robot doesn't eat or sleep
}
```

</div>

### Dependency Inversion Principle (DIP)

Depend on abstractions, not concretions.

<div class="runnable-model">

**Runnable mental model**
```java
// BAD - direct dependency
class OrderService {
    private EmailService emailService = new EmailService(); // tight coupling
    
    public void processOrder(Order order) {
        // process order
        emailService.sendConfirmation(order.getCustomerEmail());
    }
}

// GOOD - dependency inversion
interface NotificationService {
    void sendConfirmation(String email);
}

class EmailService implements NotificationService {
    public void sendConfirmation(String email) {
        System.out.println("Email sent to: " + email);
    }
}

class SMSService implements NotificationService {
    public void sendConfirmation(String phone) {
        System.out.println("SMS sent to: " + phone);
    }
}

class OrderService {
    private NotificationService notificationService;
    
    // Dependency injection
    public OrderService(NotificationService notificationService) {
        this.notificationService = notificationService;
    }
    
    public void processOrder(Order order) {
        // process order
        notificationService.sendConfirmation(order.getContactInfo());
    }
}
```

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Where you fail in interviews</strong></summary>

<div>

- Can't give concrete examples for each principle
- Don't understand the difference between SRP and cohesion
- Can't explain LSP violation consequences

</div>
</details>

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">solid</span>
<span class="tag">medior</span>
<span class="tag">design-principles</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Design Patterns` · `Clean Code` · `Dependency Injection` · `Interface Design` · `Code Quality`

</div>

### Object Lifecycle & Invariants {#object-lifecycle}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Object lifecycle is like a living organism: birth (construction), life (operations), and death (garbage collection).*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Resource management**: proper allocation and cleanup
- **Data integrity**: maintaining object invariants throughout lifecycle
- **Performance**: efficient object creation and destruction patterns

</div>

Managing objects from creation to destruction while maintaining their invariants.

<div class="runnable-model">

**Runnable mental model**
```java
public class DatabaseConnection {
    private Connection connection;
    private boolean isConnected;
    
    // Constructor - object birth
    public DatabaseConnection(String url) {
        this.connection = DriverManager.getConnection(url);
        this.isConnected = true;
        // Invariant: if object exists, connection should be valid
    }
    
    // Operations - object life
    public void executeQuery(String sql) {
        if (!isConnected) {
            throw new IllegalStateException("Connection is closed");
        }
        // Maintain invariant: only execute when connected
        connection.prepareStatement(sql).execute();
    }
    
    // Cleanup - preparing for death
    public void close() {
        if (isConnected) {
            connection.close();
            isConnected = false;
        }
        // Invariant maintained: connection is properly closed
    }
    
    // Finalizer - object death (not recommended in practice)
    @Override
    protected void finalize() throws Throwable {
        close(); // Emergency cleanup
        super.finalize();
    }
}

// Better approach: try-with-resources
try (DatabaseConnection db = new DatabaseConnection("jdbc:mysql://localhost")) {
    db.executeQuery("SELECT * FROM users");
} // Automatic cleanup
```

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>Lifecycle best practices</strong></summary>

<div>

- **Constructor validation**: ensure object starts in valid state
- **Immutable after construction**: prevent invalid state changes
- **Resource cleanup**: implement AutoCloseable for resources
- **Fail fast**: throw exceptions on invalid operations

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Constructor Design` · `Resource Management` · `Immutability` · `Exception Handling` · `Memory Management`

</div>

### Cohesion & Coupling {#cohesion-coupling}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Cohesion is like a well-organized toolbox where all tools serve one purpose. Coupling is like entangled Christmas lights - hard to change one without affecting others.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **High cohesion**: classes are focused and understandable
- **Low coupling**: changes don't cascade through the system
- **Maintainability**: easier to modify and test individual components

</div>

Cohesion measures how closely related elements within a module are. Coupling measures how dependent modules are on each other.

<div class="runnable-model">

**Runnable mental model**
```java
// LOW COHESION - unrelated responsibilities
class Utils {
    public void sendEmail(String address) { /* email logic */ }
    public double calculateTax(double income) { /* tax logic */ }
    public void saveToFile(String data) { /* file logic */ }
    // These methods have nothing in common!
}

// HIGH COHESION - related responsibilities
class EmailService {
    public void sendEmail(String address, String subject, String body) { }
    public void validateEmailAddress(String address) { }
    public void addToMailingList(String address) { }
    // All methods work together for email functionality
}

// TIGHT COUPLING - hard to change
class OrderProcessor {
    public void processOrder(Order order) {
        // Direct dependencies on concrete classes
        DatabaseConnection db = new DatabaseConnection();
        EmailService email = new EmailService();
        PaymentGateway payment = new PaymentGateway();
        
        db.save(order);
        email.sendConfirmation(order.getEmail());
        payment.charge(order.getAmount());
    }
}

// LOOSE COUPLING - easy to change
class OrderProcessor {
    private final OrderRepository repository;
    private final NotificationService notificationService;
    private final PaymentService paymentService;
    
    // Dependencies injected, not created
    public OrderProcessor(OrderRepository repo, 
                         NotificationService notification,
                         PaymentService payment) {
        this.repository = repo;
        this.notificationService = notification;
        this.paymentService = payment;
    }
    
    public void processOrder(Order order) {
        repository.save(order);
        notificationService.sendConfirmation(order);
        paymentService.charge(order);
    }
}
```

</div>

<div class="concept-section types">

<details>
<summary>🔍 <strong>Types of cohesion (best to worst)</strong></summary>

<div>

1. **Functional**: all elements work together for single task
2. **Sequential**: output of one element is input to next
3. **Communicational**: elements work on same data
4. **Procedural**: elements follow specific order
5. **Temporal**: elements executed at same time
6. **Logical**: elements logically categorized together
7. **Coincidental**: no meaningful relationship

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Dependency Injection` · `Interface Design` · `Single Responsibility` · `Module Design` · `Architecture`

</div>

### Law of Demeter {#law-of-demeter}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Don't talk to strangers - only communicate with your direct neighbors, don't ask them about their friends.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Loose coupling**: fewer dependencies on other objects' internal structures
- **Refactoring safety**: internal changes don't break distant code
- **Readability**: shorter, more understandable method call chains

</div>

An object should only communicate with its immediate "friends": own fields, parameters, created objects.

<div class="runnable-model">

**Runnable mental model**
```java
// BAD - Law of Demeter violation
class Customer {
    public void makePayment() {
        wallet.getCard().getAccount().withdraw(amount); // chain calls
        // This means Customer knows: Wallet -> Card -> Account structure
    }
}

// GOOD - Law of Demeter compliance
class Customer {
    private Wallet wallet;
    
    public void makePayment(Money amount) {
        wallet.pay(amount); // only talk to direct friend
    }
}

class Wallet {
    private Card card;
    
    public void pay(Money amount) {
        card.charge(amount); // Within Wallet, using Card is OK
    }
}

class Card {
    private Account account;
    
    public void charge(Money amount) {
        account.withdraw(amount); // Within Card, using Account is OK
    }
}

// Example of "friends"
class OrderProcessor {
    private Logger logger; // field - friend
    
    public void processOrder(Order order, Customer customer) { // parameter - friend
        PaymentResult result = new PaymentResult(); // created - friend
        
        // These are ALL OK according to Law of Demeter:
        logger.info("Processing order"); // field
        customer.makePayment(order.getTotal()); // parameter
        result.setStatus(SUCCESS); // created
        order.markAsPaid(); // parameter
    }
}
```
*Notice: each object only communicates with direct neighbors, no method chaining.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths / misconceptions</strong></summary>

<div>

- "Never call method on method result" → Fluent APIs (builders) are exceptions
- "Getter chains are always bad" → Allowed between value objects
- "Hurts performance" → Modern JVMs inline the calls

</div>
</details>

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Performance tips</strong></summary>

<div>

- **Method inlining**: modern JVMs optimize short method calls
- **Object creation**: delegation pattern means more objects but better structure
- **Cache locality**: less indirection means better memory access patterns

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Micro-learning prompts</strong></summary>

<div>

1) When is method chaining allowed?
<details><summary>Show answer</summary>
In fluent APIs (builder pattern), within the same object, or with value objects.
</details>

2) What's the relationship between "Tell, Don't Ask" principle and LoD?
<details><summary>Show answer</summary>
Both are about strengthening encapsulation: don't ask for state, tell what to do.
</details>

3) How to refactor Law of Demeter violations?
<details><summary>Show answer</summary>
Delegation pattern: add wrapper methods that hide internal structure.
</details>

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Where you fail in interviews</strong></summary>

<div>

- Exact definition of LoD "friends" (field, parameter, local variable, created object)
- Fluent API exception explanation
- Tell Don't Ask principle relationship

</div>
</details>

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">law-of-demeter</span>
<span class="tag">medior</span>
<span class="tag">coupling</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Encapsulation` · `Coupling` · `Tell Don't Ask` · `Fluent API` · `Delegation Pattern`

</div>

### Value Object vs Entity {#value-object-entity}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Value Objects are like money bills - two $20 bills are identical. Entities are like people - even twins have different identities.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Equality semantics**: value vs identity-based comparison
- **Immutability**: value objects should be immutable
- **Domain modeling**: captures business concepts correctly

</div>

Value Objects represent values without identity, while Entities have unique identity throughout their lifetime.

<div class="runnable-model">

**Runnable mental model**
```java
// VALUE OBJECT - no identity, immutable
public class Money {
    private final BigDecimal amount;
    private final Currency currency;
    
    public Money(BigDecimal amount, Currency currency) {
        this.amount = amount;
        this.currency = currency;
    }
    
    // Equality based on VALUE
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Money)) return false;
        Money money = (Money) obj;
        return Objects.equals(amount, money.amount) && 
               Objects.equals(currency, money.currency);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(amount, currency);
    }
    
    // Immutable operations return new instances
    public Money add(Money other) {
        if (!currency.equals(other.currency)) {
            throw new IllegalArgumentException("Currency mismatch");
        }
        return new Money(amount.add(other.amount), currency);
    }
}

// ENTITY - has identity, mutable
public class Customer {
    private final CustomerId id; // Identity field
    private String name;
    private String email;
    
    public Customer(CustomerId id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    
    // Equality based on IDENTITY
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Customer)) return false;
        Customer customer = (Customer) obj;
        return Objects.equals(id, customer.id); // Only ID matters!
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(id); // Only ID matters!
    }
    
    // Mutable operations change internal state
    public void updateEmail(String newEmail) {
        this.email = newEmail; // Same entity, different state
    }
}

// Usage comparison
Money tenDollars1 = new Money(new BigDecimal("10.00"), USD);
Money tenDollars2 = new Money(new BigDecimal("10.00"), USD);
System.out.println(tenDollars1.equals(tenDollars2)); // true - same value

Customer john1 = new Customer(new CustomerId("123"), "John", "john@example.com");
Customer john2 = new Customer(new CustomerId("123"), "John", "john@gmail.com");
System.out.println(john1.equals(john2)); // true - same identity, different email
```

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>Design guidelines</strong></summary>

<div>

**Value Objects:**
- Always immutable
- Equality based on all fields
- No setters, only factory methods
- Can be freely shared

**Entities:**
- Can be mutable
- Equality based only on ID
- Setters for state changes allowed
- Careful with sharing

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Where you fail in interviews</strong></summary>

<div>

- Can't explain why entities should only compare by ID
- Don't understand value object immutability requirements
- Mix up entity lifecycle with value object lifecycle

</div>
</details>

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">domain-modeling</span>
<span class="tag">medior</span>
<span class="tag">design</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Domain Driven Design` · `Immutability` · `Equals HashCode` · `Identity` · `Value Semantics`

</div>

## Common Design Patterns

### Factory Pattern
```java
interface Animal {
    void makeSound();
}

class AnimalFactory {
    public static Animal createAnimal(String type) {
        switch (type.toLowerCase()) {
            case "dog": return new Dog();
            case "cat": return new Cat();
            default: throw new IllegalArgumentException("Unknown animal type");
        }
    }
}
```

### Observer Pattern
```java
interface Observer {
    void update(String message);
}

class Subject {
    private List<Observer> observers = new ArrayList<>();
    
    public void addObserver(Observer observer) {
        observers.add(observer);
    }
    
    public void notifyObservers(String message) {
        for (Observer observer : observers) {
            observer.update(message);
        }
    }
}
```

### Interface vs Abstract Class {#interface-vs-abstract-class}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Interface = contract ("what to do"), Abstract Class = partially finished template ("how to do it, but you decide some parts").*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Multiple inheritance**: interfaces allow implementing multiple "contracts"
- **Contract definition**: interface defines pure contracts
- **Code reuse**: abstract class provides common implementation

</div>

Two different ways to achieve abstraction, with different purposes and capabilities.

<div class="runnable-model">

**Runnable mental model**
```java
// INTERFACE - pure contract
public interface Drawable {
    void draw();                    // abstract method
    void setColor(String color);    // abstract method
    
    // Java 8+ default method
    default void highlight() {
        System.out.println("Highlighting...");
    }
    
    // Java 8+ static method
    static void info() {
        System.out.println("Drawable interface info");
    }
}

// ABSTRACT CLASS - partial implementation
public abstract class Shape {
    protected String color;         // can have fields
    protected double area;
    
    // Constructor
    public Shape(String color) {
        this.color = color;
    }
    
    // Concrete method - common implementation
    public String getColor() {
        return color;
    }
    
    // Abstract method - must be implemented
    public abstract double calculateArea();
    public abstract void draw();
    
    // Template method
    public final void display() {
        System.out.println("Drawing " + color + " shape");
        draw();
        System.out.println("Area: " + calculateArea());
    }
}

// Implementation comparison
class Circle extends Shape implements Drawable {
    private double radius;
    
    public Circle(String color, double radius) {
        super(color);  // Call abstract class constructor
        this.radius = radius;
    }
    
    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing a circle");
    }
    
    @Override
    public void setColor(String color) {
        this.color = color;
    }
}
```

</div>

<div class="concept-section comparison">

<details>
<summary>🔄 <strong>Interface vs Abstract Class comparison</strong></summary>

<div>

| Feature | Interface | Abstract Class |
|---------|-----------|----------------|
| **Multiple inheritance** | ✅ Can implement multiple | ❌ Single inheritance only |
| **Fields** | ❌ Only public static final | ✅ Any access modifier |
| **Constructors** | ❌ Cannot have | ✅ Can have constructors |
| **Method types** | Abstract, default, static | Abstract, concrete, static |
| **Access modifiers** | Public (implicitly) | Any access modifier |
| **When to use** | Pure contracts, capabilities | Shared code + some abstraction |

</div>
</details>

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>When to choose which</strong></summary>

<div>

**Use Interface when:**
- Defining a contract/capability (Serializable, Comparable)
- Multiple inheritance needed
- No shared implementation required
- Future flexibility important

**Use Abstract Class when:**
- Sharing code among related classes
- Need constructors or instance fields
- Want to provide default implementations
- Related classes form a clear hierarchy

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Where you fail in interviews</strong></summary>

<div>

- Can't explain when to use interface vs abstract class
- Don't understand Java 8+ interface features (default methods)
- Can't design a proper abstraction hierarchy

</div>
</details>

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">interface</span>
<span class="tag">abstract-class</span>
<span class="tag">medior</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Multiple Inheritance` · `Default Methods` · `Contract Design` · `Template Method` · `Code Reuse`

</div>

### Access Modifiers & Visibility {#access-modifiers}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Access modifiers are like security clearance levels: they control who can access what information.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Encapsulation control**: fine-grained access control
- **Security**: protect sensitive data and methods
- **API design**: clear public interface separation
- **Maintainability**: reduce coupling between classes

</div>

Controlling the visibility and accessibility of classes, methods, and fields.

<div class="runnable-model">

**Runnable mental model**
```java
public class AccessExample {
    public String publicField;        // Accessible everywhere
    protected String protectedField;  // Package + subclasses
    String packageField;              // Package-private (default)
    private String privateField;      // Only within this class
    
    public void publicMethod() {
        // Accessible from anywhere
        System.out.println("Public method");
    }
    
    protected void protectedMethod() {
        // Accessible from package and subclasses
        System.out.println("Protected method");
    }
    
    void packageMethod() {
        // Package-private (default)
        System.out.println("Package method");
    }
    
    private void privateMethod() {
        // Only within this class
        System.out.println("Private method");
    }
}

// Same package
class SamePackageClass {
    public void test() {
        AccessExample obj = new AccessExample();
        obj.publicField = "OK";     // ✅ public
        obj.protectedField = "OK";  // ✅ protected (same package)
        obj.packageField = "OK";    // ✅ package-private
        // obj.privateField = "NO"; // ❌ private
        
        obj.publicMethod();    // ✅ public
        obj.protectedMethod(); // ✅ protected (same package)
        obj.packageMethod();   // ✅ package-private
        // obj.privateMethod(); // ❌ private
    }
}

// Different package
class DifferentPackageSubclass extends AccessExample {
    public void test() {
        // this.publicField = "OK";     // ✅ public
        // this.protectedField = "OK";  // ✅ protected (inheritance)
        // this.packageField = "NO";    // ❌ package-private
        // this.privateField = "NO";    // ❌ private
        
        this.publicMethod();    // ✅ public
        this.protectedMethod(); // ✅ protected (inheritance)
        // this.packageMethod();   // ❌ package-private
        // this.privateMethod();   // ❌ private
    }
}
```

</div>

<div class="concept-section visibility-table">

<details>
<summary>📊 <strong>Access modifier visibility table</strong></summary>

<div>

| Modifier | Same Class | Same Package | Subclass (different package) | Different Package |
|----------|------------|--------------|-------------------------------|-------------------|
| **public** | ✅ | ✅ | ✅ | ✅ |
| **protected** | ✅ | ✅ | ✅ | ❌ |
| **default** (package-private) | ✅ | ✅ | ❌ | ❌ |
| **private** | ✅ | ❌ | ❌ | ❌ |

</div>
</details>

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>Access modifier best practices</strong></summary>

<div>

- **Start with private**: use the most restrictive access first
- **Public API minimal**: only expose what's necessary
- **Protected for inheritance**: when subclasses need access
- **Package-private for testing**: internal APIs for test access

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Encapsulation` · `Information Hiding` · `Package Design` · `API Design` · `Security`

</div>

### Common Design Patterns {#detailed-design-patterns}

#### Singleton Pattern

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Singleton is like a president of a country: there can only be one at a time.*

</div>

```java
// Thread-safe singleton with lazy initialization
public class DatabaseManager {
    private static volatile DatabaseManager instance;
    private Connection connection;
    
    private DatabaseManager() {
        // Private constructor prevents instantiation
        this.connection = createConnection();
    }
    
    public static DatabaseManager getInstance() {
        if (instance == null) {
            synchronized (DatabaseManager.class) {
                if (instance == null) {
                    instance = new DatabaseManager();
                }
            }
        }
        return instance;
    }
    
    public Connection getConnection() {
        return connection;
    }
}
```

#### Factory Pattern

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Factory is like a restaurant kitchen: you order what you want, but you don't need to know how it's made.*

</div>

```java
// Product interface
interface Vehicle {
    void start();
    void stop();
}

// Concrete products
class Car implements Vehicle {
    public void start() { System.out.println("Car started"); }
    public void stop() { System.out.println("Car stopped"); }
}

class Motorcycle implements Vehicle {
    public void start() { System.out.println("Motorcycle started"); }
    public void stop() { System.out.println("Motorcycle stopped"); }
}

// Factory
class VehicleFactory {
    public static Vehicle createVehicle(String type) {
        switch (type.toLowerCase()) {
            case "car": return new Car();
            case "motorcycle": return new Motorcycle();
            default: throw new IllegalArgumentException("Unknown vehicle type");
        }
    }
}

// Usage
Vehicle vehicle = VehicleFactory.createVehicle("car");
vehicle.start();
```

#### Observer Pattern

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Observer is like a newsletter subscription: when something interesting happens, all subscribers get notified.*

</div>

```java
// Observer interface
interface NewsObserver {
    void update(String news);
}

// Concrete observers
class EmailSubscriber implements NewsObserver {
    private String email;
    
    public EmailSubscriber(String email) {
        this.email = email;
    }
    
    @Override
    public void update(String news) {
        System.out.println("Email to " + email + ": " + news);
    }
}

class SMSSubscriber implements NewsObserver {
    private String phoneNumber;
    
    public SMSSubscriber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    
    @Override
    public void update(String news) {
        System.out.println("SMS to " + phoneNumber + ": " + news);
    }
}

// Subject
class NewsAgency {
    private List<NewsObserver> observers = new ArrayList<>();
    private String latestNews;
    
    public void addObserver(NewsObserver observer) {
        observers.add(observer);
    }
    
    public void removeObserver(NewsObserver observer) {
        observers.remove(observer);
    }
    
    public void setNews(String news) {
        this.latestNews = news;
        notifyObservers();
    }
    
    private void notifyObservers() {
        for (NewsObserver observer : observers) {
            observer.update(latestNews);
        }
    }
}

// Usage
NewsAgency agency = new NewsAgency();
agency.addObserver(new EmailSubscriber("user@example.com"));
agency.addObserver(new SMSSubscriber("+1234567890"));
agency.setNews("Breaking: OOP principles explained!");
```

#### Strategy Pattern

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Strategy is like choosing different routes to the same destination: the goal is the same, but the method varies.*

</div>

```java
// Strategy interface
interface PaymentStrategy {
    void pay(double amount);
}

// Concrete strategies
class CreditCardPayment implements PaymentStrategy {
    private String cardNumber;
    
    public CreditCardPayment(String cardNumber) {
        this.cardNumber = cardNumber;
    }
    
    @Override
    public void pay(double amount) {
        System.out.println("Paid $" + amount + " with credit card " + cardNumber);
    }
}

class PayPalPayment implements PaymentStrategy {
    private String email;
    
    public PayPalPayment(String email) {
        this.email = email;
    }
    
    @Override
    public void pay(double amount) {
        System.out.println("Paid $" + amount + " via PayPal " + email);
    }
}

// Context
class ShoppingCart {
    private PaymentStrategy paymentStrategy;
    private double totalAmount;
    
    public void setPaymentStrategy(PaymentStrategy strategy) {
        this.paymentStrategy = strategy;
    }
    
    public void checkout() {
        if (paymentStrategy == null) {
            throw new IllegalStateException("Payment strategy not set");
        }
        paymentStrategy.pay(totalAmount);
    }
    
    public void addItem(double price) {
        totalAmount += price;
    }
}

// Usage
ShoppingCart cart = new ShoppingCart();
cart.addItem(50.0);
cart.addItem(30.0);

cart.setPaymentStrategy(new CreditCardPayment("1234-5678-9012-3456"));
cart.checkout(); // Pays with credit card

cart.setPaymentStrategy(new PayPalPayment("user@example.com"));
cart.checkout(); // Pays with PayPal
```

### Thread-Safety in OOP {#thread-safety-oop}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Thread-safety is like traffic rules: they prevent accidents when multiple cars (threads) use the same road (shared resources).*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Data integrity**: prevent race conditions and data corruption
- **Consistency**: ensure objects remain in valid states
- **Performance**: balance safety with efficiency
- **Scalability**: enable safe concurrent access

</div>

Ensuring that objects behave correctly when accessed by multiple threads simultaneously.

<div class="runnable-model">

**Runnable mental model**
```java
// NOT thread-safe
class UnsafeCounter {
    private int count = 0;
    
    public void increment() {
        count++;  // Race condition: read-modify-write
    }
    
    public int getCount() {
        return count;  // May return inconsistent values
    }
}

// Thread-safe with synchronized methods
class SafeCounter {
    private int count = 0;
    
    public synchronized void increment() {
        count++;  // Synchronized: only one thread at a time
    }
    
    public synchronized int getCount() {
        return count;  // Consistent read
    }
}

// Thread-safe with atomic operations
class AtomicCounter {
    private final AtomicInteger count = new AtomicInteger(0);
    
    public void increment() {
        count.incrementAndGet();  // Atomic operation
    }
    
    public int getCount() {
        return count.get();  // Atomic read
    }
}

// Immutable object (inherently thread-safe)
public final class ImmutablePerson {
    private final String name;
    private final int age;
    
    public ImmutablePerson(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String getName() { return name; }
    public int getAge() { return age; }
    
    // No setter methods - object cannot be modified after creation
    public ImmutablePerson withAge(int newAge) {
        return new ImmutablePerson(this.name, newAge);  // Returns new instance
    }
}
```

</div>

<div class="concept-section strategies">

<details>
<summary>🛡️ <strong>Thread-safety strategies</strong></summary>

<div>

1. **Synchronization**: `synchronized` methods/blocks
2. **Atomic operations**: `AtomicInteger`, `AtomicReference`
3. **Immutability**: objects that cannot be modified
4. **Thread confinement**: each thread owns its data
5. **Concurrent collections**: `ConcurrentHashMap`, `BlockingQueue`
6. **Locks**: `ReentrantLock`, `ReadWriteLock`

</div>
</details>

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Performance considerations</strong></summary>

<div>

- **Synchronization overhead**: every sync operation has cost
- **Lock contention**: threads waiting for locks
- **False sharing**: cache line conflicts
- **Lock-free algorithms**: better performance, higher complexity

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Concurrency` · `Synchronization` · `Atomic Operations` · `Immutability` · `Lock-free Programming`

</div>

## Anti-patterns

### God Object

**Problem**: A class that knows too much or does too much.

```java
// BAD: God Object
class OrderManager {
    public void processOrder(Order order) { /*...*/ }
    public void validatePayment(Payment payment) { /*...*/ }
    public void updateInventory(Product product) { /*...*/ }
    public void sendEmail(String email) { /*...*/ }
    public void generateReport() { /*...*/ }
    public void connectDatabase() { /*...*/ }
    // ... 50+ more methods
}

// GOOD: Separated responsibilities
class OrderService {
    private PaymentValidator paymentValidator;
    private InventoryManager inventoryManager;
    private EmailService emailService;
    
    public void processOrder(Order order) {
        paymentValidator.validate(order.getPayment());
        inventoryManager.reserve(order.getItems());
        emailService.sendConfirmation(order.getCustomerEmail());
    }
}
```

### Inappropriate Inheritance

**Problem**: Using inheritance when composition would be better.

```java
// BAD: Inappropriate inheritance
class Stack extends ArrayList<String> {
    public void push(String item) {
        add(item);
    }
    
    public String pop() {
        return remove(size() - 1);
    }
}
// Problem: Stack inherits all ArrayList methods, breaking stack semantics

// GOOD: Composition
class Stack {
    private List<String> items = new ArrayList<>();
    
    public void push(String item) {
        items.add(item);
    }
    
    public String pop() {
        return items.remove(items.size() - 1);
    }
    
    // Only stack operations exposed
}
```

### GRASP Principles {#grasp-principles}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*GRASP is like good hosting rules: who should do what so the party (code) runs smoothly.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Responsibility assignment**: helps decide which class should do what
- **Low coupling, high cohesion**: automatically results in better design
- **OO design thinking**: structured thinking framework

</div>

General Responsibility Assignment Software Patterns - nine fundamental principles for distributing responsibilities among objects.

<div class="runnable-model">

**Runnable mental model**
```java
// INFORMATION EXPERT - who has the most information
class Order {
    private List<OrderItem> items;
    private Customer customer;
    
    // Order knows everything about items -> it should calculate total
    public Money calculateTotal() {
        return items.stream()
                   .map(OrderItem::getSubtotal)
                   .reduce(Money.ZERO, Money::add);
    }
}

// CREATOR - A creates B if A contains/aggregates B
class ShoppingCart {
    private List<CartItem> items = new ArrayList<>();
    
    // ShoppingCart creates CartItems because it manages them
    public void addProduct(Product product, int quantity) {
        CartItem item = new CartItem(product, quantity); // CREATOR
        items.add(item);
    }
}

// CONTROLLER - coordinates use cases
class OrderController {
    private OrderService orderService;
    private PaymentService paymentService;
    private NotificationService notificationService;
    
    // Controller coordinates complex business operations
    public void processOrder(OrderRequest request) {
        Order order = orderService.createOrder(request);
        PaymentResult payment = paymentService.processPayment(order);
        notificationService.sendConfirmation(order, payment);
    }
}

// LOW COUPLING - minimal dependencies
interface PaymentGateway {
    PaymentResult charge(Money amount, PaymentMethod method);
}

class PaymentService {
    private PaymentGateway gateway; // interface dependency - low coupling
    
    public PaymentService(PaymentGateway gateway) {
        this.gateway = gateway;
    }
}

// HIGH COHESION - related functionality together
class PriceCalculator {
    public Money calculateBasePrice(Product product, int quantity) { /* ... */ }
    public Money calculateDiscount(Money basePrice, Customer customer) { /* ... */ }
    public Money calculateTax(Money discountedPrice, Address address) { /* ... */ }
    public Money calculateShipping(Money subtotal, Address address) { /* ... */ }
    // All methods related to price calculation
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

// PURE FABRICATION - artificial class for better design
class DatabaseConnectionPool {
    private Queue<Connection> availableConnections;
    private Set<Connection> usedConnections;
    
    public Connection getConnection() {
        // Manage connection pooling logic
        // This class doesn't represent real-world concept
        // but improves design
    }
}

// INDIRECTION - intermediate object to reduce coupling
interface PaymentProcessor {
    void processPayment(PaymentDetails details);
}

class PaymentFacade implements PaymentProcessor {
    private CreditCardProcessor creditCardProcessor;
    private PayPalProcessor paypalProcessor;
    private BankTransferProcessor bankProcessor;
    
    @Override
    public void processPayment(PaymentDetails details) {
        // Route to appropriate processor based on payment type
        // Clients don't depend directly on specific processors
    }
}

// PROTECTED VARIATIONS - wrap unstable elements
interface CurrencyConverter {
    Money convert(Money amount, Currency fromCurrency, Currency toCurrency);
}

class CurrencyService {
    private CurrencyConverter converter; // Interface shields from API changes
    
    public Money convertToUSD(Money amount, Currency currency) {
        return converter.convert(amount, currency, Currency.USD);
    }
}
```

</div>

<div class="concept-section principles">

<details>
<summary>📋 <strong>The 9 GRASP Principles</strong></summary>

<div>

1. **Information Expert**: Assign responsibility to class with most information
2. **Creator**: A creates B if A contains/uses/records B
3. **Controller**: Coordinates and controls use case flow
4. **Low Coupling**: Minimize dependencies between classes
5. **High Cohesion**: Keep related functionality together
6. **Polymorphism**: Use type-based behavior variation
7. **Pure Fabrication**: Create artificial classes for better design
8. **Indirection**: Use intermediate objects to reduce coupling
9. **Protected Variations**: Shield unstable elements behind interfaces

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Where you fail in interviews</strong></summary>

<div>

- Can't explain Information Expert principle with examples
- Don't understand difference between Controller and Facade patterns
- Can't identify when to use Pure Fabrication

</div>
</details>

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">grasp</span>
<span class="tag">medior</span>
<span class="tag">design-principles</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`SOLID Principles` · `Design Patterns` · `Responsibility Assignment` · `Coupling` · `Cohesion`

</div>

### Thread-Safety in OOP {#thread-safety-oop}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Thread-safety is like traffic rules: without them, multiple cars (threads) accessing the same intersection (object) causes crashes.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Data integrity**: prevent corrupted state in concurrent environments
- **Predictable behavior**: ensure consistent results regardless of thread timing
- **Scalability**: enable safe parallel processing

</div>

Designing objects that can be safely accessed by multiple threads simultaneously without causing data corruption or inconsistent state.

<div class="runnable-model">

**Runnable mental model**
```java
// THREAD-UNSAFE - Race condition
class UnsafeCounter {
    private int count = 0;
    
    public void increment() {
        count++;  // Read-modify-write race condition
    }
    
    public int getCount() {
        return count;  // May return inconsistent value
    }
}

// THREAD-SAFE with synchronized methods
class SafeCounter {
    private int count = 0;
    
    public synchronized void increment() {
        count++;  // Synchronized access
    }
    
    public synchronized int getCount() {
        return count;  // Consistent read
    }
}

// THREAD-SAFE with AtomicInteger
class AtomicCounter {
    private final AtomicInteger count = new AtomicInteger(0);
    
    public void increment() {
        count.incrementAndGet();  // Atomic operation
    }
    
    public int getCount() {
        return count.get();  // Atomic read
    }
}

// IMMUTABLE OBJECTS - inherently thread-safe
class ImmutablePerson {
    private final String name;
    private final int age;
    private final List<String> hobbies;
    
    public ImmutablePerson(String name, int age, List<String> hobbies) {
        this.name = name;
        this.age = age;
        this.hobbies = Collections.unmodifiableList(new ArrayList<>(hobbies));
    }
    
    public String getName() { return name; }
    public int getAge() { return age; }
    public List<String> getHobbies() { return hobbies; }
    
    // No setters - object cannot be modified after creation
}

// THREAD-LOCAL storage
class UserContextHolder {
    private static final ThreadLocal<User> userHolder = new ThreadLocal<>();
    
    public static void setCurrentUser(User user) {
        userHolder.set(user);
    }
    
    public static User getCurrentUser() {
        return userHolder.get();
    }
    
    public static void clear() {
        userHolder.remove();  // Prevent memory leaks
    }
}

// CONCURRENT COLLECTIONS
class ThreadSafeCache<K, V> {
    private final ConcurrentHashMap<K, V> cache = new ConcurrentHashMap<>();
    
    public V get(K key) {
        return cache.get(key);
    }
    
    public V putIfAbsent(K key, V value) {
        return cache.putIfAbsent(key, value);  // Atomic operation
    }
    
    public void clear() {
        cache.clear();
    }
}
```

</div>

<div class="concept-section strategies">

<details>
<summary>🛡️ <strong>Thread-safety strategies</strong></summary>

<div>

- **Immutability**: Objects that cannot be modified after creation
- **Synchronization**: Using synchronized blocks/methods
- **Atomic operations**: Using java.util.concurrent.atomic classes
- **Thread confinement**: Each thread has its own copy (ThreadLocal)
- **Concurrent collections**: Thread-safe data structures

</div>
</details>

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Performance considerations</strong></summary>

<div>

- **Synchronized overhead**: Can create bottlenecks with high contention
- **Lock-free algorithms**: Better performance but more complex
- **Read-write locks**: Allow concurrent reads, exclusive writes
- **Compare-and-swap**: Hardware-level atomic operations

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Concurrency` · `Immutability` · `Synchronization` · `Atomic Operations` · `Thread Confinement`

</div>

## Best Practices

1. **Favor composition over inheritance**: Use "has-a" relationships when possible
2. **Program to interfaces**: Depend on abstractions, not concrete classes
3. **Keep classes small and focused**: Single Responsibility Principle
4. **Use meaningful names**: Class and method names should be self-documenting
5. **Minimize coupling**: Reduce dependencies between classes
6. **Maximize cohesion**: Group related functionality together

## Common Anti-patterns

### God Object Anti-pattern

A class that knows too much or does too much, violating Single Responsibility Principle.

```java
// BAD: God Object
class OrderManager {
    // Order management
    public void createOrder(OrderData data) { /* ... */ }
    public void updateOrder(Order order) { /* ... */ }
    
    // Customer management
    public void createCustomer(CustomerData data) { /* ... */ }
    public void updateCustomer(Customer customer) { /* ... */ }
    
    // Inventory management
    public void updateInventory(Product product, int quantity) { /* ... */ }
    public void checkStock(Product product) { /* ... */ }
    
    // Payment processing
    public void processPayment(PaymentDetails details) { /* ... */ }
    public void refundPayment(String transactionId) { /* ... */ }
    
    // Email notifications
    public void sendOrderConfirmation(Order order) { /* ... */ }
    public void sendShippingNotification(Order order) { /* ... */ }
    
    // Reporting
    public void generateSalesReport() { /* ... */ }
    public void generateInventoryReport() { /* ... */ }
}

// GOOD: Separated responsibilities
class OrderService {
    public void createOrder(OrderData data) { /* ... */ }
    public void updateOrder(Order order) { /* ... */ }
}

class CustomerService {
    public void createCustomer(CustomerData data) { /* ... */ }
    public void updateCustomer(Customer customer) { /* ... */ }
}

class InventoryService {
    public void updateInventory(Product product, int quantity) { /* ... */ }
    public void checkStock(Product product) { /* ... */ }
}
```

### Inappropriate Inheritance

Using inheritance when composition would be more appropriate.

```java
// BAD: Inappropriate inheritance
class Rectangle {
    protected int width, height;
    
    public void setWidth(int width) { this.width = width; }
    public void setHeight(int height) { this.height = height; }
    public int getArea() { return width * height; }
}

class Square extends Rectangle {
    @Override
    public void setWidth(int width) {
        this.width = width;
        this.height = width;  // Violates Liskov Substitution Principle
    }
    
    @Override
    public void setHeight(int height) {
        this.width = height;
        this.height = height;  // Violates Liskov Substitution Principle
    }
}

// GOOD: Composition approach
interface Shape {
    int getArea();
}

class Rectangle implements Shape {
    private final int width, height;
    
    public Rectangle(int width, int height) {
        this.width = width;
        this.height = height;
    }
    
    public int getArea() { return width * height; }
}

class Square implements Shape {
    private final int side;
    
    public Square(int side) {
        this.side = side;
    }
    
    public int getArea() { return side * side; }
}
```

### Tight Coupling

Classes that depend too heavily on each other's internal implementation.

```java
// BAD: Tight coupling
class EmailService {
    public void sendEmail(String to, String subject, String body) {
        SMTPServer server = new SMTPServer("smtp.company.com", 587);
        server.authenticate("user@company.com", "password123");
        server.send(new Email(to, subject, body));
        server.disconnect();
    }
}

// GOOD: Loose coupling with dependency injection
interface EmailGateway {
    void sendEmail(String to, String subject, String body);
}

class EmailService {
    private final EmailGateway emailGateway;
    
    public EmailService(EmailGateway emailGateway) {
        this.emailGateway = emailGateway;
    }
    
    public void sendEmail(String to, String subject, String body) {
        emailGateway.sendEmail(to, subject, body);
    }
}

class SMTPEmailGateway implements EmailGateway {
    private final String server;
    private final int port;
    
    public SMTPEmailGateway(String server, int port) {
        this.server = server;
        this.port = port;
    }
    
    @Override
    public void sendEmail(String to, String subject, String body) {
        // SMTP implementation details
    }
}
```

## Interview Questions

### Junior Level Questions

1. **What are the four pillars of OOP?**
   - Encapsulation, Inheritance, Polymorphism, Abstraction

2. **What's the difference between encapsulation and abstraction?**
   - Encapsulation: Bundling data and methods together, hiding internal implementation
   - Abstraction: Hiding complexity by showing only essential features

3. **Explain inheritance with an example.**
   - Child class inherits properties and methods from parent class
   - Example: `Dog extends Animal`

4. **What is method overriding?**
   - Child class provides specific implementation of method defined in parent class
   - Uses `@Override` annotation in Java

### Senior Level Questions

1. **Explain the Liskov Substitution Principle with a violation example.**
   - Objects of superclass should be replaceable with objects of subclass without breaking application
   - Violation: Square extending Rectangle where setting width/height behaves differently

2. **When would you choose composition over inheritance?**
   - When relationship is "has-a" rather than "is-a"
   - To avoid tight coupling and inheritance hierarchy problems
   - For better flexibility and runtime behavior changes

3. **Explain the Law of Demeter with code example.**
   - Object should only talk to its immediate friends
   - Avoid: `customer.getAddress().getCity().getName()`
   - Prefer: `customer.getCityName()`

4. **How do you ensure thread-safety in OOP design?**
   - Immutable objects, synchronization, atomic operations, thread confinement
   - Example: Using `ConcurrentHashMap` instead of `HashMap`

## Practical Exercise

### Task: E-commerce System Design

Design a simplified e-commerce system using OOP principles. Include:

**Requirements:**
- Products with different types (Physical, Digital)
- Shopping cart functionality
- Order processing
- Payment handling
- User management

**Classes to implement:**
```java
// Base classes
abstract class Product {
    protected String id;
    protected String name;
    protected Money price;
    
    public abstract boolean isShippable();
    public abstract Money calculateShipping(Address address);
}

interface PaymentProcessor {
    PaymentResult process(Payment payment);
}

class ShoppingCart {
    private List<CartItem> items;
    private Customer customer;
    
    public void addItem(Product product, int quantity) { /* TODO */ }
    public Money calculateTotal() { /* TODO */ }
    public Order checkout() { /* TODO */ }
}

// Your task: Implement the missing classes following OOP principles
```

**Evaluation criteria:**
- Proper use of inheritance and composition
- Adherence to SOLID principles
- Appropriate design patterns
- Thread-safety considerations
- Code readability and maintainability

## Related Topics

- [Java Fundamentals](/theory/java) - Language-specific OOP implementation
- [Design Patterns](/theory/patterns) - Common solutions to recurring problems
- [SOLID Principles](/theory/solid) - Detailed explanation of design principles
- [Clean Code](/theory/clean-code) - Writing maintainable object-oriented code
- [Testing](/theory/testing) - Testing object-oriented systems

## Further Reading

- "Design Patterns: Elements of Reusable Object-Oriented Software" by Gang of Four
- "Clean Code: A Handbook of Agile Software Craftsmanship" by Robert C. Martin
- "Effective Java" by Joshua Bloch
- "Object-Oriented Analysis and Design with Applications" by Grady Booch
- "Refactoring: Improving the Design of Existing Code" by Martin Fowler