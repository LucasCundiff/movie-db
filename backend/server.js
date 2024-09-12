const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const config = require('./config.js');

const app = express();
const port = config.server_port;

app.use(cors());
app.use(express.json());

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: config.server_host,
  user: config.server_user,
  password: config.server_password,
  database: config.database_name,
}).promise();

// Route to get all movies with genres and actors
app.get('/api/movies', async (req, res) => {
  try {
    const [movies] = await pool.query(`
      SELECT 
        m.movie_id, m.title, m.image, m.description, m.rating, m.releaseYear,
        GROUP_CONCAT(DISTINCT g.genre_name) AS genres,
        GROUP_CONCAT(DISTINCT a.name) AS actors
      FROM Movies m
      LEFT JOIN Movie_Genres mg ON m.movie_id = mg.movie_id
      LEFT JOIN Genres g ON mg.genre_id = g.genre_id
      LEFT JOIN Movie_Actors ma ON m.movie_id = ma.movie_id
      LEFT JOIN Actors a ON ma.actor_id = a.actor_id
      GROUP BY m.movie_id
    `);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to add a movie
app.post('/api/movies', async (req, res) => {
  const { title, image, description, rating, releaseYear, genres, actors } = req.body;

  try {
    // Insert movie into the Movies table
    const [movieResult] = await pool.query(
      'INSERT INTO Movies (title, image, description, rating, releaseYear) VALUES (?, ?, ?, ?, ?)',
      [title, image, description, rating, releaseYear]
    );
    const movieId = movieResult.insertId;

    // Handle genres
    const genreList = genres.split(',').map(genre => genre.trim());
    for (const genreName of genreList) {
      let [genreResult] = await pool.query('SELECT genre_id FROM Genres WHERE genre_name = ?', [genreName]);
      if (genreResult.length === 0) {
        const [insertGenreResult] = await pool.query('INSERT INTO Genres (genre_name) VALUES (?)', [genreName]);
        genreResult = [{ genre_id: insertGenreResult.insertId }];
      }
      const genreId = genreResult[0].genre_id;
      await pool.query('INSERT INTO Movie_Genres (movie_id, genre_id) VALUES (?, ?)', [movieId, genreId]);
    }

    // Handle actors
    const actorList = actors.split(',').map(actor => actor.trim());
    for (const actorName of actorList) {
      let [actorResult] = await pool.query('SELECT actor_id FROM Actors WHERE name = ?', [actorName]);
      if (actorResult.length === 0) {
        const [insertActorResult] = await pool.query('INSERT INTO Actors (name) VALUES (?)', [actorName]);
        actorResult = [{ actor_id: insertActorResult.insertId }];
      }
      const actorId = actorResult[0].actor_id;
      await pool.query('INSERT INTO Movie_Actors (movie_id, actor_id) VALUES (?, ?)', [movieId, actorId]);
    }

    res.status(201).json({ message: 'Movie added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});