//Filename: Login.jsx

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box, Alert, Paper, Divider } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState('');
  
  const onSubmit = async (data) => {
	  try {
		  const response = await fetch('http://localhost:8080/api/auth/signin', {
			  method: 'POST',
			  headers: { 'Content-Type': 'application/json' },
			  body: JSON.stringify(data),
		  });
		  
		  if ( ! response.ok)
		  {
			  throw new Error('Invalid username or password!');
		  }
		  
		  const result = await response.json();
		  const { token } = result;
		  
		  if (token)
		  {
			  localStorage.setItem('token', token);
			  navigate('/profile');
		  }
		  else
		  {
			  throw new Error('Token missing in response.');
		  }
	  }
	  catch (error)
	  {
		  setErrorMessage(error.message);
	  }
  };

  return (
    <Container className="auth-container" maxWidth="sm">
      <Paper elevation={5} className="auth-paper">
        <Typography variant="h4" className="auth-title">
		  Welcome Back!
		</Typography>
		<Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
		  Log in to continue your gratitude journey.
		</Typography>
		
		{errorMessage && <Alert severity="error" sx={{ mb: 2}}>{errorMessage}</Alert>}
		
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
          <Button
		    variant="contained"
			fullWidth
			type="submit"
			className="auth-button"
		  >
		    Login
		</Button>
        </form>
		
		<Divider sx={{ my: 3 }} />
		
		<Typography variant="body2" color="textSecondary">
		  Don’t have an account?{' '}
		  <Link to="/register" className="auth-link">Register</Link>
		</Typography>
      </Paper>
    </Container>
  );
};

export default Login;