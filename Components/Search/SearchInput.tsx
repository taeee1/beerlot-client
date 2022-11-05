import {
  Circle,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { SearchGlass, WhiteCross } from "../../public/svg";
import { SEARCH_BAR_PLACEHOLDER } from "../../Static";

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
      />
      <InputLeftElement h="full">
        <SearchGlass />
      </InputLeftElement>
      <InputRightElement h="full" as="circle" bg="blue.200">
        <Circle size="17px" bg="blue.200" onClick={clearInput} id="circle">
          <WhiteCross />
        </Circle>
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
