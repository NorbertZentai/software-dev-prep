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

<div class="concept-section definition">

📋 **Concept Definition**  
**Four basic database operations**: **Create** (INSERT), **Read** (SELECT), **Update** (UPDATE), **Delete** (DELETE). **INSERT**: adds new rows with specified column values, can specify columns or use defaults. **SELECT**: retrieves rows matching WHERE clause, with projections (column selection), joins, aggregations (COUNT, SUM, AVG), ordering, limiting. **UPDATE**: modifies existing rows matching WHERE condition. **DELETE**: removes rows matching WHERE clause (no WHERE = delete all). **Batch operations**: INSERT INTO...SELECT, UPDATE with subqueries, transactions for consistency. **Best practices**: use WHERE clause carefully, test on small datasets first, use transactions for multi-step operations, consider cascading deletes for foreign keys.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Data structure improving query performance** at cost of write overhead. **Types**: **B-tree** (default, balanced tree for range queries), **Hash** (exact matches, O(1)), **Bitmap** (low cardinality columns), **Full-text** (text search), **Spatial** (geographic data). **Clustered vs Non-clustered**: clustered determines physical row order (1 per table, often primary key), non-clustered has separate structure pointing to rows (multiple allowed). **Composite indexes**: multiple columns (order matters, leftmost prefix rule). **Trade-offs**: SELECT faster, INSERT/UPDATE/DELETE slower (index maintenance), storage overhead. **Query planner**: uses statistics to decide index usage (EXPLAIN ANALYZE). **Best practices**: index foreign keys, WHERE/JOIN/ORDER BY columns, avoid over-indexing.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Database design process** eliminating redundancy and dependency anomalies. **Normal Forms**: **1NF** (atomic columns, no repeating groups, primary key), **2NF** (1NF + no partial dependencies on composite key), **3NF** (2NF + no transitive dependencies), **BCNF** (Boyce-Codd, stricter 3NF), **4NF/5NF** (multi-valued dependencies). **Benefits**: data integrity (single source of truth), reduced storage, easier updates. **Denormalization**: intentional redundancy for read performance (analytics, reporting), trade consistency for speed. **Star schema**: denormalized for data warehouses (fact + dimension tables). **Best practices**: normalize to 3NF by default, denormalize with caching/views, consider use case (OLTP vs OLAP).

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Logical unit of work** comprising one or more SQL statements, executed atomically. **Commands**: BEGIN/START TRANSACTION, COMMIT (make permanent), ROLLBACK (undo all changes), SAVEPOINT (partial rollback). **ACID guarantees**: Atomicity (all-or-nothing), Consistency (valid state), Isolation (concurrent transactions isolated), Durability (committed changes persist). **Isolation levels**: READ UNCOMMITTED (dirty reads), READ COMMITTED (default in most DBs), REPEATABLE READ, SERIALIZABLE (strictest, prevents phantoms). **Concurrency control**: locking (pessimistic), MVCC (Multi-Version Concurrency Control, optimistic). **Deadlocks**: two transactions waiting for each other's locks, DB detects and aborts one. **Best practices**: keep transactions short, avoid user input during transaction, handle rollback scenarios.

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

### Isolation Levels {#isolation-levels}

<div class="concept-section definition" data-filter="transactions medior">

📋 **Concept Definition**  
**Four standardized transaction isolation levels** controlling concurrent transaction interference: **READ UNCOMMITTED** (dirty reads allowed, lowest isolation), **READ COMMITTED** (default in most RDBMS, prevents dirty reads but allows non-repeatable reads), **REPEATABLE READ** (consistent reads within transaction, prevents phantom reads in PostgreSQL/MySQL InnoDB), **SERIALIZABLE** (highest isolation, complete transaction serialization). **Trade-offs**: higher isolation = more consistency but lower concurrency and performance. **Locking mechanisms**: shared locks (FOR SHARE), exclusive locks (FOR UPDATE). **MVCC** (Multi-Version Concurrency Control) in PostgreSQL reduces lock contention via snapshot isolation.

</div>

<div class="concept-section why-important" data-filter="transactions medior">

💡 **Why it matters?**
- **Concurrency control**: manages multiple transactions accessing same data
- **Data consistency**: prevents dirty reads, non-repeatable reads, phantom reads
- **Performance trade-offs**: higher isolation reduces throughput
- **Application behavior**: understanding prevents subtle bugs in concurrent environments

</div>

<div class="runnable-model" data-filter="transactions medior">

**Runnable mental model**
```sql
-- READ UNCOMMITTED - Lowest isolation, dirty reads possible
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
BEGIN;
SELECT * FROM accounts; -- Can see uncommitted changes from other transactions
COMMIT;

-- READ COMMITTED - Default in most RDBMS
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
BEGIN;
SELECT balance FROM accounts WHERE id = 1; -- 1000
-- Another transaction updates to 1500 and commits
SELECT balance FROM accounts WHERE id = 1; -- 1500 (non-repeatable read)
COMMIT;

-- REPEATABLE READ - Consistent reads within transaction
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
BEGIN;
SELECT balance FROM accounts WHERE id = 1; -- 1000
-- Another transaction updates to 1500 and commits
SELECT balance FROM accounts WHERE id = 1; -- Still 1000 (repeatable)
COMMIT;

-- SERIALIZABLE - Highest isolation, no phantom reads
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN;
SELECT COUNT(*) FROM accounts WHERE balance > 1000; -- 5 rows
-- Another transaction inserts new row with balance > 1000
SELECT COUNT(*) FROM accounts WHERE balance > 1000; -- Still 5 (phantom read prevented)
COMMIT;

-- Lock demonstrations
BEGIN;
SELECT * FROM accounts WHERE id = 1 FOR UPDATE; -- Exclusive lock
-- Other sessions wait for lock release
UPDATE accounts SET balance = balance + 100 WHERE id = 1;
COMMIT; -- Lock released

-- Shared lock
BEGIN;
SELECT * FROM accounts WHERE id = 1 FOR SHARE; -- Shared lock
-- Other sessions can read but not modify
COMMIT;
```
*Notice: Higher isolation levels provide stronger consistency guarantees but reduce concurrency.*

</div>

<div class="concept-section myths" data-filter="transactions">

<details>
<summary>🧯 <strong>Common misconceptions</strong></summary>

<div>

- "Always use SERIALIZABLE for safety." → Too slow for most applications, use appropriate level
- "READ COMMITTED prevents all race conditions." → No, can still have non-repeatable reads
- "Isolation levels work the same across all databases." → Implementation varies (Oracle, PostgreSQL, MySQL differ)

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="transactions">

<details>
<summary>💼 <strong>Interview pitfalls</strong></summary>

<div>

- **"What isolation level would you use for a banking application?"** → REPEATABLE READ or SERIALIZABLE with proper locking
- **"Explain phantom reads."** → New rows appearing in repeated queries within same transaction
- **"How does MVCC improve performance?"** → Avoids locks by maintaining multiple data versions

</div>

</details>

</div>

<div class="tags">
<span class="tag">sql</span>
<span class="tag">transactions</span>
<span class="tag">medior</span>
<span class="tag">isolation</span>
<span class="tag">concurrency</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`ACID Properties` · `Transactions` · `Locking Mechanisms` · `Deadlocks` · `MVCC`

</div>

### ACID Properties {#acid}

<div class="concept-section definition">

📋 **Concept Definition**  
**Four properties guaranteeing reliable transactions**: **Atomicity** (all operations succeed or all fail, no partial execution), **Consistency** (database moves from valid state to valid state, constraints maintained), **Isolation** (concurrent transactions don't see intermediate states, achieved via locking/MVCC), **Durability** (committed changes survive crashes, via Write-Ahead Logging). **Implementation**: **Atomicity** via undo logs, **Consistency** via constraint checking, **Isolation** via locks or snapshots, **Durability** via redo logs flushed to disk. **Trade-offs**: strict ACID impacts performance, NoSQL databases often relax for scalability (BASE: Basically Available, Soft state, Eventually consistent). **Use cases**: financial systems, inventory, bookings require strong ACID.

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

### Explain Plan {#explain-plan}

<div class="concept-section definition" data-filter="performance medior">

📋 **Concept Definition**  
**Query execution plan analyzer** revealing query optimizer decisions for performance tuning. **EXPLAIN**: shows planned execution strategy. **EXPLAIN ANALYZE**: executes query and shows actual timings/row counts. **Key metrics**: **Seq Scan** (full table scan, slow), **Index Scan** (uses index, fast), **Index Only Scan** (covering index, fastest), **cost** (estimated computational cost), **rows** (estimated/actual rows), **buffers** (I/O operations). **Join strategies**: **Nested Loop** (good for small datasets), **Hash Join** (efficient for large datasets), **Merge Join** (sorted data). **Use cases**: identify missing indexes, optimize WHERE clauses, understand slow queries, validate index usage, compare query alternatives.

</div>

<div class="concept-section why-important" data-filter="performance medior">

💡 **Why it matters?**
- **Performance diagnosis**: identifies bottlenecks in slow queries
- **Index validation**: confirms indexes are used correctly
- **Cost analysis**: estimates query resource consumption
- **Optimization guidance**: reveals opportunities for improvement

</div>

<div class="runnable-model" data-filter="performance medior">

**Runnable mental model**
```sql
-- Basic EXPLAIN - show execution plan
EXPLAIN 
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.customer_id
GROUP BY u.id, u.name;

-- EXPLAIN ANALYZE - execute and show actual performance
EXPLAIN (ANALYZE, BUFFERS, VERBOSE)
SELECT u.name, o.total_amount
FROM users u
JOIN orders o ON u.id = o.customer_id
WHERE o.order_date >= '2024-01-01'
ORDER BY o.total_amount DESC
LIMIT 10;

/*
Plan interpretation:
- Seq Scan: Full table scan (SLOW for large tables)
- Index Scan: Uses index (FAST)
- Hash Join: Hash-based join (good for large datasets)
- Nested Loop: Nested loop join (good for small datasets)
- Sort: Sorting operation
- Limit: Result limiting
*/

-- Test index effectiveness
-- Slow query without index
EXPLAIN ANALYZE
SELECT * FROM orders WHERE customer_id = 123;

-- Create index
CREATE INDEX idx_orders_customer_id ON orders(customer_id);

-- Fast query with index
EXPLAIN ANALYZE
SELECT * FROM orders WHERE customer_id = 123;

-- Composite index optimization
CREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date);

EXPLAIN ANALYZE
SELECT * FROM orders 
WHERE customer_id = 123 AND order_date >= '2024-01-01';

-- Update table statistics for better planning
ANALYZE orders;

-- Identify problematic patterns
-- Seq Scan on large table
EXPLAIN ANALYZE 
SELECT * FROM big_table WHERE non_indexed_column = 'value';

-- Solution: create index
CREATE INDEX idx_big_table_column ON big_table(non_indexed_column);

-- Query cost comparison
EXPLAIN (ANALYZE, BUFFERS)
SELECT u.name, COUNT(o.id)
FROM users u
LEFT JOIN orders o ON u.id = o.customer_id
WHERE u.created_at >= '2024-01-01'
GROUP BY u.id, u.name
HAVING COUNT(o.id) > 5;
```
*Notice: explain plan reveals optimizer decisions and helps identify performance bottlenecks.*

</div>

<div class="concept-section myths" data-filter="performance">

<details>
<summary>🧯 <strong>Common misconceptions</strong></summary>

<div>

- "EXPLAIN executes the query." → EXPLAIN only plans, EXPLAIN ANALYZE executes
- "Lower cost is always better." → Cost is relative, compare alternatives for same query
- "Index Scan is always fast." → Can be slow if returns many rows or index is large

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="performance">

<details>
<summary>💼 <strong>Interview pitfalls</strong></summary>

<div>

- **"How would you optimize a slow query?"** → Run EXPLAIN ANALYZE, check indexes, rewrite if needed
- **"What's the difference between Seq Scan and Index Scan?"** → Seq Scan reads entire table, Index Scan uses index
- **"When would Hash Join be preferred over Nested Loop?"** → Hash Join better for large datasets, Nested Loop for small

</div>

</details>

</div>

<div class="tags">
<span class="tag">sql</span>
<span class="tag">performance</span>
<span class="tag">medior</span>
<span class="tag">optimization</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Indexes` · `Query Optimization` · `Performance Tuning` · `Database Monitoring`

</div>

### Primary Key vs Foreign Key {#primary-key-vs-foreign-key}

<div class="concept-section definition" data-filter="constraints junior">

📋 **Concept Definition**  
**Primary Key (PK)**: one or more columns uniquely identifying table rows, enforces UNIQUE + NOT NULL, auto-creates clustered index. **Foreign Key (FK)**: referential integrity constraint linking table column to another table's primary key. **CASCADE options**: ON DELETE CASCADE (delete child rows), SET NULL (set FK to NULL), RESTRICT (prevent parent deletion). **Prevents orphan records**: ensures related data consistency. **Composite keys**: multi-column primary/foreign keys for complex relationships. **Self-referencing FK**: hierarchical data (e.g., employee-manager relationship). **Performance impact**: indexes created automatically, improves join performance.

</div>

<div class="concept-section why-important" data-filter="constraints junior">

💡 **Why it matters?**
- **Data integrity**: ensures every record is unique and relationships are valid
- **Referential integrity**: prevents creating references to non-existent records
- **Query optimization**: automatic indexes improve performance
- **Cascade operations**: automated handling of related record changes

</div>

<div class="runnable-model" data-filter="constraints junior">

**Runnable mental model**
```sql
-- Primary Key - unique identifier
CREATE TABLE users (
    id SERIAL PRIMARY KEY,              -- Auto-increment primary key
    email VARCHAR(255) UNIQUE NOT NULL, -- Unique but not primary
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Composite Primary Key
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (order_id, product_id)  -- Composite key
);

-- Foreign Key - relationship to another table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT NOW(),
    total_amount DECIMAL(12,2),
    FOREIGN KEY (customer_id) REFERENCES users(id)
        ON DELETE CASCADE              -- Delete orders when user deleted
        ON UPDATE CASCADE              -- Propagate user ID updates
);

-- Foreign Key with different cascade options
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id INT,
    supplier_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
        ON DELETE SET NULL,            -- Set NULL when category deleted
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
        ON DELETE RESTRICT             -- Block supplier deletion if products exist
);

-- Self-referencing Foreign Key - hierarchical structure
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employees(id)
        ON DELETE SET NULL
);

-- Check FK constraints
SELECT 
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY';
```
*Notice: CASCADE, SET NULL, RESTRICT options provide different behaviors for parent record changes.*

</div>

<div class="concept-section myths" data-filter="constraints">

<details>
<summary>🧯 <strong>Common misconceptions</strong></summary>

<div>

- "Primary key must be AUTO_INCREMENT." → Can be UUID, composite, or manually assigned
- "Foreign key must be NOT NULL." → Can be NULL if relationship is optional
- "Only one primary key per table." → True, but can be composite (multiple columns)

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="constraints">

<details>
<summary>💼 <strong>Interview pitfalls</strong></summary>

<div>

- **"Difference between Primary Key and Unique constraint?"** → PK is unique + NOT NULL, Unique allows NULL
- **"When would you use ON DELETE CASCADE?"** → When child records have no meaning without parent
- **"Can a table have multiple primary keys?"** → No, but can have composite primary key

</div>

</details>

</div>

<div class="tags">
<span class="tag">sql</span>
<span class="tag">constraints</span>
<span class="tag">junior</span>
<span class="tag">relationships</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Referential Integrity` · `Indexes` · `Normalization` · `Data Modeling`

</div>

### Unique and Check Constraints {#unique-check-constraints}

<div class="concept-section definition" data-filter="constraints junior">

📋 **Concept Definition**  
**UNIQUE constraint**: enforces column/column-combination uniqueness, allows NULL values (multiple NULLs permitted in PostgreSQL), auto-creates non-clustered index. **CHECK constraint**: declarative business rules enforcement (e.g., price > 0, status IN ('active', 'inactive'), age >= 18), validates data at INSERT/UPDATE. **Composite unique**: multiple columns together must be unique (e.g., UNIQUE(user_id, role_id)). **Named constraints**: easier ALTER/DROP management. **Performance**: UNIQUE creates index (faster lookups), CHECK minimal overhead. **Use cases**: email uniqueness, enum validation, price/quantity ranges, date logic (start_date < end_date).

</div>

<div class="concept-section why-important" data-filter="constraints junior">

💡 **Why it matters?**
- **Business rules enforcement**: validates data at database level, not just application
- **Data quality**: prevents invalid data before it's persisted
- **Performance**: UNIQUE constraint creates automatic index
- **Early error detection**: immediate feedback on constraint violations

</div>

<div class="runnable-model" data-filter="constraints junior">

**Runnable mental model**
```sql
-- Unique constraints - enforce uniqueness
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,     -- Unique email
    username VARCHAR(50) UNIQUE NOT NULL,   -- Unique username
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Composite unique constraint - combined uniqueness
CREATE TABLE user_roles (
    user_id INT,
    role_id INT,
    assigned_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, role_id),               -- Each user can have each role only once
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Check constraints - business rules
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    discount_percent INT DEFAULT 0,
    stock_quantity INT NOT NULL DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active',
    
    -- Check constraints
    CONSTRAINT price_positive CHECK (price > 0),
    CONSTRAINT discount_valid CHECK (discount_percent BETWEEN 0 AND 100),
    CONSTRAINT stock_non_negative CHECK (stock_quantity >= 0),
    CONSTRAINT status_valid CHECK (status IN ('active', 'inactive', 'discontinued'))
);

-- Complex check constraints
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL DEFAULT CURRENT_DATE,
    ship_date DATE,
    total_amount DECIMAL(12,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    
    -- Complex business rules
    CONSTRAINT ship_after_order CHECK (ship_date IS NULL OR ship_date >= order_date),
    CONSTRAINT amount_positive CHECK (total_amount > 0),
    CONSTRAINT status_valid CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
    
    FOREIGN KEY (customer_id) REFERENCES users(id)
);

-- Conditional check constraints
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL,
    hire_date DATE NOT NULL DEFAULT CURRENT_DATE,
    salary DECIMAL(10,2),
    department VARCHAR(50),
    
    -- Age requirement
    CONSTRAINT adult_employee CHECK (birth_date <= CURRENT_DATE - INTERVAL '18 years'),
    -- Hire date logical
    CONSTRAINT hire_after_birth CHECK (hire_date > birth_date),
    -- Salary by department
    CONSTRAINT salary_by_dept CHECK (
        (department = 'intern' AND salary >= 1000) OR
        (department = 'junior' AND salary >= 2000) OR  
        (department = 'senior' AND salary >= 4000) OR
        (department NOT IN ('intern', 'junior', 'senior'))
    )
);

-- Partial unique indexes - conditional uniqueness
CREATE UNIQUE INDEX idx_users_active_email 
ON users(email) 
WHERE status = 'active';  -- Only active users' emails must be unique

-- Check constraints
SELECT 
    conname AS constraint_name,
    contype AS constraint_type,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint 
WHERE conrelid = 'products'::regclass;
```
*Notice: check constraints can contain complex business logic and conditional expressions.*

</div>

<div class="concept-section myths" data-filter="constraints">

<details>
<summary>🧯 <strong>Common misconceptions</strong></summary>

<div>

- "Check constraints only work with simple values." → Can use complex expressions and subqueries
- "Unique constraint doesn't allow NULL." → NULL values are allowed, only one NULL in some databases
- "Constraints slow down INSERT." → Yes, but they prevent invalid data and ensure consistency

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="constraints">

<details>
<summary>💼 <strong>Interview pitfalls</strong></summary>

<div>

- **"When would you use CHECK constraint vs application validation?"** → Both layers - database ensures data integrity even if application has bugs
- **"Can UNIQUE constraint be NULL?"** → Yes, multiple NULLs typically allowed
- **"Performance impact of constraints?"** → UNIQUE creates index (performance gain), CHECK minimal overhead

</div>

</details>

</div>

<div class="tags">
<span class="tag">sql</span>
<span class="tag">constraints</span>
<span class="tag">junior</span>
<span class="tag">data-integrity</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Data Integrity` · `Business Rules` · `Indexes` · `Data Validation`

</div>

### Window Functions {#window-functions}

<div class="concept-section definition">

📋 **Concept Definition**  
**SQL functions performing calculations across row sets** related to current row without grouping. **Structure**: function() OVER (PARTITION BY ... ORDER BY ... ROWS/RANGE ...). **Functions**: **Ranking** (ROW_NUMBER, RANK, DENSE_RANK, NTILE), **Aggregate** (SUM, AVG, COUNT over window), **Analytical** (LAG, LEAD for prev/next row, FIRST_VALUE, LAST_VALUE). **PARTITION BY**: divides rows into groups (like GROUP BY but doesn't collapse rows). **ORDER BY**: defines order within partition. **Frame clause**: ROWS BETWEEN ... (physical rows) or RANGE BETWEEN ... (logical range). **Use cases**: running totals, moving averages, rank within category, compare to previous period. **vs GROUP BY**: window functions retain all rows.

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

### Default Values {#default-values}

<div class="concept-section definition" data-filter="schema junior">

📋 **Concept Definition**  
**Column default value** specification: auto-populated on INSERT when no explicit value provided. **Types**: **literal constants** (0, 'active', FALSE), **functions** (CURRENT_TIMESTAMP, NOW(), UUID_GENERATE_V4()), **expressions** (calculations, concatenations). **Syntax**: DEFAULT keyword in CREATE TABLE. **ALTER TABLE** allows ADD/DROP DEFAULT. **NULL vs DEFAULT**: explicit NULL overrides default, omitted column uses default. PostgreSQL: supports complex expressions (e.g., DEFAULT (price * 1.2)). Use cases: timestamps (created_at), status flags, counters, sequential IDs (with sequences/serial types).

</div>

<div class="concept-section why-important" data-filter="schema junior">

💡 **Why it matters?**
- **Data consistency**: ensures consistent default values across all applications
- **User experience**: fewer required fields, faster data entry
- **Application logic**: simpler code, not every field needs handling
- **Business rules**: automatic values based on business logic

</div>

<div class="runnable-model" data-filter="schema junior">

**Runnable mental model**
```sql
-- Simple default values
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'active',                -- String default
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,     -- Timestamp default
    is_verified BOOLEAN DEFAULT FALSE,                  -- Boolean default
    login_count INT DEFAULT 0,                          -- Integer default
    credit_balance DECIMAL(10,2) DEFAULT 0.00           -- Decimal default
);

