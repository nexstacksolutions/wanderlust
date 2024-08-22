import express from "express";
import Listing from "../models/Listing.js";
import asyncWrap from "../middlewares/asyncWrap.js";
import singleUpload from "../middlewares/multer.js";
import { listingSchema } from "../schema.js";
import { isLoggedIn, isOwner, validateSchema } from "../middlewares/auth.js";
import { listingController } from "../controllers/listings.js";

const router = express.Router();

// show or add listing
router
  .route("/")

  .get(asyncWrap(listingController.showAllListing))

  .post(
    isLoggedIn("save listing"),
    singleUpload,
    validateSchema(listingSchema),
    asyncWrap(listingController.addListing)
  );

// add listing
router.get("/add", isLoggedIn("add listing"), listingController.addListingForm);

// Crud listing
router
  .route("/:listingId")

  .get(asyncWrap(listingController.showListing))

  .patch(
    isLoggedIn("update listing"),
    isOwner(Listing),
    singleUpload,
    validateSchema(listingSchema),
    asyncWrap(listingController.updateListing)
  )

  .delete(
    isLoggedIn("delete listing"),
    isOwner(Listing),
    asyncWrap(listingController.deleteListing)
  );

// add edit
router.get(
  "/:listingId/edit",
  isLoggedIn("edit listing"),
  isOwner(Listing),
  asyncWrap(listingController.editListing)
);

export { router as listingRoutes };
