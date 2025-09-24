# Java Alapok

## Rövid összefoglaló

A Java egy objektumorientált, platform-független programozási nyelv, amely a "write once, run anywhere" (egyszer írj, bárhol futtasd) elvre épül. A Java Virtual Machine (JVM) segítségével a lefordított bytecode bármely operációs rendszeren futtatható. A Java erős típusossága, automatikus memóriakezelése és gazdag ökoszisztémája teszi népszerűvé vállalati alkalmazások fejlesztésében. Fő buktatói közé tartozik a verbose syntax és a teljesítmény overhead a natív nyelvekhez képest.

## Fogalmak

- **JVM (Java Virtual Machine)** – A Java bytecode futtatási környezete, amely platform-függetlenséget biztosít.
- **JDK (Java Development Kit)** – Fejlesztői eszközkészlet, amely tartalmazza a JVM-et, fordítót és eszközöket.
- **JRE (Java Runtime Environment)** – Futtatási környezet, csak a JVM-et és alapvető osztálykönyvtárakat tartalmaz.
- **Bytecode** – A Java fordító által generált köztes kód, amit a JVM értelmez.
- **Garbage Collector** – Automatikus memóriakezelő rendszer, amely felszabadítja a nem használt objektumokat.
- **Class** – Objektum sablon, amely definiálja az adatokat és metódusokat.
- **Interface** – Szerződés, amely meghatározza, mely metódusokat kell implementálni.
- **Package** – Névtér mechanizmus a kapcsolódó osztályok csoportosítására.
- **Exception** – Futásidejű hibák kezelésére szolgáló mechanizmus.
- **Collections Framework** – Beépített adatstruktúrák és algoritmusok (List, Set, Map).
- **Thread** – Párhuzamos végrehajtási egység a multithreading támogatásához.
- **Stream API** – Funkcionális stílusú adatfeldolgozás Java 8-tól.

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

## Példák

### Példa 1 – Alapvető OOP minta

```java
public class BankAccount {
    private double balance;
    private final String accountNumber;
    
    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }
    
    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
        } else {
            throw new IllegalArgumentException("Amount must be positive");
        }
    }
    
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            this.balance -= amount;
        } else {
            throw new IllegalArgumentException("Invalid withdrawal amount");
        }
    }
    
    public double getBalance() {
        return balance;
    }
    
    public String getAccountNumber() {
        return accountNumber;
    }
}
```

### Példa 2 – Gyakori hiba: equals() és hashCode() nem konzisztens

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

## Gyakorlati feladat (mini)

1. Hozz létre egy `Vehicle` abstract osztályt `brand`, `model` mezőkkel
2. Implementálj `Car` és `Motorcycle` leszármazott osztályokat
3. Adj hozzá `Comparable<Vehicle>` interfészt ár alapú rendezéshez
4. Írj unit testeket JUnit-tal a főbb metódusokra
5. Használj Stream API-t járművek szűrésére és rendezésére

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
- **Primitive**: int, double, boolean, char - stack-en tárolva, érték szerinti átadás
- **Reference**: Object, String, Arrays - heap-en tárolva, referencia szerinti átadás
- **Autoboxing/Unboxing**: int ↔ Integer automatikus konverzió

### Garbage Collection
- **Automatikus memóriakezelés**: Nem referált objektumok automatikus törlése
- **Generational GC**: Young (Eden, Survivor), Old Generation optimalizáció
- **GC Algorithms**: Serial, Parallel, G1, ZGC - különböző teljesítmény karakterisztikák

## Gyakori kérdések

**Mi a különbség == és equals() között?**
A == referenciákat hasonlít össze (ugyanaz az objektum?), az equals() tartalmat (logikailag egyenlő?). String esetén mindig equals()-t használj.

**Mikor használj StringBuilder vs String concatenation?**
String immutable, concat új objektumot hoz létre. StringBuilder mutálható buffer - loops-ban és sok concatenation esetén hatékonyabb.

**Mi az interface vs abstract class különbség?**
Interface: multiple inheritance, csak konstansok és default/static metódusok. Abstract class: single inheritance, lehet instance változó és konstruktor.

**Hogyan működik a try-with-resources?**
Automatikusan lezárja az AutoCloseable resource-okat, még exception esetén is. Tisztább kód, nincs finally block szükséglet.

**Mi a static kulcsszó szerepe?**
Class-hoz tartozik, nem instance-hoz. Static method nem férhet hozzá instance változókhoz. Static block class loading-kor fut le egyszer.

### Objektumorientált programozás

#### 1. Osztályok és objektumok

```java
public class Person {
    private String name;
    private int age;

    // Konstruktor
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Getter és Setter metódusok
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

#### 2. Öröklődés (Inheritance)

```java
public class Employee extends Person {
    private String jobTitle;

    public Employee(String name, int age, String jobTitle) {
        super(name, age); // Szülő konstruktor hívása
        this.jobTitle = jobTitle;
    }

    public String getJobTitle() {
        return jobTitle;
    }
}
```

#### 3. Polimorfizmus

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
```

