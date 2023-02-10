import {Box, useDisclosure, VStack} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useRecoilState} from "recoil";
import BottomDrawer from "../../../common/BottomDrawer";
import {LeftBackRandom} from "../../../common/headers/LeftBackRandom";
import {userInfoState} from "../../store/atom";
import {SectionButton} from "./SectionButton";

export const SettingsTemplate = () => {
  const [_, setUserInfo] = useRecoilState(userInfoState);

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
        console.log("로그아웃");
      },
    },
    {
      title: "회원탈퇴",
      onClick: () => {
        console.log("회원탈퇴");
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
              setUserInfo(null);
              router.push("/");
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
        <VStack bg="gray.100" pt="70px" w="full" gap="10px">
          <VStack w="full">
            {BeerSettingSection.map(({title, href}) => (
              <SectionButton key={title} title={title} href={href} />
            ))}
          </VStack>
          <VStack w="full">
            {NoticeSettingSection.map((content) => (
              <SectionButton
                key={content.title}
                title={content.title}
                href={content.href}
              />
            ))}
          </VStack>
          <VStack w="full">
            {usersSetting.map((item) => (
              <Box
                onClick={item.onClick}
                key={item.title}
                w="full"
                _hover={{cursor: "pointer"}}
              >
                <SectionButton title={item.title} />
              </Box>
            ))}
          </VStack>
        </VStack>
      </VStack>
    </Box>
  );
};

// put it into environment variable
const beerlotEmail = process.env.INQUIRY_EMAIL;

export const BeerSettingSection = [
  {title: "최애맥주 변경", href: "/account/settings/favoritebeer"},
];
export const NoticeSettingSection = [
  {
    title: "공지사항",
    href: "/account/settings/notice",
  },
  {
    title: "문의하기",
    href: `mailto:?subject=${beerlotEmail}`,
    isEmail: true,
  },
  {title: "비어랏 정보", href: "/account/settings/info"},
];
