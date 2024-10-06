import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import BackButton from '../BackButton'
import { BeerlotTitle } from './BeerlotTitle'

export const LeftBackTitle = ({ ...props }) => {
  return (
    <Flex
      {...props}
      position='absolute'
      top='0px'
      right='0px'
      left='0px'
      py='16px'
      px='20px'
      justifyContent='space-between'
      alignItems='center'
      dropShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
      zIndex={100}
      bg={'white'}
    >
      <BackButton />
      <BeerlotTitle />
      <Box w='12px' />
    </Flex>
  )
}
