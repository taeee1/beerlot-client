import {Box, Container} from "@chakra-ui/react";
import {useEffect} from "react";
import {SignUpType} from "../../../interface/types";
import {BeerResponseType} from "../../../typedef/server/beer";
import {BlankHeader} from "../shared/Headers/BlankHeader";
import {CommonBeersList} from "./CommonBeersList/CommonBeersList";
import {LoggedInBeersList} from "./LoggedInBeersList/LoggedInBeersList";
import SearchInputHome from "./SearchInputHome";
import {WelcomeTextContent} from "./WelcomeText";
import {useTopBeersQuery} from "@/../hooks/query/useBeerQuery";

interface HomeTemplateProps {
  userInfo?: SignUpType;
}
const HomeTemplate: React.FC<HomeTemplateProps> = ({userInfo}) => {
  const topBeersQuery = useTopBeersQuery({
    onSuccess: async () => {},
    onError: (error) => {
      console.error("error", error);
    },
  });

  useEffect(() => {
    topBeersQuery.refetch();
  }, []);

  return (
    <Box w="full" h="full" bg="gray.100" overflowY="scroll">
      <Container p={"0px"} bg="white" maxW="450px" h="full">
        <Box p="64px 24px 24px" pt="64px">
          <BlankHeader />
          {/* TODO: v2 alarm feature */}
          {/* <RightBellHeader /> */}

          <WelcomeTextContent username={userInfo?.username} />

          <Box py={"34px"}>
            <SearchInputHome />
          </Box>

          {userInfo ? (
            <LoggedInBeersList
              userName={userInfo?.username}
              topBeersList={topBeersQuery.data}
            />
          ) : (
            <CommonBeersList topBeersList={topBeersQuery.data} />
          )}
        </Box>
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
