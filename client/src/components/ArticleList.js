import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard';
import { Container, Typography } from '@mui/material';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/articles/')
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.log('There was an error fetching the articles!', error);
      });
  }, []);

  return (
    // Container centers our content horizontally
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        Latest News
      </Typography>
      <div>
        {articles.map(currentarticle => (
          <ArticleCard article={currentarticle} key={currentarticle._id} />
        ))}
      </div>
    </Container>
  );
};

export default ArticleList;