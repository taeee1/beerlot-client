import { Flex, Tag, Text } from '@chakra-ui/react'
import { purchasePlaces } from '@components/shared/ReviewModal/BeerPurchaseSection'

interface PlaceTagOptionsProps {
  onClickPlaceTag: (place: string) => void
}
export const PlaceTagOptions: React.FC<PlaceTagOptionsProps> = ({
  onClickPlaceTag,
}) => {
  return (
    <Flex gap='10px'>
      {purchasePlaces.map((place) => {
        return (
          <Tag
            borderRadius={'4px'}
            bg='gray.100'
            key={place}
            size='md'
            cursor='pointer'
            onClick={() => onClickPlaceTag(place)}
          >
            <Text textStyle={'h2'} textColor='gray.300'>
              {place}
            </Text>
          </Tag>
        )
      })}
    </Flex>
  )
}
