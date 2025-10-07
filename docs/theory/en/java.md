# Java Fundamentals

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
**Functional-style operations on sequences** of elements. **Sources**: collections (list.stream()), arrays (Arrays.stream()), I/O (Files.lines()). **Intermediate operations** (lazy, return Stream): filter, map, flatMap, distinct, sorted, limit, skip. **Terminal operations** (trigger execution): forEach, collect, reduce, count, anyMatch, findFirst. **Lazy evaluation**: operations only execute when terminal operation called. **Parallel streams**: .parallelStream() or .parallel(), uses ForkJoinPool. **Collectors**: toList(), toSet(), toMap(), groupingBy(), partitioningBy(), joining(). **vs loops**: more declarative, easier parallelization, but not always faster. **Best practices**: prefer streams for bulk operations, avoid side effects in lambdas.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Functional programming**: declarative style instead of imperative
- **Lazy evaluation**: operations only execute on terminal operation
- **Parallel processing**: easy parallelization with `.parallel()` call

</div>

<div class="runnable-model">

**Runnable mental model**
```java
List<String> names = Arrays.asList("Anna", "Bob", "Cecil");

// Functional pipeline
List<String> result = names.stream()
    .filter(name -> name.startsWith("A"))  // Filtering
    .map(String::toUpperCase)               // Transformation
    .sorted()                               // Sorting
    .collect(Collectors.toList());          // Collection

// Result: [ANNA]
```
*Note: operations are lazy, only `.collect()` triggers execution.*

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