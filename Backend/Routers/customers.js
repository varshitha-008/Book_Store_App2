import express from 'express';
import { login, logout, register, token } from '../controlers/customer.js';
// import { register,login,token,logout } from '../controllers/userRouter.js';
const routerin = express.Router();

routerin.post('/register', register);
routerin.post('/login', login);
routerin.post('/token', token);
routerin.post('/logout', logout);

export default routerin;

