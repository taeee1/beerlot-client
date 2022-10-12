import { Box } from "@chakra-ui/react";
import React from "react";
import { LeftArrow } from "../../public/svg";

const BackButton = () => {
  return (
    <Box pos="absolute" top="47px" left="21px">
      <LeftArrow />
    </Box>
  );
};

export default BackButton;
