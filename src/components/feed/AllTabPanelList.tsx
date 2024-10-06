import { useUserLikedReviewsQuery } from '@/../hooks/query/useUserQuery'
import { Flex } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { MOCK_FEED_FILTER_LIST } from '../../../interface/static'
import { FeedFilter } from './FeedFilter/FeedFilter'
import { useAllReviewsInfiniteQuery } from '../../../hooks/reviews/useReview'
import { FollowingTabPanelItem } from './TabPanelItem'
import { ReviewTypeV2 } from '../../../types/review'
import { InfiniteScrollWrapper } from '@components/shared/InfiniteScrollWrapper'
import { LanguageType, ReviewSortType } from '../../../types/common'

export const AllTabPanelList = () => {
  const accessToken = Cookies.get('beerlot-oauth-auth-request') ?? ''
  const likedReviewsListQuery = useUserLikedReviewsQuery(accessToken)
  const [selectedTag, setSelectedTag] = useState<ReviewSortType>(
    MOCK_FEED_FILTER_LIST[0].tags[0]
  )
  const allReviewsQuery = useAllReviewsInfiniteQuery({
    page: 1,
    size: 10,
    sort: selectedTag ?? ReviewSortType.RECENTLY_UPDATED,
    language: LanguageType.KR,
  })

  const handleSelectTag = async (tag: ReviewSortType) => {
    setSelectedTag(tag)
  }

  const handleLoadMore = () => {
    if (allReviewsQuery.hasNextPage && !allReviewsQuery.isFetchingNextPage) {
      allReviewsQuery.fetchNextPage()
    }
  }

  return (
    <Flex flexDirection='column' gap={'10px'} pb={'64px'}>
      <FeedFilter selectedTag={selectedTag} onClickTag={handleSelectTag} />
      <InfiniteScrollWrapper
        handleLoadMore={handleLoadMore}
        isFetching={allReviewsQuery.isFetchingNextPage}
      >
        {/* Map through all pages of reviews */}
        {allReviewsQuery.data?.pages.map((page) =>
          page.contents?.map((review) => {
            return (
              <FollowingTabPanelItem
                key={review.id}
                isLiked={likedReviewsListQuery.data?.includes(review.id ?? 0)}
                reviewId={Number(review.id)}
                content={review.content ?? ''}
                nickname={review.member?.username ?? ''}
                reviewTime={review.updated_at ?? ''}
                beerName={review.beer?.name ?? ''}
                rate={review.rate ?? 0}
                imageSrc={review.image_url}
                likedCount={review.like_count ?? 0}
                isEditable={false}
              />
            )
          })
        )}
      </InfiniteScrollWrapper>
    </Flex>
  )
}
