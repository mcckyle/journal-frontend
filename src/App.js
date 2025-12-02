// Filename: src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header.js';
import HomePage from './components/HomePage/HomePage.js';
import CalendarPage from './components/Calendar/CalendarPage';  // Import the new CalendarPage
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import Profile from './components/Profile/Profile.jsx';
import EntriesTimeline from './components/EntriesTimeline/EntriesTimeline.jsx';
import Settings from './components/Settings/Settings.jsx';
import PageContainer from "./components/Layout/PageContainer.jsx";
import PrivateRoute from "./components/auth/PrivateRoute.jsx";

import './App.css';

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