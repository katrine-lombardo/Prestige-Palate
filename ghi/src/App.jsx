import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import HomePage from "./HomePage";
import ReferralForm from "./Accounts/ReferralForm"
import SignupForm from "./Accounts/SignupForm";
import LoginForm from "./Accounts/LoginForm";
import EditProfile from "./Accounts/EditProfile";
import UpdatePassword from "./Accounts/UpdatePassword"
import DeleteProfile from "./Accounts/DeleteProfile"
import LogoutButton from "./Accounts/LogoutButton";
import Dashboard from "./Accounts/Dashboard";
import Sidebar from "./Sidebar";
import DetailRestaurant from "./Restaurants/DetailRestaurants";
import ListMyReviews from "./Reviews/ListMyReviews";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import FavoriteRestaurants from "./Restaurants/FavoriteRestaurants";
import CreateReview from "./Reviews/CreateReview"
import SearchResults from "./Search/SearchResults";
import UpdateReview from "./Reviews/UpdateReview";
import ListUserReviews from "./Reviews/ListUserReviews";
import { LoadScript } from '@react-google-maps/api';
import ContextProvider from "./ContextStore";
import FAQPage from "./FAQ"
import About from "./About"
import { FollowProvider } from "./FollowContext";
import Footer from "./Footer";
import "./App.css";

const libraries = ['places'];

const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
if (!googleApiKey) {
    throw Error("VITE_GOOGLE_API_KEY was undefined.")
}

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw Error("VITE_APP_API_HOST was undefined.")
}

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => {
        if (isSidebarOpen) {
            setIsSidebarOpen(false);
        }
    };

    const domain = /https?:\/\/[^/]+/;
    const basename = import.meta.env.VITE_PUBLIC_URL.replace(domain, "");


    return (
        <LoadScript
            googleMapsApiKey={googleApiKey}
            libraries={libraries}
        >
            <BrowserRouter basename={basename}>
                <AuthProvider baseUrl={tokenUrl}>
                    <ContextProvider>
                        <FollowProvider>
                            <div className = "mainpage">
                            <Nav toggleSidebar={toggleSidebar} />
                            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                            <div className = "mainbody">
                            <Routes>
                                <Route path="/" element={<HomePage toggleSidebar={toggleSidebar} />} />
                                <Route path="/signup" element={<SignupForm />} />
                                <Route path="/login" element={<LoginForm />} />
                                <Route path="/logout" element={<LogoutButton />} />
                                <Route path="/sidebar" element={<Sidebar />} />
                                <Route path="/referral" element={<ReferralForm />} />
                                <Route path="/editprofile" element={<EditProfile />} />
                                <Route path="/deleteprofile" element={<DeleteProfile />} />
                                <Route path="/updatepassword" element={<UpdatePassword />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/restaurants/:place_id" element={<DetailRestaurant />} />
                                <Route path="/myreviews" element={<ListMyReviews />} />
                                <Route path="/favorites/" element={<FavoriteRestaurants />} />
                                <Route path="/create-review/:place_id" element={<CreateReview />} />
                                <Route path="/search-results" element={<SearchResults />} />
                                <Route path="/update-review/:review_id" element={<UpdateReview />} />
                                <Route path="/accounts/:username" element={<ListUserReviews />} />
                                <Route path="/faq" element={<FAQPage />} />
                                <Route path="/about" element={<About />} />
                            </Routes>
                            </div>
                            <Footer />
                            </div>
                        </FollowProvider>
                    </ContextProvider>
                </AuthProvider>
            </BrowserRouter>
        </LoadScript>
    );
}

export default App;
