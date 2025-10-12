---
title: "Index Optimization and Query Tuning"
difficulty: intermediate
goals: ["Index strategy", "Execution plans", "Query optimization"]
estimatedMinutes: 40
starter: {
  "stackblitz": "",
  "codesandbox": "",
  "dbfiddle": "https://www.db-fiddle.com/f/5fFazk8vVQEcj2z4qY9d8e/1"
}
---

# Index Optimization and Query Tuning

## Task Description

Optimize e-commerce database queries using index strategy and query tuning. Learn to read execution plans and identify performance bottlenecks.

## Database Schema

```sql
-- Users table (1M records)
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    city VARCHAR(100),
    country VARCHAR(100),
    birth_date DATE
);

-- Products table (100K records)
CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    category_id INT,
    price DECIMAL(10,2),
    stock_quantity INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Orders table (5M records)
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
    total_amount DECIMAL(10,2),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Order_items table (15M records)
CREATE TABLE order_items (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    quantity INT,
    unit_price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
```

## Task 1: Identify Slow Queries

### Original (slow) queries

```sql
-- Q1: Active user orders in a time period
SELECT u.first_name, u.last_name, COUNT(o.order_id) as order_count,
       SUM(o.total_amount) as total_spent
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id
WHERE o.order_date BETWEEN '2024-01-01' AND '2024-12-31'
  AND o.status != 'cancelled'
GROUP BY u.user_id, u.first_name, u.last_name
ORDER BY total_spent DESC;

-- Q2: Popular products by category
SELECT p.name, p.price, SUM(oi.quantity) as total_sold
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
JOIN orders o ON oi.order_id = o.order_id
WHERE p.category_id = 5
  AND o.order_date >= DATE_SUB(NOW(), INTERVAL 3 MONTH)
  AND p.is_active = TRUE
GROUP BY p.product_id, p.name, p.price
ORDER BY total_sold DESC
LIMIT 20;

-- Q3: User activity analysis
SELECT u.country, u.city,
       COUNT(DISTINCT o.order_id) as order_count,
       AVG(o.total_amount) as avg_order_value
FROM users u
JOIN orders o ON u.user_id = o.user_id
WHERE u.created_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)
  AND o.status = 'delivered'
GROUP BY u.country, u.city
HAVING order_count >= 10
ORDER BY avg_order_value DESC;
```

## Task 2: Execution Plan Analysis

### Steps:

1. **Get Execution Plan**
```sql
EXPLAIN FORMAT=JSON
SELECT u.first_name, u.last_name, COUNT(o.order_id) as order_count
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id
WHERE o.order_date BETWEEN '2024-01-01' AND '2024-12-31'
GROUP BY u.user_id;
```

2. **Identify Key Metrics**
   - Table scan vs Index scan
   - Rows examined vs Rows returned
   - Join algorithm (Nested Loop, Hash Join, etc.)
   - Sort operations
   - Temporary table usage

3. **Recognize Bottlenecks**
   - Missing indexes
   - Inefficient joins
   - Unnecessary sorting
   - Large temporary results

## Task 3: Index Strategy

### Design Required Indexes

```sql
-- Single column indexes
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_date ON orders(order_date);
CREATE INDEX idx_orders_status ON orders(status);

-- Composite indexes
CREATE INDEX idx_orders_user_date_status ON orders(user_id, order_date, status);
CREATE INDEX idx_products_category_active ON products(category_id, is_active);
CREATE INDEX idx_order_items_order_product ON order_items(order_id, product_id);

-- Covering indexes
CREATE INDEX idx_users_country_city_covering
ON users(country, city, user_id, created_at);

-- Partial indexes (MySQL 8.0+)
CREATE INDEX idx_active_products ON products(category_id, price)
WHERE is_active = TRUE;
```

### Check Index Usage

