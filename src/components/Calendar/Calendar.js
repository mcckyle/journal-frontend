import React, { useState, useEffect } from 'react';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameDay } from 'date-fns';
import './Calendar.css';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [gratitudeEntries, setGratitudeEntries] = useState({});
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  // New state for title and content
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchUserId = () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const decodedToken = JSON.parse(atob(storedToken.split('.')[1]));
          setUserId(decodedToken.userId);
          console.log("Decoded userId:", decodedToken.userId);
        } catch (e) {
          console.error('Error decoding token:', e);
        }
      }
    };
    fetchUserId();
  }, []);

  // Load saved entries
  useEffect(() => {
    if (userId) {
      const fetchEntries = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/calendar/user/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (!response.ok) throw new Error('Failed to fetch entries');

          const data = await response.json();
          setGratitudeEntries(data.reduce((acc, entry) => {
            acc[entry.entryDate] = { title: entry.title, content: entry.content };
            return acc;
          }, {}));
        } catch (error) {
          console.error('Error fetching entries:', error);
        }
      };

      fetchEntries();
    }
  }, [userId, token, selectedDate]);

  // Save entry to the backend
  const handleSaveEntry = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Title and content are required.');
      return;
    }

    const entryDate = format(selectedDate, 'yyyy-MM-dd');

    try {
      const response = await fetch('http://localhost:8080/api/calendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          entryDate,
          title,
          content,
          userId,
        }),
      });

      if (!response.ok) throw new Error('Failed to save entry');

      // Update local state with the new entry
      setGratitudeEntries({
        ...gratitudeEntries,
        [entryDate]: { title, content }
      });

      // Clear inputs after saving
      setTitle('');
      setContent('');
      console.log('Entry saved successfully:', entryDate);
    } catch (error) {
      console.error('Error saving entry:', error);
    }
  };

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(selectedDate),
    end: endOfMonth(selectedDate),
  });

  const handleMonthChange = (increment) => {
    setSelectedDate(addMonths(selectedDate, increment));
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => handleMonthChange(-1)}>&lt;</button>
        <h2>{format(selectedDate, 'MMMM yyyy')}</h2>
        <button onClick={() => handleMonthChange(1)}>&gt;</button>
      </div>
		<div className="calendar-grid">
		  {daysInMonth.map((day) => (
			<div
			  key={day}
			  className={`calendar-day ${isToday(day) ? 'today' : ''} ${isSameDay(day, selectedDate) ? 'selected' : ''}`}
			  onClick={() => {
				setSelectedDate(day);
				const dateKey = format(day, 'yyyy-MM-dd');
				if (gratitudeEntries[dateKey]) {
				  setTitle(gratitudeEntries[dateKey].title);
				  setContent(gratitudeEntries[dateKey].content);
				} else {
				  setTitle('');
				  setContent('');
				}
			  }}
			>
			  {format(day, 'd')}
			</div>
		  ))}
		</div>
      <div className="entry-box">
        <h3>Entry for {format(selectedDate, 'MMMM dd, yyyy')}</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What are you grateful for today?"
        />
        <button onClick={handleSaveEntry}>Save Entry</button>
      </div>
    </div>
  );
};

export default Calendar;