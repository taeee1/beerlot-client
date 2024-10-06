import { MOCK_FEED_FILTER_LIST } from '@/../interface/static'
import { ReviewFilterSort } from '@/../interface/types'
import { RightChevron } from '@/components/shared/CustomIcons/customIcons'
import FilterTag from '@/components/shared/Filters/FilterTag'
import { HStack, Icon, StackProps, Text } from '@chakra-ui/react'
import { ReviewSortType } from '../../../../types/common'

interface FeedFilterProps extends StackProps {
  selectedTag: ReviewSortType
  onClickTag: (tag: ReviewSortType) => void
}

export const FeedFilter: React.FC<FeedFilterProps> = ({
  selectedTag,
  onClickTag,
  ...props
}) => {
  return (
    <>
      {MOCK_FEED_FILTER_LIST.map((filterObj) => {
        const { title, tags } = filterObj
        return (
          <HStack w='full' key={title} py='5px' {...props}>
            <FilterTag tagText={title}>
              <Icon as={RightChevron} w='19px' h='19px' color='black.100' />
            </FilterTag>
            <HStack
              gap={'15px'}
              overflowX={'scroll'}
              className={'hide-scrollbar '}
            >
              {tags.map((tag: ReviewSortType) => {
                const isSelectedTag = selectedTag === tag
                return (
                  <Text
                    flexShrink={0}
                    key={tag}
                    cursor='pointer'
                    textColor={isSelectedTag ? 'black.100' : 'gray.300'}
                    textStyle={isSelectedTag ? 'h4_bold' : 'h4'}
                    onClick={() => onClickTag(tag)}
                  >
                    {ReviewFilterSort[tag]}
                  </Text>
                )
              })}
            </HStack>
          </HStack>
        )
      })}
    </>
  )
}
