import {
  singleBeerFetchKey,
  useRecommendedBeersQuery,
  useTopBeersQuery,
} from "@/../hooks/query/useBeerQuery";
import { Box, Container } from "@chakra-ui/react";
import { useEffect } from "react";
import { BlankHeader } from "../shared/Headers/BlankHeader";
import { CommonBeersList } from "./CommonBeersList/CommonBeersList";
import { LoggedInBeersList } from "./LoggedInBeersList/LoggedInBeersList";
import SearchInputHome from "./SearchInputHome";
import { WelcomeTextContent } from "./WelcomeText";
import { BeerResponseType } from "@/../typedef/server/beer";
import Cookies from "js-cookie";
import { useQueries } from "react-query";
import { fetchSingleBeerInfoApi } from "@/api/beers/api";
import { LANGUAGE_TYPE } from "../../../interface/types";

interface HomeTemplateProps {
  username?: string;
}
const HomeTemplate: React.FC<HomeTemplateProps> = ({ username }) => {
  const accessToken = Cookies.get("beerlot-oauth-auth-request") ?? "";

  const topBeersQuery = useTopBeersQuery({});
  const { data: recommendBeers } = useRecommendedBeersQuery(accessToken);

  // Ensure recommendBeers.id exists and fallback to empty array if not
  const recommendedBeersId =
    recommendBeers?.id && recommendBeers.id.length > 0
      ? recommendBeers.id
      : [1, 2];

  // Fetch data for each beer ID
  const recommendedBeersData = useQueries(
    recommendedBeersId.map((beerId) => ({
      queryKey: singleBeerFetchKey(beerId),
      queryFn: () =>
        fetchSingleBeerInfoApi({
          id: beerId,
          language: LANGUAGE_TYPE.KR,
        }),
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: !!beerId,
    }))
  ).map((query, index) => {
    return { id: recommendedBeersId[index], ...query.data };
  });

  useEffect(() => {
    topBeersQuery.refetch();
  }, []);

  return (
    <Box w="full" h="calc(100vh - 57px)" bg="gray.100" overflowY="scroll">
      <Container p={"0px"} bg="white" maxW="450px" minH={"100vh"}>
        <Box p="64px 24px 24px" pt="64px">
          <BlankHeader />

          <WelcomeTextContent username={username} />

          <Box py={"34px"}>
            <SearchInputHome />
          </Box>

          {username ? (
            <LoggedInBeersList
              userName={username}
              topBeersList={topBeersQuery.data}
              recommendedBeerList={recommendedBeersData}
            />
          ) : (
            <CommonBeersList
              beersList={topBeersQuery.data}
              loading={topBeersQuery.isFetching || topBeersQuery.isLoading}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default HomeTemplate;
