import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import React from 'react';
import CustomerRequestsList from './CustomerRequestsList';
import RequestToCompany from './RequestToCompany';
import RequestsFromCompany from './RequestsFromCompany';

const Interface = () => {
  return (
    <Tabs marginTop={'10px'} marginX={'15%'} variant={'line'}>
      <TabList>
        <Tab>Customer requests</Tab>
        <Tab>Requests from companies</Tab>
        <Tab>Requests to companies</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <CustomerRequestsList></CustomerRequestsList>
        </TabPanel>
        <TabPanel>
          <RequestsFromCompany></RequestsFromCompany>
        </TabPanel>
        <TabPanel>
          <RequestToCompany></RequestToCompany>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Interface;
