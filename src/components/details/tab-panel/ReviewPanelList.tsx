import {
  Box,
  Center,
  Container,
  Flex,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Rating } from '../../shared/Rating'
import { roundToDecimal } from '@/../utils/number'
import { FeedFilter } from '@/components/feed/FeedFilter/FeedFilter'
import { FollowingTabPanelItem } from '@/components/feed/TabPanelItem'
import { useBeerReviewsQuery } from '../../../../hooks/reviews/useBeer'
import { MOCK_FEED_FILTER_LIST } from '../../../../interface/static'
import { ReviewTypeV2 } from '../../../../types/review'
import { BeerInfoHStack } from './BasicPanelList'
import { UserReview } from './UserReview'
import { ReviewSortType } from '../../../../types/common'

interface ReviewPanelListProps {
  rate: number
  beerId: number
  buyFrom: string[]
}

export const ReviewPanelList: React.FC<ReviewPanelListProps> = ({
  beerId,
  rate,
  buyFrom,
}) => {
  const [selectedTag, setSelectedTag] = useState<ReviewSortType>(
    MOCK_FEED_FILTER_LIST[0].tags[0]
  )

  const { data, refetch } = useBeerReviewsQuery(
    { beerId, sort: selectedTag },
    { enabled: false }
  )
  const reviews = data

  useEffect(() => {
    refetch()
  }, [selectedTag, refetch])

  const handleSelectTag = (tag: ReviewSortType) => {
    setSelectedTag(tag)
  }

  const rateToUse = roundToDecimal(rate)

  return (
    <Container px={5} py='20px' bg='yellow.100'>
      <VStack gap='10px' alignItems={'start'}>
        <ReviewCountDisplay reviewLength={reviews?.length ?? 0} />
        <UserReview beerId={beerId} />
        <Text textStyle={'h2_bold'} mt={10}>
          모든 리뷰
        </Text>
        <BeerInfoHStack label={'제보된 판매처'} flexBasis={'81px'}>
          <HStack>
            {buyFrom?.map((buyFrom) => {
              return (
                <Text textStyle={'h3'} key={buyFrom} textColor='black.100'>
                  {buyFrom}
                </Text>
              )
            })}
          </HStack>
        </BeerInfoHStack>
        <BeerInfoHStack label={'평균 별점'} flexBasis={'81px'}>
          <HStack>
            <Rating
              starSize={23}
              buttonSize={'xs'}
              _rate={rateToUse}
              styleProps={{
                gap: '0px',
              }}
            />
            <Text textStyle={'h3'} textColor='black.100'>
              {rateToUse}
            </Text>
            <Text textStyle={'h3'} textColor='gray.300'>
              {' '}
              / 5
            </Text>
          </HStack>
        </BeerInfoHStack>
        <FeedFilter selectedTag={selectedTag} onClickTag={handleSelectTag} />
        {/* ALL_FEED_MOCK을 prop으로 받아서 AllTabPanelList랑 공유하기 */}
      </VStack>
      {reviews && reviews?.length > 0 ? (
        <ReviewsList reviews={reviews} />
      ) : (
        <EmptyReviewsList />
      )}
    </Container>
  )
}

const EmptyReviewsList = () => {
  return (
    <Center
      gap={2}
      borderRadius={8}
      bg={'white'}
      flexDir={'column'}
      py={5}
      mt={6}
      mx={5}
    >
      <Text textStyle={'h2_bold'}>아직 작성된 리뷰가 없어요😢</Text>
      <Text textStyle={'h3'} textColor={'gray.300'}>
        첫번째 리뷰의 주인공이 되어주실래요?
      </Text>
    </Center>
  )
}
interface ReviewsListProps {
  reviews: ReviewTypeV2[]
}

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
  return (
    <Flex flexDir={'column'} gap='10px'>
      {reviews?.map((review) => {
        return (
          <>
            <FollowingTabPanelItem
              key={review.id}
              reviewId={review.id}
              nickname={review.member.username}
              reviewTime={review.updated_at}
              beerName={review.beer?.name}
              rate={review.rate}
              imageSrc={review.image_url}
              content={review.content}
              likedCount={review.like_count}
              isEditable={false}
            />
          </>
        )
      })}
    </Flex>
  )
}
interface ReviewCountDisplayProps {
  reviewLength: number
}

const ReviewCountDisplay: React.FC<ReviewCountDisplayProps> = ({
  reviewLength,
}) => {
  return (
    <Box>
      <Text textColor='black.100' as='span' textStyle={'h2_bold'}>
        리뷰{' '}
      </Text>
      <Text textColor='orange.200' as='span' textStyle={'h2_bold'}>
        {reviewLength}
      </Text>
    </Box>
  )
}
