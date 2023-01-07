import {Box, Container, Text} from "@chakra-ui/react";
import {useQuery} from "react-query";
import {useRecoilState} from "recoil";
import {BlankHeader} from "../../common/headers/BlankHeader";
import {POPULAR_BEER_TITLE} from "../../interface/static";
import {BeerResultType, ErrorResponse} from "../../interface/types";
import {getTop10BeersApi} from "../../server/api";
import CardItemChakra from "../card/CardItemChakra";
import CarouselCardList from "../card/CardList/CarouselCardList";
import {top10BeersState, userInfoState} from "../store/atom";
import SearchInputHome from "./SearchInputHome";
import WelcomeText from "./WelcomeText";

const HomeTemplate = () => {
  const [userInfo] = useRecoilState(userInfoState);
  const [top10Beers, setTop10Beers] = useRecoilState(top10BeersState);

  const popularBeers = useQuery<BeerResultType[], ErrorResponse>(
    "top10Beers",
    getTop10BeersApi,
    {
      refetchOnWindowFocus: false,
      retry: 1,
      onSuccess: (data: BeerResultType[]) => {
        setTop10Beers(data);
      },
      onError: (error: ErrorResponse) => {
        console.error(error);
        // toast 처리
      },
    }
  );
  return (
    <Box w="full" h="full" bg="gray.100">
      <Container
        p={"0px"}
        h="full"
        w="full"
        bg="white"
        position="relative"
        maxW="450px"
      >
        <Box p="64px 24px 24px" pt="64px">
          <BlankHeader />
          {/* TODO: v2 alarm feature */}
          {/* <RightBellHeader /> */}
          <WelcomeText nickname={userInfo?.username} />
          <Box py={"34px"}>
            <SearchInputHome />
          </Box>
          {userInfo ? (
            <>
              <CarouselCardList title={POPULAR_BEER_TITLE} />
              <CarouselCardList title={userInfo.username} />
            </>
          ) : (
            <>
              {/* title */}
              <Text textColor="black.100" textStyle={"h2_bold"}>
                🔥 인기맥주 TOP10 🔥
              </Text>
              {top10Beers && (
                <>
                  {top10Beers.map((item, idx) => {
                    return (
                      <CardItemChakra
                        key={idx}
                        beerId={item.id}
                        isTwoByTwo
                        borderColor={"orange.300"}
                        beerName={item.name_ko}
                        img_src={item.image_url}
                        sort={item.category.name_ko}
                        country={item.country.code}
                      />
                    );
                  })}
                </>
              )}
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default HomeTemplate;
