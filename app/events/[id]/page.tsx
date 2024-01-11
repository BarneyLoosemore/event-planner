import { attendEvent, leaveEvent } from "@/app/actions";
import {
  getAttendeesByEventId,
  getEventById,
  isAttendingEvent,
} from "@/lib/api";

export default async function EventDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const event = await getEventById(id);
  const attendees = await getAttendeesByEventId(id);
  const isAttending = await isAttendingEvent(id);
  const { title, description, location, date } = event;

  const handleToggleAttendance = isAttending
    ? leaveEvent.bind(null, id)
    : attendEvent.bind(null, id);

  return (
    <section>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{location}</p>
      <p>{date.toDateString()}</p>

      <form action={handleToggleAttendance}>
        <button type="submit">{isAttending ? "Unattend" : "Attend"}</button>
      </form>

      <h3>Attendees:</h3>
      <ul>
        {attendees.map((attendee) => (
          <li key={attendee.id}>{attendee.id}</li>
        ))}
      </ul>
    </section>
  );
}

// export const generateStaticParams = async () => {};
