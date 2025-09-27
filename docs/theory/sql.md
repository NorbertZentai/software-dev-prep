# SQL & Adatbázis

## Rövid összefoglaló

A relációs adatbázisok és SQL (Structured Query Language) az adattárolás és -lekérdezés alapját képezik a modern alkalmazásokban. A SQL lehetővé teszi adatok létrehozását, olvasását, frissítését és törlését (CRUD), valamint komplex lekérdezések és elemzések végrehajtását. Fő fogalmak: táblák, kapcsolatok, indexek, tranzakciók és normalizáció. Buktatói közé tartozik az SQL injection, N+1 query problem és a rossz indexelés.

## Fogalmak

### CRUD {#crud}
Create, Read, Update, Delete - az alapvető adatbázis műveletek négy típusa.

**Példa:**
```sql
-- CREATE (INSERT)
INSERT INTO users (name, email, age) 
VALUES ('John Doe', 'john@example.com', 30);

-- READ (SELECT)
SELECT id, name, email FROM users 
WHERE age > 25 
ORDER BY name;

-- UPDATE
UPDATE users 
SET email = 'newemail@example.com' 
WHERE id = 1;

-- DELETE
DELETE FROM users 
WHERE last_login < '2023-01-01';
```

Magyarázat: A CRUD műveletek alkotják az adatbázis interakciók alapját minden alkalmazásban.

### DDL/DML {#ddl-dml}
Data Definition Language (struktúra) és Data Manipulation Language (adatok) megkülönböztetés.

**Példa:**
```sql
-- DDL - Data Definition Language (struktúra meghatározás)
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE INDEX idx_products_category ON products(category_id);

ALTER TABLE products ADD COLUMN description TEXT;

DROP TABLE old_products;

-- DML - Data Manipulation Language (adat manipuláció)
INSERT INTO products (name, price, category_id) 
VALUES ('Smartphone', 699.99, 1);

SELECT p.name, p.price, c.name as category_name
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.price > 500;

UPDATE products 
SET price = price * 0.9 
WHERE category_id = 2;

DELETE FROM products 
WHERE price < 10;
```

Magyarázat: DDL az adatbázis struktúráját definiálja, DML az adatokkal végzett műveleteket.

### JOIN-ok (INNER/LEFT/RIGHT) {#join-ok-inner-left-right}
Táblák közötti kapcsolatok létrehozására szolgáló műveletek.

**Példa:**
```sql
-- INNER JOIN - csak egyező rekordok
SELECT 
    u.name as customer_name,
    o.order_date,
    o.total_amount
FROM users u
INNER JOIN orders o ON u.id = o.customer_id;

-- LEFT JOIN - minden bal oldali + egyező jobb oldaliak
SELECT 
    u.name as customer_name,
    COUNT(o.id) as order_count,
    COALESCE(SUM(o.total_amount), 0) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.customer_id
GROUP BY u.id, u.name;

-- RIGHT JOIN - minden jobb oldali + egyező bal oldaliak
SELECT 
    p.name as product_name,
    COALESCE(oi.quantity, 0) as total_sold
FROM order_items oi
RIGHT JOIN products p ON oi.product_id = p.id;

-- FULL OUTER JOIN - minden rekord mindkét oldalról
SELECT 
    COALESCE(u.name, 'Unknown Customer') as customer,
    COALESCE(o.order_date, 'No Orders') as last_order
FROM users u
FULL OUTER JOIN orders o ON u.id = o.customer_id;

-- Self JOIN - hierarchikus adatok
SELECT 
    e.name as employee,
    m.name as manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;

-- Multiple JOIN example
SELECT 
    u.name as customer_name,
    p.name as product_name,
    oi.quantity,
    oi.unit_price,
    o.order_date
FROM users u
JOIN orders o ON u.id = o.customer_id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE o.order_date >= '2024-01-01'
ORDER BY o.order_date DESC;
```

Magyarázat: A JOIN típusok különböző módon kombinálják a táblák adatait - INNER csak egyező, LEFT/RIGHT minden rekord az egyik oldalról.

