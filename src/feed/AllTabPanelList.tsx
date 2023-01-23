import {Flex, HStack, Icon, StackProps, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";

import {RightChevron} from "../../common/custom-icons/customIcons";
import FilterTag from "../../common/Filters/FilterTag";
import {ALL_FEED_MOCK, MOCK_FEED_FILTER_LIST} from "../../interface/static";
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

  return (
    <Flex flexDirection="column" gap={"10px"}>
      <FeedFilter selectedTag={selectedTag} onClickTag={handleSelectTag} />
      {/* ALL_FEED_MOCK을 prop으로 받아서 AllTabPanelList랑 공유하기 */}
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

interface FeedFilterProps extends StackProps {
  selectedTag: string;
  onClickTag: (tag: string) => void;
}

export const FeedFilter: React.FC<FeedFilterProps> = ({
  selectedTag,
  onClickTag,
  ...props
}) => {
  return (
    <>
      {MOCK_FEED_FILTER_LIST.map((filterObj) => {
        const {title, tags} = filterObj;
        return (
          <HStack w="full" key={title} py="5px" {...props}>
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
                    textColor={isSelectedTag ? "black.100" : "gray.300"}
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
