import {
  BeerCard,
  BeerCardBody,
  BeerCardFooter,
  BeerCategoryTag,
  BeerCategoryTagLabel,
  BeerCountryText,
  BeerNameText,
} from '@components/shared/Card/BeerCardItem'
import { Box, HStack } from '@chakra-ui/react'
import { CommonBeerImage } from '@components/shared/CommonBeerImage/CommonBeerImage'
import React from 'react'
import { BeerType } from '../../../../types/beer'

export const RecommendBeerCard = ({
  item,
  onClick,
  selected,
}: {
  onClick: () => void
  selected: undefined | boolean
  item: BeerType
}) => (
  <BeerCard
    mt={1}
    w='full'
    borderColor={'orange.200'}
    cursor='pointer'
    onClick={onClick}
    filter={selected ? 'drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.3))' : 'none'}
    bg={selected ? 'orange.200' : 'white.100'}
  >
    <BeerCardBody w='full' h='full' position={'relative'} border='orange.200'>
      <Box position='relative' borderRadius={6}>
        {item.image_url && (
          <CommonBeerImage
            src={item.image_url}
            alt={item.name}
            width='175px'
            height='120px'
            objectFit='cover'
            style={{ borderRadius: '6px' }}
          />
        )}
      </Box>
    </BeerCardBody>
    <BeerCardFooter>
      <BeerNameText>{item.name}</BeerNameText>
      <HStack>
        <BeerCountryText borderRadius='full' country={item.origin_country} />
        <BeerCategoryTag bg={selected ? 'white.100' : 'orange.200'}>
          <BeerCategoryTagLabel
            textColor={selected ? 'orange.200' : 'white.100'}
          >
            {item.category?.name}
          </BeerCategoryTagLabel>
        </BeerCategoryTag>
      </HStack>
    </BeerCardFooter>
  </BeerCard>
)
