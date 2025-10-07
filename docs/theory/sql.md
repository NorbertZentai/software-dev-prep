# SQL & Adatbázis

## Rövid összefoglaló

A relációs adatbázisok és SQL (Structured Query Language) az adattárolás és -lekérdezés alapját képezik a modern alkalmazásokban. A SQL lehetővé teszi adatok létrehozását, olvasását, frissítését és törlését (CRUD), valamint komplex lekérdezések és elemzések végrehajtását. Fő fogalmak: táblák, kapcsolatok, indexek, tranzakciók és normalizáció. Buktatói közé tartozik az SQL injection, N+1 query problem és a rossz indexelés.

## Fogalmak

### CRUD {#crud}

<div class="concept-section mental-model" data-filter="queries junior">

📋 **Fogalom meghatározása**  
*A CRUD a négy alapvető adatbázis-művelet rövidítése: **Create** (INSERT - új rekord létrehozása), **Read** (SELECT - adatok lekérdezése), **Update** (UPDATE - meglévő adatok módosítása), **Delete** (DELETE - rekordok törlése). Ezek alkotják a perzisztens adatok kezelésének alapját minden relációs adatbázis-rendszerben, és a REST API-k HTTP metódusainak (POST, GET, PUT/PATCH, DELETE) megfeleltethetők.*

</div>

<div class="concept-section why-important" data-filter="queries junior">

💡 **Miért számít?**
- **Alapvető műveletek**: minden adatbázis alkalmazás ezekre épül
- **RESTful API mapping**: POST→Create, GET→Read, PUT→Update, DELETE→Delete
- **Tranzakciós biztonság**: mindegyik művelet atomikus kell legyen
- **Performance impact**: különböző műveletek különböző optimalizálást igényelnek

</div>

<div class="runnable-model" data-filter="queries junior">

**Runnable mental model**
```sql
-- CREATE (INSERT) - új adat létrehozása
INSERT INTO users (name, email, age) 
VALUES ('John Doe', 'john@example.com', 30);

-- READ (SELECT) - adatok lekérdezése
SELECT id, name, email FROM users 
WHERE age > 25 
ORDER BY name;

-- UPDATE - meglévő adat módosítása
UPDATE users 
SET email = 'newemail@example.com' 
WHERE id = 1;

-- DELETE - adat törlése
DELETE FROM users 
WHERE last_login < '2023-01-01';
```
*Figyeld meg: minden művelet WHERE clause-szal célzott és visszavonhatatlan (kivéve tranzakcióban).*

</div>

<div class="concept-section micro-learning" data-filter="queries">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**CRUD best practices:**
```sql
-- ✅ Jó: specifikus oszlopok
SELECT id, name, email FROM users;

-- ❌ Rossz: SELECT *
SELECT * FROM users;

-- ✅ Jó: WHERE clause minden UPDATE/DELETE-nél
UPDATE users SET status = 'inactive' WHERE last_login < '2023-01-01';

-- ❌ Veszélyes: WHERE nélküli UPDATE
UPDATE users SET status = 'inactive'; -- Minden rekord!
```

**Batch műveletek:**
```sql
-- Egyetlen INSERT több sorral
INSERT INTO products (name, price) VALUES 
    ('Product 1', 29.99),
    ('Product 2', 39.99),
    ('Product 3', 19.99);
```

</div>

</details>

</div>

### DDL/DML {#ddl-dml}

<div class="concept-section mental-model" data-filter="queries junior">

📋 **Fogalom meghatározása**  
*DDL (Data Definition Language) az adatbázis struktúráját definiáló SQL parancsok: CREATE (táblák, indexek létrehozása), ALTER (struktúra módosítása), DROP (objektumok törlése), TRUNCATE (táblaúritas). DML (Data Manipulation Language) az adatokkal dolgozó parancsok: SELECT, INSERT, UPDATE, DELETE. DDL autócommit, DML tranzakcióban futhat.*

</div>

<div class="concept-section why-important" data-filter="queries junior">

💡 **Miért számít?**
- **Struktúra vs adatok**: DDL a séma, DML a tartalom kezelése
- **Jogosultságok**: gyakran különböző szerepkörök kezelik őket
- **Backup stratégia**: DDL ritkábban változik, DML folyamatosan
- **Migration scripts**: DDL változások verziózottak, DML adatfüggő

</div>

<div class="runnable-model" data-filter="queries junior">

**Runnable mental model**
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
*Figyeld meg: DDL-t ritkábban, DML-t gyakran futtatjuk.*

</div>

<div class="concept-section micro-learning" data-filter="queries">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**DDL kategóriák:**
```sql
-- Schema objektumok létrehozása
CREATE TABLE, CREATE INDEX, CREATE VIEW, CREATE PROCEDURE

-- Schema objektumok módosítása  
ALTER TABLE, ALTER INDEX, ALTER VIEW

-- Schema objektumok törlése
DROP TABLE, DROP INDEX, DROP VIEW

-- Jogosultságok kezelése
GRANT SELECT ON products TO app_user;
REVOKE INSERT ON products FROM app_user;
```

**DML transaction safety:**
```sql
BEGIN TRANSACTION;
UPDATE inventory SET quantity = quantity - 1 WHERE product_id = 123;
INSERT INTO order_items (order_id, product_id, quantity) VALUES (456, 123, 1);
COMMIT; -- Vagy ROLLBACK ha hiba történt
```

</div>

</details>

</div>

### JOIN-ok (INNER/LEFT/RIGHT) {#join-ok-inner-left-right}

<div class="concept-section mental-model" data-filter="joins medior">

📋 **Fogalom meghatározása**  
*JOIN operations = több tábla relatív kapcsolat alapján való összekötése: INNER JOIN (csak matching rows mindkettőből, metszet), LEFT JOIN/LEFT OUTER JOIN (minden bal tábla row + matching jobb oldal, NULL if no match), RIGHT JOIN (fordítva), FULL OUTER JOIN (minden row mindkettőből, NULL-ok where no match), CROSS JOIN (Cartesian product). ON clause join condition, USING (column_name) shorthand common columns-hoz. Self-join: tábla saját magával (hierarchical data-hoz alias-ok kötelezőek).*

</div>

<div class="concept-section why-important" data-filter="joins medior">

💡 **Miért számít?**
- **Normalizált adatok**: relációs adatbázisokban az adatok több táblában vannak
- **Performance kritikus**: rossz JOIN lassú query-ket eredményez
- **Üzleti logika**: komplex jelentések és elemzések alapja
- **Data integrity**: foreign key kapcsolatok validálása

</div>

<div class="runnable-model" data-filter="joins medior">

**Runnable mental model**
```sql
-- INNER JOIN - csak egyező rekordok (metszet)
SELECT 
    u.name as customer_name,
    o.order_date,
    o.total_amount
FROM users u
INNER JOIN orders o ON u.id = o.customer_id;
-- Eredmény: csak azok a userek, akiknek van rendelése

-- LEFT JOIN - minden bal oldali + egyező jobb oldaliak
SELECT 
    u.name as customer_name,
    COUNT(o.id) as order_count,
    COALESCE(SUM(o.total_amount), 0) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.customer_id
GROUP BY u.id, u.name;
-- Eredmény: minden user, akinek nincs rendelése is (NULL értékekkel)

-- RIGHT JOIN - minden jobb oldali + egyező bal oldaliak
SELECT 
    p.name as product_name,
    COALESCE(oi.quantity, 0) as total_sold
FROM order_items oi
RIGHT JOIN products p ON oi.product_id = p.id;
-- Eredmény: minden termék, még a nem eladottak is

-- Self JOIN - hierarchikus adatok
SELECT 
    e.name as employee,
    m.name as manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
```
*Figyeld meg: COALESCE() kezeli a NULL értékeket LEFT/RIGHT JOIN-oknál.*

</div>

<div class="concept-section myths" data-filter="joins">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „JOIN mindig lassú." → Helyes indexsekkel a JOIN lehet gyorsabb mint subquery
- „LEFT JOIN és RIGHT JOIN ugyanaz." → Nem, a sorrendjük és az eredményük különbözik
- „INNER JOIN a default." → Igen, de explicit írás tisztább kód

</div>

</details>

</div>

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

<div class="concept-section definition" data-filter="indexing performance medior">

📋 **Fogalom meghatározása**  
**Data structure** (typically **B-tree** or **Hash**) gyors record retrieval-höz specific columns alapján. **Types**: **Simple index** (single column), **Composite/Multi-column index** (multiple columns, order matters!), **Unique index** (enforces uniqueness), **Partial index** (filtered subset), **Functional/Expression index** (computed values). **Trade-off**: faster SELECT, slower INSERT/UPDATE/DELETE (index maintenance). **EXPLAIN ANALYZE** shows index usage. PostgreSQL default: B-tree (balanced tree, O(log n) search). Clustered vs non-clustered index (table organization).

</div>

<div class="concept-section why-important" data-filter="indexing performance medior">

💡 **Miért számít?**
- **Query performance**: milliószorosra javíthatja a keresés sebességét
- **Trade-off**: gyorsabb SELECT, lassabb INSERT/Update/Delete
- **Memory usage**: indexek memóriát és tárhelyet fogyasztanak
- **Query optimizer**: az adatbázis dönt róla, hogy használja-e az indexet

</div>

<div class="runnable-model" data-filter="indexing performance">

**Runnable mental model**
```sql
-- Simple index - egy oszlopra
CREATE INDEX idx_users_email ON users(email);

-- Composite index - több oszlopra (sorrend számít!)
CREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date);

-- Unique constraint + index
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);

-- Partial index - csak bizonyos rekordokra
CREATE INDEX idx_active_users ON users(last_login_date) 
WHERE active = true;

-- Functional index - számított értékre
CREATE INDEX idx_users_lower_email ON users(LOWER(email));

-- Index hatékonyság ellenőrzése
EXPLAIN (ANALYZE, BUFFERS) 
SELECT * FROM users WHERE email = 'john@example.com';
-- Keress: "Index Scan" vagy "Bitmap Index Scan" eredményt
```
*Figyeld meg: composite indexnél a sorrend számít - (customer_id, order_date) != (order_date, customer_id).*

</div>

<div class="concept-section myths" data-filter="indexing">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Minden oszlopra kell index." → Túl sok index lassítja az INSERT/UPDATE műveleteket
- „Index mindig gyorsít." → Kis táblák esetén a full table scan gyorsabb lehet
- „A primary key nem index." → A primary key automatikusan unique index

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="indexing performance">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Index típusok PostgreSQL-ben:**
```sql
-- B-tree (default) - egyenlőség és tartomány query-k
CREATE INDEX idx_btree ON users(age);

-- Hash - csak egyenlőség query-k
CREATE INDEX idx_hash ON users USING HASH(status);

-- GIN - full-text search, JSON oszlopok
CREATE INDEX idx_gin ON documents USING GIN(content);

-- GiST - geometriai adatok, range típusok
CREATE INDEX idx_gist ON locations USING GIST(coordinates);
```

**Covering index strategy:**
```sql
-- Include oszlopokkal - index tartalmazza a SELECT oszlopokat is
CREATE INDEX idx_orders_covering 
ON orders(customer_id, order_date) 
INCLUDE (total_amount, status);

-- Így a query csak az indexet olvassa, nem a táblát
SELECT customer_id, order_date, total_amount, status
FROM orders 
WHERE customer_id = 123 AND order_date > '2023-01-01';
```

</div>

</details>

</div>
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

<div class="concept-section mental-model" data-filter="transactions medior">

📋 **Fogalom meghatározása**  
*A **Tranzakció** logikailag összefüggő adatbázis műveletek sorozata, amely ACID tulajdonságokat biztosít: **Atomicity** (minden művelet végrehajtódik vagy egyik sem), **Consistency** (valid állapotból valid állapotba), **Isolation** (konkurens tranzakciók elégétése), **Durability** (committed adatok fennmaradnak hiba után is). BEGIN/START TRANSACTION kezdi, COMMIT véglegesíti, ROLLBACK visszavonja. Savepoint-okkal részleges rollback. Isolation level-ek szabályozzák a visibility-t.*

</div>

