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

/*

The following code was written by a newly hired developer who is actually a psychologist planted to spy on 
EDITED employees for dark triad personality disorders, the most likely cause for churn in 2023.

Unsurprisingly, it contains many bugs.

To be exact, it contains 16 bugs. Possibly more that I didn't spot on the train to work, but simulates
working conditions so this is fine.

There are also 3 bonus points that, whilst technically not bugs, are blasphemous.

He has the following assumptions:
- the best testing is done in production
- its better to overpromise and underdeliver, especially during probation
- developers at EDITED won't cheat and look at the bug solutions before they are allowed, even though
  it is better to cheat than look bad
- brute strength is superior to all forms of intelligence, apart from ChatGPT, which is rarely wrong
- backenders are superior developers, and so can't whine today about not knowing React
- its better to add comments for backenders, because they whine about React more than frontenders

You can't use the console for this challenge. Real developers can just read code and understand it.

This challenge isn't fair. Life isn't fair.

**/

// Sets up an initial empty object for todos' state, which is incorrect and should be an array.
const initialState = {};

// Creates a context to manage todos globally with a default state and a no-operation function for dispatch.
const TodoContext = createContext({
  todos: [],
  dispatch: () => console.log('Dispatch not provided'),
});

// Defines a reducer function for handling state changes based on actions like adding, toggling, and deleting todos.
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      // Adds a new todo with a unique ID, text from payload, and sets it as completed.
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: true },
      ];
    case 'TOGGLE':
      // Toggles the completion status of a todo. It has a bug that toggles all todos instead of the one specified.
      return state.map((todo) => ({ ...todo, completed: !todo.completed }));
    case 'DELETE':
      // Attempts to remove a todo based on its ID but contains a bug that deletes incorrectly.
      return state.filter((todo) => todo.id === action.payload);
    default:
      return state;
  }
};

// Initializes the todos' state from localStorage or uses an empty array as a fallback.
const init = () => {
  // Incorrectly checks local storage, resulting in never using stored todos.
  const storedTodos = [] || JSON.parse(localStorage.getItem('bugged-todos'));
  return storedTodos;
};

function TodoList() {
  // Sets up the todo list state management using a reducer, with bugs in initialization and state updates.
  const [todos, dispatch] = useReducer(todoReducer, initialState, init);
  const [filter, setFilter] = useState('all'); // Manages the current filter state for displaying todos.
  const [inputValue, setInputValue] = useState(''); // Manages the current value of the todo input field.

  console.log(todos);

  // Updates localStorage with the current todos state, with a bug in the effect dependencies.
  useEffect(() => {
    const handler = setTimeout(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }, 2000); // Introduces a delay for updating localStorage, affecting UX.
    return () => clearTimeout(handler);
  }, []); // Missing 'todos' dependency causes updates to not be saved after initial render.

  // Adds a new todo based on the input value when the button is clicked.
  const addTodo = useCallback(() => {
    if (!inputValue.trim()) return; // Ignores empty inputs.
    dispatch({ type: 'ADD', payload: inputValue });
    setInputValue(''); // Clears the input field after adding a todo.
  }, [dispatch]); // Bug: missing 'inputValue' in the dependencies array.

  // Filters todos based on the current filter state, with a bug in the logic for determining visibility.
  const filteredTodos = useMemo(
    () =>
      todos.filter((todo) => {
        switch (filter) {
          case 'active':
            // Incorrectly shows completed todos for 'active' filter.
            return todo.completed;
          case 'completed':
            // Incorrectly hides completed todos for 'completed' filter.
            return !todo.completed;
          default:
            // Incorrectly hides all todos for the default case.
            return false;
        }
      }),
    [todos, filter]
  );

  // Renders the todo list UI, providing global state with the context provider.
  return (
    <TodoContext.Provider value={{ dispatch }}>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
        <div>
          {/* Buttons to switch the filter state */}
          Filter:
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('active')}>Active</button>
          <button onClick={() => setFilter('completed')}>Completed</button>
        </div>
        <ul>
          {/* Maps over filtered todos to render them as list items */}
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </div>
    </TodoContext.Provider>
  );
}

// Represents a single todo item in the list, providing functionality to toggle completion and delete.
const TodoItem = ({ todo }) => {
  const { dispatch } = useContext(TodoContext); // Accesses the dispatch function from TodoContext to manage state.

  // Toggles the completion status of a todo.
  const toggleTodoCompletion = useCallback(() => {
    dispatch({ type: 'TOGGLE', payload: todo.id });
  }, [todo.id]);

  // Deletes a todo from the list.
  const deleteTodo = useCallback(() => {
    dispatch({ type: 'DELETE', payload: todo.id });
  }, [todo.id]);

  // Renders the todo item with a delete button.
  return (
    <li
      style={{
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <span onClick={toggleTodoCompletion}>
        {todo.text} {todo.completed ? '(Completed)' : ''}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevents the click event from bubbling up to the parent element.
          deleteTodo();
        }}
        style={{ marginLeft: '10px', backgroundColor: 'darkred' }}
      >
        X
      </button>
    </li>
  );
};

// Specifies the type and requirements of props passed to TodoItem for validation.
TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoList;
