# ES6+ JavaScript Fundamentals

## Objectives
- Master modern JavaScript ES6+ features
- Practice asynchronous programming with async/await
- Understand destructuring and arrow functions
- Work with modules and modern development practices

## Exercise 1: Arrow Functions and Template Literals

### Task 1.1: Convert Function Declarations
Convert these function declarations to arrow functions:

```javascript
// Original functions
function add(a, b) {
    return a + b;
}

function greet(name) {
    return "Hello, " + name + "!";
}

function isEven(number) {
    return number % 2 === 0;
}

// Your arrow function versions here:
const add = (a, b) => a + b;
// Complete the rest...
```

### Task 1.2: Template Literals
Rewrite these string concatenations using template literals:

```javascript
const user = { name: 'John', age: 30, city: 'New York' };

// Old way
const message = "User " + user.name + " is " + user.age + " years old and lives in " + user.city;

// Your template literal version:
const message = `User ${user.name} is ${user.age} years old and lives in ${user.city}`;
```

## Exercise 2: Destructuring

### Task 2.1: Object Destructuring
Extract values from these objects:

```javascript
const person = {
    firstName: 'Jane',
    lastName: 'Doe',
    age: 25,
    address: {
        street: '123 Main St',
        city: 'Boston',
        zipCode: '02101'
    }
};

// Extract firstName, lastName, and city using destructuring
// Your solution here:
```

### Task 2.2: Array Destructuring
Work with arrays using destructuring:

```javascript
const colors = ['red', 'green', 'blue', 'yellow', 'purple'];

// Extract first, second, and rest of the colors
// Your solution here:
```

## Exercise 3: Async/Await and Promises

### Task 3.1: Convert Promise Chains
Convert this promise chain to async/await:

```javascript
// Original promise chain
function fetchUserData(userId) {
    return fetch(`/api/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            return fetch(`/api/users/${userId}/orders`);
        })
        .then(response => response.json())
        .then(orders => {
            return { user, orders };
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

// Your async/await version:
async function fetchUserData(userId) {
    // Your solution here
}
```

### Task 3.2: Parallel Async Operations
Fetch multiple resources simultaneously:

```javascript
// Fetch user profile, posts, and followers in parallel
async function fetchUserProfile(userId) {
    // Your solution using Promise.all
}
```

## Exercise 4: Modern Array Methods

### Task 4.1: Data Transformation
Transform this array of users:

```javascript
const users = [
    { id: 1, name: 'John', age: 30, active: true },
    { id: 2, name: 'Jane', age: 25, active: false },
    { id: 3, name: 'Bob', age: 35, active: true },
    { id: 4, name: 'Alice', age: 28, active: true }
];

// 1. Get all active users
// 2. Get only names of active users
// 3. Find user with id 3
// 4. Check if any user is under 18
// 5. Get total age of all active users

// Your solutions:
const activeUsers = users.filter(/* your code */);
const activeNames = users
    .filter(/* your code */)
    .map(/* your code */);
// Continue...
```

## Exercise 5: ES6 Modules

### Task 5.1: Create Utility Modules
Create separate modules for different utilities:

**mathUtils.js**
```javascript
// Export utility functions for mathematical operations
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;
export const PI = 3.14159;

// Your additional functions here
```

**stringUtils.js**
```javascript
// Export utility functions for string operations
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Your additional functions here
```

**main.js**
```javascript
// Import and use the utilities
import { add, multiply, PI } from './mathUtils.js';
import { capitalize } from './stringUtils.js';

// Your usage code here
```

## Exercise 6: Advanced Patterns

### Task 6.1: Object Shorthand and Computed Properties
Refactor this code using modern object syntax:

```javascript
const name = 'John';
const age = 30;
const key = 'dynamicProperty';

// Old way
const person = {
    name: name,
    age: age,
    greet: function() {
        return 'Hello!';
    }
};
person[key] = 'some value';

// Your modern version:
```

### Task 6.2: Default Parameters and Rest/Spread
Create functions using modern parameter features:

```javascript
// Function with default parameters
function createUser(name, age = 25, role = 'user') {
    // Your implementation
}

// Function that accepts any number of arguments
function sum(...numbers) {
    // Your implementation using rest parameters
}

// Function that spreads array arguments
const numbers = [1, 2, 3, 4, 5];
// Call sum function with spread operator
```

## Solutions

<details>
<summary>Click to view solutions</summary>

### Task 1.1 Solutions:
```javascript
const add = (a, b) => a + b;
const greet = (name) => `Hello, ${name}!`;
const isEven = (number) => number % 2 === 0;
```

### Task 2.1 Solution:
```javascript
const { firstName, lastName, address: { city } } = person;
```

### Task 2.2 Solution:
```javascript
const [first, second, ...rest] = colors;
```

### Task 3.1 Solution:
```javascript
async function fetchUserData(userId) {
    try {
        const userResponse = await fetch(`/api/users/${userId}`);
        const user = await userResponse.json();
        
        const ordersResponse = await fetch(`/api/users/${userId}/orders`);
        const orders = await ordersResponse.json();
        
        return { user, orders };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
```

### Task 4.1 Solutions:
```javascript
const activeUsers = users.filter(user => user.active);
const activeNames = users
    .filter(user => user.active)
    .map(user => user.name);
const userWithId3 = users.find(user => user.id === 3);
const hasMinor = users.some(user => user.age < 18);
const totalActiveAge = users
    .filter(user => user.active)
    .reduce((sum, user) => sum + user.age, 0);
```

</details>

## Project Ideas

1. **Todo App with ES6+**: Create a todo application using modern JavaScript features
2. **Weather Dashboard**: Fetch weather data using async/await and display with template literals
3. **User Management System**: Practice CRUD operations with modern array methods
4. **Module-based Calculator**: Create a calculator using ES6 modules