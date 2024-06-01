import { useUserReviewsQuery } from "@/../hooks/query/useUserQuery";
import { BeerlotLoading } from "@/components/shared/Loading";
import {
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import BeerReviews from "./BeerReviews";
import { LikedBeers } from "./LikedBeers";
import { MemberReviewResponse } from "../../../../types/member/response";

const BeerInfo = () => {
  const accessToken = Cookies.get("beerlot-oauth-auth-request") ?? "";
  const userReviewQuery = useUserReviewsQuery(accessToken);
  const userReviews: MemberReviewResponse[] = userReviewQuery.data?.contents;

  return (
    <Tabs colorScheme="orange" h="full" w="full" isFitted>
      <TabList px={"18px"}>
        <Tab>평가한 맥주</Tab>
        <Tab>좋아요한 맥주</Tab>
      </TabList>
      <Divider />

      <TabPanels bg="yellow.100" h="full">
        <TabPanel h="full">
          {userReviews ? (
            <BeerReviews
              userReviews={userReviews}
              onResetReviews={userReviewQuery.refetch}
            />
          ) : (
            <BeerlotLoading />
          )}
        </TabPanel>
        <TabPanel>
          <LikedBeers />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default BeerInfo;
