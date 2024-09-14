import React, { useState, useEffect } from 'react';
import { Movie } from '../types/Movie';
import { Filters } from '../types/Filters'

interface MovieListProps {
  searchTerm: string;
  sortOption: string;
  filters: Filters;
}

const MovieList: React.FC<MovieListProps> = ({ searchTerm, sortOption, filters }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null); // Stores only the movie ID for better toggle handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const imageHeight = 200;
  const imageWidth = 150;

  useEffect(() => {
    fetch('http://localhost:5000/api/movies')
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch movies');
        setLoading(false);
      });
  }, []);

  // Helper function to handle toggling movie details visibility
  const toggleMovieDetails = (id: number) => {
    setSelectedMovie((prevId) => (prevId === id ? null : id));
  };

  // Function to filter movies
  const filterMovies = (movies: Movie[], searchTerm: string, filters: Filters): Movie[] => {
    return movies.filter(movie => {
      return (
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filters.genre ? movie.genres.toLowerCase().includes(filters.genre.toLowerCase()) : true) &&
        (filters.actors ? movie.actors.toLowerCase().includes(filters.actors.toLowerCase()) : true) &&
        (filters.rating ? movie.rating === filters.rating : true) &&
        (filters.releaseYear ? movie.releaseYear === filters.releaseYear : true)
      );
    });
  };

  // Function to sort movies
  const sortMovies = (movies: Movie[], sortOption: string): Movie[] => {
    return movies.sort((a, b) => {
      switch (sortOption) {
        case 'rating-asc':
          return a.rating - b.rating;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'year-asc':
          return a.releaseYear - b.releaseYear;
        case 'year-desc':
          return b.releaseYear - a.releaseYear;
        default:
          return 0;
      }
    });
  };


  if (loading) return <div className="loading">Loading movies...</div>;
  if (error) return <div className='loading'>{error}</div>;

  const filteredMovies = filterMovies(movies, searchTerm, filters);
  const sortedMovies = sortMovies(filteredMovies, sortOption);

  if (sortedMovies.length === 0) {
    return <div className='no-results'>No movies match your search or filter criteria.</div>;
  }

  return (
    <div className="movie-grid">
      {sortedMovies.map((movie) => (
        <div key={movie.movie_id}>
          <img
            src={movie.image}
            alt={movie.title}
            height={imageHeight}
            width={imageWidth}
            onClick={() => toggleMovieDetails(movie.movie_id)}
            style={{ cursor: 'pointer' }}
          />
          {selectedMovie === movie.movie_id && (
            <div className="movie-detail">
              <h2>{movie.title}</h2>
              <p><strong>Genres:</strong> {movie.genres.split(',').join(', ')}</p>
              <p><strong>Actors:</strong> {movie.actors.split(',').join(', ')}</p>
              <p><strong>Description:</strong> {movie.description}</p>
              <p><strong>Rating:</strong> {movie.rating}/10</p>
              <p><strong>Release Year:</strong> {movie.releaseYear}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MovieList;
