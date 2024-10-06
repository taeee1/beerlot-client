import {
  Button,
  HStack,
  IconButton,
  Link,
  StackProps,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { RightArrow } from '../../shared/CustomIcons/customIcons'

interface SectionButtonProps extends StackProps {
  title: string
  href?: string
  isExternal?: boolean
  children?: React.ReactNode
}

export const SectionButton: React.FC<SectionButtonProps> = ({
  title,
  href,
  isExternal,
  children,
  ...props
}) => {
  return (
    <HStack
      w='full'
      h={'fit-content'}
      py='8px'
      pl='30px'
      pr='20px'
      justify={'space-between'}
      bg='white'
      href={href}
      border='1px solid'
      borderLeft={'none'}
      borderTop={'none'}
      borderRight={'none'}
      borderColor={'gray.200'}
      passHref
      textDecoration='none'
      _visited={{ textDecoration: 'none' }}
      _hover={{ textDecoration: 'none' }}
      _first={{
        borderTop: '1px solid',
        borderTopColor: 'gray.200',
      }}
      borderRadius={0}
      as={href ? Link : Button}
      isExternal={isExternal}
      {...props}
    >
      <Text textStyle={'h3'} textColor='black.100'>
        {title}
      </Text>
      {children}
      {href && (
        <IconButton
          bg='transparent'
          icon={<RightArrow />}
          aria-label='right-arrow'
          _hover={{}}
          size={'xs'}
          fontSize='20px'
          p={0}
          style={{
            marginInlineStart: 0,
          }}
        />
      )}
    </HStack>
  )
}
