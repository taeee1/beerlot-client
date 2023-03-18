import {Box, Container} from "@chakra-ui/react";
import {SettingsTemplate} from "../../../src/components/account/settings/SettingTemplate";
const SettingsPage = () => {
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
        <SettingsTemplate />
      </Container>
    </Box>
  );
};

export default SettingsPage;
