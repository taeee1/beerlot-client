import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { X } from '../../../../public/svg'
import { BeerlotTitle } from './BeerlotTitle'

interface LeftCloseRandomProps {
  title?: string
  onClose: () => void
}

export const LeftCloseRandom: React.FC<LeftCloseRandomProps> = ({
  title,
  onClose,
}) => {
  return (
    <Flex
      position='absolute'
      top='0px'
      right='0px'
      left='0px'
      pt='11px'
      px='12px'
      justifyContent='space-between'
      alignItems='center'
      dropShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
      borderBottom='0.5px solid'
      borderBottomColor='gray.200'
    >
      <Button onClick={onClose} p='0px !important' bg='trans'>
        <X />
      </Button>

      {title ? <Text textStyle='h2_bold'>{title}</Text> : <BeerlotTitle />}
      <Box w='40px' />
    </Flex>
  )
}
