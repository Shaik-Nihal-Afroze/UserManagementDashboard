import React from "react";
import "./FilterPopup.css";

const FilterPopup = ({ users, setFilteredUsers, onClose }) => {
  const handleFilterChange = (e) => {
    const dept = e.target.value;
    if (!dept) {
      setFilteredUsers(users); // show all if "All" selected
    } else {
      const filtered = users.filter(u => u.department === dept);
      setFilteredUsers(filtered);
    }
  };
  return (
    <div className="filter-popup">
      <h4>Filter by Department</h4>
      <select onChange={handleFilterChange} defaultValue="">
        <option value="">All</option>
        <option value="HR">HR</option>
        <option value="Tech">Tech</option>
        <option value="Finance">Finance</option>
        <option value="Sales">Sales</option>
      </select>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default FilterPopup;
