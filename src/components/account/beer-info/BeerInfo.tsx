import { useUserReviewsQuery } from '@/../hooks/query/useUserQuery'
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
import Cookies from 'js-cookie'
import BeerReviews from './BeerReviews'
import { LikedBeers } from './LikedBeers'
import { MemberReviewResponse } from '../../../../types/member/response'

const BeerInfo = () => {
  const accessToken = Cookies.get('beerlot-oauth-auth-request') ?? ''
  const userReviewQuery = useUserReviewsQuery(accessToken)
  const userReviews: MemberReviewResponse[] = userReviewQuery.data?.contents

  if (userReviewQuery.isLoading) {
    return (
      <Center h={'full'} bg={'yellow.100'} minH={'66vh'}>
        <BeerlotLoading />
      </Center>
    )
  }

  return (
    <Tabs colorScheme='orange' h='fit-content' w='full' isFitted>
      <TabList px={'18px'} bg={'white'}>
        <Tab>평가한 맥주</Tab>
        <Tab>좋아요한 맥주</Tab>
      </TabList>
      <Divider />

      <TabPanels bg={'yellow.100'} minH={'54vh'}>
        <TabPanel>
          <BeerReviews
            userReviews={userReviews}
            onResetReviews={userReviewQuery.refetch}
          />
        </TabPanel>
        <TabPanel>
          <LikedBeers />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default BeerInfo
