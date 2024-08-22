import Listing from "../models/Listing.js";
import Review from "../models/Review.js";
import ExpressError from "../classes/ExpressError.js";

const addReview = async (req, res) => {
  const listing = await Listing.findById(req.params.listingId);
  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  const newReview = new Review(req.body.review);
  listing.reviews.push(newReview);
  newReview.author = req.user._id;

  // Save both the new review and the listing simultaneously
  const Results = await Promise.all([newReview.save(), listing.save()]);
  req.flash("success", "review added successfully");

  // Log the results
  console.log("New Review Saved:", Results[0]); // Result of saving the new review
  console.log("Listing Updated:", Results[1]); // Result of updating the listing

  res.redirect(`/listings/${listing._id}`);
};

const deleteReview = async (req, res) => {
  const { listingId, reviewId } = req.params;

  const Results = await Promise.all([
    Review.findByIdAndDelete(reviewId),
    Listing.findByIdAndUpdate(listingId, { $pull: { reviews: reviewId } }),
  ]);
  req.flash("success", "review deleted successfully");

  // Log the results
  console.log("deleted Review:", Results[0]); // Result of saving the new review
  console.log("Listing Updated:", Results[1]); // Result of updating the listing

  res.redirect(`/listings/${listingId}`);
};

export const reviewController = {
  addReview,
  deleteReview,
};
