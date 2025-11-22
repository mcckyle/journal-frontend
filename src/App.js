// Filename: src/App.js

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header.js';
import HomePage from './components/HomePage/HomePage.js';
import CalendarPage from './components/Calendar/CalendarPage';  // Import the new CalendarPage
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import Profile from './components/Profile/Profile.jsx';
import EntriesTimeline from './components/EntriesTimeline/EntriesTimeline.jsx';
import Settings from './components/Settings/Settings.jsx';
import GlobalStyles from './styles/GlobalStyles';

import './App.css';

//Check Token Validity.
const isAuthenticated = async () => {
  const token = localStorage.getItem('token');
  
  if (!token)
  {
	  return false;
  }
  
  try {
	  const response = await fetch('http://localhost:8080/api/auth/validate', {
		  headers: { Authorization: `Bearer ${token}` },
	  });
	  
	  if (!response.ok)
	  {
		  return false;
	  }
	  
	  const data = await response.json();
	  return data.valid === true;
  }
  catch (error)
  {
	  console.error('Token validation failed: ', error);
	  return false;
  }
};

// PrivateRoute Component
const PrivateRoute = ({ element }) => {
	const [authorized, setAuthorized] = useState(null);
	
	useEffect(() => {
		(async () => setAuthorized(await isAuthenticated()))();
		}, []);
	
	if (authorized === null)
	{
		return (
		  <div className="loading-screen">Checking session...</div>
		);
	}
	
    return authorized ? element : <Navigate to="/login" replace />;
};

const App = () => (
  <Router>
    <GlobalStyles />
	<div className="app-container">
		<Header />
		<main className="main-content">
			<Routes>
			  <Route path="/" element={<HomePage />} />
			  <Route path="/calendar" element={<PrivateRoute element={<CalendarPage />} />} /> {/* Calendar Page Route */}
			  <Route path="/entries" element={<EntriesTimeline />} />
			  <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
			  <Route path="/login" element={<Login />} />
			  <Route path="/register" element={<Register />} />
			  <Route path="/settings" element={<Settings />} />
			  <Route path="*" element={<h2>404 - Page Not Found</h2>} /> {/* Handle undefined routes */}
			</Routes>
		</main>
	</div>
  </Router>
);

export default App;