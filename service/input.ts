// nickname

export const getNicknameHelperTextOrOriginalNickname = (
  nicknameInput: string | null,
  originalNickname: string | null
) => {
  if (nicknameInput === originalNickname) return ''
  return getNicknameHelperText(nicknameInput)
}

export const checkIsValidNickname = (nickname: string | null) => {
  if (nickname === null) return null
  if (nickname.length > 9) {
    return false
  }

  if (nickname.length === 0) {
    return false
  }

  return true
}

export const getNicknameHelperText = (input: string | null) => {
  if (input === null) return ''
  if (input.length > 9) {
    return '닉네임은 9자 이내로 만들 수 있어요!'
  }

  if (input.length === 0) {
    return '닉네임을 정해주세요!'
  }

  return '사용할 수 있는 닉네임이에요 :)'
}

// bio
export const isValidOrOriginalBio = (
  bioInput: string | null,
  originalBio: string | null
) => {
  if (bioInput === originalBio) return null
  return checkIsValidBio(bioInput)
}

export const getBioHelperTextOrOriginalBio = (
  bioInput: string | null,
  originalBio: string
) => {
  if (bioInput === originalBio) return ''
  return getBioHelperText(bioInput)
}

export const getBioHelperText = (bio: string | null) => {
  if (bio === null) return ''
  if (bio.length > 25) {
    return '글자수는 25자 이내로 만들 수 있어요!'
  }

  // TODO :추가 예정
}

export const checkIsValidBio = (input: string | null) => {
  if (input === null) return null

  if (input.length > 25) {
    return false
  }

  return true
}
