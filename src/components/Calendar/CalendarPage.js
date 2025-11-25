//Filename: src/components/Calendar/CalendarPage.js

import React from "react";
import Calendar from "./Calendar.js";  // Import Calendar component.
import { useNavigate } from "react-router-dom";
import "./CalendarPage.css";

const CalendarPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="calendar-page-wrapper">
	  <header className="calendar-page-header">
		<h1>Gratitude Calendar</h1>
		<p>A gentle place to mark moments that mattered.</p>
	  </header>
	  
	  <div className="calendar-page-container">
        <Calendar />  {/* Render the Calendar component */}
	  </div>
	  
	  <button
	    className="calendar-floating-button"
	    onClick={() => navigate("/entries")}
	  >
	    View All Entries
	  </button>
	</div>
  );
};

export default CalendarPage;