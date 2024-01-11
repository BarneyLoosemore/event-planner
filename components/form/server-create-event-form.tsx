"use client";
import { createEvent } from "@/app/actions";
import { Field } from "./field";
import { SubmitButton } from "./submit-button";

export const ServerCreateEventForm = () => {
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <form
      action={createEvent}
      className="flex w-full max-w-xs flex-col [&>input]:text-black [&>textarea]:text-black"
    >
      <Field label="Title" name="title" required />
      <Field label="Description" name="description" required />
      <Field label="Location" name="location" required />
      <Field label="Date" name="date" type="date" min={currentDate} required />

      {/* <label htmlFor="image">Image</label>
      <input
        name="image"
        id="image"
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        className="!text-white"
        max="1"
        required
      /> */}

      <SubmitButton>Create Event</SubmitButton>
    </form>
  );
};
