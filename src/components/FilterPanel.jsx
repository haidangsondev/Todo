import { useState } from "react";
import PropTypes from "prop-types";

function FilterPanel({ selectedFilter, setSelectedFilter }) {
  const [filterList] = useState([
    { id: 1, text: "All", icon: "🎁" },
    { id: 2, text: "Important", icon: "😍" },
    { id: 3, text: "Completed", icon: "🎉" },
    { id: 4, text: "Deleted", icon: "🗑️" },
  ]);
  return (
    <div className="filter">
      <input type="text" placeholder="search..." />
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
              <p>20</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
FilterPanel.propTypes = {
  selectedFilter: PropTypes.string.isRequired,
  setSelectedFilter: PropTypes.func.isRequired,
};

export default FilterPanel;