#### 4. Enkapszuláció

Az osztály belső állapotának elrejtése és csak definiált interfészeken keresztüli hozzáférés biztosítása.

## Adattípusok

### Primitív típusok

| Típus | Méret | Tartomány | Alapértelmezett |
|-------|-------|-----------|-----------------|
| byte | 8 bit | -128 to 127 | 0 |
| short | 16 bit | -32,768 to 32,767 | 0 |
| int | 32 bit | -2³¹ to 2³¹-1 | 0 |
| long | 64 bit | -2⁶³ to 2⁶³-1 | 0L |
| float | 32 bit | IEEE 754 | 0.0f |
| double | 64 bit | IEEE 754 | 0.0d |
| boolean | 1 bit | true/false | false |
| char | 16 bit | Unicode | '\u0000' |

### Reference típusok

- **String**: szöveg kezelése
- **Arrays**: tömbök
- **Objects**: objektumok

## Vezérlési szerkezetek

### Feltételes utasítások

```java
if (condition) {
    // kód
} else if (anotherCondition) {
    // kód
} else {
    // kód
}

// Ternary operátor
String result = (age >= 18) ? "felnőtt" : "kiskorú";
```

### Ciklusok

```java
// For ciklus
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}

// Enhanced for ciklus
int[] numbers = {1, 2, 3, 4, 5};
for (int number : numbers) {
    System.out.println(number);
}

// While ciklus
while (condition) {
    // kód
}

// Do-while ciklus
do {
    // kód
} while (condition);
```

## Exception Handling

### Try-catch-finally

```java
try {
    // Potenciálisan hibás kód
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Nullával osztás hiba: " + e.getMessage());
} catch (Exception e) {
    System.out.println("Általános hiba: " + e.getMessage());
} finally {
    // Mindig lefut
    System.out.println("Cleanup kód");
}
```

### Checked vs Unchecked Exceptions

- **Checked**: Fordítási időben ellenőrzött (IOException, SQLException)
- **Unchecked**: Futási időben jelentkezik (RuntimeException, NullPointerException)

## Collections Framework

### Főbb interfészek

- **List**: Rendezett, indexelt gyűjtemény (ArrayList, LinkedList)
- **Set**: Egyedi elemek gyűjteménye (HashSet, TreeSet)
- **Map**: Kulcs-érték párok (HashMap, TreeMap)

```java
// List példa
List<String> names = new ArrayList<>();
names.add("Anna");
names.add("Béla");

// Set példa
Set<Integer> uniqueNumbers = new HashSet<>();
uniqueNumbers.add(1);
uniqueNumbers.add(2);

// Map példa
Map<String, Integer> ages = new HashMap<>();
ages.put("Anna", 25);
ages.put("Béla", 30);
```

## Stream API (Java 8+)

```java
List<String> names = Arrays.asList("Anna", "Béla", "Cecil", "Dóra");

List<String> result = names.stream()
    .filter(name -> name.startsWith("A"))
    .map(String::toUpperCase)
    .collect(Collectors.toList());
```

## Lambda kifejezések

```java
// Régi módszer
Comparator<String> oldComparator = new Comparator<String>() {
    @Override
    public int compare(String a, String b) {
        return a.compareTo(b);
    }
};

// Lambda kifejezéssel
Comparator<String> newComparator = (a, b) -> a.compareTo(b);

// Még rövidebb
Comparator<String> shortComparator = String::compareTo;
```

## Best Practices

### 1. Naming conventions
- Osztályok: PascalCase (Person, BankAccount)
- Metódusok és változók: camelCase (getName, totalAmount)
- Konstansok: UPPER_SNAKE_CASE (MAX_SIZE, DEFAULT_VALUE)

### 2. SOLID alapelvek

- **S**ingle Responsibility Principle
- **O**pen/Closed Principle
- **L**iskov Substitution Principle
- **I**nterface Segregation Principle
- **D**ependency Inversion Principle

### 3. Clean Code

```java
// Rossz
public void processData(List<String> d) {
    for (String s : d) {
        if (s.length() > 5) {
            System.out.println(s.toUpperCase());
        }
    }
}

// Jó
public void printLongNamesInUpperCase(List<String> names) {
    for (String name : names) {
        if (isNameLong(name)) {
            System.out.println(name.toUpperCase());
        }
    }
}

private boolean isNameLong(String name) {
    return name.length() > 5;
}
```

## Gyakori hibák

1. **NullPointerException**: null referencia használata
2. **Memory leaks**: objektumok nem megfelelő felszabadítása
3. **String concatenation**: StringBuilder használata ciklusokban
4. **== vs equals()**: referencia vs tartalom összehasonlítás
5. **Resource management**: try-with-resources használata

## Következő lépések

- [Spring Framework](./spring.md)
- [Tesztelés Java-ban](./testing.md)
- [Java gyakorlatok](../exercises/java/)

---

*Ez az anyag a Java alapjait tárgyalja. A részletesebb témákért tekintsd meg a kapcsolódó gyakorlatokat és kvízeket!*
