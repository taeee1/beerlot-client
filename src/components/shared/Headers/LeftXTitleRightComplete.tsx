import { Button, ButtonProps, Flex, Text } from "@chakra-ui/react";
import React from "react";
import CloseButton from "../CloseButton";
import { BeerlotTitle } from "./BeerlotTitle";

interface LeftXTitleRightCompleteProps {
  title?: string;
  rightTitle?: string;
  rightTitleStyleProps?: ButtonProps;
  onClickRight?: () => void;
}

const LeftXTitleRightComplete: React.FC<LeftXTitleRightCompleteProps> = ({
  title,
  rightTitle,
  rightTitleStyleProps,
  onClickRight,
}) => {
  return (
    <Flex
      position="absolute"
      top="0px"
      right="0px"
      left="0px"
      pl="12px"
      pr="24px"
      justifyContent="space-between"
      alignItems="center"
      borderBottom="1px solid"
      borderBottomColor="gray.200"
    >
      <CloseButton />
      {title ? (
        <Text textColor={"black"} textStyle="h2_bold">
          {title}
        </Text>
      ) : (
        <BeerlotTitle />
      )}
      {rightTitle && (
        <Button
          onClick={onClickRight}
          bg={"initial"}
          _hover={{}}
          _focus={{}}
          {...rightTitleStyleProps}
        >
          <Text textStyle="h3_bold">{rightTitle}</Text>
        </Button>
      )}
    </Flex>
  );
};

export default LeftXTitleRightComplete;
