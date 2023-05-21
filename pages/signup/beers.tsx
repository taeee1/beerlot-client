import {GetServerSideProps} from "next";
import {getSession} from "next-auth/react";
import React from "react";
import BeersTemplate from "../../src/components/auth/sign-up/BeersTemplate";

const beers = () => {
  return <BeersTemplate />;
};

export default beers;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const cookies = context.req.headers.cookie;

  if (cookies && cookies.includes("beerlot-oauth-auth-request")) {
    return {
      redirect: {
        destination: "/account",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
