import { useUserLikedReviewsQuery } from "@/../hooks/query/useUserQuery";
import { Flex } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useState } from "react";
import { MOCK_FEED_FILTER_LIST } from "../../../interface/static";
import { ReviewSortEnum } from "../../../interface/types";
import { FeedFilter } from "./FeedFilter/FeedFilter";
import FollowingTabPanelItem from "./TabPanelItem";
import { useAllReviewsQuery } from "../../../hooks/reviews/useReview";
import { ReviewTypeV2 } from "@/api/review/typedef";

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
      {allReviewsQuery?.data?.map((post: any) => {
        return (
          <FollowingTabPanelItem
            key={post.id}
            isLiked={likedReviewsListQuery.data?.includes(post.id)}
            reviewId={Number(post.id)}
            postText={post.content}
            nickname={post.member.username}
            postingTime={post.updated_at}
            beerName={post.beer.name}
            rate={post.rate}
            imageSrc={post.image_url}
            thumbsUpNumber={post.like_count}
            isEditable={false}
            token={accessToken}
          />
        );
      })}
    </Flex>
  );
};
