import {MOCK_FEED_FILTER_LIST} from "@/../interface/static";
import {ReviewFilterSort, ReviewSortEnum} from "@/../interface/types";
import {RightChevron} from "@/components/shared/CustomIcons/customIcons";
import FilterTag from "@/components/shared/Filters/FilterTag";
import {HStack, Icon, StackProps, Text} from "@chakra-ui/react";

interface FeedFilterProps extends StackProps {
  selectedTag: ReviewSortEnum;
  onClickTag: (tag: ReviewSortEnum) => void;
}

export const FeedFilter: React.FC<FeedFilterProps> = ({
  selectedTag,
  onClickTag,
  ...props
}) => {
  return (
    <>
      {MOCK_FEED_FILTER_LIST.map((filterObj) => {
        const {title, tags} = filterObj;
        return (
          <HStack w="full" key={title} py="5px" {...props}>
            <FilterTag
              tagText={title}
              borderRadius="15px"
              pl="5px"
              px={"0px"}
              py="1.5px"
              h="full"
              alignItems={"center"}
              justifyContent={"center"}
              bg={"yellow.300"}
            >
              <Icon as={RightChevron} w="19px" h="19px" color="black.100" />
            </FilterTag>
            <HStack
              gap={"15px"}
              overflowX={"scroll"}
              sx={{
                "::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {tags.map((tag: ReviewSortEnum) => {
                const isSelectedTag = selectedTag === tag;
                return (
                  <Text
                    flexShrink={0}
                    key={tag}
                    cursor="pointer"
                    textColor={isSelectedTag ? "black.100" : "gray.300"}
                    textStyle={isSelectedTag ? "h4_bold" : "h4"}
                    onClick={() => onClickTag(tag)}
                  >
                    {ReviewFilterSort[tag]}
                  </Text>
                );
              })}
            </HStack>
          </HStack>
        );
      })}
    </>
  );
};
