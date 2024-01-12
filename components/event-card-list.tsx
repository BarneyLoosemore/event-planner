"use client";
import type { Event, User } from "@prisma/client";
import Link from "next/link";
import { EventCard } from "./event-card";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useTransition } from "react";
import { Field } from "./form/field";

export type EventWithAttendees = Event & {
  attendees: {
    eventId: string;
    attendeeId: string;
    attendee: User;
  }[];
};

type EventCardListProps = {
  events: EventWithAttendees[];
};

const filterTypes = ["all", "past", "upcoming"] as const;
type Filter = (typeof filterTypes)[number];

export const EventCardList = ({ events }: EventCardListProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [_, startTransition] = useTransition();

  const eventsFilter = searchParams.get("filter") as Filter | null;
  const searchQuery = searchParams.get("search") || "";

  const filteredEvents = useMemo(
    () =>
      events
        .filter((event) => {
          if (eventsFilter === "all" || !eventsFilter) return true;
          if (eventsFilter === "past") {
            return new Date(event.date) < new Date();
          }
          if (eventsFilter === "upcoming") {
            return new Date(event.date) > new Date();
          }
        })
        .filter((event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    [events, eventsFilter, searchQuery],
  );

  const handleFilterChange = (filterType: Filter) => () => {
    const params = new URLSearchParams(searchParams);
    params.set("filter", filterType);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    startTransition(() => params.set("search", e.target.value));
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <search>
        <ul className="mb-2 flex gap-4">
          {filterTypes.map((filterType) => (
            <li key={filterType}>
              <button
                onClick={handleFilterChange(filterType)}
                className={`border-b-2 pb-1 text-sm text-slate-700 hover:opacity-90 sm:text-lg ${
                  eventsFilter === filterType
                    ? "border-b-slate-700"
                    : "border-b-transparent"
                }`}
              >
                {filterType}
              </button>
            </li>
          ))}
        </ul>

        <form
          className="mb-4 flex flex-col sm:max-w-64"
          onSubmit={(e) => e.preventDefault()}
        >
          <Field
            label="Search"
            name="search"
            type="search"
            placeholder="e.g. Crazy Event"
            onChange={handleSearchChange}
          />
        </form>
      </search>
      <Suspense key={searchQuery} fallback={"Searching.."}>
        <section>
          <ul className="grid grid-cols-1 gap-y-8 sm:gap-x-12 sm:gap-y-16 md:grid-cols-3 lg:grid-cols-4">
            {filteredEvents.map((event) => (
              <li key={event.id}>
                <Link href={`/events/${event.id}`}>
                  <EventCard {...event} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Suspense>
    </>
  );
};
