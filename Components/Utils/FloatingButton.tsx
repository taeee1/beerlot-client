import { Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

interface FloatingButtonProps {
  disabled: boolean;
  text?: string;
  bgColor?: string;
  textColor?: string;
  boxShadow?: string | undefined;
  href: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  text,
  disabled,
  bgColor,
  textColor,
  boxShadow,
  href,
}) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push(href)}
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
