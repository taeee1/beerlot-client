import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
} from "@chakra-ui/react";
import FollowingTabPanelList from "./FollowingTabPanel";
import AllTabPanelList from "./AllTabPanelList";

const FeedTabList = () => {
  return (
    <Tabs colorScheme="orange">
      <TabList px={"18px"}>
        <Tab flexGrow="1" color="Orange.300">
          팔로잉
        </Tab>
        <Tab flexGrow="1" color="Orange.300">
          전체보기
        </Tab>
      </TabList>
      <Divider />

      <TabPanels bg="Yellow.50">
        <TabPanel>
          <FollowingTabPanelList />
        </TabPanel>
        <TabPanel>
          <AllTabPanelList />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default FeedTabList;
