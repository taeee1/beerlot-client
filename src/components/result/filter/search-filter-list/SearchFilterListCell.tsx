import { HStack, StackProps, Text, TextProps } from "@chakra-ui/react";
import React from "react";
import {
  MIN_MAX_BEER_VOLUME_SLIDER,
  MOCK_CATEGORY_FILTER_TITLE,
} from "../../../../../interface/static";
import {
  CategoryFilterListType,
  CategoryTitle,
} from "../../../../../interface/types";
import { VolumeSlider } from "../../../shared/Filters/VolumeSlider";
import { SearchFilterTag } from "../SearchFilterTag/SearchFilterTag";
import { isBeerVolumeWithinRange } from "@/components/home/LoggedInBeersList/beer.service";

export const SearchFilterRowWrapper: React.FC<StackProps> = ({ children }) => {
  return (
    <HStack
      w="full"
      py="5px"
      borderBottom={"1px solid"}
      borderBottomColor="gray.200"
    >
      {children}
    </HStack>
  );
};

export const SearchFilterRowOptionsWrapper: React.FC<StackProps> = ({
  children,
}) => {
  return (
    <HStack
      w="full"
      gap={"4px"}
      overflowX={"scroll"}
      sx={{
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {children}
    </HStack>
  );
};

interface SearchFilterRangeRowProps {
  beerVolume: number[];
  onChange: (value: number[]) => void;
}

export const SearchFilterRangeRow: React.FC<SearchFilterRangeRowProps> = ({
  beerVolume,
  onChange,
}) => {
  return (
    <>
      <Text mr="4px" textStyle={"h4"} textColor="gray.300">
        {beerVolume[0]}%
      </Text>
      <VolumeSlider
        min={MIN_MAX_BEER_VOLUME_SLIDER[0]}
        max={MIN_MAX_BEER_VOLUME_SLIDER[1]}
        value={beerVolume}
        onChange={onChange}
        colorScheme="blue"
        w="full"
        trackColor="gray.200"
      />
      <Text mr="4px" textStyle={"h4"} textColor="gray.300">
        {beerVolume[1]}%
      </Text>
    </>
  );
};

export const SearchFilterRowOption: React.FC<TextProps> = ({
  children,
  ...props
}) => {
  return (
    <Text flexShrink={0} cursor="pointer" {...props}>
      {children}
    </Text>
  );
};
interface BeerSearchCategoriesForClosedFilterProps {
  isFilterListOpen: boolean;
  selectedFilters: CategoryFilterListType[];
  onClickToggle: () => void;
  beerVolume: number[];
}

export const BeerSearchCategoriesForClosedFilter: React.FC<
  BeerSearchCategoriesForClosedFilterProps
> = ({ isFilterListOpen, selectedFilters, onClickToggle, beerVolume }) => {
  return (
    <HStack>
      {MOCK_CATEGORY_FILTER_TITLE.map((title) => {
        return (
          <SearchFilterTag
            key={title}
            title={title}
            selectedFilters={selectedFilters}
            onClick={onClickToggle}
            isFilterListOpen={isFilterListOpen}
            isSelected={
              title === CategoryTitle.BEER_DEGREE
                ? isBeerVolumeWithinRange(beerVolume)
                : undefined
            }
          />
        );
      })}
    </HStack>
  );
};
