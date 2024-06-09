import React from "react";
import BottomDrawer from "../BottomDrawer";

interface ReviewDeleteConfirmationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onClickLeftButton: () => void;
  onClickRightButton: () => void;
}

const ReviewDeleteConfirmationDrawer: React.FC<
  ReviewDeleteConfirmationDrawerProps
> = ({ onClickLeftButton, onClickRightButton, isOpen, onClose }) => {
  return (
    <BottomDrawer
      headerText={"리뷰를 삭제하시겠어요?"}
      bodyText={"삭제한 리뷰는 복구할 수 없어요!"}
      bodyTextStyle={{
        textAlign: "center",
      }}
      headerTextStyle={{
        p: 0,
      }}
      onClose={onClose}
      isOpen={isOpen}
      boxStyle={{
        justifyContent: "center",
        w: "full",
        bg: "white",
        p: "38px 20px 34px 21px",
        borderRadius: "10px 10px 0px 0px",
      }}
      leftButtonText={"취소"}
      leftButtonStyle={{
        w: "full",
        py: "10px",
        px: "39px",
        onClick: onClickLeftButton,
      }}
      rightButtonText={"삭제하기"}
      rightButtonStyle={{
        w: "full",
        bg: "blue.100",
        py: "10px",
        px: "22px",
        onClick: onClickRightButton,
      }}
    />
  );
};

export { ReviewDeleteConfirmationDrawer };
