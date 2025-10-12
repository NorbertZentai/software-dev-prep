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

<div class="concept-section definition">

📋 **Concept Definition**  
**Bundling data and methods** operating on that data within single unit (class), restricting direct access to internal state. **Access modifiers**: private (class only), protected (class + subclasses), public (everywhere), package-private/default (same package). **Implementation**: private fields with public getter/setter methods (properties), validation in setters. **Benefits**: prevents invalid state, controlled access, implementation flexibility (change internals without breaking clients). **Information hiding**: expose minimal necessary interface. Java: JavaBeans convention (getX/setX/isX methods).

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

<div class="concept-section definition">

📋 **Concept Definition**  
**IS-A relationship** where subclass inherits fields and methods from superclass, extending/overriding behavior. **Java syntax**: extends keyword (single inheritance), super() calls parent constructor, @Override annotation. **Types**: single inheritance (one parent), multilevel (chain), hierarchical (multiple children from one parent). **Method overriding**: subclass provides specific implementation of parent method (runtime polymorphism). **Protected access**: allows subclass access. **Composition over inheritance**: prefer HAS-A relationship (composition) for flexibility. **Abstract classes**: cannot instantiate, may have abstract methods (contract for subclasses).

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Single interface with multiple implementations**: object can take many forms. **Types**: **Compile-time polymorphism** (method overloading: same name, different parameters), **Runtime polymorphism** (method overriding: subclass replaces parent implementation, resolved via dynamic dispatch). **Mechanism**: virtual method table (vtable) for runtime lookup, Object reference can hold subclass instance (Shape shape = new Circle()). **Covariant return types**: overriding method can return subtype. **Interface polymorphism**: implement multiple interfaces. Enables writing generic code working with different types through common interface.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Hiding implementation complexity**, exposing only essential characteristics and behaviors. **Mechanisms**: **Abstract classes** (0-100% abstract methods, can have state/concrete methods), **Interfaces** (100% abstract pre-Java 8, now allows default/static methods). **Abstract methods**: declared without body, subclass must implement. **Purpose**: define contract (what operations available), defer implementation details to subclasses. **Template Method pattern**: abstract class defines algorithm skeleton, subclasses fill steps. **Abstraction levels**: high-level concepts (shapes, vehicles) to low-level implementation (rendering, engine mechanics).

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Single interface with multiple implementations**: object can take many forms. **Types**: **Compile-time polymorphism** (method overloading: same name, different parameters), **Runtime polymorphism** (method overriding: subclass replaces parent implementation, resolved via dynamic dispatch). **Mechanism**: virtual method table (vtable) for runtime lookup, Object reference can hold subclass instance (Shape shape = new Circle()). **Covariant return types**: overriding method can return subtype. **Interface polymorphism**: implement multiple interfaces. Enables writing generic code working with different types through common interface.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Hiding implementation complexity**, exposing only essential characteristics and behaviors. **Mechanisms**: **Abstract classes** (0-100% abstract methods, can have state/concrete methods), **Interfaces** (100% abstract pre-Java 8, now allows default/static methods). **Abstract methods**: declared without body, subclass must implement. **Purpose**: define contract (what operations available), defer implementation details to subclasses. **Template Method pattern**: abstract class defines algorithm skeleton, subclasses fill steps. **Abstraction levels**: high-level concepts (shapes, vehicles) to low-level implementation (rendering, engine mechanics).

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Five object-oriented design principles** (Robert C. Martin): **S**ingle Responsibility (class has one reason to change), **O**pen/Closed (open for extension, closed for modification), **L**iskov Substitution (subtypes must be substitutable for base types), **I**nterface Segregation (many specific interfaces better than one general), **D**ependency Inversion (depend on abstractions not concretions, high-level modules shouldn't depend on low-level). **Implementation**: use interfaces, dependency injection, favor composition. **Benefits**: maintainable, testable, flexible code. **Trade-offs**: may increase initial complexity, over-engineering risk.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Object creation to destruction process**: constructor (initialization), usage (method calls), finalization (cleanup, garbage collection). **Object invariant**: condition remaining true throughout object's lifecycle. Constructor ensures valid initial state, public methods preserve invariant. Immutable objects have simpler lifecycle management. **Java specifics**: constructor chaining (this/super), finalize() deprecated (use try-with-resources, AutoCloseable), garbage collection (reachability-based). **Design patterns**: Factory (centralized creation), Singleton (controlled lifecycle), Object Pool (reuse expensive objects), Prototype (clone-based creation).

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Cohesion**: degree to which elements within module belong together (high cohesion = focused responsibility). **Coupling**: degree of interdependence between modules (low coupling = minimal dependencies). **Cohesion types**: functional (best), sequential, communicational, procedural, temporal, logical, coincidental (worst). **Coupling types**: content (worst), common, external, control, stamp, data (best), message (best). **Goal**: high cohesion + low coupling. **Techniques**: encapsulation, dependency injection, interfaces, events. **Metrics**: LCOM (Lack of Cohesion of Methods), afferent/efferent coupling.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Principle of Least Knowledge**: object should only call methods of: itself, parameters passed, objects it creates, its direct component objects. **Avoid**: chaining calls through intermediate objects (a.getB().getC().doSomething()). **Benefits**: reduces coupling, makes code resilient to changes in distant objects. **Violation example**: order.getCustomer().getAddress().getCity() - knows too much about Customer and Address structure. **Better**: order.getCustomerCity() - encapsulates navigation. **Trade-off**: may require wrapper methods. Also called "Don't Talk to Strangers" or "Principle of Least Knowledge".

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Domain-Driven Design concepts**: **Value Objects** defined by attributes (equality by value: two Money(100, USD) are same), immutable, no identity, e.g., Money, Address, DateRange. **Entities** defined by identity (equality by ID: two Person objects with same data but different IDs are different), mutable, continuous identity throughout lifecycle, e.g., User, Order, Product. **Implementation**: Value Objects override equals/hashCode based on all fields, Entities use ID field only. **Benefits**: Value Objects are thread-safe (immutable), Entities track state changes. Java Records perfect for Value Objects.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Interface**: 100% abstraction (pre-Java 8), pure contract, no state, multiple inheritance, all methods public. Java 8+: default methods (implementation in interface), static methods. **Abstract Class**: 0-100% abstraction, can have state (fields), constructors, single inheritance, any access modifiers. **When to use Interface**: defining capability (Serializable, Comparable), unrelated classes implementing same contract, multiple inheritance needed. **When Abstract Class**: sharing code among related classes, protected/private members needed, non-static/non-final fields required. **Modern Java**: prefer interfaces with default methods for flexibility.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Visibility control keywords** in Java: **private** (class only, most restrictive), **default/package-private** (no keyword, same package), **protected** (same package + subclasses in any package), **public** (everywhere, least restrictive). **Best practices**: fields private by default, methods public only if part of API, prefer getters/setters over public fields. **Encapsulation**: private fields with controlled access. **Class-level**: public (one per file, matches filename) or package-private (internal use). **Module system** (Java 9+): additional encapsulation layer beyond packages.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Creational pattern** ensuring class has only one instance with global access point. **Implementation**: private constructor, static getInstance() method, static instance variable. **Thread-safety**: Double-Checked Locking (volatile + synchronized), Eager initialization (class loading time), Bill Pugh Singleton (static inner class - lazy + thread-safe), Enum Singleton (best, serialization-safe). **Use cases**: configuration managers, logging, database connections, caches. **Drawbacks**: global state (testing difficulty), violates Single Responsibility, hidden dependencies. **Modern alternative**: Dependency Injection frameworks (Spring @Scope("singleton")).

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Creational pattern** delegating object instantiation to factory method/class. **Types**: **Simple Factory** (static method returning interface/abstract class), **Factory Method** (subclasses decide which class to instantiate, Template Method for creation), **Abstract Factory** (families of related objects). **Benefits**: encapsulates object creation logic, promotes loose coupling, adheres to Open/Closed Principle. **Use cases**: complex construction logic, object type determined at runtime, dependency injection. **Example**: DocumentFactory.create("PDF") returns PDFDocument instance. Modern: use with Dependency Injection.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Behavioral pattern** defining one-to-many dependency: when one object (Subject) changes state, all dependents (Observers) are notified automatically. **Components**: Subject (maintains observers list, notifies changes), Observer (interface with update method), ConcreteObserver (implements reaction to notifications). **Push vs Pull**: push (Subject sends data), pull (Observer retrieves data from Subject). **Use cases**: event handling systems, MVC architecture (Model notifies View), reactive programming. **Java**: java.util.Observable (deprecated), PropertyChangeListener, modern reactive libraries (RxJava, Project Reactor). **Pub-Sub** pattern is related but more decoupled.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Behavioral pattern** defining family of algorithms, encapsulating each, making them interchangeable. **Structure**: Strategy interface (common algorithm signature), ConcreteStrategy classes (different implementations), Context (uses Strategy). **Benefits**: Open/Closed Principle (add strategies without modifying context), eliminates conditionals (no switch/if-else), runtime algorithm selection. **Use cases**: payment methods, sorting algorithms, compression algorithms, route planning. **Java**: Comparator interface is Strategy pattern. **vs State pattern**: Strategy chosen by client, State changes internally.

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

#### Decorator Pattern

<div class="concept-section definition">

📋 **Concept Definition**  
**Structural pattern** adding responsibilities to objects dynamically without subclassing. **Structure**: Component interface (common operations), ConcreteComponent (base object), Decorator abstract class (wraps Component), ConcreteDecorators (add specific behaviors). **Benefits**: flexible alternative to subclassing, single responsibility (each decorator one feature), composable (chain multiple decorators). **Use cases**: I/O streams (BufferedReader wrapping FileReader), UI components (borders, scrollbars), middleware pipelines. **vs Inheritance**: decorators add behavior at runtime, inheritance at compile-time. **Java**: java.io package extensively uses Decorator.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Runtime flexibility**: add/remove functionality dynamically
- **Open/Closed Principle**: extend behavior without modifying existing code
- **Single Responsibility**: each decorator focuses on one concern
- **Composability**: stack multiple decorators for combined effects

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Component interface
interface Coffee {
    double getCost();
    String getDescription();
}

// Concrete component
class SimpleCoffee implements Coffee {
    @Override
    public double getCost() {
        return 2.0;
    }
    
    @Override
    public String getDescription() {
        return "Simple coffee";
    }
}

// Decorator abstract class
abstract class CoffeeDecorator implements Coffee {
    protected Coffee decoratedCoffee;
    
    public CoffeeDecorator(Coffee coffee) {
        this.decoratedCoffee = coffee;
    }
    
    @Override
    public double getCost() {
        return decoratedCoffee.getCost();
    }
    
    @Override
    public String getDescription() {
        return decoratedCoffee.getDescription();
    }
}

// Concrete decorators
class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee coffee) {
        super(coffee);
    }
    
    @Override
    public double getCost() {
        return super.getCost() + 0.5;  // Add milk cost
    }
    
    @Override
    public String getDescription() {
        return super.getDescription() + ", milk";
    }
}

class SugarDecorator extends CoffeeDecorator {
    public SugarDecorator(Coffee coffee) {
        super(coffee);
    }
    
    @Override
    public double getCost() {
        return super.getCost() + 0.2;  // Add sugar cost
    }
    
    @Override
    public String getDescription() {
        return super.getDescription() + ", sugar";
    }
}

class WhipCreamDecorator extends CoffeeDecorator {
    public WhipCreamDecorator(Coffee coffee) {
        super(coffee);
    }
    
    @Override
    public double getCost() {
        return super.getCost() + 0.7;  // Add whip cream cost
    }
    
    @Override
    public String getDescription() {
        return super.getDescription() + ", whip cream";
    }
}

// Usage - stack decorators dynamically
Coffee coffee = new SimpleCoffee();
System.out.println(coffee.getDescription() + " $" + coffee.getCost());
// Output: Simple coffee $2.0

coffee = new MilkDecorator(coffee);
System.out.println(coffee.getDescription() + " $" + coffee.getCost());
// Output: Simple coffee, milk $2.5

coffee = new SugarDecorator(coffee);
System.out.println(coffee.getDescription() + " $" + coffee.getCost());
// Output: Simple coffee, milk, sugar $2.7

coffee = new WhipCreamDecorator(coffee);
System.out.println(coffee.getDescription() + " $" + coffee.getCost());
// Output: Simple coffee, milk, sugar, whip cream $3.4

// Real-world example: Java I/O streams
BufferedReader reader = new BufferedReader(  // Decorator
    new InputStreamReader(                    // Decorator
        new FileInputStream("file.txt")       // Base component
    )
);

// Each decorator adds functionality:
// FileInputStream: reads bytes from file
// InputStreamReader: converts bytes to characters
// BufferedReader: adds buffering and readLine() method
```
*Notice: Each decorator wraps the previous one, adding functionality layer by layer.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths / misconceptions</strong></summary>

<div>

- "Decorator is just inheritance" → Decorator uses composition, adds behavior at runtime
- "Too many decorators make code complex" → Well-named decorators improve readability
- "Decorator and Adapter are the same" → Adapter changes interface, Decorator enhances functionality

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Can't explain difference between Decorator and inheritance
- Don't know real-world Java examples (I/O streams)
- Can't implement Decorator from scratch
- Confuse Decorator with Proxy or Adapter patterns

</div>
</details>

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">decorator</span>
<span class="tag">design-patterns</span>
<span class="tag">medior</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Composition` · `Open/Closed Principle` · `Java I/O Streams` · `Wrapper Pattern` · `Chain of Responsibility`

</div>

#### Command Pattern

<div class="concept-section definition">

