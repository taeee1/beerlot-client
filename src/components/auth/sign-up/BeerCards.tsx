import {
  Box,
  HStack,
  SimpleGrid,
  StackProps,
  Text,
  VStack,
  Image as ChakraImage,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { POLICY_LABEL } from "../../../../interface/server/types/Auth";
import { checkSelected } from "../../../../utils/array";
import { chosenBeerIdsState } from "../../../store/atom";
import Cookies from "js-cookie";

import {
  BeerCard,
  BeerCardBody,
  BeerCardFooter,
  BeerCategoryTag,
  BeerCategoryTagLabel,
  BeerCountryText,
  BeerNameText,
} from "../../shared/Card/BeerCardItem";

import FloatingButton from "../../shared/FloatingButton";
import { CommonBeerImage } from "@/components/shared/CommonBeerImage/CommonBeerImage";
import { useSignupQuery } from "@/../hooks/query/useAuthQuery";
import { useBeersQuery } from "../../../../hooks/query/useBeerQuery";
import { BeerSortType } from "../../../../types/common";

interface BeerCardsProps extends StackProps {
  username: string;
}

const BeerCards: React.FC<BeerCardsProps> = ({ username, ...props }) => {
  const [chosenBeerIds, setChosenBeerIds] = useRecoilState(chosenBeerIdsState);
  const isFullfilled = chosenBeerIds && chosenBeerIds.length > 0;

  const signupInfo = {
    username: username,
    image_url: "",
    agreed_policies: [
      POLICY_LABEL.PERSONAL_INFORMATION_POLICY,
      POLICY_LABEL.TERMS_OF_SERVICE,
    ],
  };

  const accessToken = Cookies.get("beerlot-oauth-auth-guest") ?? "";
  const router = useRouter();
  const signupQuery = useSignupQuery(signupInfo, accessToken, {
    onSettled: () => {
      Cookies.set("beerlot-oauth-auth-request", accessToken);

      Cookies.remove("beerlot-oauth-auth-guest");

      router.push(`/signup/complete`);
    },
  });

  const handleClickComplete = () => {
    signupQuery.refetch();
  };

  const handleClickBeer = (newBeerId: number | undefined) => {
    if (!newBeerId) return;
    let newChosenBeers = [...chosenBeerIds];
    if (checkSelected(newBeerId, newChosenBeers)) {
      newChosenBeers = newChosenBeers.filter((id) => id !== newBeerId);
    } else {
      newChosenBeers.push(newBeerId);
    }
    setChosenBeerIds(newChosenBeers);
  };

  const SearchBeerQuery = useBeersQuery({
    sort: BeerSortType.MOST_LIKES,
  });

  useEffect(() => {
    SearchBeerQuery.refetch();
  }, []);

  return (
    <VStack
      mt="48px"
      pb={"25px"}
      alignItems="start"
      w="full"
      h="full"
      {...props}
    >
      <Box>
        <Text display="inline" textStyle={"h1"} textColor="orange.200">
          {username}
        </Text>
        <Text display="inline" textStyle={"h1"}>
          님의 최애맥주
        </Text>
      </Box>

      <Text textColor="black.100" textStyle={"h1"} style={{ marginTop: 0 }}>
        5개 이상 골라주세요!
      </Text>
      <Text fontSize="12px" textColor="gray.300" textStyle={"h4"}>
        고른 맥주를 바탕으로 취향 분석 후, 맥주를 추천해드릴게요 :)
      </Text>

      <SimpleGrid columns={3} spacingX="10px" spacingY="25px">
        {/* TODO: Connect api */}
        {SearchBeerQuery.data?.contents.map((item) => {
          const isSelected = item.id ? chosenBeerIds.includes(item.id) : false;
          return (
            <BeerCard
              key={item.id}
              mt={1}
              w="full"
              borderColor={"orange.200"}
              cursor="pointer"
              onClick={() => handleClickBeer(item?.id)}
              filter={
                isSelected
                  ? "drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.3))"
                  : "none"
              }
              bg={isSelected ? "orange.200" : "white.100"}
            >
              <BeerCardBody
                w="full"
                h="full"
                position={"relative"}
                border="orange.200"
              >
                <Box position="relative" borderRadius={6}>
                  {item.image_url && (
                    <CommonBeerImage
                      src={item.image_url}
                      alt={item.name}
                      width="175px"
                      height="175px"
                      objectFit="cover"
                      style={{ borderRadius: "6px" }}
                    />
                  )}
                </Box>
              </BeerCardBody>
              <BeerCardFooter>
                <BeerNameText>{item.name}</BeerNameText>
                <HStack>
                  <BeerCountryText
                    borderRadius="full"
                    country={item.origin_country}
                  />
                  <BeerCategoryTag bg={isSelected ? "white.100" : "orange.200"}>
                    <BeerCategoryTagLabel
                      textColor={isSelected ? "orange.200" : "white.100"}
                    >
                      {item.category?.name}
                    </BeerCategoryTagLabel>
                  </BeerCategoryTag>
                </HStack>
              </BeerCardFooter>
            </BeerCard>
          );
        })}
      </SimpleGrid>
      <FloatingButton
        pos="sticky"
        w="full"
        disabled={!isFullfilled}
        text="완료!"
        onClick={handleClickComplete}
        bgColor={isFullfilled ? "orange.200" : "gray.200"}
        textColor={isFullfilled ? "white.100" : "black.100"}
        boxShadow={isFullfilled ? "0px 8px 16px rgba(0, 0, 0, 0.3)" : "none"}
      />
    </VStack>
  );
};

export default BeerCards;
