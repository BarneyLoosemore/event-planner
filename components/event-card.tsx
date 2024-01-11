import { EventWithAttendees } from "./event-card-list";
import { Icon } from "./icon";

type InfoProps = {
  icon: Parameters<typeof Icon>[0]["name"];
  content: string;
  title: string;
};

const Info = ({ content, icon, title }: InfoProps) => (
  <div className="mb-1 mt-2 flex gap-2">
    <Icon name={icon} alt={title} className="invert filter" />
    <p className="text-xs font-thin">{content}</p>
  </div>
);

type EventCardProps = EventWithAttendees;

export const EventCard = ({
  title,
  // image,
  description,
  location,
  date,
  attendees,
}: EventCardProps) => {
  const pastEvent = date < new Date();
  return (
    <article
      className={`${
        pastEvent && "opacity-70 hover:opacity-60"
      } rounded-md bg-slate-800 px-6 py-4 text-white hover:opacity-90`}
    >
      <h2>{title}</h2>
      <Info icon="calendar" title="Date" content={date.toDateString()} />
      <Info icon="location" title="Location" content={location} />
      <Info icon="user" title="Attendees" content={String(attendees.length)} />
      {/* <Image src={image} alt={title} width={500} height={500} /> */}

      <p className="text-sm">{description.slice(0, 10)}...</p>
    </article>
  );
};