📋 **Concept Definition**  
**Behavioral pattern** encapsulating requests as objects, enabling parameterization, queuing, logging, and undo operations. **Structure**: Command interface (execute method), ConcreteCommand (implements execute, holds receiver + parameters), Receiver (performs actual work), Invoker (triggers command), Client (creates commands). **Benefits**: decouples sender from receiver, supports undo/redo, command queuing/logging, macro commands (composite). **Use cases**: GUI buttons/menus, transaction systems, job queues, macro recording, thread pool tasks. **Memento pattern**: often combined for undo functionality.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Undo/Redo functionality**: easy to implement with command history
- **Decoupling**: invoker doesn't know command implementation details
- **Transaction management**: bundle commands as atomic operations
- **Macro operations**: combine multiple commands into one

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Command interface
interface Command {
    void execute();
    void undo();
}

// Receiver - does actual work
class Light {
    private boolean isOn = false;
    
    public void turnOn() {
        isOn = true;
        System.out.println("Light is ON");
    }
    
    public void turnOff() {
        isOn = false;
        System.out.println("Light is OFF");
    }
    
    public boolean isOn() {
        return isOn;
    }
}

// Concrete commands
class LightOnCommand implements Command {
    private Light light;
    
    public LightOnCommand(Light light) {
        this.light = light;
    }
    
    @Override
    public void execute() {
        light.turnOn();
    }
    
    @Override
    public void undo() {
        light.turnOff();
    }
}

class LightOffCommand implements Command {
    private Light light;
    
    public LightOffCommand(Light light) {
        this.light = light;
    }
    
    @Override
    public void execute() {
        light.turnOff();
    }
    
    @Override
    public void undo() {
        light.turnOn();
    }
}

// Invoker - triggers commands
class RemoteControl {
    private Command command;
    private Stack<Command> history = new Stack<>();
    
    public void setCommand(Command command) {
        this.command = command;
    }
    
    public void pressButton() {
        command.execute();
        history.push(command);
    }
    
    public void pressUndo() {
        if (!history.isEmpty()) {
            Command lastCommand = history.pop();
            lastCommand.undo();
        }
    }
}

// Usage
Light livingRoomLight = new Light();
Command lightOn = new LightOnCommand(livingRoomLight);
Command lightOff = new LightOffCommand(livingRoomLight);

RemoteControl remote = new RemoteControl();

// Turn light on
remote.setCommand(lightOn);
remote.pressButton();  // Output: Light is ON

// Turn light off
remote.setCommand(lightOff);
remote.pressButton();  // Output: Light is OFF

// Undo last command
remote.pressUndo();    // Output: Light is ON

// ADVANCED: Macro Command (composite)
class MacroCommand implements Command {
    private List<Command> commands;
    
    public MacroCommand(List<Command> commands) {
        this.commands = commands;
    }
    
    @Override
    public void execute() {
        for (Command command : commands) {
            command.execute();
        }
    }
    
    @Override
    public void undo() {
        // Undo in reverse order
        for (int i = commands.size() - 1; i >= 0; i--) {
            commands.get(i).undo();
        }
    }
}

// Real-world example: Text Editor
interface TextCommand {
    void execute();
    void undo();
}

class InsertTextCommand implements TextCommand {
    private StringBuilder document;
    private String text;
    private int position;
    
    public InsertTextCommand(StringBuilder document, String text, int position) {
        this.document = document;
        this.text = text;
        this.position = position;
    }
    
    @Override
    public void execute() {
        document.insert(position, text);
    }
    
    @Override
    public void undo() {
        document.delete(position, position + text.length());
    }
}

class DeleteTextCommand implements TextCommand {
    private StringBuilder document;
    private String deletedText;
    private int position;
    private int length;
    
    public DeleteTextCommand(StringBuilder document, int position, int length) {
        this.document = document;
        this.position = position;
        this.length = length;
    }
    
    @Override
    public void execute() {
        deletedText = document.substring(position, position + length);
        document.delete(position, position + length);
    }
    
    @Override
    public void undo() {
        document.insert(position, deletedText);
    }
}

// Text Editor with undo/redo
class TextEditor {
    private StringBuilder document = new StringBuilder();
    private Stack<TextCommand> undoStack = new Stack<>();
    private Stack<TextCommand> redoStack = new Stack<>();
    
    public void executeCommand(TextCommand command) {
        command.execute();
        undoStack.push(command);
        redoStack.clear(); // Clear redo stack after new command
    }
    
    public void undo() {
        if (!undoStack.isEmpty()) {
            TextCommand command = undoStack.pop();
            command.undo();
            redoStack.push(command);
        }
    }
    
    public void redo() {
        if (!redoStack.isEmpty()) {
            TextCommand command = redoStack.pop();
            command.execute();
            undoStack.push(command);
        }
    }
    
    public String getDocument() {
        return document.toString();
    }
}
```
*Notice: Command pattern encapsulates actions as objects, enabling undo/redo and command composition.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths / misconceptions</strong></summary>

<div>

- "Command pattern is only for undo/redo" → Also used for queuing, logging, transactions
- "Command always needs undo" → undo() is optional, depends on use case
- "Too complex for simple operations" → Justified for complex systems with history/queueing

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Can't explain the four roles (Command, Receiver, Invoker, Client)
- Don't understand how undo/redo is implemented
- Can't give real-world examples beyond GUI buttons
- Confuse Command with Strategy pattern

</div>
</details>

</div>

<div class="tags">
<span class="tag">oop</span>
<span class="tag">command</span>
<span class="tag">design-patterns</span>
<span class="tag">medior</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Encapsulation` · `Undo/Redo` · `Transaction Management` · `Job Queues` · `Macro Commands`

</div>

#### Builder Pattern

<div class="concept-section definition">

📋 **Concept Definition**  
**Creational pattern** constructing complex objects step-by-step. **Structure**: Builder interface (construction steps), ConcreteBuilder (implements steps), Director (optional, orchestrates building), Product (complex object). **Benefits**: separates construction from representation, controls construction process, supports different representations, handles many optional parameters. **Use cases**: objects with many fields, immutable objects requiring validation, fluent interfaces. **Java**: StringBuilder, Stream.Builder, Lombok @Builder. **vs Constructor**: Builder handles optional parameters elegantly, avoids telescoping constructors.

</div>

```java
// Product
class Pizza {
    private final String dough;      // required
    private final String sauce;      // required
    private final int size;          // required
    
    private final boolean cheese;    // optional
    private final boolean pepperoni; // optional
    private final boolean mushrooms; // optional
    private final boolean onions;    // optional
    
    // Private constructor - only Builder can create
    private Pizza(Builder builder) {
        this.dough = builder.dough;
        this.sauce = builder.sauce;
        this.size = builder.size;
        this.cheese = builder.cheese;
        this.pepperoni = builder.pepperoni;
        this.mushrooms = builder.mushrooms;
        this.onions = builder.onions;
    }
    
    // Builder class
    public static class Builder {
        // Required parameters
        private final String dough;
        private final String sauce;
        private final int size;
        
        // Optional parameters - initialized to default values
        private boolean cheese = false;
        private boolean pepperoni = false;
        private boolean mushrooms = false;
        private boolean onions = false;
        
        public Builder(String dough, String sauce, int size) {
            this.dough = dough;
            this.sauce = sauce;
            this.size = size;
        }
        
        public Builder cheese(boolean value) {
            cheese = value;
            return this;  // Return this for fluent API
        }
        
        public Builder pepperoni(boolean value) {
            pepperoni = value;
            return this;
        }
        
        public Builder mushrooms(boolean value) {
            mushrooms = value;
            return this;
        }
        
        public Builder onions(boolean value) {
            onions = value;
            return this;
        }
        
        public Pizza build() {
            // Validation before building
            if (size < 8 || size > 16) {
                throw new IllegalArgumentException("Invalid pizza size");
            }
            return new Pizza(this);
        }
    }
    
    @Override
    public String toString() {
        return String.format("Pizza[dough=%s, sauce=%s, size=%d, cheese=%b, " +
                           "pepperoni=%b, mushrooms=%b, onions=%b]",
                           dough, sauce, size, cheese, pepperoni, mushrooms, onions);
    }
}

// Usage - fluent API
Pizza pizza = new Pizza.Builder("thin", "tomato", 12)
    .cheese(true)
    .pepperoni(true)
    .mushrooms(true)
    .build();
```

#### Adapter Pattern

<div class="concept-section definition">

📋 **Concept Definition**  
**Structural pattern** converting interface of class into another interface clients expect. **Structure**: Target interface (what client needs), Adaptee (existing incompatible class), Adapter (wraps Adaptee, implements Target). **Types**: **Class Adapter** (inheritance-based), **Object Adapter** (composition-based, preferred). **Benefits**: reuse existing classes, decouples client from implementation, Single Responsibility. **Use cases**: integrate legacy code, work with third-party libraries, unify similar interfaces. **Java**: InputStreamReader (adapts InputStream to Reader), Collections.list() (Enumeration to List).

</div>

```java
// Target interface (what we want)
interface MediaPlayer {
    void play(String filename);
}

// Adaptee (existing incompatible class)
class AdvancedMediaPlayer {
    public void playVLC(String filename) {
        System.out.println("Playing VLC file: " + filename);
    }
    
    public void playMP4(String filename) {
        System.out.println("Playing MP4 file: " + filename);
    }
}

// Adapter (makes Adaptee compatible with Target)
class MediaAdapter implements MediaPlayer {
    private AdvancedMediaPlayer advancedPlayer;
    
    public MediaAdapter() {
        this.advancedPlayer = new AdvancedMediaPlayer();
    }
    
    @Override
    public void play(String filename) {
        if (filename.endsWith(".vlc")) {
            advancedPlayer.playVLC(filename);
        } else if (filename.endsWith(".mp4")) {
            advancedPlayer.playMP4(filename);
        } else {
            System.out.println("Unsupported format");
        }
    }
}

// Client code
class AudioPlayer implements MediaPlayer {
    private MediaAdapter adapter;
    
    @Override
    public void play(String filename) {
        if (filename.endsWith(".mp3")) {
            System.out.println("Playing MP3 file: " + filename);
        } else if (filename.endsWith(".vlc") || filename.endsWith(".mp4")) {
            adapter = new MediaAdapter();
            adapter.play(filename);
        } else {
            System.out.println("Unsupported format");
        }
    }
}
```

#### Facade Pattern

<div class="concept-section definition">

📋 **Concept Definition**  
**Structural pattern** providing simplified interface to complex subsystem. **Structure**: Facade class (simple methods delegating to subsystem), Subsystem classes (complex logic). **Benefits**: reduces coupling, simplifies client code, hides complexity, easier to use. **Use cases**: library API wrappers, database access layers, service layers. **vs Adapter**: Facade simplifies, Adapter converts interface. **Java**: javax.faces, SLF4J logging facade. **Trade-off**: less flexibility for clients needing subsystem control.

</div>

```java
// Complex subsystem classes
class CPU {
    public void freeze() { System.out.println("CPU: Freezing"); }
    public void jump(long position) { System.out.println("CPU: Jump to " + position); }
    public void execute() { System.out.println("CPU: Executing"); }
}

class Memory {
    public void load(long position, byte[] data) {
        System.out.println("Memory: Loading data at " + position);
    }
}

class HardDrive {
    public byte[] read(long lba, int size) {
        System.out.println("HardDrive: Reading " + size + " bytes from " + lba);
        return new byte[size];
    }
}

// Facade - simple interface to complex subsystem
class ComputerFacade {
    private CPU cpu;
    private Memory memory;
    private HardDrive hardDrive;
    
    public ComputerFacade() {
        this.cpu = new CPU();
        this.memory = new Memory();
        this.hardDrive = new HardDrive();
    }
    
    public void start() {
        // Simplified start process - hides complexity
        System.out.println("Starting computer...");
        cpu.freeze();
        memory.load(0, hardDrive.read(0, 1024));
        cpu.jump(0);
        cpu.execute();
        System.out.println("Computer started!");
    }
}

// Client code - simple!
ComputerFacade computer = new ComputerFacade();
computer.start();  // One method call instead of many
```

#### Proxy Pattern

<div class="concept-section definition">

📋 **Concept Definition**  
**Structural pattern** providing placeholder/surrogate controlling access to object. **Types**: **Virtual Proxy** (lazy initialization), **Protection Proxy** (access control), **Remote Proxy** (represents remote object), **Smart Reference** (additional actions on access). **Benefits**: controls object creation, adds functionality without changing target, protects sensitive operations. **Use cases**: lazy loading images, security checks, logging, caching, RMI. **Java**: java.lang.reflect.Proxy, Spring AOP proxies, Hibernate lazy loading. **vs Decorator**: Proxy controls access, Decorator adds behavior.

</div>

```java
// Subject interface
interface Image {
    void display();
}

// Real subject
class RealImage implements Image {
    private String filename;
    
    public RealImage(String filename) {
        this.filename = filename;
        loadFromDisk();  // Expensive operation
    }
    
    private void loadFromDisk() {
        System.out.println("Loading image: " + filename);
    }
    
    @Override
    public void display() {
        System.out.println("Displaying image: " + filename);
    }
}

// Proxy - lazy loading
class ProxyImage implements Image {
    private RealImage realImage;
    private String filename;
    
    public ProxyImage(String filename) {
        this.filename = filename;
    }
    
    @Override
    public void display() {
        if (realImage == null) {
            realImage = new RealImage(filename);  // Load only when needed
        }
        realImage.display();
    }
}

// Usage
Image image1 = new ProxyImage("photo1.jpg");
Image image2 = new ProxyImage("photo2.jpg");

// Image not loaded yet
System.out.println("Images created");

// Now image1 is loaded and displayed
image1.display();

// Image1 already loaded, just display
image1.display();

// Output:
// Images created
// Loading image: photo1.jpg
// Displaying image: photo1.jpg
// Displaying image: photo1.jpg
```

#### Template Method Pattern

<div class="concept-section definition">

