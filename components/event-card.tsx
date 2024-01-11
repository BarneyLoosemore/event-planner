import Image from "next/image";
import { EventWithAttendees } from "./event-card-list";
import { Icon } from "./icon";

type InfoProps = {
  icon: Parameters<typeof Icon>[0]["name"];
  content: string;
  title: string;
};

const Info = ({ content, icon, title }: InfoProps) => (
  <div className="flex gap-2">
    <Icon name={icon} alt={title} />
    <p className="text-xs font-light text-slate-800">{content}</p>
  </div>
);

type EventCardProps = EventWithAttendees;

export const EventCard = ({
  title,
  image,
  location,
  date,
  attendees,
}: EventCardProps) => {
  const isPastEvent = date < new Date();
  return (
    <article
      className={`${
        isPastEvent && "opacity-70 hover:opacity-60"
      } flex flex-col justify-between gap-1`}
    >
      <Image
        src={image!}
        alt={title}
        width={326}
        height={163}
        className="w-full rounded-md"
      />
      <h2 className="font-medium text-slate-700">{title}</h2>
      <Info icon="calendar" title="Date" content={date.toDateString()} />
      <Info icon="location" title="Location" content={location} />
      <Info icon="user" title="Attendees" content={String(attendees.length)} />
    </article>
  );
};
