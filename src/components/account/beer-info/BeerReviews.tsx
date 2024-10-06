import {
  useUserLikedReviewsQuery,
  useUserReviewsQuery,
} from '@/../hooks/query/useUserQuery'
import { FollowingTabPanelItem } from '@/components/feed/TabPanelItem'
import { ReviewDeleteConfirmationDrawer } from '@/components/shared/ReviewModal/ReviewDeleteConfirmationDrawer'
import { ExistingReviewModalWrapper } from '@/components/shared/ReviewModal/ReviewModalWrapper/ExistingReviewModalWrapper'
import { Flex, useDisclosure } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { useCallback, useState } from 'react'
import { useReviewDeleteMutation } from '../../../../hooks/reviews/useReview'
import { MemberReviewType } from '../../../../types/server/review/response'
import { InfiniteScrollWrapper } from '@components/shared/InfiniteScrollWrapper'
import { LanguageType, ReviewSortType } from '../../../../types/common'

const BeerReviews = () => {
  const accessToken = Cookies.get('beerlot-oauth-auth-request') ?? ''
  const userReviewQuery = useUserReviewsQuery(accessToken, {
    page: 1,
    size: 10,
    sort: ReviewSortType.RECENTLY_UPDATED,
    language: LanguageType.KR,
  })

  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const likedReviewsListQuery = useUserLikedReviewsQuery(accessToken)

  const handleEdit = useCallback(
    (reviewId: number) => {
      setSelectedReviewId(reviewId)
      onOpen()
    },
    [onOpen]
  )

  const deleteReviewMutation = useReviewDeleteMutation(accessToken, {
    onSuccess: () => {
      userReviewQuery.refetch()
    },
  })

  const handleDelete = (reviewId: number) => {
    deleteReviewMutation.mutate(reviewId)
  }

  const {
    isOpen: isOpenDeleteConfirmation,
    onOpen: onOpenDeleteConfirmation,
    onClose: onCloseDeleteConfirmation,
  } = useDisclosure()

  const handleLoadMore = () => {
    if (userReviewQuery.hasNextPage && !userReviewQuery.isFetchingNextPage) {
      userReviewQuery.fetchNextPage()
    }
  }

  return (
    <Flex flexDirection='column' gap={'10px'} h='full'>
      <InfiniteScrollWrapper
        handleLoadMore={handleLoadMore}
        isFetching={userReviewQuery.isFetchingNextPage}
      >
        {userReviewQuery.data?.pages?.map((page) =>
          page.contents?.map((feed) => (
            <>
              <FollowingTabPanelItem
                key={feed.id}
                reviewId={Number(feed.id)}
                isLiked={likedReviewsListQuery.data?.includes(feed.id ?? 0)}
                nickname={feed?.beer?.name ?? ''}
                reviewTime={feed.updated_at ?? ''}
                rate={feed.rate ?? 0}
                imageSrc={feed.image_url}
                content={feed.content ?? ''}
                likedCount={feed.like_count ?? 0}
                isEditable={true}
                onDelete={onOpenDeleteConfirmation}
                onEdit={() => handleEdit(feed.id ?? 0)}
              />
              <ReviewDeleteConfirmationDrawer
                isOpen={isOpenDeleteConfirmation}
                onClose={onCloseDeleteConfirmation}
                onClickLeftButton={() => {
                  onCloseDeleteConfirmation()
                }}
                onClickRightButton={() => {
                  handleDelete(feed.id ?? 0)
                  onCloseDeleteConfirmation()
                }}
              />
            </>
          ))
        )}
      </InfiniteScrollWrapper>

      <ExistingReviewModalWrapper
        reviewId={selectedReviewId}
        isModalOpen={isOpen}
        onCloseModal={onClose}
      />
    </Flex>
  )
}

export default BeerReviews
