import { useRouter } from "next/router";
import styled from "styled-components";
import { SEARCH_BAR_PLACEHOLDER } from "../../Static";

import { ReactSearchAutocomplete } from "react-search-autocomplete";

const SearchBarHome = () => {
  const items = [{}];
  const router = useRouter();

  const handleOnFocus = () => {
    router.push(`/search`);
  };

  return (
    <SearchBarContainer>
      <ReactSearchAutocomplete
        placeholder={SEARCH_BAR_PLACEHOLDER}
        items={items}
        onFocus={handleOnFocus}
      />
    </SearchBarContainer>
  );
};

const SearchBarContainer = styled.div`
  .wrapper {
    background: #52d5f2;
  }
  svg {
    fill: #fdf9ea;
  }

  input::placeholder {
    font-family: "Roboto";
    font-weight: 700;
    font-size: 12px;
    color: rgba(253, 249, 234, 0.9);
  }
`;

export default SearchBarHome;
