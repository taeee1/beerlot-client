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
    <Tabs colorScheme="orange" pt="64px">
      <TabList px={"18px"}>
        <Tab flexGrow="1" color="orange.100">
          팔로잉
        </Tab>
        <Tab flexGrow="1" color="orange.100">
          전체보기
        </Tab>
      </TabList>
      <Divider />

      <TabPanels bg="yellow.100">
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
