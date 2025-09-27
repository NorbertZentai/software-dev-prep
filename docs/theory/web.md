# Web Development

## Rövid összefoglaló

A web development magában foglalja az HTML, CSS és JavaScript technológiák használatát interaktív weboldalak és alkalmazások készítéséhez. A modern web fejlesztés középpontjában a böngésző-szerver kommunikáció, a reszponzív design és a felhasználói élmény áll. Fő technológiák: HTML5 szemantikus elemek, CSS3 haladó funkciók (Grid, Flexbox), ES6+ JavaScript, HTTP protokoll és REST API-k. Buktatók közé tartozik a cross-browser kompatibilitás, performance optimalizáció és a biztonsági kérdések kezelése.

## Fogalmak

### HTML {#html}
HyperText Markup Language - weboldalak struktúráját meghatározó markup nyelv.

**Példa:**
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

Magyarázat: Az HTML szemantikus elemei strukturálják a tartalmat és javítják az accessibility-t és SEO-t.

### CSS (Flex, Grid) {#css-flex-grid}
Cascading Style Sheets - weboldalak megjelenésének és elrendezésének vezérlése modern layout technikákkal.

**Példa:**
```css
/* CSS Grid Layout */
.grid-container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas: 
        "header header header"
        "sidebar main aside"
        "footer footer footer";
    gap: 20px;
    min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

/* Flexbox Layout */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #333;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
    margin: 0;
    padding: 0;
}

.nav-links a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.nav-links a:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
    .grid-container {
        grid-template-columns: 1fr;
        grid-template-areas: 
            "header"
            "main"
            "sidebar"
            "aside"
            "footer";
    }
    
    .navbar {
        flex-direction: column;
        gap: 1rem;
    }
}

/* CSS Variables */
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --font-family: 'Segoe UI', system-ui, sans-serif;
    --border-radius: 8px;
}

.button {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: var(--border-radius);
    font-family: var(--font-family);
    cursor: pointer;
    transition: all 0.3s ease;
}

.button:hover {
    background-color: color-mix(in srgb, var(--primary-color) 80%, black);
    transform: translateY(-2px);
}
```

Magyarázat: CSS Grid 2D layoutokhoz, Flexbox 1D elrendezésekhez ideális, mindkettő támogatja a reszponzív designt.

### JavaScript (ES6+) {#javascript-es6}
Modern JavaScript funkciók: arrow functions, destructuring, template literals, async/await.

**Példa:**
```javascript
// ES6+ Features
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Arrow functions és destructuring
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

// Template literals és spread operator
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

// Classes és modules
class UserManager {
    constructor(containerElement) {
        this.container = containerElement;
        this.users = new Map();
        this.init();
    }
    
    async init() {
        this.container.addEventListener('click', this.handleClick.bind(this));
        await this.loadUsers();
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
    
    handleClick(event) {
        const userCard = event.target.closest('.user-card');
        if (userCard) {
            const userId = parseInt(userCard.dataset.userId);
            this.toggleUserDetails(userId);
        }
    }
    
    toggleUserDetails(userId) {
        const user = this.users.get(userId);
        if (user) {
            // Toggle logic here
            console.log('Toggle details for user:', user.name);
        }
    }
    
    render() {
        const userCardsHTML = Array.from(this.users.values())
            .map(user => createUserCard(user))
            .join('');
            
        this.container.innerHTML = `
            <h2>Felhasználók (${this.users.size})</h2>
            <div class="users-grid">
                ${userCardsHTML}
            </div>
        `;
    }
    
    showError(message) {
        this.container.innerHTML = `
            <div class="error-message">
                <p>❌ ${message}</p>
            </div>
        `;
    }
}

// Modern async patterns
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};

// Event delegation és modern DOM manipulation
document.addEventListener('DOMContentLoaded', () => {
    const userContainer = document.getElementById('user-container');
    if (userContainer) {
        new UserManager(userContainer);
    }
    
    // Search functionality with debouncing
    const searchInput = document.getElementById('search');
    if (searchInput) {
        const debouncedSearch = debounce((query) => {
            // Implement search logic
            console.log('Searching for:', query);
        }, 300);
        
        searchInput.addEventListener('input', (e) => {
            debouncedSearch(e.target.value);
        });
    }
});
```

