import { Button, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { ThumbsUpIcon } from "../public/svg";

interface ThumbsUpButtonProps {
  thumbsUpNumber: number;
}

const ThumbsUpButton: React.FC<ThumbsUpButtonProps> = ({ thumbsUpNumber }) => {
  return (
    <Button
      _focus={{
        color: "orange.200",
        bg: "white",
        borderColor: "orange.200",
      }}
      h={"auto"}
      w={"auto"}
      bg={"white"}
      py={"4px"}
      px={"8px"}
      border={"1px solid rgba(97, 100, 107, 0.5)"}
      borderRadius="30px"
      _hover={{ bg: "white" }}
    >
      {/* TODO : selected 될 때 orange 처리, gray (hover?) 없애기 */}
      <ThumbsUpIcon color="orange.200" />

      <Text textStyle="h3" ml={"4px"}>
        {thumbsUpNumber}
      </Text>
    </Button>
  );
};

export default ThumbsUpButton;
