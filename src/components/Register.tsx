import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './use-auth-client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { FieldValues, useForm } from 'react-hook-form';

const schema = z.object({
  internetID: z.string(),
  companyName: z.string().min(4),
  email: z.string().email(),
  type_of_company: z.string().min(2),
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const navigate = useNavigate();

  const { loginWithData } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    // if (principal) data.internetID = principal;

    axios.post('http://localhost:3001/company', data).then((response) => {
      if (response.data.error) alert(response.data.error);
      else if (response.data.type_of_company == 'Supplier') {
        loginWithData(); //it needs to tell the system that the user is logged in with the company data
        navigate(`/companyInterface/${response.data.internetID}`);
      } else {
        loginWithData();
        navigate(`/transportationCompanyInterface/${response.data.internetID}`);
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
      <Text align={'center'}>
        If you are already reistered in the database, this page will not be
        shown
      </Text>
      <Box marginTop={'30px'}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel>Internet ID</FormLabel>
            <Text fontSize={'xs'}>
              (this is automatically retrived on the mainnet through the
              Internet ID login)
            </Text>
            <Input {...register('internetID')} type="text" />
            {errors.internetID && <p>{errors.internetID.message}</p>}
            <FormLabel>Company name</FormLabel>
            <Input {...register('companyName')} type="text" />
            {errors.companyName && <p>{errors.companyName.message}</p>}
            <FormLabel>Email address</FormLabel>
            <Input {...register('email')} type="text" />
            {errors.email && <p>{errors.email.message}</p>}
            <Select
              {...register('type_of_company')}
              placeholder="Type of company"
            >
              <option value="Supplier">Supplier</option>
              <option value="Transportation company">
                Transportation company
              </option>
            </Select>
            <Box
              marginTop={'30px'}
              display={'flex'}
              justifyContent={'space-around'}
            >
              {' '}
              <Button type="submit">Register</Button>
              <Button
                onClick={() => {
                  navigate('/');
                }}
              >
                Go back to home
              </Button>
            </Box>
          </FormControl>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