<div class="concept-section why-important" data-filter="transactions medior">

💡 **Miért számít?**
- **Adatkonsisztencia**: biztosítja hogy az adatbázis mindig valid állapotban maradjon
- **Atomicitás**: vagy minden művelet sikeres, vagy egyik sem
- **Hibakezelés**: automatikus rollback hiba esetén
- **Konkurens hozzáférés**: több felhasználó biztonságos párhuzamos munkája

</div>

<div class="runnable-model" data-filter="transactions">

**Runnable mental model**
```sql
-- Alapvető tranzakció - pénzátutalás
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

-- Savepoint használat - részleges visszavonás
BEGIN TRANSACTION;

INSERT INTO orders (customer_id, order_date) VALUES (1, NOW());
SAVEPOINT order_created;

INSERT INTO order_items (order_id, product_id, quantity) 
VALUES (LAST_INSERT_ID(), 1, 2);

-- Ha hiba az order_items-ben, csak ezt vonjuk vissza
-- ROLLBACK TO SAVEPOINT order_created;

COMMIT;
```
*Figyeld meg: SAVEPOINT lehetővé teszi a részleges rollback-et tranzakción belül.*

</div>

<div class="concept-section myths" data-filter="transactions">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Autocommit mode-ban nincs tranzakció." → Minden statement implicit tranzakcióban fut
- „Long running transaction jó." → Hosszú tranzakciók lockolnak és deadlock-ot okozhatnak
- „ROLLBACK költséges." → ROLLBACK gyakran gyorsabb mint a hibás adatok javítása

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="transactions">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Transaction isolation levels:**
```sql
-- Read committed (default)
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- Repeatable read
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- Serializable - legmagasabb izolációs szint
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

**Pessimistic locking:**
```sql
-- FOR UPDATE - exclusive lock
SELECT * FROM products WHERE id = 1 FOR UPDATE;

-- FOR SHARE - shared lock
SELECT * FROM products WHERE id = 1 FOR SHARE;
```

**Deadlock detection:**
```sql
-- PostgreSQL automatikusan felismeri és megszakítja a deadlock-ot
-- Log-ban: "deadlock detected"
```

</div>

</details>

</div>

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

### Primary Key vs Foreign Key {#primary-key-vs-foreign-key}

<div class="concept-section mental-model" data-filter="constraints junior">

📋 **Fogalom meghatározása**  
*A **Primary Key (PK)** egy vagy több oszlop egyedi azonosítója, amely biztosítja a táblában lévő minden rekord egyediségét (UNIQUE) és létezését (NOT NULL). Automatikusan clustered index jön létre rajta. A **Foreign Key (FK)** referenciális integritási constraint, amely egy tábla oszlopát egy másik tábla primary key-éhez köti. CASCADE, SET NULL, RESTRICT opciókkal szabályozza a parent rekordok módosításának vagy törlésének hatását a child rekordokra, így megakadályozva az orphan records kialakulását.*

</div>

<div class="concept-section why-important" data-filter="constraints junior">

💡 **Miért számít?**
- **Adatintegritás**: biztosítja hogy minden rekord egyedi és az összekapcsolások valósak
- **Referenciális integritás**: nem lehet olyan kapcsolatot létrehozni, ami nem létező rekordra mutat
- **Query optimization**: automatikus indexek javítják a teljesítményt
- **Cascade operations**: kapcsolt rekordok automatikus kezelése

</div>

<div class="runnable-model" data-filter="constraints junior">

**Runnable mental model**
```sql
-- Primary Key - egyedi azonosító
CREATE TABLE users (
    id SERIAL PRIMARY KEY,              -- Auto-increment primary key
    email VARCHAR(255) UNIQUE NOT NULL, -- Egyedi, de nem primary
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Composite Primary Key
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (order_id, product_id)  -- Összetett kulcs
);

-- Foreign Key - kapcsolat másik táblához
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT NOW(),
    total_amount DECIMAL(12,2),
    FOREIGN KEY (customer_id) REFERENCES users(id)
        ON DELETE CASCADE              -- User törléskor rendelések is törlődnek
        ON UPDATE CASCADE              -- User ID frissítéskor propagálás
);

-- Foreign Key constraints különböző opciókkal
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id INT,
    supplier_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
        ON DELETE SET NULL,            -- Category törléskor NULL lesz
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
        ON DELETE RESTRICT             -- Supplier törlés blokkolva ha van termék
);

-- Self-referencing Foreign Key - hierarchikus struktúra
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employees(id)
        ON DELETE SET NULL
);

-- FK constraint ellenőrzése
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
*Figyeld meg: CASCADE, SET NULL, RESTRICT opciók különböző viselkedést eredményeznek.*

</div>

<div class="concept-section myths" data-filter="constraints">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Primary key mindig AUTO_INCREMENT." → Nem, lehet UUID, composite key, vagy manuálisan megadott
- „Foreign key mindig kötelező." → Lehet NULL is, ha az ON DELETE SET NULL be van állítva
- „Egy táblában csak egy primary key lehet." → Igaz, de lehet composite (több oszlopból álló)

</div>

</details>

</div>

### Unique és Check Constraint {#unique-check-constraint}

<div class="concept-section mental-model" data-filter="constraints junior">

📋 **Fogalom meghatározása**  
*A **UNIQUE constraint** biztosítja az oszlop vagy oszlopkombináció egyediségét a táblában, lehetővé téve NULL értékeket (pl. email cím egyedi, de opcionális telefonszám NULL lehet többször is). Automatikusan non-clustered index létrehozása. A **CHECK constraint** deklaratív módon érvényesít üzleti szabályokat SQL szinten (pl. price > 0, status IN ('active', 'inactive'), age >= 18), megakadályozva invalid adatok beszúrását még az alkalmazási logika előtt, így biztosítva az adatintegritást a perzisztencia rétegben.*

</div>

<div class="concept-section why-important" data-filter="constraints junior">

💡 **Miért számít?**
- **Business rules enforcement**: üzleti szabályok betartatása adatbázis szinten
- **Data quality**: rossz adatok megelőzése, nem csak az alkalmazásban
- **Performance**: unique constraint automatikus index létrehozás
- **Error prevention**: early feedback hibás adatoknál

</div>

<div class="runnable-model" data-filter="constraints junior">

**Runnable mental model**
```sql
-- Unique constraints - egyediség biztosítása
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,     -- Egyedi email cím
    username VARCHAR(50) UNIQUE NOT NULL,   -- Egyedi felhasználónév
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Composite unique constraint - kombinált egyediség
CREATE TABLE user_roles (
    user_id INT,
    role_id INT,
    assigned_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, role_id),               -- Egy user-nek egy role csak egyszer
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Check constraints - üzleti szabályok
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
    CONSTRAINT future_ship_date CHECK (ship_date IS NULL OR ship_date <= CURRENT_DATE + INTERVAL '30 days'),
    
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
WHERE status = 'active';  -- Csak aktív userek email-je legyen egyedi

-- Constraint ellenőrzése
SELECT 
    conname AS constraint_name,
    contype AS constraint_type,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint 
WHERE conrelid = 'products'::regclass;
```
*Figyeld meg: check constraintek komplex üzleti logikát is tartalmazhatnak.*

</div>

<div class="concept-section myths" data-filter="constraints">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Check constraint csak egyszerű értékekre alkalmas." → Komplex kifejezések és subquery-k is használhatók
- „Unique constraint nem lehet NULL." → NULL értékek megengedettek, de csak egy lehet (PostgreSQL-ben)
- „Constraints lassítják az INSERT-et." → Igen, de megelőzik a hibás adatokat és konzisztenciát biztosítanak

</div>

</details>

</div>

### Default Értékek {#default-ertekek}

<div class="concept-section mental-model" data-filter="schema junior">

📋 **Fogalom meghatározása**  
*A **DEFAULT constraint** előre definiált értéket rendel egy oszlophoz, ha az INSERT művelet explicit értéket nem ad meg. Lehet literál érték (0, 'active', FALSE), függvény (CURRENT_TIMESTAMP, uuid_generate_v4()), vagy szekvencia (nextval('seq')). Csökkenti a NOT NULL mezők terhelését az alkalmazásra, központosítja az üzleti logikát (pl. welcome credit, initial status), és konzisztens adatokat biztosít különböző kliens alkalmazások között.*

</div>

<div class="concept-section why-important" data-filter="schema junior">

💡 **Miért számít?**
- **Data consistency**: konzisztens alapértékek az egész alkalmazásban
- **User experience**: kevesebb kötelező mező, gyorsabb adatbevitel
- **Application logic**: egyszerűbb kód, mert nem kell minden mezőt kezelni
- **Business rules**: automatikus értékek üzleti szabályok szerint

</div>

<div class="runnable-model" data-filter="schema junior">

**Runnable mental model**
```sql
-- Egyszerű default értékek
CREATE TABLE users (
    id SERIAL PRIMARY KEY,                              -- AUTO_INCREMENT default
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'active',                -- String default
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,     -- Timestamp default
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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

-- Sequence-based defaults
CREATE SEQUENCE order_number_seq START 1000;
CREATE SEQUENCE invoice_number_seq START 100000 INCREMENT BY 1;

CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,
    invoice_number VARCHAR(20) DEFAULT ('INV-' || TO_CHAR(nextval('invoice_number_seq'), 'FM000000')),
    order_id INT UNIQUE NOT NULL,
    issue_date DATE DEFAULT CURRENT_DATE,
    due_date DATE DEFAULT (CURRENT_DATE + INTERVAL '30 days'),
    amount DECIMAL(12,2) NOT NULL,
    
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- Conditional defaults with triggers
CREATE OR REPLACE FUNCTION set_user_defaults()
RETURNS TRIGGER AS $$
BEGIN
    -- Automatically set username if not provided
    IF NEW.username IS NULL THEN
        NEW.username := 'user_' || NEW.id;
    END IF;
    
    -- Set welcome credit for new users
    IF NEW.credit_balance IS NULL THEN
        NEW.credit_balance := 10.00;  -- $10 welcome credit
    END IF;
    
    -- Auto-generate display name
    IF NEW.display_name IS NULL THEN
        NEW.display_name := SPLIT_PART(NEW.email, '@', 1);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_defaults_trigger
    BEFORE INSERT ON users
    FOR EACH ROW
    EXECUTE FUNCTION set_user_defaults();

-- UUID defaults
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE documents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    access_token UUID DEFAULT uuid_generate_v4(),     -- Random access token
    
    FOREIGN KEY (created_by) REFERENCES users(id)
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
-- status='active', created_at=now(), is_verified=false automatikusan

INSERT INTO orders (customer_id, total_amount) 
VALUES (1, 299.99);
-- order_number, order_date, ship_date automatikusan generálódik

-- Default értékek módosítása
ALTER TABLE users ALTER COLUMN status SET DEFAULT 'pending';
ALTER TABLE orders ALTER COLUMN currency SET DEFAULT 'EUR';

-- Default eltávolítása
ALTER TABLE users ALTER COLUMN credit_balance DROP DEFAULT;
```
*Figyeld meg: funkciók, szekvenciák és triggerek is használhatók default értékek generálásához.*

</div>

<div class="concept-section interview-pitfalls" data-filter="schema">

<details>
<summary>💼 <strong>Interjú buktatók</strong></summary>

<div>

- **"Mikor használnál default értékeket?"** → Gyakori értékek, audit mezők, business logic egyszerűsítése
- **"Mi a különbség SERIAL és SEQUENCE között?"** → SERIAL shorthand egy AUTO_INCREMENT sequence-hez
- **"Hogyan frissítenéd a default értéket meglévő táblában?"** → ALTER TABLE... ALTER COLUMN... SET DEFAULT

</div>

### Views (Nézetek) {#views}

<div class="concept-section definition" data-filter="views junior">

📋 **Fogalom meghatározása**  
**Virtual table** based on SELECT query result: no physical data storage, query executed on access. **Benefits**: **abstraction layer** (hide complexity), **security** (column/row filtering), **code reuse** (centralized queries), **backward compatibility** (schema evolution). **Materialized view**: stores result physically, periodic refresh (REFRESH MATERIALIZED VIEW). **Updatable views**: simple views with INSERT/UPDATE/DELETE support. **WITH CHECK OPTION**: enforces view WHERE condition on modifications. Performance: no overhead (simple delegation), possible optimization by query planner.

