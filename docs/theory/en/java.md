í# Java Fundamentals

## Brief Summary

Java is an object-oriented, platform-independent programming language built on the "write once, run anywhere" principle. Through the Java Virtual Machine (JVM), compiled bytecode can run on any operating system. Java's strong typing, automatic memory management, and rich ecosystem make it popular for enterprise application development. Main drawbacks include verbose syntax and performance overhead compared to native languages.

## Concepts

### JVM (Java Virtual Machine) {#jvm-java-virtual-machine}

<div class="concept-section definition">

📋 **Concept Definition**  
**Abstract computing machine** enabling platform independence through bytecode execution. **Components**: **Class Loader** (loads .class files), **Runtime Data Areas** (Method Area, Heap, Stack, PC Register, Native Method Stack), **Execution Engine** (Interpreter + JIT Compiler), **Native Interface** (JNI for native code). **JIT Compilation**: HotSpot detects "hot" methods (frequently executed) and compiles to native code for performance. **Memory Management**: Automatic GC (Garbage Collection) frees unreferenced objects. **Platform independence**: same bytecode runs on any OS with JVM. **Implementations**: HotSpot (Oracle), OpenJ9 (IBM), GraalVM (polyglot). **JVM languages**: Java, Kotlin, Scala, Groovy, Clojure.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Portability**: the same `.class` file runs on Windows, Linux and macOS  
- **Performance**: JIT optimizes code at runtime  
- **Memory management**: Garbage Collector automatically frees unused objects  

</div>

<div class="runnable-model">

**Runnable mental model**
```bash
# Compile Java source code to bytecode
javac HelloWorld.java    # -> HelloWorld.class (bytecode)

# Run bytecode on JVM
java HelloWorld          # JVM interprets bytecode, then runs native code after JIT compilation
```
*Note: the `java HelloWorld` command doesn't compile source, but interprets bytecode, then runs native code after JIT compilation.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths / misconceptions</strong></summary>

<div>

- "Java is always slow." → Actually, JIT often achieves near-native speed in the long run  
- "Calling `System.gc()` immediately runs GC." → This is only a request, no guarantee  
- "JRE needs to be installed separately from JDK." → JDK already includes the necessary runtime  

</div>
</details>

</div>

<div class="concept-section tools">

<details>
<summary>🧰 <strong>Related tools</strong></summary>

<div>

`javac`, `java`, `jps`, `jcmd`, `jstack`, `jmap`, JVisualVM, JProfiler

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Not understanding the difference between JVM, JRE, and JDK
- Confusing compile-time and runtime
- Not knowing about JIT compilation optimization

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Bytecode` · `JIT Compiler` · `Garbage Collector` · `Class Loader` · `Memory Areas` · `JDK`

</div>

### JDK (Java Development Kit) {#jdk-java-development-kit}

<div class="concept-section definition">

📋 **Concept Definition**  
**Complete development environment** for Java: compiler, runtime, tools, and libraries. **Components**: **javac** (compiler: .java → .class), **java** (launcher), **jar** (archive tool), **javadoc** (documentation generator), **jdb** (debugger), **jconsole/jvisualvm** (monitoring), **keytool** (security). **Includes JRE**: runtime environment bundled. **Standard libraries**: java.lang, java.util, java.io, java.nio, java.net, etc. **Versions**: LTS releases (8, 11, 17, 21), feature releases every 6 months. **Distributions**: Oracle JDK (commercial), OpenJDK (open-source), Adoptium, Amazon Corretto, Azul Zulu.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Development tools**: compiler, debugger, documentation generator
- **Runtime included**: JRE is part of JDK  
- **Standard libraries**: comprehensive API for common tasks

</div>

<div class="runnable-model">

**Runnable mental model**
```bash
# JDK structure
JDK/
├── bin/          # Tools (javac, java, javap, jdb)
├── lib/          # Libraries and tools
├── include/      # C header files for JNI
└── jre/          # Java Runtime Environment
    ├── bin/      # Runtime tools
    └── lib/      # Runtime libraries
```
*Note: Since Java 9, the JRE directory structure has changed with the module system.*

</div>

<div class="version-badges">
<span class="version-badge">LTS: Java 8, 11, 17, 21</span>
<span class="version-badge">Current: Java 21</span>
</div>

<div class="concept-section tools">

<details>
<summary>🧰 <strong>JDK Tools</strong></summary>

<div>

- **javac**: Compiler  
- **java**: Runtime launcher  
- **javap**: Class file disassembler  
- **jdb**: Debugger  
- **javadoc**: Documentation generator  
- **jar**: Archive tool  

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`JRE` · `Compiler` · `Tools` · `Libraries` · `Documentation` · `Debugger`

</div>

### JRE (Java Runtime Environment) {#jre-java-runtime-environment}

<div class="concept-section definition">

📋 **Concept Definition**  
**Runtime subset of JDK** providing only execution capability, no development tools. **Components**: JVM + standard libraries (rt.jar in older versions, modules in Java 9+). **vs JDK**: JRE lacks javac, javadoc, debugger – can only run pre-compiled applications. **Use case**: deployment on end-user machines or servers where development isn't needed. **Module system** (Java 9+): jlink creates custom runtime images with only needed modules (smaller footprint). **Deprecated**: standalone JRE distribution discontinued after Java 11, use jlink or full JDK. **Docker**: Alpine-based OpenJDK images for minimal runtime containers.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Runtime only**: enough to run Java applications  
- **Smaller footprint**: no development tools included  
- **Deployment**: what end-users need to install

</div>

<div class="runnable-model">

**Runnable mental model**
```bash
# What JRE contains
JRE/
├── bin/java          # JVM launcher
├── lib/rt.jar        # Runtime library (pre-Java 9)
├── lib/modules/      # Module system (Java 9+)
└── lib/security/     # Security policies

# JRE vs JDK
JRE: Run Java apps     (java MyApp)
JDK: Develop + Run     (javac + java)
```

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common misconceptions</strong></summary>

<div>

- "JRE is obsolete" → Still used for production deployments  
- "JRE and JVM are the same" → JRE includes JVM + libraries  
- "Always need JDK in production" → JRE is often sufficient  

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`JVM` · `Standard Libraries` · `Deployment` · `Runtime` · `Class Loading`

</div>

### Bytecode {#bytecode}

<div class="concept-section definition">

📋 **Concept Definition**  
**Platform-independent intermediate representation** between source code and machine code. **Format**: .class files containing bytecode instructions (e.g., aload, istore, invokevirtual). **Compilation**: javac compiles .java → .class (bytecode). **Verification**: JVM verifies bytecode (type safety, stack overflow checks) before execution. **Execution**: Interpreter executes bytecode, JIT compiles hot paths to native code. **Advantages**: portability (same bytecode on all platforms), security (verification), optimization (runtime profiling). **Disassembly**: javap -c shows bytecode instructions. **Other JVM languages**: Kotlin, Scala compile to same bytecode format, enabling interoperability.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Platform independence**: same bytecode runs everywhere with JVM  
- **Optimization**: JIT can optimize based on runtime behavior  
- **Security**: bytecode verification prevents malicious code

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Source code
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}

// Bytecode (simplified)
public class Hello {
  public static void main(java.lang.String[]);
    Code:
       0: getstatic     #2   // Field java/lang/System.out
       3: ldc           #3   // String Hello World
       5: invokevirtual #4   // Method println
       8: return
}
```
*View bytecode with: `javap -c Hello.class`*

</div>

<div class="concept-section tools">

<details>
<summary>🧰 <strong>Bytecode tools</strong></summary>

<div>

`javap`, `ASM`, `ByteBuddy`, `CGLib`, JVM bytecode visualization tools

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`JVM` · `Class Loading` · `JIT Compiler` · `Platform Independence` · `Optimization`

</div>

### Garbage Collector {#garbage-collector}

<div class="concept-section definition">

📋 **Concept Definition**  
**Automatic memory management** reclaiming unreachable objects from heap. **Generations**: **Young** (Eden + Survivor spaces, short-lived objects, minor GC), **Old** (long-lived objects, major GC), **Metaspace** (class metadata, replaced PermGen in Java 8). **Algorithms**: **Serial GC** (single-threaded), **Parallel GC** (throughput-focused), **CMS** (low-pause, deprecated), **G1 GC** (default since Java 9, region-based), **ZGC/Shenandoah** (ultra-low latency, <10ms pauses). **Reachability**: objects reachable from GC roots (stack, static fields) are retained. **Tuning**: -Xmx (max heap), -Xms (initial heap), -XX:+UseG1GC. **Trade-offs**: throughput vs latency, pause times vs CPU usage.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Automatic memory management**: prevents memory leaks  
- **Performance impact**: GC pauses can affect application responsiveness  
- **Tuning**: different GC algorithms for different use cases

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Objects eligible for GC
String temp = new String("temporary");  // Reference created
temp = null;                           // Reference removed -> eligible for GC

// Objects NOT eligible for GC
List<String> list = new ArrayList<>();
list.add("persistent");                // Referenced by 'list' variable

// Manual suggestion (not guaranteed)
System.gc();  // "Please run GC now"
```
*Note: GC runs automatically when heap memory is low.*

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>GC Algorithms</strong></summary>

<div>

- **Serial GC**: Single-threaded, good for small applications  
- **Parallel GC**: Multi-threaded, default for server applications  
- **G1 GC**: Low-latency, good for large heaps  
- **ZGC/Shenandoah**: Ultra-low latency, experimental  

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Not understanding when objects become eligible for GC
- Thinking `System.gc()` immediately runs garbage collection
- Not knowing different GC algorithms and their use cases

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Heap Memory` · `References` · `Memory Leaks` · `Performance Tuning` · `JVM Options`

</div>

### Class {#class}

<div class="concept-section definition">

📋 **Concept Definition**  
**Template defining structure and behavior** of objects. **Components**: **Fields** (state/data), **Methods** (behavior), **Constructors** (initialization), **Nested classes** (inner/static). **Access modifiers**: public (everywhere), protected (package + subclasses), default/package-private (package only), private (class only). **Static members**: belong to class, not instances (e.g., Math.PI). **Final class**: cannot be extended. **Abstract class**: cannot be instantiated, may have abstract methods. **Class loading**: lazy (loaded when first referenced). **Object creation**: new keyword invokes constructor, allocates heap memory. **Class object**: Class<?> metadata accessible via reflection.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Template for objects**: defines structure and behavior  
- **Encapsulation**: bundles data and methods together  
- **Reusability**: create multiple objects from one class

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Class definition (blueprint)
public class Car {
    // Fields (data)
    private String brand;
    private int year;
    
    // Constructor
    public Car(String brand, int year) {
        this.brand = brand;
        this.year = year;
    }
    
    // Methods (behavior)
    public void start() {
        System.out.println(brand + " is starting...");
    }
    
    // Getters/Setters
    public String getBrand() { return brand; }
}

// Object creation (using the blueprint)
Car myCar = new Car("Toyota", 2023);  // Object instantiation
myCar.start();  // Method call
```

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>Class design best practices</strong></summary>

<div>

- **Single Responsibility**: one class, one purpose  
- **Encapsulation**: private fields, public methods  
- **Naming conventions**: PascalCase for classes  
- **Constructor validation**: check parameters  

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Object` · `Constructor` · `Methods` · `Fields` · `Encapsulation` · `Inheritance`

</div>

### Interface {#interface}

<div class="concept-section definition">

📋 **Concept Definition**  
**Pure abstraction** defining method signatures without implementation (contract). **Members**: abstract methods (implicitly public abstract), **default methods** (Java 8+, provide implementation), **static methods** (Java 8+), **constants** (public static final). **Multiple inheritance**: class implements multiple interfaces (vs single class inheritance). **Functional interfaces**: single abstract method, usable with lambdas (@FunctionalInterface). **Marker interfaces**: no methods (e.g., Serializable, Cloneable), indicate capability. **Evolution**: default methods enable API evolution without breaking implementations. **Polymorphism**: program to interface, not implementation (Dependency Inversion).

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Contract definition**: specifies what methods must exist  
- **Multiple inheritance**: class can implement multiple interfaces  
- **Abstraction**: hide implementation details, focus on what not how

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Interface definition (contract)
public interface Drawable {
    void draw();                    // Abstract method
    
    default void highlight() {      // Default method (Java 8+)
        System.out.println("Highlighting...");
    }
    
    static void info() {           // Static method (Java 8+)
        System.out.println("Drawable interface");
    }
}

// Implementation
public class Circle implements Drawable {
    @Override
    public void draw() {
        System.out.println("Drawing a circle");
    }
}

// Usage
Drawable shape = new Circle();
shape.draw();       // "Drawing a circle"
shape.highlight();  // "Highlighting..." (default method)
```

</div>

<div class="version-badges">
<span class="version-badge">Java 8: Default methods</span>
<span class="version-badge">Java 9: Private methods</span>
</div>

<div class="concept-section evolution">

<details>
<summary>📈 <strong>Interface evolution</strong></summary>

<div>

- **Pre-Java 8**: Only abstract methods  
- **Java 8**: Default and static methods  
- **Java 9**: Private methods in interfaces  
- **Modern usage**: Functional interfaces with lambdas  

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Abstract Methods` · `Multiple Inheritance` · `Polymorphism` · `Lambda Expressions` · `Default Methods`

</div>

### Package {#package}

<div class="concept-section definition">

📋 **Concept Definition**  
**Namespace mechanism** grouping related classes and providing access control. **Naming convention**: reverse domain (com.company.project.module). **Directory structure**: mirrors package hierarchy (com/company/project/Module.java). **Import**: use classes from other packages (import statement, wildcard import). **Access control**: package-private (default) visibility restricts to same package. **JAR structure**: packages preserved in JAR file hierarchy. **Modules** (Java 9+): higher-level grouping with module-info.java, explicit dependencies, strong encapsulation. **Best practices**: one public class per file, match filename to class name, logical grouping by functionality.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Organization**: group related classes logically  
- **Namespace**: avoid class name conflicts  
- **Access control**: package-private visibility  
- **Distribution**: JAR files follow package structure

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Package declaration (must be first non-comment line)
package com.company.project.model;

// Imports
import java.util.List;                    // Single class
import java.util.*;                       // All classes (avoid in production)
import static java.lang.Math.PI;         // Static import

public class User {
    // Class implementation
}

// Directory structure matches package
src/
└── com/
    └── company/
        └── project/
            └── model/
                └── User.java
```

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>Package naming conventions</strong></summary>

<div>

- **Reverse domain**: com.company.project  
- **Lowercase**: all package names lowercase  
- **Descriptive**: com.company.project.service, .model, .util  
- **Avoid keywords**: don't use Java reserved words  

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Import` · `Classpath` · `JAR Files` · `Access Modifiers` · `Namespace`

</div>

### Exception {#exception}

<div class="concept-section definition">

