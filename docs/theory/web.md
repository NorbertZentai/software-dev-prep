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

📋 **Fogalom meghatározása**  
*A HTML (HyperText Markup Language) egy markup nyelv weboldalak struktúrájának definiálására. Tag-ekkel (elements) határozza meg a tartalmat: <div>, <p>, <h1>, <img>, stb. Szemantikus elemek: <header>, <nav>, <main>, <article>, <footer>. Attribútumok kiegészítő információt adnak (id, class, src, href). HTML5 az aktuális standard.*

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

📋 **Fogalom meghatározása**  
*CSS Grid kétdimenz

iós layout system (rows és columns), CSS Flexbox egydimenziós layout system (main axis: row vagy column). Grid: grid-template-columns/rows, grid-area, gap properties, explicit 2D positioning. Flexbox: justify-content (main axis), align-items (cross axis), flex-direction, flex-wrap. Grid complex page layouts-hoz, Flexbox component-level alignment-hez. Mindkettő responsive-ready media query-kkel.*

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

📋 **Fogalom meghatározása**  
*Modern JavaScript (ES6+ features): arrow functions (lexical this binding), destructuring (array/object unpacking), template literals (string interpolation), async/await (Promise-based async syntax sugar), classes (syntactic sugar over prototypes), modules (import/export), spread/rest operators, default parameters, Map/Set collections. Block-scoped let/const instead of var. Enhanced object literals, computed property names.*

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

---

### HTTP Request/Response anatómia {#http-request-response}

<div class="concept-section mental-model" data-filter="http junior">

📋 **Fogalom meghatározása**  
*Egy HTTP üzenet két fő részből áll: **Request** (kliens → szerver) és **Response** (szerver → kliens). Mindkettő tartalmaz egy **Start line**-t (method + URL vagy status code), **Headers**-t (metadata key-value párok), üres sort, és opcionális **Body**-t (payload data). Headers típusok: General (Cache-Control), Request (User-Agent), Response (Server), Entity (Content-Type). A kommunikáció stateless (állapotmentes), minden request független.*

</div>

<div class="concept-section why-important" data-filter="http junior">

💡 **Miért számít?**
- **API fejlesztés**: Request/Response struktúra ismerete elengedhetetlen
- **Debugging**: Network tab-ban látható minden üzenet része
- **Performance**: Headers befolyásolják a caching, compression, CORS működést
- **Security**: Biztonságos header-ek (CORS, CSP, HTTPS) védenek támadások ellen

</div>

<div class="runnable-model" data-filter="http">

**Runnable mental model**

**HTTP Request anatómia:**
```http
POST /api/users HTTP/1.1                         # Request Line
Host: api.example.com                             # Required header
User-Agent: Mozilla/5.0 (Windows NT 10.0)        # Client info
Accept: application/json, text/plain, */*        # Accepted response types
Accept-Language: en-US,en;q=0.9                  # Language preference
Accept-Encoding: gzip, deflate, br               # Compression support
Content-Type: application/json                    # Body format
Content-Length: 85                                # Body size in bytes
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...    # Auth token
Origin: https://example.com                       # CORS origin
Cookie: session=abc123; user_id=456              # Session cookies
                                                  # Empty line
{                                                 # Request Body (JSON)
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}
```

**HTTP Response anatómia:**
```http
HTTP/1.1 201 Created                             # Status Line
Date: Tue, 08 Oct 2025 10:15:30 GMT              # Response timestamp
Server: nginx/1.21.0                              # Server software
Content-Type: application/json; charset=utf-8    # Response body type
Content-Length: 156                               # Body size
Content-Encoding: gzip                            # Compression used
Cache-Control: no-cache, no-store, must-revalidate  # Caching policy
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"  # Resource version
Access-Control-Allow-Origin: https://example.com  # CORS header
Set-Cookie: session=xyz789; HttpOnly; Secure; SameSite=Strict  # New cookie
X-RateLimit-Limit: 100                            # Custom header
X-RateLimit-Remaining: 95
X-Response-Time: 45ms
                                                  # Empty line
{                                                 # Response Body (JSON)
  "id": "usr_123abc",
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "createdAt": "2025-10-08T10:15:30.123Z",
  "links": {
    "self": "/api/users/usr_123abc",
    "profile": "/api/users/usr_123abc/profile"
  }
}
```

**JavaScript példa - Headers kezelése:**
```javascript
// Request küldése custom headers-szel
const createUser = async (userData) => {
    const response = await fetch('https://api.example.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${getAccessToken()}`,
            'X-Request-ID': generateRequestId(),
            'X-Client-Version': '1.2.3'
        },
        body: JSON.stringify(userData),
        credentials: 'include' // Send cookies
    });

    // Response headers olvasása
    console.log('Status:', response.status, response.statusText);
    console.log('Content-Type:', response.headers.get('Content-Type'));
    console.log('ETag:', response.headers.get('ETag'));
    console.log('Rate Limit:', {
        limit: response.headers.get('X-RateLimit-Limit'),
        remaining: response.headers.get('X-RateLimit-Remaining')
    });

    // Response body feldolgozása
    const contentType = response.headers.get('Content-Type');
    if (contentType?.includes('application/json')) {
        return await response.json();
    } else if (contentType?.includes('text/')) {
        return await response.text();
    } else {
        return await response.blob();
    }
};

// Response headers iterálása
response.headers.forEach((value, key) => {
    console.log(`${key}: ${value}`);
});
```

**Fontos header típusok:**
```javascript
// General Headers (request és response-ban is)
const generalHeaders = {
    'Cache-Control': 'no-cache',           // Caching irányelvek
    'Connection': 'keep-alive',            // Kapcsolat típus
    'Date': 'Tue, 08 Oct 2025 10:15:30 GMT',
    'Pragma': 'no-cache',                  // Legacy cache control
    'Transfer-Encoding': 'chunked',        // Chunked transfer
    'Upgrade': 'websocket',                // Protocol upgrade
    'Via': '1.1 proxy.example.com'         // Proxy info
};

// Request Headers
const requestHeaders = {
    'Accept': 'application/json',          // Elfogadott formátum
    'Accept-Charset': 'utf-8',             // Karakter kódolás
    'Accept-Encoding': 'gzip, deflate',    // Kompresszió típus
    'Accept-Language': 'en-US,en;q=0.9',   // Nyelv preferencia
    'Authorization': 'Bearer token',        // Autentikáció
    'Cookie': 'session=abc123',            // Sütik
    'Host': 'api.example.com',             // Kötelező HTTP/1.1
    'Origin': 'https://example.com',       // CORS origin
    'Referer': 'https://example.com/page', // Előző oldal
    'User-Agent': 'Mozilla/5.0...'         // Kliens info
};

// Response Headers
const responseHeaders = {
    'Age': '3600',                         // Cache age másodpercben
    'Allow': 'GET, POST, PUT',             // Engedélyezett metódusok
    'Content-Encoding': 'gzip',            // Body compression
    'Content-Language': 'en-US',           // Content nyelve
    'Content-Length': '348',               // Body méret
    'Content-Location': '/documents/foo',  // Resource location
    'Content-Type': 'application/json',    // Body típus
    'ETag': '"33a64df551425fcc"',          // Version identifier
    'Expires': 'Thu, 01 Dec 2025 16:00:00 GMT',  // Lejárat
    'Last-Modified': 'Mon, 07 Oct 2025 12:00:00 GMT',
    'Location': '/users/123',              // Redirect/Created
    'Retry-After': '120',                  // 429/503 retry idő
    'Server': 'nginx/1.21.0',              // Server software
    'Set-Cookie': 'session=xyz; HttpOnly', // Cookie beállítás
    'Vary': 'Accept-Encoding',             // Cache variation
    'WWW-Authenticate': 'Bearer realm="api"'  // 401 auth info
};

// Security Headers
const securityHeaders = {
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',  // HSTS
    'Content-Security-Policy': "default-src 'self'",  // CSP
    'X-Content-Type-Options': 'nosniff',   // MIME type sniffing védelem
    'X-Frame-Options': 'DENY',             // Clickjacking védelem
    'X-XSS-Protection': '1; mode=block',   // XSS védelem
    'Referrer-Policy': 'no-referrer',      // Referer control
    'Permissions-Policy': 'geolocation=()'  // Feature policy
};
```
*Figyeld meg: Request line + headers + empty line + body struktúra mindkét irányban.*

</div>

<div class="concept-section myths" data-filter="http">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- **"HTTP request kötelezően tartalmaz body-t"** → **Valójában**: GET, DELETE, HEAD általában nincs body (bár technikailag lehetséges)
- **"Headers case-sensitive"** → **Valójában**: Case-insensitive (Content-Type = content-type = CONTENT-TYPE)
- **"Cookie és Authorization ugyanaz"** → **Valójában**: Cookie automatic, Authorization manual header küldés
- **"Content-Length mindig kell"** → **Valójában**: Transfer-Encoding: chunked esetén nem kell, GET-nél optional
- **"HTTP stateful"** → **Valójában**: Stateless, állapot cookie/token-nel szimulálható

</div>

</details>

</div>

<div class="concept-section performance" data-filter="http performance">

<details>
<summary>🚀 <strong>Performance corner</strong></summary>

<div>

**Header size optimization:**
```javascript
// ❌ ROSSZ: Túl sok header, lassú request
const heavyHeaders = {
    'X-Custom-Header-1': 'value1',
    'X-Custom-Header-2': 'value2',
    // ... 50+ custom headers
    // Total: 5KB+ header overhead
};

// ✅ JÓ: Minimális headers, csak szükséges
const leanHeaders = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token'
    // Total: <500 bytes
};
```

**Header compression:**
- **HTTP/1.1**: Nincs header compression → 500-2000 bytes/request
- **HTTP/2**: HPACK compression → 50-200 bytes/request (10x kisebb!)
- **HTTP/3**: QPACK compression → hasonló HTTP/2-höz

**Cookie performance impact:**
```javascript
// ❌ ROSSZ: Nagy cookie minden requestben
document.cookie = `data=${JSON.stringify(largeObject)}`; // 4KB cookie
// Every request sends 4KB extra → 100 requests = 400KB overhead!

// ✅ JÓ: Kis session ID, adat szerveroldal
document.cookie = `session=abc123`; // 20 bytes
// 100 requests = 2KB overhead (200x jobb!)
```

**Keep-Alive performance:**
```javascript
// Connection: keep-alive enabled (default in HTTP/1.1+)
// TCP handshake: 1x (initial)  vs  N×3 (each request without keep-alive)
// Time saved: ~100ms per request (high latency networks)
```

**Response time by size:**
- **Headers only** (HEAD): ~10-50ms
- **Small JSON** (1KB): ~50-100ms
- **Medium JSON** (100KB): ~200-500ms
- **Large JSON** (1MB): ~1-3s
- **Binary file** (10MB): ~5-30s (bandwidth dependent)

</div>

</details>

</div>

<div class="concept-section tools" data-filter="http">

<details>
<summary>🧰 <strong>Kapcsolódó API-k / eszközök</strong></summary>

<div>

**Browser DevTools:**
```javascript
// Chrome DevTools Network tab:
// - Headers tab: Request/Response headers
// - Preview tab: Formatted response body
// - Timing tab: Request lifecycle breakdown
// - Cookies tab: Cookie details
```

**cURL - Command line HTTP client:**
```bash
# GET request with headers
curl -X GET "https://api.example.com/users" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer token" \
  -v  # Verbose mode (show headers)

# POST request with body
curl -X POST "https://api.example.com/users" \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com"}'

# Show only response headers
curl -I "https://api.example.com/users"

# Follow redirects
curl -L "https://example.com"

# Save response to file
curl -o output.json "https://api.example.com/data"
```

**HTTPie - User-friendly HTTP client:**
```bash
# GET request
http GET api.example.com/users Accept:application/json

# POST request with JSON
http POST api.example.com/users name="John" email="john@example.com"

# Custom headers
http GET api.example.com/users Authorization:"Bearer token"

# Form data
http --form POST api.example.com/upload file@document.pdf
```

**Postman / Insomnia:**
- GUI HTTP client
- Request collections
- Environment variables
- Automated testing
- Response validation

**Wireshark:**
```
HTTP packet capture and analysis
- Raw TCP/IP level inspection
- SSL/TLS decryption (with key)
- Request/response timeline
```

**JavaScript Headers API:**
```javascript
// Headers object creation
const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Authorization', 'Bearer token');

// Check header existence
headers.has('Content-Type'); // true

// Get header value
headers.get('Content-Type'); // 'application/json'

// Delete header
headers.delete('Authorization');

// Iterate headers
for (const [key, value] of headers.entries()) {
    console.log(`${key}: ${value}`);
}
```

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="http">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

**1) Mi a különbség Request header és Response header között?**
<details>
<summary>Válasz</summary>

Request header-t a kliens küldi (Accept, User-Agent, Authorization), Response header-t a szerver (Server, Set-Cookie, ETag). General headers mindkettőben lehetnek.

</details>

**2) Miért kötelező a Host header HTTP/1.1-ben?**
<details>
<summary>Válasz</summary>

Mert egy IP címen több domain is lehet (virtual hosting). A Host header mondja meg a szervernek melyik domain-t kéred.

</details>

**3) Mi történik ha Content-Length header hiányzik?**
<details>
<summary>Válasz</summary>

Transfer-Encoding: chunked használata (HTTP/1.1), vagy a kapcsolat lezárása jelzi a body végét. GET request-nél gyakran nincs Content-Length.

</details>

**4) Hogyan működik a header compression HTTP/2-ben?**
<details>
<summary>Válasz</summary>

HPACK algoritmus: gyakori header-eket indexeli és csak az index-et küldi (~90% size reduction). Static table (gyakori headers) + dynamic table (session-specific).

</details>

**5) Mi az ETag header szerepe?**
<details>
<summary>Válasz</summary>

Resource version identifier. Kliens If-None-Match header-ben visszaküldi, szerver 304 Not Modified-dal válaszol ha unchanged (cache validation).

</details>

</div>

</details>

</div>

---

### HTTP metódusok {#http-modusok}

<div class="concept-section mental-model" data-filter="http medior">

📋 **Fogalom meghatározása**  
*HTTP metódusok (verbs) REST API request types semantic meaning-gel: GET (retrieve resource, safe+idempotent), POST (create resource, non-idempotent), PUT (update/replace resource, idempotent), PATCH (partial update, nem idempotent default), DELETE (remove resource, idempotent), HEAD (metadata only), OPTIONS (supported methods). Safe = read-only, Idempotent = multiple identical requests same effect. CRUD mapping: Create=POST, Read=GET, Update=PUT/PATCH, Delete=DELETE.*

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

<div class="concept-section performance" data-filter="http performance">

<details>
<summary>🚀 <strong>Performance corner</strong></summary>

<div>

**Idempotencia és retry logic:**
```javascript
// ✅ JÓ: Idempotent műveletek biztonságosan retry-olhatók
const fetchUserWithRetry = async (userId, maxRetries = 3) => {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: 'GET' // Safe + Idempotent
            });
            if (response.ok) return await response.json();
            if (response.status === 404) break; // Ne retry-oljunk 404-et
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
        }
    }
};

// ⚠️ VIGYÁZZ: POST nem idempotent - retry duplicate resource-t hozhat létre
const createUserWithRetry = async (userData) => {
    // Idempotency key használata ajánlott
    const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Idempotency-Key': generateUUID() // Server-side deduplication
        },
        body: JSON.stringify(userData)
    });
    return await response.json();
};
```

**HTTP/2 multiplexing performance:**
```javascript
// HTTP/1.1: 6-8 parallel connections, request queueing
// 10 GET requests = ~3 seconds (head-of-line blocking)

// HTTP/2: 1 connection, unlimited parallel streams
// 10 GET requests = ~500ms (all parallel)
// Performance gain: 6x faster

// Measurement example:
const measureRequestTime = async (urls) => {
    const start = performance.now();
    await Promise.all(urls.map(url => fetch(url)));
    const duration = performance.now() - start;
    console.log(`${urls.length} requests in ${duration.toFixed(0)}ms`);
};

// HTTP/1.1: ~3000ms for 10 requests
// HTTP/2: ~500ms for 10 requests (same latency, parallel)
```

**Method overhead comparison:**
```javascript
// Request size by method (typical):
// GET /users/123           ~200 bytes (no body)
// POST /users              ~500 bytes (body + headers)
// PUT /users/123           ~500 bytes (full object replacement)
// PATCH /users/123         ~300 bytes (partial update - smaller!)
// DELETE /users/123        ~200 bytes (no body)

// Performance: GET = DELETE < PATCH < POST = PUT
```

**Cache impact by method:**
```javascript
// ✅ GET requests cache-elhetők (ETag, Cache-Control headers)
fetch('/api/users/123', { method: 'GET' }); // Browser cache HIT possible

// ❌ POST/PUT/PATCH/DELETE never cached
fetch('/api/users', { method: 'POST', body: data }); // Always network call

// Cache effectiveness metrics:
// - GET cache hit: ~10ms (local cache)
// - GET cache miss: ~100-500ms (network)
// - POST request: ~100-500ms (always network)
// Cache hit rate 80% → 5x faster average response time!
```

**Bulk operations optimization:**
```javascript
// ❌ ROSSZ: N individual POST requests (N round-trips)
const createUsers = async (users) => {
    for (const user of users) {
        await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(user)
        });
    }
    // 100 users = 100 requests × 100ms = 10 seconds
};

// ✅ JÓ: 1 bulk POST request (1 round-trip)
const createUsersBulk = async (users) => {
    await fetch('/api/users/bulk', {
        method: 'POST',
        body: JSON.stringify({ users })
    });
    // 100 users = 1 request × 150ms = 150ms (66x gyorsabb!)
};
```

**Connection reuse (Keep-Alive):**
```javascript
// HTTP/1.1 Keep-Alive enabled by default
// 10 sequential requests:
// - Without Keep-Alive: 10 × (TCP handshake + request) = 10 × 150ms = 1500ms
// - With Keep-Alive: 1 × TCP handshake + 10 × request = 50ms + 10 × 100ms = 1050ms
// Savings: 450ms (30% faster)

// Browser automatically manages connection pooling
// No manual configuration needed
```

</div>

</details>

</div>

<div class="concept-section tools" data-filter="http">

<details>
<summary>🧰 <strong>Kapcsolódó API-k / eszközök</strong></summary>

<div>

**Browser Fetch API (modern):**
```javascript
// Full-featured HTTP client
const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token'
    },
    body: JSON.stringify(data),
    signal: AbortSignal.timeout(5000) // 5s timeout
});

