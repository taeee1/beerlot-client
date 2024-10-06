import React from 'react'
import { Box, Center, Link, Text } from '@chakra-ui/react'
import { BEERLOT_EMAIL } from '../../../interface/static'

export const EmptyFilteredResult = () => {
  return (
    <Center mt='118px' flexDirection='column' gap={3}>
      <Text color='black.200' textStyle='h2_bold'>
        아쉽게도 일치하는 맥주가 없어요😢
      </Text>

      <Text color='gray.300' textAlign={'center'} textStyle='h3'>
        다른 키워드로 검색해보세요!
        <br />
        {`ex) OB라거 > 오비라거`}
      </Text>
      <Box
        p={4}
        bg={'gray.100'}
        borderRadius={'md'}
        borderWidth={1}
        borderColor={'gray.200'}
      >
        <Text textAlign={'center'} textStyle='h3'>
          <Text as={'span'} color={'orange.300'}>
            찾는 맥주
          </Text>
          <Text as={'span'} color={'black.200'}>
            가 없나요?
            <br />
          </Text>
          <Link
            href={`mailto:?subject=${BEERLOT_EMAIL}`}
            textStyle='h3_bold'
            color={'orange.300'}
          >
            👉 맥주 제보하기 👈
          </Link>
        </Text>
      </Box>
    </Center>
  )
}
