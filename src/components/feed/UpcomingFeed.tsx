import { Box, Text, VStack } from '@chakra-ui/react'
import React from 'react'

export const UpcomingFeed = () => {
  return (
    <VStack w='full' h='full' gap='10px' pt='48px'>
      <Text textAlign={'center'} textColor={'black.100'} textStyle='h2_bold'>
        아직 준비 중인 기능이에요 🛠
      </Text>
      <Text
        textAlign={'center'}
        textColor={'gray.300'}
        textStyle='h3'
        inlineSize={'250px'}
      >
        버전 2에서 사용하실 수 있도록 준비 중이니,조금만 기다려주세요! 🙏
      </Text>
    </VStack>
  )
}
