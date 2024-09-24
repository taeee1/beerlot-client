import { Box, HStack, IconButton, Tag, Text, VStack } from '@chakra-ui/react'
import { CrossXBlack } from '../../../../public/svg'
import { PlaceTagOptions } from '@components/shared/ReviewModal/PlaceTagOptions'
import { EtcPlaceTagOption } from '@components/shared/ReviewModal/EtcPlaceTagOption'

interface BeerPurchaseSectionProps {
  currentPlace: string
  handleChangePlaceTag: (place: string) => void
}

export const BeerPurchaseSection: React.FC<BeerPurchaseSectionProps> = ({
  currentPlace,
  handleChangePlaceTag,
}) => {
  const isEtc = !designatedPurchasePlaces.includes(currentPlace)

  return (
    <VStack p='10px' gap='10px' w='full' alignItems={'flex-start'}>
      <Box>
        <Text as='span' textStyle='h2' textColor='black.100'>
          이 맥주 어디서 구매하셨나요?{' '}
        </Text>
        <Text as='span' textStyle='h2' textColor='gray.200'>
          (선택)
        </Text>
      </Box>
      <HStack w='full' gap='10px' justify={'space-between'}>
        {currentPlace ? (
          <HStack>
            <Tag
              justifyContent='row'
              borderRadius={'4px'}
              bg='white'
              border='1px solid'
              borderColor={'orange.200'}
              cursor='pointer'
            >
              <Text textStyle={'h2'} textColor='orange.200'>
                {isEtc ? '기타' : currentPlace}
              </Text>
            </Tag>
            {isEtc && (
              <EtcPlaceTagOption handleChangePlace={handleChangePlaceTag} />
            )}
          </HStack>
        ) : (
          <PlaceTagOptions onClickPlaceTag={handleChangePlaceTag} />
        )}

        {currentPlace && (
          <IconButton
            bg='initial'
            size={'24px'}
            px={'0px'}
            aria-label='delete-x-button'
            icon={<CrossXBlack />}
            _hover={{}}
            _active={{}}
            onClick={() => handleChangePlaceTag('')}
          />
        )}
      </HStack>
    </VStack>
  )
}

//TODO : should be replaced
export const purchasePlaces = ['편의점', '펍', '대형마트', '기타']
const designatedPurchasePlaces = purchasePlaces.filter(
  (place) => place !== '기타'
)
