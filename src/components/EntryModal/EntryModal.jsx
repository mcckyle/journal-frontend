//Filename: EntryModal.jsx

import React, { useEffect, useRef, useState } from "react";
import "./EntryModal.css";

const EntryModal = ({
	isOpen,
	onClose,
	onSave,
	onAutosave,
	onDelete,
	entryDateLabel,
	title,
	setTitle,
	content,
	setContent,
	isEditing
}) => {
	const [saveStatus, setSaveStatus] = useState(""); //"Saving..." || "Saved ✓" || "".
	const autosaveTimer = useRef(null);
	
	//Debounced Autosave - triggers two seconds after typing.
	useEffect(() => {
		if ( ! isOpen)
		{
			return; //Cannot use null inside useEffect(), React expects nothing or a cleanup function.
		}
		
		setSaveStatus("Saving...");
		clearTimeout(autosaveTimer.current);
		
		autosaveTimer.current = setTimeout(async () => {
			//await onAutosave(); //Reuse parent save handler.
			if (onAutosave)
			{
				await onAutosave();
			}
			else
			{
				await onSave();
			}

			setSaveStatus("Saved ✓");
			
			//Clear the status after a short time.
			setTimeout(() => setSaveStatus(""), 1800);
		}, 2000);
		
		return () => clearTimeout(autosaveTimer.current);
	}, [title, content, isOpen]);
	
	if ( ! isOpen)
	{
		return null;
	}
	
	return (
	  <div className="entry-modal-overlay" onClick={onClose}>
	    <div
		  className="entry-modal-container"
		  onClick={(e) => e.stopPropagation()}
		>
		  <h3 className="entry-modal-header">
		    {entryDateLabel
			  ? `Entry for ${entryDateLabel}`
			  : isEditing
			  ? "Edit Entry"
			  : "New Entry"}
		  </h3>
		  
		  {/* Autosave Status */}
		  {saveStatus && (
		    <div className="entry-modal-status">{saveStatus}</div>
		  )}
		  
		  <input
		    type="text"
			className="entry-modal-input"
			placeholder="Title"
			value={title}
			onChange={(e) => setTitle(e.target.value)}
		  />

		  <textarea
		    className="entry-modal-textarea"
		    placeholder="Write your thoughts..."
			value={content}
			onChange={(e) => setContent(e.target.value)}
		  />
		  
		  <div className="entry-modal-actions">
	        <button className="entry-modal-save" onClick={onSave}>
			  {isEditing ? "Update Entry" : "Save Entry"}
		    </button>
			
			{isEditing && (
		      <button className="entry-modal-delete" onClick={onDelete}>
		        Delete
		      </button>
		    )}
	    </div>

		<button className="entry-modal-close" onClick={onClose}>
		  ✕
		</button>
      </div>
   </div>
   );
};

export default EntryModal;
		