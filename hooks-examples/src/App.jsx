import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import UseEffectPage from "./components/use-effect-page";
import UseRefPage from "./components/use-ref-page";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/use-effect">useEffect</Link>
          </li>
          <li>
            <Link to="/use-ref">useRef</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/use-effect" element={<UseEffectPage />} />
        <Route path="/use-ref" element={<UseRefPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
