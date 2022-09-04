import React, { useEffect, useState } from "react";
import SearchFilterCategory from "./SearchFilterCategory";
import SearchFilterTag from "./SearchFilterTag";
import styled from "styled-components";

interface SearchFilterItemProps {
  category: {
    title: string;
    tagList: string[];
  };
}

const SearchFilterItem: React.FC<SearchFilterItemProps> = ({ category }) => {
  const { title, tagList } = category;
  const [selectedOrder, setSelectedOrder] = useState("좋아요순");
  const [isSelected, setIsSelected] = useState(false);
  const handleSelect = () => {
    setIsSelected(!isSelected);
  };

  //TODO: any 타입 삭제
  const handleSelectOrder = (e: any) => {
    setSelectedOrder(e.target.innerText);
  };

  return (
    <Container>
      <SearchFilterCategory
        title={title}
        isSelected={isSelected}
        handleSelect={handleSelect}
      />
      <TagContainer>
        {tagList.map((tag) => {
          return (
            <SearchFilterTag
              key={tag}
              tag={tag}
              isOrderCategory={title === "좋아요순"}
              isSelectedOrder={tag === selectedOrder}
              handleSelectOrder={handleSelectOrder}
            />
          );
        })}
      </TagContainer>
    </Container>
  );
};

export default SearchFilterItem;

export const Container = styled.div`
  padding: 5px;
  display: flex;
  border-bottom: 0.3px solid rgba(97, 100, 107, 0.5);

  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  color: #000000;
`;
