import { useState, memo, useMemo } from "react";
import PropTypes from "prop-types";

const FilterPanel = memo(function FilterPanel({
  selectedFilter,
  setSelectedFilter,
  todoList,
  setSearch,
}) {
  const [filterList] = useState([
    { id: 1, text: "All", icon: "🎁" },
    { id: 2, text: "Important", icon: "😍" },
    { id: 3, text: "Completed", icon: "🎉" },
    { id: 4, text: "Deleted", icon: "🗑️" },
  ]);

  const countFilter = useMemo(
    () =>
      todoList.reduce(
        (acc, item) => {
          let result = { ...acc };
          if (item.isCompleted) {
            return (result = { ...result, Completed: result.Completed + 1 });
          }
          if (item.isImportant) {
            return (result = { ...result, Important: result.Important + 1 });
          }
          if (item.isDeleted) {
            return (result = { ...result, Deleted: result.Deleted + 1 });
          }
          return result;
        },
        { All: todoList.length, Important: 0, Completed: 0, Deleted: 0 }
      ),
    [todoList]
  );

  return (
    <div className="filter">
      <input
        type="text"
        placeholder="search..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="filter__choose">
        {filterList.map((filter) => (
          <div
            className={`filter__item ${
              selectedFilter === filter.text ? "selected" : ""
            }`}
            onClick={() => setSelectedFilter(filter.text)}
            key={filter.id}
          >
            <div className="filter__icon">{filter.icon}</div>
            <div className="filter__main">
              <p>{filter.text}</p>
              <p>{countFilter[filter.text]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

FilterPanel.propTypes = {
  selectedFilter: PropTypes.string.isRequired,
  setSelectedFilter: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      isCompleted: PropTypes.bool,
      isImportant: PropTypes.bool,
      isDeleted: PropTypes.bool,
    })
  ).isRequired,
};

export default FilterPanel;
