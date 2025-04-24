import { useState } from "react";
import {
  deleteMovie,
  rateMovie,
  toggleFavoriteById,
  updateMovie,
} from "../dataHandler";
import MovieItemEdit from "./MovieItemEdit";

export default function MovieItemElement({ movie, setMovies }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingRating, setIsEditingRating] = useState(false);

  const [editedMovieRating, setEditedMovieRating] = useState(movie.rating);

  const handleSubmitEdit = (movie) => {
    setMovies(updateMovie(movie));
    setIsEditing(false);
  };

  const handleSubmitRating = (id) => {
    setMovies(rateMovie(id, editedMovieRating));
    setIsEditingRating(false);
  };

  const handleDelete = () => {
    setMovies(deleteMovie(movie.id));
  };

  const handleFavorite = () => {
    setMovies(toggleFavoriteById(movie.id));
  };

  return (
    <li>
      {isEditing ? (
        <MovieItemEdit movie={movie} onSubmit={handleSubmitEdit} />
      ) : (
        <>
          <p>
            {movie.title} - {movie.description} - {movie.rating}
          </p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}

      {isEditingRating ? (
        <>
          <input
            value={editedMovieRating}
            onChange={(e) => setEditedMovieRating(e.target.value)}
          />
          <button onClick={() => handleSubmitRating(movie.id)}>
            Submit rating
          </button>
        </>
      ) : (
        <button onClick={() => setIsEditingRating(true)}>Rate</button>
      )}

      <button onClick={() => handleFavorite()}>
        {movie.favorite ? "Unfavorite" : "Favorite"}
      </button>

      <button onClick={() => handleDelete()}>Delete</button>
    </li>
  );
}
