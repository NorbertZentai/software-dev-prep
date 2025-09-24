# SQL és Adatbázis-kezelés

## Bevezetés

Az SQL (Structured Query Language) egy szabványosított nyelv, amely relációs adatbázisok kezelésére szolgál. Lehetővé teszi az adatok lekérdezését, módosítását, és az adatbázis struktúrájának kezelését.

## Alapfogalmak

### Relációs adatbázis modellje

- **Tábla (Table)**: Adatok tárolásának alapegysége
- **Sor (Row/Record)**: Egy entitás adatai
- **Oszlop (Column/Field)**: Egy adatmező
- **Kulcs (Key)**: Egyedi azonosító
- **Reláció (Relationship)**: Táblák közötti kapcsolat

### Adattípusok

```sql
-- Szöveges típusok
VARCHAR(50)     -- Változó hosszú szöveg
CHAR(10)        -- Fix hosszú szöveg
TEXT            -- Nagy szöveg

-- Numerikus típusok
INT             -- Egész szám
DECIMAL(10,2)   -- Decimális szám (10 digit, 2 tizedeshely)
FLOAT           -- Lebegőpontos szám

-- Dátum és idő
DATE            -- Dátum (YYYY-MM-DD)
TIMESTAMP       -- Dátum és idő
TIME            -- Csak idő

-- Logikai
BOOLEAN         -- Igaz/hamis
```

## DDL (Data Definition Language)

### Tábla létrehozása

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT CHECK (age >= 0 AND age <= 150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tábla módosítása

```sql
-- Oszlop hozzáadása
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- Oszlop módosítása
ALTER TABLE users ALTER COLUMN email SET NOT NULL;

-- Oszlop törlése
ALTER TABLE users DROP COLUMN age;

-- Index létrehozása
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_id ON orders(user_id);
```

## DML (Data Manipulation Language)

### SELECT - Adatok lekérdezése

```sql
-- Alapvető lekérdezés
SELECT first_name, last_name, email
FROM users;

-- Minden oszlop
SELECT * FROM users;

-- Feltételek
SELECT * FROM users
WHERE age > 18 AND email LIKE '%@gmail.com';

-- Rendezés
SELECT * FROM users
ORDER BY last_name ASC, first_name DESC;

-- Korlátozás
SELECT * FROM users
LIMIT 10 OFFSET 20;
```

### Aggregáló függvények

```sql
-- Darabszám
SELECT COUNT(*) FROM users;
SELECT COUNT(DISTINCT email) FROM users;

-- Összegzés
SELECT SUM(amount) FROM orders;
SELECT AVG(age) FROM users;
SELECT MIN(order_date), MAX(order_date) FROM orders;

-- Csoportosítás
SELECT status, COUNT(*) as order_count, AVG(amount) as avg_amount
FROM orders
GROUP BY status
HAVING COUNT(*) > 5;
```

### JOIN műveletek

```sql
-- INNER JOIN
SELECT u.first_name, u.last_name, o.amount, o.order_date
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN
SELECT u.first_name, u.last_name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.first_name, u.last_name;

-- RIGHT JOIN
SELECT u.first_name, o.amount
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;

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
