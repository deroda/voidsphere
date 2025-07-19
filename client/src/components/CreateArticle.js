import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const CreateArticle = () => {
  const [article, setArticle] = useState({
    title: '',
    content: '',
    category: '',
    imageUrl: ''
  });
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const config = {
      headers: { 'x-auth-token': token }
    };

    axios.post('http://localhost:5000/articles/add', article, config)
      .then(res => {
        console.log(res.data);
        navigate('/');
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
          label="Article Title" 
          name="title" 
          value={article.title} 
          onChange={handleChange} 
          autoFocus 
        />
        <TextField 
          margin="normal" 
          required 
          fullWidth 
          label="Category" 
          name="category" 
          value={article.category} 
          onChange={handleChange} 
        />
        <TextField 
          margin="normal" 
          fullWidth 
          label="Image URL" 
          name="imageUrl" 
          value={article.imageUrl} 
          onChange={handleChange} 
        />
        <TextField 
          margin="normal" 
          required 
          fullWidth 
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