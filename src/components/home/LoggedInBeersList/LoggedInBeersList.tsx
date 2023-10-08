import React, { useEffect } from "react";
import {
  BeerResponseType,
  SingelBeerFetchResponseType,
} from "../../../../typedef/server/beer";
import RecommendedBeersList from "./RecommendedBeersList";
import TopBeersList from "./TopBeersList";
import Cookies from "js-cookie";
import { useUserLikedBeersQuery } from "@/../hooks/query/useUserQuery";

interface LoggedInBeersListProps {
  topBeersList?: BeerResponseType[];
  recommendedBeerList?: (SingelBeerFetchResponseType | undefined)[];
  userName?: string;
}
const LoggedInBeersList: React.FC<LoggedInBeersListProps> = ({
  topBeersList,
  recommendedBeerList,
  userName,
}) => {
  const accessToken = Cookies.get("beerlot-oauth-auth-request") ?? "";
  const userBeersQuery = useUserLikedBeersQuery(accessToken);

  useEffect(() => {
    userBeersQuery.refetch();
  }, []);

  const handleValidateLikedBeersList = () => {
    userBeersQuery.refetch();
  };

  return (
    <>
      {topBeersList && (
        <TopBeersList
          beersList={topBeersList}
          likedBeersList={userBeersQuery?.data?.contents}
          onValidateLikedBeersList={handleValidateLikedBeersList}
        />
      )}
      {userName && recommendedBeerList && (
        <RecommendedBeersList
          username={userName}
          beersList={recommendedBeerList}
          likedBeersList={userBeersQuery?.data?.contents}
          onValidateLikedBeersList={handleValidateLikedBeersList}
        />
      )}
    </>
  );
};

export { LoggedInBeersList };
