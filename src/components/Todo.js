import React, { useReducer, useEffect } from "react";
import "./Todo.css";
const initialState = {
  todos: [],
  inputValue: "",
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case "addTodo":
      return {
        ...state,
        todos: [...state.todos, action.todo],
        inputValue: "",
      };
      break;
    case "removeTodo":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo !== action.todo),
      };
      break;
    default:
      return state;
      break;
  }
};

function Todo() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const handleAddTodo = (todo) => {
    if(!state.inputValue){
      alert("add an item")
      return;
    }
    dispatch({ type: "addTodo", todo: state.inputValue });
  };

  const handleRemoveTodo = (todo) => {
    dispatch({ type: "removeTodo", todo });
  };

  useEffect(() => {
    document.getElementById('inpt').value="";
  },[state.todos]);
  return (
    <div className="todo-container">
      <div className="input-section">
        <h1>Todo</h1>
        <input
          id="inpt"
          type="text"
          placeholder="Enter Items..."
          onChange={(e) => {
            state.inputValue = e.target.value;
          }}
        />
        <button className="btn" onClick={handleAddTodo}>
          ADD
        </button>
      </div>
      <ul>
        {state.todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <i
              className="fa-solid fa-trash-can"
              onClick={() => {
                handleRemoveTodo(todo);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
