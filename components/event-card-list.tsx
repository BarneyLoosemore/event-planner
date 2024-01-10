import type { Event } from "@prisma/client";
import Link from "next/link";
import { EventCard } from "./event-card";

type EventCardListProps = {
  events: Event[];
};

export const EventCardList = ({ events }: EventCardListProps) => (
  <ul className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-16">
    {events.map((event) => (
      <li key={event.id}>
        <Link href={`/events/${event.id}`}>
          <EventCard {...event} />
        </Link>
      </li>
    ))}
  </ul>
);
