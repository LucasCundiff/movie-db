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
      <div className="container">
        <h1 style={{textAlign: 'center'}}>Movie Database App</h1>
        <div className="search-bar">
          <h3>Search</h3>
          <SearchBar onSearch={setSearchTerm} />
        </div>
        <div className="sort-options">
          <h3>Sort</h3>
          <SortOptions onSort={setSortOption} />
        </div>
        <div className="filter-options">
          <h3>Filter Options</h3>
          <FilterOptions onFilter={setFilters} />
        </div>
        <div>
          <h1 style={{paddingTop: 50}}>Movies</h1>
          <MovieList searchTerm={searchTerm} sortOption={sortOption} filters={numericFilters} />
        </div>
        <div className="add-movie-form">
          <h1 style={{paddingTop: 50}}>Add a Movie</h1>
          <AddMovieForm />
        </div>
      </div>
    );
};

export default App;
