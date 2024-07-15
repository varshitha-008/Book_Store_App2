import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack } from '@chakra-ui/react';
import axiosInstance from '../pages/api'; // Adjust the path as necessary

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/login', { email, password });
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <Box w="400px" p={4} m="20px auto">
      <VStack spacing={4}>
        <Heading as="h1">Login</Heading>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </FormControl>
        <Button onClick={handleLogin} colorScheme="orange" width="full">
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginForm;
