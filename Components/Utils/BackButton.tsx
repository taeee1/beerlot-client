import { Box } from "@chakra-ui/react";
import React from "react";
import { LeftArrow } from "../../public/svg";

interface BackButtonProps {
  onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <Box pos="absolute" top="47px" left="21px" onClick={onClick}>
      <LeftArrow />
    </Box>
  );
};

export default BackButton;
