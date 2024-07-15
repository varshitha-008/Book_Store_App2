import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack } from '@chakra-ui/react';
import axiosInstance from '../pages/api'; // Adjust the path as necessary

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/register', { email, password });
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <Box w="400px" p={4} m="20px auto">
      <VStack spacing={4}>
        <Heading as="h1">Register</Heading>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </FormControl>
        <Button onClick={handleRegister} colorScheme="orange" width="full">
          Register
        </Button>
      </VStack>
    </Box>
  );
};

export default RegisterForm;
