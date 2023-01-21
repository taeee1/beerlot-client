import {Box, ButtonProps, HStack, Icon, Text} from "@chakra-ui/react";
import React from "react";
import {
  DownChevron,
  RightChevron,
} from "../../../../common/custom-icons/customIcons";
import FilterTag from "../../../../common/Filters/FilterTag";
import {CategoryFilterListType} from "../../../../interface/types";
import {checkIsSelectedCategoryTitle} from "../../../../utils/array";
import {checkSelectedFilter} from "../../../../service/filter";

interface SearchFilterListProps {
  isFilterListOpen: boolean;
  filterList: CategoryFilterListType[];
  selectedFilters: CategoryFilterListType[];
  onClickToggle: () => void;
  onClickTag: (targetTitle: string, targetTag: string) => void;
}

export const SearchFilterList: React.FC<SearchFilterListProps> = ({
  isFilterListOpen,
  filterList,
  selectedFilters,
  onClickToggle,
  onClickTag,
}) => {
  return (
    <Box>
      {isFilterListOpen ? (
        <Box>
          {filterList.map((filterObj) => {
            const {title, tags} = filterObj;
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
                  gap={"15px"}
                  overflowX={"scroll"}
                  sx={{
                    "::-webkit-scrollbar": {
                      display: "none",
                    },
                  }}
                >
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

interface SearchFilterTagProps extends ButtonProps {
  title: string;
  selectedFilters: CategoryFilterListType[];
  isFilterListOpen: boolean;
  onClick?: () => void;
}

export const SearchFilterTag: React.FC<SearchFilterTagProps> = ({
  title,
  selectedFilters,
  isFilterListOpen,
  onClick,
  ...props
}) => {
  return (
    <FilterTag
      {...props}
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
