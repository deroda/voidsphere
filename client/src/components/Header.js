// client/src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Header = () => {
  const categories = ['Technology', 'Politics', 'Sports', 'Health'];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#333' }}>
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
          The Daily Beast Clone
        </Typography>

        <Box>
          {categories.map((category) => (
            <Button key={category} component={Link} to={`/category/${category.toLowerCase()}`} sx={{ color: 'white' }}>
              {category}
            </Button>
          ))}
          {/* --- ADD THIS BUTTON --- */}
          <Button component={Link} to="/create" variant="outlined" sx={{ my: 1, mx: 1.5, color: 'white', borderColor: 'white' }}>
            New Post
          </Button>
          {/* -------------------- */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;