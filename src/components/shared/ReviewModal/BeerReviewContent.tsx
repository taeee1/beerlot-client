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
import { UploadedReviewImages } from "./UploadedReviewImages";
import { CreateReviewRequestTypeV2 } from "../../../../typedef/review";

interface BeerReviewContentProps extends ModalContentProps {
  onOpenDrawer: () => void;
  reviewInfo: CreateReviewRequestTypeV2;
  onNext: () => void;
  beerName: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  contentInput: string;
  onComplete: () => void;
  isCompleted: boolean;
  onChangeReviewInfo: (key: string, value: string | number | string[]) => void;
}

export const BeerReviewContent: React.FC<BeerReviewContentProps> = ({
  onOpenDrawer,
  reviewInfo,
  onNext,
  beerName,
  onInputChange,
  contentInput,
  onComplete,
  onChangeReviewInfo,
  isCompleted,
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

  const handleRate = (rate: number) => {
    onChangeReviewInfo("rate", rate);
  };

  const handleChangePlaceTag = (place: string) => {
    onChangeReviewInfo("buy_from", place);
  };

  const handleImage = (imageUrl: string[]) => {
    onChangeReviewInfo("image_url", imageUrl);
  };

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
          <BeerNameSection beerName={beerName} onClick={onNext} />

          {/* rating */}
          <BeerRatingSection onRate={handleRate} rate={reviewInfo.rate} />

          {/* purchase */}
          <BeerPurchaseSection
            reviewInfo={reviewInfo}
            handleChangePlace={handleChangePlace}
            clearInput={clearInput}
            handleClickPlaceTag={handleChangePlaceTag}
            placeInputValue={placeInputValue}
          />

          {/* review text  */}
          <BeerReviewTextSection
            onChangeInput={onInputChange}
            input={contentInput}
          />

          <UploadedReviewImages
            setImageUrl={handleImage}
            imageUrl={reviewInfo.image_url}
          />
        </VStack>
      </ModalBody>
      <ModalFooter px={0}>
        <Button
          onClick={onComplete}
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
