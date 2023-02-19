import {Box, Container} from "@chakra-ui/react";
import {useEffect} from "react";
import AccountsTemplate from "../../src/account/AccountsTemplate";
import {getMyAccountApi} from "../../src/api/auth/api";

const AccountPage = () => {
  useEffect(() => {
    getMyAccountApi();
  }, []);

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
        <AccountsTemplate />
      </Container>
    </Box>
  );
};

export default AccountPage;
