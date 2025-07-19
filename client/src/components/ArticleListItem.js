import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Avatar, Grid, Divider } from '@mui/material';

const ArticleListItem = ({ article }) => {
  if (!article) return null;

  return (
    <>
      <Box 
        component={Link} 
        to={`/article/${article._id}`} 
        sx={{ 
          display: 'flex', 
          width: '100%',
          textDecoration: 'none', 
          color: 'inherit',
          py: 1.5 // Add padding top and bottom
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 'bold',
                lineHeight: 1.4, // Control the height of each line
                height: '2.8em', // Reserve space for exactly 2 lines (2 * 1.4em)
                overflow: 'hidden', // Hide text that overflows the container
              }}
            >
              {article.title}
            </Typography>
            
            {/* Category Tag */}
            <Box
              sx={{
                display: 'inline-block',
                bgcolor: '#d32f2f', // A shade of red
                color: 'white',
                px: 1,
                py: 0.2,
                mt: 0.5,
                mb: 0.5,
                borderRadius: '4px',
                textTransform: 'uppercase',
                fontSize: '0.65rem',
                fontWeight: 'bold',
                letterSpacing: '0.5px'
              }}
            >
              {article.category}
            </Box>

            <Typography variant="caption" color="text.secondary" display="block">
              By {article.author}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              variant="square"
              sx={{ width: 90, height: 70, bgcolor: 'grey.300', fontSize: '2rem' }}
              src={article.imageUrl}
              alt={article.title}
            >
              {/* Fallback if image fails to load */}
              {article.title ? article.title.charAt(0) : ''}
            </Avatar>
          </Grid>
        </Grid>
      </Box>
      <Divider />
    </>
  );
};

export default ArticleListItem;
