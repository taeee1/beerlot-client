import React, { useState } from "react";

export const useBioHandler = (prevBio?: string) => {
  const [bioInput, setBioInput] = useState<string>(prevBio ?? "");
  const [hasTouchedBio, setHasTouchBio] = useState<boolean>(false);

  const onChangeBio = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setBioInput(e.target.value);
    if (!hasTouchedBio) setHasTouchBio(true);
  };

  const validBio = bioInput.length <= MAX_BIO_LENGTH;

  const getGuidText = () => {
    if (bioInput.length > MAX_BIO_LENGTH) {
      return `소개는 ${MAX_BIO_LENGTH}자 이내로 입력이 가능해요!`;
    }
  };

  const bioGuidText = getGuidText();

  return {
    bioInput,
    onChangeBio,
    hasTouchedBio,
    validBio,
    bioGuidText,
  };
};

export const MAX_BIO_LENGTH = 25;
