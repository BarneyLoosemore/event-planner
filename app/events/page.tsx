import { EventCardList } from "@/components/event-card-list";
import { EventFilters } from "@/components/event-filters";
import { EventSearch } from "@/components/event-search";

// Note: the unstable_cache Data Cache API seems a bit.. well, unstable, so leaving for now
// const getCachedEvents = unstable_cache(
//   async (filter?: string, search?: string) =>
//     await filterAndSearchEvents(filter, search),
//   ["events"],
//   {
//     tags: ["events"],
//   },
// );

export default async function EventsPage({
  searchParams: { filter, search },
}: {
  searchParams: {
    filter?: string;
    search?: string;
  };
}) {
  return (
    <>
      <search>
        <EventFilters />
        <EventSearch />
      </search>
      {/* Note for future Barney: PPR/Streaming via Suspense requires JS, so bit of a prog-enhancement violation, hence commenting this out */}
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <EventCardList filter={filter} search={search} />
      {/* </Suspense> */}
    </>
  );
}
