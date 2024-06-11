import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
function App() {
  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer/>
        </Router>
      </div>
    </>
  );
}

export default App;
