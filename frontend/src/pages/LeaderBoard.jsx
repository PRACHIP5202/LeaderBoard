import React, { useEffect, useState } from "react";
import "../styles/LeaderBoard.css";

// Centralized API utility
const api = {
  getLeaderboard: async () => (await fetch("/api/leaderboard")).json(),
};

export default function LeaderBoard({ refresh }) {
  const [leaders, setLeaders] = useState([]);

  // Fetch leaderboard data
  const fetchLeaders = async () => {
    setLeaders(await api.getLeaderboard());
  };

  useEffect(() => {
    fetchLeaders();
  }, [refresh]); // Refresh when prop changes

  return (
    <div className="leaderboard-container">
      <h2>🏆 Leaderboard</h2>
      <div className="leader-list">
        {leaders.map((user, index) => (
          <div key={user._id} className={`leader-card rank-${index + 1}`}>
            <span className="rank">#{index + 1}</span>
            <span className="name">{user.name}</span>
            <span className="points">{user.totalPoints} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}