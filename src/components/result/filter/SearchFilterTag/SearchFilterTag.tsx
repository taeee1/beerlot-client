import {
  DownChevron,
  RightChevron,
} from '@/components/shared/CustomIcons/customIcons'
import FilterTag from '@/components/shared/Filters/FilterTag'
import { Box, ButtonProps, Icon } from '@chakra-ui/react'
import React from 'react'
import { CategoryFilterListType } from '../../../../../interface/types'
import { checkIsSelectedCategoryTitle } from '../../../../../utils/array'

interface SearchFilterTagProps extends ButtonProps {
  title: string
  selectedFilters: CategoryFilterListType[]
  isFilterListOpen: boolean
  onClick?: () => void
  isSelected?: boolean
}

const SearchFilterTag: React.FC<SearchFilterTagProps> = ({
  title,
  selectedFilters,
  isFilterListOpen,
  onClick,
  isSelected,
  ...props
}) => {
  const selected =
    isSelected === undefined
      ? checkIsSelectedCategoryTitle(selectedFilters, title)
      : isSelected

  return (
    <Box position='sticky' left={0} bg='white' zIndex={1}>
      <FilterTag
        tagText={title}
        bg={selected ? 'yellow.300' : 'yellow.200'}
        onClick={onClick}
        flexShrink={0}
        {...props}
      >
        <Icon
          as={isFilterListOpen ? RightChevron : DownChevron}
          w={5}
          h={5}
          color='black.100'
        />
      </FilterTag>
    </Box>
  )
}

export { SearchFilterTag }
