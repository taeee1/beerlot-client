import { Box, Button, Flex, FlexProps, Text } from '@chakra-ui/react'
import React from 'react'
import BackButton from '../BackButton'
import { BeerlotTitle } from './BeerlotTitle'

interface LeftBackRandomProps extends FlexProps {
  title?: string
  onClick: () => void
}

export const LeftBackRandom: React.FC<LeftBackRandomProps> = ({
  title,
  onClick,
  ...props
}) => {
  return (
    <Flex
      bg='white'
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
      {...props}
    >
      <BackButton onClick={onClick} />
      {title ? <Text textStyle='h2_bold'>{title}</Text> : <BeerlotTitle />}
      <Box w='40px' />
    </Flex>
  )
}
