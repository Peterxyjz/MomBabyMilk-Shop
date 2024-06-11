import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import SiginIn from "./pages/Login";
import SiginUp from "./pages/Register";
import TapToTop from "./components/elements/TapToTop";
function App() {
  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <Router>
          <Header />
          <TapToTop/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SiginIn />} />
            <Route path="/register" element={<SiginUp />} />
          </Routes>
          <Footer/>
        </Router>
      </div>
    </>
  );
}

export default App;
