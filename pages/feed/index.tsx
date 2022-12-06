import { TitleRightBellHeader } from "../../common/headers/TitleRightBell";
import { ReviewModal } from "../../common/ReviewModal";
import FeedTabList from "../../src/feed/FeedTabList";

const Feed = () => {
  return (
    <>
      <TitleRightBellHeader />
      <FeedTabList />
      <ReviewModal />
    </>
  );
};

export default Feed;
