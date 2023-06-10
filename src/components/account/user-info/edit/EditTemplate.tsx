import {
  useEditUserInfoMutation,
  useUserInfoQuery,
} from "@/../hooks/query/useUserQuery";
import {Box, Container, VStack} from "@chakra-ui/react";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import useNicknameInput from "../../../../../hooks/useNicknameInput";
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

const EditTemplate = () => {
  const router = useRouter();
  const accessToken = Cookies.get("beerlot-oauth-auth-request") ?? "";
  const userQuery = useUserInfoQuery(accessToken ?? "");
  const {
    image_url,
    username,
    status_message: statusMessage,
  } = userQuery?.data ?? {};

  useEffect(() => {
    userQuery.refetch();
  }, []);

  const nicknameInput = useNicknameInput({initialInputState: username});
  const bioInput = useNicknameInput({initialInputState: statusMessage});

  const [imgFile, setImgFile] = useState<string>(image_url);
  const imgRef = useRef<HTMLInputElement>(null);

  const isValidNickname = checkValidNicknameOrOriginalNickname(
    nicknameInput.input,
    username
  );

  const isValidBio = checkValidBioOrOriginalBio(bioInput.input, statusMessage);
  const isChangeCompleted = checkProfileValidity(isValidNickname, isValidBio);

  const {mutateAsync: putUserInfo} = useEditUserInfoMutation(accessToken, {});

  const handleClickComplete = async () => {
    if (nicknameInput.input === null || bioInput.input === null) return;
    await putUserInfo();
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
                프로필 사진 바꾸기
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
              maxLength={25}
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
