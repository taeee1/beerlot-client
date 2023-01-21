import {CategoryFilterListType} from "../interface/types";

export const checkSelectedFilter = (
  selectedFilters: CategoryFilterListType[],
  targetTitle: string,
  targetTag: string
) => {
  let isSelected = false;
  const selectedObjList = selectedFilters.filter(
    (item) => item.title === targetTitle
  );
  if (
    selectedObjList.length > 0 &&
    selectedObjList[0].tags.includes(targetTag)
  ) {
    isSelected = true;
  }
  return isSelected;
};
