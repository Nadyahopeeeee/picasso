import React from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import PostList from './components/PostList';
import './App.css';

function App() {
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Typography variant="h4" component="h1" gutterBottom>
        List of Posts
      </Typography>
      <PostList />
    </Container>
  );
}

export default App;
