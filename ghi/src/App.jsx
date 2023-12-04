import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import HomePage from "./HomePage";
import SignupForm from "./Accounts/SignupForm";
import LoginForm from "./Accounts/LoginForm";
import EditProfile from "./Accounts/EditProfile";
import UpdatePassword from "./Accounts/UpdatePassword"
import DeleteProfile from "./Accounts/DeleteProfile"
import LogoutButton from "./Accounts/LogoutButton";
import Sidebar from "./Sidebar";
import DetailRestaurant from "./Restaurants/DetailRestaurants";
import ListMyReviews from "./Reviews/ListMyReviews";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import FavoriteRestaurants from "./Restaurants/FavoriteRestaurants";
import ListRestaurants from "./Restaurants/ListRestaurants";
import CreateReview from "./Reviews/CreateReview"
import SearchResults from "./Search/SearchResults";

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw error("VITE_APP_API_HOST was undefined.")
}

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    return (
        <BrowserRouter>
            <AuthProvider baseUrl={tokenUrl}>
                <Nav toggleSidebar={toggleSidebar} />
                <Sidebar isOpen={isSidebarOpen} />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<HomePage toggleSidebar={toggleSidebar} />} />
                        <Route path="/signup" element={<SignupForm />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/logout" element={<LogoutButton />} />
                        <Route path="/sidebar" element={<Sidebar />} />
                        <Route path="/editprofile" element={<EditProfile />} />
                        <Route path="/deleteprofile" element={<DeleteProfile />} />
                        <Route path="/updatepassword" element={<UpdatePassword />} />
                        <Route path="/restaurants/:place_id" element={<DetailRestaurant />} />
                        <Route path="/myreviews" element={<ListMyReviews />} />
                        <Route path="/favorites/" element={<FavoriteRestaurants />} />
                        <Route path="/restaurants" element={<ListRestaurants />} />
                        <Route path="/create-review/:id" element={<CreateReview />} />
                        <Route path="/search-results" element={<SearchResults />} />
                    </Routes>
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
