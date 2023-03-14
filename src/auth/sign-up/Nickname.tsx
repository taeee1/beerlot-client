import {
  Box,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import {useRouter} from "next/router";
import React, {useState} from "react";
import {useRecoilState} from "recoil";
import FloatingButton from "../../shared/FloatingButton";
import {userInfoState} from "../../store/atom";

const Nickname = () => {
  const [_, setUserInfo] = useRecoilState(userInfoState);
  const [checkedItems, setCheckedItems] = useState([false, false]);
  const [input, setInput] = useState<string | null>(null);
  const isValid = checkIsValid(input);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
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

      <FormControl>
        <FormLabel
          textStyle="h3"
          textColor={
            isValid === null ? "gray.300" : isValid ? "orange.200" : "red.100"
          }
        >
          닉네임
        </FormLabel>
        <Input
          type="text"
          value={input ?? ""}
          placeholder="닉네임은 9자 이내로 만들 수 있어요!"
          _placeholder={{
            textColor: "gray.200",
            textStyle: "h2",
          }}
          onChange={handleInputChange}
          borderRadius="none"
          px={0}
          border="none"
          borderBottom="1px solid"
          borderBottomColor={
            isValid === null ? "gray.300" : isValid ? "orange.200" : "red.100"
          }
          _focusVisible={{}}
          _hover={{}}
        />
        {input !== null && (
          <FormHelperText
            marginTop={1}
            textStyle="h4"
            textColor={isValid ? "orange.200" : "red.100"}
          >
            {getHelperText(input)}
          </FormHelperText>
        )}
      </FormControl>

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

const checkIsValid = (input: string | null) => {
  if (input === null) return null;

  if (input.length > 9) {
    return false;
  }

  if (input.length === 0) {
    return false;
  }

  // duplicated
  if (input === "beerlover") {
    return false;
  }

  return true;
};

const getHelperText = (input: string | null) => {
  if (input === null) return "";
  if (input.length > 9) {
    return "닉네임은 9자 이내로 만들 수 있어요!";
  }

  if (input.length === 0) {
    return "닉네임을 정해주세요!";
  }

  // duplicated
  if (input === "beerlover") {
    return "이미 사용 중인 닉네임이에요 :(";
  }

  return "사용할 수 있는 닉네임이에요 :)";
};
