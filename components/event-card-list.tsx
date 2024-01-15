import type { Event, User } from "@prisma/client";
import Link from "next/link";
import { EventCard } from "./event-card";

import { EventFilters } from "./event-filters";
import { EventSearch } from "./event-search";

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

export const EventCardList = ({ events }: EventCardListProps) => (
  <>
    <search>
      <EventFilters />
      <EventSearch />
    </search>
    <section>
      <ul className="grid grid-cols-1 gap-y-8 sm:gap-x-12 sm:gap-y-16 md:grid-cols-3 lg:grid-cols-4">
        {events.map((event, index) => (
          <li key={event.id}>
            <Link href={`/events/${event.id}`}>
              <EventCard {...event} index={index} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  </>
);
