# Frontend Development (React, TypeScript, Node.js)

## Brief Summary

Modern frontend development is built on the React, TypeScript, and Node.js ecosystem. React is a component-based UI library, TypeScript provides type safety for JavaScript, and Node.js is a server-side JavaScript runtime environment. Modern tooling includes npm/yarn, Webpack/Vite, ESLint, and Prettier. UI libraries: Tailwind CSS, shadcn/ui, Material-UI. State management: React hooks, Redux, Zustand. Testing: Jest, React Testing Library, Cypress. Main challenges include state management, performance optimization, and bundle size management.

<!-- Reading Progress Bar -->
<div id="read-progress"></div>

<!-- Tag Filter -->
<div class="tag-filter-container">
  <div class="tag-filter-header">
    <span class="filter-icon">🔍</span>
    <span>Filter by topic</span>
  </div>
  <div class="tag-filter-chips">
    <button class="filter-chip" data-filter="all">All</button>
    <button class="filter-chip" data-filter="junior">Junior</button>
    <button class="filter-chip" data-filter="medior">Medior</button>
    <button class="filter-chip" data-filter="react">React</button>
    <button class="filter-chip" data-filter="typescript">TypeScript</button>
    <button class="filter-chip" data-filter="nodejs">Node.js</button>
    <button class="filter-chip" data-filter="state">State</button>
    <button class="filter-chip" data-filter="hooks">Hooks</button>
  </div>
</div>

## Concepts

### Node.js {#node-js}

<div class="concept-section definition" data-filter="nodejs junior">

� **Concept Definition**  
**JavaScript runtime** built on Chrome's V8 engine for server-side execution. **Event-driven**: non-blocking I/O via event loop (single-threaded, handles concurrency through callbacks/promises). **Modules**: CommonJS (require/module.exports) or ES modules (import/export). **npm**: Node Package Manager with 2M+ packages. **Core modules**: fs (file system), http/https (servers), path, os, crypto. **Frameworks**: Express.js (minimalist web), NestJS (enterprise), Fastify (performance). **Use cases**: REST APIs, microservices, real-time apps (WebSockets), CLI tools, build tools (Webpack, Vite). **Performance**: fast I/O-bound operations, not ideal for CPU-bound tasks. **Best practices**: async/await over callbacks, error handling, clustering for multi-core.

</div>

<div class="concept-section why-important" data-filter="nodejs junior">

💡 **Why it matters?**
- **Full-stack JavaScript**: use one language for frontend and backend
- **High performance**: event-driven, non-blocking I/O model
- **Rich ecosystem**: npm package manager with millions of packages
- **Scalability**: handles concurrent connections efficiently

</div>

<div class="runnable-model" data-filter="nodejs">

**Runnable mental model**
```javascript
// SERVER.JS - EXPRESS SERVER SETUP
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware configuration
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? 'https://yourdomain.com' 
        : 'http://localhost:3000',
    credentials: true
}));
app.use(express.static('public'));

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// In-memory data store (use database in production)
let users = [];
let posts = [];

// USER ROUTES
app.get('/api/users', async (req, res) => {
    try {
        // Simulate async database operation
        const userList = await new Promise(resolve => {
            setTimeout(() => resolve(users), 100);
        });
        
        res.json({
            success: true,
            data: userList,
            count: userList.length
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch users' 
        });
    }
});

app.get('/api/users/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const user = users.find(u => u.id === userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        
        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch user'
        });
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const { name, email, role = 'user' } = req.body;
        
        // Validation
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                error: 'Name and email are required'
            });
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email format'
            });
        }
        
        // Check if email already exists
        if (users.find(u => u.email === email)) {
            return res.status(409).json({
                success: false,
                error: 'Email already exists'
            });
        }
        
        const newUser = {
            id: Date.now(),
            name: name.trim(),
            email: email.toLowerCase().trim(),
            role,
            createdAt: new Date().toISOString(),
            active: true
        };
        
        users.push(newUser);
        
        res.status(201).json({
            success: true,
            data: newUser,
            message: 'User created successfully'
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create user'
        });
    }
});

app.put('/api/users/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        
        const { name, email, role, active } = req.body;
        const existingUser = users[userIndex];
        
        // Update only provided fields
        const updatedUser = {
            ...existingUser,
            ...(name && { name: name.trim() }),
            ...(email && { email: email.toLowerCase().trim() }),
            ...(role && { role }),
            ...(typeof active === 'boolean' && { active }),
            updatedAt: new Date().toISOString()
        };
        
        users[userIndex] = updatedUser;
        
        res.json({
            success: true,
            data: updatedUser,
            message: 'User updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to update user'
        });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        
        const deletedUser = users.splice(userIndex, 1)[0];
        
        res.json({
            success: true,
            data: deletedUser,
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to delete user'
        });
    }
});

// BLOG POSTS ROUTES
app.get('/api/posts', async (req, res) => {
    try {
        const { limit = 10, offset = 0, author } = req.query;
        
        let filteredPosts = posts;
        
        if (author) {
            filteredPosts = posts.filter(p => 
                p.author.toLowerCase().includes(author.toLowerCase())
            );
        }
        
        const paginatedPosts = filteredPosts
            .slice(parseInt(offset), parseInt(offset) + parseInt(limit));
        
        res.json({
            success: true,
            data: paginatedPosts,
            total: filteredPosts.length,
            limit: parseInt(limit),
            offset: parseInt(offset)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch posts'
        });
    }
});

app.post('/api/posts', async (req, res) => {
    try {
        const { title, content, author, tags = [] } = req.body;
        
        if (!title || !content || !author) {
            return res.status(400).json({
                success: false,
                error: 'Title, content, and author are required'
            });
        }
        
        const newPost = {
            id: Date.now(),
            title: title.trim(),
            content: content.trim(),
            author: author.trim(),
            tags: Array.isArray(tags) ? tags : [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            published: false,
            views: 0
        };
        
        posts.push(newPost);
        
        res.status(201).json({
            success: true,
            data: newPost,
            message: 'Post created successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to create post'
        });
    }
});

// FILE UPLOAD HANDLING
const multer = require('multer');
const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG, and GIF allowed.'));
        }
    }
});

app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'No file uploaded'
            });
        }
        
        res.json({
            success: true,
            data: {
                filename: req.file.filename,
                originalName: req.file.originalname,
                size: req.file.size,
                mimetype: req.file.mimetype,
                path: `/uploads/${req.file.filename}`
            },
            message: 'File uploaded successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'File upload failed'
        });
    }
});

// WEBSOCKET INTEGRATION
const { createServer } = require('http');
const { Server } = require('socket.io');

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.NODE_ENV === 'production' 
            ? 'https://yourdomain.com' 
            : 'http://localhost:3000'
    }
});

// WebSocket connection handling
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    // Join user to a room
    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        socket.to(roomId).emit('user-joined', {
            userId: socket.id,
            timestamp: new Date().toISOString()
        });
    });
    
    // Handle chat messages
    socket.on('chat-message', (data) => {
        const { roomId, message, author } = data;
        
        const chatMessage = {
            id: Date.now(),
            message,
            author,
            timestamp: new Date().toISOString()
        };
        
        // Send to all users in the room
        io.to(roomId).emit('new-message', chatMessage);
    });
    
    // Handle typing indicators
    socket.on('typing-start', (data) => {
        socket.to(data.roomId).emit('user-typing', {
            userId: socket.id,
            author: data.author
        });
    });
    
    socket.on('typing-stop', (data) => {
        socket.to(data.roomId).emit('user-stopped-typing', {
            userId: socket.id
        });
    });
    
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// ERROR HANDLING MIDDLEWARE
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                error: 'File too large. Maximum size is 5MB.'
            });
        }
    }
    
    res.status(500).json({
        success: false,
        error: process.env.NODE_ENV === 'production' 
            ? 'Internal server error' 
            : error.message
    });
});

// 404 HANDLER
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

// GRACEFUL SHUTDOWN
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});

// START SERVER
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 Local: http://localhost:${PORT}`);
});

// PACKAGE.JSON CONFIGURATION
{
  "name": "modern-node-server",
  "version": "1.0.0",
  "description": "Modern Node.js server with Express, Socket.IO, and file upload",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint .",
    "format": "prettier --write ."
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "socket.io": "^4.7.2",
    "multer": "^1.4.5-lts.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.6.2",
    "eslint": "^8.45.0",
    "prettier": "^3.0.0"
  },
  "engines": {
    "node": ">=16.0.0"
  },
  "keywords": ["node.js", "express", "api", "websocket", "backend"]
}

// ENVIRONMENT CONFIGURATION (.env)
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb://localhost:27017/myapp
JWT_SECRET=your-super-secret-jwt-key-here
CORS_ORIGIN=http://localhost:3000
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880
```
*Notice: Node.js enables full-stack JavaScript development with powerful features like real-time communication, file handling, and RESTful APIs.*

</div>

<div class="concept-section best-practices" data-filter="nodejs">

<details>
<summary>✅ <strong>Node.js best practices</strong></summary>

<div>

- **Environment variables**: Use `.env` files for configuration
- **Error handling**: Implement proper error handling and logging
- **Security**: Validate inputs, use HTTPS, implement rate limiting
- **Performance**: Use clustering, implement caching, optimize database queries
- **Testing**: Write unit and integration tests
- **Documentation**: Document your APIs with tools like Swagger

</div>
</details>

</div>

<div class="concept-section connection-map" data-filter="nodejs">

🗺️ **Connection map**  
`Express.js` · `REST APIs` · `WebSockets` · `File Upload` · `Middleware` · `Error Handling`

</div>

🗺️ **Connection map**  
`Express.js` · `REST APIs` · `WebSockets` · `File Upload` · `Middleware` · `Error Handling`

</div>

### React {#react}

<div class="concept-section definition" data-filter="react junior">

📋 **Concept Definition**  
**JavaScript library** for building component-based user interfaces. **Components**: functional (preferred, use Hooks) or class-based. **JSX**: JavaScript XML syntax for describing UI (transpiled by Babel). **Virtual DOM**: in-memory representation, reconciliation algorithm diffs changes for efficient updates. **Hooks**: useState (state), useEffect (side effects), useContext (context), useReducer (complex state), custom hooks. **Props**: immutable data passed from parent to child. **State**: mutable component-local data. **Lifecycle**: mounting, updating, unmounting (useEffect handles all). **State management**: Context API (built-in), Redux, Zustand, Recoil. **Rendering**: declarative (describe what, not how), unidirectional data flow. **Best practices**: component composition, lift state up, memoization (React.memo, useMemo).

</div>

<div class="concept-section why-important" data-filter="react junior">

💡 **Why it matters?**
- **Component reusability**: build once, use everywhere
- **Virtual DOM**: efficient updates and rendering
- **Declarative**: describe what UI should look like, not how to achieve it
- **Rich ecosystem**: vast library of components and tools

</div>

<div class="runnable-model" data-filter="react">

**Runnable mental model**
```jsx
// MODERN REACT WITH HOOKS
import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react';

// CONTEXT FOR GLOBAL STATE
const ThemeContext = React.createContext();
const UserContext = React.createContext();

// THEME PROVIDER
function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });
    
    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);
    
    const toggleTheme = useCallback(() => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    }, []);
    
    const value = useMemo(() => ({
        theme,
        toggleTheme
    }), [theme, toggleTheme]);
    
    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

// CUSTOM HOOKS
function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });
    
    const setValue = useCallback((value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, storedValue]);
    
    return [storedValue, setValue];
}

function useAPI(url, options = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err.message);
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [url, options]);
    
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    
    const refetch = useCallback(() => {
        fetchData();
    }, [fetchData]);
    
    return { data, loading, error, refetch };
}

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    
    return debouncedValue;
}

// REUSABLE COMPONENTS
function Button({ 
    children, 
    variant = 'primary', 
    size = 'medium', 
    disabled = false,
    loading = false,
    onClick,
    type = 'button',
    className = '',
    ...props 
}) {
    const baseClasses = 'btn';
    const variantClasses = {
        primary: 'btn--primary',
        secondary: 'btn--secondary',
        danger: 'btn--danger',
        ghost: 'btn--ghost'
    };
    const sizeClasses = {
        small: 'btn--small',
        medium: 'btn--medium',
        large: 'btn--large'
    };
    
    const classes = [
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'btn--disabled',
        loading && 'btn--loading',
        className
    ].filter(Boolean).join(' ');
    
    return (
        <button
            type={type}
            className={classes}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {loading ? (
                <>
                    <span className="btn__spinner" />
                    Loading...
                </>
            ) : (
                children
            )}
        </button>
    );
}

function Input({ 
    label,
    error,
    required = false,
    className = '',
    ...props 
}) {
    const [focused, setFocused] = useState(false);
    const hasValue = props.value || props.defaultValue;
    
    return (
        <div className={`input-group ${className}`}>
            {label && (
                <label className={`input-label ${focused || hasValue ? 'input-label--floating' : ''}`}>
                    {label}
                    {required && <span className="required">*</span>}
                </label>
            )}
            <input
                className={`input ${error ? 'input--error' : ''} ${focused ? 'input--focused' : ''}`}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                {...props}
            />
            {error && <span className="input-error">{error}</span>}
        </div>
    );
}

function Modal({ isOpen, onClose, title, children, size = 'medium' }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);
    
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }
        
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);
    
    if (!isOpen) return null;
    
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div 
                className={`modal modal--${size}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal__header">
                    <h2 className="modal__title">{title}</h2>
                    <button 
                        className="modal__close"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        ×
                    </button>
                </div>
                <div className="modal__body">
                    {children}
                </div>
            </div>
        </div>
    );
}

// FORM HANDLING WITH VALIDATION
function useForm(initialValues, validationRules = {}) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    
    const setValue = useCallback((name, value) => {
        setValues(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    }, [errors]);
    
    const setFieldTouched = useCallback((name, isTouched = true) => {
        setTouched(prev => ({
            ...prev,
            [name]: isTouched
        }));
    }, []);
    
    const validateField = useCallback((name, value) => {
        const rules = validationRules[name];
        if (!rules) return null;
        
        for (const rule of rules) {
            const error = rule(value, values);
            if (error) return error;
        }
        
        return null;
    }, [validationRules, values]);
    
    const validateForm = useCallback(() => {
        const newErrors = {};
        
        Object.keys(validationRules).forEach(name => {
            const error = validateField(name, values[name]);
            if (error) {
                newErrors[name] = error;
            }
        });
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [validationRules, validateField, values]);
    
    const handleChange = useCallback((event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        setValue(name, newValue);
    }, [setValue]);
    
    const handleBlur = useCallback((event) => {
        const { name, value } = event.target;
        setFieldTouched(name, true);
        
        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    }, [setFieldTouched, validateField]);
    
    return {
        values,
        errors,
        touched,
        setValue,
        setFieldTouched,
        validateForm,
        handleChange,
        handleBlur
    };
}

// VALIDATION RULES
const validationRules = {
    email: [
        (value) => !value ? 'Email is required' : null,
        (value) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email format' : null
    ],
    password: [
        (value) => !value ? 'Password is required' : null,
        (value) => value.length < 8 ? 'Password must be at least 8 characters' : null,
        (value) => !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value) ? 'Password must contain uppercase, lowercase, and number' : null
    ],
    confirmPassword: [
        (value, allValues) => value !== allValues.password ? 'Passwords do not match' : null
    ],
    name: [
        (value) => !value?.trim() ? 'Name is required' : null,
        (value) => value?.trim().length < 2 ? 'Name must be at least 2 characters' : null
    ]
};

// USER REGISTRATION FORM
function UserRegistrationForm({ onSubmit }) {
    const form = useForm({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    }, validationRules);
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!form.validateForm()) {
            return;
        }
        
        if (!form.values.acceptTerms) {
            alert('You must accept the terms and conditions');
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            await onSubmit({
                name: form.values.name,
                email: form.values.email,
                password: form.values.password
            });
        } catch (error) {
            console.error('Registration failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="registration-form">
            <Input
                name="name"
                label="Full Name"
                value={form.values.name}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.touched.name && form.errors.name}
                required
            />
            
            <Input
                name="email"
                type="email"
                label="Email Address"
                value={form.values.email}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.touched.email && form.errors.email}
                required
            />
            
            <Input
                name="password"
                type="password"
                label="Password"
                value={form.values.password}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.touched.password && form.errors.password}
                required
            />
            
            <Input
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                value={form.values.confirmPassword}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.touched.confirmPassword && form.errors.confirmPassword}
                required
            />
            
            <label className="checkbox-label">
                <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={form.values.acceptTerms}
                    onChange={form.handleChange}
                />
                I accept the <a href="/terms" target="_blank">Terms and Conditions</a>
            </label>
            
            <Button
                type="submit"
                variant="primary"
                size="large"
                loading={isSubmitting}
                disabled={isSubmitting}
            >
                Create Account
            </Button>
        </form>
    );
}

// USER LIST WITH SEARCH AND FILTERING
function UserList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUsers, setSelectedUsers] = useState([]);
    
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    
    const { data: usersData, loading, error, refetch } = useAPI(
        `/api/users?search=${debouncedSearchTerm}&role=${roleFilter}&page=${currentPage}`
    );
    
    const filteredUsers = useMemo(() => {
        if (!usersData?.users) return [];
        
        return usersData.users.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                                 user.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
            
            const matchesRole = roleFilter === 'all' || user.role === roleFilter;
            
            return matchesSearch && matchesRole;
        });
    }, [usersData?.users, debouncedSearchTerm, roleFilter]);
    
    const handleSelectUser = useCallback((userId, isSelected) => {
        setSelectedUsers(prev => 
            isSelected 
                ? [...prev, userId]
                : prev.filter(id => id !== userId)
        );
    }, []);
    
    const handleSelectAll = useCallback((isSelected) => {
        setSelectedUsers(isSelected ? filteredUsers.map(user => user.id) : []);
    }, [filteredUsers]);
    
    const handleBulkDelete = useCallback(async () => {
        if (selectedUsers.length === 0) return;
        
        if (window.confirm(`Delete ${selectedUsers.length} users?`)) {
            try {
                await Promise.all(
                    selectedUsers.map(id => 
                        fetch(`/api/users/${id}`, { method: 'DELETE' })
                    )
                );
                refetch();
                setSelectedUsers([]);
            } catch (error) {
                alert('Failed to delete users');
            }
        }
    }, [selectedUsers, refetch]);
    
    if (loading) return <div className="loading">Loading users...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    
    return (
        <div className="user-list">
            <div className="user-list__header">
                <h1>User Management</h1>
                
                <div className="user-list__controls">
                    <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="role-filter"
                    >
                        <option value="all">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        <option value="moderator">Moderator</option>
                    </select>
                    
                    {selectedUsers.length > 0 && (
                        <Button
                            variant="danger"
                            onClick={handleBulkDelete}
                        >
                            Delete Selected ({selectedUsers.length})
                        </Button>
                    )}
                </div>
            </div>
            
            <div className="user-list__table">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.length === filteredUsers.length}
                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                />
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <UserRow
                                key={user.id}
                                user={user}
                                isSelected={selectedUsers.includes(user.id)}
                                onSelect={handleSelectUser}
                                onRefresh={refetch}
                            />
                        ))}
                    </tbody>
                </table>
                
                {filteredUsers.length === 0 && (
                    <div className="empty-state">
                        No users found matching your criteria
                    </div>
                )}
            </div>
        </div>
    );
}

// INDIVIDUAL USER ROW COMPONENT
function UserRow({ user, isSelected, onSelect, onRefresh }) {
    const [isEditing, setIsEditing] = useState(false);
    const { theme } = useContext(ThemeContext);
    
    const handleDelete = useCallback(async () => {
        if (window.confirm(`Delete user ${user.name}?`)) {
            try {
                await fetch(`/api/users/${user.id}`, { method: 'DELETE' });
                onRefresh();
            } catch (error) {
                alert('Failed to delete user');
            }
        }
    }, [user.id, user.name, onRefresh]);
    
    return (
        <tr className={`user-row ${theme === 'dark' ? 'user-row--dark' : ''}`}>
            <td>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => onSelect(user.id, e.target.checked)}
                />
            </td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
                <span className={`role-badge role-badge--${user.role}`}>
                    {user.role}
                </span>
            </td>
            <td>
                <span className={`status-indicator ${user.active ? 'status--active' : 'status--inactive'}`}>
                    {user.active ? 'Active' : 'Inactive'}
                </span>
            </td>
            <td>
                <div className="user-actions">
                    <Button
                        variant="ghost"
                        size="small"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="danger"
                        size="small"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </div>
                
                {isEditing && (
                    <Modal
                        isOpen={isEditing}
                        onClose={() => setIsEditing(false)}
                        title={`Edit ${user.name}`}
                    >
                        <UserEditForm
                            user={user}
                            onSave={() => {
                                setIsEditing(false);
                                onRefresh();
                            }}
                            onCancel={() => setIsEditing(false)}
                        />
                    </Modal>
                )}
            </td>
        </tr>
    );
}

// MAIN APPLICATION COMPONENT
function App() {
    const [user, setUser] = useLocalStorage('user', null);
    
    const handleLogin = useCallback(async (credentials) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });
            
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    }, [setUser]);
    
    const handleLogout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('authToken');
    }, [setUser]);
    
    return (
        <ThemeProvider>
            <UserContext.Provider value={{ user, setUser }}>
                <div className="app">
                    <Header user={user} onLogout={handleLogout} />
                    <main className="main-content">
                        {user ? (
                            <UserList />
                        ) : (
                            <UserRegistrationForm onSubmit={handleLogin} />
                        )}
                    </main>
                </div>
            </UserContext.Provider>
        </ThemeProvider>
    );
}

// HEADER COMPONENT
function Header({ user, onLogout }) {
    const { theme, toggleTheme } = useContext(ThemeContext);
    
    return (
        <header className="header">
            <div className="header__brand">
                <h1>My App</h1>
            </div>
            
            <nav className="header__nav">
                {user && (
                    <>
                        <span>Welcome, {user.name}</span>
                        <Button variant="ghost" onClick={toggleTheme}>
                            {theme === 'light' ? '🌙' : '☀️'}
                        </Button>
                        <Button variant="secondary" onClick={onLogout}>
                            Logout
                        </Button>
                    </>
                )}
            </nav>
        </header>
    );
}

export default App;
```
*Notice: Modern React development emphasizes hooks, context for state management, custom hooks for reusable logic, and component composition for building scalable applications.*

</div>

<div class="concept-section best-practices" data-filter="react">

<details>
<summary>✅ <strong>React best practices</strong></summary>

<div>

- **Component composition**: Build complex UIs from simple, reusable components
- **Custom hooks**: Extract reusable stateful logic into custom hooks
- **Context sparingly**: Use for truly global state, prefer local state when possible
- **Performance optimization**: Use React.memo, useMemo, and useCallback judiciously
- **Error boundaries**: Implement error boundaries for graceful error handling
- **Accessibility**: Use semantic HTML and ARIA attributes

</div>
</details>

</div>

<div class="concept-section connection-map" data-filter="react">

🗺️ **Connection map**  
`Components` · `Hooks` · `State Management` · `Context API` · `Performance` · `Forms`

</div>

### TypeScript {#typescript}

<div class="concept-section definition" data-filter="typescript junior">

� **Concept Definition**  
**Statically-typed superset of JavaScript** compiling to plain JavaScript. **Type system**: primitives (string, number, boolean), arrays, tuples, enums, any, unknown, never, union/intersection types. **Type inference**: compiler infers types when not explicitly declared. **Interfaces**: define object shapes, contracts for classes. **Generics**: type-safe reusable components (<T>). **Type guards**: typeof, instanceof, custom predicates. **Compile-time checking**: catches type errors before runtime. **Configuration**: tsconfig.json (strict mode, target ES version, module system). **Advanced types**: mapped types, conditional types, utility types (Partial<T>, Pick<T, K>, Omit<T, K>). **Best practices**: strict mode, avoid any, use unknown for unknowns, leverage type inference.

</div>

<div class="concept-section why-important" data-filter="typescript junior">

💡 **Why it matters?**
- **Type safety**: catch errors at compile time, not runtime
- **Better IDE support**: autocomplete, refactoring, navigation
- **Self-documenting code**: types serve as inline documentation
- **Scalability**: easier to maintain large codebases

</div>

<div class="runnable-model" data-filter="typescript">

**Runnable mental model**
```typescript
// BASIC TYPES AND INTERFACES
// Primitive types
let userName: string = "John Doe";
let userAge: number = 30;
let isActive: boolean = true;
let hobbies: string[] = ["reading", "coding", "gaming"];
let scores: number[] = [95, 87, 92];

// Object types
interface User {
    readonly id: number;           // Read-only property
    name: string;
    email: string;
    age?: number;                  // Optional property
    role: 'admin' | 'user' | 'moderator'; // Union type
    preferences: {
        theme: 'light' | 'dark';
        notifications: boolean;
    };
    createdAt: Date;
}

// Extending interfaces
interface AdminUser extends User {
    permissions: string[];
    lastLogin?: Date;
}

// Type aliases
type UserId = number;
type UserRole = 'admin' | 'user' | 'moderator';
type ApiResponse<T> = {
    success: boolean;
    data: T;
    message?: string;
    errors?: string[];
};

// Function types
type EventHandler<T> = (event: T) => void;
type AsyncOperation<T, R> = (input: T) => Promise<R>;

// ADVANCED TYPES
// Generic interfaces
interface Repository<T> {
    findById(id: number): Promise<T | null>;
    findAll(): Promise<T[]>;
    create(entity: Omit<T, 'id'>): Promise<T>;
    update(id: number, updates: Partial<T>): Promise<T>;
    delete(id: number): Promise<void>;
}

// Utility types
type CreateUserData = Omit<User, 'id' | 'createdAt'>;
type UpdateUserData = Partial<Pick<User, 'name' | 'email' | 'age'>>;
type UserPublicInfo = Pick<User, 'id' | 'name' | 'role'>;

// Conditional types
type ApiDataType<T> = T extends { data: infer U } ? U : never;
type NonNullable<T> = T extends null | undefined ? never : T;

// GENERIC FUNCTIONS
function createApiResponse<T>(
    data: T, 
    success: boolean = true, 
    message?: string
): ApiResponse<T> {
    return {
        success,
        data,
        ...(message && { message })
    };
}

// Generic constraint
interface Identifiable {
    id: number;
}

function updateEntity<T extends Identifiable>(
    entity: T, 
    updates: Partial<Omit<T, 'id'>>
): T {
    return { ...entity, ...updates };
}

// REACT WITH TYPESCRIPT
import React, { useState, useEffect, useCallback, ReactNode } from 'react';

// Props interfaces
interface ButtonProps {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}

// Generic component props
interface ListProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => ReactNode;
    emptyMessage?: string;
    className?: string;
}

// Component with generics
function List<T>({ items, renderItem, emptyMessage = "No items", className }: ListProps<T>) {
    if (items.length === 0) {
        return <div className={`empty-list ${className || ''}`}>{emptyMessage}</div>;
    }

    return (
        <div className={`list ${className || ''}`}>
            {items.map((item, index) => (
                <div key={index} className="list-item">
                    {renderItem(item, index)}
                </div>
            ))}
        </div>
    );
}

// Form handling with TypeScript
interface FormData {
    name: string;
    email: string;
    age: number;
    role: UserRole;
}

interface FormErrors {
    [K in keyof FormData]?: string;
}

interface UseFormReturn<T> {
    values: T;
    errors: Partial<Record<keyof T, string>>;
    touched: Partial<Record<keyof T, boolean>>;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleBlur: (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
    setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void;
    setFieldError: <K extends keyof T>(field: K, error: string | undefined) => void;
    resetForm: () => void;
    isValid: boolean;
}

function useForm<T extends Record<string, any>>(
    initialValues: T,
    validationSchema?: Partial<Record<keyof T, (value: any) => string | undefined>>
): UseFormReturn<T> {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
    const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

    const validate = useCallback((field: keyof T, value: any): string | undefined => {
        if (validationSchema?.[field]) {
            return validationSchema[field]!(value);
        }
        return undefined;
    }, [validationSchema]);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = event.target;
        const fieldName = name as keyof T;
        
        const newValue = type === 'number' ? Number(value) : value;
        
        setValues(prev => ({
            ...prev,
            [fieldName]: newValue
        }));

        // Clear error when user starts typing
        if (errors[fieldName]) {
            setErrors(prev => ({
                ...prev,
                [fieldName]: undefined
            }));
        }
    }, [errors]);

    const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        const fieldName = name as keyof T;
        
        setTouched(prev => ({
            ...prev,
            [fieldName]: true
        }));

        const error = validate(fieldName, value);
        setErrors(prev => ({
            ...prev,
            [fieldName]: error
        }));
    }, [validate]);

    const setFieldValue = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
        setValues(prev => ({
            ...prev,
            [field]: value
        }));
    }, []);

    const setFieldError = useCallback(<K extends keyof T>(field: K, error: string | undefined) => {
        setErrors(prev => ({
            ...prev,
            [field]: error
        }));
    }, []);

    const resetForm = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
    }, [initialValues]);

    const isValid = Object.keys(errors).length === 0;

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        setFieldError,
        resetForm,
        isValid
    };
}

// API CLIENT WITH TYPESCRIPT
class ApiClient {
    private baseURL: string;
    private defaultHeaders: Record<string, string>;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
        this.defaultHeaders = {
            'Content-Type': 'application/json'
        };
    }

    private async request<T>(
        endpoint: string, 
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const url = `${this.baseURL}${endpoint}`;
        
        const config: RequestInit = {
            ...options,
            headers: {
                ...this.defaultHeaders,
                ...options.headers
            }
        };

        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`API request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async get<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: 'GET' });
    }

    async post<T, U = any>(endpoint: string, data: U): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async put<T, U = any>(endpoint: string, data: U): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }

    setAuthToken(token: string): void {
        this.defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    removeAuthToken(): void {
        delete this.defaultHeaders['Authorization'];
    }
}

// USER SERVICE WITH REPOSITORY PATTERN
class UserService implements Repository<User> {
    constructor(private apiClient: ApiClient) {}

    async findById(id: number): Promise<User | null> {
        try {
            const response = await this.apiClient.get<User>(`/users/${id}`);
            return response.success ? response.data : null;
        } catch (error) {
            console.error('Failed to fetch user:', error);
            return null;
        }
    }

    async findAll(): Promise<User[]> {
        try {
            const response = await this.apiClient.get<User[]>('/users');
            return response.success ? response.data : [];
        } catch (error) {
            console.error('Failed to fetch users:', error);
            return [];
        }
    }

