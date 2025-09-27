# Frontend (React, TypeScript, Node.js)

## Rövid összefoglaló

A modern frontend fejlesztés React, TypeScript és Node.js ökoszisztémára épül. React komponens-alapú UI library, TypeScript típusbiztonságot nyújt JavaScript-hez, Node.js pedig server-side JavaScript futtatási környezet. Modern tooling: npm/yarn, Webpack/Vite, ESLint, Prettier. UI library-k: Tailwind CSS, shadcn/ui, Material-UI. State management: React hooks, Redux, Zustand. Tesztelés: Jest, React Testing Library, Cypress. Fő kihívások: state management, performance optimalizáció és bundle size kezelés.

## Fogalmak

### Node.js {#node-js}
Server-side JavaScript runtime environment, amely lehetővé teszi JavaScript futtatását a böngészőn kívül.

**Példa:**
```javascript
// server.js - Express szerver
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/api/users', async (req, res) => {
    try {
        const users = await fs.readFile('users.json', 'utf8');
        res.json(JSON.parse(users));
    } catch (error) {
        res.status(500).json({ error: 'Failed to read users' });
    }
});

app.post('/api/users', async (req, res) => {
    const { name, email } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email required' });
    }
    
    const newUser = { id: Date.now(), name, email, createdAt: new Date() };
    
    try {
        const users = JSON.parse(await fs.readFile('users.json', 'utf8'));
        users.push(newUser);
        await fs.writeFile('users.json', JSON.stringify(users, null, 2));
        
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// package.json
{
  "name": "my-node-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^2.0.0",
    "jest": "^29.0.0"
  }
}
```

Magyarázat: Node.js event-driven, non-blocking I/O modellt használ, amely kiválóan skálázható web alkalmazásokhoz.

### npm {#npm}
Node Package Manager - JavaScript csomagkezelő és dependency management rendszer.

**Példa:**
```bash
# Projekt inicializálás
npm init -y

# Package telepítés
npm install express
npm install --save-dev jest nodemon

# Global package
npm install -g create-react-app

# Package frissítés
npm update

# Biztonsági audit
npm audit
npm audit fix

# Script futtatás
npm run dev
npm test

# Yarn alternatíva (gyorsabb, determinisztikus)
yarn add express
yarn add --dev jest
yarn install
yarn start
```

```json
// package.json - dependency management
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint src/**/*.{js,jsx,ts,tsx}",
    "format": "prettier --write src/**/*.{js,jsx,ts,tsx}"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.4.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "typescript": "^4.9.0",
    "eslint": "^8.45.0",
    "prettier": "^2.8.0"
  },
  "engines": {
    "node": ">=16.0.0",
    "npm": ">=8.0.0"
  }
}
```

Magyarázat: npm kezeli a dependencies-eket, scripts-eket és biztosítja a reprodukálható build-eket a lock fájlokkal.

### React component {#react-component}
Újrafelhasználható UI elemek, amelyek props-okat fogadnak és JSX-et renderelnek.

**Példa:**
```jsx
// Functional component with hooks
import React, { useState, useEffect } from 'react';

// Props interface TypeScript-tel
interface User {
  id: number;
  name: string;
  email: string;
}

interface UserCardProps {
  user: User;
  onDelete: (id: number) => void;
}

// Component definition
const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`user-card ${isExpanded ? 'expanded' : ''}`}>
      <div className="user-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h3>{user.name}</h3>
        <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
      </div>
      
      {isExpanded && (
        <div className="user-details">
          <p>Email: {user.email}</p>
          <button
            onClick={() => onDelete(user.id)}
            className="delete-btn"
          >
            Delete User
          </button>
        </div>
      )}
    </div>
  );
};

// Parent component használja
const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const userData = await response.json();
      setUsers(userData);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await fetch(`/api/users/${id}`, { method: 'DELETE' });
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="user-list">
      <h2>Users ({users.length})</h2>
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
          onDelete={handleDeleteUser}
        />
      ))}
    </div>
  );
};

export default UserList;
```

