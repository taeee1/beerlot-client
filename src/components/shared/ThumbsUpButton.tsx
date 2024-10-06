import { Button, ButtonProps, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ThumbsUpIcon } from './CustomIcons/customIcons'

interface ThumbsUpButtonProps extends ButtonProps {
  thumbsUpNumber: number
  isLiked?: boolean
}

export const ThumbsUpButton: React.FC<ThumbsUpButtonProps> = ({
  thumbsUpNumber,
  isLiked = false,
  onClick,
  ...props
}) => {
  const [localLiked, setLocalLiked] = useState(isLiked)
  const [localNumber, setLocalNumber] = useState(thumbsUpNumber)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setLocalLiked(!localLiked)
    onClick?.(e)
    if (localLiked) {
      setLocalNumber(Math.max(localNumber - 1, 0))
    } else {
      setLocalNumber(localNumber + 1)
    }
  }

  const number = localLiked ? thumbsUpNumber + 1 : thumbsUpNumber

  return (
    <Button
      py={1}
      px={2}
      bg={'white'}
      border={localLiked ? '1px solid orange' : '1px solid gray'}
      borderRadius='30px'
      minW={'initial'}
      h={'fit-content'}
      color={localLiked ? 'orange.200' : 'black.100'}
      gap={1}
      _hover={{}}
      _focus={{}}
      onClick={handleClick}
      {...props}
    >
      <ThumbsUpIcon
        boxSize={'16px'}
        color={localLiked ? 'orange.200' : 'black.100'}
        mr={0}
      />
      <Text textStyle={'h3'}>{localNumber}</Text>
    </Button>
  )
}
