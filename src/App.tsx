import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/abc" element={<>abc</>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