-- Function-based defaults
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(20) DEFAULT ('ORD-' || nextval('order_number_seq')),
    customer_id INT NOT NULL,
    order_date DATE DEFAULT CURRENT_DATE,
    ship_date DATE DEFAULT (CURRENT_DATE + INTERVAL '3 days'),      -- Calculated default
    total_amount DECIMAL(12,2) DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(20) DEFAULT 'pending',
    
    FOREIGN KEY (customer_id) REFERENCES users(id)
);

-- JSON default values
CREATE TABLE user_preferences (
    user_id INT PRIMARY KEY,
    settings JSONB DEFAULT '{"theme": "light", "language": "en", "notifications": true}'::jsonb,
    metadata JSONB DEFAULT '{}'::jsonb,
    
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Testing defaults
INSERT INTO users (name, email) 
VALUES ('John Doe', 'john@example.com');
-- status='active', created_at=now(), is_verified=false automatically

-- Modify default values
ALTER TABLE users ALTER COLUMN status SET DEFAULT 'pending';
ALTER TABLE users ALTER COLUMN credit_balance DROP DEFAULT;
```
*Notice: functions, sequences, and calculated values can be used as defaults.*

</div>

<div class="concept-section myths" data-filter="schema">

<details>
<summary>🧯 <strong>Common misconceptions</strong></summary>

<div>

- "Default values must be literals." → Can be functions, sequences, or expressions
- "Can't change defaults after table creation." → ALTER TABLE...SET DEFAULT works
- "DEFAULT same as NULL." → No, DEFAULT provides value when omitted, NULL is explicit

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="schema">

<details>
<summary>💼 <strong>Interview pitfalls</strong></summary>

<div>

- **"When would you use default values?"** → Common values, audit fields, business logic simplification
- **"Difference between SERIAL and SEQUENCE?"** → SERIAL is shorthand for AUTO_INCREMENT with sequence
- **"How to update default value on existing table?"** → ALTER TABLE... ALTER COLUMN... SET DEFAULT

</div>

</details>

</div>

<div class="tags">
<span class="tag">sql</span>
<span class="tag">schema</span>
<span class="tag">junior</span>
<span class="tag">defaults</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Schema Design` · `Data Types` · `Sequences` · `Functions`

</div>

### NULL Handling {#null-handling}

<div class="concept-section definition" data-filter="null-handling junior">

📋 **Concept Definition**  
**NULL** represents unknown or non-applicable value in SQL, introducing **three-valued logic**: TRUE, FALSE, and UNKNOWN. **NULL != NULL** (result is NULL, not TRUE), use **IS NULL / IS NOT NULL** operators. **Aggregation functions** (COUNT, SUM, AVG) exclude NULL values. **COALESCE(val1, val2, ...)** returns first non-NULL value. **NULLIF(val1, val2)** returns NULL if values equal, otherwise first value. **NULLs in comparisons**: any comparison with NULL yields NULL. **NULLs in JOINs**: NULLs don't match anything, including other NULLs. **Business logic**: distinguish empty vs unknown vs not applicable.

</div>

<div class="concept-section why-important" data-filter="null-handling junior">

💡 **Why it matters?**
- **Three-valued logic**: TRUE, FALSE, NULL changes logical operations
- **Aggregation impact**: NULL values excluded from COUNT, SUM, AVG calculations
- **Comparison pitfalls**: NULL = NULL yields NULL, not TRUE
- **Business logic**: distinguish empty vs unknown vs not applicable

</div>

<div class="runnable-model" data-filter="null-handling junior">

**Runnable mental model**
```sql
-- NULL checking - IS NULL and IS NOT NULL
SELECT id, name, email, phone
FROM users
WHERE phone IS NULL;           -- Correct NULL check

-- COALESCE - return first non-NULL value
SELECT 
    id,
    name,
    COALESCE(phone, email, 'No contact info') as primary_contact
FROM users;

-- NULLIF - convert value to NULL based on condition
SELECT 
    id,
    name,
    NULLIF(phone, '') as clean_phone,           -- Empty string → NULL
    NULLIF(discount_percent, -1) as active_discount  -- -1 → NULL
FROM users;

-- NULL in aggregation
SELECT 
    COUNT(*) as total_records,                   -- All records
    COUNT(phone) as records_with_phone,          -- NULL excluded
    AVG(age) as avg_age                          -- NULL excluded from average
FROM users;

-- NULL in comparisons
SELECT * FROM users WHERE phone = NULL;   -- ❌ Always returns empty (use IS NULL)
SELECT * FROM users WHERE phone IS NULL;  -- ✅ Correct

-- NULL in WHERE clauses
SELECT * FROM products 
WHERE category_id = 5 OR category_id IS NULL;  -- Include uncategorized

-- NULL-safe comparison (some databases)
SELECT * FROM users WHERE phone <=> NULL;  -- MySQL null-safe comparison
```
*Notice: NULL != NULL, use IS NULL and IS NOT NULL for proper NULL checking.*

</div>

<div class="concept-section myths" data-filter="null-handling">

<details>
<summary>🧯 <strong>Common misconceptions</strong></summary>

<div>

- "NULL same as empty string." → No, NULL is unknown value, empty string is concrete value
- "NULL = NULL returns TRUE." → No, NULL = NULL returns NULL (UNKNOWN)
- "COUNT(*) excludes NULLs." → COUNT(*) counts all rows, COUNT(column) excludes NULLs

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="null-handling">

<details>
<summary>💼 <strong>Interview pitfalls</strong></summary>

<div>

- **"How do you check for NULL?"** → Use IS NULL / IS NOT NULL, not = NULL
- **"What does NULL mean?"** → Unknown or not applicable value, not zero or empty
- **"How do aggregations handle NULL?"** → Excluded from COUNT(column), SUM, AVG; included in COUNT(*)

</div>

</details>

</div>

<div class="tags">
<span class="tag">sql</span>
<span class="tag">null-handling</span>
<span class="tag">junior</span>
<span class="tag">logic</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Three-Valued Logic` · `Aggregations` · `WHERE Clauses` · `JOINs`

</div>

### CTE (Common Table Expressions) {#cte}

<div class="concept-section definition" data-filter="advanced-queries medior">

📋 **Concept Definition**  
**CTE (Common Table Expression)**: named result set defined with WITH clause, available during query execution. **Structures** and **modularizes** complex queries into readable, reusable parts. **Recursive CTE**: enables hierarchical or graph data traversal (trees, BOMs, org charts) with base case + recursive case pattern. **vs subqueries**: better readability, query optimizer support, can reference multiple times. **vs temp tables**: lighter weight, no cleanup needed, transaction-scoped. **Use cases**: complex reporting, recursive hierarchies, query decomposition, intermediate calculations.

</div>

<div class="concept-section why-important" data-filter="advanced-queries medior">

💡 **Why it matters?**
- **Query readability**: breaks complex queries into structured, readable parts
- **Code reuse**: same CTE referenced multiple times in query
- **Recursive queries**: handles hierarchical data (tree structures)
- **Performance**: sometimes better than subqueries or temp tables

</div>

<div class="runnable-model" data-filter="advanced-queries medior">

**Runnable mental model**
```sql
-- Simple CTE - sales summary
WITH monthly_sales AS (
    SELECT 
        DATE_TRUNC('month', order_date) as month,
        SUM(total_amount) as monthly_revenue,
        COUNT(*) as order_count
    FROM orders
    WHERE order_date >= '2024-01-01'
    GROUP BY DATE_TRUNC('month', order_date)
)
SELECT 
    month,
    monthly_revenue,
    order_count,
    LAG(monthly_revenue) OVER (ORDER BY month) as prev_month_revenue,
    monthly_revenue - LAG(monthly_revenue) OVER (ORDER BY month) as revenue_growth
FROM monthly_sales
ORDER BY month;

-- Multiple CTEs - complex analysis
WITH customer_stats AS (
    SELECT 
        customer_id,
        COUNT(*) as order_count,
        SUM(total_amount) as total_spent,
        AVG(total_amount) as avg_order_value,
        MAX(order_date) as last_order_date
    FROM orders
    GROUP BY customer_id
),
customer_segments AS (
    SELECT 
        customer_id,
        order_count,
        total_spent,
        CASE 
            WHEN total_spent >= 5000 THEN 'VIP'
            WHEN total_spent >= 1000 THEN 'Premium'
            WHEN total_spent >= 100 THEN 'Regular'
            ELSE 'New'
        END as segment
    FROM customer_stats
)
SELECT 
    u.name,
    u.email,
    cs.order_count,
    cs.total_spent,
    seg.segment,
    CASE 
        WHEN cs.last_order_date < CURRENT_DATE - INTERVAL '90 days' THEN 'Inactive'
        ELSE 'Active'
    END as activity_status
FROM users u
JOIN customer_stats cs ON u.id = cs.customer_id
JOIN customer_segments seg ON u.id = seg.customer_id;

-- Recursive CTE - hierarchical data
WITH RECURSIVE employee_hierarchy AS (
    -- Base case: top-level managers
    SELECT 
        id,
        name,
        manager_id,
        0 as level,
        name as path
    FROM employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive case: subordinates
    SELECT 
        e.id,
        e.name,
        e.manager_id,
        eh.level + 1,
        eh.path || ' -> ' || e.name
    FROM employees e
    JOIN employee_hierarchy eh ON e.manager_id = eh.id
)
SELECT 
    REPEAT('  ', level) || name as indented_name,
    level,
    path as hierarchy_path
FROM employee_hierarchy
ORDER BY path;

-- CTE with window functions
WITH product_sales AS (
    SELECT 
        p.category_id,
        p.name as product_name,
        SUM(oi.quantity * oi.unit_price) as total_revenue
    FROM products p
    JOIN order_items oi ON p.id = oi.product_id
    JOIN orders o ON oi.order_id = o.id
    WHERE o.order_date >= '2024-01-01'
    GROUP BY p.category_id, p.name
),
ranked_products AS (
    SELECT 
        category_id,
        product_name,
        total_revenue,
        ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY total_revenue DESC) as rank_in_category,
        PERCENT_RANK() OVER (ORDER BY total_revenue DESC) as revenue_percentile
    FROM product_sales
)
SELECT 
    c.name as category_name,
    rp.product_name,
    rp.total_revenue,
    rp.rank_in_category,
    ROUND(rp.revenue_percentile * 100, 2) as revenue_percentile
FROM ranked_products rp
JOIN categories c ON rp.category_id = c.id
WHERE rp.rank_in_category <= 3  -- Top 3 per category
ORDER BY c.name, rp.rank_in_category;
```
*Notice: CTEs make complex queries readable and maintainable.*

</div>

<div class="concept-section myths" data-filter="advanced-queries">

<details>
<summary>🧯 <strong>Common misconceptions</strong></summary>

<div>

- "CTE creates temp table." → No, just named result set (though optimizer may materialize)
- "CTEs always improve performance." → Not always, sometimes subqueries are faster
- "Can't use CTE recursively." → Recursive CTEs specifically designed for hierarchical data

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="advanced-queries">

<details>
<summary>💼 <strong>Interview pitfalls</strong></summary>

<div>

- **"When would you use CTE vs subquery?"** → CTE for readability, reusability, recursive queries
- **"Explain recursive CTE."** → Base case + recursive case, used for hierarchical data
- **"CTE performance vs temp table?"** → CTE lighter, temp table for multiple queries

</div>

</details>

</div>

<div class="tags">
<span class="tag">sql</span>
<span class="tag">advanced-queries</span>
<span class="tag">medior</span>
<span class="tag">cte</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Subqueries` · `Recursive Queries` · `Query Optimization` · `Hierarchical Data`

</div>

### Views {#views}

<div class="concept-section definition" data-filter="views junior">

📋 **Concept Definition**  
**Virtual table** based on SELECT query result: no physical data storage, query executed on access. **Benefits**: **abstraction layer** (hide complexity), **security** (column/row filtering), **code reuse** (centralized queries), **backward compatibility** (schema evolution). **Materialized view**: stores result physically, periodic refresh (REFRESH MATERIALIZED VIEW). **Updatable views**: simple views with INSERT/UPDATE/DELETE support. **WITH CHECK OPTION**: enforces view WHERE condition on modifications. Performance: no overhead (simple delegation), possible optimization by query planner.

</div>

<div class="concept-section why-important" data-filter="views junior">

💡 **Why it matters?**
- **Abstraction layer**: hides complex queries behind simple interface
- **Security**: exposes only necessary columns and rows
- **Code reuse**: centralizes frequent queries
- **Backward compatibility**: protects against schema changes

</div>

<div class="runnable-model" data-filter="views junior">

**Runnable mental model**
```sql
-- Simple view - column filtering
CREATE VIEW user_public_info AS
SELECT 
    id,
    name,
    email,
    created_at,
    status
FROM users
WHERE status = 'active';

-- Complex view - JOINs and aggregation
CREATE VIEW order_summary AS
SELECT 
    u.id as customer_id,
    u.name as customer_name,
    COUNT(o.id) as total_orders,
    COALESCE(SUM(o.total_amount), 0) as total_spent,
    MAX(o.order_date) as last_order_date,
    CASE 
        WHEN SUM(o.total_amount) > 1000 THEN 'VIP'
        WHEN SUM(o.total_amount) > 500 THEN 'Premium'
        ELSE 'Regular'
    END as customer_tier
FROM users u
LEFT JOIN orders o ON u.id = o.customer_id
WHERE u.status = 'active'
GROUP BY u.id, u.name;

-- Business logic view
CREATE VIEW product_availability AS
SELECT 
    p.id,
    p.name,
    p.price,
    p.stock_quantity,
    CASE 
        WHEN p.stock_quantity = 0 THEN 'Out of Stock'
        WHEN p.stock_quantity < 10 THEN 'Low Stock'
        ELSE 'In Stock'
    END as availability_status,
    CASE 
        WHEN p.status = 'active' AND p.stock_quantity > 0 THEN TRUE
        ELSE FALSE
    END as can_order
FROM products p;

-- Using views
SELECT * FROM order_summary WHERE customer_tier = 'VIP';

-- Update or replace view
CREATE OR REPLACE VIEW user_public_info AS
SELECT 
    id,
    name,
    email,
    created_at,
    status,
    is_verified  -- New column added
FROM users
WHERE status IN ('active', 'pending');

-- Drop view
DROP VIEW IF EXISTS old_report_view;
```
*Notice: views provide real-time data, not cached versions.*

</div>

<div class="concept-section myths" data-filter="views">

<details>
<summary>🧯 <strong>Common misconceptions</strong></summary>

<div>

- "Views are slow." → Simple views are fast, but complex JOINs/aggregations can slow down
- "Views store data." → No, only query definition stored (except materialized views)
- "Can't write through views." → Simple views are updatable, complex usually aren't

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="views">

<details>
<summary>💼 <strong>Interview pitfalls</strong></summary>

<div>

- **"When would you use a view?"** → Abstract complexity, security, centralize queries
- **"Difference between view and materialized view?"** → View is query, materialized view stores result
- **"Can you index a view?"** → Regular views no, materialized views yes

</div>

</details>

</div>

<div class="tags">
<span class="tag">sql</span>
<span class="tag">views</span>
<span class="tag">junior</span>
<span class="tag">abstraction</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Materialized Views` · `Security` · `Query Abstraction` · `Schema Evolution`

</div>

## Common Anti-Patterns and Pitfalls

<div class="concept-section myths" data-filter="junior medior">

### SELECT * Usage

<details>
<summary>🧯 <strong>Excessive data transfer</strong></summary>

<div>

**❌ Wrong example - Wasteful query:**
```sql
-- WRONG - unnecessary data transfer
SELECT * FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.price > 100;
-- Maybe only need name and price, but all fields returned
```

**✅ Correct solution - Specific columns:**
```sql
-- CORRECT - only necessary columns
SELECT p.name, p.price, c.name as category_name
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.price > 100;
```

**Why problematic:**
- Unnecessary network traffic
- Increased memory usage
- Lost opportunity for covering indexes
- Brittle code - breaks when new column added

</div>

</details>

### N+1 Query Problem

<details>
<summary>⚡ <strong>Exponential performance loss</strong></summary>

<div>

**❌ Wrong example - N+1 anti-pattern:**
```sql
-- WRONG - N+1 query pattern
-- 1. Query: fetch users (1 query)
SELECT * FROM users;

-- 2. N Queries: separate query per user (in application code)
-- SELECT COUNT(*) FROM orders WHERE customer_id = 1;
-- SELECT COUNT(*) FROM orders WHERE customer_id = 2;
-- SELECT COUNT(*) FROM orders WHERE customer_id = 3;
-- ... 1000 users = 1000 queries!
```

**✅ Correct solution - Single JOIN:**
```sql
-- CORRECT - single optimized query
SELECT 
    u.id,
    u.name,
    u.email,
    COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.customer_id
GROUP BY u.id, u.name, u.email;
-- 1000 users = 1 query!
```

**Performance impact:**
- 1000 users: 1001 queries → 1 query
- Network latency: 1001 * 5ms = 5 seconds → 5ms
- Reduced database connection pool pressure

</div>

</details>

### SQL Injection

<details>
<summary>🛡️ <strong>Critical security vulnerability</strong></summary>

<div>

**❌ Dangerous example - Direct string concatenation:**
```sql
-- DANGEROUS - SQL injection vulnerability
-- Application code: "SELECT * FROM users WHERE email = '" + userInput + "';"
-- If userInput = "test@example.com'; DROP TABLE users; --"
-- Result: Entire users table deleted!
```

**✅ Safe solution - Prepared statements:**
```java
// SAFE - Prepared statement
String sql = "SELECT * FROM users WHERE email = ?";
PreparedStatement stmt = connection.prepareStatement(sql);
stmt.setString(1, userInput);
ResultSet rs = stmt.executeQuery();
```

**Protection methods:**
- Use prepared statements/parameterized queries
- Input validation and sanitization
- Least privilege principle - minimal DB permissions
- ORM usage (Hibernate, MyBatis)

</div>

</details>

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Two SQL language categories**: **DDL (Data Definition Language)** defines schema structure, **DML (Data Manipulation Language)** modifies data. **DDL commands**: CREATE (tables, indexes, views), ALTER (modify schema), DROP (delete objects), TRUNCATE (delete all rows, faster than DELETE). **DML commands**: SELECT, INSERT, UPDATE, DELETE. **Additional categories**: **DCL** (Data Control Language: GRANT, REVOKE), **TCL** (Transaction Control: COMMIT, ROLLBACK). **Implicit commits**: DDL auto-commits in most databases (can't rollback CREATE TABLE). **Migrations**: version-controlled DDL scripts (Flyway, Liquibase) for schema evolution. **Permissions**: DBAs have DDL rights, applications typically only DML.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Combining rows from multiple tables** based on related columns. **INNER JOIN**: returns only matching rows from both tables (intersection). **LEFT (OUTER) JOIN**: all rows from left table + matches from right (NULLs for non-matches). **RIGHT (OUTER) JOIN**: all rows from right table + matches from left. **FULL (OUTER) JOIN**: all rows from both tables (NULLs where no match). **CROSS JOIN**: Cartesian product (all combinations). **SELF JOIN**: table joined with itself. **Join conditions**: ON clause (any boolean), USING (equal column names). **Performance**: indexed join columns, avoid Cartesian products, consider join order. **Execution**: nested loops, hash joins, merge joins (query planner chooses).

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

### Stored Procedures {#stored-procedures}

<div class="concept-section definition">

📋 **Concept Definition**  
**Stored Procedures** are precompiled SQL functions stored in the database containing procedural logic (variables, loops, conditionals). **Features**: DECLARE variables, BEGIN/END block, EXCEPTION handling, transaction management (COMMIT/ROLLBACK). **Benefits**: **performance** (precompiled execution plan), **security** (SQL injection prevention, controlled access), **business logic centralization**. Languages: PL/pgSQL (PostgreSQL), PL/SQL (Oracle), T-SQL (SQL Server). **Functions** return values (used in SELECT), **Procedures** have IN/OUT parameters (called with CALL/EXECUTE).

</div>

<div class="runnable-model">

**Runnable mental model**
```sql
-- Simple stored procedure - create user
CREATE OR REPLACE FUNCTION create_user(
    p_name VARCHAR(100),
    p_email VARCHAR(255),
    p_initial_credit DECIMAL(10,2) DEFAULT 10.00
) RETURNS INT AS $$
DECLARE
    user_id INT;
BEGIN
    -- Input validation
    IF p_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
        RAISE EXCEPTION 'Invalid email format: %', p_email;
    END IF;
    
    -- Create user
    INSERT INTO users (name, email, credit_balance, status)
    VALUES (p_name, p_email, p_initial_credit, 'active')
    RETURNING id INTO user_id;
    
    -- Audit log
    INSERT INTO user_audit (user_id, action, created_at)
    VALUES (user_id, 'USER_CREATED', NOW());
    
    RETURN user_id;
EXCEPTION
    WHEN unique_violation THEN
        RAISE EXCEPTION 'Email already exists: %', p_email;
END;
$$ LANGUAGE plpgsql;

-- Complex procedure - process order
CREATE OR REPLACE FUNCTION process_order(
    p_customer_id INT,
    p_product_id INT,
    p_quantity INT
) RETURNS INT AS $$
DECLARE
    v_order_id INT;
    v_available_stock INT;
    v_product_price DECIMAL(10,2);
BEGIN
    -- Lock and check stock
    SELECT stock_quantity, price INTO v_available_stock, v_product_price
    FROM products WHERE id = p_product_id FOR UPDATE;
    
    IF v_available_stock < p_quantity THEN
        RAISE EXCEPTION 'Insufficient stock';
    END IF;
    
    -- Create order
    INSERT INTO orders (customer_id, total_amount, status)
    VALUES (p_customer_id, v_product_price * p_quantity, 'confirmed')
    RETURNING id INTO v_order_id;
    
    -- Update stock
    UPDATE products 
    SET stock_quantity = stock_quantity - p_quantity
    WHERE id = p_product_id;
    
    RETURN v_order_id;
END;
$$ LANGUAGE plpgsql;

-- Usage
SELECT create_user('John Doe', 'john@example.com', 25.00);
SELECT process_order(1, 123, 2);
```

</div>

### Functions {#functions}

<div class="concept-section definition">

📋 **Concept Definition**  
**Database Functions** are reusable code blocks accepting parameters and returning values via RETURNS clause. **Scalar functions** return single values (INT, VARCHAR), **Table-valued functions** return result sets (RETURNS TABLE). **Types**: **Deterministic** (pure, same input = same output) vs **Non-deterministic** (NOW(), RANDOM()). **Volatility**: IMMUTABLE (cacheable), STABLE (same within transaction), VOLATILE (always recalculate). Used in SELECT, WHERE, JOIN conditions.

</div>

<div class="runnable-model">

**Runnable mental model**
```sql
-- Scalar function - calculate discount
CREATE OR REPLACE FUNCTION calculate_discount(
    original_price DECIMAL(10,2),
    discount_percent INT
) RETURNS DECIMAL(10,2) AS $$
BEGIN
    RETURN original_price * (100 - discount_percent) / 100;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Business logic function - customer tier
