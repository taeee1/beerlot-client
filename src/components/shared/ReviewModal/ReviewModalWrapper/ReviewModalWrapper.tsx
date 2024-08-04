import { ModalProps } from "@chakra-ui/react";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useCreateReviewMutation } from "../../../../../hooks/reviews/useBeer";
import {
  BeerTypeV2,
  CreateReviewRequestTypeV2,
} from "../../../../../typedef/review";
import { ReviewModal } from "../ReviewModal";

interface ReviewModalWrapperProps {
  isModalOpen: ModalProps["isOpen"];
  onCloseModal: ModalProps["onClose"];
}

export const ReviewModalWrapper: React.FC<ReviewModalWrapperProps> = ({
  isModalOpen,
  onCloseModal,
}) => {
  const accessToken = Cookies.get("beerlot-oauth-auth-request") ?? "";

  const { mutate: createReview } = useCreateReviewMutation(accessToken);
  const [beerInfo, setBeerInfo] = useState<BeerTypeV2 | undefined>();
  const [reviewInfo, setReviewInfo] = useState<CreateReviewRequestTypeV2>({
    content: "",
    image_url: [],
    buy_from: "",
    rate: 0,
  });

  const handleComplete = (beerId: number) => {
    if (beerId === null) return;
    createReview({
      beerId: beerId,
      data: reviewInfo,
    });

    onCloseModal();
  };

  return (
    <ReviewModal
      isModalOpen={isModalOpen}
      onCloseModal={onCloseModal}
      onComplete={handleComplete}
      onChangeReviewInfo={setReviewInfo}
      reviewInfo={reviewInfo}
      beerInfo={beerInfo}
      setBeerInfo={setBeerInfo}
    />
  );
};
