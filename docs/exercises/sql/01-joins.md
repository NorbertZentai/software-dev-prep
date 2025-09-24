# 🗄️ SQL JOIN Gyakorlatok

## Adatbázis séma

Az alábbi gyakorlatok egy egyszerű e-commerce adatbázison alapulnak:

```sql
-- Felhasználók tábla
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    city VARCHAR(50),
    registration_date DATE DEFAULT CURRENT_DATE
);

-- Kategóriák tábla  
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT
);

-- Termékek tábla
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    stock_quantity INTEGER DEFAULT 0
);

-- Rendelések tábla
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'pending'
);

-- Rendelési tételek tábla
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL
);
```

## Minta adatok beszúrása

```sql
-- Felhasználók
INSERT INTO users (name, email, city) VALUES 
('Kiss János', 'janos@email.com', 'Budapest'),
('Nagy Anna', 'anna@email.com', 'Szeged'),
('Szabó Péter', 'peter@email.com', 'Debrecen'),
('Tóth Mária', 'maria@email.com', 'Budapest'),
('Varga Gábor', 'gabor@email.com', 'Pécs');

-- Kategóriák
INSERT INTO categories (name, description) VALUES 
('Elektronika', 'Számítógépek, telefonok, egyéb elektronikai cikkek'),
('Könyvek', 'Szépirodalmi és szakkönyvek'),
('Ruházat', 'Férfi és női ruházati cikkek'),
('Sport', 'Sportszerek és fitnesz eszközök');

-- Termékek
INSERT INTO products (name, price, category_id, stock_quantity) VALUES 
('Laptop HP', 299000, 1, 5),
('iPhone 13', 250000, 1, 8),
('Java programozás', 8500, 2, 20),
('Futócipő Nike', 25000, 4, 15),
('Póló', 3500, 3, 30),
('Tablet Samsung', 120000, 1, 7);

-- Rendelések
INSERT INTO orders (user_id, total_amount, status) VALUES 
(1, 307500, 'completed'),
(2, 25000, 'completed'),
(3, 250000, 'pending'),
(1, 3500, 'completed'),
(4, 128500, 'shipped');

-- Rendelési tételek
INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES 
(1, 1, 1, 299000),    -- Kiss János: Laptop
(1, 5, 1, 8500),      -- Kiss János: Java könyv  
(2, 4, 1, 25000),     -- Nagy Anna: Futócipő
(3, 2, 1, 250000),    -- Szabó Péter: iPhone
(4, 5, 1, 3500),      -- Kiss János: Póló
(5, 3, 1, 8500),      -- Tóth Mária: Könyv
(5, 6, 1, 120000);    -- Tóth Mária: Tablet
```

---

## Gyakorlat 1: INNER JOIN alapok

### 1.1 Feladat
Listázd ki az összes terméket a kategória nevével együtt!

**Várt eredmény oszlopai:** termék neve, ára, kategória neve

### 1.2 Feladat  
Mutasd meg a teljesített rendeléseket a megrendelő nevével!

**Várt eredmény oszlopai:** rendelés ID, felhasználó neve, rendelés dátuma, összeg

### 1.3 Feladat
Listázd ki a rendelési tételeket termék névvel és kategóriával!

**Várt eredmény oszlopai:** termék neve, kategória neve, mennyiség, egységár

<details>
<summary>💡 Megoldások</summary>

```sql
-- 1.1 Megoldás
SELECT p.name as termek_neve, p.price as ar, c.name as kategoria
FROM products p
INNER JOIN categories c ON p.category_id = c.id;

-- 1.2 Megoldás  
SELECT o.id as rendeles_id, u.name as felhasznalo, o.order_date, o.total_amount
FROM orders o
INNER JOIN users u ON o.user_id = u.id
WHERE o.status = 'completed';

-- 1.3 Megoldás
SELECT p.name as termek, c.name as kategoria, oi.quantity, oi.unit_price
FROM order_items oi
INNER JOIN products p ON oi.product_id = p.id  
INNER JOIN categories c ON p.category_id = c.id;
```
</details>

---

## Gyakorlat 2: LEFT JOIN

