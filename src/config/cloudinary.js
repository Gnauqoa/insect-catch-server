import { v2 as cloudinary } from "cloudinary";
import {} from "dotenv/config";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png"],
  filename: function (req, file, cb) {
    console.log("Here");
    cb(null, file.originalname);
  },
});
const upload = multer({
  limits: {
    fileSize: 512 * 1024, // 1 MB
  },
  storage: storage,
});
export { upload };
export default cloudinary;
