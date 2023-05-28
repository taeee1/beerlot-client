import {useUserReviewsQuery} from "@/../hooks/query/useUserQuery";
import {Flex} from "@chakra-ui/react";
import Cookies from "js-cookie";
import {useEffect} from "react";
import FollowingTabPanelItem from "../../feed/TabPanelItem";
import {ContentType} from "@/../hooks/query/useReviewQuery";
import {MemberReviewResponse} from "@/../types/member/response";

const BeerReviews = () => {
  const accessToken = Cookies.get("beerlot-oauth-auth-request") ?? "";
  const userReviewQuery = useUserReviewsQuery(accessToken);

  useEffect(() => {
    userReviewQuery.refetch();
  }, []);

  return (
    <Flex flexDirection="column" gap={"10px"}>
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
          />
        );
      })}
    </Flex>
  );
};

export default BeerReviews;
