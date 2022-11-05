import React, { useState } from "react";
import styled from "styled-components";

interface SearchFilterTagProps {
  tag: string;
  isOrderCategory: boolean;
  isSelectedOrder: boolean;
  //TODO: any 타입 삭제
  handleSelectOrder: (e: any) => void;
}

const SearchFilterTag: React.FC<SearchFilterTagProps> = ({
  tag,
  isOrderCategory,
  isSelectedOrder,
  handleSelectOrder,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    setIsSelected(!isSelected);
  };

  return (
    <>
      <Container
        isSelected={
          isOrderCategory ? isOrderCategory && isSelectedOrder : isSelected
        }
        onClick={isOrderCategory ? handleSelectOrder : handleSelect}
      >
        {tag}
      </Container>
    </>
  );
};

export default SearchFilterTag;

export const Container = styled.p<{ isSelected: boolean }>`
  font-family: "Roboto";
  font-weight: ${({ isSelected }) => (isSelected ? 700 : 500)};
  font-size: 12px;

  color: ${({ isSelected }) =>
    isSelected ? "black.100" : "rgba(97, 100, 107, 0.5)"};
`;
