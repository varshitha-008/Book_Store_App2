import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/homepage';
import BookDetailsPage from './pages/bookdetails';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { ChakraProvider, Button } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <nav>
          <Link to="/"><Button colorScheme="teal">Home</Button></Link>
          <Link to="/login"><Button colorScheme="blue">Login</Button></Link>
          <Link to="/register"><Button colorScheme="orange">Register</Button></Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} /> 
          <Route path="/books/:id" element={<BookDetailsPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
