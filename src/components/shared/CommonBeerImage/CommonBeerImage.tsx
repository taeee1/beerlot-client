import { Image, ImageProps } from '@chakra-ui/react'
import React from 'react'

const CommonBeerImage: React.FC<ImageProps> = ({ ...props }) => {
  return (
    <Image
      src={props.src ?? commonBeerImage}
      fallbackSrc={commonBeerImage}
      alt={props?.alt ?? 'beer image'}
      {...props}
    />
  )
}

export { CommonBeerImage }
const commonBeerImage = '/images/beer-preview-default-image.jpg'