📋 **Concept Definition**  
**Mechanism for handling runtime errors** through exception objects. **Hierarchy**: Throwable → Exception (recoverable) + Error (system-level, e.g., OutOfMemoryError). **Checked vs Unchecked**: **Checked** (extends Exception, must handle or declare: IOException, SQLException), **Unchecked** (RuntimeException: NullPointerException, IllegalArgumentException, no forced handling). **Try-catch-finally**: try (risky code), catch (handle exceptions), finally (always executes, cleanup). **Try-with-resources**: automatic resource closing (AutoCloseable). **Throws clause**: method declares checked exceptions it may throw. **Custom exceptions**: extend Exception or RuntimeException. **Best practices**: fail fast, specific exceptions, don't swallow exceptions, log properly.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Error handling**: graceful failure instead of crashes  
- **Separation of concerns**: error handling separate from business logic  
- **Program reliability**: applications can recover from errors

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Exception hierarchy
Throwable
├── Error (JVM errors, don't catch)
└── Exception
    ├── RuntimeException (unchecked)
    │   ├── NullPointerException
    │   ├── IllegalArgumentException
    │   └── IndexOutOfBoundsException
    └── Checked Exceptions
        ├── IOException
        ├── SQLException
        └── ClassNotFoundException

// Exception handling
try {
    int result = divide(10, 0);  // May throw ArithmeticException
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero: " + e.getMessage());
} finally {
    System.out.println("Cleanup code runs always");
}
```

</div>

<div class="concept-section types">

<details>
<summary>🔍 <strong>Exception types</strong></summary>

<div>

- **Checked**: Must be caught or declared (IOException)  
- **Unchecked**: Runtime exceptions (NullPointerException)  
- **Error**: JVM problems, don't catch (OutOfMemoryError)  

</div>
</details>

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>Exception handling best practices</strong></summary>

<div>

- **Specific exceptions**: catch specific types, not Exception  
- **Don't swallow**: always log or handle properly  
- **Clean up**: use finally or try-with-resources  
- **Custom exceptions**: create meaningful exception types  

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Try-Catch` · `Finally` · `Throws` · `Custom Exceptions` · `Error Handling`

</div>

### Collections Framework {#collections-framework}

<div class="concept-section definition">

📋 **Concept Definition**  
**Unified architecture for representing and manipulating collections.** **Interfaces**: **Collection** (root), **List** (ordered: ArrayList, LinkedList), **Set** (unique: HashSet, TreeSet), **Queue** (FIFO: LinkedList, PriorityQueue), **Map** (key-value: HashMap, TreeMap, LinkedHashMap). **Implementations**: ArrayList (dynamic array, fast random access), LinkedList (doubly-linked, fast insertion/deletion), HashSet (hash table, O(1) operations), TreeSet (red-black tree, sorted), HashMap (hash table), TreeMap (red-black tree, sorted keys). **Utility classes**: Collections (sort, shuffle, synchronizedList), Arrays. **Thread-safe**: Vector, Hashtable (legacy), ConcurrentHashMap, CopyOnWriteArrayList. **Generics**: type safety, avoid casting.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Data structures**: ready-to-use implementations  
- **Performance**: optimized for different use cases  
- **Consistency**: unified API across different collections  
- **Type safety**: generics prevent ClassCastException

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Collection hierarchy
Collection<E>
├── List<E> (ordered, allows duplicates)
│   ├── ArrayList<E>      // Resizable array
│   ├── LinkedList<E>     // Doubly-linked list
│   └── Vector<E>         // Synchronized ArrayList
├── Set<E> (no duplicates)
│   ├── HashSet<E>        // Hash table
│   ├── LinkedHashSet<E>  // Hash table + linked list
│   └── TreeSet<E>        // Red-black tree (sorted)
└── Queue<E> (FIFO)
    ├── PriorityQueue<E>  // Heap
    └── ArrayDeque<E>     // Resizable array

Map<K,V> (key-value pairs)
├── HashMap<K,V>          // Hash table
├── LinkedHashMap<K,V>    // Hash table + linked list
└── TreeMap<K,V>          // Red-black tree (sorted)

// Usage examples
List<String> list = new ArrayList<>();
Set<Integer> set = new HashSet<>();
Map<String, Integer> map = new HashMap<>();
```

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Performance characteristics</strong></summary>

<div>

**ArrayList**: O(1) access, O(n) insertion/deletion in middle  
**LinkedList**: O(n) access, O(1) insertion/deletion at ends  
**HashMap**: O(1) average access, O(n) worst case  
**TreeMap**: O(log n) access, maintains sorted order  

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Collection hierarchy exact knowledge (Collection, List, Set, Map)
- Fail-fast vs fail-safe iterator difference
- Load factor impact on HashMap performance

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`List` · `Set` · `Map` · `ArrayList` · `HashMap` · `TreeSet` · `Algorithms`

</div>

### Thread {#thread}

<div class="concept-section definition">

📋 **Concept Definition**  
**Independent execution path** within a program, enabling concurrent execution. **Creation**: extend Thread class or implement Runnable/Callable. **Lifecycle**: New → Runnable → Running → Blocked/Waiting → Terminated. **Synchronization**: **synchronized** keyword (method or block), locks (ReentrantLock), **volatile** (visibility guarantee), **Atomic classes** (AtomicInteger, lock-free). **Thread pools**: ExecutorService (fixed, cached, scheduled thread pools), avoid manual thread creation. **Concurrency utilities**: CountDownLatch, CyclicBarrier, Semaphore, Phaser. **CompletableFuture**: asynchronous programming, chaining operations. **Thread-local**: ThreadLocal for per-thread data. **Best practices**: prefer high-level concurrency utilities, immutability, minimize shared state.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Concurrency**: multiple tasks executing simultaneously
- **Performance**: utilizing multiple CPU cores  
- **Responsiveness**: UI doesn't freeze during long operations

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Thread creation with lambda
Thread worker = new Thread(() -> {
    for (int i = 0; i < 5; i++) {
        System.out.println("Worker: " + i);
        Thread.sleep(1000);  // 1 sec delay
    }
});

worker.start();  // Start execution
System.out.println("Main continues...");

// Thread states
NEW -> RUNNABLE -> BLOCKED/WAITING/TIMED_WAITING -> TERMINATED
```
*Note: main thread continues running, worker thread works in parallel.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Thread safety pitfalls</strong></summary>

<div>

- **Race condition**: multiple threads modify same data
- **Deadlock**: two threads wait for each other infinitely
- **Synchronized overhead**: every sync operation has cost

</div>
</details>

</div>

<div class="concept-section tools">

<details>
<summary>🧰 <strong>Concurrency tools</strong></summary>

<div>

`java.util.concurrent` package, `ExecutorService`, `CountDownLatch`, `Semaphore`, `CyclicBarrier`

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Thread lifecycle states exact knowledge
- Volatile vs synchronized difference
- Producer-consumer pattern implementation

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Runnable` · `Synchronized` · `Volatile` · `Atomic Classes` · `Thread Pool` · `CompletableFuture`

</div>

### Stream API {#stream-api}

<div class="concept-section definition">

📋 **Concept Definition**  
**Functional-style operations on sequences** of elements. **Sources**: collections (list.stream()), arrays (Arrays.stream()), I/O (Files.lines()), Stream.of(), Stream.generate(), Stream.iterate(). **Intermediate operations** (lazy, return Stream): **filter** (predicate filtering), **map** (transform elements), **flatMap** (flatten nested streams), **distinct** (remove duplicates), **sorted** (natural/custom order), **limit** (take first n), **skip** (skip first n), **peek** (debug/side-effect), **takeWhile**/**dropWhile** (Java 9+). **Terminal operations** (eager, trigger execution): **forEach**/**forEachOrdered**, **collect** (to collection), **reduce** (accumulate), **count**, **anyMatch**/**allMatch**/**noneMatch**, **findFirst**/**findAny**, **min**/**max**, **toArray**. **Lazy evaluation**: pipeline built, executes only when terminal operation called. **Parallel streams**: .parallelStream() or .parallel(), uses ForkJoinPool. **Collectors**: toList(), toSet(), toMap(), toConcurrentMap(), groupingBy(), partitioningBy(), joining(), summarizingInt(), collectingAndThen(). **Primitive streams**: IntStream, LongStream, DoubleStream (avoid boxing). **Best practices**: prefer streams for bulk operations, avoid side effects in lambdas, use method references, consider parallel for CPU-bound ops on large datasets.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Functional programming**: declarative style instead of imperative
- **Lazy evaluation**: operations only execute on terminal operation
- **Parallel processing**: easy parallelization with `.parallel()` call
- **Composability**: chain operations for complex data transformations
- **Performance**: internal iteration optimizations, short-circuit operations

</div>

<div class="runnable-model">

**Runnable mental model - Comprehensive Stream API Examples**
```java
import java.util.*;
import java.util.stream.*;

public class StreamAPIExamples {
    
    public static void main(String[] args) {
        
        // ========== CREATION METHODS ==========
        
        // 1. From collection
        List<String> list = Arrays.asList("a", "b", "c");
        Stream<String> stream1 = list.stream();
        
        // 2. From array
        String[] array = {"x", "y", "z"};
        Stream<String> stream2 = Arrays.stream(array);
        
        // 3. Stream.of()
        Stream<Integer> stream3 = Stream.of(1, 2, 3, 4, 5);
        
        // 4. Stream.generate() - infinite stream
        Stream<Double> randoms = Stream.generate(Math::random).limit(5);
        
        // 5. Stream.iterate() - infinite stream with seed
        Stream<Integer> evens = Stream.iterate(0, n -> n + 2).limit(10);
        // Output: 0, 2, 4, 6, 8, 10, 12, 14, 16, 18
        
        // 6. IntStream range
        IntStream range = IntStream.range(1, 6); // 1,2,3,4,5
        IntStream rangeClosed = IntStream.rangeClosed(1, 5); // 1,2,3,4,5
        
        
        // ========== INTERMEDIATE OPERATIONS ==========
        
        List<String> words = Arrays.asList("apple", "banana", "cherry", "date", "elderberry");
        
        // FILTER - keep elements matching predicate
        List<String> filtered = words.stream()
            .filter(w -> w.length() > 5)
            .collect(Collectors.toList());
        // Output: [banana, cherry, elderberry]
        
        // MAP - transform each element
        List<Integer> lengths = words.stream()
            .map(String::length)
            .collect(Collectors.toList());
        // Output: [5, 6, 6, 4, 10]
        
        List<String> upperCase = words.stream()
            .map(String::toUpperCase)
            .collect(Collectors.toList());
        // Output: [APPLE, BANANA, CHERRY, DATE, ELDERBERRY]
        
        // FLATMAP - flatten nested structures
        List<List<String>> nestedLists = Arrays.asList(
            Arrays.asList("a", "b"),
            Arrays.asList("c", "d"),
            Arrays.asList("e", "f")
        );
        
        List<String> flattened = nestedLists.stream()
            .flatMap(List::stream)
            .collect(Collectors.toList());
        // Output: [a, b, c, d, e, f]
        
        // FLATMAP - split and flatten
        List<String> sentences = Arrays.asList("Hello World", "Java Stream");
        List<String> allWords = sentences.stream()
            .flatMap(sentence -> Arrays.stream(sentence.split(" ")))
            .collect(Collectors.toList());
        // Output: [Hello, World, Java, Stream]
        
        // DISTINCT - remove duplicates
        List<Integer> numbers = Arrays.asList(1, 2, 2, 3, 3, 3, 4, 5);
        List<Integer> unique = numbers.stream()
            .distinct()
            .collect(Collectors.toList());
        // Output: [1, 2, 3, 4, 5]
        
        // SORTED - natural order
        List<String> sorted = words.stream()
            .sorted()
            .collect(Collectors.toList());
        // Output: [apple, banana, cherry, date, elderberry]
        
        // SORTED - custom comparator
        List<String> sortedByLength = words.stream()
            .sorted(Comparator.comparingInt(String::length).reversed())
            .collect(Collectors.toList());
        // Output: [elderberry, banana, cherry, apple, date]
        
        // LIMIT - take first n elements
        List<String> limited = words.stream()
            .limit(3)
            .collect(Collectors.toList());
        // Output: [apple, banana, cherry]
        
        // SKIP - skip first n elements
        List<String> skipped = words.stream()
            .skip(2)
            .collect(Collectors.toList());
        // Output: [cherry, date, elderberry]
        
        // PEEK - debug/side-effect (doesn't transform)
        List<String> peeked = words.stream()
            .peek(w -> System.out.println("Processing: " + w))
            .map(String::toUpperCase)
            .peek(w -> System.out.println("Processed: " + w))
            .collect(Collectors.toList());
        
        // TAKEWHILE / DROPWHILE (Java 9+)
        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 3, 2, 1);
        List<Integer> takeWhile = nums.stream()
            .takeWhile(n -> n < 4)
            .collect(Collectors.toList());
        // Output: [1, 2, 3] (stops at first false)
        
        List<Integer> dropWhile = nums.stream()
            .dropWhile(n -> n < 4)
            .collect(Collectors.toList());
        // Output: [4, 5, 3, 2, 1] (drops while true)
        
        
        // ========== TERMINAL OPERATIONS ==========
        
        // FOREACH - iterate with side-effects
        words.stream()
            .forEach(System.out::println);
        
        // FOREACHORDERED - maintains order (parallel streams)
        words.parallelStream()
            .forEachOrdered(System.out::println);
        
        // COLLECT - to List
        List<String> list1 = words.stream().collect(Collectors.toList());
        
        // COLLECT - to Set
        Set<String> set1 = words.stream().collect(Collectors.toSet());
        
        // COLLECT - to Map
        Map<String, Integer> map1 = words.stream()
            .collect(Collectors.toMap(
                w -> w,                    // key
                String::length             // value
            ));
        // Output: {apple=5, banana=6, cherry=6, date=4, elderberry=10}
        
        // COLLECT - to Map with duplicate key handling
        Map<Integer, String> map2 = words.stream()
            .collect(Collectors.toMap(
                String::length,           // key
                w -> w,                   // value
                (existing, replacement) -> existing + "," + replacement  // merge function
            ));
        // Output: {4=date, 5=apple, 6=banana,cherry, 10=elderberry}
        
        // COLLECT - groupingBy
        Map<Integer, List<String>> grouped = words.stream()
            .collect(Collectors.groupingBy(String::length));
        // Output: {4=[date], 5=[apple], 6=[banana, cherry], 10=[elderberry]}
        
        // COLLECT - groupingBy with counting
        Map<Integer, Long> counts = words.stream()
            .collect(Collectors.groupingBy(String::length, Collectors.counting()));
        // Output: {4=1, 5=1, 6=2, 10=1}
        
        // COLLECT - partitioningBy (boolean key)
        Map<Boolean, List<String>> partitioned = words.stream()
            .collect(Collectors.partitioningBy(w -> w.length() > 5));
        // Output: {false=[apple, date], true=[banana, cherry, elderberry]}
        
        // COLLECT - joining
        String joined = words.stream()
            .collect(Collectors.joining(", "));
        // Output: "apple, banana, cherry, date, elderberry"
        
        String joinedWithPrefix = words.stream()
            .collect(Collectors.joining(", ", "[", "]"));
        // Output: "[apple, banana, cherry, date, elderberry]"
        
        // COLLECT - summarizingInt
        IntSummaryStatistics stats = words.stream()
            .collect(Collectors.summarizingInt(String::length));
        System.out.println("Count: " + stats.getCount());        // 5
        System.out.println("Sum: " + stats.getSum());            // 31
        System.out.println("Min: " + stats.getMin());            // 4
        System.out.println("Max: " + stats.getMax());            // 10
        System.out.println("Average: " + stats.getAverage());    // 6.2
        
        // REDUCE - accumulate to single value
        Optional<String> reduced = words.stream()
            .reduce((a, b) -> a + "," + b);
        // Output: Optional[apple,banana,cherry,date,elderberry]
        
        int sum = IntStream.of(1, 2, 3, 4, 5)
            .reduce(0, (a, b) -> a + b);  // identity, accumulator
        // Output: 15
        
        int product = IntStream.of(1, 2, 3, 4, 5)
            .reduce(1, (a, b) -> a * b);
        // Output: 120
        
        // COUNT
        long count = words.stream()
            .filter(w -> w.startsWith("c"))
            .count();
        // Output: 1
        
        // ANYMATCH / ALLMATCH / NONEMATCH
        boolean anyStartsWithC = words.stream().anyMatch(w -> w.startsWith("c"));
        // Output: true
        
        boolean allLongerThan3 = words.stream().allMatch(w -> w.length() > 3);
        // Output: true
        
        boolean noneEmpty = words.stream().noneMatch(String::isEmpty);
        // Output: true
        
        // FINDFIRST / FINDANY
        Optional<String> first = words.stream()
            .filter(w -> w.startsWith("b"))
            .findFirst();
        // Output: Optional[banana]
        
        Optional<String> any = words.parallelStream()
            .filter(w -> w.startsWith("c"))
            .findAny();  // non-deterministic in parallel
        // Output: Optional[cherry] (or Optional[cherry] again)
        
        // MIN / MAX
        Optional<String> min = words.stream()
            .min(Comparator.naturalOrder());
        // Output: Optional[apple]
        
        Optional<String> max = words.stream()
            .max(Comparator.comparingInt(String::length));
        // Output: Optional[elderberry]
        
        // TOARRAY
        String[] arr = words.stream().toArray(String[]::new);
        
        
        // ========== PRIMITIVE STREAMS ==========
        
        // IntStream, LongStream, DoubleStream - avoid boxing
        IntStream intStream = IntStream.range(1, 6);  // 1,2,3,4,5
        
        int sumInt = IntStream.of(1, 2, 3, 4, 5).sum();
        // Output: 15
        
        OptionalDouble average = IntStream.of(1, 2, 3, 4, 5).average();
        // Output: OptionalDouble[3.0]
        
        IntStream.rangeClosed(1, 10)
            .filter(n -> n % 2 == 0)
            .forEach(System.out::println);
        // Output: 2, 4, 6, 8, 10
        
        // Map to primitive
        int[] lengths2 = words.stream()
            .mapToInt(String::length)
            .toArray();
        
        
        // ========== PARALLEL STREAMS ==========
        
        // Sequential
        long startSeq = System.currentTimeMillis();
        long countSeq = IntStream.range(1, 1000000)
            .filter(n -> n % 2 == 0)
            .count();
        long endSeq = System.currentTimeMillis();
        System.out.println("Sequential: " + (endSeq - startSeq) + "ms");
        
        // Parallel
        long startPar = System.currentTimeMillis();
        long countPar = IntStream.range(1, 1000000)
            .parallel()
            .filter(n -> n % 2 == 0)
            .count();
        long endPar = System.currentTimeMillis();
        System.out.println("Parallel: " + (endPar - startPar) + "ms");
        
        
        // ========== ADVANCED EXAMPLES ==========
        
        // Complex grouping
        List<Person> people = Arrays.asList(
            new Person("Alice", 25, "NYC"),
            new Person("Bob", 30, "LA"),
            new Person("Charlie", 25, "NYC"),
            new Person("Diana", 30, "LA")
        );
        
        // Group by age, then by city
        Map<Integer, Map<String, List<Person>>> grouped2 = people.stream()
            .collect(Collectors.groupingBy(
                Person::getAge,
                Collectors.groupingBy(Person::getCity)
            ));
        
        // Average age by city
        Map<String, Double> avgAgeByCity = people.stream()
            .collect(Collectors.groupingBy(
                Person::getCity,
                Collectors.averagingInt(Person::getAge)
            ));
        
        // Find oldest person
        Optional<Person> oldest = people.stream()
            .max(Comparator.comparingInt(Person::getAge));
        
        // Get names of people in NYC
        List<String> nycNames = people.stream()
            .filter(p -> p.getCity().equals("NYC"))
            .map(Person::getName)
            .collect(Collectors.toList());
        
        // Chained operations
        String result = people.stream()
            .filter(p -> p.getAge() > 25)
            .sorted(Comparator.comparing(Person::getName))
            .map(Person::getName)
            .collect(Collectors.joining(", ", "People: ", "."));
        // Output: "People: Bob, Diana."
    }
    
    static class Person {
        private String name;
        private int age;
        private String city;
        
        public Person(String name, int age, String city) {
            this.name = name;
            this.age = age;
            this.city = city;
        }
        
        public String getName() { return name; }
        public int getAge() { return age; }
        public String getCity() { return city; }
    }
}
```
*Notice: Stream API provides rich set of operations for declarative data processing. Master these operations for efficient collection manipulation.*

</div>

<div class="version-badges">
<span class="version-badge">Java 8</span>
<span class="version-badge">Functional</span>
</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Performance tips</strong></summary>

<div>

- **Parallel streams**: `.parallelStream()` for large datasets
- **Primitive streams**: `IntStream`, `LongStream` to avoid autoboxing
- **Short-circuit operations**: `.findFirst()`, `.anyMatch()` exit early

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Micro-learning prompts</strong></summary>

<div>

1) What's the difference between intermediate and terminal operations?  
<details><summary>Show answer</summary>
Intermediate: lazy, returns stream (filter, map). Terminal: eager, returns result (collect, forEach).
</details>

2) When to use parallel streams?  
<details><summary>Show answer</summary>
Large datasets (1000+ elements), CPU-intensive operation, independent elements.
</details>

3) What does lazy evaluation mean?  
<details><summary>Show answer</summary>
Operations only execute when terminal operation is called, until then only pipeline is built.
</details>

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Lambda` · `Functional Interface` · `Optional` · `Collector` · `Parallel Processing` · `Method References`

</div>

### Class vs Record {#class-vs-record}

<div class="concept-section definition">

📋 **Concept Definition**  
**Record (Java 14+)** is a concise syntax for immutable data carriers. **vs Class**: Records automatically generate constructor, getters, equals(), hashCode(), toString(). **Immutability**: all fields are final, no setters. **Compact constructor**: validation without explicit assignment. **Components**: record components become final fields. **Restrictions**: cannot extend classes (but can implement interfaces), all fields final, no additional instance fields. **Use cases**: DTOs, value objects, API responses, configuration holders. **Customization**: can override methods, add static methods. **Pattern matching**: enhanced with record patterns (Java 19+). **Performance**: similar to regular classes, compiler optimizations.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Boilerplate reduction**: automatic equals/hashCode/toString generation
- **Immutability**: enforced final fields, thread-safe by design
- **Clear intent**: explicitly models data carriers
- **Pattern matching**: works seamlessly with modern Java features

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Traditional class - verbose
public final class PersonClass {
    private final String name;
    private final int age;
    
    public PersonClass(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String getName() { return name; }
    public int getAge() { return age; }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PersonClass)) return false;
        PersonClass that = (PersonClass) o;
        return age == that.age && Objects.equals(name, that.name);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
    
    @Override
    public String toString() {
        return "PersonClass[name=" + name + ", age=" + age + "]";
    }
}

// Record - concise (Java 14+)
public record Person(String name, int age) {
    // Compact constructor for validation
    public Person {
        if (age < 0) {
            throw new IllegalArgumentException("Age cannot be negative");
        }
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Name cannot be blank");
        }
    }
    
    // Custom methods
    public boolean isAdult() {
        return age >= 18;
    }
    
    // Static factory method
    public static Person of(String name, int age) {
        return new Person(name, age);
    }
}

// Usage
Person p1 = new Person("Alice", 30);
Person p2 = new Person("Alice", 30);

System.out.println(p1.name());           // Alice (accessor method)
System.out.println(p1.equals(p2));       // true (automatic equals)
System.out.println(p1);                  // Person[name=Alice, age=30]
System.out.println(p1.isAdult());        // true
```
*Notice: Record provides all standard methods automatically, ensuring consistency and reducing errors.*

</div>

<div class="version-badges">
<span class="version-badge">Java 14</span>
<span class="version-badge">Java 16 (stable)</span>
</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths / misconceptions</strong></summary>

<div>

- "Records can't have methods" → Records can have custom methods, just not additional fields
- "Records are always immutable" → Fields are final, but content can be mutable (e.g., List field)
- "Records are just for DTOs" → Great for any immutable data carrier use case

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Can't explain when to use record vs class
- Don't understand compact constructor validation
- Confusion about record component accessors (name() not getName())

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Immutability` · `Value Objects` · `DTOs` · `Pattern Matching` · `Equals and HashCode`

</div>

### Concurrency Challenges {#concurrency-challenges}

<div class="concept-section definition">

