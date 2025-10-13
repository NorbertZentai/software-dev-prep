---
title: "React + TypeScript komponens fejlesztés"
difficulty: intermediate
goals: 
  - "TypeScript interfaces"
  - "React Hooks"
  - "Component composition"
  - "State management"
estimatedMinutes: 60
render_with_liquid: false
starter:
  stackblitz: "https://stackblitz.com/edit/react-typescript-todo?file=src/App.tsx"
  codesandbox: "https://codesandbox.io/s/react-typescript-template"
  dbfiddle: ""
---

# React + TypeScript Komponens Fejlesztés

## Feladat leírása

Fejlessz ki egy fejlett Todo alkalmazást React és TypeScript használatával. Az alkalmazás demonstrálni fogja a modern React patterns-eket, TypeScript type safety-t, és professzionális component architecture-t.

## Projekt setup

```bash
# Create React app with TypeScript
npx create-react-app react-typescript-todo --template typescript
cd react-typescript-todo

# Additional dependencies
npm install styled-components @types/styled-components
npm install react-query axios
npm install @testing-library/jest-dom @testing-library/user-event
```

## Feladat 1: TypeScript Interfaces és Types

### Core Types Definition

```typescript
// src/types/todo.ts
export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  tags: string[];
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

export interface TodoFormData {
  title: string;
  description: string;
  priority: Priority;
  categoryId: string;
  tags: string[];
  dueDate: string;
}

// State types
export interface TodoState {
  todos: Todo[];
  categories: Category[];
  filters: TodoFilters;
  loading: boolean;
  error: string | null;
}

export interface TodoFilters {
  status: 'all' | 'active' | 'completed';
  priority?: Priority;
  category?: string;
  search: string;
  sortBy: 'createdAt' | 'dueDate' | 'priority' | 'title';
  sortOrder: 'asc' | 'desc';
}

// API types
export interface CreateTodoRequest {
  title: string;
  description?: string;
  priority: Priority;
  categoryId: string;
  tags: string[];
  dueDate?: string;
}

export interface UpdateTodoRequest extends Partial<CreateTodoRequest> {
  completed?: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// Component Props
export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onTagClick: (tag: string) => void;
}

export interface TodoFormProps {
  initialData?: Partial<TodoFormData>;
  onSubmit: (data: TodoFormData) => void;
  onCancel: () => void;
  loading?: boolean;
  categories: Category[];
}
```

### Custom Hooks with TypeScript

```typescript
// src/hooks/useTodos.ts
import { useState, useEffect, useCallback } from 'react';
import { Todo, TodoFilters, CreateTodoRequest, UpdateTodoRequest } from '../types/todo';
import { todoService } from '../services/todoService';

interface UseTodosReturn {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  addTodo: (data: CreateTodoRequest) => Promise<void>;
  updateTodo: (id: string, data: UpdateTodoRequest) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  refreshTodos: () => Promise<void>;
}

export const useTodos = (filters: TodoFilters): UseTodosReturn => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await todoService.getTodos(filters);
      setTodos(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (data: CreateTodoRequest): Promise<void> => {
    try {
      const response = await todoService.createTodo(data);
      setTodos(prev => [...prev, response.data]);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to add todo');
    }
  };

  const updateTodo = async (id: string, data: UpdateTodoRequest): Promise<void> => {
    try {
      const response = await todoService.updateTodo(id, data);
      setTodos(prev =>
        prev.map(todo => todo.id === id ? { ...todo, ...response.data } : todo)
      );
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update todo');
    }
  };

  const deleteTodo = async (id: string): Promise<void> => {
    try {
      await todoService.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete todo');
    }
  };

  const toggleTodo = async (id: string): Promise<void> => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      await updateTodo(id, { completed: !todo.completed });
    }
  };

  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    refreshTodos: fetchTodos
  };
};
```

### Advanced Custom Hook - useLocalStorage

```typescript
// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue: React.Dispatch<React.SetStateAction<T>> = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing localStorage change for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;
```

## Feladat 2: React Components TypeScript-tel

### Functional Component with Hooks

```typescript
// src/components/TodoItem/TodoItem.tsx
import React, { useState, memo } from 'react';
import styled from 'styled-components';
import { Todo, Priority } from '../../types/todo';
import { formatDate } from '../../utils/dateUtils';
import { TodoItemProps } from '../../types/todo';

const TodoItemContainer = styled.article<{ completed: boolean; priority: Priority }>`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin: 0.5rem 0;
  background: white;
  border-radius: 8px;
  border-left: 4px solid ${({ priority }) => getPriorityColor(priority)};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  opacity: ${({ completed }) => completed ? 0.7 : 1};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  }
`;

const TodoContent = styled.div`
  flex: 1;
  margin-left: 1rem;
`;

const TodoTitle = styled.h3<{ completed: boolean }>`
  margin: 0 0 0.5rem 0;
  text-decoration: ${({ completed }) => completed ? 'line-through' : 'none'};
  color: ${({ completed }) => completed ? '#888' : '#333'};
`;

const TodoMeta = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #666;
`;

