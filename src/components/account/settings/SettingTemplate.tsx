import { Box, Flex, useDisclosure, VStack } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import BottomDrawer from "../../shared/BottomDrawer";
import { LeftBackRandom } from "../../shared/Headers/LeftBackRandom";
import { SectionButton } from "./SectionButton";

export const SettingsTemplate = () => {
  const router = useRouter();
  const handleClickBack = () => {
    router.back();
  };
  const LogoutDrawer = useDisclosure();
  const SignOut = useDisclosure();

  const usersSetting = [
    {
      title: "로그아웃",
      onClick: () => {
        LogoutDrawer.onOpen();
      },
    },
    {
      title: "회원탈퇴",
      onClick: () => {
        SignOut.onOpen();
      },
    },
  ];

  return (
    <Box h="full">
      <VStack bg="gray.100" h="full">
        {/* title */}
        <LeftBackRandom onClick={handleClickBack} title="설정" />
        {/* LOGOUT drawer */}
        <BottomDrawer
          headerText={"로그아웃 하시겠어요?"}
          onClose={LogoutDrawer.onClose}
          isOpen={LogoutDrawer.isOpen}
          boxStyle={{
            justifyContent: "center",
            gap: "50px",
            w: "full",
            bg: "white",
            p: "38px 20px 34px 21px",
            borderRadius: "10px 10px 0px 0px",
          }}
          leftButtonText={"취소"}
          leftButtonStyle={{
            w: "full",
            py: "10px",
            px: "39px",
            onClick: () => {
              LogoutDrawer.onClose();
            },
          }}
          rightButtonText={"로그아웃"}
          rightButtonStyle={{
            w: "full",
            py: "10px",
            px: "22px",
            onClick: () => {
              console.log("logout clicked");
              router.push("/");
              Cookies.remove("beerlot-oauth-auth-request");
            },
          }}
        />
        {/* SIGNOUT drawer */}
        <BottomDrawer
          headerText={"정말 비어랏을 떠나시는 건가요?"}
          onClose={SignOut.onClose}
          isOpen={SignOut.isOpen}
          boxStyle={{
            justifyContent: "center",
            gap: "15px",
            w: "full",
            bg: "white",
            p: "30px 20px 37px 21px",
            borderRadius: "10px 10px 0px 0px",
          }}
          bodyText={
            "그동안 비어랏에 기록하신 내용이 전부 사라질 거에요. 좋아요한 맥주들, 하나하나 남겼던 리뷰들 전부요! 그래도 떠나셔야 한다면, 사용하시는 동안 즐거우셨길 바라요. \n\n p.s. 맥주 마시다가 생각나면 언제든 다시 돌아와요 :)"
          }
          bodyTextStyle={{
            textColor: "gray.300",
            textAlign: "center",
          }}
          leftButtonText={"네, 떠날래요"}
          leftButtonStyle={{
            w: "full",
            py: "10px",
            px: "39px",
            onClick: () => {
              console.log("네 떠날래요 클릭됨");
              // signout logic
            },
          }}
          rightButtonText={"아뇨, 더 있을래요"}
          rightButtonStyle={{
            w: "full",
            py: "10px",
            px: "22px",
            onClick: () => {
              SignOut.onClose();
            },
          }}
        />
        <VStack
          bg="gray.100"
          pt="70px"
          w="full"
          h="full"
          gap="10px"
          borderRight={"1px solid"}
          borderRightColor={"gray.200"}
          borderLeft={"1px solid"}
          borderLeftColor={"gray.200"}
        >
          {/* <Flex w="full" flexDir={"column"}>
            {BeerSettingSection.map(({title, href}) => (
              <SectionButton key={title} title={title} href={href} />
            ))}
          </Flex> */}
          <Flex w="full" flexDir={"column"}>
            {NoticeSettingSection.map(({ title, href }) => (
              <SectionButton key={title} title={title} href={href} />
            ))}
          </Flex>
          <Flex w="full" h="full" flexDir={"column"}>
            {usersSetting.map((item) => (
              <SectionButton
                title={item.title}
                key={item.title}
                onClick={item.onClick}
                _hover={{}}
              />
            ))}
            <Box
              h="full"
              bg={"white"}
              w="full"
              style={{
                marginTop: 0,
              }}
            />
          </Flex>
        </VStack>
      </VStack>
    </Box>
  );
};

export const BeerSettingSection = [
  { title: "최애맥주 변경", href: "/account/settings/favoritebeer" },
];

export const NoticeSettingSection = [
  {
    title: "공지사항",
    href: "/account/settings/notice",
  },
  {
    title: "문의하기",
    href: "/account/settings/inquiry",
  },
  { title: "비어랏 정보", href: "/account/settings/info" },
];