### 2.1 Feladat
Listázd ki az összes felhasználót a rendeléseik számával (0-t is beleértve)!

**Várt eredmény oszlopai:** felhasználó neve, város, rendelések száma

### 2.2 Feladat
Mutasd meg az összes kategóriát a hozzájuk tartozó termékek számával!

**Várt eredmény oszlopai:** kategória neve, termékek száma

### 2.3 Feladat
Listázd azokat a termékeket, amelyeket még soha nem rendeltek meg!

<details>
<summary>💡 Megoldások</summary>

```sql
-- 2.1 Megoldás
SELECT u.name, u.city, COUNT(o.id) as rendelesek_szama
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name, u.city;

-- 2.2 Megoldás
SELECT c.name as kategoria, COUNT(p.id) as termekek_szama
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
GROUP BY c.id, c.name;

-- 2.3 Megoldás
SELECT p.name, p.price
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
WHERE oi.product_id IS NULL;
```
</details>

---

## Gyakorlat 3: Komplex JOIN-ok és aggregáció

### 3.1 Feladat
Számold ki minden felhasználó összes vásárlásának értékét!

**Várt eredmény:** felhasználó neve, összes költés

### 3.2 Feladat  
Mutasd meg a legdrágább rendelést minden városból!

**Várt eredmény:** város, max rendelés összeg, megrendelő neve

### 3.3 Feladat
Listázd kategóriánként a legtöbbet eladott terméket!

**Várt eredmény:** kategória neve, termék neve, eladott mennyiség

<details>
<summary>💡 Megoldások</summary>

```sql
-- 3.1 Megoldás
SELECT u.name, COALESCE(SUM(o.total_amount), 0) as osszes_koltes
FROM users u
LEFT JOIN orders o ON u.id = o.user_id AND o.status = 'completed'
GROUP BY u.id, u.name
ORDER BY osszes_koltes DESC;

-- 3.2 Megoldás
SELECT u.city, MAX(o.total_amount) as max_rendeles, 
       (SELECT u2.name FROM users u2 
        JOIN orders o2 ON u2.id = o2.user_id 
        WHERE u2.city = u.city AND o2.total_amount = MAX(o.total_amount)
        LIMIT 1) as megrendelo
FROM users u
JOIN orders o ON u.id = o.user_id
GROUP BY u.city;

-- 3.3 Megoldás (WITH használatával)
WITH kategoria_eladasok AS (
    SELECT c.name as kategoria, p.name as termek, 
           SUM(oi.quantity) as eladott_mennyiseg,
           ROW_NUMBER() OVER (PARTITION BY c.name ORDER BY SUM(oi.quantity) DESC) as rn
    FROM categories c
    JOIN products p ON c.id = p.category_id
    JOIN order_items oi ON p.id = oi.product_id
    GROUP BY c.name, p.name
)
SELECT kategoria, termek, eladott_mennyiseg
FROM kategoria_eladasok
WHERE rn = 1;
```
</details>

---

## Gyakorlat 4: Window Functions

### 4.1 Feladat
Rangsorold a termékeket kategórián belül ár szerint!

### 4.2 Feladat
Számold ki minden rendelésnél a futó összeget felhasználónként!

### 4.3 Feladat
Határozd meg minden termékhez a kategórián belüli átlagos árat!

<details>
<summary>💡 Megoldások</summary>

```sql
-- 4.1 Megoldás
SELECT p.name, p.price, c.name as kategoria,
       RANK() OVER (PARTITION BY c.name ORDER BY p.price DESC) as ar_rang
FROM products p
JOIN categories c ON p.category_id = c.id;

-- 4.2 Megoldás
SELECT u.name, o.order_date, o.total_amount,
       SUM(o.total_amount) OVER (
           PARTITION BY u.id 
           ORDER BY o.order_date 
           ROWS UNBOUNDED PRECEDING
       ) as futo_osszeg
FROM users u
JOIN orders o ON u.id = o.user_id
ORDER BY u.name, o.order_date;

-- 4.3 Megoldás
SELECT p.name, p.price, c.name as kategoria,
       AVG(p.price) OVER (PARTITION BY c.name) as kategoria_atlag,
       p.price - AVG(p.price) OVER (PARTITION BY c.name) as elteres_atlagtol
FROM products p
JOIN categories c ON p.category_id = c.id;
```
</details>

