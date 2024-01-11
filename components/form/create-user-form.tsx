"use client";
import { startSession } from "@/app/actions";
import { Field } from "./field";
import { SubmitButton } from "./submit-button";

export const CreateUserForm = async () => {
  return (
    <form
      action={startSession}
      className="mx-auto mt-8 flex w-full max-w-xs flex-col sm:mt-16 [&>input]:text-black [&>textarea]:text-black"
    >
      <Field label="What's your name?" name="name" required />
      <SubmitButton>Submit</SubmitButton>
    </form>
  );
};
