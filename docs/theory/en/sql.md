# SQL & Database Fundamentals

## Brief Summary

SQL (Structured Query Language) is the standard language for managing relational databases. It provides a comprehensive set of commands for creating, reading, updating, and deleting data, as well as managing database structure, relationships, and performance optimization. Modern SQL supports advanced features like window functions, CTEs, and complex analytical queries, making it essential for data-driven applications.

<!-- Reading Progress Bar -->
<div id="read-progress"></div>

<!-- Tag Filter -->
<div class="tag-filter-container">
  <h3>🏷️ Filter by topics</h3>
  <div class="tag-filter-chips">
    <button class="filter-chip active" data-filter="all">All</button>
    <button class="filter-chip" data-filter="junior">Junior</button>
    <button class="filter-chip" data-filter="medior">Medior</button>
    <button class="filter-chip" data-filter="senior">Senior</button>
    <button class="filter-chip" data-filter="crud">CRUD</button>
    <button class="filter-chip" data-filter="joins">JOINs</button>
    <button class="filter-chip" data-filter="performance">Performance</button>
    <button class="filter-chip" data-filter="optimization">Optimization</button>
    <button class="filter-chip" data-filter="transactions">Transactions</button>
    <button class="filter-chip" data-filter="indexing">Indexing</button>
  </div>
</div>

## Concepts

### CRUD Operations {#crud}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*CRUD is like a file cabinet: Create = adding new files, Read = finding and viewing files, Update = modifying files, Delete = removing files.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Data manipulation**: fundamental operations for all database interactions
- **Application foundation**: every data-driven app needs CRUD operations
- **Performance impact**: efficient CRUD operations affect entire application performance
- **Security considerations**: proper CRUD implementation prevents data breaches

</div>

<div class="runnable-model">

**Runnable mental model**
```sql
-- CREATE (INSERT) - Adding new data
INSERT INTO users (first_name, last_name, email, created_at)
VALUES ('John', 'Doe', 'john.doe@example.com', CURRENT_TIMESTAMP);

-- Multiple records
INSERT INTO users (first_name, last_name, email)
VALUES 
    ('Alice', 'Smith', 'alice@example.com'),
    ('Bob', 'Johnson', 'bob@example.com'),
    ('Carol', 'Williams', 'carol@example.com');

-- READ (SELECT) - Retrieving data
SELECT u.first_name, u.last_name, u.email, u.created_at
FROM users u
WHERE u.created_at > '2023-01-01'
  AND u.email LIKE '%@example.com'
ORDER BY u.created_at DESC
LIMIT 10;

-- Complex read with aggregation
SELECT 
    DATE(created_at) as registration_date,
    COUNT(*) as user_count,
    COUNT(DISTINCT SUBSTRING(email, POSITION('@' IN email) + 1)) as unique_domains
FROM users
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at)
HAVING COUNT(*) > 5
ORDER BY registration_date DESC;

-- UPDATE - Modifying existing data
UPDATE users 
SET 
    last_login = CURRENT_TIMESTAMP,
    login_count = login_count + 1
WHERE email = 'john.doe@example.com';

-- Conditional update with subquery
UPDATE users 
SET status = 'premium'
WHERE id IN (
    SELECT DISTINCT user_id 
    FROM orders 
    WHERE total_amount > 1000 
      AND order_date >= CURRENT_DATE - INTERVAL '1 year'
);

-- DELETE - Removing data
DELETE FROM users 
WHERE last_login < CURRENT_DATE - INTERVAL '2 years'
  AND status = 'inactive';

-- Soft delete (recommended approach)
UPDATE users 
SET 
    deleted_at = CURRENT_TIMESTAMP,
    deleted_by = 'system_cleanup'
WHERE last_login < CURRENT_DATE - INTERVAL '2 years';
```
*Notice: Always use parameterized queries in application code to prevent SQL injection attacks.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths / misconceptions</strong></summary>

<div>

- "DELETE is faster than UPDATE for removing data" → Soft deletes are often better for audit trails
- "SELECT * is fine for small tables" → Always specify columns for better performance and maintainability
- "Multiple separate INSERTs are same as batch INSERT" → Batch operations are significantly faster

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Where you fail in interviews</strong></summary>

