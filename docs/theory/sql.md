# SQL & Database Theory

---
title: "SQL & Database Theory"
description: "Master SQL fundamentals, advanced queries, performance optimization, and database design principles"
difficulty: intermediate
estimatedMinutes: 180
lastUpdated: "2024-12-19"
version: "1.0"
prerequisites: ["Alapvető programozási ismeretek", "Relációs adatbázis koncepciók"]
learningGoals:
  - "SQL alapok: SELECT, JOIN, WHERE, GROUP BY, ORDER BY"
  - "Tranzakciók és ACID tulajdonságok megértése"
  - "Index optimalizáció és lekérdezés teljesítmény"
  - "Normalizáció és adatbázis tervezés"
  - "Haladó SQL: ablakfüggvények, CTE-k, rekurzív lekérdezések"
  - "NoSQL vs SQL összehasonlítás"
starterLinks:
  - { name: "SQL Fiddle", url: "http://sqlfiddle.com/", icon: "💾" }
  - { name: "DB Fiddle", url: "https://www.db-fiddle.com/", icon: "🔧" }
  - { name: "W3Schools SQL", url: "https://www.w3schools.com/sql/", icon: "📚" }
completion:
  - "Összetett JOIN műveletek megértése és írása"
  - "INDEX stratégiák alkalmazása teljesítmény optimalizálásra"
  - "Tranzakciók és konkurencia kezelés"
  - "Normalizációs formák alkalmazása"
  - "Ablakfüggvények használata adatelemzéshez"
---

## 1. SQL Alapok

### SELECT Lekérdezések

```sql
-- Alapvető SELECT
SELECT first_name, last_name, email
FROM users
WHERE age > 25
ORDER BY last_name;

-- Aggregációs függvények
SELECT 
    COUNT(*) as total_users,
    AVG(age) as average_age,
    MAX(created_at) as latest_signup,
    MIN(age) as youngest_user
FROM users
WHERE status = 'active';

-- GROUP BY és HAVING
SELECT 
    department,
    COUNT(*) as employee_count,
    AVG(salary) as avg_salary
FROM employees
GROUP BY department
HAVING COUNT(*) > 5
ORDER BY avg_salary DESC;
```

### WHERE Feltételek

```sql
-- Többfajta feltétel
SELECT * FROM products
WHERE price BETWEEN 100 AND 500
  AND category IN ('electronics', 'books')
  AND name LIKE '%smart%'
  AND stock_quantity IS NOT NULL;

-- EXISTS és NOT EXISTS
SELECT c.name, c.email
FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o 
    WHERE o.customer_id = c.id 
    AND o.created_at > '2024-01-01'
);

-- CASE kifejezések
SELECT 
    name,
    price,
    CASE 
        WHEN price < 50 THEN 'Cheap'
        WHEN price BETWEEN 50 AND 200 THEN 'Moderate'
        ELSE 'Expensive'
    END as price_category
FROM products;
```

## 2. JOIN Műveletek

### JOIN Típusok

```sql
-- INNER JOIN - csak egyező rekordok
SELECT 
    u.name,
    p.title,
    p.created_at
FROM users u
INNER JOIN posts p ON u.id = p.user_id;

-- LEFT JOIN - minden bal oldali + egyező jobb oldaliak
SELECT 
    u.name,
    COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
GROUP BY u.id, u.name;

-- RIGHT JOIN - minden jobb oldali + egyező bal oldaliak
SELECT 
    c.name as category_name,
    p.name as product_name
FROM products p
RIGHT JOIN categories c ON p.category_id = c.id;

-- FULL OUTER JOIN - minden rekord mindkét oldalról
SELECT 
    COALESCE(u.name, 'Unknown') as user_name,
    COALESCE(p.title, 'No posts') as post_title
FROM users u
FULL OUTER JOIN posts p ON u.id = p.user_id;
```

### Többszörös JOIN-ok

