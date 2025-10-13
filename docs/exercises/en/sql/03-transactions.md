---
title: "Transactions and ACID Properties"
difficulty: advanced
goals: 
  - "Transaction isolation"
  - "ACID principles"
  - "Deadlock handling"
  - "Locking strategies"
estimatedMinutes: 40
starter:
  "stackblitz": "",
  "codesandbox": "",
  "dbfiddle": "https://www.db-fiddle.com/f/hGpGpMVkZHxCnRGNcQWz9/0"
}
---

# Transactions and ACID Properties

## Task Description

Implement a bank transfer system that demonstrates ACID properties of transactions, isolation levels, and solutions to concurrent access problems. Practice deadlock handling and optimistic/pessimistic locking strategies.

## Database Schema

```sql
-- Bank accounts
CREATE TABLE accounts (
    account_id INT PRIMARY KEY AUTO_INCREMENT,
    account_number VARCHAR(20) UNIQUE NOT NULL,
    owner_name VARCHAR(100) NOT NULL,
    balance DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    version INT DEFAULT 1,  -- Optimistic locking
    status ENUM('active', 'frozen', 'closed') DEFAULT 'active'
);

-- Transaction log
CREATE TABLE transactions (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    from_account_id INT,
    to_account_id INT,
    amount DECIMAL(15, 2) NOT NULL,
    transaction_type ENUM('transfer', 'deposit', 'withdrawal'),
    status ENUM('pending', 'completed', 'failed', 'cancelled'),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    FOREIGN KEY (from_account_id) REFERENCES accounts(account_id),
    FOREIGN KEY (to_account_id) REFERENCES accounts(account_id)
);

-- Account locks (pessimistic locking)
CREATE TABLE account_locks (
    account_id INT PRIMARY KEY,
    locked_by VARCHAR(100),
    locked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

-- Test data
INSERT INTO accounts (account_number, owner_name, balance) VALUES
('ACC001', 'Alice Johnson', 5000.00),
('ACC002', 'Bob Smith', 3000.00),
('ACC003', 'Charlie Brown', 1000.00),
('ACC004', 'Diana Prince', 7500.00);
```

## Task 1: Understanding ACID Properties

### Atomicity - All or Nothing

```sql
-- Successful transfer
DELIMITER //
CREATE PROCEDURE transfer_money(
    IN from_account VARCHAR(20),
    IN to_account VARCHAR(20),
    IN transfer_amount DECIMAL(15, 2),
    IN description TEXT
)
BEGIN
    DECLARE from_id, to_id INT;
    DECLARE current_balance DECIMAL(15, 2);
    DECLARE trans_id INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Get account IDs
    SELECT account_id INTO from_id FROM accounts
    WHERE account_number = from_account AND status = 'active';

    SELECT account_id INTO to_id FROM accounts
    WHERE account_number = to_account AND status = 'active';

    -- Check if accounts exist
    IF from_id IS NULL OR to_id IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Account not found';
    END IF;

    -- Check balance
    SELECT balance INTO current_balance FROM accounts
    WHERE account_id = from_id FOR UPDATE;

    IF current_balance < transfer_amount THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insufficient funds';
    END IF;

    -- Create transaction record
    INSERT INTO transactions (from_account_id, to_account_id, amount,
                            transaction_type, status, description)
    VALUES (from_id, to_id, transfer_amount, 'transfer', 'pending', description);

    SET trans_id = LAST_INSERT_ID();

    -- Update balances
    UPDATE accounts SET balance = balance - transfer_amount
    WHERE account_id = from_id;

    UPDATE accounts SET balance = balance + transfer_amount
    WHERE account_id = to_id;

    -- Update transaction status
    UPDATE transactions
    SET status = 'completed', completed_at = NOW()
    WHERE transaction_id = trans_id;

    COMMIT;
END //
DELIMITER ;
```

### Consistency - Business Rules Enforcement

```sql
-- Consistency constraint trigger
DELIMITER //
CREATE TRIGGER check_balance_constraint
    BEFORE UPDATE ON accounts
    FOR EACH ROW
BEGIN
    IF NEW.balance < -1000.00 THEN  -- Max overdraft: $1000
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Balance cannot go below overdraft limit';
    END IF;

    -- Update version for optimistic locking
    SET NEW.version = OLD.version + 1;
END //
DELIMITER ;
```

## Task 2: Testing Isolation Levels

### Read Uncommitted - Dirty Read

```sql
-- Session 1
SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
START TRANSACTION;
UPDATE accounts SET balance = 999999.99 WHERE account_id = 1;
-- Don't commit yet

-- Session 2 (different connection)
SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
START TRANSACTION;
SELECT balance FROM accounts WHERE account_id = 1;  -- Dirty read!
COMMIT;
```

