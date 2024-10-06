import { EmptyFilteredResult } from '@/components/result/EmptyFilteredResult'
import { CommonBeerImage } from '@/components/shared/CommonBeerImage/CommonBeerImage'
import { Box, Center, HStack, SimpleGrid } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import {
  BeerCard,
  BeerCardBody,
  BeerCardFooter,
  BeerCategoryTag,
  BeerCategoryTagLabel,
  BeerCountryText,
  BeerNameText,
} from '../shared/Card/BeerCardItem'
import { BeerResponseType } from '../../../types/beer'
import { generateBeerDetailUrl } from '../../../utils/url'
import { BeerlotLoading } from '../shared/Loading'
import { LikeButton } from '../shared/LikeButton'
import Cookies from 'js-cookie'
import { useUserLikedBeersQuery } from '../../../hooks/query/useUserQuery'
import {
  useBeerDislikeMutation,
  useBeerLikeMutation,
} from '../../../hooks/query/useBeerLikeMutation'

interface SearchResultProps {
  loading: boolean
  beers?: BeerResponseType[]
}

export const SearchResult: React.FC<SearchResultProps> = ({
  loading,
  beers,
}) => {
  const router = useRouter()

  const handleClickCard = (id: number, name: string) => {
    const url = generateBeerDetailUrl(id, name)
    router.push(url)
  }

  const accessToken = Cookies.get('beerlot-oauth-auth-request') ?? ''

  const userBeersQuery = useUserLikedBeersQuery(accessToken, undefined, {
    enabled: !!accessToken,
  })

  const likedBeerIds =
    userBeersQuery.data?.pages.flatMap((page) =>
      page.contents
        ?.map((beer) => beer.id)
        .filter((id): id is number => id !== undefined)
    ) ?? []

  const likeBeerMutation = useBeerLikeMutation(accessToken, {
    onSuccess: () => {
      userBeersQuery.refetch()
    },
  })

  const dislikeBeerMutation = useBeerDislikeMutation(accessToken, {
    onSuccess: () => {
      userBeersQuery.refetch()
    },
  })

  const handleClickLike = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    e.stopPropagation()
    if (!accessToken) {
      router.push('/login')
      return
    }
    const isLikedBeer = likedBeerIds?.includes(id) ?? false
    if (!isLikedBeer) {
      likeBeerMutation.mutate(id)
    } else {
      dislikeBeerMutation.mutate(id)
    }
  }
  if (loading || (accessToken && !likedBeerIds))
    return (
      <Center py={48}>
        <BeerlotLoading />
      </Center>
    )

  if (beers && beers.length === 0) return <EmptyFilteredResult />

  return (
    <SimpleGrid columns={2} spacing={'16px'} mt={'8px'}>
      {beers?.map((beerItems) => {
        const {
          id = 0,
          name = '',
          origin_country,
          image_url,
          category,
        } = beerItems
        return (
          <BeerCard
            key={beerItems.id}
            mt={1}
            w='full'
            onClick={() => handleClickCard(id, name)}
          >
            <BeerCardBody w='full' h='full' position={'relative'}>
              <Box position='relative'>
                {image_url && (
                  <CommonBeerImage
                    src={image_url}
                    alt={name}
                    width='175px'
                    height='175px'
                    objectFit='cover'
                  />
                )}
              </Box>
              <Box position='absolute' top={0} right={0}>
                <LikeButton
                  isLiked={
                    accessToken ? (likedBeerIds?.includes(id) ?? false) : false
                  }
                  onClick={(e) => handleClickLike(e, id)}
                  w={8}
                  h={7}
                  aria-label='like button'
                />
              </Box>
            </BeerCardBody>
            <BeerCardFooter>
              <BeerNameText>{name}</BeerNameText>
              <HStack>
                <BeerCountryText country={origin_country} />
                <BeerCategoryTag>
                  <BeerCategoryTagLabel>{category?.name}</BeerCategoryTagLabel>
                </BeerCategoryTag>
              </HStack>
            </BeerCardFooter>
          </BeerCard>
        )
      })}
    </SimpleGrid>
  )
}