### Indexek {#indexek}
Adatbázis teljesítmény optimalizálására szolgáló struktúrák. Gyorsítják a keresést, de lassítják a módosítást.

**Példa:**
```sql
-- Simple index létrehozás
CREATE INDEX idx_users_email ON users(email);

-- Composite (összetett) index
CREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date);

-- Unique index
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);

-- Partial index (feltételes)
CREATE INDEX idx_active_users ON users(last_login_date) 
WHERE active = true;

-- Functional index
CREATE INDEX idx_users_lower_email ON users(LOWER(email));

-- Covering index (includes oszlopokkal)
CREATE INDEX idx_orders_covering 
ON orders(customer_id, order_date) 
INCLUDE (total_amount, status);

-- Index használat ellenőrzése
EXPLAIN (ANALYZE, BUFFERS) 
SELECT * FROM users WHERE email = 'john@example.com';

-- Index statisztikák
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan as index_scans,
    idx_tup_read as tuples_read,
    idx_tup_fetch as tuples_fetched
FROM pg_stat_user_indexes 
WHERE idx_scan > 0
ORDER BY idx_scan DESC;

-- Unused index detection
SELECT 
    schemaname,
    tablename,
    indexname,
    pg_size_pretty(pg_relation_size(indexrelid)) as index_size
FROM pg_stat_user_indexes 
WHERE idx_scan = 0 
AND schemaname NOT IN ('pg_catalog', 'information_schema');
```

Magyarázat: Indexek B-tree struktúrában tárolják a rendezett adatokat, O(log n) keresési komplexitást biztosítva.

### Normalizálás {#normalizalas}
Adatredundancia csökkentése és adatintegritás javítása normalizációs formákkal.

**Példa:**
```sql
-- 0NF (Nem normalizált) - HIBÁS
CREATE TABLE orders_bad (
    id INT PRIMARY KEY,
    customer_name VARCHAR(100),
    customer_email VARCHAR(100),
    customer_phone VARCHAR(20),
    product_names TEXT, -- "Laptop,Mouse,Keyboard"
    product_prices TEXT, -- "999.99,29.99,79.99"
    order_total DECIMAL(10,2)
);

-- 1NF (First Normal Form) - Atomikus értékek
CREATE TABLE orders_1nf (
    id INT PRIMARY KEY,
    customer_name VARCHAR(100),
    customer_email VARCHAR(100),
    customer_phone VARCHAR(20),
    product_name VARCHAR(100),
    product_price DECIMAL(10,2),
    quantity INT
);

-- 2NF (Second Normal Form) - Eliminálja részleges függőséget
CREATE TABLE customers (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20)
);

CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10,2),
    category VARCHAR(50)
);

CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT,
    order_date TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    unit_price DECIMAL(10,2),
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 3NF (Third Normal Form) - Eliminálja tranzitív függőséget
CREATE TABLE categories (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50)
);

ALTER TABLE products 
DROP COLUMN category,
ADD COLUMN category_id INT,
ADD FOREIGN KEY (category_id) REFERENCES categories(id);

-- Denormalizáció példa teljesítményért
CREATE TABLE order_summary (
    order_id INT PRIMARY KEY,
    customer_id INT,
    customer_name VARCHAR(100), -- denormalizált
    order_date TIMESTAMP,
    total_amount DECIMAL(10,2), -- kalkulált
    item_count INT, -- kalkulált
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);
```

Magyarázat: A normalizáció csökkenti a redundanciát, de sometimes denormalizáció szükséges a teljesítmény érdekében.

### Tranzakciók {#tranzakciok}
Atomikus műveletcsoportok, amelyek vagy teljesen sikeresek, vagy teljesen visszavonódnak.

