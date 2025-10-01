# Java Alapok

## Rövid összefoglaló

A Java egy objektumorientált, platform-független programozási nyelv, amely a "write once, run anywhere" (egyszer írj, bárhol futtasd) elvre épül. A Java Virtual Machine (JVM) segítségével a lefordított bytecode bármely operációs rendszeren futtatható. A Java erős típusossága, automatikus memóriakezelése és gazdag ökoszisztémája teszi népszerűvé vállalati alkalmazások fejlesztésében. Fő buktatói közé tartozik a verbose syntax és a teljesítmény overhead a natív nyelvekhez képest.

## Fogalmak

### JVM (Java Virtual Machine) {#jvm-java-virtual-machine}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A JVM olyan, mint egy tolmács+fordító: először értelmezi a kódot, majd a gyakran futtatott részeket natívan fordítja le JIT segítségével.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Hordozhatóság**: ugyanaz a `.class` fájl Windows, Linux és macOS rendszereken is fut  
- **Teljesítmény**: a JIT futásidőben optimalizálja a kódot  
- **Memóriakezelés**: a Garbage Collector automatikusan felszabadítja a nem használt objektumokat  

</div>

<div class="runnable-model">

**Runnable mental model**
```bash
# Java forráskód fordítása bytecode-dá
javac HelloWorld.java    # -> HelloWorld.class (bytecode)

# Bytecode futtatása JVM-en
java HelloWorld          # JVM értelmezi a bytecode-ot
```
*Figyeld meg: a `java HelloWorld` parancs nem a forrást fordítja, hanem a bytecode-ot értelmezi, majd JIT fordítás után natív kódot futtat.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „A Java mindig lassú." → Valójában a JIT miatt hosszú távon sokszor közel natív sebességet ér el  
- „A `System.gc()` hívás azonnal futtatja a GC-t." → Ez csak kérés, nincs garancia  
- „A JRE külön telepítendő a JDK mellé." → A JDK már tartalmazza a szükséges runtime-ot  

</div>
</details>

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Performance corner</strong></summary>

<div>

- Mikrobenchmarkhoz ne `System.nanoTime()`-ot használj, hanem JMH-t  
- A JIT csak a gyakran futtatott kódrészeket optimalizálja → ezért van „warm-up" fázis  
- Kerüld a felesleges objektum allokációkat a hot path-on, hogy csökkentsd a GC terhelést  

</div>
</details>

</div>

<div class="concept-section tools">

<details>
<summary>🧰 <strong>Kapcsolódó API-k / eszközök</strong></summary>

<div>

`jcmd`, `jfr`, `jstack`, `jmap`, `jstat`, `javap`

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) Mi történik a class loading három fő lépésében?  
<details><summary>Válasz mutatása</summary>
Load → betöltés, Link → verify + prepare + resolve, Init → statikus inicializálás.
</details>

2) Miért fontos a JIT fordítás?  
<details><summary>Válasz mutatása</summary>
Mert futás közben optimalizálja a hot path-okat natív kódra, így gyorsabb lesz a végrehajtás.
</details>

3) Hogyan különbözik a JVM a JDK-tól és JRE-től?  
<details><summary>Válasz mutatása</summary>
JVM: futtatási motor; JRE: JVM + alap könyvtárak; JDK: JRE + fejlesztői eszközök.
</details>

</div>
</details>

</div>

<div class="version-badges">
<span class="version-badge">Java 8</span>
<span class="version-badge">11 LTS</span>
<span class="version-badge">17 LTS</span>
<span class="version-badge">21 LTS</span>
</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Heap és stack memória összekeverése  
- `equals` és `hashCode` összefüggéseinek figyelmen kívül hagyása  
- Azt gondolni, hogy kézzel kontrollálhatod a GC-t  

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Class Loading` · `JIT Compiler` · `Garbage Collector` · `Java Memory Model` · `Modules (JPMS)`

</div>

### JDK (Java Development Kit) {#jdk-java-development-kit}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A JDK olyan, mint egy teljes fejlesztői műhely: tartalmazza a fordítót, futtatót és minden eszközt amire szükséged van Java fejlesztéshez.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Fejlesztési eszközök**: `javac` fordító, `javadoc` dokumentáció generátor
- **Futtatási környezet**: JRE és JVM benne van
- **Debugging és profiling**: `jdb`, `jconsole`, `jvisualvm` eszközök

</div>

<div class="runnable-model">

**Runnable mental model**
```bash
# JDK tartalmazza ezeket az eszközöket:
javac HelloWorld.java    # Fordítás
java HelloWorld          # Futtatás
javadoc *.java           # Dokumentáció
jar cf app.jar *.class   # JAR készítés
```
*Figyeld meg: a JDK "all-in-one" csomag - mindent tartalmaz ami Java fejlesztéshez kell.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „A JDK csak fejlesztéshez kell" → Production build scriptek is használják a javac-ot
- „Minden Java verzióhoz új JDK kell" → Backward compatibility biztosított
- „OpenJDK és Oracle JDK között nagy különbség van" → Java 11-től gyakorlatilag azonosak

</div>
</details>

</div>

<div class="concept-section tools">

<details>
<summary>🧰 <strong>JDK eszközök áttekintés</strong></summary>

<div>

`javac`, `java`, `javadoc`, `jar`, `jdb`, `jconsole`, `jstack`, `jmap`, `keytool`

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Compiler (javac)` · `Runtime (JRE)` · `Documentation (javadoc)` · `Packager (jar)` · `Debugger (jdb)`

</div>

### JRE (Java Runtime Environment) {#jre-java-runtime-environment}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A JRE olyan, mint egy motor autóban: futtatja a Java programokat, de nem tudod vele új autót építeni (fejleszteni).*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Csak futtatás**: nincs benne fordító, csak a JVM és alapkönyvtárak
- **Kisebb méret**: fejlesztői eszközök nélkül
- **Production környezet**: szervereken gyakran csak JRE kell

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Ez futtatható JRE-vel
public class SimpleApp {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
```
*Figyeld meg: a .java fájlt már le kell fordítani JDK-val, a JRE csak a .class fájlt futtatja.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek</strong></summary>

<div>

- „JRE-vel lehet fejleszteni is" → Csak futtatás, nincs javac compiler
- „JRE kisebb mint JVM" → JRE tartalmazza a JVM-et + könyvtárakat
- „Java 9+ után nincs JRE" → Modularizáció miatt jlink-kel custom runtime készíthető

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`JVM` · `Core Libraries` · `Class Loader` · `Runtime APIs`

</div>

### Bytecode {#bytecode}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A bytecode olyan, mint assembly kód, csak platform-független: köztes nyelv a Java és gépi kód között.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Platform függetlenség**: ugyanaz a bytecode bármilyen JVM-en fut
- **Optimalizálhatóság**: JVM futásidőben optimalizálhatja
- **Biztonság**: bytecode verification lehetséges

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Java forráskód
int x = 42;
System.out.println(x);

// Bytecode instrukciók:
// iconst_42      // Push 42 onto stack
// istore_1       // Store in local variable 1
// getstatic      // Get System.out reference
// iload_1        // Load variable 1
// invokevirtual  // Call println method
```
*Figyeld meg: a bytecode stack-alapú, minden művelet a stack-en történik.*

</div>

<div class="concept-section tools">

<details>
<summary>🧰 <strong>Kapcsolódó eszközök</strong></summary>

<div>

`javap -c` - bytecode disassembler, `javap -v` - verbose output, `ASM` - bytecode manipulation

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Java Source` · `javac Compiler` · `Class Files` · `JVM Interpreter` · `JIT Compiler`

</div>

### Garbage Collector {#garbage-collector}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A GC olyan, mint egy automatikus takarítószolgálat: folyamatosan figyeli a memóriát és eltakarítja a már nem használt objektumokat.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Automatikus memóriakezelés**: nem kell manuálisan free()-zni
- **Memory leak védelem**: elkerüli a memória túlcsordulást
- **Performance optimalizáció**: különböző algoritmusok különböző igényekhez

</div>

<div class="runnable-model">

**Runnable mental model**
```java
String str1 = new String("Hello");  // Objektum létrehozva
String str2 = new String("World");  // Másik objektum
str1 = null;                        // "Hello" elérhetetlen lesz

// GC később automatikusan felszabadítja a "Hello" objektumot
System.gc(); // Kérés a GC-nek (nem garantált)
```
*Figyeld meg: ha egy objektumra nincs referencia, a GC kandidát lesz.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek</strong></summary>

<div>

- „A `System.gc()` azonnal futtatja a GC-t" → Csak kérés, nincs garancia
- „A GC mindig pauseol" → Modern GC-k (G1, ZGC) low-latency-t biztosítanak
- „A memória mindig felszabadul" → Memory leak-ek lehetségesek (pl. static collections)

</div>
</details>

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Performance tippek</strong></summary>

<div>

- **Object pooling** hot path-on nagy objektumokhoz
- **Weak/Soft references** cache-eknél
- **Escape analysis** segíti a stack allocation-t

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Heap Memory` · `Mark & Sweep` · `G1GC` · `ZGC` · `Memory Leaks` · `Weak References`

</div>

### Class {#class}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A Class olyan, mint egy építési terv: meghatározza, hogy milyen adatok és funkciók lesznek egy objektumban.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Object template**: minden objektum egy osztály alapján jön létre
- **Encapsulation**: adatok és metódusok egy helyen
- **Code reusability**: egy osztályból sok objektum készíthető

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Class = sablon/terv
public class BankAccount {
    private double balance;           // Adatok (fields)
    
    public void deposit(double amount) { // Funkciók (methods)
        this.balance += amount;
    }
}

// Objektumok = konkrét példányok
BankAccount account1 = new BankAccount();
BankAccount account2 = new BankAccount();
```
*Figyeld meg: egy osztályból több független objektum készíthető.*

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Performance szempontok</strong></summary>

<div>

- **Class loading**: első használatkor töltődik be lazy módon
- **Method dispatch**: virtual method call overhead vs static
- **Object creation**: constructor chain végrehajtás költsége

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Class vs Object különbség összekeverése
- Static context és instance context keveredése
- Constructor chaining és super() hívás szabályai

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Fields` · `Methods` · `Constructors` · `Objects` · `Instances` · `Encapsulation`

</div>

### Interface {#interface}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*Az Interface olyan, mint egy szerződés: meghatározza mit kell csinálni, de nem azt, hogy hogyan.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Contract definition**: specifikálja a viselkedést implementáció nélkül
- **Multiple inheritance**: Java-ban egy osztály több interface-t is implementálhat
- **Loose coupling**: függőségek interface-eken keresztül

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Interface = szerződés
public interface Drawable {
    void draw();  // Mit kell csinálni
    
