import {Flex, FlexProps, IconButton, Text, VStack} from "@chakra-ui/react";
import {ReviewType} from "../../../interface/types";
import {RightArrow} from "../../../public/svg";

interface BeerNameSectionProps extends FlexProps {
  reviewInfo: ReviewType;
}

const BeerNameSection: React.FC<BeerNameSectionProps> = ({
  reviewInfo,
  ...props
}) => {
  return (
    <Flex
      {...props}
      p="10px"
      justifyContent="space-between"
      alignItems="center"
      w="full"
      cursor={"pointer"}
    >
      <VStack gap="10px" alignItems={"flex-start"}>
        <Text textStyle="h2" textColor="black.100">
          맥주 이름을 골라주세요!
        </Text>
        {reviewInfo.beerName && (
          <Text textStyle="h2_bold" textColor="orange.200">
            {reviewInfo.beerName}
          </Text>
        )}
      </VStack>

      <IconButton
        justifyContent="center"
        alignItems="center"
        size="20px"
        aria-label="right-arrow"
        as={RightArrow}
      />
    </Flex>
  );
};

export default BeerNameSection;
