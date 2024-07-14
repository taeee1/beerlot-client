import React from "react";
import BottomDrawer from "../BottomDrawer";

interface ReviewExitConfirmationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onClickLeftButton: () => void;
  onClickRightButton: () => void;
}

const ReviewExitConfirmationDrawer: React.FC<
  ReviewExitConfirmationDrawerProps
> = ({ onClickLeftButton, onClickRightButton, isOpen, onClose }) => {
  return (
    <BottomDrawer
      headerText={"정말로 나가실 건가요?"}
      onClose={onClose}
      isOpen={isOpen}
      boxStyle={{
        justifyContent: "center",
        gap: "50px",
        w: "full",
        bg: "white",
        py: "38px 34px",
        borderRadius: "10px 10px 0px 0px",
      }}
      leftButtonText={"나가기"}
      leftButtonStyle={{
        w: "full",
        py: "10px",
        onClick: onClickLeftButton,
      }}
      rightButtonText={"계속 작성하기"}
      rightButtonStyle={{
        w: "full",
        py: "10px",
        onClick: onClickRightButton,
      }}
    />
  );
};

export { ReviewExitConfirmationDrawer };
