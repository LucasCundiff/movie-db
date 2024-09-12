import React, { useState } from 'react';
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';
import SortOptions from './components/SortOptions';
import FilterOptions from './components/FilterOptions';
import AddMovieForm from './components/AddMovieForm';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [filters, setFilters] = useState({
    genre: '',
    releaseYear: '',
    rating: '',
    actors: ''
  });

    // Convert releaseYear and rating to numbers before passing them to MovieList
    const numericFilters = {
      ...filters,
      releaseYear: filters.releaseYear ? parseInt(filters.releaseYear) : undefined,
      rating: filters.rating ? parseInt(filters.rating) : undefined,
    };
  
    return (
      <div>
        <SearchBar onSearch={setSearchTerm} />
        <SortOptions onSort={setSortOption} />
        <FilterOptions onFilter={setFilters} />
        <MovieList searchTerm={searchTerm} sortOption={sortOption} filters={numericFilters} />
      <AddMovieForm />
    </div>
  );
};

export default App;