    default void print() {  // Java 8+ default method
        System.out.println("Printing...");
    }
}

// Implementation = hogyan csináljuk
public class Circle implements Drawable {
    public void draw() {
        System.out.println("Drawing circle");
    }
}
```
*Figyeld meg: az interface csak "mit", az implementáció a "hogyan".*

</div>

<div class="version-badges">
<span class="version-badge">Java 8</span>
<span class="version-badge">Default Methods</span>
</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek</strong></summary>

<div>

- „Interface nem lehet metódus implementáció" → Java 8+ default és static metódusok
- „Interface változók automatikusan private" → Valójában public static final
- „Functional interface bármennyi metódust tartalmazhat" → Pontosan 1 abstract metódus kell

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Abstract class vs Interface különbségek pontos felsorolása
- Diamond problem megoldása default method-okkal
- Marker interface koncepció (Serializable, Cloneable)

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Abstract Methods` · `Default Methods` · `Static Methods` · `Multiple Inheritance` · `Contract`

</div>

### Package {#package}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A Package olyan, mint egy mappa rendszer: logikusan csoportosítja a kapcsolódó osztályokat és elkerüli a névütközéseket.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Namespace**: elkerüli a névütközéseket (pl. két `User` osztály)
- **Access control**: package-private láthatóság
- **Organization**: logikus struktúra nagy projektekben

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// com/example/model/User.java
package com.example.model;
public class User { }

// com/example/service/UserService.java  
package com.example.service;
import com.example.model.User;  // Import kell!

public class UserService {
    public void process(User user) { }
}
```
*Figyeld meg: a package név tükrözi a könyvtárszerkezetet.*

</div>

<div class="concept-section tools">

<details>
<summary>🧰 <strong>Package kezelési eszközök</strong></summary>

<div>

`package-info.java`, `module-info.java` (Java 9+), Maven/Gradle dependency management

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Package-private vs protected access modifier különbség
- Import static vs regular import használata
- Package naming conventions (reverse domain)

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Namespace` · `Import Statements` · `Access Modifiers` · `Directory Structure` · `Classpath`

</div>

### Exception {#exception}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*Az Exception olyan, mint egy vészhelyzeti protokoll: strukturált módon kezeli a váratlan szituációkat.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Error handling**: strukturált hibakezelés try-catch-csel
- **Program stability**: nem crashel a program hibánál
- **Two types**: checked (compile-time) és unchecked (runtime) exceptions

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Checked Exception - kötelező kezelni
public void readFile(String filename) throws IOException {
    FileReader file = new FileReader(filename);
}

// Unchecked Exception - runtime hiba
public void divide(int a, int b) {
    if (b == 0) {
        throw new IllegalArgumentException("Division by zero");
    }
}
```
*Figyeld meg: checked exception-t a fordító kényszerít kezelni.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek</strong></summary>

<div>

- „Exception-ök lassúak" → Csak a stack trace generálás drága
- „Minden hibát exception-nal kell kezelni" → Return codes is valid megoldás
- „RuntimeException nem kell kezelni" → De lehet, ha akarod

</div>
</details>

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Performance tippek</strong></summary>

<div>

- **Stack trace költség**: fillInStackTrace() override-olható
- **Exception pooling**: gyakori exception-öket cache-elni lehet
- **Control flow**: exception-t ne használj normál vezérlésre

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Checked vs unchecked exception hierarchy pontos ismerete
- Try-with-resources vs finally block különbségek
- Exception suppression mechanizmus Java 7+

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Try-Catch` · `Finally Block` · `Checked Exceptions` · `RuntimeException` · `Stack Trace`

</div>

### Collections Framework {#collections-framework}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A Collections olyan, mint egy eszköztár: különböző adatstruktúrák (List, Set, Map) egységes interface-szel.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Unified interface**: ugyanúgy használhatod a különböző implementációkat
- **Built-in algorithms**: sorting, searching, shuffling beépítve
- **Performance**: minden collection-nek megvan a saját erőssége

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// List - ordered, allows duplicates
List<String> names = new ArrayList<>();
names.add("Anna");
names.add("Anna");  // Duplicate OK

// Set - unique elements only  
Set<String> unique = new HashSet<>(names);  // [Anna]

// Map - key-value pairs
Map<String, Integer> ages = new HashMap<>();
ages.put("Anna", 25);
```
*Figyeld meg: minden collection más-más viselkedésű, de hasonló API.*

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Performance összehasonlítás</strong></summary>

<div>

- **ArrayList**: O(1) random access, O(n) insertion
- **LinkedList**: O(1) insertion, O(n) random access  
- **HashMap**: O(1) average lookup, O(n) worst case
- **TreeMap**: O(log n) lookup, sorted order

</div>
</details>

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek</strong></summary>

<div>

- „LinkedList mindig gyorsabb insertion-nél" → ArrayList gyakran jobb cache locality miatt
- „HashMap thread-safe" → ConcurrentHashMap kell concurrent használathoz
- „TreeSet/TreeMap gyorsabb mint HashSet/HashMap" → Csak sorted access-nél előnyös

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Collection hierarchy pontos ismerete (Collection, List, Set, Map)
- Fail-fast vs fail-safe iterator különbség
- Load factor hatása HashMap performance-re

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`List` · `Set` · `Map` · `ArrayList` · `HashMap` · `TreeSet` · `Algorithms`

</div>

### Thread {#thread}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A Thread olyan, mint párhuzamos munkavégzés: több feladat egyszerre, de figyelni kell az összehangolásra.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Concurrency**: több feladat egyidejű végrehajtása
- **Performance**: CPU magok kihasználása  
- **Responsiveness**: UI nem fagy be hosszú műveleteknél

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Thread létrehozása lambda-val
Thread worker = new Thread(() -> {
    for (int i = 0; i < 5; i++) {
        System.out.println("Worker: " + i);
        Thread.sleep(1000);  // 1 sec delay
    }
});

worker.start();  // Indítás
System.out.println("Main continues...");
```
*Figyeld meg: a main thread tovább fut, a worker thread párhuzamosan dolgozik.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Thread safety buktatók</strong></summary>

<div>

- **Race condition**: több thread ugyanazt az adatot módosítja
- **Deadlock**: két thread egymásra vár végtelen ciklusban
- **Synchronized overhead**: minden sync művelet költsége van

</div>
</details>

</div>

<div class="concept-section tools">

<details>
<summary>🧰 <strong>Concurrency eszközök</strong></summary>

<div>

`java.util.concurrent` package, `ExecutorService`, `CountDownLatch`, `Semaphore`, `CyclicBarrier`

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Thread lifecycle states pontos ismerete
- Volatile vs synchronized különbség
- Producer-consumer pattern implementation

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Runnable` · `Synchronized` · `Volatile` · `Atomic Classes` · `Thread Pool` · `CompletableFuture`

</div>

### Stream API {#stream-api}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A Stream API olyan, mint egy assembly line: adatok folynak rajta keresztül és minden állomáson átalakítódnak.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Functional programming**: deklaratív stílus imperatív helyett
- **Lazy evaluation**: műveletek csak terminal operation-nél hajtódnak végre
- **Parallel processing**: könnyű párhuzamosítás `.parallel()` hívással

</div>

<div class="runnable-model">

**Runnable mental model**
```java
List<String> names = Arrays.asList("Anna", "Béla", "Cecil");

// Functional pipeline
List<String> result = names.stream()
    .filter(name -> name.startsWith("A"))  // Szűrés
    .map(String::toUpperCase)               // Átalakítás
    .sorted()                               // Rendezés
    .collect(Collectors.toList());          // Gyűjtés

// Result: [ANNA]
```
*Figyeld meg: a műveletek lazy-k, csak a `.collect()` triggeri a végrehajtást.*

</div>

<div class="version-badges">
<span class="version-badge">Java 8</span>
<span class="version-badge">Functional</span>
</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Performance tippek</strong></summary>

<div>

- **Parallel streams**: nagy adathalmazoknál `.parallelStream()`
- **Primitive streams**: `IntStream`, `LongStream` autoboxing elkerülésére
- **Short-circuit operations**: `.findFirst()`, `.anyMatch()` korán kilépnek

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) Mi a különbség intermediate és terminal operation között?  
<details><summary>Válasz mutatása</summary>
Intermediate: lazy, stream-et ad vissza (filter, map). Terminal: eager, eredményt ad vissza (collect, forEach).
</details>

2) Mikor érdemes parallel stream-et használni?  
<details><summary>Válasz mutatása</summary>
Nagy adathalmaz (1000+ elem), CPU-intensive művelet, független elemek.
</details>

3) Mit jelent a lazy evaluation?  
<details><summary>Válasz mutatása</summary>
A műveletek csak terminal operation híváskor hajtódnak végre, addig csak pipeline épül.
</details>

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Lambda` · `Method References` · `Collectors` · `Optional` · `Parallel Streams` · `Lazy Evaluation`

</div>

### OOP Alapelvek {#oop-alapelvek}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*Az OOP alapelvek olyan, mint egy jól szervezett vállalat: mindenki tudja a saját feladatát (encapsulation), vannak hierarchiák (inheritance), és ugyanaz a szerepkör különböző emberek által különbözőképp betölthető (polymorphism).*

</div>

<div class="concept-section why-important">

💡 **Miért számítanak?**
- **Maintainability**: tisztább, karbantarthatóbb kód
- **Reusability**: kód újrafelhasználás öröklődéssel
- **Flexibility**: polimorfizmus révén könnyen bővíthető rendszer

</div>

#### Encapsulation (Enkapszuláció)
Az objektum belső állapotának elrejtése és csak definiált interfészeken keresztüli hozzáférés biztosítása.

<div class="runnable-model">

**Runnable mental model**
```java
public class BankAccount {
    private double balance; // private - nem érhető el kívülről

    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
        } else {
            throw new IllegalArgumentException("Amount must be positive");
        }
    }

    public double getBalance() {
        return balance; // controlled access
    }
}
```
*Figyeld meg: a balance mező private, csak a definiált metódusokon keresztül érhető el, így biztosítva az adatok integritását.*

</div>

#### Inheritance (Öröklődés)
Új osztályok létrehozása meglévő osztályok alapján, ahol a gyermek osztály örökli a szülő tulajdonságait és metódusait.

<div class="runnable-model">

**Runnable mental model**
```java
public class Vehicle {
    protected String brand;
    protected int year;

    public void start() {
        System.out.println("Vehicle started");
    }
}

public class Car extends Vehicle {
    private int doors;

    public Car(String brand, int year, int doors) {
        this.brand = brand; // örökölt mező
        this.year = year;   // örökölt mező
        this.doors = doors;
    }

    @Override
    public void start() {
        System.out.println("Car engine started");
    }
}
```
*Figyeld meg: a Car osztály örökli a Vehicle tulajdonságait és felüldefiniálhatja a metódusokat.*

</div>

#### Polymorphism (Polimorfizmus)
Ugyanazon interfész különböző implementációi, ahol futásidőben dől el, melyik konkrét implementáció hívódik meg.

<div class="runnable-model">

**Runnable mental model**
```java
public abstract class Shape {
    public abstract double getArea();
}

public class Circle extends Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public double getArea() {
        return Math.PI * radius * radius;
    }
}

public class Rectangle extends Shape {
    private double width, height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public double getArea() {
        return width * height;
    }
}

// Polimorfikus használat
public class ShapeCalculator {
    public void printArea(Shape shape) {
        System.out.println("Area: " + shape.getArea()); // futásidőben dől el melyik getArea() hívódik
    }
}
```
*Figyeld meg: ugyanaz a `Shape` referencia különböző típusú objektumokra mutathat, és futásidőben dől el, melyik implementáció hívódik.*

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Encapsulation` · `Inheritance` · `Method Overriding` · `Abstract Classes` · `Interfaces` · `Runtime Binding`

</div>

### SOLID Alapelvek {#solid-alapelvek}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A SOLID olyan, mint az építészet alapszabályai: ha betartod őket, stabil, könnyen bővíthető épületet (kódot) kapsz, ha nem, akkor összeomlik az első nagyobb változtatásnál.*

</div>

<div class="concept-section why-important">

💡 **Miért számítanak?**
- **Clean Architecture**: jól strukturált, karbantartható kódbázis
- **Testability**: könnyebb unit testing
- **Extensibility**: új funkciók hozzáadása meglévő kód módosítása nélkül

</div>

Az objektumorientált tervezés öt alapelve, amely tisztább, karbantarthatóbb kódot eredményez.

#### Single Responsibility Principle (SRP)
Egy osztálynak csak egy oka legyen a változásra - csak egy felelőssége legyen.

**Példa:**
```java
// ROSSZ - több felelősség
class User {
    private String name;
    private String email;

    public void save() { /* adatbázis művelet */ }
    public void sendEmail() { /* email küldés */ }
    public String generateReport() { /* jelentés generálás */ }
}

// JÓ - szétbontott felelősségek
class User {
    private String name;
    private String email;
    // getters/setters
}

class UserRepository {
    public void save(User user) { /* adatbázis művelet */ }
}

class EmailService {
    public void sendEmail(User user, String message) { /* email küldés */ }
}

class UserReportGenerator {
    public String generateReport(User user) { /* jelentés generálás */ }
}
```

#### Open/Closed Principle (OCP)
Osztályok legyenek nyitottak a bővítésre, de zártak a módosításra.

**Példa:**
```java
// Extensible design
abstract class DiscountCalculator {
    public abstract double calculate(double amount);
}

class PercentageDiscount extends DiscountCalculator {
    private double percentage;

    @Override
    public double calculate(double amount) {
        return amount * (1 - percentage / 100);
    }
}

class FixedAmountDiscount extends DiscountCalculator {
    private double discount;

    @Override
    public double calculate(double amount) {
        return Math.max(0, amount - discount);
    }
}
```

#### Liskov Substitution Principle (LSP)
Leszármazott osztályok helyettesíthetők legyenek az ősosztállyal anélkül, hogy megváltoztatná a program helyességét.

**Példa:**
```java
// LSP betartása
class Rectangle {
    protected int width, height;

    public void setWidth(int width) { this.width = width; }
    public void setHeight(int height) { this.height = height; }
    public int getArea() { return width * height; }
}

// ROSSZ - sérti LSP-t
class Square extends Rectangle {
    @Override
    public void setWidth(int width) {
        this.width = this.height = width; // megváltoztatja a viselkedést!
    }
}

// JÓ - közös interfész
interface Shape {
    int getArea();
}

class Rectangle implements Shape {
    private int width, height;
    // implementation
}

class Square implements Shape {
    private int side;
    // implementation
}
```

#### Interface Segregation Principle (ISP)
Kliens ne függjön olyan metódusoktól, amelyeket nem használ.

**Példa:**
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
    // implementálja mindhárom interfészt
}

class Robot implements Workable {
    // csak a releváns interfészt implementálja
}
```

#### Dependency Inversion Principle (DIP)
Magas szintű modulok ne függjenek alacsony szintűektől. Mindketten az absztrakciótól függjenek.

**Példa:**
```java
// ROSSZ - közvetlen függőség
class EmailService {
    public void sendEmail(String message) { /* email logic */ }
}

class NotificationManager {
    private EmailService emailService = new EmailService(); // tight coupling

    public void notify(String message) {
        emailService.sendEmail(message);
    }
}

// JÓ - dependency injection
interface NotificationService {
    void send(String message);
}

class EmailService implements NotificationService {
    @Override
    public void send(String message) { /* email logic */ }
}

class SMSService implements NotificationService {
    @Override
    public void send(String message) { /* SMS logic */ }
}

class NotificationManager {
    private NotificationService notificationService;

    public NotificationManager(NotificationService notificationService) {
        this.notificationService = notificationService; // dependency injection
    }

    public void notify(String message) {
        notificationService.send(message);
    }
}
```

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Single Responsibility` · `Open/Closed` · `Liskov Substitution` · `Interface Segregation` · `Dependency Inversion` · `Clean Architecture`

</div>

### Equals és HashCode {#equals-es-hashcode}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*Az equals és hashCode olyan, mint egy személyazonosító: ha két ember ugyanannak számít (equals), akkor az azonosítójuk (hashCode) is ugyanaz kell legyen.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **HashMap működés**: konzisztens hash-elés kulcsfontosságú
- **Collection behavior**: HashSet, HashMap helyes működése
- **Contract compliance**: Object.equals() és Object.hashCode() szerződés betartása

</div>

Ha felüldefinijáljuk az equals() metódust, kötelező a hashCode() metódust is felüldefinijálni, hogy konzisztensek legyenek.

<div class="runnable-model">

**Runnable mental model**
```java
// HIBÁS IMPLEMENTÁCIÓ
public class Person {
    private String name;
    private int age;

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Person person = (Person) obj;
        return Objects.equals(name, person.name);  // Csak név alapján
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);  // HIBA: név + kor alapján
    }
}

// HELYES IMPLEMENTÁCIÓ
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
        return Objects.hash(name, age);  // Mindkét mező
    }
}
```
*Figyeld meg: az equals() és hashCode() szabálya: ha két objektum equals()-el egyenlő, akkor hashCode()-uk is egyenlő kell legyen.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori hibák</strong></summary>

<div>

- „Elég csak equals()-t implementálni" → hashCode() nélkül HashMap nem működik jól
- „hashCode() mindig egyedi legyen" → Nem szükséges, collision OK
- „equals() és hashCode() alapján ugyanazok a mezők" → Ez a helyes megközelítés

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Object Contract` · `HashMap` · `HashSet` · `Objects.hash()` · `Collection Framework`

</div>

### Lambda Expressions {#lambda-expressions}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A Lambda olyan, mint egy rövidített recept: minden lényeges lépés benne van, de a felesleges szöveg (boilerplate) nélkül.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Concise syntax**: kevesebb kód, olvashatóbb szintaxis
- **Functional programming**: deklaratív programozási stílus
- **Stream API integration**: természetes együttműködés a Stream API-val

