import {
  useDeleteReviewMutation,
  useReviewQuery,
} from "@/../hooks/query/useReviewQuery";
import { useUserReviewsQuery } from "@/../hooks/query/useUserQuery";
import { ReviewInfoType } from "@/../interface/types";
import { MemberReviewResponse } from "@/../types/member/response";
import { ReviewModal } from "@/components/shared/ReviewModal/ReviewModal";
import { Flex, useDisclosure } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import FollowingTabPanelItem from "../../feed/TabPanelItem";

const BeerReviews = () => {
  const accessToken = Cookies.get("beerlot-oauth-auth-request") ?? "";
  const userReviewQuery = useUserReviewsQuery(accessToken);
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);
  const reviewData = useReviewQuery(selectedReviewId).data;
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    userReviewQuery.refetch();
  }, []);

  const handleEdit = useCallback(
    (reviewId: number) => {
      setSelectedReviewId(reviewId);
      onOpen();
    },
    [onOpen]
  );

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
            isLiked={false} // should be modified
            nickname={feed.beer.name} // should be modified
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
        reviewId={selectedReviewId}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
    </Flex>
  );
};

export default BeerReviews;
