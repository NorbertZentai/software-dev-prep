# Web Development

## Rövid összefoglaló

A web development magában foglalja az HTML, CSS és JavaScript technológiák használatát interaktív weboldalak és alkalmazások készítéséhez. A modern web fejlesztés középpontjában a böngésző-szerver kommunikáció, a reszponzív design és a felhasználói élmény áll. Fő technológiák: HTML5 szemantikus elemek, CSS3 haladó funkciók (Grid, Flexbox), ES6+ JavaScript, HTTP protokoll és REST API-k. Buktatók közé tartozik a cross-browser kompatibilitás, performance optimalizáció és a biztonsági kérdések kezelése.

<!-- Reading Progress Bar -->
<div id="read-progress"></div>

<!-- Tag Filter -->
<div class="tag-filter-container">
  <h3>🏷️ Szűrés témakörök szerint</h3>
  <div class="tag-filter-chips">
    <button class="filter-chip active" data-filter="all">Mind</button>
    <button class="filter-chip" data-filter="junior">Junior</button>
    <button class="filter-chip" data-filter="medior">Medior</button>
    <button class="filter-chip" data-filter="html">HTML</button>
    <button class="filter-chip" data-filter="css">CSS</button>
    <button class="filter-chip" data-filter="javascript">JavaScript</button>
    <button class="filter-chip" data-filter="http">HTTP</button>
    <button class="filter-chip" data-filter="performance">Performance</button>
    <button class="filter-chip" data-filter="security">Security</button>
  </div>
</div>

## Fogalmak

### HTML {#html}

<div class="concept-section mental-model" data-filter="html junior">

🧭 **Így gondolj rá**  
*A HTML olyan, mint egy ház vázszerkezete: a falak, ajtók, ablakok helyét határozza meg, de nem a színüket vagy stílusukat.*

</div>

<div class="concept-section why-important" data-filter="html junior">

💡 **Miért számít?**
- **Szemantikus struktúra**: a tartalom jelentését közvetíti, nem csak a megjelenését
- **Accessibility**: képernyőolvasók és más assistive technológiák alapja
- **SEO optimalizáció**: keresőmotorok a HTML struktúra alapján értelmezik az oldalt
- **Platform függetlenség**: minden böngésző és eszköz értelmezi

</div>

<div class="runnable-model" data-filter="html junior">

**Runnable mental model**
```html
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Modern weboldal példa">
    <title>Weboldal Címe</title>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#home">Főoldal</a></li>
                <li><a href="#about">Rólunk</a></li>
                <li><a href="#contact">Kapcsolat</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="home">
            <h1>Üdvözöljük weboldalunkon</h1>
            <article>
                <h2>Cikkünk címe</h2>
                <p>Ez egy <strong>fontos</strong> bekezdés, amely tartalmaz egy 
                   <a href="https://example.com" target="_blank">külső linket</a>.</p>
            </article>
        </section>
        
        <aside>
            <h3>Oldalsáv</h3>
            <ul>
                <li>Kapcsolódó cikk 1</li>
                <li>Kapcsolódó cikk 2</li>
            </ul>
        </aside>
    </main>
    
    <footer>
        <p>&copy; 2024 Cégünk. Minden jog fenntartva.</p>
    </footer>
</body>
</html>
```
*Figyeld meg: header, nav, main, section, article, aside, footer szemantikus elemek strukturálják a tartalmat.*

</div>

<div class="concept-section myths" data-filter="html">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „A div és span minden helyzetben megfelelő." → Szemantikus elemek (header, nav, main, article) jobbak a SEO és accessibility szempontjából
- „A HTML csak a megjelenésért felelős." → A HTML a tartalmi struktúráért, a CSS a megjelenésért
- „Az inline style-ok gyorsabbak." → External CSS gyorsabb caching és jobb karbantarthatóság miatt

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="html">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**HTML5 szemantikus elemek:**
```html
<article>   <!-- Önálló tartalom -->
<section>   <!-- Logikai szakasz -->
<nav>       <!-- Navigációs elemek -->
<aside>     <!-- Kapcsolódó tartalom -->
<header>    <!-- Fejléc -->
<footer>    <!-- Lábléc -->
<main>      <!-- Fő tartalom -->
<figure>    <!-- Képek captionnal -->
```

**Form validation attributes:**
```html
<input type="email" required pattern="[^@]+@[^@]+\.[^@]+">
<input type="tel" pattern="[0-9]{2}-[0-9]{3}-[0-9]{4}">
<input type="number" min="18" max="100" step="1">
```

</div>

</details>

</div>

### CSS (Flex, Grid) {#css-flex-grid}

<div class="concept-section mental-model" data-filter="css medior">

🧭 **Így gondolj rá**  
*CSS Grid olyan, mint egy építészeti tervrajz (2D layout), Flexbox pedig mint a bútorok elrendezése egy szobában (1D layout).*

</div>

<div class="concept-section why-important" data-filter="css medior">

💡 **Miért számít?**
- **Modern layout**: Grid és Flexbox helyettesíti a float-okat és position hacks-eket
- **Responsive design**: natívan támogatja a különböző képernyőméreteket
- **Browser support**: modern böngészők 95%+ támogatják
- **Maintenance**: tisztább, érthetőbb kód kevesebb media query-vel

</div>

<div class="runnable-model" data-filter="css">

**Runnable mental model**
```css
/* CSS Grid - 2D Layout */
.grid-container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;  /* 3 oszlop */
    grid-template-rows: auto 1fr auto;   /* 3 sor */
    grid-template-areas: 
        "header header header"
        "sidebar main aside"
        "footer footer footer";
    gap: 20px;
    min-height: 100vh;
}

.header { grid-area: header; }
.main { grid-area: main; }

/* Flexbox - 1D Layout */
.navbar {
    display: flex;
    justify-content: space-between;  /* horizontális alignment */
    align-items: center;             /* vertikális alignment */
    padding: 1rem 2rem;
}

.nav-links {
    display: flex;
    gap: 2rem;        /* távolság elemek között */
    list-style: none;
}

/* Responsive Design */
@media (max-width: 768px) {
    .grid-container {
        grid-template-columns: 1fr;  /* mobil: 1 oszlop */
        grid-template-areas: 
            "header"
            "main"
            "sidebar"
            "footer";
    }
}
```
*Figyeld meg: Grid 2D layout (sorok+oszlopok), Flexbox 1D layout (egy irány).*

</div>

<div class="concept-section myths" data-filter="css">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Grid helyettesíti a Flexbox-ot." → Mindkettő hasznos: Grid 2D layout-okhoz, Flexbox 1D elrendezésekhez
- „CSS Grid túl bonyolult." → Alapvető layout-ok egyszerűbbek mint float/position kombinációk
- „Flexbox nem támogatott." → 2023+ minden modern böngésző támogatja

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="css">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**CSS Variables (Custom Properties):**
```css
:root {
    --primary-color: #007bff;
    --spacing: 1rem;
    --border-radius: 8px;
}

.button {
    background-color: var(--primary-color);
    padding: var(--spacing);
    border-radius: var(--border-radius);
}
```

**Modern CSS Features:**
```css
/* Container Queries */
@container (min-width: 400px) {
    .card { display: flex; }
}

/* Color functions */
.button:hover {
    background-color: color-mix(in srgb, var(--primary-color) 80%, black);
}
```

</div>

</details>

</div>

### JavaScript (ES6+) {#javascript-es6}

<div class="concept-section mental-model" data-filter="javascript medior">

🧭 **Így gondolj rá**  
*A modern JavaScript olyan, mint egy svájci bicska: arrow functions (rövidebb írás), destructuring (kicsomagolás), async/await (várakozás kezelés) - minden eszköz egy helyen.*

</div>

<div class="concept-section why-important" data-filter="javascript medior">

💡 **Miért számít?**
- **Kód tisztaság**: rövidebb, olvashatóbb szintaxis
- **Aszinkron kezelés**: async/await egyszerűsíti a Promise-okat
- **Moduláris fejlesztés**: import/export statements
- **Performance**: modern JavaScript engine optimalizációk

</div>

<div class="runnable-model" data-filter="javascript">

**Runnable mental model**
```javascript
// Arrow functions és destructuring
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const fetchUser = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

// Template literals és destructuring
const createUserCard = (user) => {
    const { name, email, address: { city, zipcode } } = user;
    
    return `
        <div class="user-card" data-user-id="${user.id}">
            <h3>${name}</h3>
            <p>Email: ${email}</p>
            <p>City: ${city}, ${zipcode}</p>
        </div>
    `;
};

// Classes és async patterns
class UserManager {
    constructor(containerElement) {
        this.container = containerElement;
        this.users = new Map();
        this.init();
    }
    
    async loadUsers() {
        try {
            const userIds = [1, 2, 3, 4, 5];
            const userPromises = userIds.map(id => fetchUser(id));
            const users = await Promise.all(userPromises);
            
            users.forEach(user => this.users.set(user.id, user));
            this.render();
        } catch (error) {
            this.showError('Felhasználók betöltése sikertelen');
        }
    }
}
```
*Figyeld meg: async/await egyszerűbb mint .then() láncok, destructuring rövidebb mint object property hozzáférés.*

</div>

<div class="concept-section myths" data-filter="javascript">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „ES6+ csak új böngészőkben működik." → Babel transpiler lehetővé teszi régi böngésző támogatást
- „Arrow function mindig jobb." → Regular function-öket használj ha this binding kell
- „async/await lassabb mint Promise.then()." → Azonos teljesítmény, csak szintaxis különbség

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="javascript">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Spread operator használat:**
```javascript
// Arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];  // [1, 2, 3, 4, 5, 6]

// Objects
const user = { name: 'John', age: 30 };
const updatedUser = { ...user, age: 31, city: 'Budapest' };
```

**Debouncing pattern:**
```javascript
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};

const debouncedSearch = debounce((query) => {
    console.log('Searching for:', query);
}, 300);
```

</div>

</details>

</div>

### HTTP metódusok {#http-modusok}

<div class="concept-section mental-model" data-filter="http medior">

🧭 **Így gondolj rá**  
*A HTTP metódusok olyan, mint egy könyvtár szabályai: GET = olvasás (nincs változás), POST = új könyv beszerzése, PUT = könyv cseréje, DELETE = könyv kiselejtezése.*

</div>

<div class="concept-section why-important" data-filter="http medior">

💡 **Miért számít?**
- **RESTful API design**: minden metódusnak saját szemantikai jelentése van
- **Idempotencia**: GET, PUT, DELETE biztonságosan ismételhető
- **Caching**: GET kérések cache-elhetők, POST nem
- **Security**: különböző metódusok különböző jogosultságokat igényelhetnek

</div>

<div class="runnable-model" data-filter="http">

**Runnable mental model**
```javascript
const API_BASE = '/api';

// GET - Adatok lekérése (Safe + Idempotent)
const getUsers = async () => {
    const response = await fetch(`${API_BASE}/users`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    });
    
    if (!response.ok) {
        throw new Error(`GET failed: ${response.status}`);
    }
    
    return await response.json();
};

// POST - Új adat létrehozása (Neither safe nor idempotent)
const createUser = async (userData) => {
    const response = await fetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(`POST failed: ${error.message}`);
    }
    
    return await response.json();
};

// PUT - Teljes frissítés (Idempotent)
const updateUser = async (userId, userData) => {
    const response = await fetch(`${API_BASE}/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
    
    return await response.json();
};

// DELETE - Törlés (Idempotent)
const deleteUser = async (userId) => {
    const response = await fetch(`${API_BASE}/users/${userId}`, {
        method: 'DELETE'
    });
    
    if (!response.ok) {
        throw new Error(`DELETE failed: ${response.status}`);
    }
    
    return response.status === 204; // No content
};
```
*Figyeld meg: GET safe és idempotent, POST egyikse sem, PUT és DELETE idempotent.*

</div>

<div class="concept-section myths" data-filter="http">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „POST és PUT ugyanaz." → POST nem idempotent (többszöri hívás különböző eredményt ad), PUT idempotent
- „GET-nek nincs body." → Technikailag lehetséges, de nem ajánlott és sok szerver ignorálja
- „DELETE mindig töröl." → DELETE azt jelenti "törölni szeretném", a szerver dönt a tényleges törlésről

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="http">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**HTTP metódus tulajdonságok:**
```
GET     - Safe ✅, Idempotent ✅, Cacheable ✅
POST    - Safe ❌, Idempotent ❌, Cacheable ❌  
PUT     - Safe ❌, Idempotent ✅, Cacheable ❌
PATCH   - Safe ❌, Idempotent ❌, Cacheable ❌
DELETE  - Safe ❌, Idempotent ✅, Cacheable ❌
```

**PATCH vs PUT különbség:**
```javascript
// PUT - teljes objektum csere
const putUser = { id: 1, name: "John", email: "john@new.com", age: 30 };

// PATCH - részleges módosítás
const patchUser = { email: "john@updated.com" };
```

</div>

</details>

</div>

### HTTP státuszkódok {#http-statuszkodok}

<div class="concept-section mental-model" data-filter="http medior">

🧭 **Így gondolj rá**  
*A HTTP státuszkódok olyan, mint egy orvosi diagnózis: 2xx = egészséges, 3xx = áthelyezés szükséges, 4xx = te hibáztál, 5xx = mi hibáztunk.*

</div>

<div class="concept-section why-important" data-filter="http medior">

💡 **Miért számít?**
- **Error handling**: különböző hibák különböző kezelést igényelnek
- **API design**: RESTful API-k konzisztens státuszkód használata
- **Caching**: 200, 301, 304 státuszkódok befolyásolják a cache-elést
- **User experience**: megfelelő hibaüzenetek státuszkód alapján

</div>

<div class="runnable-model" data-filter="http">

**Runnable mental model**
```javascript
// HTTP Status Code Handler
const handleHttpResponse = async (response) => {
    const statusCode = response.status;
    
    // 2xx Success
    if (statusCode >= 200 && statusCode < 300) {
        switch (statusCode) {
            case 200: // OK
                return await response.json();
            case 201: // Created
                const created = await response.json();
                console.log('Resource created:', created);
                return created;
            case 204: // No Content
                return null; // Successful deletion
            default:
                return await response.json();
        }
    }
    
    // 4xx Client Errors
    if (statusCode >= 400 && statusCode < 500) {
        const errorData = await response.json().catch(() => ({}));
        
        switch (statusCode) {
            case 400: // Bad Request
                throw new Error(`Invalid request: ${errorData.message || 'Bad request'}`);
            case 401: // Unauthorized
                // Redirect to login
                window.location.href = '/login';
                throw new Error('Authentication required');
            case 403: // Forbidden
                throw new Error('Access denied');
            case 404: // Not Found
                throw new Error('Resource not found');
            case 422: // Unprocessable Entity
                throw new Error(`Validation failed: ${JSON.stringify(errorData.errors)}`);
            case 429: // Too Many Requests
                const retryAfter = response.headers.get('Retry-After');
                throw new Error(`Rate limited. Retry after: ${retryAfter}s`);
            default:
                throw new Error(`Client error: ${statusCode}`);
        }
    }
    
    // 5xx Server Errors
    if (statusCode >= 500) {
        switch (statusCode) {
            case 500: // Internal Server Error
                throw new Error('Server internal error');
            case 502: // Bad Gateway
                throw new Error('Bad gateway');
            case 503: // Service Unavailable
                throw new Error('Service temporarily unavailable');
            default:
                throw new Error(`Server error: ${statusCode}`);
        }
    }
};
```
*Figyeld meg: 4xx hibákat a kliens okozhatta, 5xx hibákat a szerver.*

</div>

<div class="concept-section myths" data-filter="http">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „404 mindig file not found." → 404 bármilyen resource not found (API endpoint, user, record)
- „500 hiba mindig bad code." → Lehet database down, third-party service failure is
- „200 mindig siker." → 200-as válaszban is lehet application-level error

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="http">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**HTTP státuszkód kategóriák:**
```
1xx - Informational  (ritkán használt)
2xx - Success        (200 OK, 201 Created, 204 No Content)
3xx - Redirection    (301 Moved, 302 Found, 304 Not Modified)
4xx - Client Error   (400 Bad Request, 401 Unauthorized, 404 Not Found)
5xx - Server Error   (500 Internal Error, 502 Bad Gateway, 503 Unavailable)
```

**Gyakori státuszkód párosítások:**
```javascript
// CRUD műveletek és státuszkódok
GET /users        → 200 OK (users list)
POST /users       → 201 Created (new user)
PUT /users/123    → 200 OK (updated user)
DELETE /users/123 → 204 No Content (deleted)
```

</div>

</details>

</div>

### DOM (Document Object Model) {#dom}

<div class="concept-section mental-model" data-filter="javascript junior">

🧭 **Így gondolj rá**  
*A DOM olyan, mint egy ház 3D modellje: minden szoba (elem) helyét, kapcsolatait és tulajdonságait ismerjük, és át tudjuk alakítani a házat (weboldalt) bármikor.*

</div>

<div class="concept-section why-important" data-filter="javascript junior">

💡 **Miért számít?**
- **Dinamikus tartalom**: futásidőben módosíthatjuk a weboldal tartalmát és megjelenését
- **Interaktivitás alapja**: felhasználói események kezelése és válaszok megjelenítése
- **JavaScript integráció**: köti össze a statikus HTML-t a dinamikus JavaScript viselkedéssel
- **Modern webalkalmazások**: SPA-k és interaktív felületek alapja

</div>

<div class="runnable-model" data-filter="javascript">

**Runnable mental model**
```javascript
// DOM Tree Navigation
const domExplorer = {
    // Element selection methods
    selectElements() {
        // ID alapján
        const header = document.getElementById('main-header');
        
        // CSS selector alapján
        const buttons = document.querySelectorAll('.btn-primary');
        const firstButton = document.querySelector('.btn-primary');
        
        // Tag name alapján
        const allDivs = document.getElementsByTagName('div');
        
        // Class name alapján
        const cards = document.getElementsByClassName('card');
        
        return { header, buttons, firstButton, allDivs, cards };
    },
    
    // DOM manipulation
    manipulateElements() {
        // Új elem létrehozása
        const newDiv = document.createElement('div');
        newDiv.className = 'dynamic-content';
        newDiv.innerHTML = '<p>Dinamikusan létrehozott tartalom</p>';
        
        // Elem hozzáadása
        document.body.appendChild(newDiv);
        
        // Elem módosítása
        const existingElement = document.querySelector('#existing');
        if (existingElement) {
            existingElement.textContent = 'Módosított szöveg';
            existingElement.style.color = 'blue';
            existingElement.setAttribute('data-modified', 'true');
        }
        
        // Elem eltávolítása
        const elementToRemove = document.querySelector('.remove-me');
        if (elementToRemove) {
            elementToRemove.parentNode.removeChild(elementToRemove);
        }
    },
    
    // Event handling
    setupEventListeners() {
        // Click event
        document.addEventListener('click', (event) => {
            if (event.target.matches('.clickable')) {
                console.log('Clickable element clicked:', event.target);
            }
        });
        
        // Form events
        const form = document.querySelector('#user-form');
        if (form) {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                const formData = new FormData(form);
                console.log('Form submitted:', Object.fromEntries(formData));
            });
        }
        
        // Input events with debouncing
        const searchInput = document.querySelector('#search');
        if (searchInput) {
            let timeout;
            searchInput.addEventListener('input', (event) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    console.log('Search query:', event.target.value);
                }, 300);
            });
        }
    },
    
    // DOM traversal
    navigateDOM(element) {
        return {
            parent: element.parentElement,
            children: Array.from(element.children),
            siblings: Array.from(element.parentElement?.children || []).filter(el => el !== element),
            nextSibling: element.nextElementSibling,
            previousSibling: element.previousElementSibling,
            descendants: element.querySelectorAll('*')
        };
    }
};

// Példa használat
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    
    // DOM manipulation végrehajtása
    domExplorer.manipulateElements();
    domExplorer.setupEventListeners();
    
    // Element info lekérése
    const mainElement = document.querySelector('main');
    if (mainElement) {
        const domInfo = domExplorer.navigateDOM(mainElement);
        console.log('DOM structure:', domInfo);
    }
});
```
*Figyeld meg: querySelector modern és rugalmas, getElementById gyorsabb, addEventListener eseménykezeléshez.*

</div>

<div class="concept-section myths" data-filter="javascript">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „A innerHTML mindig biztonságos." → XSS támadások lehetségesek, használj textContent-et vagy sanitize-ált HTML-t
- „A document.write modern böngészőkben is jó." → document.write blocking és nem ajánlott, használj DOM manipulation-t
- „A getElementsByTagName és querySelectorAll ugyanaz." → getElementsByTagName live collection, querySelectorAll static NodeList

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="javascript">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**DOM performance tips:**
```javascript
// Batch DOM updates
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
    const div = document.createElement('div');
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);
}
document.body.appendChild(fragment); // Single reflow

// Cache DOM queries
const elements = document.querySelectorAll('.item');
elements.forEach(el => el.style.display = 'block');

// Event delegation
document.addEventListener('click', (e) => {
    if (e.target.matches('.button')) {
        // Handle button clicks
    }
});
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="javascript junior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mi a DOM és hogyan működik?**
A: Document Object Model - a HTML dokumentum programozható reprezentációja. Fa struktúrában tárolja az elemeket, ahol minden HTML tag egy node.

**Q: Mi a különbség a innerHTML és textContent között?**
A: innerHTML HTML-t is értelmez és XSS támadásoknak kitett. textContent csak szöveget ad vissza és biztonságos.

**Q: Hogyan optimalizálnád a DOM manipulációt?**
A: DocumentFragment használata, batch updates, query cache-elés, minimális reflow/repaint.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="javascript">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **JavaScript ES6+** → DOM manipulation modern szintaxissal
- **Event Bubbling** → DOM események működési mechanizmusa
- **HTML5** → Szemantikus elemek amikkel a DOM dolgozik
- **CSS Selectors** → querySelector és querySelectorAll alapjai
- **Performance** → DOM műveletek optimalizációja
- **Security** → XSS védelem DOM manipulation során

</div>

</details>

</div>

### JSON {#json}
JavaScript Object Notation - adatcsere formátum API-k és web szolgáltatások között.

**Példa:**
```javascript
// JSON Manipulation and Validation
const userSchema = {
    id: 'number',
    name: 'string',
    email: 'string',
    isActive: 'boolean',
    preferences: 'object',
    tags: 'array'
};

// JSON parsing with error handling
const safeJsonParse = (jsonString) => {
    try {
        const parsed = JSON.parse(jsonString);
        return { success: true, data: parsed };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// JSON validation
const validateJson = (data, schema) => {
    const errors = [];
    
    for (const [key, expectedType] in Object.entries(schema)) {
        if (!(key in data)) {
            errors.push(`Missing required field: ${key}`);
            continue;
        }
        
        const value = data[key];
        const actualType = Array.isArray(value) ? 'array' : typeof value;
        
        if (actualType !== expectedType) {
            errors.push(`Field ${key}: expected ${expectedType}, got ${actualType}`);
        }
        
        // Additional validations
        if (key === 'email' && typeof value === 'string') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errors.push(`Field ${key}: invalid email format`);
            }
        }
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
};

// Complex JSON operations
const processUserData = (jsonString) => {
    // Parse JSON
    const parseResult = safeJsonParse(jsonString);
    if (!parseResult.success) {
        throw new Error(`JSON parse error: ${parseResult.error}`);
    }
    
    const users = parseResult.data;
    
    // Validate structure
    if (!Array.isArray(users)) {
        throw new Error('Expected array of users');
    }
    
    // Process each user
    const processedUsers = users.map((user, index) => {
        const validation = validateJson(user, userSchema);
        if (!validation.isValid) {
            console.warn(`User ${index} validation errors:`, validation.errors);
        }
        
        return {
            ...user,
            fullName: `${user.name}`,
            emailDomain: user.email ? user.email.split('@')[1] : null,
            status: user.isActive ? 'active' : 'inactive',
            processedAt: new Date().toISOString()
        };
    });
    
    return processedUsers;
};

// JSON API Response handling
const apiResponseHandler = {
    // Transform API response
    transformResponse(response) {
        return {
            data: response.data || null,
            meta: {
                timestamp: new Date().toISOString(),
                count: Array.isArray(response.data) ? response.data.length : 1,
                status: response.status || 'success'
            }
        };
    },
    
    // Create API request payload
    createPayload(data, metadata = {}) {
        return JSON.stringify({
            data,
            meta: {
                requestId: Math.random().toString(36).substr(2, 9),
                timestamp: new Date().toISOString(),
                ...metadata
            }
        });
    },
    
    // Deep clone JSON object
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },
    
    // Compare JSON objects
    isEqual(obj1, obj2) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }
};

// Example usage
const sampleJsonData = `[
    {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "isActive": true,
        "preferences": {
            "theme": "dark",
            "notifications": true
        },
        "tags": ["developer", "javascript"]
    }
]`;

try {
    const users = processUserData(sampleJsonData);
    console.log('Processed users:', users);
    
    const payload = apiResponseHandler.createPayload(users);
    console.log('API payload:', payload);
} catch (error) {
    console.error('Processing failed:', error.message);
}
```

Magyarázat: JSON egyszerű, ember által olvasható adatformátum, de fontos a proper parsing és validáció a biztonsági problémák elkerüléséhez.

### Event Bubbling és Event Delegation {#event-bubbling-delegation}

<div class="concept-section mental-model" data-filter="javascript junior">

🧭 **Így gondolj rá**  
*Event Bubbling olyan, mint a víz alatt felszínre törő buborék: az esemény a mélyről (target elem) indul és felfelé halad a szülő elemeken keresztül.*

</div>

<div class="concept-section why-important" data-filter="javascript junior">

💡 **Miért számít?**
- **Hatékony eseménykezelés**: egy listener sok elem eseményét kezelheti
- **Dynamic content**: új elemekhez automatikusan működik az eseménykezelés
- **Memory optimization**: kevesebb event listener = kevesebb memóriahasználat
- **Event coordination**: szülő elemek is reagálhatnak gyermek eseményeire

</div>

<div class="runnable-model" data-filter="javascript">

**Runnable mental model**
```javascript
// Event Bubbling demonstráció
class EventBubblingDemo {
    constructor() {
        this.setupEventListeners();
        this.createDynamicContent();
    }
    
    setupEventListeners() {
        // Event bubbling példa
        document.getElementById('grandparent').addEventListener('click', (e) => {
            console.log('Grandparent clicked - Event bubbling worked!');
            console.log('Original target:', e.target.tagName);
            console.log('Current target:', e.currentTarget.id);
        });
        
        document.getElementById('parent').addEventListener('click', (e) => {
            console.log('Parent clicked');
            // e.stopPropagation(); // Megállítja a bubbling-ot
        });
        
        document.getElementById('child').addEventListener('click', (e) => {
            console.log('Child clicked');
        });
        
        // Event delegation a lista elemekhez
        this.setupEventDelegation();
    }
    
    setupEventDelegation() {
        const todoList = document.getElementById('todo-list');
        
        // Egy listener az összes todo elemhez (létező és jövőbeli)
        todoList.addEventListener('click', (event) => {
            const target = event.target;
            
            // Delete button click
            if (target.matches('.delete-btn')) {
                event.preventDefault();
                const todoItem = target.closest('.todo-item');
                const todoId = todoItem.dataset.todoId;
                this.deleteTodo(todoId);
            }
            
            // Edit button click
            if (target.matches('.edit-btn')) {
                event.preventDefault();
                const todoItem = target.closest('.todo-item');
                this.editTodo(todoItem);
            }
            
            // Complete checkbox
            if (target.matches('.complete-checkbox')) {
                const todoItem = target.closest('.todo-item');
                this.toggleComplete(todoItem, target.checked);
            }
            
            // Todo item click (but not buttons)
            if (target.matches('.todo-item') && !target.matches('button, input')) {
                this.selectTodo(target);
            }
        });
        
        // Form submission with delegation
        document.addEventListener('submit', (event) => {
            if (event.target.matches('#add-todo-form')) {
                event.preventDefault();
                this.addTodo(new FormData(event.target));
            }
        });
    }
    
    createDynamicContent() {
        // Dinamikusan létrehozott elemek automatikusan működnek
        // az event delegation miatt
        const todoList = document.getElementById('todo-list');
        
        const todos = [
            { id: 1, text: 'Learn JavaScript', completed: false },
            { id: 2, text: 'Practice DOM manipulation', completed: true },
            { id: 3, text: 'Build awesome apps', completed: false }
        ];
        
        todos.forEach(todo => {
            const todoHTML = this.createTodoHTML(todo);
            todoList.insertAdjacentHTML('beforeend', todoHTML);
        });
    }
    
    createTodoHTML(todo) {
        return `
            <div class="todo-item ${todo.completed ? 'completed' : ''}" data-todo-id="${todo.id}">
                <input type="checkbox" class="complete-checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="todo-text">${todo.text}</span>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
    }
    
    addTodo(formData) {
        const todoText = formData.get('todoText');
        if (!todoText.trim()) return;
        
        const newTodo = {
            id: Date.now(),
            text: todoText,
            completed: false
        };
        
        const todoList = document.getElementById('todo-list');
        const todoHTML = this.createTodoHTML(newTodo);
        todoList.insertAdjacentHTML('beforeend', todoHTML);
        
        // Form reset
        document.getElementById('add-todo-form').reset();
    }
    
    deleteTodo(todoId) {
        const todoItem = document.querySelector(`[data-todo-id="${todoId}"]`);
        if (todoItem) {
            todoItem.remove();
            console.log(`Todo ${todoId} deleted`);
        }
    }
    
    editTodo(todoItem) {
        const todoText = todoItem.querySelector('.todo-text');
        const currentText = todoText.textContent;
        
        // Create inline edit input
        const input = document.createElement('input');
        input.value = currentText;
        input.className = 'edit-input';
        
        // Replace text with input
        todoText.replaceWith(input);
        input.focus();
        
        // Save on blur or Enter
        const saveEdit = () => {
            const newText = input.value.trim();
            if (newText) {
                todoText.textContent = newText;
            }
            input.replaceWith(todoText);
        };
        
        input.addEventListener('blur', saveEdit);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') saveEdit();
        });
    }
    
    toggleComplete(todoItem, isCompleted) {
        todoItem.classList.toggle('completed', isCompleted);
        console.log(`Todo ${todoItem.dataset.todoId} completion: ${isCompleted}`);
    }
    
    selectTodo(todoItem) {
        // Remove previous selection
        document.querySelectorAll('.todo-item.selected').forEach(item => {
            item.classList.remove('selected');
        });
        
        // Add selection to current item
        todoItem.classList.add('selected');
        console.log(`Selected todo: ${todoItem.dataset.todoId}`);
    }
}

// Modern event handling patterns
class ModernEventHandling {
    constructor() {
        this.abortController = new AbortController();
        this.setupModernEventListeners();
    }
    
    setupModernEventListeners() {
        // AbortController for easy cleanup
        document.addEventListener('click', this.handleClick.bind(this), {
            signal: this.abortController.signal,
            passive: true  // Performance optimization
        });
        
        // Custom events
        this.setupCustomEvents();
    }
    
    handleClick(event) {
        // Modern event handling with method dispatch
        const action = event.target.dataset.action;
        if (action && this[action]) {
            this[action](event);
        }
    }
    
    setupCustomEvents() {
        // Custom event creation and dispatch
        const customEvent = new CustomEvent('todoUpdated', {
            detail: { message: 'Todo list was updated' },
            bubbles: true,
            cancelable: true
        });
        
        // Listen for custom events
        document.addEventListener('todoUpdated', (event) => {
            console.log('Custom event received:', event.detail);
        });
        
        // Dispatch custom event
        setTimeout(() => {
            document.dispatchEvent(customEvent);
        }, 1000);
    }
    
    // Cleanup method
    destroy() {
        this.abortController.abort();
    }
}

// Initialize the demo
document.addEventListener('DOMContentLoaded', () => {
    new EventBubblingDemo();
    new ModernEventHandling();
});
```
*Figyeld meg: Event delegation hatékonyabb mint minden elemhez listener, custom events kommunikációhoz.*

</div>

<div class="concept-section myths" data-filter="javascript">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Minden elemhez külön listener kell." → Event delegation egy listener-rel sok elemet kezelhet
- „stopPropagation() mindig jó ötlet." → Megakadályozhatja más funkciók működését, óvatosan használd
- „addEventListener és onclick ugyanaz." → addEventListener több listener-t támogat és jobb opciókkal rendelkezik

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="javascript">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Event object tulajdonságok:**
```javascript
document.addEventListener('click', (event) => {
    console.log({
        target: event.target,        // Az elem amelyre kattintottunk
        currentTarget: event.currentTarget, // Az elem amelyhez a listener van
        type: event.type,           // 'click'
        bubbles: event.bubbles,     // true/false
        cancelable: event.cancelable // true/false
    });
});

// Event phases
// 1. Capture phase (ritkán használt)
// 2. Target phase
// 3. Bubble phase (alapértelmezett)
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="javascript junior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mi az event bubbling és hogyan működik?**
A: Az esemény a target elemről kiindulva felfelé propagálódik a DOM fán keresztül. Minden szülő elem megkapja az eseményt.

**Q: Mikor használnál event delegation-t?**
A: Dinamikus tartalomhoz, performance optimalizációhoz, vagy amikor sok hasonló elem eseményét kell kezelni.

**Q: Hogyan állítod meg az event bubbling-ot?**
A: event.stopPropagation() hívásával, de óvatosan használd, mert másokat is megakadályozhat.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="javascript">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **DOM** → Az eseménykezelés alapja
- **JavaScript ES6+** → Modern event handling patterns
- **Performance** → Event delegation optimalizáció
- **Form handling** → Form submission események
- **User Experience** → Interaktív felhasználói elemek

</div>

</details>

</div>

### LocalStorage vs SessionStorage vs Cookies {#localstorage-sessionstorage-cookies}

<div class="concept-section mental-model" data-filter="javascript junior">

🧭 **Így gondolj rá**  
*LocalStorage olyan, mint a lakás tárolója (örökre megmarad), SessionStorage mint az asztal (addig amíg dolgozol), Cookies mint a postás üzenete (minden alkalommal viszi a szerverre).*

</div>

<div class="concept-section why-important" data-filter="javascript junior">

💡 **Miért számít?**
- **Perzisztens adatok**: felhasználói beállítások és preferenciák mentése
- **Session management**: ideiglenes adatok kezelése böngészési munkamenet alatt
- **Performance**: kliens oldali cache csökkenti szerver hívásokat
- **User experience**: offline funkciók és gyors betöltés biztosítása

</div>

<div class="runnable-model" data-filter="javascript">

**Runnable mental model**
```javascript
// Storage Manager osztály a különböző storage típusok kezelésére
class StorageManager {
    constructor() {
        this.isLocalStorageAvailable = this.checkStorageAvailability('localStorage');
        this.isSessionStorageAvailable = this.checkStorageAvailability('sessionStorage');
    }
    
    // Storage availability check
    checkStorageAvailability(type) {
        try {
            const storage = window[type];
            const test = '__storage_test__';
            storage.setItem(test, test);
            storage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }
    
    // localStorage operations
    localStorage = {
        set: (key, value) => {
            if (!this.isLocalStorageAvailable) {
                console.warn('localStorage not available');
                return false;
            }
            
            try {
                const serializedValue = JSON.stringify({
                    value,
                    timestamp: Date.now(),
                    expires: null
                });
                window.localStorage.setItem(key, serializedValue);
                return true;
            } catch (error) {
                console.error('localStorage set error:', error);
                return false;
            }
        },
        
        get: (key) => {
            if (!this.isLocalStorageAvailable) return null;
            
            try {
                const item = window.localStorage.getItem(key);
                if (!item) return null;
                
                const parsed = JSON.parse(item);
                
                // Check expiration
                if (parsed.expires && Date.now() > parsed.expires) {
                    window.localStorage.removeItem(key);
                    return null;
                }
                
                return parsed.value;
            } catch (error) {
                console.error('localStorage get error:', error);
                return null;
            }
        },
        
        setWithExpiry: (key, value, expiryMinutes) => {
            const expiryTime = Date.now() + (expiryMinutes * 60 * 1000);
            
            try {
                const serializedValue = JSON.stringify({
                    value,
                    timestamp: Date.now(),
                    expires: expiryTime
                });
                window.localStorage.setItem(key, serializedValue);
                return true;
            } catch (error) {
                console.error('localStorage setWithExpiry error:', error);
                return false;
            }
        },
        
        remove: (key) => {
            if (this.isLocalStorageAvailable) {
                window.localStorage.removeItem(key);
            }
        },
        
        clear: () => {
            if (this.isLocalStorageAvailable) {
                window.localStorage.clear();
            }
        },
        
        getAllKeys: () => {
            if (!this.isLocalStorageAvailable) return [];
            return Object.keys(window.localStorage);
        }
    };
    
    // sessionStorage operations
    sessionStorage = {
        set: (key, value) => {
            if (!this.isSessionStorageAvailable) {
                console.warn('sessionStorage not available');
                return false;
            }
            
            try {
                window.sessionStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (error) {
                console.error('sessionStorage set error:', error);
                return false;
            }
        },
        
        get: (key) => {
            if (!this.isSessionStorageAvailable) return null;
            
            try {
                const item = window.sessionStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (error) {
                console.error('sessionStorage get error:', error);
                return null;
            }
        },
        
        remove: (key) => {
            if (this.isSessionStorageAvailable) {
                window.sessionStorage.removeItem(key);
            }
        },
        
        clear: () => {
            if (this.isSessionStorageAvailable) {
                window.sessionStorage.clear();
            }
        }
    };
    
    // Cookies operations
    cookies = {
        set: (name, value, options = {}) => {
            const defaults = {
                path: '/',
                expires: null,  // Session cookie by default
                maxAge: null,
                domain: null,
                secure: false,
                sameSite: 'Lax',
                httpOnly: false  // Can't be set via JavaScript
            };
            
            const config = { ...defaults, ...options };
            
            let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
            
            if (config.expires) {
                cookieString += `; expires=${config.expires.toUTCString()}`;
            }
            
            if (config.maxAge) {
                cookieString += `; max-age=${config.maxAge}`;
            }
            
            if (config.path) {
                cookieString += `; path=${config.path}`;
            }
            
            if (config.domain) {
                cookieString += `; domain=${config.domain}`;
            }
            
            if (config.secure) {
                cookieString += `; secure`;
            }
            
            cookieString += `; samesite=${config.sameSite}`;
            
            document.cookie = cookieString;
        },
        
        get: (name) => {
            const cookies = document.cookie.split(';');
            
            for (let cookie of cookies) {
                const [cookieName, cookieValue] = cookie.trim().split('=');
                if (decodeURIComponent(cookieName) === name) {
                    return decodeURIComponent(cookieValue);
                }
            }
            
            return null;
        },
        
        remove: (name, options = {}) => {
            this.set(name, '', {
                ...options,
                expires: new Date(0)  // Set to past date
            });
        },
        
        getAll: () => {
            const cookies = {};
            document.cookie.split(';').forEach(cookie => {
                const [name, value] = cookie.trim().split('=');
                if (name && value) {
                    cookies[decodeURIComponent(name)] = decodeURIComponent(value);
                }
            });
            return cookies;
        }
    };
}

// Praktikus használati példák
class UserPreferencesManager {
    constructor() {
        this.storage = new StorageManager();
        this.init();
    }
    
    init() {
        // Load saved preferences
        this.loadUserPreferences();
        this.loadSessionData();
        this.handleCookieConsent();
    }
    
    // User preferences (localStorage - persistent)
    loadUserPreferences() {
        const preferences = this.storage.localStorage.get('userPreferences') || {};
        
        const defaultPreferences = {
            theme: 'light',
            language: 'hu',
            notifications: true,
            autoSave: true
        };
        
        this.preferences = { ...defaultPreferences, ...preferences };
        this.applyPreferences();
    }
    
    saveUserPreferences() {
        this.storage.localStorage.set('userPreferences', this.preferences);
        console.log('User preferences saved:', this.preferences);
    }
    
    updatePreference(key, value) {
        this.preferences[key] = value;
        this.saveUserPreferences();
        this.applyPreferences();
    }
    
    applyPreferences() {
        // Apply theme
        document.body.className = `theme-${this.preferences.theme}`;
        
        // Apply language
        document.documentElement.lang = this.preferences.language;
        
        // Apply other preferences
        console.log('Preferences applied:', this.preferences);
    }
    
    // Session data (sessionStorage - temporary)
    loadSessionData() {
        this.sessionData = this.storage.sessionStorage.get('sessionData') || {
            startTime: Date.now(),
            pageViews: 0,
            currentForm: {},
            shoppingCart: []
        };
        
        this.sessionData.pageViews++;
        this.saveSessionData();
    }
    
    saveSessionData() {
        this.storage.sessionStorage.set('sessionData', this.sessionData);
    }
    
    updateShoppingCart(item) {
        this.sessionData.shoppingCart.push(item);
        this.saveSessionData();
        console.log('Shopping cart updated:', this.sessionData.shoppingCart);
    }
    
    saveFormProgress(formId, formData) {
        this.sessionData.currentForm[formId] = formData;
        this.saveSessionData();
    }
    
    // Cookie handling (server communication)
    handleCookieConsent() {
        const consentStatus = this.storage.cookies.get('cookieConsent');
        
        if (!consentStatus) {
            this.showCookieConsentBanner();
        } else {
            this.handleAnalyticsCookies(consentStatus === 'accepted');
        }
    }
    
    acceptCookies() {
        // Set consent cookie for 1 year
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        
        this.storage.cookies.set('cookieConsent', 'accepted', {
            expires: expiryDate,
            secure: true,
            sameSite: 'Strict'
        });
        
        this.handleAnalyticsCookies(true);
        this.hideCookieConsentBanner();
    }
    
    rejectCookies() {
        this.storage.cookies.set('cookieConsent', 'rejected', {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
        });
        
        this.handleAnalyticsCookies(false);
        this.hideCookieConsentBanner();
    }
    
    handleAnalyticsCookies(accepted) {
        if (accepted) {
            // Set analytics cookies
            this.storage.cookies.set('analytics_session', this.generateSessionId(), {
                maxAge: 3600  // 1 hour
            });
            console.log('Analytics cookies enabled');
        } else {
            // Remove analytics cookies
            this.storage.cookies.remove('analytics_session');
            console.log('Analytics cookies disabled');
        }
    }
    
    generateSessionId() {
        return Math.random().toString(36).substr(2, 9);
    }
    
    showCookieConsentBanner() {
        console.log('Showing cookie consent banner');
        // Implementation would show actual banner
    }
    
    hideCookieConsentBanner() {
        console.log('Hiding cookie consent banner');
        // Implementation would hide banner
    }
    
    // Cleanup and debugging methods
    clearAllData() {
        this.storage.localStorage.clear();
        this.storage.sessionStorage.clear();
        
        // Remove all cookies (limited by JavaScript)
        Object.keys(this.storage.cookies.getAll()).forEach(cookieName => {
            this.storage.cookies.remove(cookieName);
        });
        
        console.log('All client-side data cleared');
    }
    
    getStorageInfo() {
        return {
            localStorage: {
                available: this.storage.isLocalStorageAvailable,
                keys: this.storage.localStorage.getAllKeys(),
                usage: this.calculateStorageUsage('localStorage')
            },
            sessionStorage: {
                available: this.storage.isSessionStorageAvailable,
                keys: Object.keys(window.sessionStorage || {}),
                usage: this.calculateStorageUsage('sessionStorage')
            },
            cookies: {
                count: Object.keys(this.storage.cookies.getAll()).length,
                all: this.storage.cookies.getAll()
            }
        };
    }
    
    calculateStorageUsage(storageType) {
        let total = 0;
        const storage = window[storageType];
        
        if (storage) {
            for (let key in storage) {
                if (storage.hasOwnProperty(key)) {
                    total += storage[key].length + key.length;
                }
            }
        }
        
        return `${(total / 1024).toFixed(2)} KB`;
    }
}

// Initialize the preferences manager
const userPrefs = new UserPreferencesManager();

// Example usage
userPrefs.updatePreference('theme', 'dark');
userPrefs.updateShoppingCart({ id: 1, name: 'Laptop', price: 299000 });
userPrefs.saveFormProgress('contact-form', { name: 'John', email: 'john@example.com' });

// Debug storage information
console.log('Storage info:', userPrefs.getStorageInfo());
```
*Figyeld meg: LocalStorage persistent, SessionStorage tab-specific, Cookies server-rel kommunikálnak.*

</div>

<div class="concept-section myths" data-filter="javascript">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „LocalStorage biztonságos érzékeny adatokhoz." → Nem titkosított, JavaScript-ből hozzáférhető, csak nem érzékeny adatokhoz
- „Cookies csak authentication-höz valók." → Cookies tracking, preferenciák, session management-hez is használhatók
- „SessionStorage minden tab-ben ugyanaz." → Tab-specific, új tab = új sessionStorage

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="javascript">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Storage összehasonlítás:**
```javascript
// Capacity
localStorage: ~5-10MB      // Persistent
sessionStorage: ~5-10MB    // Per tab session  
cookies: ~4KB              // Sent with requests

// Expiration
localStorage.setItem('key', 'never expires');
sessionStorage.setItem('key', 'tab close');
document.cookie = 'key=value; max-age=3600'; // 1 hour

// Server access
// localStorage: NO
// sessionStorage: NO  
// cookies: YES (automatic)
```

**Best practices:**
```javascript
// Always check availability
if (typeof Storage !== 'undefined') {
    localStorage.setItem('key', 'value');
}

// JSON serialization
const data = { name: 'John', age: 30 };
localStorage.setItem('user', JSON.stringify(data));
const user = JSON.parse(localStorage.getItem('user'));
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="javascript junior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mi a különbség localStorage és sessionStorage között?**
A: localStorage persistent (böngésző bezárása után is megmarad), sessionStorage tab-specific (tab bezárása után törlődik).

**Q: Mikor használnál cookie-kat localStorage helyett?**
A: Amikor az adatot a szerverre is el kell küldeni, authentication tokenekhez, vagy régi böngésző támogatáshoz.

**Q: Milyen limitációi vannak a Web Storage-nak?**
A: ~5-10MB limit, csak string tárolás, nincs automatic expiry, JavaScript-ből hozzáférhető (nem biztonságos).

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="javascript">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **HTTP** → Cookies automatikus küldése kérésekkel
- **Security** → XSS támadások és storage biztonsága
- **Performance** → Kliens oldali cache és offline adatok
- **User Experience** → Személyre szabás és preferenciák
- **JSON** → Komplex adatok serialization/deserialization

</div>

</details>

</div>

### Responsive Design alapok (media queries, mobil-first) {#responsive-design}

<div class="concept-section mental-model" data-filter="css junior">

🧭 **Így gondolj rá**  
*Responsive Design olyan, mint egy transzformáló robot: ugyanaz a tartalom, de különböző formákra alakul át attól függően, hogy milyen eszközön nézi a felhasználó.*

</div>

<div class="concept-section why-important" data-filter="css junior">

💡 **Miért számít?**
- **Multi-device support**: okostelefonok, tabletek, desktopok egyetlen kódbázissal
- **Better user experience**: minden eszközön optimális megjelenés és használhatóság  
- **SEO előnyök**: Google mobile-first indexelést használ
- **Cost efficiency**: egy weboldal minden platformon működik

</div>

<div class="runnable-model" data-filter="css">

**Runnable mental model**
```css
/* Mobile-first approach - alapértelmezett mobilra tervezés */

/* Base styles - Mobile (320px+) */
.container {
    width: 100%;
    padding: 1rem;
    margin: 0 auto;
}

.navigation {
    display: flex;
    flex-direction: column;
    background: #333;
}

.nav-item {
    padding: 1rem;
    text-align: center;
    border-bottom: 1px solid #555;
}

.grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin: 2rem 0;
}

.card {
    background: #f9f9f9;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.hero-text {
    font-size: 1.5rem;
    line-height: 1.4;
    text-align: center;
    margin-bottom: 1rem;
}

.button {
    display: block;
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    margin: 0.5rem 0;
}

/* Small tablets (481px+) */
@media screen and (min-width: 481px) {
    .container {
        padding: 1.5rem;
    }
    
    .grid {
        grid-template-columns: 1fr 1fr;
    }
    
    .hero-text {
        font-size: 1.75rem;
    }
}

/* Large tablets (768px+) */
@media screen and (min-width: 768px) {
    .container {
        max-width: 750px;
        padding: 2rem;
    }
    
    .navigation {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    
    .nav-item {
        border-bottom: none;
        border-right: 1px solid #555;
    }
    
    .nav-item:last-child {
        border-right: none;
    }
    
    .grid {
        grid-template-columns: repeat(3, 1fr);
    }
    
    .hero-text {
        font-size: 2rem;
        text-align: left;
    }
    
    .button {
        display: inline-block;
        width: auto;
        min-width: 150px;
        margin-right: 1rem;
    }
}

/* Small desktops (992px+) */
@media screen and (min-width: 992px) {
    .container {
        max-width: 970px;
    }
    
    .grid {
        grid-template-columns: repeat(4, 1fr);
    }
    
    .hero-text {
        font-size: 2.5rem;
    }
    
    /* Advanced layouts for desktop */
    .sidebar-layout {
        display: grid;
        grid-template-columns: 250px 1fr;
        gap: 2rem;
    }
}

/* Large desktops (1200px+) */
@media screen and (min-width: 1200px) {
    .container {
        max-width: 1170px;
    }
    
    .hero-text {
        font-size: 3rem;
    }
    
    .grid {
        grid-template-columns: repeat(6, 1fr);
    }
}

/* Ultra-wide screens (1400px+) */
@media screen and (min-width: 1400px) {
    .container {
        max-width: 1320px;
    }
}

/* Print styles */
@media print {
    .navigation,
    .sidebar,
    .button {
        display: none;
    }
    
    .container {
        width: 100%;
        max-width: none;
        padding: 0;
    }
    
    .hero-text {
        font-size: 18pt;
        color: #000;
    }
}

/* High DPI / Retina displays */
@media screen and (min-resolution: 192dpi) {
    .logo {
        background-image: url('logo@2x.png');
        background-size: 100px 50px;
    }
}

/* Landscape orientation for tablets/phones */
@media screen and (orientation: landscape) and (max-width: 1024px) {
    .hero-text {
        font-size: 1.25rem;
    }
    
    .navigation {
        flex-direction: row;
    }
}

/* Dark mode preference */
@media (prefers-color-scheme: dark) {
    .card {
        background: #2d2d2d;
        color: #ffffff;
    }
    
    .navigation {
        background: #1a1a1a;
    }
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

/* High contrast mode */
@media (prefers-contrast: high) {
    .button {
        border: 2px solid;
    }
    
    .card {
        border: 1px solid;
    }
}
```

```javascript
// JavaScript for responsive behavior
class ResponsiveManager {
    constructor() {
        this.breakpoints = {
            mobile: 320,
            tablet: 768,
            desktop: 992,
            large: 1200
        };
        
        this.currentBreakpoint = this.getCurrentBreakpoint();
        this.setupResponsiveListeners();
        this.initResponsiveComponents();
    }
    
    getCurrentBreakpoint() {
        const width = window.innerWidth;
        
        if (width >= this.breakpoints.large) return 'large';
        if (width >= this.breakpoints.desktop) return 'desktop';
        if (width >= this.breakpoints.tablet) return 'tablet';
        return 'mobile';
    }
    
    setupResponsiveListeners() {
        let resizeTimeout;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newBreakpoint = this.getCurrentBreakpoint();
                
                if (newBreakpoint !== this.currentBreakpoint) {
                    this.currentBreakpoint = newBreakpoint;
                    this.handleBreakpointChange(newBreakpoint);
                }
            }, 250); // Debounce resize events
        });
        
        // Orientation change for mobile devices
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleOrientationChange();
            }, 100);
        });
    }
    
    handleBreakpointChange(newBreakpoint) {
        console.log(`Breakpoint changed to: ${newBreakpoint}`);
        
        // Update navigation
        this.updateNavigation(newBreakpoint);
        
        // Update image sources for performance
        this.updateImageSources(newBreakpoint);
        
        // Update component behavior
        this.updateComponentBehavior(newBreakpoint);
        
        // Trigger custom event
        document.dispatchEvent(new CustomEvent('breakpointChange', {
            detail: { breakpoint: newBreakpoint }
        }));
    }
    
    updateNavigation(breakpoint) {
        const nav = document.querySelector('.navigation');
        const mobileMenu = document.querySelector('.mobile-menu-toggle');
        
        if (breakpoint === 'mobile' || breakpoint === 'tablet') {
            // Mobile navigation
            if (mobileMenu) {
                mobileMenu.style.display = 'block';
            }
            nav?.classList.add('mobile-nav');
        } else {
            // Desktop navigation
            if (mobileMenu) {
                mobileMenu.style.display = 'none';
            }
            nav?.classList.remove('mobile-nav', 'nav-open');
        }
    }
    
    updateImageSources(breakpoint) {
        const responsiveImages = document.querySelectorAll('[data-responsive-src]');
        
        responsiveImages.forEach(img => {
            const sources = JSON.parse(img.dataset.responsiveSrc);
            const newSrc = sources[breakpoint] || sources.desktop || img.src;
            
            if (img.src !== newSrc) {
                img.src = newSrc;
            }
        });
    }
    
    updateComponentBehavior(breakpoint) {
        // Update data tables
        this.updateTableBehavior(breakpoint);
        
        // Update modal behavior
        this.updateModalBehavior(breakpoint);
        
        // Update carousel/slider settings
        this.updateCarouselBehavior(breakpoint);
    }
    
    updateTableBehavior(breakpoint) {
        const tables = document.querySelectorAll('.responsive-table');
        
        tables.forEach(table => {
            if (breakpoint === 'mobile') {
                table.classList.add('table-scroll');
            } else {
                table.classList.remove('table-scroll');
            }
        });
    }
    
    updateModalBehavior(breakpoint) {
        const modals = document.querySelectorAll('.modal');
        
        modals.forEach(modal => {
            if (breakpoint === 'mobile') {
                modal.classList.add('modal-fullscreen');
            } else {
                modal.classList.remove('modal-fullscreen');
            }
        });
    }
    
    updateCarouselBehavior(breakpoint) {
        const carousels = document.querySelectorAll('.carousel');
        
        carousels.forEach(carousel => {
            const settings = {
                mobile: { itemsToShow: 1, autoplay: true },
                tablet: { itemsToShow: 2, autoplay: true },
                desktop: { itemsToShow: 3, autoplay: false },
                large: { itemsToShow: 4, autoplay: false }
            };
            
            // Update carousel settings based on breakpoint
            const currentSettings = settings[breakpoint];
            carousel.setAttribute('data-items', currentSettings.itemsToShow);
            carousel.setAttribute('data-autoplay', currentSettings.autoplay);
        });
    }
    
    handleOrientationChange() {
        // Force layout recalculation after orientation change
        document.body.style.height = window.innerHeight + 'px';
        
        setTimeout(() => {
            document.body.style.height = '';
        }, 500);
    }
    
    initResponsiveComponents() {
        // Initialize mobile menu toggle
        this.initMobileMenu();
        
        // Initialize responsive images
        this.initResponsiveImages();
        
        // Initialize touch gestures for mobile
        if (this.currentBreakpoint === 'mobile') {
            this.initTouchGestures();
        }
    }
    
    initMobileMenu() {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('.navigation');
        
        if (menuToggle && nav) {
            menuToggle.addEventListener('click', () => {
                nav.classList.toggle('nav-open');
                menuToggle.classList.toggle('active');
            });
        }
    }
    
    initResponsiveImages() {
        // Lazy loading with Intersection Observer
        const images = document.querySelectorAll('img[data-lazy-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.lazySrc;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }
    
    initTouchGestures() {
        // Basic swipe detection for mobile
        let startX, startY, startTime;
        
        document.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            startTime = Date.now();
        });
        
        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const touch = e.changedTouches[0];
            const endX = touch.clientX;
            const endY = touch.clientY;
            const endTime = Date.now();
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            const deltaTime = endTime - startTime;
            
            // Detect swipe (minimum distance and maximum time)
            if (Math.abs(deltaX) > 50 && deltaTime < 300) {
                const direction = deltaX > 0 ? 'right' : 'left';
                document.dispatchEvent(new CustomEvent('swipe', {
                    detail: { direction, deltaX, deltaY }
                }));
            }
            
            // Reset
            startX = startY = null;
        });
    }
    
    // Utility methods
    isMobile() {
        return this.currentBreakpoint === 'mobile';
    }
    
    isTablet() {
        return this.currentBreakpoint === 'tablet';
    }
    
    isDesktop() {
        return this.currentBreakpoint === 'desktop' || this.currentBreakpoint === 'large';
    }
}

// Initialize responsive manager
const responsiveManager = new ResponsiveManager();

// Listen for breakpoint changes
document.addEventListener('breakpointChange', (e) => {
    console.log('Custom breakpoint change handler:', e.detail.breakpoint);
});
```
*Figyeld meg: Mobile-first approach, progressive enhancement, performance optimalizáció.*

</div>

<div class="concept-section myths" data-filter="css">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Desktop-first könnyebb." → Mobile-first approach egyszerűbb és jobb performance-ot ad
- „Media query-k csak szélességre vonatkoznak." → Magasság, orientáció, felbontás, színpreferenciák is kezelhetők
- „Responsive = csak CSS." → JavaScript is szükséges lehet a viselkedés adaptálásához

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="css">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Alapvető breakpoint-ok:**
```css
/* Mobile first approach */
/* 320px+ : Mobile */
/* 481px+ : Large mobile / Small tablet */
/* 768px+ : Tablet */
/* 992px+ : Small desktop */
/* 1200px+: Large desktop */

@media (min-width: 768px) { /* Tablet+ */ }
@media (min-width: 992px) { /* Desktop+ */ }
@media (min-width: 1200px) { /* Large+ */ }
```

**Modern CSS features:**
```css
/* Container queries (2023+) */
@container (min-width: 400px) {
    .card { display: flex; }
}

/* Aspect ratio */
.video-container {
    aspect-ratio: 16 / 9;
}

/* Clamp for responsive typography */
h1 {
    font-size: clamp(1.5rem, 4vw, 3rem);
}
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="css junior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mi a mobile-first approach és miért jobb?**
A: Kis képernyőkről indulunk és felfele építkezünk. Jobb performance, kényszerít a lényegre koncentrálni, progressive enhancement.

**Q: Hogyan kezelnéd egy komplex tábla responsive megjelenítését?**
A: Horizontális scroll, stack-elt layout, kártyás megjelenítés, vagy fontos oszlopok kiemélése mobil nézetben.

**Q: Milyen CSS units-okat használnál responsive design-hoz?**
A: rem/em (typography), vw/vh (viewport), % (flexible layouts), fr (grid), min/max/clamp (responsive values).

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="css">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **CSS Grid/Flexbox** → Layout alapok responsive design-hoz
- **Performance** → Mobile optimization és image loading
- **JavaScript** → Responsive behavior és breakpoint handling
- **User Experience** → Multi-device usability
- **Accessibility** → Responsive design és screen readers

</div>

</details>

</div>

### Semantic HTML (header, main, article, section) {#semantic-html}

<div class="concept-section mental-model" data-filter="html junior">

🧭 **Így gondolj rá**  
*Semantic HTML olyan, mint egy jól felépített újság: világos fejléc, főcikk, mellékszálak, és minden a helyén van - így az ember és a gép is érti.*

</div>

<div class="concept-section why-important" data-filter="html junior">

💡 **Miért számít?**
- **SEO optimization**: keresőmotorok jobban értelmezik a tartalmat
- **Accessibility**: képernyőolvasók navigálni tudnak a dokumentumban
- **Code maintainability**: a kód önmagát dokumentálja
- **Future-proof**: új technológiák könnyebben integrálhatók

</div>

<div class="runnable-model" data-filter="html">

**Runnable mental model**
```html
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Semantic HTML példa - modern weboldal struktúra">
    <title>Semantic HTML példa | Weboldal</title>
</head>
<body>
    <!-- Site header - oldal fejléce -->
    <header class="site-header">
        <div class="container">
            <!-- Site branding -->
            <div class="site-branding">
                <img src="logo.png" alt="Cégünk logója" width="150" height="50">
                <h1 class="site-title">
                    <a href="/" rel="home">Cégünk Weboldala</a>
                </h1>
                <p class="site-description">Innovatív megoldások minden igényre</p>
            </div>
            
            <!-- Primary navigation -->
            <nav class="primary-navigation" role="navigation" aria-label="Főnavigáció">
                <ul class="nav-menu">
                    <li><a href="/" aria-current="page">Főoldal</a></li>
                    <li><a href="/about">Rólunk</a></li>
                    <li><a href="/services">Szolgáltatások</a></li>
                    <li><a href="/blog">Blog</a></li>
                    <li><a href="/contact">Kapcsolat</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Main content area -->
    <main id="main-content" class="site-main">
        <!-- Hero section -->
        <section class="hero-section" aria-labelledby="hero-title">
            <div class="container">
                <header>
                    <h1 id="hero-title">Üdvözöljük weboldalunkon</h1>
                    <p class="hero-subtitle">Professzionális szolgáltatások, megbízható partnerség</p>
                </header>
                <div class="hero-content">
                    <p>Több mint 10 éves tapasztalattal segítjük ügyfeleinket a digitális világban.</p>
                    <a href="/services" class="cta-button">Szolgáltatásaink</a>
                </div>
            </div>
        </section>

        <!-- Featured articles -->
        <section class="featured-articles" aria-labelledby="featured-title">
            <div class="container">
                <header>
                    <h2 id="featured-title">Kiemelt cikkeink</h2>
                    <p>Legfrissebb híreink és szakmai cikkeink</p>
                </header>

                <div class="articles-grid">
                    <!-- Individual article -->
                    <article class="article-card" itemscope itemtype="https://schema.org/Article">
                        <header class="article-header">
                            <figure class="article-image">
                                <img src="article1.jpg" alt="Modern webfejlesztés trendjei" itemprop="image">
                            </figure>
                            <h3 itemprop="headline">
                                <a href="/blog/modern-webfejlesztes-trendjei" itemprop="url">
                                    Modern webfejlesztés trendjei 2024-ben
                                </a>
                            </h3>
                            <div class="article-meta">
                                <time datetime="2024-03-15" itemprop="datePublished">2024. március 15.</time>
                                <address class="author" itemprop="author" itemscope itemtype="https://schema.org/Person">
                                    <span itemprop="name">Nagy János</span>
                                </address>
                            </div>
                        </header>
                        
                        <div class="article-content" itemprop="articleBody">
                            <p>A webfejlesztés világa folyamatosan változik. Idén különösen fontos 
                               trendek közé tartozik a WebAssembly, a serverless architektúra...</p>
                        </div>
                        
                        <footer class="article-footer">
                            <ul class="article-tags">
                                <li><a href="/tag/webfejlesztes" rel="tag">webfejlesztés</a></li>
                                <li><a href="/tag/javascript" rel="tag">JavaScript</a></li>
                                <li><a href="/tag/trends" rel="tag">trendek</a></li>
                            </ul>
                            <a href="/blog/modern-webfejlesztes-trendjei" class="read-more">Tovább olvasom</a>
                        </footer>
                    </article>

                    <article class="article-card" itemscope itemtype="https://schema.org/Article">
                        <header class="article-header">
                            <figure class="article-image">
                                <img src="article2.jpg" alt="UX design alapelvek" itemprop="image">
                            </figure>
                            <h3 itemprop="headline">
                                <a href="/blog/ux-design-alapelvek" itemprop="url">
                                    UX design alapelvek kezdőknek
                                </a>
                            </h3>
                            <div class="article-meta">
                                <time datetime="2024-03-10" itemprop="datePublished">2024. március 10.</time>
                                <address class="author" itemprop="author" itemscope itemtype="https://schema.org/Person">
                                    <span itemprop="name">Kovács Anna</span>
                                </address>
                            </div>
                        </header>
                        
                        <div class="article-content" itemprop="articleBody">
                            <p>A felhasználói élmény (UX) tervezése kulcsfontosságú minden sikeres 
                               webalkalmazás számára. Ezek az alapelvek segítenek...</p>
                        </div>
                        
                        <footer class="article-footer">
                            <ul class="article-tags">
                                <li><a href="/tag/ux" rel="tag">UX</a></li>
                                <li><a href="/tag/design" rel="tag">design</a></li>
                                <li><a href="/tag/kezdo" rel="tag">kezdő</a></li>
                            </ul>
                            <a href="/blog/ux-design-alapelvek" class="read-more">Tovább olvasom</a>
                        </footer>
                    </article>
                </div>
            </div>
        </section>

        <!-- Services overview -->
        <section class="services-overview" aria-labelledby="services-title">
            <div class="container">
                <header>
                    <h2 id="services-title">Szolgáltatásaink</h2>
                    <p>Komplex digitális megoldások egy helyen</p>
                </header>

                <div class="services-grid">
                    <article class="service-card">
                        <header>
                            <h3>Webfejlesztés</h3>
                            <p class="service-summary">Modern, reszponzív weboldalak készítése</p>
                        </header>
                        <div class="service-content">
                            <ul>
                                <li>HTML5, CSS3, JavaScript</li>
                                <li>React, Vue.js alkalmazások</li>
                                <li>CMS integráció</li>
                                <li>E-commerce megoldások</li>
                            </ul>
                        </div>
                        <footer>
                            <a href="/services/webfejlesztes" class="service-link">További információ</a>
                        </footer>
                    </article>

                    <article class="service-card">
                        <header>
                            <h3>UX/UI Design</h3>
                            <p class="service-summary">Felhasználóbarát interface tervezés</p>
                        </header>
                        <div class="service-content">
                            <ul>
                                <li>Wireframe és prototípus készítés</li>
                                <li>Usability testing</li>
                                <li>Design rendszerek</li>
                                <li>Mobile-first design</li>
                            </ul>
                        </div>
                        <footer>
                            <a href="/services/ux-ui-design" class="service-link">További információ</a>
                        </footer>
                    </article>
                </div>
            </div>
        </section>

        <!-- Testimonials -->
        <section class="testimonials" aria-labelledby="testimonials-title">
            <div class="container">
                <header>
                    <h2 id="testimonials-title">Ügyfeleink mondják</h2>
                </header>

                <div class="testimonials-grid">
                    <blockquote class="testimonial" cite="https://example.com/review1">
                        <p>"Kiváló minőségű munkát végeztek. A weboldal gyors, modern és tökéletesen működik minden eszközön."</p>
                        <footer>
                            <cite>
                                <strong>Dr. Szabó Péter</strong>
                                <span class="title">Ügyvezető, TechCorp Kft.</span>
                            </cite>
                        </footer>
                    </blockquote>

                    <blockquote class="testimonial" cite="https://example.com/review2">
                        <p>"Professzionális hozzáállás, határidős teljesítés. Csak ajánlani tudom őket!"</p>
                        <footer>
                            <cite>
                                <strong>Nagy Mária</strong>
                                <span class="title">Marketing vezető, InnovateCorp</span>
                            </cite>
                        </footer>
                    </blockquote>
                </div>
            </div>
        </section>
    </main>

    <!-- Complementary content -->
    <aside class="sidebar" role="complementary" aria-labelledby="sidebar-title">
        <div class="container">
            <header>
                <h2 id="sidebar-title">Hasznos információk</h2>
            </header>

            <!-- Newsletter signup -->
            <section class="newsletter-signup" aria-labelledby="newsletter-title">
                <header>
                    <h3 id="newsletter-title">Hírlevél feliratkozás</h3>
                    <p>Legyél naprakész a legújabb fejlesztésekkel!</p>
                </header>
                <form action="/newsletter" method="post" class="newsletter-form">
                    <label for="email">Email cím:</label>
                    <input type="email" id="email" name="email" required>
                    <button type="submit">Feliratkozom</button>
                </form>
            </section>

            <!-- Recent posts -->
            <section class="recent-posts" aria-labelledby="recent-title">
                <header>
                    <h3 id="recent-title">Legfrissebb bejegyzések</h3>
                </header>
                <nav aria-label="Legfrissebb blog bejegyzések">
                    <ul>
                        <li>
                            <article class="mini-post">
                                <h4><a href="/blog/css-grid-guide">CSS Grid útmutató kezdőknek</a></h4>
                                <time datetime="2024-03-12">március 12.</time>
                            </article>
                        </li>
                        <li>
                            <article class="mini-post">
                                <h4><a href="/blog/javascript-async">JavaScript async/await</a></h4>
                                <time datetime="2024-03-08">március 8.</time>
                            </article>
                        </li>
                    </ul>
                </nav>
            </section>
        </div>
    </aside>

    <!-- Site footer -->
    <footer class="site-footer" role="contentinfo">
        <div class="container">
            <!-- Footer content sections -->
            <div class="footer-content">
                <section class="footer-section" aria-labelledby="company-info-title">
                    <header>
                        <h3 id="company-info-title">Kapcsolat</h3>
                    </header>
                    <address>
                        <strong>Cégünk Kft.</strong><br>
                        1051 Budapest, Példa utca 12.<br>
                        Tel: <a href="tel:+36301234567">+36 30 123 4567</a><br>
                        Email: <a href="mailto:info@cegunk.hu">info@cegunk.hu</a>
                    </address>
                </section>

                <section class="footer-section" aria-labelledby="quick-links-title">
                    <header>
                        <h3 id="quick-links-title">Gyors linkek</h3>
                    </header>
                    <nav aria-label="Footer navigation">
                        <ul>
                            <li><a href="/privacy">Adatvédelem</a></li>
                            <li><a href="/terms">Felhasználási feltételek</a></li>
                            <li><a href="/sitemap">Oldaltérkép</a></li>
                            <li><a href="/contact">Kapcsolat</a></li>
                        </ul>
                    </nav>
                </section>

                <section class="footer-section" aria-labelledby="social-title">
                    <header>
                        <h3 id="social-title">Kövess minket!</h3>
                    </header>
                    <nav aria-label="Közösségi média linkek">
                        <ul class="social-links">
                            <li>
                                <a href="https://facebook.com/cegunk" aria-label="Facebook oldal">
                                    <svg aria-hidden="true"><!-- Facebook icon --></svg>
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a href="https://linkedin.com/company/cegunk" aria-label="LinkedIn profil">
                                    <svg aria-hidden="true"><!-- LinkedIn icon --></svg>
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </nav>
                </section>
            </div>

            <!-- Copyright -->
            <div class="footer-bottom">
                <p>&copy; 2024 Cégünk Kft. Minden jog fenntartva.</p>
                <p>
                    <small>
                        Ez az oldal <a href="https://validator.w3.org/">valid HTML5</a> 
                        és <a href="https://wave.webaim.org/">akadálymentes</a>.
                    </small>
                </p>
            </div>
        </div>
    </footer>

    <!-- Skip link back to top for accessibility -->
    <a href="#main-content" class="skip-link skip-to-top">Vissza a tetejére</a>
</body>
</html>
```

```javascript
// JavaScript to enhance semantic HTML behavior
class SemanticHTMLManager {
    constructor() {
        this.initAccessibilityFeatures();
        this.initNavigationEnhancements();
        this.initArticleEnhancements();
        this.initFormEnhancements();
    }
    
    initAccessibilityFeatures() {
        // Add skip links for keyboard navigation
        this.addSkipLinks();
        
        // Enhance heading navigation
        this.enhanceHeadingNavigation();
        
        // Add landmark navigation
        this.addLandmarkNavigation();
    }
    
    addSkipLinks() {
        const skipLinks = document.createElement('nav');
        skipLinks.className = 'skip-links';
        skipLinks.setAttribute('aria-label', 'Ugrás linkek');
        
        skipLinks.innerHTML = `
            <ul>
                <li><a href="#main-content">Ugrás a fő tartalomhoz</a></li>
                <li><a href="#primary-navigation">Ugrás a navigációhoz</a></li>
                <li><a href="#sidebar">Ugrás a mellékszöveghez</a></li>
                <li><a href="#site-footer">Ugrás a lábléchoz</a></li>
            </ul>
        `;
        
        document.body.insertBefore(skipLinks, document.body.firstChild);
    }
    
    enhanceHeadingNavigation() {
        // Create table of contents from headings
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const tocContainer = document.querySelector('#table-of-contents');
        
        if (tocContainer && headings.length > 0) {
            const toc = this.generateTableOfContents(headings);
            tocContainer.innerHTML = toc;
        }
    }
    
    generateTableOfContents(headings) {
        let toc = '<nav aria-labelledby="toc-title"><h2 id="toc-title">Tartalomjegyzék</h2><ol>';
        
        headings.forEach((heading, index) => {
            const level = parseInt(heading.tagName.charAt(1));
            const id = heading.id || `heading-${index}`;
            const text = heading.textContent;
            
            if (!heading.id) {
                heading.id = id;
            }
            
            toc += `<li class="toc-level-${level}">
                <a href="#${id}">${text}</a>
            </li>`;
        });
        
        toc += '</ol></nav>';
        return toc;
    }
    
    addLandmarkNavigation() {
        // Add landmark navigation for screen readers
        const landmarks = document.querySelectorAll('[role], header, nav, main, aside, footer');
        const landmarkNav = document.createElement('nav');
        landmarkNav.className = 'landmark-navigation sr-only';
        landmarkNav.setAttribute('aria-label', 'Oldal szerkezet navigáció');
        
        let navHTML = '<h2>Oldal szerkezet</h2><ul>';
        
        landmarks.forEach((landmark, index) => {
            const role = landmark.getAttribute('role') || landmark.tagName.toLowerCase();
            const label = landmark.getAttribute('aria-label') || 
                         landmark.querySelector('h1, h2, h3')?.textContent || 
                         `${role} ${index + 1}`;
            const id = landmark.id || `landmark-${index}`;
            
            if (!landmark.id) {
                landmark.id = id;
            }
            
            navHTML += `<li><a href="#${id}">${label}</a></li>`;
        });
        
        navHTML += '</ul>';
        landmarkNav.innerHTML = navHTML;
        
        const header = document.querySelector('header');
        if (header) {
            header.insertAdjacentElement('beforebegin', landmarkNav);
        }
    }
    
    initNavigationEnhancements() {
        // Add current page indication
        this.highlightCurrentPage();
        
        // Add mobile menu functionality
        this.initMobileMenu();
        
        // Add breadcrumb navigation
        this.addBreadcrumbs();
    }
    
    highlightCurrentPage() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.setAttribute('aria-current', 'page');
                link.classList.add('current-page');
            }
        });
    }
    
    initMobileMenu() {
        const nav = document.querySelector('.primary-navigation');
        if (!nav) return;
        
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-toggle';
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-controls', 'primary-menu');
        menuButton.innerHTML = '<span>Menü</span>';
        
        const menu = nav.querySelector('ul');
        if (menu) {
            menu.id = 'primary-menu';
        }
        
        nav.insertBefore(menuButton, nav.firstChild);
        
        menuButton.addEventListener('click', () => {
            const expanded = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', !expanded);
            nav.classList.toggle('menu-open');
        });
    }
    
    addBreadcrumbs() {
        const breadcrumbContainer = document.querySelector('#breadcrumbs');
        if (!breadcrumbContainer) return;
        
        const path = window.location.pathname.split('/').filter(segment => segment);
        const breadcrumbs = ['<a href="/">Főoldal</a>'];
        
        let currentPath = '';
        path.forEach((segment, index) => {
            currentPath += '/' + segment;
            const isLast = index === path.length - 1;
            const label = this.formatBreadcrumbLabel(segment);
            
            if (isLast) {
                breadcrumbs.push(`<span aria-current="page">${label}</span>`);
            } else {
                breadcrumbs.push(`<a href="${currentPath}">${label}</a>`);
            }
        });
        
        breadcrumbContainer.innerHTML = `
            <nav aria-label="Breadcrumb">
                <ol class="breadcrumb">
                    ${breadcrumbs.map(crumb => `<li>${crumb}</li>`).join('')}
                </ol>
            </nav>
        `;
    }
    
    formatBreadcrumbLabel(segment) {
        return segment
            .replace(/-/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    }
    
    initArticleEnhancements() {
        // Add reading time estimation
        this.addReadingTime();
        
        // Add print functionality
        this.addPrintButtons();
        
        // Add social sharing
        this.addSocialSharing();
    }
    
    addReadingTime() {
        const articles = document.querySelectorAll('article');
        
        articles.forEach(article => {
            const content = article.querySelector('.article-content, .service-content');
            if (!content) return;
            
            const wordCount = content.textContent.trim().split(/\s+/).length;
            const readingTime = Math.ceil(wordCount / 200); // 200 words per minute
            
            const timeElement = document.createElement('span');
            timeElement.className = 'reading-time';
            timeElement.textContent = `${readingTime} perc olvasás`;
            
            const meta = article.querySelector('.article-meta');
            if (meta) {
                meta.appendChild(timeElement);
            }
        });
    }
    
    addPrintButtons() {
        const articles = document.querySelectorAll('article');
        
        articles.forEach(article => {
            const printButton = document.createElement('button');
            printButton.className = 'print-article';
            printButton.textContent = 'Nyomtatás';
            printButton.addEventListener('click', () => {
                window.print();
            });
            
            const footer = article.querySelector('footer');
            if (footer) {
                footer.appendChild(printButton);
            }
        });
    }
    
    addSocialSharing() {
        const articles = document.querySelectorAll('article');
        
        articles.forEach(article => {
            const title = article.querySelector('h1, h2, h3')?.textContent;
            const url = window.location.href;
            
            if (!title) return;
            
            const shareContainer = document.createElement('div');
            shareContainer.className = 'social-share';
            shareContainer.innerHTML = `
                <h4>Megosztás:</h4>
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}" 
                   target="_blank" rel="noopener">Facebook</a>
                <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}" 
                   target="_blank" rel="noopener">Twitter</a>
                <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}" 
                   target="_blank" rel="noopener">LinkedIn</a>
            `;
            
            const footer = article.querySelector('footer');
            if (footer) {
                footer.appendChild(shareContainer);
            }
        });
    }
    
    initFormEnhancements() {
        // Add form validation and ARIA attributes
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            this.enhanceForm(form);
        });
    }
    
    enhanceForm(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Add required aria attributes
            if (input.hasAttribute('required')) {
                input.setAttribute('aria-required', 'true');
            }
            
            // Add error containers
            const errorId = `${input.id}-error`;
            let errorContainer = document.getElementById(errorId);
            
            if (!errorContainer) {
                errorContainer = document.createElement('div');
                errorContainer.id = errorId;
                errorContainer.className = 'error-message';
                errorContainer.setAttribute('aria-live', 'polite');
                input.insertAdjacentElement('afterend', errorContainer);
            }
            
            input.setAttribute('aria-describedby', errorId);
        });
        
        // Add form submission handling
        form.addEventListener('submit', (e) => {
            if (!this.validateForm(form)) {
                e.preventDefault();
            }
        });
    }
    
    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            const errorContainer = document.getElementById(`${input.id}-error`);
            
            if (!input.value.trim()) {
                errorContainer.textContent = 'Ez a mező kötelező';
                input.setAttribute('aria-invalid', 'true');
                isValid = false;
            } else {
                errorContainer.textContent = '';
                input.setAttribute('aria-invalid', 'false');
            }
        });
        
        return isValid;
    }
}

// Initialize semantic HTML enhancements
document.addEventListener('DOMContentLoaded', () => {
    new SemanticHTMLManager();
});
```
*Figyeld meg: Header/main/article/section világos struktúra, ARIA attributumok, microdata.*

</div>

<div class="concept-section myths" data-filter="html">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Div és span mindenhez használható." → Szemantikus elemek jobb SEO-t és accessibilityt biztosítanak
- „Header csak az oldal tetején lehet." → Minden section-nek lehet saját header-je
- „Article csak blog posztokhoz való." → Bármilyen önálló tartalomhoz használható (termékek, kommentek, etc.)

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="html">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Főbb szemantikus elemek:**
```html
<header>     <!-- Fejléc tartalom -->
<nav>        <!-- Navigációs linkek -->
<main>       <!-- Fő tartalom (egy oldalon egy) -->
<section>    <!-- Tematikus csoportosítás -->
<article>    <!-- Önálló tartalom -->
<aside>      <!-- Mellék tartalom -->
<footer>     <!-- Lábléc tartalom -->
<figure>     <!-- Képek captionnal -->
<time>       <!-- Dátum/idő információ -->
<address>    <!-- Kapcsolati információ -->
```

**ARIA landmarks:**
```html
<nav role="navigation" aria-label="Main menu">
<main role="main" id="main-content">
<aside role="complementary" aria-labelledby="sidebar-title">
<footer role="contentinfo">
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="html junior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mi a különbség a section és article között?**
A: Article önálló, újrafelhasználható tartalom (blog poszt, termék), section tematikus csoportosítás a dokumentumban.

**Q: Mikor használnál header elemet article-n belül?**
A: Amikor az article-nek van címe, szerzője, dátuma - minden article-nek lehet saját header-je.

**Q: Hogyan javítja a SEO-t a semantic HTML?**
A: Keresőmotorok jobban értelmezik a tartalom szerkezetét, featured snippets, rich results támogatás.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="html">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Accessibility** → Screen readers és assistive technológiák
- **SEO** → Keresőmotor optimalizáció és structured data
- **CSS** → Szemantikus elemek styling-ja
- **JavaScript** → DOM manipulation és form enhancement
- **HTML5** → Modern HTML features és API-k

</div>

</details>

</div>

### Form handling és validation alapok {#form-handling-validation}

<div class="concept-section mental-model" data-filter="html junior">

🧭 **Így gondolj rá**  
*Form validation olyan, mint egy éjjeliőr az éjszakai klubnál: ellenőrzi az ID-t (helyes formátum), korhatárt (validation rules), és csak akkor enged be (submit), ha minden rendben.*

</div>

<div class="concept-section why-important" data-filter="html junior">

💡 **Miért számít?**
- **Data integrity**: csak valid adatok kerülnek a rendszerbe
- **User experience**: azonnali visszajelzés és hibakezelés
- **Security**: XSS és injection támadások megelőzése
- **Accessibility**: screen reader-ek számára érthető error messages

</div>

<div class="runnable-model" data-filter="html">

**Runnable mental model**
```html
<!-- Modern HTML5 form with comprehensive validation -->
<form id="registration-form" class="form-validation" novalidate>
    <fieldset>
        <legend>Személyes adatok</legend>
        
        <!-- Text input with multiple validation rules -->
        <div class="form-group">
            <label for="fullName">
                Teljes név
                <span class="required" aria-label="kötelező mező">*</span>
            </label>
            <input 
                type="text" 
                id="fullName" 
                name="fullName"
                required
                minlength="2"
                maxlength="50"
                pattern="[A-Za-zÀ-ÿ\s]{2,50}"
                autocomplete="name"
                aria-describedby="fullName-help fullName-error"
                aria-invalid="false"
            >
            <small id="fullName-help" class="help-text">
                Minimum 2, maximum 50 karakter
            </small>
            <div id="fullName-error" class="error-message" role="alert" aria-live="polite"></div>
        </div>

        <!-- Email with custom validation -->
        <div class="form-group">
            <label for="email">Email cím *</label>
            <input 
                type="email" 
                id="email" 
                name="email"
                required
                autocomplete="email"
                aria-describedby="email-help email-error"
                placeholder="pelda@email.com"
            >
            <small id="email-help" class="help-text">
                Érvényes email cím formátum szükséges
            </small>
            <div id="email-error" class="error-message" role="alert" aria-live="polite"></div>
        </div>

        <!-- Password with strength indicator -->
        <div class="form-group">
            <label for="password">Jelszó *</label>
            <div class="password-input-wrapper">
                <input 
                    type="password" 
                    id="password" 
                    name="password"
                    required
                    minlength="8"
                    maxlength="128"
                    autocomplete="new-password"
                    aria-describedby="password-help password-error password-strength"
                >
                <button type="button" class="password-toggle" aria-label="Jelszó mutatása/elrejtése">
                    👁️
                </button>
            </div>
            <small id="password-help" class="help-text">
                Minimum 8 karakter, tartalmazzon számot és betűt
            </small>
            <div id="password-strength" class="password-strength" aria-live="polite"></div>
            <div id="password-error" class="error-message" role="alert" aria-live="polite"></div>
        </div>

        <!-- Confirm password -->
        <div class="form-group">
            <label for="confirmPassword">Jelszó megerősítése *</label>
            <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword"
                required
                autocomplete="new-password"
                aria-describedby="confirmPassword-error"
            >
            <div id="confirmPassword-error" class="error-message" role="alert" aria-live="polite"></div>
        </div>
    </fieldset>

    <fieldset>
        <legend>Kapcsolati információk</legend>
        
        <!-- Phone number with pattern -->
        <div class="form-group">
            <label for="phone">Telefonszám</label>
            <input 
                type="tel" 
                id="phone" 
                name="phone"
                pattern="[\+]?[0-9\s\-\(\)]{10,}"
                autocomplete="tel"
                placeholder="+36 30 123 4567"
                aria-describedby="phone-help phone-error"
            >
            <small id="phone-help" class="help-text">
                Opcionális, nemzetközi formátumban
            </small>
            <div id="phone-error" class="error-message" role="alert" aria-live="polite"></div>
        </div>

        <!-- Date input -->
        <div class="form-group">
            <label for="birthDate">Születési dátum</label>
            <input 
                type="date" 
                id="birthDate" 
                name="birthDate"
                min="1900-01-01"
                max="2024-12-31"
                autocomplete="bday"
                aria-describedby="birthDate-help birthDate-error"
            >
            <small id="birthDate-help" class="help-text">
                YYYY-MM-DD formátumban
            </small>
            <div id="birthDate-error" class="error-message" role="alert" aria-live="polite"></div>
        </div>

        <!-- Select with validation -->
        <div class="form-group">
            <label for="country">Ország *</label>
            <select 
                id="country" 
                name="country"
                required
                autocomplete="country"
                aria-describedby="country-help country-error"
            >
                <option value="">-- Válasszon országot --</option>
                <option value="HU">Magyarország</option>
                <option value="AT">Ausztria</option>
                <option value="DE">Németország</option>
                <option value="SK">Szlovákia</option>
                <option value="RO">Románia</option>
            </select>
            <small id="country-help" class="help-text">
                Válassza ki lakhelyének országát
            </small>
            <div id="country-error" class="error-message" role="alert" aria-live="polite"></div>
        </div>
    </fieldset>

    <fieldset>
        <legend>Beállítások és hozzájárulások</legend>
        
        <!-- Checkbox group -->
        <div class="form-group">
            <div class="checkbox-group" role="group" aria-labelledby="notifications-legend">
                <span id="notifications-legend" class="group-label">Értesítési beállítások</span>
                
                <label class="checkbox-label">
                    <input type="checkbox" name="notifications[]" value="email" id="notify-email">
                    <span class="checkmark" aria-hidden="true"></span>
                    Email értesítések
                </label>
                
                <label class="checkbox-label">
                    <input type="checkbox" name="notifications[]" value="sms" id="notify-sms">
                    <span class="checkmark" aria-hidden="true"></span>
                    SMS értesítések
                </label>
                
                <label class="checkbox-label">
                    <input type="checkbox" name="notifications[]" value="push" id="notify-push">
                    <span class="checkmark" aria-hidden="true"></span>
                    Push értesítések
                </label>
            </div>
        </div>

        <!-- Radio button group -->
        <div class="form-group">
            <fieldset class="radio-group">
                <legend>Fizetési gyakoriság</legend>
                
                <label class="radio-label">
                    <input type="radio" name="billingFrequency" value="monthly" id="billing-monthly" required>
                    <span class="radio-mark" aria-hidden="true"></span>
                    Havi fizetés
                </label>
                
                <label class="radio-label">
                    <input type="radio" name="billingFrequency" value="yearly" id="billing-yearly">
                    <span class="radio-mark" aria-hidden="true"></span>
                    Éves fizetés (10% kedvezmény)
                </label>
            </fieldset>
            <div id="billingFrequency-error" class="error-message" role="alert" aria-live="polite"></div>
        </div>

        <!-- File upload -->
        <div class="form-group">
            <label for="avatar">Profilkép</label>
            <input 
                type="file" 
                id="avatar" 
                name="avatar"
                accept="image/jpeg,image/png,image/webp"
                aria-describedby="avatar-help avatar-error"
            >
            <small id="avatar-help" class="help-text">
                JPG, PNG vagy WebP, maximum 2MB
            </small>
            <div id="avatar-error" class="error-message" role="alert" aria-live="polite"></div>
            <div id="avatar-preview" class="file-preview"></div>
        </div>

        <!-- Required agreements -->
        <div class="form-group">
            <label class="checkbox-label required-agreement">
                <input type="checkbox" name="termsAccepted" id="terms-accepted" required>
                <span class="checkmark" aria-hidden="true"></span>
                Elfogadom a <a href="/terms" target="_blank">felhasználási feltételeket</a> *
            </label>
            <div id="terms-accepted-error" class="error-message" role="alert" aria-live="polite"></div>
        </div>

        <div class="form-group">
            <label class="checkbox-label">
                <input type="checkbox" name="privacyAccepted" id="privacy-accepted" required>
                <span class="checkmark" aria-hidden="true"></span>
                Elfogadom az <a href="/privacy" target="_blank">adatvédelmi tájékoztatót</a> *
            </label>
            <div id="privacy-accepted-error" class="error-message" role="alert" aria-live="polite"></div>
        </div>
    </fieldset>

    <!-- Form actions -->
    <div class="form-actions">
        <button type="submit" class="btn-primary" id="submit-btn">
            <span class="btn-text">Regisztráció</span>
            <span class="btn-loading" aria-hidden="true">⏳</span>
        </button>
        <button type="button" class="btn-secondary" id="preview-btn">
            Előnézet
        </button>
        <button type="reset" class="btn-neutral">
            Alaphelyzet
        </button>
    </div>

    <!-- Form summary for accessibility -->
    <div id="form-summary" class="form-summary sr-only" aria-live="polite" aria-atomic="true">
        <!-- Dynamic summary will be inserted here -->
    </div>
</form>

<!-- Preview modal for form data -->
<div id="form-preview-modal" class="modal" role="dialog" aria-labelledby="preview-title" aria-hidden="true">
    <div class="modal-content">
        <header class="modal-header">
            <h2 id="preview-title">Regisztrációs adatok előnézete</h2>
            <button type="button" class="modal-close" aria-label="Előnézet bezárása">×</button>
        </header>
        <div class="modal-body" id="preview-content">
            <!-- Preview content will be dynamically generated -->
        </div>
        <footer class="modal-footer">
            <button type="button" class="btn-primary" id="confirm-submit">Regisztráció véglegsítése</button>
            <button type="button" class="btn-secondary" id="edit-form">Szerkesztés</button>
        </footer>
    </div>
</div>
```

```javascript
// Comprehensive form validation and handling
class FormValidator {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        this.validators = new Map();
        this.isSubmitting = false;
        
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.setupCustomValidators();
        this.bindEvents();
        this.setupRealTimeValidation();
        this.setupPasswordStrength();
        this.setupFileUpload();
        this.setupFormPreview();
    }
    
    setupCustomValidators() {
        // Email validator
        this.validators.set('email', {
            validate: (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: 'Érvényes email cím megadása szükséges'
        });
        
        // Password strength validator
        this.validators.set('password', {
            validate: (value) => {
                const hasMinLength = value.length >= 8;
                const hasNumber = /\d/.test(value);
                const hasLetter = /[a-zA-Z]/.test(value);
                const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
                
                return {
                    isValid: hasMinLength && hasNumber && hasLetter,
                    strength: this.calculatePasswordStrength(value),
                    requirements: {
                        length: hasMinLength,
                        number: hasNumber,
                        letter: hasLetter,
                        special: hasSpecial
                    }
                };
            },
            message: 'A jelszónak minimum 8 karakter hosszúnak kell lennie, és tartalmaznia kell számot és betűt'
        });
        
        // Phone number validator
        this.validators.set('phone', {
            validate: (value) => {
                if (!value) return true; // Optional field
                const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
                return phoneRegex.test(value);
            },
            message: 'Érvényes telefonszám formátum szükséges'
        });
        
        // Date validator
        this.validators.set('date', {
            validate: (value, input) => {
                if (!value) return true;
                
                const date = new Date(value);
                const min = input.getAttribute('min');
                const max = input.getAttribute('max');
                
                if (min && date < new Date(min)) return false;
                if (max && date > new Date(max)) return false;
                
                return !isNaN(date.getTime());
            },
            message: 'Érvényes dátum megadása szükséges'
        });
        
        // File size validator
        this.validators.set('file', {
            validate: (files) => {
                if (!files || files.length === 0) return true;
                
                const maxSize = 2 * 1024 * 1024; // 2MB
                const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
                
                for (let file of files) {
                    if (file.size > maxSize) {
                        return { isValid: false, error: 'A fájl mérete nem lehet nagyobb 2MB-nál' };
                    }
                    if (!allowedTypes.includes(file.type)) {
                        return { isValid: false, error: 'Csak JPG, PNG és WebP fájlok engedélyezettek' };
                    }
                }
                
                return { isValid: true };
            },
            message: 'Érvényes fájl kiválasztása szükséges'
        });
    }
    
    bindEvents() {
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
        
        // Real-time validation
        this.form.addEventListener('input', (e) => {
            this.validateField(e.target);
        });
        
        this.form.addEventListener('blur', (e) => {
            this.validateField(e.target);
        }, true);
        
        // Password confirmation
        const confirmPassword = this.form.querySelector('#confirmPassword');
        if (confirmPassword) {
            confirmPassword.addEventListener('input', () => {
                this.validatePasswordConfirmation();
            });
        }
        
        // Password toggle
        const passwordToggle = this.form.querySelector('.password-toggle');
        if (passwordToggle) {
            passwordToggle.addEventListener('click', () => {
                this.togglePasswordVisibility();
            });
        }
    }
    
    setupRealTimeValidation() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Debounced validation for better performance
            let timeout;
            input.addEventListener('input', () => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    this.validateField(input);
                }, 300);
            });
        });
    }
    
    validateField(field) {
        if (!field.name) return true;
        
        const value = field.value;
        const fieldName = field.name;
        const fieldType = field.type;
        const errorElement = document.getElementById(`${field.id}-error`);
        
        let isValid = true;
        let errorMessage = '';
        
        // HTML5 validation first
        if (!field.checkValidity()) {
            isValid = false;
            errorMessage = this.getCustomValidationMessage(field);
        }
        
        // Custom validators
        if (isValid && this.validators.has(fieldType)) {
            const validator = this.validators.get(fieldType);
            const result = validator.validate(value, field);
            
            if (typeof result === 'object') {
                isValid = result.isValid;
                if (!isValid) {
                    errorMessage = result.error || validator.message;
                }
                
                // Handle password strength
                if (fieldType === 'password' && field.id === 'password') {
                    this.updatePasswordStrength(result);
                }
            } else {
                isValid = result;
                if (!isValid) {
                    errorMessage = validator.message;
                }
            }
        }
        
        // Special case for file inputs
        if (fieldType === 'file' && field.files) {
            const validator = this.validators.get('file');
            const result = validator.validate(field.files);
            isValid = result.isValid;
            if (!isValid) {
                errorMessage = result.error;
            }
        }
        
        // Update UI
        this.updateFieldValidation(field, isValid, errorMessage);
        
        return isValid;
    }
    
    getCustomValidationMessage(field) {
        const validity = field.validity;
        
        if (validity.valueMissing) {
            return 'Ez a mező kötelező';
        }
        if (validity.typeMismatch) {
            return 'Érvénytelen formátum';
        }
        if (validity.tooShort) {
            return `Minimum ${field.minLength} karakter szükséges`;
        }
        if (validity.tooLong) {
            return `Maximum ${field.maxLength} karakter engedélyezett`;
        }
        if (validity.patternMismatch) {
            return 'A megadott formátum nem megfelelő';
        }
        if (validity.rangeUnderflow) {
            return `Minimum érték: ${field.min}`;
        }
        if (validity.rangeOverflow) {
            return `Maximum érték: ${field.max}`;
        }
        
        return 'Érvénytelen érték';
    }
    
    updateFieldValidation(field, isValid, errorMessage) {
        const errorElement = document.getElementById(`${field.id}-error`);
        
        field.setAttribute('aria-invalid', !isValid);
        
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = errorMessage ? 'block' : 'none';
        }
        
        // Visual feedback
        field.classList.toggle('is-invalid', !isValid);
        field.classList.toggle('is-valid', isValid && field.value);
    }
    
    validatePasswordConfirmation() {
        const password = this.form.querySelector('#password');
        const confirmPassword = this.form.querySelector('#confirmPassword');
        
        if (!password || !confirmPassword) return;
        
        const isValid = password.value === confirmPassword.value;
        const errorMessage = isValid ? '' : 'A jelszavak nem egyeznek';
        
        this.updateFieldValidation(confirmPassword, isValid, errorMessage);
    }
    
    calculatePasswordStrength(password) {
        let score = 0;
        
        // Length
        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
        
        // Character types
        if (/[a-z]/.test(password)) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;
        
        // Patterns
        if (!/(.)\1{2,}/.test(password)) score += 1; // No repeated characters
        
        return Math.min(score, 5);
    }
    
    updatePasswordStrength(result) {
        const strengthElement = document.getElementById('password-strength');
        if (!strengthElement) return;
        
        const strength = result.strength;
        const requirements = result.requirements;
        
        const strengthLabels = ['Nagyon gyenge', 'Gyenge', 'Közepes', 'Erős', 'Nagyon erős'];
        const strengthColors = ['#ff4444', '#ff8800', '#ffbb33', '#00C851', '#007E33'];
        
        const strengthLabel = strengthLabels[strength - 1] || 'Nagyon gyenge';
        const strengthColor = strengthColors[strength - 1] || '#ff4444';
        
        strengthElement.innerHTML = `
            <div class="strength-bar">
                <div class="strength-fill" style="width: ${(strength / 5) * 100}%; background-color: ${strengthColor}"></div>
            </div>
            <span class="strength-text" style="color: ${strengthColor}">${strengthLabel}</span>
            <ul class="strength-requirements">
                <li class="${requirements.length ? 'valid' : 'invalid'}">Minimum 8 karakter</li>
                <li class="${requirements.number ? 'valid' : 'invalid'}">Tartalmaz számot</li>
                <li class="${requirements.letter ? 'valid' : 'invalid'}">Tartalmaz betűt</li>
                <li class="${requirements.special ? 'valid' : 'invalid'}">Tartalmaz speciális karaktert</li>
            </ul>
        `;
    }
    
    setupPasswordStrength() {
        const passwordInput = this.form.querySelector('#password');
        if (passwordInput) {
            passwordInput.addEventListener('input', (e) => {
                const validator = this.validators.get('password');
                const result = validator.validate(e.target.value);
                this.updatePasswordStrength(result);
            });
        }
    }
    
    togglePasswordVisibility() {
        const passwordInput = this.form.querySelector('#password');
        const toggleButton = this.form.querySelector('.password-toggle');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleButton.textContent = '🙈';
            toggleButton.setAttribute('aria-label', 'Jelszó elrejtése');
        } else {
            passwordInput.type = 'password';
            toggleButton.textContent = '👁️';
            toggleButton.setAttribute('aria-label', 'Jelszó mutatása');
        }
    }
    
    setupFileUpload() {
        const fileInput = this.form.querySelector('#avatar');
        const previewElement = document.getElementById('avatar-preview');
        
        if (fileInput && previewElement) {
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        previewElement.innerHTML = `
                            <div class="file-preview-item">
                                <img src="${e.target.result}" alt="Profilkép előnézet" class="preview-image">
                                <div class="file-info">
                                    <p><strong>${file.name}</strong></p>
                                    <p>${(file.size / 1024).toFixed(1)} KB</p>
                                </div>
                                <button type="button" class="remove-file" aria-label="Fájl eltávolítása">×</button>
                            </div>
                        `;
                        
                        // Remove file functionality
                        previewElement.querySelector('.remove-file').addEventListener('click', () => {
                            fileInput.value = '';
                            previewElement.innerHTML = '';
                        });
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }
    
    setupFormPreview() {
        const previewBtn = document.getElementById('preview-btn');
        const modal = document.getElementById('form-preview-modal');
        const confirmSubmitBtn = document.getElementById('confirm-submit');
        const editFormBtn = document.getElementById('edit-form');
        
        if (previewBtn && modal) {
            previewBtn.addEventListener('click', () => {
                if (this.validateForm()) {
                    this.showFormPreview();
                }
            });
            
            confirmSubmitBtn?.addEventListener('click', () => {
                this.hideFormPreview();
                this.submitForm();
            });
            
            editFormBtn?.addEventListener('click', () => {
                this.hideFormPreview();
            });
        }
    }
    
    showFormPreview() {
        const formData = new FormData(this.form);
        const previewContent = document.getElementById('preview-content');
        const modal = document.getElementById('form-preview-modal');
        
        let previewHTML = '<div class="form-preview-data">';
        
        for (let [key, value] of formData.entries()) {
            if (key.includes('password')) continue; // Don't show passwords
            
            const label = this.form.querySelector(`[name="${key}"]`)?.labels[0]?.textContent || key;
            previewHTML += `
                <div class="preview-item">
                    <strong>${label}:</strong>
                    <span>${value || 'Nincs megadva'}</span>
                </div>
            `;
        }
        
        previewHTML += '</div>';
        previewContent.innerHTML = previewHTML;
        
        modal.setAttribute('aria-hidden', 'false');
        modal.style.display = 'block';
        
        // Focus management
        modal.querySelector('.modal-close').focus();
    }
    
    hideFormPreview() {
        const modal = document.getElementById('form-preview-modal');
        modal.setAttribute('aria-hidden', 'true');
        modal.style.display = 'none';
    }
    
    validateForm() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        let isValid = true;
        let firstInvalidField = null;
        
        inputs.forEach(input => {
            const fieldValid = this.validateField(input);
            if (!fieldValid && !firstInvalidField) {
                firstInvalidField = input;
            }
            isValid = isValid && fieldValid;
        });
        
        // Special validations
        this.validatePasswordConfirmation();
        
        // Check required checkboxes
        const requiredCheckboxes = this.form.querySelectorAll('input[type="checkbox"][required]');
        requiredCheckboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                this.updateFieldValidation(checkbox, false, 'Ez a mező kötelező');
                isValid = false;
                if (!firstInvalidField) {
                    firstInvalidField = checkbox;
                }
            }
        });
        
        // Focus first invalid field
        if (firstInvalidField) {
            firstInvalidField.focus();
            firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        // Update form summary for screen readers
        this.updateFormSummary(isValid);
        
        return isValid;
    }
    
    updateFormSummary(isValid) {
        const summary = document.getElementById('form-summary');
        const errorCount = this.form.querySelectorAll('.is-invalid').length;
        
        if (summary) {
            if (isValid) {
                summary.textContent = 'Az űrlap kitöltése sikeres, minden mező érvényes.';
            } else {
                summary.textContent = `Az űrlap ${errorCount} hibát tartalmaz. Kérem, javítsa a hibákat és próbálja újra.`;
            }
        }
    }
    
    async handleSubmit() {
        if (this.isSubmitting) return;
        
        if (!this.validateForm()) {
            return;
        }
        
        this.isSubmitting = true;
        this.updateSubmitButton(true);
        
        try {
            await this.submitForm();
        } catch (error) {
            this.handleSubmitError(error);
        } finally {
            this.isSubmitting = false;
            this.updateSubmitButton(false);
        }
    }
    
    updateSubmitButton(isLoading) {
        const submitBtn = document.getElementById('submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        submitBtn.disabled = isLoading;
        btnText.style.display = isLoading ? 'none' : 'inline';
        btnLoading.style.display = isLoading ? 'inline' : 'none';
        
        if (isLoading) {
            submitBtn.setAttribute('aria-label', 'Küldés folyamatban...');
        } else {
            submitBtn.removeAttribute('aria-label');
        }
    }
    
    async submitForm() {
        const formData = new FormData(this.form);
        
        // Convert FormData to regular object for easier handling
        const data = {};
        for (let [key, value] of formData.entries()) {
            if (data[key]) {
                // Handle multiple values (like checkboxes)
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }
        
        // Simulate API call
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        
        const result = await response.json();
        this.handleSubmitSuccess(result);
    }
    
    handleSubmitSuccess(result) {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success';
        successMessage.setAttribute('role', 'alert');
        successMessage.innerHTML = `
            <h3>Sikeres regisztráció!</h3>
            <p>Köszönjük a regisztrációt. Megerősítő emailt küldtünk a megadott címre.</p>
        `;
        
        this.form.insertAdjacentElement('beforebegin', successMessage);
        
        // Hide form
        this.form.style.display = 'none';
        
        // Announce to screen readers
        this.announceToScreenReader('Regisztráció sikeresen elküldve');
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth' });
    }
    
    handleSubmitError(error) {
        console.error('Form submission error:', error);
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'alert alert-error';
        errorMessage.setAttribute('role', 'alert');
        errorMessage.innerHTML = `
            <h3>Hiba történt</h3>
            <p>A regisztráció során hiba történt. Kérem, próbálja újra később.</p>
        `;
        
        this.form.insertAdjacentElement('beforebegin', errorMessage);
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            errorMessage.remove();
        }, 5000);
        
        this.announceToScreenReader('Hiba történt a regisztráció során');
    }
    
    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'assertive');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', () => {
    new FormValidator('#registration-form');
});
```
*Figyeld meg: HTML5 validation + custom validators, real-time feedback, accessibility support.*

</div>

<div class="concept-section myths" data-filter="html">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „HTML5 validation elég, nincs szükség JavaScript-re." → Client-side validation kényelmi funkció, szerver oldali validáció kötelező
- „novalidate attribútum kikapcsolja a validációt." → Csak a böngésző alapértelmezett UI-ját, programozottan még használható
- „required attribútum minden input típushoz használható." → Checkbox, radio, file inputs-nál speciális kezelés szükséges

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="html">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**HTML5 input types:**
```html
<input type="email">      <!-- Email validation -->
<input type="tel">        <!-- Phone number -->
<input type="url">        <!-- URL validation -->
<input type="number">     <!-- Numeric input -->
<input type="date">       <!-- Date picker -->
<input type="time">       <!-- Time picker -->
<input type="color">      <!-- Color picker -->
<input type="range">      <!-- Slider -->
<input type="file">       <!-- File upload -->
```

**Validation attributes:**
```html
required                  <!-- Field is required -->
minlength="5"            <!-- Minimum length -->
maxlength="50"           <!-- Maximum length -->
min="18" max="99"        <!-- Number range -->
pattern="[0-9]{4}"       <!-- Regex pattern -->
autocomplete="email"     <!-- Autocomplete hint -->
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="html junior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mi a különbség client-side és server-side validation között?**
A: Client-side UX javítás és azonnali visszajelzés, server-side biztonsági védelem és adat integritás.

**Q: Hogyan implementálnál accessible form validation-t?**
A: ARIA attributes (aria-invalid, aria-describedby), live regions, proper labeling, keyboard navigation.

**Q: Mikor használnál custom validation HTML5 validation helyett?**
A: Komplex üzleti szabályok, cross-field validation, real-time API ellenőrzés, custom error messages.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="html">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Accessibility** → Screen reader support és ARIA attributes
- **JavaScript** → Custom validation logic és user interaction
- **Security** → Input sanitization és XSS protection  
- **UX Design** → Error handling és user feedback
- **HTTP** → Form submission és server communication

</div>

</details>

</div>

### JSON vs XML {#json-vs-xml}

<div class="concept-section mental-model" data-filter="javascript junior">

🧭 **Így gondolj rá**  
*JSON olyan, mint egy jól szervezett ékszerdoboz (egyszerű, tiszta, könnyen átlátható), XML pedig mint egy antik szekrény sok fiókkal (részletes, strukturált, de bonyolultabb).*

</div>

<div class="concept-section why-important" data-filter="javascript junior">

💡 **Miért számít?**
- **API communication**: modern API-k többnyire JSON-t használnak
- **Data storage**: adatstruktúra választás performance és olvashatóság szempontból
- **Integration**: legacy rendszerekkel való kommunikáció
- **File size**: bandwidth és loading time optimalizáció

</div>

<div class="runnable-model" data-filter="javascript">

**Runnable mental model**
```javascript
// JSON vs XML Data Comparison
class DataFormatComparison {
    constructor() {
        this.sampleData = {
            users: [
                {
                    id: 1,
                    name: "Nagy János",
                    email: "nagy.janos@example.com",
                    age: 30,
                    active: true,
                    roles: ["admin", "user"],
                    address: {
                        street: "Fő utca 123",
                        city: "Budapest",
                        zipcode: "1051",
                        country: "Hungary"
                    },
                    lastLogin: "2024-03-15T10:30:00Z",
                    preferences: {
                        theme: "dark",
                        language: "hu",
                        notifications: {
                            email: true,
                            sms: false,
                            push: true
                        }
                    }
                },
                {
                    id: 2,
                    name: "Kovács Anna",
                    email: "kovacs.anna@example.com",
                    age: 28,
                    active: false,
                    roles: ["user"],
                    address: {
                        street: "Váci út 456",
                        city: "Debrecen",
                        zipcode: "4024",
                        country: "Hungary"
                    },
                    lastLogin: "2024-03-10T15:45:00Z",
                    preferences: {
                        theme: "light",
                        language: "en",
                        notifications: {
                            email: false,
                            sms: true,
                            push: false
                        }
                    }
                }
            ],
            metadata: {
                totalCount: 2,
                page: 1,
                pageSize: 10,
                generatedAt: "2024-03-15T12:00:00Z",
                version: "1.0"
            }
        };
        
        this.demonstrateFormats();
    }
    
    demonstrateFormats() {
        console.log("=== JSON vs XML Comparison ===");
        
        // JSON format
        const jsonData = this.toJSON();
        console.log("JSON Format:");
        console.log(jsonData);
        console.log(`JSON Size: ${this.getSize(jsonData)} bytes`);
        
        // XML format  
        const xmlData = this.toXML();
        console.log("\nXML Format:");
        console.log(xmlData);
        console.log(`XML Size: ${this.getSize(xmlData)} bytes`);
        
        // Performance comparison
        this.performanceTest();
        
        // Parsing comparison
        this.parsingComparison();
    }
    
    toJSON() {
        return JSON.stringify(this.sampleData, null, 2);
    }
    
    toXML() {
        const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
        const xmlData = this.objectToXML(this.sampleData, 'root');
        return xmlHeader + '\n' + xmlData;
    }
    
    objectToXML(obj, rootName = 'root', indent = 0) {
        const spaces = '  '.repeat(indent);
        let xml = '';
        
        if (Array.isArray(obj)) {
            obj.forEach(item => {
                xml += `${spaces}<${rootName}>\n`;
                xml += this.objectToXML(item, 'item', indent + 1);
                xml += `${spaces}</${rootName}>\n`;
            });
        } else if (typeof obj === 'object' && obj !== null) {
            xml += `${spaces}<${rootName}>\n`;
            
            Object.entries(obj).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach(item => {
                        if (typeof item === 'object') {
                            xml += `${spaces}  <${key}>\n`;
                            xml += this.objectToXML(item, 'item', indent + 2);
                            xml += `${spaces}  </${key}>\n`;
                        } else {
                            xml += `${spaces}  <${key}>${this.escapeXML(item)}</${key}>\n`;
                        }
                    });
                } else if (typeof value === 'object' && value !== null) {
                    xml += this.objectToXML(value, key, indent + 1);
                } else {
                    xml += `${spaces}  <${key}>${this.escapeXML(value)}</${key}>\n`;
                }
            });
            
            xml += `${spaces}</${rootName}>\n`;
        } else {
            xml += `${spaces}<${rootName}>${this.escapeXML(obj)}</${rootName}>\n`;
        }
        
        return xml;
    }
    
    escapeXML(text) {
        if (typeof text !== 'string') text = String(text);
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
    
    getSize(data) {
        return new Blob([data]).size;
    }
    
    performanceTest() {
        console.log("\n=== Performance Test ===");
        
        const iterations = 1000;
        
        // JSON serialization performance
        console.time('JSON Stringify');
        for (let i = 0; i < iterations; i++) {
            JSON.stringify(this.sampleData);
        }
        console.timeEnd('JSON Stringify');
        
        // JSON parsing performance
        const jsonString = JSON.stringify(this.sampleData);
        console.time('JSON Parse');
        for (let i = 0; i < iterations; i++) {
            JSON.parse(jsonString);
        }
        console.timeEnd('JSON Parse');
        
        // XML generation performance (simplified)
        console.time('XML Generation');
        for (let i = 0; i < iterations; i++) {
            this.toXML();
        }
        console.timeEnd('XML Generation');
        
        // XML parsing would require DOMParser
        const xmlString = this.toXML();
        if (typeof DOMParser !== 'undefined') {
            const parser = new DOMParser();
            console.time('XML Parse');
            for (let i = 0; i < iterations; i++) {
                parser.parseFromString(xmlString, 'text/xml');
            }
            console.timeEnd('XML Parse');
        }
    }
    
    parsingComparison() {
        console.log("\n=== Parsing Comparison ===");
        
        // JSON parsing
        const jsonString = this.toJSON();
        console.log("JSON Parsing:");
        try {
            const parsedJson = JSON.parse(jsonString);
            console.log("✅ JSON parsed successfully");
            console.log("First user name:", parsedJson.users[0].name);
            console.log("Easy property access:", parsedJson.metadata.totalCount);
        } catch (error) {
            console.log("❌ JSON parsing failed:", error.message);
        }
        
        // XML parsing
        const xmlString = this.toXML();
        console.log("\nXML Parsing:");
        if (typeof DOMParser !== 'undefined') {
            try {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
                
                // Check for parsing errors
                const parseError = xmlDoc.getElementsByTagName('parsererror');
                if (parseError.length > 0) {
                    console.log("❌ XML parsing failed");
                } else {
                    console.log("✅ XML parsed successfully");
                    
                    // More complex navigation required
                    const users = xmlDoc.getElementsByTagName('users');
                    if (users.length > 0) {
                        const firstUser = users[0];
                        const nameElement = firstUser.getElementsByTagName('name')[0];
                        if (nameElement) {
                            console.log("First user name:", nameElement.textContent);
                        }
                    }
                    
                    const totalCount = xmlDoc.getElementsByTagName('totalCount')[0];
                    if (totalCount) {
                        console.log("Total count:", totalCount.textContent);
                    }
                }
            } catch (error) {
                console.log("❌ XML parsing failed:", error.message);
            }
        } else {
            console.log("DOMParser not available (Node.js environment)");
        }
    }
    
    // API Communication Examples
    demonstrateApiUsage() {
        console.log("\n=== API Communication Examples ===");
        
        this.jsonApiExample();
        this.xmlApiExample();
    }
    
    async jsonApiExample() {
        console.log("JSON API Communication:");
        
        const jsonRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: "Új felhasználó",
                email: "uj@example.com"
            })
        };
        
        console.log("Request setup:", jsonRequest);
        
        // Simulated response handling
        const mockJsonResponse = {
            success: true,
            data: {
                id: 3,
                name: "Új felhasználó",
                email: "uj@example.com",
                createdAt: new Date().toISOString()
            }
        };
        
        console.log("Response handling:");
        console.log("✅ Easy to parse:", mockJsonResponse.data.id);
        console.log("✅ Direct property access:", mockJsonResponse.success);
    }
    
    xmlApiExample() {
        console.log("\nXML API Communication (SOAP example):");
        
        const soapRequest = `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Header>
        <auth:Authentication xmlns:auth="http://example.com/auth">
            <auth:Username>user</auth:Username>
            <auth:Password>pass</auth:Password>
        </auth:Authentication>
    </soap:Header>
    <soap:Body>
        <m:CreateUser xmlns:m="http://example.com/methods">
            <m:Name>Új felhasználó</m:Name>
            <m:Email>uj@example.com</m:Email>
        </m:CreateUser>
    </soap:Body>
</soap:Envelope>`;
        
        console.log("SOAP Request:", soapRequest);
        console.log("⚠️  More verbose and complex");
        console.log("⚠️  Requires namespace handling");
        console.log("⚠️  Harder to generate and parse");
    }
    
    // Use case recommendations
    getRecommendations() {
        console.log("\n=== Use Case Recommendations ===");
        
        const recommendations = {
            json: {
                bestFor: [
                    "REST API-k",
                    "Web alkalmazások",
                    "NoSQL adatbázisok",
                    "Real-time alkalmazások",
                    "Mobile app communication",
                    "Microservices"
                ],
                advantages: [
                    "Kisebb fájlméret",
                    "Gyorsabb parsing",
                    "JavaScript natív támogatás",
                    "Ember által olvasható",
                    "Egyszerű szintaxis"
                ],
                disadvantages: [
                    "Nincs schema validation (alapból)",
                    "Limitált adattípusok",
                    "Nincs comment support",
                    "Nincs namespace support"
                ]
            },
            xml: {
                bestFor: [
                    "Enterprise integration",
                    "SOAP web services",
                    "Configuration fájlok",
                    "Document markup",
                    "Legacy system integration",
                    "Komplex adatstruktúrák"
                ],
                advantages: [
                    "Schema validation (XSD)",
                    "Namespace support",
                    "Rich adattípusok",
                    "Comment support",
                    "Self-documenting",
                    "Transform support (XSLT)"
                ],
                disadvantages: [
                    "Nagyobb fájlméret",
                    "Lassabb parsing",
                    "Verbózusabb szintaxis",
                    "Bonyolultabb kezelés",
                    "Több memória igény"
                ]
            }
        };
        
        console.log("JSON recommendations:", recommendations.json);
        console.log("XML recommendations:", recommendations.xml);
        
        return recommendations;
    }
    
    // Modern alternatives
    modernAlternatives() {
        console.log("\n=== Modern Alternatives ===");
        
        const alternatives = {
            messagepack: {
                description: "Binary serialization format",
                advantages: ["Kisebb mint JSON", "Gyorsabb parsing", "Típusbiztos"],
                useCase: "Performance-critical alkalmazások"
            },
            protobuf: {
                description: "Google Protocol Buffers",
                advantages: ["Hatékony binary format", "Schema evolution", "Multi-language"],
                useCase: "gRPC, microservices"
            },
            avro: {
                description: "Apache Avro",
                advantages: ["Schema evolution", "Compact format", "Rich data types"],
                useCase: "Big data, Kafka"
            },
            yaml: {
                description: "YAML Ain't Markup Language",
                advantages: ["Human readable", "Comments support", "Multi-document"],
                useCase: "Configuration fájlok, CI/CD"
            }
        };
        
        console.log("Modern data format alternatives:", alternatives);
        return alternatives;
    }
    
    // Practical conversion utilities
    convertJsonToXml(jsonString) {
        try {
            const jsonObj = JSON.parse(jsonString);
            return this.objectToXML(jsonObj);
        } catch (error) {
            throw new Error(`JSON to XML conversion failed: ${error.message}`);
        }
    }
    
    convertXmlToJson(xmlString) {
        if (typeof DOMParser === 'undefined') {
            throw new Error('DOMParser not available');
        }
        
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
            
            // Check for parsing errors
            const parseError = xmlDoc.getElementsByTagName('parsererror');
            if (parseError.length > 0) {
                throw new Error('Invalid XML');
            }
            
            const jsonObj = this.xmlNodeToObject(xmlDoc.documentElement);
            return JSON.stringify(jsonObj, null, 2);
        } catch (error) {
            throw new Error(`XML to JSON conversion failed: ${error.message}`);
        }
    }
    
    xmlNodeToObject(node) {
        const obj = {};
        
        // Handle attributes
        if (node.attributes && node.attributes.length > 0) {
            obj['@attributes'] = {};
            for (let attr of node.attributes) {
                obj['@attributes'][attr.name] = attr.value;
            }
        }
        
        // Handle child nodes
        if (node.hasChildNodes()) {
            for (let child of node.childNodes) {
                if (child.nodeType === Node.TEXT_NODE) {
                    const text = child.textContent.trim();
                    if (text) {
                        if (Object.keys(obj).length === 0) {
                            return text;
                        } else {
                            obj['#text'] = text;
                        }
                    }
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    const childObj = this.xmlNodeToObject(child);
                    
                    if (obj[child.nodeName]) {
                        if (!Array.isArray(obj[child.nodeName])) {
                            obj[child.nodeName] = [obj[child.nodeName]];
                        }
                        obj[child.nodeName].push(childObj);
                    } else {
                        obj[child.nodeName] = childObj;
                    }
                }
            }
        }
        
        return obj;
    }
}

// Usage examples
const comparison = new DataFormatComparison();

// Get recommendations for different scenarios
const recommendations = comparison.getRecommendations();

// Show modern alternatives
const alternatives = comparison.modernAlternatives();

// Practical examples for different scenarios
class ScenarioExamples {
    // REST API response
    static restApiExample() {
        const jsonResponse = {
            "status": "success",
            "data": {
                "users": [
                    {"id": 1, "name": "János", "active": true},
                    {"id": 2, "name": "Anna", "active": false}
                ]
            },
            "pagination": {
                "page": 1,
                "total": 2,
                "hasNext": false
            }
        };
        
        return JSON.stringify(jsonResponse, null, 2);
    }
    
    // SOAP Web Service
    static soapExample() {
        return `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="http://example.com/userservice">
    <soap:Header>
        <tns:SecurityToken>abc123</tns:SecurityToken>
    </soap:Header>
    <soap:Body>
        <tns:GetUsersResponse>
            <tns:Users>
                <tns:User id="1" active="true">
                    <tns:Name>János</tns:Name>
                    <tns:Email>janos@example.com</tns:Email>
                </tns:User>
                <tns:User id="2" active="false">
                    <tns:Name>Anna</tns:Name>
                    <tns:Email>anna@example.com</tns:Email>
                </tns:User>
            </tns:Users>
            <tns:Pagination page="1" total="2" hasNext="false"/>
        </tns:GetUsersResponse>
    </soap:Body>
</soap:Envelope>`;
    }
    
    // Configuration file comparison
    static configExample() {
        const jsonConfig = {
            "database": {
                "host": "localhost",
                "port": 5432,
                "name": "myapp",
                "ssl": true
            },
            "cache": {
                "type": "redis",
                "ttl": 3600
            },
            "features": {
                "auth": true,
                "analytics": false
            }
        };
        
        const xmlConfig = `<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <database>
        <host>localhost</host>
        <port>5432</port>
        <name>myapp</name>
        <ssl>true</ssl>
    </database>
    <cache>
        <type>redis</type>
        <ttl>3600</ttl>
    </cache>
    <features>
        <auth>true</auth>
        <analytics>false</analytics>
    </features>
</configuration>`;
        
        return {
            json: JSON.stringify(jsonConfig, null, 2),
            xml: xmlConfig
        };
    }
}

// Demo different scenarios
console.log("REST API JSON:", ScenarioExamples.restApiExample());
console.log("SOAP XML:", ScenarioExamples.soapExample());
console.log("Config files:", ScenarioExamples.configExample());
```
*Figyeld meg: JSON kompaktabb és gyorsabb, XML verbózusabb de strukturáltabb és schema-val validálható.*

</div>

<div class="concept-section myths" data-filter="javascript">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „XML elavult és senki nem használja." → Enterprise és legacy rendszerekben még mindig elterjedt
- „JSON mindig jobb mint XML." → Komplex adatstruktúrákhoz és schema validációhoz XML előnyösebb lehet
- „XML csak webszolgáltatásokhoz való." → Configuration, dokumentumok, adatcsere sok területen

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="javascript">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**JSON vs XML összehasonlítás:**
```javascript
// JSON - kompakt, native JavaScript support
{
  "name": "János",
  "age": 30,
  "active": true
}

// XML - verbose, schema validation
<user active="true">
  <name>János</name>
  <age>30</age>
</user>
```

**Performance difference:**
```javascript
// JSON: ~60% kisebb fájlméret
// JSON: ~3x gyorsabb parsing
// XML: schema validation, namespaces
// XML: comments, mixed content support
```

**Use cases:**
- **JSON**: REST API, web apps, NoSQL
- **XML**: SOAP, config files, enterprise

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="javascript junior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mikor választanál XML-t JSON helyett?**
A: Schema validation szükséges, namespace support, comments kell, SOAP services, legacy system integration.

**Q: Milyen előnyei vannak a JSON-nak XML-hez képest?**
A: Kisebb fájlméret, gyorsabb parsing, JavaScript native support, egyszerűbb szintaxis, jobb web performance.

**Q: Hogyan kezelnéd az XML namespace-eket JavaScript-ben?**
A: DOMParser getElementsByTagNameNS(), xpath queries, vagy specialized XML libraries (xml2js).

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="javascript">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **HTTP** → Request/response formátumok
- **API Design** → REST vs SOAP protocols
- **Performance** → Bandwidth és parsing optimization
- **JavaScript** → Native JSON support vs XML parsing
- **Security** → Data validation és injection attacks

</div>

</details>

</div>

### WebSockets (real-time communication) {#websockets}

<div class="concept-section mental-model" data-filter="javascript medior">

🧭 **Így gondolj rá**  
*WebSocket olyan, mint egy telefonvonal: egyszer felveszed a kapcsolatot, aztán mindkét fél bármikor beszélhet anélkül, hogy újra kellene tárcsázni (ellentétben a HTTP-val, ami olyan mint postai levelezés).*

</div>

<div class="concept-section why-important" data-filter="javascript medior">

💡 **Miért számít?**
- **Real-time communication**: azonnali kétirányú adatátvitel szerver és kliens között
- **Low latency**: nincs HTTP header overhead minden üzenetnél
- **Live applications**: chat, gaming, live updates, collaborative editing
- **Efficient networking**: egy kapcsolat több üzenet küldésére/fogadására

</div>

<div class="runnable-model" data-filter="javascript">

**Runnable mental model**
```javascript
// WebSocket Client Implementation
class WebSocketManager {
    constructor(url, options = {}) {
        this.url = url;
        this.options = {
            autoReconnect: true,
            maxReconnectAttempts: 5,
            reconnectInterval: 1000,
            heartbeatInterval: 30000,
            ...options
        };
        
        this.ws = null;
        this.reconnectAttempts = 0;
        this.isConnected = false;
        this.messageQueue = [];
        this.eventListeners = new Map();
        this.heartbeatTimer = null;
        
        this.init();
    }
    
    init() {
        this.connect();
        this.setupHeartbeat();
    }
    
    connect() {
        try {
            console.log(`Connecting to WebSocket: ${this.url}`);
            this.ws = new WebSocket(this.url);
            
            this.ws.onopen = this.handleOpen.bind(this);
            this.ws.onmessage = this.handleMessage.bind(this);
            this.ws.onclose = this.handleClose.bind(this);
            this.ws.onerror = this.handleError.bind(this);
            
        } catch (error) {
            console.error('WebSocket connection failed:', error);
            this.handleReconnect();
        }
    }
    
    handleOpen(event) {
        console.log('WebSocket connected');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        
        // Send queued messages
        this.flushMessageQueue();
        
        // Emit custom event
        this.emit('connected', { event });
    }
    
    handleMessage(event) {
        try {
            const data = JSON.parse(event.data);
            console.log('WebSocket message received:', data);
            
            // Handle different message types
            switch (data.type) {
                case 'ping':
                    this.sendPong();
                    break;
                case 'pong':
                    console.log('Heartbeat acknowledged');
                    break;
                case 'notification':
                    this.handleNotification(data.payload);
                    break;
                case 'chat_message':
                    this.handleChatMessage(data.payload);
                    break;
                case 'user_status':
                    this.handleUserStatus(data.payload);
                    break;
                default:
                    this.emit('message', data);
            }
            
        } catch (error) {
            console.error('Failed to parse WebSocket message:', error);
            // Handle raw messages
            this.emit('raw_message', event.data);
        }
    }
    
    handleClose(event) {
        console.log('WebSocket closed:', event.code, event.reason);
        this.isConnected = false;
        this.clearHeartbeat();
        
        // Emit disconnect event
        this.emit('disconnected', { code: event.code, reason: event.reason });
        
        // Auto-reconnect if enabled
        if (this.options.autoReconnect && !event.wasClean) {
            this.handleReconnect();
        }
    }
    
    handleError(error) {
        console.error('WebSocket error:', error);
        this.emit('error', error);
    }
    
    handleReconnect() {
        if (this.reconnectAttempts >= this.options.maxReconnectAttempts) {
            console.error('Max reconnection attempts reached');
            this.emit('reconnect_failed');
            return;
        }
        
        this.reconnectAttempts++;
        const delay = this.options.reconnectInterval * Math.pow(2, this.reconnectAttempts - 1);
        
        console.log(`Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);
        
        setTimeout(() => {
            this.connect();
        }, delay);
    }
    
    send(data) {
        const message = {
            timestamp: Date.now(),
            id: this.generateMessageId(),
            ...data
        };
        
        const messageString = JSON.stringify(message);
        
        if (this.isConnected && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(messageString);
            console.log('Message sent:', message);
        } else {
            console.log('WebSocket not connected, queueing message');
            this.messageQueue.push(messageString);
        }
    }
    
    flushMessageQueue() {
        while (this.messageQueue.length > 0) {
            const message = this.messageQueue.shift();
            this.ws.send(message);
        }
    }
    
    setupHeartbeat() {
        if (this.options.heartbeatInterval) {
            this.heartbeatTimer = setInterval(() => {
                if (this.isConnected) {
                    this.sendPing();
                }
            }, this.options.heartbeatInterval);
        }
    }
    
    clearHeartbeat() {
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = null;
        }
    }
    
    sendPing() {
        this.send({ type: 'ping' });
    }
    
    sendPong() {
        this.send({ type: 'pong' });
    }
    
    handleNotification(payload) {
        console.log('Notification received:', payload);
        this.emit('notification', payload);
        
        // Show browser notification if permissions granted
        if (Notification.permission === 'granted') {
            new Notification(payload.title, {
                body: payload.message,
                icon: payload.icon
            });
        }
    }
    
    handleChatMessage(payload) {
        console.log('Chat message received:', payload);
        this.emit('chat_message', payload);
    }
    
    handleUserStatus(payload) {
        console.log('User status update:', payload);
        this.emit('user_status', payload);
    }
    
    // Event system
    on(event, callback) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }
        this.eventListeners.get(event).push(callback);
    }
    
    off(event, callback) {
        if (this.eventListeners.has(event)) {
            const listeners = this.eventListeners.get(event);
            const index = listeners.indexOf(callback);
            if (index !== -1) {
                listeners.splice(index, 1);
            }
        }
    }
    
    emit(event, data) {
        if (this.eventListeners.has(event)) {
            this.eventListeners.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in event listener for ${event}:`, error);
                }
            });
        }
    }
    
    generateMessageId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    close() {
        this.options.autoReconnect = false;
        this.clearHeartbeat();
        
        if (this.ws) {
            this.ws.close(1000, 'Client closing connection');
        }
    }
    
    // Connection state
    getState() {
        return {
            isConnected: this.isConnected,
            readyState: this.ws?.readyState,
            reconnectAttempts: this.reconnectAttempts,
            queuedMessages: this.messageQueue.length
        };
    }
}

// Chat Application Example
class RealtimeChatApp {
    constructor(wsUrl, userId) {
        this.wsManager = new WebSocketManager(wsUrl);
        this.userId = userId;
        this.users = new Map();
        this.messages = [];
        
        this.initEventListeners();
        this.initUI();
    }
    
    initEventListeners() {
        // WebSocket events
        this.wsManager.on('connected', () => {
            this.updateConnectionStatus('Csatlakozva');
            this.sendUserJoin();
        });
        
        this.wsManager.on('disconnected', () => {
            this.updateConnectionStatus('Kapcsolat megszakadt');
        });
        
        this.wsManager.on('chat_message', (data) => {
            this.addMessage(data);
        });
        
        this.wsManager.on('user_status', (data) => {
            this.updateUserStatus(data);
        });
        
        this.wsManager.on('notification', (data) => {
            this.showNotification(data);
        });
    }
    
    initUI() {
        // Create chat interface
        const chatContainer = document.createElement('div');
        chatContainer.className = 'chat-container';
        chatContainer.innerHTML = `
            <div class="chat-header">
                <h2>Realtime Chat</h2>
                <div class="connection-status" id="connection-status">Csatlakozás...</div>
            </div>
            
            <div class="chat-main">
                <div class="users-panel">
                    <h3>Online felhasználók</h3>
                    <ul id="users-list"></ul>
                </div>
                
                <div class="messages-panel">
                    <div id="messages-container" class="messages-container"></div>
                    
                    <form id="message-form" class="message-form">
                        <input type="text" id="message-input" placeholder="Írj üzenetet..." required>
                        <button type="submit">Küldés</button>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(chatContainer);
        
        // Bind form submission
        const messageForm = document.getElementById('message-form');
        messageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendMessage();
        });
        
        // Handle typing indicators
        const messageInput = document.getElementById('message-input');
        let typingTimer;
        
        messageInput.addEventListener('input', () => {
            this.sendTypingIndicator(true);
            
            clearTimeout(typingTimer);
            typingTimer = setTimeout(() => {
                this.sendTypingIndicator(false);
            }, 1000);
        });
    }
    
    sendUserJoin() {
        this.wsManager.send({
            type: 'user_join',
            payload: {
                userId: this.userId,
                username: `User_${this.userId}`,
                timestamp: Date.now()
            }
        });
    }
    
    sendMessage() {
        const messageInput = document.getElementById('message-input');
        const text = messageInput.value.trim();
        
        if (!text) return;
        
        const message = {
            type: 'chat_message',
            payload: {
                userId: this.userId,
                username: `User_${this.userId}`,
                text: text,
                timestamp: Date.now()
            }
        };
        
        this.wsManager.send(message);
        messageInput.value = '';
    }
    
    sendTypingIndicator(isTyping) {
        this.wsManager.send({
            type: 'typing',
            payload: {
                userId: this.userId,
                isTyping: isTyping
            }
        });
    }
    
    addMessage(data) {
        this.messages.push(data);
        
        const messagesContainer = document.getElementById('messages-container');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${data.userId === this.userId ? 'own-message' : 'other-message'}`;
        
        const time = new Date(data.timestamp).toLocaleTimeString();
        messageElement.innerHTML = `
            <div class="message-header">
                <strong>${data.username}</strong>
                <span class="message-time">${time}</span>
            </div>
            <div class="message-text">${this.escapeHtml(data.text)}</div>
        `;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    updateUserStatus(data) {
        const { userId, status, username } = data;
        
        if (status === 'joined') {
            this.users.set(userId, { username, status: 'online' });
        } else if (status === 'left') {
            this.users.delete(userId);
        }
        
        this.updateUsersList();
    }
    
    updateUsersList() {
        const usersList = document.getElementById('users-list');
        usersList.innerHTML = '';
        
        this.users.forEach((user, userId) => {
            const userElement = document.createElement('li');
            userElement.className = 'user-item';
            userElement.innerHTML = `
                <span class="user-status ${user.status}"></span>
                ${user.username}
            `;
            usersList.appendChild(userElement);
        });
    }
    
    updateConnectionStatus(status) {
        const statusElement = document.getElementById('connection-status');
        statusElement.textContent = status;
        statusElement.className = `connection-status ${status.includes('Csatlakozva') ? 'connected' : 'disconnected'}`;
    }
    
    showNotification(data) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <strong>${data.title}</strong>
                <p>${data.message}</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    destroy() {
        this.wsManager.close();
    }
}

// Live Data Dashboard Example
class LiveDataDashboard {
    constructor(wsUrl) {
        this.wsManager = new WebSocketManager(wsUrl);
        this.charts = new Map();
        this.metrics = new Map();
        
        this.initEventListeners();
        this.initDashboard();
    }
    
    initEventListeners() {
        this.wsManager.on('connected', () => {
            console.log('Dashboard connected to live data feed');
            this.subscribeToMetrics();
        });
        
        this.wsManager.on('message', (data) => {
            this.handleMetricUpdate(data);
        });
    }
    
    subscribeToMetrics() {
        this.wsManager.send({
            type: 'subscribe',
            payload: {
                metrics: ['cpu_usage', 'memory_usage', 'active_users', 'requests_per_second']
            }
        });
    }
    
    handleMetricUpdate(data) {
        if (data.type === 'metric_update') {
            const { metric, value, timestamp } = data.payload;
            
            // Update metric value
            this.metrics.set(metric, { value, timestamp });
            
            // Update UI
            this.updateMetricDisplay(metric, value);
            this.updateChart(metric, value, timestamp);
        }
    }
    
    initDashboard() {
        const dashboard = document.createElement('div');
        dashboard.className = 'live-dashboard';
        dashboard.innerHTML = `
            <h2>Live Data Dashboard</h2>
            
            <div class="metrics-grid">
                <div class="metric-card" id="cpu-metric">
                    <h3>CPU Usage</h3>
                    <div class="metric-value">--</div>
                </div>
                
                <div class="metric-card" id="memory-metric">
                    <h3>Memory Usage</h3>
                    <div class="metric-value">--</div>
                </div>
                
                <div class="metric-card" id="users-metric">
                    <h3>Active Users</h3>
                    <div class="metric-value">--</div>
                </div>
                
                <div class="metric-card" id="rps-metric">
                    <h3>Requests/sec</h3>
                    <div class="metric-value">--</div>
                </div>
            </div>
            
            <div class="charts-container">
                <canvas id="live-chart" width="800" height="400"></canvas>
            </div>
        `;
        
        document.body.appendChild(dashboard);
    }
    
    updateMetricDisplay(metric, value) {
        const metricCard = document.getElementById(`${metric.replace('_', '-')}-metric`);
        if (metricCard) {
            const valueElement = metricCard.querySelector('.metric-value');
            
            let displayValue;
            if (metric.includes('usage')) {
                displayValue = `${value.toFixed(1)}%`;
            } else if (metric === 'active_users') {
                displayValue = value.toLocaleString();
            } else {
                displayValue = value.toFixed(2);
            }
            
            valueElement.textContent = displayValue;
            
            // Add visual feedback for changes
            metricCard.classList.add('updated');
            setTimeout(() => {
                metricCard.classList.remove('updated');
            }, 500);
        }
    }
    
    updateChart(metric, value, timestamp) {
        // Simplified chart update (in real app, use Chart.js or similar)
        console.log(`Chart update: ${metric} = ${value} at ${new Date(timestamp)}`);
    }
}

// Usage Examples
console.log('=== WebSocket Examples ===');

// Example 1: Simple chat application
// const chatApp = new RealtimeChatApp('wss://localhost:8080/chat', 'user123');

// Example 2: Live dashboard
// const dashboard = new LiveDataDashboard('wss://localhost:8080/metrics');

// Example 3: Simple WebSocket connection
const simpleExample = () => {
    const ws = new WebSocketManager('wss://echo.websocket.org/');
    
    ws.on('connected', () => {
        console.log('Connected to echo server');
        ws.send({ type: 'test', message: 'Hello WebSocket!' });
    });
    
    ws.on('message', (data) => {
        console.log('Echo received:', data);
    });
};

// simpleExample();
```
*Figyeld meg: Bidirectional communication, event-driven architecture, automatic reconnection.*

</div>

<div class="concept-section myths" data-filter="javascript">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „WebSocket helyettesíti a HTTP-t." → Kiegészíti, nem helyettesíti; HTTP-vel indul a connection upgrade
- „WebSocket mindig jobb mint HTTP." → Csak real-time alkalmazásokhoz; simple request-response-hoz HTTP egyszerűbb
- „WebSocket automatikusan kezeli a reconnection-t." → Manual implementation szükséges a robust reconnection-höz

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="javascript">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**WebSocket states:**
```javascript
WebSocket.CONNECTING (0) // Kapcsolódás alatt
WebSocket.OPEN (1)       // Kapcsolat aktív
WebSocket.CLOSING (2)    // Kapcsolat zárása alatt  
WebSocket.CLOSED (3)     // Kapcsolat lezárva

// Check connection state
if (ws.readyState === WebSocket.OPEN) {
    ws.send('message');
}
```

**Basic WebSocket pattern:**
```javascript
const ws = new WebSocket('wss://example.com/socket');

ws.onopen = () => console.log('Connected');
ws.onmessage = (event) => console.log('Message:', event.data);
ws.onclose = () => console.log('Disconnected');
ws.onerror = (error) => console.error('Error:', error);
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="javascript medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mikor használnál WebSocket-et HTTP helyett?**
A: Real-time alkalmazásokhoz (chat, gaming, live updates), alacsony latency, frequent bidirectional communication.

**Q: Hogyan kezelnéd a WebSocket connection loss-t?**
A: Automatic reconnection logic, exponential backoff, message queuing, heartbeat/ping-pong mechanizmus.

**Q: Mi a különbség WebSocket és Server-Sent Events között?**
A: WebSocket bidirectional, SSE csak server→client, SSE egyszerűbb HTTP-based, WebSocket más protokoll.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="javascript">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **HTTP** → Connection upgrade és handshake
- **Event Handling** → Message events és custom event system
- **Performance** → Real-time communication optimization
- **Security** → WSS encryption és authentication
- **API Design** → Message protocols és data structures

</div>

</details>

</div>

### Service Workers és PWA alapok {#service-workers-pwa}

<div class="concept-section mental-model" data-filter="javascript medior">

🧭 **Így gondolj rá**  
*Service Worker olyan, mint egy intelligens postás: háttérben dolgozik, cache-eli a leveleket (erőforrásokat), offline is működik, és push értesítéseket is kézbesít.*

</div>

<div class="concept-section why-important" data-filter="javascript medior">

💡 **Miért számít?**
- **Offline functionality**: webalkalmazás internet nélkül is használható
- **Performance boost**: cache-elt erőforrások gyors betöltése
- **Push notifications**: natív app-szerű értesítések
- **Background sync**: offline műveleteket szinkronizálja amikor visszatér a net

</div>

<div class="runnable-model" data-filter="javascript">

**Runnable mental model**
```javascript
// Progressive Web App Implementation
class PWAManager {
    constructor() {
        this.isStandalone = window.navigator.standalone || 
                           window.matchMedia('(display-mode: standalone)').matches;
        this.deferredPrompt = null;
        
        this.init();
    }
    
    async init() {
        // Check service worker support
        if ('serviceWorker' in navigator) {
            await this.registerServiceWorker();
        }
        
        // Setup install prompt
        this.setupInstallPrompt();
        
        // Setup push notifications
        if ('Notification' in window && 'PushManager' in window) {
            await this.setupPushNotifications();
        }
        
        // Setup background sync
        if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
            this.setupBackgroundSync();
        }
        
        // Check for app updates
        this.checkForUpdates();
    }
    
    async registerServiceWorker() {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js', {
                scope: '/'
            });
            
            console.log('Service Worker registered:', registration);
            
            // Handle service worker updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                console.log('New service worker installing...');
                
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        console.log('New service worker available');
                        this.showUpdateAvailableNotification();
                    }
                });
            });
            
            // Listen for service worker messages
            navigator.serviceWorker.addEventListener('message', (event) => {
                this.handleServiceWorkerMessage(event);
            });
            
            return registration;
            
        } catch (error) {
            console.error('Service Worker registration failed:', error);
        }
    }
    
    setupInstallPrompt() {
        // Listen for beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('Install prompt available');
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallButton();
        });
        
        // Listen for app installation
        window.addEventListener('appinstalled', () => {
            console.log('PWA was installed');
            this.hideInstallButton();
            this.trackInstallation();
        });
    }
    
    showInstallButton() {
        const installButton = document.createElement('button');
        installButton.id = 'install-button';
        installButton.className = 'pwa-install-button';
        installButton.innerHTML = `
            <span>📱</span>
            Alkalmazás telepítése
        `;
        
        installButton.addEventListener('click', async () => {
            await this.installApp();
        });
        
        // Add to page
        document.body.appendChild(installButton);
    }
    
    hideInstallButton() {
        const installButton = document.getElementById('install-button');
        if (installButton) {
            installButton.remove();
        }
    }
    
    async installApp() {
        if (!this.deferredPrompt) {
            console.log('Install prompt not available');
            return;
        }
        
        // Show install prompt
        this.deferredPrompt.prompt();
        
        // Wait for user choice
        const { outcome } = await this.deferredPrompt.userChoice;
        console.log(`Install prompt outcome: ${outcome}`);
        
        // Clear the deferred prompt
        this.deferredPrompt = null;
        this.hideInstallButton();
    }
    
    async setupPushNotifications() {
        // Request notification permission
        if (Notification.permission === 'default') {
            const permission = await Notification.requestPermission();
            console.log('Notification permission:', permission);
        }
        
        if (Notification.permission === 'granted') {
            await this.subscribeToPush();
        }
    }
    
    async subscribeToPush() {
        try {
            const registration = await navigator.serviceWorker.ready;
            
            // Check if already subscribed
            let subscription = await registration.pushManager.getSubscription();
            
            if (!subscription) {
                // Subscribe to push notifications
                subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: this.urlBase64ToUint8Array('YOUR_VAPID_PUBLIC_KEY')
                });
                
                console.log('Push subscription created:', subscription);
                
                // Send subscription to server
                await this.sendSubscriptionToServer(subscription);
            }
            
            return subscription;
            
        } catch (error) {
            console.error('Push subscription failed:', error);
        }
    }
    
    async sendSubscriptionToServer(subscription) {
        try {
            const response = await fetch('/api/push-subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(subscription)
            });
            
            if (!response.ok) {
                throw new Error('Failed to send subscription to server');
            }
            
            console.log('Subscription sent to server');
            
        } catch (error) {
            console.error('Failed to send subscription:', error);
        }
    }
    
    setupBackgroundSync() {
        // Register background sync when coming back online
        window.addEventListener('online', () => {
            console.log('Back online, registering background sync');
            this.registerBackgroundSync('background-sync');
        });
        
        // Setup form submission with background sync
        this.setupOfflineFormSubmission();
    }
    
    async registerBackgroundSync(tag) {
        try {
            const registration = await navigator.serviceWorker.ready;
            await registration.sync.register(tag);
            console.log(`Background sync registered: ${tag}`);
        } catch (error) {
            console.error('Background sync registration failed:', error);
        }
    }
    
    setupOfflineFormSubmission() {
        document.addEventListener('submit', async (event) => {
            if (event.target.matches('.sync-form')) {
                event.preventDefault();
                
                const formData = new FormData(event.target);
                const data = Object.fromEntries(formData.entries());
                
                // Store data for background sync
                await this.storeForBackgroundSync(data);
                
                // Register sync
                await this.registerBackgroundSync('form-submission');
                
                this.showOfflineMessage('Adatok mentve, szinkronizálás amikor visszatér az internet');
            }
        });
    }
    
    async storeForBackgroundSync(data) {
        // Store in IndexedDB for background sync
        const request = indexedDB.open('PWAOfflineDB', 1);
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('pendingSubmissions')) {
                db.createObjectStore('pendingSubmissions', { keyPath: 'id', autoIncrement: true });
            }
        };
        
        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(['pendingSubmissions'], 'readwrite');
            const store = transaction.objectStore('pendingSubmissions');
            
            store.add({
                data: data,
                timestamp: Date.now(),
                synced: false
            });
        };
    }
    
    handleServiceWorkerMessage(event) {
        const { type, payload } = event.data;
        
        switch (type) {
            case 'CACHE_UPDATED':
                console.log('Cache updated:', payload);
                break;
                
            case 'BACKGROUND_SYNC_SUCCESS':
                console.log('Background sync completed:', payload);
                this.showSyncSuccessMessage();
                break;
                
            case 'BACKGROUND_SYNC_FAILED':
                console.error('Background sync failed:', payload);
                break;
                
            case 'PUSH_RECEIVED':
                console.log('Push notification received:', payload);
                break;
        }
    }
    
    checkForUpdates() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then((registration) => {
                // Check for updates every 60 seconds
                setInterval(() => {
                    registration.update();
                }, 60000);
            });
        }
    }
    
    showUpdateAvailableNotification() {
        const notification = document.createElement('div');
        notification.className = 'update-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span>Új verzió elérhető!</span>
                <button onclick="window.location.reload()">Frissítés</button>
                <button onclick="this.parentElement.parentElement.remove()">Később</button>
            </div>
        `;
        
        document.body.appendChild(notification);
    }
    
    showOfflineMessage(message) {
        const toast = document.createElement('div');
        toast.className = 'offline-toast';
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 5000);
    }
    
    showSyncSuccessMessage() {
        const toast = document.createElement('div');
        toast.className = 'sync-success-toast';
        toast.textContent = 'Offline adatok szinkronizálva!';
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
    
    trackInstallation() {
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'pwa_install', {
                event_category: 'PWA',
                event_label: 'App Installed'
            });
        }
    }
    
    urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');
        
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        
        return outputArray;
    }
}

// Service Worker Script (sw.js)
const serviceWorkerScript = `
// Service Worker - separate file (sw.js)
const CACHE_NAME = 'pwa-cache-v1';
const OFFLINE_URL = '/offline.html';

const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles/main.css',
    '/scripts/app.js',
    '/offline.html',
    '/manifest.json'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('Service worker installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                // Force activation of new service worker
                return self.skipWaiting();
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service worker activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((cacheName) => cacheName !== CACHE_NAME)
                        .map((cacheName) => {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        })
                );
            })
            .then(() => {
                // Take control of all pages
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
    // Only handle GET requests
    if (event.request.method !== 'GET') {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Return cached version if available
                if (cachedResponse) {
                    console.log('Serving from cache:', event.request.url);
                    return cachedResponse;
                }
                
                // Otherwise fetch from network
                return fetch(event.request)
                    .then((response) => {
                        // Don't cache non-successful responses
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clone response for caching
                        const responseToCache = response.clone();
                        
                        // Cache the response
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(() => {
                        // Network failed, serve offline page for navigation requests
                        if (event.request.mode === 'navigate') {
                            return caches.match(OFFLINE_URL);
                        }
                        
                        // For other requests, return a basic response
                        return new Response('Offline content not available', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
                    });
            })
    );
});

// Background sync
self.addEventListener('sync', (event) => {
    console.log('Background sync triggered:', event.tag);
    
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    } else if (event.tag === 'form-submission') {
        event.waitUntil(syncFormSubmissions());
    }
});

async function doBackgroundSync() {
    try {
        // Perform background tasks
        console.log('Performing background sync...');
        
        // Notify main thread
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
            client.postMessage({
                type: 'BACKGROUND_SYNC_SUCCESS',
                payload: { timestamp: Date.now() }
            });
        });
        
    } catch (error) {
        console.error('Background sync failed:', error);
        
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
            client.postMessage({
                type: 'BACKGROUND_SYNC_FAILED',
                payload: { error: error.message }
            });
        });
    }
}

async function syncFormSubmissions() {
    // Implementation would sync pending form submissions
    console.log('Syncing form submissions...');
}

// Push notification
self.addEventListener('push', (event) => {
    console.log('Push notification received');
    
    const options = {
        body: event.data ? event.data.text() : 'Default message',
        icon: '/icon-192x192.png',
        badge: '/badge-72x72.png',
        tag: 'notification-tag',
        requireInteraction: true,
        actions: [
            {
                action: 'open',
                title: 'Megnyitás'
            },
            {
                action: 'close',
                title: 'Bezárás'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('PWA Notification', options)
    );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
    console.log('Notification clicked:', event.action);
    
    event.notification.close();
    
    if (event.action === 'open') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});
`;

// PWA Manifest Generator
class PWAManifestGenerator {
    static generate(config) {
        const manifest = {
            name: config.name || 'My PWA',
            short_name: config.shortName || 'PWA',
            description: config.description || 'A Progressive Web App',
            start_url: config.startUrl || '/',
            display: config.display || 'standalone',
            background_color: config.backgroundColor || '#ffffff',
            theme_color: config.themeColor || '#000000',
            orientation: config.orientation || 'portrait',
            scope: config.scope || '/',
            icons: config.icons || [
                {
                    src: '/icon-192x192.png',
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                    src: '/icon-512x512.png',
                    sizes: '512x512',
                    type: 'image/png'
                }
            ],
            categories: config.categories || ['productivity'],
            screenshots: config.screenshots || [],
            shortcuts: config.shortcuts || []
        };
        
        return JSON.stringify(manifest, null, 2);
    }
    
    static injectManifestLink() {
        const link = document.createElement('link');
        link.rel = 'manifest';
        link.href = '/manifest.json';
        document.head.appendChild(link);
    }
}

// Offline Detection and UI
class OfflineManager {
    constructor() {
        this.isOnline = navigator.onLine;
        this.init();
    }
    
    init() {
        window.addEventListener('online', () => {
            this.handleOnline();
        });
        
        window.addEventListener('offline', () => {
            this.handleOffline();
        });
        
        // Initial state
        if (!this.isOnline) {
            this.handleOffline();
        }
    }
    
    handleOnline() {
        this.isOnline = true;
        console.log('App is online');
        this.showOnlineIndicator();
        this.syncPendingData();
    }
    
    handleOffline() {
        this.isOnline = false;
        console.log('App is offline');
        this.showOfflineIndicator();
    }
    
    showOnlineIndicator() {
        this.removeIndicators();
        
        const indicator = document.createElement('div');
        indicator.className = 'network-indicator online';
        indicator.textContent = '✅ Online';
        document.body.appendChild(indicator);
        
        setTimeout(() => {
            indicator.remove();
        }, 3000);
    }
    
    showOfflineIndicator() {
        this.removeIndicators();
        
        const indicator = document.createElement('div');
        indicator.className = 'network-indicator offline';
        indicator.textContent = '⚠️ Offline - Limited functionality';
        document.body.appendChild(indicator);
    }
    
    removeIndicators() {
        document.querySelectorAll('.network-indicator').forEach(el => el.remove());
    }
    
    async syncPendingData() {
        // Trigger background sync when coming back online
        if ('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.ready;
            if ('sync' in registration) {
                await registration.sync.register('background-sync');
            }
        }
    }
}

// Initialize PWA
document.addEventListener('DOMContentLoaded', () => {
    const pwaManager = new PWAManager();
    const offlineManager = new OfflineManager();
    
    // Generate and inject manifest
    PWAManifestGenerator.injectManifestLink();
    
    console.log('PWA initialized');
});

// Usage in HTML
const htmlExample = \`
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My PWA</title>
    
    <!-- PWA Meta Tags -->
    <meta name="theme-color" content="#000000">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    
    <!-- Icons -->
    <link rel="icon" href="/favicon.ico">
    <link rel="apple-touch-icon" href="/icon-192x192.png">
    
    <!-- Manifest will be injected by JavaScript -->
</head>
<body>
    <h1>Progressive Web App</h1>
    
    <form class="sync-form">
        <input type="text" name="message" placeholder="Message (works offline)">
        <button type="submit">Send</button>
    </form>
    
    <script src="/js/pwa-manager.js"></script>
</body>
</html>
\`;

console.log('PWA HTML example:', htmlExample);
```
*Figyeld meg: Service worker lifecycle, caching strategies, offline functionality, push notifications.*

</div>

<div class="concept-section myths" data-filter="javascript">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „PWA-t csak mobil eszközökre lehet telepíteni." → Desktop böngészők is támogatják a PWA telepítést
- „Service Worker automatikusan cache-el mindent." → Explicit cache strategy és asset specification szükséges
- „PWA helyettesíti a natív app-okat." → Kiegészíti őket, de platformspecifikus funkciókhoz natív app jobb

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="javascript">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Service Worker lifecycle:**
```javascript
// 1. Install - cache static assets
self.addEventListener('install', event => {
    event.waitUntil(/* cache assets */);
});

// 2. Activate - cleanup old caches  
self.addEventListener('activate', event => {
    event.waitUntil(/* cleanup */);
});

// 3. Fetch - intercept network requests
self.addEventListener('fetch', event => {
    event.respondWith(/* serve from cache or network */);
});
```

**PWA Manifest basics:**
```json
{
  "name": "My PWA",
  "short_name": "PWA", 
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [{"src": "/icon.png", "sizes": "192x192"}]
}
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="javascript medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mi a különbség Service Worker és Web Worker között?**
A: Service Worker proxy a hálózati kérések között, Web Worker background computation-re. SW persistent, WW page-specific.

**Q: Hogyan implementálnál offline-first stratégiát?**
A: Cache-first strategy, fallback mechanisms, background sync, IndexedDB offline storage, network-first kritikus adatokhoz.

**Q: Mik a PWA telepítés kritériumai?**
A: HTTPS, manifest.json, service worker, valid icons, start_url, display mode.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="javascript">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Cache-Control** → HTTP caching strategies és browser cache
- **IndexedDB** → Client-side database offline adattároláshoz
- **Push API** → Server-initiated notifications
- **Fetch API** → Network request interception
- **Web App Manifest** → App metadata és installation

</div>

</details>

</div>

### Shadow DOM & Web Components {#shadow-dom-web-components}

<div class="concept-section mental-model" data-filter="javascript medior">

🧭 **Így gondolj rá**  
*Shadow DOM olyan, mint egy VIP szoba egy klubban: saját stílusa van, kívülről nem látszik be, belülről nem látszik ki, de kommunikálhat a külvilággal controllereken keresztül.*

</div>

<div class="concept-section why-important" data-filter="javascript medior">

💡 **Miért számít?**
- **Encapsulation**: CSS és DOM izolálása, style bleeding megelőzése
- **Reusability**: újrafelhasználható UI komponensek készítése
- **Modularity**: komponens-alapú architektúra natív browser támogatással
- **Framework independence**: vanilla JavaScript-ben is modern UI komponensek

</div>

<div class="runnable-model" data-filter="javascript">

**Runnable mental model**
```javascript
// Web Components Implementation
class ModernButton extends HTMLElement {
    constructor() {
        super();
        
        // Create shadow DOM
        this.attachShadow({ mode: 'open' });
        
        // Component state
        this.state = {
            loading: false,
            disabled: false,
            variant: 'primary'
        };
        
        // Bind methods
        this.handleClick = this.handleClick.bind(this);
        
        this.render();
        this.addEventListeners();
    }
    
    // Observed attributes - triggers attributeChangedCallback
    static get observedAttributes() {
        return ['variant', 'disabled', 'loading', 'size'];
    }
    
    // Called when observed attributes change
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.state[name] = newValue;
            this.render();
        }
    }
    
    // Called when element is added to DOM
    connectedCallback() {
        console.log('ModernButton connected to DOM');
        this.render();
    }
    
    // Called when element is removed from DOM
    disconnectedCallback() {
        console.log('ModernButton disconnected from DOM');
        this.removeEventListeners();
    }
    
    render() {
        const variant = this.getAttribute('variant') || 'primary';
        const size = this.getAttribute('size') || 'medium';
        const disabled = this.hasAttribute('disabled');
        const loading = this.hasAttribute('loading');
        
        this.shadowRoot.innerHTML = \`
            <style>
                :host {
                    display: inline-block;
                    --primary-color: #007bff;
                    --secondary-color: #6c757d;
                    --success-color: #28a745;
                    --danger-color: #dc3545;
                }
                
                :host([hidden]) {
                    display: none;
                }
                
                .button {
                    font-family: inherit;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    font-weight: 500;
                    text-decoration: none;
                }
                
                .button:focus {
                    outline: 2px solid var(--primary-color);
                    outline-offset: 2px;
                }
                
                /* Variants */
                .button.primary {
                    background-color: var(--primary-color);
                    color: white;
                }
                
                .button.primary:hover:not(:disabled) {
                    background-color: #0056b3;
                }
                
                .button.secondary {
                    background-color: var(--secondary-color);
                    color: white;
                }
                
                .button.secondary:hover:not(:disabled) {
                    background-color: #545b62;
                }
                
                .button.success {
                    background-color: var(--success-color);
                    color: white;
                }
                
                .button.danger {
                    background-color: var(--danger-color);
                    color: white;
                }
                
                .button.outline {
                    background-color: transparent;
                    border: 2px solid var(--primary-color);
                    color: var(--primary-color);
                }
                
                .button.outline:hover:not(:disabled) {
                    background-color: var(--primary-color);
                    color: white;
                }
                
                /* Sizes */
                .button.small {
                    padding: 0.375rem 0.75rem;
                    font-size: 0.875rem;
                }
                
                .button.medium {
                    padding: 0.5rem 1rem;
                    font-size: 1rem;
                }
                
                .button.large {
                    padding: 0.75rem 1.5rem;
                    font-size: 1.125rem;
                }
                
                /* States */
                .button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                
                .button.loading {
                    position: relative;
                    color: transparent;
                }
                
                .spinner {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 1rem;
                    height: 1rem;
                    border: 2px solid transparent;
                    border-top: 2px solid currentColor;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                
                @keyframes spin {
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
                
                .icon {
                    width: 1em;
                    height: 1em;
                    fill: currentColor;
                }
            </style>
            
            <button 
                class="button \${variant} \${size} \${loading ? 'loading' : ''}"
                \${disabled ? 'disabled' : ''}
                type="button"
            >
                \${loading ? '<div class="spinner"></div>' : ''}
                <slot name="icon"></slot>
                <slot></slot>
            </button>
        \`;
    }
    
    addEventListeners() {
        const button = this.shadowRoot.querySelector('.button');
        button.addEventListener('click', this.handleClick);
    }
    
    removeEventListeners() {
        const button = this.shadowRoot.querySelector('.button');
        if (button) {
            button.removeEventListener('click', this.handleClick);
        }
    }
    
    handleClick(event) {
        if (this.hasAttribute('disabled') || this.hasAttribute('loading')) {
            event.preventDefault();
            return;
        }
        
        // Emit custom event
        this.dispatchEvent(new CustomEvent('modern-click', {
            detail: { 
                timestamp: Date.now(),
                variant: this.getAttribute('variant')
            },
            bubbles: true
        }));
    }
    
    // Public API methods
    setLoading(loading) {
        if (loading) {
            this.setAttribute('loading', '');
        } else {
            this.removeAttribute('loading');
        }
    }
    
    setDisabled(disabled) {
        if (disabled) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
    }
}

// Complex Web Component - Card Component
class ModernCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }
    
    static get observedAttributes() {
        return ['elevation', 'variant', 'interactive'];
    }
    
    attributeChangedCallback() {
        this.render();
    }
    
    render() {
        const elevation = this.getAttribute('elevation') || '1';
        const variant = this.getAttribute('variant') || 'default';
        const interactive = this.hasAttribute('interactive');
        
        this.shadowRoot.innerHTML = \`
            <style>
                :host {
                    display: block;
                    --card-bg: #ffffff;
                    --card-border: #e0e0e0;
                    --card-shadow-1: 0 2px 4px rgba(0,0,0,0.1);
                    --card-shadow-2: 0 4px 8px rgba(0,0,0,0.15);
                    --card-shadow-3: 0 8px 16px rgba(0,0,0,0.2);
                }
                
                .card {
                    background: var(--card-bg);
                    border-radius: 8px;
                    border: 1px solid var(--card-border);
                    overflow: hidden;
                    transition: all 0.2s ease;
                }
                
                .card.elevation-1 { box-shadow: var(--card-shadow-1); }
                .card.elevation-2 { box-shadow: var(--card-shadow-2); }
                .card.elevation-3 { box-shadow: var(--card-shadow-3); }
                
                .card.interactive {
                    cursor: pointer;
                }
                
                .card.interactive:hover {
                    transform: translateY(-2px);
                    box-shadow: var(--card-shadow-3);
                }
                
                .card.variant-primary {
                    border-color: var(--primary-color, #007bff);
                }
                
                .card.variant-success {
                    border-color: var(--success-color, #28a745);
                }
                
                .card-header {
                    padding: 1rem;
                    border-bottom: 1px solid var(--card-border);
                    background: rgba(0,0,0,0.02);
                }
                
                .card-body {
                    padding: 1rem;
                }
                
                .card-footer {
                    padding: 0.75rem 1rem;
                    border-top: 1px solid var(--card-border);
                    background: rgba(0,0,0,0.02);
                }
                
                ::slotted([slot="header"]) {
                    margin: 0;
                    font-size: 1.25rem;
                    font-weight: 600;
                }
                
                ::slotted([slot="footer"]) {
                    margin: 0;
                    display: flex;
                    gap: 0.5rem;
                    align-items: center;
                }
            </style>
            
            <div class="card elevation-\${elevation} variant-\${variant} \${interactive ? 'interactive' : ''}">
                <div class="card-header" style="display: none;">
                    <slot name="header"></slot>
                </div>
                
                <div class="card-body">
                    <slot></slot>
                </div>
                
                <div class="card-footer" style="display: none;">
                    <slot name="footer"></slot>
                </div>
            </div>
        \`;
        
        // Show/hide sections based on slotted content
        this.updateSectionVisibility();
    }
    
    connectedCallback() {
        // Listen for slot changes
        this.shadowRoot.addEventListener('slotchange', () => {
            this.updateSectionVisibility();
        });
        
        // Handle interactive clicks
        if (this.hasAttribute('interactive')) {
            this.addEventListener('click', this.handleCardClick);
        }
    }
    
    updateSectionVisibility() {
        const headerSlot = this.shadowRoot.querySelector('slot[name="header"]');
        const footerSlot = this.shadowRoot.querySelector('slot[name="footer"]');
        const headerSection = this.shadowRoot.querySelector('.card-header');
        const footerSection = this.shadowRoot.querySelector('.card-footer');
        
        // Show header if has content
        const hasHeaderContent = headerSlot.assignedNodes().length > 0;
        headerSection.style.display = hasHeaderContent ? 'block' : 'none';
        
        // Show footer if has content
        const hasFooterContent = footerSlot.assignedNodes().length > 0;
        footerSection.style.display = hasFooterContent ? 'block' : 'none';
    }
    
    handleCardClick() {
        this.dispatchEvent(new CustomEvent('card-click', {
            detail: { timestamp: Date.now() },
            bubbles: true
        }));
    }
}

// Form Component with Validation
class ModernForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.formData = new Map();
        this.validators = new Map();
        this.render();
    }
    
    render() {
        this.shadowRoot.innerHTML = \`
            <style>
                :host {
                    display: block;
                }
                
                .form {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                
                ::slotted(modern-input) {
                    width: 100%;
                }
                
                .form-actions {
                    display: flex;
                    gap: 0.5rem;
                    justify-content: flex-end;
                    margin-top: 1rem;
                }
            </style>
            
            <form class="form">
                <slot></slot>
                <div class="form-actions">
                    <slot name="actions"></slot>
                </div>
            </form>
        \`;
    }
    
    connectedCallback() {
        // Listen for form submission
        const form = this.shadowRoot.querySelector('form');
        form.addEventListener('submit', this.handleSubmit.bind(this));
        
        // Listen for custom validation events from child components
        this.addEventListener('field-change', this.handleFieldChange.bind(this));
    }
    
    handleSubmit(event) {
        event.preventDefault();
        
        if (this.validateForm()) {
            const formData = Object.fromEntries(this.formData);
            this.dispatchEvent(new CustomEvent('form-submit', {
                detail: { data: formData },
                bubbles: true
            }));
        }
    }
    
    handleFieldChange(event) {
        const { name, value, valid } = event.detail;
        this.formData.set(name, value);
        
        // Update form validity
        this.updateFormValidity();
    }
    
    validateForm() {
        let isValid = true;
        
        // Validate all child form components
        this.querySelectorAll('[name]').forEach(element => {
            if (element.validate && !element.validate()) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    updateFormValidity() {
        const isValid = this.validateForm();
        this.dispatchEvent(new CustomEvent('form-validity-change', {
            detail: { valid: isValid },
            bubbles: false
        }));
    }
}

// Input Component
class ModernInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.value = '';
        this.valid = true;
        this.render();
    }
    
    static get observedAttributes() {
        return ['label', 'placeholder', 'type', 'required', 'pattern'];
    }
    
    attributeChangedCallback() {
        this.render();
    }
    
    render() {
        const label = this.getAttribute('label') || '';
        const placeholder = this.getAttribute('placeholder') || '';
        const type = this.getAttribute('type') || 'text';
        const required = this.hasAttribute('required');
        const pattern = this.getAttribute('pattern') || '';
        
        this.shadowRoot.innerHTML = \`
            <style>
                :host {
                    display: block;
                }
                
                .input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }
                
                .label {
                    font-weight: 500;
                    color: #333;
                    font-size: 0.875rem;
                }
                
                .label.required::after {
                    content: ' *';
                    color: #dc3545;
                }
                
                .input {
                    padding: 0.5rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 1rem;
                    transition: border-color 0.2s ease;
                }
                
                .input:focus {
                    outline: none;
                    border-color: var(--primary-color, #007bff);
                    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
                }
                
                .input.invalid {
                    border-color: #dc3545;
                }
                
                .error-message {
                    color: #dc3545;
                    font-size: 0.75rem;
                    margin-top: 0.25rem;
                    display: none;
                }
                
                .error-message.show {
                    display: block;
                }
            </style>
            
            <div class="input-group">
                \${label ? \`<label class="label \${required ? 'required' : ''}">\${label}</label>\` : ''}
                <input 
                    class="input" 
                    type="\${type}"
                    placeholder="\${placeholder}"
                    \${pattern ? \`pattern="\${pattern}"\` : ''}
                    \${required ? 'required' : ''}
                >
                <div class="error-message" role="alert"></div>
            </div>
        \`;
        
        this.bindEvents();
    }
    
    bindEvents() {
        const input = this.shadowRoot.querySelector('.input');
        const errorMessage = this.shadowRoot.querySelector('.error-message');
        
        input.addEventListener('input', (event) => {
            this.value = event.target.value;
            this.validate();
            this.dispatchFieldChange();
        });
        
        input.addEventListener('blur', () => {
            this.validate();
        });
    }
    
    validate() {
        const input = this.shadowRoot.querySelector('.input');
        const errorMessage = this.shadowRoot.querySelector('.error-message');
        
        this.valid = input.checkValidity();
        
        if (!this.valid) {
            input.classList.add('invalid');
            errorMessage.textContent = input.validationMessage;
            errorMessage.classList.add('show');
        } else {
            input.classList.remove('invalid');
            errorMessage.classList.remove('show');
        }
        
        return this.valid;
    }
    
    dispatchFieldChange() {
        this.dispatchEvent(new CustomEvent('field-change', {
            detail: {
                name: this.getAttribute('name'),
                value: this.value,
                valid: this.valid
            },
            bubbles: true
        }));
    }
}

// Register Web Components
customElements.define('modern-button', ModernButton);
customElements.define('modern-card', ModernCard);
customElements.define('modern-form', ModernForm);
customElements.define('modern-input', ModernInput);

// Usage Examples and Testing
class WebComponentsDemo {
    constructor() {
        this.createDemoHTML();
        this.bindEventListeners();
    }
    
    createDemoHTML() {
        const demoContainer = document.createElement('div');
        demoContainer.className = 'web-components-demo';
        demoContainer.innerHTML = \`
            <h2>Web Components Demo</h2>
            
            <!-- Button Examples -->
            <section class="demo-section">
                <h3>Modern Buttons</h3>
                <div class="button-group">
                    <modern-button variant="primary">Primary Button</modern-button>
                    <modern-button variant="secondary">Secondary</modern-button>
                    <modern-button variant="success">Success</modern-button>
                    <modern-button variant="danger">Danger</modern-button>
                    <modern-button variant="outline">Outline</modern-button>
                </div>
                
                <div class="button-group">
                    <modern-button size="small">Small</modern-button>
                    <modern-button size="medium">Medium</modern-button>
                    <modern-button size="large">Large</modern-button>
                </div>
                
                <div class="button-group">
                    <modern-button loading>Loading...</modern-button>
                    <modern-button disabled>Disabled</modern-button>
                </div>
            </section>
            
            <!-- Card Examples -->
            <section class="demo-section">
                <h3>Modern Cards</h3>
                <div class="cards-grid">
                    <modern-card elevation="1">
                        <h4 slot="header">Simple Card</h4>
                        <p>This is a basic card with header and content.</p>
                        <div slot="footer">
                            <modern-button size="small">Action</modern-button>
                        </div>
                    </modern-card>
                    
                    <modern-card elevation="2" variant="primary">
                        <h4 slot="header">Primary Card</h4>
                        <p>This card has a primary variant with elevation 2.</p>
                    </modern-card>
                    
                    <modern-card elevation="3" interactive>
                        <h4 slot="header">Interactive Card</h4>
                        <p>Click me! This card is interactive.</p>
                    </modern-card>
                </div>
            </section>
            
            <!-- Form Example -->
            <section class="demo-section">
                <h3>Modern Form</h3>
                <modern-card>
                    <h4 slot="header">User Registration</h4>
                    <modern-form id="demo-form">
                        <modern-input 
                            name="username" 
                            label="Username" 
                            placeholder="Enter username"
                            required
                            pattern="[a-zA-Z0-9]{3,20}"
                        ></modern-input>
                        
                        <modern-input 
                            name="email" 
                            label="Email" 
                            type="email"
                            placeholder="Enter email"
                            required
                        ></modern-input>
                        
                        <modern-input 
                            name="password" 
                            label="Password" 
                            type="password"
                            placeholder="Enter password"
                            required
                            pattern=".{8,}"
                        ></modern-input>
                        
                        <div slot="actions">
                            <modern-button type="button" variant="secondary">Cancel</modern-button>
                            <modern-button type="submit" variant="primary">Register</modern-button>
                        </div>
                    </modern-form>
                </modern-card>
            </section>
        \`;
        
        document.body.appendChild(demoContainer);
    }
    
    bindEventListeners() {
        // Button click events
        document.addEventListener('modern-click', (event) => {
            console.log('Button clicked:', event.detail);
        });
        
        // Card click events
        document.addEventListener('card-click', (event) => {
            console.log('Card clicked:', event.detail);
        });
        
        // Form submission
        document.addEventListener('form-submit', (event) => {
            console.log('Form submitted:', event.detail.data);
            alert('Form submitted! Check console for data.');
        });
        
        // Field changes
        document.addEventListener('field-change', (event) => {
            console.log('Field changed:', event.detail);
        });
    }
}

// Component Lifecycle Manager
class ComponentLifecycleManager {
    constructor() {
        this.components = new Map();
        this.observeComponentChanges();
    }
    
    observeComponentChanges() {
        // Use MutationObserver to track component lifecycle
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE && node.tagName.startsWith('MODERN-')) {
                        this.onComponentAdded(node);
                    }
                });
                
                mutation.removedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE && node.tagName.startsWith('MODERN-')) {
                        this.onComponentRemoved(node);
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    onComponentAdded(component) {
        const id = this.generateComponentId();
        this.components.set(id, {
            element: component,
            createdAt: Date.now(),
            tagName: component.tagName
        });
        
        console.log(\`Component added: \${component.tagName} (ID: \${id})\`);
    }
    
    onComponentRemoved(component) {
        // Find and remove component from tracking
        for (const [id, data] of this.components.entries()) {
            if (data.element === component) {
                console.log(\`Component removed: \${component.tagName} (ID: \${id})\`);
                this.components.delete(id);
                break;
            }
        }
    }
    
    generateComponentId() {
        return \`comp_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`;
    }
    
    getComponentStats() {
        const stats = {};
        
        for (const [id, data] of this.components.entries()) {
            const tagName = data.tagName;
            if (!stats[tagName]) {
                stats[tagName] = 0;
            }
            stats[tagName]++;
        }
        
        return stats;
    }
}

// Initialize Demo
document.addEventListener('DOMContentLoaded', () => {
    new WebComponentsDemo();
    new ComponentLifecycleManager();
    
    console.log('Web Components demo initialized');
});

// CSS for demo styling
const demoStyles = \`
<style>
.web-components-demo {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.demo-section {
    margin-bottom: 3rem;
    padding: 2rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
}

.button-group {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
}

.cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 1rem;
}
</style>
\`;

document.head.insertAdjacentHTML('beforeend', demoStyles);
```
*Figyeld meg: Shadow DOM encapsulation, custom elements, slots, lifecycle callbacks.*

</div>

<div class="concept-section myths" data-filter="javascript">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Shadow DOM teljesen izolált." → CSS custom properties és events átmehetnek a boundary-n
- „Web Components helyettesítik a React/Vue-t." → Kiegészítik őket, de framework-ök magasabb szintű abstrakciót nyújtanak
- „Shadow DOM = Virtual DOM." → Teljesen különböző technológiák: Shadow DOM natív encapsulation, Virtual DOM diffing algoritmus

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="javascript">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Web Components alapjai:**
```javascript
// 1. Custom Element definition
class MyComponent extends HTMLElement {
    constructor() { super(); }
    connectedCallback() { /* DOM-ba került */ }
    disconnectedCallback() { /* DOM-ból eltávolítva */ }
}

// 2. Shadow DOM attachment  
this.attachShadow({ mode: 'open' });
this.shadowRoot.innerHTML = '<style>...</style><div>...</div>';

// 3. Component registration
customElements.define('my-component', MyComponent);
```

**Shadow DOM modes:**
```javascript
// open: külső JavaScript hozzáférhet
element.attachShadow({ mode: 'open' });

// closed: teljesen izolált (nem ajánlott)  
element.attachShadow({ mode: 'closed' });
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="javascript medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mikor használnál Web Components-et framework helyett?**
A: Design system komponensekhez, framework-agnostic library-khoz, legacy alkalmazások modernizálásához.

**Q: Mi a különbség open és closed shadow DOM között?**
A: Open: element.shadowRoot-tal hozzáférhető, closed: teljesen izolált, nem hozzáférhető kívülről.

**Q: Hogyan kommunikálnak a Web Components egymással?**
A: Custom events, attributes, properties, slots, vagy global state management pattern-ekkel.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="javascript">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **DOM** → Shadow DOM mint DOM rész encapsulation-nel
- **CSS** → Scoped styles és CSS custom properties
- **Event System** → Custom events és event bubbling
- **Module System** → Component-based architecture
- **Framework Integration** → React/Vue/Angular Web Components support

</div>

</details>

</div>

### CSS Variables és theming {#css-variables-theming}

<div class="concept-section mental-model" data-filter="css medior">

🧭 **Így gondolj rá**  
*CSS Variables olyan, mint a programozásban a konstansok: egyszer definiálod a színeket/méreteket, bárhol használhatod, és egy helyen megváltoztatva mindenhol frissül.*

</div>

<div class="concept-section why-important" data-filter="css medior">

💡 **Miért számít?**
- **Dynamic theming**: runtime témacserék JavaScript segítségével
- **Maintainability**: egy helyen változtatva mindenhol frissül
- **Design systems**: konzisztens spacing, colors, typography
- **User personalization**: dark/light mode, accessibility beállítások

</div>

<div class="runnable-model" data-filter="css">

**Runnable mental model**
```css
/* CSS Variables (Custom Properties) - Root level definitions */
:root {
  /* Color System */
  --color-primary: #007bff;
  --color-primary-dark: #0056b3;
  --color-primary-light: #66b3ff;
  
  --color-secondary: #6c757d;
  --color-success: #28a745;
  --color-warning: #ffc107;
  --color-danger: #dc3545;
  --color-info: #17a2b8;
  
  /* Neutral Colors */
  --color-white: #ffffff;
  --color-gray-100: #f8f9fa;
  --color-gray-200: #e9ecef;
  --color-gray-300: #dee2e6;
  --color-gray-400: #ced4da;
  --color-gray-500: #adb5bd;
  --color-gray-600: #6c757d;
  --color-gray-700: #495057;
  --color-gray-800: #343a40;
  --color-gray-900: #212529;
  --color-black: #000000;
  
  /* Typography */
  --font-family-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
  --font-family-mono: 'SF Mono', Monaco, Inconsolata, 'Roboto Mono', monospace;
  
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
  
  /* Spacing System */
  --spacing-0: 0;
  --spacing-1: 0.25rem;   /* 4px */
  --spacing-2: 0.5rem;    /* 8px */
  --spacing-3: 0.75rem;   /* 12px */
  --spacing-4: 1rem;      /* 16px */
  --spacing-5: 1.25rem;   /* 20px */
  --spacing-6: 1.5rem;    /* 24px */
  --spacing-8: 2rem;      /* 32px */
  --spacing-10: 2.5rem;   /* 40px */
  --spacing-12: 3rem;     /* 48px */
  --spacing-16: 4rem;     /* 64px */
  --spacing-20: 5rem;     /* 80px */
  
  /* Border Radius */
  --border-radius-none: 0;
  --border-radius-sm: 0.125rem;  /* 2px */
  --border-radius-base: 0.25rem; /* 4px */
  --border-radius-md: 0.375rem;  /* 6px */
  --border-radius-lg: 0.5rem;    /* 8px */
  --border-radius-xl: 0.75rem;   /* 12px */
  --border-radius-2xl: 1rem;     /* 16px */
  --border-radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
  --transition-slow: 500ms ease;
  
  /* Z-Index Scale */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
  
  /* Breakpoints (for use in calc() functions) */
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  
  /* Light Theme (default) */
  --theme-bg-primary: var(--color-white);
  --theme-bg-secondary: var(--color-gray-100);
  --theme-bg-tertiary: var(--color-gray-200);
  
  --theme-text-primary: var(--color-gray-900);
  --theme-text-secondary: var(--color-gray-700);
  --theme-text-muted: var(--color-gray-500);
  
  --theme-border-primary: var(--color-gray-300);
  --theme-border-secondary: var(--color-gray-200);
  
  /* Interactive States */
  --theme-interactive-hover: var(--color-gray-100);
  --theme-interactive-active: var(--color-gray-200);
  --theme-interactive-focus: var(--color-primary);
}

/* Dark Theme */
[data-theme="dark"] {
  --theme-bg-primary: var(--color-gray-900);
  --theme-bg-secondary: var(--color-gray-800);
  --theme-bg-tertiary: var(--color-gray-700);
  
  --theme-text-primary: var(--color-gray-100);
  --theme-text-secondary: var(--color-gray-300);
  --theme-text-muted: var(--color-gray-500);
  
  --theme-border-primary: var(--color-gray-600);
  --theme-border-secondary: var(--color-gray-700);
  
  --theme-interactive-hover: var(--color-gray-800);
  --theme-interactive-active: var(--color-gray-700);
  --theme-interactive-focus: var(--color-primary-light);
}

/* High Contrast Theme */
[data-theme="high-contrast"] {
  --theme-bg-primary: var(--color-white);
  --theme-bg-secondary: var(--color-white);
  --theme-bg-tertiary: var(--color-black);
  
  --theme-text-primary: var(--color-black);
  --theme-text-secondary: var(--color-black);
  --theme-text-muted: var(--color-gray-800);
  
  --theme-border-primary: var(--color-black);
  --theme-border-secondary: var(--color-black);
  
  --theme-interactive-hover: var(--color-gray-200);
  --theme-interactive-active: var(--color-gray-300);
  --theme-interactive-focus: var(--color-black);
  
  /* Override shadows for high contrast */
  --shadow-base: 0 0 0 2px var(--color-black);
  --shadow-md: 0 0 0 3px var(--color-black);
}

/* Component Styles Using Variables */
.btn {
  /* Base button using design tokens */
  padding: var(--spacing-2) var(--spacing-4);
  border: 1px solid transparent;
  border-radius: var(--border-radius-base);
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  text-decoration: none;
}

.btn:focus {
  outline: 2px solid var(--theme-interactive-focus);
  outline-offset: 2px;
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-white);
  border-color: var(--color-primary);
}

.btn-primary:hover {
  background-color: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
}

.btn-secondary {
  background-color: transparent;
  color: var(--theme-text-primary);
  border-color: var(--theme-border-primary);
}

.btn-secondary:hover {
  background-color: var(--theme-interactive-hover);
}

/* Card component with theming */
.card {
  background-color: var(--theme-bg-primary);
  border: 1px solid var(--theme-border-primary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-base);
  padding: var(--spacing-6);
  margin-bottom: var(--spacing-4);
  transition: box-shadow var(--transition-base);
}

.card:hover {
  box-shadow: var(--shadow-md);
}

.card-header {
  color: var(--theme-text-primary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-4);
  padding-bottom: var(--spacing-3);
  border-bottom: 1px solid var(--theme-border-secondary);
}

.card-content {
  color: var(--theme-text-secondary);
  line-height: var(--line-height-relaxed);
}

/* Typography system */
.text-primary { color: var(--theme-text-primary); }
.text-secondary { color: var(--theme-text-secondary); }
.text-muted { color: var(--theme-text-muted); }

.text-xs { font-size: var(--font-size-xs); }
.text-sm { font-size: var(--font-size-sm); }
.text-base { font-size: var(--font-size-base); }
.text-lg { font-size: var(--font-size-lg); }
.text-xl { font-size: var(--font-size-xl); }

.font-light { font-weight: var(--font-weight-light); }
.font-normal { font-weight: var(--font-weight-normal); }
.font-medium { font-weight: var(--font-weight-medium); }
.font-semibold { font-weight: var(--font-weight-semibold); }
.font-bold { font-weight: var(--font-weight-bold); }

/* Spacing utilities */
.p-1 { padding: var(--spacing-1); }
.p-2 { padding: var(--spacing-2); }
.p-3 { padding: var(--spacing-3); }
.p-4 { padding: var(--spacing-4); }
.p-6 { padding: var(--spacing-6); }
.p-8 { padding: var(--spacing-8); }

.m-1 { margin: var(--spacing-1); }
.m-2 { margin: var(--spacing-2); }
.m-3 { margin: var(--spacing-3); }
.m-4 { margin: var(--spacing-4); }
.m-6 { margin: var(--spacing-6); }
.m-8 { margin: var(--spacing-8); }

/* Responsive Design with Variables */
@media (min-width: 768px) {
  :root {
    --font-size-base: 1.125rem; /* Larger base font on desktop */
    --spacing-4: 1.25rem;       /* Larger spacing */
  }
}

/* Custom Component with CSS Variables */
.progress-bar {
  --progress-height: 8px;
  --progress-bg: var(--color-gray-200);
  --progress-fill: var(--color-primary);
  --progress-border-radius: var(--border-radius-full);
  
  width: 100%;
  height: var(--progress-height);
  background-color: var(--progress-bg);
  border-radius: var(--progress-border-radius);
  overflow: hidden;
  position: relative;
}

.progress-bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: var(--progress-value, 0%);
  background-color: var(--progress-fill);
  border-radius: var(--progress-border-radius);
  transition: width var(--transition-base);
}

/* Animation with variables */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: var(--pulse-opacity, 0.5);
  }
}

.pulse {
  animation: pulse var(--pulse-duration, 2s) var(--pulse-timing, ease-in-out) infinite;
}

/* CSS Grid with variables */
.grid {
  display: grid;
  gap: var(--grid-gap, var(--spacing-4));
  grid-template-columns: repeat(var(--grid-columns, auto-fit), minmax(var(--grid-min-width, 250px), 1fr));
}

/* Form styling with variables */
.form-input {
  width: 100%;
  padding: var(--spacing-3) var(--spacing-4);
  border: 1px solid var(--theme-border-primary);
  border-radius: var(--border-radius-base);
  background-color: var(--theme-bg-primary);
  color: var(--theme-text-primary);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.form-input:focus {
  outline: none;
  border-color: var(--theme-interactive-focus);
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.form-input::placeholder {
  color: var(--theme-text-muted);
}

/* Theme-aware components */
.notification {
  padding: var(--spacing-4);
  border-radius: var(--border-radius-base);
  margin-bottom: var(--spacing-4);
  border-left: 4px solid;
}

.notification-info {
  background-color: rgba(23, 162, 184, 0.1);
  border-left-color: var(--color-info);
  color: var(--color-info);
}

.notification-success {
  background-color: rgba(40, 167, 69, 0.1);
  border-left-color: var(--color-success);
  color: var(--color-success);
}

.notification-warning {
  background-color: rgba(255, 193, 7, 0.1);
  border-left-color: var(--color-warning);
  color: var(--color-warning);
}

.notification-danger {
  background-color: rgba(220, 53, 69, 0.1);
  border-left-color: var(--color-danger);
  color: var(--color-danger);
}
```

```javascript
// JavaScript Theme Management System
class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.themes = {
            light: {
                name: 'Light',
                icon: '☀️'
            },
            dark: {
                name: 'Dark',
                icon: '🌙'
            },
            'high-contrast': {
                name: 'High Contrast',
                icon: '🔲'
            }
        };
        
        this.customProperties = new Map();
        this.observers = [];
        
        this.init();
    }
    
    init() {
        // Load saved theme
        this.loadSavedTheme();
        
        // Apply theme
        this.applyTheme(this.currentTheme);
        
        // Listen for system theme changes
        this.setupSystemThemeListener();
        
        // Create theme controls
        this.createThemeControls();
        
        // Setup CSS custom property observer
        this.setupCSSPropertyObserver();
    }
    
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('preferred-theme');
        if (savedTheme && this.themes[savedTheme]) {
            this.currentTheme = savedTheme;
        } else {
            // Use system preference
            this.currentTheme = this.getSystemTheme();
        }
    }
    
    getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }
    
    setupSystemThemeListener() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                if (!localStorage.getItem('preferred-theme')) {
                    // Only follow system if user hasn't manually selected a theme
                    const systemTheme = e.matches ? 'dark' : 'light';
                    this.setTheme(systemTheme);
                }
            });
        }
    }
    
    applyTheme(themeName) {
        // Remove previous theme
        document.documentElement.removeAttribute('data-theme');
        
        // Apply new theme
        if (themeName !== 'light') {
            document.documentElement.setAttribute('data-theme', themeName);
        }
        
        this.currentTheme = themeName;
        
        // Save preference
        localStorage.setItem('preferred-theme', themeName);
        
        // Notify observers
        this.notifyThemeChange(themeName);
        
        // Update meta theme-color for mobile browsers
        this.updateMetaThemeColor();
        
        console.log(`Theme applied: ${themeName}`);
    }
    
    setTheme(themeName) {
        if (this.themes[themeName]) {
            this.applyTheme(themeName);
        }
    }
    
    toggleTheme() {
        const themeKeys = Object.keys(this.themes);
        const currentIndex = themeKeys.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % themeKeys.length;
        const nextTheme = themeKeys[nextIndex];
        
        this.setTheme(nextTheme);
    }
    
    updateMetaThemeColor() {
        const computedStyles = getComputedStyle(document.documentElement);
        const primaryColor = computedStyles.getPropertyValue('--color-primary').trim();
        
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        metaThemeColor.content = primaryColor;
    }
    
    createThemeControls() {
        const themeToggle = document.createElement('div');
        themeToggle.className = 'theme-controls';
        themeToggle.innerHTML = `
            <button class="theme-toggle-btn" aria-label="Change theme">
                <span class="theme-icon">${this.themes[this.currentTheme].icon}</span>
                <span class="theme-name">${this.themes[this.currentTheme].name}</span>
            </button>
            
            <div class="theme-dropdown" hidden>
                ${Object.entries(this.themes).map(([key, theme]) => `
                    <button class="theme-option ${key === this.currentTheme ? 'active' : ''}" 
                            data-theme="${key}">
                        <span class="theme-icon">${theme.icon}</span>
                        <span class="theme-name">${theme.name}</span>
                    </button>
                `).join('')}
            </div>
        `;
        
        // Add styles for theme controls
        this.addThemeControlsStyles();
        
        // Position theme controls
        themeToggle.style.position = 'fixed';
        themeToggle.style.top = '20px';
        themeToggle.style.right = '20px';
        themeToggle.style.zIndex = 'var(--z-fixed)';
        
        document.body.appendChild(themeToggle);
        
        // Bind events
        const toggleBtn = themeToggle.querySelector('.theme-toggle-btn');
        const dropdown = themeToggle.querySelector('.theme-dropdown');
        const options = themeToggle.querySelectorAll('.theme-option');
        
        toggleBtn.addEventListener('click', () => {
            const isHidden = dropdown.hasAttribute('hidden');
            if (isHidden) {
                dropdown.removeAttribute('hidden');
            } else {
                dropdown.setAttribute('hidden', '');
            }
        });
        
        options.forEach(option => {
            option.addEventListener('click', () => {
                const themeName = option.dataset.theme;
                this.setTheme(themeName);
                
                // Update UI
                options.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                toggleBtn.querySelector('.theme-icon').textContent = this.themes[themeName].icon;
                toggleBtn.querySelector('.theme-name').textContent = this.themes[themeName].name;
                
                dropdown.setAttribute('hidden', '');
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!themeToggle.contains(e.target)) {
                dropdown.setAttribute('hidden', '');
            }
        });
    }
    
    addThemeControlsStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            .theme-controls {
                position: relative;
            }
            
            .theme-toggle-btn,
            .theme-option {
                display: flex;
                align-items: center;
                gap: var(--spacing-2);
                padding: var(--spacing-2) var(--spacing-3);
                border: 1px solid var(--theme-border-primary);
                border-radius: var(--border-radius-base);
                background: var(--theme-bg-primary);
                color: var(--theme-text-primary);
                cursor: pointer;
                font-size: var(--font-size-sm);
                transition: all var(--transition-fast);
                white-space: nowrap;
            }
            
            .theme-toggle-btn:hover,
            .theme-option:hover {
                background: var(--theme-interactive-hover);
            }
            
            .theme-dropdown {
                position: absolute;
                top: 100%;
                right: 0;
                margin-top: var(--spacing-1);
                background: var(--theme-bg-primary);
                border: 1px solid var(--theme-border-primary);
                border-radius: var(--border-radius-base);
                box-shadow: var(--shadow-lg);
                overflow: hidden;
                min-width: 140px;
            }
            
            .theme-option {
                width: 100%;
                border: none;
                border-radius: 0;
                justify-content: flex-start;
            }
            
            .theme-option.active {
                background: var(--color-primary);
                color: var(--color-white);
            }
            
            .theme-icon {
                font-size: 1.2em;
            }
        `;
        document.head.appendChild(styles);
    }
    
    // CSS Custom Property Manipulation
    setCSSProperty(property, value, element = document.documentElement) {
        element.style.setProperty(property, value);
        this.customProperties.set(property, value);
        
        console.log(`CSS property set: ${property} = ${value}`);
    }
    
    getCSSProperty(property, element = document.documentElement) {
        return getComputedStyle(element).getPropertyValue(property).trim();
    }
    
    removeCSSProperty(property, element = document.documentElement) {
        element.style.removeProperty(property);
        this.customProperties.delete(property);
    }
    
    // Programmatic theme creation
    createCustomTheme(themeName, themeConfig) {
        const themeProperties = {};
        
        Object.entries(themeConfig).forEach(([key, value]) => {
            const cssProperty = `--theme-${key}`;
            themeProperties[cssProperty] = value;
        });
        
        // Create CSS rules for custom theme
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            [data-theme="${themeName}"] {
                ${Object.entries(themeProperties)
                    .map(([prop, value]) => `${prop}: ${value};`)
                    .join('\n                ')
                }
            }
        `;
        
        document.head.appendChild(styleElement);
        
        // Add to available themes
        this.themes[themeName] = {
            name: themeConfig.name || themeName,
            icon: themeConfig.icon || '🎨'
        };
        
        console.log(`Custom theme created: ${themeName}`);
    }
    
    // Dynamic color generation
    generateColorPalette(baseColor) {
        // Convert hex to HSL for manipulation
        const { h, s, l } = this.hexToHsl(baseColor);
        
        const palette = {
            50: this.hslToHex(h, s, Math.min(l + 45, 95)),
            100: this.hslToHex(h, s, Math.min(l + 35, 90)),
            200: this.hslToHex(h, s, Math.min(l + 25, 85)),
            300: this.hslToHex(h, s, Math.min(l + 15, 80)),
            400: this.hslToHex(h, s, Math.min(l + 5, 75)),
            500: baseColor, // Original color
            600: this.hslToHex(h, s, Math.max(l - 5, 25)),
            700: this.hslToHex(h, s, Math.max(l - 15, 20)),
            800: this.hslToHex(h, s, Math.max(l - 25, 15)),
            900: this.hslToHex(h, s, Math.max(l - 35, 10))
        };
        
        return palette;
    }
    
    hexToHsl(hex) {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        
        return { h: h * 360, s: s * 100, l: l * 100 };
    }
    
    hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    }
    
    // Animation and transitions
    animateThemeTransition() {
        document.documentElement.style.setProperty('--transition-base', '0ms');
        
        requestAnimationFrame(() => {
            document.documentElement.style.removeProperty('--transition-base');
        });
    }
    
    // Theme observers
    onThemeChange(callback) {
        this.observers.push(callback);
    }
    
    notifyThemeChange(themeName) {
        this.observers.forEach(callback => {
            try {
                callback(themeName);
            } catch (error) {
                console.error('Theme change observer error:', error);
            }
        });
    }
    
    setupCSSPropertyObserver() {
        // Monitor CSS custom property changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    console.log('CSS properties changed on:', mutation.target);
                }
            });
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['style']
        });
    }
    
    // Utility methods
    getCurrentTheme() {
        return this.currentTheme;
    }
    
    getAvailableThemes() {
        return Object.keys(this.themes);
    }
    
    exportTheme() {
        const computedStyles = getComputedStyle(document.documentElement);
        const exportedTheme = {};
        
        // Get all CSS custom properties
        for (const property of this.customProperties.keys()) {
            exportedTheme[property] = computedStyles.getPropertyValue(property).trim();
        }
        
        return exportedTheme;
    }
    
    importTheme(themeData) {
        Object.entries(themeData).forEach(([property, value]) => {
            this.setCSSProperty(property, value);
        });
    }
}

// Usage Examples
class ThemeDemo {
    constructor() {
        this.themeManager = new ThemeManager();
        this.initDemo();
    }
    
    initDemo() {
        // Create demo components
        this.createDemoComponents();
        
        // Setup theme change listener
        this.themeManager.onThemeChange((themeName) => {
            console.log(`Theme changed to: ${themeName}`);
            this.updateDemoComponents(themeName);
        });
        
        // Create custom theme example
        this.createCustomThemes();
        
        // Setup color picker for dynamic theming
        this.setupColorPicker();
    }
    
    createDemoComponents() {
        const demoContainer = document.createElement('div');
        demoContainer.className = 'theme-demo-container';
        demoContainer.innerHTML = `
            <h1>CSS Variables & Theming Demo</h1>
            
            <div class="demo-grid">
                <div class="card">
                    <div class="card-header">Buttons</div>
                    <div class="card-content">
                        <div style="display: flex; gap: var(--spacing-2); flex-wrap: wrap;">
                            <button class="btn btn-primary">Primary</button>
                            <button class="btn btn-secondary">Secondary</button>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">Form Elements</div>
                    <div class="card-content">
                        <input type="text" class="form-input" placeholder="Enter text here">
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">Notifications</div>
                    <div class="card-content">
                        <div class="notification notification-info">Info notification</div>
                        <div class="notification notification-success">Success notification</div>
                        <div class="notification notification-warning">Warning notification</div>
                        <div class="notification notification-danger">Danger notification</div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">Progress Bar</div>
                    <div class="card-content">
                        <div class="progress-bar" style="--progress-value: 75%;"></div>
                        <p class="text-muted text-sm" style="margin-top: var(--spacing-2);">75% Complete</p>
                    </div>
                </div>
            </div>
            
            <div class="color-picker-section">
                <h3>Dynamic Theme Colors</h3>
                <div style="display: flex; gap: var(--spacing-4); align-items: center;">
                    <label for="primary-color">Primary Color:</label>
                    <input type="color" id="primary-color" value="#007bff">
                    <button id="apply-color" class="btn btn-primary">Apply</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(demoContainer);
        
        // Add demo styles
        this.addDemoStyles();
    }
    
    addDemoStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            .theme-demo-container {
                max-width: 1200px;
                margin: 2rem auto;
                padding: var(--spacing-6);
                font-family: var(--font-family-sans);
            }
            
            .demo-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: var(--spacing-6);
                margin: var(--spacing-8) 0;
            }
            
            .color-picker-section {
                margin-top: var(--spacing-8);
                padding: var(--spacing-6);
                background: var(--theme-bg-secondary);
                border-radius: var(--border-radius-lg);
            }
        `;
        document.head.appendChild(styles);
    }
    
    createCustomThemes() {
        // Create a purple theme
        this.themeManager.createCustomTheme('purple', {
            'bg-primary': '#faf9ff',
            'bg-secondary': '#f3f2ff',
            'bg-tertiary': '#ebe8ff',
            'text-primary': '#2d1b69',
            'text-secondary': '#553c9a',
            'text-muted': '#8b6bb1',
            'border-primary': '#d1c7e8',
            'border-secondary': '#e6e0f7',
            'interactive-hover': '#f3f2ff',
            'interactive-active': '#ebe8ff',
            'interactive-focus': '#7c3aed',
            name: 'Purple',
            icon: '💜'
        });
        
        // Create a nature theme
        this.themeManager.createCustomTheme('nature', {
            'bg-primary': '#f8fbf5',
            'bg-secondary': '#f0f8ea',
            'bg-tertiary': '#e6f4d9',
            'text-primary': '#1a2e05',
            'text-secondary': '#2f5233',
            'text-muted': '#68896e',
            'border-primary': '#c4d9b8',
            'border-secondary': '#daeaca',
            'interactive-hover': '#f0f8ea',
            'interactive-active': '#e6f4d9',
            'interactive-focus': '#16a34a',
            name: 'Nature',
            icon: '🌿'
        });
    }
    
    setupColorPicker() {
        const colorPicker = document.getElementById('primary-color');
        const applyButton = document.getElementById('apply-color');
        
        if (colorPicker && applyButton) {
            applyButton.addEventListener('click', () => {
                const newColor = colorPicker.value;
                
                // Generate color palette
                const palette = this.themeManager.generateColorPalette(newColor);
                
                // Apply new colors
                this.themeManager.setCSSProperty('--color-primary', newColor);
                this.themeManager.setCSSProperty('--color-primary-dark', palette[700]);
                this.themeManager.setCSSProperty('--color-primary-light', palette[300]);
                
                console.log('Dynamic color applied:', newColor);
            });
        }
    }
    
    updateDemoComponents(themeName) {
        // Update any demo-specific logic based on theme
        const demoContainer = document.querySelector('.theme-demo-container');
        if (demoContainer) {
            demoContainer.setAttribute('data-current-theme', themeName);
        }
    }
}

// Initialize demo
document.addEventListener('DOMContentLoaded', () => {
    new ThemeDemo();
});

// CSS-in-JS pattern example
const cssInJS = {
    createStyleSheet(styles) {
        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
        return styleElement;
    },
    
    generateComponentStyles(componentName, props = {}) {
        const baseStyles = `
            .${componentName} {
                padding: var(--spacing-${props.padding || 4});
                margin: var(--spacing-${props.margin || 0});
                border-radius: var(--border-radius-${props.borderRadius || 'base'});
                background-color: var(--theme-bg-${props.background || 'primary'});
                color: var(--theme-text-${props.textColor || 'primary'});
            }
        `;
        
        return this.createStyleSheet(baseStyles);
    },
    
    updateStyleProperty(element, property, value) {
        element.style.setProperty(property, value);
    }
};

// Example: Create dynamic component
const dynamicComponent = cssInJS.generateComponentStyles('dynamic-card', {
    padding: 6,
    margin: 4,
    borderRadius: 'lg',
    background: 'secondary',
    textColor: 'primary'
});

console.log('CSS Variables and Theming system initialized');
```
*Figyeld meg: Design tokens, theme switching, custom properties, CSS-in-JS patterns.*

</div>

<div class="concept-section myths" data-filter="css">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „CSS Variables lassabbak mint SASS változók." → CSS Variables runtime-ban módosíthatók, SASS compile-time, másféle use case-ek
- „CSS Variables nem működnek régi böngészőkben." → IE11+ támogatja, fallback values használhatók
- „CSS Variables csak színekhez jók." → Bármilyen CSS property-hez: spacing, typography, animations, etc.

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="css">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**CSS Variables alapok:**
```css
:root {
  --primary-color: #007bff;      /* Definition */
  --spacing: 1rem;
}

.button {
  background: var(--primary-color);     /* Usage */
  padding: var(--spacing, 0.5rem);      /* With fallback */
}

/* JavaScript access */
document.documentElement.style.setProperty('--primary-color', '#ff0000');
getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
```

**Theme switching pattern:**
```css
[data-theme="dark"] {
  --bg-color: #1a1a1a;
  --text-color: #ffffff;
}

[data-theme="light"] {
  --bg-color: #ffffff;
  --text-color: #000000;
}
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="css medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mi a különbség CSS Variables és SASS variables között?**
A: CSS Variables runtime-ban módosíthatók JavaScript-ből, SASS variables compile-time-ban feloldódnak. CSS Variables dynamic theming-hez.

**Q: Hogyan implementálnál dark mode-ot CSS Variables-szel?**
A: Data attribútum vagy class alapú theme switching, CSS custom properties override-olása, media query prefers-color-scheme.

**Q: Mikor használnál CSS Variables vs CSS-in-JS?**
A: CSS Variables native performance, CSS-in-JS dinamikus styling complex logikával. Hybrid approach gyakran optimális.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="css">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Responsive Design** → Theme-aware responsive patterns
- **JavaScript** → Dynamic theme manipulation és user preferences
- **Accessibility** → High contrast themes és user preferences
- **Performance** → CSS custom properties vs runtime calculations
- **Design Systems** → Consistent design tokens és component styling

</div>

</details>

</div>

### CSS Positioning (relative, absolute, fixed, sticky) {#css-positioning}

<div class="concept-section mental-model" data-filter="css medior">

🧭 **Így gondolj rá**  
*CSS positioning olyan, mint különböző típusú bútorok: static (beépített szekrény), relative (tolható szekrény), absolute (lebegő polc), fixed (fali TV), sticky (mágneses jegyzet ami követi az oldalt).*

</div>

<div class="concept-section why-important" data-filter="css medior">

💡 **Miért számít?**
- **Layout control**: precíz elemhelyezés és rétegzés (z-index)
- **Interactive UI**: dropdown menük, tooltipek, modal dialógusok
- **Scroll effects**: sticky headers, floating action buttons
- **Responsive design**: különböző positioning strategy különböző eszközökön

</div>

<div class="runnable-model" data-filter="css">

**Runnable mental model**
```css
/* CSS Positioning Comprehensive Guide */

/* Base positioning demo layout */
.positioning-demo {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    margin: 0;
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 200vh; /* Enable scrolling */
}

/* 1. STATIC POSITIONING (Default) */
.static-example {
    background: #ffffff;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.static-box {
    position: static; /* Default - follows normal document flow */
    background: #e3f2fd;
    padding: 1rem;
    margin: 0.5rem 0;
    border: 2px solid #2196f3;
    border-radius: 4px;
}

/* 2. RELATIVE POSITIONING */
.relative-container {
    background: #ffffff;
    padding: 2rem;
    margin: 2rem 0;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    position: relative; /* Creates positioning context for children */
}

.relative-box {
    position: relative;
    background: #fff3e0;
    border: 2px solid #ff9800;
    padding: 1rem;
    margin: 1rem;
    border-radius: 4px;
    
    /* Offset from its normal position */
    top: 20px;
    left: 30px;
    
    transition: all 0.3s ease;
}

.relative-box:hover {
    top: 10px;
    left: 15px;
    transform: scale(1.02);
}

/* Relative positioning for layout context */
.card-container {
    position: relative;
    background: #f5f5f5;
    padding: 2rem;
    border-radius: 12px;
    margin: 2rem 0;
    overflow: hidden;
}

.card-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #e91e63;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: bold;
    z-index: 2;
}

.card-content {
    position: relative;
    z-index: 1;
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* 3. ABSOLUTE POSITIONING */
.absolute-container {
    position: relative; /* Positioning context */
    background: #ffffff;
    padding: 3rem;
    margin: 2rem 0;
    border-radius: 8px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
    height: 300px;
    border: 2px dashed #9c27b0;
}

.absolute-box {
    position: absolute;
    background: #f3e5f5;
    border: 2px solid #9c27b0;
    padding: 1rem;
    border-radius: 4px;
    min-width: 120px;
    text-align: center;
}

/* Different absolute positioning examples */
.absolute-top-left {
    top: 10px;
    left: 10px;
}

.absolute-top-right {
    top: 10px;
    right: 10px;
}

.absolute-bottom-left {
    bottom: 10px;
    left: 10px;
}

.absolute-bottom-right {
    bottom: 10px;
    right: 10px;
}

.absolute-center {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #e8f5e8;
    border-color: #4caf50;
}

/* Overlay pattern with absolute positioning */
.image-overlay-container {
    position: relative;
    display: inline-block;
    border-radius: 8px;
    overflow: hidden;
    margin: 1rem;
}

.overlay-image {
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    background: linear-gradient(45deg, #667eea, #764ba2);
}

.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.image-overlay-container:hover .image-overlay {
    opacity: 1;
}

/* Dropdown menu with absolute positioning */
.dropdown-container {
    position: relative;
    display: inline-block;
    margin: 1rem;
}

.dropdown-trigger {
    background: #2196f3;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s ease;
}

.dropdown-trigger:hover {
    background: #1976d2;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    min-width: 200px;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.2s ease;
}

.dropdown-container:hover .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.dropdown-item {
    display: block;
    padding: 0.75rem 1rem;
    color: #333;
    text-decoration: none;
    border-bottom: 1px solid #eee;
    transition: background-color 0.2s ease;
}

.dropdown-item:hover {
    background: #f5f5f5;
}

.dropdown-item:last-child {
    border-bottom: none;
}

/* 4. FIXED POSITIONING */
.fixed-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 1rem 2rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    z-index: 1000;
    border-bottom: 1px solid #e0e0e0;
}

.fixed-header h3 {
    margin: 0;
    color: #333;
    font-size: 1.2rem;
}

.fixed-nav {
    display: flex;
    gap: 2rem;
    align-items: center;
    justify-content: space-between;
}

.fixed-nav-links {
    display: flex;
    gap: 1.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
}

.fixed-nav-links a {
    color: #555;
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 0;
    border-bottom: 2px solid transparent;
    transition: all 0.2s ease;
}

.fixed-nav-links a:hover {
    color: #2196f3;
    border-bottom-color: #2196f3;
}

/* Fixed sidebar */
.fixed-sidebar {
    position: fixed;
    top: 80px; /* Below header */
    left: 0;
    width: 250px;
    height: calc(100vh - 80px);
    background: white;
    box-shadow: 2px 0 10px rgba(0,0,0,0.1);
    padding: 2rem;
    overflow-y: auto;
    z-index: 999;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
}

.fixed-sidebar.open {
    transform: translateX(0);
}

.sidebar-toggle {
    position: fixed;
    top: 20px;
    left: 20px;
    background: #2196f3;
    color: white;
    border: none;
    padding: 0.5rem;
    border-radius: 4px;
    cursor: pointer;
    z-index: 1001;
    font-size: 1.2rem;
}

/* Fixed floating action button */
.fab {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 56px;
    height: 56px;
    background: #ff4081;
    color: white;
    border: none;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(255, 64, 129, 0.4);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    transition: all 0.3s ease;
    z-index: 1000;
}

.fab:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(255, 64, 129, 0.6);
}

/* Fixed modal overlay */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.modal-overlay.active {
    opacity: 1;
    visibility: visible;
}

.modal-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    transform: scale(0.8);
    transition: transform 0.3s ease;
}

.modal-overlay.active .modal-content {
    transform: scale(1);
}

/* 5. STICKY POSITIONING */
.sticky-header {
    position: sticky;
    top: 80px; /* Stick below fixed header */
    background: #4caf50;
    color: white;
    padding: 1rem 2rem;
    margin: 2rem 0;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
    z-index: 100;
}

.sticky-sidebar {
    position: sticky;
    top: 2rem;
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    height: fit-content;
}

/* Sticky table header */
.sticky-table-container {
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin: 2rem 0;
}

.sticky-table {
    width: 100%;
    border-collapse: collapse;
}

.sticky-table th {
    position: sticky;
    top: 0;
    background: #f5f5f5;
    padding: 1rem;
    text-align: left;
    border-bottom: 2px solid #ddd;
    font-weight: 600;
    z-index: 10;
}

.sticky-table td {
    padding: 1rem;
    border-bottom: 1px solid #eee;
}

.sticky-table tr:hover {
    background: #f9f9f9;
}

/* Content sections for scroll demonstration */
.content-section {
    background: white;
    margin: 2rem 0;
    padding: 3rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    min-height: 400px;
}

.content-section h3 {
    color: #333;
    margin-bottom: 1rem;
}

.content-section p {
    line-height: 1.6;
    color: #666;
    margin-bottom: 1rem;
}

/* Layout grid combining different positioning */
.layout-grid {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 2rem;
    margin: 2rem 0;
    position: relative;
}

.main-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.sidebar-content {
    /* Sticky sidebar within grid */
    position: sticky;
    top: 2rem;
    height: fit-content;
}

/* Advanced positioning: tooltips */
.tooltip-container {
    position: relative;
    display: inline-block;
    margin: 1rem;
}

.tooltip-trigger {
    background: #ff9800;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 0.875rem;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
    z-index: 1000;
    margin-bottom: 5px;
}

.tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: #333;
}

.tooltip-container:hover .tooltip {
    opacity: 1;
    visibility: visible;
}

/* Responsive positioning */
@media (max-width: 768px) {
    .layout-grid {
        grid-template-columns: 1fr;
    }
    
    .fixed-sidebar {
        width: 80%;
    }
    
    .dropdown-menu {
        left: auto;
        right: 0;
    }
    
    .fab {
        bottom: 1rem;
        right: 1rem;
        width: 48px;
        height: 48px;
        font-size: 1.2rem;
    }
}

/* Z-index management */
.z-index-demo {
    position: relative;
    height: 200px;
    margin: 2rem 0;
}

.layer {
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
}

.layer-1 {
    background: #f44336;
    top: 20px;
    left: 20px;
    z-index: 1;
}

.layer-2 {
    background: #2196f3;
    top: 40px;
    left: 40px;
    z-index: 2;
}

.layer-3 {
    background: #4caf50;
    top: 60px;
    left: 60px;
    z-index: 3;
}

/* Animation with positioning */
@keyframes slideInFromRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes float {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

.animated-element {
    position: relative;
    animation: slideInFromRight 0.5s ease-out;
}

.floating-element {
    position: relative;
    animation: float 3s ease-in-out infinite;
}

/* Print-specific positioning */
@media print {
    .fixed-header,
    .fixed-sidebar,
    .fab {
        display: none;
    }
    
    .sticky-header {
        position: static;
    }
    
    .content-section {
        break-inside: avoid;
    }
}
```

```javascript
// JavaScript for Interactive Positioning Examples
class PositioningDemo {
    constructor() {
        this.init();
    }
    
    init() {
        this.createDemoHTML();
        this.setupInteractiveElements();
        this.setupScrollEffects();
        this.setupResponsivePositioning();
        this.setupAdvancedExamples();
    }
    
    createDemoHTML() {
        const demoContainer = document.createElement('div');
        demoContainer.className = 'positioning-demo';
        demoContainer.innerHTML = `
            <!-- Fixed Header -->
            <header class="fixed-header">
                <nav class="fixed-nav">
                    <h3>CSS Positioning Demo</h3>
                    <ul class="fixed-nav-links">
                        <li><a href="#static">Static</a></li>
                        <li><a href="#relative">Relative</a></li>
                        <li><a href="#absolute">Absolute</a></li>
                        <li><a href="#fixed">Fixed</a></li>
                        <li><a href="#sticky">Sticky</a></li>
                    </ul>
                </nav>
            </header>
            
            <!-- Sidebar Toggle -->
            <button class="sidebar-toggle" id="sidebarToggle">☰</button>
            
            <!-- Fixed Sidebar -->
            <nav class="fixed-sidebar" id="sidebar">
                <h4>Navigation</h4>
                <ul style="list-style: none; padding: 0;">
                    <li><a href="#static" style="display: block; padding: 0.5rem 0; color: #333; text-decoration: none;">Static Examples</a></li>
                    <li><a href="#relative" style="display: block; padding: 0.5rem 0; color: #333; text-decoration: none;">Relative Examples</a></li>
                    <li><a href="#absolute" style="display: block; padding: 0.5rem 0; color: #333; text-decoration: none;">Absolute Examples</a></li>
                    <li><a href="#fixed" style="display: block; padding: 0.5rem 0; color: #333; text-decoration: none;">Fixed Examples</a></li>
                    <li><a href="#sticky" style="display: block; padding: 0.5rem 0; color: #333; text-decoration: none;">Sticky Examples</a></li>
                </ul>
            </nav>
            
            <!-- Main Content -->
            <main style="margin-top: 80px; padding: 2rem;">
                
                <!-- Static Positioning -->
                <section id="static" class="content-section">
                    <h2>Static Positioning (Default)</h2>
                    <div class="static-example">
                        <div class="static-box">Static Box 1 - Follows normal document flow</div>
                        <div class="static-box">Static Box 2 - Cannot be moved with top/left/right/bottom</div>
                        <div class="static-box">Static Box 3 - Default positioning for all elements</div>
                    </div>
                </section>
                
                <!-- Sticky Header -->
                <div class="sticky-header">
                    <h2>🔗 This header sticks when you scroll!</h2>
                </div>
                
                <!-- Relative Positioning -->
                <section id="relative" class="content-section">
                    <h2>Relative Positioning</h2>
                    <div class="relative-container">
                        <p>This container has position: relative, creating a positioning context.</p>
                        <div class="relative-box">
                            Relative Box - Moved 20px down, 30px right from normal position
                        </div>
                        <div class="card-container">
                            <div class="card-badge">New!</div>
                            <div class="card-content">
                                <h3>Card with Badge</h3>
                                <p>The badge uses absolute positioning relative to this card container.</p>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Absolute Positioning -->
                <section id="absolute" class="content-section">
                    <h2>Absolute Positioning</h2>
                    <div class="absolute-container">
                        <div class="absolute-box absolute-top-left">Top Left</div>
                        <div class="absolute-box absolute-top-right">Top Right</div>
                        <div class="absolute-box absolute-center">Centered</div>
                        <div class="absolute-box absolute-bottom-left">Bottom Left</div>
                        <div class="absolute-box absolute-bottom-right">Bottom Right</div>
                    </div>
                    
                    <h3>Image Overlay Example</h3>
                    <div class="image-overlay-container">
                        <div class="overlay-image"></div>
                        <div class="image-overlay">Hover me!</div>
                    </div>
                    
                    <h3>Dropdown Menu Example</h3>
                    <div class="dropdown-container">
                        <button class="dropdown-trigger">Hover for Menu</button>
                        <div class="dropdown-menu">
                            <a href="#" class="dropdown-item">Menu Item 1</a>
                            <a href="#" class="dropdown-item">Menu Item 2</a>
                            <a href="#" class="dropdown-item">Menu Item 3</a>
                            <a href="#" class="dropdown-item">Menu Item 4</a>
                        </div>
                    </div>
                    
                    <div class="tooltip-container">
                        <button class="tooltip-trigger">Hover for Tooltip</button>
                        <div class="tooltip">This is a helpful tooltip!</div>
                    </div>
                </section>
                
                <!-- Fixed Positioning -->
                <section id="fixed" class="content-section">
                    <h2>Fixed Positioning</h2>
                    <p>Fixed elements are visible above. Check out:</p>
                    <ul>
                        <li>Fixed header at the top</li>
                        <li>Fixed sidebar (toggle with ☰ button)</li>
                        <li>Fixed floating action button (bottom right)</li>
                    </ul>
                    <button id="showModal" style="background: #2196f3; color: white; border: none; padding: 1rem 2rem; border-radius: 4px; cursor: pointer;">
                        Show Modal (Fixed Overlay)
                    </button>
                </section>
                
                <!-- Sticky Positioning -->
                <section id="sticky" class="content-section">
                    <h2>Sticky Positioning</h2>
                    <div class="layout-grid">
                        <div class="main-content">
                            <h3>Main Content Area</h3>
                            <p>This content area flows normally. The sidebar on the right uses sticky positioning.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                        <div class="sidebar-content sticky-sidebar">
                            <h4>Sticky Sidebar</h4>
                            <p>This sidebar sticks as you scroll down.</p>
                            <ul style="list-style: none; padding: 0;">
                                <li style="padding: 0.5rem 0; border-bottom: 1px solid #eee;">
                                    <a href="#" style="color: #333; text-decoration: none;">Quick Link 1</a>
                                </li>
                                <li style="padding: 0.5rem 0; border-bottom: 1px solid #eee;">
                                    <a href="#" style="color: #333; text-decoration: none;">Quick Link 2</a>
                                </li>
                                <li style="padding: 0.5rem 0; border-bottom: 1px solid #eee;">
                                    <a href="#" style="color: #333; text-decoration: none;">Quick Link 3</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <h3>Sticky Table Header</h3>
                    <div class="sticky-table-container">
                        <table class="sticky-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Position</th>
                                    <th>Department</th>
                                    <th>Salary</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.generateTableRows()}
                            </tbody>
                        </table>
                    </div>
                </section>
                
                <!-- Z-Index Demo -->
                <section class="content-section">
                    <h2>Z-Index Layering</h2>
                    <div class="z-index-demo">
                        <div class="layer layer-1">Z: 1</div>
                        <div class="layer layer-2">Z: 2</div>
                        <div class="layer layer-3">Z: 3</div>
                    </div>
                    <p>Elements with higher z-index values appear above those with lower values.</p>
                </section>
                
                <!-- More content for scrolling -->
                ${this.generateMoreContent()}
            </main>
            
            <!-- Fixed Elements -->
            <button class="fab" id="fab" title="Scroll to top">↑</button>
            
            <!-- Modal -->
            <div class="modal-overlay" id="modal">
                <div class="modal-content">
                    <h3>Fixed Modal Example</h3>
                    <p>This modal uses fixed positioning to overlay the entire viewport.</p>
                    <p>The backdrop is also fixed and covers the full screen.</p>
                    <button id="closeModal" style="background: #f44336; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">
                        Close Modal
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(demoContainer);
    }
    
    generateTableRows() {
        const employees = [
            { name: 'John Doe', position: 'Developer', department: 'Engineering', salary: '$75,000' },
            { name: 'Jane Smith', position: 'Designer', department: 'Design', salary: '$70,000' },
            { name: 'Bob Johnson', position: 'Manager', department: 'Engineering', salary: '$90,000' },
            { name: 'Alice Brown', position: 'Developer', department: 'Engineering', salary: '$80,000' },
            { name: 'Charlie Wilson', position: 'Analyst', department: 'Business', salary: '$65,000' },
            { name: 'Diana Davis', position: 'Lead Designer', department: 'Design', salary: '$85,000' },
            { name: 'Eva Garcia', position: 'Developer', department: 'Engineering', salary: '$78,000' },
            { name: 'Frank Miller', position: 'Product Manager', department: 'Product', salary: '$95,000' },
            { name: 'Grace Lee', position: 'QA Engineer', department: 'Engineering', salary: '$72,000' },
            { name: 'Henry Taylor', position: 'DevOps', department: 'Engineering', salary: '$88,000' }
        ];
        
        return employees.map(emp => `
            <tr>
                <td>${emp.name}</td>
                <td>${emp.position}</td>
                <td>${emp.department}</td>
                <td>${emp.salary}</td>
            </tr>
        `).join('');
    }
    
    generateMoreContent() {
        return `
            <section class="content-section animated-element">
                <h2>Animated Positioning</h2>
                <div class="floating-element" style="display: inline-block; background: #ff9800; color: white; padding: 1rem; border-radius: 8px; margin: 1rem;">
                    Floating Element
                </div>
                <p>This element uses CSS animations with relative positioning.</p>
            </section>
            
            <section class="content-section">
                <h2>Responsive Positioning</h2>
                <p>Positioning strategies adapt to different screen sizes. On mobile:</p>
                <ul>
                    <li>Fixed sidebar becomes full-width overlay</li>
                    <li>Dropdown menus align to screen edges</li>
                    <li>Floating action buttons are smaller</li>
                </ul>
            </section>
        `;
    }
    
    setupInteractiveElements() {
        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');
        
        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('open');
            });
            
            // Close sidebar when clicking outside
            document.addEventListener('click', (e) => {
                if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                    sidebar.classList.remove('open');
                }
            });
        }
        
        // Modal controls
        const showModal = document.getElementById('showModal');
        const modal = document.getElementById('modal');
        const closeModal = document.getElementById('closeModal');
        
        if (showModal && modal && closeModal) {
            showModal.addEventListener('click', () => {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scroll
            });
            
            closeModal.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = ''; // Restore scroll
            });
            
            // Close modal on backdrop click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
            
            // Close modal with Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
        
        // FAB scroll to top
        const fab = document.getElementById('fab');
        if (fab) {
            fab.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    setupScrollEffects() {
        // Show/hide FAB based on scroll position
        const fab = document.getElementById('fab');
        const fabThreshold = 300;
        
        window.addEventListener('scroll', () => {
            if (fab) {
                if (window.scrollY > fabThreshold) {
                    fab.style.opacity = '1';
                    fab.style.visibility = 'visible';
                } else {
                    fab.style.opacity = '0';
                    fab.style.visibility = 'hidden';
                }
            }
        });
        
        // Parallax effect for demo background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            const demoContainer = document.querySelector('.positioning-demo');
            if (demoContainer) {
                demoContainer.style.backgroundPosition = `center ${parallax}px`;
            }
        });
        
        // Update fixed header appearance on scroll
        const fixedHeader = document.querySelector('.fixed-header');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (fixedHeader) {
                if (scrollTop > 100) {
                    fixedHeader.style.background = 'rgba(255, 255, 255, 0.98)';
                    fixedHeader.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
                } else {
                    fixedHeader.style.background = 'rgba(255, 255, 255, 0.95)';
                    fixedHeader.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                }
                
                // Hide header on scroll down, show on scroll up
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    fixedHeader.style.transform = 'translateY(-100%)';
                } else {
                    fixedHeader.style.transform = 'translateY(0)';
                }
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    setupResponsivePositioning() {
        // Handle responsive positioning changes
        const handleResize = () => {
            const isMobile = window.innerWidth < 768;
            const sidebar = document.getElementById('sidebar');
            
            if (sidebar && isMobile) {
                // On mobile, sidebar should overlay instead of push content
                sidebar.style.width = '80%';
            } else if (sidebar) {
                sidebar.style.width = '250px';
            }
        };
        
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call
    }
    
    setupAdvancedExamples() {
        // Advanced positioning examples
        this.setupTooltipPositioning();
        this.setupDropdownPositioning();
        this.setupStickyTableHeaders();
    }
    
    setupTooltipPositioning() {
        // Dynamic tooltip positioning to stay in viewport
        const tooltips = document.querySelectorAll('.tooltip-container');
        
        tooltips.forEach(container => {
            const tooltip = container.querySelector('.tooltip');
            if (tooltip) {
                container.addEventListener('mouseenter', () => {
                    // Calculate tooltip position
                    const containerRect = container.getBoundingClientRect();
                    const tooltipRect = tooltip.getBoundingClientRect();
                    const viewportWidth = window.innerWidth;
                    
                    // Reset positioning
                    tooltip.style.left = '50%';
                    tooltip.style.transform = 'translateX(-50%)';
                    
                    // Check if tooltip goes off-screen
                    const tooltipLeft = containerRect.left + containerRect.width / 2 - tooltipRect.width / 2;
                    
                    if (tooltipLeft < 10) {
                        // Tooltip goes off left edge
                        tooltip.style.left = '0';
                        tooltip.style.transform = 'translateX(0)';
                    } else if (tooltipLeft + tooltipRect.width > viewportWidth - 10) {
                        // Tooltip goes off right edge
                        tooltip.style.left = 'auto';
                        tooltip.style.right = '0';
                        tooltip.style.transform = 'translateX(0)';
                    }
                });
            }
        });
    }
    
    setupDropdownPositioning() {
        // Smart dropdown positioning
        const dropdowns = document.querySelectorAll('.dropdown-container');
        
        dropdowns.forEach(container => {
            const menu = container.querySelector('.dropdown-menu');
            if (menu) {
                container.addEventListener('mouseenter', () => {
                    // Check if dropdown goes off-screen
                    const containerRect = container.getBoundingClientRect();
                    const menuRect = menu.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    const viewportWidth = window.innerWidth;
                    
                    // Reset positioning
                    menu.style.top = '100%';
                    menu.style.bottom = 'auto';
                    menu.style.left = '0';
                    menu.style.right = 'auto';
                    
                    // Check vertical space
                    if (containerRect.bottom + menuRect.height > viewportHeight - 20) {
                        // Not enough space below, show above
                        menu.style.top = 'auto';
                        menu.style.bottom = '100%';
                    }
                    
                    // Check horizontal space
                    if (containerRect.left + menuRect.width > viewportWidth - 20) {
                        // Not enough space on right, align to right edge
                        menu.style.left = 'auto';
                        menu.style.right = '0';
                    }
                });
            }
        });
    }
    
    setupStickyTableHeaders() {
        // Enhanced sticky table header behavior
        const stickyTables = document.querySelectorAll('.sticky-table-container');
        
        stickyTables.forEach(container => {
            const table = container.querySelector('.sticky-table');
            const headers = table.querySelectorAll('th');
            
            container.addEventListener('scroll', () => {
                const scrollTop = container.scrollTop;
                
                headers.forEach(header => {
                    if (scrollTop > 0) {
                        header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                    } else {
                        header.style.boxShadow = 'none';
                    }
                });
            });
        });
    }
}

// Initialize demo when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PositioningDemo();
    
    // Add initial styles to hide FAB
    const fab = document.getElementById('fab');
    if (fab) {
        fab.style.opacity = '0';
        fab.style.visibility = 'hidden';
        fab.style.transition = 'all 0.3s ease';
    }
});

// Positioning utility functions
const PositioningUtils = {
    // Center element absolutely
    centerAbsolute(element) {
        element.style.position = 'absolute';
        element.style.top = '50%';
        element.style.left = '50%';
        element.style.transform = 'translate(-50%, -50%)';
    },
    
    // Stick element to viewport edge
    stickToEdge(element, edge) {
        element.style.position = 'fixed';
        element.style.zIndex = '1000';
        
        switch (edge) {
            case 'top':
                element.style.top = '0';
                element.style.left = '0';
                element.style.right = '0';
                break;
            case 'bottom':
                element.style.bottom = '0';
                element.style.left = '0';
                element.style.right = '0';
                break;
            case 'left':
                element.style.left = '0';
                element.style.top = '0';
                element.style.bottom = '0';
                break;
            case 'right':
                element.style.right = '0';
                element.style.top = '0';
                element.style.bottom = '0';
                break;
        }
    },
    
    // Make element follow mouse cursor
    followCursor(element, event) {
        element.style.position = 'fixed';
        element.style.left = event.clientX + 10 + 'px';
        element.style.top = event.clientY + 10 + 'px';
        element.style.pointerEvents = 'none';
        element.style.zIndex = '9999';
    },
    
    // Calculate optimal tooltip position
    getOptimalTooltipPosition(trigger, tooltip) {
        const triggerRect = trigger.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        
        const positions = {
            top: {
                x: triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2,
                y: triggerRect.top - tooltipRect.height - 10
            },
            bottom: {
                x: triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2,
                y: triggerRect.bottom + 10
            },
            left: {
                x: triggerRect.left - tooltipRect.width - 10,
                y: triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
            },
            right: {
                x: triggerRect.right + 10,
                y: triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
            }
        };
        
        // Find position that fits in viewport
        for (const [pos, coords] of Object.entries(positions)) {
            if (coords.x >= 0 && coords.x + tooltipRect.width <= viewport.width &&
                coords.y >= 0 && coords.y + tooltipRect.height <= viewport.height) {
                return { position: pos, ...coords };
            }
        }
        
        // Fallback to bottom position with adjustments
        return {
            position: 'bottom',
            x: Math.max(10, Math.min(positions.bottom.x, viewport.width - tooltipRect.width - 10)),
            y: positions.bottom.y
        };
    }
};

console.log('CSS Positioning demo initialized');
```
*Figyeld meg: Relative = saját pozíciótól eltolás, Absolute = pozicionált szülőtől, Fixed = viewport-tól, Sticky = scroll-alapú.*

</div>

<div class="concept-section myths" data-filter="css">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Absolute positioning kiveszi az elemet a document flow-ból." → Igaz, de a positioning context fontos - relative szülő nélkül a body-hoz pozicionál
- „Fixed elemek mindig a viewport-hoz viszonyítanak." → Transform-mal rendelkező szülő új stacking context-et hoz létre
- „Sticky positioning ugyanaz mint fixed." → Sticky csak addig ragad, amíg a szülő element látható

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="css">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Positioning összefoglaló:**
```css
/* Static - default, normal flow */
position: static;

/* Relative - offset from normal position */
position: relative;
top: 10px; left: 20px;

/* Absolute - positioned relative to nearest positioned ancestor */
position: absolute;
top: 0; right: 0;

/* Fixed - positioned relative to viewport */
position: fixed;
bottom: 20px; right: 20px;

/* Sticky - toggles between relative and fixed */
position: sticky;
top: 0; /* stick point */
```

**Centering patterns:**
```css
/* Absolute center */
position: absolute;
top: 50%; left: 50%;
transform: translate(-50%, -50%);

/* Fixed center */
position: fixed;
top: 50%; left: 50%;
transform: translate(-50%, -50%);
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="css medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Hogyan működik a z-index és mikor nem hat?**
A: Z-index csak positioned elemeken működik (relative, absolute, fixed, sticky). Stacking context-en belül érvényes.

**Q: Mi a különbség a sticky és fixed positioning között?**
A: Sticky relative-ként viselkedik amíg eléri a threshold-ot, aztán fixed-ként. Fixed mindig a viewport-hoz pozicionál.

**Q: Hogyan oldanád meg a modal backdrop scroll problémát?**
A: body { overflow: hidden } modal megnyitásakor, body { overflow: auto } bezárásakor, vagy position: fixed a body-n.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="css">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **CSS Grid/Flexbox** → Modern layout mellett positioning finomhangoláshoz
- **Z-index** → Stacking context és layer management
- **Transform** → Positioning animációkhoz és centering-hez
- **Responsive Design** → Positioning strategy különböző viewport-okban
- **JavaScript** → Dynamic positioning és scroll effects

</div>

</details>

</div>

### Debounce és Throttle {#debounce-throttle}

<div class="concept-section mental-model" data-filter="performance medior">

🧭 **Így gondolj rá**  
*Debounce mint lift: várja hogy több ember beszálljon mielőtt indul. Throttle mint buszmegálló: fix időközönként indul, függetlenül attól hányan várnak.*

</div>

<div class="concept-section why-important" data-filter="performance medior">

💡 **Miért számít?**
- **Performance optimization**: túl gyakori függvényhívások elkerülése
- **User experience**: smooth scroll, responsive search, input validation
- **API rate limiting**: server túlterhelés megelőzése
- **Memory management**: event listener stack overflow prevention

</div>

<div class="runnable-model" data-filter="performance">

**Runnable mental model**
```javascript
// Debounce és Throttle Comprehensive Guide

// ============================================
// 1. ALAPVETŐ IMPLEMENTÁCIÓK
// ============================================

/**
 * Debounce: Csak akkor hívja meg a függvényt, ha nem történt újabb hívás
 * a megadott időn belül. Újraindítja a timert minden új hívásnál.
 */
function debounce(func, delay) {
    let timeoutId;
    
    return function (...args) {
        // Törli az előző timer-t
        clearTimeout(timeoutId);
        
        // Új timer indítása
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

/**
 * Throttle: Maximum egyszer hajtja végre a függvényt a megadott időintervallumon belül.
 * Az első hívást azonnal végrehajtja, aztán blokkolja a további hívásokat.
 */
function throttle(func, delay) {
    let lastCall = 0;
    
    return function (...args) {
        const now = Date.now();
        
        if (now - lastCall >= delay) {
            lastCall = now;
            func.apply(this, args);
        }
    };
}

// ============================================
// 2. FEJLETT IMPLEMENTÁCIÓK
// ============================================

/**
 * Fejlett debounce immediate execution lehetőséggel
 */
function advancedDebounce(func, delay, immediate = false) {
    let timeoutId;
    let lastArgs;
    
    const debounced = function (...args) {
        lastArgs = args;
        
        const callNow = immediate && !timeoutId;
        
        clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
            timeoutId = null;
            if (!immediate) {
                func.apply(this, lastArgs);
            }
        }, delay);
        
        if (callNow) {
            func.apply(this, args);
        }
    };
    
    // Cancel függvény hozzáadása
    debounced.cancel = function () {
        clearTimeout(timeoutId);
        timeoutId = null;
    };
    
    return debounced;
}

/**
 * Fejlett throttle leading és trailing execution kontrollal
 */
function advancedThrottle(func, delay, options = {}) {
    const { leading = true, trailing = true } = options;
    let timeoutId;
    let lastCall = 0;
    let lastArgs;
    
    const throttled = function (...args) {
        lastArgs = args;
        const now = Date.now();
        
        if (!lastCall && !leading) {
            lastCall = now;
        }
        
        const remaining = delay - (now - lastCall);
        
        if (remaining <= 0 || remaining > delay) {
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
            lastCall = now;
            func.apply(this, args);
        } else if (!timeoutId && trailing) {
            timeoutId = setTimeout(() => {
                lastCall = leading ? Date.now() : 0;
                timeoutId = null;
                func.apply(this, lastArgs);
            }, remaining);
        }
    };
    
    throttled.cancel = function () {
        clearTimeout(timeoutId);
        timeoutId = null;
        lastCall = 0;
    };
    
    return throttled;
}

// ============================================
// 3. PRAKTIKUS HASZNÁLATI ESETEK
// ============================================

class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupSearchDebounce();
        this.setupScrollThrottle();
        this.setupResizeHandling();
        this.setupInputValidation();
        this.setupAPICallManagement();
        this.setupAnimationFrameThrottle();
    }
    
    // ===== SEARCH DEBOUNCE =====
    setupSearchDebounce() {
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');
        const searchSpinner = document.getElementById('search-spinner');
        
        if (!searchInput) return;
        
        // Debounced search function
        const debouncedSearch = debounce(async (query) => {
            if (query.length < 2) {
                searchResults.innerHTML = '';
                return;
            }
            
            searchSpinner.style.display = 'block';
            
            try {
                const results = await this.performSearch(query);
                this.displaySearchResults(results, searchResults);
            } catch (error) {
                console.error('Search error:', error);
                searchResults.innerHTML = '<div class="error">Search failed. Please try again.</div>';
            } finally {
                searchSpinner.style.display = 'none';
            }
        }, 300);
        
        // Instant feedback debounce
        const instantFeedback = debounce((query) => {
            const charCount = document.getElementById('char-count');
            if (charCount) {
                charCount.textContent = `${query.length} characters`;
            }
        }, 50);
        
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            debouncedSearch(query);
            instantFeedback(query);
        });
    }
    
    async performSearch(query) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));
        
        return [
            { id: 1, title: `Result for "${query}" #1`, description: 'Lorem ipsum dolor sit amet...' },
            { id: 2, title: `Result for "${query}" #2`, description: 'Consectetur adipiscing elit...' },
            { id: 3, title: `Result for "${query}" #3`, description: 'Sed do eiusmod tempor incididunt...' }
        ];
    }
    
    displaySearchResults(results, container) {
        container.innerHTML = results.map(result => `
            <div class="search-result" data-id="${result.id}">
                <h4>${result.title}</h4>
                <p>${result.description}</p>
            </div>
        `).join('');
    }
    
    // ===== SCROLL THROTTLE =====
    setupScrollThrottle() {
        let ticking = false;
        
        // Basic throttled scroll handler
        const throttledScrollHandler = throttle(() => {
            this.updateScrollPosition();
            this.handleScrollEffects();
        }, 16); // ~60fps
        
        // RAF-based scroll optimization
        const rafScrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollPosition();
                    this.handleScrollEffects();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        // Use RAF for smooth scrolling, throttle for heavy operations
        window.addEventListener('scroll', rafScrollHandler);
        window.addEventListener('scroll', throttledScrollHandler);
        
        // Intersection Observer alternatíva
        this.setupIntersectionObserver();
    }
    
    updateScrollPosition() {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        const progressBar = document.getElementById('scroll-progress');
        
        if (progressBar) {
            progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
        }
    }
    
    handleScrollEffects() {
        const navbar = document.getElementById('navbar');
        const backToTop = document.getElementById('back-to-top');
        
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        if (backToTop) {
            backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
        }
    }
    
    setupIntersectionObserver() {
        // Modernebb alternatíva scroll event-ekhez
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: [0, 0.25, 0.5, 0.75, 1]
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    this.trackElementView(entry.target.id);
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.observe-scroll').forEach(el => {
            observer.observe(el);
        });
    }
    
    trackElementView(elementId) {
        // Analytics tracking debounced
        const debouncedTrack = debounce((id) => {
            console.log(`Element viewed: ${id}`);
            // analytics.track('element_viewed', { element_id: id });
        }, 1000);
        
        debouncedTrack(elementId);
    }
    
    // ===== RESIZE HANDLING =====
    setupResizeHandling() {
        // Immediate layout updates
        const immediateResize = () => {
            this.updateViewportDimensions();
        };
        
        // Heavy recalculations debounced
        const debouncedResize = debounce(() => {
            this.recalculateLayout();
            this.updateResponsiveElements();
        }, 250);
        
        // Throttled smooth updates
        const throttledResize = throttle(() => {
            this.updateFluidElements();
        }, 100);
        
        window.addEventListener('resize', immediateResize);
        window.addEventListener('resize', debouncedResize);
        window.addEventListener('resize', throttledResize);
    }
    
    updateViewportDimensions() {
        const info = document.getElementById('viewport-info');
        if (info) {
            info.textContent = `${window.innerWidth}x${window.innerHeight}`;
        }
    }
    
    recalculateLayout() {
        // Heavy DOM calculations
        const elements = document.querySelectorAll('.responsive-element');
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            el.dataset.width = rect.width;
            el.dataset.height = rect.height;
        });
    }
    
    updateFluidElements() {
        // Smooth responsive updates
        const fluidElements = document.querySelectorAll('.fluid-element');
        fluidElements.forEach(el => {
            const scale = Math.min(window.innerWidth / 1200, 1);
            el.style.transform = `scale(${scale})`;
        });
    }
    
    // ===== INPUT VALIDATION =====
    setupInputValidation() {
        const forms = document.querySelectorAll('form[data-validate]');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                // Immediate visual feedback
                const instantValidation = () => {
                    this.showValidationIndicator(input);
                };
                
                // Debounced full validation
                const debouncedValidation = debounce(() => {
                    this.validateField(input);
                }, 500);
                
                // Real-time character validation (throttled)
                const throttledCharValidation = throttle(() => {
                    this.validateCharacters(input);
                }, 100);
                
                input.addEventListener('input', instantValidation);
                input.addEventListener('input', debouncedValidation);
                input.addEventListener('input', throttledCharValidation);
                
                // Immediate validation on blur
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
            });
        });
    }
    
    showValidationIndicator(input) {
        const indicator = input.parentNode.querySelector('.validation-indicator');
        if (indicator) {
            indicator.className = 'validation-indicator checking';
            indicator.textContent = '⏳';
        }
    }
    
    validateField(input) {
        const isValid = this.performValidation(input);
        const indicator = input.parentNode.querySelector('.validation-indicator');
        
        if (indicator) {
            indicator.className = `validation-indicator ${isValid ? 'valid' : 'invalid'}`;
            indicator.textContent = isValid ? '✓' : '✗';
        }
        
        input.classList.toggle('valid', isValid);
        input.classList.toggle('invalid', !isValid);
    }
    
    validateCharacters(input) {
        const maxLength = input.getAttribute('maxlength');
        const counter = input.parentNode.querySelector('.char-counter');
        
        if (counter && maxLength) {
            const remaining = maxLength - input.value.length;
            counter.textContent = `${remaining} characters remaining`;
            counter.className = `char-counter ${remaining < 10 ? 'warning' : ''}`;
        }
    }
    
    performValidation(input) {
        const value = input.value.trim();
        const type = input.type;
        
        switch (type) {
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            case 'tel':
                return /^\+?[\d\s\-\(\)]+$/.test(value);
            case 'url':
                try {
                    new URL(value);
                    return true;
                } catch {
                    return false;
                }
            default:
                return value.length >= (input.getAttribute('minlength') || 0);
        }
    }
    
    // ===== API CALL MANAGEMENT =====
    setupAPICallManagement() {
        this.apiCallQueue = new Map();
        this.setupAPIRateLimiting();
    }
    
    setupAPIRateLimiting() {
        // Debounced API calls to prevent spam
        this.debouncedAPICall = debounce(async (endpoint, data, callback) => {
            try {
                const response = await this.makeAPICall(endpoint, data);
                callback(null, response);
            } catch (error) {
                callback(error, null);
            }
        }, 300);
        
        // Throttled API calls for real-time features
        this.throttledAPICall = throttle(async (endpoint, data, callback) => {
            try {
                const response = await this.makeAPICall(endpoint, data);
                callback(null, response);
            } catch (error) {
                callback(error, null);
            }
        }, 1000);
    }
    
    async makeAPICall(endpoint, data) {
        // Simulate API call
        console.log(`API Call: ${endpoint}`, data);
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
        return { success: true, data: `Response from ${endpoint}` };
    }
    
    // Auto-save feature with debounce
    setupAutoSave() {
        const editors = document.querySelectorAll('[data-autosave]');
        
        editors.forEach(editor => {
            const saveInterval = editor.dataset.autosave || 5000;
            
            const debouncedSave = debounce(() => {
                this.saveContent(editor.id, editor.value);
            }, parseInt(saveInterval));
            
            editor.addEventListener('input', debouncedSave);
        });
    }
    
    saveContent(editorId, content) {
        localStorage.setItem(`autosave_${editorId}`, content);
        console.log(`Auto-saved content for ${editorId}`);
        
        // Visual feedback
        const saveIndicator = document.getElementById(`save-indicator-${editorId}`);
        if (saveIndicator) {
            saveIndicator.textContent = 'Saved';
            saveIndicator.className = 'save-indicator saved';
            
            setTimeout(() => {
                saveIndicator.className = 'save-indicator';
            }, 2000);
        }
    }
    
    // ===== ANIMATION FRAME THROTTLE =====
    setupAnimationFrameThrottle() {
        // requestAnimationFrame-based throttling for smooth animations
        let rafId;
        let isScheduled = false;
        
        const rafThrottle = (callback) => {
            return function (...args) {
                if (!isScheduled) {
                    isScheduled = true;
                    rafId = requestAnimationFrame(() => {
                        callback.apply(this, args);
                        isScheduled = false;
                    });
                }
            };
        };
        
        // Smooth mouse tracking
        const smoothMouseTracker = rafThrottle((e) => {
            this.updateMousePosition(e.clientX, e.clientY);
        });
        
        document.addEventListener('mousemove', smoothMouseTracker);
        
        // Smooth scroll updates
        const smoothScrollUpdater = rafThrottle(() => {
            this.updateParallaxElements();
            this.updateStickyElements();
        });
        
        window.addEventListener('scroll', smoothScrollUpdater);
    }
    
    updateMousePosition(x, y) {
        const cursor = document.getElementById('custom-cursor');
        if (cursor) {
            cursor.style.left = x + 'px';
            cursor.style.top = y + 'px';
        }
    }
    
    updateParallaxElements() {
        const parallaxElements = document.querySelectorAll('.parallax');
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            const offset = scrollTop * speed;
            el.style.transform = `translateY(${offset}px)`;
        });
    }
    
    updateStickyElements() {
        const stickyElements = document.querySelectorAll('.custom-sticky');
        const scrollTop = window.pageYOffset;
        
        stickyElements.forEach(el => {
            const offsetTop = el.dataset.offsetTop || 0;
            if (scrollTop >= offsetTop) {
                el.classList.add('stuck');
            } else {
                el.classList.remove('stuck');
            }
        });
    }
}

// ============================================
// 4. UTILITY FUNCTIONS ÉS PATTERNS
// ============================================

// Compose multiple debounced/throttled functions
function composeOptimized(...functions) {
    return function (...args) {
        functions.forEach(fn => {
            if (typeof fn === 'function') {
                fn.apply(this, args);
            }
        });
    };
}

// Adaptive throttling based on performance
function adaptiveThrottle(func, minDelay = 16, maxDelay = 100) {
    let lastCall = 0;
    let adaptiveDelay = minDelay;
    
    return function (...args) {
        const now = Date.now();
        const timeSinceLastCall = now - lastCall;
        
        // Adjust delay based on call frequency
        if (timeSinceLastCall < adaptiveDelay / 2) {
            adaptiveDelay = Math.min(maxDelay, adaptiveDelay * 1.5);
        } else if (timeSinceLastCall > adaptiveDelay * 2) {
            adaptiveDelay = Math.max(minDelay, adaptiveDelay * 0.8);
        }
        
        if (timeSinceLastCall >= adaptiveDelay) {
            lastCall = now;
            func.apply(this, args);
        }
    };
}

// Batched execution for multiple similar operations
function batchProcessor(processor, batchSize = 10, delay = 100) {
    let batch = [];
    let timeoutId;
    
    return function (item) {
        batch.push(item);
        
        if (batch.length >= batchSize) {
            // Process immediately when batch is full
            processor([...batch]);
            batch = [];
            clearTimeout(timeoutId);
        } else {
            // Process after delay if batch is not full
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                if (batch.length > 0) {
                    processor([...batch]);
                    batch = [];
                }
            }, delay);
        }
    };
}

// Smart debounce with different delays for different events
function smartDebounce(func, config = {}) {
    const timers = new Map();
    
    return function (eventType, ...args) {
        const delay = config[eventType] || config.default || 300;
        const timerId = timers.get(eventType);
        
        clearTimeout(timerId);
        
        const newTimerId = setTimeout(() => {
            func.apply(this, [eventType, ...args]);
            timers.delete(eventType);
        }, delay);
        
        timers.set(eventType, newTimerId);
    };
}

// ============================================
// 5. DEMO SETUP
// ============================================

// Create demo HTML
function createDebounceThrottleDemo() {
    const demoContainer = document.createElement('div');
    demoContainer.className = 'debounce-throttle-demo';
    demoContainer.innerHTML = `
        <style>
            .debounce-throttle-demo {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                max-width: 1200px;
                margin: 0 auto;
                padding: 2rem;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
            }
            
            .demo-section {
                background: white;
                margin: 2rem 0;
                padding: 2rem;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            }
            
            .demo-section h3 {
                color: #333;
                margin-bottom: 1rem;
                border-bottom: 2px solid #667eea;
                padding-bottom: 0.5rem;
            }
            
            .input-demo {
                margin: 1rem 0;
            }
            
            .input-demo label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 600;
                color: #555;
            }
            
            .input-demo input {
                width: 100%;
                padding: 0.75rem;
                border: 2px solid #ddd;
                border-radius: 6px;
                font-size: 1rem;
                transition: border-color 0.2s ease;
            }
            
            .input-demo input:focus {
                outline: none;
                border-color: #667eea;
            }
            
            .input-demo input.valid {
                border-color: #4caf50;
            }
            
            .input-demo input.invalid {
                border-color: #f44336;
            }
            
            .validation-indicator {
                display: inline-block;
                margin-left: 0.5rem;
                font-size: 1.2rem;
            }
            
            .validation-indicator.checking {
                color: #ff9800;
            }
            
            .validation-indicator.valid {
                color: #4caf50;
            }
            
            .validation-indicator.invalid {
                color: #f44336;
            }
            
            .char-counter {
                font-size: 0.875rem;
                color: #666;
                margin-top: 0.25rem;
            }
            
            .char-counter.warning {
                color: #ff9800;
                font-weight: 600;
            }
            
            .search-results {
                margin-top: 1rem;
                max-height: 300px;
                overflow-y: auto;
            }
            
            .search-result {
                padding: 1rem;
                border: 1px solid #eee;
                border-radius: 6px;
                margin-bottom: 0.5rem;
                transition: background-color 0.2s ease;
            }
            
            .search-result:hover {
                background-color: #f5f5f5;
            }
            
            .search-result h4 {
                margin: 0 0 0.5rem 0;
                color: #333;
            }
            
            .search-result p {
                margin: 0;
                color: #666;
                font-size: 0.875rem;
            }
            
            .counter-display {
                font-size: 1.5rem;
                font-weight: bold;
                color: #667eea;
                margin: 1rem 0;
                text-align: center;
                padding: 1rem;
                border: 2px dashed #667eea;
                border-radius: 8px;
            }
            
            .button-group {
                display: flex;
                gap: 1rem;
                margin: 1rem 0;
                flex-wrap: wrap;
            }
            
            .demo-button {
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 1rem;
                font-weight: 600;
                transition: all 0.2s ease;
            }
            
            .demo-button.primary {
                background: #667eea;
                color: white;
            }
            
            .demo-button.primary:hover {
                background: #5a6fd8;
                transform: translateY(-2px);
            }
            
            .demo-button.secondary {
                background: #f5f5f5;
                color: #333;
                border: 2px solid #ddd;
            }
            
            .demo-button.secondary:hover {
                background: #eee;
                border-color: #ccc;
            }
            
            .log-display {
                background: #1e1e1e;
                color: #f5f5f5;
                padding: 1rem;
                border-radius: 6px;
                max-height: 200px;
                overflow-y: auto;
                font-family: 'Monaco', 'Consolas', monospace;
                font-size: 0.875rem;
                line-height: 1.4;
            }
            
            .log-entry {
                margin-bottom: 0.25rem;
            }
            
            .log-entry.debounce {
                color: #4caf50;
            }
            
            .log-entry.throttle {
                color: #2196f3;
            }
            
            .log-entry.normal {
                color: #ff9800;
            }
            
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                height: 4px;
                background: #667eea;
                z-index: 1000;
                transition: width 0.1s ease;
            }
            
            .viewport-info {
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                font-family: monospace;
                font-size: 0.875rem;
                z-index: 1000;
            }
            
            .observe-scroll {
                padding: 2rem;
                margin: 1rem 0;
                background: #f9f9f9;
                border-radius: 8px;
                transition: all 0.3s ease;
                opacity: 0.5;
                transform: translateY(20px);
            }
            
            .observe-scroll.in-view {
                opacity: 1;
                transform: translateY(0);
                background: #e8f5e8;
            }
            
            .parallax {
                height: 200px;
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                border-radius: 8px;
                margin: 2rem 0;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.5rem;
                font-weight: bold;
            }
        </style>
        
        <!-- Progress bar -->
        <div class="scroll-progress" id="scroll-progress"></div>
        
        <!-- Viewport info -->
        <div class="viewport-info" id="viewport-info">Viewport: Loading...</div>
        
        <!-- Search Demo -->
        <div class="demo-section">
            <h3>🔍 Search Debounce Demo</h3>
            <div class="input-demo">
                <label for="search-input">Search (debounced - waits 300ms after typing stops)</label>
                <input type="text" id="search-input" placeholder="Type to search...">
                <span class="validation-indicator" id="search-indicator"></span>
                <div id="char-count" class="char-counter"></div>
            </div>
            <div id="search-spinner" style="display: none; text-align: center; padding: 1rem;">
                <div style="display: inline-block; width: 20px; height: 20px; border: 2px solid #f3f3f3; border-top: 2px solid #667eea; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            </div>
            <div id="search-results" class="search-results"></div>
        </div>
        
        <!-- Input Validation Demo -->
        <div class="demo-section">
            <h3>✅ Input Validation (Debounced + Throttled)</h3>
            <form data-validate>
                <div class="input-demo">
                    <label for="email-input">Email (validated on input with debounce)</label>
                    <input type="email" id="email-input" placeholder="your@email.com" maxlength="50">
                    <span class="validation-indicator"></span>
                    <div class="char-counter"></div>
                </div>
                <div class="input-demo">
                    <label for="phone-input">Phone (throttled character validation)</label>
                    <input type="tel" id="phone-input" placeholder="+1 234 567 8900" maxlength="20">
                    <span class="validation-indicator"></span>
                    <div class="char-counter"></div>
                </div>
            </form>
        </div>
        
        <!-- Button Click Demo -->
        <div class="demo-section">
            <h3>🖱️ Button Click Comparison</h3>
            <div class="counter-display">
                <div>Normal: <span id="normal-counter">0</span></div>
                <div>Debounced: <span id="debounce-counter">0</span></div>
                <div>Throttled: <span id="throttle-counter">0</span></div>
            </div>
            <div class="button-group">
                <button class="demo-button primary" id="normal-button">Normal Click</button>
                <button class="demo-button primary" id="debounce-button">Debounced Click (500ms)</button>
                <button class="demo-button primary" id="throttle-button">Throttled Click (500ms)</button>
                <button class="demo-button secondary" id="reset-counters">Reset Counters</button>
            </div>
            <div class="log-display" id="click-log"></div>
        </div>
        
        <!-- Scroll Demo -->
        <div class="demo-section">
            <h3>📜 Scroll Effects Demo</h3>
            <p>Scroll down to see throttled scroll effects and intersection observer in action.</p>
            <div class="observe-scroll" id="scroll-section-1">
                <h4>Scroll Section 1</h4>
                <p>This section appears when it comes into view using Intersection Observer.</p>
            </div>
            <div class="parallax">Parallax Element 1</div>
            <div class="observe-scroll" id="scroll-section-2">
                <h4>Scroll Section 2</h4>
                <p>Another section with scroll-triggered animations.</p>
            </div>
            <div class="parallax">Parallax Element 2</div>
            <div class="observe-scroll" id="scroll-section-3">
                <h4>Scroll Section 3</h4>
                <p>The final section in our scroll demo.</p>
            </div>
        </div>
        
        <!-- Auto-save Demo -->
        <div class="demo-section">
            <h3>💾 Auto-save Demo</h3>
            <div class="input-demo">
                <label for="autosave-textarea">Content (auto-saves 2 seconds after typing stops)</label>
                <textarea id="autosave-textarea" data-autosave="2000" style="width: 100%; height: 120px; padding: 0.75rem; border: 2px solid #ddd; border-radius: 6px; resize: vertical;" placeholder="Start typing... your content will be auto-saved."></textarea>
                <div id="save-indicator-autosave-textarea" class="save-indicator"></div>
            </div>
        </div>
        
        <!-- Performance Metrics -->
        <div class="demo-section">
            <h3>📊 Performance Metrics</h3>
            <div id="performance-metrics" style="font-family: monospace; background: #f5f5f5; padding: 1rem; border-radius: 6px;">
                Loading metrics...
            </div>
        </div>
    `;
    
    document.body.appendChild(demoContainer);
    
    // Add required styles for animations
    const styles = document.createElement('style');
    styles.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .save-indicator {
            font-size: 0.875rem;
            margin-top: 0.5rem;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .save-indicator.saved {
            opacity: 1;
            color: #4caf50;
        }
    `;
    document.head.appendChild(styles);
}

// Initialize demo
document.addEventListener('DOMContentLoaded', () => {
    createDebounceThrottleDemo();
    
    // Initialize performance optimizer
    const optimizer = new PerformanceOptimizer();
    optimizer.setupAutoSave();
    
    // Setup button click demos
    setupClickDemos();
    setupPerformanceMonitoring();
});

function setupClickDemos() {
    let normalCount = 0;
    let debounceCount = 0;
    let throttleCount = 0;
    
    const normalCounter = document.getElementById('normal-counter');
    const debounceCounter = document.getElementById('debounce-counter');
    const throttleCounter = document.getElementById('throttle-counter');
    const clickLog = document.getElementById('click-log');
    
    function logClick(type, count) {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry ${type}`;
        logEntry.textContent = `[${timestamp}] ${type.toUpperCase()}: ${count}`;
        clickLog.appendChild(logEntry);
        clickLog.scrollTop = clickLog.scrollHeight;
        
        // Keep only last 20 entries
        while (clickLog.children.length > 20) {
            clickLog.removeChild(clickLog.firstChild);
        }
    }
    
    // Normal button
    document.getElementById('normal-button').addEventListener('click', () => {
        normalCount++;
        normalCounter.textContent = normalCount;
        logClick('normal', normalCount);
    });
    
    // Debounced button
    const debouncedClick = debounce(() => {
        debounceCount++;
        debounceCounter.textContent = debounceCount;
        logClick('debounce', debounceCount);
    }, 500);
    
    document.getElementById('debounce-button').addEventListener('click', debouncedClick);
    
    // Throttled button
    const throttledClick = throttle(() => {
        throttleCount++;
        throttleCounter.textContent = throttleCount;
        logClick('throttle', throttleCount);
    }, 500);
    
    document.getElementById('throttle-button').addEventListener('click', throttledClick);
    
    // Reset button
    document.getElementById('reset-counters').addEventListener('click', () => {
        normalCount = debounceCount = throttleCount = 0;
        normalCounter.textContent = '0';
        debounceCounter.textContent = '0';
        throttleCounter.textContent = '0';
        clickLog.innerHTML = '';
    });
}

function setupPerformanceMonitoring() {
    const metricsDisplay = document.getElementById('performance-metrics');
    
    const updateMetrics = throttle(() => {
        const metrics = {
            'Event Listeners': document.querySelectorAll('*').length,
            'Scroll Position': `${Math.round(window.scrollY)}px`,
            'Viewport Size': `${window.innerWidth}x${window.innerHeight}`,
            'Memory Usage': navigator.deviceMemory ? `${navigator.deviceMemory}GB` : 'Unknown',
            'Connection': navigator.connection ? navigator.connection.effectiveType : 'Unknown',
            'Timestamp': new Date().toLocaleTimeString()
        };
        
        metricsDisplay.innerHTML = Object.entries(metrics)
            .map(([key, value]) => `<div><strong>${key}:</strong> ${value}</div>`)
            .join('');
    }, 1000);
    
    // Update metrics periodically
    setInterval(updateMetrics, 1000);
    updateMetrics();
}

console.log('Debounce & Throttle demo initialized');
```

*Figyeld meg: Debounce = reset timer minden hívásnál, Throttle = fix időközönként egyszer, RAF = smooth animations.*

</div>

<div class="concept-section myths" data-filter="performance">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Throttle és debounce ugyanaz." → Throttle rendszeres intervals, debounce csak inaktivitás után hív meg
- „RequestAnimationFrame helyettesíti a throttle-t." → RAF csak 60fps-hez optimális, throttle rugalmasabb
- „Minden scroll event-et debounce-olni kell." → Scroll-hoz throttle vagy RAF jobb, debounce user input-hoz

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="performance">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Debounce vs Throttle:**
```javascript
// Debounce: wait for pause
const debouncedSearch = debounce(searchAPI, 300);
input.addEventListener('input', debouncedSearch);

// Throttle: regular intervals
const throttledScroll = throttle(updateProgress, 16);
window.addEventListener('scroll', throttledScroll);

// RAF: smooth animations
let ticking = false;
function smoothUpdate() {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateAnimations();
            ticking = false;
        });
        ticking = true;
    }
}
```

**Használati esetek:**
- Search input → debounce
- Scroll events → throttle/RAF  
- Button clicks → debounce
- Mouse tracking → RAF

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="performance medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mikor használnál debounce-t és mikor throttle-t?**
A: Debounce amikor meg akarsz várni hogy véget érjen a user input (search, validation). Throttle amikor rendszeres update-eket akarsz (scroll progress, mouse tracking).

**Q: Hogyan implementálnál cancel-lable debounce-t?**
A: clearTimeout-tal és egy exposed cancel method-dal a returned function-ön.

**Q: Mi a requestAnimationFrame előnye a setTimeout-hoz képest?**
A: Browser-optimalizált 60fps timing, automatic pausing háttérben, smooth animations biztosítása.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="performance">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Event Loop** → Async function execution és timing
- **Memory Management** → Event listener cleanup és memory leaks
- **User Experience** → Responsive interfaces és perceived performance
- **API Rate Limiting** → Server load management
- **Browser Performance** → 60fps target és rendering optimization

</div>

</details>

</div>

### Security alapok frontendben (XSS, CSRF, CSP) {#frontend-security}

<div class="concept-section mental-model" data-filter="security medior">

🧭 **Így gondolj rá**  
*Frontend security mint lakásbiztonság: XSS a betörő aki becsempészi magát (script injection), CSRF a személyiséglopó (fake requests), CSP a biztonsági kamerarendszer (content policy).*

</div>

<div class="concept-section why-important" data-filter="security medior">

💡 **Miért számít?**
- **User data protection**: személyes adatok és session védelem
- **Brand protection**: hack miatt elvesztett bizalom helyreállítása nehéz
- **Legal compliance**: GDPR, SOX, HIPAA szabályozások betartása
- **Business continuity**: security incidents megelőzése költséghatékonyabb mint utólagos javítás

</div>

<div class="runnable-model" data-filter="security">

**Runnable mental model**
```javascript
// Frontend Security Comprehensive Guide

// ============================================
// 1. XSS (Cross-Site Scripting) PROTECTION
// ============================================

class XSSProtection {
    constructor() {
        this.trustedOrigins = new Set(['https://trusted-domain.com']);
        this.allowedTags = new Set(['b', 'i', 'em', 'strong', 'p', 'br']);
        this.allowedAttributes = new Set(['class', 'id']);
    }
    
    // HTML Sanitization
    sanitizeHTML(html) {
        // Create isolated DOM environment
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Remove all script tags
        doc.querySelectorAll('script').forEach(script => script.remove());
        
        // Remove dangerous event handlers
        this.removeDangerousAttributes(doc);
        
        // Filter allowed tags
        this.filterAllowedTags(doc);
        
        return doc.body.innerHTML;
    }
    
    removeDangerousAttributes(doc) {
        const dangerousAttributes = [
            'onload', 'onclick', 'onmouseover', 'onerror', 'onblur',
            'onfocus', 'onchange', 'onsubmit', 'onkeydown', 'onkeyup',
            'onkeypress', 'onmousedown', 'onmouseup', 'onmousemove',
            'onmouseout', 'onmouseover', 'onresize', 'onscroll',
            'onunload', 'onbeforeunload', 'href', 'src'
        ];
        
        doc.querySelectorAll('*').forEach(element => {
            dangerousAttributes.forEach(attr => {
                if (element.hasAttribute(attr)) {
                    element.removeAttribute(attr);
                }
            });
            
            // Remove javascript: protocols
            ['href', 'src', 'action'].forEach(attr => {
                const value = element.getAttribute(attr);
                if (value && value.toLowerCase().startsWith('javascript:')) {
                    element.removeAttribute(attr);
                }
            });
        });
    }
    
    filterAllowedTags(doc) {
        const allElements = Array.from(doc.querySelectorAll('*'));
        
        allElements.forEach(element => {
            if (!this.allowedTags.has(element.tagName.toLowerCase())) {
                // Replace with safe element, keep content
                const replacement = doc.createElement('span');
                replacement.innerHTML = element.innerHTML;
                element.parentNode.replaceChild(replacement, element);
            }
        });
    }
    
    // Content Security Policy implementation
    setupCSP() {
        const cspDirectives = {
            'default-src': ["'self'"],
            'script-src': ["'self'", "'unsafe-inline'", 'https://trusted-cdn.com'],
            'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
            'img-src': ["'self'", 'data:', 'https:'],
            'font-src': ["'self'", 'https://fonts.gstatic.com'],
            'connect-src': ["'self'", 'https://api.trusted-service.com'],
            'frame-src': ["'none'"],
            'object-src': ["'none'"],
            'base-uri': ["'self'"],
            'form-action': ["'self'"],
            'frame-ancestors': ["'none'"],
            'upgrade-insecure-requests': [],
            'block-all-mixed-content': []
        };
        
        const cspString = Object.entries(cspDirectives)
            .map(([directive, sources]) => 
                sources.length > 0 ? `${directive} ${sources.join(' ')}` : directive
            )
            .join('; ');
        
        // Note: This would typically be set on the server
        console.log('CSP Header:', cspString);
        
        // Client-side CSP monitoring
        this.monitorCSPViolations();
        
        return cspString;
    }
    
    monitorCSPViolations() {
        document.addEventListener('securitypolicyviolation', (e) => {
            const violation = {
                blockedURI: e.blockedURI,
                violatedDirective: e.violatedDirective,
                originalPolicy: e.originalPolicy,
                sourceFile: e.sourceFile,
                lineNumber: e.lineNumber,
                timestamp: new Date().toISOString()
            };
            
            console.warn('CSP Violation:', violation);
            
            // Send to logging service
            this.logSecurityViolation(violation);
        });
    }
    
    async logSecurityViolation(violation) {
        try {
            await fetch('/api/security/csp-violation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(violation)
            });
        } catch (error) {
            console.error('Failed to log CSP violation:', error);
        }
    }
    
    // Input sanitization with whitelist approach
    sanitizeInput(input, type = 'text') {
        const sanitizers = {
            text: (str) => str.replace(/[<>\"'&]/g, (match) => {
                const entityMap = {
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#x27;',
                    '&': '&amp;'
                };
                return entityMap[match];
            }),
            
            email: (str) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const sanitized = this.sanitizeInput(str, 'text');
                return emailRegex.test(sanitized) ? sanitized : '';
            },
            
            url: (str) => {
                try {
                    const url = new URL(str);
                    // Only allow http/https protocols
                    if (!['http:', 'https:'].includes(url.protocol)) {
                        return '';
                    }
                    return url.toString();
                } catch {
                    return '';
                }
            },
            
            alphanumeric: (str) => str.replace(/[^a-zA-Z0-9]/g, ''),
            
            numeric: (str) => str.replace(/[^0-9.-]/g, '')
        };
        
        return sanitizers[type] ? sanitizers[type](input) : input;
    }
    
    // DOM-based XSS prevention
    safeDOMManipulation() {
        return {
            // Safe way to add text content
            setText: (element, text) => {
                element.textContent = text; // Never innerHTML for user content
            },
            
            // Safe way to add HTML (sanitized)
            setHTML: (element, html) => {
                element.innerHTML = this.sanitizeHTML(html);
            },
            
            // Safe attribute setting
            setAttribute: (element, attr, value) => {
                const safeAttributes = ['class', 'id', 'data-*', 'aria-*'];
                const dangerous = ['onclick', 'onload', 'href', 'src'];
                
                if (dangerous.includes(attr.toLowerCase())) {
                    console.warn(`Blocked dangerous attribute: ${attr}`);
                    return;
                }
                
                element.setAttribute(attr, this.sanitizeInput(value));
            },
            
            // Safe URL assignment
            setURL: (element, url) => {
                const sanitizedURL = this.sanitizeInput(url, 'url');
                if (sanitizedURL) {
                    element.href = sanitizedURL;
                }
            }
        };
    }
}

// ============================================
// 2. CSRF (Cross-Site Request Forgery) PROTECTION
// ============================================

class CSRFProtection {
    constructor() {
        this.tokenName = 'X-CSRF-Token';
        this.cookieName = 'csrf_token';
        this.init();
    }
    
    init() {
        this.setupTokenRefresh();
        this.interceptRequests();
        this.setupFormProtection();
    }
    
    // Generate CSRF token
    generateToken() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }
    
    // Get CSRF token from meta tag or cookie
    getToken() {
        // First try meta tag
        const metaToken = document.querySelector('meta[name="csrf-token"]');
        if (metaToken) {
            return metaToken.getAttribute('content');
        }
        
        // Fallback to cookie
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === this.cookieName) {
                return decodeURIComponent(value);
            }
        }
        
        return null;
    }
    
    // Set CSRF token in cookie
    setToken(token) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (24 * 60 * 60 * 1000)); // 24 hours
        
        document.cookie = `${this.cookieName}=${encodeURIComponent(token)}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`;
        
        // Also update meta tag
        let metaTag = document.querySelector('meta[name="csrf-token"]');
        if (!metaTag) {
            metaTag = document.createElement('meta');
            metaTag.name = 'csrf-token';
            document.head.appendChild(metaTag);
        }
        metaTag.content = token;
    }
    
    // Refresh token periodically
    setupTokenRefresh() {
        setInterval(async () => {
            try {
                const response = await fetch('/api/csrf/refresh', {
                    method: 'POST',
                    credentials: 'same-origin'
                });
                
                if (response.ok) {
                    const { token } = await response.json();
                    this.setToken(token);
                }
            } catch (error) {
                console.warn('CSRF token refresh failed:', error);
            }
        }, 30 * 60 * 1000); // Refresh every 30 minutes
    }
    
    // Intercept all AJAX requests to add CSRF token
    interceptRequests() {
        const originalFetch = window.fetch;
        
        window.fetch = async (input, init = {}) => {
            const url = typeof input === 'string' ? input : input.url;
            
            // Only add CSRF token to same-origin requests
            if (this.isSameOrigin(url)) {
                const token = this.getToken();
                if (token) {
                    init.headers = {
                        ...init.headers,
                        [this.tokenName]: token
                    };
                }
                
                // Ensure credentials are included for same-origin
                init.credentials = init.credentials || 'same-origin';
            }
            
            return originalFetch(input, init);
        };
        
        // Intercept XMLHttpRequest
        const originalOpen = XMLHttpRequest.prototype.open;
        const originalSend = XMLHttpRequest.prototype.send;
        
        XMLHttpRequest.prototype.open = function(method, url, ...args) {
            this._url = url;
            this._method = method;
            return originalOpen.call(this, method, url, ...args);
        };
        
        XMLHttpRequest.prototype.send = function(data) {
            if (this._url && this.isSameOrigin(this._url)) {
                const token = this.getToken();
                if (token) {
                    this.setRequestHeader(this.tokenName, token);
                }
            }
            return originalSend.call(this, data);
        };
    }
    
    isSameOrigin(url) {
        try {
            const urlObj = new URL(url, window.location.origin);
            return urlObj.origin === window.location.origin;
        } catch {
            return false;
        }
    }
    
    // Automatically add CSRF tokens to forms
    setupFormProtection() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Check if the added node is a form or contains forms
                        const forms = node.tagName === 'FORM' ? [node] : 
                                     node.querySelectorAll ? Array.from(node.querySelectorAll('form')) : [];
                        
                        forms.forEach(form => this.protectForm(form));
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        // Protect existing forms
        document.querySelectorAll('form').forEach(form => this.protectForm(form));
    }
    
    protectForm(form) {
        // Skip forms that already have CSRF protection
        if (form.querySelector('input[name="_token"]')) {
            return;
        }
        
        // Skip external forms
        const action = form.getAttribute('action');
        if (action && !this.isSameOrigin(action)) {
            return;
        }
        
        const token = this.getToken();
        if (token) {
            const tokenInput = document.createElement('input');
            tokenInput.type = 'hidden';
            tokenInput.name = '_token';
            tokenInput.value = token;
            form.appendChild(tokenInput);
        }
    }
    
    // Validate referer header (additional protection)
    validateReferer() {
        const referer = document.referrer;
        const currentOrigin = window.location.origin;
        
        if (referer && !referer.startsWith(currentOrigin)) {
            console.warn('Suspicious referer detected:', referer);
            return false;
        }
        
        return true;
    }
}

// ============================================
// 3. CONTENT SECURITY POLICY (CSP) UTILITIES
// ============================================

class CSPManager {
    constructor() {
        this.nonces = new Map();
        this.reportingEndpoint = '/api/security/csp-report';
    }
    
    // Generate nonce for inline scripts/styles
    generateNonce() {
        const array = new Uint8Array(16);
        crypto.getRandomValues(array);
        return btoa(String.fromCharCode(...array));
    }
    
    // Create script with nonce
    createScript(content, nonce = null) {
        const script = document.createElement('script');
        
        if (!nonce) {
            nonce = this.generateNonce();
        }
        
        script.setAttribute('nonce', nonce);
        script.textContent = content;
        
        return script;
    }
    
    // Create style with nonce
    createStyle(content, nonce = null) {
        const style = document.createElement('style');
        
        if (!nonce) {
            nonce = this.generateNonce();
        }
        
        style.setAttribute('nonce', nonce);
        style.textContent = content;
        
        return style;
    }
    
    // Dynamically load external script safely
    async loadScript(src, integrity = null) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            
            if (integrity) {
                script.integrity = integrity;
                script.crossOrigin = 'anonymous';
            }
            
            script.onload = () => resolve(script);
            script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
            
            // Check if URL is allowed by CSP
            if (this.isScriptSourceAllowed(src)) {
                document.head.appendChild(script);
            } else {
                reject(new Error(`Script source not allowed by CSP: ${src}`));
            }
        });
    }
    
    isScriptSourceAllowed(src) {
        // This would ideally check against the actual CSP policy
        // For demo purposes, we'll check against a whitelist
        const allowedDomains = [
            'https://cdnjs.cloudflare.com',
            'https://cdn.jsdelivr.net',
            'https://unpkg.com'
        ];
        
        try {
            const url = new URL(src);
            return allowedDomains.some(domain => url.origin === domain) || 
                   url.origin === window.location.origin;
        } catch {
            return false;
        }
    }
    
    // Report CSP violations
    reportViolation(violation) {
        fetch(this.reportingEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(violation)
        }).catch(error => {
            console.error('Failed to report CSP violation:', error);
        });
    }
}

// ============================================
// 4. SECURE COMMUNICATION
// ============================================

class SecureCommunication {
    constructor() {
        this.apiKey = this.getAPIKey();
        this.sessionId = this.generateSessionId();
    }
    
    getAPIKey() {
        // In real implementation, this would come from secure authentication
        return localStorage.getItem('api_key') || this.generateAPIKey();
    }
    
    generateAPIKey() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }
    
    generateSessionId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    // Secure API request with proper headers
    async secureRequest(url, options = {}) {
        const defaultHeaders = {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest', // CSRF protection
            'X-Session-ID': this.sessionId,
            'Authorization': `Bearer ${this.apiKey}`
        };
        
        const secureOptions = {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers
            },
            credentials: 'same-origin', // Include cookies for same-origin requests
            mode: 'cors', // Enable CORS
            cache: 'no-store' // Prevent caching of sensitive data
        };
        
        try {
            const response = await fetch(url, secureOptions);
            
            // Check for security headers in response
            this.validateResponseHeaders(response);
            
            return response;
        } catch (error) {
            console.error('Secure request failed:', error);
            throw error;
        }
    }
    
    validateResponseHeaders(response) {
        const securityHeaders = {
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block',
            'Strict-Transport-Security': /max-age=\d+/,
            'Content-Security-Policy': /.+/
        };
        
        Object.entries(securityHeaders).forEach(([header, expected]) => {
            const value = response.headers.get(header);
            
            if (!value) {
                console.warn(`Missing security header: ${header}`);
            } else if (expected instanceof RegExp && !expected.test(value)) {
                console.warn(`Invalid security header ${header}: ${value}`);
            } else if (typeof expected === 'string' && value !== expected) {
                console.warn(`Invalid security header ${header}: ${value}`);
            }
        });
    }
    
    // Encrypt sensitive data before storing
    async encryptData(data, key = null) {
        if (!key) {
            key = await this.generateEncryptionKey();
        }
        
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(JSON.stringify(data));
        
        const iv = crypto.getRandomValues(new Uint8Array(12));
        
        const encryptedData = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv: iv },
            key,
            dataBuffer
        );
        
        return {
            data: Array.from(new Uint8Array(encryptedData)),
            iv: Array.from(iv)
        };
    }
    
    async generateEncryptionKey() {
        return await crypto.subtle.generateKey(
            { name: 'AES-GCM', length: 256 },
            true,
            ['encrypt', 'decrypt']
        );
    }
}

// ============================================
// 5. SECURE STORAGE
// ============================================

class SecureStorage {
    constructor() {
        this.keyPrefix = 'secure_';
        this.sensitiveKeys = new Set(['password', 'token', 'key', 'secret']);
    }
    
    // Secure localStorage wrapper
    setItem(key, value, options = {}) {
        const { encrypt = false, expiry = null } = options;
        
        const data = {
            value: value,
            timestamp: Date.now(),
            expiry: expiry
        };
        
        if (this.isSensitiveKey(key) || encrypt) {
            console.warn(`Storing sensitive data "${key}" in localStorage is not recommended`);
            // In production, consider using secure HTTP-only cookies or server-side storage
        }
        
        try {
            localStorage.setItem(this.keyPrefix + key, JSON.stringify(data));
        } catch (error) {
            console.error('Failed to store data:', error);
        }
    }
    
    getItem(key) {
        try {
            const rawData = localStorage.getItem(this.keyPrefix + key);
            if (!rawData) return null;
            
            const data = JSON.parse(rawData);
            
            // Check expiry
            if (data.expiry && Date.now() > data.expiry) {
                this.removeItem(key);
                return null;
            }
            
            return data.value;
        } catch (error) {
            console.error('Failed to retrieve data:', error);
            return null;
        }
    }
    
    removeItem(key) {
        localStorage.removeItem(this.keyPrefix + key);
    }
    
    isSensitiveKey(key) {
        return this.sensitiveKeys.has(key.toLowerCase()) ||
               this.sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive));
    }
    
    // Clear sensitive data
    clearSensitiveData() {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith(this.keyPrefix) && this.isSensitiveKey(key)) {
                localStorage.removeItem(key);
            }
        });
    }
    
    // Setup automatic cleanup
    setupAutoCleanup() {
        setInterval(() => {
            this.cleanExpiredData();
        }, 60 * 60 * 1000); // Clean every hour
    }
    
    cleanExpiredData() {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith(this.keyPrefix)) {
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    if (data.expiry && Date.now() > data.expiry) {
                        localStorage.removeItem(key);
                    }
                } catch (error) {
                    // Remove corrupted data
                    localStorage.removeItem(key);
                }
            }
        });
    }
}

// ============================================
// 6. DEMO SETUP
// ============================================

function createSecurityDemo() {
    const demoContainer = document.createElement('div');
    demoContainer.className = 'security-demo';
    demoContainer.innerHTML = `
        <style>
            .security-demo {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                max-width: 1200px;
                margin: 0 auto;
                padding: 2rem;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
            }
            
            .security-section {
                background: white;
                margin: 2rem 0;
                padding: 2rem;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            }
            
            .security-section h3 {
                color: #333;
                margin-bottom: 1rem;
                border-bottom: 2px solid #e74c3c;
                padding-bottom: 0.5rem;
            }
            
            .demo-input {
                width: 100%;
                padding: 0.75rem;
                border: 2px solid #ddd;
                border-radius: 6px;
                margin: 0.5rem 0;
                font-size: 1rem;
            }
            
            .demo-button {
                background: #e74c3c;
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 6px;
                cursor: pointer;
                font-size: 1rem;
                margin: 0.5rem;
                transition: background-color 0.2s ease;
            }
            
            .demo-button:hover {
                background: #c0392b;
            }
            
            .demo-button.safe {
                background: #27ae60;
            }
            
            .demo-button.safe:hover {
                background: #229954;
            }
            
            .result-display {
                background: #f8f9fa;
                border: 1px solid #e9ecef;
                border-radius: 6px;
                padding: 1rem;
                margin: 1rem 0;
                font-family: monospace;
                white-space: pre-wrap;
            }
            
            .vulnerability {
                background: #ffe6e6;
                border-left: 4px solid #e74c3c;
                padding: 1rem;
                margin: 1rem 0;
            }
            
            .safe-practice {
                background: #e8f5e9;
                border-left: 4px solid #4caf50;
                padding: 1rem;
                margin: 1rem 0;
            }
            
            .warning {
                background: #fff3cd;
                border-left: 4px solid #ffc107;
                padding: 1rem;
                margin: 1rem 0;
            }
            
            .log-output {
                background: #1e1e1e;
                color: #f5f5f5;
                padding: 1rem;
                border-radius: 6px;
                max-height: 200px;
                overflow-y: auto;
                font-family: monospace;
                font-size: 0.875rem;
            }
        </style>
        
        <!-- XSS Demo -->
        <div class="security-section">
            <h3>🚨 XSS (Cross-Site Scripting) Demo</h3>
            
            <div class="vulnerability">
                <h4>❌ Vulnerable Code (DON'T DO THIS)</h4>
                <p>This demonstrates how NOT to handle user input:</p>
                <input type="text" id="xss-vulnerable-input" class="demo-input" placeholder="Try: <script>alert('XSS')</script>">
                <button class="demo-button" onclick="document.getElementById('xss-vulnerable-output').innerHTML = document.getElementById('xss-vulnerable-input').value">
                    Insert Raw HTML (Vulnerable)
                </button>
                <div id="xss-vulnerable-output" class="result-display">Output will appear here...</div>
            </div>
            
            <div class="safe-practice">
                <h4>✅ Safe Implementation</h4>
                <p>This shows the proper way to handle user input:</p>
                <input type="text" id="xss-safe-input" class="demo-input" placeholder="Try: <script>alert('XSS')</script>">
                <button class="demo-button safe" id="xss-safe-button">Insert Sanitized Content</button>
                <div id="xss-safe-output" class="result-display">Sanitized output will appear here...</div>
            </div>
        </div>
        
        <!-- CSRF Demo -->
        <div class="security-section">
            <h3>🔒 CSRF (Cross-Site Request Forgery) Demo</h3>
            
            <div class="warning">
                <h4>⚠️ CSRF Protection Status</h4>
                <p>CSRF Token: <span id="csrf-token-display">Loading...</span></p>
                <button class="demo-button" id="refresh-csrf-token">Refresh Token</button>
            </div>
            
            <form id="csrf-protected-form">
                <h4>Protected Form</h4>
                <input type="text" name="username" class="demo-input" placeholder="Username" required>
                <input type="email" name="email" class="demo-input" placeholder="Email" required>
                <button type="submit" class="demo-button safe">Submit (CSRF Protected)</button>
            </form>
            
            <div id="csrf-form-result" class="result-display"></div>
        </div>
        
        <!-- CSP Demo -->
        <div class="security-section">
            <h3>🛡️ Content Security Policy (CSP) Demo</h3>
            
            <div class="safe-practice">
                <h4>CSP Configuration</h4>
                <div id="csp-policy-display" class="result-display">Loading CSP policy...</div>
            </div>
            
            <h4>Test CSP Violations</h4>
            <button class="demo-button" id="test-inline-script">Test Inline Script</button>
            <button class="demo-button" id="test-external-script">Test External Script</button>
            <button class="demo-button safe" id="test-safe-script">Test Safe Script</button>
            
            <div id="csp-test-results" class="result-display"></div>
            
            <h4>CSP Violation Log</h4>
            <div id="csp-violation-log" class="log-output">No violations detected.</div>
        </div>
        
        <!-- Secure Storage Demo -->
        <div class="security-section">
            <h3>🔐 Secure Storage Demo</h3>
            
            <div class="demo-input-group">
                <input type="text" id="storage-key" class="demo-input" placeholder="Storage key">
                <input type="text" id="storage-value" class="demo-input" placeholder="Storage value">
                <input type="number" id="storage-expiry" class="demo-input" placeholder="Expiry (minutes)">
            </div>
            
            <div class="button-group">
                <button class="demo-button" id="store-data">Store Data</button>
                <button class="demo-button" id="retrieve-data">Retrieve Data</button>
                <button class="demo-button" id="clear-sensitive">Clear Sensitive Data</button>
            </div>
            
            <div id="storage-result" class="result-display"></div>
        </div>
        
        <!-- Security Headers Demo -->
        <div class="security-section">
            <h3>📋 Security Headers Check</h3>
            <button class="demo-button safe" id="check-security-headers">Check Current Page Headers</button>
            <div id="security-headers-result" class="result-display"></div>
        </div>
    `;
    
    document.body.appendChild(demoContainer);
}

// Initialize security demos
document.addEventListener('DOMContentLoaded', () => {
    createSecurityDemo();
    
    // Initialize security classes
    const xssProtection = new XSSProtection();
    const csrfProtection = new CSRFProtection();
    const cspManager = new CSPManager();
    const secureStorage = new SecureStorage();
    
    // Setup XSS demo
    document.getElementById('xss-safe-button').addEventListener('click', () => {
        const input = document.getElementById('xss-safe-input').value;
        const output = document.getElementById('xss-safe-output');
        const sanitized = xssProtection.sanitizeHTML(input);
        output.innerHTML = `Sanitized: ${sanitized}`;
    });
    
    // Setup CSRF demo
    const token = csrfProtection.generateToken();
    csrfProtection.setToken(token);
    document.getElementById('csrf-token-display').textContent = token.substring(0, 16) + '...';
    
    document.getElementById('refresh-csrf-token').addEventListener('click', () => {
        const newToken = csrfProtection.generateToken();
        csrfProtection.setToken(newToken);
        document.getElementById('csrf-token-display').textContent = newToken.substring(0, 16) + '...';
    });
    
    document.getElementById('csrf-protected-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const result = document.getElementById('csrf-form-result');
        result.textContent = `Form submitted with CSRF token: ${csrfProtection.getToken().substring(0, 16)}...`;
    });
    
    // Setup CSP demo
    const cspPolicy = xssProtection.setupCSP();
    document.getElementById('csp-policy-display').textContent = cspPolicy;
    
    // Setup storage demo
    secureStorage.setupAutoCleanup();
    
    document.getElementById('store-data').addEventListener('click', () => {
        const key = document.getElementById('storage-key').value;
        const value = document.getElementById('storage-value').value;
        const expiry = document.getElementById('storage-expiry').value;
        
        const options = {};
        if (expiry) {
            options.expiry = Date.now() + (expiry * 60 * 1000);
        }
        
        secureStorage.setItem(key, value, options);
        document.getElementById('storage-result').textContent = `Stored: ${key} = ${value}`;
    });
    
    document.getElementById('retrieve-data').addEventListener('click', () => {
        const key = document.getElementById('storage-key').value;
        const value = secureStorage.getItem(key);
        document.getElementById('storage-result').textContent = `Retrieved: ${key} = ${value || 'null'}`;
    });
    
    document.getElementById('clear-sensitive').addEventListener('click', () => {
        secureStorage.clearSensitiveData();
        document.getElementById('storage-result').textContent = 'Cleared all sensitive data';
    });
    
    console.log('Security demo initialized');
});

// ============================================
// 7. SECURITY BEST PRACTICES CHECKLIST
// ============================================

const SecurityChecklist = {
    // Input validation and sanitization
    validateInput: {
        description: 'Always validate and sanitize user input',
        rules: [
            'Use whitelist approach for allowed characters',
            'Escape HTML entities in user content',
            'Validate data types and formats',
            'Set maximum length limits',
            'Use parameterized queries for database operations'
        ]
    },
    
    // Output encoding
    outputEncoding: {
        description: 'Properly encode output based on context',
        rules: [
            'Use textContent instead of innerHTML for user data',
            'HTML encode for HTML context',
            'JavaScript encode for JavaScript context',
            'URL encode for URL parameters',
            'CSS encode for CSS values'
        ]
    },
    
    // Authentication and authorization
    authSecurity: {
        description: 'Implement secure authentication',
        rules: [
            'Use strong password policies',
            'Implement multi-factor authentication',
            'Use secure session management',
            'Implement proper logout functionality',
            'Use HTTPS for all authentication requests'
        ]
    },
    
    // Data protection
    dataProtection: {
        description: 'Protect sensitive data',
        rules: [
            'Never store sensitive data in localStorage',
            'Use secure HTTP-only cookies for sessions',
            'Encrypt sensitive data at rest',
            'Use HTTPS for all data transmission',
            'Implement proper access controls'
        ]
    },
    
    // Security headers
    securityHeaders: {
        description: 'Configure security headers',
        rules: [
            'Content-Security-Policy: Prevent XSS',
            'X-Frame-Options: Prevent clickjacking',
            'X-Content-Type-Options: Prevent MIME sniffing',
            'Strict-Transport-Security: Enforce HTTPS',
            'X-XSS-Protection: Browser XSS filter'
        ]
    }
};

console.log('Frontend Security System initialized');
```

*Figyeld meg: XSS prevention = input sanitization + output encoding, CSRF = unique tokens, CSP = content policy restrictions.*

</div>

<div class="concept-section myths" data-filter="security">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „HTTPS minden biztonsági problémát megold." → HTTPS csak transport layer protection, application layer vulnerabilities továbbra is léteznek
- „Frontend security nem fontos, a backend véd." → Frontend az első védelmi vonal, user experience és data protection szempontjából kritikus
- „RegEx validation elég az input sanitization-höz." → Whitelist approach és context-aware encoding szükséges

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="security">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Security essentials:**
```javascript
// XSS prevention
element.textContent = userInput; // Safe
element.innerHTML = sanitizeHTML(userInput); // Safe

// CSRF protection
fetch('/api', {
    headers: { 'X-CSRF-Token': getToken() }
});

// CSP nonce
<script nonce="random-value">
// Safe inline script
</script>

// Secure storage
// BAD: localStorage.setItem('token', authToken);
// GOOD: Secure HTTP-only cookie or encrypted storage
```

**Security headers checklist:**
- Content-Security-Policy
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Strict-Transport-Security

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="security medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mi a különbség stored és reflected XSS között?**
A: Stored XSS a szerverben tárolódik (pl. komment), reflected XSS a URL-ben érkezik vissza (pl. search query). DOM-based XSS a client-side JavaScript-ben történik.

**Q: Hogyan védekezik a CSRF ellen Single Page Application-ben?**
A: CSRF token header-ben, SameSite cookie attribute, Double Submit Cookie pattern, vagy custom header használata.

**Q: Mikor használnál CSP nonce vs hash?**
A: Nonce dynamic content-hez (minden request új), hash static content-hez (ugyanaz a script többször).

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="security">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **HTTPS/TLS** → Transport layer security és certificate management
- **Authentication** → JWT tokens, OAuth, session management
- **Input Validation** → RegEx patterns, sanitization libraries
- **Browser APIs** → Web Crypto API, Trusted Types
- **DevOps Security** → Security headers, vulnerability scanning

</div>

</details>

</div>

### CORS {#cors}
Cross-Origin Resource Sharing - böngésző biztonsági mechanizmus a különböző domain-ek közötti kérések szabályozására.

**Példa:**
```javascript
// CORS handling on client side
const corsAwareRequest = async (url, options = {}) => {
    // Check if request is cross-origin
    const requestUrl = new URL(url);
    const currentOrigin = window.location.origin;
    const isCrossOrigin = requestUrl.origin !== currentOrigin;
    
    if (isCrossOrigin) {
        console.log(`Cross-origin request to: ${requestUrl.origin}`);
    }
    
    // Configure request with CORS headers
    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            // Add custom headers that might trigger preflight
            'X-Requested-With': 'XMLHttpRequest',
            ...options.headers
        },
        // Include credentials if needed
        credentials: 'include', // or 'same-origin' or 'omit'
        // Control cache
        mode: 'cors' // 'same-origin', 'no-cors', or 'cors'
    };
    
    try {
        const response = await fetch(url, config);
        
        // Check CORS headers in response
        const accessControlHeaders = {
            allowOrigin: response.headers.get('Access-Control-Allow-Origin'),
            allowMethods: response.headers.get('Access-Control-Allow-Methods'),
            allowHeaders: response.headers.get('Access-Control-Allow-Headers'),
            allowCredentials: response.headers.get('Access-Control-Allow-Credentials')
        };
        
        console.log('CORS headers:', accessControlHeaders);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('CORS')) {
            console.error('CORS error detected:', error.message);
            throw new Error('Cross-origin request blocked by CORS policy');
        }
        throw error;
    }
};

// JSONP fallback for old browsers (not recommended for modern apps)
const jsonpRequest = (url, callbackName = 'callback') => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        const callbackId = `jsonp_${Date.now()}_${Math.random().toString(36).substr(2)}`;
        
        // Create global callback
        window[callbackId] = (data) => {
            document.head.removeChild(script);
            delete window[callbackId];
            resolve(data);
        };
        
        // Error handling
        script.onerror = () => {
            document.head.removeChild(script);
            delete window[callbackId];
            reject(new Error('JSONP request failed'));
        };
        
        // Make request
        script.src = `${url}?${callbackName}=${callbackId}`;
        document.head.appendChild(script);
        
        // Timeout
        setTimeout(() => {
            if (window[callbackId]) {
                document.head.removeChild(script);
                delete window[callbackId];
                reject(new Error('JSONP request timeout'));
            }
        }, 10000);
    });
};

// Proxy pattern for development
const developmentProxy = {
    async makeRequest(endpoint, options = {}) {
        // In development, requests might go through a proxy
        const isDevelopment = process.env.NODE_ENV === 'development';
        const baseUrl = isDevelopment ? '/api/proxy' : 'https://api.example.com';
        
        const url = `${baseUrl}${endpoint}`;
        
        return await corsAwareRequest(url, {
            ...options,
            headers: {
                // Add development-specific headers
                'X-Development-Mode': isDevelopment.toString(),
                ...options.headers
            }
        });
    }
};

// Server-side CORS configuration example (Node.js/Express)
const corsConfigExample = `
// Express CORS middleware configuration
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://myapp.com',
        'https://www.myapp.com'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With'
    ],
    credentials: true,
    maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));

// Manual CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://myapp.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});
`;

// Usage examples
const apiService = {
    async getUsers() {
        return await corsAwareRequest('https://api.external.com/users');
    },
    
    async createUser(userData) {
        return await corsAwareRequest('https://api.external.com/users', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }
};
```

Magyarázat: CORS biztonsági mechanizmus, amely megakadályozza, hogy rosszindulatú weboldalak illetéktelenül hozzáférjenek más domain-ek erőforrásaihoz.

### Fetch API / AJAX {#fetch-api-ajax}
Modern aszinkron HTTP kérések JavaScript-ben a fetch API és a régebbi XMLHttpRequest használatával.

**Példa:**
```javascript
// Modern Fetch API implementation
class HttpClient {
    constructor(baseUrl, defaultHeaders = {}) {
        this.baseUrl = baseUrl;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            ...defaultHeaders
        };
        this.interceptors = {
            request: [],
            response: []
        };
    }
    
    // Request interceptor
    addRequestInterceptor(interceptor) {
        this.interceptors.request.push(interceptor);
    }
    
    // Response interceptor
    addResponseInterceptor(interceptor) {
        this.interceptors.response.push(interceptor);
    }
    
    async request(endpoint, options = {}) {
        let url = `${this.baseUrl}${endpoint}`;
        let config = {
            headers: { ...this.defaultHeaders, ...options.headers },
            ...options
        };
        
        // Apply request interceptors
        for (const interceptor of this.interceptors.request) {
            const result = await interceptor(url, config);
            url = result.url || url;
            config = result.config || config;
        }
        
        try {
            const response = await fetch(url, config);
            
            // Apply response interceptors
            let processedResponse = response;
            for (const interceptor of this.interceptors.response) {
                processedResponse = await interceptor(processedResponse);
            }
            
            return processedResponse;
        } catch (error) {
            console.error('Fetch error:', error);
            throw new Error(`Network error: ${error.message}`);
        }
    }
    
    // Convenience methods
    async get(endpoint, headers = {}) {
        const response = await this.request(endpoint, { method: 'GET', headers });
        return await response.json();
    }
    
    async post(endpoint, data, headers = {}) {
        const response = await this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            headers
        });
        return await response.json();
    }
    
    async put(endpoint, data, headers = {}) {
        const response = await this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers
        });
        return await response.json();
    }
    
    async delete(endpoint, headers = {}) {
        const response = await this.request(endpoint, { method: 'DELETE', headers });
        return response.ok;
    }
    
    // File upload with progress
    async uploadFile(endpoint, formData, onProgress = null) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            
            // Progress tracking
            if (onProgress) {
                xhr.upload.addEventListener('progress', (event) => {
                    if (event.lengthComputable) {
                        const percentComplete = (event.loaded / event.total) * 100;
                        onProgress(percentComplete);
                    }
                });
            }
            
            xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(new Error(`Upload failed: ${xhr.status}`));
                }
            });
            
            xhr.addEventListener('error', () => {
                reject(new Error('Upload failed'));
            });
            
            xhr.open('POST', `${this.baseUrl}${endpoint}`);
            
            // Add auth headers but not Content-Type (FormData sets it automatically)
            Object.entries(this.defaultHeaders).forEach(([key, value]) => {
                if (key !== 'Content-Type') {
                    xhr.setRequestHeader(key, value);
                }
            });
            
            xhr.send(formData);
        });
    }
}

// Usage example with interceptors
const apiClient = new HttpClient('https://api.example.com');

// Add authentication interceptor
apiClient.addRequestInterceptor(async (url, config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return { url, config };
});

// Add response error handling interceptor
apiClient.addResponseInterceptor(async (response) => {
    if (response.status === 401) {
        // Token expired, redirect to login
        localStorage.removeItem('authToken');
        window.location.href = '/login';
        throw new Error('Session expired');
    }
    return response;
});

// Legacy XMLHttpRequest wrapper
class LegacyHttpClient {
    static request(method, url, data = null, headers = {}) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            
            xhr.open(method, url);
            
            // Set headers
            Object.entries(headers).forEach(([key, value]) => {
                xhr.setRequestHeader(key, value);
            });
            
            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        try {
                            const response = JSON.parse(xhr.responseText);
                            resolve(response);
                        } catch {
                            resolve(xhr.responseText);
                        }
                    } else {
                        reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
                    }
                }
            };
            
            xhr.onerror = () => reject(new Error('Network error'));
            xhr.ontimeout = () => reject(new Error('Request timeout'));
            
            xhr.timeout = 10000; // 10 seconds
            
            if (data) {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(data));
            } else {
                xhr.send();
            }
        });
    }
}

// Practical usage examples
const userService = {
    async getUser(id) {
        try {
            return await apiClient.get(`/users/${id}`);
        } catch (error) {
            console.error('Failed to fetch user:', error);
            throw error;
        }
    },
    
    async createUser(userData) {
        return await apiClient.post('/users', userData);
    },
    
    async uploadAvatar(userId, file) {
        const formData = new FormData();
        formData.append('avatar', file);
        
        return await apiClient.uploadFile(`/users/${userId}/avatar`, formData, (progress) => {
            console.log(`Upload progress: ${progress.toFixed(2)}%`);
        });
    }
};
```

Magyarázat: A fetch API modern, Promise-alapú alternatívája az XMLHttpRequest-nek, egyszerűbb szintaxissal és jobb hibakezeléssel.

### Accessibility {#accessibility}
Webes akadálymentesség biztosítása ARIA attribútumokkal és szemantikus HTML-lel.

**Példa:**
```html
<!-- Accessible form example -->
<form class="accessible-form" role="form" aria-labelledby="form-title">
    <h2 id="form-title">Felhasználói regisztráció</h2>
    
    <fieldset>
        <legend>Személyes adatok</legend>
        
        <div class="form-group">
            <label for="full-name">
                Teljes név
                <span aria-label="kötelező mező" class="required">*</span>
            </label>
            <input 
                type="text" 
                id="full-name" 
                name="fullName"
                required
                aria-describedby="name-help name-error"
                aria-invalid="false"
            >
            <small id="name-help" class="help-text">
                Vezetéknév és keresztnév
            </small>
            <div id="name-error" class="error-message" aria-live="polite" hidden>
                <!-- Error message appears here -->
            </div>
        </div>
        
        <div class="form-group">
            <label for="email">Email cím *</label>
            <input 
                type="email" 
                id="email" 
                name="email"
                required
                aria-describedby="email-help email-error"
                autocomplete="email"
            >
            <small id="email-help" class="help-text">
                Érvényes email cím megadása szükséges
            </small>
            <div id="email-error" class="error-message" aria-live="polite" hidden></div>
        </div>
        
        <div class="form-group">
            <label for="password">Jelszó *</label>
            <input 
                type="password" 
                id="password" 
                name="password"
                required
                aria-describedby="password-help password-error"
                autocomplete="new-password"
                minlength="8"
            >
            <small id="password-help" class="help-text">
                Minimum 8 karakter, számok és betűk
            </small>
            <div id="password-error" class="error-message" aria-live="polite" hidden></div>
        </div>
    </fieldset>
    
    <fieldset>
        <legend>Beállítások</legend>
        
        <div class="checkbox-group" role="group" aria-labelledby="notifications-legend">
            <span id="notifications-legend" class="group-label">Értesítések</span>
            
            <label class="checkbox-label">
                <input type="checkbox" name="notifications" value="email" id="email-notifications">
                <span class="checkmark" aria-hidden="true"></span>
                Email értesítések
            </label>
            
            <label class="checkbox-label">
                <input type="checkbox" name="notifications" value="sms" id="sms-notifications">
                <span class="checkmark" aria-hidden="true"></span>
                SMS értesítések
            </label>
        </div>
        
        <div class="form-group">
            <label for="country">Ország</label>
            <select id="country" name="country" aria-describedby="country-help">
                <option value="">-- Válasszon országot --</option>
                <option value="hu">Magyarország</option>
                <option value="de">Németország</option>
                <option value="at">Ausztria</option>
            </select>
            <small id="country-help" class="help-text">
                Válassza ki az országot a legördülő menüből
            </small>
        </div>
    </fieldset>
    
    <div class="form-actions">
        <button type="submit" class="btn-primary" aria-describedby="submit-help">
            Regisztráció
        </button>
        <small id="submit-help" class="help-text">
            Enter billentyűvel is elküldhető
        </small>
    </div>
</form>

<!-- Accessible navigation -->
<nav class="main-navigation" role="navigation" aria-label="Főnavigáció">
    <ul class="nav-list">
        <li><a href="/" aria-current="page">Főoldal</a></li>
        <li><a href="/about">Rólunk</a></li>
        <li>
            <a href="/services" aria-expanded="false" aria-haspopup="true">
                Szolgáltatások
            </a>
            <ul class="dropdown-menu" aria-label="Szolgáltatások almenü">
                <li><a href="/services/web">Webfejlesztés</a></li>
                <li><a href="/services/mobile">Mobilalkalmazás</a></li>
            </ul>
        </li>
        <li><a href="/contact">Kapcsolat</a></li>
    </ul>
</nav>

<!-- Modal dialog -->
<div id="confirmation-modal" class="modal" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description" aria-hidden="true">
    <div class="modal-content">
        <h2 id="modal-title">Megerősítés szükséges</h2>
        <p id="modal-description">
            Biztosan törölni szeretné ezt az elemet? Ez a művelet nem vonható vissza.
        </p>
        <div class="modal-actions">
            <button type="button" class="btn-danger" id="confirm-delete">
                Törlés
            </button>
            <button type="button" class="btn-secondary" id="cancel-delete">
                Mégse
            </button>
        </div>
        <button type="button" class="modal-close" aria-label="Ablak bezárása">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</div>
```

```javascript
// Accessibility JavaScript helpers
class AccessibilityHelper {
    // Manage focus for modal dialogs
    static manageFocus(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        // Focus first element when modal opens
        firstElement?.focus();
        
        // Trap focus within modal
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
            
            // Close modal with Escape
            if (e.key === 'Escape') {
                this.closeModal(modal);
            }
        });
    }
    
    // Announce changes to screen readers
    static announceToScreenReader(message, priority = 'polite') {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', priority);
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only'; // Screen reader only
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        // Remove after announcement
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Handle form validation with accessibility
    static validateFormField(field, errorMessage = null) {
        const errorElement = document.getElementById(field.getAttribute('aria-describedby')?.split(' ').find(id => id.includes('error')));
        
        if (errorMessage) {
            field.setAttribute('aria-invalid', 'true');
            if (errorElement) {
                errorElement.textContent = errorMessage;
                errorElement.hidden = false;
            }
            // Announce error
            this.announceToScreenReader(`Hiba a ${field.labels[0]?.textContent || 'mező'}ben: ${errorMessage}`, 'assertive');
        } else {
            field.setAttribute('aria-invalid', 'false');
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.hidden = true;
            }
        }
    }
    
    // Skip links for keyboard navigation
    static addSkipLinks() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Ugrás a fő tartalomhoz';
        skipLink.className = 'skip-link';
        skipLink.tabIndex = 0;
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
}

// Form validation with accessibility
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.accessible-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameField = document.getElementById('full-name');
            const emailField = document.getElementById('email');
            const passwordField = document.getElementById('password');
            
            let hasErrors = false;
            
            // Validate name
            if (!nameField.value.trim()) {
                AccessibilityHelper.validateFormField(nameField, 'A név megadása kötelező');
                hasErrors = true;
            } else {
                AccessibilityHelper.validateFormField(nameField);
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                AccessibilityHelper.validateFormField(emailField, 'Érvényes email cím megadása szükséges');
                hasErrors = true;
            } else {
                AccessibilityHelper.validateFormField(emailField);
            }
            
            // Validate password
            if (passwordField.value.length < 8) {
                AccessibilityHelper.validateFormField(passwordField, 'A jelszónak legalább 8 karakter hosszúnak kell lennie');
                hasErrors = true;
            } else {
                AccessibilityHelper.validateFormField(passwordField);
            }
            
            if (!hasErrors) {
                AccessibilityHelper.announceToScreenReader('Regisztráció sikeresen elküldve');
                // Submit form
            }
        });
    }
    
    // Initialize accessibility features
    AccessibilityHelper.addSkipLinks();
});
```

```css
/* Accessibility CSS */
.sr-only {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
}

.skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    z-index: 1000;
}

.skip-link:focus {
    top: 6px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    .btn-primary {
        border: 2px solid;
    }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

/* Focus indicators */
*:focus {
    outline: 2px solid #4A90E2;
    outline-offset: 2px;
}

button:focus,
input:focus,
select:focus,
textarea:focus {
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.3);
}
```

Magyarázat: Az accessibility biztosítja, hogy a weboldalak mindenki számára használhatók legyenek, beleértve a fogyatékkal élő felhasználókat is.

## Gyakori hibák és buktatók

<div class="concept-section myths" data-filter="junior medior">

### Inline CSS és JavaScript használata

<details>
<summary>🧯 <strong>Karbantarthatósági problémák</strong></summary>

<div>

**❌ Hibás példa - Inline styles:**
```html
<!-- HIBÁS - Inline CSS -->
<div style="color: red; font-size: 18px; margin: 10px;">
    <p style="font-weight: bold;">Fontos szöveg</p>
    <button style="background: blue; color: white; padding: 10px;">Kattints</button>
</div>

<!-- HIBÁS - Inline JavaScript -->
<button onclick="alert('Hello!')">Click me</button>
```

**✅ Helyes megoldás - External files:**
```html
<!-- HTML -->
<div class="important-section">
    <p class="highlight-text">Fontos szöveg</p>
    <button class="primary-button" id="action-btn">Kattints</button>
</div>
```

```css
/* CSS file */
.important-section {
    color: red;
    font-size: 18px;
    margin: 10px;
}

.primary-button {
    background: var(--primary-color);
    color: white;
    padding: 10px;
}
```

```javascript
// JavaScript file
document.getElementById('action-btn').addEventListener('click', () => {
    alert('Hello!');
});
```

**Miért problémás:**
- Karbantartás nehézség
- Cache-elés lehetőségének elvesztése
- Content Security Policy problémák
- Kód duplikáció

</div>

</details>

### DOM manipuláció készen állás előtt

<details>
<summary>⚡ <strong>Timing problémák</strong></summary>

<div>

**❌ Hibás példa - Korai DOM hozzáférés:**
```html
<head>
    <script>
        // HIBÁS - DOM még nem létezik
        const button = document.getElementById('my-button');
        button.addEventListener('click', handleClick); // Error!
    </script>
</head>
<body>
    <button id="my-button">Click me</button>
</body>
```

**✅ Helyes megoldás - Proper timing:**
```html
<head>
    <script>
        // DOMContentLoaded event várakozás
        document.addEventListener('DOMContentLoaded', () => {
            const button = document.getElementById('my-button');
            button.addEventListener('click', handleClick);
        });
    </script>
</head>
<!-- VAGY -->
<body>
    <button id="my-button">Click me</button>
    <!-- Script a </body> elé -->
    <script src="script.js"></script>
</body>
```

**Modern megoldás - defer/async:**
```html
<head>
    <!-- async: letöltődik párhuzamosan, azonnal futtatódik -->
    <script async src="analytics.js"></script>
    
    <!-- defer: letöltődik párhuzamosan, DOM után futtatódik -->
    <script defer src="main.js"></script>
</head>
```

</div>

</details>

### Memory leak-ek JavaScript-ben

<details>
<summary>🧠 <strong>Memória kezelési problémák</strong></summary>

<div>

**❌ Hibás példa - Event listener leak:**
```javascript
// HIBÁS - event listener nem távolítjuk el
function addUser(userData) {
    const userElement = document.createElement('div');
    userElement.innerHTML = userData.name;
    
    // Event listener hozzáadása
    userElement.addEventListener('click', handleUserClick);
    
    document.body.appendChild(userElement);
    
    // Később userElement törlése, de listener megmarad!
    setTimeout(() => {
        document.body.removeChild(userElement);
        // Event listener még mindig a memóriában!
    }, 5000);
}
```

**✅ Helyes megoldás - Proper cleanup:**
```javascript
// Event listener eltávolítása
function addUser(userData) {
    const userElement = document.createElement('div');
    userElement.innerHTML = userData.name;
    
    const handleClick = () => {
        console.log('User clicked:', userData.name);
    };
    
    userElement.addEventListener('click', handleClick);
    document.body.appendChild(userElement);
    
    // Cleanup function
    const cleanup = () => {
        userElement.removeEventListener('click', handleClick);
        document.body.removeChild(userElement);
    };
    
    setTimeout(cleanup, 5000);
}

// Modern megoldás - AbortController
function addUserModern(userData) {
    const controller = new AbortController();
    const userElement = document.createElement('div');
    
    userElement.addEventListener('click', handleUserClick, {
        signal: controller.signal  // Automatikus cleanup
    });
    
    setTimeout(() => {
        controller.abort();  // Minden listener automatikusan eltávolítódik
        document.body.removeChild(userElement);
    }, 5000);
}
```

</div>

</details>

### CORS félreértés

<details>
<summary>🛡️ <strong>Cross-origin problémák</strong></summary>

<div>

**❌ Hibás megértés:**
```javascript
// HIBÁS - kliens oldalon próbáljuk "megoldani" a CORS-t
fetch('https://api.external.com/data', {
    headers: {
        'Access-Control-Allow-Origin': '*',  // Ez nem így működik!
        'Content-Type': 'application/json'
    }
});
```

**✅ Helyes megoldás - Szerver oldali konfiguráció:**
```javascript
// Server-side (Express.js)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://mydomain.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Kliens oldal - csak a request-et küldjük
fetch('https://api.external.com/data', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
});
```

**Development workaround - Proxy:**
```javascript
// Development környezetben proxy használata (webpack, vite)
// vite.config.js
export default {
    server: {
        proxy: {
            '/api': {
                target: 'https://api.external.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
};
```

</div>

</details>

</div>

## Interjúkérdések és válaszok

<div class="concept-section interview-pitfalls" data-filter="junior medior">

<details>
<summary>💼 <strong>Gyakori interjúkérdések - Junior szint</strong></summary>

<div>

**Q: Mi a különbség a GET és POST között?**
> GET idempotent, URL-ben küldi a paramétereket, cache-elhető; POST nem idempotent, body-ban küldi az adatokat.

**Q: Mit jelent a 404 és 500 státuszkód?**
> 404 Not Found - kért erőforrás nem található; 500 Internal Server Error - szerver belső hibája.

**Q: Hogyan működik a CSS Box Model?**
> Content + padding + border + margin - a width/height csak a content-re vonatkozik (standard box model).

**Q: Mi a különbség a let, const és var között?**
> var function-scoped, hoisted; let/const block-scoped, temporal dead zone; const értéke nem módosítható.

**Q: Mi a Flexbox és mikor használnád?**
> 1D layout model, ideális navbar-okhoz, center alignment-hez, space distribution-hez.

**Q: Hogyan implementálnál responsive design-t?**
> Mobile-first approach, CSS media queries, flexible grid systems, scalable images.

</div>

</details>

<details>
<summary>💼 <strong>Haladó interjúkérdések - Medior+ szint</strong></summary>

<div>

**Q: Hogyan működik az event bubbling?**
> Esemény a target elemről felfelé propagálódik a DOM fán keresztül a document-ig.

**Q: Mi a CORS és miért fontos?**
> Cross-Origin Resource Sharing - biztonsági mechanizmus a különböző domain-ek közötti kérések szabályozására.

**Q: Mik a Promise-ok és hogyan használod őket?**
> Aszinkron műveletek kezelésére, három állapot: pending, fulfilled, rejected; then/catch/finally methods.

**Q: Mi a különbség a == és === között?**
> == type coercion-nel összehasonlít, === strict equality ohne type conversion.

**Q: Hogyan optimalizálnád egy weboldal betöltési idejét?**
> Image optimization, CSS/JS minification, CDN, caching, lazy loading, code splitting.

**Q: Mi a local storage és session storage különbsége?**
> localStorage persistent, sessionStorage tab-specific; mindkettő 5-10MB limit, csak string tárolás.

**Q: Hogyan kezelnéd a Cross-Site Scripting (XSS) támadásokat?**
> Input sanitization, Content Security Policy, HttpOnly cookies, proper output encoding.

</div>

</details>

</div>

## Gyakorlati feladat

<div class="concept-section micro-learning" data-filter="junior medior">

<details>
<summary>🎯 <strong>Modern Web Stack Project</strong></summary>

<div>

### Reszponzív webalkalmazás készítése

**Feladat célja:** Készíts egy teljes értékű web alkalmazást modern technológiákkal, amely demonstrálja az összes tanult koncepciót.

**Technikai követelmények:**
```html
<!-- HTML5 struktura -->
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Modern web app">
    <title>Modern Web App</title>
</head>
<!-- Szemantikus HTML használata -->
```

**Fejlesztési checklist:**
- ✅ **HTML5 struktúra**: Szemantikus elemek, proper meta tag-ek, accessibility
- ✅ **CSS3 styling**: Grid/Flexbox layout, CSS Variables, animations
- ✅ **JavaScript functionality**: Fetch API, DOM manipulation, event handling
- ✅ **Responsive design**: Mobile-first approach, breakpoint-ok
- ✅ **Performance**: Image optimization, lazy loading, minification
- ✅ **Cross-browser**: Modern browser support, fallback-ek

**Konkrét feladatok:**
1. User registration form validáció
2. API data fetching és display
3. Interactive UI komponensek
4. Dark/light theme switcher
5. Progressive Web App features
6. Accessibility compliance (WCAG 2.1 AA)

**Értékelési kritériumok:**
- 📊 90+ Lighthouse score
- 🎯 Valid HTML5 és CSS3
- ⚡ < 3s loading time
- 📱 Mobile responsive
- ♿ Screen reader compatible

</div>

</details>

</div>

## Kapcsolódó témák

- [Frontend (React, TypeScript, Node.js)](/theory/frontend) - Modern frontend framework-ök
- [Testing](/theory/testing) - Web alkalmazások tesztelése
- [CI/CD & DevOps](/theory/devops) - Web deployment és hosting
- [SQL & Adatbázis](/theory/sql) - Backend integráció

## További olvasmányok

- [MDN Web Docs](https://developer.mozilla.org/) - Comprehensive web development resource
- [Web.dev](https://web.dev/) - Google web development best practices
- [Can I Use](https://caniuse.com/) - Browser compatibility tables
- [A List Apart](https://alistapart.com/) - Web design és development articles
- [CSS-Tricks](https://css-tricks.com/) - CSS tutorials és techniques
- [JavaScript.info](https://javascript.info/) - Modern JavaScript tutorial
- [Smashing Magazine](https://www.smashingmagazine.com/) - Web design és development magazine
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
