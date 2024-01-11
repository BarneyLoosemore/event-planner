"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const NavLink = ({ href, children }: { href: string; children: ReactNode }) => {
  const path = usePathname();
  const isActive = path === href;
  return (
    <li>
      <Link
        href={href}
        className={`${
          isActive && "border-b-2 border-b-slate-700"
        } text-md sm:text-lg text-slate-700 pb-1`}
      >
        {children}
      </Link>
    </li>
  );
};

export const Header = () => {
  return (
    <header className="flex justify-between">
      <h1 className="sm:text-3xl text-2xl font-bold text-slate-700">
        Eventy 🎉
      </h1>
      <nav className="flex items-center">
        <ul className="flex gap-4">
          <NavLink href="/events">Events</NavLink>
          <NavLink href="/events/create">Create Event</NavLink>
        </ul>
      </nav>
    </header>
  );
};
