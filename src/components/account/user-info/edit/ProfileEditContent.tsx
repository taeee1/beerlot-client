import { useEditUserInfoMutation } from "@/../hooks/query/useUserQuery";
import useInput from "@/../hooks/useNicknameInput";
import LeftXTitleRightComplete from "@/components/shared/Headers/LeftXTitleRightComplete";
import { StackProps, VStack } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import {
  getBioHelperText,
  getNicknameHelperTextOrOriginalNickname,
  isValidOrOriginalBio,
  isValidOrOriginalNickname,
} from "../../../../../service/input";
import NicknameInput from "../../../shared/NicknameInput";
import ProfileAvatar from "../../../shared/ProfileAvatar";
import { useCheckUsernameMutation } from "../../../../../hooks/mutations/useUserMutation";

interface ProfileEditContentProps extends StackProps {
  imageUrl: string;
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
  const { input: nicknameInput, onChange: onNicknameChange } = useInput({
    initialInputState: username,
  });
  const [imgFile, setImgFile] = useState<string>("");
  const imgRef = useRef<HTMLInputElement>(null);
  const [isDuplicated, setIsDuplicated] = useState(false);
  const { mutate: checkUsername } = useCheckUsernameMutation({
    onSuccess: (data) => {
      setIsDuplicated(data.taken);
    },
    onError: () => {
      setIsDuplicated(false);
    },
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onNicknameChange(e);
    const value = e.target.value;
    checkUsername(value);
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
  const { input: bioInput, onChange: onBioChange } = useInput({
    initialInputState: statusMessage ?? "",
  });

  const editUserInfoMutation = useEditUserInfoMutation(accessToken, {
    onSuccess: () => {
      router.push("/account");
    },
  });

  const handleClickComplete = () => {
    editUserInfoMutation.mutate({
      username: nicknameInput ?? "",
      status_message: bioInput ?? "",
      image_url: imgFile,
    });
  };

  const validNickname = isValidOrOriginalNickname(nicknameInput, username); // null means not changed
  const validBio = isValidOrOriginalBio(bioInput, statusMessage); // null means not changed;
  const isChangeCompleted =
    validNickname !== false && validBio !== false && isDuplicated !== true;

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
            src={imageUrl || "/images/default-profile.png"}
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
              style={{ display: "none" }}
            />
          </form>
        </VStack>
        <VStack gap="px" w="100%">
          <NicknameInput
            input={nicknameInput}
            isValid={validNickname}
            isDuplicated={isDuplicated}
            onChange={handleChange}
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
            isValid={validBio}
            onChange={onBioChange}
            guideText={getBioHelperText(bioInput)}
          />
        </VStack>
      </VStack>
    </>
  );
};

export { ProfileEditContent };

const rightTitleStyleProps = (isChangeCompleted: boolean) => {
  return {
    isDisabled: !isChangeCompleted,
    textColor: isChangeCompleted ? "orange.200" : "gray.200",
  };
};