```sql
SELECT 
    u.name as customer_name,
    o.order_date,
    p.name as product_name,
    oi.quantity,
    oi.price
FROM users u
JOIN orders o ON u.id = o.customer_id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE o.status = 'completed'
ORDER BY o.order_date DESC;
```

### Self JOIN

```sql
-- Hierarchikus adatok - alkalmazottak és vezetőik
SELECT 
    e.name as employee,
    m.name as manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;

-- Összes párosítás egy táblán belül
SELECT 
    u1.name as user1,
    u2.name as user2
FROM users u1
CROSS JOIN users u2
WHERE u1.id < u2.id;  -- duplikációk elkerülése
```

## 3. Haladó SQL Funkciók

### Ablakfüggvények (Window Functions)

```sql
-- ROW_NUMBER() és RANK()
SELECT 
    name,
    salary,
    department,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as row_num,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) as salary_rank,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) as dense_rank
FROM employees;

-- LAG és LEAD - előző/következő sor értékei
SELECT 
    name,
    salary,
    LAG(salary) OVER (ORDER BY salary) as prev_salary,
    LEAD(salary) OVER (ORDER BY salary) as next_salary,
    salary - LAG(salary) OVER (ORDER BY salary) as salary_diff
FROM employees;

-- Futó összeg (Running Total)
SELECT 
    order_date,
    amount,
    SUM(amount) OVER (ORDER BY order_date ROWS UNBOUNDED PRECEDING) as running_total,
    AVG(amount) OVER (ORDER BY order_date ROWS 2 PRECEDING) as moving_avg_3
FROM orders
ORDER BY order_date;
```

### Common Table Expressions (CTE)

```sql
-- Egyszerű CTE
WITH high_earners AS (
    SELECT * FROM employees 
    WHERE salary > 80000
)
SELECT 
    department,
    COUNT(*) as high_earner_count,
    AVG(salary) as avg_salary
FROM high_earners
GROUP BY department;

-- Rekurzív CTE - szervezeti hierarchia
WITH RECURSIVE org_hierarchy AS (
    -- Base case: top-level managers
    SELECT id, name, manager_id, 0 as level
    FROM employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive case
    SELECT e.id, e.name, e.manager_id, oh.level + 1
    FROM employees e
    INNER JOIN org_hierarchy oh ON e.manager_id = oh.id
)
SELECT * FROM org_hierarchy ORDER BY level, name;

-- Múltiples CTE-k
WITH 
monthly_sales AS (
    SELECT 
        DATE_TRUNC('month', order_date) as month,
        SUM(amount) as total_sales
    FROM orders
    GROUP BY DATE_TRUNC('month', order_date)
),
avg_monthly AS (
    SELECT AVG(total_sales) as avg_monthly_sales
    FROM monthly_sales
)
SELECT 
    ms.month,
    ms.total_sales,
    am.avg_monthly_sales,
    CASE 
        WHEN ms.total_sales > am.avg_monthly_sales THEN 'Above Average'
        ELSE 'Below Average'
    END as performance
FROM monthly_sales ms
CROSS JOIN avg_monthly am
ORDER BY ms.month;
```

### Sublekérdezések és EXISTS

```sql
-- Korrelált sublekérdezés
SELECT 
    u.name,
    u.email,
    (SELECT COUNT(*) FROM posts p WHERE p.user_id = u.id) as post_count
FROM users u;

-- EXISTS használata
SELECT name FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o 
    WHERE o.customer_id = c.id 
    AND o.total > 1000
);

-- NOT IN vs NOT EXISTS különbség
-- NOT IN probléma NULL értékekkel
SELECT name FROM customers 
WHERE id NOT IN (
    SELECT customer_id FROM orders 
    WHERE order_date > '2024-01-01'
    -- Ha customer_id NULL lehet, ez nem a várt eredményt adja!
);

-- Helyette NOT EXISTS
SELECT name FROM customers c
WHERE NOT EXISTS (
    SELECT 1 FROM orders o 
    WHERE o.customer_id = c.id 
    AND o.order_date > '2024-01-01'
);
```

