//Filename: src/components/Profile.jsx

import React, { useEffect, useState } from "react";
import { Box, Avatar, Typography, Button, Modal, TextField, Alert, CircularProgress } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import "./Profile.css"; // Import the CSS file

const Profile = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [openEdit, setOpenEdit] = useState(false);
	const [editData, setEditData] = useState({ username: "", email: "", bio: "" });
	const [saving, setSaving] = useState(false);
	
	const handleLogout = () => {
      localStorage.removeItem("token");  // Clear the authentication token.
      window.location.href = "/login";   // Redirect to the login page.
    };
	
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
	
	const handleSaveChanges = async () => {
		try
		{
			setSaving(true);
			const token = localStorage.getItem("token");
			const response = await fetch("http://localhost:8080/api/users/update", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
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
	
	useEffect(() => {
		const fetchUser = async () => {
			try
			{
				const token = localStorage.getItem("token");
				
				if ( ! token)
				{
					window.location.href = "/login";
					return;
				}
				
				const response = await fetch("http://localhost:8080/api/auth/me", {
					headers: { Authorization: `Bearer ${token}` },
				});
				
				if ( ! response.ok)
				{
					throw new Error("Failed to fetch user details!");
				}
				
				const data = await response.json();
				setUser(data);
			}
			catch (error)
			{
				setError(error.message);
			}
			finally
			{
				setLoading(false);
			}
		};
		
		fetchUser();
	}, []);
	
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
			{user.username ? user.username.charAt(0).toUpperCase() : "?"}
		</Avatar>
	
		<Typography className="profile-username">
		  {user.username}
		</Typography>
		
		<Typography className="profile-email">
		  {user.email}
		</Typography>
		
		<Typography className="profile-bio">
		  { user.bio || "Grateful every day. 🌸"}
		</Typography>
	  </Box>
	  
	  <Box className="profile-actions">
		  <Button variant="outlined" onClick={handleOpenEdit}>
			Edit Profile
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