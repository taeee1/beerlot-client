import { Button, Text } from "@chakra-ui/react";
import React from "react";
import { BottomArrow, RightArrow } from "../../../../public/svg";

interface FilterTagProps {
  title: string;
  arrowDirection: "down" | "right";
}

const FilterTag: React.FC<FilterTagProps> = ({ title, arrowDirection }) => {
  return (
    <Button
      h="auto"
      borderRadius="15px"
      bg="Yellow.200"
      py={1}
      px="5px"
      gap="7px"
    >
      <Text textStyle="h3">{title}</Text>
      {arrowDirection === "right" ? <RightArrow /> : <BottomArrow />}
    </Button>
  );
};

export default FilterTag;
