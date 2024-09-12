import React, { useState } from 'react';

const AddMovieForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    description: '',
    rating: 0,
    releaseYear: 0,
    genres: '',
    actors: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setError(null);
      } else {
        const { error } = await response.json();
        setError(error);
      }
    } catch (err) {
      setError('Failed to add movie');
    }
  };

  return (
    <div>
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <input type="number" name="rating" placeholder="Rating" value={formData.rating} onChange={handleChange} />
        <input type="number" name="releaseYear" placeholder="Release Year" value={formData.releaseYear} onChange={handleChange} />
        <input type="text" name="genres" placeholder="Genres (comma-separated)" value={formData.genres} onChange={handleChange} />
        <input type="text" name="actors" placeholder="Actors (comma-separated)" value={formData.actors} onChange={handleChange} />
        <button type="submit">Add Movie</button>
      </form>

      {success && <p>Movie added successfully!</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default AddMovieForm;