Magyarázat: Modern JavaScript funkciók javítják a kód olvashatóságát, karbantarthatóságát és teljesítményét.

### HTTP metódusok {#http-modusok}
RESTful API-k alapja: GET, POST, PUT, DELETE és társaik a különböző műveletek reprezentálására.

**Példa:**
```javascript
// HTTP Methods with Fetch API
const API_BASE = '/api';

// GET - Adatok lekérése
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

// POST - Új adat létrehozása
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

// PUT - Teljes frissítés
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

// PATCH - Részleges frissítés
const patchUser = async (userId, updates) => {
    const response = await fetch(`${API_BASE}/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates)
    });
    
    return await response.json();
};

// DELETE - Törlés
const deleteUser = async (userId) => {
    const response = await fetch(`${API_BASE}/users/${userId}`, {
        method: 'DELETE'
    });
    
    if (!response.ok) {
        throw new Error(`DELETE failed: ${response.status}`);
    }
    
    return response.status === 204; // No content
};

// OPTIONS - Preflight request
const checkApiOptions = async () => {
    const response = await fetch(`${API_BASE}/users`, {
        method: 'OPTIONS'
    });
    
    console.log('Allowed methods:', response.headers.get('Allow'));
    console.log('CORS headers:', response.headers.get('Access-Control-Allow-Methods'));
};

// Usage example
const userApiService = {
    async getAllUsers() {
        try {
            return await getUsers();
        } catch (error) {
            console.error('Failed to fetch users:', error);
            throw error;
        }
    },
    
    async addUser(user) {
        const userData = {
            name: user.name,
            email: user.email,
            createdAt: new Date().toISOString()
        };
        
        return await createUser(userData);
    },
    
    async editUser(id, changes) {
        return await patchUser(id, changes);
    },
    
    async removeUser(id) {
        return await deleteUser(id);
    }
};
```

Magyarázat: HTTP metódusok szemantikai jelentéssel bírnak: GET idempotent és safe, POST nem idempotent, PUT idempotent.

### HTTP státuszkódok {#http-statuszkodok}
HTTP válaszok kategorizálása: 2xx success, 3xx redirect, 4xx client error, 5xx server error.

**Példa:**
```javascript
// HTTP Status Code Handling
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
    
    // 3xx Redirection
    if (statusCode >= 300 && statusCode < 400) {
        switch (statusCode) {
            case 301: // Moved Permanently
            case 302: // Found (Temporary Redirect)
                const newUrl = response.headers.get('Location');
                console.log(`Redirecting to: ${newUrl}`);
                return fetch(newUrl);
            case 304: // Not Modified
                return null; // Use cached version
            default:
                throw new Error(`Redirection status: ${statusCode}`);
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
            case 409: // Conflict
                throw new Error(`Conflict: ${errorData.message || 'Resource conflict'}`);
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
            case 504: // Gateway Timeout
                throw new Error('Gateway timeout');
            default:
                throw new Error(`Server error: ${statusCode}`);
        }
    }
};

// Usage in API service
class ApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };
        
        try {
            const response = await fetch(url, config);
            return await handleHttpResponse(response);
        } catch (error) {
            console.error(`API request failed: ${endpoint}`, error);
            throw error;
        }
    }
    
    // Convenience methods
    get(endpoint, headers = {}) {
        return this.request(endpoint, { method: 'GET', headers });
    }
    
    post(endpoint, data, headers = {}) {
        return this.request(endpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });
    }
}

