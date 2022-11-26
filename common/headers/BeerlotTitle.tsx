import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { BEERLOT_TITLE } from "../../interface/static";

const BeerlotTitle = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/`);
  };

  return (
    <Text
      h="100%"
      textStyle="h2" // mock. 요청함.
      textShadow=" 0px 8px 20px rgba(0, 0, 0, 0.4)"
      onClick={handleClick}
    >
      {BEERLOT_TITLE}
    </Text>
  );
};

export default BeerlotTitle;
