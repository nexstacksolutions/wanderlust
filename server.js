import app from "./app.js";
import connectDB from "./config/database.js";
import { v2 as cloudinary } from "cloudinary";
// import initializeDatabase from "./init/index.js";
const port = process.env.PORT;

// connect to Database
await connectDB();

// Cloud Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Listen for requests
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// initializeDatabase();
