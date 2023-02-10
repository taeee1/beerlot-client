import {Flex, IconButton} from "@chakra-ui/react";
import Router, {useRouter} from "next/router";
import React from "react";
import {AlertBell, SettingGear} from "../../public/svg";

const Tools = () => {
  const router = useRouter();
  const handleClickSettings = () => {
    router.push("/account/settings");
  };

  return (
    <Flex
      py="10px"
      px="20px"
      justifyContent="end"
      alignItems="center"
      gap="12px"
    >
      <IconButton
        _hover={{}}
        _focus={{}}
        bg="transparent"
        aria-label="settings"
        icon={<SettingGear />}
        onClick={handleClickSettings}
      />

      {/* <AlertBell /> */}
    </Flex>
  );
};

export default Tools;
