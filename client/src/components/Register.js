import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, Grid } from '@mui/material';

const Register = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users/register', user);
      navigate('/login'); // Redirect to login after successful registration
    } catch (err) {
      // Robust error handling
      if (err.response && err.response.data && err.response.data.msg) {
        // Handle specific errors sent from the backend
        setError(err.response.data.msg);
      } else if (err.message) {
        // Handle network errors or other generic issues
        setError(err.message);
      } else {
        // Fallback for any other kind of error
        setError('An unknown error occurred. Please try again.');
      }
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography component="h1" variant="h5">Register</Typography>
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField 
          margin="normal" 
          required 
          fullWidth 
          label="Username" 
          name="username" 
          onChange={handleChange} 
          autoFocus 
        />
        <TextField 
          margin="normal" 
          required 
          fullWidth 
          label="Password" 
          name="password" 
          type="password" 
          onChange={handleChange} 
        />
        <Button 
          type="submit" 
          fullWidth 
          variant="contained" 
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/login">
              {"Already have an account? Login"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Register;