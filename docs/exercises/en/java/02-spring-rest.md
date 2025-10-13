---
title: "Spring REST – Basic Endpoints"
difficulty: beginner
goals: 
  - "@RestController"
  - "DTO"
  - "HTTP status"
estimatedMinutes: 40
starter:
  stackblitz: "https://stackblitz.com/edit/spring-boot-rest-basic?file=src/main/java/com/example/demo/UserController.java"
  codesandbox: ""
  dbfiddle: ""
---

# Spring REST – Basic Endpoints

## Task Description

Build a simple REST API using Spring Boot that manages user data. The goal is to learn Spring MVC and REST annotations.

## Requirements

1. **Create User DTO**
   - Contains: id (Long), name (String), email (String), age (int)
   - Proper constructors, getter/setter methods
   - Validation annotations (@NotBlank, @Email, @Min)

2. **UserController REST endpoints**
   - GET `/api/users` - retrieve all users
   - GET `/api/users/{id}` - retrieve a user by ID
   - POST `/api/users` - create new user
   - PUT `/api/users/{id}` - update user
   - DELETE `/api/users/{id}` - delete user

3. **UserService implementation**
   - In-memory storage (List<User>)
   - Implement CRUD operations
   - Proper exception handling (UserNotFoundException)

## Steps

### 1. Project Initialization
```bash
curl https://start.spring.io/starter.tgz \
  -d dependencies=web,validation \
  -d name=user-api \
  -d packageName=com.example.userapi | tar -xzvf -
```

### 2. Create User DTO
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

    // constructors, getters, setters...
}
```

### 3. Controller Implementation
```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        // implement...
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto user) {
        // implement...
    }

    // additional endpoints...
}
```

### 4. Service Layer
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

    // additional CRUD operations...
}
```

## Solution Tips

- Use `@RestController` annotation instead of `@Controller + @ResponseBody`
- HTTP status codes: 200 (OK), 201 (Created), 204 (No Content), 404 (Not Found)
- Use `ResponseEntity` to customize HTTP response
- Use `@Valid` annotation to activate validation
- Exception handling with `@ControllerAdvice` and `@ExceptionHandler` combination

## Checklist

- [ ] User DTO with validation annotations
- [ ] All CRUD endpoints implemented
- [ ] Proper HTTP status codes returned
- [ ] Exception handling (UserNotFoundException)
- [ ] Service layer separated from controller
- [ ] Endpoint testing with Postman or curl
- [ ] @Valid annotation used on POST/PUT endpoints

## Testing

```bash
# Create new user
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "age": 30}'

# Get all users
curl http://localhost:8080/api/users

# Get one user
curl http://localhost:8080/api/users/1
```

## Next Steps

- Database integration with Spring Data JPA
- Add Authentication and Authorization
- API documentation with Swagger
- Write integration tests with @WebMvcTest