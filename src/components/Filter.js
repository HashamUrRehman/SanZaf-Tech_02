import React from 'react';

const Filter = ({ search, handleSearch }) => {
  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Search posts"
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Filter;
