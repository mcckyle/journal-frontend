//Filename: EntryModal.jsx

import React from "react";
import "./EntryModal.css";

const EntryModal = ({
	isOpen,
	onClose,
	onSave,
	onDelete,
	entryDateLabel,
	title,
	setTitle,
	content,
	setContent,
	isEditing
}) => {
	if ( ! isOpen)
	{
		return null;
	}
	
	return (
	  <div className="entry-modal-overlay" onClick={onClose}>
	    <div
		  className="entry-modal-content"
		  onClick={(e) => e.stopPropagation()}
		>
		  <h3 className="entry-modal-header">
		  {entryDateLabel ? `Entry for ${entryDateLabel}` : "Edit Entry"}
		  </h3>
		  
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
			  {isEditing ? "Update Entry" : 'Save Entry'}
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
		