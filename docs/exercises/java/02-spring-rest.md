---
title: "Spring REST – alap endpoint"
difficulty: beginner
goals: ["@RestController", "DTO", "HTTP status"]
estimatedMinutes: 30
starter: {
  "stackblitz": "https://stackblitz.com/edit/spring-boot-rest-basic?file=src/main/java/com/example/demo/UserController.java",
  "codesandbox": "",
  "dbfiddle": ""
}
---

# Spring REST – Alap Endpoint

## Feladat leírása

Építs fel egy egyszerű REST API-t Spring Boot segítségével, amely felhasználói adatokat kezel. A feladat célja a Spring MVC és REST annotációk megismerése.

## Követelmények

1. **User DTO létrehozása**
   - Tartalmazza: id (Long), name (String), email (String), age (int)
   - Megfelelő konstruktorok, getter/setter metódusok
   - Validation annotációkkal (@NotBlank, @Email, @Min)

2. **UserController REST endpoint-ok**
   - GET `/api/users` - összes felhasználó lekérése
   - GET `/api/users/{id}` - egy felhasználó ID alapján
   - POST `/api/users` - új felhasználó létrehozása
   - PUT `/api/users/{id}` - felhasználó módosítása
   - DELETE `/api/users/{id}` - felhasználó törlése

3. **UserService implementálás**
   - In-memory tárolás (List<User>)
   - CRUD műveletek implementálása
   - Megfelelő exception handling (UserNotFoundException)

## Lépések

### 1. Projekt inicializálás
```bash
curl https://start.spring.io/starter.tgz \
  -d dependencies=web,validation \
  -d name=user-api \
  -d packageName=com.example.userapi | tar -xzvf -
```

### 2. User DTO létrehozása
```java
package com.example.userapi.dto;

import jakarta.validation.constraints.*;

public class UserDto {
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Invalid email format")
    private String email;

    @Min(value = 0, message = "Age must be positive")
    private int age;

    // konstruktorok, getterek, setterek...
}
```

### 3. Controller implementálás
```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        // implementáld...
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto user) {
        // implementáld...
    }

    // további endpoint-ok...
}
```

### 4. Service layer
```java
@Service
public class UserService {
    private List<UserDto> users = new ArrayList<>();
    private AtomicLong idGenerator = new AtomicLong(1);

    public List<UserDto> getAllUsers() {
        return users;
    }

    public UserDto createUser(UserDto user) {
        user.setId(idGenerator.getAndIncrement());
        users.add(user);
        return user;
    }

    // további CRUD műveletek...
}
```

## Megoldási tippek

- Használd a `@RestController` annotációt a `@Controller + @ResponseBody` helyett
- HTTP status kódok: 200 (OK), 201 (Created), 204 (No Content), 404 (Not Found)
- `ResponseEntity` segítségével testreszabd a HTTP response-t
- `@Valid` annotációval aktiváld a validation-t
- Exception handling `@ControllerAdvice` és `@ExceptionHandler` kombinációval

## Ellenőrző lista

- [ ] User DTO validation annotációkkal ellátva
- [ ] Összes CRUD endpoint implementálva
- [ ] Megfelelő HTTP status kódok visszaadása
- [ ] Exception handling (UserNotFoundException)
- [ ] Service layer elválasztva a controller-től
- [ ] Endpoint tesztelés Postman-nel vagy curl-lel
- [ ] @Valid annotáció használata POST/PUT endpoint-oknál

## Tesztelés

```bash
# Új felhasználó létrehozása
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "age": 30}'

# Összes felhasználó lekérése
curl http://localhost:8080/api/users

# Egy felhasználó lekérése
curl http://localhost:8080/api/users/1
```

## Következő lépések

- Adatbázis integráció Spring Data JPA-val
- Authentication és Authorization hozzáadása
- API dokumentáció Swagger-rel
- Integration tesztek írása @WebMvcTest-tel
