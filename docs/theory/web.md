# Web Development Theory

---
title: "Modern Web Development"
description: "Master modern web development with HTML5, CSS3, ES6+, React, TypeScript, and responsive design principles"
difficulty: intermediate
estimatedMinutes: 240
lastUpdated: "2024-12-19"
version: "1.0"
prerequisites: ["Alapvető programozási ismeretek", "HTML/CSS alapok"]
learningGoals:
  - "HTML5 szemantikus elemek és accessibility"
  - "CSS3 haladó funkciók: Grid, Flexbox, CSS Variables"
  - "ES6+ JavaScript: arrow functions, destructuring, async/await"
  - "React fundamentals és hooks"
  - "TypeScript típusrendszer és interface design"
  - "Responsive design és modern CSS"
starterLinks:
  - { name: "CodePen", url: "https://codepen.io/", icon: "✏️" }
  - { name: "JSFiddle", url: "https://jsfiddle.net/", icon: "🔧" }
  - { name: "StackBlitz", url: "https://stackblitz.com/", icon: "⚡" }
  - { name: "CodeSandbox", url: "https://codesandbox.io/", icon: "📦" }
completion:
  - "Responsive layout létrehozás CSS Grid és Flexbox használatával"
  - "React komponens architektúra tervezés és hooks használat"
  - "TypeScript interface-ek és típus biztonság implementálás"
  - "Modern JavaScript ES6+ funkciók alkalmazása"
  - "Web accessibility és semantic HTML implementálás"
---

## 1. HTML5 és Semantic Web

### Semantic HTML Elements

```html
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Modern web development tutorial">
    <title>Web Development Guide</title>
</head>
<body>
    <!-- Page structure -->
    <header>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <header>
                <h1>Article Title</h1>
                <p>Published on <time datetime="2024-12-19">December 19, 2024</time></p>
            </header>
            
            <section>
                <h2>Introduction</h2>
                <p>Article content goes here...</p>
            </section>
            
            <aside>
                <h3>Related Links</h3>
                <ul>
                    <li><a href="#">Related article 1</a></li>
                    <li><a href="#">Related article 2</a></li>
                </ul>
### HTML5 Forms and Validation

```html
<form id="registration-form" novalidate>
    <!-- Text inputs with validation -->
    <div class="form-group">
        <label for="email">Email Address</label>
        <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            autocomplete="email"
            aria-describedby="email-error"
        />
        <span id="email-error" class="error-message" role="alert"></span>
    </div>

    <!-- Number input -->
    <div class="form-group">
        <label for="age">Age</label>
        <input 
            type="number" 
            id="age" 
            name="age" 
            min="18" 
            max="100"
            aria-describedby="age-help"
        />
        <small id="age-help">Must be between 18 and 100</small>
    </div>

    <!-- Date input -->
    <div class="form-group">
        <label for="birthdate">Birth Date</label>
        <input 
            type="date" 
            id="birthdate" 
            name="birthdate"
            max="2006-01-01"
        />
    </div>

    <!-- Select with options -->
    <div class="form-group">
        <label for="country">Country</label>
        <select id="country" name="country" required>
            <option value="">Select a country</option>
            <option value="hu">Hungary</option>
            <option value="uk">United Kingdom</option>
            <option value="de">Germany</option>
        </select>
    </div>

    <!-- File upload -->
    <div class="form-group">
        <label for="avatar">Profile Picture</label>
        <input 
            type="file" 
            id="avatar" 
            name="avatar" 
            accept="image/*"
            aria-describedby="avatar-help"
        />
        <small id="avatar-help">Max file size: 5MB</small>
    </div>

    <button type="submit">Register</button>
</form>
```

## 2. Modern CSS3 and Styling

### CSS Grid Layout

```css
/* Grid Container */
.grid-container {
    display: grid;
    grid-template-columns: 200px 1fr 100px;
    grid-template-rows: auto 1fr auto;
    grid-template-areas: 
        "sidebar header header"
        "sidebar main aside"
        "footer footer footer";
    gap: 20px;
    min-height: 100vh;
}

/* Grid Items */
.header { 
    grid-area: header;
    background: #3498db;
}

.main { 
    grid-area: main;
    background: #ecf0f1;
}

/* Responsive Grid */
@media (max-width: 768px) {
    .grid-container {
        grid-template-columns: 1fr;
        grid-template-areas: 
            "header"
            "main"
            "aside"
            "sidebar"
            "footer";
    }
}
```

### Flexbox Patterns

```css
/* Basic Flex Container */
.flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
}

/* Card Layout with Flexbox */
.card {
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
}

.card-content {
    padding: 1rem;
    flex: 1; /* Grow to fill space */
}

.card-actions {
    padding: 1rem;
    margin-top: auto; /* Push to bottom */
}
```

### CSS Variables and Modern Features

```css
:root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --spacing-md: 1rem;
    --border-radius: 8px;
}