// Automatic JSON parsing
const user = await response.json();
```

**XMLHttpRequest (legacy):**
```javascript
// Old-school HTTP client (pre-fetch era)
const xhr = new XMLHttpRequest();
xhr.open('GET', '/api/users');
xhr.onload = () => console.log(JSON.parse(xhr.responseText));
xhr.send();
```

**Axios (third-party library):**
```javascript
// Popular HTTP client with interceptors
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.example.com',
    timeout: 5000,
    headers: { 'Authorization': 'Bearer token' }
});

// Interceptor for automatic retry
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        if (error.config && error.response?.status === 429) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return axiosInstance.request(error.config); // Retry
        }
        throw error;
    }
);

const { data } = await axiosInstance.get('/users');
```

**cURL (command-line):**
```bash
# GET request
curl -X GET https://api.example.com/users

# POST request with JSON body
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com"}'

# PUT request
curl -X PUT https://api.example.com/users/123 \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Updated"}'

# DELETE request
curl -X DELETE https://api.example.com/users/123

# PATCH request (partial update)
curl -X PATCH https://api.example.com/users/123 \
  -H "Content-Type: application/json" \
  -d '{"email":"new@example.com"}'

# Show response headers
curl -i https://api.example.com/users
```

**Postman / Insomnia:**
- GUI HTTP client
- Request collections by method
- Environment variables for base URLs
- Pre-request scripts
- Automated testing (assertions)
- Mock servers

**Browser DevTools Network tab:**
```javascript
// Chrome/Firefox DevTools:
// 1. Open DevTools (F12)
// 2. Network tab
// 3. Filter by method: GET, POST, PUT, DELETE
// 4. Inspect request/response headers
// 5. View request payload
// 6. Copy as cURL command
// 7. Replay requests
```

**HTTP method testing tools:**
```javascript
// httpbin.org - HTTP request/response testing
// Test any HTTP method:
fetch('https://httpbin.org/get');     // GET
fetch('https://httpbin.org/post', { method: 'POST' });   // POST
fetch('https://httpbin.org/put', { method: 'PUT' });     // PUT
fetch('https://httpbin.org/delete', { method: 'DELETE' }); // DELETE

// Returns request details (method, headers, body)
```

**REST client VS Code extension:**
```http
### GET request
GET https://api.example.com/users HTTP/1.1

### POST request
POST https://api.example.com/users HTTP/1.1
Content-Type: application/json

{
  "name": "John",
  "email": "john@example.com"
}

### PUT request
PUT https://api.example.com/users/123 HTTP/1.1
Content-Type: application/json

{
  "name": "Jane Updated",
  "email": "jane@example.com"
}

### DELETE request
DELETE https://api.example.com/users/123 HTTP/1.1
```

</div>

</details>

</div>

---

### HTTP státuszkódok {#http-statuszkodok}

<div class="concept-section mental-model" data-filter="http medior">

📋 **Fogalom meghatározása**  
*HTTP status codes három-digit response codes: 1xx Informational (100 Continue, 101 Switching Protocols), 2xx Success (200 OK, 201 Created, 204 No Content), 3xx Redirection (301 Moved Permanently, 302 Found, 304 Not Modified), 4xx Client Errors (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests), 5xx Server Errors (500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable). First digit determines category.*

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

<div class="concept-section performance" data-filter="http performance">

<details>
<summary>🚀 <strong>Performance corner</strong></summary>

<div>

**Status code caching impact:**
```javascript
// ✅ Cacheable status codes (GET requests)
// 200 OK - Cache with Cache-Control/ETag headers
fetch('/api/users/123', { method: 'GET' });
// Cache-Control: max-age=3600 → 1 hour cache
// Next request: Cache HIT (~10ms instead of ~100ms)

// 304 Not Modified - Conditional request cache validation
fetch('/api/users/123', {
    headers: { 'If-None-Match': '"etag-value"' }
});
// Server checks ETag → 304 response (no body sent!)
// Bandwidth saved: ~1KB body not transmitted

// 301 Moved Permanently - Permanent redirect cached
// Browser remembers redirect, skips origin server next time

