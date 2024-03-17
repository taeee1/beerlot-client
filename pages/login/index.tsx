import { Box, Container } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { LoginTemplate } from "../../src/components/auth/login/LoginTemplate";

const Login = () => {
  return (
    <Box w="full" bg="gray.100" h={"100vh"} minH={"100vh"}>
      <Container p={"0px"} h="full" w="full" bg="white" maxW="450px">
        <LoginTemplate />
      </Container>
    </Box>
  );
};

export default Login;

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

  return {
    props: {},
  };
};
