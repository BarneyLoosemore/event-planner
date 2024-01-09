import { FormEvent } from "react";

export const CreateEventForm = () => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("/api/events", {
      method: "POST",
      body: new FormData(event.currentTarget),
    });

    const data = await response.json();
    // TODO: error handling via ErrorBoundary??
  };
  return <form></form>;
};
