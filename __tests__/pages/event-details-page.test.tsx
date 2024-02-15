import EventDetailsPage from "@/app/events/[id]/page";
import { EventWithAttendees } from "@/components/event-card-list";
import * as api from "@/lib/api";
import { render, screen } from "@testing-library/react";

jest.mock("@/lib/api");
const getSessionCookieSpy = jest.spyOn(api, "getSessionCookie");
const getEventByIdSpy = jest.spyOn(api, "getEventById");

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useOptimistic: (value: any) => [value, jest.fn()],
}));

const MOCK_EVENT = {
  date: new Date("2024-01-01"),
  attendees: [],
  id: "123",
  title: "Test Event",
  description: "This is a test event",
  location: "Test Location",
  image: "/test.jpg",
  creator: {
    name: "Test User",
  },
};

const renderPage = async (overrides?: Partial<EventWithAttendees>) => {
  getEventByIdSpy.mockResolvedValueOnce({
    ...MOCK_EVENT,
    ...overrides,
  } as any);
  const page = await EventDetailsPage({
    params: { id: "123" },
  });
  render(page);
};

describe("/events/[id] page", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-01-01"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should call getEventById with the id param", async () => {
    await renderPage();
    expect(getEventByIdSpy).toHaveBeenCalledWith("123");
  });

  it("should call getSessionCookie", async () => {
    await renderPage();
    expect(getSessionCookieSpy).toHaveBeenCalled();
  });

  it("should render with the event image", async () => {
    await renderPage();
    expect(
      screen.getByRole("img", { name: MOCK_EVENT.title }),
    ).toBeInTheDocument();
  });

  it("should render with the event title", async () => {
    await renderPage();
    expect(
      screen.getByRole("heading", { level: 2, name: MOCK_EVENT.title }),
    ).toBeInTheDocument();
  });

  it("should render with the event host", async () => {
    await renderPage();
    expect(screen.getByLabelText("Hosted by")).toHaveTextContent(
      MOCK_EVENT.creator.name,
    );
  });

  it("should render with the event description", async () => {
    await renderPage();
    expect(screen.getByText(MOCK_EVENT.description)).toBeInTheDocument();
  });

  it("should render with 'Event has ended' text if event is in the past", async () => {
    await renderPage({
      date: new Date("2020-01-01"),
    });
    expect(screen.getByText("Event has ended")).toBeInTheDocument();
  });

  it("should render with 'attend' button if event is in the future", async () => {
    await renderPage();
    expect(screen.getByRole("button", { name: "Attend" })).toBeInTheDocument();
  });

  it("should render with 'unattend' button if user is attending", async () => {
    await renderPage({
      attendees: [{ id: "123" } as any],
    });
    expect(
      screen.getByRole("button", { name: "Unattend" }),
    ).toBeInTheDocument();
  });

  it("should render with the event date", async () => {
    await renderPage();
    expect(
      screen.getByText(MOCK_EVENT.date.toDateString()),
    ).toBeInTheDocument();
  });

  it("should render with the event location", async () => {
    await renderPage();
    expect(screen.getByText(MOCK_EVENT.location)).toBeInTheDocument();
  });

  it("should render with the no attendees text if attendees array is empty", async () => {
    await renderPage();
    expect(screen.getByText("No attendees :(")).toBeInTheDocument();
  });

  it("should render with concatenated list of attendee names if attendees array is not empty", async () => {
    await renderPage({
      attendees: [
        { attendee: { name: "Test User 1" } },
        { attendee: { name: "Test User 2" } },
      ] as any,
    });
    expect(screen.getByText("Test User 1, Test User 2")).toBeInTheDocument();
  });
});