Magyarázat: React komponensek encapsulate-álják a UI logikát és state-et, lehetővé téve a moduláris fejlesztést.

### Props/State {#props-state}
Props: komponensek közötti adatátvitel. State: komponens belső állapota.

**Példa:**
```jsx
// State management with useState
import React, { useState } from 'react';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  // State hooks
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // State management functions
  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: TodoItem = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Computed values (derived state)
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active': return !todo.completed;
      case 'completed': return todo.completed;
      default: return true;
    }
  });

  const remainingCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      
      {/* Input section */}
      <div className="todo-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {/* Filter buttons */}
      <div className="todo-filters">
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
          Active ({remainingCount})
        </button>
        <button
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed ({todos.length - remainingCount})
        </button>
      </div>

      {/* Todo list */}
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
};

// Child component receiving props
interface TodoListProps {
  todos: TodoItem[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  if (todos.length === 0) {
    return <p className="no-todos">No todos found</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItemComponent
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

interface TodoItemProps {
  todo: TodoItem;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItemComponent: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className="todo-text">{todo.text}</span>
      <button
        onClick={() => onDelete(todo.id)}
        className="delete-btn"
      >
        ×
      </button>
    </li>
  );
};
```

Magyarázat: State a komponens belső adatait kezeli, props pedig az adatok áramlását biztosítja komponensek között.

### Hooks (useState, useEffect) {#hooks-usestate-useeffect}
React hooks lehetővé teszik state és lifecycle funkciók használatát functional komponensekben.

**Példa:**
```jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Custom hook példa
const useApi = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
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
};

// Hook használata komponensben
interface User {
  id: number;
  name: string;
  email: string;
  posts?: Post[];
}

interface Post {
  id: number;
  title: string;
  content: string;
}

const UserProfile: React.FC<{ userId: number }> = ({ userId }) => {
  // API hívás custom hook-kal
  const { 
    data: user, 
    loading: userLoading, 
    error: userError 
  } = useApi<User>(`/api/users/${userId}`);

  // Local state hooks
  const [showPosts, setShowPosts] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Effect hook - cleanup példa
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowPosts(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  // Memoized calculations
  const filteredPosts = useMemo(() => {
    if (!user?.posts || !searchTerm) return user?.posts || [];
    
    return user.posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [user?.posts, searchTerm]);

  // Callback hook - megakadályozza újra renderelést
  const handleTogglePosts = useCallback(() => {
    setShowPosts(prev => !prev);
  }, []);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  if (userLoading) return <div>Loading user...</div>;
  if (userError) return <div>Error: {userError}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile">
      <div className="user-header">
        <h1>{user.name}</h1>
        <p>{user.email}</p>
        
        <button onClick={handleTogglePosts}>
          {showPosts ? 'Hide Posts' : 'Show Posts'}
        </button>
      </div>

      {showPosts && (
        <div className="user-posts">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {filteredPosts.length > 0 ? (
            <div className="posts-list">
              {filteredPosts.map(post => (
                <div key={post.id} className="post-card">
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No posts found</p>
          )}
        </div>
      )}
    </div>
  );
};

// Hook kombinációk - form handling
const useForm = <T extends Record<string, any>>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<T>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const handleChange = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleBlur = useCallback((name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const validate = useCallback((validationSchema: Record<keyof T, (value: any) => string | undefined>) => {
    const newErrors: Partial<T> = {};
    
    Object.keys(validationSchema).forEach(key => {
      const error = validationSchema[key as keyof T](values[key as keyof T]);
      if (error) {
        newErrors[key as keyof T] = error as any;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return { values, errors, touched, handleChange, handleBlur, validate, reset };
};
```

Magyarázat: Hooks lehetővé teszik state-ful logika újrafelhasználását és a component lifecycle kezelését functional komponensekben.

### Állapotkezelés (Redux, Zustand, React Query) {#allapotkezeles-redux-zustand-react-query}
Komplex alkalmazások state management-je különböző library-kkel.

