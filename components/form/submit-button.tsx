import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export const SubmitButton = ({ children }: { children: ReactNode }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${
        pending && "cursor-not-allowed"
      } mt-2 rounded-sm bg-slate-700 px-4 py-2 text-lg font-semibold text-white transition-colors duration-200 ease-in-out hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-opacity-50 focus:ring-offset-2 disabled:cursor-not-allowed disabled:disabled:bg-slate-700 disabled:disabled:disabled:bg-slate-700 disabled:disabled:disabled:bg-slate-700 disabled:disabled:disabled:text-white disabled:disabled:disabled:text-white disabled:disabled:text-white disabled:opacity-50 disabled:disabled:ring-slate-700 disabled:disabled:ring-slate-700 disabled:disabled:ring-slate-700 disabled:disabled:ring-slate-700 disabled:disabled:ring-slate-700 disabled:disabled:ring-slate-700 disabled:disabled:ring-opacity-50 disabled:disabled:ring-opacity-50 disabled:disabled:ring-opacity-50 disabled:disabled:ring-opacity-50 disabled:disabled:ring-opacity-50 disabled:disabled:ring-opacity-50 disabled:disabled:ring-offset-2 disabled:disabled:ring-offset-2 disabled:disabled:ring-offset-2 disabled:disabled:ring-offset-2 disabled:disabled:ring-offset-2 disabled:disabled:ring-offset-2 disabled:hover:bg-slate-700 disabled:hover:text-white disabled:hover:ring-slate-700 disabled:hover:ring-opacity-50 disabled:hover:ring-offset-2 disabled:disabled:focus:ring-slate-700 disabled:disabled:focus:ring-slate-700 disabled:disabled:focus:ring-slate-700 disabled:focus:ring-slate-700 disabled:disabled:focus:ring-opacity-50 disabled:disabled:focus:ring-opacity-50 disabled:disabled:focus:ring-opacity-50 disabled:focus:ring-opacity-50 disabled:disabled:focus:ring-offset-2 disabled:disabled:focus:ring-offset-2 disabled:disabled:focus:ring-offset-2 disabled:focus:ring-offset-2 disabled:active:bg-slate-700 disabled:disabled:active:bg-slate-700 disabled:disabled:active:bg-slate-700 disabled:disabled:active:bg-slate-700 disabled:active:text-white disabled:disabled:active:text-white disabled:disabled:active:text-white disabled:disabled:active:text-white disabled:active:ring-slate-700 disabled:active:ring-opacity-50 disabled:active:ring-offset-2`}
    >
      {children}
    </button>
  );
};
