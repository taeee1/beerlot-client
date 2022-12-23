import { Flex } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import BackButton from "../../../common/BackButton";
import CompleteCircles from "../../../common/CompleteCircles";
import { userInfoState } from "../../store/atom";
import BeerCards from "./BeerCards";

const BeersTemplate = () => {
  const [userInfo] = useRecoilState(userInfoState);
  return (
    <>
      <Flex h="100vh" px="21px" pt="34px" flexDirection="column">
        <BackButton />
        <CompleteCircles isNicknameDone={true} isBeersDone={true} />
        {userInfo?.username && <BeerCards nickName={userInfo?.username} />}
      </Flex>
    </>
  );
};

export default BeersTemplate;
