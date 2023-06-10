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
import {POLICY_LABEL} from "@/../types/common";

const EditTemplate = () => {
  const router = useRouter();
  const accessToken = Cookies.get("beerlot-oauth-auth-request") ?? "";
  const userQuery = useUserInfoQuery(accessToken ?? "");
  const {image_url = "", username} = userQuery?.data;
  const statusMessage = ""; // TODO: fix it
  useEffect(() => {
    console.log(userQuery.data);
  });

  useEffect(() => {
    userQuery.refetch();
  }, []);

  const {input: nicknameInput, handleInputChange: onNicknameInputChange} =
    useNicknameInput({
      initialInputState: username ?? "",
    });
  const {input: bioInput, handleInputChange: onBioInputChange} =
    useNicknameInput({initialInputState: statusMessage ?? ""});

  const [imgFile, setImgFile] = useState<string>("");
  const imgRef = useRef<HTMLInputElement>(null);

  const isValidNickname = checkValidNicknameOrOriginalNickname(
    nicknameInput,
    username
  );

  const isValidBio = checkValidBioOrOriginalBio(bioInput, statusMessage);
  const isChangeCompleted = checkProfileValidity(isValidNickname, isValidBio);

  const {mutateAsync: putUserInfo} = useEditUserInfoMutation(accessToken, {
    username: nicknameInput ?? "",
    status_message: bioInput ?? "",
    image_url: imgFile,
    agreed_policies: [
      POLICY_LABEL.PERSONAL_INFORMATION_POLICY,
      POLICY_LABEL.TERMS_OF_SERVICE,
    ],
  });

  const handleClickComplete = () => {
    router.push("/account");
  };

  const handleChangeProfileImage = () => {
    if (!imgRef || !imgRef.current || !imgRef.current.files) return;
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (typeof reader.result === "string") setImgFile(reader.result);
    };
  };

  return (
    <Box w="full" h="full" bg="gray.100">
      <Container h="full" w="full" bg="white" position="relative" maxW="450px">
        <LeftXTitleRightComplete
          title={"프로필 편집"}
          rightTitleStyleProps={rightTitleStyleProps(isChangeCompleted)}
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
              input={nicknameInput}
              isValid={isValidNickname}
              onChange={onNicknameInputChange}
              guideText={getNicknameHelperTextOrOriginalNickname(
                nicknameInput,
                username
              )}
            />
            <NicknameInput
              label="소개"
              maxLength={25}
              placeholder="소개는 25자까지 입력이 가능해요!"
              input={bioInput}
              isValid={isValidBio}
              onChange={onBioInputChange}
              guideText={getBioHelperText(bioInput)}
            />
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default EditTemplate;

const rightTitleStyleProps = (isChangeCompleted: boolean) => {
  return {
    isDisabled: !isChangeCompleted,
    textColor: isChangeCompleted ? "orange.200" : "gray.200",
  };
};
