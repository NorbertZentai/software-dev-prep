# Interjú Felkészítő Checklist

## Technikai Interjú Felkészülés

### Java & Spring Framework

#### Alapvető Java kérdések
- [ ] **Mi a különbség a == és equals() között?**
  - `==` referenciákat hasonlít össze, `equals()` tartalmakat
- [ ] **Mi az a hashCode() és equals() kontraktus?**
  - Ha `a.equals(b)` true, akkor `a.hashCode() == b.hashCode()`
- [ ] **Mik a Java memória területek?**
  - Heap, Stack, Method Area, PC Register, Native Method Stack
- [ ] **Mi a különbség a ArrayList és LinkedList között?**
  - ArrayList: O(1) index hozzáférés, O(n) beszúrás/törlés közepén
  - LinkedList: O(n) hozzáférés, O(1) beszúrás/törlés referencia alapján

#### OOP Alapelvek
- [ ] **4 OOP alapelv:**
  - Encapsulation (kapszulázás)
  - Inheritance (öröklődés)
  - Polymorphism (többalakúság)
  - Abstraction (absztrakció)
- [ ] **SOLID alapelvek** (részletesen fentebb)

#### Spring Framework
- [ ] **Mi az a Dependency Injection?**
  - Objektumok függőségeit külső forrásból kapják meg
- [ ] **Spring Bean lifecycle:**
  - Instantiation → Populate properties → BeanNameAware → BeanFactoryAware → ApplicationContextAware → BeanPostProcessor → InitializingBean → Custom init → Ready to use
- [ ] **@Component vs @Service vs @Repository annotációk**
  - @Component: általános Spring bean
  - @Service: üzleti logika réteg
  - @Repository: adatelérési réteg, automatikus exception translation

### Adatbázis és SQL

#### SQL Alapok
- [ ] **JOIN típusok:**
  ```sql
  -- INNER JOIN: csak egyező rekordok
  SELECT * FROM users u INNER JOIN orders o ON u.id = o.user_id;
  
  -- LEFT JOIN: összes user, még ha nincs is order-je
  SELECT * FROM users u LEFT JOIN orders o ON u.id = o.user_id;
  
  -- RIGHT JOIN: összes order, még ha nincs is user-e
  SELECT * FROM users u RIGHT JOIN orders o ON u.id = o.user_id;
  
  -- FULL OUTER JOIN: mindkét oldal összes rekordja
  SELECT * FROM users u FULL OUTER JOIN orders o ON u.id = o.user_id;
  ```

- [ ] **Index típusok és használat:**
  - Primary Key: egyedi, nem null
  - Unique Index: egyedi értékek
  - Composite Index: több oszlopon
  - Partial Index: WHERE feltétellel

#### JPA/Hibernate
- [ ] **N+1 probléma és megoldása:**
  ```java
  // Probléma: 1 lekérdezés + N darab lazy loading
  List<User> users = userRepository.findAll();
  users.forEach(user -> user.getOrders().size()); // N további lekérdezés
  
  // Megoldás: Fetch join
  @Query("SELECT u FROM User u LEFT JOIN FETCH u.orders")
  List<User> findAllWithOrders();
  ```

- [ ] **Entity Lifecycle:**
  - New/Transient → Managed/Persistent → Detached → Removed

### Szoftver Architektúra

#### Design Patterns
- [ ] **Singleton Pattern** - mikor használd és mikor ne
- [ ] **Factory Pattern** - objektum létrehozás kapszulázása
- [ ] **Observer Pattern** - eseményvezérelt architektúra
- [ ] **Strategy Pattern** - algoritmus cserélhetősége futásidőben

#### Mikroszolgáltatások
- [ ] **Mikroszolgáltatások előnyei:**
  - Independent deployability
  - Technology diversity
  - Fault isolation
  - Team autonomy

- [ ] **Mikroszolgáltatások hátrányai:**
  - Network complexity
  - Data consistency challenges
  - Testing complexity
  - Operational overhead

