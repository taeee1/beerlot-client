import { CategoryFilterListType } from '../interface/types'

export const checkSelected = (id: number, ids: number[]) => {
  return ids.includes(id)
}

export const checkIsSelectedCategoryTitle = (
  selectedFilters: CategoryFilterListType[],
  targetTitle: string
) => {
  const selectedObj = selectedFilters.find(
    (filter) => filter.title === targetTitle
  )
  if (selectedObj === undefined) return false
  return selectedObj.tags.length > 0
}