</div>

<div class="concept-section why-important" data-filter="views junior">

💡 **Miért számít?**
- **Abstraction layer**: komplex query-k elrejtése egyszerű interface mögött
- **Security**: csak szükséges oszlopok és sorok megjelenítése
- **Code reuse**: gyakori lekérdezések központosítása
- **Backward compatibility**: schema változások elleni védelem

</div>

<div class="runnable-model" data-filter="views junior">

**Runnable mental model**
```sql
-- Egyszerű view - oszlopok szűrése
CREATE VIEW user_public_info AS
SELECT 
    id,
    name,
    email,
    created_at,
    status
FROM users
WHERE status = 'active';

-- Komplex view - JOIN-ok és aggregáció
CREATE VIEW order_summary AS
SELECT 
    u.id as customer_id,
    u.name as customer_name,
    u.email,
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
GROUP BY u.id, u.name, u.email;

-- Business logic view
CREATE VIEW product_availability AS
SELECT 
    p.id,
    p.name,
    p.price,
    p.stock_quantity,
    c.name as category_name,
    CASE 
        WHEN p.stock_quantity = 0 THEN 'Out of Stock'
        WHEN p.stock_quantity < 10 THEN 'Low Stock'
        WHEN p.stock_quantity < 50 THEN 'In Stock'
        ELSE 'Well Stocked'
    END as availability_status,
    CASE 
        WHEN p.status = 'active' AND p.stock_quantity > 0 THEN TRUE
        ELSE FALSE
    END as can_order
FROM products p
JOIN categories c ON p.category_id = c.id;

-- Security view - sensitive data filtering
CREATE VIEW employee_directory AS
SELECT 
    id,
    name,
    department,
    hire_date,
    -- Salary és personal info kihagyva
    CASE 
        WHEN department = 'management' THEN 'Manager'
        WHEN hire_date < (CURRENT_DATE - INTERVAL '2 years') THEN 'Senior'
        ELSE 'Junior'
    END as level
FROM employees
WHERE status = 'active';

-- Reporting view - dashboard adatok
CREATE VIEW monthly_sales_report AS
SELECT 
    DATE_TRUNC('month', o.order_date) as month,
    COUNT(o.id) as order_count,
    SUM(o.total_amount) as revenue,
    AVG(o.total_amount) as avg_order_value,
    COUNT(DISTINCT o.customer_id) as unique_customers,
    SUM(oi.quantity) as items_sold
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
WHERE o.status IN ('confirmed', 'shipped', 'delivered')
    AND o.order_date >= (CURRENT_DATE - INTERVAL '12 months')
GROUP BY DATE_TRUNC('month', o.order_date)
ORDER BY month DESC;

-- Updatable view (egyszerű view-k)
CREATE VIEW active_products AS
SELECT id, name, price, stock_quantity
FROM products 
WHERE status = 'active';

-- View használata
SELECT * FROM user_public_info WHERE name ILIKE '%john%';

SELECT customer_name, customer_tier, total_spent 
FROM order_summary 
WHERE customer_tier = 'VIP';

-- View-k módosítása
CREATE OR REPLACE VIEW user_public_info AS
SELECT 
    id,
    name,
    email,
    created_at,
    status,
    is_verified  -- Új oszlop hozzáadva
FROM users
WHERE status IN ('active', 'pending');

-- View információk lekérdezése
SELECT table_name, view_definition 
FROM information_schema.views 
WHERE table_schema = 'public';

-- View törlése
DROP VIEW IF EXISTS old_report_view;
```
*Figyeld meg: view-k valós időben adják vissza az aktuális adatokat, nem cachelt verziót.*

</div>

<div class="concept-section myths" data-filter="views">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „View-k lassúak." → Egyszerű view-k gyorsak, de komplex JOIN-ok és aggregációk lassíthatnak
- „View-k tárolják az adatokat." → Nem, csak a query definíciót tárolják (kivéve materialized view)
- „View-ken keresztül nem lehet írni." → Egyszerű view-k írhatók, komplexek általában nem

</div>

</details>

</div>

## Gyakori hibák és buktatók

<div class="concept-section myths" data-filter="junior medior">

### SELECT * használata

<details>
<summary>🧯 <strong>Felesleges adatforgalom</strong></summary>

<div>

**❌ Hibás példa - Pazarló lekérdezés:**
```sql
-- HIBÁS - felesleges adatforgalom
SELECT * FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.price > 100;
-- Lehet, hogy csak a nevet és árat kell, de minden mező jön
```

**✅ Helyes megoldás - Specifikus oszlopok:**
```sql
-- HELYES - csak szükséges oszlopok
SELECT p.name, p.price, c.name as category_name
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.price > 100;
```

**Miért problémás:**
- Felesleges network forgalom
- Nagyobb memory használat
- Index covering lehetőségének elvesztése
- Sérülékeny kód - ha új oszlop jön, a query "eltörik"

</div>

</details>

### N+1 Query Problem

<details>
<summary>⚡ <strong>Exponenciális teljesítményvesztés</strong></summary>

<div>

**❌ Hibás példa - N+1 anti-pattern:**
```sql
-- HIBÁS - N+1 query pattern
-- 1. Query: felhasználók lekérése (1 query)
SELECT * FROM users;

-- 2. N Query: minden userhez külön query (application code-ban)
-- SELECT COUNT(*) FROM orders WHERE customer_id = 1;
-- SELECT COUNT(*) FROM orders WHERE customer_id = 2;
-- SELECT COUNT(*) FROM orders WHERE customer_id = 3;
-- ... 1000 user = 1000 query!
```

**✅ Helyes megoldás - Egyetlen JOIN:**
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
-- 1000 user = 1 query!
```

**Performance impact:**
- 1000 user esetén: 1001 query → 1 query
- Network latency: 1001 * 5ms = 5 másodperc → 5ms
- Database connection pool terhelés csökkenése

</div>

</details>

### SQL Injection

<details>
<summary>🛡️ <strong>Kritikus biztonsági rés</strong></summary>

<div>

**❌ Veszélyes példa - Direkt string concatenation:**
```sql
-- VESZÉLYES - SQL injection lehetőség
-- Application code: "SELECT * FROM users WHERE email = '" + userInput + "';"
-- Ha userInput = "test@example.com'; DROP TABLE users; --"
-- Eredmény: Az egész users tábla törlődik!
```

**✅ Biztonságos megoldás - Prepared statements:**
```java
// BIZTONSÁGOS - Prepared statement
String sql = "SELECT * FROM users WHERE email = ?";
PreparedStatement stmt = connection.prepareStatement(sql);
stmt.setString(1, userInput);
ResultSet rs = stmt.executeQuery();
```

**Védelem módjai:**
- Prepared statements/parameterized queries használata
- Input validation és sanitization
- Least privilege principle - minimális DB jogosultságok
- ORM használata (pl. Hibernate, MyBatis)

</div>

</details>

</div>
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

## Interjúkérdések és válaszok

<div class="concept-section interview-pitfalls" data-filter="junior medior">

<details>
<summary>💼 <strong>Gyakori interjúkérdések - Junior szint</strong></summary>

<div>

**Q: Mi a különbség az INNER és LEFT JOIN között?**
> INNER JOIN csak egyező rekordokat ad vissza mindkét táblából, LEFT JOIN minden rekordot a bal oldali táblából plus egyezőket a jobb oldaliból.

**Q: Mi az ACID?**
> Atomicity (atomosság), Consistency (konzisztencia), Isolation (elkülönítés), Durability (tartósság) - tranzakciós tulajdonságok.

**Q: Hogyan optimalizálnál egy lassú query-t?**
> EXPLAIN ANALYZE használata, megfelelő indexek, WHERE feltételek optimalizálása, JOIN sorrendek.

**Q: Mi a normalizáció célja?**
> Redundancia csökkentése, update anomáliák eliminálása, adatintegritás javítása.

**Q: Hogyan implementálnál pagination-t?**
> LIMIT és OFFSET, vagy cursor-based pagination nagy dataset-ekhez.

</div>

</details>

<details>
<summary>💼 <strong>Haladó interjúkérdések - Medior+ szint</strong></summary>

<div>

**Q: Mi a különbség a clustered és non-clustered index között?**
> Clustered index meghatározza a tábla fizikai sorrendjét (általában PK), non-clustered külön struktúra.

**Q: Hogyan kezelnéd a deadlock-ot?**
> Timeout beállítás, konzisztens lock sorrend, rövidebb tranzakciók, retry mechanizmus.

**Q: Mikor használnál denormalizációt?**
> Read-heavy workload, performance kritikus alkalmazások, data warehouse scenarios.

**Q: Mi az ablakfüggvény (window function)?**
> Aggregációs számítások sorok csoportjain anélkül, hogy GROUP BY-t használnánk.

**Q: Hogyan működik a tranzakciós izolációs szintek?**
> READ UNCOMMITTED < READ COMMITTED < REPEATABLE READ < SERIALIZABLE - növekvő konzisztencia, csökkenő concurrency.

**Q: Mi a különbség az EXISTS és IN között?**
> EXISTS korrelált subquery, gyakran gyorsabb; IN érték lista vagy subquery, problémás NULL értékekkel.

**Q: Mi a stored procedure előnyei és hátrányai?**
> Előnyök: teljesítmény, biztonság, központosított logika. Hátrányok: vendor lock-in, nehéz verziókezelés, limited debugging.

</div>

</details>

</div>

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

### Primary Key vs Foreign Key {#primary-key-vs-foreign-key}

<div class="concept-section mental-model" data-filter="constraints junior">

📋 **Fogalom meghatározása**  
*A **Primary Key (PK)** egy vagy több oszlop egyedi azonosítója, amely biztosítja a táblában lévő minden rekord egyediségét (UNIQUE) és létezését (NOT NULL). Automatikusan clustered index jön létre rajta. A **Foreign Key (FK)** referenciális integritási constraint, amely egy tábla oszlopát egy másik tábla primary key-éhez köti. CASCADE, SET NULL, RESTRICT opciókkal szabályozza a parent rekordok módosításának vagy törlésének hatását a child rekordokra, így megakadályozva az orphan records kialakulását.*

</div>

<div class="concept-section why-important" data-filter="constraints junior">

💡 **Miért számít?**
- **Adatintegritás**: biztosítja hogy minden rekord egyedi és az összekapcsolások valósak
- **Referenciális integritás**: nem lehet olyan kapcsolatot létrehozni, ami nem létező rekordra mutat
- **Query optimization**: automatikus indexek javítják a teljesítményt
- **Cascade operations**: kapcsolt rekordok automatikus kezelése

</div>

<div class="runnable-model" data-filter="constraints junior">

**Runnable mental model**
```sql
-- Primary Key - egyedi azonosító
CREATE TABLE users (
    id SERIAL PRIMARY KEY,              -- Auto-increment primary key
    email VARCHAR(255) UNIQUE NOT NULL, -- Egyedi, de nem primary
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Foreign Key - kapcsolat másik táblához
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT NOW(),
    total_amount DECIMAL(12,2),
    FOREIGN KEY (customer_id) REFERENCES users(id)
        ON DELETE CASCADE              -- User törléskor rendelések is törlődnek
        ON UPDATE CASCADE              -- User ID frissítéskor propagálás
);

