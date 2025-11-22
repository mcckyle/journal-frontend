// Filename: src/components/Header.js

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";  // Import the CSS file here.

const Header = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  //Fetch the user info if a token exists.
  useEffect(() => {
	  const token = localStorage.getItem("token");
	  if ( ! token)
	  {
		  return;
	  }
	  
	  const loadUser = async () => {
		  try
		  {
			  const response = await fetch("http://localhost:8080/api/auth/me", {
				  headers: { Authorization: `Bearer ${token}` },
			  });
			  
			  if (response.ok)
			  {
				  const data = await response.json();
				  setUser(data);
			  }
		  }
		  catch (error)
	      {
		      console.error("Error fetching user:", error);
	      }
	  };
	  
	  loadUser();
  }, []);
  
  const handleLogout = () => {
	  localStorage.removeItem("token");
	  setUser(null);
	  navigate("/login");
  };
  
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);
  
  return (
	  <header className="header">
		<div className="header-container">
		
		  {/* Left Logo */}
		  <div className="logo">
			<Link to="/" className="logo-text">Gratitude Journal</Link>
		  </div>
		
		{/* Main Navigation */}
		<nav className="nav-links">
		  <Link to="/" className="nav-link">Home</Link>
		  <Link to="/calendar" className="nav-link">Calendar</Link>
		  <Link to="/entries" className="nav-link">Timeline</Link>
		  <Link to="/profile" className="nav-link">Profile</Link>
		</nav>
		
		{/* Auth / User Avatar */}
		<div className="auth-section">
		  {user ? (
		    <div className="avatar-wrapper" onClick={toggleMenu}>
			  <div className="avatar-circle">
			    {user.username.charAt(0).toUpperCase()}
			  </div>
			  
			  <div className={`avatar-menu ${menuOpen ? "open" : ""}`}>
			    <Link to="/entries" className="avatar-menu-item" onClick={closeMenu}>My Timeline</Link>
			    <Link to="/profile" className="avatar-menu-item" onClick={closeMenu}>Profile</Link>
				
				<div className="avatar-menu-divider" />
				
				<Link to="/settings" className="avatar-menu-item" onClick={closeMenu}>Settings</Link>
				
				<button className="avatar-menu-item logout" onClick={() => { closeMenu(); handleLogout(); }}>
				  Logout
				</button>
			  </div>
			</div>
		) : (
		  <>
		    <Link to="/login" className="btn auth-btn">Login</Link>
		    <Link to="/register" className="btn auth-btn register-btn">Register</Link>
		  </>
		)}
		</div>
	  </div>
	</header>
  );
};

export default Header;