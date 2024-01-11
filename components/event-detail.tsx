import {
  getAttendeesByEventId,
  getEventById,
  isAttendingEvent,
} from "@/lib/api";
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

export const EventDetail = async ({ id }: { id: string }) => {
  const {
    title,
    description,
    location,
    date,
    creator: host,
  } = await getEventById(id);
  const attendees = await getAttendeesByEventId(id);
  const isAttending = await isAttendingEvent(id);

  const attendeesConcatenated =
    attendees.length > 0
      ? attendees.map(({ name }) => name).join(", ")
      : "No attendees :(";

  return (
    <section>
      <div className="mb-4 flex flex-col gap-4 border-b-2 border-b-slate-700 pb-4 sm:mb-6 sm:flex-row sm:gap-10 sm:border-0">
        <Image
          alt={title}
          src={`https://picsum.photos/id/${Math.floor(
            Math.random() * 100,
          )}/600/300`}
          width={600}
          height={300}
          className="max-sm:relative max-sm:left-1/2 max-sm:right-1/2 max-sm:z-[-1] max-sm:ml-[-50vw] max-sm:mr-[-50vw] max-sm:w-[100vw] max-sm:max-w-[100vw]" // stretch out of the parent container, but only on small screens
        />
        <div>
          <h2 className="text-xl font-semibold sm:text-2xl">{title}</h2>
          <h3 className="mb-4 text-gray-700" aria-label="Hosted by">
            {host.name}
          </h3>
          <AttendanceForm eventId={id} isAttending={isAttending} />
          <Detail icon="calendar" title="Date" content={date.toDateString()} />
          <Detail icon="location" title="Location" content={location} />
          <Detail
            icon="user"
            title="Attendees"
            content={attendeesConcatenated}
          />
        </div>
      </div>
      <p>{description}</p>
    </section>
  );
};