## 4. Tranzakciók és ACID

### ACID Tulajdonságok

1. **Atomicity (Atomosság)**: Teljes tranzakció vagy semmi
2. **Consistency (Konzisztencia)**: Adatbázis érvényes állapotban marad
3. **Isolation (Izoláció)**: Konkurens tranzakciók nem zavarják egymást
4. **Durability (Tartósság)**: Befejezett tranzakciók változásai megmaradnak

```sql
-- Tranzakció példa - pénzátutalás
BEGIN TRANSACTION;

UPDATE accounts 
SET balance = balance - 1000 
WHERE account_id = 'ACC001';

UPDATE accounts 
SET balance = balance + 1000 
WHERE account_id = 'ACC002';

-- Ellenőrzés
IF @@ERROR <> 0 OR (SELECT balance FROM accounts WHERE account_id = 'ACC001') < 0
BEGIN
    ROLLBACK TRANSACTION;
    PRINT 'Tranzakció visszavonva - nincs elegendő egyenleg';
END
ELSE
BEGIN
    COMMIT TRANSACTION;
    PRINT 'Átutalás sikeres';
END
```

### Isolation Levels

```sql
-- READ UNCOMMITTED - "dirty reads"
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
BEGIN TRANSACTION;
SELECT * FROM orders WHERE status = 'pending';
COMMIT;

-- READ COMMITTED - default legtöbb RDBMS-ben
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- REPEATABLE READ - ugyanaz az olvasás konzisztens
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- SERIALIZABLE - legnagyobb izoláció
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

### Deadlock Kezelése

```sql
-- Deadlock megelőzés - mindig ugyanabban a sorrendben lock-olni
-- Tranzakció 1:
BEGIN TRANSACTION;
UPDATE table_a SET col1 = 'value1' WHERE id = 1;  -- First table A
UPDATE table_b SET col2 = 'value2' WHERE id = 1;  -- Then table B
COMMIT;

-- Tranzakció 2:
BEGIN TRANSACTION;
UPDATE table_a SET col1 = 'value3' WHERE id = 2;  -- Same order: A first
UPDATE table_b SET col2 = 'value4' WHERE id = 2;  -- Then B
COMMIT;
```

## 5. Index Optimalizáció

### Index Típusok

```sql
-- Clustered Index (általában PRIMARY KEY)
CREATE CLUSTERED INDEX IX_Orders_OrderDate 
ON Orders (order_date);

-- Non-Clustered Index
CREATE NONCLUSTERED INDEX IX_Users_Email 
ON Users (email);

-- Összetett Index
CREATE INDEX IX_Orders_Customer_Date 
ON Orders (customer_id, order_date);

-- Covering Index (tartalmazza az összes szükséges oszlopot)
CREATE INDEX IX_Orders_Covering
ON Orders (customer_id, order_date)
INCLUDE (total_amount, status);

-- Partial Index (feltételes)
CREATE INDEX IX_Active_Users
ON Users (last_login_date)
WHERE status = 'active';

-- Funkcionális Index
CREATE INDEX IX_Users_Lower_Email
ON Users (LOWER(email));
```

### Index Használat Optimalizálás

```sql
-- Jó: Index használat
SELECT * FROM users WHERE email = 'john@example.com';

-- Rossz: Funkció az oszlopon
SELECT * FROM users WHERE UPPER(email) = 'JOHN@EXAMPLE.COM';
-- Helyette:
CREATE INDEX IX_Users_Upper_Email ON users (UPPER(email));

-- Jó: Összetett index használat (bal oldali prefix)
SELECT * FROM orders 
WHERE customer_id = 123 AND order_date > '2024-01-01';

-- Rossz: Nem használja az indexet
SELECT * FROM orders 
WHERE order_date > '2024-01-01' AND customer_id = 123;
-- Ha az index: (customer_id, order_date)

