import { Box, VStack } from "@chakra-ui/react";
import styled from "styled-components";
import { LeftBackTItle } from "../../common/custom-icons/headers/LeftBackTItle";
import SearchBarAutocomplete from "./SearchBarAutocomplete";

const SearchTemplate = () => {
  return (
    <VStack pt="70px">
      <LeftBackTItle />
      <Box
        id="bg-dim"
        h="100vh"
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
