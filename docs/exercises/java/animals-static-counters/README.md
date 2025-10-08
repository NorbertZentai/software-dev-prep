# Animals Static Counters

## 🎯 Goal
Implement a **Dog and Cat class** hierarchy that uses **static counters** to track how many instances of each animal type have been created. Increment the counter every time an animal makes a sound.

## 📋 Requirements

1. **Create interface** `Sound` with method `makeSound()`
2. **Implement Dog class**:
   - Instance variable: `name`
   - Static variable: `count` (initialized to 0)
   - Constructor: sets name, increments count
   - `makeSound()`: prints "Woof!" and current count
3. **Implement Cat class**:
   - Instance variable: `name`
   - Static variable: `count` (initialized to 0)
   - Constructor: sets name, increments count
   - `makeSound()`: prints "Meow!" and current count
4. **Demonstrate**:
   - Create multiple dogs and cats
   - Call `makeSound()` on each
   - Print final counts for each animal type

## 📤 Expected Output

```
Creating animals...

Rex says: Woof! (Dog #1)
Max says: Woof! (Dog #2)
Buddy says: Woof! (Dog #3)

Whiskers says: Meow! (Cat #1)
Luna says: Meow! (Cat #2)

Charlie says: Woof! (Dog #4)
Simba says: Meow! (Cat #3)

Summary:
Total Dogs created: 4
Total Cats created: 3

Creating more animals...
Fido says: Woof! (Dog #5)
Garfield says: Meow! (Cat #4)

Final counts:
Dogs: 5
Cats: 4
```

## 🧪 Test Cases

### Test 1: Basic counting
**Actions**: Create 3 dogs, 2 cats  
**Expected**: Dog.count = 3, Cat.count = 2

### Test 2: Independent counters
**Actions**: Create only dogs  
**Expected**: Dog.count increases, Cat.count stays 0

### Test 3: Polymorphic array
**Actions**: Create `Sound[]` array with mixed animals  
**Expected**: Each class maintains its own count

### Test 4: Static method access
**Actions**: Call `Dog.getCount()` without instance  
**Expected**: Returns current count via static method

## 💡 Implementation Structure

```java
interface Sound {
    void makeSound();
}

class Dog implements Sound {
    private String name;
    public static int count = 0;  // Class variable
    
    public Dog(String name) {
        this.name = name;
        count++;  // Increment for ALL dogs
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " says: Woof! (Dog #" + count + ")");
    }
    
    public static int getCount() {
        return count;
    }
}

// Similar for Cat...
```

## 🎯 Bonus Challenges

### Challenge 1: Reset counters
Add static method `resetCount()` to reset counter to 0

### Challenge 2: Animal registry
Create static `List<Dog>` to store all created dogs

### Challenge 3: Thread safety
Make counters thread-safe using `AtomicInteger`

### Challenge 4: Generic counter
Create abstract `Animal` class with generic counting logic

### Challenge 5: Statistics
Add method `getAverageAge()` that tracks creation timestamps

## ⚠️ Key Concepts to Demonstrate

1. **Static vs Instance**:
   - Static: One copy per class
   - Instance: One copy per object

2. **Access patterns**:
   ```java
   Dog.count       // Via class (preferred)
   dog1.count      // Via instance (works but confusing)
   Dog.getCount()  // Via static method (best practice)
   ```

3. **Inheritance**:
   - Static variables NOT inherited
   - Each class has its own static fields

4. **Thread safety**:
   - `count++` is NOT atomic
   - Use synchronization or `AtomicInteger` for concurrent access

## 🎓 Learning Objectives

- Understand static vs instance variables
- Master class-level state management
- Learn counting pattern for resource tracking
- Practice polymorphism with static fields
- Recognize thread safety concerns

## 🔗 Related Topics

- [Static Counter Pattern](/theory/algorithms.md#static-counter)
- [Static Variables](/theory/java.md#static)
- [Polymorphism](/theory/oop.md#polymorphism)
- [Thread Safety](/theory/java.md#concurrency)
