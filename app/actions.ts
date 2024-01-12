"use server";
import { createUser } from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function startSession(formData: FormData) {
  const user = await createUser(formData.get("name") as string);
  cookies().set("session", user.id);
  redirect("/events");
}
