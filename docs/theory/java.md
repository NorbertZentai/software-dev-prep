# Java Alapok

## Rövid összefoglaló

A Java egy objektumorientált, platform-független programozási nyelv, amely a "write once, run anywhere" (egyszer írj, bárhol futtasd) elvre épül. A Java Virtual Machine (JVM) segítségével a lefordított bytecode bármely operációs rendszeren futtatható. A Java erős típusossága, automatikus memóriakezelése és gazdag ökoszisztémája teszi népszerűvé vállalati alkalmazások fejlesztésében. Fő buktatói közé tartozik a verbose syntax és a teljesítmény overhead a natív nyelvekhez képest.

## Fogalmak

### JVM (Java Virtual Machine) {#jvm-java-virtual-machine}
A Java bytecode futtatási környezete, amely platform-függetlenséget biztosít. A JVM értelmezi a bytecode-ot és natív gépi kódra fordítja futás közben (Just-In-Time compilation).

**Példa:**
```bash
# Java forráskód fordítása bytecode-dá
javac HelloWorld.java    # -> HelloWorld.class (bytecode)

# Bytecode futtatása JVM-en
java HelloWorld         # JVM értelmezi a bytecode-ot
```

Magyarázat: A JVM biztosítja, hogy ugyanaz a .class fájl Windows, Linux és macOS rendszereken is futjon anélkül, hogy újrafordítanánk.

### JDK (Java Development Kit) {#jdk-java-development-kit}
Fejlesztői eszközkészlet, amely tartalmazza a JVM-et, fordítót (javac) és fejlesztői eszközöket. Minden Java fejlesztéshez szükséges.

**Példa:**
```bash
# JDK tartalmazza ezeket az eszközöket:
javac    # Java compiler
java     # Java runtime
javadoc  # Documentation generator
jar      # Archive tool
```

Magyarázat: JDK = JRE + fejlesztői eszközök. Ha csak futtatni akarod a Java programokat, elég a JRE, de fejlesztéshez JDK kell.

### JRE (Java Runtime Environment) {#jre-java-runtime-environment}
Futtatási környezet, csak a JVM-et és alapvető osztálykönyvtárakat tartalmaz. Csak Java alkalmazások futtatására alkalmas.

**Példa:**
```java
// Ez a program csak JRE-vel is futtatható
public class SimpleApp {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
```

Magyarázat: JRE nem tartalmazza a javac fordítót, ezért új .java fájlokat nem tudsz lefordítani vele.

### Bytecode {#bytecode}
A Java fordító által generált köztes kód, amit a JVM értelmez. Platform-független bináris formátum.

**Példa:**
```java
// Java forráskód
public class Example {
    public static void main(String[] args) {
        int x = 42;
        System.out.println(x);
    }
}

// Bytecode (javap -c Example kimenet részlete):
// iconst_42      // Push 42 onto stack
// istore_1       // Store in local variable 1
// getstatic      // Get System.out reference
// iload_1        // Load variable 1
// invokevirtual  // Call println method
```

Magyarázat: A bytecode stack-alapú instrukciók sorozata, amit a JVM hajtja végre.

### Garbage Collector {#garbage-collector}
Automatikus memóriakezelő rendszer, amely felszabadítja a nem használt objektumokat. Különböző algoritmusokat használhat (Serial, Parallel, G1).

**Példa:**
```java
public class GCExample {
    public static void main(String[] args) {
        // Objektumok létrehozása
        String str1 = new String("Hello");
        String str2 = new String("World");

        // str1 referencia felülírása
        str1 = null; // "Hello" objektum GC kandidát lesz

        // GC kényszerítése (nem ajánlott production-ben)
        System.gc();
    }
}
```

Magyarázat: A GC automatikusan felszabadítja azokat az objektumokat, amelyekre nincs több referencia.

### Class {#class}
Objektum sablon, amely definiálja az adatokat (mezők) és metódusokat. Az objektumok egy osztály példányai.

**Példa:**
```java
public class BankAccount {
    // Mezők (instance variables)
    private double balance;
    private final String accountNumber;

    // Konstruktor
    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    // Metódusok
    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
        }
    }

    public double getBalance() {
        return balance;
    }
}
```

Magyarázat: A BankAccount osztály egy sablon, amiből konkrét számlaobjektumokat hozhatunk létre.

### Interface
Szerződés, amely meghatározza, mely metódusokat kell implementálni. Java 8-tól tartalmazhat default és static metódusokat is.

**Példa:**
```java
// Interface definíció
public interface Drawable {
    void draw(); // abstract method

    // Default method (Java 8+)
    default void print() {
        System.out.println("Printing...");
    }
}

// Interface implementáció
public class Circle implements Drawable {
    @Override
    public void draw() {
        System.out.println("Drawing a circle");
    }
}
```

Magyarázat: Az interface biztosítja, hogy minden implementáló osztály rendelkezzen a meghatározott metódusokkal.

### Package {#package}
Névtér mechanizmus a kapcsolódó osztályok csoportosítására. Segíti a kód szervezését és névütközések elkerülését.

**Példa:**
```java
// com/example/model/User.java
package com.example.model;

public class User {
    private String name;
}

// com/example/service/UserService.java
package com.example.service;

import com.example.model.User;

public class UserService {
    public void processUser(User user) {
        // ...
    }
}
```

Magyarázat: A package szerkezet tükrözi a könyvtárszerkezetet és logikusan csoportosítja az osztályokat.

### Exception {#exception}
Futásidejű hibák kezelésére szolgáló mechanizmus. Checked és unchecked típusokra osztható.

