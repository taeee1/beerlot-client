import {
  BeerResponseType,
  SingelBeerFetchResponseType,
} from '../../../../types/beer'
import React, { useCallback, useEffect, useMemo } from 'react'
import { CommonBeerImage } from '@/components/shared/CommonBeerImage/CommonBeerImage'
import {
  Box,
  HStack,
  Text,
  Flex,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react'
import {
  BeerCard,
  BeerCardBody,
  BeerCardFooter,
  BeerCategoryTag,
  BeerCategoryTagLabel,
  BeerCountryText,
  BeerNameText,
} from '@components/shared/Card/BeerCardItem'
import { LikeButton } from '@/components/shared/LikeButton'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import {
  useBeerDislikeMutation,
  useBeerLikeMutation,
} from '@/../hooks/query/useBeerLikeMutation'
import { generateBeerDetailUrl } from '@/../utils/url'

interface RecommendedBeersListProps {
  beersList: (SingelBeerFetchResponseType | undefined)[]
  likedBeersIdList: (number | undefined)[]
  username: string
  isLoading?: boolean
  onValidateLikedBeersList: () => void
}

const RecommendedBeersList: React.FC<RecommendedBeersListProps> = ({
  onValidateLikedBeersList,
  beersList,
  likedBeersIdList,
  isLoading,
  username,
}) => {
  const router = useRouter()
  const accessToken = Cookies.get('beerlot-oauth-auth-request') ?? ''

  const likeBeerMutation = useBeerLikeMutation(accessToken, {
    onSuccess: () => {
      onValidateLikedBeersList()
    },
  })

  const dislikeBeerMutation = useBeerDislikeMutation(accessToken, {
    onSuccess: () => {
      onValidateLikedBeersList()
    },
  })

  const handleClickLike = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id?: number) => {
      e.stopPropagation()
      if (id === undefined) return

      const isLiked = likedBeersIdList?.includes(id)

      if (!isLiked) {
        likeBeerMutation.mutate(id)
      } else {
        dislikeBeerMutation.mutate(id)
      }
    },
    [accessToken, dislikeBeerMutation, likeBeerMutation, likedBeersIdList]
  )

  const handleClickCard = useCallback(
    (id?: number, name?: string) => {
      if (!id || !name) return
      const url = generateBeerDetailUrl(id, name)
      router.push(url)
    },
    [router]
  )

  const skeletonList = Array(5).fill('')
  return (
    <Box pt={4}>
      <Text textColor='black.100' textStyle={'h2_bold'}>
        {`🍻 `}
        <Box as='span' color='orange.200'>
          {username}
        </Box>
        {`님께 추천해요 🍻`}
      </Text>
      <HStack
        overflowY={'auto'}
        w='full'
        gap={'12px'}
        className={'hide-scrollbar'}
      >
        {isLoading
          ? skeletonList.map((_, index) => (
              <BeerCard key={index} mt={1} pos={'relative'}>
                <BeerCardBody position='relative'>
                  <Box position='relative'>
                    <Skeleton width='124px' height='128px' />
                  </Box>
                </BeerCardBody>
                <BeerCardFooter>
                  <SkeletonText noOfLines={1} skeletonHeight={'17px'} />
                  <Skeleton mt={'2px'}>
                    <HStack>
                      <BeerCountryText country='' />
                      <BeerCategoryTag>
                        <BeerCategoryTagLabel />
                      </BeerCategoryTag>
                    </HStack>
                  </Skeleton>
                </BeerCardFooter>
              </BeerCard>
            ))
          : beersList.map((beer) => (
              <BeerCard
                key={beer?.id}
                mt={1}
                pos={'relative'}
                onClick={() => handleClickCard(beer?.id, beer?.name)}
              >
                <BeerCardBody position='relative'>
                  <Box position='relative'>
                    {beer?.image_url && (
                      <CommonBeerImage
                        src={beer.image_url}
                        alt={beer.name}
                        width='124px'
                        height='128px'
                        objectFit='cover'
                      />
                    )}
                  </Box>
                  <Box position='absolute' top={0} right={0}>
                    <LikeButton
                      isLiked={likedBeersIdList?.includes(beer?.id) ?? false}
                      onClick={(e) => handleClickLike(e, beer?.id)}
                      h={7}
                      aria-label='like button'
                    />
                  </Box>
                </BeerCardBody>
                <BeerCardFooter>
                  <BeerNameText>{beer?.name}</BeerNameText>
                  <Flex>
                    <BeerCountryText country={beer?.origin_country} />
                    <BeerCategoryTag>
                      <BeerCategoryTagLabel>
                        {beer?.category?.name}
                      </BeerCategoryTagLabel>
                    </BeerCategoryTag>
                  </Flex>
                </BeerCardFooter>
              </BeerCard>
            ))}
      </HStack>
    </Box>
  )
}

export default RecommendedBeersList
