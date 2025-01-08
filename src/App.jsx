import { useState, useMemo } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import FilterPanel from "./components/FilterPanel";
import TodoList from "./components/TodoList";
function App() {
  const [inputValue, setInputValue] = useState("");
  const [hide, setHide] = useState(false);
  const [todoShow, setTodoShow] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      text: "Task 1",
      isCompleted: false,
      isImportant: false,
      isDeleted: false,
    },
    {
      id: 2,
      text: "Task 2",
      isCompleted: false,
      isImportant: true,
      isDeleted: false,
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
        isDeleted: false,
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

  const todos = useMemo(
    () =>
      todoList.filter((todo) => {
        if (!todo.text.includes(search)) {
          return false;
        }
        switch (selectedFilter) {
          case "All":
            return true;
          case "Important":
            return todo.isImportant;
          case "Completed":
            return todo.isCompleted;
          case "Deleted":
            return todo.isDeleted;
          default:
            return true;
        }
      }),
    [todoList, selectedFilter, search]
  );

  return (
    <div className="container">
      <FilterPanel
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        todoList={todoList}
        setSearch={setSearch}
      />
      <TodoList
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleAddTodo={handleAddTodo}
        todoList={todoList}
        handleCheckTodo={handleCheckTodo}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        todos={todos}
      />
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
