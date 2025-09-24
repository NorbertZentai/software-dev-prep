# 📋 Projekt Setup Checklist

## Alapvető fejlesztői környezet

### 1. Java fejlesztés
- [ ] **JDK 11 vagy újabb** telepítve
- [ ] `java -version` parancs működik
- [ ] `JAVA_HOME` környezeti változó beállítva
- [ ] **Maven** vagy **Gradle** telepítve

### 2. IDE beállítás
- [ ] **IntelliJ IDEA** vagy **Eclipse** vagy **VS Code**
- [ ] Java plugin-ok telepítve
- [ ] Code formatter beállítva
- [ ] Git integráció működik

### 3. Verziókezelés
- [ ] **Git** telepítve és beállítva
- [ ] SSH kulcs generálva a Git szolgáltatóhoz
- [ ] `.gitignore` fájl létrehozva Java projekthez
- [ ] Git hook-ok beállítva (opcionális)

## Spring Boot projekt indítása

### 1. Projekt generálás
- [ ] **Spring Initializr** használata (https://start.spring.io/)
- [ ] Megfelelő függőségek kiválasztása:
  - Spring Web
  - Spring Data JPA
  - H2 Database (fejlesztéshez)
  - Spring Boot DevTools
  - Spring Security (ha szükséges)
  - Validation
  - Actuator (monitoring)

### 2. Projekt struktúra
```
src/
├── main/
│   ├── java/
│   │   └── com/example/demo/
│   │       ├── DemoApplication.java
│   │       ├── controller/
│   │       ├── service/
│   │       ├── repository/
│   │       ├── model/
│   │       └── config/
│   └── resources/
│       ├── application.properties
│       ├── static/
│       └── templates/
└── test/
    └── java/
        └── com/example/demo/
```

- [ ] Package szerkezet kialakítva
- [ ] Main application osztály létrehozva
- [ ] Application.properties konfigurálva

### 3. Adatbázis beállítás
- [ ] **H2** in-memory DB fejlesztéshez
- [ ] **PostgreSQL** vagy **MySQL** production-höz
- [ ] Connection string beállítva
- [ ] JPA entitások létrehozva
- [ ] Repository réteg implementálva

### 4. Tesztelés beállítása
- [ ] **JUnit 5** dependency hozzáadva
- [ ] **Mockito** teszteléshez
- [ ] **TestContainers** integrációs tesztekhez (opcionális)
- [ ] Test profilok beállítva

## Docker és konténerizáció

### 1. Docker fájlok
- [ ] **Dockerfile** létrehozva
- [ ] **docker-compose.yml** helyi fejlesztéshez
- [ ] `.dockerignore` fájl létrehozva

### 2. Dockerfile példa
```dockerfile
FROM openjdk:11-jre-slim
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

## CI/CD beállítása

### 1. GitHub Actions
- [ ] `.github/workflows/` mappa létrehozva
- [ ] Build workflow beállítva
- [ ] Test workflow beállítva
- [ ] Deploy workflow beállítva (opcionális)

### 2. Minta workflow
```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-java@v2
        with:
          java-version: '11'
      - run: ./mvnw test
```

## Kód minőség és dokumentáció

### 1. Code Quality
- [ ] **SonarLint** vagy **SonarQube** beállítva
- [ ] **Checkstyle** konfigurálva
- [ ] **SpotBugs** telepítve
- [ ] Code coverage mérés (JaCoCo)

### 2. Dokumentáció
- [ ] **README.md** létrehozva
- [ ] API dokumentáció (OpenAPI/Swagger)
- [ ] Kód kommentálása
- [ ] Changelog vezetése

## Security beállítások

### 1. Alapvető biztonság
- [ ] **Spring Security** beállítva
- [ ] HTTPS konfiguráció
- [ ] Environment változók titkos adatokhoz
- [ ] Input validáció implementálva

### 2. Dependency management
- [ ] **OWASP Dependency Check** beállítva
- [ ] Dependency-k rendszeres frissítése
- [ ] Security alert-ek figyelése

## Monitoring és Logging

### 1. Logging
- [ ] **Logback** konfiguráció
- [ ] Structured logging (JSON)
- [ ] Log level-ek beállítva
- [ ] Sensitive data kiszűrése

### 2. Monitoring
- [ ] **Spring Boot Actuator** beállítva
- [ ] Health check endpoint-ok
- [ ] Metrics gyűjtése
- [ ] Application Performance Monitoring (APM) opcionális

## Környezet-specifikus konfigurációk

### 1. Profilok
- [ ] **application-dev.properties**
- [ ] **application-test.properties**
- [ ] **application-prod.properties**

### 2. Environment variables
- [ ] Database kapcsolati adatok
- [ ] API kulcsok és titkok
- [ ] Feature flag-ek

## Végső ellenőrzés

### 1. Funkcionalitás
- [ ] Alkalmazás elindul hiba nélkül
- [ ] Alapvető API endpoint-ok működnek
- [ ] Adatbázis kapcsolat stabil
- [ ] Tesztek futnak és átmennek

### 2. Dokumentáció
- [ ] README tartalmazza a futtatási utasításokat
- [ ] API dokumentáció elérhető
- [ ] Docker futtatási utasítások megvannak

### 3. Kész a fejlesztésre!
- [ ] Git repository push-olva
- [ ] CI/CD pipeline működik
- [ ] Csapat tagjai hozzáférnek a projekthez
- [ ] Development workflow dokumentálva

---

💡 **Tipp:** Használd ezt a checklist-et minden új projekt indításakor, és alakítsd a saját igényeidhez!