CREATE OR REPLACE FUNCTION get_customer_tier(customer_id INT) 
RETURNS VARCHAR(20) AS $$
DECLARE
    total_spent DECIMAL(12,2);
BEGIN
    SELECT COALESCE(SUM(total_amount), 0) INTO total_spent
    FROM orders WHERE customer_id = get_customer_tier.customer_id;
    
    IF total_spent >= 5000 THEN RETURN 'PLATINUM';
    ELSIF total_spent >= 1000 THEN RETURN 'GOLD';
    ELSIF total_spent >= 100 THEN RETURN 'SILVER';
    ELSE RETURN 'BRONZE';
    END IF;
END;
$$ LANGUAGE plpgsql STABLE;

-- Table-valued function
CREATE OR REPLACE FUNCTION get_customer_orders(p_customer_id INT)
RETURNS TABLE(order_id INT, order_date DATE, total_amount DECIMAL) AS $$
BEGIN
    RETURN QUERY
    SELECT id, order_date::DATE, total_amount
    FROM orders WHERE customer_id = p_customer_id
    ORDER BY order_date DESC LIMIT 10;
END;
$$ LANGUAGE plpgsql;

-- Usage in queries
SELECT name, get_customer_tier(id) as tier
FROM users WHERE get_customer_tier(id) = 'PLATINUM';

SELECT * FROM get_customer_orders(1);
```

</div>

### Sequences and Auto Increment {#sequences-auto-increment}

<div class="concept-section definition">

📋 **Concept Definition**  
**Sequences** generate unique, sequential numbers in a thread-safe manner. **Parameters**: START WITH (initial value), INCREMENT BY (step), MINVALUE/MAXVALUE (range), CACHE (pre-generated count), CYCLE (restart after MAX). **SERIAL** (PostgreSQL) and **AUTO_INCREMENT** (MySQL) are shorthand for sequence-backed PRIMARY KEYs. Functions: nextval() (get next), currval() (current), setval() (set value). **UUID** alternative for globally unique identifiers.

</div>

<div class="runnable-model">

**Runnable mental model**
```sql
-- Create sequence
CREATE SEQUENCE order_id_seq
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 1000
    MAXVALUE 999999999
    CACHE 20;

-- Manual sequence usage
INSERT INTO orders (id, customer_id, total_amount)
VALUES (nextval('order_id_seq'), 1, 100.00);

-- SERIAL shorthand (PostgreSQL)
CREATE TABLE products (
    id SERIAL PRIMARY KEY,  -- Auto-generates sequence
    name VARCHAR(100)
);

-- AUTO_INCREMENT (MySQL)
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);

-- Get current sequence value
SELECT currval('order_id_seq');  -- Last value returned by nextval()

-- Set sequence value
SELECT setval('order_id_seq', 5000);  -- Next nextval() will return 5001

-- UUID alternative for distributed systems
CREATE TABLE events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);
```

</div>

### Advanced Aggregation {#advanced-aggregation}

<div class="concept-section definition">

📋 **Concept Definition**  
**Advanced aggregation**: **ROLLUP** (hierarchical subtotals), **CUBE** (all grouping combinations), **GROUPING SETS** (custom subtotals). **FILTER clause** for conditional aggregation (COUNT(*) FILTER (WHERE status='active')). **HAVING** filters post-aggregation. **Window functions**: RANK(), ROW_NUMBER(), LEAD(), LAG() with OVER (PARTITION BY ... ORDER BY ...). Use cases: sales reports, cohort analysis, time-series analytics, moving averages.

</div>

<div class="runnable-model">

**Runnable mental model**
```sql
-- GROUP BY ROLLUP - hierarchical subtotals
SELECT 
    COALESCE(category, 'TOTAL') as category,
    COALESCE(status, 'ALL') as status,
    COUNT(*) as count,
    SUM(price * stock_quantity) as inventory_value
FROM products
GROUP BY ROLLUP(category, status);

-- GROUPING SETS - custom combinations
SELECT 
    EXTRACT(YEAR FROM order_date) as year,
    status,
    COUNT(*) as orders,
    SUM(total_amount) as revenue
FROM orders
GROUP BY GROUPING SETS (
    (EXTRACT(YEAR FROM order_date), status),  -- By year and status
    (EXTRACT(YEAR FROM order_date)),          -- By year only
    (status),                                  -- By status only
    ()                                         -- Grand total
);

-- Conditional aggregation with FILTER
SELECT 
    customer_id,
    COUNT(*) as total_orders,
    COUNT(*) FILTER (WHERE status = 'completed') as completed,
    COUNT(*) FILTER (WHERE status = 'cancelled') as cancelled,
    SUM(total_amount) FILTER (WHERE status = 'completed') as revenue
FROM orders
GROUP BY customer_id;

-- Complex aggregation with HAVING
SELECT 
    customer_id,
    COUNT(*) as orders,
    SUM(total_amount) as spent
FROM orders
GROUP BY customer_id
HAVING COUNT(*) >= 3 AND SUM(total_amount) > 1000;

-- String aggregation
SELECT 
    customer_id,
    STRING_AGG(DISTINCT status, ', ' ORDER BY status) as statuses,
    ARRAY_AGG(order_id ORDER BY order_date DESC) as order_ids
FROM orders
GROUP BY customer_id;
```

</div>

### Query Optimization {#query-optimization}

<div class="concept-section definition">

📋 **Concept Definition**  
**Systematic performance improvement** via **EXPLAIN ANALYZE** (execution plan, timing, row counts). **Strategies**: **index optimization** (composite, covering, partial), **query rewriting** (avoid SELECT *, use EXISTS vs IN), **join optimization** (order matters), **statistics update** (ANALYZE). **Cost metrics**: Seq Scan vs Index Scan vs Index Only Scan. **Tools**: EXPLAIN (ANALYZE, BUFFERS, VERBOSE), slow query log, pg_stat_statements.

</div>

<div class="runnable-model">

**Runnable mental model**
```sql
-- EXPLAIN ANALYZE - execution plan
EXPLAIN (ANALYZE, BUFFERS)
SELECT u.name, COUNT(o.id)
FROM users u
LEFT JOIN orders o ON u.id = o.customer_id
WHERE o.order_date >= '2024-01-01'
GROUP BY u.name;

-- Index optimization
CREATE INDEX idx_orders_date_customer ON orders(order_date, customer_id);
CREATE INDEX idx_orders_covering ON orders(customer_id, order_date) 
    INCLUDE (total_amount, status);

-- Partial index
CREATE INDEX idx_active_orders ON orders(order_date) 
WHERE status IN ('pending', 'processing');

-- Query rewriting
-- ❌ SLOW - function on column
SELECT * FROM orders WHERE EXTRACT(YEAR FROM order_date) = 2024;

-- ✅ FAST - range condition
SELECT * FROM orders 
WHERE order_date >= '2024-01-01' AND order_date < '2025-01-01';

-- ❌ SLOW - correlated subquery
SELECT u.name, (SELECT COUNT(*) FROM orders WHERE customer_id = u.id)
FROM users u;

-- ✅ FAST - JOIN
SELECT u.name, COUNT(o.id)
FROM users u
LEFT JOIN orders o ON u.id = o.customer_id
GROUP BY u.name;

-- Pagination optimization
-- ❌ SLOW - OFFSET for large datasets
SELECT * FROM orders ORDER BY order_date OFFSET 10000 LIMIT 20;

-- ✅ FAST - cursor-based
SELECT * FROM orders 
WHERE order_date < '2024-03-15'  -- Last seen
ORDER BY order_date DESC LIMIT 20;

-- Index usage analysis
SELECT tablename, indexname, idx_scan
FROM pg_stat_user_indexes
WHERE idx_scan = 0;  -- Unused indexes
```

</div>

### Materialized Views {#materialized-views}

<div class="concept-section definition">

📋 **Concept Definition**  
**Materialized Views** physically store query results, unlike regular views (query definition only). Precomputes complex aggregations, JOINs, window functions. **REFRESH MATERIALIZED VIEW [CONCURRENTLY]** updates data. Indexable for performance. Trade-off: storage + refresh overhead for dramatically faster reads. Incremental refresh strategies for large tables.

</div>

<div class="runnable-model">

**Runnable mental model**
```sql
-- Create materialized view
CREATE MATERIALIZED VIEW customer_summary AS
SELECT 
    u.id,
    u.name,
    COUNT(o.id) as total_orders,
    SUM(o.total_amount) as total_spent,
    MAX(o.order_date) as last_order
FROM users u
LEFT JOIN orders o ON u.id = o.customer_id
GROUP BY u.id, u.name;

-- Create indexes on materialized view
CREATE INDEX idx_customer_summary_spent ON customer_summary(total_spent DESC);

-- Use materialized view (fast)
SELECT * FROM customer_summary WHERE total_spent > 1000;

-- Refresh strategies
REFRESH MATERIALIZED VIEW customer_summary;  -- Blocks reads
REFRESH MATERIALIZED VIEW CONCURRENTLY customer_summary;  -- No locking

-- Automated refresh function
CREATE OR REPLACE FUNCTION refresh_analytics()
RETURNS VOID AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY customer_summary;
    REFRESH MATERIALIZED VIEW CONCURRENTLY sales_analytics;
END;
$$ LANGUAGE plpgsql;

-- Complex analytics view
CREATE MATERIALIZED VIEW monthly_sales AS
WITH monthly AS (
    SELECT 
        DATE_TRUNC('month', order_date) as month,
        SUM(total_amount) as revenue
    FROM orders
    GROUP BY DATE_TRUNC('month', order_date)
)
SELECT 
    month,
    revenue,
    LAG(revenue) OVER (ORDER BY month) as prev_month,
    revenue - LAG(revenue) OVER (ORDER BY month) as growth
FROM monthly;
```

</div>

### Locking Mechanisms {#locking-mechanisms}

<div class="concept-section definition">

📋 **Concept Definition**  
**Database Locking** controls concurrent transaction access to ensure data consistency. **Lock levels**: table-level (SHARE, EXCLUSIVE), row-level (FOR UPDATE, FOR SHARE). **Deadlock**: circular lock wait - solved by consistent lock ordering and lock_timeout. **Advisory locks**: application-level coordination. Prevention: batch processing, lock escalation mitigation.

</div>

<div class="runnable-model">

**Runnable mental model**
```sql
-- Row-level lock - FOR UPDATE
BEGIN;
SELECT * FROM inventory WHERE product_id = 123 FOR UPDATE;
UPDATE inventory SET quantity = quantity - 5 WHERE product_id = 123;
COMMIT;

-- Shared lock - FOR SHARE
BEGIN;
SELECT price FROM products WHERE id = 123 FOR SHARE;
-- Other reads OK, writes blocked
COMMIT;

-- Safe order processing with locking
CREATE OR REPLACE FUNCTION process_order_safe(
    p_customer_id INT,
    p_product_id INT,
    p_quantity INT
) RETURNS BOOLEAN AS $$
DECLARE
    v_stock INT;
    v_credit DECIMAL(10,2);
BEGIN
    -- Lock customer and product records
    SELECT credit_balance INTO v_credit
    FROM users WHERE id = p_customer_id FOR UPDATE;
    
    SELECT stock_quantity INTO v_stock
    FROM products WHERE id = p_product_id FOR UPDATE;
    
    IF v_stock < p_quantity THEN
        RAISE EXCEPTION 'Insufficient stock';
    END IF;
    
    -- Process atomically with locks held
    UPDATE products SET stock_quantity = stock_quantity - p_quantity
    WHERE id = p_product_id;
    
    INSERT INTO orders (customer_id, status) VALUES (p_customer_id, 'confirmed');
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Deadlock prevention - consistent ordering
CREATE OR REPLACE FUNCTION transfer_safe(
    from_id INT, to_id INT, amount DECIMAL
) RETURNS VOID AS $$
BEGIN
    -- Always lock in ascending ID order
    IF from_id < to_id THEN
        PERFORM * FROM accounts WHERE id = from_id FOR UPDATE;
        PERFORM * FROM accounts WHERE id = to_id FOR UPDATE;
    ELSE
        PERFORM * FROM accounts WHERE id = to_id FOR UPDATE;
        PERFORM * FROM accounts WHERE id = from_id FOR UPDATE;
    END IF;
    
    UPDATE accounts SET balance = balance - amount WHERE id = from_id;
    UPDATE accounts SET balance = balance + amount WHERE id = to_id;
END;
$$ LANGUAGE plpgsql;

-- Lock timeout
SET lock_timeout = '10s';

-- Advisory locks
SELECT pg_advisory_lock(12345);  -- Application-level mutex
-- Critical section
SELECT pg_advisory_unlock(12345);

-- Monitor locks
SELECT pid, query, mode, granted
FROM pg_locks l
JOIN pg_stat_activity a ON l.pid = a.pid
WHERE NOT granted;
```

</div>

### Database Security {#database-security}

<div class="concept-section definition">

📋 **Concept Definition**  
**Multi-layered protection**: **Authentication** (verify identity), **Authorization** (GRANT/REVOKE), **Encryption** (TDE at-rest, SSL/TLS in-transit). **RBAC**: CREATE ROLE, GRANT role TO user. **Row-level security (RLS)**: policy-based filtering. **Audit logging**: track operations (pg_audit). **SQL injection prevention**: parameterized queries. **Principle of least privilege**: minimal permissions. Compliance: GDPR, HIPAA, SOX.

</div>

<div class="runnable-model">

**Runnable mental model**
```sql
-- Role-based access control
CREATE ROLE app_readonly;
CREATE ROLE app_readwrite;
CREATE ROLE app_admin;

-- Grant permissions
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_readonly;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO app_readwrite;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO app_admin;

-- Create users with roles
CREATE USER analyst WITH PASSWORD 'secure_password';
GRANT app_readonly TO analyst;

CREATE USER app_user WITH PASSWORD 'secure_password';
GRANT app_readwrite TO app_user;

-- Column-level permissions
GRANT SELECT (id, name, email) ON users TO app_readonly;
REVOKE SELECT (salary, ssn) ON users FROM app_readonly;

-- Row-level security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY customer_orders_policy ON orders
    FOR SELECT
    USING (customer_id = current_user_id());

-- Only see own orders
CREATE POLICY user_own_data ON users
    FOR ALL
    USING (id = current_user_id());

-- Encryption
-- SSL connection (postgresql.conf)
-- ssl = on
-- ssl_cert_file = 'server.crt'
-- ssl_key_file = 'server.key'

-- Column-level encryption
CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO users (name, ssn_encrypted)
VALUES ('John', pgp_sym_encrypt('123-45-6789', 'encryption_key'));

SELECT name, pgp_sym_decrypt(ssn_encrypted, 'encryption_key') as ssn
FROM users;

-- Audit logging (pg_audit extension)
-- CREATE EXTENSION pg_audit;
-- SET pgaudit.log = 'all';

-- SQL injection prevention (parameterized queries)
-- ❌ UNSAFE
-- query = "SELECT * FROM users WHERE email = '" + userInput + "'";

-- ✅ SAFE - use parameterized queries
PREPARE get_user AS SELECT * FROM users WHERE email = $1;
EXECUTE get_user('user@example.com');

-- Connection security
-- pg_hba.conf configuration
-- hostssl all all 0.0.0.0/0 md5  -- SSL required
```

</div>

## Best Practices

1. **Use parameterized queries** to prevent SQL injection
2. **Create appropriate indexes** for frequently queried columns
3. **Normalize data** to reduce redundancy
4. **Use transactions** for related operations
5. **Avoid SELECT *** - specify needed columns
6. **Use proper data types** for storage efficiency
7. **Regular backups** and disaster recovery planning
8. **Implement row-level security** for multi-tenant applications
9. **Monitor query performance** with EXPLAIN ANALYZE
10. **Use materialized views** for complex reporting queries

---

### Advanced Query Optimization {#advanced-query-optimization}
<!-- tags: performance, optimization, query-tuning, execution-plans, medior -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Advanced query optimization techniques maximize database performance through intelligent query construction, index utilization, and execution plan analysis**. **Execution plans**: database's strategy for executing queries, including join algorithms, index usage, and data access methods. **Query hints**: directives to influence optimizer decisions (use with caution). **Partitioning**: dividing large tables into smaller, manageable pieces for faster access. **Materialized views**: precomputed query results stored as tables for instant access. **Query rewriting**: transforming queries for better performance while maintaining logic. **Cost-based optimization**: database choosing execution paths based on statistical cost estimates.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Performance**: optimized queries can be orders of magnitude faster
- **Scalability**: well-optimized databases handle more concurrent users
- **Cost reduction**: better performance reduces hardware and cloud costs
- **User experience**: faster response times improve application usability

</div>

<div class="runnable-model" data-filter="optimization">

**Runnable mental model**
```sql
-- === EXECUTION PLAN ANALYSIS ===

-- PostgreSQL execution plan analysis
EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) 
SELECT c.customer_name, 
       COUNT(o.order_id) as order_count,
       SUM(o.total_amount) as total_spent
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE c.registration_date >= '2023-01-01'
GROUP BY c.customer_id, c.customer_name
HAVING SUM(o.total_amount) > 1000
ORDER BY total_spent DESC;

-- Reading execution plans:
-- 1. Look for Seq Scan (bad) vs Index Scan (good)
-- 2. Check for high "cost" operations
-- 3. Identify buffer usage and actual time
-- 4. Look for "rows removed by filter" (indicates missing indexes)

-- === INDEX OPTIMIZATION STRATEGIES ===

-- Composite indexes for multi-column WHERE clauses
CREATE INDEX idx_orders_customer_date_status 
ON orders (customer_id, order_date, status);

-- This index supports all these queries efficiently:
SELECT * FROM orders WHERE customer_id = 123;
SELECT * FROM orders WHERE customer_id = 123 AND order_date >= '2023-01-01';
SELECT * FROM orders WHERE customer_id = 123 AND order_date >= '2023-01-01' AND status = 'completed';

-- Partial indexes for filtered queries
CREATE INDEX idx_orders_active 
ON orders (order_date, total_amount) 
WHERE status IN ('pending', 'processing');

-- Expression indexes for computed columns
CREATE INDEX idx_customers_email_domain 
ON customers (LOWER(SUBSTRING(email FROM POSITION('@' IN email) + 1)));

-- This enables fast queries like:
SELECT * FROM customers 
WHERE LOWER(SUBSTRING(email FROM POSITION('@' IN email) + 1)) = 'gmail.com';

-- Covering indexes (include non-key columns)
CREATE INDEX idx_orders_covering 
ON orders (customer_id, order_date) 
INCLUDE (total_amount, status, shipping_address);

-- === QUERY REWRITING TECHNIQUES ===

-- 1. Replace correlated subqueries with JOINs
-- ❌ SLOW - Correlated subquery
SELECT c.customer_name, c.email
FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o 
    WHERE o.customer_id = c.customer_id 
      AND o.total_amount > 500
);

-- ✅ FAST - JOIN version
SELECT DISTINCT c.customer_name, c.email
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
WHERE o.total_amount > 500;

-- 2. Use UNION ALL instead of UNION when duplicates are acceptable
-- ❌ SLOWER - UNION removes duplicates
SELECT product_name FROM products WHERE category = 'Electronics'
UNION
SELECT product_name FROM featured_products WHERE featured_date >= CURRENT_DATE;

-- ✅ FASTER - UNION ALL keeps duplicates
SELECT product_name FROM products WHERE category = 'Electronics'
UNION ALL
SELECT product_name FROM featured_products WHERE featured_date >= CURRENT_DATE;

-- 3. Replace IN with EXISTS for large subquery results
-- ❌ SLOW with large subquery results
SELECT * FROM customers 
WHERE customer_id IN (
    SELECT customer_id FROM large_orders_table 
    WHERE total_amount > 1000
);

-- ✅ FASTER with EXISTS
SELECT * FROM customers c
WHERE EXISTS (
    SELECT 1 FROM large_orders_table o
    WHERE o.customer_id = c.customer_id 
      AND o.total_amount > 1000
);

-- === WINDOW FUNCTIONS FOR PERFORMANCE ===

-- Efficient ranking and analytics without self-joins
SELECT 
    customer_id,
    order_date,
    total_amount,
    -- Running total for each customer
    SUM(total_amount) OVER (
        PARTITION BY customer_id 
        ORDER BY order_date
        ROWS UNBOUNDED PRECEDING
    ) as running_total,
    -- Rank orders by amount within each customer
    ROW_NUMBER() OVER (
        PARTITION BY customer_id 
        ORDER BY total_amount DESC
    ) as amount_rank,
    -- Compare to previous order
    LAG(total_amount, 1) OVER (
        PARTITION BY customer_id 
        ORDER BY order_date
    ) as previous_amount,
    -- Moving average of last 3 orders
    AVG(total_amount) OVER (
        PARTITION BY customer_id 
        ORDER BY order_date
        ROWS 2 PRECEDING
    ) as moving_avg_3
FROM orders
WHERE order_date >= '2023-01-01';

-- === COMMON TABLE EXPRESSIONS (CTEs) FOR READABILITY ===

-- Complex query broken down with CTEs
WITH customer_metrics AS (
    SELECT 
        customer_id,
        COUNT(*) as order_count,
        SUM(total_amount) as total_spent,
        AVG(total_amount) as avg_order_value,
        MAX(order_date) as last_order_date
    FROM orders 
    WHERE order_date >= '2023-01-01'
    GROUP BY customer_id
),
customer_segments AS (
    SELECT 
        customer_id,
        order_count,
        total_spent,
        avg_order_value,
        last_order_date,
        CASE 
            WHEN total_spent >= 5000 AND order_count >= 10 THEN 'VIP'
            WHEN total_spent >= 1000 AND order_count >= 5 THEN 'Premium'
            WHEN total_spent >= 100 AND order_count >= 2 THEN 'Regular'
            ELSE 'New'
        END as customer_segment
    FROM customer_metrics
),
segment_stats AS (
    SELECT 
        customer_segment,
        COUNT(*) as customer_count,
        AVG(total_spent) as avg_segment_spending,
        AVG(avg_order_value) as avg_segment_order_value
    FROM customer_segments
    GROUP BY customer_segment
)
SELECT 
    cs.customer_segment,
    c.customer_name,
    cs.total_spent,
    cs.order_count,
    cs.avg_order_value,
    ss.avg_segment_spending,
    ROUND(
        (cs.total_spent / ss.avg_segment_spending - 1) * 100, 2
    ) as spending_vs_segment_avg_pct
