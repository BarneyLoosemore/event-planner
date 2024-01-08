import EventsPage from "@/app/events/page";

import { render, screen } from "@testing-library/react";

describe("Events Page", () => {
  it("renders", () => {
    render(<EventsPage />);
    expect(screen.getByText("Events")).toBeInTheDocument();
  });
});
