import { VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { DetailInfo } from "./DetailInfo";
import { DetailTabList } from "./DetailTabList";

export const DetailTemplate = () => {
  const router = useRouter();
  const beerName = router.query.query; // mock data
  const volume = 4.4; // mock data
  const category = "라거"; // mock data
  const country = "미국"; // mock data
  const MOCK_IMAGE_SRC = "https://picsum.photos/seed/picsum/200/300"; // mock data

  return (
    <VStack w="full" pb="56px">
      {typeof beerName === "string" && (
        <DetailInfo
          beerName={beerName}
          volume={volume}
          category={category}
          country={country}
          beerImg={MOCK_IMAGE_SRC}
        />
      )}

      <DetailTabList />
    </VStack>
  );
};
