import express from 'express';
// import { login, logout, register, token } from '../controlers/customer';
import { addbook, all, pagination, review } from '../controlers/books.js';
// import { register,login,token,logout } from '../controllers/userRouter.js';
const BookDetails = express.Router();

BookDetails.get('/all',all);
BookDetails.get('/', pagination);
BookDetails.get('/:reviews', review);
BookDetails.post('/addbook', addbook);

export default BookDetails;

