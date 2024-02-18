import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { FieldValues, useForm } from 'react-hook-form';

const schema = z.object({
  receivingCompanyName: z.string(),
  transportationCompanyName: z.string(),
  requestBody: z.string(),
});

type FormData = z.infer<typeof schema>;

const SendRequestToCompany = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const params = useParams();

  const onSubmit = (data: FieldValues) => {
    axios
      .post('http://localhost:3001/requestB2B', {
        requestBody: data.requestBody,
        askingCompanyInternetID: params.id,
        receivingCompanyName: data.receivingCompanyName,
        transportationCompanyName: data.transportationCompanyName,
      })
      .then((response) => {
        if (response.data.error) alert(response.data.error);
        else {
          alert('request sent');
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormLabel textAlign={'center'}>Send a request to a company</FormLabel>
      <FormControl border={'1px'} borderColor={'white'} padding={'5px'}>
        <FormLabel>Receiving company name</FormLabel>
        <Input {...register('receivingCompanyName')} type="text" />
        {errors.receivingCompanyName && (
          <p>{errors.receivingCompanyName.message}</p>
        )}
        <FormLabel>Transportation Company name</FormLabel>
        <Input {...register('transportationCompanyName')} type="text" />
        {errors.transportationCompanyName && (
          <p>{errors.transportationCompanyName.message}</p>
        )}
        <FormLabel>Request body</FormLabel>
        <Input {...register('requestBody')} type="text" />
        {errors.requestBody && <p>{errors.requestBody.message}</p>}

        <Box
          marginTop={'30px'}
          display={'flex'}
          justifyContent={'space-around'}
        >
          <Button type="submit">Send</Button>
        </Box>
      </FormControl>
    </form>
  );
};

export default SendRequestToCompany;
