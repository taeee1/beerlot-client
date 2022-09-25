import {
  Box,
  Button,
  Circle,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { SearchGlass, WhiteCross } from "../../public/svg";
import { SEARCH_BAR_PLACEHOLDER } from "../../Static";
import SearchInput from "./SearchInput";

const SearchBarAutocomplete = () => {
  const [value, setValue] = useState("");
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  const handleClick = (e: React.MouseEvent) => {
    const selectedName = e.currentTarget.textContent;
    router.push(`/result/${selectedName}`);
  };
  const clearInput = () => {
    setValue("");
  };
  const items = [
    {
      id: 0,
      name: "츄로스 랜드",
    },
    {
      id: 1,
      name: "칠성사이다 제로",
    },
    {
      id: 2,
      name: "펩시 제로",
    },
    {
      id: 3,
      name: "맛소금",
    },
    {
      id: 4,
      name: "오예스 미니",
    },
    { id: 5, name: "제로" },
  ];

  return (
    <Flex w="full" direction="column" borderRadius="20px" gap="10px" mt="14px">
      <SearchInput
        value={value}
        handleChange={handleChange}
        clearInput={clearInput}
      />

      <Flex flexDirection="column">
        {items.map((beerInfo) => {
          if (beerInfo.name.includes(value)) {
            return (
              <Box borderBottom="1px solid #DDDDDD" py="20px" px="15px">
                <Text textStyle="h2" key={beerInfo.id} onClick={handleClick}>
                  {beerInfo.name}
                </Text>
              </Box>
            );
          }
          return;
        })}
      </Flex>
    </Flex>
  );
};

export default SearchBarAutocomplete;
