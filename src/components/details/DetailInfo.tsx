import { roundToDecimal } from '@/../utils/number'
import { Box, Center, HStack, Text, VStack, useToast } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import {
  useBeerDislikeMutation,
  useBeerLikeMutation,
} from '../../../hooks/query/useBeerLikeMutation'
import { useUserLikedBeersQuery } from '../../../hooks/query/useUserQuery'
import { CommonBeerImage } from '../shared/CommonBeerImage/CommonBeerImage'
import { LeftBackBeerNameRightHeart } from '../shared/Headers/LeftBackBeerNameRightHeart'
import { LeftBackTitle } from '../shared/Headers/LeftBackTitle'
import { LikeButton } from '../shared/LikeButton'
import { Rating } from '../shared/Rating'
import { useRouter } from 'next/router'

interface DetailInfoProps {
  beerName: string
  volume: number
  category: string
  country: string
  beerImg: string
  beerId: number
  rate: number
}

export const DetailInfo: React.FC<DetailInfoProps> = ({
  beerName,
  volume,
  category,
  country,
  beerImg,
  beerId,
  rate,
}) => {
  const [didPassStar, setDidPassStar] = useState(false)
  const rateToUse = roundToDecimal(rate)
  const toastId = 'test-toast'
  const accessToken = Cookies.get('beerlot-oauth-auth-request') ?? ''
  const userBeersQuery = useUserLikedBeersQuery(accessToken)
  const router = useRouter()

  useEffect(() => {
    userBeersQuery.refetch()
  }, [])

  const likedBeerIds =
    userBeersQuery.data?.pages.flatMap((page) =>
      page.contents
        ?.map((beer) => beer.id)
        .filter((id): id is number => id !== undefined)
    ) ?? []

  const isLikedBeer = likedBeerIds?.includes(beerId)

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

  const toastTitle = isLikedBeer
    ? '좋아요한 맥주에서 삭제했어요!'
    : '좋아요한 맥주에 추가했어요!'

  const toast = useToast({
    position: 'bottom',
    title: toastTitle,
    id: toastId,
    isClosable: true,
    duration: 3000,
    containerStyle: {
      margin: '8px',
    },
    render: () => (
      <Box
        mx='12px'
        py='8px'
        color='white'
        bg='blue.500'
        backgroundColor='black.200'
        borderRadius='5px'
      >
        <Text textStyle={'h3'} textColor='white' textAlign={'center'}>
          {toastTitle}
        </Text>
      </Box>
    ),
  })

  const handleClickLike = () => {
    if (!accessToken) {
      router.push('/login')
      return
    }
    toast()
    if (!isLikedBeer) {
      likeBeerMutation.mutate(beerId)
    } else {
      dislikeBeerMutation.mutate(beerId)
    }
  }

  return (
    <>
      {/* title */}
      {didPassStar ? (
        <LeftBackBeerNameRightHeart beerName={beerName} />
      ) : (
        <LeftBackTitle />
      )}
      {/* image  */}
      <Center pt='72px' w='full' px='24px'>
        <CommonBeerImage
          boxSize='320px'
          src={beerImg}
          alt={`${beerName} image`}
          borderRadius='6px'
        />
      </Center>

      <VStack px='24px' py='20px' w='full' alignItems='flex-start' gap='20px'>
        {/* panel */}
        <HStack w='full' justifyContent='space-between'>
          <Text textStyle='h1'>{beerName}</Text>
          <HStack gap='20px'>
            <LikeButton
              isLiked={isLikedBeer}
              onClick={handleClickLike}
              w='40px'
              h='40px'
              fontSize={'28px'}
              cursor='pointer'
              aria-label='like button'
            />
          </HStack>
        </HStack>
        {/* description */}
        <HStack>
          <Text textStyle='h2'>
            {volume} | {category} | {country}
          </Text>
        </HStack>
        <Center w='full'>
          <Rating
            _rate={rateToUse}
            starSize={40}
            styleProps={{
              gap: '20px',
            }}
          />
        </Center>
      </VStack>
    </>
  )
}
