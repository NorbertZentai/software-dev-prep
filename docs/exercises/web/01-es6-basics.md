---
title: "ES6+ Modern JavaScript alapok"
difficulty: beginner
goals: ["Arrow functions", "Destructuring", "Promises", "Async/await", "Modules"]
estimatedMinutes: 35
starter: {
  "stackblitz": "https://stackblitz.com/edit/js-es6-fundamentals?file=index.js",
  "codesandbox": "https://codesandbox.io/s/es6-basics-template",
  "dbfiddle": ""
}
---

# ES6+ Modern JavaScript Alapok

## Feladat leírása

Implementálj egy modern JavaScript alkalmazást, amely bemutatja az ES6+ főbb funkcióit. Készíts egy egyszerű Todo alkalmazást, amely használja a legújabb JavaScript nyelvi elemeket és best practices-t.

## Projekt struktúra

```
es6-todo-app/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   ├── modules/
│   │   ├── todoManager.js
│   │   ├── storage.js
│   │   └── utils.js
│   └── components/
│       ├── TodoItem.js
│       └── TodoList.js
```

## Feladat 1: ES6+ Alapok Implementálása

### Arrow Functions és Template Literals

```javascript
// js/utils.js
export const formatDate = (date) => {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Intl.DateTimeFormat('hu-HU', options).format(date);
};

export const createId = () => `todo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const validateTodo = (todo) => {
    if (!todo || typeof todo !== 'object') {
        throw new Error('Invalid todo object');
    }

    const { title, description = '' } = todo;

    if (!title || title.trim().length === 0) {
        throw new Error('Todo title is required');
    }

    return {
        ...todo,
        title: title.trim(),
        description: description.trim(),
        id: todo.id || createId(),
        createdAt: todo.createdAt || new Date(),
        completed: Boolean(todo.completed)
    };
};

// Higher-order functions
export const createDebounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
};
```

### Destructuring és Spread Operator

```javascript
// js/modules/todoManager.js
export class TodoManager {
    constructor(storage) {
        this.storage = storage;
        this.todos = [];
        this.filters = {
            status: 'all', // all, active, completed
            search: ''
        };
        this.observers = [];
    }

    async loadTodos() {
        try {
            const savedTodos = await this.storage.load();
            this.todos = [...savedTodos];
            this.notifyObservers();
        } catch (error) {
            console.error('Failed to load todos:', error);
            this.todos = [];
        }
    }

    addTodo(todoData) {
        const { title, description, priority = 'medium', tags = [] } = todoData;

        const newTodo = {
            id: createId(),
            title,
            description,
            priority,
            tags: [...tags],
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        this.todos = [...this.todos, newTodo];
        this.saveTodos();
        this.notifyObservers();
        return newTodo;
    }

    updateTodo(id, updates) {
        const todoIndex = this.todos.findIndex(todo => todo.id === id);
        if (todoIndex === -1) {
            throw new Error(`Todo with id ${id} not found`);
        }

        const existingTodo = this.todos[todoIndex];
        const updatedTodo = {
            ...existingTodo,
            ...updates,
            id, // Ensure ID cannot be changed
            updatedAt: new Date()
        };

        this.todos = [
            ...this.todos.slice(0, todoIndex),
            updatedTodo,
            ...this.todos.slice(todoIndex + 1)
        ];

        this.saveTodos();
        this.notifyObservers();
        return updatedTodo;
    }

    // Destructuring parameters
    setFilters({ status, search, ...otherFilters } = {}) {
        this.filters = {
            ...this.filters,
            ...(status && { status }),
            ...(search !== undefined && { search }),
            ...otherFilters
        };
        this.notifyObservers();
    }

    getFilteredTodos() {
        const { status, search } = this.filters;

        return this.todos
            .filter(todo => {
                const matchesStatus = status === 'all' ||
                    (status === 'active' && !todo.completed) ||
                    (status === 'completed' && todo.completed);

                const matchesSearch = !search ||
                    todo.title.toLowerCase().includes(search.toLowerCase()) ||
                    todo.description.toLowerCase().includes(search.toLowerCase());

                return matchesStatus && matchesSearch;
            })
            .sort((a, b) => b.createdAt - a.createdAt);
    }
}
```

## Feladat 2: Promises és Async/Await

### Storage Module

```javascript
// js/modules/storage.js
export class LocalStorage {
    constructor(key = 'todos') {
        this.key = key;
    }

    async save(data) {
        return new Promise((resolve, reject) => {
            try {
                const serialized = JSON.stringify(data, null, 2);
                localStorage.setItem(this.key, serialized);
                resolve(true);
            } catch (error) {
                reject(new Error(`Failed to save data: ${error.message}`));
            }
        });
    }

