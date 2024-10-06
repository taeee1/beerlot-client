import { HStack, Image } from '@chakra-ui/react'
import React from 'react'

const animationKeyframes = {
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-30px)' },
  },
}

export const BeerlotLoading = () => {
  return (
    <HStack
      gap={8}
      w={'full'}
      h={'full'}
      justifyContent={'center'}
      alignItems={'center'}
      __css={animationKeyframes}
    >
      <HStack gap={1}>
        <Image
          src={'/images/b_can.png'}
          alt={'b'}
          style={{
            animation: `float 1s 0s`,
          }}
        />
        <Image
          src={'/images/e_can.png'}
          alt={'e'}
          style={{
            animation: `float 1s 0.5s`,
          }}
        />
        <Image
          src={'/images/e2_can.png'}
          alt={'e'}
          style={{
            animation: `float 1s 1s`,
          }}
        />
        <Image
          src={'/images/r_can.png'}
          alt={'r'}
          style={{
            animation: `float 1s 1.5s`,
          }}
        />
      </HStack>
      <HStack gap={2}>
        <Image
          src={'/images/l_can.png'}
          alt={'l'}
          style={{
            animation: `float 1s 2s`,
          }}
        />
        <Image
          src={'/images/o_can.png'}
          alt={'o'}
          style={{
            animation: `float 1s 2.5s`,
          }}
        />
        <Image
          src={'/images/t_can.png'}
          alt={'t'}
          style={{
            animation: `float 1s 3s`,
          }}
        />
      </HStack>
    </HStack>
  )
}
