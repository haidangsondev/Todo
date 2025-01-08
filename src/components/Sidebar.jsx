import PropTypes from "prop-types";
import { useState } from "react";

function Sidebar({ todo, onHandleshow, onHandleUpdate }) {
  const [inputValue, setInputValue] = useState(todo.text);
  const [isImportant, setIsImportant] = useState(todo.isImportant);
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

  const handleUpdate = () => {
    const data = { ...todo, text: inputValue, isImportant, isCompleted };
    onHandleUpdate(data);
  };
  return (
    <div className="sidebar">
      <div className="form__update">
        <label>
          <p>Name</p>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
        </label>
        <label>
          <p>Important</p>
          <input
            type="checkbox"
            checked={isImportant}
            onChange={() => setIsImportant(!isImportant)}
          />
        </label>
        <label>
          <p>Completed</p>
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => setIsCompleted(!isCompleted)}
          />
        </label>
      </div>
      <div className="form_handle">
        <button className="btn-success" onClick={handleUpdate}>
          Update
        </button>
        <button className="btn-error" onClick={onHandleshow}>
          Cancel
        </button>
      </div>
    </div>
  );
}
Sidebar.propTypes = {
  todo: PropTypes.shape({
    text: PropTypes.string.isRequired,
    isImportant: PropTypes.bool.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }).isRequired,
  onHandleshow: PropTypes.func.isRequired,
  onHandleUpdate: PropTypes.func.isRequired,
};
export default Sidebar;
