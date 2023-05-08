import {Box, Container, VStack} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {LeftBackTitle} from "../shared/Headers/LeftBackTitle";

import {SearchBarList} from "../home/Search/SearchBarList";

const SearchBarTemplate = () => {
  const router = useRouter();

  const handleClickItem = (name: string, id?: number) => {
    if (id === undefined) return;
    router.push(`/result/details?id=${id}&name=${name}`);
  };

  return (
    <Box w="full" h="full" bg="gray.100">
      <Container h="full" w="full" bg="white" position="relative" maxW="450px">
        <VStack pt="64px">
          <LeftBackTitle />
          <SearchBarList handleClickItem={handleClickItem} />
        </VStack>
      </Container>
    </Box>
  );
};

export default SearchBarTemplate;
