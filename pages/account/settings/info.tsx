import { Box, Container, Text, VStack } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { SectionButton } from '../../../src/components/account/settings/SectionButton'
import { LeftBackRandom } from '../../../src/components/shared/Headers/LeftBackRandom'

const Info = () => {
  const router = useRouter()
  const handleClickBack = () => {
    router.back()
  }
  return (
    <Box w='full' h='full' bg='gray.100'>
      <Container
        p={'0px'}
        h='full'
        w='full'
        bg='white'
        position='relative'
        maxW='450px'
      >
        <Box h='full'>
          <VStack bg='gray.100' h='full'>
            {/* title */}
            <LeftBackRandom onClick={handleClickBack} title='비어랏 정보' />

            <VStack
              bg='gray.100'
              pt='70px'
              w='full'
              gap='10px'
              borderRight={'1px solid'}
              borderRightColor={'gray.200'}
              borderLeft={'1px solid'}
              borderLeftColor={'gray.200'}
              h='full'
            >
              <VStack w='full'>
                <SectionButton title={'버전'}>
                  <Text textColor={'gray.300'} textStyle='h2'>
                    1.0
                  </Text>
                </SectionButton>
              </VStack>
              <VStack w='full' h='full'>
                {InfoSettingSection.map((content) => (
                  <SectionButton
                    key={content.title}
                    title={content.title}
                    href={content.href}
                    style={{ marginTop: 0 }}
                    isExternal={content.isExternal}
                  />
                ))}
                <Box
                  w='full'
                  h='full'
                  bg='white'
                  style={{
                    marginTop: 0,
                  }}
                />
              </VStack>
            </VStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  )
}

export default Info

export const InfoSettingSection = [
  {
    title: '비어랏 이용약관',
    href: 'https://beerlot.notion.site/beerlot/86d12e8ce1ee4ec1baaa71587c28aae9',
    isExternal: true,
  },
  {
    title: '개인정보 처리방침',
    href: 'https://beerlot.notion.site/f4dfd6c17dca44d8b6e53e2443eaa0b3',
    isExternal: true,
  },
]

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.headers.cookie

  if (!cookies || !cookies.includes('beerlot-oauth-auth-request')) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}
