import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { EditPencil } from "../public/svg";
import { LeftCloseRandom } from "./headers/LeftCloseRandom";

export const ReviewModal = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSizeClick = () => {
    onOpen();
  };

  return (
    <Box>
      <Button
        onClick={handleSizeClick}
        w="70px"
        h="70px"
        pos="fixed"
        borderRadius="full"
        bg="orange.300"
        right="21px"
        bottom="72.5px"
      >
        {/* TODO: should be replaced */}
        <EditPencil />
      </Button>
      <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent px="20px" border="1px solid blue">
          <ModalHeader bg="orange">
            <LeftCloseRandom onClose={onClose} title="글쓰기" />
          </ModalHeader>
          <ModalBody bg="red"></ModalBody>
          <ModalFooter px={0}>
            <Button
              onClick={onClose}
              w="full"
              bg={isCompleted ? "blue.100" : "gray.200"}
              boxShadow={
                isCompleted ? "0px 8px 16px rgba(0, 0, 0, 0.3)" : "initial"
              }
              borderRadius="10px"
            >
              <Text color="white.100" textStyle="h2">
                작성 완료
              </Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
