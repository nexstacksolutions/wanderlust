import express from "express";
import asyncWrap from "../middlewares/asyncWrap.js";
import Review from "../models/Review.js";
import { reviewSchema } from "../schema.js";
import { isLoggedIn, isOwner, validateSchema } from "../middlewares/auth.js";
import { reviewController } from "../controllers/reviews.js";

const router = express.Router({ mergeParams: true });

// Add review
router.post(
  "/",
  isLoggedIn("add review"),
  validateSchema(reviewSchema),
  asyncWrap(reviewController.addReview)
);

// Delete review
router.delete(
  "/:reviewId",
  isLoggedIn("delete review"),
  isOwner(Review),
  asyncWrap(reviewController.deleteReview)
);

export { router as reviewRoutes };
