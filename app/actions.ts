"use server";
import prisma from "@/lib/prisma";
import { eventSchema } from "@/lib/schemas/event";
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
