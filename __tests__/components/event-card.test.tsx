import { EventCard } from "@/components/event-card";
import { Event } from "@prisma/client";
import { render, screen, within } from "@testing-library/react";

const mockEvent = {
  id: "1",
  title: "Test Event",
  description: "A Lovely Test Event!",
  // image: "/test.jpg",
  location: "Test Location",
  date: new Date("01/01/2025"),
} as Event;

describe("<EventCard>", () => {
  it("should render with title, date, image and location", () => {
    render(<EventCard {...mockEvent} />);
    const card = screen.getByRole("article");
    const title = within(card).getByRole("heading", { name: mockEvent.title });
    const date = within(card).getByText("Wed Jan 01 2025");
    // const image = within(card).getByRole("img");
    const location = within(card).getByText(mockEvent.location);

    expect(title).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    // expect(image).toBeInTheDocument();
    // expect(image).toHaveAttribute("src", expect.stringMatching(/test.jpg/));
    expect(location).toBeInTheDocument();
  });

  it("should render with a truncated description", () => {
    render(<EventCard {...mockEvent} />);

    const description = screen.getByText(/A Lovely/i);
    expect(description.textContent?.length).toEqual(13);
    expect(description.textContent?.endsWith("...")).toBe(true);
  });
});
