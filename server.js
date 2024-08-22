import app from "./app.js";
import connectDB from "./config/database.js";
import { v2 as cloudinary } from "cloudinary";

const port = process.env.PORT || 8080;

function startServer() {
  try {
    // Connect to the database
    connectDB();
    console.log("Database connected successfully");

    // Configure Cloudinary
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
    console.log("Cloudinary configured successfully");

    // Start the server
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to initialize server:", error);
    process.exit(1); // Exit the process if initialization fails
  }
}

// Call startServer function to initialize and start the server
startServer();
