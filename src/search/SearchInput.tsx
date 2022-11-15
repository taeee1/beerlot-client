import {
  Box,
  Circle,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { SearchGlass, WhiteCross } from "../../public/svg";
import { SEARCH_BAR_PLACEHOLDER } from "../../interface/static";

interface SearchInputProps {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearInput: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  handleChange,
  clearInput,
}) => {
  return (
    <InputGroup display="flex" alignItems="center" justifyContent="center">
      <Input
        py="20px"
        px="20px"
        bg="blue.100"
        placeholder={SEARCH_BAR_PLACEHOLDER}
        size="sm"
        value={value}
        onChange={handleChange}
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
