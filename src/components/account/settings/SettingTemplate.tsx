'use client'
import { Box, useDisclosure, VStack } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import BottomDrawer from '../../shared/BottomDrawer'
import { LeftBackRandom } from '../../shared/Headers/LeftBackRandom'
import { SettingSectionList } from '@components/account/settings/SettingSectionList'
import { useUserInfoQuery } from '../../../../hooks/query/useUserQuery'

export const SettingsTemplate = () => {
  const router = useRouter()
  const handleClickBack = () => {
    router.back()
  }
  const LogoutDrawer = useDisclosure()
  const SignOut = useDisclosure()
  const accessToken = Cookies.get('beerlot-oauth-auth-request') ?? ''
  const userQuery = useUserInfoQuery(accessToken ?? '', {
    enabled: !!accessToken,
  })

  const isLoaded = userQuery.isSuccess
  const { email } = userQuery.data ?? {}

  const usersSetting = [
    {
      title: '로그아웃',
      onClick: () => {
        LogoutDrawer.onOpen()
      },
    },
    {
      title: '회원탈퇴',
      onClick: () => {
        SignOut.onOpen()
      },
    },
  ]

  const handleCanecelLogout = () => {
    LogoutDrawer.onClose()
  }

  const handleLogout = () => {
    router.push('/')
    Cookies.remove('beerlot-oauth-auth-request')
  }

  const handleCancelSignout = () => {
    SignOut.onClose()
  }

  const handleSignout = () => {
    // TODO: 탈퇴 로직 구현 필요
    console.log('네 떠날래요 클릭됨')
    handleLogout()
    router.push('/')
    SignOut.onClose()
  }

  return (
    <Box h='full'>
      <VStack bg='gray.100' h='full'>
        <LeftBackRandom onClick={handleClickBack} title='설정' />
        <BottomDrawer
          headerLabel={'로그아웃 하시겠어요?'}
          onClose={LogoutDrawer.onClose}
          isOpen={LogoutDrawer.isOpen}
          cancelLabel={'취소'}
          onCancel={handleCanecelLogout}
          confirmLabel={'로그아웃'}
          onConfirm={handleLogout}
        />
        <BottomDrawer
          headerLabel={'정말 비어랏을 떠나시는 건가요?'}
          onClose={SignOut.onClose}
          isOpen={SignOut.isOpen}
          bodyLabel={
            '떠나신다니 아쉽네요 😢\n맥주 마시다가 생각나면 언제든 다시 돌아와요 :)'
          }
          reversed
          cancelLabel={'네, 떠날래요'}
          onCancel={handleSignout}
          confirmLabel={'아뇨, 더 있을래요'}
          onConfirm={handleCancelSignout}
        />
        <SettingSectionList
          usersSetting={usersSetting}
          email={email ?? ''}
          isLoaded={isLoaded}
        />
      </VStack>
    </Box>
  )
}
