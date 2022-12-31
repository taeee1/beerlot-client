import {HStack, StackProps, Text, TextProps} from "@chakra-ui/react";
import React from "react";
import {CategoryFilterListType} from "../../interface/types";
import FilterTag from "./FilterTag";

interface FilterRowProps {
  filterList: CategoryFilterListType;
  filterTagStyles?: {
    tagStyle?: StackProps;
    textStyle?: TextProps;
    IconProp?: any;
  };
  filterRowStyles?: {
    textStyle?: TextProps;
  };
}

const FilterRow: React.FC<FilterRowProps> = ({
  filterList,
  filterTagStyles,
  filterRowStyles,
}) => {
  return (
    <HStack w="full">
      <FilterTag tagText={filterList.title} filterTagStyles={filterTagStyles} />
      <HStack gap={"15px"} overflowX={"scroll"}>
        {/* {filterList.tagList.map((text) => {
          return (
            <Text
              {...filterRowStyles?.textStyle}
              key={text}
              border="1px solid pink"
            >
              {text}
            </Text>
          );
        })} */}
      </HStack>
    </HStack>
  );
};

export default FilterRow;
