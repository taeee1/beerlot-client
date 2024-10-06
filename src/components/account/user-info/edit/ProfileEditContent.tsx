import { useEditUserInfoMutation } from '@/../hooks/query/useUserQuery'
import LeftXTitleRightComplete from '@/components/shared/Headers/LeftXTitleRightComplete'
import { MAX_BIO_LENGTH, useBioHandler } from '@/hooks/bio/useBioHandler'
import { useNicknameHandler } from '@/hooks/nickname/useNicknameHandler'
import { useErrorToast } from '@/hooks/shared/useErrorToast'
import { StackProps, VStack } from '@chakra-ui/react'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import CommonValidationInput from '../../../shared/CommonValidationInput'
import { ProfileUploadAvatar } from './ProfileUploadAvatar'

interface ProfileEditContentProps extends StackProps {
  existingImageURl: string
  username: string
  statusMessage?: string
  usernameUpdatedAt?: string
}

export const ProfileEditContent: React.FC<ProfileEditContentProps> = ({
  existingImageURl,
  username,
  statusMessage,
  usernameUpdatedAt,
}) => {
  const accessToken = Cookies.get('beerlot-oauth-auth-request') ?? ''
  const router = useRouter()
  const showErrorToast = useErrorToast()
  const nextChangeDate = usernameUpdatedAt
    ? dayjs(usernameUpdatedAt).add(30, 'day').format('YYYY-MM-DD')
    : null

  const {
    usernameInput,
    validNickname,
    onChangeUsername,
    usernameGuideText,
    isUsernameTouched,
  } = useNicknameHandler(username)

  // image
  const [imageUrl, setImageUrl] = useState<string>(existingImageURl)

  // bio
  const { bioInput, onChangeBio, validBio, bioGuidText, hasTouchedBio } =
    useBioHandler(statusMessage)

  // submit
  const editUserInfoMutation = useEditUserInfoMutation(accessToken, {
    onError: (error) => {
      showErrorToast(error.response, {
        400: nextChangeDate
          ? `${nextChangeDate} 이후로 변경할 수 있어요!`
          : '닉네임은 30일에 한 번만 변경할 수 있어요 :(',
        // 400: '닉네임은 30일에 한 번만 변경할 수 있어요 :('
      })
    },
    onSuccess: () => {
      router.push('/account')
    },
  })

  const handleClickComplete = () => {
    editUserInfoMutation.mutate({
      username: usernameInput ?? '',
      status_message: bioInput ?? '',
      image_url: imageUrl,
    })
  }

  const isChangeCompleted = validNickname && validBio !== false

  return (
    <>
      <LeftXTitleRightComplete
        title={'프로필 편집'}
        rightTitleStyleProps={rightTitleStyleProps(isChangeCompleted)}
        rightTitle={'완료'}
        onClickRight={handleClickComplete}
      />
      <VStack px='30px' py='10px' gap='32px' pt='50px'>
        <VStack>
          <ProfileUploadAvatar imageUrl={imageUrl} setImageUrl={setImageUrl} />
        </VStack>
        <VStack gap='px' w='100%'>
          <CommonValidationInput
            input={usernameInput}
            isValid={validNickname}
            isTouched={isUsernameTouched}
            onChange={onChangeUsername}
            guideText={usernameGuideText}
          />
          <CommonValidationInput
            label='소개'
            placeholder='소개는 25자까지 입력이 가능해요!'
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
  )
}

const rightTitleStyleProps = (isChangeCompleted: boolean) => {
  return {
    isDisabled: !isChangeCompleted,
    textColor: isChangeCompleted ? 'orange.200' : 'gray.200',
  }
}
