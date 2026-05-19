// ========================================
// FILE: src/components/Navbar.jsx
// ========================================

import { Link } from "react-router-dom";

function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");

    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <h2>Celestial Task Tracker</h2>

      <div>
        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/focus">
          Focus
        </Link>

        <Link to="/collaboration">
          Collaboration
        </Link>

        <button onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;