📋 **Concept Definition**  
**Behavioral pattern** defining algorithm skeleton in superclass, letting subclasses override specific steps. **Structure**: Abstract class (template method + abstract steps), Concrete classes (implement steps). **Benefits**: code reuse, enforces algorithm structure, Open/Closed principle, hook methods for optional behavior. **Use cases**: frameworks (servlet lifecycle, JUnit setup/teardown), data processing pipelines, game AI. **Java**: HttpServlet.service(), AbstractList, InputStream.read(). **vs Strategy**: Template Method uses inheritance, Strategy uses composition.

</div>

```java
// Abstract class with template method
abstract class DataProcessor {
    
    // Template method - defines skeleton
    public final void process() {
        readData();
        processData();
        if (shouldSave()) {  // Hook method
            saveData();
        }
        closeResources();
    }
    
    // Abstract methods - subclasses implement
    protected abstract void readData();
    protected abstract void processData();
    protected abstract void saveData();
    protected abstract void closeResources();
    
    // Hook method - optional override
    protected boolean shouldSave() {
        return true;  // Default behavior
    }
}

// Concrete implementation 1
class CSVDataProcessor extends DataProcessor {
    @Override
    protected void readData() {
        System.out.println("Reading CSV file");
    }
    
    @Override
    protected void processData() {
        System.out.println("Processing CSV data");
    }
    
    @Override
    protected void saveData() {
        System.out.println("Saving to database");
    }
    
    @Override
    protected void closeResources() {
        System.out.println("Closing CSV file");
    }
}

// Concrete implementation 2
class XMLDataProcessor extends DataProcessor {
    private boolean isDryRun;
    
    public XMLDataProcessor(boolean isDryRun) {
        this.isDryRun = isDryRun;
    }
    
    @Override
    protected void readData() {
        System.out.println("Reading XML file");
    }
    
    @Override
    protected void processData() {
        System.out.println("Processing XML data");
    }
    
    @Override
    protected void saveData() {
        System.out.println("Saving to file system");
    }
    
    @Override
    protected void closeResources() {
        System.out.println("Closing XML file");
    }
    
    @Override
    protected boolean shouldSave() {
        return !isDryRun;  // Override hook
    }
}

// Usage
DataProcessor csvProcessor = new CSVDataProcessor();
csvProcessor.process();

DataProcessor xmlProcessor = new XMLDataProcessor(true);  // Dry run
xmlProcessor.process();  // Won't save
```

#### State Pattern

<div class="concept-section definition">

📋 **Concept Definition**  
**Behavioral pattern** allowing object to alter behavior when internal state changes. **Structure**: Context (maintains current state), State interface (declares state-specific methods), Concrete States (implement behavior for specific state). **Benefits**: eliminates large conditionals, encapsulates state-specific behavior, makes state transitions explicit, Open/Closed principle. **Use cases**: TCP connections, order status, vending machines, game character states. **vs Strategy**: State changes internally, Strategy chosen by client. **Java**: Thread states, Parser state machines.

</div>

```java
// State interface
interface OrderState {
    void cancel(Order order);
    void ship(Order order);
    void deliver(Order order);
    String getStatusName();
}

// Context
class Order {
    private OrderState state;
    private String orderId;
    
    public Order(String orderId) {
        this.orderId = orderId;
        this.state = new PendingState();  // Initial state
    }
    
    public void setState(OrderState state) {
        this.state = state;
        System.out.println("Order " + orderId + " state: " + state.getStatusName());
    }
    
    public void cancel() {
        state.cancel(this);
    }
    
    public void ship() {
        state.ship(this);
    }
    
    public void deliver() {
        state.deliver(this);
    }
}

// Concrete states
class PendingState implements OrderState {
    @Override
    public void cancel(Order order) {
        System.out.println("Cancelling pending order");
        order.setState(new CancelledState());
    }
    
    @Override
    public void ship(Order order) {
        System.out.println("Shipping order");
        order.setState(new ShippedState());
    }
    
    @Override
    public void deliver(Order order) {
        System.out.println("Cannot deliver - not shipped yet");
    }
    
    @Override
    public String getStatusName() {
        return "PENDING";
    }
}

class ShippedState implements OrderState {
    @Override
    public void cancel(Order order) {
        System.out.println("Cannot cancel - already shipped");
    }
    
    @Override
    public void ship(Order order) {
        System.out.println("Already shipped");
    }
    
    @Override
    public void deliver(Order order) {
        System.out.println("Delivering order");
        order.setState(new DeliveredState());
    }
    
    @Override
    public String getStatusName() {
        return "SHIPPED";
    }
}

class DeliveredState implements OrderState {
    @Override
    public void cancel(Order order) {
        System.out.println("Cannot cancel - already delivered");
    }
    
    @Override
    public void ship(Order order) {
        System.out.println("Already delivered");
    }
    
    @Override
    public void deliver(Order order) {
        System.out.println("Already delivered");
    }
    
    @Override
    public String getStatusName() {
        return "DELIVERED";
    }
}

class CancelledState implements OrderState {
    @Override
    public void cancel(Order order) {
        System.out.println("Already cancelled");
    }
    
    @Override
    public void ship(Order order) {
        System.out.println("Cannot ship - order cancelled");
    }
    
    @Override
    public void deliver(Order order) {
        System.out.println("Cannot deliver - order cancelled");
    }
    
    @Override
    public String getStatusName() {
        return "CANCELLED";
    }
}

// Usage
Order order = new Order("ORD-123");
order.ship();      // PENDING → SHIPPED
order.deliver();   // SHIPPED → DELIVERED
order.cancel();    // Cannot cancel - already delivered
```

#### Chain of Responsibility Pattern

<div class="concept-section definition">

📋 **Concept Definition**  
**Behavioral pattern** passing request along chain of handlers until one handles it. **Structure**: Handler interface (handle method + next handler), Concrete Handlers (handle or pass to next), Client (initiates request). **Benefits**: decouples sender from receiver, adds/removes handlers dynamically, follows Single Responsibility. **Use cases**: logging frameworks, event handling, authentication/authorization chains, middleware. **Java**: Servlet filters, exception handling, java.util.logging. **Variants**: request handled by one handler vs all handlers in chain.

</div>

```java
// Handler interface
abstract class SupportHandler {
    protected SupportHandler nextHandler;
    
    public void setNext(SupportHandler handler) {
        this.nextHandler = handler;
    }
    
    public abstract void handleRequest(SupportTicket ticket);
}

// Request
class SupportTicket {
    private String issue;
    private Priority priority;
    
    public SupportTicket(String issue, Priority priority) {
        this.issue = issue;
        this.priority = priority;
    }
    
    public String getIssue() { return issue; }
    public Priority getPriority() { return priority; }
}

enum Priority { LOW, MEDIUM, HIGH, CRITICAL }

// Concrete handlers
class Level1Support extends SupportHandler {
    @Override
    public void handleRequest(SupportTicket ticket) {
        if (ticket.getPriority() == Priority.LOW) {
            System.out.println("Level 1: Handling low priority - " + ticket.getIssue());
        } else {
            System.out.println("Level 1: Escalating to Level 2");
            if (nextHandler != null) {
                nextHandler.handleRequest(ticket);
            }
        }
    }
}

class Level2Support extends SupportHandler {
    @Override
    public void handleRequest(SupportTicket ticket) {
        if (ticket.getPriority() == Priority.MEDIUM) {
            System.out.println("Level 2: Handling medium priority - " + ticket.getIssue());
        } else {
            System.out.println("Level 2: Escalating to Level 3");
            if (nextHandler != null) {
                nextHandler.handleRequest(ticket);
            }
        }
    }
}

class Level3Support extends SupportHandler {
    @Override
    public void handleRequest(SupportTicket ticket) {
        if (ticket.getPriority() == Priority.HIGH || ticket.getPriority() == Priority.CRITICAL) {
            System.out.println("Level 3: Handling high/critical - " + ticket.getIssue());
        } else {
            System.out.println("Level 3: Cannot handle");
        }
    }
}

// Setup chain
Level1Support level1 = new Level1Support();
Level2Support level2 = new Level2Support();
Level3Support level3 = new Level3Support();

level1.setNext(level2);
level2.setNext(level3);

// Usage
SupportTicket ticket1 = new SupportTicket("Password reset", Priority.LOW);
level1.handleRequest(ticket1);  // Handled by Level 1

SupportTicket ticket2 = new SupportTicket("Server down", Priority.CRITICAL);
level1.handleRequest(ticket2);  // Escalates to Level 3
```

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Builder` · `Adapter` · `Facade` · `Proxy` · `Template Method` · `State` · `Chain of Responsibility` · `Design Patterns`

</div>

### Thread-Safety in OOP {#thread-safety-oop}

<div class="concept-section definition">

📋 **Concept Definition**  
**Property ensuring correct behavior** when multiple threads access shared mutable state. **Techniques**: **Immutability** (thread-safe by nature), **Synchronization** (synchronized keyword, locks), **Atomic operations** (AtomicInteger, compare-and-swap), **Thread confinement** (ThreadLocal, no sharing), **Concurrent collections** (ConcurrentHashMap, CopyOnWriteArrayList). **Java Memory Model**: visibility guarantees (volatile, synchronized), happens-before relationship. **Thread-safe classes**: String, Integer (immutable), Collections.synchronizedList(), concurrent packages. **Performance**: contention overhead, prefer immutability or lock-free structures. **Testing**: challenging due to non-deterministic behavior.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**General Responsibility Assignment Software Patterns** (Craig Larman): nine principles for assigning responsibilities. **Key patterns**: **Information Expert** (assign responsibility to class with needed information), **Creator** (who creates objects), **Controller** (handles system events), **Low Coupling/High Cohesion** (minimize dependencies, focused classes), **Polymorphism** (type-based behavior variation), **Pure Fabrication** (artificial class for cohesion), **Indirection** (intermediary reduces coupling), **Protected Variations** (shield from changes). **Complements SOLID**: more granular guidance for OO design decisions. **Domain-Driven Design** aligns well with GRASP.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Property ensuring correct behavior** when multiple threads access shared mutable state. **Techniques**: **Immutability** (thread-safe by nature), **Synchronization** (synchronized keyword, locks), **Atomic operations** (AtomicInteger, compare-and-swap), **Thread confinement** (ThreadLocal, no sharing), **Concurrent collections** (ConcurrentHashMap, CopyOnWriteArrayList). **Java Memory Model**: visibility guarantees (volatile, synchronized), happens-before relationship. **Thread-safe classes**: String, Integer (immutable), Collections.synchronizedList(), concurrent packages. **Performance**: contention overhead, prefer immutability or lock-free structures. **Testing**: challenging due to non-deterministic behavior.

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

---

## Advanced OOP Concepts

### Design Patterns {#design-patterns}
<!-- tags: patterns, creational, structural, behavioral, medior -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Design patterns are reusable solutions to commonly occurring problems in software design. They represent best practices evolved over time and provide a common vocabulary for developers. **Creational patterns** deal with object creation (Singleton, Factory, Builder), **Structural patterns** deal with object composition (Adapter, Decorator, Facade), and **Behavioral patterns** deal with communication between objects (Observer, Strategy, Command).*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Reusable solutions**: proven approaches to common problems
- **Communication**: shared vocabulary among developers
- **Code quality**: promotes loose coupling and high cohesion
- **Maintainability**: easier to understand and modify code

</div>

<div class="runnable-model" data-filter="patterns creational">

**Runnable mental model**
```java
// 1. SINGLETON PATTERN - Single instance of a class

// ❌ Bad: Not thread-safe
public class DatabaseConnection {
    private static DatabaseConnection instance;
    
    private DatabaseConnection() {}
    
    public static DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection(); // Race condition!
        }
        return instance;
    }
}

// ✅ Good: Thread-safe with double-checked locking
public class DatabaseConnection {
    private static volatile DatabaseConnection instance;
    private final String connectionString;
    
    private DatabaseConnection() {
        this.connectionString = "jdbc:postgresql://localhost/mydb";
        System.out.println("Creating database connection...");
    }
    
    public static DatabaseConnection getInstance() {
        if (instance == null) {
            synchronized (DatabaseConnection.class) {
                if (instance == null) {
                    instance = new DatabaseConnection();
                }
            }
        }
        return instance;
    }
    
    public void executeQuery(String sql) {
        System.out.println("Executing: " + sql);
    }
}

// Modern approach: Enum Singleton (best practice)
public enum DatabaseConnection {
    INSTANCE;
    
    private final String connectionString;
    
    DatabaseConnection() {
        this.connectionString = "jdbc:postgresql://localhost/mydb";
    }
    
    public void executeQuery(String sql) {
        System.out.println("Executing: " + sql);
    }
}

// Usage
DatabaseConnection.INSTANCE.executeQuery("SELECT * FROM users");

// 2. FACTORY PATTERN - Object creation without specifying exact class

// Product hierarchy
interface PaymentProcessor {
    void processPayment(double amount);
    String getProviderName();
}

class CreditCardProcessor implements PaymentProcessor {
    @Override
    public void processPayment(double amount) {
        System.out.println("Processing $" + amount + " via Credit Card");
    }
    
    @Override
    public String getProviderName() {
        return "Credit Card";
    }
}

class PayPalProcessor implements PaymentProcessor {
    @Override
    public void processPayment(double amount) {
        System.out.println("Processing $" + amount + " via PayPal");
    }
    
    @Override
    public String getProviderName() {
        return "PayPal";
    }
}

class BitcoinProcessor implements PaymentProcessor {
    @Override
    public void processPayment(double amount) {
        System.out.println("Processing $" + amount + " via Bitcoin");
    }
    
    @Override
    public String getProviderName() {
        return "Bitcoin";
    }
}

// Factory
public class PaymentProcessorFactory {
    public static PaymentProcessor createProcessor(String type) {
        switch (type.toLowerCase()) {
            case "credit": return new CreditCardProcessor();
            case "paypal": return new PayPalProcessor();
            case "bitcoin": return new BitcoinProcessor();
            default: throw new IllegalArgumentException("Unknown payment type: " + type);
        }
    }
    
