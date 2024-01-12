import { UploadApiResponse } from "cloudinary";
import cloudinary from "./cloudinary";

export async function uploadImageToCloudinary(
  image: File,
): Promise<UploadApiResponse> {
  const imageBuffer = await image.arrayBuffer();
  const nodeBuffer = Buffer.from(imageBuffer);

  return new Promise((resolve, reject) =>
    cloudinary.v2.uploader
      .upload_stream((error, res) => {
        if (error) {
          reject(error);
        }
        resolve(res!);
      })
      .end(nodeBuffer),
  );
}
