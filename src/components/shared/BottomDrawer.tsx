import {
  BoxProps,
  Button,
  ButtonProps,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  ModalHeaderProps,
  Text,
  TextProps,
} from "@chakra-ui/react";
import React from "react";

interface BottomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  boxStyle?: BoxProps;
  leftButtonStyle?: ButtonProps;
  rightButtonStyle?: ButtonProps;
  bodyTextStyle?: TextProps;
  headerTextStyle?: ModalHeaderProps;
  bodyText?: string;
  headerText?: string;
  leftButtonText?: string;
  rightButtonText?: string;
}
const BottomDrawer: React.FC<BottomDrawerProps> = ({
  onClose,
  isOpen,
  headerText,
  bodyText,
  boxStyle,
  bodyTextStyle,
  headerTextStyle,
  leftButtonText,
  rightButtonText,
  leftButtonStyle,
  rightButtonStyle,
}) => {
  return (
    <Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay bg={"rgba(0, 0, 0, 0.3)"} />
      <DrawerContent {...boxStyle}>
        <DrawerHeader textAlign={"center"} {...headerTextStyle}>
          {headerText}
        </DrawerHeader>
        {bodyText && (
          <DrawerBody w="full">
            <Text {...bodyTextStyle} whiteSpace={"pre-wrap"}>
              {bodyText}
            </Text>
          </DrawerBody>
        )}
        <DrawerFooter w="full">
          <HStack w="full" h="full" justifyContent={"space-between"}>
            <Button {...leftButtonStyle} bg="gray.200" borderRadius={"20px"}>
              <Text textColor={"black.100"} textStyle={"h2_bold"}>
                {leftButtonText}
              </Text>
            </Button>
            <Button {...rightButtonStyle} bg="orange.300" borderRadius={"20px"}>
              <Text textColor={"white"} textStyle={"h2_bold"}>
                {rightButtonText}
              </Text>
            </Button>
          </HStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default BottomDrawer;
