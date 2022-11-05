import { Box, Checkbox, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CheckedBox, CheckedOrange, UncheckedBox } from "../../../public/svg";
import FloatingButton from "../../Utils/FloatingButton";
import NicknameInput from "../../Utils/NicknameInput";

const Nickname = () => {
  const [checkedItems, setCheckedItems] = useState([false, false]);
  const [curNickname, setCurNickName] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [guideText, setGuideText] = useState("");
  const [isFullfilled, setIsFullfilled] = useState<boolean>(false);
  const allChecked = checkedItems.every(Boolean);

  useEffect(() => {
    setIsFullfilled(allChecked && isValid === true);
  }, [allChecked, isValid]);

  const checkValidation = () => {
    // too long
    if (curNickname.length > 9) {
      setGuideText("닉네임은 9자 이내로 만들 수 있어요!");
      setIsValid(false);
      return;
    }
    // zero length
    if (curNickname.length === 0) {
      setGuideText("비어 있으면 안됩니다");
      setIsValid(false);
      return;
    } // 추후 리팩토링
    // duplicated
    // right
    setGuideText(`사용할 수 있는 닉네임이에요 :)`);
    setIsValid(true);
  };

  const onBlur = () => {
    checkValidation();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurNickName(e.target.value);
  };

  return (
    <>
      <FloatingButton
        disabled={!isFullfilled}
        text="다음으로"
        href={`/signup/beers`}
        bgColor={isFullfilled ? "orange.200" : "gray.200"}
        textColor={isFullfilled ? "white.100" : "black.100"}
        boxShadow={isFullfilled ? "0px 8px 16px rgba(0, 0, 0, 0.3)" : "none"}
      />

      <VStack alignItems="start" gap="60px" w="100%">
        <Box pl="2.5px" mt="62px">
          <Text textStyle="h1">닉네임을 정해볼까요?</Text>
        </Box>
        <NicknameInput
          title="닉네임"
          isValid={isValid}
          onChange={onChange}
          onBlur={onBlur}
          guideText={guideText}
          placeholder={
            isValid === null ? "" : "닉네임은 9자 이내로 만들 수 있어요!"
          }
        />
        <Box px="8px" w="100%">
          <Checkbox
            icon={allChecked ? <CheckedBox /> : <UncheckedBox />}
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
            colorScheme="undefined"
            w="100%"
            borderRadius="5px"
            py="8px"
            px="6px"
            icon={checkedItems[0] ? <CheckedBox /> : <UncheckedBox />}
            isChecked={checkedItems[0]}
            onChange={(e) =>
              setCheckedItems([e.target.checked, checkedItems[1]])
            }
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
            icon={checkedItems[1] ? <CheckedOrange /> : <UncheckedBox />}
            isChecked={checkedItems[1]}
            onChange={(e) =>
              setCheckedItems([checkedItems[0], e.target.checked])
            }
          >
            <Text textStyle="h3" textColor="black.100">
              (필수) 개인정보 수집 및 이용 동의
            </Text>
          </Checkbox>
        </Box>
      </VStack>
    </>
  );
};

export default Nickname;
