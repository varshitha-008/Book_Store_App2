import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import App from '../src/App';
import api from './api';

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`/books/${id}`);
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <p>{book.description}</p>
    </div>
  );
};


export default BookDetailsPage;
