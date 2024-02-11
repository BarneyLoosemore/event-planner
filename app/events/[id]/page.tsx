import { EventDetail } from "@/components/event-detail";
import { getEventById, getSessionCookie } from "@/lib/api";

export default async function EventDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const event = (await getEventById(id))!;
  const userId = getSessionCookie();
  const isAttending = event?.attendees?.some(
    ({ attendee }) => attendee?.id === userId,
  );

  return (
    <EventDetail
      {...event}
      isAttending={isAttending}
      isPastEvent={new Date(event.date) < new Date()}
      attendees={
        event?.attendees?.length > 0
          ? event.attendees.map(({ attendee }) => attendee?.name).join(", ")
          : "No attendees :("
      }
    />
  );
}
