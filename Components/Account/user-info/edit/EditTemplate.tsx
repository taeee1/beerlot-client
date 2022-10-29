import { Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import NavHeader from "../../../Utils/NavHeader";
import NicknameInput from "../../../Utils/NicknameInput";
import ProfileAvatar from "../../../Utils/ProfileAvatar";

const EditTemplate = () => {
  const MOCK_IMAGE_SRC = "https://picsum.photos/seed/picsum/200/300";
  const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null);
  const [nickname, setNickname] = useState("");
  const [nicknameGuideText, setNicknameGuideText] = useState("");
  const [isBioValid, setIsBioValid] = useState<boolean | null>(null);
  const [bio, setBio] = useState("");
  const [bioGuideText, setBioGuideText] = useState("");

  const onNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const checkNicknameValidation = () => {
    // too long
    if (nickname.length > 9) {
      setNicknameGuideText("닉네임은 9자 이내로 만들 수 있어요!");
      setIsNicknameValid(false);
      return;
    }
    // zero length
    if (nickname.length === 0) {
      setNicknameGuideText("비어 있으면 안됩니다");
      setIsNicknameValid(false);
      return;
    } // 추후 리팩토링
    // duplicated
    // right
    setNicknameGuideText(`사용할 수 있는 닉네임이에요 :)`);
    setIsNicknameValid(true);
  };

  const onNicknameBlur = () => {
    checkNicknameValidation();
  };

  const onBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value);
  };

  const onBioBlur = () => {
    checkBioValidation();
  };

  const checkBioValidation = () => {
    // too long
    if (bio.length > 25) {
      setBioGuideText("글자수는 25자 이내로 만들 수 있어요!");
      setIsBioValid(false);
      return;
    }
    setIsBioValid(true);
  };

  return (
    <>
      <NavHeader />
      <VStack px="30px" py="10px" gap="32px">
        <VStack gap="10px">
          <ProfileAvatar
            alt="user profile photo"
            src={MOCK_IMAGE_SRC}
            boxSize="100px"
          />
          <Text textStyle="h3_bold" textColor="Orange.200">
            프로필 사진 바꾸기
          </Text>
        </VStack>
        <VStack gap="px" w="100%">
          <NicknameInput
            title="닉네임"
            isValid={isNicknameValid}
            onChange={onNicknameChange}
            onBlur={onNicknameBlur}
            guideText={nicknameGuideText}
            placeholder={
              isNicknameValid === null
                ? ""
                : "닉네임은 9자 이내로 만들 수 있어요!"
            }
          />
          <NicknameInput
            title="소개"
            isValid={isBioValid}
            onChange={onBioChange}
            onBlur={onBioBlur}
            guideText={bioGuideText}
            placeholder={
              isBioValid === null ? "소개는 25자까지 입력이 가능해요!" : ""
            }
          />
        </VStack>
      </VStack>
    </>
  );
};

export default EditTemplate;
