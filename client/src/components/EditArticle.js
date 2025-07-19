import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const EditArticle = () => {
  const [article, setArticle] = useState({
    title: '',
    author: '',
    content: '',
    category: '',
    imageUrl: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();

  // **1. FETCH EXISTING DATA**
  // When the component loads, get the current article data from the server
  useEffect(() => {
    axios.get(`http://localhost:5000/articles/${id}`)
      .then(response => {
        setArticle(response.data);
      })
      .catch(err => {
        console.error('Error fetching article for editing:', err);
      });
  }, [id]);

  // Update state when user types in a field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // **2. SUBMIT UPDATED DATA**
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`http://localhost:5000/articles/update/${id}`, article)
      .then(res => {
        console.log(res.data);
        navigate(`/article/${id}`); // Navigate back to the article page
      })
      .catch(err => {
        console.error('There was an error updating the article:', err);
      });
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Article
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        {/* The "value" prop pre-populates the form with the fetched data */}
        <TextField margin="normal" required fullWidth label="Article Title" name="title" value={article.title} onChange={handleChange} />
        <TextField margin="normal" required fullWidth label="Author" name="author" value={article.author} onChange={handleChange} />
        <TextField margin="normal" required fullWidth label="Category" name="category" value={article.category} onChange={handleChange} />
        <TextField margin="normal" fullWidth label="Image URL" name="imageUrl" value={article.imageUrl} onChange={handleChange} />
        <TextField margin="normal" required fullWidth label="Content" name="content" multiline rows={10} value={article.content} onChange={handleChange} />

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};

export default EditArticle;