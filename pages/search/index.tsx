import React from "react";
import styled from "styled-components";
import SearchBar from "../../Components/Search/SearchBar";
import SearchBarAutocomplete from "../../Components/Search/SearchBarAutocomplete";
import SearchResult from "../../Components/Search/SearchResult";
import Title from "../../Components/Search/Title";

const search = () => {
  return (
    <Container>
      <Title />
      <SearchBar />
      <SearchBarAutocomplete />
    </Container>
  );
};

export const Container = styled.div`
  padding: 24px;
`;

export default search;
