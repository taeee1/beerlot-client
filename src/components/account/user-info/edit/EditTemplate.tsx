import { useUserInfoQuery } from '@/../hooks/query/useUserQuery'
import { BeerlotLoading } from '@/components/shared/Loading'
import Cookies from 'js-cookie'
import { ProfileEditContent } from './ProfileEditContent'

export const EditTemplate = () => {
  const accessToken = Cookies.get('beerlot-oauth-auth-request') ?? ''
  const userQuery = useUserInfoQuery(accessToken ?? '', {
    enabled: !!accessToken,
  })

  const loading = userQuery.isLoading

  const {
    image_url,
    username,
    status_message: statusMessage,
    username_updated_at,
  } = userQuery?.data ?? {}

  if (loading) return <BeerlotLoading />

  return (
    <>
      {username && (
        <ProfileEditContent
          existingImageURl={image_url || '/images/default-profile.png'}
          statusMessage={statusMessage}
          username={username}
          usernameUpdatedAt={username_updated_at}
        />
      )}
    </>
  )
}
