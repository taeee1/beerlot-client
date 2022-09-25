import { Box } from "@chakra-ui/react";
import styled from "styled-components";
import SearchBarAutocomplete from "../../Components/Search/SearchBarAutocomplete";
import Title from "../../Components/Search/Title";

const search = () => {
  return (
    <Box
      id="bg-dim"
      h="100vh"
      bg="Gray.100"
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

export default search;
