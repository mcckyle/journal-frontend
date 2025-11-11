//Filename: src/pages/CalendarPage.js

import React from 'react';
import Calendar from '../components/Calendar/Calendar.js';  // Import Calendar component
import './CalendarPage.css';

const CalendarPage = () => {
  return (
    <div className="calendar-page">
	  <div className="calendar-content">
	    <h1 className="calendar-title">Gratitude Calendar</h1>
		<p className="calendar-subtitle">
		  Reflect on each day and note something you're grateful for.
		</p>
        <Calendar />  {/* Render the Calendar component */}
      </div>
	</div>
  );
};

export default CalendarPage;