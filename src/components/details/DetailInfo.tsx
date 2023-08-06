import {Box, Center, HStack, Image, Text, VStack} from "@chakra-ui/react";
import {useState} from "react";
import {LeftBackBeerNameRightHeart} from "../shared/Headers/LeftBackBeerNameRightHeart";
import {LeftBackTitle} from "../shared/Headers/LeftBackTitle";
import {Rating} from "../shared/Rating";
import {useToast} from "@chakra-ui/react";
import {useMutation} from "react-query";
import axios from "axios";
import {LikeButton} from "../shared/LikeButton";
import {CommonBeerImage} from "../shared/CommonBeerImage/CommonBeerImage";
import {roundToDecimal} from "@/../utils/number";
interface DetailInfoProps {
  beerName: string;
  volume: number;
  category: string;
  country: string;
  beerImg: string;
  beerId: number;
  rate: number;
}

export const DetailInfo: React.FC<DetailInfoProps> = ({
  beerName,
  volume,
  category,
  country,
  beerImg,
  beerId,
  rate,
}) => {
  const [didPassStar, setDidPassStar] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const rateToUse = roundToDecimal(rate);
  const id = "test-toast";
  const toastTitle = isLiked
    ? "좋아요한 맥주에서 삭제했어요!"
    : "좋아요한 맥주에 추가했어요!";

  const likeBeer = useMutation((beerId: number) =>
    axios.post(`/api/v1/beers/${beerId}/likes`)
  );

  const dislikeBeer = useMutation((beerId: number) =>
    axios.delete(`/api/v1/beers/${beerId}/likes`)
  );
  const toast = useToast({
    position: "bottom",
    title: toastTitle,
    id: id,
    isClosable: true,
    duration: 3000,
    containerStyle: {
      margin: "8px",
    },
    render: () => (
      <Box
        mx="12px"
        py="8px"
        color="white"
        bg="blue.500"
        backgroundColor="black.200"
        borderRadius="5px"
      >
        <Text textStyle={"h3"} textColor="white" textAlign={"center"}>
          {toastTitle}
        </Text>
      </Box>
    ),
  });

  const handleClickLike = () => {
    setIsLiked(!isLiked);
    toast();
    isLiked ? dislikeBeer.mutate(beerId) : likeBeer.mutate(beerId); // 데이터 저장
  };

  return (
    <>
      {/* title */}
      {didPassStar ? (
        <LeftBackBeerNameRightHeart beerName={beerName} />
      ) : (
        <LeftBackTitle />
      )}
      {/* image  */}
      <Center pt="72px" w="full" px="24px">
        <CommonBeerImage
          boxSize="320px"
          src={beerImg}
          alt={`${beerName} image`}
          borderRadius="6px"
        />
      </Center>

      <VStack px="24px" py="20px" w="full" alignItems="flex-start" gap="20px">
        {/* panel */}
        <HStack w="full" justifyContent="space-between">
          <Text textStyle="h1">{beerName}</Text>
          <HStack gap="20px">
            {/* like button */}
            <LikeButton
              isLiked={isLiked}
              onClick={handleClickLike}
              w="40px"
              h="40px"
              fontSize={"28px"}
              cursor="pointer"
              aria-label="like button"
            />
          </HStack>
        </HStack>
        {/* description */}
        <HStack>
          <Text textStyle="h2">
            {volume} | {category} | {country}
          </Text>
        </HStack>
        <Center w="full">
          <Rating
            _rate={rateToUse}
            starSize={40}
            styleProps={{
              gap: "20px",
            }}
          />
        </Center>
      </VStack>
    </>
  );
};
