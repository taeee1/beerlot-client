import axios from "axios";

export const likeReviewApi = async (reviewId: number, accessToken: string) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const res = await axios.post(
    `/api/v1/reviews/${reviewId}/likes`,
    null,
    config
  );

  return res.data;
};

export const dislikeReviewApi = async (
  reviewId: number,
  accessToken: string
) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const res = await axios.delete(`/api/v1/reviews/${reviewId}/likes`, config);
  return res.data;
};