📋 **Concept Definition**  
**Common multi-threading problems**: **Deadlock** (two+ threads wait for each other's locks, circular dependency), **Livelock** (threads actively respond to each other but make no progress), **Starvation** (thread never gets CPU time, low priority or resource monopolization). **Race condition**: outcome depends on thread execution order. **Detection**: thread dumps, profilers, jstack. **Prevention**: **Deadlock** (lock ordering, timeout, tryLock), **Livelock** (randomized retry delays), **Starvation** (fair locks, priority management). **Java tools**: ThreadMXBean for deadlock detection, ReentrantLock for fairness, ExecutorService for resource management.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **System reliability**: prevents application freezes and hangs
- **Performance**: identifies bottlenecks in concurrent systems
- **Resource utilization**: ensures fair thread scheduling
- **Production debugging**: understanding these helps diagnose issues

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// DEADLOCK EXAMPLE
class BankAccount {
    private final String accountId;
    private double balance;
    
    public BankAccount(String accountId, double balance) {
        this.accountId = accountId;
        this.balance = balance;
    }
    
    public void transfer(BankAccount to, double amount) {
        synchronized (this) {                    // Lock account 1
            synchronized (to) {                  // Then lock account 2
                if (this.balance >= amount) {
                    this.balance -= amount;
                    to.balance += amount;
                    System.out.println("Transfer completed: " + amount);
                }
            }
        }
    }
}

// Deadlock scenario:
// Thread 1: account1.transfer(account2, 100) - locks account1, waits for account2
// Thread 2: account2.transfer(account1, 50)  - locks account2, waits for account1
// → DEADLOCK! Both threads wait forever.

// SOLUTION: Lock ordering
class BankAccountFixed {
    private final String accountId;
    private double balance;
    
    public void transfer(BankAccountFixed to, double amount) {
        BankAccountFixed first = this.accountId.compareTo(to.accountId) < 0 ? this : to;
        BankAccountFixed second = this.accountId.compareTo(to.accountId) < 0 ? to : this;
        
        synchronized (first) {     // Always lock in same order
            synchronized (second) {
                if (this.balance >= amount) {
                    this.balance -= amount;
                    to.balance += amount;
                }
            }
        }
    }
}

// LIVELOCK EXAMPLE
class Polite {
    private boolean handshaking;
    
    public void passHallway(Polite other) {
        while (other.handshaking) {
            // Wait for other to stop handshaking
            System.out.println(Thread.currentThread().getName() + " waiting...");
            
            // Both threads keep checking, but neither progresses
            this.handshaking = false;
            Thread.yield();
        }
        
        this.handshaking = true;
        System.out.println(Thread.currentThread().getName() + " passing");
        this.handshaking = false;
    }
}
// → LIVELOCK! Threads actively respond to each other but make no progress.

// SOLUTION: Random backoff
public void passHallwayFixed(Polite other) throws InterruptedException {
    while (other.handshaking) {
        Thread.sleep((long) (Math.random() * 100)); // Random delay
    }
    this.handshaking = true;
    System.out.println(Thread.currentThread().getName() + " passing");
    this.handshaking = false;
}

// STARVATION EXAMPLE
class ResourceScheduler {
    public synchronized void highPriorityTask() {
        while (true) {
            // High-priority tasks keep executing
            System.out.println("High priority task running");
        }
    }
    
    public synchronized void lowPriorityTask() {
        // This might never execute - STARVATION
        System.out.println("Low priority task running");
    }
}

// SOLUTION: Fair scheduling
import java.util.concurrent.locks.ReentrantLock;

class FairResourceScheduler {
    private final ReentrantLock lock = new ReentrantLock(true); // Fair lock
    
    public void task() {
        lock.lock();
        try {
            System.out.println(Thread.currentThread().getName() + " executing");
            // Do work
        } finally {
            lock.unlock();
        }
    }
}

// DEADLOCK DETECTION
import java.lang.management.*;

public class DeadlockDetector {
    public static void detectDeadlocks() {
        ThreadMXBean threadBean = ManagementFactory.getThreadMXBean();
        long[] deadlockedThreads = threadBean.findDeadlockedThreads();
        
        if (deadlockedThreads != null) {
            ThreadInfo[] threadInfos = threadBean.getThreadInfo(deadlockedThreads);
            System.out.println("Deadlock detected!");
            for (ThreadInfo info : threadInfos) {
                System.out.println("Thread: " + info.getThreadName());
                System.out.println("Locked on: " + info.getLockName());
                System.out.println("Owned by: " + info.getLockOwnerName());
            }
        }
    }
}
```
*Notice: Proper lock ordering, timeouts, and fair scheduling prevent most concurrency issues.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths / misconceptions</strong></summary>

<div>

- "synchronized always prevents deadlock" → Can cause deadlock with improper lock ordering
- "Livelock is rare in practice" → Can occur with retry mechanisms and reactive systems
- "JVM automatically detects deadlocks" → You must explicitly check with ThreadMXBean

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Can't explain difference between deadlock and livelock
- Don't know prevention strategies for each
- Can't identify starvation scenarios

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Thread Safety` · `Synchronization` · `Lock Ordering` · `Fair Locks` · `Concurrent Collections`

</div>

### OOP Principles {#oop-principles}

<div class="concept-section definition">

📋 **Concept Definition**  
**Four fundamental concepts** of object-oriented design: **Encapsulation** (data hiding with access modifiers, controlled access via methods), **Inheritance** (IS-A relationship, code reuse via extends), **Polymorphism** (method overriding, runtime binding, substitutability), **Abstraction** (hiding complexity via abstract classes/interfaces, exposing essential features). **Benefits**: modularity, code reuse, extensibility, maintainability. **Java mechanisms**: classes, interfaces, abstract classes, access modifiers, method overriding. **Design patterns** leverage OOP: Factory, Strategy, Observer, Decorator. **vs Functional**: OOP models with objects and state, functional uses immutable data and pure functions.

</div>

#### Encapsulation

<div class="concept-section why-important">

💡 **Why it matters?**
- **Data hiding**: internal state protected from external modification
- **Interface consistency**: controlled access through methods
- **Maintainability**: changes to implementation don't affect clients

</div>

<div class="runnable-model">

**Runnable mental model**
```java
public class BankAccount {
    private double balance;  // Private data
    
    public void deposit(double amount) {  // Controlled access
        if (amount > 0) {
            this.balance += amount;
        }
    }
    
    public double getBalance() {
        return balance;  // Read-only access
    }
    
    // No direct access to balance field
}
```

</div>

#### Inheritance

<div class="concept-section why-important">

💡 **Why it matters?**
- **Code reuse**: child classes inherit parent functionality
- **Hierarchy**: models "is-a" relationships
- **Polymorphism**: enables method overriding

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Parent class
public class Animal {
    protected String name;
    
    public void eat() {
        System.out.println(name + " is eating");
    }
}

// Child class
public class Dog extends Animal {
    public Dog(String name) {
        this.name = name;
    }
    
    @Override
    public void eat() {  // Method overriding
        System.out.println(name + " is eating dog food");
    }
    
    public void bark() {  // Additional method
        System.out.println(name + " is barking");
    }
}
```

</div>

#### Polymorphism

<div class="concept-section why-important">

💡 **Why it matters?**
- **Runtime binding**: method resolution at execution time
- **Flexibility**: same interface, different implementations
- **Extensibility**: new types can be added without changing existing code

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Polymorphic usage
Animal[] animals = {
    new Dog("Buddy"),
    new Cat("Whiskers"),
    new Bird("Tweety")
};

for (Animal animal : animals) {
    animal.eat();  // Different implementation for each type
}
// Output:
// Buddy is eating dog food
// Whiskers is eating cat food
// Tweety is eating seeds
```

</div>

### SOLID Principles {#solid-principles}

<div class="concept-section definition">

📋 **Concept Definition**  
**Five object-oriented design principles** for maintainable software: **S**ingle Responsibility (class has one reason to change), **O**pen/Closed (open for extension, closed for modification), **L**iskov Substitution (subtypes substitutable for base types), **I**nterface Segregation (clients shouldn't depend on unused methods), **D**ependency Inversion (depend on abstractions, not concretions). **Benefits**: loose coupling, high cohesion, testability, extensibility. **Java applications**: Spring dependency injection (DIP), Strategy pattern (OCP), focused service classes (SRP). **vs GRASP**: SOLID is principles, GRASP is patterns for responsibility assignment. **Trade-offs**: may increase initial complexity, balance with YAGNI (You Aren't Gonna Need It).

</div>

#### Single Responsibility Principle (SRP)

<div class="concept-section why-important">

💡 **Why it matters?**
- **Clarity**: each class has one clear purpose
- **Maintainability**: changes affect only relevant classes
- **Testing**: easier to test focused functionality

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// BAD: Multiple responsibilities
class User {
    private String name;
    private String email;
    
    // User data management
    public void setName(String name) { this.name = name; }
    
    // Email functionality - WRONG!
    public void sendEmail(String message) {
        // Email sending logic
    }
    
    // Database operations - WRONG!
    public void saveToDatabase() {
        // Database saving logic
    }
}

// GOOD: Single responsibility
class User {
    private String name;
    private String email;
    
    // Only user data management
    public void setName(String name) { this.name = name; }
    public String getName() { return name; }
}

class EmailService {
    public void sendEmail(User user, String message) {
        // Email sending logic
    }
}

class UserRepository {
    public void save(User user) {
        // Database saving logic
    }
}
```

</div>

#### Open/Closed Principle (OCP)

<div class="concept-section why-important">

💡 **Why it matters?**
- **Extensibility**: new functionality without modifying existing code
- **Stability**: existing code remains unchanged and tested
- **Polymorphism**: achieved through inheritance and interfaces

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// BAD: Modification required for new shapes
class AreaCalculator {
    public double calculateArea(Object shape) {
        if (shape instanceof Rectangle) {
            Rectangle r = (Rectangle) shape;
            return r.width * r.height;
        } else if (shape instanceof Circle) {
            Circle c = (Circle) shape;
            return Math.PI * c.radius * c.radius;
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
    
    @Override
    public double calculateArea() {
        return width * height;
    }
}

class Circle implements Shape {
    private double radius;
    
    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }
}

class AreaCalculator {
    public double calculateArea(Shape shape) {
        return shape.calculateArea();  // No modification needed for new shapes
    }
}
```

</div>

#### Liskov Substitution Principle (LSP)

<div class="concept-section why-important">

💡 **Why it matters?**
- **Substitutability**: derived classes must be substitutable for base classes
- **Contract compliance**: subclasses must honor parent class contracts
- **Polymorphism reliability**: ensures polymorphic code works correctly

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// BAD: Violates LSP
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

// GOOD: Follows LSP
abstract class Bird {
    public abstract void move();
}

class FlyingBird extends Bird {
    public void fly() {
        System.out.println("Flying...");
    }
    
    @Override
    public void move() {
        fly();
    }
}

class Penguin extends Bird {
    public void swim() {
        System.out.println("Swimming...");
    }
    
    @Override
    public void move() {
        swim();
    }
}
```

</div>

#### Interface Segregation Principle (ISP)

<div class="concept-section why-important">

💡 **Why it matters?**
- **Focused interfaces**: clients depend only on methods they use
- **Reduced coupling**: changes to unused methods don't affect clients
- **Flexibility**: easier to implement and maintain

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// BAD: Fat interface
interface Worker {
    void work();
    void eat();
    void sleep();
}

class Robot implements Worker {
    public void work() { /* robot work */ }
    public void eat() { /* robots don't eat! */ }
    public void sleep() { /* robots don't sleep! */ }
}

// GOOD: Segregated interfaces
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
    public void work() { /* human work */ }
    public void eat() { /* human eat */ }
    public void sleep() { /* human sleep */ }
}

class Robot implements Workable {
    public void work() { /* robot work */ }
    // Robot doesn't need to implement eat() or sleep()
}
```

</div>

#### Dependency Inversion Principle (DIP)

<div class="concept-section why-important">

💡 **Why it matters?**
- **Decoupling**: high-level modules don't depend on low-level modules
- **Flexibility**: easy to change implementations
- **Testing**: easy to mock dependencies

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// BAD: High-level class depends on low-level class
class EmailNotificationService {
    public void sendNotification(String message) {
        // Email sending logic
    }
}

class OrderService {
    private EmailNotificationService emailService = new EmailNotificationService();
    
    public void processOrder(Order order) {
        // Process order
        emailService.sendNotification("Order processed");
    }
}

// GOOD: Both depend on abstraction
interface NotificationService {
    void sendNotification(String message);
}

class EmailNotificationService implements NotificationService {
    public void sendNotification(String message) {
        // Email sending logic
    }
}

class SMSNotificationService implements NotificationService {
    public void sendNotification(String message) {
        // SMS sending logic
    }
}

class OrderService {
    private NotificationService notificationService;
    
    public OrderService(NotificationService notificationService) {
        this.notificationService = notificationService;
    }
    
    public void processOrder(Order order) {
        // Process order
        notificationService.sendNotification("Order processed");
    }
}
```

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Design Patterns` · `Clean Code` · `Maintainability` · `Testing` · `Dependency Injection` · `Polymorphism`

</div>

### Static Keyword {#static-keyword}

<div class="concept-section definition">

📋 **Concept Definition**  
**Class-level members** for use without instances: **static variables** (class-level state, shared across instances), **static methods** (utility functions, no `this` reference), **static blocks** (class initialization, runs once). Access: `ClassName.staticMethod()` or from instance. Memory: single copy in Method Area. Common use: constants (`static final`), utility classes (`Math`, `Collections`), singleton pattern, factory methods. Cannot: access instance members from static context.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Class-level functionality**: usage without object instances
- **Memory efficiency**: one copy for all objects
- **Utility methods**: Math.max(), Collections.sort() type helper functions

</div>

Static elements belong to the class, not to object instances.

<div class="runnable-model">

**Runnable mental model**
```java
public class StaticExample {
    private static int instanceCount = 0;        // Class-level variable
    private static final String CONSTANT = "FIXED"; // Constant
    
    private String name;                         // Instance variable
    
    // Static block - runs when class is loaded
    static {
        System.out.println("Class loaded");
        instanceCount = 0;
    }
    
    public StaticExample(String name) {
        this.name = name;
        instanceCount++;                         // Each object increments
    }
    
    // Static method - callable without object
    public static int getInstanceCount() {
        return instanceCount;
        // return this.name;                     // ERROR: static context
    }
    
    // Instance method
    public String getName() {
        return name + " (#" + instanceCount + ")"; // Static accessible from instance
    }
    
    // Utility static method
    public static int max(int a, int b) {
        return a > b ? a : b;
    }
}

// Usage:
StaticExample.getInstanceCount();               // 0
StaticExample obj1 = new StaticExample("First"); 
StaticExample obj2 = new StaticExample("Second");
StaticExample.getInstanceCount();               // 2
int maximum = StaticExample.max(10, 20);        // 20
```
*Notice: static elements are shared among all object instances and can be accessed without objects.*

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Static methods cannot access instance variables
- Static block execution order
- Memory leak potential with static collections

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Class Loading` · `Memory Management` · `Singleton Pattern` · `Utility Classes` · `Constants`

</div>

### This and Super Keywords {#this-super-keyword}

<div class="concept-section definition">

📋 **Concept Definition**  
**`this`**: current object reference (disambiguation, constructor chaining `this(args)`, return this for fluent API). **`super`**: parent class reference (parent constructor `super(args)` MUST be first, access parent methods `super.method()`, access shadowed fields). Constructor chaining: `this()` or `super()` first statement only. Common patterns: Builder pattern (`return this`), Template Method (`super.method()` extension). Cannot: use in static context.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Disambiguation**: clear reference to similarly named variables
- **Constructor chaining**: building constructor chains
- **Method delegation**: explicit calling of parent methods

</div>

This refers to the current object, super refers to the parent class.

<div class="runnable-model">

**Runnable mental model**
```java
public class Parent {
    protected String name;
    
    public Parent(String name) {
        this.name = name;
    }
    
    public void greet() {
        System.out.println("Hello from " + name);
    }
}

public class Child extends Parent {
    private String nickname;
    
    public Child(String name, String nickname) {
        super(name);              // Parent constructor call
        this.nickname = nickname; // Disambiguation
    }
    
    public void setName(String name) {
        this.name = name;         // this: current object's field
        // super.name = name;     // Same, because protected
    }
    
    @Override
    public void greet() {
        super.greet();            // Call parent method
        System.out.println("But call me " + this.nickname);
    }
    
    public void demonstrateThis() {
        this.greet();             // Explicit this (can be omitted)
        greet();                  // Implicit this
        helper(this);             // this as parameter
    }
    
    private void helper(Child child) {
        System.out.println("Processing: " + child.name);
    }
}
```
*Notice: this and super help us clearly refer to objects and parent functionality.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common mistakes</strong></summary>

<div>

- "super() always first line" → Yes, mandatory first statement in constructor
- "this() and super() together" → Cannot use both, only one
- "this usable in static method" → No, there's no object context

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Constructor Chaining` · `Method Overriding` · `Inheritance` · `Object Identity` · `Method Delegation`

</div>

### Constructor & Constructor Overloading {#constructor-overloading}

<div class="concept-section definition">

📋 **Concept Definition**  
**Object initialization** with special method: same name as class, no return type, called with `new`. **Overloading**: multiple constructors with different parameters. **Constructor chaining**: `this()` calls another constructor (must be first statement). **Master constructor pattern**: one full constructor, others delegate. Default: no-arg constructor (unless explicit constructor exists). Validation: constructor perfect place for invariants. Private constructor: singleton, utility class.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Object initialization**: setting object's initial state
- **Flexibility**: different ways to create objects
- **Validation**: ensuring object invariants at creation

</div>

Constructors are responsible for object initialization and can be created in multiple variants.

<div class="runnable-model">

**Runnable mental model**
```java
public class Person {
    private String firstName;
    private String lastName;
    private int age;
    private String email;
    
    // Default constructor
    public Person() {
        this("Unknown", "Person", 0);
    }
    
    // Constructor overloading - different parameters
    public Person(String firstName, String lastName) {
        this(firstName, lastName, 0);
    }
    
    public Person(String firstName, String lastName, int age) {
        this(firstName, lastName, age, null);
    }
    
    // Master constructor - accepts all parameters
    public Person(String firstName, String lastName, int age, String email) {
        this.firstName = validateName(firstName);
        this.lastName = validateName(lastName);
        this.age = validateAge(age);
        this.email = email;
    }
    
    // Copy constructor pattern
    public Person(Person other) {
        this(other.firstName, other.lastName, other.age, other.email);
    }
    
    private String validateName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty");
        }
        return name.trim();
    }
    
    private int validateAge(int age) {
        if (age < 0 || age > 150) {
            throw new IllegalArgumentException("Invalid age: " + age);
        }
        return age;
    }
}

// Usage - multiple initialization ways:
Person p1 = new Person();
Person p2 = new Person("John", "Doe");
Person p3 = new Person("Jane", "Smith", 25);
Person p4 = new Person("Bob", "Johnson", 30, "bob@example.com");
Person p5 = new Person(p3);  // Copy constructor
```
*Notice: constructor chaining helps avoid code duplication, and every object is created in a validated state.*

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Constructor chaining rules (this() first statement)
- When default constructor is auto-generated
- Constructor vs method differences (no return type)

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Object Initialization` · `Method Overloading` · `This Keyword` · `Validation` · `Builder Pattern`

</div>

### Method Overloading vs Method Overriding {#method-overloading-overriding}

<div class="concept-section definition">

📋 **Concept Definition**  
**Overloading** (compile-time polymorphism): same method name, different parameters (count/type/order), resolved at compile-time. **Overriding** (runtime polymorphism): same signature, different implementation in subclass, `@Override` annotation, resolved at runtime (dynamic dispatch). Overriding rules: cannot reduce visibility, cannot throw broader checked exceptions, return type covariant allowed. Overloading: static methods can be overloaded but NOT overridden. Key difference: overloading = API flexibility, overriding = behavioral specialization.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **API flexibility**: overloading provides multiple usage modes
- **Polymorphism**: overriding enables runtime specialization
- **Code organization**: logically grouped functionality

</div>

Two different techniques for handling methods: overloading is compile-time, overriding is runtime mechanism.

<div class="runnable-model">

**Runnable mental model**
```java
// METHOD OVERLOADING - same name, different parameters
public class Calculator {
    
    // Overloaded methods - compile-time resolution
    public int add(int a, int b) {
        return a + b;
    }
    
    public double add(double a, double b) {
        return a + b;
    }
    
    public int add(int a, int b, int c) {
        return a + b + c;
    }
    
    public String add(String a, String b) {
        return a + b;
    }
}

// METHOD OVERRIDING - redefining parent method
public abstract class Animal {
    public void sleep() {
        System.out.println("Animal sleeps");
    }
    
    public abstract void makeSound(); // Mandatory override
}

public class Dog extends Animal {
    @Override
    public void makeSound() {           // Runtime resolution
        System.out.println("Woof!");
    }
    
    @Override
    public void sleep() {               // Optional override
        System.out.println("Dog sleeps in kennel");
    }
}

public class Cat extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Meow!");
    }
    // sleep() not overridden -> parent implementation
}

// Usage:
Calculator calc = new Calculator();
calc.add(1, 2);           // int version
calc.add(1.5, 2.5);       // double version
calc.add("Hello", "World"); // String version

Animal dog = new Dog();
Animal cat = new Cat();
dog.makeSound();          // "Woof!" - runtime decision
cat.makeSound();          // "Meow!" - runtime decision
```
*Notice: overloading is compile-time (static), overriding is runtime (dynamic) decision-based.*

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Overloading resolution rules (exact match > widening > autoboxing > varargs)
- @Override annotation requirement
- Covariant return types in overriding

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Compile-time Binding` · `Runtime Binding` · `Polymorphism` · `Method Signature` · `Virtual Method Dispatch`

</div>

### Abstract Class {#abstract-class}

<div class="concept-section definition">

