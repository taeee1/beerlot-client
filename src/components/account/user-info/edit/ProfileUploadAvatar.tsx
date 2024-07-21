import Cookies from "js-cookie";
import { useRef, useState } from "react";
import { useUploadMediaMutation } from "../../../../../hooks/mutations/useUploadMediaMutation";
import ProfileAvatar from "../../../shared/ProfileAvatar";
import { set } from "lodash";

interface ProfileUploadAvatarProps {
  imageUrl: string;
  setImageUrl: (url: string) => void;
}

export const ProfileUploadAvatar: React.FC<ProfileUploadAvatarProps> = ({
  imageUrl,
  setImageUrl,
}) => {
  const accessToken = Cookies.get("beerlot-oauth-auth-request") ?? "";
  const { mutate } = useUploadMediaMutation({
    onSuccess: (data: { urls: string[] }) => {
      const newUrl = data.urls[0];
      setImageUrl(newUrl);
    },
    onError: (error: any) => {
      console.error("onError", error);
    },
  });

  const imgRef = useRef<HTMLInputElement>(null);

  const handleChangeProfileImage = async () => {
    if (!imgRef || !imgRef.current || !imgRef.current.files) return;
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append("files", file);
    mutate({
      directory: "profile",
      formData,
      accessToken,
    });
  };

  return (
    <>
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
    </>
  );
};