-- Self-referencing Foreign Key - hierarchikus struktúra
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employees(id)
        ON DELETE SET NULL
);
```
*Figyeld meg: CASCADE, SET NULL, RESTRICT opciók különböző viselkedést eredményeznek.*

</div>

<div class="concept-section myths" data-filter="constraints">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Primary key mindig AUTO_INCREMENT." → Nem, lehet UUID, composite key, vagy manuálisan megadott
- „Foreign key mindig kötelező." → Lehet NULL is, ha az ON DELETE SET NULL be van állítva
- „Egy táblában csak egy primary key lehet." → Igaz, de lehet composite (több oszlopból álló)

</div>

</details>

</div>

### Unique és Check Constraint {#unique-check-constraint}

<div class="concept-section definition" data-filter="constraints junior">

📋 **Fogalom meghatározása**  
**Integrity constraints** data quality enforcement-hez: **UNIQUE** (no duplicate values, automatic index creation, NULL allowed multiple times), **CHECK** (custom boolean expression validation, business rules enforcement). **Composite UNIQUE**: multiple columns combination uniqueness (e.g., UNIQUE(user_id, role_id)). **Named constraints**: easier ALTER/DROP management. **Enforcement**: INSERT/UPDATE time validation, exception raised on violation. **Performance**: UNIQUE creates index (faster lookups), CHECK minimal overhead. Use cases: email uniqueness, price > 0, status enum validation, date range logic.

</div>

<div class="concept-section why-important" data-filter="constraints junior">

💡 **Miért számít?**
- **Business rules enforcement**: üzleti szabályok betartatása adatbázis szinten
- **Data quality**: rossz adatok megelőzése, nem csak az alkalmazásban
- **Performance**: unique constraint automatikus index létrehozás
- **Error prevention**: early feedback hibás adatoknál

</div>

<div class="runnable-model" data-filter="constraints junior">

**Runnable mental model**
```sql
-- Check constraints - üzleti szabályok
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

-- Composite unique constraint
CREATE TABLE user_roles (
    user_id INT,
    role_id INT,
    assigned_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, role_id),               -- Egy user-nek egy role csak egyszer
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);
```
*Figyeld meg: check constraintek komplex üzleti logikát is tartalmazhatnak.*

</div>

### NULL Kezelés {#null-kezeles}

<div class="concept-section mental-model" data-filter="null-handling junior">

📋 **Fogalom meghatározása**  
*A **NULL** az ismeretlen vagy nem alkalmazható érték reprezentációja SQL-ben, amely three-valued logic-ot eredményez: TRUE, FALSE, és UNKNOWN. NULL != NULL (eredménye NULL, nem TRUE), ezért az ellenőrzéshez IS NULL / IS NOT NULL operátorokat kell használni. Aggregációs függvények (COUNT, SUM, AVG) kihagyják a NULL értékeket. COALESCE(val1, val2, ...) visszaadja az első non-NULL értéket. NULL-ok kritikusak JOIN-okban és WHERE feltételekben, mert megváltoztatják a logikai kifejezések eredményét.*

</div>

<div class="concept-section why-important" data-filter="null-handling junior">

💡 **Miért számít?**
- **Three-valued logic**: TRUE, FALSE, NULL - megváltoztatja a logikai műveleteket
- **Aggregation impact**: NULL értékek kiesnek a COUNT, SUM, AVG számításokból
- **Comparison pitfalls**: NULL = NULL eredménye NULL, nem TRUE
- **Business logic**: üres vs ismeretlen vs nem alkalmazható különbsége

</div>

<div class="runnable-model" data-filter="null-handling junior">

**Runnable mental model**
```sql
-- NULL ellenőrzés - IS NULL és IS NOT NULL
SELECT id, name, email, phone
FROM users
WHERE phone IS NULL;           -- Helyes NULL ellenőrzés

-- COALESCE - első nem-NULL érték visszaadása
SELECT 
    id,
    name,
    COALESCE(phone, email, 'No contact info') as primary_contact
FROM users;

-- NULLIF - érték NULL-lá alakítása bizonyos feltételnél
SELECT 
    id,
    name,
    NULLIF(phone, '') as clean_phone,           -- Üres string → NULL
    NULLIF(discount_percent, -1) as active_discount  -- -1 → NULL
FROM users;

-- NULL-ok aggregációban
SELECT 
    COUNT(*) as total_records,                   -- Minden rekord
    COUNT(phone) as records_with_phone,          -- NULL kiesik
    AVG(age) as avg_age                          -- NULL kiesik az átlagból
FROM users;
```
*Figyeld meg: NULL != NULL, de IS NULL és IS NOT NULL használata proper NULL ellenőrzéshez.*

</div>

<div class="concept-section myths" data-filter="null-handling">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „NULL ugyanaz mint üres string." → Nem, NULL ismeretlen érték, üres string konkrét érték
- „NULL = NULL TRUE eredményt ad." → Nem, NULL = NULL eredménye NULL (UNKNOWN)
- „COUNT(*) kihagyja a NULL-okat." → COUNT(*) minden sort számol, COUNT(column) hagyja ki a NULL-okat

</div>

</details>

</div>

### CTE (Common Table Expressions) {#cte}

<div class="concept-section mental-model" data-filter="advanced-queries medior">

📋 **Fogalom meghatározása**  
*A **CTE (Common Table Expression)** egy WITH clause-zal definiált elnevezett result set, amely egy query végrehajtása során elérhető. Strukturálja és modularizálja a komplex lekérdezéseket olvasható, újrafelhasználható részekre. **Recursive CTE** lehetővé teszi hierarchikus vagy gráf adatok (fa struktúrák, BOM, org charts) bejárását base case + recursive case mintával. CTE-k alternatívája a subquery-knek és temp table-öknek, gyakran jobb query optimizer támogatással és kevesebb overhead-del.*

</div>

<div class="concept-section why-important" data-filter="advanced-queries medior">

💡 **Miért számít?**
- **Query readability**: komplex lekérdezések strukturált, olvasható részekre bontása
- **Code reuse**: ugyanazt a CTE-t többször is felhasználhatod egy query-ben
- **Recursive queries**: hierarchikus adatok (fa struktúrák) kezelése
- **Performance**: néha jobb mint subquery-k vagy temp table-ök

</div>

<div class="runnable-model" data-filter="advanced-queries medior">

**Runnable mental model**
```sql
-- Egyszerű CTE - sales summary
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

-- Multiple CTE-k - complex analysis
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

-- Recursive CTE - hierarchikus adatok
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
*Figyeld meg: CTE-k olvashatóvá és karbantarthatóvá teszik a komplex query-ket.*

</div>

### Window Functions {#window-functions}

<div class="concept-section mental-model" data-filter="analytics medior">

📋 **Fogalom meghatározása**  
*A **Window Functions** (analitikai függvények) aggregációs vagy ranking számításokat végeznek a result set egy "window"-ján (PARTITION BY által definiált csoportok) anélkül, hogy GROUP BY-ként összevonnák a sorokat. OVER() clause definiálja a window-t: PARTITION BY (csoportosítás), ORDER BY (sorrend), ROWS/RANGE (frame specification). Típusok: ranking (ROW_NUMBER, RANK, DENSE_RANK, NTILE), offset (LAG, LEAD), aggregate (SUM, AVG, COUNT OVER). Kritikusak reporting, time-series analysis, cohort analysis és percentile számításokhoz.*

</div>

<div class="concept-section why-important" data-filter="analytics medior">

💡 **Miért számít?**
- **Analytical queries**: ranking, running totals, percentiles számítása
- **Row preservation**: GROUP BY-val ellentétben megtartja az eredeti sorokat
- **Performance**: egy lépésben végzi el a komplex analitikai számításokat
- **Business intelligence**: dashboard-ok és riportok alapja

</div>

<div class="runnable-model" data-filter="analytics medior">

**Runnable mental model**
```sql
-- ROW_NUMBER, RANK, DENSE_RANK
SELECT 
    name,
    department,
    salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as row_num,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) as dense_rank,
    PERCENT_RANK() OVER (PARTITION BY department ORDER BY salary DESC) as percent_rank
FROM employees;

-- LAG és LEAD - előző/következő értékek
SELECT 
    order_date,
    total_amount,
    LAG(total_amount) OVER (ORDER BY order_date) as prev_order_amount,
    LEAD(total_amount) OVER (ORDER BY order_date) as next_order_amount,
    total_amount - LAG(total_amount) OVER (ORDER BY order_date) as amount_change
FROM orders
ORDER BY order_date;

-- Running totals és moving averages
SELECT 
    order_date,
    total_amount,
    SUM(total_amount) OVER (ORDER BY order_date ROWS UNBOUNDED PRECEDING) as running_total,
    AVG(total_amount) OVER (ORDER BY order_date ROWS 6 PRECEDING) as moving_avg_7days,
    COUNT(*) OVER (ORDER BY order_date ROWS UNBOUNDED PRECEDING) as cumulative_order_count
FROM orders
ORDER BY order_date;

-- NTILE - percentile buckets
SELECT 
    customer_id,
    total_spent,
    NTILE(4) OVER (ORDER BY total_spent DESC) as quartile,
    CASE NTILE(4) OVER (ORDER BY total_spent DESC)
        WHEN 1 THEN 'Top 25%'
        WHEN 2 THEN 'Second 25%'
        WHEN 3 THEN 'Third 25%'
        WHEN 4 THEN 'Bottom 25%'
    END as customer_segment
FROM (
    SELECT customer_id, SUM(total_amount) as total_spent
    FROM orders
    GROUP BY customer_id
) customer_totals;

-- Complex window functions with frames
SELECT 
    product_id,
    order_date,
    quantity,
    -- Running average of last 30 days
    AVG(quantity) OVER (
        PARTITION BY product_id 
        ORDER BY order_date 
        RANGE BETWEEN INTERVAL '30 days' PRECEDING AND CURRENT ROW
    ) as avg_quantity_30d,
    -- Peak quantity in last 90 days
    MAX(quantity) OVER (
        PARTITION BY product_id 
        ORDER BY order_date 
        RANGE BETWEEN INTERVAL '90 days' PRECEDING AND CURRENT ROW
    ) as peak_quantity_90d
FROM order_items oi
JOIN orders o ON oi.order_id = o.id
ORDER BY product_id, order_date;
```
*Figyeld meg: window functions komplex analitikai számításokat tesznek lehetővé egyszerű SQL-ben.*

</div>

### Views (Nézetek) {#views}

<div class="concept-section definition" data-filter="views junior">

📋 **Fogalom meghatározása**  
**Virtual table** based on SELECT query result: no physical data storage, query executed on access. **Benefits**: **abstraction layer** (hide complexity), **security** (column/row filtering), **code reuse** (centralized queries), **backward compatibility** (schema evolution). **Materialized view**: stores result physically, periodic refresh (REFRESH MATERIALIZED VIEW). **Updatable views**: simple views with INSERT/UPDATE/DELETE support. **WITH CHECK OPTION**: enforces view WHERE condition on modifications. Performance: no overhead (simple delegation), possible optimization by query planner.

</div>

<div class="concept-section why-important" data-filter="views junior">

💡 **Miért számít?**
- **Abstraction layer**: komplex query-k elrejtése egyszerű interface mögött
- **Security**: csak szükséges oszlopok és sorok megjelenítése
- **Code reuse**: gyakori lekérdezések központosítása
- **Backward compatibility**: schema változások elleni védelem

</div>

<div class="runnable-model" data-filter="views junior">

**Runnable mental model**
```sql
-- Egyszerű view - oszlopok szűrése
CREATE VIEW user_public_info AS
SELECT 
    id,
    name,
    email,
    created_at,
    status
FROM users
WHERE status = 'active';

-- Komplex view - JOIN-ok és aggregáció
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

-- View használata
SELECT * FROM order_summary WHERE customer_tier = 'VIP';
```
*Figyeld meg: view-k valós időben adják vissza az aktuális adatokat, nem cachelt verziót.*

</div>

<div class="concept-section myths" data-filter="views">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „View-k lassúak." → Egyszerű view-k gyorsak, de komplex JOIN-ok és aggregációk lassíthatnak
- „View-k tárolják az adatokat." → Nem, csak a query definíciót tárolják (kivéve materialized view)
- „View-ken keresztül nem lehet írni." → Egyszerű view-k írhatók, komplexek általában nem

</div>

</details>

</div>

### Stored Procedures {#stored-procedures}

<div class="concept-section definition" data-filter="procedures junior">

