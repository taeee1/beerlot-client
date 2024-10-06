import { Box, Container } from '@chakra-ui/react'
import { InquiryTemplate } from '../../../src/components/account/settings/InquiryTemplate'

const Inquiry = () => {
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
        <InquiryTemplate />
      </Container>
    </Box>
  )
}

export default Inquiry