// ❌ Never cached
// 4xx client errors - Always fresh validation
// 5xx server errors - Never cached
```

**Error retry strategies:**
```javascript
// Exponential backoff for server errors (5xx)
const fetchWithRetry = async (url, options = {}, maxRetries = 3) => {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            const response = await fetch(url, options);
            
            // 2xx Success - return immediately
            if (response.ok) return response;
            
            // 4xx Client errors - no retry (client's fault)
            if (response.status >= 400 && response.status < 500) {
                throw new Error(`Client error ${response.status}`);
            }
            
            // 5xx Server errors - retry with backoff
            if (response.status >= 500) {
                if (attempt < maxRetries - 1) {
                    const delay = 1000 * Math.pow(2, attempt); // 1s, 2s, 4s
                    console.log(`5xx error, retrying in ${delay}ms...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    continue;
                }
                throw new Error(`Server error ${response.status} after ${maxRetries} retries`);
            }
        } catch (error) {
            if (attempt === maxRetries - 1) throw error;
        }
    }
};

// Performance: 
// - No retry on 4xx: ~100ms (1 request)
// - Retry on 5xx: ~100ms + 1s + 100ms + 2s + 100ms = ~3.3s (3 requests)
```

**429 Rate Limit handling:**
```javascript
// Respect Retry-After header (performance optimization)
const fetchWithRateLimit = async (url) => {
    const response = await fetch(url);
    
    if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const delaySeconds = parseInt(retryAfter, 10) || 60;
        
        console.log(`Rate limited, waiting ${delaySeconds}s...`);
        await new Promise(resolve => setTimeout(resolve, delaySeconds * 1000));
        
        return fetchWithRateLimit(url); // Retry after delay
    }
    
    return response;
};

// Performance impact:
// - Without rate limit handling: 100+ failed requests/minute (wasted bandwidth)
// - With Retry-After handling: Pause → Resume (efficient, respectful)
```

**Circuit breaker pattern for 5xx errors:**
```javascript
// Prevent cascading failures
class CircuitBreaker {
    constructor(threshold = 5, timeout = 60000) {
        this.failureCount = 0;
        this.threshold = threshold;
        this.timeout = timeout;
        this.state = 'CLOSED'; // CLOSED → OPEN → HALF_OPEN
        this.nextAttempt = Date.now();
    }
    
    async execute(fn) {
        if (this.state === 'OPEN') {
            if (Date.now() < this.nextAttempt) {
                throw new Error('Circuit breaker OPEN (too many failures)');
            }
            this.state = 'HALF_OPEN'; // Try one request
        }
        
        try {
            const response = await fn();
            
            if (response.status >= 500) {
                this.onFailure();
                throw new Error(`Server error ${response.status}`);
            }
            
            this.onSuccess();
            return response;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }
    
    onSuccess() {
        this.failureCount = 0;
        this.state = 'CLOSED';
    }
    
    onFailure() {
        this.failureCount++;
        if (this.failureCount >= this.threshold) {
            this.state = 'OPEN';
            this.nextAttempt = Date.now() + this.timeout;
            console.log(`Circuit breaker OPEN for ${this.timeout}ms`);
        }
    }
}

// Usage:
const breaker = new CircuitBreaker(5, 60000); // 5 failures → 1 min cooldown
await breaker.execute(() => fetch('/api/users'));

// Performance benefit:
// - Without circuit breaker: 100 failed requests × 5s timeout = 500s wasted
// - With circuit breaker: 5 failed requests → OPEN → Save 95 requests (475s saved)
```

**Status code response time averages:**
```javascript
// Typical response times by status code:
// 200 OK (with data):        100-500ms (database query + serialization)
// 201 Created:               150-600ms (database write + return object)
// 204 No Content:            50-100ms (no response body)
// 304 Not Modified:          20-50ms (cache validation only, no body)
// 400 Bad Request:           50-100ms (quick validation failure)
// 401 Unauthorized:          50-150ms (auth check failure)
// 404 Not Found:             50-200ms (database lookup miss)
// 429 Too Many Requests:     10-50ms (rate limiter check)
// 500 Internal Server Error: 100-5000ms (timeout or crash)
// 503 Service Unavailable:   10-100ms (load balancer health check)
```

</div>

</details>

</div>

<div class="concept-section tools" data-filter="http">

<details>
<summary>🧰 <strong>Kapcsolódó API-k / eszközök</strong></summary>

<div>

**Browser DevTools Network tab:**
```javascript
// Chrome/Firefox DevTools workflow:
// 1. Open DevTools (F12)
// 2. Network tab
// 3. Filter by status code:
//    - Status:200-299 (success)
//    - Status:400-499 (client errors)
//    - Status:500-599 (server errors)
// 4. Inspect response headers
// 5. View response payload
// 6. Check timing breakdown
// 7. Copy as cURL
```

**HTTP Status Dogs / Cats:**
```
https://httpstatusdogs.com/
https://http.cat/

// Fun visual references:
// https://http.cat/404 → Cat image for 404
// https://http.cat/500 → Cat image for 500
// Useful for presentations and documentation
```

**httpbin.org - Status code testing:**
```bash
# Test specific status codes
curl https://httpbin.org/status/200  # Returns 200 OK
curl https://httpbin.org/status/404  # Returns 404 Not Found
curl https://httpbin.org/status/500  # Returns 500 Internal Server Error

# Random status code
curl https://httpbin.org/status/200,201,204

# Delayed response (timeout testing)
curl https://httpbin.org/delay/5  # 5 second delay
```

**JavaScript Response API:**
```javascript
// Full response object inspection
const response = await fetch('/api/users');

// Status code properties
console.log(response.status);       // 200
console.log(response.statusText);   // "OK"
console.log(response.ok);           // true (200-299)
console.log(response.redirected);   // true if 3xx redirect occurred
console.log(response.type);         // "cors", "basic", "opaque"

// Status code category checks
const isSuccess = response.status >= 200 && response.status < 300;
const isClientError = response.status >= 400 && response.status < 500;
const isServerError = response.status >= 500;

// Redirect handling
const finalURL = response.url; // Final URL after redirects
```

**Custom error classes by status code:**
```javascript
// Structured error handling
class HttpError extends Error {
    constructor(response, message) {
        super(message);
        this.name = 'HttpError';
        this.status = response.status;
        this.statusText = response.statusText;
    }
}

class ClientError extends HttpError {
    constructor(response, message) {
        super(response, message);
        this.name = 'ClientError';
    }
}

class ServerError extends HttpError {
    constructor(response, message) {
        super(response, message);
        this.name = 'ServerError';
    }
}

// Factory function
const createError = (response) => {
    const message = `${response.status} ${response.statusText}`;
    
    if (response.status >= 400 && response.status < 500) {
        return new ClientError(response, message);
    }
    if (response.status >= 500) {
        return new ServerError(response, message);
    }
    return new HttpError(response, message);
};

// Usage with instanceof checks
try {
    const response = await fetch('/api/users');
    if (!response.ok) throw createError(response);
} catch (error) {
    if (error instanceof ClientError) {
        console.error('Client error:', error.status);
    } else if (error instanceof ServerError) {
        console.error('Server error:', error.status);
    }
}
```

**Express.js (Node.js) status code helpers:**
```javascript
// Server-side status code setting
const express = require('express');
const app = express();

app.get('/users', (req, res) => {
    res.status(200).json({ users: [] }); // 200 OK
});

app.post('/users', (req, res) => {
    res.status(201).json({ id: 123 }); // 201 Created
});

app.delete('/users/:id', (req, res) => {
    res.status(204).send(); // 204 No Content
});

app.use((req, res) => {
    res.status(404).json({ error: 'Not found' }); // 404
});

app.use((err, req, res, next) => {
    res.status(500).json({ error: 'Internal server error' }); // 500
});
```

**Monitoring tools:**
```javascript
// Sentry - Error tracking with status codes
Sentry.captureException(error, {
    tags: { status_code: response.status }
});

// Datadog - Status code metrics
// Automatic HTTP status code distribution graphs
// 2xx, 4xx, 5xx breakdowns

// New Relic - APM status code monitoring
// Transaction traces filtered by status code
```

**cURL status code inspection:**
```bash
# Show only status code
curl -o /dev/null -s -w "%{http_code}\n" https://api.example.com/users

# Show status code and headers
curl -I https://api.example.com/users

# Fail on error status codes (exit code non-zero)
curl -f https://api.example.com/users || echo "Request failed"

# Follow redirects and show final status
curl -L -o /dev/null -s -w "%{http_code}\n" https://example.com
```

</div>

</details>

</div>

---

### DOM (Document Object Model) {#dom}

<div class="concept-section mental-model" data-filter="javascript junior">

📋 **Fogalom meghatározása**  
*DOM (Document Object Model) tree-structured representation of HTML document, browser által parsed és memóriában tartott object hierarchy. Every HTML element = node (Element, Text, Attribute, Comment nodes). DOM API: document.querySelector/querySelectorAll (CSS selector-based), getElementById, getElementsByClassName, createElement, appendChild, removeChild, innerHTML, textContent, setAttribute. Event listeners element-eken keresztül. DOM manipulation triggers reflow és repaint.*

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

📋 **Fogalom meghatározása**  
*Event Bubbling = Event propagation mechanism a DOM tree-ben, ahol az esemény a target element-től kiindulva felfelé propagálódik minden parent element-en keresztül a document root-ig. Event delegation pattern alapja: egyetlen parent listener kezeli child element eseményeket. event.target (eredeti elem) vs event.currentTarget (listener elem) megkülönböztetése. event.stopPropagation() leállítja a bubbling-ot.*

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

📋 **Fogalom meghatározása**  
*Client-side storage mechanisms három típusa: LocalStorage = persistent storage (no expiration, ~5-10MB limit, domain-specific), SessionStorage = tab-specific storage (page session lifetime, ~5-10MB), Cookies = HTTP request/response headers (4KB limit, server-rel kommunikál minden request-nél, expires/max-age beállítható, httpOnly/secure/sameSite flags security-hez). Web Storage API: getItem(), setItem(), removeItem(), clear() metódusok.*

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

📋 **Fogalom meghatározása**  
*Responsive Design = mobile-first approach adaptive layout-okkal különböző screen size-okhoz. CSS media queries (@media screen and (min-width: 768px)) viewport breakpoint-oknál layout változtatásokat triggerelnek. Fluid grids (%, fr units), flexible images (max-width: 100%), CSS Grid/Flexbox multi-device support-hoz. Viewport meta tag (<meta name="viewport" content="width=device-width, initial-scale=1">). Modern CSS: clamp(), min(), max() functions, container queries.*

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

📋 **Fogalom meghatározása**  
*Semantic HTML = meaningful HTML5 elements content purpose-t kifejezve: <header> (page/section header), <nav> (navigation links), <main> (primary content, egyetlen per page), <article> (self-contained content), <section> (thematic grouping), <aside> (tangential content), <footer> (footer info). SEO előnyök: search engine crawlers szemantikus struktúrát értelmeznek. Accessibility: screen readers ARIA landmark role-okat használnak navigációhoz. Szemben: <div>/<span> generic containers.*

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

📋 **Fogalom meghatározása**  
*Form validation = client-side és server-side data integrity checks. HTML5 built-in validation: required, minlength/maxlength, pattern (regex), type (email/url/number), min/max (number/date). Constraint Validation API: checkValidity(), setCustomValidity(), validity object (valueMissing, typeMismatch, patternMismatch). JavaScript custom validation: event.preventDefault() submit-nél, FormData API, real-time validation blur/input event-ekkel. ARIA attributes: aria-invalid, aria-describedby error message-ekhez.*

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

📋 **Fogalom meghatározása**  
*JSON (JavaScript Object Notation) = lightweight data-interchange format, human-readable text-based, JavaScript object syntax-szal kompatibilis: objektumok {}, tömbök [], string/number/boolean/null primitívek. XML (eXtensible Markup Language) = markup language tag-based hierarchical structure-rel (<tag>value</tag>), attributes support, schema validation (XSD), namespace support. JSON előnyök: kisebb file size, gyorsabb parsing (native JavaScript support), egyszerűbb syntax. XML előnyök: self-describing, comment support, mixed content, XSLT transformation.*

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

### WebSocket & Server-Sent Events (Real-time Communication) {#websockets-sse}

<div class="concept-section mental-model" data-filter="javascript medior">

📋 **Fogalom meghatározása**  
*WebSocket = full-duplex bidirectional communication protocol TCP-n keresztül, persistent connection. **HTTP handshake**: GET request + `Upgrade: websocket` header → protocol switch 101 Switching Protocols. **States**: CONNECTING (0), OPEN (1), CLOSING (2), CLOSED (3). **Frames**: Text frames (UTF-8), Binary frames (ArrayBuffer/Blob), Control frames (ping/pong/close). **API**: `new WebSocket(url)`, onopen, onmessage, onerror, onclose events, send() method. ws:// (insecure) vs wss:// (secure TLS). **Server-Sent Events (SSE)**: Unidirectional server→client push HTTP-n keresztül. `EventSource` API, `text/event-stream` MIME type, automatic reconnection (3s default), Last-Event-ID header resume support, named events (`event:` field). **Decision**: WebSocket = bidirectional + low latency; SSE = server push only + simpler + firewall-friendly + auto-reconnect.*

</div>

<div class="concept-section why-important" data-filter="javascript medior">

💡 **Miért számít?**
- **Real-time communication**: Push-based data delivery eliminates polling overhead (100x efficiency)
- **Performance**: WebSocket ~50-100ms latency, SSE HTTP-based (firewall/proxy friendly)
- **Use case matching**: Chat/Gaming (WebSocket), Notifications/News feeds (SSE), Live dashboards (SSE)
- **Scalability**: 1 persistent connection vs 1000+ HTTP polling requests → server load optimization

</div>

<div class="runnable-model" data-filter="javascript">

**Runnable mental model**

**WebSocket Production-Ready Implementation:**
```javascript
// Comprehensive WebSocket Manager with reconnection, heartbeat, message queuing
class WebSocketClient {
    constructor(url, options = {}) {
        this.url = url;
        this.config = {
            reconnect: true,
            maxReconnectAttempts: 5,
            reconnectInterval: 1000,  // Start with 1s
            maxReconnectInterval: 30000,  // Max 30s
            heartbeatInterval: 30000,  // Ping every 30s
            timeout: 5000,  // Connection timeout
            ...options
        };
        
        this.ws = null;
        this.reconnectAttempts = 0;
        this.isConnected = false;
        this.messageQueue = [];
        this.listeners = new Map();
        this.heartbeatTimer = null;
        this.reconnectTimer = null;
    }
    
    connect() {
        return new Promise((resolve, reject) => {
            try {
                console.log(`[WebSocket] Connecting to ${this.url}`);
                this.ws = new WebSocket(this.url);
                
                const timeout = setTimeout(() => {
                    this.ws.close();
                    reject(new Error('Connection timeout'));
                }, this.config.timeout);
                
                this.ws.onopen = () => {
                    clearTimeout(timeout);
                    this.isConnected = true;
                    this.reconnectAttempts = 0;
                    console.log('[WebSocket] Connected');
                    
                    this.startHeartbeat();
                    this.flushQueue();
                    this.emit('open');
                    resolve();
                };
                
                this.ws.onmessage = (event) => {
                    this.handleMessage(event);
                };
                
                this.ws.onerror = (error) => {
                    console.error('[WebSocket] Error:', error);
                    this.emit('error', error);
                };
                
                this.ws.onclose = (event) => {
                    this.isConnected = false;
                    this.stopHeartbeat();
                    console.log(`[WebSocket] Closed: ${event.code} ${event.reason}`);
                    
                    this.emit('close', { code: event.code, reason: event.reason });
                    
                    if (this.config.reconnect && this.reconnectAttempts < this.config.maxReconnectAttempts) {
                        this.scheduleReconnect();
                    }
                };
                
            } catch (error) {
                reject(error);
            }
        });
    }
    
    handleMessage(event) {
        try {
            const data = JSON.parse(event.data);
            
            // Handle heartbeat pong
            if (data.type === 'pong') {
                console.log('[WebSocket] Heartbeat acknowledged');
                return;
            }
            
            // Emit typed messages
            this.emit(data.type || 'message', data);
            this.emit('message', data);  // Also emit generic
            
        } catch (error) {
            // Handle non-JSON messages
            this.emit('message', event.data);
        }
    }
    
    send(data) {
        if (this.isConnected && this.ws.readyState === WebSocket.OPEN) {
            const message = typeof data === 'string' ? data : JSON.stringify(data);
            this.ws.send(message);
        } else {
            // Queue message for later
            this.messageQueue.push(data);
            console.warn('[WebSocket] Message queued (not connected)');
        }
    }
    
    flushQueue() {
        while (this.messageQueue.length > 0) {
            const message = this.messageQueue.shift();
            this.send(message);
        }
    }
    
    startHeartbeat() {
        this.stopHeartbeat();
        this.heartbeatTimer = setInterval(() => {
            if (this.isConnected) {
                this.send({ type: 'ping', timestamp: Date.now() });
            }
        }, this.config.heartbeatInterval);
    }
    
    stopHeartbeat() {
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = null;
        }
    }
    
    scheduleReconnect() {
        if (this.reconnectTimer) return;
        
        this.reconnectAttempts++;
        // Exponential backoff
        const delay = Math.min(
            this.config.reconnectInterval * Math.pow(2, this.reconnectAttempts - 1),
            this.config.maxReconnectInterval
        );
        
        console.log(`[WebSocket] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.config.maxReconnectAttempts})`);
        
        this.reconnectTimer = setTimeout(async () => {
            this.reconnectTimer = null;
            try {
                await this.connect();
            } catch (error) {
                console.error('[WebSocket] Reconnect failed:', error);
            }
        }, delay);
    }
    
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }
    
    off(event, callback) {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            const index = callbacks.indexOf(callback);
            if (index > -1) callbacks.splice(index, 1);
        }
    }
    
    emit(event, data) {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            callbacks.forEach(callback => callback(data));
        }
    }
    
    close(code = 1000, reason = 'Normal closure') {
        this.config.reconnect = false;  // Prevent reconnect
        this.stopHeartbeat();
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
        if (this.ws) {
            this.ws.close(code, reason);
        }
    }
    
    get state() {
        return this.ws ? this.ws.readyState : WebSocket.CLOSED;
    }
}

// Usage: Chat Application
const chat = new WebSocketClient('wss://chat.example.com/socket');

await chat.connect();

chat.on('open', () => {
    console.log('Chat connected');
    chat.send({ type: 'join', room: 'general' });
});

chat.on('chat_message', (data) => {
    console.log(`${data.user}: ${data.message}`);
    displayMessage(data);
});

chat.on('user_joined', (data) => {
    console.log(`${data.username} joined`);
});

chat.on('close', ({ code, reason }) => {
    console.log(`Disconnected: ${reason}`);
});

// Send message
document.querySelector('#send').addEventListener('click', () => {
    const message = document.querySelector('#input').value;
    chat.send({ type: 'chat_message', message, room: 'general' });
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    chat.close();
});
```

**Server-Sent Events (SSE) Implementation:**
```javascript
// SSE Client Manager with automatic reconnection
class SSEClient {
    constructor(url, options = {}) {
        this.url = url;
        this.config = {
            withCredentials: false,
            ...options
        };
        
        this.eventSource = null;
        this.listeners = new Map();
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
    }
    
    connect() {
        try {
            console.log(`[SSE] Connecting to ${this.url}`);
            
            this.eventSource = new EventSource(this.url, {
                withCredentials: this.config.withCredentials
            });
            
            this.eventSource.onopen = () => {
                console.log('[SSE] Connected');
                this.reconnectAttempts = 0;
                this.emit('open');
            };
            
            this.eventSource.onmessage = (event) => {
                // Default message handler (unnamed events)
                try {
                    const data = JSON.parse(event.data);
                    this.emit('message', data);
                } catch (error) {
                    this.emit('message', event.data);
                }
            };
            
            this.eventSource.onerror = (error) => {
                console.error('[SSE] Error:', error);
                
                // EventSource auto-reconnects, but we track attempts
                if (this.eventSource.readyState === EventSource.CLOSED) {
                    this.reconnectAttempts++;
                    
                    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
                        console.error('[SSE] Max reconnect attempts reached');
                        this.close();
                    }
                }
                
                this.emit('error', error);
            };
            
        } catch (error) {
            console.error('[SSE] Connection failed:', error);
            throw error;
        }
    }
    
    // Listen for named events
    addEventListener(eventName, callback) {
        if (this.eventSource) {
            this.eventSource.addEventListener(eventName, (event) => {
                try {
                    const data = JSON.parse(event.data);
                    callback(data, event);
                } catch (error) {
                    callback(event.data, event);
                }
            });
        }
    }
    
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }
    
    emit(event, data) {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            callbacks.forEach(callback => callback(data));
        }
    }
    
    close() {
        if (this.eventSource) {
            this.eventSource.close();
            console.log('[SSE] Closed');
            this.emit('close');
        }
    }
    
    get readyState() {
        return this.eventSource ? this.eventSource.readyState : EventSource.CLOSED;
    }
}

// Usage: Live News Feed
const newsFeed = new SSEClient('/api/news/stream');

newsFeed.connect();

newsFeed.on('open', () => {
    console.log('News feed connected');
});

newsFeed.on('message', (article) => {
    console.log('New article:', article.title);
    addArticleToFeed(article);
});

// Listen for named events
newsFeed.addEventListener('breaking_news', (news) => {
    console.log('🚨 BREAKING:', news.headline);
    showNotification(news);
});

newsFeed.addEventListener('stock_update', (stock) => {
    console.log(`${stock.symbol}: $${stock.price}`);
    updateStockTicker(stock);
});

// Server-side (Node.js/Express):
app.get('/api/news/stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    // Send initial message
    res.write('data: {"type": "connected"}\n\n');
    
    // Send periodic updates
    const interval = setInterval(() => {
        const article = getLatestArticle();
        res.write(`data: ${JSON.stringify(article)}\n\n`);
    }, 5000);
    
    // Send named event
    const breakingNewsInterval = setInterval(() => {
        const news = getBreakingNews();
        res.write(`event: breaking_news\n`);
        res.write(`data: ${JSON.stringify(news)}\n\n`);
    }, 30000);
    
    // Cleanup on connection close
    req.on('close', () => {
        clearInterval(interval);
        clearInterval(breakingNewsInterval);
        console.log('Client disconnected');
    });
});
```

**Decision Matrix: WebSocket vs SSE vs HTTP Polling:**
```javascript
// Decision helper function
function selectRealtimeStrategy(requirements) {
    const {
        bidirectional,      // Client needs to send to server?
        lowLatency,         // <100ms latency required?
        firewallFriendly,   // Must work through corporate proxies?
        simplicity,         // Development complexity tolerance?
        browserSupport      // Need IE support?
    } = requirements;
    
    // WebSocket: Bidirectional + Low Latency
    if (bidirectional && lowLatency) {
        return {
            strategy: 'WebSocket',
            reason: 'Bidirectional communication with minimal latency',
            useCases: ['Chat', 'Gaming', 'Collaborative editing', 'Trading platforms']
        };
    }
    
    // SSE: Server→Client push + Simplicity
    if (!bidirectional && (firewallFriendly || simplicity)) {
        return {
            strategy: 'Server-Sent Events',
            reason: 'Simple server push over HTTP',
            useCases: ['News feeds', 'Notifications', 'Stock tickers', 'Live dashboards']
        };
    }
    
    // HTTP Polling: Maximum compatibility
    if (browserSupport || !lowLatency) {
        return {
            strategy: 'HTTP Polling (Long Polling)',
            reason: 'Maximum browser compatibility',
            useCases: ['Legacy browser support', 'Infrequent updates']
        };
    }
    
    return {
        strategy: 'HTTP Polling',
        reason: 'Default fallback'
    };
}

// Examples:
console.log(selectRealtimeStrategy({
    bidirectional: true,
    lowLatency: true,
    firewallFriendly: false,
    simplicity: false,
    browserSupport: false
}));
// → WebSocket for chat app

console.log(selectRealtimeStrategy({
    bidirectional: false,
    lowLatency: false,
    firewallFriendly: true,
    simplicity: true,
    browserSupport: false
}));
// → SSE for notifications

// Comparison table:
const comparison = {
    'WebSocket': {
        direction: 'Bidirectional',
        protocol: 'ws:// / wss://',
        latency: '~50-100ms',
        overhead: 'Low (2 bytes per frame)',
        autoReconnect: 'Manual implementation',
        firewall: 'May be blocked',
        complexity: 'High'
    },
    'SSE': {
        direction: 'Server→Client only',
        protocol: 'http:// / https://',
        latency: '~100-200ms',
        overhead: 'Medium (HTTP headers)',
        autoReconnect: 'Automatic (3s default)',
        firewall: 'Firewall-friendly',
        complexity: 'Low'
    },
    'Long Polling': {
        direction: 'Request→Response',
        protocol: 'http:// / https://',
        latency: '~200-500ms',
        overhead: 'High (full HTTP overhead)',
        autoReconnect: 'Manual polling loop',
        firewall: 'Firewall-friendly',
        complexity: 'Medium'
    }
};
```

**Fallback Strategy (Progressive Enhancement):**
```javascript
// Graceful degradation: WebSocket → SSE → Long Polling
class RealtimeClient {
    constructor(url) {
        this.url = url;
        this.strategy = null;
        this.client = null;
    }
    
    async connect() {
        // Try WebSocket first
        if ('WebSocket' in window) {
            try {
                console.log('Attempting WebSocket connection...');
                this.client = new WebSocketClient(this.url.replace('http', 'ws'));
                await this.client.connect();
                this.strategy = 'WebSocket';
                console.log('✅ Using WebSocket');
                return;
            } catch (error) {
                console.warn('WebSocket failed, trying SSE...', error);
            }
        }
        
        // Fallback to SSE
        if ('EventSource' in window) {
            try {
                console.log('Attempting SSE connection...');
                this.client = new SSEClient(this.url + '/stream');
                this.client.connect();
                this.strategy = 'SSE';
                console.log('✅ Using SSE');
                return;
            } catch (error) {
                console.warn('SSE failed, falling back to polling...', error);
            }
        }
        
        // Final fallback: Long Polling
        console.log('Using Long Polling fallback');
        this.client = new LongPollingClient(this.url);
        this.client.connect();
        this.strategy = 'Long Polling';
        console.log('✅ Using Long Polling');
    }
    
    send(data) {
        if (this.strategy === 'WebSocket') {
            this.client.send(data);
        } else {
            // SSE/Polling: Use HTTP POST
            fetch(this.url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        }
    }
    
    on(event, callback) {
        this.client.on(event, callback);
    }
    
    close() {
        this.client.close();
    }
}

// Long Polling implementation (fallback)
class LongPollingClient {
    constructor(url) {
        this.url = url;
        this.isPolling = false;
        this.listeners = new Map();
        this.lastEventId = null;
    }
    
    connect() {
        this.isPolling = true;
        this.poll();
    }
    
    async poll() {
        while (this.isPolling) {
            try {
                const response = await fetch(this.url + '/poll', {
                    method: 'GET',
                    headers: {
                        'Last-Event-ID': this.lastEventId || ''
                    }
                });
                
                const data = await response.json();
                
                if (data.events) {
                    data.events.forEach(event => {
                        this.emit('message', event);
                        this.lastEventId = event.id;
                    });
                }
                
            } catch (error) {
                console.error('[Polling] Error:', error);
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }
    }
    
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }
    
    emit(event, data) {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            callbacks.forEach(callback => callback(data));
        }
    }
    
    close() {
        this.isPolling = false;
    }
}

// Usage with automatic fallback:
const realtime = new RealtimeClient('https://api.example.com');
await realtime.connect();  // Tries WebSocket → SSE → Polling

realtime.on('message', (data) => {
    console.log('Received:', data);
});

realtime.send({ type: 'subscribe', channel: 'updates' });
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

**Server-Sent Events (SSE) Implementation:**
```javascript
// EventSource Client Implementation
class SSEClient {
    constructor(url, options = {}) {
        this.url = url;
        this.config = {
            withCredentials: false,  // Send cookies
            ...options
        };
        
        this.eventSource = null;
        this.listeners = new Map();
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
    }
    
    connect() {
        return new Promise((resolve, reject) => {
            try {
                console.log(`[SSE] Connecting to ${this.url}`);
                
                // EventSource automatically handles reconnection
                this.eventSource = new EventSource(this.url, {
                    withCredentials: this.config.withCredentials
                });
                
                this.eventSource.onopen = () => {
                    console.log('[SSE] Connected');
                    this.reconnectAttempts = 0;
                    this.emit('open');
                    resolve();
                };
                
                // Default message handler (unnamed events)
                this.eventSource.onmessage = (event) => {
                    console.log('[SSE] Message:', event.data);
                    const data = this.parseData(event.data);
                    this.emit('message', data);
                };
                
                this.eventSource.onerror = (error) => {
                    console.error('[SSE] Error:', error);
                    
                    if (this.eventSource.readyState === EventSource.CLOSED) {
                        console.log('[SSE] Connection closed');
                        this.emit('close');
                        
                        if (this.reconnectAttempts < this.maxReconnectAttempts) {
                            this.reconnectAttempts++;
                            console.log(`[SSE] Reconnecting... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
                            // EventSource handles reconnection automatically
                        }
                    }
                    
                    this.emit('error', error);
                };
                
            } catch (error) {
                reject(error);
            }
        });
    }
    
    // Listen to named events
    addEventListener(eventName, callback) {
        if (!this.listeners.has(eventName)) {
            this.listeners.set(eventName, []);
            
            // Register EventSource listener for named event
            this.eventSource.addEventListener(eventName, (event) => {
                const data = this.parseData(event.data);
                this.emit(eventName, { ...data, id: event.lastEventId });
            });
        }
        
        this.listeners.get(eventName).push(callback);
    }
    
    parseData(data) {
        try {
            return JSON.parse(data);
        } catch (error) {
            return data;  // Return as string if not JSON
        }
    }
    
    emit(event, data) {
        const callbacks = this.listeners.get(event) || [];
        callbacks.forEach(callback => callback(data));
    }
    
    close() {
        if (this.eventSource) {
            this.eventSource.close();
            console.log('[SSE] Connection closed manually');
        }
    }
    
    getReadyState() {
        if (!this.eventSource) return EventSource.CLOSED;
        return this.eventSource.readyState;
        // EventSource.CONNECTING (0)
        // EventSource.OPEN (1)
        // EventSource.CLOSED (2)
    }
}

// Usage example - Real-time notifications
const notifications = new SSEClient('/api/notifications');

notifications.connect().then(() => {
    console.log('SSE connected');
});

// Listen to default messages
notifications.addEventListener('message', (data) => {
    console.log('New notification:', data);
    showNotification(data);
});

// Listen to named events
notifications.addEventListener('user-joined', (data) => {
    console.log('User joined:', data);
    updateUserList(data);
});

notifications.addEventListener('message-sent', (data) => {
    console.log('New message:', data);
    appendMessage(data);
});
```

**Decision Matrix: WebSocket vs SSE:**
```javascript
const communicationPatterns = {
    webSocket: {
        direction: 'Bidirectional (client ↔ server)',
        protocol: 'Custom (TCP-based)',
        reconnection: 'Manual implementation',
        latency: '50-100ms (very low)',
        useCases: [
            'Chat applications',
            'Real-time gaming',
            'Collaborative editing',
            'Live trading platforms'
        ]
    },
    
    sse: {
        direction: 'Unidirectional (server → client)',
        protocol: 'HTTP-based',
        reconnection: 'Automatic (3s default)',
        latency: '100-200ms (low)',
        useCases: [
            'Live news feeds',
            'Stock price updates',
            'Notifications',
            'Live dashboards'
        ]
    }
};
```

**Fallback Strategy:**
```javascript
// Progressive enhancement: WebSocket → SSE → Long Polling
class RealTimeClient {
    async connect() {
        // Try WebSocket first
        if ('WebSocket' in window) {
            try {
                await this.connectWebSocket();
                console.log('✅ Using WebSocket');
                return;
            } catch (error) {
                console.warn('WebSocket failed, trying SSE...');
            }
        }
        
        // Fallback to SSE
        if ('EventSource' in window) {
            try {
                await this.connectSSE();
                console.log('✅ Using SSE');
                return;
            } catch (error) {
                console.warn('SSE failed, using Long Polling...');
            }
        }
        
        // Final fallback
        await this.connectLongPolling();
        console.log('✅ Using Long Polling');
    }
}
```
*Figyeld meg: WebSocket bidirectional low-latency, SSE unidirectional auto-reconnect, Fallback strategy for compatibility.*

</div>

<div class="concept-section myths" data-filter="javascript">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- **"WebSocket helyettesíti a HTTP-t"** → **Valójában**: Kiegészíti, HTTP-vel kezdődik (Upgrade header), együtt használandók
- **"WebSocket mindig jobb mint HTTP"** → **Valójában**: Csak bidirectional real-time-hoz, simple request-response → REST API jobb
- **"WebSocket automatikusan újracsatlakozik"** → **Valójában**: Manual reconnection logic kell (exponential backoff, message queue)
- **"SSE nem tud binary data-t küldeni"** → **Valójában**: Csak text/event-stream, de base64-el workaround (inefficient)
- **"EventSource.readyState CONNECTING = csatlakozás alatt"** → **Valójában**: CONNECTING (0), OPEN (1), CLOSED (2) - nincs CLOSING állapot

</div>

</details>

</div>

<div class="concept-section performance" data-filter="javascript performance">

<details>
<summary>🚀 <strong>Performance corner</strong></summary>

<div>

**WebSocket vs HTTP Polling Overhead:**
```javascript
// HTTP Polling: 100 req/s × 500 bytes headers = 50KB/s overhead
// WebSocket: 100 msg/s × 4 bytes frame = 0.4KB/s overhead
// Savings: 99.2% less bandwidth

setInterval(async () => {
    await fetch('/api/updates');  // Full HTTP headers every time
}, 1000);

// vs

const ws = new WebSocket('wss://api.example.com');
ws.onmessage = (event) => {
    updateUI(event.data);  // Minimal frame overhead
};
```

**Heartbeat Optimization:**
```javascript
// ❌ ROSSZ: Every 5s = 720 pings/hour
setInterval(() => ws.send('ping'), 5000);

// ✅ JÓ: Every 30s = 120 pings/hour (6x better)
setInterval(() => ws.send('ping'), 30000);
```

**SSE Connection Limit:**
```javascript
// Browser limit: 6 concurrent SSE per domain
// ❌ ROSSZ: Multiple connections
const notifications = new EventSource('/api/notifications');  // 1
const messages = new EventSource('/api/messages');            // 2
// ... 7th connection will block!

// ✅ JÓ: Single multiplexed connection
const stream = new EventSource('/api/stream');
stream.addEventListener('notification', handleNotification);
stream.addEventListener('message', handleMessage);
```

**Message Queue Memory:**
```javascript
// ❌ ROSSZ: Unbounded queue (memory leak)
this.messageQueue.push(message);  // Can grow infinitely

// ✅ JÓ: Bounded with LRU eviction
if (this.messageQueue.length >= MAX_QUEUE_SIZE) {
    this.messageQueue.shift();  // Drop oldest
}
this.messageQueue.push(message);
```

</div>

</details>

</div>

<div class="concept-section tools" data-filter="javascript">

<details>
<summary>🧰 <strong>Kapcsolódó API-k / eszközök</strong></summary>

<div>

**Chrome DevTools - Network Tab:**
```
Network → WS filter → Frames tab
- See all sent/received messages
- Timing: Connection duration
- Headers: Handshake details
```

**Socket.IO (WebSocket library):**
```bash
npm install socket.io socket.io-client
```

```javascript
// Server
const io = require('socket.io')(3000);
io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        io.emit('message', msg);  // Broadcast
    });
});

// Client
import io from 'socket.io-client';
const socket = io('http://localhost:3000');
socket.on('message', (msg) => console.log(msg));
```

**ws (Node.js WebSocket):**
```bash
npm install ws
```

```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
});
```

**nginx WebSocket proxy:**
```nginx
location /ws {
    proxy_pass http://backend:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 86400;
}
```

**SSE nginx config:**
```nginx
location /sse {
    proxy_pass http://backend:3000;
    proxy_http_version 1.1;
    chunked_transfer_encoding off;
    proxy_buffering off;
    proxy_cache off;
}
```

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="javascript">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

**1) Mi a különbség WebSocket és Server-Sent Events között?**
<details>
<summary>Válasz</summary>

**WebSocket**: Bidirectional (client ↔ server), custom protocol (ws://), manual reconnection, supports binary.

**SSE**: Unidirectional (server → client), HTTP-based, automatic reconnection (3s), text only.

**Use cases**:
- WebSocket: Chat, gaming (bidirectional needed)
- SSE: Live feeds, notifications (server push only)

</details>

**2) Hogyan működik a WebSocket handshake?**
<details>
<summary>Válasz</summary>

**HTTP Upgrade request**:
```http
GET /chat HTTP/1.1
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
```

**Server response (101 Switching Protocols)**:
```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

TCP connection switches to WebSocket protocol.

</details>

**3) Miért fontos a WebSocket heartbeat/ping-pong mechanizmus?**
<details>
<summary>Válasz</summary>

**Okok**:
1. **Idle connection detection**: Proxy/firewall closes idle connections (30-120s)
2. **Dead connection cleanup**: Network failure detection
3. **Keep-alive**: Prevents timeout-based disconnection

**Implementation**:
```javascript
setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'ping' }));
    }
}, 30000);  // Every 30s
```

</details>

**4) Hogyan implementálsz exponential backoff reconnection-t?**
<details>
<summary>Válasz</summary>

**Exponential backoff**: Reconnect delay doubles after each failed attempt.

```javascript
let reconnectAttempts = 0;
const BASE_DELAY = 1000;  // 1s
const MAX_DELAY = 30000;  // 30s

function reconnect() {
    const delay = Math.min(
        BASE_DELAY * Math.pow(2, reconnectAttempts),
        MAX_DELAY
    );
    
    setTimeout(() => {
        reconnectAttempts++;
        connect();
    }, delay);
}
// Delays: 1s, 2s, 4s, 8s, 16s, 30s (capped)
```

</details>

**5) Mi az SSE Last-Event-ID és mire használható?**
<details>
<summary>Válasz</summary>

**Last-Event-ID**: Server sends `id:` field, client automatically resends on reconnection.

**Server**:
```javascript
res.write('id: 12345\\n');
res.write('data: {"message":"Event data"}\\n\\n');
```

**Client reconnection**:
```http
GET /stream HTTP/1.1
Last-Event-ID: 12345
```

Server continues from ID 12346 → **No missed events!**

</details>

**6) Mikor használj WebSocket helyett SSE-t?**
<details>
<summary>Válasz</summary>

**Use SSE when**:
- ✅ Server→client push only
- ✅ Simplicity important (auto reconnection)
- ✅ Firewall/proxy friendly (HTTP)
- ✅ Text data only (JSON, XML)
- ✅ Event ID resume support needed

**Example**: Live news feed, stock prices, server metrics dashboard.

</details>

**7) Hogyan kezeled a WebSocket message queue-t connection loss alatt?**
<details>
<summary>Válasz</summary>

**Strategy**: Queue messages during disconnection, flush on reconnect.

```javascript
send(message) {
    if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(message);
    } else {
        if (this.messageQueue.length < MAX_QUEUE_SIZE) {
            this.messageQueue.push({ message, timestamp: Date.now() });
        } else {
            console.warn('Queue full, dropping message');
        }
    }
}

flushQueue() {
    while (this.messageQueue.length > 0) {
        const item = this.messageQueue.shift();
        this.ws.send(item.message);
    }
}
```

**Important**: Bound queue size, TTL for stale messages.

</details>

**8) Mi a WebSocket close code jelentése és hogyan használd?**
<details>
<summary>Válasz</summary>

**Common close codes**:
- **1000**: Normal closure (clean disconnect)
- **1001**: Going away (tab closed)
- **1006**: Abnormal closure (network error)
- **1008**: Policy violation (auth failed)
- **4000-4999**: Application-specific

**Usage**:
```javascript
ws.onclose = (event) => {
    if (event.code === 1000) {
        console.log('Clean disconnect');
    } else if (event.code === 1006) {
        console.log('Network error, reconnecting...');
        reconnect();
    }
};

ws.close(1000, 'User logged out');
```

</details>

</div>

</details>

</div>

---

### Service Workers és PWA alapok {#service-workers-pwa}

<div class="concept-section mental-model" data-filter="javascript medior">

📋 **Fogalom meghatározása**  
*Service Worker = JavaScript worker script háttérben futó proxy szerver és web page között, network request-eket interceptálja. Progressive Web App (PWA) alapja: offline functionality (Cache API), push notifications (Push API), background sync. Lifecycle: install → activate → fetch events. Scope-based registration, HTTPS kötelező (biztonság miatt). Web App Manifest: metadata (name, icons, theme_color, display mode). Cache strategies: cache-first, network-first, stale-while-revalidate.*

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
    
    <!-- <script src="/js/example-pwa-manager.js"></script> -->
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

📋 **Fogalom meghatározása**  
*Shadow DOM = encapsulated DOM tree element-hez csatolva, CSS és JavaScript isolation. Web Components = Custom Elements (customElements.define()), Shadow DOM (attachShadow()), HTML Templates (<template>), ES Modules. Component lifecycle callbacks: constructor(), connectedCallback(), disconnectedCallback(), attributeChangedCallback(). ::slotted() pseudo-element content projection-höz. CSS custom properties (:host, :host-context) penetrálják a shadow boundary-t. Framework-independent reusable UI components.*

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

📋 **Fogalom meghatározása**  
*CSS Variables (Custom Properties) = --property-name szintaxissal definiált értékek, var(--property-name) függvénnyel használhatók. Cascade és inheritance szerint működnek, :root-ban globális scope, element-specifikusan felülírhatók. Runtime theming: JavaScript-tel dinamikusan változtathatók (element.style.setProperty()), getComputedStyle() lekérdezéshez. Design system tokenek: spacing, colors, typography, shadows. Dark mode: [data-theme="dark"] attribute-based theme switching. calc() függvényben használhatók.*

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

📋 **Fogalom meghatározása**  
*CSS Positioning = position property értékei element elhelyezéséhez: static (default, normal flow), relative (offset original position-től, creates positioning context), absolute (removed from flow, positioned relative to nearest positioned ancestor), fixed (viewport-hoz kötött, scroll-lal nem mozog), sticky (threshold-ig relative, utána fixed). top/right/bottom/left properties offset-hez. z-index stacking context-et kontrollál. transform: translate() positioning alternative.*

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

📋 **Fogalom meghatározása**  
*Debounce = function execution delay-elve az utolsó hívás után (pl. 300ms), minden új hívás restart-olja a timer-t. Use case: search autocomplete, form validation, window resize. Throttle = function maximum egyszer fut adott time interval-ban (pl. 16ms = 60fps), első hívás azonnal execute-ol, továbbiak blocked. Use case: scroll events, mouse move tracking, API rate limiting. requestAnimationFrame() modernebb alternátíva smooth animations-hez.*

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

📋 **Fogalom meghatározása**  
*Frontend Security = kliens oldali sebezékenségek elleni védelem. XSS (Cross-Site Scripting): malicious script injection user input-on keresztül, védelem: input sanitization, output encoding, textContent (nem innerHTML). CSRF (Cross-Site Request Forgery): unauthorized requests legitimate user nevében, védelem: CSRF token (X-CSRF-Token header), SameSite cookie attribute, double submit cookie pattern. CSP (Content Security Policy): HTTP header meghatározza trusted content sources (script-src, style-src, img-src directives), XSS mitigation. HTTPS enforcing, HttpOnly/Secure cookie flags.*

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

<div class="concept-section performance" data-filter="security performance">

<details>
<summary>🚀 <strong>Performance corner</strong></summary>

<div>

**XSS Types Performance Impact:**
```javascript
// XSS attack types by execution time:
// 1. Reflected XSS: ~0-100ms (URL parameter → immediate execution)
// 2. Stored XSS: ~100-500ms (database → page load → execution)
// 3. DOM-based XSS: ~0-50ms (client-side only, no server round-trip)

// Sanitization performance comparison:
const testHTML = '<script>alert("XSS")</script><p>Hello</p>'.repeat(100);

// ❌ SLOW: DOMParser (creates full DOM tree)
console.time('DOMParser');
const parser = new DOMParser();
const doc = parser.parseFromString(testHTML, 'text/html');
doc.querySelectorAll('script').forEach(s => s.remove());
const sanitized1 = doc.body.innerHTML;
console.timeEnd('DOMParser'); // ~15-25ms

// ✅ FAST: String replacement (regex-based)
console.time('Regex');
const sanitized2 = testHTML.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
console.timeEnd('Regex'); // ~2-5ms (5x faster!)

// ⚡ FASTEST: DOMPurify library (optimized C++ bindings in Chromium)
import DOMPurify from 'dompurify';
console.time('DOMPurify');
const sanitized3 = DOMPurify.sanitize(testHTML);
console.timeEnd('DOMPurify'); // ~1-3ms (10x faster!)

// Performance: DOMPurify > Regex > DOMParser
```

**CSRF Token Performance:**
```javascript
// Token generation methods comparison:
// 1. Crypto.randomUUID() - Built-in browser API
console.time('randomUUID');
for (let i = 0; i < 10000; i++) {
    crypto.randomUUID(); // e.g., "a7f8b2c3-1d4e-5f6g-7h8i-9j0k1l2m3n4o"
}
console.timeEnd('randomUUID'); // ~10-20ms (native, fastest)

// 2. Crypto.getRandomValues() - Cryptographically secure
console.time('getRandomValues');
for (let i = 0; i < 10000; i++) {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}
console.timeEnd('getRandomValues'); // ~15-30ms

// 3. Math.random() - NOT secure (predictable)
console.time('Math.random');
for (let i = 0; i < 10000; i++) {
    Math.random().toString(36).substring(2); // NEVER use for CSRF tokens!
}
console.timeEnd('Math.random'); // ~5-10ms (fast but insecure!)

// Performance winner: crypto.randomUUID() (speed + security)
```

**CSP Performance Impact:**
```javascript
// CSP header processing overhead:
// - No CSP: 0ms overhead
// - CSP with 5 directives: ~0.5-1ms parsing overhead
// - CSP with 20 directives: ~2-5ms parsing overhead

// CSP nonce vs hash performance:
// Nonce generation (server-side):
// - crypto.randomBytes(16): ~0.1ms per request
// - Requires dynamic HTML generation (template engine overhead)

// Hash generation (build-time):
// - SHA-256 hash of static script: ~1ms (one-time at build)
// - Zero runtime overhead (hash in CSP header, script unchanged)

// Recommendation: Use hash for static scripts, nonce for dynamic content

// CSP violation reporting overhead:
document.addEventListener('securitypolicyviolation', async (e) => {
    // ⚠️ VIGYÁZZ: Excessive violations can flood network
    // Throttle reporting to avoid performance degradation
    throttleViolationReport(e); // Max 10 reports/minute
});

// Network overhead:
// - Each violation report: ~500 bytes POST request
// - 100 violations/min = 50KB bandwidth waste
```

**HTTPS/TLS Handshake Performance:**
```javascript
// TLS handshake latency:
// HTTP: 0ms (no handshake)
// HTTPS (TLS 1.2): ~100-200ms (full handshake: 2 round-trips)
// HTTPS (TLS 1.3): ~50-100ms (1 round-trip, 50% faster!)
// HTTPS (TLS 1.3 with 0-RTT): ~0ms (session resumption)

// Performance optimization:
// 1. HTTP/2 + HTTPS (multiplexing over single TLS connection)
// 2. TLS session resumption (reuse handshake for repeat visitors)
// 3. OCSP stapling (avoid CRL lookup latency)

// Measurement example:
const measureTLSHandshake = async (url) => {
    const start = performance.now();
    
    const response = await fetch(url);
    const entries = performance.getEntriesByType('navigation')[0];
    
    if (entries) {
        const tlsHandshake = entries.secureConnectionStart 
            ? entries.connectEnd - entries.secureConnectionStart
            : 0;
        
        console.log(`TLS Handshake: ${tlsHandshake.toFixed(2)}ms`);
        // TLS 1.2: ~150ms
        // TLS 1.3: ~75ms (2x gyorsabb!)
    }
};

// Real-world impact:
// Page load with 20 HTTPS resources:
// - TLS 1.2: 20 × 150ms = 3000ms total TLS overhead
// - TLS 1.3 + H2: 1 connection × 75ms = 75ms (40x gyorsabb!)
```

**Input Sanitization Bottlenecks:**
```javascript
// ❌ ROSSZ: Sanitize on every keystroke (performance killer)
input.addEventListener('keyup', (e) => {
    const sanitized = sanitizeInput(e.target.value); // ~5-10ms per keystroke!
    display.textContent = sanitized;
});
// Typing 60 WPM = 300 keystrokes/min = 5 keystrokes/sec
// Overhead: 5 × 10ms = 50ms/sec (lag noticeable!)

// ✅ JÓ: Debounce sanitization (batch processing)
input.addEventListener('keyup', debounce((e) => {
    const sanitized = sanitizeInput(e.target.value);
    display.textContent = sanitized;
}, 300)); // Sanitize only after 300ms pause

// Performance: 5 keystrokes/sec × 10ms = 50ms → 1 sanitization/3sec × 10ms = 0.003ms avg
// ~16,000x kevesebb CPU usage!
```

**Security Headers Performance:**
```javascript
// Security headers size overhead:
const securityHeaders = {
    'Content-Security-Policy': 450 bytes,  // Average CSP header
    'Strict-Transport-Security': 50 bytes,
    'X-Content-Type-Options': 20 bytes,
    'X-Frame-Options': 15 bytes,
    'X-XSS-Protection': 20 bytes,
    'Referrer-Policy': 25 bytes,
    'Permissions-Policy': 150 bytes
};
// Total: ~730 bytes per response

// Impact:
// - 100 requests/session × 730 bytes = 73KB overhead
// - Modern compression (Brotli): ~10KB actual bandwidth
// - Negligible compared to security benefit

// Performance tip: Cache security headers with Service Worker
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                // Cached response already has security headers
                return response;
            }
            return fetch(event.request);
        })
    );
});
```

</div>

</details>

</div>

<div class="concept-section tools" data-filter="security">

<details>
<summary>🧰 <strong>Kapcsolódó API-k / eszközök</strong></summary>

<div>

**DOMPurify - XSS Sanitization:**
```javascript
// Install: npm install dompurify
import DOMPurify from 'dompurify';

