import {useUserReviewsQuery} from "@/../hooks/query/useUserQuery";
import {MemberReviewResponse} from "@/../types/member/response";
import {Flex, useDisclosure} from "@chakra-ui/react";
import Cookies from "js-cookie";
import {useCallback, useEffect, useState} from "react";
import FollowingTabPanelItem from "../../feed/TabPanelItem";
import {
  useDeleteReviewMutation,
  useReviewQuery,
} from "@/../hooks/query/useReviewQuery";
import {ReviewModal} from "@/components/shared/ReviewModal/ReviewModal";
import {ReviewInfoType} from "@/../interface/types";

const BeerReviews = () => {
  const accessToken = Cookies.get("beerlot-oauth-auth-request") ?? "";
  const userReviewQuery = useUserReviewsQuery(accessToken);
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);
  const reviewData = useReviewQuery(selectedReviewId).data;

  useEffect(() => {
    userReviewQuery.refetch();
  }, []);

  const handleEdit = useCallback((reviewId: number) => {
    setSelectedReviewId(reviewId);
  }, []);

  const deleteReviewMutation = useDeleteReviewMutation(accessToken, {
    onSuccess: () => {
      userReviewQuery.refetch();
    },
  });

  const handleDelete = useCallback(
    (reviewId: number) => () => {
      deleteReviewMutation.mutate(reviewId);
    },
    [deleteReviewMutation]
  );
  const existingRevewInfo = {
    beerName: null, //TODO: should be fixed
    rate: reviewData?.rate ?? 0,
    review: reviewData?.content,
    image_url: reviewData?.image_url,
  } as ReviewInfoType;

  return (
    <Flex
      flexDirection="column"
      gap={"10px"}
      h="full"
      className="beerReviewFlex"
    >
      {userReviewQuery?.data?.contents?.map((feed: MemberReviewResponse) => {
        return (
          <FollowingTabPanelItem
            key={feed.id}
            reviewId={Number(feed.id)}
            isRow
            isLiked={false} // should be modified
            nickname={""} // should be modified
            postingTime={feed.updated_at}
            rate={feed.rate}
            imageSrc={feed.image_url}
            postText={feed.content}
            thumbsUpNumber={feed.like_count}
            isEditable={true}
            onDelete={handleDelete(feed.id)}
            onEdit={() => handleEdit(feed.id)}
          />
        );
      })}
      <ReviewModal
        existingReviewInfo={reviewData ? existingRevewInfo : undefined}
      />
    </Flex>
  );
};

export default BeerReviews;