    // Factory with configuration
    public static PaymentProcessor createProcessorWithFees(String type, double feeRate) {
        PaymentProcessor baseProcessor = createProcessor(type);
        return new PaymentProcessorWithFees(baseProcessor, feeRate);
    }
}

// Decorator pattern combined with factory
class PaymentProcessorWithFees implements PaymentProcessor {
    private final PaymentProcessor baseProcessor;
    private final double feeRate;
    
    public PaymentProcessorWithFees(PaymentProcessor baseProcessor, double feeRate) {
        this.baseProcessor = baseProcessor;
        this.feeRate = feeRate;
    }
    
    @Override
    public void processPayment(double amount) {
        double totalAmount = amount + (amount * feeRate);
        System.out.println("Adding fee: $" + (amount * feeRate));
        baseProcessor.processPayment(totalAmount);
    }
    
    @Override
    public String getProviderName() {
        return baseProcessor.getProviderName() + " (with fees)";
    }
}

// Usage
PaymentProcessor processor = PaymentProcessorFactory.createProcessor("paypal");
processor.processPayment(100.0);

PaymentProcessor processorWithFees = PaymentProcessorFactory.createProcessorWithFees("credit", 0.03);
processorWithFees.processPayment(100.0);

// 3. BUILDER PATTERN - Construct complex objects step by step

// Without Builder: Constructor hell
public class HttpRequest {
    private final String url;
    private final String method;
    private final Map<String, String> headers;
    private final String body;
    private final int timeout;
    private final boolean followRedirects;
    
    // Telescoping constructors (anti-pattern)
    public HttpRequest(String url) {
        this(url, "GET", new HashMap<>(), null, 30000, true);
    }
    
    public HttpRequest(String url, String method) {
        this(url, method, new HashMap<>(), null, 30000, true);
    }
    
    // ... many more constructors
    
    public HttpRequest(String url, String method, Map<String, String> headers, 
                      String body, int timeout, boolean followRedirects) {
        this.url = url;
        this.method = method;
        this.headers = headers;
        this.body = body;
        this.timeout = timeout;
        this.followRedirects = followRedirects;
    }
}

// With Builder: Clean and readable
public class HttpRequest {
    private final String url;
    private final String method;
    private final Map<String, String> headers;
    private final String body;
    private final int timeout;
    private final boolean followRedirects;
    
    private HttpRequest(Builder builder) {
        this.url = builder.url;
        this.method = builder.method;
        this.headers = new HashMap<>(builder.headers);
        this.body = builder.body;
        this.timeout = builder.timeout;
        this.followRedirects = builder.followRedirects;
    }
    
    public static class Builder {
        // Required parameters
        private final String url;
        
        // Optional parameters with defaults
        private String method = "GET";
        private Map<String, String> headers = new HashMap<>();
        private String body;
        private int timeout = 30000;
        private boolean followRedirects = true;
        
        public Builder(String url) {
            this.url = url;
        }
        
        public Builder method(String method) {
            this.method = method;
            return this;
        }
        
        public Builder header(String name, String value) {
            this.headers.put(name, value);
            return this;
        }
        
        public Builder headers(Map<String, String> headers) {
            this.headers.putAll(headers);
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
        
        public Builder followRedirects(boolean followRedirects) {
            this.followRedirects = followRedirects;
            return this;
        }
        
        public HttpRequest build() {
            // Validation
            if (url == null || url.isEmpty()) {
                throw new IllegalStateException("URL is required");
            }
            if (method.equals("POST") || method.equals("PUT")) {
                if (body == null) {
                    throw new IllegalStateException("Body required for " + method + " requests");
                }
            }
            return new HttpRequest(this);
        }
    }
    
    // Getters
    public String getUrl() { return url; }
    public String getMethod() { return method; }
    public Map<String, String> getHeaders() { return new HashMap<>(headers); }
    public String getBody() { return body; }
    public int getTimeout() { return timeout; }
    public boolean isFollowRedirects() { return followRedirects; }
    
    @Override
    public String toString() {
        return String.format("HttpRequest{method='%s', url='%s', timeout=%d}", 
                           method, url, timeout);
    }
}

// Usage: Fluent and readable
HttpRequest request = new HttpRequest.Builder("https://api.example.com/users")
    .method("POST")
    .header("Content-Type", "application/json")
    .header("Authorization", "Bearer token123")
    .body("{\"name\": \"John Doe\", \"email\": \"john@example.com\"}")
    .timeout(5000)
    .followRedirects(false)
    .build();

System.out.println(request);

// 4. STRATEGY PATTERN - Different algorithms for same task

interface SortingStrategy {
    void sort(int[] array);
    String getAlgorithmName();
}

class BubbleSort implements SortingStrategy {
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
    public String getAlgorithmName() {
        return "Bubble Sort";
    }
}

class QuickSort implements SortingStrategy {
    @Override
    public void sort(int[] array) {
        quickSort(array, 0, array.length - 1);
    }
    
    private void quickSort(int[] array, int low, int high) {
        if (low < high) {
            int pi = partition(array, low, high);
            quickSort(array, low, pi - 1);
            quickSort(array, pi + 1, high);
        }
    }
    
    private int partition(int[] array, int low, int high) {
        int pivot = array[high];
        int i = (low - 1);
        
        for (int j = low; j < high; j++) {
            if (array[j] < pivot) {
                i++;
                int temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
        
        int temp = array[i + 1];
        array[i + 1] = array[high];
        array[high] = temp;
        
        return i + 1;
    }
    
    @Override
    public String getAlgorithmName() {
        return "Quick Sort";
    }
}

class SortingContext {
    private SortingStrategy strategy;
    
    public SortingContext(SortingStrategy strategy) {
        this.strategy = strategy;
    }
    
    public void setStrategy(SortingStrategy strategy) {
        this.strategy = strategy;
    }
    
    public void performSort(int[] array) {
        long startTime = System.nanoTime();
        System.out.println("Sorting using: " + strategy.getAlgorithmName());
        strategy.sort(array);
        long endTime = System.nanoTime();
        System.out.println("Time taken: " + (endTime - startTime) / 1_000_000 + " ms");
    }
}

// Usage
int[] data1 = {64, 34, 25, 12, 22, 11, 90};
int[] data2 = Arrays.copyOf(data1, data1.length);

SortingContext context = new SortingContext(new BubbleSort());
context.performSort(data1);
System.out.println("Result: " + Arrays.toString(data1));

context.setStrategy(new QuickSort());
context.performSort(data2);
System.out.println("Result: " + Arrays.toString(data2));

// 5. OBSERVER PATTERN - Notify multiple objects about state changes

interface Observer {
    void update(String news);
}

interface Subject {
    void subscribe(Observer observer);
    void unsubscribe(Observer observer);
    void notifyObservers();
}

class NewsAgency implements Subject {
    private String news;
    private List<Observer> observers = new ArrayList<>();
    
    public void setNews(String news) {
        this.news = news;
        notifyObservers();
    }
    
    @Override
    public void subscribe(Observer observer) {
        observers.add(observer);
        System.out.println("Observer subscribed. Total: " + observers.size());
    }
    
    @Override
    public void unsubscribe(Observer observer) {
        observers.remove(observer);
        System.out.println("Observer unsubscribed. Total: " + observers.size());
    }
    
    @Override
    public void notifyObservers() {
        System.out.println("Notifying " + observers.size() + " observers about: " + news);
        for (Observer observer : observers) {
            observer.update(news);
        }
    }
}

class NewsChannel implements Observer {
    private String name;
    
    public NewsChannel(String name) {
        this.name = name;
    }
    
    @Override
    public void update(String news) {
        System.out.println(name + " received news: " + news);
    }
}

class MobileApp implements Observer {
    private String appName;
    
    public MobileApp(String appName) {
        this.appName = appName;
    }
    
    @Override
    public void update(String news) {
        System.out.println(appName + " push notification: " + news);
    }
}

// Usage
NewsAgency agency = new NewsAgency();

NewsChannel cnn = new NewsChannel("CNN");
NewsChannel bbc = new NewsChannel("BBC");
MobileApp newsApp = new MobileApp("NewsApp");

agency.subscribe(cnn);
agency.subscribe(bbc);
agency.subscribe(newsApp);

agency.setNews("Breaking: New Java version released!");
agency.setNews("Stock market reaches new high");

agency.unsubscribe(bbc);
agency.setNews("Technology sector sees growth");
```
*Notice: Design patterns provide proven solutions but should not be overused. Apply them when they solve real problems.*

</div>

### SOLID Principles {#solid-principles}
<!-- tags: solid, principles, design, architecture, medior -->

<div class="concept-section definition">

📋 **Concept Definition**  
*SOLID is an acronym for five design principles that make software designs more understandable, flexible, and maintainable. **S**ingle Responsibility, **O**pen/Closed, **L**iskov Substitution, **I**nterface Segregation, **D**ependency Inversion. These principles guide object-oriented design toward loose coupling, high cohesion, and extensible architecture.*

</div>

<div class="runnable-model" data-filter="solid principles design">

**Runnable mental model**
```java
// 1. SINGLE RESPONSIBILITY PRINCIPLE (SRP)
// A class should have only one reason to change

// ❌ Bad: Multiple responsibilities
class User {
    private String name;
    private String email;
    
    // Responsibility 1: User data management
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    
    // Responsibility 2: Database operations
    public void saveToDatabase() {
        // Database logic here
        System.out.println("Saving user to database");
    }
    
    // Responsibility 3: Email operations
    public void sendWelcomeEmail() {
        // Email logic here
        System.out.println("Sending welcome email to " + email);
    }
    
    // Responsibility 4: Validation
    public boolean isValidEmail() {
        return email != null && email.contains("@");
    }
}
// Problem: If email validation rules change, database logic changes, 
// or email service changes, this class needs to be modified

// ✅ Good: Single responsibility per class
class User {
    private String name;
    private String email;
    
    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }
    
    // Only responsibility: User data management
    public String getName() { return name; }
    public String getEmail() { return email; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
}

class UserRepository {
    // Single responsibility: Database operations for users
    public void save(User user) {
        System.out.println("Saving user to database: " + user.getName());
        // Database logic here
    }
    
    public User findByEmail(String email) {
        System.out.println("Finding user by email: " + email);
        // Database query logic here
        return null;
    }
}

class EmailService {
    // Single responsibility: Email operations
    public void sendWelcomeEmail(User user) {
        System.out.println("Sending welcome email to: " + user.getEmail());
        // Email service logic here
    }
    
    public void sendPasswordReset(User user) {
        System.out.println("Sending password reset to: " + user.getEmail());
    }
}

class UserValidator {
    // Single responsibility: User validation
    public boolean isValidEmail(String email) {
        return email != null && email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
    }
    
    public boolean isValidName(String name) {
        return name != null && name.trim().length() > 0;
    }
}

// 2. OPEN/CLOSED PRINCIPLE (OCP)
// Classes should be open for extension, closed for modification

// ❌ Bad: Modification required for new shapes
class AreaCalculator {
    public double calculateArea(Object shape) {
        if (shape instanceof Rectangle) {
            Rectangle rect = (Rectangle) shape;
            return rect.getWidth() * rect.getHeight();
        } else if (shape instanceof Circle) {
            Circle circle = (Circle) shape;
            return Math.PI * circle.getRadius() * circle.getRadius();
        } else if (shape instanceof Triangle) { // New shape requires modification!
            Triangle triangle = (Triangle) shape;
            return 0.5 * triangle.getBase() * triangle.getHeight();
        }
        throw new IllegalArgumentException("Unknown shape");
    }
}
// Problem: Adding new shapes requires modifying AreaCalculator

// ✅ Good: Extension without modification
interface Shape {
    double calculateArea();
}

class Rectangle implements Shape {
    private double width;
    private double height;
    
    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
    
    @Override
    public double calculateArea() {
        return width * height;
    }
    
    public double getWidth() { return width; }
    public double getHeight() { return height; }
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
    
    public double getRadius() { return radius; }
}

class Triangle implements Shape {
    private double base;
    private double height;
    
    public Triangle(double base, double height) {
        this.base = base;
        this.height = height;
    }
    
    @Override
    public double calculateArea() {
        return 0.5 * base * height;
    }
    
    public double getBase() { return base; }
    public double getHeight() { return height; }
}

// New shapes can be added without modifying existing code
class Pentagon implements Shape {
    private double side;
    
    public Pentagon(double side) {
        this.side = side;
    }
    
    @Override
    public double calculateArea() {
        return 0.25 * Math.sqrt(25 + 10 * Math.sqrt(5)) * side * side;
    }
}

class AreaCalculator {
    public double calculateTotalArea(List<Shape> shapes) {
        return shapes.stream()
                    .mapToDouble(Shape::calculateArea)
                    .sum();
    }
}

// 3. LISKOV SUBSTITUTION PRINCIPLE (LSP)
// Objects of superclass should be replaceable with objects of subclass

// ❌ Bad: LSP violation
class Bird {
    public void fly() {
        System.out.println("Flying...");
    }
}

class Penguin extends Bird {
    @Override
    public void fly() {
        throw new UnsupportedOperationException("Penguins can't fly!");
    }
}

// Problem: Penguin cannot be substituted for Bird
void makeBirdFly(Bird bird) {
    bird.fly(); // Will throw exception for Penguin!
}

// ✅ Good: Proper inheritance hierarchy
abstract class Bird {
    public abstract void move();
    public void eat() {
        System.out.println("Eating...");
    }
}

abstract class FlyingBird extends Bird {
    public void fly() {
        System.out.println("Flying...");
    }
    
    @Override
    public void move() {
        fly();
    }
}

abstract class SwimmingBird extends Bird {
    public void swim() {
        System.out.println("Swimming...");
    }
    
    @Override
    public void move() {
        swim();
    }
}

class Eagle extends FlyingBird {
    @Override
    public void fly() {
        System.out.println("Eagle soaring high...");
    }
}

class Penguin extends SwimmingBird {
    @Override
    public void swim() {
        System.out.println("Penguin swimming gracefully...");
    }
}

// Now substitution works correctly
void makeBirdMove(Bird bird) {
    bird.move(); // Works for both Eagle and Penguin
}

// 4. INTERFACE SEGREGATION PRINCIPLE (ISP)
// No client should depend on methods it doesn't use

// ❌ Bad: Fat interface
interface Worker {
    void work();
    void eat();
    void sleep(); // Not all workers need sleep (robots?)
}

class Human implements Worker {
    @Override
    public void work() { System.out.println("Human working..."); }
    @Override
    public void eat() { System.out.println("Human eating..."); }
    @Override
    public void sleep() { System.out.println("Human sleeping..."); }
}

class Robot implements Worker {
    @Override
    public void work() { System.out.println("Robot working..."); }
    @Override
    public void eat() { 
        // Robot doesn't eat! But forced to implement
        throw new UnsupportedOperationException("Robots don't eat");
    }
    @Override
    public void sleep() { 
        // Robot doesn't sleep! But forced to implement
        throw new UnsupportedOperationException("Robots don't sleep");
    }
}

// ✅ Good: Segregated interfaces
interface Workable {
    void work();
}

interface Eatable {
    void eat();
}

interface Sleepable {
    void sleep();
}

class Human implements Workable, Eatable, Sleepable {
    @Override
    public void work() { System.out.println("Human working..."); }
    @Override
    public void eat() { System.out.println("Human eating..."); }
    @Override
    public void sleep() { System.out.println("Human sleeping..."); }
}

class Robot implements Workable {
    @Override
    public void work() { System.out.println("Robot working 24/7..."); }
    // Robot only implements what it needs
}

class WorkManager {
    public void manageWork(Workable worker) {
        worker.work(); // Works for both Human and Robot
    }
    
    public void manageMealTime(Eatable eater) {
        eater.eat(); // Only for entities that can eat
    }
}

// 5. DEPENDENCY INVERSION PRINCIPLE (DIP)
// High-level modules should not depend on low-level modules. Both should depend on abstractions.

// ❌ Bad: Direct dependency on concrete class
class EmailService {
    public void sendEmail(String message) {
        System.out.println("Sending email: " + message);
    }
}

class NotificationManager {
    private EmailService emailService; // Direct dependency!
    
    public NotificationManager() {
        this.emailService = new EmailService(); // Tight coupling!
    }
    
    public void sendNotification(String message) {
        emailService.sendEmail(message);
    }
}
// Problem: Hard to test, hard to change email service, violates DIP

// ✅ Good: Dependency on abstraction
interface NotificationService {
    void sendNotification(String message);
    String getServiceName();
}

class EmailService implements NotificationService {
    @Override
    public void sendNotification(String message) {
        System.out.println("Sending email: " + message);
    }
    
    @Override
    public String getServiceName() {
        return "Email";
    }
}

class SmsService implements NotificationService {
    @Override
    public void sendNotification(String message) {
        System.out.println("Sending SMS: " + message);
    }
    
    @Override
    public String getServiceName() {
        return "SMS";
    }
}

class PushNotificationService implements NotificationService {
    @Override
    public void sendNotification(String message) {
        System.out.println("Sending push notification: " + message);
    }
    
    @Override
    public String getServiceName() {
        return "Push";
    }
}

class NotificationManager {
    private List<NotificationService> services;
    
    // Dependency injection through constructor
    public NotificationManager(List<NotificationService> services) {
        this.services = services;
    }
    
    public void sendNotification(String message) {
        for (NotificationService service : services) {
            System.out.println("Using " + service.getServiceName() + " service:");
            service.sendNotification(message);
        }
    }
    
    public void addService(NotificationService service) {
        services.add(service);
    }
}

// SOLID Principles in Action - Complete Example
public class SolidPrinciplesDemo {
    public static void main(String[] args) {
        // SRP: Each class has one responsibility
        User user = new User("John Doe", "john@example.com");
        UserValidator validator = new UserValidator();
        UserRepository repository = new UserRepository();
        EmailService emailService = new EmailService();
        
        // Validate user
        if (validator.isValidEmail(user.getEmail()) && validator.isValidName(user.getName())) {
            // Save user
            repository.save(user);
            // Send welcome email
            emailService.sendWelcomeEmail(user);
        }
        
        // OCP: Adding new shapes without modifying existing code
        List<Shape> shapes = Arrays.asList(
            new Rectangle(5, 3),
            new Circle(2),
            new Triangle(4, 6),
            new Pentagon(3) // New shape added without changing AreaCalculator
        );
        
        AreaCalculator calculator = new AreaCalculator();
        System.out.println("Total area: " + calculator.calculateTotalArea(shapes));
        
        // LSP: Proper substitution
        List<Bird> birds = Arrays.asList(new Eagle(), new Penguin());
        birds.forEach(bird -> makeBirdMove(bird)); // Works for all birds
        
        // ISP: Using only required interfaces
        WorkManager workManager = new WorkManager();
        Human human = new Human();
        Robot robot = new Robot();
        
        workManager.manageWork(human);
        workManager.manageWork(robot);
        workManager.manageMealTime(human); // Only human can eat
        
        // DIP: Dependency injection
        List<NotificationService> notificationServices = Arrays.asList(
            new EmailService(),
            new SmsService(),
            new PushNotificationService()
        );
        
        NotificationManager notificationManager = new NotificationManager(notificationServices);
        notificationManager.sendNotification("Welcome to our platform!");
    }
    
    static void makeBirdMove(Bird bird) {
        bird.move();
    }
}
```
*Notice: SOLID principles work together to create maintainable, extensible, and testable code. Apply them gradually and pragmatically.*

</div>

### Advanced Design Patterns {#advanced-design-patterns}
<!-- tags: patterns, architectural, enterprise, advanced -->

<div class="concept-section definition">

📋 **Advanced Design Patterns**  
*Beyond basic patterns, enterprise applications use architectural patterns like **MVC** (Model-View-Controller), **MVP** (Model-View-Presenter), **Repository** (data access abstraction), **Unit of Work** (transaction management), and **Specification** (business rule encapsulation). These patterns address complex architectural concerns and promote clean separation of concerns.*

</div>

<div class="runnable-model" data-filter="patterns architectural enterprise">

**Runnable mental model**
```java
// 1. REPOSITORY PATTERN - Data access abstraction

// Domain entity
class User {
    private Long id;
    private String username;
    private String email;
    private LocalDateTime createdAt;
    
    // Constructors, getters, setters
    public User(String username, String email) {
        this.username = username;
        this.email = email;
        this.createdAt = LocalDateTime.now();
    }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}

// Repository interface (abstraction)
interface UserRepository {
    void save(User user);
    Optional<User> findById(Long id);
    Optional<User> findByUsername(String username);
    List<User> findByEmailDomain(String domain);
    void delete(User user);
    List<User> findAll();
}

// Concrete implementation
class DatabaseUserRepository implements UserRepository {
    private final DataSource dataSource;
    
    public DatabaseUserRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }
    
    @Override
    public void save(User user) {
        String sql = user.getId() == null 
            ? "INSERT INTO users (username, email, created_at) VALUES (?, ?, ?)"
            : "UPDATE users SET username = ?, email = ? WHERE id = ?";
        
        // Database operation simulation
        System.out.println("Saving user to database: " + user.getUsername());
    }
    
    @Override
    public Optional<User> findById(Long id) {
        System.out.println("Finding user by ID: " + id);
        // Database query simulation
        return Optional.empty();
    }
    
    @Override
    public Optional<User> findByUsername(String username) {
        System.out.println("Finding user by username: " + username);
        // Database query simulation
        return Optional.empty();
    }
    
    @Override
    public List<User> findByEmailDomain(String domain) {
        System.out.println("Finding users by email domain: " + domain);
        // Database query simulation
        return new ArrayList<>();
    }
    
    @Override
    public void delete(User user) {
        System.out.println("Deleting user: " + user.getUsername());
    }
    
    @Override
    public List<User> findAll() {
        System.out.println("Finding all users");
        return new ArrayList<>();
    }
}

// In-memory implementation (for testing)
class InMemoryUserRepository implements UserRepository {
    private final Map<Long, User> users = new HashMap<>();
    private Long nextId = 1L;
    
