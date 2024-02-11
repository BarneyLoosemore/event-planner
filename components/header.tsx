import { NavLink } from "./navlink";

export const Header = () => {
  return (
    <header className="flex justify-between">
      <h1 className="text-xl font-bold text-slate-700 sm:text-3xl">
        Eventy 🎉
      </h1>
      <nav className="flex items-center">
        <ul className="flex gap-4">
          <li>
            <NavLink href="/events">Events</NavLink>
          </li>
          <li>
            <NavLink href="/events/create">Create Event</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
