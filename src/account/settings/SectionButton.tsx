import {IconButton, Text, HStack, Link, StackProps} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import {RightArrow} from "../../shared/CustomIcons/customIcons";

interface SectionButtonProps extends StackProps {
  title: string;
  href?: string;
  children?: React.ReactNode;
}

export const SectionButton: React.FC<SectionButtonProps> = ({
  title,
  href,
  children,
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
      href={href}
      passHref
      textDecoration="none"
      _visited={{textDecoration: "none"}}
      _hover={{textDecoration: "none"}}
      as={href ? Link : HStack}
      {...props}
    >
      <Text textStyle={"h3"} textColor="black.100">
        {title}
      </Text>
      {children}
      {href && (
        <IconButton
          _hover={{}}
          bg="transparent"
          icon={<RightArrow />}
          aria-label="right-arrow"
        />
      )}
    </HStack>
  );
};
