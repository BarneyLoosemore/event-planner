import { InputHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const Field = ({
  label,
  name,
  type = "text",
  required = false,
  ...rest
}: FieldProps) => {
  const { pending } = useFormStatus();
  return (
    <>
      <label htmlFor={name} className="font-light">
        {label}
      </label>
      <input
        name={name}
        id={name}
        type={type}
        required={required}
        className={`${
          pending && "opacity-lg cursor-not-allowed"
        } mb-4 rounded-sm px-4 py-2 shadow-sm shadow-slate-200`}
        disabled={pending}
        {...rest}
      />
    </>
  );
};
