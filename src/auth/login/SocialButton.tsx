import {Box, Button, Icon, Text, VStack} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useRecoilState} from "recoil";
import {OAUTH_PROVIDER} from "../../../interface/types";
import {GoogleLogo, KakaoLogo, NaverLogo} from "../../../public/svg";
import {loginWithSocialLoginApi} from "../../api/auth/api";
import {userInfoState} from "../../store/atom";

const SocialButton = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const router = useRouter();
  // mock 함수
  const handleClick = (provider: OAUTH_PROVIDER) => {
    loginWithSocialLoginApi(provider);
    setUserInfo({
      email: "beer.lover@email.com",
      username: "비어러버",
      statusMessage: "난 물러서는 건 질색이야",
    });
    router.push(`/account`);
  };

  return (
    <VStack w={"100%"} gap="10px">
      {socialButton.map((button) => (
        <Button
          _hover={{}}
          _active={{}}
          key={button.ariaLabel}
          aria-label={button.ariaLabel}
          border={button.border} // TODO: use them as styleProps
          width="100%"
          bg={button.buttonColor}
          borderRadius={30}
          onClick={() => handleClick(button.provider)}
          justifyContent="space-between"
          p={"5px"}
          alignItems={"center"}
          cursor="pointer"
        >
          <Icon as={button.icon} w={"36px"} h={"36px"} />
          <Text textStyle={"h2"} textColor={button.textColor}>
            {button.label}
          </Text>
          <Box w={"36px"} h={"36px"} />
        </Button>
      ))}
    </VStack>
  );
};

export const socialButton = [
  {
    provider: OAUTH_PROVIDER.KAKAO,
    ariaLabel: "kakao login",
    icon: KakaoLogo,
    onClick: () => {},
    label: "카카오로 계속하기",
    buttonColor: "yellow.400",
    textColor: "black",
    border: "none",
  },
  {
    provider: OAUTH_PROVIDER.NAVER,
    ariaLabel: "naver login",
    icon: NaverLogo,
    onClick: () => {},
    label: "네이버로 계속하기",
    buttonColor: "green.100",
    textColor: "white.100",
    border: "none",
  },
  // {
  //   ariaLabel: "facebook login",
  //   icon: FacebookLogo,
  //   onClick: () => {},
  //   label: "페이스북으로 계속하기",
  //   buttonColor: "blue.300",
  //   textColor: "white.100",
  //   border: "none",
  // },
  {
    provider: OAUTH_PROVIDER.GOOGLE,
    ariaLabel: "google login",
    icon: GoogleLogo,
    onClick: () => {},
    label: "Google로 계속하기",
    buttonColor: "white.100",
    textColor: "black",
    border: "#dddddd 1px solid", // TODO: use Chakra theme
  },
];

export default SocialButton;
