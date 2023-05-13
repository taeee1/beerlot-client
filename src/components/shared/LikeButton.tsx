import {IconButton, IconButtonProps} from "@chakra-ui/react";
import React from "react";
import {HeartEmpty} from "./CustomIcons/customIcons";

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
      onClick={onClick}
      icon={isLiked ? <HeartEmpty /> : <HeartEmpty />}
      color={isLiked ? "orange.200" : "gray.300"}
      cursor="pointer"
      fontSize={"28px"}
      _hover={{}}
      _active={{}}
      p={0}
      {...props}
    />
  );
};
