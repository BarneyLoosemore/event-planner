import type { Attendee, Event } from "@prisma/client";
import { Icon } from "./icon";

type InfoProps = {
  icon: Parameters<typeof Icon>[0]["name"];
  content: string;
  title: string;
};

const Info = ({ content, icon, title }: InfoProps) => (
  <div className="flex gap-2 mt-2 mb-1">
    <Icon name={icon} alt={title} />
    <p className="font-thin text-xs">{content}</p>
  </div>
);

type EventCardProps = Event & {
  attendees: {
    attendee: Attendee;
  }[];
};

export const EventCard = ({
  title,
  // image,
  description,
  location,
  date,
  attendees,
}: EventCardProps) => {
  const attendeesConcatenated =
    attendees.length > 0
      ? attendees
          .map(({ attendee }) => attendee.name)
          .join(", ")
          .slice(0, 40)
          .concat("...")
      : "No attendees :(";

  return (
    <article className="px-6 py-4 bg-slate-800 rounded-md text-white hover:opacity-90">
      <h2>{title}</h2>
      <Info icon="calendar" title="Date" content={date.toDateString()} />
      <Info icon="location" title="Location" content={location} />
      <Info icon="user" title="Attendees" content={attendeesConcatenated} />
      {/* <Image src={image} alt={title} width={500} height={500} /> */}

      <p className="text-sm">{description.slice(0, 10)}...</p>
    </article>
  );
};
