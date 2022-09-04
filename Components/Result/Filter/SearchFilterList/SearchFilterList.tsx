import React from "react";

import SearchFilterItem from "../SearchFilterItem/SearchFilterItem";

const SearchFilterList = () => {
  const categoryList = [
    { title: "좋아요순", tagList: ["좋아요", "별점순", "리뷰많은 순"] },
    { title: "맥주 종류", tagList: ["IPA", "필스너"] },
    { title: "제조국", tagList: ["독일", "미국", "일본"] },
    { title: "도수", tagList: ["논알콜", "3%미만", "3%대"] },
  ];
  return (
    <>
      {categoryList.map((category) => {
        return <SearchFilterItem key={category.title} category={category} />;
      })}
    </>
  );
};

export default SearchFilterList;
