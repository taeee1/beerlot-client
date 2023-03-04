import {
  AspectRatio,
  Box,
  Container,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import {useRecoilState} from "recoil";
import {BeerResponseType} from "../../typedef/server/beer";
import {
  BeerCard,
  BeerCardBody,
  BeerCardFooter,
  BeerCategoryTag,
  BeerCategoryTagLabel,
  BeerNameText,
} from "../shared/Card/BeerCardItem";
import {BlankHeader} from "../shared/Headers/BlankHeader";
import {userInfoState} from "../store/atom";
import SearchInputHome from "./SearchInputHome";
import {WelcomeTextContent} from "./WelcomeText";

const HomeTemplate = () => {
  const [userInfo] = useRecoilState(userInfoState);
  // const {top10Beers} = useGetPopularBeers();

  const top10Beers = [mockData, mockData, mockData, mockData, mockData];

  const {name, origin_country, image_url, category} = mockData;
  return (
    <Box w="full" h="full" bg="gray.100" mb={"64px"}>
      <Container p={"0px"} h="full" w="full" bg="white" maxW="450px">
        <Box p="64px 24px 24px" pt="64px">
          <BlankHeader />
          {/* TODO: v2 alarm feature */}
          {/* <RightBellHeader /> */}

          <WelcomeTextContent username={userInfo?.username} />

          <Box py={"34px"}>
            <SearchInputHome />
          </Box>

          {userInfo ? (
            <>
              <Text textColor="black.100" textStyle={"h2_bold"}>
                🔥 인기맥주 TOP10 🔥
              </Text>
              <HStack overflowX={"auto"} w="full" gap={"12px"}>
                {top10Beers &&
                  top10Beers.map((item) => {
                    return (
                      <BeerCard key={item.id} mt={1}>
                        <BeerCardBody>
                          <Box position="relative">
                            {image_url && (
                              <Image
                                src={image_url}
                                alt={name}
                                width="124px"
                                height="128px"
                                objectFit="cover"
                              />
                            )}
                          </Box>
                        </BeerCardBody>
                        <BeerCardFooter>
                          <BeerNameText>{name}</BeerNameText>
                          <HStack>
                            <BeerNameText>{origin_country}</BeerNameText>
                            <BeerCategoryTag>
                              <BeerCategoryTagLabel>
                                {category?.name}
                              </BeerCategoryTagLabel>
                            </BeerCategoryTag>
                          </HStack>
                        </BeerCardFooter>
                      </BeerCard>
                    );
                  })}
              </HStack>

              <Text textColor="black.100" textStyle={"h2_bold"} mt={8}>
                🍻{" "}
                <Text
                  textColor="orange.200"
                  textStyle={"h2_bold"}
                  display="inline"
                >
                  {userInfo.username}
                </Text>
                님께 추천해요 🍻
              </Text>
              <HStack overflowX={"auto"} w="full" gap={"12px"}>
                {top10Beers &&
                  top10Beers.map((item) => {
                    return (
                      <BeerCard key={item.id} mt={1} borderColor={"orange.200"}>
                        <BeerCardBody>
                          <Box position="relative">
                            {image_url && (
                              <Image
                                src={image_url}
                                alt={name}
                                width="124px"
                                height="128px"
                                objectFit="cover"
                              />
                            )}
                          </Box>
                        </BeerCardBody>
                        <BeerCardFooter>
                          <BeerNameText>{name}</BeerNameText>
                          <HStack>
                            <BeerNameText>{origin_country}</BeerNameText>
                            <BeerCategoryTag bg="orange.200">
                              <BeerCategoryTagLabel>
                                {category?.name}
                              </BeerCategoryTagLabel>
                            </BeerCategoryTag>
                          </HStack>
                        </BeerCardFooter>
                      </BeerCard>
                    );
                  })}
              </HStack>
            </>
          ) : (
            <>
              <Text textColor="black.100" textStyle={"h2_bold"}>
                🔥 인기맥주 TOP10 🔥
              </Text>

              <SimpleGrid columns={2} spacing={"16px"}>
                {top10Beers &&
                  top10Beers.map((item) => {
                    return (
                      <BeerCard key={item.id} mt={1} w="full">
                        <BeerCardBody w="full" h="full" position={"relative"}>
                          <Box position="relative">
                            {image_url && (
                              <Image
                                src={image_url}
                                alt={name}
                                width="175px"
                                height="175px"
                                objectFit="cover"
                              />
                            )}
                          </Box>
                        </BeerCardBody>
                        <BeerCardFooter>
                          <BeerNameText>{name}</BeerNameText>
                          <HStack>
                            <BeerNameText>{origin_country}</BeerNameText>
                            <BeerCategoryTag>
                              <BeerCategoryTagLabel>
                                {category?.name}
                              </BeerCategoryTagLabel>
                            </BeerCategoryTag>
                          </HStack>
                        </BeerCardFooter>
                      </BeerCard>
                    );
                  })}
              </SimpleGrid>
            </>
          )}
        </Box>
        <Box h="64px" />
      </Container>
    </Box>
  );
};

export default HomeTemplate;

export const mockData: BeerResponseType = {
  id: 1,
  name: "Pale Ale",
  origin_country: "USA",
  image_url: "/images/preview-beer.png",
  category: {
    id: 1,
    name: "아메리칸 에일",
  },
};
