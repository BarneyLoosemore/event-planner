import {
  EventCardList,
  type EventWithAttendees,
} from "@/components/event-card-list";
import { render, screen, within } from "@testing-library/react";

const mockReplace = jest.fn();
const mockUseSearchParamsGet = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
  usePathname: () => "/events",
  useSearchParams: () => ({
    get: mockUseSearchParamsGet,
  }),
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useTransition: () => [jest.fn(), (cb: any) => cb()],
  useOptimistic: (value: any) => [value, jest.fn()],
}));

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormStatus: () => ({
    pending: false,
  }),
}));

const createMockEvent = (id: number) =>
  ({
    id: `${id}`,
    title: `Test Event ${id}`,
    description: "Some Test Event Description",
    image: `/test${id}.jpg`,
    location: `Test Location ${id}`,
    date: new Date(`0${id}/0${id}/2025`),
    attendees: [],
  }) as EventWithAttendees;

const mockEvents = Array.from({ length: 3 }, (_, i) => createMockEvent(i));

// async RSC tests broken? :(
describe.skip("<EventCardList>", () => {
  it("should render a list of event cards when provided with a list of events", () => {
    render(<EventCardList />);
    const cardList = screen.getAllByRole("list")[1];

    for (const event of mockEvents) {
      const eventCard = within(cardList).getByRole("heading", {
        name: event.title,
      });
      expect(eventCard).toBeInTheDocument();
    }
  });

  it("should wrap each event card in a link to the event detail page", () => {
    render(<EventCardList />);
    const cardList = screen.getAllByRole("list")[1];

    expect(within(cardList).getAllByRole("link")[0]).toHaveAttribute(
      "href",
      `/events/${mockEvents[0].id}`,
    );
  });

  // it("should render a filter and search bar", () => {
  //   render(<EventCardList events={mockEvents} />);
  //   const filter = screen.getByRole("list", { name: "Filter events" });
  //   const search = screen.getByRole("searchbox");

  //   for (const filterLink of ["all", "past", "upcoming"]) {
  //     expect(filter).toContainElement(
  //       screen.getByRole("link", { name: filterLink }),
  //     );
  //   }

  //   expect(search).toContainElement(
  //     screen.getByRole("searchbox", { name: "Search" }),
  //   );
  // });

  // it("should preset the filter based on search params", () => {
  //   const searchParams = new URLSearchParams();
  //   searchParams.set("filter", "past");

  //   mockUseSearchParamsGet.mockReturnValueOnce("past");

  //   render(<EventCardList events={mockEvents} />);
  //   const activeFilter = screen.getByRole("link", { name: "past" });

  //   expect(activeFilter).toHaveAttribute("aria-current", "page");
  // });

  // it.each(["all", "past", "upcoming"])(
  //   "%s filter link should set the filter search param when clicked",
  //   (filter) => {
  //     render(<EventCardList events={mockEvents} />);
  //     const filterLink = screen.getByRole("link", { name: filter });
  //     expect(filterLink).toHaveAttribute("href", `?filter=${filter}`);

  //     filterLink.click();

  //     expect(mockReplace).toHaveBeenCalledWith(expect.stringContaining(filter));
  //   },
  // );

  // it("should set the search param when the search input is changed", () => {
  //   render(<EventCardList events={mockEvents} />);
  //   const searchInput = screen.getByRole("searchbox");

  //   fireEvent.change(searchInput, { target: { value: "Test" } });
  //   expect(mockReplace).toHaveBeenCalledWith(expect.stringContaining("Test"));
  // });
});
