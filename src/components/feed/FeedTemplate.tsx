import {Box, Container} from "@chakra-ui/react";
import {CenteredTitle} from "../shared/Headers/CenteredTitle";
import {ReviewModal} from "../shared/ReviewModal/ReviewModal";
import {FeedTabList} from "./FeedTabList";
import {useAllReviewsQuery} from "@/../hooks/useReviewQuery";
import {useEffect} from "react";

// interface FeedTemplatetProps {
//   allReviews: ReviewResponseType[];
// }

export const FeedTemplate = () => {
  return (
    <Box w="full" h="full" bg="gray.100">
      <Container
        p={"0px"}
        h="full"
        w="full"
        bg="white"
        position="relative"
        maxW="450px"
      >
        <CenteredTitle />
        {/* v2에서 알람 추가 */}
        {/* <TitleRightBellHeader /> */}
        <FeedTabList />
        <ReviewModal />
      </Container>
    </Box>
  );
};
