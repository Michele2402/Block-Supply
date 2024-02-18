import { Box, Text, HStack, Button } from '@chakra-ui/react';
import React from 'react';
import { useAuth } from './use-auth-client';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { IsAuthenticatedWithData, fakeLogout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    fakeLogout();
    navigate('/');
  };

  return (
    <Box
      backgroundColor={'#8cb46c'}
      height={'80px'}
      width={'100vw'}
      padding={'10px'}
    >
      <HStack
        height={'100%'}
        width={'100%'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Text fontSize={20}>Logo</Text>
        <Text></Text>
        <Text></Text>
        {IsAuthenticatedWithData ? (
          <Button onClick={handleLogout}>Log out</Button> // da sostituire con il vero login sulla mainnet
        ) : (
          <Box></Box>
        )}
      </HStack>
    </Box>
  );
};

export default Navbar;
