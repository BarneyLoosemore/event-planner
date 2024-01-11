"use client";
import { startSession } from "@/app/actions";
import { Field } from "./field";
import { SubmitButton } from "./submit-button";

export const CreateUserForm = async () => {
  return (
    <form action={startSession} className="flex flex-col items-center">
      <Field label="What's your name?" name="name" required />
      <SubmitButton>Submit</SubmitButton>
    </form>
  );
};
