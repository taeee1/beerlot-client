import { useEditUserInfoMutation } from "@/../hooks/query/useUserQuery";
import LeftXTitleRightComplete from "@/components/shared/Headers/LeftXTitleRightComplete";
import { useNicknameHandler } from "@/hooks/nickname/useNicknameHandler";
import { StackProps, VStack } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { MAX_BIO_LENGTH, useBioHandler } from "@/hooks/bio/useBioHandler";
import CommonValidationInput from "../../../shared/CommonValidationInput";
import ProfileAvatar from "../../../shared/ProfileAvatar";

interface ProfileEditContentProps extends StackProps {
  imageUrl: string;
  username: string;
  statusMessage?: string;
}

export const ProfileEditContent: React.FC<ProfileEditContentProps> = ({
  imageUrl,
  username,
  statusMessage,
}) => {
  const accessToken = Cookies.get("beerlot-oauth-auth-request") ?? "";
  const router = useRouter();

  const {
    usernameInput,
    validNickname,
    onChangeUsername,
    usernameGuideText,
    isUsernameTouched,
  } = useNicknameHandler(username);

  /**
   * image
   */

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

  /** bio */
  const { bioInput, onChangeBio, validBio, bioGuidText, hasTouchedBio } =
    useBioHandler(statusMessage);

  /**
   * onSubmit
   */
  const editUserInfoMutation = useEditUserInfoMutation(accessToken, {
    onSuccess: () => {
      router.push("/account");
    },
  });

  const handleClickComplete = () => {
    editUserInfoMutation.mutate({
      username: usernameInput ?? "",
      status_message: bioInput ?? "",
      image_url: imgFile,
    });
  };

  const isChangeCompleted = validNickname && validBio !== false;

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
          <CommonValidationInput
            input={usernameInput}
            isValid={validNickname}
            isTouched={isUsernameTouched}
            onChange={onChangeUsername}
            guideText={usernameGuideText}
          />
          <CommonValidationInput
            label="소개"
            placeholder="소개는 25자까지 입력이 가능해요!"
            input={bioInput}
            isTouched={hasTouchedBio}
            isValid={validBio}
            onChange={onChangeBio}
            guideText={bioGuidText}
          />
        </VStack>
      </VStack>
    </>
  );
};

const rightTitleStyleProps = (isChangeCompleted: boolean) => {
  return {
    isDisabled: !isChangeCompleted,
    textColor: isChangeCompleted ? "orange.200" : "gray.200",
  };
};
