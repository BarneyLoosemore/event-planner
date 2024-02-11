"use client";
import { toggleAttendEvent } from "@/app/events/[id]/actions";
import { useOptimistic } from "react";

export const AttendanceForm = ({
  eventId,
  isAttending,
  isPastEvent,
}: {
  eventId: string;
  isAttending: boolean;
  isPastEvent: boolean;
}) => {
  const [optimisticIsAttendingEvent, optimisticToggleIsAttendingEvent] =
    useOptimistic(isAttending, (_, newIsAttending) => !!newIsAttending);

  const actionSubmittable = optimisticIsAttendingEvent === isAttending;

  async function formAction(_: FormData) {
    optimisticToggleIsAttendingEvent(!isAttending);
    toggleAttendEvent(eventId, isAttending);
  }

  return (
    <form action={formAction} className="sm:mb-4">
      <button
        type="submit"
        className={`${
          isPastEvent
            ? "cursor-not-allowed bg-gray-700"
            : optimisticIsAttendingEvent
              ? "bg-red-700 hover:bg-red-900"
              : "bg-green-700 hover:bg-green-900"
        }
        ${!actionSubmittable && "animate-pulse cursor-not-allowed"}
        rounded-md px-6 py-2 text-xs text-white sm:text-lg`}
        disabled={isPastEvent || !actionSubmittable}
      >
        {isPastEvent
          ? "Event has ended"
          : optimisticIsAttendingEvent
            ? "Unattend"
            : "Attend"}
      </button>
    </form>
  );
};
