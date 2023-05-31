import {
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import BeerReviews from "./BeerReviews";
import { LikedBeers } from "./LikedBeers";

const BeerInfo = () => {
  return (
    <Tabs colorScheme="orange" h="full" w="full" isFitted>
      <TabList px={"18px"}>
        <Tab>평가한 맥주</Tab>
        <Tab>좋아요한 맥주</Tab>
      </TabList>
      <Divider />

      <TabPanels bg="yellow.100" h="full">
        <TabPanel h="full">
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