📋 **Fogalom meghatározása**  
**Precompiled SQL functions** stored in database: procedural logic (variables, loops, conditionals), **DECLARE** variables, **BEGIN/END** block, **EXCEPTION** handling, **RETURN** value. **Benefits**: **performance** (precompiled execution plan), **security** (SQL injection prevention, controlled access), **transaction atomicity** (COMMIT/ROLLBACK), **business logic centralization**. PostgreSQL: PL/pgSQL language. Oracle: PL/SQL. MySQL: stored procedures + functions. **Functions** (RETURNS value, used in SELECT) vs **Procedures** (IN/OUT parameters, called with CALL). Modern trend: business logic in application layer, DB for data integrity.

</div>

<div class="concept-section why-important" data-filter="procedures junior">

💡 **Miért számít?**
- **Performance**: előre lefordított kód, gyorsabb végrehajtás
- **Security**: SQL injection protection, központosított logika
- **Business logic**: komplex üzleti szabályok az adatbázisban
- **Transaction management**: atomikus műveletek guarantee

</div>

<div class="runnable-model" data-filter="procedures junior">

**Runnable mental model**
```sql
-- Egyszerű stored procedure - felhasználó létrehozás
CREATE OR REPLACE FUNCTION create_user(
    p_name VARCHAR(100),
    p_email VARCHAR(255),
    p_initial_credit DECIMAL(10,2) DEFAULT 10.00
) RETURNS INT AS $$
DECLARE
    user_id INT;
BEGIN
    -- Input validáció
    IF p_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
        RAISE EXCEPTION 'Invalid email format: %', p_email;
    END IF;
    
    -- Felhasználó létrehozás
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
    WHEN OTHERS THEN
        RAISE EXCEPTION 'User creation failed: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;

-- Komplex procedure - rendelés feldolgozás
CREATE OR REPLACE FUNCTION process_order(
    p_customer_id INT,
    p_items JSONB
) RETURNS TABLE(order_id INT, total_amount DECIMAL, message TEXT) AS $$
DECLARE
    v_order_id INT;
    v_total_amount DECIMAL(12,2) := 0;
    v_item JSONB;
BEGIN
    -- Rendelés létrehozás
    INSERT INTO orders (customer_id, order_date, status)
    VALUES (p_customer_id, NOW(), 'pending')
    RETURNING id INTO v_order_id;
    
    -- Minden tétel feldolgozása
    FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
    LOOP
        -- Order item hozzáadás és összeg számítás
        INSERT INTO order_items (order_id, product_id, quantity, unit_price)
        SELECT v_order_id, (v_item->>'product_id')::INT, 
               (v_item->>'quantity')::INT, p.price
        FROM products p 
        WHERE p.id = (v_item->>'product_id')::INT;
        
        v_total_amount := v_total_amount + 
            ((v_item->>'quantity')::INT * 
             (SELECT price FROM products WHERE id = (v_item->>'product_id')::INT));
    END LOOP;
    
    -- Rendelés finalizálás
    UPDATE orders 
    SET total_amount = v_total_amount, status = 'confirmed'
    WHERE id = v_order_id;
    
    RETURN QUERY SELECT v_order_id, v_total_amount, 'Order processed successfully'::TEXT;
END;
$$ LANGUAGE plpgsql;

-- Procedure használat
SELECT create_user('John Doe', 'john@example.com', 25.00);
SELECT * FROM process_order(1, '[{"product_id": 1, "quantity": 2}]'::jsonb);
```
*Figyeld meg: exception handling és transaction management beépítve a procedure-ökbe.*

</div>

<div class="concept-section interview-pitfalls" data-filter="procedures">

<details>
<summary>💼 <strong>Interjú buktatók</strong></summary>

<div>

- **"Mikor használnál stored procedure-t?"** → Komplex business logic, batch processing, security
- **"Mi a stored procedure hátránya?"** → Vendor lock-in, nehéz debugging, változtatás csak DB admin-nal
- **"Hogyan kezelnél hibákat stored procedure-ben?"** → Exception handling, ROLLBACK, logging

</div>

</details>

</div>

### Functions {#functions}

<div class="concept-section mental-model" data-filter="functions junior">

📋 **Fogalom meghatározása**  
*A **Function** egy újrafelhasználható kódblokk, amely input paramétereket fogad és RETURNS clause-zal definiált értéket ad vissza. **Scalar function** egyetlen értéket (INT, DECIMAL, VARCHAR), **Table-valued function** result set-et (RETURNS TABLE vagy SETOF) ad vissza. Használható SELECT, WHERE, JOIN feltételekben. **Deterministic** (pure) vs **Non-deterministic** (NOW(), RANDOM()). **Inline** function-ök (SQL) vs **Procedural** (PL/pgSQL, PL/SQL). IMMUTABLE, STABLE, VOLATILE meghatározza az optimization lehetőségeket.*

</div>

<div class="concept-section why-important" data-filter="functions junior">

💡 **Miért számít?**
- **Code reuse**: gyakori számítások centralizálása
- **Complex logic**: nehéz üzleti szabályok beágyazása query-kbe
- **Performance**: optimalizált számítások az adatbázis szintjén
- **Consistency**: ugyanaz a logika minden alkalmazásban

</div>

<div class="runnable-model" data-filter="functions junior">

**Runnable mental model**
```sql
-- Scalar Function - egyetlen érték visszaadása
CREATE OR REPLACE FUNCTION calculate_discount(
    original_price DECIMAL(10,2),
    discount_percent INT
) RETURNS DECIMAL(10,2) AS $$
BEGIN
    IF discount_percent < 0 OR discount_percent > 100 THEN
        RAISE EXCEPTION 'Discount percent must be between 0 and 100';
    END IF;
    
    RETURN original_price * (100 - discount_percent) / 100;
END;
$$ LANGUAGE plpgsql;

-- Business logic function
CREATE OR REPLACE FUNCTION get_customer_tier(customer_id INT) 
RETURNS VARCHAR(20) AS $$
DECLARE
    total_spent DECIMAL(12,2);
    order_count INT;
BEGIN
    SELECT 
        COALESCE(SUM(total_amount), 0),
        COUNT(*)
    INTO total_spent, order_count
    FROM orders 
    WHERE customer_id = get_customer_tier.customer_id 
    AND status IN ('confirmed', 'delivered');
    
    IF total_spent >= 5000 AND order_count >= 20 THEN
        RETURN 'PLATINUM';
    ELSIF total_spent >= 2000 AND order_count >= 10 THEN
        RETURN 'GOLD';
    ELSIF total_spent >= 500 AND order_count >= 5 THEN
        RETURN 'SILVER';
    ELSE
        RETURN 'BRONZE';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Table-Valued Function - táblázat visszaadása
CREATE OR REPLACE FUNCTION get_customer_orders(
    p_customer_id INT,
    p_limit INT DEFAULT 10
) RETURNS TABLE(
    order_id INT,
    order_date DATE,
    total_amount DECIMAL(12,2),
    status VARCHAR(20),
    item_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        o.id,
        o.order_date::DATE,
        o.total_amount,
        o.status,
        COUNT(oi.product_id)
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    WHERE o.customer_id = p_customer_id
    GROUP BY o.id, o.order_date, o.total_amount, o.status
    ORDER BY o.order_date DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- Function használat query-kben
SELECT 
    name,
    get_customer_tier(id) as tier,
    calculate_discount(credit_balance, 10) as discounted_credit
FROM users 
WHERE get_customer_tier(id) IN ('GOLD', 'PLATINUM');

-- Table function használat
SELECT * FROM get_customer_orders(1, 5);
```
*Figyeld meg: table-valued function-ök összetett adatokat adnak vissza structured formában.*

</div>

<div class="concept-section myths" data-filter="functions">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Function-ök mindig gyorsak." → Komplex function-ök lassíthatják a query-ket
- „Function-ben nem lehet módosítani adatokat." → Stored function-ök tudnak INSERT/UPDATE/DELETE-et
- „Function ugyanaz mint procedure." → Function return értékkel rendelkezik, procedure nem feltétlenül

</div>

</details>

</div>

### Sequences és Auto Increment {#sequences-auto-increment}

<div class="concept-section mental-model" data-filter="sequences junior">

📋 **Fogalom meghatározása**  
*A **Sequence** egy adatbázis objektum, amely egyedi, egymást követő számokat generál thread-safe módon. Paréméterek: START WITH (kezdőérték), INCREMENT BY (lépésköz), MINVALUE/MAXVALUE (tartomány), CACHE (előre generált értékek száma), CYCLE (MAX után újrakezdés). **SERIAL** (PostgreSQL) és **AUTO_INCREMENT** (MySQL) shorthand syntax sequence-hez kötött PRIMARY KEY-hez. nextval() kéri a következő értéket, currval() az aktuálist, setval() állítja. UUID alternativa globally unique identifiers-hez.*

</div>

<div class="concept-section why-important" data-filter="sequences junior">

💡 **Miért számít?**
- **Unique identifiers**: automatikus egyedi azonosítók generálása
- **Concurrent safety**: többfelhasználós környezetben biztonságos
- **Custom numbering**: összetett sorszámozási sémák (pl. INV-001, ORD-2024-0001)
- **Performance**: gyors ID generálás lock-ok nélkül

</div>

<div class="runnable-model" data-filter="sequences junior">

**Runnable mental model**
```sql
-- Egyszerű SERIAL (auto-increment)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,           -- Automatikus 1, 2, 3, 4...
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Custom sequence parameters
CREATE SEQUENCE order_number_seq
    START WITH 1000              -- Kezdőérték
    INCREMENT BY 1               -- Lépésköz
    MINVALUE 1000               -- Minimum érték
    MAXVALUE 999999             -- Maximum érték
    CACHE 50                    -- Cache-elt értékek száma
    CYCLE;                      -- Max után újrakezdés

-- Custom numbering schemes
CREATE SEQUENCE invoice_seq START 100000 INCREMENT 1;

CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,
    invoice_number VARCHAR(20) DEFAULT ('INV-' || TO_CHAR(nextval('invoice_seq'), 'FM000000')),
    customer_id INT NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    issue_date DATE DEFAULT CURRENT_DATE
);

-- UUID alternative to sequences
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE documents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,  -- Random UUID
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Sequence operations
SELECT nextval('users_id_seq');           -- Next value
SELECT currval('users_id_seq');           -- Current value
SELECT setval('users_id_seq', 1000);      -- Set sequence value

-- Reset sequence to table's max value
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
```
*Figyeld meg: sequence-ek transaction-safe és concurrent access esetén is unique értékeket generálnak.*

</div>

<div class="concept-section myths" data-filter="sequences">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Sequence értékek mindig egymást követők." → Rollback vagy concurrent access miatt lehetnek hézagok
- „SERIAL automatikusan primary key." → SERIAL csak auto-increment, PRIMARY KEY külön kell
- „Sequence restart automatikus évente." → Manuálisan kell kezelni az év alapú újrakezdést

</div>

</details>

</div>

### Default Értékek {#default-ertekek}

<div class="concept-section definition" data-filter="schema junior">

📋 **Fogalom meghatározása**  
**Column default value** specification: auto-populated on INSERT when no explicit value provided. **Types**: **literal constants** (0, 'active', FALSE), **functions** (CURRENT_TIMESTAMP, NOW(), UUID_GENERATE_V4()), **expressions** (calculations, concatenations). **Syntax**: DEFAULT keyword in CREATE TABLE. **ALTER TABLE** allows ADD/DROP DEFAULT. **NULL vs DEFAULT**: explicit NULL overrides default, omitted column uses default. PostgreSQL: supports complex expressions (e.g., DEFAULT (price * 1.2)). Use cases: timestamps (created_at), status flags, counters, sequential IDs (with sequences/serial types).

</div>

<div class="concept-section why-important" data-filter="schema junior">

💡 **Miért számít?**
- **Data consistency**: konzisztens alapértékek az egész alkalmazásban
- **User experience**: kevesebb kötelező mező, gyorsabb adatbevitel
- **Application logic**: egyszerűbb kód, mert nem kell minden mezőt kezelni
- **Business rules**: automatikus értékek üzleti szabályok szerint

</div>

<div class="runnable-model" data-filter="schema junior">

**Runnable mental model**
```sql
-- Egyszerű default értékek
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
-- status='active', created_at=now(), is_verified=false automatikusan

-- Default értékek módosítása
ALTER TABLE users ALTER COLUMN status SET DEFAULT 'pending';
ALTER TABLE users ALTER COLUMN credit_balance DROP DEFAULT;
```
*Figyeld meg: funkciók, szekvenciák és számított értékek is használhatók default értékeknek.*

