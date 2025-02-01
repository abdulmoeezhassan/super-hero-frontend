import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SuperHero } from "./Components/SuperHero/SuperHero";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>
          <SuperHero />
        </div>} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