<div>

- Not understanding the difference between DELETE and TRUNCATE
- Can't explain when to use soft delete vs hard delete
- Don't know how to handle duplicate records during INSERT

</div>
</details>

</div>

<div class="tags">
<span class="tag">sql</span>
<span class="tag">crud</span>
<span class="tag">junior</span>
<span class="tag">basic-operations</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Foreign Keys` · `Indexes` · `Query Optimization` · `Normalization` · `Performance Tuning`

</div>

### Indexes {#indexes}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*An index is like a book's table of contents: you find what you're looking for quickly, but writing the book becomes slower because you need to update the table of contents too.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Query performance**: can improve search speed by orders of magnitude
- **Trade-off**: faster SELECT, slower INSERT/Update/Delete
- **Memory usage**: indexes consume memory and storage space
- **Query optimizer**: database decides whether to use the index

</div>

<div class="runnable-model">

**Runnable mental model**
```sql
-- Simple index - single column
CREATE INDEX idx_users_email ON users(email);

-- Check if index is used
EXPLAIN (ANALYZE, BUFFERS) 
SELECT * FROM users WHERE email = 'john@example.com';
-- Look for: "Index Scan" or "Index Seek" in the execution plan

-- Composite index - multiple columns (order matters!)
CREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date);

-- This index works for:
-- ✅ WHERE customer_id = 123
-- ✅ WHERE customer_id = 123 AND order_date > '2023-01-01'
-- ❌ WHERE order_date > '2023-01-01' (only) - can't use index efficiently

-- Unique constraint + index
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);

-- Partial index - only for certain records
CREATE INDEX idx_active_users_login ON users(last_login_date) 
WHERE status = 'active' AND deleted_at IS NULL;

-- Functional index - on computed values
CREATE INDEX idx_users_lower_email ON users(LOWER(email));
-- Now this query can use the index:
SELECT * FROM users WHERE LOWER(email) = 'john@example.com';

-- Covering index - includes additional columns
CREATE INDEX idx_orders_covering ON orders(customer_id, order_date) 
INCLUDE (total_amount, status);
-- Query can be satisfied entirely from the index

-- Index on JSON columns (PostgreSQL)
CREATE INDEX idx_user_preferences ON users USING GIN(preferences);
-- Supports queries like:
SELECT * FROM users WHERE preferences @> '{"theme": "dark"}';

-- Index maintenance
-- Check index usage
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_tup_read,
    idx_tup_fetch,
    idx_scan
FROM pg_stat_user_indexes 
WHERE idx_scan = 0;  -- Unused indexes

-- Drop unused index
DROP INDEX IF EXISTS idx_unused_column;

-- Rebuild fragmented index
REINDEX INDEX idx_users_email;

-- Index size analysis
SELECT 
    indexname,
    pg_size_pretty(pg_relation_size(indexrelid)) as index_size,
    pg_size_pretty(pg_relation_size(indrelid)) as table_size
FROM pg_stat_user_indexes
ORDER BY pg_relation_size(indexrelid) DESC;
```
*Notice: With composite indexes, column order matters - (customer_id, order_date) ≠ (order_date, customer_id).*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths / misconceptions</strong></summary>

<div>

- "Every column needs an index" → Too many indexes slow down INSERT/UPDATE operations
- "Indexes always speed up queries" → For small tables, full table scan can be faster
- "Primary key is not an index" → Primary key automatically creates a unique index

</div>
</details>

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Index performance guidelines</strong></summary>

<div>

- **Cardinality**: High-cardinality columns benefit more from indexes
- **Selectivity**: Indexes work best when they filter out most rows
- **Maintenance cost**: Each index slows down write operations
- **Memory impact**: Frequently used indexes should fit in memory

</div>
</details>

</div>

<div class="concept-section micro-learning">

<details>
<summary>📚 <strong>Index types overview</strong></summary>

<div>

**B-tree (default)**: Equality and range queries
**Hash**: Equality queries only, faster for exact matches
**GIN/GiST**: Full-text search, JSON columns, arrays
**Bitmap**: Low-cardinality columns, data warehousing

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Where you fail in interviews</strong></summary>

<div>

- Can't explain when NOT to use an index
- Don't understand composite index column ordering
- Can't read and interpret execution plans

</div>
</details>

</div>

<div class="tags">
<span class="tag">sql</span>
<span class="tag">indexing</span>
<span class="tag">performance</span>
<span class="tag">medior</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Query Optimization` · `Execution Plans` · `Performance Tuning` · `Memory Management` · `Storage`

