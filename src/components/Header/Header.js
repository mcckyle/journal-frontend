// Filename: src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';  // Import the CSS file

const Header = () => (
  <header className="header">
    <div className="header-container">
	  <div className="logo">
	    <Link to="/" className="logo-text">Gratitude Journal</Link>
	  </div>
    <nav className="nav-links">
	  <Link to="/" className="nav-link">Home</Link>
	  <Link to="/calendar" className="nav-link">Calendar</Link>
	  <Link to="/entries" className="nav-link">Timeline</Link>
	  <Link to="/profile" className="nav-link">Profile</Link>
	</nav>
    <div className="auth-actions">
	  <Link to="/login" className="btn auth-btn">Login</Link>
	  <Link to="/register" className="btn auth-btn register-btn" >Register</Link>
    </div>
    </div>
  </header>
);

export default Header;