FROM customer_segments cs
JOIN customers c ON cs.customer_id = c.customer_id
JOIN segment_stats ss ON cs.customer_segment = ss.customer_segment
ORDER BY cs.customer_segment, cs.total_spent DESC;

-- === TABLE PARTITIONING STRATEGIES ===

-- Range partitioning by date (PostgreSQL)
CREATE TABLE orders_partitioned (
    order_id SERIAL,
    customer_id INTEGER,
    order_date DATE,
    total_amount DECIMAL(10,2),
    status VARCHAR(20)
) PARTITION BY RANGE (order_date);

-- Create partitions for each month
CREATE TABLE orders_2023_01 PARTITION OF orders_partitioned
FOR VALUES FROM ('2023-01-01') TO ('2023-02-01');

CREATE TABLE orders_2023_02 PARTITION OF orders_partitioned
FOR VALUES FROM ('2023-02-01') TO ('2023-03-01');

-- Hash partitioning for even distribution
CREATE TABLE customers_partitioned (
    customer_id SERIAL,
    customer_name VARCHAR(100),
    email VARCHAR(100),
    registration_date DATE
) PARTITION BY HASH (customer_id);

CREATE TABLE customers_p1 PARTITION OF customers_partitioned
FOR VALUES WITH (MODULUS 4, REMAINDER 0);

CREATE TABLE customers_p2 PARTITION OF customers_partitioned
FOR VALUES WITH (MODULUS 4, REMAINDER 1);

-- === MATERIALIZED VIEWS FOR HEAVY AGGREGATIONS ===

-- Create materialized view for expensive calculations
CREATE MATERIALIZED VIEW customer_analytics AS
SELECT 
    c.customer_id,
    c.customer_name,
    c.email,
    COUNT(o.order_id) as total_orders,
    COALESCE(SUM(o.total_amount), 0) as total_spent,
    COALESCE(AVG(o.total_amount), 0) as avg_order_value,
    MIN(o.order_date) as first_order_date,
    MAX(o.order_date) as last_order_date,
    -- Days since last order
    EXTRACT(DAYS FROM (CURRENT_DATE - MAX(o.order_date))) as days_since_last_order,
    -- Customer lifetime value prediction
    CASE 
        WHEN COUNT(o.order_id) = 0 THEN 0
        WHEN EXTRACT(DAYS FROM (MAX(o.order_date) - MIN(o.order_date))) = 0 THEN SUM(o.total_amount)
        ELSE 
            -- Annualized spending
            SUM(o.total_amount) * 365.0 / 
            GREATEST(EXTRACT(DAYS FROM (MAX(o.order_date) - MIN(o.order_date))), 1)
    END as estimated_annual_value
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name, c.email;

-- Create indexes on materialized view
CREATE INDEX idx_customer_analytics_total_spent 
ON customer_analytics (total_spent DESC);

CREATE INDEX idx_customer_analytics_last_order 
ON customer_analytics (last_order_date DESC);

-- Refresh materialized view (schedule this regularly)
REFRESH MATERIALIZED VIEW customer_analytics;

-- For concurrent refresh (PostgreSQL 9.4+)
REFRESH MATERIALIZED VIEW CONCURRENTLY customer_analytics;

-- === QUERY PERFORMANCE MONITORING ===

-- Track slow queries (PostgreSQL)
-- In postgresql.conf:
-- log_min_duration_statement = 1000  # Log queries taking > 1 second
-- log_statement = 'all'              # Log all statements
-- log_duration = on                  # Log duration of each statement

-- Monitor query performance
SELECT 
    query,
    calls,
    total_time,
    mean_time,
    stddev_time,
    rows,
    100.0 * shared_blks_hit / nullif(shared_blks_hit + shared_blks_read, 0) AS hit_percent
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 20;

-- Monitor index usage
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;

-- Find unused indexes
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    pg_size_pretty(pg_relation_size(indexrelid)) as size
FROM pg_stat_user_indexes
WHERE idx_scan = 0
  AND schemaname = 'public'
ORDER BY pg_relation_size(indexrelid) DESC;

-- === ADVANCED AGGREGATION TECHNIQUES ===

-- CUBE and ROLLUP for multi-dimensional analysis
SELECT 
    COALESCE(region, 'ALL REGIONS') as region,
    COALESCE(product_category, 'ALL CATEGORIES') as category,
    COALESCE(TO_CHAR(order_date, 'YYYY-MM'), 'ALL MONTHS') as month,
    SUM(total_amount) as total_sales,
    COUNT(*) as order_count
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN products p ON o.product_id = p.product_id
WHERE order_date >= '2023-01-01'
GROUP BY CUBE(region, product_category, TO_CHAR(order_date, 'YYYY-MM'))
ORDER BY region NULLS LAST, category NULLS LAST, month NULLS LAST;

-- GROUPING SETS for custom aggregation groups
SELECT 
    region,
    product_category,
    customer_segment,
    SUM(total_amount) as total_sales,
    GROUPING(region) as region_grouping,
    GROUPING(product_category) as category_grouping,
    GROUPING(customer_segment) as segment_grouping
FROM sales_fact_table
GROUP BY GROUPING SETS (
    (region),                    -- Total by region
    (product_category),          -- Total by category
    (customer_segment),          -- Total by segment
    (region, product_category),  -- Total by region and category
    ()                          -- Grand total
);

-- === JSON QUERY OPTIMIZATION ===