```

### Index Maintenance

```sql
-- Index fragmentáció ellenőrzése
SELECT 
    object_name(i.object_id) AS table_name,
    i.name AS index_name,
    avg_fragmentation_in_percent
FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, NULL) ps
INNER JOIN sys.indexes i ON ps.object_id = i.object_id
WHERE avg_fragmentation_in_percent > 10;

-- Index újraépítés
ALTER INDEX IX_Orders_Customer_Date ON Orders REBUILD;

-- Index újraszervezés (kevésbé intenzív)
ALTER INDEX IX_Orders_Customer_Date ON Orders REORGANIZE;
```

## 6. Adatbázis Tervezés és Normalizáció

### Normalizációs Formák

#### 1NF (First Normal Form)
```sql
-- Rossz: többértékű attribútumok
CREATE TABLE employees_bad (
    id INT,
    name VARCHAR(100),
    skills VARCHAR(500)  -- "Java,Python,SQL" - nem 1NF
);

-- Jó: 1NF
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE employee_skills (
    employee_id INT,
    skill VARCHAR(100),
    PRIMARY KEY (employee_id, skill),
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);
```

#### 2NF (Second Normal Form)
```sql
-- Rossz: részleges függőség
CREATE TABLE order_items_bad (
    order_id INT,
    product_id INT,
    product_name VARCHAR(100),  -- csak product_id-tól függ
    quantity INT,
    price DECIMAL(10,2),
    PRIMARY KEY (order_id, product_id)
);

-- Jó: 2NF
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    unit_price DECIMAL(10,2)
);

CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10,2),
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

#### 3NF (Third Normal Form)
```sql
-- Rossz: tranzitív függőség
CREATE TABLE employees_bad (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    department_id INT,
    department_name VARCHAR(100),  -- department_id → department_name
    department_location VARCHAR(100)  -- department_id → department_location
);

-- Jó: 3NF
CREATE TABLE departments (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    location VARCHAR(100)
);

CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);
```

### Denormalizáció és Teljesítmény

```sql
-- Néha a denormalizáció előnyös teljesítmény szempontjából
CREATE TABLE order_summary (
    order_id INT PRIMARY KEY,
    customer_name VARCHAR(100),     -- denormalizált
    total_amount DECIMAL(10,2),     -- kalkulált érték
    item_count INT,                 -- kalkulált érték
    order_date DATE,
    INDEX IX_order_date (order_date),
    INDEX IX_customer_name (customer_name)
);

-- Materializált view alternatíva
CREATE MATERIALIZED VIEW customer_order_stats AS
SELECT 
    c.id as customer_id,
    c.name,
    COUNT(o.id) as total_orders,
    SUM(o.total_amount) as lifetime_value,
    MAX(o.order_date) as last_order_date
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name;
```

## 7. Teljesítmény Optimalizáció

### Query Optimalizáció Stratégiák

```sql
-- 1. Szelektív WHERE feltételek először
-- Jó:
SELECT * FROM orders o
JOIN customers c ON o.customer_id = c.id
WHERE o.order_date > '2024-01-01'  -- szelektív feltétel
  AND c.status = 'premium';

-- 2. EXISTS helyett IN
-- Lassabb:
SELECT * FROM customers
WHERE id IN (
    SELECT customer_id FROM orders 
    WHERE order_date > '2024-01-01'
);

-- Gyorsabb:
SELECT * FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o
    WHERE o.customer_id = c.id 
    AND o.order_date > '2024-01-01'
);

-- 3. UNION ALL vs UNION (ha duplikátumok nem számítanak)
SELECT name FROM customers WHERE region = 'North'
UNION ALL  -- Gyorsabb, nincs duplikátum eltávolítás
SELECT name FROM prospects WHERE region = 'North';
```

### Batch Műveletek

