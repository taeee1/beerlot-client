import React from "react";
import { Box } from "@chakra-ui/react";
import styled from "styled-components";
import Title from "./Title";
import SearchBarAutocomplete from "./SearchBarAutocomplete";

const Search = () => {
  return (
    <Box
      id="bg-dim"
      h="100vh"
      bg="gray.100" // 뭔지 모르겠음.
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Container>
        <Title />
        <SearchBarAutocomplete />
      </Container>
    </Box>
  );
};

export const Container = styled.div`
  padding: 24px;
  background: white;
  width: 100%;
  height: 100%;
  max-width: 550px;
`;

export default Search;
