"use server";
import { addAttendee, getSessionCookie, removeAttendee } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function toggleAttendEvent(eventId: string, isAttending: boolean) {
  const userId = getSessionCookie();
  if (!userId) {
    return redirect("/");
  }

  isAttending
    ? await removeAttendee(userId, eventId)
    : await addAttendee(userId, eventId);

  revalidatePath(`/events/${eventId}`);
}
