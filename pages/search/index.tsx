import React from "react";
import styled from "styled-components";
import SearchBar from "../../Components/Search/SearchBar";
import SearchResult from "../../Components/Search/SearchResult";
import Title from "../../Components/Search/Title";

const search = () => {
  return (
    <Container>
      <Title />
      <SearchBar />
      <SearchResult />
    </Container>
  );
};

export const Container = styled.div`
  padding: 24px;
`;

export default search;
