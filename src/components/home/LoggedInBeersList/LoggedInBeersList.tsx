import React, { useEffect } from 'react'
import {
  BeerResponseType,
  SingelBeerFetchResponseType,
} from '../../../../types/beer'
import RecommendedBeersList from './RecommendedBeersList'
import TopBeersList from './TopBeersList'
import Cookies from 'js-cookie'
import { useUserLikedBeersQuery } from '@/../hooks/query/useUserQuery'
import { Center } from '@chakra-ui/react'
import { BeerlotLoading } from '@/components/shared/Loading'

interface LoggedInBeersListProps {
  topBeersList?: BeerResponseType[]
  topBeersLoading: boolean
  recommendedBeerListLoading: boolean
  recommendedBeerList?: (SingelBeerFetchResponseType | undefined)[]
  userName?: string
}
const LoggedInBeersList: React.FC<LoggedInBeersListProps> = ({
  topBeersList,
  recommendedBeerList,
  userName,
  recommendedBeerListLoading,
  topBeersLoading,
}) => {
  const accessToken = Cookies.get('beerlot-oauth-auth-request') ?? ''
  const userBeersQuery = useUserLikedBeersQuery(accessToken)
  const likedBeerIds =
    userBeersQuery.data?.pages.flatMap((page) =>
      page.contents
        ?.map((beer) => beer.id)
        .filter((id): id is number => id !== undefined)
    ) ?? []

  useEffect(() => {
    userBeersQuery.refetch()
  }, [])

  const handleValidateLikedBeersList = () => {
    userBeersQuery.refetch()
  }

  if (
    userBeersQuery.isLoading ||
    topBeersList === undefined ||
    recommendedBeerList === undefined
  )
    return (
      <Center w={'full'} py={'40%'}>
        <BeerlotLoading />
      </Center>
    )

  return (
    <>
      {topBeersList && (
        <TopBeersList
          beersList={topBeersList}
          isLoading={topBeersLoading}
          likedBeersIdList={likedBeerIds}
          onValidateLikedBeersList={handleValidateLikedBeersList}
        />
      )}
      {userName && recommendedBeerList && recommendedBeerList.length > 0 && (
        <RecommendedBeersList
          username={userName}
          beersList={recommendedBeerList}
          isLoading={recommendedBeerListLoading}
          likedBeersIdList={likedBeerIds}
          onValidateLikedBeersList={handleValidateLikedBeersList}
        />
      )}
    </>
  )
}

export { LoggedInBeersList }