</div>

Rövid névtelen funkciók, amelyek főleg funkcionális interfészekkel és Stream API-val használatosak Java 8-tól.

<div class="runnable-model">

**Runnable mental model**
```java
import java.util.*;
import java.util.function.*;

public class LambdaExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Anna", "Béla", "Cecil");

        // Régi módszer - Anonymous Inner Class
        names.sort(new Comparator<String>() {
            @Override
            public int compare(String a, String b) {
                return a.compareTo(b);
            }
        });

        // Lambda expression
        names.sort((a, b) -> a.compareTo(b));

        // Method reference (még rövidebb)
        names.sort(String::compareTo);

        // Funkcionális interfészek használata
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
*Figyeld meg: a lambda kifejezések tömör szintaxist biztosítanak funkcionális interfészek implementálásához.*

</div>

<div class="version-badges">
<span class="version-badge">Java 8</span>
<span class="version-badge">Functional</span>
</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) Milyen functional interface-eket ismersz?  
<details><summary>Válasz mutatása</summary>
Predicate&lt;T&gt;, Function&lt;T,R&gt;, Consumer&lt;T&gt;, Supplier&lt;T&gt;, Runnable, Comparator&lt;T&gt;.
</details>

2) Mi a method reference szintaxis?  
<details><summary>Válasz mutatása</summary>
Static: Class::method, Instance: object::method, Constructor: Class::new.
</details>

3) Mikor használj lambda vs anonymous class?  
<details><summary>Válasz mutatása</summary>
Lambda: functional interface, rövid logika. Anonymous: több metódus, komplex logika.
</details>

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Functional interface definíció pontos megfogalmazása
- Closure és variable capture szabályai (effectively final)
- Lambda vs method reference performance különbségek

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Functional Interfaces` · `Method References` · `Stream API` · `Predicates` · `Functions` · `Consumers`

</div>

### Generics {#generics}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A Generics olyan, mint egy univerzális doboz sablon: előre megmondod milyen típust fogsz beletenni, így a fordító ellenőrizni tudja, hogy mindent jól csinálsz.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Type safety**: fordítási idejű típusellenőrzés
- **No casting**: explicit típuskonverzió eliminálása
- **Code reusability**: ugyanaz a kód különböző típusokkal

</div>

Típusparaméterek használata az osztályokban és metódusokban, amely fordítási idejű típusbiztonságot és kód újrafelhasználhatóságot biztosít.

<div class="runnable-model">

**Runnable mental model**
```java
// Generikus osztály
public class Box<T> {
    private T content;

    public void put(T item) {
        this.content = item;
    }

    public T get() {
        return content;
    }
}

// Generikus metódus
public class Utility {
    public static <T> void swap(T[] array, int i, int j) {
        T temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// Használat
public class GenericsExample {
    public static void main(String[] args) {
        Box<String> stringBox = new Box<>();
        stringBox.put("Hello");
        String value = stringBox.get(); // No casting needed!

        Box<Integer> intBox = new Box<>();
        intBox.put(42);
        // intBox.put("Hello"); // Compile error!

        String[] names = {"Anna", "Béla"};
        Utility.swap(names, 0, 1);
    }
}
```
*Figyeld meg: a generics típusbiztonságot nyújtanak fordítási időben és eliminálják a explicit casting szükségességét.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek</strong></summary>

<div>

- „Generics futásidőben is léteznek" → Type erasure miatt futáskor eltűnnek
- „Primitív típusokat használhatok" → Csak objektum típusok, autoboxing szükséges
- „Wildcard-ok bonyolítják a kódot" → `<? extends T>` és `<? super T>` hasznos flexibilitást ad

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Type erasure mechanizmus magyarázata
- PECS principle (Producer Extends, Consumer Super)
- Generic method vs generic class különbség

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Type Parameters` · `Wildcards` · `Type Erasure` · `Bounded Types` · `Collections Framework`

</div>

### Immutability {#immutability}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*Az immutable objektum olyan, mint egy lezárt időkapszula: létrehozás után nem módosítható, de másolatot készíthetsz változtatásokkal.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Thread safety**: immutable objektumok automatikusan thread-safe-ek
- **Cacheable**: HashMap kulcsként biztonságosan használhatóak
- **Predictable behavior**: nem változhatnak váratlanul

</div>

Az immutable objektumok olyan objektumok, amelyek létrehozás után nem változtathatók meg. Thread-safe-ek és hashelhetőek.

<div class="runnable-model">

**Runnable mental model**
```java
// Immutable osztály példa
public final class Person {
    private final String name;
    private final int age;
    private final List<String> hobbies;

    public Person(String name, int age, List<String> hobbies) {
        this.name = name;
        this.age = age;
        // Defensive copy - ne adjuk ki az eredeti referenciát
        this.hobbies = Collections.unmodifiableList(new ArrayList<>(hobbies));
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public List<String> getHobbies() {
        return hobbies; // már unmodifiable
    }

    // Immutable update pattern
    public Person withAge(int newAge) {
        return new Person(this.name, newAge, new ArrayList<>(this.hobbies));
    }
}

// String is immutable
String str = "Hello";
String upper = str.toUpperCase(); // új objektum, str változatlan
System.out.println(str);   // "Hello"
System.out.println(upper); // "HELLO"
```
*Figyeld meg: az immutable objektumok biztonságosak concurrent környezetben és könnyen hashelhetőek HashMap kulcsként.*

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Performance szempontok</strong></summary>

<div>

- **Builder pattern** komplex immutable objektumokhoz
- **String interning** memória optimalizáláshoz
- **Copy-on-write** collections nagy adatstruktúrákhoz

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Defensive copying koncepció és mikor szükséges
- Immutable vs unmodifiable collection különbség
- Builder pattern implementálás immutable objektumokhoz

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Final Fields` · `Defensive Copy` · `Builder Pattern` · `Thread Safety` · `String Pool`

</div>

### Autoboxing és Unboxing {#autoboxing-es-unboxing}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*Az autoboxing/unboxing olyan, mint automatikus csomagolás: a primitív értékek automatikusan "becsomagolódnak" objektumba és kicsomagolódnak vissza.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Collections compatibility**: primitívek használata generikus collection-ökben
- **Convenience**: kevesebb explicit konverzió kódban
- **Performance impact**: tudni kell mikor történik allokáció

</div>

Primitív típusok automatikus konverziója wrapper osztályokká (autoboxing) és vissza (unboxing).

<div class="runnable-model">

**Runnable mental model**
```java
public class AutoboxingExample {
    public static void main(String[] args) {
        // Autoboxing - primitív -> wrapper
        int primitive = 42;
        Integer wrapper = primitive;  // Automatically: Integer.valueOf(primitive)

        // Unboxing - wrapper -> primitív
        Integer wrapperInt = 100;
        int backToPrimitive = wrapperInt;  // Automatically: wrapperInt.intValue()

        // Collections csak objektumokat tárolhatnak
        List<Integer> numbers = new ArrayList<>();
        numbers.add(1);        // autoboxing: numbers.add(Integer.valueOf(1))
        numbers.add(2);
        numbers.add(3);

        int sum = 0;
        for (Integer num : numbers) {
            sum += num;        // unboxing: sum += num.intValue()
        }

        // Vigyázat: null pointer exception lehetősége
        Integer nullWrapper = null;
        // int danger = nullWrapper;  // NullPointerException!
    }
}
```
*Figyeld meg: az autoboxing/unboxing kényelmes, de figyelni kell a null értékekre és a teljesítmény hatásokra.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Teljesítmény buktatók</strong></summary>

<div>

- **Excessive boxing**: ciklusokban sok allokáció
- **Integer cache**: -128 és 127 között cache-elt objektumok
- **Null safety**: wrapper objektumok lehetnek null

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Integer cache tartomány pontos ismerete (-128 to 127)
- == vs equals wrapper objektumoknál
- Performance impact ciklusokban való boxing/unboxing

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Wrapper Classes` · `Collections Framework` · `Generics` · `Integer Cache` · `NullPointerException`

</div>

### Access Modifiers {#access-modifiers}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*Az access modifier-ek olyan, mint a ház helyiségei: public=előszoba (mindenki), private=hálószoba (csak te), protected=családi szoba (család), default=szomszédok.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Encapsulation control**: pontosan szabályozod, ki mit érhet el
- **API design**: világos interfészt biztosítasz klienseknek
- **Package organization**: logikai csoportosítás és hozzáférés-szabályozás

</div>

Java-ban négy szintű láthatóság van: public, protected, package-private (default), és private.

<div class="runnable-model">

**Runnable mental model**
```java
package com.example;

public class AccessExample {
    public String publicField = "Mindenki látja";           // Minden osztály
    protected String protectedField = "Csomag + leszármazott"; // Package + subclass
    String packageField = "Csak csomag";                    // Csak ugyanazon package
    private String privateField = "Csak én";                // Csak ez az osztály
    
    public void publicMethod() { }      // Bárhonnan hívható
    protected void protectedMethod() { } // Package + inheritance
    void packageMethod() { }            // Package szintű
    private void privateMethod() { }     // Csak belső használatra
}
```
*Figyeld meg: minden modifier különböző szintű hozzáférést biztosít az encapsulation érdekében.*

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Protected vs package-private különbség pontos ismerete
- Access modifier örökoldési szabályai
- Default constructor access modifier viselkedése

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Encapsulation` · `Package` · `Inheritance` · `API Design` · `Information Hiding`

</div>

### Final Keyword {#final-keyword}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A final olyan, mint egy "Ne nyúlj hozzá!" tábla: megakadályozza a változtatást osztályokon, metódusokon és változókon.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Immutability**: final változók nem módosíthatók
- **Design intent**: jelzi, hogy valami nem változtatható
- **Performance**: compiler optimalizációk lehetőségei

</div>

A final kulcsszó megakadályozza az öröklődést, felüldefiniálást vagy újraértékadást.

<div class="runnable-model">

**Runnable mental model**
```java
// Final class - nem örökölhető
public final class String {
    // Implementation
}

// Final method - nem írható felül
public class Parent {
    public final void criticalMethod() {
        System.out.println("Ez nem változtatható");
    }
}

// Final variables
public class FinalExample {
    private final int constantValue = 42;        // Compile-time konstans
    private final List<String> finalList;       // Reference final, tartalom nem
    
    public FinalExample() {
        finalList = new ArrayList<>();           // Kötelező inicializálni
    }
    
    public void demonstrate() {
        // constantValue = 50;                   // Compile error
        finalList.add("item");                  // OK - lista tartalma változhat
        // finalList = new ArrayList<>();       // Compile error - referencia final
        
        final int localConstant = 100;          // Local final variable
        // localConstant = 200;                 // Compile error
    }
}
```
*Figyeld meg: final különbözőképpen viselkedik osztályoknál, metódusoknál és változóknál.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek</strong></summary>

<div>

- „Final objektum immutable" → Csak a referencia final, a tartalom változhat
- „Final metódus gyorsabb" → Modern JVM-ek már nem jelentős különbség
- „Final class mindig rossz design" → String, Integer és sok core class final

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Immutability` · `Constants` · `Inheritance Control` · `Compiler Optimization` · `Thread Safety`

</div>

### Static Keyword {#static-keyword}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A static olyan, mint egy osztály "közös tulajdona": minden példány ugyanazt a static elemet látja, és nincs szükség objektumra a használatához.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Class-level functionality**: objektumpéldány nélküli használat
- **Memory efficiency**: egy példány az összes objektumhoz
- **Utility methods**: Math.max(), Collections.sort() típusú segédfunkciók

</div>

Static elemek az osztályhoz tartoznak, nem az objektumpéldányokhoz.

<div class="runnable-model">

**Runnable mental model**
```java
public class StaticExample {
    private static int instanceCount = 0;        // Osztályszintű változó
    private static final String CONSTANT = "FIXED"; // Konstans
    
    private String name;                         // Instance változó
    
    // Static block - osztály betöltésekor fut
    static {
        System.out.println("Osztály betöltve");
        instanceCount = 0;
    }
    
    public StaticExample(String name) {
        this.name = name;
        instanceCount++;                         // Minden objektum növeli
    }
    
    // Static method - objektum nélkül hívható
    public static int getInstanceCount() {
        return instanceCount;
        // return this.name;                     // ERROR: static context
    }
    
    // Instance method
    public String getName() {
        return name + " (#" + instanceCount + ")"; // Static elérhető instance-ból
    }
    
    // Utility static method
    public static int max(int a, int b) {
        return a > b ? a : b;
    }
}

// Használat:
StaticExample.getInstanceCount();               // 0
StaticExample obj1 = new StaticExample("First"); 
StaticExample obj2 = new StaticExample("Second");
StaticExample.getInstanceCount();               // 2
int maximum = StaticExample.max(10, 20);        // 20
```
*Figyeld meg: static elemek közösek az összes objektumpéldány között és objektum nélkül is elérhetők.*

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Static method nem tud instance változót elérni
- Static block végrehajtási sorrendje
- Memory leak lehetősége static collection-ökkel

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Class Loading` · `Memory Management` · `Singleton Pattern` · `Utility Classes` · `Constants`

</div>

### This és Super Keyword {#this-super-keyword}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A `this` olyan, mint "én magam", a `super` pedig "a szüleim": explicit hivatkozás a jelenlegi objektumra vagy a szülő osztályra.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Disambiguation**: egyértelmű hivatkozás hasonló nevű változókra
- **Constructor chaining**: konstruktor láncok építése
- **Method delegation**: szülő metódusok explicit hívása

</div>

A this az aktuális objektumra, a super a szülő osztályra vonatkozik.

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
        super(name);              // Szülő konstruktor hívása
        this.nickname = nickname; // Disambiguation
    }
    
    public void setName(String name) {
        this.name = name;         // this: aktuális objektum mezője
        // super.name = name;     // Ugyanaz, mert protected
    }
    
    @Override
    public void greet() {
        super.greet();            // Szülő metódus hívása
        System.out.println("But call me " + this.nickname);
    }
    
    public void demonstrateThis() {
        this.greet();             // Explicit this (elhagyható)
        greet();                  // Implicit this
        helper(this);             // this mint paraméter
    }
    
    private void helper(Child child) {
        System.out.println("Processing: " + child.name);
    }
}
```
*Figyeld meg: this és super segítségével egyértelműen hivatkozhatunk objektumokra és szülő funkcionalitásra.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori hibák</strong></summary>

<div>

- „super() mindig első sor" → Igen, konstruktorban kötelező első statement
- „this() és super() egyszerre" → Nem lehet, csak az egyik
- „static metódusban this használható" → Nem, nincs objektum context

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Constructor Chaining` · `Method Overriding` · `Inheritance` · `Object Identity` · `Method Delegation`

