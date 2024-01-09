import { CreateEventForm } from "@/components/create-event-form";

export default function CreateEventPage() {
  return (
    <section className="flex flex-col items-center gap-8">
      <h2>Create Event</h2>
      <CreateEventForm />
    </section>
  );
}