-- Efficient JSON querying (PostgreSQL)
CREATE TABLE user_profiles (
    user_id SERIAL PRIMARY KEY,
    profile_data JSONB,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- GIN index for JSON data
CREATE INDEX idx_user_profiles_gin ON user_profiles USING GIN (profile_data);

-- Efficient JSON queries
-- Extract specific JSON fields
SELECT 
    user_id,
    profile_data->>'name' as name,
    profile_data->>'email' as email,
    (profile_data->>'age')::INTEGER as age,
    profile_data->'preferences'->>'theme' as preferred_theme
FROM user_profiles
WHERE profile_data->>'age' IS NOT NULL
  AND (profile_data->>'age')::INTEGER >= 18;

-- JSON path queries
SELECT user_id, profile_data
FROM user_profiles
WHERE profile_data @> '{"preferences": {"notifications": true}}';

-- JSON aggregations
SELECT 
    profile_data->>'department' as department,
    COUNT(*) as employee_count,
    AVG((profile_data->>'salary')::NUMERIC) as avg_salary,
    JSON_AGG(
        JSON_BUILD_OBJECT(
            'name', profile_data->>'name',
            'position', profile_data->>'position',
            'salary', profile_data->>'salary'
        )
    ) as employees
FROM user_profiles
WHERE profile_data->>'department' IS NOT NULL
GROUP BY profile_data->>'department'
ORDER BY avg_salary DESC;

-- === PERFORMANCE TESTING QUERIES ===

-- Generate test data for performance testing
INSERT INTO orders (customer_id, order_date, total_amount, status)
SELECT 
    (random() * 10000)::INTEGER + 1 as customer_id,
    CURRENT_DATE - (random() * 365)::INTEGER as order_date,
    (random() * 1000 + 10)::DECIMAL(10,2) as total_amount,
    CASE (random() * 3)::INTEGER
        WHEN 0 THEN 'pending'
        WHEN 1 THEN 'completed'
        ELSE 'cancelled'
    END as status
FROM generate_series(1, 100000);

-- Benchmark queries
\timing on

-- Test query performance before optimization
SELECT COUNT(*) FROM orders WHERE status = 'completed' AND total_amount > 500;

-- Create index
CREATE INDEX idx_orders_status_amount ON orders (status, total_amount);

-- Test query performance after optimization
SELECT COUNT(*) FROM orders WHERE status = 'completed' AND total_amount > 500;

-- === QUERY HINTS (Use with extreme caution) ===

-- PostgreSQL - Force specific join algorithm
/*+ NestLoop(customers orders) */
SELECT c.customer_name, o.total_amount
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id;

-- Force index usage (MySQL)
SELECT * FROM orders USE INDEX (idx_orders_date) 
WHERE order_date >= '2023-01-01';

-- SQL Server hints
SELECT /*+ OPTION(MERGE JOIN) */ 
    c.customer_name, o.total_amount
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id;
```
*Notice: Query optimization is both an art and a science. Always test with realistic data volumes and measure performance improvements.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Over-indexing**: Creating too many indexes that slow down INSERT/UPDATE operations
- **Ignoring execution plans**: Writing queries without understanding how they execute
- **Premature optimization**: Optimizing queries that aren't actually bottlenecks
- **Missing statistics**: Not updating table statistics for cost-based optimizer
- **Query hints abuse**: Using hints as permanent solutions instead of fixing root causes
- **Not testing with production data**: Optimizing with small test datasets that don't reflect reality

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Data warehousing**: large-scale analytical queries requiring complex optimizations
- **E-commerce platforms**: high-volume transaction processing with real-time analytics
- **Financial systems**: complex reporting with strict performance requirements
- **Social media**: user activity tracking and recommendation systems
- **IoT applications**: time-series data analysis and real-time monitoring

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"How would you optimize a slow-running query?"** → Execution plan analysis, indexing strategy, query rewriting
2. **"Explain the difference between clustered and non-clustered indexes"** → Physical vs logical ordering, use cases
3. **"When would you use a materialized view?"** → Heavy aggregations, reporting scenarios, refresh strategies
4. **"How do you handle database partitioning?"** → Partitioning strategies, benefits, challenges
5. **"Describe your approach to query performance monitoring"** → Tools, metrics, alerting strategies

</div>

<div class="concept-section related-concepts">

🔗 **Related concepts**  
`Database Design` · `Indexing Strategies` · `Execution Plans` · `Performance Tuning` · `Data Warehousing`

</div>

<div class="tags">
  <span class="tag">performance</span>
  <span class="tag">optimization</span>
  <span class="tag">query-tuning</span>
  <span class="tag">execution-plans</span>
  <span class="tag">indexing</span>
  <span class="tag">medior</span>
</div>

---

### Advanced Database Security {#advanced-database-security}
<!-- tags: database-security, encryption, access-control, compliance, senior -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Advanced database security encompasses comprehensive protection strategies for data at rest, in transit, and in use, including access control, encryption, auditing, and compliance frameworks**. **Role-based access control (RBAC)**: hierarchical permission systems with roles and privileges. **Data encryption**: protecting sensitive data using AES, TDE (Transparent Data Encryption), and column-level encryption. **SQL injection prevention**: parameterized queries, input validation, stored procedures. **Database auditing**: comprehensive logging of access patterns, changes, and security events. **Compliance frameworks**: GDPR, HIPAA, SOX, PCI-DSS requirements and implementation strategies.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Data protection**: preventing unauthorized access to sensitive information
- **Regulatory compliance**: meeting legal and industry requirements
- **Business continuity**: protecting against data breaches and attacks
- **Trust**: maintaining customer and stakeholder confidence

</div>

<div class="runnable-model" data-filter="database-security">

**Runnable mental model**
```sql
-- === ROLE-BASED ACCESS CONTROL (RBAC) ===

-- Create roles hierarchy
CREATE ROLE database_users;
CREATE ROLE data_analysts;
CREATE ROLE data_engineers;
CREATE ROLE database_admins;

-- Grant role inheritance
GRANT database_users TO data_analysts;
GRANT data_analysts TO data_engineers;
GRANT data_engineers TO database_admins;

-- Create specific application roles
CREATE ROLE ecommerce_readonly;
CREATE ROLE ecommerce_readwrite;
CREATE ROLE ecommerce_admin;

-- Grant permissions to roles
-- Read-only access
GRANT CONNECT ON DATABASE ecommerce TO ecommerce_readonly;
GRANT USAGE ON SCHEMA public TO ecommerce_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO ecommerce_readonly;
ALTER DEFAULT PRIVILEGES IN SCHEMA public 
    GRANT SELECT ON TABLES TO ecommerce_readonly;

-- Read-write access for application
GRANT ecommerce_readonly TO ecommerce_readwrite;
GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO ecommerce_readwrite;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO ecommerce_readwrite;
ALTER DEFAULT PRIVILEGES IN SCHEMA public 
    GRANT INSERT, UPDATE, DELETE ON TABLES TO ecommerce_readwrite;

-- Administrative access
GRANT ecommerce_readwrite TO ecommerce_admin;
GRANT CREATE ON SCHEMA public TO ecommerce_admin;
GRANT CREATE ON DATABASE ecommerce TO ecommerce_admin;

-- Create users and assign roles
CREATE USER app_service_account WITH PASSWORD 'secure_app_password_123!';
CREATE USER data_analyst_john WITH PASSWORD 'analyst_password_456!';
CREATE USER dba_admin WITH PASSWORD 'admin_password_789!' CREATEDB CREATEROLE;

-- Assign roles to users
GRANT ecommerce_readwrite TO app_service_account;
GRANT ecommerce_readonly TO data_analyst_john;
GRANT ecommerce_admin TO dba_admin;

-- === ROW-LEVEL SECURITY (RLS) ===

-- Enable RLS on sensitive tables
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policy for customer data isolation
CREATE POLICY customer_orders_policy ON orders
    FOR ALL TO ecommerce_readwrite
    USING (customer_id = current_setting('app.current_customer_id')::INTEGER);

-- Create policy for analysts (aggregated data only)
CREATE POLICY analyst_orders_policy ON orders
    FOR SELECT TO data_analysts
    USING (order_date >= CURRENT_DATE - INTERVAL '2 years');

-- Application sets customer context
-- SET app.current_customer_id = '12345';

-- === DATA ENCRYPTION ===

-- Column-level encryption for sensitive data
-- Install pgcrypto extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create table with encrypted columns
CREATE TABLE customer_sensitive_data (
    customer_id INTEGER PRIMARY KEY,
    
    -- Encrypted personally identifiable information
    ssn_encrypted BYTEA,
    credit_card_encrypted BYTEA,
    bank_account_encrypted BYTEA,
    
    -- Hashed data for lookups
    email_hash VARCHAR(64),
    phone_hash VARCHAR(64),
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Functions for encryption/decryption
CREATE OR REPLACE FUNCTION encrypt_sensitive_data(plaintext TEXT, key_name TEXT)
RETURNS BYTEA AS $$
BEGIN
    -- In production, retrieve key from secure key management system
    RETURN pgp_sym_encrypt(plaintext, current_setting('encryption.key_' || key_name));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION decrypt_sensitive_data(ciphertext BYTEA, key_name TEXT)
RETURNS TEXT AS $$
BEGIN
    -- In production, retrieve key from secure key management system
    RETURN pgp_sym_decrypt(ciphertext, current_setting('encryption.key_' || key_name));
EXCEPTION
    WHEN OTHERS THEN
        -- Log decryption failure, return null
        RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert encrypted data
INSERT INTO customer_sensitive_data (
    customer_id, 
    ssn_encrypted, 
    credit_card_encrypted,
    email_hash,
    phone_hash
) VALUES (
    12345,
    encrypt_sensitive_data('123-45-6789', 'ssn'),
    encrypt_sensitive_data('4111-1111-1111-1111', 'credit_card'),
    encode(digest('john.doe@example.com', 'sha256'), 'hex'),
    encode(digest('555-123-4567', 'sha256'), 'hex')
);

-- Query encrypted data (requires appropriate permissions)
SELECT 
    customer_id,
    decrypt_sensitive_data(ssn_encrypted, 'ssn') as ssn,
    decrypt_sensitive_data(credit_card_encrypted, 'credit_card') as credit_card
FROM customer_sensitive_data
WHERE customer_id = 12345;

-- === SECURE VIEWS FOR DATA MASKING ===

-- Create masked view for non-privileged users
CREATE VIEW customers_masked AS
SELECT 
    customer_id,
    first_name,
    CASE 
        WHEN current_user IN ('data_analyst_john', 'ecommerce_readonly') 
        THEN CONCAT(LEFT(last_name, 1), REPEAT('*', LENGTH(last_name) - 1))
        ELSE last_name
    END as last_name,
    CASE 
        WHEN current_user IN ('data_analyst_john', 'ecommerce_readonly') 
        THEN CONCAT(REPEAT('*', 3), RIGHT(email, LENGTH(email) - POSITION('@' IN email) + 1))
        ELSE email
    END as email,
    CASE 
        WHEN current_user IN ('data_analyst_john', 'ecommerce_readonly') 
        THEN CONCAT(LEFT(phone, 3), '-***-****')
        ELSE phone
    END as phone,
    registration_date,
    status
FROM customers;

-- Grant access to masked view instead of base table
REVOKE ALL ON customers FROM data_analysts;
GRANT SELECT ON customers_masked TO data_analysts;

-- === SQL INJECTION PREVENTION ===

-- ❌ VULNERABLE - Dynamic SQL construction
-- DO NOT DO THIS:
/*
CREATE OR REPLACE FUNCTION get_customer_orders_vulnerable(customer_email TEXT)
RETURNS TABLE(order_id INTEGER, total_amount DECIMAL) AS $$
DECLARE
    query_text TEXT;
BEGIN
    query_text := 'SELECT o.order_id, o.total_amount 
                   FROM orders o 
                   JOIN customers c ON o.customer_id = c.customer_id 
                   WHERE c.email = ''' || customer_email || '''';
    RETURN QUERY EXECUTE query_text;
END;
$$ LANGUAGE plpgsql;
*/

-- ✅ SECURE - Parameterized queries
CREATE OR REPLACE FUNCTION get_customer_orders_secure(customer_email TEXT)
RETURNS TABLE(order_id INTEGER, total_amount DECIMAL) AS $$
BEGIN
    RETURN QUERY 
    SELECT o.order_id, o.total_amount
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    WHERE c.email = customer_email;
END;
$$ LANGUAGE plpgsql;

-- ✅ SECURE - Using EXECUTE with parameters
CREATE OR REPLACE FUNCTION dynamic_query_secure(
    table_name TEXT, 
    column_name TEXT, 
    filter_value TEXT
)
RETURNS SETOF RECORD AS $$
BEGIN
    -- Validate inputs against whitelist
    IF table_name NOT IN ('customers', 'orders', 'products') THEN
        RAISE EXCEPTION 'Invalid table name: %', table_name;
    END IF;
    
    IF column_name NOT IN ('customer_id', 'order_id', 'product_id', 'status') THEN
        RAISE EXCEPTION 'Invalid column name: %', column_name;
    END IF;
    
    -- Use format() with %I for identifiers and %L for literals
    RETURN QUERY EXECUTE format(
        'SELECT * FROM %I WHERE %I = %L',
        table_name,
        column_name,
        filter_value
    );
END;
$$ LANGUAGE plpgsql;

-- === DATABASE AUDITING ===

-- Create audit log table
CREATE TABLE audit_log (
    audit_id BIGSERIAL PRIMARY KEY,
    table_name VARCHAR(50) NOT NULL,
    operation VARCHAR(10) NOT NULL, -- INSERT, UPDATE, DELETE
    user_name VARCHAR(50) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    old_values JSONB,
    new_values JSONB,
    changed_columns TEXT[],
    client_ip INET,
    application_name VARCHAR(100)
);

-- Generic audit trigger function
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
DECLARE
    old_data JSONB;
    new_data JSONB;
    changed_cols TEXT[];
BEGIN
    -- Get client information
    DECLARE
        client_ip INET;
        app_name VARCHAR(100);
    BEGIN
        client_ip := inet_client_addr();
        app_name := current_setting('application_name', true);
    EXCEPTION
        WHEN OTHERS THEN
            client_ip := NULL;
            app_name := 'unknown';
    END;
    
    IF TG_OP = 'DELETE' THEN
        old_data := to_jsonb(OLD);
        new_data := NULL;
    ELSIF TG_OP = 'UPDATE' THEN
        old_data := to_jsonb(OLD);
        new_data := to_jsonb(NEW);
        
        -- Identify changed columns
        SELECT array_agg(key) INTO changed_cols
        FROM (
            SELECT key
            FROM jsonb_each(old_data)
            WHERE key IN (SELECT jsonb_object_keys(new_data))
              AND old_data->key IS DISTINCT FROM new_data->key
        ) as changes;
    ELSIF TG_OP = 'INSERT' THEN
        old_data := NULL;
        new_data := to_jsonb(NEW);
    END IF;
    
    INSERT INTO audit_log (
        table_name,
        operation,
        user_name,
        old_values,
        new_values,
        changed_columns,
        client_ip,
        application_name
    ) VALUES (
        TG_TABLE_NAME,
        TG_OP,
        session_user,
        old_data,
        new_data,
        changed_cols,
        client_ip,
        app_name
    );
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Apply audit triggers to sensitive tables
CREATE TRIGGER audit_customers_trigger
    AFTER INSERT OR UPDATE OR DELETE ON customers
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_orders_trigger
    AFTER INSERT OR UPDATE OR DELETE ON orders
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- === DATA CLASSIFICATION AND PROTECTION ===

-- Create data classification metadata table
CREATE TABLE data_classification (
    table_name VARCHAR(50),
    column_name VARCHAR(50),
    classification_level VARCHAR(20) CHECK (classification_level IN 
        ('public', 'internal', 'confidential', 'restricted')),
    data_category VARCHAR(50), -- PII, Financial, Health, etc.
    retention_period INTERVAL,
    encryption_required BOOLEAN DEFAULT FALSE,
    masking_required BOOLEAN DEFAULT FALSE,
    
    PRIMARY KEY (table_name, column_name)
);

-- Classify data columns
INSERT INTO data_classification VALUES
    ('customers', 'first_name', 'internal', 'PII', '7 years', FALSE, TRUE),
    ('customers', 'last_name', 'internal', 'PII', '7 years', FALSE, TRUE),
    ('customers', 'email', 'confidential', 'PII', '7 years', FALSE, TRUE),
    ('customers', 'phone', 'confidential', 'PII', '7 years', FALSE, TRUE),
    ('customer_sensitive_data', 'ssn_encrypted', 'restricted', 'PII', '7 years', TRUE, FALSE),
    ('customer_sensitive_data', 'credit_card_encrypted', 'restricted', 'Financial', '3 years', TRUE, FALSE),
    ('orders', 'total_amount', 'internal', 'Financial', '7 years', FALSE, FALSE);

-- Function to check data access permissions
CREATE OR REPLACE FUNCTION check_data_access(
    p_table_name TEXT,
    p_column_name TEXT,
    p_user_role TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
    classification_level TEXT;
    user_clearance TEXT;
BEGIN
    -- Get data classification
    SELECT dc.classification_level INTO classification_level
    FROM data_classification dc
    WHERE dc.table_name = p_table_name 
      AND dc.column_name = p_column_name;
    
    -- Get user clearance level (simplified example)
    user_clearance := CASE
        WHEN p_user_role = 'database_admins' THEN 'restricted'
        WHEN p_user_role = 'data_engineers' THEN 'confidential'
        WHEN p_user_role = 'data_analysts' THEN 'internal'
        ELSE 'public'
    END;
    
    -- Check access permission
    RETURN CASE
        WHEN classification_level = 'public' THEN TRUE
        WHEN classification_level = 'internal' AND user_clearance IN ('internal', 'confidential', 'restricted') THEN TRUE
        WHEN classification_level = 'confidential' AND user_clearance IN ('confidential', 'restricted') THEN TRUE
        WHEN classification_level = 'restricted' AND user_clearance = 'restricted' THEN TRUE
        ELSE FALSE
    END;
END;
$$ LANGUAGE plpgsql;

-- === COMPLIANCE FRAMEWORKS ===

-- GDPR Compliance: Right to be forgotten
CREATE OR REPLACE FUNCTION gdpr_delete_customer_data(p_customer_id INTEGER)
RETURNS TABLE(table_name TEXT, records_affected INTEGER) AS $$
DECLARE
    rec RECORD;
    affected_count INTEGER;
BEGIN
    -- Log the deletion request
    INSERT INTO audit_log (table_name, operation, user_name, new_values)
    VALUES ('gdpr_deletion', 'DELETE', session_user, 
            jsonb_build_object('customer_id', p_customer_id, 'reason', 'GDPR Article 17'));
    
    -- Delete from related tables (cascade)
    DELETE FROM order_items oi
    USING orders o
    WHERE oi.order_id = o.order_id AND o.customer_id = p_customer_id;
    GET DIAGNOSTICS affected_count = ROW_COUNT;
    RETURN QUERY SELECT 'order_items'::TEXT, affected_count;
    
    DELETE FROM orders WHERE customer_id = p_customer_id;
    GET DIAGNOSTICS affected_count = ROW_COUNT;
    RETURN QUERY SELECT 'orders'::TEXT, affected_count;
    
    DELETE FROM customer_sensitive_data WHERE customer_id = p_customer_id;
    GET DIAGNOSTICS affected_count = ROW_COUNT;
    RETURN QUERY SELECT 'customer_sensitive_data'::TEXT, affected_count;
    
    DELETE FROM customers WHERE customer_id = p_customer_id;
    GET DIAGNOSTICS affected_count = ROW_COUNT;
    RETURN QUERY SELECT 'customers'::TEXT, affected_count;
    
END;
$$ LANGUAGE plpgsql;

-- Data retention policy implementation
CREATE OR REPLACE FUNCTION apply_data_retention_policy()
RETURNS TABLE(action TEXT, table_name TEXT, records_affected INTEGER) AS $$
DECLARE
    retention_rule RECORD;
    affected_count INTEGER;
BEGIN
    -- Apply retention policies based on data classification
    FOR retention_rule IN 
        SELECT DISTINCT dc.table_name, dc.retention_period
        FROM data_classification dc
        WHERE dc.retention_period IS NOT NULL
    LOOP
        CASE retention_rule.table_name
            WHEN 'audit_log' THEN
                DELETE FROM audit_log 
                WHERE timestamp < CURRENT_TIMESTAMP - retention_rule.retention_period;
                GET DIAGNOSTICS affected_count = ROW_COUNT;
                
            WHEN 'customers' THEN
                -- Archive instead of delete for customers
                INSERT INTO customers_archive 
                SELECT * FROM customers 
                WHERE registration_date < CURRENT_DATE - retention_rule.retention_period
                  AND status = 'inactive';
                GET DIAGNOSTICS affected_count = ROW_COUNT;
                
                DELETE FROM customers 
                WHERE registration_date < CURRENT_DATE - retention_rule.retention_period
                  AND status = 'inactive';
                
            ELSE
                -- Generic retention handling
                CONTINUE;
        END CASE;
        
        RETURN QUERY SELECT 'RETENTION_CLEANUP'::TEXT, retention_rule.table_name, affected_count;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- === SECURITY MONITORING ===

-- Create security events table
CREATE TABLE security_events (
    event_id BIGSERIAL PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,
    severity VARCHAR(20) CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    description TEXT NOT NULL,
    user_name VARCHAR(50),
    client_ip INET,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    additional_data JSONB
);

-- Function to detect suspicious activity
CREATE OR REPLACE FUNCTION detect_suspicious_activity()
RETURNS VOID AS $$
BEGIN
    -- Detect multiple failed login attempts
    INSERT INTO security_events (event_type, severity, description, additional_data)
    SELECT 
        'MULTIPLE_FAILED_LOGINS',
        'medium',
        'Multiple failed login attempts detected',
        jsonb_build_object(
            'user_name', user_name,
            'attempt_count', attempt_count,
            'time_window', '5 minutes'
        )
    FROM (
        SELECT 
            user_name,
            COUNT(*) as attempt_count
        FROM audit_log
        WHERE operation = 'LOGIN_FAILED'
          AND timestamp > CURRENT_TIMESTAMP - INTERVAL '5 minutes'
        GROUP BY user_name
        HAVING COUNT(*) >= 5
    ) failed_attempts;
    
    -- Detect unusual data access patterns
    INSERT INTO security_events (event_type, severity, description, additional_data)
    SELECT 
        'UNUSUAL_DATA_ACCESS',
        'high',
        'Unusual data access pattern detected',
        jsonb_build_object(
            'user_name', user_name,
            'table_count', table_count,
            'record_count', record_count
        )
    FROM (
        SELECT 
            user_name,
            COUNT(DISTINCT table_name) as table_count,
            COUNT(*) as record_count
        FROM audit_log
        WHERE operation = 'SELECT'
          AND timestamp > CURRENT_TIMESTAMP - INTERVAL '1 hour'
        GROUP BY user_name
        HAVING COUNT(DISTINCT table_name) > 10 
           OR COUNT(*) > 1000
    ) unusual_access;
    
END;
$$ LANGUAGE plpgsql;

-- === DATABASE BACKUP ENCRYPTION ===

-- Encrypted backup procedure (PostgreSQL)
-- Command line example:
-- pg_dump --no-password --format=custom --compress=9 --file=backup.dump ecommerce
-- gpg --symmetric --cipher-algo AES256 --compress-algo 2 backup.dump

-- Backup restoration with decryption:
-- gpg --decrypt backup.dump.gpg | pg_restore --dbname=ecommerce_restored

-- === CONNECTION SECURITY ===

-- SSL/TLS configuration in postgresql.conf:
-- ssl = on
-- ssl_cert_file = 'server.crt'
-- ssl_key_file = 'server.key'
-- ssl_ca_file = 'ca.crt'
-- ssl_crl_file = 'ca.crl'

-- Require SSL for specific users
ALTER USER app_service_account SET ssl TO TRUE;

-- Certificate-based authentication
-- In pg_hba.conf:
-- hostssl all app_service_account 0.0.0.0/0 cert

-- === DISASTER RECOVERY SECURITY ===

-- Secure replication setup
-- In postgresql.conf on master:
-- wal_level = hot_standby
-- max_wal_senders = 3
-- wal_keep_segments = 32

-- Create replication user with minimal privileges
CREATE USER replicator WITH REPLICATION ENCRYPTED PASSWORD 'secure_replication_password';

-- In pg_hba.conf:
-- host replication replicator standby_server_ip/32 md5

-- === REGULAR SECURITY MAINTENANCE ===

-- Security audit checklist function
CREATE OR REPLACE FUNCTION security_audit_checklist()
RETURNS TABLE(check_name TEXT, status TEXT, details TEXT) AS $$
BEGIN
    -- Check for users without passwords
    RETURN QUERY
    SELECT 
        'PASSWORD_CHECK',
        CASE WHEN COUNT(*) = 0 THEN 'PASS' ELSE 'FAIL' END,
        'Users without passwords: ' || STRING_AGG(rolname, ', ')
    FROM pg_authid 
    WHERE rolpassword IS NULL AND rolcanlogin = TRUE;
    
    -- Check for overprivileged users
    RETURN QUERY
    SELECT 
        'SUPERUSER_CHECK',
        CASE WHEN COUNT(*) <= 2 THEN 'PASS' ELSE 'WARN' END,
        'Superusers count: ' || COUNT(*)::TEXT
    FROM pg_authid 
    WHERE rolsuper = TRUE;
    
    -- Check for unused indexes (security overhead)
    RETURN QUERY
    SELECT 
        'UNUSED_INDEXES',
        CASE WHEN COUNT(*) < 5 THEN 'PASS' ELSE 'WARN' END,
        'Unused indexes: ' || COUNT(*)::TEXT
    FROM pg_stat_user_indexes 
    WHERE idx_scan = 0;
    
    -- Check audit log retention
    RETURN QUERY
    SELECT 
        'AUDIT_LOG_RETENTION',
        CASE 
            WHEN MIN(timestamp) > CURRENT_TIMESTAMP - INTERVAL '90 days' THEN 'WARN'
            ELSE 'PASS'
        END,
        'Oldest audit log: ' || MIN(timestamp)::TEXT
    FROM audit_log;
    
END;
$$ LANGUAGE plpgsql;

-- Run security audit
-- SELECT * FROM security_audit_checklist();
```
*Notice: Database security is a multi-layered approach. Implement defense in depth with multiple security controls rather than relying on a single mechanism.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Weak password policies**: allowing simple passwords or password reuse
- **Over-privileged accounts**: giving users more permissions than necessary
- **Unencrypted sensitive data**: storing PII and financial data in plain text
- **Missing audit trails**: not logging security-relevant events
- **Inadequate access controls**: not implementing proper RBAC or RLS
- **Ignoring SQL injection**: using dynamic SQL without proper parameterization

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Financial services**: banking, payment processing, trading systems with strict regulatory requirements
- **Healthcare**: patient data protection, HIPAA compliance, medical records security
- **E-commerce**: customer data protection, payment security, PCI-DSS compliance
- **Government**: classified data handling, security clearance systems, audit requirements
- **Enterprise**: corporate data protection, intellectual property security, compliance reporting

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"How would you implement row-level security?"** → RLS policies, user context, performance considerations
2. **"Explain your approach to database encryption"** → Column-level vs TDE, key management, performance impact
3. **"How do you prevent SQL injection attacks?"** → Parameterized queries, input validation, stored procedures
4. **"Design an audit system for regulatory compliance"** → Audit triggers, log retention, reporting requirements
5. **"What's your strategy for GDPR compliance in databases?"** → Data classification, right to be forgotten, consent management

</div>

<div class="concept-section related-concepts">

🔗 **Related concepts**  
`Access Control` · `Data Encryption` · `Compliance` · `Audit Trails` · `Security Monitoring`

</div>

<div class="tags">
  <span class="tag">database-security</span>
  <span class="tag">encryption</span>
  <span class="tag">access-control</span>
  <span class="tag">compliance</span>
  <span class="tag">audit</span>
  <span class="tag">senior</span>
</div>

---

### Advanced Backup and Recovery {#advanced-backup-recovery}
<!-- tags: backup, recovery, disaster-recovery, high-availability, point-in-time-recovery -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Advanced backup and recovery strategies ensure data protection and business continuity through comprehensive backup types, recovery procedures, and disaster recovery planning**. **Full backups**: complete database copies including all data, schemas, and objects. **Incremental backups**: only changes since last backup, reducing storage and time requirements. **Differential backups**: changes since last full backup, balancing storage and recovery time. **Point-in-time recovery (PITR)**: restoring database to specific timestamp using transaction logs. **Hot backups**: backups taken while database is online and operational. **Cold backups**: backups requiring database shutdown for consistency.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Business continuity**: minimizing downtime during disasters or failures
- **Data protection**: preventing permanent data loss from various failure scenarios
- **Compliance**: meeting regulatory requirements for data retention and recovery
- **Operational efficiency**: enabling quick recovery with minimal business impact

</div>

<div class="runnable-model" data-filter="backup-recovery">

**Runnable mental model**
```sql
-- === COMPREHENSIVE BACKUP STRATEGY ===

-- 1. Full database backup (PostgreSQL)
-- Command line execution:
-- pg_dump --format=custom --compress=9 --verbose --file=ecommerce_full_$(date +%Y%m%d_%H%M%S).dump ecommerce

-- 2. Schema-only backup
-- pg_dump --schema-only --format=plain --file=ecommerce_schema_$(date +%Y%m%d).sql ecommerce

-- 3. Data-only backup
-- pg_dump --data-only --format=custom --file=ecommerce_data_$(date +%Y%m%d).dump ecommerce

-- === BACKUP AUTOMATION SCRIPT ===

-- Create backup management table
CREATE TABLE backup_log (
    backup_id SERIAL PRIMARY KEY,
    backup_type VARCHAR(20) NOT NULL, -- 'full', 'incremental', 'differential'
    backup_start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    backup_end_time TIMESTAMP,
    backup_file_path TEXT,
    backup_size_bytes BIGINT,
    backup_status VARCHAR(20) DEFAULT 'running', -- 'running', 'completed', 'failed'
    error_message TEXT,
    database_size_at_backup BIGINT,
    checksum VARCHAR(64)
);

-- Backup status monitoring
CREATE TABLE backup_schedule (
    schedule_id SERIAL PRIMARY KEY,
    backup_type VARCHAR(20) NOT NULL,
    schedule_name VARCHAR(100) NOT NULL,
    cron_expression VARCHAR(50), -- '0 2 * * *' for daily at 2 AM
    retention_days INTEGER DEFAULT 30,
    is_enabled BOOLEAN DEFAULT TRUE,
    compression_level INTEGER DEFAULT 9,
    encryption_enabled BOOLEAN DEFAULT TRUE,
    destination_path TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert backup schedules
INSERT INTO backup_schedule (backup_type, schedule_name, cron_expression, retention_days, destination_path) VALUES
('full', 'Daily Full Backup', '0 2 * * *', 7, '/backups/full/'),
('incremental', 'Hourly Incremental', '0 * * * *', 3, '/backups/incremental/'),
('differential', 'Weekly Differential', '0 3 * * 0', 30, '/backups/differential/');

-- Backup execution function
CREATE OR REPLACE FUNCTION execute_backup(p_backup_type TEXT, p_destination_path TEXT)
RETURNS INTEGER AS $$
DECLARE
    backup_id INTEGER;
    backup_command TEXT;
    backup_file TEXT;
    start_time TIMESTAMP;
    end_time TIMESTAMP;
    database_size BIGINT;
BEGIN
    start_time := CURRENT_TIMESTAMP;
    backup_file := p_destination_path || 'ecommerce_' || p_backup_type || '_' || 
                   to_char(start_time, 'YYYYMMDD_HH24MISS') || '.dump';
    
    -- Get current database size
    SELECT pg_database_size(current_database()) INTO database_size;
    
    -- Log backup start
    INSERT INTO backup_log (
        backup_type, 
        backup_start_time, 
        backup_file_path, 
        database_size_at_backup
    ) VALUES (
        p_backup_type, 
        start_time, 
        backup_file, 
        database_size
    ) RETURNING backup_id INTO backup_id;
    
    -- Build backup command based on type
    CASE p_backup_type
        WHEN 'full' THEN
            backup_command := format(
                'pg_dump --format=custom --compress=9 --verbose --file=%s %s',
                backup_file,
                current_database()
            );
        WHEN 'schema' THEN
            backup_command := format(
                'pg_dump --schema-only --format=plain --file=%s %s',
                backup_file,
                current_database()
            );
        ELSE
            RAISE EXCEPTION 'Unsupported backup type: %', p_backup_type;
    END CASE;
    
    -- Note: In production, this would be executed via external script
    -- pg_dump execution would be handled by job scheduler (cron, Jenkins, etc.)
    
    -- Simulate backup completion
    end_time := CURRENT_TIMESTAMP + INTERVAL '5 minutes'; -- Simulated duration
    
    -- Update backup log
    UPDATE backup_log SET
        backup_end_time = end_time,
        backup_status = 'completed',
        backup_size_bytes = database_size * 0.7 -- Simulated compressed size
    WHERE backup_log.backup_id = execute_backup.backup_id;
    
    RETURN backup_id;
END;
$$ LANGUAGE plpgsql;

-- === POINT-IN-TIME RECOVERY (PITR) SETUP ===

-- Enable WAL archiving (in postgresql.conf):
-- wal_level = replica
-- archive_mode = on
-- archive_command = 'cp %p /backups/wal_archive/%f'
-- max_wal_senders = 3
-- wal_keep_segments = 32

-- Create recovery point tracking
CREATE TABLE recovery_points (
    recovery_point_id SERIAL PRIMARY KEY,
    recovery_name VARCHAR(100) NOT NULL,
    recovery_timestamp TIMESTAMP NOT NULL,
    wal_file_name VARCHAR(100),
    lsn_position PG_LSN,
    description TEXT,
    created_by VARCHAR(50) DEFAULT session_user,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Function to create named recovery points
CREATE OR REPLACE FUNCTION create_recovery_point(p_recovery_name TEXT, p_description TEXT DEFAULT NULL)
RETURNS TEXT AS $$
DECLARE
    current_lsn PG_LSN;
    wal_file VARCHAR(100);
    recovery_timestamp TIMESTAMP;
BEGIN
    recovery_timestamp := CURRENT_TIMESTAMP;
    current_lsn := pg_current_wal_lsn();
    
    -- Get current WAL file name
    wal_file := pg_walfile_name(current_lsn);
    
    -- Force WAL segment switch to ensure point is archived
    PERFORM pg_switch_wal();
    
    -- Insert recovery point
    INSERT INTO recovery_points (
        recovery_name, 
        recovery_timestamp, 
        wal_file_name, 
        lsn_position, 
        description
    ) VALUES (
        p_recovery_name, 
        recovery_timestamp, 
        wal_file, 
        current_lsn, 
        p_description
    );
    
    RETURN format('Recovery point "%s" created at %s (LSN: %s)', 
                  p_recovery_name, recovery_timestamp, current_lsn);
END;
$$ LANGUAGE plpgsql;

-- Create recovery points for critical operations
SELECT create_recovery_point('before_major_upgrade', 'Before application deployment v2.1');
SELECT create_recovery_point('end_of_business_day', 'Daily EOD checkpoint');

-- === BACKUP VERIFICATION ===

-- Function to verify backup integrity
CREATE OR REPLACE FUNCTION verify_backup(p_backup_id INTEGER)
RETURNS TABLE(check_name TEXT, status TEXT, details TEXT) AS $$
DECLARE
    backup_info RECORD;
    file_exists BOOLEAN;
    file_size BIGINT;
    calculated_checksum TEXT;
BEGIN
    -- Get backup information
    SELECT * INTO backup_info FROM backup_log WHERE backup_id = p_backup_id;
    
    IF NOT FOUND THEN
        RETURN QUERY SELECT 'BACKUP_EXISTS', 'FAIL', 'Backup ID not found';
        RETURN;
    END IF;
    
    -- Check if backup file exists (simulated)
    file_exists := TRUE; -- In reality: check file system
    file_size := backup_info.backup_size_bytes;
    
    RETURN QUERY SELECT 
        'FILE_EXISTS', 
        CASE WHEN file_exists THEN 'PASS' ELSE 'FAIL' END,
        'Backup file: ' || backup_info.backup_file_path;
    
    -- Check file size
    RETURN QUERY SELECT 
        'FILE_SIZE', 
        CASE WHEN file_size > 0 THEN 'PASS' ELSE 'FAIL' END,
        'File size: ' || pg_size_pretty(file_size);
    
    -- Verify checksum (simulated)
    calculated_checksum := encode(digest(backup_info.backup_file_path, 'sha256'), 'hex');
    
    RETURN QUERY SELECT 
        'CHECKSUM', 
        CASE WHEN calculated_checksum = backup_info.checksum THEN 'PASS' ELSE 'FAIL' END,
        'Checksum verification';
    
    -- Test restore capability (dry run)
    -- In production: pg_restore --list backup_file.dump
    RETURN QUERY SELECT 
        'RESTORE_TEST', 
        'PASS',
        'Backup can be restored successfully';
        
END;
$$ LANGUAGE plpgsql;

-- === DISASTER RECOVERY PROCEDURES ===

-- Recovery scenarios tracking
CREATE TABLE recovery_scenarios (
    scenario_id SERIAL PRIMARY KEY,
    scenario_name VARCHAR(100) NOT NULL,
    scenario_type VARCHAR(50), -- 'hardware_failure', 'data_corruption', 'human_error', 'disaster'
    rto_minutes INTEGER, -- Recovery Time Objective
    rpo_minutes INTEGER, -- Recovery Point Objective
    recovery_steps TEXT[],
    last_tested TIMESTAMP,
    test_results TEXT,
    is_automated BOOLEAN DEFAULT FALSE
);

-- Define recovery scenarios
INSERT INTO recovery_scenarios (scenario_name, scenario_type, rto_minutes, rpo_minutes, recovery_steps) VALUES
('Database Server Hardware Failure', 'hardware_failure', 30, 5, ARRAY[
    '1. Assess extent of hardware failure',
    '2. Provision new hardware or activate standby server',
    '3. Restore latest full backup',
    '4. Apply incremental backups and WAL files',
    '5. Verify data consistency',
    '6. Update DNS/connection strings',
    '7. Resume application services'
]),
('Accidental Data Deletion', 'human_error', 60, 1, ARRAY[
    '1. Identify exact time of deletion',
    '2. Create recovery point before restoration',
    '3. Perform point-in-time recovery to just before deletion',
    '4. Export affected data',
    '5. Restore current database',
    '6. Re-import recovered data',
    '7. Verify data integrity'
]),
('Database Corruption', 'data_corruption', 120, 15, ARRAY[
    '1. Isolate corrupted database',
    '2. Attempt corruption repair using built-in tools',
    '3. If repair fails, restore from backup',
    '4. Apply transaction logs up to corruption point',
    '5. Validate data consistency',
    '6. Resume operations'
]);

-- Recovery execution function
CREATE OR REPLACE FUNCTION execute_recovery_plan(p_scenario_id INTEGER)
RETURNS TABLE(step_number INTEGER, step_description TEXT, status TEXT, duration_minutes INTEGER) AS $$
DECLARE
    scenario_info RECORD;
    step_text TEXT;
    step_num INTEGER := 1;
    start_time TIMESTAMP;
    end_time TIMESTAMP;
BEGIN
    -- Get scenario information
    SELECT * INTO scenario_info FROM recovery_scenarios WHERE scenario_id = p_scenario_id;
    
    IF NOT FOUND THEN
        RETURN QUERY SELECT 0, 'Scenario not found', 'FAILED', 0;
        RETURN;
    END IF;
    
    -- Execute each recovery step
    FOREACH step_text IN ARRAY scenario_info.recovery_steps
    LOOP
        start_time := CURRENT_TIMESTAMP;
        
        -- Simulate step execution
        -- In reality, each step would trigger specific recovery actions
        PERFORM pg_sleep(random() * 3); -- Simulate work
        
        end_time := CURRENT_TIMESTAMP;
        
        RETURN QUERY SELECT 
            step_num,
            step_text,
            'COMPLETED'::TEXT,
            EXTRACT(MINUTES FROM end_time - start_time)::INTEGER;
        
        step_num := step_num + 1;
    END LOOP;
    
    -- Update last tested timestamp
    UPDATE recovery_scenarios SET 
        last_tested = CURRENT_TIMESTAMP,
        test_results = 'Recovery plan executed successfully'
    WHERE scenario_id = p_scenario_id;
    
END;
$$ LANGUAGE plpgsql;

-- === BACKUP RETENTION MANAGEMENT ===

-- Function to clean up old backups
CREATE OR REPLACE FUNCTION cleanup_old_backups()
RETURNS TABLE(action TEXT, backup_count INTEGER, space_freed_mb NUMERIC) AS $$
DECLARE
    schedule_info RECORD;
    cleanup_count INTEGER;
    space_freed BIGINT := 0;
    total_freed NUMERIC := 0;
BEGIN
    -- Clean up based on retention policies
    FOR schedule_info IN 
        SELECT backup_type, retention_days FROM backup_schedule WHERE is_enabled = TRUE
    LOOP
        -- Get space that will be freed
        SELECT 
            COUNT(*),
            COALESCE(SUM(backup_size_bytes), 0)
        INTO cleanup_count, space_freed
        FROM backup_log 
        WHERE backup_type = schedule_info.backup_type
          AND backup_start_time < CURRENT_TIMESTAMP - (schedule_info.retention_days || ' days')::INTERVAL
          AND backup_status = 'completed';
        
        -- Delete old backup records
        DELETE FROM backup_log 
        WHERE backup_type = schedule_info.backup_type
          AND backup_start_time < CURRENT_TIMESTAMP - (schedule_info.retention_days || ' days')::INTERVAL
          AND backup_status = 'completed';
        
        total_freed := total_freed + (space_freed / 1024.0 / 1024.0);
        
        RETURN QUERY SELECT 
            'CLEANUP_' || UPPER(schedule_info.backup_type),
            cleanup_count,
            ROUND(space_freed / 1024.0 / 1024.0, 2);
    END LOOP;
    
    RETURN QUERY SELECT 'TOTAL_SPACE_FREED', 0, ROUND(total_freed, 2);
END;
$$ LANGUAGE plpgsql;

-- === HIGH AVAILABILITY SETUP ===

-- Streaming replication configuration
-- On master server (postgresql.conf):
-- wal_level = hot_standby
-- max_wal_senders = 3
-- wal_keep_segments = 32
-- synchronous_standby_names = 'standby1'

-- Create replication user
CREATE USER replication_user WITH REPLICATION ENCRYPTED PASSWORD 'replication_secure_password';

-- Replication monitoring
CREATE TABLE replication_status (
    check_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    standby_name VARCHAR(50),
    lag_bytes BIGINT,
    lag_seconds INTEGER,
    sync_state VARCHAR(20), -- 'async', 'sync', 'potential'
    is_connected BOOLEAN
);

-- Function to monitor replication lag
CREATE OR REPLACE FUNCTION check_replication_lag()
RETURNS TABLE(standby_name TEXT, lag_mb NUMERIC, lag_seconds INTEGER, status TEXT) AS $$
BEGIN
    -- Check replication status
    RETURN QUERY
    SELECT 
        client_hostname::TEXT,
        ROUND((pg_current_wal_lsn() - sent_lsn) / 1024.0 / 1024.0, 2) as lag_mb,
        EXTRACT(SECONDS FROM (CURRENT_TIMESTAMP - backend_start))::INTEGER,
        CASE 
            WHEN state = 'streaming' THEN 'HEALTHY'
            WHEN state = 'catchup' THEN 'CATCHING_UP'
            ELSE 'UNHEALTHY'
        END as status
    FROM pg_stat_replication;
    
    -- If no replicas, return warning
    IF NOT FOUND THEN
        RETURN QUERY SELECT 'NO_REPLICAS'::TEXT, 0::NUMERIC, 0::INTEGER, 'WARNING'::TEXT;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- === BACKUP MONITORING AND ALERTING ===

-- Create backup health dashboard
CREATE VIEW backup_health_dashboard AS
SELECT 
    bs.backup_type,
    bs.schedule_name,
    bs.retention_days,
    bs.is_enabled,
    bl.backup_start_time as last_backup_time,
    bl.backup_status as last_backup_status,
    EXTRACT(HOURS FROM (CURRENT_TIMESTAMP - bl.backup_start_time)) as hours_since_last_backup,
    pg_size_pretty(bl.backup_size_bytes) as last_backup_size,
    CASE 
        WHEN NOT bs.is_enabled THEN 'DISABLED'
        WHEN bl.backup_status = 'failed' THEN 'FAILED'
        WHEN EXTRACT(HOURS FROM (CURRENT_TIMESTAMP - bl.backup_start_time)) > 25 THEN 'OVERDUE'
        WHEN bl.backup_status = 'completed' THEN 'HEALTHY'
        ELSE 'UNKNOWN'
    END as health_status
FROM backup_schedule bs
LEFT JOIN LATERAL (
    SELECT * FROM backup_log 
    WHERE backup_type = bs.backup_type 
    ORDER BY backup_start_time DESC 
    LIMIT 1
) bl ON TRUE;

-- Function to generate backup alerts
CREATE OR REPLACE FUNCTION check_backup_alerts()
RETURNS TABLE(alert_type TEXT, severity TEXT, message TEXT) AS $$
BEGIN
    -- Check for failed backups
    RETURN QUERY
    SELECT 
        'BACKUP_FAILED'::TEXT,
        'HIGH'::TEXT,
        'Backup failed: ' || schedule_name || ' (Last attempt: ' || last_backup_time::TEXT || ')'
    FROM backup_health_dashboard
    WHERE health_status = 'FAILED';
    
    -- Check for overdue backups
    RETURN QUERY
    SELECT 
        'BACKUP_OVERDUE'::TEXT,
        'MEDIUM'::TEXT,
        'Backup overdue: ' || schedule_name || ' (Last backup: ' || 
        hours_since_last_backup::TEXT || ' hours ago)'
    FROM backup_health_dashboard
    WHERE health_status = 'OVERDUE';
    
    -- Check for disabled schedules
    RETURN QUERY
    SELECT 
        'BACKUP_DISABLED'::TEXT,
        'LOW'::TEXT,
        'Backup schedule disabled: ' || schedule_name
    FROM backup_health_dashboard
    WHERE health_status = 'DISABLED';
    
    -- Check for large backup size increases (potential data issues)
    RETURN QUERY
    SELECT 
        'BACKUP_SIZE_ANOMALY'::TEXT,
        'MEDIUM'::TEXT,
        'Backup size increased significantly: ' || schedule_name
    FROM (
        SELECT 
            bs.schedule_name,
            bl1.backup_size_bytes as current_size,
            bl2.backup_size_bytes as previous_size
        FROM backup_schedule bs
        JOIN backup_log bl1 ON bl1.backup_type = bs.backup_type
        JOIN backup_log bl2 ON bl2.backup_type = bs.backup_type
        WHERE bl1.backup_id = (
            SELECT backup_id FROM backup_log 
            WHERE backup_type = bs.backup_type 
            ORDER BY backup_start_time DESC LIMIT 1
        )
        AND bl2.backup_id = (
            SELECT backup_id FROM backup_log 
            WHERE backup_type = bs.backup_type 
            ORDER BY backup_start_time DESC LIMIT 1 OFFSET 1
        )
        AND bl1.backup_size_bytes > bl2.backup_size_bytes * 1.5
    ) size_check;
    
END;
$$ LANGUAGE plpgsql;

-- Run backup health checks
-- SELECT * FROM backup_health_dashboard;
-- SELECT * FROM check_backup_alerts();
-- SELECT * FROM check_replication_lag();
```
*Notice: Backup and recovery strategies should be regularly tested and validated. A backup is only as good as your ability to restore from it successfully.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Not testing restore procedures**: assuming backups work without validation
- **Inadequate retention policies**: keeping too few or too many backups
- **Missing backup verification**: not checking backup integrity regularly
- **Poor documentation**: recovery procedures not clearly documented or updated
- **Single point of failure**: storing all backups in one location
- **Ignoring RPO/RTO requirements**: not aligning backup strategy with business needs

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Enterprise systems**: mission-critical applications requiring minimal downtime
- **Financial services**: strict regulatory requirements for data protection and recovery
- **Healthcare**: patient data protection with rapid recovery capabilities
- **E-commerce**: protecting transaction data and ensuring business continuity
- **SaaS platforms**: multi-tenant data protection and disaster recovery

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"Design a backup strategy for a 24/7 application"** → Hot backups, replication, minimal downtime procedures
2. **"How would you handle point-in-time recovery?"** → WAL archiving, recovery points, timeline management
3. **"What's your approach to testing disaster recovery?"** → Regular drills, automated testing, documentation
4. **"Explain the difference between RPO and RTO"** → Recovery objectives, business impact, strategy alignment
5. **"How do you monitor backup health?"** → Automation, alerting, verification procedures

</div>

<div class="concept-section related-concepts">

🔗 **Related concepts**  
`High Availability` · `Disaster Recovery` · `Data Protection` · `Business Continuity` · `Replication`

</div>

<div class="tags">
  <span class="tag">backup</span>
  <span class="tag">recovery</span>
  <span class="tag">disaster-recovery</span>
  <span class="tag">high-availability</span>
  <span class="tag">point-in-time-recovery</span>
  <span class="tag">senior</span>
</div>
<!-- tags: database-design, normalization, data-modeling, architecture, scalability -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Database design and architecture encompass the systematic approach to structuring data, relationships, and system components for optimal performance, maintainability, and scalability**. **Logical design**: entity-relationship modeling, normalization forms (1NF, 2NF, 3NF, BCNF), denormalization strategies. **Physical design**: table structures, data types, constraints, indexes, partitioning. **Architectural patterns**: master-slave replication, sharding, federation, microservices data patterns. **ACID properties**: Atomicity, Consistency, Isolation, Durability for transaction reliability. **CAP theorem**: trade-offs between Consistency, Availability, and Partition tolerance in distributed systems.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Data integrity**: proper design prevents inconsistencies and corruption
- **Performance**: well-designed schemas enable efficient queries and operations
- **Scalability**: good architecture supports growth in data and users
- **Maintainability**: clear design makes database evolution manageable

</div>

<div class="runnable-model" data-filter="database-design">

**Runnable mental model**
```sql
-- === ENTITY-RELATIONSHIP MODELING ===

-- Example: E-commerce database design
-- Entities: Customer, Product, Order, OrderItem, Category, Supplier

-- Customers table (strong entity)
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    -- Address information (could be normalized into separate table)
    street_address VARCHAR(200),
    city VARCHAR(50),
    state_province VARCHAR(50),
    postal_code VARCHAR(20),
    country VARCHAR(50) DEFAULT 'USA',
    
    -- Constraints
    CONSTRAINT chk_email_format CHECK (email LIKE '%@%.%'),
    CONSTRAINT chk_registration_date CHECK (registration_date <= CURRENT_TIMESTAMP)
);

-- Categories table (hierarchical structure)
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    parent_category_id INTEGER,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Self-referencing foreign key
    FOREIGN KEY (parent_category_id) REFERENCES categories(category_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- Products table
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(200) NOT NULL,
    product_code VARCHAR(50) UNIQUE NOT NULL,
    category_id INTEGER NOT NULL,
    supplier_id INTEGER,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    cost DECIMAL(10, 2),
    weight DECIMAL(8, 3),
    dimensions VARCHAR(50), -- "L x W x H"
    stock_quantity INTEGER DEFAULT 0,
    reorder_level INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign keys
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    
    -- Constraints
    CONSTRAINT chk_price_positive CHECK (price > 0),
    CONSTRAINT chk_stock_non_negative CHECK (stock_quantity >= 0),
    CONSTRAINT chk_cost_valid CHECK (cost IS NULL OR cost >= 0)
);

-- Orders table (transaction entity)
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    order_number VARCHAR(20) UNIQUE NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    
    -- Financial information
    subtotal DECIMAL(10, 2) NOT NULL,
    tax_amount DECIMAL(10, 2) DEFAULT 0,
    shipping_cost DECIMAL(10, 2) DEFAULT 0,
    discount_amount DECIMAL(10, 2) DEFAULT 0,
    total_amount DECIMAL(10, 2) GENERATED ALWAYS AS 
        (subtotal + tax_amount + shipping_cost - discount_amount) STORED,
    
    -- Shipping information
    shipping_address TEXT NOT NULL,
    shipping_method VARCHAR(50),
    tracking_number VARCHAR(100),
    
    -- Timestamps
    shipped_date TIMESTAMP,
    delivered_date TIMESTAMP,
    
    -- Foreign keys
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    
    -- Constraints
    CONSTRAINT chk_amounts_non_negative CHECK (
        subtotal >= 0 AND tax_amount >= 0 AND 
        shipping_cost >= 0 AND discount_amount >= 0
    ),
    CONSTRAINT chk_status_dates CHECK (
        (status != 'shipped' OR shipped_date IS NOT NULL) AND
        (status != 'delivered' OR delivered_date IS NOT NULL)
    )
);

-- Order items table (weak entity - depends on order)
CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    discount_percentage DECIMAL(5, 2) DEFAULT 0,
    line_total DECIMAL(10, 2) GENERATED ALWAYS AS 
        (quantity * unit_price * (1 - discount_percentage / 100)) STORED,
    
    -- Foreign keys
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    
    -- Constraints
    CONSTRAINT chk_quantity_positive CHECK (quantity > 0),
    CONSTRAINT chk_unit_price_positive CHECK (unit_price > 0),
    CONSTRAINT chk_discount_valid CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
    
    -- Composite unique constraint
    UNIQUE (order_id, product_id)
);

-- === NORMALIZATION EXAMPLES ===

-- 1st Normal Form (1NF): Eliminate repeating groups
-- ❌ Not in 1NF (multiple phone numbers in one field)
CREATE TABLE customers_unnormalized (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    phones VARCHAR(200) -- "123-456-7890, 098-765-4321, 555-123-4567"
);

-- ✅ 1NF: Separate table for phone numbers
CREATE TABLE customer_phones (
    phone_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    phone_type ENUM('home', 'work', 'mobile') DEFAULT 'mobile',
    is_primary BOOLEAN DEFAULT FALSE,
    
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
        ON DELETE CASCADE,
    
    -- Ensure only one primary phone per customer
    UNIQUE (customer_id, is_primary) WHERE is_primary = TRUE
);

-- 2nd Normal Form (2NF): Eliminate partial dependencies
-- ❌ Not in 2NF (product_name depends only on product_id, not the full composite key)
CREATE TABLE order_items_2nf_violation (
    order_id INTEGER,
    product_id INTEGER,
    product_name VARCHAR(200), -- Partial dependency!
    quantity INTEGER,
    unit_price DECIMAL(10, 2),
    PRIMARY KEY (order_id, product_id)
);

-- ✅ 2NF: Move product information to separate table
-- (Already shown above in proper design)

-- 3rd Normal Form (3NF): Eliminate transitive dependencies
-- ❌ Not in 3NF (supplier_city depends on supplier_id, which depends on product_id)
CREATE TABLE products_3nf_violation (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(200),
    supplier_id INTEGER,
    supplier_name VARCHAR(100), -- Transitive dependency!
    supplier_city VARCHAR(50)   -- Transitive dependency!
);

-- ✅ 3NF: Separate suppliers table
CREATE TABLE suppliers (
    supplier_id SERIAL PRIMARY KEY,
    supplier_name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    
    -- Address information
    street_address VARCHAR(200),
    city VARCHAR(50),
    state_province VARCHAR(50),
    postal_code VARCHAR(20),
    country VARCHAR(50),
    
    -- Business information
    tax_id VARCHAR(50),
    payment_terms INTEGER DEFAULT 30, -- Days
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Update products table to reference suppliers
ALTER TABLE products 
ADD CONSTRAINT fk_products_supplier 
FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id);

-- === DENORMALIZATION FOR PERFORMANCE ===

-- Sometimes we intentionally violate normalization for performance
-- Customer order summary (denormalized for fast access)
CREATE TABLE customer_order_summary (
    customer_id INTEGER PRIMARY KEY,
    total_orders INTEGER DEFAULT 0,
    total_spent DECIMAL(12, 2) DEFAULT 0,
    average_order_value DECIMAL(10, 2) DEFAULT 0,
    first_order_date TIMESTAMP,
    last_order_date TIMESTAMP,
    favorite_category_id INTEGER,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
        ON DELETE CASCADE,
    FOREIGN KEY (favorite_category_id) REFERENCES categories(category_id)
        ON DELETE SET NULL
);

-- Trigger to maintain denormalized data
CREATE OR REPLACE FUNCTION update_customer_summary()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        -- Update customer summary for new/updated order
        INSERT INTO customer_order_summary (customer_id)
        VALUES (NEW.customer_id)
        ON CONFLICT (customer_id) DO NOTHING;
        
        UPDATE customer_order_summary SET
            total_orders = (
                SELECT COUNT(*) FROM orders 
                WHERE customer_id = NEW.customer_id 
                  AND status != 'cancelled'
            ),
            total_spent = (
                SELECT COALESCE(SUM(total_amount), 0) FROM orders 
                WHERE customer_id = NEW.customer_id 
                  AND status != 'cancelled'
            ),
            last_order_date = (
                SELECT MAX(order_date) FROM orders 
                WHERE customer_id = NEW.customer_id
            ),
            last_updated = CURRENT_TIMESTAMP
        WHERE customer_id = NEW.customer_id;
        
        -- Update average order value
        UPDATE customer_order_summary SET
            average_order_value = CASE 
                WHEN total_orders > 0 THEN total_spent / total_orders
                ELSE 0 
            END
        WHERE customer_id = NEW.customer_id;
        
        RETURN NEW;
        
    ELSIF TG_OP = 'DELETE' THEN
        -- Update customer summary for deleted order
        UPDATE customer_order_summary SET
            total_orders = (
                SELECT COUNT(*) FROM orders 
                WHERE customer_id = OLD.customer_id 
                  AND status != 'cancelled'
            ),
            total_spent = (
                SELECT COALESCE(SUM(total_amount), 0) FROM orders 
                WHERE customer_id = OLD.customer_id 
                  AND status != 'cancelled'
            ),
            last_updated = CURRENT_TIMESTAMP
        WHERE customer_id = OLD.customer_id;
        
        RETURN OLD;
    END IF;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_customer_summary
    AFTER INSERT OR UPDATE OR DELETE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_customer_summary();

-- === ARCHITECTURAL PATTERNS ===

-- 1. Master-Slave Replication Setup (conceptual)
-- Master database handles all writes
-- Slave databases handle read queries for load distribution

-- Read/Write splitting in application code:
-- Write operations: connect to master
-- Read operations: connect to read replicas

-- 2. Horizontal Partitioning (Sharding)
-- Partition orders by customer_id ranges
CREATE TABLE orders_shard_1 (
    CHECK (customer_id >= 1 AND customer_id < 10000)
) INHERITS (orders);

CREATE TABLE orders_shard_2 (
    CHECK (customer_id >= 10000 AND customer_id < 20000)
) INHERITS (orders);

-- Function to route queries to correct shard
CREATE OR REPLACE FUNCTION get_orders_by_customer(p_customer_id INTEGER)
RETURNS SETOF orders AS $$
BEGIN
    IF p_customer_id >= 1 AND p_customer_id < 10000 THEN
        RETURN QUERY SELECT * FROM orders_shard_1 WHERE customer_id = p_customer_id;
    ELSIF p_customer_id >= 10000 AND p_customer_id < 20000 THEN
        RETURN QUERY SELECT * FROM orders_shard_2 WHERE customer_id = p_customer_id;
    ELSE
        RAISE EXCEPTION 'Customer ID % not in valid range', p_customer_id;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- 3. Event Sourcing Pattern
CREATE TABLE event_store (
    event_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aggregate_id UUID NOT NULL,
    aggregate_type VARCHAR(50) NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    event_data JSONB NOT NULL,
    event_version INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Ensure event ordering
    UNIQUE (aggregate_id, event_version)
);

-- Example events for order aggregate
INSERT INTO event_store (aggregate_id, aggregate_type, event_type, event_data, event_version)
VALUES 
    ('550e8400-e29b-41d4-a716-446655440000', 'Order', 'OrderCreated', 
     '{"customer_id": 123, "order_date": "2023-10-01T10:00:00Z", "items": [{"product_id": 456, "quantity": 2}]}', 1),
    ('550e8400-e29b-41d4-a716-446655440000', 'Order', 'OrderShipped', 
     '{"tracking_number": "TRK123456", "shipped_date": "2023-10-02T14:30:00Z"}', 2);

-- === DATA WAREHOUSE DESIGN ===

-- Star Schema for analytics
-- Fact table (center of star)
CREATE TABLE sales_fact (
    sale_id BIGSERIAL PRIMARY KEY,
    date_key INTEGER NOT NULL,
    customer_key INTEGER NOT NULL,
    product_key INTEGER NOT NULL,
    store_key INTEGER NOT NULL,
    
    -- Measures (facts)
    quantity_sold INTEGER NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    discount_amount DECIMAL(10, 2) DEFAULT 0,
    profit_amount DECIMAL(12, 2),
    
    -- Foreign keys to dimension tables
    FOREIGN KEY (date_key) REFERENCES date_dimension(date_key),
    FOREIGN KEY (customer_key) REFERENCES customer_dimension(customer_key),
    FOREIGN KEY (product_key) REFERENCES product_dimension(product_key),
    FOREIGN KEY (store_key) REFERENCES store_dimension(store_key)
);

-- Dimension tables (points of star)
CREATE TABLE date_dimension (
    date_key INTEGER PRIMARY KEY,
    full_date DATE NOT NULL,
    day_of_week INTEGER,
    day_name VARCHAR(10),
    month_number INTEGER,
    month_name VARCHAR(10),
    quarter INTEGER,
    year INTEGER,
    is_weekend BOOLEAN,
    is_holiday BOOLEAN
);

CREATE TABLE customer_dimension (
    customer_key SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL, -- Business key
    customer_name VARCHAR(100),
    customer_segment VARCHAR(20),
    customer_status VARCHAR(20),
    registration_date DATE,
    
    -- SCD Type 2 fields for historical tracking
    effective_date DATE NOT NULL,
    expiration_date DATE,
    is_current BOOLEAN DEFAULT TRUE,
    
    -- Version tracking
    version_number INTEGER DEFAULT 1
);

-- === PERFORMANCE OPTIMIZATION THROUGH DESIGN ===

-- Covering indexes for query optimization
CREATE INDEX idx_orders_covering_recent 
ON orders (customer_id, order_date DESC) 
INCLUDE (total_amount, status)
WHERE order_date >= CURRENT_DATE - INTERVAL '1 year';

-- Partial indexes for common filter conditions
CREATE INDEX idx_orders_active_high_value 
ON orders (order_date, total_amount) 
WHERE status IN ('processing', 'shipped') 
  AND total_amount > 100;

-- Function-based indexes for computed columns
CREATE INDEX idx_customers_email_domain 
ON customers (LOWER(SUBSTRING(email FROM POSITION('@' IN email) + 1)));

-- === BACKUP AND RECOVERY DESIGN ===

-- Point-in-time recovery setup
-- Enable WAL archiving in postgresql.conf:
-- wal_level = replica
-- archive_mode = on
-- archive_command = 'cp %p /backup/archive/%f'

-- Create base backup
-- pg_basebackup -D /backup/base -Ft -z -P

-- Recovery configuration
-- Create recovery.conf for PITR:
-- restore_command = 'cp /backup/archive/%f %p'
-- recovery_target_time = '2023-10-01 14:30:00'

-- === MONITORING AND MAINTENANCE ===

-- Database health monitoring view
CREATE VIEW database_health_monitor AS
SELECT 
    'table_sizes' as metric_type,
    schemaname || '.' || tablename as object_name,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size,
    pg_total_relation_size(schemaname||'.'||tablename) as size_bytes
FROM pg_tables 
WHERE schemaname = 'public'
UNION ALL
SELECT 
    'index_usage' as metric_type,
    schemaname || '.' || indexname as object_name,
    idx_scan::TEXT as usage_count,
    idx_scan as numeric_value
FROM pg_stat_user_indexes
ORDER BY size_bytes DESC NULLS LAST;

-- Automated maintenance procedures
CREATE OR REPLACE FUNCTION perform_maintenance()
RETURNS TABLE(operation TEXT, status TEXT, details TEXT) AS $$
BEGIN
    -- Update table statistics
    RETURN QUERY SELECT 'ANALYZE', 'COMPLETED', 'Updated table statistics';
    ANALYZE;
    
    -- Reindex heavily used indexes
    RETURN QUERY SELECT 'REINDEX', 'COMPLETED', 'Rebuilt fragmented indexes';
    REINDEX INDEX CONCURRENTLY idx_orders_customer_date;
    
    -- Clean up old audit logs (example)
    DELETE FROM audit_log WHERE created_at < CURRENT_DATE - INTERVAL '90 days';
    RETURN QUERY SELECT 'CLEANUP', 'COMPLETED', 'Removed old audit entries';
    
    -- Vacuum tables to reclaim space
    RETURN QUERY SELECT 'VACUUM', 'COMPLETED', 'Reclaimed disk space';
    VACUUM ANALYZE;
    
END;
$$ LANGUAGE plpgsql;

-- Schedule maintenance (would be called by cron job)
-- SELECT * FROM perform_maintenance();
```
*Notice: Database design requires balancing normalization for data integrity with denormalization for performance. The key is understanding your access patterns and requirements.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Over-normalization**: Creating too many tables that require complex joins for simple queries
- **Under-normalization**: Allowing data redundancy that leads to update anomalies
- **Poor constraint design**: Missing foreign keys or check constraints that ensure data integrity
- **Inappropriate data types**: Using VARCHAR(255) for everything instead of proper types
- **Missing indexes**: Not creating indexes for frequently queried columns
- **No partitioning strategy**: Not planning for data growth and query performance

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **E-commerce systems**: complex product catalogs, order management, customer analytics
- **Financial applications**: transaction processing, regulatory reporting, audit trails
- **Healthcare systems**: patient records, medical history, compliance requirements
- **Content management**: media assets, user-generated content, workflow management
- **IoT and analytics**: time-series data, real-time monitoring, data warehousing

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"Design a database schema for a social media platform"** → Entity modeling, relationships, scalability considerations
2. **"Explain normalization and when you might denormalize"** → Normal forms, performance trade-offs
3. **"How would you handle database scaling?"** → Sharding, replication, partitioning strategies
4. **"Design for high availability and disaster recovery"** → Backup strategies, failover mechanisms
5. **"What's your approach to database monitoring?"** → Performance metrics, alerting, maintenance procedures

</div>

<div class="concept-section related-concepts">

🔗 **Related concepts**  
`Data Modeling` · `Normalization` · `Database Architecture` · `Performance Tuning` · `High Availability`

</div>

<div class="tags">
  <span class="tag">database-design</span>
  <span class="tag">normalization</span>
  <span class="tag">data-modeling</span>
  <span class="tag">architecture</span>
  <span class="tag">medior</span>
</div>

---

### Advanced Query Optimization {#advanced-query-optimization}
<!-- tags: query-optimization, performance-tuning, execution-plans, indexing -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Advanced query optimization encompasses deep understanding of database internals, execution plans, cost-based optimization, and systematic approaches to improving query performance**. **Execution plan analysis**: understanding operators (scans, seeks, joins, sorts), cost estimates, cardinality estimation, and identifying bottlenecks. **Index optimization**: covering indexes, filtered indexes, index intersection, index maintenance, and fragmentation management. **Join optimization**: hash joins, nested loops, merge joins, join order optimization, and statistics importance. **Subquery optimization**: correlated vs non-correlated subqueries, EXISTS vs IN performance, CTE optimization. **Partitioning strategies**: range, hash, list partitioning for performance and maintenance. **Statistics and cardinality**: histogram analysis, parameter sniffing, plan caching issues.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Performance scaling**: optimize queries for growing data volumes
- **Resource utilization**: reduce CPU, memory, and I/O consumption
- **User experience**: faster response times improve application usability
- **Cost optimization**: efficient queries reduce infrastructure costs

</div>

<div class="runnable-model" data-filter="query-optimization">

**Runnable mental model**
```sql
-- === EXECUTION PLAN ANALYSIS ===

-- 1. Understanding execution plans
-- PostgreSQL
EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) 
SELECT c.customer_name, COUNT(o.order_id) as order_count
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE c.registration_date >= '2023-01-01'
GROUP BY c.customer_id, c.customer_name
ORDER BY order_count DESC;

-- SQL Server
SET STATISTICS IO ON;
SET STATISTICS TIME ON;
SELECT c.customer_name, COUNT(o.order_id) as order_count
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE c.registration_date >= '2023-01-01'
GROUP BY c.customer_id, c.customer_name
ORDER BY order_count DESC;

-- MySQL
EXPLAIN FORMAT=JSON
SELECT c.customer_name, COUNT(o.order_id) as order_count
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE c.registration_date >= '2023-01-01'
GROUP BY c.customer_id, c.customer_name
ORDER BY order_count DESC;

-- 2. Identifying performance issues
-- Check for table scans instead of index seeks
EXPLAIN (ANALYZE, BUFFERS) 
SELECT * FROM large_table WHERE rarely_queried_column = 'value';
-- Result: Seq Scan on large_table (cost=0.00..180000.00 rows=1000000)
-- Solution: Add index on rarely_queried_column

-- Check for expensive sort operations
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM orders ORDER BY order_date DESC LIMIT 100;
-- If no index on order_date: expensive external sort
-- Solution: CREATE INDEX idx_orders_date ON orders(order_date DESC);

-- === ADVANCED INDEXING STRATEGIES ===

-- 1. Covering indexes (include all needed columns)
-- Before: Index seek + key lookup
SELECT order_id, customer_id, order_total, order_date
FROM orders 
WHERE customer_id = 12345;

-- Create covering index
CREATE INDEX idx_orders_covering 
ON orders(customer_id) 
INCLUDE (order_id, order_total, order_date);

-- Now: Index seek only, no key lookup needed

-- 2. Filtered indexes for selective queries
-- Only index active customers
CREATE INDEX idx_customers_active_email 
ON customers(email) 
WHERE status = 'ACTIVE';

-- More efficient for queries on active customers
SELECT * FROM customers 
WHERE status = 'ACTIVE' AND email = 'user@example.com';

-- 3. Composite index order optimization
-- Optimize for multiple WHERE conditions
CREATE INDEX idx_orders_composite 
ON orders(status, order_date, customer_id);

-- Efficient for queries like:
SELECT * FROM orders 
WHERE status = 'PENDING' 
  AND order_date >= '2023-01-01' 
  AND customer_id = 12345;

-- Order matters: most selective column first
-- status (few values) < order_date (range) < customer_id (unique)

-- 4. Index intersection and union
-- Multiple single-column indexes can work together
CREATE INDEX idx_customers_city ON customers(city);
CREATE INDEX idx_customers_age ON customers(age);

-- Query can use both indexes
SELECT * FROM customers 
WHERE city = 'New York' AND age BETWEEN 25 AND 35;

-- === JOIN OPTIMIZATION ===

-- 1. Join algorithm selection
-- Hash join: good for large datasets with one small table
SELECT c.customer_name, o.order_total
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
WHERE c.city = 'London';

-- Nested loop: efficient for small datasets or when one side is highly selective
SELECT c.customer_name, o.order_total
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
WHERE c.customer_id = 12345; -- Highly selective

-- Merge join: efficient when both sides are pre-sorted
SELECT c.customer_name, o.order_total
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
ORDER BY c.customer_id; -- Both tables have clustered index on customer_id

-- 2. Join order optimization
-- Optimizer chooses join order, but hints can help
-- Start with most selective table
SELECT /*+ USE_INDEX(c, idx_customers_city) */ 
       c.customer_name, o.order_total, od.product_name
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
INNER JOIN order_details od ON o.order_id = od.order_id
WHERE c.city = 'London' -- Most selective condition first
  AND o.order_date >= '2023-01-01'
  AND od.quantity > 10;

-- === SUBQUERY OPTIMIZATION ===

-- 1. Correlated vs Non-correlated subqueries
-- Inefficient correlated subquery
SELECT c.customer_name
FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o 
    WHERE o.customer_id = c.customer_id 
      AND o.order_date >= '2023-01-01'
);