    async create(userData: CreateUserData): Promise<User> {
        const response = await this.apiClient.post<User, CreateUserData>('/users', userData);
        
        if (!response.success) {
            throw new Error(response.message || 'Failed to create user');
        }
        
        return response.data;
    }

    async update(id: number, updates: UpdateUserData): Promise<User> {
        const response = await this.apiClient.put<User, UpdateUserData>(`/users/${id}`, updates);
        
        if (!response.success) {
            throw new Error(response.message || 'Failed to update user');
        }
        
        return response.data;
    }

    async delete(id: number): Promise<void> {
        const response = await this.apiClient.delete(`/users/${id}`);
        
        if (!response.success) {
            throw new Error(response.message || 'Failed to delete user');
        }
    }

    async findByRole(role: UserRole): Promise<User[]> {
        try {
            const response = await this.apiClient.get<User[]>(`/users?role=${role}`);
            return response.success ? response.data : [];
        } catch (error) {
            console.error('Failed to fetch users by role:', error);
            return [];
        }
    }
}

// CUSTOM HOOKS WITH TYPESCRIPT
interface UseUserReturn {
    user: User | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
    updateUser: (updates: UpdateUserData) => Promise<void>;
}

function useUser(userId: number): UseUserReturn {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const userService = new UserService(new ApiClient('/api'));

    const fetchUser = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const userData = await userService.findById(userId);
            setUser(userData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch user');
        } finally {
            setLoading(false);
        }
    }, [userId]);

    const updateUser = useCallback(async (updates: UpdateUserData) => {
        if (!user) return;

        try {
            const updatedUser = await userService.update(user.id, updates);
            setUser(updatedUser);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update user');
            throw err;
        }
    }, [user, userService]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return {
        user,
        loading,
        error,
        refetch: fetchUser,
        updateUser
    };
}

// TYPE GUARDS
function isUser(obj: any): obj is User {
    return (
        obj &&
        typeof obj.id === 'number' &&
        typeof obj.name === 'string' &&
        typeof obj.email === 'string' &&
        ['admin', 'user', 'moderator'].includes(obj.role)
    );
}

function isApiResponse<T>(obj: any): obj is ApiResponse<T> {
    return (
        obj &&
        typeof obj.success === 'boolean' &&
        'data' in obj
    );
}

// DISCRIMINATED UNIONS
interface LoadingState {
    status: 'loading';
}

interface SuccessState<T> {
    status: 'success';
    data: T;
}

interface ErrorState {
    status: 'error';
    error: string;
}

type AsyncState<T> = LoadingState | SuccessState<T> | ErrorState;

function handleAsyncState<T>(state: AsyncState<T>) {
    switch (state.status) {
        case 'loading':
            return <div>Loading...</div>;
        case 'success':
            return <div>Data: {JSON.stringify(state.data)}</div>;
        case 'error':
            return <div>Error: {state.error}</div>;
        default:
            // TypeScript ensures this is never reached
            const _exhaustive: never = state;
            return _exhaustive;
    }
}

// CONFIGURATION OBJECT WITH TYPESCRIPT
interface AppConfig {
    apiUrl: string;
    enableLogging: boolean;
    features: {
        userManagement: boolean;
        notifications: boolean;
        darkMode: boolean;
    };
    limits: {
        maxFileSize: number;
        maxUsers: number;
    };
}

const config: AppConfig = {
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
    enableLogging: process.env.NODE_ENV === 'development',
    features: {
        userManagement: true,
        notifications: true,
        darkMode: true
    },
    limits: {
        maxFileSize: 5 * 1024 * 1024, // 5MB
        maxUsers: 1000
    }
};

export type { User, ApiResponse, FormData, AppConfig };
export { UserService, useUser, useForm, isUser, isApiResponse };
```
*Notice: TypeScript provides compile-time type safety, better IDE support, and self-documenting code that scales well in large applications.*

</div>

<div class="concept-section best-practices" data-filter="typescript">

<details>
<summary>✅ <strong>TypeScript best practices</strong></summary>

<div>

- **Strict mode**: Enable strict TypeScript compiler options
- **Interface over type**: Use interfaces for object shapes, types for unions/primitives
- **Generic constraints**: Use extends to constrain generic types appropriately
- **Utility types**: Leverage built-in utility types (Pick, Omit, Partial, etc.)
- **Type guards**: Implement type guards for runtime type checking
- **Avoid any**: Use unknown or specific types instead of any

</div>
</details>

</div>

<div class="concept-section connection-map" data-filter="typescript">

🗺️ **Connection map**  
`Type Safety` · `Interfaces` · `Generics` · `React Types` · `API Types` · `Utility Types`

</div>

- **Avoid any**: Use unknown or specific types instead of any

</div>
</details>

</div>

<div class="concept-section connection-map" data-filter="typescript">

🗺️ **Connection map**  
`Type Safety` · `Interfaces` · `Generics` · `React Types` · `API Types` · `Utility Types`

</div>

### State Management Patterns {#state-management}
<!-- tags: react, state, redux, context, zustand -->

<div class="concept-section definition">

📋 **Concept Definition**  
*State management patterns handle application data flow and synchronization. **Local state** (`useState`) for component-specific data, **Context API** for shared state trees, **Redux** for predictable state updates with actions/reducers, **Zustand** for lightweight state stores, **React Query** for server state caching. Each pattern solves different complexity levels and data sharing requirements.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Data consistency**: ensures all components show synchronized data
- **Predictable updates**: clear patterns for how state changes occur
- **Performance**: prevents unnecessary re-renders through optimized state structure
- **Developer experience**: easier debugging and testing with centralized state

</div>

<div class="runnable-model" data-filter="state management">

**Runnable mental model**
```tsx
import React, { createContext, useContext, useReducer, useState, useEffect } from 'react';
import { create } from 'zustand';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 1. LOCAL STATE - Component Level

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const increment = () => setCount(count + step);
  const decrement = () => setCount(count - step);
  const reset = () => setCount(0);

  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <div>
        <label>
          Step: 
          <input 
            type="number" 
            value={step} 
            onChange={(e) => setStep(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <button onClick={decrement}>-{step}</button>
        <button onClick={increment}>+{step}</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

// 2. CONTEXT API - Tree-level State

interface AppState {
  user: User | null;
  theme: 'light' | 'dark';
  notifications: Notification[];
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'TOGGLE_THEME' }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string };

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
      
    case 'TOGGLE_THEME':
      return { 
        ...state, 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      };
      
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
      
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
      
    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  actions: {
    setUser: (user: User | null) => void;
    toggleTheme: () => void;
    addNotification: (notification: Omit<Notification, 'id'>) => void;
    removeNotification: (id: string) => void;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, {
    user: null,
    theme: 'light',
    notifications: []
  });

  const actions = {
    setUser: (user: User | null) => 
      dispatch({ type: 'SET_USER', payload: user }),
      
    toggleTheme: () => 
      dispatch({ type: 'TOGGLE_THEME' }),
      
    addNotification: (notification: Omit<Notification, 'id'>) =>
      dispatch({ 
        type: 'ADD_NOTIFICATION', 
        payload: { ...notification, id: crypto.randomUUID() }
      }),
      
    removeNotification: (id: string) =>
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: id })
  };

  return (
    <AppContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

// 3. ZUSTAND - Lightweight Global State

interface TodoStore {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  
  // Actions
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, text: string) => void;
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  clearCompleted: () => void;
  
  // Computed
  filteredTodos: () => Todo[];
  completedCount: () => number;
  activeCount: () => number;
}

const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  filter: 'all',
  
  addTodo: (text: string) => set((state) => ({
    todos: [
      ...state.todos,
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: new Date()
      }
    ]
  })),
  
  toggleTodo: (id: string) => set((state) => ({
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  })),
  
  deleteTodo: (id: string) => set((state) => ({
    todos: state.todos.filter(todo => todo.id !== id)
  })),
  
  updateTodo: (id: string, text: string) => set((state) => ({
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, text } : todo
    )
  })),
  
  setFilter: (filter) => set({ filter }),
  
  clearCompleted: () => set((state) => ({
    todos: state.todos.filter(todo => !todo.completed)
  })),
  
  filteredTodos: () => {
    const { todos, filter } = get();
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  },
  
  completedCount: () => get().todos.filter(todo => todo.completed).length,
  activeCount: () => get().todos.filter(todo => !todo.completed).length
}));

// Component using Zustand
const TodoList: React.FC = () => {
  const {
    todos,
    filter,
    addTodo,
    toggleTodo,
    deleteTodo,
    setFilter,
    clearCompleted,
    filteredTodos,
    completedCount,
    activeCount
  } = useTodoStore();

  const [newTodoText, setNewTodoText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      addTodo(newTodoText.trim());
      setNewTodoText('');
    }
  };

  return (
    <div className="todo-app">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button type="submit">Add</button>
      </form>

      <div className="filters">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All ({todos.length})
        </button>
        <button 
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Active ({activeCount()})
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed ({completedCount()})
        </button>
      </div>

      <ul className="todo-list">
        {filteredTodos().map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {completedCount() > 0 && (
        <button onClick={clearCompleted}>
          Clear completed ({completedCount()})
        </button>
      )}
    </div>
  );
};

// 4. REACT QUERY - Server State Management

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

const userApi = {
  getUsers: async (): Promise<User[]> => {
    const response = await fetch('/api/users');
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },
  
  getUser: async (id: string): Promise<User> => {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  },
  
  createUser: async (user: Omit<User, 'id'>): Promise<User> => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
  },
  
  updateUser: async (id: string, updates: Partial<User>): Promise<User> => {
    const response = await fetch(`/api/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!response.ok) throw new Error('Failed to update user');
    return response.json();
  },
  
  deleteUser: async (id: string): Promise<void> => {
    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete user');
  }
};

const UserList: React.FC = () => {
  const queryClient = useQueryClient();
  
  const {
    data: users = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['users'],
    queryFn: userApi.getUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false
  });

  const createUserMutation = useMutation({
    mutationFn: userApi.createUser,
    onSuccess: (newUser) => {
      // Optimistic update
      queryClient.setQueryData(['users'], (old: User[] = []) => 
        [...old, newUser]
      );
      // Invalidate to refetch from server
      queryClient.invalidateQueries(['users']);
    },
    onError: (error) => {
      console.error('Failed to create user:', error);
    }
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<User> }) =>
      userApi.updateUser(id, updates),
    onMutate: async ({ id, updates }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries(['users']);
      
      // Snapshot previous value
      const previousUsers = queryClient.getQueryData<User[]>(['users']);
      
      // Optimistically update
      queryClient.setQueryData(['users'], (old: User[] = []) =>
        old.map(user => user.id === id ? { ...user, ...updates } : user)
      );
      
      return { previousUsers };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousUsers) {
        queryClient.setQueryData(['users'], context.previousUsers);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries(['users']);
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(['users'], (old: User[] = []) =>
        old.filter(user => user.id !== deletedId)
      );
    }
  });

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="user-list">
      <div className="user-actions">
        <button 
          onClick={() => createUserMutation.mutate({
            name: 'New User',
            email: 'newuser@example.com'
          })}
          disabled={createUserMutation.isLoading}
        >
          {createUserMutation.isLoading ? 'Creating...' : 'Add User'}
        </button>
        <button onClick={() => refetch()}>Refresh</button>
      </div>

      <div className="users">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <div className="user-actions">
              <button
                onClick={() => updateUserMutation.mutate({
                  id: user.id,
                  updates: { name: user.name + ' (Updated)' }
                })}
                disabled={updateUserMutation.isLoading}
              >
                Update
              </button>
              <button
                onClick={() => deleteUserMutation.mutate(user.id)}
                disabled={deleteUserMutation.isLoading}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 5. COMPLEX STATE COORDINATION

interface ShoppingCartItem {
  productId: string;
  quantity: number;
  price: number;
}

interface ShoppingCartStore {
  items: ShoppingCartItem[];
  isOpen: boolean;
  
  addItem: (productId: string, price: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  
  totalItems: () => number;
  totalPrice: () => number;
}

const useShoppingCart = create<ShoppingCartStore>((set, get) => ({
  items: [],
  isOpen: false,
  
  addItem: (productId: string, price: number) => set((state) => {
    const existingItem = state.items.find(item => item.productId === productId);
    
    if (existingItem) {
      return {
        items: state.items.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    } else {
      return {
        items: [...state.items, { productId, quantity: 1, price }]
      };
    }
  }),
  
  removeItem: (productId: string) => set((state) => ({
    items: state.items.filter(item => item.productId !== productId)
  })),
  
  updateQuantity: (productId: string, quantity: number) => set((state) => {
    if (quantity <= 0) {
      return {
        items: state.items.filter(item => item.productId !== productId)
      };
    }
    
    return {
      items: state.items.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    };
  }),
  
  clearCart: () => set({ items: [] }),
  
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  
  totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
  
  totalPrice: () => get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
}));

// Product component that integrates with cart
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const addItem = useShoppingCart(state => state.addItem);
  const { actions } = useApp();

  const handleAddToCart = () => {
    addItem(product.id, product.price);
    actions.addNotification({
      type: 'success',
      message: `${product.title} added to cart`,
      duration: 3000
    });
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p className="price">${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

// Cart component showing coordination between different state stores
const ShoppingCartSidebar: React.FC = () => {
  const { 
    items, 
    isOpen, 
    toggleCart, 
    updateQuantity, 
    removeItem, 
    clearCart,
    totalItems,
    totalPrice 
  } = useShoppingCart();
  
  const { state: { user } } = useApp();

  if (!isOpen) return null;

  return (
    <div className="cart-sidebar">
      <div className="cart-header">
        <h2>Shopping Cart ({totalItems()})</h2>
        <button onClick={toggleCart}>×</button>
      </div>
      
      <div className="cart-items">
        {items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          items.map(item => (
            <div key={item.productId} className="cart-item">
              <span>Product {item.productId}</span>
              <div className="quantity-controls">
                <button 
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
              <button onClick={() => removeItem(item.productId)}>Remove</button>
            </div>
          ))
        )}
      </div>
      
      {items.length > 0 && (
        <div className="cart-footer">
          <div className="total">
            Total: ${totalPrice().toFixed(2)}
          </div>
          <div className="cart-actions">
            <button onClick={clearCart}>Clear Cart</button>
            <button 
              disabled={!user}
              className="checkout-btn"
            >
              {user ? 'Checkout' : 'Login to Checkout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
```
*Notice: Different state management patterns serve different needs - local state for components, Context for tree-wide data, Zustand for global client state, and React Query for server state.*

</div>

### Performance Optimization {#performance}
<!-- tags: react, performance, optimization, memoization -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Performance optimization techniques minimize unnecessary work and improve user experience. **React.memo** prevents component re-renders, **useMemo** caches expensive calculations, **useCallback** memoizes functions, **Code splitting** loads components on demand, **Virtual scrolling** handles large lists, and **Bundle optimization** reduces download sizes. Proper optimization requires measuring and profiling actual bottlenecks.*

</div>

<div class="runnable-model" data-filter="performance optimization">

**Runnable mental model**
```tsx
import React, { memo, useMemo, useCallback, useState, useRef, useEffect, lazy, Suspense } from 'react';
import { FixedSizeList as List } from 'react-window';

// 1. REACT.MEMO - Prevent Unnecessary Re-renders

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

const UserCard = memo<UserCardProps>(({ user, onEdit, onDelete }) => {
  console.log(`Rendering UserCard for ${user.name}`);
  
  return (
    <div className="user-card">
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <div className="actions">
        <button onClick={() => onEdit(user)}>Edit</button>
        <button onClick={() => onDelete(user.id)}>Delete</button>
      </div>
    </div>
  );
});

// Custom comparison for complex props
const UserCardWithCustomComparison = memo<UserCardProps>(
  ({ user, onEdit, onDelete }) => {
    // Component implementation
    return <div>...</div>;
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    return (
      prevProps.user.id === nextProps.user.id &&
      prevProps.user.name === nextProps.user.name &&
      prevProps.user.email === nextProps.user.email &&
      prevProps.user.avatar === nextProps.user.avatar
    );
  }
);

// 2. USEMEMO - Cache Expensive Calculations

interface DataAnalyticsProps {
  data: DataPoint[];
  filters: FilterOptions;
}

const DataAnalytics: React.FC<DataAnalyticsProps> = ({ data, filters }) => {
  // Expensive calculation - only recalculate when data or filters change
  const processedData = useMemo(() => {
    console.log('Processing data...'); // This should only log when dependencies change
    
    return data
      .filter(point => {
        if (filters.category && point.category !== filters.category) return false;
        if (filters.dateRange) {
          const pointDate = new Date(point.date);
          if (pointDate < filters.dateRange.start || pointDate > filters.dateRange.end) {
            return false;
          }
        }
        if (filters.minValue && point.value < filters.minValue) return false;
        if (filters.maxValue && point.value > filters.maxValue) return false;
        return true;
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, filters.limit || 100);
  }, [data, filters]);

  const statistics = useMemo(() => {
    console.log('Calculating statistics...');
    
    if (processedData.length === 0) return null;
    
    const sum = processedData.reduce((acc, point) => acc + point.value, 0);
    const avg = sum / processedData.length;
    const min = Math.min(...processedData.map(p => p.value));
    const max = Math.max(...processedData.map(p => p.value));
    
    // More complex calculations
    const variance = processedData.reduce(
      (acc, point) => acc + Math.pow(point.value - avg, 2), 
      0
    ) / processedData.length;
    const stdDev = Math.sqrt(variance);
    
    return { sum, avg, min, max, count: processedData.length, stdDev };
  }, [processedData]);

  const chartConfig = useMemo(() => {
    return {
      data: processedData.map(point => ({
        x: point.date,
        y: point.value,
        category: point.category
      })),
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: statistics?.max ? statistics.max * 1.1 : undefined
          }
        }
      }
    };
  }, [processedData, statistics]);

  return (
    <div className="data-analytics">
      {statistics && (
        <div className="statistics">
          <div>Count: {statistics.count}</div>
          <div>Sum: {statistics.sum.toFixed(2)}</div>
          <div>Average: {statistics.avg.toFixed(2)}</div>
          <div>Min: {statistics.min}</div>
          <div>Max: {statistics.max}</div>
          <div>Std Dev: {statistics.stdDev.toFixed(2)}</div>
        </div>
      )}
      
      <div className="chart">
        {/* Chart component would use chartConfig */}
        <Chart config={chartConfig} />
      </div>
      
      <div className="data-table">
        {processedData.map(point => (
          <div key={point.id} className="data-row">
            {point.date} - {point.value} ({point.category})
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. USECALLBACK - Memoize Functions

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'email' | 'date'>('name');

  // These callbacks won't change between renders unless dependencies change
  const handleEdit = useCallback((user: User) => {
    setUsers(current => 
      current.map(u => u.id === user.id ? user : u)
    );
  }, []);

  const handleDelete = useCallback((userId: string) => {
    setUsers(current => current.filter(u => u.id !== userId));
  }, []);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleSort = useCallback((field: 'name' | 'email' | 'date') => {
    setSortBy(field);
  }, []);

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    return users
      .filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'email':
            return a.email.localeCompare(b.email);
          case 'date':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          default:
            return 0;
        }
      });
  }, [users, searchTerm, sortBy]);

  return (
    <div className="user-list">
      <SearchInput onSearch={handleSearch} />
      <SortControls onSort={handleSort} current={sortBy} />
      
      <div className="users">
        {filteredAndSortedUsers.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

// 4. VIRTUAL SCROLLING - Handle Large Lists

interface VirtualizedListProps {
  items: any[];
  itemHeight: number;
  containerHeight: number;
}

const VirtualizedList: React.FC<VirtualizedListProps> = ({ 
  items, 
  itemHeight, 
  containerHeight 
}) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style} className="list-item">
      <div>Item #{index}</div>
      <div>{items[index]?.name || `Item ${index}`}</div>
      <div>{items[index]?.description || `Description for item ${index}`}</div>
    </div>
  );

  return (
    <List
      height={containerHeight}
      itemCount={items.length}
      itemSize={itemHeight}
      width="100%"
    >
      {Row}
    </List>
  );
};

// Custom virtual scrolling implementation
const CustomVirtualScroll: React.FC<{ 
  items: any[];
  itemHeight: number;
  containerHeight: number;
}> = ({ items, itemHeight, containerHeight }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleItemCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleItemCount + 1, items.length);
  
  const visibleItems = items.slice(startIndex, endIndex);
  const offsetY = startIndex * itemHeight;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              style={{ height: itemHeight }}
              className="virtual-item"
            >
              Item {startIndex + index}: {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 5. CODE SPLITTING - Lazy Loading

// Lazy load heavy components
const HeavyChart = lazy(() => import('./HeavyChart'));
const DataTable = lazy(() => import('./DataTable'));
const ImageGallery = lazy(() => import('./ImageGallery'));

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chart' | 'table' | 'gallery'>('chart');

  return (
    <div className="dashboard">
      <nav className="tabs">
        <button 
          className={activeTab === 'chart' ? 'active' : ''}
          onClick={() => setActiveTab('chart')}
        >
          Chart
        </button>
        <button 
          className={activeTab === 'table' ? 'active' : ''}
          onClick={() => setActiveTab('table')}
        >
          Data Table
        </button>
        <button 
          className={activeTab === 'gallery' ? 'active' : ''}
          onClick={() => setActiveTab('gallery')}
        >
          Gallery
        </button>
      </nav>

      <div className="tab-content">
        <Suspense fallback={<div>Loading...</div>}>
          {activeTab === 'chart' && <HeavyChart />}
          {activeTab === 'table' && <DataTable />}
          {activeTab === 'gallery' && <ImageGallery />}
        </Suspense>
      </div>
    </div>
  );
};

// 6. IMAGE OPTIMIZATION

const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}> = ({ src, alt, width, height, priority = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoaded && !error) {
          // Start loading the image when it comes into view
          const image = new Image();
          image.onload = () => {
            setIsLoaded(true);
            if (img) {
              img.src = src;
            }
          };
          image.onerror = () => setError(true);
          image.src = src;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (!priority) {
      observer.observe(img);
    } else {
      // Load immediately for priority images
      const image = new Image();
      image.onload = () => setIsLoaded(true);
      image.onerror = () => setError(true);
      image.src = src;
    }

    return () => observer.disconnect();
  }, [src, priority, isLoaded, error]);

  if (error) {
    return (
      <div 
        style={{ width, height }}
        className="image-error"
      >
        Failed to load image
      </div>
    );
  }

  return (
    <div style={{ width, height, position: 'relative' }}>
      {!isLoaded && (
        <div 
          style={{ width, height }}
          className="image-placeholder"
        >
          Loading...
        </div>
      )}
      <img
        ref={imgRef}
        alt={alt}
        style={{
          width,
          height,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      />
    </div>
  );
};

// 7. DEBOUNCED SEARCH

const useDebounce = <T,>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

const SearchableUserList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  const {
    data: searchResults,
    isLoading,
    error
  } = useQuery({
    queryKey: ['users', 'search', debouncedSearchTerm],
    queryFn: () => searchUsers(debouncedSearchTerm),
    enabled: debouncedSearchTerm.length > 2,
    staleTime: 5 * 60 * 1000
  });

  return (
    <div className="searchable-user-list">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search users..."
      />
      
      {isLoading && <div>Searching...</div>}
      {error && <div>Error: {error.message}</div>}
      
      {searchResults && (
        <div className="search-results">
          {searchResults.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

// 8. PERFORMANCE MONITORING

const usePerformanceMonitor = (componentName: string) => {
  const renderStart = useRef<number>();
  const renderCount = useRef(0);

  useEffect(() => {
    renderStart.current = performance.now();
    renderCount.current++;

    return () => {
      if (renderStart.current) {
        const renderTime = performance.now() - renderStart.current;
        console.log(`${componentName} render #${renderCount.current}: ${renderTime.toFixed(2)}ms`);
      }
    };
  });

  const measureOperation = useCallback((name: string, operation: () => void) => {
    const start = performance.now();
    operation();
    const end = performance.now();
    console.log(`${componentName} - ${name}: ${(end - start).toFixed(2)}ms`);
  }, [componentName]);

  return { measureOperation };
};

const MonitoredComponent: React.FC = () => {
  const { measureOperation } = usePerformanceMonitor('MonitoredComponent');
  const [data, setData] = useState<any[]>([]);

  const processData = useCallback(() => {
    measureOperation('processData', () => {
      // Expensive operation
      const processed = data.map(item => ({
        ...item,
        computed: item.value * 2
      }));
      setData(processed);
    });
  }, [data, measureOperation]);

  return (
    <div>
      <button onClick={processData}>Process Data</button>
      {/* Component content */}
    </div>
  );
};
```
*Notice: Performance optimization should be based on actual measurements, not assumptions. Use React DevTools Profiler to identify real bottlenecks.*

</div>

### Modern CSS and Styling {#modern-css}
<!-- tags: css, flexbox, grid, responsive, design-systems -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Modern CSS includes advanced layout systems like **Flexbox** (1-dimensional layout), **CSS Grid** (2-dimensional layout), **Custom Properties** (CSS variables), **Container Queries** (element-based responsive design), **CSS-in-JS** solutions, and **Design Systems** for consistent styling. These technologies enable responsive, maintainable, and performant styling architectures.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Layout flexibility**: Flexbox and Grid solve complex layout problems elegantly
- **Maintainability**: CSS custom properties and CSS-in-JS improve code organization
- **Performance**: Modern CSS features reduce JavaScript dependencies for styling
- **Design consistency**: Design systems ensure cohesive user interfaces across applications

</div>

<div class="runnable-model" data-filter="modern css">

**Runnable mental model**
```css
/* 1. CSS CUSTOM PROPERTIES - Variables and Theming */

:root {
  /* Color system */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-900: #1e3a8a;
  
  /* Spacing scale */
  --spacing-xs: 0.25rem;  /* 4px */
  --spacing-sm: 0.5rem;   /* 8px */
  --spacing-md: 1rem;     /* 16px */
  --spacing-lg: 1.5rem;   /* 24px */
  --spacing-xl: 2rem;     /* 32px */
  
  /* Typography scale */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  
  /* Component tokens */
  --button-padding: var(--spacing-sm) var(--spacing-md);
  --button-border-radius: 0.375rem;
  --card-padding: var(--spacing-lg);
  --card-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  /* Breakpoints (for use in calculations) */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}

/* Dark theme overrides */
[data-theme="dark"] {
  --color-primary-50: #1e3a8a;
  --color-primary-100: #1e40af;
  --color-primary-500: #60a5fa;
  --color-primary-600: #3b82f6;
  --color-primary-900: #dbeafe;
  --card-shadow: 0 1px 3px rgba(255, 255, 255, 0.1);
}

/* 2. FLEXBOX - One-dimensional Layout */

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  gap: var(--spacing-md);
}

.navigation-links {
  display: flex;
  gap: var(--spacing-sm);
  list-style: none;
}

/* Responsive navigation */
@media (max-width: 768px) {
  .navigation {
    flex-direction: column;
    align-items: stretch;
  }
  
  .navigation-links {
    flex-direction: column;
    width: 100%;
  }
}

/* Card grid with flexbox */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  margin: var(--spacing-lg) 0;
}

.card {
  flex: 1 1 300px; /* grow, shrink, basis */
  min-width: 0; /* Prevent flex items from overflowing */
  padding: var(--card-padding);
  border: 1px solid var(--color-primary-100);
  border-radius: var(--button-border-radius);
  box-shadow: var(--card-shadow);
}

/* Flexbox utility classes */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }
.items-center { align-items: center; }
.items-start { align-items: flex-start; }
.justify-between { justify-content: space-between; }
.justify-center { justify-content: center; }
.flex-1 { flex: 1 1 0%; }
.flex-auto { flex: 1 1 auto; }

/* 3. CSS GRID - Two-dimensional Layout */

/* Main layout grid */
.app-layout {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 250px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: var(--spacing-md);
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

/* Responsive grid layout */
@media (max-width: 1024px) {
  .app-layout {
    grid-template-areas: 
      "header"
      "main"
      "sidebar"
      "footer";
    grid-template-columns: 1fr;
  }
  
  .aside { display: none; }
}

/* Product grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
}

/* Image gallery with different sizes */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: 200px;
  gap: var(--spacing-sm);
}

.gallery-item:nth-child(3n+1) {
  grid-row: span 2;
}

.gallery-item:nth-child(4n+1) {
  grid-column: span 2;
}

/* Form layout with grid */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
}

.form-field {
  display: grid;
  gap: var(--spacing-xs);
}

.form-field label {
  font-weight: 600;
  color: var(--color-primary-900);
}

.form-field input,
.form-field textarea,
.form-field select {
  padding: var(--spacing-sm);
  border: 1px solid var(--color-primary-100);
  border-radius: var(--button-border-radius);
  font-size: var(--font-size-base);
}

.form-field input:focus,
.form-field textarea:focus,
.form-field select:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* 4. CONTAINER QUERIES - Element-based Responsive Design */

.card-container {
  container-type: inline-size;
  container-name: card;
}

.card {
  padding: var(--spacing-md);
  border: 1px solid var(--color-primary-100);
  border-radius: var(--button-border-radius);
}

@container card (min-width: 300px) {
  .card {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--spacing-md);
  }
  
  .card-image {
    width: 100px;
    height: 100px;
  }
}

@container card (min-width: 500px) {
  .card {
    grid-template-columns: 150px 1fr auto;
  }
  
  .card-actions {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }
}

/* 5. MODERN CSS FEATURES */

/* Logical properties for international support */
.content {
  margin-inline: auto;
  padding-inline: var(--spacing-md);
  padding-block: var(--spacing-lg);
  max-inline-size: 1200px;
}

/* Aspect ratio */
.video-wrapper {
  aspect-ratio: 16 / 9;
  background: var(--color-primary-50);
}

.avatar {
  aspect-ratio: 1;
  border-radius: 50%;
  object-fit: cover;
}

/* Modern color functions */
.button {
  background: var(--color-primary-500);
  color: white;
  border: none;
  padding: var(--button-padding);
  border-radius: var(--button-border-radius);
  cursor: pointer;
  transition: background 0.2s ease;
}

.button:hover {
  background: color-mix(in srgb, var(--color-primary-500) 90%, black);
}

.button:disabled {
  background: color-mix(in srgb, var(--color-primary-500) 50%, transparent);
  cursor: not-allowed;
}

/* Scroll-driven animations */
.header {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  transition: background 0.3s ease;
}

@supports (animation-timeline: scroll()) {
  .scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--color-primary-500);
    transform-origin: left;
    animation: progress linear;
    animation-timeline: scroll(root);
  }
  
  @keyframes progress {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }
}

