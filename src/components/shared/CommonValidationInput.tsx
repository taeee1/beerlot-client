import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  input: string | null;
  label?: string;
  isValid?: boolean | null;
  isTouched?: boolean;
  guideText?: string;
  placeholder?: string;
  maxLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const CommonValidationInput: React.FC<Props> = ({
  label = "닉네임",
  isValid = null,
  isTouched,
  guideText = "",
  placeholder = "",
  input = "닉네임은 9자 이내로 만들 수 있어요!",
  onChange,
  onBlur,
  maxLength,
}) => {
  return (
    <FormControl>
      <FormLabel
        textStyle="h3"
        textColor={!isTouched ? "gray.300" : isValid ? "orange.200" : "red.100"}
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
          !isTouched ? "gray.300" : isValid ? "orange.200" : "red.100"
        }
        onBlur={onBlur}
        _focusVisible={{}}
        _hover={{}}
        maxLength={maxLength}
      />
      {input !== null && (
        <FormHelperText
          marginTop={1}
          textStyle="h4"
          textColor={!isTouched ? "orange.200" : "red.100"}
        >
          {guideText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CommonValidationInput;
