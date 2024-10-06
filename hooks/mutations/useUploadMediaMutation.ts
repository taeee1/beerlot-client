import { uploadMediaApi } from '@/api/media/api'
import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query'
import { FailureResponse } from 'types/api'
import { UploadMediaResponse } from '../../types/server/upload/response'
import { UploadMediaRequest } from '../../types/server/upload/request'

export const useUploadMediaMutation = (
  options?: UseMutationOptions<
    UploadMediaResponse,
    FailureResponse,
    UploadMediaRequest
  >
): UseMutationResult<
  UploadMediaResponse,
  FailureResponse,
  UploadMediaRequest
> => {
  return useMutation({
    mutationFn: (data: UploadMediaRequest) => {
      return uploadMediaApi(data.directory, data.formData, data.accessToken)
    },
    ...options,
  })
}
