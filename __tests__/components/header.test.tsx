import { Header } from "@/components/header";
import { render, screen, within } from "@testing-library/react";

describe("<Header>", () => {
  it("renders with a <header> element", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it('renders with "Event Planner" in a heading element', () => {
    render(<Header />);
    const heading = screen.getByRole("heading", { name: "Event Planner" });
    expect(heading).toBeInTheDocument();
  });

  it("renders with a list of links in a nav element", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
    const links = within(nav).getAllByRole("link");
    expect(links).toHaveLength(2);
  });

  it('renders with a link to "Events"', () => {
    render(<Header />);
    const link = screen.getByRole("link", { name: "Events" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/events");
  });

  it('renders with a link to "Create Event"', () => {
    render(<Header />);
    const link = screen.getByRole("link", { name: "Create Event" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/events/create");
  });
});
