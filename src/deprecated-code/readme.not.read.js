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

const initialState = {}; // Bug 1: initialState is incorrect data type

const TodoContext = createContext({
  todos: [], // Bug 2: Default context value doesn't match the expected structure (missing dispatch).
  dispatch: () => console.log('Dispatch not provided'), // Changed to log for debugging, overlooked in PR
});

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          id: new Date(Date.now()).toISOString(),
          text: action.payload,
          completed: true,
        },
      ]; // BUG 17: uses a date string for the todo id. This is not a good idea.
    case 'TOGGLE':
      // Bug 3: Incorrectly toggles todos not matching the payload.
      return state.map((todo) => ({ ...todo, completed: !todo.completed }));
    case 'DELETE':
      // Bug 4: Will delete all todos except the todo intended for deletion
      return state.filter((todo) => todo.id === action.payload);
    default:
      return state;
  }
};

const init = () => {
  const storedTodos = [] || JSON.parse(localStorage.getItem('bugged-todos')); // Bug 5: never uses local storage
  return storedTodos;
};

function TodoList() {
  const [todos, dispatch] = useReducer(todoReducer, initialState, init); // Bug 6: initialState passed directly
  const [filter, setFilter] = useState('all');
  const [inputValue, setInputValue] = useState('');

  console.log(todos); // Bonus 1: leaving logs in prod code

  useEffect(() => {
    const handler = setTimeout(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }, 2000); // Bug 7: UX update delay too long
    return () => clearTimeout(handler);
  }, []); // Bug 8: Missing dependency on 'todos'.

  const addTodo = useCallback(() => {
    if (!inputValue.trim()) return;
    dispatch({ type: 'ADD', payload: inputValue });
    setInputValue('');
  }, [dispatch]); // BUG 9: Missing dependency on 'inputValue'.

  const filteredTodos = useMemo(
    () =>
      todos.filter((todo) => {
        switch (filter) {
          case 'active':
            return todo.completed;
          case 'completed':
            return !todo.completed;
          default:
            return false; // Bug 10: Logic inverted or incorrect, would hide all todos by default
        }
      }),
    [todos, filter]
  );

  return (
    // BUG 11: fails to pass todos state to state management
    <TodoContext.Provider value={{ dispatch }}>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
        <div>
          Filter:
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('active')}>Active</button>
          <button onClick={() => setFilter('completed')}>Completed</button>
        </div>
        <ul>
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </div>
    </TodoContext.Provider>
  );
}

const TodoItem = ({ todo }) => {
  const { dispatch } = useContext(TodoContext);

  const toggleTodoCompletion = useCallback(() => {
    dispatch({ type: 'TOGGLE', payload: todo.id });
  }, [todo.id]); // Bug 12: Missing 'dispatch' in the dependency array.

  const deleteTodo = useCallback(() => {
    dispatch({ type: 'DELETE', payload: todo.id });
  }, [todo.id]); // Bug 13: Similarly, missing 'dispatch'.

  return (
    <li
      style={{
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      // Bonus 2: inline styles bad
    >
      {/* BUG 14: Only completes on clicking todo text and not UI component */}
      <span onClick={toggleTodoCompletion}>
        {todo.text} {todo.completed ? '(Completed)' : ''}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation(); // BUG 15: prematurely stops click event
          deleteTodo();
        }}
        style={{ marginLeft: '10px', backgroundColor: 'darkred' }} // Bonus 3: inline styles bad
      >
        X
      </button>
    </li>
  );
};

TodoItem.prpTypes = {
  // BUG 16: typo prevents any useful prop checking
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoList;