</div>

### Normalization {#normalization}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Normalization is like organizing a messy room: 1NF = everything in its place, 2NF = group related items, 3NF = eliminate duplicates, but sometimes you leave commonly used items out for convenience (denormalization).*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Data integrity**: reduces redundancy and prevents inconsistencies
- **Storage efficiency**: eliminates duplicate data storage
- **Update anomalies**: prevents inconsistent updates across duplicated data
- **Maintenance**: easier to modify schema and business rules

</div>

<div class="runnable-model">

**Runnable mental model**
```sql
-- 0NF (Unnormalized) - BAD EXAMPLE
CREATE TABLE orders_bad (
    id INT PRIMARY KEY,
    customer_name VARCHAR(100),
    customer_email VARCHAR(100),
    customer_phone VARCHAR(20),
    product_names TEXT, -- "Laptop,Mouse,Keyboard" - VIOLATION
    product_prices TEXT, -- "999.99,29.99,79.99" - VIOLATION
    order_total DECIMAL(10,2)
);
-- Problems: Non-atomic values, no way to query individual products

-- 1NF (First Normal Form) - Atomic values
CREATE TABLE orders_1nf (
    id INT PRIMARY KEY,
    customer_name VARCHAR(100),
    customer_email VARCHAR(100),  -- Still redundant
    customer_phone VARCHAR(20),   -- Still redundant
    product_name VARCHAR(100),
    product_price DECIMAL(10,2),
    quantity INT,
    order_date TIMESTAMP
);
-- ✅ Atomic values ❌ Still has redundancy and partial dependencies

-- 2NF (Second Normal Form) - Eliminate partial dependencies
CREATE TABLE customers (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10,2),
    category VARCHAR(50),  -- Will be normalized in 3NF
    sku VARCHAR(50) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    total_amount DECIMAL(10,2),
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE RESTRICT
);

CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL,
    line_total DECIMAL(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- 3NF (Third Normal Form) - Eliminate transitive dependencies
CREATE TABLE categories (
    id INT PRIMARY KEY,
    name VARCHAR(50) UNIQUE,
    department VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Update products table to remove transitive dependency
ALTER TABLE products 
DROP COLUMN category,
ADD COLUMN category_id INT,
ADD CONSTRAINT fk_products_category 
    FOREIGN KEY (category_id) REFERENCES categories(id);

-- BCNF (Boyce-Codd Normal Form) - Example with additional constraints
CREATE TABLE course_instructors (
    course_id INT,
    instructor_id INT,
    semester VARCHAR(20),
    room VARCHAR(20),
    PRIMARY KEY (course_id, instructor_id, semester),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    FOREIGN KEY (instructor_id) REFERENCES instructors(id),
    UNIQUE (instructor_id, semester, room)  -- One instructor per room per semester
);

-- Denormalization example for performance
CREATE TABLE order_summary (
    order_id INT PRIMARY KEY,
    customer_id INT,
    customer_name VARCHAR(100),    -- Denormalized for reporting
    customer_email VARCHAR(100),   -- Denormalized for reporting
    order_date TIMESTAMP,
    total_amount DECIMAL(10,2),    -- Calculated field
    item_count INT,               -- Calculated field
    status VARCHAR(20),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    INDEX idx_customer_date (customer_id, order_date),
    INDEX idx_status_date (status, order_date)
);

-- Trigger to maintain denormalized data
DELIMITER //
CREATE TRIGGER update_order_summary 
    AFTER UPDATE ON orders
    FOR EACH ROW
BEGIN
    UPDATE order_summary 
    SET 
        total_amount = NEW.total_amount,
        status = NEW.status,
        last_updated = CURRENT_TIMESTAMP
    WHERE order_id = NEW.id;
END//
DELIMITER ;

-- View for normalized data access
CREATE VIEW order_details AS
SELECT 
    o.id as order_id,
    c.name as customer_name,
    c.email as customer_email,
    o.order_date,
    o.status,
    COUNT(oi.product_id) as item_count,
    SUM(oi.line_total) as total_amount
FROM orders o
JOIN customers c ON o.customer_id = c.id
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id, c.name, c.email, o.order_date, o.status;
```
*Notice: Higher normal forms reduce redundancy but may require more JOINs. Denormalization trades storage for query performance.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths / misconceptions</strong></summary>

