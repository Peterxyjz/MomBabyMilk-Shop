import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import SiginIn from "./pages/Auth/Login";
import SiginUp from "./pages/Auth/Register";
import TapToTop from "./components/elements/TapToTop";
import Otp from "./pages/Auth/Otp";
import ResetPassord from "./pages/Auth/ResetPassword";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import LoginGoogle from "./pages/Auth/Google/LoginGoogle";
import Product from "./pages/Product";
function App() {
  return (
    <>
      <div className="container mx-auto px-2 py-4">
        <Router>
          <Header />
          <TapToTop />
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Auth */}
            <Route path="/login" element={<SiginIn />} />
            <Route path="/login/oauth" element={<LoginGoogle />} />
            <Route path="/register" element={<SiginUp />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/reset-password" element={<ResetPassord />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Product */}
            <Route path="/product" element={<Product />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
