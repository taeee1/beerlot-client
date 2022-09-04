import React from "react";
import styled from "styled-components";

interface SearchFilterCategoryProps {
  title: string;
  isSelected: boolean;
  handleSelect: () => void;
}

const SearchFilterCategory: React.FC<SearchFilterCategoryProps> = ({
  title,
  isSelected,
  handleSelect,
}) => {
  return (
    <TagContainer isSelected={isSelected} onClick={handleSelect}>
      {title}
    </TagContainer>
  );
};

export default SearchFilterCategory;

export const TagContainer = styled.button<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  border: none;

  height: 22px;

  background: ${({ isSelected }) =>
    isSelected ? "#fad12b" : "rgba(255, 229, 128, 0.8)"};
  border-radius: 15px;

  font-family: "Roboto";
  font-size: 12px;
`;