// Basic sanitization
const clean = DOMPurify.sanitize(dirtyHTML);

// Custom configuration
const config = {
    ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href', 'title'],
    ALLOW_DATA_ATTR: false
};
const cleanCustom = DOMPurify.sanitize(dirtyHTML, config);

// Hooks for custom logic
DOMPurify.addHook('afterSanitizeElements', (node) => {
    // Custom validation after sanitization
    if (node.tagName === 'A') {
        const href = node.getAttribute('href');
        if (href && !href.startsWith('https://trusted-domain.com')) {
            node.removeAttribute('href');
        }
    }
});
```

**Helmet.js (Express) - Security Headers:**
```javascript
// Install: npm install helmet
const helmet = require('helmet');
const express = require('express');
const app = express();

// Default security headers
app.use(helmet());

// Custom CSP configuration
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'nonce-abc123'", "https://trusted-cdn.com"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https://api.trusted-service.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: []
    }
}));

// HSTS (Strict-Transport-Security)
app.use(helmet.hsts({
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
}));

// X-Frame-Options
app.use(helmet.frameguard({ action: 'deny' }));
```

**OWASP ZAP - Security Scanner:**
```bash
# Install OWASP ZAP (Zed Attack Proxy)
# GUI: https://www.zaproxy.org/download/

