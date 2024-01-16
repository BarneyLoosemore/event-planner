"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  const path = usePathname();
  const isActive = path === href;
  return (
    <Link
      href={href}
      className={`${
        isActive && "border-b-2 border-b-slate-700"
      } pb-1 text-sm text-slate-700 sm:text-lg`}
    >
      {children}
    </Link>
  );
};
