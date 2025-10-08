# File Parse Basics

## 🎯 Goal
Create a Java program that reads a CSV file line-by-line, splits each line by commas, and **only processes complete rows** (no blank fields).

## 📋 Requirements

1. **Read file** using `Files.lines()` or `BufferedReader`
2. **Split each line** by comma delimiter (`,`)
3. **Filter valid rows**:
   - Must have at least 3 fields
   - All fields must be non-blank
   - Skip empty lines and comments (starting with `#`)
4. **Parse data** into a `Record` class with fields: `name`, `category`, `value`
5. **Handle errors**:
   - Invalid number format
   - Missing fields
   - File not found

## 📥 Input Example

`data.csv`:
```csv
# Product inventory
Apple,Fruit,5
Banana,Fruit,3

Carrot,Vegetable,7
,,     # Invalid: blank fields
Tomato,Vegetable,invalid  # Invalid: bad number
Onion,Vegetable,2
```

## 📤 Expected Output

```
Parsed 4 records:
Record{name='Apple', category='Fruit', value=5}
Record{name='Banana', category='Fruit', value=3}
Record{name='Carrot', category='Vegetable', value=7}
Record{name='Onion', category='Vegetable', value=2}

Skipped 2 invalid lines
```

## 🧪 Test Cases

### Test 1: Valid file with mixed content
**Input**: File with valid rows, empty lines, comments, invalid rows  
**Expected**: Only valid rows parsed

### Test 2: All invalid rows
**Input**: File with only blank fields and bad numbers  
**Expected**: Empty list, error messages printed

### Test 3: File not found
**Input**: Non-existent file path  
**Expected**: IOException handled gracefully

### Test 4: Large file
**Input**: 10,000 line CSV file  
**Expected**: Processes efficiently using streams

## 💡 Tips

- Use `String.split(",", -1)` to preserve trailing empty strings
- Use `Stream.filter()` for validation logic
- Consider try-with-resources for automatic file closing
- Use `Objects.nonNull()` to filter out parsing failures

## 🎓 Learning Objectives

- File I/O with `java.nio.file.Files`
- Stream API for data processing
- Data validation patterns
- Exception handling best practices
- CSV parsing techniques

## 🔗 Related Topics

- [File Read & Parse](/theory/algorithms.md#file-read-parse)
- [Stream API](/theory/java.md#stream-api)
- [Exception Handling](/theory/java.md#exception-handling)