**Példa:**
```sql
-- Alapvető tranzakció
BEGIN TRANSACTION;

UPDATE accounts 
SET balance = balance - 1000 
WHERE account_id = 'ACC001';

UPDATE accounts 
SET balance = balance + 1000 
WHERE account_id = 'ACC002';

-- Ellenőrzés negatív egyenlegre
SELECT balance FROM accounts WHERE account_id = 'ACC001';

-- Ha minden OK
COMMIT;

-- Ha hiba van
-- ROLLBACK;

-- Savepoint használat
BEGIN TRANSACTION;

INSERT INTO orders (customer_id, order_date) VALUES (1, NOW());

SAVEPOINT order_created;

INSERT INTO order_items (order_id, product_id, quantity) 
VALUES (LAST_INSERT_ID(), 1, 2);

-- Ha hiba az order_items-ben, csak ezt vonjuk vissza
-- ROLLBACK TO SAVEPOINT order_created;

COMMIT;

-- Komplex üzleti tranzakció
CREATE OR REPLACE FUNCTION process_order(
    p_customer_id INT,
    p_product_id INT,
    p_quantity INT
) RETURNS INT AS $$
DECLARE
    v_order_id INT;
    v_available_stock INT;
    v_unit_price DECIMAL(10,2);
BEGIN
    -- Tranzakció indítás
    
    -- Készlet ellenőrzés lockkal
    SELECT stock_quantity, price 
    INTO v_available_stock, v_unit_price
    FROM products 
    WHERE id = p_product_id 
    FOR UPDATE; -- Pessimistic lock
    
    IF v_available_stock < p_quantity THEN
        RAISE EXCEPTION 'Insufficient stock. Available: %, Requested: %', 
                        v_available_stock, p_quantity;
    END IF;
    
    -- Rendelés létrehozás
    INSERT INTO orders (customer_id, order_date, status)
    VALUES (p_customer_id, NOW(), 'pending')
    RETURNING id INTO v_order_id;
    
    -- Rendelés tétel hozzáadás
    INSERT INTO order_items (order_id, product_id, quantity, unit_price)
    VALUES (v_order_id, p_product_id, p_quantity, v_unit_price);
    
    -- Készlet csökkentés
    UPDATE products 
    SET stock_quantity = stock_quantity - p_quantity
    WHERE id = p_product_id;
    
    -- Rendelés állapot frissítés
    UPDATE orders 
    SET status = 'confirmed', total_amount = p_quantity * v_unit_price
    WHERE id = v_order_id;
    
    RETURN v_order_id;
END;
$$ LANGUAGE plpgsql;

-- Használat
SELECT process_order(1, 5, 3);
```

Magyarázat: Tranzakciók biztosítják az ACID tulajdonságokat és az adatintegritást többlépéses műveleteknél.

### Izolációs szintek {#izolacios-szintek}
Konkurens tranzakciók közötti interferencia szabályozása négy szinten.

**Példa:**
```sql
-- READ UNCOMMITTED - legalacsonyabb izoláció
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
BEGIN;
SELECT * FROM accounts; -- Láthatja a még nem commit-olt változásokat (dirty read)
COMMIT;

-- READ COMMITTED - alapértelmezett a legtöbb RDBMS-ben
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
BEGIN;
SELECT balance FROM accounts WHERE id = 1; -- 1000
-- Közben másik tranzakció módosítja 1000-ről 1500-ra és commit-ol
SELECT balance FROM accounts WHERE id = 1; -- 1500 (non-repeatable read)
COMMIT;

-- REPEATABLE READ - ugyanaz az olvasás konzisztens
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
BEGIN;
SELECT balance FROM accounts WHERE id = 1; -- 1000
-- Közben másik tranzakció módosítja és commit-ol
SELECT balance FROM accounts WHERE id = 1; -- Még mindig 1000 (repeatable)
COMMIT;

-- SERIALIZABLE - legmagasabb izoláció
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN;
SELECT COUNT(*) FROM accounts WHERE balance > 1000; -- 5
-- Ha másik tranzakció új rekordot ad hozzá balance > 1000 feltétellel
SELECT COUNT(*) FROM accounts WHERE balance > 1000; -- Még mindig 5 (phantom read protection)
COMMIT;

-- Lock demonstration
BEGIN;
SELECT * FROM accounts WHERE id = 1 FOR UPDATE; -- Exclusive lock
-- Másik session várakozik a lock feloldására
UPDATE accounts SET balance = balance + 100 WHERE id = 1;
COMMIT; -- Lock feloldás

-- Shared lock
BEGIN;
SELECT * FROM accounts WHERE id = 1 FOR SHARE; -- Shared lock
-- Más session olvashat, de nem módosíthat
COMMIT;
```

