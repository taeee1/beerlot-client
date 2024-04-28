import { Box, Container, Flex } from "@chakra-ui/react";
import { LeftBackCompleteCircles } from "../../shared/Headers/LeftBackCompleteCircles";
import Nickname from "./Nickname";
import { useState } from "react";
import CompleteTemplate from "./CompleteTemplate";
import { SignUpType } from "../../../../interface/types";
import BeerTasteSelection from "./BeerTasteSelection";

const SignUpTemplate = () => {
  const [step, setStep] = useState<"nickname" | "beers" | "complete">(
    "nickname"
  );
  const [userInfo, setUserInfo] = useState<SignUpType>({});
  const [chosenBeerIds, setChosenBeerIds] = useState<number[]>([]);

  const updateChooseBeerIds = (beerId: number) => {
    setChosenBeerIds((prev) =>
      prev.includes(beerId)
        ? prev.filter((id) => id !== beerId)
        : [...prev, beerId]
    );
  };

  const updateUserInfo = (key: keyof SignUpType, value: string) => {
    setUserInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step === "nickname") {
      setStep("beers");
    } else if (step === "beers") {
      setStep("complete");
    }
  };

  return (
    <Box w="full" h="full" bg="gray.100">
      <Container h="full" w="full" bg="white" maxW="450px" pos="relative">
        <Flex px="27.5px" pb="73px" pt="34px" flexDirection="column">
          <LeftBackCompleteCircles
            isFirstCircleDone={true}
            isSecondCircleDone={step !== "nickname"}
          />
          {step === "nickname" && (
            <Nickname setUserInfo={updateUserInfo} onNext={handleNext} />
          )}
          {step === "beers" && (
            <BeerTasteSelection
              username={userInfo.username ?? ""}
              chosenBeerIds={chosenBeerIds}
              updateChooseBeerIds={updateChooseBeerIds}
              onNext={handleNext}
            />
          )}
          {step === "complete" && <CompleteTemplate userInfo={userInfo} />}
        </Flex>
      </Container>
    </Box>
  );
};

export default SignUpTemplate;
