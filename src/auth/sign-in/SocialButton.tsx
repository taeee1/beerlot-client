import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Facebook, Google, Kakao, Naver, None } from "../../../public/svg";
import { userInfoState } from "../../store/atom";

const SocialButton = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const router = useRouter();
  // mock 함수
  const handleClick = () => {
    setUserInfo({
      email: "beer.lover@email.com",
      username: "비어러버",
    });
    router.push("/accounts");
  };

  return (
    <>
      <Button
        width="100%"
        borderRadius={30}
        justifyContent="space-around"
        leftIcon={<Facebook />}
        rightIcon={<None />}
        colorScheme="facebook"
        variant="solid"
        onClick={handleClick}
      >
        페이스북으로 계속하기
      </Button>
      <Button
        width="100%"
        borderRadius={30}
        justifyContent="space-around"
        leftIcon={<Google />}
        rightIcon={<None />}
        colorScheme="facebook"
        variant="solid"
      >
        Google로 계속하기
      </Button>
      <Button
        width="100%"
        borderRadius={30}
        justifyContent="space-around"
        leftIcon={<Kakao />}
        rightIcon={<None />}
        colorScheme="facebook"
        variant="solid"
        textStyle="h2"
      >
        카카오로 계속하기
      </Button>
      <Button
        width="100%"
        borderRadius={30}
        justifyContent="space-around"
        leftIcon={<Naver />}
        rightIcon={<None />}
        colorScheme="facebook"
        variant="solid"
      >
        네이버로 계속하기
      </Button>
    </>
  );
};

export default SocialButton;
