import { Box, Center, Text } from '@chakra-ui/react'
import React from 'react'
interface SearchPromptBoxProps {
  username?: string
}

export const SearchPromptBox: React.FC<SearchPromptBoxProps> = ({
  username,
}) => {
  return (
    <Center mt={10} flexDir='column' gap={1}>
      {username && (
        <Box display='block'>
          <Text display={'inline'} textStyle={'h3'} textColor={'orange.200'}>
            {username}
          </Text>
          <Text display={'inline'} textStyle={'h3'} textColor={'gray.300'}>
            님,
          </Text>
        </Box>
      )}
      <Text textStyle={'h3'} textColor={'gray.300'}>
        무얼 검색하러 오셨나요 👀?
      </Text>
    </Center>
  )
}
