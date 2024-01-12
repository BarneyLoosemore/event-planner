import { ServerCreateEventForm } from "@/components/form/server-create-event-form";
import { getSessionCookie } from "@/lib/api";
import { redirect } from "next/navigation";
// import { CreateEventForm } from "@/components/create-event-form";

export default function CreateEventPage() {
  const sessionCookie = getSessionCookie();
  if (!sessionCookie) {
    redirect("/");
  }
  return (
    <section className="grid h-3/4 place-items-center">
      <ServerCreateEventForm />
    </section>
  );
}
