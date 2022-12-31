import { HStack, Icon, StackProps, Text, TextProps } from "@chakra-ui/react";
import React from "react";

interface FilterTagProps {
  filterTagStyles?: {
    tagStyle?: StackProps;
    textStyle?: TextProps;
    IconProp?: any;
  };
  tagText: string;
  onClick?: () => void;
}

const FilterTag: React.FC<FilterTagProps> = ({
  filterTagStyles,
  tagText,
  onClick,
}) => {
  return (
    // tagList가 늘어날 때 확인해야함
    // h이 살짝 남는 이슈 fix 해야 함.
    <HStack
      {...filterTagStyles?.tagStyle}
      borderRadius="15px"
      pl="5px"
      onClick={onClick}
    >
      {filterTagStyles?.IconProp && <Icon as={filterTagStyles?.IconProp} />}
      <Text {...filterTagStyles?.textStyle}>{tagText}</Text>
    </HStack>
  );
};

export default FilterTag;
