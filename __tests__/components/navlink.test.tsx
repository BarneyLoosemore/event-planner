import { NavLink } from "@/components/navlink";
import { render, screen } from "@testing-library/react";

let mockActivePath = "/";
jest.mock("next/navigation", () => ({
  usePathname: () => mockActivePath,
}));

describe("<NavLink>", () => {
  it("renders with an anchor tag with href provided", () => {
    render(<NavLink href="/about">About</NavLink>);
    const link = screen.getByRole("link", { name: /about/i });
    expect(link).toHaveAttribute("href", "/about");
    expect(link).not.toHaveClass("border-b-2 border-b-slate-700");
  });

  it("renders with active styles if href matches current path", () => {
    mockActivePath = "/about";
    render(<NavLink href="/about">About</NavLink>);
    const link = screen.getByRole("link", { name: /about/i });
    expect(link).toHaveClass("border-b-2 border-b-slate-700");
  });
});
