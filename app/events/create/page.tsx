import { CreateEventForm } from "@/components/form/create-event-form";
import { getSessionCookie } from "@/lib/api";
import { redirect } from "next/navigation";

export default function CreateEventPage() {
  const sessionCookie = getSessionCookie();
  if (!sessionCookie) {
    redirect("/");
  }
  return (
    <section className="grid h-3/4 place-items-center">
      <CreateEventForm />
    </section>
  );
}
