// client/src/components/ArticleList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/articles/')
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {articles.map(currentarticle => (
        <ArticleCard article={currentarticle} key={currentarticle._id} />
      ))}
    </div>
  );
};

export default ArticleList;