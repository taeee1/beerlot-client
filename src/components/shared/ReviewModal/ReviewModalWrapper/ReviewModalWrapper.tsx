import { ModalProps } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useCreateReviewMutation } from '../../../../../hooks/reviews/useBeer'
import {
  BeerTypeV2,
  CreateReviewRequestTypeV2,
} from '../../../../../types/review'
import { ReviewModal } from '../ReviewModal'
import { MOCK_FEED_FILTER_LIST } from '../../../../../interface/static'
import { useErrorToast } from '@/hooks/shared/useErrorToast'
import { LanguageType, ReviewSortType } from '../../../../../types/common'
import { useAllReviewsInfiniteQuery } from '../../../../../hooks/reviews/useReview'

interface ReviewModalWrapperProps {
  isModalOpen: ModalProps['isOpen']
  onCloseModal: ModalProps['onClose']
}

export const ReviewModalWrapper: React.FC<ReviewModalWrapperProps> = ({
  isModalOpen,
  onCloseModal,
}) => {
  const accessToken = Cookies.get('beerlot-oauth-auth-request') ?? ''
  const selectedTag: ReviewSortType = MOCK_FEED_FILTER_LIST[0].tags[0]
  const allReviewsQuery = useAllReviewsInfiniteQuery({
    page: 1,
    size: 10,
    sort: selectedTag ?? ReviewSortType.RECENTLY_UPDATED,
    language: LanguageType.KR,
  })
  const showErrorToast = useErrorToast()
  const { mutate: createReview } = useCreateReviewMutation(accessToken)
  const [beerInfo, setBeerInfo] = useState<BeerTypeV2 | undefined>()
  const [reviewInfo, setReviewInfo] = useState<
    CreateReviewRequestTypeV2 | undefined
  >({
    content: '',
    image_url: '',
    buy_from: '',
    rate: 0,
  })

  const handleComplete = (beerId: number) => {
    if (beerId === null) return
    if (!reviewInfo) return
    createReview(
      {
        beerId: beerId,
        data: reviewInfo,
      },
      {
        onSuccess: () => {
          allReviewsQuery.refetch()
          onCloseModal()
        },
        onError: (error) => {
          showErrorToast(error.response, {
            409: '이미 리뷰를 작성한 맥주입니다. 다른 맥주를 선택해주세요.',
          })
        },
      }
    )
  }

  return (
    <ReviewModal
      isModalOpen={isModalOpen}
      onCloseModal={onCloseModal}
      onComplete={handleComplete}
      onChangeReviewInfo={setReviewInfo}
      reviewInfo={reviewInfo}
      beerInfo={beerInfo}
      onUpdateBeerInfo={setBeerInfo}
    />
  )
}
