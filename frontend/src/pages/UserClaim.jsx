import React, { useState, useEffect } from "react";
import "../styles/UserClaim.css";

// Centralized API utility
const api = {
  getUsers: async () => (await fetch("/api/users")).json(),
  addUser: async (name) => (await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  })).json(),
  claimPoints: async (userId) => (await fetch(`/api/claim/${userId}`, { method: "POST" })).json(),
  getLeaderboard: async () => (await fetch("/api/leaderboard")).json(),
  getHistory: async () => (await fetch("/api/history")).json(),
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
    setUsers(await api.getUsers());
    setLeaderboard(await api.getLeaderboard());
    setHistory(await api.getHistory());
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Handle claiming points
  const handleClaim = async () => {
    if (!selectedUser) return;
    const data = await api.claimPoints(selectedUser);
    setAssignedPoints(data.points);
    fetchAll(); // Refresh all data
    if (onAction) onAction(); // Notify parent
  };

  // Handle adding a new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUser.trim()) return;
    const data = await api.addUser(newUser.trim());
    setMessage(data.message || "User added successfully");
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
          <option key={user._id} value={user._id}>{user.name}</option>
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
      {message && <div style={{ color: 'green', marginTop: 8 }}>{message}</div>}
      <div style={{ marginTop: 40 }}>
        <h3>Leaderboard</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {leaderboard.map((user, idx) => (
            <li key={user._id} style={{ margin: '4px 0' }}>
              #{idx + 1} <b>{user.name}</b> - {user.totalPoints} pts
            </li>
          ))}
        </ul>
      </div>
      <div style={{ marginTop: 40 }}>
        <h3>Recent Claims</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {history.slice(0, 5).map((entry, idx) => (
            <li key={idx}>
              <b>{entry.userName}</b> claimed <b>{entry.points}</b> points on {new Date(entry.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// More components coming next: LeaderBoard.jsx, History.jsx, AddUser.jsx, and CSS files