<div>

- "Always normalize to 3NF" → Sometimes denormalization improves performance
- "Normalization always improves performance" → Can require complex JOINs
- "Foreign keys are optional" → They're crucial for referential integrity

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Referential Integrity` · `Database Design` · `Data Modeling` · `Performance Trade-offs` · `ACID Properties`

</div>

### Transactions {#transactions}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*A transaction is like a bank transfer: either both the debit and credit happen completely, or neither happens at all. No partial transfers allowed.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Data consistency**: ensures database remains in valid state
- **Atomicity**: all operations succeed or all fail together
- **Isolation**: concurrent transactions don't interfere
- **Durability**: committed changes persist even after system crashes

</div>

<div class="runnable-model">

**Runnable mental model**
```sql
-- Basic transaction
START TRANSACTION;

UPDATE accounts 
SET balance = balance - 100 
WHERE account_number = 'ACC001';

UPDATE accounts 
SET balance = balance + 100 
WHERE account_number = 'ACC002';

-- Check if both updates succeeded
SELECT 
    (SELECT balance FROM accounts WHERE account_number = 'ACC001') as from_balance,
    (SELECT balance FROM accounts WHERE account_number = 'ACC002') as to_balance;

COMMIT;  -- Make changes permanent
-- or ROLLBACK; -- Undo all changes

-- Transaction with error handling
START TRANSACTION;

SAVEPOINT before_risky_operation;

-- Risky operation that might fail
INSERT INTO audit_log (user_id, action, timestamp) 
VALUES (123, 'TRANSFER', NOW());

-- If error occurs, rollback to savepoint
-- ROLLBACK TO SAVEPOINT before_risky_operation;

-- Complex transaction with multiple operations
START TRANSACTION;

-- Insert order
INSERT INTO orders (customer_id, order_date, status)
VALUES (1, NOW(), 'processing');

SET @order_id = LAST_INSERT_ID();

-- Insert order items
INSERT INTO order_items (order_id, product_id, quantity, unit_price)
VALUES 
    (@order_id, 101, 2, 29.99),
    (@order_id, 102, 1, 149.99);

-- Update inventory
UPDATE products 
SET stock_quantity = stock_quantity - 2 
WHERE id = 101 AND stock_quantity >= 2;

UPDATE products 
SET stock_quantity = stock_quantity - 1 
WHERE id = 102 AND stock_quantity >= 1;

-- Check if inventory updates affected the expected rows
IF ROW_COUNT() = 0 THEN
    ROLLBACK;
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insufficient inventory';
END IF;

-- Update order total
UPDATE orders 
SET total_amount = (
    SELECT SUM(quantity * unit_price) 
    FROM order_items 
    WHERE order_id = @order_id
)
WHERE id = @order_id;

COMMIT;

-- Read-only transaction for reporting
START TRANSACTION READ ONLY;

SELECT 
    c.name as customer_name,
    COUNT(o.id) as order_count,
    SUM(o.total_amount) as total_spent
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE c.created_at >= '2023-01-01'
GROUP BY c.id, c.name
ORDER BY total_spent DESC;

COMMIT;  -- Even read-only transactions should be committed

-- Transaction isolation levels
-- READ UNCOMMITTED - Can read uncommitted changes (dirty reads)
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
START TRANSACTION;
SELECT * FROM accounts WHERE balance > 1000;
COMMIT;

