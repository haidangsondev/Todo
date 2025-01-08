import { memo } from "react";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";

const TodoList = memo(
  ({
    inputValue,
    setInputValue,
    handleAddTodo,
    todoList,
    handleCheckTodo,
    handleEdit,
    handleDelete,
    todos,
  }) => {
    return (
      <>
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
            todos.map((todo) => (
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
      </>
    );
  }
);
TodoList.propTypes = {
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  handleAddTodo: PropTypes.func.isRequired,
  todoList: PropTypes.array.isRequired,
  handleCheckTodo: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired,
};

TodoList.displayName = "TodoList";
TodoList.displayName = "TodoList";

export default TodoList;