</div>

### Constructor & Constructor Overloading {#constructor-overloading}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A konstruktor olyan, mint egy objektum "születési okmánya": meghatározza, hogyan jön létre egy objektum és milyen kezdeti értékekkel.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Object initialization**: objektum kezdeti állapotának beállítása
- **Flexibility**: különböző módok az objektum létrehozására
- **Validation**: objektum invariant-ok biztosítása létrehozáskor

</div>

Konstruktorok felelősek az objektumok inicializálásáért, több változatban is létrehozhatók.

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
    
    // Constructor overloading - különböző paraméterek
    public Person(String firstName, String lastName) {
        this(firstName, lastName, 0);
    }
    
    public Person(String firstName, String lastName, int age) {
        this(firstName, lastName, age, null);
    }
    
    // Master constructor - minden paramétert fogad
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

// Használat - többféle inicializálás:
Person p1 = new Person();
Person p2 = new Person("John", "Doe");
Person p3 = new Person("Jane", "Smith", 25);
Person p4 = new Person("Bob", "Johnson", 30, "bob@example.com");
Person p5 = new Person(p3);  // Copy constructor
```
*Figyeld meg: constructor chaining segítségével elkerüljük a kód duplikációt, és minden objektum validált állapotban jön létre.*

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Constructor chaining szabályai (this() első statement)
- Default constructor mikor generálódik automatikusan
- Constructor vs method különbségek (nincs return type)

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Object Initialization` · `Method Overloading` · `This Keyword` · `Validation` · `Builder Pattern`

</div>

### Method Overloading vs Method Overriding {#method-overloading-overriding}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*Overloading = ugyanaz a név, különböző "aláírás" (compile-time). Overriding = ugyanaz az aláírás, különböző implementáció (runtime).*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **API flexibility**: overloading több használati módot biztosít
- **Polymorphism**: overriding lehetővé teszi a runtime specializációt
- **Code organization**: logikusan csoportosított funkcionalitás

</div>

Két különböző technika metódusok kezelésére: overloading compile-time, overriding runtime mechanizmus.

<div class="runnable-model">

**Runnable mental model**
```java
// METHOD OVERLOADING - ugyanaz a név, különböző paraméterek
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

// METHOD OVERRIDING - szülő metódus felüldefiniálása
public abstract class Animal {
    public void sleep() {
        System.out.println("Animal sleeps");
    }
    
    public abstract void makeSound(); // Kötelező override
}

public class Dog extends Animal {
    @Override
    public void makeSound() {           // Runtime resolution
        System.out.println("Woof!");
    }
    
    @Override
    public void sleep() {               // Opcionális override
        System.out.println("Dog sleeps in kennel");
    }
}

public class Cat extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Meow!");
    }
    // sleep() nem override-olt -> szülő implementáció
}

// Használat:
Calculator calc = new Calculator();
calc.add(1, 2);           // int version
calc.add(1.5, 2.5);       // double version
calc.add("Hello", "World"); // String version

Animal dog = new Dog();
Animal cat = new Cat();
dog.makeSound();          // "Woof!" - runtime decision
cat.makeSound();          // "Meow!" - runtime decision
```
*Figyeld meg: overloading compile-time (statikus), overriding runtime (dinamikus) döntés alapján működik.*

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Overloading resolution szabályai (exact match > widening > autoboxing > varargs)
- @Override annotation kötelező volta
- Covariant return types overriding-nál

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Compile-time Binding` · `Runtime Binding` · `Polymorphism` · `Method Signature` · `Virtual Method Dispatch`

</div>

### Abstract Class {#abstract-class}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*Az abstract class olyan, mint egy félkész ház terve: van alapszerkezet és néhány kész szoba, de egyes részeket a "lakónak" kell befejezni.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Partial implementation**: közös kód + kötelező customization
- **Template method pattern**: váz algoritmus, részletek leszármazottakban
- **Code reuse**: implementáció megosztás inheritance hierarchiában

</div>

Abstract osztály nem példányosítható, tartalmazhat abstract és konkrét metódusokat is.

<div class="runnable-model">

**Runnable mental model**
```java
// Abstract class - nem példányosítható
public abstract class Vehicle {
    protected String brand;
    protected int year;
    
    // Konkrét metódus - közös implementáció
    public Vehicle(String brand, int year) {
        this.brand = brand;
        this.year = year;
    }
    
    // Konkrét metódus
    public void start() {
        System.out.println("Starting " + brand);
        engineStart();        // Template method pattern
        System.out.println("Ready to go!");
    }
    
    // Abstract metódus - kötelező implementálni
    public abstract void engineStart();
    public abstract double getFuelConsumption();
    
    // Template method - algoritmus váz
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

// Konkrét implementáció
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
*Figyeld meg: abstract class keveréke a közös implementációnak és a kötelező specializációnak.*

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Template Method Pattern` · `Inheritance` · `Polymorphism` · `Interface` · `Strategy Pattern`

</div>

### Enum {#enum}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*Az Enum olyan, mint egy előre meghatározott lista: véges számú konstans érték típusbiztos módon.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Type safety**: compile-time ellenőrzés véges értékhalmazra
- **Readability**: beszédes konstansok int helyett
- **Switch compatibility**: enum-ok switch statement-ben használhatók

</div>

Enum típusbiztos konstansok definiálására szolgál, amely implicit final és static.

<div class="runnable-model">

**Runnable mental model**
```java
// Egyszerű enum
public enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}

// Enum mezőkkel és metódusokkal
public enum Planet {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS(4.869e+24, 6.0518e6),
    EARTH(5.976e+24, 6.37814e6),
    MARS(6.421e+23, 3.3972e6);
    
    private final double mass;     // kg-ban
    private final double radius;   // méterben
    
    // Enum constructor (implicit private)
    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }
    
    public double getMass() { return mass; }
    public double getRadius() { return radius; }
    
    // Számított property
    public double surfaceGravity() {
        return 6.67300E-11 * mass / (radius * radius);
    }
}

// Enum metódusokkal és állapottal
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

// Használat:
Day today = Day.MONDAY;
switch (today) {
    case MONDAY -> System.out.println("Hétfő van");
    case FRIDAY -> System.out.println("Péntek van!");
    default -> System.out.println("Hét közepe");
}

double earthWeight = 175;
double earthMass = earthWeight / Planet.EARTH.surfaceGravity();
System.out.println("Mars weight: " + earthMass * Planet.MARS.surfaceGravity());

double result = Operation.PLUS.apply(10, 5); // 15
```
*Figyeld meg: enum-ok gazdag funkcionalitással rendelkezhetnek, nem csak egyszerű konstansok.*

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Constants` · `Type Safety` · `Switch Statements` · `Strategy Pattern` · `Singleton Pattern`

</div>

### Wrapper Classes {#wrapper-classes}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A Wrapper osztályok olyan, mint "objektum ruhák" primitív típusoknak: ugyanaz az érték, de objektum formában.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Collections compatibility**: primitívek collection-ökben tárolhatók
- **Null representation**: primitíveknek nincs null értéke
- **Utility methods**: Integer.parseInt(), Boolean.valueOf() stb.

</div>

Minden primitív típushoz tartozik egy wrapper osztály, amely objektumként reprezentálja az értéket.

<div class="runnable-model">

**Runnable mental model**
```java
public class WrapperExample {
    public static void main(String[] args) {
        // Primitívek és wrapper párok
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
        
        // Collections használat
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
*Figyeld meg: wrapper osztályok híd szerepet töltenek a primitív és objektum világok között.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori buktatók</strong></summary>

<div>

- **Integer cache**: -128 és 127 között cache-elt objektumok (== vs equals)
- **Performance**: wrapper objektumok memory overhead-del járnak
- **Null safety**: wrapper-ek null-ok lehetnek, primitívek nem

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Autoboxing` · `Collections Framework` · `Generics` · `Primitive Types` · `Type Conversion`

</div>

### Annotations {#annotations}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*Az annotációk olyan, mint kód "címkék": metadata információt adnak a fordítónak, framework-öknek vagy futtatási környezetnek.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Metadata**: kód információk formalizált módon
- **Framework integration**: Spring, JPA, JAX-RS konfiguráció
- **Code generation**: compile-time processing lehetőségek

</div>

Annotációk metadata információkat biztosítanak a kód elemeihez, amelyeket compile-time vagy runtime feldolgozhatunk.

<div class="runnable-model">

**Runnable mental model**
```java
// Built-in annotations
public class AnnotationExample {
    
    @Override                           // Compile-time check
    public String toString() {
        return "AnnotationExample";
    }
    
    @Deprecated                         // Warning generálás
    public void oldMethod() {
        System.out.println("Use newMethod() instead");
    }
    
    @SuppressWarnings("unchecked")      // Warning elnyomás
    public void unsafeMethod() {
        List raw = new ArrayList();     // Raw type warning suppressed
        raw.add("item");
    }
}

// Custom annotation definition
@Retention(RetentionPolicy.RUNTIME)     // Mikor elérhető
@Target(ElementType.METHOD)             // Hol használható
public @interface Benchmark {
    String value() default "";          // Default paraméter
    int iterations() default 1;
}

// Functional interface annotation
@FunctionalInterface
public interface Calculator {
    int calculate(int a, int b);
    
    // int anotherMethod(int x);        // ERROR: több abstract method
}

// Custom annotation használata
public class Service {
    
    @Benchmark(value = "Fast operation", iterations = 1000)
    public void fastOperation() {
        // Implementation
    }
    
    @Benchmark                          // Default értékekkel
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
*Figyeld meg: annotációk declaratív metadat szolgáltatnak compile-time és runtime feldolgozáshoz.*

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Metadata` · `Reflection` · `Framework Configuration` · `Code Generation` · `Aspect-Oriented Programming`

</div>

### Serialization {#serialization}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A serialization olyan, mint az objektumok "befagyasztása": átalakítja őket byte stream-mé, hogy később "felolvasszák" őket.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Persistence**: objektumok fájlba mentése vagy adatbázisba tárolása
- **Network communication**: objektumok küldése hálózaton keresztül
- **Caching**: objektumok ideiglenes tárolása gyorsabb hozzáférésért

</div>

Java objektumok byte stream-mé alakítása és visszaalakítása az állapot megőrzése érdekében.

<div class="runnable-model">

**Runnable mental model**
```java
import java.io.*;

// Serializable osztály
public class Person implements Serializable {
    private static final long serialVersionUID = 1L;  // Version control
    
    private String name;
    private int age;
    private transient String password;        // Nem serializable
    private static String staticField = "static"; // Nem serializable
    
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

// Serialization/Deserialization példa
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
*Figyeld meg: transient mezők nem serializable-k, és custom serialization logika implementálható.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Serialization buktatók</strong></summary>

<div>

- **Version compatibility**: serialVersionUID változásai kompatibilitási problémákat okozhatnak
- **Security risks**: arbitrary code execution lehetősége untrusted data-val
- **Performance**: Java serialization általában lassú és verbose

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Object Streams` · `Persistence` · `Network Communication` · `Transient Keyword` · `Version Control`

</div>

### Reflection API {#reflection-api}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A Reflection olyan, mint egy "kód röntgen": futásidőben megvizsgálhatod és módosíthatod az osztályok belső szerkezetét.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Framework development**: Spring, Hibernate, JUnit dinamikus működése
- **Dynamic behavior**: runtime osztály vizsgálat és módosítás
- **Testing**: private metódusok és mezők elérése unit testekben

</div>

Runtime-ban történő osztály introspekció és manipuláció lehetősége.

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
        
        // Class object megszerzése
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
        
        // Dynamic proxy example
        InvocationHandler handler = new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                System.out.println("Before method: " + method.getName());
                Object result = method.invoke(student, args);
                System.out.println("After method: " + method.getName());
                return result;
            }
        };
        
        // Create proxy
        Student proxy = (Student) Proxy.newProxyInstance(
            clazz.getClassLoader(),
            clazz.getInterfaces(),
            handler
        );
    }
}
```
*Figyeld meg: reflection lehetővé teszi a private elemek elérését és a dinamikus objektum manipulációt.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Reflection buktatók</strong></summary>

<div>

- **Performance**: reflection lassabb mint a direct method call
- **Security**: private encapsulation megkerülése
- **Maintenance**: compile-time check nélkül, refactoring során eltörhet

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Introspection` · `Dynamic Proxy` · `Framework Development` · `Annotations` · `Metaprogramming`

</div>

### Optional {#optional}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*Az Optional olyan, mint egy "biztonsági doboz": expliciten jelzi, hogy egy érték lehet null, és biztonságos módokat ad a kezelésére.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Null safety**: NullPointerException megelőzése
- **Explicit API**: method signature-ből látható, hogy lehet null return
- **Functional style**: chain-elhető operációk null-safe módon

</div>

Container objektum, amely lehet üres vagy tartalmazhat egy nem-null értéket.

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
*Figyeld meg: Optional chain-elhető operációkkal biztonságos null handling-et biztosít.*

</div>

<div class="version-badges">
<span class="version-badge">Java 8</span>
<span class="version-badge">Functional</span>
</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori anti-pattern-ek</strong></summary>

<div>

