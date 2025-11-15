//Filename: Register.jsx

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box, Alert, Paper, Divider } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState('');

  const onSubmit = async (data) => {
    try
	{
      const response = await fetch('http://localhost:8080/api/auth/register', {
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
		  Create Account
		</Typography>
		<Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
		  Start your gratitude journey today.
		</Typography>
		
		{errorMessage && <Alert severity="error" sx={{mb: 2}}>{errorMessage}</Alert>}
		
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
            label="Email" 
            fullWidth 
            margin="normal" 
            {...register('email', { required: 'Email is required' })}
            error={!!errors.email}
            helperText={errors.email?.message}
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
		    Register
		  </Button>
        </form>
		
		<Divider sx={{ my: 3}} />
		
		<Typography variant="body2" color="textSecondary">
		  Already have an account?{' '}
		  <Link to="/login" className="auth-link">Login</Link>
		</Typography>
      </Paper>
    </Container>
  );
};

export default Register;