-- Better: Use JOIN instead
SELECT DISTINCT c.customer_name
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_date >= '2023-01-01';

-- 2. EXISTS vs IN optimization
-- EXISTS is often more efficient
SELECT c.customer_name
FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o 
    WHERE o.customer_id = c.customer_id
);

-- IN can be less efficient with large result sets
SELECT c.customer_name
FROM customers c
WHERE c.customer_id IN (
    SELECT DISTINCT customer_id FROM orders
);

-- 3. Common Table Expression (CTE) optimization
-- Non-recursive CTE for readability and performance
WITH high_value_customers AS (
    SELECT customer_id, SUM(order_total) as total_spent
    FROM orders
    WHERE order_date >= '2023-01-01'
    GROUP BY customer_id
    HAVING SUM(order_total) > 10000
)
SELECT c.customer_name, hvc.total_spent
FROM customers c
INNER JOIN high_value_customers hvc ON c.customer_id = hvc.customer_id;

-- Recursive CTE for hierarchical data
WITH RECURSIVE employee_hierarchy AS (
    -- Anchor: top-level managers
    SELECT employee_id, name, manager_id, 1 as level
    FROM employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive: subordinates
    SELECT e.employee_id, e.name, e.manager_id, eh.level + 1
    FROM employees e
    INNER JOIN employee_hierarchy eh ON e.manager_id = eh.employee_id
)
SELECT * FROM employee_hierarchy ORDER BY level, name;

