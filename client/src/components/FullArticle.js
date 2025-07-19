import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box, Button, Stack } from '@mui/material';

const FullArticle = () => {
  const [article, setArticle] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/articles/${id}`)
        .then(response => {
          setArticle(response.data);
        })
        .catch(error => {
          console.log('Error fetching the article:', error);
        });
    }
  }, [id]);

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this article?");
    if (confirmDelete) {
      axios.delete(`http://localhost:5000/articles/${id}`)
        .then(res => {
          console.log(res.data);
          navigate('/');
        })
        .catch(err => {
          console.error('There was an error deleting the article:', err);
        });
    }
  };

  if (!article) {
    return <div>Loading article...</div>;
  }

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {article.title}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button component={Link} to={`/article/edit/${id}`} variant="contained" color="primary">
            Edit
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Stack>
      </Box>
      <Typography variant="h6" color="text.secondary" paragraph>
        By {article.author}
      </Typography>
      <Box
        component="img"
        sx={{
          width: '100%',
          maxHeight: '450px',
          objectFit: 'cover',
          my: 3,
          borderRadius: '4px'
        }}
        src={article.imageUrl}
        alt={article.title}
      />
      <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
        {article.content}
      </Typography>
    </Container>
  );
};

export default FullArticle;