import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const ContinueButton = () => {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };
  return (
    <Text as="u" onClick={handleClick} color="gray.300" textStyle="h3">
      로그인 없이 계속하기
    </Text>
  );
};

export default ContinueButton;
