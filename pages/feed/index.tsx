import { useState } from "react";
import FeedTabList from "../../Components/Feed/FeedTabList";
import Tab from "../../Components/Feed/FeedTabList";
import Title from "../../Components/Search/Title";

const Feed = () => {
  return (
    <>
      <Title />
      <FeedTabList />
    </>
  );
};

export default Feed;
