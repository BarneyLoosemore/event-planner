"use server";
import {
  addAttendee,
  createUser,
  getSessionCookie,
  removeAttendee,
} from "@/lib/api";
import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { eventSchema } from "@/lib/schemas/event";
import { UploadApiResponse } from "cloudinary";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createEvent(formData: FormData) {
  try {
    const creatorId = getSessionCookie();

    if (!creatorId) {
      redirect("/");
    }

    const { image, ...event } = Object.fromEntries(formData.entries());

    const parsedEvent = eventSchema.parse(event);

    const uploadRes = (await uploadImageToCloudinary(
      image as File,
    )) as UploadApiResponse;

    await prisma.event.create({
      data: { creatorId, ...parsedEvent, image: uploadRes.secure_url },
    });

    redirect("/events");
  } catch (e) {
    throw e;
  }
}

export async function attendEvent(eventId: string, _: FormData) {
  const sessionCookie = getSessionCookie();
  if (!sessionCookie) {
    redirect("/");
  }
  await addAttendee(sessionCookie, eventId);
  revalidatePath(`/events/${eventId}`);
}

export async function leaveEvent(eventId: string, _: FormData) {
  const sessionCookie = getSessionCookie();
  await removeAttendee(sessionCookie, eventId);
  revalidatePath(`/events/${eventId}`);
}

export async function startSession(formData: FormData) {
  const user = await createUser(formData.get("name") as string);
  cookies().set("session", user.id);
  redirect("/events");
}

export async function uploadImageToCloudinary(image: File) {
  const imageBuffer = await image.arrayBuffer();
  const nodeBuffer = Buffer.from(imageBuffer);

  return new Promise((resolve, reject) =>
    cloudinary.v2.uploader
      .upload_stream((error, res) => {
        if (error) {
          reject(error);
        }
        resolve(res);
      })
      .end(nodeBuffer),
  );
}