📋 **Concept Definition**  
**Partial implementation** class: `abstract` keyword, cannot instantiate, can have **abstract methods** (no body, subclass MUST implement) AND **concrete methods** (shared implementation). **Template Method Pattern**: define algorithm skeleton, subclasses fill details. Differences from interface: single inheritance, can have state (fields), constructors, any access modifiers. Use when: common behavior + mandatory customization, protected state sharing. Example: `AbstractList`, `HttpServlet`.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Partial implementation**: common code + mandatory customization
- **Template method pattern**: algorithm skeleton, details in descendants
- **Code reuse**: implementation sharing in inheritance hierarchy

</div>

Abstract class cannot be instantiated, can contain both abstract and concrete methods.

<div class="runnable-model">

**Runnable mental model**
```java
// Abstract class - cannot be instantiated
public abstract class Vehicle {
    protected String brand;
    protected int year;
    
    // Concrete method - common implementation
    public Vehicle(String brand, int year) {
        this.brand = brand;
        this.year = year;
    }
    
    // Concrete method
    public void start() {
        System.out.println("Starting " + brand);
        engineStart();        // Template method pattern
        System.out.println("Ready to go!");
    }
    
    // Abstract method - must be implemented
    public abstract void engineStart();
    public abstract double getFuelConsumption();
    
    // Template method - algorithm skeleton
    public final void service() {
        checkEngine();
        changeOil();
        specificMaintenance();   // Abstract part
        updateServiceRecord();
    }
    
    private void checkEngine() {
        System.out.println("Engine checked");
    }
    
    private void changeOil() {
        System.out.println("Oil changed");
    }
    
    protected abstract void specificMaintenance();
    
    private void updateServiceRecord() {
        System.out.println("Service record updated");
    }
}

// Concrete implementation
public class Car extends Vehicle {
    public Car(String brand, int year) {
        super(brand, year);
    }
    
    @Override
    public void engineStart() {
        System.out.println("Car engine started");
    }
    
    @Override
    public double getFuelConsumption() {
        return 7.5; // L/100km
    }
    
    @Override
    protected void specificMaintenance() {
        System.out.println("Tire pressure checked");
    }
}

// Vehicle vehicle = new Vehicle();  // ERROR: cannot instantiate
Car car = new Car("Toyota", 2020);   // OK
Vehicle vehicle = car;                // OK: polymorphism
```
*Notice: abstract class is a mix of common implementation and mandatory specialization.*

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Template Method Pattern` · `Inheritance` · `Polymorphism` · `Interface` · `Strategy Pattern`

</div>

### Enum {#enum}

<div class="concept-section definition">

📋 **Concept Definition**  
**Type-safe constants** for finite value sets: implicit `final` class, cannot extend, **singleton instances**. Can have fields, constructors (private), methods, implement interfaces. Built-in methods: `values()`, `valueOf(String)`, `ordinal()`, `name()`. Switch-compatible. Common patterns: **Strategy Pattern** (enum with behavior), **Singleton** (single constant). Examples: `DayOfWeek`, `HttpStatus`. Benefits: compile-time type safety, switch exhaustiveness, readability vs int constants.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Type safety**: compile-time checking for finite value sets
- **Readability**: descriptive constants instead of ints
- **Switch compatibility**: enums usable in switch statements

</div>

Enum is used to define type-safe constants, which are implicitly final and static.

<div class="runnable-model">

**Runnable mental model**
```java
// Simple enum
public enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}

// Enum with fields and methods
public enum Planet {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS(4.869e+24, 6.0518e6),
    EARTH(5.976e+24, 6.37814e6),
    MARS(6.421e+23, 3.3972e6);
    
    private final double mass;     // in kg
    private final double radius;   // in meters
    
    // Enum constructor (implicitly private)
    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }
    
    public double getMass() { return mass; }
    public double getRadius() { return radius; }
    
    // Computed property
    public double surfaceGravity() {
        return 6.67300E-11 * mass / (radius * radius);
    }
}

// Enum with methods and state
public enum Operation {
    PLUS("+") {
        public double apply(double x, double y) { return x + y; }
    },
    MINUS("-") {
        public double apply(double x, double y) { return x - y; }
    },
    TIMES("*") {
        public double apply(double x, double y) { return x * y; }
    },
    DIVIDE("/") {
        public double apply(double x, double y) { return x / y; }
    };
    
    private final String symbol;
    
    Operation(String symbol) {
        this.symbol = symbol;
    }
    
    public abstract double apply(double x, double y);
    
    @Override
    public String toString() { return symbol; }
}

// Usage:
Day today = Day.MONDAY;
switch (today) {
    case MONDAY -> System.out.println("It's Monday");
    case FRIDAY -> System.out.println("It's Friday!");
    default -> System.out.println("Midweek");
}

double earthWeight = 175;
double earthMass = earthWeight / Planet.EARTH.surfaceGravity();
System.out.println("Mars weight: " + earthMass * Planet.MARS.surfaceGravity());

double result = Operation.PLUS.apply(10, 5); // 15
```
*Notice: enums can have rich functionality, not just simple constants.*

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Constants` · `Type Safety` · `Switch Statements` · `Strategy Pattern` · `Singleton Pattern`

</div>

### Wrapper Classes {#wrapper-classes}

<div class="concept-section definition">

📋 **Concept Definition**  
**Object representation** for primitives: `Integer` (int), `Double` (double), `Boolean` (boolean), `Character` (char), etc. Needed for: Collections (generic types require objects), null representation, utility methods (`parseInt()`, `valueOf()`). **Caching**: `-128 to 127` for Integer/Long, `true/false` for Boolean - `==` comparison careful! Immutable: thread-safe. Autoboxing/unboxing: automatic conversion. Performance: primitives faster (no heap allocation).

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Collections compatibility**: primitives can be stored in collections
- **Null representation**: primitives don't have null value
- **Utility methods**: Integer.parseInt(), Boolean.valueOf() etc.

</div>

Each primitive type has a wrapper class that represents the value as an object.

<div class="runnable-model">

**Runnable mental model**
```java
public class WrapperExample {
    public static void main(String[] args) {
        // Primitives and wrapper pairs
        int primitive = 42;
        Integer wrapper = Integer.valueOf(42);
        
        // Autoboxing/unboxing
        Integer auto = primitive;      // autoboxing
        int back = wrapper;            // unboxing
        
        // Wrapper utility methods
        String numberStr = "123";
        int parsed = Integer.parseInt(numberStr);
        Integer wrapped = Integer.valueOf(numberStr);
        
        // Comparison pitfalls
        Integer a = 127;
        Integer b = 127;
        System.out.println(a == b);     // true - cached
        
        Integer c = 128;
        Integer d = 128;
        System.out.println(c == d);     // false - not cached!
        System.out.println(c.equals(d)); // true - value comparison
        
        // Collections usage
        List<Integer> numbers = new ArrayList<>();
        numbers.add(1);                 // autoboxing
        numbers.add(null);              // OK with wrapper
        // List<int> primitive;         // ERROR: primitives not allowed
        
        // Utility methods
        System.out.println(Integer.MAX_VALUE);        // 2147483647
        System.out.println(Integer.toBinaryString(8)); // "1000"
        System.out.println(Double.isNaN(0.0/0.0));    // true
        System.out.println(Boolean.parseBoolean("true")); // true
        
        // Type conversion
        double d1 = 3.14;
        Double wrapper1 = d1;
        int converted = wrapper1.intValue(); // 3 - explicit conversion
    }
}
```
*Notice: wrapper classes serve as a bridge between primitive and object worlds.*

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- **Integer cache**: objects cached between -128 and 127 (== vs equals)
- **Performance**: wrapper objects come with memory overhead
- **Null safety**: wrappers can be null, primitives cannot

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Autoboxing` · `Collections Framework` · `Generics` · `Primitive Types` · `Type Conversion`

</div>

### Annotations {#annotations}

<div class="concept-section definition">

📋 **Concept Definition**  
**Metadata mechanism** for code elements: `@interface` syntax. **Built-in**: `@Override`, `@Deprecated`, `@SuppressWarnings`, `@FunctionalInterface`. **Meta-annotations**: `@Retention` (SOURCE/CLASS/RUNTIME visibility), `@Target` (METHOD/FIELD/TYPE applicability), `@Inherited`, `@Documented`. Custom annotations: define with `@interface`, access via Reflection API. Framework usage: Spring (`@Autowired`, `@Controller`), JPA (`@Entity`, `@Id`), validation (`@NotNull`). Compile-time processing: Lombok, annotation processors.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Metadata**: code information in formalized way
- **Framework integration**: Spring, JPA, JAX-RS configuration
- **Code generation**: compile-time processing capabilities

</div>

Annotations provide metadata information for code elements, processable at compile-time or runtime.

<div class="runnable-model">

**Runnable mental model**
```java
// Built-in annotations
public class AnnotationExample {
    
    @Override                           // Compile-time check
    public String toString() {
        return "AnnotationExample";
    }
    
    @Deprecated                         // Warning generation
    public void oldMethod() {
        System.out.println("Use newMethod() instead");
    }
    
    @SuppressWarnings("unchecked")      // Warning suppression
    public void unsafeMethod() {
        List raw = new ArrayList();     // Raw type warning suppressed
        raw.add("item");
    }
}

// Custom annotation definition
@Retention(RetentionPolicy.RUNTIME)     // When available
@Target(ElementType.METHOD)             // Where usable
public @interface Benchmark {
    String value() default "";          // Default parameter
    int iterations() default 1;
}

// Functional interface annotation
@FunctionalInterface
public interface Calculator {
    int calculate(int a, int b);
    
    // int anotherMethod(int x);        // ERROR: more than one abstract method
}

// Custom annotation usage
public class Service {
    
    @Benchmark(value = "Fast operation", iterations = 1000)
    public void fastOperation() {
        // Implementation
    }
    
    @Benchmark                          // With default values
    public void slowOperation() {
        // Implementation
    }
}

// Runtime annotation processing
public class AnnotationProcessor {
    public void processAnnotations(Object obj) {
        Method[] methods = obj.getClass().getDeclaredMethods();
        
        for (Method method : methods) {
            if (method.isAnnotationPresent(Benchmark.class)) {
                Benchmark benchmark = method.getAnnotation(Benchmark.class);
                System.out.println("Benchmarking: " + benchmark.value());
                System.out.println("Iterations: " + benchmark.iterations());
            }
        }
    }
}
```
*Notice: annotations provide declarative metadata for compile-time and runtime processing.*

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Metadata` · `Reflection` · `Framework Configuration` · `Code Generation` · `Aspect-Oriented Programming`

</div>

### Serialization {#serialization}

<div class="concept-section definition">

📋 **Concept Definition**  
**Object-to-byte-stream conversion** for persistence: implement `Serializable` marker interface, `ObjectOutputStream.writeObject()` serialize, `ObjectInputStream.readObject()` deserialize. **serialVersionUID**: version control (class changes compatibility). **transient**: skip field serialization. **static**: not serialized (class-level). Custom serialization: `writeObject()`/`readObject()` methods. Security risks: deserialization vulnerabilities. Alternatives: JSON (Jackson, Gson), Protobuf, MessagePack - preferred over Java serialization.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Persistence**: saving objects to file or storing in database
- **Network communication**: sending objects over network
- **Caching**: temporary storage of objects for faster access

</div>

Converting Java objects to byte stream and back while preserving state.

<div class="runnable-model">

**Runnable mental model**
```java
import java.io.*;

// Serializable class
public class Person implements Serializable {
    private static final long serialVersionUID = 1L;  // Version control
    
    private String name;
    private int age;
    private transient String password;        // Not serializable
    private static String staticField = "static"; // Not serializable
    
    public Person(String name, int age, String password) {
        this.name = name;
        this.age = age;
        this.password = password;
    }
    
    // Custom serialization
    private void writeObject(ObjectOutputStream out) throws IOException {
        out.defaultWriteObject();
        // Custom logic during serialization
    }
    
    private void readObject(ObjectInputStream in) throws IOException, ClassNotFoundException {
        in.defaultReadObject();
        // Custom logic during deserialization
        this.password = "default";  // Reset transient field
    }
    
    @Override
    public String toString() {
        return String.format("Person{name='%s', age=%d, password='%s'}", 
                           name, age, password);
    }
}

// Serialization/Deserialization example
public class SerializationExample {
    public static void main(String[] args) {
        Person person = new Person("John", 30, "secret123");
        String filename = "person.ser";
        
        // Serialization
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream(filename))) {
            out.writeObject(person);
            System.out.println("Serialized: " + person);
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        // Deserialization
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream(filename))) {
            Person deserializedPerson = (Person) in.readObject();
            System.out.println("Deserialized: " + deserializedPerson);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```
*Notice: transient fields are not serializable, and custom serialization logic can be implemented.*

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- **Version compatibility**: serialVersionUID changes can cause compatibility issues
- **Security risks**: arbitrary code execution possibility with untrusted data
- **Performance**: Java serialization is generally slow and verbose

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Object Streams` · `Persistence` · `Network Communication` · `Transient Keyword` · `Version Control`

</div>

### Reflection API {#reflection-api}

<div class="concept-section definition">

📋 **Concept Definition**  
**Runtime introspection and manipulation**: `Class.forName()`, `getDeclaredMethods()`, `getDeclaredFields()`, `getConstructors()`. Access private: `setAccessible(true)` bypasses access modifiers. Dynamic invocation: `Method.invoke(object, args)`. Framework usage: Spring (dependency injection), Hibernate (entity scanning), JUnit (test discovery). Performance: slower than direct calls. Security: requires permission (`ReflectPermission`). Alternatives: Method Handles (Java 7+), bytecode manipulation (ASM, ByteBuddy).

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Framework development**: Spring, Hibernate, JUnit dynamic behavior
- **Dynamic behavior**: runtime class inspection and modification
- **Testing**: accessing private methods and fields in unit tests

</div>

Capability for class introspection and manipulation at runtime.

<div class="runnable-model">

**Runnable mental model**
```java
import java.lang.reflect.*;

public class Student {
    private String name;
    private int age;
    private static int studentCount = 0;
    
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
        studentCount++;
    }
    
    private void study() {
        System.out.println(name + " is studying");
    }
    
    public void sleep() {
        System.out.println(name + " is sleeping");
    }
}

public class ReflectionExample {
    public static void main(String[] args) throws Exception {
        Student student = new Student("Alice", 20);
        
        // Get Class object
        Class<?> clazz = student.getClass();
        // Class<?> clazz = Student.class;           // Alternative
        // Class<?> clazz = Class.forName("Student"); // Alternative
        
        System.out.println("Class name: " + clazz.getName());
        
        // Fields introspection
        Field[] fields = clazz.getDeclaredFields();
        for (Field field : fields) {
            System.out.println("Field: " + field.getName() + 
                             " (" + field.getType().getSimpleName() + ")");
        }
        
        // Private field access
        Field nameField = clazz.getDeclaredField("name");
        nameField.setAccessible(true);  // Bypass private access
        String name = (String) nameField.get(student);
        System.out.println("Private name: " + name);
        nameField.set(student, "Bob");  // Modify private field
        
        // Methods introspection
        Method[] methods = clazz.getDeclaredMethods();
        for (Method method : methods) {
            System.out.println("Method: " + method.getName());
        }
        
        // Private method invocation
        Method studyMethod = clazz.getDeclaredMethod("study");
        studyMethod.setAccessible(true);
        studyMethod.invoke(student);    // Call private method
        
        // Constructor usage
        Constructor<?> constructor = clazz.getConstructor(String.class, int.class);
        Student newStudent = (Student) constructor.newInstance("Charlie", 22);
        
        // Annotations
        if (clazz.isAnnotationPresent(Deprecated.class)) {
            System.out.println("Class is deprecated");
        }
    }
}
```
*Notice: reflection enables accessing private elements and dynamic object manipulation.*

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- **Performance**: reflection slower than direct method call
- **Security**: bypassing private encapsulation
- **Maintenance**: no compile-time check, can break during refactoring

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Introspection` · `Dynamic Proxy` · `Framework Development` · `Annotations` · `Metaprogramming`

</div>

### Equals and HashCode {#equals-hashcode}

<div class="concept-section definition">

📋 **Concept Definition**  
**Object contract methods** for consistent implementation: `equals()` (logical equality, reflexive/symmetric/transitive), `hashCode()` (integer hash code, **equals objects MUST have same hashCode**). HashMap/HashSet relies on both: hashCode determines bucket, equals determines identity. Violation breaks collections. IDE-generated or Lombok `@EqualsAndHashCode`, or `Objects.equals()/Objects.hash()` util methods. Contract: `a.equals(b) == true` → `a.hashCode() == b.hashCode()`.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **HashMap operation**: consistent hashing is crucial
- **Collection behavior**: HashSet, HashMap correct operation
- **Contract compliance**: Object.equals() and Object.hashCode() contract adherence

</div>

If you override equals(), you MUST override hashCode() to keep them consistent.

<div class="runnable-model">

**Runnable mental model**
```java
// INCORRECT IMPLEMENTATION
public class Person {
    private String name;
    private int age;

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Person person = (Person) obj;
        return Objects.equals(name, person.name);  // Only name
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);  // ERROR: name + age
    }
}

// CORRECT IMPLEMENTATION
public class Person {
    private String name;
    private int age;

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Person person = (Person) obj;
        return Objects.equals(name, person.name) && age == person.age;
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);  // Both fields
    }
}
```
*Notice: the equals() and hashCode() rule: if two objects are equals(), their hashCode() must also be equal.*

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- "Only implementing equals() is enough" → Without hashCode(), HashMap doesn't work properly
- "hashCode() must always be unique" → Not necessary, collisions are OK
- "equals() and hashCode() based on same fields" → This is the correct approach

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Object Contract` · `HashMap` · `HashSet` · `Objects.hash()` · `Collection Framework`

</div>

### Lambda Expressions {#lambda-expressions}

<div class="concept-section definition">

📋 **Concept Definition**  
**Anonymous function syntax** for Java 8+ functional interfaces: `(parameters) -> expression` or `(parameters) -> { statements; }`. Single Abstract Method (SAM) requirement. Common types: `Predicate<T>` (boolean test), `Function<T,R>` (transformation), `Consumer<T>` (side effect), `Supplier<T>` (factory). Method references: `String::length` (bound/unbound), `System.out::println` (instance). Closures: access effectively final variables. Stream API natural fit: `list.stream().filter(x -> x > 0).map(String::valueOf)`.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Concise syntax**: less code, more readable syntax
- **Functional programming**: declarative programming style
- **Stream API integration**: natural cooperation with Stream API

</div>

Short anonymous functions, mainly used with functional interfaces and Stream API since Java 8.

<div class="runnable-model">

**Runnable mental model**
```java
import java.util.*;
import java.util.function.*;

public class LambdaExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Anna", "Bob", "Cecil");

        // Old way - Anonymous Inner Class
        names.sort(new Comparator<String>() {
            @Override
            public int compare(String a, String b) {
                return a.compareTo(b);
            }
        });

        // Lambda expression
        names.sort((a, b) -> a.compareTo(b));

        // Method reference (even shorter)
        names.sort(String::compareTo);

        // Using functional interfaces
        Predicate<String> startsWithA = name -> name.startsWith("A");
        Function<String, Integer> getLength = String::length;
        Consumer<String> printer = System.out::println;

        names.stream()
            .filter(startsWithA)
            .map(getLength)
            .forEach(System.out::println);
    }
}
```
*Notice: lambda expressions provide concise syntax for implementing functional interfaces.*

</div>

<div class="version-badges">
<span class="version-badge">Java 8</span>
<span class="version-badge">Functional</span>
</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Functional interface definition precise explanation
- Closure and variable capture rules (effectively final)
- Lambda vs method reference performance differences

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Functional Interfaces` · `Method References` · `Stream API` · `Predicates` · `Functions` · `Consumers`

</div>

### Generics {#generics}

<div class="concept-section definition">

📋 **Concept Definition**  
**Type parameterization** in classes/methods for compile-time type safety: `<T>`, `<E>`, `<K,V>`. Wildcards: `<?>` (unbounded), `<? extends Number>` (upper bound), `<? super Integer>` (lower bound). **Type erasure**: runtime types erased to Object/bound. Collections Framework: `List<String>`, `Map<K,V>`. Cannot: generic arrays (`new T[]`), static generic fields. Benefits: type safety, no casting, reusability.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Type safety**: compile-time type checking
- **No casting**: eliminate explicit type conversion
- **Code reusability**: same code for different types

</div>

Using type parameters in classes and methods providing compile-time type safety and code reusability.

<div class="runnable-model">

