import {GetServerSideProps} from "next";
import CompleteTemplate from "../../src/components/auth/sign-up/CompleteTemplate";

const complete = () => {
  return <CompleteTemplate />;
};

export default complete;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.headers.cookie;

  if (cookies && cookies.includes("beerlot-oauth-auth-request")) {
    return {
      redirect: {
        destination: "/account",
        permanent: false,
      },
    };
  }

  if (!cookies || !cookies.includes("beerlot-oauth-auth-guest")) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
