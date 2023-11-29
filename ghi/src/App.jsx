import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import HomePage from "./HomePage";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import LogoutButton from "./LogoutButton";
import Sidebar from "./Sidebar";
import EditProfile from "./EditProfile";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw error("VITE_APP_API_HOST was undefined.")
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider baseUrl={tokenUrl}>
                <Nav />
                <div className="container">
                    <Routes>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/signup" element={<SignupForm />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/logout" element={<LogoutButton />} />
                        <Route path="/sidebar" element={<Sidebar />} />
                        <Route path="/editprofile" element={<EditProfile />} />
                    </Routes>
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;