-- READ COMMITTED - Default level, prevents dirty reads
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
START TRANSACTION;
SELECT * FROM accounts WHERE balance > 1000;
-- Another transaction commits here
SELECT * FROM accounts WHERE balance > 1000;  -- May see different results
COMMIT;

-- REPEATABLE READ - Prevents dirty and non-repeatable reads
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
START TRANSACTION;
SELECT * FROM accounts WHERE balance > 1000;
-- Another transaction commits here
SELECT * FROM accounts WHERE balance > 1000;  -- Same results as first SELECT
COMMIT;

-- SERIALIZABLE - Highest isolation, prevents phantom reads
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
START TRANSACTION;
SELECT COUNT(*) FROM accounts WHERE balance > 1000;
-- Another transaction cannot INSERT new accounts until this commits
COMMIT;
```
*Notice: Higher isolation levels prevent more anomalies but can reduce concurrency and performance.*

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`ACID Properties` · `Isolation Levels` · `Deadlocks` · `Locking` · `Concurrency Control`

</div>

### ACID Properties {#acid}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*ACID is like a bank's security system: Atomicity = all-or-nothing deposits, Consistency = balance rules never broken, Isolation = transactions don't peek at each other, Durability = permanent records in the vault.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Atomicity**: ensures partial failures don't corrupt data
- **Consistency**: maintains database integrity constraints
- **Isolation**: prevents concurrent transaction interference
- **Durability**: guarantees committed data survives system failures

</div>

<div class="runnable-model">

**Runnable mental model**
```sql
-- ATOMICITY - All operations succeed or all fail
DELIMITER //
CREATE PROCEDURE transfer_money(
    IN from_account VARCHAR(20),
    IN to_account VARCHAR(20), 
    IN amount DECIMAL(10,2)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    -- Debit source account
    UPDATE accounts 
    SET balance = balance - amount
    WHERE account_number = from_account AND balance >= amount;
    
    IF ROW_COUNT() = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insufficient funds or account not found';
    END IF;
    
    -- Credit target account
    UPDATE accounts 
    SET balance = balance + amount
    WHERE account_number = to_account;
    
    IF ROW_COUNT() = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Target account not found';
    END IF;
    
    -- Log transaction
    INSERT INTO transaction_log (from_account, to_account, amount, transaction_date)
    VALUES (from_account, to_account, amount, NOW());
    
    COMMIT;  -- All operations succeed together
END//
DELIMITER ;

-- CONSISTENCY - Database constraints maintain valid state
CREATE TABLE accounts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    account_number VARCHAR(20) UNIQUE NOT NULL,
    balance DECIMAL(12,2) NOT NULL DEFAULT 0,
    account_type ENUM('STANDARD', 'PREMIUM', 'VIP') DEFAULT 'STANDARD',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Consistency constraints
    CONSTRAINT positive_balance CHECK (balance >= 0)
);

-- ISOLATION - Concurrent transactions don't interfere
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
START TRANSACTION;
SELECT balance FROM accounts WHERE account_number = 'ACC001';
-- Other transactions can't modify this until we commit
COMMIT;

-- DURABILITY - Committed changes survive system crashes
-- Ensured by write-ahead logging and proper disk synchronization
```

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Transactions` · `Locking` · `Write-Ahead Logging` · `Concurrency Control` · `Database Recovery`

</div>

### Window Functions {#window-functions}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Window functions are like looking through different windows of your data: you can see rankings, running totals, or comparisons with neighboring rows without changing the view itself.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Analytics**: powerful tool for ranking, percentiles, and running calculations
- **Performance**: often faster than complex self-joins or subqueries
- **Readability**: cleaner code for complex analytical queries
- **Flexibility**: can partition and order data in sophisticated ways

</div>

<div class="runnable-model">

