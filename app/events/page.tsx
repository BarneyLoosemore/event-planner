import { EventCardList } from "@/components/event-card-list";
import { filterAndSearchEvents } from "@/lib/api";
import { unstable_cache } from "next/cache";

// `unstable_cache` to avoid having to use `fetch` to persist to the Data Cache?
const getCachedEvents = unstable_cache(
  async (filter?: string, search?: string) =>
    await filterAndSearchEvents(filter, search),
  ["events"],
);

export default async function EventsPage({
  searchParams: { filter, search },
}: {
  searchParams: {
    filter?: string;
    search?: string;
  };
}) {
  const events = await filterAndSearchEvents(filter, search);
  return <EventCardList events={events} />;
}
