import { Flex } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import FollowingTabPanelItem from "./TabPanelItem";

const FollowingTabPanelList = () => {
  const FOLLOWING_FEED_MOCK = [
    {
      id: uuidv4(),
      nickname: "김누누",
      postingTime: "2시간 전",
      beerName: "버드와이저",
      ratingNumber: 4,
      imageSrc: "goat.png",
      postText:
        " 여윽시 내 최애 맥주.. 다시 미국 가고싶다ㅠㅠ 미국에서 먹었던 그 느낌을 다시 느끼고 싶을 때면 꼭 버드와이저를 찾게 되더라구요. 그리고 뭐니뭐니해도 버드와이저에는 감자칩이죠! 레이스랑 한 잔 하고 잡니다 :) 모두들 굿나잇!",
      thumbsUpNumber: 22,
    },
    {
      id: uuidv4(),
      nickname: "김태희",
      postingTime: "어제",
      beerName: "호가든",
      ratingNumber: 4,
      imageSrc: "goat.png",
      postText: "",
      thumbsUpNumber: 24,
    },
    {
      id: uuidv4(),
      nickname: "김누누",
      postingTime: "2시간 전",
      beerName: "버드와이저",
      ratingNumber: 4,
      imageSrc: "goat.png",
      postText:
        " 여윽시 내 최애 맥주.. 다시 미국 가고싶다ㅠㅠ 미국에서 먹었던 그 느낌을 다시 느끼고 싶을 때면 꼭 버드와이저를 찾게 되더라구요. 그리고 뭐니뭐니해도 버드와이저에는 감자칩이죠! 레이스랑 한 잔 하고 잡니다 :) 모두들 굿나잇!",
      thumbsUpNumber: 22,
    },
    {
      id: uuidv4(),
      nickname: "김태희",
      postingTime: "어제",
      beerName: "호가든",
      ratingNumber: 4,
      imageSrc: "goat.png",
      postText: " 여윽시 내 최애 맥주..",
      thumbsUpNumber: 24,
    },
  ];

  return (
    <Flex flexDirection="column" gap={"10px"}>
      {FOLLOWING_FEED_MOCK.map((feed) => {
        return (
          <FollowingTabPanelItem
            key={feed.id}
            isRow={false}
            nickname={feed.nickname}
            postingTime={feed.postingTime}
            beerName={feed.beerName}
            ratingNumber={feed.ratingNumber}
            imageSrc={feed.imageSrc}
            postText={feed.postText}
            thumbsUpNumber={feed.thumbsUpNumber}
            isEditable={false}
          />
        );
      })}
    </Flex>
  );
};

export default FollowingTabPanelList;
