"use server";
import {
  addAttendee,
  createAttendee,
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

    const eventBody = Object.fromEntries(formData.entries());
    const parsedEvent = eventSchema.parse(eventBody);

    await prisma.event.create({
      data: parsedEvent,
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
  const attendee = await createAttendee(formData.get("name") as string);
  cookies().set("session", attendee.id);
  redirect("/events");
}
