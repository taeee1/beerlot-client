import {
  DownChevron,
  RightChevron,
} from "@/components/shared/CustomIcons/customIcons";
import FilterTag from "@/components/shared/Filters/FilterTag";
import { ButtonProps, Icon } from "@chakra-ui/react";
import React from "react";
import { CategoryFilterListType } from "../../../../../interface/types";
import { checkIsSelectedCategoryTitle } from "../../../../../utils/array";

interface SearchFilterTagProps extends ButtonProps {
  title: string;
  selectedFilters: CategoryFilterListType[];
  isFilterListOpen: boolean;
  onClick?: () => void;
}

const SearchFilterTag: React.FC<SearchFilterTagProps> = ({
  title,
  selectedFilters,
  isFilterListOpen,
  onClick,
  ...props
}) => {
  return (
    <FilterTag
      tagText={title}
      borderRadius="15px"
      pl="5px"
      px={"0px"}
      py="1.5px"
      h="full"
      alignItems={"center"}
      justifyContent={"center"}
      bg={
        checkIsSelectedCategoryTitle(selectedFilters, title)
          ? "yellow.300"
          : "yellow.200"
      }
      onClick={onClick}
      flexShrink={0}
      {...props}
    >
      <Icon
        as={isFilterListOpen ? RightChevron : DownChevron}
        w="19px"
        h="19px"
        color="black.100"
      />
    </FilterTag>
  );
};

export { SearchFilterTag };
