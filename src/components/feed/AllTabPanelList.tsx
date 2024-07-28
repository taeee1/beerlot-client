import { useUserLikedReviewsQuery } from "@/../hooks/query/useUserQuery";
import { Flex } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useState } from "react";
import { MOCK_FEED_FILTER_LIST } from "../../../interface/static";
import { ReviewSortEnum } from "../../../interface/types";
import { FeedFilter } from "./FeedFilter/FeedFilter";
import { useAllReviewsQuery } from "../../../hooks/reviews/useReview";
import { FollowingTabPanelItem } from "./TabPanelItem";
import { ReviewTypeV2 } from "../../../typedef/review";

export const AllTabPanelList = () => {
  const accessToken = Cookies.get("beerlot-oauth-auth-request") ?? "";
  const likedReviewsListQuery = useUserLikedReviewsQuery(accessToken);
  const [selectedTag, setSelectedTag] = useState<ReviewSortEnum>(
    MOCK_FEED_FILTER_LIST[0].tags[0]
  );
  const allReviewsQuery = useAllReviewsQuery({
    sort: selectedTag,
  });

  const handleSelectTag = async (tag: ReviewSortEnum) => {
    setSelectedTag(tag);
  };

  return (
    <Flex flexDirection="column" gap={"10px"} pb={"64px"}>
      <FeedFilter selectedTag={selectedTag} onClickTag={handleSelectTag} />
      {allReviewsQuery?.data?.map((review: ReviewTypeV2) => {
        return (
          <FollowingTabPanelItem
            key={review.id}
            isLiked={likedReviewsListQuery.data?.includes(review.id)}
            reviewId={Number(review.id)}
            content={review.content}
            nickname={review.member.username}
            reviewTime={review.updated_at}
            beerName={review.beer.name}
            rate={review.rate}
            imageSrc={review.image_url}
            likedCount={review.like_count}
            isEditable={false}
          />
        );
      })}
    </Flex>
  );
};
