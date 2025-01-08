import PropTypes from "prop-types";

function TodoItem({ todo, onCheckTodo, onHandleEdit, onHandleDelete }) {
  return (
    <div className="todo__item">
      <div className="todo__left">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => onCheckTodo(todo.id)}
        />
        <p>{todo.text}</p>
      </div>
      <div className="todo__right">
        <div className="todo__important">{todo.isImportant && "💚"}</div>
        <button className="btn-change" onClick={() => onHandleEdit(todo.id)}>
          Edit
        </button>
        <button className="btn-error" onClick={() => onHandleDelete(todo.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    isImportant: PropTypes.bool.isRequired,
  }).isRequired,
  onCheckTodo: PropTypes.func.isRequired,
  onHandleEdit: PropTypes.func.isRequired,
  onHandleDelete: PropTypes.func.isRequired,
};

export default TodoItem;
