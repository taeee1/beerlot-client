import {
  Box,
  Button,
  Icon,
  Link as ChakraLink,
  Text,
  VStack,
} from '@chakra-ui/react'
import { OAUTH_PROVIDER } from '../../../../interface/types'
import { GoogleLogo, KakaoLogo, NaverLogo } from '../../../../public/svg'
import { generateSocialLoginUrl } from '../../../api/user/api'

const SocialButton = () => {
  return (
    <VStack w={'100%'} gap='10px'>
      {socialButton.map((button) => {
        return (
          <Button
            _hover={{
              textDecoration: 'none',
            }}
            _active={{}}
            as={ChakraLink}
            href={button.href}
            key={button.ariaLabel}
            aria-label={button.ariaLabel}
            border={button.border} // TODO: use them as styleProps
            width='100%'
            bg={button.buttonColor}
            borderRadius={12}
            justifyContent='space-between'
            p={'5px'}
            px={'8px'}
            alignItems={'center'}
            cursor='pointer'
          >
            <Icon as={button.icon} w={'36px'} h={'36px'} />
            <Text textStyle={'h2'} textColor={button.textColor}>
              {button.label}
            </Text>
            <Box w={'36px'} h={'36px'} />
          </Button>
        )
      })}
    </VStack>
  )
}

export const socialButton = [
  {
    provider: OAUTH_PROVIDER.KAKAO,
    ariaLabel: 'kakao login',
    icon: KakaoLogo,
    // onClick: () => {},
    label: '카카오로 계속하기',
    buttonColor: 'yellow.400',
    textColor: 'black',
    border: 'none',
    href: generateSocialLoginUrl(OAUTH_PROVIDER.KAKAO),
  },
  {
    provider: OAUTH_PROVIDER.NAVER,
    ariaLabel: 'naver login',
    icon: NaverLogo,
    // onClick: () => {},
    label: '네이버로 계속하기',
    buttonColor: 'green.100',
    textColor: 'white.100',
    border: 'none',
    href: generateSocialLoginUrl(OAUTH_PROVIDER.NAVER),
  },
  // {
  //   ariaLabel: "facebook login",
  //   icon: FacebookLogo,
  //   onClick: () => {},
  //   label: "페이스북으로 계속하기",
  //   buttonColor: "blue.300",
  //   textColor: "white.100",
  //   border: "none",
  // },
  {
    provider: OAUTH_PROVIDER.GOOGLE,
    ariaLabel: 'google login',
    icon: GoogleLogo,
    // onClick: () => {},
    label: 'Google로 계속하기',
    buttonColor: 'white.100',
    textColor: 'black',
    border: '#dddddd 1px solid', // TODO: use Chakra theme
    href: generateSocialLoginUrl(OAUTH_PROVIDER.GOOGLE),
  },
]

export default SocialButton
