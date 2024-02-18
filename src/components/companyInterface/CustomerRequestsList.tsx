import {
  ListItem,
  List,
  Button,
  Text,
  Box,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  AlertTitle,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../use-auth-client';

const schema = z.object({
  requestBody: z.string(),
  companyName: z.string(),
});

type FormData = z.infer<typeof schema>;

export interface Request {
  CompanyInternetID: string;
  TransportationCompanyInternetID: string;
  requestBody: string;
  id: number;
}

const CustomerRequestsList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [requestList, setRequestList] = useState<Request[]>();

  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post('http://localhost:3001/request/ByCompany', {
        companyInternetID: params.id,
      })
      .then((response) => {
        if (response.data.error) alert(response.data.error);
        else {
          setRequestList(response.data);
        }
      });
  }, []);

  const onSubmit = (data: FieldValues) => {
    console.log(data);

    axios.post('http://localhost:3001/request', data).then((response) => {
      if (response.data.error) alert(response.data.error);
      else {
        console.log(response.data);
        alert('request sent');
      }
    });
  };

  return (
    <HStack display={'flex'} alignItems={'flex-start'}>
      <List>
        {requestList?.map((elem, index) => {
          return (
            <ListItem
              key={index}
              padding={'7px'}
              width={'700px'}
              borderColor={'black'}
              border={'1px'}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              cursor={'pointer'}
              onClick={() => {
                navigate(`/request/${elem.id}`);
              }}
            >
              <Text>{elem.requestBody}</Text>
              <Text>Request details</Text>
              <Text>Request details</Text>
              {/* <Box display={'flex'} gap={'3px'}>
              <Text>Is available in inventory?</Text>
              <Button colorScheme="green" size={'sm'}>
                {' '}
                ✔
              </Button>
              <Button colorScheme="red" size={'sm'}>
                ✖
              </Button>
            </Box> */}
            </ListItem>
          );
        })}
      </List>
      <Box>
        <Text>Send a request from a customer</Text>
        <Box
          width={'100%'}
          height={'300px'}
          border={'1px'}
          borderColor={'ehite'}
          padding={'5px'}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel>Request body</FormLabel>
              <Input {...register('requestBody')} type="text" />
              {errors.requestBody && <p>{errors.requestBody.message}</p>}
              <FormLabel>Company name</FormLabel>
              <Input {...register('companyName')} type="text" />
              {errors.companyName && <p>{errors.companyName.message}</p>}
              <Box
                marginTop={'30px'}
                display={'flex'}
                justifyContent={'space-around'}
              >
                {' '}
                <Button type="submit">Submit</Button>
              </Box>
            </FormControl>
          </form>
        </Box>
      </Box>
    </HStack>
  );
};

export default CustomerRequestsList;
