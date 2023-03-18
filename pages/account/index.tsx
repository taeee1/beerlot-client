import {Box, Container} from "@chakra-ui/react";
import {useEffect} from "react";
import {getMyAccountApi} from "../../src/api/auth/api";
import AccountsTemplate from "../../src/components/account/AccountsTemplate";

const AccountPage = () => {
  useEffect(() => {
    getMyAccountApi();
  }, []);

  return (
    <Box w="full" h="full" overflowY={"scroll"} bg="gray.100">
      <Container p={"0px"} w="full" bg="white" position="relative" maxW="450px">
        <AccountsTemplate />
      </Container>
    </Box>
  );
};

export default AccountPage;
