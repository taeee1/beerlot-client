import {
  Modal,
  ModalContent,
  ModalProps,
  useDisclosure,
} from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  BeerTypeV2,
  CreateReviewRequestTypeV2,
} from "../../../../typedef/review";
import { BeerReviewContent } from "./BeerReviewContent";
import { BeerSearchContent } from "./BeerSearchContent";
import { ReviewExitConfirmationDrawer } from "./ReviewExitConfirmationDrawer";

interface ReviewModalProps {
  reviewInfo: CreateReviewRequestTypeV2;
  isModalOpen: ModalProps["isOpen"];
  onCloseModal: ModalProps["onClose"];
  onComplete: (beerId: number) => void;
  onChangeReviewInfo: (data: CreateReviewRequestTypeV2) => void;
  setBeerInfo?: (data: BeerTypeV2) => void;
  beerInfo?: BeerTypeV2;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isModalOpen,
  reviewInfo,
  beerInfo,
  setBeerInfo,
  onChangeReviewInfo,
  onCloseModal,
  onComplete,
}) => {
  const isBeerEditable = !!setBeerInfo;
  const {
    onClose: onCloseConfirmDrawer,
    onOpen: onOpenConfirmDrawer,
    isOpen: isOpenConfirmDrawer,
  } = useDisclosure();

  const beerName = beerInfo?.name;
  const beerId = beerInfo?.id;
  const isCompleted = !!beerName && !!reviewInfo.rate && !!reviewInfo.content;

  const [step, setStep] = useState(0);

  const handleComplete = () => {
    if (beerId) onComplete(beerId);
  };

  const handleChangeBeerName = (name: string, id: number) => {
    setBeerInfo?.({ id, name });
  };
  const initReviewInfo = () => {
    return {
      content: "",
      image_url: "",
      buy_from: "",
      rate: 0,
    };
  };
  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChangeReviewInfo({ ...reviewInfo, content: e.target.value });
    handleChangeReviewInfo("content", e.target.value);
  };

  const handleChangeReviewInfo = (
    key: string,
    value: string | number | string[]
  ) => {
    onChangeReviewInfo({ ...reviewInfo, [key]: value });
  };

  useEffect(() => {
    return () => {
      setStep(0);
      onCloseModal();
      initReviewInfo();
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
              onNext={isBeerEditable ? () => setStep(1) : undefined}
              onInputChange={handleContentChange}
              onComplete={handleComplete}
              onChangeReviewInfo={handleChangeReviewInfo}
              beerName={beerName ?? ""}
              isCompleted={isCompleted}
            />
          )}

          {step === 1 && (
            <BeerSearchContent
              onBack={() => {
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
          initReviewInfo();
        }}
        onClickRightButton={onCloseConfirmDrawer}
      />
    </>
  );
};
