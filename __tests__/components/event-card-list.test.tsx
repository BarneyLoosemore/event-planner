import { EventCardList } from "@/components/event-card-list";
import { render, screen, within } from "@testing-library/react";

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
    description: "Test Event Description",
    image: "/test2.jpg",
    location: "Test Location 2",
    date: "02/02/2025",
  },
  {
    id: "3",
    title: "Test Event 3",
    description: "Test Event Description",
    image: "/test3.jpg",
    location: "Test Location 3",
    date: "03/03/2025",
  },
];

describe("<EventCardList>", () => {
  it("should render a list of event cards when provided with a list of events", () => {
    render(<EventCardList events={mockEvents} />);
    const cardList = screen.getByRole("list");

    for (const event of mockEvents) {
      const eventCard = within(cardList).getByRole("heading", {
        name: event.title,
      });
      expect(eventCard).toBeInTheDocument();
    }
  });

  it("should wrap each event card in a link to the event detail page", () => {
    render(<EventCardList events={mockEvents} />);
    expect(screen.getAllByRole("link")[0]).toHaveAttribute(
      "href",
      `/events/${mockEvents[0].id}`,
    );
  });
});
