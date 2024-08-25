import { Box, Text } from '@chakra-ui/react'
import React from 'react'

interface UserNameSectionParams {
  username: string | undefined
}

export const UserNameSection: React.FC<UserNameSectionParams> = ({
  username,
}) => {
  return (
    <Box>
      {username ? (
        <>
          <Text display='inline' textStyle={'h1'} textColor='orange.200'>
            {username}
          </Text>
          <Text display='inline' textStyle={'h1'}>
            님의 최애맥주
          </Text>
        </>
      ) : (
        <Text display='inline' textStyle={'h1'}>
          최애맥주
        </Text>
      )}
    </Box>
  )
}
