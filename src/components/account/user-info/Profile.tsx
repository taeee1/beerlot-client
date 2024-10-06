import { useUserInfoQuery } from '@/../hooks/query/useUserQuery'
import { VStack } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import EditProfileButton from './EditProfileButton'
import InfoContainer from './InfoContainer'
import MessageContainer from './MessageContainer'

const Profile = () => {
  const accessToken = Cookies.get('beerlot-oauth-auth-request')
  const userQuery = useUserInfoQuery(accessToken ?? '')
  const { image_url, username, status_message } = userQuery?.data ?? {}
  useEffect(() => {
    userQuery.refetch()
  }, [])

  return (
    <VStack pt={0} px='20px' pb='10px'>
      <InfoContainer imageSrc={image_url || '/images/default-profile.png'} />
      <MessageContainer nickName={username ?? ''} bio={status_message ?? ''} />
      <EditProfileButton />
    </VStack>
  )
}

export default Profile
