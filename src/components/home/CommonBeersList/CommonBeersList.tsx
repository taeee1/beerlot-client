import { generateBeerDetailUrl } from "@/../utils/url";
import { CommonBeerImage } from "@/components/shared/CommonBeerImage/CommonBeerImage";
import { LikeButton } from "@/components/shared/LikeButton";
import { Box, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import {
  BeerCard,
  BeerCardBody,
  BeerCardFooter,
  BeerCategoryTag,
  BeerCategoryTagLabel,
  BeerCountryText,
  BeerNameText,
} from "@components/shared/Card/BeerCardItem";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { BeerResponseType } from "../../../../typedef/server/beer";
import { useBeerLikeMutation } from "@/../hooks/query/useBeerLikeMutation";
import Cookies from "js-cookie";
interface CommonBeersListProps {
  beersList?: BeerResponseType[];
}
const CommonBeersList: React.FC<CommonBeersListProps> = ({ beersList }) => {
  const router = useRouter();
  const accessToken = Cookies.get("beerlot-oauth-auth-request") ?? "";

  const likeBeerMutation = useBeerLikeMutation();
  const likeBeer = useCallback(
    async (beerId: number) => {
      await likeBeerMutation.mutate(
        { accessToken, beerId },
        {
          onSuccess: () => {
            setIsLikeBeer(true);
          },
          onError: ({ response }) => {
            if (response.status === 403) {
              router.push("/login");
            }
          },
        }
      );
    },
    [accessToken, likeBeerMutation, router]
  );

  const dislikeBeer = useCallback((beerId: number) => {
    console.log("beerId", beerId);
  }, []);

  const handleClickCard = useCallback(
    (id?: number, name?: string) => {
      if (!id || !name) return; //TODO: add toast

      const url = generateBeerDetailUrl(id, name);
      router.push(url);
    },
    [router]
  );

  const [isLikedBeer, setIsLikeBeer] = useState(false);
  const handleClickLike = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, beerId?: number) => {
      e.stopPropagation();
      if (beerId === undefined) return;
      if (isLikedBeer) {
        dislikeBeer(beerId);
      } else {
        likeBeer(beerId);
      }
    },
    [dislikeBeer, isLikedBeer, likeBeer]
  );

  return (
    <>
      <Text textColor="black.100" textStyle={"h2_bold"}>
        🔥 인기맥주 TOP10 🔥
      </Text>

      <SimpleGrid columns={2} spacing={"16px"}>
        {beersList &&
          beersList.map((item) => {
            return (
              <BeerCard
                key={item.id}
                mt={1}
                w="full"
                onClick={() => handleClickCard(item?.id, item.name)}
              >
                <BeerCardBody w="full" h="full" position={"relative"}>
                  <Box position="relative">
                    {item.image_url && (
                      <CommonBeerImage
                        src={item.image_url}
                        alt={item.name}
                        width="175px"
                        height="175px"
                        objectFit="cover"
                      />
                    )}
                  </Box>
                  <Box position="absolute" top={0} right={0}>
                    <LikeButton
                      isLiked={false}
                      onClick={(e) => handleClickLike(e, item.id)}
                      h={7}
                      aria-label="like button"
                    />
                  </Box>
                </BeerCardBody>
                <BeerCardFooter>
                  <BeerNameText>{item.name}</BeerNameText>
                  <HStack>
                    <BeerCountryText country={item.origin_country} />
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
      </SimpleGrid>
    </>
  );
};

export { CommonBeersList };
