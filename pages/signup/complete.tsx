import {getSession} from "next-auth/react";
import CompleteTemplate from "../../src/components/auth/sign-up/CompleteTemplate";
import {GetServerSideProps} from "next";

const complete = () => {
  return <CompleteTemplate />;
};

export default complete;

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
