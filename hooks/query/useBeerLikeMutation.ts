import { dislikeBeerApi, likeBeerApi } from '@/api/beers/api'
import { FailureResponseV2 } from '@/types/api'
import { useMutation, UseMutationOptions } from 'react-query'

export const useBeerLikeMutation = (
  accessToken: string,
  options?: UseMutationOptions<void, FailureResponseV2, number> // number 타입을 추가
) => {
  return useMutation<void, FailureResponseV2, number>( // 제네릭 타입 추가
    (beerId: number) => likeBeerApi(beerId, accessToken),
    options
  )
}

export const useBeerDislikeMutation = (
  accessToken: string,
  options?: UseMutationOptions<void, FailureResponseV2, number>
) => {
  return useMutation({
    mutationFn: (beerId: number) => dislikeBeerApi(beerId, accessToken),
    ...options,
  })
}
// shift + command + 화살표 (함수 통째로 이동)

// shift + option + 화살표 (한 줄 이동)
