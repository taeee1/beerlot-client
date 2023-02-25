import {IconButton, Text, HStack, Link, StackProps} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import {RightArrow} from "../../shared/CustomIcons/customIcons";

interface SectionButtonProps {
  title: string;
  href?: string;
}

export const SectionButton: React.FC<SectionButtonProps> = ({
  title,
  href,
  ...props
}) => {
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
      {...props}
      href={href}
      passHref
      textDecoration="none"
      _visited={{textDecoration: "none"}}
      _hover={{textDecoration: "none"}}
      as={href ? Link : HStack}
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
