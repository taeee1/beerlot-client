import {Box, Container} from "@chakra-ui/react";
import React from "react";
import {CenteredTitle} from "../shared/Headers/CenteredTitle";
import {TitleRightBellHeader} from "../shared/Headers/TitleRightBell";
import {ReviewModal} from "../shared/ReviewModal/ReviewModal";
import {ReviewResponseType} from "../../interface/server/types/Review";
import {FeedTabList} from "./FeedTabList";

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
