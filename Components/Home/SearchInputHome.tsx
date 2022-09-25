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
import { SEARCH_BAR_PLACEHOLDER } from "../../Static";

const SearchInputHome = () => {
  const router = useRouter();
  const handleFocus = () => {
    router.push(`/search`);
  };

  return (
    <InputGroup display="flex" alignItems="center" justifyContent="center">
      <Input
        onFocus={handleFocus}
        py="20px"
        px="20px"
        bg="Blue.100"
        placeholder={SEARCH_BAR_PLACEHOLDER}
        size="sm"
        borderRadius="20px"
        textColor="white"
        _placeholder={{ color: "inherit" }}
        focusBorderColor="inherit"
      />
      <InputLeftElement h="full">
        <SearchGlass />
      </InputLeftElement>
      <InputRightElement h="full" as="circle" bg="Blue.200">
        <WhiteCross />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInputHome;