```sql
-- Nagyobb adatok batch-ekben való feldolgozása
DECLARE @batch_size INT = 1000;
DECLARE @rows_affected INT = @batch_size;

WHILE @rows_affected = @batch_size
BEGIN
    UPDATE TOP(@batch_size) old_table 
    SET processed = 1
    WHERE processed = 0;
    
    SET @rows_affected = @@ROWCOUNT;
    
    -- Kis szünet a többi folyamat számára
    WAITFOR DELAY '00:00:01';
END
```

## 8. NoSQL vs SQL Összehasonlítás

### Mikor használjunk SQL-t?

✅ **SQL előnyei:**
- ACID tulajdonságok
- Komplex relációk
- Érett ökoszisztéma
- Standardizált nyelv
- Erős konzisztencia

```sql
-- Komplex üzleti logika SQL-ben
WITH customer_metrics AS (
    SELECT 
        c.id,
        c.name,
        COUNT(o.id) as order_count,
        SUM(o.total) as lifetime_value,
        AVG(oi.quantity) as avg_items_per_order
    FROM customers c
    LEFT JOIN orders o ON c.id = o.customer_id
    LEFT JOIN order_items oi ON o.id = oi.order_id
    WHERE o.created_at >= '2024-01-01'
    GROUP BY c.id, c.name
)
SELECT 
    name,
    CASE 
        WHEN lifetime_value > 5000 THEN 'VIP'
        WHEN order_count > 10 THEN 'Regular'
        ELSE 'New'
    END as customer_segment
FROM customer_metrics
ORDER BY lifetime_value DESC;
```

### Mikor használjunk NoSQL-t?

✅ **NoSQL előnyei:**
- Horizontális skálázódás
- Rugalmas séma
- Nagy teljesítmény egyszerű műveletekhez
- JSON/dokumentum alapú adatok

```javascript
// MongoDB példa - rugalmas séma
db.products.insertOne({
    name: "Smartphone",
    category: "electronics",
    price: 699.99,
    specs: {
        screen: "6.1 inch",
        storage: "128GB",
        camera: ["12MP main", "12MP ultra-wide"]
    },
    reviews: [
        { rating: 5, comment: "Great phone!" },
        { rating: 4, comment: "Good battery life" }
    ],
    tags: ["mobile", "smartphone", "ios"],
    inStock: true
});

// Gyors keresés
db.products.find({ 
    category: "electronics", 
    price: { $lt: 800 },
    inStock: true 
});
```

## 9. Best Practices és Gyakori Hibák

### SQL Best Practices

```sql
-- 1. Explicit JOIN szintaxis
-- Jó:
SELECT u.name, p.title
FROM users u
INNER JOIN posts p ON u.id = p.user_id;

-- Rossz (implicit join):
SELECT u.name, p.title
FROM users u, posts p
WHERE u.id = p.user_id;

-- 2. Aliasok konzisztens használata
SELECT 
    u.name as user_name,
    p.title as post_title,
    p.created_at as publication_date
FROM users u
JOIN posts p ON u.id = p.user_id;

-- 3. NULL értékek explicit kezelése
SELECT 
    name,
    COALESCE(phone, 'N/A') as phone_number,
    CASE 
        WHEN email IS NOT NULL THEN email
        ELSE 'No email provided'
    END as email_address
FROM contacts;
```

### Gyakori Hibák Elkerülése

```sql
-- 1. N+1 query probléma
-- Rossz: minden user-hez külön query
-- Jó: egy JOIN-nal
SELECT 
    u.name,
    COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
GROUP BY u.id, u.name;

-- 2. SELECT * kerülése nagy táblákban
-- Rossz:
SELECT * FROM large_table WHERE condition = 'value';

-- Jó:
SELECT id, name, status FROM large_table WHERE condition = 'value';

-- 3. Proper indexing checking
-- Mindig ellenőrizzük a query plan-t
EXPLAIN (ANALYZE, BUFFERS) 
SELECT * FROM orders 
WHERE customer_id = 123 AND order_date > '2024-01-01';
```

