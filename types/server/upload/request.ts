export interface UploadMediaRequest {
  directory: 'profile' | 'beer' | 'review'
  formData: FormData
  accessToken: string
}
