"use server";
import { addAttendee, getSessionCookie, removeAttendee } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
