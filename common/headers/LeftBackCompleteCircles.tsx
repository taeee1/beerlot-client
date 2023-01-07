import {Box, Flex} from "@chakra-ui/react";
import BackButton from "../BackButton";
import {CompleteCircles} from "../CompleteCircles";

interface LeftBackCompleteCirclesProps {
  isFirstCircleDone: boolean;
  isSecondCircleDone: boolean;
}

export const LeftBackCompleteCircles: React.FC<
  LeftBackCompleteCirclesProps
> = ({isFirstCircleDone, isSecondCircleDone, ...props}) => {
  return (
    <Flex
      {...props}
      position="absolute"
      top="0px"
      right="0px"
      left="0px"
      py="16px"
      px="20px"
      justifyContent="space-between"
      alignItems="center"
      dropShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
    >
      <BackButton />
      <CompleteCircles
        isNicknameDone={isFirstCircleDone}
        isBeersDone={isSecondCircleDone}
      />
      <Box w="12px" />
    </Flex>
  );
};
