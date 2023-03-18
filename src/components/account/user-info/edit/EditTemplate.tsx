import {Box, Container, VStack} from "@chakra-ui/react";
import {useRouter} from "next/router";
import React, {useRef, useState} from "react";
import {SetterOrUpdater} from "recoil";
import useNicknameInput from "../../../../../hooks/useNicknameInput";
import {SignUpType} from "../../../../../interface/types";
import {
  checkProfileValidity,
  checkValidBioOrOriginalBio,
  checkValidNicknameOrOriginalNickname,
  getBioHelperText,
  getNicknameHelperTextOrOriginalNickname,
} from "../../../../../service/input";
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
    image_url = `/images/default-profile.png`,
    username,
    statusMessage = "",
  } = userInfo;

  const nicknameInput = useNicknameInput({initialInputState: username});
  const bioInput = useNicknameInput({initialInputState: statusMessage});

  const [imgFile, setImgFile] = useState<string>(image_url);
  const imgRef = useRef<HTMLInputElement>(null);

  // [완료 버튼 활성화 조건]
  // (소개글, 프사 변경 여부 상관 없이)

  // 닉네임은 건드리지 않고 소개 AND/OR 프사 변경되었을 때

  const isValidNickname = checkValidNicknameOrOriginalNickname(
    nicknameInput.input,
    username
  );

  const isValidBio = checkValidBioOrOriginalBio(bioInput.input, statusMessage);
  const isChangeCompleted = checkProfileValidity(isValidNickname, isValidBio);

  const handleClickComplete = () => {
    if (nicknameInput.input === null) return;
    if (bioInput.input === null) return;
    setUserInfo({
      email: userInfo?.email,
      image_url: imgFile,
      username: nicknameInput.input,
      statusMessage: bioInput.input,
    });
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

  const rightTitleStyleProps = {
    isDisabled: !isChangeCompleted,
    textColor: isChangeCompleted ? "orange.200" : "gray.200",
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
              input={nicknameInput.input}
              isValid={isValidNickname}
              onChange={nicknameInput.handleInputChange}
              guideText={getNicknameHelperTextOrOriginalNickname(
                nicknameInput.input,
                username
              )}
            />
            <NicknameInput
              label="소개"
              placeholder="소개는 25자까지 입력이 가능해요!"
              input={bioInput.input}
              isValid={isValidBio}
              onChange={bioInput.handleInputChange}
              guideText={getBioHelperText(bioInput.input)}
            />
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default EditTemplate;