</div>

### Aggregáció Advanced {#aggregacio-advanced}

<div class="concept-section definition" data-filter="aggregation medior">

📋 **Fogalom meghatározása**  
**Advanced aggregation functions**: **ROLLUP** (hierarchical subtotals, e.g., category → total), **CUBE** (all combinations of grouping columns), **GROUPING SETS** (custom subtotal combinations). **FILTER clause**: conditional aggregation (COUNT(*) FILTER (WHERE status='active')). **WITHIN GROUP**: ordered-set aggregates (percentile_cont, mode). **Window functions**: RANK(), ROW_NUMBER(), LEAD(), LAG(), aggregates OVER (PARTITION BY ... ORDER BY ...). **HAVING clause**: filter after aggregation (vs WHERE before). Use cases: sales reports with subtotals, cohort analysis, time-series analytics, moving averages, YoY comparisons.

</div>

<div class="concept-section why-important" data-filter="aggregation medior">

💡 **Miért számít?**
- **Business intelligence**: komplex riportok és dashboardok alapja
- **Data analysis**: trend analysis, cohort analysis, customer segmentation
- **Performance**: egy query-ben végzi el a komplex számításokat
- **Conditional aggregation**: különböző feltételekkel egy időben összesít

</div>

<div class="runnable-model" data-filter="aggregation medior">

**Runnable mental model**
```sql
-- GROUP BY ROLLUP - részösszegek hierarchikusan
SELECT 
    COALESCE(category, 'TOTAL') as category,
    COALESCE(status, 'ALL_STATUS') as status,
    COUNT(*) as product_count,
    AVG(price) as avg_price,
    SUM(price * stock_quantity) as total_inventory_value
FROM products
GROUP BY ROLLUP(category, status)
ORDER BY category NULLS LAST, status NULLS LAST;

-- GROUP BY CUBE - minden kombináció
SELECT 
    COALESCE(EXTRACT(YEAR FROM order_date)::TEXT, 'ALL_YEARS') as year,
    COALESCE(EXTRACT(MONTH FROM order_date)::TEXT, 'ALL_MONTHS') as month,
    COALESCE(status, 'ALL_STATUS') as status,
    COUNT(*) as order_count,
    SUM(total_amount) as revenue
FROM orders
WHERE order_date >= '2023-01-01'
GROUP BY CUBE(EXTRACT(YEAR FROM order_date), EXTRACT(MONTH FROM order_date), status)
ORDER BY year NULLS LAST, month NULLS LAST, status NULLS LAST;

-- HAVING with complex conditions
SELECT 
    customer_id,
    COUNT(*) as order_count,
    SUM(total_amount) as total_spent,
    AVG(total_amount) as avg_order_value,
    MAX(total_amount) as largest_order
FROM orders
WHERE order_date >= '2024-01-01'
GROUP BY customer_id
HAVING COUNT(*) >= 3                          -- Legalább 3 rendelés
   AND SUM(total_amount) > 1000               -- Összesen több mint $1000
   AND AVG(total_amount) > 100                -- Átlag rendelés > $100
   AND MAX(total_amount) - MIN(total_amount) > 50  -- Rendelések közti variancia
ORDER BY total_spent DESC;

-- Conditional aggregation - FILTER és CASE
SELECT 
    customer_id,
    COUNT(*) as total_orders,
    COUNT(*) FILTER (WHERE status = 'completed') as completed_orders,
    COUNT(*) FILTER (WHERE status = 'cancelled') as cancelled_orders,
    SUM(total_amount) FILTER (WHERE status = 'completed') as completed_revenue,
    
    -- CASE alapú conditional aggregation
    SUM(CASE WHEN status = 'completed' THEN total_amount ELSE 0 END) as revenue_completed,
    SUM(CASE WHEN order_date >= CURRENT_DATE - INTERVAL '30 days' THEN total_amount ELSE 0 END) as revenue_last_30_days,
    
    -- Percentage calculations
    ROUND(
        COUNT(*) FILTER (WHERE status = 'completed') * 100.0 / COUNT(*), 2
    ) as completion_rate_percent
FROM orders
GROUP BY customer_id
HAVING COUNT(*) >= 5;

-- String aggregation
SELECT 
    customer_id,
    STRING_AGG(DISTINCT status, ', ' ORDER BY status) as all_statuses,
    STRING_AGG(
        order_id::TEXT || ':$' || total_amount::TEXT, 
        ' | ' 
        ORDER BY order_date DESC
    ) as order_history,
    ARRAY_AGG(DISTINCT EXTRACT(MONTH FROM order_date)::INT ORDER BY EXTRACT(MONTH FROM order_date)) as order_months
FROM orders
WHERE customer_id IN (1, 2, 3)
GROUP BY customer_id;

-- Complex business metrics
WITH monthly_cohorts AS (
    SELECT 
        DATE_TRUNC('month', u.created_at) as cohort_month,
        DATE_TRUNC('month', o.order_date) as order_month,
        u.id as user_id,
        o.total_amount
    FROM users u
    LEFT JOIN orders o ON u.id = o.customer_id
    WHERE u.created_at >= '2024-01-01'
)
SELECT 
    cohort_month,
    order_month,
    COUNT(DISTINCT user_id) as active_users,
    SUM(total_amount) as revenue,
    COUNT(DISTINCT user_id) FILTER (WHERE total_amount > 0) as paying_users,
    ROUND(AVG(total_amount), 2) as avg_revenue_per_user
FROM monthly_cohorts
GROUP BY cohort_month, order_month
ORDER BY cohort_month, order_month;

-- Window functions with aggregation
SELECT 
    category_id,
    product_name,
    price,
    stock_quantity,
    AVG(price) OVER (PARTITION BY category_id) as category_avg_price,
    SUM(stock_quantity) OVER (PARTITION BY category_id) as category_total_stock,
    RANK() OVER (PARTITION BY category_id ORDER BY price DESC) as price_rank_in_category,
    PERCENT_RANK() OVER (ORDER BY price) as price_percentile_overall
FROM products
WHERE status = 'active';
```
*Figyeld meg: ROLLUP, CUBE és FILTER lehetővé teszik a multi-dimenziós elemzéseket.*

</div>

### Query Optimization {#query-optimization}

<div class="concept-section definition" data-filter="performance medior">

📋 **Fogalom meghatározása**  
**Systematic performance improvement** via **EXPLAIN ANALYZE** (execution plan, actual timing, row counts, buffer usage). **Strategies**: **index optimization** (composite indexes, covering indexes, partial indexes), **query rewriting** (avoid SELECT *, limit result sets, use EXISTS vs IN), **join optimization** (join order matters, INNER JOIN before LEFT JOIN), **statistics update** (ANALYZE command for query planner). **Cost metrics**: Seq Scan (full table) vs Index Scan vs Index Only Scan, nested loops vs hash join vs merge join. **Monitoring**: slow query log, pg_stat_statements. Tools: EXPLAIN (ANALYZE, BUFFERS, VERBOSE). Modern: query planner hints (PostgreSQL extended stats).

</div>

<div class="concept-section why-important" data-filter="performance medior">

💡 **Miért számít?**
- **Application performance**: lassú query-k blokkolják az egész alkalmazást
- **Resource utilization**: CPU, memory, I/O optimalizálás
- **User experience**: gyors válaszidők jobb UX-et jelentenek
- **Cost optimization**: kevesebb szerver resource, alacsonyabb cloud költségek

</div>

<div class="runnable-model" data-filter="performance medior">

**Runnable mental model**
```sql
-- EXPLAIN ANALYZE - execution plan elemzés
EXPLAIN (ANALYZE, BUFFERS, VERBOSE)
SELECT u.name, o.total_amount, p.name as product_name
FROM users u
JOIN orders o ON u.id = o.customer_id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE o.order_date >= '2024-01-01'
AND u.status = 'active'
ORDER BY o.total_amount DESC;

-- Index optimization strategies
-- 1. Single column indexes
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_date ON orders(order_date);
CREATE INDEX idx_users_status ON users(status);

-- 2. Composite indexes (column order matters!)
CREATE INDEX idx_orders_date_customer ON orders(order_date, customer_id);
CREATE INDEX idx_orders_customer_date_amount ON orders(customer_id, order_date, total_amount);

-- 3. Covering indexes (include columns)
CREATE INDEX idx_orders_covering 
ON orders(customer_id, order_date) 
INCLUDE (total_amount, status);

-- 4. Partial indexes - conditional
CREATE INDEX idx_active_users_email ON users(email) 
WHERE status = 'active';

CREATE INDEX idx_large_orders ON orders(order_date, customer_id) 
WHERE total_amount > 1000;

-- 5. Functional indexes
CREATE INDEX idx_users_lower_email ON users(LOWER(email));
CREATE INDEX idx_orders_year ON orders(EXTRACT(YEAR FROM order_date));

-- Query rewriting for performance
-- ❌ SLOW - function on column
SELECT * FROM orders 
WHERE EXTRACT(YEAR FROM order_date) = 2024;

-- ✅ FAST - range condition
SELECT * FROM orders 
WHERE order_date >= '2024-01-01' 
AND order_date < '2025-01-01';

-- ❌ SLOW - OR conditions
SELECT * FROM products 
WHERE name LIKE '%phone%' OR description LIKE '%phone%';

-- ✅ FAST - separate queries + UNION
SELECT * FROM products WHERE name LIKE '%phone%'
UNION
SELECT * FROM products WHERE description LIKE '%phone%' AND name NOT LIKE '%phone%';

-- ❌ SLOW - correlated subquery
SELECT u.name, 
       (SELECT COUNT(*) FROM orders o WHERE o.customer_id = u.id) as order_count
FROM users u;

-- ✅ FAST - JOIN with aggregation
SELECT u.name, COALESCE(o.order_count, 0) as order_count
FROM users u
LEFT JOIN (
    SELECT customer_id, COUNT(*) as order_count
    FROM orders
    GROUP BY customer_id
) o ON u.id = o.customer_id;

-- Pagination optimization
-- ❌ SLOW - OFFSET for large datasets
SELECT * FROM orders 
ORDER BY order_date DESC 
OFFSET 10000 LIMIT 20;

-- ✅ FAST - cursor-based pagination
SELECT * FROM orders 
WHERE order_date < '2024-03-15 10:30:00'  -- Last seen timestamp
ORDER BY order_date DESC 
LIMIT 20;

-- JOIN optimization
-- ❌ SLOW - no index on join columns
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.email = o.customer_email  -- String join, no index
GROUP BY u.name;

-- ✅ FAST - indexed foreign key join
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.customer_id  -- Indexed FK join
GROUP BY u.name;

-- Subquery optimization
-- ❌ SLOW - EXISTS with complex subquery
SELECT * FROM products p
WHERE EXISTS (
    SELECT 1 FROM order_items oi 
    JOIN orders o ON oi.order_id = o.id
    WHERE oi.product_id = p.id 
    AND o.order_date >= '2024-01-01'
);

-- ✅ FAST - JOIN with DISTINCT
SELECT DISTINCT p.*
FROM products p
JOIN order_items oi ON p.id = oi.product_id
JOIN orders o ON oi.order_id = o.id
WHERE o.order_date >= '2024-01-01';

-- Query hints and configuration
-- Set work_mem for complex sorts/aggregations
SET work_mem = '256MB';

-- Analyze query with increased statistics
ANALYZE products;
ANALYZE orders;

-- Monitoring slow queries
-- PostgreSQL: log_min_duration_statement
-- MySQL: slow_query_log

-- Index usage analysis
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan as index_scans,
    idx_tup_read as tuples_read,
    idx_tup_fetch as tuples_fetched
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;

-- Unused indexes detection
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan
FROM pg_stat_user_indexes
WHERE idx_scan = 0
AND indexname NOT LIKE '%_pkey';  -- Exclude primary keys
```
*Figyeld meg: minden optimalizáció trade-off - index gyorsítja a SELECT-et, de lassítja az INSERT/UPDATE-et.*

