import {Box, Container, Flex} from "@chakra-ui/react";
import {useRecoilState} from "recoil";
import {LeftBackCompleteCircles} from "../../shared/Headers/LeftBackCompleteCircles";
import {userInfoState} from "../../store/atom";
import BeerCards from "./BeerCards";

const BeersTemplate = () => {
  const [userInfo] = useRecoilState(userInfoState);
  return (
    <Box w="full" h="full" bg="gray.100">
      <Container h="full" w="full" bg="white" position="relative" maxW="450px">
        <Flex h="100vh" px="21px" pt="34px" flexDirection="column">
          <LeftBackCompleteCircles
            isFirstCircleDone={true}
            isSecondCircleDone={true}
          />
          {userInfo?.username && <BeerCards nickName={userInfo?.username} />}
        </Flex>
      </Container>
    </Box>
  );
};

export default BeersTemplate;
