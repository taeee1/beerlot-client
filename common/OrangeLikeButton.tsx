import React from "react";
import { HeartButton, OrangeHeart } from "./custom-icons/customIcons";

interface LikeButtonProps {
  isClicked: boolean;
  onClick: (state: boolean) => void;
  iconProps: any; // 수정해야 함.
}

const OrangeLikeButton: React.FC<LikeButtonProps> = ({
  isClicked,
  onClick,
  iconProps,
}) => {
  return isClicked ? (
    <OrangeHeart {...iconProps} onClick={() => onClick(!isClicked)} />
  ) : (
    <HeartButton {...iconProps} onClick={() => onClick(!isClicked)} />
  );
};

export default OrangeLikeButton;
