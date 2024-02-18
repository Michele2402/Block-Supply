import { List, ListItem, Button, Box, Text } from '@chakra-ui/react';
import axios from 'axios';
import { Request } from './CustomerRequestsList';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CustomerRequestsListTransportation = () => {
  const params = useParams();

  const [requestList, setRequestList] = useState<Request[]>();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .post('http://localhost:3001/request/ByTransportationCompany', {
        transportationCompanyInternetID: params.id,
      })
      .then((response) => {
        if (response.data.error) alert(response.data.error);
        else {
          setRequestList(response.data);
        }
      });
  }, [refresh]);

  const onSubmit = (id: number) => {
    axios
      .post('http://localhost:3001/request/delete', {
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
        {requestList?.map((elem, index) => {
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
              <Text>from company: {elem.CompanyInternetID}</Text>
              <Text>Request details</Text>
              <Button
                onClick={() => {
                  onSubmit(elem.id);
                }}
              >
                Send Invoice to customer
              </Button>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default CustomerRequestsListTransportation;
