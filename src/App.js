// Filename: src/App.js

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header.js';
import HomePage from './components/HomePage/HomePage.js';
import CalendarPage from './pages/CalendarPage';  // Import the new CalendarPage
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import Profile from './components/Profile/Profile.jsx';   // Import the Profile component
import GlobalStyles from './styles/GlobalStyles';

import './App.css';

const isAuthenticated = async () => {
  const token = localStorage.getItem('token');
  
  if (!token)
  {
	  return false;
  }
  
  try {
	  const response = await fetch('http://localhost:8080/api/auth/validate', {
		  headers: {
			  Authorization: `Bearer ${token}`,
		  },
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
	  console.error('Token validation failed:', error);
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
		  <div style={{
			  display: 'flex', justifyContent: 'center', alignItems: 'center',
			  height: '80vh', fontSize: '1.1rem', color: '#555'
		  }}>
		    Checking session...
		  </div>
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
			  <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
			  <Route path="/login" element={<Login />} />
			  <Route path="/register" element={<Register />} />
			  <Route path="*" element={<h2>404 - Page Not Found</h2>} /> {/* Handle undefined routes */}
			</Routes>
		</main>
	</div>
  </Router>
);

export default App;