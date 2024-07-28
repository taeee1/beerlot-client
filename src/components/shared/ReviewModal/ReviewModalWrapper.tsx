import {
  useCreateReviewMutation,
  useReviewQuery,
  useReviewUpdateMutation,
} from "@/../hooks/query/useReviewQuery";
import { Center, Modal, ModalContent, ModalProps } from "@chakra-ui/react";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { ReviewInfoType } from "../../../../interface/types";
import { BeerlotLoading } from "../Loading";
import { ReviewModal } from "./ReviewModal";

interface ReviewModalWrapperProps {
  reviewId?: number | null;
  isModalOpen: ModalProps["isOpen"];
  onCloseModal: ModalProps["onClose"];
}

export const ReviewModalWrapper: React.FC<ReviewModalWrapperProps> = ({
  reviewId,
  isModalOpen,
  onCloseModal,
}) => {
  const accessToken = Cookies.get("beerlot-oauth-auth-request") ?? "";
  const reviewQuery = useReviewQuery(reviewId);
  const { mutate: createReview } = useCreateReviewMutation(accessToken);
  const { isLoading: _isLoading, isFetching, isRefetching } = reviewQuery;
  const isLoading = _isLoading || isFetching || isRefetching;
  const existingReviewData = reviewQuery.data;
  const [reviewInfo, setReviewInfo] = useState<ReviewInfoType>({
    beerName: null,
    rate: 0,
    buy_from: null,
    content: "",
  });

  useEffect(() => {
    if (existingReviewData) {
      setReviewInfo({
        beerName: existingReviewData.beerName,
        rate: existingReviewData.rate,
        content: existingReviewData.content,
        image_url: existingReviewData.image_url,
      });
    }
  }, [existingReviewData]);

  const { mutate: updateReview } = useReviewUpdateMutation(accessToken);

  const handleComplete = (beerId: number | null) => {
    if (reviewId !== undefined && reviewId !== null) {
      updateReview({ reviewId, newContent: reviewInfo });
    } else {
      if (beerId === null) return;
      createReview({
        beerId: beerId,
        data: reviewInfo,
      });
    }

    onCloseModal();
  };

  if (isLoading) {
    <Modal onClose={onCloseModal} size={"full"} isOpen={isModalOpen}>
      <ModalContent px="20px" pb="40px" maxW="450px" bg="white">
        {isLoading && (
          <Center flex={1}>
            <BeerlotLoading />
          </Center>
        )}
      </ModalContent>
    </Modal>;
  }
  return (
    <ReviewModal
      isModalOpen={isModalOpen}
      onCloseModal={onCloseModal}
      onComplete={handleComplete}
      onChangeReviewInfo={setReviewInfo}
      reviewInfo={reviewInfo}
    />
  );
};