**Runnable mental model**
```sql
-- ROW_NUMBER() - Unique sequential numbers
SELECT 
    salesperson,
    region,
    amount,
    ROW_NUMBER() OVER (ORDER BY amount DESC) as overall_rank,
    ROW_NUMBER() OVER (PARTITION BY region ORDER BY amount DESC) as region_rank
FROM sales;

-- RANK() and DENSE_RANK() - Ranking with ties
SELECT 
    salesperson,
    amount,
    RANK() OVER (ORDER BY amount DESC) as rank_with_gaps,
    DENSE_RANK() OVER (ORDER BY amount DESC) as rank_no_gaps,
    PERCENT_RANK() OVER (ORDER BY amount) as percentile_rank
FROM sales;

-- Running totals and moving averages
SELECT 
    salesperson,
    sale_date,
    amount,
    SUM(amount) OVER (
        PARTITION BY salesperson 
        ORDER BY sale_date 
        ROWS UNBOUNDED PRECEDING
    ) as running_total,
    LAG(amount, 1) OVER (
        PARTITION BY salesperson 
        ORDER BY sale_date
    ) as previous_sale
FROM sales;

-- NTILE() - Divide into equal groups
SELECT 
    salesperson,
    amount,
    NTILE(4) OVER (ORDER BY amount) as quartile
FROM sales;
```

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Analytics` · `Ranking` · `Aggregation` · `Time Series` · `Business Intelligence`

</div>

## Best Practices

1. **Use parameterized queries** to prevent SQL injection
2. **Create appropriate indexes** for frequently queried columns
3. **Normalize data** to reduce redundancy and ensure consistency
4. **Use transactions** for related operations that must succeed together
5. **Avoid SELECT *** - specify needed columns for better performance
6. **Use proper data types** for storage efficiency and data integrity
7. **Regular backups** and disaster recovery planning
8. **Monitor query performance** with execution plans
9. **Use foreign keys** to maintain referential integrity
10. **Consider denormalization** for read-heavy workloads

## Common Pitfalls

- **N+1 query problem**: Loading data in loops instead of using JOINs
- **Missing indexes**: Slow queries due to full table scans
- **SQL injection**: Not using parameterized queries
- **Improper transaction scope**: Too large or too small transaction boundaries
- **Ignoring execution plans**: Not understanding how queries are executed
- **Over-normalization**: Making queries too complex with excessive JOINs
- **Under-normalization**: Data inconsistency due to redundancy

</div>

### Normalization {#normalization}

</div>

### DDL/DML {#ddl-dml}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*DDL is like an architect: designs and builds the structure. DML is like a resident: lives in and uses the structure.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Schema management**: DDL defines database structure and constraints
- **Data operations**: DML handles day-to-day data manipulation
- **Permission control**: different roles often have different DDL/DML permissions
- **Backup strategies**: DDL changes require careful migration planning

</div>

<div class="runnable-model">

**Runnable mental model**
```sql
-- DDL (Data Definition Language) - Structure
-- CREATE - Creating database objects
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    uuid VARCHAR(36) NOT NULL UNIQUE DEFAULT (UUID()),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    
    INDEX idx_email (email),
    INDEX idx_status_created (status, created_at),
    INDEX idx_deleted (deleted_at)
);

-- ALTER - Modifying structure
ALTER TABLE users 
ADD COLUMN phone_number VARCHAR(20),
ADD COLUMN country_code VARCHAR(3) DEFAULT 'US',
ADD INDEX idx_phone (phone_number);

-- Add foreign key constraint
ALTER TABLE orders
ADD CONSTRAINT fk_orders_user_id 
FOREIGN KEY (user_id) REFERENCES users(id) 
ON DELETE CASCADE ON UPDATE CASCADE;

-- DROP - Removing objects
DROP INDEX idx_phone ON users;
DROP TABLE temporary_data;

-- TRUNCATE - Remove all data, keep structure
TRUNCATE TABLE session_logs;

-- DML (Data Manipulation Language) - Data
-- INSERT - Adding data
INSERT INTO users (first_name, last_name, email, password_hash)
VALUES ('John', 'Doe', 'john@example.com', SHA2('secure_password', 256));

-- INSERT with ON DUPLICATE KEY UPDATE
INSERT INTO user_preferences (user_id, preference_key, preference_value)
VALUES (1, 'theme', 'dark')
ON DUPLICATE KEY UPDATE 
    preference_value = VALUES(preference_value),
    updated_at = CURRENT_TIMESTAMP;

