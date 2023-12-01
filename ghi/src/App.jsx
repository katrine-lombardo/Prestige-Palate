import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import HomePage from "./HomePage";
import SignupForm from "./Accounts/SignupForm";
import LoginForm from "./Accounts/LoginForm";
import LogoutButton from "./Accounts/LogoutButton";
import Sidebar from "./Sidebar";
// import EditProfile from "./Accounts/EditProfile";
import DetailRestaurant from "./Restaurants/DetailRestaurants";
import GetMyReviews from "./Reviews/GetMyReviews";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import FavoriteRestaurants from "./Restaurants/FavoriteRestaurants";
import ListRestaurants from "./Restaurants/ListRestaurants";
import CreateReview from "./Reviews/CreateReview"


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
                        <Route path="/home" element={<HomePage toggleSidebar={toggleSidebar} />} />
                        <Route path="/signup" element={<SignupForm />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/logout" element={<LogoutButton />} />
                        <Route path="/sidebar" element={<Sidebar />} />
                        <Route path="accounts/edit-profile/" element={<EditProfile />} />
                        <Route path="/restaurants/:id" element={<DetailRestaurant />} />
                        <Route path="/myreviews" element={<GetMyReviews />} />
                        <Route path="/favorites/" element={<FavoriteRestaurants />} />
                        <Route path="/restaurants" element={<ListRestaurants />} />
                        <Route path="/create-review/:id" element={<CreateReview />} />
                    </Routes>
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
