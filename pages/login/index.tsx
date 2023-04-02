import {Box, Container} from "@chakra-ui/react";
import {GetServerSideProps} from "next";
import {getSession} from "next-auth/react";
import {LoginTemplate} from "../../src/components/auth/login/LoginTemplate";

const Login = () => {
  return (
    <Box w="full" h="full" bg="gray.100">
      <Container
        p={"0px"}
        h="full"
        w="full"
        bg="white"
        position="relative"
        maxW="450px"
      >
        <LoginTemplate />
      </Container>
    </Box>
  );
};

export default Login;

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
