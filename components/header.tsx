import Link from "next/link";

export const Header = () => (
  <header className="flex justify-between bg-neutral-950">
    <h1 className="sm:text-3xl">Event Planner</h1>
    <nav className="flex items-center">
      <ul className="flex gap-4">
        <li>
          <Link href="/events" className="text-xs sm:text-lg">
            Events
          </Link>
        </li>
        <li>
          <Link href="/events/create" className="text-xs sm:text-lg">
            Create Event
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);