# Command-line scan:
docker run -v $(pwd):/zap/wrk/:rw -t owasp/zap2docker-stable zap-baseline.py \
    -t https://your-website.com -r report.html

# Scan types:
# - Baseline scan: Passive scanning only (~2 minutes)
# - Full scan: Active + passive scanning (~30 minutes)
# - API scan: OpenAPI/Swagger spec scanning

# Common vulnerabilities detected:
# - XSS (Reflected, Stored, DOM-based)
# - CSRF (Missing tokens)
# - Security headers (Missing CSP, HSTS)
# - Cookie security (Missing Secure, HttpOnly, SameSite)
# - SQL injection
# - Insecure dependencies
```

**Burp Suite - Penetration Testing:**
```
Burp Suite Community Edition (free):
- Proxy: Intercept HTTP/HTTPS requests
- Scanner: Automated vulnerability scanning (Pro only)
- Intruder: Brute force attacks
- Repeater: Manual request modification
- Decoder: Encoding/decoding utilities

Common workflows:
1. Configure browser to use Burp proxy (127.0.1:8080)
2. Browse target website (capture traffic)
3. Right-click request → Send to Repeater
4. Modify request (inject XSS/CSRF payloads)
5. Analyze response
```

**Content Security Policy Evaluator:**
```
https://csp-evaluator.withgoogle.com/

// Paste your CSP header and get analysis:
// - Syntax errors
// - Missing directives
// - Weak configurations (e.g., 'unsafe-inline')
// - Bypass techniques

Example report:
✅ script-src 'self' - Good
⚠️ script-src 'unsafe-inline' - Allows inline scripts (XSS risk)
❌ default-src * - Allows everything (no protection)
```

**SecurityHeaders.com - Header Scanner:**
```
https://securityheaders.com/

// Enter URL and get grade (A+ to F)
// Checks:
// - Content-Security-Policy
// - Strict-Transport-Security
// - X-Content-Type-Options
// - X-Frame-Options
// - X-XSS-Protection
// - Referrer-Policy
// - Permissions-Policy

Example result:
A+ rating requires:
✅ CSP with strict policy
✅ HSTS with max-age >= 10886400
✅ X-Content-Type-Options: nosniff
✅ X-Frame-Options: DENY
✅ Referrer-Policy: no-referrer
```

**Web Crypto API - Secure Random:**
```javascript
// Generate secure CSRF token
const generateCSRFToken = () => {
    // Modern approach (Chrome 92+, Firefox 95+)
    return crypto.randomUUID(); // e.g., "a7f8b2c3-1d4e-5f6g-7h8i-9j0k1l2m3n4o"
};

// Generate random bytes (older browsers)
const generateRandomBytes = (length = 32) => {
    const buffer = new Uint8Array(length);
    crypto.getRandomValues(buffer);
    return Array.from(buffer, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Hash password (client-side hashing - supplementary to server-side)
const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
};

// Example: Client-side + server-side double hashing
const clientHash = await hashPassword('userPassword123');
// Send clientHash to server (not plain password over HTTPS)
// Server hashes again with salt + bcrypt/argon2
```

**Subresource Integrity (SRI) - CDN Security:**
```html
<!-- Verify CDN script integrity -->
<script 
    src="https://cdn.example.com/library.js"
    integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/ux..."
    crossorigin="anonymous"
></script>

<!-- Generate SRI hash: -->
<script>
// Command line:
// openssl dgst -sha384 -binary library.js | openssl base64 -A

// Or use online tool:
// https://www.srihash.org/
</script>

<!-- If CDN file is tampered, browser refuses to execute -->
<!-- Protection against CDN compromise attacks -->
```

**npm audit - Dependency Vulnerabilities:**
```bash
# Check for known vulnerabilities
npm audit

# Example output:
# found 5 vulnerabilities (2 moderate, 3 high)
# run `npm audit fix` to fix them

# Automatic fix (patches to safe versions)
npm audit fix

# Force fix (may introduce breaking changes)
npm audit fix --force

# Audit report JSON
npm audit --json > audit-report.json

# CI/CD integration (fail build on high/critical vulnerabilities)
npm audit --audit-level=high
```

**Browser DevTools Security Panel:**
```javascript
// Chrome DevTools:
// 1. Open DevTools (F12)
// 2. Security tab
// 3. Check:
//    - Connection: Valid certificate, TLS version
//    - Certificate: Issuer, expiry, Subject Alternative Names
//    - Resources: Mixed content warnings
//    - Origin: Secure context status

// Lighthouse Security Audit:
// 1. Lighthouse tab
// 2. Run audit
// 3. Security section:
//    - HTTPS usage
//    - HTTP → HTTPS redirects
//    - Vulnerable JavaScript libraries
//    - Mixed content
//    - CSP effectiveness
```

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="security">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

**1) Mi a különbség Reflected, Stored és DOM-based XSS között?**
<details>
<summary>Válasz</summary>

**Reflected XSS**: URL parameter-ből jön vissza (pl. `search?q=<script>alert(1)</script>`), server response-ban, nincs persistence.

**Stored XSS**: Database-ben tárolódik (pl. comment, profile), minden látogatónak végrehajtódik, highest impact.

**DOM-based XSS**: Client-side only (document.location, innerHTML manipulation), never reaches server.

</details>

**2) Hogyan működik a CSRF token double submit cookie pattern?**
<details>
<summary>Válasz</summary>

1. Server random token-t küld cookie-ban (`CSRF-Token: abc123`) + HTML form hidden field-ben
2. Client POST request-ben elküldi mindkettőt: cookie (auto) + form field (manual)
3. Server összehasonlítja: ha megegyeznek → valid request

Attacker nem tudja olvasni cookie-t (SOP), így nem tudja a form field-et kitölteni.

</details>

**3) Mit jelent a CSP nonce és hogyan használod?**
<details>
<summary>Válasz</summary>

**Nonce** = "number used once", random egyedi string minden request-hez.

```html
<!-- Server generates nonce: "r4nd0m" -->
Content-Security-Policy: script-src 'nonce-r4nd0m'

<!-- Inline script with nonce (allowed) -->
<script nonce="r4nd0m">console.log('Safe');</script>

<!-- Inline script without nonce (blocked) -->
<script>console.log('XSS');</script>  <!-- ❌ Blocked! -->
```

Előny: Inline scripts engedélyezése XSS védelem megtartásával.

</details>

**4) Mi a különbség HttpOnly és Secure cookie flag között?**
<details>
<summary>Válasz</summary>

**HttpOnly**: JavaScript nem éri el (`document.cookie`), védelem XSS ellen (session theft prevention).

**Secure**: Csak HTTPS-en küldődik, védelem network sniffing ellen (MITM attack).

```javascript
// Set-Cookie header:
Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Strict

// HttpOnly: document.cookie → nem látható
// Secure: HTTP request → nem küldi el
// SameSite: Cross-site request → nem küldi el
```

</details>

**5) Hogyan működik a HSTS (Strict-Transport-Security)?**
<details>
<summary>Válasz</summary>

HSTS header mondja a böngészőnek: "Mindig HTTPS-t használj ennél a domain-nél".

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

- **max-age**: Meddig érvényes (másodpercben)
- **includeSubDomains**: Subdomains is HTTPS
- **preload**: Hardcode browser-be (Chrome preload list)

Első HTTPS visit után → minden HTTP request automatic HTTPS-re írásírva (browser-side).

</details>

**6) Mikor használnál CSP hash-t inline script helyett nonce-t?**
<details>
<summary>Válasz</summary>

**Hash**: Static inline scripts (build-time hash)
```html
<!-- script content: console.log('Hello'); -->
CSP: script-src 'sha256-base64hash...'
```

**Nonce**: Dynamic inline scripts (runtime generated)
```html
<!-- New nonce every request -->
CSP: script-src 'nonce-r4nd0m123'
```

Hash előny: Nincs server-side nonce generation overhead. Nonce előny: Dynamic content support.

</details>

**7) Hogyan előzöd meg a clickjacking-et?**
<details>
<summary>Válasz</summary>

**X-Frame-Options** header:
```
X-Frame-Options: DENY          # Semelyik frame-ben nem enged
X-Frame-Options: SAMEORIGIN    # Csak same-origin frame-ek
```

**CSP frame-ancestors** (modern):
```
Content-Security-Policy: frame-ancestors 'self'
```

Védelem: Attacker nem tud invisible iframe-be tenni (password form overlay attack).

</details>

**8) Mi a SameSite cookie attribute és mikor használod?**
<details>
<summary>Válasz</summary>

**SameSite** controls mikor küldődik cookie cross-site requests-ben:

- **Strict**: Soha nem küldi cross-site (strongest CSRF protection)
- **Lax**: Only GET navigation (default Chrome 80+)
- **None**: Minden request (requires Secure flag)

```javascript
// Strict: Login session
Set-Cookie: session=abc; SameSite=Strict; Secure

// Lax: Analytics tracking
Set-Cookie: tracking=xyz; SameSite=Lax

// None: Third-party embed (YouTube video)
Set-Cookie: embed=123; SameSite=None; Secure
```

</details>

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

### CORS (Cross-Origin Resource Sharing) {#cors}

<div class="concept-section mental-model" data-filter="security medior">

📋 **Fogalom meghatározása**  
*CORS (Cross-Origin Resource Sharing) browser security policy megakadályozza, hogy web page-ek unauthorized cross-origin requests-et hajtsanak végre. **Same-Origin Policy (SOP)**: origin = protocol + domain + port (https://example.com:443). **Preflight request**: OPTIONS method check server-side CORS policy BEFORE actual request (triggered by custom headers vagy non-simple methods). **Simple requests**: GET/POST/HEAD + simple headers (Content-Type: text/plain, application/x-www-form-urlencoded, multipart/form-data) → no preflight. **CORS headers**: Access-Control-Allow-Origin (domains), Access-Control-Allow-Methods (HTTP methods), Access-Control-Allow-Headers (custom headers), Access-Control-Allow-Credentials (cookies/auth). **Credentials mode**: omit (no cookies), same-origin (csak same-origin), include (cross-origin cookies).*

</div>

<div class="concept-section why-important" data-filter="security medior">

💡 **Miért számít?**
- **Security**: Malicious sites nem férhetnek hozzá user data-hoz más domain-eken
- **API Integration**: Külső API-k használata megköveteli CORS configuration-t
- **Development**: localhost ↔ production server communication CORS hiba gyakori
- **Authentication**: Cookie-based auth cross-origin esetén credentials mode kell

</div>

<div class="runnable-model" data-filter="security">

**Runnable mental model**

**Same-Origin Policy Check:**
```javascript
// Origin comparison examples
const checkSameOrigin = (url1, url2) => {
    const origin1 = new URL(url1);
    const origin2 = new URL(url2);
    
    // Same-origin: protocol + domain + port must match
    const isSameOrigin = 
        origin1.protocol === origin2.protocol &&
        origin1.hostname === origin2.hostname &&
        origin1.port === origin2.port;
    
    return isSameOrigin;
};

// Examples:
checkSameOrigin('https://example.com/api', 'https://example.com/page'); 
// ✅ Same-origin (same protocol, domain, port)

checkSameOrigin('http://example.com', 'https://example.com');
// ❌ Different origin (different protocol)

checkSameOrigin('https://example.com', 'https://api.example.com');
// ❌ Different origin (different subdomain)

checkSameOrigin('https://example.com', 'https://example.com:8080');
// ❌ Different origin (different port)

// Current page origin
console.log('Current origin:', window.location.origin);
// e.g., "https://myapp.com"
```

**Simple vs Preflight Requests:**
```javascript
// SIMPLE REQUEST (No preflight)
// Conditions: GET/POST/HEAD + simple headers + simple Content-Type
fetch('https://api.example.com/users', {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
        // Simple headers only
    }
});
// Browser sends: GET request directly
// No OPTIONS preflight

// PREFLIGHT REQUEST (OPTIONS sent first)
fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',  // Non-simple Content-Type
        'Authorization': 'Bearer token',     // Custom header
        'X-Custom-Header': 'value'           // Custom header
    },
    body: JSON.stringify({ name: 'John' })
});

// Browser sends:
// 1. OPTIONS /users (Preflight)
//    - Access-Control-Request-Method: POST
//    - Access-Control-Request-Headers: authorization, x-custom-header
// 2. If server responds with allowed headers/methods → POST /users (Actual request)
```

**Preflight Request Flow:**
```javascript
// Server receives OPTIONS request (preflight)
// Server must respond:
/*
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization, X-Custom-Header
Access-Control-Max-Age: 86400  // Cache preflight for 24 hours
Access-Control-Allow-Credentials: true
*/

// Then browser sends actual request:
fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer abc123',
        'X-Custom-Header': 'value'
    },
    credentials: 'include',  // Send cookies
    body: JSON.stringify({ name: 'John' })
});

// Server responds with CORS headers:
/*
HTTP/1.1 201 Created
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Credentials: true
Content-Type: application/json

{"id": 123, "name": "John"}
*/
```

**Credentials Mode Examples:**
```javascript
// Mode: 'omit' - No cookies/auth sent (default for cross-origin)
fetch('https://api.example.com/public', {
    credentials: 'omit'
});
// Cookies: ❌ Not sent
// Authorization: Manual header needed

// Mode: 'same-origin' - Cookies only for same-origin
fetch('https://api.example.com/data', {
    credentials: 'same-origin'
});
// Same-origin: ✅ Cookies sent
// Cross-origin: ❌ Cookies blocked

// Mode: 'include' - Cookies for cross-origin (requires server CORS)
fetch('https://api.example.com/user', {
    credentials: 'include'
});
// ✅ Cookies sent (if server allows)
// Server MUST respond:
// Access-Control-Allow-Origin: https://myapp.com (NOT *)
// Access-Control-Allow-Credentials: true
```

**CORS Error Debugging:**
```javascript
// Common CORS error patterns
const debugCORS = async (url, options = {}) => {
    try {
        console.log('🔍 CORS Debug:', {
            url,
            method: options.method || 'GET',
            headers: options.headers,
            credentials: options.credentials,
            currentOrigin: window.location.origin
        });
        
        const response = await fetch(url, options);
        
        // Check CORS headers
        const corsHeaders = {
            'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
            'Access-Control-Allow-Credentials': response.headers.get('Access-Control-Allow-Credentials'),
            'Access-Control-Expose-Headers': response.headers.get('Access-Control-Expose-Headers')
        };
        
        console.log('✅ CORS Success:', corsHeaders);
        return response;
        
    } catch (error) {
        console.error('❌ CORS Error:', error);
        
        // Diagnose error
        if (error.message.includes('CORS')) {
            console.error('Possible causes:');
            console.error('1. Server missing Access-Control-Allow-Origin header');
            console.error('2. credentials: "include" but server allows "*"');
            console.error('3. Custom headers not in Access-Control-Allow-Headers');
            console.error('4. Method not in Access-Control-Allow-Methods');
        }
        
        throw error;
    }
};

// Usage:
debugCORS('https://api.example.com/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name: 'John' })
});
```

**Server-Side CORS Configuration (Express):**
```javascript
// Manual CORS middleware (Node.js/Express)
const corsMiddleware = (req, res, next) => {
    const allowedOrigins = [
        'http://localhost:3000',
        'https://myapp.com',
        'https://www.myapp.com'
    ];
    
    const origin = req.headers.origin;
    
    if (allowedOrigins.includes(origin)) {
        // Allow specific origin
        res.setHeader('Access-Control-Allow-Origin', origin);
        
        // Allow credentials
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        
        // Allow methods
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        
        // Allow headers
        res.setHeader('Access-Control-Allow-Headers', 
            'Content-Type, Authorization, X-Requested-With, X-Custom-Header'
        );
        
        // Expose custom headers to client
        res.setHeader('Access-Control-Expose-Headers', 
            'X-Total-Count, X-Page-Number'
        );
        
        // Cache preflight for 24 hours
        res.setHeader('Access-Control-Max-Age', '86400');
    }
    
    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204); // No Content
    }
    
    next();
};

app.use(corsMiddleware);

// Using cors package (recommended)
const cors = require('cors');

const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            'http://localhost:3000',
            'https://myapp.com'
        ];
        
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['X-Total-Count'],
    maxAge: 86400
};

app.use(cors(corsOptions));
```

**CORS Proxy Pattern (Development):**
```javascript
// Vite proxy configuration (vite.config.js)
export default {
    server: {
        proxy: {
            '/api': {
                target: 'https://api.external.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
                configure: (proxy, options) => {
                    proxy.on('proxyReq', (proxyReq, req, res) => {
                        console.log('Proxying:', req.method, req.url);
                    });
                }
            }
        }
    }
};

// Client code (no CORS issues in development)
fetch('/api/users')  // Proxied to https://api.external.com/users
    .then(res => res.json())
    .then(users => console.log(users));

// Webpack proxy (webpack.config.js)
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://api.external.com',
                pathRewrite: { '^/api': '' },
                changeOrigin: true,
                secure: false  // Accept self-signed certificates
            }
        }
    }
};
```

**JSONP Fallback (Legacy, not recommended):**
```javascript
// JSONP bypasses CORS by using <script> tags
// Only supports GET requests, security risks

const jsonp = (url, callbackName = 'callback') => {
    return new Promise((resolve, reject) => {
        const callbackId = `jsonp_${Date.now()}`;
        
        window[callbackId] = (data) => {
            document.head.removeChild(script);
            delete window[callbackId];
            resolve(data);
        };
        
        const script = document.createElement('script');
        script.src = `${url}?${callbackName}=${callbackId}`;
        script.onerror = () => {
            document.head.removeChild(script);
            delete window[callbackId];
            reject(new Error('JSONP failed'));
        };
        
        document.head.appendChild(script);
    });
};

// Server must respond with: callbackId({"data": "value"});
// ⚠️ Security risk: Executes arbitrary JavaScript from external source
```
*Figyeld meg: Preflight csak complex requests-nél, credentials mode strict CORS config kell.*

</div>

<div class="concept-section myths" data-filter="security">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- **"CORS server-side problem, client nem tud semmit"** → **Valójában**: CORS browser policy, server config + client credentials mode együtt kell
- **"Access-Control-Allow-Origin: * elég minden esetben"** → **Valójában**: credentials: 'include' esetén konkrét origin kell, * nem működik
- **"CORS csak production-ben probléma"** → **Valójában**: Development is (localhost:3000 → localhost:5000 = cross-origin), proxy megoldás
- **"Preflight OPTIONS request-et manually kell küldeni"** → **Valójában**: Browser automatically küldi complex requests előtt
- **"CORS error = server down"** → **Valójában**: Server működik, de CORS headers hiányoznak/hibásak

</div>

</details>

</div>

<div class="concept-section performance" data-filter="security performance">

<details>
<summary>🚀 <strong>Performance corner</strong></summary>

<div>

**Preflight Request Overhead:**
```javascript
// OPTIONS preflight adds latency (extra round-trip)
// Latency: 100ms OPTIONS + 100ms POST = 200ms total

