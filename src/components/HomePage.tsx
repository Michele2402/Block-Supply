import { useNavigate } from 'react-router-dom';
import { useAuth } from './use-auth-client';
import { Box, Button, Text } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';

function HomePage() {
  const { login, fakeLogin, fakePrincipal, loginWithData } = useAuth();

  const navigate = useNavigate();

  // const {principal} = useAuth();   on the mainnet, this value will be used

  const handleLogin = () => {
    fakeLogin(); //this will be login on the mainnet, which will give the principal information to the context

    axios
      .post('http://localhost:3001/company/checkprincipal', {
        value: fakePrincipal,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data == 'company not found') navigate('/register');
        else if (response.data.type_of_company == 'Supplier') {
          loginWithData();
          navigate(`/companyInterface/${response.data.internetID}`);
        } else {
          loginWithData();
          navigate(
            `/transportationCompanyInterface/${response.data.internetID}`,
          );
        }
      });
  };

  return (
    <Box
      height={400}
      width={700}
      margin={'auto'}
      marginTop={'20px'}
      backgroundColor={'gray.700'}
    >
      <Text textAlign={'center'} fontSize={20}>
        Software presentation
      </Text>
      <Box display={'flex'} justifyContent={'center'} marginTop={'100px'}>
        <Button
          //  onClick={login}       this will be uncommented when deployed on the mainnet
          onClick={handleLogin}
        >
          Log in with Internet Identity
        </Button>
      </Box>
    </Box>
  );
}

export default HomePage;
