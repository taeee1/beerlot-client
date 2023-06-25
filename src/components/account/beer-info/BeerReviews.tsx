import {useUserReviewsQuery} from "@/../hooks/query/useUserQuery";
import {MemberReviewResponse} from "@/../types/member/response";
import {Flex} from "@chakra-ui/react";
import Cookies from "js-cookie";
import {useCallback, useEffect} from "react";
import FollowingTabPanelItem from "../../feed/TabPanelItem";
import {useDeleteReviewMutation} from "@/../hooks/query/useReviewQuery";

const BeerReviews = () => {
  const accessToken = Cookies.get("beerlot-oauth-auth-request") ?? "";
  const userReviewQuery = useUserReviewsQuery(accessToken);

  useEffect(() => {
    userReviewQuery.refetch();
  }, []);

  const handleEdit = useCallback(() => {}, []);
  const deleteReviewMutation = useDeleteReviewMutation(accessToken);

  const handleDelete = useCallback(
    (reviewId: number) => () => {
      deleteReviewMutation.mutate(reviewId);
    },
    [deleteReviewMutation]
  );

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
            onEdit={handleEdit}
          />
        );
      })}
    </Flex>
  );
};

export default BeerReviews;
