import {HStack, Text, VStack} from "@chakra-ui/react";
import {useRouter} from "next/router";
import React from "react";
import {useRecoilState} from "recoil";
import {userInfoState} from "../../store/atom";
import {
  NavAccountsPath,
  NavFeedPath,
  NavHomePath,
  NavSearchPath,
} from "./CustomIcons/customPath";

export const BottomNav = () => {
  const router = useRouter();
  const [userInfo] = useRecoilState(userInfoState);

  const navMenu = [
    {title: "home", displayName: "홈", icon: NavHomePath, url: "/"},
    {
      title: "search",
      displayName: "검색",
      icon: NavSearchPath,
      url: "/search",
    },
    {title: "feed", displayName: "피드", icon: NavFeedPath, url: "/feed"},
    {
      title: "account",
      displayName: "마이",
      icon: NavAccountsPath,
      url: userInfo ? "/account" : "/login",
    },
  ];

  const handleClick = (url: string) => {
    router.push(url);
  };

  return (
    <HStack
      w="full"
      py="10px"
      px="42px"
      pos="fixed"
      bg="white.100"
      borderTop="0.3px solid"
      borderTopColor="gray.300"
      bottom="0px"
    >
      {navMenu.map((item) => {
        const {title, displayName, icon, url} = item;
        const curColor = router.pathname === url ? "orange.300" : "gray.300";
        return (
          <VStack
            cursor={"pointer"}
            key={title}
            flexGrow={1}
            gap="1px"
            onClick={() => handleClick(url)}
          >
            {icon(curColor)}
            <Text textStyle="h4" color={curColor}>
              {displayName}
            </Text>
          </VStack>
        );
      })}
    </HStack>
  );
};
