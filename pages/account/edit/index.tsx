import { EditTemplate } from '@/components/account/user-info/edit/EditTemplate'
import { Box, Container } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'

const EditPage = () => {
  return (
    <Box w='full' h='full' bg='gray.100' overflowY='scroll'>
      <Container
        p={'0px'}
        w='full'
        h='full'
        bg='white'
        position='relative'
        maxW='450px'
      >
        <EditTemplate />
      </Container>
    </Box>
  )
}

export default EditPage

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