Magyarázat: Magasabb izolációs szint nagyobb konzisztenciát, de kisebb konkurenciát és teljesítményt eredményez.

### ACID {#acid}
A tranzakciók négy alapvető tulajdonsága: Atomicity, Consistency, Isolation, Durability.

**Példa:**
```sql
-- Atomicity példa - bankátutalás
CREATE OR REPLACE FUNCTION transfer_money(
    from_account VARCHAR(20),
    to_account VARCHAR(20), 
    amount DECIMAL(10,2)
) RETURNS VOID AS $$
BEGIN
    -- Minden művelet egy atomikus egységben
    BEGIN
        -- Forrás számla terhelése
        UPDATE accounts 
        SET balance = balance - amount 
        WHERE account_number = from_account;
        
        IF NOT FOUND OR (SELECT balance FROM accounts WHERE account_number = from_account) < 0 THEN
            RAISE EXCEPTION 'Insufficient funds or account not found';
        END IF;
        
        -- Cél számla jóváírás
        UPDATE accounts 
        SET balance = balance + amount 
        WHERE account_number = to_account;
        
        IF NOT FOUND THEN
            RAISE EXCEPTION 'Target account not found';
        END IF;
        
        -- Tranzakciós log
        INSERT INTO transaction_log (from_account, to_account, amount, transaction_date)
        VALUES (from_account, to_account, amount, NOW());
        
        -- Ha minden OK, implicit COMMIT
        RAISE NOTICE 'Transfer successful: % from % to %', amount, from_account, to_account;
        
    EXCEPTION
        WHEN OTHERS THEN
            -- Hiba esetén minden visszavonás (Atomicity)
            RAISE EXCEPTION 'Transfer failed: %', SQLERRM;
    END;
END;
$$ LANGUAGE plpgsql;

-- Consistency példa - constraints és triggers
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    account_number VARCHAR(20) UNIQUE NOT NULL,
    balance DECIMAL(12,2) NOT NULL DEFAULT 0,
    CONSTRAINT positive_balance CHECK (balance >= 0), -- Consistency constraint
    created_at TIMESTAMP DEFAULT NOW()
);

-- Trigger a konzisztencia biztosításához
CREATE OR REPLACE FUNCTION validate_account_balance()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.balance < 0 THEN
        RAISE EXCEPTION 'Account balance cannot be negative: %', NEW.balance;
    END IF;
    
    IF NEW.balance > 1000000 THEN
        -- Automatikus VIP státusz
        NEW.account_type := 'VIP';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER account_balance_check
BEFORE INSERT OR UPDATE ON accounts
FOR EACH ROW
EXECUTE FUNCTION validate_account_balance();

-- Durability példa - WAL és checkpoint
-- PostgreSQL automatic WAL (Write-Ahead Logging)
SHOW wal_level; -- Ellenőrizzük a WAL konfigurációt
SELECT pg_current_wal_lsn(); -- Current WAL position

-- Manual checkpoint force (Durability biztosítás)
CHECKPOINT;

-- Backup strategy a Durability-hez
-- pg_dump for logical backup
-- pg_basebackup for physical backup
-- Point-in-time recovery (PITR) setup
```

Magyarázat: Az ACID tulajdonságok együtt biztosítják a tranzakciós rendszerek megbízhatóságát és konzisztenciáját.

### Explain plan {#explain-plan}
Lekérdezés végrehajtási tervének elemzése teljesítmény optimalizáláshoz.

