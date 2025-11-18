//Filename: EntriesTimeline.jsx

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import EntryModal from "../EntryModal/EntryModal.jsx";
import "./EntriesTimeline.css";

const EntriesTimeline = () => {
	const [entries, setEntries] = useState([]);
	const [token] = useState(localStorage.getItem("token"));
	const [userId, setUserId] = useState(null);
	
	const [search, setSearch] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	
	const [editingEntry, setEditingEntry] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	
	//Load userId from JWT.
	useEffect(() => {
		try {
			const decoded = JSON.parse(atob(token.split(".")[1]));
			setUserId(decoded.userId ?? decoded.sub);
		}
		catch (e) {
			console.error("Token decode error:", e);
		}
	}, [token]);
	
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
		  setEntries(data);
        }
		catch (error)
		{
          console.error('Error fetching entries:', error);
        }
      };

      fetchEntries();
    }
  }, [userId, token]);
  
    //Update entry.
  const handleSaveFromTimeline = async () => {
	if ( ( ! editingEntry?.title.trim()) || ( ! editingEntry?.content.trim()))
	{
      alert('Title and content are required!');
      return; //Do not save empty entries.
    }

	try {
		const updatedData = {
			entryDate: editingEntry.entryDate,
			title: editingEntry.title,
			content: editingEntry.content,
			userId,
		};

      const response = await fetch(
	    `http://localhost:8080/api/calendar/${editingEntry.id}`,
		{
			method: "PUT",
			headers: {
			  "Content-Type": "application/json",
			   Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(updatedData),
		}
      );

      if ( ! response.ok) throw new Error("Update failed!");
	  
	  const updatedEntry = await response.json();

      // Update local UI state.
	  setEntries((prev) =>
	    prev.map((e) => (e.id === updatedEntry.id ? updatedEntry : e))
	  );
	  setModalOpen(false);
    }
	catch (error)
	{
      console.error('Timeline update error:', error);
    }
  };
  
    //Delete an entry.
    const handleDeleteFromTimeline = async () => {
	  if ( ! editingEntry)
	  {
		  alert("No entry to delete!");
		  return;
	  }
	  
	  if ( ! window.confirm("Are you sure you want to delete this entry?"))
	  {
		  return;
	  }
	  
	  try {
		  const response = await fetch(`http://localhost:8080/api/calendar/${editingEntry.id}`, {
			  method: "DELETE",
			  headers: { Authorization: `Bearer ${token}` },
		  });
		  
		  if (response.status === 204)
		  {
			  //Remove entry using array filter.
			  setEntries(prev => prev.filter(e => e.id !== editingEntry.id));
			  setEditingEntry(null);
			  setModalOpen(false);
		  }
		  else
		  {
			  throw new Error("Delete failed!");
		  }
	  }
	  catch (error)
	  {
		  console.error("Error deleting entry:", error);
	  }
  };
	
	//Filter logic.
	const filtered = entries.filter(entry => {
		const matchesSearch =
			entry.title.toLowerCase().includes(search.toLowerCase()) ||
			entry.content.toLowerCase().includes(search.toLowerCase());
			
		const date = new Date(entry.entryDate);
		
		const matchesStart = startDate ? date >= new Date(startDate) : true;
		const matchesEnd = endDate ? date <= new Date(endDate) : true;
		
		return matchesSearch && matchesStart && matchesEnd;
	});
	
	//Open the modal for editing (Calendar modal reused).
	const openEdit = (entry) => {
		setEditingEntry(entry);
		setModalOpen(true);
	};
	
	return (
	  <div className="timeline-wrapper">
	    <h1 className="timeline-title"> All Journal Entries</h1>
		
		{/* Filters */}
		<div className="timeline-filters">
		  <input
		    type="text"
			className="timeline-search"
			placeholder="Search by title or keyword..."
			value={search}
			onChange={(e) => setSearch(e.target.value)}
	      />
		  
		  <div className="timeline-date-filters">
		    <input
			  type="date"
			  value={startDate}
			  onChange={(e) => setStartDate(e.target.value)}
			/>
			<input
			  type="date"
			  value={endDate}
			  onChange={(e) => setEndDate(e.target.value)}
			/>
		  </div>
		</div>
		
		{/* Timeline List */}
		<div className="timeline-list">
			{filtered.length === 0 ? (
			  <p className="no-entries">No entries found!</p>
			) : (
			  filtered.map((entry) => (
				<div className="timeline-entry" key={entry.id}>
				  <div className="timeline-entry-date">
					{format(new Date(entry.entryDate), "MMMM dd, yyyy")}
				  </div>

				  <div className="timeline-card">
					<h3>{entry.title}</h3>
					<p>{entry.content.substring(0, 150)}...</p>
					
					<button className="timeline-edit-btn" onClick={() => openEdit(entry)}>
					  Edit
					</button>
				  </div>
				</div>
			))
		  )}
		</div>
		
		{/* Modal. */}
		<EntryModal
		  isOpen={modalOpen}
		  onClose={() => setModalOpen(false)}
		  onSave={handleSaveFromTimeline}
		  onDelete={handleDeleteFromTimeline}
		  title={editingEntry?.title || ""}
		  setTitle={(v) => setEditingEntry({ ...editingEntry, title: v })}
		  content={editingEntry?.content || ""}
		  setContent={(v) => setEditingEntry({ ...editingEntry, content: v })}
		  isEditing={true}
		  entryDateLabel={
			  editingEntry?.entryDate
			  ? format(new Date(editingEntry.entryDate), "MMMM dd, yyyy")
			  : ""
		  }
		/>
	  </div>
	);
};

export default EntriesTimeline;