// ❌ ROSSZ: Every request triggers preflight
fetch('https://api.example.com/data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Custom-Header': 'value'  // Triggers preflight
    },
    body: JSON.stringify(data)
});
// Total: 10 requests × 200ms = 2000ms

// ✅ JÓ: Server caches preflight with Access-Control-Max-Age
// Server response:
// Access-Control-Max-Age: 86400  // 24 hours

// First request: 200ms (preflight + actual)
// Next requests (within 24h): 100ms (actual only)
// Total: 1 × 200ms + 9 × 100ms = 1100ms (45% faster!)
```

**Simple Requests Performance:**
```javascript
// Simple requests skip preflight (faster)
// Use when possible for performance

// ✅ FAST: Simple request (no preflight)
fetch('https://api.example.com/data', {
    method: 'GET',
    headers: {
        'Accept': 'application/json'  // Simple header
    }
});
// Latency: 100ms (no preflight)

// ❌ SLOW: Complex request (preflight required)
fetch('https://api.example.com/data', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer token',  // Custom header → preflight
        'Accept': 'application/json'
    }
});
// Latency: 200ms (preflight + request)

// Performance tip: Use query parameters for auth when possible
fetch('https://api.example.com/data?token=abc123');
// Latency: 100ms (simple request, no preflight)
```

**Credentials Mode Impact:**
```javascript
// credentials: 'include' adds cookie overhead
// Each request: +500-2000 bytes (cookies)

// ❌ SLOW: Large cookies sent every request
document.cookie = 'session=abc...xyz'; // 4KB cookie
document.cookie = 'preferences=...';    // 2KB cookie
// Total: 6KB overhead per request
// 100 requests = 600KB bandwidth waste

// ✅ FAST: Small session ID, data server-side
document.cookie = 'sid=abc123'; // 20 bytes
// 100 requests = 2KB overhead (300x better!)

// Performance: credentials: 'omit' = no cookie overhead
fetch(url, { credentials: 'omit' }); // 0 bytes cookie overhead
```

**CORS Proxy Performance:**
```javascript
// Development proxy adds latency
// Client → Proxy → API Server → Proxy → Client

// Direct request (production):
// Client → API Server: 100ms round-trip

// Proxy request (development):
// Client → Proxy: 10ms
// Proxy → API Server: 100ms
// Total: 110ms (10% slower, acceptable for dev)

// ⚠️ VIGYÁZZ: Public CORS proxy = huge latency
// Client → CORS Anywhere → API: 500-1000ms
// Only for development/testing, NEVER production
```

**Access-Control-Max-Age Optimization:**
```javascript
// Preflight cache duration impact
// Max-Age: 0 = preflight every request
// Max-Age: 86400 (24h) = preflight once per day

// Benchmark (100 POST requests):
// Max-Age: 0 → 100 preflights × 100ms = 10000ms overhead
// Max-Age: 3600 (1h) → 1 preflight × 100ms = 100ms overhead
// Savings: 99% less preflight requests!

// Recommended values:
// Development: Access-Control-Max-Age: 600 (10 min)
// Production: Access-Control-Max-Age: 86400 (24 hours)

// Measure preflight cache hit rate:
let preflightCount = 0;
const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        if (entry.name.includes('OPTIONS')) {
            preflightCount++;
            console.log(`Preflight #${preflightCount}: ${entry.name}`);
        }
    });
});
observer.observe({ entryTypes: ['resource'] });

// Expected: 1 preflight per unique endpoint per Max-Age duration
```

**CORS Error Recovery Time:**
```javascript
// CORS errors fail fast (no retry overhead)
// Typical CORS error: 5-50ms (quick browser rejection)

fetch('https://api.blocked.com/data')
    .catch(err => {
        console.log('CORS blocked in ~10ms');
        // No server round-trip if browser blocks immediately
    });

// Compare to server error:
// - CORS error: ~10ms (browser-side block)
// - 403 Forbidden: ~100-200ms (server round-trip)
// CORS fail = 10-20x faster than server reject
```

</div>

</details>

</div>

<div class="concept-section tools" data-filter="security">

<details>
<summary>🧰 <strong>Kapcsolódó API-k / eszközök</strong></summary>

<div>

**Chrome DevTools Network Tab:**
```javascript
// 1. Open DevTools (F12) → Network tab
// 2. Filter by "Fetch/XHR"
// 3. Look for:
//    - OPTIONS request (preflight)
//    - Response headers: Access-Control-*
//    - Status: 200 (success) or CORS error

// Common CORS errors in console:
// "Access to fetch at '...' has been blocked by CORS policy:
//  No 'Access-Control-Allow-Origin' header is present"

// Inspect CORS headers:
// Request Headers:
//   - Origin: https://myapp.com
//   - Access-Control-Request-Method: POST (preflight)
//   - Access-Control-Request-Headers: authorization (preflight)

// Response Headers:
//   - Access-Control-Allow-Origin: https://myapp.com
//   - Access-Control-Allow-Credentials: true
//   - Access-Control-Max-Age: 86400
```

**cors npm package (Node.js):**
```bash
npm install cors

# Usage:
```

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

// Simple usage (allow all origins - development only)
app.use(cors());

// Configured usage (production)
app.use(cors({
    origin: ['https://myapp.com', 'https://www.myapp.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['X-Total-Count'],
    maxAge: 86400
}));

// Dynamic origin validation
app.use(cors({
    origin: (origin, callback) => {
        const allowlist = ['https://myapp.com'];
        if (!origin || allowlist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
```

**Postman / Insomnia (CORS Testing):**
```
Postman/Insomnia bypass CORS (not browser-based)
- Useful for testing API without CORS restrictions
- ⚠️ VIGYÁZZ: If works in Postman but fails in browser → CORS issue

Testing workflow:
1. Test in Postman → Works?
2. Test in browser → CORS error?
3. Check server CORS headers
4. Add missing Access-Control-* headers
```

**Browser CORS extensions (Development ONLY):**
```
Chrome: CORS Unblock extension
Firefox: CORS Everywhere addon

⚠️ WARNING: 
- Only for development/testing
- NEVER use in production
- Disables browser security
- Can expose user data
```

**curl (Command-line CORS testing):**
```bash
# Test preflight request
curl -X OPTIONS https://api.example.com/users \
  -H "Origin: https://myapp.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type, Authorization" \
  -v

# Expected response headers:
# Access-Control-Allow-Origin: https://myapp.com
# Access-Control-Allow-Methods: GET, POST, PUT, DELETE
# Access-Control-Allow-Headers: Content-Type, Authorization
# Access-Control-Max-Age: 86400

# Test actual request with Origin header
curl -X POST https://api.example.com/users \
  -H "Origin: https://myapp.com" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token" \
  -d '{"name":"John"}' \
  -v

# Check response for:
# Access-Control-Allow-Origin: https://myapp.com
# Access-Control-Allow-Credentials: true
```

**CORS Tester (Online Tool):**
```
https://www.test-cors.org/

// Test any endpoint for CORS support
// Input: API URL, HTTP method, headers
// Output: CORS headers, preflight status, error diagnosis
```

**Webpack/Vite Dev Proxy:**
```javascript
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

// webpack.config.js
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://api.external.com',
                pathRewrite: { '^/api': '' },
                changeOrigin: true
            }
        }
    }
};

// Usage: fetch('/api/users') → proxied to https://api.external.com/users
```

**nginx CORS configuration:**
```nginx
# nginx.conf
location /api {
    # Handle preflight
    if ($request_method = 'OPTIONS') {
        add_header 'Access-Control-Allow-Origin' '$http_origin' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization' always;
        add_header 'Access-Control-Max-Age' 86400 always;
        return 204;
    }
    
    # Add CORS headers to all responses
    add_header 'Access-Control-Allow-Origin' '$http_origin' always;
    add_header 'Access-Control-Allow-Credentials' 'true' always;
    
    proxy_pass http://backend:3000;
}
```

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="security">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

**1) Mi az a Same-Origin Policy és hogyan definiálódik az origin?**
<details>
<summary>Válasz</summary>

**Same-Origin Policy**: Browser security mechanism, amely megakadályozza, hogy egyik origin hozzáférjen másik origin resource-aihoz.

**Origin**: `protocol://domain:port`

Példák:
- `https://example.com` ≠ `http://example.com` (különböző protocol)
- `https://example.com` ≠ `https://api.example.com` (különböző subdomain)
- `https://example.com` ≠ `https://example.com:8080` (különböző port)

</details>

**2) Mikor küldi a browser a preflight OPTIONS request-et?**
<details>
<summary>Válasz</summary>

**Preflight triggers**:
1. Custom HTTP methods (PUT, DELETE, PATCH)
2. Custom headers (Authorization, X-Custom-Header)
3. Content-Type NOT in: text/plain, application/x-www-form-urlencoded, multipart/form-data

**Simple requests (NO preflight)**:
- GET, POST, HEAD methods
- Simple headers only (Accept, Accept-Language, Content-Language)
- Content-Type: text/plain, application/x-www-form-urlencoded, multipart/form-data

</details>

**3) Miért nem működik credentials: 'include' ha Access-Control-Allow-Origin: *?**
<details>
<summary>Válasz</summary>

**Security reason**: Wildcard (*) + credentials = vulnerable to CSRF attacks.

Browser blocks:
```javascript
fetch(url, { credentials: 'include' });
// Server: Access-Control-Allow-Origin: *
// ❌ Error: "Wildcard not allowed with credentials"
```

**Fix**: Specify exact origin:
```javascript
// Server response:
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Credentials: true
// ✅ Works with credentials: 'include'
```

</details>

**4) Hogyan cache-eli a browser a preflight request-et?**
<details>
<summary>Válasz</summary>

**Access-Control-Max-Age** header:
```
Access-Control-Max-Age: 86400  // 24 hours
```

Browser cache-eli preflight eredményét Max-Age időtartamra. Következő requests (same endpoint, same headers) → skip preflight.

Performance: 100 requests × 200ms → 1 preflight (200ms) + 99 direct (100ms each) = 10100ms (vs 20000ms without cache).

</details>

**5) Mi a különbség credentials: 'omit', 'same-origin', 'include' között?**
<details>
<summary>Válasz</summary>

**omit**: Soha nem küld cookies/auth (cross-origin default).

**same-origin**: Cookies csak same-origin requests-hez (default).

**include**: Cookies cross-origin requests-hez is (requires server CORS config).

```javascript
// Same-origin: https://myapp.com/page → https://myapp.com/api
fetch('/api', { credentials: 'same-origin' }); // ✅ Cookies sent

// Cross-origin: https://myapp.com → https://api.example.com
fetch('https://api.example.com', { credentials: 'include' });
// ✅ Cookies sent IF server allows
```

</details>

**6) Hogyan debuggolod a CORS hibákat?**
<details>
<summary>Válasz</summary>

**Chrome DevTools checklist**:
1. Network tab → Failed request → Response headers
2. Check: `Access-Control-Allow-Origin` present?
3. Check: Origin matches request origin?
4. Check: `Access-Control-Allow-Credentials: true` (if credentials: 'include')
5. Look for OPTIONS preflight (complex requests)
6. Console error message describes issue

**Common errors**:
- "No Access-Control-Allow-Origin header" → Server config missing
- "Origin not in allowed list" → Server whitelist doesn't include your origin
- "Wildcard not allowed with credentials" → Use specific origin, not *

</details>

**7) Mikor használj CORS proxy-t és mikor ne?**
<details>
<summary>Válasz</summary>

**✅ Use proxy**:
- Development only (Vite/Webpack dev server)
- Testing third-party APIs locally
- Quick prototyping

**❌ Never in production**:
- Public CORS proxies (security risk, slow, unreliable)
- Exposing API keys through proxy
- Production API calls

**Best practice**: Development proxy → Production proper CORS headers on API server.

</details>

**8) Hogyan optimalizálod a preflight performance-ot?**
<details>
<summary>Válasz</summary>

**1. Maximize Access-Control-Max-Age**:
```
Access-Control-Max-Age: 86400  // 24 hours (cache preflight)
```

**2. Use simple requests when possible**:
- Avoid custom headers if not needed
- Use GET instead of POST when appropriate
- Use query parameters instead of Authorization header

**3. Batch requests**:
- 1 request with multiple IDs instead of N requests
- GraphQL (1 endpoint, no multiple preflights)

**Performance**: 100 individual POST requests = 100 preflights (~10s). 1 batch POST = 1 preflight (~100ms).

</details>

</div>

</details>

</div>

---

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
    <!-- <script src="your-script.js"></script> -->
</body>
```

**Modern megoldás - defer/async:**
```html
<head>
    <!-- async: letöltődik párhuzamosan, azonnal futtatódik -->
    <!-- <script async src="example-analytics.js"></script> -->
    
    <!-- defer: letöltődik párhuzamosan, DOM után futtatódik -->
    <!-- <script defer src="example-main.js"></script> -->
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

### JavaScript Event Loop & Browser Rendering Pipeline {#event-loop-rendering}

<div class="concept-section mental-model" data-filter="javascript medior">

📋 **Fogalom meghatározása**  
*JavaScript Event Loop single-threaded asynchronous execution model: **Call Stack** (function execution frames, LIFO), **Task Queue/Macro Task Queue** (setTimeout, setInterval, I/O callbacks), **Microtask Queue** (Promise.then, queueMicrotask, MutationObserver - higher priority than tasks), **Web APIs** (browser-provided: fetch, DOM events, timers). Execution: 1) Run synchronous code (stack), 2) Stack empty → Process ALL microtasks, 3) Render if needed, 4) Process ONE macro task, 5) Repeat. Browser Rendering Pipeline: JavaScript execution → Style calculation → Layout → Paint → Composite. **RequestAnimationFrame** (rAF) runs before paint, **RequestIdleCallback** (rIC) runs when idle.*

</div>

<div class="concept-section why-important" data-filter="javascript medior">

💡 **Miért számít?**
- **Non-blocking I/O**: Async operations nem blokkolják a UI-t
- **Performance**: Event loop megértése → smooth 60 FPS animations
- **Bug Prevention**: Race conditions, timing issues elkerülése
- **Browser Optimization**: rAF használata jitter-free animations-hoz

</div>

<div class="runnable-model" data-filter="javascript">

**Runnable mental model**

**Event Loop Visualization:**
```javascript
// Event Loop Components:
// 1. Call Stack (LIFO - Last In First Out)
// 2. Web APIs (Browser threads: timers, fetch, DOM)
// 3. Macro Task Queue (setTimeout, setInterval, I/O)
// 4. Microtask Queue (Promise.then, queueMicrotask)

// Execution order example:
console.log('1. Sync start');

setTimeout(() => {
    console.log('5. Macro task (setTimeout)');
}, 0);

Promise.resolve().then(() => {
    console.log('3. Microtask (Promise)');
});

queueMicrotask(() => {
    console.log('4. Microtask (queueMicrotask)');
});

console.log('2. Sync end');

// Output:
// 1. Sync start
// 2. Sync end
// 3. Microtask (Promise)
// 4. Microtask (queueMicrotask)
// 5. Macro task (setTimeout)

// Explanation:
// Step 1: Synchronous code runs first (Call Stack)
// Step 2: Call Stack empty → Process ALL microtasks
// Step 3: Render if needed (browser decides)
// Step 4: Process ONE macro task from queue
// Step 5: Repeat from Step 2
```

**Microtask vs Macro Task Priority:**
```javascript
// Demonstrate microtask priority
console.log('Start');

setTimeout(() => console.log('Timeout 1'), 0);

Promise.resolve()
    .then(() => console.log('Promise 1'))
    .then(() => {
        console.log('Promise 2');
        setTimeout(() => console.log('Timeout 2'), 0);
    })
    .then(() => console.log('Promise 3'));

setTimeout(() => console.log('Timeout 3'), 0);

console.log('End');

// Output:
// Start
// End
// Promise 1        ← All microtasks first
// Promise 2        ← All microtasks first
// Promise 3        ← All microtasks first
// Timeout 1        ← Then macro tasks (one per loop iteration)
// Timeout 3        ← (Timeout 2 queued during Promise 2, so processed later)
// Timeout 2
```

**Call Stack Deep Dive:**
```javascript
// Stack trace visualization
function first() {
    console.log('First function');
    second();
    console.log('First function end');
}

function second() {
    console.log('Second function');
    third();
    console.log('Second function end');
}

function third() {
    console.log('Third function');
    console.trace('Stack trace:'); // Shows call stack
}

first();

// Call Stack during third():
// [Bottom] → Global Execution Context
//         → first()
//         → second()
// [Top]   → third()

// Output:
// First function
// Second function
// Third function
// Stack trace:
//   at third (...)
//   at second (...)
//   at first (...)
//   at <anonymous>
// Second function end
// First function end
```

**Stack Overflow Example:**
```javascript
// ❌ ROSSZ: Infinite recursion (stack overflow)
function recursiveFunction() {
    recursiveFunction(); // No base case!
}

try {
    recursiveFunction();
} catch (error) {
    console.error(error.name); // RangeError
    console.error(error.message); // Maximum call stack size exceeded
}

// ✅ JÓ: Tail call optimization simulation with setTimeout
function recursiveWithEventLoop(n) {
    if (n === 0) return;
    
    console.log(n);
    
    // Use setTimeout to clear call stack
    setTimeout(() => recursiveWithEventLoop(n - 1), 0);
}

recursiveWithEventLoop(100000); // Works! (no stack overflow)
```

**Browser Rendering Pipeline Integration:**
```javascript
// Rendering happens between event loop iterations
// Order: Script → Style → Layout → Paint → Composite

// Blocking rendering with long task
console.log('Start');

// ❌ ROSSZ: Long synchronous task blocks rendering
const start = Date.now();
while (Date.now() - start < 3000) {
    // 3 second blocking task
    // User sees frozen UI (no scroll, no click)
}

console.log('End'); // Only logs after 3 seconds

// ✅ JÓ: Break work into chunks with setTimeout
function longTaskOptimized(iterations, callback) {
    const chunkSize = 1000;
    let processed = 0;

    function processChunk() {
        const end = Math.min(processed + chunkSize, iterations);
        
        for (let i = processed; i < end; i++) {
            // Do work
        }
        
        processed = end;
        
        if (processed < iterations) {
            setTimeout(processChunk, 0); // Let rendering happen
        } else {
            callback();
        }
    }

    processChunk();
}

longTaskOptimized(1000000, () => console.log('Done!'));
// UI remains responsive (scroll, click work)
```

