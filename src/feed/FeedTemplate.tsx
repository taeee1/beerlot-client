import React from "react";
import { TitleRightBellHeader } from "../../common/headers/TitleRightBell";
import { ReviewModal } from "../../common/ReviewModal";
import FeedTabList from "./FeedTabList";

export const FeedTemplate = () => {
  return (
    <>
      <TitleRightBellHeader />
      <FeedTabList />
      <ReviewModal />
    </>
  );
};
