import { EventCardList } from "@/components/event-card-list";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function EventsPage({
  searchParams: { order },
}: {
  searchParams: {
    order?: "asc" | "desc";
  };
}) {
  const orderBy = order
    ? {
        date: order,
      }
    : ({
        createdAt: "desc",
      } as const);
  const events = await prisma.event.findMany({
    orderBy,
  });

  return (
    <>
      <h2>Events</h2>
      <div className="flex gap-2 my-8">
        <h3>Sort by:</h3>
        <Link href="/events" className={!order ? "font-bold" : ""}>
          Newest
        </Link>
        <Link
          href="/events?order=asc"
          className={order === "asc" ? "font-bold" : ""}
        >
          Upcoming
        </Link>
        <Link
          className={order === "desc" ? "font-bold" : ""}
          href="/events?order=desc"
        >
          Furthest away
        </Link>
      </div>
      <EventCardList events={events} />
    </>
  );
}
