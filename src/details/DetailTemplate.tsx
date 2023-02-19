import {Box, Container, useStatStyles, VStack} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {getSingleBeerInfoApi, SingleBeerResultType} from "../api/beers/api";
import {DetailInfo} from "./DetailInfo";
import {DetailTabList} from "./DetailTabList";

export const DetailTemplate = () => {
  const router = useRouter();
  const [beerInfo, setBeerInfo] = useState<SingleBeerResultType | null>(null);

  useEffect(() => {
    const {id: beerId, name: beerName} = router.query;
    if (typeof beerId === "string" && typeof beerName === "string") {
      onSetBeerInfo(Number(beerId), beerName);
    }
  }, [router.query]);

  const onSetBeerInfo = async (beerId: number, beerName: string) => {
    const data = await getSingleBeerInfoApi(beerId);

    if (data === undefined) return;
    const newData = {
      ...data,
      beerName,
      beerId,
    };
    setBeerInfo(newData);
  };

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
          {beerInfo && (
            <DetailInfo
              beerName={beerInfo.beerName}
              volume={beerInfo.volume}
              category={"category"}
              country={"country"}
              beerImg={"imageSrc"}
              beerId={beerInfo.beerId}
            />
          )}
          {beerInfo && (
            <DetailTabList
              id={beerInfo.beerId}
              city={beerInfo.origin_city}
              brewary={beerInfo.brewery}
              calories={0}
              suitableGlass={"suitableGlass"}
              desc={beerInfo.description}
              buyFrom={beerInfo.buy_from}
              rate={beerInfo.rate}
            />
          )}
        </VStack>
      </Container>
    </Box>
  );
};
