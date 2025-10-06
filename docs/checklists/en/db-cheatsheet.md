# SQL & Database Cheatsheet

## Basic SQL Commands

### Data Query Language (DQL)
```sql
-- Basic SELECT
SELECT column1, column2 FROM table_name;
SELECT * FROM table_name;

-- WHERE clause
SELECT * FROM users WHERE age > 25;
SELECT * FROM products WHERE price BETWEEN 10 AND 50;
SELECT * FROM customers WHERE name LIKE 'John%';
SELECT * FROM orders WHERE status IN ('pending', 'shipped');

-- ORDER BY
SELECT * FROM products ORDER BY price DESC;
SELECT * FROM users ORDER BY last_name, first_name;

-- GROUP BY and HAVING
SELECT category, COUNT(*) FROM products GROUP BY category;
SELECT category, AVG(price) FROM products GROUP BY category HAVING AVG(price) > 100;

-- LIMIT/TOP
SELECT * FROM products ORDER BY price DESC LIMIT 10;  -- MySQL/PostgreSQL
SELECT TOP 10 * FROM products ORDER BY price DESC;    -- SQL Server
```

### Data Manipulation Language (DML)
```sql
-- INSERT
INSERT INTO users (name, email, age) VALUES ('John Doe', 'john@example.com', 30);
INSERT INTO products (name, price) VALUES 
    ('Product 1', 29.99),
    ('Product 2', 39.99);

-- UPDATE
UPDATE users SET email = 'newemail@example.com' WHERE id = 1;
UPDATE products SET price = price * 1.1 WHERE category = 'electronics';

-- DELETE
DELETE FROM users WHERE last_login < '2023-01-01';
DELETE FROM orders WHERE status = 'cancelled';
```

### Data Definition Language (DDL)
```sql
-- CREATE TABLE
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INTEGER CHECK (age >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ALTER TABLE
ALTER TABLE users ADD COLUMN phone VARCHAR(20);
ALTER TABLE users DROP COLUMN age;
ALTER TABLE users MODIFY COLUMN name VARCHAR(150);

-- CREATE INDEX
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);

-- DROP
DROP TABLE temp_table;
DROP INDEX idx_users_email;
```

## JOIN Operations

```sql
-- INNER JOIN
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;

-- RIGHT JOIN
SELECT u.name, o.total
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;

-- FULL OUTER JOIN
SELECT u.name, o.total
FROM users u
FULL OUTER JOIN orders o ON u.id = o.user_id;

-- CROSS JOIN
SELECT u.name, p.name
FROM users u
CROSS JOIN products p;
```

## Aggregate Functions

```sql
-- Basic aggregates
SELECT COUNT(*) FROM users;
SELECT COUNT(DISTINCT category) FROM products;
SELECT SUM(total) FROM orders;
SELECT AVG(price) FROM products;
SELECT MIN(created_at), MAX(created_at) FROM orders;

-- Window functions
SELECT 
    name,
    price,
    ROW_NUMBER() OVER (ORDER BY price DESC) as rank,
    RANK() OVER (PARTITION BY category ORDER BY price DESC) as category_rank
FROM products;
```

## Subqueries

```sql
-- Scalar subquery
SELECT * FROM products 
WHERE price > (SELECT AVG(price) FROM products);

-- EXISTS
SELECT * FROM users u
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);

-- IN subquery
SELECT * FROM products
WHERE category IN (SELECT category FROM categories WHERE active = true);

-- Correlated subquery
SELECT u.name, 
       (SELECT COUNT(*) FROM orders o WHERE o.user_id = u.id) as order_count
FROM users u;
```

## Common Table Expressions (CTE)

