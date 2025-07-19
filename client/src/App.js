import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ArticleList from './components/ArticleList';
import FullArticle from './components/FullArticle';
import CategoryView from './components/CategoryView';
import CreateArticle from './components/CreateArticle';
import EditArticle from './components/EditArticle';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/article/:id" element={<FullArticle />} />
        <Route path="/category/:categoryName" element={<CategoryView />} />
        <Route path="/create" element={<CreateArticle />} />
        <Route path="/article/edit/:id" element={<EditArticle />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;