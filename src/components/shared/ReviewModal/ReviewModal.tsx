import {
  useCreateReviewMutation,
  useReviewUpdateMutation,
} from "@/../hooks/query/useReviewQuery";
import {
  Center,
  Modal,
  ModalContent,
  ModalProps,
  useDisclosure,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ReviewInfoType } from "../../../../interface/types";
import { BeerReviewContent } from "./BeerReviewContent";
import { BeerSearchContent } from "./BeerSearchContent";
import { ReviewExitConfirmationDrawer } from "./ReviewExitConfirmationDrawer";
import { BeerlotLoading } from "../Loading";

interface ReviewModalProps {
  isLoading?: boolean;
  existingReviewInfo?: ReviewInfoType;
  reviewId?: number | null;
  isModalOpen: ModalProps["isOpen"];
  onCloseModal: ModalProps["onClose"];
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  existingReviewInfo,
  isLoading,
  reviewId,
  isModalOpen,
  onCloseModal,
}) => {
  const {
    onClose: onCloseReviewDrawer,
    onOpen: onOpenReviewDrawer,
    isOpen: isOpenReviewDrawer,
  } = useDisclosure();
  const accessToken = Cookies.get("beerlot-oauth-auth-request") ?? "";
  console.log("existingReviewInfo", existingReviewInfo);
  const [reviewInfo, setReviewInfo] = useState<ReviewInfoType>({
    beerName: existingReviewInfo?.beerName ?? null,
    rate: existingReviewInfo?.rate ?? 0,
    place: existingReviewInfo?.place ?? "",
    review: existingReviewInfo?.review ?? "",
    image_url: existingReviewInfo?.image_url ?? [""],
  });
  console.log("reviewInfo", reviewInfo);

  const isCompleted = !!reviewInfo.beerName && !!reviewInfo.rate;

  const [step, setStep] = useState(0);
  const [reviewInputValue, setReviewInputValue] = useState(
    existingReviewInfo?.review ?? ""
  );
  const [beerId, setBeerId] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      setReviewInfo({
        beerName: null,
        rate: 0,
        place: null,
      });
      setStep(0);
      onCloseModal();
      setReviewInputValue("");
    };
  }, [onCloseModal]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewInputValue(e.target.value);
  };

  const handleChangeBeerName = (name: string, id: number) => {
    const newBeerReview = { ...reviewInfo, beerName: name };
    setReviewInfo(newBeerReview);
    setBeerId(id);
  };

  const handleChangeRate = (rate: number) => {
    const newBeerReview = { ...reviewInfo, rate: rate };
    setReviewInfo(newBeerReview);
  };

  const handleClickPlaceTag = (place: string | null) => {
    const newBeerReview = { ...reviewInfo, place: place };
    setReviewInfo(newBeerReview);
  };

  const createReviewMutation = useCreateReviewMutation(
    beerId ?? 0,
    accessToken
  );

  const updatedReviewInfo = {
    rate: reviewInfo.rate,
    buy_from: reviewInfo?.place ?? "",
    content: reviewInputValue,
    image_url:
      // TODO: update to real data
      "https://fastly.picsum.photos/id/923/200/300.jpg?hmac=eiYSYaG7v46VlrE38Amrg33bd2FzVjaCsQrLMdekyAU",
  };

  const updateReview = useReviewUpdateMutation(
    reviewId ?? 0,
    accessToken,
    updatedReviewInfo
  );

  const handleClickComplete = () => {
    const newReviewInfo = {
      rate: reviewInfo.rate,
      buy_from: reviewInfo?.place ?? "",
      content: reviewInputValue,
      image_url:
        "https://fastly.picsum.photos/id/923/200/300.jpg?hmac=eiYSYaG7v46VlrE38Amrg33bd2FzVjaCsQrLMdekyAU",
    };
    if (reviewId) {
      updateReview.mutate();
    } else {
      createReviewMutation.mutate(newReviewInfo);
    }

    onCloseModal();
  };

  return (
    <>
      <Modal onClose={onCloseModal} size={"full"} isOpen={isModalOpen}>
        <ModalContent px="20px" pb="40px" maxW="450px" bg="white">
          {isLoading && (
            <Center flex={1}>
              <BeerlotLoading />
            </Center>
          )}
          {!isLoading && step === 0 && (
            <BeerReviewContent
              onOpenDrawer={onOpenReviewDrawer}
              reviewInfo={reviewInfo}
              onNext={() => setStep(1)}
              handleChangeRate={handleChangeRate}
              handleClickPlaceTag={handleClickPlaceTag}
              handleInputChange={handleInputChange}
              reviewInputValue={reviewInputValue}
              handleClickComplete={handleClickComplete}
              isCompleted={isCompleted}
            />
          )}

          {!isLoading && step === 1 && (
            <BeerSearchContent
              onClickBack={() => {
                setStep(step - 1);
              }}
              onChangeBeerName={handleChangeBeerName}
            />
          )}
        </ModalContent>
      </Modal>

      <ReviewExitConfirmationDrawer
        isOpen={isOpenReviewDrawer}
        onClose={onCloseReviewDrawer}
        onClickLeftButton={() => {
          onCloseReviewDrawer();
          onCloseModal();
        }}
        onClickRightButton={onCloseReviewDrawer}
      />
    </>
  );
};
