import { EventCardList } from "@/components/event-card-list";
import { Filter } from "@/components/filter";
import prisma from "@/lib/prisma";

const getOpts = (sort?: "asc" | "past") => {
  const orderBy =
    sort === "asc" ? { date: "asc" as const } : { createdAt: "desc" as const };
  const where = {
    date: {
      [sort === "past" ? "lt" : "gte"]: new Date(),
    },
  };
  return {
    orderBy,
    where,
    include: {
      attendees: {
        include: {
          attendee: true,
        },
      },
    },
  };
};

export default async function EventsPage({
  searchParams: { sort },
}: {
  searchParams: {
    sort?: "asc" | "past";
  };
}) {
  const opts = getOpts(sort);
  const events = await prisma.event.findMany(opts);

  return (
    <>
      <search className="mb-8 mt-2 flex gap-2">
        <Filter href="/events" active={!sort}>
          Newly added
        </Filter>
        <Filter
          href={{
            pathname: "/events",
            query: { sort: "asc" },
          }}
          active={sort === "asc"}
        >
          Upcoming
        </Filter>
        <Filter
          href={{
            pathname: "/events",
            query: { sort: "past" },
          }}
          active={sort === "past"}
        >
          Past
        </Filter>
      </search>
      <EventCardList events={events} />
    </>
  );
}