/* 6. CSS-IN-JS WITH STYLED-COMPONENTS */

```tsx
import styled, { css, createGlobalStyle, ThemeProvider } from 'styled-components';

// Theme definition
const theme = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      900: '#1e3a8a',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  typography: {
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    }
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  }
};

// Global styles
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    background: ${props => props.theme.colors.gray[50]};
    color: ${props => props.theme.colors.gray[900]};
  }
`;

// Styled components with TypeScript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
}

const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.375rem;
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.fullWidth && css`
    width: 100%;
  `}
  
  ${props => props.disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
  `}
  
  /* Size variants */
  ${props => {
    switch (props.size) {
      case 'sm':
        return css`
          padding: ${props.theme.spacing.xs} ${props.theme.spacing.sm};
          font-size: ${props.theme.typography.fontSizes.sm};
        `;
      case 'lg':
        return css`
          padding: ${props.theme.spacing.md} ${props.theme.spacing.lg};
          font-size: ${props.theme.typography.fontSizes.lg};
        `;
      default:
        return css`
          padding: ${props.theme.spacing.sm} ${props.theme.spacing.md};
          font-size: ${props.theme.typography.fontSizes.base};
        `;
    }
  }}
  
  /* Color variants */
  ${props => {
    switch (props.variant) {
      case 'secondary':
        return css`
          background: ${props.theme.colors.gray[100]};
          color: ${props.theme.colors.gray[900]};
          
          &:hover:not(:disabled) {
            background: ${props.theme.colors.gray[200]};
          }
        `;
      case 'danger':
        return css`
          background: #ef4444;
          color: white;
          
          &:hover:not(:disabled) {
            background: #dc2626;
          }
        `;
      default:
        return css`
          background: ${props.theme.colors.primary[500]};
          color: white;
          
          &:hover:not(:disabled) {
            background: ${props.theme.colors.primary[600]};
          }
        `;
    }
  }}
  
  /* Responsive behavior */
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
  }
`;

// Card component with complex styling
const Card = styled.div<{ elevated?: boolean; padding?: 'sm' | 'md' | 'lg' }>`
  background: white;
  border-radius: 0.5rem;
  border: 1px solid ${props => props.theme.colors.gray[200]};
  
  ${props => props.elevated && css`
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  `}
  
  ${props => {
    const paddingSize = props.padding || 'md';
    return css`
      padding: ${props.theme.spacing[paddingSize]};
    `;
  }}
`;

// Usage in component
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div>
        <Card elevated padding="lg">
          <h1>Styled Components Example</h1>
          <p>This card uses styled-components with TypeScript.</p>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Button variant="primary" size="md">
              Primary
            </Button>
            <Button variant="secondary" size="md">
              Secondary
            </Button>
            <Button variant="danger" size="sm">
              Danger
            </Button>
          </div>
        </Card>
      </div>
    </ThemeProvider>
  );
};

// Dynamic styling based on props
const ProgressBar = styled.div<{ progress: number; color?: string }>`
  width: 100%;
  height: 8px;
  background: ${props => props.theme.colors.gray[200]};
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${props => props.progress}%;
    background: ${props => props.color || props.theme.colors.primary[500]};
    transition: width 0.3s ease;
  }
`;

// Media query helper
const media = {
  sm: `@media (min-width: ${theme.breakpoints.sm})`,
  md: `@media (min-width: ${theme.breakpoints.md})`,
  lg: `@media (min-width: ${theme.breakpoints.lg})`,
  xl: `@media (min-width: ${theme.breakpoints.xl})`,
};

const ResponsiveGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing.md};
  
  ${media.sm} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
  
  ${media.xl} {
    grid-template-columns: repeat(4, 1fr);
  }
`;
```

</div>

### Testing Frontend Applications {#frontend-testing}
<!-- tags: testing, jest, react-testing-library, cypress, e2e -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Frontend testing encompasses **Unit tests** (individual functions/components), **Integration tests** (component interactions), **End-to-end tests** (full user workflows), and **Visual regression tests** (UI appearance). **Jest** provides test runner and assertions, **React Testing Library** tests components as users interact with them, **Cypress** handles E2E automation, and **Storybook** enables component testing in isolation.*

</div>

<div class="runnable-model" data-filter="frontend testing">

**Runnable mental model**
```tsx
import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// 1. UNIT TESTING - Individual Functions

// Utility function to test
export const formatCurrency = (amount: number, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const calculateDiscount = (price: number, discountPercent: number) => {
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error('Discount percent must be between 0 and 100');
  }
  return price * (1 - discountPercent / 100);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Unit tests
describe('Utility Functions', () => {
  describe('formatCurrency', () => {
    it('formats USD currency correctly', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
      expect(formatCurrency(0)).toBe('$0.00');
      expect(formatCurrency(99.9)).toBe('$99.90');
    });

    it('handles different currencies', () => {
      expect(formatCurrency(1000, 'EUR')).toBe('€1,000.00');
      expect(formatCurrency(1000, 'GBP')).toBe('£1,000.00');
    });

    it('handles negative amounts', () => {
      expect(formatCurrency(-50.25)).toBe('-$50.25');
    });
  });

  describe('calculateDiscount', () => {
    it('calculates discount correctly', () => {
      expect(calculateDiscount(100, 10)).toBe(90);
      expect(calculateDiscount(50, 25)).toBe(37.5);
      expect(calculateDiscount(200, 0)).toBe(200);
    });

    it('throws error for invalid discount percentage', () => {
      expect(() => calculateDiscount(100, -1)).toThrow('Discount percent must be between 0 and 100');
      expect(() => calculateDiscount(100, 101)).toThrow('Discount percent must be between 0 and 100');
    });
  });

  describe('validateEmail', () => {
    it('validates correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
      expect(validateEmail('test+label@gmail.com')).toBe(true);
    });

    it('rejects invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
      expect(validateEmail('test..test@domain.com')).toBe(false);
    });
  });
});

// 2. COMPONENT TESTING - React Testing Library

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
  onViewDetails: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await onAddToCart(product.id);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div data-testid="product-card" className="product-card">
      <h3>{product.name}</h3>
      <p data-testid="product-price">{formatCurrency(product.price)}</p>
      <p>{product.description}</p>
      
      {product.inStock ? (
        <div>
          <span data-testid="stock-status" className="in-stock">In Stock</span>
          <button 
            onClick={handleAddToCart} 
            disabled={isLoading}
            data-testid="add-to-cart-button"
          >
            {isLoading ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      ) : (
        <span data-testid="stock-status" className="out-of-stock">Out of Stock</span>
      )}
      
      <button 
        onClick={() => onViewDetails(product.id)}
        data-testid="view-details-button"
      >
        View Details
      </button>
    </div>
  );
};

// Component tests
describe('ProductCard', () => {
  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    price: 29.99,
    description: 'A great test product',
    inStock: true,
  };

  const mockOnAddToCart = jest.fn();
  const mockOnViewDetails = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product information correctly', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByTestId('product-price')).toHaveTextContent('$29.99');
    expect(screen.getByText('A great test product')).toBeInTheDocument();
  });

  it('shows "In Stock" status for available products', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.getByTestId('stock-status')).toHaveTextContent('In Stock');
    expect(screen.getByTestId('add-to-cart-button')).toBeInTheDocument();
  });

  it('shows "Out of Stock" status for unavailable products', () => {
    const outOfStockProduct = { ...mockProduct, inStock: false };
    
    render(
      <ProductCard 
        product={outOfStockProduct} 
        onAddToCart={mockOnAddToCart}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.getByTestId('stock-status')).toHaveTextContent('Out of Stock');
    expect(screen.queryByTestId('add-to-cart-button')).not.toBeInTheDocument();
  });

  it('calls onAddToCart when add to cart button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart}
        onViewDetails={mockOnViewDetails}
      />
    );

    await user.click(screen.getByTestId('add-to-cart-button'));
    
    expect(mockOnAddToCart).toHaveBeenCalledWith('1');
    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
  });

  it('shows loading state when adding to cart', async () => {
    const user = userEvent.setup();
    let resolveAddToCart: () => void;
    
    const slowAddToCart = jest.fn(() => 
      new Promise<void>((resolve) => {
        resolveAddToCart = resolve;
      })
    );

    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={slowAddToCart}
        onViewDetails={mockOnViewDetails}
      />
    );

    const addButton = screen.getByTestId('add-to-cart-button');
    await user.click(addButton);
    
    expect(addButton).toHaveTextContent('Adding...');
    expect(addButton).toBeDisabled();
    
    resolveAddToCart!();
    
    await waitFor(() => {
      expect(addButton).toHaveTextContent('Add to Cart');
      expect(addButton).not.toBeDisabled();
    });
  });

  it('calls onViewDetails when view details button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart}
        onViewDetails={mockOnViewDetails}
      />
    );

    await user.click(screen.getByTestId('view-details-button'));
    
    expect(mockOnViewDetails).toHaveBeenCalledWith('1');
    expect(mockOnViewDetails).toHaveBeenCalledTimes(1);
  });
});

// 3. INTEGRATION TESTING - Multiple Components Working Together

const ShoppingCart: React.FC = () => {
  const [items, setItems] = React.useState<Array<{ product: Product; quantity: number }>>([]);

  const addToCart = (product: Product) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...currentItems, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(currentItems => currentItems.filter(item => item.product.id !== productId));
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  return (
    <div data-testid="shopping-cart">
      <h2>Shopping Cart</h2>
      
      {items.length === 0 ? (
        <p data-testid="empty-cart-message">Your cart is empty</p>
      ) : (
        <>
          <ul data-testid="cart-items">
            {items.map(item => (
              <li key={item.product.id} data-testid={`cart-item-${item.product.id}`}>
                <span>{item.product.name}</span>
                <span data-testid={`item-quantity-${item.product.id}`}>Qty: {item.quantity}</span>
                <span data-testid={`item-price-${item.product.id}`}>
                  {formatCurrency(item.product.price * item.quantity)}
                </span>
                <button 
                  onClick={() => removeFromCart(item.product.id)}
                  data-testid={`remove-item-${item.product.id}`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          
          <div data-testid="cart-total">
            Total: {formatCurrency(getTotalPrice())}
          </div>
        </>
      )}
    </div>
  );
};

const ProductList: React.FC<{ products: Product[] }> = ({ products }) => {
  const [cart, setCart] = React.useState<Product[]>([]);

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setCart(currentCart => [...currentCart, product]);
    }
  };

  return (
    <div data-testid="product-list">
      <h2>Products</h2>
      <div className="products">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onViewDetails={() => {}}
          />
        ))}
      </div>
      
      <div data-testid="cart-summary">
        Cart items: {cart.length}
      </div>
    </div>
  );
};

// Integration tests
describe('Product List and Cart Integration', () => {
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      price: 10.99,
      description: 'First product',
      inStock: true,
    },
    {
      id: '2',
      name: 'Product 2',
      price: 24.99,
      description: 'Second product',
      inStock: true,
    },
  ];

  it('adds products to cart and updates cart count', async () => {
    const user = userEvent.setup();
    
    render(<ProductList products={mockProducts} />);

    // Initially no items in cart
    expect(screen.getByTestId('cart-summary')).toHaveTextContent('Cart items: 0');

    // Add first product to cart
    const product1Cards = screen.getAllByTestId('product-card');
    const firstProductButton = within(product1Cards[0]).getByTestId('add-to-cart-button');
    await user.click(firstProductButton);

    expect(screen.getByTestId('cart-summary')).toHaveTextContent('Cart items: 1');

    // Add second product to cart
    const secondProductButton = within(product1Cards[1]).getByTestId('add-to-cart-button');
    await user.click(secondProductButton);

    expect(screen.getByTestId('cart-summary')).toHaveTextContent('Cart items: 2');
  });
});

// 4. API TESTING WITH MSW (Mock Service Worker)

const server = setupServer(
  rest.get('/api/products', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: '1',
          name: 'Mocked Product',
          price: 19.99,
          description: 'A mocked product',
          inStock: true,
        },
      ])
    );
  }),

  rest.post('/api/cart/add', (req, res, ctx) => {
    return res(
      ctx.json({ success: true, message: 'Product added to cart' })
    );
  }),

  rest.post('/api/cart/add', (req, res, ctx) => {
    // Simulate server error for testing
    if (req.body === '{"productId":"error"}') {
      return res(
        ctx.status(500),
        ctx.json({ error: 'Internal server error' })
      );
    }
    
    return res(
      ctx.json({ success: true })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Component that fetches data
const ProductListWithAPI: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = async (productId: string) => {
    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }

      // Show success message or update UI
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) return <div data-testid="loading">Loading...</div>;
  if (error) return <div data-testid="error">Error: {error}</div>;

  return (
    <div data-testid="product-list-api">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
          onViewDetails={() => {}}
        />
      ))}
    </div>
  );
};

// API integration tests
describe('ProductListWithAPI', () => {
  it('loads and displays products from API', async () => {
    render(<ProductListWithAPI />);

    // Initially shows loading
    expect(screen.getByTestId('loading')).toBeInTheDocument();

    // Wait for products to load
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Mocked Product')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();
  });

  it('handles API errors gracefully', async () => {
    server.use(
      rest.get('/api/products', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<ProductListWithAPI />);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });
  });
});

// 5. E2E TESTING WITH CYPRESS

// cypress/e2e/shopping-flow.cy.ts
describe('Shopping Flow E2E', () => {
  beforeEach(() => {
    cy.visit('/products');
  });

  it('completes a full shopping journey', () => {
    // Browse products
    cy.get('[data-testid="product-card"]').should('have.length.at.least', 1);
    
    // Add product to cart
    cy.get('[data-testid="add-to-cart-button"]').first().click();
    
    // Verify cart updated
    cy.get('[data-testid="cart-count"]').should('contain', '1');
    
    // Go to cart
    cy.get('[data-testid="cart-link"]').click();
    cy.url().should('include', '/cart');
    
    // Verify product in cart
    cy.get('[data-testid="cart-item"]').should('have.length', 1);
    
    // Proceed to checkout
    cy.get('[data-testid="checkout-button"]').click();
    cy.url().should('include', '/checkout');
    
    // Fill shipping information
    cy.get('[data-testid="shipping-name"]').type('John Doe');
    cy.get('[data-testid="shipping-email"]').type('john@example.com');
    cy.get('[data-testid="shipping-address"]').type('123 Main St');
    cy.get('[data-testid="shipping-city"]').type('New York');
    cy.get('[data-testid="shipping-zip"]').type('10001');
    
    // Complete order
    cy.get('[data-testid="place-order-button"]').click();
    
    // Verify success
    cy.get('[data-testid="order-success"]').should('be.visible');
    cy.url().should('include', '/order-confirmation');
  });

  it('handles invalid checkout form', () => {
    // Add product to cart
    cy.get('[data-testid="add-to-cart-button"]').first().click();
    cy.get('[data-testid="cart-link"]').click();
    cy.get('[data-testid="checkout-button"]').click();
    
    // Try to submit empty form
    cy.get('[data-testid="place-order-button"]').click();
    
    // Verify validation errors
    cy.get('[data-testid="error-name"]').should('contain', 'Name is required');
    cy.get('[data-testid="error-email"]').should('contain', 'Email is required');
    
    // Fill invalid email
    cy.get('[data-testid="shipping-email"]').type('invalid-email');
    cy.get('[data-testid="place-order-button"]').click();
    
    // Verify email validation
    cy.get('[data-testid="error-email"]').should('contain', 'Invalid email format');
  });
});

// 6. VISUAL REGRESSION TESTING WITH STORYBOOK

// Button.stories.tsx
export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export const Primary = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const AllSizes = () => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>
);

export const LoadingStates = () => (
  <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
    <Button>Normal</Button>
    <Button disabled>Disabled</Button>
    <Button>Loading...</Button>
  </div>
);

// Performance testing with Lighthouse
// lighthouse.test.js
describe('Performance Tests', () => {
  it('meets performance benchmarks', async () => {
    const result = await lighthouse('http://localhost:3000', {
      chromeFlags: ['--headless'],
    });
    
    const scores = result.audits;
    
    expect(scores['first-contentful-paint'].score).toBeGreaterThan(0.8);
    expect(scores['largest-contentful-paint'].score).toBeGreaterThan(0.8);
    expect(scores['cumulative-layout-shift'].score).toBeGreaterThan(0.8);
  });
});
```
*Notice: Test the user experience, not implementation details. React Testing Library enforces this principle by encouraging testing from the user's perspective.*

</div>

### Build Tools and Development Workflow {#build-tools}
<!-- tags: webpack, vite, bundling, development, optimization -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Build tools transform and optimize source code for production deployment. **Webpack** provides module bundling with loaders and plugins, **Vite** offers fast development with ES modules and HMR, **Rollup** specializes in library bundling, and **esbuild** delivers extremely fast builds. Modern tools include **TypeScript compilation**, **CSS processing**, **asset optimization**, and **code splitting**.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Development speed**: Hot Module Replacement (HMR) enables instant updates
- **Production optimization**: Minification, tree-shaking, and compression reduce bundle size
- **Code splitting**: Lazy loading improves initial page load times
- **Asset processing**: Automatic optimization of images, CSS, and other resources

</div>

<div class="runnable-model" data-filter="build tools">

**Runnable mental model**
```javascript
// 1. VITE CONFIGURATION - Modern Fast Build Tool

// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      // Enable React Fast Refresh
      fastRefresh: true,
      // JSX runtime (automatic or classic)
      jsxRuntime: 'automatic'
    })
  ],
  
  // Development server configuration
  server: {
    port: 3000,
    open: true,
    cors: true,
    proxy: {
      // Proxy API requests to backend
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
    
    // Code splitting configuration
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html')
      },
      output: {
        // Manual chunk splitting
        manualChunks: {
          // Vendor libraries
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@mui/material', '@emotion/react'],
          utils: ['lodash', 'date-fns']
        },
        // Dynamic chunk naming
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    
    // Bundle analysis
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000
  },
  
  // Path resolution
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@utils': resolve(__dirname, './src/utils'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@types': resolve(__dirname, './src/types')
    }
  },
  
  // CSS configuration
  css: {
    modules: {
      // CSS Modules configuration
      localsConvention: 'camelCaseOnly',
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    },
    preprocessorOptions: {
      scss: {
        // SCSS global variables
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },
  
  // Environment variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  }
});

// 2. WEBPACK CONFIGURATION - Traditional Bundler

// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  
  entry: {
    main: './src/index.tsx',
    vendor: ['react', 'react-dom']
  },
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction 
      ? '[name].[contenthash].js' 
      : '[name].js',
    chunkFilename: isProduction 
      ? '[name].[contenthash].chunk.js' 
      : '[name].chunk.js',
    publicPath: '/',
    clean: true
  },
  
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils')
    }
  },
  
  module: {
    rules: [
      // TypeScript/JavaScript
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript'
            ],
            plugins: [
              // React Fast Refresh
              !isProduction && 'react-refresh/babel'
            ].filter(Boolean)
          }
        }
      },
      
      // CSS/SCSS
      {
        test: /\.(css|scss)$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: isProduction 
                  ? '[hash:base64]' 
                  : '[local]--[hash:base64:5]'
              }
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      
      // Images
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8192 // 8kb
          }
        },
        generator: {
          filename: 'images/[name].[hash][ext]'
        }
      },
      
      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash][ext]'
        }
      }
    ]
  },
  
  plugins: [
    new CleanWebpackPlugin(),
    
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: true,
      minify: isProduction ? {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      } : false
    }),
    
    isProduction && new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].chunk.css'
    }),
    
    // Bundle analysis (only when ANALYZE=true)
    process.env.ANALYZE && new BundleAnalyzerPlugin()
  ].filter(Boolean),
  
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        common: {
          minChunks: 2,
          priority: -10,
          reuseExistingChunk: true
        }
      }
    },
    
    runtimeChunk: {
      name: 'runtime'
    },
    
    minimizer: isProduction ? [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      }),
      new CssMinimizerPlugin()
    ] : []
  },
  
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public')
    },
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  
  devtool: isProduction ? 'source-map' : 'eval-source-map'
};

// 3. PACKAGE.JSON SCRIPTS - Development Workflow

// package.json
{
  "name": "frontend-app",
  "version": "1.0.0",
  "scripts": {
    // Development
    "dev": "vite",
    "dev:debug": "vite --debug",
    "dev:host": "vite --host",
    
    // Building
    "build": "tsc && vite build",
    "build:analyze": "ANALYZE=true npm run build",
    "build:staging": "NODE_ENV=staging vite build",
    
    // Preview built app
    "preview": "vite preview",
    "preview:host": "vite preview --host",
    
    // Testing
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "cypress run",
    "test:e2e:open": "cypress open",
    
    // Linting and formatting
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,scss}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,css,scss}\"",
    
    // Type checking
    "type-check": "tsc --noEmit",
    "type-check:watch": "tsc --noEmit --watch",
    
    // Deployment
    "deploy": "npm run build && firebase deploy",
    "deploy:staging": "npm run build:staging && firebase deploy --only hosting:staging",
    
    // Utilities
    "clean": "rm -rf dist node_modules/.cache",
    "update-deps": "npm update && npm audit fix",
    "size-check": "npm run build && bundlesize"
  }
}

// 4. POSTCSS CONFIGURATION - CSS Processing

// postcss.config.js
module.exports = {
  plugins: {
    // CSS imports
    'postcss-import': {},
    
    // Tailwind CSS
    'tailwindcss/nesting': {},
    'tailwindcss': {},
    
    // Autoprefixer for browser compatibility
    'autoprefixer': {
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
    },
    
    // CSS optimization for production
    ...(process.env.NODE_ENV === 'production' ? {
      'cssnano': {
        preset: ['default', {
          discardComments: { removeAll: true },
          normalizeWhitespace: true,
          reduceIdents: false,
          zindex: false
        }]
      }
    } : {})
  }
};

// 5. ENVIRONMENT CONFIGURATION

// .env files
// .env.local (highest priority, local overrides)
VITE_API_URL=http://localhost:8080
VITE_APP_NAME=My App
VITE_ENABLE_ANALYTICS=false

// .env.development
VITE_API_URL=https://dev-api.example.com
VITE_LOG_LEVEL=debug
VITE_ENABLE_ANALYTICS=false

// .env.production
VITE_API_URL=https://api.example.com
VITE_LOG_LEVEL=error
VITE_ENABLE_ANALYTICS=true
VITE_SENTRY_DSN=https://your-sentry-dsn

// Environment variables usage
// src/config/environment.ts
interface Environment {
  apiUrl: string;
  appName: string;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  enableAnalytics: boolean;
  sentryDsn?: string;
}

export const env: Environment = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  appName: import.meta.env.VITE_APP_NAME || 'App',
  logLevel: import.meta.env.VITE_LOG_LEVEL || 'info',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  sentryDsn: import.meta.env.VITE_SENTRY_DSN
};

// Type-safe environment validation
const requiredEnvVars = ['VITE_API_URL'] as const;

requiredEnvVars.forEach(envVar => {
  if (!import.meta.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

// 6. CODE SPLITTING AND LAZY LOADING

// Route-based code splitting
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load route components
const HomePage = lazy(() => import('../pages/HomePage'));
const ProductsPage = lazy(() => import('../pages/ProductsPage'));
const UserDashboard = lazy(() => import('../pages/UserDashboard'));
const AdminPanel = lazy(() => 
  import('../pages/AdminPanel').then(module => ({
    default: module.AdminPanel
  }))
);

// Error boundary for lazy loaded components
class LazyLoadErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong loading this page.</h2>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// App router with code splitting
const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <LazyLoadErrorBoundary>
            <Suspense fallback={<PageSkeleton />}>
              <HomePage />
            </Suspense>
          </LazyLoadErrorBoundary>
        } 
      />
      <Route 
        path="/products" 
        element={
          <LazyLoadErrorBoundary>
            <Suspense fallback={<PageSkeleton />}>
              <ProductsPage />
            </Suspense>
          </LazyLoadErrorBoundary>
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <LazyLoadErrorBoundary>
            <Suspense fallback={<DashboardSkeleton />}>
              <UserDashboard />
            </Suspense>
          </LazyLoadErrorBoundary>
        } 
      />
      <Route 
        path="/admin" 
        element={
          <LazyLoadErrorBoundary>
            <Suspense fallback={<AdminSkeleton />}>
              <AdminPanel />
            </Suspense>
          </LazyLoadErrorBoundary>
        } 
      />
    </Routes>
  );
};

// Component-level code splitting
const DynamicChart = lazy(() => 
  import('react-chartjs-2').then(module => ({
    default: module.Chart
  }))
);

const ChartContainer: React.FC = () => {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>
        Load Chart
      </button>
      
      {showChart && (
        <Suspense fallback={<ChartSkeleton />}>
          <DynamicChart data={chartData} />
        </Suspense>
      )}
    </div>
  );
};

// 7. PERFORMANCE MONITORING

// Bundle size monitoring - bundlesize.config.json
{
  "files": [
    {
      "path": "dist/assets/*.js",
      "maxSize": "250kb"
    },
    {
      "path": "dist/assets/*.css",
      "maxSize": "50kb"
    }
  ]
}

// Performance monitoring in app
// src/utils/performance.ts
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  
  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  measurePageLoad(pageName: string) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const navigation = entry as PerformanceNavigationTiming;
          
          console.log(`${pageName} Performance:`, {
            DOMContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
            Load: navigation.loadEventEnd - navigation.navigationStart,
            FCP: this.getFirstContentfulPaint(),
            LCP: this.getLargestContentfulPaint()
          });
        }
      });
    });
    
    observer.observe({ entryTypes: ['navigation'] });
  }

  private getFirstContentfulPaint(): number | null {
    const entries = performance.getEntriesByType('paint');
    const fcp = entries.find(entry => entry.name === 'first-contentful-paint');
    return fcp ? fcp.startTime : null;
  }

  private getLargestContentfulPaint(): number | null {
    return new Promise((resolve) => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        resolve(lastEntry.startTime);
        observer.disconnect();
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    });
  }

  trackUserTiming(name: string, startTime: number) {
    performance.mark(name);
    const duration = performance.now() - startTime;
    console.log(`${name}: ${duration.toFixed(2)}ms`);
  }
}

// Usage in components
const ProductPage: React.FC = () => {
  useEffect(() => {
    const monitor = PerformanceMonitor.getInstance();
    monitor.measurePageLoad('ProductPage');
    
    const startTime = performance.now();
    
    // Simulate expensive operation
    setTimeout(() => {
      monitor.trackUserTiming('ProductDataLoad', startTime);
    }, 1000);
  }, []);

  return <div>Product Page Content</div>;
};
```
*Notice: Build tools should be configured for both development speed and production optimization. Use modern tools like Vite for faster development experience.*

</div>

### Deployment and DevOps {#deployment}
<!-- tags: deployment, ci-cd, docker, hosting, optimization -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Frontend deployment involves building, optimizing, and hosting applications for production use. **Static hosting** (Netlify, Vercel) for SPAs, **CDN deployment** for global distribution, **Docker containerization** for consistent environments, **CI/CD pipelines** for automated deployment, and **Environment management** for different stages (dev, staging, production). Modern deployment includes **performance monitoring** and **rollback strategies**.*

</div>

<div class="runnable-model" data-filter="deployment">

**Runnable mental model**
```yaml
# 1. GITHUB ACTIONS CI/CD PIPELINE

# .github/workflows/deploy.yml
name: Build and Deploy

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18'
  CACHE_KEY: 'node-modules'

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm run test:coverage
        
      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
          
      - name: Run linting
        run: npm run lint
        
      - name: Type checking
        run: npm run type-check
        
      - name: E2E tests
        run: npm run test:e2e:ci
        
  build:
    needs: test
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        environment: [staging, production]
        
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build for ${{ matrix.environment }}
        run: npm run build:${{ matrix.environment }}
        env:
          VITE_API_URL: ${{ secrets[format('API_URL_{0}', upper(matrix.environment))] }}
          VITE_SENTRY_DSN: ${{ secrets.SENTRY_DSN }}
          
      - name: Run bundle analysis
        run: npm run build:analyze
        
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-${{ matrix.environment }}
          path: dist/
          retention-days: 30
          
  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    environment: staging
    
    steps:
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build-staging
          path: dist/
          
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=dist
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_STAGING_SITE_ID }}
          
      - name: Notify Slack
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          channel: '#deployments'
          text: 'Staging deployment completed'
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
          
  deploy-production:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production
    
    steps:
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build-production
          path: dist/
          
      - name: Deploy to AWS S3
        run: |
          aws s3 sync dist/ s3://${{ secrets.S3_BUCKET }} --delete
          aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_DEFAULT_REGION: us-east-1
          
      - name: Verify deployment
        run: |
          curl -f https://${{ secrets.PRODUCTION_DOMAIN }}/health || exit 1
          
      - name: Create deployment record
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.repos.createDeployment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              ref: context.sha,
              environment: 'production',
              description: 'Production deployment'
            });

# 2. DOCKER CONFIGURATION

# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application
COPY --from=builder /app/dist /usr/share/nginx/html

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# docker-compose.yml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "3000:80"
    environment:
      - NODE_ENV=production
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    restart: unless-stopped
    
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - frontend
    restart: unless-stopped

# 3. NGINX CONFIGURATION

# nginx.conf
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;
        
    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
    
    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
        
        # API proxy
        location /api {
            proxy_pass http://backend:8080;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        
        # SPA fallback
        location / {
            try_files $uri $uri/ /index.html;
        }
        
        # Health check
        location /health {
            access_log off;
            return 200 "healthy\n";
        }
    }
}

# 4. TERRAFORM INFRASTRUCTURE

# main.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# S3 bucket for static hosting
resource "aws_s3_bucket" "frontend_bucket" {
  bucket = var.bucket_name
  
  tags = {
    Name        = "Frontend Static Files"
    Environment = var.environment
  }
}

resource "aws_s3_bucket_public_access_block" "frontend_bucket_pab" {
  bucket = aws_s3_bucket.frontend_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_website_configuration" "frontend_bucket_website" {
  bucket = aws_s3_bucket.frontend_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

# CloudFront distribution
resource "aws_cloudfront_distribution" "frontend_distribution" {
  origin {
    domain_name = aws_s3_bucket.frontend_bucket.bucket_regional_domain_name
    origin_id   = "S3-${aws_s3_bucket.frontend_bucket.id}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.oai.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-${aws_s3_bucket.frontend_bucket.id}"
    compress               = true
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    min_ttl     = 0
    default_ttl = 3600
    max_ttl     = 86400
  }

  # Cache behavior for static assets
  ordered_cache_behavior {
    path_pattern           = "/assets/*"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-${aws_s3_bucket.frontend_bucket.id}"
    compress               = true
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    min_ttl     = 31536000
    default_ttl = 31536000
    max_ttl     = 31536000
  }

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = {
    Name        = "Frontend Distribution"
    Environment = var.environment
  }
}

# 5. KUBERNETES DEPLOYMENT

# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend-app
  labels:
    app: frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: your-registry/frontend:latest
        ports:
        - containerPort: 80
        env:
        - name: NODE_ENV
          value: "production"
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /health
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  selector:
    app: frontend
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: ClusterIP

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: frontend-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  tls:
  - hosts:
    - your-domain.com
    secretName: frontend-tls
  rules:
  - host: your-domain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 80

# 6. MONITORING AND OBSERVABILITY

# src/utils/monitoring.ts
import * as Sentry from '@sentry/react';

// Error monitoring setup
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  integrations: [
    new Sentry.BrowserTracing(),
  ],
});

// Performance monitoring
export const trackPageView = (pageName: string) => {
  // Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: pageName,
      page_location: window.location.href,
    });
  }
  
  // Custom analytics
  fetch('/api/analytics/pageview', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      page: pageName,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    }),
  }).catch(error => {
    console.warn('Analytics tracking failed:', error);
  });
};

// User interaction tracking
export const trackEvent = (eventName: string, properties: Record<string, any>) => {
  // Mixpanel, Amplitude, etc.
  if (typeof mixpanel !== 'undefined') {
    mixpanel.track(eventName, properties);
  }
  
  // Custom event tracking
  fetch('/api/analytics/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: eventName,
      properties,
      timestamp: new Date().toISOString(),
    }),
  }).catch(error => {
    console.warn('Event tracking failed:', error);
  });
};

// Error boundary with monitoring
export class MonitoredErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });
  }

  render() {
    // Error UI
  }
}
```
*Notice: Modern deployment emphasizes automation, monitoring, and quick rollback capabilities. Infrastructure as Code ensures consistent environments.*

