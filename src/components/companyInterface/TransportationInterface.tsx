import CustomerRequestsList from './CustomerRequestsList';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import RequestsFromCompany from './RequestsFromCompany';
import RequestToCompany from './RequestToCompany';
import CustomerRequestsListTransportation from './CustomerRequestsListTransportation';
import RequestsFromCompanyTransportation from './RequestsFromCompanyTransportation';

const TransportationInterface = () => {
  return (
    <Tabs marginTop={'10px'} marginX={'15%'} variant={'line'}>
      <TabList>
        <Tab>Customer requests</Tab>
        <Tab>Requests from companies</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <CustomerRequestsListTransportation></CustomerRequestsListTransportation>
        </TabPanel>
        <TabPanel>
          <RequestsFromCompanyTransportation></RequestsFromCompanyTransportation>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TransportationInterface;
