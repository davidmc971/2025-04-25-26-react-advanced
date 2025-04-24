import { useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";

function App() {
  const [currentView, setCurrentView] = useState("all");

  return (
    <div id="movies-main">
      <button
        onClick={() => setCurrentView(currentView === "all" ? "favorites" : "all")}
      >
        {currentView === "all" ? "Show favorites" : "Show all movies"}
      </button>
      <h1>{currentView === "all" ? "Movies Platform" : "My Favorites"}</h1>
      <MovieList onlyShowFavorites={currentView === "favorites"} />
    </div>
  );
}

export default App;
