import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { LeftArrow } from "../public/svg";

const BackButton = () => {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };

  return (
    <Box onClick={handleClick}>
      <LeftArrow />
    </Box>
  );
};

export default BackButton;
