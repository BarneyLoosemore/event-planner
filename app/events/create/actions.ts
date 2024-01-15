"use server";
import { getSessionCookie } from "@/lib/api";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { eventSchema, imageSchema } from "@/lib/schemas/event";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const DEFAULT_IMAGE_URL = "https://picsum.photos/id/1/600/300";
export async function createEvent(_prevState: any, formData: FormData) {
  const creatorId = getSessionCookie();
  if (!creatorId) {
    redirect("/");
  }

  const { image, ...eventBody } = Object.fromEntries(formData.entries());
  const parsedEvent = eventSchema.safeParse(eventBody);

  if (!parsedEvent.success) {
    return parsedEvent.error.message;
  }

  let imageUrl = DEFAULT_IMAGE_URL;

  if ((image as File).size > 0) {
    const parsedImage = imageSchema.safeParse(image);
    if (!parsedImage.success) {
      return parsedImage.error.flatten().formErrors;
    }
    const uploadRes = await uploadImageToCloudinary(parsedImage.data);
    imageUrl = uploadRes.secure_url;
  }

  await prisma.event.create({
    data: {
      creatorId,
      ...parsedEvent.data,
      image: imageUrl,
    },
  });

  revalidatePath("/events");
  redirect("/events");
}
