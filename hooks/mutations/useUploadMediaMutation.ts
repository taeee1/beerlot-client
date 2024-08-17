import { uploadMediaApi } from "@/api/media/api";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "react-query";
import { FailureResponse } from "types/api";

interface UploadMediaResponse {
  urls: string[];
}
interface UploadMediaRequest {
  directory: "profile" | "beer" | "review";
  formData: FormData;
  accessToken: string;
}

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
      return uploadMediaApi(data.directory, data.formData, data.accessToken);
    },
    ...options,
  });
};
