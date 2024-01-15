import type { Event } from "@prisma/client";
import Image from "next/image";
import { AttendanceForm } from "./form/attendance-form";
import { Icon } from "./icon";

type DetailProps = {
  icon: Parameters<typeof Icon>[0]["name"];
  content: string;
  title: string;
};

const Detail = ({ content, icon, title }: DetailProps) => (
  <div className="mb-1 mt-2 flex gap-2">
    <Icon name={icon} alt={title} />
    <p className="text-md">{content}</p>
  </div>
);

type EventDetailProps = Event & {
  creator: {
    name: string;
  };
  attendees: string;
  isAttending: boolean;
  isPastEvent: boolean;
};

export const EventDetail = ({
  id,
  title,
  description,
  location,
  date,
  image,
  creator: host,
  attendees,
  isAttending,
  isPastEvent,
}: EventDetailProps) => {
  return (
    <section className="m-auto max-w-4xl">
      <div className="mb-4 flex flex-col gap-4 border-b-2 border-b-slate-700 pb-4 sm:mb-6 sm:mt-8 sm:flex-row sm:gap-10 sm:border-0">
        <Image
          alt={title}
          src={image!}
          width={600}
          height={400}
          priority
          className="h-[400px] w-[600px] object-cover max-sm:relative max-sm:left-1/2 max-sm:right-1/2 max-sm:z-[-1] max-sm:ml-[-50vw] max-sm:mr-[-50vw] max-sm:w-[100vw] max-sm:max-w-[100vw] sm:rounded-md" // stretch out of the parent container, but only on small screens
        />
        <div>
          <h2 className="text-xl font-semibold sm:text-2xl">{title}</h2>
          <h3 className="mb-4 text-gray-700" aria-label="Hosted by">
            {host.name}
          </h3>

          <AttendanceForm
            eventId={id}
            isAttending={isAttending}
            isPastEvent={isPastEvent}
          />

          <Detail icon="calendar" title="Date" content={date.toDateString()} />
          <Detail icon="location" title="Location" content={location} />
          <Detail icon="user" title="Attendees" content={attendees} />
        </div>
      </div>
      <p>{description}</p>
    </section>
  );
};
