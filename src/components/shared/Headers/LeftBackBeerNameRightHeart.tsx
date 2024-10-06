import { Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import BackButton from '../BackButton'
import { LikeButton } from '../LikeButton'

interface LeftBackBeerNameRightHeartProps {
  beerName: string
}

export const LeftBackBeerNameRightHeart: React.FC<
  LeftBackBeerNameRightHeartProps
> = ({ beerName }) => {
  const [isClicked, setIsClicked] = useState(false) // get 함수 대체되야 함.
  const handleClick = () => {
    setIsClicked(!isClicked)
  }

  return (
    <Flex
      position='absolute'
      top='0px'
      right='0px'
      left='0px'
      pt='30px'
      pb='30px'
      px='35px'
      justifyContent='space-between'
      alignItems='center'
      dropShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
    >
      <BackButton />
      <Text
        h='100%'
        textStyle='h2_bold'
        textShadow=' 0px 8px 20px rgba(0, 0, 0, 0.4)'
      >
        {beerName}
      </Text>
      <LikeButton
        onClick={handleClick}
        isLiked={isClicked}
        w='27px'
        h='29px'
        filter={
          isClicked ? 'none' : 'drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5))'
        }
        color={isClicked ? 'orange.300' : '#ffffff'}
        aria-label='like button'
      />
    </Flex>
  )
}
