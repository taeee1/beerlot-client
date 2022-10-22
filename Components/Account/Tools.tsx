import { Flex } from "@chakra-ui/react";
import React from "react";
import { AlertBell, SettingGear } from "../../public/svg";

const Tools = () => {
  return (
    <Flex
      py="10px"
      px="20px"
      justifyContent="end"
      alignItems="center"
      gap="12px"
    >
      <SettingGear />
      <AlertBell />
    </Flex>
  );
};

export default Tools;
