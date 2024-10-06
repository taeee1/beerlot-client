import { Button, ButtonProps, Text } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface FilterTagProps extends ButtonProps {
  tagText: string
  children?: ReactNode
}

const FilterTag: React.FC<FilterTagProps> = ({
  tagText,
  children,
  ...props
}) => {
  return (
    <Button
      borderRadius={15}
      pl={2}
      pr={0}
      py={'1.5px'}
      h='full'
      alignItems={'center'}
      justifyContent={'center'}
      bg={'yellow.300'}
      {...props}
    >
      <Text textStyle={'h4'} textColor='black.100'>
        {tagText}
      </Text>
      {children}
    </Button>
  )
}

export default FilterTag
