import { Box, Flex, Text, Textarea, VStack } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { ReviewStatic } from "../../../../interface/static";
import { UploadedReviewImages } from "./UploadedReviewImages";

interface BeerReviewTextSectionProps {
  onChangeInput: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  input: string;
}

export const BeerReviewTextSection: React.FC<BeerReviewTextSectionProps> = ({
  onChangeInput,
  input,
}) => {
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
          focusBorderColor="transparent"
          w="full"
          border="none"
          h="full"
          p="0px"
          value={input}
          onChange={onChangeInput}
          _placeholder={{
            textStyle: "h3",
            textColor: "gray.200",
          }}
          placeholder="이 맥주가 맘에 드는/ 안 드는 자세한 이유를 들려주세요! 아님 맥주에 관한 추억이나.. 꿀조합 안주를 공유해볼까요~?"
          maxLength={2000}
        />
        <Flex justify="flex-end" w="full">
          <Text textStyle="h2" textColor="gray.200">
            {input.length} / {ReviewStatic.ReviewInputMaxLength}
          </Text>
        </Flex>
      </VStack>
    </VStack>
  );
};
