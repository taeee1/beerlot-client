import {Text} from "@chakra-ui/react";
import React from "react";
import useGetPopularBeers from "../../hooks/useGetPopularBeers";
import CardItemChakra from "../card/CardItemChakra";

export const PopularBeers = () => {
  const {top10Beers} = useGetPopularBeers();
  return (
    <>
      <Text textColor="black.100" textStyle={"h2_bold"}>
        🔥 인기맥주 TOP10 🔥
      </Text>
      {top10Beers && top10Beers.length > 0 && (
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
  );
};
