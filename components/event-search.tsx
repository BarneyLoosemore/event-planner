"use client";
import { isBrowser } from "@/lib/utils/isBrowser";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Field } from "./form/field";

export const EventSearch = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set("search", e.target.value);
    startTransition(() => replace(`${pathname}?${params.toString()}`));
  };

  return (
    <form
      className={`mb-4 flex flex-col sm:max-w-64 ${
        isPending && "animate-pulse"
      }`}
      onSubmit={(e) => e.preventDefault()}
    >
      <Field
        label="Search"
        name="search"
        type="search"
        placeholder="e.g. Crazy Event"
        onChange={handleSearchChange}
        {...(!isBrowser() && {
          value: searchParams.get("search") ?? "", // This is so the value is set on server render if form submitted w/o JS
        })}
      />
    </form>
  );
};
