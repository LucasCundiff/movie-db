import React, { useState } from 'react';

interface FilterOptionsProps {
  onFilter: (filters: any) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    genre: '',
    releaseYear: '',
    rating: '',
    actors: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="genre"
        placeholder="Genre"
        value={filters.genre}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="releaseYear"
        placeholder="Release Year"
        value={filters.releaseYear}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="rating"
        placeholder="Rating"
        value={filters.rating}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="actors"
        placeholder="Actors"
        value={filters.actors}
        onChange={handleInputChange}
      />
      <button type="submit">Apply Filters</button>
    </form>
  );
};

export default FilterOptions;
