// Filename: src/components/Header.js

import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import "./Header.css";  // Import the CSS file here.

const Header = () => {
  const { accessToken, user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const avatarRef = useRef(null);
  const navigate = useNavigate();
  
  const handleLogout = async () => {
	  await logout(); //Call global logout logic.
	  navigate("/login"); //Redirect AFTER logout state is fully cleared.
  };
  
  //Click-outside listener.
  useEffect(() => {
	  const handleClickOutside = (event) => {
		  if ( (avatarRef.current) && ( ! avatarRef.current.contains(event.target)) )
		  {
			  setMenuOpen(false);
		  }
	  };
	  
	  if (menuOpen)
	  {
		  document.addEventListener("mousedown", handleClickOutside);
	  }
	  else
	  {
		  document.removeEventListener("mousedown", handleClickOutside);
	  }
	  
	  return () => {
		  document.removeEventListener("mousedown", handleClickOutside);
	  };
  }, [menuOpen]);
  
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
		    <div className="avatar-wrapper" ref={avatarRef} onClick={toggleMenu}>
			  <div className="avatar-circle">
			    {user.username && user.username.length > 0
				? user.username.charAt(0).toUpperCase()
				: "?"}
			  </div>
			  
			  <div className={`avatar-menu ${menuOpen ? "open" : ""}`}>
			    <Link
				  to="/entries"
				  className="avatar-menu-item"
				  onClick={(e) => { e.stopPropagation(); closeMenu(); }}
				>
				  My Timeline
				</Link>
				
				<Link
				  to="/profile"
				  className="avatar-menu-item"
				  onClick={(e) => { e.stopPropagation(); closeMenu(); }}
				>
				  Profile
				</Link>
				
				<div className="avatar-menu-divider" />
				
				<Link
				  to="/settings"
				  className="avatar-menu-item"
				  onClick={(e) => { e.stopPropagation(); closeMenu(); }}
				>
				  Settings
				</Link>
				
				<button
				  className="avatar-menu-item logout"
				  onClick={(e) => { e.stopPropagation(); closeMenu(); handleLogout(); }}
				>
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