## 10. Gyakorlati Feladatok és Interview Kérdések

### Tipikus Interview Kérdések

**1. Mi a különbség az INNER és LEFT JOIN között?**
```sql
-- INNER JOIN: csak egyező rekordok
SELECT c.name, o.id
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id;

-- LEFT JOIN: minden customer + egyező orders
SELECT c.name, o.id
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id;
```

**2. Hogyan találod meg a második legmagasabb fizetést?**
```sql
-- Módszer 1: Window function
SELECT DISTINCT salary
FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rank
    FROM employees
) ranked
WHERE rank = 2;

-- Módszer 2: Subquery
SELECT MAX(salary) as second_highest
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);
```

**3. Hogyan törölnéd a duplikált rekordokat?**
```sql
-- CTE és ROW_NUMBER használata
WITH duplicates AS (
    SELECT 
        *,
        ROW_NUMBER() OVER (
            PARTITION BY email, name 
            ORDER BY id
        ) as row_num
    FROM users
)
DELETE FROM duplicates WHERE row_num > 1;
```

**4. Írj query-t a futó összeghez (running total)**
```sql
SELECT 
    order_date,
    amount,
    SUM(amount) OVER (
        ORDER BY order_date 
        ROWS UNBOUNDED PRECEDING
    ) as running_total
FROM orders
ORDER BY order_date;
```

### Komplex Gyakorlati Példák

```sql
-- E-commerce analytics példa
WITH monthly_stats AS (
    SELECT 
        DATE_TRUNC('month', o.created_at) as month,
        COUNT(DISTINCT o.customer_id) as unique_customers,
        COUNT(o.id) as total_orders,
        SUM(o.total) as revenue,
        AVG(o.total) as avg_order_value
    FROM orders o
    WHERE o.status = 'completed'
    GROUP BY DATE_TRUNC('month', o.created_at)
),
growth_rates AS (
    SELECT 
        month,
        unique_customers,
        total_orders,
        revenue,
        avg_order_value,
        LAG(revenue) OVER (ORDER BY month) as prev_month_revenue,
        (revenue - LAG(revenue) OVER (ORDER BY month)) / 
        LAG(revenue) OVER (ORDER BY month) * 100 as revenue_growth_pct
    FROM monthly_stats
)
SELECT 
    month,
    unique_customers,
    total_orders,
    revenue,
    ROUND(avg_order_value, 2) as avg_order_value,
    ROUND(revenue_growth_pct, 2) as revenue_growth_percentage
FROM growth_rates
ORDER BY month;
```

Ez a részletes SQL Theory tartalom lefedi az összes fontos területet a alapoktól a haladó technikákig, teljesítmény optimalizálással és gyakorlati példákkal kiegészítve.

-- FULL OUTER JOIN
SELECT u.first_name, o.amount
FROM users u
FULL OUTER JOIN orders o ON u.id = o.user_id;
```

### Allek érdezések (Subqueries)

```sql
-- Skaláris allekérdezés
SELECT first_name, last_name,
    (SELECT COUNT(*) FROM orders o WHERE o.user_id = u.id) as order_count
FROM users u;

-- IN használata
SELECT * FROM users
WHERE id IN (SELECT user_id FROM orders WHERE amount > 1000);

-- EXISTS használata
SELECT * FROM users u
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);

-- Korrelált allekérdezés
SELECT * FROM users u1
WHERE age > (SELECT AVG(age) FROM users u2 WHERE u2.id != u1.id);
```

### INSERT - Adatok beszúrása

```sql
-- Egy sor beszúrása
INSERT INTO users (first_name, last_name, email, age)
VALUES ('John', 'Doe', 'john@example.com', 30);

-- Több sor egyszerre
INSERT INTO users (first_name, last_name, email, age)
VALUES
    ('Jane', 'Smith', 'jane@example.com', 25),
    ('Bob', 'Johnson', 'bob@example.com', 35);

