import { Button, Center, Link, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { LeftBackRandom } from "../../shared/Headers/LeftBackRandom";
import { BEERLOT_EMAIL } from "../../../../interface/static";

export const InquiryTemplate = () => {
  const router = useRouter();

  const handleClickBack = () => {
    router.back();
  };
  return (
    <>
      <LeftBackRandom onClick={handleClickBack} title="문의하기" />
      <Center flexDir={"column"} w="full" h="full">
        <Text textColor="black.100">사용하시면서 문의사항이 생겼나요?🧐</Text>
        <Text textColor="gray.300" textAlign={"center"} mt="24px">
          아래 버튼을 눌러 문의해주세요! <br />
          문의사항은 자세히 적어주실수록 좋아요 :)
        </Text>
        <Button
          _hover={{ textDecoration: "none" }}
          mt="24px"
          as={Link}
          href={`mailto:?subject=${BEERLOT_EMAIL}`}
          py={"10px"}
          px={"73px"}
          h="fit-content"
          bg="gray.100"
        >
          <Text textColor={"black.100"} textStyle="h3_bold">
            이메일로 문의하기
          </Text>
        </Button>
      </Center>
    </>
  );
};
