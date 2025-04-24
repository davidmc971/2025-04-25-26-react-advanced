import { useState } from "react";
import { addMovie, getMovies, resetMovies } from "../dataHandler";
import MovieItemElement from "./MovieItemElement";
import MovieItemEdit from "./MovieItemEdit";

export default function MovieList({ onlyShowFavorites = false }) {
  const [movies, setMovies] = useState(getMovies());

  const handleAddMovie = () => {
    setMovies(
      addMovie({
        title: "New movie",
        description: "New description",
        rating: 0,
      })
    );
  };

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
