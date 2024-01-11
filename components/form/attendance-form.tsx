"use client";
import { attendEvent, leaveEvent } from "@/app/actions";

export const AttendanceForm = async ({
  eventId,
  isAttending,
  isPastEvent,
}: {
  eventId: string;
  isAttending: boolean;
  isPastEvent: boolean;
}) => {
  // const a = useOptimistic()
  const handleToggleAttendance = isAttending
    ? leaveEvent.bind(null, eventId)
    : attendEvent.bind(null, eventId);

  return (
    <form action={handleToggleAttendance} className="sm:mb-4">
      <button
        type="submit"
        className={`${
          isPastEvent
            ? "cursor-not-allowed bg-gray-700"
            : isAttending
              ? "bg-red-700 hover:bg-red-900"
              : "bg-green-700 hover:bg-green-900"
        }
        rounded-md px-6 py-2 text-xs text-white sm:text-lg`}
        disabled={isPastEvent}
      >
        {isPastEvent ? "Event has ended" : isAttending ? "Unattend" : "Attend"}
      </button>
    </form>
  );
};