### Read Committed - Non-repeatable Read

```sql
-- Session 1
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
START TRANSACTION;
SELECT balance FROM accounts WHERE account_id = 1;  -- First read

-- Session 2
START TRANSACTION;
UPDATE accounts SET balance = balance + 500 WHERE account_id = 1;
COMMIT;

-- Session 1 continues
SELECT balance FROM accounts WHERE account_id = 1;  -- Second read - different!
COMMIT;
```

### Repeatable Read - Phantom Read

```sql
-- Session 1
SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;
START TRANSACTION;
SELECT COUNT(*) FROM accounts WHERE balance > 5000;  -- First read

-- Session 2
START TRANSACTION;
INSERT INTO accounts (account_number, owner_name, balance)
VALUES ('ACC999', 'New User', 6000.00);
COMMIT;

-- Session 1 continues
SELECT COUNT(*) FROM accounts WHERE balance > 5000;  -- Phantom read!
COMMIT;
```

### Serializable - No Anomalies

```sql
-- Session 1
SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;
START TRANSACTION;
SELECT * FROM accounts WHERE balance > 1000 FOR UPDATE;

-- Session 2 (will block)
START TRANSACTION;
INSERT INTO accounts (account_number, owner_name, balance)
VALUES ('ACC888', 'Another User', 2000.00);  -- Blocked!
```

## Task 3: Deadlock Handling

### Deadlock Simulation

```sql
-- Session 1
START TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
-- Wait before next statement

-- Session 2
START TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE account_id = 2;

-- Session 1 continues
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;  -- Waits

-- Session 2 continues
UPDATE accounts SET balance = balance + 100 WHERE account_id = 1;  -- DEADLOCK!
```

### Deadlock Prevention Strategy

```sql
-- Always lock accounts in consistent order (by ID)
DELIMITER //
CREATE PROCEDURE safe_transfer(
    IN from_acc_id INT,
    IN to_acc_id INT,
    IN amount DECIMAL(15, 2)
)
BEGIN
    DECLARE first_id, second_id INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    -- Determine lock order by ID to prevent deadlock
    IF from_acc_id < to_acc_id THEN
        SET first_id = from_acc_id;
        SET second_id = to_acc_id;
    ELSE
        SET first_id = to_acc_id;
        SET second_id = from_acc_id;
    END IF;

    START TRANSACTION;

    -- Lock accounts in consistent order
    SELECT balance FROM accounts WHERE account_id = first_id FOR UPDATE;
    SELECT balance FROM accounts WHERE account_id = second_id FOR UPDATE;

    -- Perform transfer logic
    UPDATE accounts SET balance = balance - amount WHERE account_id = from_acc_id;
    UPDATE accounts SET balance = balance + amount WHERE account_id = to_acc_id;

    COMMIT;
END //
DELIMITER ;
```

## Task 4: Optimistic vs Pessimistic Locking

### Optimistic Locking (Version-based)

```sql
DELIMITER //
CREATE PROCEDURE optimistic_transfer(
    IN from_acc VARCHAR(20),
    IN to_acc VARCHAR(20),
    IN amount DECIMAL(15, 2)
)
BEGIN
    DECLARE from_id, to_id INT;
    DECLARE from_version, to_version INT;
    DECLARE from_balance DECIMAL(15, 2);
    DECLARE affected_rows INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Get current state (without locking)
    SELECT account_id, balance, version INTO from_id, from_balance, from_version
    FROM accounts WHERE account_number = from_acc;

    SELECT account_id, version INTO to_id, to_version
    FROM accounts WHERE account_number = to_acc;

    -- Business logic validation
    IF from_balance < amount THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insufficient funds';
    END IF;

    -- Optimistic update with version check
    UPDATE accounts
    SET balance = balance - amount, version = version + 1
    WHERE account_id = from_id AND version = from_version;

    SET affected_rows = ROW_COUNT();
    IF affected_rows = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Concurrent modification detected';
    END IF;

    UPDATE accounts
    SET balance = balance + amount, version = version + 1
    WHERE account_id = to_id AND version = to_version;

    SET affected_rows = ROW_COUNT();
    IF affected_rows = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Concurrent modification detected';
    END IF;

    COMMIT;
END //
DELIMITER ;
```

### Pessimistic Locking (Explicit Locks)

