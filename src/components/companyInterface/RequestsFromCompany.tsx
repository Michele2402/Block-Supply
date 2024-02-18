import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RequestB2B } from './RequestToCompany';
import { List, ListItem, Box, Text, Button, HStack } from '@chakra-ui/react';
import SendRequestToCompany from './SendRequestToCompany';
import SendQuote from './SendQuote';

const RequestsFromCompany = () => {
  const [requests, setRequests] = useState<RequestB2B[]>([] as RequestB2B[]);
  const [showQuote, setShowQuote] = useState<undefined | number>();

  const params = useParams();

  useEffect(() => {
    axios
      .post('http://localhost:3001/requestB2B/received', {
        receivingCompanyID: params.id,
      })
      .then((response) => {
        if (response.data.error) alert(response.data.error);
        else setRequests(response.data);
      });
  }, []);

  return (
    <HStack
      display={'flex'}
      alignItems={'flex-start'}
      justifyContent={'space-between'}
    >
      <Box>
        <Text fontSize={'18px'}>Requests Received:</Text>

        <List margin={'auto'}>
          {requests.map((elem, index) => {
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
              >
                <Text>{elem.requestBody}</Text>
                <Text>from: {elem.askingCompanyInternetID}</Text>
                <Text>
                  {elem.quoteAccepted === true ? (
                    <Text>Quote accepted</Text>
                  ) : elem.quoteAccepted === false ? (
                    <>
                      <Text>Quote refused</Text>
                      <Button
                        onClick={() => {
                          setShowQuote(elem.id);
                        }}
                      >
                        Send quote
                      </Button>
                    </>
                  ) : !elem.quoteSent ? (
                    <Button
                      onClick={() => {
                        setShowQuote(elem.id);
                      }}
                    >
                      Send quote
                    </Button>
                  ) : (
                    <Text>Quote sent</Text>
                  )}
                </Text>
              </ListItem>
            );
          })}
        </List>
      </Box>
      {showQuote && <SendQuote requestID={showQuote}></SendQuote>}
    </HStack>
  );
};

export default RequestsFromCompany;
