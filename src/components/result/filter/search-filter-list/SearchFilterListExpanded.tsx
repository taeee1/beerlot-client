import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  MIN_MAX_BEER_VOLUME_SLIDER,
  MOCK_CATEGORY_FILTER_LIST,
} from "../../../../../interface/static";
import {
  BeerSortEnum,
  CategoryFilterListType,
  CategoryTitle,
} from "../../../../../interface/types";
import { checkSelectedFilter } from "../../../../../service/filter";
import { SearchFilterTag } from "../SearchFilterTag/SearchFilterTag";
import {
  SearchFilterRangeRow,
  SearchFilterRowOption,
  SearchFilterRowOptionsWrapper,
  SearchFilterRowWrapper,
} from "./SearchFilterListCell";

interface SearchFilterListExpandedProps {
  isFilterListOpen: boolean;
  selectedFilters: CategoryFilterListType[];
  onClickToggle: () => void;
  onClickTag: (targetTitle: CategoryTitle, targetTag: string) => void;
}

export const SearchFilterListExpanded: React.FC<
  SearchFilterListExpandedProps
> = ({ isFilterListOpen, selectedFilters, onClickToggle, onClickTag }) => {
  const [beerVolume, setBeerVolume] = useState<number[]>([
    MIN_MAX_BEER_VOLUME_SLIDER[0],
    MIN_MAX_BEER_VOLUME_SLIDER[1],
  ]);
  const sortTags = {
    좋아요순: BeerSortEnum.MostLikes,
    별점순: BeerSortEnum.HighRate,
    리뷰많은순: BeerSortEnum.MostReviews,
  };
  const selectedSort = selectedFilters.find(
    (filter) => filter.title === CategoryTitle.SORT_CRITERIA
  );

  return (
    <Box>
      <SearchFilterRowWrapper>
        <SearchFilterTag
          title={"정렬 기준"}
          selectedFilters={selectedFilters}
          isFilterListOpen={isFilterListOpen}
          flexShrink={0}
        />
        <SearchFilterRowOptionsWrapper>
          {Object.keys(sortTags).map((tag) => {
            const key = tag as keyof typeof sortTags;
            const isSelected = selectedSort?.tags.includes(sortTags[key]);
            return (
              <SearchFilterRowOption
                key={key}
                textColor={isSelected ? "black.100" : "gray.200"}
                textStyle={isSelected ? "h4_bold" : "h4"}
                onClick={() => {
                  onClickTag(CategoryTitle.SORT_CRITERIA, sortTags[key]);
                }}
              >
                {key}
              </SearchFilterRowOption>
            );
          })}
        </SearchFilterRowOptionsWrapper>
      </SearchFilterRowWrapper>
      {MOCK_CATEGORY_FILTER_LIST.map((filterObj) => {
        const { title, tags } = filterObj;
        return (
          <SearchFilterRowWrapper key={title}>
            <SearchFilterTag
              title={title}
              selectedFilters={selectedFilters}
              isFilterListOpen={isFilterListOpen}
              flexShrink={0}
            />
            <SearchFilterRowOptionsWrapper>
              {tags.map((tag: string) => {
                const isSelected = checkSelectedFilter(
                  selectedFilters,
                  title,
                  tag
                );
                return (
                  <SearchFilterRowOption
                    key={tag}
                    textColor={isSelected ? "black.100" : "gray.200"}
                    textStyle={isSelected ? "h4_bold" : "h4"}
                    onClick={() => {
                      onClickTag(title, tag);
                    }}
                  >
                    {tag}
                  </SearchFilterRowOption>
                );
              })}
            </SearchFilterRowOptionsWrapper>
          </SearchFilterRowWrapper>
        );
      })}
      <SearchFilterRowWrapper>
        <SearchFilterTag
          title={"도수"}
          selectedFilters={selectedFilters}
          isFilterListOpen={isFilterListOpen}
          flexShrink={0}
        />
        <SearchFilterRowOptionsWrapper>
          <SearchFilterRangeRow
            beerVolume={beerVolume}
            onChange={setBeerVolume}
          />
        </SearchFilterRowOptionsWrapper>
      </SearchFilterRowWrapper>
    </Box>
  );
};
