import {Box, Container} from "@chakra-ui/react";
import {LoginTemplate} from "../../src/auth/login/LoginTemplate";

const index = () => {
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
        <LoginTemplate />
      </Container>
    </Box>
  );
};

export default index;