### Algoritmusok és Adatstruktúrák

#### Gyakori algoritmus kérdések
- [ ] **Binary Search implementáció:**
  ```java
  public int binarySearch(int[] arr, int target) {
      int left = 0, right = arr.length - 1;
      while (left <= right) {
          int mid = left + (right - left) / 2;
          if (arr[mid] == target) return mid;
          if (arr[mid] < target) left = mid + 1;
          else right = mid - 1;
      }
      return -1;
  }
  ```

- [ ] **Merge Sort implementáció**
- [ ] **Reverse Linked List**
- [ ] **Valid Parentheses checker**

#### Komplexitás analízis
- [ ] **Big O notation:** O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ)
- [ ] **Space vs Time tradeoffs**

## Behavioral Interview Felkészülés

### STAR Method Gyakorlása

#### Gyakori kérdések és felkészülés
- [ ] **"Tell me about a challenging project"**
  - Situation: Konkrét projekt kontextus
  - Task: Az én felelősségem volt
  - Action: Konkrét lépések, döntések
  - Result: Mérhető eredmények

- [ ] **"Describe a time when you had to learn a new technology quickly"**
  - Készíts fel 2-3 konkrét példát

- [ ] **"How do you handle disagreements with team members?"**
  - Konfliktuskezelési stratégiák példákkal

- [ ] **"Describe a time when you made a mistake"**
  - Hibák, tanulságok, javítási intézkedések

### Példa STAR válaszok

#### "Describe a challenging technical problem you solved"
```
Situation: "A legacy monolith application was experiencing frequent outages during peak traffic periods, affecting 10,000+ active users."

Task: "As the senior developer, I was responsible for identifying the root cause and implementing a solution within 2 weeks."

Action: "I performed a comprehensive analysis:
- Profiled the application and found memory leaks in the user session handling
- Identified inefficient database queries causing connection pool exhaustion
- Implemented connection pooling optimization and query caching
- Created monitoring dashboards to track performance metrics
- Set up automated alerts for early detection"

Result: "The solution reduced average response time by 60%, eliminated outages completely for 6 months, and improved system capacity to handle 50% more concurrent users. The monitoring system prevented 3 potential outages by alerting before critical thresholds."
```

## Company Research

### Felkészülés lépései
- [ ] **Cég missziója, víziója, értékei**
- [ ] **Technológiai stack** (LinkedIn, Glassdoor, tech blog-ok)
- [ ] **Recent news** és fejlesztések
- [ ] **Termékek és szolgáltatások** alapos ismerete
- [ ] **Cég kultúra** (social media, employee reviews)

### Kérdések a cégnek
- [ ] "Milyen technikai kihívásokkal szembesül jelenleg a team?"
- [ ] "Hogyan néz ki egy tipikus sprint/fejlesztési ciklus?"
- [ ] "Milyen lehetőségek vannak szakmai fejlődésre?"
- [ ] "Hogyan mérték a sikerességet ebben a pozícióban?"
- [ ] "Mi a csapat legnagyobb technikai büszkesége az elmúlt évben?"

## Technical Interview Strategies

### Coding Interview Tips
- [ ] **Értsd meg a problémát teljesen** mielőtt kódolni kezdenél
- [ ] **Kérdezz clarifying question-öket**
- [ ] **Gondolkozz hangosan** - magyarázd el a gondolatmeneteted
- [ ] **Kezd egyszerű megoldással**, majd optimalizálj
- [ ] **Tesztelj példákkal** a kód írásakor
- [ ] **Beszélj a trade-off-okról** (time vs space complexity)

### System Design Interview
- [ ] **Követelmények tisztázása**
  - Functional requirements
  - Non-functional requirements (scale, performance)
- [ ] **High-level architecture**
  - Load balancers, web servers, databases
- [ ] **Detailed design**
  - API design, database schema, caching strategy
