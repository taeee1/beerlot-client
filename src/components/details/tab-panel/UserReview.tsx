import { ReviewModalWrapper } from "@/components/shared/ReviewModal/ReviewModalWrapper/ReviewModalWrapper";
import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export const UserReview = () => {
  const accessToken = Cookies.get("beerlot-oauth-auth-request");
  const router = useRouter();
  const userReview = null; // TODO: This should be replaced into real data from API
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleButtonClick = () => {
    if (!accessToken) {
      router.push("/login");
    } else {
      onOpen();
    }
  };

  if (!accessToken || !userReview) {
    return (
      <>
        <Text textStyle={"h2_bold"}>내가 쓴 리뷰</Text>
        <Flex
          w="full"
          p={5}
          bgColor="white"
          borderRadius="lg"
          justifyContent="center"
          alignItems="center"
          gap={4}
          flexDir={"column"}
          boxShadow="md"
        >
          <Text
            textAlign="center"
            textStyle={"h3"}
            color="#333333"
            whiteSpace="pre-wrap"
          >
            이 맥주 드셔보셨다면, 어땠는지 기록해볼까요?{"\n"}짧게라도 좋아요 😆
          </Text>
          <Button
            px={8}
            py={2}
            textStyle={"h3_bold"}
            h={"fit-content"}
            bgColor="#FF6B00"
            borderRadius="full"
            color="white"
            onClick={handleButtonClick}
            _hover={{}}
          >
            리뷰 작성하기
          </Button>
        </Flex>
        <ReviewModalWrapper isModalOpen={isOpen} onCloseModal={onClose} />
      </>
    );
  }

  return <div>UserReview: {userReview}</div>;
};
