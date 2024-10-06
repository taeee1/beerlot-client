import { Box, Container, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useSingleBeerFetchQuery } from '../../../hooks/query/useBeerQuery'
import { DetailInfo } from './DetailInfo'
import { DetailTabList } from './DetailTabList'

export const DetailTemplate = () => {
  const router = useRouter()
  const { id: beerId } = router.query
  const singleBeerFetch = useSingleBeerFetchQuery(Number(beerId))
  const beerInfo = singleBeerFetch.data
  return (
    <Box w='full' h='full' bg='gray.100' mb={'64px'} overflowY='scroll'>
      <Container p={'0px'} w='full' bg='white' position='relative' maxW='450px'>
        <VStack w='full'>
          {beerInfo && (
            <DetailInfo
              beerName={beerInfo?.name ?? ''}
              volume={beerInfo?.volume ?? 0}
              category={beerInfo?.category?.name ?? ''}
              country={beerInfo?.origin_country ?? ''}
              beerImg={beerInfo?.image_url ?? ''}
              beerId={beerInfo?.id}
              rate={beerInfo.rate ?? 0}
            />
          )}
          {beerInfo && (
            <DetailTabList
              id={beerInfo.id}
              city={beerInfo?.origin_country ?? ''}
              brewary={beerInfo.brewery ?? ''}
              calories={beerInfo.calorie ?? 0}
              suitableGlass={'suitableGlass'}
              desc={beerInfo?.description ?? ''}
              buyFrom={beerInfo?.buy_from ?? []}
              rate={beerInfo?.rate ?? 0}
            />
          )}
        </VStack>
      </Container>
    </Box>
  )
}
