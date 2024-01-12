import { InputHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";

export const SubmitButton = ({
  children,
}: { children: ReactNode } & InputHTMLAttributes<HTMLButtonElement>) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${
        pending && "cursor-not-allowed"
      } mt-2 rounded-sm bg-slate-700 px-4 py-2 text-lg font-semibold text-white  hover:bg-slate-600 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
};