    @Override
    public void save(User user) {
        if (user.getId() == null) {
            user.setId(nextId++);
        }
        users.put(user.getId(), user);
        System.out.println("Saved user in memory: " + user.getUsername());
    }
    
    @Override
    public Optional<User> findById(Long id) {
        return Optional.ofNullable(users.get(id));
    }
    
    @Override
    public Optional<User> findByUsername(String username) {
        return users.values().stream()
                   .filter(user -> user.getUsername().equals(username))
                   .findFirst();
    }
    
    @Override
    public List<User> findByEmailDomain(String domain) {
        return users.values().stream()
                   .filter(user -> user.getEmail().endsWith("@" + domain))
                   .collect(Collectors.toList());
    }
    
    @Override
    public void delete(User user) {
        users.remove(user.getId());
    }
    
    @Override
    public List<User> findAll() {
        return new ArrayList<>(users.values());
    }
}

// 2. SPECIFICATION PATTERN - Business rules encapsulation

interface Specification<T> {
    boolean isSatisfiedBy(T candidate);
    Specification<T> and(Specification<T> other);
    Specification<T> or(Specification<T> other);
    Specification<T> not();
}

abstract class AbstractSpecification<T> implements Specification<T> {
    @Override
    public Specification<T> and(Specification<T> other) {
        return new AndSpecification<>(this, other);
    }
    
    @Override
    public Specification<T> or(Specification<T> other) {
        return new OrSpecification<>(this, other);
    }
    
    @Override
    public Specification<T> not() {
        return new NotSpecification<>(this);
    }
}

class AndSpecification<T> extends AbstractSpecification<T> {
    private final Specification<T> left;
    private final Specification<T> right;
    
    public AndSpecification(Specification<T> left, Specification<T> right) {
        this.left = left;
        this.right = right;
    }
    
    @Override
    public boolean isSatisfiedBy(T candidate) {
        return left.isSatisfiedBy(candidate) && right.isSatisfiedBy(candidate);
    }
}

class OrSpecification<T> extends AbstractSpecification<T> {
    private final Specification<T> left;
    private final Specification<T> right;
    
    public OrSpecification(Specification<T> left, Specification<T> right) {
        this.left = left;
        this.right = right;
    }
    
    @Override
    public boolean isSatisfiedBy(T candidate) {
        return left.isSatisfiedBy(candidate) || right.isSatisfiedBy(candidate);
    }
}

class NotSpecification<T> extends AbstractSpecification<T> {
    private final Specification<T> specification;
    
    public NotSpecification(Specification<T> specification) {
        this.specification = specification;
    }
    
    @Override
    public boolean isSatisfiedBy(T candidate) {
        return !specification.isSatisfiedBy(candidate);
    }
}

// Concrete specifications for User
class UserIsActiveSpecification extends AbstractSpecification<User> {
    @Override
    public boolean isSatisfiedBy(User user) {
        // Business rule: User is active if created within last 30 days
        return user.getCreatedAt().isAfter(LocalDateTime.now().minusDays(30));
    }
}

class UserHasValidEmailSpecification extends AbstractSpecification<User> {
    @Override
    public boolean isSatisfiedBy(User user) {
        // Business rule: Valid email contains @ and a domain
        return user.getEmail() != null && 
               user.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+\\..+)$");
    }
}

class UserIsFromDomainSpecification extends AbstractSpecification<User> {
    private final String domain;
    
    public UserIsFromDomainSpecification(String domain) {
        this.domain = domain;
    }
    
    @Override
    public boolean isSatisfiedBy(User user) {
        return user.getEmail().endsWith("@" + domain);
    }
}

// 3. UNIT OF WORK PATTERN - Transaction management

interface UnitOfWork {
    void registerNew(Object entity);
    void registerDirty(Object entity);
    void registerDeleted(Object entity);
    void commit();
    void rollback();
}

class DatabaseUnitOfWork implements UnitOfWork {
    private final Set<Object> newEntities = new HashSet<>();
    private final Set<Object> dirtyEntities = new HashSet<>();
    private final Set<Object> deletedEntities = new HashSet<>();
    private boolean committed = false;
    
    @Override
    public void registerNew(Object entity) {
        if (committed) throw new IllegalStateException("UnitOfWork already committed");
        newEntities.add(entity);
    }
    
    @Override
    public void registerDirty(Object entity) {
        if (committed) throw new IllegalStateException("UnitOfWork already committed");
        dirtyEntities.add(entity);
    }
    
    @Override
    public void registerDeleted(Object entity) {
        if (committed) throw new IllegalStateException("UnitOfWork already committed");
        deletedEntities.add(entity);
    }
    
    @Override
    public void commit() {
        if (committed) throw new IllegalStateException("UnitOfWork already committed");
        
        try {
            // Begin transaction
            System.out.println("Beginning database transaction");
            
            // Insert new entities
            for (Object entity : newEntities) {
                System.out.println("Inserting: " + entity);
            }
            
            // Update dirty entities
            for (Object entity : dirtyEntities) {
                System.out.println("Updating: " + entity);
            }
            
            // Delete entities
            for (Object entity : deletedEntities) {
                System.out.println("Deleting: " + entity);
            }
            
            // Commit transaction
            System.out.println("Committing transaction");
            committed = true;
            
        } catch (Exception e) {
            rollback();
            throw new RuntimeException("Transaction failed", e);
        }
    }
    
    @Override
    public void rollback() {
        System.out.println("Rolling back transaction");
        newEntities.clear();
        dirtyEntities.clear();
        deletedEntities.clear();
        committed = false;
    }
}

// 4. SERVICE LAYER PATTERN - Business logic coordination

class UserService {
    private final UserRepository userRepository;
    private final UnitOfWork unitOfWork;
    private final Specification<User> validUserSpec;
    
