import {Box, Container} from "@chakra-ui/react";
import AccountsTemplate from "../../src/account/AccountsTemplate";

const AccountPage = () => {
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
