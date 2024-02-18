import { HStack, List, ListItem, Box, Text, Button } from '@chakra-ui/react';
import SendRequestToCompany from './SendRequestToCompany';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export interface RequestB2B {
  id: number;
  askingCompanyInternetID: string;
  receivingCompanyInternetID: string;
  transportationCompanyInternetID: string;
  requestBody: string;
  quote: string;
  quoteSent: string;
  quoteAccepted: boolean;
}

const RequestToCompany = () => {
  const [requests, setRequests] = useState<RequestB2B[]>([] as RequestB2B[]);

  const params = useParams();

  useEffect(() => {
    axios
      .post('http://localhost:3001/requestB2B/sent', {
        askingCompanyID: params.id,
      })
      .then((response) => {
        if (response.data.error) alert(response.data.error);
        else setRequests(response.data);
      });
  }, []);

  const handleQuote = (id: number, value: boolean) => {
    axios
      .post('http://localhost:3001/requestB2B/handleQuote', {
        requestID: id,
        value: value,
      })
      .then((response) => {
        if (response.data.error) alert(response.data.error);
        else console.log(response.data);
      });
  };

  return (
    <>
      <HStack
        display={'flex'}
        alignItems={'flex-start'}
        justifyContent={'space-between'}
      >
        <Box>
          <Text textAlign={'center'} fontSize={'18px'}>
            Requests Sent:
          </Text>

          <List>
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
                >
                  <Text>{elem.requestBody}</Text>
                  <Box>
                    {elem.quoteAccepted === true ? (
                      <Text>Quote accepted</Text>
                    ) : elem.quoteAccepted === false ? (
                      <Text>Quote refused</Text>
                    ) : elem.quoteSent ? (
                      <Box
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'flex-end'}
                      >
                        <Text>Quote: {elem.quote}</Text>
                        <HStack>
                          <Button
                            colorScheme="green"
                            onClick={() => {
                              handleQuote(elem.id, true);
                            }}
                          >
                            ✔
                          </Button>
                          <Button
                            colorScheme="red"
                            onClick={() => {
                              handleQuote(elem.id, false);
                            }}
                          >
                            X
                          </Button>
                        </HStack>
                      </Box>
                    ) : (
                      <Text>Sent</Text>
                    )}
                  </Box>
                </ListItem>
              );
            })}
          </List>
        </Box>
        <SendRequestToCompany></SendRequestToCompany>
      </HStack>
    </>
  );
};

export default RequestToCompany;
