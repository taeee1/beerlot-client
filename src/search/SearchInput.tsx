import {
  Box,
  Circle,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { SearchGlass, WhiteCross } from "../../public/svg";
import { SEARCH_BAR_PLACEHOLDER } from "../../interface/static";

interface SearchInputProps {
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearValue: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onChange,
  onKeyPress,
  clearValue,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      clearValue();
    }
  };

  return (
    <InputGroup display="flex" alignItems="center" justifyContent="center">
      <Input
        ref={inputRef}
        onKeyPress={onKeyPress}
        py="20px"
        px="20px"
        bg="blue.100"
        placeholder={SEARCH_BAR_PLACEHOLDER}
        size="sm"
        onChange={onChange}
        autoFocus
        borderRadius="20px"
        textColor="white"
        _placeholder={{ color: "inherit" }}
        focusBorderColor="inherit"
        _hover={{}}
      />
      <InputLeftElement h="full">
        <SearchGlass />
      </InputLeftElement>
      <InputRightElement h="full" onClick={clearInput} borderRadius="50%">
        <Box w="17px" h="17px" id="circle" borderRadius="50%" color="blue.200">
          <WhiteCross />
        </Box>
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
