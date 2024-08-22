import app from "./app.js";
import connectDB from "./config/database.js";
import { v2 as cloudinary } from "cloudinary";

const port = process.env.PORT || 8080;

// Function to initialize the server
async function initializeServer() {
  try {
    // Connect to the database
    await connectDB();
    console.log("Database connected successfully");

    // Cloudinary configuration
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
    console.log("Cloudinary configured successfully");

    // Start listening for requests
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error during server initialization:", error);
    process.exit(1); // Exit the process with failure code
  }
}

// Start the server initialization
initializeServer();
