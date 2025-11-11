// src/components/Profile.jsx
import React from 'react';
import './Profile.css'; // Import the CSS file

const Profile = () => {
  // Dummy user data - replace with actual user data from props or state
  const user = {
    name: 'Kyle McColgan',
    email: 'kyle@example.com',
    bio: 'Web Developer & Cybersecurity Enthusiast',
  };

  const handleLogout = () => {
    // Implement logout functionality (clear token, redirect, etc.)
    localStorage.removeItem('token');  // Clear authentication token
    window.location.href = '/login';   // Redirect to login page
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Welcome, {user.name}!</h2>
        <p className="profile-email">{user.email}</p>
        <p className="profile-bio">{user.bio}</p>
        <div className="profile-actions">
          <button className="edit-button">Edit Profile</button>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;