**Példa:**
```java
public class ExceptionExample {
    public void readFile(String filename) throws IOException {
        // Checked exception - kötelező kezelni
        FileReader file = new FileReader(filename);
    }

    public void divide(int a, int b) {
        if (b == 0) {
            // Unchecked exception - runtime error
            throw new IllegalArgumentException("Division by zero");
        }
        int result = a / b;
    }
}
```

Magyarázat: Az exception mechanizmus lehetővé teszi a hibák strukturált kezelését try-catch blokkok segítségével.

### Collections Framework {#collections-framework}
Beépített adatstruktúrák és algoritmusok (List, Set, Map). Egységes interfészt biztosít különböző adatstruktúrákhoz.

**Példa:**
```java
import java.util.*;

public class CollectionsExample {
    public static void main(String[] args) {
        // List - rendezett, duplikátumokat enged
        List<String> names = new ArrayList<>();
        names.add("Anna");
        names.add("Béla");
        names.add("Anna"); // duplikátum OK

        // Set - egyedi elemek
        Set<String> uniqueNames = new HashSet<>(names);
        System.out.println(uniqueNames); // [Anna, Béla]

        // Map - kulcs-érték párok
        Map<String, Integer> ages = new HashMap<>();
        ages.put("Anna", 25);
        ages.put("Béla", 30);
    }
}
```

Magyarázat: A Collections Framework egységes API-t biztosít különböző adatstruktúrákhoz, algoritmusokkal együtt.

### Thread {#thread}
Párhuzamos végrehajtási egység a multithreading támogatásához. Lehetővé teszi egyidejű feladatvégrehajtást.

**Példa:**
```java
public class ThreadExample {
    public static void main(String[] args) {
        // Thread létrehozása Runnable-lel
        Thread worker = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                System.out.println("Worker: " + i);
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });

        worker.start(); // Thread indítása

        // Main thread folytatása
        System.out.println("Main thread continues...");
    }
}
```

Magyarázat: A Thread lehetővé teszi párhuzamos végrehajtást, de figyelni kell a thread-safety-re és szinkronizációra.

### Stream API {#stream-api}
Funkcionális stílusú adatfeldolgozás Java 8-tól. Lehetővé teszi adatok deklaratív feldolgozását lazy evaluation-nel.

**Példa:**
```java
import java.util.*;
import java.util.stream.Collectors;

public class StreamExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Anna", "Béla", "Cecil", "Dóra", "Albert");

        // Funkcionális adatfeldolgozás
        List<String> result = names.stream()
            .filter(name -> name.startsWith("A"))     // Szűrés
            .map(String::toUpperCase)                  // Transzformáció
            .sorted()                                  // Rendezés
            .collect(Collectors.toList());             // Gyűjtés

        System.out.println(result); // [ALBERT, ANNA]

        // Aggregáció
        long count = names.stream()
            .filter(name -> name.length() > 4)
            .count();

        System.out.println("Long names: " + count); // 2
    }
}
```

Magyarázat: A Stream API lazy evaluation-t használ - a műveletek csak a terminal operation (pl. collect) hívásakor hajtódnak végre.

### OOP Alapelvek {#oop-alapelvek}

#### Encapsulation (Enkapszuláció)
Az objektum belső állapotának elrejtése és csak definiált interfészeken keresztüli hozzáférés biztosítása.

**Példa:**
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

Magyarázat: A balance mező private, csak a definiált metódusokon keresztül érhető el, így biztosítva az adatok integritását.

#### Inheritance (Öröklődés)
Új osztályok létrehozása meglévő osztályok alapján, ahol a gyermek osztály örökli a szülő tulajdonságait és metódusait.

**Példa:**
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

Magyarázat: A Car osztály örökli a Vehicle tulajdonságait és felüldefiniálhatja a metódusokat.

#### Polymorphism (Polimorfizmus)
Ugyanazon interfész különböző implementációi, ahol futásidőben dől el, melyik konkrét implementáció hívódik meg.

**Példa:**
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

Magyarázat: Ugyanaz a `Shape` referencia különböző típusú objektumokra mutathat, és futásidőben dől el, melyik implementáció hívódik.

### SOLID Alapelvek {#solid-alapelvek}
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

### Equals és HashCode {#equals-es-hashcode}
Ha felüldefinijáljuk az equals() metódust, kötelező a hashCode() metódust is felüldefinijálni, hogy konzisztensek legyenek.

**Példa:**
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

Magyarázat: Az equals() és hashCode() szabálya: ha két objektum equals()-el egyenlő, akkor hashCode()-uk is egyenlő kell legyen.

### Lambda Expressions {#lambda-expressions}
Rövid névtelen funkciók, amelyek főleg funkcionális interfészekkel és Stream API-val használatosak Java 8-tól.

**Példa:**
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

Magyarázat: A lambda kifejezések tömör szintaxist biztosítanak funkcionális interfészek implementálásához.

### Generics {#generics}
Típusparaméterek használata az osztályokban és metódusokban, amely fordítási idejű típusbiztonságot és kód újrafelhasználhatóságot biztosít.

**Példa:**
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

Magyarázat: A generics típusbiztonságot nyújtanak fordítási időben és eliminálják a explicit casting szükségességét.

### Immutability {#immutability}
Az immutable objektumok olyan objektumok, amelyek létrehozás után nem változtathatók meg. Thread-safe-ek és hashelhetőek.

**Példa:**
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

Magyarázat: Az immutable objektumok biztonságosak concurrent környezetben és könnyen hashelhetőek HashMap kulcsként.

### Autoboxing és Unboxing {#autoboxing-es-unboxing}
Primitív típusok automatikus konverziója wrapper osztályokká (autoboxing) és vissza (unboxing).

**Példa:**
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

Magyarázat: Az autoboxing/unboxing kényelmes, de figyelni kell a null értékekre és a teljesítmény hatásokra.

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
