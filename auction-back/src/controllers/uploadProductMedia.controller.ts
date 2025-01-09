import { Request, Response } from "express";

// Mahsulot uchun rasm yuklash
export const uploadImage = (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }

  const imageUrl = `/uploads/images/${req.file.filename}`;
  res.status(200).json({ message: "Image uploaded successfully", url: imageUrl });
};

// Mahsulot uchun video yuklash
export const uploadVideo = (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }

  const videoUrl = `/uploads/videos/${req.file.filename}`;
  res.status(200).json({ message: "Video uploaded successfully", url: videoUrl });
};
