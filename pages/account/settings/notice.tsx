import {Box, Container} from "@chakra-ui/react";

const Notice = () => {
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
        Notice
      </Container>
    </Box>
  );
};

export default Notice;
