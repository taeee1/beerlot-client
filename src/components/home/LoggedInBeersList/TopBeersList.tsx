import {
  useBeerDislikeMutation,
  useBeerLikeMutation,
} from "@/../hooks/query/useBeerLikeMutation";
import {BeerResponseType} from "@/../typedef/server/beer";
import {generateBeerDetailUrl} from "@/../utils/url";
import {CommonBeerImage} from "@/components/shared/CommonBeerImage/CommonBeerImage";
import {LikeButton} from "@/components/shared/LikeButton";
import {Box, HStack, Text} from "@chakra-ui/react";
import {
  BeerCard,
  BeerCardBody,
  BeerCardFooter,
  BeerCategoryTag,
  BeerCategoryTagLabel,
  BeerNameText,
} from "@components/shared/Card/BeerCardItem";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import React, {useCallback} from "react";

interface TopBeersListProps {
  beersList: BeerResponseType[];
  likedBeersList: BeerResponseType[] | undefined;
}

const TopBeersList: React.FC<TopBeersListProps> = ({
  beersList,
  likedBeersList,
}) => {
  const router = useRouter();
  const accessToken = Cookies.get("beerlot-oauth-auth-request") ?? "";
  const likeBeerMutation = useBeerLikeMutation();
  const dislikeBeerMutation = useBeerDislikeMutation();

  const handleClickCard = useCallback(
    (id?: number, name?: string) => {
      if (!id || !name) return; //TODO: add toast

      const url = generateBeerDetailUrl(id, name);
      router.push(url);
    },
    [router]
  );

  const handleClickLike = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id?: number) => {
      e.stopPropagation();
      console.log("id", id);
      if (id === undefined) return;
      const isLiked = likedBeersList?.some((item) => item.id === id);
      console.log("isLiked"), isLiked;
      if (!isLiked) {
        likeBeerMutation.mutate({beerId: id, accessToken});
      } else {
        dislikeBeerMutation.mutate({beerId: id, accessToken});
      }
    },
    [accessToken, dislikeBeerMutation, likeBeerMutation, likedBeersList]
  );

  return (
    <>
      <Text textColor="black.100" textStyle={"h2_bold"}>
        🔥 인기맥주 TOP10 🔥
      </Text>
      <HStack overflowX={"auto"} w="full" gap={"12px"}>
        {beersList &&
          beersList.map((item) => {
            return (
              <BeerCard
                key={item.id}
                mt={1}
                pos={"relative"}
                onClick={() => handleClickCard(item?.id, item.name)}
              >
                <BeerCardBody position="relative">
                  <Box position="relative">
                    {item.image_url && (
                      <CommonBeerImage
                        src={item.image_url}
                        alt={item.name}
                        width="124px"
                        height="128px"
                        objectFit="cover"
                      />
                    )}
                  </Box>
                  <Box position="absolute" top={0} right={0}>
                    <LikeButton
                      isLiked={true}
                      onClick={(e) => handleClickLike(e, item?.id)}
                      h={7}
                      aria-label="like button"
                    />
                  </Box>
                </BeerCardBody>
                <BeerCardFooter>
                  <BeerNameText>{item.name}</BeerNameText>
                  <HStack>
                    <BeerNameText>{item.origin_country}</BeerNameText>
                    <BeerCategoryTag>
                      <BeerCategoryTagLabel>
                        {item.category?.name}
                      </BeerCategoryTagLabel>
                    </BeerCategoryTag>
                  </HStack>
                </BeerCardFooter>
              </BeerCard>
            );
          })}
      </HStack>
    </>
  );
};

export default TopBeersList;