</div>

### Build Tools and Bundlers {#build-tools}
<!-- tags: webpack, vite, build, optimization, bundling -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Build tools transform and bundle frontend code for production. **Webpack** is a module bundler with extensive plugin ecosystem, **Vite** provides fast development with ES modules and instant HMR, **Rollup** specializes in library bundling, **esbuild** offers ultra-fast JavaScript bundling. Features include **Code splitting** (lazy loading), **Tree shaking** (dead code elimination), **Asset optimization** (images, fonts), **Development server** with hot reload, and **Production optimization** (minification, compression).*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Performance**: bundling and minification reduce load times
- **Developer experience**: hot reload and fast builds improve productivity
- **Code organization**: module system enables scalable architecture
- **Optimization**: tree shaking and code splitting reduce bundle size

</div>

<div class="runnable-model" data-filter="build tools">

**Runnable mental model**
```javascript
// 1. VITE CONFIGURATION - Modern Build Tool

// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      // Enable React Fast Refresh
      fastRefresh: true,
      // Babel configuration for styled-components
      babel: {
        plugins: ['babel-plugin-styled-components'],
      },
    }),
  ],
  
  // Development server configuration
  server: {
    port: 3000,
    open: true,
    host: true, // Allow external connections
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  
  // Build optimization
  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    
    // Code splitting configuration
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html'),
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@mui/material', '@emotion/react'],
          utils: ['lodash', 'date-fns', 'axios'],
        },
      },
    },
    
    // Asset optimization
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
      },
    },
  },
  
  // Path aliases
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@assets': resolve(__dirname, 'src/assets'),
    },
  },
  
  // Environment variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  
  // CSS preprocessing
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
    modules: {
      localsConvention: 'camelCase',
    },
  },
});

// 2. WEBPACK CONFIGURATION - Advanced Setup

// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  
  entry: {
    main: './src/index.tsx',
    vendor: ['react', 'react-dom'],
  },
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction 
      ? '[name].[contenthash].js' 
      : '[name].js',
    chunkFilename: '[name].[contenthash].chunk.js',
    publicPath: '/',
    clean: true, // Clean dist folder before build
  },
  
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
  
  module: {
    rules: [
      // TypeScript/JavaScript
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-runtime',
            ],
          },
        },
      },
      
      // CSS/SCSS
      {
        test: /\.(css|scss)$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: (resourcePath) => resourcePath.includes('.module.'),
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
      
      // Assets
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
          },
        },
        generator: {
          filename: 'images/[name].[hash][ext]',
        },
      },
      
      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash][ext]',
        },
      },
    ],
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: true,
      minify: isProduction,
    }),
    
    ...(isProduction ? [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[name].[contenthash].chunk.css',
      }),
      
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/,
        threshold: 8192,
        minRatio: 0.8,
      }),
      
      ...(process.env.ANALYZE ? [new BundleAnalyzerPlugin()] : []),
    ] : []),
  ],
  
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          priority: 5,
          chunks: 'all',
          enforce: true,
        },
      },
    },
    
    runtimeChunk: {
      name: 'runtime',
    },
    
    ...(isProduction && {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
        new CssMinimizerPlugin(),
      ],
    }),
  },
  
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
  
  devtool: isProduction ? 'source-map' : 'eval-source-map',
};

// 3. PACKAGE.JSON SCRIPTS - Build Automation

// package.json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "build:analyze": "ANALYZE=true npm run build",
    "build:prod": "NODE_ENV=production npm run build",
    "preview": "vite preview",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "e2e": "cypress run",
    "e2e:open": "cypress open",
    "lint": "eslint src --ext .ts,.tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write src/**/*.{ts,tsx,css,md}",
    "prepare": "husky install"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}

// 4. TYPESCRIPT BUILD CONFIGURATION

// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "ESNext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"],
      "@hooks/*": ["src/hooks/*"],
      "@types/*": ["src/types/*"]
    },
    "types": ["vite/client", "jest", "@testing-library/jest-dom"]
  },
  "include": [
    "src",
    "vite-env.d.ts"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "build"
  ]
}

// 5. ENVIRONMENT CONFIGURATION

// .env files for different environments
// .env.local (highest priority, ignored by git)
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_DEBUG=true

// .env.development
REACT_APP_API_URL=https://dev-api.example.com
REACT_APP_ANALYTICS_ID=dev-analytics-id

// .env.production
REACT_APP_API_URL=https://api.example.com
REACT_APP_ANALYTICS_ID=prod-analytics-id

// Environment type definitions
// vite-env.d.ts
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_ANALYTICS_ID: string;
  readonly VITE_APP_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// 6. CODE SPLITTING AND LAZY LOADING

// Dynamic imports for code splitting
const LazyDashboard = React.lazy(() => import('./pages/Dashboard'));
const LazySettings = React.lazy(() => 
  import('./pages/Settings').then(module => ({
    default: module.Settings
  }))
);

// Route-based code splitting
const AppRouter: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<LazyDashboard />} />
          <Route path="/settings" element={<LazySettings />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

// Component-level code splitting
const HeavyChart = React.lazy(() => import('./HeavyChart'));

const Dashboard: React.FC = () => {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <h1>Dashboard</h1>
      
      {showChart && (
        <Suspense fallback={<div>Loading chart...</div>}>
          <HeavyChart />
        </Suspense>
      )}
      
      <button onClick={() => setShowChart(true)}>
        Load Chart
      </button>
    </div>
  );
};

// 7. PERFORMANCE MONITORING AND OPTIMIZATION

// Bundle analysis script
// scripts/analyze-bundle.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: true,
      reportFilename: 'bundle-report.html',
    }),
  ],
};

// Performance budget configuration
// webpack.config.js performance section
module.exports = {
  performance: {
    hints: 'error',
    maxEntrypointSize: 250000, // 250kb
    maxAssetSize: 250000,
    assetFilter: (assetFilename) => {
      return assetFilename.endsWith('.js') || assetFilename.endsWith('.css');
    },
  },
};

// Lighthouse CI configuration
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.8 }],
      },
    },
    upload: {
      target: 'lhci',
      serverBaseUrl: 'https://lhci.example.com',
    },
  },
};
```
*Notice: Modern build tools focus on developer experience with fast builds and hot reload while ensuring production optimization.*

</div>

### Accessibility (a11y) {#accessibility}
<!-- tags: accessibility, a11y, wcag, screen-readers, inclusive-design -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Web accessibility ensures applications are usable by people with disabilities. **WCAG 2.1** (Web Content Accessibility Guidelines) defines standards: **Perceivable** (alt text, captions), **Operable** (keyboard navigation), **Understandable** (clear language), **Robust** (compatible with assistive technologies). **ARIA** (Accessible Rich Internet Applications) provides semantic information for screen readers. **Testing tools**: axe-core, Lighthouse, screen reader testing.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Legal compliance**: ADA, Section 508, and WCAG requirements
- **Inclusive design**: serves users with visual, motor, cognitive, and hearing impairments
- **Better UX**: accessibility improvements benefit all users
- **SEO benefits**: semantic HTML and structure improve search rankings

</div>

<div class="runnable-model" data-filter="accessibility">

**Runnable mental model**
```tsx
import React, { useRef, useEffect, useState } from 'react';

// 1. SEMANTIC HTML AND ARIA

const AccessibleForm: React.FC = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Focus management
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const validateForm = (formData: FormData) => {
    const newErrors: Record<string, string> = {};
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    
    if (!name || name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }
    
    if (!email || !email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const newErrors = validateForm(formData);
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Form is valid
      console.log('Form submitted successfully');
    } else {
      // Focus first error field
      const firstErrorField = Object.keys(newErrors)[0];
      const errorElement = document.getElementById(firstErrorField);
      errorElement?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Form title with proper heading hierarchy */}
      <h1>Contact Information</h1>
      
      {/* Name field with proper labeling and error handling */}
      <div className="form-group">
        <label htmlFor="name" className="required">
          Full Name
        </label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          name="name"
          required
          aria-describedby={errors.name ? "name-error" : "name-help"}
          aria-invalid={!!errors.name}
          className={errors.name ? 'error' : ''}
        />
        
        {/* Help text */}
        <div id="name-help" className="help-text">
          Enter your first and last name
        </div>
        
        {/* Error message */}
        {errors.name && (
          <div 
            id="name-error" 
            className="error-message"
            role="alert"
            aria-live="polite"
          >
            {errors.name}
          </div>
        )}
      </div>

      {/* Email field */}
      <div className="form-group">
        <label htmlFor="email" className="required">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          aria-describedby={errors.email ? "email-error" : "email-help"}
          aria-invalid={!!errors.email}
          className={errors.email ? 'error' : ''}
        />
        
        <div id="email-help" className="help-text">
          We'll use this to send you updates
        </div>
        
        {errors.email && (
          <div 
            id="email-error" 
            className="error-message"
            role="alert"
            aria-live="polite"
          >
            {errors.email}
          </div>
        )}
      </div>

      {/* Submit button */}
      <button 
        type="submit"
        className="submit-button"
        aria-describedby="submit-help"
      >
        Submit Form
      </button>
      
      <div id="submit-help" className="help-text">
        Press Enter or click to submit the form
      </div>
    </form>
  );
};

// 2. ACCESSIBLE NAVIGATION

const AccessibleNavigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isMenuOpen) return;

      switch (e.key) {
        case 'Escape':
          setIsMenuOpen(false);
          menuButtonRef.current?.focus();
          break;
          
        case 'ArrowDown':
          e.preventDefault();
          // Focus next menu item
          break;
          
        case 'ArrowUp':
          e.preventDefault();
          // Focus previous menu item
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  return (
    <nav role="navigation" aria-label="Main navigation">
      {/* Skip link for keyboard users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      {/* Mobile menu button */}
      <button
        ref={menuButtonRef}
        type="button"
        className="menu-toggle"
        aria-expanded={isMenuOpen}
        aria-controls="main-menu"
        aria-label="Toggle navigation menu"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <span className="sr-only">
          {isMenuOpen ? 'Close' : 'Open'} navigation menu
        </span>
      </button>

      {/* Navigation menu */}
      <ul
        ref={menuRef}
        id="main-menu"
        className={`navigation-menu ${isMenuOpen ? 'open' : ''}`}
        role="menubar"
        aria-hidden={!isMenuOpen}
      >
        <li role="none">
          <a 
            href="/" 
            role="menuitem"
            aria-current="page"
            className="nav-link active"
          >
            Home
          </a>
        </li>
        
        <li role="none">
          <a 
            href="/products" 
            role="menuitem"
            className="nav-link"
          >
            Products
          </a>
        </li>
        
        {/* Dropdown menu */}
        <li role="none" className="dropdown">
          <button
            type="button"
            role="menuitem"
            aria-expanded="false"
            aria-haspopup="true"
            className="nav-link dropdown-toggle"
          >
            Services
          </button>
          
          <ul role="menu" className="dropdown-menu">
            <li role="none">
              <a href="/services/web-design" role="menuitem">
                Web Design
              </a>
            </li>
            <li role="none">
              <a href="/services/development" role="menuitem">
                Development
              </a>
            </li>
          </ul>
        </li>
        
        <li role="none">
          <a 
            href="/contact" 
            role="menuitem"
            className="nav-link"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

// 3. ACCESSIBLE MODAL DIALOG

const AccessibleModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Store previously focused element
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Focus close button
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 0);
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore focus
      previousActiveElement.current?.focus();
      
      // Restore body scroll
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
          
        case 'Tab':
          // Trap focus within modal
          const modal = modalRef.current;
          if (!modal) return;
          
          const focusableElements = modal.querySelectorAll(
            'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
          );
          
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
          
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div ref={modalRef} className="modal-content">
        {/* Modal header */}
        <div className="modal-header">
          <h2 id="modal-title">{title}</h2>
          
          <button
            ref={closeButtonRef}
            type="button"
            className="modal-close"
            aria-label="Close dialog"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        
        {/* Modal body */}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

// 4. ACCESSIBLE DATA TABLE

interface TableData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const AccessibleDataTable: React.FC<{ data: TableData[] }> = ({ data }) => {
  const [sortColumn, setSortColumn] = useState<keyof TableData>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: keyof TableData) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="table-container">
      <h2 id="table-title">User Management</h2>
      
      <table 
        role="table" 
        aria-labelledby="table-title"
        aria-describedby="table-description"
      >
        <caption id="table-description" className="sr-only">
          A table showing user information with sortable columns. 
          Use the column headers to sort data.
        </caption>
        
        <thead>
          <tr role="row">
            <th 
              role="columnheader"
              tabIndex={0}
              aria-sort={sortColumn === 'name' ? sortDirection : 'none'}
              onClick={() => handleSort('name')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSort('name');
                }
              }}
              className="sortable"
            >
              Name
              <span className="sort-indicator" aria-hidden="true">
                {sortColumn === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
              </span>
            </th>
            
            <th 
              role="columnheader"
              tabIndex={0}
              aria-sort={sortColumn === 'email' ? sortDirection : 'none'}
              onClick={() => handleSort('email')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSort('email');
                }
              }}
              className="sortable"
            >
              Email
              <span className="sort-indicator" aria-hidden="true">
                {sortColumn === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
              </span>
            </th>
            
            <th role="columnheader">Role</th>
            <th role="columnheader">Status</th>
            <th role="columnheader">Actions</th>
          </tr>
        </thead>
        
        <tbody>
          {sortedData.map((user) => (
            <tr key={user.id} role="row">
              <td role="gridcell">
                <strong>{user.name}</strong>
              </td>
              
              <td role="gridcell">
                <a href={`mailto:${user.email}`} aria-label={`Send email to ${user.name}`}>
                  {user.email}
                </a>
              </td>
              
              <td role="gridcell">{user.role}</td>
              
              <td role="gridcell">
                <span 
                  className={`status ${user.status}`}
                  aria-label={`Status: ${user.status}`}
                >
                  {user.status}
                </span>
              </td>
              
              <td role="gridcell">
                <button 
                  type="button"
                  aria-label={`Edit ${user.name}`}
                  className="action-button"
                >
                  Edit
                </button>
                
                <button 
                  type="button"
                  aria-label={`Delete ${user.name}`}
                  className="action-button danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// 5. ACCESSIBLE LOADING STATES

const AccessibleLoadingStates: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const simulateLoading = () => {
    setIsLoading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div>
      <button onClick={simulateLoading} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Start Process'}
      </button>
      
      {isLoading && (
        <div className="loading-container">
          {/* Screen reader announcement */}
          <div 
            aria-live="polite" 
            aria-atomic="true"
            className="sr-only"
          >
            Loading in progress, {progress}% complete
          </div>
          
          {/* Visual progress bar */}
          <div className="progress-container">
            <label htmlFor="progress-bar">Loading progress:</label>
            <progress 
              id="progress-bar"
              value={progress} 
              max="100"
              aria-describedby="progress-text"
            >
              {progress}%
            </progress>
            
            <div id="progress-text" aria-live="polite">
              {progress}% complete
            </div>
          </div>
          
          {/* Loading spinner */}
          <div 
            className="spinner"
            role="status"
            aria-label="Loading content"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

// 6. SCREEN READER UTILITIES

// Screen reader only content
const ScreenReaderOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="sr-only">{children}</span>
);

// Announcement for dynamic content changes
const useAnnouncement = () => {
  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  return { announce };
};

// Usage example
const SearchResults: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const { announce } = useAnnouncement();

  const performSearch = async (query: string) => {
    const searchResults = await fetch(`/api/search?q=${query}`).then(r => r.json());
    setResults(searchResults);
    
    // Announce results to screen readers
    announce(`Search complete. Found ${searchResults.length} results for "${query}"`);
  };

  return (
    <div>
      {/* Search implementation */}
      <div aria-live="polite" aria-atomic="true">
        {results.length > 0 && `Showing ${results.length} results`}
      </div>
    </div>
  );
};
```
*Notice: Accessibility is not an afterthought but should be built into the development process from the beginning. Test with actual assistive technologies.*

</div>

### Advanced React Patterns {#advanced-patterns}
<!-- tags: react, patterns, architecture, composition, render-props -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Advanced React patterns solve complex UI composition and logic sharing problems. **Compound Components** create flexible APIs with multiple related components, **Render Props** share logic through function props, **Higher-Order Components (HOCs)** wrap components with additional functionality, **Custom Hooks** extract reusable stateful logic, **Context + Reducer** manage complex state, and **Portals** render outside component tree. These patterns enable scalable, maintainable, and reusable component architectures.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Code reusability**: patterns enable sharing logic across components
- **Flexibility**: compound components provide flexible APIs
- **Separation of concerns**: patterns separate logic from presentation
- **Maintainability**: well-structured patterns improve code organization

</div>

<div class="runnable-model" data-filter="react patterns">

**Runnable mental model**
```tsx
import React, { 
  createContext, 
  useContext, 
  useState, 
  useReducer, 
  useCallback, 
  cloneElement,
  createPortal
} from 'react';

// 1. COMPOUND COMPONENTS PATTERN

// Toggle compound component
interface ToggleContextType {
  on: boolean;
  toggle: () => void;
}

const ToggleContext = createContext<ToggleContextType | undefined>(undefined);

const useToggle = () => {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error('Toggle compound components must be used within Toggle');
  }
  return context;
};

// Main Toggle component
const Toggle: React.FC<{ children: React.ReactNode; defaultOn?: boolean }> & {
  On: typeof ToggleOn;
  Off: typeof ToggleOff;
  Button: typeof ToggleButton;
  Switch: typeof ToggleSwitch;
} = ({ children, defaultOn = false }) => {
  const [on, setOn] = useState(defaultOn);
  
  const toggle = useCallback(() => {
    setOn(current => !current);
  }, []);

  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
};

// Toggle sub-components
const ToggleOn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { on } = useToggle();
  return on ? <>{children}</> : null;
};

const ToggleOff: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { on } = useToggle();
  return on ? null : <>{children}</>;
};

const ToggleButton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toggle } = useToggle();
  return (
    <button onClick={toggle}>
      {children}
    </button>
  );
};

const ToggleSwitch: React.FC = () => {
  const { on, toggle } = useToggle();
  return (
    <div 
      className={`toggle-switch ${on ? 'on' : 'off'}`}
      onClick={toggle}
    >
      <div className="toggle-slider" />
    </div>
  );
};

// Attach sub-components
Toggle.On = ToggleOn;
Toggle.Off = ToggleOff;
Toggle.Button = ToggleButton;
Toggle.Switch = ToggleSwitch;

// Usage of compound components
const App: React.FC = () => {
  return (
    <div>
      <Toggle defaultOn={false}>
        <Toggle.Switch />
        
        <Toggle.On>
          <div className="success-message">Feature is enabled!</div>
        </Toggle.On>
        
        <Toggle.Off>
          <div className="info-message">Feature is disabled</div>
        </Toggle.Off>
        
        <Toggle.Button>
          Toggle Feature
        </Toggle.Button>
      </Toggle>
    </div>
  );
};

// 2. RENDER PROPS PATTERN

// Mouse tracker with render props
interface MousePosition {
  x: number;
  y: number;
}

const MouseTracker: React.FC<{
  children: (mouse: MousePosition) => React.ReactNode;
}> = ({ children }) => {
  const [mouse, setMouse] = useState<MousePosition>({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMouse({ x: e.clientX, y: e.clientY });
  }, []);

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return <>{children(mouse)}</>;
};

// Data fetcher with render props
interface DataFetcherProps<T> {
  url: string;
  children: (state: {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
  }) => React.ReactNode;
}

const DataFetcher = <T,>({ url, children }: DataFetcherProps<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [url]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <>{children({ data, loading, error, refetch: fetchData })}</>;
};

// Usage of render props
const RenderPropsExample: React.FC = () => {
  return (
    <div>
      {/* Mouse tracker usage */}
      <MouseTracker>
        {({ x, y }) => (
          <div>
            Mouse position: {x}, {y}
            <div 
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: 20,
                height: 20,
                backgroundColor: 'red',
                borderRadius: '50%',
                pointerEvents: 'none'
              }}
            />
          </div>
        )}
      </MouseTracker>

      {/* Data fetcher usage */}
      <DataFetcher<User[]> url="/api/users">
        {({ data, loading, error, refetch }) => {
          if (loading) return <div>Loading users...</div>;
          if (error) return <div>Error: {error}</div>;
          
          return (
            <div>
              <button onClick={refetch}>Refresh</button>
              <ul>
                {data?.map(user => (
                  <li key={user.id}>{user.name}</li>
                ))}
              </ul>
            </div>
          );
        }}
      </DataFetcher>
    </div>
  );
};

// 3. HIGHER-ORDER COMPONENTS (HOCs)

// withLoading HOC
const withLoading = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return React.forwardRef<any, P & { loading?: boolean }>((props, ref) => {
    const { loading, ...restProps } = props;
    
    if (loading) {
      return (
        <div className="loading-container">
          <div className="spinner" />
          <p>Loading...</p>
        </div>
      );
    }
    
    return <WrappedComponent {...(restProps as P)} ref={ref} />;
  });
};

// withAuth HOC
const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => {
    const { user, loading } = useAuth(); // Custom hook
    
    if (loading) {
      return <div>Checking authentication...</div>;
    }
    
    if (!user) {
      return <div>Please log in to access this content.</div>;
    }
    
    return <WrappedComponent {...props} />;
  };
};

// withErrorBoundary HOC
const withErrorBoundary = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return class extends React.Component<P, { hasError: boolean }> {
    constructor(props: P) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
      return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      console.error('Error caught by HOC:', error, errorInfo);
      // Log to error tracking service
    }

    render() {
      if (this.state.hasError) {
        return (
          <div className="error-fallback">
            <h2>Something went wrong.</h2>
            <button onClick={() => this.setState({ hasError: false })}>
              Try again
            </button>
          </div>
        );
      }

      return <WrappedComponent {...this.props} />;
    }
  };
};

// Usage of HOCs
const UserProfile: React.FC<{ userId: string }> = ({ userId }) => {
  return <div>User Profile for {userId}</div>;
};

const EnhancedUserProfile = withAuth(withLoading(withErrorBoundary(UserProfile)));

// 4. CUSTOM HOOKS PATTERN (Advanced)

// useUndoRedo hook
const useUndoRedo = <T>(initialState: T) => {
  const [states, setStates] = useState<T[]>([initialState]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const setState = useCallback((newState: T | ((prev: T) => T)) => {
    setStates(currentStates => {
      const newStateValue = typeof newState === 'function' 
        ? (newState as (prev: T) => T)(currentStates[currentIndex])
        : newState;
      
      // Remove any future states and add new state
      const newStates = [...currentStates.slice(0, currentIndex + 1), newStateValue];
      return newStates;
    });
    
    setCurrentIndex(current => current + 1);
  }, [currentIndex]);

  const undo = useCallback(() => {
    setCurrentIndex(current => Math.max(0, current - 1));
  }, []);

  const redo = useCallback(() => {
    setCurrentIndex(current => Math.min(states.length - 1, current + 1));
  }, [states.length]);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < states.length - 1;
  const currentState = states[currentIndex];

  return {
    state: currentState,
    setState,
    undo,
    redo,
    canUndo,
    canRedo,
    history: states,
  };
};

// useIntersectionObserver hook
const useIntersectionObserver = (
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const elementRef = useRef<HTMLElement>(null);

  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      setEntry(entry);
    }, options);

    observer.observe(element);

    return () => observer.disconnect();
  }, [options]);

  return { ref: elementRef, isIntersecting, entry };
};

// usePrevious hook
const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  
  React.useEffect(() => {
    ref.current = value;
  });
  
  return ref.current;
};

// Advanced hooks usage
const DrawingCanvas: React.FC = () => {
  const { state: drawing, setState: setDrawing, undo, redo, canUndo, canRedo } = 
    useUndoRedo<string[]>([]);

  const addLine = (line: string) => {
    setDrawing(current => [...current, line]);
  };

  return (
    <div>
      <div className="drawing-controls">
        <button onClick={undo} disabled={!canUndo}>
          Undo
        </button>
        <button onClick={redo} disabled={!canRedo}>
          Redo
        </button>
      </div>
      
      <canvas
        onMouseDown={(e) => {
          // Start drawing logic
          addLine(`Line from ${e.clientX}, ${e.clientY}`);
        }}
      >
        {/* Canvas content */}
      </canvas>
      
      <div>Lines: {drawing.length}</div>
    </div>
  );
};

// 5. PORTALS PATTERN

const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ isOpen, onClose, children }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

// Tooltip with portal
const Tooltip: React.FC<{
  content: string;
  children: React.ReactNode;
}> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  const showTooltip = (e: React.MouseEvent) => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) {
      setPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 8,
      });
    }
    setIsVisible(true);
  };

  const hideTooltip = () => {
    setIsVisible(false);
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        style={{ display: 'inline-block' }}
      >
        {children}
      </div>
      
      {isVisible && createPortal(
        <div
          className="tooltip"
          style={{
            position: 'fixed',
            left: position.x,
            top: position.y,
            transform: 'translate(-50%, -100%)',
            zIndex: 9999,
          }}
        >
          {content}
        </div>,
        document.body
      )}
    </>
  );
};

// 6. STATE REDUCER PATTERN

// Complex form state with reducer
interface FormState {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

type FormAction =
  | { type: 'SET_FIELD_VALUE'; field: string; value: any }
  | { type: 'SET_FIELD_ERROR'; field: string; error: string }
  | { type: 'SET_FIELD_TOUCHED'; field: string }
  | { type: 'SET_SUBMITTING'; isSubmitting: boolean }
  | { type: 'RESET_FORM'; initialValues: Record<string, any> }
  | { type: 'VALIDATE_FORM'; validationRules: Record<string, Function> };

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_FIELD_VALUE':
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value,
        },
      };
      
    case 'SET_FIELD_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error,
        },
        isValid: Object.keys({ ...state.errors, [action.field]: action.error })
          .filter(key => ({ ...state.errors, [action.field]: action.error })[key])
          .length === 0,
      };
      
    case 'SET_FIELD_TOUCHED':
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.field]: true,
        },
      };
      
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.isSubmitting,
      };
      
    case 'RESET_FORM':
      return {
        values: action.initialValues,
        errors: {},
        touched: {},
        isSubmitting: false,
        isValid: true,
      };
      
    case 'VALIDATE_FORM':
      const newErrors: Record<string, string> = {};
      
      Object.keys(action.validationRules).forEach(field => {
        const value = state.values[field];
        const error = action.validationRules[field](value);
        if (error) {
          newErrors[field] = error;
        }
      });
      
      return {
        ...state,
        errors: newErrors,
        isValid: Object.keys(newErrors).length === 0,
      };
      
    default:
      return state;
  }
};

// Advanced form hook using reducer
const useAdvancedForm = (initialValues: Record<string, any>) => {
  const [state, dispatch] = useReducer(formReducer, {
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: true,
  });

  const setFieldValue = useCallback((field: string, value: any) => {
    dispatch({ type: 'SET_FIELD_VALUE', field, value });
  }, []);

  const setFieldError = useCallback((field: string, error: string) => {
    dispatch({ type: 'SET_FIELD_ERROR', field, error });
  }, []);

  const setFieldTouched = useCallback((field: string) => {
    dispatch({ type: 'SET_FIELD_TOUCHED', field });
  }, []);

  const validateForm = useCallback((validationRules: Record<string, Function>) => {
    dispatch({ type: 'VALIDATE_FORM', validationRules });
  }, []);

  const resetForm = useCallback(() => {
    dispatch({ type: 'RESET_FORM', initialValues });
  }, [initialValues]);

  return {
    ...state,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    validateForm,
    resetForm,
  };
};
```
*Notice: Advanced patterns should be used judiciously - they add complexity but solve specific problems. Choose the simplest pattern that meets your needs.*

</div>

### Progressive Web Apps (PWA) {#progressive-web-apps}
<!-- tags: pwa, service-workers, offline, manifest, web-app -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Progressive Web Apps combine web and native app features for enhanced user experience. **Service Workers** enable offline functionality and background sync, **Web App Manifest** provides app-like installation, **Push Notifications** engage users, **App Shell Architecture** ensures fast loading, **Background Sync** handles offline actions, and **Web APIs** access device features. PWAs are installable, reliable, and engaging while remaining discoverable through web standards.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Offline functionality**: apps work without internet connection
- **Native-like experience**: installation, full-screen mode, native navigation
- **Performance**: app shell architecture ensures fast loading
- **Engagement**: push notifications and background sync improve user retention

</div>

<div class="runnable-model" data-filter="pwa">

