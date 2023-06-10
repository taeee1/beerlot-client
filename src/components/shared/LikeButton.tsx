import {IconButton, IconButtonProps} from "@chakra-ui/react";
import React from "react";
import {HeartEmpty} from "./CustomIcons/customIcons";
import {EmptyHeart, FullHeart} from "@/../public/svg";

interface LikeButtonProps extends IconButtonProps {
  isLiked: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  isLiked,
  onClick,
  ...props
}) => {
  return (
    <IconButton
      w="fit-content"
      minW="initial"
      onClick={onClick}
      icon={isLiked ? <FullHeart /> : <EmptyHeart />}
      cursor="pointer"
      fontSize={"28px"}
      _hover={{}}
      _active={{}}
      p={0}
      {...props}
    />
  );
};
