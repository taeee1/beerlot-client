import {
  Center,
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
import { BeerlotLoading } from "../Loading";

interface ReviewModalProps {
  reviewInfo?: CreateReviewRequestTypeV2;
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
  const [step, setStep] = useState(0);
  const {
    onClose: onCloseConfirmDrawer,
    onOpen: onOpenConfirmDrawer,
    isOpen: isOpenConfirmDrawer,
  } = useDisclosure(); 
 
  useEffect(() => {
    return () => {
      setStep(0);
      onCloseModal();
      initReviewInfo();
    };
  }, [onChangeReviewInfo, onCloseModal]);

 
  const beerName = beerInfo?.name;
  const beerId = beerInfo?.id;
  const isCompleted = !!beerName && !!reviewInfo?.rate && !!reviewInfo?.content;

 

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
    if(!reviewInfo) return;
    onChangeReviewInfo({ ...reviewInfo, content: e.target.value });
    handleChangeReviewInfo("content", e.target.value);
  };

  const handleChangeReviewInfo = (
    key: string,
    value: string | number | string[]
  ) => {
    if(!reviewInfo) return;
    onChangeReviewInfo({ ...reviewInfo, [key]: value });
  };


  return (
    <>
      <Modal onClose={onCloseModal} size={"full"} isOpen={isModalOpen} >
        <ModalContent px="20px" h={'fit-content'} pb="40px" maxW="450px" bg="white">
          {!reviewInfo &&  
          <Center h={'full'} >
            <BeerlotLoading />
            </Center>
            }
          {reviewInfo && step === 0 && (
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

          {reviewInfo && step === 1 && (
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
