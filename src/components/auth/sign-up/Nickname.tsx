import {Box, Checkbox, Text, VStack} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useState} from "react";
import {useRecoilState} from "recoil";
import useNicknameInput from "../../../../hooks/useNicknameInput";
import {
  checkIsValidNickname,
  getNicknameHelperText,
} from "../../../../service/input";
import {userInfoState} from "../../../store/atom";
import FloatingButton from "../../shared/FloatingButton";
import NicknameInput from "../../shared/NicknameInput";

const Nickname = () => {
  const [_, setUserInfo] = useRecoilState(userInfoState);
  const [checkedItems, setCheckedItems] = useState([false, false]);
  const {input, handleInputChange} = useNicknameInput();

  const isValid = checkIsValidNickname(input);

  const allChecked = checkedItems.every(Boolean);
  const isReadyForNextStep = allChecked && isValid === true;
  const router = useRouter();

  const handleClick = () => {
    if (!input) return;
    setUserInfo({
      email: "beer.lover@email.com",
      username: input,
    });
    router.push(`/signup/beers`);
  };

  return (
    <VStack alignItems="start" gap="60px" w="100%">
      <Box pl="2.5px" mt="44px">
        <Text textStyle="h1">닉네임을 정해볼까요?</Text>
      </Box>
      <FloatingButton
        onClick={handleClick}
        disabled={!isReadyForNextStep}
        text="다음으로"
        bgColor={isReadyForNextStep ? "orange.200" : "gray.200"}
        textColor={isReadyForNextStep ? "white.100" : "black.100"}
        boxShadow={
          isReadyForNextStep ? "0px 8px 16px rgba(0, 0, 0, 0.3)" : "none"
        }
        _hover={{}}
      />

      <NicknameInput
        input={input}
        isValid={isValid}
        onChange={handleInputChange}
        guideText={getNicknameHelperText(input)}
      />

      <Box px="8px" w="100%">
        <Checkbox
          w="100%"
          bg="gray.100"
          borderRadius="5px"
          py="8px"
          px="6px"
          isChecked={allChecked}
          onChange={(e) =>
            setCheckedItems([e.target.checked, e.target.checked])
          }
        >
          <Text textStyle="h3_bold" textColor="black.100">
            전체 동의
          </Text>
        </Checkbox>
        <Checkbox
          w="100%"
          borderRadius="5px"
          py="8px"
          px="6px"
          isChecked={checkedItems[0]}
          onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
        >
          <Text textStyle="h3" textColor="black.100">
            (필수) 비어랏 이용약관 동의
          </Text>
        </Checkbox>
        <Checkbox
          w="100%"
          borderRadius="5px"
          py="8px"
          px="6px"
          isChecked={checkedItems[1]}
          onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
        >
          <Text textStyle="h3" textColor="black.100">
            (필수) 개인정보 수집 및 이용 동의
          </Text>
        </Checkbox>
      </Box>
    </VStack>
  );
};

export default Nickname;
