import {
  useDeleteReviewMutation,
  useReviewQuery,
} from "@/../hooks/query/useReviewQuery";
import { useUserLikedReviewsQuery } from "@/../hooks/query/useUserQuery";
import { ReviewInfoType } from "@/../interface/types";
import { MemberReviewResponse } from "@/../types/member/response";
import { ReviewModal } from "@/components/shared/ReviewModal/ReviewModal";
import { Flex, useDisclosure } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useCallback, useState } from "react";
import FollowingTabPanelItem from "../../feed/TabPanelItem";

interface BeerReviewsProps {
  userReviews: MemberReviewResponse[];
  onResetReviews: () => void;
}

const BeerReviews: React.FC<BeerReviewsProps> = ({
  userReviews,
  onResetReviews,
}) => {
  const accessToken = Cookies.get("beerlot-oauth-auth-request") ?? "";
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);
  const reviewData = useReviewQuery(selectedReviewId).data;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const likedReviewsListQuery = useUserLikedReviewsQuery(accessToken);

  const handleEdit = useCallback(
    (reviewId: number) => {
      setSelectedReviewId(reviewId);
      onOpen();
    },
    [onOpen]
  );

  const deleteReviewMutation = useDeleteReviewMutation(accessToken, {
    onSuccess: () => {
      onResetReviews();
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
      {userReviews?.map((feed: MemberReviewResponse) => {
        return (
          <FollowingTabPanelItem
            key={feed.id}
            reviewId={Number(feed.id)}
            isLiked={likedReviewsListQuery.data?.includes(feed.id)}
            nickname={feed.beer.name}
            postingTime={feed.updated_at}
            rate={feed.rate}
            imageSrc={feed.image_url}
            postText={feed.content}
            thumbsUpNumber={feed.like_count}
            isEditable={true}
            onDelete={handleDelete(feed.id)}
            onEdit={() => handleEdit(feed.id)}
            token={accessToken}
          />
        );
      })}
      <ReviewModal
        existingReviewInfo={reviewData ? existingRevewInfo : undefined}
        reviewId={selectedReviewId}
        isModalOpen={isOpen}
        onCloseModal={onClose}
      />
    </Flex>
  );
};

export default BeerReviews;
