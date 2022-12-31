import { CategoryFilterListType } from "../interface/types";

export const isSelected = (id: number, ids: number[]) => {
  return ids.includes(id);
};

export const isSelectedString = (string: string, stringList: string[]) => {
  return stringList.includes(string);
};

export const checkIsSelectedCategoryTitle = (
  selectedFilters: CategoryFilterListType[],
  targetTitle: string
) => {
  const titleList = selectedFilters.map((item) => item.title);
  return isSelectedString(targetTitle, titleList);
};
