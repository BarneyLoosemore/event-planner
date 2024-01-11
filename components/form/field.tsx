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
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        id={name}
        type={type}
        required={required}
        className={pending ? "opacity-50 cursor-not-allowed" : ""}
        disabled={pending}
        {...rest}
      />
    </>
  );
};
