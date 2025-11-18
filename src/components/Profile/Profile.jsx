//Filename: src/components/Profile.jsx

import React, { useEffect, useState } from "react";
import { Box, Avatar, Typography, Button, Modal, TextField, Alert, CircularProgress } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import "./Profile.css"; // Import the CSS file

const Profile = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [openEdit, setOpenEdit] = useState(false);
	const [editData, setEditData] = useState({ username: '', email: '', bio: '' });
	const [saving, setSaving] = useState(false);
	
	const handleLogout = () => {
      // Implement logout functionality (clear token, redirect, etc.)
      localStorage.removeItem('token');  // Clear authentication token
      window.location.href = '/login';   // Redirect to login page
    };
	
	const handleOpenEdit = () => {
		setEditData({
		username: user.username || '',
		email: user.email || '',
		bio: user.bio || '',
	  });
	  setOpenEdit(true);
	};
	
	const handleCloseEdit = () => setOpenEdit(false);
	
	const handleEditChange = (e) => {
		const { name, value } = e.target;
		setEditData({ ...editData, [name]: value });
	};
	
	const handleSaveChanges = async () => {
		try {
			setSaving(true);
			const token = localStorage.getItem('token');
			
			//Placeholder endpoint...to connect to the backend.
			const response = await fetch('http://localhost:8080/api/users/update', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(editData),
			});
			
			if ( ! response.ok)
			{
				throw new Error('Failed to update profile.');
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
			try {
				const token = localStorage.getItem('token');
				
				if ( ! token)
				{
					window.location.href = '/login';
					return;
				}
				
				const response = await fetch('http://localhost:8080/api/auth/me', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				
				if ( ! response.ok)
				{
					throw new Error('Failed to fetch user details.');
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
		  <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
		    <CircularProgress />
		  </Box>
		);
	}
	
	if (error)
	{
		return (
		  <Box textAlign="center" mt={5}>
		    <Alert severity="error">{error}</Alert>
		  </Box>
		);
	}

  return (
    <Box
	  sx={{
		  minHeight: "100vh",
		  width: "100%",
		  display: "flex",
		  justifyContent: "center",
		  p: { xs: 2, md: 4 },
		  background: "linear-gradient(160deg, #fffdf8, #f5efe2)"
	  }}
	>
	  <Box
		  sx={{
			  width: "100%",
			  maxWidth: "720px",
			  display: "flex",
			  flexDirection: "column",
			  borderRadius: "28px",
			  overflow: "hidden",
			  background: "rgba(255, 255, 255, 0.55)",
			  backdropFilter: "blur(18px)",
			  boxShadow: "0 10px 32px rgba(0, 0, 0, 0.10)"
		  }}
	  >
	    {/* Header Panel */}
	    <Box
		  sx={{
			  textAlign: "center",
			  p: { xs: 4, md: 6},
			  background: "linear-gradient(140deg, #eae3ff, #d8cbff)"
		  }}
	    >
		  <Avatar
		    sx={{
				bgcolor: deepPurple[500],
				width: 110,
				height: 110,
				margin: "0 auto",
				fontSize: '3rem',
				boxShadow: "0 6px 20px rgba(0, 0, 0, 0.18)",

			}}
		  >
		    {user.username ? user.username.charAt(0).toUpperCase() : "?"}
		</Avatar>
		
		<Typography variant="h4" sx={{ mt: 2, fontWeight: 700 }}>
		  {user.username}
		</Typography>
		
		<Typography variant="body1" sx={{ opacity: 0.8 }}>
		  {user.email}
		</Typography>
		
		<Typography
		  variant="body2"
		  sx={{ mt: 1, opacity: 0.7, fontStyle: "italic" }}
		>
		  { user.bio || "Grateful every day. 🌸"}
		</Typography>
	  </Box>
	  
	  {/* Controls. */}
	  <Box sx={{ p: { xs: 3, md: 4 }, textAlign: "center" }}>
	    <Box
		  sx={{
			  display: "flex",
			  justifyContent: "center",
			  gap: 2
		  }}
		>
          <Button variant="outlined" onClick={handleOpenEdit}>
		    Edit Profile
		  </Button>
          <Button variant="contained" color="error" onClick={handleLogout}>
		    Logout
		  </Button>
        </Box>
      </Box>
    </Box>
	
	{/* Modal */}
	<Modal open={openEdit} onClose={handleCloseEdit}>
	  <Box className="modalFade"
	    sx={{
			position: "absolute",
			top: "50%",
			left: "50%",
			width: "90%",
			maxWidth: "480px",
			transform: "translate(-50%, -50%)",
			background: "#ffffff",
			borderRadius: "22px",
			p: 4,
			boxShadow: "0 10px 32px rgba(0, 0, 0, 0.15)"
		}}
	  >
	    <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
		  Edit Profile
		</Typography>
		
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
		
		<Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
		  <Button variant="outlined" onClick={handleCloseEdit}>
		    Cancel
		  </Button>
		  <Button variant="contained" onClick={handleSaveChanges} disabled={saving}>
		    {saving ? "Saving..." : "Save Changes"}
		  </Button>
		 </Box>
		</Box>
	  </Modal>  
    </Box>
  );
};

export default Profile;