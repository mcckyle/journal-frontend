//Filename: Calendar.js

import React, { useState, useEffect } from 'react';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameDay } from 'date-fns';
import EntryModal from "../EntryModal/EntryModal.jsx";
import "./Calendar.css";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [gratitudeEntries, setGratitudeEntries] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // New state for title and content.
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [currentEntryId, setCurrentEntryId] = useState(null);

  //Decode token to get the user ID.
  useEffect(() => {
    const fetchUserId = () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken)
	  {
        try
		{
          const decodedToken = JSON.parse(atob(storedToken.split('.')[1]));
		  const idFromToken = decodedToken.userId ?? decodedToken.sub; //Fallback if using 'sub'.
          setUserId(idFromToken);
          console.log("Decoded userId:", idFromToken);
        }
		catch (e)
		{
          console.error('Error decoding token:', e);
        }
      }
    };
    fetchUserId();
  }, []);

  //Fetch all entries for the user.
  useEffect(() => {
    if (userId) {
      const fetchEntries = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/calendar/user/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if ( ( ! response.ok) && (response.status !== 204) )
		  {
			  throw new Error('Failed to fetch entries!');
		  }

          const data = response.status === 204 ? [] : await response.json();
		  
		  const formattedEntries = data.reduce((acc, entry) => {
			  acc[entry.entryDate] = {
				  id: entry.id,
				  title: entry.title,
				  content: entry.content,
			    };
				return acc;
          }, {});
		  
		  setGratitudeEntries(formattedEntries);
        }
		catch (error)
		{
          console.error('Error fetching entries:', error);
        }
      };

      fetchEntries();
    }
  }, [userId, token]);

  // Save or update entry.
  const handleSaveEntry = async () => {
	if ( ( ! title.trim()) || ( ! content.trim()))
	{
      alert('Title and content are required!');
      return; //Do not save empty entries.
    }
	
	const entryData = {
		entryDate: selectedDate.toISOString().split('T')[0], //"yyyy-MM-dd".
		title,
		content,
		userId
	};

	const existingEntryId = currentEntryId;

    try {
	  const method = existingEntryId ? 'PUT' : 'POST';
	  const url = existingEntryId
	    ? `http://localhost:8080/api/calendar/${existingEntryId}`
		: `http://localhost:8080/api/calendar`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(entryData),
      });

      if (!response.ok) throw new Error(`${method} failed!`);
	  
	  const updatedEntry = await response.json();

      // Use updatedEntry.entryDate for local state key.
	  const key = updatedEntry.entryDate;
      setGratitudeEntries(prev => ({
        ...prev,
        [key]: { 
		  id: updatedEntry.id,
		  title: updatedEntry.title,
		  content: updatedEntry.content,
		},
      }));
	  
	  setCurrentEntryId(updatedEntry.id); //Update currentEntryId for future edits.
	  setModalOpen(false);
	  showToast(existingEntryId ? "Entry updated!" : "Entry saved!");
    }
	catch (error)
	{
      console.error('Error saving entry:', error);
    }
  };
  
  //Autosave handler function.
  const handleAutosaveEntry = async () => {
	if ( ( ! title.trim()) || ( ! content.trim()))
	{
      alert('Title and content are required!');
      return; //Do not save empty entries.
    }
	
	const entryData = {
	  entryDate: selectedDate.toISOString().split('T')[0], //"yyyy-MM-dd".
	  title,
	  content,
	  userId
    };

	try
	{
		let url, method;
		
		if (currentEntryId)
		{
			//Existing entry -> autosave update.
			method = "PUT";
			url = `http://localhost:8080/api/calendar/${currentEntryId}`;
		}
		else
		{
			//New entry -> autosave should create the new entry.
			method = "POST";
			url = `http://localhost:8080/api/calendar`;
		}

      const response = await fetch(url,
		{
			method,
			headers: {
			  "Content-Type": "application/json",
			   Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(entryData),
		});

      if ( ! response.ok) throw new Error("Autosave failed!");
	  
	  const saved = await response.json();

      // Update local state.
	  const key = saved.entryDate;
	  setGratitudeEntries((prev) => ({
		  ...prev,
		  [key]: {
			  id: saved.id,
			  title: saved.title,
			  content: saved.content,
		  },
	  }));
	  
	  //Set currentEntryId after the first POST request.
	  if ( ! currentEntryId)
	  {
		  setCurrentEntryId(saved.id);
	  }
    }
	catch (error)
	{
      console.error('Autosave error:', error);
    }
  };
  
  //Delete an entry.
  const handleDeleteEntry = async () => {
	  if ( ! currentEntryId)
	  {
		  alert('No entry to delete for this date!');
		  return;
	  }
	  
	  if ( ! window.confirm('Are you sure you want to delete this entry?'))
	  {
		  return;
	  }
	  
	  try {
		  const response = await fetch(`http://localhost:8080/api/calendar/${currentEntryId}`, {
			  method: 'DELETE',
			  headers: { Authorization: `Bearer ${token}` },
		  });
		  
		  if (response.status === 204)
		  {
			  //Remove the entry from local state using entryData.entryDate.
			  const key = selectedDate.toISOString().split('T')[0];
			  setGratitudeEntries(prev => {
				  const updated = { ...prev };
				  delete updated[key];
				  return updated;
			  });
			  
			  setCurrentEntryId(null); //Reset currentEntryId.
			  setModalOpen(false);
		  }
		  else
		  {
			  throw new Error('Delete failed!');
		  }
	  }
	  catch (error)
	  {
		  console.error('Error deleting entry:', error);
	  }
  };
  
  //Handle day click.
  const handleDayClick = (day) => {
	  setSelectedDate(day);
	  const dateKey = format(day, 'yyyy-MM-dd');
	  const entry = gratitudeEntries[dateKey];
	  
	  if (entry)
	  {
		  setTitle(entry.title);
		  setContent(entry.content);
		  setCurrentEntryId(entry.id);
	  }
	  else
	  {
		  setTitle('');
		  setContent('');
		  setCurrentEntryId(null);
	  }
	  
	  setModalOpen(true); //Open the modal.
  };
  
  const handleCloseModal = () => setModalOpen(false);

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(selectedDate),
    end: endOfMonth(selectedDate),
  });

  const handleMonthChange = (increment) => {
    setSelectedDate(addMonths(selectedDate, increment));
  };
  
  const showToast = (message) => {
	  setToastMessage(message);
	  setToastVisible(true);
	  setTimeout(() => setToastVisible(false), 2000); //Auto-hide after 2 seconds.
  };
  
  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-nav-button" onClick={() => handleMonthChange(-1)}>&lt;</div>
        <h2>{format(selectedDate, 'MMMM yyyy')}</h2>
        <div className="calendar-nav-button" onClick={() => handleMonthChange(1)}>&gt;</div>
      </div>

	  <div className="calendar-grid">
	    {daysInMonth.map((day) => {
		  const dateKey = format(day, "yyyy-MM-dd");
		  const hasEntry = ! ! gratitudeEntries[dateKey];
		
		  const classes = [
			"calendar-day",
			isToday(day) ? "today" : "",
			isSameDay(day, selectedDate) ? "selected" : "",
			hasEntry ? "has-entry" : ""
		  ].join(" ");
		  
		return (
		  <div 
		    key={dateKey}
			className={classes}
		    onClick={() => handleDayClick(day)}
		>
		  {format(day, "d")}
		</div>
	  );
	 })}
	</div>

	<EntryModal
	  isOpen={modalOpen}
	  onClose={handleCloseModal}
	  onSave={handleSaveEntry}
	  onAutosave={handleAutosaveEntry}
	  onDelete={currentEntryId ? handleDeleteEntry : null}
	  title={title}
	  setTitle={setTitle}
	  content={content}
	  setContent={setContent}
	  isEditing={ ! ! currentEntryId}
	  entryDateLabel={format(selectedDate, "MMMM dd, yyyy")}
	  />
    {toastVisible && <div className="toast"> {toastMessage}</div>}
  </div>
  );
};

export default Calendar;