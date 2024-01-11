"use server";
import {
  addAttendee,
  createUser,
  getSessionCookie,
  removeAttendee,
} from "@/lib/api";
import prisma from "@/lib/prisma";
import { eventSchema } from "@/lib/schemas/event";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createEvent(formData: FormData) {
  try {
    await new Promise((r) => setTimeout(r, 1000)); // TODO: Remove

    const creatorId = getSessionCookie();

    if (!creatorId) {
      redirect("/");
    }

    const eventBody = Object.fromEntries(formData.entries());
    const parsedEvent = eventSchema.parse(eventBody);

    await prisma.event.create({
      data: { creatorId, ...parsedEvent },
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
