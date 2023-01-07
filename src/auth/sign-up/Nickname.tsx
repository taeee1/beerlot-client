import {Box, Checkbox, Text, VStack} from "@chakra-ui/react";
import {useRouter} from "next/router";
import React, {useState} from "react";
import {useRecoilState} from "recoil";
import FloatingButton from "../../../common/FloatingButton";
import NicknameInput from "../../../common/NicknameInput";
import {userInfoState} from "../../store/atom";

const Nickname = () => {
  const [_, setUserInfo] = useRecoilState(userInfoState);
  const [checkedItems, setCheckedItems] = useState([false, false]);
  const [curNickname, setCurNickName] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [guideText, setGuideText] = useState("");
  const allChecked = checkedItems.every(Boolean);
  const isFullfilled = allChecked && isValid === true;
  const router = useRouter();

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

  const handleClick = () => {
    setUserInfo({
      email: "beer.lover@email.com",
      username: curNickname,
    });
    router.push(`/signup/beers`);
  };

  return (
    <>
      <FloatingButton
        onClick={handleClick}
        disabled={!isFullfilled}
        text="다음으로"
        bgColor={isFullfilled ? "orange.200" : "gray.200"}
        textColor={isFullfilled ? "white.100" : "black.100"}
        boxShadow={isFullfilled ? "0px 8px 16px rgba(0, 0, 0, 0.3)" : "none"}
      />

      <VStack alignItems="start" gap="60px" w="100%" pt="44px">
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
