import { HStack, Link, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {
  NavAccountsPath,
  NavFeedPath,
  NavHomePath,
  NavSearchPath,
} from './CustomIcons/customPath'

export const BottomNav = () => {
  const router = useRouter()
  const navMenu = [
    { title: 'home', displayName: '홈', icon: NavHomePath, url: '/' },
    {
      title: 'search',
      displayName: '검색',
      icon: NavSearchPath,
      url: '/result',
    },
    { title: 'feed', displayName: '피드', icon: NavFeedPath, url: '/feed' },
    {
      title: 'account',
      displayName: '마이',
      icon: NavAccountsPath,
      url: '/login',
    },
  ]

  return (
    <HStack
      w='full'
      py='10px'
      px='42px'
      pos='fixed'
      bg='white.100'
      borderTop='0.3px solid'
      borderTopColor='gray.300'
      bottom='0px'
    >
      {navMenu.map((item) => {
        const { title, displayName, icon, url } = item
        const curColor = router.pathname === url ? 'orange.300' : 'gray.300'
        return (
          <VStack
            cursor={'pointer'}
            key={title}
            flexGrow={1}
            gap='1px'
            href={item.url}
            as={Link}
            _hover={{
              textDecoration: 'none',
            }}
          >
            {icon(curColor)}
            <Text textStyle='h4' color={curColor}>
              {displayName}
            </Text>
          </VStack>
        )
      })}
    </HStack>
  )
}
