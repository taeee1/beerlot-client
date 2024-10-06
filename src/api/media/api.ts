import axios from 'axios'

export const uploadMediaApi = async (
  directory: 'profile' | 'beer' | 'review',
  formData: FormData,
  accessToken: string
) => {
  const url = `/api/v1/files/${directory}`
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessToken}`,
    },
  }
  const response = await axios.post(url, formData, config)
  return response.data
}
