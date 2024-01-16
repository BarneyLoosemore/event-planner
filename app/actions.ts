"use server";
import { createUser, getUserByName } from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function startSession(_: any, formData: FormData) {
  const name = formData.get("name") as string;
  const userExists = !!(await getUserByName(name));

  if (userExists) {
    return {
      message: "User already exists",
    };
  }

  const user = await createUser(formData.get("name") as string);
  cookies().set("session", user.id);
  redirect("/events");
}
