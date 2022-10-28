import {
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import BeerReviews from "./BeerReviews";
import LikedBeers from "./LikedBeers";

const BeerInfo = () => {
  return (
    <Tabs colorScheme="blue">
      <TabList px={"18px"}>
        <Tab flexGrow="1" color="Orange.400">
          <Text>평가한 맥주</Text>
        </Tab>
        <Tab flexGrow="1" color="Orange.400">
          <Text>좋아요한 맥주</Text>
        </Tab>
      </TabList>
      <Divider />

      <TabPanels>
        <TabPanel bg="Yellow.50">
          <BeerReviews />
        </TabPanel>
        <TabPanel>
          <LikedBeers />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default BeerInfo;
