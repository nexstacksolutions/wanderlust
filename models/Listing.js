import mongoose from "mongoose";
import Review from "./Review.js";
const { Schema, model } = mongoose;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    public_id: {
      type: String,
      required: true,
      // default: "664e365b0308932945000527a",
    },

    url: {
      type: String,
      required: true,
    },
  },
  price: Number,
  location: String,
  country: String,
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
      // default: "Point",
    },

    coordinates: {
      type: [Number],
      required: true,
      // default: [74.314177, 31.565608],
    },
  },

  // category: {
  //   type: String,
  //   enum: ["pools", "rooms", "beach"],
  // },

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    // default: "66486d34d0ef230dac35c4ff",
  },
});

// Mongoose deleting middleware
listingSchema.post("findOneAndDelete", async function (listing) {
  if (listing.reviews.length) {
    let result = await Review.deleteMany({ _id: { $in: listing.reviews } });
    console.log(result);
  }
});

const Listing = model("Listing", listingSchema);

export default Listing;
