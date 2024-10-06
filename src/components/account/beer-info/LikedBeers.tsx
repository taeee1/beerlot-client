import {
  useBeerDislikeMutation,
  useBeerLikeMutation,
} from '@/../hooks/query/useBeerLikeMutation'
import { useUserLikedBeersQuery } from '@/../hooks/query/useUserQuery'
import { BeerResponseType } from '../../../../types/beer'
import { generateBeerDetailUrl } from '@/../utils/url'
import { CommonBeerImage } from '@/components/shared/CommonBeerImage/CommonBeerImage'
import { LikeButton } from '@/components/shared/LikeButton'
import { Box, HStack, SimpleGrid } from '@chakra-ui/react'
import {
  BeerCard,
  BeerCardBody,
  BeerCardFooter,
  BeerCategoryTag,
  BeerCategoryTagLabel,
  BeerCountryText,
  BeerNameText,
} from '@components/shared/Card/BeerCardItem'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo } from 'react'

const LikedBeers = () => {
  const accessToken = Cookies.get('beerlot-oauth-auth-request') ?? ''
  const userBeersQuery = useUserLikedBeersQuery(accessToken)
  const router = useRouter()
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

  const checkIsLiked = (id?: number) => {
    if (id === undefined) return false
    return likedBeerIds?.includes(id) ?? false
  }

  useEffect(() => {
    userBeersQuery?.refetch()
  }, [])

  const handleClickCard = useCallback(
    (id?: number, name?: string) => {
      if (!id || !name) return //TODO: add toast

      const url = generateBeerDetailUrl(id, name)
      router.push(url)
    },
    [router]
  )

  const handleClickLike = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id?: number) => {
      e.stopPropagation()
      if (id === undefined) return

      const isLiked = likedBeerIds?.includes(id)
      if (!isLiked) {
        likeBeerMutation.mutate(id)
      } else {
        dislikeBeerMutation.mutate(id)
      }
    },
    [accessToken, dislikeBeerMutation, likeBeerMutation, likedBeerIds]
  )

  return (
    <SimpleGrid columns={2} spacing={'16px'}>
      {userBeersQuery.data?.pages.flatMap((page) =>
        page.contents?.map((item: BeerResponseType) => (
          <BeerCard
            key={item.id}
            mt={1}
            w='full'
            onClick={() => handleClickCard(item?.id, item.name)}
          >
            <BeerCardBody w='full' h='full' position={'relative'}>
              <Box position='relative'>
                {item.image_url && (
                  <CommonBeerImage
                    src={item.image_url}
                    alt={item.name}
                    width='full'
                    height='full'
                    objectFit='cover'
                  />
                )}
              </Box>
              <Box position='absolute' top={0} right={0}>
                <LikeButton
                  isLiked={checkIsLiked(item?.id)}
                  onClick={(e) => handleClickLike(e, item.id)}
                  h={7}
                  aria-label='like button'
                />
              </Box>
            </BeerCardBody>
            <BeerCardFooter>
              <BeerNameText>{item.name}</BeerNameText>
              <HStack>
                <BeerCountryText country={item.origin_country} />
                <BeerCategoryTag>
                  <BeerCategoryTagLabel>
                    {item.category?.name}
                  </BeerCategoryTagLabel>
                </BeerCategoryTag>
              </HStack>
            </BeerCardFooter>
          </BeerCard>
        ))
      )}
    </SimpleGrid>
  )
}

export { LikedBeers }
