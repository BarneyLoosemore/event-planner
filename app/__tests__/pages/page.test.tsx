import Home from "@/app/page";

import { render, screen } from "@testing-library/react";

describe("Home Page", () => {
  it("renders", () => {
    render(<Home />);
    expect(screen.getByText("Event Planner")).toBeInTheDocument();
  });
});