-- Lekérdezés eredményének beszúrása
INSERT INTO user_backup (first_name, last_name, email)
SELECT first_name, last_name, email
FROM users
WHERE created_at < '2023-01-01';
```

### UPDATE - Adatok módosítása

```sql
-- Egyszerű frissítés
UPDATE users
SET email = 'newemail@example.com'
WHERE id = 1;

-- Több oszlop frissítése
UPDATE users
SET first_name = 'Johnny', age = 31
WHERE id = 1;

-- Feltételes frissítés
UPDATE orders
SET status = 'completed'
WHERE status = 'pending' AND order_date < CURRENT_DATE - INTERVAL '7 days';
```

### DELETE - Adatok törlése

```sql
-- Konkrét rekord törlése
DELETE FROM users WHERE id = 1;

-- Feltételes törlés
DELETE FROM orders WHERE status = 'cancelled';

-- Kapcsolódó táblák alapján törlés
DELETE FROM users
WHERE id NOT IN (SELECT DISTINCT user_id FROM orders WHERE user_id IS NOT NULL);
```

## Window Functions

```sql
-- Row number
SELECT
    first_name,
    last_name,
    ROW_NUMBER() OVER (ORDER BY age DESC) as row_num
FROM users;

-- Rank
SELECT
    first_name,
    last_name,
    age,
    RANK() OVER (ORDER BY age DESC) as age_rank
FROM users;

-- Cumulative sum
SELECT
    order_date,
    amount,
    SUM(amount) OVER (ORDER BY order_date) as running_total
FROM orders;

-- Partition by
SELECT
    user_id,
    order_date,
    amount,
    AVG(amount) OVER (PARTITION BY user_id) as user_avg_amount
FROM orders;
```

## Indexek és teljesítmény

### Index típusok

```sql
-- B-tree index (alapértelmezett)
CREATE INDEX idx_users_last_name ON users(last_name);

-- Composite index
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- Partial index
CREATE INDEX idx_active_users ON users(email) WHERE active = true;

-- Unique index
CREATE UNIQUE INDEX idx_users_email ON users(email);
```

### Query optimization

```sql
-- EXPLAIN használata
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'john@example.com';

-- Index scan vs Sequential scan
-- Jó: index scan
SELECT * FROM users WHERE id = 123;

-- Rossz: sequential scan
SELECT * FROM users WHERE UPPER(email) = 'JOHN@EXAMPLE.COM';

-- Jó: functional index használata
CREATE INDEX idx_users_email_upper ON users(UPPER(email));
```

## Normalizáció

### 1NF (First Normal Form)
- Minden oszlop atomikus értéket tartalmaz
- Nincs ismétlődő csoport

### 2NF (Second Normal Form)
- 1NF + minden nem-kulcs attribútum teljesen függ a kulcstól

### 3NF (Third Normal Form)
- 2NF + nincs tranzitív függőség

```sql
-- Nem normalizált tábla
CREATE TABLE orders_bad (
    id INT PRIMARY KEY,
    customer_name VARCHAR(100),
    customer_email VARCHAR(100),
    customer_phone VARCHAR(20),
    product_names TEXT,  -- Több termék neve vesszővel elválasztva
    total_amount DECIMAL(10,2)
);

-- Normalizált táblák
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20)
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10,2)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    product_id INT REFERENCES products(id),
    quantity INT,
    price DECIMAL(10,2)
);
```

## Tranzakciók és ACID

### ACID tulajdonságok
- **Atomicity**: Minden művelet vagy sikerül, vagy egyik sem
- **Consistency**: Az adatbázis konzisztens marad
- **Isolation**: A tranzakciók elkülönülten futnak
- **Durability**: A commit után az adatok tartósak

### Tranzakció kezelés

```sql
-- Alapvető tranzakció
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;

-- Rollback hiba esetén
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
-- Hiba esetén
ROLLBACK;

