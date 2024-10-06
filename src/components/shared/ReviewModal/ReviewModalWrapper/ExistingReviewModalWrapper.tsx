import { useUserReviewsQuery } from '@/../hooks/query/useUserQuery'
import { ModalProps } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import {
  useReviewQuery,
  useReviewUpdateMutation,
} from '../../../../../hooks/reviews/useReview'
import {
  BeerTypeV2,
  CreateReviewRequestTypeV2,
} from '../../../../../types/review'
import { ReviewModal } from '../ReviewModal'

interface ExistingReviewModalWrapperProps {
  reviewId?: number | null
  isModalOpen: ModalProps['isOpen']
  onCloseModal: ModalProps['onClose']
}

export const ExistingReviewModalWrapper: React.FC<
  ExistingReviewModalWrapperProps
> = ({ reviewId, isModalOpen, onCloseModal }) => {
  const accessToken = Cookies.get('beerlot-oauth-auth-request') ?? ''
  const reviewQuery = useReviewQuery(reviewId)

  const userReviewQuery = useUserReviewsQuery(accessToken)
  const existingReviewData = reviewQuery.data
  const [beerInfo, setBeerInfo] = useState<BeerTypeV2 | undefined>()
  const [reviewInfo, setReviewInfo] = useState<
    CreateReviewRequestTypeV2 | undefined
  >()

  console.log('reviewInfo', reviewInfo)

  const handleCloseModal = () => {
    onCloseModal()
    setReviewInfo(undefined)
  }

  useEffect(() => {
    if (existingReviewData) {
      setReviewInfo({
        rate: existingReviewData.rate ?? 0,
        content: existingReviewData.content ?? '',
        image_url: existingReviewData.image_url ?? [],
        buy_from: existingReviewData.buy_from ?? '',
      })
      setBeerInfo(existingReviewData.beer)
    }
  }, [existingReviewData])

  const { mutate: updateReview } = useReviewUpdateMutation(accessToken)

  const handleComplete = (beerId: number) => {
    if (!reviewInfo) return
    if (reviewId !== undefined && reviewId !== null) {
      updateReview(
        { reviewId, newContent: reviewInfo },
        {
          onSuccess: () => {
            userReviewQuery.refetch()
            handleCloseModal()
          },
        }
      )
    }
  }

  return (
    <ReviewModal
      isModalOpen={isModalOpen}
      onCloseModal={handleCloseModal}
      onComplete={handleComplete}
      onChangeReviewInfo={setReviewInfo}
      reviewInfo={reviewInfo}
      beerInfo={beerInfo}
    />
  )
}
