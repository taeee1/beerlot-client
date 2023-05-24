import {ThumbsUpIcon, ThumbsUpOrangeIcon} from "@/../public/svg";
import {Button, ButtonProps, Icon, Text} from "@chakra-ui/react";
import React from "react";

interface ThumbsUpButtonProps extends ButtonProps {
  thumbsUpNumber: number;
  isLiked?: boolean;
}

const ThumbsUpButton: React.FC<ThumbsUpButtonProps> = ({
  thumbsUpNumber,
  isLiked = false,
  ...props
}) => {
  console.log("isLiked", isLiked);
  return (
    <Button
      h={"auto"}
      w={"auto"}
      bg={"white"}
      py={"4px"}
      px={"8px"}
      borderColor={isLiked ? "orange.200" : "gray.200"}
      border={"1px solid"}
      borderRadius="30px"
      _hover={{bg: "white"}}
      {...props}
    >
      {/* TODO : selected 될 때 orange 처리, gray (hover?) 없애기 */}
      {isLiked ? <ThumbsUpOrangeIcon /> : <ThumbsUpIcon />}
      <Text
        textStyle="h3"
        ml={"4px"}
        color={isLiked ? "orange.200" : "black.100"}
      >
        {thumbsUpNumber}
      </Text>
    </Button>
  );
};

export default ThumbsUpButton;