- **Optional.get() without check**: ugyanolyan veszélyes mint a null
- **Optional overuse**: ne használj Optional-t minden nullable érték helyett
- **Optional as field**: Optional nem arra való, hogy instance variable legyen

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Null Safety` · `Functional Programming` · `Stream API` · `Method Chaining` · `Defensive Programming`

</div>

### Record {#record}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A Record olyan, mint egy "data class on steroids": automatikusan generálja az equals, hashCode, toString és gettereket immutable adatokhoz.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Boilerplate reduction**: kevesebb kód ugyanazért a funkcionalitásért
- **Immutability**: automatikusan immutable data carrier
- **Pattern matching**: Java 17+ pattern matching támogatás

</div>

Compact syntax immutable data classes létrehozására Java 14-től.

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
        
        // Pattern matching (Java 17+)
        // if (success instanceof Result(var value, var isSuccess, var msg)) {
        //     System.out.println("Result: " + value);
        // }
    }
}
```
*Figyeld meg: Record drastikusan csökkenti a boilerplate kódot immutable data classes esetén.*

</div>

<div class="version-badges">
<span class="version-badge">Java 14</span>
<span class="version-badge">Preview</span>
<span class="version-badge">Java 16</span>
<span class="version-badge">Final</span>
</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Immutability` · `Data Classes` · `Pattern Matching` · `Value Objects` · `Compact Constructor`

</div>

### Modules (Java 9+) {#modules-java9}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A modulok olyan, mint "szoftver csomagok": meghatározzák, mit exportálnak és mit igényelnek más moduloktól.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Encapsulation**: package szintű encapsulation helyett module szintű
- **Dependency management**: explicit függőségek deklarálása
- **Smaller runtime**: csak a szükséges modulok beépítése

</div>

Java Platform Module System (JPMS) lehetővé teszi a nagyobb alkalmazások moduláris szervezését.

<div class="runnable-model">

**Runnable mental model**
```java
// module-info.java - module descriptor
module com.example.myapp {
    // Kötelező dependency
    requires java.base;        // Implicit, minden module requires java.base
    requires java.sql;         // SQL API szükséges
    requires transitive java.logging;  // Transitive - aki ezt requires-zi, automatikusan kapja
    
    // Optional dependency
    requires static org.slf4j;  // Compile-time dependency, runtime optional
    
    // Exported packages - mások használhatják
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

// Package structure:
// src/
//   module-info.java
//   com/
//     example/
//       myapp/
//         api/
//           PublicAPI.java       // Exported
//         util/
//           Helper.java          // Exported (qualified)
//         internal/
//           InternalClass.java   // Not exported - module internal
//         model/
//           DataModel.java       // Opened for reflection
//         spi/
//           DataProcessor.java   // Service interface
//         impl/
//           DefaultDataProcessor.java  // Service implementation

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
*Figyeld meg: modulok erős encapsulation-t és explicit dependency management-et biztosítanak.*

</div>

<div class="version-badges">
<span class="version-badge">Java 9</span>
<span class="version-badge">JPMS</span>
<span class="version-badge">Project Jigsaw</span>
</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Module adoption kihívások</strong></summary>

<div>

- **Legacy compatibility**: régi kód modulok nélkül továbbra is működik
- **Split packages**: ugyanaz a package többféle jar-ban problémás
- **Reflection limitations**: module system korlátozza a deep reflection-t

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Package System` · `Dependency Management` · `Service Loader` · `Encapsulation` · `Jlink Tool`

</div>

### Java Memory Model (JMM) {#java-memory-model}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A JMM olyan, mint a "forgalmi szabályzat" multi-threaded kódban: meghatározza, mikor és hogyan látják a thread-ek egymás változtatásait.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Thread safety**: race condition-ök és data race-ek elkerülése
- **Visibility**: mikor látja egy thread a másik változtatásait
- **Ordering**: műveletek sorrendje multi-core környezetben
- **Performance**: correct synchronization vs unnecessary blocking

</div>

A Java Memory Model definiálja, hogyan viselkednek a változók shared memory-ban multi-threaded környezetben.

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
*Figyeld meg: volatile és synchronized biztosítják a happens-before kapcsolatokat és a visibility-t.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Volatile = synchronized" → Volatile csak visibility, nem atomicity
- „Synchronized mindig lassít" → Modern JVM-ek optimalizálják
- „Final mezők mindig thread-safe" → Csak ha object teljesen constructed

</div>
</details>

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Performance corner</strong></summary>

<div>

- **Volatile overhead**: memory fence costs, de jobb mint synchronized
- **Lock-free algorithms**: AtomicReference, CAS operations
- **Lazy initialization**: double-checked locking vs initialization-on-demand

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) Mi a happens-before relationship?
<details><summary>Válasz mutatása</summary>
Ha A happens-before B, akkor A összes memory write-ja visible B előtt. Volatile write happens-before volatile read.
</details>

2) Mikor használj volatile vs synchronized?
<details><summary>Válasz mutatása</summary>
Volatile: single variable visibility. Synchronized: compound operations, critical sections.
</details>

3) Miért hibás a double-checked locking volatile nélkül?
<details><summary>Válasz mutatása</summary>
Constructor részlegesen initialized object-et láthatna más thread, mert nincs happens-before.
</details>

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Volatile vs synchronized pontos különbség magyarázata
- Double-checked locking miért kell volatile
- Memory visibility problémák konkrét példái

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Volatile` · `Synchronized` · `Atomic Classes` · `Concurrency` · `Thread Safety` · `Happens-Before`

</div>

### Garbage Collector Types {#garbage-collector-types}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A GC típusok olyan, mint különböző takarítási stratégiák: mindegyik más-más helyzetben optimális (kis ház vs nagy irodaépület).*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Application performance**: GC pause time vs throughput trade-off
- **Memory efficiency**: different heap organization strategies
- **Latency requirements**: low-latency vs high-throughput applications
- **Hardware utilization**: single-core vs multi-core optimization

</div>

Különböző garbage collection algoritmusok különböző alkalmazási területekhez optimalizálva.

<div class="runnable-model">

**Runnable mental model**
```java
// GC típusok beállítása JVM argumentumokkal
public class GCExample {
    public static void main(String[] args) {
        // Különböző GC-k aktiválása:
        // -XX:+UseSerialGC          // Single-threaded, kis alkalmazások
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
        
        // Force GC (for demonstration only - don't use in production!)
        System.gc();
        
        // Memory usage example
        demonstrateMemoryUsage();
    }
    
    private static void demonstrateMemoryUsage() {
        // Object allocation patterns affecting GC
        
        // Short-lived objects (young generation)
        for (int i = 0; i < 1000; i++) {
            String temp = "temporary string " + i;  // Quick garbage
        }
        
        // Long-lived objects (old generation)
        static java.util.List<String> cache = new java.util.ArrayList<>();
        for (int i = 0; i < 100; i++) {
            cache.add("cached item " + i);          // Survives multiple GC cycles
        }
        
        // Large objects (may trigger immediate old generation)
        byte[] largeArray = new byte[1024 * 1024]; // 1MB allocation
    }
}

// GC performance monitoring
import java.lang.management.GarbageCollectorMXBean;
import java.lang.management.ManagementFactory;

public class GCMonitoring {
    public static void printGCStats() {
        for (GarbageCollectorMXBean gc : ManagementFactory.getGarbageCollectorMXBeans()) {
            System.out.println("GC Name: " + gc.getName());
            System.out.println("Collection count: " + gc.getCollectionCount());
            System.out.println("Collection time: " + gc.getCollectionTime() + "ms");
            System.out.println("Memory pools: " + gc.getMemoryPoolNames().length);
        }
    }
}
```
*Figyeld meg: különböző GC-k különböző trade-off-okat kínálnak latency vs throughput között.*

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>GC Performance összehasonlítás</strong></summary>

<div>

- **Serial GC**: Single-thread, kis heap (<100MB), client alkalmazások
- **Parallel GC**: Multi-thread, throughput optimized, server alkalmazások  
- **G1 GC**: Low pause (<10ms), medium-large heap (6GB+), balanced
- **ZGC**: Ultra-low pause (<1ms), very large heap (TB+), Java 11+
- **Shenandoah**: Concurrent, low pause, alternative to ZGC

</div>
</details>

</div>

<div class="concept-section tools">

<details>
<summary>🧰 <strong>GC monitoring eszközök</strong></summary>

<div>

`jstat -gc`, `jconsole`, `jvisualvm`, `GCEasy.io`, `-XX:+PrintGC`, `-Xloggc:gc.log`

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Hol buksz el interjún</strong></summary>

<div>

- Generational garbage collection működése
- G1 vs ZGC vs Parallel GC use case-ek
- GC tuning paraméterek hatása

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Heap Memory` · `JVM Tuning` · `Performance Monitoring` · `Memory Management` · `Latency Optimization`

</div>

### Concurrency API {#concurrency-api}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A Concurrency API olyan, mint egy "thread menedzsment rendszer": ExecutorService a munkaerő irányítás, CompletableFuture az aszinkron pipeline.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Thread management**: ExecutorService automatikus thread pool kezelés
- **Asynchronous programming**: CompletableFuture non-blocking operations
- **Thread-safe collections**: ConcurrentHashMap, BlockingQueue high-performance
- **Fork-Join**: work-stealing algorithm CPU-intensive feladatokhoz

</div>

Modern concurrent programming eszközök a java.util.concurrent package-ben.

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
    
    // ForkJoinPool - work stealing for CPU-intensive tasks
    public static void demonstrateForkJoin() {
        ForkJoinPool forkJoinPool = new ForkJoinPool();
        
        RecursiveTask<Long> task = new RecursiveTask<Long>() {
            @Override
            protected Long compute() {
                // Fibonacci calculation (simplified)
                return calculateFibonacci(40);
            }
            
            private Long calculateFibonacci(int n) {
                if (n <= 1) return (long) n;
                return calculateFibonacci(n-1) + calculateFibonacci(n-2);
            }
        };
        
        Long result = forkJoinPool.invoke(task);
        System.out.println("Fibonacci result: " + result);
    }
    
    // Thread-safe collections
    public static void demonstrateThreadSafeCollections() {
        // ConcurrentHashMap - high-performance concurrent map
        ConcurrentHashMap<String, AtomicInteger> counters = new ConcurrentHashMap<>();
        
        // Multiple threads updating counters
        ExecutorService executor = Executors.newFixedThreadPool(10);
        for (int i = 0; i < 100; i++) {
            final String key = "key" + (i % 5);
            executor.submit(() -> {
                counters.computeIfAbsent(key, k -> new AtomicInteger(0))
                       .incrementAndGet();
            });
        }
        
        executor.shutdown();
        
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
*Figyeld meg: modern concurrency API-k jelentősen egyszerűsítik a thread management-et és async programming-ot.*

</div>

<div class="version-badges">
<span class="version-badge">Java 5</span>
<span class="version-badge">Concurrent Collections</span>
<span class="version-badge">Java 8</span>
<span class="version-badge">CompletableFuture</span>
</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Performance tippek</strong></summary>

<div>

- **Thread pool sizing**: CPU cores * 2 for CPU-bound, higher for I/O-bound
- **ConcurrentHashMap**: gyorsabb mint synchronized HashMap
- **CompletableFuture**: non-blocking alternative to Future.get()

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) Mikor használj CompletableFuture vs ExecutorService?
<details><summary>Válasz mutatása</summary>
CompletableFuture: async pipelines, chaining. ExecutorService: simple task execution, thread pool management.
</details>

2) Mi a ForkJoinPool előnye?
<details><summary>Válasz mutatása</summary>
Work-stealing: idle threads "lopnak" munkát busy threads-től, jobb CPU utilization.
</details>

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Thread Pools` · `Async Programming` · `Work Stealing` · `Producer Consumer` · `Lock-Free Collections`

</div>

### Streams – Advanced {#streams-advanced}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*Az advanced streams olyan, mint egy "házi assembly line": parallel streams = több worker, custom collector = specialized packaging station.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Parallel processing**: automatic work distribution across CPU cores
- **Custom collectors**: specialized data aggregation beyond standard collectors
- **Performance optimization**: lazy evaluation vs eager computation trade-offs
- **Memory efficiency**: streaming large datasets without loading everything

</div>

Haladó Stream API funkciók performance és flexibility optimalizáláshoz.

<div class="runnable-model">

**Runnable mental model**
```java
import java.util.stream.*;
import java.util.concurrent.ConcurrentMap;

public class AdvancedStreamsExample {
    
    // Parallel streams - automatic parallelization
    public static void demonstrateParallelStreams() {
        List<Integer> numbers = IntStream.rangeClosed(1, 1_000_000)
                                       .boxed()
                                       .collect(Collectors.toList());
        
        // Sequential processing
        long start = System.currentTimeMillis();
        long sequentialSum = numbers.stream()
                                   .mapToLong(n -> expensiveCalculation(n))
                                   .sum();
        long sequentialTime = System.currentTimeMillis() - start;
        
        // Parallel processing - automatic work distribution
        start = System.currentTimeMillis();
        long parallelSum = numbers.parallelStream()
                                 .mapToLong(n -> expensiveCalculation(n))
                                 .sum();
        long parallelTime = System.currentTimeMillis() - start;
        
        System.out.println("Sequential: " + sequentialTime + "ms");
        System.out.println("Parallel: " + parallelTime + "ms");
        System.out.println("Speedup: " + (double) sequentialTime / parallelTime);
    }
    
    private static long expensiveCalculation(int n) {
        // Simulate CPU-intensive work
        return n * n;
    }
    
    // Custom collectors - specialized data aggregation
    public static void demonstrateCustomCollectors() {
        List<Person> people = Arrays.asList(
            new Person("Alice", 25, "Engineering"),
            new Person("Bob", 30, "Engineering"), 
            new Person("Charlie", 35, "Marketing"),
            new Person("Diana", 28, "Engineering")
        );
        
        // Custom collector: concatenate names with delimiter
        String namesConcatenated = people.stream()
            .collect(Collector.of(
                StringBuilder::new,                    // Supplier
                (sb, person) -> sb.append(person.getName()).append(", "), // Accumulator  
                (sb1, sb2) -> sb1.append(sb2),        // Combiner (parallel)
                StringBuilder::toString,               // Finisher
                Collector.Characteristics.CONCURRENT   // Characteristics
            ));
        
        // Advanced grouping with downstream collector
        Map<String, Double> avgAgeByDepartment = people.stream()
            .collect(Collectors.groupingBy(
                Person::getDepartment,
                Collectors.averagingInt(Person::getAge)
            ));
        
        // Multi-level grouping
        Map<String, Map<String, List<Person>>> groupedByDeptAndAgeRange = people.stream()
            .collect(Collectors.groupingBy(
                Person::getDepartment,
                Collectors.groupingBy(person -> 
                    person.getAge() < 30 ? "Young" : "Senior"
                )
            ));
        
        // Partitioning (special case of grouping)
        Map<Boolean, List<Person>> partitionedByAge = people.stream()
            .collect(Collectors.partitioningBy(person -> person.getAge() >= 30));
    }
    
    // Reduce vs Collect - when to use which
    public static void demonstrateReduceVsCollect() {
        List<String> words = Arrays.asList("java", "stream", "api", "advanced");
        
        // REDUCE - for combining into single value
        String concatenated = words.stream()
            .reduce("", (a, b) -> a + " " + b);       // Immutable combining
        
        Optional<String> longest = words.stream()
            .reduce((a, b) -> a.length() > b.length() ? a : b);
        
        // COLLECT - for accumulating into mutable container
        String joined = words.stream()
            .collect(Collectors.joining(" "));         // Mutable accumulation
        
        StringBuilder collected = words.stream()
            .collect(StringBuilder::new,               // More efficient
                     StringBuilder::append, 
                     StringBuilder::append);
        
        // Performance consideration: collect is often more efficient
        // for mutable accumulation (StringBuilder, ArrayList, etc.)
    }
    
    // Stream performance patterns
    public static void demonstratePerformancePatterns() {
        List<Integer> numbers = IntStream.rangeClosed(1, 1000000)
                                       .boxed()
                                       .collect(Collectors.toList());
        
        // BAD: multiple stream operations
        List<Integer> result1 = numbers.stream()
                                      .filter(n -> n % 2 == 0)
                                      .collect(Collectors.toList());
        result1 = result1.stream()
                        .map(n -> n * 2)
                        .collect(Collectors.toList());
        
        // GOOD: single stream pipeline
        List<Integer> result2 = numbers.stream()
                                      .filter(n -> n % 2 == 0)    // Chained operations
                                      .map(n -> n * 2)
                                      .collect(Collectors.toList());
        
        // Specialized streams for primitives (avoid boxing)
        long sum = numbers.stream()
                         .mapToInt(Integer::intValue)     // Convert to IntStream
                         .filter(n -> n % 2 == 0)
                         .asLongStream()                  // For larger sums
                         .sum();
        
        // Short-circuit operations for efficiency
        Optional<Integer> firstMatch = numbers.stream()
                                             .filter(n -> n > 500000)
                                             .findFirst();   // Stops at first match
        
        boolean anyMatch = numbers.parallelStream()
                                 .anyMatch(n -> n > 900000);  // Parallel + short-circuit
    }
}

// Helper class
class Person {
    private String name;
    private int age;
    private String department;
    
    public Person(String name, int age, String department) {
        this.name = name;
        this.age = age;
        this.department = department;
    }
    
    // Getters
    public String getName() { return name; }
    public int getAge() { return age; }
    public String getDepartment() { return department; }
}
```
*Figyeld meg: haladó stream operations jelentős performance javítást és flexibility-t biztosíthatnak megfelelő használattal.*

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Advanced performance tippek</strong></summary>

<div>

- **Parallel streams**: csak nagyobb dataset-ekre (1000+ elem) és CPU-intensive operációkra
- **Primitive streams**: IntStream, LongStream boxing elkerülésére
- **Single pipeline**: ne törj szét stream operációkat külön collect-ekre

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) Mikor érdemes parallel stream-et használni?
<details><summary>Válasz mutatása</summary>
Nagy dataset (1000+ elem), CPU-intensive operations, független elemek, több CPU core elérhető.
</details>

