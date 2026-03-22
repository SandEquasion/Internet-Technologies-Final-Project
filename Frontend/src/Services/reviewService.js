import { request } from "./api";

export const getProductReviews = (productId) =>
  request(`/reviews/${productId}`);

export const createReview = (productId, reviewData) =>
  request(`/reviews/${productId}`, {
    method: "POST",
    body: JSON.stringify(reviewData),
  });

export const deleteReview = (reviewId) =>
  request(`/reviews/${reviewId}`, {
    method: "DELETE",
  });