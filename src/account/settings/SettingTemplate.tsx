import { Box, Container, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { LeftBackRandom } from "../../../common/headers/LeftBackRandom";
import { SectionButton } from "./SectionButton";

export const SettingsTemplate = () => {
  const router = useRouter();
  const handleClickBack = () => {
    router.back();
  };
  return (
    <Box h="full">
      <VStack bg="gray.100" h="full">
        {/* title */}
        <LeftBackRandom onClick={handleClickBack} title="설정" />
        <VStack bg="gray.100" pt="70px" w="full" gap="10px">
          <VStack w="full">
            {["최애맥주 변경"].map((title) => (
              <SectionButton key={title} title={title} />
            ))}
          </VStack>
          <VStack w="full">
            {["공지사항", "문의하기", "비어랏 정보"].map((title) => (
              <SectionButton key={title} title={title} />
            ))}
          </VStack>
          <VStack w="full">
            {["로그아웃", "회원탈퇴"].map((title) => (
              <SectionButton key={title} title={title} />
            ))}
          </VStack>
        </VStack>
      </VStack>
    </Box>
  );
};
