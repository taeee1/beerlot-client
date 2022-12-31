import {
  Circle,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { SearchGlass, WhiteCross } from "../../public/svg";
import { SEARCH_BAR_PLACEHOLDER } from "../../interface/static";

interface SearchInputHomeProps {
  placeholder?: string;
}

const SearchInputHome: React.FC<SearchInputHomeProps> = ({ placeholder }) => {
  const router = useRouter();
  const handleFocus = () => {
    router.push(`/search`);
  };

  return (
    <InputGroup display="flex" alignItems="center" justifyContent="center">
      <Input
        onFocus={handleFocus}
        py="10px"
        px="20px"
        bg="blue.100"
        placeholder={placeholder ?? SEARCH_BAR_PLACEHOLDER}
        size="sm"
        borderRadius="20px"
        textColor="white"
        _placeholder={{ color: "inherit" }}
        focusBorderColor="inherit"
        _hover={{}}
      />
      <InputLeftElement h="full">
        <SearchGlass />
      </InputLeftElement>
    </InputGroup>
  );
};

export default SearchInputHome;
