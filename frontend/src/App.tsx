// dependencies
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import Profile from "./pages/Profile";

// components
import { BottomNav } from "./components/nav/BottomNav";

// layout component
const Layout = () => (
    <>
        <BottomNav />
    </>
);

function App() {
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route element={<Layout />}>
                        {/* home */}
                        <Route path="/connect" element={<Home />} />
                        <Route path="/" element={<Home />} />

                        {/* profile */}
                        <Route path="/profile" element={<Profile />} />

                        {/* saved */}
                        <Route path="/saved" element={<Saved />} />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
