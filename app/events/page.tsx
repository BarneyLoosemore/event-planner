import { EventCardList } from "@/components/event-card-list";

/* TODO: move to persistent storage */
const mockEvents = [
  {
    id: "1",
    title: "Test Event 1",
    description: "Some Test Event Description",
    image: "/test1.jpg",
    location: "Test Location 1",
    date: "01/01/2025",
  },
  {
    id: "2",
    title: "Test Event 2",
    description: "Some Test Event Description",
    image: "/test2.jpg",
    location: "Test Location 2",
    date: "02/02/2025",
  },
  {
    id: "3",
    title: "Test Event 3",
    description: "Some Test Event Description",
    image: "/test3.jpg",
    location: "Test Location 3",
    date: "03/03/2025",
  },
];

export default function EventsPage() {
  return (
    <>
      <h2>Events</h2>
      <EventCardList events={mockEvents} />
    </>
  );
}
