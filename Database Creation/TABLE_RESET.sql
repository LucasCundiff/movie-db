DELETE FROM movie_actors;
DELETE FROM movie_genres;
DELETE FROM movies;
DELETE FROM actors;
DELETE FROM genres;

SET FOREIGN_KEY_CHECKS = 0;

ALTER TABLE Movies AUTO_INCREMENT = 1;
ALTER TABLE Actors AUTO_INCREMENT = 1;
ALTER TABLE Genres AUTO_INCREMENT = 1;
ALTER TABLE Movie_Actors AUTO_INCREMENT = 1;
ALTER TABLE Movie_Genres AUTO_INCREMENT = 1;

SET FOREIGN_KEY_CHECKS = 1;