-- === PARTITIONING STRATEGIES ===

-- 1. Range partitioning (PostgreSQL)
CREATE TABLE orders_partitioned (
    order_id SERIAL,
    customer_id INTEGER,
    order_date DATE,
    order_total DECIMAL(10,2)
) PARTITION BY RANGE (order_date);

-- Create partitions for each month
CREATE TABLE orders_2023_01 PARTITION OF orders_partitioned
FOR VALUES FROM ('2023-01-01') TO ('2023-02-01');

CREATE TABLE orders_2023_02 PARTITION OF orders_partitioned
FOR VALUES FROM ('2023-02-01') TO ('2023-03-01');

-- Queries automatically use appropriate partition
SELECT * FROM orders_partitioned 
WHERE order_date >= '2023-01-15' AND order_date < '2023-01-20';

-- 2. Hash partitioning for even distribution
CREATE TABLE customers_partitioned (
    customer_id SERIAL,
    name VARCHAR(100),
    email VARCHAR(100)
) PARTITION BY HASH (customer_id);

-- Create hash partitions
CREATE TABLE customers_partition_0 PARTITION OF customers_partitioned
FOR VALUES WITH (modulus 4, remainder 0);

CREATE TABLE customers_partition_1 PARTITION OF customers_partitioned
FOR VALUES WITH (modulus 4, remainder 1);

-- === STATISTICS AND CARDINALITY OPTIMIZATION ===

-- 1. Update statistics for better execution plans
-- PostgreSQL
ANALYZE customers;
ANALYZE orders;

-- SQL Server
UPDATE STATISTICS customers;
UPDATE STATISTICS orders WITH FULLSCAN;

-- MySQL
ANALYZE TABLE customers;
ANALYZE TABLE orders;

-- 2. Check statistics currency
-- PostgreSQL
SELECT schemaname, tablename, last_analyzed, n_tup_ins, n_tup_upd, n_tup_del
FROM pg_stat_user_tables
WHERE tablename IN ('customers', 'orders');

-- SQL Server
SELECT 
    t.name AS table_name,
    s.name AS stats_name,
    s.stats_date,
    s.rows,
    s.rows_sampled
FROM sys.stats s
INNER JOIN sys.tables t ON s.object_id = t.object_id
WHERE t.name IN ('customers', 'orders');

-- 3. Handle parameter sniffing (SQL Server)
-- Problem: Plan cached for one parameter value
CREATE PROCEDURE GetCustomerOrders(@CustomerId INT)
AS
BEGIN
    SELECT o.order_id, o.order_date, o.order_total
    FROM orders o
    WHERE o.customer_id = @CustomerId;
END;

-- Solution: Use OPTION(RECOMPILE) for varying parameters
CREATE PROCEDURE GetCustomerOrders(@CustomerId INT)
AS
BEGIN
    SELECT o.order_id, o.order_date, o.order_total
    FROM orders o
    WHERE o.customer_id = @CustomerId
    OPTION(RECOMPILE);
END;

-- === MONITORING AND MAINTENANCE ===

-- 1. Index usage analysis
-- PostgreSQL
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;

-- SQL Server
SELECT 
    i.name AS index_name,
    i.type_desc,
    s.user_seeks,
    s.user_scans,
    s.user_lookups,
    s.user_updates
FROM sys.indexes i
LEFT JOIN sys.dm_db_index_usage_stats s 
    ON i.object_id = s.object_id AND i.index_id = s.index_id
WHERE OBJECTPROPERTY(i.object_id, 'IsUserTable') = 1
ORDER BY s.user_seeks + s.user_scans + s.user_lookups DESC;

-- 2. Index fragmentation analysis
-- SQL Server
SELECT 
    i.name AS index_name,
    ips.avg_fragmentation_in_percent,
    ips.page_count
FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, 'DETAILED') ips
INNER JOIN sys.indexes i ON ips.object_id = i.object_id AND ips.index_id = i.index_id
WHERE ips.avg_fragmentation_in_percent > 10
ORDER BY ips.avg_fragmentation_in_percent DESC;

-- 3. Query performance monitoring
-- PostgreSQL: Enable pg_stat_statements
SELECT 
    query,
    calls,
    total_time,
    mean_time,
    rows
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;

-- SQL Server: Query Store
SELECT 
    qst.query_text,
    rs.count_executions,
    rs.avg_duration,
    rs.max_duration,
    rs.avg_logical_io_reads
FROM sys.query_store_query_text qst
INNER JOIN sys.query_store_query q ON qst.query_text_id = q.query_text_id
INNER JOIN sys.query_store_plan p ON q.query_id = p.query_id
INNER JOIN sys.query_store_runtime_stats rs ON p.plan_id = rs.plan_id
ORDER BY rs.avg_duration DESC;

-- === PRACTICAL OPTIMIZATION EXAMPLE ===

-- Scenario: Slow reporting query
-- Original query (slow)
SELECT 
    c.customer_name,
    COUNT(o.order_id) as order_count,
    SUM(o.order_total) as total_spent,
    AVG(o.order_total) as avg_order_value,
    MAX(o.order_date) as last_order_date
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE c.registration_date >= '2022-01-01'
GROUP BY c.customer_id, c.customer_name
HAVING COUNT(o.order_id) > 5
ORDER BY total_spent DESC;

-- Optimization steps:

-- Step 1: Add covering index
CREATE INDEX idx_customers_reg_date_covering 
ON customers(registration_date) 
INCLUDE (customer_id, customer_name);

-- Step 2: Add index for join
CREATE INDEX idx_orders_customer_optimized 
ON orders(customer_id, order_date, order_total);

-- Step 3: Rewrite with materialized subquery if needed
WITH customer_stats AS (
    SELECT 
        customer_id,
        COUNT(*) as order_count,
        SUM(order_total) as total_spent,
        AVG(order_total) as avg_order_value,
        MAX(order_date) as last_order_date
    FROM orders
    GROUP BY customer_id
    HAVING COUNT(*) > 5
)
SELECT 
    c.customer_name,
    cs.order_count,
    cs.total_spent,
    cs.avg_order_value,
    cs.last_order_date
FROM customers c
INNER JOIN customer_stats cs ON c.customer_id = cs.customer_id
WHERE c.registration_date >= '2022-01-01'
ORDER BY cs.total_spent DESC;

-- Step 4: Consider materialized view for frequently accessed aggregations
CREATE MATERIALIZED VIEW customer_summary AS
SELECT 
    c.customer_id,
    c.customer_name,
    c.registration_date,
    COUNT(o.order_id) as order_count,
    COALESCE(SUM(o.order_total), 0) as total_spent,
    AVG(o.order_total) as avg_order_value,
    MAX(o.order_date) as last_order_date
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name, c.registration_date;

-- Refresh periodically
REFRESH MATERIALIZED VIEW customer_summary;

-- Fast query using materialized view
SELECT * FROM customer_summary
WHERE registration_date >= '2022-01-01'
  AND order_count > 5
ORDER BY total_spent DESC;
```
*Notice: Query optimization requires understanding database internals, systematic analysis of execution plans, and continuous monitoring of performance metrics.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Premature optimization**: Optimizing queries before identifying actual bottlenecks
- **Index overload**: Creating too many indexes, slowing down writes
- **Ignoring execution plans**: Not analyzing how queries actually execute
- **Statistics neglect**: Allowing outdated statistics to mislead the optimizer
- **Generic solutions**: Applying same optimization pattern regardless of data characteristics
- **Missing monitoring**: Not tracking query performance over time

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Data warehousing**: large-scale analytical queries requiring optimization
- **OLTP systems**: high-frequency transactional queries needing fast response
- **Reporting systems**: complex aggregations and joins for business intelligence
- **Real-time analytics**: streaming data analysis with performance constraints
- **E-commerce platforms**: product search, recommendation engines, order processing

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"A query is running slowly, how do you optimize it?"** → Systematic approach to performance analysis
2. **"Explain different types of joins and their performance characteristics"** → Join algorithms and optimization
3. **"How do you choose the right indexing strategy?"** → Index types, covering indexes, maintenance
4. **"What's your approach to query plan analysis?"** → Execution plan interpretation, bottleneck identification
5. **"How do you handle performance issues in production?"** → Monitoring, troubleshooting, optimization techniques

</div>

<div class="concept-section related-concepts">

🔗 **Related concepts**  
`Database Performance` · `Indexing Strategies` · `Query Execution` · `Statistics` · `Database Tuning`

</div>

<div class="tags">
  <span class="tag">query-optimization</span>
  <span class="tag">performance-tuning</span>
  <span class="tag">execution-plans</span>
  <span class="tag">indexing</span>
  <span class="tag">database-internals</span>
  <span class="tag">medior</span>
</div>

---

### Data Warehousing and Analytics {#data-warehousing}
<!-- tags: data-warehouse, olap, analytics, etl, business-intelligence -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Data warehousing encompasses the design, implementation, and management of centralized repositories optimized for analytical processing and business intelligence**. **OLAP vs OLTP**: Online Analytical Processing (complex queries, historical data, read-heavy) vs Online Transaction Processing (simple queries, current data, write-heavy). **ETL/ELT processes**: Extract, Transform, Load data from operational systems into analytical structures. **Dimensional modeling**: star schema, snowflake schema, fact tables, dimension tables for analytical queries. **Data marts**: subject-specific subsets of data warehouse for departmental needs. **Modern architectures**: data lakes, lake houses, cloud-native solutions, real-time streaming analytics.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Business intelligence**: enable data-driven decision making across organization
- **Analytics performance**: optimize query performance for complex analytical workloads
- **Data integration**: consolidate data from multiple sources for unified view
- **Scalability**: handle growing data volumes with appropriate architectures

</div>

<div class="runnable-model" data-filter="data-warehousing">

**Runnable mental model**
```sql
-- === DIMENSIONAL MODELING ===

-- 1. Star Schema Design
-- Fact table: contains measures and foreign keys to dimensions
CREATE TABLE fact_sales (
    sale_id BIGINT PRIMARY KEY,
    date_key INTEGER NOT NULL,
    customer_key INTEGER NOT NULL,
    product_key INTEGER NOT NULL,
    store_key INTEGER NOT NULL,
    sales_amount DECIMAL(10,2) NOT NULL,
    quantity_sold INTEGER NOT NULL,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    cost_amount DECIMAL(10,2) NOT NULL,
    profit_amount AS (sales_amount - cost_amount - discount_amount),
    
    FOREIGN KEY (date_key) REFERENCES dim_date(date_key),
    FOREIGN KEY (customer_key) REFERENCES dim_customer(customer_key),
    FOREIGN KEY (product_key) REFERENCES dim_product(product_key),
    FOREIGN KEY (store_key) REFERENCES dim_store(store_key)
);

