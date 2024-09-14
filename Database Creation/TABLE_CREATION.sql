CREATE TABLE Actors (
    actor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE Genres (
    genre_id INT AUTO_INCREMENT PRIMARY KEY,
    genre_name VARCHAR(100) NOT NULL
);

CREATE TABLE Movies (
	movie_id INT auto_increment primary key,
	title VARCHAR(255),
    image VARCHAR(255),
    description VARCHAR(255),
    rating INT,
    releaseYear INT
);

CREATE TABLE Movie_Actors (
    movie_id INT,
    actor_id INT,
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id),
    FOREIGN KEY (actor_id) REFERENCES Actors(actor_id),
    PRIMARY KEY (movie_id, actor_id)
);

CREATE TABLE Movie_Genres (
    movie_id INT,
    genre_id INT,
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id),
    FOREIGN KEY (genre_id) REFERENCES Genres(genre_id),
    PRIMARY KEY (movie_id, genre_id)
);