**Példa:**
```typescript
// Redux Toolkit (modern Redux)
import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API slice
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => 'users',
      providesTags: ['User'],
    }),
    createUser: builder.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: 'users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

// State slice
interface CounterState {
  value: number;
  loading: boolean;
}

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0, loading: false } as CounterState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

// Store configuration
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    usersApi: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

// Zustand (egyszerűbb alternatíva)
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  fetchUsers: () => Promise<void>;
  setCurrentUser: (user: User) => void;
  addUser: (user: User) => void;
  removeUser: (id: number) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      loading: false,
      
      fetchUsers: async () => {
        set({ loading: true });
        try {
          const response = await fetch('/api/users');
          const users = await response.json();
          set({ users, loading: false });
        } catch (error) {
          console.error('Failed to fetch users:', error);
          set({ loading: false });
        }
      },
      
      setCurrentUser: (user) => set({ currentUser: user }),
      
      addUser: (user) => set((state) => ({ 
        users: [...state.users, user] 
      })),
      
      removeUser: (id) => set((state) => ({ 
        users: state.users.filter(user => user.id !== id) 
      })),
    }),
    {
      name: 'user-storage', // localStorage key
    }
  )
);

// React Query (Server State Management)
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<User[]> => {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (newUser: Partial<User>): Promise<User> => {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      
      return response.json();
    },
    onSuccess: (newUser) => {
      // Optimistic update
      queryClient.setQueryData<User[]>(['users'], (oldUsers = []) => [
        ...oldUsers,
        newUser,
      ]);
      
      // Or invalidate to refetch
      // queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

// Component using different state management approaches
const UserManagement: React.FC = () => {
  // Redux
  const dispatch = useDispatch();
  const counter = useSelector((state: RootState) => state.counter.value);
  
  // Zustand
  const { users, addUser, removeUser } = useUserStore();
  
  // React Query
  const { data: apiUsers, isLoading, error } = useUsers();
  const createUserMutation = useCreateUser();

  const handleCreateUser = () => {
    createUserMutation.mutate({
      name: 'New User',
      email: 'new@example.com'
    });
  };

  return (
    <div>
      <h2>Redux Counter: {counter}</h2>
      <button onClick={() => dispatch(counterSlice.actions.increment())}>
        Increment
      </button>
      
      <h2>Zustand Users: {users.length}</h2>
      
      <h2>React Query Users:</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading users</p>}
      {apiUsers && (
        <ul>
          {apiUsers.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
      
      <button 
        onClick={handleCreateUser}
        disabled={createUserMutation.isLoading}
      >
        {createUserMutation.isLoading ? 'Creating...' : 'Create User'}
      </button>
    </div>
  );
};
```

Magyarázat: Redux komplex state-hez, Zustand egyszerűbb local state-hez, React Query server state-hez ideális.

### TypeScript: type, interface {#typescript-type-interface}
Statikus típusellenőrzés JavaScript-hez, compile-time hibakereséshez és jobb fejlesztői élményhez.