</div>

<div class="concept-section interview-pitfalls" data-filter="performance">

<details>
<summary>💼 <strong>Interjú buktatók</strong></summary>

<div>

- **"Hogyan optimalizálnál egy lassú query-t?"** → EXPLAIN ANALYZE, indexek, query rewrite, statistics update
- **"Mi a különbség covering index és composite index között?"** → Covering include-olja az oszlopokat, composite a WHERE/ORDER BY-hoz
- **"Mikor nem érdemes indexet létrehozni?"** → Kis táblák, gyakori INSERT/UPDATE, ritkán használt oszlopok

</div>

</details>

</div>

### Materialized Views {#materialized-views}

<div class="concept-section mental-model" data-filter="performance medior">

📋 **Fogalom meghatározása**  
*A **Materialized View** egy fizikailag tárolt query result set, ellentétben a reguláris view-val, amely csak a query definícióját tárolja. Előre kiszámítja és cache-eli a komplex aggregációkat, JOIN-okat és window functions-öket. REFRESH MATERIALIZED VIEW [CONCURRENTLY] frissíti az adatokat. Index-elhető a performance javításához. Trade-off: storage space és refresh overhead cserébe drastikusan gyorsabb olvasás read-heavy workload-oknál. Incremental refresh stratégiákkal optimalizálható nagy táblákhoz.*

</div>

<div class="concept-section why-important" data-filter="performance medior">

💡 **Miért számít?**
- **Performance boost**: komplex aggregációk előre kiszámítva
- **Reporting optimization**: dashboard-ok és riportok gyorsítása
- **Expensive operations**: JOIN-ok és aggregációk cache-elése
- **Data consistency**: periodikus refresh-sel friss adatok

</div>

<div class="runnable-model" data-filter="performance medior">

**Runnable mental model**
```sql
-- Egyszerű materialized view - customer summary
CREATE MATERIALIZED VIEW customer_summary AS
SELECT 
    u.id as customer_id,
    u.name,
    u.email,
    u.created_at as registration_date,
    COUNT(o.id) as total_orders,
    COALESCE(SUM(o.total_amount), 0) as total_spent,
    COALESCE(AVG(o.total_amount), 0) as avg_order_value,
    MAX(o.order_date) as last_order_date,
    CASE 
        WHEN SUM(o.total_amount) >= 5000 THEN 'VIP'
        WHEN SUM(o.total_amount) >= 1000 THEN 'Premium'
        WHEN SUM(o.total_amount) >= 100 THEN 'Regular'
        ELSE 'New'
    END as customer_tier
FROM users u
LEFT JOIN orders o ON u.id = o.customer_id
WHERE u.status = 'active'
GROUP BY u.id, u.name, u.email, u.created_at;

-- Index on materialized view for fast access
CREATE INDEX idx_customer_summary_tier ON customer_summary(customer_tier);
CREATE INDEX idx_customer_summary_spent ON customer_summary(total_spent DESC);

-- Complex materialized view - sales analytics
CREATE MATERIALIZED VIEW monthly_sales_analytics AS
WITH monthly_data AS (
    SELECT 
        DATE_TRUNC('month', o.order_date) as month,
        COUNT(DISTINCT o.id) as orders,
        COUNT(DISTINCT o.customer_id) as unique_customers,
        SUM(o.total_amount) as revenue,
        AVG(o.total_amount) as avg_order_value,
        SUM(oi.quantity) as items_sold
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    WHERE o.status IN ('confirmed', 'delivered')
    GROUP BY DATE_TRUNC('month', o.order_date)
)
SELECT 
    month,
    orders,
    unique_customers,
    revenue,
    avg_order_value,
    items_sold,
    LAG(revenue) OVER (ORDER BY month) as prev_month_revenue,
    revenue - LAG(revenue) OVER (ORDER BY month) as revenue_growth,
    ROUND(
        (revenue - LAG(revenue) OVER (ORDER BY month)) / 
        LAG(revenue) OVER (ORDER BY month) * 100, 2
    ) as growth_percentage
FROM monthly_data
ORDER BY month;

-- Product performance materialized view
CREATE MATERIALIZED VIEW product_performance AS
SELECT 
    p.id as product_id,
    p.name as product_name,
    p.category_id,
    c.name as category_name,
    p.price,
    p.stock_quantity,
    COALESCE(sales.total_sold, 0) as total_units_sold,
    COALESCE(sales.total_revenue, 0) as total_revenue,
    COALESCE(sales.avg_sale_price, p.price) as avg_sale_price,
    COALESCE(sales.last_sale_date, p.created_at) as last_sale_date,
    CASE 
        WHEN sales.last_sale_date IS NULL THEN 'Never Sold'
        WHEN sales.last_sale_date < CURRENT_DATE - INTERVAL '90 days' THEN 'Stale'
        WHEN sales.total_sold >= 100 THEN 'Best Seller'
        WHEN sales.total_sold >= 10 THEN 'Good Seller'
        ELSE 'Slow Seller'
    END as performance_category
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN (
    SELECT 
        oi.product_id,
        SUM(oi.quantity) as total_sold,
        SUM(oi.quantity * oi.unit_price) as total_revenue,
        AVG(oi.unit_price) as avg_sale_price,
        MAX(o.order_date) as last_sale_date
    FROM order_items oi
    JOIN orders o ON oi.order_id = o.id
    WHERE o.status IN ('confirmed', 'delivered')
    GROUP BY oi.product_id
) sales ON p.id = sales.product_id
WHERE p.status = 'active';

-- Materialized view usage
SELECT * FROM customer_summary 
WHERE customer_tier IN ('VIP', 'Premium')
ORDER BY total_spent DESC;

SELECT 
    category_name,
    COUNT(*) as product_count,
    SUM(total_units_sold) as category_units_sold,
    AVG(total_revenue) as avg_product_revenue
FROM product_performance
GROUP BY category_name
ORDER BY category_units_sold DESC;

-- Refresh strategies
-- Manual refresh
REFRESH MATERIALIZED VIEW customer_summary;

-- Concurrent refresh (no locking)
REFRESH MATERIALIZED VIEW CONCURRENTLY customer_summary;

-- Automated refresh with function
CREATE OR REPLACE FUNCTION refresh_analytics_views()
RETURNS VOID AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY customer_summary;
    REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_sales_analytics;
    REFRESH MATERIALIZED VIEW CONCURRENTLY product_performance;
    
    -- Log refresh
    INSERT INTO view_refresh_log (view_name, refresh_date)
    VALUES ('analytics_views', NOW());
END;
$$ LANGUAGE plpgsql;

-- Schedule refresh (requires pg_cron extension)
-- SELECT cron.schedule('refresh-analytics', '0 2 * * *', 'SELECT refresh_analytics_views();');

-- Incremental refresh strategy (custom implementation)
CREATE MATERIALIZED VIEW customer_summary_incremental AS
SELECT 
    customer_id,
    name,
    total_orders,
    total_spent,
    customer_tier,
    last_updated
FROM customer_summary_base
WHERE last_updated >= CURRENT_DATE - INTERVAL '1 day';

-- Performance comparison
-- Normal view (always recalculates)
EXPLAIN ANALYZE SELECT * FROM customer_analytics_view WHERE customer_tier = 'VIP';

-- Materialized view (pre-calculated)
EXPLAIN ANALYZE SELECT * FROM customer_summary WHERE customer_tier = 'VIP';

-- Materialized view maintenance
-- Check view size
SELECT 
    schemaname,
    matviewname,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||matviewname)) as size
FROM pg_matviews;

-- Drop materialized view
DROP MATERIALIZED VIEW IF EXISTS old_analytics_view;
```
*Figyeld meg: materialized view-k trade-off storage space-ért cserébe performance-t.*

</div>

<div class="concept-section myths" data-filter="performance">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Materialized view mindig gyorsabb." → Refresh költséges, kis adatmennyiségnél nem éri meg
- „Materialized view automatikusan frissül." → Manuális vagy scheduled refresh szükséges
- „Materialized view nem indexelhető." → Indexek létrehozhatók a performance javításához

</div>

</details>

</div>

### Locking Mechanizmusok {#locking-mechanizmusok}

<div class="concept-section mental-model" data-filter="locking medior">

📋 **Fogalom meghatározása**  
*A **Database Locking** mechanizmusok szabják a concurrent transaction-ök erőforrás-hozzáférését az adatkonzisztencia biztosítása érdekében. **Lock szintek**: table-level (SHARE, EXCLUSIVE), row-level (FOR UPDATE, FOR SHARE). **Deadlock**: két tranzakció körkörösen várja egymás lockjait - megoldás konzisztens lock ordering és lock_timeout. **Advisory locks**: alkalmazás-szintű koordináció kritikus műveletek exkluzív végrehajtásához. Lock escalation és lock contention csökkentése batch processing-gel.*

</div>

<div class="concept-section why-important" data-filter="locking medior">

💡 **Miért számít?**
- **Data consistency**: több felhasználó egyidejű hozzáférésének szabályozása
- **Deadlock prevention**: körkörös várakozás elkerülése
- **Performance impact**: rossz locking strategy blokkolhatja az alkalmazást
- **Transaction isolation**: különböző izolációs szintek különböző lock stratégiákat igényelnek

</div>

<div class="runnable-model" data-filter="locking medior">