**Példa:**
```sql
-- Alapvető EXPLAIN
EXPLAIN 
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.customer_id
GROUP BY u.id, u.name;

-- Részletes elemzés
EXPLAIN (ANALYZE, BUFFERS, VERBOSE)
SELECT u.name, o.total_amount
FROM users u
JOIN orders o ON u.id = o.customer_id
WHERE o.order_date >= '2024-01-01'
ORDER BY o.total_amount DESC
LIMIT 10;

/*
Explain plan értelmezése:
- Seq Scan: Teljes tábla scan (lassú)
- Index Scan: Index használat (gyors)
- Hash Join: Hash-alapú join
- Nested Loop: Egymásba ágyazott ciklus join
- Sort: Rendezési művelet
- Limit: Eredmény korlátozás
*/

-- Index hatékonyságának tesztelése
-- Lassú query index nélkül
EXPLAIN ANALYZE
SELECT * FROM orders WHERE customer_id = 123;

-- Index létrehozás
CREATE INDEX idx_orders_customer_id ON orders(customer_id);

-- Gyors query index-szel
EXPLAIN ANALYZE
SELECT * FROM orders WHERE customer_id = 123;

-- Composite index optimalizálás
CREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date);

EXPLAIN ANALYZE
SELECT * FROM orders 
WHERE customer_id = 123 AND order_date >= '2024-01-01';

-- Query plan cache és statistics
ANALYZE orders; -- Frissítjük a tábla statisztikáit

-- Problémás query pattern azonosítás
-- Seq Scan nagy táblán
EXPLAIN ANALYZE SELECT * FROM big_table WHERE non_indexed_column = 'value';

-- Megoldás: index létrehozás
CREATE INDEX idx_big_table_column ON big_table(non_indexed_column);

-- Hash join vs Nested Loop
-- Hash Join: jó nagy táblákhoz
-- Nested Loop: jó kis táblákhoz

-- Query cost elemzés
EXPLAIN (ANALYZE, BUFFERS)
SELECT u.name, COUNT(o.id)
FROM users u
LEFT JOIN orders o ON u.id = o.customer_id
WHERE u.created_at >= '2024-01-01'
GROUP BY u.id, u.name
HAVING COUNT(o.id) > 5;
```

Magyarázat: Az explain plan megmutatja a query optimizer döntéseit és segít azonosítani a teljesítmény bottleneck-eket.

## Gyakori hibák

### SELECT * használata
Nagy táblákból minden oszlop lekérése felesleges network és memory overhead.

**Hibás példa:**
```sql
-- HIBÁS - felesleges adatforgalom
SELECT * FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.price > 100;

-- Lehet, hogy csak a nevet és árat kell
```

**Helyes megoldás:**
```sql
-- HELYES - csak szükséges oszlopok
SELECT p.name, p.price, c.name as category_name
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.price > 100;
```

### N+1 query
Egy lekérdezés N további lekérdezést generál, exponenciálisan lassítva a rendszert.

**Hibás példa:**
```sql
-- HIBÁS - N+1 query pattern
-- 1. Query: felhasználók lekérése
SELECT * FROM users;

-- 2. N Query: minden userhez külön query (application code-ban)
-- SELECT COUNT(*) FROM orders WHERE customer_id = 1;
-- SELECT COUNT(*) FROM orders WHERE customer_id = 2;
-- SELECT COUNT(*) FROM orders WHERE customer_id = 3;
-- ... N query
```

**Helyes megoldás:**
```sql
-- HELYES - egyetlen optimalizált query
SELECT 
    u.id,
    u.name,
    u.email,
    COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.customer_id
GROUP BY u.id, u.name, u.email;
```

### SQL Injection vulnerabilitas
Felhasználói input közvetlen beillesztése SQL query-be biztonsági rést nyit.

**Hibás példa:**
```sql
-- VESZÉLYES - SQL injection lehetőség
-- Application code: "SELECT * FROM users WHERE email = '" + userInput + "';"
-- Ha userInput = "test@example.com'; DROP TABLE users; --"
-- Eredmény: SELECT * FROM users WHERE email = 'test@example.com'; DROP TABLE users; --';
```

**Helyes megoldás:**
```java
// BIZTONSÁGOS - Prepared statement használata
String sql = "SELECT * FROM users WHERE email = ?";
PreparedStatement stmt = connection.prepareStatement(sql);
stmt.setString(1, userEmail);
ResultSet rs = stmt.executeQuery();
```

## Interjúkérdések

- **Mi a különbség az INNER és LEFT JOIN között?** — *INNER JOIN csak egyező rekordokat ad vissza mindkét táblából, LEFT JOIN minden rekordot a bal oldali táblából plus egyezőket a jobb oldaliból.*

