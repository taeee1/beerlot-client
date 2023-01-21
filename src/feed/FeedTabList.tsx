import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
} from "@chakra-ui/react";
import AllTabPanelList from "./AllTabPanelList";
import {UpcomingFeed} from "./UpcomingFeed";

const FeedTabList = () => {
  return (
    <Tabs colorScheme="orange" pt="64px" w="full" h="full" defaultIndex={1}>
      <TabList px={"18px"}>
        <Tab flexGrow="1" color="orange.100">
          팔로잉
        </Tab>
        <Tab flexGrow="1" color="orange.100">
          전체보기
        </Tab>
      </TabList>
      <Divider />

      <TabPanels bg="yellow.100" h="full">
        <TabPanel h="full">
          <UpcomingFeed />
          {/* TODO: V2 팔로잉 추가 시  */}
          {/* <FollowingTabPanelList /> */}
        </TabPanel>
        <TabPanel>
          <AllTabPanelList />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default FeedTabList;
