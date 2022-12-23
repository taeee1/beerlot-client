import { Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

interface FloatingButtonProps {
  disabled: boolean;
  text?: string;
  bgColor?: string;
  textColor?: string;
  boxShadow?: string | undefined;
  onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  text,
  disabled,
  bgColor,
  textColor,
  boxShadow,
  onClick,
}) => {
  const router = useRouter();
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      boxShadow={boxShadow}
      pos="fixed"
      bottom="35px"
      left="38px"
      right="35px"
      bg={bgColor}
      borderRadius="10px"
      _disabled={{
        bg: bgColor,
        textColor: textColor,
      }}
      textColor={textColor}
    >
      <Text textStyle="h3">{text}</Text>
    </Button>
  );
};

export default FloatingButton;
