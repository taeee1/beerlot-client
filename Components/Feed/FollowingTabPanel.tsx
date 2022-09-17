import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { GoatImage } from "../../public/image";
import StarRating from "../Utils/StarRating";
import ThumbsUpButton from "../Utils/ThumbsUpButton";

const FollowingTabPanel = () => {
  const thumbsUpNumber = 22;

  return (
    <Box p={"12px"} bg="white">
      <Box
        gap={"4px"}
        display={"flex"}
        flexDirection="row"
        alignItems="end"
        my={"2px"}
      >
        <Avatar w={"26px"} h={"26px"} />
        <Text textStyle="h2_bold">김누누</Text>
        <Text textStyle="h3" color="Gray.200">
          |
        </Text>
        <Text textStyle="h3" color="Gray.200">
          2시간 전
        </Text>
      </Box>
      <Box my={"2px"}>
        <Text textStyle="h3_bold">버드와이저</Text>
      </Box>
      <Box my={"2px"}>
        <StarRating />
        <Text>5점</Text>
      </Box>
      <Image width={330} height={330} alt="beer photo" src={GoatImage} />
      <Box display="flex" alignItems="baseline" my={"2px"}>
        <Text textStyle="h3">
          여윽시 내 최애 맥주.. 다시 미국 가고싶다ㅠㅠ 미국에서 먹었던 그 느낌을
          다시 느끼고 싶을 때면 꼭 버드와이저를 찾게 되더라구요. 그리고
          뭐니뭐니해도 버드와이저에는 감자칩이죠! 레이스랑 한 잔 하고 잡니다 :)
          모두들 굿나잇!
        </Text>
      </Box>
      <Flex justifyContent="end">
        <ThumbsUpButton thumbsUpNumber={thumbsUpNumber} />
      </Flex>
    </Box>
  );
};

export default FollowingTabPanel;
