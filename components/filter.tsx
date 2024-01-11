import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { ReactNode } from "react";

export const Filter = ({
  href,
  active,
  children,
}: {
  href: Url;
  active: boolean;
  children: ReactNode;
}) => (
  <Link
    href={href}
    className={`sm:text-md rounded-md bg-gray-300 px-6 py-2 text-xs font-light ${
      active && "bg-slate-700 text-white"
    }`}
  >
    {children}
  </Link>
);
