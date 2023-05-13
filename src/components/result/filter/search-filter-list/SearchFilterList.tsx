import {Box, HStack, Text} from "@chakra-ui/react";
import React, {useState} from "react";
import {MIN_MAX_BEER_VOLUME_SLIDER} from "../../../../../interface/static";
import {
  CategoryFilterListType,
  CategoryTitle,
} from "../../../../../interface/types";
import {checkSelectedFilter} from "../../../../../service/filter";
import {VolumeSlider} from "../../../shared/Filters/VolumeSlider";
import {SearchFilterTag} from "../SearchFilterTag/SearchFilterTag";

interface SearchFilterListProps {
  isFilterListOpen: boolean;
  filterList: CategoryFilterListType[];
  selectedFilters: CategoryFilterListType[];
  onClickToggle: () => void;
  onClickTag: (targetTitle: CategoryTitle, targetTag: string) => void;
}

export const SearchFilterList: React.FC<SearchFilterListProps> = ({
  isFilterListOpen,
  filterList,
  selectedFilters,
  onClickToggle,
  onClickTag,
}) => {
  const [beerVolume, setBeerVolume] = useState<number[]>([
    MIN_MAX_BEER_VOLUME_SLIDER[0],
    MIN_MAX_BEER_VOLUME_SLIDER[1],
  ]);
  return (
    <Box>
      {isFilterListOpen ? (
        <Box>
          {filterList.map((filterObj) => {
            const {title, tags, isRange} = filterObj;
            return (
              <HStack
                w="full"
                key={title}
                py="5px"
                borderBottom={"1px solid"}
                borderBottomColor="gray.200"
              >
                <SearchFilterTag
                  title={title}
                  selectedFilters={selectedFilters}
                  isFilterListOpen={isFilterListOpen}
                  flexShrink={0}
                />
                <HStack
                  w="full"
                  gap={isRange ? "4px" : "15px"}
                  overflowX={"scroll"}
                  sx={{
                    "::-webkit-scrollbar": {
                      display: "none",
                    },
                  }}
                >
                  {isRange ? (
                    <>
                      <Text mr="4px" textStyle={"h4"} textColor="gray.300">
                        {beerVolume[0]}%
                      </Text>
                      <VolumeSlider
                        min={MIN_MAX_BEER_VOLUME_SLIDER[0]}
                        max={MIN_MAX_BEER_VOLUME_SLIDER[1]}
                        value={beerVolume}
                        onChange={setBeerVolume}
                        colorScheme="blue"
                        w="full"
                        trackColor="gray.200"
                      />
                      <Text mr="4px" textStyle={"h4"} textColor="gray.300">
                        {beerVolume[1]}%
                      </Text>
                    </>
                  ) : (
                    <>
                      {tags.map((tag: string) => {
                        return (
                          <Text
                            flexShrink={0}
                            key={tag}
                            cursor="pointer"
                            textColor={
                              checkSelectedFilter(selectedFilters, title, tag)
                                ? "black.100"
                                : "gray.200"
                            }
                            textStyle={
                              checkSelectedFilter(selectedFilters, title, tag)
                                ? "h4_bold"
                                : "h4"
                            }
                            onClick={() => {
                              onClickTag(title, tag);
                            }}
                          >
                            {tag}
                          </Text>
                        );
                      })}
                    </>
                  )}
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
              <SearchFilterTag
                key={title}
                title={title}
                selectedFilters={selectedFilters}
                onClick={onClickToggle}
                isFilterListOpen={isFilterListOpen}
              />
            );
          })}
        </HStack>
      )}
    </Box>
  );
};
