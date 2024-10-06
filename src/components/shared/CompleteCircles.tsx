import { Circle, Flex } from '@chakra-ui/react'
import React from 'react'

interface CompleteCirclesProps {
  isFirstStep: boolean
  isSecondStep: boolean
}

export const CompleteCircles: React.FC<CompleteCirclesProps> = ({
  isFirstStep,
  isSecondStep,
}) => {
  return (
    <Flex justifyContent='center' w='100%' gap='10px'>
      <Circle size='8px' bg={isFirstStep ? 'orange.200' : 'gray.200'} />
      <Circle size='8px' bg={isSecondStep ? 'orange.200' : 'gray.200'} />
    </Flex>
  )
}
