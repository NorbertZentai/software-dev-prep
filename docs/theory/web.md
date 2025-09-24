# Web Fejlesztés Alapok

## HTML Alapok

### HTML5 szemantikus elemek

```html
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Development Basics</title>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#home">Főoldal</a></li>
                <li><a href="#about">Rólunk</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <article>
            <h1>Cikk címe</h1>
            <p>Cikk tartalma...</p>
        </article>
        
        <aside>
            <h2>Kapcsolódó tartalom</h2>
            <p>Oldalsáv tartalom...</p>
        </aside>
    </main>
    
    <footer>
        <p>&copy; 2025 Weboldal</p>
    </footer>
</body>
</html>
```

### Fontos HTML elemek

```html
<!-- Form elemek -->
<form action="/submit" method="POST">
    <label for="name">Név:</label>
    <input type="text" id="name" name="name" required>
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    
    <label for="message">Üzenet:</label>
    <textarea id="message" name="message" rows="4" cols="50"></textarea>
    
    <button type="submit">Küldés</button>
</form>

<!-- Multimédia -->
<img src="image.jpg" alt="Kép leírása" width="300" height="200">
<video controls width="400">
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    Böngésző nem támogatja a videót.
</video>

<!-- Táblázatok -->
<table>
    <thead>
        <tr>
            <th>Név</th>
            <th>Életkor</th>
            <th>Város</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Anna</td>
            <td>25</td>
            <td>Budapest</td>
        </tr>
    </tbody>
</table>
```

## CSS Alapok

### CSS Szelektorok

```css
/* Elem szelektíó */
p { color: blue; }

/* Osztály szelektor */
.highlight { background-color: yellow; }

/* ID szelektor */
#header { font-size: 2em; }

/* Attribútum szelektor */
input[type="email"] { border: 1px solid blue; }

/* Pszeudo-osztályok */
a:hover { text-decoration: underline; }
p:first-child { margin-top: 0; }

/* Pszeudo-elemek */
p::before { content: "→ "; }
p::after { content: " ←"; }
```

### Box Model

```css
.box {
    width: 200px;
    height: 100px;
    padding: 10px;
    border: 2px solid black;
    margin: 20px;
    box-sizing: border-box; /* padding és border beleértve a width-be */
}

/* Flexbox */
.container {
    display: flex;
    justify-content: center; /* horizontális igazítás */
    align-items: center; /* vertikális igazítás */
    flex-direction: row; /* vagy column */
}

.item {
    flex: 1; /* egyenlő szélességű elemek */
    flex-grow: 2; /* 2x gyorsabban nő */
}
```

### CSS Grid

```css
.grid-container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr; /* 3 oszlop */
    grid-template-rows: auto 1fr auto;
    grid-gap: 20px;
    height: 100vh;
}

.header {
    grid-column: 1 / -1; /* teljes szélességben */
    grid-row: 1;
}

.sidebar {
    grid-column: 1;
    grid-row: 2;
}

.main {
    grid-column: 2;
    grid-row: 2;
}
```

### Responsive Design

```css
/* Mobile First megközelítés */
.container {
    width: 100%;
    padding: 10px;
}

/* Tablet */
@media (min-width: 768px) {
    .container {
        max-width: 750px;
        margin: 0 auto;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .container {
        max-width: 1200px;
        display: grid;
        grid-template-columns: 1fr 3fr;
    }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
    body {
        background-color: #1a1a1a;
        color: #ffffff;
    }
}
```

## JavaScript ES6+ Alapok

### Változók és konstansok

```javascript
// let - blokk szintű változó
let userName = "Anna";
userName = "Béla"; // újraértékelhető

// const - konstans
const API_URL = "https://api.example.com";
const users = []; // a tömb tartalma módosítható, de újra nem értékelhető

// var - kerüljük (funkció szintű hatókör)
```

### Arrow Functions

```javascript
// Hagyományos function
function add(a, b) {
    return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// Több sor esetén
const processUser = (user) => {
    const processed = user.name.toUpperCase();
    return { ...user, processedName: processed };
};

// Array metódusokkal
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);
```

### Destructuring

```javascript
// Array destructuring
const coordinates = [10, 20];
const [x, y] = coordinates;

// Object destructuring
const user = { name: "Anna", age: 25, city: "Budapest" };
const { name, age } = user;

// Függvény paraméterekben
const greetUser = ({ name, age }) => {
    console.log(`Hello ${name}, you are ${age} years old`);
};

// Rest operator
const [first, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(rest); // [2, 3, 4, 5]
```

### Template Literals

```javascript
const name = "Anna";
const age = 25;

// Template string
const greeting = `Hello ${name}, you are ${age} years old`;

// Többsoros string
const html = `
    <div class="user">
        <h2>${name}</h2>
        <p>Age: ${age}</p>
    </div>
`;

// Tagged template literals
function highlight(strings, ...values) {
    return strings.reduce((result, string, i) => {
        const value = values[i] ? `<mark>${values[i]}</mark>` : '';
        return result + string + value;
    }, '');
}

const message = highlight`User ${name} is ${age} years old`;
```

