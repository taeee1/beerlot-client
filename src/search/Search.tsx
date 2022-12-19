import { Box, VStack } from "@chakra-ui/react";
import styled from "styled-components";
import { LeftBackTItle } from "../../common/headers/LeftBackTitle";
import SearchBarAutocomplete from "./SearchBarAutocomplete";

const SearchTemplate = () => {
  return (
    <VStack pt="70px" h="full" w="full">
      <LeftBackTItle />
      <Box
        id="bg-dim"
        h="100%"
        w="100%"
        bg="gray.100" // 뭔지 모르겠음.
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Container>
          <SearchBarAutocomplete />
        </Container>
      </Box>
    </VStack>
  );
};

export const Container = styled.div`
  position: absolute;
  padding: 24px;
  padding-top: 0px;
  background: white;
  width: 100%;
  height: 100%;
  max-width: 550px;
`;

export default SearchTemplate;
