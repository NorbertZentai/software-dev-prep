# Java Alapok

## Bevezetés

A Java egy objektumorientált, platform-független programozási nyelv, amely 1995-ben jelent meg. A "Write Once, Run Anywhere" (WORA) filozófiával készült, ami azt jelenti, hogy a Java kód bárhol futtatható, ahol elérhető a Java Virtual Machine (JVM).

## Alapvető fogalmak

### JVM, JRE, JDK

- **JVM (Java Virtual Machine)**: A Java bytecode futtatókörnyezete
- **JRE (Java Runtime Environment)**: JVM + könyvtárak futtatáshoz  
- **JDK (Java Development Kit)**: JRE + fejlesztői eszközök

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