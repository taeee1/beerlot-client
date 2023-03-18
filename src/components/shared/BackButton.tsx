import {Box} from "@chakra-ui/react";
import {useRouter} from "next/router";
import React from "react";
import {LeftArrow} from "../../../public/svg";

interface BackButtonProps {
  onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({onClick}) => {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };

  return (
    <Box onClick={onClick ? onClick : handleClick} cursor="pointer">
      <LeftArrow />
    </Box>
  );
};

export default BackButton;
