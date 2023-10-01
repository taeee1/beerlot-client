import { Box } from "@chakra-ui/react";
import React from "react";
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
  onClickTag: (targetTitle: CategoryTitle, targetTag: string | number) => void;
  beerVolume: number[];
  onChangeBeerVolume: (value: number[]) => void;
}

export const SearchFilterList: React.FC<SearchFilterListProps> = ({
  isFilterListOpen,
  selectedFilters,
  onClickToggle,
  onClickTag,
  beerVolume,
  onChangeBeerVolume,
}) => {
  return (
    <Box>
      {isFilterListOpen ? (
        <SearchFilterListExpanded
          selectedFilters={selectedFilters}
          isFilterListOpen={isFilterListOpen}
          onClickTag={onClickTag}
          beerVolume={beerVolume}
          onChangeBeerVolume={onChangeBeerVolume}
        />
      ) : (
        <BeerSearchCategoriesForClosedFilter
          selectedFilters={selectedFilters}
          onClickToggle={onClickToggle}
          isFilterListOpen={isFilterListOpen}
          beerVolume={beerVolume}
        />
      )}
    </Box>
  );
};
