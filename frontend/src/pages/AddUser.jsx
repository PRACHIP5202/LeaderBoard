import React, { useState } from "react";
import "../styles/AddUser.css";

// Centralized API utility
const api = {
  addUser: async (name) => (await fetch("/api/v1/add-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: name }),
  })).json(),
};

export default function AddUser({ onUserAdded }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // Handle adding a new user
  const handleAdd = async () => {
    if (!name.trim()) return;
    const data = await api.addUser(name.trim());
    setMessage(data.message || "User added successfully");
    setName("");
    if (onUserAdded) onUserAdded(); // Notify parent to refresh
  };

  return (
    <div className="add-user-container">
      <h2>➕ Add New User</h2>
      <input
        type="text"
        value={name}
        placeholder="Enter user name"
        onChange={e => setName(e.target.value)}
      />
      <button onClick={handleAdd} className="add-button">Add User</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}