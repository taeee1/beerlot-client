import { useEditUserInfoMutation } from "@/../hooks/query/useUserQuery";
import LeftXTitleRightComplete from "@/components/shared/Headers/LeftXTitleRightComplete";
import { MAX_BIO_LENGTH, useBioHandler } from "@/hooks/bio/useBioHandler";
import { useNicknameHandler } from "@/hooks/nickname/useNicknameHandler";
import { StackProps, VStack } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import CommonValidationInput from "../../../shared/CommonValidationInput";
import { ProfileUploadAvatar } from "./ProfileUploadAvatar";
import { useToast } from "@chakra-ui/react";
interface ProfileEditContentProps extends StackProps {
  existingImageURl: string;
  username: string;
  statusMessage?: string;
}

export const ProfileEditContent: React.FC<ProfileEditContentProps> = ({
  existingImageURl,
  username,
  statusMessage,
}) => {
  const accessToken = Cookies.get("beerlot-oauth-auth-request") ?? "";
  const router = useRouter();
  const toast = useToast();

  const {
    usernameInput,
    validNickname,
    onChangeUsername,
    usernameGuideText,
    isUsernameTouched,
  } = useNicknameHandler(username);

  // image
  const [imageUrl, setImageUrl] = useState<string>(existingImageURl);

  // bio
  const { bioInput, onChangeBio, validBio, bioGuidText, hasTouchedBio } =
    useBioHandler(statusMessage);

  // submit
  const editUserInfoMutation = useEditUserInfoMutation(accessToken, {
    onSuccess: () => {
      router.push("/account");
    },
    onError: (error) => {
      toast({
        title: error.message,
        status: "error",
        isClosable: true,
      });
    },
  });

  const handleClickComplete = () => {
    editUserInfoMutation.mutate({
      username: usernameInput ?? "",
      status_message: bioInput ?? "",
      image_url: imageUrl,
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
          <ProfileUploadAvatar imageUrl={imageUrl} setImageUrl={setImageUrl} />
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
            maxLength={MAX_BIO_LENGTH}
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
