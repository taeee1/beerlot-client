import {Box, Container, Flex, HStack, Text, VStack} from "@chakra-ui/react";
import {useState} from "react";
import {Rating} from "../../../common/Rating";
import {ReviewModal} from "../../../common/ReviewModal/ReviewModal";
import {ALL_FEED_MOCK, MOCK_FEED_FILTER_LIST} from "../../../interface/static";
import {ReviewSortEnum} from "../../../interface/types";
import {FeedFilter} from "../../feed/AllTabPanelList";
import FollowingTabPanelItem from "../../feed/TabPanelItem";
import {BeerInfoHStack} from "./BasicPanelList";

interface ReviewPanelListProps {
  rate: number;
}

export const ReviewPanelList: React.FC<ReviewPanelListProps> = ({rate}) => {
  const reviewData = [];
  const buyFrom = "buyFrom";
  const [selectedTag, setSelectedTag] = useState<ReviewSortEnum>(
    MOCK_FEED_FILTER_LIST[0].tags[0]
  );

  const handleSelectTag = (tag: ReviewSortEnum) => {
    setSelectedTag(tag);
  };

  return (
    <Container px="8px" py="20px" bg="yellow.100">
      <VStack px={"12px"} gap="10px" alignItems={"start"}>
        <Box>
          <Text textColor="black.100" as="span" textStyle={"h2_bold"}>
            리뷰{" "}
          </Text>
          <Text textColor="orange.200" as="span" textStyle={"h2_bold"}>
            {reviewData.length}
          </Text>
        </Box>
        <BeerInfoHStack
          label={"제보된 판매처"}
          desc={buyFrom}
          flexBasis={"81px"}
        />
        <BeerInfoHStack label={"평균 별점"} flexBasis={"81px"}>
          <HStack>
            <Rating
              starSize={23}
              rate={Math.round(rate)}
              styleProps={{
                gap: "0px",
              }}
            />
            <Text textStyle={"h3"} textColor="black.100">
              {rate}
            </Text>
            <Text textStyle={"h3"} textColor="gray.300">
              {" "}
              / 5
            </Text>
          </HStack>
        </BeerInfoHStack>
        <FeedFilter selectedTag={selectedTag} onClickTag={handleSelectTag} />
        {/* ALL_FEED_MOCK을 prop으로 받아서 AllTabPanelList랑 공유하기 */}
      </VStack>
      <Flex flexDir={"column"} gap="10px">
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
      <ReviewModal />
    </Container>
  );
};
