"use client";
import { startSession } from "@/app/actions";
import { useFormState } from "react-dom";
import { Field } from "./field";
import { SubmitButton } from "./submit-button";

export const CreateUserForm = () => {
  const [message, formAction] = useFormState(startSession, null);
  return (
    <form
      action={formAction}
      className="flex w-full max-w-xs flex-col  [&>input]:text-black [&>textarea]:text-black"
    >
      <Field label="What's your name?" name="name" required />
      <SubmitButton>Submit</SubmitButton>
      {message && <p className="mx-auto mt-4 text-red-500">{message.error}</p>}
    </form>
  );
};