- **Mi az ACID?** — *Atomicity (atomosság), Consistency (konzisztencia), Isolation (elkülönítés), Durability (tartósság) - tranzakciós tulajdonságok.*

- **Hogyan optimalizálnál egy lassú query-t?** — *EXPLAIN ANALYZE használata, megfelelő indexek, WHERE feltételek optimalizálása, JOIN sorrendek.*

- **Mi a különbség a clustered és non-clustered index között?** — *Clustered index meghatározza a tábla fizikai sorrendjét (általában PK), non-clustered külön struktúra.*

- **Hogyan kezelnéd a deadlock-ot?** — *Timeout beállítás, konzisztens lock sorrend, rövidebb tranzakciók, retry mechanizmus.*

- **Mi a normalizáció célja?** — *Redundancia csökkentése, update anomáliák eliminálása, adatintegritás javítása.*

- **Mikor használnál denormalizációt?** — *Read-heavy workload, performance kritikus alkalmazások, data warehouse scenarios.*

- **Mi az ablakfüggvény (window function)?** — *Aggregációs számítások sorok csoportjain anélkül, hogy GROUP BY-t használnánk.*

- **Hogyan működik a tranzakciós izolációs szintek?** — *READ UNCOMMITTED < READ COMMITTED < REPEATABLE READ < SERIALIZABLE - növekvő konzisztencia, csökkenő concurrency.*

- **Mi a különbség az EXISTS és IN között?** — *EXISTS korrelált subquery, gyakran gyorsabb; IN érték lista vagy subquery, problémás NULL értékekkel.*

- **Hogyan implementálnál pagination-t?** — *LIMIT és OFFSET, vagy cursor-based pagination nagy dataset-ekhez.*

- **Mi a stored procedure előnyei és hátrányai?** — *Előnyök: teljesítmény, biztonság, központosított logika. Hátrányok: vendor lock-in, nehéz verziókezelés, limited debugging.*

## Gyakorlati feladat

Tervezz és implementálj egy e-commerce adatbázist:

1. **Entitások tervezése**: Users, Products, Categories, Orders, Order_Items
2. **Normalizáció**: 3NF-ig normalizáld a struktúrát
3. **Indexek**: Optimalizáld a gyakori lekérdezésekhez
4. **Lekérdezések**: Komplex JOIN-ok, aggregációk, window functions
5. **Teljesítmény**: EXPLAIN ANALYZE használata optimalizáláshoz
6. **Tranzakciók**: Rendelés feldolgozás atomikus tranzakcióval

Követelmények:
- Foreign key constraints
- Check constraints az adatintegritáshoz
- Triggerek az audit log-hoz
- Views a gyakori lekérdezésekhez
- Stored procedures az üzleti logikához

*Kapcsolódó gyakorlati feladat: [SQL Gyakorlatok](/exercises/sql/01-joins)*

## Kapcsolódó témák

- [Java Alapok](/theory/java) - JDBC és adatbázis kapcsolat
- [Spring Framework](/theory/spring) - Spring Data JPA és tranzakciókezelés
- [Szoftver Architektúra](/theory/arch) - Database design patterns és scaling
- [Tesztelés](/theory/testing) - Database testing és TestContainers

## További olvasmányok

- [PostgreSQL Documentation](https://www.postgresql.org/docs/) - Comprehensive PostgreSQL guide
- [MySQL Reference Manual](https://dev.mysql.com/doc/) - MySQL hivatalos dokumentáció
- [SQL Performance Explained](https://sql-performance-explained.com/) - Markus Winand index optimalizációs könyve
- [Database Design for Mere Mortals](https://www.oreilly.com/library/view/database-design-for/9780321884497/) - Adatbázis tervezési alapok
- [High Performance MySQL](https://www.oreilly.com/library/view/high-performance-mysql/9781449332471/) - Baron Schwartz teljesítmény optimalizációs könyve
- [SQL Antipatterns](https://pragprog.com/titles/bksqla/sql-antipatterns/) - Bill Karwin gyakori hibák könyve
- [Use The Index, Luke](https://use-the-index-luke.com/) - SQL indexing and tuning tutorial
