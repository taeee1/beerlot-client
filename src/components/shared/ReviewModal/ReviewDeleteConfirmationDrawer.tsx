import React from 'react'
import BottomDrawer from '../BottomDrawer'

interface ReviewDeleteConfirmationDrawerProps {
  isOpen: boolean
  onClose: () => void
  onClickLeftButton: () => void
  onClickRightButton: () => void
}

const ReviewDeleteConfirmationDrawer: React.FC<
  ReviewDeleteConfirmationDrawerProps
> = ({ onClickLeftButton, onClickRightButton, isOpen, onClose }) => {
  return (
    <BottomDrawer
      headerLabel={'리뷰를 삭제하시겠어요?'}
      bodyLabel={'삭제한 리뷰는 복구할 수 없어요!'}
      onClose={onClose}
      isOpen={isOpen}
      cancelLabel={'취소'}
      onCancel={onClickLeftButton}
      confirmLabel={'삭제하기'}
      onConfirm={onClickRightButton}
    />
  )
}

export { ReviewDeleteConfirmationDrawer }
