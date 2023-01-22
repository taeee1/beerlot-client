import {Flex, HStack, Icon, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {RightChevron} from "../../common/custom-icons/customIcons";
import FilterTag from "../../common/Filters/FilterTag";
import {MOCK_FEED_FILTER_LIST} from "../../interface/static";
import {getAllReviewApi} from "../../server/api";
import FollowingTabPanelItem from "./TabPanelItem";

export const AllTabPanelList = () => {
  const [selectedTag, setSelectedTag] = useState(
    MOCK_FEED_FILTER_LIST[0].tags[0]
  );
  useEffect(() => {
    allReviewsAsync();
  });

  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag);
  };

  const allReviewsAsync = async () => {
    const res = await getAllReviewApi();
    console.log("res", res);
  };

  const ALL_FEED_MOCK = [
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
    <Flex flexDirection="column" gap={"10px"} border="1px solid green">
      <FeedFilter selectedTag={selectedTag} onClickTag={handleSelectTag} />
      {ALL_FEED_MOCK.map((feed) => {
        return (
          <FollowingTabPanelItem
            key={feed.id}
            isRow
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

interface FeedFilterProps {
  selectedTag: string;
  onClickTag: (tag: string) => void;
}

const FeedFilter: React.FC<FeedFilterProps> = ({selectedTag, onClickTag}) => {
  return (
    <>
      {MOCK_FEED_FILTER_LIST.map((filterObj) => {
        const {title, tags} = filterObj;
        return (
          <HStack
            w="full"
            key={title}
            py="5px"
            borderBottom={"1px solid"}
            borderBottomColor="gray.200"
          >
            <FilterTag
              tagText={title}
              borderRadius="15px"
              pl="5px"
              px={"0px"}
              py="1.5px"
              h="full"
              alignItems={"center"}
              justifyContent={"center"}
              bg={"yellow.300"}
            >
              <Icon as={RightChevron} w="19px" h="19px" color="black.100" />
            </FilterTag>
            <HStack
              gap={"15px"}
              overflowX={"scroll"}
              sx={{
                "::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {tags.map((tag: string) => {
                const isSelectedTag = selectedTag === tag;
                return (
                  <Text
                    flexShrink={0}
                    key={tag}
                    cursor="pointer"
                    textColor={isSelectedTag ? "black.100" : "gray.200"}
                    textStyle={isSelectedTag ? "h4_bold" : "h4"}
                    onClick={() => onClickTag(tag)}
                  >
                    {tag}
                  </Text>
                );
              })}
            </HStack>
          </HStack>
        );
      })}
    </>
  );
};
