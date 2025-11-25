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
import useAuth from "./hooks/useAuth";

import './App.css';

//Reusable Wrapper for Consistent Page Spacing.
const PageContainer = ({ children }) => (
  <div className="page-container">
    {children}
  </div>
);

// PrivateRoute Component
const PrivateRoute = ({ element }) => {
	const authorized = useAuth();
	
	if (authorized === null)
	{
		return (
		  <div className="loading-screen">
		    <div className="loading-spinner"></div>
		      <p>Checking session...</p>
		  </div>
		);
	}
	
    return authorized ? element : <Navigate to="/login" replace />;
};

const App = () => (
  <Router>
	<Header />
		<PageContainer>
			<Routes>
			  <Route path="/" element={<HomePage />} />
			  <Route path="/calendar" element={<PrivateRoute element={<CalendarPage />} />} /> {/* Calendar Page Route */}
			  <Route path="/entries" element={<EntriesTimeline />} />
			  <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
			  <Route path="/login" element={<Login />} />
			  <Route path="/register" element={<Register />} />
			  <Route path="/settings" element={<Settings />} />
			  <Route path="*" element={<h2 className="not-found">Page Not Found</h2>} /> {/* Handle undefined routes */}
			</Routes>
		</PageContainer>
  </Router>
);

export default App;