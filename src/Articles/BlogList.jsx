import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';

const BlogList = ({ refresh }) => {
  const { userInfo } = useContext(AuthContext);

  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  const getBlogs = () => {
    fetch(
      'https://tamkeen-dev.com/api/blogs-api?items_per_page=5&page=0&sort_by=created_date&sort_order=DESC',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(`${userInfo.username}:${userInfo.password}`)
        }
      }
    )
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => { throw new Error(err.message); });
        }
        return res.json();
      })
      .then(data => {
        setArticles(data);
      })
      .catch(err => {
        setError(err.message);
      });
  };

  useEffect(() => {
    getBlogs();
  }, []); 

  return (
    <>
      <h3>Articles</h3>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {articles.map((art, index) => (
        <div key={index}>
          <div>{art.title}</div>
          <div>{art.body}</div>
        </div>
      ))}
    </>
  );
};

export default BlogList;