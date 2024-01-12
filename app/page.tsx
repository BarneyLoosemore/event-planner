import { CreateUserForm } from "@/components/form/create-user-form";
import { getSessionCookie } from "@/lib/api";
import { redirect } from "next/navigation";

export default function Home() {
  const sessionCookie = getSessionCookie();
  if (sessionCookie) {
    redirect("/events");
  }
  return (
    <section className="grid h-2/3 place-items-center">
      <CreateUserForm />
    </section>
  );
}
