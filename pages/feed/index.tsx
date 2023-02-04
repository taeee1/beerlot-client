import {ReviewResponseType} from "../../interface/server/types/Review";
import {FeedTemplate} from "../../src/feed/FeedTemplate";

// export async function getServerSideProps() {
//   // const res = await fetch(`https://.../data`);
//   // const data = await res.json();
//   const res = await getAllReviewApi({});
//   // Pass data to the page via props
//   return {props: {res}};
// }

const Feed = () => {
  return <FeedTemplate />;
};

export default Feed;
