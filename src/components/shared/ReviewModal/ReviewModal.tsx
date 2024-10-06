import {
  Center,
  Modal,
  ModalContent,
  ModalProps,
  useDisclosure,
} from '@chakra-ui/react'
import React, { ChangeEvent, useState } from 'react'
import {
  BeerTypeV2,
  CreateReviewRequestTypeV2,
} from '../../../../types/review'
import { BeerlotLoading } from '../Loading'
import { BeerReviewContent } from './BeerReviewContent'
import { BeerSearchContent } from './BeerSearchContent'
import { ReviewExitConfirmationDrawer } from './ReviewExitConfirmationDrawer'

interface ReviewModalProps {
  reviewInfo?: CreateReviewRequestTypeV2
  isModalOpen: ModalProps['isOpen']
  onCloseModal: ModalProps['onClose']
  onComplete: (beerId: number) => void
  onChangeReviewInfo: (data?: CreateReviewRequestTypeV2) => void
  onUpdateBeerInfo?: (data: BeerTypeV2) => void
  beerInfo?: BeerTypeV2
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isModalOpen,
  reviewInfo,
  beerInfo,
  onUpdateBeerInfo,
  onChangeReviewInfo,
  onCloseModal,
  onComplete,
}) => {
  const isBeerEditable = !!onUpdateBeerInfo
  const [step, setStep] = useState(0)
  const {
    onClose: onCloseConfirmDrawer,
    onOpen: onOpenConfirmDrawer,
    isOpen: isOpenConfirmDrawer,
  } = useDisclosure()

  const beerName = beerInfo?.name
  const beerId = beerInfo?.id
  const isCompleted = !!beerName && !!reviewInfo?.rate && !!reviewInfo?.content

  const handleComplete = () => {
    if (beerId) onComplete(beerId)
  }

  const handleChangeBeerName = (name: string, id: number) => {
    onUpdateBeerInfo?.({ id, name })
  }

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!reviewInfo) return
    onChangeReviewInfo({ ...reviewInfo, content: e.target.value })
    handleChangeReviewInfo('content', e.target.value)
  }

  const handleChangeReviewInfo = (
    key: string,
    value: string | number | string[]
  ) => {
    if (!reviewInfo) return
    onChangeReviewInfo({ ...reviewInfo, [key]: value })
  }

  return (
    <>
      <Modal onClose={onCloseModal} size={'full'} isOpen={isModalOpen}>
        <ModalContent
          px='20px'
          h={'fit-content'}
          pb='40px'
          maxW='450px'
          bg='white'
        >
          {!reviewInfo && (
            <Center h={'100vh'}>
              <BeerlotLoading />
            </Center>
          )}
          {reviewInfo && step === 0 && (
            <BeerReviewContent
              onOpenDrawer={onOpenConfirmDrawer}
              reviewInfo={reviewInfo}
              onNext={isBeerEditable ? () => setStep(1) : undefined}
              onInputChange={handleContentChange}
              onComplete={handleComplete}
              onChangeReviewInfo={handleChangeReviewInfo}
              beerName={beerName ?? ''}
              isCompleted={isCompleted}
            />
          )}

          {reviewInfo && step === 1 && (
            <BeerSearchContent
              onBack={() => {
                setStep(step - 1)
              }}
              onChangeBeerName={handleChangeBeerName}
            />
          )}
        </ModalContent>
      </Modal>

      <ReviewExitConfirmationDrawer
        isOpen={isOpenConfirmDrawer}
        onClose={onCloseConfirmDrawer}
        onClickLeftButton={() => {
          onCloseConfirmDrawer()
          onCloseModal()
          onChangeReviewInfo()
        }}
        onClickRightButton={onCloseConfirmDrawer}
      />
    </>
  )
}
