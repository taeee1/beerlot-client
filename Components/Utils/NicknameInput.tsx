import { Box, Input, Text } from "@chakra-ui/react";
import React from "react";

interface NicknameInputProps {
  title: string;
  isValid: boolean | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  guideText: string;
  placeholder?: string;
}

const NicknameInput: React.FC<NicknameInputProps> = ({
  title,
  isValid,
  onChange,
  onBlur,
  guideText,
  placeholder = "",
}) => {
  return (
    <Box w="100%">
      <Text
        textStyle="h3"
        textColor={
          isValid === null ? "gray.300" : isValid ? "orange.200" : "red.100"
        }
      >
        {title}
      </Text>
      <Input
        onChange={onChange}
        onBlur={onBlur}
        w="100%"
        p={0}
        borderRadius={0}
        borderBottom="1px"
        errorBorderColor="none"
        borderBottomColor={
          isValid === null ? "gray.200" : isValid ? "orange.200" : "red.100"
        }
        border="none"
        focusBorderColor="none"
        isInvalid={isValid ?? false}
        placeholder={placeholder}
        _placeholder={{
          color:
            isValid === null ? "gray.300" : isValid ? "orange.200" : "red.100",
        }}
      />
      <Text
        textStyle="h3"
        textColor={
          isValid === null ? "gray.300" : isValid ? "orange.200" : "red.100"
        }
      >
        {guideText}
      </Text>
    </Box>
  );
};

export default NicknameInput;
