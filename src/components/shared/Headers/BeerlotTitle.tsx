import { IconButton } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { BeerlotLogoDefault } from '../../../../public/svg'

export const BeerlotTitle = () => {
  const router = useRouter()
  const handleClick = () => {
    router.push(`/`)
  }

  return (
    <IconButton
      px={'0px'}
      borderRadius={'0px'}
      bg='initial'
      _hover={{}}
      _active={{}}
      cursor='pointer'
      w='94px'
      h='20px'
      as={BeerlotLogoDefault}
      aria-label='beerlot-logo'
      onClick={handleClick}
    />
  )
}
