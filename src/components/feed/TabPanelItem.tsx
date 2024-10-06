import { getLeftTime } from '@/../utils/time'
import { Avatar, Box, Center, Flex, IconButton, Text } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQueryClient } from 'react-query'
import { userLikedReviewsQueryKey } from '../../../hooks/query/useUserQuery'
import {
  useReviewDislikeMutation,
  useReviewLikeMutation,
} from '../../../hooks/reviews/useLike'
import { EditNote, TrashBin } from '../../../public/svg'
import { CommonBeerImage } from '../shared/CommonBeerImage/CommonBeerImage'
import { Rating } from '../shared/Rating'
import { ThumbsUpButton } from '../shared/ThumbsUpButton'
interface FollowingTabPanelItemProps {
  reviewId: number
  nickname: string
  reviewTime: string
  beerName?: string
  rate: number
  content: string
  likedCount: number
  isLiked?: boolean
  isEditable?: boolean
  onEdit?: () => void
  onDelete?: () => void
  imageSrc?: string
  maxContentLength?: number
}

export const FollowingTabPanelItem: React.FC<FollowingTabPanelItemProps> = ({
  reviewId,
  isLiked = false,
  nickname,
  reviewTime,
  beerName,
  rate,
  imageSrc,
  content,
  onDelete,
  onEdit,
  likedCount,
  isEditable = false,
  maxContentLength = MAX_TEXT_LENGTH_OF_REVIEW,
}) => {
  const accessToken = Cookies.get('beerlot-oauth-auth-request') ?? ''
  const queryClient = useQueryClient()
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const handleToggleElipsis = () => {
    setIsExpanded(!isExpanded)
  }

  const contentEllipsisStatus = chooseTextDisplay(
    content.length > maxContentLength,
    isExpanded
  )

  const reviewLikeMutation = useReviewLikeMutation(reviewId, accessToken, {
    onSuccess: () => {
      queryClient.invalidateQueries(userLikedReviewsQueryKey())
    },
  })

  const reviewDislikeMutation = useReviewDislikeMutation(
    reviewId,
    accessToken,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(userLikedReviewsQueryKey())
      },
    }
  )
  const router = useRouter()

  const handleClickLike = () => {
    if (!accessToken) {
      router.push('/login')
      return
    }
    if (isLiked) {
      reviewDislikeMutation.mutate()
    } else {
      reviewLikeMutation.mutate()
    }
  }

  return (
    <Box p={3} bg='white'>
      <Box display='flex' justifyContent='space-between' gap={1}>
        <Box flex={1}>
          <Flex gap={'4px'}>
            <Avatar w={'26px'} h={'26px'} />
            {nickname && <Text textStyle='h2_bold'>{nickname}</Text>}
            <Text textStyle='h3' color='gray.300'>
              | {getLeftTime(reviewTime)}
            </Text>
          </Flex>
          {beerName && !isEditable && (
            <Box className='beerInfo' my={'2px'}>
              <Text textStyle='h4_bold'>{beerName}</Text>
            </Box>
          )}

          <Box my={'2px'}>
            <Rating
              starSize={16}
              _rate={Math.round(rate)}
              styleProps={{
                gap: '0px',
              }}
              w={4}
              h={4}
            />
          </Box>
          <Box display='inline' my={'2px'} flexDirection='row'>
            <Text textStyle='h3' display='inline'>
              {contentEllipsisStatus === 'shorten'
                ? content.slice(0, 35)
                : content}
              {contentEllipsisStatus === 'shorten' ? '...' : ''}
            </Text>
            <Text
              as={'button'}
              textStyle='h3'
              onClick={handleToggleElipsis}
              textColor={'gray.200'}
              display={
                contentEllipsisStatus === 'normal' ? 'none' : 'inline-block'
              }
            >
              {isExpanded ? '숨기기' : '더보기'}
            </Text>
          </Box>
        </Box>
        <Box borderRadius={'6px'}>
          {imageSrc && (
            <CommonBeerImage
              width={'100px'}
              height={'100px'}
              alt='beer photo'
              src={imageSrc}
            />
          )}
        </Box>
      </Box>

      {isEditable ? (
        <Flex justifyContent='space-between' alignItems='center' mt={2}>
          <Center gap='6px'>
            <IconButton
              aria-label='Delete Icon'
              size='16px'
              onClick={onDelete}
              icon={<TrashBin />}
            />
            <IconButton
              aria-label='Edit Icon'
              size='16px'
              onClick={onEdit}
              icon={<EditNote />}
            />
          </Center>
          <ThumbsUpButton
            thumbsUpNumber={likedCount}
            isLiked={isLiked}
            onClick={handleClickLike}
          />
        </Flex>
      ) : (
        <Flex justifyContent='end' mt={2}>
          <ThumbsUpButton
            thumbsUpNumber={likedCount}
            onClick={handleClickLike}
            isLiked={isLiked}
          />
        </Flex>
      )}
    </Box>
  )
}

const MAX_TEXT_LENGTH_OF_REVIEW = 35

const chooseTextDisplay = (
  expandable: boolean,
  isExpanded: boolean
): 'expanded' | 'shorten' | 'normal' => {
  if (!expandable) return 'normal'
  if (isExpanded) return 'expanded'
  return 'shorten'
}
