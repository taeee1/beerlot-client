import {
  useBeerDislikeMutation,
  useBeerLikeMutation,
} from '@/../hooks/query/useBeerLikeMutation'
import { BeerResponseType } from '../../../../types/beer'
import { generateBeerDetailUrl } from '@/../utils/url'
import { CommonBeerImage } from '@/components/shared/CommonBeerImage/CommonBeerImage'
import { LikeButton } from '@/components/shared/LikeButton'
import {
  Box,
  Flex,
  Text,
  HStack,
  SimpleGrid,
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
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo } from 'react'
import { getFlagByCountryName } from './beer.service'

interface TopBeersListProps {
  onValidateLikedBeersList: () => void
  beersList: BeerResponseType[]
  likedBeersIdList: (number | undefined)[]
  isLoading?: boolean
}

const TopBeersList: React.FC<TopBeersListProps> = ({
  onValidateLikedBeersList,
  beersList,
  likedBeersIdList,
  isLoading,
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

  const handleClickCard = useCallback(
    (id?: number, name?: string) => {
      if (!id || !name) return
      const url = generateBeerDetailUrl(id, name)
      router.push(url)
    },
    [router]
  )

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
  const skeletonList = Array(5).fill('')

  return (
    <>
      <Text textColor='black.100' textStyle={'h2_bold'}>
        🔥 인기맥주 TOP10 🔥
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
          : beersList.map((item) => (
              <BeerCard
                key={item.id}
                mt={1}
                pos={'relative'}
                onClick={() => handleClickCard(item?.id, item.name)}
              >
                <BeerCardBody position='relative'>
                  <Box position='relative'>
                    {item.image_url && (
                      <CommonBeerImage
                        src={item.image_url}
                        alt={item.name}
                        width='124px'
                        height='128px'
                        objectFit='cover'
                      />
                    )}
                  </Box>
                  <Box position='absolute' top={0} right={0}>
                    <LikeButton
                      isLiked={likedBeersIdList?.includes(item.id) ?? false}
                      onClick={(e) => handleClickLike(e, item?.id)}
                      h={7}
                      aria-label='like button'
                    />
                  </Box>
                </BeerCardBody>
                <BeerCardFooter>
                  <BeerNameText>{item.name}</BeerNameText>
                  <Flex>
                    <BeerCountryText country={item.origin_country} />
                    <BeerCategoryTag>
                      <BeerCategoryTagLabel>
                        {item.category?.name}
                      </BeerCategoryTagLabel>
                    </BeerCategoryTag>
                  </Flex>
                </BeerCardFooter>
              </BeerCard>
            ))}
      </HStack>
    </>
  )
}

export default TopBeersList