    public UserService(UserRepository userRepository, UnitOfWork unitOfWork) {
        this.userRepository = userRepository;
        this.unitOfWork = unitOfWork;
        this.validUserSpec = new UserHasValidEmailSpecification();
    }
    
    public void createUser(String username, String email) {
        User user = new User(username, email);
        
        // Business rule validation
        if (!validUserSpec.isSatisfiedBy(user)) {
            throw new IllegalArgumentException("Invalid user data");
        }
        
        // Check if username already exists
        if (userRepository.findByUsername(username).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }
        
        // Register for persistence
        unitOfWork.registerNew(user);
        
        System.out.println("User created: " + username);
    }
    
    public List<User> getActiveUsersFromDomain(String domain) {
        Specification<User> spec = new UserIsActiveSpecification()
            .and(new UserIsFromDomainSpecification(domain));
        
        return userRepository.findAll().stream()
                           .filter(spec::isSatisfiedBy)
                           .collect(Collectors.toList());
    }
    
    public void deactivateUser(String username) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            unitOfWork.registerDeleted(user);
            System.out.println("User deactivated: " + username);
        }
    }
    
    public void commitChanges() {
        unitOfWork.commit();
    }
}

// 5. COMMAND PATTERN - Encapsulate requests as objects

interface Command {
    void execute();
    void undo();
}

class CreateUserCommand implements Command {
    private final UserService userService;
    private final String username;
    private final String email;
    private User createdUser;
    
    public CreateUserCommand(UserService userService, String username, String email) {
        this.userService = userService;
        this.username = username;
        this.email = email;
    }
    
    @Override
    public void execute() {
        userService.createUser(username, email);
        System.out.println("Executed: Create user " + username);
    }
    
    @Override
    public void undo() {
        if (createdUser != null) {
            userService.deactivateUser(username);
            System.out.println("Undone: Create user " + username);
        }
    }
}

class CommandProcessor {
    private final Stack<Command> history = new Stack<>();
    
    public void execute(Command command) {
        command.execute();
        history.push(command);
    }
    
    public void undo() {
        if (!history.isEmpty()) {
            Command command = history.pop();
            command.undo();
        }
    }
}

// Complete example usage
public class AdvancedPatternsDemo {
    public static void main(String[] args) {
        // Setup dependencies
        UserRepository userRepository = new InMemoryUserRepository();
        UnitOfWork unitOfWork = new DatabaseUnitOfWork();
        UserService userService = new UserService(userRepository, unitOfWork);
        CommandProcessor commandProcessor = new CommandProcessor();
        
        // Create users using Command pattern
        Command createJohn = new CreateUserCommand(userService, "john", "john@example.com");
        Command createJane = new CreateUserCommand(userService, "jane", "jane@company.com");
        
        commandProcessor.execute(createJohn);
        commandProcessor.execute(createJane);
        
        // Commit all changes
        userService.commitChanges();
        
        // Specification pattern usage
        Specification<User> activeCompanyUsers = new UserIsActiveSpecification()
            .and(new UserIsFromDomainSpecification("company.com"));
        
        System.out.println("Finding active company users...");
        
        // Undo last command
        System.out.println("Undoing last command...");
        commandProcessor.undo();
        
        // Repository pattern benefits: easy testing
        System.out.println("\nTesting with in-memory repository:");
        testUserService(new InMemoryUserRepository());
    }
    
    private static void testUserService(UserRepository repository) {
        UnitOfWork unitOfWork = new DatabaseUnitOfWork();
        UserService service = new UserService(repository, unitOfWork);
        
        service.createUser("testuser", "test@test.com");
        service.commitChanges();
        
        System.out.println("Test completed successfully");
    }
}
```
*Notice: Advanced patterns solve architectural problems but add complexity. Use them when benefits outweigh the costs.*

</div>

---

### SOLID Principles in Depth {#solid-principles-deep}
<!-- tags: solid, design-principles, best-practices, architecture -->

<div class="concept-section definition">

📋 **Concept Definition**  
**SOLID principles are five fundamental design principles that make software designs more understandable, flexible, and maintainable**. **Single Responsibility Principle (SRP)**: a class should have only one reason to change. **Open/Closed Principle (OCP)**: open for extension, closed for modification. **Liskov Substitution Principle (LSP)**: objects of superclass should be replaceable with objects of subclass. **Interface Segregation Principle (ISP)**: clients should not depend on interfaces they don't use. **Dependency Inversion Principle (DIP)**: depend on abstractions, not concretions. **Benefits**: reduced coupling, increased cohesion, better testability, easier maintenance and extension.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Code quality**: produces cleaner, more maintainable code
- **Flexibility**: easier to extend and modify existing functionality
- **Testing**: promotes testable and mockable designs
- **Team productivity**: reduces debugging time and development friction

</div>

<div class="runnable-model" data-filter="solid">

**Runnable mental model**
```java
// === SINGLE RESPONSIBILITY PRINCIPLE (SRP) ===

// BAD: Class with multiple responsibilities
class BadUserManager {
    private List<User> users = new ArrayList<>();
    
    // Responsibility 1: User management
    public void addUser(User user) { users.add(user); }
    public void removeUser(User user) { users.remove(user); }
    
    // Responsibility 2: Data persistence
    public void saveToDatabase() {
        // Database logic
    }
    
    // Responsibility 3: Email notifications
    public void sendWelcomeEmail(User user) {
        // Email logic
    }
    
    // Responsibility 4: Validation
    public boolean validateUser(User user) {
        // Validation logic
        return true;
    }
}

// GOOD: Separated responsibilities
class UserRepository {
    private List<User> users = new ArrayList<>();
    
    public void add(User user) { users.add(user); }
    public void remove(User user) { users.remove(user); }
    public List<User> findAll() { return new ArrayList<>(users); }
    public Optional<User> findById(String id) {
        return users.stream().filter(u -> u.getId().equals(id)).findFirst();
    }
}

class UserPersistenceService {
    private DatabaseConnection connection;
    
    public void save(User user) {
        // Only handles persistence
        connection.execute("INSERT INTO users...", user);
    }
    
    public void delete(String userId) {
        connection.execute("DELETE FROM users WHERE id = ?", userId);
    }
}

class EmailNotificationService {
    public void sendWelcomeEmail(User user) {
        // Only handles email notifications
        EmailMessage message = new EmailMessage()
            .to(user.getEmail())
            .subject("Welcome!")
            .body("Welcome to our platform, " + user.getName());
        
        emailClient.send(message);
    }
    
    public void sendPasswordResetEmail(User user, String token) {
        // Handle password reset emails
    }
}

class UserValidator {
    public ValidationResult validate(User user) {
        // Only handles validation
        ValidationResult result = new ValidationResult();
        
        if (user.getName() == null || user.getName().trim().isEmpty()) {
            result.addError("Name is required");
        }
        
        if (user.getEmail() == null || !isValidEmail(user.getEmail())) {
            result.addError("Valid email is required");
        }
        
        return result;
    }
    
    private boolean isValidEmail(String email) {
        return email.contains("@") && email.contains(".");
    }
}

// === OPEN/CLOSED PRINCIPLE (OCP) ===

// BAD: Need to modify existing code for new shapes
class BadAreaCalculator {
    public double calculateArea(Object shape) {
        if (shape instanceof Rectangle) {
            Rectangle rect = (Rectangle) shape;
            return rect.getWidth() * rect.getHeight();
        } else if (shape instanceof Circle) {
            Circle circle = (Circle) shape;
            return Math.PI * circle.getRadius() * circle.getRadius();
        }
        // Need to modify this method for new shapes!
        return 0;
    }
}

// GOOD: Open for extension, closed for modification
interface Shape {
    double calculateArea();
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
    
    // getters...
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
    
    // getters...
}

// New shapes can be added without modifying existing code
class Triangle implements Shape {
    private double base, height;
    
    public Triangle(double base, double height) {
        this.base = base;
        this.height = height;
    }
    
    @Override
    public double calculateArea() {
        return 0.5 * base * height;
    }
}

class AreaCalculator {
    public double calculateTotalArea(List<Shape> shapes) {
        return shapes.stream()
            .mapToDouble(Shape::calculateArea)
            .sum();
    }
}

// === LISKOV SUBSTITUTION PRINCIPLE (LSP) ===

// BAD: Subclass violates superclass contract
class BadBird {
    public void fly() {
        System.out.println("Flying...");
    }
}

class BadPenguin extends BadBird {
    @Override
    public void fly() {
        throw new UnsupportedOperationException("Penguins can't fly!");
        // Violates LSP - clients expecting Bird behavior will fail
    }
}

// GOOD: Proper abstraction hierarchy
abstract class Bird {
    public abstract void move();
    public void eat() { System.out.println("Eating..."); }
}

interface Flyable {
    void fly();
}

interface Swimmable {
    void swim();
}

class Eagle extends Bird implements Flyable {
    @Override
    public void move() {
        fly();
    }
    
    @Override
    public void fly() {
        System.out.println("Eagle flying high...");
    }
}

class Penguin extends Bird implements Swimmable {
    @Override
    public void move() {
        swim();
    }
    
    @Override
    public void swim() {
        System.out.println("Penguin swimming...");
    }
}

class Duck extends Bird implements Flyable, Swimmable {
    @Override
    public void move() {
        // Can choose to fly or swim
        fly();
    }
    
    @Override
    public void fly() {
        System.out.println("Duck flying...");
    }
    
    @Override
    public void swim() {
        System.out.println("Duck swimming...");
    }
}

// === INTERFACE SEGREGATION PRINCIPLE (ISP) ===

// BAD: Fat interface forces unnecessary dependencies
interface BadWorker {
    void work();
    void eat();
    void sleep();
    void code();
    void designUI();
    void testSoftware();
}

class BadProgrammer implements BadWorker {
    @Override
    public void work() { System.out.println("Programming..."); }
    
    @Override
    public void eat() { System.out.println("Eating..."); }
    
    @Override
    public void sleep() { System.out.println("Sleeping..."); }
    
    @Override
    public void code() { System.out.println("Writing code..."); }
    
    @Override
    public void designUI() {
        throw new UnsupportedOperationException("Not a UI designer!");
    }
    
    @Override
    public void testSoftware() {
        throw new UnsupportedOperationException("Not a tester!");
    }
}

// GOOD: Segregated interfaces
interface Worker {
    void work();
}

interface Human {
    void eat();
    void sleep();
}

interface Programmer {
    void code();
    void debug();
}

interface UIDesigner {
    void designUI();
    void createMockups();
}

interface Tester {
    void testSoftware();
    void writeTestCases();
}

class SoftwareDeveloper implements Worker, Human, Programmer {
    @Override
    public void work() { 
        code(); 
        debug();
    }
    
    @Override
    public void eat() { 
        System.out.println("Eating while coding..."); 
    }
    
    @Override
    public void sleep() { 
        System.out.println("Dreaming about code..."); 
    }
    
    @Override
    public void code() { 
        System.out.println("Writing clean code..."); 
    }
    
    @Override
    public void debug() { 
        System.out.println("Debugging issues..."); 
    }
}

class QAEngineer implements Worker, Human, Tester {
    @Override
    public void work() { 
        testSoftware();
        writeTestCases();
    }
    
    @Override
    public void eat() { 
        System.out.println("Eating..."); 
    }
    
    @Override
    public void sleep() { 
        System.out.println("Sleeping..."); 
    }
    
    @Override
    public void testSoftware() { 
        System.out.println("Testing application..."); 
    }
    
    @Override
    public void writeTestCases() { 
        System.out.println("Writing test cases..."); 
    }
}

// === DEPENDENCY INVERSION PRINCIPLE (DIP) ===

// BAD: High-level module depends on low-level module
class BadOrderService {
    private MySQLDatabase database; // Direct dependency on concrete class
    
    public BadOrderService() {
        this.database = new MySQLDatabase(); // Tight coupling
    }
    
    public void processOrder(Order order) {
        // Business logic
        order.setStatus(OrderStatus.PROCESSING);
        
        // Directly depends on MySQL implementation
        database.save(order);
    }
}

class MySQLDatabase {
    public void save(Order order) {
        System.out.println("Saving to MySQL: " + order);
    }
}

// GOOD: Depend on abstractions
interface OrderRepository {
    void save(Order order);
    Optional<Order> findById(String id);
    List<Order> findByCustomerId(String customerId);
}

interface NotificationService {
    void sendOrderConfirmation(Order order);
}

class OrderService {
    private final OrderRepository orderRepository;
    private final NotificationService notificationService;
    
    // Dependency injection through constructor
    public OrderService(OrderRepository orderRepository, 
                       NotificationService notificationService) {
        this.orderRepository = orderRepository;
        this.notificationService = notificationService;
    }
    
    public void processOrder(Order order) {
        // Business logic
        validateOrder(order);
        order.setStatus(OrderStatus.PROCESSING);
        
        // Depends on abstractions, not concrete implementations
        orderRepository.save(order);
        notificationService.sendOrderConfirmation(order);
        
        order.setStatus(OrderStatus.CONFIRMED);
        orderRepository.save(order);
    }
    
    private void validateOrder(Order order) {
        if (order.getItems().isEmpty()) {
            throw new IllegalArgumentException("Order must have items");
        }
        if (order.getCustomerId() == null) {
            throw new IllegalArgumentException("Order must have customer");
        }
    }
}

// Concrete implementations
class DatabaseOrderRepository implements OrderRepository {
    private DatabaseConnection connection;
    
    public DatabaseOrderRepository(DatabaseConnection connection) {
        this.connection = connection;
    }
    
    @Override
    public void save(Order order) {
        String sql = "INSERT INTO orders (id, customer_id, status, total) VALUES (?, ?, ?, ?)";
        connection.execute(sql, order.getId(), order.getCustomerId(), 
                         order.getStatus(), order.getTotal());
    }
    
