import { useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import Sidebar from "./components/Sidebar";
import FilterPanel from "./components/FilterPanel";
function App() {
  const [inputValue, setInputValue] = useState("");
  const [hide, setHide] = useState(false);
  const [todoShow, setTodoShow] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const [todoList, setTodoList] = useState([
    {
      id: 1,
      text: "Task 1",
      isCompleted: false,
      isImportant: false,
    },
    {
      id: 2,
      text: "Task 2",
      isCompleted: false,
      isImportant: true,
    },
  ]);

  // Add a new todo
  const handleAddTodo = () => {
    if (inputValue) {
      const newTodo = {
        id: crypto.randomUUID(),
        text: inputValue,
        isCompleted: false,
        isImportant: false,
      };
      setTodoList([...todoList, newTodo]);
      setInputValue("");
    }
  };

  // Check a todo
  const handleCheckTodo = (id) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  // Show sidebar
  const handleshow = () => {
    setHide(!hide);
  };

  // Edit a todo
  const handleEdit = (id) => {
    const newTodoList = todoList.find((todo) => {
      if (todo.id === id) {
        return todo;
      }
    });
    setTodoShow(newTodoList);
    setHide(true);
  };

  // Update a todo
  const handleUpdate = (newTodo) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === newTodo.id) {
        return newTodo;
      }
      return todo;
    });
    setTodoList(newTodoList);
    setHide(false);
  };

  // Delete a todo
  const handleDelete = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
  };
  return (
    <div className="container">
      <FilterPanel
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <h1>Todo App</h1>
      <div className="form__input">
        <input
          type="text"
          placeholder="Add a new task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <div className="todo__list">
        {todoList.length ? (
          todoList.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onCheckTodo={handleCheckTodo}
              onHandleEdit={handleEdit}
              onHandleDelete={handleDelete}
            />
          ))
        ) : (
          <h1>No task</h1>
        )}
      </div>
      {hide && (
        <Sidebar
          key={todoShow.id}
          todo={todoShow}
          onHandleshow={handleshow}
          onHandleUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default App;