**Runnable mental model**
```sql
-- Table-level locks
-- Share lock - read access, blocks writes
BEGIN;
LOCK TABLE products IN SHARE MODE;
SELECT * FROM products WHERE category_id = 1;
-- Other sessions can read, but cannot write
COMMIT;

-- Exclusive lock - blocks all access
BEGIN;
LOCK TABLE products IN EXCLUSIVE MODE;
DELETE FROM products WHERE status = 'discontinued';
-- Other sessions must wait
COMMIT;

-- Row-level locks
-- FOR UPDATE - exclusive row lock
BEGIN;
SELECT * FROM inventory 
WHERE product_id = 123 
FOR UPDATE;  -- Lock this specific row

-- Modify with exclusive access
UPDATE inventory 
SET quantity = quantity - 5 
WHERE product_id = 123;
COMMIT;

-- FOR SHARE - shared row lock
BEGIN;
SELECT price FROM products 
WHERE id = 123 
FOR SHARE;  -- Allow other reads, block writes

-- Other session can read but not modify
SELECT * FROM products WHERE id = 123 FOR SHARE;  -- OK
-- UPDATE products SET price = 100 WHERE id = 123;  -- BLOCKS
COMMIT;

-- Practical locking example - order processing
CREATE OR REPLACE FUNCTION safe_order_processing(
    p_customer_id INT,
    p_product_id INT,
    p_quantity INT
) RETURNS BOOLEAN AS $$
DECLARE
    v_available_stock INT;
    v_customer_credit DECIMAL(10,2);
    v_product_price DECIMAL(10,2);
BEGIN
    -- Lock customer record for credit check
    SELECT credit_balance INTO v_customer_credit
    FROM users 
    WHERE id = p_customer_id 
    FOR UPDATE;  -- Prevent other transactions from modifying credit
    
    -- Lock product record for stock check
    SELECT stock_quantity, price INTO v_available_stock, v_product_price
    FROM products 
    WHERE id = p_product_id 
    FOR UPDATE;  -- Prevent other transactions from changing stock
    
    -- Validation
    IF v_available_stock < p_quantity THEN
        RAISE EXCEPTION 'Insufficient stock: % available, % requested', 
                        v_available_stock, p_quantity;
    END IF;
    
    IF v_customer_credit < (v_product_price * p_quantity) THEN
        RAISE EXCEPTION 'Insufficient credit: % available, % required', 
                        v_customer_credit, (v_product_price * p_quantity);
    END IF;
    
    -- Process order (atomic operations with locks held)
    UPDATE products 
    SET stock_quantity = stock_quantity - p_quantity 
    WHERE id = p_product_id;
    
    UPDATE users 
    SET credit_balance = credit_balance - (v_product_price * p_quantity)
    WHERE id = p_customer_id;
    
    INSERT INTO orders (customer_id, total_amount, status)
    VALUES (p_customer_id, v_product_price * p_quantity, 'confirmed');
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Deadlock example and prevention
-- Session 1:
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;  -- Lock account 1
-- UPDATE accounts SET balance = balance + 100 WHERE id = 2;  -- Wait for account 2

-- Session 2 (simultaneously):
BEGIN;
UPDATE accounts SET balance = balance - 50 WHERE id = 2;   -- Lock account 2
-- UPDATE accounts SET balance = balance + 50 WHERE id = 1;   -- Wait for account 1
-- DEADLOCK DETECTED!

-- Deadlock prevention - consistent lock ordering
CREATE OR REPLACE FUNCTION transfer_money_safe(
    from_account_id INT,
    to_account_id INT,
    amount DECIMAL(10,2)
) RETURNS VOID AS $$
DECLARE
    first_id INT;
    second_id INT;
BEGIN
    -- Always lock accounts in ascending ID order
    IF from_account_id < to_account_id THEN
        first_id := from_account_id;
        second_id := to_account_id;
    ELSE
        first_id := to_account_id;
        second_id := from_account_id;
    END IF;
    
    -- Lock in consistent order
    PERFORM * FROM accounts WHERE id = first_id FOR UPDATE;
    PERFORM * FROM accounts WHERE id = second_id FOR UPDATE;
    
    -- Perform transfer
    UPDATE accounts SET balance = balance - amount WHERE id = from_account_id;
    UPDATE accounts SET balance = balance + amount WHERE id = to_account_id;
END;
$$ LANGUAGE plpgsql;

-- Lock timeout configuration
SET lock_timeout = '10s';  -- Maximum wait time for locks

-- Lock monitoring
-- PostgreSQL: check current locks
SELECT 
    pid,
    usename,
    query,
    mode,
    granted,
    query_start
FROM pg_locks l
JOIN pg_stat_activity a ON l.pid = a.pid
WHERE NOT granted  -- Show blocked transactions
ORDER BY query_start;

-- Kill blocking session (if necessary)
-- SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE pid = 12345;

-- Advisory locks - application-level coordination
-- Acquire exclusive advisory lock
SELECT pg_advisory_lock(12345);

-- Critical section - only one session can execute this
-- Perform exclusive operation here

-- Release advisory lock
SELECT pg_advisory_unlock(12345);

-- Try lock (non-blocking)
SELECT pg_try_advisory_lock(12345);  -- Returns true if acquired, false if busy

-- Named advisory locks
SELECT pg_advisory_lock('inventory_update');
-- Critical inventory operation
SELECT pg_advisory_unlock('inventory_update');

-- Lock escalation prevention
-- Batch operations with smaller chunks
DO $$
DECLARE
    batch_size INT := 1000;
    processed INT := 0;
BEGIN
    LOOP
        UPDATE products 
        SET updated_at = NOW() 
        WHERE id IN (
            SELECT id FROM products 
            WHERE updated_at < CURRENT_DATE - INTERVAL '30 days'
            LIMIT batch_size
        );
        
        GET DIAGNOSTICS processed = ROW_COUNT;
        EXIT WHEN processed = 0;
        
        -- Give other transactions a chance
        COMMIT;
        BEGIN;
    END LOOP;
END $$;
```
*Figyeld meg: konzisztens lock ordering és timeout beállítások kritikusak a deadlock elkerüléshez.*

</div>

### Database Security {#database-security}

<div class="concept-section definition" data-filter="security medior">

📋 **Fogalom meghatározása**  
**Multi-layered protection**: **Authentication** (verify identity), **Authorization** (GRANT/REVOKE privileges), **Encryption** (at-rest: TDE, in-transit: SSL/TLS). **RBAC** (Role-Based Access Control): CREATE ROLE, GRANT role TO user, hierarchical roles. **Row-level security (RLS)**: policy-based row filtering (CREATE POLICY). **Audit logging**: track all database operations (pg_audit extension). **SQL injection prevention**: parameterized queries, prepared statements. **Principle of least privilege**: minimal necessary permissions. **Column-level encryption**: sensitive data (PII, PCI-DSS). **Connection security**: IP whitelisting, VPN, SSL certificates. Compliance: GDPR, HIPAA, SOX requirements.

</div>

<div class="concept-section why-important" data-filter="security medior">

💡 **Miért számít?**
- **Data protection**: személyes és üzleti adatok védelme
- **Compliance**: GDPR, HIPAA, SOX megfelelőség
- **Access control**: fine-grained jogosultságkezelés
- **Audit trail**: ki mit csinált nyomon követése

</div>

<div class="runnable-model" data-filter="security medior">

**Runnable mental model**
```sql
-- Role-based access control
-- Create roles
CREATE ROLE app_readonly;
CREATE ROLE app_readwrite;
CREATE ROLE app_admin;
CREATE ROLE report_user;

-- Grant permissions to roles
-- Read-only role
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_readonly;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO app_readonly;

-- Read-write role
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO app_readwrite;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_readwrite;
-- Restrict DELETE access
GRANT DELETE ON orders, order_items TO app_readwrite;  -- Business tables only

-- Admin role
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO app_admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO app_admin;

-- Create users and assign roles
CREATE USER app_service WITH PASSWORD 'secure_password_123!';
CREATE USER report_service WITH PASSWORD 'report_pass_456!';
CREATE USER admin_user WITH PASSWORD 'admin_pass_789!';

-- Assign roles to users
GRANT app_readwrite TO app_service;
GRANT report_user TO report_service;
GRANT app_admin TO admin_user;

-- Row-level security (RLS)
-- Enable RLS on sensitive table
ALTER TABLE user_data ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY user_data_policy ON user_data
FOR ALL
TO app_service
USING (user_id = current_setting('app.current_user_id')::INT);

-- Policy for admins (see all data)
CREATE POLICY admin_full_access ON user_data
FOR ALL
TO app_admin
USING (TRUE);

-- Department-based access policy
CREATE POLICY department_access ON employee_data
FOR SELECT
TO hr_role
USING (department = current_setting('app.user_department'));

-- SQL Injection prevention
-- ❌ VULNERABLE - String concatenation
-- query = "SELECT * FROM users WHERE email = '" + userInput + "'";

-- ✅ SECURE - Parameterized queries
-- PreparedStatement stmt = connection.prepareStatement("SELECT * FROM users WHERE email = ?");
-- stmt.setString(1, userInput);

-- Stored procedure with input validation
CREATE OR REPLACE FUNCTION secure_user_lookup(p_email TEXT)
RETURNS TABLE(id INT, name VARCHAR(100), email VARCHAR(255)) AS $$
BEGIN
    -- Input validation
    IF p_email IS NULL OR LENGTH(p_email) = 0 THEN
        RAISE EXCEPTION 'Email parameter is required';
    END IF;
    
    IF p_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
        RAISE EXCEPTION 'Invalid email format';
    END IF;
    
    -- Audit log
    INSERT INTO security_audit (action, email_searched, search_time, user_role)
    VALUES ('USER_LOOKUP', p_email, NOW(), current_user);
    
    -- Safe query
    RETURN QUERY
    SELECT u.id, u.name, u.email
    FROM users u
    WHERE u.email = p_email
    AND u.status = 'active';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Data encryption
-- Column-level encryption for sensitive data
CREATE TABLE customer_sensitive (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    ssn_encrypted BYTEA,  -- Encrypted social security number
    credit_card_encrypted BYTEA,  -- Encrypted credit card
    encryption_key_id INT,
    created_at TIMESTAMP DEFAULT NOW(),
    
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- Encryption functions (simplified example)
CREATE OR REPLACE FUNCTION encrypt_sensitive_data(
    plain_text TEXT,
    key_id INT DEFAULT 1
) RETURNS BYTEA AS $$
BEGIN
    -- In real implementation, use proper encryption library
    -- This is a simplified example
    RETURN encode(digest(plain_text || (SELECT key_value FROM encryption_keys WHERE id = key_id), 'sha256'), 'hex')::BYTEA;
END;
$$ LANGUAGE plpgsql;

-- Audit logging
CREATE TABLE security_audit (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL DEFAULT current_user,
    action VARCHAR(50) NOT NULL,
    table_name VARCHAR(100),
    record_id INT,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    timestamp TIMESTAMP DEFAULT NOW()
);

-- Audit trigger function
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        INSERT INTO security_audit (action, table_name, record_id, old_values)
        VALUES (TG_OP, TG_TABLE_NAME, OLD.id, row_to_json(OLD));
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO security_audit (action, table_name, record_id, old_values, new_values)
        VALUES (TG_OP, TG_TABLE_NAME, NEW.id, row_to_json(OLD), row_to_json(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO security_audit (action, table_name, record_id, new_values)
        VALUES (TG_OP, TG_TABLE_NAME, NEW.id, row_to_json(NEW));
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Apply audit trigger to sensitive tables
CREATE TRIGGER users_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON users
FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- Data masking for non-production environments
CREATE VIEW users_masked AS
SELECT 
    id,
    name,
    CASE 
        WHEN current_setting('app.environment') = 'production' THEN email
        ELSE SUBSTRING(email, 1, 3) || '***@' || SUBSTRING(email FROM '@(.*)$')
    END as email,
    CASE 
        WHEN current_setting('app.environment') = 'production' THEN phone
        ELSE '***-***-' || RIGHT(phone, 4)
    END as phone,
    created_at
FROM users;

-- Connection security
-- SSL/TLS enforcement
-- ALTER SYSTEM SET ssl = on;
-- ALTER SYSTEM SET ssl_cert_file = 'server.crt';
-- ALTER SYSTEM SET ssl_key_file = 'server.key';

-- IP-based access control in pg_hba.conf
-- host    all    app_service    10.0.1.0/24    md5
-- host    all    report_user    10.0.2.0/24    md5
-- hostssl all    admin_user     0.0.0.0/0      cert

-- Database firewall rules (application level)
CREATE TABLE allowed_ip_ranges (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50),
    ip_range CIDR,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO allowed_ip_ranges (role_name, ip_range, description) VALUES
    ('app_service', '10.0.1.0/24', 'Application servers'),
    ('report_user', '10.0.2.0/24', 'Reporting infrastructure'),
    ('admin_user', '192.168.1.0/24', 'Admin network');

-- Password policy enforcement
CREATE OR REPLACE FUNCTION validate_password_policy(password TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    -- Minimum 12 characters
    IF LENGTH(password) < 12 THEN
        RAISE EXCEPTION 'Password must be at least 12 characters long';
    END IF;
    
    -- Must contain uppercase
    IF password !~ '[A-Z]' THEN
        RAISE EXCEPTION 'Password must contain at least one uppercase letter';
    END IF;
    
    -- Must contain lowercase
    IF password !~ '[a-z]' THEN
        RAISE EXCEPTION 'Password must contain at least one lowercase letter';
    END IF;
    
    -- Must contain digit
    IF password !~ '[0-9]' THEN
        RAISE EXCEPTION 'Password must contain at least one digit';
    END IF;
    
    -- Must contain special character
    IF password !~ '[!@#$%^&*(),.?":{}|<>]' THEN
        RAISE EXCEPTION 'Password must contain at least one special character';
    END IF;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;
```
*Figyeld meg: többrétegű biztonság - role-based access, RLS, encryption, audit logging.*

</div>

## További olvasmányok

- [PostgreSQL Documentation](https://www.postgresql.org/docs/) - Comprehensive PostgreSQL guide
- [MySQL Reference Manual](https://dev.mysql.com/doc/) - MySQL hivatalos dokumentáció
- [SQL Performance Explained](https://sql-performance-explained.com/) - Markus Winand index optimalizációs könyve
- [Database Design for Mere Mortals](https://www.oreilly.com/library/view/database-design-for/9780321884497/) - Adatbázis tervezési alapok
- [High Performance MySQL](https://www.oreilly.com/library/view/high-performance-mysql/9781449332471/) - Baron Schwartz teljesítmény optimalizációs könyve
- [SQL Antipatterns](https://pragprog.com/titles/bksqla/sql-antipatterns/) - Bill Karwin gyakori hibák könyve
- [Use The Index, Luke](https://use-the-index-luke.com/) - SQL indexing and tuning tutorial
