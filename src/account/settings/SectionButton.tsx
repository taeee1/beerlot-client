import { IconButton, Text, HStack } from "@chakra-ui/react";
import React from "react";
import { RightArrow } from "../../../common/custom-icons/customIcons";

interface SectionButtonProps {
  title: string;
}

export const SectionButton: React.FC<SectionButtonProps> = ({ title }) => {
  return (
    <HStack
      w="full"
      py="8px"
      pl="30px"
      pr="20px"
      justify={"space-between"}
      bg="white"
      border="1px solid"
      borderBottom={"none"}
      borderColor={"gray.200"}
    >
      <Text textStyle={"h3"} textColor="black.100">
        {title}
      </Text>
      <IconButton
        _hover={{}}
        bg="transparent"
        icon={<RightArrow />}
        aria-label="right-arrow"
      />
    </HStack>
  );
};
