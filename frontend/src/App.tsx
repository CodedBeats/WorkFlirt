// dependencies
import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import Profile from "./pages/Profile";

// components
import { BottomNav } from "./components/nav/BottomNav";

// layout component, all pages scrollable with bottom nav fixed
const Layout = () => (
    <div className="flex flex-col flex-1">
        <div className="flex-1 overflow-y-auto">
            <Outlet />
        </div>
        <BottomNav />
    </div>
);

function App() {
    return (
        <div className="app h-screen flex flex-col">
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
