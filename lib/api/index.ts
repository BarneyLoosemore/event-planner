"server only";
import { cookies } from "next/headers";
import prisma from "../prisma";

export const getEventById = async (id: string) =>
  (await prisma.event.findUnique({
    where: { id },
  }))!;

export const getAttendeesByEventId = async (id: string) =>
  await prisma.attendee.findMany({
    where: {
      events: {
        some: {
          eventId: id,
        },
      },
    },
  });

export const addAttendee = (attendeeId: string, eventId: string) =>
  prisma.eventAttendance.create({
    data: {
      attendeeId,
      eventId,
    },
  });

export const removeAttendee = (attendeeId: string, eventId: string) =>
  prisma.eventAttendance.deleteMany({
    where: {
      attendeeId,
      eventId,
    },
  });

export const getSessionCookie = () => cookies().get("session")?.value!;

export const isAttendingEvent = async (eventId: string) => {
  const attendeeId = getSessionCookie();
  return !!(await prisma.eventAttendance.findFirst({
    where: {
      eventId,
      attendeeId,
    },
  }));
};

export const createAttendee = async (name: string) =>
  await prisma.attendee.create({
    data: {
      name,
    },
  });