2) Mi a különbség reduce és collect között?
<details><summary>Válasz mutatása</summary>
Reduce: single value combining, immutable. Collect: mutable container accumulation, gyakran hatékonyabb.
</details>

3) Hogyan optimalizáld a stream performance-ot?
<details><summary>Válasz mutatása</summary>
Single pipeline, primitive streams, short-circuit operations, megfelelő collector choice.
</details>

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Parallel Processing` · `Custom Collectors` · `ForkJoinPool` · `Performance Tuning` · `Lazy Evaluation`

</div>

### JDBC and Database Connectivity {#jdbc-database}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A JDBC olyan, mint egy "database protocol translator": DriverManager = kapcsolat broker, PreparedStatement = safe SQL template.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Database independence**: JDBC API egységes interface több DB-hez
- **Security**: PreparedStatement SQL injection protection
- **Performance**: Connection pooling és batch operations
- **Transaction management**: ACID properties biztosítása

</div>

Java Database Connectivity API relational database-ekkel való munkához.

<div class="runnable-model">

**Runnable mental model**
```java
import java.sql.*;
import javax.sql.DataSource;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

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
                        age INT,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
                try (PreparedStatement pstmt1 = connection.prepareStatement(
                        "UPDATE users SET age = age + 1 WHERE id = ?")) {
                    pstmt1.setLong(1, 1);
                    pstmt1.executeUpdate();
                }
                
                try (PreparedStatement pstmt2 = connection.prepareStatement(
                        "INSERT INTO users (name, email, age) VALUES (?, ?, ?)")) {
                    pstmt2.setString(1, "Jane Smith");
                    pstmt2.setString(2, "jane@example.com");
                    pstmt2.setInt(3, 25);
                    pstmt2.executeUpdate();
                }
                
                // Simulate business logic that might fail
                if (Math.random() > 0.5) {
                    throw new RuntimeException("Business logic failed");
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
    
    // Connection pooling for production
    public static void demonstrateConnectionPooling() {
        // HikariCP - popular connection pool
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl("jdbc:h2:mem:testdb");
        config.setUsername("sa");
        config.setPassword("");
        config.setMaximumPoolSize(10);                    // Max connections
        config.setMinimumIdle(2);                        // Min idle connections
        config.setConnectionTimeout(30000);             // 30 seconds
        config.setIdleTimeout(600000);                   // 10 minutes
        config.setMaxLifetime(1800000);                  // 30 minutes
        
        try (HikariDataSource dataSource = new HikariDataSource(config)) {
            
            // Use connection from pool
            try (Connection connection = dataSource.getConnection()) {
                performDatabaseOperation(connection);
            }
            
            // Connection automatically returned to pool
            
        } catch (SQLException e) {
            System.err.println("Pool error: " + e.getMessage());
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
                        int[] results = pstmt.executeBatch();
                        System.out.println("Batch executed: " + results.length + " statements");
                    }
                }
                
                // Execute remaining statements
                pstmt.executeBatch();
            }
            
        } catch (SQLException e) {
            System.err.println("Batch error: " + e.getMessage());
        }
    }
    
    // ResultSet handling patterns
    public static void demonstrateResultSetPatterns() {
        String url = "jdbc:h2:mem:testdb";
        
        try (Connection connection = DriverManager.getConnection(url, "sa", "")) {
            
            // Scrollable ResultSet
            try (PreparedStatement pstmt = connection.prepareStatement(
                    "SELECT * FROM users ORDER BY id",
                    ResultSet.TYPE_SCROLL_INSENSITIVE,
                    ResultSet.CONCUR_READ_ONLY)) {
                
                try (ResultSet rs = pstmt.executeQuery()) {
                    // Navigate ResultSet
                    rs.last();                           // Go to last row
                    int totalRows = rs.getRow();
                    System.out.println("Total rows: " + totalRows);
                    
                    rs.first();                          // Go to first row
                    rs.absolute(5);                      // Go to 5th row
                    rs.relative(-2);                     // Move 2 rows back
                }
            }
            
            // Updatable ResultSet
            try (PreparedStatement pstmt = connection.prepareStatement(
                    "SELECT id, name, age FROM users WHERE id = ?",
                    ResultSet.TYPE_SCROLL_SENSITIVE,
                    ResultSet.CONCUR_UPDATABLE)) {
                
                pstmt.setLong(1, 1);
                try (ResultSet rs = pstmt.executeQuery()) {
                    if (rs.next()) {
                        rs.updateInt("age", rs.getInt("age") + 1);
                        rs.updateRow();                  // Update database
                        System.out.println("Updated age directly through ResultSet");
                    }
                }
            }
            
        } catch (SQLException e) {
            System.err.println("ResultSet error: " + e.getMessage());
        }
    }
    
    private static void performDatabaseOperation(Connection connection) throws SQLException {
        try (PreparedStatement pstmt = connection.prepareStatement(
                "SELECT COUNT(*) FROM users")) {
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    System.out.println("Total users: " + rs.getInt(1));
                }
            }
        }
    }
}
```
*Figyeld meg: JDBC modern patterns connection pooling-gal, transaction management-tel és performance optimalization-nel.*

</div>

<div class="version-badges">
<span class="version-badge">JDBC 4.2</span>
<span class="version-badge">Connection Pooling</span>
<span class="version-badge">PreparedStatement</span>
</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Database performance tippek</strong></summary>

<div>

- **Connection pooling**: mandatory production-ben, HikariCP recommended
- **PreparedStatement**: always use for parameters, SQL injection protection + performance
- **Batch operations**: 100-1000x gyorsabb single insert-eknél

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) Miért használj PreparedStatement Statement helyett?
<details><summary>Válasz mutatása</summary>
SQL injection protection, performance (pre-compiled), type safety.
</details>

2) Mikor kell connection pooling?
<details><summary>Válasz mutatása</summary>
Production environment, concurrent users, connection creation expensive.
</details>

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Database Access` · `SQL Injection Protection` · `Connection Pooling` · `Transaction Management` · `Batch Processing`

</div>

### Security Fundamentals {#security-fundamentals}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A Java Security olyan, mint egy "digital fortress system": SecurityManager = gate keeper, Permissions = access cards, Cryptography = secret codes.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Authentication**: user identity verification
- **Authorization**: access control permissions
- **Cryptography**: data encryption és hashing
- **Secure coding**: vulnerability prevention techniques

</div>

Java security fundamentals authentication, authorization, és cryptography-hoz.

<div class="runnable-model">

**Runnable mental model**
```java
import java.security.*;
import javax.crypto.*;
import javax.crypto.spec.*;
import java.util.Base64;
import java.security.spec.*;

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
        
        // Verify password
        boolean isValid = verifyPassword(password, salt, hash);
        System.out.println("Password valid: " + isValid);
    }
    
    private static boolean verifyPassword(String password, byte[] salt, byte[] expectedHash) 
            throws Exception {
        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
        PBEKeySpec spec = new PBEKeySpec(password.toCharArray(), salt, 100000, 256);
        SecretKey key = factory.generateSecret(spec);
        byte[] hash = key.getEncoded();
        
        return MessageDigest.isEqual(hash, expectedHash);  // Constant-time comparison
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
        PublicKey publicKey = keyPair.getPublic();
        PrivateKey privateKey = keyPair.getPrivate();
        
        String message = "Secret message";
        
        // Encrypt with public key
        Cipher cipher = Cipher.getInstance("RSA/OAEP/SHA-256");
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);
        byte[] encryptedMessage = cipher.doFinal(message.getBytes());
        
        System.out.println("Original: " + message);
        System.out.println("Encrypted: " + Base64.getEncoder().encodeToString(encryptedMessage));
        
        // Decrypt with private key
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        byte[] decryptedMessage = cipher.doFinal(encryptedMessage);
        String decryptedText = new String(decryptedMessage);
        
        System.out.println("Decrypted: " + decryptedText);
    }
    
    // Digital signatures
    public static void demonstrateDigitalSignatures() throws Exception {
        // Generate key pair for signing
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
        keyGen.initialize(2048);
        KeyPair keyPair = keyGen.generateKeyPair();
        
        String document = "Important document to sign";
        
        // Create signature
        Signature signature = Signature.getInstance("SHA256withRSA");
        signature.initSign(keyPair.getPrivate());
        signature.update(document.getBytes());
        byte[] digitalSignature = signature.sign();
        
        System.out.println("Document: " + document);
        System.out.println("Signature: " + Base64.getEncoder().encodeToString(digitalSignature));
        
        // Verify signature
        signature.initVerify(keyPair.getPublic());
        signature.update(document.getBytes());
        boolean isValid = signature.verify(digitalSignature);
        
        System.out.println("Signature valid: " + isValid);
        
        // Test with tampered document
        signature.initVerify(keyPair.getPublic());
        signature.update("Tampered document".getBytes());
        boolean isTamperedValid = signature.verify(digitalSignature);
        
        System.out.println("Tampered signature valid: " + isTamperedValid);
    }
    
    // Secure random number generation
    public static void demonstrateSecureRandom() {
        // Never use java.util.Random for security!
        SecureRandom secureRandom = new SecureRandom();
        
        // Generate secure random bytes
        byte[] randomBytes = new byte[32];
        secureRandom.nextBytes(randomBytes);
        System.out.println("Random bytes: " + Base64.getEncoder().encodeToString(randomBytes));
        
        // Generate secure random numbers
        int randomInt = secureRandom.nextInt(1000000);
        System.out.println("Random int: " + randomInt);
        
        // Generate secure token
        String token = generateSecureToken(32);
        System.out.println("Secure token: " + token);
    }
    
    private static String generateSecureToken(int length) {
        SecureRandom random = new SecureRandom();
        byte[] tokenBytes = new byte[length];
        random.nextBytes(tokenBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);
    }
    
    // Message digest (hashing)
    public static void demonstrateHashing() throws Exception {
        String data = "Data to hash";
        
        // SHA-256 hash
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(data.getBytes());
        String hashHex = bytesToHex(hash);
        
        System.out.println("Original: " + data);
        System.out.println("SHA-256: " + hashHex);
        
        // Verify hash
        byte[] verifyHash = digest.digest(data.getBytes());
        boolean hashMatches = MessageDigest.isEqual(hash, verifyHash);
        System.out.println("Hash matches: " + hashMatches);
        
        // Different data produces different hash
        byte[] differentHash = digest.digest("Different data".getBytes());
        System.out.println("Different hash: " + bytesToHex(differentHash));
    }
    
    private static String bytesToHex(byte[] bytes) {
        StringBuilder result = new StringBuilder();
        for (byte b : bytes) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
    }
    
    // Secure coding practices demonstration
    public static void demonstrateSecureCoding() {
        // BAD: Hardcoded passwords
        // String password = "hardcoded123";
        
        // GOOD: Read from secure configuration
        String password = System.getenv("DB_PASSWORD");
        
        // BAD: Storing sensitive data in String (immutable, stays in memory)
        // String apiKey = getApiKey();
        
        // GOOD: Use char[] for sensitive data (can be cleared)
        char[] apiKey = getApiKeyAsCharArray();
        try {
            // Use apiKey
            System.out.println("API key loaded securely");
        } finally {
            // Clear sensitive data
            Arrays.fill(apiKey, '\0');
        }
        
        // BAD: Logging sensitive information
        // logger.info("User password: " + userPassword);
        
        // GOOD: Log safely
        System.out.println("User authenticated successfully");
        
        // Input validation example
        String userInput = "user@example.com";
        if (isValidEmail(userInput)) {
            System.out.println("Valid email: " + userInput);
        } else {
            System.err.println("Invalid email format");
        }
    }
    
    private static char[] getApiKeyAsCharArray() {
        return "secret-api-key".toCharArray();
    }
    
    private static boolean isValidEmail(String email) {
        return email != null && 
               email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
    }
}
```
*Figyeld meg: Java security API-k modern cryptographic practices-t támogatnak production-ready security implementation-höz.*

