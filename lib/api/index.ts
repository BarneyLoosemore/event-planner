"server only";
import { cookies } from "next/headers";
import prisma from "../prisma";

export const getEventById = (id: string) =>
  prisma.event.findUnique({
    where: { id },
    include: {
      creator: true,
      attendees: {
        include: {
          attendee: true,
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

export const createUser = (name: string) =>
  prisma.user.create({
    data: {
      name,
    },
  });

export const getUserByName = (name: string) =>
  prisma.user.findUnique({
    where: {
      name,
    },
  });

// TODO: test this!
export const filterAndSearchEvents = (
  filter?: "past" | string,
  search?: string,
) =>
  prisma.event.findMany({
    orderBy:
      filter === "past"
        ? {
            date: "desc",
          }
        : {
            createdAt: "desc",
          },

    where: {
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
    include: {
      attendees: {
        include: {
          attendee: true,
        },
      },
    },
  });
