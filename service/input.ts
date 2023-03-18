export const checkValidNicknameOrOriginalNickname = (
  nicknameInput: string | null,
  originalNickname: string
) => {
  if (nicknameInput === originalNickname) return null;
  return checkIsValidNickname(nicknameInput);
};

export const getNicknameHelperTextOrOriginalNickname = (
  nicknameInput: string | null,
  originalNickname: string
) => {
  if (nicknameInput === originalNickname) return "";
  return getNicknameHelperText(nicknameInput);
};

export const checkValidBioOrOriginalBio = (
  bioInput: string | null,
  originalBio: string
) => {
  if (bioInput === originalBio) return null;
  return checkIsValidBio(bioInput);
};

export const getBioHelperTextOrOriginalBio = (
  bioInput: string | null,
  originalBio: string
) => {
  if (bioInput === originalBio) return "";
  return getBioHelperText(bioInput);
};

export const checkProfileValidity = (
  isValidNickname: boolean | null,
  isValidBio: boolean | null
) => {
  if (isValidNickname === false) {
    return false;
  }
  if (isValidBio === false) {
    return false;
  }
  return true;
};

export const checkIsValidNickname = (input: string | null) => {
  if (input === null) return null;

  if (input.length > 9) {
    return false;
  }

  if (input.length === 0) {
    return false;
  }

  // duplicated
  if (input === "beerlover") {
    return false;
  }

  return true;
};

export const getNicknameHelperText = (input: string | null) => {
  if (input === null) return "";
  if (input.length > 9) {
    return "닉네임은 9자 이내로 만들 수 있어요!";
  }

  if (input.length === 0) {
    return "닉네임을 정해주세요!";
  }

  // duplicated
  if (input === "beerlover") {
    return "이미 사용 중인 닉네임이에요 :(";
  }

  return "사용할 수 있는 닉네임이에요 :)";
};

export const getBioHelperText = (bio: string | null) => {
  if (bio === null) return "";
  if (bio.length > 25) {
    return "글자수는 25자 이내로 만들 수 있어요!";
  }

  // TODO :추가 예정
};

export const checkIsValidBio = (input: string | null) => {
  if (input === null) return null;

  if (input.length > 25) {
    return false;
  }

  if (input.length === 0) {
    return false;
  }

  return true;
};