</div>

<div class="concept-section performance">

<details>
<summary>🔒 <strong>Security best practices</strong></summary>

<div>

- **Password hashing**: PBKDF2, bcrypt, vagy Argon2 high iteration count-tal
- **Encryption**: AES-256 symmetric, RSA-2048+ asymmetric
- **Random generation**: mindig SecureRandom, soha java.util.Random

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Security interview pitfalls</strong></summary>

<div>

- Symmetric vs asymmetric encryption use cases
- Salt purpose password hashing-ben
- Digital signature vs encryption különbség

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Cryptography` · `Authentication` · `Password Security` · `Digital Signatures` · `Secure Coding`

</div>

### Logging Frameworks {#logging-frameworks}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*A logging olyan, mint egy "event recording system": Logger = news reporter, Appender = news channel, Level = news importance.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Debugging**: production issues investigation
- **Monitoring**: application health és performance tracking
- **Audit**: security és compliance requirements
- **Performance**: structured logging for analytics

</div>

Professional logging SLF4J, Logback, és Log4j2 framework-ökkel.

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
    private static final Logger securityLogger = LoggerFactory.getLogger("SECURITY");
    private static final Marker CONFIDENTIAL = MarkerFactory.getMarker("CONFIDENTIAL");
    
    // Basic logging levels
    public static void demonstrateLoggingLevels() {
        // Log levels (lowest to highest priority)
        logger.trace("Trace message - very detailed debug info");
        logger.debug("Debug message - debug information");
        logger.info("Info message - general information");
        logger.warn("Warning message - potential problem");
        logger.error("Error message - error occurred");
        
        // Conditional logging (check if level enabled)
        if (logger.isDebugEnabled()) {
            String expensiveOperation = performExpensiveStringBuilding();
            logger.debug("Debug info: {}", expensiveOperation);
        }
        
        // Parameterized logging (recommended)
        String userId = "user123";
        int attemptCount = 3;
        logger.info("User {} logged in after {} attempts", userId, attemptCount);
        
        // Exception logging
        try {
            riskyOperation();
        } catch (Exception e) {
            logger.error("Failed to perform risky operation for user {}", userId, e);
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
            
            // Simulate business logic
            authenticateUser("user123");
            
            logger.info("User action: login successful");
            
        } finally {
            // Always clear MDC to prevent memory leaks
            MDC.clear();
        }
    }
    
    private static void authenticateUser(String userId) {
        // MDC context is automatically included in log messages
        logger.debug("Validating credentials for user");
        
        // Security-related logging
        securityLogger.info("Authentication attempt for user: {}", userId);
        
        // Simulate authentication
        if (userId.equals("user123")) {
            securityLogger.info("Authentication successful");
        } else {
            securityLogger.warn("Authentication failed - invalid credentials");
        }
    }
    
    // Markers for categorizing logs
    public static void demonstrateMarkers() {
        Marker performance = MarkerFactory.getMarker("PERFORMANCE");
        Marker security = MarkerFactory.getMarker("SECURITY");
        Marker audit = MarkerFactory.getMarker("AUDIT");
        
        // Performance logging
        long startTime = System.currentTimeMillis();
        performDatabaseOperation();
        long duration = System.currentTimeMillis() - startTime;
        
        logger.info(performance, "Database operation completed in {}ms", duration);
        
        // Security logging
        logger.warn(security, "Suspicious login pattern detected for user: {}", "user123");
        
        // Audit logging
        logger.info(audit, "User {} performed action: {}", "user123", "data_export");
        
        // Confidential data (might be filtered out in production)
        logger.debug(CONFIDENTIAL, "Sensitive operation details: {}", "classified_info");
    }
    
    // Application monitoring and health checks
    public static void demonstrateMonitoringLogs() {
        // Application startup
        logger.info("Application starting up - version {}", getApplicationVersion());
        
        // Health check
        boolean dbHealthy = checkDatabaseHealth();
        boolean cacheHealthy = checkCacheHealth();
        
        if (dbHealthy && cacheHealthy) {
            logger.info("Health check passed - all systems operational");
        } else {
            logger.error("Health check failed - db:{}, cache:{}", dbHealthy, cacheHealthy);
        }
        
        // Resource monitoring
        Runtime runtime = Runtime.getRuntime();
        long totalMemory = runtime.totalMemory();
        long freeMemory = runtime.freeMemory();
        long usedMemory = totalMemory - freeMemory;
        
        logger.info("Memory usage: used={}MB, free={}MB, total={}MB", 
                   usedMemory / 1024 / 1024, 
                   freeMemory / 1024 / 1024, 
                   totalMemory / 1024 / 1024);
        
        // Performance metrics
        recordMetric("database.query.duration", 150);
        recordMetric("cache.hit.ratio", 0.85);
    }
    
    // Error handling and troubleshooting
    public static void demonstrateErrorLogging() {
        String operation = "user_registration";
        String userId = "newuser456";
        
        try {
            // Simulate business operation
            registerUser(userId);
            
        } catch (ValidationException e) {
            // Business logic error - expected
            logger.warn("Validation failed for operation {} and user {}: {}", 
                       operation, userId, e.getMessage());
            
        } catch (DatabaseException e) {
            // Infrastructure error - unexpected
            logger.error("Database error during {} for user {}", 
                        operation, userId, e);
            
            // Alert monitoring system
            alertMonitoringSystem("database_error", e);
            
        } catch (Exception e) {
            // Unknown error - critical
            logger.error("Unexpected error during {} for user {}", 
                        operation, userId, e);
            
            // Escalate to on-call team
            escalateToOnCall("critical_error", operation, e);
        }
    }
    
    // Best practices demonstration
    public static void demonstrateLoggingBestPractices() {
        // DON'T: Log sensitive information
        // logger.info("User password: {}", password);  // NEVER DO THIS
        
        // DO: Log safely
        logger.info("User authentication attempt");
        
        // DON'T: String concatenation
        // logger.info("User " + userId + " performed " + action);  // Inefficient
        
        // DO: Parameterized logging
        String userId = "user123";
        String action = "data_export";
        logger.info("User {} performed {}", userId, action);
        
        // DON'T: Excessive logging in loops
        for (int i = 0; i < 1000; i++) {
            // logger.debug("Processing item {}", i);  // Can flood logs
        }
        
        // DO: Aggregate or sample logging
        logger.debug("Processing {} items in batch", 1000);
        
        // DON'T: Logging without context
        // logger.error("Operation failed");  // What operation? When? Why?
        
        // DO: Contextual logging
        logger.error("User registration failed for user {} due to validation error: email format invalid", 
                    userId);
        
        // Performance-conscious logging
        if (logger.isTraceEnabled()) {
            String expensiveDebugInfo = buildExpensiveDebugInfo();
            logger.trace("Detailed trace: {}", expensiveDebugInfo);
        }
    }
    
    // Helper methods
    private static String performExpensiveStringBuilding() {
        return "Expensive operation result";
    }
    
    private static void riskyOperation() throws Exception {
        throw new RuntimeException("Simulated failure");
    }
    
    private static void performDatabaseOperation() {
        // Simulate database work
        try { Thread.sleep(100); } catch (InterruptedException e) {}
    }
    
    private static String getApplicationVersion() {
        return "1.2.3";
    }
    
    private static boolean checkDatabaseHealth() {
        return true;  // Simulate health check
    }
    
    private static boolean checkCacheHealth() {
        return true;  // Simulate health check
    }
    
    private static void recordMetric(String metricName, double value) {
        logger.debug("Metric recorded: {}={}", metricName, value);
    }
    
    private static void registerUser(String userId) throws ValidationException, DatabaseException {
        if (userId.length() < 3) {
            throw new ValidationException("User ID too short");
        }
        // Simulate registration
    }
    
    private static void alertMonitoringSystem(String alertType, Exception e) {
        logger.info("Alert sent to monitoring system: type={}, error={}", alertType, e.getMessage());
    }
    
    private static void escalateToOnCall(String severity, String operation, Exception e) {
        logger.error("Escalated to on-call: severity={}, operation={}", severity, operation);
    }
    
    private static String buildExpensiveDebugInfo() {
        return "Expensive debug information that takes time to build";
    }
    
    // Custom exceptions
    static class ValidationException extends Exception {
        public ValidationException(String message) { super(message); }
    }
    
    static class DatabaseException extends Exception {
        public DatabaseException(String message, Throwable cause) { super(message, cause); }
    }
}

// Logback configuration example (logback-spring.xml)
/*
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    
    <!-- Console appender for development -->
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level [%X{requestId}] %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>
    
    <!-- File appender for production -->
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>logs/application.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>logs/application.%d{yyyy-MM-dd}.%i.gz</fileNamePattern>
            <maxFileSize>100MB</maxFileSize>
            <maxHistory>30</maxHistory>
            <totalSizeCap>3GB</totalSizeCap>
        </rollingPolicy>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level [%X{userId}] [%X{requestId}] %logger - %msg%n</pattern>
        </encoder>
    </appender>
    
    <!-- Security logger -->
    <logger name="SECURITY" level="INFO">
        <appender-ref ref="SECURITY_FILE"/>
    </logger>
    
    <!-- Root logger -->
    <root level="INFO">
        <appender-ref ref="STDOUT"/>
        <appender-ref ref="FILE"/>
    </root>
    
</configuration>
*/
```
*Figyeld meg: professional logging structured approach-sal, MDC context-tel és proper error handling-gel.*

</div>

<div class="version-badges">
<span class="version-badge">SLF4J</span>
<span class="version-badge">Logback</span>
<span class="version-badge">Structured Logging</span>
</div>

<div class="concept-section performance">

<details>
<summary>📊 <strong>Logging performance tippek</strong></summary>

<div>

- **Parameterized logging**: kerüld a string concatenation-t
- **Level checks**: expensive operations előtt check isDebugEnabled()
- **Async appenders**: high-throughput applications-höz

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

1) Miért jobb SLF4J mint direkt logging framework?
<details><summary>Válasz mutatása</summary>
Facade pattern: könnyen váltható backend (Logback, Log4j2), egységes API.
</details>

2) Mikor használj MDC-t?
<details><summary>Válasz mutatása</summary>
Request tracing, user context, correlation ID-k multi-threaded environment-ben.
</details>

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Structured Logging` · `Performance Monitoring` · `Error Tracking` · `Security Audit` · `Production Debugging`

</div>

### Advanced Annotations {#advanced-annotations}

<div class="concept-section mental-model">

🧭 **Így gondolj rá**  
*Az advanced annotations olyan, mint "code metadata system": Custom Annotations = metadata template, Reflection = metadata reader, Processors = build-time metadata handler.*

</div>

<div class="concept-section why-important">

💡 **Miért számít?**
- **Framework integration**: Spring, Hibernate annotation-based configuration
- **Code generation**: compile-time code generation annotation processors-sel
- **Validation**: Bean Validation API automatic validation
- **Documentation**: executable documentation embedded in code

</div>

Advanced annotation usage custom annotations, processors és reflection-nel.

<div class="runnable-model">

**Runnable mental model**
```java
import java.lang.annotation.*;
import java.lang.reflect.*;
import javax.annotation.processing.*;
import javax.lang.model.element.*;

// Custom annotations definition
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Auditable {
    String value() default "";
    AuditLevel level() default AuditLevel.INFO;
    boolean includeParams() default false;
}

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface ConfigProperty {
    String value();
    String defaultValue() default "";
    boolean required() default false;
}

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Repeatable(Cacheable.List.class)  // Java 8+ repeatable annotations
public @interface Cacheable {
    String value();
    int ttlSeconds() default 300;
    
    @Target(ElementType.METHOD)
    @Retention(RetentionPolicy.RUNTIME)
    @interface List {
        Cacheable[] value();
    }
}

enum AuditLevel {
    INFO, WARN, ERROR
}

// Advanced annotation usage examples
@Auditable(value = "UserService", level = AuditLevel.INFO)
public class AdvancedAnnotationExample {
    
    @ConfigProperty(value = "database.url", required = true)
    private String databaseUrl;
    
    @ConfigProperty(value = "cache.size", defaultValue = "100")
    private int cacheSize;
    
    // Method with multiple repeatable annotations
    @Cacheable(value = "userCache", ttlSeconds = 600)
    @Cacheable(value = "profileCache", ttlSeconds = 300)
    @Auditable(value = "getUserProfile", includeParams = true)
    public UserProfile getUserProfile(String userId) {
        return new UserProfile(userId, "John Doe");
    }
    
