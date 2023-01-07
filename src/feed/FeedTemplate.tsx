import {Box, Container} from "@chakra-ui/react";
import React from "react";
import {CenteredTitle} from "../../common/headers/CenteredTitle";
import {TitleRightBellHeader} from "../../common/headers/TitleRightBell";
import {ReviewModal} from "../../common/ReviewModal";
import FeedTabList from "./FeedTabList";

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
