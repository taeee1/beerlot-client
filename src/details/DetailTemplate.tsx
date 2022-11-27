import { DetailInfo } from "./DetailInfo";

export const DetailTemplate = () => {
  const beerName = "버드와이저"; // mock data
  const volume = 4.4; // mock data
  const category = "라거"; // mock data
  const country = "미국"; // mock data
  const MOCK_IMAGE_SRC = "https://picsum.photos/seed/picsum/200/300"; // mock data
  return (
    <>
      <DetailInfo
        beerName={beerName}
        volume={volume}
        category={category}
        country={country}
        beerImg={MOCK_IMAGE_SRC}
      />
    </>
  );
};
