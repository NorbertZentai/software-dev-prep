# 🗄️ SQL Cheatsheet - Gyors Referencia

## Alapvető lekérdezések

### SELECT alapok
```sql
-- Minden oszlop kiválasztása
SELECT * FROM tabla_nev;

-- Specifikus oszlopok
SELECT oszlop1, oszlop2 FROM tabla_nev;

-- Feltételes lekérdezés
SELECT * FROM tabla_nev WHERE feltétel;

-- Rendezés
SELECT * FROM tabla_nev ORDER BY oszlop ASC/DESC;

-- Korlátozás
SELECT * FROM tabla_nev LIMIT 10;
```

### WHERE feltételek
```sql
-- Egyenlőség
WHERE oszlop = 'érték'

-- Összehasonlítás
WHERE szam > 100
WHERE datum >= '2023-01-01'

-- LIKE pattern matching
WHERE nev LIKE 'A%'        -- A-val kezdődik
WHERE nev LIKE '%son'      -- son-ra végződik
WHERE nev LIKE '%and%'     -- tartalmazza: and

-- IN lista
WHERE orszag IN ('Magyarország', 'Németország')

-- BETWEEN tartomány
WHERE kor BETWEEN 18 AND 65

-- NULL ellenőrzés
WHERE email IS NULL
WHERE telefon IS NOT NULL

-- Logikai operátorok
WHERE kor > 18 AND nem = 'férfi'
WHERE varos = 'Budapest' OR varos = 'Szeged'
WHERE NOT aktiv = false
```

## JOIN műveletek

### INNER JOIN
```sql
-- Csak azok a sorok, amiknek van párja mindkét táblában
SELECT u.nev, p.cim
FROM felhasznalok u
INNER JOIN postok p ON u.id = p.felhasznalo_id;
```

### LEFT JOIN
```sql
-- Minden sor a bal oldali táblából, nullokkal kiegészítve
SELECT u.nev, p.cim
FROM felhasznalok u
LEFT JOIN postok p ON u.id = p.felhasznalo_id;
```

### RIGHT JOIN
```sql
-- Minden sor a jobb oldali táblából
SELECT u.nev, p.cim
FROM felhasznalok u
RIGHT JOIN postok p ON u.id = p.felhasznalo_id;
```

### FULL OUTER JOIN
```sql
-- Minden sor mindkét táblából
SELECT u.nev, p.cim
FROM felhasznalok u
FULL OUTER JOIN postok p ON u.id = p.felhasznalo_id;
```

## Aggregáló függvények

### Alapvető aggregáció
```sql
-- Darabszám
SELECT COUNT(*) FROM tabla;
SELECT COUNT(oszlop) FROM tabla; -- NULL-okat nem számolja

-- Összegzés
SELECT SUM(ar) FROM termekek;

-- Átlag
SELECT AVG(fizetes) FROM dolgozok;

-- Minimum/Maximum
SELECT MIN(kor), MAX(kor) FROM emberek;

-- GROUP BY
SELECT varos, COUNT(*) as emberek_szama
FROM lakosok
GROUP BY varos;

-- HAVING (GROUP BY után szűrés)
SELECT varos, COUNT(*) as emberek_szama
FROM lakosok
GROUP BY varos
HAVING COUNT(*) > 10000;
```

## Tábla műveletek

### CREATE TABLE
```sql
CREATE TABLE felhasznalok (
    id SERIAL PRIMARY KEY,
    nev VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    szuletesi_datum DATE,
    aktiv BOOLEAN DEFAULT true,
    letrehozva TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### ALTER TABLE
```sql
-- Oszlop hozzáadása
ALTER TABLE felhasznalok ADD COLUMN telefon VARCHAR(20);

-- Oszlop módosítása
ALTER TABLE felhasznalok ALTER COLUMN nev TYPE VARCHAR(150);

-- Oszlop törlése
ALTER TABLE felhasznalok DROP COLUMN telefon;

-- Constraint hozzáadása
ALTER TABLE felhasznalok ADD CONSTRAINT unique_email UNIQUE (email);
```

### INSERT, UPDATE, DELETE
```sql
-- Beszúrás
INSERT INTO felhasznalok (nev, email) VALUES ('Kiss János', 'janos@email.com');

-- Több sor beszúrása
INSERT INTO felhasznalok (nev, email) VALUES
    ('Nagy Anna', 'anna@email.com'),
    ('Szabó Péter', 'peter@email.com');

-- Frissítés
UPDATE felhasznalok
SET email = 'uj.email@example.com'
WHERE id = 1;

-- Törlés
DELETE FROM felhasznalok WHERE aktiv = false;

-- Teljes tábla ürítése
TRUNCATE TABLE felhasznalok;
```

## Indexek és teljesítmény

### Index létrehozása
```sql
-- Egyszerű index
CREATE INDEX idx_felhasznalo_nev ON felhasznalok (nev);

-- Összetett index
CREATE INDEX idx_felhasznalo_varos_kor ON felhasznalok (varos, kor);

-- Unique index
CREATE UNIQUE INDEX idx_felhasznalo_email ON felhasznalok (email);

-- Index törlése
DROP INDEX idx_felhasznalo_nev;
```

### Query Plan elemzése
```sql
-- PostgreSQL
EXPLAIN ANALYZE SELECT * FROM felhasznalok WHERE nev = 'Kiss János';

