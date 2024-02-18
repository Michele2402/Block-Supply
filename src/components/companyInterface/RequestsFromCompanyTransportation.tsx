import React, { useEffect, useState } from 'react';
import { RequestB2B } from './RequestToCompany';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { List, ListItem, Button, Box, Text } from '@chakra-ui/react';

const RequestsFromCompanyTransportation = () => {
  const [requests, setRequests] = useState<RequestB2B[]>([] as RequestB2B[]);
  const [refresh, setRefresh] = useState(false);

  const params = useParams();

  useEffect(() => {
    axios
      .post('http://localhost:3001/requestB2B/byTranspCompany', {
        transportationCompanyID: params.id,
      })
      .then((response) => {
        if (response.data.error) alert(response.data.error);
        else {
          setRequests(response.data);
          console.log(response.data);
        }
      });
  }, []);

  const onSubmit = (id: number) => {
    axios
      .post('http://localhost:3001/requestB2B/delete', {
        requestId: id,
      })
      .then((response) => {
        if (response.data.error) alert(response.data.error);
        else {
          setRefresh(!refresh);
        }
      });
  };

  return (
    <Box
      marginX={'auto'}
      marginTop={'50px'}
      width={'900px'}
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'flex-start'}
      gap={'20px'}
    >
      <Text fontSize={'20px'}>List of Requests from customers</Text>
      <List width={'100%'}>
        {requests?.map((elem, index) => {
          return (
            <ListItem
              key={index}
              padding={'7px'}
              borderColor={'black'}
              border={'1px'}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Text>{elem.requestBody}</Text>
              <Text>from company: {elem.askingCompanyInternetID}</Text>
              <Text>to company: {elem.receivingCompanyInternetID}</Text>
              <Button
                onClick={() => {
                  onSubmit(elem.id);
                }}
              >
                Send Invoice to company
              </Button>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default RequestsFromCompanyTransportation;
