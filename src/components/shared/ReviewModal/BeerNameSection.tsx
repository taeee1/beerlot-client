import {Flex, FlexProps, IconButton, Text, VStack} from "@chakra-ui/react";
import {ReviewInfoType} from "../../../../interface/types";
import {RightArrow} from "../CustomIcons/customIcons";

interface BeerNameSectionProps extends FlexProps {
  reviewInfo: ReviewInfoType;
}

const BeerNameSection: React.FC<BeerNameSectionProps> = ({
  reviewInfo,
  ...props
}) => {
  return (
    <Flex
      p="10px"
      justifyContent="space-between"
      alignItems="center"
      w="full"
      cursor={"pointer"}
      {...props}
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
        aria-label="right-arrow"
        icon={<RightArrow />}
        bg={"initial"}
        _hover={{}}
      />
    </Flex>
  );
};

export default BeerNameSection;
