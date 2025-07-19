import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <AppBar position="static" sx={{ backgroundColor: '#333' }}>
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
          The Daily Beast Clone
        </Typography>

        <Box>
          {user ? (
            <>
              <Button component={Link} to="/create" variant="outlined" sx={{ my: 1, mx: 1.5, color: 'white', borderColor: 'white' }}>
                New Post
              </Button>
              <Button onClick={logOut} sx={{ color: 'white' }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/register" sx={{ color: 'white' }}>Register</Button>
              <Button component={Link} to="/login" sx={{ color: 'white' }}>Login</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;