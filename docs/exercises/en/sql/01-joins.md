# SQL JOIN Operations

## Objectives
- Master different types of JOIN operations
- Practice complex queries with multiple tables
- Understand performance implications of different JOIN types

## Database Schema

For these exercises, we'll use a simple e-commerce database:

```sql
-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    created_at DATE
);

-- Orders table
CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id INT,
    total DECIMAL(10,2),
    status VARCHAR(20),
    created_at DATE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Products table
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10,2),
    category VARCHAR(50)
);

-- Order_items table
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10,2),
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

## Exercise 1: Basic JOINs

### Task 1.1: INNER JOIN
Write a query to get all orders with user information:

```sql
-- Your solution here
SELECT 
    o.id,
    o.total,
    o.status,
    u.name,
    u.email
FROM orders o
INNER JOIN users u ON o.user_id = u.id;
```

### Task 1.2: LEFT JOIN
Get all users and their orders (including users without orders):

```sql
-- Your solution here
```

### Task 1.3: RIGHT JOIN
Get all orders and user information (including orders with invalid user_id):

```sql
-- Your solution here
```

## Exercise 2: Complex JOINs

### Task 2.1: Multiple JOINs
Get order details with user information and all ordered products:

```sql
-- Expected columns: order_id, user_name, product_name, quantity, total_price
-- Your solution here
```

### Task 2.2: Aggregation with JOINs
Find the total spending per user:

```sql
-- Expected columns: user_name, total_spent, order_count
-- Your solution here
```

## Exercise 3: Advanced Scenarios

### Task 3.1: Self JOIN
Find users who placed orders on the same day:

```sql
-- Your solution here
```

### Task 3.2: Subquery vs JOIN
Compare performance: Find users who have placed more than 3 orders.
Write both subquery and JOIN versions:

```sql
-- Subquery version
-- Your solution here

-- JOIN version
-- Your solution here
```

## Solutions

<details>
<summary>Click to view solutions</summary>

### Task 1.2 Solution:
```sql
SELECT 
    u.name,
    u.email,
    o.id AS order_id,
    o.total,
    o.status
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;
```

### Task 1.3 Solution:
```sql
SELECT 
    o.id,
    o.total,
    o.status,
    u.name,
    u.email
FROM orders o
RIGHT JOIN users u ON o.user_id = u.id;
```

### Task 2.1 Solution:
```sql
SELECT 
    o.id AS order_id,
    u.name AS user_name,
    p.name AS product_name,
    oi.quantity,
    oi.quantity * oi.price AS total_price
FROM orders o
INNER JOIN users u ON o.user_id = u.id
INNER JOIN order_items oi ON o.id = oi.order_id
INNER JOIN products p ON oi.product_id = p.id;
```

### Task 2.2 Solution:
```sql
SELECT 
    u.name AS user_name,
    SUM(o.total) AS total_spent,
    COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name
ORDER BY total_spent DESC;
```

</details>