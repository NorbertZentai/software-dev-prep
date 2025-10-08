# Try-Catch-Finally Behavior

## 🎯 Goal
Demonstrate the **execution order** of try-catch-finally blocks and prove that **finally ALWAYS executes**, even when try or catch contains a return statement.

## 📋 Requirements

1. **Create methods** that test different scenarios:
   - Normal execution (no exception)
   - Exception thrown and caught
   - Return statement in try block
   - Return statement in catch block
2. **Log execution flow** with print statements showing order
3. **Demonstrate resource cleanup** pattern with finally
4. **Show try-with-resources** as modern alternative

## 🧪 Test Cases

### Test 1: Normal execution
**Scenario**: Division with valid divisor  
**Expected output**:
```
1. Entering try block
2. Try block completed, result: 5
3. Finally block executes
Returned: 5
```

### Test 2: Exception thrown
**Scenario**: Division by zero  
**Expected output**:
```
1. Entering try block
2. Exception caught: / by zero
3. Finally block executes
Returned: -1
```

### Test 3: Return in try
**Scenario**: Try block returns early  
**Expected output**:
```
1. Entering try block
2. Returning from try
3. Finally block executes BEFORE return
Returned: 42
```

### Test 4: Multiple returns
**Scenario**: Both try and finally have return (anti-pattern)  
**Expected**: Finally return value wins (document why this is bad)

### Test 5: Resource cleanup
**Scenario**: Database connection closing  
**Expected**: Connection closed even if exception occurs

## 📤 Expected Output

```
=== Test 1: Normal Execution ===
Entering try block
Calculating 10 / 2 = 5
Finally block ALWAYS executes
Method returned: 5

=== Test 2: Exception Case ===
Entering try block
Calculating 10 / 0
Caught ArithmeticException: / by zero
Finally block ALWAYS executes
Method returned: -1

=== Test 3: Resource Cleanup ===
Opening database connection...
Executing query...
ERROR: Connection timeout
Finally: Closing connection...
Connection closed successfully

=== Test 4: Try-With-Resources ===
AutoCloseable resource opened
Doing work...
AutoCloseable resource closed automatically
```

## 💡 Implementation Hints

```java
public static int testFlow(int divisor) {
    try {
        System.out.println("1. Entering try");
        int result = 10 / divisor;
        System.out.println("2. Result: " + result);
        return result;
    } catch (ArithmeticException e) {
        System.out.println("3. Caught: " + e.getMessage());
        return -1;
    } finally {
        System.out.println("4. Finally ALWAYS runs");
        // This executes BEFORE the method returns!
    }
}
```

## ⚠️ Common Mistakes to Demonstrate

1. **Thinking finally runs after return** → Show it runs BEFORE
2. **Returning in finally block** → Show why this is anti-pattern
3. **Not knowing finally skips** → Only skips on System.exit() or thread kill
4. **Forgetting cleanup** → Show resource leaks without finally

## 🎓 Learning Objectives

- Understand exception handling flow
- Master finally block behavior
- Learn resource cleanup patterns
- Discover try-with-resources (Java 7+)
- Avoid common pitfalls in production code

## 🔗 Related Topics

- [Try-Catch-Finally Behavior](/theory/algorithms.md#try-catch-finally)
- [Exception Handling](/theory/java.md#exception-handling)
- [Resource Management](/theory/java.md#resources)