**RequestAnimationFrame (rAF) - Smooth Animations:**
```javascript
// rAF runs before next paint (perfect for animations)
// Automatically throttled to display refresh rate (60 FPS)

let position = 0;

function animate() {
    position += 2; // Move 2px per frame
    
    const element = document.getElementById('box');
    element.style.transform = `translateX(${position}px)`;
    
    if (position < 500) {
        requestAnimationFrame(animate); // Next frame
    }
}

// Start animation
requestAnimationFrame(animate);

// ❌ ROSSZ: setTimeout for animation (inconsistent timing)
function animateWithTimeout() {
    position += 2;
    element.style.transform = `translateX(${position}px)`;
    
    if (position < 500) {
        setTimeout(animateWithTimeout, 16); // ~60 FPS target
        // Problem: Not synced with display refresh!
        // Result: Jitter, frame drops
    }
}

// Performance comparison:
// rAF: Smooth 60 FPS, synced with display
// setTimeout: 30-45 FPS, jittery (not synced)
```

**RequestIdleCallback (rIC) - Low Priority Work:**
```javascript
// rIC runs when browser is idle (after rendering, no pending tasks)
// Perfect for non-critical background work

function logAnalytics(data) {
    // Non-critical analytics logging
    console.log('Logging:', data);
}

// ❌ ROSSZ: Immediate execution (blocks critical work)
document.addEventListener('click', (e) => {
    // Critical: Handle click
    handleClick(e);
    
    // Non-critical: Analytics (blocks UI!)
    logAnalytics({ type: 'click', target: e.target });
});

// ✅ JÓ: Defer with requestIdleCallback
document.addEventListener('click', (e) => {
    handleClick(e);
    
    // Defer analytics until browser is idle
    requestIdleCallback(() => {
        logAnalytics({ type: 'click', target: e.target });
    }, { timeout: 2000 }); // Max 2s wait
});

// Advanced: Process work in idle chunks
function processIdleWork(tasks) {
    function processTasks(deadline) {
        while (deadline.timeRemaining() > 0 && tasks.length > 0) {
            const task = tasks.shift();
            task(); // Execute task
        }
        
        if (tasks.length > 0) {
            requestIdleCallback(processTasks); // Continue when idle
        }
    }
    
    requestIdleCallback(processTasks);
}

const heavyTasks = Array.from({ length: 1000 }, (_, i) => 
    () => console.log(`Task ${i}`)
);

processIdleWork(heavyTasks); // Runs without blocking UI
```

**MutationObserver (Microtask):**
```javascript
// MutationObserver callbacks are microtasks
// Higher priority than setTimeout, lower than Promise.then

const observer = new MutationObserver((mutations) => {
    console.log('3. MutationObserver (microtask)');
});

observer.observe(document.body, { childList: true });

console.log('1. Sync');

Promise.resolve().then(() => console.log('2. Promise (microtask)'));

document.body.appendChild(document.createElement('div')); // Trigger observer

setTimeout(() => console.log('4. setTimeout (macro task)'), 0);

console.log('5. Sync end');

// Output:
// 1. Sync
// 5. Sync end
// 2. Promise (microtask)
// 3. MutationObserver (microtask)
// 4. setTimeout (macro task)
```

**Visual Event Loop Debugger:**
```javascript
// Visualize event loop execution order
class EventLoopVisualizer {
    constructor() {
        this.log = [];
    }
    
    trackSync(label) {
        this.log.push({ type: 'sync', label, time: performance.now() });
    }
    
    trackMicrotask(label) {
        queueMicrotask(() => {
            this.log.push({ type: 'microtask', label, time: performance.now() });
        });
    }
    
    trackMacrotask(label, delay = 0) {
        setTimeout(() => {
            this.log.push({ type: 'macrotask', label, time: performance.now() });
        }, delay);
    }
    
    trackPromise(label) {
        Promise.resolve().then(() => {
            this.log.push({ type: 'promise', label, time: performance.now() });
        });
    }
    
    print() {
        setTimeout(() => {
            console.table(this.log);
        }, 100); // Wait for all tasks to complete
    }
}

// Usage:
const viz = new EventLoopVisualizer();

viz.trackSync('Start');
viz.trackMacrotask('Timeout 1', 0);
viz.trackPromise('Promise 1');
viz.trackMicrotask('Microtask 1');
viz.trackSync('End');
viz.print();

// Output table:
// ┌─────────┬─────────────┬───────────────┬──────────────┐
// │ (index) │    type     │     label     │     time     │
// ├─────────┼─────────────┼───────────────┼──────────────┤
// │    0    │   'sync'    │    'Start'    │  12345.67    │
// │    1    │   'sync'    │     'End'     │  12345.89    │
// │    2    │  'promise'  │  'Promise 1'  │  12346.12    │
// │    3    │'microtask'  │'Microtask 1'  │  12346.34    │
// │    4    │'macrotask'  │ 'Timeout 1'   │  12346.78    │
// └─────────┴─────────────┴───────────────┴──────────────┘
```
*Figyeld meg: Microtasks ALWAYS execute before next macro task. rAF syncs with display refresh.*

</div>

<div class="concept-section myths" data-filter="javascript">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- **"setTimeout(fn, 0) futtat azonnal"** → **Valójában**: Macro task queue-ba teszi, AFTER all microtasks és current stack cleared
- **"JavaScript multi-threaded Promise-okkal"** → **Valójában**: Single-threaded, Web APIs (fetch, timers) run on separate browser threads, de callback-ek main thread-en futnak
- **"requestAnimationFrame ugyanaz mint setTimeout(fn, 16)"** → **Valójában**: rAF synced with display refresh (60 FPS), setTimeout nem, jitter prone
- **"Microtask és macro task ugyanaz"** → **Valójában**: Microtasks higher priority, ALL microtasks run before next macro task
- **"Event loop csak Node.js-ben van"** → **Valójában**: Browser is event loop-ot használ (de eltérő implementation details)

</div>

</details>

</div>

<div class="concept-section performance" data-filter="javascript performance">

<details>
<summary>🚀 <strong>Performance corner</strong></summary>

<div>

**Long Task Performance Impact:**
```javascript
// Long task definition: >50ms blocking main thread
// Impact: Drops frames, freezes UI, poor user experience

// ❌ ROSSZ: 500ms blocking task
function heavyComputation() {
    const start = performance.now();
    let result = 0;
    
    for (let i = 0; i < 1e9; i++) {
        result += Math.sqrt(i);
    }
    
    const duration = performance.now() - start;
    console.log(`Blocked for ${duration}ms`); // ~500ms
    // Result: 30 dropped frames at 60 FPS (500ms / 16.67ms per frame)
}

// ✅ JÓ: Break into chunks (maintain 60 FPS)
async function heavyComputationOptimized() {
    let result = 0;
    const chunkSize = 1e6; // Process 1M per chunk
    
    for (let start = 0; start < 1e9; start += chunkSize) {
        const end = Math.min(start + chunkSize, 1e9);
        
        for (let i = start; i < end; i++) {
            result += Math.sqrt(i);
        }
        
        // Yield to browser (allow rendering)
        await new Promise(resolve => setTimeout(resolve, 0));
    }
    
    console.log('Done, UI stayed responsive!');
}

// Performance: 0 dropped frames, smooth scrolling maintained
```

**Microtask Queue Starvation:**
```javascript
// ⚠️ VIGYÁZZ: Infinite microtasks block rendering!
function infiniteMicrotasks() {
    Promise.resolve().then(() => {
        console.log('Microtask');
        infiniteMicrotasks(); // Recurse immediately
    });
}

infiniteMicrotasks();
// Result: Browser FROZEN (rendering never happens)
// Reason: Microtasks run until queue empty → never empties!

// ✅ JÓ: Use macro task (setTimeout) to allow rendering
function controlledRecursion(n) {
    if (n === 0) return;
    
    console.log(n);
    setTimeout(() => controlledRecursion(n - 1), 0); // Macro task
}

controlledRecursion(10000); // UI responsive
```

**RequestAnimationFrame Performance:**
```javascript
// rAF automatically throttles to display refresh rate
// 60 Hz display = 60 FPS = 16.67ms per frame

let frameCount = 0;
let startTime = performance.now();

function measureRAF() {
    frameCount++;
    
    if (frameCount === 60) {
        const elapsed = performance.now() - startTime;
        const fps = (frameCount / elapsed) * 1000;
        console.log(`FPS: ${fps.toFixed(2)}`); // ~60 FPS
        
        // Reset
        frameCount = 0;
        startTime = performance.now();
    }
    
    requestAnimationFrame(measureRAF);
}

requestAnimationFrame(measureRAF);

// Performance comparison:
// rAF: Consistent 60 FPS (16.67ms per frame)
// setTimeout(fn, 16): Variable 45-55 FPS (jitter)
// setInterval(fn, 16): Drift over time (not synced)
```

**Call Stack Size Limits:**
```javascript
// Browser call stack limits (varies by browser):
// Chrome: ~10,000-15,000 frames
// Firefox: ~50,000 frames
// Safari: ~20,000 frames

function measureStackDepth() {
    let depth = 0;
    
    function recurse() {
        depth++;
        try {
            recurse();
        } catch (e) {
            console.log(`Max stack depth: ${depth}`);
            // Chrome: ~10,000
            // Firefox: ~50,000
        }
    }
    
    recurse();
}

measureStackDepth();

// Performance: Stack overflow = ~100-500ms crash time
// Solution: Use iterative algorithms or setTimeout for deep recursion
```

**Idle Callback Performance:**
```javascript
// requestIdleCallback deadline budget
// Typical: 50ms idle time between frames (at 60 FPS)

requestIdleCallback((deadline) => {
    console.log('Time remaining:', deadline.timeRemaining());
    // Typical: 15-45ms (varies by browser load)
    
    console.log('Did timeout:', deadline.didTimeout);
    // false = called during idle time
    // true = timeout reached (forced execution)
});

// Performance strategy:
// - Critical work: Use rAF (next frame)
// - Important work: Use setTimeout(fn, 0) (next task)
// - Background work: Use rIC (when idle)
```

**Event Loop Iteration Time:**
```javascript
// Measure single event loop iteration
let lastTime = performance.now();

function measureLoop() {
    const now = performance.now();
    const delta = now - lastTime;
    
    console.log(`Loop iteration: ${delta.toFixed(2)}ms`);
    // Idle: ~16.67ms (60 FPS)
    // Busy: ~50-100ms (dropped frames)
    
    lastTime = now;
    setTimeout(measureLoop, 0); // Next iteration
}

measureLoop();
```

</div>

</details>

</div>

<div class="concept-section tools" data-filter="javascript">

<details>
<summary>🧰 <strong>Kapcsolódó API-k / eszközök</strong></summary>

<div>

**Chrome DevTools Performance Profiler:**
```javascript
// 1. Open DevTools (F12) → Performance tab
// 2. Click Record (Ctrl+E)
// 3. Interact with page
// 4. Stop recording
// 5. Analyze:
//    - Main thread: Call stack, tasks, rendering
//    - Frames: 60 FPS green line (above = dropped frames)
//    - Bottom-Up: Time spent per function
//    - Call Tree: Execution hierarchy
//    - Event Log: Task/microtask order

// Long Task API (programmatic detection)
const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        if (entry.duration > 50) {
            console.warn('Long task detected:', {
                duration: entry.duration,
                startTime: entry.startTime,
                name: entry.name
            });
        }
    });
});

observer.observe({ entryTypes: ['longtask'] });
```

**Performance.measure() for Event Loop:**
```javascript
// Track event loop timing
performance.mark('task-start');

setTimeout(() => {
    performance.mark('task-end');
    performance.measure('macro-task-time', 'task-start', 'task-end');
    
    const measure = performance.getEntriesByName('macro-task-time')[0];
    console.log(`Macro task took ${measure.duration}ms`);
}, 0);

Promise.resolve().then(() => {
    performance.mark('microtask-end');
    performance.measure('microtask-time', 'task-start', 'microtask-end');
    
    const measure = performance.getEntriesByName('microtask-time')[0];
    console.log(`Microtask took ${measure.duration}ms`);
});
```

**Scheduler API (Experimental):**
```javascript
// New API for prioritized task scheduling
// (Chrome 94+, experimental)

// High priority (user-blocking)
scheduler.postTask(() => {
    console.log('Critical UI update');
}, { priority: 'user-blocking' });

// Low priority (background)
scheduler.postTask(() => {
    console.log('Background analytics');
}, { priority: 'background' });

// Priorities: user-blocking > user-visible > background
```

**Jake Archibald's Event Loop Visualizer:**
```
https://github.com/latentflip/loupe

// Interactive visualization:
// - Call Stack
// - Web APIs
// - Callback Queue (Macro tasks)
// - Event Loop
// - Console output

// Try code snippets and see execution order visually
```

**React Profiler (Event Loop Impact):**
```javascript
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration) {
    if (actualDuration > 16.67) {
        console.warn(`Component ${id} blocked frame (${actualDuration}ms)`);
        // Optimization needed: breaks 60 FPS budget
    }
}

<Profiler id="App" onRender={onRenderCallback}>
    <App />
</Profiler>
```

**Web Workers (Offload to Separate Thread):**
```javascript
// Main thread (UI):
const worker = new Worker('heavy-work.js');

worker.postMessage({ type: 'compute', data: largeArray });

worker.onmessage = (e) => {
    console.log('Result from worker:', e.data);
    // Main thread stays responsive!
};

// heavy-work.js (Worker thread):
self.onmessage = (e) => {
    if (e.data.type === 'compute') {
        const result = expensiveComputation(e.data.data);
        self.postMessage(result);
    }
};

// Performance: Main thread 0% blocked, 60 FPS maintained
```

**Console.time() for Async Timing:**
```javascript
console.time('Total');

console.time('Sync');
for (let i = 0; i < 1e6; i++) {}
console.timeEnd('Sync'); // ~5ms

console.time('Microtask');
Promise.resolve().then(() => {
    console.timeEnd('Microtask'); // ~0.1ms
});

console.time('Macrotask');
setTimeout(() => {
    console.timeEnd('Macrotask'); // ~5-10ms
    console.timeEnd('Total'); // ~10-15ms
}, 0);

// Output:
// Sync: 5.2ms
// Microtask: 0.1ms
// Macrotask: 7.3ms
// Total: 12.6ms
```

**Lighthouse Performance Audit:**
```bash
# CLI:
npm install -g lighthouse
lighthouse https://example.com --view

# Metrics related to event loop:
# - Total Blocking Time (TBT): Sum of blocking time >50ms
# - Time to Interactive (TTI): When main thread is idle
# - First Input Delay (FID): Event loop responsiveness

# Good TBT: < 200ms
# Poor TBT: > 600ms (too many long tasks)
```

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="javascript">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

**1) Mi a különbség microtask és macro task között?**
<details>
<summary>Válasz</summary>

**Microtask**: Promise.then, queueMicrotask, MutationObserver. Higher priority, ALL microtasks run before next macro task.

**Macro task**: setTimeout, setInterval, I/O, user events. Lower priority, ONE macro task per event loop iteration.

Execution order: Sync → ALL microtasks → Render → ONE macro task → Repeat.

</details>

**2) Miért nem hajtódik végre azonnal a setTimeout(fn, 0)?**
<details>
<summary>Válasz</summary>

`setTimeout(fn, 0)` macro task queue-ba teszi a callback-et. Előbb futnak le:
1. Current stack (sync code)
2. ALL microtasks (Promise.then, queueMicrotask)
3. Browser rendering (if needed)
4. THEN macro task (setTimeout callback)

Minimum delay: ~1-4ms (browser-dependent).

</details>

**3) Mikor használd a requestAnimationFrame-et setTimeout helyett?**
<details>
<summary>Válasz</summary>

**rAF**: Animations, visual updates. Synced with display refresh (60 FPS), runs BEFORE paint.

**setTimeout**: Non-visual async work. NOT synced with display → jitter, frame drops.

```javascript
// ✅ JÓ: Smooth animation
requestAnimationFrame(() => {
    element.style.left = `${pos}px`;
});

// ❌ ROSSZ: Jittery animation
setTimeout(() => {
    element.style.left = `${pos}px`;
}, 16);
```

</details>

**4) Hogyan okozhat Promise infinite loop UI freeze-t?**
<details>
<summary>Válasz</summary>

Infinite Promise chain → infinite microtasks → rendering NEVER happens (microtasks have priority).

```javascript
// ❌ FREEZE:
function loop() {
    Promise.resolve().then(loop); // Microtask
}
loop(); // Browser frozen!

// ✅ FIX:
function loop() {
    setTimeout(loop, 0); // Macro task (allows render)
}
loop(); // UI responsive
```

</details>

**5) Mi a requestIdleCallback és mikor használd?**
<details>
<summary>Válasz</summary>

**rIC**: Runs when browser is idle (after rendering, no pending work). Perfect for non-critical background tasks.

```javascript
requestIdleCallback((deadline) => {
    while (deadline.timeRemaining() > 0 && tasks.length > 0) {
        tasks.shift()(); // Process task
    }
}, { timeout: 2000 }); // Max 2s wait
```

Use cases: Analytics, prefetching, logging, caching.

</details>

**6) Hogyan mérheted a main thread blocking time-ot?**
<details>
<summary>Válasz</summary>

**Long Task API**:
```javascript
const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        if (entry.duration > 50) {
            console.warn(`Long task: ${entry.duration}ms`);
        }
    });
});
observer.observe({ entryTypes: ['longtask'] });
```

**Lighthouse TBT** (Total Blocking Time): Sum of blocking time >50ms.

</details>

**7) Mi történik amikor a call stack overflow-t dob?**
<details>
<summary>Válasz</summary>

**Stack overflow**: Recursive function túl sok frame-et tesz a stack-re (limit: ~10k-50k browser-dependent).

```javascript
function recurse() {
    recurse(); // No base case
}
recurse(); // RangeError: Maximum call stack size exceeded
```

**Fix**: Iterative algorithm, vagy setTimeout (clear stack between calls).

</details>

**8) Hogyan működik a Web Worker event loop-ja?**
<details>
<summary>Válasz</summary>

Worker separate thread-en fut (nem main thread). OWN event loop, no DOM access.

```javascript
// Main thread:
const worker = new Worker('worker.js');
worker.postMessage('data'); // Non-blocking

// worker.js:
self.onmessage = (e) => {
    // Heavy computation here (doesn't block main thread)
    self.postMessage(result);
};
```

Use case: CPU-intensive tasks (image processing, parsing, crypto).

</details>

</div>

</details>

</div>

---

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

### Critical Rendering Path {#critical-rendering-path}

<div class="concept-section mental-model" data-filter="performance medior">