const TagList = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  cursor: pointer;

  &:hover {
    background: #bbdefb;
  }
`;

const ActionButton = styled.button<{ variant?: 'edit' | 'delete' }>`
  background: ${({ variant }) =>
    variant === 'delete' ? '#f44336' :
    variant === 'edit' ? '#2196f3' : 'transparent'};
  color: ${({ variant }) => variant ? 'white' : '#666'};
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 0.5rem;

  &:hover {
    opacity: 0.8;
  }
`;

function getPriorityColor(priority: Priority): string {
  const colors = {
    low: '#4caf50',
    medium: '#ff9800',
    high: '#f44336',
    urgent: '#9c27b0'
  };
  return colors[priority];
}

const TodoItem: React.FC<TodoItemProps> = memo(({
  todo,
  onToggle,
  onEdit,
  onDelete,
  onTagClick
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleEdit = () => {
    onEdit(todo);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${todo.title}"?`)) {
      onDelete(todo.id);
    }
  };

  const handleTagClick = (tag: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    onTagClick(tag);
  };

  return (
    <TodoItemContainer completed={todo.completed} priority={todo.priority}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
      />

      <TodoContent onClick={() => setIsExpanded(!isExpanded)}>
        <TodoTitle completed={todo.completed}>{todo.title}</TodoTitle>

        {(isExpanded || todo.description) && todo.description && (
          <p>{todo.description}</p>
        )}

        <TodoMeta>
          <span>Created: {formatDate(todo.createdAt)}</span>
          {todo.dueDate && (
            <span>Due: {formatDate(todo.dueDate)}</span>
          )}
          <span>Priority: {todo.priority}</span>
        </TodoMeta>

        {todo.tags.length > 0 && (
          <TagList>
            {todo.tags.map(tag => (
              <Tag key={tag} onClick={handleTagClick(tag)}>
                #{tag}
              </Tag>
            ))}
          </TagList>
        )}
      </TodoContent>

      <ActionButton variant="edit" onClick={handleEdit} title="Edit todo">
        ✏️
      </ActionButton>
      <ActionButton variant="delete" onClick={handleDelete} title="Delete todo">
        🗑️
      </ActionButton>
    </TodoItemContainer>
  );
});

TodoItem.displayName = 'TodoItem';

export default TodoItem;
```

### Form Component with Validation

```typescript
// src/components/TodoForm/TodoForm.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TodoFormProps, TodoFormData, Priority } from '../../types/todo';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2196f3;
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #2196f3;
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background: white;
`;

const TagInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 45px;
`;

const TagChip = styled.span`
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RemoveTagButton = styled.button`
  background: none;
  border: none;
  color: #1976d2;
  cursor: pointer;
  padding: 0;
  width: 16px;
  height: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  background: ${({ variant }) =>
    variant === 'primary' ? '#2196f3' : '#f5f5f5'};
  color: ${({ variant }) =>
    variant === 'primary' ? 'white' : '#333'};

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.span`
  color: #f44336;
  font-size: 0.875rem;
`;

interface FormErrors {
  title?: string;
  categoryId?: string;
}

const TodoForm: React.FC<TodoFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
  categories
}) => {
  const [formData, setFormData] = useState<TodoFormData>({
    title: '',
    description: '',
    priority: 'medium',
    categoryId: '',
    tags: [],
    dueDate: '',
    ...initialData
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, trimmedTag]
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(tagInput);
      setTagInput('');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter todo title..."
          maxLength={100}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && (
          <ErrorMessage id="title-error">{errors.title}</ErrorMessage>
        )}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="description">Description</Label>
        <TextArea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter description (optional)..."
          maxLength={500}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="priority">Priority</Label>
        <Select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleInputChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </Select>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="categoryId">Category *</Label>
        <Select
          id="categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleInputChange}
          aria-invalid={!!errors.categoryId}
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        {errors.categoryId && (
          <ErrorMessage>{errors.categoryId}</ErrorMessage>
        )}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="dueDate">Due Date</Label>
        <Input
          id="dueDate"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleInputChange}
          min={new Date().toISOString().split('T')[0]}
        />
      </FormGroup>

      <FormGroup>
        <Label>Tags</Label>
        <TagInput onClick={() => document.getElementById('tag-input')?.focus()}>
          {formData.tags.map(tag => (
            <TagChip key={tag}>
              #{tag}
              <RemoveTagButton
                type="button"
                onClick={() => removeTag(tag)}
                aria-label={`Remove tag ${tag}`}
              >
                ×
              </RemoveTagButton>
            </TagChip>
          ))}
          <Input
            id="tag-input"
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagInputKeyPress}
            onBlur={() => {
              if (tagInput.trim()) {
                addTag(tagInput);
                setTagInput('');
              }
            }}
            placeholder="Add tags..."
            style={ {
              border: 'none',
              background: 'transparent',
              outline: 'none',
              flex: 1,
              minWidth: '120px'
            } }
          />
        </TagInput>
      </FormGroup>

      <ButtonGroup>
        <Button type="button" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Saving...' : initialData ? 'Update' : 'Create'} Todo
        </Button>
      </ButtonGroup>
    </Form>
  );
};

