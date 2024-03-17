import { Box, Container, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { LeftBackTitle } from "../shared/Headers/LeftBackTitle";

import useKeyboard from "@/../hooks/useKeyboard";
import { SearchBarList } from "../home/Search/SearchBarList";

const SearchBarTemplate = () => {
  const router = useRouter();

  const { isEnterKey } = useKeyboard();
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isEnterKey(e)) {
      router.push(`/result?query=${e.target.value}`);
    }
  };

  const handleClickItem = (name: string, id?: number) => {
    if (id === undefined) return;
    router.push(`/result/details?id=${id}&name=${name}`);
  };

  return (
    <Box w="full" h={"100vh"} bg="gray.100" overflowY={"scroll"}>
      <Container
        w="full"
        bg="white"
        position="relative"
        maxW="450px"
        minH={"100vh"}
      >
        <VStack pt="64px">
          <LeftBackTitle />
          <SearchBarList
            handleClickItem={handleClickItem}
            onKeyPress={handleKeyPress}
          />
        </VStack>
      </Container>
    </Box>
  );
};

export default SearchBarTemplate;
