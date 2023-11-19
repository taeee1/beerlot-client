import Cookies from "js-cookie";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUserInfoQuery } from "../hooks/query/useUserQuery";
import { filterAccessToken } from "../service/auth";
import HomeTemplate from "../src/components/home/HomeTemplate";

const Home: NextPage = () => {
  const router = useRouter();
  const isSignedUp = router.query.is_signed_up;
  const queryAccessToken = router.query.access_token;
  const cookieAccessToken = Cookies.get("beerlot-oauth-auth-request");
  const accessToken = filterAccessToken(cookieAccessToken, queryAccessToken);
  const userQuery = useUserInfoQuery(accessToken);

  useEffect(() => {
    if (isSignedUp === "false" && typeof queryAccessToken === "string") {
      Cookies.set("beerlot-oauth-auth-guest", queryAccessToken);
      router.push("/signup");
      return;
    }

    if (isSignedUp === "true" && typeof queryAccessToken === "string") {
      Cookies.set("beerlot-oauth-auth-request", queryAccessToken);
      return;
    }
  }, [queryAccessToken, isSignedUp, router]);

  useEffect(() => {
    if (!!queryAccessToken) {
      userQuery.refetch();
      return;
    }
  }, [queryAccessToken]);

  useEffect(() => {
    if (cookieAccessToken) {
      userQuery.refetch();
      return;
    }
  }, [cookieAccessToken]);

  return (
    <>
      <Head>
        <title>Beerlot</title>
        <meta
          name="description"
          content="편의점 맥주 검색, 리뷰, 별점 등을 통해 다양한 편의점 맥주를 즐길 수 있는 웹사이트입니다."
        />
        <meta
          name="keywords"
          content="편의점 맥주, 맥주 리뷰, 맥주 별점, 편의점 맥주 검색, 편의점 맥주 필터링"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeTemplate username={userQuery?.data?.username} />
    </>
  );
};

export default Home;
