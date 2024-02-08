import React, {
  useReducer,
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
  useCallback,
} from 'react';

import PropTypes from 'prop-types';

// Define an empty array as the initial state for todos.
const initialState = [];

// Create a context for global state management of todos with a default dispatch function.
const TodoContext = createContext({
  todos: [],
  dispatch: () => null,
});

// Reducer function to update state based on action type.
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': // Adds a new todo to the list
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ];
    case 'TOGGLE': // Toggles the completed status of a todo
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'DELETE': // Removes a todo from the list
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};

// Function to initialize todos from localStorage or use initial state if not available.
const init = () => {
  const storedTodos = JSON.parse(localStorage.getItem('commented-todos')) || [];
  return storedTodos;
};

function TodoList() {
  // Initialize todos state with reducer, use local storage data or fallback to initial state.
  const [todos, dispatch] = useReducer(todoReducer, [], init);
  const [filter, setFilter] = useState('all'); // State for current filter selection
  const [inputValue, setInputValue] = useState(''); // State for input field value

  // Effect to update localStorage whenever todos state changes, with debounce.
  useEffect(() => {
    const handler = setTimeout(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }, 500);
    return () => clearTimeout(handler); // Cleanup timeout on effect cleanup or todos change
  }, [todos]);

  // Callback to add a new todo, triggered by button click, uses inputValue for todo text.
  const addTodo = useCallback(() => {
    if (!inputValue.trim()) return; // Ignore empty input
    dispatch({ type: 'ADD', payload: inputValue });
    setInputValue(''); // Clear input field after adding todo
  }, [inputValue]);

  // Memoized value to filter todos based on the current filter state.
  const filteredTodos = useMemo(
    () =>
      todos.filter((todo) => {
        switch (filter) {
          case 'active': // Show only incomplete todos
            return !todo.completed;
          case 'completed': // Show only completed todos
            return todo.completed;
          default:
            // Show all todos
            return true;
        }
      }),
    [todos, filter]
  );

  return (
    // Provide global state and dispatcher to the component tree.
    <TodoContext.Provider value={{ todos, dispatch }}>
      <div>
        <input
          type="text"
          value={inputValue}
          // Update inputValue on input change
          onChange={(e) => setInputValue(e.target.value)}
        />
        {/* Button to trigger addTodo */}
        <button onClick={addTodo}>Add Todo</button>
        <div>
          {/* Buttons to change the current filter */}
          Filter:
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('active')}>Active</button>
          <button onClick={() => setFilter('completed')}>Completed</button>
        </div>
        <ul>
          {/* Render list of todos based on filter */}
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </div>
    </TodoContext.Provider>
  );
}

// Individual todo item component, shows todo text, completion status, and delete button.
const TodoItem = ({ todo }) => {
  const { dispatch } = useContext(TodoContext); // Access dispatch function from context

  // Callback to toggle completion status of todo, linked to todo text click.
  const toggleTodoCompletion = useCallback(() => {
    dispatch({ type: 'TOGGLE', payload: todo.id });
  }, [todo.id, dispatch]);

  // Callback to delete a todo, triggered by delete button.
  const deleteTodo = useCallback(() => {
    dispatch({ type: 'DELETE', payload: todo.id });
  }, [todo.id, dispatch]);

  return (
    <li
      style={{
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      onClick={toggleTodoCompletion}
    >
      <span>
        {todo.text} {todo.completed ? '(Completed)' : ''}
      </span>
      <button
        onClick={deleteTodo}
        style={{ marginLeft: '10px', backgroundColor: 'darkred' }}
      >
        X
      </button>
    </li>
  );
};

// Define expected prop types for TodoItem for validation.
TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoList;
