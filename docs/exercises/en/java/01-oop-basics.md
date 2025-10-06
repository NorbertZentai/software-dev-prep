# OOP Basics in Java

## Objectives
- Understand OOP principles in Java
- Practice encapsulation, inheritance, and polymorphism
- Create classes with proper design

## Exercise 1: Basic Class Design

Create a `Person` class with the following requirements:

### Requirements
- Private fields: `name`, `age`, `email`
- Constructor that takes all three parameters
- Getter methods for all fields
- Setter methods with validation:
  - Age must be between 0 and 150
  - Email must contain '@' symbol
- `toString()` method that returns formatted string

### Solution Template
```java
public class Person {
    // TODO: Add private fields
    
    // TODO: Add constructor
    
    // TODO: Add getters and setters with validation
    
    // TODO: Add toString method
}
```

## Exercise 2: Inheritance

Create an inheritance hierarchy:

1. **Base class**: `Vehicle`
   - Fields: `brand`, `model`, `year`
   - Method: `start()`, `stop()`

2. **Derived class**: `Car` extends `Vehicle`
   - Additional field: `numberOfDoors`
   - Override `start()` method
   - Add method: `openTrunk()`

3. **Derived class**: `Motorcycle` extends `Vehicle`
   - Additional field: `hasWindshield`
   - Override `start()` method
   - Add method: `wheelie()`

## Exercise 3: Polymorphism

Create a `VehicleManager` class that:
- Maintains a list of `Vehicle` objects
- Has method `startAllVehicles()` that calls `start()` on each vehicle
- Demonstrates runtime polymorphism

### Expected Output
```
Toyota Camry (2020) is starting with ignition
Harley Davidson Sportster (2019) is starting with kick
```

## Bonus Challenge

Implement a simple banking system with:
- Abstract class `Account` with abstract method `calculateInterest()`
- Concrete classes: `SavingsAccount`, `CheckingAccount`
- Class `Bank` that manages multiple accounts
- Demonstrate encapsulation by keeping account balances private