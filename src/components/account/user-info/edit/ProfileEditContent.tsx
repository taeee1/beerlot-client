import {useEditUserInfoMutation} from "@/../hooks/query/useUserQuery";
import useInput from "@/../hooks/useNicknameInput";
import {StackProps, VStack} from "@chakra-ui/react";
import Cookies from "js-cookie";
import {
  checkProfileValidity,
  checkValidBioOrOriginalBio,
  checkValidNicknameOrOriginalNickname,
  getBioHelperText,
  getNicknameHelperTextOrOriginalNickname,
} from "../../../../../service/input";
import NicknameInput from "../../../shared/NicknameInput";
import ProfileAvatar from "../../../shared/ProfileAvatar";
import {useRouter} from "next/router";
import LeftXTitleRightComplete from "@/components/shared/Headers/LeftXTitleRightComplete";
import {useRef, useState} from "react";

interface ProfileEditContentProps extends StackProps {
  imageUrl: string | null;
  statusMessage: string | null;
  username: string;
}

const ProfileEditContent: React.FC<ProfileEditContentProps> = ({
  imageUrl,
  statusMessage,
  username,
}) => {
  const accessToken = Cookies.get("beerlot-oauth-auth-request") ?? "";
  const router = useRouter();
  const {input: nicknameInput, onChange: onNicknameChange} = useInput({
    initialInputState: username,
  });
  const [imgFile, setImgFile] = useState<string>("");
  const imgRef = useRef<HTMLInputElement>(null);

  const handleChangeProfileImage = () => {
    if (!imgRef || !imgRef.current || !imgRef.current.files) return;
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (typeof reader.result === "string") setImgFile(reader.result);
    };
  };
  const {input: bioInput, onChange: onBioChange} = useInput({
    initialInputState: statusMessage ?? "",
  });
  const isValidNickname = checkValidNicknameOrOriginalNickname(
    nicknameInput,
    username
  );
  const editUserInfoMutation = useEditUserInfoMutation(accessToken, {
    onSuccess: () => {
      router.push("/account");
    },
  });
  const isValidBio = checkValidBioOrOriginalBio(bioInput, statusMessage);
  const isChangeCompleted = checkProfileValidity(isValidNickname, isValidBio);
  const handleClickComplete = () => {
    editUserInfoMutation.mutate({
      status_message: bioInput,
      image_url: imgFile,
    });
  };
  return (
    <>
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
            src={imageUrl ?? "/images/default_profile_img.png"}
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
            onChange={onNicknameChange}
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
            onChange={onBioChange}
            guideText={getBioHelperText(bioInput)}
          />
        </VStack>
      </VStack>
    </>
  );
};

export {ProfileEditContent};

const rightTitleStyleProps = (isChangeCompleted: boolean) => {
  return {
    isDisabled: !isChangeCompleted,
    textColor: isChangeCompleted ? "orange.200" : "gray.200",
  };
};
