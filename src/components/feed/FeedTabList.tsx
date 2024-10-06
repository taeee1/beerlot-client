import {
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import { AllTabPanelList } from './AllTabPanelList'
import { UpcomingFeed } from './UpcomingFeed'

export const FeedTabList = () => (
  <Tabs
    colorScheme='orange'
    pt='44px'
    w='full'
    defaultIndex={1}
    h='full'
    overflowY={'scroll'}
    isFitted
    bg='yellow.100'
  >
    <TabList px={'18px'} bg={'white'}>
      <Tab>팔로잉</Tab>
      <Tab>전체보기</Tab>
    </TabList>
    <Divider />

    <TabPanels bg='yellow.100' h={'full'}>
      <TabPanel>
        <UpcomingFeed />
      </TabPanel>
      <TabPanel>
        <AllTabPanelList />
      </TabPanel>
    </TabPanels>
  </Tabs>
)
