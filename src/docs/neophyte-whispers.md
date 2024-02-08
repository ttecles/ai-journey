# Neophyte Whispers

Basic Prompt Engineering for Code Debugging

#### **1. Use Specific Questions**

- **Instruction:** Instead of asking general questions like "What's wrong with this code?", ask specific questions about each part of the code, such as "Is the `useEffect` dependency array correctly set up for updating localStorage?".
- **Why It Helps:** Specific questions help focus the AI's attention on particular aspects of the code, leading to more accurate and helpful responses. It avoids the AI providing generic advice that might not be applicable.

#### **2. Describe the Expected Behavior vs Actual Behaviour**

- **Instruction:** Clearly describe what each part of the code is supposed to do, vs what it is actually doing. For example, "The `addTodo` function should add a new todo item with `completed` set to `false`.
- **Why It Helps:** Providing the expected behavior helps the AI understand the code's intent, making it easier to spot discrepancies between what's intended and what the code actually does.

#### **3. Ask for Best Practices**

- **Instruction:** Ask the AI to suggest best practices for certain patterns found in the code. For instance, "What are the best practices for using `useEffect` to synchronize React state with localStorage?"
- **Why It Helps:** This can highlight areas where the code deviates from common best practices, which might be the source of bugs or inefficiencies. It also educates the team on how to avoid similar issues in the future.

#### **4. Incremental Improvement Suggestions**

- **Instruction:** Ask the AI for suggestions on how to incrementally improve specific parts of the code, without rewriting it completely. For example, "How can we improve the `todoReducer` function to handle actions correctly or more efficiently?"
- **Why It Helps:** Incremental improvements are easier to implement and test, reducing the risk of introducing new bugs. This approach fosters continuous improvement and learning.

#### **5. Code Review Questions**

- **Instruction:** Pretend you're conducting a code review and ask the AI questions you would typically ask during a review. For example, "Are there any unnecessary dependencies in the `useEffect` hooks?"
- **Why It Helps:** This encourages a critical examination of the code, similar to what a human reviewer might do. It can uncover subtle issues that are not immediately obvious.

### Conclusion

By following these instructions, Group 2 will learn how to effectively use basic prompt engineering techniques to debug and improve their code with AI assistance. These techniques emphasize specificity, clarity, and a structured approach to problem-solving, which are key to effectively leveraging AI for code debugging.
