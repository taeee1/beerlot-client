import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { MIN_MAX_BEER_VOLUME_SLIDER } from "../../../../../interface/static";
import {
  CategoryFilterListType,
  CategoryTitle,
} from "../../../../../interface/types";
import { BeerSearchCategoriesForClosedFilter } from "./SearchFilterListCell";
import { SearchFilterListExpanded } from "./SearchFilterListExpanded";

interface SearchFilterListProps {
  isFilterListOpen: boolean;
  selectedFilters: CategoryFilterListType[];
  onClickToggle: () => void;
  onClickTag: (targetTitle: CategoryTitle, targetTag: string) => void;
}

export const SearchFilterList: React.FC<SearchFilterListProps> = ({
  isFilterListOpen,
  selectedFilters,
  onClickToggle,
  onClickTag,
}) => {
  return (
    <Box>
      {isFilterListOpen ? (
        <SearchFilterListExpanded
          selectedFilters={selectedFilters}
          isFilterListOpen={isFilterListOpen}
          onClickToggle={onClickToggle}
          onClickTag={onClickTag}
        />
      ) : (
        <BeerSearchCategoriesForClosedFilter
          selectedFilters={selectedFilters}
          onClickToggle={onClickToggle}
          isFilterListOpen={isFilterListOpen}
        />
      )}
    </Box>
  );
};