---

## Gyakorlat 5: Kihívás szintű feladatok

### 5.1 Haladó feladat
Készíts egy riportot, amely megmutatja:
- Minden felhasználóhoz a kedvenc kategóriáját (legtöbbet vásárolt)
- Az abban a kategóriában költött összeget
- Az összes vásárláshoz képesti százalékos arányt

### 5.2 Expert feladat
Találd meg azokat a termékpárokat, amelyeket gyakran rendelnek együtt! 
(Legalább 2 rendelésben szerepelnek együtt)

<details>
<summary>💡 Megoldások</summary>

```sql
-- 5.1 Megoldás
WITH felhasznalo_kategoria_koltes AS (
    SELECT u.id as user_id, u.name, c.name as kategoria,
           SUM(oi.quantity * oi.unit_price) as kategoria_koltes,
           ROW_NUMBER() OVER (PARTITION BY u.id ORDER BY SUM(oi.quantity * oi.unit_price) DESC) as rn
    FROM users u
    JOIN orders o ON u.id = o.user_id
    JOIN order_items oi ON o.id = oi.order_id  
    JOIN products p ON oi.product_id = p.id
    JOIN categories c ON p.category_id = c.id
    GROUP BY u.id, u.name, c.name
),
felhasznalo_osszes_koltes AS (
    SELECT u.id as user_id, SUM(o.total_amount) as osszes_koltes
    FROM users u
    JOIN orders o ON u.id = o.user_id
    GROUP BY u.id
)
SELECT fkk.name, fkk.kategoria, fkk.kategoria_koltes,
       ROUND((fkk.kategoria_koltes::numeric / fok.osszes_koltes * 100), 2) as szazalek
FROM felhasznalo_kategoria_koltes fkk
JOIN felhasznalo_osszes_koltes fok ON fkk.user_id = fok.user_id
WHERE fkk.rn = 1;

-- 5.2 Megoldás
SELECT p1.name as termek1, p2.name as termek2, COUNT(*) as egyutt_rendelesek
FROM order_items oi1
JOIN order_items oi2 ON oi1.order_id = oi2.order_id AND oi1.product_id < oi2.product_id
JOIN products p1 ON oi1.product_id = p1.id
JOIN products p2 ON oi2.product_id = p2.id
GROUP BY p1.id, p1.name, p2.id, p2.name
HAVING COUNT(*) >= 2
ORDER BY egyutt_rendelesek DESC;
```
</details>

---

## Teljesítmény optimalizálás tippek

### Index javaslatok:
```sql
-- Gyakran használt JOIN kulcsokra
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- WHERE feltételekre
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_users_city ON users(city);
```

### Query optimalizálás:
- Használj `EXPLAIN ANALYZE`-t lassú lekérdezéseknél
- Kerüld a SELECT * használatát
- WHERE feltételeket rakd a JOIN elé, ha lehet
- Használj LIMIT-et nagy eredményhalmazoknál

---

## Összefoglalás

### Mit gyakoroltál:
- ✅ INNER JOIN - csak egyező rekordok
- ✅ LEFT JOIN - minden rekord a bal oldali táblából  
- ✅ Többszörös JOIN-ok - 3+ tábla összekötése
- ✅ Aggregáló függvények GROUP BY-jal
- ✅ Window Functions - fejlett analitika
- ✅ Subquery-k és CTE-k
- ✅ Komplex üzleti logika implementálása

### Következő lépések:
1. **Indexelés és teljesítmény** - hogyan gyorsítsuk a lekérdezéseket
2. **Stored Procedures** - komplex logika az adatbázisban
3. **Tranzakciók** - ACID tulajdonságok
4. **NoSQL vs SQL** - mikor használjunk másfajta adatbázist

---

💡 **Tipp:** Próbálj saját adatokat és feladatokat kitalálni - ez a legjobb módja a gyakorlásnak!