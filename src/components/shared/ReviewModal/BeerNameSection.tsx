import { Flex, FlexProps, IconButton, Text, VStack } from "@chakra-ui/react";
import { RightArrow } from "../CustomIcons/customIcons";
import { CreateReviewRequestTypeV2 } from "@/api/review/typedef";

interface BeerNameSectionProps extends FlexProps {
  reviewInfo: CreateReviewRequestTypeV2;
}

const BeerNameSection: React.FC<BeerNameSectionProps> = ({
  reviewInfo,
  ...props
}) => {
  const beerName = "";
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
        {beerName && (
          <Text textStyle="h2_bold" textColor="orange.200">
            {beerName}
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
