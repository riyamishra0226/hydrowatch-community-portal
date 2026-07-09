import "../../styles/Navbar.css";
import { Link } from "react-router-dom";
import { FaTint } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <FaTint className="logo-icon" />
        <h2>HydroWatch</h2>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <a href="#features">Features</a>
        </li>

        <li>
          <a href="#how-it-works">How It Works</a>
        </li>

        <li>
          <Link to="/campaigns">Campaigns</Link>
        </li>

        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
      </ul>

      <div className="auth-buttons">
        <Link to="/login" className="login-btn">
          Login
        </Link>

        <Link to="/register" className="register-btn">
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;