export default TodoForm;
```

## Feladat 3: Context és State Management

### Todo Context Provider

```typescript
// src/context/TodoContext.tsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Todo, TodoFilters, Category } from '../types/todo';
import { todoService } from '../services/todoService';

interface TodoContextState {
  todos: Todo[];
  categories: Category[];
  filters: TodoFilters;
  loading: boolean;
  error: string | null;
}

type TodoAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_TODOS'; payload: Todo[] }
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'UPDATE_TODO'; payload: { id: string; updates: Partial<Todo> } }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<TodoFilters> }
  | { type: 'SET_CATEGORIES'; payload: Category[] };

const initialState: TodoContextState = {
  todos: [],
  categories: [],
  filters: {
    status: 'all',
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  },
  loading: false,
  error: null
};

function todoReducer(state: TodoContextState, action: TodoAction): TodoContextState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };

    case 'SET_TODOS':
      return { ...state, todos: action.payload, loading: false };

    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };

    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, ...action.payload.updates }
            : todo
        )
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };

    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };

    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };

    default:
      return state;
  }
}

interface TodoContextValue extends TodoContextState {
  actions: {
    loadTodos: () => Promise<void>;
    addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    updateTodo: (id: string, updates: Partial<Todo>) => Promise<void>;
    deleteTodo: (id: string) => Promise<void>;
    setFilters: (filters: Partial<TodoFilters>) => void;
    loadCategories: () => Promise<void>;
  };
}

const TodoContext = createContext<TodoContextValue | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const actions = {
    loadTodos: async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const todos = await todoService.getTodos(state.filters);
        dispatch({ type: 'SET_TODOS', payload: todos.data });
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload: error instanceof Error ? error.message : 'Failed to load todos'
        });
      }
    },

    addTodo: async (todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
      try {
        const newTodo = await todoService.createTodo(todoData);
        dispatch({ type: 'ADD_TODO', payload: newTodo.data });
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload: error instanceof Error ? error.message : 'Failed to add todo'
        });
        throw error;
      }
    },

    updateTodo: async (id: string, updates: Partial<Todo>) => {
      try {
        await todoService.updateTodo(id, updates);
        dispatch({ type: 'UPDATE_TODO', payload: { id, updates } });
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload: error instanceof Error ? error.message : 'Failed to update todo'
        });
        throw error;
      }
    },

    deleteTodo: async (id: string) => {
      try {
        await todoService.deleteTodo(id);
        dispatch({ type: 'DELETE_TODO', payload: id });
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload: error instanceof Error ? error.message : 'Failed to delete todo'
        });
        throw error;
      }
    },

    setFilters: (filters: Partial<TodoFilters>) => {
      dispatch({ type: 'SET_FILTERS', payload: filters });
    },

    loadCategories: async () => {
      try {
        const categories = await todoService.getCategories();
        dispatch({ type: 'SET_CATEGORIES', payload: categories.data });
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    }
  };

  useEffect(() => {
    actions.loadTodos();
    actions.loadCategories();
  }, [state.filters]);

  const value: TodoContextValue = {
    ...state,
    actions
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodoContext = (): TodoContextValue => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};
```

## Ellenőrző lista

- [ ] TypeScript interfaces minden data type-hoz definiálva
- [ ] Custom hooks type safety-vel implementálva
- [ ] Functional components proper typing-gal
- [ ] Event handlers type-safe módon implementálva
- [ ] Form validation TypeScript discriminated unions-szal
- [ ] Context API TypeScript generic types-szal
- [ ] Error boundaries TypeScript-tel
- [ ] Styled-components theme typing
- [ ] Unit tesztek TypeScript-tel írva
- [ ] API service layer proper typing-gal

## Testing TypeScript Components

```typescript
// src/components/TodoItem/TodoItem.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoItem } from './TodoItem';
import { Todo } from '../../types/todo';

const mockTodo: Todo = {
  id: '1',
  title: 'Test Todo',
  description: 'Test description',
  completed: false,
  priority: 'medium',
  category: { id: '1', name: 'Work', color: '#blue' },
  tags: ['test', 'important'],
  createdAt: new Date(),
  updatedAt: new Date()
};

const mockProps = {
  todo: mockTodo,
  onToggle: jest.fn(),
  onEdit: jest.fn(),
  onDelete: jest.fn(),
  onTagClick: jest.fn()
};

describe('TodoItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders todo title and description', () => {
    render(<TodoItem {...mockProps} />);

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('calls onToggle when checkbox is clicked', () => {
    render(<TodoItem {...mockProps} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockProps.onToggle).toHaveBeenCalledWith('1');
  });

  it('applies completed styling when todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(<TodoItem {...mockProps} todo={completedTodo} />);

    const title = screen.getByText('Test Todo');
    expect(title).toHaveStyle('text-decoration: line-through');
  });
});
```

## Következő lépések

- Next.js-szel SSR/SSG implementálás
- React Query/SWR data fetching optimalizálás
- React Hook Form komplex form kezeléshez
- Storybook component documentation
- E2E testing Cypress-szel
