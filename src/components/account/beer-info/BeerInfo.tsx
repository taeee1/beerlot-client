import { BeerlotLoading } from '@/components/shared/Loading'
import {
  Center,
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import BeerReviews from './BeerReviews'
import { LikedBeers } from './LikedBeers'

const BeerInfo = () => {
  // if (userReviewQuery.isLoading) {
  //   return (
  //     <Center h={'full'} bg={'yellow.100'} minH={'66vh'}>
  //       <BeerlotLoading />
  //     </Center>
  //   )
  // }

  return (
    <Tabs colorScheme='orange' h='fit-content' w='full' isFitted>
      <TabList px={'18px'} bg={'white'}>
        <Tab>평가한 맥주</Tab>
        <Tab>좋아요한 맥주</Tab>
      </TabList>
      <Divider />
      <TabPanels bg={'yellow.100'} minH={'54vh'}>
        <TabPanel>
          <BeerReviews />
        </TabPanel>
        <TabPanel>
          <LikedBeers />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default BeerInfo