-- Dimension tables: contain descriptive attributes
CREATE TABLE dim_date (
    date_key INTEGER PRIMARY KEY,
    date_value DATE NOT NULL,
    year INTEGER NOT NULL,
    quarter INTEGER NOT NULL,
    month INTEGER NOT NULL,
    month_name VARCHAR(20) NOT NULL,
    day_of_week INTEGER NOT NULL,
    day_of_week_name VARCHAR(20) NOT NULL,
    week_of_year INTEGER NOT NULL,
    is_weekend BOOLEAN NOT NULL,
    is_holiday BOOLEAN NOT NULL,
    fiscal_year INTEGER,
    fiscal_quarter INTEGER
);

CREATE TABLE dim_customer (
    customer_key INTEGER PRIMARY KEY,
    customer_id VARCHAR(50) NOT NULL, -- Business key
    customer_name VARCHAR(100) NOT NULL,
    customer_type VARCHAR(20) NOT NULL, -- Individual, Business
    age_group VARCHAR(20), -- 18-25, 26-35, etc.
    income_bracket VARCHAR(20), -- Low, Medium, High
    city VARCHAR(50),
    state VARCHAR(50),
    country VARCHAR(50),
    registration_date DATE,
    customer_status VARCHAR(20), -- Active, Inactive, VIP
    
    -- Slowly Changing Dimension (SCD) Type 2 fields
    effective_from_date DATE NOT NULL,
    effective_to_date DATE,
    is_current BOOLEAN DEFAULT TRUE
);

CREATE TABLE dim_product (
    product_key INTEGER PRIMARY KEY,
    product_id VARCHAR(50) NOT NULL, -- Business key
    product_name VARCHAR(100) NOT NULL,
    product_category VARCHAR(50) NOT NULL,
    product_subcategory VARCHAR(50),
    brand VARCHAR(50),
    supplier VARCHAR(50),
    unit_cost DECIMAL(10,2),
    unit_price DECIMAL(10,2),
    product_status VARCHAR(20), -- Active, Discontinued
    
    -- Product hierarchy for drill-down analysis
    category_hierarchy VARCHAR(200), -- Electronics > Computers > Laptops
    
    -- SCD Type 2 for price changes
    effective_from_date DATE NOT NULL,
    effective_to_date DATE,
    is_current BOOLEAN DEFAULT TRUE
);

CREATE TABLE dim_store (
    store_key INTEGER PRIMARY KEY,
    store_id VARCHAR(20) NOT NULL,
    store_name VARCHAR(100) NOT NULL,
    store_type VARCHAR(20), -- Mall, Standalone, Online
    store_size VARCHAR(20), -- Small, Medium, Large
    city VARCHAR(50),
    state VARCHAR(50),
    region VARCHAR(50),
    manager_name VARCHAR(100),
    opening_date DATE,
    store_status VARCHAR(20) -- Open, Closed, Renovating
);

-- 2. Populate date dimension (common pattern)
INSERT INTO dim_date (date_key, date_value, year, quarter, month, month_name, 
                     day_of_week, day_of_week_name, week_of_year, is_weekend, is_holiday)
SELECT 
    TO_CHAR(date_value, 'YYYYMMDD')::INTEGER as date_key,
    date_value,
    EXTRACT(YEAR FROM date_value) as year,
    EXTRACT(QUARTER FROM date_value) as quarter,
    EXTRACT(MONTH FROM date_value) as month,
    TO_CHAR(date_value, 'Month') as month_name,
    EXTRACT(DOW FROM date_value) as day_of_week,
    TO_CHAR(date_value, 'Day') as day_of_week_name,
    EXTRACT(WEEK FROM date_value) as week_of_year,
    CASE WHEN EXTRACT(DOW FROM date_value) IN (0, 6) THEN TRUE ELSE FALSE END as is_weekend,
    FALSE as is_holiday -- Update separately with holiday logic
FROM generate_series('2020-01-01'::DATE, '2030-12-31'::DATE, '1 day') as date_value;

-- === ETL PROCESSES ===

-- 1. Data extraction from OLTP systems
-- Extract sales data with incremental loading
CREATE OR REPLACE FUNCTION extract_sales_data(p_from_date DATE, p_to_date DATE)
RETURNS TABLE(
    transaction_id BIGINT,
    transaction_date DATE,
    customer_id VARCHAR(50),
    product_id VARCHAR(50),
    store_id VARCHAR(20),
    sales_amount DECIMAL(10,2),
    quantity INTEGER,
    discount_amount DECIMAL(10,2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.id as transaction_id,
        s.sale_date as transaction_date,
        c.customer_code as customer_id,
        p.product_code as product_id,
        st.store_code as store_id,
        s.total_amount as sales_amount,
        s.quantity,
        COALESCE(s.discount, 0) as discount_amount
    FROM sales_transactions s
    INNER JOIN customers c ON s.customer_id = c.id
    INNER JOIN products p ON s.product_id = p.id
    INNER JOIN stores st ON s.store_id = st.id
    WHERE s.sale_date BETWEEN p_from_date AND p_to_date
      AND s.status = 'COMPLETED';
END;
$$ LANGUAGE plpgsql;

-- 2. Data transformation and loading
-- ETL procedure for loading fact table
CREATE OR REPLACE FUNCTION load_fact_sales(p_from_date DATE, p_to_date DATE)
RETURNS INTEGER AS $$
DECLARE
    rows_loaded INTEGER := 0;
BEGIN
    -- Insert new sales facts with dimension key lookups
    INSERT INTO fact_sales (
        sale_id, date_key, customer_key, product_key, store_key,
        sales_amount, quantity_sold, discount_amount, cost_amount
    )
    SELECT 
        ext.transaction_id,
        dd.date_key,
        dc.customer_key,
        dp.product_key,
        ds.store_key,
        ext.sales_amount,
        ext.quantity,
        ext.discount_amount,
        dp.unit_cost * ext.quantity as cost_amount
    FROM extract_sales_data(p_from_date, p_to_date) ext
    INNER JOIN dim_date dd ON dd.date_value = ext.transaction_date
    INNER JOIN dim_customer dc ON dc.customer_id = ext.customer_id AND dc.is_current = TRUE
    INNER JOIN dim_product dp ON dp.product_id = ext.product_id AND dp.is_current = TRUE
    INNER JOIN dim_store ds ON ds.store_id = ext.store_id
    ON CONFLICT (sale_id) DO NOTHING; -- Avoid duplicates
    
    GET DIAGNOSTICS rows_loaded = ROW_COUNT;
    
    -- Log ETL process
    INSERT INTO etl_log (process_name, start_date, end_date, rows_processed, status)
    VALUES ('load_fact_sales', p_from_date, p_to_date, rows_loaded, 'SUCCESS');
    
    RETURN rows_loaded;
END;
$$ LANGUAGE plpgsql;

-- 3. Slowly Changing Dimensions (SCD) Type 2
-- Handle customer changes while preserving history
CREATE OR REPLACE FUNCTION update_customer_dimension()
RETURNS VOID AS $$
BEGIN
    -- Close current records for changed customers
    UPDATE dim_customer dc
    SET effective_to_date = CURRENT_DATE - 1,
        is_current = FALSE
    WHERE dc.is_current = TRUE
      AND EXISTS (
          SELECT 1 FROM staging_customers sc
          WHERE sc.customer_id = dc.customer_id
            AND (sc.customer_name != dc.customer_name
                OR sc.city != dc.city
                OR sc.customer_status != dc.customer_status)
      );
    
    -- Insert new records for changed customers
    INSERT INTO dim_customer (
        customer_id, customer_name, customer_type, city, state, country,
        customer_status, effective_from_date, effective_to_date, is_current
    )
    SELECT DISTINCT
        sc.customer_id,
        sc.customer_name,
        sc.customer_type,
        sc.city,
        sc.state,
        sc.country,
        sc.customer_status,
        CURRENT_DATE,
        NULL,
        TRUE
    FROM staging_customers sc
    WHERE NOT EXISTS (
        SELECT 1 FROM dim_customer dc
        WHERE dc.customer_id = sc.customer_id AND dc.is_current = TRUE
    );
END;
$$ LANGUAGE plpgsql;

-- === ANALYTICAL QUERIES ===

-- 1. Time series analysis with window functions
-- Monthly sales trend with year-over-year comparison
SELECT 
    dd.year,
    dd.month,
    dd.month_name,
    SUM(fs.sales_amount) as monthly_sales,
    LAG(SUM(fs.sales_amount), 12) OVER (ORDER BY dd.year, dd.month) as same_month_last_year,
    ROUND(
        (SUM(fs.sales_amount) - LAG(SUM(fs.sales_amount), 12) OVER (ORDER BY dd.year, dd.month)) 
        / NULLIF(LAG(SUM(fs.sales_amount), 12) OVER (ORDER BY dd.year, dd.month), 0) * 100, 
        2
    ) as yoy_growth_percent,
    SUM(SUM(fs.sales_amount)) OVER (
        PARTITION BY dd.year 
        ORDER BY dd.month 
        ROWS UNBOUNDED PRECEDING
    ) as running_total_ytd
FROM fact_sales fs
INNER JOIN dim_date dd ON fs.date_key = dd.date_key
WHERE dd.year >= 2022
GROUP BY dd.year, dd.month, dd.month_name
ORDER BY dd.year, dd.month;

-- 2. Customer segmentation analysis
-- RFM Analysis (Recency, Frequency, Monetary)
WITH customer_rfm AS (
    SELECT 
        dc.customer_key,
        dc.customer_name,
        MAX(dd.date_value) as last_purchase_date,
        CURRENT_DATE - MAX(dd.date_value) as recency_days,
        COUNT(DISTINCT fs.sale_id) as frequency,
        SUM(fs.sales_amount) as monetary_value
    FROM fact_sales fs
    INNER JOIN dim_customer dc ON fs.customer_key = dc.customer_key
    INNER JOIN dim_date dd ON fs.date_key = dd.date_key
    WHERE dd.date_value >= CURRENT_DATE - INTERVAL '2 years'
    GROUP BY dc.customer_key, dc.customer_name
),
rfm_scores AS (
    SELECT 
        *,
        NTILE(5) OVER (ORDER BY recency_days DESC) as recency_score,
        NTILE(5) OVER (ORDER BY frequency) as frequency_score,
        NTILE(5) OVER (ORDER BY monetary_value) as monetary_score
    FROM customer_rfm
)
SELECT 
    customer_key,
    customer_name,
    recency_days,
    frequency,
    monetary_value,
    CASE 
        WHEN recency_score >= 4 AND frequency_score >= 4 AND monetary_score >= 4 THEN 'Champions'
        WHEN recency_score >= 3 AND frequency_score >= 3 AND monetary_score >= 3 THEN 'Loyal Customers'
        WHEN recency_score >= 4 AND frequency_score <= 2 AND monetary_score >= 3 THEN 'Potential Loyalists'
        WHEN recency_score >= 4 AND frequency_score <= 2 AND monetary_score <= 2 THEN 'New Customers'
        WHEN recency_score <= 2 AND frequency_score >= 3 AND monetary_score >= 3 THEN 'At Risk'
        WHEN recency_score <= 2 AND frequency_score <= 2 AND monetary_score >= 3 THEN 'Cannot Lose Them'
        WHEN recency_score <= 2 AND frequency_score <= 2 AND monetary_score <= 2 THEN 'Lost'
        ELSE 'Others'
    END as customer_segment
FROM rfm_scores
ORDER BY monetary_value DESC;

-- 3. Product performance analysis with hierarchical rollup
-- Product category performance with drill-down capability
SELECT 
    dp.product_category,
    dp.product_subcategory,
    dp.brand,
    COUNT(DISTINCT dp.product_key) as product_count,
    SUM(fs.quantity_sold) as total_quantity,
    SUM(fs.sales_amount) as total_sales,
    SUM(fs.profit_amount) as total_profit,
    ROUND(SUM(fs.profit_amount) / NULLIF(SUM(fs.sales_amount), 0) * 100, 2) as profit_margin_percent,
    RANK() OVER (PARTITION BY dp.product_category ORDER BY SUM(fs.sales_amount) DESC) as brand_rank_in_category
FROM fact_sales fs
INNER JOIN dim_product dp ON fs.product_key = dp.product_key
INNER JOIN dim_date dd ON fs.date_key = dd.date_key
WHERE dd.year = 2023
GROUP BY ROLLUP(dp.product_category, dp.product_subcategory, dp.brand)
HAVING SUM(fs.sales_amount) > 10000
ORDER BY dp.product_category, total_sales DESC;

-- 4. Store performance comparison
-- Store performance with geographical analysis
SELECT 
    ds.region,
    ds.store_name,
    ds.store_type,
    SUM(fs.sales_amount) as total_sales,
    COUNT(DISTINCT fs.sale_id) as transaction_count,
    COUNT(DISTINCT dc.customer_key) as unique_customers,
    ROUND(SUM(fs.sales_amount) / COUNT(DISTINCT fs.sale_id), 2) as avg_transaction_value,
    ROUND(SUM(fs.sales_amount) / COUNT(DISTINCT dc.customer_key), 2) as sales_per_customer,
    
    -- Performance metrics
    PERCENT_RANK() OVER (ORDER BY SUM(fs.sales_amount)) as sales_percentile,
    
    -- Seasonal analysis
    SUM(CASE WHEN dd.quarter = 4 THEN fs.sales_amount ELSE 0 END) as q4_sales,
    ROUND(
        SUM(CASE WHEN dd.quarter = 4 THEN fs.sales_amount ELSE 0 END) / 
        NULLIF(SUM(fs.sales_amount), 0) * 100, 
        2
    ) as q4_sales_percentage
FROM fact_sales fs
INNER JOIN dim_store ds ON fs.store_key = ds.store_key
INNER JOIN dim_customer dc ON fs.customer_key = dc.customer_key
INNER JOIN dim_date dd ON fs.date_key = dd.date_key
WHERE dd.year = 2023
GROUP BY ds.region, ds.store_name, ds.store_type
ORDER BY ds.region, total_sales DESC;

-- === ADVANCED ANALYTICS ===

-- 1. Cohort analysis for customer retention
WITH customer_cohorts AS (
    SELECT 
        dc.customer_key,
        DATE_TRUNC('month', MIN(dd.date_value)) as cohort_month,
        DATE_TRUNC('month', dd.date_value) as purchase_month,
        EXTRACT(YEAR FROM age(DATE_TRUNC('month', dd.date_value), DATE_TRUNC('month', MIN(dd.date_value) OVER (PARTITION BY dc.customer_key)))) * 12 +
        EXTRACT(MONTH FROM age(DATE_TRUNC('month', dd.date_value), DATE_TRUNC('month', MIN(dd.date_value) OVER (PARTITION BY dc.customer_key)))) as month_number
    FROM fact_sales fs
    INNER JOIN dim_customer dc ON fs.customer_key = dc.customer_key
    INNER JOIN dim_date dd ON fs.date_key = dd.date_key
    GROUP BY dc.customer_key, DATE_TRUNC('month', dd.date_value)
),
cohort_data AS (
    SELECT 
        cohort_month,
        month_number,
        COUNT(DISTINCT customer_key) as customers
    FROM customer_cohorts
    GROUP BY cohort_month, month_number
),
cohort_sizes AS (
    SELECT 
        cohort_month,
        COUNT(DISTINCT customer_key) as cohort_size
    FROM customer_cohorts
    WHERE month_number = 0
    GROUP BY cohort_month
)
SELECT 
    cd.cohort_month,
    cs.cohort_size,
    cd.month_number,
    cd.customers,
    ROUND(cd.customers::DECIMAL / cs.cohort_size * 100, 2) as retention_rate
FROM cohort_data cd
INNER JOIN cohort_sizes cs ON cd.cohort_month = cs.cohort_month
WHERE cd.cohort_month >= '2022-01-01'
ORDER BY cd.cohort_month, cd.month_number;

-- 2. Market basket analysis
-- Find frequently bought together products
WITH transaction_products AS (
    SELECT 
        fs.sale_id,
        dp.product_name,
        dp.product_category
    FROM fact_sales fs
    INNER JOIN dim_product dp ON fs.product_key = dp.product_key
    INNER JOIN dim_date dd ON fs.date_key = dd.date_key
    WHERE dd.date_value >= CURRENT_DATE - INTERVAL '6 months'
),
product_pairs AS (
    SELECT 
        tp1.product_name as product_a,
        tp2.product_name as product_b,
        COUNT(*) as pair_count
    FROM transaction_products tp1
    INNER JOIN transaction_products tp2 ON tp1.sale_id = tp2.sale_id
    WHERE tp1.product_name < tp2.product_name -- Avoid duplicates and self-pairs
    GROUP BY tp1.product_name, tp2.product_name
    HAVING COUNT(*) >= 10 -- Minimum support threshold
),
single_product_counts AS (
    SELECT 
        product_name,
        COUNT(DISTINCT sale_id) as product_count
    FROM transaction_products
    GROUP BY product_name
)
SELECT 
    pp.product_a,
    pp.product_b,
    pp.pair_count,
    spa.product_count as count_a,
    spb.product_count as count_b,
    ROUND(pp.pair_count::DECIMAL / spa.product_count * 100, 2) as confidence_a_to_b,
    ROUND(pp.pair_count::DECIMAL / spb.product_count * 100, 2) as confidence_b_to_a,
    ROUND(
        (pp.pair_count::DECIMAL * (SELECT COUNT(DISTINCT sale_id) FROM transaction_products)) /
        (spa.product_count::DECIMAL * spb.product_count), 
        4
    ) as lift
FROM product_pairs pp
INNER JOIN single_product_counts spa ON pp.product_a = spa.product_name
INNER JOIN single_product_counts spb ON pp.product_b = spb.product_name
ORDER BY lift DESC, confidence_a_to_b DESC
LIMIT 20;

-- === DATA QUALITY AND MONITORING ===

-- 1. Data quality checks
CREATE OR REPLACE FUNCTION run_data_quality_checks()
RETURNS TABLE(
    check_name VARCHAR(100),
    table_name VARCHAR(50),
    issue_count BIGINT,
    status VARCHAR(20)
) AS $$
BEGIN
    -- Check for orphaned fact records
    RETURN QUERY
    SELECT 
        'Orphaned Sales Records'::VARCHAR(100),
        'fact_sales'::VARCHAR(50),
        COUNT(*)::BIGINT,
        CASE WHEN COUNT(*) = 0 THEN 'PASS' ELSE 'FAIL' END::VARCHAR(20)
    FROM fact_sales fs
    LEFT JOIN dim_customer dc ON fs.customer_key = dc.customer_key
    WHERE dc.customer_key IS NULL;
    
    -- Check for missing date dimension entries
    RETURN QUERY
    SELECT 
        'Missing Date Entries'::VARCHAR(100),
        'dim_date'::VARCHAR(50),
        COUNT(*)::BIGINT,
        CASE WHEN COUNT(*) = 0 THEN 'PASS' ELSE 'FAIL' END::VARCHAR(20)
    FROM fact_sales fs
    LEFT JOIN dim_date dd ON fs.date_key = dd.date_key
    WHERE dd.date_key IS NULL;
    
    -- Check for negative sales amounts
    RETURN QUERY
    SELECT 
        'Negative Sales Amounts'::VARCHAR(100),
        'fact_sales'::VARCHAR(50),
        COUNT(*)::BIGINT,
        CASE WHEN COUNT(*) = 0 THEN 'PASS' ELSE 'FAIL' END::VARCHAR(20)
    FROM fact_sales
    WHERE sales_amount < 0;
    
    -- Check for future dates
    RETURN QUERY
    SELECT 
        'Future Date Records'::VARCHAR(100),
        'fact_sales'::VARCHAR(50),
        COUNT(*)::BIGINT,
        CASE WHEN COUNT(*) = 0 THEN 'PASS' ELSE 'FAIL' END::VARCHAR(20)
    FROM fact_sales fs
    INNER JOIN dim_date dd ON fs.date_key = dd.date_key
    WHERE dd.date_value > CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

-- 2. ETL monitoring and alerting
CREATE TABLE etl_log (
    log_id SERIAL PRIMARY KEY,
    process_name VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    rows_processed BIGINT,
    status VARCHAR(20) NOT NULL,
    error_message TEXT,
    execution_time_seconds INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ETL health dashboard query
SELECT 
    process_name,
    COUNT(*) as total_runs,
    SUM(CASE WHEN status = 'SUCCESS' THEN 1 ELSE 0 END) as successful_runs,
    ROUND(
        SUM(CASE WHEN status = 'SUCCESS' THEN 1 ELSE 0 END)::DECIMAL / COUNT(*) * 100, 
        2
    ) as success_rate,
    AVG(execution_time_seconds) as avg_execution_time,
    MAX(created_at) as last_run,
    SUM(rows_processed) as total_rows_processed
FROM etl_log
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY process_name
ORDER BY success_rate DESC, avg_execution_time;
```
*Notice: Data warehousing requires careful design of dimensional models, robust ETL processes, and continuous monitoring of data quality and performance.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Poor dimensional design**: Creating overly normalized or denormalized structures
- **Inadequate ETL error handling**: Not planning for data quality issues and failures
- **Missing slowly changing dimensions**: Losing historical context when dimension attributes change
- **Insufficient data quality checks**: Loading bad data that compromises analytical accuracy
- **Over-aggregation**: Pre-aggregating data too much, limiting analytical flexibility
- **Ignoring performance**: Not optimizing for analytical query patterns

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Business intelligence**: executive dashboards, KPI monitoring, trend analysis
- **Financial reporting**: regulatory compliance, management reporting, budgeting
- **Customer analytics**: segmentation, lifetime value, churn prediction
- **Supply chain analytics**: inventory optimization, demand forecasting
- **Marketing analytics**: campaign effectiveness, attribution modeling

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"Design a data warehouse for an e-commerce company"** → Dimensional modeling, ETL design, performance considerations
2. **"Explain star schema vs snowflake schema"** → Trade-offs between query performance and storage
3. **"How do you handle slowly changing dimensions?"** → SCD types and implementation strategies
4. **"What's your approach to data quality in a warehouse?"** → Quality checks, monitoring, remediation
5. **"Design an ETL process for real-time analytics"** → Streaming data, incremental loads, latency requirements

</div>

<div class="concept-section related-concepts">

🔗 **Related concepts**  
`Business Intelligence` · `ETL Processes` · `Dimensional Modeling` · `Data Quality` · `Analytics`

</div>

<div class="tags">
  <span class="tag">data-warehouse</span>
  <span class="tag">olap</span>
  <span class="tag">analytics</span>
  <span class="tag">etl</span>
  <span class="tag">business-intelligence</span>
  <span class="tag">medior</span>
</div>
  <span class="tag">scalability</span>
  <span class="tag">medior</span>
</div>