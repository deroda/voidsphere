import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

const ArticleCard = ({ article }) => {
  return (
    // CardActionArea makes the entire card a clickable surface
    <CardActionArea component={Link} to={`/article/${article._id}`} sx={{ display: 'block' }}>
      <Card sx={{ display: 'flex', my: 2 }}>
        <CardMedia
          component="img"
          sx={{ width: 160, display: { xs: 'none', sm: 'block' } }} // Hide image on extra-small screens
          image={article.imageUrl}
          alt={article.title}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
            {article.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            By {article.author}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {/* Displaying a short snippet of the content */}
            {article.content.substring(0, 100)}...
          </Typography>
          <Typography variant="subtitle1" color="primary">
            Continue reading...
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

export default ArticleCard;