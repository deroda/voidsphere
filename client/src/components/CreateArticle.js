import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const CreateArticle = () => {
  const [article, setArticle] = useState({
    title: '',
    author: '',
    content: '',
    category: '',
    imageUrl: ''
  });
  const navigate = useNavigate();

  // Update state when user types in a field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/articles/add', article)
      .then(res => {
        console.log(res.data);
        navigate('/'); // Navigate to homepage on success
      })
      .catch(err => {
        console.error('There was an error creating the article:', err);
      });
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create New Article
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Article Title"
          name="title"
          autoFocus
          value={article.title}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="author"
          label="Author"
          name="author"
          value={article.author}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="category"
          label="Category"
          name="category"
          value={article.category}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          id="imageUrl"
          label="Image URL"
          name="imageUrl"
          value={article.imageUrl}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="content"
          label="Content"
          name="content"
          multiline
          rows={10}
          value={article.content}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Publish Article
        </Button>
      </Box>
    </Container>
  );
};

export default CreateArticle;