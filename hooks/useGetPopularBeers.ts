import {useCallback, useEffect} from "react";
import {useRecoilState} from "recoil";
import {getTop10BeersApi} from "../src/api/beers/api";
import {top10BeersState} from "../src/store/atom";

const useGetPopularBeers = () => {
  const [top10Beers, setTop10Beers] = useRecoilState(top10BeersState);

  const getTopBeers = useCallback(async () => {
    const data = await getTop10BeersApi();
    if (data === undefined) {
      console.error("getTop10BeersApi is undefined");
      return;
    }
    setTop10Beers(data);
  }, [setTop10Beers]);

  useEffect(() => {
    getTopBeers();
  }, [getTopBeers]);

  return {
    top10Beers,
  };
};
export default useGetPopularBeers;
