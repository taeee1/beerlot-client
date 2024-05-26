import { Box, Container, useDisclosure } from "@chakra-ui/react";
import { CenteredTitle } from "../shared/Headers/CenteredTitle";
import { ReviewModal } from "../shared/ReviewModal/ReviewModal";
import { FeedTabList } from "./FeedTabList";

export const FeedTemplate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box w="full" h="100vh" bg="gray.100" overflowY={"auto"}>
      <Container p={0} bg="white" maxW="450px" h={"full"}>
        <CenteredTitle />
        {/* v2에서 알람 추가 */}
        {/* <TitleRightBellHeader /> */}
        <FeedTabList />
        <ReviewModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      </Container>
    </Box>
  );
};