**Runnable mental model**
```javascript
// 1. WEB APP MANIFEST

// public/manifest.json
{
  "name": "My Progressive Web App",
  "short_name": "MyPWA",
  "description": "A progressive web application built with React",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait",
  "theme_color": "#3b82f6",
  "background_color": "#ffffff",
  "categories": ["productivity", "utilities"],
  "lang": "en",
  "dir": "ltr",
  "scope": "/",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ],
  "shortcuts": [
    {
      "name": "Dashboard",
      "short_name": "Dashboard",
      "description": "Go to dashboard",
      "url": "/dashboard",
      "icons": [{ "src": "/icons/dashboard-icon.png", "sizes": "96x96" }]
    },
    {
      "name": "Create New",
      "short_name": "Create",
      "description": "Create new item",
      "url": "/create",
      "icons": [{ "src": "/icons/create-icon.png", "sizes": "96x96" }]
    }
  ],
  "share_target": {
    "action": "/share",
    "method": "POST",
    "enctype": "multipart/form-data",
    "params": {
      "title": "title",
      "text": "text",
      "url": "url",
      "files": [
        {
          "name": "files",
          "accept": ["image/*", "text/*"]
        }
      ]
    }
  }
}

// 2. SERVICE WORKER IMPLEMENTATION

// public/sw.js
const CACHE_NAME = 'my-pwa-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

const STATIC_ASSETS = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/offline.html'
];

const DYNAMIC_CACHE_LIMIT = 50;

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - cache strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests with network first strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .catch(() => caches.match('/offline.html'))
    );
    return;
  }

  // Handle static assets with cache first strategy
  event.respondWith(cacheFirstStrategy(request));
});

// Cache strategies
async function cacheFirstStrategy(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      
      // Limit cache size
      const keys = await cache.keys();
      if (keys.length >= DYNAMIC_CACHE_LIMIT) {
        await cache.delete(keys[0]);
      }
      
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Cache first strategy failed:', error);
    return new Response('Offline content not available', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful API responses
    if (networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Network first strategy failed, trying cache:', error);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return new Response(JSON.stringify({ 
      error: 'Network unavailable',
      offline: true 
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Get pending actions from IndexedDB
    const pendingActions = await getPendingActions();
    
    for (const action of pendingActions) {
      try {
        await fetch(action.url, {
          method: action.method,
          headers: action.headers,
          body: action.body
        });
        
        // Remove successful action
        await removePendingAction(action.id);
      } catch (error) {
        console.log('Background sync failed for action:', action.id);
      }
    }
  } catch (error) {
    console.log('Background sync error:', error);
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  console.log('Push message received');
  
  const options = {
    body: 'You have a new notification',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: '/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/xmark.png'
      }
    ]
  };

  if (event.data) {
    const payload = event.data.json();
    options.body = payload.body || options.body;
    options.data = { ...options.data, ...payload.data };
  }

  event.waitUntil(
    self.registration.showNotification('PWA Notification', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Notification click received.');

  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/explore')
    );
  } else if (event.action === 'close') {
    // Just close, no action needed
  } else {
    // Default action - open app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// 3. REACT PWA INTEGRATION

// src/utils/pwa.ts
export class PWAManager {
  private static instance: PWAManager;
  
  static getInstance(): PWAManager {
    if (!PWAManager.instance) {
      PWAManager.instance = new PWAManager();
    }
    return PWAManager.instance;
  }

  // Register service worker
  async registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        });
        
        console.log('Service Worker registered successfully:', registration);
        
        // Listen for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker available
                this.notifyUpdate();
              }
            });
          }
        });
        
        return registration;
      } catch (error) {
        console.error('Service Worker registration failed:', error);
        return null;
      }
    }
    return null;
  }

  // Check if app can be installed
  canInstall(): boolean {
    return 'beforeinstallprompt' in window;
  }

  // Handle app installation
  async installApp(): Promise<boolean> {
    const deferredPrompt = (window as any).deferredPrompt;
    
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        return true;
      } else {
        console.log('User dismissed the install prompt');
        return false;
      }
    }
    
    return false;
  }

  // Request push notification permission
  async requestNotificationPermission(): Promise<NotificationPermission> {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      console.log('Notification permission:', permission);
      return permission;
    }
    return 'denied';
  }

  // Subscribe to push notifications
  async subscribeToPush(vapidPublicKey: string): Promise<PushSubscription | null> {
    try {
      const registration = await navigator.serviceWorker.ready;
      
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(vapidPublicKey)
      });
      
      console.log('Push subscription:', subscription);
      return subscription;
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
      return null;
    }
  }

  // Add to background sync queue
  async addToSyncQueue(data: any): Promise<void> {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      try {
        // Store in IndexedDB
        await this.storePendingAction(data);
        
        // Register for background sync
        const registration = await navigator.serviceWorker.ready;
        await registration.sync.register('background-sync');
        
        console.log('Added to background sync queue');
      } catch (error) {
        console.error('Background sync registration failed:', error);
      }
    }
  }

  // Check if app is running as PWA
  isStandalone(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone === true;
  }

  // Check network status
  isOnline(): boolean {
    return navigator.onLine;
  }

  // Private helper methods
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
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

  private notifyUpdate(): void {
    // Notify user about available update
    const event = new CustomEvent('sw-update-available');
    window.dispatchEvent(event);
  }

  private async storePendingAction(data: any): Promise<void> {
    // Implementation would use IndexedDB to store pending actions
    console.log('Storing pending action:', data);
  }
}

// 4. REACT HOOKS FOR PWA

// Custom hook for PWA functionality
export const usePWA = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    const pwa = PWAManager.getInstance();
    
    // Register service worker
    pwa.registerServiceWorker();
    
    // Check if running as PWA
    setIsInstalled(pwa.isStandalone());

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      (window as any).deferredPrompt = e;
      setIsInstallable(true);
    };

    // Listen for app installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
    };

    // Listen for network changes
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Listen for service worker updates
    const handleSWUpdate = () => setUpdateAvailable(true);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('sw-update-available', handleSWUpdate);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('sw-update-available', handleSWUpdate);
    };
  }, []);

  const installApp = async () => {
    const pwa = PWAManager.getInstance();
    const success = await pwa.installApp();
    if (success) {
      setIsInstallable(false);
    }
    return success;
  };

  const enableNotifications = async () => {
    const pwa = PWAManager.getInstance();
    const permission = await pwa.requestNotificationPermission();
    
    if (permission === 'granted') {
      // Subscribe to push notifications
      const subscription = await pwa.subscribeToPush('YOUR_VAPID_PUBLIC_KEY');
      return subscription !== null;
    }
    
    return false;
  };

  const updateApp = () => {
    window.location.reload();
  };

  return {
    isInstallable,
    isInstalled,
    isOnline,
    updateAvailable,
    installApp,
    enableNotifications,
    updateApp,
  };
};

// 5. PWA COMPONENTS

// Install prompt component
const InstallPrompt: React.FC = () => {
  const { isInstallable, installApp } = usePWA();
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (isInstallable) {
      const timer = setTimeout(() => setShowPrompt(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [isInstallable]);

  if (!showPrompt || !isInstallable) return null;

  return (
    <div className="install-prompt">
      <div className="install-prompt-content">
        <h3>Install App</h3>
        <p>Add this app to your home screen for better experience!</p>
        
        <div className="install-prompt-actions">
          <button onClick={installApp} className="install-btn">
            Install
          </button>
          <button 
            onClick={() => setShowPrompt(false)} 
            className="dismiss-btn"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
};

// Offline indicator
const OfflineIndicator: React.FC = () => {
  const { isOnline } = usePWA();

  if (isOnline) return null;

  return (
    <div className="offline-indicator">
      <span className="offline-icon">⚠️</span>
      <span>You're offline. Some features may not be available.</span>
    </div>
  );
};

// Update available banner
const UpdateBanner: React.FC = () => {
  const { updateAvailable, updateApp } = usePWA();

  if (!updateAvailable) return null;

  return (
    <div className="update-banner">
      <span>A new version is available!</span>
      <button onClick={updateApp} className="update-btn">
        Update
      </button>
    </div>
  );
};

// 6. OFFLINE STORAGE

// IndexedDB wrapper for offline storage
class OfflineStorage {
  private dbName = 'PWAStorage';
  private version = 1;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object stores
        if (!db.objectStoreNames.contains('data')) {
          const dataStore = db.createObjectStore('data', { keyPath: 'id' });
          dataStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        if (!db.objectStoreNames.contains('pendingActions')) {
          db.createObjectStore('pendingActions', { keyPath: 'id', autoIncrement: true });
        }
      };
    });
  }

  async store(storeName: string, data: any): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      
      const request = store.put({
        ...data,
        timestamp: Date.now()
      });

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async get(storeName: string, key: string): Promise<any> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async getAll(storeName: string): Promise<any[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async delete(storeName: string, key: string): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
}

// React hook for offline storage
export const useOfflineStorage = () => {
  const storage = useRef(new OfflineStorage());

  useEffect(() => {
    storage.current.init();
  }, []);

  const storeData = useCallback(async (key: string, data: any) => {
    try {
      await storage.current.store('data', { id: key, ...data });
    } catch (error) {
      console.error('Failed to store data offline:', error);
    }
  }, []);

  const getData = useCallback(async (key: string) => {
    try {
      return await storage.current.get('data', key);
    } catch (error) {
      console.error('Failed to get data from offline storage:', error);
      return null;
    }
  }, []);

  const getAllData = useCallback(async () => {
    try {
      return await storage.current.getAll('data');
    } catch (error) {
      console.error('Failed to get all data from offline storage:', error);
      return [];
    }
  }, []);

  return { storeData, getData, getAllData };
};
```
*Notice: PWAs bridge the gap between web and native apps, providing offline functionality and native-like experience while maintaining web standards.*

</div>

### Web Security {#web-security}
<!-- tags: security, xss, csrf, content-security-policy, authentication -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Web security protects applications and users from malicious attacks. **XSS (Cross-Site Scripting)** prevention through input sanitization and CSP, **CSRF (Cross-Site Request Forgery)** protection with tokens, **Content Security Policy** restricts resource loading, **HTTPS** encrypts data transmission, **Authentication** verifies user identity, **Authorization** controls access, and **Input validation** prevents injection attacks. Security is a layered approach requiring multiple defensive measures.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Data protection**: prevents unauthorized access to sensitive information
- **User trust**: secure applications build user confidence
- **Legal compliance**: regulations like GDPR require security measures
- **Business continuity**: security breaches can cause significant damage

</div>

<div class="runnable-model" data-filter="security">

**Runnable mental model**
```tsx
import React, { useState, useEffect, useCallback } from 'react';
import DOMPurify from 'dompurify';

// 1. XSS PREVENTION

// Safe HTML rendering component
const SafeHTML: React.FC<{ html: string; className?: string }> = ({ html, className }) => {
  const sanitizedHTML = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'a'],
    ALLOWED_ATTR: ['href', 'title'],
    ALLOW_DATA_ATTR: false,
  });

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
};

// Input sanitization utility
export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
};

// Secure form component
const SecureForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Input validation patterns
  const validateInput = (name: string, value: string): string | null => {
    switch (name) {
      case 'name':
        if (value.length < 2) return 'Name must be at least 2 characters';
        if (value.length > 50) return 'Name must be less than 50 characters';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Name can only contain letters and spaces';
        return null;
        
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Invalid email format';
        return null;
        
      case 'message':
        if (value.length > 1000) return 'Message must be less than 1000 characters';
        return null;
        
      default:
        return null;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Sanitize input
    const sanitizedValue = sanitizeInput(value);
    
    // Validate input
    const error = validateInput(name, sanitizedValue);
    
    setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
    setErrors(prev => ({ ...prev, [name]: error || '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validation
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      const error = validateInput(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Include CSRF token
      const csrfToken = getCSRFToken();
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="secure-form">
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          maxLength={50}
          pattern="[a-zA-Z\s]+"
          title="Name can only contain letters and spaces"
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          maxLength={100}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          maxLength={1000}
          rows={4}
        />
        {errors.message && <span className="error">{errors.message}</span>}
      </div>

      <button type="submit" className="submit-btn">
        Send Message
      </button>
    </form>
  );
};

// 2. CSRF PROTECTION

// CSRF token management
let csrfToken: string | null = null;

export const getCSRFToken = (): string => {
  if (!csrfToken) {
    // Get token from meta tag or cookie
    const metaToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    const cookieToken = getCookie('XSRF-TOKEN');
    
    csrfToken = metaToken || cookieToken || '';
  }
  
  return csrfToken;
};

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
};

// Axios interceptor for CSRF tokens
import axios from 'axios';

axios.interceptors.request.use((config) => {
  const token = getCSRFToken();
  if (token) {
    config.headers['X-CSRF-Token'] = token;
  }
  return config;
});

// React hook for API calls with CSRF protection
export const useSecureAPI = () => {
  const makeRequest = useCallback(async (
    url: string, 
    options: RequestInit = {}
  ): Promise<Response> => {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'X-CSRF-Token': getCSRFToken(),
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response;
  }, []);

  return { makeRequest };
};

// 3. CONTENT SECURITY POLICY (CSP)

// CSP configuration for Next.js
export const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google-analytics.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: https: blob:;
  font-src 'self' https://fonts.gstatic.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  block-all-mixed-content;
  upgrade-insecure-requests;
`;

// CSP violation reporting
const reportCSPViolation = (violationReport: any) => {
  fetch('/api/csp-violation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(violationReport),
  }).catch(error => {
    console.error('Failed to report CSP violation:', error);
  });
};

// Listen for CSP violations
document.addEventListener('securitypolicyviolation', (e) => {
  reportCSPViolation({
    blockedURI: e.blockedURI,
    documentURI: e.documentURI,
    effectiveDirective: e.effectiveDirective,
    originalPolicy: e.originalPolicy,
    referrer: e.referrer,
    violatedDirective: e.violatedDirective,
    timestamp: Date.now(),
  });
});

// 4. AUTHENTICATION & AUTHORIZATION

// JWT token management
class TokenManager {
  private static instance: TokenManager;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  setTokens(access: string, refresh: string): void {
    this.accessToken = access;
    this.refreshToken = refresh;
    
    // Store in secure httpOnly cookies (server-side)
    // For demo purposes, we'll use sessionStorage (not recommended for production)
    sessionStorage.setItem('accessToken', access);
    sessionStorage.setItem('refreshToken', refresh);
  }

  getAccessToken(): string | null {
    if (!this.accessToken) {
      this.accessToken = sessionStorage.getItem('accessToken');
    }
    return this.accessToken;
  }

  getRefreshToken(): string | null {
    if (!this.refreshToken) {
      this.refreshToken = sessionStorage.getItem('refreshToken');
    }
    return this.refreshToken;
  }

  clearTokens(): void {
    this.accessToken = null;
    this.refreshToken = null;
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
  }

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  async refreshAccessToken(): Promise<string | null> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken || this.isTokenExpired(refreshToken)) {
      this.clearTokens();
      return null;
    }

    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const { accessToken, refreshToken: newRefreshToken } = await response.json();
        this.setTokens(accessToken, newRefreshToken);
        return accessToken;
      } else {
        this.clearTokens();
        return null;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.clearTokens();
      return null;
    }
  }
}

// Authenticated API client
export class AuthenticatedAPIClient {
  private tokenManager = TokenManager.getInstance();

  async request(url: string, options: RequestInit = {}): Promise<Response> {
    let accessToken = this.tokenManager.getAccessToken();

    // Check if token is expired and refresh if needed
    if (accessToken && this.tokenManager.isTokenExpired(accessToken)) {
      accessToken = await this.tokenManager.refreshAccessToken();
    }

    if (!accessToken) {
      throw new Error('No valid access token available');
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    // Handle 401 Unauthorized
    if (response.status === 401) {
      accessToken = await this.tokenManager.refreshAccessToken();
      
      if (accessToken) {
        // Retry request with new token
        return fetch(url, {
          ...options,
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            ...options.headers,
          },
        });
      } else {
        // Redirect to login
        window.location.href = '/login';
        throw new Error('Authentication failed');
      }
    }

    return response;
  }
}

// React hooks for authentication
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const tokenManager = TokenManager.getInstance();
  const apiClient = new AuthenticatedAPIClient();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const accessToken = tokenManager.getAccessToken();
      if (!accessToken) {
        setIsLoading(false);
        return;
      }

      const response = await apiClient.request('/api/auth/me');
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': getCSRFToken(),
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { user, accessToken, refreshToken } = await response.json();
        tokenManager.setTokens(accessToken, refreshToken);
        setUser(user);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = useCallback(async () => {
    try {
      await apiClient.request('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      tokenManager.clearTokens();
      setUser(null);
    }
  }, []);

  const hasPermission = (permission: string): boolean => {
    return user?.permissions?.includes(permission) || false;
  };

  const hasRole = (role: string): boolean => {
    return user?.roles?.includes(role) || false;
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    hasPermission,
    hasRole,
  };
};

// Protected route component
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  requiredPermission?: string;
  requiredRole?: string;
  fallback?: React.ReactNode;
}> = ({ children, requiredPermission, requiredRole, fallback }) => {
  const { user, isLoading, hasPermission, hasRole } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to access this content.</div>;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return fallback || <div>You don't have permission to access this content.</div>;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return fallback || <div>You don't have the required role to access this content.</div>;
  }

  return <>{children}</>;
};

// 5. SECURE STORAGE

// Secure client-side storage utility
export class SecureStorage {
  // Encrypt data before storing (simplified example)
  private encrypt(data: string): string {
    // In production, use a proper encryption library
    return btoa(data);
  }

  // Decrypt data after retrieving
  private decrypt(encryptedData: string): string {
    try {
      return atob(encryptedData);
    } catch {
      return '';
    }
  }

  // Store sensitive data
  setSecure(key: string, value: any): void {
    try {
      const serialized = JSON.stringify(value);
      const encrypted = this.encrypt(serialized);
      sessionStorage.setItem(key, encrypted);
    } catch (error) {
      console.error('Secure storage failed:', error);
    }
  }

  // Retrieve sensitive data
  getSecure(key: string): any {
    try {
      const encrypted = sessionStorage.getItem(key);
      if (!encrypted) return null;
      
      const decrypted = this.decrypt(encrypted);
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Secure retrieval failed:', error);
      return null;
    }
  }

  // Remove sensitive data
  removeSecure(key: string): void {
    sessionStorage.removeItem(key);
  }

  // Clear all sensitive data
  clearSecure(): void {
    sessionStorage.clear();
  }
}

// 6. SECURITY HEADERS MIDDLEWARE (Node.js)

// Security headers for Express.js
export const securityHeaders = (req: any, res: any, next: any) => {
  // Content Security Policy
  res.setHeader('Content-Security-Policy', cspHeader.replace(/\s+/g, ' ').trim());
  
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Enable XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Force HTTPS
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  
  // Prevent information disclosure
  res.setHeader('X-Powered-By', '');
  
  // Referrer policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions policy
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  next();
};

interface User {
  id: string;
  name: string;
  email: string;
  roles?: string[];
  permissions?: string[];
}
```
*Notice: Security is not a single solution but a layered approach. Regularly update dependencies and follow security best practices. Never trust user input.*

</div>

### Modern JavaScript & Browser APIs {#modern-javascript}
<!-- tags: javascript, es6, browser-apis, webapis, async -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Modern JavaScript (ES6+) and Browser APIs provide powerful capabilities for web applications. **ES6+ Features** include arrow functions, destructuring, modules, async/await, classes, and template literals. **Browser APIs** expose device and system functionality: **Fetch API** for HTTP requests, **Web Storage** for local data, **Geolocation** for position, **File API** for file handling, **WebRTC** for real-time communication, **Web Workers** for background processing, and **Intersection Observer** for viewport detection.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Modern syntax**: cleaner, more readable code with ES6+ features
- **Native APIs**: access device capabilities without external libraries
- **Performance**: Web Workers enable background processing without blocking UI
- **User experience**: APIs like Geolocation and File API enhance functionality

</div>

<div class="runnable-model" data-filter="modern javascript">

**Runnable mental model**
```javascript
// 1. MODERN JAVASCRIPT FEATURES (ES6+)

// Destructuring and spread operator
const user = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  profile: {
    avatar: 'avatar.jpg',
    bio: 'Software developer'
  }
};

// Object destructuring
const { name, email, profile: { bio } } = user;
const { avatar, bio: userBio = 'No bio available' } = user.profile;

// Array destructuring
const colors = ['red', 'green', 'blue', 'yellow'];
const [primary, secondary, ...otherColors] = colors;

// Spread operator for objects
const updatedUser = {
  ...user,
  name: 'Jane Doe',
  profile: {
    ...user.profile,
    bio: 'Senior developer'
  }
};

// Spread operator for arrays
const newColors = [...colors, 'purple', 'orange'];
const combinedArrays = [...colors, ...newColors];

// Template literals with expressions
const greeting = `Hello, ${name}! You have ${newColors.length} colors.`;
const multilineTemplate = `
  User: ${name}
  Email: ${email}
  Bio: ${bio}
`;

// Arrow functions and implicit returns
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

// Complex arrow function with destructuring
const processUsers = users => users
  .filter(({ active }) => active)
  .map(({ name, email, ...rest }) => ({
    displayName: name.toUpperCase(),
    contact: email,
    ...rest
  }))
  .sort((a, b) => a.displayName.localeCompare(b.displayName));

// Async/await with error handling
const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
};

// Promise.all for concurrent requests
const fetchMultipleUsers = async (userIds) => {
  try {
    const promises = userIds.map(id => fetchUserData(id));
    const users = await Promise.all(promises);
    return users;
  } catch (error) {
    console.error('Failed to fetch multiple users:', error);
    return [];
  }
};

// Promise.allSettled for handling partial failures
const fetchUsersWithFallback = async (userIds) => {
  const promises = userIds.map(async (id) => {
    try {
      return await fetchUserData(id);
    } catch (error) {
      return { error: error.message, id };
    }
  });
  
  const results = await Promise.allSettled(promises);
  
  return results.map(result => 
    result.status === 'fulfilled' ? result.value : result.reason
  );
};

// Modern class syntax
class UserManager {
  #users = new Map(); // Private field
  
  constructor(initialUsers = []) {
    initialUsers.forEach(user => this.addUser(user));
  }
  
  addUser(user) {
    this.#users.set(user.id, user);
    return this;
  }
  
  getUser(id) {
    return this.#users.get(id);
  }
  
  getAllUsers() {
    return Array.from(this.#users.values());
  }
  
  // Getter
  get userCount() {
    return this.#users.size;
  }
  
  // Static method
  static fromArray(users) {
    return new UserManager(users);
  }
  
  // Iterator protocol
  *[Symbol.iterator]() {
    for (const user of this.#users.values()) {
      yield user;
    }
  }
}

// Modules (ES6 imports/exports)
// utils.js
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export default class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }
  
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener.apply(this, args));
    }
  }
  
  off(event, listenerToRemove) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(
        listener => listener !== listenerToRemove
      );
    }
  }
}

// main.js
import EventEmitter, { debounce, throttle } from './utils.js';

// 2. FETCH API AND HTTP REQUESTS

class APIClient {
  constructor(baseURL = '', defaultHeaders = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        ...this.defaultHeaders,
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      // Handle different response types
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else if (contentType?.includes('text/')) {
        data = await response.text();
      } else {
        data = await response.blob();
      }

      if (!response.ok) {
        throw new APIError(response.status, data.message || response.statusText, data);
      }

      return { data, status: response.status, headers: response.headers };
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError(0, 'Network error', { originalError: error });
    }
  }

  // HTTP method shortcuts
  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }

  // File upload
  async uploadFile(endpoint, file, additionalData = {}) {
    const formData = new FormData();
    formData.append('file', file);
    
    Object.keys(additionalData).forEach(key => {
      formData.append(key, additionalData[key]);
    });

    return this.request(endpoint, {
      method: 'POST',
      body: formData,
      headers: {} // Don't set Content-Type for FormData
    });
  }

  // Download file
  async downloadFile(endpoint, filename) {
    const response = await fetch(`${this.baseURL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`Download failed: ${response.statusText}`);
    }
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}

class APIError extends Error {
  constructor(status, message, details = {}) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.details = details;
  }
}

// 3. WEB STORAGE APIs

class StorageManager {
  // localStorage wrapper with JSON serialization
  static setLocal(key, value, expirationHours = null) {
    const item = {
      value,
      timestamp: Date.now(),
      expiration: expirationHours ? Date.now() + (expirationHours * 60 * 60 * 1000) : null
    };
    
    try {
      localStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.error('localStorage setItem failed:', error);
    }
  }

  static getLocal(key) {
    try {
      const itemStr = localStorage.getItem(key);
      if (!itemStr) return null;

      const item = JSON.parse(itemStr);
      
      // Check expiration
      if (item.expiration && Date.now() > item.expiration) {
        localStorage.removeItem(key);
        return null;
      }
      
      return item.value;
    } catch (error) {
      console.error('localStorage getItem failed:', error);
      return null;
    }
  }

  static removeLocal(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('localStorage removeItem failed:', error);
    }
  }

  // sessionStorage wrapper
  static setSession(key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('sessionStorage setItem failed:', error);
    }
  }

  static getSession(key) {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('sessionStorage getItem failed:', error);
      return null;
    }
  }

  // Storage event listener
  static onStorageChange(callback) {
    const handleStorageChange = (e) => {
      callback({
        key: e.key,
        oldValue: e.oldValue ? JSON.parse(e.oldValue) : null,
        newValue: e.newValue ? JSON.parse(e.newValue) : null,
        url: e.url
      });
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }
}

// 4. GEOLOCATION API

class GeolocationService {
  static async getCurrentPosition(options = {}) {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      const defaultOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000 // 10 minutes
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude,
            heading: position.coords.heading,
            speed: position.coords.speed,
            timestamp: position.timestamp
          });
        },
        (error) => {
          let message = 'Unknown error';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              message = 'User denied geolocation permission';
              break;
            case error.POSITION_UNAVAILABLE:
              message = 'Position information unavailable';
              break;
            case error.TIMEOUT:
              message = 'Location request timed out';
              break;
          }
          reject(new Error(message));
        },
        { ...defaultOptions, ...options }
      );
    });
  }

  static watchPosition(callback, errorCallback, options = {}) {
    if (!navigator.geolocation) {
      errorCallback(new Error('Geolocation is not supported'));
      return null;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => callback({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp
      }),
      errorCallback,
      options
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }

  static async calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  }

  static toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
}

// 5. FILE API

class FileHandler {
  static async readFileAsText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(new Error('File reading failed'));
      
      reader.readAsText(file);
    });
  }

  static async readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(new Error('File reading failed'));
      
      reader.readAsDataURL(file);
    });
  }

  static async readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(new Error('File reading failed'));
      
      reader.readAsArrayBuffer(file);
    });
  }

  // File validation
  static validateFile(file, options = {}) {
    const {
      maxSize = 10 * 1024 * 1024, // 10MB
      allowedTypes = [],
      allowedExtensions = []
    } = options;

    const errors = [];

    // Check file size
    if (file.size > maxSize) {
      errors.push(`File size exceeds ${maxSize / (1024 * 1024)}MB limit`);
    }

    // Check file type
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      errors.push(`File type ${file.type} is not allowed`);
    }

    // Check file extension
    if (allowedExtensions.length > 0) {
      const extension = file.name.split('.').pop().toLowerCase();
      if (!allowedExtensions.includes(extension)) {
        errors.push(`File extension .${extension} is not allowed`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Image processing
  static async resizeImage(file, maxWidth, maxHeight, quality = 0.8) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(resolve, 'image/jpeg', quality);
      };

      img.src = URL.createObjectURL(file);
    });
  }
}

// 6. WEB WORKERS

// worker.js (separate file)
const workerCode = `
  // Heavy computation in worker
  self.onmessage = function(e) {
    const { type, data } = e.data;
    
    switch (type) {
      case 'HEAVY_CALCULATION':
        const result = performHeavyCalculation(data);
        self.postMessage({ type: 'CALCULATION_RESULT', result });
        break;
        
      case 'PROCESS_ARRAY':
        const processed = data.map(item => processItem(item));
        self.postMessage({ type: 'ARRAY_PROCESSED', result: processed });
        break;
    }
  };
  
  function performHeavyCalculation(data) {
    // Simulate heavy computation
    let result = 0;
    for (let i = 0; i < data.iterations; i++) {
      result += Math.random() * data.multiplier;
    }
    return result;
  }
  
  function processItem(item) {
    // Process individual item
    return {
      ...item,
      processed: true,
      timestamp: Date.now()
    };
  }
`;

class WorkerManager {
  constructor() {
    this.workers = new Map();
  }

  createWorker(name, workerScript = workerCode) {
    const blob = new Blob([workerScript], { type: 'application/javascript' });
    const worker = new Worker(URL.createObjectURL(blob));
    
    const workerWrapper = {
      worker,
      postMessage: (data) => worker.postMessage(data),
      terminate: () => {
        worker.terminate();
        this.workers.delete(name);
      },
      onMessage: (callback) => {
        worker.onmessage = (e) => callback(e.data);
      },
      onError: (callback) => {
        worker.onerror = callback;
      }
    };

    this.workers.set(name, workerWrapper);
    return workerWrapper;
  }

  getWorker(name) {
    return this.workers.get(name);
  }

  terminateAll() {
    this.workers.forEach(worker => worker.terminate());
    this.workers.clear();
  }
}

// Usage example
const workerManager = new WorkerManager();
const calculationWorker = workerManager.createWorker('calculation');

calculationWorker.onMessage((data) => {
  console.log('Worker result:', data);
});

calculationWorker.postMessage({
  type: 'HEAVY_CALCULATION',
  data: { iterations: 1000000, multiplier: 10 }
});

// 7. INTERSECTION OBSERVER

class LazyLoader {
  constructor(options = {}) {
    this.options = {
      rootMargin: '50px',
      threshold: 0.1,
      ...options
    };
    
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      this.options
    );
    
    this.elements = new Map();
  }

  observe(element, callback) {
    this.elements.set(element, callback);
    this.observer.observe(element);
  }

  unobserve(element) {
    this.elements.delete(element);
    this.observer.unobserve(element);
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const callback = this.elements.get(element);
        
        if (callback) {
          callback(element, entry);
          // Optionally stop observing after first intersection
          this.unobserve(element);
        }
      }
    });
  }

  disconnect() {
    this.observer.disconnect();
    this.elements.clear();
  }
}

// Lazy loading images
const imageLoader = new LazyLoader({
  rootMargin: '100px'
});

// Usage
document.querySelectorAll('img[data-src]').forEach(img => {
  imageLoader.observe(img, (element) => {
    element.src = element.dataset.src;
    element.classList.add('loaded');
  });
});

// 8. PERFORMANCE APIS

class PerformanceTracker {
  static measureFunction(name, fn) {
    return function(...args) {
      performance.mark(`${name}-start`);
      const result = fn.apply(this, args);
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
      
      const measure = performance.getEntriesByName(name)[0];
      console.log(`${name} took ${measure.duration.toFixed(2)}ms`);
      
      return result;
    };
  }

  static async measureAsync(name, asyncFn) {
    performance.mark(`${name}-start`);
    try {
      const result = await asyncFn();
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
      
      const measure = performance.getEntriesByName(name)[0];
      console.log(`${name} took ${measure.duration.toFixed(2)}ms`);
      
      return result;
    } catch (error) {
      performance.mark(`${name}-error`);
      throw error;
    }
  }

  static getNavigationTiming() {
    const navigation = performance.getEntriesByType('navigation')[0];
    return {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
      loadComplete: navigation.loadEventEnd - navigation.navigationStart,
      firstPaint: this.getFirstPaint(),
      firstContentfulPaint: this.getFirstContentfulPaint()
    };
  }

  static getFirstPaint() {
    const paintEntries = performance.getEntriesByType('paint');
    const fp = paintEntries.find(entry => entry.name === 'first-paint');
    return fp ? fp.startTime : null;
  }

  static getFirstContentfulPaint() {
    const paintEntries = performance.getEntriesByType('paint');
    const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    return fcp ? fcp.startTime : null;
  }
}

// Usage examples
const optimizedFunction = PerformanceTracker.measureFunction('dataProcessing', (data) => {
  return data.map(item => item * 2).filter(item => item > 10);
});

PerformanceTracker.measureAsync('apiCall', async () => {
  const response = await fetch('/api/data');
  return response.json();
});

console.log('Page performance:', PerformanceTracker.getNavigationTiming());
```
*Notice: Modern JavaScript features and Browser APIs provide powerful capabilities for creating rich, interactive web applications. Use feature detection and polyfills for broader browser support.*

</div>

### Advanced State Management and Data Flow {#advanced-state-management}
<!-- tags: state, redux, zustand, context, data-flow -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Advanced state management handles complex application state across components and features. **Redux Toolkit** provides predictable state updates with actions and reducers, **Zustand** offers lightweight state management, **React Query/TanStack Query** manages server state and caching, **Context API** shares state without prop drilling. **State machines** with XState model complex state transitions, **Recoil** provides atomic state management. Modern patterns include **flux architecture**, **immutable updates**, **middleware for side effects**.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Predictable state**: Clear state update patterns and debugging
- **Performance**: Efficient re-renders and memory usage
- **Developer experience**: Better debugging tools and state visualization
- **Scalability**: Organized state structure for large applications

</div>

<div class="runnable-model" data-filter="state-management">

**Runnable mental model**
```typescript
// 1. REDUX TOOLKIT - MODERN REDUX IMPLEMENTATION

import { configureStore, createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Async thunk for API calls
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (params: { page: number; limit: number }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/users?page=${params.page}&limit=${params.limit}`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

// User slice with RTK
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  filters: {
    search: string;
    role: string;
  };
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  pagination: { page: 1, limit: 10, total: 0 },
  filters: { search: '', role: '' }
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<UsersState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.pagination = {
          ...state.pagination,
          total: action.payload.total
        };
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setFilters, clearError, updateUser, removeUser } = usersSlice.actions;

// Shopping cart slice
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  discount: number;
  shippingCost: number;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
    discount: 0,
    shippingCost: 0
  } as CartState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      cartSlice.caseReducers.calculateTotal(state);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      cartSlice.caseReducers.calculateTotal(state);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(0, action.payload.quantity);
        if (item.quantity === 0) {
          state.items = state.items.filter(i => i.id !== action.payload.id);
        }
      }
      cartSlice.caseReducers.calculateTotal(state);
    },
    applyDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
      cartSlice.caseReducers.calculateTotal(state);
    },
    calculateTotal: (state) => {
      const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      state.total = subtotal - state.discount + state.shippingCost;
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.discount = 0;
    }
  }
});

