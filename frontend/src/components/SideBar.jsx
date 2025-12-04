import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar card">
      <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Link
          to="/"
          className="btn btn-ghost"
          style={{ justifyContent: "flex-start" }}
        >
          🏠 Home
        </Link>

        <Link
          to="/add"
          className="btn btn-ghost"
          style={{ justifyContent: "flex-start" }}
        >
          ➕ Add Student
        </Link>
      </nav>
    </aside>
  );
}
