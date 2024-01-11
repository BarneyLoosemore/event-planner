"use client";
import { attendEvent, leaveEvent } from "@/app/actions";

export const AttendanceForm = async ({
  eventId,
  isAttending,
}: {
  eventId: string;
  isAttending: boolean;
}) => {
  // const a = useOptimistic()
  const handleToggleAttendance = isAttending
    ? leaveEvent.bind(null, eventId)
    : attendEvent.bind(null, eventId);

  return (
    <form action={handleToggleAttendance}>
      <button
        type="submit"
        className={`${
          isAttending
            ? "bg-red-700 hover:bg-red-900"
            : "bg-green-700 hover:bg-green-900"
        } rounded-md px-6 py-2 text-xs text-white sm:text-lg`}
      >
        {isAttending ? "Unattend" : "Attend"}
      </button>
    </form>
  );
};