    // Annotation processing with reflection
    public static void demonstrateAnnotationReflection() throws Exception {
        Class<?> clazz = AdvancedAnnotationExample.class;
        
        // Class-level annotation processing
        if (clazz.isAnnotationPresent(Auditable.class)) {
            Auditable auditable = clazz.getAnnotation(Auditable.class);
            System.out.println("Class audit info: " + auditable.value() + 
                             ", level: " + auditable.level());
        }
        
        // Field annotation processing
        Field[] fields = clazz.getDeclaredFields();
        for (Field field : fields) {
            if (field.isAnnotationPresent(ConfigProperty.class)) {
                ConfigProperty config = field.getAnnotation(ConfigProperty.class);
                System.out.printf("Config field %s: property=%s, default=%s, required=%s%n",
                                field.getName(), config.value(), config.defaultValue(), config.required());
            }
        }
        
        // Method annotation processing
        Method getUserProfileMethod = clazz.getMethod("getUserProfile", String.class);
        
        // Process repeatable annotations
        Cacheable[] cacheables = getUserProfileMethod.getAnnotationsByType(Cacheable.class);
        for (Cacheable cacheable : cacheables) {
            System.out.printf("Cache config: %s, TTL: %d seconds%n", 
                            cacheable.value(), cacheable.ttlSeconds());
        }
        
        // Process audit annotation
        if (getUserProfileMethod.isAnnotationPresent(Auditable.class)) {
            Auditable auditable = getUserProfileMethod.getAnnotation(Auditable.class);
            System.out.printf("Method audit: %s, include params: %s%n", 
                            auditable.value(), auditable.includeParams());
        }
    }
    
    // Annotation-based configuration injection
    public void injectConfiguration() throws Exception {
        Class<?> clazz = this.getClass();
        Field[] fields = clazz.getDeclaredFields();
        
        for (Field field : fields) {
            if (field.isAnnotationPresent(ConfigProperty.class)) {
                ConfigProperty config = field.getAnnotation(ConfigProperty.class);
                field.setAccessible(true);
                
                // Simulate reading from configuration system
                String configValue = getConfigValue(config.value(), config.defaultValue());
                
                if (configValue == null && config.required()) {
                    throw new IllegalStateException("Required config property not found: " + config.value());
                }
                
                // Type-safe injection
                Class<?> fieldType = field.getType();
                Object value = convertValue(configValue, fieldType);
                field.set(this, value);
                
                System.out.printf("Injected %s = %s into field %s%n", 
                                config.value(), configValue, field.getName());
            }
        }
    }
    
    // Annotation-based method interception (AOP style)
    public static void demonstrateMethodInterception() throws Exception {
        AdvancedAnnotationExample example = new AdvancedAnnotationExample();
        Method method = example.getClass().getMethod("getUserProfile", String.class);
        
        // Check if method should be audited
        if (method.isAnnotationPresent(Auditable.class)) {
            Auditable auditable = method.getAnnotation(Auditable.class);
            
            long startTime = System.currentTimeMillis();
            
            // Pre-execution audit
            System.out.printf("[AUDIT] Starting %s execution%n", auditable.value());
            
            try {
                // Execute method
                Object result = method.invoke(example, "user123");
                
                long duration = System.currentTimeMillis() - startTime;
                
                // Post-execution audit
                System.out.printf("[AUDIT] Completed %s in %dms, result: %s%n", 
                                auditable.value(), duration, result);
                
            } catch (Exception e) {
                System.err.printf("[AUDIT] Failed %s: %s%n", auditable.value(), e.getMessage());
                throw e;
            }
        }
    }
    
    // Bean Validation with custom annotations
    @Target(ElementType.FIELD)
    @Retention(RetentionPolicy.RUNTIME)
    @Constraint(validatedBy = EmailValidator.class)
    public @interface ValidEmail {
        String message() default "Invalid email format";
        Class<?>[] groups() default {};
        Class<? extends Payload>[] payload() default {};
    }
    
    // Validation example
    public static class UserRegistration {
        @ValidEmail
        private String email;
        
        @Size(min = 3, max = 50)
        @NotBlank
        private String username;
        
        @Min(18)
        private int age;
        
        // Constructors, getters, setters...
        public UserRegistration(String email, String username, int age) {
            this.email = email;
            this.username = username;
            this.age = age;
        }
        
        public String getEmail() { return email; }
        public String getUsername() { return username; }
        public int getAge() { return age; }
    }
    
    // Custom validator implementation
    public static class EmailValidator implements ConstraintValidator<ValidEmail, String> {
        @Override
        public boolean isValid(String email, ConstraintValidatorContext context) {
            if (email == null) return false;
            return email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
        }
    }
    
    // Validation demonstration
    public static void demonstrateValidation() {
        Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
        
        UserRegistration user = new UserRegistration("invalid-email", "ab", 16);
        
        Set<ConstraintViolation<UserRegistration>> violations = validator.validate(user);
        
        if (!violations.isEmpty()) {
            System.out.println("Validation errors:");
            for (ConstraintViolation<UserRegistration> violation : violations) {
                System.out.printf("- %s: %s%n", violation.getPropertyPath(), violation.getMessage());
            }
        }
    }
    
    // Helper methods
    private String getConfigValue(String property, String defaultValue) {
        // Simulate configuration lookup
        Map<String, String> config = Map.of(
            "database.url", "jdbc:postgresql://localhost/mydb",
            "cache.size", "200"
        );
        return config.getOrDefault(property, defaultValue);
    }
    
    private Object convertValue(String value, Class<?> targetType) {
        if (targetType == String.class) {
            return value;
        } else if (targetType == int.class || targetType == Integer.class) {
            return Integer.parseInt(value);
        } else if (targetType == boolean.class || targetType == Boolean.class) {
            return Boolean.parseBoolean(value);
        }
        return value;
    }
}

// Helper class
class UserProfile {
    private String userId;
    private String name;
    
    public UserProfile(String userId, String name) {
        this.userId = userId;
        this.name = name;
    }
    
    @Override
    public String toString() {
        return "UserProfile{userId='" + userId + "', name='" + name + "'}";
    }
}

// Annotation processor example (compile-time processing)
@SupportedAnnotationTypes("com.example.ConfigProperty")
@SupportedSourceVersion(SourceVersion.RELEASE_11)
public class ConfigurationProcessor extends AbstractProcessor {
    
    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        for (Element element : roundEnv.getElementsAnnotatedWith(ConfigProperty.class)) {
            ConfigProperty annotation = element.getAnnotation(ConfigProperty.class);
            
            // Generate configuration metadata at compile time
            processingEnv.getMessager().printMessage(
                Diagnostic.Kind.NOTE,
                "Found config property: " + annotation.value() + 
                " on field " + element.getSimpleName()
            );
            
            // Could generate configuration classes, validation code, etc.
        }
        return true;
    }
}
```
*Figyeld meg: advanced annotations lehetővé teszik framework-style programming-ot custom metadata-val és compile-time processing-gel.*

</div>

<div class="version-badges">
<span class="version-badge">Java 8</span>
<span class="version-badge">Repeatable Annotations</span>
<span class="version-badge">Annotation Processing</span>
</div>

<div class="concept-section tools">

<details>
<summary>🧰 <strong>Annotation related tools</strong></summary>

<div>

`@FunctionalInterface`, `@SafeVarargs`, `@SuppressWarnings`, Bean Validation API, Annotation Processors, Reflection API

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Advanced annotation pitfalls</strong></summary>

<div>

- Retention policy differences (SOURCE vs CLASS vs RUNTIME)
- Annotation processor vs runtime reflection performance
- Custom constraint validator implementation

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Kapcsolati térkép**  
`Metadata Programming` · `Compile-time Processing` · `Framework Integration` · `Bean Validation` · `AOP Patterns`

</div>

## Gyakori hibák és buktatók

### NullPointerException
A leggyakoribb futásidejű hiba Java-ban.

**Példa:**
```java
// ROSSZ
String text = getName(); // lehet null
int length = text.length(); // NPE ha text null

// JÓ - null check
String text = getName();
if (text != null) {
    int length = text.length();
}

// JÓ - Optional használata
Optional<String> text = getOptionalName();
int length = text.map(String::length).orElse(0);
```

### Equals és HashCode hibák
Ha equals()-t felüldefiniáljuk, hashCode()-ot is kell.

**Példa:**
```java
// ROSSZ - csak equals van felüldefiniálva
class Person {
    String name;
    
    @Override
    public boolean equals(Object obj) {
        return obj instanceof Person && 
               Objects.equals(name, ((Person) obj).name);
    }
    // hashCode() hiányzik! HashMap-ben nem működik jól
}

// JÓ - mindkettő implementálva
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

### Mutálható állapot
Nem thread-safe kód concurrent környezetben.

**Példa:**
```java
// ROSSZ - mutálható állapot
class Counter {
    private int count = 0;
    
    public void increment() {
        count++; // nem atomic művelet!
    }
    
    public int getCount() {
        return count;
    }
}

// JÓ - thread-safe
class SafeCounter {
    private final AtomicInteger count = new AtomicInteger(0);
    
    public void increment() {
        count.incrementAndGet();
    }
    
    public int getCount() {
        return count.get();
    }
}

// vagy synchronized
class SynchronizedCounter {
    private int count = 0;
    
    public synchronized void increment() {
        count++;
    }
    
    public synchronized int getCount() {
        return count;
    }
}
```

### Resource Management
A try-with-resources használata kötelező I/O műveletekhez.

**Példa:**
```java
// ROSSZ - resource leak
FileInputStream fis = null;
try {
    fis = new FileInputStream("file.txt");
    // olvasás
} catch (IOException e) {
    // hibakezelés
} finally {
    if (fis != null) {
        fis.close(); // lehet IOException!
    }
}

// JÓ - try-with-resources
try (FileInputStream fis = new FileInputStream("file.txt")) {
    // olvasás
} catch (IOException e) {
    // hibakezelés
    // automatikus close()
}
```

### String Concatenation
Cikluson belüli String konkatenáció ineffektív.

**Példa:**
```java
// ROSSZ - O(n²) complexity
String result = "";
for (int i = 0; i < 1000; i++) {
    result += "item" + i; // minden iterációban új String objektum
}

// JÓ - StringBuilder
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.append("item").append(i);
}
String result = sb.toString();

// vagy Stream API
String result = IntStream.range(0, 1000)
    .mapToObj(i -> "item" + i)
    .collect(Collectors.joining());
```

## Interjúkérdések

- **Mi a különbség a JDK, JRE és JVM között?** — *JDK fejlesztéshez, JRE futtatáshoz, JVM a bytecode futtatási környezete.*

- **Hogyan működik a Garbage Collection Java-ban?** — *Automatikusan felszabadítja a nem referált objektumokat, különböző algoritmusokkal (Serial, Parallel, G1).*

- **Mi az autoboxing és unboxing?** — *Primitív típusok automatikus konverziója wrapper osztályokká és vissza.*

- **Mik az equals() és hashCode() szabályai?** — *Ha equals() true, hashCode() egyenlő kell legyen. HashCode konzisztens legyen equals()-el.*

- **Mi a különbség final, finally és finalize között?** — *final - konstans/öröklés tiltás, finally - try-catch blokk után mindig fut, finalize - GC előtti cleanup.*

- **Hogyan működnek a Java Streams?** — *Lazy evaluation, intermediate és terminal műveletek láncolt végrehajtása.*

- **Mi a különbség abstract class és interface között?** — *Abstract class lehet konstruktor és implementáció, interface csak szerződés (Java 8-tól default metódusok).*

- **Mik a checked és unchecked exception-ök?** — *Checked - compile-time ellenőrzés (IOException), unchecked - runtime (RuntimeException).*

- **Hogyan működik a String pool?** — *String literálok egy közös memóriaterületen tárolódnak, ugyanaz a szöveg egy objektum.*

- **Mi a lambda expression és hogyan használod?** — *Rövid névtelen funkció szintaxis, főleg Stream API-val és funkcionális interfészekkel.*

- **Mik a generics előnyei?** — *Típusbiztonság compile-time-ban, kód újrafelhasználhatóság, ClassCastException elkerülése.*

- **Hogyan implementálnál Singleton pattern-t Java-ban?** — *Enum-mal legbiztonságosabb, vagy synchronized lazy initialization, vagy eager initialization.*
## Gyakorlati feladat (mini)

### Feladat: Jármű katalógus rendszer

1. **Abstract Vehicle osztály** létrehozása:
   - `brand` (String), `model` (String), `price` (double) mezők
   - Abstract `getType()` metódus
   - `equals()` és `hashCode()` implementáció

2. **Leszármazott osztályok**:
   - `Car` - `doors` (int) mezővel, `getType()` visszatér "Car"-ral
   - `Motorcycle` - `engineSize` (int) mezővel, `getType()` visszatér "Motorcycle"-ral

3. **Comparable implementáció**:
   - Ár alapú természetes rendezés

4. **VehicleCatalog osztály**:
   - `List<Vehicle> vehicles` mező
   - `addVehicle(Vehicle)`, `removeVehicle(Vehicle)` metódusok
   - Stream API használata szűrésekhez és rendezéshez

5. **JUnit tesztek**:
   - Minden publikus metódushoz unit teszt
   - Edge case-ek tesztelése (null értékek, üres lista)

**Példa használat:**
```java
VehicleCatalog catalog = new VehicleCatalog();
catalog.addVehicle(new Car("Toyota", "Camry", 25000, 4));
catalog.addVehicle(new Motorcycle("Honda", "CBR", 15000, 600));

// Ár szerinti rendezés
List<Vehicle> sortedByPrice = catalog.getVehiclesSortedByPrice();

// 20000 alatt szűrés
List<Vehicle> affordable = catalog.getVehiclesUnderPrice(20000);

// Típus szerinti csoportosítás
Map<String, List<Vehicle>> byType = catalog.getVehiclesGroupedByType();
```

*Kapcsolódó gyakorlati feladat: [OOP Alapok Java-ban](/exercises/java/01-oop-basics)*

## Kapcsolódó témák

- [Spring Framework](/theory/spring) - Dependency Injection és enterprise fejlesztés
- [Tesztelés](/theory/testing) - JUnit és Mockito használata
- [Java Gyakorlatok](/exercises/java) - Hands-on coding feladatok

## További olvasmányok

- [Oracle Java Documentation](https://docs.oracle.com/javase/) - Hivatalos dokumentáció
- [Effective Java by Joshua Bloch](https://www.oreilly.com/library/view/effective-java/9780134686097/) - Best practices
- [Java: The Complete Reference](https://www.oracle.com/java/technologies/javase/javase-tech-doc.html) - Részletes referencia
- [Baeldung Java Tutorials](https://www.baeldung.com/java-tutorial) - Gyakorlati példák
- [OpenJDK Project](https://openjdk.org/) - Nyílt forráskódú Java implementáció
