import {Flex} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {MOCK_FEED_FILTER_LIST} from "../../../interface/static";
import {ReviewSortEnum} from "../../../interface/types";

import {ContentType, useAllReviewsQuery} from "@/../hooks/query/useReviewQuery";
import {FeedFilter} from "./FeedFilter/FeedFilter";
import FollowingTabPanelItem from "./TabPanelItem";

export const AllTabPanelList = () => {
  const [selectedTag, setSelectedTag] = useState<ReviewSortEnum>(
    MOCK_FEED_FILTER_LIST[0].tags[0]
  );
  const allReviewsQuery = useAllReviewsQuery({
    sort: selectedTag,
  });

  useEffect(() => {
    allReviewsQuery.refetch();
  }, [selectedTag]);

  const handleSelectTag = async (tag: ReviewSortEnum) => {
    setSelectedTag(tag);
  };

  return (
    <Flex flexDirection="column" gap={"10px"}>
      <FeedFilter selectedTag={selectedTag} onClickTag={handleSelectTag} />
      {/* ALL_FEED_MOCK을 prop으로 받아서 AllTabPanelList랑 공유하기 */}
      {allReviewsQuery?.data?.contents?.map((post: ContentType) => {
        return (
          <FollowingTabPanelItem
            key={post.id}
            postText={post.content}
            nickname={post.member.username}
            postingTime={post.updated_at}
            beerName={"MOCK_BEER_NAME"}
            rate={post.rate}
            imageSrc={post.image_url}
            thumbsUpNumber={post.like_count}
            isRow
            isEditable={false}
          />
        );
      })}
    </Flex>
  );
};
