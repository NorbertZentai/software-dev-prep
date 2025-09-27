# MVP Promptok – Menüsorrend és tartalmi követelmények

Ez a fájl belső dokumentáció. Nem jelenik meg a nyilvános oldalon.

Megjegyzés: az egységes kereshetőség miatt itt is `###` szintű fejezeteket használunk.

---

### Menü sorrend – Theory fül

Ajánlott sorrend a tanulási útvonalhoz (első a kezdőbb témák, aztán haladóbbak):

1. Java Alapok (#/theory/java)
2. Spring Framework (#/theory/spring)
3. Tesztelés (#/theory/testing)
4. SQL & Adatbázis (#/theory/sql)
5. Web Development (#/theory/web)
6. Frontend (React, TypeScript, Node.js) (#/theory/frontend)
7. Szoftver Architektúra (#/theory/arch)
8. Git & Verziókezelés (#/theory/git)
9. CI/CD & DevOps (#/theory/devops)
10. Soft Skills (#/theory/softskills)

---

## Java Alapok

### Fogalmak

* JVM (Java Virtual Machine)
* JDK (Java Development Kit)
* JRE (Java Runtime Environment)
* Bytecode
* Garbage Collector
* Class
* Interface
* Package
* Exception
* Collections Framework
* Generics
* Thread
* Stream API
* OOP Alapelvek (SOLID)
* Immutability

### Tartalom

**Összefoglaló:** Miért fontos a Java ökoszisztéma.

**Példa – JVM:**

```bash
# Java forráskód fordítása bytecode-dá
javac HelloWorld.java   # -> HelloWorld.class (bytecode)

# Bytecode futtatása JVM-en
java HelloWorld         # JVM értelmezi a bytecode-ot
```

**Kódrészletek:** Osztály, kivételkezelés, Stream példa.

**Hibák:** NullPointerException, equals/hashCode, mutálható állapot.

**Interjúkérdések:**

* Mi a különbség interface és abstract class között?
* Hogyan működik a garbage collector?
* Mi az immutability?

**Gyakorlat:** Kis OOP modell + gyűjteményes feladat.

**Linkek:** Java docs, Effective Java.

---

## Spring Framework

### Fogalmak

* Bean
* @Component
* @Service
* @Repository
* @Configuration
* @ConfigurationProperties
* @Autowired (constructor injection)
* @RestController
* Profilok
* RestTemplate / Feign
* Validation
* Spring Data JPA
* Transaction (@Transactional)
* Actuator

### Tartalom

**Összefoglaló:** Spring Boot, DI, autokonfiguráció.

**Példa – REST Controller:**

```java
@RestController
@RequestMapping("/api")
class HelloController {
    @GetMapping("/hello")
    String hello() {
        return "Hello World";
    }
}
```

**Hibák:** God service, rossz package scanning, stateful bean.

**Interjúkérdések:**

* Hogyan működik a dependency injection?
* Mi a különbség a @Component és @Bean között?

**Gyakorlat:** Mini REST API memória tárolóval.

**Linkek:** Spring Docs, Baeldung.

---

## Tesztelés

### Fogalmak

* Unit Test
* Integration Test
* JUnit 5
* Assertions
* Test lifecycle
* Mockito
* Testcontainers
* @WebMvcTest / @DataJpaTest

### Tartalom

**Összefoglaló:** Miért tesztelünk, tesztpiramis.

**Példa – JUnit teszt:**

```java
@Test
void addNumbers() {
    Calculator calc = new Calculator();
    assertEquals(4, calc.add(2, 2));
}
```

**Példa – Mockito:**

```java
when(repo.findById(1L)).thenReturn(Optional.of(user));
```

**Hibák:** Fragile tesztek, túl sok mock.

**Interjúkérdések:**

* Hogyan mockolsz egy repository-t?
* Mi a különbség a unit és integration test között?

**Gyakorlat:** Írj unit tesztet egy service osztályhoz.

**Linkek:** JUnit, Mockito, Spring Testing.

---

## SQL & Adatbázis

### Fogalmak

* CRUD
* DDL/DML
* JOIN-ok (INNER/LEFT/RIGHT)
* Indexek
* Normalizálás
* Tranzakciók
* Izolációs szintek
* ACID
* Explain plan

### Tartalom

**Összefoglaló:** Relációs modellek.

**Példa – JOIN:**

```sql
SELECT u.name, o.amount
FROM users u
INNER JOIN orders o ON u.id = o.user_id;
```

**Hibák:** SELECT *, N+1 query.

**Interjúkérdések:**

* Mi az ACID?
* Mi a különbség az INNER és LEFT JOIN között?

**Gyakorlat:** Users/Orders/Product séma + 5 query.

**Linkek:** Postgres/MySQL docs, sqlbolt.

---

## Web Development

### Fogalmak

* HTML
* CSS (Flex, Grid)
* JavaScript (ES6+)
* HTTP metódusok
* HTTP státuszkódok
* JSON
* CORS
* Fetch API / AJAX
* Accessibility

### Tartalom

**Összefoglaló:** Böngésző–szerver kommunikáció.

**Példa – Fetch:**

```js
const res = await fetch("/api/data");
const json = await res.json();
```

**Hibák:** CORS félreértés, blocking JS.

**Interjúkérdések:**

* Mi a különbség a GET és POST között?
* Mit jelent a 404 és 500 státuszkód?

**Gyakorlat:** Statikus oldal + API hívás.

**Linkek:** MDN, WHATWG.

---

## Frontend (React, TypeScript, Node.js)

### Fogalmak

* Node.js
* npm
* React component
* Props/State
* Hooks (useState, useEffect)
* Állapotkezelés (Redux, Zustand, React Query)
* TypeScript: type, interface
* Tailwind CSS
* shadcn/ui
* Framer Motion
* Cypress

### Tartalom

**Összefoglaló:** Modern frontend ökoszisztéma.

**Példa – React component:**

```tsx
function Hello() {
  const [name, setName] = useState("World");
  return <h1>Hello {name}</h1>;
}
```

**Hibák:** Rossz state-kezelés, nem típusos kód.

**Interjúkérdések:**

* Mi a különbség a state és a prop között?
* Mire való a useEffect?

**Gyakorlat:** React form + API call.

**Linkek:** React Docs, TypeScript Docs.

---

## Szoftver Architektúra

### Fogalmak

* Monolith
* Microservices
* Rétegek (layered architecture)
* Port–Adapter (Hexagonal)
* Bounded Context
* Idempotencia
* Aszinkron üzenetkezelés
* Cache
* Resiliency (retry, circuit breaker)
* Observability

### Tartalom

**Összefoglaló:** Miért fontos az architektúra.

**Példa diagram:** egyszerű komponenstérkép.

**Hibák:** Overengineering, chatty services.

**Interjúkérdések:**

* Mi a különbség monolith és microservice között?
* Hogyan oldanál meg resiliency-t?

**Gyakorlat:** Komponensbontás feladat.

**Linkek:** Martin Fowler, 12-factor.

---

## Git & Verziókezelés

### Fogalmak

* Repo
* Commit
* Branch
* Merge vs Rebase
* Pull Request / Code Review
* Tagging
* Release flow
* GitFlow / Trunk-based

### Tartalom

**Összefoglaló:** Együttműködés verziókezelővel.

**Példa – parancsok:**

```bash
git checkout -b feature-x
git add .
git commit -m "new feature"
git push origin feature-x
```

**Hibák:** Force push, diverged branches.

**Interjúkérdések:**

* Mi a különbség a merge és rebase között?
* Mire való a cherry-pick?

**Gyakorlat:** Branching szimuláció.

**Linkek:** Pro Git könyv.

---

## CI/CD & DevOps

### Fogalmak

* CI/CD pipeline
* GitLab CI
* Build → Test → Deploy
* Docker
* Rest API integráció
* Monitoring

### Tartalom

**Összefoglaló:** Automatizált build és release.

**Példa – GitLab CI config:**

```yaml
stages:
  - build
  - test
  - deploy

build-job:
  stage: build
  script: mvn clean package
```

**Hibák:** Manuális deploy, nem verziózott build.

**Interjúkérdések:**

* Mi a CI célja?
* Hogyan működik a Docker image build?

**Gyakorlat:** Egyszerű pipeline készítése.

**Linkek:** GitLab CI docs, Docker docs.

---

## Soft Skills

### Fogalmak

* Kommunikáció
* Csapatmunka
* Ownership
* STAR módszer
* Feedback
* Konfliktuskezelés
* Időmenedzsment
* Prioritáskezelés

### Tartalom

**Összefoglaló:** Soft skillek jelentősége.

**Példa – STAR:**

* Situation
* Task
* Action
* Result

**Hibák:** Mellébeszélés, túl technikai válasz.

**Interjúkérdések:**

* Mesélj egy példát hibáról és javításáról.
* Hogyan kezeled a határidőcsúszást?

**Gyakorlat:** Írd le 2 saját STAR történeted.

**Linkek:** ajánlott cikkek/videók.

---

## Összefoglaló

Ez az MVP terv a teljes felkészülési anyagot lefedi: backend (Java, Spring, SQL), frontend (React, TS), architektúra, DevOps, Git és soft skills. A struktúra bal oldalt fogalmakat, jobb oldalt részletes tartalmat tartalmaz minden témához.
