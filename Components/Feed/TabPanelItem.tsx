import { Avatar, Box, Center, Flex, IconButton, Text } from "@chakra-ui/react";
import Image from "next/image";
import { EditNote, TrashBin } from "../../public/svg";
import StarRating from "../Utils/StarRating";
import ThumbsUpButton from "../Utils/ThumbsUpButton";

interface FollowingTabPanelItemProps {
  isRow: boolean;
  nickname: string;
  postingTime: string;
  beerName: string;
  ratingNumber: number;
  imageSrc?: string;
  postText: string;
  thumbsUpNumber: number;
  isEditable: boolean;
}

const FollowingTabPanelItem: React.FC<FollowingTabPanelItemProps> = ({
  isRow,
  nickname,
  postingTime,
  beerName,
  ratingNumber,
  imageSrc,
  postText,
  thumbsUpNumber,
  isEditable,
}) => {
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
              {/* TODO: time 분기 처리 */}
              {postingTime}
            </Text>
          </Box>
          {!isEditable && (
            <Box className="beerInfo" my={"2px"}>
              <Text textStyle="h3_bold">{beerName}</Text>
            </Box>
          )}

          <Box className="ratingInfo" my={"2px"}>
            <Text fontSize={"17px"}>{ratingNumber}점</Text>
          </Box>
          {isRow && (
            <Box display="flex" my={"2px"} flexDirection="row">
              <Text textStyle="h3" as="span">
                {postText.slice(0, 35)}
                <Text as="span">{postText.length > 35 && "..."}</Text>
                <Text as="span" color="gray.200">
                  {postText.length > 35 && "더 보기"}
                </Text>
              </Text>
            </Box>
          )}
        </Box>
        <Box flexShrink={0} borderRadius={"6px"}>
          {imageSrc && (
            <Image
              width={isRow ? 100 : 330}
              height={isRow ? 100 : 330}
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
