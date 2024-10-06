import { Flex } from '@chakra-ui/react'
import React from 'react'
import { AlertBellPath } from '../CustomIcons/customPath'

export const RightBellHeader = () => {
  return (
    <Flex
      position='absolute'
      top='0px'
      right='0px'
      left='0px'
      pt='30px'
      pb='30px'
      px='20px'
      justifyContent='flex-end'
      dropShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
    >
      {AlertBellPath()}
    </Flex>
  )
}