📋 **Fogalom meghatározása**  
*Critical Rendering Path (CRP) a böngésző lépései HTML/CSS → pixels megjelenítéséig: 1) **DOM Construction** (HTML parsing → DOM tree), 2) **CSSOM Construction** (CSS parsing → CSSOM tree), 3) **Render Tree** (DOM + CSSOM combine, csak visible nodes), 4) **Layout/Reflow** (geometria számítás: size, position), 5) **Paint** (pixel fill: color, text, shadow), 6) **Composite** (layers merge GPU-n). **Reflow** = layout újraszámítás (geometry change), **Repaint** = pixel újrafestés (visual change). Web Vitals: LCP (Largest Contentful Paint <2.5s), FID (First Input Delay <100ms), CLS (Cumulative Layout Shift <0.1).*

</div>

<div class="concept-section why-important" data-filter="performance medior">

💡 **Miért számít?**
- **User Experience**: CRP optimalizálása gyorsabb page load (~2-3x)
- **SEO**: Google ranking faktor (Core Web Vitals since 2021)
- **Mobile Performance**: Slow 3G esetén kritikus (DOM/CSSOM parsing lassú)
- **Conversion Rate**: 100ms delay = 1% conversion drop (Amazon)

</div>

<div class="runnable-model" data-filter="performance">

**Runnable mental model**

**CRP lépések visualizálása:**
```javascript
// DOM Construction Timeline
// HTML → Token → Node → DOM Tree
// Incrementális parsing: chunk-by-chunk processing

// 1. DOM Construction Performance Measurement
const measureDOMConstruction = () => {
    const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
            if (entry.entryType === 'measure') {
                console.log(`${entry.name}: ${entry.duration.toFixed(2)}ms`);
            }
        });
    });
    observer.observe({ entryTypes: ['measure'] });

    performance.mark('dom-start');
    // Simulate DOM construction
    const container = document.createElement('div');
    for (let i = 0; i < 1000; i++) {
        const element = document.createElement('p');
        element.textContent = `Paragraph ${i}`;
        container.appendChild(element);
    }
    performance.mark('dom-end');
    performance.measure('DOM Construction', 'dom-start', 'dom-end');
};

// 2. CSSOM Construction
// CSS blocking: <link> blocks rendering until loaded
// Render tree needs both DOM + CSSOM ready

// 3. Render Tree Construction
// Combines DOM + CSSOM, filters out invisible nodes
const isVisible = (element) => {
    // Not in Render Tree if:
    // - display: none
    // - visibility: hidden (but takes space, in Layout)
    // - <head>, <script>, <meta>
    const style = getComputedStyle(element);
    return style.display !== 'none';
};

// 4. Layout/Reflow Measurement
const measureReflow = () => {
    const start = performance.now();
    
    // REFLOW TRIGGERS (expensive operations)
    const element = document.getElementById('test');
    
    // Reading layout properties forces synchronous reflow
    const height = element.offsetHeight;
    const width = element.offsetWidth;
    const rect = element.getBoundingClientRect();
    const scroll = element.scrollTop;
    
    const duration = performance.now() - start;
    console.log(`Reflow: ${duration.toFixed(2)}ms`);
};

// 5. Paint Measurement
const measurePaint = () => {
    const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
            if (entry.entryType === 'paint') {
                console.log(`${entry.name}: ${entry.startTime.toFixed(2)}ms`);
            }
        });
    });
    observer.observe({ entryTypes: ['paint'] });
    
    // first-paint: First pixel rendered
    // first-contentful-paint: First text/image rendered
};

measurePaint(); // Logs: first-paint: 123ms, first-contentful-paint: 234ms
```

**Reflow vs Repaint Examples:**
```javascript
const element = document.getElementById('box');

// ❌ REFLOW (geometry change - expensive)
element.style.width = '200px';         // Width change → reflow
element.style.height = '100px';        // Height change → reflow
element.style.margin = '20px';         // Margin change → reflow
element.style.padding = '10px';        // Padding change → reflow
element.style.position = 'absolute';   // Positioning → reflow
element.style.display = 'block';       // Display change → reflow
element.style.fontSize = '16px';       // Font size → reflow

// ⚠️ REPAINT (visual change - cheaper than reflow)
element.style.color = 'red';           // Color change → repaint
element.style.backgroundColor = 'blue'; // Background → repaint
element.style.visibility = 'hidden';   // Visibility → repaint
element.style.border = '1px solid';    // Border → repaint

// ✅ COMPOSITE ONLY (cheapest - GPU accelerated)
element.style.transform = 'translateX(10px)'; // Transform → composite
element.style.opacity = '0.5';         // Opacity → composite

// Performance comparison:
// Composite: ~0.5ms (GPU layer manipulation)
// Repaint: ~5-10ms (pixel redraw)
// Reflow: ~50-100ms (layout recalc + repaint)
```

**Reflow optimization - Batch DOM changes:**
```javascript
const container = document.getElementById('container');

// ❌ ROSSZ: Multiple reflows (100 reflows!)
for (let i = 0; i < 100; i++) {
    const element = document.createElement('div');
    element.textContent = `Item ${i}`;
    container.appendChild(element); // Reflow on each append!
}

// ✅ JÓ: Single reflow (DocumentFragment batching)
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
    const element = document.createElement('div');
    element.textContent = `Item ${i}`;
    fragment.appendChild(element); // No reflow (fragment not in DOM)
}
container.appendChild(fragment); // 1 reflow only!

// Performance: 100 reflows (~5000ms) vs 1 reflow (~50ms) = 100x faster!
```

**CSS Selector Performance:**
```css
/* ❌ SLOW: Descendant selector (right-to-left evaluation) */
div div div p { color: red; }
/* Browser checks EVERY <p>, then checks parent chain */

/* ❌ SLOW: Universal selector */
* { margin: 0; }
/* Applies to ALL elements (thousands of nodes) */

/* ✅ FAST: Class selector */
.text-red { color: red; }
/* Direct hash table lookup */

/* ✅ FAST: ID selector */
#header { background: blue; }
/* Single element lookup */

/* Selector performance ranking (fastest to slowest):
   1. ID (#header)          ~0.1ms
   2. Class (.header)       ~0.2ms
   3. Tag (div)             ~0.5ms
   4. Attribute ([type])    ~1ms
   5. Pseudo (:hover)       ~2ms
   6. Descendant (div p)    ~5ms
*/
```

**Web Vitals Measurement:**
```javascript
// Largest Contentful Paint (LCP) - Loading performance
const observeLCP = () => {
    const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log(`LCP: ${lastEntry.startTime.toFixed(2)}ms`);
        console.log('LCP element:', lastEntry.element);
        
        // Good: < 2.5s, Needs Improvement: 2.5-4s, Poor: > 4s
        if (lastEntry.startTime < 2500) {
            console.log('✅ LCP: Good');
        } else if (lastEntry.startTime < 4000) {
            console.log('⚠️ LCP: Needs Improvement');
        } else {
            console.log('❌ LCP: Poor');
        }
    });
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
};

// First Input Delay (FID) - Interactivity
const observeFID = () => {
    const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
            const fid = entry.processingStart - entry.startTime;
            console.log(`FID: ${fid.toFixed(2)}ms`);
            
            // Good: < 100ms, Needs Improvement: 100-300ms, Poor: > 300ms
            if (fid < 100) {
                console.log('✅ FID: Good');
            } else if (fid < 300) {
                console.log('⚠️ FID: Needs Improvement');
            } else {
                console.log('❌ FID: Poor');
            }
        });
    });
    observer.observe({ entryTypes: ['first-input'] });
};

// Cumulative Layout Shift (CLS) - Visual stability
const observeCLS = () => {
    let clsScore = 0;
    const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
            if (!entry.hadRecentInput) {
                clsScore += entry.value;
                console.log(`CLS: ${clsScore.toFixed(4)}`);
                
                // Good: < 0.1, Needs Improvement: 0.1-0.25, Poor: > 0.25
                if (clsScore < 0.1) {
                    console.log('✅ CLS: Good');
                } else if (clsScore < 0.25) {
                    console.log('⚠️ CLS: Needs Improvement');
                } else {
                    console.log('❌ CLS: Poor');
                }
            }
        });
    });
    observer.observe({ entryTypes: ['layout-shift'] });
};

// Initialize all Core Web Vitals observers
observeLCP();
observeFID();
observeCLS();
```

**CLS Prevention:**
```html
<!-- ❌ ROSSZ: No image dimensions → layout shift when loaded -->
<img src="hero.jpg" alt="Hero">

<!-- ✅ JÓ: Explicit dimensions → space reserved -->
<img src="hero.jpg" alt="Hero" width="800" height="600">

<!-- ✅ JÓ: aspect-ratio CSS (modern approach) -->
<style>
.hero-image {
    width: 100%;
    aspect-ratio: 16 / 9; /* Reserve space before load */
}
</style>
<img src="hero.jpg" alt="Hero" class="hero-image">

<!-- ❌ ROSSZ: Font swap causes layout shift -->
<style>
@font-face {
    font-family: 'CustomFont';
    src: url('font.woff2');
    /* Default: font-display: auto (invisible text until loaded) */
}
</style>

<!-- ✅ JÓ: font-display: swap → fallback font shown immediately -->
<style>
@font-face {
    font-family: 'CustomFont';
    src: url('font.woff2');
    font-display: swap; /* Show fallback, then swap to custom */
}
</style>
```
*Figyeld meg: DOM/CSSOM parallel parsing, de Render Tree needs both. Reflow costlier than Repaint.*

</div>

<div class="concept-section myths" data-filter="performance">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- **"Repaint mindig reflow-t is jelent"** → **Valójában**: Reflow mindig repaint-et okoz, de repaint nem okoz reflow-t (color change → repaint only)
- **"CSS selectors performance nem számít"** → **Valójában**: Complex selectors (descendant, universal) 10-100x lassabbak class selector-nál
- **"display: none és visibility: hidden ugyanaz"** → **Valójában**: display: none removes from Render Tree (no layout), visibility: hidden marad layout-ban (space reserved)
- **"Transform és top/left pozicionálás performance-e ugyanaz"** → **Valójában**: transform GPU-accelerated (composite), top/left causes reflow (~100x lassabb)
- **"Web Vitals csak desktop-on számít"** → **Valójában**: Mobile-on kritikusabb (slower CPU, network)

</div>

</details>

</div>

<div class="concept-section performance" data-filter="performance">

<details>
<summary>🚀 <strong>Performance corner</strong></summary>

<div>

**CRP Optimization Strategies:**
```html
<!-- 1. Critical CSS Inlining -->
<style>
/* Inline above-the-fold CSS (first viewport content) */
.header { background: #000; color: #fff; }
.hero { font-size: 2rem; }
</style>

<!-- 2. Defer Non-Critical CSS -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>

<!-- 3. Async JavaScript (non-blocking) -->
<script async src="analytics.js"></script>

<!-- 4. Defer JavaScript (execute after DOM ready) -->
<script defer src="app.js"></script>

<!-- 5. Preconnect to critical origins -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://api.example.com">
```

**Reflow Batching with requestAnimationFrame:**
```javascript
// ❌ ROSSZ: Forced synchronous layout (Layout Thrashing)
for (let i = 0; i < 100; i++) {
    const element = document.querySelectorAll('.box')[i];
    element.style.top = `${element.offsetTop + 10}px`; // Read → Write → Reflow!
}
// 100 forced reflows! (~5000ms)

// ✅ JÓ: Separate Read and Write phases
const elements = document.querySelectorAll('.box');
const positions = [];

// Read phase (batch all reads)
for (let i = 0; i < elements.length; i++) {
    positions[i] = elements[i].offsetTop; // No reflow yet
}

// Write phase (batch all writes)
requestAnimationFrame(() => {
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.top = `${positions[i] + 10}px`; // 1 reflow only!
    }
});
// Performance: 5000ms → 50ms (100x gyorsabb!)
```

**CSS Containment API:**
```css
/* Limit reflow scope to container only */
.article {
    contain: layout; /* Layout changes don't affect siblings */
}

.sidebar {
    contain: size layout; /* Fixed size + isolated layout */
}

.widget {
    contain: layout style paint; /* Full containment */
}

/* Performance: Without containment: entire page reflow (~100ms)
               With containment: container only (~10ms) */
```

**Content-Visibility (CSS Containment v2):**
```css
/* Lazy render off-screen content */
.article {
    content-visibility: auto; /* Browser skips rendering if off-screen */
    contain-intrinsic-size: 0 500px; /* Estimated height (prevent CLS) */
}

/* Performance benefit:
   - Initial page load: 3000 articles × 50ms render = 150s
   - With content-visibility: 10 visible × 50ms = 500ms (300x gyorsabb!) */
```

**will-change optimization:**
```css
/* Tell browser to optimize for upcoming change */
.animated-element {
    will-change: transform, opacity; /* Pre-create GPU layer */
}

/* ⚠️ VIGYÁZZ: Don't overuse (memory overhead) */
/* ❌ ROSSZ */
* { will-change: transform; } /* Every element on GPU layer! */

/* ✅ JÓ: Add dynamically before animation */
```

```javascript
const element = document.querySelector('.box');

// Before animation
element.style.willChange = 'transform';

// Animate
element.style.transform = 'translateX(100px)';

// After animation (remove to free memory)
setTimeout(() => {
    element.style.willChange = 'auto';
}, 1000);
```

**Web Vitals Optimization Benchmarks:**
```
LCP Optimization:
- Before: 4.5s (Poor) - Large unoptimized image
- After: 1.8s (Good) - WebP format, lazy load, CDN
- Improvement: 2.5x faster

FID Optimization:
- Before: 350ms (Poor) - Heavy JavaScript blocking main thread
- After: 45ms (Good) - Code splitting, Web Workers
- Improvement: 7.8x faster

CLS Optimization:
- Before: 0.35 (Poor) - No image dimensions, late-loading ads
- After: 0.05 (Good) - aspect-ratio, placeholder skeletons
- Improvement: 7x better
```

</div>

</details>

</div>

<div class="concept-section tools" data-filter="performance">

<details>
<summary>🧰 <strong>Kapcsolódó API-k / eszközök</strong></summary>

<div>

**Chrome DevTools Performance Tab:**
```javascript
// 1. Open DevTools (F12) → Performance tab
// 2. Click Record (Ctrl+E)
// 3. Interact with page
// 4. Stop recording
// 5. Analyze:
//    - Main thread activity (yellow = scripting, purple = rendering)
//    - Layout (reflow) events (purple bars)
//    - Paint events (green bars)
//    - Long tasks (red corner flag)
```

**Chrome Lighthouse:**
```bash
# Command-line Lighthouse
npm install -g lighthouse
lighthouse https://example.com --view

# Metrics reported:
# - Performance score (0-100)
# - First Contentful Paint (FCP)
# - Largest Contentful Paint (LCP)
# - Total Blocking Time (TBT)
# - Cumulative Layout Shift (CLS)
# - Speed Index
```

**Web Vitals library:**
```javascript
// Install: npm install web-vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// Log all Core Web Vitals
getCLS(console.log); // Cumulative Layout Shift
getFID(console.log); // First Input Delay
getLCP(console.log); // Largest Contentful Paint
getFCP(console.log); // First Contentful Paint
getTTFB(console.log); // Time to First Byte

// Send to analytics
function sendToAnalytics(metric) {
    fetch('/analytics', {
        method: 'POST',
        body: JSON.stringify(metric)
    });
}

getLCP(sendToAnalytics);
getFID(sendToAnalytics);
getCLS(sendToAnalytics);
```

**Layout Instability API:**
```javascript
// Detect layout shifts in real-time
const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach(entry => {
        console.log('Layout Shift:', {
            value: entry.value,
            hadRecentInput: entry.hadRecentInput,
            sources: entry.sources.map(s => s.node)
        });
    });
});
observer.observe({ entryTypes: ['layout-shift'] });
```

**React DevTools Profiler:**
```javascript
// Measure component render performance
import { Profiler } from 'react';

function onRenderCallback(
    id, phase, actualDuration, baseDuration, startTime, commitTime
) {
    console.log(`${id} (${phase}) rendered in ${actualDuration}ms`);
}

<Profiler id="App" onRender={onRenderCallback}>
    <App />
</Profiler>
```

**Performance Budget CLI Tools:**
```bash
# Bundlesize - Enforce bundle size limits
npm install --save-dev bundlesize
# package.json:
{
    "bundlesize": [
        { "path": "./dist/app.js", "maxSize": "200 kB" }
    ]
}

# Webpack Bundle Analyzer
npm install --save-dev webpack-bundle-analyzer
# Visualize bundle content and identify large modules
```

**Critical CSS extraction:**
```bash
# Critical (npm package) - Extract above-the-fold CSS
npm install -g critical

critical https://example.com --base dist --inline --minify
# Generates inlined critical CSS for faster first paint
```

**CSS Stats:**
```
https://cssstats.com/
# Analyze CSS file:
# - Total rules
# - Specificity graph
# - Color palette
# - Font sizes
# - Selector complexity
```

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="performance">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

**1) Mi a különbség Reflow és Repaint között?**
<details>
<summary>Válasz</summary>

Reflow = layout/geometry újraszámítás (width, height, position change), Repaint = pixel újrafestés (color, background change). Reflow mindig repaint-et is okoz, de repaint nem okoz reflow-t. Reflow ~10-100x drágább.

</details>

**2) Miért gyorsabb a transform mint a top/left pozicionálás?**
<details>
<summary>Válasz</summary>

`transform` GPU-accelerated composite operation (nem okoz reflow/repaint), `top/left` main thread layout reflow. Transform ~0.5ms, top/left ~50-100ms.

</details>

**3) Hogyan működik a CSS selector right-to-left evaluation?**
<details>
<summary>Válasz</summary>

Browser rightmost selector-től balra halad: `div p span` → Megkeresi AZ ÖSSZES `<span>`-t, majd szűri parent `<p>`, majd grandparent `<div>`. Class selector gyorsabb (direct hash lookup).

</details>

**4) Mit jelent az LCP (Largest Contentful Paint)?**
<details>
<summary>Válasz</summary>

Largest visible element render time (image, video, block-level text). Core Web Vital: Good <2.5s, Poor >4s. Optimalizálás: image compression, lazy load, CDN.

</details>

**5) Hogyan előzöd meg a CLS (Cumulative Layout Shift)-et?**
<details>
<summary>Válasz</summary>

Explicit image dimensions (width/height attributes vagy aspect-ratio CSS), placeholder skeletons, font-display: swap, reserve space for ads. CLS = layout stability metric, Good <0.1.

</details>

</div>

</details>

</div>

---

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

## Következő lépések

1. Gyakorold a DOM manipulációt
2. Tanulj meg egy frontend framework-öt (React, Vue, Angular)
3. Ismerkedj meg a TypeScript-tel
4. Próbáld ki a modern build tool-okat
5. Tanulj Progressive Web App (PWA) fejlesztést
