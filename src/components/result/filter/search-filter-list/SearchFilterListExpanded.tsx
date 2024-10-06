import { isBeerVolumeWithinRange } from '@/components/home/LoggedInBeersList/beer.service'
import { Box } from '@chakra-ui/react'
import React from 'react'
import { useFetchBeerSearchCategoriesQuery } from '../../../../../hooks/query/useFilterQuery'
import {
  BeerSortEnum,
  CategoryFilterListType,
  CategoryTitle,
} from '../../../../../interface/types'
import { SearchFilterTag } from '../SearchFilterTag/SearchFilterTag'
import {
  SearchFilterRangeRow,
  SearchFilterRowOption,
  SearchFilterRowOptionsWrapper,
  SearchFilterRowWrapper,
} from './SearchFilterListCell'
import { useFetchCountriesQuery } from '../../../../../hooks/query/useCountriesQuery'

interface SearchFilterListExpandedProps {
  isFilterListOpen: boolean
  selectedFilters: CategoryFilterListType[]
  onClickTag: (targetTitle: CategoryTitle, targetTag: string | number) => void
  beerVolume: number[]
  onChangeBeerVolume: (value: number[]) => void
}

export const SearchFilterListExpanded: React.FC<
  SearchFilterListExpandedProps
> = ({
  isFilterListOpen,
  selectedFilters,
  onClickTag,
  beerVolume,
  onChangeBeerVolume,
}) => {
  const { data: beerTypes } = useFetchBeerSearchCategoriesQuery()
  const { data: countreis } = useFetchCountriesQuery()

  const sortTags = {
    좋아요순: BeerSortEnum.MostLikes,
    별점순: BeerSortEnum.HighRate,
    리뷰많은순: BeerSortEnum.MostReviews,
  }
  const selectedSort = selectedFilters.find(
    (filter) => filter.title === CategoryTitle.SORT_CRITERIA
  )
  const selectedBeerType = selectedFilters.find(
    (filter) => filter.title === CategoryTitle.BEER_TYPE
  )

  const selectedCountries = selectedFilters.find(
    (filter) => filter.title === CategoryTitle.BEER_COUNTRY
  )

  return (
    <Box>
      <SearchFilterRowWrapper>
        <SearchFilterTag
          title={'정렬 기준'}
          selectedFilters={selectedFilters}
          isFilterListOpen={isFilterListOpen}
        />
        <SearchFilterRowOptionsWrapper>
          {Object.keys(sortTags).map((tag) => {
            const key = tag as keyof typeof sortTags
            const isSelected = selectedSort?.tags.includes(sortTags[key])
            return (
              <SearchFilterRowOption
                key={key}
                textColor={isSelected ? 'black.100' : 'gray.200'}
                textStyle={isSelected ? 'h4_bold' : 'h4'}
                onClick={() => {
                  onClickTag(CategoryTitle.SORT_CRITERIA, sortTags[key])
                }}
              >
                {key}
              </SearchFilterRowOption>
            )
          })}
        </SearchFilterRowOptionsWrapper>
      </SearchFilterRowWrapper>
      <SearchFilterRowWrapper>
        <SearchFilterRowOptionsWrapper>
          <SearchFilterTag
            title={CategoryTitle.BEER_TYPE}
            selectedFilters={selectedFilters}
            isFilterListOpen={isFilterListOpen}
          />
          {beerTypes?.map(({ name, id }) => {
            const isSelected = selectedBeerType?.tags.includes(id)
            return (
              <SearchFilterRowOption
                key={id}
                textColor={isSelected ? 'black.100' : 'gray.200'}
                textStyle={isSelected ? 'h4_bold' : 'h4'}
                onClick={() => {
                  onClickTag(CategoryTitle.BEER_TYPE, id)
                }}
              >
                {name}
              </SearchFilterRowOption>
            )
          })}
        </SearchFilterRowOptionsWrapper>
      </SearchFilterRowWrapper>
      <SearchFilterRowWrapper>
        <SearchFilterRowOptionsWrapper>
          <SearchFilterTag
            title={CategoryTitle.BEER_COUNTRY}
            selectedFilters={selectedFilters}
            isFilterListOpen={isFilterListOpen}
          />
          {countreis?.map((name) => {
            const isSelected = selectedCountries?.tags.includes(name)
            return (
              <SearchFilterRowOption
                key={name}
                textColor={isSelected ? 'black.100' : 'gray.200'}
                textStyle={isSelected ? 'h4_bold' : 'h4'}
                onClick={() => {
                  onClickTag(CategoryTitle.BEER_COUNTRY, name)
                }}
              >
                {name}
              </SearchFilterRowOption>
            )
          })}
        </SearchFilterRowOptionsWrapper>
      </SearchFilterRowWrapper>

      <SearchFilterRowWrapper>
        <SearchFilterTag
          title={'도수'}
          selectedFilters={selectedFilters}
          isFilterListOpen={isFilterListOpen}
          isSelected={isBeerVolumeWithinRange(beerVolume)}
        />
        <SearchFilterRowOptionsWrapper>
          <SearchFilterRangeRow
            beerVolume={beerVolume}
            onChange={onChangeBeerVolume}
          />
        </SearchFilterRowOptionsWrapper>
      </SearchFilterRowWrapper>
    </Box>
  )
}
