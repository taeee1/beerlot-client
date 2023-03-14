import {Box, Container, Flex} from "@chakra-ui/react";
import {LeftBackCompleteCircles} from "../../shared/Headers/LeftBackCompleteCircles";
import Nickname from "./Nickname";

const SignUpTemplate = () => {
  return (
    <Box w="full" h="full" bg="gray.100">
      <Container h="full" w="full" bg="white" maxW="450px" pos="relative">
        <Flex px="27.5px" pb="73px" pt="34px" flexDirection="column">
          <LeftBackCompleteCircles
            isFirstCircleDone={true}
            isSecondCircleDone={false}
          />
          <Nickname />
        </Flex>
      </Container>
    </Box>
  );
};

export default SignUpTemplate;
