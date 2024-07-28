import {
  Box,
  Center,
  Container,
  Flex,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Rating } from "../../shared/Rating";

import { FeedFilter } from "@/components/feed/FeedFilter/FeedFilter";
import { MOCK_FEED_FILTER_LIST } from "../../../../interface/static";
import { ReviewSortEnum } from "../../../../interface/types";
import { BeerInfoHStack } from "./BasicPanelList";
import FollowingTabPanelItem from "@/components/feed/TabPanelItem";
import { ReviewResult } from "@/../types/review/review";
import { roundToDecimal } from "@/../utils/number";
import { UserReview } from "./UserReview";
import { useBeerReviewsQuery } from "../../../../hooks/reviews/useBeer";

interface ReviewPanelListProps {
  rate: number;
  beerId: number;
  buyFrom: string[];
}

export const ReviewPanelList: React.FC<ReviewPanelListProps> = ({
  beerId,
  rate,
  buyFrom,
}) => {
  const [selectedTag, setSelectedTag] = useState<ReviewSortEnum>(
    MOCK_FEED_FILTER_LIST[0].tags[0]
  );

  const { data, refetch } = useBeerReviewsQuery(
    { beerId, sort: selectedTag },
    { enabled: false }
  );
  const reviews = data;

  useEffect(() => {
    refetch();
  }, [selectedTag, refetch]);

  const handleSelectTag = (tag: ReviewSortEnum) => {
    setSelectedTag(tag);
  };

  const rateToUse = roundToDecimal(rate);

  return (
    <Container px="8px" py="20px" bg="yellow.100">
      <VStack px={"12px"} gap="10px" alignItems={"start"}>
        <ReviewCountDisplay reviewLength={reviews?.length ?? 0} />
        <UserReview />
        <Text textStyle={"h2_bold"} mt={10}>
          모든 리뷰
        </Text>
        <BeerInfoHStack label={"제보된 판매처"} flexBasis={"81px"}>
          <HStack>
            {buyFrom?.map((buyFrom) => {
              return (
                <Text textStyle={"h3"} key={buyFrom} textColor="black.100">
                  {buyFrom}
                </Text>
              );
            })}
          </HStack>
        </BeerInfoHStack>
        <BeerInfoHStack label={"평균 별점"} flexBasis={"81px"}>
          <HStack>
            <Rating
              starSize={23}
              buttonSize={"xs"}
              _rate={rateToUse}
              styleProps={{
                gap: "0px",
              }}
            />
            <Text textStyle={"h3"} textColor="black.100">
              {rateToUse}
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
      {reviews && reviews?.length > 0 ? (
        <ReviewsList reviews={reviews} />
      ) : (
        <EmptyReviewsList />
      )}
    </Container>
  );
};

const EmptyReviewsList = () => {
  return (
    <Center
      gap={2}
      borderRadius={8}
      bg={"white"}
      flexDir={"column"}
      py={5}
      mt={6}
      mx={5}
    >
      <Text textStyle={"h2_bold"}>아직 작성된 리뷰가 없어요😢</Text>
      <Text textStyle={"h3"} textColor={"gray.300"}>
        첫번째 리뷰의 주인공이 되어주실래요?
      </Text>
    </Center>
  );
};
interface ReviewsListProps {
  reviews: ReviewResult[];
}

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
  return (
    <Flex flexDir={"column"} gap="10px">
      {reviews?.map((review) => {
        return (
          <>
            <FollowingTabPanelItem
              key={review.id}
              reviewId={review.id}
              nickname={""}
              postingTime={review.updated_at}
              beerName={review.beer?.name}
              rate={review.rate}
              imageSrc={review.image_url}
              postText={review.content}
              thumbsUpNumber={review.like_count}
              isEditable={false}
            />
          </>
        );
      })}
    </Flex>
  );
};
interface ReviewCountDisplayProps {
  reviewLength: number;
}

const ReviewCountDisplay: React.FC<ReviewCountDisplayProps> = ({
  reviewLength,
}) => {
  return (
    <Box>
      <Text textColor="black.100" as="span" textStyle={"h2_bold"}>
        리뷰{" "}
      </Text>
      <Text textColor="orange.200" as="span" textStyle={"h2_bold"}>
        {reviewLength}
      </Text>
    </Box>
  );
};
