import { HStack, Image } from "@chakra-ui/react";
import React from "react";

export const BeerlotLoading = () => {
  return (
    <HStack gap={8} w={"full"} h={"full"}>
      <HStack gap={2}>
        <Image src={"/images/b_can.png"} alt={"b"} />
        <Image src={"/images/e_can.png"} alt={"e"} />
        <Image src={"/images/e2_can.png"} alt={"e"} />
        <Image src={"/images/r_can.png"} alt={"r"} />
      </HStack>
      <HStack gap={2}>
        <Image src={"/images/l_can.png"} alt={"l"} />
        <Image src={"/images/o_can.png"} alt={"o"} />
        <Image src={"/images/t_can.png"} alt={"t"} />
      </HStack>
    </HStack>
  );
};
