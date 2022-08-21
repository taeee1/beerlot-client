import { ReactSearchAutocomplete } from "react-search-autocomplete";
import styled from "styled-components";
import { SEARCH_BAR_PLACEHOLDER } from "../../Static";

const SearchBar = () => {
  const items = [
    {
      id: 0,
      name: "Yeonwoo",
    },
    {
      id: 1,
      name: "Youjin",
    },
    {
      id: 2,
      name: "Taehee",
    },
    {
      id: 3,
      name: "PHP",
    },
    {
      id: 4,
      name: "Java",
    },
  ];

  // const handleOnSearch = (string, results) => {
  //    onSearch will have as the first callback parameter
  //    the string searched and for the second the results.
  //   console.log(string, results);
  // };

  // const handleOnHover = (result) => {
  //    the item hovered
  //   console.log(result);
  // };

  // const handleOnSelect = () => {
  //   <Link href="/search" />;
  // };

  const handleOnFocus = () => {};

  // const formatResult = (item) => {
  //   return (
  //     <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
  //   );
  // };

  return (
    <>
      <SearchBarContainer>
        <ReactSearchAutocomplete
          placeholder={SEARCH_BAR_PLACEHOLDER}
          items={items}
          onFocus={handleOnFocus}
          autoFocus
        />
      </SearchBarContainer>
    </>
  );
};

const SearchBarContainer = styled.div`
  margin-top: 10px;

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

export default SearchBar;
