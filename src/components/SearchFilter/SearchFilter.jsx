import React, { useState } from "react";
import { categories } from "../../Data/dummyData";

export default function SearchFilter({ setFilterOptions, resetFilters }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedDistance, setSelectedDistance] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    setSelectedPriceRange(parseInt(e.target.value));
  };

  const handleDistanceChange = (e) => {
    setSelectedDistance(parseInt(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilterOptions({
      category: selectedCategory,
      priceRange: selectedPriceRange,
      distance: selectedDistance,
    });
  };

  const handleReset = () => {
    // to check if reset is working with button
    console.log("Resetting filters...");
    setSelectedCategory("");
    setSelectedPriceRange(0);
    setSelectedDistance(0);
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
            <label name="category">Category:</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
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
          <div className="filter-item">
            <label name="distance">Distance:</label>
            <input
              type="range"
              id="distance"
              min="0"
              max="50"
              value={selectedDistance}
              onChange={handleDistanceChange}
            />
            <span>{selectedDistance} km</span>
          </div>
          <button type="submit">Apply Filters</button>
          <button onClick={handleReset}>Reset</button>
        </form>
      )}
    </div>
  );
}
