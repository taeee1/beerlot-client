import {Button, ButtonProps, Text} from "@chakra-ui/react";
import React, {ReactNode} from "react";

interface FilterTagProps extends ButtonProps {
  tagText: string;
  children?: ReactNode;
  onClick?: () => void;
}

const FilterTag: React.FC<FilterTagProps> = ({
  tagText,
  onClick,
  children,
  ...props
}) => {
  return (
    <Button {...props} onClick={onClick}>
      <Text textStyle={"h4"} textColor="black.100">
        {tagText}
      </Text>
      {children}
    </Button>
  );
};

export default FilterTag;
