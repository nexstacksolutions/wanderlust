import app from "./app.js";
import connectDB from "./config/database.js";
import { v2 as cloudinary } from "cloudinary";

const port = process.env.PORT || 8080;

async function initializeServer() {
  await connectDB();
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });

  return app; // Return the app instance
}

export default initializeServer;
