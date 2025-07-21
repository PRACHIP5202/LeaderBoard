import React, { useEffect, useState } from "react";
import "../styles/History.css";

// Centralized API utility
const api = {
  getHistory: async () => (await fetch(`https://leaderboard-t2v0.onrender.com/api/v1/get-history`)).json(),
};

export default function History() {
  const [history, setHistory] = useState([]);

  // Fetch history
  const fetchHistory = async () => {
    const data = await api.getHistory();
    setHistory(data.history || []);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="history-container">
      <h2>📜 Point Claim History</h2>
      <ul className="history-list">
        {history.map((entry, index) => (
          <li key={index}>
            <strong>{entry.username}</strong> claimed <b>{entry.pointsAdded}</b> points on {new Date(entry.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
