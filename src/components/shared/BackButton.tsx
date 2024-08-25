import { Button } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import React from 'react'

interface BackButtonProps {
  onClick?: () => void
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  const router = useRouter()
  const handleClick = () => {
    router.back()
    onClick?.()
  }

  return (
    <Button
      onClick={handleClick}
      leftIcon={<ChevronLeftIcon />}
      w={'40px'}
      fontSize={'20px'}
      bg={'initial'}
      _hover={{}}
    />
  )
}

export default BackButton
