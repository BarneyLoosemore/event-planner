import { Footer } from "@/components/footer";
import { render, screen, within } from "@testing-library/react";

describe("<Footer>", () => {
  it("renders with a <footer> element", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
    expect(within(footer).getByText("Event Planner")).toBeInTheDocument();
  });
});
