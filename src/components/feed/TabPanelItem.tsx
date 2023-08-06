import {
  useReviewDislikeMutation,
  useReviewLikeMutation,
} from "@/../hooks/query/useReviewQuery";
import {getLeftTime} from "@/../utils/time";
import {Avatar, Box, Center, Flex, IconButton, Text} from "@chakra-ui/react";
import Cookies from "js-cookie";
import {useCallback, useState} from "react";
import {useQueryClient} from "react-query";
import {EditNote, TrashBin} from "../../../public/svg";
import {CommonBeerImage} from "../shared/CommonBeerImage/CommonBeerImage";
import {Rating} from "../shared/Rating";
import ThumbsUpButton from "../shared/ThumbsUpButton";
interface FollowingTabPanelItemProps {
  reviewId: number;
  nickname: string;
  postingTime: string;
  beerName?: string;
  rate: number;
  postText: string;
  thumbsUpNumber: number;
  isLiked?: boolean;
  isEditable?: boolean;
  isRow?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  imageSrc?: string;
  maxPostLength?: number;
}

const FollowingTabPanelItem: React.FC<FollowingTabPanelItemProps> = ({
  reviewId,
  isLiked = false,
  isRow = false,
  nickname,
  postingTime,
  beerName,
  rate,
  imageSrc,
  postText,
  onDelete,
  onEdit,
  thumbsUpNumber,
  isEditable = false,
  maxPostLength = MAX_TEXT_LENGTH_OF_REVIEW,
}) => {
  const accessToken = Cookies.get("beerlot-oauth-auth-request") ?? "";
  const queryClient = useQueryClient();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const handleToggleElipsis = () => {
    setIsExpanded(!isExpanded);
  };

  const postEllipsisStatus = chooseTextDisplay(
    postText.length > maxPostLength,
    isExpanded
  );

  const reviewLikeMutation = useReviewLikeMutation(reviewId, accessToken, {
    onSuccess: () => {
      queryClient.invalidateQueries("userReviews"); // Replace "userReviews" with the appropriate query key
    },
  });

  const reviewDislikeMutation = useReviewDislikeMutation(
    reviewId,
    accessToken,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userReviews"); // Replace "userReviews" with the appropriate query key
      },
    }
  );

  const handleClickLike = useCallback(() => {
    if (isLiked) {
      reviewDislikeMutation.mutate();
    } else {
      reviewLikeMutation.mutate();
    }
  }, [isLiked, reviewDislikeMutation, reviewLikeMutation]);

  return (
    <Box p={"12px"} bg="white">
      <Box
        display="flex"
        flexDirection={isRow ? "row" : "column"}
        justifyContent={isRow ? "space-between" : "flex-start"}
        gap={isRow ? "4px" : "0px"}
      >
        <Box>
          <Box
            flexGrow={1}
            className="userInfo"
            gap={"4px"}
            display={"flex"}
            flexDirection="row"
            alignItems="end"
            my={"2px"}
          >
            <Avatar w={"26px"} h={"26px"} />
            <Text textStyle="h2_bold">{nickname}</Text>
            <Text textStyle="h3" color="gray.300">
              |
            </Text>
            <Text textStyle="h3" color="gray.300">
              {getLeftTime(postingTime)}
            </Text>
          </Box>
          {beerName && !isEditable && (
            <Box className="beerInfo" my={"2px"}>
              <Text textStyle="h3_bold">{beerName}</Text>
            </Box>
          )}

          <Box className="ratingInfo" my={"2px"}>
            <Rating
              starSize={16}
              _rate={Math.round(rate)}
              styleProps={{
                gap: "0px",
              }}
            />
          </Box>

          {/* review post texts */}
          {isRow && (
            <Box display="inline" my={"2px"} flexDirection="row">
              <Text textStyle="h3" display="inline">
                {postEllipsisStatus === "shorten"
                  ? postText.slice(0, 35)
                  : postText}
                {postEllipsisStatus === "shorten" ? "..." : ""}
              </Text>
              <Text
                as={"button"}
                textStyle="h3"
                onClick={handleToggleElipsis}
                textColor={"gray.200"}
                display={
                  postEllipsisStatus === "normal" ? "none" : "inline-block"
                }
              >
                {isExpanded ? "숨기기" : "더보기"}
              </Text>
            </Box>
          )}
        </Box>
        <Box flexShrink={0} borderRadius={"6px"}>
          {imageSrc && (
            <CommonBeerImage
              width={isRow ? "100px" : "330px"}
              height={isRow ? "100px" : "330px"}
              alt="beer photo"
              src={`/image/${imageSrc}`}
            />
          )}
        </Box>

        {!isRow && (
          <Box display="flex" alignItems="baseline" my={"2px"}>
            <Text textStyle="h3">{postText}</Text>
          </Box>
        )}
      </Box>

      {isEditable ? (
        <Flex justifyContent="space-between" alignItems="center">
          <Center gap="6px">
            <IconButton
              aria-label="Delete Icon"
              size="16px"
              onClick={onDelete}
              icon={<TrashBin />}
            />
            <IconButton
              aria-label="Edit Icon"
              size="16px"
              onClick={onEdit}
              icon={<EditNote />}
            />
          </Center>
          <ThumbsUpButton
            thumbsUpNumber={thumbsUpNumber}
            isLiked={isLiked}
            onClick={handleClickLike}
          />
        </Flex>
      ) : (
        <Flex justifyContent="end">
          <ThumbsUpButton
            thumbsUpNumber={thumbsUpNumber}
            onClick={handleClickLike}
            isLiked={isLiked}
          />
        </Flex>
      )}
    </Box>
  );
};

export default FollowingTabPanelItem;

const MAX_TEXT_LENGTH_OF_REVIEW = 35;

const chooseTextDisplay = (
  expandable: boolean,
  isExpanded: boolean
): "expanded" | "shorten" | "normal" => {
  if (!expandable) return "normal";
  if (isExpanded) return "expanded";
  return "shorten";
};