- [ ] **Scale considerations**
  - Bottlenecks identification and solutions

### Példa System Design: URL Shortener (mint bit.ly)

1. **Requirements:**
   - Functional: Shorten URL, redirect, custom aliases
   - Non-functional: 100M URLs/day, 100:1 read/write ratio, 99.9% availability

2. **Capacity estimation:**
   - Write: 100M / 24 / 3600 = ~1200 URLs/sec
   - Read: 120K redirections/sec
   - Storage: 100M * 365 * 5 years * 500 bytes = ~90TB

3. **System APIs:**
   ```
   POST /shorten
   Body: {url: "https://example.com", customAlias: "optional"}
   Response: {shortUrl: "http://short.ly/abc123"}
   
   GET /{shortUrl}
   Response: 302 redirect to original URL
   ```

## Salary Negotiation

### Előkészülés
- [ ] **Market research** (Glassdoor, Payscale, Stackoverflow Survey)
- [ ] **Saját értéked meghatározása:**
  - Years of experience
  - Unique skills/certifications
  - Previous accomplishments and impact

- [ ] **Total compensation megértése:**
  - Base salary
  - Bonus structure
  - Stock options/equity
  - Benefits (health, vacation, learning budget)

### Negotiation Script
```
"I'm very excited about this opportunity and I believe I can bring significant value to the team based on my experience with [relevant technologies/projects].

Based on my research and market rates for similar positions in this area, I was hoping we could discuss a salary range of [X to Y]. 

I'm also interested in understanding the complete compensation package including benefits, professional development opportunities, and potential for growth.

I'm open to discussion and want to find something that works well for both of us."
```

## Technical Questions Bank

### Java Specific
1. **Explain garbage collection in Java**
2. **What's the difference between HashMap and ConcurrentHashMap?**
3. **How does Spring Boot auto-configuration work?**
4. **Explain @Transactional annotation behavior**
5. **What are the differences between JPA and Hibernate?**

### General Programming
1. **How would you design a parking lot system?**
2. **Implement a LRU cache**
3. **Find the first non-repeating character in a string**
4. **Design a chat application backend**
5. **Explain eventual consistency vs strong consistency**

### Problem-Solving Examples

#### Two Sum Problem
```java
// Brute force: O(n²)
public int[] twoSumBrute(int[] nums, int target) {
    for (int i = 0; i < nums.length; i++) {
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == target) {
                return new int[]{i, j};
            }
        }
    }
    return new int[]{};
}

// Optimized with HashMap: O(n)
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[]{map.get(complement), i};
        }
        map.put(nums[i], i);
    }
    return new int[]{};
}
```

## Final Checklist

### 1 héttel az interjú előtt
- [ ] Átnézed a cég website-ját és tech blog-ját
- [ ] Gyakoroltad a coding problémákat (LeetCode, HackerRank)
- [ ] Felkészültél STAR method válaszokkal

### 1 nappal az interjú előtt
- [ ] Ellenőrzöd a meeting details-t (idő, platform, résztvevők)
- [ ] Előkészíted a kérdéseket a cégnek
- [ ] Teszteled a tech setup-ot (camera, microphone, internet)
- [ ] Álló laptop/külső monitor setup remote interjúhoz

### Az interjú napján
- [ ] Korán kelsz, van időd felkészülni
- [ ] Professzionális öltözködés (még remote esetén is)
- [ ] 10 perccel korábban csatlakozol
- [ ] Kéznél van víz, jegyzetfüzet, toll
- [ ] Telefonod silent módban van

### Az interjú után
- [ ] Thank you email küldése 24 órán belül
- [ ] Kapcsolatot tartasz a recruiter-rel
- [ ] Követed a feedback-et és a következő lépéseket

---

**Emlékeztető:** Az interjú egy kétirányú folyamat. Te is értékeled őket, mint ahogy ők is téged. Légy őszinte, mutasd be a legjobb énedet, és kérdezz sokat!