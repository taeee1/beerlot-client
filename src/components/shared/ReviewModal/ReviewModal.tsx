import {
  useAllReviewsQuery,
  useCreateReviewMutation,
  useReviewUpdateMutation,
} from "@/../hooks/query/useReviewQuery";
import { MOCK_FEED_FILTER_LIST } from "@/../interface/static";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import React, { ChangeEvent, useState } from "react";
import { ReviewInfoType } from "../../../../interface/types";
import { EditPencil } from "../../../../public/svg";
import { LeftCloseRandom } from "../Headers/LeftCloseRandom";
import BeerNameSection from "./BeerNameSection";
import { BeerPurchaseSection } from "./BeerPurchaseSection";
import { BeerRatingSection } from "./BeerRatingSection";
import { BeerReviewTextSection } from "./BeerReviewTextSection";
import { BeerSearchContent } from "./BeerSearchContent";
import { ReviewCancelDrawer } from "./ReviewCancelDrawer";
import BeerInfo from "@/components/account/beer-info/BeerInfo";
import { useRouter } from "next/router";

interface ReviewModalProps {
  existingReviewInfo?: ReviewInfoType;
  reviewId?: number | null;
  isOpen: ModalProps["isOpen"];
  onClose: ModalProps["onClose"];
  onOpen: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  existingReviewInfo,
  reviewId,
  isOpen,
  onOpen,
  onClose,
}) => {
  const [reviewInfo, setReviewInfo] = useState<ReviewInfoType>({
    beerName: existingReviewInfo?.beerName ?? null,
    rate: existingReviewInfo?.rate ?? 0,
    place: existingReviewInfo?.place ?? "",
    review: existingReviewInfo?.review ?? "",
    image_url: existingReviewInfo?.image_url ?? [""],
  });
  const isCompleted = !!reviewInfo.beerName && !!reviewInfo.rate; // should contain rating stars as well
  const accessToken = Cookies.get("beerlot-oauth-auth-request") ?? "";
  const CloseReviewDrawer = useDisclosure();
  const [step, setStep] = useState(0);
  const [reviewInputValue, setReviewInputValue] = useState(
    existingReviewInfo?.review ?? ""
  );
  const [beerId, setBeerId] = useState<number | null>(null);
  const router = useRouter();
  const allReviewsQuery = useAllReviewsQuery({
    sort: MOCK_FEED_FILTER_LIST[0].tags[0],
  });
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewInputValue(e.target.value);
  };

  const [placeInputValue, setPlaceInputValue] = useState("");

  const handleClickLeftButton = () => {
    // TODO: reset everything and add null type
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

  const handleCreateReview = () => {
    if (!accessToken) {
      router.push("/login");
      return;
    }
    onOpen();
  };

  const handleClickBack = () => {
    setStep(step - 1);
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

  const handleChangePlace = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPlaceInputValue(event.target.value);

  const clearInput = () => {
    setPlaceInputValue("");
  };
  const createReviewMutation = useCreateReviewMutation(
    beerId ?? 0,
    accessToken,
    {
      onSuccess: () => {
        allReviewsQuery.refetch();
      },
    }
  );
  const updatedReviewInfo = {
    rate: reviewInfo.rate,
    buy_from: reviewInfo?.place ?? "",
    content: reviewInputValue,
    image_url:
      "https://fastly.picsum.photos/id/923/200/300.jpg?hmac=eiYSYaG7v46VlrE38Amrg33bd2FzVjaCsQrLMdekyAU",
  };

  const updateReview = useReviewUpdateMutation(
    reviewId ?? 0,
    accessToken,
    updatedReviewInfo,
    {
      onSuccess: () => {
        allReviewsQuery.refetch();
      },
    }
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

    onClose();
    setReviewInfo({
      beerName: null,
      rate: 0,
      place: null,
    });
    clearInput();
    setReviewInputValue("");
  };

  return (
    <Box>
      <Button
        onClick={handleCreateReview}
        w="70px"
        h="70px"
        pos="fixed"
        borderRadius="full"
        bg="orange.300"
        bottom={100}
        right={"10vw"}
        _hover={{}}
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
      <Modal
        onClose={onClose}
        size={"full"}
        isOpen={isOpen}
        autoFocus={false}
        initialFocusRef={undefined}
        finalFocusRef={undefined}
        trapFocus={false}
      >
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
