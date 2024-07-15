import React, { useState, useEffect } from 'react';
import SearchBar from './serch';
import BookList from './Booklist';
import Pagination from './pagination';
import api from './api';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/books');
        setBooks(response.data);
        console.log(books);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  // Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Bookstore</h1>
      <SearchBar />
      <BookList books={currentBooks} loading={loading} />
      <Pagination
        booksPerPage={booksPerPage}
        totalBooks={books.length}
        paginate={paginate}
      />
    </div>
  );
};


export default HomePage;
