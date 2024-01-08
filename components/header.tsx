import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex justify-between p-8 bg-neutral-400">
      <h1 className="text-3xl">Event Planner</h1>
      <nav className="flex items-center">
        <ul className="flex gap-4">
          <li>
            <Link href="/events">Events</Link>
          </li>
          <li>
            <Link href="/events/create">Create Event</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