-- SELECT - Retrieving data
SELECT 
    u.first_name,
    u.last_name,
    u.email,
    COUNT(o.id) as order_count,
    SUM(o.total_amount) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id AND o.status = 'completed'
WHERE u.status = 'active'
  AND u.created_at >= '2023-01-01'
GROUP BY u.id, u.first_name, u.last_name, u.email
HAVING total_spent > 500
ORDER BY total_spent DESC;

-- UPDATE - Modifying data
UPDATE users 
SET 
    status = 'inactive',
    updated_at = CURRENT_TIMESTAMP
WHERE last_login < DATE_SUB(NOW(), INTERVAL 1 YEAR)
  AND status = 'active';

-- DELETE - Removing data
DELETE FROM user_sessions 
WHERE expires_at < CURRENT_TIMESTAMP;
```
*Notice: DDL operations often require elevated privileges and can impact running applications.*

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>Performance considerations</strong></summary>

<div>

- **ALTER TABLE**: Can be expensive on large tables, consider maintenance windows
- **DROP operations**: May cause locks, plan for off-peak hours
- **TRUNCATE vs DELETE**: TRUNCATE is faster but can't be rolled back in all databases

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Database Schema` · `Constraints` · `Indexes` · `Migrations` · `Data Types`

</div>

### JOINs (INNER/LEFT/RIGHT) {#joins}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*JOINs are like family tree research: INNER JOIN shows only confirmed relatives, LEFT JOIN shows all ancestors + known descendants, RIGHT JOIN is the reverse.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Normalized data**: relational databases store data across multiple tables
- **Performance critical**: poor JOINs result in slow queries
- **Business logic**: foundation for complex reports and analytics
- **Data integrity**: validates foreign key relationships

</div>

<div class="runnable-model">

**Runnable mental model**
```sql
-- INNER JOIN - only matching records (intersection)
SELECT 
    u.first_name,
    u.last_name,
    o.order_date,
    o.total_amount,
    o.status
FROM users u
INNER JOIN orders o ON u.id = o.customer_id
WHERE o.order_date >= '2023-01-01';
-- Result: only users who have orders

-- LEFT JOIN - all left side + matching right side
SELECT 
    u.first_name,
    u.last_name,
    u.email,
    COUNT(o.id) as order_count,
    COALESCE(SUM(o.total_amount), 0) as total_spent,
    MAX(o.order_date) as last_order_date
FROM users u
LEFT JOIN orders o ON u.id = o.customer_id AND o.status = 'completed'
GROUP BY u.id, u.first_name, u.last_name, u.email
ORDER BY total_spent DESC;
-- Result: all users, even those without orders (with NULL values)

-- RIGHT JOIN - all right side + matching left side
SELECT 
    p.name as product_name,
    p.price,
    COALESCE(SUM(oi.quantity), 0) as total_sold,
    COALESCE(SUM(oi.quantity * oi.unit_price), 0) as total_revenue
FROM order_items oi
RIGHT JOIN products p ON oi.product_id = p.id
GROUP BY p.id, p.name, p.price
ORDER BY total_sold DESC;
-- Result: all products, even unsold ones

-- FULL OUTER JOIN - all records from both tables
SELECT 
    COALESCE(u.email, 'No User') as user_email,
    COALESCE(p.name, 'No Profile') as profile_name
FROM users u
FULL OUTER JOIN user_profiles p ON u.id = p.user_id;
-- Note: Not supported in MySQL, use UNION of LEFT and RIGHT JOIN

-- Self JOIN - hierarchical data
SELECT 
    e.first_name + ' ' + e.last_name as employee,
    m.first_name + ' ' + m.last_name as manager,
    e.department,
    e.salary
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id
WHERE e.status = 'active'
ORDER BY e.department, e.salary DESC;

-- Multiple JOINs - complex relationships
SELECT 
    u.first_name + ' ' + u.last_name as customer_name,
    o.order_date,
    p.name as product_name,
    oi.quantity,
    oi.unit_price,
    (oi.quantity * oi.unit_price) as line_total,
    cat.name as category_name
FROM users u
INNER JOIN orders o ON u.id = o.customer_id
INNER JOIN order_items oi ON o.id = oi.order_id
INNER JOIN products p ON oi.product_id = p.id
LEFT JOIN categories cat ON p.category_id = cat.id
WHERE o.order_date >= '2023-01-01'
  AND o.status = 'completed'
ORDER BY o.order_date DESC, o.id, oi.id;

-- JOIN with aggregation and window functions
SELECT 
    u.first_name + ' ' + u.last_name as customer_name,
    COUNT(o.id) as total_orders,
    SUM(o.total_amount) as total_spent,
    AVG(o.total_amount) as avg_order_value,
    RANK() OVER (ORDER BY SUM(o.total_amount) DESC) as spending_rank,
    DENSE_RANK() OVER (ORDER BY COUNT(o.id) DESC) as order_frequency_rank
FROM users u
INNER JOIN orders o ON u.id = o.customer_id
WHERE o.status = 'completed'
  AND o.order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 1 YEAR)
GROUP BY u.id, u.first_name, u.last_name
HAVING COUNT(o.id) >= 3
ORDER BY total_spent DESC;
```
*Notice: COALESCE() handles NULL values in LEFT/RIGHT JOINs, and proper indexing on join columns is crucial for performance.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths / misconceptions</strong></summary>