export const { addItem, removeItem, updateQuantity, applyDiscount, clearCart } = cartSlice.actions;

// Store configuration
export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    cart: cartSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// 2. ZUSTAND - LIGHTWEIGHT STATE MANAGEMENT

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      immer((set, get) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        
        login: async (email: string, password: string) => {
          try {
            const response = await fetch('/api/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password })
            });
            
            if (!response.ok) {
              throw new Error('Login failed');
            }
            
            const data = await response.json();
            
            set((state) => {
              state.user = data.user;
              state.token = data.token;
              state.isAuthenticated = true;
            });
          } catch (error) {
            console.error('Login error:', error);
            throw error;
          }
        },
        
        logout: () => {
          set((state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
          });
        },
        
        updateProfile: (updates: Partial<User>) => {
          set((state) => {
            if (state.user) {
              Object.assign(state.user, updates);
            }
          });
        }
      })),
      {
        name: 'auth-storage',
        partialize: (state) => ({ 
          user: state.user, 
          token: state.token, 
          isAuthenticated: state.isAuthenticated 
        })
      }
    ),
    { name: 'auth-store' }
  )
);

// Theme store
interface ThemeState {
  theme: 'light' | 'dark' | 'system';
  primaryColor: string;
  fontSize: 'small' | 'medium' | 'large';
  setTheme: (theme: ThemeState['theme']) => void;
  setPrimaryColor: (color: string) => void;
  setFontSize: (size: ThemeState['fontSize']) => void;
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeState>()((set, get) => ({
  theme: 'system',
  primaryColor: '#007bff',
  fontSize: 'medium',
  
  setTheme: (theme) => set({ theme }),
  setPrimaryColor: (primaryColor) => set({ primaryColor }),
  setFontSize: (fontSize) => set({ fontSize }),
  
  toggleTheme: () => {
    const { theme } = get();
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    set({ theme: nextTheme });
  }
}));

// 3. REACT QUERY - SERVER STATE MANAGEMENT

import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false
    }
  }
});

// Custom hooks for API operations
export function useUsers(params: { page: number; limit: number; search?: string }) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        page: params.page.toString(),
        limit: params.limit.toString(),
        ...(params.search && { search: params.search })
      });
      
      const response = await fetch(`/api/users?${searchParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return response.json();
    },
    keepPreviousData: true
  });
}

export function useUser(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      return response.json();
    },
    enabled: !!userId
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (userData: Omit<User, 'id'>) => {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<User> }) => {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      
      return response.json();
    },
    onSuccess: (updatedUser) => {
      // Update the user in cache
      queryClient.setQueryData(['user', updatedUser.id], updatedUser);
      // Invalidate users list to reflect changes
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });
}

// Optimistic updates
export function useToggleUserStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await fetch(`/api/users/${userId}/toggle-status`, {
        method: 'POST'
      });
      
      if (!response.ok) {
        throw new Error('Failed to toggle user status');
      }
      
      return response.json();
    },
    onMutate: async (userId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['user', userId] });
      
      // Snapshot the previous value
      const previousUser = queryClient.getQueryData(['user', userId]);
      
      // Optimistically update
      queryClient.setQueryData(['user', userId], (old: any) => ({
        ...old,
        active: !old.active
      }));
      
      return { previousUser };
    },
    onError: (err, userId, context) => {
      // Rollback on error
      queryClient.setQueryData(['user', userId], context?.previousUser);
    },
    onSettled: (data, error, userId) => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
    }
  });
}

// 4. CONTEXT API WITH ADVANCED PATTERNS

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Notification system with Context
interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  autoClose?: boolean;
  duration?: number;
}

interface NotificationState {
  notifications: Notification[];
}

type NotificationAction =
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_ALL' };

const notificationReducer = (state: NotificationState, action: NotificationAction): NotificationState => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
    case 'CLEAR_ALL':
      return {
        ...state,
        notifications: []
      };
    default:
      return state;
  }
};

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, { notifications: [] });

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = { ...notification, id };
    
    dispatch({ type: 'ADD_NOTIFICATION', payload: newNotification });
    
    if (notification.autoClose !== false) {
      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
      }, notification.duration || 5000);
    }
  };

  const removeNotification = (id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  };

  const clearAll = () => {
    dispatch({ type: 'CLEAR_ALL' });
  };

  return (
    <NotificationContext.Provider value={{
      notifications: state.notifications,
      addNotification,
      removeNotification,
      clearAll
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

// 5. STATE MACHINES WITH XSTATE

import { createMachine, interpret, assign } from 'xstate';

interface FormContext {
  formData: Record<string, any>;
  errors: Record<string, string>;
  submissionCount: number;
}

type FormEvent =
  | { type: 'EDIT'; field: string; value: any }
  | { type: 'SUBMIT' }
  | { type: 'VALIDATION_SUCCESS' }
  | { type: 'VALIDATION_ERROR'; errors: Record<string, string> }
  | { type: 'SUBMISSION_SUCCESS' }
  | { type: 'SUBMISSION_ERROR'; error: string }
  | { type: 'RESET' };

const formMachine = createMachine<FormContext, FormEvent>({
  id: 'form',
  initial: 'editing',
  context: {
    formData: {},
    errors: {},
    submissionCount: 0
  },
  states: {
    editing: {
      on: {
        EDIT: {
          actions: assign({
            formData: (context, event) => ({
              ...context.formData,
              [event.field]: event.value
            }),
            errors: (context, event) => {
              const newErrors = { ...context.errors };
              delete newErrors[event.field];
              return newErrors;
            }
          })
        },
        SUBMIT: 'validating'
      }
    },
    validating: {
      invoke: {
        id: 'validateForm',
        src: (context) => validateFormData(context.formData),
        onDone: 'submitting',
        onError: {
          target: 'editing',
          actions: assign({
            errors: (_, event) => event.data
          })
        }
      }
    },
    submitting: {
      invoke: {
        id: 'submitForm',
        src: (context) => submitFormData(context.formData),
        onDone: 'success',
        onError: {
          target: 'editing',
          actions: assign({
            errors: (_, event) => ({ submit: event.data.message }),
            submissionCount: (context) => context.submissionCount + 1
          })
        }
      }
    },
    success: {
      on: {
        RESET: {
          target: 'editing',
          actions: assign({
            formData: {},
            errors: {},
            submissionCount: 0
          })
        }
      }
    }
  }
});

// Helper functions
async function validateFormData(data: Record<string, any>): Promise<void> {
  const errors: Record<string, string> = {};
  
  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Email is invalid';
  }
  
  if (!data.password) {
    errors.password = 'Password is required';
  } else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  
  if (Object.keys(errors).length > 0) {
    throw errors;
  }
}

async function submitFormData(data: Record<string, any>): Promise<any> {
  const response = await fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error('Submission failed');
  }
  
  return response.json();
}

// React hook for state machine
export function useFormMachine() {
  const [state, send] = React.useState(() => {
    const service = interpret(formMachine);
    service.start();
    return service;
  });
  
  const [current, setCurrent] = React.useState(state.state);
  
  React.useEffect(() => {
    const subscription = state.subscribe(setCurrent);
    return () => subscription.unsubscribe();
  }, [state]);
  
  return [current, state.send];
}

// 6. COMPONENT INTEGRATION EXAMPLES

const UserManagement: React.FC = () => {
  const { user } = useAuthStore();
  const { addNotification } = useNotifications();
  const [current, send] = useFormMachine();
  
  const { data: users, isLoading, error } = useUsers({ page: 1, limit: 10 });
  const createUserMutation = useCreateUser();
  
  const handleCreateUser = (userData: Omit<User, 'id'>) => {
    createUserMutation.mutate(userData, {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Success',
          message: 'User created successfully'
        });
        send('RESET');
      },
      onError: (error) => {
        addNotification({
          type: 'error',
          title: 'Error',
          message: error.message
        });
      }
    });
  };
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h1>User Management</h1>
      <UserForm
        onSubmit={handleCreateUser}
        formState={current}
        onFormAction={send}
      />
      <UserList users={users?.users || []} />
    </div>
  );
};

export default UserManagement;
```
*Notice: Choose state management solutions based on application complexity and team requirements. Simple local state may be sufficient for many use cases.*

</div>

### Modern Build Tools and Development Workflow {#build-tools-workflow}
<!-- tags: vite, webpack, bundling, development, optimization -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Modern build tools optimize development and production workflows. **Vite** provides fast development with native ES modules and HMR, **Webpack** offers comprehensive bundling and optimization, **Rollup** specializes in library bundling, **esbuild** delivers ultra-fast compilation. **Development features**: Hot Module Replacement (HMR), source maps, dev servers, proxy configuration. **Production optimizations**: tree shaking, code splitting, minification, asset optimization. **Module federation** enables micro-frontend architectures.*

</div>

<div class="runnable-model" data-filter="build-tools">

**Runnable mental model**
```typescript
// 1. VITE CONFIGURATION

// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh
      fastRefresh: true,
      // JSX runtime
      jsxRuntime: 'automatic'
    })
  ],
  
  // Development server configuration
  server: {
    port: 3000,
    open: true,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
      }
    },
    hmr: {
      overlay: true
    }
  },
  
  // Build configuration
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
    
    // Rollup options
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html')
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['lodash', 'date-fns'],
          ui: ['@mui/material', '@emotion/react']
        }
      }
    },
    
    // Chunk size warnings
    chunkSizeWarningLimit: 1000
  },
  
  // Path aliases
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@types': resolve(__dirname, 'src/types')
    }
  },
  
  // Environment variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString())
  },
  
  // CSS configuration
  css: {
    modules: {
      localsConvention: 'camelCase'
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },
  
  // Optimization
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['@vite/client', '@vite/env']
  }
});

// 2. WEBPACK CONFIGURATION (for comparison)

// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  
  entry: {
    main: './src/index.tsx',
    admin: './src/admin.tsx'
  },
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? '[name].[contenthash].js' : '[name].js',
    chunkFilename: isProduction ? '[name].[contenthash].chunk.js' : '[name].chunk.js',
    clean: true,
    publicPath: '/'
  },
  
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils')
    }
  },
  
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource'
      }
    ]
  },
  
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      filename: 'admin.html',
      template: './public/admin.html',
      chunks: ['admin']
    }),
    ...(isProduction ? [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
      })
    ] : []),
    ...(process.env.ANALYZE ? [new BundleAnalyzerPlugin()] : [])
  ],
  
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8000'
    }
  },
  
  devtool: isProduction ? 'source-map' : 'eval-source-map'
};

// 3. CUSTOM BUILD SCRIPTS AND AUTOMATION

// scripts/build-utils.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class BuildUtils {
  static generateBuildInfo() {
    const buildInfo = {
      version: process.env.npm_package_version,
      buildDate: new Date().toISOString(),
      gitCommit: this.getGitCommit(),
      gitBranch: this.getGitBranch(),
      environment: process.env.NODE_ENV || 'development'
    };
    
    fs.writeFileSync(
      path.join(__dirname, '../public/build-info.json'),
      JSON.stringify(buildInfo, null, 2)
    );
    
    return buildInfo;
  }
  
  static getGitCommit() {
    try {
      return execSync('git rev-parse HEAD').toString().trim();
    } catch {
      return 'unknown';
    }
  }
  
  static getGitBranch() {
    try {
      return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    } catch {
      return 'unknown';
    }
  }
  
  static analyzeBundle() {
    const stats = require('../dist/stats.json');
    const analysis = {
      totalSize: 0,
      chunks: [],
      assets: []
    };
    
    stats.chunks.forEach(chunk => {
      const chunkSize = chunk.files.reduce((size, file) => {
        const asset = stats.assets.find(a => a.name === file);
        return size + (asset ? asset.size : 0);
      }, 0);
      
      analysis.chunks.push({
        id: chunk.id,
        names: chunk.names,
        size: chunkSize,
        files: chunk.files
      });
      
      analysis.totalSize += chunkSize;
    });
    
    analysis.assets = stats.assets.map(asset => ({
      name: asset.name,
      size: asset.size,
      type: path.extname(asset.name)
    }));
    
    return analysis;
  }
  
  static optimizeImages() {
    const sharp = require('sharp');
    const glob = require('glob');
    
    const imageFiles = glob.sync('src/assets/images/**/*.{jpg,jpeg,png}');
    
    return Promise.all(
      imageFiles.map(async (file) => {
        const outputPath = file.replace('src/', 'dist/');
        const dir = path.dirname(outputPath);
        
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        await sharp(file)
          .resize(1920, 1080, { 
            fit: 'inside',
            withoutEnlargement: true 
          })
          .jpeg({ quality: 85 })
          .toFile(outputPath);
        
        // Generate WebP version
        await sharp(file)
          .resize(1920, 1080, { 
            fit: 'inside',
            withoutEnlargement: true 
          })
          .webp({ quality: 80 })
          .toFile(outputPath.replace(/\.(jpg|jpeg|png)$/, '.webp'));
      })
    );
  }
}

module.exports = BuildUtils;

// 4. DEVELOPMENT WORKFLOW AUTOMATION

// scripts/dev-setup.js
const { execSync } = require('child_process');
const fs = require('fs');

class DevSetup {
  static async setup() {
    console.log('🚀 Setting up development environment...');
    
    // Check Node.js version
    this.checkNodeVersion();
    
    // Install dependencies
    await this.installDependencies();
    
    // Setup environment files
    this.setupEnvironment();
    
    // Setup Git hooks
    this.setupGitHooks();
    
    // Generate SSL certificates for HTTPS development
    await this.setupSSL();
    
    console.log('✅ Development environment ready!');
  }
  
  static checkNodeVersion() {
    const nodeVersion = process.version;
    const requiredVersion = '18.0.0';
    
    if (nodeVersion < `v${requiredVersion}`) {
      throw new Error(`Node.js ${requiredVersion} or higher is required`);
    }
    
    console.log(`✅ Node.js ${nodeVersion} detected`);
  }
  
  static async installDependencies() {
    console.log('📦 Installing dependencies...');
    execSync('npm ci', { stdio: 'inherit' });
  }
  
  static setupEnvironment() {
    if (!fs.existsSync('.env.local')) {
      const envTemplate = `
VITE_API_URL=http://localhost:8000
VITE_APP_TITLE=My App
VITE_ENABLE_ANALYTICS=false
VITE_LOG_LEVEL=debug
      `.trim();
      
      fs.writeFileSync('.env.local', envTemplate);
      console.log('✅ Created .env.local file');
    }
  }
  
  static setupGitHooks() {
    const huskyConfig = {
      'pre-commit': 'lint-staged',
      'pre-push': 'npm run test:ci',
      'commit-msg': 'commitlint --edit $1'
    };
    
    Object.entries(huskyConfig).forEach(([hook, command]) => {
      execSync(`npx husky add .husky/${hook} "${command}"`, { stdio: 'inherit' });
    });
    
    console.log('✅ Git hooks configured');
  }
  
  static async setupSSL() {
    const mkcert = require('mkcert');
    
    try {
      const ca = await mkcert.createCA({
        organization: 'Development CA',
        countryCode: 'US',
        state: 'CA',
        locality: 'San Francisco',
        validity: 365
      });
      
      const cert = await mkcert.createCert({
        domains: ['localhost', '127.0.0.1'],
        validity: 365,
        ca
      });
      
      fs.writeFileSync('.ssl/cert.pem', cert.cert);
      fs.writeFileSync('.ssl/key.pem', cert.key);
      
      console.log('✅ SSL certificates generated');
    } catch (error) {
      console.warn('⚠️ SSL setup failed, using HTTP');
    }
  }
}

// 5. DEPLOYMENT AUTOMATION

// scripts/deploy.js
class DeploymentManager {
  constructor(environment) {
    this.environment = environment;
    this.config = this.loadConfig();
  }
  
  loadConfig() {
    const configs = {
      development: {
        apiUrl: 'https://dev-api.example.com',
        cdnUrl: 'https://dev-cdn.example.com',
        bucket: 'my-app-dev'
      },
      staging: {
        apiUrl: 'https://staging-api.example.com',
        cdnUrl: 'https://staging-cdn.example.com',
        bucket: 'my-app-staging'
      },
      production: {
        apiUrl: 'https://api.example.com',
        cdnUrl: 'https://cdn.example.com',
        bucket: 'my-app-prod'
      }
    };
    
    return configs[this.environment];
  }
  
  async deploy() {
    console.log(`🚀 Deploying to ${this.environment}...`);
    
    // Build application
    await this.build();
    
    // Upload to CDN
    await this.uploadToCDN();
    
    // Update API configuration
    await this.updateAPIConfig();
    
    // Invalidate cache
    await this.invalidateCache();
    
    // Send deployment notification
    await this.notifyDeployment();
    
    console.log('✅ Deployment completed!');
  }
  
  async build() {
    console.log('📦 Building application...');
    
    process.env.VITE_API_URL = this.config.apiUrl;
    process.env.VITE_CDN_URL = this.config.cdnUrl;
    process.env.NODE_ENV = this.environment === 'production' ? 'production' : 'development';
    
    execSync('npm run build', { stdio: 'inherit' });
    
    // Generate build report
    BuildUtils.generateBuildInfo();
    const analysis = BuildUtils.analyzeBundle();
    
    console.log(`Bundle size: ${(analysis.totalSize / 1024 / 1024).toFixed(2)} MB`);
  }
  
  async uploadToCDN() {
    console.log('☁️ Uploading to CDN...');
    
    const AWS = require('aws-sdk');
    const s3 = new AWS.S3();
    const glob = require('glob');
    
    const files = glob.sync('dist/**/*', { nodir: true });
    
    await Promise.all(
      files.map(async (file) => {
        const key = file.replace('dist/', '');
        const body = fs.readFileSync(file);
        
        await s3.upload({
          Bucket: this.config.bucket,
          Key: key,
          Body: body,
          ContentType: this.getContentType(file),
          CacheControl: this.getCacheControl(file)
        }).promise();
      })
    );
  }
  
  getContentType(file) {
    const ext = path.extname(file);
    const types = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.svg': 'image/svg+xml'
    };
    return types[ext] || 'application/octet-stream';
  }
  
  getCacheControl(file) {
    if (file.includes('index.html')) {
      return 'no-cache';
    }
    if (file.match(/\.(js|css)$/)) {
      return 'public, max-age=31536000, immutable';
    }
    return 'public, max-age=86400';
  }
  
  async notifyDeployment() {
    const webhook = process.env.SLACK_WEBHOOK_URL;
    if (!webhook) return;
    
    const buildInfo = JSON.parse(fs.readFileSync('public/build-info.json'));
    
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `🚀 Deployed ${buildInfo.version} to ${this.environment}`,
        attachments: [{
          color: 'good',
          fields: [
            { title: 'Environment', value: this.environment, short: true },
            { title: 'Version', value: buildInfo.version, short: true },
            { title: 'Commit', value: buildInfo.gitCommit.substring(0, 7), short: true }
          ]
        }]
      })
    });
  }
}

// Package.json scripts
const packageScripts = {
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "build:analyze": "npm run build && npx vite-bundle-analyzer dist/stats.json",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:e2e": "playwright test",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "npm run lint -- --fix",
    "type-check": "tsc --noEmit",
    "setup:dev": "node scripts/dev-setup.js",
    "deploy:dev": "node scripts/deploy.js development",
    "deploy:staging": "node scripts/deploy.js staging",
    "deploy:prod": "node scripts/deploy.js production"
  }
};

module.exports = { DeploymentManager, BuildUtils, DevSetup };
```
*Notice: Modern build tools significantly improve development experience and production performance. Choose tools based on project requirements and team expertise.*

</div>

## Summary

Modern frontend development with React, TypeScript, and Node.js provides a powerful foundation for building scalable, type-safe applications. Node.js enables full-stack JavaScript development with server-side capabilities, React offers component-based UI architecture with hooks for state management, and TypeScript adds compile-time type safety and enhanced developer experience.

Key concepts include React component patterns, custom hooks for reusable logic, TypeScript interfaces and generics for type safety, form handling with validation, API integration with proper error handling, performance optimization techniques, modern CSS with Flexbox and Grid, comprehensive testing strategies, advanced state management with Redux Toolkit and Zustand, modern build tools like Vite for fast development, progressive web app features, web security implementation, and modern JavaScript Browser APIs.

The ecosystem encompasses sophisticated state management patterns, comprehensive testing frameworks, performance monitoring tools, modern build and deployment workflows that enable professional-grade application development with optimal developer experience and production performance.

### Comprehensive Testing Strategies {#testing-strategies}
<!-- tags: testing, jest, vitest, playwright, cypress, unit-tests, integration-tests, e2e -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Comprehensive testing ensures application reliability and maintainability. **Unit testing** with Jest/Vitest tests individual components and functions, **Integration testing** verifies component interactions, **End-to-end testing** with Playwright/Cypress tests complete user workflows. **Testing strategies** include Test-Driven Development (TDD), Behavior-Driven Development (BDD), **testing patterns** like Page Object Model, **mocking strategies** for external dependencies, **visual regression testing** for UI consistency, **performance testing** for optimization, **accessibility testing** for inclusive design.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Quality assurance**: Catch bugs early in development cycle
- **Refactoring confidence**: Safe code changes with test coverage
- **Documentation**: Tests serve as living documentation
- **User experience**: Ensure functionality works as expected

</div>

<div class="runnable-model" data-filter="testing">

**Runnable mental model**
```typescript
// 1. UNIT TESTING WITH VITEST AND REACT TESTING LIBRARY

// tests/utils/formatters.test.ts
import { describe, it, expect, vi } from 'vitest';
import { formatCurrency, formatDate, validateEmail, debounce } from '@/utils/formatters';

describe('Formatters Utility Functions', () => {
  describe('formatCurrency', () => {
    it('should format USD currency correctly', () => {
      expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56');
      expect(formatCurrency(0, 'USD')).toBe('$0.00');
      expect(formatCurrency(-100, 'USD')).toBe('-$100.00');
    });
    
    it('should format EUR currency correctly', () => {
      expect(formatCurrency(1234.56, 'EUR')).toBe('€1,234.56');
    });
    
    it('should handle edge cases', () => {
      expect(formatCurrency(NaN, 'USD')).toBe('$0.00');
      expect(formatCurrency(Infinity, 'USD')).toBe('$0.00');
    });
  });
  
  describe('formatDate', () => {
    const mockDate = new Date('2023-12-25T10:30:00Z');
    
    it('should format date with default format', () => {
      expect(formatDate(mockDate)).toBe('Dec 25, 2023');
    });
    
    it('should format date with custom format', () => {
      expect(formatDate(mockDate, 'yyyy-MM-dd')).toBe('2023-12-25');
      expect(formatDate(mockDate, 'MMM d, yyyy HH:mm')).toBe('Dec 25, 2023 10:30');
    });
    
    it('should handle invalid dates', () => {
      expect(formatDate(new Date('invalid'))).toBe('Invalid Date');
    });
  });
  
  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      expect(validateEmail('user@example.com')).toBe(true);
      expect(validateEmail('test.email+tag@domain.co.uk')).toBe(true);
    });
    
    it('should reject invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('user@')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });
  
  describe('debounce', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    
    afterEach(() => {
      vi.useRealTimers();
    });
    
    it('should debounce function calls', () => {
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 1000);
      
      // Call multiple times rapidly
      debouncedFn('arg1');
      debouncedFn('arg2');
      debouncedFn('arg3');
      
      // Function should not be called yet
      expect(mockFn).not.toHaveBeenCalled();
      
      // Fast forward time
      vi.advanceTimersByTime(1000);
      
      // Function should be called once with last arguments
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenLastCalledWith('arg3');
    });
  });
});

// 2. COMPONENT TESTING

// tests/components/UserCard.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { UserCard } from '@/components/UserCard';
import { User } from '@/types';

const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'admin',
  avatar: 'https://example.com/avatar.jpg',
  isActive: true
};

const defaultProps = {
  user: mockUser,
  onEdit: vi.fn(),
  onDelete: vi.fn(),
  onToggleStatus: vi.fn()
};

describe('UserCard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('should render user information correctly', () => {
    render(<UserCard {...defaultProps} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('admin')).toBeInTheDocument();
    expect(screen.getByAltText('John Doe avatar')).toBeInTheDocument();
  });
  
  it('should show active status indicator', () => {
    render(<UserCard {...defaultProps} />);
    
    const statusIndicator = screen.getByRole('status');
    expect(statusIndicator).toHaveTextContent('Active');
    expect(statusIndicator).toHaveClass('status-active');
  });
  
  it('should show inactive status for inactive users', () => {
    const inactiveUser = { ...mockUser, isActive: false };
    render(<UserCard {...defaultProps} user={inactiveUser} />);
    
    const statusIndicator = screen.getByRole('status');
    expect(statusIndicator).toHaveTextContent('Inactive');
    expect(statusIndicator).toHaveClass('status-inactive');
  });
  
  it('should call onEdit when edit button is clicked', async () => {
    const user = userEvent.setup();
    render(<UserCard {...defaultProps} />);
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);
    
    expect(defaultProps.onEdit).toHaveBeenCalledWith(mockUser);
  });
  
  it('should call onDelete when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<UserCard {...defaultProps} />);
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);
    
    expect(defaultProps.onDelete).toHaveBeenCalledWith(mockUser.id);
  });
  
  it('should show confirmation dialog before delete', async () => {
    const user = userEvent.setup();
    render(<UserCard {...defaultProps} />);
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);
    
    expect(screen.getByText(/are you sure you want to delete/i)).toBeInTheDocument();
    
    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    await user.click(confirmButton);
    
    expect(defaultProps.onDelete).toHaveBeenCalledWith(mockUser.id);
  });
  
  it('should toggle status when status button is clicked', async () => {
    const user = userEvent.setup();
    render(<UserCard {...defaultProps} />);
    
    const statusButton = screen.getByRole('button', { name: /toggle status/i });
    await user.click(statusButton);
    
    expect(defaultProps.onToggleStatus).toHaveBeenCalledWith(mockUser.id);
  });
  
  it('should handle missing avatar gracefully', () => {
    const userWithoutAvatar = { ...mockUser, avatar: undefined };
    render(<UserCard {...defaultProps} user={userWithoutAvatar} />);
    
    const defaultAvatar = screen.getByTestId('default-avatar');
    expect(defaultAvatar).toBeInTheDocument();
  });
});

// 3. INTEGRATION TESTING

// tests/integration/UserManagement.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserManagement } from '@/pages/UserManagement';
import { server } from '../mocks/server';

// Mock API responses
const mockUsers = [
  { id: '1', name: 'Alice Smith', email: 'alice@example.com', role: 'admin', isActive: true },
  { id: '2', name: 'Bob Johnson', email: 'bob@example.com', role: 'user', isActive: false }
];

describe('User Management Integration', () => {
  let queryClient: QueryClient;
  
  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false }
      }
    });
    server.listen();
  });
  
  afterEach(() => {
    server.resetHandlers();
  });
  
  afterAll(() => {
    server.close();
  });
  
  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    );
  };
  
  it('should load and display users on mount', async () => {
    renderWithProviders(<UserManagement />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Alice Smith')).toBeInTheDocument();
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    });
  });
  
  it('should filter users by search term', async () => {
    const user = userEvent.setup();
    renderWithProviders(<UserManagement />);
    
    await waitFor(() => {
      expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    });
    
    const searchInput = screen.getByPlaceholderText(/search users/i);
    await user.type(searchInput, 'Alice');
    
    await waitFor(() => {
      expect(screen.getByText('Alice Smith')).toBeInTheDocument();
      expect(screen.queryByText('Bob Johnson')).not.toBeInTheDocument();
    });
  });
  
  it('should create new user', async () => {
    const user = userEvent.setup();
    renderWithProviders(<UserManagement />);
    
    await waitFor(() => {
      expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    });
    
    const addButton = screen.getByRole('button', { name: /add user/i });
    await user.click(addButton);
    
    // Fill form
    await user.type(screen.getByLabelText(/name/i), 'Charlie Brown');
    await user.type(screen.getByLabelText(/email/i), 'charlie@example.com');
    await user.selectOptions(screen.getByLabelText(/role/i), 'user');
    
    const submitButton = screen.getByRole('button', { name: /create/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Charlie Brown')).toBeInTheDocument();
    });
  });
  
  it('should handle API errors gracefully', async () => {
    // Mock API error
    server.use(
      rest.get('/api/users', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Server error' }));
      })
    );
    
    renderWithProviders(<UserManagement />);
    
    await waitFor(() => {
      expect(screen.getByText(/error loading users/i)).toBeInTheDocument();
    });
  });
});

// 4. CUSTOM HOOKS TESTING

// tests/hooks/useLocalStorage.test.ts
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  
  it('should return initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    
    expect(result.current[0]).toBe('initial');
  });
  
  it('should return stored value from localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'));
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    
    expect(result.current[0]).toBe('stored-value');
  });
  
  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    
    act(() => {
      result.current[1]('new-value');
    });
    
    expect(result.current[0]).toBe('new-value');
    expect(localStorage.getItem('test-key')).toBe('"new-value"');
  });
  
  it('should handle complex objects', () => {
    const initialValue = { name: 'John', age: 30 };
    const { result } = renderHook(() => useLocalStorage('user', initialValue));
    
    act(() => {
      result.current[1]({ name: 'Jane', age: 25 });
    });
    
    expect(result.current[0]).toEqual({ name: 'Jane', age: 25 });
  });
  
  it('should handle localStorage errors gracefully', () => {
    // Mock localStorage to throw error
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = vi.fn(() => {
      throw new Error('Storage full');
    });
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    
    act(() => {
      result.current[1]('new-value');
    });
    
    // Should not throw error
    expect(result.current[0]).toBe('new-value');
    
    // Restore original function
    localStorage.setItem = originalSetItem;
  });
});

// 5. END-TO-END TESTING WITH PLAYWRIGHT

// tests/e2e/user-workflow.spec.ts
import { test, expect, Page } from '@playwright/test';

test.describe('User Management Workflow', () => {
  let page: Page;
  
  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('/admin/users');
  });
  
  test('should complete full user management workflow', async () => {
    // Wait for page to load
    await expect(page.locator('h1')).toContainText('User Management');
    
    // Search for existing user
    await page.fill('[data-testid="search-input"]', 'Alice');
    await expect(page.locator('[data-testid="user-card"]')).toHaveCount(1);
    
    // Clear search
    await page.fill('[data-testid="search-input"]', '');
    await expect(page.locator('[data-testid="user-card"]')).toHaveCount(2);
    
    // Create new user
    await page.click('[data-testid="add-user-button"]');
    await page.fill('[data-testid="name-input"]', 'Test User');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.selectOption('[data-testid="role-select"]', 'user');
    await page.click('[data-testid="submit-button"]');
    
    // Verify user was created
    await expect(page.locator('text=Test User')).toBeVisible();
    await expect(page.locator('[data-testid="user-card"]')).toHaveCount(3);
    
    // Edit user
    await page.click('[data-testid="user-card"]:last-child [data-testid="edit-button"]');
    await page.fill('[data-testid="name-input"]', 'Updated Test User');
    await page.click('[data-testid="submit-button"]');
    
    // Verify user was updated
    await expect(page.locator('text=Updated Test User')).toBeVisible();
    
    // Delete user
    await page.click('[data-testid="user-card"]:last-child [data-testid="delete-button"]');
    await page.click('[data-testid="confirm-delete"]');
    
    // Verify user was deleted
    await expect(page.locator('text=Updated Test User')).not.toBeVisible();
    await expect(page.locator('[data-testid="user-card"]')).toHaveCount(2);
  });
  
  test('should handle form validation errors', async () => {
    await page.click('[data-testid="add-user-button"]');
    
    // Try to submit empty form
    await page.click('[data-testid="submit-button"]');
    
    // Check validation errors
    await expect(page.locator('[data-testid="name-error"]')).toContainText('Name is required');
    await expect(page.locator('[data-testid="email-error"]')).toContainText('Email is required');
    
    // Fill invalid email
    await page.fill('[data-testid="email-input"]', 'invalid-email');
    await page.click('[data-testid="submit-button"]');
    
    await expect(page.locator('[data-testid="email-error"]')).toContainText('Invalid email format');
  });
  
  test('should be responsive on mobile devices', async () => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check mobile layout
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
    await expect(page.locator('[data-testid="desktop-sidebar"]')).not.toBeVisible();
    
    // Test mobile navigation
    await page.click('[data-testid="mobile-menu-toggle"]');
    await expect(page.locator('[data-testid="mobile-nav"]')).toBeVisible();
  });
});

// 6. VISUAL REGRESSION TESTING

// tests/visual/components.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('should match UserCard component screenshot', async ({ page }) => {
    await page.goto('/storybook/?path=/story/components-usercard--default');
    
    const component = page.locator('[data-testid="user-card"]');
    await expect(component).toHaveScreenshot('user-card-default.png');
  });
  
  test('should match UserCard in different states', async ({ page }) => {
    await page.goto('/storybook/?path=/story/components-usercard--inactive');
    
    const component = page.locator('[data-testid="user-card"]');
    await expect(component).toHaveScreenshot('user-card-inactive.png');
  });
  
  test('should match dark theme appearance', async ({ page }) => {
    await page.goto('/admin/users');
    await page.click('[data-testid="theme-toggle"]');
    
    await expect(page).toHaveScreenshot('user-management-dark.png', {
      fullPage: true
    });
  });
});

// 7. PERFORMANCE TESTING

// tests/performance/loading.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  test('should load page within performance budget', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/admin/users');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000); // 3 second budget
  });
  
  test('should have good Core Web Vitals', async ({ page }) => {
    await page.goto('/admin/users');
    
    // Measure Largest Contentful Paint
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
      });
    });
    
    expect(lcp).toBeLessThan(2500); // Good LCP threshold
  });
  
  test('should handle large datasets efficiently', async ({ page }) => {
    // Mock large dataset
    await page.route('/api/users*', (route) => {
      const users = Array.from({ length: 1000 }, (_, i) => ({
        id: i.toString(),
        name: `User ${i}`,
        email: `user${i}@example.com`,
        role: i % 2 === 0 ? 'admin' : 'user',
        isActive: true
      }));
      
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ users, total: 1000 })
      });
    });
    
    const startTime = Date.now();
    await page.goto('/admin/users');
    await page.waitForSelector('[data-testid="user-card"]');
    
    const renderTime = Date.now() - startTime;
    expect(renderTime).toBeLessThan(5000); // Should render within 5 seconds
  });
});

// 8. ACCESSIBILITY TESTING

// tests/accessibility/a11y.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test('should not have accessibility violations', async ({ page }) => {
    await page.goto('/admin/users');
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });
  
  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/admin/users');
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="search-input"]')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="add-user-button"]')).toBeFocused();
    
    // Test Enter key activation
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-testid="user-form"]')).toBeVisible();
  });
  
  test('should support screen readers', async ({ page }) => {
    await page.goto('/admin/users');
    
    // Check ARIA labels
    await expect(page.locator('[data-testid="search-input"]')).toHaveAttribute('aria-label', 'Search users');
    await expect(page.locator('[data-testid="user-table"]')).toHaveAttribute('role', 'table');
    
    // Check headings structure
    const h1 = page.locator('h1');
    await expect(h1).toHaveText('User Management');
    
    const h2s = page.locator('h2');
    await expect(h2s.first()).toBeVisible();
  });
});

// 9. TEST UTILITIES AND HELPERS

// tests/utils/test-utils.tsx
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { NotificationProvider } from '@/contexts/NotificationContext';

interface AllTheProvidersProps {
  children: React.ReactNode;
}

const AllTheProviders: React.FC<AllTheProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });
  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

// Mock factories
export const createMockUser = (overrides: Partial<User> = {}): User => ({
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user',
  isActive: true,
  ...overrides
});

export const createMockUsers = (count: number): User[] =>
  Array.from({ length: count }, (_, i) => createMockUser({
    id: (i + 1).toString(),
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`
  }));

