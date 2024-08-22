import Listing from "../models/Listing.js";
import getDataUri from "../utils/dataUri.js";
import { v2 as cloudinary } from "cloudinary";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding-v6.js";

// all listings
const showAllListing = async (req, res) => {
  const allListings = await Listing.find();
  res.render("listings/index", { allListings });
};

const addListingForm = (req, res) => {
  res.render("listings/newListing");
};

const addListing = async (req, res) => {
  const mapToken = process.env.MAP_TOKEN;
  const geocodingClient = mbxGeocoding({ accessToken: mapToken });
  const response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  const fileUri = getDataUri(req.file);
  const myCloud = await cloudinary.uploader.upload(fileUri.content);

  let newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.geometry = response.body.features[0].geometry;
  newListing.image = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  const addResults = await newListing.save();
  req.flash("success", "listing added successfully");

  console.log(addResults);
  res.redirect("/listings");
};

const showListing = async (req, res) => {
  const { listingId } = req.params;
  const listing = await Listing.findById(listingId)
    .populate({
      path: "reviews",
      populate: { path: "author" }, // Populate the owner field in reviews
    })
    .populate("owner");

  // console.log(listing);

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  res.render("listings/showListing", { listing });
};

const editListing = async (req, res) => {
  const { listingId } = req.params;
  const listing = await Listing.findById(listingId);

  if (!listing) {
    req.flash("error", "listing not found!");
    return res.redirect("/listings");
  }

  const optimizeImageUrl = listing.image.url.replace(
    "/upload",
    "/upload/ar_1.0,c_fill,w_250/"
  );

  res.render("listings/editListing", {
    listing,
    optimizeImageUrl,
  });
};

const updateListing = async (req, res) => {
  const { listingId } = req.params;

  const mapToken = process.env.MAP_TOKEN;
  const geocodingClient = mbxGeocoding({ accessToken: mapToken });
  const response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  const updatedListing = await Listing.findByIdAndUpdate(
    listingId,
    req.body.listing
  );

  console.log(updatedListing.geometry);
  console.log(response.body.features[0].geometry);
  updatedListing.geometry = response.body.features[0].geometry;

  console.log(updatedListing.geometry);

  if (typeof req.file !== "undefined") {
    const fileUri = getDataUri(req.file);
    const myCloud = await cloudinary.uploader.upload(fileUri.content);
    await cloudinary.uploader.destroy(updatedListing.image.public_id);

    updatedListing.image = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  await updatedListing.save();

  req.flash("success", "listing updated successfully");
  console.log(updatedListing);
  res.redirect(`/listings/${listingId}`);
};

const deleteListing = async (req, res) => {
  const { listingId } = req.params;

  const deleteListing = await Listing.findByIdAndDelete(listingId);
  await cloudinary.uploader.destroy(deleteListing.image.public_id);

  req.flash("success", "listing deleted successfully");

  console.log(deleteListing);
  res.redirect("/listings");
};

export const listingController = {
  showAllListing,
  addListingForm,
  addListing,
  showListing,
  editListing,
  updateListing,
  deleteListing,
};
