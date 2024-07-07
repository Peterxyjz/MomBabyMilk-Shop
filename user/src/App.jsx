import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import Home from "./pages/Home";
import SiginIn from "./pages/Auth/Login";
import SiginUp from "./pages/Auth/Register";
import TapToTop from "./components/elements/TapToTop";
import Otp from "./pages/Auth/Otp";
import ResetPassord from "./pages/Auth/ResetPassword";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import LoginGoogle from "./pages/Auth/Google/LoginGoogle";
import Product from "./pages/Product";
import MainFooter from "./pages/Footer";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Payment from "./components/order/Payment";
import Filter from "./pages/Filter/Filter";
import Thanks from "./components/order/Thanks";
import WishList from "./pages/Wishlist";
import News from "./pages/News";
import AboutUs from "./pages/InformationPage/AboutUs";
import ExchangePolicy from "./pages/InformationPage/ExchangePolicy";
import Profile from "./pages/Profile";
import HistoryOrder from "./components/profile/HistoryOrder";
import Feedback from "./components/profile/Feedback";
import ChangePassword from "./components/profile/ChangePassword";
import Accumulate from "./components/profile/Accumulate";
import EditProfile from "./components/profile/EditProfile";
import OrderDetail from "./components/order/OrderDetail";
import OrderTracking from "./components/order/OrderTracking";
import Contact from "./pages/InformationPage/Contact";
import PrivacyPolicy from "./pages/InformationPage/PrivacyPolicy";
import BestSeller from "./components/product/BestSeller";
import LatestProduct from "./components/product/LatestProduct";
import NewsDetail from "./pages/News/NewsDetail";


function App() {
    return (
        <div className="container mx-auto px-2 py-4">
            <Router>
                <Header />
                <TapToTop />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<SiginIn />} />
                    <Route path="/login/oauth" element={<LoginGoogle />} />
                    <Route path="/register" element={<SiginUp />} />
                    <Route path="/otp" element={<Otp />} />
                    <Route path="/reset-password" element={<ResetPassord />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/thanks" element={<Thanks />} />
                    <Route path="/filter" element={<Filter />} />
                    <Route path="/best_seller" element={<BestSeller />} />
                    <Route path="/latest_product" element={<LatestProduct />} />
                    <Route path="/wishlist" element={<WishList />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/news-detail" element={<NewsDetail />} />
                    <Route path="/about_us" element={<AboutUs />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/exchange_policy" element={<ExchangePolicy />} />
                    <Route path="/privacy_policy" element={<PrivacyPolicy />} />
                    <Route path="/order-detail" element={<OrderDetail />} />
                    <Route path="/order-tracking" element={<OrderTracking />} />
                    <Route path="/profile" element={<Profile />}>
                        <Route path="" element={<EditProfile />} />
                        <Route path="history-order" element={<HistoryOrder />} />
                        <Route path="my-feedback" element={<Feedback />} />
                        <Route path="change-password" element={<ChangePassword />} />
                        <Route path="accumulated-points" element={<Accumulate />} />
                    </Route>
                </Routes>
                <MainFooter />
            </Router>
        </div>
    );
}

export default App;