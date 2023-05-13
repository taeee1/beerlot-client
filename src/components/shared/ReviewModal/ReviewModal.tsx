import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, {ChangeEvent, useCallback, useState} from "react";
import {ReviewType} from "../../../../interface/types";
import {EditPencil} from "../../../../public/svg";
import {postReviewWithBeerIdApi} from "../../../api/review/api";
import BottomDrawer from "../BottomDrawer";
import {LeftCloseRandom} from "../Headers/LeftCloseRandom";
import BeerNameSection from "./BeerNameSection";
import {BeerPurchaseSection} from "./BeerPurchaseSection";
import {BeerRatingSection} from "./BeerRatingSection";
import {BeerReviewTextSection} from "./BeerReviewTextSection";
import {BeerSearchContent} from "./BeerSearchContent";
import {ReviewCancelDrawer} from "./ReviewCancelDrawer";

export const ReviewModal = () => {
  const [reviewInfo, setReviewInfo] = useState<ReviewType>({
    beerName: null,
    rate: 0,
  });
  const isCompleted = !!reviewInfo.beerName && !!reviewInfo.rate; // should contain rating stars as well
  const CloseReviewDrawer = useDisclosure();
  const [step, setStep] = useState(0);
  const [reviewInputValue, setReviewInputValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewInputValue(e.target.value);
  };

  const [placeInputValue, setPlaceInputValue] = useState("");

  const {isOpen, onOpen, onClose} = useDisclosure();

  const handleClickLeftButton = () => {
    // TODO: reset everything
    setReviewInfo({
      beerName: null,
      rate: 0,
      place: null,
    });
    onClose();
    clearInput();
    setReviewInputValue("");
    CloseReviewDrawer.onClose();
  };

  const handleClickRightButton = () => {
    CloseReviewDrawer.onClose();
  };

  const handleWriteReview = () => {
    onOpen();
  };
  const handleClickBack = () => {
    setStep(step - 1);
  };

  const handleChangeBeerName = (name: string) => {
    const newBeerReview = {...reviewInfo, beerName: name};
    setReviewInfo(newBeerReview);
  };

  const handleChangeRate = (rate: number) => {
    const newBeerReview = {...reviewInfo, rate: rate};
    setReviewInfo(newBeerReview);
  };

  const handleClickPlaceTag = (place: string | null) => {
    const newBeerReview = {...reviewInfo, place: place};
    setReviewInfo(newBeerReview);
  };

  const handleChangePlace = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPlaceInputValue(event.target.value);

  const clearInput = () => {
    setPlaceInputValue("");
  };

  const postReview = useCallback(async () => {
    const result = await postReviewWithBeerIdApi(1, {
      content: reviewInputValue,
      rate: reviewInfo.rate,
      // image_url: reviewInfo.imgUrl,
      // buy_from: [reviewInfo.place],
    });
  }, [reviewInfo.rate, reviewInputValue]);

  const handleClickComplete = useCallback(() => {
    postReview();
    onClose();
    setReviewInfo({
      beerName: null,
      rate: 0,
      place: null,
    });
    clearInput();
    setReviewInputValue("");
  }, [onClose, postReview]);

  return (
    <Box>
      <Button
        onClick={handleWriteReview}
        w="70px"
        h="70px"
        pos="absolute"
        borderRadius="full"
        bg="orange.300"
        bottom={5}
        right={5}
      >
        {/* TODO: should be replaced */}
        <EditPencil />
      </Button>
      <ReviewCancelDrawer
        isOpen={CloseReviewDrawer.isOpen}
        onClose={CloseReviewDrawer.onClose}
        onClickLeftButton={handleClickLeftButton}
        onClickRightButton={handleClickRightButton}
      />
      <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
        {step === 0 && (
          <ModalContent px="20px" pb="40px" maxW="452px" bg="white">
            <ModalHeader pt="46px">
              <LeftCloseRandom
                onClose={CloseReviewDrawer.onOpen}
                title="글쓰기"
              />
            </ModalHeader>
            <ModalBody p={0} pt="10px">
              <VStack
                gap="20px"
                justifyContent="flex-start"
                alignItems={"flex-start"}
              >
                {/* beer name */}
                <BeerNameSection
                  reviewInfo={reviewInfo}
                  onClick={() => setStep(1)}
                />

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
          </ModalContent>
        )}
        {step === 1 && (
          <BeerSearchContent
            maxW="450px"
            onClickBack={handleClickBack}
            onChangeBeerName={handleChangeBeerName}
          />
        )}
      </Modal>
    </Box>
  );
};
