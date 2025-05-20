import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Second from "./components/Second";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/infoSent" element={<Second />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