### Promises és Async/Await

```javascript
// Promise
const fetchUser = (id) => {
    return new Promise((resolve, reject) => {
        // Szimulált API hívás
        setTimeout(() => {
            if (id > 0) {
                resolve({ id, name: "User " + id });
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 1000);
    });
};

// Promise használata
fetchUser(1)
    .then(user => console.log(user))
    .catch(error => console.error(error));

// Async/Await
const getUser = async (id) => {
    try {
        const user = await fetchUser(id);
        console.log(user);
        return user;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};

// Fetch API
const loadUsers = async () => {
    try {
        const response = await fetch('/api/users');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Failed to load users:', error);
        return [];
    }
};
```

### Modules

```javascript
// math.js - export
export const PI = 3.14159;
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;

// default export
export default class Calculator {
    add(a, b) { return a + b; }
    subtract(a, b) { return a - b; }
}

// main.js - import
import Calculator, { PI, add } from './math.js';
import * as MathUtils from './math.js';

const calc = new Calculator();
console.log(calc.add(5, 3));
console.log(PI);
console.log(MathUtils.multiply(4, 5));
```

### Classes

```javascript
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    
    greet() {
        return `Hello, I'm ${this.name}`;
    }
    
    // Static method
    static validateEmail(email) {
        return email.includes('@');
    }
    
    // Getter
    get displayName() {
        return this.name.toUpperCase();
    }
    
    // Setter
    set displayName(value) {
        this.name = value.toLowerCase();
    }
}

// Inheritance
class AdminUser extends User {
    constructor(name, email, permissions) {
        super(name, email);
        this.permissions = permissions;
    }
    
    greet() {
        return `${super.greet()}, I'm an admin`;
    }
}
```

## DOM Manipulation

### Element Selection

```javascript
// Modern szelektorok
const element = document.querySelector('.my-class');
const elements = document.querySelectorAll('p');
const byId = document.getElementById('my-id');

// Event listeners
element.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('Element clicked!', event.target);
});

// Element létrehozás és módosítás
const newDiv = document.createElement('div');
newDiv.textContent = 'Hello World';
newDiv.classList.add('highlight');
document.body.appendChild(newDiv);

// Attributes és properties
element.setAttribute('data-id', '123');
element.dataset.userId = '456'; // data-user-id attribútum
element.style.backgroundColor = 'lightblue';
```

### Event Handling

```javascript
// Event delegation
document.addEventListener('click', (event) => {
    if (event.target.matches('.button')) {
        console.log('Button clicked:', event.target);
    }
});

// Custom events
const customEvent = new CustomEvent('userLogin', {
    detail: { userId: 123, userName: 'Anna' }
});
document.dispatchEvent(customEvent);

document.addEventListener('userLogin', (event) => {
    console.log('User logged in:', event.detail);
});

// Form handling
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log('Form data:', data);
});
```

## HTTP és REST API

### Fetch API

```javascript
// GET request
const getUsers = async () => {
    try {
        const response = await fetch('/api/users', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// POST request
const createUser = async (userData) => {
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to create user');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

// Error handling with different status codes
const handleApiResponse = async (response) => {
    switch (response.status) {
        case 200:
        case 201:
            return await response.json();
        case 400:
            const error = await response.json();
            throw new Error(`Validation error: ${error.message}`);
        case 401:
            throw new Error('Unauthorized - please login');
        case 404:
            throw new Error('Resource not found');
        case 500:
            throw new Error('Server error - please try again later');
        default:
            throw new Error(`Unexpected error: ${response.status}`);
    }
};
```

## Local Storage és Session Storage

```javascript
// Local Storage (adatok megmaradnak böngésző bezárása után)
localStorage.setItem('user', JSON.stringify({ name: 'Anna', id: 123 }));
const user = JSON.parse(localStorage.getItem('user'));
localStorage.removeItem('user');
localStorage.clear();

// Session Storage (adatok eltűnnek böngésző bezárása után)
sessionStorage.setItem('token', 'abc123');
const token = sessionStorage.getItem('token');

// Storage events (más tab-ok közötti kommunikáció)
window.addEventListener('storage', (event) => {
    if (event.key === 'user') {
        console.log('User data changed:', event.newValue);
    }
});
```

## Modern JavaScript Tools

### Package Managers
```bash
# npm
npm install lodash
npm install --save-dev jest

# yarn
yarn add lodash
yarn add --dev jest
```

### Bundlers
- **Webpack**: Modulok és assets bundling-ja
- **Vite**: Gyors fejlesztői környezet
- **Parcel**: Zero-config bundler

### Transpilation
- **Babel**: ES6+ → ES5 konvertálás
- **TypeScript**: Típusok hozzáadása JavaScript-hez

## Best Practices

### 1. Clean Code
```javascript
// Rossz
const d = new Date();
const y = d.getFullYear();

// Jó
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
```

### 2. Error Handling
```javascript
// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // Send to logging service
});

// Promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
});
```

### 3. Performance
```javascript
// Debouncing
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
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