import React, { useEffect, useState } from "react";
import "../styles/History.css";

// Centralized API utility
const api = {
  getHistory: async (page = 1, limit = 10) => (await fetch(`/api/history?page=${page}&limit=${limit}`)).json(),
};

export default function History() {
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  // Fetch paginated history
  const fetchHistory = async (pageNum = 1) => {
    const data = await api.getHistory(pageNum, limit);
    setHistory(data.history || []);
    setTotalPages(data.totalPages || 1);
  };

  useEffect(() => {
    fetchHistory(page);
  }, [page]);

  return (
    <div className="history-container">
      <h2>📜 Point Claim History</h2>
      <ul className="history-list">
        {history.map((entry, index) => (
          <li key={index}>
            <strong>{entry.userName}</strong> claimed <b>{entry.points}</b> points on {new Date(entry.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 16 }}>
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span style={{ margin: '0 12px' }}>Page {page} of {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
