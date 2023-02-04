import {useCallback, useEffect} from "react";
import {useRecoilState} from "recoil";
import {getTop10BeersApi} from "../src/api/beers/api";
import {recommendedBeersState} from "../src/store/atom";

const useRecommendBeers = () => {
  const [recommendBeers, setRecommendBeers] = useRecoilState(
    recommendedBeersState
  );

  const getRecommendedBeers = useCallback(async () => {
    // TODO: 추천 beers로 수정해야 함.
    const data = await getTop10BeersApi();
    if (data === undefined) {
      console.error("getTop10BeersApi is undefined");
      return;
    }
    setRecommendBeers(data);
  }, [setRecommendBeers]);

  useEffect(() => {
    getRecommendedBeers();
  }, [getRecommendedBeers]);

  return {
    recommendBeers,
  };
};
export default useRecommendBeers;
