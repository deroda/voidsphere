import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ArticleCard from './ArticleCard';
import { Container, Typography } from '@mui/material';

const CategoryView = () => {
  const [articles, setArticles] = useState([]);
  const { categoryName } = useParams(); // Get the category name from the URL

  useEffect(() => {
    if (categoryName) {
      axios.get(`http://localhost:5000/articles/category/${categoryName}`)
        .then(response => {
          setArticles(response.data);
        })
        .catch(error => {
          console.log(`Error fetching articles for category ${categoryName}:`, error);
        });
    }
  }, [categoryName]); // Re-run this effect when the categoryName changes

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, textTransform: 'capitalize' }}>
        {/* Make the first letter of the category name uppercase */}
        Articles in: {categoryName}
      </Typography>
      <div>
        {articles.length > 0 ? (
          articles.map(currentarticle => (
            <ArticleCard article={currentarticle} key={currentarticle._id} />
          ))
        ) : (
          <Typography sx={{ mt: 2 }}>
            No articles found for this category.
          </Typography>
        )}
      </div>
    </Container>
  );
};

export default CategoryView;