import {getLeftTime} from "@/../utils/time";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Text,
} from "@chakra-ui/react";
import {useState} from "react";
import {EditNote, TrashBin} from "../../../public/svg";
import {CommonBeerImage} from "../shared/CommonBeerImage/CommonBeerImage";
import {Rating} from "../shared/Rating";
import ThumbsUpButton from "../shared/ThumbsUpButton";

interface FollowingTabPanelItemProps {
  isRow: boolean;
  nickname: string;
  postingTime: string;
  beerName: string;
  rate: number;
  imageSrc?: string;
  postText: string;
  thumbsUpNumber: number;
  isEditable: boolean;
  maxPostLength?: number;
}

const FollowingTabPanelItem: React.FC<FollowingTabPanelItemProps> = ({
  isRow,
  nickname,
  postingTime,
  beerName,
  rate,
  imageSrc,
  postText,
  thumbsUpNumber,
  isEditable,
  maxPostLength = MAX_TEXT_LENGTH_OF_REVIEW,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleToggleElipsis = () => {
    setIsExpanded(!isExpanded);
  };

  const postEllipsisStatus = chooseTextDisplay(
    postText.length > maxPostLength,
    isExpanded
  );

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
          {!isEditable && (
            <Box className="beerInfo" my={"2px"}>
              <Text textStyle="h3_bold">{beerName}</Text>
            </Box>
          )}

          <Box className="ratingInfo" my={"2px"}>
            <Rating
              starSize={16}
              rate={Math.round(rate)}
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
              icon={<TrashBin />}
            />
            <IconButton
              aria-label="Edit Icon"
              size="16px"
              icon={<EditNote />}
            />
          </Center>
          <ThumbsUpButton thumbsUpNumber={thumbsUpNumber} />
        </Flex>
      ) : (
        <Flex justifyContent="end">
          <ThumbsUpButton thumbsUpNumber={thumbsUpNumber} />
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
