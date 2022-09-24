import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { SEARCH_BAR_PLACEHOLDER } from "../../Static";

const SearchBarAutocomplete = () => {
  const [value, setValue] = useState("");
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  const handleClick = (e: React.MouseEvent) => {
    const selectedName = e.currentTarget.textContent;
    router.push(`/result/${selectedName}`);
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
    <Flex pt="48" justify="center" align="center" w="full" direction="column">
      <FormControl id="email" w="60">
        <Input
          placeholder={SEARCH_BAR_PLACEHOLDER}
          size="sm"
          value={value}
          onChange={handleChange}
          autoFocus
        />
      </FormControl>
      <Flex flexDirection="column">
        {items.map((beerInfo) => {
          if (beerInfo.name.includes(value)) {
            return (
              <Text key={beerInfo.id} onClick={handleClick}>
                {beerInfo.name}
              </Text>
            );
          }
          return;
        })}
      </Flex>
    </Flex>
  );
};

export default SearchBarAutocomplete;