-- Savepoint használata
BEGIN;
UPDATE accounts SET balance = balance - 50 WHERE id = 1;
SAVEPOINT sp1;
UPDATE accounts SET balance = balance - 50 WHERE id = 1;
-- Hiba esetén csak az sp1 utáni részre rollback
ROLLBACK TO sp1;
COMMIT;
```

### Isolation Levels

```sql
-- READ UNCOMMITTED
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

-- READ COMMITTED (PostgreSQL default)
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- REPEATABLE READ
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- SERIALIZABLE
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

## Fejlett témák

### Common Table Expressions (CTE)

```sql
-- Egyszerű CTE
WITH young_users AS (
    SELECT * FROM users WHERE age < 30
)
SELECT first_name, last_name FROM young_users;

-- Rekurzív CTE
WITH RECURSIVE employee_hierarchy AS (
    -- Base case
    SELECT id, first_name, last_name, manager_id, 1 as level
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive case
    SELECT e.id, e.first_name, e.last_name, e.manager_id, eh.level + 1
    FROM employees e
    JOIN employee_hierarchy eh ON e.manager_id = eh.id
)
SELECT * FROM employee_hierarchy ORDER BY level, last_name;
```

### Stored Procedures és Functions

```sql
-- Function létrehozása
CREATE OR REPLACE FUNCTION get_user_order_count(user_id_param INT)
RETURNS INT AS $$
BEGIN
    RETURN (SELECT COUNT(*) FROM orders WHERE user_id = user_id_param);
END;
$$ LANGUAGE plpgsql;

-- Használat
SELECT first_name, last_name, get_user_order_count(id) as order_count
FROM users;

-- Stored Procedure
CREATE OR REPLACE FUNCTION transfer_money(
    from_account INT,
    to_account INT,
    amount DECIMAL(10,2)
) RETURNS VOID AS $$
BEGIN
    UPDATE accounts SET balance = balance - amount WHERE id = from_account;
    UPDATE accounts SET balance = balance + amount WHERE id = to_account;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Account not found';
    END IF;
END;
$$ LANGUAGE plpgsql;
```

## Gyakori hibák és megoldások

### 1. N+1 Query probléma

```sql
-- Rossz: N+1 query
-- 1 query a felhasználókért + N query a rendelésekért
SELECT * FROM users;  -- 1 query
-- Majd minden userhez külön:
SELECT * FROM orders WHERE user_id = ?;  -- N query

-- Jó: JOIN használata
SELECT u.*, o.*
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;  -- 1 query
```

### 2. Missing WHERE clauses

```sql
-- Veszélyes: minden rekordot frissít
UPDATE users SET active = false;  -- ROSSZ!

-- Biztonságos: konkrét feltétellel
UPDATE users SET active = false WHERE last_login < '2022-01-01';
```

### 3. Implicit Type Conversion

```sql
-- Rossz: implicit konverzió, nem használja az indexet
SELECT * FROM users WHERE id = '123';

-- Jó: explicit típus
SELECT * FROM users WHERE id = 123;
```

## Best Practices

1. **Használj indexeket** a gyakran keresett oszlopokon
2. **Kerüld a SELECT *** használatát nagy tábláknál
3. **Használj prepared statement-eket** SQL injection ellen
4. **Normalizáld az adatokat**, de ne túlzásba
5. **Használj meaningful neveket** táblákra és oszlopokra
6. **Backup-old rendszeresen** az adatbázist
7. **Monitorozd a lassú query-ket**
8. **Használj constraint-eket** az adatintegritásért

## Következő lépések

- [SQL gyakorlatok](../exercises/sql/)
- [Adatbázis tervezés](./arch.md)
- [SQL kvíz](../quiz/sql.md)

---

*Ez az anyag az SQL és adatbázis-kezelés alapjait tárgyalja. A gyakorlati alkalmazásért lásd a kapcsolódó fejezeteket!*
