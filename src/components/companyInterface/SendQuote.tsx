import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { FieldValues, useForm } from 'react-hook-form';

const schema = z.object({
  quote: z.string(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  requestID: number;
}

const SendQuote = ({ requestID }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    axios
      .post('http://localhost:3001/requestB2B/sendQuote', {
        requestID: requestID,
        quote: data.quote,
      })
      .then((response) => {
        if (response.data.error) alert(response.data.error);
        else {
          console.log(response.data);
          alert('quote sent');
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormLabel textAlign={'center'}>Send a quote to the company</FormLabel>
      <FormControl border={'1px'} borderColor={'white'} padding={'5px'}>
        <FormLabel textAlign={'center'}>Quote</FormLabel>
        <Input {...register('quote')} type="text" />
        {errors.quote && <p>{errors.quote.message}</p>}
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

export default SendQuote;
