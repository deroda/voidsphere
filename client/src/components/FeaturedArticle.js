import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Typography, Box } from '@mui/material';

const FeaturedArticle = ({ article }) => {
  if (!article) return null;

  return (
    <Paper
      component={Link}
      to={`/article/${article._id}`}
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${article.imageUrl})`,
        textDecoration: 'none',
        height: '450px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      {/* Dark overlay for text readability */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.5)',
          borderRadius: '4px'
        }}
      />
      <Box sx={{ p: 3, position: 'relative' }}>
        <Typography
          component="h1"
          variant="h4"
          color="inherit"
          gutterBottom
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '3', // Limit to 3 lines
            WebkitBoxOrient: 'vertical',
          }}
        >
          {article.title}
        </Typography>
        <Typography variant="h6" color="inherit">
          By {article.author}
        </Typography>
      </Box>
    </Paper>
  );
};

export default FeaturedArticle;
