import { useState } from "react";
import { addMovie, addMovies, getMovies, resetMovies } from "../dataHandler";
import MovieItemElement from "./MovieItemElement";
import MovieItemEdit from "./MovieItemEdit";
import { useEffect } from "react";

/**
 * @typedef {Object} TMDBMovie
 * @property {number} id
 * @property {string} title
 * @property {number[]} genre_ids
 * @property {string} overview
 * @property {number} vote_average
 */

export default function MovieList({ onlyShowFavorites = false }) {
  const [movies, setMovies] = useState(getMovies());

  // Please never commit tokens to git, this specific case is fine since I will invalidate this token after the course.
  const tmdbBearerToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzc4YTUzODZhYjc3Yzc0ZGUwMmZlYjkyMmExYTlkNiIsIm5iZiI6MTczMDg4MTAxMi4yODksInN1YiI6IjY3MmIyNWY0NTk5ZGEyODk4MDk1NDY3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XGZjafnKM69blA-N6QQ5LyTuq0w0yx3ikKimnqJiISY";

  const handleAddMovie = () => {
    setMovies(
      addMovie({
        title: "New movie",
        description: "New description",
        rating: 0,
      })
    );
  };

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/discover/movie", {
      headers: {
        Authorization: `Bearer ${tmdbBearerToken}`,
      },
    })
      .then((response) => {
        if (!response.ok)
          throw new Error("API responded with bad status: " + response.status);
        return response.json();
      })
      .catch((e) => console.error(e))
      .then((data) => {
        /** @type {TMDBMovie[]} */
        const fetchedMovies = data.results;
        setMovies(
          addMovies(
            fetchedMovies.map((m) => ({
              id: m.id,
              title: m.title,
              description: m.overview,
              rating: m.vote_average,
              favorite: false,
            }))
          )
        );
      });
  }, []);

  return (
    <>
      {!onlyShowFavorites && (
        <button onClick={handleAddMovie}>Add movie</button>
      )}

      <ul>
        {movies
          .filter((m) => (onlyShowFavorites ? m.favorite : true))
          .map((movie) => (
            <MovieItemElement
              key={movie.id}
              setMovies={setMovies}
              movie={movie}
            />
          ))}
      </ul>

      <button onClick={() => setMovies(resetMovies())}>Reset movies</button>
    </>
  );
}
