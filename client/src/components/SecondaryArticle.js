import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

const SecondaryArticle = ({ article }) => {
  if (!article) return null;

  return (
    <Card sx={{ height: '217px', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea component={Link} to={`/article/${article._id}`} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          sx={{ height: 120 }}
          image={article.imageUrl}
          alt={article.title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            sx={{
              fontSize: '1.1rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2', // Limit to 2 lines
              WebkitBoxOrient: 'vertical',
            }}
          >
            {article.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            By {article.author}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SecondaryArticle;
