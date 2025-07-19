import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Container, Typography, TextField, Button, Box, Grid } from '@mui/material';

const Login = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { loginAction } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginRes = await axios.post('http://localhost:5000/users/login', user);
      loginAction(loginRes.data);
      navigate('/');
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
      <Typography component="h1" variant="h5">Login</Typography>
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
          Login
        </Button>
        <Grid container>
          <Grid item>
            <Link to="/register">
              {"Don't have an account? Register"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;