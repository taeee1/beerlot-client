import { Center } from "@chakra-ui/react";
import ContinueButton from "../../src/auth/sign-in/Continue";
import MarketingText from "../../src/auth/sign-in/MarketingText";
import SocialButton from "../../src/auth/sign-in/SocialButton";

import Title from "../../src/auth/sign-in/Title";

const LoginTemplate = () => {
  return (
    <>
      <Title />
      <Center h="calc(100vh)" gap="10px" flexDirection="column" px="20px">
        <MarketingText />
        <SocialButton />
        <ContinueButton />
      </Center>
    </>
  );
};

export default LoginTemplate;
