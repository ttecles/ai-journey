# Master Whispers

For Group 3, which will utilize advanced prompt engineering techniques for solving code problems, the instructions should focus on leveraging more sophisticated interactions with AI models to debug and optimize code. Here are the instructions for Group 3, along with explanations on why these techniques are particularly effective:

## Advanced Prompt Engineering for Code Debugging

#### 0. Pre-context:

- **Instruction:** Before writing any other prompts, load GPT with this preparation prompt.

```
**Background:** 👨‍💻🌐🚀
- As a React and JavaScript programming master, you possess a broad spectrum of coding abilities, ready to tackle diverse programming challenges.
- You have expert knowledge of common React and JavaScript bugs
- Your areas of expertise include project design, efficient code structuring, and providing insightful guidance through coding processes with precision and clarity.

**Task Instructions:** 📋💻🔍
1. **Efficient Solutions for Simple Queries:** 🧩💡
   - Think through each problem step by step, always provide code examples, and explain each code example.
   - When faced with straightforward programming questions, provide clear, direct answers.

2. **Methodical Strategy for Complex Challenges:** 📊👣
   - **Project Structure Outline:**
     - For complex programming tasks, start by asking about the project structure, intended behaviour or directory layout.
     - Laying out this groundwork is essential for a structured approach to the coding process.
   - **Incremental Coding Process:**
     - Tackle coding in well-defined, small steps, focusing on individual components sequentially.

Please reply ONLY with 'Understood. Please provide an overview of the codes expected functionality in the next prompt.
```

- **Instruction:**: Load GPT with this next prompt

```
To create a prompt that explains the overall function of the corrected code for a Todo List application built with React, it's important to highlight key features, architectural choices, and the flow of data within the app. Here's how you might structure such a prompt:

---

**Prompt: Explain the Overall Function of a React Todo List Application**

The Todo List application is designed to provide users with an interactive interface for managing a list of tasks or "todos". It is built using React, a popular JavaScript library for building user interfaces, and employs a combination of React's core features such as components, state, and context to manage the application's data and UI state efficiently.

**Key Features and Functionality:**

- **Todo Management:** Users can add new todos to the list, mark todos as completed, and delete todos from the list. Each todo item has a text description and a completion status to indicate whether the task is done.
- **Filtering:** The application offers the ability to filter visible todos based on their completion status. Users can choose to view all todos, only the active ones, or only those that have been completed.
- **State Management:** The application's state, including the list of todos and the current filter setting, is managed using React's `useState` and `useReducer` hooks. This allows for efficient updates to the UI in response to user actions.
- **Persistence:** Todos are saved to and loaded from `localStorage`, ensuring that user data persists across browser sessions. This is achieved through React's `useEffect` hook, which synchronizes the application's state with `localStorage`.
- **Context API:** The application utilizes React's Context API to pass down the state management functions (e.g., to add, toggle, and delete todos) through the component tree without prop drilling. This simplifies data access and manipulation across components.

**Application Flow:**

1. **Initialization:** On startup, the application loads existing todos from `localStorage` and initializes its state. This includes the todos themselves and the current filter setting.
2. **User Interaction:** Users interact with the application primarily through input fields and buttons. They can:
   - Add new todos by entering text into an input field and pressing an "Add" button.
   - Toggle the completion status of a todo by clicking on it.
   - Delete a todo by clicking a "Delete" button associated with each todo item.
   - Change the visibility filter to alter which todos are displayed based on their completion status.
3. **State Updates:** User actions trigger state updates through dispatched actions handled by a reducer function. This leads to re-rendering of the UI to reflect the current state.
4. **Persistence:** Changes to the todos list are automatically saved to `localStorage`, ensuring data is retained across sessions.

Please reply with ONLY 'Understood. Please provide the source code in the next prompt. After the source code is provided, reply ONLY with 'How can I help?. DO NOT attempt to fix the code without further user prompts.'
```

- **Instruction:**: Load GPT with the source code within back ticks

```jsx
<div>Hello, Silicon Overlords!</div>
```

---

#### **1. Break Down the Problem**

- **Instruction:** Start by dividing the code into smaller, manageable sections (e.g., initialization, state management, UI rendering). Ask the AI to analyze each section individually for potential issues.
- **Why It Helps:** This technique simplifies complex problems, making it easier for both humans and AI to identify where things might be going wrong. It reduces the problem's complexity and makes it more approachable.

#### **1. Hypothetical Scenarios**

- **Instruction:** Create hypothetical modifications to the code and ask the AI about potential outcomes. For example, "What would happen if we changed the `useState` initial value for `filter` from 'all' to 'active' in the TodoList component?"
- **Why It Helps:** This encourages a deep understanding of the code's functionality and how different parts interact. It can reveal hidden dependencies or flawed logic that isn't immediately apparent.

#### **7. Validate Assumptions**

- **Instruction:** Ask the AI to validate assumptions made in the code. For instance, "Does initializing the state with an empty object in `initialState` align with how we use this state later in the code?"
- **Why It Helps:** Incorrect assumptions are a common source of bugs. Validating assumptions helps ensure that the code's foundation is solid before looking for more complex issues.

#### **2. Counterfactual Analysis**

- **Instruction:** Ask the AI to analyze how changing certain parts of the code could have prevented known bugs. For instance, "If we had used a different structure for the `initialState`, could the bug related to state initialization have been avoided?"
- **Why It Helps:** This technique helps identify the root causes of issues and reinforces best practices in structuring and initializing state, leading to more robust code.

#### **3. Exploring Alternative Solutions**

- **Instruction:** Present alternative coding patterns or libraries and ask the AI for an analysis of their pros and cons in the context of your project. For example, "How would using Redux for state management instead of `useReducer` and `Context` change the performance and maintainability of our TodoList app?"
- **Why It Helps:** This broadens the team's understanding of different approaches to solving common problems, providing insights into how architectural decisions impact an application's overall quality.

#### **4. Code Refactoring Suggestions**

- **Instruction:** Ask for specific refactoring suggestions that could improve code readability, performance, or maintainability without altering functionality. For instance, "Can we refactor the `TodoItem` component for better separation of concerns?"
- **Why It Helps:** Advanced refactoring suggestions can significantly improve code quality and developer experience. This encourages writing clean, maintainable code that's easier to debug and extend.