**Runnable mental model**
```java
// Generic class
public class Box<T> {
    private T content;

    public void put(T item) {
        this.content = item;
    }

    public T get() {
        return content;
    }
}

// Generic method
public class Utility {
    public static <T> void swap(T[] array, int i, int j) {
        T temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// Usage
public class GenericsExample {
    public static void main(String[] args) {
        Box<String> stringBox = new Box<>();
        stringBox.put("Hello");
        String value = stringBox.get(); // No casting needed!

        Box<Integer> intBox = new Box<>();
        intBox.put(42);
        // intBox.put("Hello"); // Compile error!

        String[] names = {"Anna", "Bob"};
        Utility.swap(names, 0, 1);
    }
}
```
*Notice: generics provide type safety at compile-time and eliminate explicit casting.*

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Type erasure mechanism explanation
- PECS principle (Producer Extends, Consumer Super)
- Generic method vs generic class difference

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Type Parameters` · `Wildcards` · `Type Erasure` · `Bounded Types` · `Collections Framework`

</div>

### Immutability {#immutability}

<div class="concept-section definition">

📋 **Concept Definition**  
**Unchangeable objects** after construction: `final` class, `final` fields, no setters, **defensive copies** for mutable fields (collections). Benefits: **thread-safe** (no synchronization needed), **hashable** (safe HashMap keys), **cacheable**, **predictable**. Examples: `String`, `Integer`, `LocalDate`. Immutable update pattern: `withX()` methods return new instances. Record classes (Java 14+) automatically immutable: `record Person(String name, int age) {}`.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Thread safety**: immutable objects are automatically thread-safe
- **Cacheable**: can be safely used as HashMap keys
- **Predictable behavior**: cannot change unexpectedly

</div>

Immutable objects are objects that cannot be changed after construction. They are thread-safe and hashable.

<div class="runnable-model">

**Runnable mental model**
```java
// Immutable class example
public final class Person {
    private final String name;
    private final int age;
    private final List<String> hobbies;

    public Person(String name, int age, List<String> hobbies) {
        this.name = name;
        this.age = age;
        // Defensive copy - don't expose original reference
        this.hobbies = Collections.unmodifiableList(new ArrayList<>(hobbies));
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public List<String> getHobbies() {
        return hobbies; // already unmodifiable
    }

    // Immutable update pattern
    public Person withAge(int newAge) {
        return new Person(this.name, newAge, new ArrayList<>(this.hobbies));
    }
}

// String is immutable
String str = "Hello";
String upper = str.toUpperCase(); // new object, str unchanged
System.out.println(str);   // "Hello"
System.out.println(upper); // "HELLO"
```
*Notice: immutable objects are safe in concurrent environments and easily hashable as HashMap keys.*

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Defensive copying concept and when it's necessary
- Immutable vs unmodifiable collection difference
- Builder pattern implementation for immutable objects

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Final Fields` · `Defensive Copy` · `Builder Pattern` · `Thread Safety` · `String Pool`

</div>

### Autoboxing and Unboxing {#autoboxing-unboxing}

<div class="concept-section definition">

📋 **Concept Definition**  
**Automatic conversion** primitives ↔ wrapper objects: `int` → `Integer.valueOf()` (autoboxing), `Integer` → `.intValue()` (unboxing). Collections require objects: `List<Integer>` stores wrappers. **Caching**: `-128 to 127` Integer cached, `==` comparison careful! NullPointerException risk: unboxing `null` wrapper throws NPE. Performance: boxing creates heap objects (slower than primitives). Avoid in hot loops. Prefer primitives when possible, wrappers only for Collections/generics.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Collections compatibility**: using primitives in generic collections
- **Convenience**: less explicit conversion in code
- **Performance impact**: knowing when allocation happens

</div>

Automatic conversion of primitive types to wrapper classes (autoboxing) and back (unboxing).

<div class="runnable-model">

**Runnable mental model**
```java
public class AutoboxingExample {
    public static void main(String[] args) {
        // Autoboxing - primitive -> wrapper
        int primitive = 42;
        Integer wrapper = primitive;  // Automatically: Integer.valueOf(primitive)

        // Unboxing - wrapper -> primitive
        Integer wrapperInt = 100;
        int backToPrimitive = wrapperInt;  // Automatically: wrapperInt.intValue()

        // Collections can only store objects
        List<Integer> numbers = new ArrayList<>();
        numbers.add(1);        // autoboxing: numbers.add(Integer.valueOf(1))
        numbers.add(2);
        numbers.add(3);

        int sum = 0;
        for (Integer num : numbers) {
            sum += num;        // unboxing: sum += num.intValue()
        }

        // Beware: null pointer exception possibility
        Integer nullWrapper = null;
        // int danger = nullWrapper;  // NullPointerException!
    }
}
```
*Notice: autoboxing/unboxing is convenient, but watch out for null values and performance impacts.*

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Integer cache range precise knowledge (-128 to 127)
- == vs equals with wrapper objects
- Performance impact of boxing/unboxing in loops

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Wrapper Classes` · `Collections Framework` · `Generics` · `Integer Cache` · `NullPointerException`

</div>

### Access Modifiers {#access-modifiers}

<div class="concept-section definition">

📋 **Concept Definition**  
Four **visibility levels** in Java: **public** (anywhere), **protected** (same package + subclasses), **package-private/default** (same package only), **private** (same class only). Encapsulation best practice: private fields, public methods. Class level: `public` or package-private only (no protected/private top-level classes). Inheritance: cannot reduce visibility (public method stays public in subclass). Common pattern: private fields + public getters/setters.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Encapsulation control**: precisely control who can access what
- **API design**: provide clear interface to clients
- **Package organization**: logical grouping and access control

</div>

Java has four visibility levels: public, protected, package-private (default), and private.

<div class="runnable-model">

**Runnable mental model**
```java
package com.example;

public class AccessExample {
    public String publicField = "Everyone sees";         // All classes
    protected String protectedField = "Package + subclass"; // Package + subclass
    String packageField = "Package only";                // Same package only
    private String privateField = "Only me";             // This class only
    
    public void publicMethod() { }      // Callable anywhere
    protected void protectedMethod() { } // Package + inheritance
    void packageMethod() { }            // Package level
    private void privateMethod() { }     // Internal use only
}
```
*Notice: each modifier provides different levels of access for encapsulation.*

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Protected vs package-private difference precise knowledge
- Access modifier inheritance rules
- Default constructor access modifier behavior

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Encapsulation` · `Package` · `Inheritance` · `API Design` · `Information Hiding`

</div>

### Final Keyword {#final-keyword}

<div class="concept-section definition">

📋 **Concept Definition**  
**Immutability/prevention keyword** in three contexts: **final class** (cannot extend, e.g., `String`), **final method** (cannot override), **final variable** (single assignment, constant). Final variable: **compile-time constant** (`static final int MAX = 100`) or **runtime constant** (constructor-assigned). Reference final: object reference immutable, content mutable (`final List<>` - list reference fixed, elements changeable). Effectively final: used in lambdas/inner classes.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Immutability**: final variables cannot be modified
- **Design intent**: signals that something is unchangeable
- **Performance**: compiler optimization possibilities

</div>

The final keyword prevents inheritance, overriding, or reassignment.

<div class="runnable-model">

**Runnable mental model**
```java
// Final class - cannot be inherited
public final class String {
    // Implementation
}

// Final method - cannot be overridden
public class Parent {
    public final void cannotOverride() {
        System.out.println("This method is final");
    }
}

public class Child extends Parent {
    // Cannot override cannotOverride()
}

// Final variables
public class Constants {
    // Compile-time constant
    public static final int MAX_SIZE = 100;
    
    // Runtime constant
    private final String name;
    
    public Constants(String name) {
        this.name = name;  // Can assign once in constructor
        // this.name = "other";  // ERROR: cannot reassign
    }
    
    // Reference is final, content is mutable
    private final List<String> items = new ArrayList<>();
    
    public void addItem(String item) {
        items.add(item);  // OK: modifying content
        // items = new ArrayList<>();  // ERROR: cannot reassign reference
    }
}
```
*Notice: final prevents modification at different levels - classes, methods, variables.*

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Final reference vs final content difference
- Effectively final concept for lambdas
- Final method performance benefits explanation

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Immutability` · `Constants` · `Inheritance` · `Method Overriding` · `Effectively Final`

</div>

### Optional {#optional}

<div class="concept-section definition">

📋 **Concept Definition**  
**Null-safe container** Java 8+: `Optional.of(value)`, `Optional.empty()`, `Optional.ofNullable(value)`. Methods: `isPresent()`, `ifPresent(Consumer)`, `orElse(default)`, `orElseGet(Supplier)`, `orElseThrow()`, `map()`, `flatMap()`, `filter()`. Anti-patterns: `get()` without `isPresent()` (defeats purpose), Optional fields/parameters (use nullable instead). Use for: return types where absence meaningful. Not for: collections (use empty list), primitives (use OptionalInt/Long/Double).

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Null safety**: prevent NullPointerException
- **Explicit API**: method signature shows potential null return
- **Functional style**: chainable operations in null-safe way

</div>

Container object that may be empty or contain a non-null value.

<div class="runnable-model">

**Runnable mental model**
```java
import java.util.Optional;

public class OptionalExample {
    
    // Traditional null-prone method
    public String findUserEmail(int userId) {
        if (userId == 1) return "user@example.com";
        return null;  // Dangerous!
    }
    
    // Optional-based method
    public Optional<String> findUserEmailSafe(int userId) {
        if (userId == 1) return Optional.of("user@example.com");
        return Optional.empty();  // Explicit empty
    }
    
    public static void main(String[] args) {
        OptionalExample example = new OptionalExample();
        
        // Traditional approach - risky
        String email1 = example.findUserEmail(999);
        // int length = email1.length();  // NullPointerException!
        
        // Safe approach with null check
        if (email1 != null) {
            System.out.println("Email length: " + email1.length());
        }
        
        // Optional approach - safe and expressive
        Optional<String> emailOpt = example.findUserEmailSafe(1);
        
        // Check if present
        if (emailOpt.isPresent()) {
            System.out.println("Email: " + emailOpt.get());
        }
        
        // Functional style operations
        emailOpt
            .filter(email -> email.contains("@"))     // Chain operations
            .map(String::toUpperCase)                 // Transform if present
            .ifPresent(System.out::println);          // Action if present
        
        // Default values
        String email = example.findUserEmailSafe(999)
            .orElse("default@example.com");           // Default value
        
        String email2 = example.findUserEmailSafe(999)
            .orElseGet(() -> generateDefaultEmail()); // Lazy default
        
        // Exception throwing
        String email3 = example.findUserEmailSafe(999)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Chaining Optionals
        Optional<String> domain = example.findUserEmailSafe(1)
            .map(email -> email.substring(email.indexOf('@') + 1));
        
        // flatMap for nested Optionals
        Optional<Optional<String>> nested = Optional.of(Optional.of("value"));
        Optional<String> flattened = nested.flatMap(opt -> opt);
        
        // Converting to Stream
        example.findUserEmailSafe(1)
            .stream()
            .forEach(System.out::println);
    }
    
    private static String generateDefaultEmail() {
        return "generated@example.com";
    }
}
```
*Notice: Optional provides safe null handling with chainable operations.*

</div>

<div class="version-badges">
<span class="version-badge">Java 8</span>
<span class="version-badge">Functional</span>
</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- **Optional.get() without check**: as dangerous as null
- **Optional overuse**: don't use Optional for every nullable value
- **Optional as field**: Optional not meant for instance variables

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Null Safety` · `Functional Programming` · `Stream API` · `Method Chaining` · `Defensive Programming`

</div>

### Record {#record}

<div class="concept-section definition">

📋 **Concept Definition**  
**Immutable data carrier** Java 14+ (stable 16+): `record Person(String name, int age) {}`. Auto-generated: `final` class, private `final` fields, public accessor methods, `equals()`, `hashCode()`, `toString()`, canonical constructor. Custom constructors: compact (`Person { if (age < 0) throw... }`), explicit. Can: implement interfaces, have static members, custom methods. Cannot: extend classes (implicitly extends Record), declare instance fields, be abstract. Pattern matching (Java 16+): `if (obj instanceof Person(String name, int age))`. Serialization-friendly.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Boilerplate reduction**: less code for same functionality
- **Immutability**: automatically immutable data carrier
- **Pattern matching**: Java 17+ pattern matching support

</div>

Compact syntax for creating immutable data classes from Java 14.

<div class="runnable-model">

**Runnable mental model**
```java
// Traditional class approach
public class PersonOld {
    private final String name;
    private final int age;
    
    public PersonOld(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String getName() { return name; }
    public int getAge() { return age; }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        PersonOld person = (PersonOld) obj;
        return age == person.age && Objects.equals(name, person.name);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
    
    @Override
    public String toString() {
        return "PersonOld{name='" + name + "', age=" + age + '}';
    }
}

// Record approach - much simpler!
public record Person(String name, int age) {
    // Automatic: constructor, getters, equals, hashCode, toString
    
    // Custom constructor with validation
    public Person {
        if (age < 0) {
            throw new IllegalArgumentException("Age cannot be negative");
        }
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Name cannot be null or blank");
        }
    }
    
    // Additional methods can be added
    public boolean isAdult() {
        return age >= 18;
    }
    
    // Static factory methods
    public static Person baby(String name) {
        return new Person(name, 0);
    }
}

// Generic record
public record Result<T>(T value, boolean success, String message) {
    
    public static <T> Result<T> success(T value) {
        return new Result<>(value, true, "Success");
    }
    
    public static <T> Result<T> failure(String message) {
        return new Result<>(null, false, message);
    }
}

// Usage example
public class RecordExample {
    public static void main(String[] args) {
        // Creating records
        Person person = new Person("Alice", 25);
        
        // Automatic getters (accessor methods)
        System.out.println("Name: " + person.name());    // Note: name(), not getName()
        System.out.println("Age: " + person.age());
        
        // Automatic toString
        System.out.println(person);  // Person[name=Alice, age=25]
        
        // Automatic equals and hashCode
        Person person2 = new Person("Alice", 25);
        System.out.println(person.equals(person2));      // true
        
        // Records in collections
        Set<Person> people = Set.of(
            new Person("Alice", 25),
            new Person("Bob", 30),
            new Person("Alice", 25)  // Duplicate will be removed
        );
        System.out.println("Unique people: " + people.size()); // 2
        
        // Factory methods
        Person baby = Person.baby("Charlie");
        System.out.println(baby);  // Person[name=Charlie, age=0]
        
        // Generic record usage
        Result<String> success = Result.success("Operation completed");
        Result<String> failure = Result.failure("Something went wrong");
    }
}
```
*Notice: Record drastically reduces boilerplate code for immutable data classes.*

</div>

<div class="version-badges">
<span class="version-badge">Java 14</span>
<span class="version-badge">Preview</span>
<span class="version-badge">Java 16</span>
<span class="version-badge">Final</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Immutability` · `Data Classes` · `Pattern Matching` · `Value Objects` · `Compact Constructor`

</div>

### Modules (Java 9+) {#modules-java9}

<div class="concept-section definition">

📋 **Concept Definition**  
**Java Platform Module System (JPMS)** Java 9+: `module-info.java` descriptor. **requires**: declare dependencies, **exports**: make packages accessible, **opens**: reflection access, **uses/provides**: service loader. Transitive dependencies: `requires transitive`. Strong encapsulation: internal packages inaccessible. Benefits: reliable configuration, smaller runtime (jlink), better security. Migration: unnamed module (classpath compatibility), automatic modules (JAR on module-path). JDK modularized: `java.base` (core), `java.sql`, `java.xml`, etc.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Encapsulation**: module-level instead of package-level encapsulation
- **Dependency management**: explicit dependency declaration
- **Smaller runtime**: include only necessary modules

</div>

Java Platform Module System (JPMS) enables modular organization of larger applications.

<div class="runnable-model">

**Runnable mental model**
```java
// module-info.java - module descriptor
module com.example.myapp {
    // Required dependency
    requires java.base;        // Implicit, every module requires java.base
    requires java.sql;         // SQL API needed
    requires transitive java.logging;  // Transitive - dependents get this automatically
    
    // Optional dependency
    requires static org.slf4j;  // Compile-time dependency, runtime optional
    
    // Exported packages - others can use
    exports com.example.myapp.api;
    exports com.example.myapp.util to com.example.client;  // Qualified export
    
    // Service provider interface
    uses com.example.myapp.spi.DataProcessor;
    provides com.example.myapp.spi.DataProcessor 
        with com.example.myapp.impl.DefaultDataProcessor;
    
    // Reflection access
    opens com.example.myapp.model to com.fasterxml.jackson.databind;
    opens com.example.myapp.config;  // Deep reflection access for all modules
}

// Service Provider Interface example
package com.example.myapp.spi;
public interface DataProcessor {
    void process(String data);
}

// Implementation
package com.example.myapp.impl;
public class DefaultDataProcessor implements DataProcessor {
    @Override
    public void process(String data) {
        System.out.println("Processing: " + data);
    }
}

// Using services
package com.example.myapp.api;
import java.util.ServiceLoader;

public class ProcessorFactory {
    public static void processData(String data) {
        ServiceLoader<DataProcessor> loader = ServiceLoader.load(DataProcessor.class);
        for (DataProcessor processor : loader) {
            processor.process(data);
        }
    }
}

// Consumer module
module com.example.client {
    requires com.example.myapp;  // Gets transitive java.logging automatically
    
