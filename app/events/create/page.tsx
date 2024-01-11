import { ServerCreateEventForm } from "@/components/form/server-create-event-form";
// import { CreateEventForm } from "@/components/create-event-form";

export default function CreateEventPage() {
  return (
    <section className="flex flex-col items-center gap-8">
      <ServerCreateEventForm />
    </section>
  );
}
