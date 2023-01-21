import {Icon, IconProps} from "@chakra-ui/react";
import React from "react";
import {HeartEmpty, HeartOrange} from "./custom-icons/customIcons";

interface LikeButtonProps extends IconProps {
  isClicked: boolean;
  onClick?: () => void;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  isClicked,
  onClick,
  ...props
}) => {
  return (
    <Icon
      {...props}
      aria-label="like button"
      onClick={onClick}
      as={isClicked ? HeartOrange : HeartEmpty}
      color={isClicked ? "orange.200" : "gray.300"}
      cursor="pointer"
    />
  );
};
