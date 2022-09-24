import { Center } from "@chakra-ui/react";
import ContinueButton from "../../Components/Auth/Continue";
import MarketingText from "../../Components/Auth/MarketingText";
import SocialButton from "../../Components/Auth/SocialButton";
import Title from "../../Components/Auth/Title";

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
