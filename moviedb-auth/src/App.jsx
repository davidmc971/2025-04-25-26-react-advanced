import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [response, setResponse] = useState();

  const bearerToken = "do not commit credentials to git pls";

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/discover/movie", {
      headers: {
        Authorization:
          `Bearer ${bearerToken}`,
      },
    })
      .then((response) => {
        setResponse(response.status);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return <>{response}</>;
}

export default App;
