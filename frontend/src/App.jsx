// File: src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserClaim from "./pages/UserClaim";
import LeaderBoard from "./pages/LeaderBoard";
import AddUser from "./pages/AddUser";
import History from "./pages/History";
import "./App.css";

export default function App() {
  // State to trigger refreshes
  const [refresh, setRefresh] = useState(0);

  // Callback to trigger refresh
  const triggerRefresh = () => setRefresh(r => r + 1);

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <h1>🔥 Claim Points App</h1>
          <div>
            <Link to="/" className="nav-link">Claim</Link>
            <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
            <Link to="/add-user" className="nav-link">Add User</Link>
            <Link to="/history" className="nav-link">History</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<UserClaim onAction={triggerRefresh} />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/add-user" element={<AddUser onUserAdded={triggerRefresh} />} />
          <Route path="/history" element={<History refresh={refresh} />} />
        </Routes>
      </div>
    </Router>
  );
} 