// Test configuration
export const testConfig = {
  apiUrl: 'http://localhost:3001',
  timeout: 5000,
  retries: 2
};
```
*Notice: Comprehensive testing strategies ensure application reliability. Balance test coverage with development velocity and focus on critical user paths.*

</div>

### Advanced Deployment and DevOps Integration {#deployment-devops}
<!-- tags: deployment, ci-cd, docker, kubernetes, monitoring, observability -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Advanced deployment integrates development with production operations. **Containerization** with Docker ensures consistent environments, **Kubernetes** orchestrates container deployment and scaling, **CI/CD pipelines** automate testing and deployment, **Infrastructure as Code** manages cloud resources. **Monitoring and observability** with metrics, logs, and traces track application health, **feature flags** enable safe rollouts, **blue-green deployments** minimize downtime, **canary releases** test changes gradually.*

</div>

<div class="runnable-model" data-filter="deployment">

**Runnable mental model**
```typescript
// 1. CONTAINERIZATION WITH DOCKER

// Dockerfile
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY src/ ./src/
COPY public/ ./public/

# Build application
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application
COPY --from=builder /app/dist /usr/share/nginx/html

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

// docker-compose.yml for development
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - CHOKIDAR_USEPOLLING=true
    depends_on:
      - api
      - redis

  api:
    build:
      context: ./api
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:password@postgres:5432/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
    volumes:
      - ./api:/app
      - /app/node_modules

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - api

volumes:
  postgres_data:
  redis_data:

// 2. KUBERNETES DEPLOYMENT

// k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: myapp-production
  labels:
    environment: production

---
// k8s/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: frontend-config
  namespace: myapp-production
data:
  nginx.conf: |
    server {
      listen 80;
      server_name _;
      root /usr/share/nginx/html;
      index index.html;
      
      # Enable gzip compression
      gzip on;
      gzip_vary on;
      gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
      
      # Security headers
      add_header X-Frame-Options DENY;
      add_header X-Content-Type-Options nosniff;
      add_header X-XSS-Protection "1; mode=block";
      add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
      
      # API proxy
      location /api/ {
        proxy_pass http://api-service:8000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
      }
      
      # Frontend routes
      location / {
        try_files $uri $uri/ /index.html;
        expires 1h;
        add_header Cache-Control "public, immutable";
      }
      
      # Static assets
      location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
      }
    }

---
// k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend-deployment
  namespace: myapp-production
  labels:
    app: frontend
    version: v1
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
        version: v1
    spec:
      containers:
      - name: frontend
        image: myregistry/frontend:latest
        ports:
        - containerPort: 80
        env:
        - name: NODE_ENV
          value: "production"
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 10
        livenessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 15
          periodSeconds: 20
        volumeMounts:
        - name: nginx-config
          mountPath: /etc/nginx/nginx.conf
          subPath: nginx.conf
      volumes:
      - name: nginx-config
        configMap:
          name: frontend-config

---
// k8s/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
  namespace: myapp-production
  labels:
    app: frontend
spec:
  type: ClusterIP
  ports:
  - port: 80
    targetPort: 80
    protocol: TCP
  selector:
    app: frontend

---
// k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: frontend-ingress
  namespace: myapp-production
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/rate-limit: "100"
    nginx.ingress.kubernetes.io/rate-limit-rps: "5"
spec:
  tls:
  - hosts:
    - myapp.com
    - www.myapp.com
    secretName: frontend-tls
  rules:
  - host: myapp.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 80
  - host: www.myapp.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 80

---
// k8s/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: frontend-hpa
  namespace: myapp-production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: frontend-deployment
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80

// 3. CI/CD PIPELINE WITH GITHUB ACTIONS

// .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20]
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Type check
      run: npm run type-check
    
    - name: Lint
      run: npm run lint
    
    - name: Unit tests
      run: npm run test:coverage
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info
    
    - name: Build
      run: npm run build
    
    - name: E2E tests
      run: |
        npm run preview &
        npx wait-on http://localhost:4173
        npm run test:e2e

  security:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Run Trivy vulnerability scanner
      uses: aquasecurity/trivy-action@master
      with:
        scan-type: 'fs'
        scan-ref: '.'
        format: 'sarif'
        output: 'trivy-results.sarif'
    
    - name: Upload Trivy scan results to GitHub Security tab
      uses: github/codeql-action/upload-sarif@v2
      with:
        sarif_file: 'trivy-results.sarif'
    
    - name: Audit dependencies
      run: npm audit --audit-level high

  build-and-push:
    runs-on: ubuntu-latest
    needs: [test, security]
    if: github.ref == 'refs/heads/main'
    
    permissions:
      contents: read
      packages: write
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v3
    
    - name: Log in to Container Registry
      uses: docker/login-action@v3
      with:
        registry: ${{ env.REGISTRY }}
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}
    
    - name: Extract metadata
      id: meta
      uses: docker/metadata-action@v5
      with:
        images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
        tags: |
          type=ref,event=branch
          type=ref,event=pr
          type=sha,prefix={{branch}}-
          type=raw,value=latest,enable={{is_default_branch}}
    
    - name: Build and push Docker image
      uses: docker/build-push-action@v5
      with:
        context: .
        platforms: linux/amd64,linux/arm64
        push: true
        tags: ${{ steps.meta.outputs.tags }}
        labels: ${{ steps.meta.outputs.labels }}
        cache-from: type=gha
        cache-to: type=gha,mode=max

  deploy-staging:
    runs-on: ubuntu-latest
    needs: build-and-push
    if: github.ref == 'refs/heads/main'
    environment: staging
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Configure kubectl
      uses: azure/k8s-set-context@v3
      with:
        method: kubeconfig
        kubeconfig: ${{ secrets.KUBE_CONFIG }}
    
    - name: Deploy to staging
      run: |
        envsubst < k8s/deployment.yaml | kubectl apply -f -
        kubectl rollout status deployment/frontend-deployment -n myapp-staging
        kubectl get pods -n myapp-staging
      env:
        IMAGE_TAG: ${{ github.sha }}
        ENVIRONMENT: staging
    
    - name: Run smoke tests
      run: |
        sleep 30
        curl -f https://staging.myapp.com/health || exit 1

  deploy-production:
    runs-on: ubuntu-latest
    needs: [build-and-push, deploy-staging]
    if: github.ref == 'refs/heads/main'
    environment: production
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Configure kubectl
      uses: azure/k8s-set-context@v3
      with:
        method: kubeconfig
        kubeconfig: ${{ secrets.KUBE_CONFIG_PROD }}
    
    - name: Deploy to production
      run: |
        envsubst < k8s/deployment.yaml | kubectl apply -f -
        kubectl rollout status deployment/frontend-deployment -n myapp-production
      env:
        IMAGE_TAG: ${{ github.sha }}
        ENVIRONMENT: production
    
    - name: Post-deployment tests
      run: |
        sleep 60
        curl -f https://myapp.com/health || exit 1
        npm run test:e2e:prod

// 4. MONITORING AND OBSERVABILITY

// monitoring/prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert_rules.yml"

scrape_configs:
  - job_name: 'frontend'
    static_configs:
      - targets: ['frontend-service:80']
    metrics_path: '/metrics'
    scrape_interval: 30s

  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true

alerting:
  alertmanagers:
    - static_configs:
        - targets: ['alertmanager:9093']

// Application metrics collection
// src/utils/metrics.ts
class MetricsCollector {
  private static instance: MetricsCollector;
  private metrics: Map<string, number> = new Map();
  private startTime: number = Date.now();

  static getInstance(): MetricsCollector {
    if (!MetricsCollector.instance) {
      MetricsCollector.instance = new MetricsCollector();
    }
    return MetricsCollector.instance;
  }

  // Track page views
  trackPageView(path: string) {
    const key = `pageview_${path}`;
    this.metrics.set(key, (this.metrics.get(key) || 0) + 1);
    
    // Send to analytics
    this.sendToAnalytics('pageview', { path, timestamp: Date.now() });
  }

  // Track user interactions
  trackEvent(event: string, properties: Record<string, any> = {}) {
    const key = `event_${event}`;
    this.metrics.set(key, (this.metrics.get(key) || 0) + 1);
    
    this.sendToAnalytics('event', {
      event,
      properties,
      timestamp: Date.now()
    });
  }

  // Track performance metrics
  trackPerformance(name: string, duration: number) {
    const key = `performance_${name}`;
    const existing = this.metrics.get(key) || 0;
    this.metrics.set(key, (existing + duration) / 2); // Moving average
    
    // Track Core Web Vitals
    if (name === 'lcp' || name === 'fid' || name === 'cls') {
      this.sendToAnalytics('web_vital', {
        name,
        value: duration,
        timestamp: Date.now()
      });
    }
  }

  // Track errors
  trackError(error: Error, context: Record<string, any> = {}) {
    const key = 'errors_total';
    this.metrics.set(key, (this.metrics.get(key) || 0) + 1);
    
    this.sendToAnalytics('error', {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: Date.now()
    });
  }

  // Get metrics for Prometheus endpoint
  getMetrics(): string {
    let output = '';
    
    for (const [key, value] of this.metrics.entries()) {
      output += `# TYPE ${key} counter\n`;
      output += `${key} ${value}\n`;
    }
    
    // Add uptime metric
    const uptime = (Date.now() - this.startTime) / 1000;
    output += `# TYPE app_uptime_seconds gauge\n`;
    output += `app_uptime_seconds ${uptime}\n`;
    
    return output;
  }

  private sendToAnalytics(type: string, data: any) {
    // Send to external analytics service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', type, data);
    }
    
    // Send to internal metrics endpoint
    fetch('/api/metrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, data })
    }).catch(console.error);
  }
}

export const metrics = MetricsCollector.getInstance();

// React hook for tracking
export function useMetrics() {
  const location = useLocation();
  
  useEffect(() => {
    metrics.trackPageView(location.pathname);
  }, [location.pathname]);
  
  const trackEvent = useCallback((event: string, properties?: Record<string, any>) => {
    metrics.trackEvent(event, properties);
  }, []);
  
  const trackError = useCallback((error: Error, context?: Record<string, any>) => {
    metrics.trackError(error, context);
  }, []);
  
  return { trackEvent, trackError };
}

// 5. FEATURE FLAGS AND PROGRESSIVE ROLLOUTS

// src/utils/featureFlags.ts
interface FeatureFlag {
  name: string;
  enabled: boolean;
  rolloutPercentage: number;
  conditions?: {
    userRole?: string[];
    environment?: string[];
    country?: string[];
  };
}

class FeatureFlagService {
  private flags: Map<string, FeatureFlag> = new Map();
  private userId: string | null = null;

  async initialize(userId?: string) {
    this.userId = userId || this.generateAnonymousId();
    await this.loadFlags();
  }

  async loadFlags() {
    try {
      const response = await fetch('/api/feature-flags', {
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
          'X-User-ID': this.userId || ''
        }
      });
      
      const flags: FeatureFlag[] = await response.json();
      
      flags.forEach(flag => {
        this.flags.set(flag.name, flag);
      });
    } catch (error) {
      console.error('Failed to load feature flags:', error);
    }
  }

  isEnabled(flagName: string, context: Record<string, any> = {}): boolean {
    const flag = this.flags.get(flagName);
    
    if (!flag) {
      return false;
    }

    if (!flag.enabled) {
      return false;
    }

    // Check conditions
    if (flag.conditions) {
      if (flag.conditions.userRole && context.userRole) {
        if (!flag.conditions.userRole.includes(context.userRole)) {
          return false;
        }
      }

      if (flag.conditions.environment) {
        const env = process.env.NODE_ENV || 'development';
        if (!flag.conditions.environment.includes(env)) {
          return false;
        }
      }
    }

    // Check rollout percentage
    if (flag.rolloutPercentage < 100) {
      const hash = this.hashUserId(this.userId + flagName);
      const userPercentile = hash % 100;
      return userPercentile < flag.rolloutPercentage;
    }

    return true;
  }

  private hashUserId(input: string): number {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  private generateAnonymousId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  private getAuthToken(): string {
    return localStorage.getItem('authToken') || '';
  }
}

export const featureFlags = new FeatureFlagService();

// React hook for feature flags
export function useFeatureFlag(flagName: string, context: Record<string, any> = {}): boolean {
  const [isEnabled, setIsEnabled] = useState(false);
  
  useEffect(() => {
    const checkFlag = () => {
      setIsEnabled(featureFlags.isEnabled(flagName, context));
    };
    
    checkFlag();
    
    // Listen for flag updates
    const interval = setInterval(checkFlag, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, [flagName, context]);
  
  return isEnabled;
}

// Feature flag component
export const FeatureFlag: React.FC<{
  flag: string;
  context?: Record<string, any>;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}> = ({ flag, context = {}, children, fallback = null }) => {
  const isEnabled = useFeatureFlag(flag, context);
  
  return isEnabled ? <>{children}</> : <>{fallback}</>;
};

// Usage examples
const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const { trackEvent } = useMetrics();
  
  const handleNewFeatureClick = () => {
    trackEvent('new_feature_clicked', { userId: user?.id });
  };
  
  return (
    <div>
      <h1>Dashboard</h1>
      
      <FeatureFlag 
        flag="new-dashboard-layout" 
        context={{ userRole: user?.role }}
        fallback={<LegacyDashboard />}
      >
        <NewDashboard />
      </FeatureFlag>
      
      <FeatureFlag flag="beta-features" context={{ userRole: user?.role }}>
        <button onClick={handleNewFeatureClick}>
          Try New Feature (Beta)
        </button>
      </FeatureFlag>
    </div>
  );
};
```
*Notice: Advanced deployment practices ensure reliable, scalable, and maintainable production systems. Implement monitoring and observability from the start.*

</div>

---

### Advanced React Patterns {#advanced-react-patterns}
<!-- tags: react, patterns, composition, performance -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Advanced React patterns solve complex component composition, state management, and performance challenges in large applications**. **Compound components**: logically related components working together (e.g., Select with Option). **Render props**: sharing code between components using props whose value is a function. **Higher-Order Components (HOCs)**: functions that take a component and return new component with enhanced functionality. **Custom hooks**: extract stateful logic into reusable functions. **Controlled vs uncontrolled**: form components with external vs internal state management. **Error boundaries**: catch JavaScript errors in component trees. **Suspense**: declarative loading states for asynchronous components.

</div>

<div class="runnable-model" data-filter="react patterns">

**Runnable mental model**
```typescript
// === COMPOUND COMPONENTS PATTERN ===

interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = React.createContext<TabsContextType | null>(null);

// Main Tabs component
const Tabs: React.FC<{ children: React.ReactNode; defaultTab?: string }> & {
  List: React.FC<{ children: React.ReactNode }>;
  Tab: React.FC<{ value: string; children: React.ReactNode }>;
  Panel: React.FC<{ value: string; children: React.ReactNode }>;
} = ({ children, defaultTab = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
};

// Tab List component
const TabsList: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="tabs-list" role="tablist">{children}</div>;
};

// Individual Tab component
const Tab: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab must be used within Tabs');
  
  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;
  
  return (
    <button
      className={`tab ${isActive ? 'active' : ''}`}
      onClick={() => setActiveTab(value)}
      role="tab"
      aria-selected={isActive}
    >
      {children}
    </button>
  );
};

// Tab Panel component
const TabPanel: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabPanel must be used within Tabs');
  
  const { activeTab } = context;
  
  if (activeTab !== value) return null;
  
  return (
    <div className="tab-panel" role="tabpanel">
      {children}
    </div>
  );
};

// Attach sub-components
Tabs.List = TabsList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

// Usage
const App: React.FC = () => (
  <Tabs defaultTab="profile">
    <Tabs.List>
      <Tabs.Tab value="profile">Profile</Tabs.Tab>
      <Tabs.Tab value="settings">Settings</Tabs.Tab>
      <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
    </Tabs.List>
    
    <Tabs.Panel value="profile">
      <UserProfile />
    </Tabs.Panel>
    <Tabs.Panel value="settings">
      <UserSettings />
    </Tabs.Panel>
    <Tabs.Panel value="notifications">
      <NotificationSettings />
    </Tabs.Panel>
  </Tabs>
);

// === RENDER PROPS PATTERN ===

interface MousePosition {
  x: number;
  y: number;
}

// Render props component for mouse tracking
const MouseTracker: React.FC<{
  children: (mouse: MousePosition) => React.ReactNode;
}> = ({ children }) => {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return <>{children(position)}</>;
};

// Usage with render props
const MouseDisplay: React.FC = () => (
  <MouseTracker>
    {({ x, y }) => (
      <div>
        <h2>Mouse Position</h2>
        <p>X: {x}, Y: {y}</p>
        <div
          style={{
            position: 'absolute',
            left: x - 10,
            top: y - 10,
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: 'red',
            pointerEvents: 'none'
          }}
        />
      </div>
    )}
  </MouseTracker>
);

// === HIGHER-ORDER COMPONENTS (HOC) ===

// HOC for loading states
function withLoading<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & { isLoading?: boolean }> {
  return ({ isLoading, ...props }) => {
    if (isLoading) {
      return (
        <div className="loading-spinner">
          <div className="spinner" />
          <p>Loading...</p>
        </div>
      );
    }
    
    return <Component {...(props as P)} />;
  };
}

// HOC for error handling
function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  return class extends React.Component<P, { hasError: boolean }> {
    constructor(props: P) {
      super(props);
      this.state = { hasError: false };
    }
    
    static getDerivedStateFromError(): { hasError: boolean } {
      return { hasError: true };
    }
    
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      console.error('Error caught by HOC:', error, errorInfo);
      // Log to error reporting service
    }
    
    render() {
      if (this.state.hasError) {
        return (
          <div className="error-fallback">
            <h2>Something went wrong</h2>
            <button onClick={() => this.setState({ hasError: false })}>
              Try again
            </button>
          </div>
        );
      }
      
      return <Component {...this.props} />;
    }
  };
}

// Usage of HOCs
const UserList = withErrorBoundary(withLoading<{ users: User[] }>(({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.id}>{user.name}</li>
    ))}
  </ul>
)));

// === CUSTOM HOOKS PATTERNS ===

// Custom hook for data fetching with caching
function useApiData<T>(url: string, options?: RequestInit): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check cache first
      const cacheKey = `api-cache-${url}`;
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        const { data: cachedData, timestamp } = JSON.parse(cached);
        // Use cached data if less than 5 minutes old
        if (Date.now() - timestamp < 5 * 60 * 1000) {
          setData(cachedData);
          setLoading(false);
          return;
        }
      }
      
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
      
      // Cache the result
      sessionStorage.setItem(cacheKey, JSON.stringify({
        data: result,
        timestamp: Date.now()
      }));
      
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [url, options]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return { data, loading, error, refetch: fetchData };
}

// Custom hook for form validation
function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validationRules: Partial<Record<keyof T, (value: any) => string | null>>
): {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isValid: boolean;
  handleChange: (field: keyof T, value: any) => void;
  handleSubmit: (onSubmit: (values: T) => void) => (e: React.FormEvent) => void;
  reset: () => void;
} {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Set<keyof T>>(new Set());
  
  const validateField = useCallback((field: keyof T, value: any): string | null => {
    const rule = validationRules[field];
    return rule ? rule(value) : null;
  }, [validationRules]);
  
  const handleChange = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    setTouched(prev => new Set(prev).add(field));
    
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error || undefined }));
  }, [validateField]);
  
  const isValid = useMemo(() => {
    return Object.values(errors).every(error => !error) && 
           Object.keys(validationRules).every(field => touched.has(field as keyof T));
  }, [errors, validationRules, touched]);
  
  const handleSubmit = useCallback((onSubmit: (values: T) => void) => {
    return (e: React.FormEvent) => {
      e.preventDefault();
      
      // Validate all fields
      const newErrors: Partial<Record<keyof T, string>> = {};
      let hasErrors = false;
      
      Object.keys(validationRules).forEach(field => {
        const error = validateField(field as keyof T, values[field as keyof T]);
        if (error) {
          newErrors[field as keyof T] = error;
          hasErrors = true;
        }
      });
      
      setErrors(newErrors);
      
      if (!hasErrors) {
        onSubmit(values);
      }
    };
  }, [values, validationRules, validateField]);
  
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched(new Set());
  }, [initialValues]);
  
  return { values, errors, isValid, handleChange, handleSubmit, reset };
}

