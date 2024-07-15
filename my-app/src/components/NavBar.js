import { Box, Flex, Link, Button, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <Box bg={useColorModeValue('orange.400', 'orange.700')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box>Book Store</Box>
        <Flex alignItems={'center'}>
          <RouterLink to="/login">
            <Button bg={'whiteAlpha.900'} color={'black'} mr={4}>
              Login
            </Button>
          </RouterLink>
          <RouterLink to="/register">
            <Button bg={'whiteAlpha.900'} color={'black'}>
              Register
            </Button>
          </RouterLink>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