    @Override
    public Optional<Order> findById(String id) {
        String sql = "SELECT * FROM orders WHERE id = ?";
        return connection.queryForObject(sql, Order.class, id);
    }
    
    @Override
    public List<Order> findByCustomerId(String customerId) {
        String sql = "SELECT * FROM orders WHERE customer_id = ?";
        return connection.queryForList(sql, Order.class, customerId);
    }
}

class EmailNotificationService implements NotificationService {
    private EmailClient emailClient;
    
    public EmailNotificationService(EmailClient emailClient) {
        this.emailClient = emailClient;
    }
    
    @Override
    public void sendOrderConfirmation(Order order) {
        String subject = "Order Confirmation - " + order.getId();
        String body = buildOrderConfirmationEmail(order);
        
        emailClient.sendEmail(order.getCustomerEmail(), subject, body);
    }
    
    private String buildOrderConfirmationEmail(Order order) {
        StringBuilder sb = new StringBuilder();
        sb.append("Thank you for your order!\n\n");
        sb.append("Order ID: ").append(order.getId()).append("\n");
        sb.append("Total: $").append(order.getTotal()).append("\n\n");
        sb.append("Items:\n");
        
        order.getItems().forEach(item -> 
            sb.append("- ").append(item.getName())
              .append(" x").append(item.getQuantity())
              .append(" = $").append(item.getPrice() * item.getQuantity())
              .append("\n")
        );
        
        return sb.toString();
    }
}

// In-memory implementation for testing
class InMemoryOrderRepository implements OrderRepository {
    private Map<String, Order> orders = new HashMap<>();
    
    @Override
    public void save(Order order) {
        orders.put(order.getId(), order);
    }
    
    @Override
    public Optional<Order> findById(String id) {
        return Optional.ofNullable(orders.get(id));
    }
    
    @Override
    public List<Order> findByCustomerId(String customerId) {
        return orders.values().stream()
            .filter(order -> order.getCustomerId().equals(customerId))
            .collect(Collectors.toList());
    }
}

// === SOLID PRINCIPLES INTEGRATION EXAMPLE ===

class SOLIDOrderProcessingSystem {
    public static void main(String[] args) {
        // Dependency injection configuration
        DatabaseConnection connection = new DatabaseConnection("jdbc:mysql://localhost/orders");
        EmailClient emailClient = new EmailClient("smtp.company.com");
        
        OrderRepository orderRepository = new DatabaseOrderRepository(connection);
        NotificationService notificationService = new EmailNotificationService(emailClient);
        
        // High-level module depends only on abstractions
        OrderService orderService = new OrderService(orderRepository, notificationService);
        
        // Create sample order
        Order order = new Order.Builder()
            .id("ORD-001")
            .customerId("CUST-123")
            .customerEmail("customer@example.com")
            .addItem(new OrderItem("Laptop", 1, 999.99))
            .addItem(new OrderItem("Mouse", 2, 29.99))
            .build();
        
        // Process order using SOLID principles
        orderService.processOrder(order);
        
        // Easy to test with in-memory implementations
        testOrderService();
    }
    
    private static void testOrderService() {
        // Test with in-memory implementations
        OrderRepository testRepository = new InMemoryOrderRepository();
        NotificationService testNotification = order -> 
            System.out.println("Test notification sent for order: " + order.getId());
        
        OrderService testService = new OrderService(testRepository, testNotification);
        
        Order testOrder = new Order.Builder()
            .id("TEST-001")
            .customerId("TEST-CUSTOMER")
            .customerEmail("test@test.com")
            .addItem(new OrderItem("Test Product", 1, 50.0))
            .build();
        
        testService.processOrder(testOrder);
        
        // Verify order was saved
        Optional<Order> savedOrder = testRepository.findById("TEST-001");
        assert savedOrder.isPresent();
        assert savedOrder.get().getStatus() == OrderStatus.CONFIRMED;
        
        System.out.println("✅ All SOLID principles tests passed!");
    }
}

// Supporting classes
enum OrderStatus {
    PENDING, PROCESSING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED
}

class Order {
    private String id;
    private String customerId;
    private String customerEmail;
    private List<OrderItem> items;
    private OrderStatus status;
    private double total;
    
    private Order(Builder builder) {
        this.id = builder.id;
        this.customerId = builder.customerId;
        this.customerEmail = builder.customerEmail;
        this.items = new ArrayList<>(builder.items);
        this.status = OrderStatus.PENDING;
        this.total = calculateTotal();
    }
    
    private double calculateTotal() {
        return items.stream()
            .mapToDouble(item -> item.getPrice() * item.getQuantity())
            .sum();
    }
    
    // Builder pattern for complex object construction
    public static class Builder {
        private String id;
        private String customerId;
        private String customerEmail;
        private List<OrderItem> items = new ArrayList<>();
        
        public Builder id(String id) {
            this.id = id;
            return this;
        }
        
        public Builder customerId(String customerId) {
            this.customerId = customerId;
            return this;
        }
        
        public Builder customerEmail(String customerEmail) {
            this.customerEmail = customerEmail;
            return this;
        }
        
        public Builder addItem(OrderItem item) {
            this.items.add(item);
            return this;
        }
        
        public Order build() {
            return new Order(this);
        }
    }
    
    // Getters and setters
    public String getId() { return id; }
    public String getCustomerId() { return customerId; }
    public String getCustomerEmail() { return customerEmail; }
    public List<OrderItem> getItems() { return new ArrayList<>(items); }
    public OrderStatus getStatus() { return status; }
    public void setStatus(OrderStatus status) { this.status = status; }
    public double getTotal() { return total; }
}

class OrderItem {
    private String name;
    private int quantity;
    private double price;
    
    public OrderItem(String name, int quantity, double price) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }
    
    // Getters
    public String getName() { return name; }
    public int getQuantity() { return quantity; }
    public double getPrice() { return price; }
}
```
*Notice: SOLID principles work together to create flexible, maintainable designs. Each principle addresses specific design problems and promotes good software architecture.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Over-engineering**: Applying SOLID principles where simple solutions would suffice
- **Premature abstraction**: Creating interfaces without clear need for multiple implementations
- **Violation of SRP**: Classes that handle multiple concerns (data access + business logic + presentation)
- **LSP violations**: Subclasses that throw exceptions or behave differently than expected
- **Interface pollution**: Forcing classes to implement methods they don't need
- **Concrete dependencies**: Depending on concrete classes instead of abstractions

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Enterprise applications**: large-scale systems requiring maintainability
- **Framework design**: creating extensible and flexible frameworks
- **API design**: designing clean and intuitive public interfaces
- **Testing**: creating testable code with mockable dependencies
- **Team development**: establishing coding standards and best practices

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"Explain SOLID principles with examples"** → Detailed explanation of each principle with real-world examples
2. **"How would you refactor this code to follow SRP?"** → Identifying and separating responsibilities
3. **"Design a system following OCP"** → Creating extensible designs without modifying existing code
4. **"What's wrong with this inheritance hierarchy?"** → Identifying LSP violations
5. **"How does DIP improve testability?"** → Dependency injection and mocking strategies

</div>

<div class="concept-section related-concepts">

🔗 **Related concepts**  
`Design Patterns` · `Dependency Injection` · `Clean Architecture` · `Domain-Driven Design` · `Test-Driven Development`

</div>

<div class="tags">
  <span class="tag">solid</span>
  <span class="tag">design-principles</span>
  <span class="tag">best-practices</span>
  <span class="tag">architecture</span>
  <span class="tag">maintainability</span>
  <span class="tag">medior</span>
</div>

---

### Advanced Design Patterns {#advanced-design-patterns}
<!-- tags: design-patterns, gof-patterns, architectural-patterns, best-practices -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Advanced design patterns provide sophisticated solutions to complex software design problems, extending beyond basic GoF patterns to address architectural concerns**. **Structural patterns**: Composite for tree structures, Proxy for controlled access, Flyweight for memory optimization. **Behavioral patterns**: Chain of Responsibility for request handling, Mediator for object communication, Visitor for operations on object structures. **Architectural patterns**: MVC/MVP/MVVM for separation of concerns, Repository for data access abstraction, Unit of Work for transaction management. **Concurrency patterns**: Producer-Consumer, Thread Pool, Active Object for multi-threaded applications. **Enterprise patterns**: Data Transfer Object, Service Layer, Domain Model for business applications.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Code reusability**: proven solutions that can be applied across projects
- **Communication**: common vocabulary for discussing design solutions
- **Quality**: patterns embody best practices and design principles
- **Maintainability**: well-structured code that's easier to understand and modify

</div>

<div class="runnable-model" data-filter="patterns">

**Runnable mental model**
```java
// === COMPOSITE PATTERN ===
// For handling tree-like structures uniformly

interface FileSystemComponent {
    String getName();
    long getSize();
    void display(String indent);
}

class File implements FileSystemComponent {
    private String name;
    private long size;
    
    public File(String name, long size) {
        this.name = name;
        this.size = size;
    }
    
    @Override
    public String getName() { return name; }
    
    @Override
    public long getSize() { return size; }
    
    @Override
    public void display(String indent) {
        System.out.println(indent + "📄 " + name + " (" + size + " bytes)");
    }
}

class Directory implements FileSystemComponent {
    private String name;
    private List<FileSystemComponent> children = new ArrayList<>();
    
    public Directory(String name) {
        this.name = name;
    }
    
    public void add(FileSystemComponent component) {
        children.add(component);
    }
    
    public void remove(FileSystemComponent component) {
        children.remove(component);
    }
    
    @Override
    public String getName() { return name; }
    
    @Override
    public long getSize() {
        return children.stream()
            .mapToLong(FileSystemComponent::getSize)
            .sum();
    }
    
    @Override
    public void display(String indent) {
        System.out.println(indent + "📁 " + name + "/");
        for (FileSystemComponent child : children) {
            child.display(indent + "  ");
        }
    }
}

// === PROXY PATTERN ===
// For controlling access to another object

interface ImageLoader {
    void display();
    String getInfo();
}

class RealImage implements ImageLoader {
    private String filename;
    private byte[] imageData;
    
    public RealImage(String filename) {
        this.filename = filename;
        loadFromDisk();
    }
    
