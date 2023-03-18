import {Flex, HStack, Icon, StackProps, Text} from "@chakra-ui/react";
import {useCallback, useEffect, useState} from "react";
import {ReviewResponseType} from "../../../interface/server/types/Review";
import {MOCK_FEED_FILTER_LIST} from "../../../interface/static";
import {ReviewFilterSort, ReviewSortEnum} from "../../../interface/types";
import {getAllReviewApi} from "../../api/review/api";

import {RightChevron} from "../shared/CustomIcons/customIcons";
import FilterTag from "../shared/Filters/FilterTag";

import FollowingTabPanelItem from "./TabPanelItem";

// interface AllTabPanelListProps {
//   allReviews: ReviewResponseType[];
// }

export const AllTabPanelList = () => {
  const [selectedTag, setSelectedTag] = useState<ReviewSortEnum>(
    MOCK_FEED_FILTER_LIST[0].tags[0]
  );
  const [selectedReviews, setSelectedReviews] = useState<ReviewResponseType[]>(
    []
  );

  const allReviewsAsync = useCallback(async () => {
    const res = await getAllReviewApi({sort: selectedTag});
    return res;
  }, [selectedTag]);

  const handleSetSelectedReviews = useCallback(
    (reviews: ReviewResponseType[]) => {
      setSelectedReviews(reviews);
    },
    []
  );

  const setNewReviews = useCallback(async () => {
    const res = await allReviewsAsync();
    // if (res !== undefined) handleSetSelectedReviews(res);
  }, [allReviewsAsync]);

  const handleSelectTag = async (tag: ReviewSortEnum) => {
    setSelectedTag(tag);
    setNewReviews();
  };

  useEffect(() => {
    allReviewsAsync();
    setNewReviews();
  }, [allReviewsAsync, setNewReviews]);

  return (
    <Flex flexDirection="column" gap={"10px"}>
      <FeedFilter selectedTag={selectedTag} onClickTag={handleSelectTag} />
      {/* ALL_FEED_MOCK을 prop으로 받아서 AllTabPanelList랑 공유하기 */}
      {selectedReviews.map((feed) => {
        return (
          <FollowingTabPanelItem
            key={feed.id}
            isRow
            nickname={feed.member.username}
            postingTime={feed.updated_at}
            beerName={"MOCK_BEER_NAME"}
            ratingNumber={feed.rate}
            imageSrc={feed.image_url}
            postText={feed.content}
            thumbsUpNumber={feed.like_count}
            isEditable={false}
          />
        );
      })}
    </Flex>
  );
};

interface FeedFilterProps extends StackProps {
  selectedTag: ReviewSortEnum;
  onClickTag: (tag: ReviewSortEnum) => void;
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
              {tags.map((tag: ReviewSortEnum) => {
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
                    {ReviewFilterSort[tag]}
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