// Error boundary for UI
const displayError = (error, containerId) => {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <div class="error-alert">
                <strong>Hiba:</strong> ${error.message}
            </div>
        `;
    }
};
```

Magyarázat: HTTP státuszkódok segítik a kliens és szerver közötti kommunikáció állapotának megértését és a megfelelő hibakezelést.

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

## Gyakori hibák

- **Inline CSS és JavaScript használata** — Külső fájlokba szervezés javítja a karbantarthatóságot és teljesítményt
- **Blokkóló JavaScript** — Async/defer attribútumok használata vagy script-ek a </body> elé helyezése
- **CORS félreértés** — Preflight request-ek és allowed headers helyes konfigurálása szerver oldalon
- **DOM manipuláció készen állás előtt** — DOMContentLoaded event várakozás vagy script-ek megfelelő elhelyezése
- **Memory leak-ek** — Event listener-ek eltávolítása és closure-ök helyes kezelése
- **Responsive design hiánya** — Mobile-first megközelítés és proper viewport meta tag használata
- **Accessibility figyelmen kívül hagyása** — ARIA attribútumok és szemantikus HTML használata
- **SEO problémák** — Proper meta tag-ek, structured data és semantic markup használata

## Interjúkérdések

- **Mi a különbség a GET és POST között?** — *GET idempotent, URL-ben küldi a paramétereket, cache-elhető; POST nem idempotent, body-ban küldi az adatokat.*

- **Mit jelent a 404 és 500 státuszkód?** — *404 Not Found - kért erőforrás nem található; 500 Internal Server Error - szerver belső hibája.*

- **Hogyan működik a CSS Box Model?** — *Content + padding + border + margin - a width/height csak a content-re vonatkozik (standard box model).*

- **Mi a különbség a let, const és var között?** — *var function-scoped, hoisted; let/const block-scoped, temporal dead zone; const értéke nem módosítható.*

- **Hogyan működik az event bubbling?** — *Esemény a target elemről felfelé propagálódik a DOM fán keresztül a document-ig.*

- **Mi a CORS és miért fontos?** — *Cross-Origin Resource Sharing - biztonsági mechanizmus a különböző domain-ek közötti kérések szabályozására.*

- **Mik a Promise-ok és hogyan használod őket?** — *Aszinkron műveletek kezelésére, három állapot: pending, fulfilled, rejected; then/catch/finally methods.*

- **Mi a különbség a == és === között?** — *== type coercion-nel összehasonlít, === strict equality ohne type conversion.*

- **Hogyan optimalizálnád egy weboldal betöltési idejét?** — *Image optimization, CSS/JS minification, CDN, caching, lazy loading, code splitting.*

- **Mi a Flexbox és mikor használnád?** — *1D layout model, ideális navbar-okhoz, center alignment-hez, space distribution-hez.*

- **Hogyan implementálnál responsive design-t?** — *Mobile-first approach, CSS media queries, flexible grid systems, scalable images.*

- **Mi a local storage és session storage különbsége?** — *localStorage persistent, sessionStorage tab-specific; mindkettő 5-10MB limit, csak string tárolás.*

## Gyakorlati feladat

Készíts egy reszponzív weboldalt Modern Web Stack-kel:

1. **HTML5 struktúra**: Szemantikus elemek, proper meta tag-ek, accessibility
2. **CSS3 styling**: Grid/Flexbox layout, CSS Variables, animations
3. **JavaScript functionality**: Fetch API, DOM manipulation, event handling
4. **Responsive design**: Mobile-first approach, breakpoint-ok
5. **Performance**: Image optimization, lazy loading, minification
6. **Cross-browser**: Modern browser support, fallback-ek

Követelmények:
- Valid HTML5 és CSS3
- ES6+ JavaScript funkciók
- WCAG 2.1 AA accessibility compliance
- 90+ Lighthouse score
- Cross-browser testing (Chrome, Firefox, Safari)

*Kapcsolódó gyakorlati feladat: [Web Development Alapok](/exercises/web/01-es6-basics)*

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
