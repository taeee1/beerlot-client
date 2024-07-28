import { useUserLikedReviewsQuery } from "@/../hooks/query/useUserQuery";
import { MemberReviewResponse } from "@/../types/member/response";
import { ReviewDeleteConfirmationDrawer } from "@/components/shared/ReviewModal/ReviewDeleteConfirmationDrawer";
import { Flex, useDisclosure } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useCallback, useState } from "react";
import { useReviewDeleteMutation } from "../../../../hooks/reviews/useReview";
import { FollowingTabPanelItem } from "@/components/feed/TabPanelItem";
import { ReviewModalWrapper } from "@/components/shared/ReviewModal/ReviewModalWrapper/ReviewModalWrapper";

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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const likedReviewsListQuery = useUserLikedReviewsQuery(accessToken);

  const handleEdit = useCallback(
    (reviewId: number) => {
      setSelectedReviewId(reviewId);
      onOpen();
    },
    [onOpen]
  );

  const deleteReviewMutation = useReviewDeleteMutation(accessToken, {
    onSuccess: () => {
      onResetReviews();
    },
  });

  const handleDelete = (reviewId: number) => {
    deleteReviewMutation.mutate(reviewId);
  };

  const {
    isOpen: isOpenDeleteConfirmation,
    onOpen: onOpenDeleteConfirmation,
    onClose: onCloseDeleteConfirmation,
  } = useDisclosure();

  return (
    <Flex
      flexDirection="column"
      gap={"10px"}
      h="full"
      className="beerReviewFlex"
    >
      {userReviews?.map((feed: MemberReviewResponse) => {
        return (
          <>
            <FollowingTabPanelItem
              key={feed.id}
              reviewId={Number(feed.id)}
              isLiked={likedReviewsListQuery.data?.includes(feed.id)}
              nickname={feed.beer.name}
              reviewTime={feed.updated_at}
              rate={feed.rate}
              imageSrc={feed.image_url}
              content={feed.content}
              likedCount={feed.like_count}
              isEditable={true}
              onDelete={onOpenDeleteConfirmation}
              onEdit={() => handleEdit(feed.id)}
            />
            <ReviewDeleteConfirmationDrawer
              isOpen={isOpenDeleteConfirmation}
              onClose={onCloseDeleteConfirmation}
              onClickLeftButton={() => {
                onCloseDeleteConfirmation();
              }}
              onClickRightButton={() => {
                handleDelete(feed.id);
                onCloseDeleteConfirmation();
              }}
            />
          </>
        );
      })}

      <ReviewModalWrapper
        reviewId={selectedReviewId}
        isModalOpen={isOpen}
        onCloseModal={onClose}
      />
    </Flex>
  );
};

export default BeerReviews;
