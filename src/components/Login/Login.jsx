import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
	useEffect(() => {
	  const token = localStorage.getItem('token'); // Use 'token' here, not 'authToken'
	  if (token) {
		setIsLoggedIn(true);
	  }
	}, []);
	
	const handleRegister = (newUser) => {
        //setUser(newUser);
        localStorage.setItem('token', newUser.token);
        //localStorage.setItem('username', newUser.username);
        setIsLoggedIn(true);
    };
	
	const handleLogin = async (loggedInUser) => {
        if (loggedInUser.token)
		{
            localStorage.setItem('token', loggedInUser.token);
            //localStorage.setItem('username', loggedInUser.username);
            //setUser(loggedInUser);
            setIsLoggedIn(true);
        }
    };
	
	const handleLogout = () => {
        //setUser(null);
        localStorage.removeItem('token');
        //localStorage.removeItem('username');
        setIsLoggedIn(false);
    };

  const onSubmit = async (data) => {
	  try {
		const response = await fetch('http://localhost:8080/api/auth/signin', {
		  method: 'POST',
		  headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify(data),
		});

		if (!response.ok) {
		  throw new Error('Login failed');
		}

		const result = await response.json();
		console.log("Login response: ", result); // For debugging purposes...

		// Extract the token from the result
		const { token } = result;

		// Save the token to local storage
		if (token)
		{
		  localStorage.setItem('token', token);
		}
		else
		{
		  console.error('Token missing in response: ', result);
		  throw new Error('Token missing in response');
		}

		// Redirect to profile page after successful login
		navigate('/profile');
	  } catch (error) {
		setErrorMessage(error.message);
	  }
	};

  return (
    <Container maxWidth="sm">
      <Box mt={5} p={4} boxShadow={3} borderRadius={4} textAlign="center">
        <Typography variant="h4" gutterBottom>Login</Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField 
            label="Username" 
            fullWidth 
            margin="normal" 
            {...register('username', { required: 'Username is required' })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField 
            label="Password" 
            type="password" 
            fullWidth 
            margin="normal" 
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>Login</Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;