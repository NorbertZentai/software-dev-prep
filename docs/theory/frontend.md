---
render_with_liquid: false
---

# Frontend (React, TypeScript, Node.js)

## Rövid összefoglaló

A modern frontend fejlesztés React, TypeScript és Node.js ökoszisztémára épül. React komponens-alapú UI library, TypeScript típusbiztonságot nyújt JavaScript-hez, Node.js pedig server-side JavaScript futtatási környezet. Modern tooling: npm/yarn, Webpack/Vite, ESLint, Prettier. UI library-k: Tailwind CSS, shadcn/ui, Material-UI. State management: React hooks, Redux, Zustand. Tesztelés: Jest, React Testing Library, Cypress. Fő kihívások: state management, performance optimalizáció és bundle size kezelés.

<!-- Reading Progress Bar -->
<div id="read-progress"></div>

<!-- Tag Filter -->
<div class="tag-filter-container">
  <div class="tag-filter-header">
    <span class="filter-icon">🔍</span>
    <span>Szűrés témakör szerint</span>
  </div>
  <div class="tag-filter-chips">
    <button class="filter-chip" data-filter="all">Összes</button>
    <button class="filter-chip" data-filter="junior">Junior</button>
    <button class="filter-chip" data-filter="medior">Medior</button>
    <button class="filter-chip" data-filter="react">React</button>
    <button class="filter-chip" data-filter="typescript">TypeScript</button>
    <button class="filter-chip" data-filter="nodejs">Node.js</button>
    <button class="filter-chip" data-filter="state">State</button>
    <button class="filter-chip" data-filter="hooks">Hooks</button>
  </div>
</div>

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

<div class="concept-section" data-filter="react junior">

### React component {#react-component}

<div class="mental-model">
🧩 **Mental Model: React Components - Building Blocks Like Lego**
Képzeld el a React komponenseket mint LEGO kockákat. Minden kocka (komponens) önálló funkcionalitással rendelkezik, de összekombinálhatóak komplex építményekké (alkalmazásokká).

**A Component anatómiája:**
- **Props**: Mint a kocka bemeneti csatlakozói - adatok áramlanak befelé
- **State**: Mint a kocka belső mechanizmusai - saját állapot
- **JSX**: Mint a kocka kinézete - UI representation
- **Event handlers**: Mint a kocka gombjai - user interactions
- **Lifecycle**: Mint a kocka létrejötte, változása, eltűnése

**Composition over Inheritance:**
Ahogy a LEGO-nál is kombináljuk a kockákat új struktúrákká, React-ben is komponenseket compositionálunk, nem inheritance-t használunk.
</div>

<div class="why-important">
💡 **Miért forradalmi a Component-based architecture?**
- **Reusability**: Write once, use everywhere
- **Maintainability**: Izolált felelősségi körök
- **Testability**: Kisebb, független units tesztelhetőek
- **Team scalability**: Párhuzamos fejlesztés különböző komponenseken
- **Debugging**: Hiba izolálása konkrét komponenshez
- **Performance**: Selective re-rendering csak változott komponensekre
- **Design system**: Consistent UI building blocks
- **Developer experience**: Predictable patterns és tools
</div>

<div class="runnable-model">
🚀 **Modern React Component patterns:**

**1. Functional Component with TypeScript:**
```tsx
import React, { useState, useCallback } from 'react';

// Strong typing with interfaces
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin' | 'moderator';
  lastActive: Date;
}

interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (userId: string) => void;
  onRoleChange?: (userId: string, newRole: User['role']) => void;
  className?: string;
  compact?: boolean;
}

// Component with proper TypeScript typing
const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit,
  onDelete,
  onRoleChange,
  className = '',
  compact = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Memoized handlers to prevent unnecessary re-renders
  const handleToggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const handleEdit = useCallback(() => {
    onEdit?.(user);
  }, [onEdit, user]);

  const handleDelete = useCallback(async () => {
    if (!onDelete) return;
    
    const confirmed = window.confirm(`Are you sure you want to delete ${user.name}?`);
    if (!confirmed) return;

    setIsLoading(true);
    try {
      await onDelete(user.id);
    } catch (error) {
      console.error('Failed to delete user:', error);
      // Here you would typically show a toast notification
    } finally {
      setIsLoading(false);
    }
  }, [onDelete, user.id, user.name]);

  const handleRoleChange = useCallback((newRole: User['role']) => {
    onRoleChange?.(user.id, newRole);
  }, [onRoleChange, user.id]);

  // Early return for compact view
  if (compact) {
    return (
      <div className={`user-card-compact ${className}`}>
        <img 
          src={user.avatar || '/default-avatar.png'} 
          alt={user.name}
          className="user-avatar-small"
        />
        <span className="user-name">{user.name}</span>
        <span className={`user-role user-role-${user.role}`}>
          {user.role}
        </span>
      </div>
    );
  }

  return (
    <div className={`user-card ${isExpanded ? 'expanded' : ''} ${className}`}>
      <div className="user-card-header" onClick={handleToggleExpand}>
        <div className="user-basic-info">
          <img 
            src={user.avatar || '/default-avatar.png'} 
            alt={user.name}
            className="user-avatar"
          />
          <div className="user-text-info">
            <h3 className="user-name">{user.name}</h3>
            <p className="user-email">{user.email}</p>
          </div>
        </div>
        
        <div className="user-card-controls">
          <span className={`user-role user-role-${user.role}`}>
            {user.role}
          </span>
          <span className="expand-icon">
            {isExpanded ? '▼' : '▶'}
          </span>
        </div>
      </div>

      {isExpanded && (
        <div className="user-card-details">
          <div className="user-metadata">
            <p className="last-active">
              Last active: {user.lastActive.toLocaleDateString()}
            </p>
          </div>

          <div className="user-actions">
            {onRoleChange && (
              <div className="role-selector">
                <label htmlFor={`role-${user.id}`}>Role:</label>
                <select
                  id={`role-${user.id}`}
                  value={user.role}
                  onChange={(e) => handleRoleChange(e.target.value as User['role'])}
                  className="role-select"
                >
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            )}

            <div className="action-buttons">
              {onEdit && (
                <button
                  onClick={handleEdit}
                  className="btn btn-secondary"
                  type="button"
                >
                  Edit
                </button>
              )}
              
              {onDelete && (
                <button
                  onClick={handleDelete}
                  disabled={isLoading}
                  className="btn btn-danger"
                  type="button"
                >
                  {isLoading ? 'Deleting...' : 'Delete'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
```

**2. Container Component with Business Logic:**
```tsx
import React, { useState, useEffect, useCallback } from 'react';
import UserCard from './UserCard';

interface UserListContainerProps {
  initialUsers?: User[];
  apiEndpoint?: string;
  allowEdit?: boolean;
  allowDelete?: boolean;
  allowRoleChange?: boolean;
}

const UserListContainer: React.FC<UserListContainerProps> = ({
  initialUsers = [],
  apiEndpoint = '/api/users',
  allowEdit = true,
  allowDelete = true,
  allowRoleChange = false
}) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch users from API
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(apiEndpoint);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const userData: User[] = await response.json();
      setUsers(userData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch users';
      setError(errorMessage);
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  }, [apiEndpoint]);

  // Initial load
  useEffect(() => {
    if (initialUsers.length === 0) {
      fetchUsers();
    }
  }, [fetchUsers, initialUsers.length]);

  // User management handlers
  const handleEditUser = useCallback((user: User) => {
    // This would typically open a modal or navigate to edit page
    console.log('Edit user:', user);
  }, []);

  const handleDeleteUser = useCallback(async (userId: string) => {
    try {
      const response = await fetch(`${apiEndpoint}/${userId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      
      // Optimistic update
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Failed to delete user:', err);
      throw err; // Re-throw so UserCard can handle the error
    }
  }, [apiEndpoint]);

  const handleRoleChange = useCallback(async (userId: string, newRole: User['role']) => {
    try {
      const response = await fetch(`${apiEndpoint}/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: newRole })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update user role');
      }
      
      // Optimistic update
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      console.error('Failed to update user role:', err);
    }
  }, [apiEndpoint]);

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading state
  if (loading && users.length === 0) {
    return (
      <div className="user-list-loading">
        <div className="spinner" />
        <p>Loading users...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="user-list-error">
        <h3>Error loading users</h3>
        <p>{error}</p>
        <button onClick={fetchUsers} className="btn btn-primary">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h2>Users ({filteredUsers.length})</h2>
        
        <div className="user-list-controls">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
          <button onClick={fetchUsers} className="btn btn-secondary">
            Refresh
          </button>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="no-users">
          <p>No users found</p>
        </div>
      ) : (
        <div className="user-list">
          {filteredUsers.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={allowEdit ? handleEditUser : undefined}
              onDelete={allowDelete ? handleDeleteUser : undefined}
              onRoleChange={allowRoleChange ? handleRoleChange : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserListContainer;
```

**3. Performance Optimized Component:**
```tsx
import React, { memo, useCallback, useMemo } from 'react';

// Memoized component to prevent unnecessary re-renders
const OptimizedUserCard = memo<UserCardProps>(({ user, onDelete, onEdit }) => {
  // Expensive calculation memoized
  const userStats = useMemo(() => {
    return {
      totalPosts: user.posts?.length || 0,
      lastPostDate: user.posts?.[0]?.createdAt || null,
      engagement: calculateEngagement(user.posts || [])
    };
  }, [user.posts]);

  // Stable callback references
  const handleEdit = useCallback(() => {
    onEdit?.(user);
  }, [onEdit, user]);

  const handleDelete = useCallback(() => {
    onDelete?.(user.id);
  }, [onDelete, user.id]);

  return (
    <div className="user-card optimized">
      <h3>{user.name}</h3>
      <p>Posts: {userStats.totalPosts}</p>
      <p>Engagement: {userStats.engagement}%</p>
      
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for memo
  return (
    prevProps.user.id === nextProps.user.id &&
    prevProps.user.name === nextProps.user.name &&
    prevProps.user.email === nextProps.user.email &&
    prevProps.onEdit === nextProps.onEdit &&
    prevProps.onDelete === nextProps.onDelete
  );
});

OptimizedUserCard.displayName = 'OptimizedUserCard';
```
</div>

<div class="myths">
🚫 **Gyakori tévhitek és hibák**

<details>
<summary><strong>Tévhit: "Minél kisebb komponens, annál jobb"</strong></summary>
<div class="myth-content">
**Valóság:** A komponens mérete a felelősségi körétől függ, nem a kódsorok számától.

**Over-componentization problem:**
```tsx
// BAD: Túl apró komponensek
const UserName = ({ name }) => <span>{name}</span>;
const UserEmail = ({ email }) => <span>{email}</span>;
const UserAvatar = ({ avatar }) => <img src={avatar} />;

const UserCard = ({ user }) => (
  <div>
    <UserAvatar avatar={user.avatar} />
    <UserName name={user.name} />
    <UserEmail email={user.email} />
  </div>
);
```

**GOOD: Megfelelő abstrakció szint:**
```tsx
// GOOD: Logikus felelősségi körök
const UserCard = ({ user, onEdit, onDelete }) => (
  <div className="user-card">
    <div className="user-info">
      <img src={user.avatar} alt={user.name} />
      <div>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    </div>
    <UserActions onEdit={onEdit} onDelete={onDelete} />
  </div>
);

const UserActions = ({ onEdit, onDelete }) => (
  <div className="user-actions">
    <button onClick={onEdit}>Edit</button>
    <button onClick={onDelete}>Delete</button>
  </div>
);
```

**Rule of thumb:** Ha egy komponens csak egyetlen DOM elemet renderel prop value-val, valószínűleg túl kicsi.
</div>
</details>

<details>
<summary><strong>Tévhit: "React komponensek automatikusan optimalizáltak"</strong></summary>
<div class="myth-content">
**Valóság:** React re-rendereli a komponenseket, ha a parent re-renderelődik, függetlenül attól, hogy változtak-e a props-ok.

**Performance problem:**
```tsx
// BAD: Minden parent re-render újra rendereli a child-ot
const Parent = () => {
  const [counter, setCounter] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCounter(c => c + 1)}>
        Count: {counter}
      </button>
      <ExpensiveChild data={someData} /> {/* Re-renders unnecessarily */}
    </div>
  );
};
```

**GOOD: Optimalization strategies:**
```tsx
// 1. React.memo for props comparison
const ExpensiveChild = memo(({ data }) => {
  // Complex rendering logic
  return <div>{/* expensive computation */}</div>;
});

// 2. useMemo for expensive calculations
const Parent = () => {
  const [counter, setCounter] = useState(0);
  
  const memoizedData = useMemo(() => {
    return processExpensiveData(rawData);
  }, [rawData]);
  
  const handleClick = useCallback(() => {
    setCounter(c => c + 1);
  }, []);
  
  return (
    <div>
      <button onClick={handleClick}>Count: {counter}</button>
      <ExpensiveChild data={memoizedData} />
    </div>
  );
};
```
</div>
</details>

<details>
<summary><strong>Tévhit: "useCallback és useMemo mindig jó"</strong></summary>
<div class="myth-content">
**Valóság:** Ezek az optimalizációk saját költséggel járnak és nem mindig érik meg.

**Over-optimization:**
```tsx
// BAD: Unnecessary optimization
const SimpleComponent = ({ name }) => {
  // Overkill for simple string concatenation
  const greeting = useMemo(() => `Hello, ${name}!`, [name]);
  
  // Overkill for simple inline function
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);
  
  return (
    <div onClick={handleClick}>
      {greeting}
    </div>
  );
};
```

**GOOD: Targeted optimization:**
```tsx
// GOOD: Only optimize when necessary
const ComplexComponent = ({ items, onItemSelect }) => {
  // Worth memoizing: expensive calculation
  const processedItems = useMemo(() => {
    return items
      .filter(item => item.active)
      .map(item => ({ ...item, computed: expensiveComputation(item) }))
      .sort((a, b) => a.priority - b.priority);
  }, [items]);
  
  // Worth memoizing: passed to memo-ized child components
  const handleItemSelect = useCallback((item) => {
    onItemSelect(item);
  }, [onItemSelect]);
  
  return (
    <div>
      {processedItems.map(item => (
        <MemoizedItemCard 
          key={item.id} 
          item={item} 
          onSelect={handleItemSelect} 
        />
      ))}
    </div>
  );
};
```

**When to optimize:**
- Heavy computations in render
- Callbacks passed to memoized child components
- Object/array creation in render that's passed as props
- Child components that render many items
</div>
</details>
</details>

<div class="micro-learning">
🎯 **Micro-learning: Component Design Principles**

**The SOLID principles for React Components:**

1. **Single Responsibility**: Egy komponens egy dolgot csináljon jól
2. **Open/Closed**: Nyitott extension-re, zárt modification-re (composition)
3. **Liskov Substitution**: Komponensek helyettesíthetőek legyenek
4. **Interface Segregation**: Kis, specifikus prop interface-ek
5. **Dependency Inversion**: Függj abstrakciótól, ne konkrét implementációtól

**Component kategorization:**
```tsx
// 1. Presentational Components (Dumb/Pure)
const Button = ({ children, onClick, variant = 'primary' }) => (
  <button className={`btn btn-${variant}`} onClick={onClick}>
    {children}
  </button>
);

// 2. Container Components (Smart)
const UserListContainer = () => {
  const [users, setUsers] = useState([]);
  // Business logic here
  return <UserList users={users} />;
};

// 3. Higher-Order Components (HOC)
const withLoading = (Component) => ({ isLoading, ...props }) => 
  isLoading ? <Spinner /> : <Component {...props} />;

// 4. Render Props
const DataFetcher = ({ children, url }) => {
  const [data, setData] = useState(null);
  // Fetch logic
  return children({ data, loading, error });
};
```

**Component naming conventions:**
- **PascalCase**: ComponentName
- **Descriptive**: UserCard, not Card
- **Domain-specific**: ProductCard, UserCard (nem Generic Card)
</div>

</div>

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

<div class="concept-section" data-filter="hooks medior">

### Hooks (useState, useEffect) {#hooks-usestate-useeffect}

<div class="mental-model">
🎣 **Mental Model: Hooks - Magical Fishing Hooks for Component Logic**
Képzeld el a React hook-okat mint speciális horgokat, amelyekkel "kihalászhatod" a React különleges képességeit functional komponenseidbe.

**Hook típusok:**
- **useState**: Mint egy "state fish" - komponens memóriája
- **useEffect**: Mint egy "side effect fish" - külvilághoz kapcsolódás
- **useCallback**: Mint egy "stable function fish" - ugyanaz a függvény referencia
- **useMemo**: Mint egy "cached calculation fish" - drága számítások cacheing-je
- **useContext**: Mint egy "global data fish" - távoli adatok elérése
- **Custom hooks**: Mint saját horgok - egyedi logika csomagolása

**A Hooks Rules:**
1. Csak function component tetején hívhatóak
2. Nem hívhatóak loops, conditions, nested functions-ben
3. Minden render-ben ugyanabban a sorrendben futnak
</div>

<div class="why-important">
💡 **Miért revolutionáriák a Hooks?**
- **Function components superpower**: Class component-ek összes képessége functional-ben
- **Logic reusability**: Custom hooks-ban state-ful logic csomagolható
- **Cleaner code**: Kevesebb boilerplate, mint class component-ekben
- **Better testing**: Izolált hook logic könnyebben tesztelhető
- **Performance optimization**: Fine-grained optimization lehetőségek
- **Developer experience**: Hot reload, better debugging
- **Composition over inheritance**: Logic kombinálása inheritance helyett
- **Smaller bundle**: Function component-ek kisebb bundle size-t eredményeznek
</div>

<div class="runnable-model">
🚀 **Advanced Hooks patterns és best practices:**

**1. Core Hooks mastery:**
```tsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';

const UserProfileAdvanced: React.FC<{ userId: string }> = ({ userId }) => {
  // Multiple related state pieces - consider useReducer for complex state
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  // useEffect with dependency array and cleanup
  useEffect(() => {
    let cancelled = false; // Cleanup flag to prevent state updates after unmount
    
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const userData = await response.json();
        
        // Only update state if component is still mounted
        if (!cancelled) {
          setUser(userData);
          setLastFetched(new Date());
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    // Cleanup function - runs when userId changes or component unmounts
    return () => {
      cancelled = true;
    };
  }, [userId]); // Dependency array - effect re-runs when userId changes

  // useCallback - memoize function to prevent child re-renders
  const handleRefresh = useCallback(async () => {
    // Trigger re-fetch by using the same logic from useEffect
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/users/${userId}`);
      const userData = await response.json();
      setUser(userData);
      setLastFetched(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // useMemo - expensive calculation only when dependencies change
  const userStats = useMemo(() => {
    if (!user) return null;
    
    return {
      totalPosts: user.posts?.length || 0,
      avgPostLength: user.posts?.reduce((acc, post) => acc + post.content.length, 0) / (user.posts?.length || 1),
      mostRecentPost: user.posts?.[0]?.createdAt ? new Date(user.posts[0].createdAt) : null,
      engagementScore: calculateEngagementScore(user.posts || []) // Expensive calculation
    };
  }, [user]);

  // Early returns for different states
  if (loading) {
    return (
      <div className="user-profile-loading">
        <div className="spinner" />
        <p>Loading user profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-profile-error">
        <h3>Error loading user</h3>
        <p>{error}</p>
        <button onClick={handleRefresh} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  if (!user) {
    return <div className="user-profile-not-found">User not found</div>;
  }

  return (
    <div className="user-profile">
      <div className="user-basic-info">
        <img src={user.avatar} alt={user.name} />
        <h1>{user.name}</h1>
        <p>{user.email}</p>
        
        {lastFetched && (
          <small>Last updated: {lastFetched.toLocaleTimeString()}</small>
        )}
      </div>

      {userStats && (
        <div className="user-stats">
          <h3>User Statistics</h3>
          <ul>
            <li>Total Posts: {userStats.totalPosts}</li>
            <li>Average Post Length: {Math.round(userStats.avgPostLength)} chars</li>
            <li>Engagement Score: {userStats.engagementScore}%</li>
            {userStats.mostRecentPost && (
              <li>Last Post: {userStats.mostRecentPost.toLocaleDateString()}</li>
            )}
          </ul>
        </div>
      )}

      <button onClick={handleRefresh} className="btn btn-secondary">
        Refresh Data
      </button>
    </div>
  );
};

// Helper function (would be outside component in real code)
const calculateEngagementScore = (posts: Post[]): number => {
  // Simulate expensive calculation
  return posts.reduce((acc, post) => {
    return acc + (post.likes * 2 + post.comments * 3) / post.views * 100;
  }, 0) / posts.length || 0;
};
```

**2. Custom Hooks - Logic Reusability:**
```tsx
// Custom hook for API calls with caching
const useApiWithCache = <T>(url: string, cacheDuration = 5 * 60 * 1000) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  const fetchData = useCallback(async (force = false) => {
    // Check cache first
    if (!force && lastFetched && Date.now() - lastFetched.getTime() < cacheDuration) {
      return; // Use cached data
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
      setLastFetched(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setLoading(false);
    }
  }, [url, cacheDuration, lastFetched]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => fetchData(true), [fetchData]);

  return { 
    data, 
    loading, 
    error, 
    refetch,
    isStale: lastFetched ? Date.now() - lastFetched.getTime() > cacheDuration : false
  };
};

// Custom hook for form validation
const useFormValidation = <T extends Record<string, any>>(
  initialValues: T,
  validationRules: ValidationRules<T>
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name: keyof T, value: any) => {
    const rule = validationRules[name];
    if (!rule) return '';
    
    return rule(value) || '';
  }, [validationRules]);

  const handleChange = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation for touched fields
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [touched, validateField]);

  const handleBlur = useCallback((name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate on blur
    const error = validateField(name, values[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [values, validateField]);

  const validateAll = useCallback(() => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let hasErrors = false;
    
    Object.keys(validationRules).forEach(key => {
      const error = validateField(key as keyof T, values[key as keyof T]);
      if (error) {
        newErrors[key as keyof T] = error;
        hasErrors = true;
      }
    });
    
    setErrors(newErrors);
    setTouched(Object.keys(values).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {}));
    
    return !hasErrors;
  }, [values, validationRules, validateField]);

  const handleSubmit = useCallback(async (onSubmit: (values: T) => Promise<void>) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      if (validateAll()) {
        await onSubmit(values);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateAll, isSubmitting]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const isValid = Object.values(errors).every(error => !error);
  const isDirty = JSON.stringify(values) !== JSON.stringify(initialValues);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    isDirty,
    handleChange,
    handleBlur,
    handleSubmit,
    reset
  };
};

// Usage of custom hooks
const UserForm: React.FC = () => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    reset
  } = useFormValidation(
    { name: '', email: '', age: '' },
    {
      name: (value) => !value ? 'Name is required' : value.length < 2 ? 'Name too short' : '',
      email: (value) => !value ? 'Email is required' : !/.+@.+\..+/.test(value) ? 'Invalid email' : '',
      age: (value) => !value ? 'Age is required' : isNaN(Number(value)) ? 'Age must be a number' : ''
    }
  );

  const onSubmit = async (formData: typeof values) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      reset();
      // Show success message
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(onSubmit);
    }}>
      <div className="form-field">
        <input
          type="text"
          value={values.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          placeholder="Name"
          className={errors.name && touched.name ? 'error' : ''}
        />
        {errors.name && touched.name && (
          <span className="error-message">{errors.name}</span>
        )}
      </div>

      <div className="form-field">
        <input
          type="email"
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          placeholder="Email"
          className={errors.email && touched.email ? 'error' : ''}
        />
        {errors.email && touched.email && (
          <span className="error-message">{errors.email}</span>
        )}
      </div>

      <button 
        type="submit" 
        disabled={!isValid || isSubmitting}
        className="btn btn-primary"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

// Type definitions
type ValidationRules<T> = {
  [K in keyof T]: (value: T[K]) => string | undefined;
};
```

**3. Advanced Hook Patterns:**
```tsx
// useReducer for complex state logic
import { useReducer } from 'react';

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  editingId: string | null;
}

type TodoAction = 
  | { type: 'ADD_TODO'; text: string }
  | { type: 'TOGGLE_TODO'; id: string }
  | { type: 'DELETE_TODO'; id: string }
  | { type: 'SET_FILTER'; filter: TodoState['filter'] }
  | { type: 'START_EDITING'; id: string }
  | { type: 'FINISH_EDITING'; id: string; text: string };

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, { 
          id: Date.now().toString(), 
          text: action.text, 
          completed: false 
        }]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        )
      };
    case 'SET_FILTER':
      return { ...state, filter: action.filter };
    default:
      return state;
  }
};

const TodoApp = () => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all',
    editingId: null
  });

  const addTodo = useCallback((text: string) => {
    dispatch({ type: 'ADD_TODO', text });
  }, []);

  const toggleTodo = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_TODO', id });
  }, []);

  // Rest of component logic...
};
```
</div>

<div class="myths">
🚫 **Gyakori tévhitek és hibák**

<details>
<summary><strong>Tévhit: "useEffect dependency array-be minden variable-t bele kell tenni"</strong></summary>
<div class="myth-content">
**Valóság:** Csak azokat a reactive values-ket, amelyeket a effect használ.

**Over-dependency problem:**
```tsx
// BAD: Unnecessary dependencies cause extra re-runs
const MyComponent = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light'); // Not used in effect!
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId, theme]); // theme is unnecessary!
  
  return <div>{user?.name}</div>;
};
```

**GOOD: Only necessary dependencies:**
```tsx
// GOOD: Only include what's actually used
const MyComponent = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // Only userId is used in the effect
  
  return <div className={theme}>{user?.name}</div>;
};
```

**ESLint rule:** Use `eslint-plugin-react-hooks` to catch dependency issues automatically.
</div>
</details>

<details>
<summary><strong>Tévhit: "useState minden state-hez megfelelő"</strong></summary>
<div class="myth-content">
**Valóság:** Complex state logic-hoz useReducer sokkal jobb.

**useState struggles:**
```tsx
// BAD: Complex state updates with useState
const ComplexForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors({});
    // Complex validation logic
    // Multiple setState calls
    // Hard to keep state consistent
  };
};
```

**GOOD: useReducer for complex state:**
```tsx
// GOOD: Centralized state logic with useReducer
interface FormState {
  values: { name: string; email: string };
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
}

type FormAction = 
  | { type: 'FIELD_CHANGE'; field: string; value: string }
  | { type: 'FIELD_BLUR'; field: string }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; errors: Record<string, string> };

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'FIELD_CHANGE':
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: '' } // Clear error
      };
    case 'SUBMIT_START':
      return { ...state, isSubmitting: true, errors: {} };
    case 'SUBMIT_SUCCESS':
      return { 
        ...state, 
        isSubmitting: false, 
        values: { name: '', email: '' },
        touched: {}
      };
    default:
      return state;
  }
};
```

**When to use useReducer:**
- Multiple state variables that change together
- Complex state transitions
- Need to optimize performance (single dispatch vs multiple setState)
- State logic becomes hard to test
</div>
</details>

<details>
<summary><strong>Tévhit: "useCallback és useMemo mindenhol kell"</strong></summary>
<div class="myth-content">
**Valóság:** Ezek optimalizációk, amelyek saját költséggel járnak.

**Premature optimization:**
```tsx
// BAD: Unnecessary optimization
const SimpleCounter = () => {
  const [count, setCount] = useState(0);
  
  // Unnecessary memoization for simple calculation
  const doubledCount = useMemo(() => count * 2, [count]);
  
  // Unnecessary callback memoization
  const increment = useCallback(() => setCount(c => c + 1), []);
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Doubled: {doubledCount}</p>
      <button onClick={increment}>+</button>
    </div>
  );
};
```

**GOOD: Strategic optimization:**
```tsx
// GOOD: Optimize only when needed
const ExpensiveComponent = ({ items, onItemClick }) => {
  // Worth memoizing: expensive calculation
  const processedItems = useMemo(() => {
    return items
      .filter(item => item.active)
      .map(item => ({
        ...item,
        computed: expensiveComputation(item) // Actually expensive
      }))
      .sort((a, b) => a.priority - b.priority);
  }, [items]);
  
  // Worth memoizing: passed to memo components
  const handleItemClick = useCallback((item) => {
    onItemClick(item);
  }, [onItemClick]);
  
  return (
    <div>
      {processedItems.map(item => (
        <MemoizedItemCard 
          key={item.id} 
          item={item} 
          onClick={handleItemClick} 
        />
      ))}
    </div>
  );
};
```

**Optimization guidelines:**
- Profile first, optimize second
- Memoize expensive calculations
- Memoize callbacks passed to memoized children
- Don't memoize simple primitives or calculations
</div>
</details>
</details>

<div class="micro-learning">
🎯 **Micro-learning: Hook dependency arrays mastery**

**The dependency array golden rules:**

1. **Include all reactive values used inside the effect**
2. **Functions and objects need special handling**
3. **Empty array = runs once, no array = runs every render**

**Common patterns:**
```tsx
// 1. API call with dependency
useEffect(() => {
  fetchUser(userId); // userId is reactive, include it
}, [userId]);

// 2. Function in dependency - wrap with useCallback
const fetchData = useCallback(async () => {
  const data = await api.get(url);
  setData(data);
}, [url]); // url is the real dependency

useEffect(() => {
  fetchData();
}, [fetchData]); // Now fetchData is stable

// 3. Object in dependency - memoize or extract values
const config = useMemo(() => ({ 
  endpoint: '/api/users', 
  method: 'GET' 
}), []); // If config never changes

useEffect(() => {
  fetch(config.endpoint, { method: config.method });
}, [config]);

// 4. Ignore specific dependency warnings (rare!)
useEffect(() => {
  // This function is always the same, safe to ignore
  someStableFunction();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
```

**Pro tip:** Install `eslint-plugin-react-hooks` to catch dependency issues automatically!

**Hook testing strategy:**
```tsx
// Test custom hooks with @testing-library/react-hooks
import { renderHook, act } from '@testing-library/react-hooks';

test('useCounter should increment', () => {
  const { result } = renderHook(() => useCounter(0));
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
```
</div>

</div>

### Event Loop és async/await {#event-loop-async-await}

<div class="concept-section mental-model" data-filter="javascript junior">

📋 **Fogalom meghatározása**  
*Az Event Loop egy JavaScript runtime mechanizmus, amely lehetővé teszi a nem-blokkoló (non-blocking) aszinkron műveletek végrehajtását egyetlen szálon. A call stack, callback queue és Web API-k koordinálásával biztosítja, hogy az aszinkron műveletek ne blokkolják a fő végrehajtási szálat. Az async/await egy szintaktikai konstrukció, amely Promise-alapú aszinkron kódot szinkron módon olvashatóvá tesz.*

</div>

<div class="concept-section why-important" data-filter="javascript junior">

💡 **Miért számít?**
- **Non-blocking operations**: UI nem fagy le API hívások alatt
- **Better user experience**: responsive alkalmazások
- **Performance**: párhuzamos műveletek hatékony kezelése
- **Modern JavaScript**: Promise-based API-k használata

</div>

<div class="runnable-model" data-filter="javascript">

**Runnable mental model**
```javascript
// Event Loop működése - Visual explanation
console.log('1. Synchronous start');

// Timeout kerül a Web API-ba, callback a queue-ba
setTimeout(() => {
    console.log('3. Timeout callback (after event loop)');
}, 0);

// Promise kerül a microtask queue-ba (magasabb prioritás)
Promise.resolve().then(() => {
    console.log('2. Promise microtask (higher priority)');
});

console.log('1.5. Synchronous end');

// Output:
// 1. Synchronous start
// 1.5. Synchronous end  
// 2. Promise microtask (higher priority)
// 3. Timeout callback (after event loop)

// Async/await gyakorlati példák
class APIManager {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.cache = new Map();
    }
    
    // Promise-based approach (régebbi)
    fetchUserWithPromises(userId) {
        return fetch(`${this.baseURL}/users/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then(userData => {
                console.log('User data:', userData);
                return userData;
            })
            .catch(error => {
                console.error('Fetch error:', error);
                throw error;
            });
    }
    
    // Modern async/await approach
    async fetchUser(userId) {
        try {
            const response = await fetch(`${this.baseURL}/users/${userId}`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const userData = await response.json();
            console.log('User data:', userData);
            return userData;
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }
    
    // Parallel operations with Promise.all
    async fetchMultipleUsers(userIds) {
        try {
            const promises = userIds.map(id => this.fetchUser(id));
            const users = await Promise.all(promises);
            return users;
        } catch (error) {
            console.error('Failed to fetch multiple users:', error);
            throw error;
        }
    }
    
    // Sequential operations vs Parallel
    async demonstrateSequentialVsParallel() {
        const userIds = ['1', '2', '3'];
        
        // Sequential (slower) - 3 seconds total
        console.time('Sequential');
        const sequentialUsers = [];
        for (const id of userIds) {
            const user = await this.fetchUser(id); // Wait for each one
            sequentialUsers.push(user);
        }
        console.timeEnd('Sequential');
        
        // Parallel (faster) - 1 second total
        console.time('Parallel');
        const parallelUsers = await this.fetchMultipleUsers(userIds);
        console.timeEnd('Parallel');
        
        return { sequentialUsers, parallelUsers };
    }
    
    // Error handling patterns
    async robustAPICall(endpoint, options = {}) {
        const maxRetries = 3;
        let attempt = 0;
        
        while (attempt < maxRetries) {
            try {
                const response = await fetch(`${this.baseURL}${endpoint}`, {
                    ...options,
                    signal: AbortSignal.timeout(5000) // 5 second timeout
                });
                
                if (!response.ok) {
                    // Retry on server errors, not client errors
                    if (response.status >= 500 && attempt < maxRetries - 1) {
                        attempt++;
                        await this.delay(1000 * attempt); // Exponential backoff
                        continue;
                    }
                    throw new Error(`HTTP ${response.status}`);
                }
                
                return await response.json();
            } catch (error) {
                if (error.name === 'TimeoutError' && attempt < maxRetries - 1) {
                    attempt++;
                    await this.delay(1000 * attempt);
                    continue;
                }
                throw error;
            }
        }
    }
    
    // Utility delay function
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

console.log('Event Loop és async/await példák betöltve');
```

*Figyeld meg: Event Loop prioritások: synchronous → microtasks (Promises) → macrotasks (setTimeout). Async/await = Promise syntactic sugar.*

</div>

<div class="concept-section myths" data-filter="javascript">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Async/await gyorsabb mint Promise.then()." → Ugyanaz a teljesítmény, csak különböző syntax
- „setTimeout(() => {}, 0) azonnal fut." → Event loop miatt nem blocking, de nem instant
- „Async function mindig Promise-t visszaad." → Igaz, még ha return nem Promise is

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="javascript">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Event Loop phases:**
1. **Call Stack** - synchronous code
2. **Microtask Queue** - Promise.then(), queueMicrotask()
3. **Macrotask Queue** - setTimeout(), setInterval()

**Async/await best practices:**
```javascript
// Sequential when needed
const user = await fetchUser();
const profile = await fetchProfile(user.id);

// Parallel when possible
const [user, settings] = await Promise.all([
    fetchUser(),
    fetchSettings()
]);

// Error handling
try {
    const result = await riskyOperation();
} catch (error) {
    console.error(error);
}
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="javascript junior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mi a különbség Promise.all() és Promise.allSettled() között?**
A: Promise.all() fail-fast (egy hiba = összes eldobás), Promise.allSettled() mind lefut, eredményt és hibát is visszaad.

**Q: Miért fut a setTimeout előbb mint a Promise.resolve()?**
A: Event Loop prioritás: Microtask Queue (Promise) > Macrotask Queue (setTimeout).

**Q: Hogyan cancel-lhetsz egy async operációt?**
A: AbortController + AbortSignal használatával.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="javascript">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Promises** → Async/await alapja
- **Event Loop** → JavaScript concurrency model
- **Web APIs** → setTimeout, fetch, DOM events
- **React useEffect** → Async operations komponensekben
- **Error Handling** → Try/catch patterns

</div>

</details>

</div>

### Promise vs Callback vs async/await {#promise-callback-async-await}

<div class="concept-section mental-model" data-filter="javascript junior">

📋 **Fogalom meghatározása**  
*Callback egy függvény, amit paraméterként adunk át egy másik függvénynek, és az aszinkron művelet befejezésekor hívódik meg. Promise egy objektum, amely egy aszinkron művelet jövőbeli sikerét vagy sikertelenségét reprezentálja (pending, fulfilled, rejected állapotokkal). Az async/await egy szintaktikai cukor, amely Promise-alapú kódot szinkron szerkezetben teszi olvashatóvá, az async függvény mindig Promise-t ad vissza.*

</div>

<div class="concept-section why-important" data-filter="javascript junior">

💡 **Miért számít?**
- **Callback hell elkerülése**: olvasható aszinkron kód
- **Error handling**: egységes hibakezelés
- **Composition**: aszinkron műveletek kombinálása
- **Modern JavaScript**: Promise-based API-k használata

</div>

<div class="runnable-model" data-filter="javascript">

**Runnable mental model**
```javascript
// Evolution of Asynchronous JavaScript

// 1. CALLBACK PATTERN (Old school - prone to callback hell)
function fetchUserCallback(userId, callback) {
    setTimeout(() => {
        if (userId === 'invalid') {
            callback(new Error('User not found'), null);
        } else {
            callback(null, { id: userId, name: 'John Doe' });
        }
    }, 1000);
}

// Callback hell example
function getUserDataCallback(userId, finalCallback) {
    fetchUserCallback(userId, (userError, user) => {
        if (userError) {
            finalCallback(userError, null);
            return;
        }
        
        fetchUserPostsCallback(userId, (postsError, posts) => {
            if (postsError) {
                finalCallback(postsError, null);
                return;
            }
            
            // Nested callback for additional data
            fetchUserCommentsCallback(userId, (commentsError, comments) => {
                if (commentsError) {
                    finalCallback(commentsError, null);
                    return;
                }
                
                finalCallback(null, {
                    user,
                    posts,
                    comments
                });
            });
        });
    });
}

// 2. PROMISE PATTERN (ES6 - much cleaner)
function fetchUserPromise(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId === 'invalid') {
                reject(new Error('User not found'));
            } else {
                resolve({ id: userId, name: 'John Doe' });
            }
        }, 1000);
    });
}

// Promise chaining - much cleaner than callbacks
function getUserDataPromise(userId) {
    let userData = {};
    
    return fetchUserPromise(userId)
        .then(user => {
            userData.user = user;
            return fetchUserPostsPromise(userId);
        })
        .then(posts => {
            userData.posts = posts;
            return fetchUserCommentsPromise(userId);
        })
        .then(comments => {
            userData.comments = comments;
            return userData;
        })
        .catch(error => {
            console.error('Error in promise chain:', error);
            throw error;
        });
}

// 3. ASYNC/AWAIT PATTERN (ES2017 - most readable)
async function getUserDataAsync(userId) {
    try {
        const user = await fetchUserAsync(userId);
        const posts = await fetchUserPostsAsync(userId);
        const comments = await fetchUserCommentsAsync(userId);
        
        return { user, posts, comments };
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

// Parallel async/await with Promise.all
async function getUserDataAsyncParallel(userId) {
    try {
        const user = await fetchUserAsync(userId);
        
        // Fetch posts and comments in parallel
        const [posts, comments] = await Promise.all([
            fetchUserPostsAsync(userId),
            fetchUserCommentsAsync(userId)
        ]);
        
        return { user, posts, comments };
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

console.log('Promise vs Callback vs async/await példák betöltve');
```

*Figyeld meg: Callback = régi módszer, Promise = chain-elhető, async/await = szinkron-szerű syntax aszinkron kódhoz.*

</div>

<div class="concept-section myths" data-filter="javascript">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Async/await gyorsabb mint Promise.then()." → Ugyanaz a teljesítmény, csak más syntax
- „Promise.all() fail-safe." → Egy Promise hibája az egész batch-et eldobja
- „Callback pattern elavult." → Bizonyos esetekben (event listeners) még mindig használatos

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="javascript">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Mikor melyiket használd:**
- **Callback**: Event listeners, legacy API-k
- **Promise**: Chain-elhető műveletek, .then()/.catch()
- **Async/await**: Modern, olvasható aszinkron kód

**Performance comparison:**
```javascript
// Sequential (slow)
const user = await fetchUser();
const posts = await fetchPosts(user.id);

// Parallel (fast)
const [user, posts] = await Promise.all([
    fetchUser(),
    fetchPosts()
]);
```

**Error handling:**
- Callback: error-first pattern
- Promise: .catch() vagy try/catch
- Async/await: try/catch blocks

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="javascript junior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mi a callback hell és hogyan kerülhető el?**
A: Túl mélyen nested callback-ek. Megoldás: Promise-ok, async/await, vagy moduláris függvények.

**Q: Promise.all() vs Promise.allSettled() különbség?**
A: Promise.all() failfast (egy hiba = összes fail), allSettled() mindegyik lefut és eredményt ad.

**Q: Mikor használj sequential vs parallel async műveleteket?**
A: Sequential ha a következő függ az előzőtől, parallel ha függetlenek.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="javascript">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Event Loop** → Aszinkron műveletek futtatása
- **Fetch API** → Promise-based HTTP requests
- **React useEffect** → Aszinkron műveletek komponensekben
- **Error Handling** → Try/catch, Promise.catch()
- **Performance** → Parallel vs sequential execution

</div>

</details>

</div>

### TypeScript utility típusok (Partial, Pick, Omit, Record) {#typescript-utility-types}

<div class="concept-section mental-model" data-filter="typescript medior">

📋 **Fogalom meghatározása**  
*A TypeScript utility típusok beépített generic típusok, amelyek meglévő típusok transzformálására szolgálnak: Partial<T> az összes property-t opcionálissá teszi, Pick<T,K> kiválasztott kulcsokat tart meg, Omit<T,K> megadott kulcsokat eltávolít, Record<K,T> kulcs-érték párok típusát definiálja. Ezek compile-time típus manipulációt tesznek lehetővé kód duplikáció nélkül.*

</div>

<div class="concept-section why-important" data-filter="typescript medior">

💡 **Miért számít?**
- **Type transformation**: Meglévő típusokból új típusok generálása
- **Code reusability**: Duplikáció elkerülése típus definíciókban
- **API flexibility**: Különböző use case-ekhez adaptált típusok
- **Type safety**: Compile-time védelem komplex transformációkban

</div>

<div class="runnable-model" data-filter="typescript">

**Runnable mental model**
```typescript
// Base interface for demonstrations
interface User {
    id: string;
    name: string;
    email: string;
    age: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    preferences: {
        theme: 'light' | 'dark';
        notifications: boolean;
        language: string;
    };
}

// 1. PARTIAL<T> - Makes all properties optional
type PartialUser = Partial<User>;
// Equivalent to:
// {
//   id?: string;
//   name?: string;
//   email?: string;
//   age?: number;
//   isActive?: boolean;
//   createdAt?: Date;
//   updatedAt?: Date;
//   preferences?: { ... };
// }

// Real-world usage: Update operations
function updateUser(id: string, updates: Partial<User>): Promise<User> {
    // Only update provided fields
    return fetch(`/api/users/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates)
    }).then(res => res.json());
}

// Usage
updateUser('123', { name: 'New Name' }); // ✅ Valid
updateUser('123', { age: 25, isActive: false }); // ✅ Valid
updateUser('123', { invalidField: 'test' }); // ❌ Type error

// 2. PICK<T, K> - Select specific properties
type UserSummary = Pick<User, 'id' | 'name' | 'email'>;
// Equivalent to:
// {
//   id: string;
//   name: string;
//   email: string;
// }

type UserPreferences = Pick<User, 'preferences'>;
type UserTimestamps = Pick<User, 'createdAt' | 'updatedAt'>;

// Real-world usage: API responses
interface UserListResponse {
    users: UserSummary[];
    total: number;
    page: number;
}

function getUserSummaries(): Promise<UserSummary[]> {
    return fetch('/api/users/summary')
        .then(res => res.json())
        .then(data => data.users);
}

// 3. OMIT<T, K> - Exclude specific properties
type CreateUserRequest = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
// Equivalent to:
// {
//   name: string;
//   email: string;
//   age: number;
//   isActive: boolean;
//   preferences: { ... };
// }

type UserWithoutSensitiveData = Omit<User, 'email' | 'age'>;

// Real-world usage: Form data
function createUser(userData: CreateUserRequest): Promise<User> {
    return fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            ...userData,
            id: generateId(),
            createdAt: new Date(),
            updatedAt: new Date()
        })
    }).then(res => res.json());
}

// 4. RECORD<K, T> - Key-value mapping
type UserRole = 'admin' | 'moderator' | 'user' | 'guest';
type RolePermissions = Record<UserRole, string[]>;
// Equivalent to:
// {
//   admin: string[];
//   moderator: string[];
//   user: string[];
//   guest: string[];
// }

const rolePermissions: RolePermissions = {
    admin: ['read', 'write', 'delete', 'manage'],
    moderator: ['read', 'write', 'moderate'],
    user: ['read', 'write'],
    guest: ['read']
};

type UserStatus = 'online' | 'offline' | 'away' | 'busy';
type StatusColors = Record<UserStatus, string>;

const statusColors: StatusColors = {
    online: '#4ade80',
    offline: '#6b7280',
    away: '#fbbf24',
    busy: '#ef4444'
};

// Advanced utility type combinations
type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Usage: Make some fields optional
type UserRegistration = OptionalFields<CreateUserRequest, 'isActive' | 'preferences'>;
// isActive and preferences become optional, rest required

// 5. Advanced patterns with utility types
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type DeepPartialUser = DeepPartial<User>;
// preferences.theme becomes optional too

// Conditional types with utility types
type NonNullable<T> = T extends null | undefined ? never : T;
type RequiredFields<T> = {
    [K in keyof T]-?: NonNullable<T[K]>;
};

// Database entity patterns
interface BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

type CreateInput<T extends BaseEntity> = Omit<T, keyof BaseEntity>;
type UpdateInput<T extends BaseEntity> = Partial<Omit<T, keyof BaseEntity>>;

// Usage with User extending BaseEntity
type CreateUserInput = CreateInput<User>;
type UpdateUserInput = UpdateInput<User>;

// Form handling with utility types
type FormState<T> = {
    [K in keyof T]: {
        value: T[K];
        error: string | null;
        touched: boolean;
    };
};

type UserFormState = FormState<CreateUserRequest>;

// API response patterns
type ApiResponse<T> = {
    data: T;
    success: boolean;
    message: string;
    errors?: Record<keyof T, string[]>;
};

type UserResponse = ApiResponse<User>;
type UserListResponse = ApiResponse<User[]>;

// Real-world class example using utility types
class UserService {
    async create(userData: CreateUserRequest): Promise<User> {
        const user: User = {
            ...userData,
            id: this.generateId(),
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        return this.saveUser(user);
    }
    
    async update(id: string, updates: UpdateUserInput): Promise<User> {
        const existingUser = await this.findById(id);
        
        const updatedUser: User = {
            ...existingUser,
            ...updates,
            updatedAt: new Date()
        };
        
        return this.saveUser(updatedUser);
    }
    
    async getPublicProfile(id: string): Promise<UserWithoutSensitiveData> {
        const user = await this.findById(id);
        
        // TypeScript knows email and age are omitted
        const { email, age, ...publicData } = user;
        return publicData;
    }
    
    async getSummary(id: string): Promise<UserSummary> {
        const user = await this.findById(id);
        
        // TypeScript ensures only id, name, email are included
        return {
            id: user.id,
            name: user.name,
            email: user.email
        };
    }
    
    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
    
    private async findById(id: string): Promise<User> {
        // Implementation
        throw new Error('Not implemented');
    }
    
    private async saveUser(user: User): Promise<User> {
        // Implementation
        throw new Error('Not implemented');
    }
}

// React component patterns with utility types
interface ComponentProps<T> {
    data: T;
    onEdit?: (item: T) => void;
    onDelete?: (id: string) => void;
    readonly?: boolean;
}

type UserCardProps = ComponentProps<UserSummary>;
type UserListProps = ComponentProps<User[]>;

// Form component with utility types
interface FormProps<T> {
    initialValues?: Partial<T>;
    onSubmit: (values: T) => void;
    validationRules?: Partial<Record<keyof T, (value: any) => string | null>>;
}

type UserFormProps = FormProps<CreateUserRequest>;

// Advanced: Mapped types with template literals
type EventHandlers<T> = {
    [K in keyof T as `on${Capitalize<string & K>}Change`]: (value: T[K]) => void;
};

type UserEventHandlers = EventHandlers<Pick<User, 'name' | 'email' | 'age'>>;
// Results in:
// {
//   onNameChange: (value: string) => void;
//   onEmailChange: (value: string) => void;
//   onAgeChange: (value: number) => void;
// }

// Utility type for extracting function parameters
type ExtractParams<T> = T extends (...args: infer P) => any ? P : never;
type CreateUserParams = ExtractParams<typeof createUser>;

// Conditional types for different scenarios
type NonOptional<T> = {
    [K in keyof T]-?: T[K];
};

type OptionalToRequired<T> = NonOptional<T>;

// Real-world validation schema with utility types
type ValidationSchema<T> = {
    [K in keyof T]?: {
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        pattern?: RegExp;
        custom?: (value: T[K]) => string | null;
    };
};

const userValidationSchema: ValidationSchema<CreateUserRequest> = {
    name: {
        required: true,
        minLength: 2,
        maxLength: 50
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    age: {
        required: true,
        custom: (value) => value < 13 ? 'Must be at least 13 years old' : null
    }
};

console.log('TypeScript utility types loaded');
```

*Figyeld meg: Partial = optional-lá tesz, Pick = kiválaszt, Omit = kizár, Record = key-value map. Kombinálhatóak komplex transzformációkhoz.*

</div>

<div class="concept-section myths" data-filter="typescript">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Utility types runtime-ban is működnek." → Compile-time only, futáskor eltűnnek
- „Pick és Omit ugyanaz mint destructuring." → Csak típus szinten, nem runtime operáció
- „Record helyettesíti az interface-t." → Record key-value map-hez, interface object shape-hez

</div>

</details>

</div>

<div class="concept-section performance" data-filter="typescript performance">

<details>
<summary>🚀 <strong>Performance corner</strong></summary>

<div>

**Compile-time performance:**
```typescript
// ❌ ROSSZ: Túl komplex nested utility types → lassú compilation
type ComplexType<T> = Partial<Pick<Omit<Record<keyof T, T[keyof T]>, 'id'>, 'name' | 'email'>>;

// ✅ JÓ: Egyszerűbb, olvashatóbb, gyorsabb compile
type UserUpdate = Partial<Pick<User, 'name' | 'email'>>;
```

**TypeScript compiler speed:**
- **Simple utility types**: ~1ms compile time per type
- **Complex nested utilities**: 5-10ms compile time
- **Record with large unions**: Exponential growth (500+ keys = lassú)

**Best practices:**
- Kerüld a 3+ nested utility type-okat
- Union type-okat limitáld 50 literal-ra
- `Record<string, T>` helyett használj `Map<string, T>`-t runtime-ra

**Bundle size impact:**
- Utility types: **0 KB** bundle size (compile-time erasure)
- Type checking overhead: Nincs runtime cost
- Csak a generated JavaScript code mérete számít

</div>

</details>

</div>

<div class="concept-section tools" data-filter="typescript">

<details>
<summary>🧰 <strong>Kapcsolódó API-k / eszközök</strong></summary>

<div>

**Built-in TypeScript utilities (teljes lista):**
```typescript
// Alapvető transzformációk
Partial<T>           // Minden property optional
Required<T>          // Minden property required
Readonly<T>          // Minden property readonly
Pick<T, K>           // Kiválasztott property-k
Omit<T, K>           // Kihagyott property-k
Record<K, T>         // Key-value mapping

// Haladó típus manipuláció
Exclude<T, U>        // Union-ból kizárás
Extract<T, U>        // Union-ból kiválasztás
NonNullable<T>       // null/undefined eltávolítás
ReturnType<T>        // Függvény return type
Parameters<T>        // Függvény paraméterek tuple
InstanceType<T>      // Constructor instance type
ThisParameterType<T> // Function this type
```

**VS Code extensions:**
- **TypeScript Hero** - Auto-import, organize imports
- **Pretty TypeScript Errors** - Olvasható error messages
- **Total TypeScript** - Inline type hints

**CLI tools:**
```bash
# Type checking
tsc --noEmit

# Generate declaration files
tsc --declaration --emitDeclarationOnly

# Type coverage analysis
npx type-coverage --detail
```

**Utility type libraries:**
- **ts-essentials** - Extra utility types
- **utility-types** - További helpers
- **type-fest** - 100+ utility types

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="typescript">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**A Big 4 utility type:**
```typescript
interface User { id: string; name: string; email: string; }

// Partial - mindent optional-lá tesz
type UserUpdate = Partial<User>;

// Pick - kiválaszt mezőket
type UserSummary = Pick<User, 'id' | 'name'>;

// Omit - kizár mezőket  
type CreateUser = Omit<User, 'id'>;

// Record - key-value mapping
type UserRoles = Record<string, User>;
```

**Gyakori patterns:**
- API responses → Pick részleges adatokhoz
- Form inputs → Omit auto-generated mezőkhöz
- Updates → Partial optional változtatásokhoz
- Mapping → Record kulcs-érték párosításhoz

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="typescript medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mikor használnál Pick vs Omit-et?**
A: Pick amikor kevés mezőt akarsz megtartani, Omit amikor keveset akarsz eltávolítani. Pick explicit inclusion, Omit explicit exclusion.

**Q: Hogyan csinálnál deep partial type-ot?**
A: Rekurzív mapped type-pal: `type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] }`

**Q: Mi a különbség Record és Index signature között?**
A: Record<K,V> konkrét kulcs típust vár, Index signature `{[key: string]: V}` bármilyen string kulcsot elfogad.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="typescript">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Mapped Types** → Utility types alapja
- **Conditional Types** → Komplex type transformációk
- **Generic Types** → Type parameterization
- **Interface vs Type** → Type aliasing különbségek
- **API Design** → Type-safe API responses

</div>

</details>

</div>

### Generics a TypeScript-ben {#typescript-generics}

<div class="concept-section mental-model" data-filter="typescript medior">

📋 **Fogalom meghatározása**  
*A Generics olyan típusparaméterek, amelyek lehetővé teszik típusbiztos, újrafelhasználható komponensek, függvények és osztályok létrehozását. A generic típusváltozók (pl. <T>) helyettesítő értékek, amelyek a típus konkrét használatakor helyettesítődnek be, így ugyanaz a kód többféle típussal működhet típusbiztonság megtartása mellett.*

</div>

<div class="concept-section why-important" data-filter="typescript medior">

💡 **Miért számít?**
- **Code reusability**: Ugyanaz a logika különböző típusokkal
- **Type safety**: Compile-time type checking megtartása
- **API flexibility**: Generic komponensek és utility-k
- **Library development**: Type-safe library API-k építése

</div>

<div class="runnable-model" data-filter="typescript">

**Runnable mental model**
```typescript
// Basic Generic Function
function identity<T>(arg: T): T {
    return arg;
}

// Usage with type inference
const stringResult = identity("hello"); // T = string
const numberResult = identity(42); // T = number
const boolResult = identity(true); // T = boolean

// Explicit type annotation
const explicitResult = identity<string>("world");

// Generic Array function
function getFirstElement<T>(arr: T[]): T | undefined {
    return arr.length > 0 ? arr[0] : undefined;
}

const firstNumber = getFirstElement([1, 2, 3]); // number | undefined
const firstString = getFirstElement(["a", "b", "c"]); // string | undefined

// Advanced Generic Functions
function filterArray<T>(
    array: T[], 
    predicate: (item: T) => boolean
): T[] {
    return array.filter(predicate);
}

interface User {
    id: string;
    name: string;
    age: number;
    isActive: boolean;
}

const users: User[] = [
    { id: "1", name: "Alice", age: 25, isActive: true },
    { id: "2", name: "Bob", age: 30, isActive: false },
    { id: "3", name: "Carol", age: 35, isActive: true }
];

// Type-safe filtering
const activeUsers = filterArray(users, user => user.isActive);
const adultUsers = filterArray(users, user => user.age >= 18);

// Generic Interface
interface Repository<T> {
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    create(item: Omit<T, 'id'>): Promise<T>;
    update(id: string, updates: Partial<T>): Promise<T>;
    delete(id: string): Promise<void>;
}

// Implementation
class UserRepository implements Repository<User> {
    private users: User[] = [];

    async findById(id: string): Promise<User | null> {
        return this.users.find(user => user.id === id) || null;
    }

    async findAll(): Promise<User[]> {
        return [...this.users];
    }

    async create(userData: Omit<User, 'id'>): Promise<User> {
        const user: User = {
            ...userData,
            id: Math.random().toString(36).substr(2, 9)
        };
        this.users.push(user);
        return user;
    }

    async update(id: string, updates: Partial<User>): Promise<User> {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            throw new Error('User not found');
        }
        
        this.users[userIndex] = { ...this.users[userIndex], ...updates };
        return this.users[userIndex];
    }

    async delete(id: string): Promise<void> {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            throw new Error('User not found');
        }
        this.users.splice(userIndex, 1);
    }
}

// Generic Class
class ApiClient<T> {
    constructor(private baseUrl: string) {}

    async get(endpoint: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
    }

    async post(endpoint: string, data: Partial<T>): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
    }

    async put(endpoint: string, data: Partial<T>): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
    }

    async delete(endpoint: string): Promise<void> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
    }
}

// Usage
const userApiClient = new ApiClient<User>('/api');
const productApiClient = new ApiClient<Product>('/api');

// Generic Constraints
interface HasId {
    id: string;
}

interface HasTimestamps {
    createdAt: Date;
    updatedAt: Date;
}

// Constrained generic
function updateEntity<T extends HasId & HasTimestamps>(
    entity: T, 
    updates: Partial<Omit<T, 'id' | 'createdAt'>>
): T {
    return {
        ...entity,
        ...updates,
        updatedAt: new Date()
    };
}

// Generic with multiple type parameters
function merge<T, U>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}

const merged = merge(
    { name: "Alice", age: 30 },
    { email: "alice@example.com", isActive: true }
);
// Type: { name: string; age: number; email: string; isActive: boolean; }

// Conditional Types with Generics
type ApiResponse<T> = T extends string 
    ? { message: T } 
    : { data: T };

type StringResponse = ApiResponse<string>; // { message: string }
type UserResponse = ApiResponse<User>; // { data: User }

// Advanced: Generic utility functions
function groupBy<T, K extends keyof T>(
    array: T[], 
    key: K
): Record<string, T[]> {
    return array.reduce((groups, item) => {
        const groupKey = String(item[key]);
        if (!groups[groupKey]) {
            groups[groupKey] = [];
        }
        groups[groupKey].push(item);
        return groups;
    }, {} as Record<string, T[]>);
}

const usersByAge = groupBy(users, 'age');
const usersByStatus = groupBy(users, 'isActive');

// Generic React Component patterns
interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    keyExtractor: (item: T) => string;
    emptyMessage?: string;
    className?: string;
}

function List<T>({ 
    items, 
    renderItem, 
    keyExtractor, 
    emptyMessage = "No items found",
    className = ""
}: ListProps<T>): JSX.Element {
    if (items.length === 0) {
        return <div className="empty-state">{emptyMessage}</div>;
    }

    return (
        <div className={`list ${className}`}>
            {items.map(item => (
                <div key={keyExtractor(item)} className="list-item">
                    {renderItem(item)}
                </div>
            ))}
        </div>
    );
}

// Usage
const UserList = () => (
    <List
        items={users}
        keyExtractor={user => user.id}
        renderItem={user => (
            <div>
                <h3>{user.name}</h3>
                <p>Age: {user.age}</p>
                <p>Status: {user.isActive ? 'Active' : 'Inactive'}</p>
            </div>
        )}
        emptyMessage="No users found"
    />
);

// Generic Hooks
function useLocalStorage<T>(
    key: string,
    defaultValue: T
): [T, (value: T) => void] {
    const [value, setValue] = React.useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch {
            return defaultValue;
        }
    });

    const setStoredValue = React.useCallback((newValue: T) => {
        try {
            setValue(newValue);
            localStorage.setItem(key, JSON.stringify(newValue));
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    }, [key]);

    return [value, setStoredValue];
}

// Usage
function UserSettings() {
    const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
    const [preferences, setPreferences] = useLocalStorage<UserPreferences>('prefs', {
        notifications: true,
        language: 'en'
    });

    return (
        <div>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                Toggle Theme
            </button>
        </div>
    );
}

// Generic with default type parameters
interface PaginatedResponse<T = any> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
}

function usePagination<T = any>(
    fetchFunction: (page: number, limit: number) => Promise<PaginatedResponse<T>>,
    initialLimit: number = 10
) {
    const [state, setState] = React.useState({
        data: [] as T[],
        loading: false,
        error: null as string | null,
        page: 1,
        total: 0,
        hasNext: false,
        hasPrev: false
    });

    const fetchPage = React.useCallback(async (page: number) => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        
        try {
            const response = await fetchFunction(page, initialLimit);
            setState(prev => ({
                ...prev,
                data: response.data,
                page: response.page,
                total: response.total,
                hasNext: response.hasNext,
                hasPrev: response.hasPrev,
                loading: false
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                error: error instanceof Error ? error.message : 'Unknown error',
                loading: false
            }));
        }
    }, [fetchFunction, initialLimit]);

    return {
        ...state,
        fetchPage,
        nextPage: () => state.hasNext && fetchPage(state.page + 1),
        prevPage: () => state.hasPrev && fetchPage(state.page - 1)
    };
}

// Complex generic example: Builder pattern
class QueryBuilder<T> {
    private conditions: Array<(item: T) => boolean> = [];
    private sortFn?: (a: T, b: T) => number;
    private limitCount?: number;

    where(predicate: (item: T) => boolean): QueryBuilder<T> {
        this.conditions.push(predicate);
        return this;
    }

    orderBy<K extends keyof T>(
        key: K, 
        direction: 'asc' | 'desc' = 'asc'
    ): QueryBuilder<T> {
        this.sortFn = (a, b) => {
            const aVal = a[key];
            const bVal = b[key];
            const result = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
            return direction === 'asc' ? result : -result;
        };
        return this;
    }

    limit(count: number): QueryBuilder<T> {
        this.limitCount = count;
        return this;
    }

    execute(data: T[]): T[] {
        let result = data;

        // Apply conditions
        for (const condition of this.conditions) {
            result = result.filter(condition);
        }

        // Apply sorting
        if (this.sortFn) {
            result = result.sort(this.sortFn);
        }

        // Apply limit
        if (this.limitCount) {
            result = result.slice(0, this.limitCount);
        }

        return result;
    }
}

// Usage
const query = new QueryBuilder<User>()
    .where(user => user.isActive)
    .where(user => user.age >= 18)
    .orderBy('age', 'desc')
    .limit(5);

const results = query.execute(users);

console.log('TypeScript Generics examples loaded');
```

*Figyeld meg: Generics = típus paraméter, constraints = típus korlátozás, type inference = automatikus típus felismerés.*

</div>

<div class="concept-section myths" data-filter="typescript">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Generics bonyolítják a kódot." → Ellenkezőleg, csökkentik a duplikációt és növelik a type safety-t
- „Generics runtime overhead-del járnak." → Compile-time csak, runtime-ban eltűnnek
- „<T> mindig T-nek kell lennie." → Bármilyen név lehet: <TData>, <Item>, <Entity>

</div>

</details>

</div>

<div class="concept-section performance" data-filter="typescript performance">

<details>
<summary>🚀 <strong>Performance corner</strong></summary>

<div>

**Compile-time complexity:**
```typescript
// ❌ ROSSZ: Túl komplex nested generics → lassú compilation
type NestedGeneric<T, U, V, W> = Record<keyof T, Record<keyof U, Record<keyof V, W>>>;

// ✅ JÓ: Egyszerűbb generics, gyorsabb compile
type SimpleMap<K extends string, V> = Record<K, V>;
```

**Type inference vs explicit types:**
```typescript
// Type inference (gyorsabb fejlesztés)
const result = identity(42); // Type: number (inferred)

// Explicit type (jobb dokumentáció)
const result2 = identity<number>(42); // Type: number (explicit)
```

**Generic constraint overhead:**
- **No constraint**: ~1ms compile time
- **Simple constraint** (`extends object`): ~2ms compile time
- **Complex constraint** (`extends { a: X, b: Y, c: Z }`): ~5-10ms compile time

**Best practices:**
- Használj type inference-t ahol lehetséges
- Kerüld a 4+ generic paramétert (T, U, V, W már túl sok)
- Constraints-et tartsd egyszerűen
- Generic alias-okkal csökkentsd a duplikációt

**Runtime impact:**
- **Generics**: 0 KB bundle size, 0ms runtime cost
- Csak TypeScript compile-time feature
- JavaScript output ugyanaz mint generic nélkül

</div>

</details>

</div>

<div class="concept-section tools" data-filter="typescript">

<details>
<summary>🧰 <strong>Kapcsolódó API-k / eszközök</strong></summary>

<div>

**TypeScript built-in generic utilities:**
```typescript
// Array generics
Array<T>
ReadonlyArray<T>
Promise<T>
Map<K, V>
Set<T>
WeakMap<K, V>
WeakSet<T>

// Function generics
ReturnType<T>
Parameters<T>
ConstructorParameters<T>
```

**React generic patterns:**
```typescript
// Component props with generics
React.FC<Props>
React.Component<Props, State>
React.PropsWithChildren<Props>
React.ComponentType<Props>

// Hooks with generics
useState<T>
useRef<T>
useReducer<Reducer<State, Action>>
useContext<T>
```

**VS Code features:**
- **Generic parameter hints**: Hover over `<T>` to see constraints
- **Type inference display**: Shows inferred types automatically
- **Quick fix**: "Add explicit type arguments"

**Testing libraries:**
```typescript
// Jest with generics
expect<T>(value: T)
jest.fn<T>()

// React Testing Library
render<Props>(component: React.ComponentType<Props>)
```

**Debugging tools:**
```bash
# Show inferred types in terminal
tsc --noEmit --extendedDiagnostics

# Type checking with generics
tsc --traceResolution
```

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="typescript">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Generic alapok:**
```typescript
// Function generic
function identity<T>(arg: T): T { return arg; }

// Interface generic
interface Box<T> { value: T; }

// Class generic
class Container<T> { 
    constructor(public item: T) {} 
}

// Constraint
function process<T extends HasId>(item: T): T { 
    console.log(item.id); 
    return item; 
}
```

**Gyakori patterns:**
- Repository pattern → `Repository<T>`
- API client → `ApiClient<T>`
- React components → `List<T>`
- Hooks → `useLocalStorage<T>`

**Type inference:**
```typescript
const result = identity("hello"); // T = string (inferred)
const numbers = [1, 2, 3]; // number[] (inferred)
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="typescript medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mi a különbség generic constraint és union type között?**
A: Generic constraint (`T extends U`) korlátozza a típus paraméter lehetőségeit, union type (`A | B`) konkrét típusok közül választ.

**Q: Hogyan írnál egy type-safe deep clone function-t?**
A: `function deepClone<T>(obj: T): T` generic function-nal, recursive object handling-gel.

**Q: Mikor használnál generic vs overload-ot?**
A: Generic ha ugyanaz a logika különböző típusokkal, overload ha teljesen különböző viselkedés kell.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="typescript">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Utility Types** → Generics használják őket
- **Constraints** → Generic típusok korlátozása
- **Type Inference** → Automatikus típus meghatározás
- **Conditional Types** → Generic-eken alapuló döntések
- **Mapped Types** → Generics objektum transzformációhoz

</div>

</details>

</div>

### Type narrowing és type guards {#typescript-type-narrowing}

<div class="concept-section mental-model" data-filter="typescript medior">

📋 **Fogalom meghatározása**  
*Type narrowing a TypeScript folyamata, amely során a compiler egy szélesebb típust (pl. union type) szűkebb típusra szűkít kontrollfolyamat-elemzés (control flow analysis) alapján. Type guards olyan kifejezések vagy függvények, amelyek runtime ellenőrzést végeznek és a compiler számára jelzik a típusszűkítést (typeof, instanceof, in operátor, custom type predicates).*

</div>

<div class="concept-section why-important" data-filter="typescript medior">

💡 **Miért számít?**
- **Runtime safety**: Típus ellenőrzés futás közben
- **Intelligent IntelliSense**: IDE pontosan tudja milyen típussal dolgozol
- **Error prevention**: Compile-time védelem type casting hibák ellen
- **Performance**: Optimalizált kód generálás

</div>

<div class="runnable-model" data-filter="typescript">

**Runnable mental model**
```typescript
// Union Types and Basic Type Narrowing
type User = {
    type: 'user';
    id: string;
    name: string;
    email: string;
};

type Admin = {
    type: 'admin';
    id: string;
    name: string;
    email: string;
    permissions: string[];
};

type Guest = {
    type: 'guest';
    sessionId: string;
};

type Person = User | Admin | Guest;

// 1. DISCRIMINATED UNIONS - Type narrowing with literal types
function getDisplayName(person: Person): string {
    // TypeScript knows person could be User | Admin | Guest
    
    switch (person.type) {
        case 'user':
            // TypeScript now knows person is User
            return person.name; // ✅ TypeScript knows .name exists
            
        case 'admin':
            // TypeScript now knows person is Admin
            return `Admin: ${person.name}`;
            
        case 'guest':
            // TypeScript now knows person is Guest
            return `Guest ${person.sessionId}`;
            
        default:
            // TypeScript ensures exhaustiveness
            const _exhaustive: never = person;
            throw new Error('Unhandled person type');
    }
}

// 2. TYPE GUARDS - Custom type checking functions
function isUser(person: Person): person is User {
    return person.type === 'user';
}

function isAdmin(person: Person): person is Admin {
    return person.type === 'admin';
}

function isGuest(person: Person): person is Guest {
    return person.type === 'guest';
}

// Usage of type guards
function handlePerson(person: Person) {
    if (isUser(person)) {
        // TypeScript knows person is User here
        console.log(`User email: ${person.email}`);
        // person.permissions; // ❌ TypeScript error - User doesn't have permissions
    } else if (isAdmin(person)) {
        // TypeScript knows person is Admin here
        console.log(`Admin permissions: ${person.permissions.join(', ')}`);
        console.log(`Admin email: ${person.email}`);
    } else if (isGuest(person)) {
        // TypeScript knows person is Guest here
        console.log(`Guest session: ${person.sessionId}`);
        // person.email; // ❌ TypeScript error - Guest doesn't have email
    }
}

// 3. BUILT-IN TYPE GUARDS
function processValue(value: string | number | boolean | null | undefined) {
    // typeof type guard
    if (typeof value === 'string') {
        // TypeScript knows value is string
        console.log(value.toUpperCase());
        console.log(value.length);
    } else if (typeof value === 'number') {
        // TypeScript knows value is number
        console.log(value.toFixed(2));
        console.log(Math.sqrt(value));
    } else if (typeof value === 'boolean') {
        // TypeScript knows value is boolean
        console.log(value ? 'true' : 'false');
    }
    
    // Truthiness narrowing
    if (value) {
        // TypeScript knows value is string | number | boolean (truthy values)
        // null and undefined are excluded
    }
    
    // Nullish narrowing
    if (value != null) {
        // TypeScript knows value is string | number | boolean
        // Both null and undefined are excluded
    }
}

// 4. INSTANCEOF TYPE GUARDS
class ApiError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

class ValidationError extends Error {
    constructor(public field: string, message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

function handleError(error: unknown) {
    if (error instanceof ApiError) {
        // TypeScript knows error is ApiError
        console.log(`API Error ${error.statusCode}: ${error.message}`);
        
        if (error.statusCode >= 500) {
            // Server error handling
        }
    } else if (error instanceof ValidationError) {
        // TypeScript knows error is ValidationError
        console.log(`Validation Error on ${error.field}: ${error.message}`);
    } else if (error instanceof Error) {
        // TypeScript knows error is Error (but not ApiError or ValidationError)
        console.log(`Generic Error: ${error.message}`);
    } else {
        // TypeScript knows error is unknown (not an Error instance)
        console.log('Unknown error occurred');
    }
}

// 5. IN OPERATOR TYPE GUARDS
interface Bird {
    type: 'bird';
    fly(): void;
    layEggs(): void;
}

interface Fish {
    type: 'fish';
    swim(): void;
    layEggs(): void;
}

type Animal = Bird | Fish;

function moveAnimal(animal: Animal) {
    // Using 'in' operator to check for property existence
    if ('fly' in animal) {
        // TypeScript knows animal is Bird
        animal.fly();
        animal.layEggs();
        // animal.swim(); // ❌ TypeScript error
    } else {
        // TypeScript knows animal is Fish (by elimination)
        animal.swim();
        animal.layEggs();
        // animal.fly(); // ❌ TypeScript error
    }
}

// 6. ADVANCED TYPE GUARDS WITH ASSERTIONS
function assertIsNumber(value: unknown): asserts value is number {
    if (typeof value !== 'number') {
        throw new Error('Expected number');
    }
}

function processUnknownValue(value: unknown) {
    // Before assertion, value is unknown
    // console.log(value.toFixed(2)); // ❌ TypeScript error
    
    assertIsNumber(value);
    
    // After assertion, TypeScript knows value is number
    console.log(value.toFixed(2)); // ✅ No error
    console.log(Math.sqrt(value)); // ✅ No error
}

// 7. COMPLEX TYPE NARROWING SCENARIOS
interface LoadingState {
    status: 'loading';
}

interface SuccessState {
    status: 'success';
    data: any;
}

interface ErrorState {
    status: 'error';
    error: string;
}

type AsyncState = LoadingState | SuccessState | ErrorState;

function renderAsyncState(state: AsyncState) {
    switch (state.status) {
        case 'loading':
            return <div>Loading...</div>;
            
        case 'success':
            // TypeScript knows state.data exists
            return <div>Data: {JSON.stringify(state.data)}</div>;
            
        case 'error':
            // TypeScript knows state.error exists
            return <div>Error: {state.error}</div>;
            
        default:
            // Exhaustiveness check
            const _exhaustive: never = state;
            return null;
    }
}

// 8. TYPE GUARDS FOR ARRAYS AND OBJECTS
function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every(item => typeof item === 'string');
}

function isUserObject(value: unknown): value is User {
    return (
        typeof value === 'object' &&
        value !== null &&
        'type' in value &&
        (value as any).type === 'user' &&
        'id' in value &&
        typeof (value as any).id === 'string' &&
        'name' in value &&
        typeof (value as any).name === 'string' &&
        'email' in value &&
        typeof (value as any).email === 'string'
    );
}

// Better approach with helper functions
function hasProperty<T extends object, K extends string>(
    obj: T,
    prop: K
): obj is T & Record<K, unknown> {
    return prop in obj;
}

function isUserObjectBetter(value: unknown): value is User {
    return (
        typeof value === 'object' &&
        value !== null &&
        hasProperty(value, 'type') &&
        value.type === 'user' &&
        hasProperty(value, 'id') &&
        typeof value.id === 'string' &&
        hasProperty(value, 'name') &&
        typeof value.name === 'string' &&
        hasProperty(value, 'email') &&
        typeof value.email === 'string'
    );
}

// 9. CONDITIONAL TYPE NARROWING
type NonNullable<T> = T extends null | undefined ? never : T;

function processNonNullableValue<T>(value: T): NonNullable<T> {
    if (value == null) {
        throw new Error('Value cannot be null or undefined');
    }
    return value as NonNullable<T>;
}

// 10. REAL-WORLD EXAMPLE: API Response Handling
interface ApiSuccessResponse<T> {
    success: true;
    data: T;
}

interface ApiErrorResponse {
    success: false;
    error: string;
    code: number;
}

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

function handleApiResponse<T>(response: ApiResponse<T>): T {
    if (response.success) {
        // TypeScript knows response is ApiSuccessResponse<T>
        return response.data;
    } else {
        // TypeScript knows response is ApiErrorResponse
        throw new Error(`API Error ${response.code}: ${response.error}`);
    }
}

// Usage
async function fetchUser(id: string): Promise<User> {
    const response = await fetch(`/api/users/${id}`);
    const data: ApiResponse<User> = await response.json();
    
    return handleApiResponse(data); // Type-safe!
}

// 11. CUSTOM TYPE PREDICATE FUNCTIONS
const isString = (value: unknown): value is string => typeof value === 'string';
const isNumber = (value: unknown): value is number => typeof value === 'number';
const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';

function processFormData(formData: Record<string, unknown>) {
    Object.entries(formData).forEach(([key, value]) => {
        if (isString(value)) {
            console.log(`${key}: "${value}" (string, length: ${value.length})`);
        } else if (isNumber(value)) {
            console.log(`${key}: ${value} (number, fixed: ${value.toFixed(2)})`);
        } else if (isBoolean(value)) {
            console.log(`${key}: ${value} (boolean)`);
        } else {
            console.log(`${key}: unknown type`);
        }
    });
}

// 12. EXHAUSTIVENESS CHECKING
type Theme = 'light' | 'dark' | 'auto';

function getThemeColors(theme: Theme): { background: string; text: string } {
    switch (theme) {
        case 'light':
            return { background: '#ffffff', text: '#000000' };
        case 'dark':
            return { background: '#000000', text: '#ffffff' };
        case 'auto':
            return { background: '#f0f0f0', text: '#333333' };
        default:
            // This ensures all cases are handled
            const _exhaustive: never = theme;
            throw new Error(`Unhandled theme: ${_exhaustive}`);
    }
}

// If you add a new theme type, TypeScript will force you to handle it
// type Theme = 'light' | 'dark' | 'auto' | 'high-contrast'; // This would cause an error

// 13. HIGHER-ORDER TYPE GUARDS
function createArrayTypeGuard<T>(
    itemTypeGuard: (item: unknown) => item is T
) {
    return (value: unknown): value is T[] => {
        return Array.isArray(value) && value.every(itemTypeGuard);
    };
}

const isUserArray = createArrayTypeGuard(isUserObject);

// Usage
function processUsers(data: unknown) {
    if (isUserArray(data)) {
        // TypeScript knows data is User[]
        data.forEach(user => {
            console.log(user.name); // ✅ Type-safe
        });
    }
}

console.log('Type narrowing and type guards examples loaded');
```

*Figyeld meg: Type guards = futásidejű ellenőrzés + compile-time információ. Discriminated unions = típus mezővel való szűkítés.*

</div>

<div class="concept-section myths" data-filter="typescript">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Type guards csak compile-time-ban működnek." → Ellenkezőleg, runtime checking + compile-time type info
- „typeof elegendő minden type guard-hoz." → Complex object-ekhez custom type guard kell
- „Type narrowing automatikus." → Explicit checking és guard functions szükségesek

</div>

</details>

</div>

<div class="concept-section performance" data-filter="typescript performance">

<details>
<summary>🚀 <strong>Performance corner</strong></summary>

<div>

**Runtime type checking cost:**
```typescript
// ❌ LASSÚ: Túl sok type guard minden render-nél
function Component({ data }: { data: unknown }) {
    if (isComplexObject(data)) { // Mély object traversal
        if (hasAllProperties(data)) { // Ismételt checking
            // ...
        }
    }
}

// ✅ GYORS: Type guard csak egyszer, cache eredmény
function Component({ data }: { data: unknown }) {
    const validData = useMemo(() => {
        return isComplexObject(data) ? data : null;
    }, [data]);
    
    if (validData) {
        // Use cached valid data
    }
}
```

**Type guard performance:**
- **typeof check**: ~0.001ms (fastest)
- **instanceof check**: ~0.01ms (fast)
- **in operator**: ~0.02ms (medium)
- **Custom type guard (shallow)**: ~0.1ms
- **Custom type guard (deep)**: ~1-5ms (slow)

**Discriminated union performance:**
```typescript
// ✅ GYORS: O(1) switch on literal
switch (state.status) {
    case 'loading': return <Spinner />;
    case 'success': return <Data data={state.data} />;
    case 'error': return <Error error={state.error} />;
}

// ❌ LASSABB: Multiple type guard calls
if (isLoading(state)) return <Spinner />;
if (isSuccess(state)) return <Data data={state.data} />;
if (isError(state)) return <Error error={state.error} />;
```

**Best practices:**
- Használj discriminated unions ahol lehetséges (gyorsabb)
- Cache-eld a type guard eredményeket (useMemo)
- Kerüld a deep type guard-okat hot path-ban
- typeof/instanceof előnyben részesítése custom guard-okkal szemben

</div>

</details>

</div>

<div class="concept-section tools" data-filter="typescript">

<details>
<summary>🧰 <strong>Kapcsolódó API-k / eszközök</strong></summary>

<div>

**Built-in type guards:**
```typescript
typeof       // Primitív típusok
instanceof   // Class instances
Array.isArray() // Array check
in           // Property existence

// Optional chaining + nullish coalescing
value?.property
value ?? defaultValue
```

**Runtime validation libraries:**
```bash
# Zod - Schema validation with type inference
npm install zod

# io-ts - Functional programming approach
npm install io-ts

# Yup - Schema validation
npm install yup

# AJV - JSON Schema validator
npm install ajv
```

**Zod example:**
```typescript
import { z } from 'zod';

const UserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    age: z.number().min(0)
});

type User = z.infer<typeof UserSchema>;

function parseUser(data: unknown): User {
    return UserSchema.parse(data); // Throws if invalid
}

// Type guard with Zod
function isUser(data: unknown): data is User {
    return UserSchema.safeParse(data).success;
}
```

**VS Code extensions:**
- **Error Lens** - Inline type errors
- **Pretty TypeScript Errors** - Readable error messages
- **TypeScript Error Translator** - Plain English errors

**Debugging:**
```typescript
// Type assertions for debugging
const value: unknown = getData();
console.log((value as any).property); // Temporary bypass

// Type logging
type Test = typeof value;
//   ^? Hover to see type
```

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="typescript">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Type guard patterns:**
```typescript
// Built-in guards
typeof value === 'string'
value instanceof Error
'property' in object

// Custom type guards
function isUser(x: unknown): x is User {
    return x != null && typeof x === 'object' && 'id' in x;
}

// Discriminated unions
type State = 
    | { status: 'loading' }
    | { status: 'success'; data: any }
    | { status: 'error'; error: string };

// Usage
if (state.status === 'success') {
    // TypeScript knows state.data exists
}
```

**Exhaustiveness checking:**
```typescript
const _exhaustive: never = value; // Forces all cases
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="typescript medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mi a különbség type assertion és type guard között?**
A: Type assertion (`as Type`) compile-time only, type guard runtime checking + compile-time narrowing.

**Q: Hogyan biztosítod az exhaustiveness checking-et union type-oknál?**
A: `const _exhaustive: never = value` a default case-ben, így TypeScript hibát ad ha új case-t adsz hozzá.

**Q: Mikor használnál discriminated union vs instanceof?**
A: Discriminated union plain object-ekhez, instanceof class instance-okhoz.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="typescript">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Union Types** → Type narrowing alapja
- **Discriminated Unions** → Type guard pattern
- **Control Flow Analysis** → TypeScript type narrowing mechanizmus
- **Runtime Type Checking** → Type guard implementation
- **Pattern Matching** → Switch-case exhaustiveness

</div>

</details>

</div>

### JSX és Virtual DOM {#jsx-virtual-dom}

<div class="concept-section mental-model" data-filter="react junior">

📋 **Fogalom meghatározása**  
*JSX (JavaScript XML) egy szintaktikai kiterjesztés, amely lehetővé teszi XML-szerű szintaxis használatát JavaScriptben, és transpiláláskor React.createElement() hívásokká alakul. A Virtual DOM egy könnyűsúlyú JavaScript reprezentációja a valódi DOM-nak, amely memóriában tárolódik és diffing algoritmussal összehasonlítva a valódi DOM-mal csak a szükséges változtatásokat alkalmazza (reconciliation).*

</div>

<div class="concept-section why-important" data-filter="react junior">

💡 **Miért számít?**
- **Developer experience**: HTML-szerű syntax JavaScript-ben
- **Performance**: Virtual DOM optimalizálja a DOM update-eket
- **Declarative programming**: Mit akarsz, nem hogy hogyan csináld
- **Component composition**: Újrafelhasználható UI building block-ok

</div>

<div class="runnable-model" data-filter="react">

**Runnable mental model**
```tsx
// JSX FUNDAMENTALS

// 1. BASIC JSX SYNTAX
function SimpleComponent() {
    const name = "React Developer";
    const isLoggedIn = true;
    
    return (
        <div className="welcome-container">
            <h1>Hello, {name}!</h1>
            {isLoggedIn ? (
                <p>Welcome back!</p>
            ) : (
                <p>Please log in</p>
            )}
        </div>
    );
}

// 2. JSX COMPILATION PROCESS
// What you write:
const element = <h1 className="greeting">Hello, world!</h1>;

// What Babel compiles it to:
const compiledElement = React.createElement(
    'h1',
    { className: 'greeting' },
    'Hello, world!'
);

// React 17+ new JSX transform:
import { jsx as _jsx } from 'react/jsx-runtime';
const newElement = _jsx('h1', {
    className: 'greeting',
    children: 'Hello, world!'
});

// 3. COMPLEX JSX PATTERNS
interface TodoItem {
    id: string;
    text: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    dueDate?: Date;
}

interface TodoListProps {
    todos: TodoItem[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newText: string) => void;
}

function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
    const [editingId, setEditingId] = React.useState<string | null>(null);
    const [editText, setEditText] = React.useState('');

    const handleEditStart = (todo: TodoItem) => {
        setEditingId(todo.id);
        setEditText(todo.text);
    };

    const handleEditSave = () => {
        if (editingId && editText.trim()) {
            onEdit(editingId, editText.trim());
            setEditingId(null);
            setEditText('');
        }
    };

    const handleEditCancel = () => {
        setEditingId(null);
        setEditText('');
    };

    const getPriorityColor = (priority: TodoItem['priority']) => {
        const colors = {
            low: '#10b981',
            medium: '#f59e0b',
            high: '#ef4444'
        };
        return colors[priority];
    };

    const formatDueDate = (date: Date) => {
        const today = new Date();
        const diffTime = date.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Tomorrow';
        if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
        return `${diffDays} days left`;
    };

    return (
        <div className="todo-list">
            <div className="todo-header">
                <h2>My Tasks ({todos.length})</h2>
                <div className="todo-stats">
                    <span className="completed-count">
                        {todos.filter(todo => todo.completed).length} completed
                    </span>
                    <span className="pending-count">
                        {todos.filter(todo => !todo.completed).length} pending
                    </span>
                </div>
            </div>

            {todos.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">📝</div>
                    <h3>No tasks yet</h3>
                    <p>Add your first task to get started!</p>
                </div>
            ) : (
                <ul className="todo-items">
                    {todos.map(todo => (
                        <li 
                            key={todo.id}
                            className={`todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority}`}
                        >
                            <div className="todo-content">
                                <div className="todo-main">
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => onToggle(todo.id)}
                                        className="todo-checkbox"
                                    />
                                    
                                    <div 
                                        className="priority-indicator"
                                        style={{ backgroundColor: getPriorityColor(todo.priority) }}
                                        title={`Priority: ${todo.priority}`}
                                    />

                                    {editingId === todo.id ? (
                                        <div className="todo-edit">
                                            <input
                                                type="text"
                                                value={editText}
                                                onChange={(e) => setEditText(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleEditSave();
                                                    } else if (e.key === 'Escape') {
                                                        handleEditCancel();
                                                    }
                                                }}
                                                className="todo-edit-input"
                                                autoFocus
                                            />
                                            <div className="todo-edit-actions">
                                                <button 
                                                    onClick={handleEditSave}
                                                    className="btn btn-save"
                                                    disabled={!editText.trim()}
                                                >
                                                    ✓
                                                </button>
                                                <button 
                                                    onClick={handleEditCancel}
                                                    className="btn btn-cancel"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <span 
                                            className="todo-text"
                                            onDoubleClick={() => handleEditStart(todo)}
                                        >
                                            {todo.text}
                                        </span>
                                    )}
                                </div>

                                <div className="todo-meta">
                                    {todo.dueDate && (
                                        <span 
                                            className={`due-date ${
                                                todo.dueDate < new Date() ? 'overdue' : ''
                                            }`}
                                        >
                                            📅 {formatDueDate(todo.dueDate)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="todo-actions">
                                {editingId !== todo.id && (
                                    <>
                                        <button
                                            onClick={() => handleEditStart(todo)}
                                            className="btn btn-icon"
                                            title="Edit task"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => onDelete(todo.id)}
                                            className="btn btn-icon btn-danger"
                                            title="Delete task"
                                        >
                                            🗑️
                                        </button>
                                    </>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

// 4. VIRTUAL DOM CONCEPT DEMONSTRATION
function VirtualDOMDemo() {
    const [count, setCount] = React.useState(0);
    const [items, setItems] = React.useState<string[]>(['Item 1', 'Item 2', 'Item 3']);

    // This demonstrates how Virtual DOM works
    // React compares the previous virtual DOM tree with the new one
    // and only updates the parts that actually changed

    const addItem = () => {
        setItems(prev => [...prev, `Item ${prev.length + 1}`]);
    };

    const removeItem = (index: number) => {
        setItems(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="virtual-dom-demo">
            <h3>Virtual DOM in Action</h3>
            
            {/* This button only updates its text content, not the entire component */}
            <button onClick={() => setCount(count + 1)}>
                Count: {count}
            </button>

            {/* When items change, React only adds/removes DOM nodes as needed */}
            <div className="item-list">
                <button onClick={addItem}>Add Item</button>
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>
                            {item}
                            <button onClick={() => removeItem(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Static content isn't re-rendered */}
            <div className="static-content">
                <p>This paragraph never changes, so Virtual DOM won't touch it.</p>
                <p>Current time when component mounted: {new Date().toLocaleTimeString()}</p>
            </div>
        </div>
    );
}

// 5. JSX CONDITIONAL RENDERING PATTERNS
interface UserProfileProps {
    user: User | null;
    loading: boolean;
    error: string | null;
}

function UserProfile({ user, loading, error }: UserProfileProps) {
    // Early return pattern
    if (loading) {
        return (
            <div className="loading-state">
                <div className="spinner" />
                <p>Loading user profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-state">
                <div className="error-icon">⚠️</div>
                <h3>Error loading profile</h3>
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>
                    Try Again
                </button>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="empty-state">
                <h3>No user found</h3>
                <p>The requested user profile does not exist.</p>
            </div>
        );
    }

    // Main render when user exists
    return (
        <div className="user-profile">
            <div className="profile-header">
                <img 
                    src={user.avatar || '/default-avatar.png'} 
                    alt={user.name}
                    className="profile-avatar"
                />
                <div className="profile-info">
                    <h1>{user.name}</h1>
                    <p className="user-email">{user.email}</p>
                    {user.isActive ? (
                        <span className="status-badge active">Active</span>
                    ) : (
                        <span className="status-badge inactive">Inactive</span>
                    )}
                </div>
            </div>

            {/* Conditional sections */}
            {user.preferences && (
                <div className="profile-section">
                    <h3>Preferences</h3>
                    <div className="preferences-grid">
                        <div className="preference-item">
                            <span>Theme:</span>
                            <span>{user.preferences.theme}</span>
                        </div>
                        <div className="preference-item">
                            <span>Notifications:</span>
                            <span>{user.preferences.notifications ? 'Enabled' : 'Disabled'}</span>
                        </div>
                        <div className="preference-item">
                            <span>Language:</span>
                            <span>{user.preferences.language}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Complex conditional rendering */}
            <div className="profile-actions">
                {user.role === 'admin' && (
                    <button className="btn btn-primary">
                        Admin Dashboard
                    </button>
                )}
                
                {(user.role === 'admin' || user.role === 'moderator') && (
                    <button className="btn btn-secondary">
                        Moderation Tools
                    </button>
                )}
                
                <button className="btn btn-outline">
                    Edit Profile
                </button>
            </div>
        </div>
    );
}

// 6. JSX CHILDREN AND COMPOSITION PATTERNS
interface CardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'elevated' | 'outlined';
}

function Card({ title, children, className = '', variant = 'default' }: CardProps) {
    return (
        <div className={`card card--${variant} ${className}`}>
            {title && (
                <div className="card-header">
                    <h3 className="card-title">{title}</h3>
                </div>
            )}
            <div className="card-content">
                {children}
            </div>
        </div>
    );
}

// Usage with composition
function DashboardExample() {
    return (
        <div className="dashboard">
            <Card title="User Statistics" variant="elevated">
                <div className="stats-grid">
                    <div className="stat-item">
                        <span className="stat-value">1,234</span>
                        <span className="stat-label">Total Users</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">89.5%</span>
                        <span className="stat-label">Active Rate</span>
                    </div>
                </div>
            </Card>

            <Card title="Recent Activity">
                <ul className="activity-list">
                    <li>User John signed up</li>
                    <li>New post created</li>
                    <li>Comment posted</li>
                </ul>
            </Card>

            <Card variant="outlined">
                <p>This card has no title but contains custom content.</p>
                <button className="btn btn-primary">Action Button</button>
            </Card>
        </div>
    );
}

// 7. JSX FRAGMENTS AND KEY PATTERNS
function ItemList({ items }: { items: string[] }) {
    return (
        <>
            {items.map((item, index) => (
                <React.Fragment key={item}>
                    <div className="item">{item}</div>
                    {index < items.length - 1 && <div className="divider" />}
                </React.Fragment>
            ))}
        </>
    );
}

// 8. PERFORMANCE CONSIDERATIONS WITH JSX
const ExpensiveComponent = React.memo(({ data }: { data: any[] }) => {
    console.log('ExpensiveComponent rendered');
    
    return (
        <div>
            {data.map(item => (
                <div key={item.id} className="expensive-item">
                    {/* Complex rendering logic */}
                    {item.name}
                </div>
            ))}
        </div>
    );
});

function PerformanceDemo() {
    const [count, setCount] = React.useState(0);
    const [data] = React.useState([
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' }
    ]);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>
                Count: {count}
            </button>
            
            {/* This component won't re-render when count changes 
                because data prop doesn't change and component is memoized */}
            <ExpensiveComponent data={data} />
        </div>
    );
}

console.log('JSX and Virtual DOM examples loaded');
```

*Figyeld meg: JSX = syntactic sugar React.createElement-hez. Virtual DOM = in-memory representation, gyors diffing és batched updates.*

</div>

<div class="concept-section myths" data-filter="react">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „JSX lassabb mint vanilla JavaScript." → Compile-time-ban optimalizálódik, nincs runtime overhead
- „Virtual DOM mindig gyorsabb mint direct DOM manipulation." → Kis változtatásoknál közel egyforma, nagy batch-eknél nyerő
- „JSX-ben használhatok any HTML attribut-ot." → React-specific prop-ok (className, onClick) és camelCase szükséges

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="react">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**JSX alapszabályok:**
```tsx
// JavaScript expression-ök {}-ben
const name = "World";
<h1>Hello {name}!</h1>

// Conditional rendering
{isVisible && <div>Content</div>}
{user ? <Welcome user={user} /> : <Login />}

// Lists with keys
{items.map(item => 
    <div key={item.id}>{item.name}</div>
)}

// Fragments
<>
    <h1>Title</h1>
    <p>Content</p>
</>
```

**Virtual DOM munkafolyamat:**
1. State change → új Virtual DOM tree
2. Diffing → összehasonlítás előző tree-vel
3. Reconciliation → minimális DOM update-ek
4. Commit → valódi DOM módosítások

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="react junior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mi a Virtual DOM és miért hasznos?**
A: In-memory representation of real DOM. Benefit: batch updates, efficient diffing, predictable performance.

**Q: Hogyan működik a JSX transformation?**
A: Babel transzformálja React.createElement() hívásokká, React 17+ óta jsx() runtime function.

**Q: Miért kell key prop list rendereléshez?**
A: React azonosítja mely elemek változtak/adódtak hozzá/törlődtek, optimalizálja a re-rendering-et.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="react">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Babel** → JSX transpilation
- **React Elements** → JSX output
- **Reconciliation** → Virtual DOM diffing algorithm
- **Keys** → List rendering optimization
- **React Fiber** → New reconciliation engine

</div>

</details>

</div>

---

### useState {#usestate}

<div class="concept-section mental-model" data-filter="hooks junior react">

📋 **Fogalom meghatározása**  
*A **useState** egy React Hook, amely lehetővé teszi lokális állapot (state) hozzáadását funkcionális komponensekhez. Az állapot változása újrarenderelést vált ki. A hook egy párt ad vissza: `[state, setState]`, ahol a `state` az aktuális értéket tartalmazza, a `setState` pedig egy függvény az értékk frissítéséhez. Az állapot frissítés aszinkron, és batch-elve történik a teljesítmény érdekében.*

</div>

<div class="concept-section why-important" data-filter="hooks junior">

💡 **Miért számít?**
- **Functional components state-tel**: Class component-ek nélkül is lehet állapotot kezelni
- **Egyszerűbb kód**: Kevesebb boilerplate mint class component-ek esetében
- **Multiple states**: Több független state változó egyszerűen kezelhető
- **Hooks composition**: Kombinálható más Hook-okkal (useEffect, useMemo)
- **TypeScript support**: Erős típusosítás generic type-okkal

</div>

<div class="runnable-model" data-filter="hooks react">

**Runnable mental model**
```tsx
import React, { useState } from 'react';

// 1. ALAPVETŐ HASZNÁLAT - Primitív típusok
const Counter: React.FC = () => {
    // TypeScript automatikusan kikövetkezteti a number típust
    const [count, setCount] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [name, setName] = useState('');

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(prev => prev + 1)}>Increment (functional)</button>
        </div>
    );
};

// 2. KOMPLEX TÍPUSOK - Objects és Arrays
interface User {
    id: string;
    name: string;
    email: string;
    preferences: {
        theme: 'light' | 'dark';
        notifications: boolean;
    };
}

const UserProfile: React.FC = () => {
    // Explicit TypeScript type
    const [user, setUser] = useState<User | null>(null);
    const [tags, setTags] = useState<string[]>([]);

    // ✅ JÓ: Immutable update pattern
    const updateUserTheme = (theme: 'light' | 'dark') => {
        setUser(prevUser => {
            if (!prevUser) return null;
            return {
                ...prevUser,
                preferences: {
                    ...prevUser.preferences,
                    theme
                }
            };
        });
    };

    // ✅ JÓ: Array immutable update
    const addTag = (tag: string) => {
        setTags(prevTags => [...prevTags, tag]);
    };

    const removeTag = (index: number) => {
        setTags(prevTags => prevTags.filter((_, i) => i !== index));
    };

    return <div>User profile...</div>;
};

// 3. LAZY INITIALIZATION - Drága számítás esetén
const ExpensiveComponent: React.FC = () => {
    // ❌ ROSSZ: Minden render-nél lefut
    const [data, setData] = useState(expensiveCalculation());

    // ✅ JÓ: Csak egyszer fut le, első render-kor
    const [data2, setData2] = useState(() => expensiveCalculation());

    return <div>...</div>;
};

function expensiveCalculation(): number[] {
    console.log('Calculating...');
    return Array.from({ length: 10000 }, (_, i) => i * i);
}

// 4. FUNCTIONAL UPDATE - Előző state alapján
const BatchUpdateExample: React.FC = () => {
    const [count, setCount] = useState(0);

    // ❌ ROSSZ: Closure problem, nem accumulate-ál helyesen
    const handleClickBad = () => {
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);
        // Csak 1-gyel növeli, mert count ugyanaz mindháromszor
    };

    // ✅ JÓ: Functional update, helyes accumulation
    const handleClickGood = () => {
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
        // 3-mal növeli helyesen
    };

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={handleClickBad}>Bad increment</button>
            <button onClick={handleClickGood}>Good increment</button>
        </div>
    );
};
```
*Figyeld meg: **Functional update** (`prev => prev + 1`) mindig biztonságosabb mint a direct update, különösen batch update-eknél.*

</div>

<div class="concept-section myths" data-filter="hooks">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- **"setState szinkron frissítés"** → **Valójában**: Aszinkron és batch-elve történik. React 18+ automatic batching minden esetben.
- **"setState után azonnal olvasható a frissített érték"** → **Valójában**: A frissítés a következő render-ben érvényesül, `console.log` után nem látszik azonnal.
- **"Object state-et közvetlenül módosíthatom"** → **Valójában**: Mindig immutable update kell (spread operator vagy új objektum).
- **"useState dependency useEffect-ben"** → **Valójában**: A setter függvény (`setState`) stabil referencia, nem kell dependency-be tenni.
- **"Minden state változás külön render"** → **Valójában**: React batch-eli az azonos event handler-ben történő frissítéseket (React 18+).

</div>

</details>

</div>

<div class="concept-section performance" data-filter="hooks performance">

<details>
<summary>🚀 <strong>Performance corner</strong></summary>

<div>

**State structure optimization:**
```tsx
// ❌ ROSSZ: Egyetlen nagy object, minden változás full re-render
const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    preferences: {}
});

// ✅ JÓ: Több független state, csak szükséges részek re-render-elnek
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [address, setAddress] = useState('');
```

**Lazy initialization benchmark:**
```tsx
// 🔬 Expensive calculation performance
console.time('Without lazy init');
const [data1] = useState(expensiveCalc()); // Minden render!
console.timeEnd('Without lazy init'); // ~50ms minden render-nél

console.time('With lazy init');
const [data2] = useState(() => expensiveCalc()); // Csak egyszer!
console.timeEnd('With lazy init'); // ~50ms első render, 0ms után
```

**Functional update benefits:**
- **Closure problem elkerülése**: Mindig a legfrissebb state-et használja
- **Concurrent Mode compatibility**: React 18+ future-proof
- **Predictable behavior**: Nem függ a render időzítéstől

</div>

</details>

</div>

<div class="concept-section tools" data-filter="hooks react">

<details>
<summary>🧰 <strong>Kapcsolódó API-k / eszközök</strong></summary>

<div>

**React DevTools:**
- Components tab → State inspection
- Profiler → Re-render tracking state változások miatt
- Hooks section → Minden useState hook látható

**Debugging tools:**
```tsx
// Custom useState with logging
function useStateWithLog<T>(initialValue: T, name: string) {
    const [state, setState] = useState(initialValue);
    
    useEffect(() => {
        console.log(`[${name}] State changed:`, state);
    }, [state, name]);
    
    return [state, setState] as const;
}

// Használat
const [count, setCount] = useStateWithLog(0, 'counter');
```

**TypeScript utilities:**
- `useState<T>` - Explicit type
- `React.Dispatch<React.SetStateAction<T>>` - Setter type
- `React.SetStateAction<T>` - Update action type

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="hooks">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

**1) Mi a különbség `setCount(count + 1)` és `setCount(prev => prev + 1)` között?**
<details>
<summary>Válasz</summary>

Az első closure problem-ba futhat batch update-eknél, a második (functional update) mindig a legfrissebb state-et kapja és biztonságosabb.

</details>

**2) Miért nem frissül a state azonnal a setState hívás után?**
<details>
<summary>Válasz</summary>

A setState aszinkron és batch-elve történik performance okokból. A frissített érték csak a következő render során látható.

</details>

**3) Mikor használjak lazy initialization-t?**
<details>
<summary>Válasz</summary>

Amikor az initial value számítása drága (pl. localStorage olvasás, komplex számítás), mert különben minden render-nél lefut.

</details>

**4) Lehet-e useState-et conditional-ban vagy loop-ban hívni?**
<details>
<summary>Válasz</summary>

NEM! Hook-okat mindig a component top level-jén kell hívni, ugyanabban a sorrendben minden render-nél (Rules of Hooks).

</details>

**5) Mi történik, ha object state-et közvetlenül módosítok (`user.name = 'New'`)?**
<details>
<summary>Válasz</summary>

React nem fogja észrevenni a változást, mert a reference nem változott. Mindig immutable update kell: `setUser({...user, name: 'New'})`.

</details>

</div>

</details>

</div>

---

### useEffect {#useeffect}

<div class="concept-section mental-model" data-filter="hooks medior react">

📋 **Fogalom meghatározása**  
*A **useEffect** egy React Hook, amely lehetővé teszi side effect-ek (mellékhatások) kezelését funkcionális komponensekben. Side effect: bármi ami interakciót jelent a komponensen kívüli világgal (API hívás, DOM manipuláció, subscription, timer). A hook két paramétert fogad: egy effect függvényt és egy **dependency array**-t, amely meghatározza mikor fusson újra az effect. Cleanup függvényt visszaadhat, amely unmount-kor vagy újrafutás előtt hívódik meg.*

</div>

<div class="concept-section why-important" data-filter="hooks medior">

💡 **Miért számít?**
- **Lifecycle replacement**: Helyettesíti a componentDidMount, componentDidUpdate, componentWillUnmount-ot
- **Data fetching**: API hívások kezelésének standard módja
- **Subscription management**: WebSocket, event listener, interval kezelés
- **External system sync**: React state és külső rendszerek szinkronizálása
- **Memory leak prevention**: Cleanup függvénnyel erőforrások felszabadítása

</div>

<div class="runnable-model" data-filter="hooks react">

**Runnable mental model**
```tsx
import React, { useState, useEffect } from 'react';

// 1. DEPENDENCY ARRAY VISELKEDÉS
const DependencyExample: React.FC = () => {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');

    // ❌ Nincs dependency array: MINDEN render után fut
    useEffect(() => {
        console.log('Runs after EVERY render');
    });

    // ✅ Üres dependency array: CSAK egyszer fut (mount-kor)
    useEffect(() => {
        console.log('Runs ONCE on mount');
        // Ideal for: initial data fetch, setup subscriptions
    }, []);

    // ✅ Specific dependencies: fut amikor count változik
    useEffect(() => {
        console.log('Runs when count changes:', count);
        document.title = `Count: ${count}`;
    }, [count]);

    // ✅ Multiple dependencies
    useEffect(() => {
        console.log('Runs when count OR name changes');
    }, [count, name]);

    return <div>...</div>;
};

// 2. DATA FETCHING - Correct pattern with AbortController
interface User {
    id: number;
    name: string;
    email: string;
}

const UserProfile: React.FC<{ userId: number }> = ({ userId }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // ✅ JÓ: AbortController for cleanup
        const abortController = new AbortController();
        
        const fetchUser = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch(
                    `https://api.example.com/users/${userId}`,
                    { signal: abortController.signal }
                );
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                
                // ✅ Only update if not aborted
                if (!abortController.signal.aborted) {
                    setUser(data);
                }
            } catch (err) {
                // ✅ Ignore abort errors
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                if (!abortController.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchUser();

        // ✅ CLEANUP: Cancel request if component unmounts or userId changes
        return () => {
            abortController.abort();
        };
    }, [userId]); // ✅ Re-fetch when userId changes

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>No user found</div>;

    return <div>{user.name}</div>;
};

// 3. EVENT LISTENERS - Proper cleanup
const WindowSizeTracker: React.FC = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        // ✅ Add event listener
        window.addEventListener('resize', handleResize);

        // ✅ CLEANUP: Remove event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty array: setup once, cleanup on unmount

    return <div>{windowSize.width} x {windowSize.height}</div>;
};

// 4. TIMER / INTERVAL - Proper cleanup
const Countdown: React.FC<{ initialSeconds: number }> = ({ initialSeconds }) => {
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        // ✅ Don't run if already at 0
        if (seconds <= 0) return;

        const intervalId = setInterval(() => {
            setSeconds(prev => prev - 1);
        }, 1000);

        // ✅ CLEANUP: Clear interval
        return () => {
            clearInterval(intervalId);
        };
    }, [seconds]); // Re-setup when seconds changes

    return <div>Countdown: {seconds}</div>;
};

// 5. COMPLEX DEPENDENCY - Object/Array
const SearchResults: React.FC = () => {
    const [results, setResults] = useState([]);
    const [filters, setFilters] = useState({ category: 'all', minPrice: 0 });

    // ❌ ROSSZ: filters object minden render-nél új referencia
    useEffect(() => {
        fetchResults(filters);
    }, [filters]); // Infinite loop veszélye!

    // ✅ JÓ: Destructure dependencies
    useEffect(() => {
        const { category, minPrice } = filters;
        fetchResults({ category, minPrice });
    }, [filters.category, filters.minPrice]); // Primitív values

    return <div>...</div>;
};

// 6. RACE CONDITION - Correct handling
const SearchWithRaceCondition: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        let isActive = true; // ✅ Flag to prevent stale updates

        const searchAPI = async () => {
            const data = await fetch(`/api/search?q=${query}`).then(r => r.json());
            
            // ✅ Only update if this effect is still active
            if (isActive) {
                setResults(data);
            }
        };

        if (query) {
            searchAPI();
        }

        return () => {
            isActive = false; // ✅ Mark as inactive on cleanup
        };
    }, [query]);

    return <div>...</div>;
};
```
*Figyeld meg: **Cleanup függvény** kritikus a memory leak és race condition elkerüléséhez.*

</div>

<div class="concept-section myths" data-filter="hooks">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- **"useEffect mindig async function kell legyen"** → **Valójában**: Nem lehet async, de belül használhatsz async function-t (IIFE vagy named function).
- **"Dependency array-ba nem kell minden változót tenni"** → **Valójában**: ESLint `exhaustive-deps` rule figyelmeztet, minden használt external value kell.
- **"Cleanup csak unmount-kor fut"** → **Valójában**: Fut minden újrafutás ELŐTT is (dependency változik).
- **"Object/array dependency mindig újrafuttatja"** → **Valójában**: Igen, mert új referencia minden render-nél. Megoldás: destructure vagy useMemo.
- **"useEffect helyettesíti az összes lifecycle method-ot"** → **Valójában**: Nem, pl. `componentDidCatch` nincs Hook megfelelő (kell Error Boundary).

</div>

</details>

</div>

<div class="concept-section performance" data-filter="hooks performance">

<details>
<summary>🚀 <strong>Performance corner</strong></summary>

<div>

**Unnecessary re-runs elkerülése:**
```tsx
// ❌ ROSSZ: Minden render-nél új object
const [filters, setFilters] = useState({ category: 'all' });

useEffect(() => {
    fetch('/api/data', { body: JSON.stringify(filters) });
}, [filters]); // Új referencia = újrafut minden render-nél

// ✅ JÓ 1: Primitív values
useEffect(() => {
    fetch('/api/data', { body: JSON.stringify({ category: filters.category }) });
}, [filters.category]);

// ✅ JÓ 2: useMemo a dependency-hez
const filtersMemo = useMemo(() => ({ category: filters.category }), [filters.category]);
useEffect(() => {
    fetch('/api/data', { body: JSON.stringify(filtersMemo) });
}, [filtersMemo]);
```

**Heavy computation elkerülése:**
```tsx
// ❌ ROSSZ: Minden render-nél számol, akkor is ha nem kell
useEffect(() => {
    const result = expensiveCalculation(data);
    console.log(result);
}); // Nincs dependency array

// ✅ JÓ: Csak amikor data változik
useEffect(() => {
    const result = expensiveCalculation(data);
    console.log(result);
}, [data]);
```

**AbortController benchmarks:**
- **Without abort**: Component unmount-kor is fut a fetch, memory leak + stale state update
- **With abort**: Fetch cancel, ~50% kevesebb network traffic gyors navigációnál

</div>

</details>

</div>

<div class="concept-section tools" data-filter="hooks react">

<details>
<summary>🧰 <strong>Kapcsolódó API-k / eszközök</strong></summary>

<div>

**React DevTools:**
- Components tab → Effects section, látható minden useEffect
- Profiler → useEffect futási idő tracking
- Re-render highlighting → dependency changes

**ESLint plugin:**
```json
// .eslintrc.json
{
  "plugins": ["react-hooks"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

**Custom useEffect wrappers:**
```tsx
// Debug useEffect - log minden futáskor
function useEffectDebug(effect: () => void | (() => void), deps: any[], name: string) {
    useEffect(() => {
        console.log(`[${name}] Effect running`, deps);
        const cleanup = effect();
        return () => {
            console.log(`[${name}] Cleanup running`);
            cleanup?.();
        };
    }, deps);
}

// useEffectOnce - garantálja hogy csak egyszer fut
function useEffectOnce(effect: () => void | (() => void)) {
    useEffect(effect, []); // eslint-disable-line react-hooks/exhaustive-deps
}
```

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="hooks">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

**1) Mi a különbség useEffect(() => {...}) és useEffect(() => {...}, []) között?**
<details>
<summary>Válasz</summary>

Az első minden render után fut, a második (üres array) csak egyszer mount-kor. Az üres array azt jelenti "nincs dependency, soha ne fuss újra".

</details>

**2) Mikor fusson a cleanup függvény?**
<details>
<summary>Válasz</summary>

1) Component unmount-kor, 2) Minden useEffect újrafutás ELŐTT (amikor dependency változik). Célja: előző effect hatásainak eltávolítása.

</details>

**3) Miért nem lehet useEffect async?**
<details>
<summary>Válasz</summary>

Mert a cleanup függvény azonnal kell visszaadni, nem Promise-t. Megoldás: async function BELÜL hívni (IIFE vagy named async function).

</details>

**4) Mi a race condition useEffect-ben és hogyan kerülhető el?**
<details>
<summary>Válasz</summary>

Amikor gyors dependency változásoknál a korábbi async operation később fejeződik be és felülírja az újabb eredményt. Megoldás: `isActive` flag vagy `AbortController`.

</details>

**5) Miért kell minden external value-t a dependency array-be tenni?**
<details>
<summary>Válasz</summary>

Mert különben stale closure-t kapsz - az effect a régi értékeket látja. ESLint `exhaustive-deps` rule segít ezt elkerülni.

</details>

</div>

</details>

</div>

---

### useMemo & useCallback {#usememo-usecallback}

<div class="concept-section mental-model" data-filter="hooks medior react performance">

📋 **Fogalom meghatározása**  
*A **useMemo** és **useCallback** React Hook-ok memoization-ra (értékek cache-elésére) a render optimalizáció érdekében. A **useMemo** egy **számított érték** eredményét cache-eli, csak akkor számolva újra, ha a dependency-k változnak. A **useCallback** egy **függvény referenciát** cache-el, ugyanúgy dependency array alapján. Fő különbség: `useMemo(() => fn)` cache-eli a függvény VISSZATÉRÉSI ÉRTÉKÉT, míg `useCallback(fn)` magát a FÜGGVÉNYT cache-eli.*

</div>

<div class="concept-section why-important" data-filter="hooks medior performance">

💡 **Miért számít?**
- **Expensive computation optimization**: Drága számítások elkerülése felesleges re-render-eknél
- **Referential equality**: Prop/dependency comparison-öknél stabil referencia (React.memo, useEffect)
- **Child component re-render prevention**: React.memo + useCallback kombináció
- **Performance bottleneck fixing**: Profiler által azonosított lassú komponensek optimalizálása
- **Memory vs CPU trade-off**: Cache tárolás (memória) vs újraszámítás (CPU)

</div>

<div class="runnable-model" data-filter="hooks react performance">

**Runnable mental model**
```tsx
import React, { useState, useMemo, useCallback, memo } from 'react';

// 1. useMemo - EXPENSIVE CALCULATION CACHING
const DataAnalysisDashboard: React.FC<{ data: number[] }> = ({ data }) => {
    const [filterThreshold, setFilterThreshold] = useState(50);

    // ❌ ROSSZ: Minden render-nél újraszámol (akár másik state változik is)
    const statistics = {
        mean: data.reduce((a, b) => a + b, 0) / data.length,
        max: Math.max(...data),
        min: Math.min(...data),
        sorted: [...data].sort((a, b) => a - b)
    };

    // ✅ JÓ: Csak akkor számol újra, ha 'data' változik
    const statisticsMemo = useMemo(() => {
        console.log('Calculating statistics...');
        return {
            mean: data.reduce((a, b) => a + b, 0) / data.length,
            max: Math.max(...data),
            min: Math.min(...data),
            sorted: [...data].sort((a, b) => a - b)
        };
    }, [data]); // Only recalculate when data changes

    // ✅ Filtered data is also memoized
    const filteredData = useMemo(() => {
        console.log('Filtering data...');
        return data.filter(value => value > filterThreshold);
    }, [data, filterThreshold]); // Recalculate when data OR threshold changes

    return (
        <div>
            <p>Mean: {statisticsMemo.mean}</p>
            <p>Filtered count: {filteredData.length}</p>
            <input 
                type="number" 
                value={filterThreshold} 
                onChange={e => setFilterThreshold(Number(e.target.value))}
            />
        </div>
    );
};

// 2. useCallback - FUNCTION REFERENCE STABILITY
interface TodoItemProps {
    id: number;
    text: string;
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
}

// ✅ memo() prevents re-render if props don't change
const TodoItem = memo<TodoItemProps>(({ id, text, onDelete, onToggle }) => {
    console.log(`Rendering TodoItem ${id}`);
    
    return (
        <div>
            <span>{text}</span>
            <button onClick={() => onDelete(id)}>Delete</button>
            <button onClick={() => onToggle(id)}>Toggle</button>
        </div>
    );
});

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Learn React', completed: false },
        { id: 2, text: 'Master Hooks', completed: false }
    ]);
    const [filter, setFilter] = useState('all');

    // ❌ ROSSZ: Minden render-nél új függvény referencia
    // -> TodoItem memo() hiába van, minden gyerek re-render-el
    const handleDeleteBad = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    // ✅ JÓ: Stabil referencia, csak todos változásakor új
    // -> TodoItem memo() működik, csak változott item-ek render-elnek
    const handleDelete = useCallback((id: number) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    }, []); // Empty array: stable reference forever (using functional update)

    const handleToggle = useCallback((id: number) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }, []);

    // ✅ Memoized filtered list
    const filteredTodos = useMemo(() => {
        console.log('Filtering todos...');
        switch (filter) {
            case 'active':
                return todos.filter(todo => !todo.completed);
            case 'completed':
                return todos.filter(todo => todo.completed);
            default:
                return todos;
        }
    }, [todos, filter]);

    return (
        <div>
            <select value={filter} onChange={e => setFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
            </select>
            
            {filteredTodos.map(todo => (
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    text={todo.text}
                    onDelete={handleDelete}
                    onToggle={handleToggle}
                />
            ))}
        </div>
    );
};

// 3. useMemo vs useCallback - KEY DIFFERENCE
const ComparisonExample: React.FC = () => {
    const [count, setCount] = useState(0);

    // useMemo: Returns the RESULT of the function
    const expensiveValue = useMemo(() => {
        return count * 2; // Returns the NUMBER
    }, [count]);
    // Type: number

    // useCallback: Returns the FUNCTION itself
    const expensiveFunction = useCallback(() => {
        return count * 2; // Returns the FUNCTION
    }, [count]);
    // Type: () => number

    // Equivalent to:
    const expensiveFunctionEquivalent = useMemo(() => {
        return () => count * 2; // Returns a function
    }, [count]);

    return (
        <div>
            <p>Value: {expensiveValue}</p>
            <p>Function result: {expensiveFunction()}</p>
        </div>
    );
};

// 4. WHEN NOT TO USE - Premature optimization
const SimpleCounter: React.FC = () => {
    const [count, setCount] = useState(0);

    // ❌ OVER-OPTIMIZATION: Egyszerű számítás, nincs értelme memoize-olni
    const doubled = useMemo(() => count * 2, [count]);
    
    // ✅ JÓ: Direct calculation
    const doubledSimple = count * 2;

    // ❌ OVER-OPTIMIZATION: Függvény nem kerül child-nak
    const handleClick = useCallback(() => {
        setCount(c => c + 1);
    }, []);

    // ✅ JÓ: Inline function (React batch-eli az event handler-eket)
    const handleClickSimple = () => setCount(c => c + 1);

    return (
        <div>
            <p>{count} * 2 = {doubledSimple}</p>
            <button onClick={handleClickSimple}>Increment</button>
        </div>
    );
};
```
*Figyeld meg: **useCallback csak akkor érdemes**, ha a függvényt memo() komponensnek adod át prop-ként, vagy useEffect dependency-ben van.*

</div>

<div class="concept-section myths" data-filter="hooks performance">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- **"useMemo mindig gyorsít"** → **Valójában**: Csak drága számításoknál éri meg, egyszerű esetekben overhead (memória + comparison).
- **"useCallback minden függvénynél kell"** → **Valójában**: Csak ha memo() child-nak átadod vagy useEffect dependency. Inline function gyors.
- **"useMemo és useCallback ugyanaz"** → **Valójában**: useMemo cache-eli az eredményt, useCallback a függvényt magát.
- **"Dependency array elhagyható"** → **Valójában**: Kötelező, különben stale closure vagy infinite memoization.
- **"useMemo garantálja a cache-t"** → **Valójában**: React LEHET hogy eldobja a cache-t memória nyomás alatt (dokumentáció szerint).

</div>

</details>

</div>

<div class="concept-section performance" data-filter="hooks performance">

<details>
<summary>🚀 <strong>Performance corner</strong></summary>

<div>

**Benchmark - Amikor ÉRDEMES useMemo:**
```tsx
// 🔬 Expensive calculation (10,000 items)
const data = Array.from({ length: 10000 }, (_, i) => i);

// ❌ WITHOUT useMemo: ~15ms EVERY render
const sorted = [...data].sort((a, b) => b - a);

// ✅ WITH useMemo: ~15ms FIRST render, ~0.1ms subsequent
const sortedMemo = useMemo(() => [...data].sort((a, b) => b - a), [data]);
```

**Benchmark - Amikor NEM ÉRDEMES useMemo:**
```tsx
// 🔬 Simple calculation
const count = 5;

// ❌ WITH useMemo: ~0.05ms (overhead a comparison és cache kezelés miatt)
const doubled = useMemo(() => count * 2, [count]);

// ✅ WITHOUT useMemo: ~0.01ms (5x gyorsabb!)
const doubledSimple = count * 2;
```

**React.memo + useCallback effectiveness:**
```tsx
// ✅ EFFECTIVE combo
const MemoizedChild = memo(({ onClick }) => <button onClick={onClick}>Click</button>);
const Parent = () => {
    const handleClick = useCallback(() => console.log('clicked'), []);
    return <MemoizedChild onClick={handleClick} />; // No unnecessary re-render
};

// ❌ USELESS - without memo(), useCallback doesn't help
const NonMemoChild = ({ onClick }) => <button onClick={onClick}>Click</button>;
const Parent2 = () => {
    const handleClick = useCallback(() => console.log('clicked'), []);
    return <NonMemoChild onClick={handleClick} />; // Still re-renders
};
```

**Rules of thumb:**
- **useMemo használd**: >5ms computation, array/object creation dependency-hez, large list filtering/sorting
- **useCallback használd**: memo() child prop, useEffect dependency, context value
- **NE használd**: primitív values, simple calculations, inline JSX, nincs performance issue

</div>

</details>

</div>

<div class="concept-section tools" data-filter="hooks react performance">

<details>
<summary>🧰 <strong>Kapcsolódó API-k / eszközök</strong></summary>

<div>

**React DevTools Profiler:**
- Flame chart → komponens render idők
- Ranked chart → leglassabb komponensek
- Commit sávok → useMemo/useCallback hatása látható

**Performance measurement:**
```tsx
// Custom hook - useMemo effectiveness tracking
function useMemoWithStats<T>(factory: () => T, deps: any[], name: string): T {
    const recalcCount = useRef(0);
    
    const value = useMemo(() => {
        recalcCount.current++;
        console.log(`[${name}] Recalculation #${recalcCount.current}`);
        const start = performance.now();
        const result = factory();
        const end = performance.now();
        console.log(`[${name}] Calculation took ${(end - start).toFixed(2)}ms`);
        return result;
    }, deps);
    
    return value;
}

// Használat
const sortedData = useMemoWithStats(
    () => [...data].sort(),
    [data],
    'sortedData'
);
```

**ESLint rule:**
```json
{
  "rules": {
    "react-hooks/exhaustive-deps": "warn" // Warns about missing dependencies
  }
}
```

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="hooks performance">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

**1) Mi a különbség useMemo(() => fn) és useCallback(fn) között?**
<details>
<summary>Válasz</summary>

`useMemo(() => value)` a value-t cache-eli, `useCallback(fn)` a függvényt magát. Ekvivalens: `useMemo(() => fn)` === `useCallback(fn)`.

</details>

**2) Mikor NE használjunk useMemo-t?**
<details>
<summary>Válasz</summary>

Ha a számítás egyszerű (primitív műveletek, <1ms), mert a memoization overhead (comparison + cache) drágább mint az újraszámítás.

</details>

**3) Működik-e a useCallback memo() nélkül a child komponensen?**
<details>
<summary>Válasz</summary>

Működik, de felesleges. Ha a child nem memo(), akkor minden parent render-nél újra render-el, függetlenül a prop referenciától.

</details>

**4) Mi történik ha elhagyom a dependency array-t useMemo/useCallback-nél?**
<details>
<summary>Válasz</summary>

Compile error, kötelező paraméter. Ha üres array-t adsz `[]`, a value/function soha nem frissül (csak első render-kor).

</details>

**5) Garantálja-e a React hogy a useMemo cache soha nem törlődik?**
<details>
<summary>Válasz</summary>

NEM! A dokumentáció szerint React eldobhatja a cache-t memória nyomás alatt. Ne függj tőle semantic correctness-hez, csak performance-hoz.

</details>

</div>

</details>

</div>

---

### React.memo {#react-memo}

<div class="concept-section mental-model" data-filter="react performance medior">

📋 **Fogalom meghatározása**  
*A **React.memo** egy Higher-Order Component (HOC), amely memoize-olja a komponenst - elkerüli az újrarenderelést, ha a props nem változtak. Shallow comparison-t végez a props-okon, és csak akkor renderel újra, ha valamely prop referenciája vagy értéke megváltozik. Opcionálisan custom comparison function adható meg második paraméterként.*

</div>

<div class="concept-section why-important" data-filter="react performance medior">

💡 **Miért számít?**
- **Unnecessary re-renders prevention**: Parent re-render nem okoz child re-render-t ha props unchanged
- **Performance optimization**: Drága komponensek renderelésének elkerülése
- **Component isolation**: Komponensek függetlenek a parent render ciklusától
- **Large lists optimization**: Virtualizált listák és táblázatok performance-a

</div>

<div class="runnable-model" data-filter="react performance">

**Runnable mental model**
```tsx
import React, { useState, useCallback, memo } from 'react';

// 1. BASIC React.memo USAGE
interface UserCardProps {
    name: string;
    email: string;
    avatar: string;
}

// ❌ WITHOUT memo: Re-renders every time parent renders
const UserCardNormal: React.FC<UserCardProps> = ({ name, email, avatar }) => {
    console.log(`Rendering UserCardNormal: ${name}`);
    return (
        <div className="user-card">
            <img src={avatar} alt={name} />
            <h3>{name}</h3>
            <p>{email}</p>
        </div>
    );
};

// ✅ WITH memo: Only re-renders when props change
const UserCardMemo = memo<UserCardProps>(({ name, email, avatar }) => {
    console.log(`Rendering UserCardMemo: ${name}`);
    return (
        <div className="user-card">
            <img src={avatar} alt={name} />
            <h3>{name}</h3>
            <p>{email}</p>
        </div>
    );
});

// Parent component example
const UserList: React.FC = () => {
    const [counter, setCounter] = useState(0);
    const [users] = useState([
        { id: '1', name: 'Alice', email: 'alice@example.com', avatar: '/alice.jpg' },
        { id: '2', name: 'Bob', email: 'bob@example.com', avatar: '/bob.jpg' }
    ]);

    return (
        <div>
            <button onClick={() => setCounter(c => c + 1)}>
                Increment: {counter}
            </button>
            
            {/* ❌ Both re-render on every parent render */}
            {users.map(user => (
                <UserCardNormal key={user.id} {...user} />
            ))}
            
            {/* ✅ Only first render, no re-renders on counter change */}
            {users.map(user => (
                <UserCardMemo key={user.id} {...user} />
            ))}
        </div>
    );
};

// 2. React.memo WITH CALLBACK PROPS - Requires useCallback
interface TodoItemProps {
    id: string;
    text: string;
    completed: boolean;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

const TodoItem = memo<TodoItemProps>(({ id, text, completed, onToggle, onDelete }) => {
    console.log(`Rendering TodoItem: ${text}`);
    
    return (
        <div className="todo-item">
            <input
                type="checkbox"
                checked={completed}
                onChange={() => onToggle(id)}
            />
            <span>{text}</span>
            <button onClick={() => onDelete(id)}>Delete</button>
        </div>
    );
});

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState([
        { id: '1', text: 'Learn React', completed: false },
        { id: '2', text: 'Master memo', completed: false }
    ]);

    // ❌ WRONG: New function every render, memo is useless
    const handleToggleBad = (id: string) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    // ✅ CORRECT: Stable reference with useCallback
    const handleToggleGood = useCallback((id: string) => {
        setTodos(prevTodos => prevTodos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    }, []); // Empty deps because using functional update

    const handleDelete = useCallback((id: string) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    }, []);

    return (
        <div>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    {...todo}
                    onToggle={handleToggleGood}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
};

// 3. CUSTOM COMPARISON FUNCTION
interface ProductCardProps {
    product: {
        id: string;
        name: string;
        price: number;
        description: string;
        lastModified: Date;
    };
    onAddToCart: (id: string) => void;
}

// Custom comparison - ignore lastModified changes
const ProductCard = memo<ProductCardProps>(
    ({ product, onAddToCart }) => {
        console.log(`Rendering ProductCard: ${product.name}`);
        return (
            <div className="product-card">
                <h3>{product.name}</h3>
                <p>${product.price}</p>
                <p>{product.description}</p>
                <button onClick={() => onAddToCart(product.id)}>
                    Add to Cart
                </button>
            </div>
        );
    },
    (prevProps, nextProps) => {
        // Return true if props are equal (skip re-render)
        // Return false if props are different (do re-render)
        return (
            prevProps.product.id === nextProps.product.id &&
            prevProps.product.name === nextProps.product.name &&
            prevProps.product.price === nextProps.product.price &&
            prevProps.product.description === nextProps.product.description &&
            prevProps.onAddToCart === nextProps.onAddToCart
            // Intentionally ignoring lastModified
        );
    }
);

// 4. WHEN NOT TO USE React.memo
// ❌ OVER-OPTIMIZATION: Simple component with cheap render
const SimpleBadge = memo<{ count: number }>(({ count }) => {
    return <span className="badge">{count}</span>;
    // Too simple to benefit from memo overhead
});

// ✅ BETTER: No memo for trivial components
const SimpleGoodBadge: React.FC<{ count: number }> = ({ count }) => {
    return <span className="badge">{count}</span>;
};

// 5. React.memo WITH GENERICS
interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    keyExtractor: (item: T) => string;
}

const GenericList = memo(<T,>({ items, renderItem, keyExtractor }: ListProps<T>) => {
    console.log('Rendering GenericList');
    return (
        <div>
            {items.map(item => (
                <div key={keyExtractor(item)}>
                    {renderItem(item)}
                </div>
            ))}
        </div>
    );
}) as <T>(props: ListProps<T>) => JSX.Element;

// Usage
interface User {
    id: string;
    name: string;
}

const App: React.FC = () => {
    const users: User[] = [
        { id: '1', name: 'Alice' },
        { id: '2', name: 'Bob' }
    ];

    return (
        <GenericList
            items={users}
            renderItem={(user) => <span>{user.name}</span>}
            keyExtractor={(user) => user.id}
        />
    );
};
```
*Figyeld meg: **React.memo + useCallback** kombinációja szükséges, ha a memo-ized komponens callback prop-okat kap.*

</div>

<div class="concept-section myths" data-filter="react performance">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- **"React.memo minden komponensre kell"** → **Valójában**: Csak drága komponensekre és ha props gyakran nem változnak. Overhead van!
- **"React.memo megoldja a performance problémát"** → **Valójában**: useCallback is kell a callback prop-okhoz, különben felesleges.
- **"Memo deep comparison-t végez"** → **Valójában**: Shallow comparison default, deep comparison custom function-nal.
- **"React.memo garantálja hogy nem renderel újra"** → **Valójában**: State/context változás továbbra is újrarenderel.

</div>

</details>

</div>

<div class="concept-section performance" data-filter="react performance">

<details>
<summary>🚀 <strong>Performance corner</strong></summary>

<div>

**Benchmark - React.memo effectiveness:**
```typescript
// 🔬 Component with 100 children
// ❌ WITHOUT memo: 150ms render on parent update
<Parent>
  {children.map(child => <Child key={child.id} {...child} />)}
</Parent>

// ✅ WITH memo: 5ms render on parent update (30x faster!)
<Parent>
  {children.map(child => <MemoizedChild key={child.id} {...child} />)}
</Parent>
```

**Overhead cost:**
- **React.memo comparison**: ~0.01ms per component per render
- **Worthwhile if**: Component render cost > 1ms
- **Not worthwhile if**: Component render cost < 0.1ms

**Custom comparison performance:**
```typescript
// ❌ SLOW: Deep comparison overhead
const areEqual = (prev, next) => {
    return JSON.stringify(prev) === JSON.stringify(next); // 10-50ms!
};

// ✅ FAST: Selective property comparison
const areEqual = (prev, next) => {
    return prev.id === next.id && prev.name === next.name; // 0.01ms
};
```

**When React.memo is effective:**
- ✅ List items (ProductCard, UserCard, TodoItem)
- ✅ Heavy visualization components (Chart, Graph)
- ✅ Frequently mounted/unmounted components
- ✅ Components with expensive calculations

**When React.memo is NOT effective:**
- ❌ Props change every render anyway
- ❌ Component has internal state/context that changes
- ❌ Very simple components (<10 lines JSX)
- ❌ Parent passes new object/array reference every render

</div>

</details>

</div>

<div class="concept-section tools" data-filter="react performance">

<details>
<summary>🧰 <strong>Kapcsolódó API-k / eszközök</strong></summary>

<div>

**React DevTools Profiler:**
```bash
# Flamegraph shows:
- Which components rendered
- How long each render took
- Why each component rendered

# Ranked chart shows:
- Most expensive components
- Total render time per component
```

**Why Did You Render:**
```bash
npm install --save-dev @welldone-software/why-did-you-render

# wdyr.js
import whyDidYouRender from '@welldone-software/why-did-you-render';
whyDidYouRender(React, {
  trackAllPureComponents: true,
});

// Mark component for tracking
MyComponent.whyDidYouRender = true;
```

**React.memo utilities:**
```typescript
// Check if component is memoized
import { memo } from 'react';

const isMemoized = Component.$$typeof === Symbol.for('react.memo');

// Force comparison function logging
const MemoWithLog = memo(Component, (prev, next) => {
    const isEqual = /* comparison logic */;
    console.log('Memo comparison:', { prev, next, isEqual });
    return isEqual;
});
```

**ESLint rules:**
```json
{
  "rules": {
    "react/display-name": "warn", // Memo components should have display names
    "react-hooks/exhaustive-deps": "warn" // useCallback deps check
  }
}
```

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="react performance">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

**1) Mi a különbség React.memo és useMemo között?**
<details>
<summary>Válasz</summary>

`React.memo` egy egész komponenst memoize-ol (HOC), `useMemo` egy értéket/számítást cache-el a komponensen belül. Különböző célokra valók.

</details>

**2) Miért nem működik a React.memo ha callback prop-ot adok át?**
<details>
<summary>Válasz</summary>

Mert a callback minden render-nél új referencia, a memo shallow comparison alapján újrarenderel. Megoldás: `useCallback` a callback körül.

</details>

**3) Mikor NE használjunk React.memo-t?**
<details>
<summary>Válasz</summary>

Ha a props úgyis minden render-nél változnak, vagy a komponens nagyon egyszerű (<0.1ms render), akkor a memo overhead felesleges.

</details>

**4) Mi történik ha React.memo komponensben van useState vagy useContext?**
<details>
<summary>Válasz</summary>

A state/context változás továbbra is újrarenderel, a memo csak a props változást ellenőrzi. A memo nem véd belső state változások ellen.

</details>

**5) Hogyan debugolom hogy a memo miért nem működik?**
<details>
<summary>Válasz</summary>

React DevTools Profiler → "Record why each component rendered" + custom comparison function logging. Általában új prop referencia a probléma.

</details>

</div>

</details>

</div>

---

### React Lifecycle (régi + modern hooks) {#react-lifecycle}

<div class="concept-section mental-model" data-filter="react medior">

📋 **Fogalom meghatározása**  
*A React lifecycle a komponens életciklusának fázisai: Mounting (komponens létrehozása és DOM-ba illesztése), Updating (props vagy state változás miatti újrarenderelés), Unmounting (komponens eltávolítása a DOM-ból). Modern hooks esetén a useEffect hook kezeli a lifecycle eseményeket: dependency array-vel megadható mikor fusson, cleanup függvénnyel az unmounting kezelhető.*

</div>

<div class="concept-section why-important" data-filter="react medior">

💡 **Miért számít?**
- **Resource management**: Memória és subscription-ök helyes kezelése
- **Performance optimization**: Mikor és mit renderelj újra
- **Side effects**: API calls, event listeners, timer-ek kezelése  
- **Modern development**: Class-ból functional component-re migráció

</div>

<div class="runnable-model" data-filter="react">

**Runnable mental model**
```tsx
// REACT LIFECYCLE EVOLUTION: CLASS VS HOOKS

// 1. CLASS COMPONENT LIFECYCLE (Legacy but important to understand)
interface ClassUserProfileState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

class ClassUserProfile extends React.Component<{ userId: string }, ClassUserProfileState> {
    private abortController?: AbortController;
    private intervalId?: number;

    constructor(props: { userId: string }) {
        super(props);
        
        // Initial state setup
        this.state = {
            user: null,
            loading: false,
            error: null
        };
        
        console.log('🏗️ Constructor: Component instance created');
    }

    // MOUNTING PHASE
    componentDidMount() {
        console.log('🚀 componentDidMount: Component mounted to DOM');
        
        // Perfect place for:
        // - API calls
        // - Event listeners
        // - Subscriptions
        // - Timers
        
        this.fetchUser();
        this.startPolling();
        
        // Add event listeners
        window.addEventListener('online', this.handleOnline);
        window.addEventListener('offline', this.handleOffline);
    }

    // UPDATING PHASE
    componentDidUpdate(prevProps: { userId: string }, prevState: ClassUserProfileState) {
        console.log('🔄 componentDidUpdate: Component updated');
        
        // Check if userId changed
        if (prevProps.userId !== this.props.userId) {
            console.log('👤 User ID changed, fetching new user');
            this.fetchUser();
        }
        
        // Check if user data changed
        if (prevState.user !== this.state.user) {
            console.log('📊 User data updated');
            this.logUserActivity();
        }
    }

    // UNMOUNTING PHASE
    componentWillUnmount() {
        console.log('🧹 componentWillUnmount: Component about to be removed');
        
        // Cleanup is CRITICAL to prevent memory leaks:
        // - Cancel API requests
        // - Remove event listeners
        // - Clear timers
        // - Unsubscribe from subscriptions
        
        this.abortController?.abort();
        
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        
        window.removeEventListener('online', this.handleOnline);
        window.removeEventListener('offline', this.handleOffline);
    }

    // ERROR HANDLING
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('💥 componentDidCatch: Error caught', error, errorInfo);
        this.setState({ 
            error: error.message,
            loading: false 
        });
    }

    // Helper methods
    fetchUser = async () => {
        this.abortController = new AbortController();
        
        try {
            this.setState({ loading: true, error: null });
            
            const response = await fetch(`/api/users/${this.props.userId}`, {
                signal: this.abortController.signal
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const user = await response.json();
            this.setState({ user, loading: false });
            
        } catch (error) {
            if (error.name !== 'AbortError') {
                this.setState({ 
                    error: error.message, 
                    loading: false 
                });
            }
        }
    };

    startPolling = () => {
        this.intervalId = window.setInterval(() => {
            console.log('🔄 Polling user data');
            this.fetchUser();
        }, 30000); // Poll every 30 seconds
    };

    handleOnline = () => {
        console.log('🌐 Back online, refreshing data');
        this.fetchUser();
    };

    handleOffline = () => {
        console.log('📴 Gone offline');
    };

    logUserActivity = () => {
        if (this.state.user) {
            console.log('📝 Logging user activity:', this.state.user.name);
        }
    };

    render() {
        console.log('🎨 Render: Component rendering');
        
        const { user, loading, error } = this.state;

        if (loading) {
            return <div className="loading">Loading user...</div>;
        }

        if (error) {
            return <div className="error">Error: {error}</div>;
        }

        if (!user) {
            return <div className="empty">No user found</div>;
        }

        return (
            <div className="user-profile">
                <h1>{user.name}</h1>
                <p>{user.email}</p>
            </div>
        );
    }
}

// 2. MODERN FUNCTIONAL COMPONENT WITH HOOKS (Recommended approach)
function FunctionalUserProfile({ userId }: { userId: string }) {
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    console.log('🎨 Functional Component: Rendering');

    // MOUNTING + UPDATING + CLEANUP with useEffect
    React.useEffect(() => {
        console.log('🚀 useEffect: Mount/Update effect for userId:', userId);
        
        let abortController = new AbortController();
        
        const fetchUser = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch(`/api/users/${userId}`, {
                    signal: abortController.signal
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                
                const userData = await response.json();
                setUser(userData);
                
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                if (!abortController.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchUser();

        // CLEANUP function (equivalent to componentWillUnmount)
        return () => {
            console.log('🧹 useEffect cleanup: Aborting fetch for userId:', userId);
            abortController.abort();
        };
    }, [userId]); // Dependency array - effect runs when userId changes

    // SEPARATE EFFECT for polling (different lifecycle)
    React.useEffect(() => {
        console.log('⏰ Setting up polling');
        
        const intervalId = setInterval(() => {
            console.log('🔄 Polling user data');
            // Re-fetch logic here
        }, 30000);

        return () => {
            console.log('🧹 Cleaning up polling');
            clearInterval(intervalId);
        };
    }, []); // Empty dependency - runs once on mount

    // SEPARATE EFFECT for event listeners
    React.useEffect(() => {
        console.log('🎧 Setting up event listeners');
        
        const handleOnline = () => {
            console.log('🌐 Back online');
            // Refresh data logic
        };

        const handleOffline = () => {
            console.log('📴 Gone offline');
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            console.log('🧹 Cleaning up event listeners');
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []); // Empty dependency - setup once

    // EFFECT with dependency on user data
    React.useEffect(() => {
        if (user) {
            console.log('📝 User data changed, logging activity:', user.name);
            // Analytics or logging logic
        }
    }, [user]); // Runs when user changes

    // Render logic (same as class component)
    if (loading) {
        return <div className="loading">Loading user...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (!user) {
        return <div className="empty">No user found</div>;
    }

    return (
        <div className="user-profile">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
        </div>
    );
}

// 3. ADVANCED HOOKS PATTERNS FOR LIFECYCLE MANAGEMENT

// Custom hook for component lifecycle events
function useLifecycle(componentName: string) {
    React.useEffect(() => {
        console.log(`🚀 ${componentName} mounted`);
        
        return () => {
            console.log(`🧹 ${componentName} unmounted`);
        };
    }, [componentName]);

    React.useEffect(() => {
        console.log(`🔄 ${componentName} updated`);
    });
}

// Custom hook for async data fetching with cleanup
function useAsyncData<T>(
    fetchFn: () => Promise<T>,
    dependencies: React.DependencyList
) {
    const [state, setState] = React.useState<{
        data: T | null;
        loading: boolean;
        error: string | null;
    }>({
        data: null,
        loading: true,
        error: null
    });

    React.useEffect(() => {
        let cancelled = false;
        
        const executeAsync = async () => {
            try {
                setState(prev => ({ ...prev, loading: true, error: null }));
                const data = await fetchFn();
                
                if (!cancelled) {
                    setState({ data, loading: false, error: null });
                }
            } catch (error) {
                if (!cancelled) {
                    setState({
                        data: null,
                        loading: false,
                        error: error instanceof Error ? error.message : 'Unknown error'
                    });
                }
            }
        };

        executeAsync();

        return () => {
            cancelled = true;
        };
    }, dependencies);

    return state;
}

// Custom hook for interval-based polling
function usePolling(callback: () => void, interval: number, enabled: boolean = true) {
    const savedCallback = React.useRef(callback);

    // Update callback ref when callback changes
    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    React.useEffect(() => {
        if (!enabled) return;

        const tick = () => {
            savedCallback.current();
        };

        const id = setInterval(tick, interval);
        return () => clearInterval(id);
    }, [interval, enabled]);
}

// Custom hook for window event listeners
function useWindowEvent<K extends keyof WindowEventMap>(
    event: K,
    handler: (event: WindowEventMap[K]) => void,
    options?: AddEventListenerOptions
) {
    React.useEffect(() => {
        window.addEventListener(event, handler, options);
        
        return () => {
            window.removeEventListener(event, handler, options);
        };
    }, [event, handler, options]);
}

// 4. PRACTICAL EXAMPLE USING MODERN HOOKS
function ModernUserDashboard({ userId }: { userId: string }) {
    // Lifecycle logging
    useLifecycle('UserDashboard');

    // Async data fetching
    const { data: user, loading, error } = useAsyncData(
        () => fetch(`/api/users/${userId}`).then(res => res.json()),
        [userId]
    );

    // Polling for real-time updates
    const [pollingEnabled, setPollingEnabled] = React.useState(true);
    
    usePolling(
        () => {
            console.log('🔄 Polling user data');
            // Refresh user data
        },
        30000, // 30 seconds
        pollingEnabled && !loading
    );

    // Window event handling
    useWindowEvent('online', () => {
        console.log('🌐 Back online, enabling polling');
        setPollingEnabled(true);
    });

    useWindowEvent('offline', () => {
        console.log('📴 Gone offline, disabling polling');
        setPollingEnabled(false);
    });

    // Page visibility handling
    useWindowEvent('visibilitychange', () => {
        if (document.hidden) {
            console.log('👁️ Page hidden, disabling polling');
            setPollingEnabled(false);
        } else {
            console.log('👁️ Page visible, enabling polling');
            setPollingEnabled(true);
        }
    });

    // Analytics on user change
    React.useEffect(() => {
        if (user) {
            console.log('📊 Analytics: User viewed', user.name);
            // Send analytics event
        }
    }, [user]);

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="spinner" />
                <p>Loading dashboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-error">
                <h3>Failed to load dashboard</h3>
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="user-dashboard">
            <header className="dashboard-header">
                <h1>Welcome, {user.name}!</h1>
                <div className="status-indicators">
                    <span className={`polling-status ${pollingEnabled ? 'active' : 'inactive'}`}>
                        {pollingEnabled ? '🔄 Live updates' : '⏸️ Updates paused'}
                    </span>
                </div>
            </header>
            
            <main className="dashboard-content">
                <div className="user-info">
                    <p>Email: {user.email}</p>
                    <p>Last active: {new Date(user.updatedAt).toLocaleString()}</p>
                </div>
            </main>
        </div>
    );
}

// 5. LIFECYCLE COMPARISON CHEAT SHEET
const LifecycleComparison = () => (
    <div className="lifecycle-comparison">
        <h3>Class vs Hooks Lifecycle Mapping</h3>
        <table>
            <thead>
                <tr>
                    <th>Class Component</th>
                    <th>Hooks Equivalent</th>
                    <th>Use Case</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>constructor()</td>
                    <td>useState initial value</td>
                    <td>Initial state setup</td>
                </tr>
                <tr>
                    <td>componentDidMount()</td>
                    <td>useEffect(() => {}, [])</td>
                    <td>API calls, subscriptions</td>
                </tr>
                <tr>
                    <td>componentDidUpdate()</td>
                    <td>useEffect(() => {}, [deps])</td>
                    <td>Respond to prop/state changes</td>
                </tr>
                <tr>
                    <td>componentWillUnmount()</td>
                    <td>useEffect cleanup function</td>
                    <td>Cleanup subscriptions, timers</td>
                </tr>
                <tr>
                    <td>componentDidCatch()</td>
                    <td>Error Boundary (class only)</td>
                    <td>Error handling</td>
                </tr>
            </tbody>
        </table>
    </div>
);

console.log('React Lifecycle examples loaded');
```

*Figyeld meg: Class lifecycle = rigid phases, Hooks = flexible effects. useEffect = componentDidMount + componentDidUpdate + componentWillUnmount combined.*

</div>

<div class="concept-section myths" data-filter="react">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „useEffect minden render-ben lefut." → Csak dependency változáskor vagy mount/unmount-kor
- „Class component-ek elavultak." → Még Error Boundary-hez szükségesek, de functional a preferred
- „useEffect cleanup csak unmount-kor fut." → Minden dependency változáskor is lefut

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="react">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**useEffect patterns:**
```tsx
// Mount only (componentDidMount)
useEffect(() => {
    // Setup code
    return () => {
        // Cleanup code
    };
}, []); // Empty dependency array

// Update on specific values
useEffect(() => {
    // Runs when userId changes
}, [userId]);

// Every render (rarely used)
useEffect(() => {
    // Runs after every render
}); // No dependency array
```

**Cleanup checklist:**
- ✅ Cancel API requests (AbortController)
- ✅ Clear timers (clearInterval, clearTimeout)
- ✅ Remove event listeners
- ✅ Unsubscribe from subscriptions

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="react medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mi a különbség componentDidMount és useEffect(() => {}, []) között?**
A: Funkcionálisan ugyanaz: egyszer futnak mount-kor. useEffect többet tud: cleanup function és conditional execution.

**Q: Mikor használnál még class component-et?**
A: Error Boundary-hez (componentDidCatch), legacy codebase-ben, vagy ha server-side rendering-gel problémák vannak.

**Q: Hogyan emulálnád componentDidUpdate-et hooks-szal?**
A: useEffect dependency array-jel: `useEffect(() => {}, [prop1, prop2])` - futtatja amikor prop1 vagy prop2 változik.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="react">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **useEffect** → Hooks lifecycle management
- **Cleanup functions** → Memory leak prevention
- **Dependency arrays** → Control when effects run
- **Error Boundaries** → Class component error handling
- **Custom Hooks** → Reusable lifecycle logic

</div>

</details>

</div>

### Context API {#react-context-api}

<div class="concept-section mental-model" data-filter="react medior">

📋 **Fogalom meghatározása**  
*A Context API egy React mechanizmus globális adatmegosztásra komponens hierarchián keresztül prop drilling nélkül. createContext() létrehoz egy context objektumot, a Provider komponens szolgáltatja az értéket, a useContext() hook vagy Consumer komponens olvassa az értéket. A context értéke változásakor minden fogyasztó komponens újrarenderelődik.*

</div>

<div class="concept-section why-important" data-filter="react medior">

💡 **Miért számít?**
- **Prop drilling elimination**: Adatok átadása mély component hierarchiában
- **Global state management**: User, theme, language settings kezelése
- **Component decoupling**: Komponensek nem függnek a szülő props-jaitól
- **Clean architecture**: Separation of concerns és dependency injection

</div>

<div class="runnable-model" data-filter="react">

**Runnable mental model**
```tsx
// CONTEXT API COMPREHENSIVE GUIDE

// 1. BASIC CONTEXT SETUP
interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'guest';
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
    error: string | null;
}

// Create Context with default value
const AuthContext = React.createContext<AuthContextType | null>(null);

// 2. CONTEXT PROVIDER IMPLEMENTATION
interface AuthProviderProps {
    children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    // Login function
    const login = async (email: string, password: string) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const userData = await response.json();
            setUser(userData.user);
            
            // Store token in localStorage
            localStorage.setItem('authToken', userData.token);
            
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem('authToken');
    };

    // Check for existing session on mount
    React.useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            // Validate token and get user data
            fetch('/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => res.json())
            .then(userData => setUser(userData))
            .catch(() => {
                // Token invalid, remove it
                localStorage.removeItem('authToken');
            });
        }
    }, []);

    const contextValue: AuthContextType = {
        user,
        login,
        logout,
        loading,
        error
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

// 3. CUSTOM HOOK FOR CONSUMING CONTEXT
function useAuth(): AuthContextType {
    const context = React.useContext(AuthContext);
    
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    
    return context;
}

// 4. THEME CONTEXT EXAMPLE
interface ThemeContextType {
    theme: 'light' | 'dark' | 'auto';
    setTheme: (theme: 'light' | 'dark' | 'auto') => void;
    colors: {
        primary: string;
        secondary: string;
        background: string;
        text: string;
    };
}

const ThemeContext = React.createContext<ThemeContextType | null>(null);

function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = React.useState<'light' | 'dark' | 'auto'>(() => {
        const saved = localStorage.getItem('theme');
        return (saved as any) || 'auto';
    });

    // Determine actual theme based on system preference
    const [systemTheme, setSystemTheme] = React.useState<'light' | 'dark'>('light');

    React.useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

        const handler = (e: MediaQueryListEvent) => {
            setSystemTheme(e.matches ? 'dark' : 'light');
        };

        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    const actualTheme = theme === 'auto' ? systemTheme : theme;

    const colors = React.useMemo(() => {
        if (actualTheme === 'dark') {
            return {
                primary: '#3b82f6',
                secondary: '#6366f1',
                background: '#1f2937',
                text: '#f9fafb'
            };
        } else {
            return {
                primary: '#2563eb',
                secondary: '#4f46e5',
                background: '#ffffff',
                text: '#111827'
            };
        }
    }, [actualTheme]);

    const handleSetTheme = (newTheme: 'light' | 'dark' | 'auto') => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const contextValue: ThemeContextType = {
        theme,
        setTheme: handleSetTheme,
        colors
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
}

function useTheme(): ThemeContextType {
    const context = React.useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

// 5. MULTIPLE CONTEXTS COMPOSITION
function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </AuthProvider>
    );
}

// 6. CONSUMING CONTEXTS IN COMPONENTS
function UserProfile() {
    const { user, logout } = useAuth();
    const { colors } = useTheme();

    if (!user) {
        return <LoginForm />;
    }

    return (
        <div style={{ backgroundColor: colors.background, color: colors.text }}>
            <div className="user-profile">
                <div className="user-info">
                    <img 
                        src={user.avatar || '/default-avatar.png'} 
                        alt={user.name}
                        className="user-avatar"
                    />
                    <div>
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                        <span className={`role-badge role-${user.role}`}>
                            {user.role}
                        </span>
                    </div>
                </div>
                <button onClick={logout} className="logout-btn">
                    Logout
                </button>
            </div>
        </div>
    );
}

function LoginForm() {
    const { login, loading, error } = useAuth();
    const { colors } = useTheme();
    
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div style={{ backgroundColor: colors.background, color: colors.text }}>
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
                
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                
                <button 
                    type="submit" 
                    disabled={loading}
                    style={{ backgroundColor: colors.primary }}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}

function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="theme-toggle">
            <label>Theme:</label>
            <select 
                value={theme} 
                onChange={(e) => setTheme(e.target.value as any)}
            >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
            </select>
        </div>
    );
}

// 7. ADVANCED PATTERNS: CONTEXT WITH REDUCER
interface TodoState {
    todos: TodoItem[];
    filter: 'all' | 'active' | 'completed';
    loading: boolean;
}

type TodoAction = 
    | { type: 'SET_TODOS'; payload: TodoItem[] }
    | { type: 'ADD_TODO'; payload: TodoItem }
    | { type: 'TOGGLE_TODO'; payload: string }
    | { type: 'DELETE_TODO'; payload: string }
    | { type: 'SET_FILTER'; payload: 'all' | 'active' | 'completed' }
    | { type: 'SET_LOADING'; payload: boolean };

function todoReducer(state: TodoState, action: TodoAction): TodoState {
    switch (action.type) {
        case 'SET_TODOS':
            return { ...state, todos: action.payload, loading: false };
        case 'ADD_TODO':
            return { ...state, todos: [...state.todos, action.payload] };
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload 
                        ? { ...todo, completed: !todo.completed }
                        : todo
                )
            };
        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            };
        case 'SET_FILTER':
            return { ...state, filter: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        default:
            return state;
    }
}

interface TodoContextType {
    state: TodoState;
    dispatch: React.Dispatch<TodoAction>;
    addTodo: (text: string) => void;
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
    setFilter: (filter: 'all' | 'active' | 'completed') => void;
}

const TodoContext = React.createContext<TodoContextType | null>(null);

function TodoProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = React.useReducer(todoReducer, {
        todos: [],
        filter: 'all',
        loading: false
    });

    const addTodo = (text: string) => {
        const newTodo: TodoItem = {
            id: Date.now().toString(),
            text,
            completed: false,
            priority: 'medium'
        };
        dispatch({ type: 'ADD_TODO', payload: newTodo });
    };

    const toggleTodo = (id: string) => {
        dispatch({ type: 'TOGGLE_TODO', payload: id });
    };

    const deleteTodo = (id: string) => {
        dispatch({ type: 'DELETE_TODO', payload: id });
    };

    const setFilter = (filter: 'all' | 'active' | 'completed') => {
        dispatch({ type: 'SET_FILTER', payload: filter });
    };

    const contextValue: TodoContextType = {
        state,
        dispatch,
        addTodo,
        toggleTodo,
        deleteTodo,
        setFilter
    };

    return (
        <TodoContext.Provider value={contextValue}>
            {children}
        </TodoContext.Provider>
    );
}

function useTodos(): TodoContextType {
    const context = React.useContext(TodoContext);
    if (!context) {
        throw new Error('useTodos must be used within a TodoProvider');
    }
    return context;
}

// 8. PERFORMANCE OPTIMIZATION WITH CONTEXT
// Split contexts to prevent unnecessary re-renders
const TodoStateContext = React.createContext<TodoState | null>(null);
const TodoActionsContext = React.createContext<Omit<TodoContextType, 'state'> | null>(null);

function OptimizedTodoProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = React.useReducer(todoReducer, {
        todos: [],
        filter: 'all',
        loading: false
    });

    // Memoize actions to prevent re-renders
    const actions = React.useMemo(() => ({
        dispatch,
        addTodo: (text: string) => {
            const newTodo: TodoItem = {
                id: Date.now().toString(),
                text,
                completed: false,
                priority: 'medium'
            };
            dispatch({ type: 'ADD_TODO', payload: newTodo });
        },
        toggleTodo: (id: string) => {
            dispatch({ type: 'TOGGLE_TODO', payload: id });
        },
        deleteTodo: (id: string) => {
            dispatch({ type: 'DELETE_TODO', payload: id });
        },
        setFilter: (filter: 'all' | 'active' | 'completed') => {
            dispatch({ type: 'SET_FILTER', payload: filter });
        }
    }), []);

    return (
        <TodoStateContext.Provider value={state}>
            <TodoActionsContext.Provider value={actions}>
                {children}
            </TodoActionsContext.Provider>
        </TodoStateContext.Provider>
    );
}

// Separate hooks for state and actions
function useTodoState() {
    const context = React.useContext(TodoStateContext);
    if (!context) {
        throw new Error('useTodoState must be used within a TodoProvider');
    }
    return context;
}

function useTodoActions() {
    const context = React.useContext(TodoActionsContext);
    if (!context) {
        throw new Error('useTodoActions must be used within a TodoProvider');
    }
    return context;
}

// 9. MAIN APP STRUCTURE
function App() {
    return (
        <AppProviders>
            <div className="app">
                <header className="app-header">
                    <h1>My App</h1>
                    <ThemeToggle />
                </header>
                
                <main className="app-main">
                    <UserProfile />
                    
                    <TodoProvider>
                        <TodoApp />
                    </TodoProvider>
                </main>
            </div>
        </AppProviders>
    );
}

function TodoApp() {
    const { state, addTodo } = useTodos();
    const [newTodoText, setNewTodoText] = React.useState('');

    const handleAddTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTodoText.trim()) {
            addTodo(newTodoText.trim());
            setNewTodoText('');
        }
    };

    const filteredTodos = state.todos.filter(todo => {
        switch (state.filter) {
            case 'active': return !todo.completed;
            case 'completed': return todo.completed;
            default: return true;
        }
    });

    return (
        <div className="todo-app">
            <form onSubmit={handleAddTodo}>
                <input
                    type="text"
                    value={newTodoText}
                    onChange={(e) => setNewTodoText(e.target.value)}
                    placeholder="Add a new todo..."
                />
                <button type="submit">Add</button>
            </form>

            <div className="todo-list">
                {filteredTodos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </div>
        </div>
    );
}

function TodoItem({ todo }: { todo: TodoItem }) {
    const { toggleTodo, deleteTodo } = useTodos();

    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
    );
}

console.log('Context API examples loaded');
```

*Figyeld meg: Context = global state provider, useContext = consumer hook, custom hooks = reusable context logic. Split contexts = performance optimization.*

</div>

<div class="concept-section myths" data-filter="react">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Context API helyettesíti a Redux-ot." → Kisebb alkalmazásokhoz jó, de nagy state-hez Redux/Zustand jobb
- „Context értékváltozás minden consumer-t re-render-el." → Igen, ezért split context pattern hasznos
- „useContext bárhol használható." → Csak Provider children-ben működik

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="react">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Context setup pattern:**
```tsx
// 1. Create context
const MyContext = createContext<MyType | null>(null);

// 2. Create provider
function MyProvider({ children }) {
    const [state, setState] = useState(initialValue);
    return (
        <MyContext.Provider value={{ state, setState }}>
            {children}
        </MyContext.Provider>
    );
}

// 3. Create custom hook
function useMyContext() {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error('useMyContext must be used within MyProvider');
    }
    return context;
}
```

**Performance tip:** Split state and actions to separate contexts to minimize re-renders.

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="react medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mikor használnál Context API-t és mikor Redux-ot?**
A: Context API theme/auth/language-hez, Redux complex business logic-hoz, time travel debugging-hoz, middleware-hez.

**Q: Hogyan optimalizálnád a Context re-rendering problémáját?**
A: Split contexts (state/actions külön), memoization, smaller context scope, vagy state management library.

**Q: Mi történik ha useContext-et Provider nélkül használod?**
A: Default value-t kapod (ha van), de gyakran null/undefined, ezért error checking kell custom hook-ban.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="react">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **useReducer** → Complex state logic context-ben
- **useMemo** → Context value optimization
- **Prop drilling** → Context API megoldja
- **Global state** → Redux, Zustand alternatívák
- **Performance** → Context splitting strategies

</div>

</details>

</div>

### Custom Hooks (useFetch, useDebounce) {#custom-hooks}

<div class="concept-section mental-model" data-filter="react medior">

📋 **Fogalom meghatározása**  
*Custom Hooks olyan újrafelhasználható függvények, amelyek React beépített hook-jait (useState, useEffect, useContext, stb.) kombinálják, hogy komplex stateful logikát egységbe zárjanak és több komponens között megoszthassanak. Konvenció szerint nevük "use" prefixszel kezdődik.*

</div>

<div class="concept-section why-important" data-filter="react medior">

💡 **Miért számít?**
- **Logic reusability**: Ugyanaz a stateful logic több komponensben
- **Separation of concerns**: UI logic elkülönítése business logic-tól
- **Testability**: Hook logic izoláltan tesztelhető
- **Code organization**: Clean, maintainable, readable code

</div>

<div class="runnable-model" data-filter="react">

**Runnable mental model**
```tsx
// CUSTOM HOOKS MASTERCLASS

// 1. BASIC CUSTOM HOOK: useFetch
interface UseFetchResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

function useFetch<T>(url: string): UseFetchResult<T> {
    const [data, setData] = React.useState<T | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const fetchData = React.useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, [url]);

    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}

// 2. ADVANCED useFetch WITH CACHING AND CANCELLATION
interface AdvancedUseFetchOptions {
    enabled?: boolean;
    cacheTime?: number;
    refetchInterval?: number;
    onSuccess?: (data: any) => void;
    onError?: (error: Error) => void;
}

function useAdvancedFetch<T>(
    url: string, 
    options: AdvancedUseFetchOptions = {}
): UseFetchResult<T> & { isStale: boolean } {
    const { 
        enabled = true, 
        cacheTime = 5 * 60 * 1000, // 5 minutes
        refetchInterval,
        onSuccess,
        onError
    } = options;

    const [data, setData] = React.useState<T | null>(null);
    const [loading, setLoading] = React.useState(enabled);
    const [error, setError] = React.useState<string | null>(null);
    const [lastFetched, setLastFetched] = React.useState<number>(0);
    
    const abortControllerRef = React.useRef<AbortController | null>(null);

    const isStale = Date.now() - lastFetched > cacheTime;

    const fetchData = React.useCallback(async (force = false) => {
        if (!enabled && !force) return;
        if (!force && !isStale && data) return; // Use cache

        // Cancel previous request
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();

        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch(url, {
                signal: abortControllerRef.current.signal
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const result = await response.json();
            setData(result);
            setLastFetched(Date.now());
            
            onSuccess?.(result);
        } catch (err) {
            if (err.name !== 'AbortError') {
                const error = err instanceof Error ? err : new Error('Unknown error');
                setError(error.message);
                onError?.(error);
            }
        } finally {
            setLoading(false);
        }
    }, [url, enabled, isStale, data, onSuccess, onError]);

    // Initial fetch
    React.useEffect(() => {
        if (enabled) {
            fetchData();
        }
    }, [fetchData, enabled]);

    // Polling
    React.useEffect(() => {
        if (!refetchInterval || !enabled) return;

        const interval = setInterval(() => {
            fetchData();
        }, refetchInterval);

        return () => clearInterval(interval);
    }, [fetchData, refetchInterval, enabled]);

    // Cleanup on unmount
    React.useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    return { 
        data, 
        loading, 
        error, 
        refetch: () => fetchData(true),
        isStale 
    };
}

// 3. useDebounce HOOK
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

// 4. ADVANCED useDebounce WITH CALLBACK
function useAdvancedDebounce<T>(
    value: T,
    delay: number,
    callback?: (value: T) => void
): [T, boolean] {
    const [debouncedValue, setDebouncedValue] = React.useState<T>(value);
    const [isPending, setIsPending] = React.useState(false);

    React.useEffect(() => {
        setIsPending(true);
        
        const handler = setTimeout(() => {
            setDebouncedValue(value);
            setIsPending(false);
            callback?.(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay, callback]);

    return [debouncedValue, isPending];
}

// 5. useLocalStorage HOOK
function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
    // Get from local storage then parse stored json or return initialValue
    const [storedValue, setStoredValue] = React.useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    // Return a wrapped version of useState's setter function that persists the new value to localStorage
    const setValue = (value: T | ((prev: T) => T)) => {
        try {
            // Allow value to be a function so we have the same API as useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    };

    const removeValue = () => {
        try {
            window.localStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (error) {
            console.error(`Error removing localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue, removeValue];
}

// 6. useForm HOOK
interface UseFormOptions<T> {
    initialValues: T;
    validationRules?: Partial<Record<keyof T, (value: any) => string | undefined>>;
    onSubmit?: (values: T) => void | Promise<void>;
}

function useForm<T extends Record<string, any>>({
    initialValues,
    validationRules = {},
    onSubmit
}: UseFormOptions<T>) {
    const [values, setValues] = React.useState<T>(initialValues);
    const [errors, setErrors] = React.useState<Partial<Record<keyof T, string>>>({});
    const [touched, setTouched] = React.useState<Partial<Record<keyof T, boolean>>>({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const setValue = (name: keyof T, value: any) => {
        setValues(prev => ({ ...prev, [name]: value }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const setFieldTouched = (name: keyof T, isTouched = true) => {
        setTouched(prev => ({ ...prev, [name]: isTouched }));
    };

    const validateField = (name: keyof T, value: any): string | undefined => {
        const validator = validationRules[name];
        return validator ? validator(value) : undefined;
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof T, string>> = {};
        let hasErrors = false;

        Object.keys(validationRules).forEach(key => {
            const fieldName = key as keyof T;
            const error = validateField(fieldName, values[fieldName]);
            if (error) {
                newErrors[fieldName] = error;
                hasErrors = true;
            }
        });

        setErrors(newErrors);
        return !hasErrors;
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        
        if (isSubmitting) return;
        
        setIsSubmitting(true);
        
        // Mark all fields as touched
        const allTouched = Object.keys(values).reduce((acc, key) => ({
            ...acc,
            [key]: true
        }), {});
        setTouched(allTouched);

        if (validateForm()) {
            try {
                await onSubmit?.(values);
            } catch (error) {
                console.error('Form submission error:', error);
            }
        }
        
        setIsSubmitting(false);
    };

    const reset = () => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
    };

    const isValid = Object.keys(errors).length === 0;
    const isDirty = JSON.stringify(values) !== JSON.stringify(initialValues);

    return {
        values,
        errors,
        touched,
        isSubmitting,
        isValid,
        isDirty,
        setValue,
        setFieldTouched,
        handleSubmit,
        reset,
        validateField
    };
}

// 7. useAsync HOOK
interface UseAsyncState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

function useAsync<T>(
    asyncFunction: () => Promise<T>,
    dependencies: React.DependencyList = []
) {
    const [state, setState] = React.useState<UseAsyncState<T>>({
        data: null,
        loading: true,
        error: null
    });

    React.useEffect(() => {
        let cancelled = false;

        const runAsync = async () => {
            try {
                setState({ data: null, loading: true, error: null });
                const data = await asyncFunction();
                
                if (!cancelled) {
                    setState({ data, loading: false, error: null });
                }
            } catch (error) {
                if (!cancelled) {
                    setState({ 
                        data: null, 
                        loading: false, 
                        error: error instanceof Error ? error : new Error('Unknown error') 
                    });
                }
            }
        };

        runAsync();

        return () => {
            cancelled = true;
        };
    }, dependencies);

    return state;
}

// 8. useInterval HOOK
function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = React.useRef<() => void>();

    // Remember the latest callback
    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval
    React.useEffect(() => {
        function tick() {
            savedCallback.current?.();
        }
        
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

// 9. useEventListener HOOK
function useEventListener<K extends keyof WindowEventMap>(
    eventName: K,
    handler: (event: WindowEventMap[K]) => void,
    element: Window | Document | HTMLElement = window
) {
    const savedHandler = React.useRef<(event: WindowEventMap[K]) => void>();

    React.useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    React.useEffect(() => {
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;

        const eventListener = (event: Event) => {
            savedHandler.current?.(event as WindowEventMap[K]);
        };

        element.addEventListener(eventName, eventListener);

        return () => {
            element.removeEventListener(eventName, eventListener);
        };
    }, [eventName, element]);
}

// 10. PRACTICAL EXAMPLES USING CUSTOM HOOKS

// Search component with debounce
function SearchUsers() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    
    const { data: users, loading, error } = useFetch<User[]>(
        debouncedSearchTerm 
            ? `/api/users/search?q=${encodeURIComponent(debouncedSearchTerm)}`
            : '/api/users'
    );

    return (
        <div className="search-users">
            <div className="search-input-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search users..."
                    className="search-input"
                />
                {loading && <div className="search-spinner">🔄</div>}
            </div>

            {error && (
                <div className="error-message">
                    Error: {error}
                </div>
            )}

            {users && (
                <div className="user-results">
                    {users.map(user => (
                        <div key={user.id} className="user-item">
                            <img src={user.avatar} alt={user.name} />
                            <div>
                                <h3>{user.name}</h3>
                                <p>{user.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// Settings form with localStorage persistence
function UserSettings() {
    const [settings, setSettings, removeSettings] = useLocalStorage('userSettings', {
        theme: 'light' as 'light' | 'dark',
        notifications: true,
        language: 'en'
    });

    const form = useForm({
        initialValues: settings,
        validationRules: {
            language: (value) => {
                const validLanguages = ['en', 'es', 'fr', 'de'];
                return validLanguages.includes(value) ? undefined : 'Invalid language';
            }
        },
        onSubmit: async (values) => {
            setSettings(values);
            console.log('Settings saved:', values);
            // Could also send to API
        }
    });

    return (
        <form onSubmit={form.handleSubmit} className="settings-form">
            <h2>User Settings</h2>

            <div className="form-group">
                <label>Theme:</label>
                <select
                    value={form.values.theme}
                    onChange={(e) => form.setValue('theme', e.target.value)}
                >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>

            <div className="form-group">
                <label>
                    <input
                        type="checkbox"
                        checked={form.values.notifications}
                        onChange={(e) => form.setValue('notifications', e.target.checked)}
                    />
                    Enable notifications
                </label>
            </div>

            <div className="form-group">
                <label>Language:</label>
                <select
                    value={form.values.language}
                    onChange={(e) => form.setValue('language', e.target.value)}
                    onBlur={() => form.setFieldTouched('language')}
                >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                </select>
                {form.errors.language && form.touched.language && (
                    <span className="error">{form.errors.language}</span>
                )}
            </div>

            <div className="form-actions">
                <button 
                    type="submit" 
                    disabled={form.isSubmitting || !form.isValid}
                >
                    {form.isSubmitting ? 'Saving...' : 'Save Settings'}
                </button>
                
                <button 
                    type="button" 
                    onClick={form.reset}
                    disabled={!form.isDirty}
                >
                    Reset
                </button>
                
                <button 
                    type="button" 
                    onClick={removeSettings}
                    className="danger"
                >
                    Clear All Settings
                </button>
            </div>
        </form>
    );
}

// Real-time dashboard with polling
function Dashboard() {
    const [refreshInterval, setRefreshInterval] = React.useState(5000);
    const [isPollingEnabled, setIsPollingEnabled] = React.useState(true);

    const { data: stats, loading, error, refetch } = useAdvancedFetch<DashboardStats>(
        '/api/dashboard/stats',
        {
            enabled: true,
            refetchInterval: isPollingEnabled ? refreshInterval : undefined,
            onSuccess: (data) => {
                console.log('Dashboard stats updated:', data);
            },
            onError: (error) => {
                console.error('Failed to fetch dashboard stats:', error);
            }
        }
    );

    // Listen for window focus to refresh data
    useEventListener('focus', () => {
        refetch();
    });

    // Pause polling when page is hidden
    useEventListener('visibilitychange', () => {
        setIsPollingEnabled(!document.hidden);
    });

    return (
        <div className="dashboard">
            <div className="dashboard-controls">
                <label>
                    <input
                        type="checkbox"
                        checked={isPollingEnabled}
                        onChange={(e) => setIsPollingEnabled(e.target.checked)}
                    />
                    Auto-refresh
                </label>
                
                <select
                    value={refreshInterval}
                    onChange={(e) => setRefreshInterval(Number(e.target.value))}
                    disabled={!isPollingEnabled}
                >
                    <option value={1000}>1 second</option>
                    <option value={5000}>5 seconds</option>
                    <option value={10000}>10 seconds</option>
                    <option value={30000}>30 seconds</option>
                </select>
                
                <button onClick={refetch} disabled={loading}>
                    {loading ? 'Refreshing...' : 'Refresh Now'}
                </button>
            </div>

            {error && (
                <div className="error-banner">
                    Error loading dashboard: {error}
                </div>
            )}

            {stats && (
                <div className="dashboard-stats">
                    <div className="stat-card">
                        <h3>Active Users</h3>
                        <div className="stat-value">{stats.activeUsers}</div>
                    </div>
                    <div className="stat-card">
                        <h3>Total Revenue</h3>
                        <div className="stat-value">${stats.totalRevenue}</div>
                    </div>
                    <div className="stat-card">
                        <h3>Orders Today</h3>
                        <div className="stat-value">{stats.ordersToday}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

interface DashboardStats {
    activeUsers: number;
    totalRevenue: number;
    ordersToday: number;
}

console.log('Custom Hooks examples loaded');
```

*Figyeld meg: Custom hooks = reusable stateful logic, naming convention = "use" prefix, composability = combine multiple hooks.*

</div>

<div class="concept-section myths" data-filter="react">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Custom hooks magic-kel működnek." → Ugyanazok a hook rules vonatkoznak rájuk, csak logic kiszervezés
- „Custom hooks state-et osztanak meg komponensek között." → Minden hook call independent instance
- „Custom hooks csak useState-tel és useEffect-tel írhatóak." → Bármilyen built-in vagy custom hook kombinálható

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="react">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Custom hook patterns:**
```tsx
// Basic pattern
function useCounter(initialValue = 0) {
    const [count, setCount] = useState(initialValue);
    const increment = () => setCount(c => c + 1);
    const decrement = () => setCount(c => c - 1);
    return { count, increment, decrement };
}

// Async pattern
function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch(url).then(res => res.json()).then(setData)
          .finally(() => setLoading(false));
    }, [url]);
    
    return { data, loading };
}
```

**Naming:** Mindig "use" prefix, descriptive name (useFetch, useLocalStorage, useDebounce)

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="react medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mikor írnál custom hook-ot?**
A: Ha ugyanaz a stateful logic ismétlődik több komponensben, vagy complex logic-ot akarok elkülöníteni.

**Q: Custom hook-ok hogyan viszonyulnak a hook rules-hoz?**
A: Ugyanazok a szabályok: top level only, nem conditional-ban, consistent order minden render-ben.

**Q: Hogyan tesztelnél egy custom hook-ot?**
A: React Testing Library renderHook utility-vel, mock-olt dependencies-szel, act() wrapper-rel async operations-höz.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="react">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Built-in Hooks** → useState, useEffect, useCallback alapok
- **Logic Reusability** → DRY principle alkalmazása
- **Separation of Concerns** → UI vs business logic elkülönítése
- **Testing** → Isolated hook testing strategies
- **Performance** → Memoization in custom hooks

</div>

</details>

</div>

### React Router alapok (Route, Link, Outlet) {#react-router}

<div class="concept-section mental-model" data-filter="react medior">

📋 **Fogalom meghatározása**  
*React Router egy deklaratív routing library Single Page Application-ökhöz. Fő komponensei: Route (URL pattern és renderelendő komponens összekapcsolása), Link/NavLink (deklaratív navigáció), Outlet (nested route-ok renderelési helye), useNavigate/useParams hook-ok (programmatic navigation és route paraméterek elérése).*

</div>

<div class="concept-section why-important" data-filter="react medior">

💡 **Miért számít?**
- **Single Page Applications**: Természetes navigáció page refresh nélkül
- **Deep linking**: URL-ekkel megosztható alkalmazás állapotok
- **User experience**: Browser back/forward button működik
- **SEO optimization**: Search engine friendly URL structure

</div>

<div class="runnable-model" data-filter="react">

**Runnable mental model**
```tsx
// REACT ROUTER v6 COMPREHENSIVE GUIDE
import { 
    BrowserRouter, 
    Routes, 
    Route, 
    Link, 
    NavLink, 
    Outlet, 
    useNavigate, 
    useParams, 
    useLocation, 
    useSearchParams,
    Navigate 
} from 'react-router-dom';

// 1. BASIC ROUTER SETUP
function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Navigation />
                <main className="app-content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/users" element={<UsersLayout />}>
                            <Route index element={<UsersList />} />
                            <Route path=":userId" element={<UserDetail />} />
                            <Route path="new" element={<CreateUser />} />
                            <Route path=":userId/edit" element={<EditUser />} />
                        </Route>
                        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

// 2. NAVIGATION COMPONENT WITH LINKS
function Navigation() {
    const location = useLocation();
    
    return (
        <nav className="navigation">
            <div className="nav-brand">
                <Link to="/" className="brand-link">
                    MyApp
                </Link>
            </div>
            
            <ul className="nav-links">
                <li>
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => 
                            isActive ? 'nav-link active' : 'nav-link'
                        }
                        end // Only active for exact match
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/about" 
                        className="nav-link"
                    >
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/users" 
                        className="nav-link"
                    >
                        Users
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/dashboard" 
                        className="nav-link"
                    >
                        Dashboard
                    </NavLink>
                </li>
            </ul>
            
            <div className="nav-actions">
                <Link to="/login" className="btn btn-primary">
                    Login
                </Link>
            </div>
            
            {/* Breadcrumb navigation */}
            <Breadcrumb />
        </nav>
    );
}

// 3. NESTED ROUTES WITH OUTLET
function UsersLayout() {
    return (
        <div className="users-layout">
            <div className="users-header">
                <h1>Users Management</h1>
                <div className="users-actions">
                    <Link to="/users/new" className="btn btn-primary">
                        Add New User
                    </Link>
                </div>
            </div>
            
            <div className="users-nav">
                <NavLink to="/users" end className="users-tab">
                    All Users
                </NavLink>
                <NavLink to="/users?filter=active" className="users-tab">
                    Active Users
                </NavLink>
                <NavLink to="/users?filter=inactive" className="users-tab">
                    Inactive Users
                </NavLink>
            </div>
            
            {/* This is where child routes will render */}
            <div className="users-content">
                <Outlet />
            </div>
        </div>
    );
}

// 4. ROUTE PARAMETERS
function UserDetail() {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/users/${userId}`);
                
                if (!response.ok) {
                    throw new Error('User not found');
                }
                
                const userData = await response.json();
                setUser(userData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load user');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    const handleEdit = () => {
        navigate(`/users/${userId}/edit`);
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return;
        }

        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                navigate('/users', { replace: true });
            }
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    if (loading) {
        return (
            <div className="user-detail-loading">
                <div className="spinner" />
                <p>Loading user details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="user-detail-error">
                <h3>Error</h3>
                <p>{error}</p>
                <button onClick={() => navigate('/users')}>
                    Back to Users
                </button>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/users" replace />;
    }

    return (
        <div className="user-detail">
            <div className="user-detail-header">
                <button 
                    onClick={() => navigate(-1)} 
                    className="btn btn-secondary"
                >
                    ← Back
                </button>
                <h2>{user.name}</h2>
                <div className="user-actions">
                    <button 
                        onClick={handleEdit}
                        className="btn btn-primary"
                    >
                        Edit
                    </button>
                    <button 
                        onClick={handleDelete}
                        className="btn btn-danger"
                    >
                        Delete
                    </button>
                </div>
            </div>

            <div className="user-detail-content">
                <div className="user-info">
                    <img 
                        src={user.avatar || '/default-avatar.png'} 
                        alt={user.name}
                        className="user-avatar-large"
                    />
                    <div className="user-data">
                        <div className="data-row">
                            <label>Name:</label>
                            <span>{user.name}</span>
                        </div>
                        <div className="data-row">
                            <label>Email:</label>
                            <span>{user.email}</span>
                        </div>
                        <div className="data-row">
                            <label>Role:</label>
                            <span className={`role-badge role-${user.role}`}>
                                {user.role}
                            </span>
                        </div>
                        <div className="data-row">
                            <label>Status:</label>
                            <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                                {user.isActive ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                        <div className="data-row">
                            <label>Created:</label>
                            <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// 5. SEARCH PARAMS AND FILTERING
function UsersList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [users, setUsers] = React.useState<User[]>([]);
    const [loading, setLoading] = React.useState(true);

    const filter = searchParams.get('filter') || 'all';
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    React.useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                
                const params = new URLSearchParams({
                    filter,
                    search,
                    page: page.toString(),
                    limit: limit.toString()
                });

                const response = await fetch(`/api/users?${params}`);
                const data = await response.json();
                setUsers(data.users);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [filter, search, page, limit]);

    const handleFilterChange = (newFilter: string) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('filter', newFilter);
            newParams.set('page', '1'); // Reset to first page
            return newParams;
        });
    };

    const handleSearchChange = (newSearch: string) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            if (newSearch) {
                newParams.set('search', newSearch);
            } else {
                newParams.delete('search');
            }
            newParams.set('page', '1'); // Reset to first page
            return newParams;
        });
    };

    const handlePageChange = (newPage: number) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('page', newPage.toString());
            return newParams;
        });
    };

    return (
        <div className="users-list">
            <div className="users-filters">
                <div className="search-box">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        placeholder="Search users..."
                        className="search-input"
                    />
                </div>
                
                <div className="filter-buttons">
                    <button
                        onClick={() => handleFilterChange('all')}
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    >
                        All Users
                    </button>
                    <button
                        onClick={() => handleFilterChange('active')}
                        className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                    >
                        Active
                    </button>
                    <button
                        onClick={() => handleFilterChange('inactive')}
                        className={`filter-btn ${filter === 'inactive' ? 'active' : ''}`}
                    >
                        Inactive
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="users-loading">Loading users...</div>
            ) : (
                <>
                    <div className="users-grid">
                        {users.map(user => (
                            <div key={user.id} className="user-card">
                                <Link to={`/users/${user.id}`} className="user-card-link">
                                    <img 
                                        src={user.avatar || '/default-avatar.png'} 
                                        alt={user.name}
                                        className="user-card-avatar"
                                    />
                                    <div className="user-card-info">
                                        <h3>{user.name}</h3>
                                        <p>{user.email}</p>
                                        <span className={`status ${user.isActive ? 'active' : 'inactive'}`}>
                                            {user.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <Pagination 
                        currentPage={page}
                        onPageChange={handlePageChange}
                        totalPages={10} // This would come from API
                    />
                </>
            )}
        </div>
    );
}

// 6. PROGRAMMATIC NAVIGATION
function CreateUser() {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const userData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            role: formData.get('role') as string
        };

        try {
            setSubmitting(true);
            
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const newUser = await response.json();
                
                // Navigate to the new user's detail page
                navigate(`/users/${newUser.id}`, { 
                    replace: true,
                    state: { message: 'User created successfully!' }
                });
            } else {
                throw new Error('Failed to create user');
            }
        } catch (error) {
            console.error('Error creating user:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="create-user">
            <div className="create-user-header">
                <button 
                    onClick={() => navigate('/users')}
                    className="btn btn-secondary"
                >
                    ← Back to Users
                </button>
                <h2>Create New User</h2>
            </div>

            <form onSubmit={handleSubmit} className="user-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="role">Role:</label>
                    <select id="role" name="role" className="form-select">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                    </select>
                </div>

                <div className="form-actions">
                    <button 
                        type="submit" 
                        disabled={submitting}
                        className="btn btn-primary"
                    >
                        {submitting ? 'Creating...' : 'Create User'}
                    </button>
                    <button 
                        type="button"
                        onClick={() => navigate('/users')}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

// 7. PROTECTED ROUTES
function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth(); // Custom hook from Context API
    const location = useLocation();

    if (loading) {
        return <div className="loading">Checking authentication...</div>;
    }

    if (!user) {
        // Redirect to login page with return url
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}

function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const from = location.state?.from?.pathname || "/dashboard";

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="login-page">
            <div className="login-form-container">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

// 8. BREADCRUMB NAVIGATION
function Breadcrumb() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    return (
        <nav className="breadcrumb">
            <Link to="/">Home</Link>
            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;
                
                return (
                    <span key={name} className="breadcrumb-item">
                        <span className="breadcrumb-separator">/</span>
                        {isLast ? (
                            <span className="breadcrumb-current">
                                {formatBreadcrumbName(name)}
                            </span>
                        ) : (
                            <Link to={routeTo}>
                                {formatBreadcrumbName(name)}
                            </Link>
                        )}
                    </span>
                );
            })}
        </nav>
    );
}

function formatBreadcrumbName(name: string): string {
    // Convert URL segment to readable name
    return name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// 9. PAGINATION COMPONENT
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    
    return (
        <div className="pagination">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
            >
                Previous
            </button>
            
            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
                >
                    {page}
                </button>
            ))}
            
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
            >
                Next
            </button>
        </div>
    );
}

// 10. ERROR AND 404 PAGES
function NotFoundPage() {
    const navigate = useNavigate();
    
    return (
        <div className="not-found-page">
            <div className="not-found-content">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>The page you're looking for doesn't exist.</p>
                <div className="not-found-actions">
                    <button 
                        onClick={() => navigate(-1)}
                        className="btn btn-secondary"
                    >
                        Go Back
                    </button>
                    <Link to="/" className="btn btn-primary">
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Basic pages
function HomePage() {
    return (
        <div className="home-page">
            <h1>Welcome to MyApp</h1>
            <p>This is the home page.</p>
            <div className="home-actions">
                <Link to="/users" className="btn btn-primary">
                    View Users
                </Link>
                <Link to="/dashboard" className="btn btn-secondary">
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
}

function AboutPage() {
    return (
        <div className="about-page">
            <h1>About Us</h1>
            <p>This is the about page.</p>
        </div>
    );
}

function ContactPage() {
    return (
        <div className="contact-page">
            <h1>Contact Us</h1>
            <p>Get in touch with us.</p>
        </div>
    );
}

function Dashboard() {
    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard!</p>
        </div>
    );
}

function EditUser() {
    const { userId } = useParams();
    return (
        <div className="edit-user">
            <h2>Edit User {userId}</h2>
            <p>Edit user form would go here.</p>
        </div>
    );
}

console.log('React Router examples loaded');
```

*Figyeld meg: Routes = URL-to-component mapping, Outlet = nested routes placeholder, useNavigate = programmatic navigation, URL state = searchParams.*

</div>

<div class="concept-section myths" data-filter="react">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „React Router automatikusan kezeli az authentication-t." → Kézzel kell implementálni Protected Route pattern-nel
- „Link és NavLink ugyanaz." → NavLink active state-t is kezeli, styling-hoz jobb
- „Route path-ek mindig exact match-ek." → v6-ban default exact, nested routes-hoz Outlet kell

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="react">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Router alapszerkezet:**
```tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/users" element={<UsersLayout />}>
      <Route index element={<UsersList />} />
      <Route path=":id" element={<UserDetail />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

**Hooks:**
- `useNavigate()` → programmatic navigation
- `useParams()` → URL parameters
- `useSearchParams()` → query parameters
- `useLocation()` → current location object

**Navigation:**
- `<Link to="/path">` → basic navigation
- `<NavLink>` → with active state styling

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="react medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mi a különbség BrowserRouter és HashRouter között?**
A: BrowserRouter clean URL-eket használ, server config kell. HashRouter # hash-t használ, működik static hosting-on.

**Q: Hogyan implementálnál route-based code splitting-et?**
A: React.lazy()-vel és Suspense-szal: `const LazyComponent = lazy(() => import('./Component'))`

**Q: Mikor használnál navigate vs Link komponenst?**
A: Link declarative navigation-höz, navigate programmatic navigation-höz (form submit után, condition alapján).

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="react">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **SPA Architecture** → Single Page Application routing
- **URL State Management** → Search params, path params
- **Code Splitting** → Route-based lazy loading
- **Authentication** → Protected routes pattern
- **SEO** → Server-side rendering considerations

</div>

</details>

</div>

### Error Boundaries {#error-boundaries}

<div class="concept-section mental-model" data-filter="react medior">

📋 **Fogalom meghatározása**  
*Error Boundary egy React komponens (class component), amely a componentDidCatch() és static getDerivedStateFromError() lifecycle metódusokat implementálja. Elfogja a gyermek komponens fában fellépő JavaScript hibákat render során, logolja azokat és fallback UI-t jelenít meg a hibás komponens fa helyett, megakadályozva az egész alkalmazás összeomlását.*

</div>

<div class="concept-section why-important" data-filter="react medior">

💡 **Miért számít?**
- **Application stability**: Egy komponens hibája nem borítja le az egész app-ot
- **Better user experience**: Graceful error handling user-friendly üzenetekkel
- **Error logging**: Centralizált error tracking és reporting
- **Production resilience**: Robusztus alkalmazások production környezetben

</div>

<div class="runnable-model" data-filter="react">

**Runnable mental model**
```tsx
// ERROR BOUNDARIES COMPREHENSIVE GUIDE

// 1. BASIC ERROR BOUNDARY CLASS COMPONENT
interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
}

class BasicErrorBoundary extends React.Component<
    React.PropsWithChildren<{}>, 
    ErrorBoundaryState
> {
    constructor(props: React.PropsWithChildren<{}>) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    // Catch errors during rendering
    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
        console.log('getDerivedStateFromError:', error);
        
        // Update state to trigger error UI
        return {
            hasError: true,
            error
        };
    }

    // Log errors and send to error reporting service
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error Boundary caught an error:', error, errorInfo);
        
        this.setState({
            error,
            errorInfo
        });

        // Log to error reporting service
        this.logErrorToService(error, errorInfo);
    }

    logErrorToService(error: Error, errorInfo: React.ErrorInfo) {
        // In production, send to error tracking service like Sentry
        console.log('Logging to error service:', {
            message: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        });
    }

    handleRetry = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <div className="error-content">
                        <h2>Something went wrong</h2>
                        <p>We're sorry, but something unexpected happened.</p>
                        
                        <details className="error-details">
                            <summary>Error Details (for developers)</summary>
                            <div className="error-stack">
                                <h4>Error:</h4>
                                <pre>{this.state.error?.message}</pre>
                                
                                <h4>Stack Trace:</h4>
                                <pre>{this.state.error?.stack}</pre>
                                
                                {this.state.errorInfo && (
                                    <>
                                        <h4>Component Stack:</h4>
                                        <pre>{this.state.errorInfo.componentStack}</pre>
                                    </>
                                )}
                            </div>
                        </details>
                        
                        <div className="error-actions">
                            <button 
                                onClick={this.handleRetry}
                                className="btn btn-primary"
                            >
                                Try Again
                            </button>
                            <button 
                                onClick={() => window.location.reload()}
                                className="btn btn-secondary"
                            >
                                Reload Page
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

// 2. ADVANCED ERROR BOUNDARY WITH CUSTOM PROPS
interface AdvancedErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ComponentType<ErrorFallbackProps>;
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
    resetOnPropsChange?: boolean;
    resetKeys?: Array<string | number>;
}

interface ErrorFallbackProps {
    error: Error;
    errorInfo: React.ErrorInfo | null;
    resetError: () => void;
}

class AdvancedErrorBoundary extends React.Component<
    AdvancedErrorBoundaryProps, 
    ErrorBoundaryState
> {
    private resetTimeoutId: number | null = null;

    constructor(props: AdvancedErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
        return {
            hasError: true,
            error
        };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Advanced Error Boundary:', error, errorInfo);
        
        this.setState({
            error,
            errorInfo
        });

        // Call custom error handler
        this.props.onError?.(error, errorInfo);
    }

    componentDidUpdate(prevProps: AdvancedErrorBoundaryProps) {
        const { resetOnPropsChange, resetKeys } = this.props;
        const { hasError } = this.state;

        // Reset error state when specified props change
        if (hasError && resetOnPropsChange) {
            if (resetKeys) {
                const hasResetKeyChanged = resetKeys.some(
                    (key, index) => key !== (prevProps.resetKeys?.[index])
                );
                
                if (hasResetKeyChanged) {
                    this.resetErrorBoundary();
                }
            }
        }
    }

    resetErrorBoundary = () => {
        // Clear any pending reset timeouts
        if (this.resetTimeoutId) {
            clearTimeout(this.resetTimeoutId);
        }

        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });
    };

    render() {
        const { hasError, error, errorInfo } = this.state;
        const { children, fallback: Fallback } = this.props;

        if (hasError && error) {
            if (Fallback) {
                return (
                    <Fallback 
                        error={error}
                        errorInfo={errorInfo}
                        resetError={this.resetErrorBoundary}
                    />
                );
            }

            // Default fallback UI
            return (
                <DefaultErrorFallback 
                    error={error}
                    errorInfo={errorInfo}
                    resetError={this.resetErrorBoundary}
                />
            );
        }

        return children;
    }
}

// 3. CUSTOM ERROR FALLBACK COMPONENTS
function DefaultErrorFallback({ error, errorInfo, resetError }: ErrorFallbackProps) {
    return (
        <div className="error-fallback">
            <div className="error-icon">⚠️</div>
            <h2>Oops! Something went wrong</h2>
            <p>Don't worry, it's not your fault. We've been notified about this issue.</p>
            
            <div className="error-actions">
                <button onClick={resetError} className="btn btn-primary">
                    Try again
                </button>
                <button 
                    onClick={() => window.location.href = '/'}
                    className="btn btn-secondary"
                >
                    Go to homepage
                </button>
            </div>

            {process.env.NODE_ENV === 'development' && (
                <details className="error-dev-info">
                    <summary>Developer Information</summary>
                    <div className="error-details">
                        <h4>Error Message:</h4>
                        <pre>{error.message}</pre>
                        
                        <h4>Stack Trace:</h4>
                        <pre>{error.stack}</pre>
                        
                        {errorInfo && (
                            <>
                                <h4>Component Stack:</h4>
                                <pre>{errorInfo.componentStack}</pre>
                            </>
                        )}
                    </div>
                </details>
            )}
        </div>
    );
}

function MinimalErrorFallback({ resetError }: ErrorFallbackProps) {
    return (
        <div className="minimal-error">
            <p>Something went wrong.</p>
            <button onClick={resetError}>Try again</button>
        </div>
    );
}

function FancyErrorFallback({ error, resetError }: ErrorFallbackProps) {
    const [reportSent, setReportSent] = React.useState(false);

    const sendErrorReport = async () => {
        try {
            await fetch('/api/error-reports', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: error.message,
                    stack: error.stack,
                    timestamp: new Date().toISOString(),
                    userAgent: navigator.userAgent,
                    url: window.location.href
                })
            });
            setReportSent(true);
        } catch (err) {
            console.error('Failed to send error report:', err);
        }
    };

    return (
        <div className="fancy-error-fallback">
            <div className="error-animation">
                <div className="broken-robot">🤖💥</div>
            </div>
            
            <h2>Houston, we have a problem!</h2>
            <p>Our digital hamsters hit a snag. Don't worry, we're on it!</p>
            
            <div className="error-help">
                <h3>What can you do?</h3>
                <ul>
                    <li>Try refreshing the page</li>
                    <li>Check your internet connection</li>
                    <li>Come back in a few minutes</li>
                </ul>
            </div>

            <div className="error-actions">
                <button onClick={resetError} className="btn btn-primary">
                    🔄 Try Again
                </button>
                
                {!reportSent ? (
                    <button onClick={sendErrorReport} className="btn btn-secondary">
                        📤 Send Error Report
                    </button>
                ) : (
                    <span className="report-sent">✅ Report sent. Thank you!</span>
                )}
            </div>
        </div>
    );
}

// 4. HOC (Higher-Order Component) FOR ERROR BOUNDARIES
function withErrorBoundary<P extends object>(
    Component: React.ComponentType<P>,
    errorBoundaryProps?: Partial<AdvancedErrorBoundaryProps>
) {
    const WrappedComponent = (props: P) => (
        <AdvancedErrorBoundary {...errorBoundaryProps}>
            <Component {...props} />
        </AdvancedErrorBoundary>
    );

    WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
    
    return WrappedComponent;
}

// 5. HOOK FOR ERROR BOUNDARIES (Custom implementation)
function useErrorHandler() {
    const [error, setError] = React.useState<Error | null>(null);

    const resetError = React.useCallback(() => {
        setError(null);
    }, []);

    const captureError = React.useCallback((error: Error) => {
        setError(error);
    }, []);

    // If there's an error, throw it to be caught by Error Boundary
    React.useEffect(() => {
        if (error) {
            throw error;
        }
    }, [error]);

    return { captureError, resetError };
}

// 6. ASYNC ERROR HANDLING
function AsyncErrorBoundary({ children }: { children: React.ReactNode }) {
    return (
        <AdvancedErrorBoundary
            onError={(error, errorInfo) => {
                // Log async errors to monitoring service
                console.error('Async Error caught:', error, errorInfo);
                
                // Send to error tracking
                if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'exception', {
                        description: error.message,
                        fatal: false
                    });
                }
            }}
            fallback={FancyErrorFallback}
        >
            {children}
        </AdvancedErrorBoundary>
    );
}

// 7. PRACTICAL USAGE EXAMPLES

// Problematic component that might throw errors
function BuggyComponent({ shouldCrash }: { shouldCrash: boolean }) {
    const { captureError } = useErrorHandler();

    React.useEffect(() => {
        if (shouldCrash) {
            // Simulate async error
            setTimeout(() => {
                try {
                    throw new Error('Simulated async error!');
                } catch (error) {
                    captureError(error as Error);
                }
            }, 1000);
        }
    }, [shouldCrash, captureError]);

    const handleClick = () => {
        // Simulate synchronous error
        throw new Error('Button click error!');
    };

    return (
        <div className="buggy-component">
            <h3>Buggy Component</h3>
            <button onClick={handleClick} className="btn btn-danger">
                Click to crash (sync)
            </button>
            {shouldCrash && <p>Async error will occur in 1 second...</p>}
        </div>
    );
}

// Component using HOC
const SafeBuggyComponent = withErrorBoundary(BuggyComponent, {
    fallback: MinimalErrorFallback,
    onError: (error) => {
        console.log('Error logged by HOC:', error.message);
    }
});

// Main demo application
function ErrorBoundaryDemo() {
    const [showBuggyComponent, setShowBuggyComponent] = React.useState(false);
    const [shouldCrash, setShouldCrash] = React.useState(false);

    return (
        <div className="error-boundary-demo">
            <h1>Error Boundary Demo</h1>
            
            <div className="demo-controls">
                <label>
                    <input
                        type="checkbox"
                        checked={showBuggyComponent}
                        onChange={(e) => setShowBuggyComponent(e.target.checked)}
                    />
                    Show Buggy Component
                </label>
                
                <label>
                    <input
                        type="checkbox"
                        checked={shouldCrash}
                        onChange={(e) => setShouldCrash(e.target.checked)}
                    />
                    Enable Async Crash
                </label>
            </div>

            <div className="demo-sections">
                <section>
                    <h2>Basic Error Boundary</h2>
                    <BasicErrorBoundary>
                        {showBuggyComponent && (
                            <BuggyComponent shouldCrash={shouldCrash} />
                        )}
                        <p>This content is protected by a basic error boundary.</p>
                    </BasicErrorBoundary>
                </section>

                <section>
                    <h2>Advanced Error Boundary</h2>
                    <AdvancedErrorBoundary
                        fallback={FancyErrorFallback}
                        onError={(error) => {
                            console.log('Custom error handler:', error.message);
                        }}
                        resetKeys={[showBuggyComponent]}
                        resetOnPropsChange
                    >
                        {showBuggyComponent && (
                            <BuggyComponent shouldCrash={shouldCrash} />
                        )}
                        <p>This content uses an advanced error boundary with custom fallback.</p>
                    </AdvancedErrorBoundary>
                </section>

                <section>
                    <h2>HOC Error Boundary</h2>
                    {showBuggyComponent && (
                        <SafeBuggyComponent shouldCrash={shouldCrash} />
                    )}
                    <p>This component is wrapped with HOC error boundary.</p>
                </section>

                <section>
                    <h2>Async Error Boundary</h2>
                    <AsyncErrorBoundary>
                        {showBuggyComponent && (
                            <BuggyComponent shouldCrash={shouldCrash} />
                        )}
                        <p>This section handles async errors as well.</p>
                    </AsyncErrorBoundary>
                </section>
            </div>
        </div>
    );
}

// 8. ERROR BOUNDARY BEST PRACTICES

/*
ERROR BOUNDARY PLACEMENT STRATEGY:

1. Top-level App Error Boundary:
   - Catches unexpected errors
   - Provides generic fallback UI
   - Logs errors for monitoring

2. Feature-level Error Boundaries:
   - Around major features/routes
   - Feature-specific error messages
   - Isolated error recovery

3. Component-level Error Boundaries:
   - Around risky components (3rd party libs)
   - Specific error handling logic
   - Fine-grained error recovery

WHAT ERROR BOUNDARIES DON'T CATCH:
- Event handlers (use try/catch)
- Async code (use .catch() or try/catch in async/await)
- Server-side rendering errors
- Errors in the error boundary itself
*/

// Production-ready App structure with Error Boundaries
function ProductionApp() {
    return (
        <AdvancedErrorBoundary
            fallback={DefaultErrorFallback}
            onError={(error, errorInfo) => {
                // Send to error monitoring service (Sentry, LogRocket, etc.)
                console.error('Top-level error:', error, errorInfo);
            }}
        >
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/users/*" element={
                        <AdvancedErrorBoundary 
                            fallback={FancyErrorFallback}
                            resetKeys={[location.pathname]}
                        >
                            <UsersModule />
                        </AdvancedErrorBoundary>
                    } />
                    <Route path="/dashboard" element={
                        <AsyncErrorBoundary>
                            <Dashboard />
                        </AsyncErrorBoundary>
                    } />
                </Routes>
            </Router>
        </AdvancedErrorBoundary>
    );
}

function UsersModule() {
    return <div>Users module content...</div>;
}

console.log('Error Boundaries examples loaded');
```

*Figyeld meg: Error Boundary = class component only, componentDidCatch = error logging, getDerivedStateFromError = UI update.*

</div>

<div class="concept-section myths" data-filter="react">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Error Boundary minden hibát elkap." → Event handlers, async code, SSR errors nem
- „Functional component is lehet Error Boundary." → Csak class component, mert lifecycle method kell
- „Error Boundary automatikusan retry-olja a komponenst." → Manuális state reset szükséges

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="react">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Error Boundary implementálás:**
```tsx
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    
    componentDidCatch(error, errorInfo) {
        console.error('Error:', error, errorInfo);
    }
    
    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}
```

**Mit NEM fognak el:**
- Event handler errors
- Async code errors  
- Server-side errors
- Error boundary saját hibái

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="react medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Miért nem lehet functional component Error Boundary?**
A: componentDidCatch és getDerivedStateFromError lifecycle method-ok kellenek, amik csak class component-ben vannak.

**Q: Hogyan kezelnél async error-okat Error Boundary-vel?**
A: Custom hook-kal (useErrorHandler) ami try/catch-ben elkapja és throw-olja, vagy .catch()-ben setState-el error-t.

**Q: Hol helyeznéd el az Error Boundary-ket egy nagy alkalmazásban?**
A: Top-level (app szintű), feature-level (route/module szintű), component-level (risky components körül).

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="react">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Class Components** → Error Boundary implementálás
- **Error Handling** → Try/catch, Promise.catch()
- **User Experience** → Graceful degradation
- **Monitoring** → Error tracking services (Sentry)
- **Testing** → Error scenario testing

</div>

</details>

</div>

### Code splitting & lazy loading {#code-splitting-lazy-loading}

<div class="concept-section mental-model" data-filter="react medior">

📋 **Fogalom meghatározása**  
*Code splitting egy optimalizációs technika, amely a JavaScript bundle-t több kisebb chunk-ra bontja, amelyek késlekedve (on-demand) töltődnek be. React.lazy() dinamikus import()-ot tesz lehetővé komponensekhez, amely csak akkor tölti be a komponens kódját, amikor az először renderelődik. A Suspense komponens fallback UI-t biztosít a betöltés alatt.*

</div>

<div class="concept-section why-important" data-filter="react medior">

💡 **Miért számít?**
- **Performance optimization**: Kisebb initial bundle size → gyorsabb loading
- **Better user experience**: Először a kritikus részek töltődnek be
- **Bandwidth efficiency**: Csak a szükséges kód letöltése
- **Scalability**: Nagy alkalmazásoknál elengedhetetlen

</div>

<div class="runnable-model" data-filter="react">

**Runnable mental model**
```tsx
// CODE SPLITTING & LAZY LOADING COMPREHENSIVE GUIDE
import React, { Suspense, lazy, useState, useEffect } from 'react';

// 1. BASIC LAZY LOADING WITH React.lazy()
const LazyAboutPage = lazy(() => import('./pages/AboutPage'));
const LazyDashboard = lazy(() => import('./pages/Dashboard'));
const LazyUserProfile = lazy(() => import('./components/UserProfile'));

// 2. LAZY LOADING WITH CUSTOM LOADING LOGIC
const LazyAdminPanel = lazy(() => 
    import('./pages/AdminPanel').then(module => ({
        default: module.AdminPanel
    }))
);

// 3. CONDITIONAL LAZY LOADING
const LazyExpensiveChart = lazy(() => {
    // Only load if user has premium subscription
    const hasAccess = checkUserAccess();
    
    if (hasAccess) {
        return import('./components/ExpensiveChart');
    } else {
        return import('./components/BasicChart');
    }
});

// 4. LAZY LOADING WITH ERROR HANDLING
const LazyComponentWithErrorHandling = lazy(() =>
    import('./components/RiskyComponent')
        .catch(error => {
            console.error('Failed to load component:', error);
            // Return a fallback component
            return import('./components/ErrorFallback');
        })
);

// 5. ROUTE-BASED CODE SPLITTING
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy load route components
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function AppWithCodeSplitting() {
    return (
        <BrowserRouter>
            <div className="app">
                <Navigation />
                
                <main className="app-content">
                    <Suspense fallback={<GlobalLoadingSpinner />}>
                        <Routes>
                            <Route 
                                path="/" 
                                element={
                                    <Suspense fallback={<PageSkeleton />}>
                                        <HomePage />
                                    </Suspense>
                                } 
                            />
                            <Route 
                                path="/products" 
                                element={
                                    <Suspense fallback={<PageSkeleton />}>
                                        <ProductsPage />
                                    </Suspense>
                                } 
                            />
                            <Route 
                                path="/contact" 
                                element={
                                    <Suspense fallback={<PageSkeleton />}>
                                        <ContactPage />
                                    </Suspense>
                                } 
                            />
                            <Route 
                                path="*" 
                                element={
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <NotFoundPage />
                                    </Suspense>
                                } 
                            />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </BrowserRouter>
    );
}

// 6. ADVANCED LAZY LOADING WITH PRELOADING
interface LazyComponentProps {
    shouldPreload?: boolean;
    onLoadStart?: () => void;
    onLoadEnd?: () => void;
    onLoadError?: (error: Error) => void;
}

function useLazyComponent(importFunction: () => Promise<any>, options: LazyComponentProps = {}) {
    const [Component, setComponent] = useState<React.ComponentType | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const loadComponent = async () => {
        if (Component || loading) return;

        try {
            setLoading(true);
            setError(null);
            options.onLoadStart?.();

            const module = await importFunction();
            const LoadedComponent = module.default || module;
            setComponent(() => LoadedComponent);
            
            options.onLoadEnd?.();
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to load component');
            setError(error);
            options.onLoadError?.(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (options.shouldPreload) {
            loadComponent();
        }
    }, [options.shouldPreload]);

    return { Component, loading, error, loadComponent };
}

// 7. SMART PRELOADING STRATEGIES
function SmartPreloadingExample() {
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);
    
    // Preload components on hover
    const { Component: LazyModal, loadComponent: loadModal } = useLazyComponent(
        () => import('./components/Modal'),
        {
            onLoadStart: () => console.log('Preloading modal...'),
            onLoadEnd: () => console.log('Modal preloaded successfully!')
        }
    );

    const { Component: LazyForm, loadComponent: loadForm } = useLazyComponent(
        () => import('./components/ComplexForm')
    );

    const handleButtonHover = (buttonType: string) => {
        setHoveredButton(buttonType);
        
        // Preload component based on user intent
        switch (buttonType) {
            case 'modal':
                loadModal();
                break;
            case 'form':
                loadForm();
                break;
        }
    };

    return (
        <div className="smart-preloading">
            <h2>Smart Preloading Demo</h2>
            
            <button
                onMouseEnter={() => handleButtonHover('modal')}
                onMouseLeave={() => setHoveredButton(null)}
                className="btn btn-primary"
            >
                Open Modal {hoveredButton === 'modal' && '(Preloading...)'}
            </button>
            
            <button
                onMouseEnter={() => handleButtonHover('form')}
                onMouseLeave={() => setHoveredButton(null)}
                className="btn btn-secondary"
            >
                Open Form {hoveredButton === 'form' && '(Preloading...)'}
            </button>

            <Suspense fallback={<ComponentSkeleton />}>
                {LazyModal && <LazyModal />}
                {LazyForm && <LazyForm />}
            </Suspense>
        </div>
    );
}

// 8. LOADING SKELETONS AND FALLBACKS
function GlobalLoadingSpinner() {
    return (
        <div className="global-loading">
            <div className="loading-spinner">
                <div className="spinner-ring"></div>
            </div>
            <p>Loading application...</p>
        </div>
    );
}

function PageSkeleton() {
    return (
        <div className="page-skeleton">
            <div className="skeleton-header">
                <div className="skeleton-line skeleton-title"></div>
                <div className="skeleton-line skeleton-subtitle"></div>
            </div>
            <div className="skeleton-content">
                <div className="skeleton-line"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line skeleton-short"></div>
                <div className="skeleton-line"></div>
            </div>
        </div>
    );
}

function ComponentSkeleton() {
    return (
        <div className="component-skeleton">
            <div className="skeleton-box"></div>
            <div className="skeleton-lines">
                <div className="skeleton-line"></div>
                <div className="skeleton-line skeleton-short"></div>
            </div>
        </div>
    );
}

// 9. BUNDLE ANALYSIS AND MONITORING
function BundleAnalysisDemo() {
    const [bundleInfo, setBundleInfo] = useState<any>(null);

    useEffect(() => {
        // In development, log bundle loading information
        if (process.env.NODE_ENV === 'development') {
            const originalImport = window.import;
            
            // Monkey patch dynamic imports to track loading
            window.import = function(specifier: string) {
                console.log(`Loading chunk: ${specifier}`);
                const startTime = performance.now();
                
                return originalImport.call(this, specifier).then(module => {
                    const loadTime = performance.now() - startTime;
                    console.log(`Chunk loaded in ${loadTime.toFixed(2)}ms: ${specifier}`);
                    return module;
                });
            };
        }
    }, []);

    return (
        <div className="bundle-analysis">
            <h3>Bundle Analysis</h3>
            <p>Check console for chunk loading information in development mode.</p>
        </div>
    );
}

// 10. MICRO-FRONTENDS WITH LAZY LOADING
const LazyMicroFrontend = lazy(() => {
    return new Promise((resolve, reject) => {
        // Dynamically load micro-frontend script
        const script = document.createElement('script');
        script.src = '/micro-frontends/user-management/bundle.js';
        script.onload = () => {
            // @ts-ignore - Micro-frontend exposes global
            const MicroFrontend = window.UserManagementMicroFrontend;
            resolve({ default: MicroFrontend });
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
});

// 11. FEATURE FLAG BASED LAZY LOADING
function FeatureFlagLazyLoading() {
    const [featureFlags, setFeatureFlags] = useState<Record<string, boolean>>({});

    useEffect(() => {
        // Fetch feature flags from API
        fetch('/api/feature-flags')
            .then(res => res.json())
            .then(flags => setFeatureFlags(flags));
    }, []);

    // Conditionally lazy load based on feature flags
    const LazyNewFeature = lazy(() => {
        if (featureFlags.newFeatureEnabled) {
            return import('./components/NewFeature');
        } else {
            return import('./components/OldFeature');
        }
    });

    return (
        <div className="feature-flag-demo">
            <h3>Feature Flag Based Loading</h3>
            <Suspense fallback={<div>Loading feature...</div>}>
                {Object.keys(featureFlags).length > 0 && <LazyNewFeature />}
            </Suspense>
        </div>
    );
}

// 12. LAZY LOADING WITH INTERSECTION OBSERVER
function LazyComponentOnScroll() {
    const [shouldLoad, setShouldLoad] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (triggerRef.current) {
            observer.observe(triggerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const LazyExpensiveComponent = lazy(() => import('./components/ExpensiveComponent'));

    return (
        <div className="lazy-scroll-component">
            <div style={{ height: '1000px' }}>
                <p>Scroll down to load the expensive component...</p>
            </div>
            
            <div ref={triggerRef} className="load-trigger">
                {shouldLoad ? (
                    <Suspense fallback={<div>Loading expensive component...</div>}>
                        <LazyExpensiveComponent />
                    </Suspense>
                ) : (
                    <div>Component will load when you scroll here...</div>
                )}
            </div>
        </div>
    );
}

// 13. PRACTICAL APPLICATION STRUCTURE
function CodeSplittingApp() {
    const [currentRoute, setCurrentRoute] = useState('/');
    
    return (
        <div className="code-splitting-app">
            <Navigation onNavigate={setCurrentRoute} />
            
            <main className="app-main">
                <Suspense 
                    fallback={
                        <PageSkeleton />
                    }
                >
                    <RouteRenderer route={currentRoute} />
                </Suspense>
            </main>
            
            {/* Preload likely next routes */}
            <RoutePreloader currentRoute={currentRoute} />
        </div>
    );
}

function RouteRenderer({ route }: { route: string }) {
    switch (route) {
        case '/':
            const HomePage = lazy(() => import('./pages/HomePage'));
            return <HomePage />;
            
        case '/products':
            const ProductsPage = lazy(() => import('./pages/ProductsPage'));
            return <ProductsPage />;
            
        case '/dashboard':
            const Dashboard = lazy(() => import('./pages/Dashboard'));
            return <Dashboard />;
            
        default:
            const NotFound = lazy(() => import('./pages/NotFound'));
            return <NotFound />;
    }
}

function RoutePreloader({ currentRoute }: { currentRoute: string }) {
    useEffect(() => {
        // Preload likely next routes based on current route
        const preloadRoutes: Record<string, string[]> = {
            '/': ['/products', '/dashboard'],
            '/products': ['/dashboard'],
            '/dashboard': ['/']
        };

        const routesToPreload = preloadRoutes[currentRoute] || [];
        
        routesToPreload.forEach(route => {
            switch (route) {
                case '/products':
                    import('./pages/ProductsPage');
                    break;
                case '/dashboard':
                    import('./pages/Dashboard');
                    break;
                case '/':
                    import('./pages/HomePage');
                    break;
            }
        });
    }, [currentRoute]);

    return null; // This component doesn't render anything
}

// 14. WEBPACK BUNDLE ANALYSIS HELPERS
function WebpackChunkNameExample() {
    // Use webpack magic comments for chunk naming
    const LazyUserDashboard = lazy(() => 
        import(
            /* webpackChunkName: "user-dashboard" */ 
            './pages/UserDashboard'
        )
    );

    const LazyAdminPanel = lazy(() => 
        import(
            /* webpackChunkName: "admin-panel" */
            /* webpackPreload: true */
            './pages/AdminPanel'
        )
    );

    const LazyReportsModule = lazy(() => 
        import(
            /* webpackChunkName: "reports" */
            /* webpackPrefetch: true */
            './modules/Reports'
        )
    );

    return (
        <div className="webpack-chunks">
            <Suspense fallback={<div>Loading dashboard...</div>}>
                <LazyUserDashboard />
            </Suspense>
            
            <Suspense fallback={<div>Loading admin panel...</div>}>
                <LazyAdminPanel />
            </Suspense>
            
            <Suspense fallback={<div>Loading reports...</div>}>
                <LazyReportsModule />
            </Suspense>
        </div>
    );
}

console.log('Code splitting and lazy loading examples loaded');
```

*Figyeld meg: React.lazy() = dynamic import wrapper, Suspense = loading fallback, webpackChunkName = custom chunk naming.*

</div>

<div class="concept-section myths" data-filter="react">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Lazy loading minden komponensre jó." → Csak nagyobb, ritkán használt komponensekre érdemes
- „Suspense fallback-ot mindig kell megadni." → Hiányzó fallback error-t okoz
- „Code splitting automatikusan optimalizálja a performance-ot." → Rossz splitting stratégia ronthat is

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="react">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Alapvető lazy loading:**
```tsx
const LazyComponent = lazy(() => import('./Component'));

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LazyComponent />
        </Suspense>
    );
}
```

**Webpack magic comments:**
```tsx
const LazyComponent = lazy(() => 
    import(
        /* webpackChunkName: "my-chunk" */
        /* webpackPreload: true */
        './Component'
    )
);
```

**Mikor használd:**
- Route-based splitting (nagy oldalak)
- Feature-based splitting (admin panel)
- Component-based splitting (3rd party libs)

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="react medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mi a különbség webpackPreload és webpackPrefetch között?**
A: Preload = high priority, azonnal tölt; Prefetch = low priority, idle time-ban tölt, következő navigációra.

**Q: Hogyan optimalizálnád a bundle size-ot nagy React alkalmazásban?**
A: Route-based splitting, tree shaking, library chunking, dynamic imports, webpack-bundle-analyzer használat.

**Q: Mikor nem érdemes lazy loading-ot használni?**
A: Kis komponenseknél, kritikus above-the-fold tartalmnál, gyakran használt shared komponenseknél.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="react">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Webpack/Bundling** → Code splitting configuration
- **Performance** → Bundle size optimization
- **User Experience** → Loading states, skeleton screens
- **React Router** → Route-based code splitting
- **Suspense** → Loading boundary pattern

</div>

</details>

</div>

### Suspense & Concurrent features {#suspense-concurrent-features}

<div class="concept-section mental-model" data-filter="react medior">

📋 **Fogalom meghatározása**  
*Suspense egy React komponens, amely lehetővé teszi komponensek "várakozását" valamilyen feltétel teljesüléséig (pl. adat betöltés, lazy loading), közben fallback UI-t jelenítve meg. A Concurrent features (useTransition, useDeferredValue) lehetővé teszik alacsony prioritású renderelések megakasztását és magas prioritású frissítéseknek elsőbbséget adnak, javitva a responsive user experience-t.*

</div>

<div class="concept-section why-important" data-filter="react medior">

💡 **Miért számít?**
- **Better user experience**: Nem blokkoló UI updates
- **Improved performance**: Prioritized rendering
- **Smoother interactions**: Interruptible renders
- **Modern React pattern**: Jövő-álló fejlesztési modell

</div>

<div class="runnable-model" data-filter="react">

**Runnable mental model**
```tsx
// SUSPENSE & CONCURRENT FEATURES COMPREHENSIVE GUIDE
import React, { 
    Suspense, 
    startTransition, 
    useDeferredValue, 
    useTransition,
    useState,
    useEffect,
    lazy,
    useMemo
} from 'react';

// 1. BASIC SUSPENSE WITH LAZY LOADING
const LazyChart = lazy(() => import('./components/Chart'));
const LazyDataTable = lazy(() => import('./components/DataTable'));

function BasicSuspenseExample() {
    const [showChart, setShowChart] = useState(false);
    const [showTable, setShowTable] = useState(false);

    return (
        <div className="basic-suspense">
            <h2>Basic Suspense Example</h2>
            
            <div className="controls">
                <button 
                    onClick={() => setShowChart(!showChart)}
                    className="btn btn-primary"
                >
                    {showChart ? 'Hide' : 'Show'} Chart
                </button>
                
                <button 
                    onClick={() => setShowTable(!showTable)}
                    className="btn btn-secondary"
                >
                    {showTable ? 'Hide' : 'Show'} Table
                </button>
            </div>

            <div className="content">
                {showChart && (
                    <Suspense 
                        fallback={
                            <div className="loading-placeholder">
                                <div className="skeleton-chart"></div>
                                <p>Loading chart...</p>
                            </div>
                        }
                    >
                        <LazyChart />
                    </Suspense>
                )}

                {showTable && (
                    <Suspense 
                        fallback={
                            <div className="loading-placeholder">
                                <div className="skeleton-table"></div>
                                <p>Loading data table...</p>
                            </div>
                        }
                    >
                        <LazyDataTable />
                    </Suspense>
                )}
            </div>
        </div>
    );
}

// 2. DATA FETCHING WITH SUSPENSE
interface User {
    id: number;
    name: string;
    email: string;
}

// Suspense-compatible data fetcher
function createSuspenseResource<T>(promise: Promise<T>) {
    let status = 'pending';
    let result: T;
    let suspender = promise.then(
        (response) => {
            status = 'success';
            result = response;
        },
        (error) => {
            status = 'error';
            result = error;
        }
    );

    return {
        read() {
            if (status === 'pending') {
                throw suspender; // This triggers Suspense
            } else if (status === 'error') {
                throw result;
            } else if (status === 'success') {
                return result;
            }
        }
    };
}

// API functions
async function fetchUser(userId: number): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay
    return {
        id: userId,
        name: `User ${userId}`,
        email: `user${userId}@example.com`
    };
}

async function fetchUserPosts(userId: number): Promise<Array<{ id: number, title: string }>> {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
    return [
        { id: 1, title: `Post 1 by User ${userId}` },
        { id: 2, title: `Post 2 by User ${userId}` },
        { id: 3, title: `Post 3 by User ${userId}` }
    ];
}

// Components that use Suspense for data fetching
function UserProfile({ userId }: { userId: number }) {
    const userResource = useMemo(() => createSuspenseResource(fetchUser(userId)), [userId]);
    const user = userResource.read(); // This will suspend if data isn't ready

    return (
        <div className="user-profile">
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>User ID: {user.id}</p>
        </div>
    );
}

function UserPosts({ userId }: { userId: number }) {
    const postsResource = useMemo(() => createSuspenseResource(fetchUserPosts(userId)), [userId]);
    const posts = postsResource.read(); // This will suspend if data isn't ready

    return (
        <div className="user-posts">
            <h4>Posts</h4>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
}

function DataFetchingSuspenseExample() {
    const [userId, setUserId] = useState(1);

    return (
        <div className="data-fetching-suspense">
            <h2>Data Fetching with Suspense</h2>
            
            <div className="user-selector">
                <label>Select User:</label>
                <select 
                    value={userId} 
                    onChange={(e) => setUserId(Number(e.target.value))}
                >
                    {[1, 2, 3, 4, 5].map(id => (
                        <option key={id} value={id}>User {id}</option>
                    ))}
                </select>
            </div>

            <div className="user-data">
                <Suspense fallback={<UserProfileSkeleton />}>
                    <UserProfile userId={userId} />
                    
                    <Suspense fallback={<UserPostsSkeleton />}>
                        <UserPosts userId={userId} />
                    </Suspense>
                </Suspense>
            </div>
        </div>
    );
}

// 3. useTransition HOOK FOR NON-BLOCKING UPDATES
function TransitionExample() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<string[]>([]);
    const [isPending, startTransition] = useTransition();

    // Simulate expensive search operation
    const searchResults = (searchQuery: string): string[] => {
        if (!searchQuery) return [];
        
        // Simulate heavy computation
        const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}: ${searchQuery}`);
        return items.filter(item => 
            item.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 100);
    };

    const handleSearch = (newQuery: string) => {
        setQuery(newQuery);
        
        // Use startTransition for non-urgent updates
        startTransition(() => {
            const newResults = searchResults(newQuery);
            setResults(newResults);
        });
    };

    return (
        <div className="transition-example">
            <h2>useTransition Example</h2>
            
            <div className="search-container">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search items..."
                    className="search-input"
                />
                {isPending && <span className="search-pending">Searching...</span>}
            </div>

            <div className="search-results">
                <p>Found {results.length} results for "{query}"</p>
                {isPending ? (
                    <div className="results-loading">
                        <div className="skeleton-list">
                            {Array.from({ length: 10 }, (_, i) => (
                                <div key={i} className="skeleton-item"></div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <ul className="results-list">
                        {results.map((result, index) => (
                            <li key={index} className="result-item">
                                {result}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

// 4. useDeferredValue HOOK FOR DEFERRED UPDATES
function DeferredValueExample() {
    const [input, setInput] = useState('');
    const deferredInput = useDeferredValue(input);
    const [expensiveResults, setExpensiveResults] = useState<string[]>([]);

    // Expensive computation that we want to defer
    useEffect(() => {
        const computeExpensiveResults = () => {
            if (!deferredInput) {
                setExpensiveResults([]);
                return;
            }

            // Simulate expensive computation
            const results = Array.from({ length: 5000 }, (_, i) => {
                const factor = Math.sin(i * deferredInput.length);
                return `Computed result ${i}: ${deferredInput} * ${factor.toFixed(4)}`;
            }).filter((_, i) => i % 10 === 0); // Take every 10th result
            
            setExpensiveResults(results);
        };

        computeExpensiveResults();
    }, [deferredInput]);

    const isStale = input !== deferredInput;

    return (
        <div className="deferred-value-example">
            <h2>useDeferredValue Example</h2>
            
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type something..."
                    className="deferred-input"
                />
                {isStale && (
                    <span className="stale-indicator">Computing...</span>
                )}
            </div>

            <div className="computation-info">
                <p>Current input: {input}</p>
                <p>Deferred input: {deferredInput}</p>
                <p>Results computed for: {deferredInput || 'nothing'}</p>
            </div>

            <div className={`expensive-results ${isStale ? 'stale' : ''}`}>
                <h3>Expensive Computation Results ({expensiveResults.length})</h3>
                <div className="results-container">
                    {expensiveResults.slice(0, 20).map((result, index) => (
                        <div key={index} className="result-card">
                            {result}
                        </div>
                    ))}
                    {expensiveResults.length > 20 && (
                        <div className="more-results">
                            ...and {expensiveResults.length - 20} more results
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// 5. COMBINING CONCURRENT FEATURES
function CombinedConcurrentExample() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isPending, startTransition] = useTransition();
    const deferredSearchTerm = useDeferredValue(searchTerm);

    const [searchResults, setSearchResults] = useState<Array<{
        id: number;
        title: string;
        category: string;
    }>>([]);

    // Simulate expensive search with filtering
    useEffect(() => {
        const performSearch = () => {
            if (!deferredSearchTerm) {
                setSearchResults([]);
                return;
            }

            // Simulate expensive operation
            const allResults = Array.from({ length: 1000 }, (_, i) => ({
                id: i,
                title: `Result ${i}: ${deferredSearchTerm}`,
                category: ['tech', 'business', 'science', 'art'][i % 4]
            }));

            const filtered = allResults.filter(item => {
                const matchesSearch = item.title.toLowerCase().includes(deferredSearchTerm.toLowerCase());
                const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
                return matchesSearch && matchesCategory;
            });

            setSearchResults(filtered.slice(0, 50));
        };

        performSearch();
    }, [deferredSearchTerm, selectedCategory]);

    const handleCategoryChange = (newCategory: string) => {
        startTransition(() => {
            setSelectedCategory(newCategory);
        });
    };

    const isSearchStale = searchTerm !== deferredSearchTerm;

    return (
        <div className="combined-concurrent-example">
            <h2>Combined Concurrent Features</h2>
            
            <div className="search-controls">
                <div className="search-input-group">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search results..."
                        className="search-input"
                    />
                    {(isSearchStale || isPending) && (
                        <span className="search-status">
                            {isSearchStale ? 'Updating search...' : 'Filtering...'}
                        </span>
                    )}
                </div>
                
                <div className="category-filters">
                    {['all', 'tech', 'business', 'science', 'art'].map(category => (
                        <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="search-results-section">
                <div className="results-header">
                    <h3>Search Results ({searchResults.length})</h3>
                    <div className="search-meta">
                        <span>Search term: "{deferredSearchTerm}"</span>
                        <span>Category: {selectedCategory}</span>
                    </div>
                </div>

                <div className={`results-grid ${isSearchStale || isPending ? 'updating' : ''}`}>
                    {searchResults.map(result => (
                        <div key={result.id} className="result-card">
                            <h4>{result.title}</h4>
                            <span className={`category-badge category-${result.category}`}>
                                {result.category}
                            </span>
                        </div>
                    ))}
                </div>

                {searchResults.length === 0 && deferredSearchTerm && (
                    <div className="no-results">
                        No results found for "{deferredSearchTerm}" in {selectedCategory} category.
                    </div>
                )}
            </div>
        </div>
    );
}

// 6. NESTED SUSPENSE BOUNDARIES
function NestedSuspenseExample() {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="nested-suspense-example">
            <h2>Nested Suspense Boundaries</h2>
            
            <button 
                onClick={() => setShowDetails(!showDetails)}
                className="btn btn-primary"
            >
                {showDetails ? 'Hide' : 'Show'} Details
            </button>

            {showDetails && (
                <Suspense fallback={<MainContentSkeleton />}>
                    <MainContent />
                    
                    <Suspense fallback={<SidebarSkeleton />}>
                        <Sidebar />
                        
                        <Suspense fallback={<WidgetSkeleton />}>
                            <ExpensiveWidget />
                        </Suspense>
                    </Suspense>
                </Suspense>
            )}
        </div>
    );
}

// Lazy components for nested suspense
const MainContent = lazy(() => 
    new Promise(resolve => 
        setTimeout(() => resolve({ default: () => <div>Main content loaded!</div> }), 1000)
    )
);

const Sidebar = lazy(() => 
    new Promise(resolve => 
        setTimeout(() => resolve({ default: () => <div>Sidebar loaded!</div> }), 2000)
    )
);

const ExpensiveWidget = lazy(() => 
    new Promise(resolve => 
        setTimeout(() => resolve({ default: () => <div>Expensive widget loaded!</div> }), 3000)
    )
);

// 7. SKELETON COMPONENTS
function UserProfileSkeleton() {
    return (
        <div className="user-profile-skeleton">
            <div className="skeleton-avatar"></div>
            <div className="skeleton-info">
                <div className="skeleton-line skeleton-title"></div>
                <div className="skeleton-line skeleton-subtitle"></div>
            </div>
        </div>
    );
}

function UserPostsSkeleton() {
    return (
        <div className="user-posts-skeleton">
            <div className="skeleton-line skeleton-title"></div>
            {Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="skeleton-line"></div>
            ))}
        </div>
    );
}

function MainContentSkeleton() {
    return (
        <div className="main-content-skeleton">
            <div className="skeleton-header"></div>
            <div className="skeleton-content">
                <div className="skeleton-line"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line skeleton-short"></div>
            </div>
        </div>
    );
}

function SidebarSkeleton() {
    return (
        <div className="sidebar-skeleton">
            <div className="skeleton-box"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line skeleton-short"></div>
        </div>
    );
}

function WidgetSkeleton() {
    return (
        <div className="widget-skeleton">
            <div className="skeleton-circle"></div>
            <div className="skeleton-line skeleton-short"></div>
        </div>
    );
}

// 8. MAIN DEMO APPLICATION
function SuspenseConcurrentDemo() {
    const [activeTab, setActiveTab] = useState('basic');

    const tabs = [
        { id: 'basic', label: 'Basic Suspense', component: BasicSuspenseExample },
        { id: 'data', label: 'Data Fetching', component: DataFetchingSuspenseExample },
        { id: 'transition', label: 'useTransition', component: TransitionExample },
        { id: 'deferred', label: 'useDeferredValue', component: DeferredValueExample },
        { id: 'combined', label: 'Combined Features', component: CombinedConcurrentExample },
        { id: 'nested', label: 'Nested Suspense', component: NestedSuspenseExample }
    ];

    const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

    return (
        <div className="suspense-concurrent-demo">
            <h1>Suspense & Concurrent Features Demo</h1>
            
            <div className="demo-tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="demo-content">
                <Suspense fallback={<div className="demo-loading">Loading demo...</div>}>
                    {ActiveComponent && <ActiveComponent />}
                </Suspense>
            </div>
        </div>
    );
}

console.log('Suspense and Concurrent Features examples loaded');
```

*Figyeld meg: Suspense = loading boundary, useTransition = non-blocking updates, useDeferredValue = low priority updates.*

</div>

<div class="concept-section myths" data-filter="react">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Suspense automatikusan optimalizálja a performance-ot." → Helyes használat és boundary placement szükséges
- „useTransition minden state update-re jó." → Csak non-urgent update-ekre használd
- „Concurrent features mindig gyorsabbá teszik az app-ot." → Rossz használat overhead-et okozhat

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="react">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Alapvető Suspense:**
```tsx
<Suspense fallback={<Loading />}>
    <LazyComponent />
</Suspense>
```

**useTransition (non-blocking updates):**
```tsx
const [isPending, startTransition] = useTransition();

startTransition(() => {
    setExpensiveState(newValue);
});
```

**useDeferredValue (low priority):**
```tsx
const deferredQuery = useDeferredValue(query);
const isStale = query !== deferredQuery;
```

**Mikor használd:**
- Suspense: lazy loading, data fetching
- useTransition: user interactions, non-urgent updates
- useDeferredValue: expensive computations

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="react medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mi a különbség useTransition és useDeferredValue között?**
A: useTransition aktív control non-urgent update-ekhez; useDeferredValue passzív deferring értékekhez.

**Q: Hogyan implementálnál data fetching-et Suspense-szal production-ban?**
A: React Query/SWR library-vel, nem custom resource-okkal. Resource pattern complex és error-prone.

**Q: Mikor használnál nested Suspense boundary-ket?**
A: Független loading state-ekhez, progressive loading-hoz, jobb UX-hez (nem blokkolja az egész UI-t).

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="react">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **React 18** → Concurrent Rendering Engine
- **Code Splitting** → Lazy loading with Suspense
- **Performance** → Non-blocking updates, prioritization
- **User Experience** → Progressive loading, responsive interactions
- **Data Fetching** → React Query, SWR integration

</div>

</details>

</div>

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

<div class="concept-section" data-filter="typescript medior">

### TypeScript: type, interface {#typescript-type-interface}

<div class="mental-model">
🛡️ **Mental Model: TypeScript - A Code Safety Net with X-Ray Vision**
Képzeld el a TypeScript-et mint egy röntgen géppet kombinálva egy biztonsági hálóval. Ahogy a röntgen láthatóvá teszi a test belső struktúráját, a TypeScript láthatóvá teszi a kód "típus-anatómiáját" - és megakadályozza, hogy "törött csonttal" fusson a program.

**TypeScript mint Safety Net:**
- **Compile-time checking**: Hibák befogása még futtatás előtt
- **IntelliSense**: IDE autocompletion és suggestion
- **Refactoring support**: Biztonságos kód átírás
- **Documentation**: A típusok maguk a dokumentáció
- **Team communication**: Types mint contract team tagok között

**Type vs Interface - mikor melyik:**
- **Interface**: Object shape definition, extendelhető
- **Type**: Union types, computed types, primitives
- **Interface**: OOP-style, declaration merging
- **Type**: Functional style, více flexible
</div>

<div class="why-important">
💡 **Miért váltott át a világ TypeScript-re?**
- **Bug prevention**: 15% fewer bugs in production (Microsoft study)
- **Developer productivity**: 10x faster debugging és refactoring
- **Code maintainability**: Self-documenting code
- **Team scalability**: Nagyobb team-ek is biztonságban dolgozhatnak
- **IDE experience**: IntelliSense, autocompletion, navigation
- **Enterprise adoption**: Fortune 500 companies 73%-a használja
- **Open source ecosystem**: Minden major library TypeScript first
- **Career advancement**: 40% magasabb fizetés TypeScript devs-eknek
</div>

<div class="runnable-model">
🚀 **Advanced TypeScript patterns for React:**

**1. Strict Type Safety foundations:**
```typescript
// tsconfig.json - strict configuration
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,                     // Enable all strict checks
    "noImplicitAny": true,             // No implicit any types
    "noImplicitReturns": true,         // All paths must return
    "noUnusedLocals": true,            // No unused variables
    "noUnusedParameters": true,        // No unused function params
    "exactOptionalPropertyTypes": true, // Strict optional properties
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}

// Base domain types
interface BaseEntity {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

// User domain with strict typing
interface User extends BaseEntity {
  readonly email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  preferences: UserPreferences;
  subscription: SubscriptionTier;
}

// Enum-like types with string literals
type UserRole = 'admin' | 'moderator' | 'user' | 'guest';
type SubscriptionTier = 'free' | 'premium' | 'enterprise';
type ThemeName = 'light' | 'dark' | 'auto';

interface UserPreferences {
  theme: ThemeName;
  language: SupportedLanguage;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}

type SupportedLanguage = 'en' | 'hu' | 'de' | 'fr' | 'es';

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketing: boolean;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private';
  showOnlineStatus: boolean;
  allowDirectMessages: boolean;
}
```

**2. Generic Types and Utility Types:**
```typescript
// Generic API response wrapper
interface ApiResponse<TData> {
  data: TData;
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

// Generic repository pattern
interface Repository<TEntity extends BaseEntity> {
  findById(id: string): Promise<TEntity | null>;
  findMany(query: QueryOptions<TEntity>): Promise<ApiResponse<TEntity[]>>;
  create(data: CreateInput<TEntity>): Promise<TEntity>;
  update(id: string, data: UpdateInput<TEntity>): Promise<TEntity>;
  delete(id: string): Promise<void>;
}

// Utility types for CRUD operations
type CreateInput<T> = Omit<T, keyof BaseEntity>;
type UpdateInput<T> = Partial<Omit<T, keyof BaseEntity>>;
type QueryOptions<T> = {
  where?: Partial<T>;
  orderBy?: {
    [K in keyof T]?: 'asc' | 'desc';
  };
  include?: Array<keyof T>;
  limit?: number;
  offset?: number;
};

// Advanced conditional types
type NonNullable<T> = T extends null | undefined ? never : T;
type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

// Extract string keys from User
type UserStringKeys = KeysOfType<User, string>; // 'name' | 'email' | 'avatar'

// Mapped types for form handling
type FormState<T> = {
  [K in keyof T]: {
    value: T[K];
    error?: string;
    touched: boolean;
  };
};

type FormActions<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

// Real-world usage
type UserFormState = FormState<CreateInput<User>>;
type UserFormActions = FormActions<CreateInput<User>>;
```

**3. React Component TypeScript Patterns:**
```typescript
// Strict prop definitions with generics
interface BaseTableProps<TData> {
  data: TData[];
  loading?: boolean;
  error?: string | null;
  onRowClick?: (row: TData) => void;
  className?: string;
}

interface TableColumn<TData> {
  key: keyof TData;
  title: string;
  render?: (value: TData[keyof TData], row: TData) => React.ReactNode;
  sortable?: boolean;
  width?: string | number;
}

interface TableProps<TData> extends BaseTableProps<TData> {
  columns: TableColumn<TData>[];
  keyExtractor: (row: TData) => string;
  sortConfig?: {
    key: keyof TData;
    direction: 'asc' | 'desc';
  };
  onSort?: (key: keyof TData) => void;
}

// Generic Table component with full type safety
const Table = <TData extends Record<string, any>>({
  data,
  columns,
  keyExtractor,
  loading = false,
  error = null,
  sortConfig,
  onRowClick,
  onSort,
  className = ''
}: TableProps<TData>): JSX.Element => {
  const handleRowClick = useCallback((row: TData) => {
    onRowClick?.(row);
  }, [onRowClick]);

  const handleSort = useCallback((key: keyof TData) => {
    onSort?.(key);
  }, [onSort]);

  if (loading) {
    return (
      <div className="table-loading">
        <div className="spinner" />
        <p>Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="table-error">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <table className={`data-table ${className}`}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={String(column.key)}
              style={{ width: column.width }}
              onClick={column.sortable ? () => handleSort(column.key) : undefined}
              className={`
                ${column.sortable ? 'sortable' : ''}
                ${sortConfig?.key === column.key ? `sorted-${sortConfig.direction}` : ''}
              `}
            >
              {column.title}
              {column.sortable && sortConfig?.key === column.key && (
                <span className="sort-indicator">
                  {sortConfig.direction === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr
            key={keyExtractor(row)}
            onClick={onRowClick ? () => handleRowClick(row) : undefined}
            className={onRowClick ? 'clickable' : ''}
          >
            {columns.map((column) => (
              <td key={String(column.key)}>
                {column.render 
                  ? column.render(row[column.key], row)
                  : String(row[column.key])
                }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Type-safe usage of generic Table
const UserTable: React.FC<{ users: User[] }> = ({ users }) => {
  const columns: TableColumn<User>[] = [
    {
      key: 'name',
      title: 'Name',
      sortable: true,
      render: (name, user) => (
        <div className="user-cell">
          <img src={user.avatar} alt={name} className="avatar" />
          <span>{name}</span>
        </div>
      )
    },
    {
      key: 'email',
      title: 'Email',
      sortable: true
    },
    {
      key: 'role',
      title: 'Role',
      render: (role) => (
        <span className={`role-badge role-${role}`}>
          {role}
        </span>
      )
    },
    {
      key: 'createdAt',
      title: 'Joined',
      render: (date) => new Date(date).toLocaleDateString()
    }
  ];

  return (
    <Table
      data={users}
      columns={columns}
      keyExtractor={(user) => user.id}
      onRowClick={(user) => console.log('Clicked user:', user)}
    />
  );
};
```

**4. Custom Hook TypeScript Patterns:**
```typescript
// Generic hook with overloads for different use cases
function useLocalStorage<T>(key: string): [T | null, (value: T | null) => void];
function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void];
function useLocalStorage<T>(
  key: string, 
  defaultValue?: T
): [T | null, (value: T | null) => void] {
  const [value, setValue] = useState<T | null>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue ?? null;
    } catch {
      return defaultValue ?? null;
    }
  });

  const setStoredValue = useCallback((newValue: T | null) => {
    try {
      setValue(newValue);
      if (newValue === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }, [key]);

  return [value, setStoredValue];
}

// Discriminated unions for complex state
type AsyncState<TData, TError = string> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: TData }
  | { status: 'error'; error: TError };

// Type-safe async hook
const useAsyncOperation = <TData, TError = string>() => {
  const [state, setState] = useState<AsyncState<TData, TError>>({ 
    status: 'idle' 
  });

  const execute = useCallback(async (operation: () => Promise<TData>) => {
    setState({ status: 'loading' });
    
    try {
      const data = await operation();
      setState({ status: 'success', data });
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setState({ status: 'error', error: errorMessage as TError });
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ status: 'idle' });
  }, []);

  return {
    ...state,
    execute,
    reset,
    isLoading: state.status === 'loading',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
    isIdle: state.status === 'idle'
  };
};

// Usage with full type safety
const UserManager: React.FC = () => {
  const {
    status,
    data: users,
    error,
    execute: executeUserOperation,
    isLoading
  } = useAsyncOperation<User[], string>();

  const [selectedUser, setSelectedUser] = useLocalStorage<User | null>('selectedUser');

  const fetchUsers = useCallback(async () => {
    await executeUserOperation(async () => {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    });
  }, [executeUserOperation]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Type-safe handling of discriminated union
  switch (status) {
    case 'loading':
      return <div>Loading users...</div>;
    
    case 'error':
      return (
        <div>
          <p>Error: {error}</p>
          <button onClick={fetchUsers}>Retry</button>
        </div>
      );
    
    case 'success':
      return (
        <div>
          <UserTable users={users} />
          {selectedUser && (
            <div>Selected: {selectedUser.name}</div>
          )}
        </div>
      );
    
    default:
      return <button onClick={fetchUsers}>Load Users</button>;
  }
};
```
</div>

<div class="myths">
🚫 **Gyakori tévhitek és hibák**

<details>
<summary><strong>Tévhit: "TypeScript lassítja a fejlesztést"</strong></summary>
<div class="myth-content">
**Valóság:** Kezdetben többet kell írni, de hosszú távon jelentősen gyorsítja a fejlesztést.

**Productivity metrics:**
- **Initial learning curve**: 2-4 hét átállás
- **Daily development speed**: 15% gyorsabb 3 hónap után
- **Bug fixing time**: 60% kevesebb idő
- **Refactoring confidence**: 300% növekedés

**TypeScript előnyök számokban:**
```typescript
// JavaScript - runtime error
function getUserName(user) {
  return user.profile.displayName; // Oops, user might be null
}

// TypeScript - compile-time safety
function getUserName(user: User | null): string {
  return user?.profile?.displayName ?? 'Anonymous';
}

// IDE benefits:
// - Autocompletion: 90% fewer typos
// - Refactoring: Safe renames across codebase
// - Navigation: Jump to definition works 100%
// - IntelliSense: API discovery built-in
```

**ROI calculation:**
```
Time saved per day: 30 minutes (debugging + refactoring)
Developer salary: $60,000/year
Yearly savings: $3,750 per developer
Team of 5: $18,750 yearly savings
```
</div>
</details>

<details>
<summary><strong>Tévhit: "Any type használata OK, ha gyorsan kell dolgozni"</strong></summary>
<div class="myth-content">
**Valóság:** `any` használata lemondás a TypeScript előnyeiről és technical debt felhalmozás.

**Any type problems:**
```typescript
// BAD: any defeats the purpose
const fetchUserData = async (id: any): Promise<any> => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
};

const user = await fetchUserData("123");
user.profile.name; // No type checking, runtime errors possible
```

**GOOD: Gradual typing approach:**
```typescript
// GOOD: Start with basic types, refine later
interface User {
  id: string;
  name: string;
  // TODO: Add more fields as we discover them
  [key: string]: unknown; // Temporary escape hatch
}

const fetchUserData = async (id: string): Promise<User> => {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
};

// Now you have type safety AND can incrementally improve
```

**Migration strategy:**
1. Start with `strict: false` in tsconfig
2. Enable strict checks one by one
3. Use `// @ts-ignore` sparingly and with TODO comments
4. Replace `any` with `unknown` and type guards
5. Add types incrementally, prioritize high-traffic code
</div>
</details>

<details>
<summary><strong>Tévhit: "Interface és type ugyanaz"</strong></summary>
<div class="myth-content">
**Valóság:** Különböző use case-ekhez különböző tools.

**Interface strengths:**
```typescript
// GOOD: Use interfaces for object shapes
interface User {
  id: string;
  name: string;
}

// Interfaces can be extended
interface AdminUser extends User {
  permissions: string[];
}

// Interfaces support declaration merging
interface Window {
  customProperty: string;
}
// Later in another file...
interface Window {
  anotherProperty: number;
}
// Now Window has both properties
```

**Type alias strengths:**
```typescript
// GOOD: Use types for unions, primitives, computed types
type Status = 'loading' | 'success' | 'error';
type EventHandler<T> = (event: T) => void;

// Types can use computed properties
type UserKeys = keyof User;
type UserPickedFields = Pick<User, 'id' | 'name'>;

// Types are more flexible with conditionals
type NonNullable<T> = T extends null | undefined ? never : T;
```

**When to use which:**
- **Interface**: Object shapes, classes, extendable contracts
- **Type**: Unions, primitives, computed types, function signatures
- **Both work**: Simple object definitions (choose one style consistently)

**Team convention example:**
```typescript
// Team rule: Use interfaces for data models, types for everything else
interface User { /* data model */ }
interface ApiResponse<T> { /* extendable contract */ }

type UserRole = 'admin' | 'user'; // union type
type FormHandler = (data: User) => void; // function type
```
</div>
</details>
</details>

<div class="micro-learning">
🎯 **Micro-learning: TypeScript productivity hacks**

**Essential utility types minden React dev-nek:**
```typescript
// 1. Pick - select specific properties
type UserPreview = Pick<User, 'id' | 'name' | 'avatar'>;

// 2. Omit - exclude specific properties  
type CreateUserRequest = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

// 3. Partial - make all properties optional
type UpdateUserRequest = Partial<User>;

// 4. Required - make all properties required
type CompleteUser = Required<User>;

// 5. Record - key-value mapping
type UserRolePermissions = Record<UserRole, string[]>;

// 6. Extract/Exclude for union types
type AdminRoles = Extract<UserRole, 'admin' | 'superAdmin'>;
type NonAdminRoles = Exclude<UserRole, 'admin'>;
```

**React-specific TypeScript patterns:**
```typescript
// Component props with children
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

// Event handlers
const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
  event.preventDefault();
  // Type-safe event handling
};

// Ref forwarding
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', ...props }, ref) => (
    <button ref={ref} className={`btn btn-${variant}`} {...props}>
      {children}
    </button>
  )
);
```

**Pro tip:** Use TypeScript strict mode ASAP - easier to start strict than migrate later!

**Quick wins for existing JS projects:**
1. Rename `.js` → `.tsx` files gradually
2. Add `// @ts-check` to JS files for basic checking
3. Start with types for API responses
4. Type your custom hooks first
5. Use TypeScript for new features only
</div>

</div>

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

### Middleware koncepció {#middleware}

<div class="concept-section mental-model" data-filter="node medior">

📋 **Fogalom meghatározása**  
*Middleware függvények olyan láncolt request/response processzorok, amelyek hozzáférnek a request és response objektumokhoz és a next() callback-hez. Felelősségük: request preprocessing (pl. authentication, logging, body parsing), response modification, error handling, vagy a request-response ciklus befejezése. Express.js és hasonló frameworkök alapvető építőkövei.*

</div>

<div class="concept-section why-important" data-filter="node medior">

💡 **Miért számít?**
- **Modular architecture**: Keresztmetszeti funkcionalitások szeparálása
- **Reusability**: Middleware-ek újrafelhasználhatók különböző route-oknál
- **Flexibility**: Pipeline pattern rugalmas konfigurálhatósága
- **Separation of concerns**: Minden middleware egy felelősségi kört kezel

</div>

<div class="runnable-model" data-filter="node">

**Runnable mental model**
```typescript
// MIDDLEWARE COMPREHENSIVE GUIDE

// ===== 1. BASIC MIDDLEWARE CONCEPT =====
interface Request {
    method: string;
    url: string;
    headers: Record<string, string>;
    body?: any;
    user?: any;
    timestamp?: number;
}

interface Response {
    status: number;
    headers: Record<string, string>;
    body?: any;
    send: (data: any) => void;
    json: (data: any) => void;
    setHeader: (key: string, value: string) => void;
}

type NextFunction = () => void;
type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => void;

// Basic middleware implementation
function createMiddleware(handler: MiddlewareFunction): MiddlewareFunction {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            handler(req, res, next);
        } catch (error) {
            console.error('Middleware error:', error);
            res.status = 500;
            res.send('Internal Server Error');
        }
    };
}

// ===== 2. LOGGING MIDDLEWARE =====
function loggingMiddleware(req: Request, res: Response, next: NextFunction) {
    const timestamp = new Date().toISOString();
    const { method, url } = req;
    const userAgent = req.headers['user-agent'] || 'Unknown';
    
    console.log(`[${timestamp}] ${method} ${url} - ${userAgent}`);
    
    // Store timestamp for response time calculation
    req.timestamp = Date.now();
    
    // Override response send to log response
    const originalSend = res.send;
    res.send = function(data: any) {
        const responseTime = Date.now() - (req.timestamp || 0);
        console.log(`[${timestamp}] Response: ${res.status} - ${responseTime}ms`);
        return originalSend.call(this, data);
    };
    
    next(); // Continue to next middleware
}

// Advanced logging with different levels
function advancedLoggingMiddleware(level: 'debug' | 'info' | 'warn' | 'error' = 'info') {
    return (req: Request, res: Response, next: NextFunction) => {
        const timestamp = new Date().toISOString();
        const { method, url, headers } = req;
        const ip = headers['x-forwarded-for'] || 'localhost';
        
        const logData = {
            timestamp,
            method,
            url,
            ip,
            userAgent: headers['user-agent'],
            contentType: headers['content-type'],
            contentLength: headers['content-length']
        };
        
        // Log based on level
        switch (level) {
            case 'debug':
                console.log('DEBUG:', JSON.stringify(logData, null, 2));
                break;
            case 'info':
                console.log(`INFO: ${method} ${url} from ${ip}`);
                break;
            case 'warn':
                if (method === 'DELETE' || url.includes('admin')) {
                    console.warn(`WARN: Potentially sensitive operation: ${method} ${url}`);
                }
                break;
            case 'error':
                // Only log if there will be an error (checked later)
                break;
        }
        
        next();
    };
}

// ===== 3. AUTHENTICATION MIDDLEWARE =====
interface User {
    id: number;
    username: string;
    email: string;
    roles: string[];
}

function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        res.status = 401;
        res.json({ error: 'No authorization header provided' });
        return;
    }
    
    const token = authHeader.split(' ')[1]; // Bearer <token>
    
    if (!token) {
        res.status = 401;
        res.json({ error: 'No token provided' });
        return;
    }
    
    try {
        // Simulate token verification (in real app, use JWT library)
        const user = verifyToken(token);
        req.user = user;
        next();
    } catch (error) {
        res.status = 401;
        res.json({ error: 'Invalid token' });
    }
}

function verifyToken(token: string): User {
    // Simulate token verification
    if (token === 'valid-token') {
        return {
            id: 1,
            username: 'admin',
            email: 'admin@example.com',
            roles: ['admin', 'user']
        };
    }
    throw new Error('Invalid token');
}

// Role-based authorization middleware
function authorizationMiddleware(requiredRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            res.status = 401;
            res.json({ error: 'Authentication required' });
            return;
        }
        
        const userRoles = req.user.roles || [];
        const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
        
        if (!hasRequiredRole) {
            res.status = 403;
            res.json({ 
                error: 'Insufficient permissions',
                required: requiredRoles,
                userRoles 
            });
            return;
        }
        
        next();
    };
}

// ===== 4. VALIDATION MIDDLEWARE =====
interface ValidationRule {
    field: string;
    required?: boolean;
    type?: 'string' | 'number' | 'email' | 'url';
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
}

function validationMiddleware(rules: ValidationRule[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const errors: string[] = [];
        const data = { ...req.body, ...req.query };
        
        for (const rule of rules) {
            const value = data[rule.field];
            
            // Check required fields
            if (rule.required && (value === undefined || value === null || value === '')) {
                errors.push(`Field '${rule.field}' is required`);
                continue;
            }
            
            // Skip validation if field is not provided and not required
            if (value === undefined || value === null || value === '') {
                continue;
            }
            
            // Type validation
            if (rule.type) {
                switch (rule.type) {
                    case 'string':
                        if (typeof value !== 'string') {
                            errors.push(`Field '${rule.field}' must be a string`);
                        }
                        break;
                    case 'number':
                        if (typeof value !== 'number' && isNaN(Number(value))) {
                            errors.push(`Field '${rule.field}' must be a number`);
                        }
                        break;
                    case 'email':
                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailPattern.test(value)) {
                            errors.push(`Field '${rule.field}' must be a valid email`);
                        }
                        break;
                    case 'url':
                        try {
                            new URL(value);
                        } catch {
                            errors.push(`Field '${rule.field}' must be a valid URL`);
                        }
                        break;
                }
            }
            
            // Length validation
            if (rule.minLength && value.length < rule.minLength) {
                errors.push(`Field '${rule.field}' must be at least ${rule.minLength} characters`);
            }
            
            if (rule.maxLength && value.length > rule.maxLength) {
                errors.push(`Field '${rule.field}' must be at most ${rule.maxLength} characters`);
            }
            
            // Pattern validation
            if (rule.pattern && !rule.pattern.test(value)) {
                errors.push(`Field '${rule.field}' format is invalid`);
            }
        }
        
        if (errors.length > 0) {
            res.status = 400;
            res.json({ 
                error: 'Validation failed',
                details: errors 
            });
            return;
        }
        
        next();
    };
}

// ===== 5. RATE LIMITING MIDDLEWARE =====
interface RateLimitEntry {
    count: number;
    resetTime: number;
}

class RateLimiter {
    private requests = new Map<string, RateLimitEntry>();
    
    constructor(
        private maxRequests: number = 100,
        private windowMs: number = 15 * 60 * 1000 // 15 minutes
    ) {}
    
    isAllowed(identifier: string): boolean {
        const now = Date.now();
        const entry = this.requests.get(identifier);
        
        if (!entry || now > entry.resetTime) {
            // New window or expired entry
            this.requests.set(identifier, {
                count: 1,
                resetTime: now + this.windowMs
            });
            return true;
        }
        
        if (entry.count >= this.maxRequests) {
            return false;
        }
        
        entry.count++;
        return true;
    }
    
    getRemainingTime(identifier: string): number {
        const entry = this.requests.get(identifier);
        if (!entry) return 0;
        
        const now = Date.now();
        return Math.max(0, entry.resetTime - now);
    }
}

function rateLimitMiddleware(maxRequests: number = 100, windowMs: number = 15 * 60 * 1000) {
    const limiter = new RateLimiter(maxRequests, windowMs);
    
    return (req: Request, res: Response, next: NextFunction) => {
        const identifier = req.headers['x-forwarded-for'] || 'localhost';
        
        if (!limiter.isAllowed(identifier.toString())) {
            const remainingTime = limiter.getRemainingTime(identifier.toString());
            
            res.status = 429;
            res.setHeader('Retry-After', Math.ceil(remainingTime / 1000).toString());
            res.json({
                error: 'Too many requests',
                message: `Rate limit exceeded. Try again in ${Math.ceil(remainingTime / 1000)} seconds.`,
                limit: maxRequests,
                window: windowMs
            });
            return;
        }
        
        next();
    };
}

// ===== 6. CORS MIDDLEWARE =====
interface CorsOptions {
    origin?: string | string[] | boolean;
    methods?: string[];
    allowedHeaders?: string[];
    credentials?: boolean;
    maxAge?: number;
}

function corsMiddleware(options: CorsOptions = {}) {
    const {
        origin = '*',
        methods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders = ['Content-Type', 'Authorization'],
        credentials = false,
        maxAge = 86400 // 24 hours
    } = options;
    
    return (req: Request, res: Response, next: NextFunction) => {
        // Handle origin
        if (typeof origin === 'string') {
            res.setHeader('Access-Control-Allow-Origin', origin);
        } else if (Array.isArray(origin)) {
            const requestOrigin = req.headers['origin'];
            if (requestOrigin && origin.includes(requestOrigin)) {
                res.setHeader('Access-Control-Allow-Origin', requestOrigin);
            }
        } else if (origin === true) {
            res.setHeader('Access-Control-Allow-Origin', req.headers['origin'] || '*');
        }
        
        // Set other CORS headers
        res.setHeader('Access-Control-Allow-Methods', methods.join(', '));
        res.setHeader('Access-Control-Allow-Headers', allowedHeaders.join(', '));
        res.setHeader('Access-Control-Max-Age', maxAge.toString());
        
        if (credentials) {
            res.setHeader('Access-Control-Allow-Credentials', 'true');
        }
        
        // Handle preflight requests
        if (req.method === 'OPTIONS') {
            res.status = 200;
            res.send('');
            return;
        }
        
        next();
    };
}

// ===== 7. ERROR HANDLING MIDDLEWARE =====
function errorHandlingMiddleware(
    error: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
) {
    console.error('Error occurred:', error);
    
    // Log error details
    const errorLog = {
        message: error.message,
        stack: error.stack,
        url: req.url,
        method: req.method,
        timestamp: new Date().toISOString(),
        userAgent: req.headers['user-agent']
    };
    
    console.error('Error details:', JSON.stringify(errorLog, null, 2));
    
    // Don't leak error details in production
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    res.status = 500;
    res.json({
        error: 'Internal Server Error',
        message: isDevelopment ? error.message : 'Something went wrong',
        ...(isDevelopment && { stack: error.stack })
    });
}

// ===== 8. MIDDLEWARE PIPELINE =====
class MiddlewarePipeline {
    private middlewares: MiddlewareFunction[] = [];
    
    use(middleware: MiddlewareFunction) {
        this.middlewares.push(middleware);
        return this;
    }
    
    async execute(req: Request, res: Response) {
        let index = 0;
        
        const next = () => {
            if (index >= this.middlewares.length) {
                return; // End of pipeline
            }
            
            const middleware = this.middlewares[index++];
            middleware(req, res, next);
        };
        
        next();
    }
}

// ===== 9. PRACTICAL USAGE EXAMPLE =====
function createApiServer() {
    const pipeline = new MiddlewarePipeline();
    
    // Global middlewares
    pipeline
        .use(corsMiddleware({ 
            origin: ['http://localhost:3000', 'https://myapp.com'],
            credentials: true 
        }))
        .use(loggingMiddleware)
        .use(rateLimitMiddleware(1000, 60 * 1000)) // 1000 requests per minute
        .use(authenticationMiddleware);
    
    // Route-specific middleware
    const adminPipeline = new MiddlewarePipeline();
    adminPipeline
        .use(...pipeline.middlewares) // Inherit global middlewares
        .use(authorizationMiddleware(['admin']))
        .use(validationMiddleware([
            { field: 'action', required: true, type: 'string' },
            { field: 'target', required: true, type: 'string' }
        ]));
    
    // API endpoints
    const routes = {
        'GET /api/users': pipeline,
        'POST /api/users': new MiddlewarePipeline()
            .use(corsMiddleware())
            .use(loggingMiddleware)
            .use(validationMiddleware([
                { field: 'username', required: true, type: 'string', minLength: 3 },
                { field: 'email', required: true, type: 'email' },
                { field: 'password', required: true, type: 'string', minLength: 8 }
            ])),
        'DELETE /api/admin/users/:id': adminPipeline
    };
    
    return { pipeline, routes };
}

// ===== 10. CUSTOM MIDDLEWARE EXAMPLES =====

// Cache middleware
function cacheMiddleware(ttlSeconds: number = 300) {
    const cache = new Map<string, { data: any; expires: number }>();
    
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.method !== 'GET') {
            next();
            return;
        }
        
        const cacheKey = `${req.method}:${req.url}`;
        const cached = cache.get(cacheKey);
        
        if (cached && Date.now() < cached.expires) {
            res.setHeader('X-Cache', 'HIT');
            res.json(cached.data);
            return;
        }
        
        // Override response to cache the result
        const originalJson = res.json;
        res.json = function(data: any) {
            cache.set(cacheKey, {
                data,
                expires: Date.now() + (ttlSeconds * 1000)
            });
            res.setHeader('X-Cache', 'MISS');
            return originalJson.call(this, data);
        };
        
        next();
    };
}

// Request timeout middleware
function timeoutMiddleware(timeoutMs: number = 30000) {
    return (req: Request, res: Response, next: NextFunction) => {
        const timeout = setTimeout(() => {
            if (!res.headersSent) {
                res.status = 408;
                res.json({ error: 'Request timeout' });
            }
        }, timeoutMs);
        
        const cleanup = () => clearTimeout(timeout);
        
        res.on('finish', cleanup);
        res.on('close', cleanup);
        
        next();
    };
}

// Request ID middleware
function requestIdMiddleware(req: Request, res: Response, next: NextFunction) {
    const requestId = req.headers['x-request-id'] || 
                     `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    req.headers['x-request-id'] = requestId.toString();
    res.setHeader('X-Request-ID', requestId.toString());
    
    next();
}

console.log('Middleware examples loaded');
```

*Figyeld meg: Middleware = request/response processing pipeline, next() = folytatás a következő middleware-re.*

</div>

<div class="concept-section myths" data-filter="node">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Middleware csak Express.js-ben van." → Middleware pattern bármilyen Node.js alkalmazásban implementálható
- „next() nélkül is folytatódik a pipeline." → next() nélkül megáll a middleware chain
- „Middleware sorrendje mindegy." → A sorrend kritikus, pl. auth middleware validation előtt legyen

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="node">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Middleware alapszerkezet:**
```js
function myMiddleware(req, res, next) {
    // Do something with request
    console.log('Processing request...');
    
    // Continue to next middleware
    next();
}
```

**Error handling middleware:**
```js
function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).json({ error: 'Something broke!' });
}
```

**Conditional middleware:**
```js
function conditionalMiddleware(condition) {
    return (req, res, next) => {
        if (condition(req)) {
            // Do something
        }
        next();
    };
}
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="node medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mi történik, ha egy middleware nem hívja meg a next() függvényt?**
A: A request "lefagy", nem folytatódik a middleware chain, és a response sosem érkezik meg.

**Q: Hogyan implementálnál rate limiting middleware-t?**
A: Map/Redis-ben tárolnám IP-nként a request count-ot és timestamp-et, ablakos algoritmussal.

**Q: Miben különbözik az error handling middleware a normál middleware-től?**
A: Error middleware 4 paramétert vár (err, req, res, next), és csak akkor hívódik meg, ha hiba történt.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="node">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Express.js** → Built-in middleware support
- **Pipeline Pattern** → Chain of responsibility design
- **Authentication/Authorization** → Security middleware layers
- **Logging** → Request/response monitoring
- **Performance** → Caching, rate limiting

</div>

</details>

</div>

### Error handling strategies {#error-handling-strategies}

<div class="concept-section mental-model" data-filter="node medior">

📋 **Fogalom meghatározása**  
*Error handling strategies olyan tervezési minták és technikák, amelyek alkalmazáshibák kezelésére szolgálnak: try-catch blokkok szinkron hibákra, Promise rejection handling (.catch, Promise.catch), async/await error handling, centralized error middleware, error classification (operational vs programmer errors), structured logging, graceful degradation és circuit breaker pattern.*

</div>

<div class="concept-section why-important" data-filter="node medior">

💡 **Miért számít?**
- **Application stability**: Graceful degradation hibák esetén
- **User experience**: Meaningful error messages instead of crashes
- **Debugging**: Structured error information for developers
- **Monitoring**: Proactive issue detection and alerting

</div>

<div class="runnable-model" data-filter="node">

**Runnable mental model**
```typescript
// ERROR HANDLING STRATEGIES COMPREHENSIVE GUIDE

// ===== 1. ERROR TYPES AND HIERARCHY =====

// Base error class
abstract class AppError extends Error {
    abstract readonly statusCode: number;
    abstract readonly isOperational: boolean;
    abstract readonly errorType: string;

    constructor(
        message: string,
        public readonly context?: Record<string, any>
    ) {
        super(message);
        this.name = this.constructor.name;
        
        // Maintain proper stack trace
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    toJSON() {
        return {
            name: this.name,
            message: this.message,
            statusCode: this.statusCode,
            errorType: this.errorType,
            context: this.context,
            stack: this.stack
        };
    }
}

// Operational errors (expected, recoverable)
class ValidationError extends AppError {
    readonly statusCode = 400;
    readonly isOperational = true;
    readonly errorType = 'VALIDATION_ERROR';

    constructor(
        message: string,
        public readonly field?: string,
        context?: Record<string, any>
    ) {
        super(message, { field, ...context });
    }
}

class AuthenticationError extends AppError {
    readonly statusCode = 401;
    readonly isOperational = true;
    readonly errorType = 'AUTHENTICATION_ERROR';
}

class AuthorizationError extends AppError {
    readonly statusCode = 403;
    readonly isOperational = true;
    readonly errorType = 'AUTHORIZATION_ERROR';
}

class NotFoundError extends AppError {
    readonly statusCode = 404;
    readonly isOperational = true;
    readonly errorType = 'NOT_FOUND_ERROR';

    constructor(resource: string, identifier?: string | number) {
        const message = identifier 
            ? `${resource} with ID ${identifier} not found`
            : `${resource} not found`;
        super(message, { resource, identifier });
    }
}

class ConflictError extends AppError {
    readonly statusCode = 409;
    readonly isOperational = true;
    readonly errorType = 'CONFLICT_ERROR';
}

class RateLimitError extends AppError {
    readonly statusCode = 429;
    readonly isOperational = true;
    readonly errorType = 'RATE_LIMIT_ERROR';

    constructor(
        message: string = 'Too many requests',
        public readonly retryAfter?: number
    ) {
        super(message, { retryAfter });
    }
}

// System errors (unexpected, non-recoverable)
class DatabaseError extends AppError {
    readonly statusCode = 500;
    readonly isOperational = true; // Can be retried
    readonly errorType = 'DATABASE_ERROR';
}

class ExternalServiceError extends AppError {
    readonly statusCode = 502;
    readonly isOperational = true; // Can be retried
    readonly errorType = 'EXTERNAL_SERVICE_ERROR';

    constructor(
        message: string,
        public readonly service: string,
        public readonly originalError?: Error
    ) {
        super(message, { service, originalError: originalError?.message });
    }
}

class ConfigurationError extends AppError {
    readonly statusCode = 500;
    readonly isOperational = false; // Cannot be recovered
    readonly errorType = 'CONFIGURATION_ERROR';
}

class SystemError extends AppError {
    readonly statusCode = 500;
    readonly isOperational = false;
    readonly errorType = 'SYSTEM_ERROR';
}

// ===== 2. ERROR RESULT PATTERN =====

type Result<T, E = AppError> = {
    success: true;
    data: T;
} | {
    success: false;
    error: E;
};

class ResultUtils {
    static ok<T>(data: T): Result<T, never> {
        return { success: true, data };
    }

    static err<E extends AppError>(error: E): Result<never, E> {
        return { success: false, error };
    }

    static fromPromise<T>(promise: Promise<T>): Promise<Result<T, AppError>> {
        return promise
            .then(data => ResultUtils.ok(data))
            .catch(error => ResultUtils.err(
                error instanceof AppError ? error : new SystemError(error.message)
            ));
    }

    static async tryAsync<T>(fn: () => Promise<T>): Promise<Result<T, AppError>> {
        try {
            const data = await fn();
            return ResultUtils.ok(data);
        } catch (error) {
            return ResultUtils.err(
                error instanceof AppError ? error : new SystemError(error.message)
            );
        }
    }

    static try<T>(fn: () => T): Result<T, AppError> {
        try {
            const data = fn();
            return ResultUtils.ok(data);
        } catch (error) {
            return ResultUtils.err(
                error instanceof AppError ? error : new SystemError(error.message)
            );
        }
    }
}

// ===== 3. ASYNC ERROR HANDLING PATTERNS =====

// Service layer with proper error handling
class UserService {
    private users: Array<{ id: number; email: string; name: string }> = [];
    private nextId = 1;

    async createUser(userData: { email: string; name: string }): Promise<Result<{ id: number; email: string; name: string }, ValidationError | ConflictError | DatabaseError>> {
        // Validation
        if (!userData.email || !userData.email.includes('@')) {
            return ResultUtils.err(new ValidationError('Invalid email format', 'email'));
        }

        if (!userData.name || userData.name.trim().length === 0) {
            return ResultUtils.err(new ValidationError('Name is required', 'name'));
        }

        // Check for conflicts
        const existingUser = this.users.find(user => user.email === userData.email);
        if (existingUser) {
            return ResultUtils.err(new ConflictError('User with this email already exists'));
        }

        // Simulate database operation that might fail
        const dbResult = await this.simulateDatabaseOperation(() => {
            const newUser = {
                id: this.nextId++,
                email: userData.email,
                name: userData.name.trim()
            };
            this.users.push(newUser);
            return newUser;
        });

        if (!dbResult.success) {
            return ResultUtils.err(new DatabaseError('Failed to create user in database'));
        }

        return ResultUtils.ok(dbResult.data);
    }

    async getUserById(id: number): Promise<Result<{ id: number; email: string; name: string }, NotFoundError | DatabaseError>> {
        // Simulate database operation
        const dbResult = await this.simulateDatabaseOperation(() => {
            return this.users.find(user => user.id === id);
        });

        if (!dbResult.success) {
            return ResultUtils.err(new DatabaseError('Database query failed'));
        }

        if (!dbResult.data) {
            return ResultUtils.err(new NotFoundError('User', id));
        }

        return ResultUtils.ok(dbResult.data);
    }

    async updateUser(id: number, updates: Partial<{ email: string; name: string }>): Promise<Result<{ id: number; email: string; name: string }, NotFoundError | ValidationError | ConflictError | DatabaseError>> {
        // Validation
        if (updates.email && !updates.email.includes('@')) {
            return ResultUtils.err(new ValidationError('Invalid email format', 'email'));
        }

        if (updates.name !== undefined && updates.name.trim().length === 0) {
            return ResultUtils.err(new ValidationError('Name cannot be empty', 'name'));
        }

        // Check if user exists
        const userResult = await this.getUserById(id);
        if (!userResult.success) {
            return userResult; // Pass through the error
        }

        const user = userResult.data;

        // Check for email conflicts
        if (updates.email && updates.email !== user.email) {
            const existingUser = this.users.find(u => u.email === updates.email);
            if (existingUser) {
                return ResultUtils.err(new ConflictError('User with this email already exists'));
            }
        }

        // Update user
        const dbResult = await this.simulateDatabaseOperation(() => {
            const userIndex = this.users.findIndex(u => u.id === id);
            if (userIndex !== -1) {
                this.users[userIndex] = { ...this.users[userIndex], ...updates };
                return this.users[userIndex];
            }
            return null;
        });

        if (!dbResult.success) {
            return ResultUtils.err(new DatabaseError('Failed to update user'));
        }

        return ResultUtils.ok(dbResult.data!);
    }

    async deleteUser(id: number): Promise<Result<void, NotFoundError | DatabaseError>> {
        const dbResult = await this.simulateDatabaseOperation(() => {
            const userIndex = this.users.findIndex(user => user.id === id);
            if (userIndex === -1) {
                return false;
            }
            this.users.splice(userIndex, 1);
            return true;
        });

        if (!dbResult.success) {
            return ResultUtils.err(new DatabaseError('Failed to delete user'));
        }

        if (!dbResult.data) {
            return ResultUtils.err(new NotFoundError('User', id));
        }

        return ResultUtils.ok(undefined);
    }

    private async simulateDatabaseOperation<T>(operation: () => T): Promise<Result<T, never>> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 100));

        // Simulate random database failures (10% chance)
        if (Math.random() < 0.1) {
            return ResultUtils.err(new DatabaseError('Simulated database connection error'));
        }

        try {
            const result = operation();
            return ResultUtils.ok(result);
        } catch (error) {
            return ResultUtils.err(new DatabaseError(`Database operation failed: ${error.message}`));
        }
    }
}

// ===== 4. EXPRESS.JS ERROR HANDLING =====

import express from 'express';

const app = express();
app.use(express.json());

// Request context middleware
interface RequestContext {
    requestId: string;
    userId?: number;
    startTime: number;
}

declare global {
    namespace Express {
        interface Request {
            context: RequestContext;
        }
    }
}

app.use((req, res, next) => {
    req.context = {
        requestId: `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        startTime: Date.now()
    };
    next();
});

// Authentication middleware
app.use((req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        // Simulate token validation
        req.context.userId = 1; // Mock user ID
    }
    next();
});

// Service instances
const userService = new UserService();

// ===== 5. CONTROLLER LAYER WITH ERROR HANDLING =====

class UserController {
    async createUser(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const { email, name } = req.body;

            const result = await userService.createUser({ email, name });

            if (!result.success) {
                return next(result.error);
            }

            res.status(201).json({
                success: true,
                data: result.data,
                meta: {
                    requestId: req.context.requestId,
                    timestamp: new Date().toISOString()
                }
            });
        } catch (error) {
            next(new SystemError('Unexpected error in createUser controller'));
        }
    }

    async getUser(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const userId = parseInt(req.params.id, 10);

            if (isNaN(userId)) {
                return next(new ValidationError('Invalid user ID format', 'id'));
            }

            const result = await userService.getUserById(userId);

            if (!result.success) {
                return next(result.error);
            }

            res.json({
                success: true,
                data: result.data,
                meta: {
                    requestId: req.context.requestId,
                    timestamp: new Date().toISOString()
                }
            });
        } catch (error) {
            next(new SystemError('Unexpected error in getUser controller'));
        }
    }

    async updateUser(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const userId = parseInt(req.params.id, 10);
            
            if (isNaN(userId)) {
                return next(new ValidationError('Invalid user ID format', 'id'));
            }

            const { email, name } = req.body;
            const updates: Partial<{ email: string; name: string }> = {};
            
            if (email !== undefined) updates.email = email;
            if (name !== undefined) updates.name = name;

            if (Object.keys(updates).length === 0) {
                return next(new ValidationError('No valid update fields provided'));
            }

            const result = await userService.updateUser(userId, updates);

            if (!result.success) {
                return next(result.error);
            }

            res.json({
                success: true,
                data: result.data,
                meta: {
                    requestId: req.context.requestId,
                    timestamp: new Date().toISOString()
                }
            });
        } catch (error) {
            next(new SystemError('Unexpected error in updateUser controller'));
        }
    }

    async deleteUser(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const userId = parseInt(req.params.id, 10);

            if (isNaN(userId)) {
                return next(new ValidationError('Invalid user ID format', 'id'));
            }

            const result = await userService.deleteUser(userId);

            if (!result.success) {
                return next(result.error);
            }

            res.status(204).send();
        } catch (error) {
            next(new SystemError('Unexpected error in deleteUser controller'));
        }
    }
}

// ===== 6. GLOBAL ERROR HANDLER =====

interface ErrorResponse {
    success: false;
    error: {
        type: string;
        message: string;
        statusCode: number;
        requestId: string;
        timestamp: string;
        stack?: string;
    };
    context?: Record<string, any>;
}

function globalErrorHandler(
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    // Log error
    console.error('Error occurred:', {
        error: err.message,
        stack: err.stack,
        requestId: req.context?.requestId,
        method: req.method,
        url: req.url,
        userAgent: req.get('User-Agent'),
        ip: req.ip
    });

    // Handle operational errors
    if (err instanceof AppError) {
        const errorResponse: ErrorResponse = {
            success: false,
            error: {
                type: err.errorType,
                message: err.message,
                statusCode: err.statusCode,
                requestId: req.context?.requestId || 'unknown',
                timestamp: new Date().toISOString()
            }
        };

        // Include context for debugging (only in development)
        if (process.env.NODE_ENV === 'development' && err.context) {
            errorResponse.context = err.context;
        }

        // Include stack trace in development
        if (process.env.NODE_ENV === 'development') {
            errorResponse.error.stack = err.stack;
        }

        return res.status(err.statusCode).json(errorResponse);
    }

    // Handle unexpected errors
    const errorResponse: ErrorResponse = {
        success: false,
        error: {
            type: 'INTERNAL_SERVER_ERROR',
            message: process.env.NODE_ENV === 'production' 
                ? 'An unexpected error occurred' 
                : err.message,
            statusCode: 500,
            requestId: req.context?.requestId || 'unknown',
            timestamp: new Date().toISOString()
        }
    };

    if (process.env.NODE_ENV === 'development') {
        errorResponse.error.stack = err.stack;
    }

    res.status(500).json(errorResponse);
}

// ===== 7. ASYNC ERROR WRAPPER =====

function asyncHandler<T extends express.RequestHandler>(fn: T): T {
    return ((req: express.Request, res: express.Response, next: express.NextFunction) => {
        const result = fn(req, res, next);
        if (result instanceof Promise) {
            result.catch(next);
        }
        return result;
    }) as T;
}

// ===== 8. ROUTES WITH ERROR HANDLING =====

const userController = new UserController();

app.post('/api/users', asyncHandler(userController.createUser.bind(userController)));
app.get('/api/users/:id', asyncHandler(userController.getUser.bind(userController)));
app.put('/api/users/:id', asyncHandler(userController.updateUser.bind(userController)));
app.delete('/api/users/:id', asyncHandler(userController.deleteUser.bind(userController)));

// 404 handler
app.use('*', (req, res, next) => {
    next(new NotFoundError('Route', req.originalUrl));
});

// Global error handler (must be last)
app.use(globalErrorHandler);

// ===== 9. CIRCUIT BREAKER PATTERN =====

enum CircuitState {
    CLOSED = 'CLOSED',
    OPEN = 'OPEN',
    HALF_OPEN = 'HALF_OPEN'
}

class CircuitBreaker {
    private state = CircuitState.CLOSED;
    private failureCount = 0;
    private lastFailureTime = 0;
    private successCount = 0;

    constructor(
        private failureThreshold: number = 5,
        private timeoutDuration: number = 60000, // 1 minute
        private monitoringPeriod: number = 10000 // 10 seconds
    ) {}

    async execute<T>(operation: () => Promise<T>): Promise<T> {
        if (this.state === CircuitState.OPEN) {
            if (Date.now() - this.lastFailureTime < this.timeoutDuration) {
                throw new ExternalServiceError('Circuit breaker is OPEN', 'external-service');
            } else {
                this.state = CircuitState.HALF_OPEN;
                this.successCount = 0;
            }
        }

        try {
            const result = await operation();
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }

    private onSuccess(): void {
        this.failureCount = 0;
        
        if (this.state === CircuitState.HALF_OPEN) {
            this.successCount++;
            if (this.successCount >= 3) { // Require 3 successes to close
                this.state = CircuitState.CLOSED;
            }
        }
    }

    private onFailure(): void {
        this.failureCount++;
        this.lastFailureTime = Date.now();

        if (this.failureCount >= this.failureThreshold) {
            this.state = CircuitState.OPEN;
        }
    }

    getState(): CircuitState {
        return this.state;
    }

    getStats() {
        return {
            state: this.state,
            failureCount: this.failureCount,
            successCount: this.successCount,
            lastFailureTime: this.lastFailureTime
        };
    }
}

// ===== 10. RETRY STRATEGIES =====

interface RetryOptions {
    maxRetries: number;
    delayMs: number;
    backoffMultiplier?: number;
    maxDelayMs?: number;
    retryableErrors?: (error: Error) => boolean;
}

class RetryManager {
    static async withRetry<T>(
        operation: () => Promise<T>,
        options: RetryOptions
    ): Promise<T> {
        const {
            maxRetries,
            delayMs,
            backoffMultiplier = 2,
            maxDelayMs = 30000,
            retryableErrors = () => true
        } = options;

        let lastError: Error;
        let currentDelay = delayMs;

        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                return await operation();
            } catch (error) {
                lastError = error;

                // Don't retry if this is the last attempt
                if (attempt === maxRetries) {
                    break;
                }

                // Don't retry if error is not retryable
                if (!retryableErrors(error)) {
                    throw error;
                }

                // Wait before retry
                await new Promise(resolve => setTimeout(resolve, currentDelay));
                
                // Increase delay for next attempt
                currentDelay = Math.min(currentDelay * backoffMultiplier, maxDelayMs);
            }
        }

        throw lastError;
    }

    static exponentialBackoff(baseDelay: number, attempt: number, maxDelay: number = 30000): number {
        const delay = baseDelay * Math.pow(2, attempt);
        return Math.min(delay, maxDelay);
    }

    static jitteredBackoff(baseDelay: number, attempt: number): number {
        const delay = baseDelay * Math.pow(2, attempt);
        const jitter = Math.random() * 0.1 * delay; // 10% jitter
        return delay + jitter;
    }
}

// ===== 11. PRACTICAL USAGE EXAMPLES =====

// Service with circuit breaker and retry
class ExternalApiService {
    private circuitBreaker = new CircuitBreaker();

    async fetchUserData(userId: number): Promise<any> {
        return this.circuitBreaker.execute(async () => {
            return RetryManager.withRetry(
                async () => {
                    // Simulate external API call
                    const response = await fetch(`https://api.example.com/users/${userId}`);
                    
                    if (!response.ok) {
                        throw new ExternalServiceError(
                            `API responded with status ${response.status}`,
                            'external-api'
                        );
                    }
                    
                    return response.json();
                },
                {
                    maxRetries: 3,
                    delayMs: 1000,
                    retryableErrors: (error) => {
                        // Retry on network errors or 5xx responses
                        return error instanceof ExternalServiceError ||
                               error.message.includes('fetch');
                    }
                }
            );
        });
    }
}

// Example usage in controller
class ExternalDataController {
    private externalApiService = new ExternalApiService();

    async getUserData(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const userId = parseInt(req.params.id, 10);
            
            if (isNaN(userId)) {
                return next(new ValidationError('Invalid user ID', 'id'));
            }

            const userData = await this.externalApiService.fetchUserData(userId);

            res.json({
                success: true,
                data: userData,
                meta: {
                    requestId: req.context.requestId,
                    timestamp: new Date().toISOString()
                }
            });
        } catch (error) {
            if (error instanceof ExternalServiceError) {
                return next(error);
            }
            next(new SystemError('Failed to fetch user data'));
        }
    }
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🛡️  Error handling configured`);
});

console.log('Error handling strategies examples loaded');

### Logging & monitoring {#logging-monitoring}

<div class="concept-section mental-model" data-filter="node medior">

📋 **Fogalom meghatározása**  
*Logging az alkalmazási események struktúrált rögzítése különböző szinteken (debug, info, warn, error, fatal), timestamp-ekkel, context információval és metadata-val. Monitoring az alkalmazás állapotának valós idejű figyelmése metrikákkal (CPU, memória, response time), health check-ekkel, alert-ekkel és dashboard-okkal. Lehetővé teszi proaktív problémakézelést és teljesítény optimalizálást.*

</div>

<div class="concept-section why-important" data-filter="node medior">

💡 **Miért számít?**
- **Debugging**: Hibák gyors azonosítása és megoldása production-ban
- **Performance tracking**: Bottleneck-ek és optimalizációs lehetőségek
- **Business insights**: User behavior és usage patterns elemzése
- **Proactive maintenance**: Problémák észlelése mielőtt kritikussá válnának

</div>

<div class="runnable-model" data-filter="node">

**Runnable mental model**
```typescript
// LOGGING & MONITORING COMPREHENSIVE GUIDE

// ===== 1. WINSTON LOGGER SETUP =====
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// Custom log levels
const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5
  },
  colors: {
    fatal: 'red',
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue',
    trace: 'gray'
  }
};

// Production logger configuration
const productionLogger = winston.createLogger({
  levels: customLevels.levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: 'my-app',
    version: process.env.APP_VERSION || '1.0.0'
  },
  transports: [
    // Error logs - separate file
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxSize: '20m',
      maxFiles: '14d',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    }),
    
    // All logs
    new DailyRotateFile({
      filename: 'logs/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '7d'
    }),
    
    // Console output for Docker/K8s
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// Development logger
const developmentLogger = winston.createLogger({
  levels: customLevels.levels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`;
    })
  ),
  transports: [
    new winston.transports.Console({ level: 'trace' })
  ]
});

// Logger factory
const logger = process.env.NODE_ENV === 'production' ? productionLogger : developmentLogger;

wiston.addColors(customLevels.colors);

// ===== 2. STRUCTURED LOGGING =====
interface LogContext {
  requestId?: string;
  userId?: number;
  operation?: string;
  duration?: number;
  [key: string]: any;
}

class Logger {
  private winston: winston.Logger;
  
  constructor(winston: winston.Logger) {
    this.winston = winston;
  }
  
  fatal(message: string, context?: LogContext): void {
    this.winston.log('fatal', message, context);
  }
  
  error(message: string, error?: Error, context?: LogContext): void {
    this.winston.error(message, {
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : undefined,
      ...context
    });
  }
  
  warn(message: string, context?: LogContext): void {
    this.winston.warn(message, context);
  }
  
  info(message: string, context?: LogContext): void {
    this.winston.info(message, context);
  }
  
  debug(message: string, context?: LogContext): void {
    this.winston.debug(message, context);
  }
  
  trace(message: string, context?: LogContext): void {
    this.winston.log('trace', message, context);
  }
  
  // Request logging
  request(req: express.Request, res: express.Response, duration: number): void {
    this.info('HTTP Request', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
      requestId: req.context?.requestId
    });
  }
  
  // Performance logging
  performance(operation: string, duration: number, context?: LogContext): void {
    const level = duration > 1000 ? 'warn' : 'info';
    this.winston.log(level, `Performance: ${operation}`, {
      operation,
      duration,
      ...context
    });
  }
  
  // Business event logging
  event(event: string, context?: LogContext): void {
    this.info(`Event: ${event}`, {
      event,
      ...context
    });
  }
}

const appLogger = new Logger(logger);

// ===== 3. PERFORMANCE MONITORING =====
class PerformanceMonitor {
  private static timers = new Map<string, number>();
  
  static startTimer(operation: string): string {
    const timerId = `${operation}-${Date.now()}-${Math.random()}`;
    this.timers.set(timerId, performance.now());
    return timerId;
  }
  
  static endTimer(timerId: string, context?: LogContext): number {
    const startTime = this.timers.get(timerId);
    if (!startTime) {
      appLogger.warn('Timer not found', { timerId });
      return 0;
    }
    
    const duration = performance.now() - startTime;
    this.timers.delete(timerId);
    
    appLogger.performance(timerId.split('-')[0], duration, context);
    return duration;
  }
  
  static async measureAsync<T>(
    operation: string,
    fn: () => Promise<T>,
    context?: LogContext
  ): Promise<T> {
    const timerId = this.startTimer(operation);
    try {
      const result = await fn();
      this.endTimer(timerId, { ...context, success: true });
      return result;
    } catch (error) {
      this.endTimer(timerId, { ...context, success: false, error: error.message });
      throw error;
    }
  }
  
  static measure<T>(
    operation: string,
    fn: () => T,
    context?: LogContext
  ): T {
    const timerId = this.startTimer(operation);
    try {
      const result = fn();
      this.endTimer(timerId, { ...context, success: true });
      return result;
    } catch (error) {
      this.endTimer(timerId, { ...context, success: false, error: error.message });
      throw error;
    }
  }
}

// ===== 4. METRICS COLLECTION =====
class MetricsCollector {
  private metrics = new Map<string, any>();
  private counters = new Map<string, number>();
  private histograms = new Map<string, number[]>();
  
  // Counter metrics
  incrementCounter(name: string, value: number = 1, tags?: Record<string, string>): void {
    const key = this.createKey(name, tags);
    const current = this.counters.get(key) || 0;
    this.counters.set(key, current + value);
  }
  
  // Histogram metrics
  recordValue(name: string, value: number, tags?: Record<string, string>): void {
    const key = this.createKey(name, tags);
    const values = this.histograms.get(key) || [];
    values.push(value);
    this.histograms.set(key, values);
  }
  
  // Gauge metrics
  setGauge(name: string, value: number, tags?: Record<string, string>): void {
    const key = this.createKey(name, tags);
    this.metrics.set(key, {
      type: 'gauge',
      value,
      timestamp: Date.now(),
      tags
    });
  }
  
  private createKey(name: string, tags?: Record<string, string>): string {
    if (!tags) return name;
    const tagString = Object.entries(tags)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}:${v}`)
      .join(',');
    return `${name}{${tagString}}`;
  }
  
  // Get metrics summary
  getMetrics(): any {
    const result: any = {
      counters: Object.fromEntries(this.counters),
      gauges: Object.fromEntries(this.metrics),
      histograms: {}
    };
    
    // Calculate histogram statistics
    for (const [key, values] of this.histograms) {
      if (values.length > 0) {
        const sorted = values.sort((a, b) => a - b);
        result.histograms[key] = {
          count: values.length,
          sum: values.reduce((a, b) => a + b, 0),
          min: sorted[0],
          max: sorted[sorted.length - 1],
          median: sorted[Math.floor(sorted.length / 2)],
          p95: sorted[Math.floor(sorted.length * 0.95)],
          p99: sorted[Math.floor(sorted.length * 0.99)]
        };
      }
    }
    
    return result;
  }
  
  // Reset metrics
  reset(): void {
    this.metrics.clear();
    this.counters.clear();
    this.histograms.clear();
  }
}

const metrics = new MetricsCollector();

// ===== 5. EXPRESS MIDDLEWARE FOR LOGGING =====
function requestLoggingMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const startTime = Date.now();
  
  // Log incoming request
  appLogger.info('Incoming request', {
    method: req.method,
    url: req.url,
    userAgent: req.get('User-Agent'),
    ip: req.ip,
    requestId: req.context?.requestId
  });
  
  // Intercept response to log completion
  const originalSend = res.send;
  res.send = function(data: any) {
    const duration = Date.now() - startTime;
    
    // Log request completion
    appLogger.request(req, res, duration);
    
    // Record metrics
    metrics.incrementCounter('http_requests_total', 1, {
      method: req.method,
      status: res.statusCode.toString(),
      route: req.route?.path || 'unknown'
    });
    
    metrics.recordValue('http_request_duration_ms', duration, {
      method: req.method,
      route: req.route?.path || 'unknown'
    });
    
    return originalSend.call(this, data);
  };
  
  next();
}

// ===== 6. HEALTH CHECK AND MONITORING ENDPOINTS =====
interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: string;
  uptime: number;
  version: string;
  checks: Record<string, {
    status: 'pass' | 'fail' | 'warn';
    time: string;
    output?: string;
  }>;
}

class HealthChecker {
  private checks = new Map<string, () => Promise<{ status: 'pass' | 'fail' | 'warn'; output?: string }>>>();
  
  addCheck(name: string, checkFn: () => Promise<{ status: 'pass' | 'fail' | 'warn'; output?: string }>): void {
    this.checks.set(name, checkFn);
  }
  
  async runChecks(): Promise<HealthStatus> {
    const startTime = Date.now();
    const checks: HealthStatus['checks'] = {};
    let overallStatus: 'healthy' | 'unhealthy' | 'degraded' = 'healthy';
    
    for (const [name, checkFn] of this.checks) {
      try {
        const result = await Promise.race([
          checkFn(),
          new Promise<{ status: 'fail'; output: string }>((_, reject) => 
            setTimeout(() => reject(new Error('Health check timeout')), 5000)
          )
        ]);
        
        checks[name] = {
          status: result.status,
          time: (Date.now() - startTime).toString() + 'ms',
          output: result.output
        };
        
        if (result.status === 'fail') {
          overallStatus = 'unhealthy';
        } else if (result.status === 'warn' && overallStatus === 'healthy') {
          overallStatus = 'degraded';
        }
      } catch (error) {
        checks[name] = {
          status: 'fail',
          time: (Date.now() - startTime).toString() + 'ms',
          output: error.message
        };
        overallStatus = 'unhealthy';
      }
    }
    
    return {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.APP_VERSION || '1.0.0',
      checks
    };
  }
}

const healthChecker = new HealthChecker();

// Add health checks
healthChecker.addCheck('database', async () => {
  // Simulate database check
  await new Promise(resolve => setTimeout(resolve, 100));
  return { status: 'pass', output: 'Database connection OK' };
});

healthChecker.addCheck('redis', async () => {
  // Simulate Redis check
  await new Promise(resolve => setTimeout(resolve, 50));
  return { status: 'pass', output: 'Redis connection OK' };
});

healthChecker.addCheck('external-api', async () => {
  // Simulate external API check
  try {
    // const response = await fetch('https://api.external.com/health');
    // return response.ok ? { status: 'pass' } : { status: 'fail', output: 'API unreachable' };
    return { status: 'pass', output: 'External API OK' };
  } catch (error) {
    return { status: 'warn', output: 'External API degraded' };
  }
});

// Health check routes
app.get('/health', async (req, res) => {
  const health = await healthChecker.runChecks();
  const statusCode = health.status === 'healthy' ? 200 : 
                    health.status === 'degraded' ? 200 : 503;
  res.status(statusCode).json(health);
});

app.get('/metrics', (req, res) => {
  const metricsData = metrics.getMetrics();
  res.json({
    timestamp: new Date().toISOString(),
    metrics: metricsData
  });
});

// ===== 7. ALERTING SYSTEM =====
interface AlertRule {
  name: string;
  condition: (metrics: any) => boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
}

class AlertManager {
  private rules: AlertRule[] = [];
  private alertHistory = new Map<string, number>();
  private cooldownPeriod = 5 * 60 * 1000; // 5 minutes
  
  addRule(rule: AlertRule): void {
    this.rules.push(rule);
  }
  
  checkAlerts(metrics: any): void {
    const now = Date.now();
    
    for (const rule of this.rules) {
      try {
        if (rule.condition(metrics)) {
          const lastAlert = this.alertHistory.get(rule.name) || 0;
          
          // Check cooldown
          if (now - lastAlert > this.cooldownPeriod) {
            this.sendAlert(rule);
            this.alertHistory.set(rule.name, now);
          }
        }
      } catch (error) {
        appLogger.error('Error checking alert rule', error, { rule: rule.name });
      }
    }
  }
  
  private sendAlert(rule: AlertRule): void {
    appLogger.warn(`ALERT: ${rule.message}`, {
      alert: rule.name,
      severity: rule.severity,
      timestamp: new Date().toISOString()
    });
    
    // In production, send to alerting service (PagerDuty, Slack, etc.)
    // await this.sendToSlack(rule);
    // await this.sendToPagerDuty(rule);
  }
}

const alertManager = new AlertManager();

// Add alert rules
alertManager.addRule({
  name: 'high-error-rate',
  condition: (metrics) => {
    const errorCount = metrics.counters['http_requests_total{status:500}'] || 0;
    const totalCount = Object.entries(metrics.counters)
      .filter(([key]) => key.startsWith('http_requests_total'))
      .reduce((sum, [, value]) => sum + value, 0);
    return totalCount > 0 && (errorCount / totalCount) > 0.05; // 5% error rate
  },
  severity: 'high',
  message: 'Error rate is above 5%'
});

alertManager.addRule({
  name: 'slow-response-time',
  condition: (metrics) => {
    const responseTime = metrics.histograms['http_request_duration_ms'];
    return responseTime && responseTime.p95 > 2000; // 2 second P95
  },
  severity: 'medium',
  message: 'Response time P95 is above 2 seconds'
});

// ===== 8. LOG AGGREGATION =====
class LogAggregator {
  private buffer: any[] = [];
  private batchSize = 100;
  private flushInterval = 5000; // 5 seconds
  
  constructor() {
    setInterval(() => this.flush(), this.flushInterval);
  }
  
  addLog(logEntry: any): void {
    this.buffer.push({
      ...logEntry,
      timestamp: new Date().toISOString(),
      hostname: os.hostname(),
      pid: process.pid
    });
    
    if (this.buffer.length >= this.batchSize) {
      this.flush();
    }
  }
  
  private async flush(): void {
    if (this.buffer.length === 0) return;
    
    const logs = this.buffer.splice(0);
    
    try {
      // Send to log aggregation service (ELK, Splunk, CloudWatch, etc.)
      await this.sendToLogService(logs);
    } catch (error) {
      appLogger.error('Failed to send logs to aggregation service', error);
      // Re-add logs to buffer for retry (with limit to prevent memory issues)
      if (this.buffer.length < 1000) {
        this.buffer.unshift(...logs);
      }
    }
  }
  
  private async sendToLogService(logs: any[]): Promise<void> {
    // Simulate sending to external log service
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log(`Sent ${logs.length} logs to aggregation service`);
  }
}

const logAggregator = new LogAggregator();

// ===== 9. MONITORING DASHBOARD DATA =====
app.get('/monitoring/dashboard', (req, res) => {
  const metricsData = metrics.getMetrics();
  
  const dashboardData = {
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(),
    
    // Request metrics
    requests: {
      total: Object.entries(metricsData.counters)
        .filter(([key]) => key.startsWith('http_requests_total'))
        .reduce((sum, [, value]) => sum + value, 0),
      errors: Object.entries(metricsData.counters)
        .filter(([key]) => key.includes('status:5'))
        .reduce((sum, [, value]) => sum + value, 0)
    },
    
    // Response time metrics
    responseTime: metricsData.histograms['http_request_duration_ms'] || {
      count: 0,
      median: 0,
      p95: 0,
      p99: 0
    },
    
    // Raw metrics
    metrics: metricsData
  };
  
  res.json(dashboardData);
});

// ===== 10. PRODUCTION MONITORING SETUP =====
// Periodic metrics collection
setInterval(() => {
  // Collect system metrics
  metrics.setGauge('memory_usage_bytes', process.memoryUsage().heapUsed);
  metrics.setGauge('cpu_usage_percent', process.cpuUsage().user / 1000000);
  metrics.setGauge('uptime_seconds', process.uptime());
  
  // Check alerts
  alertManager.checkAlerts(metrics.getMetrics());
}, 30000); // Every 30 seconds

// Graceful shutdown with final metrics flush
process.on('SIGTERM', async () => {
  appLogger.info('Received SIGTERM, shutting down gracefully');
  
  // Flush any pending logs
  await logAggregator.flush();
  
  // Close server
  server.close(() => {
    appLogger.info('Process terminated');
    process.exit(0);
  });
});

console.log('Logging and monitoring examples loaded');
```

*Figyeld meg: Winston = production logging, Structured logs = JSON format, Metrics = counters/gauges/histograms, Health checks = service status monitoring.*

</div>
```

*Figyeld meg: try/catch = synchronous errors, Result pattern = explicit error handling, Circuit breaker = external service protection.*

</div>

<div class="concept-section myths" data-filter="node">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- „Try/catch minden hibát elkap." → Async hibákat nem, Promise.catch() vagy async/await kell
- „Error-öket mindig Exception-ként kell kezelni." → Result pattern explicit error handling-gel gyakran jobb
- „Production-ban részletes error message-ek OK-k." → Security risk, csak generic message-ek

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="node">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Error types:**
- Operational errors = expected, recoverable (validation, not found)
- Programming errors = bugs, fix needed (null reference, syntax)

**Async error handling:**
```js
// Promise
promise.catch(error => handleError(error));

// Async/await
try {
    const result = await asyncOperation();
} catch (error) {
    handleError(error);
}
```

**Express.js error handling:**
```js
// Error middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
```

**Result pattern:**
```js
const result = await operation();
if (!result.success) {
    return handleError(result.error);
}
return result.data;
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="node medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mi a különbség operational és programming error között?**
A: Operational = expected hibák (validation, network), handle gracefully. Programming = bugok (null reference), fix kóddal.

**Q: Hogyan kezelnéd az async error-okat Node.js-ben?**
A: Promise.catch(), async/await try/catch, unhandledRejection event listener, vagy Result pattern explicit error handling-gel.

**Q: Mit jelent a "fail fast" principle error handling-ben?**
A: Hibát azonnal detektálni és jelezni (validation), ahelyett hogy tovább propagálódna és később okozna problémát.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="node">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Logging** → Error tracking and debugging
- **Monitoring** → Error alerting and metrics
- **Circuit Breaker** → External service protection
- **Retry Logic** → Transient failure handling
- **Testing** → Error scenario testing

</div>

</details>

</div>

---

### Webpack/Vite bundling {#webpack-vite-bundling}

<div class="concept-section mental-model" data-filter="tooling medior">

<details>
<summary>📋 <strong>Fogalom meghatározása</strong></summary>

<div>

A **bundlerek** olyan build eszközök, amelyek modulokat és asset-eket optimalizált production bundle-kké alakítanak:
- **Webpack** = Konfigurálható, teljes körű bundler loader és plugin rendszerrel
- **Vite** = Modern, ESM-alapú dev server natív ES module importtal és gyors HMR-rel
- **Tree shaking** = Dead code elimination: használaton kívüli exportok eltávolítása
- **Code splitting** = Bundle felosztása kisebb chunk-okra lazy loading és parallel download céljából

</div>

</details>

</div>

<div class="concept-section why-important" data-filter="tooling medior">

<details>
<summary>💡 <strong>Miért számít?</strong></summary>

<div>

- **Performance optimization**: Bundle size és loading speed közvetlenül befolyásolja a user experience-t
- **Development velocity**: Hot reload és fast rebuild alapvetően meghatározzák a developer productivity-t
- **Production readiness**: Code splitting, caching és optimization stratégiák a scalable alkalmazások alapjai
- **Team workflow**: Build configuration standardizálja a development és deployment process-t

</div>

</details>

</div>

<div class="runnable-model" data-filter="tooling">

<details>
<summary><strong>Runnable mental model</strong></summary>

<div>

**Webpack teljes konfiguráció:**
```javascript
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: {
      main: './src/index.js',
      vendor: './src/vendor.js'
    },
    
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction 
        ? '[name].[contenthash].js' 
        : '[name].js',
      clean: true,
      assetModuleFilename: 'assets/[hash][ext][query]'
    },

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
            chunks: 'all',
            enforce: true
          }
        }
      },
      usedExports: true, // Tree shaking
      sideEffects: false
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { 
                  targets: '> 1%, not dead',
                  useBuiltIns: 'usage',
                  corejs: 3
                }],
                '@babel/preset-react',
                '@babel/preset-typescript'
              ],
              plugins: [
                '@babel/plugin-syntax-dynamic-import'
              ]
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: true,
                  localIdentName: isProduction 
                    ? '[hash:base64:5]' 
                    : '[name]__[local]--[hash:base64:5]'
                }
              }
            },
            'postcss-loader'
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)$/,
          type: 'asset/resource'
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          type: 'asset/resource'
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        minify: isProduction
      }),
      
      ...(isProduction ? [
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css'
        }),
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false
        })
      ] : []),
    ],

    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      hot: true,
      open: true,
      historyApiFallback: true,
      port: 3000
    },

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@utils': path.resolve(__dirname, 'src/utils')
      }
    },

    devtool: isProduction ? 'source-map' : 'eval-source-map'
  };
};
```

**Vite modern konfiguráció:**
```typescript
// vite.config.ts
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      react({
        babel: {
          plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }]
          ]
        }
      }),
      ...(command === 'build' ? [
        visualizer({
          filename: 'dist/stats.html',
          open: true,
          gzipSize: true
        })
      ] : [])
    ],

    build: {
      target: 'esnext',
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: true,
      
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          admin: resolve(__dirname, 'admin.html')
        },
        
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            ui: ['@mui/material', '@emotion/react'],
            utils: ['lodash', 'date-fns']
          },
          
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId 
              ? chunkInfo.facadeModuleId.split('/').pop().replace('.js', '') 
              : 'chunk';
            return `assets/${facadeModuleId}-[hash].js`;
          }
        }
      },

      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },

    server: {
      port: 3000,
      open: true,
      cors: true,
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:8000',
          changeOrigin: true,
          secure: false
        }
      }
    },

    preview: {
      port: 4173,
      open: true
    },

    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@components': resolve(__dirname, './src/components'),
        '@hooks': resolve(__dirname, './src/hooks'),
        '@utils': resolve(__dirname, './src/utils'),
        '@types': resolve(__dirname, './src/types')
      }
    },

    css: {
      modules: {
        localsConvention: 'camelCase',
        generateScopedName: mode === 'development' 
          ? '[name]__[local]___[hash:base64:5]'
          : '[hash:base64:5]'
      },
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/variables.scss";'
        }
      }
    },

    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString())
    },

    esbuild: {
      drop: command === 'build' ? ['console', 'debugger'] : []
    }
  };
});
```

**Package.json scripts optimalizálás:**
```json
{
  "scripts": {
    "dev": "vite --host",
    "dev:webpack": "webpack serve --mode development --open",
    "build": "vite build",
    "build:webpack": "webpack --mode production",
    "preview": "vite preview",
    "analyze": "npm run build && npx vite-bundle-analyzer dist/stats.html",
    "build:stats": "webpack --mode production --json > webpack-stats.json",
    "clean": "rimraf dist",
    "type-check": "tsc --noEmit"
  }
}
```

**Advanced optimization példák:**
```javascript
// Dynamic imports for code splitting
const LazyComponent = React.lazy(() => 
  import('./components/HeavyComponent')
    .then(module => ({ default: module.HeavyComponent }))
);

// Route-based code splitting
const routes = [
  {
    path: '/dashboard',
    component: lazy(() => import('./pages/Dashboard'))
  },
  {
    path: '/settings',
    component: lazy(() => import('./pages/Settings'))
  }
];

// Webpack magic comments
const ChartLibrary = lazy(() => 
  import(
    /* webpackChunkName: "charts" */ 
    /* webpackPrefetch: true */
    './ChartLibrary'
  )
);

// Tree shaking demonstration
// utils.js - WRONG (imports everything)
import * as utils from './utils';

// utils.js - CORRECT (only imports used functions)
import { debounce, throttle } from './utils';

// Library-specific tree shaking
// lodash - WRONG
import _ from 'lodash';

// lodash - CORRECT
import debounce from 'lodash/debounce';
import get from 'lodash/get';
```

</div>

</details>

</div>

<div class="concept-section myths" data-filter="tooling">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

❌ **"Vite minden esetben jobb mint Webpack"**  
✅ Vite gyorsabb development-ben, de Webpack érettebb plugin ecosystem-mel és enterprise feature-ökkel

❌ **"Code splitting automatikusan optimalizál mindent"**  
✅ Manual chunk optimization és bundle analysis továbbra is szükséges a legjobb performance-hoz

❌ **"Tree shaking automatikusan eltávolítja a unused kódot"**  
✅ Side effect-ek és circular dependencies megakadályozhatják a tree shaking-et

❌ **"Source maps production-ban nem kellenek"**  
✅ Error tracking és debugging szempontjából fontosak, de security implications-t figyelembe kell venni

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="tooling">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Bundle analyzer futtatása:**
```bash
# Webpack Bundle Analyzer
npm install --save-dev webpack-bundle-analyzer
npx webpack-bundle-analyzer dist/stats.json

# Vite Bundle Analyzer  
npm run build
npx vite-bundle-analyzer dist/stats.html
```

**Tree shaking tesztelés:**
```javascript
// Check if tree shaking works
// Create utils.js with multiple exports
export const usedFunction = () => 'used';
export const unusedFunction = () => 'unused';

// Import only one
import { usedFunction } from './utils';

// Build and check if unusedFunction is in bundle
```

**Performance monitoring:**
```javascript
// Measure chunk loading time
const startTime = performance.now();
import('./HeavyComponent').then(() => {
  console.log(`Chunk loaded in ${performance.now() - startTime}ms`);
});
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="tooling medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mi a különbség Webpack és Vite között?**
A: Webpack: bundler minden asset-re, plugin-based, slower dev server. Vite: ESM-based dev server, Rollup for build, faster HMR, pre-bundled dependencies.

**Q: Hogyan működik a tree shaking?**
A: Static analysis során eltávolítja a dead code-ot. ESM import/export statikus természete teszi lehetővé. Side effect-ek és dynamic imports megakadályozhatják.

**Q: Mikor használnál code splitting-et?**
A: Route-based splitting SPA-kban, lazy loading heavy components-nél, vendor libraries különválasztása, feature-based chunks large applications-ben.

**Q: Hogyan optimalizálnád a bundle size-ot?**
A: Bundle analyzer használata, tree shaking enablement, dynamic imports, external dependencies (CDN), image optimization, minification.

**Q: Mi a difference development és production build között?**
A: Dev: fast rebuild, hot reload, readable code. Prod: minification, optimization, code splitting, asset hashing, compression.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="tooling">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **ESLint/Prettier** → Build process integration és code quality
- **Testing frameworks** → Test bundling és coverage reports
- **CI/CD** → Automated builds és deployment
- **Performance monitoring** → Bundle analysis és optimization
- **Micro-frontends** → Module federation és independent deployments

</div>

</details>

</div>

---

### ESLint/Prettier code quality {#eslint-prettier-code-quality}

<div class="concept-section mental-model" data-filter="tooling medior">

<details>
<summary>📋 <strong>Fogalom meghatározása</strong></summary>

<div>

**ESLint** egy pluggable JavaScript linter, amely statikus kódelemzéssel azonosítja és jelenti a problémás mintákat, potenciális hibákat és code quality issues-t. Konfigurálható szabálykészletekkel (rules), extend-elhető pluginokkal és custom szabalyokkal.

**Prettier** egy opinionated code formatter, amely automatikusan átformázza a kódot konzisztens stílusra (indentation, line breaks, quotes) AST-alapú parsolással és újra-printteléssel.

**Együtt** komplementális eszközök: ESLint a kód minőségét, Prettier a kód megjelenését kezel.

</div>

</details>

</div>

<div class="concept-section why-important" data-filter="tooling medior">

<details>
<summary>💡 <strong>Miért számít?</strong></summary>

<div>

- **Consistent codebase**: Team-wide code style és quality standards automatikus enforcement-je
- **Early bug detection**: Potential errors és anti-patterns felismerése development phase-ben
- **Developer productivity**: Automated formatting és instant feedback csökkenti a review time-ot
- **Team collaboration**: Objective standards csökkentik a subjective code style vitákat

</div>

</details>

</div>

<div class="runnable-model" data-filter="tooling">

<details>
<summary><strong>Runnable mental model</strong></summary>

<div>

**ESLint teljes konfiguráció (.eslintrc.js):**
```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier' // Prettier conflict disable - ALWAYS LAST
  ],
  
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'jsx-a11y',
    'import',
    'unused-imports',
    'simple-import-sort'
  ],
  
  rules: {
    // Error prevention
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'no-alert': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'no-unused-vars': 'off', // Handled by unused-imports
    
    // TypeScript specific
    '@typescript-eslint/no-unused-vars': 'off', // Handled by unused-imports
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    
    // React specific
    'react/react-in-jsx-scope': 'off', // React 17+
    'react/prop-types': 'off', // Using TypeScript
    'react/display-name': 'warn',
    'react/no-unescaped-entities': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // Import/Export organization
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],
    
    // Import rules
    'import/no-unresolved': 'error',
    'import/no-cycle': 'error',
    'import/no-self-import': 'error',
    'import/no-duplicates': 'error',
    
    // Accessibility
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton']
      }
    ],
    
    // Best practices
    'eqeqeq': ['error', 'always'],
    'curly': ['error', 'all'],
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-script-url': 'error'
  },
  
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json'
      }
    }
  },
  
  overrides: [
    {
      files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
      env: {
        jest: true
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'react-hooks/exhaustive-deps': 'off'
      }
    },
    {
      files: ['vite.config.ts', 'webpack.config.js'],
      rules: {
        'import/no-extraneous-dependencies': 'off'
      }
    }
  ]
};
```

**Prettier konfiguráció (.prettierrc):**
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "quoteProps": "as-needed",
  "jsxSingleQuote": true,
  "overrides": [
    {
      "files": "*.md",
      "options": {
        "printWidth": 100,
        "proseWrap": "always"
      }
    },
    {
      "files": "*.json",
      "options": {
        "singleQuote": false
      }
    }
  ]
}
```

**Package.json scripts és dependencies:**
```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "lint:check": "eslint . --ext .js,.jsx,.ts,.tsx",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",
    "pre-commit": "lint-staged",
    "prepare": "husky install"
  },
  
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.45.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-import": "^2.28.0",
    "eslint-plugin-jsx-a11y": "^6.7.1",
    "eslint-plugin-react": "^7.33.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-simple-import-sort": "^10.0.0",
    "eslint-plugin-unused-imports": "^3.0.0",
    "prettier": "^3.0.0",
    "husky": "^8.0.3",
    "lint-staged": "^14.0.0"
  }
}
```

**Husky pre-commit hooks (.husky/pre-commit):**
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Run lint-staged
npx lint-staged

# Run type checking
npm run type-check
```

**Lint-staged konfiguráció (.lintstagedrc.json):**
```json
{
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,md,css,scss,html}": [
    "prettier --write"
  ],
  "*.{js,jsx,ts,tsx,json,md,css,scss,html}": [
    "git add"
  ]
}
```

**VS Code settings integration (.vscode/settings.json):**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact", 
    "typescript",
    "typescriptreact"
  ],
  "typescript.preferences.organizeImports": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

**Custom ESLint rules example:**
```javascript
// .eslint-local-rules.js
module.exports = {
  'no-hardcoded-strings': {
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Disallow hardcoded strings in components'
      }
    },
    create(context) {
      return {
        JSXText(node) {
          const text = node.value.trim();
          if (text && !/^[A-Z_][A-Z0-9_]*$/.test(text)) {
            context.report({
              node,
              message: 'Use i18n keys instead of hardcoded strings'
            });
          }
        }
      };
    }
  },
  
  'prefer-custom-hooks': {
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Prefer custom hooks over inline logic'
      }
    },
    create(context) {
      return {
        CallExpression(node) {
          if (
            node.callee.name === 'useEffect' &&
            node.arguments[0] &&
            node.arguments[0].body &&
            node.arguments[0].body.body.length > 10
          ) {
            context.report({
              node,
              message: 'Consider extracting complex useEffect logic into a custom hook'
            });
          }
        }
      };
    }
  }
};
```

**CI/CD integration example (GitHub Actions):**
```yaml
name: Code Quality
on: [push, pull_request]

jobs:
  lint-and-format:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: ESLint check
        run: npm run lint:check
      
      - name: Prettier check
        run: npm run format:check
      
      - name: Type check
        run: npm run type-check
```

</div>

</details>

</div>

<div class="concept-section myths" data-filter="tooling">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

❌ **"Prettier és ESLint ugyanazt csinálják"**  
✅ ESLint = code quality és logic, Prettier = formatting only. Együtt használva conflict-okat el kell kerülni

❌ **"Pre-commit hooks lassítják a development-et"**  
✅ Hosszú távon gyorsítják azáltal, hogy korai feedback-et adnak és csökkentik a review time-ot

❌ **"Minden ESLint rule-t strict-re kell állítani"**  
✅ Team-specific needs alapján kell konfigurálni, túl strict rules frustration-t okozhatnak

❌ **"Auto-fix megoldja az összes problémát"**  
✅ Formatting igen, de logic errors és complex refactoring továbbra is manual intervention-t igényel

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="tooling">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**ESLint konfiguráció tesztelése:**
```bash
# Specific file linting
npx eslint src/components/Button.tsx --fix

# Check configuration
npx eslint --print-config src/index.ts

# List all available rules
npx eslint --print-config . | grep rules
```

**Prettier + ESLint conflict debugging:**
```bash
# Check conflicts
npx eslint-config-prettier src/index.ts

# Test Prettier formatting
npx prettier --check src/**/*.{js,ts,tsx}
```

**Custom rule testing:**
```javascript
// Test custom ESLint rule
const { RuleTester } = require('eslint');
const rule = require('./rules/no-hardcoded-strings');

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' }
});

ruleTester.run('no-hardcoded-strings', rule, {
  valid: ['<Text>{t("key")}</Text>'],
  invalid: [{
    code: '<div>Hardcoded text</div>',
    errors: [{ message: 'Use i18n keys instead of hardcoded strings' }]
  }]
});
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="tooling medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mi a különbség ESLint és Prettier között?**
A: ESLint = code quality rules (unused vars, logic errors), Prettier = formatting only (indentation, quotes). Együtt használva conflict-avoidance szükséges.

**Q: Hogyan kezelnéd az ESLint + Prettier conflict-okat?**
A: eslint-config-prettier használata (disable conflicting ESLint rules), proper extends order (.prettierrc utolsónak), separate scripts (lint + format).

**Q: Mikor használnál custom ESLint rules-okat?**
A: Team-specific patterns enforcement (naming conventions, architecture rules), security policies, deprecated API usage prevention.

**Q: Hogyan integráljkad a linting-et CI/CD pipeline-ba?**
A: Pre-commit hooks (husky + lint-staged), CI checks, automated PR comments, quality gates, sonar integration.

**Q: Mit jelent a "linting performance optimization"?**
A: ESLint cache enabling, specific file patterns, incremental linting, parallel execution, rule complexity minimization.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="tooling">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Webpack/Vite** → Build process integration és bundle optimization
- **Testing frameworks** → Test file linting és coverage enforcement
- **Git hooks** → Automated quality checks és commit message linting
- **VS Code extensions** → Developer experience és real-time feedback
- **TypeScript** → Static type checking és ESLint rules synergy

</div>

</details>

</div>

---

### Testing frameworks {#testing-frameworks}

<div class="concept-section mental-model" data-filter="tooling medior">

<details>
<summary>📋 <strong>Fogalom meghatározása</strong></summary>

<div>

A testing frameworkok automatizált tesztelési eszközök különböző szinteken:
- **Jest** = All-in-one test runner, assertion library és mocking framework, snapshot testing támogatással
- **React Testing Library** = User-centric testing library, amely DOM query-kkel és user interaction szimulációval tesztel implementációs részletek helyett
- **Cypress** = End-to-end testing framework valós browser-ben, teljes user flow tesztelésére
- **Test pyramid** = Unit (sok, gyors, izolált) > Integration (közepes) > E2E (kevés, lassú, draga) arány.

</div>

</details>

</div>

<div class="concept-section why-important" data-filter="tooling medior">

<details>
<summary>💡 <strong>Miért számít?</strong></summary>

<div>

- **Regression prevention**: Automatikus validáció, hogy új changes nem törnek el existing functionality-t
- **Refactoring confidence**: Biztonságos code restructuring knowing tests catch breaking changes
- **Documentation value**: Tests mint living specification, amely demonstrálja az expected behavior-t
- **Team velocity**: Long-term development speed növekedés consistent quality assurance révén

</div>

</details>

</div>

<div class="runnable-model" data-filter="tooling">

<details>
<summary><strong>Runnable mental model</strong></summary>

<div>

**Jest configuration (jest.config.js):**
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  
  // Test file patterns
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js|jsx)',
    '**/*.(test|spec).(ts|tsx|js|jsx)'
  ],
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  
  // Module mapping for absolute imports
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1'
  },
  
  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.(ts|tsx)',
    '!src/**/*.d.ts',
    '!src/index.tsx',
    '!src/reportWebVitals.ts',
    '!src/**/*.stories.(ts|tsx)'
  ],
  
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  
  // Transform configuration
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  
  // Module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Mock static assets
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js'
  },
  
  // Test timeout
  testTimeout: 10000,
  
  // Clear mocks between tests
  clearMocks: true,
  
  // Verbose output
  verbose: true
};
```

**Setup file (src/setupTests.ts):**
```typescript
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { jest } from '@jest/globals';

// Configure testing library
configure({ testIdAttribute: 'data-testid' });

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(
    public callback: IntersectionObserverCallback,
    public options?: IntersectionObserverInit
  ) {}
  
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor(public callback: ResizeObserverCallback) {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

// Mock fetch
global.fetch = jest.fn();

// Enhanced error reporting
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});
```

**Unit Testing examples:**
```typescript
// utils/formatCurrency.test.ts
import { formatCurrency } from './formatCurrency';

describe('formatCurrency', () => {
  it('formats USD currency correctly', () => {
    expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56');
  });
  
  it('handles zero values', () => {
    expect(formatCurrency(0, 'USD')).toBe('$0.00');
  });
  
  it('handles negative values', () => {
    expect(formatCurrency(-100, 'USD')).toBe('-$100.00');
  });
  
  it('throws error for invalid currency', () => {
    expect(() => formatCurrency(100, 'INVALID')).toThrow();
  });
});

// hooks/useLocalStorage.test.ts
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  
  it('returns initial value when localStorage is empty', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial')
    );
    
    expect(result.current[0]).toBe('initial');
  });
  
  it('updates localStorage when value changes', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial')
    );
    
    act(() => {
      result.current[1]('updated');
    });
    
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'test-key', 
      JSON.stringify('updated')
    );
    expect(result.current[0]).toBe('updated');
  });
  
  it('handles localStorage errors gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    (localStorage.setItem as jest.Mock).mockImplementation(() => {
      throw new Error('Quota exceeded');
    });
    
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial')
    );
    
    act(() => {
      result.current[1]('updated');
    });
    
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
```

**React Testing Library examples:**
```typescript
// components/SearchInput.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from './SearchInput';

const mockOnSearch = jest.fn();

describe('SearchInput', () => {
  beforeEach(() => {
    mockOnSearch.mockClear();
  });
  
  it('renders with placeholder text', () => {
    render(<SearchInput onSearch={mockOnSearch} />);
    
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });
  
  it('calls onSearch when typing with debounce', async () => {
    const user = userEvent.setup();
    render(<SearchInput onSearch={mockOnSearch} debounceMs={300} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'test query');
    
    // Should not call immediately
    expect(mockOnSearch).not.toHaveBeenCalled();
    
    // Should call after debounce
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('test query');
    });
  });
  
  it('handles empty search', async () => {
    const user = userEvent.setup();
    render(<SearchInput onSearch={mockOnSearch} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'test');
    await user.clear(input);
    
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenLastCalledWith('');
    });
  });
  
  it('shows loading state', () => {
    render(<SearchInput onSearch={mockOnSearch} isLoading={true} />);
    
    expect(screen.getByTestId('search-loading')).toBeInTheDocument();
  });
});

// components/UserProfile.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProfile } from './UserProfile';
import { userService } from '../services/userService';

jest.mock('../services/userService');
const mockUserService = userService as jest.Mocked<typeof userService>;

const createQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false }
  }
});

const renderWithQueryClient = (component: React.ReactElement) => {
  const queryClient = createQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe('UserProfile', () => {
  it('displays user data when loaded', async () => {
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com'
    };
    
    mockUserService.getUser.mockResolvedValue(mockUser);
    
    renderWithQueryClient(<UserProfile userId="1" />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });
  });
  
  it('displays error message when fetch fails', async () => {
    mockUserService.getUser.mockRejectedValue(
      new Error('User not found')
    );
    
    renderWithQueryClient(<UserProfile userId="999" />);
    
    await waitFor(() => {
      expect(screen.getByText('Error: User not found')).toBeInTheDocument();
    });
  });
});
```

**Cypress E2E testing setup:**
```typescript
// cypress/e2e/user-journey.cy.ts
describe('User Registration Journey', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('POST', '/api/users', { fixture: 'user.json' }).as('createUser');
  });
  
  it('completes full registration flow', () => {
    // Navigate to registration
    cy.get('[data-testid="register-button"]').click();
    cy.url().should('include', '/register');
    
    // Fill form
    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="password-input"]').type('SecurePassword123!');
    cy.get('[data-testid="confirm-password-input"]').type('SecurePassword123!');
    
    // Submit form
    cy.get('[data-testid="submit-button"]').click();
    
    // Verify API call
    cy.wait('@createUser').its('request.body').should('deep.include', {
      email: 'test@example.com'
    });
    
    // Verify redirect
    cy.url().should('include', '/dashboard');
    cy.get('[data-testid="welcome-message"]').should('be.visible');
  });
  
  it('validates password requirements', () => {
    cy.visit('/register');
    
    cy.get('[data-testid="password-input"]').type('weak');
    cy.get('[data-testid="password-error"]').should('contain', 'too short');
    
    cy.get('[data-testid="password-input"]').clear().type('StrongPassword123!');
    cy.get('[data-testid="password-error"]').should('not.exist');
  });
  
  it('handles server errors gracefully', () => {
    cy.intercept('POST', '/api/users', { 
      statusCode: 400, 
      body: { error: 'Email already exists' } 
    }).as('createUserError');
    
    cy.visit('/register');
    cy.get('[data-testid="email-input"]').type('existing@example.com');
    cy.get('[data-testid="password-input"]').type('SecurePassword123!');
    cy.get('[data-testid="submit-button"]').click();
    
    cy.wait('@createUserError');
    cy.get('[data-testid="error-message"]').should('contain', 'Email already exists');
  });
});

// cypress/support/commands.ts
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      seedDatabase(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.session([email, password], () => {
    cy.visit('/login');
    cy.get('[data-testid="email-input"]').type(email);
    cy.get('[data-testid="password-input"]').type(password);
    cy.get('[data-testid="login-button"]').click();
    cy.url().should('include', '/dashboard');
  });
});

Cypress.Commands.add('seedDatabase', () => {
  cy.task('seedDb');
});
```

**Test utilities és helpers:**
```typescript
// test-utils/render.tsx
import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../src/contexts/ThemeContext';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
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
          {children}
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

// test-utils/factories.ts
import { faker } from '@faker-js/faker';

export const createUser = (overrides: Partial<User> = {}): User => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  createdAt: faker.date.past(),
  ...overrides
});

export const createPost = (overrides: Partial<Post> = {}): Post => ({
  id: faker.string.uuid(),
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraphs(3),
  authorId: faker.string.uuid(),
  published: faker.datatype.boolean(),
  createdAt: faker.date.past(),
  ...overrides
});
```

**Performance testing setup:**
```typescript
// performance/lighthouse.test.ts
import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';

describe('Performance Tests', () => {
  let chrome: any;
  
  beforeAll(async () => {
    chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  });
  
  afterAll(async () => {
    await chrome.kill();
  });
  
  it('meets performance benchmarks on homepage', async () => {
    const options = {
      logLevel: 'info',
      output: 'json',
      onlyCategories: ['performance'],
      port: chrome.port
    };
    
    const runnerResult = await lighthouse('http://localhost:3000', options);
    const performanceScore = runnerResult.lhr.categories.performance.score * 100;
    
    expect(performanceScore).toBeGreaterThan(90);
  });
});
```

</div>

</details>

</div>

<div class="concept-section myths" data-filter="tooling">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

❌ **"100% test coverage jelenti a tökéletes quality-t"**  
✅ Coverage metric ≠ quality metric. Inkább meaningful test scenarios és edge cases coverage számít

❌ **"E2E tesztekkel kiválthatók a unit tesztek"**  
✅ Test pyramid: sok unit, kevesebb integration, legkevesebb E2E. Mindegyiknek megvan a maga szerepe

❌ **"Mocking minden external dependency-t mindig jó"**  
✅ Integration teszteknél valós dependencies használata authenticity szempontjából fontos lehet

❌ **"Testing csak a befejezett feature-ök után jön"**  
✅ TDD approach: tests first, majd implementation. Tests mint specification és design tool

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="tooling">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Test-driven development cycle:**
```bash
# 1. Write failing test
npm test -- --watch UserProfile.test.tsx

# 2. Write minimal implementation
# 3. Refactor while keeping tests green
```

**Debug failing tests:**
```typescript
// Add debug output
screen.debug(); // Prints DOM structure

// Find element queries
screen.getByRole('button', { name: /submit/i });
screen.findByText('Loading...'); // Async
screen.queryByText('Not found'); // Returns null if not found
```

**Quick coverage check:**
```bash
# Generate coverage report
npm test -- --coverage --watchAll=false

# Coverage for specific file
npm test -- --coverage --collectCoverageFrom="src/components/Button.tsx"
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="tooling medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mi a különbség unit, integration és E2E tesztek között?**
A: Unit = isolated functions/components, Integration = module interactions, E2E = full user workflows. Test pyramid: sok unit, kevesebb integration, legkevesebb E2E.

**Q: Mikor használnál mock-ot és mikor real implementation-t?**
A: Mock external APIs unit testekben, real implementation integration testekben. Balance between test speed és authenticity.

**Q: Hogyan kezelnéd a flaky teszteket?**
A: Root cause analysis (timing, external dependencies), proper async handling, test isolation, deterministic test data, retry mechanisms last resort.

**Q: Mi a TDD workflow és mik az előnyei?**
A: Red-Green-Refactor cycle. Előnyök: better design, comprehensive coverage, confidence refactoring során, tests mint documentation.

**Q: Hogyan optimalizálnád a test suite performance-ot?**
A: Parallel execution, test sharding, selective testing (only changed files), proper mocking, optimized CI environment.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="tooling">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **ESLint/Prettier** → Test file linting és code quality standards
- **Webpack/Vite** → Test bundling és development environment setup
- **CI/CD** → Automated testing és quality gates
- **TypeScript** → Type-safe testing és better IDE support
- **React hooks** → Custom hook testing strategies

</div>

</details>

</div>

## Gyakran ismételt interjú kérdések
- [Frontend Masters](https://frontendmasters.com/) - Advanced frontend courses
- [React Patterns](https://reactpatterns.com/) - Common React design patterns
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/) - Advanced TypeScript guide
- [Modern JavaScript](https://javascript.info/) - Comprehensive JS tutorial