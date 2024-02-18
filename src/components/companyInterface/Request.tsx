import { Box, Button, Input, Text, useStatStyles } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Request } from './CustomerRequestsList';

const RequestDetails = () => {
  const [request, setRequest] = useState<Request>();
  const [transportationCompany, setTransportationCompany] = useState<string>();
  const params = useParams();

  useEffect(() => {
    axios
      .post('http://localhost:3001/request/byId', {
        requestId: params.id,
      })
      .then((response) => {
        if (response.data.error) alert(response.data.error);
        else {
          setRequest(response.data);
        }
      });
  }, []);

  const handleSubmit = () => {
    axios
      .post('http://localhost:3001/request/sendToTransp', {
        requestId: params.id,
        transportationName: transportationCompany,
      })
      .then((response) => {
        if (response.data.error) alert(response.data.error);
        else {
          alert('request sent');
        }
      });
  };

  return (
    <Box
      width={'600px'}
      height={'400px'}
      border={'1px'}
      borderColor={'white'}
      marginX={'auto'}
      marginTop={'30px'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Text fontSize={'18px'}>{request?.requestBody}</Text>
      <Text fontSize={'18px'}>Request details</Text>
      <Box>
        <Text fontSize={'18px'}>Insert transportation company name</Text>
        <Input
          type="text"
          onChange={(event) => {
            setTransportationCompany(event?.target.value);
          }}
        ></Input>
      </Box>
      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
};

export default RequestDetails;
