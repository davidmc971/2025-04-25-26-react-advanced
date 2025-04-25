import { useState } from "react";
import { addMovie, addMovies, getMovies, resetMovies } from "../dataHandler";
import MovieItemElement from "./MovieItemElement";
import MovieItemEdit from "./MovieItemEdit";
import { useEffect } from "react";

/**
 * @import { Dispatch, SetStateAction } from "react"
 */

/**
 * @typedef {Object} TMDBMovie
 * @property {number} id
 * @property {string} title
 * @property {number[]} genre_ids
 * @property {string} overview
 * @property {number} vote_average
 */

/**
 * @typedef {Object} Genre
 * @property {number} id
 * @property {string} name
 */

export default function MovieList({ onlyShowFavorites = false }) {
  const [movies, setMovies] = useState(getMovies());
  /** @type {[Genre[], Dispatch<SetStateAction<Genre[]>>]} */
  const [genres, setGenres] = useState([]);
  /** @type {[number | null, Dispatch<SetStateAction<number | null>>]} */
  const [selectedGenre, setSelectedGenre] = useState(null);

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
              genres: m.genre_ids,
              favorite: false,
            }))
          )
        );
      });
  }, []);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/movie/list", {
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
        /** @type {Genre[]} */
        const fetchedGenres = data.genres;
        setGenres(fetchedGenres);
      })
      .catch((error) => {
        if (error !== "useEffect cleanup") {
          console.error(error);
        }
      });
  }, []);

  return (
    <>
      {!onlyShowFavorites && (
        <>
          <button onClick={handleAddMovie}>Add movie</button>
          <select
            value={selectedGenre || "null"}
            onChange={(e) => {
              let next = e.target.value;
              if (next === "null") next = null;
              setSelectedGenre(next);
            }}
          >
            <option value={"null"}>All genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </>
      )}

      <ul>
        {selectedGenre}
        {movies
          .filter((m) => {
            if (onlyShowFavorites) return m.favorite;
            console.log(selectedGenre);
            if (selectedGenre != null)
              return (m.genres ?? []).includes(selectedGenre);
            return true;
          })
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
