import { Button, ButtonProps, Text } from "@chakra-ui/react";
import React from "react";
import { ThumbsUpIcon } from "./CustomIcons/customIcons";

interface ThumbsUpButtonProps extends ButtonProps {
  thumbsUpNumber: number;
  isLiked?: boolean;
}

export const ThumbsUpButton: React.FC<ThumbsUpButtonProps> = ({
  thumbsUpNumber,
  isLiked = false,
  ...props
}) => {
  return (
    <Button
      py={1}
      px={2}
      bg={"white"}
      border={isLiked ? "1px solid orange" : "1px solid gray"}
      borderRadius="30px"
      minW={"initial"}
      h={"fit-content"}
      color={isLiked ? "orange.200" : "black.100"}
      gap={1}
      _hover={{}}
      _focus={{}}
      {...props}
    >
      <ThumbsUpIcon
        boxSize={"16px"}
        color={isLiked ? "orange.200" : "black.100"}
        mr={0}
      />
      <Text textStyle={"h3"}>{thumbsUpNumber}</Text>
    </Button>
  );
};