```sql
-- Basic CTE
WITH high_value_orders AS (
    SELECT user_id, SUM(total) as total_spent
    FROM orders
    WHERE total > 100
    GROUP BY user_id
)
SELECT u.name, h.total_spent
FROM users u
JOIN high_value_orders h ON u.id = h.user_id;

-- Recursive CTE (organizational hierarchy)
WITH RECURSIVE employee_hierarchy AS (
    SELECT id, name, manager_id, 1 as level
    FROM employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    SELECT e.id, e.name, e.manager_id, eh.level + 1
    FROM employees e
    JOIN employee_hierarchy eh ON e.manager_id = eh.id
)
SELECT * FROM employee_hierarchy;
```

## Performance Optimization

### Indexing Strategies
```sql
-- Single column index
CREATE INDEX idx_users_email ON users(email);

-- Composite index
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);

-- Partial index
CREATE INDEX idx_active_users ON users(email) WHERE active = true;

-- Covering index
CREATE INDEX idx_orders_covering ON orders(user_id) INCLUDE (total, created_at);
```

### Query Optimization
```sql
-- Use EXPLAIN to analyze query plans
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'john@example.com';

-- Avoid SELECT *
-- Bad
SELECT * FROM users WHERE id = 1;

-- Good
SELECT id, name, email FROM users WHERE id = 1;

-- Use appropriate data types
-- Bad: storing dates as strings
email_sent_date VARCHAR(20)

-- Good: using proper date type
email_sent_date TIMESTAMP
```

## Database Design Patterns

### Normalization
```sql
-- 1NF: Atomic values, no repeating groups
-- 2NF: No partial dependencies
-- 3NF: No transitive dependencies

-- Example: Properly normalized tables
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    order_date DATE,
    total DECIMAL(10,2)
);

CREATE TABLE order_items (
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER,
    price DECIMAL(10,2),
    PRIMARY KEY (order_id, product_id)
);
```

### Common Constraints
```sql
-- Primary Key
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    -- ...
);

-- Foreign Key
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    -- ...
);

-- Unique Constraint
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    -- ...
);

-- Check Constraint
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    price DECIMAL(10,2) CHECK (price > 0),
    category VARCHAR(50) CHECK (category IN ('electronics', 'books', 'clothing'))
);
```

## Transactions

```sql
-- Basic transaction
BEGIN;
    UPDATE accounts SET balance = balance - 100 WHERE id = 1;
    UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;

-- Transaction with rollback
BEGIN;
    INSERT INTO orders (user_id, total) VALUES (1, 99.99);
    -- If something goes wrong
    ROLLBACK;

-- Savepoints
BEGIN;
    INSERT INTO users (name) VALUES ('User 1');
    SAVEPOINT sp1;
    INSERT INTO users (name) VALUES ('User 2');
    ROLLBACK TO sp1;  -- Only rolls back to savepoint
COMMIT;
```

## Database-Specific Features

### PostgreSQL
```sql
-- Arrays
SELECT * FROM products WHERE tags && ARRAY['electronics', 'mobile'];

-- JSON operations
SELECT data->>'name' FROM users WHERE data->>'age'::int > 25;

-- Full-text search
SELECT * FROM articles WHERE to_tsvector(content) @@ to_tsquery('postgresql');
```

### MySQL
```sql
-- Auto-increment
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);

-- JSON functions
SELECT JSON_EXTRACT(data, '$.name') FROM users;
```

## Common Patterns

### Pagination
```sql
-- Offset-based pagination
SELECT * FROM products ORDER BY id LIMIT 20 OFFSET 40;

-- Cursor-based pagination (better for large datasets)
SELECT * FROM products WHERE id > 12345 ORDER BY id LIMIT 20;
```

### Audit Trails
```sql
CREATE TABLE user_audit (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    action VARCHAR(20),
    old_values JSONB,
    new_values JSONB,
    changed_by INTEGER,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Soft Deletes
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    deleted_at TIMESTAMP NULL
);

-- "Delete" a user
UPDATE users SET deleted_at = CURRENT_TIMESTAMP WHERE id = 1;

-- Query active users
SELECT * FROM users WHERE deleted_at IS NULL;
```