import {
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import {AllTabPanelList} from "./AllTabPanelList";
import {UpcomingFeed} from "./UpcomingFeed";

export const FeedTabList = () => (
  <Tabs
    colorScheme="orange"
    pt="64px"
    w="full"
    h="full"
    defaultIndex={1}
    isFitted
  >
    <TabList px={"18px"}>
      <Tab>팔로잉</Tab>
      <Tab>전체보기</Tab>
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