<div>

- "JOINs are always slow" → With proper indexes, JOINs can be faster than subqueries
- "LEFT JOIN and RIGHT JOIN are the same" → They differ in order and results
- "INNER JOIN is the default" → True, but explicit notation makes code clearer

</div>
</details>

</div>

<div class="concept-section performance">

<details>
<summary>🚀 <strong>JOIN Performance Tips</strong></summary>

<div>

- **Index join columns**: Always index foreign key columns
- **Filter early**: Apply WHERE conditions before JOIN when possible
- **Use appropriate JOIN type**: Don't use LEFT JOIN if you need INNER JOIN
- **Avoid Cartesian products**: Always specify proper JOIN conditions

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Where you fail in interviews</strong></summary>

<div>

- Can't explain the difference between INNER and LEFT JOIN with examples
- Don't understand when to use self-joins
- Can't optimize slow JOIN queries

</div>
</details>

</div>

<div class="tags">
<span class="tag">sql</span>
<span class="tag">joins</span>
<span class="tag">medior</span>
<span class="tag">relationships</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Foreign Keys` · `Indexes` · `Query Optimization` · `Normalization` · `Performance Tuning`

</div>

### Indexes {#indexes}

</div>

**CREATE (INSERT)**
```sql
INSERT INTO users (name, email, age) VALUES ('John Doe', 'john@example.com', 30);
```

**READ (SELECT)**
```sql
SELECT name, email FROM users WHERE age > 25;
```

**UPDATE**
```sql
UPDATE users SET email = 'newemail@example.com' WHERE id = 1;
```

**DELETE**
```sql
DELETE FROM users WHERE age < 18;
```

### JOINs {#joins}

**INNER JOIN** - Returns records with matching values in both tables
```sql
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;
```

**LEFT JOIN** - Returns all records from left table
```sql
SELECT u.name, o.total
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;
```

**RIGHT JOIN** - Returns all records from right table
```sql
SELECT u.name, o.total
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;
```

### Indexes {#indexes}

Indexes improve query performance by creating faster access paths to data.

```sql
-- Create index for faster searches
CREATE INDEX idx_user_email ON users(email);

-- Composite index for multiple columns
CREATE INDEX idx_user_name_age ON users(name, age);

-- Unique index
CREATE UNIQUE INDEX idx_user_email_unique ON users(email);
```

### Transactions {#transactions}

Transactions ensure data consistency with ACID properties.

```sql
BEGIN TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT; -- or ROLLBACK if something goes wrong
```

## Best Practices

1. **Use parameterized queries** to prevent SQL injection
2. **Create appropriate indexes** for frequently queried columns
3. **Normalize data** to reduce redundancy
4. **Use transactions** for related operations
5. **Avoid SELECT *** - specify needed columns
6. **Use proper data types** for storage efficiency
7. **Regular backups** and disaster recovery planning