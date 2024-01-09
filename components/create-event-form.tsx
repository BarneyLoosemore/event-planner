"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export const CreateEventForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // TODO: check if form is submitting

    setIsSubmitting(true);
    event.preventDefault();

    const response = await fetch("/api/event", {
      method: "POST",
      body: new FormData(event.currentTarget),
      redirect: "follow",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    router.push(`/events/${data.id}`);
  };

  return (
    <form
      className="flex flex-col gap-4 w-1/3 [&>input]:text-black [&>textarea]:text-black"
      onSubmit={handleSubmit}
    >
      <label htmlFor="title">Title</label>
      <input name="title" id="title" required />

      <label htmlFor="description">Description</label>
      <textarea name="description" id="description" required />

      <label htmlFor="location">Location</label>
      <input name="location" id="location" required />

      <label htmlFor="date">Date</label>
      <input name="date" id="date" type="date" required />

      <button
        type="submit"
        className="disabled:cursor-not-allowed disabled:opacity-50"
      >
        Create
      </button>
    </form>
  );
};
