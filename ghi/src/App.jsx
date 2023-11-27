import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import HomePage from "./HomePage";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import LogoutButton from "./LogoutButton";

function App() {
    return (
        <BrowserRouter>
            <Nav />
            <div className="container">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/signup" element={<SignupForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/logout" element={<LogoutButton />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
