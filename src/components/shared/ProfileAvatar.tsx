import { Image } from '@chakra-ui/react'
import React from 'react'

interface ProfileAvatarProps {
  boxSize: string
  src: string
  alt?: string
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ boxSize, src, alt }) => {
  return (
    <Image borderRadius='full' boxSize={boxSize} src={src} alt={alt ?? src} />
  )
}

export default ProfileAvatar
