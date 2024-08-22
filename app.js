import app from "./app.js";
import connectDB from "./config/database.js";
import { v2 as cloudinary } from "cloudinary";

export default async function handler(req, res) {
  // Initialize database connection and cloudinary configuration
  await connectDB();
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });

  // Pass requests to the Express app
  app(req, res);
}
