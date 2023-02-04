import {Box, Container} from "@chakra-ui/react";
import {useRecoilState} from "recoil";
import {BlankHeader} from "../../common/headers/BlankHeader";
import {POPULAR_BEER_TITLE} from "../../interface/static";
import CarouselCardList from "../card/CardList/CarouselCardList";
import {userInfoState} from "../store/atom";
import {PopularBeers} from "./PopularBeers";

import SearchInputHome from "./SearchInputHome";
import WelcomeText from "./WelcomeText";

const HomeTemplate = () => {
  const [userInfo] = useRecoilState(userInfoState);

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
            <PopularBeers />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default HomeTemplate;
