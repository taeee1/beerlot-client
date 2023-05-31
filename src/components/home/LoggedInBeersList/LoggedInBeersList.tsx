import React, { useEffect } from "react";
import { BeerResponseType } from "../../../../typedef/server/beer";
import RecommendedBeersList from "./RecommendedBeersList";
import TopBeersList from "./TopBeersList";
import Cookies from "js-cookie";
import { useUserBeersQuery } from "@/../hooks/query/useUserQuery";

interface LoggedInBeersListProps {
  topBeersList?: BeerResponseType[];
  userName?: string;
}
const LoggedInBeersList: React.FC<LoggedInBeersListProps> = ({
  topBeersList,
  userName,
}) => {
  const accessToken = Cookies.get("beerlot-oauth-auth-request") ?? "";
  const userBeersQuery = useUserBeersQuery(accessToken);

  useEffect(() => {
    userBeersQuery.refetch();
  }, []);

  const handleValidateLikedBeersList = () => {
    userBeersQuery.refetch();
    console.log("handleValidateLikedBeersList");
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
      {userName && topBeersList && (
        <RecommendedBeersList
          username={userName}
          beersList={topBeersList}
          likedBeersList={userBeersQuery?.data?.contents}
          onValidateLikedBeersList={handleValidateLikedBeersList}
        />
      )}
    </>
  );
};

export { LoggedInBeersList };