    private void loadFromDisk() {
        System.out.println("Loading image from disk: " + filename);
        // Simulate expensive loading operation
        try {
            Thread.sleep(2000); // 2 seconds delay
            imageData = new byte[1024 * 1024]; // 1MB dummy data
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
    
    @Override
    public void display() {
        System.out.println("Displaying image: " + filename);
    }
    
    @Override
    public String getInfo() {
        return "Image: " + filename + " (Size: " + imageData.length + " bytes)";
    }
}

class ImageProxy implements ImageLoader {
    private String filename;
    private RealImage realImage;
    private boolean hasAccess;
    
    public ImageProxy(String filename, boolean hasAccess) {
        this.filename = filename;
        this.hasAccess = hasAccess;
    }
    
    @Override
    public void display() {
        if (!hasAccess) {
            System.out.println("Access denied: Cannot display " + filename);
            return;
        }
        
        if (realImage == null) {
            realImage = new RealImage(filename);
        }
        realImage.display();
    }
    
    @Override
    public String getInfo() {
        if (!hasAccess) {
            return "Access denied for: " + filename;
        }
        
        // Can provide info without loading the actual image
        return "Proxy for image: " + filename;
    }
}

// === CHAIN OF RESPONSIBILITY PATTERN ===
// For passing requests along a chain of handlers

abstract class SupportHandler {
    protected SupportHandler nextHandler;
    
    public void setNext(SupportHandler nextHandler) {
        this.nextHandler = nextHandler;
    }
    
    public abstract void handleRequest(SupportTicket ticket);
}

class Level1Support extends SupportHandler {
    @Override
    public void handleRequest(SupportTicket ticket) {
        if (ticket.getPriority() == Priority.LOW) {
            System.out.println("Level 1 Support: Handling ticket #" + ticket.getId());
            ticket.setStatus(TicketStatus.RESOLVED);
            ticket.setResolution("Basic troubleshooting completed");
        } else if (nextHandler != null) {
            System.out.println("Level 1 Support: Escalating ticket #" + ticket.getId());
            nextHandler.handleRequest(ticket);
        }
    }
}

class Level2Support extends SupportHandler {
    @Override
    public void handleRequest(SupportTicket ticket) {
        if (ticket.getPriority() == Priority.MEDIUM) {
            System.out.println("Level 2 Support: Handling ticket #" + ticket.getId());
            ticket.setStatus(TicketStatus.RESOLVED);
            ticket.setResolution("Advanced technical support provided");
        } else if (nextHandler != null) {
            System.out.println("Level 2 Support: Escalating ticket #" + ticket.getId());
            nextHandler.handleRequest(ticket);
        }
    }
}

class Level3Support extends SupportHandler {
    @Override
    public void handleRequest(SupportTicket ticket) {
        if (ticket.getPriority() == Priority.HIGH || ticket.getPriority() == Priority.CRITICAL) {
            System.out.println("Level 3 Support: Handling critical ticket #" + ticket.getId());
            ticket.setStatus(TicketStatus.RESOLVED);
            ticket.setResolution("Expert-level resolution provided");
        } else {
            System.out.println("Level 3 Support: Unable to handle ticket #" + ticket.getId());
            ticket.setStatus(TicketStatus.UNRESOLVED);
        }
    }
}

// === MEDIATOR PATTERN ===
// For defining how objects interact with each other

interface ChatMediator {
    void sendMessage(String message, User user);
    void addUser(User user);
    void removeUser(User user);
}

class ChatRoom implements ChatMediator {
    private List<User> users = new ArrayList<>();
    private List<String> chatHistory = new ArrayList<>();
    
    @Override
    public void addUser(User user) {
        users.add(user);
        notifyUsers(user.getName() + " joined the chat", null);
    }
    
    @Override
    public void removeUser(User user) {
        users.remove(user);
        notifyUsers(user.getName() + " left the chat", null);
    }
    
    @Override
    public void sendMessage(String message, User sender) {
        String formattedMessage = sender.getName() + ": " + message;
        chatHistory.add(formattedMessage);
        
        for (User user : users) {
            if (user != sender) {
                user.receive(formattedMessage);
            }
        }
    }
    
    private void notifyUsers(String message, User excludeUser) {
        for (User user : users) {
            if (user != excludeUser) {
                user.receive("System: " + message);
            }
        }
    }
    
    public List<String> getChatHistory() {
        return new ArrayList<>(chatHistory);
    }
}

abstract class User {
    protected ChatMediator mediator;
    protected String name;
    
    public User(ChatMediator mediator, String name) {
        this.mediator = mediator;
        this.name = name;
    }
    
    public abstract void send(String message);
    public abstract void receive(String message);
    
    public String getName() { return name; }
}

class ChatUser extends User {
    public ChatUser(ChatMediator mediator, String name) {
        super(mediator, name);
    }
    
    @Override
    public void send(String message) {
        System.out.println(name + " sending: " + message);
        mediator.sendMessage(message, this);
    }
    
    @Override
    public void receive(String message) {
        System.out.println(name + " received: " + message);
    }
}

// === VISITOR PATTERN ===
// For performing operations on object structures

interface ShapeVisitor {
    void visit(Circle circle);
    void visit(Rectangle rectangle);
    void visit(Triangle triangle);
}

interface VisitableShape {
    void accept(ShapeVisitor visitor);
}

class Circle implements VisitableShape {
    private double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    public double getRadius() { return radius; }
    
    @Override
    public void accept(ShapeVisitor visitor) {
        visitor.visit(this);
    }
}

class Rectangle implements VisitableShape {
    private double width, height;
    
    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
    
    public double getWidth() { return width; }
    public double getHeight() { return height; }
    
    @Override
    public void accept(ShapeVisitor visitor) {
        visitor.visit(this);
    }
}

class Triangle implements VisitableShape {
    private double base, height;
    
    public Triangle(double base, double height) {
        this.base = base;
        this.height = height;
    }
    
    public double getBase() { return base; }
    public double getHeight() { return height; }
    
    @Override
    public void accept(ShapeVisitor visitor) {
        visitor.visit(this);
    }
}

// Different visitors for different operations
class AreaCalculatorVisitor implements ShapeVisitor {
    private double totalArea = 0;
    
    @Override
    public void visit(Circle circle) {
        double area = Math.PI * circle.getRadius() * circle.getRadius();
        totalArea += area;
        System.out.println("Circle area: " + area);
    }
    
    @Override
    public void visit(Rectangle rectangle) {
        double area = rectangle.getWidth() * rectangle.getHeight();
        totalArea += area;
        System.out.println("Rectangle area: " + area);
    }
    
    @Override
    public void visit(Triangle triangle) {
        double area = 0.5 * triangle.getBase() * triangle.getHeight();
        totalArea += area;
        System.out.println("Triangle area: " + area);
    }
    
    public double getTotalArea() { return totalArea; }
}

class PerimeterCalculatorVisitor implements ShapeVisitor {
    private double totalPerimeter = 0;
    
    @Override
    public void visit(Circle circle) {
        double perimeter = 2 * Math.PI * circle.getRadius();
        totalPerimeter += perimeter;
        System.out.println("Circle perimeter: " + perimeter);
    }
    
    @Override
    public void visit(Rectangle rectangle) {
        double perimeter = 2 * (rectangle.getWidth() + rectangle.getHeight());
        totalPerimeter += perimeter;
        System.out.println("Rectangle perimeter: " + perimeter);
    }
    
    @Override
    public void visit(Triangle triangle) {
        // Simplified: assuming right triangle
        double hypotenuse = Math.sqrt(triangle.getBase() * triangle.getBase() + 
                                    triangle.getHeight() * triangle.getHeight());
        double perimeter = triangle.getBase() + triangle.getHeight() + hypotenuse;
        totalPerimeter += perimeter;
        System.out.println("Triangle perimeter: " + perimeter);
    }
    
    public double getTotalPerimeter() { return totalPerimeter; }
}

// === MVC PATTERN ===
// Model-View-Controller architectural pattern

// Model
class UserModel {
    private String id;
    private String name;
    private String email;
    private List<UserModelListener> listeners = new ArrayList<>();
    
    public UserModel(String id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    
    public void addListener(UserModelListener listener) {
        listeners.add(listener);
    }
    
    public void removeListener(UserModelListener listener) {
        listeners.remove(listener);
    }
    
    private void notifyListeners() {
        for (UserModelListener listener : listeners) {
            listener.onUserChanged(this);
        }
    }
    
    // Getters and setters with notifications
    public String getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    
    public void setName(String name) {
        this.name = name;
        notifyListeners();
    }
    
    public void setEmail(String email) {
        this.email = email;
        notifyListeners();
    }
}

interface UserModelListener {
    void onUserChanged(UserModel user);
}

// View
interface UserView extends UserModelListener {
    void displayUser(UserModel user);
    void displayError(String error);
    void setController(UserController controller);
}

class ConsoleUserView implements UserView {
    private UserController controller;
    
    @Override
    public void setController(UserController controller) {
        this.controller = controller;
    }
    
    @Override
    public void displayUser(UserModel user) {
        System.out.println("=== User Information ===");
        System.out.println("ID: " + user.getId());
        System.out.println("Name: " + user.getName());
        System.out.println("Email: " + user.getEmail());
        System.out.println("========================");
    }
    
    @Override
    public void displayError(String error) {
        System.err.println("Error: " + error);
    }
    
    @Override
    public void onUserChanged(UserModel user) {
        displayUser(user);
    }
    
    // Simulate user input
    public void simulateUserInput() {
        // In real application, this would handle actual user input
        System.out.println("Simulating user input...");
        controller.updateUserName("John Updated");
        controller.updateUserEmail("john.updated@example.com");
    }
}

// Controller
class UserController {
    private UserModel model;
    private UserView view;
    
    public UserController(UserModel model, UserView view) {
        this.model = model;
        this.view = view;
        
        // Register view as listener to model
        model.addListener(view);
        view.setController(this);
    }
    
    public void updateUserName(String name) {
        if (name == null || name.trim().isEmpty()) {
            view.displayError("Name cannot be empty");
            return;
        }
        model.setName(name);
    }
    
    public void updateUserEmail(String email) {
        if (email == null || !isValidEmail(email)) {
            view.displayError("Invalid email format");
            return;
        }
        model.setEmail(email);
    }
    
    public void displayUser() {
        view.displayUser(model);
    }
    
    private boolean isValidEmail(String email) {
        return email.contains("@") && email.contains(".");
    }
}

// === PATTERN INTEGRATION EXAMPLE ===

class AdvancedPatternDemo {
    public static void main(String[] args) {
        demonstrateCompositePattern();
        demonstrateProxyPattern();
        demonstrateChainOfResponsibility();
        demonstrateMediatorPattern();
        demonstrateVisitorPattern();
        demonstrateMVCPattern();
    }
    
    private static void demonstrateCompositePattern() {
        System.out.println("=== COMPOSITE PATTERN DEMO ===");
        
        Directory root = new Directory("root");
        Directory docs = new Directory("documents");
        Directory pics = new Directory("pictures");
        
        docs.add(new File("resume.pdf", 1024));
        docs.add(new File("cover_letter.docx", 2048));
        
        pics.add(new File("vacation.jpg", 512000));
        pics.add(new File("family.png", 256000));
        
        root.add(docs);
        root.add(pics);
        root.add(new File("readme.txt", 128));
        
        root.display("");
        System.out.println("Total size: " + root.getSize() + " bytes\n");
    }
    
    private static void demonstrateProxyPattern() {
        System.out.println("=== PROXY PATTERN DEMO ===");
        
        ImageLoader publicImage = new ImageProxy("public_photo.jpg", true);
        ImageLoader privateImage = new ImageProxy("private_photo.jpg", false);
        
        System.out.println("Accessing public image:");
        System.out.println(publicImage.getInfo());
        publicImage.display();
        
        System.out.println("\nAccessing private image:");
        System.out.println(privateImage.getInfo());
        privateImage.display();
        System.out.println();
    }
    
    private static void demonstrateChainOfResponsibility() {
        System.out.println("=== CHAIN OF RESPONSIBILITY DEMO ===");
        
        Level1Support level1 = new Level1Support();
        Level2Support level2 = new Level2Support();
        Level3Support level3 = new Level3Support();
        
        level1.setNext(level2);
        level2.setNext(level3);
        
        SupportTicket[] tickets = {
            new SupportTicket("T001", Priority.LOW, "Password reset request"),
            new SupportTicket("T002", Priority.MEDIUM, "Software installation issue"),
            new SupportTicket("T003", Priority.HIGH, "System crash investigation"),
            new SupportTicket("T004", Priority.CRITICAL, "Security breach detected")
        };
        
        for (SupportTicket ticket : tickets) {
            System.out.println("Processing ticket: " + ticket.getDescription());
            level1.handleRequest(ticket);
            System.out.println("Status: " + ticket.getStatus() + "\n");
        }
    }
    
    private static void demonstrateMediatorPattern() {
        System.out.println("=== MEDIATOR PATTERN DEMO ===");
        
        ChatRoom chatRoom = new ChatRoom();
        
        User alice = new ChatUser(chatRoom, "Alice");
        User bob = new ChatUser(chatRoom, "Bob");
        User charlie = new ChatUser(chatRoom, "Charlie");
        
        chatRoom.addUser(alice);
        chatRoom.addUser(bob);
        chatRoom.addUser(charlie);
        
        alice.send("Hello everyone!");
        bob.send("Hi Alice!");
        charlie.send("Good morning!");
        
        chatRoom.removeUser(bob);
        alice.send("Where did Bob go?");
        System.out.println();
    }
    
    private static void demonstrateVisitorPattern() {
        System.out.println("=== VISITOR PATTERN DEMO ===");
        
        List<VisitableShape> shapes = Arrays.asList(
            new Circle(5),
            new Rectangle(4, 6),
            new Triangle(3, 4)
        );
        
        AreaCalculatorVisitor areaVisitor = new AreaCalculatorVisitor();
        PerimeterCalculatorVisitor perimeterVisitor = new PerimeterCalculatorVisitor();
        
        System.out.println("Calculating areas:");
        for (VisitableShape shape : shapes) {
            shape.accept(areaVisitor);
        }
        System.out.println("Total area: " + areaVisitor.getTotalArea());
        
        System.out.println("\nCalculating perimeters:");
        for (VisitableShape shape : shapes) {
            shape.accept(perimeterVisitor);
        }
        System.out.println("Total perimeter: " + perimeterVisitor.getTotalPerimeter());
        System.out.println();
    }
    
    private static void demonstrateMVCPattern() {
        System.out.println("=== MVC PATTERN DEMO ===");
        
        UserModel model = new UserModel("U001", "John Doe", "john@example.com");
        UserView view = new ConsoleUserView();
        UserController controller = new UserController(model, view);
        
        controller.displayUser();
        view.simulateUserInput();
    }
}

// Supporting classes for patterns
enum Priority { LOW, MEDIUM, HIGH, CRITICAL }
enum TicketStatus { OPEN, IN_PROGRESS, RESOLVED, UNRESOLVED }

class SupportTicket {
    private String id;
    private Priority priority;
    private String description;
    private TicketStatus status;
    private String resolution;
    
    public SupportTicket(String id, Priority priority, String description) {
        this.id = id;
        this.priority = priority;
        this.description = description;
        this.status = TicketStatus.OPEN;
    }
    
    // Getters and setters
    public String getId() { return id; }
    public Priority getPriority() { return priority; }
    public String getDescription() { return description; }
    public TicketStatus getStatus() { return status; }
    public void setStatus(TicketStatus status) { this.status = status; }
    public String getResolution() { return resolution; }
    public void setResolution(String resolution) { this.resolution = resolution; }
}
```
*Notice: Advanced design patterns provide powerful solutions but should be used judiciously. Choose patterns based on actual needs rather than for their own sake.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Pattern overuse**: Applying patterns where simple solutions would suffice
- **Wrong pattern choice**: Using a pattern that doesn't fit the actual problem
- **Premature optimization**: Implementing complex patterns before they're needed
- **Ignoring context**: Not considering the specific requirements and constraints
- **Poor implementation**: Following pattern structure without understanding intent
- **Maintenance burden**: Adding unnecessary complexity that makes code harder to maintain

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **GUI frameworks**: MVC/MVP patterns for user interface architecture
- **Game development**: Component patterns for entity systems, State patterns for game logic
- **Enterprise applications**: Repository, Unit of Work, and Service Layer patterns
- **Distributed systems**: Proxy patterns for remote services, Mediator for service communication
- **Compilers and interpreters**: Visitor pattern for AST operations, Interpreter pattern

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"When would you use the Composite pattern?"** → Tree structures, uniform treatment of objects
2. **"Explain the difference between Proxy and Decorator"** → Intent and structural differences
3. **"How does the Visitor pattern support extensibility?"** → Adding operations without modifying existing classes
4. **"Design a notification system using patterns"** → Observer, Chain of Responsibility, Strategy combinations
5. **"What are the trade-offs of using MVC?"** → Benefits and complexity considerations

</div>

<div class="concept-section related-concepts">

🔗 **Related concepts**  
`SOLID Principles` · `Gang of Four Patterns` · `Architectural Patterns` · `Enterprise Patterns` · `Refactoring`

</div>

<div class="tags">
  <span class="tag">design-patterns</span>
  <span class="tag">gof-patterns</span>
  <span class="tag">architectural-patterns</span>
  <span class="tag">best-practices</span>
  <span class="tag">software-design</span>
  <span class="tag">medior</span>
</div>