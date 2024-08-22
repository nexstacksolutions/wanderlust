import multer from "multer";
const storage = multer.memoryStorage();

const singleUpload = multer({ storage }).single("listing[image]");

export default singleUpload;
