import { EventCard, EventCardProps } from "@/components/event-card";
import { render, screen, within } from "@testing-library/react";

const mockEvent = {
  title: "Test Event",
  image: "/test.jpg",
  location: "Test Location",
  date: new Date("01/01/2025"),
  attendees: [],
  index: 0,
} as EventCardProps;

describe("<EventCard>", () => {
  it("should render with title, date, image and location", () => {
    render(<EventCard {...mockEvent} />);
    const card = screen.getByRole("article");
    const title = within(card).getByRole("heading", {
      level: 2,
      name: mockEvent.title,
    });

    const date = within(card).getByText("Wed Jan 01 2025");
    const dateSvg = within(card).getByRole("img", { name: "Date" });

    const image = within(card).getByRole("img", { name: mockEvent.title });

    const location = within(card).getByText(mockEvent.location);
    const locationSvg = within(card).getByRole("img", {
      name: "Location",
    });

    const attendees = within(card).getByText("0");
    const attendeesSvg = within(card).getByRole("img", {
      name: "Attendees",
    });

    expect(title).toBeInTheDocument();
    expect(image).toBeInTheDocument();

    expect(date).toBeInTheDocument();
    expect(dateSvg).toBeInTheDocument();

    expect(image).toHaveAttribute("src", expect.stringMatching(/test.jpg/));

    expect(location).toBeInTheDocument();
    expect(locationSvg).toBeInTheDocument();

    expect(attendees).toBeInTheDocument();
    expect(attendeesSvg).toBeInTheDocument();
  });

  it("should render with a dynamic number of attendees", () => {
    render(
      <EventCard
        {...mockEvent}
        attendees={[
          {
            attendeeId: "1",
            eventId: "1",
            attendee: {
              id: "1",
              name: "Test Attendee",
            },
          },
          {
            attendeeId: "2",
            eventId: "1",
            attendee: {
              id: "2",
              name: "Test Attendee",
            },
          },
        ]}
      />,
    );
    const card = screen.getByRole("article");
    const attendees = within(card).getByText("2");
    expect(attendees).toBeInTheDocument();
  });

  it("should render main image with LCP-specific props if `index` is <= 3", () => {
    render(<EventCard {...mockEvent} index={0} />);
    const image = screen.getByRole("img", { name: mockEvent.title });
    expect(image).toHaveAttribute("loading", "eager");
    expect(image).toHaveAttribute("fetchpriority", "high");
  });

  it("should not render main image with LCP-specific props if `index` is > 3", () => {
    render(<EventCard {...mockEvent} index={4} />);
    const image = screen.getByRole("img", { name: mockEvent.title });
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).not.toHaveAttribute("fetchpriority");
  });
});
