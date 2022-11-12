import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import FilterTag from "../search-filter-item/FilterTag";
import SearchFilterItem from "../search-filter-item/SearchFilterItem";

interface SearchFilterListProps {
  onClick: () => void;
  isFilterListOpen: boolean;
}

const SearchFilterList: React.FC<SearchFilterListProps> = ({
  onClick,
  isFilterListOpen,
}) => {
  const categoryList = [
    { title: "좋아요순", tagList: ["좋아요", "별점순", "리뷰많은 순"] },
    { title: "맥주 종류", tagList: ["IPA", "필스너"] },
    { title: "제조국", tagList: ["독일", "미국", "일본"] },
    { title: "도수", tagList: ["논알콜", "3%미만", "3%대"] },
  ];

  return (
    <Box>
      {isFilterListOpen ? (
        <Box px="0px">
          {categoryList.map(({ title, tagList }) => {
            return (
              <SearchFilterItem
                key={`${title}-${tagList.length}`}
                title={title}
                tagList={tagList}
              />
            );
          })}
        </Box>
      ) : (
        <Button px={0} onClick={onClick} bg="white">
          <Flex
            gap="10px"
            p={0}
            flex="1"
            justifyContent="space-between"
            alignItems="center"
          >
            {categoryList.map(({ title, tagList }) => {
              return (
                <FilterTag
                  key={`${title}-${tagList.length}`}
                  title={title}
                  arrowDirection="down"
                />
              );
            })}
          </Flex>
        </Button>
      )}
    </Box>
  );
};

export default SearchFilterList;
