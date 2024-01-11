import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export const SubmitButton = ({ children }: { children: ReactNode }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={pending ? "cursor-not-allowed" : ""}
    >
      {children}
    </button>
  );
};
