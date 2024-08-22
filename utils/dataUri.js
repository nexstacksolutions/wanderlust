import DataURIParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
  const parser = new DataURIParser();
  const extName = path.extname(file.originalname).toString();
  console.log(extName);
  return parser.format(extName, file.buffer);
};

export default getDataUri;