-- MySQL
EXPLAIN SELECT * FROM felhasznalok WHERE nev = 'Kiss János';
```

## Korszerű SQL funkciók

### Window Functions
```sql
-- ROW_NUMBER
SELECT nev, fizetes,
       ROW_NUMBER() OVER (ORDER BY fizetes DESC) as sorszam
FROM dolgozok;

-- RANK és DENSE_RANK
SELECT nev, fizetes,
       RANK() OVER (ORDER BY fizetes DESC) as helyezes
FROM dolgozok;

-- Partíciós window
SELECT nev, reszleg, fizetes,
       AVG(fizetes) OVER (PARTITION BY reszleg) as reszleg_atlag
FROM dolgozok;
```

### CTE (Common Table Expressions)
```sql
WITH magas_fizu AS (
    SELECT * FROM dolgozok WHERE fizetes > 500000
)
SELECT reszleg, COUNT(*)
FROM magas_fizu
GROUP BY reszleg;

-- Recursive CTE (hierarchia)
WITH RECURSIVE szervezet AS (
    SELECT id, nev, fonok_id, 1 as szint
    FROM dolgozok
    WHERE fonok_id IS NULL

    UNION ALL

    SELECT d.id, d.nev, d.fonok_id, s.szint + 1
    FROM dolgozok d
    JOIN szervezet s ON d.fonok_id = s.id
)
SELECT * FROM szervezet;
```

## Adattípusok (PostgreSQL)

### Számok
```sql
INTEGER, BIGINT, DECIMAL(10,2), NUMERIC(10,2)
REAL, DOUBLE PRECISION
SERIAL, BIGSERIAL  -- Auto-increment
```

### Szöveg
```sql
VARCHAR(n), TEXT, CHAR(n)
```

### Dátum és idő
```sql
DATE, TIME, TIMESTAMP, TIMESTAMPTZ
INTERVAL  -- Időintervallum
```

### JSON
```sql
JSON, JSONB  -- JSONB indexelhető és gyorsabb
```

### Tömbök
```sql
INTEGER[], TEXT[]
SELECT * FROM tabla WHERE 'érték' = ANY(tomb_oszlop);
```

## Tranzakciók

### Alapvető tranzakció kezelés
```sql
BEGIN;
-- SQL műveletek...
UPDATE szamlak SET egyenleg = egyenleg - 1000 WHERE id = 1;
UPDATE szamlak SET egyenleg = egyenleg + 1000 WHERE id = 2;
COMMIT;  -- vagy ROLLBACK; hiba esetén
```

### Savepoint
```sql
BEGIN;
INSERT INTO tabla VALUES (1, 'adat');
SAVEPOINT sp1;
INSERT INTO tabla VALUES (2, 'hiba');  -- Ez hibás lehet
ROLLBACK TO sp1;  -- Visszatérés a savepoint-hoz
COMMIT;
```

## Gyakori hibák és megoldások

### 1. N+1 Query probléma
```sql
-- ❌ Rossz: N+1 lekérdezés
SELECT * FROM posts;  -- 1 query
-- Minden post-hoz külön: SELECT * FROM users WHERE id = ?  -- N query

-- ✅ Jó: JOIN használata
SELECT p.*, u.name
FROM posts p
JOIN users u ON p.user_id = u.id;
```

### 2. Hiányzó indexek
```sql
-- ❌ Lassú WHERE feltétel index nélkül
SELECT * FROM nagy_tabla WHERE email = 'test@example.com';

-- ✅ Gyors index-szel
CREATE INDEX idx_email ON nagy_tabla (email);
```

### 3. SELECT * használata
```sql
-- ❌ Rossz: túl sok adat
SELECT * FROM nagy_tabla;

-- ✅ Jó: csak szükséges oszlopok
SELECT id, nev, email FROM nagy_tabla;
```

## Hasznos funkciók

### String manipuláció
```sql
-- Concatenation
SELECT CONCAT(keresztnev, ' ', vezeteknev) as teljes_nev;
SELECT keresztnev || ' ' || vezeteknev as teljes_nev;  -- PostgreSQL

-- String funkciók
SELECT UPPER(nev), LOWER(email), LENGTH(leiras);
SELECT SUBSTRING(nev, 1, 10);  -- Első 10 karakter
SELECT TRIM(szoveg);  -- Whitespace eltávolítása
```

### Dátum funkciók
```sql
-- Aktuális dátum/idő
SELECT NOW(), CURRENT_DATE, CURRENT_TIME;

-- Dátum aritmetika
SELECT NOW() - INTERVAL '7 days';  -- 7 nappal ezelőtt
SELECT DATE_PART('year', szuletesi_datum) as ev;
SELECT AGE(szuletesi_datum) as kor;
```

### Feltételes logika
```sql
-- CASE WHEN
SELECT nev,
       CASE
           WHEN kor < 18 THEN 'Kiskorú'
           WHEN kor < 65 THEN 'Felnőtt'
           ELSE 'Nyugdíjas'
       END as korcsoport
FROM emberek;

-- COALESCE (első nem-NULL érték)
SELECT COALESCE(becenev, keresztnev, 'Ismeretlen') as megjelenito_nev;
```

---

💡 **Tipp:** Kövesd a query optimalizációs best practice-eket és mindig használj EXPLAIN-t lassú lekérdezéseknél!
