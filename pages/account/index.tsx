import { Box, Container } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import AccountsTemplate from '../../src/components/account/AccountsTemplate'

const AccountPage = () => {
  return (
    <Box w='full' bg='gray.100' pb={'64px'} minH={'100vh'}>
      <Container p={'0px'} maxW='450px' bg='white'>
        <AccountsTemplate />
      </Container>
    </Box>
  )
}

export default AccountPage

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