.button {
    background-color: var(--primary-color);
    padding: var(--spacing-md);
    border-radius: var(--border-radius);
    transition: all 0.3s ease;
}

/* Container Queries */
.container {
    container-type: inline-size;
}

@container (min-width: 400px) {
    .card {
        display: flex;
    }
}
```

## 3. Modern JavaScript (ES6+)

### Arrow Functions and Destructuring

```javascript
// Arrow functions
const add = (a, b) => a + b;

// Destructuring
const user = { name: 'Alice', email: 'alice@example.com', age: 25 };
const { name, email } = user;

const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;

// Template literals
const message = `Hello, my name is ${name} and I'm ${age} years old.`;

// Spread operator
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];

const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 };
```

### Async JavaScript

```javascript
// Promises
const fetchUser = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve({ id, name: `User ${id}` });
            } else {
                reject(new Error('Invalid user ID'));
            }
        }, 1000);
    });
};

// Async/Await
const getUserData = async (id) => {
    try {
        const user = await fetchUser(id);
        return user;
    } catch (error) {
        console.error('Failed to get user data:', error);
        throw error;
    }
};

// Fetch API
const apiCall = async (endpoint, options = {}) => {
    try {
        const response = await fetch(endpoint, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};
```

### Modern JavaScript Patterns

```javascript
// Classes
class User {
    #balance = 0; // Private field
    
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    
    greet() {
        return `Hello, I'm ${this.name}`;
    }
    
    static validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}

// Modules
// user.js
export class User { /* ... */ }
export const validateEmail = (email) => { /* ... */ };

// main.js
import { User, validateEmail } from './user.js';

// Map and Set
const userMap = new Map();
userMap.set('user1', { name: 'Alice', role: 'admin' });

const uniqueIds = new Set([1, 2, 3, 1]); // [1, 2, 3]
```

## 4. React Fundamentals

### Components and Hooks

```jsx
import React, { useState, useEffect, useCallback } from 'react';

const UserProfile = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/users/${userId}`);
                const userData = await response.json();
                setUser(userData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    const handleRefresh = useCallback(() => {
        setUser(null);
        setError(null);
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>No user found</div>;

    return (
        <div className="user-profile">
            <img src={user.avatar} alt={`${user.name}'s avatar`} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <button onClick={handleRefresh}>Refresh</button>
        </div>
    );
};
```

### Custom Hooks

```jsx
// Custom hook for API data fetching
const useApi = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

// Custom hook for local storage
const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            setStoredValue(value);
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error saving to localStorage', error);
        }
    };

    return [storedValue, setValue];
};
```

## 5. TypeScript Integration

### Basic Types and Interfaces

```typescript
// Basic types
let name: string = 'John';
let age: number = 30;
let isActive: boolean = true;
let hobbies: string[] = ['reading', 'coding'];

// Union types
type Status = 'loading' | 'success' | 'error';

// Interfaces
interface User {
    id: number;
    name: string;
    email: string;
    role?: string; // Optional property
    readonly isVerified: boolean; // Read-only
}

// Generic interfaces
interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
}

// Function types
type EventHandler<T> = (event: T) => void;

// Utility types
type PublicUserData = Pick<User, 'id' | 'name' | 'email'>;
type CreateUserData = Omit<User, 'id'>;
type UpdateUserData = Partial<User>;
```

### React with TypeScript

```typescript
import React, { FC, useState } from 'react';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<ButtonProps> = ({ children, variant = 'primary', onClick }) => {
    return (
        <button 
            className={`btn btn-${variant}`} 
            onClick={onClick}
        >
            {children}
        </button>
    );
};

// Generic component
interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
    return (
        <ul>
            {items.map((item, index) => (
                <li key={index}>{renderItem(item)}</li>
            ))}
        </ul>
    );
}
```

## 6. Performance és Best Practices

### Performance Optimization

```javascript
// Lazy loading with Intersection Observer
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// Debouncing
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

// Code splitting with dynamic imports
const loadComponent = async (componentName) => {
    const module = await import(`./components/${componentName}.js`);
    return module.default;
};
```

### Modern Development Tools

```bash
# Package managers
npm install package-name
yarn add package-name

# Build tools
npm run build
npm run dev

# Testing
npm test
npm run test:coverage
```

Ez a Modern Web Development Theory tartalom átfogó képet ad a modern web fejlesztés minden fontosabb területéről, a HTML5 alapoktól a TypeScript-ig és React-ig.
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

const searchHandler = debounce((query) => {
    console.log('Searching for:', query);
}, 300);

// Lazy loading
const lazyLoad = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            observer.unobserve(img);
        }
    });
};

const imageObserver = new IntersectionObserver(lazyLoad);
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});
```

## Következő lépések

1. Gyakorold a DOM manipulációt
2. Tanulj meg egy frontend framework-öt (React, Vue, Angular)
3. Ismerkedj meg a TypeScript-tel
4. Próbáld ki a modern build tool-okat
5. Tanulj Progressive Web App (PWA) fejlesztést
