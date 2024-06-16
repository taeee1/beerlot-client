import {
  Modal,
  ModalContent,
  ModalProps,
  useDisclosure,
} from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ReviewInfoType } from "../../../../interface/types";
import { BeerReviewContent } from "./BeerReviewContent";
import { BeerSearchContent } from "./BeerSearchContent";
import { ReviewExitConfirmationDrawer } from "./ReviewExitConfirmationDrawer";

interface ReviewModalProps {
  isModalOpen: ModalProps["isOpen"];
  onCloseModal: ModalProps["onClose"];
  onComplete: () => void;
  onChangeReviewInfo: (data: ReviewInfoType) => void;
  reviewInfo: ReviewInfoType;
}

// TODO: remove this comment
// id query 끝남.
// 만약 existing data가 있다면, existing data를 없다면 initial Data를 가져옴

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isModalOpen,
  reviewInfo,
  onChangeReviewInfo,
  onCloseModal,
  onComplete,
}) => {
  const {
    onClose: onCloseConfirmDrawer,
    onOpen: onOpenConfirmDrawer,
    isOpen: isOpenConfirmDrawer,
  } = useDisclosure();

  const isCompleted = !!reviewInfo.beerName && !!reviewInfo.rate;
  const [step, setStep] = useState(0);
  const [reviewInputValue, setReviewInputValue] = useState(
    reviewInfo.review ?? ""
  );
  const [beerId, setBeerId] = useState<number | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewInputValue(e.target.value);
  };

  const handleChangeBeerName = (name: string, id: number) => {
    const newBeerReview = { ...reviewInfo, beerName: name };
    onChangeReviewInfo(newBeerReview);
    setBeerId(id);
  };

  const handleChangeRate = (rate: number) => {
    const newBeerReview = { ...reviewInfo, rate: rate };
    onChangeReviewInfo(newBeerReview);
  };

  const handleClickPlaceTag = (place: string | null) => {
    const newBeerReview = { ...reviewInfo, place: place };
    onChangeReviewInfo(newBeerReview);
  };

  useEffect(() => {
    return () => {
      onChangeReviewInfo({
        beerName: null,
        rate: 0,
        place: null,
      });
      setStep(0);
      onCloseModal();
      setReviewInputValue("");
    };
  }, [onChangeReviewInfo, onCloseModal]);

  return (
    <>
      <Modal onClose={onCloseModal} size={"full"} isOpen={isModalOpen}>
        <ModalContent px="20px" pb="40px" maxW="450px" bg="white">
          {step === 0 && (
            <BeerReviewContent
              onOpenDrawer={onOpenConfirmDrawer}
              reviewInfo={reviewInfo}
              onNext={() => setStep(1)}
              handleChangeRate={handleChangeRate}
              handleClickPlaceTag={handleClickPlaceTag}
              handleInputChange={handleInputChange}
              reviewInputValue={reviewInputValue}
              handleClickComplete={onComplete}
              isCompleted={isCompleted}
            />
          )}

          {step === 1 && (
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
        isOpen={isOpenConfirmDrawer}
        onClose={onCloseConfirmDrawer}
        onClickLeftButton={() => {
          onCloseConfirmDrawer();
          onCloseModal();
        }}
        onClickRightButton={onCloseConfirmDrawer}
      />
    </>
  );
};
