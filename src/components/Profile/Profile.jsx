//Filename: src/components/Profile.jsx

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Avatar, Typography, Button, Modal, TextField, Alert, CircularProgress } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { AuthContext } from "../../context/AuthContext";
import "./Profile.css"; // Import the CSS file.

const Profile = () => {
	const navigate = useNavigate();
	const { user, accessToken, logout, setUser } = useContext(AuthContext);
	const [loading, setLoading] = useState(!user);
	const [error, setError] = useState("");
	const [openEdit, setOpenEdit] = useState(false);
	const [editData, setEditData] = useState({ username: "", email: "", bio: "" });
	const [saving, setSaving] = useState(false);
	const [exporting, setExporting] = useState(false);
	const [importing, setImporting] = useState(false);
	
	const handleLogout = async () => {
		await logout();
		navigate("/signin", { replace: true });
	};
	
	//Open edit modal.
	const handleOpenEdit = () => {
		setEditData({
		username: user.username || "",
		email: user.email || "",
		bio: user.bio || "",
	  });
	  setOpenEdit(true);
	};
	
	const handleCloseEdit = () => setOpenEdit(false);
	
	const handleEditChange = (e) => {
		setEditData({ ...editData, [e.target.name]: e.target.value });
	};
	
	//Save profile changes.
	const handleSaveChanges = async () => {
		try
		{
			setSaving(true);
			
			const response = await fetch("http://localhost:8080/api/users/update", {
				method: "PUT",
				credentials: "include", //Use cookie-based auth.
				headers: {
					"Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify(editData),
			});
			
			if ( ! response.ok)
			{
				throw new Error("Failed to update profile!");
			}
			
			const result = await response.json();
			setUser(result.user);
			setOpenEdit(false);
		}
		catch (error)
		{
			setError(error.message);
		}
		finally
		{
			setSaving(false);
		}
	};
	
	//Fetch All User Entries.
	const fetchAllEntries = async () => {
		if ( ! user)
		{
			return;
		}
		
        const response = await fetch(`http://localhost:8080/api/calendar`, {
			headers: { Authorization: `Bearer ${accessToken}` },
            credentials: "include", //optional, but harmless if refresh is needed.
        });

        if ( ( ! response.ok) && (response.status !== 204) )
		{
			throw new Error('Failed to fetch entries!');
		}
		
		return response.ok ? await response.json() : [];
	};
	
	//Export Entries to JSON.
	const handleExportJSON = async () => {
		setExporting(true);
		const entries = await fetchAllEntries();
		const blob = new Blob([JSON.stringify(entries, null, 2)], {
			type: "application/json",
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "gratitude-entries.json";
		a.click();
		URL.revokeObjectURL(url);
		setExporting(false);
	};
	
	//Export Entries to Markdown.
	const handleExportMarkdown = async () => {
		setExporting(true);
		const entries = await fetchAllEntries();
		
		const md = entries
		  .map(e => `## ${e.entryDate}\n**${e.title}**\n\n${e.content}\n`)
		  .join("\n---\n\n");
		
		const blob = new Blob([md], { type: "text/markdown" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "gratitude-entries.md";
		a.click();
		URL.revokeObjectURL(url);
		setExporting(false);
	};
	
	//Export Entries to PDF.
	const handleExportPDF = async () => {
		setExporting(true);
		const entries = await fetchAllEntries();
		const { jsPDF } = await import("jspdf");
		
		const doc = new jsPDF();
		let y = 10;
		
		entries.forEach(entry => {
			doc.setFontSize(14);
			doc.text(entry.entryDate, 10, y);
			y += 6;
			doc.setFontSize(12);
			doc.text(entry.title, 10, y);
			y += 6;
			doc.setFontSize(10);
			doc.text(doc.splitTextToSize(entry.content, 180), 10, y);
			y += 12;
			if (y > 270)
			{
				doc.addPage();
				y = 10;
			}
		});
		
		doc.save("gratitude-entries.pdf");
		setExporting(false);
	};
	
	//Import Entries From JSON File.
	const handleImportJSON = async (event) => {
		const file = event.target.files[0];
		if ( ! file)
		{
			return;
		}
		
		setImporting(true);
		let imported;
		try
		{
			imported = JSON.parse(await file.text());
		}
		catch
		{
			alert("Invalid JSON file!");
			setImporting(false);
			return;
		}
		
		for (const entry of imported)
		{
			await fetch("http://localhost:8080/api/calendar", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify({ ...entry, userId: user?.id }),
			});
		}
		
		alert("Entries imported successfully!");
		setImporting(false);
		window.location.reload();
	};
	
	//Early return if user is null.
	if ( ! user)
	{
		return (
		  <Box className="center-screen">
		    <Typography>Redirecting...</Typography>
		  </Box>
		);
	}
	
	if (loading)
	{
		return (
		  <Box className="center-screen">
		    <CircularProgress />
		  </Box>
		);
	}
	
	if (error)
	{
		return (
		  <Box className="center-screen">
		    <Alert severity="error">{error}</Alert>
		  </Box>
		);
	}

  return (
  <Box className="profile-page">
	<Box className="profile-card">

	    {/* Header Panel */}
		<Box className="profile-header">
		  <Avatar
			sx={{
				bgcolor: deepPurple[500],
				width: 106,
				height: 106,
				fontSize: '2.8rem',
			}}
		  >
			{user?.username ? user.username.charAt(0).toUpperCase() : "?"}
		</Avatar>
	
		<Typography className="profile-username">
		  {user?.username}
		</Typography>
		
		<Typography className="profile-email">
		  {user?.email}
		</Typography>
		
		<Typography className="profile-bio">
		  { user?.bio || "Grateful every day. 🌸"}
		</Typography>
	  </Box>
	  
	  <Box className="profile-actions">
		  <Button variant="outlined" onClick={handleOpenEdit}>
			Edit Profile
		  </Button>
		  <Button variant="outlined" onClick={handleExportJSON} disabled={exporting}>
			Export JSON
		  </Button>
		  <Button variant="outlined" onClick={handleExportMarkdown} disabled={exporting}>
			Export Markdown
		  </Button>
		  <Button variant="outlined" onClick={handleExportPDF} disabled={exporting}>
			Export PDF
		  </Button>
		  
		  <Button variant="contained" disabled={importing} component="label">
			Import JSON
		    <input
			  type="file"
			  accept="application/json"
			  onChange={handleImportJSON}
			  hidden
		    />
		  </Button>
		  <Button variant="contained" color="error" onClick={handleLogout}>
			Logout
		  </Button>
		</Box>
	  </Box>
	  
	{/* Modal */}
	<Modal open={openEdit} onClose={handleCloseEdit}>
	  <Box className="profile-modal modalFade">
		<Typography className="modal-title">Edit Profile</Typography>
		
		<TextField
		  name="username"
		  label="Username"
		  fullWidth
		  margin="normal"
		  value={editData.username}
		  onChange={handleEditChange}
		/>
		<TextField
		  name="email"
		  label="Email"
		  fullWidth
		  margin="normal"
		  value={editData.email}
		  onChange={handleEditChange}
		/>
		<TextField
		  name="bio"
		  label="Bio"
		  fullWidth
		  margin="normal"
		  multiline
		  rows={3}
		  value={editData.bio}
		  onChange={handleEditChange}
		/>
		
		<Box className="modal-actions">
		  <Button variant="outlined" onClick={handleCloseEdit}>
			Cancel
		  </Button>
		  <Button
		    variant="contained"
			disabled={saving}
			onClick={handleSaveChanges}
		  >
			{saving ? "Saving..." : "Save Changes"}
		  </Button>
		</Box>
	  </Box>
	</Modal>  
  </Box>
  );
};

export default Profile;