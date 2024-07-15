import React from 'react';
import { Link } from 'react-router-dom';

const BookList = ({ books, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      {books.map(book => (
        <div key={book._id}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <Link to={`/books/${book._id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};


export default BookList;
