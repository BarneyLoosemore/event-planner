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

type EventCardProps = EventWithAttendees & {
  index: number;
};

export const EventCard = ({
  title,
  image,
  location,
  date,
  attendees,
  index,
}: EventCardProps) => {
  const lcpImage = index <= 3;
  return (
    <article className="flex flex-col justify-between gap-1 transition-opacity will-change-auto hover:opacity-75">
      <Image
        src={image ?? "https://picsum.photos/id/1"}
        alt={title}
        width={300}
        height={160}
        loading={lcpImage ? "eager" : "lazy"}
        priority={lcpImage}
        quality={lcpImage ? 50 : 25}
        sizes="100vw, (min-width: 768px) 33vw, (min-width: 1024px) 25vw"
        className="h-52 w-auto rounded-md object-cover sm:h-44"
      />
      <h2 className="font-medium text-slate-700">{title}</h2>
      <Info icon="calendar" title="Date" content={date.toDateString()} />
      <Info icon="location" title="Location" content={location} />
      <Info icon="user" title="Attendees" content={String(attendees.length)} />
    </article>
  );
};