```sql
-- Index usage statistics
SELECT OBJECT_NAME, INDEX_NAME,
       COUNT_STAR, COUNT_READ, COUNT_INSERT, COUNT_UPDATE, COUNT_DELETE
FROM performance_schema.table_io_waits_summary_by_index_usage
WHERE OBJECT_SCHEMA = 'ecommerce'
ORDER BY COUNT_STAR DESC;

-- Unused indexes
SELECT OBJECT_NAME, INDEX_NAME
FROM performance_schema.table_io_waits_summary_by_index_usage
WHERE OBJECT_SCHEMA = 'ecommerce'
  AND INDEX_NAME IS NOT NULL
  AND COUNT_STAR = 0;
```

## Task 4: Query Optimization

### Optimized Versions

```sql
-- Q1 Optimized: Index usage + filter optimization
SELECT u.first_name, u.last_name,
       COUNT(o.order_id) as order_count,
       SUM(o.total_amount) as total_spent
FROM users u
JOIN orders o ON u.user_id = o.user_id
WHERE o.order_date BETWEEN '2024-01-01' AND '2024-12-31'
  AND o.status IN ('processing', 'shipped', 'delivered')
GROUP BY u.user_id
ORDER BY total_spent DESC;

-- Q2 Optimized: Materialized view or denormalization
CREATE MATERIALIZED VIEW product_sales_summary AS
SELECT p.product_id, p.name, p.category_id, p.price,
       SUM(oi.quantity) as total_sold,
       MAX(o.order_date) as last_order_date
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
JOIN orders o ON oi.order_id = o.order_id
WHERE p.is_active = TRUE
GROUP BY p.product_id, p.name, p.category_id, p.price;

-- Optimized query
SELECT name, price, total_sold
FROM product_sales_summary
WHERE category_id = 5
  AND last_order_date >= DATE_SUB(NOW(), INTERVAL 3 MONTH)
ORDER BY total_sold DESC
LIMIT 20;
```

## Task 5: Advanced Optimizations

### Partitioning
```sql
-- Orders table date partitioning
ALTER TABLE orders PARTITION BY RANGE (YEAR(order_date)) (
    PARTITION p2022 VALUES LESS THAN (2023),
    PARTITION p2023 VALUES LESS THAN (2024),
    PARTITION p2024 VALUES LESS THAN (2025),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);
```

### Query Hints
```sql
-- Force index usage
SELECT /*+ INDEX(orders, idx_orders_user_date_status) */
       u.first_name, COUNT(o.order_id)
FROM users u
JOIN orders o ON u.user_id = o.user_id
WHERE o.order_date > '2024-01-01';

-- Join order optimization
SELECT /*+ STRAIGHT_JOIN */ u.email, o.total_amount
FROM users u
JOIN orders o ON u.user_id = o.user_id
WHERE u.country = 'Hungary';
```

## Measurements and Comparison

### Benchmark script
```sql
-- Performance measurement
SET @start_time = NOW(6);

-- Query execution here

SELECT TIMESTAMPDIFF(MICROSECOND, @start_time, NOW(6)) / 1000 as execution_time_ms;

-- IO Statistics
SHOW STATUS LIKE 'Handler_read%';
SHOW STATUS LIKE 'Sort_scan';
SHOW STATUS LIKE 'Created_tmp_tables';
```

## Checklist

- [ ] Original query execution plans analyzed
- [ ] Required indexes identified and created
- [ ] Composite indexes in proper column order
- [ ] Covering indexes used where beneficial
- [ ] Optimized query performance measured
- [ ] Materialized views created for frequent aggregations
- [ ] Partitioning considered for large tables
- [ ] Unused indexes removed

## Best Practices

1. **Index selectivity**: Index high-selectivity columns
2. **Composite index order**: Most selective column first
3. **Covering indexes**: Include SELECT columns in index
4. **Regular maintenance**: Use ANALYZE TABLE, OPTIMIZE TABLE
5. **Monitor slow queries**: Use slow_query_log

## Next Steps

- Learn MySQL Query Optimizer
- Monitoring tools: Percona Toolkit, MySQL Enterprise Monitor
- Database sharding and read replicas
- Advanced storage engines (MyRocks, TokuDB)