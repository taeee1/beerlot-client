import {Box, Container, Text} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {LeftBackRandom} from "../../../src/shared/Headers/LeftBackRandom";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
const Notice = () => {
  const router = useRouter();
  const handleClickBack = () => {
    router.back();
  };
  return (
    <Box w="full" h="full" bg="gray.100" border="1px solid red">
      <Container
        p={"0px"}
        h="full"
        w="full"
        bg="white"
        position="relative"
        maxW="450px"
      >
        {/* title */}
        <LeftBackRandom onClick={handleClickBack} title="공지사항" />
        <Accordion allowToggle pt="52px">
          {NoticeSettingSection.map(({title, date, content}) => (
            <AccordionItem key={title}>
              <AccordionButton
                py={"8px"}
                px={"30px"}
                justifyContent="space-between"
              >
                <Box>
                  <Text textColor={"black.100"} textStyle="h3_bold">
                    {title}
                  </Text>
                  <Text
                    textAlign={"start"}
                    textColor={"gray.300"}
                    textStyle="h4"
                  >
                    {date}
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel
                p={"12px 30px 30px"}
                borderTop="1px solid"
                borderTopColor={"gray.200"}
              >
                <Text textColor={"gray.300"} textStyle="h4">
                  {content}
                </Text>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Box>
  );
};

export default Notice;

export const NoticeSettingSection = [
  {
    title: "비어랏 v 0.5 출시!",
    date: "2022.10.01",
    content: "드디어 비어랏 0.5을 출시하게 되었습니다.",
  },
  {
    title: "비어랏 v 1.0 출시!",
    date: "2022.11.01",
    content: "드디어 비어랏 1.0을 출시하게 되었습니다.",
  },
];
