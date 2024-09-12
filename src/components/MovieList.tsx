import React, { useState, useEffect } from 'react';
import { Movie } from '../types/Movie';
import { Filters } from '../types/Filters'// Assuming we create a Filters.ts file for the filters interface

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
        (filters.genre ? movie.genres.includes(filters.genre) : true) &&
        (filters.actors ? movie.actors.includes(filters.actors) : true) &&
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


  if (loading) return <div>Loading movies...</div>;
  if (error) return <div>{error}</div>;

  const filteredMovies = filterMovies(movies, searchTerm, filters);
  const sortedMovies = sortMovies(filteredMovies, sortOption);

  if (sortedMovies.length === 0) {
    return <div>No movies match your search or filter criteria.</div>;
  }

  return (
    <div>
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
                <p>Genres: {movie.genres.split(',').join(', ')}</p>
                <p>Actors: {movie.actors.split(',').join(', ')}</p>
                <p>{movie.description}</p>
                <p>Rating: {movie.rating}</p>
                <p>Release Year: {movie.releaseYear}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
