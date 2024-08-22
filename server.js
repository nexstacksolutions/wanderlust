import app from "./app.js";
import connectDB from "./config/database.js";
import { v2 as cloudinary } from "cloudinary";

// Ensure initialization happens only once
global.__initialized = false;

async function initialize() {
  if (!global.__initialized) {
    try {
      // Connect to the database
      await connectDB();
      console.log("Database connected successfully");

      // Configure Cloudinary
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
      });
      console.log("Cloudinary configured successfully");

      // Mark initialization as done
      global.__initialized = true;
    } catch (error) {
      console.error("Failed to initialize:", error);
      throw new Error("Initialization failed");
    }
  }
}

// Export the handler function for Vercel
export default async function handler(req, res) {
  try {
    await initialize();
    // Use the Express app to handle the request
    app(req, res);
  } catch (error) {
    console.error("Error in serverless function:", error);
    res.status(500).send("Internal Server Error");
  }
}
