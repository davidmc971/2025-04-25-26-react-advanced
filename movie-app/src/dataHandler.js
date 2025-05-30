/**
 * @typedef {Object} Movie
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {number} rating
 * @property {boolean} favorite
 */

const initialMovies = [
  {
    id: 0,
    title: "Avengers",
    description: "A cool movie!",
    rating: 5.0,
    favorite: false,
  },
  {
    id: 1,
    title: "Pulp Fiction",
    description: "A cool movie!",
    rating: 5.0,
    favorite: false,
  },
  {
    id: 2,
    title: "Star Wars",
    description: "A cool movie!",
    rating: 5.0,
    favorite: false,
  },
  {
    id: 3,
    title: "Indiana Jones",
    description: "A cool movie!",
    rating: 5.0,
    favorite: false,
  },
  {
    id: 4,
    title: "Inception",
    description: "A cool movie!",
    rating: 5.0,
    favorite: false,
  },
];

let nextMovieId = 5;

/** @type {Movie[]} */
let movies;
initMovies();

export function resetMovies() {
  movies = initialMovies.slice();
  updateLocalStorage();
  return movies;
}
function initMovies() {
  const localStorageMovies = localStorage.getItem("movies");
  if (localStorageMovies != null) {
    movies = JSON.parse(localStorageMovies);
    return;
  }
  resetMovies();
}

function updateLocalStorage() {
  localStorage.setItem("movies", JSON.stringify(movies));
}

export function getMovies() {
  return movies;
}

export function deleteMovie(id) {
  movies = movies.filter((m) => m.id != id);
  updateLocalStorage();
  return movies;
}

/** @param { title: string, description: string, rating: number } movie */
export function addMovie(movie) {
  movies = [...movies, { ...movie, id: nextMovieId++ }];
  updateLocalStorage();
  return movies;
}

/** @param {Movie[]} newMovies  */
export function addMovies(newMovies) {
  // Copy current movies
  /** @type {Movie[]} */
  const nextMovies = movies.slice();
  newMovies.forEach((newMovie) => {
    // If movie id exists, do not add new movie
    if (nextMovies.find((m) => m.id === newMovie.id) != null) return;
    // Next movie id must be higher than any assigned id
    if (newMovie.id >= nextMovieId) nextMovieId = newMovie.id + 1;
    
    nextMovies.push(newMovie);
  });
  movies = nextMovies;
  return nextMovies;
}

export function rateMovie(id, rating) {
  movies = movies.map((movie) => {
    if (movie.id != id) return movie;
    return {
      ...movie,
      rating,
    };
  });
  updateLocalStorage();
  return movies;
}

export function updateMovie(updatedMovie) {
  movies = movies.map((movie) => {
    if (movie.id != updatedMovie.id) return movie;
    return {
      ...movie,
      ...updatedMovie,
    };
  });
  updateLocalStorage();
  return movies;
}

export function toggleFavoriteById(id) {
  movies = movies.map((movie) => {
    if (movie.id != id) return movie;
    return {
      ...movie,
      favorite: !movie.favorite,
    };
  });
  updateLocalStorage();
  return movies;
}
