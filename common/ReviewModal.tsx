import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalContentProps,
  ModalFooter,
  ModalHeader,
  Tag,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, {ChangeEvent, useState} from "react";
import {ReviewStatic} from "../interface/static";
import {BeerResultType, CategoryType, ReviewType} from "../interface/types";
import {
  EditPencil,
  OrangeCamera,
  RightArrow,
  CrossX,
  CrossXBlack,
  WhiteCross,
} from "../public/svg";
import SearchInput from "../src/search/SearchInput";
import BottomDrawer from "./BottomDrawer";
import {LeftBackRandom} from "./headers/LeftBackRandom";
import {LeftCloseRandom} from "./headers/LeftCloseRandom";
import {Rating} from "./Rating";

export const ReviewModal = () => {
  const [reviewInfo, setReviewInfo] = useState<ReviewType>({
    beerName: null,
    rate: 0,
  });
  const isCompleted = !!reviewInfo.beerName && !!reviewInfo.rate; // should contain rating stars as well
  const CloseReviewDrawer = useDisclosure();
  const [step, setStep] = useState(0);
  const [reviewInputValue, setReviewInputValue] = useState("");
  const [placeInputValue, setPlaceInputValue] = useState("");
  const [attachedFile, setAttachedPhoto] = useState([]);
  const {isOpen, onOpen, onClose} = useDisclosure();

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewInputValue(e.target.value);
  };
  const handleSizeClick = () => {
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

  return (
    <Box position={"relative"}>
      <Button
        onClick={handleSizeClick}
        w="70px"
        h="70px"
        pos="fixed"
        borderRadius="full"
        bg="orange.300"
        right="21px"
        bottom="72.5px"
      >
        {/* TODO: should be replaced */}
        <EditPencil />
      </Button>
      {/* LOGOUT drawer */}
      <BottomDrawer
        headerText={"정말로 나가실 건가요?"}
        onClose={CloseReviewDrawer.onClose}
        isOpen={CloseReviewDrawer.isOpen}
        boxStyle={{
          justifyContent: "center",
          gap: "50px",
          w: "full",
          bg: "white",
          p: "38px 20px 34px 21px",
          borderRadius: "10px 10px 0px 0px",
        }}
        leftButtonText={"나가기"}
        leftButtonStyle={{
          w: "full",
          py: "10px",
          px: "39px",
          onClick: () => {
            // TODO: reset everything
            setReviewInfo({
              beerName: null,
              rate: 0,
              place: null,
            });
            onClose();
            clearInput();
            CloseReviewDrawer.onClose();
          },
        }}
        rightButtonText={"계속 작성하기"}
        rightButtonStyle={{
          w: "full",
          bg: "blue.100",
          py: "10px",
          px: "22px",
          onClick: () => {
            CloseReviewDrawer.onClose();
          },
        }}
      />
      <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
        {step === 0 && (
          <ModalContent px="20px" pb="40px" maxW="452px">
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
                <Flex
                  onClick={() => setStep(1)}
                  p="10px"
                  justifyContent="space-between"
                  alignItems="center"
                  w="full"
                  cursor={"pointer"}
                >
                  <VStack gap="10px" alignItems={"flex-start"}>
                    <Text textStyle="h2" textColor="black.100">
                      맥주 이름을 골라주세요!
                    </Text>
                    {reviewInfo.beerName && (
                      <Text textStyle="h2_bold" textColor="orange.200">
                        {reviewInfo.beerName}
                      </Text>
                    )}
                  </VStack>

                  <IconButton
                    justifyContent="center"
                    alignItems="center"
                    size="20px"
                    aria-label="right-arrow"
                    as={RightArrow}
                  />
                </Flex>
                {/* rating */}
                <Flex flexDir="column" p="10px" gap="10px">
                  <Text textStyle="h2" textColor="black.100">
                    얼마나 맛있었나요?
                  </Text>
                  <Rating
                    starSize={24}
                    onClick={handleChangeRate}
                    rate={reviewInfo.rate}
                  />
                </Flex>
                {/* purchase */}
                <VStack p="10px" gap="10px" w="full" alignItems={"flex-start"}>
                  <Box>
                    <Text as="span" textStyle="h2" textColor="black.100">
                      이 맥주 어디서 구매하셨나요?{" "}
                    </Text>
                    <Text as="span" textStyle="h2" textColor="gray.200">
                      (선택)
                    </Text>
                  </Box>
                  <HStack w="full" gap="10px" justify={"space-between"}>
                    {reviewInfo.place ? (
                      <HStack>
                        <Tag
                          justifyContent="row"
                          borderRadius={"4px"}
                          bg="white"
                          border="1px solid"
                          borderColor={"orange.200"}
                          cursor="pointer"
                        >
                          <Text textStyle={"h2"} textColor="orange.200">
                            {reviewInfo.place}
                          </Text>
                        </Tag>
                        {reviewInfo.place === "기타" && (
                          <HStack
                            px={"0px"}
                            py={"2px"}
                            borderBottom="1px solid"
                            borderBottomColor={"orange.200"}
                          >
                            {/* styling slightly weird, width should be fixed */}
                            <Input
                              onChange={handleChangePlace}
                              value={placeInputValue}
                              w="auto"
                              h="auto"
                              border="none"
                              px={"0px"}
                              borderRadius={"none"}
                              focusBorderColor="none"
                              placeholder="직접 입력해주세요!"
                              _placeholder={{color: "orange.100"}}
                              color="orange.200"
                              textStyle={"h2"}
                            />

                            <IconButton
                              onClick={clearInput}
                              bg="gray.200"
                              size={"24px"}
                              borderRadius="full"
                              px={"0px"}
                              aria-label="delete-x-button"
                              icon={<WhiteCross />}
                              _hover={{}}
                              _active={{}}
                            />
                          </HStack>
                        )}
                      </HStack>
                    ) : (
                      <Flex gap="10px">
                        {purchasePlaces.map((place) => {
                          return (
                            <Tag
                              borderRadius={"4px"}
                              bg="gray.100"
                              key={place}
                              size="md"
                              cursor="pointer"
                              onClick={() => handleClickPlaceTag(place)}
                            >
                              <Text textStyle={"h2"} textColor="gray.300">
                                {place}
                              </Text>
                            </Tag>
                          );
                        })}
                      </Flex>
                    )}

                    {reviewInfo.place && (
                      <IconButton
                        bg="initial"
                        size={"24px"}
                        px={"0px"}
                        aria-label="delete-x-button"
                        icon={<CrossXBlack />}
                        _hover={{}}
                        _active={{}}
                        onClick={() => handleClickPlaceTag(null)}
                      />
                    )}
                  </HStack>
                </VStack>
                {/* review */}
                <VStack p="10px" w="full" alignItems={"flex-start"} gap="10px">
                  <Box>
                    <Text as="span" textStyle="h2" textColor="black.100">
                      더 자세한 후기가 궁금해요!{" "}
                    </Text>
                    <Text as="span" textStyle="h2" textColor="gray.200">
                      (선택)
                    </Text>
                  </Box>
                  <VStack
                    w="full"
                    gap="10px"
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="10px"
                    p="10px 10px 5px"
                    h="200px"
                  >
                    {/* TODO: should remove border on focus
               TODO: and resize icon */}
                    <Textarea
                      resize={"none"}
                      focusBorderColor="none"
                      w="full"
                      border="none"
                      h="full"
                      p="0px"
                      value={reviewInputValue}
                      onChange={handleInputChange}
                      _placeholder={{
                        textStyle: "h3",
                        textColor: "gray.200",
                      }}
                      placeholder="이 맥주가 맘에 드는/ 안 드는 자세한 이유를 들려주세요! 아님 맥주에 관한 추억이나.. 꿀조합 안주를 공유해볼까요~?"
                      maxLength={2000}
                    />
                    <Flex justify="flex-end" w="full">
                      <Text textStyle="h2" textColor="gray.200">
                        {reviewInputValue.length} /{" "}
                        {ReviewStatic.ReviewInputMaxLength}
                      </Text>
                    </Flex>
                  </VStack>
                  {/* sholud remove default marginTop */}
                  <Button
                    w="full"
                    bg="inherit"
                    _hover={{}}
                    border="1px solid"
                    borderColor="orange.200"
                    borderRadius="10px"
                    p="5px 10px"
                    aria-label="attach-photo"
                    gap="10px"
                    mt="0px"
                    _notFirst={{marginInlineStart: "0px", marginTop: "0px"}}
                  >
                    <OrangeCamera />
                    <Text textStyle="h3" textColor="orange.200">
                      사진 첨부하기 ({attachedFile.length}/
                      {ReviewStatic.numberOfMaxAttachedFile})
                    </Text>
                  </Button>
                </VStack>
              </VStack>
            </ModalBody>
            <ModalFooter px={0}>
              <Button
                onClick={() => {
                  console.log("reviewInfo", reviewInfo);
                  onClose();
                  setReviewInfo({
                    beerName: null,
                    rate: 0,
                    place: null,
                  });
                  clearInput();
                }}
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

//TODO : should be replaced
export const purchasePlaces = ["편의점", "펍", "대형마트", "기타"];

interface BeerSearchContentProps extends ModalContentProps {
  onClickBack: () => void;
  onChangeBeerName: (name: string) => void;
}

const BeerSearchContent: React.FC<BeerSearchContentProps> = ({
  onClickBack,
  onChangeBeerName,
  ...props
}) => {
  const [value, setValue] = useState<string>("");
  // recoil state가 되어야 함.
  const [allBeers, setAllBeers] = useState<BeerResultType[]>([]);
  const MOCK_CATEGORY = [
    {
      id: 0,
      name_ko: "에일",
      name_en: "ale",
      description: "This is ale",
    },
    {
      id: 1,
      name_ko: "라거",
      name_en: "Lagar",
      description: "This is Lagar",
    },
  ];
  const [selectedItems, setSelectedItems] = useState<any[]>(MOCK_CATEGORY);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    // setSelectedItems(filterSearchResult(e.target.value));
  };

  const clearValue = () => {
    setValue("");
  };

  const handleClick = (e: any) => {
    const value = e.target.innerHTML;
    onClickBack();
    onChangeBeerName(value);
  };

  return (
    <ModalContent px="20px" {...props}>
      <ModalHeader pt="46px">
        <LeftBackRandom onClick={onClickBack} title="맥주 이름" />
      </ModalHeader>
      <ModalBody p="10px 20px" h="full">
        <VStack
          h="full"
          gap="10px"
          justifyContent="flex-start"
          alignItems={"flex-start"}
        >
          {/* search bar  */}
          <SearchInput onChange={handleChange} clearValue={clearValue} />
          {/* search results */}
          <VStack px="10px">
            {selectedItems.map((item: CategoryType) => {
              return (
                <Box key={item.id} py="10px" onClick={handleClick}>
                  <Text textStyle="h2" textColor={"black.100"}>
                    {item.name_ko}
                  </Text>
                </Box>
              );
            })}
          </VStack>
        </VStack>
      </ModalBody>
    </ModalContent>
  );
};
