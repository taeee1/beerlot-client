import React, { useState } from "react";
import { useCheckUsernameMutation } from "../../../hooks/mutations/useUserMutation";

export const useNicknameHandler = (prevUsername: string) => {
  const [usernameInput, setUsernameInput] = useState<string>(prevUsername);
  const [isUsernameTaken, setIsUsernameTaken] = useState<boolean>(false);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!isTouched) setIsTouched(true);
    setUsernameInput(e.target.value);
    handleCheckUsername(e.target.value);
  };

  const handleCheckUsername = (newUsername: string) => {
    if (newUsername === prevUsername) return;
    checkUsernameTaken(usernameInput);
  };

  const { mutate: checkUsernameTaken } = useCheckUsernameMutation({
    onSuccess: (data) => {
      setIsUsernameTaken(data.taken);
    },
  });

  const validNickname =
    !isTouched ||
    (usernameInput.length > 0 &&
      !isUsernameTaken &&
      usernameInput.length <= MAX_USERNAME_LENGTH);

  const getGuidText = () => {
    if (!isTouched) return "";

    if (usernameInput.length > MAX_USERNAME_LENGTH) {
      return `닉네임은 ${MAX_USERNAME_LENGTH}자 이내로 만들 수 있어요!`;
    }
    if (usernameInput.length === 0) {
      return "닉네임을 정해주세요!";
    }
    if (isUsernameTaken) {
      return "이미 사용 중인 닉네임이에요 :(";
    }
    return "사용할 수 있는 닉네임이에요 :)";
  };

  const usernameGuideText = getGuidText();

  return {
    usernameInput,
    onChangeUsername,
    isUsernameTouched: isTouched,
    validNickname,
    usernameGuideText,
  };
};

const MAX_USERNAME_LENGTH = 9;
