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

<div class="concept-section mental-model" data-filter="nodejs junior">

🚀 **Think of it this way**  
*Node.js is like bringing JavaScript out of the browser's sandbox: it lets you run JavaScript on servers, build APIs, and create full-stack applications with one language.*

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

<div class="concept-section mental-model" data-filter="react junior">

⚛️ **Think of it this way**  
*React is like building with LEGO blocks: you create small, reusable components that snap together to build complex user interfaces. Each component manages its own state and behavior.*

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

<div class="concept-section mental-model" data-filter="typescript junior">

🛡️ **Think of it this way**  
*TypeScript is like adding a spell-checker to your code: it catches mistakes before they become runtime errors, and helps your IDE provide better suggestions and refactoring.*

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

## Summary

Modern frontend development with React, TypeScript, and Node.js provides a powerful foundation for building scalable, type-safe applications. Node.js enables full-stack JavaScript development with server-side capabilities, React offers component-based UI architecture with hooks for state management, and TypeScript adds compile-time type safety and enhanced developer experience.

Key concepts include React component patterns, custom hooks for reusable logic, TypeScript interfaces and generics for type safety, form handling with validation, API integration with proper error handling, and performance optimization techniques. The ecosystem includes modern tooling for development, testing, and deployment.