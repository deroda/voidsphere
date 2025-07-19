import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, Divider, Stack, Box, Button } from '@mui/material';
import FeaturedArticle from './FeaturedArticle';
import SecondaryArticle from './SecondaryArticle';
import ArticleListItem from './ArticleListItem';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const url = selectedTag
          ? `http://localhost:5000/articles/tag/${selectedTag}`
          : 'http://localhost:5000/articles/';
        const response = await axios.get(url);
        setArticles(response.data);
      } catch (error) {
        console.log('There was an error fetching the articles!', error);
      }
    };

    fetchArticles();
  }, [selectedTag]);

  // Slicing articles for the 3-column layout
  const featuredArticle = articles[0];
  const secondaryArticles = articles.slice(1, 3);
  const listArticles = articles.slice(3, 7);
  const remainingArticles = articles.slice(7);

  const allTags = [...new Set(articles.flatMap(article => article.tags))];

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Filter by Tag:</Typography>
        <Button onClick={() => setSelectedTag(null)} variant={!selectedTag ? 'contained' : 'outlined'}>All</Button>
        {allTags.map(tag => (
          <Button key={tag} onClick={() => setSelectedTag(tag)} variant={selectedTag === tag ? 'contained' : 'outlined'} sx={{ ml: 1 }}>
            {tag}
          </Button>
        ))}
      </Box>

      <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
        {/* Column 1: Featured Article */}
        <Grid item xs={12} md={6}>
          <FeaturedArticle article={featuredArticle} />
        </Grid>

        {/* Column 2: Secondary Articles */}
        <Grid item xs={12} md={3}>
          <Stack spacing={4} sx={{ height: '100%' }}>
            {secondaryArticles.map((article) => (
              <SecondaryArticle key={article._id} article={article} />
            ))}
          </Stack>
        </Grid>

        {/* Column 3: List of Articles */}
        <Grid item xs={12} md={3}>
          <Stack>
            {listArticles.map((article) => (
              <ArticleListItem key={article._id} article={article} />
            ))}
          </Stack>
        </Grid>
      </Grid>

      {/* Display remaining articles in a simple list below */}
      {remainingArticles.length > 0 && (
        <>
          <Divider sx={{ my: 4 }} />
          <Typography variant="h4" component="h2" gutterBottom>
            More Stories
          </Typography>
          {remainingArticles.map((article) => (
             <ArticleListItem key={article._id} article={article} />
          ))}
        </>
      )}
    </Container>
  );
};

export default ArticleList;
