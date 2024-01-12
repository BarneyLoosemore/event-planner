import { EventCardList } from "@/components/event-card-list";
import prisma from "@/lib/prisma";
import { Suspense } from "react";

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      attendees: {
        include: {
          attendee: true,
        },
      },
    },
  });

  return (
    <Suspense fallback={"Loading.."}>
      <EventCardList events={events} />
    </Suspense>
  );
}
