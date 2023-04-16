import {Box, Container, Flex, Center, Icon, Text} from "@chakra-ui/react";
import {LeftBackCompleteCircles} from "../../shared/Headers/LeftBackCompleteCircles";
import {useRecoilState} from "recoil";
import {userInfoState} from "../../../store/atom";
import FloatingButton from "../../shared/FloatingButton";
import {useRouter} from "next/router";
import {OrangeCircleCheck} from "../../shared/CustomIcons/customIcons";
import {OrangeCheckCircle} from "../../../../public/svg";

const CompleteTemplate = () => {
  const [userInfo] = useRecoilState(userInfoState);
  const router = useRouter();
  const handleClickComplete = () => {
    router.push(`/`);
  };
  return (
    <Box w="full" h="full" bg="gray.100" overflowY={"scroll"}>
      <Container bg="white" maxW="450px" pos="relative" h="full">
        <Flex px="21px" pt="34px" flexDirection="column" w="full" h="full">
          <LeftBackCompleteCircles
            isFirstCircleDone={true}
            isSecondCircleDone={true}
          />

          <Center h={"full"} flexDir="column">
            <Icon as={OrangeCheckCircle} w={"80px"} h={"80px"} />
            <Text mt={"24px"} textStyle={"h1"} textColor="black">
              회원가입 완료!
            </Text>
            <Box mt={"24px"}>
              <Text
                display="inline"
                textStyle={"h2_bold"}
                textColor="orange.200"
              >
                {userInfo?.username}
              </Text>
              <Text
                display="inline"
                mt={"24px"}
                textStyle={"h2_bold"}
                textColor="black"
              >
                님,
              </Text>
            </Box>
            <Text mt={"8px"} textStyle={"h2_bold"} textColor="black">
              비어랏의 회원이 되어주셔서 감사해요🙇‍♀️
            </Text>
            <Text
              display="inline"
              mt={"24px"}
              textStyle={"h4"}
              textColor="gray.300"
            >
              맥주 리뷰 작성, 마이페이지 등 다양한 기능을 만나보세요 :)
            </Text>
          </Center>
          <FloatingButton
            pos="sticky"
            w="full"
            text="비어랏 시작하기!"
            onClick={handleClickComplete}
            bgColor={"orange.200"}
            textColor={"white.100"}
            _hover={{}}
            boxShadow={"0px 8px 16px rgba(0, 0, 0, 0.3)"}
          />
        </Flex>
      </Container>
    </Box>
  );
};

export default CompleteTemplate;
