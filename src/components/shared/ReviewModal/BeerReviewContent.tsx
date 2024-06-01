import {
  Button,
  ModalBody,
  ModalContentProps,
  ModalFooter,
  ModalHeader,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { LeftCloseRandom } from "../Headers/LeftCloseRandom";
import BeerNameSection from "./BeerNameSection";
import { BeerPurchaseSection } from "./BeerPurchaseSection";
import { BeerRatingSection } from "./BeerRatingSection";
import { BeerReviewTextSection } from "./BeerReviewTextSection";

interface BeerReviewContentProps extends ModalContentProps {
  onOpenDrawer: () => void;
  reviewInfo: any;
  onNext: () => void;
  handleChangeRate: (rate: number) => void;
  handleClickPlaceTag: (place: string | null) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  reviewInputValue: string;
  handleClickComplete: () => void;
  isCompleted: boolean;
}

export const BeerReviewContent: React.FC<BeerReviewContentProps> = ({
  onOpenDrawer,
  reviewInfo,
  onNext,
  handleChangeRate,
  handleClickPlaceTag,
  handleInputChange,
  reviewInputValue,
  handleClickComplete,
  isCompleted,
  ...props
}) => {
  const [placeInputValue, setPlaceInputValue] = useState("");

  const handleChangePlace = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPlaceInputValue(event.target.value);

  const clearInput = () => {
    setPlaceInputValue("");
  };

  useEffect(() => {
    return () => {
      clearInput();
    };
  }, []);

  return (
    <>
      <ModalHeader pt="46px">
        <LeftCloseRandom onClose={onOpenDrawer} title="글쓰기" />
      </ModalHeader>
      <ModalBody p={0} pt="10px">
        <VStack
          gap="20px"
          justifyContent="flex-start"
          alignItems={"flex-start"}
        >
          {/* beer name */}
          <BeerNameSection reviewInfo={reviewInfo} onClick={onNext} />

          {/* rating */}
          <BeerRatingSection
            handleChangeRate={handleChangeRate}
            rate={reviewInfo.rate}
          />

          {/* purchase */}
          <BeerPurchaseSection
            reviewInfo={reviewInfo}
            handleChangePlace={handleChangePlace}
            clearInput={clearInput}
            handleClickPlaceTag={handleClickPlaceTag}
            placeInputValue={placeInputValue}
          />

          {/* review text and images */}
          <BeerReviewTextSection
            onChangeInput={handleInputChange}
            input={reviewInputValue}
          />
        </VStack>
      </ModalBody>
      <ModalFooter px={0}>
        <Button
          onClick={handleClickComplete}
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
    </>
  );
};
