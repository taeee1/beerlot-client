import { Flex } from '@chakra-ui/react'
import { BeerlotTitle } from './BeerlotTitle'

export const CenteredTitle = ({ ...props }) => {
  return (
    <Flex
      position='absolute'
      top='0px'
      right='0px'
      left='0px'
      py='16px'
      px='20px'
      justifyContent='center'
      alignItems='center'
      dropShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
      bg='white'
      zIndex={1000}
      {...props}
    >
      <BeerlotTitle />
    </Flex>
  )
}
