import {Box, Container, Flex} from "@chakra-ui/react";
import {useRecoilState} from "recoil";
import {userInfoState} from "../../../store/atom";
import {LeftBackCompleteCircles} from "../../shared/Headers/LeftBackCompleteCircles";
import BeerCards from "./BeerCards";

const BeersTemplate = () => {
  const [userInfo] = useRecoilState(userInfoState);
  return (
    <Box w="full" h="full" bg="gray.100" overflowY={"scroll"}>
      <Container bg="white" maxW="450px" pos="relative">
        <Flex px="21px" pt="34px" flexDirection="column" w="full" h="full">
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
