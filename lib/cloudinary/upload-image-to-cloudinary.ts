import cloudinary from "@/lib/cloudinary/cloudinary";
import { UploadApiResponse } from "cloudinary";

export async function uploadImageToCloudinary(
  image: File,
): Promise<UploadApiResponse> {
  const imageBuffer = await image.arrayBuffer();
  const base64 = Buffer.from(imageBuffer).toString("base64");
  const fileUri = `data:${image.type};base64,${base64}`;

  return new Promise((resolve, reject) =>
    cloudinary.v2.uploader
      .upload(fileUri, {
        invalidate: true,
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      }),
  );
}
