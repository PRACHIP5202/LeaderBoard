import React, { useState, useEffect } from "react";
import "../styles/UserClaim.css";

// Centralized API utility
const api = {
  getUsers: async () => (await fetch("http://localhost:5001/api/v1/get-leaderboard")).json(),
  addUser: async (name) => (await fetch("http://localhost:5001/api/v1/add-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: name }),
  })).json(),
  claimPoints: async (username) => (await fetch("http://localhost:5001/api/v1/give-points", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  })).json(),
  getLeaderboard: async () => (await fetch("http://localhost:5001/api/v1/get-leaderboard")).json(),
  getHistory: async () => (await fetch("http://localhost:5001/api/v1/get-history")).json(),
};

export default function UserClaim({ onAction }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [assignedPoints, setAssignedPoints] = useState(null);
  const [newUser, setNewUser] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch all data
  const fetchAll = async () => {
    const leaderboardData = await api.getUsers();
    setUsers(leaderboardData.users || []);
    setLeaderboard(leaderboardData.users || []);
    const historyData = await api.getHistory();
    setHistory(historyData.history || []);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Handle claiming points
  const handleClaim = async () => {
    if (!selectedUser) return;
    const data = await api.claimPoints(selectedUser);
    setAssignedPoints(data.user ? (data.user.points || null) : null);
    fetchAll(); // Refresh all data
    if (onAction) onAction(); // Notify parent
  };

  // Handle adding a new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUser.trim()) return;
    setMessage("");
    try {
      const data = await api.addUser(newUser.trim());
      if (data.error) {
        setMessage(data.error);
      } else if (data.message) {
        setMessage(data.message);
      } else {
        setMessage("User added successfully");
      }
    } catch (err) {
      setMessage("Failed to add user. Please try again.");
    }
    setNewUser("");
    fetchAll(); // Refresh all data
    if (onAction) onAction(); // Notify parent
  };

  return (
    <div className="claim-container">
      <h2>Select User to Claim Points</h2>
      <select onChange={e => setSelectedUser(e.target.value)} value={selectedUser}>
        <option value="">-- Select User --</option>
        {users.map(user => (
          <option key={user._id} value={user.username}>{user.username}</option>
        ))}
      </select>
      <button onClick={handleClaim} className="claim-button">Claim</button>
      {assignedPoints !== null && (
        <div className="point-card">
          🎉 You received <strong>{assignedPoints}</strong> points!
        </div>
      )}
      <form onSubmit={handleAddUser} style={{ marginTop: 24 }}>
        <input
          type="text"
          placeholder="Add new user"
          value={newUser}
          onChange={e => setNewUser(e.target.value)}
        />
        <button type="submit" className="claim-button" style={{ marginLeft: 8 }}>Add User</button>
      </form>
      {message && <div style={{ color: message.toLowerCase().includes('error') || message.toLowerCase().includes('fail') ? 'red' : 'green', marginTop: 8 }}>{message}</div>}
      <div style={{ marginTop: 40 }}>
        <h3>Leaderboard</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {leaderboard.map((user, idx) => (
            <li key={user._id} style={{ margin: '4px 0' }}>
              #{idx + 1} <b>{user.username}</b> - {user.points} pts
            </li>
          ))}
        </ul>
      </div>
      <div style={{ marginTop: 40 }}>
        <h3>Recent Claims</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {history.slice(0, 5).map((entry, idx) => (
            <li key={idx}>
              <b>{entry.username}</b> claimed <b>{entry.pointsAdded}</b> points on {new Date(entry.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// More components coming next: LeaderBoard.jsx, History.jsx, AddUser.jsx, and CSS files
