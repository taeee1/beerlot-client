import {FormControl, FormHelperText, FormLabel, Input} from "@chakra-ui/react";
import React from "react";

interface NicknameInputProps {
  input: string | null;
  label?: string;
  isValid?: boolean | null;
  guideText?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const NicknameInput: React.FC<NicknameInputProps> = ({
  label = "닉네임",
  isValid = null,
  guideText = "",
  placeholder = "",
  input = "닉네임은 9자 이내로 만들 수 있어요!",
  onChange,
  onBlur,
}) => {
  return (
    <FormControl>
      <FormLabel
        textStyle="h3"
        textColor={
          isValid === null ? "gray.300" : isValid ? "orange.200" : "red.100"
        }
      >
        {label}
      </FormLabel>
      <Input
        type="text"
        value={input ?? ""}
        placeholder={placeholder}
        _placeholder={{
          textColor: "gray.200",
          textStyle: "h2",
        }}
        onChange={onChange}
        borderRadius="none"
        px={0}
        border="none"
        borderBottom="1px solid"
        borderBottomColor={
          isValid === null ? "gray.300" : isValid ? "orange.200" : "red.100"
        }
        onBlur={onBlur}
        _focusVisible={{}}
        _hover={{}}
      />
      {input !== null && (
        <FormHelperText
          marginTop={1}
          textStyle="h4"
          textColor={isValid ? "orange.200" : "red.100"}
        >
          {guideText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default NicknameInput;
