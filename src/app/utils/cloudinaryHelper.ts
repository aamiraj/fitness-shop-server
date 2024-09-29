import { v2 as cloudinary } from "cloudinary";
import config from "../config";
import AppError from "../errors/AppError";
import { Express } from "express";
import fs from "fs";

export async function uploadToCloudinary(imageFiles: Express.Multer.File[]) {
  // Configuration
  cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
  });

  const imageUrls: string[] = [];

  for (let i = 0; i < imageFiles.length; i++) {
    const url = await uploadImageToCloud(imageFiles[i].path);
    imageUrls.push(url);
  }

  return imageUrls;
}

const uploadImageToCloud = async (imagePath: string) => {
  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(imagePath)
    .catch((error) => {
      throw new AppError(401, "Image upload failed.", error?.status);
    });

  if (uploadResult) {
    // Optimize delivery by resizing and applying auto-format and auto-quality
    cloudinary.url(uploadResult?.public_id, {
      fetch_format: "auto",
      quality: "auto",
    });

    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url(uploadResult?.public_id, {
      crop: "auto",
      gravity: "auto",
      width: 500,
      height: 500,
    });

    removeImage(imagePath);

    return autoCropUrl;
  }
  return "";
};

const removeImage = (path: string) => {
  // Remove the file
  fs.unlink(path, (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(`Error while removing file: ${err}`);
      return;
    }
  });

  console.log("Image deleted successfully.");
};
