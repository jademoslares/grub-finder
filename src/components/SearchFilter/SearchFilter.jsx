import React, { useState } from "react";
import { cuisine } from "../../Data/dummyData";

export default function SearchFilter({ setFilterOptions, resetFilters }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    setSelectedPriceRange(parseInt(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilterOptions({
      cuisine: selectedCategory,
      priceRange: selectedPriceRange,
    });
  };

  const handleReset = () => {
    // to check if reset is working with button
    setSelectedCategory("");
    setSelectedPriceRange(0);
    resetFilters();
  };

  const toggleFilterVisibility = () => {
    setFilterVisible(!filterVisible);
  };

  return (
    <div className="searchFilter">
      <button onClick={toggleFilterVisibility}>
        {filterVisible ? "Hide Filters" : "Show Filters"}
      </button>
      {filterVisible && (
        <form onSubmit={handleSubmit}>
          <div className="filter-item">
            <label name="cuisine">Cuisine:</label>
            <select
              id="cuisine"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Select Cuisine</option>
              {cuisine.map((cuisine) => (
                <option key={cuisine.id} value={cuisine.name}>
                  {cuisine.name}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-item">
            <label name="price">Price Range:</label>
            <input
              type="range"
              id="price"
              min="0"
              max="100"
              value={selectedPriceRange}
              onChange={handlePriceChange}
            />
            <span>${selectedPriceRange}</span>
          </div>
          <button type="submit">Apply Filters</button>
          <button onClick={handleReset}>Reset</button>
        </form>
      )}
    </div>
  );
}