**Példa:**
```typescript
// Basic types
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;
let hobbies: string[] = ["reading", "coding"];
let scores: Array<number> = [85, 90, 78];

// Union types
type Status = "loading" | "success" | "error";
let currentStatus: Status = "loading";

// Interfaces
interface User {
  readonly id: number;
  name: string;
  email: string;
  age?: number; // optional property
  preferences: UserPreferences;
}

interface UserPreferences {
  theme: "light" | "dark";
  notifications: boolean;
  language: string;
}

// Interface extending
interface AdminUser extends User {
  role: "admin" | "superAdmin";
  permissions: string[];
}

// Type aliases
type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

type UserApiResponse = ApiResponse<User>;
type UsersApiResponse = ApiResponse<User[]>;

// Generic interfaces
interface Repository<T> {
  findById(id: number): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(entity: Omit<T, 'id'>): Promise<T>;
  update(id: number, updates: Partial<T>): Promise<T>;
  delete(id: number): Promise<void>;
}

// Implementation
class UserRepository implements Repository<User> {
  private baseUrl = '/api/users';

  async findById(id: number): Promise<User | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      if (!response.ok) return null;
      return await response.json();
    } catch {
      return null;
    }
  }

  async findAll(): Promise<User[]> {
    const response = await fetch(this.baseUrl);
    return await response.json();
  }

  async create(userData: Omit<User, 'id'>): Promise<User> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return await response.json();
  }

  async update(id: number, updates: Partial<User>): Promise<User> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return await response.json();
  }

  async delete(id: number): Promise<void> {
    await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE'
    });
  }
}

// Advanced TypeScript patterns
// Conditional types
type NonNullable<T> = T extends null | undefined ? never : T;

// Mapped types
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

// Utility types
interface CreateUserRequest {
  name: string;
  email: string;
  age?: number;
}

// Pick selected properties
type UserBasicInfo = Pick<User, 'name' | 'email'>;

// Omit specific properties
type CreateUserData = Omit<User, 'id'>;

// Record type
type UserRoles = Record<string, string[]>;
const roles: UserRoles = {
  admin: ['read', 'write', 'delete'],
  user: ['read'],
  guest: []
};

// Function types
type EventHandler<T> = (event: T) => void;
type AsyncEventHandler<T> = (event: T) => Promise<void>;

interface FormProps {
  onSubmit: EventHandler<FormEvent>;
  onAsyncSubmit?: AsyncEventHandler<FormData>;
}

// React component with TypeScript
interface UserFormProps {
  initialUser?: Partial<User>;
  onSubmit: (user: CreateUserRequest) => Promise<void>;
  loading?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ 
  initialUser, 
  onSubmit, 
  loading = false 
}) => {
  const [formData, setFormData] = useState<CreateUserRequest>({
    name: initialUser?.name || '',
    email: initialUser?.email || '',
    age: initialUser?.age
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (field: keyof CreateUserRequest) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = field === 'age' ? Number(e.target.value) : e.target.value;
      setFormData(prev => ({ ...prev, [field]: value }));
    };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={handleChange('name')}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={formData.email}
        onChange={handleChange('email')}
        placeholder="Email"
        required
      />
      <input
        type="number"
        value={formData.age || ''}
        onChange={handleChange('age')}
        placeholder="Age (optional)"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

// Custom hooks with TypeScript
const useApi = <T>(url: string): {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
} => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const result: T = await response.json();
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
};
```

Magyarázat: TypeScript compile-time típusellenőrzést biztosít, ami csökkenti a runtime hibákat és javítja a kód karbantarthatóságát.

## Gyakori hibák

### Rossz State Management
Prop drilling és nem megfelelő state structure.

**Hibás példa:**
```jsx
// HIBÁS - Prop drilling
const App = () => {
  const [user, setUser] = useState(null);
  return <Dashboard user={user} setUser={setUser} />;
};

const Dashboard = ({ user, setUser }) => {
  return <Sidebar user={user} setUser={setUser} />;
};

const Sidebar = ({ user, setUser }) => {
  return <UserProfile user={user} setUser={setUser} />;
};

const UserProfile = ({ user, setUser }) => {
  // Finally using the props
  return <div>{user?.name}</div>;
};
```

**Helyes megoldás:**
```jsx
// HELYES - Context API vagy state management library
const UserContext = createContext();

const App = () => {
  const [user, setUser] = useState(null);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Dashboard />
    </UserContext.Provider>
  );
};

const Dashboard = () => <Sidebar />;
const Sidebar = () => <UserProfile />;

const UserProfile = () => {
  const { user } = useContext(UserContext);
  return <div>{user?.name}</div>;
};
```

### Memory Leaks
useEffect cleanup-ok hiánya és event listener-ek nem eltávolítása.

**Hibás példa:**
```jsx
// HIBÁS - Memory leak
const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    // HIÁNYZIK A CLEANUP!
  }, []);

  return <div>Seconds: {seconds}</div>;
};
```

