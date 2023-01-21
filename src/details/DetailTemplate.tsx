import {Box, Container, VStack} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {DetailInfo} from "./DetailInfo";
import {DetailTabList} from "./DetailTabList";

export const DetailTemplate = () => {
  const router = useRouter();
  const beerName = router.query.query; // mock data
  const volume = 4.4; // mock data
  const category = "라거"; // mock data
  const country = "미국"; // mock data
  const MOCK_IMAGE_SRC = "https://picsum.photos/seed/picsum/200/300"; // mock data

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
        <VStack w="full" pb="56px">
          {typeof beerName === "string" && (
            <DetailInfo
              beerName={beerName}
              volume={volume}
              category={category}
              country={country}
              beerImg={MOCK_IMAGE_SRC}
              beerId={0}
            />
          )}

          <DetailTabList />
        </VStack>
      </Container>
    </Box>
  );
};
