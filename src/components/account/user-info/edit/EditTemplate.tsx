import {Box, Container, VStack} from "@chakra-ui/react";
import {useRouter} from "next/router";
import React, {useRef, useState} from "react";
import {SetterOrUpdater} from "recoil";
import {SignUpType} from "../../../../../interface/types";
import LeftXTitleRightComplete from "../../../shared/Headers/LeftXTitleRightComplete";
import NicknameInput from "../../../shared/NicknameInput";
import ProfileAvatar from "../../../shared/ProfileAvatar";

interface EditTemplateProps {
  userInfo: SignUpType;
  setUserInfo: SetterOrUpdater<SignUpType | null>;
}

const EditTemplate: React.FC<EditTemplateProps> = ({userInfo, setUserInfo}) => {
  const router = useRouter();
  // TODO: error handling should be added
  const {
    image_url = `/image/default-profile.png`,
    username,
    statusMessage = "",
  } = userInfo;

  const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null);
  const [imgFile, setImgFile] = useState<string>(image_url);
  const [nickname, setNickname] = useState(username);
  const [nicknameGuideText, setNicknameGuideText] = useState("");
  const [isBioValid, setIsBioValid] = useState<boolean | null>(null);
  const [bio, setBio] = useState(statusMessage);
  const [bioGuideText, setBioGuideText] = useState("");
  const rightTitleStyleProps = {
    disabled: !isNicknameValid,
    textColor: isNicknameValid ? "orange.200" : "gray.200",
  };
  const imgRef = useRef<HTMLInputElement>(null);

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

  const handleClickComplete = () => {
    setUserInfo({
      email: userInfo?.email,
      image_url: imgFile,
      username: nickname,
      statusMessage: bio,
    });
    // use api
    router.push("/account");
  };

  const handleChangeProfileImage = () => {
    if (!imgRef || !imgRef.current || !imgRef.current.files) return;
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log("reader.result", reader.result);
    reader.onloadend = () => {
      if (typeof reader.result === "string") setImgFile(reader.result);
    };
  };

  return (
    <Box w="full" h="full" bg="gray.100">
      <Container h="full" w="full" bg="white" position="relative" maxW="450px">
        <LeftXTitleRightComplete
          title={"프로필 편집"}
          rightTitleStyleProps={rightTitleStyleProps}
          rightTitle={"완료"}
          onClickRight={handleClickComplete}
        />
        <VStack px="30px" py="10px" gap="32px" pt="50px">
          <VStack>
            <ProfileAvatar
              alt="user profile photo"
              src={imgFile}
              boxSize="100px"
            />
            <form>
              <label
                className="signup-profileImg-label"
                htmlFor="profileImg"
                style={{
                  color: "#FEA801",
                  fontWeight: "700",
                  lineHeight: "24px",
                  fontSize: "14px",
                  letterSpacing: "0.01px",
                  cursor: "pointer",
                }}
              >
                프로필 이미지 추가
              </label>
              <input
                className="signup-profileImg-input"
                type="file"
                accept="image/*"
                id="profileImg"
                onChange={handleChangeProfileImage}
                ref={imgRef}
                style={{display: "none"}}
              />
            </form>
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
      </Container>
    </Box>
  );
};

export default EditTemplate;
