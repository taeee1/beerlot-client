import React, {ChangeEvent, useState} from "react";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {OrangeCamera} from "../../public/svg";
import {ReviewStatic} from "../../interface/static";

export const BeerReviewTextSection = () => {
  const [attachedFile, setAttachedPhoto] = useState([]);
  const [reviewInputValue, setReviewInputValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewInputValue(e.target.value);
  };

  return (
    <VStack p="10px" w="full" alignItems={"flex-start"} gap="10px">
      <Box>
        <Text as="span" textStyle="h2" textColor="black.100">
          더 자세한 후기가 궁금해요!{" "}
        </Text>
        <Text as="span" textStyle="h2" textColor="gray.200">
          (선택)
        </Text>
      </Box>
      <VStack
        w="full"
        gap="10px"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="10px"
        p="10px 10px 5px"
        h="200px"
      >
        <Textarea
          resize={"none"}
          focusBorderColor="none"
          w="full"
          border="none"
          h="full"
          p="0px"
          value={reviewInputValue}
          onChange={handleInputChange}
          _placeholder={{
            textStyle: "h3",
            textColor: "gray.200",
          }}
          placeholder="이 맥주가 맘에 드는/ 안 드는 자세한 이유를 들려주세요! 아님 맥주에 관한 추억이나.. 꿀조합 안주를 공유해볼까요~?"
          maxLength={2000}
        />
        <Flex justify="flex-end" w="full">
          <Text textStyle="h2" textColor="gray.200">
            {reviewInputValue.length} / {ReviewStatic.ReviewInputMaxLength}
          </Text>
        </Flex>
      </VStack>

      {/* sholud remove default marginTop */}
      <Button
        w="full"
        bg="inherit"
        _hover={{}}
        border="1px solid"
        borderColor="orange.200"
        borderRadius="10px"
        p="5px 10px"
        aria-label="attach-photo"
        gap="10px"
        mt="0px"
        _notFirst={{marginInlineStart: "0px", marginTop: "0px"}}
      >
        <OrangeCamera />
        <Text textStyle="h3" textColor="orange.200">
          사진 첨부하기 ({attachedFile.length}/
          {ReviewStatic.numberOfMaxAttachedFile})
        </Text>
      </Button>
    </VStack>
  );
};