// Usage of custom hooks
const UserForm: React.FC = () => {
  const { data: users, loading, error, refetch } = useApiData<User[]>('/api/users');
  
  const { values, errors, isValid, handleChange, handleSubmit, reset } = useFormValidation(
    { name: '', email: '', age: 0 },
    {
      name: (value: string) => value.length < 2 ? 'Name must be at least 2 characters' : null,
      email: (value: string) => !/\S+@\S+\.\S+/.test(value) ? 'Invalid email format' : null,
      age: (value: number) => value < 18 ? 'Must be at least 18 years old' : null
    }
  );
  
  const handleFormSubmit = (formData: typeof values) => {
    console.log('Submitting:', formData);
    // Submit logic here
    reset();
  };
  
  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={values.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        
        <div>
          <input
            type="email"
            placeholder="Email"
            value={values.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        
        <div>
          <input
            type="number"
            placeholder="Age"
            value={values.age}
            onChange={(e) => handleChange('age', parseInt(e.target.value))}
          />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>
        
        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
      
      <div>
        <h3>Existing Users:</h3>
        <button onClick={refetch}>Refresh</button>
        <ul>
          {users?.map(user => (
            <li key={user.id}>{user.name} - {user.email}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// === SUSPENSE AND ERROR BOUNDARIES ===

// Error boundary component
class ApiErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('API Error Boundary caught an error:', error, errorInfo);
    // Log to error reporting service (Sentry, etc.)
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Try again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Lazy loaded components with Suspense
const LazyDashboard = React.lazy(() => import('./Dashboard'));
const LazyProfilePage = React.lazy(() => import('./ProfilePage'));
const LazySettingsPage = React.lazy(() => import('./SettingsPage'));

// App with Suspense and Error Boundaries
const App: React.FC = () => {
  return (
    <Router>
      <ApiErrorBoundary>
        <Suspense fallback={<div className="loading">Loading page...</div>}>
          <Routes>
            <Route 
              path="/dashboard" 
              element={<LazyDashboard />} 
            />
            <Route 
              path="/profile" 
              element={<LazyProfilePage />} 
            />
            <Route 
              path="/settings" 
              element={<LazySettingsPage />} 
            />
          </Routes>
        </Suspense>
      </ApiErrorBoundary>
    </Router>
  );
};

// === CONTROLLED VS UNCONTROLLED COMPONENTS ===

// Controlled component (recommended)
const ControlledInput: React.FC = () => {
  const [value, setValue] = useState('');
  
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Controlled input"
    />
  );
};

// Uncontrolled component with ref
const UncontrolledInput: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = () => {
    if (inputRef.current) {
      console.log('Value:', inputRef.current.value);
    }
  };
  
  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        defaultValue="Initial value"
        placeholder="Uncontrolled input"
      />
      <button onClick={handleSubmit}>Get Value</button>
    </div>
  );
};
```

</div>

---

### Advanced TypeScript for React {#advanced-typescript-react}
<!-- tags: typescript, generics, advanced-types, react -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Advanced TypeScript techniques enhance React development with sophisticated type safety, better developer experience, and robust component APIs**. **Generic components**: reusable components with type parameters. **Discriminated unions**: type-safe state management and props variants. **Conditional types**: types that change based on conditions. **Template literal types**: type-safe string manipulation. **Utility types**: Pick, Omit, Partial, Required for component prop derivation. **Type guards**: runtime type checking functions. **Declaration merging**: extending third-party library types. **Module augmentation**: adding types to existing modules.

</div>

<div class="runnable-model" data-filter="typescript advanced">

**Runnable mental model**
```typescript
// === GENERIC COMPONENTS ===

// Generic list component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
  loading?: boolean;
  error?: string;
  emptyMessage?: string;
}

function List<T>({
  items,
  renderItem,
  keyExtractor,
  loading = false,
  error,
  emptyMessage = 'No items found'
}: ListProps<T>): React.ReactElement {
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  if (error) {
    return <div className="error">Error: {error}</div>;
  }
  
  if (items.length === 0) {
    return <div className="empty">{emptyMessage}</div>;
  }
  
  return (
    <ul className="list">
      {items.map((item, index) => (
        <li key={keyExtractor(item)} className="list-item">
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}

// Usage with type inference
interface User {
  id: number;
  name: string;
  email: string;
}

const UserList: React.FC<{ users: User[] }> = ({ users }) => (
  <List
    items={users}
    keyExtractor={(user) => user.id}
    renderItem={(user) => (
      <div>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    )}
    emptyMessage="No users found"
  />
);

// === DISCRIMINATED UNIONS ===

// State management with discriminated unions
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

// Component props with variants
type ButtonProps = 
  | {
      variant: 'primary';
      size: 'small' | 'medium' | 'large';
      onClick: () => void;
    }
  | {
      variant: 'link';
      href: string;
      target?: '_blank' | '_self';
    }
  | {
      variant: 'submit';
      form: string;
      disabled?: boolean;
    };

const Button: React.FC<ButtonProps & { children: React.ReactNode }> = (props) => {
  const baseClass = 'btn';
  
  switch (props.variant) {
    case 'primary':
      return (
        <button
          className={`${baseClass} ${baseClass}--${props.size}`}
          onClick={props.onClick}
        >
          {props.children}
        </button>
      );
    
    case 'link':
      return (
        <a
          className={`${baseClass} ${baseClass}--link`}
          href={props.href}
          target={props.target}
        >
          {props.children}
        </a>
      );
    
    case 'submit':
      return (
        <button
          className={`${baseClass} ${baseClass}--submit`}
          type="submit"
          form={props.form}
          disabled={props.disabled}
        >
          {props.children}
        </button>
      );
  }
};

// Usage with type safety
const App: React.FC = () => (
  <div>
    <Button variant="primary" size="large" onClick={() => console.log('clicked')}>
      Primary Button
    </Button>
    
    <Button variant="link" href="https://example.com" target="_blank">
      Link Button
    </Button>
    
    <Button variant="submit" form="user-form">
      Submit
    </Button>
  </div>
);

// === CONDITIONAL TYPES ===

// Conditional types for component props
type ConditionalProps<T extends 'button' | 'link'> = T extends 'button'
  ? {
      type: 'button';
      onClick: () => void;
      disabled?: boolean;
    }
  : {
      type: 'link';
      href: string;
      target?: string;
    };

// Generic component with conditional props
function ActionElement<T extends 'button' | 'link'>(
  props: ConditionalProps<T> & {
    children: React.ReactNode;
    className?: string;
  }
): React.ReactElement {
  if (props.type === 'button') {
    const buttonProps = props as ConditionalProps<'button'> & {
      children: React.ReactNode;
      className?: string;
    };
    
    return (
      <button
        onClick={buttonProps.onClick}
        disabled={buttonProps.disabled}
        className={buttonProps.className}
      >
        {buttonProps.children}
      </button>
    );
  } else {
    const linkProps = props as ConditionalProps<'link'> & {
      children: React.ReactNode;
      className?: string;
    };
    
    return (
      <a
        href={linkProps.href}
        target={linkProps.target}
        className={linkProps.className}
      >
        {linkProps.children}
      </a>
    );
  }
}

// === UTILITY TYPES FOR COMPONENT PROPS ===

// Base component
interface BaseInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  'aria-label'?: string;
}

// Derived components using utility types
type TextInputProps = Pick<BaseInputProps, 'id' | 'name' | 'value' | 'onChange' | 'placeholder'> & {
  type: 'text' | 'email' | 'password';
  maxLength?: number;
};

type NumberInputProps = Omit<BaseInputProps, 'value' | 'onChange'> & {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

type OptionalInputProps = Partial<BaseInputProps> & {
  id: string; // Keep id required
};

// Component using derived props
const TextInput: React.FC<TextInputProps> = ({
  type,
  maxLength,
  ...baseProps
}) => (
  <input
    type={type}
    maxLength={maxLength}
    {...baseProps}
  />
);

// === TYPE GUARDS ===

// Type guard functions
function isUser(obj: any): obj is User {
  return obj && typeof obj.id === 'number' && typeof obj.name === 'string';
}

function isError(obj: any): obj is Error {
  return obj instanceof Error;
}

// Component using type guards
const DataDisplay: React.FC<{ data: unknown }> = ({ data }) => {
  if (isUser(data)) {
    return (
      <div>
        <h2>User: {data.name}</h2>
        <p>ID: {data.id}</p>
      </div>
    );
  }
  
  if (isError(data)) {
    return (
      <div className="error">
        Error: {data.message}
      </div>
    );
  }
  
  return <div>Unknown data type</div>;
};

// === TEMPLATE LITERAL TYPES ===

// CSS-in-JS with type safety
type Size = 'sm' | 'md' | 'lg';
type Color = 'primary' | 'secondary' | 'danger';
type Variant = 'solid' | 'outline' | 'ghost';

type ButtonClass = `btn-${Size}-${Color}-${Variant}`;

// Generated CSS classes are type-safe
const validClass: ButtonClass = 'btn-md-primary-solid'; // ✅ Valid
// const invalidClass: ButtonClass = 'btn-xl-red-filled'; // ❌ TypeScript error

interface StyledButtonProps {
  size: Size;
  color: Color;
  variant: Variant;
  children: React.ReactNode;
}

const StyledButton: React.FC<StyledButtonProps> = ({ size, color, variant, children }) => {
  const className: ButtonClass = `btn-${size}-${color}-${variant}`;
  
  return <button className={className}>{children}</button>;
};

// === DECLARATION MERGING ===

// Extending third-party library types
declare module 'react' {
  interface CSSProperties {
    '--custom-property'?: string;
  }
}

// Now custom CSS properties are type-safe
const StyledDiv: React.FC = () => (
  <div style={{ '--custom-property': 'value', color: 'red' }}>
    Custom styled div
  </div>
);

// === ADVANCED HOOK TYPES ===

// Generic hook with constraints
function useLocalStorage<T extends string | number | boolean | object>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  });
  
  const setStoredValue = useCallback((newValue: T) => {
    try {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [key]);
  
  return [value, setStoredValue];
}

// Hook with complex return type
type FetchResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

function useFetch<T>(url: string): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      if (!response.ok) throw new Error(response.statusText);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [url]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return { data, loading, error, refetch: fetchData };
}

// === CONTEXT WITH ADVANCED TYPES ===

// Theme context with strict typing
interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setCustomTheme: (theme: Partial<Theme>) => void;
} | null;

const ThemeContext = React.createContext<ThemeContextType>(null);

// Custom hook with proper error handling
function useTheme(): NonNullable<ThemeContextType> {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Provider component
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === lightTheme ? darkTheme : lightTheme);
  }, []);
  
  const setCustomTheme = useCallback((customTheme: Partial<Theme>) => {
    setTheme(prev => ({ ...prev, ...customTheme }));
  }, []);
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setCustomTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Usage with full type safety
const ThemedComponent: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}>
      <h1>Themed Component</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};
```

</div>

---

### Node.js Enterprise Patterns {#nodejs-enterprise-patterns}
<!-- tags: nodejs, enterprise, patterns, microservices -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Enterprise Node.js patterns address scalability, maintainability, and reliability concerns in production systems**. **Layered architecture**: separation of concerns with controllers, services, repositories. **Dependency injection**: inversion of control for testability and modularity. **Configuration management**: environment-specific settings with validation. **Error handling**: centralized error processing and logging. **Health checks**: application monitoring and readiness probes. **Rate limiting**: API protection against abuse. **Caching strategies**: memory, Redis, CDN integration. **Message queues**: asynchronous processing with Redis, RabbitMQ. **Database patterns**: connection pooling, transactions, migrations.

</div>

<div class="runnable-model" data-filter="nodejs enterprise">

**Runnable mental model**
```typescript
// === LAYERED ARCHITECTURE ===

// Domain models
interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateUserDto {
  email: string;
  name: string;
}

interface UpdateUserDto {
  name?: string;
}

// Repository layer (data access)
interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(userData: CreateUserDto): Promise<User>;
  update(id: string, userData: UpdateUserDto): Promise<User | null>;
  delete(id: string): Promise<boolean>;
  findAll(limit: number, offset: number): Promise<User[]>;
}

class PostgresUserRepository implements UserRepository {
  constructor(private db: any) {}
  
  async findById(id: string): Promise<User | null> {
    const result = await this.db.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
  }
  
  async findByEmail(email: string): Promise<User | null> {
    const result = await this.db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
  }
  
  async create(userData: CreateUserDto): Promise<User> {
    const id = crypto.randomUUID();
    const now = new Date();
    
    const result = await this.db.query(
      'INSERT INTO users (id, email, name, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id, userData.email, userData.name, now, now]
    );
    
    return result.rows[0];
  }
  
  async update(id: string, userData: UpdateUserDto): Promise<User | null> {
    const updates = Object.keys(userData)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');
    
    if (!updates) return null;
    
    const values = [id, ...Object.values(userData), new Date()];
    const result = await this.db.query(
      `UPDATE users SET ${updates}, updated_at = $${values.length} WHERE id = $1 RETURNING *`,
      values
    );
    
    return result.rows[0] || null;
  }
  
  async delete(id: string): Promise<boolean> {
    const result = await this.db.query('DELETE FROM users WHERE id = $1', [id]);
    return result.rowCount > 0;
  }
  
  async findAll(limit: number, offset: number): Promise<User[]> {
    const result = await this.db.query(
      'SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    return result.rows;
  }
}

// Service layer (business logic)
class UserService {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService,
    private logger: Logger
  ) {}
  
  async createUser(userData: CreateUserDto): Promise<User> {
    // Business logic validation
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }
    
    // Email validation
    if (!this.isValidEmail(userData.email)) {
      throw new ValidationError('Invalid email format');
    }
    
    try {
      const user = await this.userRepository.create(userData);
      
      // Send welcome email asynchronously
      this.emailService.sendWelcomeEmail(user.email, user.name)
        .catch(error => this.logger.error('Failed to send welcome email', { error, userId: user.id }));
      
      this.logger.info('User created successfully', { userId: user.id });
      return user;
      
    } catch (error) {
      this.logger.error('Failed to create user', { error, userData });
      throw new InternalServerError('Failed to create user');
    }
  }
  
  async getUserById(id: string): Promise<User> {
    if (!this.isValidUUID(id)) {
      throw new ValidationError('Invalid user ID format');
    }
    
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    
    return user;
  }
  
  async updateUser(id: string, userData: UpdateUserDto): Promise<User> {
    const existingUser = await this.getUserById(id);
    
    const updatedUser = await this.userRepository.update(id, userData);
    if (!updatedUser) {
      throw new InternalServerError('Failed to update user');
    }
    
    this.logger.info('User updated successfully', { userId: id, changes: userData });
    return updatedUser;
  }
  
  async deleteUser(id: string): Promise<void> {
    await this.getUserById(id); // Verify user exists
    
    const deleted = await this.userRepository.delete(id);
    if (!deleted) {
      throw new InternalServerError('Failed to delete user');
    }
    
    this.logger.info('User deleted successfully', { userId: id });
  }
  
  async getUsers(page: number = 1, pageSize: number = 10): Promise<{ users: User[]; total: number }> {
    const offset = (page - 1) * pageSize;
    const users = await this.userRepository.findAll(pageSize, offset);
    
    // In a real app, you'd get total count from repository
    const total = users.length;
    
    return { users, total };
  }
  
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  private isValidUUID(id: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  }
}

// Controller layer (HTTP handling)
class UserController {
  constructor(
    private userService: UserService,
    private logger: Logger
  ) {}
  
  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData: CreateUserDto = req.body;
      const user = await this.userService.createUser(userData);
      
      res.status(201).json({
        success: true,
        data: user,
        message: 'User created successfully'
      });
    } catch (error) {
      next(error);
    }
  }
  
  async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);
      
      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  }
  
  async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const userData: UpdateUserDto = req.body;
      const user = await this.userService.updateUser(id, userData);
      
      res.json({
        success: true,
        data: user,
        message: 'User updated successfully'
      });
    } catch (error) {
      next(error);
    }
  }
  
  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.userService.deleteUser(id);
      
      res.json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
  
  async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      
      const result = await this.userService.getUsers(page, pageSize);
      
      res.json({
        success: true,
        data: result.users,
        pagination: {
          page,
          pageSize,
          total: result.total,
          totalPages: Math.ceil(result.total / pageSize)
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

// === DEPENDENCY INJECTION CONTAINER ===

interface Dependencies {
  database: any;
  redisClient: any;
  logger: Logger;
  config: Config;
}

class DIContainer {
  private services = new Map<string, any>();
  
  constructor(private deps: Dependencies) {
    this.register();
  }
  
  private register(): void {
    // Register repositories
    this.services.set('userRepository', new PostgresUserRepository(this.deps.database));
    
    // Register services
    this.services.set('emailService', new EmailService(this.deps.config.email, this.deps.logger));
    this.services.set('userService', new UserService(
      this.get('userRepository'),
      this.get('emailService'),
      this.deps.logger
    ));
    
    // Register controllers
    this.services.set('userController', new UserController(
      this.get('userService'),
      this.deps.logger
    ));
  }
  
  get<T>(serviceName: string): T {
    const service = this.services.get(serviceName);
    if (!service) {
      throw new Error(`Service ${serviceName} not found`);
    }
    return service;
  }
}

// === CONFIGURATION MANAGEMENT ===

interface Config {
  port: number;
  database: {
    host: string;
    port: number;
    name: string;
    username: string;
    password: string;
  };
  redis: {
    host: string;
    port: number;
    password?: string;
  };
  email: {
    host: string;
    port: number;
    username: string;
    password: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
  rateLimiting: {
    windowMs: number;
    maxRequests: number;
  };
}

class ConfigService {
  private config: Config;
  
  constructor() {
    this.config = this.loadConfig();
    this.validateConfig();
  }
  
  private loadConfig(): Config {
    return {
      port: parseInt(process.env.PORT || '3000'),
      database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        name: process.env.DB_NAME || 'app_db',
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || ''
      },
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD
      },
      email: {
        host: process.env.EMAIL_HOST || '',
        port: parseInt(process.env.EMAIL_PORT || '587'),
        username: process.env.EMAIL_USERNAME || '',
        password: process.env.EMAIL_PASSWORD || ''
      },
      jwt: {
        secret: process.env.JWT_SECRET || 'default-secret',
        expiresIn: process.env.JWT_EXPIRES_IN || '1h'
      },
      rateLimiting: {
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
        maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100')
      }
    };
  }
  
  private validateConfig(): void {
    const required = [
      'DB_HOST', 'DB_NAME', 'DB_USERNAME', 'DB_PASSWORD',
      'JWT_SECRET', 'EMAIL_HOST', 'EMAIL_USERNAME', 'EMAIL_PASSWORD'
    ];
    
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
    
    if (this.config.jwt.secret === 'default-secret' && process.env.NODE_ENV === 'production') {
      throw new Error('JWT_SECRET must be set in production');
    }
  }
  
  get(): Config {
    return this.config;
  }
}

// === ERROR HANDLING ===

abstract class AppError extends Error {
  abstract statusCode: number;
  abstract isOperational: boolean;
  
  constructor(message: string, public code?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

class ValidationError extends AppError {
  statusCode = 400;
  isOperational = true;
}

class NotFoundError extends AppError {
  statusCode = 404;
  isOperational = true;
}

class ConflictError extends AppError {
  statusCode = 409;
  isOperational = true;
}

class InternalServerError extends AppError {
  statusCode = 500;
  isOperational = true;
}

// Global error handler middleware
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      error: {
        message: error.message,
        code: error.code
      }
    });
  } else {
    // Log unexpected errors
    console.error('Unexpected error:', error);
    
    res.status(500).json({
      success: false,
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_ERROR'
      }
    });
  }
};

// === HEALTH CHECKS ===

interface HealthCheck {
  name: string;
  check: () => Promise<boolean>;
}

class HealthService {
  private checks: HealthCheck[] = [];
  
  addCheck(check: HealthCheck): void {
    this.checks.push(check);
  }
  
  async getHealth(): Promise<{ status: 'healthy' | 'unhealthy'; checks: any[] }> {
    const checkResults = await Promise.allSettled(
      this.checks.map(async (check) => ({
        name: check.name,
        status: await check.check() ? 'healthy' : 'unhealthy'
      }))
    );
    
    const results = checkResults.map((result, index) => ({
      name: this.checks[index].name,
      status: result.status === 'fulfilled' ? result.value.status : 'unhealthy'
    }));
    
    const allHealthy = results.every(result => result.status === 'healthy');
    
    return {
      status: allHealthy ? 'healthy' : 'unhealthy',
      checks: results
    };
  }
}

// === RATE LIMITING ===

import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';

const createRateLimiter = (redisClient: any, config: Config['rateLimiting']) => {
  return rateLimit({
    store: new RedisStore({
      client: redisClient,
      prefix: 'rate_limit:'
    }),
    windowMs: config.windowMs,
    max: config.maxRequests,
    message: {
      success: false,
      error: {
        message: 'Too many requests',
        code: 'RATE_LIMIT_EXCEEDED'
      }
    },
    standardHeaders: true,
    legacyHeaders: false
  });
};

// === APPLICATION SETUP ===

class Application {
  private app: Express;
  private container: DIContainer;
  private healthService: HealthService;
  
  constructor(private config: Config) {
    this.app = express();
    this.setupMiddleware();
    this.setupDependencies();
    this.setupRoutes();
    this.setupErrorHandling();
    this.setupHealthChecks();
  }
  
  private setupMiddleware(): void {
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(helmet());
    
    // Rate limiting
    const rateLimiter = createRateLimiter(redisClient, this.config.rateLimiting);
    this.app.use('/api/', rateLimiter);
  }
  
  private setupDependencies(): void {
    const dependencies: Dependencies = {
      database: db, // PostgreSQL connection
      redisClient: redisClient,
      logger: logger,
      config: this.config
    };
    
    this.container = new DIContainer(dependencies);
  }
  
  private setupRoutes(): void {
    const userController = this.container.get<UserController>('userController');
    
    const router = express.Router();
    
    router.post('/users', userController.createUser.bind(userController));
    router.get('/users/:id', userController.getUser.bind(userController));
    router.put('/users/:id', userController.updateUser.bind(userController));
    router.delete('/users/:id', userController.deleteUser.bind(userController));
    router.get('/users', userController.getUsers.bind(userController));
    
    this.app.use('/api', router);
  }
  
  private setupErrorHandling(): void {
    this.app.use(errorHandler);
  }
  
  private setupHealthChecks(): void {
    this.healthService = new HealthService();
    
    // Database health check
    this.healthService.addCheck({
      name: 'database',
      check: async () => {
        try {
          await db.query('SELECT 1');
          return true;
        } catch {
          return false;
        }
      }
    });
    
    // Redis health check
    this.healthService.addCheck({
      name: 'redis',
      check: async () => {
        try {
          await redisClient.ping();
          return true;
        } catch {
          return false;
        }
      }
    });
    
    this.app.get('/health', async (req, res) => {
      const health = await this.healthService.getHealth();
      res.status(health.status === 'healthy' ? 200 : 503).json(health);
    });
  }
  
  start(): void {
    this.app.listen(this.config.port, () => {
      console.log(`Server running on port ${this.config.port}`);
    });
  }
}

// Bootstrap application
const config = new ConfigService().get();
const app = new Application(config);
app.start();
```

</div>

Modern frontend development with React, TypeScript, and Node.js provides a comprehensive foundation for building production-ready applications. This extensive guide covers the full spectrum from basic concepts to advanced deployment strategies.

**Core Technologies**: React's component-based architecture with hooks enables sophisticated UI development, TypeScript adds compile-time safety and enhanced developer experience, Node.js provides server-side JavaScript capabilities for full-stack development.

**Advanced Features**: Progressive Web Apps (PWAs) with service workers and offline functionality, comprehensive web security implementation, modern JavaScript Browser APIs for rich interactions, sophisticated state management with Redux Toolkit and Zustand, React Query for server state management.

**Development Workflow**: Modern build tools like Vite for fast development cycles, comprehensive testing strategies covering unit, integration, and end-to-end testing, performance optimization techniques, accessibility compliance.

**Production Readiness**: Containerization with Docker, Kubernetes orchestration, CI/CD pipelines with automated testing and deployment, monitoring and observability with metrics and logging, feature flags for progressive rollouts.

The ecosystem encompasses professional-grade development practices including comprehensive testing frameworks, performance monitoring tools, security best practices, scalable deployment strategies, and modern DevOps integration that enable building and maintaining large-scale applications with confidence.

---

### Modern Frontend Architecture {#modern-frontend-architecture}
<!-- tags: architecture, scalability, micro-frontends, module-federation -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Modern frontend architecture patterns enable scalable, maintainable applications through modular design, code splitting, and deployment strategies**. **Micro-frontends**: decompose frontend into smaller, independently deployable applications. **Module Federation**: Webpack feature enabling dynamic code sharing between applications. **Monorepo strategies**: managing multiple related applications in single repository. **Component libraries**: shared design systems across teams. **State management patterns**: centralized vs distributed state, server state vs client state. **Build optimization**: code splitting, tree shaking, bundle analysis. **Progressive enhancement**: graceful degradation for various devices and network conditions.

</div>

<div class="runnable-model" data-filter="architecture">

**Runnable mental model**
```typescript
// === MICRO-FRONTENDS WITH MODULE FEDERATION ===

// Host application (main shell)
// webpack.config.js
const ModuleFederationPlugin = require('@module-federation/webpack');

module.exports = {
  mode: 'development',
  devServer: {
    port: 3000,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        userModule: 'userModule@http://localhost:3001/remoteEntry.js',
        productModule: 'productModule@http://localhost:3002/remoteEntry.js',
        cartModule: 'cartModule@http://localhost:3003/remoteEntry.js',
      },
    }),
  ],
};

// Host app shell
const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState('/dashboard');
  
  return (
    <div className="app">
      <Header onNavigate={setCurrentRoute} />
      <Sidebar currentRoute={currentRoute} onNavigate={setCurrentRoute} />
      
      <main className="content">
        <React.Suspense fallback={<div>Loading...</div>}>
          {currentRoute === '/users' && <UserModule />}
          {currentRoute === '/products' && <ProductModule />}
          {currentRoute === '/cart' && <CartModule />}
          {currentRoute === '/dashboard' && <Dashboard />}
        </React.Suspense>
      </main>
    </div>
  );
};

// Dynamically imported micro-frontend
const UserModule = React.lazy(() => import('userModule/UserApp'));
const ProductModule = React.lazy(() => import('productModule/ProductApp'));
const CartModule = React.lazy(() => import('cartModule/CartApp'));

// === COMPONENT LIBRARY ARCHITECTURE ===

// Design system tokens
export const tokens = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      900: '#1e3a8a',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      500: '#6b7280',
      900: '#111827',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', '1rem'],
      sm: ['0.875rem', '1.25rem'],
      base: ['1rem', '1.5rem'],
      lg: ['1.125rem', '1.75rem'],
      xl: ['1.25rem', '1.75rem'],
    },
  },
};

// Base component with design system
interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

const Button = React.forwardRef<
  HTMLButtonElement,
  BaseProps & {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
  }
>(({ className, children, variant = 'primary', size = 'md', disabled, loading, onClick }, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
});

// === STATE MANAGEMENT ARCHITECTURE ===

// Global state management with Zustand
interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  
  // UI state
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  notifications: Notification[];
  
  // Data state
  users: User[];
  products: Product[];
  
  // Loading states
  loading: {
    users: boolean;
    products: boolean;
    auth: boolean;
  };
  
  // Actions
  setUser: (user: User | null) => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  setUsers: (users: User[]) => void;
  setProducts: (products: Product[]) => void;
  setLoading: (key: keyof AppState['loading'], value: boolean) => void;
}

const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  theme: 'light',
  sidebarOpen: false,
  notifications: [],
  users: [],
  products: [],
  loading: {
    users: false,
    products: false,
    auth: false,
  },
  
  // Actions
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light' 
  })),
  
  toggleSidebar: () => set((state) => ({ 
    sidebarOpen: !state.sidebarOpen 
  })),
  
  addNotification: (notification) => set((state) => ({
    notifications: [
      ...state.notifications,
      { ...notification, id: crypto.randomUUID() }
    ]
  })),
  
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
  
  setUsers: (users) => set({ users }),
  setProducts: (products) => set({ products }),
  
  setLoading: (key, value) => set((state) => ({
    loading: { ...state.loading, [key]: value }
  })),
}));

// === BUILD OPTIMIZATION ===

// Webpack configuration for optimization
const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/index.tsx',
    vendor: ['react', 'react-dom', 'react-router-dom'],
  },
  
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 5,
          reuseExistingChunk: true,
        },
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
          chunks: 'all',
          priority: 20,
        },
      },
    },
    usedExports: true,
    sideEffects: false,
  },
  
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'bundle-report.html',
    }),
  ],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
    },
  },
};

// Progressive enhancement component
const ProgressiveImage: React.FC<{
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
}> = ({ src, alt, placeholder, className }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  return (
    <div className={`progressive-image ${className}`}>
      {!loaded && placeholder && (
        <img
          src={placeholder}
          alt={alt}
          className="placeholder blur-sm"
        />
      )}
      <img
        src={src}
        alt={alt}
        className={`main-image transition-opacity ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        loading="lazy"
      />
      {error && (
        <div className="error-placeholder bg-gray-200 flex items-center justify-center">
          <span>Failed to load image</span>
        </div>
      )}
    </div>
  );
};

// Responsive design hook
const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return {
    ...windowSize,
    isMobile: windowSize.width < 768,
    isTablet: windowSize.width >= 768 && windowSize.width < 1024,
    isDesktop: windowSize.width >= 1024,
  };
};
```

</div>

*Notice: Modern frontend architecture requires careful balance between complexity and maintainability. Start simple and evolve based on actual needs.*

</div>

## Summary

Modern frontend development with React, TypeScript, and Node.js provides a comprehensive foundation for building production-ready applications. This extensive guide covers the full spectrum from basic concepts to advanced deployment strategies.

**Core Technologies**: React's component-based architecture with hooks enables sophisticated UI development, TypeScript adds compile-time safety and enhanced developer experience, Node.js provides server-side JavaScript capabilities for full-stack development.

**Advanced Patterns**: React patterns like compound components, render props, and custom hooks enable flexible and reusable component design. Advanced TypeScript features provide robust type safety for complex applications. Enterprise Node.js patterns ensure scalable and maintainable backend services.

**Modern Architecture**: Micro-frontends and module federation enable independent team development and deployment. Component libraries provide consistent design systems. Sophisticated state management balances local and global state needs.

**Performance & Optimization**: Build optimization with code splitting and tree shaking reduces bundle sizes. Progressive enhancement ensures accessibility across devices and network conditions. Advanced monitoring provides insights into application performance.

**Development Workflow**: Modern build tools like Vite for fast development cycles, comprehensive testing strategies covering unit, integration, and end-to-end testing, performance optimization techniques, accessibility compliance.

**Production Readiness**: Containerization with Docker, Kubernetes orchestration, CI/CD pipelines with automated testing and deployment, monitoring and observability with metrics and logging, feature flags for progressive rollouts.

The ecosystem encompasses professional-grade development practices including comprehensive testing frameworks, performance monitoring tools, security best practices, scalable deployment strategies, and modern DevOps integration that enable building and maintaining large-scale applications with confidence.