    async load() {
        return new Promise((resolve, reject) => {
            try {
                const data = localStorage.getItem(this.key);
                if (!data) {
                    resolve([]);
                    return;
                }

                const parsed = JSON.parse(data);
                // Convert date strings back to Date objects
                const todos = parsed.map(todo => ({
                    ...todo,
                    createdAt: new Date(todo.createdAt),
                    updatedAt: new Date(todo.updatedAt)
                }));

                resolve(todos);
            } catch (error) {
                reject(new Error(`Failed to load data: ${error.message}`));
            }
        });
    }

    async clear() {
        return new Promise((resolve) => {
            localStorage.removeItem(this.key);
            resolve(true);
        });
    }
}

// API Storage (with fetch)
export class ApiStorage {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async save(todos) {
        try {
            const response = await fetch(`${this.baseUrl}/todos`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todos)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            throw new Error(`API save failed: ${error.message}`);
        }
    }

    async load() {
        try {
            const response = await fetch(`${this.baseUrl}/todos`);

            if (!response.ok) {
                if (response.status === 404) {
                    return []; // No todos found
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const todos = await response.json();
            return todos.map(todo => ({
                ...todo,
                createdAt: new Date(todo.createdAt),
                updatedAt: new Date(todo.updatedAt)
            }));
        } catch (error) {
            throw new Error(`API load failed: ${error.message}`);
        }
    }
}
```

## Feladat 3: Classes és Modules

### Todo Component

```javascript
// js/components/TodoItem.js
export class TodoItem {
    constructor(todo, { onToggle, onDelete, onEdit }) {
        this.todo = todo;
        this.onToggle = onToggle;
        this.onDelete = onDelete;
        this.onEdit = onEdit;
        this.element = null;
    }

    render() {
        const { id, title, description, completed, priority, tags, createdAt } = this.todo;

        this.element = document.createElement('article');
        this.element.className = `todo-item ${completed ? 'completed' : ''} priority-${priority}`;
        this.element.dataset.todoId = id;

        this.element.innerHTML = `
            <div class="todo-content">
                <input type="checkbox" class="todo-toggle" ${completed ? 'checked' : ''}>
                <div class="todo-info">
                    <h3 class="todo-title">${this.escapeHtml(title)}</h3>
                    ${description ? `<p class="todo-description">${this.escapeHtml(description)}</p>` : ''}
                    <div class="todo-meta">
                        <span class="todo-date">${formatDate(createdAt)}</span>
                        <div class="todo-tags">
                            ${tags.map(tag => `<span class="tag">${this.escapeHtml(tag)}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
            <div class="todo-actions">
                <button class="btn-edit" aria-label="Edit todo">✏️</button>
                <button class="btn-delete" aria-label="Delete todo">🗑️</button>
            </div>
        `;

        this.attachEventListeners();
        return this.element;
    }

    attachEventListeners() {
        const toggleBtn = this.element.querySelector('.todo-toggle');
        const editBtn = this.element.querySelector('.btn-edit');
        const deleteBtn = this.element.querySelector('.btn-delete');

        toggleBtn?.addEventListener('change', () => {
            this.onToggle(this.todo.id, toggleBtn.checked);
        });

        editBtn?.addEventListener('click', () => {
            this.onEdit(this.todo);
        });

        deleteBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm(`Delete "${this.todo.title}"?`)) {
                this.onDelete(this.todo.id);
            }
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    updateTodo(newTodo) {
        this.todo = newTodo;
        const newElement = this.render();
        this.element?.replaceWith(newElement);
        return this.element;
    }

    destroy() {
        this.element?.remove();
        this.element = null;
    }
}
```

### Main Application

```javascript
// js/main.js
import { TodoManager } from './modules/todoManager.js';
import { LocalStorage } from './modules/storage.js';
import { TodoItem } from './components/TodoItem.js';
import { createDebounce } from './utils.js';

class TodoApp {
    constructor() {
        this.storage = new LocalStorage();
        this.todoManager = new TodoManager(this.storage);
        this.todoComponents = new Map();

        this.init();
    }

    async init() {
        try {
            await this.todoManager.loadTodos();
            this.setupEventListeners();
            this.setupObservers();
            this.render();
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showError('Failed to load todos');
        }
    }

    setupEventListeners() {
        const todoForm = document.querySelector('#todoForm');
        const searchInput = document.querySelector('#searchInput');
        const filterButtons = document.querySelectorAll('.filter-btn');

        // Form submission with validation
        todoForm?.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleAddTodo(new FormData(todoForm));
            todoForm.reset();
        });

        // Debounced search
        const debouncedSearch = createDebounce((searchTerm) => {
            this.todoManager.setFilters({ search: searchTerm });
        }, 300);

        searchInput?.addEventListener('input', (e) => {
            debouncedSearch(e.target.value);
        });

        // Filter buttons
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('.filter-btn.active')?.classList.remove('active');
                btn.classList.add('active');
                this.todoManager.setFilters({ status: btn.dataset.filter });
            });
        });
    }

    async handleAddTodo(formData) {
        try {
            const todoData = {
                title: formData.get('title'),
                description: formData.get('description'),
                priority: formData.get('priority') || 'medium',
                tags: formData.get('tags')?.split(',').map(tag => tag.trim()).filter(Boolean) || []
            };

            this.todoManager.addTodo(todoData);
            this.showSuccess('Todo added successfully!');
        } catch (error) {
            console.error('Failed to add todo:', error);
            this.showError(error.message);
        }
    }

    setupObservers() {
        this.todoManager.subscribe(() => {
            this.render();
            this.updateStats();
        });
    }

    render() {
        const container = document.querySelector('#todoList');
        if (!container) return;

        // Clear existing components
        this.todoComponents.clear();
        container.innerHTML = '';

        const todos = this.todoManager.getFilteredTodos();

        if (todos.length === 0) {
            container.innerHTML = '<p class="empty-state">No todos found</p>';
            return;
        }

        // Create todo components
        todos.forEach(todo => {
            const todoComponent = new TodoItem(todo, {
                onToggle: (id, completed) => this.handleToggleTodo(id, completed),
                onDelete: (id) => this.handleDeleteTodo(id),
                onEdit: (todo) => this.handleEditTodo(todo)
            });

            this.todoComponents.set(todo.id, todoComponent);
            container.appendChild(todoComponent.render());
        });
    }

    async handleToggleTodo(id, completed) {
        try {
            this.todoManager.updateTodo(id, { completed });
        } catch (error) {
            console.error('Failed to toggle todo:', error);
            this.showError('Failed to update todo');
        }
    }

    // Additional methods...
    showSuccess(message) {
        // Toast implementation
    }

    showError(message) {
        // Error display implementation
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
```

## Feladat 4: Advanced Features

### Web API Integration

```javascript
// Service Worker for offline support
// js/sw.js
const CACHE_NAME = 'todo-app-v1';
const urlsToCache = [
    '/',
    '/css/styles.css',
    '/js/main.js',
    '/js/modules/todoManager.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
```

### LocalStorage vs IndexedDB

```javascript
// js/modules/indexedDBStorage.js
export class IndexedDBStorage {
    constructor(dbName = 'TodoApp', version = 1) {
        this.dbName = dbName;
        this.version = version;
        this.db = null;
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                const objectStore = db.createObjectStore('todos', { keyPath: 'id' });
                objectStore.createIndex('completed', 'completed', { unique: false });
                objectStore.createIndex('createdAt', 'createdAt', { unique: false });
            };
        });
    }

    async save(todos) {
        const transaction = this.db.transaction(['todos'], 'readwrite');
        const objectStore = transaction.objectStore('todos');

        // Clear existing and add new
        await objectStore.clear();
        for (const todo of todos) {
            await objectStore.add(todo);
        }

        return new Promise((resolve, reject) => {
            transaction.oncomplete = () => resolve(true);
            transaction.onerror = () => reject(transaction.error);
        });
    }

    async load() {
        const transaction = this.db.transaction(['todos'], 'readonly');
        const objectStore = transaction.objectStore('todos');
        const request = objectStore.getAll();

        return new Promise((resolve, reject) => {
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
}
```

## Ellenőrző lista

- [ ] Arrow functions használata minden helyen ahol értelmes
- [ ] Template literals string interpolációhoz
- [ ] Destructuring objektumok és tömbök esetén
- [ ] Spread operator arrays és objektumok kezelésére
- [ ] ES6 modules (import/export) használata
- [ ] Classes modern syntax-szal
- [ ] Promises és async/await error handling-gel
- [ ] Higher-order functions (map, filter, reduce)
- [ ] Default parameters és rest parameters
- [ ] const/let használata var helyett
- [ ] Modern event handling (removeEventListener)
- [ ] Web APIs használata (localStorage, fetch, stb.)

## Tesztelés

```javascript
// tests/todoManager.test.js (ES modules syntax)
import { TodoManager } from '../js/modules/todoManager.js';
import { LocalStorage } from '../js/modules/storage.js';

describe('TodoManager', () => {
    let todoManager;
    let mockStorage;

    beforeEach(() => {
        mockStorage = {
            save: jest.fn().mockResolvedValue(true),
            load: jest.fn().mockResolvedValue([])
        };
        todoManager = new TodoManager(mockStorage);
    });

    test('should add todo with correct properties', () => {
        const todoData = {
            title: 'Test Todo',
            description: 'Test Description'
        };

        const result = todoManager.addTodo(todoData);

        expect(result).toMatchObject({
            title: 'Test Todo',
            description: 'Test Description',
            completed: false
        });
        expect(result.id).toBeDefined();
        expect(result.createdAt).toBeInstanceOf(Date);
    });
});
```

## Következő lépések

- TypeScript migráció
- Frontend framework (React/Vue) használata
- Build tools (Webpack, Vite) bevezetése
- Progressive Web App (PWA) funkciók
- Testing framework (Jest, Cypress) integrálása