    // Can use:
    // - com.example.myapp.api (exported)
    // - com.example.myapp.util (qualified export to this module)
    // Cannot use:
    // - com.example.myapp.internal (not exported)
}
```
*Notice: modules provide strong encapsulation and explicit dependency management.*

</div>

<div class="version-badges">
<span class="version-badge">Java 9</span>
<span class="version-badge">JPMS</span>
<span class="version-badge">Project Jigsaw</span>
</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- **Legacy compatibility**: old code without modules still works
- **Split packages**: same package in multiple jars is problematic
- **Reflection limitations**: module system restricts deep reflection

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Package System` · `Dependency Management` · `Service Loader` · `Encapsulation` · `Jlink Tool`

</div>

### Java Memory Model (JMM) {#java-memory-model}

<div class="concept-section definition">

📋 **Concept Definition**  
**Visibility and ordering rules** in multi-threaded environment: **happens-before relationship** (if A happens-before B, A's changes visible to B). Synchronization mechanisms: **volatile** (visibility guarantee, no caching), **synchronized** (mutual exclusion + visibility), **final** (safe publication). Memory barriers prevent reordering. CPU caching: each thread has local cache, updates not immediately visible. Data race: concurrent non-synchronized access to same variable (undefined behavior). JSR-133 specification. Modern: VarHandle (Java 9+) for fine-grained control.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Thread safety**: avoiding race conditions and data races
- **Visibility**: when one thread sees changes from another
- **Ordering**: operation order in multi-core environment
- **Performance**: correct synchronization vs unnecessary blocking

</div>

The Java Memory Model defines how variables behave in shared memory in multi-threaded environments.

<div class="runnable-model">

**Runnable mental model**
```java
public class MemoryModelExample {
    private volatile boolean flag = false;        // volatile: visibility guarantee
    private int counter = 0;                      // Non-volatile: no guarantee
    private final Object lock = new Object();
    
    // Volatile example - visibility
    public void writerThread() {
        counter = 42;                            // Write 1
        flag = true;                             // Write 2 - volatile
    }
    
    public void readerThread() {
        if (flag) {                              // Read volatile
            System.out.println(counter);         // Guaranteed to see 42!
        }
    }
    
    // Happens-before relationship examples
    public void synchronizedExample() {
        synchronized (lock) {                    // Acquire lock
            counter++;                           // All operations here are visible
        }                                        // Release lock - happens-before
    }
    
    // Without proper synchronization - BROKEN!
    private boolean ready = false;
    private int value = 0;
    
    public void writerBroken() {
        value = 42;                              // May not be visible
        ready = true;                            // May be reordered!
    }
    
    public void readerBroken() {
        if (ready) {
            System.out.println(value);           // May print 0!
        }
    }
    
    // Correct version with volatile
    private volatile boolean readyVolatile = false;
    private int valueForVolatile = 0;
    
    public void writerCorrect() {
        valueForVolatile = 42;                   // Happens-before
        readyVolatile = true;                    // Volatile write
    }
    
    public void readerCorrect() {
        if (readyVolatile) {                     // Volatile read
            System.out.println(valueForVolatile); // Guaranteed to see 42
        }
    }
}

// Double-checked locking - classic JMM example
public class Singleton {
    private static volatile Singleton instance; // volatile is CRITICAL here!
    
    public static Singleton getInstance() {
        if (instance == null) {                  // First check (no lock)
            synchronized (Singleton.class) {     // Lock only if needed
                if (instance == null) {          // Second check (with lock)
                    instance = new Singleton();  // Without volatile, broken!
                }
            }
        }
        return instance;
    }
}
```
*Notice: volatile and synchronized ensure happens-before relationships and visibility.*

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Volatile vs synchronized precise difference explanation
- Why double-checked locking needs volatile
- Memory visibility problems concrete examples

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Volatile` · `Synchronized` · `Atomic Classes` · `Concurrency` · `Thread Safety` · `Happens-Before`

</div>

### Garbage Collector Types {#garbage-collector-types}

<div class="concept-section definition">

📋 **Concept Definition**  
Different **GC algorithms** with tradeoffs: **Serial GC** (single-threaded, `-XX:+UseSerialGC`, small apps), **Parallel GC** (multi-threaded, throughput-focused, default Java 8), **CMS** (Concurrent Mark Sweep, low-latency, deprecated), **G1 GC** (Garbage First, balanced latency/throughput, default Java 9+, region-based heap), **ZGC** (ultra-low latency <10ms, Java 11+, scalable terabytes), **Shenandoah** (low-latency, concurrent evacuation). Tuning: `-Xms`/`-Xmx` (heap size), `-XX:MaxGCPauseMillis` (pause target), `-XX:G1HeapRegionSize`.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Application performance**: GC pause time vs throughput trade-off
- **Memory efficiency**: different heap organization strategies
- **Latency requirements**: low-latency vs high-throughput applications
- **Hardware utilization**: single-core vs multi-core optimization

</div>

Different garbage collection algorithms optimized for different application types.

<div class="runnable-model">

**Runnable mental model**
```java
// GC types configuration via JVM arguments
public class GCExample {
    public static void main(String[] args) {
        // Different GC activation:
        // -XX:+UseSerialGC          // Single-threaded, small applications
        // -XX:+UseParallelGC        // Multi-threaded, throughput focus
        // -XX:+UseConcMarkSweepGC   // Low-latency (deprecated Java 14+)
        // -XX:+UseG1GC             // Low-latency + good throughput
        // -XX:+UseZGC              // Ultra-low latency (Java 11+)
        // -XX:+UseShenandoahGC     // Low-latency alternative
        
        // GC tuning parameters
        // -Xms2g -Xmx8g            // Heap size
        // -XX:NewRatio=3           // Old:Young generation ratio
        // -XX:G1HeapRegionSize=16m // G1 region size
        
        // GC monitoring
        Runtime runtime = Runtime.getRuntime();
        long maxMemory = runtime.maxMemory();
        long totalMemory = runtime.totalMemory();
        long freeMemory = runtime.freeMemory();
        
        System.out.println("Max memory: " + maxMemory / 1024 / 1024 + " MB");
        System.out.println("Total memory: " + totalMemory / 1024 / 1024 + " MB");
        System.out.println("Free memory: " + freeMemory / 1024 / 1024 + " MB");
    }
}
```
*Notice: different GCs offer different trade-offs between latency and throughput.*

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Generational garbage collection mechanism
- G1 vs ZGC vs Parallel GC use cases
- GC tuning parameters effects

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Heap Memory` · `JVM Tuning` · `Performance Monitoring` · `Memory Management` · `Latency Optimization`

</div>

### Concurrency API {#concurrency-api}

<div class="concept-section definition">

📋 **Concept Definition**  
**java.util.concurrent package** with high-level concurrency tools: **ExecutorService** (thread pool management - FixedThreadPool, CachedThreadPool, ScheduledThreadPool), **CompletableFuture** (async programming, chaining, exception handling), **ConcurrentHashMap** (lock-free reads, segment-based writes), **BlockingQueue** (producer-consumer pattern), **CountDownLatch/CyclicBarrier/Semaphore** (coordination primitives), **Atomic classes** (lock-free variables). ForkJoinPool: work-stealing algorithm for CPU-intensive tasks. Benefits: thread lifecycle management, composable async operations.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Thread management**: ExecutorService automatic thread pool management
- **Asynchronous programming**: CompletableFuture non-blocking operations
- **Thread-safe collections**: ConcurrentHashMap, BlockingQueue high-performance
- **Fork-Join**: work-stealing algorithm for CPU-intensive tasks

</div>

Modern concurrent programming tools in java.util.concurrent package.

<div class="runnable-model">

**Runnable mental model**
```java
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

public class ConcurrencyExample {
    
    // ExecutorService - thread pool management
    public static void demonstrateExecutorService() {
        ExecutorService executor = Executors.newFixedThreadPool(4);
        
        // Submit tasks
        for (int i = 0; i < 10; i++) {
            final int taskId = i;
            executor.submit(() -> {
                System.out.println("Task " + taskId + " on thread: " + 
                                 Thread.currentThread().getName());
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            });
        }
        
        // Proper shutdown
        executor.shutdown();
        try {
            if (!executor.awaitTermination(60, TimeUnit.SECONDS)) {
                executor.shutdownNow();
            }
        } catch (InterruptedException e) {
            executor.shutdownNow();
        }
    }
    
    // CompletableFuture - asynchronous pipelines
    public static void demonstrateCompletableFuture() {
        CompletableFuture<String> future = CompletableFuture
            .supplyAsync(() -> {
                // Simulate API call
                try { Thread.sleep(1000); } catch (InterruptedException e) {}
                return "API Result";
            })
            .thenApply(result -> result.toUpperCase())    // Transform
            .thenApply(result -> "Processed: " + result)  // Chain operations
            .thenCompose(result -> CompletableFuture.supplyAsync(() -> 
                result + " [Async processed]"))           // Flat map
            .exceptionally(throwable -> "Error: " + throwable.getMessage());
        
        // Non-blocking wait with timeout
        try {
            String result = future.get(5, TimeUnit.SECONDS);
            System.out.println(result);
        } catch (TimeoutException | InterruptedException | ExecutionException e) {
            System.err.println("Failed to get result: " + e.getMessage());
        }
    }
    
    // Thread-safe collections
    public static void demonstrateThreadSafeCollections() {
        // ConcurrentHashMap - high-performance concurrent map
        ConcurrentHashMap<String, AtomicInteger> counters = new ConcurrentHashMap<>();
        
        // BlockingQueue - producer-consumer pattern
        BlockingQueue<String> queue = new ArrayBlockingQueue<>(10);
        
        // Producer
        Thread producer = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                try {
                    queue.put("Item " + i);
                    System.out.println("Produced: Item " + i);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });
        
        // Consumer  
        Thread consumer = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                try {
                    String item = queue.take();
                    System.out.println("Consumed: " + item);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });
        
        producer.start();
        consumer.start();
    }
}
```
*Notice: modern concurrency APIs significantly simplify thread management and async programming.*

</div>

<div class="version-badges">
<span class="version-badge">Java 5</span>
<span class="version-badge">Concurrent Collections</span>
<span class="version-badge">Java 8</span>
<span class="version-badge">CompletableFuture</span>
</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- CompletableFuture vs ExecutorService use cases
- ForkJoinPool work-stealing advantage
- Thread pool sizing for CPU-bound vs I/O-bound tasks

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Thread Pools` · `Async Programming` · `Work Stealing` · `Producer Consumer` · `Lock-Free Collections`

</div>

### JDBC and Database Connectivity {#jdbc-database}

<div class="concept-section definition">

📋 **Concept Definition**  
**Java Database Connectivity API** for relational DB access: `DriverManager.getConnection()`, **Connection** (transaction boundary), **Statement** (simple queries, SQL injection risk!), **PreparedStatement** (parameterized, precompiled, **SQL injection safe**), **CallableStatement** (stored procedures), **ResultSet** (query results). Connection pooling: HikariCP (fastest), Apache DBCP, c3p0. Batch operations: `addBatch()`/`executeBatch()`. Transactions: `setAutoCommit(false)`, `commit()`, `rollback()`. Modern alternatives: JPA/Hibernate, jOOQ, MyBatis.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Database independence**: JDBC API unified interface for multiple DBs
- **Security**: PreparedStatement SQL injection protection
- **Performance**: Connection pooling and batch operations
- **Transaction management**: ensuring ACID properties

</div>

Java Database Connectivity API for working with relational databases.

<div class="runnable-model">

**Runnable mental model**
```java
import java.sql.*;

public class JDBCExample {
    
    // Basic JDBC operations
    public static void demonstrateBasicJDBC() {
        String url = "jdbc:h2:mem:testdb";
        String user = "sa";
        String password = "";
        
        try (Connection connection = DriverManager.getConnection(url, user, password)) {
            // Create table
            try (Statement stmt = connection.createStatement()) {
                stmt.execute("""
                    CREATE TABLE users (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(100) NOT NULL,
                        email VARCHAR(150) UNIQUE,
                        age INT
                    )
                """);
            }
            
            // Insert with PreparedStatement (SQL injection safe)
            String insertSQL = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";
            try (PreparedStatement pstmt = connection.prepareStatement(insertSQL, 
                                                   Statement.RETURN_GENERATED_KEYS)) {
                pstmt.setString(1, "John Doe");
                pstmt.setString(2, "john@example.com");
                pstmt.setInt(3, 30);
                
                int affectedRows = pstmt.executeUpdate();
                System.out.println("Inserted rows: " + affectedRows);
                
                // Get generated keys
                try (ResultSet keys = pstmt.getGeneratedKeys()) {
                    if (keys.next()) {
                        long userId = keys.getLong(1);
                        System.out.println("Generated user ID: " + userId);
                    }
                }
            }
            
            // Query with ResultSet
            String selectSQL = "SELECT id, name, email, age FROM users WHERE age > ?";
            try (PreparedStatement pstmt = connection.prepareStatement(selectSQL)) {
                pstmt.setInt(1, 18);
                
                try (ResultSet rs = pstmt.executeQuery()) {
                    while (rs.next()) {
                        long id = rs.getLong("id");
                        String name = rs.getString("name");
                        String email = rs.getString("email");
                        int age = rs.getInt("age");
                        
                        System.out.printf("User: %d, %s, %s, %d%n", id, name, email, age);
                    }
                }
            }
            
        } catch (SQLException e) {
            System.err.println("Database error: " + e.getMessage());
        }
    }
    
    // Transaction management
    public static void demonstrateTransactions() {
        String url = "jdbc:h2:mem:testdb";
        
        try (Connection connection = DriverManager.getConnection(url, "sa", "")) {
            connection.setAutoCommit(false);  // Start transaction
            
            try {
                // Multiple operations in transaction
                try (PreparedStatement pstmt = connection.prepareStatement(
                        "UPDATE users SET age = age + 1 WHERE id = ?")) {
                    pstmt.setLong(1, 1);
                    pstmt.executeUpdate();
                }
                
                connection.commit();    // Success: commit transaction
                System.out.println("Transaction committed successfully");
                
            } catch (Exception e) {
                connection.rollback();  // Failure: rollback transaction
                System.err.println("Transaction rolled back: " + e.getMessage());
            }
            
        } catch (SQLException e) {
            System.err.println("Connection error: " + e.getMessage());
        }
    }
    
    // Batch operations for performance
    public static void demonstrateBatchOperations() {
        String url = "jdbc:h2:mem:testdb";
        
        try (Connection connection = DriverManager.getConnection(url, "sa", "")) {
            String insertSQL = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";
            try (PreparedStatement pstmt = connection.prepareStatement(insertSQL)) {
                
                // Add multiple statements to batch
                for (int i = 1; i <= 1000; i++) {
                    pstmt.setString(1, "User " + i);
                    pstmt.setString(2, "user" + i + "@example.com");
                    pstmt.setInt(3, 20 + (i % 50));
                    pstmt.addBatch();
                    
                    // Execute in chunks for memory efficiency
                    if (i % 100 == 0) {
                        pstmt.executeBatch();
                    }
                }
            }
        } catch (SQLException e) {
            System.err.println("Batch error: " + e.getMessage());
        }
    }
}
```
*Notice: JDBC modern patterns with connection pooling, transaction management, and performance optimization.*

</div>

<div class="version-badges">
<span class="version-badge">JDBC 4.2</span>
<span class="version-badge">PreparedStatement</span>
</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Why use PreparedStatement over Statement (SQL injection + performance)
- When connection pooling is mandatory
- Transaction isolation levels understanding

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Database Access` · `SQL Injection Protection` · `Connection Pooling` · `Transaction Management` · `Batch Processing`

</div>

### Security Fundamentals {#security-fundamentals}

<div class="concept-section definition">

📋 **Concept Definition**  
Java **security mechanisms**: **Cryptography** (`MessageDigest` SHA-256 hashing, `Cipher` AES/RSA encryption, `KeyGenerator`, `SecureRandom`), **Password hashing** (PBKDF2WithHmacSHA256, Bcrypt, Argon2), **Digital signatures** (RSA/DSA sign/verify), **SSL/TLS** (HTTPS communication). Best practices: salted passwords, high iteration counts (100k+), never store plaintext passwords, use HTTPS, input validation, OWASP Top 10 awareness.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Authentication**: user identity verification
- **Authorization**: access control permissions
- **Cryptography**: data encryption and hashing
- **Secure coding**: vulnerability prevention techniques

</div>

Java security fundamentals for authentication, authorization, and cryptography.

<div class="runnable-model">

**Runnable mental model**
```java
import java.security.*;
import javax.crypto.*;
import javax.crypto.spec.*;
import java.util.Base64;

public class SecurityExample {
    
    // Password hashing with salt (secure storage)
    public static void demonstratePasswordHashing() throws Exception {
        String password = "mySecretPassword";
        
        // Generate salt
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        
        // Hash password with PBKDF2 (recommended)
        int iterations = 100000;  // High iteration count for security
        int keyLength = 256;
        
        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
        PBEKeySpec spec = new PBEKeySpec(password.toCharArray(), salt, iterations, keyLength);
        SecretKey key = factory.generateSecret(spec);
        byte[] hash = key.getEncoded();
        
        System.out.println("Salt: " + Base64.getEncoder().encodeToString(salt));
        System.out.println("Hash: " + Base64.getEncoder().encodeToString(hash));
    }
    
    // Symmetric encryption (AES)
    public static void demonstrateSymmetricEncryption() throws Exception {
        String plaintext = "Sensitive data to encrypt";
        
        // Generate AES key
        KeyGenerator keyGen = KeyGenerator.getInstance("AES");
        keyGen.init(256);  // 256-bit key
        SecretKey secretKey = keyGen.generateKey();
        
        // Initialize cipher for encryption
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");  // GCM mode for AEAD
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        
        byte[] iv = cipher.getIV();  // Initialization vector
        byte[] ciphertext = cipher.doFinal(plaintext.getBytes());
        
        System.out.println("Original: " + plaintext);
        System.out.println("Encrypted: " + Base64.getEncoder().encodeToString(ciphertext));
        
        // Decrypt
        cipher.init(Cipher.DECRYPT_MODE, secretKey, new GCMParameterSpec(128, iv));
        byte[] decrypted = cipher.doFinal(ciphertext);
        String decryptedText = new String(decrypted);
        
        System.out.println("Decrypted: " + decryptedText);
    }
    
    // Asymmetric encryption (RSA)
    public static void demonstrateAsymmetricEncryption() throws Exception {
        // Generate RSA key pair
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
        keyGen.initialize(2048);  // 2048-bit keys
        KeyPair keyPair = keyGen.generateKeyPair();
        
        String message = "Secret message";
        
        // Encrypt with public key
        Cipher cipher = Cipher.getInstance("RSA/OAEP/SHA-256");
        cipher.init(Cipher.ENCRYPT_MODE, keyPair.getPublic());
        byte[] encrypted = cipher.doFinal(message.getBytes());
        
        // Decrypt with private key
        cipher.init(Cipher.DECRYPT_MODE, keyPair.getPrivate());
        byte[] decrypted = cipher.doFinal(encrypted);
        
        System.out.println("Decrypted: " + new String(decrypted));
    }
    
    // Digital signatures
    public static void demonstrateDigitalSignatures() throws Exception {
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
        keyGen.initialize(2048);
        KeyPair keyPair = keyGen.generateKeyPair();
        
        String document = "Important document to sign";
        
        // Create signature
        Signature signature = Signature.getInstance("SHA256withRSA");
        signature.initSign(keyPair.getPrivate());
        signature.update(document.getBytes());
        byte[] digitalSignature = signature.sign();
        
        // Verify signature
        signature.initVerify(keyPair.getPublic());
        signature.update(document.getBytes());
        boolean isValid = signature.verify(digitalSignature);
        
        System.out.println("Signature valid: " + isValid);
    }
    
    // Secure random number generation
    public static void demonstrateSecureRandom() {
        // Never use java.util.Random for security!
        SecureRandom secureRandom = new SecureRandom();
        
        // Generate secure random bytes
        byte[] randomBytes = new byte[32];
        secureRandom.nextBytes(randomBytes);
        System.out.println("Random bytes: " + Base64.getEncoder().encodeToString(randomBytes));
    }
}
```
*Notice: Java security APIs support modern cryptographic practices for production-ready security implementation.*

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Symmetric vs asymmetric encryption use cases
- Salt purpose in password hashing
- Digital signature vs encryption difference

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Cryptography` · `Authentication` · `Password Security` · `Digital Signatures` · `Secure Coding`

</div>

### Logging Frameworks {#logging-frameworks}

<div class="concept-section definition">

📋 **Concept Definition**  
Professional logging: **SLF4J** (Simple Logging Facade, API abstraction), **Logback** (native SLF4J implementation), **Log4j2** (async logging, performance). Log levels: TRACE < DEBUG < INFO < WARN < ERROR. Components: **Logger** (entry point), **Appender** (output destination), **Layout/Pattern** (format). **MDC** (Mapped Diagnostic Context - request-scoped data), **Markers** (categorization). Best practices: parameterized logging `logger.info("User {}", userId)` (no string concat), conditional logging, structured JSON logs.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Debugging**: production issues investigation
- **Monitoring**: application health and performance tracking
- **Audit**: security and compliance requirements
- **Performance**: structured logging for analytics

</div>

Professional logging with SLF4J, Logback, and Log4j2 frameworks.

<div class="runnable-model">

**Runnable mental model**
```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.slf4j.Marker;
import org.slf4j.MarkerFactory;

public class LoggingExample {
    
    // SLF4J - Simple Logging Facade for Java (recommended)
    private static final Logger logger = LoggerFactory.getLogger(LoggingExample.class);
    private static final Marker SECURITY = MarkerFactory.getMarker("SECURITY");
    
    // Basic logging levels
    public static void demonstrateLoggingLevels() {
        // Log levels (lowest to highest priority)
        logger.trace("Trace - very detailed debug info");
        logger.debug("Debug - debug information");
        logger.info("Info - general information");
        logger.warn("Warning - potential problem");
        logger.error("Error - error occurred");
        
        // Parameterized logging (recommended)
        String userId = "user123";
        int attemptCount = 3;
        logger.info("User {} logged in after {} attempts", userId, attemptCount);
        
        // Exception logging
        try {
            riskyOperation();
        } catch (Exception e) {
            logger.error("Failed to perform operation for user {}", userId, e);
        }
    }
    
    // Structured logging with MDC (Mapped Diagnostic Context)
    public static void demonstrateStructuredLogging() {
        // Set context for current thread
        MDC.put("userId", "user123");
        MDC.put("sessionId", "session456");
        MDC.put("requestId", "req789");
        
        try {
            logger.info("User action: login attempt");
            authenticateUser("user123");
            logger.info("User action: login successful");
        } finally {
            // Always clear MDC to prevent memory leaks
            MDC.clear();
        }
    }
    
    private static void authenticateUser(String userId) {
        logger.debug("Validating credentials for user");
        logger.info(SECURITY, "Authentication attempt for user: {}", userId);
    }
    
    // Markers for categorizing logs
    public static void demonstrateMarkers() {
        Marker performance = MarkerFactory.getMarker("PERFORMANCE");
        Marker audit = MarkerFactory.getMarker("AUDIT");
        
        // Performance logging
        long startTime = System.currentTimeMillis();
        performOperation();
        long duration = System.currentTimeMillis() - startTime;
        
        logger.info(performance, "Operation completed in {}ms", duration);
        logger.info(audit, "User {} performed action: {}", "user123", "data_export");
    }
    
    // Best practices
    public static void demonstrateBestPractices() {
        // DO: Parameterized logging
        String userId = "user123";
        logger.info("User {} performed action", userId);
        
        // DON'T: String concatenation
        // logger.info("User " + userId + " performed action");  // Inefficient
        
        // DO: Conditional logging for expensive operations
        if (logger.isDebugEnabled()) {
            String expensiveDebug = buildExpensiveDebugInfo();
            logger.debug("Debug info: {}", expensiveDebug);
        }
        
        // DON'T: Log sensitive information
        // logger.info("User password: {}", password);  // NEVER
        
        // DO: Log safely
        logger.info("User authentication successful");
    }
    
    private static void riskyOperation() throws Exception {
        throw new RuntimeException("Simulated failure");
    }
    
    private static void performOperation() {
        try { Thread.sleep(50); } catch (InterruptedException e) {}
    }
    
    private static String buildExpensiveDebugInfo() {
        return "Expensive debug information";
    }
}
```
*Notice: Professional logging with structured context and markers for better observability.*

</div>

<div class="version-badges">
<span class="version-badge">SLF4J</span>
<span class="version-badge">Logback</span>
</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- SLF4J vs direct logging framework usage
- MDC usage for request correlation
- When to use different log levels

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Observability` · `Monitoring` · `Debugging` · `Structured Logging` · `Performance Analysis`

</div>

### Advanced Annotations {#advanced-annotations}

<div class="concept-section definition">

📋 **Concept Definition**  
Advanced **annotation techniques**: **Annotation Processor Tool (APT)** (compile-time code generation, Lombok, MapStruct), **repeatable annotations** (`@Repeatable`, Java 8+), **type annotations** (`@NonNull List<@NonNull String>`, Java 8+), **meta-annotations** composition. Framework integration: **Spring** (`@Component`, `@Autowired`), **JPA** (`@Entity`, `@ManyToOne`), **JAX-RS** (`@Path`, `@GET`), **Bean Validation** (`@NotNull`, `@Size`). Reflection-based processing: `Class.getAnnotations()`, `Method.isAnnotationPresent()`.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Framework integration**: Spring, Hibernate annotation-based configuration
- **Code generation**: compile-time code generation with annotation processors
- **Validation**: Bean Validation API automatic validation
- **Documentation**: executable documentation embedded in code

</div>

Advanced annotation usage with custom annotations, processors, and reflection.

<div class="runnable-model">

**Runnable mental model**
```java
import java.lang.annotation.*;
import java.lang.reflect.*;

// Custom annotations
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Auditable {
    String value() default "";
    AuditLevel level() default AuditLevel.INFO;
}

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Repeatable(Cacheable.List.class)  // Java 8+ repeatable
public @interface Cacheable {
    String value();
    int ttlSeconds() default 300;
    
    @Target(ElementType.METHOD)
    @Retention(RetentionPolicy.RUNTIME)
    @interface List {
        Cacheable[] value();
    }
}

enum AuditLevel { INFO, WARN, ERROR }

// Usage
@Auditable(value = "UserService", level = AuditLevel.INFO)
public class AdvancedAnnotationExample {
    
    @Cacheable(value = "userCache", ttlSeconds = 600)
    @Cacheable(value = "profileCache", ttlSeconds = 300)
    @Auditable(value = "getUserProfile")
    public UserProfile getUserProfile(String userId) {
        return new UserProfile(userId, "John Doe");
    }
    
    // Annotation processing with reflection
    public static void processAnnotations() throws Exception {
        Class<?> clazz = AdvancedAnnotationExample.class;
        
        // Class-level annotation
        if (clazz.isAnnotationPresent(Auditable.class)) {
            Auditable auditable = clazz.getAnnotation(Auditable.class);
            System.out.println("Class audit: " + auditable.value());
        }
        
        // Method-level annotations
        Method method = clazz.getMethod("getUserProfile", String.class);
        
        // Process repeatable annotations
        Cacheable[] cacheables = method.getAnnotationsByType(Cacheable.class);
        for (Cacheable cacheable : cacheables) {
            System.out.printf("Cache: %s, TTL: %d%n", 
                            cacheable.value(), cacheable.ttlSeconds());
        }
    }
}

class UserProfile {
    private String userId;
    private String name;
    
    public UserProfile(String userId, String name) {
        this.userId = userId;
        this.name = name;
    }
}
```
*Notice: Advanced annotations enable framework-style programming with custom metadata and compile-time processing.*

</div>

<div class="version-badges">
<span class="version-badge">Java 8</span>
<span class="version-badge">Repeatable Annotations</span>
</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Retention policy differences (SOURCE vs CLASS vs RUNTIME)
- Annotation processor vs runtime reflection performance
- Custom constraint validator implementation

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Metadata Programming` · `Compile-time Processing` · `Framework Integration` · `Bean Validation` · `AOP Patterns`

</div>

## Common Mistakes and Pitfalls

### NullPointerException
The most common runtime error in Java.

**Example:**
```java
// BAD
String text = getName(); // can be null
int length = text.length(); // NPE if text is null

// GOOD - null check
String text = getName();
if (text != null) {
    int length = text.length();
}

// GOOD - Optional usage
Optional<String> text = getOptionalName();
int length = text.map(String::length).orElse(0);
```

### Equals and HashCode Errors
If you override equals(), you must also override hashCode().

**Example:**
```java
// BAD - only equals overridden
class Person {
    String name;
    
    @Override
    public boolean equals(Object obj) {
        return obj instanceof Person && 
               Objects.equals(name, ((Person) obj).name);
    }
    // hashCode() missing! Won't work properly in HashMap
}

// GOOD - both implemented
class Person {
    String name;
    
    @Override
    public boolean equals(Object obj) {
        return obj instanceof Person && 
               Objects.equals(name, ((Person) obj).name);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
```

### Mutable State Issues
Shared mutable state leads to concurrency bugs.

**Example:**
```java
// BAD - mutable shared state
class Counter {
    private int count = 0;
    
    public void increment() {
        count++;  // Not thread-safe!
    }
}

// GOOD - synchronized or atomic
class Counter {
    private AtomicInteger count = new AtomicInteger(0);
    
    public void increment() {
        count.incrementAndGet();  // Thread-safe
    }
}
```

### Resource Management
Always close resources properly.

**Example:**
```java
// BAD - resource leak
FileInputStream fis = new FileInputStream("file.txt");
// ... use fis
fis.close(); // Won't execute if exception occurs

// GOOD - try-with-resources
try (FileInputStream fis = new FileInputStream("file.txt")) {
    // ... use fis
} // Automatically closed
```

### String Concatenation in Loops
String concatenation in loops is inefficient.

**Example:**
```java
// BAD - creates many String objects
String result = "";
for (int i = 0; i < 1000; i++) {
    result += i;  // Inefficient!
}

// GOOD - use StringBuilder
StringBuilder result = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    result.append(i);
}
String finalResult = result.toString();
```

## Common Patterns

### Singleton Pattern
```java
public class DatabaseConnection {
    private static DatabaseConnection instance;
    
    private DatabaseConnection() {} // Private constructor
    
    public static DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }
}
```

### Builder Pattern
```java
public class User {
    private String name;
    private String email;
    private int age;
    
    public static class Builder {
        private String name;
        private String email;
        private int age;
        
        public Builder setName(String name) {
            this.name = name;
            return this;
        }
        
        public Builder setEmail(String email) {
            this.email = email;
            return this;
        }
        
        public Builder setAge(int age) {
            this.age = age;
            return this;
        }
        
        public User build() {
            return new User(this);
        }
    }
    
    private User(Builder builder) {
        this.name = builder.name;
        this.email = builder.email;
        this.age = builder.age;
    }
}

// Usage
User user = new User.Builder()
    .setName("John Doe")
    .setEmail("john@example.com")
    .setAge(30)
    .build();
```

## Best Practices

1. **Follow naming conventions**: camelCase for variables and methods, PascalCase for classes
2. **Use meaningful names**: `getUserById()` instead of `getUser()`
3. **Keep methods small**: one responsibility per method
4. **Handle exceptions properly**: don't swallow exceptions without logging
5. **Use appropriate data structures**: ArrayList for indexed access, LinkedList for frequent insertions
6. **Avoid null pointer exceptions**: check for null or use Optional
7. **Use interfaces**: program to interfaces, not implementations

## Common Pitfalls

- **Memory leaks**: not closing resources, keeping references to unused objects
- **ConcurrentModificationException**: modifying collection while iterating
- **Equals and hashCode contract**: if you override one, override both
- **String concatenation in loops**: use StringBuilder for multiple concatenations
- **Premature optimization**: write clear code first, optimize when needed

## 👉 See Also

- [Decorator pattern](oop.md#decorator)
- [Command pattern](oop.md#command-pattern)
- [Stream API](#stream-api)
- [Concurrency Challenges](#concurrency-challenges)
- [File read & parse algorithm](algorithms.md#file-read-parse)
- [Interface vs Abstract Class](oop.md#interface-vs-abstract-class)
- [Inheritance](oop.md#inheritance)

---

### Advanced JVM Concepts {#advanced-jvm}
<!-- tags: jvm-internals, memory-management, performance-tuning -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Advanced JVM concepts encompass deep understanding of memory management, garbage collection algorithms, Just-In-Time compilation, and performance optimization techniques**. **Memory areas**: detailed analysis of heap generations (Young, Old, Metaspace), stack frame structure, and off-heap storage. **Garbage collection**: generational hypothesis, collection algorithms (Serial, Parallel, G1, ZGC, Shenandoah), tuning parameters. **JIT compilation**: tiered compilation, optimization levels, deoptimization, code cache management. **Class loading**: delegation model, custom class loaders, hot swapping. **Performance profiling**: heap dumps, thread dumps, JFR (Java Flight Recorder), JVM flags.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Performance optimization**: understand bottlenecks and optimization opportunities
- **Memory management**: prevent OutOfMemoryError and optimize GC behavior
- **Production debugging**: diagnose issues in enterprise applications
- **Scaling**: tune JVM for high-throughput and low-latency requirements

</div>

<div class="runnable-model" data-filter="jvm-internals">

**Runnable mental model**
```java
// === MEMORY MANAGEMENT DEEP DIVE ===

public class MemoryManagementDemo {
    
    // Method Area (Metaspace in Java 8+)
    static class ClassData {
        static final String CONSTANT = "This lives in Method Area";
        static int staticCounter = 0;
        
        // Method bytecode and metadata stored in Method Area
        void demonstrateStackAndHeap() {
            // Stack Frame for this method
            int localVar = 42;              // Stack - primitive
            Integer boxedInt = 100;         // Stack - reference, Heap - object
            String literal = "Hello";       // Stack - reference, String Pool - object
            String newString = new String("World"); // Stack - reference, Heap - object
            
            // Heap allocation
            List<String> list = new ArrayList<>();  // Both reference and object
            list.add("Item");  // String in heap, added to list
            
            // Local variables and method parameters live in Stack Frame
            processData(localVar, boxedInt);
        }
        
        void processData(int param1, Integer param2) {
            // New Stack Frame created
            // param1 and param2 are local to this frame
            char[] charArray = new char[1000];  // Large array in heap
            // When method returns, Stack Frame is popped
            // charArray becomes eligible for GC if no references remain
        }
    }
    
    // === GARBAGE COLLECTION DEMONSTRATION ===
    
    public static void demonstrateGCBehavior() {
        // Young Generation allocation
        List<Object> youngObjects = new ArrayList<>();
        
        // Fill up Eden space with short-lived objects
        for (int i = 0; i < 100000; i++) {
            youngObjects.add(new StringBuilder("Short-lived-" + i));
        }
        
        // Force minor GC
        System.gc();  // Suggestion only, not guaranteed
        
        // Clear references to make objects eligible for GC
        youngObjects.clear();
        
        // Long-lived objects that will survive to Old Generation
        List<String> longLived = new ArrayList<>();
        for (int i = 0; i < 10000; i++) {
            longLived.add(new String("Long-lived-" + i).intern();
        }
        
        // Demonstrate reference types
        demonstrateReferenceTypes();
    }
    
    static void demonstrateReferenceTypes() {
        import java.lang.ref.*;
        
        // Strong reference (default)
        Object strongRef = new Object();
        
        // Weak reference - collected in next GC if no strong refs
        WeakReference<Object> weakRef = new WeakReference<>(new Object());
        
        // Soft reference - collected when memory pressure
        SoftReference<Object> softRef = new SoftReference<>(new Object());
        
        // Phantom reference - for cleanup actions
        ReferenceQueue<Object> queue = new ReferenceQueue<>();
        PhantomReference<Object> phantomRef = new PhantomReference<>(new Object(), queue);
        
        // Check reference status
        System.out.println("Weak ref alive: " + (weakRef.get() != null));
        System.gc();
        System.out.println("Weak ref after GC: " + (weakRef.get() != null));
    }
}

// === JIT COMPILATION INSIGHTS ===

class JITDemo {
    private static long counter = 0;
    
    // Hot method - will be JIT compiled
    public static long fibonacciHot(int n) {
        counter++;  // Make method "hot" for JIT
        if (n <= 1) return n;
        return fibonacciHot(n - 1) + fibonacciHot(n - 2);
    }
    
    // Cold method - stays interpreted
    public static void coldMethod() {
        System.out.println("This runs only once, stays interpreted");
    }
    
    public static void demonstrateJIT() {
        // Warm up the JIT compiler
        long startTime = System.nanoTime();
        for (int i = 0; i < 10000; i++) {
            fibonacciHot(10);  // Make method hot
        }
        long warmupTime = System.nanoTime() - startTime;
        
        // Now measure optimized performance
        startTime = System.nanoTime();
        for (int i = 0; i < 10000; i++) {
            fibonacciHot(10);  // Should be JIT compiled now
        }
        long optimizedTime = System.nanoTime() - startTime;
        
        System.out.println("Warmup time: " + warmupTime / 1_000_000 + "ms");
        System.out.println("Optimized time: " + optimizedTime / 1_000_000 + "ms");
        System.out.println("Speedup: " + (double)warmupTime / optimizedTime + "x");
    }
}

// === CLASS LOADING MECHANICS ===

class ClassLoadingDemo {
    
    // Custom ClassLoader example
    static class CustomClassLoader extends ClassLoader {
        @Override
        public Class<?> findClass(String name) throws ClassNotFoundException {
            // In real implementation, load class bytes from custom source
            byte[] classBytes = loadClassBytes(name);
            return defineClass(name, classBytes, 0, classBytes.length);
        }
        
        private byte[] loadClassBytes(String className) {
            // Simulate loading class from custom source
            // In reality, might load from database, network, etc.
            return new byte[0]; // Placeholder
        }
    }
    
    public static void demonstrateClassLoading() {
        // Class loading hierarchy: Bootstrap -> Extension -> System -> Custom
        ClassLoader systemLoader = ClassLoader.getSystemClassLoader();
        ClassLoader extensionLoader = systemLoader.getParent();
        ClassLoader bootstrapLoader = extensionLoader.getParent(); // null
        
        System.out.println("System ClassLoader: " + systemLoader);
        System.out.println("Extension ClassLoader: " + extensionLoader);
        System.out.println("Bootstrap ClassLoader: " + bootstrapLoader); // null
        
        // Load class dynamically
        try {
            Class<?> dynamicClass = Class.forName("java.util.ArrayList");
            System.out.println("Loaded class: " + dynamicClass.getName());
            System.out.println("Class loader: " + dynamicClass.getClassLoader());
        } catch (ClassNotFoundException e) {
            System.err.println("Class not found: " + e.getMessage());
        }
        
        // Custom class loader usage
        CustomClassLoader customLoader = new CustomClassLoader();
        // In practice: Class<?> customClass = customLoader.loadClass("MyClass");
    }
}

// === JVM MONITORING AND PROFILING ===

import java.lang.management.*;
import java.util.List;

class JVMMonitoring {
    
    public static void monitorJVMMetrics() {
        // Memory monitoring
        MemoryMXBean memoryBean = ManagementFactory.getMemoryMXBean();
        MemoryUsage heapUsage = memoryBean.getHeapMemoryUsage();
        MemoryUsage nonHeapUsage = memoryBean.getNonHeapMemoryUsage();
        
        System.out.println("=== Memory Usage ===");
        System.out.println("Heap Used: " + heapUsage.getUsed() / (1024 * 1024) + " MB");
        System.out.println("Heap Max: " + heapUsage.getMax() / (1024 * 1024) + " MB");
        System.out.println("Non-Heap Used: " + nonHeapUsage.getUsed() / (1024 * 1024) + " MB");
        
        // Garbage collection monitoring
        List<GarbageCollectorMXBean> gcBeans = ManagementFactory.getGarbageCollectorMXBeans();
        System.out.println("\n=== Garbage Collection ===");
        for (GarbageCollectorMXBean gcBean : gcBeans) {
            System.out.println("GC Name: " + gcBean.getName());
            System.out.println("Collections: " + gcBean.getCollectionCount());
            System.out.println("Time spent: " + gcBean.getCollectionTime() + " ms");
        }
        
        // Thread monitoring
        ThreadMXBean threadBean = ManagementFactory.getThreadMXBean();
        System.out.println("\n=== Thread Information ===");
        System.out.println("Thread count: " + threadBean.getThreadCount());
        System.out.println("Peak threads: " + threadBean.getPeakThreadCount());
        System.out.println("Daemon threads: " + threadBean.getDaemonThreadCount());
        
        // Detect deadlocks
        long[] deadlockedThreads = threadBean.findDeadlockedThreads();
        if (deadlockedThreads != null) {
            System.out.println("DEADLOCK DETECTED! Threads: " + deadlockedThreads.length);
        }
        
        // Runtime information
        RuntimeMXBean runtimeBean = ManagementFactory.getRuntimeMXBean();
        System.out.println("\n=== Runtime Information ===");
        System.out.println("JVM Name: " + runtimeBean.getVmName());
        System.out.println("JVM Version: " + runtimeBean.getVmVersion());
        System.out.println("Uptime: " + runtimeBean.getUptime() / 1000 + " seconds");
        System.out.println("JVM Arguments: " + runtimeBean.getInputArguments());
    }
    
    // Memory pool monitoring
    public static void monitorMemoryPools() {
        List<MemoryPoolMXBean> memoryPools = ManagementFactory.getMemoryPoolMXBeans();
        System.out.println("\n=== Memory Pools ===");
        
        for (MemoryPoolMXBean pool : memoryPools) {
            MemoryUsage usage = pool.getUsage();
            System.out.println("Pool: " + pool.getName());
            System.out.println("  Type: " + pool.getType());
            System.out.println("  Used: " + usage.getUsed() / (1024 * 1024) + " MB");
            System.out.println("  Max: " + 
                (usage.getMax() == -1 ? "No limit" : usage.getMax() / (1024 * 1024) + " MB"));
            
            // Check if pool supports usage threshold
            if (pool.isUsageThresholdSupported()) {
                pool.setUsageThreshold(usage.getMax() * 8 / 10); // 80% threshold
                System.out.println("  Threshold set at 80%");
            }
        }
    }
}

// === JVM TUNING EXAMPLES ===

class JVMTuningDemo {
    
    /*
    Common JVM flags for performance tuning:
    
    === Heap Size ===
    -Xms2g          // Initial heap size
    -Xmx8g          // Maximum heap size
    -XX:NewRatio=3  // Old/Young generation ratio
    
    === Garbage Collection ===
    -XX:+UseG1GC                    // Use G1 garbage collector
    -XX:MaxGCPauseMillis=200        // Target max GC pause time
    -XX:G1HeapRegionSize=16m        // G1 region size
    -XX:+UseStringDeduplication     // Deduplicate strings in G1
    
    === JIT Compilation ===
    -XX:+TieredCompilation          // Enable tiered compilation
    -XX:CompileThreshold=10000      // Method compilation threshold
    -XX:+PrintCompilation           // Print compilation info
    
    === Monitoring and Debugging ===
    -XX:+PrintGC                    // Print GC info
    -XX:+PrintGCDetails             // Detailed GC info
    -XX:+PrintGCTimeStamps          // GC timestamps
    -XX:+HeapDumpOnOutOfMemoryError // Dump heap on OOM
    -XX:HeapDumpPath=/tmp/heapdump  // Heap dump location
    
    === Memory Management ===
    -XX:MaxDirectMemorySize=1g      // Max direct memory
    -XX:MaxMetaspaceSize=256m       // Max metaspace size
    -XX:+UseCompressedOops          // Compress object pointers
    
    === Performance Monitoring ===
    -XX:+FlightRecorder             // Enable Java Flight Recorder
    -XX:StartFlightRecording=duration=60s,filename=recording.jfr
    */
    
    // Example of creating heap dump programmatically
    public static void createHeapDump() {
        try {
            MBeanServer server = ManagementFactory.getPlatformMBeanServer();
            HotSpotDiagnosticMXBean mxBean = ManagementFactory.newPlatformMXBeanProxy(
                server, "com.sun.management:type=HotSpotDiagnostic", HotSpotDiagnosticMXBean.class);
            
            String fileName = "heap-dump-" + System.currentTimeMillis() + ".hprof";
            mxBean.dumpHeap(fileName, true);
            System.out.println("Heap dump created: " + fileName);
        } catch (Exception e) {
            System.err.println("Failed to create heap dump: " + e.getMessage());
        }
    }
    
    // Example of setting VM options at runtime
    public static void setVMOptions() {
        try {
            HotSpotDiagnosticMXBean mxBean = ManagementFactory.newPlatformMXBeanProxy(
                ManagementFactory.getPlatformMBeanServer(),
                "com.sun.management:type=HotSpotDiagnostic",
                HotSpotDiagnosticMXBean.class);
            
            // Get current VM options
            System.out.println("Current VM Options:");
            for (VMOption option : mxBean.getDiagnosticOptions()) {
                System.out.println(option.getName() + " = " + option.getValue());
            }
            
            // Set a VM option (if writeable)
            // mxBean.setVMOption("PrintGC", "true");
            
        } catch (Exception e) {
            System.err.println("Failed to access VM options: " + e.getMessage());
        }
    }
}

// Usage examples
public class JVMInternalsMain {
    public static void main(String[] args) {
        System.out.println("=== JVM Internals Demo ===");
        
        // Memory management demonstration
        MemoryManagementDemo.demonstrateGCBehavior();
        
        // JIT compilation demonstration
        JITDemo.demonstrateJIT();
        
        // Class loading demonstration
        ClassLoadingDemo.demonstrateClassLoading();
        
        // JVM monitoring
        JVMMonitoring.monitorJVMMetrics();
        JVMMonitoring.monitorMemoryPools();
        
        // JVM tuning examples
        JVMTuningDemo.createHeapDump();
        JVMTuningDemo.setVMOptions();
    }
}
```
*Notice: Understanding JVM internals is crucial for optimizing Java applications and diagnosing performance issues in production environments.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Over-tuning JVM**: Making too many changes without measuring impact
- **Ignoring GC logs**: Not monitoring garbage collection behavior
- **Wrong GC choice**: Using inappropriate GC algorithm for workload
- **Memory leaks**: Holding references preventing garbage collection
- **Blocking finalizers**: Implementing expensive finalize() methods
- **Excessive object creation**: Creating unnecessary objects in hot paths

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **High-performance applications**: trading systems, real-time processing
- **Large-scale enterprise systems**: microservices, distributed applications
- **Memory-sensitive applications**: caching systems, data processing
- **Long-running services**: application servers, background processors
- **Performance-critical systems**: games, scientific computing

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"Explain the JVM memory model"** → Heap generations, stack, method area, GC behavior
2. **"How does JIT compilation work?"** → Hotspot detection, tiered compilation, optimization
3. **"Troubleshoot an OutOfMemoryError"** → Memory analysis, heap dumps, tuning strategies
4. **"Compare different garbage collectors"** → G1, CMS, ZGC characteristics and use cases
5. **"Optimize JVM for low latency"** → GC tuning, allocation patterns, monitoring

</div>

<div class="concept-section related-concepts">

🔗 **Related concepts**  
`Memory Management` · `Performance Optimization` · `Garbage Collection` · `Bytecode` · `Class Loading`

</div>

<div class="tags">
  <span class="tag">jvm-internals</span>
  <span class="tag">memory-management</span>
  <span class="tag">performance-tuning</span>
  <span class="tag">garbage-collection</span>
  <span class="tag">monitoring</span>
  <span class="tag">medior</span>
</div>

---

### Enterprise Java Patterns {#enterprise-java-patterns}
<!-- tags: enterprise-patterns, design-patterns, architecture, scalability -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Enterprise Java patterns provide proven solutions for building scalable, maintainable, and robust business applications**. **Architectural patterns**: layered architecture, hexagonal architecture, CQRS, event sourcing. **Integration patterns**: message queues, REST APIs, database access patterns, caching strategies. **Concurrency patterns**: thread pools, actor model, reactive programming, async processing. **Security patterns**: authentication, authorization, input validation, secure coding practices. **Testing patterns**: dependency injection, test doubles, integration testing, contract testing. **Performance patterns**: connection pooling, lazy loading, batch processing, circuit breakers.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Scalability**: handle increasing load and complexity
- **Maintainability**: reduce technical debt and improve code quality
- **Reliability**: build fault-tolerant and resilient systems
- **Team productivity**: standardized approaches across development teams

</div>

<div class="runnable-model" data-filter="enterprise-patterns">

**Runnable mental model**
```java
// === LAYERED ARCHITECTURE PATTERN ===

// Domain Layer - Core business logic
public class User {
    private final String id;
    private final String email;
    private final String name;
    private final boolean active;
    
    public User(String id, String email, String name) {
        this.id = requireNonNull(id, "User ID cannot be null");
        this.email = requireNonNull(email, "Email cannot be null");
        this.name = requireNonNull(name, "Name cannot be null");
        this.active = true;
        
        validateEmail(email);
    }
    
    private void validateEmail(String email) {
        if (!email.contains("@")) {
            throw new IllegalArgumentException("Invalid email format");
        }
    }
    
    public User deactivate() {
        return new User(this.id, this.email, this.name, false);
    }
    
    // Business rules
    public boolean canPlaceOrder() {
        return active && email != null;
    }
}

// Repository Pattern - Data access abstraction
public interface UserRepository {
    Optional<User> findById(String id);
    List<User> findByEmail(String email);
    void save(User user);
    void delete(String id);
}

// Service Layer - Application logic
@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final AuditService auditService;
    
    public UserService(UserRepository userRepository, 
                      EmailService emailService, 
                      AuditService auditService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.auditService = auditService;
    }
    
    public User createUser(String email, String name) {
        // Check for duplicates
        List<User> existingUsers = userRepository.findByEmail(email);
        if (!existingUsers.isEmpty()) {
            throw new UserAlreadyExistsException("User with email " + email + " already exists");
        }
        
        // Create new user
        String userId = UUID.randomUUID().toString();
        User newUser = new User(userId, email, name);
        
        // Save user
        userRepository.save(newUser);
        
        // Send welcome email
        emailService.sendWelcomeEmail(newUser);
        
        // Audit log
        auditService.logUserCreated(newUser);
        
        return newUser;
    }
    
    public void deactivateUser(String userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new UserNotFoundException("User not found: " + userId));
        
        User deactivatedUser = user.deactivate();
        userRepository.save(deactivatedUser);
        
        auditService.logUserDeactivated(userId);
    }
}

// Controller Layer - REST API
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @PostMapping
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody CreateUserRequest request) {
        try {
            User user = userService.createUser(request.getEmail(), request.getName());
            UserDto userDto = UserMapper.toDto(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(userDto);
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deactivateUser(@PathVariable String userId) {
        try {
            userService.deactivateUser(userId);
            return ResponseEntity.ok().build();
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

// === DEPENDENCY INJECTION PATTERN ===

// Configuration using Spring
@Configuration
public class AppConfig {
    
    @Bean
    public UserRepository userRepository(JdbcTemplate jdbcTemplate) {
        return new JdbcUserRepository(jdbcTemplate);
    }
    
    @Bean
    public EmailService emailService(@Value("${smtp.host}") String smtpHost) {
        return new SmtpEmailService(smtpHost);
    }
    
    @Bean
    public AuditService auditService(MessageQueue messageQueue) {
        return new AsyncAuditService(messageQueue);
    }
}

// === FACTORY PATTERN FOR DATABASE CONNECTIONS ===

public class DatabaseConnectionFactory {
    private final HikariDataSource dataSource;
    private final ConnectionPool connectionPool;
    
    public DatabaseConnectionFactory(DatabaseConfig config) {
        this.dataSource = createDataSource(config);
        this.connectionPool = new ConnectionPool(dataSource, config.getMaxConnections());
    }
    
    public Connection getConnection() throws SQLException {
        return connectionPool.getConnection();
    }
    
    private HikariDataSource createDataSource(DatabaseConfig config) {
        HikariConfig hikariConfig = new HikariConfig();
        hikariConfig.setJdbcUrl(config.getUrl());
        hikariConfig.setUsername(config.getUsername());
        hikariConfig.setPassword(config.getPassword());
        hikariConfig.setMaximumPoolSize(config.getMaxConnections());
        hikariConfig.setMinimumIdle(config.getMinConnections());
        hikariConfig.setConnectionTimeout(config.getConnectionTimeoutMs());
        hikariConfig.setIdleTimeout(config.getIdleTimeoutMs());
        return new HikariDataSource(hikariConfig);
    }
}

// === CIRCUIT BREAKER PATTERN ===

public class CircuitBreaker {
    private enum State { CLOSED, OPEN, HALF_OPEN }
    
    private State state = State.CLOSED;
    private int failureCount = 0;
    private long lastFailureTime = 0;
    private final int failureThreshold;
    private final long timeoutMs;
    
    public CircuitBreaker(int failureThreshold, long timeoutMs) {
        this.failureThreshold = failureThreshold;
        this.timeoutMs = timeoutMs;
    }
    
    public <T> T execute(Supplier<T> operation) throws Exception {
        if (state == State.OPEN) {
            if (System.currentTimeMillis() - lastFailureTime > timeoutMs) {
                state = State.HALF_OPEN;
            } else {
                throw new CircuitBreakerOpenException("Circuit breaker is OPEN");
            }
        }
        
        try {
            T result = operation.get();
            onSuccess();
            return result;
        } catch (Exception e) {
            onFailure();
            throw e;
        }
    }
    
    private void onSuccess() {
        state = State.CLOSED;
        failureCount = 0;
    }
    
    private void onFailure() {
        failureCount++;
        lastFailureTime = System.currentTimeMillis();
        
        if (failureCount >= failureThreshold) {
            state = State.OPEN;
        }
    }
}

// Service with Circuit Breaker
@Service
public class ExternalApiService {
    private final CircuitBreaker circuitBreaker;
    private final RestTemplate restTemplate;
    
    public ExternalApiService() {
        this.circuitBreaker = new CircuitBreaker(5, 60000); // 5 failures, 1 minute timeout
        this.restTemplate = new RestTemplate();
    }
    
    public String callExternalApi(String endpoint) {
        try {
            return circuitBreaker.execute(() -> {
                ResponseEntity<String> response = restTemplate.getForEntity(endpoint, String.class);
                return response.getBody();
            });
        } catch (CircuitBreakerOpenException e) {
            return "Service temporarily unavailable";
        } catch (Exception e) {
            throw new ExternalServiceException("Failed to call external API", e);
        }
    }
}

// === CACHING PATTERN ===

@Service
public class CachedUserService {
    private final UserRepository userRepository;
    private final Cache<String, User> userCache;
    
    public CachedUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.userCache = Caffeine.newBuilder()
            .maximumSize(10000)
            .expireAfterWrite(Duration.ofMinutes(30))
            .refreshAfterWrite(Duration.ofMinutes(5))
            .build();
    }
    
    public Optional<User> findById(String id) {
        User cachedUser = userCache.getIfPresent(id);
        if (cachedUser != null) {
            return Optional.of(cachedUser);
        }
        
        Optional<User> user = userRepository.findById(id);
        user.ifPresent(u -> userCache.put(id, u));
        return user;
    }
    
    public void updateUser(User user) {
        userRepository.save(user);
        userCache.put(user.getId(), user); // Update cache
    }
    
    public void deleteUser(String id) {
        userRepository.delete(id);
        userCache.invalidate(id); // Remove from cache
    }
}

// === ASYNC PROCESSING PATTERN ===

@Service
public class AsyncOrderProcessor {
    private final OrderRepository orderRepository;
    private final PaymentService paymentService;
    private final EmailService emailService;
    private final ExecutorService executorService;
    
    public AsyncOrderProcessor(OrderRepository orderRepository,
                              PaymentService paymentService,
                              EmailService emailService) {
        this.orderRepository = orderRepository;
        this.paymentService = paymentService;
        this.emailService = emailService;
        this.executorService = Executors.newFixedThreadPool(10);
    }
    
    public CompletableFuture<OrderResult> processOrder(Order order) {
        return CompletableFuture
            .supplyAsync(() -> validateOrder(order), executorService)
            .thenCompose(validOrder -> processPayment(validOrder))
            .thenCompose(paidOrder -> updateInventory(paidOrder))
            .thenCompose(confirmedOrder -> sendConfirmation(confirmedOrder))
            .exceptionally(this::handleOrderFailure);
    }
    
    private Order validateOrder(Order order) {
        // Validation logic
        if (order.getItems().isEmpty()) {
            throw new InvalidOrderException("Order has no items");
        }
        return order;
    }
    
    private CompletableFuture<Order> processPayment(Order order) {
        return CompletableFuture.supplyAsync(() -> {
            PaymentResult result = paymentService.processPayment(order.getPaymentInfo());
            if (!result.isSuccessful()) {
                throw new PaymentFailedException("Payment failed: " + result.getErrorMessage());
            }
            return order.markAsPaid();
        }, executorService);
    }
    
    private CompletableFuture<Order> updateInventory(Order order) {
        return CompletableFuture.supplyAsync(() -> {
            // Update inventory
            order.getItems().forEach(item -> 
                inventoryService.decreaseStock(item.getProductId(), item.getQuantity()));
            return order;
        }, executorService);
    }
    
    private CompletableFuture<OrderResult> sendConfirmation(Order order) {
        return CompletableFuture.supplyAsync(() -> {
            emailService.sendOrderConfirmation(order);
            return new OrderResult(order.getId(), "SUCCESS");
        }, executorService);
    }
    
    private OrderResult handleOrderFailure(Throwable throwable) {
        // Log error and return failure result
        logger.error("Order processing failed", throwable);
        return new OrderResult(null, "FAILED: " + throwable.getMessage());
    }
}

// === EVENT-DRIVEN ARCHITECTURE ===

// Domain Event
public class UserCreatedEvent {
    private final String userId;
    private final String email;
    private final LocalDateTime createdAt;
    
    public UserCreatedEvent(String userId, String email) {
        this.userId = userId;
        this.email = email;
        this.createdAt = LocalDateTime.now();
    }
    
    // getters...
}

// Event Publisher
@Component
public class DomainEventPublisher {
    private final ApplicationEventPublisher eventPublisher;
    
    public DomainEventPublisher(ApplicationEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
    }
    
    public void publishUserCreated(String userId, String email) {
        UserCreatedEvent event = new UserCreatedEvent(userId, email);
        eventPublisher.publishEvent(event);
    }
}

// Event Listeners
@Component
public class UserEventListeners {
    private final EmailService emailService;
    private final AuditService auditService;
    
    public UserEventListeners(EmailService emailService, AuditService auditService) {
        this.emailService = emailService;
        this.auditService = auditService;
    }
    
    @EventListener
    @Async
    public void handleUserCreated(UserCreatedEvent event) {
        emailService.sendWelcomeEmail(event.getEmail());
    }
    
    @EventListener
    @Async
    public void auditUserCreated(UserCreatedEvent event) {
        auditService.logEvent("USER_CREATED", event.getUserId());
    }
}

// === COMMAND QUERY RESPONSIBILITY SEGREGATION (CQRS) ===

// Command side - handles writes
public class CreateUserCommand {
    private final String email;
    private final String name;
    
    public CreateUserCommand(String email, String name) {
        this.email = email;
        this.name = name;
    }
    
    // getters...
}

@Component
public class UserCommandHandler {
    private final UserRepository userRepository;
    private final DomainEventPublisher eventPublisher;
    
    public String handle(CreateUserCommand command) {
        User user = new User(UUID.randomUUID().toString(), 
                           command.getEmail(), 
                           command.getName());
        
        userRepository.save(user);
        eventPublisher.publishUserCreated(user.getId(), user.getEmail());
        
        return user.getId();
    }
}

// Query side - handles reads
public class UserQuery {
    private final String id;
    private final String email;
    private final String name;
    private final boolean active;
    
    // constructor, getters...
}

@Repository
public class UserQueryRepository {
    private final JdbcTemplate jdbcTemplate;
    
    public Optional<UserQuery> findById(String id) {
        try {
            UserQuery user = jdbcTemplate.queryForObject(
                "SELECT id, email, name, active FROM users WHERE id = ?",
                new Object[]{id},
                (rs, rowNum) -> new UserQuery(
                    rs.getString("id"),
                    rs.getString("email"),
                    rs.getString("name"),
                    rs.getBoolean("active")
                )
            );
            return Optional.of(user);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }
    
    public List<UserQuery> findActiveUsers() {
        return jdbcTemplate.query(
            "SELECT id, email, name, active FROM users WHERE active = true",
            (rs, rowNum) -> new UserQuery(
                rs.getString("id"),
                rs.getString("email"),
                rs.getString("name"),
                rs.getBoolean("active")
            )
        );
    }
}

// === SPECIFICATION PATTERN ===

public interface Specification<T> {
    boolean isSatisfiedBy(T candidate);
    Specification<T> and(Specification<T> other);
    Specification<T> or(Specification<T> other);
    Specification<T> not();
}

public abstract class AbstractSpecification<T> implements Specification<T> {
    
    public Specification<T> and(Specification<T> other) {
        return new AndSpecification<>(this, other);
    }
    
    public Specification<T> or(Specification<T> other) {
        return new OrSpecification<>(this, other);
    }
    
    public Specification<T> not() {
        return new NotSpecification<>(this);
    }
}

public class ActiveUserSpecification extends AbstractSpecification<User> {
    @Override
    public boolean isSatisfiedBy(User user) {
        return user.isActive();
    }
}

public class EmailDomainSpecification extends AbstractSpecification<User> {
    private final String domain;
    
    public EmailDomainSpecification(String domain) {
        this.domain = domain;
    }
    
    @Override
    public boolean isSatisfiedBy(User user) {
        return user.getEmail().endsWith("@" + domain);
    }
}

// Usage
public class UserFilterService {
    public List<User> findUsers(List<User> users, Specification<User> specification) {
        return users.stream()
            .filter(specification::isSatisfiedBy)
            .collect(Collectors.toList());
    }
}

// Example usage
UserFilterService filterService = new UserFilterService();
Specification<User> activeCompanyUsers = new ActiveUserSpecification()
    .and(new EmailDomainSpecification("company.com"));

List<User> filteredUsers = filterService.findUsers(allUsers, activeCompanyUsers);
```
*Notice: Enterprise patterns provide structure and proven solutions for complex business requirements, but should be applied thoughtfully to avoid over-engineering.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Over-engineering**: Applying complex patterns to simple problems
- **Tight coupling**: Not properly implementing dependency injection
- **Ignoring transactions**: Missing @Transactional on service methods
- **Synchronous processing**: Not using async patterns for independent operations
- **No error handling**: Missing proper exception handling and recovery
- **Cache inconsistency**: Not invalidating cache properly on updates

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Enterprise applications**: large-scale business systems with complex requirements
- **Microservices architecture**: distributed systems with multiple services
- **E-commerce platforms**: handling orders, payments, inventory management
- **Financial systems**: trading platforms, banking applications
- **Healthcare systems**: patient management, compliance requirements

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"Design a scalable user management system"** → Layered architecture, patterns, data access
2. **"Implement circuit breaker pattern"** → Fault tolerance, resilience patterns
3. **"How would you handle high-volume order processing?"** → Async patterns, event-driven architecture
4. **"Explain CQRS and when to use it"** → Command-query separation, scalability benefits
5. **"Design caching strategy for user data"** → Cache patterns, consistency, performance

</div>

<div class="concept-section related-concepts">

🔗 **Related concepts**  
`Design Patterns` · `Microservices` · `Event-Driven Architecture` · `Dependency Injection` · `Domain-Driven Design`

</div>

<div class="tags">
  <span class="tag">enterprise-patterns</span>
  <span class="tag">design-patterns</span>
  <span class="tag">architecture</span>
  <span class="tag">scalability</span>
  <span class="tag">spring-framework</span>
  <span class="tag">medior</span>
</div>