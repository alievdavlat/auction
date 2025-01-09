import express from "express";
import { uploadImage, uploadVideo } from "../controllers/uploadProductMedia.controller";
import { imageUpload, videoUpload } from "../utils/multer";

const UploadMediaRouter = express.Router();

// Mahsulot uchun rasm yuklash
UploadMediaRouter.post("/upload/image", imageUpload.single("image"), uploadImage);

// Mahsulot uchun video yuklash
UploadMediaRouter.post("/upload/video", videoUpload.single("video"), uploadVideo);

export default UploadMediaRouter;