```sql
DELIMITER //
CREATE PROCEDURE pessimistic_transfer_with_timeout(
    IN from_acc VARCHAR(20),
    IN to_acc VARCHAR(20),
    IN amount DECIMAL(15, 2),
    IN timeout_seconds INT
)
BEGIN
    DECLARE from_id, to_id INT;
    DECLARE lock_acquired BOOLEAN DEFAULT FALSE;
    DECLARE CONTINUE HANDLER FOR 1205 -- Lock wait timeout
    BEGIN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Lock timeout - try again later';
    END;

    -- Set lock timeout
    SET SESSION innodb_lock_wait_timeout = timeout_seconds;

    START TRANSACTION;

    -- Get account IDs and acquire locks
    SELECT account_id INTO from_id FROM accounts
    WHERE account_number = from_acc FOR UPDATE;

    SELECT account_id INTO to_id FROM accounts
    WHERE account_number = to_acc FOR UPDATE;

    -- Insert explicit locks for tracking
    INSERT IGNORE INTO account_locks (account_id, locked_by, expires_at)
    VALUES (from_id, CONNECTION_ID(), DATE_ADD(NOW(), INTERVAL timeout_seconds SECOND)),
           (to_id, CONNECTION_ID(), DATE_ADD(NOW(), INTERVAL timeout_seconds SECOND));

    -- Perform transfer
    UPDATE accounts SET balance = balance - amount WHERE account_id = from_id;
    UPDATE accounts SET balance = balance + amount WHERE account_id = to_id;

    -- Remove locks
    DELETE FROM account_locks WHERE account_id IN (from_id, to_id);

    COMMIT;

    -- Reset timeout to default
    SET SESSION innodb_lock_wait_timeout = 50;
END //
DELIMITER ;
```

## Task 5: Concurrent Transaction Testing

### Load Testing Script

```sql
-- Create test procedure for concurrent execution
DELIMITER //
CREATE PROCEDURE random_transfer_test(IN iterations INT)
BEGIN
    DECLARE i INT DEFAULT 0;
    DECLARE from_acc, to_acc VARCHAR(20);
    DECLARE transfer_amount DECIMAL(15, 2);
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION BEGIN END; -- Ignore errors for test

    WHILE i < iterations DO
        -- Random accounts and amount
        SET from_acc = CONCAT('ACC', LPAD(FLOOR(1 + RAND() * 4), 3, '0'));
        SET to_acc = CONCAT('ACC', LPAD(FLOOR(1 + RAND() * 4), 3, '0'));
        SET transfer_amount = ROUND(RAND() * 100, 2);

        IF from_acc != to_acc THEN
            CALL optimistic_transfer(from_acc, to_acc, transfer_amount);
        END IF;

        SET i = i + 1;
    END WHILE;
END //
DELIMITER ;

-- Test concurrent execution
-- Run multiple sessions simultaneously:
CALL random_transfer_test(100);
```

## Monitoring and Debugging

### Transaction Monitoring

```sql
-- Current transactions
SELECT trx_id, trx_state, trx_started, trx_query
FROM INFORMATION_SCHEMA.INNODB_TRX;

-- Lock waits
SELECT
    r.trx_id AS waiting_trx_id,
    r.trx_mysql_thread_id AS waiting_thread,
    r.trx_query AS waiting_query,
    b.trx_id AS blocking_trx_id,
    b.trx_mysql_thread_id AS blocking_thread,
    b.trx_query AS blocking_query
FROM INFORMATION_SCHEMA.INNODB_LOCK_WAITS w
INNER JOIN INFORMATION_SCHEMA.INNODB_TRX b ON b.trx_id = w.blocking_trx_id
INNER JOIN INFORMATION_SCHEMA.INNODB_TRX r ON r.trx_id = w.requesting_trx_id;

-- Deadlock information
SHOW ENGINE INNODB STATUS\G
```

## Checklist

- [ ] ACID properties understood and implemented
- [ ] All 4 isolation levels tested
- [ ] Dirty Read, Non-repeatable Read, Phantom Read simulated
- [ ] Deadlock simulation and prevention strategy
- [ ] Optimistic locking implemented with versioning
- [ ] Pessimistic locking with explicit locks
- [ ] Concurrent transaction testing performed
- [ ] Transaction monitoring queries used
- [ ] Error handling in all procedures
- [ ] Lock timeout handling

## Best Practices

1. **Consistent lock ordering**: Always lock in the same order
2. **Short transactions**: Minimize lock holding time
3. **Appropriate isolation level**: Don't use serializable unless necessary
4. **Retry logic**: Implement exponential backoff for deadlocks
5. **Monitor regularly**: Track deadlocks, long-running transactions

## Next Steps

- Distributed transactions (2PC, Saga pattern)
- Event sourcing and CQRS
- Database replication and consistency
- NoSQL ACID alternatives (BASE, eventual consistency)