**Helyes megoldás:**
```jsx
// HELYES - Proper cleanup
const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    // Cleanup function
    return () => clearInterval(interval);
  }, []);

  return <div>Seconds: {seconds}</div>;
};
```

### Key Prop hiánya listákban
React nem tudja hatékonyan re-render-elni a list item-eket.

**Hibás példa:**
```jsx
// HIBÁS - Missing keys
const UserList = ({ users }) => {
  return (
    <ul>
      {users.map(user => (
        <li>{user.name}</li> // Missing key!
      ))}
    </ul>
  );
};
```

**Helyes megoldás:**
```jsx
// HELYES - Proper keys
const UserList = ({ users }) => {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
```

## Interjúkérdések

- **Mi a különbség a state és a prop között?** — *State komponens belső állapota, prop külső adatátvitel szülő-gyerek komponensek között.*

- **Mire való a useEffect?** — *Side effect-ek kezelésére: API hívások, DOM manipuláció, subscription-ök, cleanup.*

- **Hogyan kezelnéd a global state-et React-ben?** — *Context API kis alkalmazásokhoz, Redux/Zustand nagyobb alkalmazásokhoz.*

- **Mi a Virtual DOM és miért hasznos?** — *In-memory reprezentáció a valós DOM-ról, efficient diffing és batch updates.*

- **Mik a TypeScript előnyei?** — *Compile-time type checking, jobb IDE support, refactoring biztonság, dokumentáció.*

- **Hogyan optimalizálnád egy React app teljesítményét?** — *React.memo, useCallback, useMemo, code splitting, lazy loading.*

- **Mi a különbség npm és yarn között?** — *Yarn determinisztikus, gyorsabb, jobb caching; npm szélesebb körben használt.*

- **Hogyan kezelnéd az async műveleteket React-ben?** — *useState + useEffect, custom hooks, React Query, Redux Toolkit Query.*

- **Mi a JSX és hogyan működik?** — *JavaScript XML syntax sugar, Babel transzpílálja React.createElement hívásokká.*

- **Mikor használnál class vs functional komponenst?** — *Functional component hooks-kal a modern megközelítés, class component legacy.*

- **Hogyan implementálnál routing-ot React-ben?** — *React Router: BrowserRouter, Routes, Route, navigation hooks.*

- **Mi a lifting state up pattern?** — *Shared state mozgatása a legközelebbi közös parent komponensbe.*

## Gyakorlati feladat

Fejlessz egy Todo alkalmazást Modern React stack-kel:

1. **TypeScript setup**: Strict mode, interfaces, type guards
2. **Component architektúra**: Functional components, custom hooks
3. **State management**: Context API vagy Zustand
4. **Styling**: Tailwind CSS vagy styled-components
5. **Testing**: Jest, React Testing Library
6. **Build optimalizáció**: Vite, code splitting
7. **Features**: CRUD operations, filtering, persistence

Követelmények:
- TypeScript strict mode
- Responsive design
- Error boundaries
- Loading states
- Unit és integration tesztek
- Accessibility (a11y) compliance

*Kapcsolódó gyakorlati feladat: [React TypeScript App](/exercises/web/02-react-ts)*

## Kapcsolódó témák

- [Web Development](/theory/web) - HTML, CSS, JavaScript alapok
- [Testing](/theory/testing) - React Testing Library, Cypress
- [CI/CD & DevOps](/theory/devops) - Build és deploy folyamatok
- [Szoftver Architektúra](/theory/arch) - Component design patterns

## További olvasmányok

- [React Documentation](https://react.dev/) - Hivatalos React dokumentáció
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript official guide
- [Node.js Documentation](https://nodejs.org/en/docs/) - Node.js API reference
- [Frontend Masters](https://frontendmasters.com/) - Advanced frontend courses
- [React Patterns](https://reactpatterns.com/) - Common React design patterns
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/) - Advanced TypeScript guide
- [Modern JavaScript](https://javascript.info/) - Comprehensive JS tutorial