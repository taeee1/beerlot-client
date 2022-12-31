import {Box, HStack, Text} from "@chakra-ui/react";
import React from "react";
import FilterTag from "../../../../common/Filters/FilterTag";
import {CategoryFilterListType} from "../../../../interface/types";
import {checkIsSelectedCategoryTitle} from "../../../../utils/array";

interface SearchFilterListProps {
  isFilterListOpen: boolean;
  filterList: CategoryFilterListType[];
  selectedFilters: CategoryFilterListType[];
  onClickToggle: () => void;
  onClickTag: (targetTitle: string, targetTag: string) => void;
}

const SearchFilterList: React.FC<SearchFilterListProps> = ({
  isFilterListOpen,
  filterList,
  selectedFilters,
  onClickToggle,
  onClickTag,
}) => {
  const getFilterTagStyles = (targetTitle: string) => {
    return {
      tagStyle: {
        h: "full",
        bg: checkIsSelectedCategoryTitle(selectedFilters, targetTitle)
          ? "yellow.300"
          : "yellow.200",
      },
      textStyle: {
        textColor: "black.100",
        textStyle: "h4",
      },
    };
  };

  const getFilterRowStyles = (targetTitle: string, targetTag: string) => {
    let isSelected = false;
    const selectedObjList = selectedFilters.filter(
      (item) => item.title === targetTitle
    );
    if (
      selectedObjList.length > 0 &&
      selectedObjList[0].tags.includes(targetTag)
    ) {
      isSelected = true;
    }
    return {
      textStyle: {
        bg: "none",
        textColor: isSelected ? "black.100" : "gray.200",
        textStyle: isSelected ? "h4_bold" : "h4",
      },
    };
  };

  return (
    <Box>
      {isFilterListOpen ? (
        <Box>
          {filterList.map((filterObj) => {
            const {title, tags} = filterObj;
            return (
              <HStack w="full" key={title}>
                <FilterTag
                  tagText={title}
                  filterTagStyles={getFilterTagStyles(title)}
                />
                <HStack gap={"15px"} overflowX={"scroll"}>
                  {tags.map((tag: string) => {
                    return (
                      <Text
                        key={tag}
                        {...getFilterRowStyles(title, tag).textStyle}
                        onClick={() => onClickTag(title, tag)}
                      >
                        {tag}
                      </Text>
                    );
                  })}
                </HStack>
              </HStack>
            );
          })}
        </Box>
      ) : (
        <HStack>
          {filterList.map((filterObj) => {
            const {title} = filterObj;
            return (
              <FilterTag
                onClick={onClickToggle}
                key={title}
                tagText={title}
                filterTagStyles={getFilterTagStyles(title)}
              />
            );
          })}
        </HStack>
      )}
    </Box>
  );
};

export default SearchFilterList;
