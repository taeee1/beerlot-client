import React from 'react'
import BottomDrawer from '../BottomDrawer'

interface ReviewExitConfirmationDrawerProps {
  isOpen: boolean
  onClose: () => void
  onClickLeftButton: () => void
  onClickRightButton: () => void
}

const ReviewExitConfirmationDrawer: React.FC<
  ReviewExitConfirmationDrawerProps
> = ({ onClickLeftButton, onClickRightButton, isOpen, onClose }) => {
  return (
    <BottomDrawer
      headerLabel={'정말로 나가실 건가요?'}
      bodyLabel='입력하신 글은 저장되지 않아요 :('
      onClose={onClose}
      isOpen={isOpen}
      cancelLabel={'나가기'}
      onCancel={onClickLeftButton}
      confirmLabel={'계속 작성하기'}
      onConfirm={onClickRightButton}
    />
  )
}

export { ReviewExitConfirmationDrawer }
